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
