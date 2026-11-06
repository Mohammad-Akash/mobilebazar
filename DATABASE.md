# 📱 MobileBazar — Database Architecture Documentation

## 🗄️ Overview
This database is designed specifically for high-scale, Pakistan-focused mobile phone classifieds on **Supabase (PostgreSQL 15+)**.

### Key Architectural Principles
1. **Separation of Sensitive Data:** Private fields like `IMEI` (`ad_private`) and `phone/role` (`profile_private`) are split into dedicated 1:1 tables so Postgres Row-Level Security (RLS) can completely restrict access.
2. **Composite Foreign Keys:** Prevents invalid combinations:
   - `ads(model_id, brand_id)` -> `models(id, brand_id)`
   - `ads(area_id, city_id)` -> `areas(id, city_id)`
3. **Optimistic Denormalization (Counters):** `views_count`, `favorites_count`, and `ads_count` avoid costly `COUNT(*)` queries on millions of rows.
4. **Partial Indexing:** All listing queries target `WHERE status = 'active'` using partial B-Tree indexes.
5. **Full-Text & Fuzzy Search:** Multi-weighted `tsvector` (`A`: title/brand, `B`: model, `C`: description) and `pg_trgm` GIN indexes.

---

## 📂 Migration Files Structure

All migration scripts are located in `supabase/migrations/`:

| File | Prompt | Description |
| :--- | :--- | :--- |
| [`001_extensions_and_enums.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/001_extensions_and_enums.sql) | Prompt 2 | Enables `pg_trgm`, `unaccent`, creates all 8 ENUMs and `set_updated_at()` trigger function. |
| [`002_reference_tables.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/002_reference_tables.sql) | Prompt 3 | Creates `cities`, `areas`, `brands`, and `models` tables with composite uniqueness. |
| [`003_profiles.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/003_profiles.sql) | Prompt 4 | Creates `profiles` (public) and `profile_private` (phone, role) linked to `auth.users` via trigger. |
| [`004_ads_and_images.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/004_ads_and_images.sql) | Prompt 5 | Creates `ads`, `ad_private` (IMEI), and `ad_images` (max 8 images trigger, position 0 = cover). |
| [`005_favorites_and_reports.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/005_favorites_and_reports.sql) | Prompt 6 | Creates `favorites` (with auto-counter trigger on ads) and `reports` (fraud/spam flags). |
| [`006_indexes.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/006_indexes.sql) | Prompt 7 | Production-grade partial composite indexes and trigram search indexes. |
| [`007_search_views_triggers.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/007_search_views_triggers.sql) | Prompt 8 | Full-text search vector trigger, `mark_expired_ads()` function, `increment_ad_views()` RPC, and `active_ads_view`. |
| [`008_seed_data.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/008_seed_data.sql) | Prompt 9 | Seed data for 28 Pakistani cities, major areas (Karachi, Lahore, Islamabad, Rawalpindi), brands, and popular models. |
| [`009_rls_initial.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/009_rls_initial.sql) | Prompt 10 | Enables RLS on all 11 tables and configures public read access for reference tables. |
| [`010_test_verification.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/010_test_verification.sql) | Prompt 11 | Complete verification suite: row counts, trigger cascades, check constraints, and EXPLAIN ANALYZE. |
| [`011_security_helpers_and_grants.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/011_security_helpers_and_grants.sql) | Phase 2 / Prompt 2 | Helper functions (`is_staff`, `is_admin`, `is_banned`), table revocation & column-level grants. |
| [`011b_tighten_grants.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/011b_tighten_grants.sql) | Phase 2 / Prompt 2b | Tightened column-level grants for reports, images, private, and favorites. |
| [`012_rls_profiles.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/012_rls_profiles.sql) | Phase 2 / Prompt 3 | RLS policies for `profiles` & `profile_private`, phone format validation & reset trigger. |
| [`013_rls_ads.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/013_rls_ads.sql) | Phase 2 / Prompt 4 | RLS for `ads`, `ad_images`, `ad_private` (IMEI), `has_favorited()` helper & lifecycle RPCs (`mark_ad_sold`, `delete_ad`, `renew_ad`). |
| [`014_rls_favorites_reports.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/014_rls_favorites_reports.sql) | Phase 2 / Prompt 5 | RLS for `favorites`, `reports` and secure `active_ads_view` (`security_invoker = true`). |
| [`015_seller_contact_rpc.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/015_seller_contact_rpc.sql) | Phase 2 / Prompt 6 | Secure RPC function `get_seller_contact()` respecting contact preference & login requirements. |
| [`016_storage_ad_images.sql`](file:///D:/MobileBazar/mobilebazar/supabase/migrations/016_storage_ad_images.sql) | Phase 2 / Prompt 7 | Storage buckets (`ad-images`, `avatars`) and object policies restricted by user ID. |
| [`security_tests.sql`](file:///D:/MobileBazar/mobilebazar/supabase/tests/security_tests.sql) | Phase 2 / Prompt 8 | Automated 10-point transaction security test suite (always rolls back). |

---

## ⚡ Quick Supabase Setup

You can run the full schema in one click using:
- **`supabase/full_schema.sql`** (Runs all migrations 001 - 007 & 009)
- Followed by **`supabase/migrations/008_seed_data.sql`** for data population.

### Generating TypeScript Types (PowerShell Safe)

In your Next.js project root (`mobilebazar/`), log in first if needed, then run:

```powershell
npx supabase gen types typescript --project-id zzcxgqtbmrdbaouegphx | Out-File -Encoding utf8 src/types/supabase.ts
```

