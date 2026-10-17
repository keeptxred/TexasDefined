# Texas water-park authority: editorial contract and outstanding census work

Updated 2026-10-17. Work is **not** considered production verified until the repo's canonical validator, merge gate and bounded production smoke pass.

## Current implementation

- Canonical public hub: `/explore/water-parks`; one park page at `/explore/water-parks/$slug` per physical venue.
- Initial operator-backed registry: 124 separate facilities in `src/data/texas-water-parks.ts`.
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

- **Pharr Aquatic Center:** City of Pharr park directory confirms a seasonal lazy river, slides, children's water playscape and public access at 1000 S Fir Street. Its current city facilities directory lists the Natatorium at a separate address, so only outdoor waterpark features count on this row.
- **Garland Holford Aquatic Center:** current City of Garland venue page confirms two waterslides and current channel, and its dated August 2026 update confirms the summer season ended August 9. Distinct from Surf & Swim and the closed Bradfield facility.
- **Big Spring Russ McEwen:** city facility and 2026 ticket pages confirm two water slides, lazy river, family leisure pool and seasonal admission at 911 Golf Course Road.

## October 17 supplemental operating park census

- Splash Shack, Cedar Park: independent ticketed indoor children’s waterpark (adult-only admission barred); 2026 operating schedule and rules on the operator website.
- Forest Oasis, The Woodlands Resort: non-overnight day passes subject to availability, with year-round pools but seasonally closed slides and unheated lazy river.
- Lagoonfest Texas, Texas City: 2026 Aqua Course and bumper boats inside limited-capacity advance admission; not a traditional slide park.
- Angel Lagoon, Dayton: paid floating course; water slide is operator-labelled **coming soon**, not open. Confirm entrance ZIP before any more specific address publishing.
- This batch adds **three operator-linked, answer-first FAQs per park**, shown with direct source links. It does not promote any page to index-ready or assert photo rights.

## Remaining statewide completeness work

- Systematically check **every municipality/county aquatic department**; scope includes multi-slide city pools, wave pools, action rivers, and branded family water parks but excludes standalone single-feature splash pads and ordinary lap pools.
- Audit the **hotel/resort** and campground market for substantive named water parks, not merely pools with one decorative slide.
- Research public floating obstacle-course parks and temporary seasonal operators separately, with weather, water conditions, capacity and safety.
- Confirm individual water-park site addresses and county assignments in ambiguous multijurisdiction cities before adding county canonical links.
- Run a check against TDI amusement ride registration where relevant, tourism bureau listings, city park calendars and operator directories. TDI listing alone does not confirm present operation.
- Expand the initial collection only with first-party sources and documented visit eligibility. Never present the current 124 as an exhaustive statewide census.
- After canonical validation and required checks, use only a bounded smoke of the directory and representative indoor/outdoor/resort/municipal pages, not another sitewide crawl.

## Startup bundle protection

The existing casino-guide source dataset was also moved from eager imports to asynchronous route loaders, while preserving casino page content, hotel slots and existing SEO schemas. This recovers startup bundle headroom without increasing the performance budget; protected CI must confirm the improvement.

## Initial-client performance guard

The water-park index and venue files define metadata through asynchronous loader imports from `src/data/texas-water-parks-seo.ts`, avoiding eager SEO and large collection data on the initial client bundle. The primary and fallback sitemap also use async park registry loading. Preserve structured data, canonical and noindex gates without increasing bundle limits.

## Indexing rule

All newly researched park rows default to **not authority-ready**. The page route uses `noindex, follow` until per-location data, official access/operations, licensed imagery, individual questions, internal links and live visual QA meet the acceptance criteria. Neither primary nor fallback sitemap should include uncertified pages. The useful statewide directory itself is indexable; this prevents mass publication of thin templated guides.

## Known implementation limits

The 124 generated guides are the *initial source-backed editorial layer*, not finished deep first-hand reviews. Specific ride inventories, exact live ticket rates, accessible routes, rights-cleared venue imagery, corroborated family FAQs, all-county reciprocal links, and a truly exhaustive statewide census are **not yet certified**. This distinction must not be lost in publication or product messaging.

## Dallas municipality verification tranche — October 17, 2026

Dallas Aquatics' current municipal 2026 schedule confirms nine distinct outdoor multi-feature aquatic centers **in addition to Bahama Beach**: The Cove at Crawford (375 S. Prairie Creek), The Cove at Fretz (14778 Hillcrest), The Cove at Samuell Grand (3201 Samuell Blvd.), Bachman Aquatic Center (2750 Bachman Dr.), Kidd Springs (807 W. Canty), Lake Highlands North (9400 Church Rd.), Exline (2530 Eugene), Harry Stone (2403 Millmar) and Tietze (6115 Llano).

Each added record has an official single-venue page, venue address, precise 2026 closed weekday, season end, three verified feature highlights and visitor questions linked to that official venue. Exline and Harry Stone are **neighborhood-scale aquatic centers**, not destination resorts, and their optional ride features must not be represented as guaranteed daily operation. These nine remain noindex until the venue-specific photographic and editorial gate is met.

Operator collection and pass sources:
- https://www.dallasaquatics.org/178/The-Cove-Aquatic-Centers
- https://www.dallasaquatics.org/195/2601/Community-Aquatic-Centers
- https://www.dallasaquatics.org/196/Neighborhood-Aquatic-Centers
- https://dallasaquatics.org/222/Season-Passes

**Do not add Waterloo Adventures as currently operating:** the available trip-planning listing documents obstacle-course closure for 2024 due to Lake Travis water levels, while recent visitor information suggests continued closure. Its operator's undated legacy booking page alone does not substantiate 2026 public access. Keep status in research queue pending direct confirmation. A sprayground without slides or a substantial water-play complex is not a separate water park.

## Seven-venue operator verification batch — October 17, 2026

Recorded after the 110-venue Dallas work in a separate follow-up branch, without restarting its protected checks. New records: Burger's Lake (Fort Worth), Thompson Park Pool (Amarillo), Adamson Lagoon (College Station), Calypso Cove (Baytown), Champions Club (Southlake, indoor), William M. McDonald YMCA (Fort Worth) and Lions Junction Family Water Park (Temple).

Each lists a directly responsible operator or municipal source, a verified venue address, specific access/season caveats and first-party-linked visitor questions. The Temple source verifies actual 2026 operation but not individual ride inventory; no ride claims are made. The McDonald YMCA operator does not guarantee public nonmember walk-in entry. Burger's Lake sells Great White slide access separately; annual park admission must not be represented as including those rides. The operator confirms Southlake indoor slides have different hours from regular fitness/pool hours. The City of College Station's 2026 venue listing confirms only *two existing* Adamson Lagoon waterslides, not proposed future replacements. All seven stay noindex until the separate authoritative photo/depth gate passes.

Primary sources are stored per record; legal image rights are **not** implied by first-party website photos. Do not copy operators' photos without their license.


## October 17 Irving municipal water-park census

Source-audited three distinct City of Irving outdoor family aquatic centers, all established and seasonally closed as of October 2026: Cimarron Family Aquatic Center (199 Red River Trail), West Irving Aquatic Center (3701 Conflans Road), and Lee Aquatic Park (3000 Pamela Drive). All have City of Irving facility pages with water slides and water playgrounds, city-specified ride height rules and site-specific visitor FAQs. Lee extended operations into September 2026, but that promotion has expired. Sources: https://irvingtx.gov/cimarron-family-aquatic-center , https://irvingtx.gov/west-irving-aquatic-center , https://irvingtx.gov/lee-aquatic-park . Do **not** list Senter Park's redeveloped indoor aquatic center as currently operating merely because construction is scheduled to finish in fall 2026; wait for the city's public opening statement. Nor count ordinary lap-only facilities or splash-only parks as full water parks. The new three remain `noindex` until location-correct image rights and editorial acceptance pass.


## Canonical county page water-park discovery

All county entity pages automatically list qualifying water parks whose assigned `county` matches the canonical county slug, using the same central reviewed registry and stable `/explore/water-parks/{slug}` URLs. The county data loader asynchronously imports the registry only for actual county routes and serializes a reduced summary; it does not ship the 120-record dataset to every county browser page. The county section is suppressed when a county has no source-linked facilities. It intentionally labels resort/day-entry constraints and seasonal status conservatively, with links to operator-sourced visitor guides and the statewide comparison hub. These reciprocal links do not promote unfinished per-venue research guides to indexable authority pages.


## October 17 municipal aquatics expansion — four source-reviewed parks

Four additional operating (but mostly seasonal) municipal family water-play sites are documented: San Angelo Municipal Pool (two water slides; June 22, 2026 reopening; season ended August), Bill Witt Aquatic Center in Corpus Christi (two large slides, interactive beach-entry leisure pool; the city advertises free public swim and a summer-only schedule), Bartholomew Pool in Austin (activity pool, lily pads, wading pool, slides; slides and recreation pools CLOSED Oct 1 2026–Mar 12 2027 despite year-round lap swimming), and Flower Mound Community Activity Center (outdoor water park roughly Memorial Day–Labor Day, separately scheduled indoor play-slide sessions). Each has exact municipal venue address, first-party source, distinct content, >=3 activity highlights and three operator-linked answers. All remain `authorityReady=false` by default: they do NOT enter the water-park sitemap or receive search index approval until licensed exact-location imagery and full editorial acceptance. Venue sources: https://www.sanangelo.gov/facilities/facility/details/Municipal-Pool-4 ; https://www.corpuschristitx.gov/department-directory/parks-and-recreation/parks-and-facilities/pools/ ; https://www.austintexas.gov/parks/locations/bartholomew-pool ; https://www.flower-mound.com/cachours .


## Staged municipal expansion — Carrollton and Odessa

Three researched seasonal outdoor family aquatic sites added from official city and visitor-office sources: Carrollton Rosemeade Rainforest, 1334 E Rosemeade Parkway (separate from the 1330 recreation center), and Odessa Sherwood and Woodson Family Aquatic Centers. The Carrollton city lists the 200-foot lazy river, 600-gallon bucket and two 22-foot slides, with 2026 closure/reopening records and party policies. City of Odessa confirms 2026 schedules, admissions and 2026 seasons (Sherwood ended Aug 2, Woodson ended Sep 7); Odessa tourism distinguishes waterslide attractions at both. Woodson is missing map link on purpose due conflicting first-party street addresses 1020 Martin Luther King Jr versus 1020 E Murphy. No new pages indexable without image/photo-rights reviews, 2027 operating dates or editorial acceptance. This staged branch shares a 124-record base with separately running Oct 17 waterpark PRs, so future reconciliation MUST preserve five flagship depth dossiers and three new North Texas records before merge; combined future census is at least 130, not 127.
