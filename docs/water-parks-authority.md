# Texas water-park authority: editorial contract and outstanding census work

Updated 2026-10-17. Work is **not** considered production verified until the repo's canonical validator, merge gate and bounded production smoke pass.

## October 17 reconciliation — 124 individual facility pages

The earlier 117-record branch was superseded after the required Merge Gate demonstrated a real concurrency conflict: main had independently expanded to 124 venues. The follow-up branch is based on main and preserves all seven recently added records (three Irving facilities, San Angelo Municipal Pool, Bill Witt Corpus Christi, Bartholomew Austin and Flower Mound CAC), as well as the full per-venue research from the 117-record branch. The source validator now requires every known venue to carry an actual visitor address, three individual highlights, two source-linked questions, and rejects uncredited optional media.

**Venue photographs:** A first group of ten exact-location historical pictures has been matched to Commons file descriptions with documented reusable licenses (or public-domain dedication). Each appears with its original capture year, photographer, source, license link, and a warning that the past photo is not evidence of present attraction operations. Other records remain intentionally without an image; an unrelated generic photo does not satisfy photo standards. These ten are visual improvements, **not** sufficient evidence of current photo coverage or authority-certified indexability.

**Still incomplete:** full editorial fact review, current-source HTTP verification, independent visitor perspective, complete nearby-attraction linking, 114 unphotographed facilities, bounded live QA, and confirmation that 124 is exhaustive statewide coverage. All individual routes remain noindex until their full per-site media/accuracy/editorial gate is satisfied. Keep issue #5065 open.

### Additional park-specific authority improvements

- Ten individually licensed Wikimedia Commons historical venue photographs now render with photographer credit, source, license, and year; an old picture is explicitly not evidence of today's slides or operating status.
- Galveston County and Bexar County waterparks have curated links to existing independent attraction authority pages (24 links for eight waterparks), alongside the existing verified county-page reverse links.
- Schema.org TouristAttraction structured data can use each reviewed street address, city, and ZIP where supplied, and photo-bearing records have a credited ImageObject. Do not infer ZIP where source conflict is unresolved (Angel Lagoon, Dayton).
- The canonical built-Worker smoke includes a researched Schlitterbahn page and a recently added Irving city waterpark, verifying that real individual route content and photo attribution render.
- No park has been editorially marked authorityReady or added to certified sitemaps merely for meeting these technical contracts.

## Current implementation

- Canonical public hub: `/explore/water-parks`; one park page at `/explore/water-parks/$slug` per physical venue.
- Initial operator-backed registry: 131 separate facilities in `src/data/texas-water-parks.ts`.
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


## October 17 research expansion — Bryan, Odessa, Victoria (four venues)

The Bryan Aquatic Center has a city-confirmed double-flume waterslide and zero-entry recreational area, but year-round heated-pool lap swimming must not be confused with seasonal water-slide access. Two separate Odessa sites, Sherwood and Woodson, have official 2026 admission/season records; the Odessa tourism bureau confirms Sherwood's slides, lazy river and shallow splash attractions, while Woodson's public-slide and diving descriptions are supported by city planning and local destination references. These two centers have different end-of-summer dates and different normal closure days. Victoria's Barbara Bauer Briggs Family YMCA city-partnered outdoor pool has slides, spray play and member/community session restrictions; the YMCA identifies the main pool as closed after the summer even though it may offer separately scheduled off-season activities or rentals.

New official/source references:
- https://www.bryantx.gov/parks-and-recreation/pools-aquatic-programs/
- https://odessa-tx.gov/pools
- https://discoverodessa.org/10-spots-to-cool-off-this-summer/
- https://ymcagoldencrescent.org/barbara-bauer-briggs-family/programs/aquatics/
- https://www.victoriatx.gov/794/YMCA-Open-Swim-Times

Each record has a location, specific features, three cited visitor questions, honest seasonal status and a link to its responsible operator. Venue hero photos and full editorial depth are not yet licensed or approved; these four must remain `noindex` under the unchanged `authorityReady` gate. Ordinary standalone splash pads and lap-only pools were not added.


## October 17 municipal authority census — Carrollton and Arlington (three venues)

Separate from the Bryan/Odessa/Victoria batch, the following verified major municipal family waterparks were added to the same 131-park registry: Carrollton's Rosemeade Rainforest (200-foot lazy river, 600-gallon tipping bucket and two tall main-pool slides), Arlington's Randol Mill Family Aquatic Center (vortex pools, current channel and slides), and Arlington's Bad Königshofen Family Aquatic Center (German sister-city design, two water slides, spray pad and lap/diving pools). Public operating seasons ended by September 7, 2026; no October 2026 public admission is asserted. Each facility includes an exact address, 3 distinctive visitor facilities and 3 official-source linked visitor answers. Governing municipal pages:
- https://www.cityofcarrollton.com/departments/departments-g-p/parks-recreation/aquatics/rosemeade-rainforest
- https://www.arlingtontx.gov/Parks-Places/Facilities/Aquatics/Pools/Randol-Mill-Family-Aquatic-Center
- https://www.arlingtontx.gov/Parks-Places/Facilities/Aquatics/Pools/Bad-Konigshofen-Family-Aquatic-Center

Arlington's cooler policy is a citywide current aquatics rule and must be cited separately from individual facility features. Carrollton has accessible water-entry chairs and an explicit policy permitting inspected coolers. All three retain the current noindex authority gate pending exact-location image licensing and full editorial review. Do not count Carrollton's two separate splash-only parks as additional water parks.

## October 17, 2026 — Sherman, Cedar Hill and Farmers Branch family waterparks

The following three distinct city-operated outdoor aquatic venues were added as a source-checked research batch to the existing 131-venue census (now 134). Each has an address, three venue-specific amenities and three first-party-sourced FAQs. None is classified authority-ready or added to the individual-guide indexable sitemap while venue-specific photo rights and long-form editorial acceptance remain incomplete.

- **Sherman — The Splash Family Aquatic Center**, 1121 W. Taylor St.: two two-story slides, drop slide, 1,200-foot current channel and younger-child splash area. Official summer 2026 closing day August 9. [Sherman operator](https://shermanparks.com/the-splash-pool/), [admission](https://shermanparks.com/the-splash-pool/admission-and-passes/) and [private rental rules](https://shermanparks.com/the-splash-pool/private-rental-party-cabana/).
- **Cedar Hill — The Lagoon Aquatic Center**, 631 Somerset Drive: nearly 10,000 sq ft, lazy river, three-turn slide, separate lap pool; 2026 summer season May 30–August 9 with later pop-up days. Outside food and coolers generally prohibited; all attending guests need a ticket. [City facility](https://www.cedarhilltx.com/3029/AquaticsThe-Lagoon), [calendar](https://www.cedarhilltx.com/3033/Season-Calendar), [rules](https://www.cedarhilltx.com/3039/Pool-Rules).
- **Farmers Branch — Frog Pond Water Park**, 14032 Heartside Place: seasonal outdoor lazy river, activity and lagoon pools, water slides and concession/rental areas; independent from the city year-round natatorium. The publicly accessible city park landing page has navigation but some details are client-side; backstop sources are [city aquatics](https://www.farmersbranchtx.gov/aquatics), [Frog Pond operator](https://www.farmersbranchtx.gov/frog-pond-water-park), [Texas Highways 2026](https://texashighways.com/wp-content/uploads/2026/01/Travel-Guide-2026.pdf), and [official rental rules](https://content.civicplus.com/api/assets/tx-farmersbranch/5a20944b-b794-43b2-b4fc-2bff49ca76bc).

Exclude ordinary splash pads without significant waterpark features. Do not call any of these public outdoor slides open in October 2026, do not borrow unlicensed operator photos, and do not lower the existing readiness gate.


## October 17, 2026 — additional indoor/outdoor recreation center waterparks

Two separate DFW city recreation centers (not duplicate indoor and outdoor park locations) were added to the same registry, increasing coverage from 134 to **136**. Both have three operator-source visitor FAQs, venue-specific amenities and exact street addresses. Neither is deemed indexable or certified authority-ready without a licensed exact-location image and detailed editorial verification.

- **Euless Family Life Aquatic Park and Natatorium:** 300 W Midway Dr., Euless TX. A seasonal 545-ft lazy river, large slides and interactive water playground share an address with an indoor year-round natatorium with a separate 48-inch-minimum play slide. Distinguish each zone's access/calendar. Sources: [city family center](https://www.eulesstx.gov/departments/parks-and-community-services/euless-family-life-center), [outdoor park](https://www.eulesstx.gov/Home/Components/FacilityDirectory/FacilityDirectory/72/453), [indoor natatorium](https://www.eulesstx.gov/departments/parks-and-community-services/aquatics/natatorium).
- **Coppell The CORE Aquatics:** 234 E Parkway Blvd, Coppell TX. Seasonal outdoor pools, 2 slides, splash/lily-pad zones; year-round indoor pool and slide on weekend open-swim sessions; operator confirms summer 2026 outdoor season over. 2026 rules use different indoor/outdoor minimum heights (42/48 inches). Sources: [city aquatic programs](https://www.coppelltx.gov/779/Aquatics), [CORE facility](https://coppelltx.gov/440/The-CORE), [January 2026 handbook](https://coppelltx.gov/DocumentCenter/View/4034/The-CORE---Pass-Holder-Handbook---January-2026?bidId=).

## October 17 follow-up — licensed Round Rock and Midland images

- **Kalahari Round Rock:** Wikimedia Commons `Kalahari Resort Hotel Round Rock Texas 2025.jpg`; photographer **Larry D. Moore**, 7 December 2025, **CC BY 4.0**. The photo depicts the Round Rock resort exterior and **not** indoor slides. File record: https://commons.wikimedia.org/wiki/File:Kalahari_Resort_Hotel_Round_Rock_Texas_2025.jpg ; license: https://creativecommons.org/licenses/by/4.0/ . The child guide links both on-page and explicitly identifies it as a historical photograph. Kalahari's official day-pass and outdoor-waterpark pages additionally verify the current no-cooler policy, exemptions procedure, and outdoor access route; two independently sourced answers were added without claiming live attraction availability.
- **Doug Russell Aquatic Center, Midland:** Commons `Doug Russell Pool Midland Texas.jpg`; photographer **Texas.pics**, 30 March 2014, **CC BY-SA 3.0**. Its broad photo depicts the exact named Midland public pool and does not prove the 2026 water slide lineup. File: https://commons.wikimedia.org/wiki/File:Doug_Russell_Pool_Midland_Texas.jpg ; license: https://creativecommons.org/licenses/by-sa/3.0/ . The child guide now visibly attributes the old exact-site pool image.
- **Result:** 136 separately researched venue records, 12 with licensed venue-specific images, 124 with no approved photo. None is yet marked `authorityReady`; do not certify the whole corpus or include these child URLs in the indexable sitemap. Original-source checking, independent visitor assessment, rights-safe imagery and live two-viewport visual QA remain outstanding.
- **Verification:** Added exactly three built-Worker SSR contract targets for Kalahari policies/credit and Midland credit; retain the normal protected Merge Gate and production workflow. These are staging tests, not a substitute for independent live screenshots.

## Port Aransas resort-waterpark census completion — October 17

**Port Royal Ocean Resort Water Slides** now has its own `/explore/water-parks/port-royal-ocean-resort-pools` individual visitor guide as entry #137. Port Royal's official guest-amenity pages document a lagoon-style resort pool, four seasonal slides, smaller children's water play and a heated lap pool at **6317 State Highway 361, Port Aransas, TX 78373**. Texas TDLR's public project record also confirms the property lies in **Nueces County** (https://www.tdlr.texas.gov/TABS/Projects/TABS2025012872). Operator sources: https://port-royal.com/resort-amenities/ ; https://port-royal.com/contact/ ; https://port-royal.com/blog/things-to-do-at-port-royal-ocean-resort/ .

**Access is restricted:** the slides and pools are offered as resort guest amenities, not a verified non-guest day-ticket waterpark. The old published 48-inch rider minimum is marked historical; do not infer current slide or pool hours from off-season operation. 5 facility-specific highlights and four source-linked visitor questions distinguish this guide. No image has been approved, and it remains **noindex** until exact-site licensed media, source-date and independent editorial acceptance, and live responsive QA are complete. County-page reverse links are generated by the existing county data linkage. The census is still not claimed to be exhaustive statewide.
