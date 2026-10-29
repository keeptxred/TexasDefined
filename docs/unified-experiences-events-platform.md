# TexasDefined — unified attractions, experiences and event intelligence

Status: **Implementation Wave 1 / October 29, 2026**. This work extends the
existing event guides, Christmas/Ticketmaster/TPWD calendar, Explore experience
directory and Cloudflare Viator API; it does **not** replace them or reopen the
deferred customer/venue portal design for Group Events & Experiences.

## Canonical editorial model

Source: `src/data/discovery/entity-registry.ts`.

One TexasDefined-owned **entity ID** represents each permanent attraction,
annual event, dated event or recurring experience. Independent source evidence,
occurrences, county links, provider IDs and offer relationships are separate.
The same attraction can be shown in destination guides, county pages, Explore,
calendar sidebars and later group-event discovery without publishing duplicates.

- Permanent attraction: durable original visitor guide, updated official
  access information. A Viator listing is an intelligence signal, not a
  license to reuse Viator's descriptions or proof of museum admission.
- Annual event: permanent reviewed guide even when next season's exact dates
  are unannounced. Only confirmed occurrence records may appear as upcoming
  calendar events or event/date schema. Cancellation and postponement never
  silently carry forward last year's dates.
- Recurring tour: discovery/booking experience, not a distinct public
  calendar event for every daily departure. No `Event` schema just because
  the supplier has a bookable schedule.
- Supplier offer: separate booking relationship (`admission`,
  `related-tour`, `nearby-experience`) with attribution and verification,
  not editorial ownership of the entity.

`matchSourceCandidate` will auto-associate only an unambiguous *already
verified provider ID*. A same-name/city match is flagged for human/official
source review; same-name cross-county identity is never assumed.
`mayIndexDiscoveryEntity` requires published original editorial work and
trusted cited evidence; it is not an auto-publication tool. Existing authority
routes remain canonical and are not duplicated.

## Source usage and supplier permissions

1. Official organizer/venue/TPWD sources control **event schedule, location,
   accessibility, closures and admission**. Only corroborated dates are
   promoted into event occurrences.
2. TexasDefined editorial records provide original visitor planning, original
   guide text, local/county links and SEO value. Existing verified community
   Christmas events and separately confirmed performances remain primary.
3. Ticketmaster and other approved affiliate networks supply bookable offers
   if relevant. Do not imply that tickets guarantee admission unless they
   explicitly cover that event.
4. Viator supplies (a) limited on-demand products and (b) non-indexable
   attraction discovery; its market/product data is not evidence of a public
   event or an official public attraction schedule.

**Viator license**: The partner certification explicitly requires the entire
attraction data feed to remain non-indexable. Its travel product information,
unique content and reviews must not be indexed. We must never ingest Viator
prose into server-rendered authority pages or commit it as site copy. The
provider JSON routes are excluded for all crawlers in `public/robots.txt`
and source-only attraction research replies carry `X-Robots-Tag: noindex`.
Live product previews are client-requested, not SSR. Preserve exact
`productUrl` attribution and the fallback market links.

References:
- https://partnerresources.viator.com/travel-commerce/certification/
- https://partnerresources.viator.com/travel-commerce/technical-guide/
- https://docs.viator.com/partner-api/technical/
- https://developers.google.com/search/docs/appearance/structured-data/event

## Live functionality in Wave 1

- Source-only `GET /api/viator/market/:market/attractions` samples up to 12
  attractions per previously verified Texas market. Sanitized response:
  provider ID, name, market and optional product count only; no description,
  images, reviews, operating hours or unverifiable official facts.
  One-week Cloudflare cache, no query parameters and no pagination fanout.
- `GET /api/viator/market/:market/christmas` uses basic-affiliate
  `/search/freetext` for Christmas products, not `/availability/check`.
  Four matching bookable experiences maximum, 20-minute edge cache, no
  unverified prices or dates. The exact, already attributed Viator product
  URLs must be left unchanged.
- All event calendar collection pages and the statewide calendar expose an
  **optional, visitor-requested** tours-and-experiences module by Texas metro.
  The official event calendar remains separate. Christmas collections use
  only the topical Christmas experiences query.
- Existing calendar/collection event cards can link to the canonical verified
  county route, adding bidirectional discovery without auto-creating pages.

## Weekly discovery and editorial review

`.github/workflows/weekly-viator-attraction-discovery.yml` runs Monday,
read-only. It inspects at most 12 attraction samples for each of 14 verified
markets using the **existing Cloudflare-bound API secret**; no GitHub Viator
secret or direct bulk entitlement is needed. It writes one short-lived Actions
artifact `viator-attraction-review.json` with provider ID, name and possible
match against the existing Top 25 attractions for internal editorial review.

Candidates are **not auto-published**. To publish an authority guide, review
the operator's official website, verify city/county and ownership, check for
canonical duplicate pages and thin content, write independently original
parking, access, history, photography and practical visitor guidance; validate
the county/city/destination link graph and SEO head. Publishing a blank page
based only on an affiliate offer is prohibited.

The first 12 results per market are just a **bounded sample**, not complete
statewide coverage. Scale further only when API terms, update cadence,
costs, operational review and editorial publication capacity allow.

## Verification and next waves

Contract tests: `node --experimental-strip-types --test
src/data/discovery/__tests__/*.test.ts src/lib/__tests__/viator-attraction-discovery.test.ts`

Safety validator: `node scripts/data/validate-unified-discovery-governance.mjs`

Next independent implementation waves (not falsely declared complete):
- Map new independently verified attractions to their existing canonical
  guides (or research/publish genuinely useful new authority pages).
- Add a reusable provider/offer resolver to all dedicated attraction and
  annual-event guides, preferring relevant approved affiliate ticket options
  without displacing official source requirements.
- Extend source-normalization pipelines for additional official tourism and
  operator calendars with verifiable dates, recurrence rules and shutdown
  status before rendering upcoming cards.
- Connect the same canonical entity/offer model to the *future* group-events
  marketplace only after its separate inventory, group capacity and portal
  decisions are approved. Do not launch customer/venue logins here.

**No indexable automated mass pages. No unverified recurring dates. No
unlicensed supplier prose. No invented group capacity or ticket availability.**
