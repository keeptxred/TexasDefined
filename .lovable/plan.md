# TexasDefined + KeepTXRed: Shared Platform Architecture

## Recommendation in one line

**One shared Supabase project (single database, single auth pool), with brand/tenant separation enforced inside the schema — not one project per site.**

TexasDefined is built now against that shape, seeded with its own data, and the KeepTXRed connection is left as a final, separate step after review.

## Why one shared project wins

| Concern | Shared project | Separate projects |
| --- | --- | --- |
| Auth | One account works on both sites; no federation code | Duplicate users, or a fragile SSO bridge you own forever |
| Datasets | One legislator/bill/district table, queried by both | Two copies drifting apart, or cross-project sync jobs |
| Calculators / logic | One implementation, shared package | Duplicated or published as an internal lib |
| Admin | One admin console, brand filter toggle | Two consoles, two role systems |
| Media | One bucket tree, one CDN path | Duplicate uploads, duplicate storage cost |
| Search | One index over one corpus | Federated search across two APIs |
| Cost | One project's baseline | Doubled baseline plus egress between them |
| Security | Enforced by RLS + role table (well-trodden) | Cross-project access needs service keys crossing a network boundary — worse |

Separate projects only make sense if the two brands must be legally/operationally isolated (separate owners, separate data-retention obligations, one site sold off later). If that becomes true, splitting a well-partitioned single project later is far easier than merging two divergent ones.

## The architecture

### Tenancy model

A `brands` table (`texasdefined`, `keeptxred`) is the tenant key. Every row-owning table falls into one of three classes:

```text
SHARED    legislators, bills, votes, districts, ratings_inputs, media_assets
          -> no brand column; both sites read the same rows

BRANDED   articles, pages, calculator_configs, scorecards, nav, site_settings
          -> brand_id NOT NULL; policies filter by brand

USER      profiles, saved_items, subscriptions
          -> user_id owned; optional brand_id for "signed up via" attribution
```

Reads for public content go through narrow `TO anon` SELECT policies filtered by brand. Writes go through authenticated server functions.

### Auth

Single Supabase auth pool, email/password + Google. Roles live in a dedicated `user_roles` table (`app_role` enum: `admin`, `editor`, `user`) with an optional `brand_id` so someone can be an editor of one brand and a reader of the other. A `has_role(user_id, role, brand)` security-definer function backs every admin policy. Roles are never stored on `profiles`.

### Shared logic

Calculators and scoring live in `src/lib/domain/` as pure, brand-agnostic functions taking a config object. Each brand supplies weights/labels via `calculator_configs`, so the same math renders differently per site without a code fork.

### Admin

One admin area under the protected route subtree, with a brand switcher. Admins scoped to a brand see only that brand's branded content; platform admins see everything and can edit shared datasets.

### Media

One storage bucket, keyed `shared/...` for cross-brand assets and `brands/<slug>/...` for brand-specific ones. Public read on both prefixes; writes restricted to editors of the owning brand.

### Search

One Postgres full-text search over a `search_index` materialized table with a `brand_id` that is nullable — null means shared and visible to both sites. One RPC, one ranking function, brand filter passed in.

### Deployment shape

Two separately deployed front-ends pointed at the same backend. TexasDefined is this project; KeepTXRed later becomes a second front-end (or a domain-switched build) using the same schema and clients.

## What gets built now

1. Enable Lovable Cloud for this project (its own fresh backend — not KeepTXRed's).
2. Migration: `brands`, `app_role` enum, `user_roles`, `has_role()`, `profiles`, plus grants + RLS on every table, seeded with the TexasDefined brand row.
3. Auth: email/password + Google sign-in, session-aware header, protected subtree.
4. `src/lib/domain/` scaffold for calculators with config-driven inputs.
5. Media bucket with the `shared/` + `brands/<slug>/` policy split.
6. Search table, trigger, and RPC with the nullable-brand rule.
7. TexasDefined public site built on top of those primitives.
8. An `ARCHITECTURE.md` recording the tenancy rules so future work stays inside them.

**Explicitly not done now:** no connection, credential swap, or data migration involving the existing KeepTXRed Supabase project. That is a later, separate step — either pointing KeepTXRed's front-end here, or importing its data into this schema, decided after you review this.

## Technical notes

- Backend logic uses TanStack `createServerFn`; public routes call unauthenticated fetchers so SSR/prerender does not 401.
- Every `CREATE TABLE` in `public` ships explicit `GRANT`s alongside RLS.
- Brand resolution on the server comes from the request host (with an env override for local/dev), never from a client-supplied header.
- Service-role access stays in server-only modules loaded inside handlers.

## Open decision that changes the plan

If the two brands must be legally separable (different owning entities, or one may be sold), say so — that flips the recommendation toward separate projects with a shared schema definition and an auth bridge, at meaningfully higher cost and complexity.
