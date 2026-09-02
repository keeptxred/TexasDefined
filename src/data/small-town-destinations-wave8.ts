import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-02";

export const smallTownWave8Destinations: Destination[] = [
  {
    id: "small-town-rockport", brandId: "texasdefined", slug: "rockport", name: "Rockport",
    summary: "Rockport is an Aransas Bay coastal town where fishing, birding, a public beach, maritime history, a long-running arts community and access to the bays of the Coastal Bend support a complete Gulf Coast weekend rather than a single-purpose beach stop.",
    category: "small-towns", region: "gulf-coast", nearestTown: "Rockport", county: "Aransas",
    coordinates: { lat: 28.0206, lng: -97.0544 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Rockport%20Harbor%20on%20July%2015%202017%2017.jpg?width=1600", alt: "Boats and waterfront at Rockport Harbor on the Texas Gulf Coast", width: 4000, height: 3000, credit: "Botteville · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for birding, fishing and mild waterfront weather; summer for beach and water trips with heat and tropical-weather planning",
    entryNote: "Coastal weather, wind and tropical systems can change boating, fishing and beach conditions quickly. Check current forecasts, beach conditions and attraction hours before travel, especially during hurricane season and major event weekends.",
    highlights: ["Aransas Bay", "Rockport Beach", "Texas Maritime Museum", "Rockport Center for the Arts", "birding", "fishing"],
    body: [
      "Rockport developed as a shipping, fishing and tourism community on the protected bays of the Coastal Bend. Its location among Aransas, Copano and Port bays still shapes the visitor experience, from fishing and sailing to shorebird and migratory-bird observation.",
      "The town also has a substantial cultural layer. The Texas Maritime Museum interprets the state's Gulf history, the Rockport Center for the Arts anchors a longstanding arts community, and historic Fulton and the bayfront broaden the trip beyond beach recreation.",
      "A strong first visit separates water time from cultural stops. Use the cooler morning for fishing, birding, the beach or trails, then shift to museums, galleries and food. Seasonal bird migration and major festivals can increase lodging demand, while coastal storms require flexible plans."
    ],
    officialUrl: "https://rockporttx.gov/947/Convention-and-Visitor-Bureau", sourceCheckedAt,
    directions: "Rockport is the Aransas County seat on the Texas Coastal Bend north of Corpus Christi. The harbor, downtown arts district and Rockport Beach are the primary visitor anchors.",
    accessibilityNotes: "Beach, harbor, museum and trail facilities vary. Confirm current accessible beach access, parking, museum entrances and boat-provider accommodations before travel.",
    areaGuide: {
      intro: "Treat Rockport as a bayside town with three complementary layers: water recreation, wildlife and birding, and a compact arts-and-maritime-history core.",
      nearbyAttractions: [{ name: "Rockport Beach", description: "A major public shoreline and family recreation area on Aransas Bay." }, { name: "Texas Maritime Museum", description: "A focused introduction to Texas Gulf Coast maritime history and culture." }],
      foodAndDrink: [{ name: "Downtown and harbor area", description: "Local seafood, cafes and coastal dining fit naturally between museums, galleries and waterfront stops." }],
      lodging: [{ name: "Rockport and Fulton", description: "Useful for early fishing or birding starts and a slower bayfront evening." }],
      neighborhoods: [{ name: "Downtown Heritage and Cultural Arts District", description: "The principal cluster for galleries, local businesses and cultural stops." }],
      familyStops: [{ name: "Rockport Beach and bayfront parks", description: "Flexible outdoor stops for families when weather and water conditions are appropriate." }],
      sideTrips: [{ name: "Gulf Coast region", description: "Connect Rockport with beaches, bays, wildlife refuges and maritime destinations along the Texas coast.", href: "/explore/region/gulf-coast" }, { name: "Texas Trip Planner", description: "Build a Coastal Bend fishing, birding and culture itinerary around Rockport.", href: "/explore/trip-planner?destination=rockport" }]
    },
    authorityGuide: {
      whyItMatters: "Rockport is one of the Coastal Bend's strongest all-around town bases because fishing, bird migration, beach access, maritime history and visual arts are all substantial parts of the destination.",
      assessment: { recommendedVisit: "One full day; two nights for fishing, birding or a broader Coastal Bend itinerary.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Very strong when coastal weather and water conditions are checked in advance.", firstTimeValue: "Very high for Gulf Coast travelers who want more than a beach-only trip." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Start at the harbor or beach", "Visit the Texas Maritime Museum or arts district", "Finish with local seafood"] }, { label: "Full day", duration: "8-10 hours", steps: ["Use the morning for fishing, birding or beach time", "Break for lunch", "Visit museums and galleries", "Walk the waterfront in the evening"] }, { label: "Weekend", duration: "2 nights", steps: ["Give one day to water and wildlife", "Use a second day for arts, history and nearby bay communities", "Keep the schedule flexible for coastal weather"] }],
      sources: [{ label: "City of Rockport Convention and Visitor Bureau", url: "https://rockporttx.gov/947/Convention-and-Visitor-Bureau", scope: "Official visitor positioning, arts, fishing, beaches and events" }, { label: "City of Rockport — Rockport Today", url: "https://www.rockporttx.gov/738/Rockport-Today", scope: "Current attractions, recreation, birding and maritime context" }]
    }, featured: true
  },
  {
    id: "small-town-clifton", brandId: "texasdefined", slug: "clifton", name: "Clifton",
    summary: "Clifton is a Bosque County arts and heritage town with a Texas Main Street downtown, a restored 1916 theater, major Norwegian-American history, the Bosque Museum and access to the Bosque River and nearby lake country.",
    category: "small-towns", region: "prairies-lakes", nearestTown: "Clifton", county: "Bosque",
    coordinates: { lat: 31.7824, lng: -97.5767 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Downtown%20Clifton%20Wiki%203%20(1%20of%201).jpg?width=1600", alt: "Historic downtown buildings in Clifton, Texas", width: 1152, height: 782, credit: "Renelibrary · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown walking; early December for Norwegian Country Christmas when current event dates are confirmed",
    entryNote: "Many heritage sites and seasonal events operate on limited schedules. Confirm museum, theater and historic-site hours before travel, especially when planning around Norwegian Country Christmas or tours in the Norse Historic District.",
    highlights: ["historic downtown", "Norwegian heritage", "Bosque Museum", "Cliftex Theatre", "Bosque Arts Center", "Norse Historic District"],
    body: [
      "Clifton's identity is unusually layered for a small Central Texas town. Its historic downtown remains active as a Texas Main Street district, while the restored Cliftex Theatre, Heritage Plaza, shops and galleries keep the commercial center useful to visitors rather than purely commemorative.",
      "The town is also one of the state's strongest Norwegian-American heritage destinations. The Bosque Museum holds a major regional collection, and the Norse Historic District northwest of Clifton preserves churches, homes, cemeteries and the landscape associated with the largest historic Norwegian settlement in the Southwest.",
      "A first visit should use downtown as the base, then choose either the Bosque Museum and arts institutions or a deliberate drive into the Norse Historic District. Seasonal heritage events add value but also require advance planning because tours and meals can be date-specific."
    ],
    officialUrl: "https://visitclifton.org/", sourceCheckedAt,
    directions: "Clifton is in Bosque County northwest of Waco, near Texas Highway 6 and FM 219. Historic downtown is the easiest first orientation point before museum or Norse-district side trips.",
    accessibilityNotes: "Downtown is compact, but historic buildings and rural heritage sites vary. Confirm museum, theater, church and event accessibility directly before travel.",
    areaGuide: {
      intro: "Start with downtown Clifton, then choose between the town's arts institutions and a deeper Norwegian-heritage circuit into the Norse Historic District.",
      nearbyAttractions: [{ name: "Bosque Museum", description: "A major local-history museum with an especially strong Norwegian-American collection and broader Bosque County interpretation." }, { name: "Norse Historic District", description: "A rural historic landscape northwest of Clifton preserving churches, homes and sites associated with nineteenth-century Norwegian settlement." }],
      foodAndDrink: [{ name: "Historic downtown Clifton", description: "Local restaurants and cafes fit naturally into the walkable Main Street itinerary." }],
      lodging: [{ name: "Clifton and Bosque County", description: "A practical base for downtown, heritage sites and nearby lake-country excursions." }],
      neighborhoods: [{ name: "Historic downtown", description: "The principal cluster for architecture, the Cliftex Theatre, Heritage Plaza, shops and galleries." }],
      familyStops: [{ name: "Bosque Museum", description: "A useful indoor orientation to local and Norwegian-American history for multigenerational groups." }],
      sideTrips: [{ name: "Prairies & Lakes region", description: "Connect Clifton with North-Central Texas lake country, courthouse towns and heritage destinations.", href: "/explore/region/prairies-lakes" }, { name: "Texas Trip Planner", description: "Build a Bosque County arts-and-heritage route around Clifton.", href: "/explore/trip-planner?destination=clifton" }]
    },
    authorityGuide: {
      whyItMatters: "Clifton combines a functioning historic downtown and arts community with one of Texas's most distinctive immigrant-heritage landscapes, giving Norwegian-American history a strong geographic home in the statewide discovery system.",
      assessment: { recommendedVisit: "One full day; one night for a deeper Norse Historic District or event itinerary.", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong for families interested in local history, arts and easy downtown exploration.", firstTimeValue: "High, especially for heritage travelers and visitors building a Waco-to-lake-country road trip." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk historic downtown", "Visit the Bosque Museum or Bosque Arts Center", "See the Cliftex Theatre and Heritage Plaza"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin downtown", "Spend a focused block at the Bosque Museum", "Break for lunch", "Drive into the Norse Historic District"] }, { label: "Overnight", duration: "1 night", steps: ["Give Clifton's downtown and museums a full day", "Use the next morning for Norwegian-heritage sites", "Continue into Bosque County lake country"] }],
      sources: [{ label: "Visit Clifton", url: "https://visitclifton.org/", scope: "Official joint Clifton EDC and Chamber visitor site, events and planning" }, { label: "Visit Clifton — Attractions", url: "https://visitclifton.org/things-to-do/attractions/", scope: "Historic downtown, arts, Bosque Museum and regional attractions" }, { label: "Visit Clifton — Norse Historic District", url: "https://visitclifton.org/things-to-do/attractions/norse-historic-district/", scope: "Norwegian-settlement history and current heritage-site context" }]
    }, featured: true
  },
  {
    id: "small-town-marfa", brandId: "texasdefined", slug: "marfa", name: "Marfa",
    summary: "Marfa is a high-desert Presidio County town where railroad and military history, Mexican-American heritage, Donald Judd's minimalist-art legacy, international galleries, historic architecture, dark skies and the Marfa Lights create one of Texas's most distinctive cultural destinations.",
    category: "small-towns", region: "big-bend", nearestTown: "Marfa", county: "Presidio",
    coordinates: { lat: 30.3095, lng: -104.0206 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Marfa%20TX%20-%20courthouse%20downtown.jpg?width=1600", alt: "Presidio County Courthouse and downtown Marfa, Texas", width: 4000, height: 3000, credit: "Paul Joseph · CC BY 2.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for walking and desert travel; clear nights year-round for stargazing, with large temperature swings and summer heat planned for",
    entryNote: "Marfa's major art spaces, historic sites and galleries often keep limited or reservation-based schedules. Check current tour days and hours before arrival, carry water for desert travel, and do not assume every gallery or restaurant is open every day of the week.",
    highlights: ["Chinati Foundation", "Judd Foundation", "Presidio County Courthouse", "Marfa Lights", "Blackwell School National Historic Site", "dark skies"],
    body: [
      "Marfa began in 1883 as a railroad water stop and freight headquarters, later acquiring a military presence and a substantial Mexican and Mexican-American community. The 1886 Presidio County Courthouse and adobe buildings in the central historic district keep that earlier history visible beneath the town's contemporary reputation.",
      "Donald Judd's arrival in the 1970s transformed Marfa into an internationally recognized center for site-specific and minimalist art. The Chinati Foundation, Judd Foundation and a dense network of galleries make the town's art inseparable from its desert landscape, architecture and enormous sky.",
      "Marfa rewards advance planning because opening days are intentionally limited and distances in Far West Texas are large. A first visit should reserve major art tours before travel, leave time for the courthouse and Blackwell School history, and use a clear evening for the Marfa Lights viewing area or dark-sky observation."
    ],
    officialUrl: "https://visitmarfa.com/", sourceCheckedAt,
    directions: "Marfa is the Presidio County seat in Far West Texas at US 90 and US 67. The courthouse and central historic district form the town's walkable core, while major art installations and the Marfa Lights viewing area require short drives.",
    accessibilityNotes: "Historic buildings, large-scale art installations and desert sites vary widely in accessibility. Confirm tour-specific mobility requirements and accessible entrances directly with each institution before travel.",
    areaGuide: {
      intro: "Book the major art experience first, then layer in Marfa's railroad, Mexican-American and military history so the town is understood as more than an art-world outpost.",
      nearbyAttractions: [{ name: "Chinati Foundation", description: "Large-scale permanent installations and architecture central to Marfa's international art identity; tour planning is important." }, { name: "Blackwell School National Historic Site", description: "A vital site for understanding Mexican-American education and community history in Marfa." }],
      foodAndDrink: [{ name: "Central Marfa", description: "Restaurants, cafes and bars are concentrated in the historic core but often operate on limited weekly schedules." }],
      lodging: [{ name: "Central Marfa", description: "Best for walking to galleries, food and the courthouse while minimizing late-night desert driving." }],
      neighborhoods: [{ name: "Central Marfa Historic District", description: "A nationally recognized historic core containing the courthouse, adobe architecture and sites associated with Marfa's cultural evolution." }],
      familyStops: [{ name: "Presidio County Courthouse and central historic district", description: "An accessible visual orientation before choosing age-appropriate art or history stops." }],
      sideTrips: [{ name: "Alpine", description: "Pair Marfa with the regional service and cultural hub east on US 90.", href: "/destination/alpine" }, { name: "Big Bend region", description: "Extend the trip through Far West Texas desert, mountain and border destinations.", href: "/explore/region/big-bend" }]
    },
    authorityGuide: {
      whyItMatters: "Marfa is globally unusual: an intact Far West Texas county-seat landscape, Mexican-American history and large-scale contemporary art all coexist in a remote high-desert setting with exceptional night skies.",
      assessment: { recommendedVisit: "Two nights minimum; three for major art tours plus regional exploration.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "High", familyFit: "Good for families comfortable with art, history and desert travel; institutional schedules require preparation.", firstTimeValue: "Exceptional for art and architecture travelers and very high for anyone building a Big Bend regional itinerary." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the courthouse and historic district", "Visit one gallery or history site", "Use sunset for the landscape or Marfa Lights viewing area"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin with a reserved art tour", "Break for lunch", "Add Blackwell School or local history", "Walk central Marfa", "Finish under the dark sky"] }, { label: "Two nights", duration: "2 nights", steps: ["Give one day to major art institutions", "Use the next for history, galleries and the town itself", "Add Alpine or another Big Bend-region stop without compressing driving time"] }],
      sources: [{ label: "Visit Marfa", url: "https://visitmarfa.com/", scope: "Official destination planning, art, culture, land, sky and visitor information" }, { label: "Visit Marfa — History", url: "https://visitmarfa.com/history", scope: "Railroad, military, Mexican-American and historic-district context" }, { label: "Visit Marfa — Art", url: "https://visitmarfa.com/art", scope: "Current galleries, Chinati and Judd art-tour context" }]
    }, featured: true
  },
  {
    id: "small-town-terlingua", brandId: "texasdefined", slug: "terlingua", name: "Terlingua",
    summary: "Terlingua is a remote Brewster County desert community and former quicksilver-mining district immediately outside Big Bend National Park, known for its living ghost-town landscape, mountain views, dark skies, local gathering places and role as a practical Big Bend basecamp.",
    category: "small-towns", region: "big-bend", nearestTown: "Terlingua", county: "Brewster",
    coordinates: { lat: 29.3210, lng: -103.6160 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Terlingua%20ghost%20town%20home%20frame.jpg?width=1600", alt: "Ruins and desert landscape in the historic Terlingua ghost town, Texas", width: 6016, height: 4000, credit: "ClaudiaDurand · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Late fall through early spring for desert hiking and outdoor touring; summer requires extreme-heat precautions and shorter outdoor windows",
    entryNote: "Terlingua is remote. Fuel, food, medical services, cellular coverage and water availability can be limited compared with cities. Plan vehicle range and supplies before arrival, and treat summer heat, flash flooding and long driving distances as core itinerary constraints.",
    highlights: ["Terlingua Ghost Town", "quicksilver-mining history", "Big Bend gateway", "Chihuahuan Desert", "dark skies", "Rio Grande country"],
    body: [
      "Terlingua's ghost-town identity comes from the mining era that drew workers to this isolated Chihuahuan Desert landscape. Ruins, the cemetery and surviving structures still reveal the settlement pattern, but modern Terlingua is also a living community rather than an abandoned historic site.",
      "Its practical importance comes from location. Terlingua and nearby Study Butte sit just outside Big Bend National Park and give travelers lodging, food, guides and a base for exploring mountains, desert, river country and the scenic road toward Lajitas.",
      "The best visit respects remoteness. Build driving time into every day, carry water, confirm fuel and food hours, and avoid overloading a park itinerary. Evenings deserve protected time because the sunset, dark sky and social life around the historic district are part of the Terlingua experience rather than downtime between attractions."
    ],
    officialUrl: "https://visitbigbend.com/terlingua/", sourceCheckedAt,
    directions: "Terlingua is in southern Brewster County near Study Butte, west of Big Bend National Park's Maverick Junction entrance. TX 118 and FM 170 provide the main regional road connections.",
    accessibilityNotes: "Ghost-town ruins, desert terrain and many outdoor activities involve uneven natural surfaces. Lodging and tour-provider accessibility varies widely; confirm specific needs directly before committing to a remote itinerary.",
    areaGuide: {
      intro: "Use Terlingua as both a destination and a basecamp: give the ghost-town landscape time of its own, then build Big Bend driving days conservatively around distance, heat and daylight.",
      nearbyAttractions: [{ name: "Terlingua Ghost Town", description: "The mining-era historic district, cemetery, ruins and modern gathering places form the community's cultural center." }, { name: "Big Bend National Park gateway", description: "Terlingua's location near the western park entrance makes it a practical base for desert, mountain and river itineraries." }],
      foodAndDrink: [{ name: "Ghost Town and Study Butte corridor", description: "The principal concentration of restaurants and gathering places; hours should be confirmed because the region is remote." }],
      lodging: [{ name: "Terlingua and Study Butte", description: "Cabins, casitas, motels, RV sites and off-grid stays provide the main lodging base outside the western side of the national park." }],
      neighborhoods: [{ name: "Historic Ghost Town", description: "The core zone for mining history, local art, gathering places and the most recognizable Terlingua landscape." }],
      familyStops: [{ name: "Ghost-town historic district", description: "A visually engaging history stop, but families should plan for sun, uneven terrain and limited shade." }],
      sideTrips: [{ name: "Big Bend region", description: "Connect Terlingua with desert, mountain, river and border destinations across Far West Texas.", href: "/explore/region/big-bend" }, { name: "Alpine", description: "Use Alpine as a larger regional service, culture and supply stop before or after the remote Big Bend corridor.", href: "/destination/alpine" }]
    },
    authorityGuide: {
      whyItMatters: "Terlingua is both a surviving mining landscape and one of the most important visitor basecamps in the Big Bend region, where remoteness, desert culture and access to public lands shape the trip as much as any single attraction.",
      assessment: { recommendedVisit: "Two nights minimum as a Big Bend base; longer for park, river and scenic-drive exploration.", physicalEffort: "Moderate", weatherExposure: "Mostly outdoors", planningLevel: "High", familyFit: "Good for prepared families comfortable with remote travel, heat management and substantial driving.", firstTimeValue: "Very high for Big Bend travelers because the community is both logistically useful and culturally distinct." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the historic ghost-town area", "Visit the cemetery and mining-era remains", "Stay for sunset and local food"] }, { label: "Full day", duration: "8-10 hours", steps: ["Use the morning for a nearby Big Bend landscape or guided activity", "Return for a midday break", "Explore the ghost town in cooler hours", "Protect evening time for the dark sky"] }, { label: "Three nights", duration: "3 nights", steps: ["Use Terlingua as the base rather than changing lodging daily", "Assign separate days to park, river or scenic-road goals", "Keep one flexible block for weather, rest and the community itself"] }],
      sources: [{ label: "Visit Big Bend — Terlingua", url: "https://visitbigbend.com/terlingua/", scope: "Brewster County Tourism Council destination overview, history and current planning" }, { label: "Visit Big Bend — Terlingua activities", url: "https://visitbigbend.com/places/category/terlingua-activities/united-states/big-bend-texas/study-butte/", scope: "Current regional activities and gateway context" }, { label: "Visit Big Bend — Terlingua lodging", url: "https://visitbigbend.com/places/category/terlingua-lodging/united-states/big-bend-texas/terlingua/", scope: "Current lodging and basecamp context" }]
    }, featured: true
  }
];