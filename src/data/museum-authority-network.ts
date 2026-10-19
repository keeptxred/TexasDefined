import type { Destination } from "./types";
import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";
import { museumLicensedHeroes } from "./museum-authority-heroes";

/**
 * Museum authority dossiers: one source of truth for visitor-first museum guides.
 * NEVER create a museum destination without registering a complete dossier here.
 * Reviewed is a verification date, not an automatic dateModified refresh.
 * Visitor operations always defer to the operator; no stale prices/open-now claims.
 */
export interface MuseumAuthorityDossier {
  name: string;
  slug: string;
  county: string;
  city: string;
  reviewed: string;
  topics: readonly string[];
  whyVisit: string;
  visitorStrategy: string;
  accessibility: string;
  familiesAndGroups: string;
  researchValue: string;
  exhibits: readonly { heading: string; detail: string }[];
  routes: readonly { label: string; steps: readonly string[] }[];
  sources: readonly { label: string; url: string; use: string }[];
  connections: readonly { label: string; href: string; reason: string }[];
}

/** Links are to exact, existing destinations or stable topic hubs, not guessed paths. */
export const museumAuthorityDossiers: Record<string, MuseumAuthorityDossier> = {
  "texas-country-music-hall-of-fame-carthage": {
    name: "Texas Country Music Hall of Fame and Tex Ritter Museum",
    slug: "texas-country-music-hall-of-fame-carthage", county: "Panola", city: "Carthage", reviewed: "2026-10-18",
    topics: ["texas-music", "country-music", "performing-arts", "regional-history"],
    whyVisit: "Carthage's Texas Country Music Hall of Fame and Tex Ritter Museum preserves the stories of Texans who helped shape country music through recording, radio, film and live performance. The Tex Ritter collection connects Panola County's own singing-cowboy star with national film and broadcasting history; displays about Jim Reeves and other honorees turn a hall of names into a more physical museum experience. This is the Carthage institution, not the Country Music Hall of Fame in Nashville.",
    visitorStrategy: "The official museum posts Monday through Saturday from 10 a.m. to 4 p.m., with regular adult admission of $10 and child admission of $5; it does not specify a child age boundary in that tariff. Visit at 310 West Panola Street, Carthage, and call 903-694-9561 if traveling on a holiday or seeking group arrangements. The museum and gift shop share a 13,000-square-foot facility, but the annual Hall of Fame induction concerts and John Ritter Tribute Showcase take place at the Carthage Civic Center on ticketed schedules: an ordinary museum admission does not include those shows.",
    accessibility: "The museum website lists its address, phone, exhibit facilities and banquet spaces but does not publish a sufficiently detailed wheelchair route, parking, restroom, audiovisual captioning or sensory-access policy. Travelers needing a guaranteed step-free entry or particular accommodations should call 903-694-9561 before departure. Do not interpret accessible event seating at the separate Civic Center as proof of access to all museum galleries.",
    familiesAndGroups: "Families interested in classic country music, radio equipment or Western movies can start with the Tex Ritter story before exploring other honorees. Younger visitors may know actor John Ritter better than his father Tex, and the family connection offers a natural discussion starter. The museum advertises a gift shop and group-sized event space, but regular museum admission must not be conflated with paid annual concerts or larger banquet rentals. Confirm school or coach-tour arrangements with staff rather than promising a guided visit.",
    researchValue: "The museum's roots predate the current 2002 building: the local Tex Ritter Museum began in the early 1990s, while the statewide Hall of Fame program began in 1998. Its collections connect Ritter's singing-cowboy films and radio/television career, the Jim Reeves display with Henderson radio-station KGRI equipment, and other Hall of Fame inductees. Compare the museum's official inductee chronology with Texas State Historical Association's institutional history rather than implying every year's inductee has a permanent exhibit.",
    exhibits: [
      { heading: "Tex Ritter Museum", detail: "Documents Panola County-born Tex Ritter's cowboy music, film roles and broadcast work, including the transition from regional entertainer to Hollywood singing-cowboy star." },
      { heading: "Jim Reeves and KGRI equipment", detail: "The museum states a significant Jim Reeves display was added in 2004, including radio equipment from his Henderson station, KGRI." },
      { heading: "Texas Country Music Hall of Fame honorees", detail: "Follow the official year-by-year inductee record and contrast artists, songwriters and entertainers; verify current display rotation before attributing a particular artifact." },
      { heading: "John Ritter Tribute Showcase history", detail: "An annual performance tradition honoring Tex Ritter's actor son, not an everyday exhibit ticket or on-demand museum concert." }
    ],
    routes: [
      { label: "Classic-country museum visit", steps: ["Begin with the Tex Ritter Museum and Panola County roots", "Continue to the Jim Reeves and other artist displays", "Compare names and dates with the institution's Hall of Fame induction record"] },
      { label: "Carthage music-and-history outing", steps: ["Tour the Hall of Fame in its posted Monday–Saturday window", "Explore downtown Carthage and the Panola County visitor landscape", "Check the Civic Center separately only if an induction or tribute event is actually scheduled"] },
      { label: "School or family radio-history visit", steps: ["Identify singing-cowboy movies and midcentury radio as distinct formats", "Study the KGRI radio equipment's relationship to Jim Reeves", "Discuss how Texas performers reached national audiences before modern streaming"] }
    ],
    sources: [
      { label: "Hall of Fame — official Tex Ritter Museum", url: "https://www.tcmhof.com/museum", use: "Permanent displays, institutional history, museum hours and prices" },
      { label: "Hall of Fame — official contacts", url: "https://www.tcmhof.com/contact", use: "Physical location, contact and ordinary admission" },
      { label: "Hall of Fame — official inductees", url: "https://www.tcmhof.com/latest-inductees", use: "Curated honoree chronology and context" },
      { label: "Hall of Fame — event schedule", url: "https://www.tcmhof.com/schedule", use: "Separately ticketed concerts and past special festival hours" },
      { label: "Texas State Historical Association — institution history", url: "https://www.tshaonline.org/handbook/entries/texas-country-music-hall-of-fame-and-tex-ritter-museum", use: "Independent museum founding and Carthage history" }
    ],
    connections: [
      { label: "Panola County", href: "/county/panola", reason: "Place the institution in Carthage and the Piney Woods." },
      { label: "Texas museum directory", href: "/explore/museums", reason: "Discover other history, culture and performance museums in Texas." },
      { label: "Texas music history", href: "/texas-music", reason: "Connect Hall of Fame honorees with the existing statewide Texas music guide." }
    ],
  },
  "bryan-museum-galveston": {
    name: "The Bryan Museum", slug: "bryan-museum-galveston", county: "Galveston", city: "Galveston", reviewed: "2026-10-18",
    topics: ["texas-history", "western-art", "galveston-history", "historic-architecture"],
    whyVisit: "The Bryan Museum occupies Galveston's carefully restored 1895 Orphans Home and uses J.P. and Mary Jon Bryan's Texana collection to interpret Texas and the American West across Indigenous history, Spanish colonization, the frontier, statehood, art and documentary history. The building has a second story worth understanding in its own right: it operated as an orphanage before the museum's 2015 opening. Seven permanent gallery themes and rotating exhibitions invite a deliberate visit rather than a photo-only stop on the island.",
    visitorStrategy: "For October 2026 the official fall/winter visitor calendar specifies Wednesday through Sunday, 10 a.m.–5 p.m., with Mondays and Tuesdays closed. The spring/summer pattern differs: from March 2 through Labor Day the museum generally closes only Tuesday. The operator lists $15 adults, $14 seniors age 65+, teachers and military, $12 students, $7 children ages 6–12, and free entry for younger children and members; ticket policies can change. Online advance tickets are encouraged and stated to be nonrefundable, though general tickets remain valid one year after initial purchase. Find the museum at 1315 21st Street in Galveston, and confirm holiday closings before setting out.",
    accessibility: "The museum's published venue-rental policies explicitly reference ADA public accommodations, but this alone does not verify every gallery's step-free route, lift availability, accessible drop-off or visitor sensory aids. The historic former Orphans Home has stairs and multiple gallery levels. Visitors with specific mobility, hearing or sensory needs should ask the museum directly at 409-632-7685 rather than assume all historic areas are accessible. Do not claim a detailed accessible itinerary until museum staff confirm it.",
    familiesAndGroups: "The collections are rich in historical maps, documents, artworks and material culture rather than children's ride-style attractions. The museum advertises educational field trips with an expert guide through four galleries, plus age-dependent programs, artifact explorations, temporary exhibitions or outdoor gardens. A separately bookable 90-minute Galveston Orphans Home architectural tour has limited capacity and includes museum admission, but is not automatically part of a walk-up ticket. Families can combine a shorter gallery visit with outdoor grounds and other independent Galveston stops.",
    researchValue: "Use the seven permanent galleries to follow multiple eras without mistaking the history of the institution for the history of its contents. The operator reports approximately 70,000 objects across 12,000 years, including 20,000 rare books, over 30,000 archival documents in several languages, historical maps, Western art, everyday objects and saddles. The museum's collecting scope is vast; a visitor-first guide should select representative galleries and explain source context instead of duplicating an archival catalog or promising access to every object.",
    exhibits: [
      { heading: "Orientation and Spanish Colonial galleries", detail: "Set the region's early history in Indigenous and colonial context through artifacts, maps and documents rather than starting only at the Texas Revolution." },
      { heading: "Texas Frontier and Statehood and Beyond", detail: "Follow exploration, settlement and political transition with period objects, rare maps, documents and interpretive paintings." },
      { heading: "Texas Master and Rest of the West", detail: "Compare regional artistic traditions and subjects presented across the museum's named permanent galleries." },
      { heading: "Galveston Orphans Home Gallery", detail: "Connect the 1895 institution's social and architectural history with the building now housing the Bryan collection." },
      { heading: "Rotating special exhibition gallery", detail: "The operator describes one changing exhibit gallery in addition to its permanent galleries; current topics require date-specific verification." }
    ],
    routes: [
      { label: "Texas-history first visit", steps: ["Begin with the Orientation Gallery and early cultural context", "Continue through Spanish Colonial, Texas Frontier, and Statehood galleries", "Finish with Galveston Orphans Home interpretation and the grounds"] },
      { label: "Art and archives visit", steps: ["Focus on the Texas Master and Rest of the West collections", "Read artifact and document captions to distinguish originals from reproductions", "Visit the current special exhibition if listed and open that day"] },
      { label: "Galveston architecture afternoon", steps: ["Reserve any special Orphans Home guided tour separately", "Explore the building history and outdoor grounds", "Add another independently ticketed Galveston historic stop rather than assuming a combined pass"] }
    ],
    sources: [
      { label: "The Bryan Museum — current visitor tickets and hours", url: "https://thebryanmuseum.org/plan-your-visit", use: "October 2026 fall schedule, admissions, age bands and field trips" },
      { label: "The Bryan Museum — ticket details", url: "https://thebryanmuseum.org/plan-your-visit/tickets", use: "Nonrefundable tickets, booking and separate historic Orphans Home tours" },
      { label: "The Bryan Museum — official exhibitions", url: "https://thebryanmuseum.org/exhibitions", use: "Named permanent and changing museum galleries" },
      { label: "The Bryan Museum — Bryan Educational Institute", url: "https://thebryanmuseum.org/about-us/bryan-educational-institute", use: "Historic site, 2015 opening and collecting organization" },
      { label: "The Bryan Museum — museum guidelines", url: "https://thebryanmuseum.org/venue-rental/museum-guidelines", use: "Published event-specific access requirements, not a full visitor access guarantee" }
    ],
    connections: [
      { label: "Galveston County", href: "/county/galveston", reason: "Connect the museum with the island and county's maritime and civic history." },
      { label: "Texas museum directory", href: "/explore/museums", reason: "Compare history museums around the state." },
      { label: "Bishop's Palace Galveston", href: "/destination/bishops-palace-galveston", reason: "A separate historic Galveston building with its own admission and opening rules." }
    ],
  },
  "east-texas-oil-museum-kilgore": {
    name: "East Texas Oil Museum", slug: "east-texas-oil-museum-kilgore", county: "Gregg", city: "Kilgore", reviewed: "2026-10-17",
    topics: ["oil-history", "industrial-heritage", "texas-history", "family"],
    whyVisit: "The East Texas Oil Museum at Kilgore College interprets the 1930 discovery and the transformation of Northeast Texas into a major oil-producing region. Its recreated 1930s Boomtown allows visitors to encounter businesses, machinery, transportation and social life, making the era more tangible than a textbook timeline or a static set of drilling equipment alone.",
    visitorStrategy: "The Kilgore College operator lists Monday through Saturday from 9 a.m. until 5 p.m., with last museum admission at 4 p.m. and Sunday closed under the standard schedule. Purchase admission only at the museum, not through an invented online booking page: current adult admission is $10, ages 3–11 are $7, ages two and younger are free, and senior/military visitors receive a 10 percent discount. Kilgore College students and employees are admitted free. The museum itself recommends at least 90 minutes. Find it at 1301 S. Henderson Boulevard with visitor parking on Ross Avenue behind the museum. Verify listed holiday closures before travel.",
    accessibility: "The official visitor and facility-rental information identifies the museum as ADA accessible and provides easy access for vans and buses. A limited number of loan wheelchairs may be checked out at the gift shop without a rental fee, but the operator asks for an ID until the chair is returned. Leashed or harnessed service animals are permitted. Exact accessibility of each Boomtown sound effect, simulation and exhibit should be checked with the museum rather than inferred from a general building statement.",
    familiesAndGroups: "Boomtown USA has recreated storefronts, an old-fashioned gas station, a drugstore, drilling equipment and other lifelike period scenes that can give school-age children a narrative for how an oil town worked. The simulated blowout and movie sound effects may be intense for some visitors. Formal student group tours require advance arrangements; general admission does not automatically reserve a guide. Food service is not documented as a regular visitor amenity, so plan meals separately in Kilgore.",
    researchValue: "Use the museum's recreated town and original period artifacts to examine the difference between the giant field's 1930 oil discovery and its social consequences: migration, retail business, machinery, roads and everyday life. The college identifies oral histories and primary-source documents as central to its collecting mission. Compare its physical reconstructions with historic images and operator interpretation; avoid presenting lifelike recreated rooms as untouched 1930s buildings.",
    exhibits: [
      { heading: "Boomtown USA", detail: "Full-scale 1930s streetscape with shopfronts, vehicles and people illustrates the everyday economic changes that followed the East Texas oil discovery." },
      { heading: "Overton Drugstore and Arp General Store", detail: "Recreated business interiors make the human and retail side of drilling-boom migration visible." },
      { heading: "Boomtown Theater and oil-well blowout effects", detail: "Film and effects interpret drilling hazards; visitors with noise or sensory concerns should ask staff about the presentation." },
      { heading: "Elevator Ride to the Center of the Earth", detail: "An interpretive simulated underground journey explains subsurface oil formations; it is an exhibit, not travel below the campus." },
      { heading: "Historic vehicles, equipment and archival collections", detail: "Authentic objects, period displays and documentary material reveal transportation, production technology and memories of East Texas residents." },
    ],
    routes: [
      { label: "Ninety-minute museum essentials", steps: ["Start with the official 1930 discovery context and displays", "Walk the Boomtown USA shops and vehicle exhibits", "Add the film or underground simulation if available and comfortable"] },
      { label: "Family morning in Kilgore", steps: ["Arrive before 4 p.m. final admission, ideally early for unhurried galleries", "Compare the recreated shopfronts and oilfield work with family life in 1930", "Finish at another separately scheduled Kilgore stop rather than treating this admission as a combined ticket"] },
      { label: "Petroleum and technology comparison", steps: ["Study drilling methods and the early oilfield's equipment", "Compare exhibits about public communication and technology at the separate Texas Broadcast Museum", "Read archival images and interpret how oil-field wages and infrastructure reshaped Gregg County"] }
    ],
    sources: [
      { label: "Kilgore College — East Texas Oil Museum visitor information", url: "https://easttexasoilmuseum.kilgore.edu/visit/", use: "Current hours, last entry, tickets, parking, wheelchairs and photography restrictions" },
      { label: "East Texas Oil Museum — permanent experience", url: "https://easttexasoilmuseum.kilgore.edu/welcome/", use: "Official Boomtown, exhibits and archive interpretation" },
      { label: "East Texas Oil Museum — calendar and temporary programming", url: "https://easttexasoilmuseum.kilgore.edu/events/", use: "Time-bound exhibitions and operator event alerts" },
      { label: "East Texas Oil Museum — general contact", url: "https://easttexasoilmuseum.kilgore.edu/contact/", use: "Direct telephone, contact and group scheduling" },
      { label: "East Texas Oil Museum — memberships", url: "https://easttexasoilmuseum.kilgore.edu/memberships/", use: "Official annual admission benefits and visitor discounts" }
    ],
    connections: [
      { label: "Gregg County", href: "/county/gregg", reason: "Connect the East Texas Oil Field to Kilgore and the county's economy." },
      { label: "Texas Broadcast Museum", href: "/destination/texas-broadcast-museum-kilgore", reason: "Compare separate technological histories in Kilgore; admission and schedules are independent." },
      { label: "Texas museum directory", href: "/explore/museums", reason: "Compare industrial, history and technology museum options across Texas." }
    ],
  },
  "uss-lexington-museum-corpus-christi": {
    name: "USS Lexington Museum on the Bay",
    slug: "uss-lexington-museum-corpus-christi",
    county: "Nueces",
    city: "Corpus Christi",
    reviewed: "2026-10-14",
    topics: [
        "naval-aviation",
        "world-war-ii",
        "military-history",
        "maritime-heritage",
        "family"
    ],
    whyVisit: "USS Lexington (CV-16), the Essex-class carrier preserved on North Beach in Corpus Christi, is an actual aircraft carrier and not Battleship Texas. Her visitor routes reveal both large-scale naval aviation and the tight daily life of sailors across wartime and training-carrier service. The flight deck aircraft, hangar exhibits, engineering displays and shipboard spaces offer distinct experiences; a grounded visit explains how carrier airpower differs from battleship artillery, with detailed historical research maintained separately in TexasDefined's USS Lexington CV-16 historical guide.",
    visitorStrategy: "The museum operates daily except Thanksgiving and Christmas. Its 2026 operator listing states 9 a.m.–5 p.m. during the Labor Day-to-Memorial Day season and 9 a.m.–6 p.m. in summer. General admission is purchased at the entrance booths on the day of your visit, not via a routine online museum ticket: current listed adult admission $25, seniors $21, military with ID $16, ages 13–17 $20, ages 4–12 $15 and ages 3 or younger free. All-day parking currently costs $5; some card transactions incur a 3% fee. Budget roughly three to four hours if walking more than the accessible decks, and choose fewer self-guided routes when time or mobility is limited. The Mess Deck Café on the hangar deck lists lunch food, snacks and daily service from 10 a.m. to 4 p.m., subject to operational changes; outside food and beverages are prohibited.",
    accessibility: "The operator states the hangar deck and flight deck are wheelchair accessible, and the LEX LIFT elevator connects the decks for visitors who cannot use ship ladders. The café, 3D MEGA Theater, store and restrooms are on the accessible hangar deck. This does not establish step-free access to all of the carrier's eleven interpreted decks or its narrow wartime ladders and machinery rooms. Ask visitor services about access to any specific route, simulator or below-deck compartment before purchasing an experience. The outdoor flight deck is exposed to sun and strong bay winds; hearing protection or adjusted pacing may help with theater and Pearl Harbor effects.",
    familiesAndGroups: "Families can prioritize the accessible aircraft displays, hangar and flight deck and choose a shorter circuit for small children. Other routes include steep shipboard ladders, hard surfaces, tight corridors and wartime imagery, so age and mobility needs matter more than a generic family-friendly badge. The operator advertises a 3D theater, Pearl Harbor experience, simulator and educational programming; check current content and separate fees before promising particular access. Guided tours can have minimum-age limits, advance booking and particular start times. School or scout groups should wait for confirmation of reservations rather than treating an inquiry as a confirmed date.",
    researchValue: "Use Lexington's exhibition routes to compare the mechanics of a carrier: aircraft launch and recovery, hangar maintenance, control spaces, sailor quarters and engineering systems. The operator describes five independently navigable self-guided tour routes, not one compulsory tour. The National Historic Landmark ship's World War II combat and subsequent training service also make it valuable for comparing Lexington CV-16 with the earlier Lexington CV-2 lost at Coral Sea and the separate Texas battleships. For ship specifications and chronology, link to the underlying museum, Navy archival material and the site's full naval history article instead of reproducing a complete collection catalog.",
    exhibits: [
        {
            heading: "Flight deck aircraft and recovery equipment",
            detail: "See naval aircraft and landing/anti-aircraft equipment atop the carrier, reached through the LEX LIFT for visitors who cannot use ladders."
        },
        {
            heading: "Hangar deck and aircraft-handling",
            detail: "Follow the central space where aircraft could be stored and serviced, with accessible theater, café and basic visitor amenities."
        },
        {
            heading: "Self-guided five-route ship circuit",
            detail: "Choose among independently marked ship routes and interactive exhibits; visitors should not promise that every below-deck passage is accessible."
        },
        {
            heading: "Pearl Harbor immersive exhibit",
            detail: "An operator-promoted light and sound attraction that may not suit all younger or sensory-sensitive visitors."
        },
        {
            heading: "3D MEGA Theater and flight simulator",
            detail: "A film experience promoted as included with general admission and a separate simulator-style attraction; verify current showtimes and any simulator fees."
        },
        {
            heading: "Carrier engineering and sailor life",
            detail: "Where open, below-deck mechanical and living spaces give physical scale to the work of keeping a carrier afloat and an air wing operating."
        }
    ],
    routes: [
        {
            label: "Step-free highlights",
            steps: [
                "Check in at the North Beach admission booths and confirm current LEX LIFT operation",
                "Tour hangar-deck exhibits and 3D MEGA Theater as interests permit",
                "Use the elevator to see aircraft on the flight deck and return for the café or store"
            ]
        },
        {
            label: "Full ship adventure",
            steps: [
                "Begin with the flight-deck aviation story and aircraft displays",
                "Choose several marked self-guided circuits below deck only where personal mobility and operator access allow",
                "Finish with engineering/crew-life context, Pearl Harbor interpretation and a meal at the Mess Deck Café if open"
            ]
        },
        {
            label: "Corpus Christi North Beach family day",
            steps: [
                "Visit USS Lexington early to avoid the hottest flight-deck hours",
                "Use a short aircraft-and-hangar route for younger children and allow breaks",
                "Pair with the separately ticketed Texas State Aquarium nearby, not as part of museum admission"
            ]
        }
    ],
    sources: [
        {
            label: "USS Lexington official admission and accessibility",
            url: "https://usslexington.com/visit/hours-admission/",
            use: "2026 tickets, seasonal hours, elevator, food and parking policies"
        },
        {
            label: "USS Lexington self-guided touring",
            url: "https://usslexington.com/tours/self-guided-tours/",
            use: "Five marked routes, operational touring method and staff assistance"
        },
        {
            label: "USS Lexington flight deck",
            url: "https://usslexington.com/attractions/the-flight-deck/",
            use: "Actual aircraft display, accessible flight deck and LEX LIFT"
        },
        {
            label: "USS Lexington Mess Deck Café",
            url: "https://usslexington.com/visit/mess-deck-cafe/",
            use: "Confirmed café type, hot lunch menu, general-admission condition and serving times"
        },
        {
            label: "USS Lexington attraction roster",
            url: "https://usslexington.com/attractions/",
            use: "Pearl Harbor, theater, simulator and museum displays"
        },
        {
            label: "USS Lexington educational programs",
            url: "https://usslexington.com/learn/education/",
            use: "Advance-booked youth and school arrangements"
        },
        {
            label: "USS Lexington North Beach directions",
            url: "https://usslexington.com/visit/directions-map-how-to-get-to-lex/",
            use: "Real address, coordinates and current all-day parking"
        }
    ],
    connections: [
        {
            label: "Nueces County",
            href: "/county/nueces",
            reason: "Connect the ship's coastal location to Corpus Christi's history and visitor logistics."
        },
        {
            label: "Texas State Aquarium",
            href: "/destination/texas-state-aquarium",
            reason: "A separate North Beach family stop, with separate admission."
        },
        {
            label: "National Museum of the Pacific War",
            href: "/destination/national-museum-pacific-war",
            reason: "Pair carrier-based naval aviation with broader Pacific War interpretation."
        },
        {
            label: "USS Lexington CV-16 history and visitor guide",
            href: "/article/uss-lexington-cv16-history-visitor-guide",
            reason: "Read researched chronology and documented archival ship photographs."
        },
        {
            label: "Texas museum directory",
            href: "/explore/museums",
            reason: "Find other military, maritime and science museums across the state."
        }
    ],
  },
  "sixth-floor-museum-at-dealey-plaza": {
    name: "The Sixth Floor Museum at Dealey Plaza",
    slug: "sixth-floor-museum-at-dealey-plaza",
    county: "Dallas",
    city: "Dallas",
    reviewed: "2026-10-14",
    topics: [
        "presidential-history",
        "dallas-history",
        "museum",
        "civil-rights",
        "family"
    ],
    whyVisit: "The Sixth Floor Museum occupies the former Texas School Book Depository, overlooking the place where President John F. Kennedy was assassinated on November 22, 1963. Unlike a standalone memorial, the museum places the assassination within early-1960s civic life, the Kennedy presidency, investigative evidence and later public memory. The physical building and the view toward Dealey Plaza make its strongest historical material easier to understand on site, but the museum's extensive archival catalog remains the institution's own specialist resource.",
    visitorStrategy: "Plan around a timed museum ticket: current published hours are Wednesday–Sunday, 10 a.m.–5 p.m., with last ticket and entry at 4:15 p.m.; closed Monday and Tuesday. The museum advertises adult admission at $24 online plus a $1 booking fee or $27 onsite, with separate senior and youth prices and free admission for ages 0–5. Reconfirm pricing before booking. Allow roughly two hours for the core sixth-floor exhibition, then spend additional time walking Dealey Plaza outdoors. Paid parking is adjacent but costs vary; oversized vehicles and buses are not accepted in the museum lot. DART West End Station is three blocks east and TRE-connected Union Station is about five blocks south. Food and drinks are not permitted in the galleries; dining is nearby rather than a documented full-service museum restaurant.",
    accessibility: "The museum says all public floors are wheelchair accessible. Its accessible ramp is at the northwest corner, wheelchair loans are first-come at the Visitors Center, accessible parking is available in the adjacent paid lot, and KultureCity sensory bags can be checked out there. ADA service animals are welcome. The material includes photographs, assassination evidence, documentary media and serious subject matter, so families and visitors who find violence or emotionally intense history difficult should plan the visit deliberately. Call 214-747-6660 for individualized accommodations and verify any display-dependent sensory access.",
    familiesAndGroups: "The core exhibit uses historical images, video, documentary evidence and accounts of violent events. Teens studying twentieth-century history may engage deeply, but it is not a hands-on children's museum and adults should decide whether younger children are ready for the subject. The museum publishes special requirements for school visits, including eligible instructional groups of at least 20 students and booking at least three weeks ahead; its separate school-tour page contained an August 31, 2026 cutoff for the earlier school year, so do not promise 2026–27 capacity without a fresh operator confirmation. Ordinary group tours are currently restricted; a separately priced curatorial presentation is not a substitute for individual admission.",
    researchValue: "Start with 1960s social movements and Kennedy's presidency before studying his November 1963 Texas trip, the recreated evidentiary corner window, the immediate crisis and the assassination investigations. The exhibit deliberately distinguishes physical evidence, official investigations and decades of debate. After leaving the building, compare the indoor site interpretation with the accessible public plaza and its memorial setting. The operator provides a free interactive Dealey Plaza guide and maintains historical collection resources for deeper independent research.",
    exhibits: [
        {
            heading: "The early 1960s and Kennedy presidency",
            detail: "Photographs, period films and artifacts establish civil rights, Cold War tensions, presidential life and the political context of the Texas trip."
        },
        {
            heading: "The November 1963 Texas visit",
            detail: "Follow the presidential party through its Texas itinerary to the downtown Dallas motorcade; note how local political conditions shaped public interpretation."
        },
        {
            heading: "Sixth-floor corner-window interpretation",
            detail: "The former crime-scene area is presented using historical photographs, recreated details and views over Dealey Plaza; do not confuse a reconstruction with untouched 1963 objects."
        },
        {
            heading: "Crisis hours and investigations",
            detail: "Compare the event chronology, the death of Officer J. D. Tippit, eyewitness material and investigation displays without treating unresolved public debates as proven facts."
        },
        {
            heading: "Historical memory and personal recollections",
            detail: "Museum memory books and later media show how residents, witnesses and later generations have understood the assassination and its aftermath."
        }
    ],
    routes: [
        {
            label: "Focused two-hour museum visit",
            steps: [
                "Arrive before the reserved timed entry and check in at the Visitors Center",
                "Follow early-1960s context and Texas trip displays before the assassination galleries",
                "Visit sixth-floor exhibits and use the plaza views to understand the location"
            ]
        },
        {
            label: "History-focused downtown half day",
            steps: [
                "Book timed admission and take roughly two hours for the core exhibition",
                "Walk publicly accessible Dealey Plaza and consult the museum's interactive site guide",
                "Continue to JFK Memorial Plaza or a distinct nearby West End history museum"
            ]
        },
        {
            label: "Teen classroom history visit",
            steps: [
                "Review the museum's violence-related subject matter in advance",
                "Use the introductory presidency section and the investigations to distinguish evidence from interpretation",
                "Discuss public memory and arrange any eligible school-tour programming with staff well in advance"
            ]
        }
    ],
    sources: [
        {
            label: "Sixth Floor Museum — Plan Your Visit",
            url: "https://www.jfk.org/plan-your-visit/",
            use: "Current schedule, price bands, parking, group eligibility, accessibility, local transit"
        },
        {
            label: "Sixth Floor Museum — visitation guidelines",
            url: "https://www.jfk.org/plan-your-visit/visitation-guidelines/",
            use: "Timed tickets, last entry, baggage, food and service animals"
        },
        {
            label: "Sixth Floor Museum — accessibility",
            url: "https://www.jfk.org/accessibility/",
            use: "Ramp, wheelchair loans, service animals and KultureCity sensory aids"
        },
        {
            label: "Sixth Floor Museum — core exhibition",
            url: "https://www.jfk.org/exhibition/john-f-kennedy-and-the-memory-of-a-nation/",
            use: "Verified exhibit sections, investigative evidence and historical interpretation"
        },
        {
            label: "Sixth Floor Museum — operator FAQ",
            url: "https://www.jfk.org/faq/",
            use: "Institutional ownership, ticket rules, transit and interpretive aims"
        }
    ],
    connections: [
        {
            label: "Dallas County",
            href: "/county/dallas",
            reason: "Ground museum history in the broader county's civic and cultural landscape."
        },
        {
            label: "Perot Museum of Nature and Science",
            href: "/destination/perot-museum-nature-science-dallas",
            reason: "Offer an age-appropriate family science contrast after a serious history museum."
        },
        {
            label: "Dallas Holocaust and Human Rights Museum",
            href: "/destination/dallas-holocaust-human-rights-museum",
            reason: "Compare separate twentieth-century historical interpretation and public memory in Downtown Dallas."
        },
        {
            label: "Texas museum directory",
            href: "/explore/museums",
            reason: "Find other subject-specific museum guides in Texas."
        }
    ],
  },
  "the-history-center-diboll": {
    name: "The History Center (Diboll)",
    slug: "the-history-center-diboll",
    county: "Angelina",
    city: "Diboll",
    reviewed: "2026-10-13",
    topics: ["texas-history", "railroad-history", "forestry", "family"],
    whyVisit: "The History Center in Diboll is an unusual hybrid of public historical exhibits and regional research archives. A restored 1920 Baldwin steam locomotive and 1948 caboose introduce families to East Texas logging and railroad history, while the indoor Diboll: An Enduring Community panels explain the sawmill-company town, local people and the economic changes that reshaped Angelina County. This is a destination to understand people and place, not a commercial train ride.",
    visitorStrategy: "The operator lists free admission Monday–Friday, 8 a.m.–5 p.m., with Saturday visits by appointment arranged at least two weeks ahead; the center is closed for most major holidays. On a short visit, start with Engine 13 outside, explore the Caboose No. 6 and log car if open, then read the 11-panel community exhibit indoors. Guided tours are free, usually 50–60 minutes, and should be requested at least two weeks in advance. The locomotive is a stationary exhibit, not a train excursion.",
    accessibility: "The operator explicitly calls the outdoor railroad exhibit fully accessible and invites visitors to climb aboard and interact with the locomotive bell and whistle. Not all archival reading facilities or individual archival materials will be appropriate to assume accessible without asking. The research center's staff can advise on group needs and arrangements; the center is on the east side of U.S. Highway 59 at 102 N Temple in Diboll.",
    familiesAndGroups: "The stationary railroad artifacts and bell give children a concrete introduction to logging, engines and transportation. Children interested in engineering may enjoy that part even if an archive visit is less engaging. Free guided programs can be tailored to school and adult group ages. Parents should distinguish an interactive historic locomotive from an operational ride, and check outdoor weather and staff availability.",
    researchValue: "The permanent exhibit covers Diboll's emergence as a lumber-company town and the railroad, workers and community institutions that sustained it. The History Center also preserves photographs, oral histories, regional records and online interpretive exhibitions, including historic Black school communities and sawmill life. Explain that the collections are the museum's specialist research resources: TexasDefined links to them without duplicating the entire archive.",
    exhibits: [
      { heading: "1920 Baldwin Engine 13 and 1948 caboose", detail: "The preserved 68-ton locomotive, log car and caboose trace Texas Southeastern Railroad's connection to Southern Pine Lumber Company; visitors can experience stationary railroad equipment rather than a ride." },
      { heading: "Diboll: An Enduring Community", detail: "Eleven panels and more than 100 photographs trace the town from a sawmill settlement to a modern East Texas community, including workers and transportation." },
      { heading: "Rotating archival exhibits", detail: "The visitor center changes topical displays in the lobby and exhibition space; current titles should be checked with staff because past online exhibitions are not necessarily still on site." },
      { heading: "Online East Texas history interpretation", detail: "Photographs and interpretive materials about railroad labor, education and community life are available digitally as a complement to the exhibits and as independent research." },
    ],
    routes: [
      { label: "Family-friendly 60-minute highlights", steps: ["Start at the accessible locomotive and caboose", "Continue through the eleven panels of Diboll: An Enduring Community", "Ask staff about current hands-on opportunities"] },
      { label: "Research-oriented half-day", steps: ["Book a focused tour or research visit ahead", "Read the indoor historical overview and rotating exhibit", "Use the institution's online finding guides for archival follow-up"] },
    ],
    sources: [
      { label: "History Center current plan-a-visit", url: "https://www.thehistorycenteronline.com/plan-your-visit", use: "Verified access, hours, appointments, free tour information" },
      { label: "History Center exhibit overview", url: "https://www.thehistorycenteronline.com/exhibits", use: "Indoor, outdoor and digital exhibit topics" },
      { label: "History Center Engine 13 exhibit", url: "https://www.thehistorycenteronline.com/exhibits/outdoor-railroad-exhibit", use: "Historical locomotive specifications and accessibility" },
      { label: "History Center historical overview", url: "https://www.thehistorycenteronline.com/about", use: "Organization's remit and public access" },
    ],
    connections: [
      { label: "Angelina County", href: "/county/angelina", reason: "Context for lumber industry and railroad growth" },
      { label: "Texas Forestry Museum", href: "/destination/texas-forestry-museum-lufkin", reason: "Another Angelina County museum with complementary forestry and family activities" },
      { label: "Texas museums", href: "/explore/museums", reason: "Find researched museums across Texas" },
    ],
  },
  "texas-broadcast-museum-kilgore": {
    name: "Texas Broadcast Museum",
    slug: "texas-broadcast-museum-kilgore",
    county: "Gregg",
    city: "Kilgore",
    reviewed: "2026-10-13",
    topics: ["media-history", "texas-history", "technology", "family"],
    whyVisit: "The Texas Broadcast Museum in downtown Kilgore is a distinctive interactive museum dedicated to the technology of television, radio and recorded sound. Its restored 1949 DuMont Telecruiser, historic broadcast cameras, working radio studio and visitor-operable television news set offer an unusually physical look at how sound and pictures reached homes long before smartphones and streaming media.",
    visitorStrategy: "The operator identifies the museum at 416 E Main Street; the City of Kilgore and Texas Association of Broadcasters list Friday and Saturday 10 a.m.–5 p.m., with groups by special appointment. The museum operator currently publishes $10 adult admission, $8 for seniors, students, military and first responders, $5 for ages 3–11, and free admission for younger children. Confirm rates directly before a special trip (903-985-8115). Allow 1–2 hours if you plan to try the studio; a 30-minute stop can miss the hands-on displays.",
    accessibility: "The museum displays large historic vehicles and equipment spread through multiple rooms, so do not assume every item or the Telecruiser interior is step-free or wheelchair accessible. Contact staff before arriving for accessible entry, stroller routes or sensory concerns. Museum admission does not imply separate access to the rentable Studio 4 event space.",
    familiesAndGroups: "The news studio is a compelling hands-on stop for school-age children and teens: visitors can role-play a weather presenter, news anchor or radio DJ. Younger children may benefit from shorter demonstrations and help with delicate equipment. Arrange group tours in advance, and be aware some equipment and broadcast-crime history may be better discussed with older children.",
    researchValue: "The equipment connects analog imaging, electronic transmission and field reporting. A camera associated with Jack Ruby's killing of Lee Harvey Oswald is a historically consequential artifact, but it deserves context about live news and ethics rather than spectacle. The surviving Telecruiser shows how an early mobile television unit differed from today's tiny digital news kits.",
    exhibits: [
      { heading: "1949 DuMont Telecruiser mobile broadcasting vehicle", detail: "The restored truck demonstrates early live television production outside a permanent studio; examine its technical constraints and how large a news production used to be." },
      { heading: "One of ESPN’s original mobile production trucks", detail: "The museum documents an early ESPN remote broadcasting unit, vehicle 327, preserved inside and available for public viewing. Compare this later sports-broadcast truck with the 1949 DuMont Telecruiser; do not assume either is an operational vehicle." },
      { heading: "Camera associated with the Jack Ruby–Lee Harvey Oswald shooting", detail: "This historically significant news camera introduces questions about live coverage, news ethics and the technical limits of early television broadcasting." },
      { heading: "Hands-on television news studio", detail: "The working television set lets visitors practice announcing news and weather; check current equipment availability when booking a group." },
      { heading: "Working radio studio and antique recording equipment", detail: "The working DJ setup and vintage recording and playback devices illustrate the transition from mechanical sound to broadcast radio." },
      { heading: "Historic cameras, microphones, switchboards and radios", detail: "The equipment lineup helps visitors understand how analog recording, switchboards and transmission developed across generations." },
    ],
    routes: [
      { label: "Hands-on broadcasting in 90 minutes", steps: ["Begin at the DuMont mobile television truck", "Compare camera and recording technology", "Try the radio and TV studio activities if available"] },
      { label: "Kilgore industry and technology day", steps: ["Tour the broadcast equipment and historical news technology", "Visit nearby downtown Kilgore museums using independently confirmed hours", "Use Gregg County's oil and railroad history as context"] },
    ],
    sources: [
      { label: "Texas Broadcast Museum operator homepage", url: "https://texasbroadcastmuseum.com/", use: "Exhibit identities and operating organization" },
      { label: "Texas Broadcast Museum — ESPN remote unit", url: "https://texasbroadcastmuseum.com/espn-mobile-unit/", use: "Operator-confirmed ESPN mobile truck 327 preserved and open to viewing" },
      { label: "Texas Broadcast Museum collections", url: "https://texasbroadcastmuseum.com/museum/", use: "Named artifacts and hands-on activities" },
      { label: "City of Kilgore cultural district listing", url: "https://cityofkilgore.com/293/Kilgore-Cultural-District", use: "Opening times, address, appointment access" },
      { label: "Texas Association of Broadcasters 2026 museum profile", url: "https://tabshow.org/texas-broadcast-museum/", use: "Recent ticket tiers, group entry and hours" },
      { label: "Operator's visitor reviews", url: "https://texasbroadcastmuseum.com/reviews/", use: "Observed visitor questions/experiences; not policy verification" },
    ],
    connections: [
      { label: "Gregg County", href: "/county/gregg", reason: "Kilgore culture and oil-boom heritage" },
      { label: "Texas museums", href: "/explore/museums", reason: "Explore other specialized science, media and technology museums" },
      { label: "Texas science and technology", href: "/texas-science-technology-industry", reason: "Broader technical and industrial context" },
    ],
  },
  "the-agricultural-museum-arts-center-boerne": {
    name: "The AgriCultural Museum & Arts Center",
    slug: "the-agricultural-museum-arts-center-boerne",
    county: "Kendall", city: "Boerne", reviewed: "2026-10-13",
    topics: ["agriculture", "texas-history", "family", "art"],
    whyVisit: "The AgriCultural Museum & Arts Center connects Texas Hill Country farming and rural life with living craft demonstrations, antique machinery and community arts. Founded in 1986 as the Agricultural Heritage Center and renamed in 2018, this five-acre nonprofit site is more than a room of objects: families can see tractors and engines, the Big Red Barn, a pioneer house, blacksmith workshop, woodshop, farm wagons and scheduled demonstrations. Do not confuse the old Agricultural Heritage Museum name with a separate, still-operating museum.",
    visitorStrategy: "The operator publishes regular museum hours Saturday 10 a.m.–4 p.m. at 102 City Park Road in Boerne. Admission is by donation, not a required ticket price. Self-guided visits can cover the barn, historic agricultural machinery and demonstration spaces; whether a blacksmith works that day or a craft event is running should be checked against the calendar. Second and fourth Saturdays normally include 11 a.m.–1 p.m. bluegrass jams, and the third Saturday is listed for the HandCrafted Market. Allow an estimated one to two hours for the museum, longer for an event.",
    accessibility: "The five-acre grounds combine outdoor machinery, historic structures and indoor rooms; surfaces, thresholds and active workshops can vary. Neither the operator's visitor page nor Boerne's city listing establishes that every workshop, pioneer house, restroom or event space is wheelchair accessible. Ask visitor services at 210-445-1080 for a specific step-free route or sensory accommodations, especially in wet weather.",
    familiesAndGroups: "Tractors, engines, buggies and hands-on blacksmith demonstrations provide concrete ways for families to discuss work in the historical Hill Country. Children should be supervised around antique machinery and active forge or craft demonstrations. Some visits are quieter self-guided museum exploration, while tractor pulls, markets, art workshops and bluegrass sessions may be noisy or crowded. No ordinary museum cafeteria or full-service restaurant is confirmed; food or bar arrangements advertised for private rentals should not be presented as walk-in dining.",
    researchValue: "Unlike a generic farm-equipment collection, this site lets readers examine how agriculture, machine power, blacksmithing, woodworking and domestic life fit together. A self-guided circuit can connect individual exhibits to nineteenth- and twentieth-century rural changes. The operator's transition from Agricultural Heritage Center to the AgriCultural Museum & Arts Center in 2018 also helps explain how preservation and community arts coexist at the same site.",
    exhibits: [
      { heading: "Big Red Barn and antique farm implements", detail: "The barn holds preserved tractors, a buggy, chuck wagon, vintage agricultural tools and equipment illustrating field work, transport and mechanization in Hill Country agriculture." },
      { heading: "Working blacksmith shop", detail: "The museum advertises Saturday blacksmith demonstrations. Watch techniques and discuss how skilled metalwork supported farms and settlements, but verify the actual day's demonstrator schedule." },
      { heading: "Woodworking shop and pioneer house", detail: "Historic work and domestic spaces connect agricultural production to carpentry, household labor and the everyday needs of earlier rural families." },
      { heading: "Arts, tractor pulls and bluegrass gatherings", detail: "The museum now holds community programs as well as historical objects. Tractor pulls, second- and fourth-Saturday music, art workshops and monthly markets have their own dates; distinguish events from daily-access exhibits." }
    ],
    routes: [
      { label: "Saturday museum highlights", steps: ["Start in the Big Red Barn with tractors and farm equipment", "Visit the blacksmith and woodworking areas during their posted public demonstrations", "Walk past the pioneer house and outdoor exhibits, allowing for weather and accessibility"] },
      { label: "Boerne family and heritage half day", steps: ["Tour the AgriCultural on a regular Saturday", "Stay for a bluegrass jam or handcraft market only when scheduled", "Explore Boerne's other historical attractions as separate admissions and visits"] }
    ],
    sources: [
      { label: "Museum operator — current visitor details", url: "https://theagricultural.org/visit-the-agricultural/", use: "Current hours, donations, five-acre layout, barn, blacksmithing, exhibits, events and address" },
      { label: "City of Boerne — current institution profile", url: "https://www.ci.boerne.tx.us/1438/The-AgriCultural-Museum-Arts-Center", use: "Confirms renamed museum, distinct workshop areas, historical equipment and event/rental context" },
      { label: "Museum operator — history and event calendar", url: "https://theagricultural.org/", use: "1986 founding, 2018 name change, Saturday hours and recurring public programming" }
    ],
    connections: [
      { label: "Kendall County", href: "/county/kendall", reason: "Connect the museum to Boerne and the wider Hill Country's rural heritage." },
      { label: "Texas museum directory", href: "/explore/museums", reason: "Compare farm history and living-craft museums around Texas." }
    ],
  },
  "crow-museum-asian-art-dallas": {
    name: "Crow Museum of Asian Art — Dallas Arts District",
    slug: "crow-museum-asian-art-dallas",
    county: "Dallas",
    city: "Dallas",
    reviewed: "2026-10-13",
    topics: ["art", "asian-cultures", "family", "accessibility"],
    whyVisit: "The Crow Museum's downtown Dallas galleries offer a concentrated look at Asian art and contemporary artistic conversations without charging general admission. It operates TWO locations—this is the Dallas Arts District guide, not the separate UT Dallas campus museum in Richardson. Visitors should focus on the galleries actually on view and compare Asian art traditions across periods rather than assuming every object in the collection is always exhibited.",
    visitorStrategy: "The Dallas Arts District museum is at 2010 Flora Street and operates Tuesday–Sunday 11 a.m.–5 p.m.; Mondays and major holidays are closed. Admission is free, although donations are encouraged. The Trammell Crow Center garage is paid for nonmembers; visitors using Dallas transit can walk from Arts District stations. Confirm temporary closure dates and the exhibit location because a Crow exhibition may be at either Dallas or Richardson.",
    accessibility: "The Flora Street main entrance near Olive Street is the step-free public route. Visitors entering from the Trammell Crow Center garage may need security help to reach an alternate ramp entrance rather than following stairs. Contact the front desk for specific accessible entry arrangements. The Dallas Arts District and Richardson campus parking instructions are not interchangeable.",
    familiesAndGroups: "Free admission suits a short arts outing with older children and families. Children can compare artistic materials and subjects in a manageable gallery visit; confirm special family activities rather than assuming a permanent children's playroom. The museum site does not substantiate an on-site full-service restaurant, so arrange meals in the Arts District.",
    researchValue: "The museum is part of the University of Texas at Dallas and now maintains a campus counterpart in Richardson. Independent guides should distinguish these physically separate institutions and specify where an exhibition actually appears. The Dallas site has hosted Paper Knife: Objects of Beauty in Early Modern Japan, Du Chau: Tracing the Threads of Memory and other dated rotating exhibitions; dates should be checked before a dedicated visit.",
    exhibits: [
      { heading: "Paper Knife: Objects of Beauty in Early Modern Japan", detail: "An advertised temporary exhibition exploring beautifully crafted objects and material culture; operator dates run November 8, 2025–August 29, 2027." },
      { heading: "Du Chau: Tracing the Threads of Memory", detail: "A 2026–2027 Dallas Arts District exhibition examining material, memory and artistic practice; check current gallery availability." },
      { heading: "Rotating Asian art exhibitions", detail: "The museum offers changing displays of historical and contemporary Asian art. Review the Dallas-specific schedule rather than treating campus exhibitions as downtown exhibits." },
    ],
    routes: [
      { label: "Downtown Crow introduction", steps: ["Enter at Flora Street and confirm the day's Dallas exhibition list", "Choose two galleries to compare material and cultural context", "Walk the Arts District or visit another verified nearby art museum"] },
      { label: "Dallas museum comparison", steps: ["Start with the Crow's focused Asian art program", "Continue to nearby Dallas Museum of Art for broader global collections", "Avoid routing to Richardson without a separate transit or driving plan"] },
    ],
    sources: [
      { label: "Crow Dallas Arts District location", url: "https://crowmuseum.org/dallas-arts-district/", use: "Entrance, hours, garage and free admission" },
      { label: "Crow general visitor FAQ", url: "https://crowmuseum.org/about-the-museum/faqs/", use: "Visitor questions, policies and distinction between the two sites" },
      { label: "Crow current exhibitions by venue", url: "https://crowmuseum.org/visit/", use: "Exhibit location and dates" },
      { label: "Crow accessible entrances", url: "https://crowmuseum.org/where-to-park/", use: "Step-free arrival and garage assistance" },
    ],
    connections: [
      { label: "Dallas Museum of Art", href: "/destination/dallas-museum-of-art", reason: "Nearby global-art comparison." },
      { label: "Dallas County", href: "/county/dallas", reason: "Arts District cultural context." },
      { label: "African American Museum Dallas", href: "/destination/african-american-museum-dallas-fair-park", reason: "Another Dallas museum with a different mission." },
    ],
  },
  "museum-of-the-american-railroad-frisco": {
    name: "Museum of the American Railroad",
    slug: "museum-of-the-american-railroad-frisco",
    county: "Collin",
    city: "Frisco",
    reviewed: "2026-10-13",
    topics: ["railroads", "texas-history", "family", "engineering"],
    whyVisit: "The Museum of the American Railroad offers two distinct experiences in Frisco: an indoor TrainTopia model railroad exhibit and staff-led walking tours through the historic full-sized rolling-stock collection. It is especially useful for families who want to compare model railroads, freight and passenger equipment with enormous locomotives. The operator's two ticket types and different day schedules are central to planning.",
    visitorStrategy: "Start at TrainTopia inside the Frisco Discovery Center, 8004 N Dallas Parkway, Suite 400. TrainTopia generally opens Wednesday–Saturday 10 a.m.–5 p.m. and Sunday 1–5 p.m. Outdoor walking tours run Wednesday–Saturday with no Sunday tours and can have reduced daily departures; the museum currently flags September 30–October 17 for 11 a.m.-only Wednesday–Friday departures. The advertised adult TrainTopia ticket is $12 and adult combined walking-tour ticket $18, subject to change. Book the actual time slot in advance.",
    accessibility: "The indoor TrainTopia venue and outdoor rolling-stock tour should not be treated as equally accessible. The museum lists a dedicated walking-tour accessibility contact (jgarbutt@historictrains.org). Railway grounds and equipment can involve outdoor uneven surfaces or stairs, and the operator does not promise universal boarding of historic cars. Ask staff for precise wheelchair and mobility accommodations before purchasing an outdoor tour.",
    familiesAndGroups: "TrainTopia is an approachable indoor experience for young children and rail fans, including a large model layout and scavenger hunts. Some walking tours may be less suitable for toddlers or visitors who cannot walk the full route. Under-three visitors are currently free for the published ticket categories; ages 3–12 have reduced prices. Food service in the Frisco Discovery Center is not established by the museum's visit page—plan snacks and meals separately.",
    researchValue: "The museum's full-sized rolling stock includes historically significant steam, diesel-electric and electric equipment, rail passenger cars and cabooses. Its virtual tour names Union Pacific Big Boy 4018, Centennial 6913, Pennsylvania GG1 and several passenger cars; these are collection objects, not a guarantee that each may be entered or handled on every tour. Separating outdoor collections from the indoor model exhibit prevents misleading visitor expectations.",
    exhibits: [
      { heading: "TrainTopia large-scale model railroad", detail: "A permanent indoor model-train experience with carefully modeled scenes and downloadable family scavenger hunts. A TrainTopia ticket is not automatically an outdoor tour." },
      { heading: "Union Pacific Big Boy and historic locomotives", detail: "The rolling-stock collection includes large locomotives such as UP 4018 and UP Centennial 6913, best interpreted through a guided tour; specific access depends on safety and operations." },
      { heading: "Passenger cars and everyday rail travel", detail: "Historic dining, lounge and passenger cars connect railway engineering to how people worked, traveled and socialized." },
      { heading: "Virtual tour from home", detail: "The museum's online equipment descriptions are useful for research and preparation before choosing an outdoor time slot." },
    ],
    routes: [
      { label: "Indoor family visit", steps: ["Book TrainTopia admission and find the Frisco Discovery Center entrance", "Explore the model railway and choose an age-appropriate scavenger hunt", "Check the exit time and nearby city attractions before leaving"] },
      { label: "Rail enthusiast visit", steps: ["Reserve a specific outdoor walking tour and verify accessibility/weather", "Explore locomotives and passenger equipment with the docent", "Add TrainTopia using the combination ticket if desired"] },
    ],
    sources: [
      { label: "Museum official visiting calendar and fees", url: "https://www.historictrains.org/visit", use: "Distinct admissions, times and location" },
      { label: "TrainTopia activities", url: "https://www.historictrains.org/traintopia", use: "Model railway, scavenger hunts and indoor visitor experience" },
      { label: "Museum rolling stock virtual tour", url: "https://www.historictrains.org/virtual-tour", use: "Equipment names and interpretive research" },
      { label: "Museum institutional background", url: "https://www.historictrains.org/mission", use: "Institutional purpose and public contact" },
    ],
    connections: [
      { label: "Collin County", href: "/county/collin", reason: "North Texas railroad and city context." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare transportation collections with other museums." },
    ],
  },
  "armstrong-browning-library-museum-waco": {
    name: "Armstrong Browning Library & Museum",
    slug: "armstrong-browning-library-museum-waco",
    county: "McLennan",
    city: "Waco",
    reviewed: "2026-10-13",
    topics: ["literature", "architecture", "art", "history"],
    whyVisit: "Baylor's Armstrong Browning Library is unusual among Texas museums because its architecture and stained-glass interpretations of Victorian poetry are attractions in their own right. Visitors who have never read Robert Browning or Elizabeth Barrett Browning can still experience the gilded McLean Foyer, art and historical rooms, while scholars can arrange separate access to rare material.",
    visitorStrategy: "Go to 710 Speight Avenue on the Baylor campus and use designated visitor parking along 8th Street or James Avenue. Admission to the museum rooms is free. A self-guided visit is appropriate for walk-ins; docent availability varies and groups of ten or more should book two weeks ahead. General exhibition visiting and registration to consult noncirculating manuscripts are different experiences.",
    accessibility: "Baylor directs visitors with disabilities to use the James Avenue rear entrance, where staff can help with accessible access. Main rooms include floors served by the building; ask about any specific stairs or arrangements ahead of a group visit. Designated parking is on 8th and James, and repeat campus visitors may need to register their vehicle.",
    familiesAndGroups: "A quiet museum of poetry, artwork, painted ceilings, book history and stained glass suits teens, adults and families with curious older children better than preschoolers seeking interactive play. Baylor welcomes school groups but expects advance scheduling for large parties. Photography sessions, weddings and events have their own separate permissions and must not be confused with ordinary visiting.",
    researchValue: "Baylor maintains a noncirculating, research-level collection associated with the Brownings. The visitor guide should introduce the striking rooms and literary themes, then direct researchers to advance registration and the third-floor Belew Scholars' Room, rather than trying to reproduce catalog holdings or implying visitors may handle manuscripts casually.",
    exhibits: [
      { heading: "McLean Foyer of Meditation", detail: "The building's luminous foyer uses a richly decorated dome, marble and broad artistic surfaces to place poetry in a memorable physical setting." },
      { heading: "Hankamer Treasure Room", detail: "Stained-glass windows interpret Browning poems alongside objects, artworks and family associations; displays may change, so read the room's current labels." },
      { heading: "Leddy-Jones Research Hall", detail: "This quiet hall reflects the institution's dual role as a visitor destination and working university research library; public access and material consultation are separate activities." },
    ],
    routes: [
      { label: "Self-guided architecture and literature", steps: ["Enter at the visitor-appropriate Baylor campus door", "Explore foyer and stained-glass interpretation", "Visit open exhibition rooms without disturbing readers"] },
      { label: "Scholarly research appointment", steps: ["Contact curators about materials before traveling", "Register with identification and agree to handling conditions", "Consult requested items only in the designated research room"] },
    ],
    sources: [
      { label: "Baylor official visitor guidance", url: "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit", use: "Free admission and general public access" },
      { label: "Baylor tour policy", url: "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/tours", use: "Group advance booking and self-guided visiting" },
      { label: "Baylor parking and accessible entrance", url: "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/directions-parking", use: "Street access and mobility route" },
      { label: "Baylor gallery map and rooms", url: "https://library.web.baylor.edu/visit/armstrong-browning-library-museum/visit/building-map-online-tour", use: "Room interpretation and visitor atmosphere" },
    ],
    connections: [
      { label: "McLennan County", href: "/county/mclennan", reason: "Combine a Baylor literary site with wider Waco history." },
      { label: "Waco Museum of Science and History", href: "/destination/mayborn-museum-waco", reason: "Family-focused museum with a very different hands-on visitor experience." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare heritage museums across the state." },
    ],
  },
  "bell-county-museum-belton": {
    name: "Bell County Museum",
    slug: "bell-county-museum-belton",
    county: "Bell",
    city: "Belton",
    reviewed: "2026-10-13",
    topics: ["archaeology", "texas-history", "family"],
    whyVisit: "The Bell County Museum occupies a restored 1904 Carnegie Library in downtown Belton. A visit works both as an introduction to Central Texas local history and as a way to understand early human activity through interpretation of the Gault archaeological site, with rotating exhibits and family programs linking the county's past to the present.",
    visitorStrategy: "Find the museum at 201 North Main Street in Belton. The official site lists noon to 5 p.m. Tuesday through Friday and 10 a.m. to 5 p.m. Saturday; regular admission is free. Visitors can start with the Carnegie building and Gault Site interpretation, then take in the current traveling gallery. Family programs have independent dates and registration requirements.",
    accessibility: "The museum FAQ confirms wheelchair-accessible entrances, an elevator to the second floor and accessible first-floor restrooms. The research and genealogy library is available for in-library use, not circulation. Photographing exhibits is generally allowed when done carefully; special programs or loans can have additional posted rules.",
    familiesAndGroups: "Hands-on history and early-learner programming make this a reasonable stop with school-age children, with activities varying by calendar. Small children may enjoy an event like Tiny Thinkers more than a text-heavy historical display. The museum's no-food-in-galleries rule should be respected; make meal arrangements in downtown Belton separately.",
    researchValue: "The site offers an unusually accessible introduction to the Gault archaeological evidence alongside local settlement and social history. Visitors interested in family history can ask to use on-site materials, but the genealogy library's references must remain in the building; readers should not confuse public exhibition access with permission to remove archival items.",
    exhibits: [
      { heading: "Gault Site archaeology", detail: "Interpretation of this Central Texas archaeological landmark helps visitors understand human settlement far deeper in time than the founding of Belton." },
      { heading: "Carnegie Library as historical object", detail: "The museum occupies an early-20th-century library building, providing a direct lesson in public education and civic infrastructure." },
      { heading: "Changing Bell County exhibitions", detail: "Traveling displays and county artifacts vary; use the current exhibition listing instead of treating temporary installations as permanent." },
    ],
    routes: [
      { label: "One-hour town-history visit", steps: ["Begin with the historic Carnegie building", "Read the Gault Site displays and Bell County stories", "Check the changing exhibit before leaving"] },
      { label: "Family afternoon in Belton", steps: ["Attend a posted museum family program when available", "Visit age-appropriate galleries", "Walk downtown or find dining outside the galleries"] },
    ],
    sources: [
      { label: "Museum official visiting and free admission", url: "https://www.bellcountymuseum.org/p/visit", use: "Location and interpretation" },
      { label: "Museum official FAQ", url: "https://www.bellcountymuseum.org/p/visit/faqs", use: "Photography, accessibility, genealogy room, food restrictions" },
      { label: "Museum posted hours", url: "https://www.bellcountymuseum.org/directions.aspx", use: "Operating days and address" },
      { label: "Museum public-program calendar", url: "https://www.bellcountymuseum.org/events", use: "Current programs and events" },
    ],
    connections: [
      { label: "Bell County", href: "/county/bell", reason: "Place the museum in Belton and Temple history." },
      { label: "Czech heritage in Temple", href: "/destination/czech-heritage-museum-genealogy-center-temple", reason: "Related nearby cultural history with a different focus." },
      { label: "Texas museums", href: "/explore/museums", reason: "Browse verified public museum guides." },
    ],
  },
  "brenham-heritage-museum": {
    name: "Brenham Heritage Museum",
    slug: "brenham-heritage-museum",
    county: "Washington",
    city: "Brenham",
    reviewed: "2026-10-13",
    topics: ["texas-history", "agriculture", "immigration", "family"],
    whyVisit: "Brenham Heritage Museum uses the restored federal post-office building to tell Washington County stories through art, agriculture, transportation, immigration and civic history. Its exhibit balance matters: visitors learn both celebratory local traditions like Maifest and difficult chapters including slavery and Reconstruction rather than receiving a single nostalgic account.",
    visitorStrategy: "The museum is at 105 South Market Street, generally open Tuesday to Saturday 10 a.m. to 4 p.m. Adults are currently listed at $10, with age and veteran discounts; toddlers four and under are free. For October 16–18, 2026, the operator advertises extended hours and free admission connected with the local arts festival. Do not confuse those dates with everyday hours.",
    accessibility: "The museum explicitly directs wheelchair and stroller visitors to the rear entrance with its ramp and elevator. The main museum lot has steep access ramps unsuitable for large buses; drivers can use alternate signed parking at the museum office or fire museum and drop passengers near the rear lift entrance on East Main Street.",
    familiesAndGroups: "Interactive post-office boxes, media exhibits and regional stories give schoolchildren several entry points. Families should choose portions appropriate to a child's age when visiting sections about slavery and historic conflict. Organized school and general group visits can cost differently from individual admission; guided tours are by appointment.",
    researchValue: "Exhibits connect Washington County's early population, German and other European immigration, enslaved labor, Reconstruction, agriculture and industry. The museum's timeline helps visitors interpret events in context, while material from its photo and local-history holdings is a starting point for further archival investigation rather than a catalogue to copy into TexasDefined.",
    exhibits: [
      { heading: "Immigration, slavery and Reconstruction kiosks", detail: "Interpret interactive stations together to show the people and labor behind the county's growth, not just its civic milestones." },
      { heading: "Maifest, transportation and agricultural life", detail: "The museum brings local community celebrations and farming systems into a shared timeline for understanding Brenham's distinctive development." },
      { heading: "Historic post-office interactive exhibits", detail: "The restored civic building, postal boxes and multimedia stations create an accessible way to explore daily life and communications." },
      { heading: "October 2026 arts festival displays", detail: "Current temporary art displays are listed for October 1–31, 2026, and should be removed from the description after the festival ends." },
    ],
    routes: [
      { label: "60–90-minute regional history visit", steps: ["Start with the county timeline and museum building", "Use immigration and Reconstruction sections to understand complex historical context", "Explore farming, postal and Maifest interpretation"] },
      { label: "Brenham heritage afternoon", steps: ["Tour the museum during confirmed public hours", "Walk the adjacent downtown historic streets", "Add another Washington County historic site as a separate visit"] },
    ],
    sources: [
      { label: "Brenham Heritage Museum visitor rules", url: "https://www.bhmtexas.org/visit", use: "Rates, hours, access and alternate parking" },
      { label: "Museum current exhibits", url: "https://www.bhmtexas.org/visit/exhibits", use: "Gallery themes and changing exhibitions" },
      { label: "Museum homepage", url: "https://www.bhmtexas.org/", use: "Institutional identity and upcoming events" },
    ],
    connections: [
      { label: "Washington County", href: "/county/washington", reason: "Explore the area that shaped Texas independence and agriculture." },
      { label: "Texas museums", href: "/explore/museums", reason: "More independently researched museum visits." },
      { label: "Texas small towns", href: "/explore/small-towns", reason: "Build a broader Central Texas trip beyond one stop." },
    ],
  },
  "audie-murphy-american-cotton-museum-greenville": {
    name: "Audie Murphy/American Cotton Museum",
    slug: "audie-murphy-american-cotton-museum-greenville",
    county: "Hunt",
    city: "Greenville",
    reviewed: "2026-10-13",
    topics: ["military-history", "agriculture", "texas-history", "family"],
    whyVisit: "Greenville's museum combines two stories that rarely appear together: the economic and human history of cotton production in Hunt County and military service ranging from the world wars to Audie Murphy's decorated service. Historic machinery, home-life dioramas and outdoor memorials create a more layered visit than a single hero exhibit.",
    visitorStrategy: "Visit at 600 Interstate 30 East in Greenville, with regular hours Tuesday through Saturday 10 a.m. to 5 p.m.; the museum closes Sunday, Monday and major holidays. The operator's admissions page gives adults $10, but conflicting child and college categories appear on its website, so confirm the applicable youth/student rate directly before arriving. Groups of ten or more must reserve guided tours in advance.",
    accessibility: "The museum says it is accessible and that one wheelchair and one walker are available on a first-come basis. Because its grounds extend beyond the main galleries to a historic house and war memorial, guests needing a step-free route should confirm specific outdoor pathways or historic-building access instead of assuming every stop is identical.",
    familiesAndGroups: "School-age children can compare cotton processing and technology with home-life displays, while teens may engage deeply with the personal stories of wartime service. There are depictions of weapons, combat and loss; adults should decide what is suitable for younger children. Outdoor picnic facilities are advertised, but the site does not establish a full-service museum restaurant.",
    researchValue: "Hunt County's cotton compress became an important industrial landmark, and the museum interprets farm, labor, rail and manufacturing systems behind production. Paired military exhibits and the memorial encourage a more complete understanding of community history; the preserved Ende-Gaillard house adds a domestic perspective and should be treated as a separate historic structure.",
    exhibits: [
      { heading: "Military Hall of Heroes", detail: "About 3,700 square feet of displays include a World War I trench interpretation and context on local and national military figures, including Audie Murphy." },
      { heading: "Cotton compress and steam machinery", detail: "Cotton production and processing are explained with historic equipment linked to Greenville's once-important cotton shipping economy." },
      { heading: "Ende-Gaillard historic house", detail: "The grounds include a house dating from the late 1850s; check house access independently from main-gallery opening." },
      { heading: "Audie Murphy and Hunt County memorial", detail: "The outdoor memorial honors residents killed during twentieth-century military service and adds a solemn context to the galleries." },
    ],
    routes: [
      { label: "Cotton and community history", steps: ["Begin with the cotton displays and processing technology", "Explore farm, sharecropper and household interpretation", "Check access to the historic house and outdoor grounds"] },
      { label: "Military history in one visit", steps: ["Read Audie Murphy's exhibits and the Military Hall of Heroes", "Consider the broader local service records instead of focusing solely on one figure", "Visit the outdoor memorial with appropriate respect"] },
    ],
    sources: [
      { label: "Official visiting information", url: "https://cottonmuseum.com/visit/", use: "Admission, access, hours and group booking" },
      { label: "Museum homepage and gallery highlights", url: "https://cottonmuseum.com/", use: "Distinct museum missions and exhibition areas" },
      { label: "Museum history and grounds", url: "https://cottonmuseum.com/about/", use: "Ende-Gaillard House and Hunt County memorial" },
    ],
    connections: [
      { label: "Hunt County", href: "/county/hunt", reason: "Explain Greenville's cotton economy, wartime service and rail connections." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare history, agriculture and military museums." },
      { label: "National Museum of the Pacific War", href: "/destination/national-museum-pacific-war", reason: "Complement a local service story with a separate specialist World War II museum." },
    ],
  },
  "brazos-valley-museum-natural-history-bryan": {
    name: "Brazos Valley Museum of Natural History",
    slug: "brazos-valley-museum-natural-history-bryan",
    county: "Brazos",
    city: "Bryan",
    reviewed: "2026-10-13",
    topics: ["natural-history", "archaeology", "family"],
    whyVisit: "Bryan's Brazos Valley Museum introduces natural and cultural history in one affordable stop. Its exhibits and education programming connect fossils, wildlife, mineral resources, archaeological evidence and the people of the Brazos Valley; visitors can extend the indoor visit into nearby Boonville Heritage Park when weather and access are suitable.",
    visitorStrategy: "Visit at 3232 Briarcrest Drive in Bryan, normally Tuesday through Saturday from 10 a.m. to 5 p.m. General adult admission is listed at $5, with a discount for children, seniors and students, and free entry for children three and under with a paying adult. The first Tuesday each month is currently a $1 admission day.",
    accessibility: "The museum publishes a website accessibility commitment, but that does not on its own verify all physical gallery door widths, wheelchair access or sensory facilities. Ask the operator directly about specific mobility or sensory needs, and plan outdoor Boonville Heritage Park separately from indoor museum access.",
    familiesAndGroups: "The museum organizes children's nature camps, school programs, birthday activities and science education throughout the year. Families with toddlers may prefer a short gallery visit, while primary and middle-school learners can use the natural-history displays and educational kits. A scheduled nature camp should never be mistaken for daily drop-in programming.",
    researchValue: "Displays connect Brazos Valley wildlife and geology with archaeology and local cultural history, helping readers place their daily landscape in deep natural time. The museum's mission explicitly includes stewardship, so the guide can discuss preservation and environmental responsibility without pretending to reproduce or provide access to an institutional collections inventory.",
    exhibits: [
      { heading: "Natural science and wildlife interpretation", detail: "Use specimens and ecological storytelling to connect familiar Central Texas wildlife to the Brazos Valley habitats where it lives." },
      { heading: "Regional archaeology and cultural history", detail: "Interpret everyday community history and early settlement evidence alongside natural resources without confusing modern and prehistoric time scales." },
      { heading: "School discovery programs", detail: "Nature camps and educational outreach give families ways to explore science more deeply, but registration and dates must be checked for each program." },
    ],
    routes: [
      { label: "Indoor natural-history highlights", steps: ["Start with the museum's regional science displays", "Include one cultural-history or archaeology stop", "Ask staff about any seasonal exhibition"] },
      { label: "Family outdoor extension", steps: ["Tour the museum during paid public admission hours", "Check weather and access for Boonville Heritage Park", "Use county guides to connect the two subjects"] },
    ],
    sources: [
      { label: "Museum official visitor information", url: "https://www.brazosvalleymuseum.org/visit", use: "Operating hours, address, admissions and Dollar Days" },
      { label: "Museum institutional mission and programming", url: "https://www.brazosvalleymuseum.org/about-the-museum", use: "Camps, school programs, stewardship and exhibits" },
      { label: "Museum website accessibility statement", url: "https://www.brazosvalleymuseum.org/accessibility", use: "Clarify limits of website versus physical-access information" },
    ],
    connections: [
      { label: "Brazos County", href: "/county/brazos", reason: "Relate nature and heritage to Bryan and College Station." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare family-friendly science and history programs." },
      { label: "Bell County Museum", href: "/destination/bell-county-museum-belton", reason: "Another Central Texas institution combining archaeology and local history." },
    ],
  },
  "czech-heritage-museum-genealogy-center-temple": {
    name: "Czech Heritage Museum & Genealogy Center",
    slug: "czech-heritage-museum-genealogy-center-temple",
    county: "Bell",
    city: "Temple",
    reviewed: "2026-10-13",
    topics: ["immigration", "heritage", "genealogy"],
    whyVisit: "Temple's Czech Heritage Museum & Genealogy Center connects Czech and Czech-Texan immigration to the domestic arts, clothing, family histories, cultural organizations and traditions that still influence Central Texas. It is both a modest visitor museum and a place to ask how migration and family records connect people to the region.",
    visitorStrategy: "The museum is at 119 West French Avenue in Temple and currently lists Thursday through Saturday from 10 a.m. to 4 p.m. Published basic admission is $4 for adults, $3 for seniors aged 60 and older, and $2 for children twelve and under. Self-guided visiting and arranged guided tours are separate options; book organized groups rather than assuming walk-in guide availability.",
    accessibility: "The operator publishes a location map and contact information but does not substantiate every building accessibility feature on its general visit pages. Visitors requiring wheelchair entry, accessible toilets, seating or sensory accommodations should contact the museum before travel rather than trusting inferred amenities.",
    familiesAndGroups: "Families can use material culture, maps of immigration and traditional dolls to begin conversations about language, clothing, foodways and cultural continuity. A genealogical research session is different from hands-on children's play, and families with very young children may prefer a shorter guided introduction. Schools and clubs can request groups or guided tours.",
    researchValue: "The center is a point of connection for Czech-Texan genealogy and migration records. Its exhibits allow visitors to explore why families arrived and formed communities in Texas, while detailed genealogical inquiry may require advance coordination. Link interested readers to the museum's own archive services instead of copying family data or unverified lineage claims.",
    exhibits: [
      { heading: "Czech immigration to Central Texas", detail: "Regional maps and interpretation trace where Czech-speaking immigrants settled and formed communities, providing context for familiar towns and festivals." },
      { heading: "Traditional clothing, dolls and domestic arts", detail: "Artifacts and folk material from Czech families illustrate craft, clothing and cultural identity in ways that complement written history." },
      { heading: "Genealogy center and family stories", detail: "The center helps visitors pursue documentary family history; access to specialist resources should be arranged under the museum's actual research policies." },
    ],
    routes: [
      { label: "45–90-minute heritage introduction", steps: ["Visit the cultural exhibits during confirmed public hours", "Explore migration and family-history themes", "Ask staff about any temporary show or research display"] },
      { label: "Genealogy-oriented appointment", steps: ["Contact the museum about records before travel", "Bring known family names and dates to refine research questions", "Explore Temple's linked local-history destinations"] },
    ],
    sources: [
      { label: "Museum official visiting hours and admission", url: "https://czechheritagemuseum.org/contact-us", use: "Published fees, days and address" },
      { label: "Museum tour choices and directions", url: "https://czechheritagemuseum.org/plan-your-visit", use: "Self-guided and advance group tours" },
      { label: "Museum official home", url: "https://czechheritagemuseum.org/", use: "Institution, exhibits and genealogy mission" },
    ],
    connections: [
      { label: "Bell County", href: "/county/bell", reason: "Place Czech-Texan heritage alongside Temple history." },
      { label: "Bell County Museum", href: "/destination/bell-county-museum-belton", reason: "Visit a nearby general county-history museum for wider context." },
      { label: "Texas museums", href: "/explore/museums", reason: "Find related cultural and immigrant-history museums." },
    ],
  },
  "buffalo-soldiers-national-museum-houston": {
    name: "Buffalo Soldiers National Museum",
    slug: "buffalo-soldiers-national-museum-houston",
    county: "Harris",
    city: "Houston",
    reviewed: "2026-10-13",
    topics: ["military-history", "african-american-history", "civil-rights", "art"],
    whyVisit: "The Buffalo Soldiers National Museum interprets Black military service and civic struggle in American history through stories that extend from the post-Civil War frontier regiments to the desegregation of the military, later conflicts and contemporary art. Its former Houston Light Guard Armory building is a historical landmark in its own right, but the galleries remain CLOSED for renovations in October 2026.",
    visitorStrategy: "Do not make a museum-admission trip to 3816 Caroline Street at present. The museum's current homepage and visit page explicitly say temporarily closed for renovation; an older 'closed until summer 2026' target and old ticket hours are not a reopening announcement. All organized in-person group tours are cancelled until further notice. Use the museum's published digital talks, online exhibition information and off-site programming if currently scheduled.",
    accessibility: "The institution's earlier visitor information lists accessible gallery space and surface parking, but because the building is not open for normal visits these amenities are not currently available to ordinary museum guests. Reconfirm accessible entrances, facilities and accommodations after the museum issues a dated reopening notice. Do not use historical visitor hours as current travel guidance.",
    familiesAndGroups: "Teachers and families can currently use the museum's educational historical topics and published digital materials; its website also describes virtual field-trip options, but current reservation availability must be confirmed before booking. Subjects such as military conflict, racial discrimination, segregation and violence may require age-sensitive discussion. In-person school group tours are currently suspended.",
    researchValue: "The museum presents Black soldiers as active participants in military history rather than side notes to a conventional frontier narrative. Explore the contradiction between military service and constrained citizenship, Cathay Williams and women's service, and the nineteenth- and twentieth-century civil rights campaigns. Distinguish institutional promotional interpretation from documented primary evidence when tracing particular units or historical figures.",
    exhibits: [
      { heading: "The Promise versus Reality", detail: "The museum frames United States Colored Troops' service during emancipation against the failure to deliver equal citizenship; this theme helps explain subsequent military and civil-rights history, but is not currently an accessible gallery." },
      { heading: "Women Who Served and Cathay Williams", detail: "Interpret the history of women who served, including the soldier Cathay Williams, while following museum researchers' current records rather than assuming every popularly repeated biographical detail is certain." },
      { heading: "Representing American Ideals: Civil Rights in the Military", detail: "The museum links campaigning for armed forces integration to the impact and limitations of Executive Order 9981 and later change; this is an educational topic, not a currently visitable display." },
      { heading: "The Buffalo Division in Action", detail: "A traveling exhibit about the 92nd Infantry Division is offered to host venues; inquire about actual off-site dates instead of directing visitors to a closed building." },
    ],
    routes: [
      { label: "At-home history and museum research", steps: ["Begin at the museum's actual closure notice", "Read official exhibition topics and digital programming", "Check for an announced off-site presentation or virtual school program"] },
      { label: "After a verified reopening", steps: ["Confirm a dated museum reopening and accessible visitor entrance", "Reserve admission or group visit under revised policies", "Choose military and civil-rights exhibits appropriate to the visitor's age"] },
    ],
    sources: [
      { label: "Museum official closure and previous policies", url: "https://buffalosoldiersmuseum.org/visit/", use: "Temporary renovation closure overrides older listed hours" },
      { label: "Museum group tour cancellation", url: "https://buffalosoldiersmuseum.org/visit/group-tours/", use: "All in-person tours cancelled until further notice" },
      { label: "Museum exhibit and digital themes", url: "https://buffalosoldiersmuseum.org/visit/exhibits/", use: "Exhibition context, current/previous distinctions" },
      { label: "Houston Museum District institution record", url: "https://houmuse.org/institution/buffalo-soldiers-national-museum/", use: "Physical location and closure context" },
    ],
    connections: [
      { label: "Harris County", href: "/county/harris", reason: "Place Black military and civil-rights history in Houston's broader cultural setting." },
      { label: "Texas museums", href: "/explore/museums", reason: "Find verified open museums while this institution is closed." },
      { label: "African American Museum Dallas", href: "/destination/african-american-museum-dallas-fair-park", reason: "Compare separate Black history and culture subjects, in different Texas cities." },
    ],
  },
  "texas-prison-museum-huntsville": {
    name: "Texas Prison Museum",
    slug: "texas-prison-museum-huntsville",
    county: "Walker",
    city: "Huntsville",
    reviewed: "2026-10-13",
    topics: ["texas-history", "government", "criminal-justice", "family"],
    whyVisit: "Huntsville's Texas Prison Museum offers a grounded introduction to state incarceration history and the lives of those inside the walls. Its unusual objects—including the retired electric chair known as Old Sparky, restraints, inmate-created art, prison rodeo memorabilia and a re-created cell—create opportunities to examine punishment, reform, prison labor and the experiences of people in custody from more than one perspective.",
    visitorStrategy: "The museum's official 2026 home page lists Monday through Saturday 10 a.m.–5 p.m., Sunday noon–5 p.m., at 491 Texas Highway 75 North in Huntsville. Standard adults $8, seniors aged 60+ and qualifying military/first responders/TDCJ employees/SHSU students $6, children 6–17 $7, ages five and under free; groups $5 per person. Allow roughly 45 minutes for a highlights visit or longer for detailed reading; verify holidays because the museum sometimes publishes one-day memorial closures.",
    accessibility: "The museum's public pages do not provide enough route-level information to guarantee wheelchair access to every display and historic object. Contact museum staff about the front entrance, paths, seats, restrooms and any sensory needs. Some exhibits of execution technology and violent crime can be emotionally distressing even when their physical access is straightforward.",
    familiesAndGroups: "The operator says school field trips and diverse visitor groups attend, but that does not make every exhibit appropriate for young children. The electric chair, weapon displays, restraints, execution history and prison-crime stories can be upsetting; adults should select galleries based on the child's maturity. Public photos, prisoner stories and custodial experiences warrant empathy rather than novelty framing.",
    researchValue: "The museum grew from interest in the Huntsville Unit, also called the Walls, established in 1848. It preserves material connected to the Texas Prison Rodeo, 1931–1986, the changing correctional system and those who lived and worked there. Its collections reflect institutional and individual accounts, but visitors should remember that a museum's artifacts cannot fully represent every prisoner's experience and that historic practices are not necessarily current policy.",
    exhibits: [
      { heading: "Old Sparky and capital punishment", detail: "The decommissioned electric chair symbolizes Texas's former use of electrocution; the museum says 361 prisoners were executed in it between 1924 and 1964. Consider the human consequences and ethical debates rather than treating it as spectacle." },
      { heading: "Prison hardware and improvised objects", detail: "Restraints, contraband and inmate-made tools show different sides of control, resistance and ingenuity within a closed institution; distinguish historic exhibits from today's security technology." },
      { heading: "Texas Prison Rodeo, 1931–1986", detail: "Historic photographs and narratives illuminate an unusual sporting and public-relations spectacle that began near the Walls Unit and later attracted national performers." },
      { heading: "Prison art and personal experience", detail: "Work made by incarcerated people provides glimpses into creativity and personal agency in confinement; seek object labels for dates, provenance and individual histories." },
    ],
    routes: [
      { label: "45-minute visitor overview", steps: ["Begin with how the Texas prison system developed", "Choose one institutional-life and one inmate-perspective exhibit", "Consider execution displays separately if with sensitive visitors"] },
      { label: "Deeper Huntsville history", steps: ["Spend more time on prison reform, rodeo and daily-life materials", "Read the Old Sparky context if appropriate to your party", "Pair the visit with independent Walker County historical resources"] },
    ],
    sources: [
      { label: "Museum official home, hours and ticket prices", url: "https://www.txprisonmuseum.org/", use: "Current 2026 visiting rates, admissions, dates and location" },
      { label: "Museum popular exhibits", url: "https://www.txprisonmuseum.org/copy-of-texas-prison-rodeo-memories-4", use: "Specific exhibit topics, execution history and visual sensitivity" },
      { label: "Museum background and Huntsville connection", url: "https://www.txprisonmuseum.org/about-us", use: "Institution origins and prison rodeo context" },
      { label: "Texas Prison Rodeo history", url: "https://www.txprisonmuseum.org/copy-of-captain-joe-byrd-cemetery", use: "Rodeo history and later dates" },
    ],
    connections: [
      { label: "Walker County", href: "/county/walker", reason: "Understand Huntsville as a government and historic community." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare institutional history with other Texas heritage museums." },
      { label: "Texas State History Museum", href: "/destination/bullock-texas-state-history-museum", reason: "Place justice and state-government history inside a wider timeline." },
    ],
  },
  "eisenhower-birthplace": {
    name: "Eisenhower Birthplace State Historic Site",
    slug: "eisenhower-birthplace",
    county: "Grayson",
    city: "Denison",
    reviewed: "2026-10-13",
    topics: ["presidential-history", "military-history", "architecture", "family"],
    whyVisit: "The modest house in Denison, where Dwight D. Eisenhower was born October 14, 1890, is a rare opportunity to understand a future president through an ordinary working family's home rather than through military triumphs. Texas Historical Commission-guided interpretation explores railroad jobs, domestic life and how Denison remembered its most famous native son.",
    visitorStrategy: "Head to the visitor center at 609 South Lamar Avenue, NOT older closed road approaches; Shepherd and Day streets no longer provide normal access to Lamar Avenue, and Lamar is closed at Day. Public house tours start on the hour Tuesday–Saturday 9 a.m.–5 p.m. and Sunday noon–5 p.m., subject to capacity. Book at least one week in advance for a guaranteed place; individual walk-ins may join if room remains. Current prices: adults $6, seniors/veterans/teachers $5, youth $4, ages five and under free; family tour $12.",
    accessibility: "THC confirms wheelchair ramps at the visitor center and Birthplace house and accessible restrooms at the outdoor picnic pavilion. It is a short walk between the visitor center and the house; ask about outdoor surfaces, steep grades and specific mobility or sensory needs before arrival. The house is interpreted with period furniture and narrow historic rooms, so follow posted routes and staff directions.",
    familiesAndGroups: "A one-hour guided house visit can work for school-age children; the K–12 group curriculum includes croquet, mock laundry and paper quilting to introduce household life around 1890. School tours are a separate 1.5–2-hour appointment with reduced group prices. Families may eat their own food in the pavilion but food and drinks are not allowed in the house. This is a historic-house experience, not a playground or hands-on science museum.",
    researchValue: "Eisenhower was born to Ida and David Eisenhower while David worked near the Missouri-Kansas-Texas Railroad yards. The family left Texas while Ike was young, so Denison's historical significance lies in birth and community commemoration, not a claim he grew up there for many years. Compare this Texas house with his boyhood home in Abilene, Kansas, and later Gettysburg farm, which tell different periods of the same life.",
    exhibits: [
      { heading: "The 1890s Birthplace rooms", detail: "Furnished historic rooms show family work, domestic conditions and early Denison life rather than a full biography of Eisenhower's World War II years." },
      { heading: "Visitor center introductory video", detail: "A short historical presentation provides context for the tour; check current group arrangements rather than assuming unscheduled movie showings." },
      { heading: "Eisenhower and Denison interpretation", detail: "Exhibit material discusses the city's rail economy and its pride in the president who was born there; the visitor can compare local story with later national history." },
      { heading: "Picnic pavilion and historical grounds", detail: "Outdoor areas help orient families and groups between the visitor center and birthplace, but weather and the road closures affect routing." },
    ],
    routes: [
      { label: "One-hour guided house tour", steps: ["Arrive at 609 S. Lamar visitor parking, checking current closures", "Visit the center to register for an on-the-hour tour", "Explore birthplace rooms with guide, then the grounds"] },
      { label: "School and family history outing", steps: ["Reserve the age-specific educational tour one week ahead", "Use interactive household tasks appropriate to school-age visitors", "Eat packed food only at the picnic pavilion if desired"] },
    ],
    sources: [
      { label: "THC current visitor guide and tour booking", url: "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/plan-your-visit-eisenhower-birthplace", use: "Hours, pricing, road access, picnic dining, disability accommodations" },
      { label: "THC official birthplace history", url: "https://thc.texas.gov/state-historic-sites/eisenhower-birthplace/eisenhower-birthplace-history", use: "1890 life, Texas heritage, railroad, later Eisenhower biography" },
      { label: "THC presidential-home comparison", url: "https://thc.texas.gov/blog/homes-president-eisenhower", use: "Denison is birthplace, Abilene Kansas boyhood, Gettysburg retirement home" },
      { label: "THC historic site Atlas", url: "https://atlas.thc.texas.gov/Details/4200000469", use: "Site identity, historic designation and street address" },
    ],
    connections: [
      { label: "Grayson County", href: "/county/grayson", reason: "Explore Denison's railroad and presidential connections." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare historic houses and presidential visitor sites." },
      { label: "National Museum of Pacific War", href: "/destination/national-museum-pacific-war", reason: "Pair a separate Second World War museum's deep wartime interpretation with Eisenhower's birthplace history." },
    ],
  },
  "1919-san-augustine-county-jail-museum": {
    name: "1919 San Augustine County Jail Museum",
    slug: "1919-san-augustine-county-jail-museum",
    county: "San Augustine", city: "San Augustine", reviewed: "2026-10-13",
    topics: ["texas-history", "law-enforcement", "architecture"],
    whyVisit: "The former San Augustine County jail is both a preserved historic building and a local history museum. Built in 1919 using pieces of an 1882 jail, including iron bars and cells, the two-story structure housed prisoners through 2000. Visitors can study the changes to law enforcement, civic institutions and local life that occurred over eight decades, then connect that history to the courthouse square and nearby Mission Dolores.",
    visitorStrategy: "The official San Augustine visitors organization lists the 1919 jail museum as open Monday through Friday from 11 a.m. to 3 p.m., with admission free and donations welcome. These hours are not the same as Mission Dolores, which has a separate operator, address, admission price and schedule. Allow an editorially estimated 30–60 minutes inside the jail, and reserve time for its local research displays or the nearby courthouse square. Ask the locally staffed museum about holidays before traveling.",
    accessibility: "The restored jail has historic cells and two stories. Current tourism information does not establish that every original cell or upper floor is wheelchair accessible, nor document a lift, accessible restroom or sensory accommodations. Visitors requiring a step-free route should contact the operator ahead of a visit. Do not infer an ADA-compliant elevator from the building's restoration or landmark status.",
    familiesAndGroups: "School-age children can connect the preserved cells to the history of police, courts and justice, while older students may engage more deeply with changes in law-enforcement institutions. The subject of imprisonment can be unsettling for younger children; caregivers should decide what is appropriate. Family groups interested in photographs, local records and architecture may find this best as a short visit, not an interactive children's museum.",
    researchValue: "The building tells a layered preservation story: portions of the 1882 jail were salvaged for the 1919 structure, layers of stucco obscured its masonry starting in 1973, and the 2016 restoration helped return the historic appearance. The Texas Historical Commission's marker identifies it as a Recorded Texas Historic Landmark. The site's Texana library, county records and photographic kiosk can support further study of San Augustine history without requiring TexasDefined to reproduce those collections.",
    exhibits: [
      { heading: "Original and salvaged jail cells", detail: "Compare the jail's 1919 design with reused pieces of its nineteenth-century predecessor. The building itself illustrates how San Augustine justice facilities changed across generations." },
      { heading: "Local law-enforcement service", detail: "Displays honor and interpret the county's sheriffs, judges, alcaldes, Texas Rangers, game wardens and police. These topics invite visitors to examine the changing responsibilities of officers and courts." },
      { heading: "Texana research library and county records", detail: "Local sources and preservation material help connect the building to the broader historical community. Research access can differ from ordinary touring; contact staff for specific records." },
      { heading: "Historic photographic kiosk and San Augustine timelines", detail: "A rolling kiosk features Depression-era Russell Lee photographs and wartime John Vachon photographs, alongside timelines placing San Augustine and Mission Dolores in context." }
    ],
    routes: [
      { label: "Historic jail in under an hour", steps: ["Inspect restored masonry and historic cells where public access is allowed", "See the law-enforcement and photographic interpretation", "Check the landmark marker and courthouse square"] },
      { label: "San Augustine heritage afternoon", steps: ["Visit the 1919 jail during its own posted weekday hours", "Explore courthouse-square interpretation and town history", "Visit Mission Dolores only during its separately verified state historic-site operating hours"] }
    ],
    sources: [
      { label: "Visit San Augustine — local attractions", url: "https://visitsanaugustinetx.org/local-attractions/", use: "Active museum function, visitor hours, free admission, restored 2017 law-enforcement exhibits and historical research material" },
      { label: "Texas Historical Commission — San Augustine County Jail marker", url: "https://atlas.thc.texas.gov/Details/5507018848", use: "1919 building chronology, earlier jail materials, restoration, landmark status and marker location" },
      { label: "THC Mission Dolores — independently operated historic site", url: "https://thc.texas.gov/historic-sites/mission-dolores", use: "Correct separate admissions, location and current visitor hours for nearby heritage itinerary" }
    ],
    connections: [
      { label: "San Augustine County", href: "/county/san-augustine", reason: "Link the former county jail to San Augustine's civic history and county visitor planning." },
      { label: "Texas museum directory", href: "/explore/museums", reason: "Find other source-reviewed local history and heritage museums." }
    ],
  },
  "corpus-christi-museum-science-history": {
    name: "Corpus Christi Museum of Science and History", slug: "corpus-christi-museum-science-history", county: "Nueces", city: "Corpus Christi", reviewed: "2026-10-12",
    topics: ["maritime-archaeology","history","science","family"],
    whyVisit: "One museum links two distinct Texas shipwreck stories with South Texas natural history and interactive science. The 1554 Spanish fleet evidence should be distinguished from La Belle, La Salle's French ship lost in 1686; the interpretation connects recovered objects with the methods archaeologists use to study the coast.",
    visitorStrategy: "The operator's current visitor page lists Tuesday–Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m., with Monday closure and special summer hours. Free surface parking is identified directly in front and across N. Chaparral Street. General admission and discounted Museums for All tickets have distinct eligibility and prices; check the operator before traveling. A history-and-science visit typically merits two hours or more, adjusted for children and temporary exhibits.",
    accessibility: "The public visit page confirms parking locations but does not comprehensively establish wheelchairs for loan, every exhibit's step-free route or sensory accommodations. Contact the museum's visitor services at 361-826-4667 about mobility, elevator, accessible parking, restrooms and sensory needs; do not claim facilities that the operator has not confirmed.",
    familiesAndGroups: "Families seeking hands-on learning can emphasize science experiences and scheduled educational programming; older children with history interests can explore the shipwreck displays. The operator requires advance scheduling for parties of ten or more and for school groups; homeschool programs have separate registration. The presence of food service or indoor lunch facilities is not independently confirmed.",
    researchValue: "Read the recovered shipwreck objects in context: the 1554 wrecks led to major Texas marine archaeological policy, while La Belle offers a different seventeenth-century colonial episode. Compare what the 1554 material says about transatlantic trade with what La Belle tells us about a failed French expedition.",
    exhibits: [
      { heading: "Shipwreck! and the 1554 Spanish fleet", detail: "Look for the recovered wooden keel, cargo and shipboard objects; a reconstructed wreck scene helps visitors distinguish an original artifact from interpretation." },
      { heading: "La Belle and the La Salle Odyssey", detail: "Relate objects connected with the French expedition to Fort St. Louis and the protected recovered hull now at the Bullock Museum, not at this institution." },
      { heading: "Coastal Bend science and ecology", detail: "Explore biological, geological and environmental displays to understand the Gulf shoreline as a changing system, not just a scenic setting." },
      { heading: "Hands-on science and children's programming", detail: "Reserve flexibility for stations and group programs; exact activity availability varies by age, date and the museum's calendar." }
    ],
    routes: [
      { label: "Shipwreck and archaeology visit", steps: ["Begin with the 1554 Spanish shipwreck context", "Compare La Belle and its later French expedition", "Discuss what makes recovered artifacts reliable evidence"] },
      { label: "Family science and history visit", steps: ["Select current hands-on science stations", "Spend focused time in a shipwreck or local-history gallery", "Allow space for the outdoor garden or a scheduled program if operating"] },
      { label: "Corpus Christi heritage day", steps: ["Start at the museum in the SEA District", "Continue to the USS Lexington on North Beach as a separate ticketed site", "Extend to Rockport's Texas Maritime Museum on a different day if pursuing the La Salle Odyssey"] }
    ],
    sources: [
      { label: "Corpus Christi Museum — current visit page", url: "https://www.ccmuseum.com/visit/", use: "Tickets, Museums for All, parking, school groups, location and seasonal hours" },
      { label: "Corpus Christi Museum — exhibits", url: "https://www.ccmuseum.com/museum-exhibits/", use: "1554 shipwreck, science galleries and exhibits" },
      { label: "Corpus Christi Museum — education", url: "https://www.ccmuseum.com/education-programs/", use: "Group and homeschool registration" },
      { label: "Texas Historical Commission — La Salle archaeology", url: "https://thc.texas.gov/learn/archeological-spotlight/la-salle-archeology-projects", use: "Original expedition and separate La Belle hull location" }
    ],
    connections: [
      { label: "Nueces County", href: "/county/nueces", reason: "Place the museum in Coastal Bend history." },
      { label: "USS Lexington", href: "/destination/uss-lexington-museum-corpus-christi", reason: "Compare maritime stories across different centuries." },
      { label: "La Salle Odyssey", href: "/destination/la-salle-odyssey-texas-coast", reason: "Travel the seven-museum network." }
    ],
  },
  "port-isabel-historical-museum": {
    name: "Port Isabel Historical Museum", slug: "port-isabel-historical-museum", county: "Cameron", city: "Port Isabel", reviewed: "2026-10-13",
    topics: ["borderlands","architecture","local-history","maritime"],
    whyVisit: "The museum's 1899 Champion Building and its 1906 fish mural are as important as the objects on display. The two levels explain why the Laguna Madre coastline became a fishing, port, trade and military gateway instead of simply a route to South Padre Island.",
    visitorStrategy: "The City of Port Isabel and the South Padre Island Chamber currently list the museum as open Wednesday–Saturday from 10 a.m. to 4 p.m., with last ticket sales at 3:30 p.m. according to the Chamber. Confirm the day’s hours, tickets and closures by calling (956) 943-7602. Pair the Champion Building’s 1906 fish mural with the Port Isabel Lighthouse a few blocks away.",
    accessibility: "The museum occupies a two-level historic commercial building. An earlier independent visitor reported an elevator, but the City and Chamber descriptions do not establish its present working status or a fully accessible route. Confirm elevator operation, accessible entrances, restrooms and individual accommodation needs directly at (956) 943-7602.",
    familiesAndGroups: "The mural and Champion Building can start conversations with children about fishing and nineteenth-century Gulf commerce. More detailed historical exhibits may work best for school-age children. The operator lists group tours but directs visitors to call for arrangements. Food and dining on site are not confirmed; choose nearby Port Isabel options separately.",
    researchValue: "Use the galleries to compare local memory with artifacts concerning Laguna Madre Indigenous societies, nineteenth-century trade and the borderland conflicts. The building itself demonstrates how waterfront commerce left durable commercial architecture in Port Isabel.",
    exhibits: [
      { heading: "The Champion Building and 1906 fish mural", detail: "Begin outside. Explain why a late nineteenth-century store became a landmark and why the fishing mural is a historical artifact rather than incidental decoration." },
      { heading: "Laguna Madre and port history", detail: "Follow the role of fishing, maritime trade and waterfront settlement in the region's development." },
      { heading: "Borderland and community life", detail: "Use local-history exhibits to place Port Isabel within overlapping Indigenous, Mexican and U.S. histories." }
    ],
    routes: [
      { label: "Quick historic Port Isabel", steps: ["View the Champion Building's 1906 mural", "Tour the museum's available galleries", "Walk to the nearby historic lighthouse"] },
      { label: "Family maritime history", steps: ["Discuss fishing and trade in the museum", "Compare the lighthouse's navigation function", "Finish at a public Laguna Madre overlook"] },
      { label: "Lower Rio Grande history day", steps: ["Start in the museum and at the lighthouse", "Continue to Palo Alto Battlefield for the 1846 conflict", "Return to South Padre Island only when the weather and time permit"] }
    ],
    sources: [
      { label: "City of Port Isabel — museum and lighthouse", url: "https://portisabel-texas.com/blog/history/", use: "Official city history, museum address, Wednesday–Saturday visitor schedule and adjacent lighthouse" },
      { label: "South Padre Island Chamber — museum listing", url: "https://business.spichamber.com/list/member/port-isabel-historical-museum-18", use: "Museum visitor hours, 3:30 p.m. last ticket, admission contact and Champion Building context" },
      { label: "Texas Historical Commission — Beyond the Beach (2026)", url: "https://thc.texas.gov/blog/beyond-beach", use: "State historical authority on the museum’s two exhibit levels, Indigenous heritage and borderland collections" },
      { label: "Port Isabel Historical Museum — visitor account", url: "https://www.tripadvisor.com/Attraction_Review-g56479-d283951-Reviews-Port_Isabel_Historical_Museum-Port_Isabel_Texas.html", use: "Independent visitor question on elevator; not confirmation of current access" }
    ],
    connections: [
      { label: "Port Isabel Lighthouse", href: "/destination/port-isabel-lighthouse", reason: "Connect waterfront trade to ship navigation." },
      { label: "South Padre Island", href: "/destination/south-padre-island", reason: "Plan the adjacent beaches and ecology." },
      { label: "Cameron County", href: "/county/cameron", reason: "Place the museum in lower Valley history." }
    ],
  },
  "historic-brownsville-museum": {
    name: "Historic Brownsville Museum", slug: "historic-brownsville-museum", county: "Cameron", city: "Brownsville", reviewed: "2026-10-12",
    topics: ["texas-history","railroads","borderlands","family"],
    whyVisit: "This restored 1928 Southern Pacific depot makes Brownsville's railroad history tangible and explains the city's growth. Its included Simón Celaya Railroad Gallery is a strong reason to visit: the 1872 Rio Grande Railroad locomotive represents the earlier Brownsville–Point Isabel line and should not be mistaken for a 1928-era train.",
    visitorStrategy: "The Brownsville Historical Association advertises Tuesday–Saturday 10 a.m.–4 p.m. operation and adult, senior, student and concession ticket categories. Ordinary admission covers the restored depot, Simón Celaya Railroad Gallery and Mary A. Yturria Education Center where open; educational center exhibitions are not assured on every day. Confirm current operating arrangements before travel.",
    accessibility: "The historic depot and separate gallery buildings require building-specific access checks; the operator's description does not establish accessible routes for every display. Request current entrance, accessible parking, restroom and mobility details before travel. Do not assume museum-group tours follow the same arrangements as walk-in admission.",
    familiesAndGroups: "The renovated railroad gallery explicitly advertises hands-on displays for children explaining pistons, locomotion and transport. The Brownsville Historical Association offers roughly one-hour guided tours with advance arrangements and separate group and school pricing; do not assume a docent tour is included with every walk-in ticket. No on-site restaurant is verified.",
    researchValue: "Compare the 1872 Rio Grande Railroad between Brownsville and Point Isabel with the later Southern Pacific depot. This distinction reveals successive transport networks and the links among Brownsville's border trade, coastal ports and inland growth.",
    exhibits: [
      { heading: "Southern Pacific depot architecture (1928)", detail: "Inspect the Spanish Colonial Revival railroad building as a preserved historic place and relate its design to the twentieth-century passenger-rail era." },
      { heading: "Simón Celaya Railroad Gallery and locomotive", detail: "An 1872 Rio Grande Railroad locomotive anchors interactive interpretation of earlier narrow-gauge travel, engine mechanics and the corridor toward Port Isabel." },
      { heading: "Brownsville founding and changing exhibits", detail: "Permanent interpretation addresses Brownsville's origins; rotating local-history exhibitions add topics that should be confirmed ahead of time." },
      { heading: "Mary A. Yturria Education Center", detail: "A related venue for educational and cultural programming, with event-specific schedules that differ from gallery availability." }
    ],
    routes: [
      { label: "Depot and train highlights", steps: ["Begin with the architecture and Brownsville's founding story", "Visit the Simón Celaya gallery and locomotive", "Compare nineteenth- and twentieth-century railroad histories"] },
      { label: "Family transportation visit", steps: ["Explore the restored depot", "Give children time with the locomotive's hands-on mechanical exhibits", "Add a second Brownsville Historical Association site only if hours allow"] },
      { label: "Borderlands history day", steps: ["Study rail commerce at the museum", "Continue to Palo Alto Battlefield for the U.S.–Mexican War", "Connect Port Isabel maritime transport and the Rio Grande corridor"] }
    ],
    sources: [
      { label: "Brownsville Historical Association — Historic Brownsville Museum", url: "https://www.brownsvillehistory.org/historic-brownsville-museum-brownsville-historical-association.html", use: "Operator hours, admission, restored depot and included galleries" },
      { label: "Brownsville Historical Association — railroad gallery", url: "https://brownsvillehistory.org/simon-celaya-railroad-gallery-brownsville-historical-association.html", use: "Interactive railroad displays and locomotive" },
      { label: "Brownsville Historical Association — tours", url: "https://www.brownsvillehistory.org/museum-tours-brownsville-historical-association.html", use: "Advance group itineraries, student/education offerings and separate group pricing" }
    ],
    connections: [
      { label: "Palo Alto Battlefield", href: "/destination/palo-alto-battlefield-national-historical-park", reason: "Interpret the war and border dispute preceding Brownsville's growth." },
      { label: "Port Isabel Historical Museum", href: "/destination/port-isabel-historical-museum", reason: "Connect the railroad destination to its coastal terminus." },
      { label: "Cameron County", href: "/county/cameron", reason: "Explore Lower Rio Grande cultural and natural history." }
    ],
  },
  "bullock-texas-state-history-museum": {
    name: "Bullock Texas State History Museum", slug: "bullock-texas-state-history-museum", county: "Travis", city: "Austin", reviewed: "2026-10-12",
    topics: ["texas-history","archaeology","family"],
    whyVisit: "The Bullock is the most efficient statewide historical orientation for a visitor who wants more than a checklist of famous battles. Its interpretation extends from the first people of the region to Texas's changing cultures, economies and civic institutions. The excavated La Belle hull is particularly distinctive because the artifacts connect archaeology to France's short-lived Gulf Coast colonial ambitions.",
    visitorStrategy: "Begin with Becoming Texas and La Belle, then proceed through later centuries instead of rushing directly to the revolution. Allow two to three hours for history galleries, longer for a film or special exhibition. Museum galleries and IMAX programming are different ticket experiences: check the current admissions menu before booking either.",
    accessibility: "Use the museum's visitor guide for elevator locations, accessible facilities and theatre requirements; contact the museum about individual accommodations rather than assuming every temporary exhibit has identical access.",
    familiesAndGroups: "Families can orient younger visitors around the large ship reconstruction, landscape interpretation and artifact stories. School trips should consult the museum's educator booking and chaperone requirements. The Texas State Capitol can be paired with the museum on foot as a separate civic-history stop.",
    researchValue: "Read the galleries as an introduction rather than a substitute for primary records. The La Belle excavation, Indigenous trade networks and the transition between Spanish, Mexican, Republic and state institutions make strong starting points for deeper Texas history research.",
    exhibits: [
      { heading: "Becoming Texas and the earliest inhabitants", detail: "The first-floor interpretation covers thousands of years of Indigenous history, landscape, exchange networks and cultures before Mexican independence; trace how the evidence differs from familiar statehood narratives." },
      { heading: "La Belle: a wreck as a historical archive", detail: "Look closely at the vessel and recovered cargo. They reveal shipbuilding, trade plans and colonization on the Gulf Coast and demonstrate why material evidence can revise a written historical account." },
      { heading: "The later Texas story", detail: "Continue to galleries addressing independence, immigration, commerce, industry and the modern state. Compare the historical sequence to places you can actually visit across Texas rather than treating every period as isolated." },
    ],
    routes: [
      { label: "90-minute highlights", steps: ["Begin at the early-history gallery", "Concentrate on La Belle and associated objects", "Sample one later-century gallery"] },
      { label: "Half-day history", steps: ["Work through permanent galleries in chronological order", "Pause for a special exhibition if included", "Continue to the Capitol grounds"] },
      { label: "Deep-study visit", steps: ["Read the permanent history galleries fully", "Examine the shipwreck and contextual labels", "Reserve a separate film only if it advances your interests"] },
    ],
    sources: [
      { label: "Bullock Museum — museum visit and ticketing", url: "https://tickets.thestoryoftexas.com/mainstore?vid=0", use: "Admission, current hours and program-specific tickets" },
      { label: "Bullock Museum — Texas History Galleries", url: "https://www.thestoryoftexas.com/visit/exhibits/texas-history-gallery", use: "Gallery interpretation and exhibited collections" },
      { label: "Bullock Museum — official home", url: "https://www.thestoryoftexas.com/", use: "Institution and exhibition updates" },
    ],
    connections: [
      { label: "Texas State Capitol", href: "/destination/texas-state-capitol", reason: "Pair statewide civic institutions with museum interpretation." },
      { label: "Travis County", href: "/county/travis", reason: "Locate the museum in Austin's wider history and geography." },
    ],
  },
  "perot-museum-nature-science-dallas": {
    name: "Perot Museum of Nature and Science", slug: "perot-museum-nature-science-dallas", county: "Dallas", city: "Dallas", reviewed: "2026-10-12",
    topics: ["science","natural-history","family"],
    whyVisit: "The Perot offers a rare combination of specimen-rich natural history and experiment-based science. The eleven permanent exhibit halls range across ancient life, the human body, engineering, space and Earth's systems, making the visitor's selection of halls more important than a rigid start-to-finish route.",
    visitorStrategy: "Reserve an appropriate general admission entry, especially on weekends and school breaks. A focused visit needs approximately two to three hours, but children may spend much longer experimenting. A traveling exhibition or 3D film can add charges and time; compare add-ons with the permanent-hall admission rather than assuming they are included.",
    accessibility: "The main visitor page publishes permitted items, service-animal guidance and entry procedures. Ask guest services about sensory accommodations and elevators before visiting if those details affect your route.",
    familiesAndGroups: "The Moody Family Children's Museum is specifically designed for younger visitors, while older children can follow dinosaur, engineering or sports-science themes. School field trips use distinct advance scheduling and may exclude access to the children's museum; do not use ordinary admission guidance for group bookings.",
    researchValue: "The halls are useful for introducing scientific questions, not merely cataloguing impressive objects. Compare evidence from fossils, biological systems and engineering models, and distinguish permanent galleries from time-limited visiting exhibitions.",
    exhibits: [
      { heading: "Ancient life, fossils and Earth's systems", detail: "Use paleontology and geology to connect Texas landscapes and the ancient environmental record. Look for the difference between the evidence in an object and the reconstruction presented alongside it." },
      { heading: "Engineering, energy and space", detail: "Interactive engineering stations reward experimentation: compare the result after changing one variable instead of treating the exhibits as static displays." },
      { heading: "Human biology, sports and children's discovery", detail: "Families with mixed ages can divide time between body and sports science and the children's zone; reserve additional time for hands-on stations that invite repeated attempts." },
    ],
    routes: [
      { label: "Two-hour science sampler", steps: ["Choose one natural-history hall", "Spend time in a hands-on engineering hall", "Finish with human biology or sports science"] },
      { label: "Family half day", steps: ["Enter at the reserved time", "Prioritize age-appropriate galleries", "Allow open-ended hands-on time and a lunch break"] },
      { label: "Exhibits plus film", steps: ["Complete the permanent halls you value most", "Attend the separately scheduled film", "Return to one missed exhibit if admission permits"] },
    ],
    sources: [
      { label: "Perot Museum — visit", url: "https://www.perotmuseum.org/visit/", use: "Hours, admission, visitor restrictions and accessibility" },
      { label: "Perot Museum — tickets", url: "https://www.perotmuseum.org/tickets/", use: "Current included exhibits and add-ons" },
      { label: "Perot Museum — field trips", url: "https://www.perotmuseum.org/education/field-trips/", use: "School booking and group limitations" },
    ],
    connections: [
      { label: "Dallas County", href: "/county/dallas", reason: "Add area history and other regional destinations." },
      { label: "Explore Texas", href: "/explore", reason: "Find compatible Dallas-area attractions." },
    ],
  },
  "witte-museum": {
    name: "Witte Museum", slug: "witte-museum", county: "Bexar", city: "San Antonio", reviewed: "2026-10-12",
    topics: ["science","natural-history","texas-history","family"],
    whyVisit: "The Witte blends science, ecology, archaeology and South Texas heritage rather than fitting the model of a single-subject museum. Opened in 1926, it marked its centennial in October 2026. Its focus on Texas Deep Time places fossils, water, Indigenous history and cultural change into a much longer chronological frame than the usual frontier narrative.",
    visitorStrategy: "Use the permanent galleries as the foundation and select temporary exhibitions separately. The museum's ticket language distinguishes general admission and some surcharged special exhibits; confirm the selected day's inclusions. Brackenridge Park makes a pleasant continuation, but it is not part of the indoor museum admission.",
    accessibility: "Review current visitor and campus access information with the Witte. Its multiple galleries and outdoor setting can make circulation and heat exposure relevant to a visitor's plan.",
    familiesAndGroups: "Young visitors can start with natural-history material and hands-on science, then return to the Texas-history story as attention permits. Organized school visits should use museum education reservations. The DoSeum and San Antonio Zoo are possible separate visits, not included in museum tickets.",
    researchValue: "The centennial exhibitions and archives offer unusually direct insight into how the institution itself has changed. Distinguish documented archaeological material, interpretive reconstructions and present-day cultural storytelling.",
    exhibits: [
      { heading: "Texas Deep Time", detail: "Look beyond dinosaurs to the long sweep of geological and human history: fossil evidence, regional landscapes and archaeological interpretation show how radically Texas has changed." },
      { heading: "People of the Pecos and South Texas heritage", detail: "Interpret Indigenous lifeways and rock-art traditions as continuing cultures rather than a decorative preface to European arrival. Note which objects are original and which displays are educational reconstructions." },
      { heading: "The Witte Museum: 100 Years", detail: "The 2026–27 centennial exhibition draws on institutional archives and objects to trace how the museum developed and how collecting and teaching priorities evolved." },
    ],
    routes: [
      { label: "Quick Texas science visit", steps: ["Start with Texas Deep Time", "Explore one interactive science section", "Finish with South Texas heritage"] },
      { label: "Family half day", steps: ["Choose permanent galleries for the children's ages", "Pause for active discovery", "Allow time to enjoy the outdoor campus"] },
      { label: "Museum history study", steps: ["Visit the centennial exhibition during its scheduled run", "Compare earlier collections with current interpretation", "Continue to the permanent Texas heritage galleries"] },
    ],
    sources: [
      { label: "Witte Museum — visitor information", url: "https://www.wittemuseum.org/plan-your-visit/", use: "Admission, visitor arrangements and current exhibitions" },
      { label: "Witte Museum — exhibitions", url: "https://www.wittemuseum.org/exhibitions/", use: "Current permanent and temporary exhibitions" },
      { label: "Witte Museum — 100 Years", url: "https://www.wittemuseum.org/exhibitions/the-witte-museum-100-years/", use: "Centennial history, dates and objects" },
    ],
    connections: [
      { label: "Bexar County", href: "/county/bexar", reason: "Connect museum collections to San Antonio's historical setting." },
      { label: "The Alamo", href: "/destination/the-alamo", reason: "Compare long-run regional history with one important historic site." },
    ],
  },
  "museum-of-the-big-bend-alpine": {
    name: "Museum of the Big Bend", slug: "museum-of-the-big-bend-alpine", county: "Brewster", city: "Alpine", reviewed: "2026-10-12",
    topics: ["texas-history","natural-history","archaeology","west-texas"],
    whyVisit: "This Sul Ross State University museum offers regional context that no single scenic stop can provide. Its exhibits connect the deserts, mountains and Rio Grande to archaeology, Indigenous lives, Spanish and Mexican history, ranching, mapping and borderland culture.",
    visitorStrategy: "Start with Big Bend Legacy before exploring the map holdings or current art displays. Enter the Sul Ross campus from Harrison Street via Entrance Four; the museum's visitor parking is across the street. Published visiting hours are Tuesday through Saturday, 10 a.m. to 4 p.m., with holiday exceptions; check the site before a long drive.",
    accessibility: "The museum reports an accessible building and campus routes. Contact staff for any specialized gallery, parking or guided-tour accommodations before arrival.",
    familiesAndGroups: "The historical objects and landscape interpretation work best with a short orientation about the desert region. The museum provides group tours under separate advance-booking arrangements; check restrictions before organizing a class or large party.",
    researchValue: "The permanent Big Bend Legacy exhibit and map collection help visitors relate field locations to people and land use. The museum's curatorial distinction is its transnational view of Far West Texas and northern Mexico.",
    exhibits: [
      { heading: "Big Bend Legacy", detail: "Follow natural history, archaeology and cultural change across a difficult landscape. The exhibition treats the region as the intersection of several communities and political boundaries rather than as an empty wilderness." },
      { heading: "Maps, territory and borders", detail: "Use historical mapping to understand access, transport, settlement and the Rio Grande corridor. Consider what each map records and omits about land use and communities." },
      { heading: "Art and changing regional exhibitions", detail: "The museum shows Western and borderland art alongside its historical material. Traveling displays are time-bound; use the current exhibition page, not an old promotional announcement, for the day of your visit." },
    ],
    routes: [
      { label: "One-hour orientation", steps: ["Tour Big Bend Legacy", "Locate familiar places on regional maps", "Note two related nearby field stops"] },
      { label: "Alpine half day", steps: ["Visit the permanent exhibit", "See current art or map displays", "Continue into Alpine's university and downtown history"] },
      { label: "Pre-park research", steps: ["Study human and natural history", "Compare historic maps and travel corridors", "Use what you learned to interpret a Big Bend day trip"] },
    ],
    sources: [
      { label: "Museum of the Big Bend — visit", url: "https://www.museumofthebigbend.com/visit/", use: "Entrance, admission, accessibility and hours" },
      { label: "Museum of the Big Bend — exhibitions", url: "https://www.museumofthebigbend.com/exhibits/", use: "Permanent Big Bend Legacy and current exhibitions" },
      { label: "Museum of the Big Bend — institution", url: "https://www.museumofthebigbend.com/", use: "University association and operating notices" },
    ],
    connections: [
      { label: "Brewster County", href: "/county/brewster", reason: "Extend the story into Alpine and the Big Bend region." },
      { label: "Big Bend National Park", href: "/destination/big-bend-national-park", reason: "Connect museum learning to the desert landscape." },
    ],
  },
  "panhandle-plains-historical-museum-canyon": {
    name: "Panhandle-Plains Historical Museum", slug: "panhandle-plains-historical-museum-canyon", county: "Randall", city: "Canyon", reviewed: "2026-10-12",
    topics: ["texas-history","natural-history","west-texas","ranching"],
    whyVisit: "The Panhandle-Plains collections capture the Southern Plains as an interconnected history of geology, Indigenous people, ranching, transport, petroleum, art and regional settlement. Its breadth makes the institution an important research reference even when its galleries cannot be entered.",
    visitorStrategy: "IMPORTANT: As checked in October 2026, the museum's official website continues to advertise temporary-closure updates. Do not present routine museum admission as available until the operator explicitly confirms that the galleries have reopened. Check the closure page for exhibitions, off-site work and visitor-service changes.",
    accessibility: "Because the museum's main building has been subject to a temporary closure, do not assume ordinary gallery access or an active campus tour. Request current off-site program accessibility information directly from the institution.",
    familiesAndGroups: "Educational value remains strong through collections and any public programs the institution offers, but a Canyon itinerary should not depend on an unconfirmed museum reopening. Plan a separate accessible Canyon-area stop and treat the museum as a research source until access is verified.",
    researchValue: "Collections on the Red River War, Panhandle ranching, geology and archaeology help connect Palo Duro Canyon and surrounding towns to the wider Southern Plains. Collection interpretation must accurately include Indigenous peoples and the consequences of military and settlement expansion.",
    exhibits: [
      { heading: "Regional archaeology and paleontology", detail: "The institution preserves material evidence from ancient environments and human occupation across the Southern Plains. When galleries reopen, look for how scientific evidence and oral or archival history intersect." },
      { heading: "Ranching, oil and transportation", detail: "Ranching and industrial collections explain economic and logistical changes that reshaped the High Plains, including cattle culture, petroleum development and connections by road and rail." },
      { heading: "Canyon, Palo Duro and the Red River War", detail: "Use the institution's historical collections to interpret the nearby canyon and surrounding military campaign sites, while keeping Native removal and land dispossession central to the story." },
    ],
    routes: [
      { label: "When temporarily closed", steps: ["Check official closure updates", "Research collections and off-site programming", "Plan another confirmed-open Canyon attraction"] },
      { label: "Future indoor museum visit", steps: ["Verify reopening and admission", "Prioritize archaeology and regional history", "Allow time for transportation and ranching collections"] },
      { label: "Panhandle context trip", steps: ["Use official museum resources before traveling", "Explore Canyon and Palo Duro", "Connect the landscape with the regional historical record"] },
    ],
    sources: [
      { label: "PPHM — temporary-closure updates", url: "https://www.panhandleplains.org/p/about/pphm-temporary-closure-updates", use: "Controlling current visitor access" },
      { label: "Panhandle-Plains Historical Museum", url: "https://www.panhandleplains.org/", use: "Collection, institutional and program information" },
    ],
    connections: [
      { label: "Randall County", href: "/county/randall", reason: "Connect Canyon with the surrounding Panhandle history." },
      { label: "Palo Duro Canyon State Park", href: "/destination/palo-duro-canyon-state-park", reason: "Explore the landscape related to regional collections." },
    ],
  },
  "george-ranch-historical-park": {
    name: "George Ranch Historical Park", slug: "george-ranch-historical-park", county: "Fort Bend", city: "Richmond", reviewed: "2026-10-12",
    topics: ["texas-history","ranching","living-history","family"],
    whyVisit: "The George Ranch is an unusually tangible way to study two centuries of Texas farm and ranch life. Its successive historic houses and working-landscape interpretation follow the Jones, Ryon, Davis and George families across settlement, enslavement, ranching and the transition to modern Fort Bend County.",
    visitorStrategy: "The operator currently lists public general admission on Saturdays from 9 a.m. to 5 p.m., with particular holiday and summer variations. Tuesday-to-Friday access is generally organized as pre-booked field trips and tours rather than ordinary walk-in admission. Plan three to four hours, closed-toe shoes and weather protection; sites and demonstrations may vary by day.",
    accessibility: "The site has an approximately one-mile paved interpretive loop and a tractor-pulled tram, but historic interiors, outdoor surfaces and transport features can differ. Consult the ranch's accessibility policy and call for individual mobility arrangements.",
    familiesAndGroups: "The working blacksmith shop, historic kitchens, cattle demonstrations and tram make history tangible for children, but animal and outdoor conditions require supervision. School groups and escorted tours have separate reservation rules, lead times and pricing. The park is privately operated, not a Texas state park.",
    researchValue: "The site's value is in comparing buildings and labor systems across generations. Look closely at whose work sustains each interpreted household, and distinguish the fortunes of landowning families from people who labored in agriculture and domestic service.",
    exhibits: [
      { heading: "Jones Stock Farm and early settlement", detail: "An early-period farm setting places nineteenth-century family settlement within wider Anglo colonization, Indigenous displacement and the labor-intensive Brazos landscape." },
      { heading: "Ryon Prairie Home and working ranch life", detail: "Household interpretation and farm demonstrations provide clues about class, agriculture, family routines and production in mid-nineteenth-century Texas." },
      { heading: "Later homes and ranch operations", detail: "Compare the Victorian-era house and ranch story with earlier structures to understand changes in technology, wealth, domestic labor and the county's eventual development." },
    ],
    routes: [
      { label: "Short historic houses visit", steps: ["Check which sites are interpreted that day", "Take the tram or walk to the nearest open historic house", "Watch one staff-led demonstration"] },
      { label: "Full ranch half day", steps: ["Start at the visitor center", "Follow the historic periods in sequence", "Allow time for livestock and blacksmith interpretation"] },
      { label: "Fort Bend heritage day", steps: ["Tour the ranch", "Compare its story with Richmond and Rosenberg", "Read the county's Brazos settlement history"] },
    ],
    sources: [
      { label: "The George Ranch — admission and directions", url: "https://www.georgeranch.org/visit/hours-admissions-directions/", use: "Opening arrangements, location and admission" },
      { label: "The George Ranch — FAQ", url: "https://www.georgeranch.org/visit/faq/", use: "Tour duration, surfaces, tram, parking and visitor policies" },
      { label: "The George Ranch — group tours", url: "https://www.georgeranch.org/visit/group-tours/", use: "Historical periods and group reservations" },
    ],
    connections: [
      { label: "Fort Bend County", href: "/county/fort-bend", reason: "See the county's settlement and agricultural history." },
      { label: "Brazos River basin", href: "/article/texas-brazos-river-guide", reason: "Understand the Brazos watershed and water landscape that shaped Fort Bend County." },

    ],
  },
  "texas-maritime-museum-rockport": {
    name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", county: "Aransas", city: "Rockport", reviewed: "2026-10-14",
    topics: ["texas-history","maritime","industry","gulf-coast"],
    whyVisit: "Rockport's Texas Maritime Museum is a needed corrective to an inland-heavy story of Texas. It treats the Gulf and bays as corridors of travel, work, environmental change and risk, interpreting fishing, shipbuilding, maritime commerce, shipwrecks and Indigenous coastal history.",
    visitorStrategy: "The museum currently advertises pay-what-you-can donation admission and Tuesday-to-Saturday hours, 10 a.m. to 4 p.m. Its Rockport location makes a compact cultural stop before walking the waterfront. Its 2026 operator calendar lists the temporary exhibitions Tides of Freedom: Spain & the Battle for American Independence (February–December) and Built for Victory (September–December); verify they remain on view and separate these from permanent exhibitions. Check program timing and changes before travel.",
    accessibility: "Review accessibility and current entrance arrangements directly with the operator. For the rest of a Rockport day, consider heat, sun and coastal weather when moving between the indoor museum and waterfront.",
    familiesAndGroups: "Children's maritime interpretation can work well with a short indoor visit followed by looking at real boats and coastal infrastructure. Ask about educator-led programs rather than assuming all shipbuilding or fishing activities run daily.",
    researchValue: "Read the displays as part of the environmental and economic history of Aransas Bay: shipping and seafood industries transformed settlements while depending on changing water conditions, navigation technology and coastal ecosystems.",
    exhibits: [
      { heading: "Boatbuilding and coastal commerce", detail: "Interpret ship design and industrial materials as responses to shallow bays, Gulf weather, port needs and regional commercial networks." },
      { heading: "Shipwrecks, Indigenous coastal history and navigation", detail: "Examine how archaeology and maritime objects recover histories that written commercial records may ignore, especially along the long-inhabited Gulf Coast." },
      { heading: "Fishing and offshore industries", detail: "Commercial fishing and energy are presented as parts of a working coastline, not simply as recreational attractions; connect the galleries to the harbor you can see outside." },
      { heading: "Tides of Freedom (February 2–December 31, 2026)", detail: "The operator dates this temporary exhibition February 2–December 31, 2026. It examines Bernardo de Gálvez, Spanish Gulf and Mississippi campaigns, and Texas cattle used to provision Spanish forces during the American Revolution. It is not a permanent display." },
      { heading: "Built for Victory (September 30–December 31, 2026)", detail: "The museum dates this temporary exhibition September 30–December 31, 2026. It details Texas coast shipyards, wooden Ferris-class steamships, experimental Aransas Pass concrete barges, and the Heldenfels Brothers Shipyard in Rockport during the First World War." },
    ],
    routes: [
      { label: "Museum highlights", steps: ["Focus on shipbuilding and shipwrecks", "Compare fishing and offshore industry displays", "Walk a short stretch of the nearby waterfront"] },
      { label: "Rockport heritage half day", steps: ["Visit the museum", "Continue to the bayfront", "Add local historical and cultural stops"] },
      { label: "Coastal history weekend", steps: ["Research bay commerce in the museum", "Visit Fulton Mansion on a separately arranged stop", "Explore other Aransas County maritime landscapes"] },
    ],
    sources: [
      { label: "Texas Maritime Museum — official exhibitions and visitor information", url: "https://texasmaritimemuseum.org/", use: "Admission, operating schedule and permanent themes" },
      { label: "Texas Maritime Museum — exhibitions", url: "https://texasmaritimemuseum.org/exhibits/", use: "Exhibition content and interpretation topics" },
      { label: "Texas Maritime Museum — education", url: "https://texasmaritimemuseum.org/museum-education-department/", use: "School tours, lectures and group bookings" },
      { label: "Texas Maritime Museum — October 2026 event calendar", url: "https://texasmaritimemuseum.org/events/month/2026-10/", use: "Month-specific event calendar; recheck before travel" },
      { label: "Texas Maritime Museum — Tides of Freedom", url: "https://texasmaritimemuseum.org/event/tides-of-freedom/", use: "Operator-confirmed Feb 2–Dec 31, 2026 exhibition dates and Spanish-Gulf Revolutionary War context" },
      { label: "Texas Maritime Museum — Built for Victory", url: "https://texasmaritimemuseum.org/event/built-for-victory/", use: "Operator-confirmed Sep 30–Dec 31, 2026 exhibit and Rockport wartime shipbuilding interpretation" },
    ],
    connections: [
      { label: "Aransas County", href: "/county/aransas", reason: "Explore Rockport and the surrounding bays." },
      { label: "Texas coast", href: "/explore/beaches-coast", reason: "Connect maritime history to coastal landscapes." },
    ],
  },
  "national-museum-pacific-war": {
    name: "National Museum of the Pacific War", slug: "national-museum-pacific-war", county: "Gillespie", city: "Fredericksburg", reviewed: "2026-10-12",
    topics: ["texas-history","military","maritime","world-war-ii"],
    whyVisit: "This Fredericksburg campus explains the Pacific Theater through personal records, weapons, maritime history, military decision-making and the lives of combatants and civilians. The museum grew from Fleet Admiral Chester W. Nimitz's hometown story and is much larger and more historically varied than an ordinary town museum.",
    visitorStrategy: "Allow at least half a day. Current general admission includes several campus exhibitions, but the Pacific Combat Zone closes earlier than the rest of the museum and the separately ticketed immersive experience The Rescue is an add-on. The operator currently lists Wednesday-to-Monday opening and Tuesday closure. Do not plan the afternoon as though every building stays open until 5 p.m.",
    accessibility: "This is a multi-location museum campus with separate exhibition areas and outdoor memorial spaces. Use the current site map and contact visitor services about accessible connections, distances and programs.",
    familiesAndGroups: "Historic material includes disturbing wartime subjects and physical combat exhibits, so choose exhibits according to maturity and available time. School groups should book through museum education channels; do not treat free outdoor memorials as equivalent to paid exhibits.",
    researchValue: "The Center for Pacific War Studies provides manuscripts, photographs, oral histories and research collections. Compare the museum's material evidence with first-person recollection and distinguish wartime decision-making from interpretations made decades later.",
    exhibits: [
      { heading: "George H. W. Bush Gallery and the Pacific War narrative", detail: "Follow the road into the war, combat across the Pacific and its consequences. Artifacts and firsthand accounts help explain why geography, logistics and competing political objectives mattered." },
      { heading: "Admiral Nimitz Gallery and personal biography", detail: "Use the Fredericksburg setting to understand how Chester Nimitz's career connects a small Texas town to the command of major Pacific operations." },
      { heading: "Pacific Combat Zone, memorials and The Rescue", detail: "Outdoor and immersive interpretation can deepen the story but operates on a different timetable; the Rescue requires a separate purchase. The Japanese Garden of Peace and memorial grounds offer reflection distinct from the combat exhibits." },
    ],
    routes: [
      { label: "Two-hour core history", steps: ["Focus on the main wartime gallery", "See the Nimitz material", "Use remaining time for the Memorial Courtyard"] },
      { label: "Half-day campus", steps: ["Start with the main gallery", "Complete the Combat Zone before its earlier closing", "Return to the memorial areas and additional exhibits"] },
      { label: "Deep research visit", steps: ["Read permanent exhibits carefully", "Select oral histories and documentary sources", "Plan any separate immersive tickets and archive access in advance"] },
    ],
    sources: [
      { label: "National Museum of the Pacific War — visit", url: "https://www.pacificwarmuseum.org/visit", use: "Current campus hours, maps and access" },
      { label: "National Museum of the Pacific War — exhibitions", url: "https://www.pacificwarmuseum.org/visit/exhibits", use: "Permanent and online exhibit topics" },
      { label: "National Museum of the Pacific War — tickets", url: "https://www.pacificwarmuseum.org/visit/ticket-prices", use: "Campus entitlements, ticket variations and timed add-ons" },
    ],
    connections: [
      { label: "Gillespie County", href: "/county/gillespie", reason: "See Fredericksburg's wider history." },
      { label: "Texas WWII history", href: "/article/texas-world-war-ii-bases-pow-camps", reason: "Explore the larger Texas home-front and military story." },
    ],
  },
  "frontier-texas": {
    name: "Frontier Texas!", slug: "frontier-texas", county: "Taylor", city: "Abilene", reviewed: "2026-08-30",
    topics: ["texas-history","military","ranching","living-history"],
    whyVisit: "Frontier Texas! uses immersive storytelling to introduce the frontier history of the Big Country while also operating as an Abilene visitor gateway. Its strongest use is to place later fort trips and ranch-history visits in context rather than treating the Old West as a single heroic narrative.",
    visitorStrategy: "Start at the interpretation center and check the theater schedule and last showtime before exploring exhibits; Sunday and holiday operations differ. Plan a focused one-to-two-hour stop, then continue into downtown Abilene or the wider Texas Forts Trail if time permits.",
    accessibility: "Confirm current accessibility, seating and theater arrangements directly with the museum. Downtown Abilene routes beyond the site may have different pedestrian conditions.",
    familiesAndGroups: "Immersive historical interpretation can work well for school-age children, but exhibits about violence, conflict and military expansion benefit from adult context. Group leaders should ask about school programming before arrival.",
    researchValue: "Connect the exhibits to documentary evidence about Indigenous nations, the U.S. Army, settler migration, ranching and railroads; frontier expansion had different consequences for each group.",
    exhibits: [
      { heading: "Frontier communities and trade", detail: "Explore how travel routes, supplies, work and trade shaped the Big Country, including networks established long before Anglo-American settlement." },
      { heading: "Military expansion and conflict", detail: "Place fort building and nineteenth-century campaigns alongside Indigenous displacement and the reshaping of land use; resist treating the material solely as reenactment." },
      { heading: "Ranching and Abilene's regional role", detail: "Interpret the shift from military and cattle-route economies toward transportation, commerce and the city visitors encounter today." },
    ],
    routes: [
      { label: "Museum stop", steps: ["Check the theater schedule", "Explore the frontier exhibits", "Ask at visitor services about downtown sites"] },
      { label: "Abilene half day", steps: ["Start at Frontier Texas!", "Walk or drive to another downtown museum", "Explore Abilene's historic core"] },
      { label: "Forts Trail launch", steps: ["Read the military and ranch-history interpretation", "Choose a confirmed-open regional fort site", "Plan travel distances and historic-site operations separately"] },
    ],
    sources: [
      { label: "Frontier Texas! — visitor information", url: "https://www.frontiertexas.com/visit/", use: "Current entrance, schedule and admission" },
      { label: "Frontier Texas! — official museum", url: "https://www.frontiertexas.com/", use: "Institutional purpose and exhibit updates" },
    ],
    connections: [
      { label: "Taylor County", href: "/county/taylor", reason: "Connect museum stories to Abilene." },
      { label: "Texas frontier forts road trip", href: "/article/texas-frontier-forts-road-trip", reason: "Continue the museum narrative into authentic historic sites." },
    ],
  },
  "texas-energy-museum-beaumont": {
    name: "Texas Energy Museum", slug: "texas-energy-museum-beaumont", county: "Jefferson", city: "Beaumont", reviewed: "2026-08-31",
    topics: ["texas-history","science","industry","gulf-coast"],
    whyVisit: "The Texas Energy Museum interprets the 1901 Spindletop oil discovery as both a Southeast Texas event and an important turning point in worldwide petroleum development. Its strongest visitor value lies in connecting geology, drilling, refining and the lives of people affected by industrialization.",
    visitorStrategy: "Begin with the Spindletop discovery, then follow the sequence from underground resources through production and refining before visiting downtown Beaumont's other museums. Check current visitor arrangements on the operator's site; do not assume dated admission prices or special-event schedules remain valid.",
    accessibility: "The museum's downtown indoor setting may simplify a hot-weather visit, but visitors should confirm accessible entrances, gallery circulation and restrooms directly with the operator.",
    familiesAndGroups: "Use drilling and refining exhibits to introduce how energy technology works. The nearby Spindletop-Gladys City Boomtown Museum is a separate historical site that helps make the 1901 boom's built environment tangible; coordinate its hours independently.",
    researchValue: "Interpret Spindletop in the context of oil geology, labor, refining, Gulf Coast shipping and economic change. Differentiate technical exhibits about petroleum processing from debates about the industry's environmental and social consequences.",
    exhibits: [
      { heading: "Spindletop and the 1901 discovery", detail: "The Lucas gusher was not simply a dramatic photograph. Examine why drilling technology, geology and investment combined to transform the region's economy." },
      { heading: "From exploration to refining", detail: "Follow how the industry locates and extracts hydrocarbons and how refineries transform raw materials into fuels and industrial products. Distinguish a working industrial process from a museum demonstration." },
      { heading: "Beaumont's changing industrial landscape", detail: "Place oil and gas infrastructure alongside transport, migration and city growth. Use nearby museums to compare workers' lives and local culture with the engineering story." },
    ],
    routes: [
      { label: "Oil-history essentials", steps: ["Read the Spindletop overview", "Explore extraction and refining displays", "Review the Beaumont industry timeline"] },
      { label: "Downtown museum half day", steps: ["Start at the Energy Museum", "Add the Fire Museum or Southeast Texas art", "Walk part of downtown if conditions permit"] },
      { label: "Spindletop heritage day", steps: ["Tour the Energy Museum", "Travel separately to Gladys City Boomtown Museum", "Compare interpretation with the actual oil-field landscape"] },
    ],
    sources: [
      { label: "Texas Energy Museum — visit", url: "https://www.texasenergymuseum.org/visit1.html", use: "Museum hours, admission and current access" },
      { label: "Texas Energy Museum — official institution", url: "https://www.texasenergymuseum.org/", use: "Core exhibits and institutional research context" },
    ],
    connections: [
      { label: "Jefferson County", href: "/county/jefferson", reason: "Understand Beaumont and the Spindletop landscape." },
      { label: "Texas science and industry", href: "/texas-science-technology-industry", reason: "Explore the role of energy in Texas industrial development." },
    ],
  },
  "1940-air-terminal-museum-houston": {
    name: "1940 Air Terminal Museum",
    slug: "1940-air-terminal-museum-houston",
    county: "Harris",
    city: "Houston",
    reviewed: "2026-10-12",
    topics: ["aviation", "texas-history", "architecture"],
    whyVisit: "The former 1940 Air Terminal Museum told Houston's commercial-aviation story inside Joseph Finger's Art Deco municipal airport terminal at Hobby Airport. Its significance survives the 2026 museum closure: the terminal building and historic aviation materials illuminate how Texas air travel grew before today's airports. This is now a historical reference guide, not a place to purchase museum admission.",
    visitorStrategy: "CLOSED TO PUBLIC MUSEUM VISITS. The Houston Aeronautical Heritage Society states that its museum ceased operations effective March 2, 2026. Old hours and ticket pages remain online but are superseded by the closure. The Texas Historical Commission took a short-term lease in July to consider preservation; that does not establish reopening. Do not travel to the working airport expecting access to the building, hangar or collections.",
    accessibility: "Public museum visitor routes, restroom access, parking and wheelchair arrangements are not operating during the closure. The terminal is on active airport property, and a historic site designation or preservation assessment is not permission to enter restricted airside locations. Contact the responsible institution before arranging any site-related accessibility request.",
    familiesAndGroups: "The former museum offered galleries, a theater and observation of passing aircraft; none of those former programs should be recommended as currently accessible. Families and field-trip organizers should choose an independently operating Houston aviation destination. An exterior landmark view may not be available without authorization because the area is part of an active airport.",
    researchValue: "The terminal opened September 28, 1940, served airline passengers into 1955, and reflects Houston's transition from small-airfield service to regional and international connections. Distinguish the protected 1940 building and its architectural history from the museum nonprofit, its dispersed or retained artifacts, and the separate Texas Historical Commission's assessment of future stewardship.",
    exhibits: [
      { heading: "Art Deco Houston Municipal Airport terminal", detail: "The restored terminal itself was the primary historic object: Joseph Finger's architecture expressed the confidence of early commercial air travel. View architectural photographs and the museum's historical account rather than promising entry." },
      { heading: "North and South Wing collections (historical)", detail: "Earlier galleries covered Houston airline operators, models, uniforms, WASP history and business aviation. These are descriptions of the former museum interpretation, not claims that displays are still open or intact." },
      { heading: "Carter Airmail Hangar and historic aircraft (historical)", detail: "The associated 1928 hangar and historic airplanes connected civil aviation with air-mail networks. All access to the hangar now requires separate authorized arrangements; do not infer it remains a public exhibit." },
    ],
    routes: [
      { label: "Historical research from home", steps: ["Read the institution's current closure and historic-terminal pages", "Review the Texas Historical Commission museum and historic-site records", "Check for any new preservation or reopening announcement before planning travel"] },
    ],
    sources: [
      { label: "Operator: current closure notice", url: "https://www.1940airterminal.org/", use: "Museum has ceased operations" },
      { label: "Operator: 1940 terminal historical interpretation", url: "https://www.1940airterminal.org/houston-municipal-airport", use: "Architecture, galleries and aviation significance" },
      { label: "Texas Historical Commission Atlas", url: "https://atlas.thc.texas.gov/Details/4200000902", use: "Institution's recorded place and legacy information" },
    ],
    connections: [
      { label: "Harris County", href: "/county/harris", reason: "Connect the site to Houston's growth, airports and industrial development." },
      { label: "Texas museums", href: "/explore/museums", reason: "Choose an institution independently verified as open before making a museum outing." },
    ],
  },
  "african-american-museum-dallas-fair-park": {
    name: "African American Museum, Dallas",
    slug: "african-american-museum-dallas-fair-park",
    county: "Dallas",
    city: "Dallas",
    reviewed: "2026-10-14",
    topics: ["african-american-history", "art", "civil-rights", "family"],
    whyVisit: "The African American Museum in Dallas brings African American art and cultural history into the landmark Fair Park campus, connecting Texas stories with wider national and international struggles for representation and civil rights. Its temporary exhibitions, documentary photographs and historical interpretation reward a focused visit rather than a quick detour between rides or stadium events.",
    visitorStrategy: "Find the museum at 3536 Grand Avenue inside Fair Park, generally using Gate 5. Normal individual admission is free; booked groups over ten may have fees and require reservations. IMPORTANT OCTOBER 2026 SCHEDULE DISCREPANCY: the operator's top visitor timetable says Tuesday–Saturday 10 a.m.–5 p.m., while a later FAQ block on the SAME page says Tuesday–Friday 11 a.m.–5 p.m. and Saturday 10 a.m.–5 p.m., plus separate State Fair hours of seven days a week 10 a.m.–7 p.m. Its top banner still refers to a May 1 reopening despite an active June–November 2026 Mandela exhibition. During the State Fair or major Fair Park events, call 214-565-9026 to confirm actual opening, Gate 5 access and parking before setting out. Do not advertise a single contradictory timetable as verified.",
    accessibility: "The museum identifies wheelchair accessibility and subtitled content for its current Mandela exhibition. Visitors with mobility or sensory needs should check the latest entrance, drop-off and exhibition-specific arrangements before travel. DART's Fair Park station is a viable transit choice, but walking routes within the grounds should be planned by the person visiting.",
    familiesAndGroups: "This is an excellent place for older children and teens ready for discussions about art, race, freedom and civil rights. The Mandela exhibition recommends ages eleven and older because some content can be emotionally intense. A museum visit is not a play-based children's museum experience; teachers should reserve organized groups ahead of time and choose the galleries appropriate to the students' ages.",
    researchValue: "The institution's long-running work in collecting African American art, preserving documentary photography and interpreting Black life in Texas helps visitors understand voices often minimized in general state-history narratives. The Nelson Mandela exhibition is on view June 13 to November 1, 2026; separate historical exhibitions listed on the site may have ended and must not be called current.",
    exhibits: [
      { heading: "Mandela: The Official Exhibition (through November 1, 2026)", detail: "A time-limited exhibition with four immersive galleries traces Mandela's life, imprisonment, activism and presidency. Its suggested audience is eleven and older and admission is free for general visitors." },
      { heading: "African American visual art and cultural interpretation", detail: "The institution presents permanent and rotating exhibitions exploring Black artistic traditions and experiences; check the current gallery roster rather than assuming past exhibitions remain on display." },
      { heading: "Sepia photographic legacy (past exhibition and research context)", detail: "The 2026 exhibit on Sepia Magazine highlighted the museum's extraordinary photographic archive but ended in August. Its larger contribution remains an instructive example of preserving Black journalism and cultural memory." },
    ],
    routes: [
      { label: "60–90-minute focused visit", steps: ["Enter Fair Park through the access gate given for today's event", "Choose the exhibition currently on view and read its age/content advisory", "Allow time to reflect on art and historical interpretation rather than rushing"] },
      { label: "Dallas cultural-history outing", steps: ["Start at the African American Museum", "Explore nearby Fair Park architecture and public spaces independently", "Connect the museum themes to other existing Dallas history guides"] },
    ],
    sources: [
      { label: "Museum: visiting and FAQ", url: "https://aamdallas.org/plan-your-visit/", use: "Hours, tickets, groups, gate and parking policies" },
      { label: "Museum: Mandela exhibit plan", url: "https://aamdallas.org/nelson-mandela-exhibition-plan-your-visit/", use: "2026 exhibits, dates, duration, accessibility and suggested age" },
      { label: "Museum: current and past exhibitions", url: "https://aamdallas.org/exhibits/", use: "Track changes to exhibition roster" },
    ],
    connections: [
      { label: "Dallas County", href: "/county/dallas", reason: "Connect Fair Park to Dallas history and cultural institutions." },
      { label: "Perot Museum", href: "/destination/perot-museum-nature-science-dallas", reason: "Another Dallas museum offering a very different family and learning experience." },
    ],
  },
  "texas-forestry-museum-lufkin": {
    name: "Texas Forestry Museum",
    slug: "texas-forestry-museum-lufkin",
    county: "Angelina",
    city: "Lufkin",
    reviewed: "2026-10-12",
    topics: ["natural-history", "texas-history", "industry", "family"],
    whyVisit: "The Texas Forestry Museum in Lufkin combines East Texas sawmill-town history, logging technology, working-forest interpretation and hands-on family learning. Its outdoor train display, forest trail and children's activities help visitors connect the state's timber economy to real landscapes rather than treating forestry as an abstract industry.",
    visitorStrategy: "The museum is at 1905 Atkinson Drive in Lufkin. Its visitor page lists Monday through Saturday 10 a.m. to 5 p.m., closed major holidays, with free regular admission. Allow roughly one to two hours for galleries and children's activities, and add time for the 0.4-mile Urban Wildscape Trail when weather allows. School and adult-group tours require advance arrangements; some out-of-county adult tours have a fee.",
    accessibility: "The museum specifically lists accessible restrooms, paved outdoor trail, ramps to the locomotive and Children's Wing and free sensory backpacks. Its grounds combine indoor and outdoor attractions, so visitors with wheelchairs, strollers or sensitivity to heat should plan the trail separately and confirm specific equipment or weather-dependent features with visitor services.",
    familiesAndGroups: "Children can use scavenger hunts, a train table, sawmill-town play structures, lawn games and a nature playscape. Pre-K groups have different activities from older students, and formal tours can include a sawmill history wing, paper-mill room and outdoor railway. A gift shop and bottled water are advertised, while picnic tables are available outside; no full-service restaurant is established on the official visit page.",
    researchValue: "The museum documents how logging, sawmill communities, rail transport, paper production and forest conservation transformed Angelina County and the wider Piney Woods. Visitors can ask how extractive industry changed forests and communities over time, and contrast that history with present-day sustainable forestry and recreational forest stewardship.",
    exhibits: [
      { heading: "Sawmill Town history", detail: "Exhibits explore the work and everyday lives behind the East Texas lumber boom, an essential complement to seeing only old machinery." },
      { heading: "Outdoor train, depot and caboose", detail: "The historical railway equipment illustrates how logs and goods moved across the Piney Woods. A trail or a train exhibit may be weather-dependent, so treat outdoor access separately." },
      { heading: "Paper Mill Room", detail: "The Southland paper-mill story shows how the wood-products economy diversified and how pulp manufacturing contributed to Lufkin's industries." },
      { heading: "Children's Wing, Nature Playscape and Urban Wildscape Trail", detail: "Hands-on activity areas and a roughly 0.4-mile interpretive trail provide different ways for toddlers, schoolchildren and adults to learn about forest ecology." },
    ],
    routes: [
      { label: "Family highlights in about an hour", steps: ["Explore the Children's Wing and sawmill-town stories", "Visit the train and caboose if outdoor conditions permit", "Use a scavenger hunt or hands-on exhibit"] },
      { label: "Half-day forestry and history", steps: ["Read the sawmill and paper-mill galleries", "Visit the outdoor equipment and trail", "Pair the museum with Angelina County or Lufkin heritage material"] },
    ],
    sources: [
      { label: "Museum: plan your visit", url: "https://www.treetexas.com/visit-us", use: "Address, hours, free admission, family amenities and accessibility" },
      { label: "Museum: exhibit guide", url: "https://www.treetexas.com/exhibit", use: "Current indoor and outdoor attractions" },
      { label: "Museum: tours and education", url: "https://www.treetexas.com/exhibits-1/paper-mill-room", use: "Group programming and sawmill/papermill interpretation" },
    ],
    connections: [
      { label: "Angelina County", href: "/county/angelina", reason: "Read the timber and railroad story in wider Piney Woods context." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare industrial and natural-history museums across Texas." },
    ],
  },

  "babe-didrikson-zaharias-museum-beaumont": {
    name: "Babe Didrikson Zaharias Museum & Visitor Center",
    slug: "babe-didrikson-zaharias-museum-beaumont",
    county: "Jefferson",
    city: "Beaumont",
    reviewed: "2026-10-12",
    topics: ["sports", "texas-history", "women-in-history"],
    whyVisit: "Beaumont's Babe Didrikson Zaharias Museum introduces the extraordinary range of sports mastered by Mildred Ella 'Babe' Didrikson Zaharias, from Olympic track and field to basketball and professional golf. The museum's artifacts and athletic honors allow visitors to follow one athlete's career across very different eras of women's sport and changing opportunities for women.",
    visitorStrategy: "Plan the museum as a focused Beaumont sports-history stop rather than a full-day attraction. Both the museum and Babe Zaharias Foundation advertise free admission at 1750 Interstate 10 frontage road in Beaumont. Their pages list Monday–Saturday, 9 a.m.–5 p.m., but the city facilities directory lists Saturday closed and Monday–Friday only. That mismatch must be shown clearly: call 409-833-4622 before any Saturday or holiday visit. A 45–90-minute visit is an editorial estimate, not an operator promise.",
    accessibility: "The Babe Zaharias Foundation describes access for disabled visitors, but does not publish comprehensive route-by-route or sensory-accessibility specifications. Confirm accessible parking, entrance and restroom arrangements with the museum before visiting if those features are critical. The museum is inside a distinct circular building near the Interstate 10 frontage road, not at the Babe Zaharias golf course or adjacent city park.",
    familiesAndGroups: "Museum interpretation is strongest for families and school-age children interested in athletes, records, fairness in sport and women's history. Children who enjoy trophies and stories of multi-sport achievement can compare 1932 Olympic events with later professional golf. There is no official evidence of a children's play gallery or museum cafeteria, so visitors should not expect either. Contact staff for groups before arriving.",
    researchValue: "Babe won javelin and hurdles gold at the 1932 Los Angeles Olympics and later became a defining figure in women's professional golf, helping establish the LPGA era. Museum narratives should distinguish her sporting legacy from promotional superlatives, explain that her Port Arthur birth and Beaumont upbringing are different places, and prioritize objects the operator confirms are on display, such as the Dead Head golf trophy.",
    exhibits: [
      { heading: "1932 Olympics and multi-sport achievement", detail: "Follow Babe's Los Angeles track-and-field success and connect it with her basketball, baseball and other athletic pursuits. The broader story is how she excelled when women's sporting opportunities were limited." },
      { heading: "Professional golf victories and trophies", detail: "Golf memorabilia introduces Babe's transition to tournament golf and her participation in shaping women's professional competition. Her Dead Head trophy is explicitly noted by the museum as displayed." },
      { heading: "Local legacy and Beaumont memories", detail: "Photographs and awards tell the story of a Port Arthur-born athlete who grew up in Beaumont, later became a national figure, and remains a defining name in the city's sports history." },
    ],
    routes: [
      { label: "An hour with Babe's sporting legacy", steps: ["Begin with the Olympic and early sports stories", "Compare golf achievements and the museum's displayed memorabilia", "Read the local Beaumont connection before leaving"] },
      { label: "Beaumont women-and-sports history day", steps: ["Visit the Babe Museum when staff confirm opening", "Read broader Jefferson County history and museum links", "Continue to another independently open Beaumont cultural museum if desired"] },
    ],
    sources: [
      { label: "Babe Zaharias Museum — current visitor information", url: "https://www.babezahariasmuseum.com/visit-the-babe-zaharias-museum/", use: "Admission, address, museum's hours and FAQ" },
      { label: "Babe Didrikson Zaharias Foundation — contact", url: "https://bdzfoundation.com/contact/", use: "Foundation schedule and accessibility note" },
      { label: "City of Beaumont — facility listing", url: "https://www.beaumonttexas.gov/facilities/facility/details/Babe-Zaharias-Museum-Visitor-Center-74", use: "Conflicting Saturday-hours listing" },
      { label: "Babe Zaharias Museum — athlete and exhibit history", url: "https://www.babezahariasmuseum.com/babe-zaharias/", use: "Displayed Dead Head trophy and athletic interpretation" },
    ],
    connections: [
      { label: "Jefferson County", href: "/county/jefferson", reason: "Explore Beaumont and Port Arthur heritage in local context." },
      { label: "Texas Energy Museum", href: "/destination/texas-energy-museum-beaumont", reason: "Contrast sports achievement with the city's industrial history." },
      { label: "Texas museums", href: "/explore/museums", reason: "Browse independently verified Texas visitor guides." },
    ],
  },
  "20th-century-technology-museum-wharton": {
    name: "20th Century Technology Museum",
    slug: "20th-century-technology-museum-wharton",
    county: "Wharton",
    city: "Wharton",
    reviewed: "2026-10-12",
    topics: ["science", "industry", "family", "texas-history"],
    whyVisit: "The 20th Century Technology Museum inside Wharton County Historical Museum invites visitors to see how familiar twentieth-century technologies changed daily life: toys, early personal computers, arcade machines and experimental aircraft. Its strength is the comparison between technologies children encounter digitally today and the actual machines people used a generation or two ago.",
    visitorStrategy: "Visit the shared museum complex at 3615 North Richmond Road in Wharton, not the museum's original 2005 former-jail location sometimes shown in older descriptions. The Wharton County Historical Museum currently advertises Monday–Friday 9 a.m.–4 p.m. and free entry; the Technology Museum's independent page lists a narrower Tuesday and Thursday schedule of 11 a.m.–3 p.m. as its 2025 update. Because these notices are not aligned, call 979-532-2600 or 979-488-7773 before treating the technology wing as open on a particular day. Allow roughly 60–90 minutes as an editorial estimate.",
    accessibility: "The site operates in a shared museum facility, but current official visit and technology exhibit pages do not specify wheelchair entrance details, hearing or sensory accommodations, or step-free access to each display. Ask the host museum about arrival, museum floor plan and any interactive displays before arranging a visit; an old wheelchair note from the former jail should not be assumed to apply to the current building.",
    familiesAndGroups: "Families with school-age children can compare 1970s–1980s arcade controls, historic toys and early computers with phones and gaming systems used today. Some machines may be displayed rather than playable; never promise visitors can operate every item. There is no published evidence of a full-service restaurant or museum cafeteria, so plan meals separately in Wharton. Ask the operator about demonstrations and suitable group experiences.",
    researchValue: "The technology galleries are one half of a wider historical museum context. The operator highlights early consumer computers, toys, arcade equipment and airplanes, connecting electronics with leisure, communication and transportation. Note that historical museum pages may mention radios, a jukebox or experimental airplanes; the contemporary host's listed exhibits are the better basis for deciding what to expect in the current wing.",
    exhibits: [
      { heading: "Personal computers from the early PC era to the 2000s", detail: "Compare how household computers changed in size, interface and use as the digital era moved from specialist equipment to a daily tool." },
      { heading: "Arcade machines of the 1970s and 1980s", detail: "The exhibit highlights game cabinets from a period when play took place in public arcades. Confirm whether specific games are running before promising hands-on access." },
      { heading: "20th-century toys and familiar gadgets", detail: "Mechanical, electronic and everyday toys provide an approachable explanation of changing childhood, manufacturing and consumer technology." },
      { heading: "Experimental aircraft and transport displays", detail: "The host museum describes several airplanes in its technology collections; check exhibit availability and whether any displays are temporarily relocated." },
    ],
    routes: [
      { label: "Family technology highlights", steps: ["Start with a comparison of old computers and today's digital devices", "Continue to arcade and toy interpretation", "End with aircraft or technology history according to the day's available displays"] },
      { label: "Wharton museum afternoon", steps: ["Confirm separately that the technology wing is open", "Visit the county's local-history galleries in the shared building", "Connect the displays to the surrounding Wharton County history and community"] },
    ],
    sources: [
      { label: "Host museum — contemporary technology exhibit", url: "https://www.whartoncountymuseum.org/tech-museum", use: "Computer, toy, arcade and aircraft display topics" },
      { label: "Wharton County Historical Museum — visit", url: "https://www.whartoncountymuseum.org/", use: "Building, address, host opening times and admission" },
      { label: "Technology museum — independent schedule", url: "https://www.20thcenturytech.com/location.html", use: "Narrow 2025 updated technology-wing opening hours" },
      { label: "Texas Historical Commission museum Atlas", url: "https://atlas.thc.texas.gov/Details/4200001087", use: "Historical institutional record, not current hours" },
    ],
    connections: [
      { label: "Wharton County", href: "/county/wharton", reason: "Connect technology stories to wider county and Colorado River history." },
      { label: "Texas museums", href: "/explore/museums", reason: "Discover other Texas science and family museums." },
    ],
  },

  "elisabet-ney-museum-austin": {
    name: "Elisabet Ney Museum",
    slug: "elisabet-ney-museum-austin",
    county: "Travis",
    city: "Austin",
    reviewed: "2026-10-12",
    topics: ["art", "texas-history", "architecture", "sculpture"],
    whyVisit: "The Elisabet Ney Museum preserves the Austin studio and residence known as Formosa, where German-born sculptor Elisabet Ney worked on portraits of significant figures including Sam Houston and Stephen F. Austin. Its historic limestone architecture, collection of portrait sculpture and restored native-prairie landscape make it a distinctive Texas arts landmark—although interior museum visits are currently suspended for renovation.",
    visitorStrategy: "CLOSED FOR RENOVATIONS SINCE DECEMBER 30, 2024. The City of Austin currently anticipates reopening in spring 2027, but that is a forecast, not a confirmed admission date. Do not follow outdated normal-hour listings or assume access to sculpture galleries, restrooms or grounds on ordinary museum visiting days. Instead use the museum's online exhibition and check city-posted education programs or individually announced on-site events, which can have separate registration and access rules.",
    accessibility: "The historic house and grounds are undergoing a capital-improvement, interpretation and landscape project intended to improve accessibility and visitor experience. These plans do not guarantee step-free access during construction or at every future historic room. The city lists the facility as closed; contact the museum to confirm accessibility for any separately announced event rather than assuming regular public access.",
    familiesAndGroups: "There is no normal museum admission or school group tour during the renovation closure. Families and educators can use the online sculpture exhibition and city-run 'Breaking the Mold' outreach activities; scheduled events must be checked individually. Once the museum reopens, age-appropriate discussions about portraiture, public monuments and an unconventional nineteenth-century woman artist may benefit older children and teens.",
    researchValue: "Ney purchased the property in 1892 and built Formosa as a sculpture studio after an earlier European portrait career. She modeled prominent Texans while maintaining links to European intellectual and artistic circles. Her studio later became a gathering place and after her death in 1907 was preserved as a public museum. Reopening interpretation will be shaped by the city's newer interpretive and landscape plans; exhibit availability should never be inferred from old photographs.",
    exhibits: [
      { heading: "Formosa: artist studio and historic limestone architecture", detail: "The 1892 stone studio and Ney's former residence is itself a major historical object. During renovation, explore the city’s historical account and photographs rather than promising a building tour." },
      { heading: "Portraits of Stephen F. Austin and Sam Houston", detail: "Ney's sculptures of these Texas figures help explain how the state chose to commemorate its founders. The museum has major related work, but galleries remain closed until official reopening." },
      { heading: "European portrait sculpture and Ney's independent career", detail: "The museum's interpretive history connects Ney's portraits of European political and intellectual leaders to the artistic network she carried into Texas." },
      { heading: "Art for Humanity's Sake: online exhibition", detail: "The official digital exhibition makes more than eighty collection items available for remote viewing while physical galleries cannot be visited." },
    ],
    routes: [
      { label: "Research Formosa from home", steps: ["Read the city museum's closure and renovation notice", "View Elisabet Ney: Art for Humanity's Sake online exhibition", "Explore the official artist-and-studio history for context"] },
      { label: "A future Austin art visit", steps: ["Confirm an actual reopening announcement, not just an anticipated date", "Check current admission, timed tours and accessibility after the renovation", "Combine a confirmed visit with another independently open Austin art museum"] },
    ],
    sources: [
      { label: "City of Austin — current closure and visitor status", url: "https://www.austintexas.gov/ney", use: "Closing date and anticipated 2027 reopening" },
      { label: "City of Austin — artist, studio and historical background", url: "https://www.austintexas.gov/ney/about-elisabet-ney-museum", use: "Formosa studio and original sculpture topics" },
      { label: "City of Austin — exhibit and online access", url: "https://www.austintexas.gov/ney/elisabet-ney-museum-exhibits", use: "On-site museum exhibits versus online access" },
      { label: "City of Austin — improvement project", url: "https://www.austintexas.gov/parks/projects/elisabet-ney-museum-improvements", use: "Public works, landscape and interpretation plans" },
    ],
    connections: [
      { label: "Travis County", href: "/county/travis", reason: "Connect the museum to Austin's creative and civic heritage." },
      { label: "Texas museums directory", href: "/explore/museums", reason: "Find another currently open art or history museum before traveling." },
    ],
  },

  "amon-carter-museum-american-art-fort-worth": {
    name: "Amon Carter Museum of American Art",
    slug: "amon-carter-museum-american-art-fort-worth",
    county: "Tarrant",
    city: "Fort Worth",
    reviewed: "2026-10-12",
    topics: ["art", "photography", "family", "texas-history"],
    whyVisit: "The Carter is one of Fort Worth's most accessible major art destinations because its permanent collection, rotating American-art exhibitions and galleries are all free to enter. Its scope goes far beyond cowboy paintings: western imagery, early and contemporary photography, landscapes, modernism and socially engaged American art let visitors see how the country has represented itself over time. The Fort Worth Cultural District setting makes it practical to combine with a second museum or a relaxed outdoor break.",
    visitorStrategy: "The Carter is at 3501 Camp Bowie Boulevard in Fort Worth. Admission is free, including regular special exhibitions. Hours are Tuesday, Wednesday, Friday and Saturday 10 a.m.–5 p.m.; Thursday 10 a.m.–8 p.m.; Sunday noon–5 p.m.; closed Monday and several holidays. Its own parking lot is free, but Camp Bowie Boulevard construction in 2026 can affect approaches, so follow the official parking map rather than assuming the simplest turn is open. A selective gallery visit takes roughly 60–120 minutes by editorial estimate. Thursday evening can work for visitors who want more time outside a typical museum day.",
    accessibility: "Both visitor entrances and all gallery floors have barrier-free access, with elevators, free first-come wheelchairs and strollers, accessible restrooms, and designated parking off Camp Bowie Boulevard or Lancaster Avenue. Sensory and accessibility resources include assistive listening, large-print labels, communication boards, tactile kits and arranged multisensory or ASL tours. A rear-pulled wagon is not allowed in galleries, though forward-pushed wagons are. These are substantive visit-planning options, not promises of a staff member on demand.",
    familiesAndGroups: "The Carter supports families with children as young as infants, including a pop-up space that is not open every day, ARTivity Totes available at the information desk and scheduled toddler and school-age workshops. For a short family visit, choose two or three artworks and an age-appropriate activity, rather than attempting every gallery. Food service is a small, locally catered food cart near the shop—not a cafeteria or full-service restaurant—and eating in galleries is prohibited; outdoor tables and the plaza are options.",
    researchValue: "The museum began with Amon G. Carter Sr.'s western art interests but interprets the larger history of American art through paintings, sculpture, prints and photographic holdings. Its changing 2026 schedule includes Re/Framed museum-wide collection rotations from October 10 into 2027, Georgia O'Keeffe and the Carter through September 2027 and The Statue of Liberty from Bartholdi to Warhol through January 3, 2027. Rotations mean exact works and rooms cannot be assumed permanent. Cite its exhibition page for the day of travel rather than promising a particular object is always displayed.",
    exhibits: [
      { heading: "American landscapes and the West", detail: "Historic western paintings, landscapes and bronzes provide one entry into how artists depicted expansion, land and national myths; interpret the images critically rather than treating them as a complete historical record." },
      { heading: "Photography and American experience", detail: "The Carter's photographic holdings span different eras and genres, allowing visitors to connect city life, people and social changes with the history of photographic media. Gallery selection rotates." },
      { heading: "Georgia O'Keeffe and the Carter (through September 2027)", detail: "The current exhibition combines O'Keeffe paintings and works on paper with letters and photographs exploring her relationships to the institution and American modernism." },
      { heading: "Re/Framed (October 2026–April 2027)", detail: "This collection-wide series rotates artworks and curatorial perspectives; it is valuable on repeat visits precisely because the same walls may show different works." },
      { heading: "Statue of Liberty from Bartholdi to Warhol (through January 3, 2027)", detail: "A temporary exhibition traces how the statue's image has changed in American visual culture since the late nineteenth century. Check which parts are open during the visit." },
    ],
    routes: [
      { label: "Free 75-minute first visit", steps: ["Start with the gallery map and choose one American art theme", "Explore a photography or landscape gallery", "Check the current temporary-exhibition floor before finishing on the plaza"] },
      { label: "Family visit with a break", steps: ["Borrow an ARTivity Tote or ask which children’s activities are available", "Spend a short period comparing two contrasting artworks", "Use the food cart or outdoor tables outside the galleries"] },
      { label: "Fort Worth arts half-day", steps: ["Visit the Carter during its published hours", "Walk the Cultural District and choose one additional independent museum", "Return for a later exhibition rotation rather than attempting all collections in one outing"] },
    ],
    sources: [
      { label: "Carter official plan your visit", url: "https://www.cartermuseum.org/plan-your-visit", use: "Admission, hours, transport, parking and visitor rules" },
      { label: "Carter official FAQ", url: "https://www.cartermuseum.org/frequently-asked-questions", use: "Food cart and admission policy" },
      { label: "Carter accessibility resources", url: "https://www.cartermuseum.org/plan-your-visit/accessibility", use: "Wheelchair, sensory, stroller and accessible tours" },
      { label: "Carter current exhibitions", url: "https://www.cartermuseum.org/exhibitions", use: "Current exhibit dates and rotation" },
      { label: "Carter 2026 Camp Bowie construction notice", url: "https://www.cartermuseum.org/camp-bowie-boulevard-construction", use: "Live access during roadworks" },
    ],
    connections: [
      { label: "Tarrant County", href: "/county/tarrant", reason: "Fort Worth neighborhoods, art and cultural history in local context." },
      { label: "Texas museum guide", href: "/explore/museums", reason: "Compare family art-museum options around Texas." },
      { label: "Dallas Museum of Art", href: "/destination/dallas-museum-of-art", reason: "A larger global collection makes a useful counterpart to the Carter's American-art focus." },
    ],
  },

  "dallas-museum-of-art": {
    name: "Dallas Museum of Art",
    slug: "dallas-museum-of-art",
    county: "Dallas",
    city: "Dallas",
    reviewed: "2026-10-12",
    topics: ["art", "family", "history", "architecture"],
    whyVisit: "The Dallas Museum of Art has a global collection of more than 25,000 works from roughly 5,000 years and offers multiple visit experiences: a free first-time highlights tour, a family art outing or a deeper focus on African, Asian, Indigenous American, European or contemporary art. Because the institution is large, visitor value comes from selecting a route and understanding what may require reservations and paid special-exhibition entry—not from enumerating its thousands of holdings.",
    visitorStrategy: "Enter at 1717 North Harwood in the Dallas Arts District. Regular gallery hours are Wednesday through Sunday, 11 a.m.–5 p.m.; closed Monday and Tuesday and key holidays. General admission is free, but everyone—including children—must obtain a free ticket or reservation. Special exhibitions may be ticketed. The underground museum garage is paid (the museum has advertised $25 for certain 2026 public programs, payable by card), and event-day rules can change. A practical selective visit takes around 90 minutes to two hours as an independent estimate. Museum entrance and cafe opening schedules should be checked separately.",
    accessibility: "Public museum galleries, entrances and restrooms are wheelchair accessible. A limited supply of wheelchairs is available at the main north entrance, and accessible parking is designated on P1, P2 and P3 of the museum garage. Families and visitors needing ASL or other accommodations should contact access@dma.org ahead of time; some public programs need two to three weeks of advance notice. Service animals are permitted, but pets and emotional-support animals do not receive the same access.",
    familiesAndGroups: "DMA provides family classes and seasonal activities, but children under twelve must be supervised by an adult, and everyone still needs a general-admission ticket. School groups of ten or more students require a separate program booking and advance payment; general public tickets are not a valid substitute. The DMA Cafe near the north entrance is a true café serving soups, salads, sandwiches and drinks, usually Wednesday through Sunday 11 a.m.–4 p.m., unlike a snack cart. Al Fresco on the plaza is a separately scheduled dessert and beverage counter. No food, drinks, bottles or snacks are allowed in the galleries.",
    researchValue: "The museum's current autumn 2026 roster spans international perspectives, including The First Bauhaus Portfolio (through August 15, 2027), Sonia Boyce: One Hundred Ways to Love (through August 22, 2027), X Marks the Spot: Contemporary Screenprinting at Brand X Editions (through November 8, 2026), Paradise on Earth: Florals in Indian Textiles (through November 15, 2026), and ongoing global and contemporary galleries. Exhibition titles and dates change quickly, and some installations are not included with a general ticket. Use the current exhibition directory to confirm what is on view.",
    exhibits: [
      { heading: "Ancient and global collection galleries", detail: "The museum's breadth includes art from Africa, the Americas, Asia and Europe spanning millennia. Choose a region or a theme rather than promising that every historic artwork is on view." },
      { heading: "X Marks the Spot: Contemporary Screenprinting (through November 8, 2026)", detail: "This temporary presentation explores contemporary printmaking through Brand X Editions; confirm whether ticketing differs from general gallery admission." },
      { heading: "The First Bauhaus Portfolio (through August 15, 2027)", detail: "A presentation of early Bauhaus prints provides a focused way to understand modernist design and interwar artistic experiments." },
      { heading: "Sonia Boyce: One Hundred Ways to Love (through August 22, 2027)", detail: "The installation brings a contemporary artist's perspective into the broader collection narrative; check its current gallery placement." },
      { heading: "Paradise on Earth: Florals in Indian Textiles (through November 15, 2026)", detail: "Historic and decorative textile imagery offers a concise entry point for visitors interested in design, global material culture and floral representation." },
    ],
    routes: [
      { label: "90-minute free-first visit", steps: ["Collect or show a free general-admission ticket", "Choose two contrasting art regions rather than trying every wing", "Finish with a current temporary display if it is included in your ticket"] },
      { label: "Family art and cafe afternoon", steps: ["Check age-suitable museum events for the day", "Visit a short selection of accessible galleries without carrying snacks inside", "Use the DMA Cafe or plaza service when its current schedule confirms availability"] },
      { label: "Dallas Arts District museum day", steps: ["Start with the DMA's permanent collection highlights", "Walk the neighboring Arts District and choose another museum with a different specialty", "Add the African American Museum at Fair Park on a separate route if the day's logistics permit"] },
    ],
    sources: [
      { label: "DMA official visit rules", url: "https://dma.org/visit", use: "Ticket requirements, hours, school groups, basic access" },
      { label: "DMA cafe and plaza service", url: "https://dma.org/visit/dma-cafe", use: "Actual food options and meal-service days" },
      { label: "DMA gallery exhibitions", url: "https://dma.org/art/exhibitions", use: "Temporary and permanent exhibit roster" },
      { label: "DMA accessibility resources", url: "https://dma.org/programs/access-programs", use: "Wheelchairs, accessible garage and services" },
      { label: "DMA museum additional visitor information", url: "https://dma.org/visit/additional-info", use: "Family and historical notes, some outdated sections require caution" },
    ],
    connections: [
      { label: "Dallas County", href: "/county/dallas", reason: "Dallas Arts District and nearby local cultural visits." },
      { label: "African American Museum at Fair Park", href: "/destination/african-american-museum-dallas-fair-park", reason: "Compare complementary Black history and art interpretation at a different Dallas institution." },
      { label: "Perot Museum of Nature and Science", href: "/destination/perot-museum-nature-science-dallas", reason: "Science-focused family learning as an alternative to an art-gallery visit." },
      { label: "Amon Carter Museum", href: "/destination/amon-carter-museum-american-art-fort-worth", reason: "Independent free admission museum specializing in American art in nearby Fort Worth." },
    ],
  },

  "amarillo-museum-of-art": {
    name: "Amarillo Museum of Art",
    slug: "amarillo-museum-of-art",
    county: "Potter",
    city: "Amarillo",
    reviewed: "2026-10-13",
    topics: ["art", "family", "texas-history", "accessibility"],
    whyVisit: "Amarillo Museum of Art is a free-admission cultural institution on Amarillo College's campus, bringing changing contemporary and historical art exhibitions to the Panhandle. Its permanent collections and special exhibitions connect local practice with global artistic traditions, so it works as a focused stop even for visitors without a prior interest in art.",
    visitorStrategy: "Admission is always free. The operator lists public hours Wednesday–Saturday 11 a.m.–5 p.m. and Sunday 1–5 p.m.; the museum closes Mondays, Tuesdays and listed holidays. Use the west-facing plaza entrance, not the Van Buren administrative door. Park in Amarillo College lots 5 or 6, with accessible spaces in lot 8. Campus museum visitors do not need parking permits. Allow approximately one to two hours for a selective tour; that is an editorial estimate.",
    accessibility: "AMoA confirms wheelchair access, ramps to the plaza entrance and from the north parking lot, a small elevator at the Van Buren entrance, and elevator access across the museum's three floors. Loaner wheelchairs are free on a first-come basis and accessible restrooms are located on the third floor. Accessible parking is in lot 8; school buses may unload at lot 5. Contact visitor services if a detailed mobility route is important.",
    familiesAndGroups: "Visitors with children can choose one changing exhibition, then discuss a few artworks and materials rather than attempting the entire building. School groups need arrangements through the museum's education team; free school programs may depend on available funding. No food or drink is allowed in galleries, and no full-service museum restaurant is substantiated by its visitor page. Outside meals and photo rules should be planned with the actual museum policies.",
    researchValue: "Do not treat rotating exhibitions as permanent displays. The official calendar lists Jack Craft: Land Mass (September 18, 2026–January 3, 2027) and Hills Snyder: Strays (August 29–December 13, 2026). AMoA's Asian art holdings grew through donations from the Price family, giving an international dimension to an institution also engaged with Texas and the Panhandle.",
    exhibits: [
      { heading: "Jack Craft: Land Mass (through January 3, 2027)", detail: "Contemporary work joining sculptural and woodblock-print techniques around landscape and material. This is a dated exhibition, not a permanently available collection." },
      { heading: "Hills Snyder: Strays (through December 13, 2026)", detail: "A cross-decade selection by an artist who worked in the Texas and New Mexico art scenes. Verify that it remains on view for your visit date." },
      { heading: "Asian art and the Price Collection", detail: "Gifts from Dr. and Mrs. William T. Price expanded AMoA's Asian art resources; current displays vary and should not be assumed to reproduce a complete collection catalogue." },
      { heading: "Panhandle landscapes and artists", detail: "Temporary shows and permanent-collection selections can connect regional places with wider art movements. Former Route 66 photography shows ended in summer 2026 and should not be advertised as current." },
    ],
    routes: [
      { label: "Free art hour", steps: ["Use the Amarillo College plaza entrance and current exhibit directory", "Choose a temporary show and one contrasting collection theme", "Leave room to reflect on an artwork without rushing the whole gallery"] },
      { label: "Panhandle culture outing", steps: ["Explore Amarillo Museum of Art", "Continue to a verified nearby local history or culture destination", "Use Potter County as context for downtown and regional history"] },
    ],
    sources: [
      { label: "Museum: visiting and parking", url: "https://www.amoa.org/visit", use: "Current admission, hours, accessible parking, tours and photo policies" },
      { label: "Museum: current exhibits", url: "https://www.amoa.org/", use: "Time-sensitive 2026–27 exhibition dates" },
      { label: "Museum: past exhibits", url: "https://www.amoa.org/past-exhibitions", use: "Do not mistake old Route 66 and other exhibits as currently open" },
    ],
    connections: [
      { label: "Potter County", href: "/county/potter", reason: "Connect Amarillo College with Panhandle art and culture." },
      { label: "Museums across Texas", href: "/explore/museums", reason: "Explore related art and local history museums." },
    ],
  },
  "holocaust-museum-houston": {
    name: "Holocaust Museum Houston",
    slug: "holocaust-museum-houston",
    county: "Harris",
    city: "Houston",
    reviewed: "2026-10-13",
    topics: ["world-history", "civil-rights", "family", "accessibility"],
    whyVisit: "Holocaust Museum Houston is a testimony-centered history museum where artifacts, recorded experiences and exhibits confront persecution, antisemitism, genocide and human rights. It is not a casual entertainment attraction: give the stories time and plan a reflective visit, with attention to the emotional weight of the material and the different ways survivors and families are represented.",
    visitorStrategy: "Official hours are Tuesday–Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m., normally closed Mondays; last entry is 4:30 p.m. The posted adult general admission is $22; ages 0–18 and college students with valid student ID are free. General public entry is free Thursdays 2–5 p.m. The museum has paid visitor parking after the first thirty minutes. Use the operator's current visitor page for any seasonal changes and ticket rules before arrival.",
    accessibility: "HMH says public areas are wheelchair accessible and offers elevators, visitor-service loaner wheelchairs, accessible parking, restrooms and a family restroom. Self-identified visitors with disabilities and a primary caregiver are admitted without charge. Service animals are allowed. Staff can accommodate medically necessary bags despite normal size restrictions, but contact Visitor Services about individualized assistance or sensory needs.",
    familiesAndGroups: "Children can enter free, but free admission does not mean the museum's Holocaust accounts and footage are suitable for every child's age or readiness. Adults should review content expectations with young visitors. Docent-led group tours last approximately one hour and require one chaperone for every 15 participants under 18; arrange school tours in advance. Outside lunches cannot be brought into the building, and gallery photography restrictions vary by floor.",
    researchValue: "Guide visitors through permanent Holocaust remembrance, survivor stories and the accompanying discussion of human rights, taking care not to conflate different historical events. In October 2026, the museum features Selling the Myth: Nazi Propaganda (opened October 3); exact exhibition availability must be checked each visit. The Boniuk Library serves research needs separately from gallery tours; Bagel Shop @ The Museum is a second-floor café, not a full-service restaurant.",
    exhibits: [
      { heading: "Permanent galleries and survivor testimony", detail: "Read individual accounts and view materials that explain the experiences of persecution and survival; allow time for interpretation rather than treating the gallery as a chronological checklist." },
      { heading: "Human rights interpretation", detail: "Connect historical examples to the museum's examination of human rights while preserving the distinct historical context of each event." },
      { heading: "Selling the Myth: Nazi Propaganda (opened October 3, 2026)", detail: "A time-limited exhibition examining manipulation, exclusion and propaganda. Confirm the closing date with the institution before describing it as current." },
      { heading: "Boniuk Library", detail: "This research library offers a separate route for deeper learning; it is not the museum's standard self-guided gallery and may follow separate access procedures." },
      { heading: "Bagel Shop @ The Museum", detail: "A second-floor café offering bagels, wraps, salads and coffee. The posted schedule is Tuesday–Saturday 10 a.m.–4 p.m., not identical to all museum hours." },
    ],
    routes: [
      { label: "Reflective first visit", steps: ["Start with the operator's current visitor and content information", "Follow survivor testimony and permanent museum galleries", "Add a temporary human rights exhibition only if the visit schedule and energy allow"] },
      { label: "Educational group visit", steps: ["Reserve an appropriate docent-led visit with sufficient adult chaperones", "Plan for security screening and restrictions on lunch bags", "Arrange later reflection or discussion rather than rushing on to another attraction"] },
    ],
    sources: [
      { label: "Museum: hours, tickets, parking and dining", url: "https://hmh.org/visit", use: "Current visitor policy, price, free periods and café" },
      { label: "Museum: accessibility", url: "https://hmh.org/visit/accessibility/", use: "Disability admission, wheelchair access and service animal rules" },
      { label: "Museum: tours and photography", url: "https://hmh.org/visit/tour-and-photo-guidelines/", use: "Tour duration, group chaperone and gallery photo policy" },
      { label: "Museum: exhibition updates", url: "https://hmh.org/", use: "New and expiring exhibitions, operating status" },
    ],
    connections: [
      { label: "Harris County", href: "/county/harris", reason: "Place the Museum District within wider Houston cultural history." },
      { label: "Museums across Texas", href: "/explore/museums", reason: "Compare history and interpretation museums across the state." },
    ],
  },

  "san-antonio-museum-of-art": {
    name: "San Antonio Museum of Art",
    slug: "san-antonio-museum-of-art",
    county: "Bexar",
    city: "San Antonio",
    reviewed: "2026-10-13",
    topics: ["art", "world-history", "family", "accessibility"],
    whyVisit: "The San Antonio Museum of Art brings five thousand years of world art into a former Lone Star Brewery along San Antonio's Museum Reach, combining an unusual industrial building with global collections. Its scale rewards selecting a topic—ancient Mediterranean art, Asian objects, Latin American art or changing exhibitions—rather than trying to examine every gallery in one visit.",
    visitorStrategy: "The museum is at 200 W. Jones Avenue. Current general adult admission is $24, with free admission for children 12 and under; Bexar County residents have free general admission Tuesday 4–7 p.m. and the second Sunday 10 a.m.–noon with proof of residency. Special-exhibition charges can apply. Public gallery hours are Tuesday and Friday 10 a.m.–7 p.m., Wednesday/Thursday/Saturday/Sunday 10 a.m.–5 p.m., closed Monday. The paid lot across the street uses a vehicle-registration service; museum members have separate parking provisions.",
    accessibility: "Wheelchairs are available upon request at the front desk first come, first served, and folding cane-stools are offered near the Great Hall. The museum's visitor information identifies accessible parking and welcomes service animals while excluding pets. The old brewery structure can involve a complex route, so visitors with detailed mobility or sensory requirements should discuss the gallery path with the museum before arrival.",
    familiesAndGroups: "Children age twelve and under receive free general admission; family visitors should focus on a few suitable rooms with outdoor breaks on Museum Reach. SAMA offers guided school tours with around 50 minutes of interpretation; Texas school groups and required chaperones are generally admitted free on confirmed tours, but at least two weeks' advance booking is necessary and special fees can apply. Tre Trattoria is a full-service Italian restaurant in the historic Hops House, NOT a museum snack cart or cafeteria; its dining hours run beyond the gallery's closing time.",
    researchValue: "Contrast SAMA's encyclopedic collections with San Antonio's other art institutions, and explain how a brewery became an art museum. Cite its current collections and temporary exhibit directory rather than implying every artifact is on display. Clarify that Bexar County free hours require proof of residency and that special-exhibition charges can remain, while the restaurant can operate when galleries are closed.",
    exhibits: [
      { heading: "Ancient Egypt, Greece and Rome", detail: "Select a few artifacts to compare ritual, daily life, sculpture and visual storytelling, while referring deeper catalogue research to the museum's own collection resources." },
      { heading: "Asian and Latin American art", detail: "Explore major cultural traditions across different time periods. Do not treat an entire region as one style or assume every collection object is always on view." },
      { heading: "The historic Lone Star Brewery building", detail: "The adaptive reuse of the nineteenth-century industrial complex is itself a reason to visit, with the museum's galleries arranged inside former brewery structures." },
      { heading: "The Etruscans: From the Heart of Ancient Italy (opens October 31, 2026)", detail: "A forthcoming exhibit on ancient Italy. Label it upcoming before October 31 and verify exhibit status for later visits." },
    ],
    routes: [
      { label: "A global-art museum visit", steps: ["Choose two cultural regions or artistic periods at the beginning", "Compare a few representative artworks and read their interpretation", "Finish with historic brewery architecture and the current special exhibition if available"] },
      { label: "Museum Reach art and river day", steps: ["Visit SAMA galleries during current museum hours", "Walk the Museum Reach toward the Pearl district if mobility and weather permit", "Reserve Tre Trattoria separately if dining there is part of the visit"] },
    ],
    sources: [
      { label: "SAMA current hours, ticket and parking policy", url: "https://www.samuseum.org/visit/", use: "Operating times, paid parking, Bexar County residency rules, group restrictions" },
      { label: "SAMA restaurant", url: "https://www.samuseum.org/visit/restaurant/", use: "Tre Trattoria food service and post-gallery-hour entrances" },
      { label: "SAMA school and group programs", url: "https://www.samuseum.org/visit/tour/public-and-charter-schools/", use: "Tour booking, student access, education programs" },
      { label: "SAMA current exhibitions", url: "https://www.samuseum.org/", use: "Temporary gallery availability, forthcoming Etruscan exhibition" },
    ],
    connections: [
      { label: "Bexar County", href: "/county/bexar", reason: "Place the former brewery and Museum Reach in local history." },
      { label: "Witte Museum", href: "/destination/witte-museum", reason: "A different San Antonio institution emphasizing Texas nature and history." },
      { label: "Museums across Texas", href: "/explore/museums", reason: "Compare art galleries and historical institutions in Texas." },
    ],
  },

  "kimbell-art-museum-fort-worth": {
    name: "Kimbell Art Museum",
    slug: "kimbell-art-museum-fort-worth",
    county: "Tarrant",
    city: "Fort Worth",
    reviewed: "2026-10-13",
    topics: ["art", "architecture", "family", "accessibility"],
    whyVisit: "The Kimbell combines a purposely selective art collection with two remarkable architectural buildings: Louis Kahn's daylight-filled original galleries and Renzo Piano's neighboring pavilion. Rather than trying to catalogue thousands of works, a strong visit compares a small number of globally significant artworks and notices how the gallery spaces shape their viewing.",
    visitorStrategy: "The permanent collection is always free, but admission to special exhibitions is separately ticketed. The museum opens Tuesday–Thursday 10 a.m.–5 p.m., Friday noon–8 p.m., Saturday 10 a.m.–5 p.m., Sunday noon–5 p.m.; closed Monday. Current special-exhibition adult admission is $18, with discounted half-price hours Tuesdays and Friday evenings. Parking is free in the museum underground garage and designated lots. The Piano Pavilion hosts many special exhibitions while the Kahn building houses regular collection galleries.",
    accessibility: "Wheelchair users should enter the Kahn building from the east via Van Cliburn Way, because its west entrance is not wheelchair accessible. The Piano Pavilion is accessible from the underground garage and designated group drop-off. Accessible parking, limited loaner wheelchairs, benches and folding stools are offered, and a campus assistance vehicle connects the two buildings. Sensory hours, social narratives, hearing support and ASL arrangements are available with appropriate advance requests.",
    familiesAndGroups: "Families can visit the permanent collection free, use child-friendly audio material and register for sensory-friendly programming when scheduled. Studio or educational experiences vary by day, not all galleries are appropriate for play, and families must keep food and drink out of galleries. The Kimbell Café in the Kahn Building serves lunch, take-away food and afternoon tea; it is a proper museum café with dining tables but not a formal full-service restaurant. The Piano Café is currently listed as temporarily closed.",
    researchValue: "The collection is intentionally modest in size compared with encyclopedic museums; its scope includes European, African, Asian and ancient works. On view October 4, 2026–January 17, 2027, Photography's First Century is a ticketed special exhibition drawing from France's national library collections. Distinguish gallery admission from exhibition tickets, the two architects' buildings and the Kimbell's café from neighboring Fort Worth cultural institutions.",
    exhibits: [
      { heading: "Permanent global art collection", detail: "Compare selected European, Asian, African, ancient and Mesoamerican artworks. Object rotations and conservation mean a famous piece may not always be on view." },
      { heading: "Louis Kahn's original museum building", detail: "Observe the daylight entering the concrete vaults and the sequence of quiet gallery rooms, which are an important part of the institution's legacy." },
      { heading: "Renzo Piano Pavilion", detail: "Explore the companion building and how its natural light and gallery scale support temporary exhibitions and public programming." },
      { heading: "Photography's First Century (October 4, 2026–January 17, 2027)", detail: "A ticketed display of early photography from the Bibliothèque nationale de France. Check remaining entry times and whether reduced-price sessions suit the visit." },
      { heading: "Kimbell Café in the Kahn Building", detail: "Lunch, boxed meals and afternoon tea are offered separately from gallery opening times; the Piano Café remains temporarily closed according to current operator information." },
    ],
    routes: [
      { label: "Free first visit in 75 minutes", steps: ["Enter through the Kahn building for free collection galleries", "Choose two or three works from different periods or cultures", "Pause to understand the architecture and natural lighting"] },
      { label: "Cultural District art afternoon", steps: ["Start with the Kimbell's free collection or a booked special exhibition", "Visit the nearby Amon Carter Museum for American art", "Choose the Modern Art Museum or a café stop depending on time and interests"] },
    ],
    sources: [
      { label: "Kimbell operator hours and admission", url: "https://kimbellart.org/visit", use: "Current schedule, discounted special exhibition and parking" },
      { label: "Kimbell accessibility and transit", url: "https://kimbellart.org/visit/accessibility", use: "Two-building accessibility, ramp routes and sensory programs" },
      { label: "Kimbell dining", url: "https://kimbellart.org/visit/dine", use: "Kimbell Café menu, hours, afternoon tea and closed Piano Café" },
      { label: "Kimbell tickets and exhibitions", url: "https://kimbellart.org/tickets", use: "Permanent collection free; ticketed temporary shows" },
      { label: "Kimbell group tour rules", url: "https://kimbellart.org/content/tours", use: "Advance tour bookings and group experience" },
    ],
    connections: [
      { label: "Tarrant County", href: "/county/tarrant", reason: "Fort Worth's cultural and architectural heritage." },
      { label: "Amon Carter Museum of American Art", href: "/destination/amon-carter-museum-american-art-fort-worth", reason: "A nearby American-art collection with a different mission." },
      { label: "Museums across Texas", href: "/explore/museums", reason: "Compare family-friendly art museums around the state." },
    ],
  },

  "nasher-sculpture-center-dallas": {
    name: "Nasher Sculpture Center",
    slug: "nasher-sculpture-center-dallas",
    county: "Dallas",
    city: "Dallas",
    reviewed: "2026-10-13",
    topics: ["art", "sculpture", "architecture", "family"],
    whyVisit: "The Nasher pairs intimate galleries for modern and contemporary sculpture with an accessible outdoor sculpture garden in the Dallas Arts District. Its visitor experience depends as much on moving around three-dimensional objects, the changing light and the Renzo Piano-designed building as on viewing a particular famous artist. Unlike the broad Dallas Museum of Art next door, the Nasher offers a focused encounter with sculpture and the relationship between artworks and public space.",
    visitorStrategy: "The current Plan a Visit page lists Wednesday–Sunday 11 a.m.–5 p.m. and closure on Monday and Tuesday. An older hours page still advertises Tuesday admission and should not override the newer plan-a-visit schedule. Standard adult admission is $10; under-twelves and qualifying groups enter free. Free First Saturdays and third-Friday evening programs have their own hours. The Nasher does not provide a general-public parking lot: use the paid Dallas Museum of Art garage, other nearby garages, street meters or DART Rail to Pearl/Arts District or St. Paul.",
    accessibility: "The Nasher documents an ADA-compliant curbless main entrance, ramps on both sides of its sculpture garden, step-free indoor galleries, visitor wheelchairs and portable seats on request. Visitor services offers a quiet room, sensory kits, family guides and advance help with other needs. Service animals are welcome; a sculpture garden is not automatically a children's playground, and distance from artworks still matters.",
    familiesAndGroups: "Families with young children can borrow family activity kits or use exhibit-specific guides and Free First Saturdays programming, generally offered between 11 a.m. and 2 p.m. The museum's cafe is an actual seasonal-sandwich, salad and soup cafe, not a full-service restaurant. It normally serves Wednesday–Sunday 11 a.m.–2:30 p.m.; general admission is required even to visit the cafe. Only food purchased at the cafe is permitted in the garden. Book student groups and any structured tours in advance; don't infer current policies from decade-old school-tour PDFs.",
    researchValue: "The Nasher's emphasis on modern and contemporary sculpture makes it a strong independent complement to the Dallas Museum of Art, Crow Museum of Asian Art and public artwork around the Arts District. Visitors should compare how a sculpture changes when viewed from different positions, how weather and daylight affect an outdoor installation, and which artworks are temporary versus part of a changing collection installation. Named works cannot be assumed on view permanently.",
    exhibits: [
      { heading: "Light-filled Renzo Piano galleries", detail: "The architecture is part of the experience: natural light, narrow sightlines and indoor-to-garden transitions encourage visitors to consider material, scale and space." },
      { heading: "Outdoor sculpture garden", detail: "Trees, water and outdoor artworks allow viewers to walk around sculptures rather than experience them only from one frontal viewpoint; some installations and routes may change." },
      { heading: "Modern masters and twentieth-century sculpture", detail: "Works by artists such as Matisse, Picasso and Giacometti are central to the institution's collection identity, but the gallery selection changes with conservation and exhibitions." },
      { heading: "Nasher Public and temporary exhibitions", detail: "Rotating exhibits by living artists and changing installations make repeat visits different. Check the exhibition calendar instead of promising a particular artwork is always available." },
    ],
    routes: [
      { label: "75-minute sculpture-focused visit", steps: ["Check today's gallery map and choose two contrasting sculpture materials", "Explore the indoor galleries slowly, changing your viewpoint around each object", "Finish in the accessible garden if weather permits"] },
      { label: "Dallas art and architecture outing", steps: ["Begin at the Nasher to compare architecture and sculpture", "Visit Dallas Museum of Art separately for a broader global collection", "Take an Arts District or Klyde Warren Park break depending on the weather"] },
    ],
    sources: [
      { label: "Nasher current visit plan", url: "https://www.nashersculpturecenter.org/visit/plan-a-visit", use: "Current days, tickets, free programs, garage, transit" },
      { label: "Nasher accessibility", url: "https://www.nashersculpturecenter.org/visit/accessibility", use: "Ramp routes, wheelchairs, sensory and quiet room" },
      { label: "Nasher Cafe official page", url: "https://www.nashersculpturecenter.org/visit/cafe", use: "Cafe menu type, admission access and hours" },
      { label: "Nasher visitor resources", url: "https://www.nashersculpturecenter.org/visit/visit-resources", use: "Family guides and independently useful museum interpretation" },
    ],
    connections: [
      { label: "Dallas County", href: "/county/dallas", reason: "Connect the museum to Downtown Dallas and the Arts District." },
      { label: "Dallas Museum of Art", href: "/destination/dallas-museum-of-art", reason: "Compare global art and free general collection access with this focused sculpture collection." },
      { label: "African American Museum Dallas", href: "/destination/african-american-museum-dallas-fair-park", reason: "Another specialized Dallas arts-and-history institution with different visitor goals." },
    ],
  },
  "national-cowgirl-museum-hall-fame-fort-worth": {
    name: "National Cowgirl Museum and Hall of Fame",
    slug: "national-cowgirl-museum-hall-fame-fort-worth",
    county: "Tarrant",
    city: "Fort Worth",
    reviewed: "2026-10-13",
    topics: ["texas-history", "women-in-history", "western-culture", "family"],
    whyVisit: "The Cowgirl tells American western history through the lives of women who worked as ranchers, rodeo champions, artists, writers, entrepreneurs and performers. Its biographies, clothing, historical artifacts and interactive installations challenge the notion that the West was built exclusively by cowboys. It is a distinctly different experience from Fort Worth's more general art and science museums, and its Fort Worth Cultural District setting makes cross-museum comparisons practical.",
    visitorStrategy: "IMPORTANT OCTOBER 2026 CLOSURE: The institution's current homepage announces closure to the general public beginning October 19, 2026, ahead of its expansion opening November 7. On November 7, its member preview begins at 10 a.m. and general public opening at noon. Do not recommend a normal visit during October 19–November 6. When operating normally, its listed schedule is Tuesday–Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m., closed Monday. Admission prices and city-controlled parking depend on visit category and event; check the latest official page, especially around the Fort Worth Stock Show.",
    accessibility: "The institution welcomes wheelchairs, mobility scooters, canes and walkers in permitted museum areas. Large bags, oversized strollers and wagons cannot be brought into crowded galleries. The building and exhibit mix are changing for a major 2026 expansion, so do not infer that all new galleries, elevators or interactive activities will be available before November 7. Contact visitor services at 817-336-4475 for specific access and sensory support.",
    familiesAndGroups: "Interactive Western Design and Bucking Bronc galleries reopened partially in April 2026, but the museum closes to the general public October 19–November 6 for expansion. Newly added galleries and an 18-horse carousel are scheduled for the November 7 public reopening; do not promise them before that date. School field trips are described as resuming after Thanksgiving 2026; organized tour pages may still display earlier pricing and group rules. The museum does not advertise a full-service restaurant inside. Food and drink are barred from galleries; outdoor benches and Alice Walton Park picnic tables are nearby.",
    researchValue: "A permanent exhibit, Hitting the Mark, interprets women performers in Wild West shows, including an Annie Oakley interpretation that uses Pepper's Ghost technology and historical artifacts. Western Design and Bucking Bronc were available before the autumn closure, and the expansion proposes fashion, photography, personal-collection galleries and carousel. Treat opening dates as explicit transitions rather than timeless inventory; compare how women actually worked with later theatrical portrayals of the 'cowgirl'.",
    exhibits: [
      { heading: "Hitting the Mark: Cowgirls and Wild West Shows", detail: "A permanent gallery investigates women who performed in Wild West shows from the 1880s into the early twentieth century, with photographs, posters and an Annie Oakley multimedia presentation." },
      { heading: "Western Design Room", detail: "An interactive table explores the influence of Western dress and design; the museum announced its partial return in April 2026 before the later October expansion closure." },
      { heading: "Bucking Bronc Room", detail: "An immersive simulated rodeo experience allows visitors to see themselves in a bronc-riding video; availability changes with renovation and expansion schedules." },
      { heading: "Cowgirl Hall of Fame stories", detail: "Personal narratives connect women working in ranching, art, business, entertainment, public life and competitive sport. The exhibition presentation can rotate." },
      { heading: "Expansion galleries and Cowgirl Carousel", detail: "New gallery spaces and a custom-made carousel are planned for the November 7, 2026 reopening. These are future features until the operator confirms public access." },
    ],
    routes: [
      { label: "Visit after the November 7 reopening", steps: ["Verify the museum has actually reopened and check event-day hours", "Choose Wild West Show stories and a Hall of Fame exhibit", "Explore the new expansion galleries and carousel only if they are open"] },
      { label: "Cultural District women's history day", steps: ["Tour the Cowgirl on a confirmed operating date", "Compare women's sporting history with a wider Texas museum or research guide", "Pair the outing with Fort Worth's adjacent science museum if same-day tickets suit your group"] },
    ],
    sources: [
      { label: "Museum official homepage closure banner", url: "https://thecowgirl.org/", use: "October 19 to November 7 public closure" },
      { label: "Museum Plan Your Visit", url: "https://thecowgirl.org/visit/", use: "Hours, admission, parking, bag and food policies" },
      { label: "Museum November 7 expansion event", url: "https://thecowgirl.org/event/expansion-grand-opening/", use: "Member preview, public opening and event traffic" },
      { label: "Museum expansion and 2026 galleries", url: "https://thecowgirl.org/about/museum-expansion/", use: "Planned galleries and carousel, not preopening guarantees" },
      { label: "Museum Hitting the Mark gallery", url: "https://thecowgirl.org/exhibitions/hitting-the-mark-cowgirls-and-wild-west-shows-gallery/", use: "Permanent Wild West Show interpretation" },
      { label: "Museum school group policy", url: "https://thecowgirl.org/field-trips/", use: "School field trip pause until after Thanksgiving" },
    ],
    connections: [
      { label: "Tarrant County", href: "/county/tarrant", reason: "Connect Fort Worth Cultural District museums and women's regional history." },
      { label: "Amon Carter Museum", href: "/destination/amon-carter-museum-american-art-fort-worth", reason: "Compare American art with the lived cultural history of western women." },
      { label: "Babe Didrikson Zaharias Museum", href: "/destination/babe-didrikson-zaharias-museum-beaumont", reason: "Compare a Fort Worth western-women focus with Beaumont's women-in-sport history." },
    ],
  },

  "fort-worth-museum-science-history": {
    name: "Fort Worth Museum of Science and History",
    slug: "fort-worth-museum-science-history",
    county: "Tarrant",
    city: "Fort Worth",
    reviewed: "2026-10-13",
    topics: ["science", "texas-history", "family", "accessibility"],
    whyVisit: "This Cultural District institution blends hands-on science, regional history, early-childhood learning, a planetarium and the separate large-format Omni Theater. Families can spend time in DinoDig and the TCU Children's Gallery while older visitors compare Texas ranching history, planetarium presentations and more exploratory science programs. Rather than one identical museum experience for every age, visitors should choose exhibits according to children's developmental stage and whether they want an Omni film.",
    visitorStrategy: "General public visitors must enter through the Omni Theater lobby on Lansford Lane, not the old Gendy Street entrance, which as of August 11, 2026 is reserved for school groups. The museum is normally open Tuesday–Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m.; closed Monday. Tickets for the Omni Theater are sold separately from general museum admission, while Noble Planetarium shows and the Cattle Raisers Museum are included subject to showtimes and capacity. Parking is city-managed: Western Heritage Garage is closest to the public entrance, accessed through Gate 19 on Gendy, with event surcharges possible.",
    accessibility: "The operator advertises wheelchair-accessible museum areas and limited loaner wheelchairs at the admissions desk, along with a Calming Room for sensory breaks, free sensory backpacks, communication boards and scheduled Sensory Saturday programming. Mobility parking is limited in nearby Cultural District lots. Some planetarium and Omni presentations have specific times, sensory intensities or seating restrictions; visitors requiring adaptations should confirm these in advance with guest services.",
    familiesAndGroups: "Children in pre-kindergarten through early elementary school may enjoy the new TCU Children's Gallery, designed primarily for the youngest learners; school field-trip materials limit the Children's Museum to second grade and under. DinoDig encourages participatory paleontology, while planetarium programming appeals to school-age children and adults. Exhibit Café is a real café serving salads, sandwiches and flatbreads, normally Tuesday–Saturday daytime; it is CLOSED Sundays. Field trips require separate booking and arrive through Gendy Street, not the general public entrance. Food and drink cannot be taken into exhibits.",
    researchValue: "A high-quality visit guide must distinguish the included Noble Planetarium from the separately ticketed 8K LED Omni Theater, and the Cattle Raisers Museum inside from the independent Cowgirl museum next door. A stale site map may still label the old main entrance as Gendy Street, so use the current August 2026 operating announcement. Exhibitions and shows rotate: do not promise a dinosaur object, Omni film or planetarium program without checking today's selection.",
    exhibits: [
      { heading: "DinoDig and DinoLabs", detail: "Participatory dinosaur and fossil exhibits bring the geology and prehistory of North Texas to life, with hands-on opportunities suited especially to children." },
      { heading: "TCU Children's Gallery", detail: "The newer child-centered gallery emphasizes age-appropriate exploration, pretend play and discovery. Check the current age limit for school visits, which differ from family attendance." },
      { heading: "Noble Planetarium", detail: "Public planetarium shows are included with museum admission when available, but showtimes and seat counts can limit access." },
      { heading: "Cattle Raisers Museum", detail: "Interpretation of cattle raising and ranch culture is inside the museum and generally included with ordinary admission. It is not the separate National Cowgirl Museum." },
      { heading: "Jane & John Justin Foundation Omni Theater", detail: "An 8K LED dome presents immersive films in a distinct separately ticketed experience; a general museum ticket alone does not guarantee entry." },
      { heading: "Innovation Studios and science galleries", detail: "Hands-on experiments and design activities complement regional-history exhibits; current room availability depends on rotating exhibits and programming." },
    ],
    routes: [
      { label: "Family science visit in about two hours", steps: ["Use the Lansford Lane public entrance and select a child's age-suitable hands-on gallery", "Explore DinoDig or the new TCU Children's Gallery as appropriate", "Check the included Noble Planetarium schedule and reserve time for a show if seats are available"] },
      { label: "Science, history and Omni afternoon", steps: ["Start with science galleries and the Cattle Raisers Museum", "Choose a separately ticketed Omni film, checking start time before the museum tour", "Visit Exhibit Café only during its published operating days and times"] },
    ],
    sources: [
      { label: "Museum current visit, parking and tickets", url: "https://www.fwmuseum.org/visit/plan-your-visit/", use: "New entrance, admission, planetarium vs Omni, food and accessibility" },
      { label: "Museum official homepage", url: "https://www.fwmuseum.org/", use: "Current exhibitions, TCU Children's Gallery and visitor notices" },
      { label: "Museum school field trips", url: "https://www.fwmuseum.org/learn/field-trips/", use: "Age limits, chaperones and group entrance" },
      { label: "Museum contact and assistance", url: "https://www.fwmuseum.org/contact/", use: "Group and visitor contacts" },
    ],
    connections: [
      { label: "Tarrant County", href: "/county/tarrant", reason: "Connect Fort Worth Cultural District museums and family outing options." },
      { label: "National Cowgirl Museum", href: "/destination/national-cowgirl-museum-hall-fame-fort-worth", reason: "A neighboring but separate museum on western women's lives and history." },
      { label: "Amon Carter Museum", href: "/destination/amon-carter-museum-american-art-fort-worth", reason: "Contrast interactive science with American art across the Cultural District." },
    ],
  },
  "dallas-holocaust-human-rights-museum": {
    name: "Dallas Holocaust and Human Rights Museum",
    slug: "dallas-holocaust-human-rights-museum",
    county: "Dallas",
    city: "Dallas",
    reviewed: "2026-10-13",
    topics: ["texas-history", "civil-rights", "human-rights", "accessibility"],
    whyVisit: "The Dallas Holocaust and Human Rights Museum uses Holocaust survivor testimony, documentary exhibits and interactive human-rights interpretation to examine historical atrocities, moral choices and civic responsibility. Its three permanent wings connect the Holocaust/Shoah with universal human rights and the efforts of upstanders to challenge injustice in American history. A visit is emotionally demanding and should not be treated like a quick entertainment stop.",
    visitorStrategy: "The current 2026 visitor FAQ lists public hours of 10 a.m.–5 p.m. daily EXCEPT Tuesdays, with holiday exceptions. Public entry is at 300 N. Houston Street in the West End, while groups use the Ross Avenue entrance. The museum recommends weekday visits after 1 p.m. to avoid school-group crowds. Current adult admission is $19 and students $12, with other discounts depending on eligibility. Visitors must pass security screening. Admission includes the permanent wings, the special exhibition gallery, a theater and Dimensions in Testimony subject to the latter's timed reservation and limited capacity.",
    accessibility: "The museum states its public visitor routes, theaters and restrooms comply with ADA access standards and allows service animals. Recorded exhibition material offers English and Spanish captions and there are accessible and sensory-oriented visitor tools. The site restricts bags larger than 19 by 17 by 8 inches; strollers cannot enter theaters and there is no bag or coat check. The West End DART station is about a block away, while covered visitor parking is across the street at 301 N. Houston.",
    familiesAndGroups: "The museum recommends ages twelve and above because of the Holocaust permanent collection's disturbing historical subject matter. Younger children's suitability depends on the individual child and exhibition. Most visitors need approximately two to three hours for the three permanent wings, temporary show and theaters; organized groups require advance arrangements. There is no documented general visitor café or cafeteria in the current FAQ. The Piccadilly Cafeteria named in the Pivot to America exhibition is a historic civil-rights case study, NOT an on-site restaurant.",
    researchValue: "The Holocaust/Shoah Wing documents genocide and survivor stories; the Human Rights Wing broadens the historical framework, and Pivot to America examines American ideals, injustice and repair through interactive kiosks. Its Texas Upstander Wall and Piccadilly Cafeteria sit-in content connect broader history to local civil-rights events. The prior Walt Disney Studios and World War II temporary exhibition ended September 10, 2026, and must not be advertised as currently on view.",
    exhibits: [
      { heading: "Holocaust/Shoah Wing", detail: "Personal testimony, documents and history trace Nazi persecution, genocide and the experiences of Jewish victims and other targeted communities. Consider whether every visitor is prepared for the material." },
      { heading: "Human Rights Wing", detail: "A historical framework for rights violations and moral choices provides a bridge between Holocaust remembrance and broader civic responsibilities." },
      { heading: "Pivot to America Wing", detail: "Interactive kiosks explore American ideals and historical repair, including the Texas Upstander Wall and Dallas civil-rights examples." },
      { heading: "Dimensions in Testimony Theater", detail: "Visitors can pose questions to interactive recorded survivor testimony. It is part of general admission but requires a time and reservation when space is limited." },
      { heading: "Memorial and Reflection Room", detail: "A space to remember the dead and reflect on Dallas families' losses helps visitors engage without rushing directly into another attraction." },
    ],
    routes: [
      { label: "Two-hour reflective first visit", steps: ["Review age and security guidance, including bag limits, before arrival", "Follow the Holocaust/Shoah, Human Rights and Pivot to America wings at a sustainable pace", "Use the memorial space before leaving; check if Dimensions in Testimony has an available time"] },
      { label: "Educator and civic-history outing", steps: ["Book the group through the museum's group entrance procedures", "Focus on survivor testimony and selected Texas Upstander stories rather than an exhaustive artifact inventory", "Connect museum learning to wider Dallas civil-rights history and reflection activities"] },
    ],
    sources: [
      { label: "Museum 2026 visitor FAQ", url: "https://www.dhhrm.org/visit/faq/", use: "Current hours, tickets, age guidance, policies, parking and food" },
      { label: "Museum official visiting information", url: "https://www.dhhrm.org/visit/", use: "Arrival and tour options" },
      { label: "Museum permanent exhibitions", url: "https://www.dhhrm.org/exhibitions/", use: "Permanent wings and formerly dated temporary exhibitions" },
      { label: "Museum Pivot to America Wing", url: "https://www.dhhrm.org/exhibitions/pivot-to-america-wing/", use: "Texas upstanders, Piccadilly historic interpretation and memorial" },
    ],
    connections: [
      { label: "Dallas County", href: "/county/dallas", reason: "Connect the West End museum to Dallas cultural and civil-rights history." },
      { label: "African American Museum Dallas", href: "/destination/african-american-museum-dallas-fair-park", reason: "Compare interpretive approaches to Texas Black history and activism." },
      { label: "Dallas Museum of Art", href: "/destination/dallas-museum-of-art", reason: "Nearby major arts destination with very different tone and focus." },
    ],
  },

  "modern-art-museum-fort-worth": {
    name: "Modern Art Museum of Fort Worth",
    slug: "modern-art-museum-fort-worth",
    county: "Tarrant",
    city: "Fort Worth",
    reviewed: "2026-10-13",
    topics: ["art", "architecture", "family", "accessibility"],
    whyVisit: "The Modern Art Museum of Fort Worth combines Tadao Ando's concrete and glass architecture, a monumental reflecting pond, a serious twentieth- and twenty-first-century art collection and one of Fort Worth's few true full-service museum restaurants. Visitors should distinguish its paid galleries and temporary exhibitions from the architecture, café, cinema and public programs. The Fort Worth Cultural District setting makes it a natural complement to the Kimbell's international historical art and the Carter's American art.",
    visitorStrategy: "CRITICAL AUTUMN 2026 ACCESS CHANGE: exhibition galleries are CLOSED September 29–October 30, 2026 for installation; the museum remains open for FREE visitor activities in its grand lobby, In the Making: The Sculpture Project, films, programs, shop and Café Modern. The new collection presentation is advertised for October 31, 2026–August 15, 2027. Outside the closure period, normal hours are Tuesday–Thursday and Saturday–Sunday 10 a.m.–5 p.m., Friday 10 a.m.–8 p.m., Monday closed. Standard gallery admission is $16 adults, $12 seniors/military/first responders, $10 students, under 18 free, with free Fridays and half-price Sundays. These rates do not override the free October 2026 lobby program. Check current reopening before promising galleries.",
    accessibility: "The Modern's Darnell Street visitor entrances and public spaces, including lobby, museum galleries when open, auditoriums, elevators, Café Modern and the Modern Shop, are wheelchair accessible. Accessible parking is near the main entrance; visitors may borrow wheelchairs or portable seats. The auditorium has assisted listening and sometimes captioned films, including a phone-based Listen Everywhere option. Specific assistance is arranged through the operator; do not promise special-film availability without checking the schedule.",
    familiesAndGroups: "During October 2026, the FREE In the Making: The Sculpture Project offers hands-on artmaking for all ages in the lobby while the galleries are shut. Regular Sunday Family Tours are paused during the October gallery installation and are expected to return after reopening; do not advertise them for October. Outside installation periods, visitors under 18 enter galleries free and can request a child activity book; pushchairs are normally permitted with supervision. Café Modern is a full-service restaurant and bar with lunch, weekend brunch and Friday dinner. No food or drink is permitted in galleries.",
    researchValue: "The Modern's strongest visitor themes are the relationship between Tadao Ando's building, its reflective pool and changing sculpture, and the art of the postwar and contemporary eras. Visitors in October 2026 should not be led to expect a permanent painting or sculpture gallery accessible during installation. The official site distinguishes October's lobby sculpture project from the Stories from the Collection presentation starting October 31. The visible public program can still support an architecture- and artmaking-centered museum outing.",
    exhibits: [
      { heading: "Tadao Ando museum architecture and reflecting pond", detail: "The building's poured-concrete planes, extensive glazing and large reflecting pond are essential parts of a visit and remain relevant even when collections are temporarily unavailable; confirm outdoor access." },
      { heading: "In the Making: The Sculpture Project (through October 30, 2026)", detail: "Temporary free all-ages artmaking in the Grand Lobby, presented during a period when the museum galleries are entirely closed for installation." },
      { heading: "In the Making: Stories from the Collection (opens October 31, 2026)", detail: "The forthcoming multi-room collection exhibition surveys modern and contemporary artworks. Until October 31 it is a future opening, not an accessible display." },
      { heading: "Modern and contemporary art collection", detail: "The museum's collection includes postwar painting, photography, sculpture and installation; the particular works visible depend on exhibition rotations and conservation." },
      { heading: "Café Modern, shop and cinema", detail: "The café is an operating full-service restaurant and the museum hosts film and auditorium programs separately from its galleries; verify film times and table availability." },
    ],
    routes: [
      { label: "October 2026 lobby and café visit", steps: ["Enter for the free lobby sculpture-making activity, not a gallery tour", "Explore the architecture and reflective pond only where publicly accessible", "Book Café Modern separately for lunch or Friday dinner if desired"] },
      { label: "Gallery visit after October 31 reopening", steps: ["Confirm the exhibition reopened rather than rely only on an announced date", "Choose one or two galleries and check the current tour schedule", "Compare the Modern with the nearby Carter or Kimbell if time and interest allow"] },
    ],
    sources: [
      { label: "Modern official visitor hours and temporary gallery closure", url: "https://www.themodern.org/visit/hours-and-admission", use: "Full September 29–October 30 gallery closure; normal tickets and gallery hours" },
      { label: "Modern October sculpture program", url: "https://www.themodern.org/exhibition/making-sculpture-project", use: "Free October lobby program; galleries closed" },
      { label: "Modern Café Modern", url: "https://www.themodern.org/caf%C3%A9-modern", use: "Full-service restaurant rather than snack bar" },
      { label: "Modern accessibility", url: "https://www.themodern.org/accessibility", use: "Wheelchair, sensory and auditorium support" },
      { label: "Modern tours", url: "https://www.themodern.org/tours", use: "October public-tour suspension and reopening plans" },
    ],
    connections: [
      { label: "Tarrant County", href: "/county/tarrant", reason: "Understand Fort Worth's Cultural District and its walkable cluster of art museums." },
      { label: "Amon Carter Museum", href: "/destination/amon-carter-museum-american-art-fort-worth", reason: "Compare American art with the Modern's wider postwar and contemporary focus." },
      { label: "Kimbell Art Museum", href: "/destination/kimbell-art-museum-fort-worth", reason: "Compare historic international art with modern and contemporary collecting." },
    ],
  },

  "american-quarter-horse-hall-of-fame-museum-amarillo": {
    name: "American Quarter Horse Hall of Fame & Museum",
    slug: "american-quarter-horse-hall-of-fame-museum-amarillo",
    county: "Potter",
    city: "Amarillo",
    reviewed: "2026-10-13",
    topics: ["texas-history", "western-culture", "family", "sports"],
    whyVisit: "The Amarillo American Quarter Horse Hall of Fame & Museum interprets the fastest quarter-mile breed, its role in ranch work, rodeo, racing and recreation, and the breeders, trainers, owners and horses celebrated in the Hall of Fame. It is a focused western-history stop, not a stable offering routine recreational horseback rides. The building also displays western art, artifacts and breed history, making it useful for people without an equestrian background.",
    visitorStrategy: "The operator's museum-specific commerce contact page lists Tuesday–Saturday 9 a.m.–5 p.m., but the Texas Historical Commission's older museum Atlas record says Tuesday–Friday until 4 p.m. and Saturday until 5 p.m. Older tourism brochures list Monday access too. This disagreement makes it important to call 806-376-5181 before a trip; do not confuse weekday American Quarter Horse Foundation office hours with museum opening. Admission is ordinarily paid according to Visit Amarillo; special Family Fun Days may be free, but no reliable current standard ticket amount is established. The museum sits at 2601 East Interstate Drive in Amarillo and is undergoing a multistage renovation through the decade.",
    accessibility: "The museum operator's public information does not provide a current detailed accessible-entrance, restroom, tactile or sensory map. The event booking service offers a way to request disability accommodations, but that specific event FAQ should not be treated as a complete guarantee for normal museum tours. Confirm access and ongoing construction routes through museum@aqha.org or 806-376-5181 before travel.",
    familiesAndGroups: "Families interested in horses and the West can explore Hall of Fame stories, breed-related artworks and changing interactive education displays. In July 2026, the museum opened the outdoor Wagonhound Paddock for scheduled live-horse experiences; visitors should not expect a horse or demonstration to be present throughout ordinary public hours. A 2026 five-phase renovation may temporarily move galleries and educational rooms. The museum has a gift shop, but no verified general visitor café, cafeteria or full-service restaurant. Private event catering arrangements do not constitute public dining service.",
    researchValue: "Quarter Horses are named for their speed over roughly a quarter-mile, but modern history reaches much further into cattle work, ranching, horse breeding, showing and recreation. Hall of Fame people and horses provide a useful lens for understanding that transition. The institutional history and past exhibition descriptions should be separated from galleries demonstrably open during multiyear 2026–2030 construction. Distinguish the HQ offices, rental event halls and the museum public admission.",
    exhibits: [
      { heading: "Hall of Fame people and horses", detail: "Biographical honors feature influential Quarter Horses, breeders, riders and other contributors to the breed. The honored individual roster changes with inductions." },
      { heading: "Quarter-mile speed and ranching heritage", detail: "Connect the breed's early sprinting abilities with later stock-horse work, racing and the development of western sport rather than limiting the history to shows." },
      { heading: "Western paintings and horse-themed art", detail: "The institution houses western art and a museum shop, but specific works are not guaranteed to remain hung during ongoing renovations." },
      { heading: "Wagonhound Paddock and education (2026 development)", detail: "A new outdoor area was introduced in July 2026 for encounters with an actual Quarter Horse at organized events. Check museum programming and weather before promising a live animal visit." },
      { heading: "Changing interactive galleries", detail: "A multiyear phased renovation is adding classrooms and immersive features; past promotional photos do not prove an interactive is available now." },
    ],
    routes: [
      { label: "Breed and Hall of Fame introduction", steps: ["Confirm the museum's current opening time and renovation access by telephone", "Explore Hall of Fame history and historical Quarter Horse achievements", "Check what art or interactive gallery is operating that day"] },
      { label: "Amarillo horse and Panhandle history day", steps: ["Start at the American Quarter Horse Hall of Fame Museum", "Read Potter County's ranching history and other Amarillo heritage material", "Pair with a separately verified open museum or Route 66 destination if time allows"] },
    ],
    sources: [
      { label: "Museum operator current contact and museum hours", url: "https://aqha-museum.myshopify.com/pages/contact-us", use: "Operator-posted Tuesday–Saturday 9–5 schedule and contact" },
      { label: "Texas Historical Commission Atlas", url: "https://atlas.thc.texas.gov/Details/4200000009", use: "Older conflicting hours and museum identity, date-stamped 2024" },
      { label: "Amarillo tourism official listing", url: "https://www.visitamarillo.com/listing/american-quarter-horse-hall-of-fame-%26-museum/650/", use: "Admission-fee designation and visitor attraction themes" },
      { label: "AQHA museum event and family access", url: "https://www.aqha.com/museum", use: "Official museum institution and events (some automated requests are blocked)" },
      { label: "2026 Family Fun Day and paddock opening report", url: "https://www.newschannel10.com/2026/07/09/american-quarter-horse-hall-fame-museum-host-family-fun-day-saturday/", use: "Evidence of 2026 Wagonhound Paddock and live horse event" },
    ],
    connections: [
      { label: "Potter County", href: "/county/potter", reason: "Understand Amarillo ranching, Route 66 and Plains history." },
      { label: "Amarillo Museum of Art", href: "/destination/amarillo-museum-of-art", reason: "Contrast Quarter Horse ranch heritage with a focused visual art institution." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare equestrian, sports and regional history collections." },
    ],
  },

  "museum-of-fine-arts-houston": {
    name: "Museum of Fine Arts, Houston",
    slug: "museum-of-fine-arts-houston",
    county: "Harris",
    city: "Houston",
    reviewed: "2026-10-13",
    topics: ["art", "family", "architecture", "accessibility", "houston-history"],
    whyVisit: "One of Houston's principal cultural destinations, MFAH offers a broad world-art visit across three distinct gallery buildings, outdoor public spaces and changing exhibitions. A first visit works best by choosing a few periods or subjects rather than trying to view the entire collection. Its Sarofim Campus is separate from the Bayou Bend and Rienzi house museums, which have their own access arrangements.",
    visitorStrategy: "The main Sarofim Campus normally opens Wednesday 11 a.m.–5 p.m., Thursday and Friday 11 a.m.–9 p.m., Saturday 11 a.m.–6 p.m. and Sunday 12:30–6 p.m.; closed Mondays and Tuesdays. As of this review, All Access adult admission is $24, youth 13–18 $20, and children 12 or younger free. Thursday permanent-collection admission is free, but a separate ticket may be needed for special exhibitions. Beck Garage (1144 Binz Street), Glassell Garage (5101 Montrose Boulevard) and Kinder Garage (5500 Main Street) serve different entrances: choose parking to fit the building you want to see. Allow 90 minutes for a focused visit or several hours for multiple buildings; these are editorial estimates.",
    accessibility: "MFAH publishes accessible entrances and services across campus, including sensory-processing kits available at the Beck and Kinder coat checks, accessible audio-guide formats and advance visitor assistance. Its accessibility page identifies Wednesday and Friday from about 1–4 p.m. as quieter times; Thursday can be busy because permanent collection admission is free. Visitors with mobility, hearing, visual or sensory needs should consult the current building-specific visitor resources before arriving.",
    familiesAndGroups: "Children under thirteen receive free entry, with all participants subject to the current ticket policy. Strollers and soft front-facing carriers are permitted; large bags, wagons and wheeled luggage are not. Galleries prohibit food and drinks. The campus has two Cafe Leonelli locations for casual Italian-inspired café meals or snacks, while Le Jardinier is a separate full-service, Michelin-starred restaurant; do not call all three food options a museum cafeteria. Group tours of ten or more require advance arrangements and may qualify for discounts.",
    researchValue: "Explain how the Audrey Jones Beck, Caroline Wiess Law, and Nancy and Rich Kinder buildings divide the main museum's visitor experience, and why Bayou Bend and Rienzi require separate travel. The globally varied collection spans five millennia, but works move for conservation and exhibition changes. MFAH can be compared to Holocaust Museum Houston for a very different historical mission and to other Museum District institutions by audience and visit type.",
    exhibits: [
      { heading: "Audrey Jones Beck and Caroline Wiess Law buildings", detail: "These buildings frame portions of the historical and international collections. Use the current gallery map rather than assuming any particular masterwork is always hung." },
      { heading: "Nancy and Rich Kinder Building", detail: "Designed for modern and contemporary art, Kinder adds a distinct architectural experience with its luminous glass exterior and spaces devoted to art of recent decades." },
      { heading: "Cullen Sculpture Garden and campus spaces", detail: "Outdoor sculpture and the setting around the buildings offer breaks between galleries, subject to weather and the Museum's current access rules." },
      { heading: "Changing international art exhibitions", detail: "Time-limited exhibitions may require All Access tickets even when the permanent galleries are free; check the exhibition list and ticket type." },
      { heading: "Bayou Bend and Rienzi (separate house museums)", detail: "Both interpret historical decorative arts and collections but occupy different sites near Memorial Park. They are not galleries you can reach by walking from the main Sarofim Campus." },
    ],
    routes: [
      { label: "90-minute first-time museum tour", steps: ["Select one of the three main Sarofim Campus gallery buildings based on your interests", "Choose a few galleries from the current map instead of trying the full collection", "Finish with outdoor campus architecture or sculpture if weather and access permit"] },
      { label: "Museum District afternoon", steps: ["Check separate ticket eligibility for main collection and temporary exhibits", "Allow a meal at a café or reserve Le Jardinier if seeking full table service", "Link a second nearby museum only if time and visitor interests support it"] },
    ],
    sources: [
      { label: "MFAH official plan your visit", url: "https://www.mfah.org/visit", use: "Hours, pricing, garage locations, food-service distinctions, group policy" },
      { label: "MFAH admission and free Thursdays", url: "https://www.mfah.org/visit/admission-information", use: "Free permanent collection on Thursday, special exhibition rules" },
      { label: "MFAH visitor guidelines", url: "https://www.mfah.org/visit/visiting-guidelines", use: "Bags, strollers, gallery photography and food" },
      { label: "MFAH accessibility", url: "https://www.mfah.org/visit/accessibility-resources/", use: "Sensory resources and quieter visit times" },
    ],
    connections: [
      { label: "Harris County", href: "/county/harris", reason: "Explore Houston and Museum District attractions in context." },
      { label: "Holocaust Museum Houston", href: "/destination/holocaust-museum-houston", reason: "Compare an art museum with a testimony-centered history institution." },
    ],
  },
  "art-museum-south-texas-corpus-christi": {
    name: "Art Museum of South Texas",
    slug: "art-museum-south-texas-corpus-christi",
    county: "Nueces",
    city: "Corpus Christi",
    reviewed: "2026-10-13",
    topics: ["art", "family", "architecture", "coastal-texas", "accessibility"],
    whyVisit: "The Art Museum of South Texas pairs changing visual-art exhibitions with a memorable bayfront setting and buildings linked to architects Philip Johnson and Ricardo Legorreta. It is particularly useful for visitors interested in Texas and Americas art who want to combine an art visit with other Corpus Christi cultural sites. The Johnson Building also has dedicated family-activity facilities, which are not the same as a conventional children's museum.",
    visitorStrategy: "The museum operates at 1902 North Shoreline Boulevard in the S.E.A. District. The museum was temporarily closed July 1, 2026 by an HVAC failure affecting the Legorreta building and Elizabeth's café, and explicitly announced reopening July 3, 2026. Do not perpetuate the closure alert as if it were still current. For exact admission, recurring free-entry dates, hours and special events, consult the museum's current Admission & Hours page; a free-admission summer promotion ended July 31, 2026 and is not an ongoing policy. Allow roughly 60–120 minutes for exhibits and possibly more for family activities, depending on availability.",
    accessibility: "The operator says ADA-compliant parking exists in each museum parking lot and complies with ADA service-animal requirements. Visitors with specific physical-access arrangements should call 361-825-3500; the operator also highlights the ReBokeh iOS visual-accessibility tool for image adjustments. Individual exhibitions, older buildings and event access may have additional considerations, so avoid assuming every temporary exhibit is equally accessible without confirmation.",
    familiesAndGroups: "The ArtCade Creation Station on the first floor of the Johnson Building offers youth-oriented art activities, drawing/animation computer stations, magnetic art and a children's reading area. It closes to public drop-in use during summer camps, and its opening schedule should be checked rather than promised year-round. The Blanche Moore Digital Studio has supervised, reserved hours and can serve ages ten and older accompanied by an adult. Elizabeth's is an actual café/restaurant inside the museum; call 361-882-8785 about dining hours and reservations rather than assuming gallery hours and restaurant hours match.",
    researchValue: "The two-building complex offers a way to connect art with Corpus Christi's coastal architectural landscape. Interpret current work and collections from Texas and the Americas without reproducing the operator's artwork database. Since exhibition schedules and available galleries can change quickly, check the current exhibitions directory. The 2026 HVAC incident is important only as a caution against treating undated closure statements as timeless.",
    exhibits: [
      { heading: "Texas and Americas collection selections", detail: "The museum's collections and rotating exhibits provide an entry point into visual art shaped by Texas, Latin America and the wider Americas; confirm which works are on view." },
      { heading: "Philip Johnson and Ricardo Legorreta architecture", detail: "The relationship between the bayfront, the Johnson Building and the Legorreta addition can be explored even on a short visit; museum and café access may vary independently." },
      { heading: "Changing exhibitions in the two-building museum", detail: "Exhibition schedules make repeat visits worthwhile, but no particular past exhibit should be represented as continuing after its closing date." },
      { heading: "ArtCade Creation Station", detail: "The Johnson Building's interactive family area includes drawing, animation and hands-on projects; it can close during children's camps." },
      { heading: "Blanche Moore Digital Studio", detail: "Reserved, supervised computer and creative-software sessions offer art-technology activities; check age minimum, session fees and calendar before traveling." },
    ],
    routes: [
      { label: "Family gallery and ArtCade visit", steps: ["Check that ArtCade is open for drop-in use rather than reserved for camps", "Choose one current art exhibition and a short period in the family creative space", "Consider Elizabeth's for a meal only after checking restaurant access"] },
      { label: "Corpus Christi waterfront arts visit", steps: ["Start with the art museum's current exhibitions and architectural viewpoints", "Walk the bayfront when weather permits", "Use Nueces County and other local museum guides to plan a separate cultural stop"] },
    ],
    sources: [
      { label: "AMST plan a visit and accessibility", url: "https://www.artmuseumofsouthtexas.org/plan-your-visit/", use: "Current admission, mobility help and visitor rules" },
      { label: "AMST at the museum", url: "https://www.artmuseumofsouthtexas.org/plan-your-visit/at-the-museum/", use: "Elizabeth's café, ArtCade closure periods, digital studio" },
      { label: "AMST July 2026 reopening statement", url: "https://www.artmuseumofsouthtexas.org/temporary-closure-update/", use: "Confirms July 3 reopening after brief HVAC-related closure" },
      { label: "AMST seasonal free admission notice", url: "https://www.artmuseumofsouthtexas.org/free-admission-to-the-art-museum-of-south-texas-summer-2026/", use: "Free-admission promotion had a July 31 end date" },
    ],
    connections: [
      { label: "Nueces County", href: "/county/nueces", reason: "Explore Corpus Christi and the coastal arts landscape." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare art, science and historical visitor experiences." },
    ],
  },

  "houston-museum-of-natural-science": {
    name: "Houston Museum of Natural Science",
    slug: "houston-museum-of-natural-science",
    county: "Harris",
    city: "Houston",
    reviewed: "2026-10-13",
    topics: ["natural-history", "science", "family", "energy", "accessibility", "dinosaurs"],
    whyVisit: "The Houston Museum of Natural Science in Hermann Park combines large-scale natural history, paleontology, Texas energy engineering, astronomy, ancient cultures and living butterflies. It serves different visitors in different ways: dinosaur fans may want only the Morian fossil hall; families can plan hands-on science and live butterflies; adults can compare energy systems or ancient cultural exhibits. A selective visit is more enjoyable than attempting every hall, theater and special attraction in one admission window.",
    visitorStrategy: "HMNS at Hermann Park is at 5555 Hermann Park Drive, not its separate Sugar Land location. The operator lists museum hours Monday–Thursday 9 a.m.–5 p.m. and Friday–Sunday 9 a.m.–6 p.m.; extended-season and holiday changes occur. Regular permanent-hall general admission currently costs $25 for adults and $16 for ages 3–11 and seniors 62+, but prices can change. The attached garage is currently $30 for nonmembers, $10 for members, cannot be reserved, and has a 6-foot-8-inch vehicle clearance. Public permanent halls are free Tuesdays from 5–8 p.m.; that does not include the planetarium, giant screen theater, Butterfly Center, special exhibits or parking. Purchase/confirm specific attraction tickets and entry slots separately.",
    accessibility: "HMNS documents elevators to its multi-level halls, reserved accessible garage parking on every level, limited Caroline Street accessible spaces, accessible family restrooms with two adult-changing tables, and a published sensory guide rating sound, lighting, touch and smell by gallery. Sensory-friendly accommodations and mobility-device access depend on the attraction. Ordinary strollers may not enter the planetarium, giant screen theater or Cockrell Butterfly Center; mobility devices used as an accessibility accommodation are treated differently. For a specific accessibility need, use the museum's current accommodation page before travel.",
    familiesAndGroups: "Younger visitors often find the Morian Hall of Paleontology, wildlife halls and Butterfly Center especially engaging, while older children may spend longer with energy technology and astronomy. The Butterfly Center is a live animal exhibit, so do not touch wildlife and park ordinary strollers at its entrance. Plan breaks; ordinary permanent-hall tickets permit re-entry for meals, while many special exhibitions are single-entry. There are two actual museum eating options: Periodic Table, a bistro-style sandwich, salad and coffee counter near the Butterfly Center, and Elements Grill, a casual grill serving burgers, fries, chicken and vegetarian options—not a formal full-service restaurant. School groups can preorder meals and must follow group booking rules.",
    researchValue: "The museum offers a useful comparison of scientific method and public storytelling: a dinosaur timeline in Morian Hall, a simulated drilling landscape in the Wiess Energy Hall, and wildlife/ecology galleries tell very different stories. Its current exhibits directory identifies the Cullen Hall of Gems & Minerals as CLOSED for an extreme makeover and the Brown Hall of Entomology as CLOSED for a renovation expected to extend into 2027. Do not advertise those as open just because legacy articles, tickets or search snippets mention them. The Cockrell Butterfly Center itself remains an independently ticketed open attraction. Rotating exhibits, including the planned Dead Sea Scrolls exhibition opening November 20, 2026, require date-specific checks.",
    exhibits: [
      { heading: "Morian Hall of Paleontology", detail: "Walk through fossil evidence of changing life and ecosystems rather than looking only for the biggest skeleton. One of the strongest family starting points and part of permanent-hall admission." },
      { heading: "Wiess Energy Hall", detail: "Large-scale drilling and energy technology installations connect Houston's petroleum history with renewable and emerging energy. Use the displays to compare methods and tradeoffs, not as a complete energy policy primer." },
      { heading: "The World Around Us and ecological galleries", detail: "A useful introduction to interconnections between wildlife, the environment and the systems that sustain them; the specific activities and display selection may rotate." },
      { heading: "Hall of Ancient Egypt and cultural exhibits", detail: "Interpret objects as evidence of societies, belief and craftsmanship; select a manageable section instead of rushing between science and history galleries." },
      { heading: "Cockrell Butterfly Center", detail: "The three-story rainforest conservatory is a separately ticketed live-butterfly attraction. Ordinary strollers and wagons are barred to protect the butterfly population; accessible devices are accommodated." },
      { heading: "Burke Baker Planetarium and Wortham Giant Screen Theatre", detail: "These are separately scheduled ticketed experiences, not automatic inclusions with standard permanent-hall admission. Review individual show times, age fit and sensory effects." },
      { heading: "Cullen Gems & Minerals and Brown Entomology: renovations", detail: "Both galleries are closed as of October 2026. Older HMNS guides may still feature them, but visitors should not plan their route around entry until reopening is officially confirmed." },
    ],
    routes: [
      { label: "Two-hour science essentials", steps: ["Buy a permanent-hall ticket or obtain a Free Tuesday ticket at the box office during eligible hours", "Start with Morian Hall of Paleontology and select one second permanent hall", "Leave room for a quick stop in ecology or Texas energy, instead of trying the full building"] },
      { label: "Half-day family museum", steps: ["Book or check admission for permanent halls and any separately ticketed live-butterfly or theater experience", "Prioritize dinosaurs or wildlife before attention wanes", "Break for Periodic Table or Elements Grill and re-enter permanent galleries if desired"] },
      { label: "Science plus Hermann Park", steps: ["Allow roughly three to five hours if adding a timed butterfly or planetarium visit", "Use the attached garage or a verified alternate parking arrangement", "Enjoy Hermann Park separately if weather and family energy permit"] },
    ],
    sources: [
      { label: "HMNS visit, admission and visitor overview", url: "https://www.hmns.org/visit/", use: "Admission pricing, location and attraction differences" },
      { label: "HMNS FAQs and guidelines", url: "https://www.hmns.org/visit/faq/", use: "Regular hours, free Tuesdays, ticket types and stroller policies" },
      { label: "HMNS directions and parking", url: "https://www.hmns.org/visit/directions-parking/", use: "Garage rates, clearance, accessible spots and first-come availability" },
      { label: "HMNS exhibits, current gallery closures", url: "https://www.hmns.org/hmns-exhibits/", use: "Permanent halls, Brown Entomology and Cullen Gems temporary closures" },
      { label: "HMNS dining", url: "https://www.hmns.org/visit/dining/", use: "Distinguish Periodic Table bistro from Elements Grill" },
      { label: "HMNS visitor accessibility", url: "https://www.hmns.org/visit/accessibility/", use: "Elevator maps, mobility, adult changing tables and sensory resources" },
      { label: "Cockrell Butterfly Center rules", url: "https://www.hmns.org/exhibits/cockrell-butterfly-center/", use: "Live butterfly entry, stroller policy, separate ticketing" },
      { label: "HMNS Tuesday admission help", url: "https://help.hmns.org/support/solutions/articles/151000051328/", use: "Free Tuesday inclusions and exclusions" },
    ],
    connections: [
      { label: "Harris County", href: "/county/harris", reason: "See the museum within Houston and the surrounding Museum District." },
      { label: "Museum of Fine Arts, Houston", href: "/destination/museum-of-fine-arts-houston", reason: "Compare a major science museum with a nearby art institution." },
      { label: "Holocaust Museum Houston", href: "/destination/holocaust-museum-houston", reason: "Another Museum District destination with a different mission and content suitability." },
      { label: "Texas museums", href: "/explore/museums", reason: "Discover researched museum visits statewide." },
    ],
  },

  "el-paso-museum-of-art": {
    name: "El Paso Museum of Art",
    slug: "el-paso-museum-of-art",
    county: "El Paso",
    city: "El Paso",
    reviewed: "2026-10-13",
    topics: ["art", "borderlands", "family", "architecture"],
    whyVisit: "El Paso Museum of Art is one of the most useful downtown El Paso stops for exploring art across the borderlands and the world without paying admission. Rather than a comprehensive artwork catalogue, this guide helps visitors choose between regional, American, European and changing temporary exhibitions and make an accessible museum visit amid downtown's cultural institutions.",
    visitorStrategy: "The museum at One Arts Festival Plaza is always free. Regular hours: Wednesday–Saturday 10 a.m.–6 p.m., Sunday 11 a.m.–3 p.m.; closed Mondays, Tuesdays and major holidays. The downtown JPMorgan Chase, Mills and One Civic Center Plaza parking garages charge varying fees; metered street parking also exists. Admission may be free while the adjacent downtown garage is not. Allow 60–120 minutes for a selective visit, an independent estimate rather than an official time requirement.",
    accessibility: "The operator says the museum is fully accessible, welcomes trained service animals and provides a free loaner wheelchair at the reception desk. Visitors with mobility, sensory or language needs can arrange accommodations at 915-212-0300 or EPMA-info@elpasotexas.gov. Specific gallery closures related to prior HVAC work and renovations should be reconfirmed; do not promise every historical gallery is open on a given date.",
    familiesAndGroups: "EPMA is suitable for short intergenerational visits centered on one theme rather than every gallery. Its art school offers separately scheduled and sometimes paid classes for children ages 6–13 and workshops for teens and adults. Photographs without flash are generally allowed for personal use unless a work is marked otherwise; photoshoots require separate approval. Food and drink are barred in galleries, and the museum does not currently document an on-site full-service restaurant in its visitor guide.",
    researchValue: "El Paso's downtown art museum brings together borderlands visual culture and global art. As of October 2026, the operator lists EPISD Creativity Through Our Eyes (August 22–October 25) and America, The Beautiful: Selections from the Zoe Diaz Collection (July 25, 2026–January 3, 2027). Treat these as temporary and verify before a trip; collection departments do not guarantee every artwork is on view.",
    exhibits: [
      { heading: "America, The Beautiful: Selections from the Zoe Diaz Collection (through January 3, 2027)", detail: "An exhibition on differing visions of American identity; a dated October 2026 example rather than a permanent feature." },
      { heading: "EPISD Creativity Through Our Eyes (through October 25, 2026)", detail: "A temporary exhibition foregrounding local student art and regional creative education. Availability changes immediately after the closing date." },
      { heading: "European and American collection selections", detail: "Artistic traditions spanning centuries offer a useful contrast to contemporary and borderlands work. Check which rooms and collection galleries are open on the visit date." },
      { heading: "Modern and contemporary art with borderlands context", detail: "Use current works, exhibitions and installations to connect El Paso's cultural geography with national and international art traditions without claiming all works are simultaneously displayed." },
    ],
    routes: [
      { label: "Free downtown art visit", steps: ["Start with the current exhibition map and any closure notices", "Select one changing exhibition and a contrasting permanent-collection gallery", "Take time in Arts Festival Plaza before visiting another downtown destination"] },
      { label: "Family art and creativity", steps: ["Choose a small number of accessible galleries suited to the children's ages", "Discuss a work's colors, materials or subject instead of reading every label", "Investigate art-school classes separately; general free admission is not a class reservation"] },
    ],
    sources: [
      { label: "EPMA official visitor information", url: "https://epma.art/visit", use: "Free entry, times, parking garages, service animals, photo permissions" },
      { label: "EPMA exhibitions and news", url: "https://epma.art/", use: "Time-sensitive October 2026 shows and collection categories" },
      { label: "EPMA classes and workshops", url: "https://epma.art/art-school/classes-and-registration", use: "Children's classes, tuition and workshop availability" },
    ],
    connections: [
      { label: "El Paso County", href: "/county/el-paso", reason: "Connect downtown art with El Paso's cultural history and borderlands setting." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare galleries, science museums and heritage museums across Texas." },
    ],
  },
  "arlington-museum-of-art": {
    name: "Arlington Museum of Art",
    slug: "arlington-museum-of-art",
    county: "Tarrant",
    city: "Arlington",
    reviewed: "2026-10-13",
    topics: ["art", "texas-culture", "family", "interactive"],
    whyVisit: "The Arlington Museum of Art combines major ticketed exhibitions, changing regional stories, large immersive spaces and arts education in the city's Entertainment District. Its current home opened March 30, 2024, in the former convention center complex beside Esports Stadium Arlington, rather than the former downtown museum site. Check the subject, age suitability and ticket requirement for the specific show before planning a trip.",
    visitorStrategy: "Current venue: 1200 Ballpark Way, Arlington. Through October 17, 2026, the published museum schedule is Tuesday–Friday 10 a.m.–5 p.m., closed Saturday through Monday; the website also has older generic listings with different weekend hours. After October 17, consult a dated current schedule rather than extrapolating. The closest City-managed lot west of the building charges $10 under published terms, and exhibition tickets have show-specific prices; AMA membership covers regular exhibition tickets according to the operator. Allow around 60–120 minutes for a chosen show, an independent estimate.",
    accessibility: "AMA's visitor FAQ states all exhibition spaces occupy the main level and restrooms are wheelchair accessible. Accessible parking is available south of the building near the entrance, with a south-side loading area for car or tour-bus drop-off. Service animals are welcome; pets and emotional-support animals do not have the same access. Personal audio tours sometimes use QR codes and visitors need their own headphones. Benches are available in galleries.",
    familiesAndGroups: "Children 15 and younger must stay with a guardian and follow the museum's no-touch gallery rules unless a display is explicitly interactive. Groups of ten or more may qualify for discounted tickets, while a guided group or school tour should be requested at least two weeks ahead. Groups over fifty should make advance arrangements; large bags have no monitored check. Food, bottled water and baby bottles cannot be consumed in exhibitions. The museum directs visitors to Entertainment District restaurants, not to a verified on-site full-service restaurant or cafeteria.",
    researchValue: "The new AMA hosts changing ticketed exhibitions and immersive environments, so the current lineup matters more for trip planning than old examples. The 2026 World Cup-linked More Than a Match exhibition finished August 30, 2026 and should not be described as currently open. An Arlington 150: Stories of a Legacy exhibition is scheduled October 17, 2026–February 28, 2027; as of October 13 it is upcoming, not open. The museum also originated the MUMENTOUS homecoming-mums exhibition, which has toured elsewhere; distinguish institutional history from what is currently on view in Arlington.",
    exhibits: [
      { heading: "Immersive exhibition galleries", detail: "AMA operates large indoor immersive rooms; admission, subject and sensory intensity are specific to the current exhibition, not fixed permanent displays." },
      { heading: "Arlington 150: Stories of a Legacy (scheduled October 17, 2026–February 28, 2027)", detail: "A future local-history exhibition at the time of this October 13 review. Do not tell visitors it is already open." },
      { heading: "MUMENTOUS: The Upsizing of a Texas Tradition (touring work)", detail: "The institution created a multimedia exploration of Texas homecoming mums, but the exhibition has toured other cities and should not be assumed currently available at AMA." },
      { heading: "Past World Cup art and map exhibitions (closed August 30, 2026)", detail: "Arlington's More Than a Match included art, historic maps and fan-culture interpretation. It has finished; reference it as past programming rather than a current visitor attraction." },
    ],
    routes: [
      { label: "Ticketed 90-minute exhibition visit", steps: ["Check the current exhibition ticket page and dated opening calendar", "Plan the Ballpark Way parking lot or accessible arrival south of the building", "Allow time for the exhibit's interactive or audio-guide elements"] },
      { label: "Arlington cultural-history afternoon", steps: ["Choose AMA only after confirming its current exhibition and ticket terms", "Read city and county connections for Arlington history and Texas high-school traditions", "Combine with nearby attractions in the Entertainment District only if schedules allow"] },
    ],
    sources: [
      { label: "Arlington Museum of Art visitor information", url: "https://arlingtonmuseum.org/visitor-info", use: "Current dated hours, fee-bearing parking, tickets, tours and new location" },
      { label: "Arlington Museum of Art detailed visitor FAQ", url: "https://arlingtonmuseum.org/plan-your-visit", use: "Accessibility, group sizes, food, photography and children rules" },
      { label: "AMA exhibitions and scheduled Arlington 150", url: "https://arlingtonmuseum.org/", use: "Current events and approaching October 17 opening" },
      { label: "City of Arlington official past World Cup exhibition", url: "https://www.arlingtontx.gov/News-Articles/2026/May/Arlington-Museum-of-Arts-More-Than-a-Match-Extended-Through-Aug.-30", use: "Confirm historic show closed August 30, 2026" },
    ],
    connections: [
      { label: "Tarrant County", href: "/county/tarrant", reason: "Place the Entertainment District museum among Arlington cultural and history attractions." },
      { label: "Dallas Museum of Art", href: "/destination/dallas-museum-of-art", reason: "Contrast rotating immersive/ticketed installations with a free global collection museum." },
      { label: "Texas homecoming mums", href: "/texas-homecoming-mums", reason: "Connect the MUMENTOUS touring exhibition to broader Texas homecoming traditions." },
    ],
  },

  "art-museum-southeast-texas-beaumont": {
    name: "Art Museum of Southeast Texas",
    slug: "art-museum-southeast-texas-beaumont",
    county: "Jefferson",
    city: "Beaumont",
    reviewed: "2026-10-13",
    topics: ["art", "family", "texas-history", "regional-culture"],
    whyVisit: "The Art Museum of Southeast Texas gives downtown Beaumont a free, visitor-friendly visual-arts counterpoint to the city's oil-industry and heritage museums. It presents artists from Southeast Texas alongside broader modern and contemporary work and temporary exhibitions, making a short first visit worthwhile and repeat visits substantially different.",
    visitorStrategy: "AMSET lists free general admission and Monday–Friday 9 a.m.–5 p.m., Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m. hours, closed on major holidays. Find it at 500 Main Street. Allow an estimated 60–90 minutes for a current exhibition and selected permanent-collection galleries. Special adult classes and programs can be ticketed even when museum admission is free.",
    accessibility: "AMSET publishes free admission and tour information but its primary visitor page does not fully document accessible parking, entrance and gallery routes, wheelchair loans or sensory aids. People with access needs should contact 409-832-3432 directly, rather than relying on amenities described for a nearby Beaumont museum. Spanish-language institutional information is available.",
    familiesAndGroups: "AMSET's education team offers free, age-adapted tours from preschool to older-adult groups. Minimum group size is ten children or seven adults; schedule guided group tours at least two weeks ahead. Spanish and American Sign Language tour arrangements are available on request. On October 17, 2026 it has an advertised Family Arts Day, but event concessions do not mean there is a full-service restaurant or cafeteria every day.",
    researchValue: "This art museum's rotating exhibits add an artistic perspective to the Gulf Coast's regional history. Its current calendar names Delilah Montoya: Activating Chicana Resistance (October 6, 2026–January 3, 2027) and Samantha Harrison: Land and Light (through November 8, 2026). Visitors should distinguish these limited-run shows from permanent collection themes and historical exhibition records.",
    exhibits: [
      { heading: "Delilah Montoya: Activating Chicana Resistance (through January 3, 2027)", detail: "A time-limited contemporary exhibit considering Chicana cultural representation, with an opening reception listed in October 2026." },
      { heading: "Samantha Harrison: Land and Light (through November 8, 2026)", detail: "A regional community-artist exhibition with painting and photography addressing landscapes both imagined and encountered." },
      { heading: "Modern and contemporary art of Southeast Texas", detail: "Collection selections connect local artists with American art and changes in the region. Exact displayed objects vary by rotation." },
      { heading: "Regional folk art and education", detail: "Community programs and educational visits offer a different understanding of Beaumont beyond oil, engineering and city industry." },
    ],
    routes: [
      { label: "Free downtown Beaumont museum hour", steps: ["Choose the current temporary show rather than assuming old exhibitions remain open", "Explore a second gallery theme or artist's work", "Connect with nearby downtown history museums if opening hours match"] },
      { label: "Free educational group visit", steps: ["Reserve a tour two weeks ahead and discuss age or language needs", "Visit the current exhibitions and select age-appropriate hands-on art activity if scheduled", "Treat event snacks and meals as separately confirmed arrangements"] },
    ],
    sources: [
      { label: "AMSET official visitor page", url: "https://amset.org/visit-us-visitanos/", use: "Free admission and museum identity" },
      { label: "AMSET homepage and current autumn exhibitions", url: "https://amset.org/", use: "Seven-day schedule, dated exhibition programme" },
      { label: "AMSET tours and education", url: "https://amset.org/schedule-a-tour/", use: "Free group tours, age suitability, booking lead time and Spanish/ASL" },
    ],
    connections: [
      { label: "Jefferson County", href: "/county/jefferson", reason: "Understand Beaumont history and arts venues in county context." },
      { label: "Texas Energy Museum", href: "/destination/texas-energy-museum-beaumont", reason: "Combine nearby art and oil-industry museums." },
      { label: "Babe Zaharias Museum", href: "/destination/babe-didrikson-zaharias-museum-beaumont", reason: "Compare sports history with Beaumont visual arts." },
      { label: "Texas museums", href: "/explore/museums", reason: "Discover other free and specialist museums statewide." },
    ],
  },

  "museum-of-the-gulf-coast-port-arthur": {
    name: "Museum of the Gulf Coast",
    slug: "museum-of-the-gulf-coast-port-arthur",
    county: "Jefferson",
    city: "Port Arthur",
    reviewed: "2026-10-13",
    topics: ["music", "sports", "regional-history", "maritime"],
    whyVisit: "Port Arthur's Museum of the Gulf Coast traces the cultures, landscapes, music and sports of Southeast Texas and Southwest Louisiana, pairing a broad regional-history mural with one of the strongest concentrations of Gulf Coast musical and athletic personalities in a single museum. It's not simply a Janis Joplin display: a natural-history collection, maritime material, painting and folk stories connect people with the coastal environment.",
    visitorStrategy: "The museum is at 700 Procter Street in Port Arthur; the public entrance and parking are behind the museum on Lakeshore Drive. The museum posts Monday–Saturday 9 a.m.–5 p.m., closed Sundays and holidays. Official admission information conflicts: most pages list $8 adults, $6 seniors, $4 college students and $3 ages 4–18, while a separate admission/history page quotes $10 adults and $8 seniors. Confirm the actual ticket price with 409-982-7000 before travelling. Allow 90–150 minutes as an editorial estimate.",
    accessibility: "The museum has two exhibition floors; public visitor pages do not give a complete route-by-route statement for wheelchair users, elevator availability, sensory accommodations or assistive listening. Visitors should call 409-982-7000 about the entrance on Lakeshore Drive and their specific access needs. Do not confuse the permanently located downtown museum with the separately operated Pompeiian Villa, which the operator says is temporarily closed for renovation.",
    familiesAndGroups: "A 13½-foot mounted alligator, a huge indoor historical mural, a Janis Joplin Porsche replica and music/sports memorabilia offer different starting points for school-age children, music fans and sports-focused groups. Advance-booked groups of 10 or more can request guided experiences; free school tours have grade/college policies that differ between current website sections, so coordinators must verify dates and eligibility. Public pages do not establish a full-service museum restaurant or cafeteria.",
    researchValue: "The museum explains how shipping, petroleum, coastal ecosystems, migration and popular music shaped the upper Gulf Coast. The permanent exhibit list includes a Sabine Bank Lighthouse Fresnel lens, a Texas Navy maritime display, Janis Joplin-related items and athlete memorabilia. The museum says its associated Pompeiian Villa is closed for renovations; that building should not be offered as part of an open same-day interior tour.",
    exhibits: [
      { heading: "Gulf Coast Hall of Fame galleries", detail: "Music, sports and other local-achievement displays tell how the Texas–Louisiana coast influenced nationally known figures including Janis Joplin and Jimmy Johnson." },
      { heading: "Janis Joplin history and reproduced psychedelic Porsche", detail: "A replica car and related exhibits are available as interpretive context, but it is not her original Porsche; distinguish replicas from original artifacts." },
      { heading: "Sabine Bank Lighthouse lens and Texas Navy exhibit", detail: "Coastal navigation and maritime history complement the museum's music and sports focus." },
      { heading: "13½-foot alligator and natural-history material", detail: "A dramatic mounted alligator helps families connect the upper Gulf Coast's swamps and wildlife to regional settlement and industry." },
      { heading: "Large mural and Dunn rotating gallery", detail: "The 125-foot historical mural covers Gulf Coast eras and the Dunn Gallery hosts dated visiting exhibits; check the current exhibition roster." },
    ],
    routes: [
      { label: "First Port Arthur visit", steps: ["Use the rear Lakeshore Drive museum entrance rather than a closed door on Procter", "Begin with the broad Gulf Coast mural and natural-history exhibits", "Choose music and sports Hall of Fame highlights according to interest"] },
      { label: "Upper Gulf Coast cultural day", steps: ["Explore the museum's Janis Joplin and maritime connections", "Use Port Arthur and Jefferson County history for context", "Add another actually open local museum or landmark; do not assume the Pompeiian Villa accepts visits"] },
    ],
    sources: [
      { label: "Museum current homepage and temporary closure", url: "https://www.museumofthegulfcoast.org/", use: "Museum hours, pricing and Pompeiian Villa closure" },
      { label: "Museum permanent exhibit descriptions", url: "https://www.museumofthegulfcoast.org/permanent", use: "Core exhibit highlights and rear parking" },
      { label: "Museum admissions and history page", url: "https://www.museumofthegulfcoast.org/copy-of-about-the-museum", use: "Conflicting admission prices, tour booking and eligibility" },
      { label: "Museum halls of fame", url: "https://www.museumofthegulfcoast.org/halls-of-fame", use: "Music, sports and notable Gulf Coast figures" },
    ],
    connections: [
      { label: "Jefferson County", href: "/county/jefferson", reason: "Connect Port Arthur port history, coastal heritage and regional museums." },
      { label: "Babe Zaharias Museum", href: "/destination/babe-didrikson-zaharias-museum-beaumont", reason: "Compare the Gulf Coast's broad Hall of Fame with a focused athletic biography." },
      { label: "Texas Energy Museum", href: "/destination/texas-energy-museum-beaumont", reason: "Pair Gulf Coast culture with Beaumont's oil history." },
      { label: "Texas museums", href: "/explore/museums", reason: "Browse statewide museums by region and visitor interest." },
    ],
  },
  "fire-museum-of-texas-beaumont": {
    name: "Fire Museum of Texas",
    slug: "fire-museum-of-texas-beaumont",
    county: "Jefferson",
    city: "Beaumont",
    reviewed: "2026-10-13",
    topics: ["safety", "family", "texas-history", "technology"],
    whyVisit: "Beaumont's Fire Museum of Texas occupies a former city fire station and gives families a tangible look at firefighting across more than a century. Historic engines, children's fire-safety experiences and the gigantic Dalmatian-painted working fire hydrant outdoors create a distinctive stop in the downtown museum cluster.",
    visitorStrategy: "Admission is free. The official site posts Monday–Friday 8 a.m.–4:30 p.m. and says the museum is closed Saturdays and Sundays, regardless of some third-party weekend listings. Address: 400 Walnut Street, Beaumont. Staff can be reached at 409-880-3927 about holidays, field trips and event access. The outside oversized working fire hydrant is a landmark; do not assume water demonstrations happen continuously or that the plaza can be used at any hour.",
    accessibility: "The operator's site describes upstairs and downstairs visitor areas, including a children's museum, but does not publish a detailed accessible elevator route, stair alternatives or bathroom specifics. Before arranging a visit for someone who cannot use stairs, contact museum staff for ground-floor options and the actual status of an elevator. The large hydrant and plaza have distinct outdoor conditions; never assume every feature is equally accessible.",
    familiesAndGroups: "Children can explore fire prevention and emergency response through the fire-safety house, Smokey Bear material and interactive education. The museum also advertises paid birthday and event rentals, which must not be confused with the free regular admission. A 60–90 minute general visit is an editorial estimate. The site describes optional popcorn rental for parties and a kitchen for event hires, not a daily museum café or full-service visitor restaurant.",
    researchValue: "The museum traces firefighting from the mid-1800s to the present and includes a 1915 LaFrance fire engine used on President Lyndon B. Johnson's ranch. Its well-known Dalmatian-painted 'world's largest working fire hydrant' was donated by Disney for the 1999 101 Dalmatians film release event. Treat engine stories as museum interpretation, not a substitute for specific city fire-safety instructions.",
    exhibits: [
      { heading: "Historic fire engines and equipment", detail: "Vehicles and tools show how fire response changed between horse-drawn technology, motorized equipment and modern emergency services." },
      { heading: "1915 LaFrance presidential ranch fire engine", detail: "A notable vehicle links a local fire museum to LBJ's ranch history and the story of safety infrastructure." },
      { heading: "Children's museum and fire-safety house", detail: "Hands-on activities introduce fire prevention and emergency response, designed for family rather than specialist-archive use." },
      { heading: "Giant Dalmatian working fire hydrant", detail: "The prominent outdoor landmark commemorates Disney's 1999 donation; water operation is event-specific rather than an everyday scheduled show." },
    ],
    routes: [
      { label: "Free family fire-safety hour", steps: ["Begin with real fire engines and equipment", "Use children's fire-safety displays as age permits", "See the oversized Dalmatian hydrant outdoors if conditions allow"] },
      { label: "Beaumont downtown museum pairing", steps: ["Visit the Fire Museum on a weekday during stated hours", "Walk or drive to the Art Museum of Southeast Texas, if open", "Add the Texas Energy Museum for a different technology and industrial-history perspective"] },
    ],
    sources: [
      { label: "Fire Museum of Texas official visiting page", url: "https://www.firemuseumoftexas.com/visit", use: "Weekday hours, free admission, facilities and exhibits" },
      { label: "Beaumont tourism museum listing", url: "https://www.beaumontcvb.com/listing/fire-museum-of-texas/20/", use: "Museum identity, exterior landmark and local visitor context" },
    ],
    connections: [
      { label: "Jefferson County", href: "/county/jefferson", reason: "Understand Beaumont's emergency response and civic history." },
      { label: "Art Museum of Southeast Texas", href: "/destination/art-museum-southeast-texas-beaumont", reason: "Another Beaumont downtown cultural stop with a different visitor experience." },
      { label: "Texas Energy Museum", href: "/destination/texas-energy-museum-beaumont", reason: "Connect historic fire response and industrial oil history." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare children's and specialist museums across Texas." },
    ],
  },
  "spindletop-gladys-city-boomtown-museum-beaumont": {
    name: "Spindletop-Gladys City Boomtown Museum",
    slug: "spindletop-gladys-city-boomtown-museum-beaumont",
    county: "Jefferson",
    city: "Beaumont",
    reviewed: "2026-10-13",
    topics: ["oil-history", "family", "texas-history", "outdoors"],
    whyVisit: "Spindletop–Gladys City Boomtown Museum on the Lamar University campus reconstructs a turn-of-the-century oil boomtown to show what changed when the Lucas gusher erupted January 10, 1901. Visitors walk among reproduced storefronts, drilling structures and outdoor interpretation rather than only reading indoor exhibits; this is an especially useful companion to the Texas Energy Museum's geology and refinery exhibits.",
    visitorStrategy: "The university lists Tuesday–Saturday 10 a.m.–5 p.m. and Sunday 1–5 p.m., with Mondays and major holidays closed; the final admission is at 4 p.m. Standard prices: $5 adults, $3 seniors 60+, $2 ages 6–12 and free for ages 5 or younger; Lamar-affiliated students/staff and eligible military visitors have stated ID-based free admission. Its former City name may appear as Gladys City Boomtown Museum. Dress for outdoor sun and variable ground conditions; allow 75–120 minutes by editorial estimate.",
    accessibility: "Lamar says much of the boomtown complex is wheelchair accessible and provides resting benches outside several buildings. Because parts of the venue are historical reconstructions with thresholds and mixed outdoor conditions, 'much' is not the same as every building. Contact museum staff at 409-880-1750 to plan a wheelchair or stroller route and any needed support.",
    familiesAndGroups: "This venue can work well for school-age children interested in buildings, old storefronts, oil derricks and hands-on historical interpretation. University instructions allow leashed pets around the grounds, but not inside exhibit buildings; service animals may enter. Book groups of ten or more ahead. Guided tours depend on a guide's availability; no guided tour is offered for more than 30 at once. Special youth-tour rates and chaperone ratios vary by school-year/summer dates, so coordinators should book with the museum rather than assuming a free field trip.",
    researchValue: "The Lucas gusher transformed Beaumont and the American oil economy in 1901; the outdoor reconstructed boomtown explains the workers, merchants, families, machines and speculative economy behind that turning point. The buildings are recreations rather than the original downtown settlement, an important distinction for visitors interpreting photography and regional history.",
    exhibits: [
      { heading: "Recreated Gladys City commercial street", detail: "Walk the replica shops, businesses and period streetscapes that explain the lives of workers and families in the 1901 oil boom." },
      { heading: "Oil derricks and gusher interpretation", detail: "Reconstructed drilling structures explain how oil was extracted and what made the Lucas gusher so disruptive to the regional and national economy." },
      { heading: "Storefronts and occupational history", detail: "The log-cabin saloon, stores and period trade exhibits show commerce and everyday life rather than merely celebrating industrial machinery." },
      { heading: "Seasonal living-history programs", detail: "Interpretive demonstrations and public events may bring the boomtown to life, but schedules depend on staffing; do not promise reenactors or a gusher demonstration on every visit." },
    ],
    routes: [
      { label: "Oil boomtown first visit", steps: ["Check the outdoor weather and last admission before traveling", "Explore reconstructed commercial streets and drilling equipment", "Connect the museum's 1901 story to Beaumont's later industrial transformation"] },
      { label: "Beaumont energy-history itinerary", steps: ["Begin at Spindletop's outdoor boomtown complex", "Continue to the Texas Energy Museum for engineering and refinery context", "Explore nearby city and county history if both museum schedules permit"] },
    ],
    sources: [
      { label: "Lamar University Boomtown visitor guide", url: "https://www.lamar.edu/spindletop-boomtown-museum/plan-your-visit/", use: "Current hours, last admission, fares, pets, group and wheelchair rules" },
      { label: "Lamar Boomtown history and special events", url: "https://www.lamar.edu/spindletop-boomtown-museum/index.html", use: "1901 Lucas gusher, site context and commemorative events" },
    ],
    connections: [
      { label: "Jefferson County", href: "/county/jefferson", reason: "Find Spindletop's place in Beaumont's oil and Gulf Coast history." },
      { label: "Texas Energy Museum", href: "/destination/texas-energy-museum-beaumont", reason: "Compare reconstructed boomtown life to petroleum science and production." },
      { label: "Fire Museum of Texas", href: "/destination/fire-museum-of-texas-beaumont", reason: "A complementary Beaumont family history stop." },
      { label: "Texas museums", href: "/explore/museums", reason: "Explore other Texas industrial and open-air heritage museums." },
    ],
  },

  "national-museum-funeral-history-houston": {
    name: "National Museum of Funeral History",
    slug: "national-museum-funeral-history-houston",
    county: "Harris",
    city: "Houston",
    reviewed: "2026-10-13",
    topics: ["world-history", "texas-history", "family", "material-culture"],
    whyVisit: "The National Museum of Funeral History in north Houston explores how people remember and honor the dead, from horse-drawn hearses and handmade caskets to presidential funerals and customs across cultures. It is an unusually approachable look at social, technological and religious history rather than an attraction devoted to shock or horror. Visitors can choose a few themed exhibits instead of attempting the entire collection.",
    visitorStrategy: "Find the museum at 415 Barren Springs Drive off the north Houston Interstate 45 corridor, not in the downtown Museum District. The operator lists Monday–Friday 10 a.m.–4 p.m., Saturday 10 a.m.–5 p.m. and Sunday noon–5 p.m., with special events or holidays capable of changing those times. Adult admission is $15, seniors 55+ and veterans $12, ages 6–11 $7 and ages five or younger free. Parking is free on site. The museum FAQ suggests two to four hours for a full visit, but a focused visit of about 60–90 minutes is an editorial estimate.",
    accessibility: "The operator describes the building as wheelchair accessible, with benches for rest throughout the galleries and free on-site parking. Hearing or vision accommodations can be arranged with advance notice by calling 281-876-3063 or contacting contact@nmfh.org. Prearranged docent tours can provide wireless headset amplification, with a limited equipment supply and identification deposit. Confirm particular mobility, sensory and restroom needs with the museum.",
    familiesAndGroups: "The museum recommends its subject matter most strongly for children older than seven, although younger children have visited. Historical hearses and imaginative Ghanaian coffins may be easier for young visitors to discuss than memorial exhibits with detailed grief or tragedy. Parents can use the operator's scavenger hunt and choose content by age and readiness. Groups of at least 25 may qualify for separate rates; docent-led tours need advance booking. The gift shop is advertised, but there is no clearly documented daily public restaurant or cafeteria.",
    researchValue: "In contrast to conventional art or science collections, funeral-service artifacts reveal changing craft, transportation, faith and public ceremony. Highlights include authentic historical hearses, the development of embalming, Victorian mourning, Jazz Funerals of New Orleans, Ghanaian fantasy coffins and a replica of the Shroud of Turin. Explain that the latter is a certified reproduction, not the original relic, and that the operator's older FAQ refers to fifteen exhibits while its current exhibition pages list nineteen.",
    exhibits: [
      { heading: "Historical hearses and mourning transport", detail: "Compare elaborate nineteenth-century horse-drawn funeral coaches with later motorized hearses, tracing both vehicle engineering and public mourning customs." },
      { heading: "Presidential funerals and George H. W. Bush", detail: "State funeral artifacts and presidential remembrance illustrate how public ceremonies differ from private family traditions, including the museum's George H. W. Bush memorial exhibit." },
      { heading: "Fantasy Coffins from Ghana", detail: "Colorful sculptural coffins connect craftsmanship, symbolism and cultural tradition; they are not amusement-park props and deserve respectful interpretation." },
      { heading: "Papal funeral traditions and the Shroud of Turin replica", detail: "The Vatican-collaborative display explores papal ceremony; the separate Shroud of Turin presentation exhibits a certified reproduction rather than the original in Italy." },
      { heading: "Embalming, Victorian mourning and changing funeral care", detail: "Follow the practical and social history of death care without assuming every historical treatment represents modern professional practice." },
      { heading: "Día de los Muertos and New Orleans jazz funerals", detail: "Contrasting cultural memorial practices show different traditions of music, community and remembrance without reducing them to a single American custom." },
    ],
    routes: [
      { label: "A focused 90-minute cultural-history visit", steps: ["Start with the museum map and choose three topics that interest your group", "Visit the historic hearses and one craftsmanship or world-customs exhibit", "Reserve reflective time for a presidential or memorial gallery before leaving"] },
      { label: "Family visit with age-appropriate highlights", steps: ["Review the operator's recommended age guidance and ask about the scavenger hunt", "Begin with vehicles and carefully chosen cultural displays", "Avoid or discuss more sensitive tragedy-related material according to the children's readiness"] },
      { label: "Full collection visit", steps: ["Allow two to four hours according to the museum's tour FAQ", "Move between transportation, rituals, public funerals and trade history", "Use rest benches and arrange a prebooked docent tour if desired"] },
    ],
    sources: [
      { label: "Museum official FAQ", url: "https://nmfh.org/faq-page/", use: "Visitor duration, child guidance, free parking, accessibility and guided vs self-guided touring" },
      { label: "Museum visitor tickets and admission", url: "https://nmfh.org/the-museum/", use: "Current entry hours, age categories and ticket prices" },
      { label: "Museum exhibits and gallery descriptions", url: "https://nmfh.org/exhibitions/", use: "Current thematic exhibits and historically significant displayed objects" },
      { label: "Museum tour arrangements and accessibility", url: "https://nmfh.org/book-a-tour/", use: "Docent booking, hearing assistance, accessible spaces" },
      { label: "Museum family education resources", url: "https://nmfh.org/for-families/", use: "Activities and differentiated visit suitability" },
    ],
    connections: [
      { label: "Harris County", href: "/county/harris", reason: "Explore Houston's museums, airport areas and broader urban history." },
      { label: "Holocaust Museum Houston", href: "/destination/holocaust-museum-houston", reason: "A separate institution focused on victims and history rather than funeral professions; do not mistake the two experiences for equivalents." },
      { label: "Houston Museum of Natural Science", href: "/destination/houston-museum-of-natural-science", reason: "A different family museum that focuses on natural science and may better fit younger children's interests." },
      { label: "Texas museums", href: "/explore/museums", reason: "Browse other Texas museum visitor guides by theme and region." },
    ],
  },

  "texas-ranger-hall-of-fame-museum-waco": {
    name: "Texas Ranger Hall of Fame and Museum",
    slug: "texas-ranger-hall-of-fame-museum-waco",
    county: "McLennan",
    city: "Waco",
    reviewed: "2026-10-13",
    topics: ["texas-history", "law-enforcement", "museum-heritage", "family"],
    whyVisit: "The Texas Ranger Hall of Fame and Museum is the state-designated historical center for the Texas Rangers, with original artifacts, officer stories, a Hall of Fame, a film program and separate research facilities. A worthwhile visit considers both the Rangers' law-enforcement history and how their public image was constructed, rather than treating popular cowboy stories as complete historical evidence.",
    visitorStrategy: "The museum is at 100 Texas Ranger Trail beside the Brazos River in Waco. It opens seven days, 9 a.m.–5 p.m., with last entry at 4:30 p.m., except listed holidays. Official adult admission is $10.50, ages 6–12 $4, under 6 free, seniors 60+ $8.50 and military with ID $8.50; discounts can change. Parking is free. The operator recommends around two hours. The separate Armstrong Research Center opens Monday–Friday, 9 a.m.–4 p.m., preferably by appointment; it does not keep general gallery hours.",
    accessibility: "The museum's public visitor guidance confirms free parking and group check-in procedures but does not detail wheelchair routes, accessible restroom layout or hearing-support equipment. Contact the museum at 254-750-8631 about specific step-free access, mobility needs or visual/audio accommodations before a trip; do not infer availability from the research center or other Waco museums.",
    familiesAndGroups: "The museum can work for school-age children interested in history, policing and historic objects; visitors may see weapons, conflict and period violence interpreted in exhibits. Groups of ten or more must reserve ahead. Operator-led tours are usually about 45 minutes, and the institution advises at least 90 minutes total including exhibits and shop. Food and drink are prohibited inside gallery spaces; no on-site full-service restaurant or café is confirmed on its official visit page.",
    researchValue: "Interpret the Texas Rangers across almost two centuries and multiple governing periods, separating documented individual service, violence, frontier mythology and contemporary professional practice. The Hall of Fame focuses on individual members, while the Armstrong Research Center is a distinct archival facility. The 2026 Rangers Through Time exhibit examines 1840s–1990s imagery and is an opportunity to ask whose stories are celebrated and how memory changes.",
    exhibits: [
      { heading: "Texas Rangers through time", detail: "Artifacts, photographs, equipment and interpretive displays trace a law-enforcement organization whose changing mandate and public image must be read in historical context." },
      { heading: "Hall of Fame and individual biographies", detail: "Learn how officers are recognized and compare personal career histories with larger and sometimes contested events." },
      { heading: "Rangers Through Time (2026 special exhibition)", detail: "At the Armstrong research complex, selected art, medals, firearms and photographs examine imagery of Rangers from the 1840s to 1990s; verify whether the temporary display remains open." },
      { heading: "Museum film and visitor orientation", detail: "An approximately 25-minute film is shown at published times subject to change; organize a visit around a confirmed screening rather than an assumed start time." },
    ],
    routes: [
      { label: "Two-hour visitor essentials", steps: ["Confirm museum hours and tickets; begin with the historical overview", "Examine the Hall of Fame and one themed artifact gallery", "Allow time for the short film if a screening fits your visit"] },
      { label: "Waco heritage half-day", steps: ["Begin with the Texas Ranger museum on the Brazos", "Read McLennan County history for context rather than treating its exhibits as the whole regional story", "Consider another independently open Waco museum based on interests"] },
    ],
    sources: [
      { label: "Operator: current hours and admission", url: "https://www.texasranger.org/Visit", use: "Admission, parking, two-hour recommendation, research-center hours" },
      { label: "Operator: guided tour FAQ", url: "https://www.texasranger.org/Pages/Education/FAQ", use: "Group sizes, food, film, photography and tour duration" },
      { label: "Operator: Rangers Through Time exhibition", url: "https://www.texasranger.org/News-articles/Rangers-Through-Time", use: "2026 rotating exhibition and interpretation" },
    ],
    connections: [
      { label: "McLennan County", href: "/county/mclennan", reason: "Link the museum with Waco history and the Brazos River corridor." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare state history and public service museums without treating collections as interchangeable." },
    ],
  },
  "texas-transportation-museum-san-antonio": {
    name: "Texas Transportation Museum",
    slug: "texas-transportation-museum-san-antonio",
    county: "Bexar",
    city: "San Antonio",
    reviewed: "2026-10-13",
    topics: ["railroads", "family", "transportation", "texas-history"],
    whyVisit: "Texas Transportation Museum in northeast San Antonio combines full-size rail equipment, historic road vehicles, model railroads and short operating train rides in an outdoor setting. The difference between viewing a historic locomotive and riding its volunteer-operated railway makes it especially engaging for families, but the train program is contingent on operating and weather conditions.",
    visitorStrategy: "The entrance is at 11731 Wetmore Road, near Wurzbach Parkway. Regular public access is generally on selected Saturdays and Sundays, and Friday visits are reserved for schools/groups; check the operator's date-specific calendar. General admission lists adults age 13+ $12, ages 4–12 $10, under 4 free and seniors 65+ $9. The regular train ride is included when running. Seasonal ride times on the train page are 10:30 a.m., 12:30 p.m. and 2:30 p.m., but another older operator page lists additional trips. Follow the current calendar and staff announcements, not an older fixed timetable. Last general admission is published as 3 p.m.",
    accessibility: "The main lot is gravel, with a marked accessible space near the depot ramp and a paved space by the depot platform and Main Display Building. The covered flatcar on the regular train is wheelchair-accessible; the historic caboose is not, and some preserved equipment cannot be entered because of its age. Contact the museum before travel about specific mobility access or an accommodated train ride.",
    familiesAndGroups: "Children can enjoy moving trains and static displays, but rail grounds require supervision: use marked crossings, stay off tracks, avoid climbing equipment and follow conductors. The museum permits leashed well-behaved pets. Drinks are sold at the depot, with snacks usually only at events; there is not a documented full-service café or cafeteria. Families may bring food and use picnic tables. Weather, mechanical repairs or special events may change rides, costs and opening times.",
    researchValue: "Use the museum to compare steam, diesel, road transportation and model railroad interpretation: rail travel is a system involving labor, signaling, maintenance and changing engines rather than just picturesque locomotives. The operator advertises a 1925 Baldwin steam locomotive and a 1911 Baldwin example, but steam rides are not currently scheduled due to inspection/maintenance. Do not promise an operating steam locomotive or a diesel cab ride; the ticket page says cab rides are suspended for repairs.",
    exhibits: [
      { heading: "Regular train ride and volunteer railroad", detail: "A scheduled 10–15-minute ride is normally included with admission, typically on a diesel-hauled train; the covered flatcar provides the accessible riding option." },
      { heading: "Historic steam and diesel equipment", detail: "Compare the construction and roles of original railway stock, including preserved Baldwin locomotives; currently suspended steam operations should not be represented as running." },
      { heading: "Model railroad and transportation displays", detail: "Indoor layouts and older road vehicles help explain switching, routes and how railways connected towns and industries." },
      { heading: "Depot, signals and railroad working practices", detail: "Use the depot, crossings and equipment displays to discuss ticketing, signaling, infrastructure and the work of maintaining a railroad." },
    ],
    routes: [
      { label: "Family train-and-museum outing", steps: ["Check the chosen day and train calendar, plus any weather advisories", "Arrive before an actual scheduled ride and observe train safety rules", "Explore the model railway and vehicle exhibits, ending with an outdoor picnic if weather permits"] },
      { label: "Texas transport history visit", steps: ["Begin with the rail exhibits and locomotives", "Compare road vehicles, engines and model railway systems", "Read Bexar County context for how transport affected San Antonio's growth"] },
    ],
    sources: [
      { label: "Operator: visit, tickets and calendar", url: "https://www.txtransportationmuseum.org/visit-us", use: "Admission, booked days, time and weather caveats" },
      { label: "Operator: train operations and accessibility", url: "https://www.txtransportationmuseum.org/train-rides", use: "Ride length, flatcar access and current steam status" },
      { label: "Operator: visitor FAQ, parking and food", url: "https://www.txtransportationmuseum.org/", use: "Parking, pets, safety and food options" },
      { label: "Operator: current ticket limitations", url: "https://www.txtransportationmuseum.org/tickets", use: "Diesel cab-ride suspension and special event rules" },
    ],
    connections: [
      { label: "Bexar County", href: "/county/bexar", reason: "Connect the railway history with greater San Antonio heritage." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare hands-on transport sites with historic and science museums." },
    ],
  },

  "dr-pepper-museum-waco": {
    name: "Dr Pepper Museum",
    slug: "dr-pepper-museum-waco",
    county: "McLennan",
    city: "Waco",
    reviewed: "2026-10-13",
    topics: ["texas-history", "food-and-drink", "industry", "family"],
    whyVisit: "The Dr Pepper Museum makes the history of an iconic Texas soft drink tangible through the former 1906 Artesian Manufacturing and Bottling Company building, historic equipment and advertising, and an operating soda fountain in a second building. The best experience is understanding how a Waco beverage became a national brand and how bottling, marketing and soda fountains changed everyday life.",
    visitorStrategy: "The museum is at 300 South 5th Street, Waco, in two separate buildings. Official regular hours are seven days, 10 a.m.–5:30 p.m., with final general admission sold at 4:30 p.m. The current general admission is $12 for guests age 5 and up; age four and younger enter free. General-admission tickets are purchased on arrival, not online, and include one 12-ounce soda voucher for paid admissions. Additional Liquid Lab or Make-A-Soda programs cost extra and may require advance reservations. Do not confuse museum admission with parking: the public lot across 5th Street costs about $10 plus fees for five hours, with no reentry privilege; accessible parking is provided with qualifying plates or permits. The campus does not permit reentry after exiting.",
    accessibility: "Both historic buildings have accessible entrances and ramps, with elevators in the original bottling building. Wheelchairs are available on request, and the museum offers sensory-support items, captioned exhibit media and limited accessibility parking. Large wagons and oversized strollers cannot enter; use a standard stroller or designated parking area. ASL arrangements for guided experiences may need around two weeks' notice. These measures do not turn crowded stairwells or the soda-making programs into universally accessible experiences without prior coordination.",
    familiesAndGroups: "Families with children can follow bottling machinery, advertising examples, soda-making demonstrations and history displays. The soda fountain is a drink and dessert counter on the museum campus, not a separate free-access full-service restaurant: an admission ticket is required to reach it. Paid admissions include a fountain drink; free child admission, some library passes and other voucher entries do not. School tours need advance booking, with designated chaperones and limited bus parking. The courtyard has picnic tables but group spaces cannot be reserved casually.",
    researchValue: "The Artesian Manufacturing and Bottling Company building dates to 1906. Visitor-facing interpretation should distinguish local pharmaceutical and beverage history, changing manufacturing methods, commercial advertising and the social importance of soda fountains from the corporation's promotional claims. Temporary 2026 Waco road closures affect approaches; the museum lists South Fourth Street disruptions. Facts about pricing, parking, time-sensitive experiences and reentry deserve monthly checks.",
    exhibits: [
      { heading: "Historic artesian bottling building", detail: "Explore three floors of displays about the creation, bottling, packaging and marketing of Texas soft drinks inside the early twentieth-century industrial building." },
      { heading: "Soda Fountain and Kellum-Rotan Building", detail: "The second museum building houses the soda counter, beverage experiences and additional exhibits, all inside the paid campus rather than a public restaurant outside the gate." },
      { heading: "Keurig Dr Pepper Liquid Lab", detail: "Shows and a separately charged Make-A-Soda program offer hands-on explanations of beverage formulation. Check times, dietary alternatives and reservations first." },
      { heading: "Waco lunch-counter history and commercial culture", detail: "Use the museum's interpretive displays to compare social history, advertising, local manufacturing and changing food-service customs without treating brand promotion as a substitute for history." },
    ],
    routes: [
      { label: "Family museum visit", steps: ["Buy general admission at the museum rather than a third-party ticket seller", "Tour the former bottling plant and follow the production and advertising story", "Redeem the paid-admission fountain-drink voucher before leaving the non-reentry campus"] },
      { label: "Downtown Waco history outing", steps: ["Visit the museum with an intentional parking plan", "Explore another downtown historical attraction if schedule permits", "Use McLennan County history to put bottling, railroads and local industry in context"] },
    ],
    sources: [
      { label: "Operator: visitor hours, fees and admission", url: "https://drpeppermuseum.com/plan-your-visit/", use: "Ticket, closing, complimentary drink and campus access rules" },
      { label: "Operator: researched visitor FAQ", url: "https://drpeppermuseum.com/frequently-asked-questions/", use: "Parking, strollers, reentry, soda fountain and card-only admission" },
      { label: "Operator: parking and construction", url: "https://drpeppermuseum.com/parking-information/", use: "Public and accessible parking, current street closures" },
      { label: "Operator: accommodations", url: "https://drpeppermuseum.com/accessibility/", use: "Accessible buildings, sensory accommodations and services" },
    ],
    connections: [
      { label: "McLennan County", href: "/county/mclennan", reason: "Place Waco's historic bottling industry in local context." },
      { label: "Texas Ranger Hall of Fame and Museum", href: "/destination/texas-ranger-hall-of-fame-museum-waco", reason: "Another Waco museum, but a very different history and interpretation." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare industrial and cultural museum visits statewide." },
    ],
  },
  "texas-sports-hall-of-fame-waco": {
    name: "Texas Sports Hall of Fame",
    slug: "texas-sports-hall-of-fame-waco",
    county: "McLennan",
    city: "Waco",
    reviewed: "2026-10-13",
    topics: ["sports", "texas-history", "family", "college-athletics"],
    whyVisit: "The Texas Sports Hall of Fame interprets Texas athletes, coaches and teams across sports and generations through artifacts, records and historic halls of fame. It is useful both for visitors who want to trace high-school football into college and professional careers, and for families interested in a wider range of sports than a single stadium tour would provide.",
    visitorStrategy: "The museum is at 1108 South University Parks Drive in Waco, close to Baylor University and Interstate 35, with free on-site parking. The official site currently lists Monday–Saturday 9 a.m.–5 p.m., closed Sunday. General admission is $10 for adults, $8 for seniors age 60+, $6 for students K–college, free for children under six and free for active-duty military and veterans. Tickets can be purchased at the door. Plan 60–120 minutes depending on sport interests as an editorial estimate. Guided group experiences should be reserved rather than assumed walk-in.",
    accessibility: "The official visitor/contact pages confirm free parking and building access but provide few technical details about elevators, step-free transitions, restrooms or sensory accommodations. Before travel, contact the hall at 254-756-1633 to verify the best wheelchair entrance, group access and any requested support. Do not describe every historic sports artifact display as interactive or wheelchair-accessible unless independently confirmed.",
    familiesAndGroups: "A successful family visit is selective: choose a sport, an athlete from home, and one historical comparison between high school, college and professional play. Children may learn from equipment, trophies and interactive displays, but not every exhibition case permits touching. Group tours and special educational programs need advance arrangements. An on-site full-service restaurant or cafeteria is not documented on the official visitor pages; nearby Baylor-area restaurants are separate businesses.",
    researchValue: "The Hall of Fame dates to 1951 and covers more than the iconic names of Texas football. Comparing women's and men's competition, rodeo, Olympic events, coaching, high-school programs and conference histories makes the museum valuable as a regional sports-history resource. The Southwest Conference and Texas High School Football Hall of Fame material should be identified as themes within the wider institution, not independently assumed to have daily standalone visitor hours.",
    exhibits: [
      { heading: "Hall of Fame inductees and athlete stories", detail: "Compare Texas careers across sports and eras, keeping Hall of Fame membership distinct from general professional achievements." },
      { heading: "High school football heritage", detail: "Trace Texas school teams, coaches and players through historical displays and how community school sports became a major statewide institution." },
      { heading: "Southwest Conference and college athletics", detail: "Explore former collegiate competitions and the transition to the modern university sports landscape, using Baylor and the Southwest Conference as concrete context." },
      { heading: "Texas sports beyond football", detail: "Look for track, golf, basketball, baseball and other athlete stories to balance the visit and understand the breadth of the Hall's mission." },
    ],
    routes: [
      { label: "One-hour sports-history highlights", steps: ["Begin at the general Hall of Fame overview", "Follow one athlete or sport across school and later-career contexts", "Choose one gallery that broadens the family's view beyond football"] },
      { label: "Waco sports and history trip", steps: ["Start at Texas Sports Hall of Fame", "Explore nearby Baylor or Brazos public spaces independently", "Connect to the Texas Ranger Hall of Fame only if time and interests justify the separate admission"] },
    ],
    sources: [
      { label: "Texas Sports Hall of Fame: contact, tickets and visit", url: "https://tshof.org/contact-us/", use: "Hours, admissions, parking, contact, group booking" },
      { label: "Texas Sports Hall of Fame home", url: "https://tshof.org/", use: "Institutional purpose, public exhibitions and event context" },
    ],
    connections: [
      { label: "McLennan County", href: "/county/mclennan", reason: "Put Texas sports and university traditions in regional context." },
      { label: "Texas Ranger Hall of Fame and Museum", href: "/destination/texas-ranger-hall-of-fame-museum-waco", reason: "Nearby state-history museum with a distinct focus." },
      { label: "Texas museums", href: "/explore/museums", reason: "Explore sports history alongside other Texas culture museums." },
    ],
  },

  "austin-nature-and-science-center": {
    name: "Austin Nature & Science Center",
    slug: "austin-nature-and-science-center",
    county: "Travis",
    city: "Austin",
    reviewed: "2026-10-13",
    topics: ["natural-history", "science", "family", "outdoors"],
    whyVisit: "A free, hands-on nature education stop on the west edge of Austin's Zilker Park, with animal ambassadors, fossil digging, a naturalist workshop and accessible outdoor learning paths. It is not a conventional indoor collection museum: families can move among live wildlife, fossils, ponds and forest interpretation while learning how to respect Central Texas ecosystems.",
    visitorStrategy: "Visit at 2389 Stratford Drive, not the mailing address at 301 Nature Center Drive. Free parking for cars is under the MoPac overpass across Stratford Drive, with accessible spaces close to the entry sidewalk. Normal hours are Monday through Saturday 9 a.m.–5 p.m. and Sunday noon–5 p.m.; the center resumed regular opening October 12 after its 2026 ACL Festival and maintenance closure. Check event-day traffic or holiday notices, since nearby Zilker events affect access. The Trade Counter has its own shorter hours.",
    accessibility: "Accessible parking spaces near the Stratford Drive entrance connect with an ADA-compliant sidewalk. The operator identifies accessible routes around its pond exhibits, but the adjoining Zilker Nature Preserve has separate rugged trailheads and gates; do not assume all trails are step-free. Confirm an accessible route with staff before visiting the outdoor parts; some areas are exposed to heat or rain.",
    familiesAndGroups: "The Dino Pit fossil dig, Small Wonders, Birds of Prey and Naturalist Workshop are built for hands-on family learning, but wildlife is not a petting zoo and visitors must leave animals and wild plants undisturbed. Preschool-aged kids can enjoy tactile activities with adult supervision; older children can follow the science of fossils, ecosystems and adaptations. Groups of 15 or more need reservations, with paid instructor-led options; buses must not park under MoPac. There is no indoor or covered dining facility. Groups may picnic at a limited number of outdoor Meadow tables, weather permitting.",
    researchValue: "The city has operated this nature-learning center since 1960. Interpretation of injured or imprinted animal ambassadors should explain rehabilitation ethics and why the animals cannot return to the wild. Distinguish the free center's ordinary opening hours from the separate Naturalist Workshop Trade Counter, the public preserve trails and the renovated Bathhouse satellite site. Never encourage bringing items collected from a preserve for trading.",
    exhibits: [
      { heading: "Dino Pit fossil dig and trackway", detail: "Children can explore paleontology and fossil discovery in an outdoor interactive environment; the activity connects fossil interpretation with real finds from Central Texas." },
      { heading: "Birds of Prey, Animal Aisle and Small Wonders", detail: "Permanent wildlife ambassadors include injured or imprinted animals unable to return to the wild. Compare adaptations and conservation rather than promising hands-on contact with live animals." },
      { heading: "Naturalist Workshop and Trade Counter", detail: "Examine bones, rocks, minerals and specimens in a touch-friendly learning area. Trading has shorter staffed hours and rules against protected bird parts, human artifacts, purchased objects and items collected in preserves." },
      { heading: "Forest Trail, ponds and native gardens", detail: "Explore a self-guided outdoor collection of 45 tree plantings, pond habitats and native pollinators; conditions and accessibility differ from indoor galleries." },
      { heading: "Honeybee observation hive and human sundial", detail: "An indoor bee display and outdoor interactive sundial introduce insect ecology and solar movement, subject to operations and seasonal conditions." },
    ],
    routes: [
      { label: "Free family discovery visit", steps: ["Park under MoPac and use the Stratford Drive entrance", "Start with the Dino Pit and wildlife exhibits", "Choose the Naturalist Workshop or ponds based on weather and interests"] },
      { label: "Nature-learning half day", steps: ["Begin with animal ambassadors and the forest trail", "Visit the Trade Counter during its separately posted opening hours", "Use a picnic table only if conditions and available space permit"] },
    ],
    sources: [
      { label: "City of Austin — plan your visit", url: "https://www.austintexas.gov/parks/plan-your-visit-austin-nature-science-center", use: "Address, hours, no-pets rule, parking and accessible routes" },
      { label: "City of Austin — exhibits", url: "https://www.austintexas.gov/parks/austin-nature-science-center-exhibits", use: "Dino Pit, wildlife, Trade Counter and forest exhibits" },
      { label: "City of Austin — group reservations", url: "https://www.austintexas.gov/parks/austin-nature-science-center-school-programs-and-group-reservations", use: "School reservations, bus access and outdoor picnic conditions" },
      { label: "City of Austin — center operation", url: "https://www.austintexas.gov/parks/locations/austin-nature-and-science-center", use: "Annual maintenance closure and actual reopening" },
    ],
    connections: [
      { label: "Travis County", href: "/county/travis", reason: "Place Zilker's nature center in Austin's outdoor and family travel context." },
      { label: "Harry Ransom Center", href: "/destination/harry-ransom-center-austin", reason: "For a separate free Austin museum experience focused on culture and historic artifacts." },
    ],
  },
  "harry-ransom-center-austin": {
    name: "Harry Ransom Center",
    slug: "harry-ransom-center-austin",
    county: "Travis",
    city: "Austin",
    reviewed: "2026-10-13",
    topics: ["literature", "photography", "art", "history"],
    whyVisit: "The University of Texas's Harry Ransom Center offers free public exhibition galleries showing manuscripts, historic photography, rare books and cultural history. It is particularly rewarding for curious visitors who want a short focused exhibition rather than a tour of a vast archive. The landmark Gutenberg Bible and Niépce heliograph are among the institution's signature displays, while exhibitions change throughout the year.",
    visitorStrategy: "The exhibition entrance is at 300 West 21st Street. Galleries open Tuesday–Friday 10 a.m.–5 p.m. and Saturday–Sunday noon–5 p.m.; galleries close Mondays. Admission is free. The separate research Reading Room normally opens Monday–Saturday 9 a.m.–5 p.m. and requires registration and photo identification; its opening hours can differ from the exhibition rooms, including during university holidays. Street parking on Guadalupe is metered except Sundays; campus garages charge fees.",
    accessibility: "Public exhibition areas and restrooms are ADA compliant, with a wheelchair available for use; parking for visitors with disability permits is available in designated campus garages for a fee. For ASL or particular access accommodations, the Ransom Center asks for at least five business days' notice at hrctours@austin.utexas.edu. Large bags and food/drink must be left in lockers or outside gallery spaces.",
    familiesAndGroups: "Older children and teenagers with interests in magic, creative writing, photography or literature may enjoy current exhibitions, the Gutenberg Bible and the photography display. This is primarily a humanities exhibition and research setting rather than a tactile children's play museum. Docent group tours for 10 or more require advance requests at least two weeks before the visit, and groups of more than 30 need special logistics. No café or indoor public restaurant is identified in current visitor guidance; arrange meals on the UT campus.",
    researchValue: "The Center's research collections are not equivalent to what's currently on public display. In autumn 2026, the operator lists Houdini's Library (through January 24, 2027) and The Worlds of Gertrude Stein (through January 10, 2027). The Gutenberg Bible and Niépce Heliograph are signature displays, but schedules and object conservation can affect access. Distinguish non-flash photography permitted in the public galleries from restricted photography of Reading Room documents.",
    exhibits: [
      { heading: "The Gutenberg Bible", detail: "One of the earliest substantial printed books made with movable type in Europe offers a concise way to connect printing technology, publishing and the spread of knowledge." },
      { heading: "Niépce Heliograph", detail: "The earliest surviving photograph produced in a camera obscura introduces the history of photography; confirm its current display status before a visit centered on that object." },
      { heading: "Houdini's Library (August 29, 2026–January 24, 2027)", detail: "A temporary exhibition uses rare books and performance materials to investigate Harry Houdini's interests and public image. Its closing date matters when planning travel." },
      { heading: "The Worlds of Gertrude Stein (August 15, 2026–January 10, 2027)", detail: "A temporary exhibition on an influential literary and artistic figure connects writing, collecting and twentieth-century modernism." },
      { heading: "Carson McCullers portrait and rotating collection", detail: "Collection highlights and gallery displays change; the current exhibit directory is the best source for what is actually on view." },
    ],
    routes: [
      { label: "Free 60–90-minute cultural stop", steps: ["Check today's exhibition directory and university holiday schedule", "See the Gutenberg Bible and photography display if accessible", "Choose one rotating exhibition for a more concentrated visit"] },
      { label: "Literature and creative work visit", steps: ["Start with the current literary exhibition", "Connect selected manuscripts and historic objects to artists' creative processes", "Research separately in the Reading Room only after completing its registration and ID requirements"] },
    ],
    sources: [
      { label: "Harry Ransom Center — plan your visit", url: "https://www.hrc.utexas.edu/visit/", use: "Distinct gallery and Reading Room hours, parking, access and visitor policies" },
      { label: "Harry Ransom Center — exhibitions", url: "https://www.hrc.utexas.edu/exhibitions/", use: "Dates and identity of active exhibitions and signature objects" },
      { label: "Harry Ransom Center — group tours", url: "https://www.hrc.utexas.edu/group-tours/", use: "Reservation requirements and group size" },
      { label: "Harry Ransom Center — FAQs", url: "https://www.hrc.utexas.edu/frequently-asked-questions/", use: "Researcher versus gallery visitation policies" },
    ],
    connections: [
      { label: "Travis County", href: "/county/travis", reason: "Connect UT's humanities museums with Austin arts, history and educational attractions." },
      { label: "Austin Nature & Science Center", href: "/destination/austin-nature-and-science-center", reason: "Compare an indoor humanities museum with a free family nature-learning visit." },
    ],
  },

  "thinkery-austin-childrens-museum": {
    name: "Thinkery Children's Museum",
    slug: "thinkery-austin-childrens-museum",
    county: "Travis",
    city: "Austin",
    reviewed: "2026-10-13",
    topics: ["science", "family", "accessibility", "play"],
    whyVisit: "Thinkery is Austin's hands-on STEAM children's museum in Mueller where young visitors test ideas through light, water, construction and imaginative play. It is different from a passive art or history museum because participation, experimentation and repeated attempts are central to the exhibits. Parents can choose areas that fit children's ages instead of trying to visit every gallery in one session.",
    visitorStrategy: "Visit the Meredith Learning Lab at 1830 Simond Avenue, not the separate Thinkery Del Valle location. Ordinary public admission hours are Tuesday through Sunday 10 a.m.–5 p.m.; closed Monday except special programs. Standard admission for ages one and older is listed at $19.95, members free, and infants younger than one free. Allow 90 minutes to two hours. The museum currently offers up to three hours of validated parking in the McBee Street District Garage and Simond Garage, with current instructions requiring a Metropolis account. Parking validation and access during special programs can differ.",
    accessibility: "Both public floors are wheelchair accessible by elevator, with limited wheelchairs and sensory earmuffs available from Admissions on a first-come basis. The museum also publishes a social story, floor map and sensory resources. For light-sensitive visitors, the Light Lab's Frozen Shadows feature includes bright strobe lighting. Service animals are permitted; regular pets and emotional-support animals are not admitted under ordinary policies.",
    familiesAndGroups: "Adults must accompany children throughout the museum and Thinkery requires a 1:5 adult-to-child ratio on the exhibit floor. Babies and toddlers may benefit from Baby Bloomers on specified Friday and Saturday mornings with a separately priced ticket. Fresh! Farmers Market is particularly suited to young learners; Light Lab can be more stimulating and loud. The museum allows outside food and beverages in a designated Snack Area, not gallery spaces. There is no basis to promise a full-service museum restaurant.",
    researchValue: "The museum's learning focus is experimenting, asking questions and making, not a static record of scientific instruments. Explain distinctions among standard general admission, Baby Bloomers, in-person-only reciprocal memberships, and separately programmed events. Policies and fees change more quickly than underlying STEAM exhibit themes. A separate Thinkery in Del Valle has different prices and accessibility, and must not be conflated with this Mueller destination.",
    exhibits: [
      { heading: "Light Lab", detail: "Hands-on color mixing, glowing art and Frozen Shadows let children investigate light, but the latter includes strobe effects that should be flagged for light-sensitive guests." },
      { heading: "Currents and water experimentation", detail: "Water and flow activities create opportunities to explore cause and effect, movement and the idea of testing designs. Check the gallery's operating condition before promising every hands-on feature." },
      { heading: "Fresh! Farmers Market", detail: "Younger visitors can sort and weigh play produce, collect pretend eggs and assemble recipe cards in a market-and-kitchen environment." },
      { heading: "Innovators' Workshop and Spark Shop", detail: "Maker-oriented exhibits encourage children to build, test, iterate and use their own ideas, with changing activity supplies and supervised interactive spaces." },
      { heading: "Our Backyard and family exploration", detail: "Indoor and outdoor play settings connect imagination with everyday science and give families contrasting levels of activity." },
    ],
    routes: [
      { label: "90-minute first visit", steps: ["Arrive with validated parking instructions and check in at Admissions", "Begin with an age-appropriate gallery such as Farmers Market or Light Lab", "Allow time for Currents or an engineering activity rather than rushing all stations"] },
      { label: "Toddler-paced family visit", steps: ["Reserve the separately scheduled Baby Bloomers session if that age program suits your family", "Alternate a quiet period with play galleries designed for early learners", "Use the Snack Area for brought food, not the gallery floors"] },
    ],
    sources: [
      { label: "Thinkery — current visit, fees and parking", url: "https://thinkeryaustin.org/visit-us/", use: "Admission, hours and parking validation conditions" },
      { label: "Thinkery — policies and visitor FAQ", url: "https://thinkeryaustin.org/guidelines/", use: "Age supervision, food, lockers and accessible entry" },
      { label: "Thinkery — accessibility resources", url: "https://thinkeryaustin.org/museum-accessibility/", use: "Wheelchairs, hearing/sensory supports and social story" },
      { label: "Thinkery — interactive exhibit roster", url: "https://thinkeryaustin.org/exhibit/", use: "Age and gallery themes" },
      { label: "Thinkery — reduced admission", url: "https://thinkeryaustin.org/resources/", use: "Museums for All and reciprocal membership requirements" },
    ],
    connections: [
      { label: "Travis County", href: "/county/travis", reason: "Find family activities in the larger Austin and Mueller context." },
      { label: "Austin Nature & Science Center", href: "/destination/austin-nature-and-science-center", reason: "Compare a free outdoor nature experience with Thinkery's paid indoor STEAM play." },
      { label: "Harry Ransom Center", href: "/destination/harry-ransom-center-austin", reason: "Contrast a humanities research exhibition with a hands-on children's museum." },
    ],
  },

  "lbj-presidential-library-austin": {
    name: "LBJ Presidential Library",
    slug: "lbj-presidential-library-austin",
    county: "Travis",
    city: "Austin",
    reviewed: "2026-10-13",
    topics: ["texas-history", "politics", "family", "civil-rights"],
    whyVisit: "LBJ Presidential Library follows Lyndon B. Johnson's presidency and Texas career through recorded conversations, the replica Oval Office, Lady Bird Johnson's office, and interpretive exhibits on the Great Society, civil rights and the Vietnam War. It presents a visitor-friendly selection of a far larger National Archives research collection.",
    visitorStrategy: "At 2313 Red River Street, free visitor parking is in UT lot 38. The museum opens every day 9 a.m.–5 p.m., with last admission at 4 p.m. Current prices include $16 adults, $12 seniors 62+, $6 students and ages 13–18; children under 12 enter free. Tuesday admission is half price, and the museum has scheduled 2026 free days. A typical visit takes 90 minutes to two hours. UT football traffic may affect arrival.",
    accessibility: "Accessible parking in lot 38 leads over an approximately 250-foot plaza approach to the entrance; ramps and elevators connect the public exhibition floors. Loaner wheelchairs, captioned videos and printed audio transcripts are provided. Request ASL at least two weeks ahead or an escort for guests with vision impairments at least one week ahead; wheelchair-accessible restrooms are on floor two.",
    familiesAndGroups: "A short family route can feature the replica Oval Office, Lady Bird Johnson's office, the animatronic LBJ and a film without expecting children to read every panel. Older students can compare civil rights legislation with the Vietnam War. Groups of fifteen or more require reservations, normally three weeks ahead for adult groups. No current public confirmation establishes a full-service cafeteria, so plan meals elsewhere.",
    researchValue: "Present Johnson's domestic social reforms and the contentious Vietnam conflict side by side, rather than reducing the library to a presidential tribute. Current temporary shows include The American Experiment through January 10, 2027 and Austin Past & Present and What We Bring to the Table through January 3, 2027. Distinguish archival holdings from gallery access, and treat exhibit end dates as review-sensitive.",
    exhibits: [
      { heading: "Oval Office and Lady Bird Johnson's office", detail: "Recreated working spaces introduce presidential decision-making; neither is an original Washington Oval Office." },
      { heading: "Great Hall and presidential recordings", detail: "Selected objects and recorded calls convey the scale of Johnson's decisions while the underlying archives remain a separate research resource." },
      { heading: "Civil rights, Great Society and Vietnam", detail: "Interpret domestic legislative change alongside the human and diplomatic costs of war." },
      { heading: "The American Experiment: Pursuing Our Promise", detail: "The current temporary exhibition runs through January 10, 2027 and draws on significant national historical documents." },
      { heading: "Austin Past & Present and What We Bring to the Table", detail: "Dated temporary displays, currently scheduled through January 3, 2027, extend the historical context." },
    ],
    routes: [
      { label: "Quick 45-minute presidential introduction", steps: ["Start on the tenth floor with the Oval Office and Lady Bird Johnson's office", "See the animatronic LBJ and an introductory film if time permits", "Leave before last admission restrictions affect entry"] },
      { label: "Two-hour balanced history visit", steps: ["Explore the president's Texas career and Great Society legislation", "Compare the Vietnam galleries and civil rights history", "Add a documentary, recordings or current temporary show"] },
    ],
    sources: [
      { label: "LBJ current visit, prices and free days", url: "https://www.lbjlibrary.org/visit", use: "Admission, hours and parking" },
      { label: "LBJ visit length and highlights", url: "https://lbjlibrary.org/visit/know-before-you-go", use: "Visitor priorities and expected time" },
      { label: "LBJ active exhibitions", url: "https://www.lbjlibrary.org/exhibitions", use: "Time-limited exhibitions" },
      { label: "LBJ accessibility", url: "https://lbjlibrary.org/visit/accessibility", use: "ADA access and ASL" },
      { label: "LBJ groups", url: "https://www.lbjlibrary.org/visit/group-visits", use: "Booking requirements" },
    ],
    connections: [
      { label: "Travis County", href: "/county/travis", reason: "Connect Austin's presidential and civic history." },
      { label: "Bullock Texas State History Museum", href: "/destination/bullock-texas-state-history-museum", reason: "Compare political and statewide history interpretation." },
      { label: "Harry Ransom Center", href: "/destination/harry-ransom-center-austin", reason: "Discover a separate UT cultural exhibition and research institution." },
    ],
  },
  "blanton-museum-of-art-austin": {
    name: "Blanton Museum of Art",
    slug: "blanton-museum-of-art-austin",
    county: "Travis",
    city: "Austin",
    reviewed: "2026-10-13",
    topics: ["art", "family", "architecture", "accessibility"],
    whyVisit: "The Blanton Museum of Art on the UT Austin campus combines major Latin American and U.S. art holdings, European paintings and site-specific modern art. Austin by Ellsworth Kelly is a freestanding colored-glass artwork designed as a space for quiet reflection. The museum's varied galleries invite a focused visit based on periods, regions or particular artistic questions.",
    visitorStrategy: "The Blanton opens Tuesday–Friday 10 a.m.–5 p.m., Saturday 10 a.m.–8 p.m. and Sunday 10 a.m.–5 p.m.; closed Mondays. Admission is $15 adults, $12 seniors 65+, $8 youth ages 6–17 and free for children five and under or UT ID holders; Tuesdays are free. Paid campus garages serve visitors, with rates and football-day restrictions on the official parking page. The museum's own FAQ still says its new café is under construction, so do not promise on-site food service until reopening is confirmed.",
    accessibility: "Brazos Street has a museum drop-off and accessible approaches to the Check-In building. Elevators, wave-operated entrance doors, accessible bathrooms and loaner wheelchairs serve public spaces including Austin by Ellsworth Kelly. Accessible garage parking is paid, and routes differ on football days. Ask at least two weeks ahead for ASL interpretation; captioning and assisted listening are available for some programming.",
    familiesAndGroups: "Children younger than twelve must be accompanied and supervised by an adult. Family activity boxes and occasional guided artmaking offer engaging shorter experiences; Ellsworth Kelly's Austin is a quiet environment, not a play area. Groups of eight or more must request access at least two weeks ahead, even if self-guided, and unauthorised paid private guides cannot lead groups. Food must stay out of galleries; picnic outside or use nearby restaurants until the planned café opens.",
    researchValue: "More than 22,000 works underlie the museum's changing displays; only part of the collection is on view. Explain how the museum's Latin American work, Italian Renaissance and Baroque paintings, prints, drawings and newer art differ, and that special exhibits rotate. Austin by Ellsworth Kelly is a permanent installation distinct from a temporary exhibition, and is included with admission.",
    exhibits: [
      { heading: "Austin by Ellsworth Kelly", detail: "The stone building's colored windows, wooden totem and marble panels create a distinctive encounter with modern art and architecture." },
      { heading: "Latin American and contemporary work", detail: "Use a rotating set of galleries to compare artists, places and media rather than implying every collected object is on view." },
      { heading: "Italian Renaissance and Baroque painting", detail: "Historical European works offer a contrast with Latin American and contemporary galleries." },
      { heading: "Prints, drawings and themed vault displays", detail: "Works on paper rotate frequently because their display and conservation requirements differ." },
      { heading: "Free-with-admission public tours", detail: "English and Spanish tours can provide a themed first visit, depending on the day's schedule." },
    ],
    routes: [
      { label: "90-minute highlights route", steps: ["Start at Check-In and review the current map and exhibitions", "Visit Austin by Ellsworth Kelly and two contrasting galleries", "Take a break on the grounds before leaving"] },
      { label: "Free-Tuesday art visit", steps: ["Reserve or claim Tuesday's free entry under current ticketing rules", "Focus on Latin American or contemporary works", "Join a scheduled public tour if one is offered"] },
    ],
    sources: [
      { label: "Blanton visit and pricing", url: "https://blantonmuseum.org/visit/", use: "Hours, admission and café status" },
      { label: "Blanton museum visitor FAQ", url: "https://blantonmuseum.org/visit/faqs/", use: "Dining and family policies" },
      { label: "Blanton accessibility", url: "https://blantonmuseum.org/visit/accessibility/", use: "Wheelchair access and interpretation" },
      { label: "Blanton parking", url: "https://blantonmuseum.org/visit/parking/", use: "Garage pricing and game days" },
      { label: "Blanton group visits", url: "https://blantonmuseum.org/visit/group-visits/", use: "Group reservation threshold" },
    ],
    connections: [
      { label: "Travis County", href: "/county/travis", reason: "Explore Austin's major museums in context." },
      { label: "Bullock Texas State History Museum", href: "/destination/bullock-texas-state-history-museum", reason: "Compare Texas history with the Blanton's art focus." },
      { label: "Harry Ransom Center", href: "/destination/harry-ransom-center-austin", reason: "Continue to UT humanities exhibitions and research history." },
    ],
  },

  "alvin-historical-museum": {
    name: "Alvin Historical Museum",
    slug: "alvin-historical-museum",
    county: "Brazoria",
    city: "Alvin",
    reviewed: "2026-10-13",
    topics: ["texas-history", "railroads", "sports", "family"],
    whyVisit: "Alvin Historical Museum is a volunteer-run local-history museum where the former 1940 Alvin post office is itself an important part of the visit. Instead of attempting to interpret all Texas history, its exhibits make the town's railroad origins, agriculture, schools, military experience and community ties concrete. A restored post-office mural and Nolan Ryan memorabilia give families two unusually memorable entry points to Alvin's past.",
    visitorStrategy: "The Alvin Museum Society publishes Tuesday through Saturday 11 a.m.–3 p.m. for the downtown museum. The separate Slover–Rogers Cottage is at 113 E Dumble Street and requires an advance appointment; do not assume access when the historical museum is open. The operator's newer homepage gives 300 West Sealy while an older Texas Historical Commission record gives 303 W Sealy: follow the museum's own current address. Call 281-331-4469 to verify volunteer staffing and holiday exceptions. The museum's website does not clearly post a regular admission price, so check directly instead of inventing a free-entry promise.",
    accessibility: "The operator describes a wheelchair-accessible entry added on the east wall of the former post office. It does not fully document the accessible route through all twenty-one permanent exhibit areas, restroom details or sensory supports. Confirm access to particular rooms, mobility equipment or accommodations before a visit. The 1909 Slover–Rogers Cottage is a separate historic property with different accessibility constraints and appointment procedures.",
    familiesAndGroups: "Families can choose a focused visit based on Nolan Ryan's early baseball life, the former post office, school history or how the railroads shaped Alvin. An independent 60–90-minute estimate allows time for a handful of exhibits without suggesting that every artifact must be seen. The operator operates a small museum gift shop, not a documented on-site café or restaurant. School groups and cottage tours should contact the volunteer society before arriving.",
    researchValue: "The Society began in 1978 and the museum opened in the former Alvin post office in May 2007. Interpretation ranges from prehistory and early Texas through rail transport, dairying, wartime communities and Alvin Independent School District. The restored 'Emigrants at Nightfall' mural was returned to the original post-office building with assistance from Nolan and Ruth Ryan. Explain the difference between the main historic museum and the separately booked Victorian cottage, rather than silently combining their exhibits or times.",
    exhibits: [
      { heading: "Nolan Ryan's Alvin baseball story", detail: "See how the hometown athlete's youth and Major League career are reflected in personal objects, including a Little League home plate and late-career jersey mentioned by the museum." },
      { heading: "Historic 1940 post office and restored mural", detail: "The building retains elements of its post-office use. 'Emigrants at Nightfall' is an important restored public-art object returned to its original setting." },
      { heading: "Schools, railroads and dairy farming", detail: "Compare how transportation, school development and agriculture changed Alvin from a rail stop into a growing Gulf Coast community." },
      { heading: "Alvin wartime stories", detail: "Civil War, World War I and World War II materials connect national events with the experiences of local families and veterans." },
      { heading: "Slover–Rogers Cottage (separate appointment)", detail: "The museum society also operates a 1909 Victorian-style house nearby. Its rooms and furnishings require a separate docent tour arranged ahead of time." },
    ],
    routes: [
      { label: "60-minute family highlights", steps: ["Enter the former post-office building during its posted hours", "Choose Nolan Ryan, mural and local school/railroad stories", "Stop at the volunteer-operated gift shop if open"] },
      { label: "A deeper Alvin history visit", steps: ["Allow time for downtown museum history and agriculture exhibits", "Arrange the Slover–Rogers Cottage separately before travel", "Use the Brazoria County guide to connect the museum stories with nearby heritage sites"] },
    ],
    sources: [
      { label: "Museum Society — official hours and location", url: "https://alvinmuseum.org/", use: "Current site hours, phone, address, cottage appointment distinction" },
      { label: "Alvin Museum — exhibits", url: "https://alvinmuseum.org/alvin-musuem/", use: "Nolan Ryan, schools, war, post-office mural" },
      { label: "Alvin Museum — building interpretation", url: "https://alvinmuseum.org/tour-01_intro-to-museum/", use: "Former post-office story and accessible east entrance" },
      { label: "Alvin Museum — separate cottage booking", url: "https://alvinmuseum.org/slover-rogers-cottage/", use: "Slover–Rogers location and advance tours" },
      { label: "Texas Historical Commission — institutional record", url: "https://atlas.thc.texas.gov/Details/4200000007", use: "Historic record; operator supersedes stale address" },
    ],
    connections: [
      { label: "Brazoria County", href: "/county/brazoria", reason: "Connect Alvin to regional railroad, farm and coastal history." },
      { label: "Texas museums", href: "/explore/museums", reason: "Compare volunteer-led community museums with statewide institutions." },
    ],
  },
  "el-paso-holocaust-museum": {
    name: "El Paso Holocaust Museum and Study Center",
    slug: "el-paso-holocaust-museum",
    county: "El Paso",
    city: "El Paso",
    reviewed: "2026-10-13",
    topics: ["world-history", "human-rights", "texas-history", "education"],
    whyVisit: "El Paso Holocaust Museum and Study Center is an intimate, bilingual museum focused on the lives of Jewish people before, during and after the Nazi genocide, and on survivors who made their homes in the borderland community. Its galleries use personal stories, testimony, a recreated railcar setting and reflection to help visitors encounter the historical consequences of antisemitism and persecution without turning remembrance into entertainment.",
    visitorStrategy: "The institution publishes free admission, with donations appreciated, at 715 N Oregon Street. The public entrance is on Yandell Drive between Oregon and El Paso streets, not at the mailing-address front. Free visitor parking is adjacent, at Yandell and El Paso Street. Posted hours are Tuesday–Friday 9 a.m.–5 p.m. and Saturday 1–5 p.m., closed Mondays; Sundays are by appointment. All self-guided tours must start at least 30 minutes before closing. Holiday closures include Jewish holidays and major civic holidays, so check the official notice before traveling.",
    accessibility: "Current public pages confirm a dedicated museum entrance and adjacent free parking, but do not provide a detailed statement on wheelchair routes, hearing accommodations, stroller policies or sensory needs. Contact the museum at 915-351-0048 ahead of time for specific mobility or communication requirements. All galleries are presented in English and Spanish, which is an important visitor language accommodation; do not infer that all recordings are captioned without checking.",
    familiesAndGroups: "Content about violent persecution and death is emotionally difficult and should be approached with adult guidance for younger children. Teachers can schedule museum group tours or borrow curriculum trunks; school staff may also request a speaker when a trip cannot be arranged. A self-guided public visit may take roughly 60–90 minutes as an independent estimate, while a testimony program can add time. No full-service restaurant or museum cafeteria is established in the official visitor information.",
    researchValue: "The permanent galleries trace European Jewish life, the Nazis' rise, propaganda, Kristallnacht, ghettos, deportations, concentration camps, liberation and the Righteous Among the Nations. A memorial and reflection room and a gallery of El Paso survivors show how global events connect with local lives. 'Dimensions in Testimony,' developed with the USC Shoah Foundation, presents interactive prerecorded survivor or liberator accounts; the featured testimony rotates by week and show times have a separate schedule.",
    exhibits: [
      { heading: "Europe before Nazism and the rise of persecution", detail: "Multimedia interpretation shows how Jewish communities lived before Hitler's rise, and how propaganda and state action shaped persecution." },
      { heading: "Ghettos, rail transport and concentration camps", detail: "Galleries cover forced displacement, deportation and camps. Visitors should expect emotionally difficult, historically specific material." },
      { heading: "Liberation, resistance and the Righteous", detail: "Explore how people responded to persecution and what liberation did—and did not—resolve for survivors." },
      { heading: "El Paso survivor testimonies and memorial room", detail: "The local survivor gallery and a space for reflection connect international history to families who lived in West Texas." },
      { heading: "Dimensions in Testimony", detail: "Interactive prerecorded testimony allows visitors to ask questions of digitized biographies of survivors and liberators. Speakers and schedules rotate, so verify the day’s show times." },
    ],
    routes: [
      { label: "Reflective self-guided visit", steps: ["Arrive at the Yandell Drive entrance and plan before the last-entry cutoff", "Follow the permanent history galleries in their intended sequence", "Set aside quiet time in the local survivor and reflection galleries"] },
      { label: "Group or educator visit", steps: ["Book guided visits and curriculum support in advance", "Prepare students for difficult images and sensitive historical discussion", "Confirm whether a Dimensions in Testimony presentation is included in the group's timing"] },
    ],
    sources: [
      { label: "El Paso Holocaust Museum — visitor hours, parking and admission", url: "https://elpasoholocaustmuseum.org/hours-and-closures/", use: "Operator current schedule and location" },
      { label: "El Paso Holocaust Museum — mission and permanent galleries", url: "https://elpasoholocaustmuseum.org/about-us/", use: "Exhibition topics and bilingual interpretation" },
      { label: "El Paso Holocaust Museum — interactive testimony", url: "https://elpasoholocaustmuseum.org/dimensions-in-testimony/", use: "Testimony technology and daily schedules" },
      { label: "El Paso Holocaust Museum — education and group programs", url: "https://elpasoholocaustmuseum.org/", use: "Current group booking and visitor contact" },
      { label: "El Paso Holocaust Museum — Spanish directions", url: "https://elpasoholocaustmuseum.org/ubicacion-horario-y-cierres/", use: "Independent Spanish-language directions, opening hours and visitor parking details" },
    ],
    connections: [
      { label: "El Paso County", href: "/county/el-paso", reason: "Connect downtown cultural history with the wider borderland region." },
      { label: "Holocaust Museum Houston", href: "/destination/holocaust-museum-houston", reason: "Compare two distinct Texas Holocaust education institutions rather than conflating exhibits." },
      { label: "Texas museums", href: "/explore/museums", reason: "Explore other researched Texas heritage and history sites." },
    ],
  },

  "el-paso-museum-of-archaeology": {
    name: "El Paso Museum of Archaeology",
    slug: "el-paso-museum-of-archaeology",
    county: "El Paso",
    city: "El Paso",
    reviewed: "2026-10-13",
    topics: ["archaeology", "indigenous-history", "desert-ecology", "family"],
    whyVisit: "El Paso Museum of Archaeology connects the city's Borderlands archaeology with the extraordinary setting of the Franklin Mountains. Visitors can trace the lives and material cultures of Indigenous communities from Paleoindian peoples to the present, then step outside onto interpretive desert paths. The museum is particularly useful for understanding how archaeology reconstructs changing societies without reducing living Indigenous people to artifacts of the past.",
    visitorStrategy: "At 4301 Woodrow Bean Transmountain Road, the city museum offers free admission to its galleries Tuesday–Saturday 9 a.m.–5 p.m.; city holidays can change this. Free guided tours need booking at least two weeks ahead. The parking lot gates are locked promptly at 5 p.m., so anyone walking exterior trails after 4 p.m. should follow the museum's advice to park outside the gates without blocking access. Museum opening hours and trail access are separate concerns, especially during heat and storms.",
    accessibility: "The operator lists accessible gallery and restroom facilities and first-come loaner wheelchairs available from visitor services. Trained service animals are allowed under the museum's stated policy. Indoor ADA access should not be confused with the adjoining desert trails, which may have rock, slopes, sun exposure and uneven surfaces; visitors need to ask staff for appropriate outdoor routing. Its photography rules allow ordinary visitor photos under museum conditions, but media photography requires city public-information approval.",
    familiesAndGroups: "Families can explore dioramas, archaeological interpretations, display drawers and the museum's desert setting. School and other organized groups may request free guided tours but must reserve at least two weeks in advance; book any specialist programming directly. A focused indoor visit can take about an hour by editorial estimate, with an additional hour for a short outdoor loop only if temperature and visitor ability make that sensible. The official visitor page does not establish a full-service restaurant, café or snack counter.",
    researchValue: "The institution describes roughly 14,000 years of El Paso area prehistory, using dioramas and material-culture displays to interpret Paleoindian lifeways, later Southwestern and northern Mexican communities and continuities with present-day Native American peoples. Its Wilderness Park setting has interpretive trails, desert plants and birds, which makes it an unusual pairing of material history and living ecology. Avoid claiming that every archaeological specimen is currently displayed; exhibitions rotate and some collections are for study.",
    exhibits: [
      { heading: "Southwestern Indigenous cultures through time", detail: "Dioramas and artifacts help visitors consider how different communities inhabited the greater Southwest and northern Mexico, including continuity with living descendants." },
      { heading: "Paleoindian and later lifeways", detail: "The displays use material evidence to introduce hunting, gathering, settlement and changing environments, with appropriate distinctions between archaeologists' interpretation and oral history." },
      { heading: "Changing auditorium and North Gallery exhibitions", detail: "Special presentations rotate; confirm the current roster before traveling for a particular show." },
      { heading: "Hands-on archaeological display drawers", detail: "The museum describes explore-able drawers containing artifacts and reference materials in the auditorium; contact visitor services about current availability and child supervision." },
      { heading: "Wilderness Park and Chihuahuan Desert trails", detail: "About fifteen acres of native-plant grounds and connecting trails provide a practical outdoor context for archaeology; prepare for exposed, uneven terrain and summer heat." },
    ],
    routes: [
      { label: "One-hour indoor museum introduction", steps: ["Start with the regional timeline and Indigenous-culture dioramas", "Compare material-culture displays and interpretive drawers where open", "Check the current changing exhibition before visiting the gift-shop or restrooms"] },
      { label: "Museum and desert nature outing", steps: ["Tour indoor archaeology galleries while the museum is open", "Walk a short marked Wilderness Park trail only when weather and terrain are suitable", "Return to the parked car before gate locking at 5 p.m. or follow posted outside-gate parking rules"] },
    ],
    sources: [
      { label: "Museum — official visitor guidance", url: "https://epmarch.org/about/plan-your-visit", use: "Free admission, hours, tours, access, parking gates and media policies" },
      { label: "Museum — regional exhibits", url: "https://epmarch.org/", use: "Exhibit subjects, dioramas and archaeology interpretation" },
      { label: "Museum — archaeology and education mission", url: "https://epmarch.org/about/about-epmarch", use: "Desert ecology programs and region covered" },
      { label: "Visit El Paso — Wilderness Park visitor context", url: "https://visitelpaso.com/places/el-paso-museum-of-archaeology-wilderness-park", use: "Grounds, nature trails and local wildlife" },
    ],
    connections: [
      { label: "El Paso County", href: "/county/el-paso", reason: "Connect archaeological interpretation with the broader Borderlands region." },
      { label: "El Paso Holocaust Museum", href: "/destination/el-paso-holocaust-museum", reason: "Compare two unrelated museum subjects in the same city without conflating their narratives." },
      { label: "Texas museums", href: "/explore/museums", reason: "Explore archaeology and natural-history museums elsewhere in Texas." },
    ],
  },

  "johnny-nelson-katy-heritage-museum": {
    name: "Johnny Nelson Katy Heritage Museum",
    slug: "johnny-nelson-katy-heritage-museum",
    county: "Fort Bend",
    city: "Katy",
    reviewed: "2026-10-13",
    topics: ["texas-history", "agriculture", "family", "railroad"],
    whyVisit: "The City of Katy's heritage museum preserves a local story that can disappear beneath the region's modern suburban identity: rice cultivation, farm machinery, early settlement, transportation and the people who made Katy an agricultural community. Vintage tools, farming equipment, household antiques and photographs make a useful introduction to the landscape before the energy and residential boom. The museum was renamed for founder Johnny Nelson in 2018.",
    visitorStrategy: "The City lists the Johnny Nelson Katy Heritage Museum at 6002 George Bush Drive, with free admission and opening Thursday–Saturday from 10 a.m. to 5 p.m., Sunday from 11 a.m. to 5 p.m. These are NOT the same hours as the neighboring Heritage Park house tours. A focused museum visit is estimated at 45–90 minutes; confirm staffing and holiday schedules before driving. Pair the indoor displays with the adjacent historical homes only if those tours are operating.",
    accessibility: "The City lists the physical address but does not publish a comprehensive wheelchair route, stroller policy, sensory accommodation guide, or accessible restroom inventory specifically for this museum. Contact City visitor services at 281-574-8618 if these arrangements are essential. The neighboring historic houses have separate arrangements; do not assume their steps or entrances match the museum building.",
    familiesAndGroups: "The agricultural equipment, farm implements, photographs and household antiques are suitable subjects for school-age children learning how Katy developed. Children looking for interactive play exhibits may find this more of a traditional local-history museum. The city says schools, clubs and organized groups can arrange special tours; verify the available staff and advance-booking requirements. There is no verified indoor cafeteria or full-service restaurant.",
    researchValue: "The museum is an accessible starting point for interpreting Katy's rice-growing history and economic transition. Johnny Nelson helped build the collection and donated or interpreted equipment associated with local farming, including a family rice combine. Its distinct purpose should not be confused with the neighboring Katy Heritage Park's restored homes or the separate MKT Railroad Depot Museum on First Street.",
    exhibits: [
      { heading: "Rice farming and historic agricultural machinery", detail: "Study implements used in planting, harvesting and processing rice, a defining crop in Katy's early economy. Vintage tractors and harvesters make the area's changing land use easier to imagine than a list of dates." },
      { heading: "Local settlement photographs and household objects", detail: "Old photographs, antique household pieces and pioneer material show how daily life and commerce developed around farms, rail access and community institutions." },
      { heading: "Johnny Nelson and local preservation", detail: "The institution's naming honors Johnny Nelson, a former city leader who collected and preserved Katy agricultural history. The story also illustrates why small local museums matter even as cities grow." }
    ],
    routes: [
      { label: "Local-history highlights", steps: ["Begin with rice-farming machinery and tools", "Examine early Katy community photographs and objects", "Compare historical agriculture with today's Katy landscape"] },
      { label: "Katy heritage half day", steps: ["Visit Johnny Nelson Katy Heritage Museum during confirmed hours", "Walk to the adjacent Heritage Park exterior and check whether historic-home tours are offered", "Make a separate downtown stop at the MKT Railroad Depot Museum if it is open"] }
    ],
    sources: [
      { label: "City of Katy — museums and current admission", url: "https://www.cityofkaty.com/visitors/museums", use: "Exact museum address, hours, free admission, exhibit themes, group tours and separate museum locations" },
      { label: "Texas Historical Commission Atlas — museum record", url: "https://atlas.thc.texas.gov/Details/4200001108", use: "Official museum identity and recorded history; older Atlas hours superseded by current City schedule" },
      { label: "Katy Heritage Society — nearby museum and historic-home tours", url: "https://www.katyheritagesociety.com/", use: "Distinguish neighboring homes and separately located railroad depot from the Johnny Nelson museum" }
    ],
    connections: [
      { label: "Fort Bend County", href: "/county/fort-bend", reason: "Relate Katy's farming and settlement heritage to other Fort Bend communities." },
      { label: "Texas museum directory", href: "/explore/museums", reason: "Explore other independently sourced Texas museums." }
    ],
  },

};

export const museumAuthorityDirectory = Object.values(museumAuthorityDossiers).map(({ slug, name, city, county, topics }) => ({ slug, name, city, county, topics }));

export function museumDossierFor(slug: string): MuseumAuthorityDossier | undefined {
  return museumAuthorityDossiers[slug];
}

/**
 * Destination-specific, attribution-cleared reference photography.
 * Licenses verified against the individual Wikimedia Commons file records.
 * Do not substitute regional stock for an exact-location photograph.
 */
export { museumLicensedHeroes } from "./museum-authority-heroes";


/** Preserve the existing canonical destination and augment it; never duplicate a route. */
export function enrichMuseumAuthority(destination: Destination): Destination {
  const dossier = museumDossierFor(destination.slug);
  if (!dossier) return destination;
  const existingText = destination.body.join(" ");
  // Render the full research dossier only once in the dedicated museum section.
  // Add extra overview depth only where an original destination is truly thin.
  const needsBodyReinforcement = destination.body.length < 3 || existingText.length < 450;
  const additionalParagraphs = needsBodyReinforcement ? [dossier.whyVisit, dossier.visitorStrategy, dossier.researchValue] : [];
  const newText = additionalParagraphs.filter((paragraph) => !existingText.includes(paragraph));
  return {
    ...destination,
    county: destination.county || dossier.county,
    accessibilityNotes: destination.accessibilityNotes || dossier.accessibility,
    hero: isDestinationPhotoPlaceholder(destination.hero.src) && museumLicensedHeroes[destination.slug] ? museumLicensedHeroes[destination.slug] : destination.hero,
    body: [...destination.body, ...newText],
    sourceCheckedAt: dossier.reviewed,
  };
}
