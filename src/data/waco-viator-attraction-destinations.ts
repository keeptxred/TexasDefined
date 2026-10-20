import type { Destination, DestinationAuthorityGuide } from "./types";

/**
 * Canonical Waco attractions promoted from verified editorial research.
 * Viator's attraction overviews are not themselves admission or tour tickets.
 * Booking links are rendered separately through the shared affiliate component.
 */
const wacoViatorAttractionBaseDestinations: Destination[] = [
  {
    id: "waco-attraction-cottonland-castle",
    brandId: "texasdefined",
    slug: "cottonland-castle",
    name: "Cottonland Castle",
    summary: "Waco's dramatic sandstone-and-limestone historic residence began in 1890, was completed in 1913, and was later restored by Chip and Joanna Gaines. Access to the interior is through separately ticketed Magnolia Castle Tours.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Waco",
    county: "McLennan County",
    coordinates: { lat: 31.53402, lng: -97.15847 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/The_Cottonland_Castle_Northwest_Elevation.jpg?width=1600",
      alt: "Stone turret and main facade of Cottonland Castle on Austin Avenue in Waco",
      width: 2250,
      height: 1500,
      credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
    },
    bestSeason: "Year-round for scheduled indoor tours; spring and fall are comfortable for exploring other Waco stops on the same day.",
    entryNote: "Cottonland Castle is not a walk-in public museum. Magnolia states that only guests holding Castle Tour tickets may enter the property; do not enter the grounds or disturb neighbors without a reservation. Its official guided tour lasts about one hour, involves multiple staircases, and does not have an alternate wheelchair-accessible route. Check the live Magnolia tour calendar before traveling.",
    highlights: ["Recorded Texas Historic Landmark since 1977", "Construction began 1890; completed 1913", "Restoration featured on Fixer Upper: The Castle", "Official Magnolia guided Castle Tour"],
    body: [
      "The Cottonland Castle is one of Waco's most distinctive examples of residential architecture from the era when cotton and regional trade helped shape the city. The Texas Historical Commission identifies stone contractor John Tennant as the builder who began the house in 1890. Ripley Hanrick acquired the unfinished structure in 1906, and architect Roy Lane's plans helped bring the sandstone residence to completion in 1913 for businessman Alfred Abeel. Its limestone detailing, crenellated tower and elaborate interior materials explain why the house became a Castle Heights landmark.",
      "The house carries a documented Recorded Texas Historic Landmark designation from 1977. Its story spans the fortunes of a private residence, successive owners, periods of deterioration and the highly publicized restoration by Chip and Joanna Gaines, featured on Fixer Upper: The Castle. The television restoration is one chapter of a longer Waco architectural history, not the origin of the building.",
      "Planning access is important. Magnolia currently advertises a ticketed Castle Tour led by a guide, typically lasting one hour with small groups. The building requires climbing stairs, so it is not an accessible substitute for a level-ground museum stop. Magnolia's current help center states that unticketed visitors may not enter the property. This is a residential neighborhood: respect private-property boundaries and parking instructions.",
      "For a Waco architecture itinerary, combine a reserved castle visit with downtown Magnolia Market at the Silos, the Dr Pepper Museum and the Brazos River waterfront. The Silos are in a different part of town; reserve the castle time first and plan other stops around it rather than assuming an open-house schedule.",
    ],
    managingAuthority: "Magnolia",
    officialUrl: "https://magnolia.com/pages/tours",
    reservationUrl: "https://magnolia.com/pages/tours",
    address: "3300 Austin Ave, Waco, TX 76710",
    directions: "The castle stands in Waco's Castle Heights neighborhood on Austin Avenue. Use the arrival and parking instructions attached to a confirmed Magnolia tour ticket; the residence is not an unscheduled walk-in attraction.",
    visitorFaqs: [
      { question: "Can I walk through Cottonland Castle without a ticket?", answer: "No. Magnolia asks that only ticketed Castle Tour guests enter the property out of respect for the residential neighborhood.", sourceUrl: "https://help.magnolia.com/hc/en-us/articles/31170532641940-About-Magnolia-Castle-Tours" },
      { question: "How long is the official Cottonland Castle tour?", answer: "Magnolia describes the Castle Tour as a guided one-hour experience; check its booking calendar for current departure options.", sourceUrl: "https://magnolia.com/pages/tours" },
      { question: "Is Cottonland Castle wheelchair accessible?", answer: "Magnolia says the historic home requires guests to use several staircases and does not offer an alternative accessible route on the Castle Tour.", sourceUrl: "https://help.magnolia.com/hc/en-us/articles/31170532641940-About-Magnolia-Castle-Tours" },
      { question: "When was Cottonland Castle built?", answer: "Work began in 1890, and the residence was completed in 1913 according to the Texas Historical Commission's historic marker.", sourceUrl: "https://atlas.thc.texas.gov/Details/5309005314" },
    ],
    sourceCheckedAt: "2026-10-20",
  },
  {
    id: "waco-attraction-suspension-bridge",
    brandId: "texasdefined",
    slug: "waco-suspension-bridge",
    name: "Waco Suspension Bridge",
    summary: "The 1870 pedestrian suspension bridge across the Brazos River connects downtown Waco's riverfront parks with a cattle-drive landmark and the popular Branding the Brazos sculptures.",
    category: "historic-sites",
    region: "prairies-lakes",
    nearestTown: "Waco",
    county: "McLennan County",
    coordinates: { lat: 31.56111, lng: -97.1275 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Waco_Suspension_Bridge.jpg?width=1600",
      alt: "Wide photographic view of Waco Suspension Bridge crossing the Brazos River",
      width: 6749,
      height: 2855,
      credit: "Sjgphotography2018 · Wikimedia Commons · CC BY-SA 4.0",
    },
    bestSeason: "Spring and fall for comfortable river walks; summer is best visited early or late in the day.",
    entryNote: "This is a public pedestrian landmark rather than a ticketed museum. The City of Waco describes the bridge and adjoining Riverwalk as public attractions; event closures and temporary maintenance restrictions can affect access. Use posted rules at the bridge and park entrances.",
    highlights: ["Completed in 1870", "Historic crossing on the Brazos River", "Indian Spring Park and Martin Luther King Jr. Park", "Branding the Brazos cattle-drive sculptures", "Connections to the Waco Riverwalk"],
    body: [
      "The Waco Suspension Bridge opened in 1870 at a time when crossing the Brazos River was a commercial necessity. Waco's river crossing helped merchants, wagons and cattle drives move between communities without relying exclusively on ferries. The City of Waco says the bridge used cable supplied by the John Roebling Company, a connection to the engineering firm associated with New York's Brooklyn Bridge.",
      "The original bridge was a transportation investment before it became a landmark. It was celebrated as the longest single-span suspension bridge west of the Mississippi when completed. Preservation turned the structure into a pedestrian crossing, and its historic setting now anchors the riverfront rather than serving everyday vehicle traffic.",
      "On the west bank, Indian Spring Park places the bridge beside the bronze Branding the Brazos sculptures depicting a Chisholm Trail cattle drive. Martin Luther King Jr. Park lies on the east bank. The Waco Riverwalk links the downtown riverfront to Baylor University and Cameron Park, which makes the bridge a useful starting point for a walking-oriented Waco itinerary.",
      "For a short visit, walk across the bridge, explore the sculptures, and enjoy the river views. Longer stays can follow the lit multi-use Riverwalk toward parks or combine the crossing with the Dr Pepper Museum and other downtown attractions. Check city notices for events and construction before counting on uninterrupted access.",
    ],
    officialUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Suspension-Bridge-Riverwalk-Area",
    managingAuthority: "City of Waco Parks and Recreation",
    directions: "Reach the west end from Indian Spring Park near North University Parks Drive or the east end from Martin Luther King Jr. Park and Bridge Street. Walk the bridge; it is not a vehicle crossing.",
    visitorFaqs: [
      { question: "Can you drive across Waco Suspension Bridge?", answer: "No. The historic bridge is a pedestrian landmark; motorists should use current street crossings and designated parking.", sourceUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Suspension-Bridge-Riverwalk-Area" },
      { question: "Does the bridge charge admission?", answer: "The bridge is a public riverfront landmark, not a ticketed admission attraction. Special events or temporary closures may change access.", sourceUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Suspension-Bridge-Riverwalk-Area" },
      { question: "What else is next to the bridge?", answer: "Indian Spring Park, Martin Luther King Jr. Park, the Branding the Brazos sculptures and the Waco Riverwalk are all connected to the immediate riverfront area.", sourceUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Suspension-Bridge-Riverwalk-Area" },
    ],
    sourceCheckedAt: "2026-10-20",
  },
  {
    id: "waco-attraction-cameron-park",
    brandId: "texasdefined",
    slug: "cameron-park-waco",
    name: "Cameron Park",
    summary: "Waco's 416-acre riverside park combines limestone bluffs, the Bosque and Brazos rivers, scenic overlooks, Jacob's Ladder, picnic areas and a roughly 26-mile multi-use trail system.",
    category: "outdoors",
    region: "prairies-lakes",
    nearestTown: "Waco",
    county: "McLennan County",
    coordinates: { lat: 31.5801, lng: -97.1531 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Slacklining_in_Cameron_Park%2C_Waco.jpg?width=1600",
      alt: "Outdoor recreation among the trees in Cameron Park, Waco",
      width: 2048,
      height: 1536,
      credit: "Tokenjoker21 · Wikimedia Commons · CC BY-SA 3.0",
    },
    bestSeason: "Spring and fall for hiking, biking and overlooks; start early in summer to reduce heat exposure.",
    entryNote: "The City of Waco lists regular park hours as 6 a.m. to midnight. Its multi-use trails are shared and differ in difficulty. Stay on signed trails, yield to pedestrians and horses as directed, carry water, and check weather and trail conditions after rain. The separate Cameron Park Zoo has its own paid admission and operating hours.",
    highlights: ["416 acres along two rivers", "Approximately 26 miles of multi-use trails", "Lovers Leap and Emmons Cliff overlooks", "Historic Jacob's Ladder staircase", "Picnic areas, playgrounds and disc golf"],
    body: [
      "Cameron Park is a defining Waco landscape: a large municipal park where the Brazos and Bosque waterways meet steep wooded limestone terrain. The City of Waco describes its current footprint as 416 acres and its designated multi-use trail system as approximately 26 miles. Unlike a single-purpose downtown lawn, it holds overlooks, bluff-top drives, paved and natural-surface routes, recreation areas and the separate Cameron Park Zoo.",
      "The park owes its public origins to the William Cameron family. The City's historical account records the dedication of the original 125-acre park in 1910 and later Cameron-family land gifts in 1917 and 1920. For visitors, that history becomes tangible at Jacob's Ladder, the unusual zigzagging stairway first associated with an early twentieth-century route up the bluff. The City counts 88 steps on the current staircase, built in 1963.",
      "A practical visit begins by choosing a specific area. Lovers Leap and Emmons Cliff are for scenic overlooks; Pecan Bottoms provides play, picnic and riverside recreation; Jacob's Ladder is a steeper, more strenuous climb; and signed trail loops range from easy strolling to technical mountain-bike terrain. The City's trail guidance requires travel on designated trails and sets clear right-of-way rules among hikers, cyclists and horseback riders.",
      "For a day around the Brazos, Cameron Park pairs naturally with the Waco Suspension Bridge and Riverwalk. The City publishes a 3.85-mile river-stroll route that connects the park to downtown via the bridge, though current construction or event closures should always be checked. Cameron Park Zoo is inside the broader park setting but has separate tickets; don't confuse free general park access with zoo admission.",
    ],
    officialUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park",
    managingAuthority: "City of Waco Parks and Recreation",
    address: "2601 N University Parks Dr, Waco, TX 76708",
    directions: "Use a specific trailhead or attraction in navigation: Lovers Leap, Jacob's Ladder, Pecan Bottoms and the zoo lead to different parking areas. Follow City of Waco trailhead signs and posted maps.",
    visitorFaqs: [
      { question: "Is Cameron Park free?", answer: "The municipal park is open for public recreation without general admission. Cameron Park Zoo is a separate paid attraction.", sourceUrl: "https://destinationwaco.org/listing/cameron-park/" },
      { question: "How big is Cameron Park?", answer: "The City of Waco lists Cameron Park as 416 acres with an approximately 26-mile multi-use trail system.", sourceUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules" },
      { question: "What time does Cameron Park close?", answer: "Regular park hours are 6 a.m. to midnight, subject to temporary restrictions or special events.", sourceUrl: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park" },
    ],
    sourceCheckedAt: "2026-10-20",
  },
  {
    id: "waco-attraction-cameron-park-zoo",
    brandId: "texasdefined",
    slug: "cameron-park-zoo",
    name: "Cameron Park Zoo",
    summary: "Cameron Park Zoo is Waco's accredited natural-habitat zoo on North Fourth Street, with regional ecosystems, wildlife exhibits, walking paths and family-oriented experiences separate from the free municipal park.",
    category: "outdoors",
    region: "prairies-lakes",
    nearestTown: "Waco",
    county: "McLennan County",
    coordinates: { lat: 31.57, lng: -97.1448 },
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cameron_park_zoo_entrance.jpg?width=1600",
      alt: "Visitor entrance to Cameron Park Zoo in Waco, Texas",
      width: 1083,
      height: 730,
      credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
    },
    bestSeason: "Year-round, with spring and fall especially comfortable for walking the outdoor zoo pathways.",
    entryNote: "The zoo sells its own timed or general admission through its official ticket site. The current visitor page lists admission categories, seasonal hours, last entry 30 minutes before closing and closures on Thanksgiving, Christmas and New Year's Day. The zoo is separate from the larger free Cameron Park; check the zoo's official details for tickets and accessibility.",
    highlights: ["AZA-accredited zoo within Cameron Park", "African Savanna and Asian Forest experiences", "Brazos River Country habitats", "Family-friendly naturalistic exhibits", "Official online admission tickets"],
    body: [
      "Cameron Park Zoo provides a wildlife-oriented stop within Waco's larger Cameron Park landscape. The City of Waco describes it as an accredited natural-habitat facility with distinct sections interpreting different habitats, including African and Asian exhibits and Brazos River Country. This makes it a very different experience from hiking the free park trails outside the zoo's gates.",
      "Planning the route matters because this is a walking visit with outdoor exposure. Families can move between regional environments and animal habitats at their own pace, pausing for shaded breaks as conditions allow. Exhibits and animal visibility are subject to weather, husbandry and maintenance; no particular sighting or encounter is guaranteed.",
      "Admission is managed by the zoo itself, which currently offers online tickets and publishes age-based rates, last-admission guidance and holiday closures. Keep the zoo's official admission and policy page open when planning; third-party Waco tour listings must not be presented as tickets for Cameron Park Zoo unless the exact product expressly includes admission.",
      "The zoo sits inside the Cameron Park recreation corridor, making it easy to pair with a short family walk, Pecan Bottoms or a drive to scenic overlooks. A longer Waco outing can include the Suspension Bridge and downtown museums, but travel time, heat and younger visitors' endurance should determine how many stops fit in one day.",
    ],
    officialUrl: "https://www.cameronparkzoo.com/plan-your-visit/hours-pricing/",
    reservationUrl: "https://www.cameronparkzoo.com/plan-your-visit/purchase-tickets/",
    managingAuthority: "Cameron Park Zoo",
    address: "1701 North 4th Street, Waco, TX 76707",
    directions: "Navigate to 1701 North 4th Street for the zoo entrance, rather than to a general Cameron Park trailhead.",
    visitorFaqs: [
      { question: "Does Cameron Park Zoo require a ticket?", answer: "Yes. The zoo charges admission independently of free Cameron Park. Tickets are available through the zoo's official online ticket page.", sourceUrl: "https://www.cameronparkzoo.com/plan-your-visit/purchase-tickets/" },
      { question: "Can I bring food and drinks?", answer: "The zoo's current visitor rules allow outside food and drinks, and encourage reusable water bottles. Check the latest rules before visiting.", sourceUrl: "https://www.cameronparkzoo.com/plan-your-visit/hours-pricing/" },
      { question: "Is the zoo accessible?", answer: "Cameron Park Zoo describes the attraction as accessible; contact the zoo directly for individual mobility or accommodation questions.", sourceUrl: "https://www.cameronparkzoo.com/plan-your-visit/hours-pricing/" },
    ],
    sourceCheckedAt: "2026-10-20",
  },
];

/**
 * Full authority-template planning layer: visit assessments, itineraries and
 * primary-source references. Independent editorial recommendations, not
 * live inventory or guarantees of access.
 */
const WACO_AUTHORITY_GUIDES: Readonly<Record<string, DestinationAuthorityGuide>> = {
  "cottonland-castle": {
    whyItMatters: "Cottonland Castle documents the evolution of Waco's architecture during the cotton-trade era and offers an unusual case study in historic residential restoration. Its tour access is more limited than an ordinary museum, making advance planning as important as the building's history.",
    assessment: {
      recommendedVisit: "Allow approximately one hour for the official ticketed Castle Tour, plus arrival time. The house is not open for an unticketed self-guided walk.",
      physicalEffort: "Moderate",
      weatherExposure: "Mostly indoors",
      planningLevel: "High",
      familyFit: "Best for visitors interested in architectural history and design who can comfortably use historic staircases; check Magnolia's guest policies for age or mobility concerns.",
      firstTimeValue: "Strong architectural add-on for Waco visitors who secure a reservation; not a spontaneous alternative to the Silos.",
    },
    itineraries: [
      { label: "The castle visit", duration: "About 1 hour", steps: ["Reserve a Magnolia Castle Tour for a specific date and time.", "Use the ticket's parking and arrival instructions.", "Explore the historic residence with the official guide."] },
      { label: "Architecture and design", duration: "Half day", steps: ["Begin with your booked Cottonland Castle visit.", "Drive to Magnolia Market at the Silos for its public grounds and shops.", "Add a downtown Waco stop such as the Dr Pepper Museum if time allows."] },
      { label: "Waco's changing cityscape", duration: "Full day", steps: ["Tour Cottonland Castle only with a confirmed reservation.", "Explore Magnolia Market and downtown Waco.", "Visit the Dr Pepper Museum and walk the Waco Suspension Bridge and Brazos riverfront."] },
    ],
    sources: [
      { label: "Texas Historical Commission — Cottonland Castle historic marker", url: "https://atlas.thc.texas.gov/Details/5309005314", scope: "Construction chronology, architecture and historic landmark designation" },
      { label: "Magnolia — current guided tours", url: "https://magnolia.com/pages/tours", scope: "Operator-controlled reservations and tour formats" },
      { label: "Magnolia Help Center — Castle Tour access", url: "https://help.magnolia.com/hc/en-us/articles/31170532641940-About-Magnolia-Castle-Tours", scope: "Ticket rules, private property, stairs and accessibility" },
    ],
  },
  "waco-suspension-bridge": {
    whyItMatters: "The 1870 bridge turned a Brazos River crossing into an engineering and commerce landmark and still visibly connects Waco's historic downtown with its public riverfront. Its setting makes infrastructure history approachable without requiring a ticket.",
    assessment: {
      recommendedVisit: "Allow 20–40 minutes for the bridge and cattle-drive sculptures; a riverfront walk or nearby museum can extend the stop to a half day.",
      physicalEffort: "Low to moderate",
      weatherExposure: "Fully outdoors",
      planningLevel: "Low",
      familyFit: "Good for most ages as a short outdoor stop, but supervise children near water and check current pedestrian access.",
      firstTimeValue: "An easy first stop for understanding Waco's river geography and historic transport role.",
    },
    itineraries: [
      { label: "Bridge and sculptures", duration: "20–40 minutes", steps: ["Start at Indian Spring Park.", "See the Branding the Brazos cattle-drive sculptures.", "Cross the historic pedestrian bridge and return when ready."] },
      { label: "Walk the river", duration: "1–2 hours", steps: ["Visit the bridge and its park entrances.", "Follow an open section of the Waco Riverwalk.", "Leave time for river views and shaded rest stops."] },
      { label: "Downtown and the Brazos", duration: "Half day", steps: ["Begin at the Waco Suspension Bridge.", "Explore the nearby riverfront and downtown blocks.", "Pair the walk with the Dr Pepper Museum or Texas Ranger Hall of Fame and Museum."] },
    ],
    sources: [
      { label: "City of Waco — Suspension Bridge and Riverwalk", url: "https://www.waco-texas.com/Departments/Parks-Recreation/Suspension-Bridge-Riverwalk-Area", scope: "Public access, bridge history and riverfront destinations" },
      { label: "National Park Service — Waco Suspension Bridge", url: "https://www.nps.gov/places/waco-suspension-bridge.htm", scope: "Cattle-trail history and interpretive background" },
    ],
  },
  "cameron-park-waco": {
    whyItMatters: "Cameron Park preserves a substantial wooded river corridor and bluff landscape close to central Waco. Its scenic overlooks, public trail system and longstanding Cameron-family gifts connect outdoor recreation to the city's civic history.",
    assessment: {
      recommendedVisit: "Allow 45–90 minutes for an overlook and short walk, or several hours for signed trails, recreation and picnic stops.",
      physicalEffort: "Moderate to high",
      weatherExposure: "Fully outdoors",
      planningLevel: "Moderate",
      familyFit: "Play areas and shorter walks fit family visits; technical trails and Jacob's Ladder require age-appropriate mobility and supervision.",
      firstTimeValue: "The best Waco option among these seven for bluffs, woodland trails and wide Brazos views without paying general admission.",
    },
    itineraries: [
      { label: "Scenic overlooks", duration: "45–90 minutes", steps: ["Choose a designated viewpoint such as Lovers Leap or Emmons Cliff.", "Use posted parking and trailhead signs.", "Add a short signed walk suitable for your group's ability."] },
      { label: "Trails and rivers", duration: "2–3 hours", steps: ["Choose a marked walking or biking route using the city's trail map.", "Bring water and allow for hills and uneven surfaces.", "Finish at a picnic or river-view stop; avoid closed or muddy trails."] },
      { label: "Outdoor Waco", duration: "Half to full day", steps: ["Begin with overlooks or a Cameron Park hike.", "Optionally visit Cameron Park Zoo with separate admission.", "Explore the Waco Suspension Bridge and Riverwalk farther downtown."] },
    ],
    sources: [
      { label: "City of Waco — Cameron Park", url: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park", scope: "Public park history, hours and recreational areas" },
      { label: "City of Waco — Trail rules", url: "https://www.waco-texas.com/Departments/Parks-Recreation/Cameron-Park/Cameron-Park-Trail-System-Rules", scope: "Trail safety, route rules and multi-use guidance" },
    ],
  },
  "cameron-park-zoo": {
    whyItMatters: "Cameron Park Zoo gives Central Texas families a zoological destination within Waco's largest urban park. Its habitat-based exhibits create a natural pairing with the surrounding free park, while admission, visitor rules and animal care remain independently managed by the zoo.",
    assessment: {
      recommendedVisit: "Allow 2–3 hours for a comfortable general visit, adjusting for animal activity, children's pace and seasonal heat.",
      physicalEffort: "Low to moderate",
      weatherExposure: "Mostly outdoors",
      planningLevel: "Moderate",
      familyFit: "A good family-oriented walking attraction with animal habitats; confirm accessibility, weather and any age-specific program rules before visiting.",
      firstTimeValue: "The strongest wildlife-focused choice on this list, especially for families with children.",
    },
    itineraries: [
      { label: "Zoo highlights", duration: "2 hours", steps: ["Check zoo hours and purchase admission through the operator.", "Visit priority habitat areas at a comfortable pace.", "Leave room for breaks and changing animal visibility."] },
      { label: "Family visit", duration: "3–4 hours", steps: ["Arrive early on warm days and begin with outdoor habitats.", "Follow the zoo map through wildlife sections.", "Use rest areas and revisit popular habitats as time permits."] },
      { label: "Wildlife and Waco", duration: "Half to full day", steps: ["Visit Cameron Park Zoo with separately obtained admission.", "Add a short walk or lookout in adjacent free Cameron Park.", "Finish with the Waco Suspension Bridge and its riverfront parks if energy allows."] },
    ],
    sources: [
      { label: "Cameron Park Zoo — visiting information", url: "https://www.cameronparkzoo.com/plan-your-visit/hours-pricing/", scope: "Admission, seasonal hours, restrictions and visitor services" },
      { label: "Cameron Park Zoo — official ticketing", url: "https://www.cameronparkzoo.com/plan-your-visit/purchase-tickets/", scope: "Official ticket purchase and current options" },
    ],
  },
};

export const wacoViatorAttractionDestinations: Destination[] = wacoViatorAttractionBaseDestinations.map((entry) => ({
  ...entry,
  authorityGuide: WACO_AUTHORITY_GUIDES[entry.slug],
}));
