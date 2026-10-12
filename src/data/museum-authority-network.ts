import type { Destination } from "./types";
import { isDestinationPhotoPlaceholder } from "./explore-hero-reconciliation";

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
      { label: "Fort Bend County heritage guide", href: "/article/fort-bend-county-brazos-richmond-sugar-land-texas", reason: "Place the ranch within two centuries of Brazos history." },
    ],
  },
  "texas-maritime-museum-rockport": {
    name: "Texas Maritime Museum", slug: "texas-maritime-museum-rockport", county: "Aransas", city: "Rockport", reviewed: "2026-10-12",
    topics: ["texas-history","maritime","industry","gulf-coast"],
    whyVisit: "Rockport's Texas Maritime Museum is a needed corrective to an inland-heavy story of Texas. It treats the Gulf and bays as corridors of travel, work, environmental change and risk, interpreting fishing, shipbuilding, maritime commerce, shipwrecks and Indigenous coastal history.",
    visitorStrategy: "The museum currently advertises pay-what-you-can donation admission and Tuesday-to-Saturday hours, 10 a.m. to 4 p.m. Its Rockport location makes a compact cultural stop before walking the waterfront. Confirm the exhibition and program schedule because the museum's small scale makes temporary changes relevant.",
    accessibility: "Review accessibility and current entrance arrangements directly with the operator. For the rest of a Rockport day, consider heat, sun and coastal weather when moving between the indoor museum and waterfront.",
    familiesAndGroups: "Children's maritime interpretation can work well with a short indoor visit followed by looking at real boats and coastal infrastructure. Ask about educator-led programs rather than assuming all shipbuilding or fishing activities run daily.",
    researchValue: "Read the displays as part of the environmental and economic history of Aransas Bay: shipping and seafood industries transformed settlements while depending on changing water conditions, navigation technology and coastal ecosystems.",
    exhibits: [
      { heading: "Boatbuilding and coastal commerce", detail: "Interpret ship design and industrial materials as responses to shallow bays, Gulf weather, port needs and regional commercial networks." },
      { heading: "Shipwrecks, Indigenous coastal history and navigation", detail: "Examine how archaeology and maritime objects recover histories that written commercial records may ignore, especially along the long-inhabited Gulf Coast." },
      { heading: "Fishing and offshore industries", detail: "Commercial fishing and energy are presented as parts of a working coastline, not simply as recreational attractions; connect the galleries to the harbor you can see outside." },
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
export const museumLicensedHeroes: Record<string, Destination["hero"]> = {
  "museum-of-the-big-bend-alpine": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Museum_of_the_Big_Bend_%28Alpine%2C_Texas%29.jpg?width=1600",
    alt: "Museum of the Big Bend building and landscape on the Sul Ross State University campus in Alpine",
    width: 1600, height: 1198,
    credit: "Seth Tisue · CC BY-SA 2.0 · Wikimedia Commons · File:Museum of the Big Bend (Alpine, Texas).jpg",
  },
  "panhandle-plains-historical-museum-canyon": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Panhandle-Plains_Historical_Museum_in_Canyon_Texas_USA.jpg?width=1280",
    alt: "Historic Panhandle-Plains Historical Museum stone building in Canyon, Texas",
    width: 1280, height: 960,
    credit: "Who What Where Nguyen Why · Public domain · Wikimedia Commons · 2006",
  },
  "texas-maritime-museum-rockport": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Maritime_Museum_Rockport_Texas_2024.jpg?width=1600",
    alt: "Texas Maritime Museum exterior in Rockport, Texas, photographed in 2024",
    width: 1600, height: 1066,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Texas Maritime Museum Rockport Texas 2024.jpg",
  },
  "texas-energy-museum-beaumont": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Energy_Museum%2C_front_entrance.jpg?width=1600",
    alt: "Front entrance of the Texas Energy Museum in downtown Beaumont",
    width: 1600, height: 901,
    credit: "JJonahJackalope · CC BY-SA 4.0 · Wikimedia Commons · File:Texas Energy Museum, front entrance.jpg",
  },
};

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
  };
}
