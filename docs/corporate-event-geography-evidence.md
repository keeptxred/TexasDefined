# TexasDefined corporate events — geolocation evidence workflow

## Current safety boundary

The corporate events finder currently matches cities, regions and limited ZIP aliases as **editorial markets**, not physical search radii. The separate `corporate-event-verified-proximity.ts` engine intentionally returns `unsupported_zip` until a ZIP/ZCTA representative point and a venue premises/entrance location have independent evidence. Do not activate a public ZIP-radius filter using guessed city centers or unsourced coordinates.

A postal ZIP code is not a street address or a promise of delivery-zone accuracy. A 2026 Census ZIP Code Tabulation Area (ZCTA) representative coordinate describes a statistical area rather than the organizer's home/business position. Display as straight-line *approximate miles* and never as road distance, travel time, pickup coverage, or date availability.

Official references:

- Census 2026 Gazetteer files / ZCTA representative coordinates: https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.2026.html
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

**Census geographic reference:** The [2026 U.S. Census Gazetteer ZCTA download](https://www.census.gov/geographies/reference-files/2026/geo/gazetter-file.html) is available, but a ZCTA is a statistical area rather than a customer's USPS-delivery address or physical position. No ZCTA points were admitted from this research. Official first-party address evidence is not interchangeable with a survey-accurate venue entrance coordinate. Before running the existing quarantined Census street-address interpolation research script, an accountable editor must recheck these records and record a genuine `addressReviewedOn` date; generated candidate coordinates cannot auto-publish.
