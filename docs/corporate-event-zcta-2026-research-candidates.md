# Houston corporate events — October 26, 2026 Census ZCTA research checkpoint

**RESEARCH ONLY — NOT APPROVED FOR PRODUCTION GEOSEARCH.** These are U.S. Census statistical ZCTA representative positions, **not** USPS ZIP delivery locations, business entrances, event-room positions, route mileage, customer coordinates or certified accessibility entrances. **No point in this file is a `VerifiedZipLocation` or `VerifiedVenueLocation`; nothing here may be automatically ingested into the public radius engine.**

## Exact original source evidence

- [2026 U.S. Census national ZCTA Gazetteer archive](https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gazetteer/2026_Gaz_zcta_national.zip) (source vintage: 2026; representative points).
- [2020 U.S. Census ZCTA-to-county national relationship file](https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt) (2020 boundaries and county intersections; cannot independently certify unchanged 2026 county boundaries).
- [GitHub source-only review run #40374376802](https://github.com/keeptxred/TexasDefined/actions/runs/40374376802) succeeded October 26, 2026, using source commit `7203b843c883dadc922c92a17d9d6b28fe25f0db`.
- [Time-limited original research artifact #12673507707](https://github.com/keeptxred/TexasDefined/actions/runs/40374376802/artifacts/12673507707) (30-day retention; preserved here to avoid losing the review provenance). Workflow's artifact ZIP digest: `sha256:e5e5df2df24eb8c6eacd9478f20bd75567efa09f167fdf990407da261ff52476`.
- Output's self-reported review date: **2026-10-26**; `purpose: quarantined-zcta-research-only`, `verifiedZipLocationsCreated: 0`, `venuesGeolocated: 0`, `publicRadiusEnabled: false`.

## Original read-only candidate results (not venue points)

| Requested five-digit code / Census ZCTA | Census representative latitude | Census representative longitude | 2020 intersecting county GEOID | Result |
| --- | ---: | ---: | --- | --- |
| 77030 | 29.705085 | -95.401743 | 48201 (Harris County, TX) | Research candidate; independent review required |
| 77058 | 29.561579 | -95.099626 | 48201 (Harris County, TX) | Research candidate; independent review required |
| 77020 | 29.768297 | -95.308971 | 48201 (Harris County, TX) | Research candidate; independent review required |
| 77034 | 29.614830 | -95.192999 | 48201 (Harris County, TX) | Research candidate; independent review required |
| 77056 | 29.748202 | -95.468948 | 48201 (Harris County, TX) | Research candidate; independent review required |

Every row comes from the actual **successful GitHub source-research artifact**, not from geocoding business street addresses, a city center, an IP address or a synthetic test fixture. The 2020 county crosswalk yielded a single county GEOID for each requested ZCTA; that alone is **not evidence** that a USPS ZIP and a 2026 ZCTA boundary are interchangeable.

## Added research target for newly documented venues — 2026-10-27

The existing source-verified public business-address research now includes [Puttery Houston and PKL Social](./corporate-event-geography-evidence.md) in Houston ZIP **77007**, alongside HMNS in previously researched 77030. The read-only official-Census GitHub evidence workflow now requests **six** distinct candidate ZCTAs: `77030, 77058, 77020, 77034, 77056, 77007`. The source-only workflow **ran successfully on October 28** and the original result was inspected as described below. No USPS ZIP delivery equivalence, present-day county boundary or actual venue entrance has been certified.

The five archived candidate rows above remain results of the original October 26 run. They are not retroactively modified or expanded by this workflow change. No geocoded entrance, source-approved ZCTA, public `VerifiedZipLocation`, radius match, road mileage, partner availability or paid booking is created by the sixth research request. The workflow artifact remains quarantined and expires after 30 days.

## October 28 actual official-source research artifact — 77007 (not approved)

The expanded six-ZCTA source-review workflow completed [GitHub run #40628901381](https://github.com/keeptxred/TexasDefined/actions/runs/40628901381) with **SUCCESS** for source commit `7ea0ecbb7001885b80aa1fa518d7338d1007b210`. The [original 30-day artifact #12790253500](https://github.com/keeptxred/TexasDefined/actions/runs/40628901381/artifacts/12790253500) was separately downloaded and its single `zcta-review.json` inspected on October 28, 2026. Downloaded artifact ZIP digest: `sha256:64fd308875f44b5ebdd9b60dbd9ee9f58f916705811220e0362bafc0be29757a`. The source output reports `asOf: 2026-10-28`, the same pinned Census 2026 national ZCTA Gazetteer and 2020 county crosswalk as the original five-target research, and no public enrollment.

| Newly researched ZCTA | Census 2026 representative latitude | Census 2026 representative longitude | 2020 county GEOID intersection | Result |
| --- | ---: | ---: | --- | --- |
| `77007` | 29.771579 | -95.408930 | 48201 (Harris County, TX) | `research-candidate-needs-independent-review` |

All **six** requested ZCTAs, including the five previously archived above, returned the source program's `research-candidate-needs-independent-review` status with Harris County GEOID `48201` in the **2020** file. These are source-derived statistical representative positions, not parking, parcel, venue entrance, live distance, postal ZIP delivery or event booking evidence. Original output explicitly retains:

- `verifiedZipLocationsCreated: 0`
- `venuesGeolocated: 0`
- `publicRadiusEnabled: false`
- `admissionToRadiusSearch: false` on each result

The new result advances **Census research provenance only**. Do not populate `VerifiedZipLocation`, `VerifiedVenueLocation` or the public radius engine from this document. Physical entrance/premises verification, accountable source approval, 2026-versus-2020 county-boundary reconciliation and browser acceptance remain separate prerequisites. No planner location was requested or stored.

## Mandatory independent checks before any enrollment

1. Confirm the original Census source files, revision dates, row identity and 2026/2020 vintage crosswalk; handle subsequent Census replacements, changed boundaries and codes that have no unique statistical-area relationship.
2. Independently check whether each public business's operator-published address and five-digit ZIP remain current. A first-party business street address is **not an operator-certified coordinate**. Exact site evidence and review dates are in [the governed geography evidence guide](./corporate-event-geography-evidence.md).
3. Separately obtain authorized, independently source-verified actual **venue entrance or premises points** for the corresponding public venue. Census address interpolation is only a research candidate and must **not** be relabeled as an entrance.
4. Have the typed point validation, source/precision/date checks, duplicate rejection, privacy-safe approximate-distance disclosures, public acceptance tests, protected merge, and exact deployed-source browser verification independently pass.
5. If any condition is unmet, retain **unsupported ZIP/no verified premises** rather than inventing a nearby venue or travel time.

**This document preserves archival official-data research, not a decision to enable the public ZIP-radius feature, verify a live booking, contact a partner, or modify a customer record.**
