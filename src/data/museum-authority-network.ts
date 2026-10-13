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
    reviewed: "2026-10-12",
    topics: ["african-american-history", "art", "civil-rights", "family"],
    whyVisit: "The African American Museum in Dallas brings African American art and cultural history into the landmark Fair Park campus, connecting Texas stories with wider national and international struggles for representation and civil rights. Its temporary exhibitions, documentary photographs and historical interpretation reward a focused visit rather than a quick detour between rides or stadium events.",
    visitorStrategy: "Find the museum at 3536 Grand Avenue within Dallas's Fair Park and usually enter through Gate 5. The operator lists Tuesday through Saturday, 10 a.m. to 5 p.m.; normal admission is free, but organized groups of more than ten must reserve and may pay a fee. During the 2026 State Fair or major Fair Park events, access and parking charges can differ from regular visitor conditions.",
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
      { label: "Texas homecoming mums", href: "/topics/texas-homecoming-mums", reason: "Connect the MUMENTOUS touring exhibition to broader Texas homecoming traditions." },
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
  "1940-air-terminal-museum-houston": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/1940_Air_Terminal_Museum.jpg?width=1024",
    alt: "Art Deco historic 1940 Air Terminal Museum building on the west side of Houston Hobby Airport",
    width: 1024, height: 768,
    credit: "Mlickliter · CC BY-SA 3.0 · Wikimedia Commons · File:1940 Air Terminal Museum.jpg",
  },
  "african-american-museum-dallas-fair-park": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/African_American_Museum_August_2016_03.jpg?width=1600",
    alt: "Exterior of the African American Museum at Fair Park in Dallas, photographed in 2016",
    width: 1600, height: 1067,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · File:African American Museum August 2016 03.jpg",
  },
  "texas-forestry-museum-lufkin": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Forestry_Museum%2C_Lufkin%2C_TX_IMG_8594.JPG?width=1600",
    alt: "The Texas Forestry Museum building in Lufkin, Texas",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · File:Texas Forestry Museum, Lufkin, TX IMG 8594.JPG",
  },

  "babe-didrikson-zaharias-museum-beaumont": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Zaharias_museum.jpg?width=1280",
    alt: "Circular Babe Didrikson Zaharias Museum and Visitor Center building in Beaumont, photographed in 2007",
    width: 1280, height: 1066,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · File:Zaharias museum.jpg (2007)",
  },
  "20th-century-technology-museum-wharton": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wharton_County_Museum_IMG_1054.JPG?width=1600",
    alt: "Wharton County Historical Museum building, shared with the 20th Century Technology Museum",
    width: 1600, height: 1200,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · File:Wharton County Museum IMG 1054.JPG",
  },

  "elisabet-ney-museum-austin": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Austin_-_Elisabet_Ney_Museum_-_20201006000619.jpg?width=1600",
    alt: "Historic limestone Formosa studio and Elisabet Ney Museum in Austin, photographed in October 2020",
    width: 1600, height: 1067,
    credit: "MarkJGilmore · CC BY-SA 4.0 · Wikimedia Commons · File:Austin - Elisabet Ney Museum - 20201006000619.jpg",
  },

  "amarillo-museum-of-art": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amarillo_Texas_Amarillo_Museum_of_Art_2005-05-15.jpg?width=1600",
    alt: "Amarillo Museum of Art building on the Amarillo College campus, photographed in 2005",
    width: 1600, height: 1124,
    credit: "Who What Where Nguyen Why · CC BY-SA 3.0 · Wikimedia Commons · File:Amarillo Texas Amarillo Museum of Art 2005-05-15.jpg",
  },

  "modern-art-museum-fort-worth": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fort_Worth_Texas_Modern_Art_Museum_2003.jpg?width=938",
    alt: "Modern Art Museum of Fort Worth exterior by Tadao Ando, photographed in 2003",
    width: 938, height: 496,
    credit: "Andreas Praefcke · Public domain · Wikimedia Commons · File:Fort Worth Texas Modern Art Museum 2003.jpg (historic exterior)",
  },

  "american-quarter-horse-hall-of-fame-museum-amarillo": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Amarillo_Texas_-_AQHA_-_Outside.jpg?width=1500",
    alt: "Historical exterior view of American Quarter Horse Hall of Fame and Museum in Amarillo, photographed in 2006",
    width: 1500, height: 1200,
    credit: "J. Nguyen · CC BY-SA 3.0 · Wikimedia Commons · File:Amarillo Texas - AQHA - Outside.jpg (2006 historical exterior)",
  },

  "art-museum-south-texas-corpus-christi": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Art_Museum_of_South_Texas_--_Corpus.jpg?width=1600",
    alt: "Art Museum of South Texas waterfront museum exterior in Corpus Christi, photographed in 2018",
    width: 1600,
    height: 1280,
    credit: "Jim Evans · CC BY-SA 4.0 · Wikimedia Commons · File:Art Museum of South Texas -- Corpus.jpg (2018)",
  },

  "houston-museum-of-natural-science": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_Museum_of_Natural_Science%2C_entrance_in_2012.JPG?width=1600",
    alt: "Houston Museum of Natural Science entrance in Hermann Park, photographed in 2012",
    width: 1600, height: 1200,
    credit: "Another Believer · CC BY-SA 3.0 · Wikimedia Commons · File:Houston Museum of Natural Science, entrance in 2012.JPG",
  },

  "el-paso-museum-of-art": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/El_Paso_Museum_of_Art_Migrant_Worker_Exhibit.jpg?width=1600",
    alt: "An exhibition at El Paso Museum of Art photographed in 2015, showing the museum's gallery environment, not a current 2026 exhibit",
    width: 1600, height: 900,
    credit: "Wikimedia Commons contributor · CC BY-SA 4.0 · File:El Paso Museum of Art Migrant Worker Exhibit.jpg · historical 2015 gallery photograph",
  },
  "arlington-museum-of-art": {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Richard_Greene_Linear_Park_%28Esports_Stadium_Arlington%29_%28cropped%29.jpg?width=1600",
    alt: "Arlington Entertainment District's former convention center and Esports Stadium complex in 2020, before Arlington Museum of Art opened there in 2024",
    width: 1600, height: 1117,
    credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons · File:Richard Greene Linear Park (Esports Stadium Arlington) (cropped).jpg · Pbrks crop; not a museum entrance photo",
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
    sourceCheckedAt: dossier.reviewed,
  };
}
