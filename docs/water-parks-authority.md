# Texas water-park authority: editorial contract and outstanding census work

Updated 2026-10-17. Work is **not** considered production verified until the repo's canonical validator, merge gate and bounded production smoke pass.

## Current implementation

- Canonical public hub: `/explore/water-parks`; one park page at `/explore/water-parks/$slug` per physical venue.
- Initial operator-backed registry: 94 separate facilities in `src/data/texas-water-parks.ts`.
- Settings: indoor, outdoor, mixed indoor/outdoor. Access: day park, city-run, hotel/resort, campground and inflatable lake park.
- Every record has a named venue, town, region, setting, admission policy description, a venue-specific editorial note, source URL, review date, and county where the physical county was verified.
- Directory links to internal Explore/trip planner/city and county guides. Primary and emergency Explore sitemaps enumerate only specifically certified authority-ready park pages; the statewide hub includes the full research registry.
- For availability/prices, point to the park's current operator calendar. We intentionally avoid frozen rates and “open now” representations.

## Standards for fully authoritative individual pages

Each park must be researched and independently verified beyond this launch-scale registry:
1. Confirm the **exact physical facility**, city, county, mailing/entrance address, accessibility, any restricted entry or age policy, ride/feature inventory, current operating season and admission classes from the operator or responsible city.
2. Check the independent visitor perspective (families, accessibility, parking, ride restrictions, road conditions, kid suitability). Do not invent opinions or claim visitor experience without evidence.
3. Record dates checked for any seasonal hours; stale calendars or paid closed parks must not present as visitable. Distinguish “season over” from “permanently closed.”
4. Add **exact-location licensed/permission-cleared original imagery** before promising photos. Never fill multiple park guides with the same generic stock hero or an unrelated location. Maintain explicit asset credit and provenance.
5. Cross-link the actual county guide, city and 2–5 relevant nearby attraction pages (not just hub links); reverse-link where appropriate. Compare direct regional alternatives.
6. Validate ticket prices only if recently first-party verified and date-stamped. A purchase link must remain operator-direct unless a real approved affiliate relationship and disclosure exists.
7. Validate FAQ answers against primary sources and real visitor questions. Do not mass-produce identical boilerplate FAQ markup.
8. Confirm structured data, canonical links, accessibility, machine discovery, responsive layout, and no duplicate topic pages. No search indexing for placeholders.

## New source checks

- **El Paso:** Destination El Paso confirms four distinct city parks (Camp Cohen, Chapoteo, Lost Kingdom and Oasis), each included as an individual facility.
- **Schlitterbahn Galveston:** In 2026, the operator moved to Enchanted Parks. The official park page and 2027 Six Flags pass warnings use the current owner, not the outdated Six Flags route.
- **San Antonio:** Hurricane Harbor at Six Flags Fiesta Texas is distinct from Aquatica, and the obsolete White Water Bay label is only a former name.
- **Lewisville:** The Thrive indoor aquatics facility and Sun Valley outdoor water park are two different physical locations.

## Research queue — no false operating claims

- **Hurricane Alley, Corpus Christi:** Permanently closed in February 2026 per the park operator and local reporting. Exclude from active visitor directory; optional historical article should be clearly labeled closed.
- **Epic Waters, Grand Prairie:** Operator reports temporary closure October 13–29, 2026, with planned reopening October 30 at 10 a.m. The visitor guide reflects the interruption. Not a permanent closure.
- **The WaterPark at the Villages, Flint:** Conflicting 2026 closure and resort-site information. Obtain recent direct operator confirmation before listing as open.
- **Splash Kingdom Wild West, Hudson Oaks:** Appears in one operator FAQ list of operating hours, but the operator's 2026 season and contact lists omit it. Recheck its actual operating status rather than assuming a fourth active branch.
- **Rodeo Rapids, Pecos:** Announced/developing; do not publish as open before actual operating confirmation.
- **Spoonbill Bay / Spoonbill Lagoon, Mustang Island:** Proposed development, not established public admission. Do not publish as open.

## October 17 municipal expansion sources

- Pampa H2O: Pampa Economic Development Corporation (venue features); City of Pampa aquatic-center budget; Texas Department of Insurance current ride-sticker register.
- Alice Natatorium: Corpus Christi YMCA operator visitor information and City of Alice budget; the outdoor waterpark and year-round indoor pool have separate opening patterns.
- El Campo Aquatic Center: direct city-run RecDesk facility page and municipal parks master plan confirm the 85-foot indoor slide and leisure pool.
- Mesquite City Lake Aquatic Center: current City of Mesquite aquatic-center visitor page and TDI waterslide register confirm municipal aquatic facility and seasonal admission.

- **DeSoto Moseley:** City's 2026 waterpark-style pool page confirms two slides, zero-depth entry and seasonal public access; summer 2027 reopening not yet announced.
- **Edinburg:** City's current aquatics page confirms municipal waterpark, Pirates Cove, 125-foot slide and April–September operation.
- **Midland Doug Russell:** City's 2026 public pool calendar confirms seasonal operating status and 2026 capital-program documents confirm waterslide tower repairs; do not assert every ride operated all summer.

## Remaining statewide completeness work

- Systematically check **every municipality/county aquatic department**; scope includes multi-slide city pools, wave pools, action rivers, and branded family water parks but excludes standalone single-feature splash pads and ordinary lap pools.
- Audit the **hotel/resort** and campground market for substantive named water parks, not merely pools with one decorative slide.
- Research public floating obstacle-course parks and temporary seasonal operators separately, with weather, water conditions, capacity and safety.
- Confirm individual water-park site addresses and county assignments in ambiguous multijurisdiction cities before adding county canonical links.
- Run a check against TDI amusement ride registration where relevant, tourism bureau listings, city park calendars and operator directories. TDI listing alone does not confirm present operation.
- Expand the initial collection only with first-party sources and documented visit eligibility. Never present the current 94 as an exhaustive statewide census.
- After canonical validation and required checks, use only a bounded smoke of the directory and representative indoor/outdoor/resort/municipal pages, not another sitewide crawl.

## Startup bundle protection

The existing casino-guide source dataset was also moved from eager imports to asynchronous route loaders, while preserving casino page content, hotel slots and existing SEO schemas. This recovers startup bundle headroom without increasing the performance budget; protected CI must confirm the improvement.

## Initial-client performance guard

The water-park index and venue files define metadata through asynchronous loader imports from `src/data/texas-water-parks-seo.ts`, avoiding eager SEO and large collection data on the initial client bundle. The primary and fallback sitemap also use async park registry loading. Preserve structured data, canonical and noindex gates without increasing bundle limits.

## Indexing rule

All newly researched park rows default to **not authority-ready**. The page route uses `noindex, follow` until per-location data, official access/operations, licensed imagery, individual questions, internal links and live visual QA meet the acceptance criteria. Neither primary nor fallback sitemap should include uncertified pages. The useful statewide directory itself is indexable; this prevents mass publication of thin templated guides.

## Known implementation limits

The 94 generated guides are the *initial source-backed editorial layer*, not finished deep first-hand reviews. Specific ride inventories, exact live ticket rates, accessible routes, rights-cleared venue imagery, corroborated family FAQs, all-county reciprocal links, and a truly exhaustive statewide census are **not yet certified**. This distinction must not be lost in publication or product messaging.
