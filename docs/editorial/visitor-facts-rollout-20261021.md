# TexasDefined practical visitor-fact contract — initial coverage

As of October 21, 2026, curated `Destination` entries can carry an optional `visitorFacts` array. This uses the existing destination record and query pipeline, **not a second global visitor-information directory**.

## State and coverage

- **Curated existing content:** The initial merge populated 8 destinations (14 individually source-backed facts); the second batch adds nine state parks (19 further facts) subject to green CI, merge, and production verification. These are curated coverage counts, not a guarantee that every URL is deployed. Existing source dates must not be refreshed automatically without substantive re-verification.
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

## State-park batch two: exact operator sources (October 21, 2026)

The 9 destination records have individually checked entry and access details, not copied generalized facility defaults. All cite the exact TPWD park page and carry `checkedAt: "2026-10-21"`.

| Destination | Official operator source | Important distinction |
| --- | --- | --- |
| Enchanted Rock State Natural Area | https://tpwd.texas.gov/state-parks/enchanted-rock | Park, gate, backcountry hours and reservation advice differ |
| Palo Duro Canyon State Park | https://tpwd.texas.gov/state-parks/palo-duro-canyon | Gate and office hours differ; weather can close trails |
| Caddo Lake State Park | https://tpwd.texas.gov/state-parks/caddo-lake | TPWD's listed daily hours are distinct from late arrivals |
| Balmorhea State Park | https://tpwd.texas.gov/state-parks/balmorhea | Day-use entry windows at 8 a.m. and 3 p.m.; no early entry |
| Guadalupe River State Park | https://tpwd.texas.gov/state-parks/guadalupe-river | Seasonal headquarters schedule differs from gate hours |
| Inks Lake State Park | https://tpwd.texas.gov/state-parks/inks-lake | Park hours differ from headquarters/store hours |
| Lost Maples State Natural Area | https://tpwd.texas.gov/state-parks/lost-maples | October/November capacity and reservations are especially important |
| Monahans Sandhills State Park | https://tpwd.texas.gov/state-parks/monahans-sandhills | Separate daily gate hours |
| McKinney Falls State Park | https://tpwd.texas.gov/state-parks/mckinney-falls/ | Gate, office and weekend visitor-center hours differ |

Do not treat dated verification as a promise of live availability. Confirm active closures and capacity with TPWD. The existing `reviewDestinationVisitorFacts` removes time-sensitive answers from display after 120 days rather than silently aging them into evergreen copy.

### Coverage limitations

These new fields apply to the `/destination/:slug` family via the existing curated destination registry. They are not an automatic update for standalone event, historic-site, museum, city/county, article, itinerary, or raw Supabase-imported templates. The curation scanner covers literal fact arrays inside `destination-curation*.ts`, not dynamically constructed facts or every page family. The full statewide inventory and future ingestion upgrades remain open.

## State-park batch four: source-verified special cases (October 21, 2026)

Ten existing state-park entries gain 23 additional individual facts with official TPWD URLs and short review windows. Unlike generic state-park templates, this batch separates changing fee and gate hours from site-specific issues: Mother Neff's closed south entrance, Lockhart's seasonal office hours and pool season, Longhorn Cavern's independently booked tour and lack of camping, and Martin Dies Jr.'s headquarters midday closure.

Official operator source registry: [Mother Neff](https://tpwd.texas.gov/state-parks/mother-neff), [Lockhart](https://tpwd.texas.gov/state-parks/lockhart), [Longhorn Cavern](https://tpwd.texas.gov/state-parks/longhorn-cavern), [Martin Dies, Jr.](https://tpwd.texas.gov/state-parks/martin-dies-jr), [Mission Tejas](https://tpwd.texas.gov/state-parks/mission-tejas), [Meridian](https://tpwd.texas.gov/state-parks/meridian), [Martin Creek Lake](https://tpwd.texas.gov/state-parks/martin-creek-lake), [Atlanta](https://tpwd.texas.gov/state-parks/atlanta), [Bonham](https://tpwd.texas.gov/state-parks/bonham), [Buescher](https://tpwd.texas.gov/state-parks/buescher).

Review method: official public TPWD park overview per exact location on October 21, 2026. A tour with separate operator charges is never mislabeled as a standard entry ticket; information changes should expire under the existing visitor-fact freshness policy rather than be silently restamped. Deployment/production visibility remains subject to protected CI and release verification.
