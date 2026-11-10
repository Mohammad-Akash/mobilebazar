-- ==============================================================================
-- Migration 028: Admin Read RPCs, PII Protection & Telemetry Stats (Phase 8)
--
-- All functions require require_staff() or require_admin()
-- Keyset pagination (max 50 limit)
-- PII masking by default, logged reveal for admins only
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. admin_list_ads
-- Keyset pagination for moderator queues (no PII, no IMEI)
-- ------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.admin_list_ads(public.ad_status, TEXT, UUID, TIMESTAMPTZ, UUID, INT);
CREATE OR REPLACE FUNCTION public.admin_list_ads(
    p_status            public.ad_status DEFAULT NULL,
    p_search            TEXT DEFAULT NULL,
    p_seller_id         UUID DEFAULT NULL,
    p_cursor_created_at TIMESTAMPTZ DEFAULT NULL,
    p_cursor_id         UUID DEFAULT NULL,
    p_limit             INT DEFAULT 20
)
RETURNS TABLE (
    id              UUID,
    title           TEXT,
    price           NUMERIC,
    status          public.ad_status,
    seller_id       UUID,
    seller_name     TEXT,
    city_name       TEXT,
    brand_name      TEXT,
    model_name      TEXT,
    cover_image     TEXT,
    reports_count   BIGINT,
    max_flag_score  INT,
    created_at      TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_clean_search TEXT;
    v_actual_limit INT;
BEGIN
    PERFORM public.require_staff();

    v_actual_limit := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);
    v_clean_search := NULLIF(trim(p_search), '');

    RETURN QUERY
    SELECT
        a.id,
        a.title,
        a.price,
        a.status,
        a.seller_id,
        p.full_name AS seller_name,
        c.name AS city_name,
        b.name AS brand_name,
        m.name AS model_name,
        (
            SELECT img.storage_path
            FROM public.ad_images img
            WHERE img.ad_id = a.id
            ORDER BY img.position ASC
            LIMIT 1
        ) AS cover_image,
        (
            SELECT COUNT(*)
            FROM public.reports r
            WHERE r.ad_id = a.id AND r.status = 'pending'
        ) AS reports_count,
        COALESCE(
            (
                SELECT MAX(f.score)
                FROM public.ad_flags f
                WHERE f.ad_id = a.id AND f.resolved_at IS NULL
            ),
            0
        ) AS max_flag_score,
        a.created_at
    FROM public.ads a
    JOIN public.profiles p ON p.id = a.seller_id
    JOIN public.cities c ON c.id = a.city_id
    JOIN public.brands b ON b.id = a.brand_id
    JOIN public.models m ON m.id = a.model_id
    WHERE (p_status IS NULL OR a.status = p_status)
      AND (p_seller_id IS NULL OR a.seller_id = p_seller_id)
      AND (
          v_clean_search IS NULL
          OR a.title ILIKE '%' || v_clean_search || '%'
          OR b.name ILIKE '%' || v_clean_search || '%'
          OR m.name ILIKE '%' || v_clean_search || '%'
      )
      AND (
          p_cursor_created_at IS NULL
          OR (a.created_at, a.id) < (p_cursor_created_at, p_cursor_id)
      )
    ORDER BY a.created_at DESC, a.id DESC
    LIMIT v_actual_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_ads(public.ad_status, TEXT, UUID, TIMESTAMPTZ, UUID, INT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_list_ads(public.ad_status, TEXT, UUID, TIMESTAMPTZ, UUID, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_ads(public.ad_status, TEXT, UUID, TIMESTAMPTZ, UUID, INT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 2. admin_get_ad
-- Full details, specs, images, attached reports, flags, and moderation history
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_get_ad(p_ad_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_ad         JSONB;
    v_images     JSONB;
    v_reports    JSONB;
    v_flags      JSONB;
    v_moderation JSONB;
    v_imei       TEXT := NULL;
    v_is_adm     BOOLEAN;
BEGIN
    PERFORM public.require_staff();

    IF p_ad_id IS NULL THEN
        RAISE EXCEPTION 'Ad ID is required' USING ERRCODE = 'MB400';
    END IF;

    -- Fetch base ad with relations
    SELECT to_jsonb(row_data) INTO v_ad
    FROM (
        SELECT
            a.id,
            a.title,
            a.description,
            a.price,
            a.status,
            a.condition,
            a.pta_status,
            a.storage_gb,
            a.ram_gb,
            a.battery_health,
            a.color,
            a.has_box,
            a.has_charger,
            a.warranty_type,
            a.created_at,
            a.updated_at,
            a.expires_at,
            a.deleted_at,
            a.seller_id,
            p.full_name AS seller_name,
            c.name AS city_name,
            b.name AS brand_name,
            m.name AS model_name
        FROM public.ads a
        JOIN public.profiles p ON p.id = a.seller_id
        JOIN public.cities c ON c.id = a.city_id
        JOIN public.brands b ON b.id = a.brand_id
        JOIN public.models m ON m.id = a.model_id
        WHERE a.id = p_ad_id
    ) row_data;

    IF v_ad IS NULL THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'Ad not found');
    END IF;

    -- Images
    SELECT COALESCE(jsonb_agg(to_jsonb(img) ORDER BY img.position ASC), '[]'::jsonb) INTO v_images
    FROM (
        SELECT id, storage_path, position
        FROM public.ad_images
        WHERE ad_id = p_ad_id
    ) img;

    -- Attached Reports
    SELECT COALESCE(jsonb_agg(to_jsonb(rep) ORDER BY rep.created_at DESC), '[]'::jsonb) INTO v_reports
    FROM (
        SELECT
            r.id,
            r.reason,
            r.details,
            r.status,
            r.created_at,
            r.reporter_id,
            pr.full_name AS reporter_name,
            pr.created_at AS reporter_joined_at
        FROM public.reports r
        JOIN public.profiles pr ON pr.id = r.reporter_id
        WHERE r.ad_id = p_ad_id
    ) rep;

    -- Attached Flags
    SELECT COALESCE(jsonb_agg(to_jsonb(flg) ORDER BY flg.created_at DESC), '[]'::jsonb) INTO v_flags
    FROM (
        SELECT id, flag_type, detail, score, outcome, created_at, resolved_at
        FROM public.ad_flags
        WHERE ad_id = p_ad_id
    ) flg;

    -- Moderation History
    SELECT COALESCE(jsonb_agg(to_jsonb(mod) ORDER BY mod.created_at DESC), '[]'::jsonb) INTO v_moderation
    FROM (
        SELECT
            m.id,
            m.reason,
            m.created_at,
            mp.full_name AS moderator_name
        FROM public.ad_moderation m
        LEFT JOIN public.profiles mp ON mp.id = m.moderator_id
        WHERE m.ad_id = p_ad_id
    ) mod;

    -- Check if caller is admin for IMEI inspection
    v_is_adm := public.is_admin();
    IF v_is_adm THEN
        SELECT imei INTO v_imei FROM public.ad_private WHERE ad_id = p_ad_id;
    END IF;

    RETURN jsonb_build_object(
        'success', true,
        'ad', v_ad,
        'images', v_images,
        'reports', v_reports,
        'flags', v_flags,
        'moderation_history', v_moderation,
        'imei', v_imei,
        'can_view_pii', v_is_adm
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_get_ad(UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_get_ad(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_get_ad(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 3. admin_list_reports
-- Grouped by ad, oldest pending first with distinct reporter count
-- ------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.admin_list_reports(public.report_status, TIMESTAMPTZ, UUID, INT);
CREATE OR REPLACE FUNCTION public.admin_list_reports(
    p_status            public.report_status DEFAULT 'pending',
    p_cursor_created_at TIMESTAMPTZ DEFAULT NULL,
    p_cursor_ad_id      UUID DEFAULT NULL,
    p_limit             INT DEFAULT 20
)
RETURNS TABLE (
    ad_id               UUID,
    ad_title            TEXT,
    ad_status           public.ad_status,
    seller_name         TEXT,
    pending_count       BIGINT,
    distinct_reporters  BIGINT,
    reasons             TEXT[],
    oldest_report_at    TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_actual_limit INT;
BEGIN
    PERFORM public.require_staff();

    v_actual_limit := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);

    RETURN QUERY
    SELECT
        a.id AS ad_id,
        a.title AS ad_title,
        a.status AS ad_status,
        p.full_name AS seller_name,
        COUNT(r.id) AS pending_count,
        COUNT(DISTINCT r.reporter_id) AS distinct_reporters,
        array_agg(DISTINCT r.reason::text) AS reasons,
        MIN(r.created_at) AS oldest_report_at
    FROM public.reports r
    JOIN public.ads a ON a.id = r.ad_id
    JOIN public.profiles p ON p.id = a.seller_id
    WHERE (p_status IS NULL OR r.status = p_status)
    GROUP BY a.id, a.title, a.status, p.full_name
    HAVING (
        p_cursor_created_at IS NULL
        OR (MIN(r.created_at), a.id) < (p_cursor_created_at, p_cursor_ad_id)
    )
    ORDER BY oldest_report_at ASC, a.id ASC
    LIMIT v_actual_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_reports(public.report_status, TIMESTAMPTZ, UUID, INT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_list_reports(public.report_status, TIMESTAMPTZ, UUID, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_reports(public.report_status, TIMESTAMPTZ, UUID, INT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 4. admin_list_flags
-- Unresolved spam signals ordered by score descending
-- ------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.admin_list_flags(BOOLEAN, TIMESTAMPTZ, UUID, INT);
CREATE OR REPLACE FUNCTION public.admin_list_flags(
    p_unresolved_only   BOOLEAN DEFAULT true,
    p_cursor_created_at TIMESTAMPTZ DEFAULT NULL,
    p_cursor_id         UUID DEFAULT NULL,
    p_limit             INT DEFAULT 20
)
RETURNS TABLE (
    id          UUID,
    ad_id       UUID,
    ad_title    TEXT,
    ad_status   public.ad_status,
    seller_name TEXT,
    flag_type   TEXT,
    detail      TEXT,
    score       INT,
    outcome     TEXT,
    created_at  TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_actual_limit INT;
BEGIN
    PERFORM public.require_staff();

    v_actual_limit := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);

    RETURN QUERY
    SELECT
        f.id,
        f.ad_id,
        a.title AS ad_title,
        a.status AS ad_status,
        p.full_name AS seller_name,
        f.flag_type,
        f.detail,
        f.score,
        f.outcome,
        f.created_at,
        f.resolved_at
    FROM public.ad_flags f
    JOIN public.ads a ON a.id = f.ad_id
    JOIN public.profiles p ON p.id = a.seller_id
    WHERE (NOT p_unresolved_only OR f.resolved_at IS NULL)
      AND (
          p_cursor_created_at IS NULL
          OR (f.score, f.created_at, f.id) < (
              COALESCE((SELECT score FROM public.ad_flags WHERE id = p_cursor_id), 0),
              p_cursor_created_at,
              p_cursor_id
          )
      )
    ORDER BY f.score DESC, f.created_at ASC, f.id ASC
    LIMIT v_actual_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_flags(BOOLEAN, TIMESTAMPTZ, UUID, INT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_list_flags(BOOLEAN, TIMESTAMPTZ, UUID, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_flags(BOOLEAN, TIMESTAMPTZ, UUID, INT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 5. admin_list_users
-- Keyset pagination. Masks phone for moderators. Admin can search email/phone.
-- ------------------------------------------------------------------------------
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
        p.full_name,
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
    WHERE (
        v_clean_search IS NULL
        OR p.full_name ILIKE '%' || v_clean_search || '%'
        OR (v_is_adm AND pp.phone ILIKE '%' || v_clean_search || '%')
        OR (v_is_adm AND EXISTS (
            SELECT 1 FROM auth.users u
            WHERE u.id = p.id AND u.email ILIKE '%' || v_clean_search || '%'
        ))
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

-- ------------------------------------------------------------------------------
-- 6. admin_get_user
-- Returns user profile, status stats, moderation history, reports count
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_get_user(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_profile       JSONB;
    v_ads_breakdown JSONB;
    v_reports_made  BIGINT;
    v_reports_rec   BIGINT;
    v_actions       JSONB;
BEGIN
    PERFORM public.require_staff();

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID is required' USING ERRCODE = 'MB400';
    END IF;

    SELECT to_jsonb(row_data) INTO v_profile
    FROM (
        SELECT
            p.id,
            p.full_name,
            p.avatar_url,
            p.created_at,
            pp.role,
            pp.is_phone_verified,
            pp.is_banned,
            pp.ban_reason,
            pp.banned_at,
            CASE
                WHEN pp.phone IS NULL THEN 'No phone'
                ELSE substr(pp.phone, 1, 5) || '****' || right(pp.phone, 3)
            END AS masked_phone
        FROM public.profiles p
        JOIN public.profile_private pp ON pp.id = p.id
        WHERE p.id = p_user_id
    ) row_data;

    IF v_profile IS NULL THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'User not found');
    END IF;

    -- Ads count breakdown
    SELECT jsonb_build_object(
        'active', COUNT(*) FILTER (WHERE status = 'active'),
        'under_review', COUNT(*) FILTER (WHERE status = 'under_review'),
        'sold', COUNT(*) FILTER (WHERE status = 'sold'),
        'expired', COUNT(*) FILTER (WHERE status = 'expired'),
        'deleted', COUNT(*) FILTER (WHERE status = 'deleted')
    ) INTO v_ads_breakdown
    FROM public.ads
    WHERE seller_id = p_user_id;

    -- Reports made by this user
    SELECT COUNT(*) INTO v_reports_made
    FROM public.reports
    WHERE reporter_id = p_user_id;

    -- Reports received on this user's ads
    SELECT COUNT(*) INTO v_reports_rec
    FROM public.reports r
    JOIN public.ads a ON a.id = r.ad_id
    WHERE a.seller_id = p_user_id;

    -- Staff actions targeting this user
    SELECT COALESCE(jsonb_agg(to_jsonb(act) ORDER BY act.created_at DESC), '[]'::jsonb) INTO v_actions
    FROM (
        SELECT
            a.id,
            a.action,
            a.reason,
            a.created_at,
            p.full_name AS actor_name
        FROM public.admin_actions a
        JOIN public.profiles p ON p.id = a.actor_id
        WHERE a.target_type = 'user' AND a.target_id = p_user_id::text
        LIMIT 10
    ) act;

    RETURN jsonb_build_object(
        'success', true,
        'profile', v_profile,
        'ads_breakdown', v_ads_breakdown,
        'reports_made_count', v_reports_made,
        'reports_received_count', v_reports_rec,
        'recent_staff_actions', v_actions
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_get_user(UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_get_user(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_get_user(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 7. admin_reveal_user_pii
-- Admin ONLY. Reveals full email and phone. Logs view_pii in admin_actions.
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_reveal_user_pii(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_email TEXT;
    v_phone TEXT;
BEGIN
    PERFORM public.require_admin();

    IF p_user_id IS NULL THEN
        RAISE EXCEPTION 'User ID is required' USING ERRCODE = 'MB400';
    END IF;

    SELECT u.email INTO v_email
    FROM auth.users u
    WHERE u.id = p_user_id;

    SELECT pp.phone INTO v_phone
    FROM public.profile_private pp
    WHERE pp.id = p_user_id;

    IF v_email IS NULL AND v_phone IS NULL THEN
        RETURN jsonb_build_object('success', false, 'code', 'NOT_FOUND', 'message', 'User data not found');
    END IF;

    -- Audit log view
    PERFORM public.log_admin_action(
        'view_pii',
        'user',
        p_user_id::text,
        'Admin requested full PII revelation'
    );

    RETURN jsonb_build_object(
        'success', true,
        'user_id', p_user_id,
        'email', v_email,
        'phone', v_phone
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_reveal_user_pii(UUID) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_reveal_user_pii(UUID) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_reveal_user_pii(UUID) TO authenticated;

-- ------------------------------------------------------------------------------
-- 8. admin_dashboard_stats
-- Live counts, 30-day zero-filled trends, top cities/brands, flag precision
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.admin_dashboard_stats(p_days INT DEFAULT 30)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_days              INT;
    v_current_counts    JSONB;
    v_trend             JSONB;
    v_top_cities        JSONB;
    v_top_brands        JSONB;
    v_flag_precision    JSONB;
BEGIN
    PERFORM public.require_staff();

    v_days := LEAST(GREATEST(COALESCE(p_days, 30), 7), 90);

    -- 1. Live Counters
    SELECT jsonb_build_object(
        'active_ads', (SELECT COUNT(*) FROM public.ads WHERE status = 'active'),
        'under_review_ads', (SELECT COUNT(*) FROM public.ads WHERE status = 'under_review'),
        'pending_reports', (SELECT COUNT(*) FROM public.reports WHERE status = 'pending'),
        'unresolved_flags', (SELECT COUNT(*) FROM public.ad_flags WHERE resolved_at IS NULL),
        'banned_users', (SELECT COUNT(*) FROM public.profile_private WHERE is_banned = true)
    ) INTO v_current_counts;

    -- 2. Daily Trends via generate_series
    SELECT jsonb_agg(to_jsonb(daily_row) ORDER BY daily_row.stat_date ASC) INTO v_trend
    FROM (
        SELECT
            d.day::date AS stat_date,
            (SELECT COUNT(*) FROM public.ads a WHERE a.created_at::date = d.day::date) AS new_ads,
            (SELECT COUNT(*) FROM public.profiles p WHERE p.created_at::date = d.day::date) AS new_users,
            (SELECT COUNT(*) FROM public.ads a WHERE a.deleted_at::date = d.day::date) AS removed_ads,
            (SELECT COUNT(*) FROM public.reports r WHERE r.created_at::date = d.day::date) AS reports_filed
        FROM generate_series(
            (now() - (v_days || ' days')::INTERVAL)::date,
            now()::date,
            '1 day'::INTERVAL
        ) d(day)
    ) daily_row;

    -- 3. Top Cities (by active ads)
    SELECT COALESCE(jsonb_agg(to_jsonb(city_row)), '[]'::jsonb) INTO v_top_cities
    FROM (
        SELECT c.name, COUNT(a.id) AS active_ads_count
        FROM public.ads a
        JOIN public.cities c ON c.id = a.city_id
        WHERE a.status = 'active'
        GROUP BY c.id, c.name
        ORDER BY active_ads_count DESC
        LIMIT 10
    ) city_row;

    -- 4. Top Brands (by active ads)
    SELECT COALESCE(jsonb_agg(to_jsonb(brand_row)), '[]'::jsonb) INTO v_top_brands
    FROM (
        SELECT b.name, COUNT(a.id) AS active_ads_count
        FROM public.ads a
        JOIN public.brands b ON b.id = a.brand_id
        WHERE a.status = 'active'
        GROUP BY b.id, b.name
        ORDER BY active_ads_count DESC
        LIMIT 10
    ) brand_row;

    -- 5. Flag Precision Matrix
    SELECT COALESCE(jsonb_agg(to_jsonb(prec_row)), '[]'::jsonb) INTO v_flag_precision
    FROM (
        SELECT
            flag_type,
            COUNT(*) FILTER (WHERE outcome = 'confirmed') AS confirmed_count,
            COUNT(*) FILTER (WHERE outcome = 'false_positive') AS false_positive_count,
            COUNT(*) FILTER (WHERE resolved_at IS NULL) AS unresolved_count,
            CASE
                WHEN (COUNT(*) FILTER (WHERE outcome IN ('confirmed', 'false_positive'))) > 0
                THEN ROUND(
                    (COUNT(*) FILTER (WHERE outcome = 'confirmed')::NUMERIC /
                     COUNT(*) FILTER (WHERE outcome IN ('confirmed', 'false_positive'))::NUMERIC) * 100,
                    1
                )
                ELSE NULL
            END AS precision_pct
        FROM public.ad_flags
        GROUP BY flag_type
        ORDER BY confirmed_count + false_positive_count DESC
    ) prec_row;

    RETURN jsonb_build_object(
        'current_counts', v_current_counts,
        'trend', v_trend,
        'top_cities', v_top_cities,
        'top_brands', v_top_brands,
        'flag_precision', v_flag_precision
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_dashboard_stats(INT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_dashboard_stats(INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_dashboard_stats(INT) TO authenticated;

-- ------------------------------------------------------------------------------
-- 9. admin_list_actions
-- Admin ONLY. Audit trail log with keyset pagination
-- ------------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.admin_list_actions(UUID, TEXT, TEXT, TIMESTAMPTZ, BIGINT, INT);
CREATE OR REPLACE FUNCTION public.admin_list_actions(
    p_actor_id          UUID DEFAULT NULL,
    p_action            TEXT DEFAULT NULL,
    p_target_type       TEXT DEFAULT NULL,
    p_cursor_created_at TIMESTAMPTZ DEFAULT NULL,
    p_cursor_id         BIGINT DEFAULT NULL,
    p_limit             INT DEFAULT 30
)
RETURNS TABLE (
    id          BIGINT,
    actor_id    UUID,
    actor_name  TEXT,
    action      TEXT,
    target_type TEXT,
    target_id   TEXT,
    reason      TEXT,
    metadata    JSONB,
    created_at  TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_actual_limit INT;
BEGIN
    PERFORM public.require_admin();

    v_actual_limit := LEAST(GREATEST(COALESCE(p_limit, 30), 1), 50);

    RETURN QUERY
    SELECT
        a.id,
        a.actor_id,
        p.full_name AS actor_name,
        a.action,
        a.target_type,
        a.target_id,
        a.reason,
        a.metadata,
        a.created_at
    FROM public.admin_actions a
    JOIN public.profiles p ON p.id = a.actor_id
    WHERE (p_actor_id IS NULL OR a.actor_id = p_actor_id)
      AND (p_action IS NULL OR a.action = p_action)
      AND (p_target_type IS NULL OR a.target_type = p_target_type)
      AND (
          p_cursor_created_at IS NULL
          OR (a.created_at, a.id) < (p_cursor_created_at, p_cursor_id)
      )
    ORDER BY a.created_at DESC, a.id DESC
    LIMIT v_actual_limit;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_list_actions(UUID, TEXT, TEXT, TIMESTAMPTZ, BIGINT, INT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_list_actions(UUID, TEXT, TEXT, TIMESTAMPTZ, BIGINT, INT) FROM anon;
GRANT EXECUTE ON FUNCTION public.admin_list_actions(UUID, TEXT, TEXT, TIMESTAMPTZ, BIGINT, INT) TO authenticated;

