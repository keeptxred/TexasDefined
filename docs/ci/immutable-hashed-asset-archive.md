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
