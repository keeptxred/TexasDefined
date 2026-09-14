# 250 Texas Stories source collection

This directory preserves the 250 story ideas supplied in `250_Texas_Stories.pdf` as a publication-safe TexasDefined editorial source collection.

## What is here

The PDF contains 250 numbered story prompts across five 50-item parts:

1. `part-1.csv` — Music, Food & Cultural Legends (stories 1-50)
2. `part-2.csv` — Outlaws, Frontier & Wild West Lore (stories 51-100)
3. `part-3.csv` — Sports Glory & Iconic Games (stories 101-150)
4. `part-4.csv` — Science, Space & Big Industry (stories 151-200)
5. `part-5.csv` — Town Oddities, Natural Wonders & Mysteries (stories 201-250)

Each row preserves the supplied title and one-sentence summary, records the PDF page where the item appeared, and assigns a unique working slug.

## Publication safety

These are **story candidates, not published facts**.

Every row is deliberately set to:

- `priority=pending-review`
- `editorial_risk=source-claim-needs-verification`
- `verification_status=needs-research`
- `publish_approved=no`

The source contains folklore, superlatives, historical claims, event claims, disputed origin stories, and statements that may be incomplete or inaccurate. Nothing in this directory should be promoted to a public article, social post, schema object, indexable route, or automated publishing system until the individual story is researched against appropriate primary/authoritative sources.

## Part 1 reconciliation

`part-1-reconciliation.csv` is the first route/intent reconciliation pass for stories 1-50. It does **not** approve publication. It answers a narrower question first: does TexasDefined already have the canonical page or editorial cluster that should own this topic?

Current disposition:

- 13 `existing-authority` rows already have a dedicated article, event, or venue-history route.
- 10 `existing-destination` rows belong in an existing destination guide.
- 8 `existing-cluster` rows belong in an existing music/culture authority cluster.
- 15 `route-review-needed` rows have overlapping site data or unclear canonical ownership and must be resolved before development.
- 2 `candidate-new-article` rows currently appear to have room for a standalone article, subject to research.
- 2 `claim-risk-hold` rows are blocked before development because the supplied source framing needs correction or disputed-origin treatment.

All 50 reconciliation rows remain `publish_decision=hold`. The reconciliation is an anti-cannibalization and editorial-safety layer, not a publishing queue.

## Promotion workflow

For each story selected for development:

1. Research the claim independently; do not treat the PDF summary as authority.
2. Check `part-1-reconciliation.csv` when working on stories 1-50 and resolve any `route-review-needed` status before drafting.
3. Expand the existing canonical route when the reconciliation says `existing-authority`, `existing-destination`, or `existing-cluster`; do not create a competing URL.
4. Normalize the headline only after research establishes the strongest accurate angle.
5. Source rights-cleared, story-specific imagery under existing image governance.
6. Build substantive content using the existing TexasDefined architecture.
7. Run canonical pre-merge validation before merge.
8. Set publication state only in the live editorial fixture/CMS path; do not change source-backlog publication fields as a shortcut.

## Validation

Run:

```bash
node scripts/data/validate-250-texas-stories-backlog.mjs
node scripts/data/validate-250-texas-stories-part1-reconciliation.mjs
```

The backlog validator enforces the 250-row inventory, 50 rows per part, sequential IDs/source numbers, unique working slugs, non-empty source titles/summaries, and fail-closed publication fields.

The Part 1 reconciliation validator additionally enforces all 50 source/title matches, governed coverage/action pairs, route requirements for claimed existing coverage, and `publish_decision=hold` on every row.
