# TexasDefined practical visitor-fact contract — initial coverage

As of October 21, 2026, curated `Destination` entries can carry an optional `visitorFacts` array. This uses the existing destination record and query pipeline, **not a second global visitor-information directory**.

## State and coverage

- **Live existing content:** Two individually source-checked destination entries were seeded: `/destination/sheldon-lake-state-park` (TPWD) and `/destination/chamizal-national-memorial` (NPS). Public verification is required after merge before calling either deployed.
- **Published destinations generally:** The shared `DestinationVisitPlanner` displays any valid `visitorFacts` attached to a published eligible destination. Other site pages receive no invented rows.
- **Future curated content:** A future curated record can add specific facts using `DestinationVisitorFact` in `src/data/types.ts`. The shared `reviewDestinationVisitorFacts` gate rejects duplicates, blank or unsupported answers, invalid HTTPS source URLs and missing/future dates.
- **Freshness:** Hours, admission, reservations, access and swimming information is withheld after 120 days; other fact topics after 365 days. Stale facts create an audit warning. Editors must refresh evidence rather than merely changing the date.
- **Not yet integrated:** Supabase entity ingestion, generator prompts, scheduled event and article pipelines, museum-specific templates, and all individual destination inventories require separate audits and engineering. Do not claim universal coverage from these first source-backed examples.

## Primary-source evidence for seeded facts

- TPWD official Sheldon Lake overview and hours: https://tpwd.texas.gov/state-parks/sheldon-lake
- TPWD Sheldon Lake accessibility: https://tpwd.texas.gov/state-parks/sheldon-lake/fees-facilities/accessibility-information-1
- NPS Chamizal admission: https://www.nps.gov/cham/planyourvisit/fees.htm
- NPS Chamizal entrance and Cultural Center hours: https://www.nps.gov/cham/planyourvisit/hours.htm
- NPS Chamizal parking directions: https://www.nps.gov/cham/planyourvisit/directions.htm

## Next inventory priorities

1. Compare the actual production URL registry and the existing curated + remote destination families before estimating the affected page count.
2. Review visitor needs by venue type and add exact-source facts only where beneficial; first prioritize high-impression or high-traffic pages if GSC/GA4 access provides real metrics.
3. Trace Supabase/draft imports and generator instructions; add safe source and date storage and validation without forcing a generic checklist on all records.
4. Scan repeated FAQ text, boilerplate and image appropriateness in destination and page-family validators.
5. Run the canonical validation, merge only green, and verify the production deployment and representative pages. Document exceptions explicitly.
