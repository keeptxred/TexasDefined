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

## Mandatory independent checks before any enrollment

1. Confirm the original Census source files, revision dates, row identity and 2026/2020 vintage crosswalk; handle subsequent Census replacements, changed boundaries and codes that have no unique statistical-area relationship.
2. Independently check whether each public business's operator-published address and five-digit ZIP remain current. A first-party business street address is **not an operator-certified coordinate**. Exact site evidence and review dates are in [the governed geography evidence guide](./corporate-event-geography-evidence.md).
3. Separately obtain authorized, independently source-verified actual **venue entrance or premises points** for the corresponding public venue. Census address interpolation is only a research candidate and must **not** be relabeled as an entrance.
4. Have the typed point validation, source/precision/date checks, duplicate rejection, privacy-safe approximate-distance disclosures, public acceptance tests, protected merge, and exact deployed-source browser verification independently pass.
5. If any condition is unmet, retain **unsupported ZIP/no verified premises** rather than inventing a nearby venue or travel time.

**This document preserves archival official-data research, not a decision to enable the public ZIP-radius feature, verify a live booking, contact a partner, or modify a customer record.**
