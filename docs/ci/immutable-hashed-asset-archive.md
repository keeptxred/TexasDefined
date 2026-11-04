# Immutable JS/CSS archive — staged, **not deployed**

This patch provides a provider-portable, tested safety core for the owner-approved
release-independent asset storage architecture described in recovery issue #5794.
It **does not** provision KV/R2, configure a Worker binding or change asset routing.

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
