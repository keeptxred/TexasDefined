# Texas gateway production readiness

The 140 TexasDefined gateway articles remain staged until they pass both the existing editorial review and the production-readiness gate.

## Production manifest

Run:

```bash
node scripts/data/audit-texas-gateway-production-readiness.mjs --json
```

To write the current generated manifest to a local artifact for editorial work:

```bash
node scripts/data/audit-texas-gateway-production-readiness.mjs --write ops/editorial/texas-gateway-production-manifest.json
```

The generated manifest is derived from the canonical gateway fixtures plus `scripts/data/texas-gateway-editorial-review.json`; it is intentionally generated on demand so it cannot silently go stale. Each gateway row contains:

- editorial status and reason
- target search intent
- strongest existing competing TexasDefined URL candidate
- required source class
- content type
- minimum depth target
- required related destination/collection count
- minimum internal-link count
- image requirement
- measured content signals
- cannibalization candidates
- near-duplicate gateway candidates
- quality score
- readiness result and explicit blockers
- current allowlist state

## Promotion contract

A gateway slug is not safe to add to `TEXAS_GATEWAY_INDEX_READY_SLUGS` merely because it is longer. It must have:

1. editorial status `index-ready` in the canonical review;
2. the cohort-specific minimum depth;
3. at least six substantive paragraph blocks and three heading blocks;
4. at least five distinct internal links;
5. at least two related destination/collection targets;
6. hero, author and publication metadata;
7. a non-list-heavy content structure;
8. an authoritative source when the editorial review marks the topic as authority-sensitive;
9. no high-confidence existing-page cannibalization candidate;
10. no high-confidence near-duplicate gateway candidate; and
11. a lightweight public-discovery stub.

CI runs:

```bash
node scripts/data/audit-texas-gateway-production-readiness.mjs --enforce-promoted
```

Any allowlisted gateway that does not pass the production contract fails the gateway validation workflow.

## Guarded promotion

After an editor has rebuilt a page, updated the editorial review to `index-ready`, and created its discovery stub, run a dry check:

```bash
node scripts/data/promote-texas-gateway.mjs <slug>
```

Only after the dry run passes should the allowlist be changed:

```bash
node scripts/data/promote-texas-gateway.mjs <slug> --write
```

The promotion command refuses to modify the allowlist when any production blocker remains or when the discovery stub is missing. Existing sitemap, route-level noindex and public-discovery safeguards remain the final defensive layer.
