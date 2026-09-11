# Sports venue content quality audit — 2026-09-10

Scope: all 84 currently verified TexasDefined sports-venue guides. Phase 1D remediates record-level content/data quality, and the follow-up global cleanup removes the shared trip-template filler identified by this audit.

## Measured duplication and structural causes

- The Phase 1D baseline found the generic venue route carrying a shared `Plan the trip` block with the identical heading **“Make the venue part of the weekend”** and the identical card labels **“Why people travel,” “Best trip pattern,” and “Before you go.”** Its body copy came from only 12 tag-based `venueProfile()` templates. The follow-up global cleanup removes that block and the dead `whyTravel`, `tripPattern`, and `beforeYouGo` template fields instead of replacing them with different filler. `validate-sports-venue-coverage.mjs` now fails if those template markers return.
- **84/84 venue records** are shaped by `SportsVenueEnrichment`. The original schema required `stayAndEat` and `nearby` strings, which encouraged lodging/weekend copy even when there was no venue-specific guidance worth publishing. The follow-up schema cleanup makes both fields optional and both generic/legacy renderers omit their cards when no supported copy exists. Core deep-profile requirements remain mandatory.
- The two knowledge-graph seed files (`major-sports-venues.ts` and `sports-venues-tier2.ts`) synthesize every base venue description from a small set of category templates plus a common wrapper sentence. Before Phase 1D, only **15 of 84** venue descriptions had venue-specific server editorial overrides. The initial batch raised explicit editorial coverage to **18 of 84**, wave 2 to **21**, wave 3 to **26**, wave 4 to **31**, wave 5 to **41**, the current-main editorial wave to **47**, Phase 1D wave 6 to **54**, Phase 1D wave 7 to **64**, and Phase 1D wave 8 to **74 of 84**. **10** venues remain in the broader record-by-record editorial backlog.
- **84/84 venue quick-answer components** formerly included `TexasExplainedContextLinks surface="sports"`, regardless of whether those links were meaningfully related to the venue. Phase 1D removed that forced link injection.
- Because `verifiedAt` is mandatory in the enrichment schema, the quick-answer surface had framed source-review metadata as **“How current is this [venue] visitor guide?”** The review date is now displayed as source metadata, not as a consumer FAQ or FAQ-schema question.
- The September 5 GSC triage contains **17** `/sports-venue/*` URLs marked `IMPROVE`. Phase 1D gives all 17 a separated remediation profile, and CI derives that list directly from `ops/seo/gsc-discovered-2026-09-05-urls.tsv` so future regressions fail closed.

## Initial batch remediated

### Amon G. Carter Stadium
- Corrected official capacity from the old approximate 40,000 wording to **46,000**.
- Records **2850 Stadium Drive, Fort Worth, TX 76109**, natural-grass Moncrief Field, TCU football/Big 12 context, accessibility and current clear-bag/entry guidance.
- Replaced generic Fort Worth weekend copy with TCU-campus-specific geography and changeable game-day guidance.

### Gerald J. Ford Stadium
- Added verified **33,200** capacity and **2000** opening year.
- Uses durable venue history including the 2024 Garry Weber End Zone Complex and natural-grass field installed in 2025.
- Records SMU/ACC context and replaces generic Dallas lodging copy with campus/parking constraints.

### Globe Life Field
- Added **approximately 40,300** capacity, **2020** opening, **734 Stadium Drive, Arlington, TX 76011**, Rangers/MLB context and Shaw Sports Turf B1K surface.
- Replaced generic entertainment-district filler with official parking/access guidance and defensible immediate context.

### American Airlines Center
- Added **2001** opening and configuration capacities of **20,000 basketball / 18,532 hockey**.
- Records **2500 Victory Avenue, Dallas, TX 75219**, Mavericks/NBA, Stars/NHL, accessibility and current bag/security guidance.
- Replaced generic downtown copy with Victory Station and Victory Park-specific context.

### Texas Motor Speedway
- Added **1997** opening, **3545 Lone Star Circle, Fort Worth, TX 76177**, and current track/property facts.
- Replaced generic race-weekend filler with the operationally relevant 1.5-mile oval, 1,500-acre property, route-specific parking/camping and race-day arrival guidance.

## Second remediation wave

### DKR–Texas Memorial Stadium
- Uses Texas Athletics' official **100,119** capacity and **2139 San Jacinto Blvd., Austin, TX 78712** address.
- Records FieldTurf, Texas football/SEC context, clear-bag/ADA guidance and event-sensitive gate guidance.
- Corrects the planning source to the canonical DKR facility page and replaces generic Austin weekend copy with campus-specific logistics.

### Dell Diamond
- Records **8,631 permanent seats plus roughly 3,000 lawn capacity**, **2000** opening, **3400 E. Palm Valley Blvd., Round Rock, TX 78665**, TifTuf Bermuda grass and current Express/PCL/Rangers affiliation context.
- Keeps gate timing and event parking changeable and centers visitor context on east Round Rock/US 79.

### Foster Pavilion
- Records **January 2024** opening, **7,000+** capacity, Baylor men's/women's basketball and Big 12 context.
- Separates current parking/shuttle/bag/no-re-entry/gate rules from durable history and centers the page on the Brazos River/Baylor/downtown-edge setting.

## Third remediation wave

### Baylor Ballpark / Magnolia Field
- Replaces season-count filler with the durable **1999 / 2000 / 2001** construction and dedication timeline.
- Records **5,000** capacity, Baylor baseball/Big 12 role, accessibility and the **January 2026 Magnolia Field** naming while keeping the TexasDefined route stable.

### Credit Union of Texas Event Center
- Records **200 E. Stacy Road #1350, Allen, TX 75002**, **7,000+** capacity and Allen Americans/ECHL role.
- Adds South Parking Garage, accessibility, event-sensitive bag and typical doors-open guidance without treating those policies as permanent.

### Reed Arena
- Records **730 Olsen Blvd., College Station, TX 77843**, **12,989** capacity and **fall 1998** opening.
- Captures Texas A&M basketball/volleyball, SEC context, clear-bag and accessible-parking guidance while avoiding stale campus-parking assumptions.

### Whataburger Field
- Records **734 E. Port Avenue, Corpus Christi, TX 78401**, **2005** opening, Hooks/Texas League/Astros affiliation and distinct seating/event configurations.
- Replaces generic Gulf Coast copy with Port of Corpus Christi cotton-warehouse history, industrial design and harbor setting.

### Memorial Park Golf Course
- Records **1001 E Memorial Loop Drive, Houston, TX 77007** and its public municipal identity.
- Replaces generic championship-golf copy with Camp Logan roots, John Bredemus' **1936** redesign, Houston Open history and the renovation preceding the tournament's **2020** return.

## Fourth remediation wave — GSC sports `IMPROVE` completion

### Circuit of The Americas
- Records **9201 Circuit of The Americas Blvd., Austin, TX 78617**, **2012** opening era and the **3.41-mile, 20-turn** purpose-built circuit.
- Keeps major-event parking/routes event-controlled and separates the southeast-Austin circuit from downtown assumptions.

### Cy-Fair Federal Credit Union Stadium
- Records **11,000** capacity and **8877 Barker Cypress Rd., Cypress, TX 77433**.
- Adds current gate/security/bag/no-tailgating/no-re-entry guidance as changeable CFISD policy and centers the description on the Berry Center campus.

### Galaxy Stadium / stable Jones AT&T Stadium route
- Adds the current **Galaxy Stadium** identity while preserving `/sports-venue/jones-att-stadium` as the stable route.
- Records current clear-bag, security, no-re-entry, gate and shuttle context as event-day policy.

### Moody Center
- Records **2001 Robert Dedman Dr., Austin, TX 78712**, **April 2022** opening, **15,000+ concert / 10,000+ basketball** configurations and Longhorn basketball role.
- Adds accessibility/bag context and UT campus-edge geography.

### Q2 Stadium
- Records **10414 McKalla Place, Austin, TX 78758**, **2021** opening, Austin FC/MLS role and **20,500+** seating.
- Treats transit, bicycle, rideshare and prepaid parking as first-class arrival modes and preserves current no-bag/accessibility guidance.

### Round Rock Multipurpose Complex
- Records **2001 N. Kenney Fort Blvd., Round Rock, TX 78665**, **spring 2017** opening, 60-acre site, **five grass + five synthetic fields** and **938 parking spaces**.
- Centers planning on field assignment, tournament waves and Old Settlers Park.

### Round Rock Sports Center
- Records **2400 Chisholm Trail, Round Rock, TX 78681**, **118,750** total square feet, **63,995** playable square feet, **6,500+** total capacity and **2,200+** spectator seating.
- Preserves the useful basketball/volleyball/NCAA-court configurations and centers arrival on tournament logistics.

### Sam Houston Race Park
- Records **7575 N. Sam Houston Parkway W., Houston, TX 77064**, **1994** opening and **3,500-space** parking lot with **125 accessible spaces**.
- Separates durable racing/simulcast identity from season-specific live dates, first-post times and special-event policy.

## Fifth remediation wave — broader major-draw backlog

### Cotton Bowl Stadium
- Records **3809 Grand Avenue, Dallas, TX 75210**, **1930** opening, **92,100** seats and natural grass.
- Replaces generic Dallas sports copy with Fair Park history, Red River Rivalry/State Fair Classic context and campus-specific arrival/access guidance.

### Choctaw Stadium
- Records **1000 Ballpark Way, Arlington, TX 76011** and its durable **1994–2019 Texas Rangers home** history before conversion to multipurpose use.
- Centers visitor context on the old-home/new-home relationship with Globe Life Field and the Arlington Entertainment District rather than generic Metroplex attractions.

### Ford Center at The Star
- Records **9 Cowboys Way, Frisco, TX 75034**, **12,000** seats and its shared Cowboys/City of Frisco/Frisco ISD role.
- Adds official accessibility/entry guidance and treats event door times as event-sensitive rather than universal.

### DATCU Stadium
- Corrects current capacity to **30,100**, reflecting the post-2024 chairback configuration rather than stale 30,850 references.
- Records **2011** opening, North Texas/American Conference role, LEED Platinum history, clear-bag/accessibility information and current construction-sensitive arrival guidance.

### Riders Field
- Records **7300 RoughRiders Trail, Frisco, TX 75034**, **2003** opening, **10,216 total / 7,748 fixed seats**, Double-A Texas League/Texas Rangers affiliation and current accessibility/bag/gate guidance.
- Uses the park-within-a-park design and Lazy River as venue-specific editorial context instead of generic Frisco-weekend filler.

### Lone Star Park
- Records **1000 Lone Star Parkway, Grand Prairie, TX 75050**, roughly **315 acres**, approximately **6,000 grandstand seats** and about **6,000 paved parking spaces**.
- Separates live-racing schedules from the year-round Bar & Book and keeps gate/post times event-controlled.

### TDECU Stadium
- Records **3874 Holman St., Houston, TX 77004**, **40,000** seats, **2014** opening, synthetic turf and Houston Cougars/Big 12 context.
- Replaces generic Houston travel filler with University of Houston campus access, clear-bag and game-day operating context.

### Fertitta Center
- Corrects basketball capacity to the current UH fact-sheet figure of **7,035** rather than older rounded 7,100 references.
- Records **3422 Cullen Blvd., Houston, TX 77004**, **December 2018** opening after the Hofheinz Pavilion renovation, Houston basketball/volleyball and Big 12 context.

### H-E-B Center at Cedar Park
- Records **2100 Avenue of the Stars, Cedar Park, TX 78613**, **September 2009** opening and configuration-specific capacities: **6,800 hockey / 7,200 many sports / up to 8,000 concerts**.
- Records Texas Stars/Austin Spurs roles and current accessibility/bag/no-re-entry guidance while keeping event-specific rules changeable.

### Alamodome
- Records **100 Montana St., San Antonio, TX 78203**, **May 1993** opening and **62,834** football/soccer configuration.
- Separates the stadium's durable flexible-configuration history and UTSA role from event-sensitive parking, accessibility, clear-bag and doors-open operations.

## Current-main editorial wave 6 — high-value explicit descriptions

### Reliant Stadium
- Adds a current server editorial description using the official **72,000–80,000 configuration range**, 2002 opening, Houston Texans and RODEOHOUSTON roles, and the August 2026 return to the Reliant Stadium name.
- Keeps arrival context tied to prepaid parking, lot-specific approaches, METRORail and rideshare rather than generic Houston weekend language.

### Comerica Center
- Adds venue-specific Frisco context around Texas Legends basketball, Dallas Pulse volleyball and other indoor events.
- Centers the description on the Avenue of the Stars sports district and actual Garage E / event-dependent Garage F arrival pattern rather than metro-wide filler.

### Moody Coliseum at SMU
- Adds an explicit SMU-campus description for basketball, volleyball and university events.
- Treats sport- and season-specific campus parking as changeable instead of freezing one current parking allocation into evergreen copy.

### UNT Coliseum / Super Pit
- Adds a Denton-specific description centered on North Texas basketball and the Mean Green athletics campus.
- Keeps seating and parking changes framed as season-sensitive while preserving the durable Super Pit identity.

### Rice Stadium
- Adds a durable editorial description using the stadium’s **1950** opening, President John F. Kennedy’s **1962** moon speech, Super Bowl VIII history and Rice campus setting.
- Notes the current Gateway Project era without turning temporary construction guidance into permanent visitor copy.

### Constellation Field
- Adds a Sugar Land-specific description centered on the Space Cowboys’ Triple-A Astros affiliation, more than 2,000 parking spaces and the Fort Bend County setting.
- Separates the ballpark from generic downtown-Houston major-league framing.

## Phase 1D sixth remediation wave — separated quality/runtime expansion

Reliant Stadium, Rice Stadium and Constellation Field overlap the current-main editorial wave above, so their primary descriptions remain in the main editorial registry rather than being duplicated in the Wave 6 fallback file. Phase 1D still adds separated quality/runtime profiles for all ten venues below. The other seven venues add both new profiles and net-new explicit descriptions.

### Reliant Stadium
- Records **8825 Kirby Drive, Houston, TX 77054**, **2002** opening, Houston Texans role, artificial turf over concrete and the official **72,000–80,000** configuration range.
- Uses Reliant Park campus traffic and event-specific Texans/rodeo operations instead of generic Houston-weekend guidance.

### Rice Stadium
- Records **47,000** capacity and **1950** opening from Rice Athletics.
- Replaces generic Houston college-football copy with the stadium's rapid 1950 construction, JFK moon speech, Super Bowl VIII history and current Gateway Project context.

### Constellation Field
- Records **1 Stadium Drive, Sugar Land, TX 77498**, **April 2012** opening, Space Cowboys/Astros Triple-A role, accessible parking/seating and current bag guidance.
- Keeps parking prices changeable and centers the page on Sugar Land/Fort Bend rather than downtown Houston.

### PGA Frisco / Fields Ranch
- Records **3255 PGA Parkway, Frisco, TX 75033**, the 660-acre PGA Frisco campus, Fields Ranch East/West identities and the East course's 2027 PGA Championship role.
- Separates daily public golf, resort/PGA District use and championship-event logistics; preserves the East-course walking/caddie requirement with medical-cart exception as current policy.

### Will Rogers Memorial Center
- Records **3401 W Lancaster Ave., Fort Worth, TX 76107**, **1936** construction, the **120-acre** City-owned campus and **5,652-seat** Will Rogers Coliseum.
- Treats the complex as multiple arenas/barns/halls with event-specific operations rather than a single generic arena.

### United Supermarkets Arena
- Records **1701 Indiana Ave., Lubbock, TX 79409**, **15,000** capacity and **November 1999** opening.
- Centers Texas Tech men's/women's basketball and volleyball plus campus-event logistics instead of generic West Texas entertainment copy.

### Sun Bowl Stadium
- Corrects current official capacity to **45,971**, records the **September 1963** opening and Classic HD CoolPlay surface.
- Uses UTEP campus/mountain topography and the annual Sun Bowl as the durable visitor story.

### Don Haskins Center
- Records **12,000** capacity and the first game on **February 3, 1977**.
- Re-centers the venue on UTEP basketball, Don Haskins and the 1966 Texas Western championship legacy rather than generic El Paso arena filler.

### Southwest University Park
- Records **1 Ballpark Plaza, El Paso, TX 79901**, **April 2014** opening, Chihuahuas/Padres Triple-A role and the current ballpark guide's **about 7,200 fixed / roughly 9,500–10,000 total** configuration wording.
- Adds accessible entrances/seating, current clear-bag/no-reentry guidance and downtown-specific parking rather than generic city travel advice.

### HODGETOWN
- Records **715 S Buchanan St., Amarillo, TX 79101**, **April 2019** opening and Double-A baseball role.
- Replaces generic Panhandle minor-league language with the 37-year return of affiliated baseball, Jerry Hodge naming story, downtown civic setting and current clear-bag/entrance guidance.

## Phase 1D seventh remediation wave — high-value remaining backlog

### Cowtown Coliseum
- Records **121 E Exchange Ave., Fort Worth, TX 76164** and the **1908** completion of the Stockyards arena.
- Uses the venue's 1918 indoor-rodeo history, year-round rodeo identity, current bag rule and Stockyards parking/transit context instead of generic Fort Worth event copy.

### UFCU Stadium — Texas State
- Records **1100 Aquarena Springs, San Marcos, TX 78666**, **28,388** seats, **1981** opening and FieldTurf.
- Uses Texas State's current shuttle, clear-bag, security and no-reentry guidance while preserving the 2012 football-focused renovation as durable context.

### Freeman Coliseum
- Records **3201 E. Houston St., San Antonio, TX 78219**, **1949** opening and **7,630 fixed seats** with event-dependent additional seating.
- Centers the page on the Art Deco arena, East Houston Street event campus, current accessibility and bag guidance rather than River Walk filler.

### Texas Motorplex
- Records **7500 W Hwy 287, Ennis, TX 75119**, **1986** opening and the all-concrete quarter-mile drag strip.
- Uses the single-pour post-tension concrete/NHRA history and event-specific camping, parking and entrance rules rather than treating the track as a generic Dallas attraction.

### Colonial Country Club
- Records **3735 Country Club Circle, Fort Worth, TX 76109**, **1936** opening and the Bredemus/Maxwell championship-course lineage.
- Preserves the 1941 U.S. Open, 1991 U.S. Women's Open, 1975 PLAYERS and annual PGA TOUR history while clearly distinguishing tournament-week public access from ordinary private-club play.

### TPC San Antonio
- Records **23808 Resort Parkway, San Antonio, TX 78261**, **2010** opening and the Greg Norman/Sergio Garcia Oaks plus Pete Dye Canyons courses.
- Makes the private-resort access rule explicit: ordinary play is for members/guests and eligible JW Marriott guests, while the Valero Texas Open uses its own spectator plan.

### Eagle Stadium — Allen
- Records **155 Rivercrest Boulevard, Allen, TX 75002** and the Allen Eagles/UIL playoff role without inventing or freezing an unsupported capacity figure.
- Uses Allen ISD's current metal-detector and clear-bag guidance and visitor-side entry rules as event-controlled planning information.

### Legacy Stadium — Katy
- Records **1830 Katyland Drive, Katy, TX 77493** and the **2017** district-stadium era.
- Treats the venue as a multi-school Katy ISD football/playoff/graduation facility and uses current clear-bag, parking and approved-tailgate guidance instead of generic Houston-suburb copy.

### UFCU Disch-Falk Field
- Records **1300 E. MLK Blvd., Austin, TX 78702**, **7,211** seats and **February 1975** opening.
- Uses Texas baseball's current mobile-entry, clear-bag and event-parking guidance while centering the history on the 2009 renovation and Longhorn baseball rather than generic downtown Austin language.

### Olsen Field at Blue Bell Park
- Records the **1978** Olsen Field opening and **February 2012** reopening after the $24 million Blue Bell Park redevelopment.
- Uses current Texas A&M digital parking/ticketing, clear-bag and 90-minute gate guidance while avoiding stale parking prices and older capacity assumptions.

## Phase 1D eighth remediation wave — conventional venue backlog

### Nelson W. Wolff Municipal Stadium
- Records **5757 US Hwy 90 West, San Antonio, TX 78227**, **April 18, 1994** opening, **6,200 fixed seats plus a roughly 3,000-person berm**, and the Missions’ current Double-A Padres affiliation.
- Uses the current May 2026 clear-bag rule and west-side U.S. 90 arrival pattern while keeping parking prices event-controlled.

### Retama Park
- Records the **1995** opening and current Selma horse-racing identity with live racing plus year-round simulcast wagering.
- Preserves the current clear-bag policy and treats parking/admission terms as current operations rather than permanent evergreen promises.

### Momentum Bank Ballpark
- Records **5514 Champions Drive, Midland, TX 79706**, **2002** opening, **4,709 seats / 6,669 total with berms**, and the RockHounds’ current Double-A Athletics affiliation.
- Uses the live cashless, clear-bag, re-entry and day-dependent gate rules without freezing ticket prices.

### Bowers Stadium
- Records **620 Bowers Blvd., Huntsville, TX 77340**, **14,000** capacity and the first game on **September 13, 1986**.
- Centers Sam Houston football and current modernization-sensitive arrival guidance without claiming transitional construction work is complete before the official source does.

### McKinney ISD Stadium
- Records **4201 S. Hardin Blvd., McKinney, TX 75070** and its McKinney ISD / NCAA Division II championship role.
- Deliberately omits an unsupported capacity figure and instead protects current e-ticket, clear-bag, home/visitor parking and approved-tailgate guidance.

### Children’s Health Stadium — Prosper
- Records **2000 Stadium Drive, Prosper, TX 75078** and the district’s official **12,000-seat** figure.
- Uses current clear-bag, cashless, ADA-entry and event-map guidance across multi-school football and district events.

### Ratliff Stadium
- Preserves the Ector County ISD / Permian / Odessa High football identity without copying a secondary capacity or venue address that the current public ECISD stadium page does not verify.
- Uses current district traffic, ticket and stadium-policy sources as the operational authority.

### Mesquite Memorial Stadium
- Records **2411 W. Scyene Rd., Mesquite, TX 75149** and the district football/soccer role.
- Deliberately avoids an unsupported seat count while protecting Mesquite ISD’s current clear-bag and security rules.

### Lupton Stadium
- Records **3700 Berry Street, Fort Worth, TX 76109**, **4,500** capacity, **2003** opening and natural-grass TCU baseball identity.
- Centers the TCU campus and NCAA-postseason history rather than generic Fort Worth sports language.

### Reckling Park
- Records the **2000** opening and current Rice baseball capacity of **6,193**.
- Centers the former Cameron Field site, Rice campus and Texas Medical Center geography rather than generic Houston baseball copy.

## GSC sports remediation milestone

The September 5 GSC triage lists **17** sports-venue URLs as `IMPROVE`. All **17/17** are represented in the Phase 1D remediation layers. `validate-sports-venue-coverage.mjs` reads the GSC triage file directly and fails if any current sports `IMPROVE` target lacks a Phase 1D remediation profile.

## Source standard used in this remediation

The **61** venues with separated Phase 1D quality/remediation profiles use venue/team/university/city/district-operated sources for durable facts and official visitor guidance. The current-main editorial wave and Phase 1D waves 6–8 use the same source discipline rather than introducing unsourced generic prose. Frequently changing policies are summarized conservatively and linked back to the current official page rather than being treated as permanent facts. Venue identity, geography and nearby relationships are included only when the source record or physical context supports them.

## Global trip-template and schema cleanup

The shared `Plan the trip` / `Make the venue part of the weekend` block is removed from the legacy venue renderer, along with its 12 tag-level `whyTravel`, `tripPattern`, and `beforeYouGo` template families. CI treats any return of those markers as a regression. Venue-specific event-day guidance, source-backed venue context, official planning links and geographically constrained county visitor resources remain.

`SportsVenueEnrichment.stayAndEat` and `SportsVenueEnrichment.nearby` are optional. Both the generic sports-venue route and the Galaxy Stadium override render those cards only when a record actually supplies supported content. Deep-completeness governance still requires every seeded venue to have exactly one profile with primary events, parking, arrival, planning links, image brief and verification metadata; it no longer requires lodging/weekend prose simply to satisfy schema completeness.

## Remaining remediation queue

The September 5 GSC sports `IMPROVE` queue is complete. Explicit venue-specific server editorial coverage is now **74 of 84**, leaving **10** broader editorial-quality records. Continue those venue by venue based on current search demand and destination importance, using the same standard: authoritative durable facts first, event-specific rules via official links, no required weekend filler, and no nearby/internal link unless geography or editorial relevance justifies it. Existing `stayAndEat` / `nearby` copy should be retained only where it adds specific, defensible visitor value; weak instances can be deleted without fabricating replacements.
