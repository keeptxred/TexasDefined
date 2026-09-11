# Sports venue content quality audit — 2026-09-10

Scope: all 84 currently verified TexasDefined sports-venue guides, with Phase 1D remediation focused on content/data rather than the parallel venue-layout work.

## Measured duplication and structural causes

- **84/84 venue pages** still expose the shared `Plan the trip` block from `src/routes/sports-venue.$slug.tsx`, including the identical heading **“Make the venue part of the weekend”** and the identical card labels **“Why people travel,” “Best trip pattern,” and “Before you go.”** The body copy comes from only 12 tag-based `venueProfile()` templates. This block remains a global layout concern and is intentionally not redesigned in Phase 1D.
- **84/84 venue records** are shaped by `SportsVenueEnrichment`, which currently requires `stayAndEat` and `nearby` strings. That schema encourages every record to produce lodging/weekend copy even when there is no venue-specific guidance worth publishing. Phase 1D does not break that shared schema; the quality-profile layers separate durable visitor facts, editorial history and source-review metadata so a later schema/layout migration can remove mandatory filler safely.
- The two knowledge-graph seed files (`major-sports-venues.ts` and `sports-venues-tier2.ts`) synthesize every base venue description from a small set of category templates plus a common wrapper sentence. Before Phase 1D, only **15 of 84** venue descriptions had venue-specific server editorial overrides. The initial batch raised explicit editorial coverage to **18 of 84**, wave 2 to **21 of 84**, wave 3 to **26 of 84**, and wave 4 adds five previously missing descriptions while retaining the existing COTA, Moody Center and Q2 Stadium descriptions. Explicit editorial coverage is now **31 of 84**, leaving **53** candidates for future record-by-record remediation.
- **84/84 venue quick-answer components** formerly included `TexasExplainedContextLinks surface="sports"`, regardless of whether those links were meaningfully related to the venue. Phase 1D removed that forced link injection.
- Because `verifiedAt` is mandatory in the enrichment schema, the quick-answer surface had framed source-review metadata as **“How current is this [venue] visitor guide?”** The review date is now displayed as source metadata, not as a consumer FAQ or FAQ-schema question.
- The September 5 GSC triage contains **17** `/sports-venue/*` URLs marked `IMPROVE`. Phase 1D now gives all 17 a separated remediation profile, and CI derives that list directly from `ops/seo/gsc-discovered-2026-09-05-urls.tsv` so future regressions fail closed.

## Initial batch remediated

### Amon G. Carter Stadium

- Corrected official capacity from the old approximate 40,000 wording to **46,000**.
- Records the official **2850 Stadium Drive, Fort Worth, TX 76109** address, natural-grass Moncrief Field, TCU football/Big 12 context, current accessibility guidance and current clear-bag/entry guidance in the separated quality profile.
- Replaced generic arrival copy with current TCU football guidance, including the current 90-minute gate-opening guidance while explicitly treating it as changeable game-day policy.
- Replaced generic Fort Worth weekend copy with TCU-campus-specific geography and removed the implication that unrelated Tarrant County attractions are venue-adjacent.

### Gerald J. Ford Stadium

- Added verified **33,200** capacity and **2000** opening year.
- Replaced season-specific history with durable venue history: the 2024 Garry Weber End Zone Complex and the natural-grass field installed in 2025.
- Records SMU/ACC context, current accessibility and clear-bag/security policy in the separated quality profile.
- Replaced generic Dallas lodging copy with campus/parking constraints, including SMU's warning about resident-only parking near the campus.

### Globe Life Field

- Added verified **approximately 40,300** capacity and **2020** opening year.
- Records the official **734 Stadium Drive, Arlington, TX 76011** address, Texas Rangers/MLB context, and Shaw Sports Turf B1K synthetic playing surface.
- Replaced generic entertainment-district weekend language with event-specific cashless parking/open-time guidance, accessibility/bag-policy source links and defensible immediate context: AT&T Stadium, Choctaw Stadium and Texas Live!.

### American Airlines Center

- Added verified **2001** opening year and event configuration capacities of **20,000 for basketball / 18,532 for hockey** from AAC's own venue description.
- Records the official **2500 Victory Avenue, Dallas, TX 75219** address, Mavericks/NBA and Stars/NHL context, accessibility and current bag/security policy.
- Replaced generic downtown-weekend copy with Victory Station rail access, current arena parking operations and Victory Park-specific context.

### Texas Motor Speedway

- Added verified **1997** opening year, official **3545 Lone Star Circle, Fort Worth, TX 76177** address and current track/property facts.
- Replaced generic “race weekend” filler with the operationally relevant scale of the 1.5-mile oval / 1,500-acre property, route-specific parking, camping and current race-day arrival guidance.
- Explicitly avoids presenting central Fort Worth attractions as if they are adjacent to the speedway.

## Second remediation wave

### DKR–Texas Memorial Stadium

- Replaced the approximate “more than 100,000” capacity with Texas Athletics' official **100,119** figure and records the **2139 San Jacinto Blvd., Austin, TX 78712** physical address.
- Records the current FieldTurf surface, Texas football/SEC context, current clear-bag policy, ADA guidance and the two-hours-before-kickoff general gate guidance as changeable event-day policy.
- Corrects the planning source to the canonical Texas Athletics DKR facility page instead of relying on the misleading `/facilities/bobcat-stadium/1` CMS alias.
- Replaces generic Austin weekend copy with campus-specific parking, gate assignment and central-Austin geography.

### Dell Diamond

- Records **8,631 permanent seats plus roughly 3,000 outfield-lawn capacity**, opened **2000**, the official **3400 E. Palm Valley Blvd., Round Rock, TX 78665** address, TifTuf Bermuda grass, Round Rock Express and Pacific Coast League/Texas Rangers affiliate context.
- Adds current official accessible-parking/ADA-entry and clear-bag guidance.
- Treats the approximately one-hour standard game gate opening as a changeable Express policy and avoids freezing event-specific parking prices into evergreen copy.
- Replaces generic Austin-area sports-weekend language with the actual east-Round-Rock/US 79 visitor context.

### Foster Pavilion

- Records the **January 2024** opening, **7,000+** capacity including roughly 500 standing-room spaces, Baylor men's and women's basketball and Big 12 context.
- Separates current public/BBF parking, accessible shuttle, clear-bag, no-re-entry and 60-minute gate guidance from durable venue history.
- Replaces generic Waco weekend language with the pavilion's actual Brazos River / Baylor campus / downtown-edge geography.

## Third remediation wave

### Baylor Ballpark / Magnolia Field

- Replaces season-count filler with the durable construction timeline: first Baylor games in **1999**, completion for the **2000** season and dedication in **2001**.
- Records the official **5,000** capacity, Baylor baseball/Big 12 role, four main-grandstand entrances and an additional accessibility ramp.
- Incorporates the **January 2026 Magnolia Field** naming as a current venue-identity fact while keeping the canonical TexasDefined route stable.
- Re-centers visitor context on the Turner Riverfront Athletic Complex and Brazos River rather than generic Waco-weekend copy, and avoids turning ticket-office hours into an invented gate-opening claim.

### Credit Union of Texas Event Center

- Records the official **200 E. Stacy Road #1350, Allen, TX 75002** address and **7,000+** capacity.
- Separates the City of Allen-owned arena's durable identity and Allen Americans/ECHL role from changeable event policies.
- Adds current South Parking Garage instructions, the explicit prohibition on using surrounding uncovered retail lots for event parking, assistive-listening availability, event drop-off context and the typical one-hour doors-open pattern.
- Treats the clear-bag rule as event-sensitive because concerts and other promoters can impose stricter rules.

### Reed Arena

- Records the official **730 Olsen Blvd., College Station, TX 77843** address, **12,989** capacity and **fall 1998** opening.
- Captures the arena's three home programs—Texas A&M men's basketball, women's basketball and volleyball—plus its SEC context and commencement/concert role.
- Adds the current 12-1-1 clear-bag requirement and Lot 102 ADA parking context while deliberately avoiding stale parking prices or assuming ordinary campus permit rules apply to every event.
- Replaces generic Aggieland-weekend language with west-campus access and same-campus sports relationships.

### Whataburger Field

- Records the official **734 E. Port Avenue, Corpus Christi, TX 78401** address, **2005** opening, Hooks/Texas League/Houston Astros affiliation and the venue's distinct capacity configurations: **5,391 stadium seats**, **288 suite-level seats**, and up to **10,400** for field-and-concourse events.
- Replaces generic Gulf Coast copy with the ballpark's actual Port of Corpus Christi cotton-warehouse history, industrial design cues and harbor-channel setting.
- Adds current accessible seating and ADA parking guidance, current bag rules and Hooks-game gate timing while keeping special-event timing explicitly event-controlled.
- Avoids freezing current parking prices into evergreen content.

### Memorial Park Golf Course

- Records the official **1001 E Memorial Loop Drive, Houston, TX 77007** address and the course's public municipal identity.
- Replaces generic championship-golf language with the durable progression from the Camp Logan-era nine-hole course to John Bredemus' **1936** redesign, historic Houston Open hosting and the major renovation preceding the tournament's **2020** return.
- Keeps public tee-time planning, paid Memorial Park parking and the Tuesday maintenance closure separate from tournament-week transportation logistics.
- Avoids resort-style framing for a City of Houston public course inside Memorial Park.

## Fourth remediation wave — GSC sports `IMPROVE` completion

### Circuit of The Americas

- Records the official **9201 Circuit of The Americas Blvd., Austin, TX 78617** address, **2012** opening era and the **3.41-mile, 20-turn** purpose-built circuit.
- Keeps pre-purchased parking and lot-specific approach routes event-controlled and separates the southeast-Austin circuit from downtown trip assumptions.
- Retains the already-specific COTA editorial description rather than duplicating it solely to increase the override count.

### Cy-Fair Federal Credit Union Stadium

- Records the **11,000** capacity and **8877 Barker Cypress Rd., Cypress, TX 77433** address from CFISD.
- Adds the current one-hour gate opening, metal-detector screening, clear-bag policy, no-tailgating rule and no-re-entry rule as changeable district policies.
- Adds a specific editorial description centered on the Berry Center/CFISD operating context rather than generic Houston content.

### Galaxy Stadium / stable Jones AT&T Stadium route

- Adds a separated quality profile for Texas Tech's current **Galaxy Stadium** identity while preserving `/sports-venue/jones-att-stadium` as the established canonical route.
- Records the current clear-bag dimensions, no-re-entry rule, security screening, 90-minute general-gate opening, two-hour selected premium/student gate opening and current shuttle context as event-day policy.
- Adds a venue-specific editorial description that explains the 2026 naming transition without breaking historical links.

### Moody Center

- Records the official **2001 Robert Dedman Dr., Austin, TX 78712** address, **April 2022** opening, **15,000+ concert / 10,000+ basketball** configurations and Texas men's/women's basketball role.
- Adds current accessibility and bag-policy context and replaces generic arena-trip copy with UT campus-edge access guidance.
- Retains the existing venue-specific editorial description.

### Q2 Stadium

- Records the **10414 McKalla Place, Austin, TX 78758** address, **2021** opening era, Austin FC/MLS role and current **20,500+** seating description.
- Adds current accessible services and the stadium's current no-bag policy, with limited clutch/medical/childcare/cultural exceptions and no re-entry.
- Keeps transit, bicycle, rideshare and prepaid parking as first-class arrival modes rather than defaulting to driving.
- Retains the existing venue-specific editorial description.

### Round Rock Multipurpose Complex

- Records the official **2001 N. Kenney Fort Blvd., Round Rock, TX 78665** address and **spring 2017** opening.
- Captures the 60-acre layout, **five grass + five synthetic fields**, **938 parking spaces** and shaded 250-person championship-field seating.
- Reframes the page around field assignment, tournament waves and Old Settlers Park instead of generic Austin-area tourism.

### Round Rock Sports Center

- Records the official **2400 Chisholm Trail, Round Rock, TX 78681** address, **118,750** total square feet, **63,995** playable square feet, **6,500+** total capacity and **2,200+** spectator seating.
- Preserves the useful eight-basketball / sixteen-volleyball / four-NCAA-court configuration facts and centers arrival on court assignment and tournament timing.
- Adds a venue-specific editorial description rather than relying on a generic indoor-sports template.

### Sam Houston Race Park

- Records the official **7575 N. Sam Houston Parkway W., Houston, TX 77064** address, **1994** opening and the dedicated **3,500-space** parking lot with **125 accessible spaces**.
- Separates durable Thoroughbred/Quarter Horse/simulcast identity from season-specific live-racing dates, first-post times and special-event parking.
- Adds current bag/search guidance conservatively and adds a venue-specific northwest-Houston editorial description.

## GSC sports remediation milestone

The September 5 GSC triage lists **17** sports-venue URLs as `IMPROVE`. Those 17 are now all represented in the Phase 1D remediation layers: Texas Motor Speedway from the initial batch; DKR, Dell Diamond and Foster Pavilion from wave 2; Baylor Ballpark, Credit Union of Texas Event Center, Reed Arena, Whataburger Field and Memorial Park Golf Course from wave 3; and the final eight venues above from wave 4. `validate-sports-venue-coverage.mjs` reads the GSC triage file directly and fails if any current sports `IMPROVE` target lacks a Phase 1D remediation profile.

## Source standard used in this remediation

The **21** Phase 1D remediated records use venue/team/university/city/district-operated sources for durable facts and official visitor guidance. Frequently changing policies are summarized conservatively and linked back to the official current page instead of being treated as permanent facts. Venue identity, geography and nearby relationships are included only when the source record or physical context supports them.

## Deferred global layout/schema work

Phase 1D intentionally does **not** redesign the global `Plan the trip` section or other shared venue-page composition. Those are global layout/schema decisions. The audit above keeps the remaining template problem visible so the layout work can remove or conditionally render weak sections rather than preserving generic content for SEO.

## Remaining remediation queue

The September 5 GSC sports `IMPROVE` queue is complete. The broader editorial-quality backlog is now **53** of 84 venues without explicit venue-specific server editorial-description overrides. Those should continue venue by venue based on current search demand and destination importance, using the same standard: authoritative durable facts first, event-specific rules via official links, no required weekend filler, and no nearby/internal link unless geography or editorial relevance justifies it.
