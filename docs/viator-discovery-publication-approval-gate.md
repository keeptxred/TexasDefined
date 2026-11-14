# Viator discovery publication gate

Created 2026-10-29 to enforce the owner-approved editorial workflow at the
**actual destination data ingestion stage**, not merely in a theoretical
`DiscoveryEntity` model. It is a safeguard against accidental mass
publication of indexable supplier-discovered pages.

## Scope and baseline

The 20 already-published TexasDefined-owned destinations from
`src/data/viator-destination-expansion-base.ts` and waves 5–13 are
grandfathered in
`ops/editorial/viator-new-destination-approval-ledger.json`.
They remain eligible for normal independently sourced factual updates.

The validator checks every actual source file matching
`src/data/viator-destination-expansion-(base|waveN).ts`, including any newly
created later numbered wave. If any new `slug` is added, CI fails **until**
its corresponding `approvedNew` ledger entry contains all of these:

- Explicit editorial-owner approval date and a stable GitHub issue #6380
  comment or authenticated PR review URL documenting the *actual* decision.
- Official non-Viator source URL and real verification date.
- Confirmation the original article and SEO value were quality reviewed.
- An image rights declaration (licensed, original or generated-reviewed),
  with rights actually checked before writing the ledger.
- A substantive explanation of why that particular guide adds visitor value.

The authority data itself must contain a real operator link, source freshness,
original body and approved hero-image metadata. Neither a Viator search result
nor a booking URL satisfies the authority requirement.

## Approval workflow

1. Monday source-only GitHub discovery generates candidate names/IDs as a
   short-lived, non-indexable artifact; it is **not** public guide content.
2. Tuesday's TexasDefined Review Batches automation independently checks
   operators, duplicate canonicals, county geography, images and useful
   affiliate relationships. It presents 3–5 proposals in **ChatGPT**.
3. The owner explicitly approves/revises/rejects each item or a scoped batch
   and then separately approves complete draft publication when ready.
4. The assistant documents the actual owner's decision in the issue and
   confirms it is not a bot-generated statement or mere review invitation.
5. Only after a real explicit owner approval and rights/source review may the
   assistant write a ledger approval and the new destination guide. Normal
   GitHub branch protection, original copy checks, link checks and smoke apply.

The ledger is a local *attestation record*, **not cryptographic proof of
consent**. CI validates its structure and blocks accidental missing approvals;
the assistant must verify the underlying owner comment/review rather than
fabricating one. Merely editing the ledger is never sufficient editorial
authorization.

## Validation

`node scripts/data/validate-viator-new-destination-approvals.mjs --self-test`

Mandatory in the full production predeploy suite, PR affiliate/discovery
workflow and core release validation. Adding a new `viator-expansion-wave14`
with an unapproved slug must fail.

No current pages or previously published destinations are deleted or
reindexed by this new gate. The gate does not grant permission to use Viator's
unique descriptions, photos, reviews, or attraction data in search-indexable
TexasDefined content.
