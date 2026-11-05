# Immutable JS/CSS archive — staged, **not deployed**

This patch provides a provider-portable, tested safety core, current-static-first
routing adapter, and an idempotent original-byte readback publisher for the proposed
release-independent asset storage architecture described in recovery issue #5794.
It **does not** provision KV/R2, configure a Worker binding, upload to live
KV or change asset routing. The publisher requires an injected storage binding, a complete publication plan,
and supplies `readyForWorkerRouting: false` even after same-namespace readback;
global eventual consistency must be separately certified.

**Current emergency carry-forward remains active**, with its existing SHA-256,
mime, freshness, original first-seen, 72-hour and 768-file/48 MiB protections.

## Activation prerequisites (must all be true)
1. Owner explicitly authorizes a dedicated Cloudflare KV namespace within
   the account's current plan. No paid upgrades and no automatic creation here.
2. Publisher preuploads every previously healthy JS/CSS under its unchanged
   hashed URL key, checks original file bytes and SHA-256, and waits for
   geographically replicated read-back visibility **before** enabling fallback.
3. Bind namespace `IMMUTABLE_CLIENT_ASSETS`. Configure Worker-first routing
   ONLY for `/assets/*`, ask `env.ASSETS.fetch()` first, and use
   `archivedAssetResponse()` only on genuine 404. Never hide a 5xx or
   skip current/old two-origin original-byte verification.
4. Record signed source SHA + Worker version + archived manifest and prove
   rollback and several simulated and real releases before removing any
   existing carry-forward.
5. GC requires two independently signed release-absence observations and a
   minimum 30-day quiet period. This code merely proposes candidates:
   there is deliberately **no automatic deletion**.
6. Guard account quotas. As of Oct 30 2026 Workers KV Free plan lists
   1 GB storage, 1,000 writes/day, 1,000 deletes/day and 100k reads/day.
   If plan limits or authorized permissions cannot be met, fail closed and
   obtain owner decision rather than using a paid service.

## Explicit limits
The current Worker only serves its static asset namespace. Older tabs may
reference stale filenames after the Worker version is replaced; neither a
successful single deployment nor normal CDN caching proves durability.
KV is eventually consistent, so prepublication and read-back verification
must precede switching Worker routing. This staging library alone **does not**
meet any production DEPLOYED/VERIFIED certification gate.

## GitHub-only hardening (November 5, 2026)

- `serveHashedAssetWithArchive(request, assets, namespace)` is isolated and tested.
  It requires the current static `ASSETS.fetch()` response first, consults KV
  **only after 404**, and never changes the current origin 200, 500, HTML,
  API, image, or POST behavior. Missing bindings and corrupt archived bytes
  fail closed. This adapter is **not yet invoked** by `src/server-entry.ts`.
- The immutable allowlist includes historical Vite `property-tax.HASH.js`
  as well as `main-HASH.js`; never unversioned public assets.
- Publisher now rejects vanished `stored` objects instead of covertly
  consuming KV writes not counted in the daily publication budget; it
  validates original `firstSeenAt` metadata, never overwrites conflicting
  immutable keys, and rejects attempts to raise free-tier quota ceilings.
- No change to `wrangler.jsonc`, no production binding, no routing cutover,
  no removal of existing emergency 72-hour retention. Release-independent
  durability is therefore **NOT yet production certified**.

## Reproducible predeployment manifest (GitHub staging)

The new `scanImmutableAssetBuild()` in
`scripts/ci/immutable-hashed-asset-manifest.mjs` reads **actual compiled**
`dist/client/assets` files and produces a deterministic source-SHA-bound
release manifest and publisher plan. It computes SHA-256 from the bytes, keeps
historical first-seen observations unchanged, rejects any JS/CSS symlinks or
unhashed files, checks object sizes and daily quotas, and rejects missing
previously healthy unarchived hashes. Original bytes are read and checked
**again** at publication, so post-inventory build mutations fail closed.

Previously verified KV objects are explicitly supplied as `published`;
healthy HTTP observation alone must **never** be classified as published.
The `requiredHistorical` input is the predeploy handoff evidence, not a list
of files that can simply be aged out to make the release pass.

GitHub Actions independently runs both original-byte inventory and routing
integrity tests. The new manifest scanner and publisher are not yet connected
to the protected production deploy workflow: no network KV writes have been
made, and prepublication plus global propagation remain mandatory activation
gates. No Cloudflare API calls are needed to run these tests.

## Protected deploy placement — gated rehearsal only

A new opt-in step in `.github/workflows/deploy-production.yml` runs
`node scripts/ci/prepare-immutable-hashed-asset-manifest.mjs --plan`
**after** the existing old-hash recovery and **before** Worker replacement.
It reconciles the current `.artifacts/asset-handoff-snapshot.json` and
`.artifacts/retained-critical-assets-report.json` evidence against the
actual compiled output, and fails on an omitted, changed, or missing old hash.
It writes `.artifacts/immutable-hashed-asset-plan.json` and uploads the report
as a protected GitHub Actions artifact; this step **never** writes to KV.

This step is **off by default** and runs only when the repository variable
`TEXASDEFINED_IMMUTABLE_ASSET_PLAN` is explicitly set to `true`.
Enabling the rehearsal is not authorization to cut over production routing.
Its report explicitly states `archivePublished: false`,
`globallyReplicated: false`, and `readyForWorkerRouting: false`.
The separate real publisher and two-origin, cross-release verification must
still be wired and certified before permanent archive claims can be made.
