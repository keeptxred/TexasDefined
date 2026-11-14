# TexasDefined corporate events — geolocation evidence workflow

## Current safety boundary

The corporate events finder currently matches cities, regions and limited ZIP aliases as **editorial markets**, not physical search radii. The separate `corporate-event-verified-proximity.ts` engine intentionally returns `unsupported_zip` until a ZIP/ZCTA representative point and a venue premises/entrance location have independent evidence. Do not activate a public ZIP-radius filter using guessed city centers or unsourced coordinates.

A postal ZIP code is not a street address or a promise of delivery-zone accuracy. A 2026 Census ZIP Code Tabulation Area (ZCTA) representative coordinate describes a statistical area rather than the organizer's home/business position. Display as straight-line *approximate miles* and never as road distance, travel time, pickup coverage, or date availability.

Official references:

- Census 2026 Gazetteer files / ZCTA representative coordinates: https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2026.html
- Exact original official 2026 national ZCTA archive (NOT a venue geocoder or a ZIP delivery map): https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gazetteer/2026_Gaz_zcta_national.zip
- Census single-record Geocoder API: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
- Census technical geocoding caveat (range interpolation): https://www.census.gov/programs-surveys/geography/technical-documentation/complete-technical-documentation/census-geocoder.html

## Venue address research (manual only)

1. A staff editor independently verifies a complete **public venue street address** on the venue's own official HTTPS website, matching its existing TexasDefined directory city/official domain. Save the exact URL and the actual review date. Do not use a home address, organizer contact, IP location or browser geolocation.
2. Create an untracked input JSON file at `.artifacts/corporate-events/approved-public-addresses.json` containing at most 25 entries per manual run. Example schema — replace all fields with *real verified public venue evidence before running*:

   ```json
   [
     {
       "providerSlug": "REPLACE-WITH-ACTUAL-DIRECTORY-SLUG",
       "streetAddress": "REPLACE WITH VERIFIED PUBLIC VENUE STREET ADDRESS",
       "city": "REPLACE WITH EXACT DIRECTORY CITY",
       "zip": "REPLACE WITH VERIFIED 5-DIGIT VENUE ZIP",
       "officialAddressEvidenceUrl": "https://REPLACE-WITH-THE-EXACT-VENUE-OFFICIAL-SOURCE",
       "addressReviewedOn": "YYYY-MM-DD"
     }
   ]
   ```

3. Run explicitly, from the repository root:

   ```sh
   node scripts/data/research-corporate-event-geocodes.mjs \
     --input .artifacts/corporate-events/approved-public-addresses.json \
     --output .artifacts/corporate-events/geocode-review.json \
     --lookup
   ```

   The script makes **at most 25 read-only Census address requests** per execution. Missing or conflicting addresses fail closed. Reports remain within `.artifacts/corporate-events/` and are created as private, no-overwrite files. The script never edits the directory, Supabase, public routes, providers, or user data.

4. Treat all reported coordinates as **interpolated address-range research candidates only**. The Census service explicitly describes calculated coordinates along street address ranges. Do not relabel one as `venue-premises` or `venue-entrance` based solely on a successful response. Staff must independently verify the actual venue premises or entrance using authoritative public mapping/property/venue material (with original source URL, review date and legal rights to use it). A failed cross-check means no radius enrollment.
5. Only manually approved, independently sourced premises/entrance points may be saved in the dedicated typed `VerifiedVenueLocation` evidence registry. Unverified points stay excluded. A published venue record with no valid geolocation remains visible in city searches and must not be falsely described as having no nearby supply.

## ZCTA evidence

A general Census site URL, street-address interpolation, or incorrectly constructed download URL does **not** establish actual ZCTA representative coordinates. The offline radius validator admits only an original Census national ZCTA Gazetteer archive path with the matching publication year and valid source-review/as-of calendar dates. The archive itself still requires point-level ingestion review, unique ZIP association and independent Texas geographic confirmation before public use.

Use the 2026 Census Gazetteer **ZCTA** file, verify each candidate's Texas association with authoritative geography rather than inferring it only from a `7xxxx` postal prefix, and retain the dataset vintage/source URL, real review date, and `precision: 'zcta-representative'`. Do not interpret the centroid as the organizer's actual location. If a ZIP has no unique verified statistical-area representative point, return `unsupported_zip`.

## Final activation gate

Before exposing the new UI, require all of: (a) independently sourced ZIP and venue points; (b) source/precision/date validators and duplicate/conflict rejection; (c) clearly marked straight-line approximation, with excluded-unverified counts; (d) canonical premerge tests, mobile browser acceptance, and production smoke; (e) protected GitHub merge/deploy and actual deployed SHA verification. Any incomplete item keeps radius search disabled. Never invent travel times, road mileage, signed partner deals, live availability or bookings.

**No geographic source research automatically approves a partner, creates a booking, or authorizes planner contact.**

## Operator-site public addresses — initial evidence review, 2026-10-25

The following five **business** addresses were read directly from the listed venue operators' HTTPS pages on 2026-10-25 and matched to existing `corporateEventProviders` source records (venue slug, operator domain, and city). They are **source-researched street addresses**, not independently approved entrance/premises GPS points, not organizer/home addresses, and not event-booking availability. No coordinates, travel times, radius matches or private database records have been created or published. **Staff must recheck each venue's official address, usable entrance and position before a location can graduate to the verified engine.**

| Existing public provider slug | Operator-published public street address | Official first-party source | Evidence status |
| --- | --- | --- | --- |
| `houston-zoo-events` | 6200 Hermann Park Drive, Houston, TX 77030 | [Houston Zoo directions](https://www.houstonzoo.org/plan-your-visit/directions-parking/) | Street address and **main entrance address** identified by operator; GPS point NOT verified |
| `space-center-houston-corporate-rentals` | 1601 NASA Parkway, Houston, TX 77058 | [Space Center Houston contact](https://spacecenter.org/contact/) | Public facility address; event/visitor entrance GPS NOT verified |
| `beat-the-bomb-houston` | 2103 Lyons Avenue #300, Houston, TX 77020 | [Beat The Bomb Houston](https://www.beatthebomb.com/locations/houston) | Public unit address; specific venue entrance GPS NOT verified |
| `lone-star-flight-museum-rentals` | 11551 Aerospace Avenue, Houston, TX 77034 | [Lone Star Flight Museum visitor directions](https://lonestarflight.org/visit-2/visit/) | Public museum address, separate southeast bus entrance noted by operator; GPS point NOT verified |
| `museum-of-illusions-houston-groups` | 5060 W Alabama Street, Suite 2D, Houston, TX 77056 | [Museum of Illusions Houston contact](https://moihouston.com/contact-us) | First-floor Galleria venue, operator identifies Alabama Street mall entrance; venue's exact GPS point NOT verified |

**Census geographic reference:** The [2026 U.S. Census Gazetteer ZCTA download](https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gazetteer/2026_Gaz_zcta_national.zip) is available, but a ZCTA is a statistical area rather than a customer's USPS-delivery address or physical position. No ZCTA points were admitted from this research. Official first-party address evidence is not interchangeable with a survey-accurate venue entrance coordinate. Before running the existing quarantined Census street-address interpolation research script, an accountable editor must recheck these records and record a genuine `addressReviewedOn` date; generated candidate coordinates cannot auto-publish.

## 2026 ZCTA + official Texas county intersection research (offline only)

The 2026 Census national ZCTA Gazetteer includes representative coordinates, but ZIP codes and ZCTAs are not identical, and the Gazetteer does **not** establish a requested code's Texas-only county association. The separate [2020 Census ZCTA-to-county relationship file](https://www.census.gov/geographies/reference-files/time-series/geo/relationship-files.2020.html) supplies 2020 geographic intersections. A ZCTA overlapping multiple states must **not** be treated as a uniquely Texas ZIP because its five digits look Texan. The 2020 county relationship must be manually reconciled with any 2026 code changes before approval.

**Authoritative original files:**

- [Census national 2026 ZCTA Gazetteer archive](https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2026_Gazetteer/2026_Gaz_zcta_national.zip)
- [Census national 2020 ZCTA-to-county relationship table](https://www2.census.gov/geo/docs/maps-data/data/rel2020/zcta520/tab20_zcta520_county20_natl.txt)
- [Census ZCTA/county record layout](https://www.census.gov/programs-surveys/geography/technical-documentation/records-layout/2020-zcta-record-layout.html)
- [Census ZIP vs. ZCTA methodology](https://www.census.gov/programs-surveys/geography/guidance/geo-areas/zctas.html)

After downloading and verifying those official source files manually, extract the 2026 archive's actual ZCTA text member (inspect the member name; do not assume one) into `.artifacts/corporate-events/2026_Gaz_zcta_national.txt`, and save the 2020 pipe-delimited relationship table to `.artifacts/corporate-events/tab20_zcta520_county20_natl.txt`. Keep both untracked and never use an actual planner's ZIP or browser position for venue research.

Run the private, **read-only** review from the repository root:

    node scripts/data/review-corporate-census-zctas.mjs --gazetteer .artifacts/corporate-events/2026_Gaz_zcta_national.txt --counties .artifacts/corporate-events/tab20_zcta520_county20_natl.txt --zips 77030,77058,77020,77034,77056,77007 --output .artifacts/corporate-events/zcta-review.json

**Automatic source-research alternative:** The separate [Corporate Events Census ZCTA Research](../.github/workflows/corporate-zcta-evidence-review.yml) GitHub workflow runs on changes to its workflow file on the protected main branch, supports explicit `workflow_dispatch`, and rechecks the pinned official source once annually on November 1. It retrieves only the two original Census HTTPS datasets, extracts only the expected ZCTA text file, runs the same read-only researcher for six independently source-reviewed Houston business ZIPs (77030, 77058, 77020, 77034, 77056 and 77007), and retains a 30-day **review-only** GitHub Actions artifact. This is source preparation, **not** independent point approval, a venue entrance check, an accepted ZIP-radius origin, or a future data vintage update. A failed official source download must fail the research job rather than introducing approximated map points; unrelated production deployments are unaffected.

This **does not download files, publish anything, modify the venue catalog, create a VerifiedZipLocation, or enable radius search**. The output is a no-overwrite private research report with a maximum of 25 distinct requested ZCTAs. Only unique, numerically valid Census internal points with county relationships exclusively within Texas (county GEOIDs beginning with state FIPS **48**) qualify for further independent review. A missing code, ambiguous point, absent county relationship or any non-Texas county intersection fails closed, even if the ZIP begins with `7`.

A successful candidate status is **not an approved point**: independently confirm both official file integrity and the geography's relevance, document human source review, and retain real venue-premises or entrance evidence separately. ZCTA representative points are statistical approximations, **not driving times, visitor positions, or USPS-delivery coordinates**.

The canonical premerge suite includes synthetic cross-state, invalid source-header, duplicate and out-of-range checks. **No current ZCTA points or venue coordinates have been admitted to the public search.**

**Durable source-research checkpoint:** The [Census ZCTA evidence report](./corporate-event-zcta-2026-research-candidates.md) retains the actual October 26 five-code and October 28 six-code official-source artifacts (including newly researched 77007), exact statistical representative points, 2020 Harris County GEOID and unverified status after each 30-day workflow artifact expires. These remain **research-only** statistical points, not certified entrances or approved ZIP origins. This is a research document only, **not** accepted `VerifiedZipLocation` evidence or a live radius-search activation.


## Additional operator-published Houston business-address research — 2026-10-26

These are **three further independently checked first-party *public business street addresses*** for existing source-reviewed directory records. They expand the five-address research set to eight. They are **not** venue entrance/premises GPS, public `VerifiedVenueLocation` objects, signed partner relationships, venue availability or radius-search inventory. Research performed by reading each operator's own public HTTPS page on 2026-10-26, with no contact form submitted and no database write.

| Exact existing provider slug | Operator-published public address | First-party address evidence (reviewed 2026-10-26) | Precision and uncertainty |
| --- | --- | --- | --- |
| `puttery-houston-corporate-events` | 1818 Washington Avenue, Suite 180, Houston, TX 77007 | [Puttery Houston venue page](https://www.puttery.com/locations/houston/) | Operator lists "Ste 180" in its address block and "Suite A-180" in its FAQ, and identifies its **Center Street main door** near Center/Silver. Verify the exact entrance and a separately sourced point before geolocation; **no point recorded** |
| `pkl-social` | 1112 Shepherd Drive, Houston, TX 77007 | [PKL Social official careers-page contact footer](https://pklsocial.com/careers/) | The operator's first-party contact footer gives a **public business address**, but that employment-page address alone is **not** evidence of the event check-in entrance or an independently verified premises coordinate |
| `hmns-houston-corporate-events` | 5555 Hermann Park Drive, Houston, TX 77030 | [Houston Museum of Natural Science directions and parking](https://www.hmns.org/visit/directions-parking/) | Official **main museum location** with separate garage/access information; no specific event-room entrance or GPS point verified |

**Explicit geographic exclusion: `the-escape-game-houston`.** This existing *combined* CityCentre/Galleria provider record does not uniquely identify one physical Houston venue. The [operator's Houston locations page](https://theescapegame.com/houston/) lists both CityCentre (794 Sorella Court, Suite 127, Houston, TX 77024) and The Galleria (5015 Westheimer Road, Suite A1178, Houston, TX 77056). **Do not enroll either address, ZIP or point against the single combined directory slug.** First identify the particular location/booking format, then create or associate a separately reviewed location-specific provider record through the existing editorial governance process. An ambiguous combined provider must remain in ordinary editorial city searches but **excluded from any physical radius results**, with a clear excluded/unverified disclosure.

**Evidence limitations:** Address publication alone does not establish a street entrance coordinate. Do not derive latitude/longitude by city-center substitution or Census street interpolation and label it premises precision. These 2026-10-26 reviews are address/source checks, not operator agreement, real-time availability, current county/ZCTA verification or permission to transfer an organizer's data. The public ZIP-radius UI remains disabled.
