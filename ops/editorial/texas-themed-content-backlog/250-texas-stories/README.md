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

## Promotion workflow

For each story selected for development:

1. Research the claim independently; do not treat the PDF summary as authority.
2. Check for overlap with the existing Texas-themed backlog and current live TexasDefined coverage.
3. Normalize the headline only after research establishes the strongest accurate angle.
4. Source rights-cleared, story-specific imagery under existing image governance.
5. Build a substantive article using the existing Article architecture.
6. Run canonical pre-merge validation before merge.
7. Set publication state only in the live editorial fixture/CMS path; do not change `publish_approved` here as a shortcut.

## Validation

Run:

```bash
node scripts/data/validate-250-texas-stories-backlog.mjs
```

The validator enforces the 250-row inventory, 50 rows per part, sequential IDs/source numbers, unique working slugs, non-empty source titles/summaries, and fail-closed publication fields.
