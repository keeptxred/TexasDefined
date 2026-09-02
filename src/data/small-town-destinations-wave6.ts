import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-02";

export const smallTownWave6Destinations: Destination[] = [
  {
    id: "small-town-jefferson", brandId: "texasdefined", slug: "jefferson", name: "Jefferson",
    summary: "Jefferson is a historic Cypress-bayou riverport town in Northeast Texas where a large nineteenth-century district, brick streets, museums, walking tours and access to the Big Cypress watershed make a compact Piney Woods weekend destination.",
    category: "small-towns", region: "piney-woods", nearestTown: "Jefferson", county: "Marion",
    coordinates: { lat: 32.7574, lng: -94.3452 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Jefferson%20October%202016%2009%20(Jefferson%20Hotel).jpg?width=1600", alt: "Historic Jefferson Hotel in the Jefferson Historic District, Texas", width: 6000, height: 4000, credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for historic walking and bayou outings; summer works best with early outdoor time and indoor museum breaks",
    entryNote: "Museum, tour, rail and boat schedules vary by day and season. Confirm current operating hours before building a trip around a specific guided attraction, and check weather before bayou or trail plans.",
    highlights: ["Jefferson Historic District", "Big Cypress Bayou", "historic walking tours", "Jefferson Historical Museum", "riverport history", "Piney Woods"],
    body: [
      "Jefferson grew as an inland riverport connected through Big Cypress Bayou and Caddo Lake to the Red River system. That commercial era left an unusually dense collection of nineteenth-century buildings, homes and civic landmarks that still define the visitor experience.",
      "The strongest first visit combines a walk through the historic district with a museum or guided history stop, then adds the bayou landscape that explains why Jefferson developed here in the first place. The town's architecture is more meaningful when paired with its transportation and river history rather than treated as scenery alone.",
      "Jefferson is compact enough for a day trip, but an overnight stay improves the experience because many attractions operate on limited schedules and the surrounding Cypress-bayou landscape deserves its own block. Event weekends can materially change parking, crowds and lodging availability."
    ],
    officialUrl: "https://visitjeffersontexas.com/", sourceCheckedAt,
    directions: "Jefferson is in Marion County in Northeast Texas, north of Marshall and near the Louisiana border. Downtown and the historic district form the main walkable visitor core.",
    accessibilityNotes: "Historic sidewalks, older buildings and tour properties vary in accessibility. Confirm entrances and tour requirements directly with individual attractions; outdoor trails and waterfront areas may have uneven surfaces.",
    areaGuide: {
      intro: "Start with the historic district, then connect the architecture to Jefferson's riverport story and the surrounding Cypress-bayou landscape.",
      nearbyAttractions: [{ name: "Jefferson Historic District", description: "The primary walking zone for preserved commercial buildings, homes and civic architecture." }, { name: "Port Jefferson History and Nature Center", description: "Trails and interpretation that connect town history with the bayou landscape." }],
      foodAndDrink: [{ name: "Historic downtown Jefferson", description: "Local cafes and restaurants are concentrated around the walkable historic center." }],
      lodging: [{ name: "Historic district stays", description: "Best for travelers who want to walk to downtown attractions and evening dining." }],
      neighborhoods: [{ name: "Downtown and historic district", description: "Jefferson's main concentration of preserved architecture, museums, shops and visitor services." }],
      familyStops: [{ name: "Jefferson Historical Museum", description: "A useful indoor orientation to local history before walking the district." }],
      sideTrips: [{ name: "Piney Woods region", description: "Connect Jefferson with lakes, forests and historic towns across Northeast Texas.", href: "/explore/region/piney-woods" }, { name: "Texas Trip Planner", description: "Build a Northeast Texas history-and-nature route around Jefferson.", href: "/explore/trip-planner?destination=jefferson" }]
    },
    authorityGuide: {
      whyItMatters: "Jefferson preserves one of Texas's clearest historic riverport landscapes and gives Piney Woods travel a strong architecture, transportation and local-history anchor.",
      assessment: { recommendedVisit: "One full day; one night for museums, walking tours and a separate bayou or nature block.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong for history-focused families when walking is balanced with museum and nature stops.", firstTimeValue: "Very high for historic-town travelers and strong as part of a Northeast Texas road trip." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the historic district", "Visit one museum or guided attraction", "Finish with a bayou or nature stop"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin downtown", "Add a museum or house tour", "Break for lunch", "Use the afternoon for riverport history and trails"] }, { label: "Overnight", duration: "1 night", steps: ["Give downtown a full first day", "Use the next morning for a scheduled tour or nature outing", "Continue into the Piney Woods region"] }],
      sources: [{ label: "Visit Jefferson Texas", url: "https://visitjeffersontexas.com/", scope: "Official visitor planning and current destination information" }, { label: "Visit Jefferson attractions", url: "https://visitjeffersontexas.com/attractions", scope: "Current attractions, museums, parks and tours" }]
    }, featured: true
  },
  {
    id: "small-town-marshall", brandId: "texasdefined", slug: "marshall", name: "Marshall",
    summary: "Marshall is an East Texas courthouse city with a monumental historic square, Civil War and civil-rights history, the birthplace-of-boogie-woogie story, museums, parks and a strong annual holiday tradition.",
    category: "small-towns", region: "piney-woods", nearestTown: "Marshall", county: "Harrison",
    coordinates: { lat: 32.5449, lng: -94.3674 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/HarrisonCountyCourthouse1%20(1%20of%201).jpg?width=1600", alt: "Historic Harrison County Courthouse in Marshall, Texas", width: 4604, height: 3072, credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for walking; late November and December for Wonderland of Lights when current event dates are confirmed",
    entryNote: "Festival and holiday periods can change parking, traffic and attraction hours. Confirm current museum schedules and event dates before travel.",
    highlights: ["Harrison County Courthouse", "historic square", "boogie-woogie history", "East Texas history", "Wonderland of Lights", "Piney Woods"],
    body: [
      "Marshall's historic courthouse square gives the city an immediate architectural center, but its significance extends into music, education, Civil War history and the long African American history of East Texas.",
      "Local interpretation connects Marshall to the development of boogie-woogie piano traditions and to a broader cultural story that is easy to miss on a simple courthouse stop. Museums, historic homes and the square make a more complete itinerary than any one landmark.",
      "A full day works well outside major events. During Wonderland of Lights and other festivals, treat Marshall as an event destination and plan parking, lodging and dining earlier than usual."
    ],
    officialUrl: "https://visitmarshalltexas.com/", sourceCheckedAt,
    directions: "Marshall is the Harrison County seat on I-20 in Northeast Texas, east of Longview and west of Shreveport. The historic courthouse square is the best first orientation point.",
    accessibilityNotes: "The courthouse-square area is relatively compact, but older museums and historic properties vary. Confirm accessible entrances and event accommodations directly with venues.",
    areaGuide: {
      intro: "Use the courthouse square as the anchor, then add music, museum and historic-home stops to understand Marshall beyond its architecture.",
      nearbyAttractions: [{ name: "Historic Harrison County Courthouse", description: "The visual and civic centerpiece of Marshall's downtown square." }, { name: "Starr Family Home State Historic Site", description: "A major historic-property stop for understanding nineteenth-century Marshall and East Texas civic life." }],
      foodAndDrink: [{ name: "Downtown Marshall", description: "Local dining near the square fits naturally between museum and history stops." }],
      lodging: [{ name: "Central Marshall", description: "Best for downtown history and seasonal event access." }],
      neighborhoods: [{ name: "Courthouse square", description: "Marshall's main walkable heritage zone and event center." }],
      familyStops: [{ name: "Downtown square and parks", description: "Easy visual history and open-space breaks between indoor attractions." }],
      sideTrips: [{ name: "Piney Woods region", description: "Extend the trip through Northeast Texas forests, lakes and historic towns.", href: "/explore/region/piney-woods" }, { name: "Jefferson", description: "Pair Marshall with the nearby historic riverport town.", href: "/destination/jefferson" }]
    },
    authorityGuide: {
      whyItMatters: "Marshall combines one of East Texas's strongest courthouse landscapes with music, education, African American history and seasonal cultural traditions.",
      assessment: { recommendedVisit: "One full day; one night during major events or when pairing with Jefferson.", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Low to moderate", familyFit: "Strong for families who want a mix of architecture, parks and cultural history.", firstTimeValue: "High for Northeast Texas history and especially strong when paired with Jefferson." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Start at the courthouse square", "Choose one museum or historic site", "Add a music-history stop"] }, { label: "Full day", duration: "8-10 hours", steps: ["Walk downtown", "Visit a major historic property", "Break for lunch", "Add music or cultural history"] }, { label: "Overnight", duration: "1 night", steps: ["Give Marshall a full day", "Use the next morning for a seasonal event or second museum", "Continue to Jefferson"] }],
      sources: [{ label: "Visit Marshall Texas", url: "https://visitmarshalltexas.com/", scope: "Official destination planning and current visitor information" }, { label: "Visit Marshall attractions", url: "https://visitmarshalltexas.com/area-attractions/", scope: "Current attractions and regional visitor planning" }]
    }, featured: true
  },
  {
    id: "small-town-mineola", brandId: "texasdefined", slug: "mineola", name: "Mineola",
    summary: "Mineola is a walkable Wood County railroad town with a National Register downtown district and a city-owned nature preserve on the Sabine River offering birding, hiking, mountain biking, equestrian trails, fishing and camping.",
    category: "small-towns", region: "piney-woods", nearestTown: "Mineola", county: "Wood",
    coordinates: { lat: 32.6632, lng: -95.4883 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown%20Mineola%205%20(1%20of%201).jpg?width=1600", alt: "Historic downtown buildings in Mineola, Texas", width: 4963, height: 3250, credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown walking and preserve trails; early mornings are best for birding and summer outdoor activity",
    entryNote: "The nature preserve is a large outdoor property with multiple entrances and activity-specific areas. Check current hours, trail conditions, weather and the correct entrance before arrival.",
    highlights: ["Mineola Downtown Historic District", "Mineola Nature Preserve", "birding", "railroad-town history", "Sabine River", "mountain biking"],
    body: [
      "Mineola's downtown retains the form of an East Texas railroad and commercial center, with a historic district that is easy to explore on foot and local businesses that keep the center active rather than museum-like.",
      "The city's biggest differentiator is the Mineola Nature Preserve on the Sabine River. Its large acreage supports birding, hiking, mountain biking, equestrian use, fishing, disc golf and camping, giving the town a substantial outdoor counterpart to downtown history.",
      "A useful first trip splits time deliberately: downtown for architecture, food and local history, then a separate block at the preserve with an activity chosen in advance. That prevents a large outdoor site from becoming an unfocused drive-through stop."
    ],
    officialUrl: "https://www.mineola.com/", sourceCheckedAt,
    directions: "Mineola is in Wood County at US 69 and US 80 in East Texas. Downtown and the Mineola Nature Preserve south of town are the two primary visitor anchors.",
    accessibilityNotes: "Downtown conditions vary by block. The preserve has multiple facilities and trail types; confirm accessible parking, routes and activity areas directly with the preserve before travel.",
    areaGuide: {
      intro: "Pair the historic downtown with one deliberately chosen preserve activity rather than trying to sample every outdoor option in a single visit.",
      nearbyAttractions: [{ name: "Mineola Nature Preserve", description: "A city-owned preserve on the Sabine River with birding, trails, equestrian use, fishing, disc golf and camping." }, { name: "Mineola Downtown Historic District", description: "The walkable historic commercial core with preserved architecture and local businesses." }],
      foodAndDrink: [{ name: "Downtown Mineola", description: "The easiest place to combine local dining with historic-district exploration." }],
      lodging: [{ name: "Mineola and Wood County", description: "Useful for an early preserve start or a broader East Texas road trip." }],
      neighborhoods: [{ name: "Historic downtown", description: "Mineola's compact commercial and architectural center." }],
      familyStops: [{ name: "Mineola Nature Preserve", description: "Choose short walks, fishing, playground or wildlife viewing according to current conditions." }],
      sideTrips: [{ name: "Piney Woods region", description: "Connect Mineola with East Texas forests, lakes and small towns.", href: "/explore/region/piney-woods" }, { name: "Texas Trip Planner", description: "Build an East Texas town-and-nature route around Mineola.", href: "/explore/trip-planner?destination=mineola" }]
    },
    authorityGuide: {
      whyItMatters: "Mineola has an unusually balanced small-town proposition: a genuine historic downtown and a large municipal nature preserve capable of supporting a full outdoor day.",
      assessment: { recommendedVisit: "One full day; one night for birding, camping or a longer preserve outing.", physicalEffort: "Low downtown; low to high depending on preserve activity", weatherExposure: "Outdoor-heavy if visiting the preserve", planningLevel: "Moderate", familyFit: "Very strong because the trip can combine a compact downtown with flexible outdoor activities.", firstTimeValue: "High for travelers who want both small-town character and substantial nature access." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk downtown", "Have lunch locally", "Choose a short preserve activity"] }, { label: "Full day", duration: "8-10 hours", steps: ["Start downtown or with morning birding", "Use midday for food and local history", "Spend a dedicated afternoon block at the preserve"] }, { label: "Overnight", duration: "1 night", steps: ["Give the preserve an early or late wildlife window", "Use the opposite half day for downtown", "Continue into Wood County or the Piney Woods"] }],
      sources: [{ label: "City of Mineola", url: "https://www.mineola.com/", scope: "Official city, tourism and downtown information" }, { label: "Mineola Nature Preserve", url: "https://www.mineola.com/o/naturepreserve/", scope: "Official preserve facilities, activities and visitor information" }]
    }, featured: true
  },
  {
    id: "small-town-wimberley", brandId: "texasdefined", slug: "wimberley", name: "Wimberley",
    summary: "Wimberley is a Hill Country village on Cypress Creek and the Blanco River known for its walkable Square, galleries and shops, Blue Hole Regional Park, Jacob's Well Natural Area, Old Baldy and a strong market-and-arts culture.",
    category: "small-towns", region: "hill-country", nearestTown: "Wimberley", county: "Hays",
    coordinates: { lat: 29.9974, lng: -98.0986 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Blue%20Hole%20Regional%20Park%20(23904593553).jpg?width=1600", alt: "Blue Hole Regional Park in Wimberley, Texas", width: 6021, height: 4301, credit: "Nan Palmero · CC BY 2.0 · Wikimedia Commons" },
    bestSeason: "Spring and fall for walking and outdoor recreation; summer for swimming when reservations and water conditions permit",
    entryNote: "Swimming access, reservations and natural-area conditions can change with drought, flooding and seasonal operations. Confirm Blue Hole and Jacob's Well status before travel; event Saturdays can also change downtown parking and traffic.",
    highlights: ["Wimberley Square", "Blue Hole Regional Park", "Jacob's Well Natural Area", "Old Baldy", "Cypress Creek", "arts and markets"],
    body: [
      "Wimberley's appeal comes from the combination of a compact Hill Country commercial center and unusually strong nearby natural attractions. The Square provides shops, galleries and food, while Cypress Creek and the Blanco River keep the town tied to water and landscape.",
      "Blue Hole Regional Park, Jacob's Well Natural Area and Old Baldy are distinct experiences with different access rules and physical demands. Treating them as interchangeable swimming holes or viewpoints leads to poor planning, especially during drought or after heavy rain.",
      "A first visit works best when one outdoor anchor is chosen in advance and downtown is used as the flexible second half of the day. Market Days and major weekends can make Wimberley much busier, so parking, lodging and reservations deserve earlier attention."
    ],
    officialUrl: "https://www.visitwimberleytx.org/", sourceCheckedAt,
    directions: "Wimberley is in Hays County in the Texas Hill Country between Austin and San Antonio, reached primarily by Ranch Road 12 and FM/RR connections from I-35.",
    accessibilityNotes: "The official visitor bureau notes that many locations are accessible but some streets and paths are rocky or uneven. Confirm specific park, swimming-area and trail accommodations before travel.",
    areaGuide: {
      intro: "Choose one outdoor anchor first, then use the Square, galleries, food and creekside stops as the flexible part of the itinerary.",
      nearbyAttractions: [{ name: "Blue Hole Regional Park", description: "A major city park with swimming access when open, trails and recreation facilities." }, { name: "Jacob's Well Natural Area", description: "A sensitive natural area whose access and water conditions should always be checked before travel." }],
      foodAndDrink: [{ name: "Wimberley Square", description: "The central cluster for local restaurants, cafes, shops and galleries." }],
      lodging: [{ name: "Wimberley and creekside stays", description: "Best for an early outdoor start and a slower evening around the Square." }],
      neighborhoods: [{ name: "Wimberley Square", description: "The walkable commercial and arts heart of town." }],
      familyStops: [{ name: "Blue Hole Regional Park", description: "A flexible family outdoor stop when current conditions and reservations allow." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Wimberley with nearby river towns, parks and scenic drives.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build a Hill Country route around Wimberley.", href: "/explore/trip-planner?destination=wimberley" }]
    },
    authorityGuide: {
      whyItMatters: "Wimberley is one of the Hill Country's strongest small-town combinations of walkable local culture and high-value natural recreation, but the water-dependent attractions require current-condition planning.",
      assessment: { recommendedVisit: "One full day; one or two nights for multiple outdoor sites, markets or a slower arts-and-food itinerary.", physicalEffort: "Low downtown to moderate on trails and hills", weatherExposure: "Outdoor-heavy", planningLevel: "Moderate to high in swimming season", familyFit: "Very strong when reservations and water conditions are checked in advance.", firstTimeValue: "Very high for Hill Country travelers who want both a small-town center and outdoor recreation." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the Square", "Choose one short outdoor stop", "Finish with local food or galleries"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin at a reserved or weather-sensitive outdoor attraction", "Break for lunch around the Square", "Shop or visit galleries", "Finish with a creekside or viewpoint stop"] }, { label: "Weekend", duration: "1-2 nights", steps: ["Give one major outdoor site a dedicated block", "Use a separate half day for downtown and markets", "Add a second Hill Country nature stop only after checking current conditions"] }],
      sources: [{ label: "Visit Wimberley", url: "https://www.visitwimberleytx.org/", scope: "Official destination planning, lodging, food, events and attractions" }, { label: "Visit Wimberley plan your visit", url: "https://www.visitwimberleytx.org/plan-your-visit/", scope: "Current parking, access, seasonal and accessibility planning" }]
    }, featured: true
  }
];