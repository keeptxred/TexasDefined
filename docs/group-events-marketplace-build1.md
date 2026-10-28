# Group Events & Experiences — Build 1 foundation

**Scope:** Greater Houston-first marketplace data foundation, extending (not replacing)
the production `/corporate-events` directory. Build 2 is separately gated on
source-verified inventory and actual site-level facts. No portals, payments,
bookings, automated quote routing or external emails are introduced.

## Existing functionality retained

- `src/routes/corporate-events.tsx` and `corporate-events.lazy.tsx` remain
  the canonical route and customer experience.
- `src/data/corporate-events.ts` remains the source-dated independent
  editorial directory. Existing provider slugs, cards, budgets, location
  matching, compare/shortlist, proposal and inquiry paths remain unchanged.
- Existing private `texasdefined_group_event_requests`,
  `texasdefined_group_event_partner_applications`,
  `texasdefined_group_event_offers`, consent and agreement/evidence tables
  retain all data and their previous protections. No automatic partner conversion.
- Existing Explore entity, location, media and tag tables are reused. In
  particular `explore_locations.entity_id` is UNIQUE: a business operator
  can link to several existing *location entities* through a new private
  relationship table; the underlying location or address records are not copied.

## Added domain relationship

```text
Explore provider entity OR stable legacy corporate-event slug
    -> texasdefined_group_event_provider_locations (junction)
        -> existing explore_locations / Explore physical location entity
    -> texasdefined_group_event_experiences
        -> texasdefined_group_event_packages (per-package capacity, rates and included activities)
        -> texasdefined_group_event_experience_tags -> existing explore_tags
        -> existing explore_media (rights-gated optional image)
```

Mobile and multi-site experiences can have a provider but no permanent
`provider_location_id`. A package does not inherit venue-wide capacity.
Unknown capacity, rate, source, availability and amenities remain unknown.
`service_cities` is explicit evidence-based coverage, not inferred drive radius.

## Editorial, participation and data rights

- New records start unverified, independent and unpublished.
- Independent editorial listing is not participation. Participating status
  requires recorded approval; sponsored requires participation and a separate
  promotional approval. Paid status does not affect eligibility, rankings,
  review scores or actual response metrics.
- Official HTTPS provenance, checked and verified dates, and explicit rights
  metadata accompany claims; unconfirmed images may not be published as
  authentic venue photographs. Existing Explore media licensing remains the
  backing record of image rights.
- Controlled occasion, activity and amenity terms are namespace-isolated in
  existing `explore_tags`. Quantities use typed fields, not text tags.
- The new tables enforce RLS and revoke all access from `anon` and
  `authenticated`; the server-only service-role data layer is the only
  intended read/write path. New data API grants must not expose these tables.
- No customer contact PII is copied or placed into the marketplace catalog.

## Validation

- `node --experimental-strip-types --test src/data/group-event-marketplace-foundation.test.ts`
- `node --experimental-strip-types scripts/data/validate-group-events-marketplace-foundation.mjs`
- Both must run inside `node scripts/ci/run-premerge-validation.mjs`, the
  required protected merge gate. Do not bypass existing checks.
- Before deploying the new Supabase migration, verify its proposed schema
  against the shared production catalog and run the security advisor after
  application; preserve the GitHub/supabase migration ledger parity.
- Existing corporate-events route, search, proposal, inquiry, admin, SEO and
  production smoke checks remain in the canonical runner. A passing source
  build alone is insufficient.
- Only merge a checked branch reconciled with the current main; deploy through
  the existing protected GitHub Actions -> Cloudflare production workflow.
  Never publish directly through the Cloudflare OAuth connector.

## Build 2 handoff

The currently published and source-reviewed seed inventory is in
`src/data/corporate-events.ts`, not the new empty experiences tables.
Existing `scripts/data/validate-corporate-events.mjs` requires 146+ Texas
directory records and 60+ Houston-city records; these are baseline test
thresholds, not a substitute for a fresh counted, de-duplicated inventory.

For Houston/Katy/Cypress/Sugar Land/Pearland/Spring/The Woodlands screening:
1. Preserve each existing slug and identify its true operator and actual
   physical location before linking it to an Explore entity. Do not treat
   multi-site entries as one specific address.
2. Record independently source-supported activity and *simultaneous* group
   capacity, rotations, duration, minimum group size and indoor-only fit.
   For a 45–50-person team, exclude unknown simultaneous limits unless
   official evidence confirms rotations.
3. Add official URL, verification timestamp, explicit supported occasions
   and amenities (including food) and approved photo rights.
4. Do not assume an application is an accepted partner or a public rate is
   a negotiated package. Review potential duplicates and conflicting room
   capacities manually rather than deleting existing records.
5. Populate venue/experience/package data only after these facts have been
   verified; no automated statewide seeding as part of Build 1.

**Release gate:** A merged PR, applied/reconciled migration, passing
protected CI and production verification are each required. The existence
of this document or source code does not imply those steps occurred.
