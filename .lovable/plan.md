# TexasDefined: Shared-Platform Architecture & Migration Plan (Revised)

## Decision

One shared **external** Supabase project — the existing KeepTXRed project — is the permanent backend for both sites. It already holds production data and live integrations, so it is the anchor, not something to be replaced.

**Lovable Cloud must not be enabled on this project.** A Lovable Cloud backend is provisioned per Lovable project and cannot be shared with a separate Lovable project, which is exactly the requirement here. Enabling it would create a second, orphaned database.

Nothing in this phase touches the KeepTXRed database. No migrations are applied, no tables/functions/policies/storage objects are altered, no credentials are wired in.

## Phase 1 — what actually gets built now (frontend only)

1. **TexasDefined frontend**: its own branding, navigation, layouts, routes, SEO metadata per route. Entirely separate presentation from KeepTXRed.
2. **Shared-platform-ready code architecture** (no backend calls yet):
   - `src/lib/domain/` — pure, brand-agnostic calculators and scoring functions that take a config object. No Supabase imports.
   - `src/lib/data/` — typed repository interfaces (`getLegislators`, `getArticles(brand)`, `searchContent(brand, q)`) with local fixture implementations behind them. Swapping fixtures for the real client later is a one-file change per repository.
   - `src/config/brand.ts` — brand identity, nav, theme tokens, SEO defaults for `texasdefined`.
3. **`ARCHITECTURE.md`** — records the tenancy rules, the repository boundary, and an explicit "do not enable Lovable Cloud, and why" section.
4. **`docs/migrations/`** — the additive SQL below, written to disk as reviewable files, **not executed**.

## Phase 2 — schema inspection (needs KeepTXRed read access)

Before any SQL is finalized, produce a written inventory of the existing project:

- All `public` tables, columns, and FKs
- All RLS policies and grants per table
- All functions/triggers, especially any security-definer role checks
- Existing role/permission model (where roles live today)
- Storage buckets and their path conventions + policies
- Any existing full-text search columns, indexes, or RPCs

This inventory determines naming collisions and whether KeepTXRed already has a partial multi-tenant shape. The migration files below are drafts against the proposed model and get reconciled with reality at this step.

## Phase 3 — proposed additive migrations (drafted, not applied)

Every migration is **additive and reversible**: new tables, new nullable columns with defaults, new policies alongside existing ones. No `DROP`, no `RENAME`, no `ALTER ... TYPE`, no changes to existing policies, no data rewrites of existing rows. Each file ships with a matching `down` script.

Preserving current KeepTXRed behavior is guaranteed by two rules: new columns are nullable-or-defaulted so existing writes still succeed, and existing policies are never edited — brand filtering is added as *additional* policies that only apply to new tables or via a default that resolves to KeepTXRed.

**001_brands.sql** — `brands(id, slug, name, domain, created_at)`, seeded with `keeptxred` and `texasdefined`. Grants + RLS: public `SELECT TO anon`, writes admin-only.

**002_brand_roles.sql** — `app_role` enum (`platform_admin`, `brand_admin`, `editor`, `user`), `user_roles(id, user_id, role, brand_id nullable)` with unique `(user_id, role, brand_id)`, and `has_role(_user_id, _role, _brand_id)` as `security definer`, `set search_path = public`. Null `brand_id` = platform-wide. If KeepTXRed already stores roles somewhere, this migration additionally backfills into `user_roles` **without removing the old mechanism** — the old path keeps working until a later, separately approved cleanup.

**003_brand_aware_content.sql** — adds `brand_id uuid REFERENCES brands(id) DEFAULT <keeptxred id>` to brand-scoped content tables (articles, pages, nav, site_settings, calculator configs — final list set in Phase 2). Defaulting to KeepTXRed means every existing row and every existing insert keeps behaving exactly as today. New *additive* policies grant read of TexasDefined-branded rows; existing policies are untouched.

**004_shared_datasets.sql** — designates cross-brand tables (legislators, bills, votes, districts, rating inputs) as shared: **no brand column added**. This migration only adds read policies/indexes where needed for TexasDefined's access patterns.

**005_shared_media.sql** — establishes path conventions in existing bucket(s): `shared/...` for cross-brand assets, `brands/<slug>/...` for brand-owned. Existing objects stay where they are; new storage policies are added for the `brands/texasdefined/` prefix only, leaving current object policies intact.

**006_brand_aware_search.sql** — `search_index(id, brand_id nullable, entity_type, entity_id, title, body, tsv)` with a GIN index, population triggers, and a `search_content(_brand_id, _query)` RPC. `brand_id IS NULL` means shared and visible to both sites. This is a new table; it does not disturb any existing search.

## Phase 4 — safe testing

Test the full migration set on a **Supabase branch** of the KeepTXRed project if branching is available on its plan; otherwise on a restored duplicate (PITR restore or `pg_dump` into a scratch project). Verification on the copy, before anything touches production:

- Every existing KeepTXRed query path returns identical results pre/post migration
- Every `down` script cleanly reverses its `up`
- New RLS policies deny cross-brand reads and cross-brand writes under each role
- No table is left without grants

## Phase 5 — connection (after review and approval only)

Only once the schema inventory, the migration set, and the security policies are signed off:

1. Apply migrations to production in file order, in a transaction per file, during a low-traffic window.
2. Add `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` for the shared project to TexasDefined.
3. Swap the fixture repositories in `src/lib/data/` for real Supabase-backed implementations.
4. Re-verify KeepTXRed behavior in production.

## Technical notes

- Backend reads use TanStack `createServerFn`; public routes call unauthenticated fetchers so SSR/prerender never 401s.
- Brand is resolved server-side from the request host with a dev env override — never from a client-supplied value.
- Any new `public` table ships explicit `GRANT`s next to its RLS in the same file.
- Service-role usage stays in server-only modules loaded inside handlers.
- Roles live only in `user_roles`, never on a profile table.

## What I need from you to start Phase 2

Read access to the KeepTXRed Supabase project (URL + a key, or an exported schema dump), and confirmation of whether Supabase branching is enabled on its plan.
