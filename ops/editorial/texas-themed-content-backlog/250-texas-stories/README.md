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

`part-1-reconciliation.csv` is the route/intent reconciliation pass for stories 1-50. It does **not** approve publication. It answers a narrower question first: does TexasDefined already have the canonical page or editorial cluster that should own this topic?

Current disposition:

- 13 `existing-authority`
- 10 `existing-destination`
- 8 `existing-cluster`
- 15 `route-review-needed`
- 2 `candidate-new-article`
- 2 `claim-risk-hold`

## Part 2 reconciliation

`part-2-reconciliation.csv` applies the same anti-cannibalization and source-safety pass to stories 51-100.

Current disposition:

- 4 `existing-authority`
- 7 `existing-destination`
- 6 `existing-cluster`
- 11 `route-review-needed`
- 13 `candidate-new-article`
- 9 `claim-risk-hold`

Confirmed existing owners include the Texas cattle-and-ranching guide, Red River War guide, Buffalo Soldiers guide, Fort Griffin, Palo Alto Battlefield, Fort Richardson, Presidio La Bahía, the Alamo, San Jacinto Battleground and Mustang Island State Park. High-risk holds include source framing around the supposed Great San Antonio Buffalo Hunt, the Billy the Kid Texas connection, Bass Reeves in Fort Worth, Robbers Roost, San Saba silver-mine folklore, Pecos Bill, the John Wesley Hardin snoring anecdote, Jim Ned Creek outlaw trails and the unsourced sacred-site characterization of Comanche Peak.

All reconciliation rows remain `publish_decision=hold`. Reconciliation is an anti-cannibalization and editorial-safety layer, not a publishing queue.

## Promotion workflow

For each story selected for development:

1. Research the claim independently; do not treat the PDF summary as authority.
2. Check the corresponding `part-N-reconciliation.csv` and resolve any `route-review-needed` status before drafting.
3. Expand the existing canonical route when the reconciliation says `existing-authority`, `existing-destination`, or `existing-cluster`; do not create a competing URL.
4. Do not develop a `claim-risk-hold` story until the source framing has been independently resolved.
5. Normalize the headline only after research establishes the strongest accurate angle.
6. Source rights-cleared, story-specific imagery under existing image governance.
7. Build substantive content using the existing TexasDefined architecture.
8. Run canonical pre-merge validation before merge.
9. Set publication state only in the live editorial fixture/CMS path; do not change source-backlog publication fields as a shortcut.

## Validation

Run:

```bash
node scripts/data/validate-250-texas-stories-backlog.mjs
node scripts/data/validate-250-texas-stories-part1-reconciliation.mjs
node scripts/data/validate-250-texas-stories-part2-reconciliation.mjs
```

The backlog validator enforces the 250-row inventory, 50 rows per part, sequential IDs/source numbers, unique working slugs, non-empty source titles/summaries, and fail-closed publication fields.

The reconciliation validators additionally enforce all source/title matches, governed coverage/action pairs, route requirements for claimed existing coverage, and `publish_decision=hold` on every row.
