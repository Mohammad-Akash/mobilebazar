-- ==============================================================================
-- Migration 036: Include Email in Admin User Management
-- Enables admins to view and search users by their email/Gmail in the admin panel
-- ==============================================================================

-- 1. Add email column to profile_private for persistence & direct lookup
ALTER TABLE public.profile_private ADD COLUMN IF NOT EXISTS email TEXT;

-- 2. Backfill existing emails from auth.users
UPDATE public.profile_private pp
SET email = u.email
FROM auth.users u
WHERE pp.id = u.id AND (pp.email IS NULL OR pp.email = '');

-- 3. Update handle_new_user() trigger to automatically save email on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
AS $$
DECLARE
    v_full_name TEXT;
    v_avatar_url TEXT;
    v_phone TEXT;
BEGIN
    v_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        'User'
    );
    v_avatar_url := NEW.raw_user_meta_data->>'avatar_url';
    v_phone := NEW.phone;

    -- 1. Insert into public profiles
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (NEW.id, v_full_name, v_avatar_url)
    ON CONFLICT (id) DO UPDATE 
    SET full_name = EXCLUDED.full_name,
        avatar_url = COALESCE(EXCLUDED.avatar_url, profiles.avatar_url);

    -- 2. Insert into private profile with email
    INSERT INTO public.profile_private (id, email, phone, is_phone_verified)
    VALUES (
        NEW.id, 
        NEW.email,
        v_phone,
        CASE WHEN NEW.phone_confirmed_at IS NOT NULL THEN true ELSE false END
    )
    ON CONFLICT (id) DO UPDATE 
    SET email = COALESCE(EXCLUDED.email, profile_private.email),
        phone = COALESCE(EXCLUDED.phone, profile_private.phone);

    RETURN NEW;
END;
$$;

-- 4. Update admin_list_users to return email directly from auth.users
DROP FUNCTION IF EXISTS public.admin_list_users(TEXT, TIMESTAMPTZ, UUID, INT);

CREATE OR REPLACE FUNCTION public.admin_list_users(
    p_search            TEXT DEFAULT NULL,
    p_cursor_created_at TIMESTAMPTZ DEFAULT NULL,
    p_cursor_id         UUID DEFAULT NULL,
    p_limit             INT DEFAULT 20
)
RETURNS TABLE (
    id                UUID,
    full_name         TEXT,
    email             TEXT,
    role              user_role,
    is_phone_verified BOOLEAN,
    is_banned         BOOLEAN,
    masked_phone      TEXT,
    ads_count         INT,
    created_at        TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_is_adm       BOOLEAN;
    v_clean_search TEXT;
    v_actual_limit INT;
BEGIN
    PERFORM public.require_staff();

    v_is_adm := public.is_admin();
    v_actual_limit := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);
    v_clean_search := NULLIF(trim(p_search), '');

    RETURN QUERY
    SELECT
        p.id,
        p.full_name::TEXT,
        COALESCE(u.email::TEXT, pp.email::TEXT, 'No email') AS email,
        pp.role,
        pp.is_phone_verified,
        pp.is_banned,
        CASE
            WHEN pp.phone IS NULL THEN 'No phone'
            ELSE substr(pp.phone, 1, 5) || '****' || right(pp.phone, 3)
        END AS masked_phone,
        p.ads_count,
        p.created_at
    FROM public.profiles p
    JOIN public.profile_private pp ON pp.id = p.id
    LEFT JOIN auth.users u ON u.id = p.id
    WHERE (
        v_clean_search IS NULL
        OR p.full_name ILIKE '%' || v_clean_search || '%'
        OR (v_is_adm AND pp.phone ILIKE '%' || v_clean_search || '%')
        OR (v_is_adm AND (u.email ILIKE '%' || v_clean_search || '%' OR pp.email ILIKE '%' || v_clean_search || '%'))
    )
    AND (
        p_cursor_created_at IS NULL
        OR (p.created_at, p.id) < (p_cursor_created_at, p_cursor_id)
    )
    ORDER BY p.created_at DESC, p.id DESC
    LIMIT v_actual_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_users(TEXT, TIMESTAMPTZ, UUID, INT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_list_users(TEXT, TIMESTAMPTZ, UUID, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_users(TEXT, TIMESTAMPTZ, UUID, INT) TO authenticated;
