# Citation Magnet Batches 2.13–2.15

Status: **implemented for validation**

- **2.13 — Texas state parks comparison:** the canonical `/explore/state-parks` category now adds a sortable-style comparison surface using maintained destination fields for region, nearest town, season guidance, planning notes and official sources.
- **2.14 — State parks by activity / amenity signals:** the same canonical page groups parks by deterministic activity signals found in the maintained summary, highlights, entry note and body. The UI explicitly labels these as content signals, not live amenity or closure guarantees.
- **2.15 — Texas lakes comparison:** the canonical `/explore/lakes-rivers` category now compares maintained lake/river destination records with region, season guidance, recorded highlights, planning notes and official source links.

The comparison component reuses existing destination records and source metadata. It creates no competing state-park or lake route family.

## Deferred with source-data guardrail

- **2.11 — County population/growth:** deferred until TexasDefined has a maintainable current county-growth dataset; 2020 Census population alone is not labeled as growth.
- **2.12 — County cost/property comparison:** deferred until comparable county-level cost/property inputs have an authoritative, maintainable source. The existing selected county-government tax-rate dataset is not repurposed as a total-cost ranking.
