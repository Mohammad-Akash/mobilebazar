-- ==============================================================================
-- Migration 031: In-App Chat Security Definer RPC Functions
-- ==============================================================================
-- Provides:
--   1. start_conversation
--   2. send_message
--   3. mark_read
--   4. block_user / unblock_user
--   5. report_conversation
--   6. get_unread_chat_total
--   7. list_conversations
--   8. get_messages
--   9. get_pending_chat_email_notifications
--  10. cleanup_old_chat_messages
--  11. admin_list_chat_reports & admin_get_reported_conversation
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. start_conversation
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.start_conversation(
  p_ad_id UUID,
  p_initial_message TEXT DEFAULT NULL,
  p_offer_amount BIGINT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id    UUID;
  v_seller_id    UUID;
  v_ad_status    TEXT;
  v_conv_id      UUID;
  v_is_new_acct  BOOLEAN;
  v_daily_limit  INT;
  v_count_today  INT;
  v_send_res     JSONB;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Login zaroori hai chat shuru karne ke liye' USING ERRCODE = 'P0001';
  END IF;

  IF NOT public.current_user_phone_verified() THEN
    RETURN jsonb_build_object('success', false, 'code', 'PHONE_NOT_VERIFIED', 'message', 'Chat shuru karne ke liye phone verify karein.');
  END IF;

  IF public.is_banned() THEN
    RETURN jsonb_build_object('success', false, 'code', 'USER_BANNED', 'message', 'Aap ka account suspended hai.');
  END IF;

  -- Verify ad exists and is active
  SELECT seller_id, status INTO v_seller_id, v_ad_status
  FROM public.ads
  WHERE id = p_ad_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'code', 'AD_NOT_FOUND', 'message', 'Yeh ishtehaar mojood nahi hai.');
  END IF;

  IF v_ad_status != 'active' THEN
    RETURN jsonb_build_object('success', false, 'code', 'AD_INACTIVE', 'message', 'Yeh handset ab active nahi hai.');
  END IF;

  IF v_seller_id = v_caller_id THEN
    RETURN jsonb_build_object('success', false, 'code', 'OWN_AD', 'message', 'Aap apne hi handset par chat shuru nahi kar sakte.');
  END IF;

  -- Block check
  IF EXISTS (
    SELECT 1 FROM public.user_blocks
    WHERE (blocker_id = v_caller_id AND blocked_id = v_seller_id)
       OR (blocker_id = v_seller_id AND blocked_id = v_caller_id)
  ) THEN
    RETURN jsonb_build_object('success', false, 'code', 'USER_BLOCKED', 'message', 'Is user ke sath rabta mumkin nahi hai.');
  END IF;

  -- Check if conversation already exists
  SELECT id INTO v_conv_id
  FROM public.conversations
  WHERE ad_id = p_ad_id AND buyer_id = v_caller_id;

  -- If new conversation, enforce daily limits
  IF v_conv_id IS NULL THEN
    SELECT (now() - created_at) < interval '24 hours' INTO v_is_new_acct
    FROM public.profiles
    WHERE id = v_caller_id;

    IF v_is_new_acct THEN
      v_daily_limit := public.get_setting_int('chat_max_new_conversations_day_new_acct', 10);
    ELSE
      v_daily_limit := public.get_setting_int('chat_max_new_conversations_day_old_acct', 30);
    END IF;

    SELECT COUNT(*) INTO v_count_today
    FROM public.conversations
    WHERE buyer_id = v_caller_id AND created_at >= CURRENT_DATE;

    IF v_count_today >= v_daily_limit THEN
      RETURN jsonb_build_object('success', false, 'code', 'DAILY_LIMIT_REACHED', 'message', 'Aap ki aaj ki nayi chat limit poori ho chuki hai. Baraye meharbani kal koshish karein.');
    END IF;

    INSERT INTO public.conversations (
      ad_id, buyer_id, seller_id, created_at, last_message_at,
      buyer_last_read_at, seller_last_read_at, buyer_unread_count, seller_unread_count
    ) VALUES (
      p_ad_id, v_caller_id, v_seller_id, now(), now(),
      now(), now(), 0, 0
    )
    RETURNING id INTO v_conv_id;
  END IF;

  -- Send initial message if provided
  IF p_initial_message IS NOT NULL AND length(trim(p_initial_message)) > 0 THEN
    v_send_res := public.send_message(
      v_conv_id,
      p_initial_message,
      CASE WHEN p_offer_amount IS NOT NULL THEN 'offer' ELSE 'text' END,
      p_offer_amount
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'conversation_id', v_conv_id,
    'ad_id', p_ad_id
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.start_conversation(UUID, TEXT, BIGINT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.start_conversation(UUID, TEXT, BIGINT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. send_message
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.send_message(
  p_conversation_id UUID,
  p_body TEXT,
  p_kind TEXT DEFAULT 'text',
  p_offer_amount BIGINT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id       UUID;
  v_conv            RECORD;
  v_recipient_id    UUID;
  v_clean_body      TEXT;
  v_normalized      TEXT;
  v_term            TEXT;
  v_ad_price        BIGINT;
  v_count_minute    INT;
  v_count_day       INT;
  v_blast_count     INT;
  v_new_msg_id      BIGINT;
  v_new_created_at  TIMESTAMPTZ;
  v_has_phone       BOOLEAN := false;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RAISE EXCEPTION 'Login zaroori hai message bhejne ke liye' USING ERRCODE = 'P0001';
  END IF;

  IF NOT public.current_user_phone_verified() THEN
    RETURN jsonb_build_object('success', false, 'code', 'PHONE_NOT_VERIFIED', 'message', 'Phone verification zaroori hai.');
  END IF;

  IF public.is_banned() THEN
    RETURN jsonb_build_object('success', false, 'code', 'USER_BANNED', 'message', 'Aap ka account suspended hai.');
  END IF;

  -- Lock conversation row
  SELECT * INTO v_conv
  FROM public.conversations
  WHERE id = p_conversation_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'code', 'CONVERSATION_NOT_FOUND', 'message', 'Conversation mojood nahi hai.');
  END IF;

  IF v_conv.buyer_id != v_caller_id AND v_conv.seller_id != v_caller_id THEN
    RETURN jsonb_build_object('success', false, 'code', 'FORBIDDEN', 'message', 'Aap is conversation ke participant nahi hain.');
  END IF;

  IF v_caller_id = v_conv.buyer_id THEN
    v_recipient_id := v_conv.seller_id;
  ELSE
    v_recipient_id := v_conv.buyer_id;
  END IF;

  -- Block check: Quiet delivery failure if blocked
  IF EXISTS (
    SELECT 1 FROM public.user_blocks
    WHERE (blocker_id = v_recipient_id AND blocked_id = v_caller_id)
       OR (blocker_id = v_caller_id AND blocked_id = v_recipient_id)
  ) THEN
    RETURN jsonb_build_object('success', false, 'code', 'BLOCKED', 'message', 'Message deliver nahi ho saka.');
  END IF;

  -- Validate length
  v_clean_body := trim(p_body);
  IF length(v_clean_body) < 1 OR length(v_clean_body) > 1000 THEN
    RETURN jsonb_build_object('success', false, 'code', 'INVALID_LENGTH', 'message', 'Message 1 se 1000 characters ka hona chahiye.');
  END IF;

  -- Rate limit per minute & day
  SELECT COUNT(*) INTO v_count_minute
  FROM public.messages
  WHERE sender_id = v_caller_id AND created_at > now() - interval '1 minute';

  IF v_count_minute >= public.get_setting_int('chat_max_messages_minute', 10) THEN
    RETURN jsonb_build_object('success', false, 'code', 'RATE_LIMITED_MINUTE', 'message', 'Aap bohot taizi se messages bhej rahe hain. Kuch lamhe intezar karein.');
  END IF;

  SELECT COUNT(*) INTO v_count_day
  FROM public.messages
  WHERE sender_id = v_caller_id AND created_at > now() - interval '24 hours';

  IF v_count_day >= public.get_setting_int('chat_max_messages_day', 200) THEN
    RETURN jsonb_build_object('success', false, 'code', 'RATE_LIMITED_DAY', 'message', 'Aap ki 24 ghante ki message limit poori ho chuki hai.');
  END IF;

  -- Spam normalization & Link hard block
  v_normalized := public.normalize_text(v_clean_body);

  IF v_normalized ~ '(https?://|www\.|\.com|\.pk|\.net|\.org|bit\.ly|wa\.me)' THEN
    RETURN jsonb_build_object('success', false, 'code', 'LINKS_NOT_ALLOWED', 'message', 'Chat mein website ya external links bhejna allowed nahi hai.');
  END IF;

  -- Blocked terms (kind = 'block')
  FOR v_term IN
    SELECT term FROM public.blocked_terms WHERE kind = 'block' AND is_active = true
  LOOP
    IF v_normalized LIKE ('%' || public.normalize_text(v_term) || '%') THEN
      RETURN jsonb_build_object('success', false, 'code', 'BLOCKED_TERM', 'message', 'Message mein gher-munasib alfaaz hain. Baraye meharbani edit karein.');
    END IF;
  END LOOP;

  -- Copy-paste blast spam detection
  SELECT COUNT(DISTINCT c.id) INTO v_blast_count
  FROM public.messages m
  JOIN public.conversations c ON m.conversation_id = c.id
  WHERE m.sender_id = v_caller_id
    AND m.created_at > now() - interval '1 hour'
    AND public.normalize_text(m.body) = v_normalized;

  IF v_blast_count >= 5 THEN
    RETURN jsonb_build_object('success', false, 'code', 'BLAST_SPAM_DETECTED', 'message', 'Aap ek hi message baar baar bhej rahe hain. Please thora intezar karein.');
  END IF;

  -- Phone number detection (allowed, but flagged for in-thread safety warning)
  IF v_normalized ~ '(^|[^0-9])(0|\+?92)(3[0-9]{9})([^0-9]|$)' THEN
    v_has_phone := true;
  END IF;

  -- Offer validation
  IF p_kind = 'offer' THEN
    IF p_offer_amount IS NULL OR p_offer_amount <= 0 THEN
      RETURN jsonb_build_object('success', false, 'code', 'INVALID_OFFER', 'message', 'Offer amount valid honi chahiye.');
    END IF;

    SELECT price INTO v_ad_price FROM public.ads WHERE id = v_conv.ad_id;
    IF v_ad_price IS NOT NULL THEN
      IF p_offer_amount < (v_ad_price * 0.3) OR p_offer_amount > (v_ad_price * 1.5) THEN
        RETURN jsonb_build_object('success', false, 'code', 'OFFER_OUT_OF_RANGE', 'message', 'Offer price ad ki qeemat ke mutabiq honi chahiye (kam az kam 30% aur zyada se zyada 150%).');
      END IF;
    END IF;
  END IF;

  -- Insert message
  INSERT INTO public.messages (
    conversation_id, sender_id, kind, body, offer_amount, created_at
  ) VALUES (
    p_conversation_id, v_caller_id, p_kind, v_clean_body, p_offer_amount, now()
  )
  RETURNING id, created_at INTO v_new_msg_id, v_new_created_at;

  -- Update conversation counters & timestamp
  UPDATE public.conversations
  SET last_message_at = v_new_created_at,
      last_message_preview = substring(v_clean_body from 1 for 80),
      buyer_unread_count = CASE WHEN v_caller_id = seller_id THEN buyer_unread_count + 1 ELSE buyer_unread_count END,
      seller_unread_count = CASE WHEN v_caller_id = buyer_id THEN seller_unread_count + 1 ELSE seller_unread_count END
  WHERE id = p_conversation_id;

  -- Upsert notification queue for email throttling
  INSERT INTO public.pending_chat_notifications (conversation_id, recipient_id, first_unread_at)
  VALUES (p_conversation_id, v_recipient_id, now())
  ON CONFLICT (conversation_id) DO NOTHING;

  RETURN jsonb_build_object(
    'success', true,
    'message_id', v_new_msg_id,
    'created_at', v_new_created_at,
    'has_phone_number', v_has_phone
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.send_message(UUID, TEXT, TEXT, BIGINT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.send_message(UUID, TEXT, TEXT, BIGINT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 3. mark_read
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.mark_read(p_conversation_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'code', 'UNAUTHORIZED');
  END IF;

  UPDATE public.conversations
  SET buyer_unread_count  = CASE WHEN v_caller_id = buyer_id  THEN 0 ELSE buyer_unread_count  END,
      seller_unread_count = CASE WHEN v_caller_id = seller_id THEN 0 ELSE seller_unread_count END,
      buyer_last_read_at  = CASE WHEN v_caller_id = buyer_id  THEN now() ELSE buyer_last_read_at  END,
      seller_last_read_at = CASE WHEN v_caller_id = seller_id THEN now() ELSE seller_last_read_at END
  WHERE id = p_conversation_id
    AND (buyer_id = v_caller_id OR seller_id = v_caller_id);

  DELETE FROM public.pending_chat_notifications
  WHERE conversation_id = p_conversation_id AND recipient_id = v_caller_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.mark_read(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.mark_read(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. block_user / unblock_user
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.block_user(p_target_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'code', 'UNAUTHORIZED');
  END IF;

  IF v_caller_id = p_target_id THEN
    RETURN jsonb_build_object('success', false, 'code', 'CANNOT_BLOCK_SELF');
  END IF;

  INSERT INTO public.user_blocks (blocker_id, blocked_id)
  VALUES (v_caller_id, p_target_id)
  ON CONFLICT (blocker_id, blocked_id) DO NOTHING;

  RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.block_user(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.block_user(UUID) TO authenticated;

CREATE OR REPLACE FUNCTION public.unblock_user(p_target_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'code', 'UNAUTHORIZED');
  END IF;

  DELETE FROM public.user_blocks
  WHERE blocker_id = v_caller_id AND blocked_id = p_target_id;

  RETURN jsonb_build_object('success', true);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.unblock_user(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.unblock_user(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 5. report_conversation
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.report_conversation(
  p_conversation_id UUID,
  p_reason TEXT,
  p_detail TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_caller_id    UUID;
  v_conv         RECORD;
  v_reported_id  UUID;
  v_snapshot     BIGINT[];
  v_report_id    UUID;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'code', 'UNAUTHORIZED');
  END IF;

  SELECT * INTO v_conv
  FROM public.conversations
  WHERE id = p_conversation_id;

  IF NOT FOUND OR (v_conv.buyer_id != v_caller_id AND v_conv.seller_id != v_caller_id) THEN
    RETURN jsonb_build_object('success', false, 'code', 'FORBIDDEN');
  END IF;

  IF v_caller_id = v_conv.buyer_id THEN
    v_reported_id := v_conv.seller_id;
  ELSE
    v_reported_id := v_conv.buyer_id;
  END IF;

  -- Capture snapshot of last 50 message IDs for evidence preservation
  SELECT ARRAY(
    SELECT id FROM public.messages
    WHERE conversation_id = p_conversation_id
    ORDER BY id DESC
    LIMIT 50
  ) INTO v_snapshot;

  INSERT INTO public.chat_reports (
    conversation_id, reporter_id, reported_user_id, reason, detail, message_ids_snapshot
  ) VALUES (
    p_conversation_id, v_caller_id, v_reported_id, p_reason, p_detail, COALESCE(v_snapshot, '{}')
  )
  RETURNING id INTO v_report_id;

  RETURN jsonb_build_object('success', true, 'report_id', v_report_id);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.report_conversation(UUID, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.report_conversation(UUID, TEXT, TEXT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 6. get_unread_chat_total
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_unread_chat_total()
RETURNS INT
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT COALESCE(SUM(
    CASE
      WHEN buyer_id  = auth.uid() THEN buyer_unread_count
      WHEN seller_id = auth.uid() THEN seller_unread_count
      ELSE 0
    END
  ), 0)::INT
  FROM public.conversations
  WHERE buyer_id = auth.uid() OR seller_id = auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.get_unread_chat_total() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_unread_chat_total() TO authenticated;

-- ------------------------------------------------------------------------------
-- 7. list_conversations
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.list_conversations(
  p_tab TEXT DEFAULT 'all',
  p_cursor TIMESTAMPTZ DEFAULT NULL,
  p_limit INT DEFAULT 20
)
RETURNS TABLE (
  conversation_id      UUID,
  ad_id                UUID,
  ad_title             TEXT,
  ad_price             BIGINT,
  ad_status            TEXT,
  ad_cover_image       TEXT,
  other_user_id        UUID,
  other_user_name      TEXT,
  other_user_avatar    TEXT,
  last_message_at      TIMESTAMPTZ,
  last_message_preview VARCHAR(100),
  unread_count         INT,
  is_buyer             BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  v_caller_id UUID;
  v_safe_limit INT;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RETURN;
  END IF;

  v_safe_limit := LEAST(GREATEST(p_limit, 1), 50);

  RETURN QUERY
  SELECT
    c.id AS conversation_id,
    a.id AS ad_id,
    a.title AS ad_title,
    a.price AS ad_price,
    a.status::TEXT AS ad_status,
    (
      SELECT img.storage_path
      FROM public.ad_images img
      WHERE img.ad_id = a.id
      ORDER BY img.position ASC
      LIMIT 1
    ) AS ad_cover_image,
    CASE WHEN c.buyer_id = v_caller_id THEN c.seller_id ELSE c.buyer_id END AS other_user_id,
    p.full_name AS other_user_name,
    p.avatar_url AS other_user_avatar,
    c.last_message_at,
    c.last_message_preview,
    CASE WHEN c.buyer_id = v_caller_id THEN c.buyer_unread_count ELSE c.seller_unread_count END AS unread_count,
    (c.buyer_id = v_caller_id) AS is_buyer
  FROM public.conversations c
  JOIN public.ads a ON c.ad_id = a.id
  JOIN public.profiles p ON p.id = (CASE WHEN c.buyer_id = v_caller_id THEN c.seller_id ELSE c.buyer_id END)
  WHERE (c.buyer_id = v_caller_id OR c.seller_id = v_caller_id)
    AND (
      p_tab = 'all'
      OR (p_tab = 'buying' AND c.buyer_id = v_caller_id)
      OR (p_tab = 'selling' AND c.seller_id = v_caller_id)
    )
    AND (p_cursor IS NULL OR c.last_message_at < p_cursor)
  ORDER BY c.last_message_at DESC
  LIMIT v_safe_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.list_conversations(TEXT, TIMESTAMPTZ, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_conversations(TEXT, TIMESTAMPTZ, INT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 8. get_messages (Keyset pagination)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_messages(
  p_conversation_id UUID,
  p_cursor_created_at TIMESTAMPTZ DEFAULT NULL,
  p_cursor_id BIGINT DEFAULT NULL,
  p_limit INT DEFAULT 30
)
RETURNS TABLE (
  id              BIGINT,
  conversation_id UUID,
  sender_id       UUID,
  kind            TEXT,
  body            TEXT,
  offer_amount    BIGINT,
  created_at      TIMESTAMPTZ,
  is_mine         BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  v_caller_id  UUID;
  v_safe_limit INT;
BEGIN
  v_caller_id := auth.uid();
  IF v_caller_id IS NULL THEN
    RETURN;
  END IF;

  -- Ensure caller is participant
  IF NOT EXISTS (
    SELECT 1 FROM public.conversations c
    WHERE c.id = p_conversation_id
      AND (c.buyer_id = v_caller_id OR c.seller_id = v_caller_id)
  ) THEN
    RETURN;
  END IF;

  v_safe_limit := LEAST(GREATEST(p_limit, 1), 60);

  RETURN QUERY
  SELECT
    m.id,
    m.conversation_id,
    m.sender_id,
    m.kind,
    m.body,
    m.offer_amount,
    m.created_at,
    (m.sender_id = v_caller_id) AS is_mine
  FROM public.messages m
  WHERE m.conversation_id = p_conversation_id
    AND (
      p_cursor_created_at IS NULL
      OR (m.created_at, m.id) < (p_cursor_created_at, p_cursor_id)
    )
  ORDER BY m.created_at DESC, m.id DESC
  LIMIT v_safe_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_messages(UUID, TIMESTAMPTZ, BIGINT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_messages(UUID, TIMESTAMPTZ, BIGINT, INT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 9. get_pending_chat_email_notifications (Cron only)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_pending_chat_email_notifications(p_limit INT DEFAULT 50)
RETURNS TABLE (
  conversation_id UUID,
  recipient_id    UUID,
  recipient_name  TEXT,
  recipient_email TEXT,
  ad_title        TEXT,
  unread_count    INT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Returns only users with unread messages > 10 min old and not emailed in last hour
  RETURN QUERY
  SELECT
    pn.conversation_id,
    pn.recipient_id,
    p.full_name AS recipient_name,
    u.email::TEXT AS recipient_email,
    a.title AS ad_title,
    CASE WHEN c.buyer_id = pn.recipient_id THEN c.buyer_unread_count ELSE c.seller_unread_count END AS unread_count
  FROM public.pending_chat_notifications pn
  JOIN public.conversations c ON pn.conversation_id = c.id
  JOIN public.ads a ON c.ad_id = a.id
  JOIN public.profiles p ON p.id = pn.recipient_id
  JOIN auth.users u ON u.id = pn.recipient_id
  WHERE pn.first_unread_at < now() - interval '10 minutes'
    AND (pn.last_emailed_at IS NULL OR pn.last_emailed_at < now() - interval '1 hour')
    AND (
      (c.buyer_id = pn.recipient_id AND c.buyer_unread_count > 0) OR
      (c.seller_id = pn.recipient_id AND c.seller_unread_count > 0)
    )
  LIMIT p_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.get_pending_chat_email_notifications(INT) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------------------------
-- 10. cleanup_old_chat_messages
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.cleanup_old_chat_messages(p_retention_days INT DEFAULT NULL)
RETURNS INT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_days INT;
  v_deleted_count INT;
BEGIN
  v_days := COALESCE(p_retention_days, public.get_setting_int('chat_retention_days', 180));

  -- Delete messages older than retention days, excluding snapshot message IDs in unresolved reports
  WITH protected_ids AS (
    SELECT unnest(message_ids_snapshot) AS msg_id
    FROM public.chat_reports
    WHERE resolved_at IS NULL OR resolved_at > now() - interval '30 days'
  ),
  deleted_rows AS (
    DELETE FROM public.messages m
    WHERE m.created_at < now() - (v_days || ' days')::INTERVAL
      AND NOT EXISTS (
        SELECT 1 FROM protected_ids p WHERE p.msg_id = m.id
      )
    RETURNING id
  )
  SELECT count(*) INTO v_deleted_count FROM deleted_rows;

  RETURN v_deleted_count;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.cleanup_old_chat_messages(INT) FROM PUBLIC, anon, authenticated;

-- ------------------------------------------------------------------------------
-- 11. Admin Chat Moderation (Phase 8 integration ready)
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_list_chat_reports(
  p_status TEXT DEFAULT 'unresolved',
  p_limit INT DEFAULT 50
)
RETURNS TABLE (
  report_id            UUID,
  conversation_id      UUID,
  reporter_id          UUID,
  reporter_name        TEXT,
  reported_user_id     UUID,
  reported_user_name   TEXT,
  ad_id                UUID,
  ad_title             TEXT,
  reason               TEXT,
  detail               TEXT,
  messages_count       INT,
  created_at           TIMESTAMPTZ,
  resolved_at          TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'Access denied. Staff only.' USING ERRCODE = 'P0001';
  END IF;

  RETURN QUERY
  SELECT
    cr.id AS report_id,
    cr.conversation_id,
    cr.reporter_id,
    rp.full_name AS reporter_name,
    cr.reported_user_id,
    tp.full_name AS reported_user_name,
    c.ad_id,
    a.title AS ad_title,
    cr.reason,
    cr.detail,
    cardinality(cr.message_ids_snapshot) AS messages_count,
    cr.created_at,
    cr.resolved_at
  FROM public.chat_reports cr
  JOIN public.conversations c ON cr.conversation_id = c.id
  JOIN public.ads a ON c.ad_id = a.id
  JOIN public.profiles rp ON rp.id = cr.reporter_id
  JOIN public.profiles tp ON tp.id = cr.reported_user_id
  WHERE (
    p_status = 'all'
    OR (p_status = 'unresolved' AND cr.resolved_at IS NULL)
    OR (p_status = 'resolved' AND cr.resolved_at IS NOT NULL)
  )
  ORDER BY cr.created_at DESC
  LIMIT LEAST(GREATEST(p_limit, 1), 100);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_chat_reports(TEXT, INT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_list_chat_reports(TEXT, INT) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_get_reported_conversation(p_report_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_staff_id UUID;
  v_report   RECORD;
  v_messages JSONB;
BEGIN
  v_staff_id := auth.uid();
  IF NOT public.is_staff() THEN
    RAISE EXCEPTION 'Access denied. Staff only.' USING ERRCODE = 'P0001';
  END IF;

  SELECT * INTO v_report
  FROM public.chat_reports
  WHERE id = p_report_id;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND');
  END IF;

  -- Log audit record (Staff cannot browse chats unmonitored)
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'audit_logs') THEN
    INSERT INTO public.audit_logs (actor_id, action, target_type, target_id, details)
    VALUES (
      v_staff_id,
      'VIEW_REPORTED_CHAT',
      'chat_reports',
      p_report_id,
      jsonb_build_object('conversation_id', v_report.conversation_id, 'reason', v_report.reason)
    );
  END IF;

  -- Return ONLY the snapshot message rows recorded at time of report
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', m.id,
      'sender_id', m.sender_id,
      'sender_name', p.full_name,
      'kind', m.kind,
      'body', m.body,
      'offer_amount', m.offer_amount,
      'created_at', m.created_at
    ) ORDER BY m.created_at ASC
  ) INTO v_messages
  FROM public.messages m
  JOIN public.profiles p ON p.id = m.sender_id
  WHERE m.id = ANY(v_report.message_ids_snapshot);

  RETURN jsonb_build_object(
    'success', true,
    'report', row_to_json(v_report),
    'messages', COALESCE(v_messages, '[]'::jsonb)
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_get_reported_conversation(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_reported_conversation(UUID) TO authenticated;
