-- ==============================================================================
-- Prompt 4 / Migration 003: Profiles & Private Profiles (Linked to auth.users)
-- Safe to re-run
-- ==============================================================================

-- 1. Public Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(120), -- Nullable so OAuth / Phone signup trigger never fails
    avatar_url TEXT,
    city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
    ads_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for profiles updated_at
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON profiles;
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- 2. Sensitive / Private Profile Data Table (1:1 with profiles)
CREATE TABLE IF NOT EXISTS profile_private (
    id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    whatsapp_number VARCHAR(20),
    role user_role NOT NULL DEFAULT 'user',
    is_phone_verified BOOLEAN NOT NULL DEFAULT false,
    is_banned BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger for profile_private updated_at
DROP TRIGGER IF EXISTS trigger_profile_private_updated_at ON profile_private;
CREATE TRIGGER trigger_profile_private_updated_at
    BEFORE UPDATE ON profile_private
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- Partial unique index on phone (ensures phone is unique only when provided)
CREATE UNIQUE INDEX IF NOT EXISTS idx_profile_private_phone_unique 
    ON profile_private(phone) 
    WHERE phone IS NOT NULL;

-- 3. Automatic Profile Creation Trigger on Supabase Auth Signup
CREATE OR REPLACE FUNCTION handle_new_user()
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
    -- Extract optional metadata if provided during signup
    v_full_name := COALESCE(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );
    v_avatar_url := NEW.raw_user_meta_data->>'avatar_url';
    v_phone := NEW.phone;

    -- 1. Insert into public profiles
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (NEW.id, v_full_name, v_avatar_url)
    ON CONFLICT (id) DO NOTHING;

    -- 2. Insert into private profile
    INSERT INTO public.profile_private (id, phone, is_phone_verified)
    VALUES (
        NEW.id, 
        v_phone,
        CASE WHEN NEW.phone_confirmed_at IS NOT NULL THEN true ELSE false END
    )
    ON CONFLICT (id) DO NOTHING;

    RETURN NEW;
END;
$$;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

