-- ==============================================================================
-- Migration 012: RLS Policies for Profiles & Phone Number Validation
-- Safe to re-run
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. Pakistani Phone Format Constraints (+923001234567 or 03001234567)
-- ------------------------------------------------------------------------------
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_profile_private_phone_format') THEN
        ALTER TABLE profile_private 
        ADD CONSTRAINT chk_profile_private_phone_format 
        CHECK (phone IS NULL OR phone ~ '^(\+923[0-9]{9}|03[0-9]{9})$');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'chk_profile_private_whatsapp_format') THEN
        ALTER TABLE profile_private 
        ADD CONSTRAINT chk_profile_private_whatsapp_format 
        CHECK (whatsapp_number IS NULL OR whatsapp_number ~ '^(\+923[0-9]{9}|03[0-9]{9})$');
    END IF;
END $$;

-- ------------------------------------------------------------------------------
-- 2. Trigger: Phone Number Change Resets is_phone_verified
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_phone_number_change()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
    -- If phone number is updated to a new value, immediately unverify
    IF (NEW.phone IS DISTINCT FROM OLD.phone) THEN
        NEW.is_phone_verified := false;
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_phone_verification_reset ON profile_private;
CREATE TRIGGER trigger_phone_verification_reset
    BEFORE UPDATE OF phone ON profile_private
    FOR EACH ROW
    EXECUTE FUNCTION handle_phone_number_change();

-- ------------------------------------------------------------------------------
-- 3. RLS Policies: public.profiles
-- ------------------------------------------------------------------------------

-- SELECT: Public profile is visible to everyone (buyers need seller name/avatar)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone"
    ON profiles
    FOR SELECT
    USING (true);

-- UPDATE: User can only update their own profile row (full_name, avatar_url, city_id)
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
    ON profiles
    FOR UPDATE
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

-- Note: No INSERT or DELETE policy on profiles (handled via auth signup trigger and cascade)

-- ------------------------------------------------------------------------------
-- 4. RLS Policies: public.profile_private
-- ------------------------------------------------------------------------------

-- SELECT: Only the profile owner or staff (moderator/admin) can view private profile
DROP POLICY IF EXISTS "Users and staff can view private profile" ON profile_private;
CREATE POLICY "Users and staff can view private profile"
    ON profile_private
    FOR SELECT
    USING (
        id = (SELECT auth.uid()) 
        OR public.is_staff()
    );

-- UPDATE: Only the profile owner can update their own contact numbers
DROP POLICY IF EXISTS "Users can update their own private profile" ON profile_private;
CREATE POLICY "Users can update their own private profile"
    ON profile_private
    FOR UPDATE
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

-- Note: No INSERT or DELETE policy on profile_private (handled via auth signup trigger and cascade)

