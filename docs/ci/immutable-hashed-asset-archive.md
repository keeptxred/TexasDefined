# Immutable JS/CSS archive — staged, **not deployed**

This patch provides a provider-portable, tested safety core, current-static-first
routing adapter, and an idempotent original-byte readback publisher for the proposed
release-independent asset storage architecture described in recovery issue #5794.
It **does not** provision KV/R2, configure a Worker binding, upload to live
KV or change asset routing. The publisher requires an injected storage binding, a complete publication plan,
and supplies `readyForWorkerRouting: false` even after same-namespace readback;
global eventual consistency must be separately certified.

**Current emergency carry-forward remains active**, with its existing SHA-256,
MIME, freshness, original first-seen and 72-hour protections. Current main's
bounded safety capacity was subsequently raised to 1,536 files / 96 MiB by
protected PR #6672; do not revert that production recovery when merging.

## Activation prerequisites (must all be true)
1. Owner explicitly authorizes a dedicated Cloudflare KV namespace within
   the account's current plan. No paid upgrades and no automatic creation here.
2. Publisher preuploads every previously healthy JS/CSS under its unchanged
   hashed URL key, checks original file bytes and SHA-256, and waits for
   geographically replicated read-back visibility **before** enabling fallback.
3. Bind `IMMUTABLE_CLIENT_ASSETS` and expose `ASSETS`. Preserve the existing asset-first routing: known current assets are served directly; missing old hashes fall through to `src/server-entry.ts`, where `ASSETS.fetch()` must return a genuine 404 before any archive lookup. Do not enable Worker-first globally or mask any 5xx. Verify both public origins with original SHA-256 after deployment.
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
  fail closed. A guarded `src/server-entry.ts` hook is now staged but remains dormant until the approved `IMMUTABLE_CLIENT_ASSETS` binding exists; no production routing changes have been deployed.
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

## Dormant Worker entry integration

The PR now stages a guarded import/hook in `src/server-entry.ts` and strong `.d.mts` type declarations for the shared adapter. The Worker consults the immutable archive only if its KV binding is present and only after the current static asset binding returns 404. The `wrangler.jsonc` binding remains absent: **no live KV fallback or permanent repair is claimed**. Cloudflare asset-first routing is preserved.

## TypeScript regression certification

The repository currently has substantial pre-existing full-site TypeScript debt.
A raw `npx tsc --noEmit` result is **not green** and must not be described as
green. The staging PR's strict TypeScript comparison runs the compiler against
both the exact protected merge-base and the candidate Worker entry using
the same locked dependencies. `compare-typescript-diagnostics.mjs` compares
the complete multiplicity of each file/error-code/message diagnostic while
ignoring only shifted line numbers. It fails if **any** diagnostic is added,
if compilation crashes, if errors cannot be parsed, or if the baseline is
missing. This is a no-regression gate, **not** certification that all of
TexasDefined's existing TypeScript errors have been fixed. Both full raw logs
and the machine-readable delta are kept as GitHub Actions evidence.

The permanent deployment acceptance still requires the normal production
build and smoke, signed original-byte publishing, propagation, live two-origin
checks and verified rollback. No staging-only success substitutes for them.

## Credential-free Workers KV REST transport staging

`scripts/ci/immutable-hashed-asset-kv-rest.mjs` is now a transport adapter
for the **existing proposed** dedicated namespace. It is inert on import and
on construction: there are **zero network calls** until its methods are
explicitly invoked by an authenticated, owner-approved release process.
The implementation uses Cloudflare's documented REST list-keys, raw GET value,
GET metadata, and multipart PUT-with-metadata endpoints; keys are percent-
encoded and constrained to the immutable `immutable:v1:/assets/` prefix.

- Listing follows every opaque cursor; rejects duplicate, malformed, expiring,
  unverified, or beyond-budget keys rather than assuming an empty archive.
- Value reads preserve raw bytes, then require original KV metadata. HTTP 403,
  429, API failures and missing original metadata all fail closed.
- Publishing is constrained to validated JS/CSS paths, original SHA-256 and
  first-seen evidence, and unexpired objects. The separate idempotent publisher
  independently checks bytes and metadata before and after any put.
- Unit tests supply a **mock fetch transport**, not a live Cloudflare token;
  they verify URL encoding, pagination, multipart byte preservation, readback,
  idempotency and error refusal.
- **No owner-approved namespace ID, dedicated KV token, production write step,
  or cross-region visibility certificate has been supplied or activated in
  this PR.** Do not route live traffic or delete carry-forward assets based
  on these mocked transport tests.

Source references: Cloudflare Workers KV documented raw value GET, key listing,
metadata GET, multipart value PUT, and eventual consistency. No browser or
Cloudflare API authentication is required for these tests.

## Dormant owner-gated prepublication step in protected production workflow

`.github/workflows/deploy-production.yml` now contains a protected,
**disabled-by-default** prepublication step placed AFTER rejecting obsolete
queued main revisions and BEFORE Worker replacement. It runs only when the
following independent repository variables have been explicitly configured:

- `TEXASDEFINED_IMMUTABLE_ARCHIVE_OWNER_APPROVED=true`
- `TEXASDEFINED_IMMUTABLE_ARCHIVE_PUBLISH=true`
- `TEXASDEFINED_IMMUTABLE_KV_NAMESPACE_ID` — exact 32-character preexisting
  namespace ID, not created by these scripts
- `TEXASDEFINED_KV_WRITES_TODAY` — a trusted, current account-day
  write count (0–1000); never default it silently to zero

A dedicated `CLOUDFLARE_KV_ARCHIVE_TOKEN` GitHub Actions secret with Workers
KV read/write permission is also required; the existing Worker-deployment
token must **not** be assumed to have this scope. The release runner
`scripts/ci/publish-immutable-hashed-archive.mjs --publish-approved`
reconciles every historic original-byte proof, enumerates the existing
archive, verifies each stored original before accepting it, publishes missing
content once and reads new bytes back. It produces an Actions artifact
explicitly reporting `readyForWorkerRouting:false` and
`globallyReplicated:false`.

These opt-ins are not set by this PR and no credentials or namespace IDs
are committed. This is **NOT** permission to add a paid service, activate
routing, or remove emergency retention. A trustworthy daily-write counter,
real KV namespace, dedicated token, and post-publication global readback
are outstanding activation requirements.

## Quota-bounded multi-day bootstrap (staged source only)

The first independently witnessed successful production deployment retained
**1,295** old JS/CSS hashes (73,133,987 original bytes) at source
`0cbe12037c4a2479022e05d5355f4a6cff72d04c`, run `42123156692`.
That already exceeds Workers KV Free's 1,000 writes/day, even before accounting
for current-release assets or unrelated account writes. An all-at-once
prepublish would fail before routing and cannot safely be enabled.

Explicit `TEXASDEFINED_IMMUTABLE_ARCHIVE_BOOTSTRAP=true` activates quota-bounded,
deterministic *partial* publication while preserving the full original manifest.
It only operates with the existing independent owner approval, publish flags,
namespace ID, token and independently authenticated account-day write tally.
The selected original-byte keys are read back; every not-yet-published key is
recorded as `deferredOriginalCount`, `fullyReadBack:false` and
`readyForWorkerRouting:false`. Stored keys are rechecked on the next execution
and only still-missing originals are written. No data deletion or automatic
garbage collection exists.

The default (bootstrap **off**) retains the prior strict behavior: reject
any full publication exceeding the trusted daily budget. Bootstrap never
silently assumes zero other account writes, increases account write ceilings,
enables KV routing, removes 72-hour carry-forward or claims cross-region
replication. Free daily quota resets at **00:00 UTC**; a trusted same-account
write total and separate verification are required on each day. A complete
local readback is still insufficient for production routing until separate
global propagation and multi-release rollback acceptance.

The namespace creation request's outcome is **not verified by this GitHub
change**. Keep the permanent archive unbound pending confirmed infrastructure
and safe authenticated publication.
