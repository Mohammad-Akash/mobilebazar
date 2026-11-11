-- ==============================================================================
-- Migration 030: In-App Chat Tables, Constraints, Indexes & RLS
-- ==============================================================================
-- Phase 7.5: OLX-style in-app chat between buyer and seller per ad
-- Provides:
--   1. conversations table (UNIQUE per ad_id, buyer_id)
--   2. messages table (identity BIGINT, text/offer/system, max 1000 chars)
--   3. user_blocks table (mutual blocker tracking)
--   4. chat_reports table (with message_ids_snapshot)
--   5. pending_chat_notifications table (for throttled email digests)
--   6. Partial indexes for keyset pagination
--   7. Strict RLS and revoked privileges
--   8. Supabase Realtime publication setup
--   9. Default chat app_settings limits
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. conversations table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.conversations (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id                UUID NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
  buyer_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  seller_id            UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_message_preview VARCHAR(100),
  buyer_last_read_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  seller_last_read_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  buyer_unread_count   INT NOT NULL DEFAULT 0 CHECK (buyer_unread_count >= 0),
  seller_unread_count  INT NOT NULL DEFAULT 0 CHECK (seller_unread_count >= 0),
  CONSTRAINT uq_conversations_ad_buyer UNIQUE (ad_id, buyer_id),
  CONSTRAINT chk_conversations_different_users CHECK (buyer_id != seller_id)
);

CREATE INDEX IF NOT EXISTS idx_conversations_buyer_last_msg
  ON public.conversations (buyer_id, last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_conversations_seller_last_msg
  ON public.conversations (seller_id, last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_conversations_ad
  ON public.conversations (ad_id);

-- ------------------------------------------------------------------------------
-- 2. messages table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.messages (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  kind            TEXT NOT NULL CHECK (kind IN ('text', 'offer', 'system')),
  body            TEXT NOT NULL CHECK (length(trim(body)) >= 1 AND length(body) <= 1000),
  offer_amount    BIGINT CHECK (
    (kind = 'offer' AND offer_amount IS NOT NULL AND offer_amount > 0) OR
    (kind != 'offer' AND offer_amount IS NULL)
  ),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Keyset pagination index (conversation_id, created_at DESC, id DESC)
CREATE INDEX IF NOT EXISTS idx_messages_conversation_keyset
  ON public.messages (conversation_id, created_at DESC, id DESC);

-- ------------------------------------------------------------------------------
-- 3. user_blocks table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_blocks (
  blocker_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (blocker_id, blocked_id),
  CONSTRAINT chk_user_blocks_different_users CHECK (blocker_id != blocked_id)
);

CREATE INDEX IF NOT EXISTS idx_user_blocks_blocked
  ON public.user_blocks (blocked_id);

-- ------------------------------------------------------------------------------
-- 4. chat_reports table
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chat_reports (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id      UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  reporter_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reported_user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reason               TEXT NOT NULL CHECK (reason IN ('scam', 'harassment', 'spam', 'other')),
  detail               TEXT CHECK (detail IS NULL OR length(detail) <= 500),
  message_ids_snapshot BIGINT[] NOT NULL DEFAULT '{}',
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  resolved_at          TIMESTAMPTZ,
  resolved_by          UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_chat_reports_conversation
  ON public.chat_reports (conversation_id);

CREATE INDEX IF NOT EXISTS idx_chat_reports_unresolved
  ON public.chat_reports (created_at DESC)
  WHERE resolved_at IS NULL;

-- ------------------------------------------------------------------------------
-- 5. pending_chat_notifications table (for throttled email notifications)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pending_chat_notifications (
  conversation_id UUID PRIMARY KEY REFERENCES public.conversations(id) ON DELETE CASCADE,
  recipient_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  first_unread_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_emailed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_pending_notifications_recipient
  ON public.pending_chat_notifications (recipient_id, first_unread_at);

-- ------------------------------------------------------------------------------
-- 6. Row-Level Security (RLS) & Column-Level Grants
-- ------------------------------------------------------------------------------
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_chat_notifications ENABLE ROW LEVEL SECURITY;

-- Strip all direct permissions from public, anon, and authenticated
REVOKE ALL ON public.conversations FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.messages FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.user_blocks FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.chat_reports FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.pending_chat_notifications FROM PUBLIC, anon, authenticated;

-- Authenticated users get ONLY SELECT permission on tables where they are participants
GRANT SELECT ON public.conversations TO authenticated;
GRANT SELECT ON public.messages TO authenticated;
GRANT SELECT ON public.user_blocks TO authenticated;

-- Policies:
-- 1. conversations SELECT: only buyer or seller
CREATE POLICY "conversations_select_participant"
  ON public.conversations
  FOR SELECT
  TO authenticated
  USING (buyer_id = (SELECT auth.uid()) OR seller_id = (SELECT auth.uid()));

-- 2. messages SELECT: only participants of the parent conversation
CREATE POLICY "messages_select_participant"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = messages.conversation_id
        AND (c.buyer_id = (SELECT auth.uid()) OR c.seller_id = (SELECT auth.uid()))
    )
  );

-- 3. user_blocks SELECT: only blocker can see who they blocked
CREATE POLICY "user_blocks_select_own"
  ON public.user_blocks
  FOR SELECT
  TO authenticated
  USING (blocker_id = (SELECT auth.uid()));

-- chat_reports & pending_chat_notifications have NO client policies (internal/RPC only)

-- ------------------------------------------------------------------------------
-- 7. Add messages table to Supabase Realtime publication
-- ------------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime'
        AND schemaname = 'public'
        AND tablename = 'messages'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
    END IF;
  END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 8. Seed app_settings for Chat limits
-- ------------------------------------------------------------------------------
INSERT INTO public.app_settings (key, value) VALUES
  ('chat_max_messages_minute',                 '10'),
  ('chat_max_messages_day',                    '200'),
  ('chat_max_new_conversations_day_new_acct',  '10'),
  ('chat_max_new_conversations_day_old_acct',  '30'),
  ('chat_retention_days',                      '180')
ON CONFLICT (key) DO NOTHING;
