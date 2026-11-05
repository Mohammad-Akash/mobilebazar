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

---

## ⚡ Quick Supabase Setup

You can run the full schema in one click using:
- **`supabase/full_schema.sql`** (Runs all migrations 001 - 007 & 009)
- Followed by **`supabase/migrations/008_seed_data.sql`** for data population.

### Generating TypeScript Types

In your Next.js project root (`mobilebazar/`), run:

```bash
npx supabase gen types typescript --project-id zzcxgqtbmrdbaouegphx > types/supabase.ts
```

