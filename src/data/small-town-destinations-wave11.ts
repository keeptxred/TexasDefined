import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-02";

export const smallTownWave11Destinations: Destination[] = [
  {
    id: "small-town-leakey", brandId: "texasdefined", slug: "leakey", name: "Leakey",
    summary: "Leakey is the Real County seat and practical hub of the Frio Canyon, pairing a historic limestone courthouse with Frio River recreation, scenic Hill Country drives, nearby Garner State Park and access to the Lost Maples and Three Twisted Sisters landscape.",
    category: "small-towns", region: "hill-country", nearestTown: "Leakey", county: "Real",
    coordinates: { lat: 29.7288, lng: -99.7615 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Real%20courthouse.jpg?width=1600", alt: "Real County Courthouse in Leakey, Texas", width: 2000, height: 1293, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Spring through early fall for Frio River trips; fall for foliage and scenic driving; winter for quieter courthouse-town and canyon exploration",
    entryNote: "Frio River levels, swimming conditions and park access can change quickly with rainfall and drought. Peak summer weekends are busy, and Lost Maples/Garner access can require advance planning. Check current park, river and road conditions before travel.",
    highlights: ["Frio Canyon", "Frio River", "Real County Courthouse", "Garner State Park access", "Three Twisted Sisters", "Lost Maples side trips"],
    body: [
      "Leakey anchors the Frio Canyon, a steep-sided Hill Country landscape that the local chamber describes as the Land of 1100 Springs. The town itself is compact, with the 1918 Real County Courthouse providing a strong historic center for a region better known for water and scenery.",
      "The Frio River is the dominant warm-weather draw, while nearby Garner State Park, Lost Maples State Natural Area and the Three Twisted Sisters road network expand the trip into swimming, hiking, cycling, foliage and scenic-driving territory. Leakey also supplies lodging, food and services for travelers spreading those experiences across several days.",
      "A first visit works best when the town is treated as a base rather than a single attraction. Pair a short courthouse/downtown stop with a river block, then reserve a second block for a state park or scenic drive instead of attempting every canyon attraction in one day."
    ],
    officialUrl: "https://www.friocanyonchamber.com/", sourceCheckedAt,
    directions: "Leakey sits at US 83 and Ranch Road 337 in Real County, north of Uvalde and west of Bandera. The courthouse square is the easiest in-town orientation point for Frio Canyon travel.",
    accessibilityNotes: "The courthouse area is relatively low effort, but river banks, swimming access and natural-area trails vary substantially in surface and grade. Confirm accessibility and water-entry conditions at each park or outfitter before travel.",
    areaGuide: {
      intro: "Use Leakey as the service and history hub for a Frio Canyon itinerary, then choose one major outdoor direction—river, state park or scenic drive—for the rest of the day.",
      nearbyAttractions: [{ name: "Frio River", description: "The canyon's signature recreation corridor for swimming, paddling and riverside stays when water conditions allow." }, { name: "Garner State Park", description: "A major nearby Frio River park with swimming, hiking and seasonal high demand." }],
      foodAndDrink: [{ name: "Leakey and Frio Canyon", description: "Local restaurants and seasonal visitor businesses serve the river-and-road-trip corridor; verify hours outside peak periods." }],
      lodging: [{ name: "Frio Canyon cabins and rentals", description: "Leakey, Concan and Rio Frio provide the region's main base-camp options for multi-day river and park trips." }],
      neighborhoods: [{ name: "Courthouse square and central Leakey", description: "The compact civic and service center of the canyon." }],
      familyStops: [{ name: "Frio River and Garner State Park", description: "Strong family choices when current water, heat and crowd conditions are appropriate." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Leakey with Bandera, Utopia and the wider western Hill Country.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build a Frio Canyon river-and-scenic-drive itinerary around Leakey.", href: "/explore/trip-planner?destination=leakey" }]
    },
    authorityGuide: {
      whyItMatters: "Leakey gives TexasDefined a first-class Frio Canyon hub connecting small-town heritage, river recreation, state parks and one of the state's most distinctive scenic-road networks.",
      assessment: { recommendedVisit: "One to three days depending on river and park plans.", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Moderate", familyFit: "Excellent for outdoor-oriented families when river conditions are suitable.", firstTimeValue: "Very high for Hill Country river, scenic-drive and fall-color travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["See the courthouse square", "Choose a Frio River access block", "Finish with a short scenic drive"] }, { label: "Full day", duration: "8-10 hours", steps: ["Start in Leakey", "Spend the main block on the Frio or at Garner", "Return for food", "Use cooler evening hours for a scenic road segment"] }, { label: "Weekend", duration: "2 nights", steps: ["Base in the Frio Canyon", "Give one day to river recreation", "Give the second to Lost Maples, Garner or the Three Twisted Sisters"] }],
      sources: [{ label: "Frio Canyon Chamber of Commerce", url: "https://www.friocanyonchamber.com/", scope: "Current visitor positioning, lodging, businesses and Frio Canyon tourism" }, { label: "Frio Canyon Chamber history", url: "https://www.friocanyonchamber.com/about-us", scope: "Regional attractions, outdoor activities, fall color and Three Twisted Sisters context" }]
    }, featured: true
  },
  {
    id: "small-town-rocksprings", brandId: "texasdefined", slug: "rocksprings", name: "Rocksprings",
    summary: "Rocksprings is an Edwards Plateau courthouse town best known as the required departure point for Devil's Sinkhole State Natural Area, where reservation-only tours lead to a National Natural Landmark cave and one of Texas' largest seasonal Mexican free-tailed bat colonies.",
    category: "small-towns", region: "hill-country", nearestTown: "Rocksprings", county: "Edwards",
    coordinates: { lat: 30.0155, lng: -100.2054 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Edwards%20county%20tx%20courthouse.jpg?width=1600", alt: "Edwards County Courthouse in Rocksprings, Texas", width: 1506, height: 1030, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Late spring through early fall for seasonal bat flights; fall through spring for quieter plateau drives and courthouse-town exploration",
    entryNote: "Devil's Sinkhole State Natural Area is not open for casual drop-in access. Reservations are required, tours begin at the visitor center on the Rocksprings square, and bat emergence is seasonal and never guaranteed. Check TPWD alerts, tour schedules and public-hunt closures before travel.",
    highlights: ["Devil's Sinkhole visitor center", "seasonal bat flights", "Edwards County Courthouse", "National Natural Landmark cave", "Edwards Plateau scenery", "birding and nature tours"],
    body: [
      "Rocksprings is a small Edwards Plateau town whose courthouse square doubles as the visitor gateway to a major natural spectacle. The historic Edwards County Courthouse gives the town a visible civic center, while the Devil's Sinkhole visitor center on the square turns Rocksprings into the required starting point for access to the protected natural area.",
      "Texas Parks and Wildlife describes Devil's Sinkhole as a National Natural Landmark with a roughly 50-foot-wide shaft dropping about 140 feet into a cavern that reaches roughly 350 feet deep. Around three million Mexican free-tailed bats may use the cave in summer, with reservation-only evening flights, nature walks and birding programs offered through scheduled tours.",
      "The key planning distinction is that Rocksprings is the base and check-in point, not an open-access cave destination. Reserve first, arrive at the visitor center on time, and build courthouse-square or scenic-plateau time around the scheduled tour rather than assuming the natural area can be visited independently."
    ],
    officialUrl: "https://tpwd.texas.gov/state-parks/devils-sinkhole", sourceCheckedAt,
    directions: "Rocksprings sits at US 377 and State Highway 55 in Edwards County. Devil's Sinkhole tours depart from the visitor center at 101 N. Sweeten St. on the courthouse square; the natural area itself lies northeast of town.",
    accessibilityNotes: "TPWD identifies the bat-viewing platform as wheelchair-accessible, but tours involve transportation and outdoor conditions. Confirm current accommodations directly when reserving; courthouse-square walking is the lower-effort alternative.",
    areaGuide: {
      intro: "Plan Rocksprings around the scheduled Devil's Sinkhole tour, using the courthouse square and visitor center as the orientation point before exploring the surrounding plateau.",
      nearbyAttractions: [{ name: "Devil's Sinkhole State Natural Area", description: "Reservation-only cave, bat-flight, birding and nature programs reached through tours departing from Rocksprings." }, { name: "Edwards County Courthouse", description: "The historic courthouse anchors the same square used by the Devil's Sinkhole visitor center." }],
      foodAndDrink: [{ name: "Central Rocksprings", description: "Services are rural and limited; confirm meal hours before a timed tour." }],
      lodging: [{ name: "Rocksprings and Edwards County", description: "Local lodging supports early or late tour times and longer Edwards Plateau routes." }],
      neighborhoods: [{ name: "Courthouse square", description: "The visitor, civic and tour-departure center of town." }],
      familyStops: [{ name: "Devil's Sinkhole visitor center", description: "A practical family orientation stop before a reserved nature or bat tour." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Rocksprings with the western Hill Country and Edwards Plateau road network.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build a bat, cave and plateau itinerary around Rocksprings.", href: "/explore/trip-planner?destination=rocksprings" }]
    },
    authorityGuide: {
      whyItMatters: "Rocksprings gives TexasDefined a distinctive conservation-and-wildlife town node where the visitor experience is inseparable from a protected cave, seasonal bat colony and reservation-based access model.",
      assessment: { recommendedVisit: "Half to full day; one night for early/late tours or broader plateau travel.", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "High", familyFit: "Strong for wildlife-focused families who can follow scheduled tour logistics.", firstTimeValue: "Very high during bat season; strong year-round for natural-history travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Check in at the visitor center", "See the courthouse square", "Take a reserved Devil's Sinkhole program"] }, { label: "Full day", duration: "7-9 hours", steps: ["Explore the square", "Break for food", "Take a day nature/birding program or scenic drive", "Finish with a reserved evening bat flight in season"] }, { label: "Overnight", duration: "1 night", steps: ["Use the first day for the town and an evening tour", "Stay locally", "Continue through the Edwards Plateau the next morning"] }],
      sources: [{ label: "Texas Parks and Wildlife — Devil's Sinkhole", url: "https://tpwd.texas.gov/state-parks/devils-sinkhole", scope: "Current tour rules, bat season, accessibility, visitor-center location and natural-area facts" }, { label: "TPWD Devil's Sinkhole directions", url: "https://tpwd.texas.gov/state-parks/devils-sinkhole/map", scope: "Current visitor-center address, road access and reservation requirements" }]
    }, featured: true
  },
  {
    id: "small-town-san-saba", brandId: "texasdefined", slug: "san-saba", name: "San Saba",
    summary: "San Saba is a northern Edwards Plateau town known as the Pecan Capital of the World, combining a historic downtown, city-run visitor center, pecan heritage, Mill Pond Park, San Saba River green space, suspension bridges and an unusually strong municipal parks network.",
    category: "small-towns", region: "hill-country", nearestTown: "San Saba", county: "San Saba",
    coordinates: { lat: 31.1957, lng: -98.7173 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/San%20Saba%20Texas%20City%20Hall.jpg?width=1600", alt: "Historic City Hall in San Saba, Texas", width: 2411, height: 1356, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown, pecan-country and parks; warm months for water-oriented recreation when flood recovery and heat conditions allow",
    entryNote: "San Saba's park system has been affected by 2025 flooding. As of the latest city update, the lower San Saba River Nature Park and Risien Park have closures tied to debris and flood damage while upper walking areas remain available. Check city alerts before planning river or park access.",
    highlights: ["historic downtown walking tour", "pecan heritage", "Mill Pond Park", "San Saba River Nature Park", "suspension bridges", "San Saba Visitor Center"],
    body: [
      "San Saba presents itself as the Pecan Capital of the World and backs that identity with a historic downtown, long-standing pecan culture and a city visitor center that distributes a mapped walking tour of the downtown district. The courthouse-square and High Street area make an easy first orientation for the town's architecture and local businesses.",
      "The municipal park system is a major second layer. Mill Pond Park combines water features, footbridges, recreation and the county museum, while San Saba River Nature Park normally adds a roughly 1.75-mile greenbelt trail, fishing, birding and historical interpretation. Risien Park connects the landscape directly to E.E. Risien and the local pecan industry.",
      "Current flood recovery matters to trip planning. Visitors should use the city visitor center and alerts to confirm which river and park areas are open, then build a flexible itinerary around downtown, Mill Pond Park, pecan stops and any accessible river segments rather than relying on a fixed outdoor route."
    ],
    officialUrl: "https://sansabatexas.com/", sourceCheckedAt,
    directions: "San Saba is the San Saba County seat at US 190 and State Highway 16, northwest of Lampasas. The visitor center at 113 S. High Street is the best first stop for walking-tour and current-attraction information.",
    accessibilityNotes: "Downtown and visitor-center stops are lower effort, while park trails, river edges and flood-affected areas vary. Confirm current closures and accessible routes with the city before relying on river or park facilities.",
    areaGuide: {
      intro: "Start at the city visitor center for the historic walking-tour map and current flood/park information, then combine downtown with whichever municipal outdoor areas are confirmed open.",
      nearbyAttractions: [{ name: "Historic Downtown Walking Tour", description: "A city-supported self-guided route with historic photos, narratives and a map available through the visitor center." }, { name: "Mill Pond Park", description: "A landscaped municipal park with water features, footbridges, recreation facilities and the San Saba County Museum." }],
      foodAndDrink: [{ name: "Historic downtown San Saba", description: "Local restaurants, shops and pecan-oriented businesses fit naturally into the walking-tour core." }],
      lodging: [{ name: "San Saba", description: "A practical base for downtown, parks, pecan-country drives and broader central-Texas trips." }],
      neighborhoods: [{ name: "High Street and historic downtown", description: "The visitor-center, shopping and heritage core." }],
      familyStops: [{ name: "Mill Pond Park", description: "A flexible family stop with playscape, splash features and picnic space when facilities are open." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect San Saba with the northern Hill Country and Edwards Plateau.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build a pecan, history and parks itinerary around San Saba.", href: "/explore/trip-planner?destination=san-saba" }]
    },
    authorityGuide: {
      whyItMatters: "San Saba adds a distinctive pecan-and-river town whose visitor experience is unusually well supported by city-run walking-tour, park and visitor-center infrastructure.",
      assessment: { recommendedVisit: "Half to full day; one night for a slower parks-and-history trip.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong, especially when park facilities are fully open.", firstTimeValue: "High for small-town history, parks and food-agriculture travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Start at the visitor center", "Walk part of historic downtown", "Add Mill Pond Park or another confirmed-open outdoor stop"] }, { label: "Full day", duration: "7-9 hours", steps: ["Use the walking tour in the morning", "Break for lunch and pecan shopping", "Visit the museum or Mill Pond Park", "Add a river or bridge stop only if current access is open"] }, { label: "Overnight", duration: "1 night", steps: ["Give downtown and parks a relaxed first day", "Use the next morning for a scenic or pecan-country drive", "Continue through the northern Hill Country"] }],
      sources: [{ label: "City of San Saba", url: "https://sansabatexas.com/", scope: "Official visitor positioning, city alerts and visitor-center information" }, { label: "San Saba local parks and recreation", url: "https://sansabatexas.com/about-san-saba/local-parks-recreation/", scope: "Municipal park amenities, river trail and pecan-history context" }, { label: "San Saba local attractions", url: "https://sansabatexas.com/category/local-attractions/", scope: "Current flood-related closures and attraction updates" }, { label: "Historic Downtown Walking Tour", url: "https://sansabatexas.com/historic-downtown-tour/", scope: "Current city walking-tour guidance" }]
    }, featured: true
  },
  {
    id: "small-town-clarksville", brandId: "texasdefined", slug: "clarksville", name: "Clarksville",
    summary: "Clarksville is a Red River County Main Street town older than the Republic of Texas, centered on an 1885 courthouse, preserved downtown square, Old Jail Museum, historic creek walk, early churches, antiques and nearby lake-and-nature recreation in Northeast Texas.",
    category: "small-towns", region: "piney-woods", nearestTown: "Clarksville", county: "Red River",
    coordinates: { lat: 33.6107, lng: -95.0527 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Clarksville%20June%202018%2032%20%28Red%20River%20County%20Courthouse%29.jpg?width=1600", alt: "Red River County Courthouse in Clarksville, Texas", width: 6000, height: 4000, credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown walking and nature trails; spring and fall for community events and comfortable Northeast Texas outdoor time",
    entryNote: "Clarksville's museums, courthouse tours and small businesses may have limited or event-based hours. Verify individual access before arrival, especially if the Old Jail Museum or courthouse interior is a priority, and plan creek/nature walking around weather and trail conditions.",
    highlights: ["Red River County Courthouse", "historic downtown square", "Old Jail Museum", "Historic Creek Walk", "First Presbyterian Church", "Langford Lake and nature trails"],
    body: [
      "Clarksville's city history emphasizes preservation: it is older than the State of Texas, became a Texas Main Street community and retains a courthouse-square business district where historic buildings have been adapted for shops, galleries and local services. The restored 1885 Red River County Courthouse is the visual anchor.",
      "Within walking distance, the Old Jail Museum and Historic Creek Walk extend the story beyond the square. The route links historic sites along Delaware Creek, including First Presbyterian Church, whose congregation dates to 1833, and an early single-lane bridge. This compact pattern makes Clarksville unusually walkable for a small Northeast Texas history stop.",
      "Nature and recreation broaden the visit. The city highlights Langford Lake, a city-lake nature trail and the Martha Lennox Nature Preserve north of town, allowing a first-time itinerary to pair courthouse architecture and museums with a quieter outdoor block rather than treating Clarksville only as an antiques stop."
    ],
    officialUrl: "https://clarksvilletx.com/", sourceCheckedAt,
    directions: "Clarksville is the Red River County seat on US 82 and State Highway 37 in Northeast Texas, east of Paris and west of Texarkana. The historic square and courthouse provide the simplest visitor orientation point.",
    accessibilityNotes: "The downtown square is the lowest-effort portion of the visit. Historic buildings, museum interiors, creek paths and nature trails vary in grade and surface; confirm access with each site before travel.",
    areaGuide: {
      intro: "Use the courthouse square as the anchor, then extend the walk to the Old Jail Museum and Historic Creek Walk before choosing a lake or nature-preserve side block.",
      nearbyAttractions: [{ name: "Red River County Courthouse", description: "The restored 1885 courthouse anchors Clarksville's historic downtown and preservation identity." }, { name: "Historic Creek Walk", description: "A scenic Delaware Creek route linking early churches, bridges and other historic sites near downtown." }],
      foodAndDrink: [{ name: "Historic square and US 82 corridor", description: "Local restaurants and small businesses provide practical breaks between heritage stops." }],
      lodging: [{ name: "Clarksville and Red River County", description: "Useful for travelers building a slower Northeast Texas history-and-nature route." }],
      neighborhoods: [{ name: "Historic downtown square", description: "The courthouse, antiques, civic history and Main Street core." }],
      familyStops: [{ name: "Langford Lake", description: "Fishing, picnicking and nature-trail options close to town when conditions are suitable." }],
      sideTrips: [{ name: "Piney Woods region", description: "Connect Clarksville with Northeast Texas lakes, forests and courthouse towns.", href: "/explore/region/piney-woods" }, { name: "Texas Trip Planner", description: "Build a courthouse, creek-walk and nature itinerary around Clarksville.", href: "/explore/trip-planner?destination=clarksville" }]
    },
    authorityGuide: {
      whyItMatters: "Clarksville gives TexasDefined an early-Texas, Northeast Texas preservation node with enough downtown history, museums and nature access to support a full destination page rather than a passing mention.",
      assessment: { recommendedVisit: "Half to full day; one night when pairing Clarksville with wider Red River County exploration.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Good for history-oriented families, with lake and nature alternatives for outdoor time.", firstTimeValue: "High for courthouse, Main Street and early-Texas-history travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the courthouse square", "Visit the Old Jail Museum if open", "Follow part of the Historic Creek Walk"] }, { label: "Full day", duration: "7-9 hours", steps: ["Begin with courthouse and downtown history", "Break for lunch", "Add the museum/creek walk", "Finish at Langford Lake or a nearby nature site"] }, { label: "Overnight", duration: "1 night", steps: ["Give downtown and historic sites an unhurried first day", "Use the next morning for lake or preserve time", "Continue through Northeast Texas"] }],
      sources: [{ label: "City of Clarksville", url: "https://clarksvilletx.com/", scope: "Official city visitor history, Main Street attractions, museums, creek walk, lake and nature context" }]
    }, featured: true
  }
];
