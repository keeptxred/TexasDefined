# TexasDefined historic-site authority standard

**Effective:** 2026-10-12  
**Applies:** All new historic-site destination pages and substantive revisions to older pages. PR #4685 expanded beyond the original ten to cover all 46 historic-site seeds and canonical companion destinations. Editorial expansion is not the same as source-by-source final certification.

## Editorial acceptance

A page is only called an authority guide when it offers independent visitor and historic-research value **beyond a rewritten operator description**:

1. **One canonical destination URL, no duplication.** Match the actual site identity and managing authority. A mission, fort, battleground, museum and adjoining state park can have separate operating rules even when geographically connected. Check aliases and redirects rather than publishing competing near-identical pages.
2. **Clearly sourced historic interpretation.** Establish a dated chronology with linked primary or institutional sources. Explain the site’s significance, changing functions and physical landscape. Distinguish original fabric, archaeological foundations, reconstructed buildings and modern commemoration. Include Indigenous, Tejano, African American and civilian perspectives where integral; avoid heroic-only military narratives.
3. **Current, usable visitor instructions.** Primary operator link, location/county, realistic duration, walking and weather exposure, accessibility, parking, fee/reservation *policy*, closures, on-site amenities and different units where relevant. Never imply a fixed schedule, ticket price, room rental or guided tour remains available without live source verification. Display the last actual source-review date, not a fabricated freshness timestamp.
4. **Original synthesis and itineraries.** Explain the experience and provide useful short visit, deeper visit and regional multi-site itineraries that respect geography and separate operating days. Include family considerations and risks specific to the landscape rather than generic travel filler. Cross-check timelines against source citations.
5. **Licensed, relevant visual evidence.** At least one subject-accurate photo with **file-level** public-domain/open-license provenance, attribution, license terms and descriptive alt text. Add genuinely distinct second/third views, historic plans or maps where licenses permit, not duplicates or stock filler. Do not label an image original unless TexasDefined made it. Preserve CC attribution/share-alike obligations and record source asset URLs.
6. **Related context and bidirectional navigation.** Where appropriate, link the historic site *to* its county, town, nearby sites and statewide thematic/itinerary guides. Link *from* the relevant county/town/nearby destination/guide back to the site. Link only when both pages help the reader make a more informed choice; don't build site-wide keyword wheels.
7. **Citable and accessible page structure.** Visible author/editorial ownership, sources, review date, canonical, image credits, alt text, scannable headings, mobile usability, JSON-LD where supported, meaningful internal anchor labels and valid destinations. Cite official NPS/THC/TPWD/operator source pages for operational facts.
8. **QA before release.** Pass historic-site authority validator, sitemap/indexability review, internal-link and image checks, build/CI, production responsive and accessibility verification. No automatic claim that TexasDefined outranks the official site: ranking requires independent evidence and time.

## Existing platform features

- Shared destination route: `src/routes/destination.$slug.tsx`.
- Authority templates and timeline: `src/components/editorial/DestinationAuthorityGuide.tsx`.
- Shared county inbound links: `src/components/content/CountyHistoricSites.tsx`.
- Historic context and thematic outbound links: `src/data/historic-site-evergreen-links.ts`.
- Featured site depth: `src/data/historic-site-authority-2026.ts`, `src/data/historic-site-authority-timelines.ts`.
- Nearby and two-way relevant links: `src/data/destination-editorial-links.ts`.
- CI guard: `scripts/data/validate-historic-sites.mjs`. All 46 protected historic seeds must have unique context, the authority-guide baseline and relevant links; new entries cannot bypass that coverage. Independent operator/source evidence and licensed images are additional final-certification requirements.

## Statewide certification boundaries

The original ten have fuller individual history, sources, itineraries and timelines; 40 other seeded sites now have individually tailored history and a structured visitor-planning foundation. The Alamo keeps its existing top-attraction authority component. The full-catalog adapter extends relevant guide components to other historic-site destination records where adequate source data already exists. **Every site remains subject to actual source verification, production rendering, image-by-image provenance checks and visitor-experience QA before receiving a final individual authority certification.** The existing licensed-hero registry is not proof of original field photography or multiple usable gallery images.

The live category can also contain museums and attractions with their own editorial standards. Do not relabel every attraction in that category as a certified historic site just to inflate the coverage count. The statewide rollout ledger is `docs/historic-sites/STATEWIDE_AUTHORITY_ROLLOUT.md`.

## Refresh policy

When a historic operator updates hours, admissions, building access, major construction or accessibility rules, verify the relevant destination before changing the review timestamp. Audit during major visitor-season changes and after operator alerts. Maintain permanent historic dates separately from perishable visitor operational notes.
