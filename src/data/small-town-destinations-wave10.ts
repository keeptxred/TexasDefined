import type { Destination } from "./types";

const sourceCheckedAt = "2026-09-02";

export const smallTownWave10Destinations: Destination[] = [
  {
    id: "small-town-menard", brandId: "texasdefined", slug: "menard", name: "Menard",
    summary: "Menard is a San Saba River town on the northern Edwards Plateau where frontier-era history, a restored Art Deco courthouse, the historic irrigation ditch, river parks, fishing and a quiet ranch-country landscape support a low-key Texas heritage stop.",
    category: "small-towns", region: "hill-country", nearestTown: "Menard", county: "Menard",
    coordinates: { lat: 30.9174, lng: -99.7865 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Menard%20county%20courthouse%202010.jpg?width=1600", alt: "Menard County Courthouse in Menard, Texas", width: 2503, height: 1471, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for historic walking, river parks and ranch-country drives; warm months for fishing and paddling with heat and river conditions checked",
    entryNote: "Menard is a small rural community with limited attraction hours and services compared with larger cities. Confirm museum or historic-site access before travel, carry water in warm weather, and check San Saba River conditions before fishing or paddling.",
    highlights: ["San Saba River", "Menard County Courthouse", "Historic Ditch Walk", "frontier history", "river parks", "Guadalupe bass fishing"],
    body: [
      "Menard became the county seat in 1858 and sits beside the San Saba River on the northern edge of the Edwards Plateau. Its courthouse, historic buildings and irrigation history give the town a tangible frontier-and-ranching story rather than a purely scenic identity.",
      "The San Saba River is the practical outdoor anchor. Local parks provide picnic and river access, while the Historic Ditch Walk traces part of the community's early irrigation system and connects local history to the landscape that made settlement possible.",
      "Menard is best approached as an unhurried half- or full-day stop rather than a high-density attraction town. Pair courthouse and local history with a river walk or fishing block, and use the town as part of a broader western Hill Country or Edwards Plateau route."
    ],
    officialUrl: "https://menardchamber.com/", sourceCheckedAt,
    directions: "Menard is the Menard County seat on US 83 and US 190, west of Mason and southeast of San Angelo. The courthouse and San Saba River parks form the easiest visitor orientation points.",
    accessibilityNotes: "The courthouse area and river parks vary in surface and grade. Confirm access at individual historic sites; outdoor river edges and unpaved portions of the ditch walk may be uneven.",
    areaGuide: {
      intro: "Use the courthouse and historic core to understand Menard's frontier story, then follow that history out to the San Saba River and irrigation landscape.",
      nearbyAttractions: [{ name: "Historic Ditch Walk", description: "A local walking route connecting Menard's early irrigation history with the San Saba River landscape." }, { name: "San Saba River parks", description: "Stockpen Crossing, American Legion and Low Water Crossing parks provide river access, picnicking and outdoor breaks." }],
      foodAndDrink: [{ name: "Central Menard", description: "Local dining is limited and locally scaled; verify hours before relying on a specific stop." }],
      lodging: [{ name: "Menard and regional ranch-country stays", description: "Useful for travelers continuing through the Edwards Plateau or planning early river recreation." }],
      neighborhoods: [{ name: "Courthouse and San Saba Avenue core", description: "The primary concentration of civic history and local services." }],
      familyStops: [{ name: "San Saba River parks", description: "Easy picnic and outdoor stops for families when weather and river conditions are suitable." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Menard with Mason, river towns and scenic ranch-country drives.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build an Edwards Plateau history-and-river route around Menard.", href: "/explore/trip-planner?destination=menard" }]
    },
    authorityGuide: {
      whyItMatters: "Menard gives TexasDefined a small but distinctive Edwards Plateau node where river ecology, irrigation history, frontier settlement and courthouse-town identity remain closely connected.",
      assessment: { recommendedVisit: "Half to full day; one night when combining river recreation with a broader regional route.", physicalEffort: "Low to moderate", weatherExposure: "Mostly outdoors", planningLevel: "Low", familyFit: "Good for families comfortable with a quiet, outdoors-and-history itinerary.", firstTimeValue: "Strong for travelers seeking less-commercialized Texas history and river scenery." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["See the courthouse and historic core", "Walk part of the Historic Ditch", "Finish at a San Saba River park"] }, { label: "Full day", duration: "7-9 hours", steps: ["Begin downtown", "Add a local history stop if open", "Break for lunch", "Spend the afternoon fishing, walking or relaxing along the river"] }, { label: "Overnight", duration: "1 night", steps: ["Give Menard a relaxed first afternoon", "Use the next morning for river recreation", "Continue through Mason or the western Hill Country"] }],
      sources: [{ label: "Menard County Chamber of Commerce", url: "https://menardchamber.com/", scope: "Official visitor positioning, river recreation and community information" }, { label: "Discover Menard", url: "https://menardchamber.com/discover-menard/", scope: "Current historic attractions, San Saba River parks and Historic Ditch Walk" }]
    }, featured: true
  },
  {
    id: "small-town-sonora", brandId: "texasdefined", slug: "sonora", name: "Sonora",
    summary: "Sonora is an I-10 Sutton County town at the meeting point of the Hill Country and West Texas, combining a historic courthouse and Main Street, Eaton Hill trails, ranching history and one of the state's most celebrated show caves just southwest of town.",
    category: "small-towns", region: "hill-country", nearestTown: "Sonora", county: "Sutton",
    coordinates: { lat: 30.5669, lng: -100.6434 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sutton%20county%20courthouse%202009.jpg?width=1600", alt: "Historic Sutton County Courthouse in Sonora, Texas", width: 1930, height: 1288, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for Eaton Hill and downtown walking; the Caverns of Sonora stays warm and humid year-round and requires separate tour planning",
    entryNote: "The Caverns of Sonora is about 15 miles southwest of town and guided tours involve roughly 360 stairs in a warm, humid cave. Check current tour hours and restrictions before travel; outdoor hiking in Sonora should be planned around heat and weather.",
    highlights: ["Caverns of Sonora", "Sutton County Courthouse", "Eaton Hill Nature Center", "historic Main Street", "ranching history", "I-10 road-trip stop"],
    body: [
      "Sonora markets itself as the place where the Hill Country meets West Texas, and its location on I-10 makes it a natural regional stop. The 1891 Sutton County Courthouse, historic Main Street and local ranching museum keep the town rooted in the livestock and transportation history of the Edwards Plateau.",
      "Eaton Hill Nature Center and Preserve adds more than two miles of trails on a 37-acre landscape immediately associated with town, while the Caverns of Sonora provides the destination's major geological draw about 15 miles southwest. The cave is a highly decorated living system visited only on guided tours.",
      "A strong first trip treats the cave and town as separate blocks. Reserve enough time for the cave's stairs and humidity, then use downtown or Eaton Hill for a lower-pressure second experience. Sonora also works well as an overnight break on the long I-10 corridor between San Antonio and Far West Texas."
    ],
    officialUrl: "https://www.visitsonora.org/", sourceCheckedAt,
    directions: "Sonora is the Sutton County seat on I-10 and US 277, roughly halfway between San Antonio and the Big Bend region. Downtown sits just south of the interstate; the Caverns of Sonora is about 15 miles southwest.",
    accessibilityNotes: "The standard cave experience includes many stairs and narrow formation-rich passages, so verify current accessibility directly with the cavern. Eaton Hill trails and historic buildings vary; downtown offers lower-effort alternatives.",
    areaGuide: {
      intro: "Plan the Caverns of Sonora first because it is the most schedule- and mobility-sensitive attraction, then use downtown and Eaton Hill to round out the town itself.",
      nearbyAttractions: [{ name: "Caverns of Sonora", description: "A highly decorated guided show cave 15 miles southwest of town; tours descend about 155 feet and involve roughly 360 stairs." }, { name: "Eaton Hill Nature Center & Preserve", description: "A 37-acre local preserve with more than two miles of trails and easy access from Sonora." }],
      foodAndDrink: [{ name: "Downtown and I-10 corridor", description: "Local restaurants and road-trip services provide practical options before or after cave and hiking blocks." }],
      lodging: [{ name: "Sonora", description: "A useful overnight base for the cave and a strategic break on the I-10 corridor." }],
      neighborhoods: [{ name: "Historic Main Street and courthouse area", description: "The town's principal civic, museum and historic-building cluster." }],
      familyStops: [{ name: "Eaton Hill Nature Center", description: "A flexible family outdoor stop when heat and trail conditions are appropriate." }],
      sideTrips: [{ name: "Hill Country region", description: "Connect Sonora with the western Edwards Plateau and Hill Country road network.", href: "/explore/region/hill-country" }, { name: "Texas Trip Planner", description: "Build a cave, nature and road-trip itinerary around Sonora.", href: "/explore/trip-planner?destination=sonora" }]
    },
    authorityGuide: {
      whyItMatters: "Sonora combines a major cave destination with an authentic courthouse-and-ranching town and a local nature preserve, making it more useful than a simple I-10 fuel stop.",
      assessment: { recommendedVisit: "One full day; one night for a cave tour plus hiking or downtown history.", physicalEffort: "Moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Moderate", familyFit: "Strong for families whose members can manage the cave stairs; easier town and nature alternatives are available.", firstTimeValue: "Very high for I-10 road trippers and cave-focused travelers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Tour the Caverns of Sonora", "Return to town for food", "Walk the courthouse/Main Street area"] }, { label: "Full day", duration: "8-10 hours", steps: ["Use the morning for the cave", "Break for lunch", "Visit the Ice House Ranch Museum or downtown", "Finish with Eaton Hill in cooler hours"] }, { label: "Overnight", duration: "1 night", steps: ["Give the cave an unhurried first-day block", "Use the next morning for Eaton Hill and Main Street", "Continue west or east on I-10 without overloading the driving day"] }],
      sources: [{ label: "Sonora Chamber of Commerce", url: "https://www.visitsonora.org/", scope: "Official visitor information, downtown, Eaton Hill, museums and lodging" }, { label: "Caverns of Sonora", url: "https://www.cavernsofsonora.com/", scope: "Official cave tours, hours, location and visitor planning" }, { label: "Caverns of Sonora tour information", url: "https://www.cavernsofsonora.com/tour-information", scope: "Current cave temperature, stairs and visitor restrictions" }]
    }, featured: true
  },
  {
    id: "small-town-seymour", brandId: "texasdefined", slug: "seymour", name: "Seymour",
    summary: "Seymour is a North Texas Baylor County town whose standout identity comes from world-class Permian fossil beds, the Whiteside Museum of Natural History, a historic downtown, large city park and an unusually broad set of family recreation spaces.",
    category: "small-towns", region: "prairies-lakes", nearestTown: "Seymour", county: "Baylor",
    coordinates: { lat: 33.5943, lng: -99.2604 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Seymour%20Texas%20Early%20Community%20Building.jpg?width=1600", alt: "Early Community Building historic landmark in Seymour, Texas", width: 2411, height: 1356, credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown and park time; museums work year-round, while summer outdoor recreation is best in cooler hours",
    entryNote: "Museum, theater and seasonal recreation hours vary. Check current Whiteside Museum hours and city-event schedules before travel, and plan summer park or bike activity around North Texas heat.",
    highlights: ["Whiteside Museum of Natural History", "Permian Red Beds", "Seymour Memorial Park", "historic landmarks", "Seymour Sound Garden", "family recreation"],
    body: [
      "Seymour occupies an unusual place in Texas natural history because nearby Baylor County exposures preserve some of the world's important Permian fossil material. The Whiteside Museum of Natural History turns that science into a visitor experience centered on creatures such as Dimetrodon, Seymouria and other animals that lived long before dinosaurs.",
      "The town's civic and recreation layers make it more than a museum stop. Seymour Memorial Park covers more than 26 acres beneath mature live oaks, while the Sound Garden, bike and skate facilities, pools, fishing and community theater create a broad family-oriented public-space network.",
      "A first visit should put the Whiteside Museum at the center, then add one historic or outdoor block. This structure makes Seymour work well for families and road trippers who might otherwise pass through North Texas without realizing the scientific importance of the surrounding landscape."
    ],
    officialUrl: "https://cityofseymour.org/visit-seymour-texas/", sourceCheckedAt,
    directions: "Seymour is the Baylor County seat at US 82/277 and US 183/283 in North Texas, west of Wichita Falls. The downtown museum/civic area and Seymour Memorial Park are the main visitor anchors.",
    accessibilityNotes: "The city specifically identifies the Seymour Sound Garden as accessible with flat navigation paths. Museum, historic-building and recreation-site accessibility should be confirmed individually before travel.",
    areaGuide: {
      intro: "Build the trip around the Whiteside Museum, then use Seymour's parks, sound garden and historic sites to turn the fossil story into a full small-town visit.",
      nearbyAttractions: [{ name: "Whiteside Museum of Natural History", description: "A 10,000-plus-square-foot museum interpreting Seymour-area Permian fossil beds and their globally important prehistoric animals." }, { name: "Seymour Memorial Park", description: "A 26.5-acre city park with mature oaks, walking track and multiple recreation facilities." }],
      foodAndDrink: [{ name: "Central Seymour", description: "Local dining and downtown services fit between the museum and park blocks." }],
      lodging: [{ name: "Seymour", description: "Useful for travelers combining the museum with events, outdoor recreation or a longer North Texas route." }],
      neighborhoods: [{ name: "Downtown Seymour", description: "The civic and cultural core for museums, historic landmarks and community spaces." }],
      familyStops: [{ name: "Seymour Sound Garden", description: "An accessible interactive music park designed for a broad range of ages and physical abilities." }],
      sideTrips: [{ name: "Prairies & Lakes region", description: "Connect Seymour with North Texas museum, lake and courthouse-town routes.", href: "/explore/region/prairies-lakes" }, { name: "Texas Trip Planner", description: "Build a fossil, museum and family-recreation itinerary around Seymour.", href: "/explore/trip-planner?destination=seymour" }]
    },
    authorityGuide: {
      whyItMatters: "Seymour gives TexasDefined a nationally significant deep-time science node: the Permian fossil record is the town's defining authority, supported by unusually strong public recreation for a community of its size.",
      assessment: { recommendedVisit: "One full day; one night for events or a slower family itinerary.", physicalEffort: "Low", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Low", familyFit: "Excellent because the fossil museum can be paired with accessible and active public spaces.", firstTimeValue: "Very high for natural-history families and unexpectedly strong for North Texas road trippers." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Visit the Whiteside Museum", "Walk a downtown historic block", "Stop at the Sound Garden or Memorial Park"] }, { label: "Full day", duration: "8-10 hours", steps: ["Give the museum a substantial morning block", "Break for lunch", "Use the afternoon for Memorial Park and recreation", "Check current theater or community events"] }, { label: "Overnight", duration: "1 night", steps: ["Give science and downtown the first day", "Use the next morning for parks or Salt Fork recreation", "Continue through North Texas"] }],
      sources: [{ label: "City of Seymour — Visit Seymour", url: "https://cityofseymour.org/visit-seymour-texas/", scope: "Official visitor guide, museums, parks and events" }, { label: "Whiteside Museum of Natural History", url: "https://cityofseymour.org/directory/whiteside-museum-of-natural-history/", scope: "Current museum hours and Permian fossil interpretation" }, { label: "City of Seymour Parks & Recreation", url: "https://cityofseymour.org/departments/park-recreation/", scope: "Current park, Sound Garden and recreation information" }]
    }, featured: true
  },
  {
    id: "small-town-mount-vernon", brandId: "texasdefined", slug: "mount-vernon", name: "Mount Vernon",
    summary: "Mount Vernon is a Northeast Texas Main Street town with a restored courthouse square, museums, an active arts community, Bankhead Highway history, nature preserves and quick access to pine-lined Lake Cypress Springs.",
    category: "small-towns", region: "piney-woods", nearestTown: "Mount Vernon", county: "Franklin",
    coordinates: { lat: 33.1887, lng: -95.2213 },
    hero: { src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mount%20Vernon%20May%202018%2017%20(Franklin%20County%20Courthouse).jpg?width=1600", alt: "Franklin County Courthouse in Mount Vernon, Texas", width: 5353, height: 3909, credit: "Michael Barera · CC BY-SA 4.0 · Wikimedia Commons" },
    bestSeason: "Fall through spring for downtown, nature trails and lake-country drives; warm months for Lake Cypress Springs recreation with heat and storm planning",
    entryNote: "Museum and historic-home schedules vary, and lake or nature activities depend on weather. Confirm individual museum hours and current lake conditions before travel, especially if a tour or water activity is central to the trip.",
    highlights: ["Franklin County Courthouse", "Main Street Plaza District", "Old Fire Station Museum", "Cotton Belt depot", "nature preserves", "Lake Cypress Springs"],
    body: [
      "Mount Vernon has built its visitor identity around preservation. The city has long participated in Main Street and heritage programs, and the courthouse-centered Plaza District keeps historic architecture, local businesses, arts and community activity concentrated in a walkable core.",
      "Local museums broaden the story through railroad, regional and popular-culture collections. The Old Fire Station Museum includes memorabilia associated with Mount Vernon native Don Meredith as well as a notable bird-egg exhibit, while the Cotton Belt depot and historic homes add transportation and settlement history.",
      "Nature is equally important to the visit. Dupree and West End preserves add trails and birding, and pine-lined Lake Cypress Springs lies only about eight miles south. A first trip works best when downtown history occupies one block and lake or nature time receives another rather than treating the town as a quick interstate exit."
    ],
    officialUrl: "https://www.cityofmountvernontexas.com/page/tourism", sourceCheckedAt,
    directions: "Mount Vernon is the Franklin County seat in Northeast Texas along I-30, roughly midway between Dallas and Texarkana. The courthouse and downtown Plaza District form the primary visitor core.",
    accessibilityNotes: "Downtown public spaces are compact, but historic museums and nature trails vary. Confirm accessible entrances and trail conditions directly with individual sites before travel.",
    areaGuide: {
      intro: "Start in the Plaza District for courthouse, museum and Main Street history, then choose a nature preserve or Lake Cypress Springs for the outdoor half of the trip.",
      nearbyAttractions: [{ name: "Old Fire Station Museum", description: "A local museum with Don Meredith sports memorabilia and a distinctive historic bird-egg collection." }, { name: "Lake Cypress Springs", description: "A pine-lined recreation lake about eight miles south of town and a major outdoor anchor for Franklin County." }],
      foodAndDrink: [{ name: "Downtown Plaza District", description: "The best walkable cluster for local dining, shopping and heritage atmosphere." }],
      lodging: [{ name: "Mount Vernon and Franklin County", description: "Useful for a downtown-and-lake weekend or a Northeast Texas road trip." }],
      neighborhoods: [{ name: "Downtown Plaza District", description: "The preserved courthouse-centered Main Street district and heart of the visitor experience." }],
      familyStops: [{ name: "Downtown museums and Dupree Nature Trails", description: "Flexible indoor/outdoor options for families depending on weather and interests." }],
      sideTrips: [{ name: "Piney Woods region", description: "Connect Mount Vernon with Northeast Texas lakes, forests and historic towns.", href: "/explore/region/piney-woods" }, { name: "Texas Trip Planner", description: "Build a Main Street, museum and lake-country itinerary around Mount Vernon.", href: "/explore/trip-planner?destination=mount-vernon" }]
    },
    authorityGuide: {
      whyItMatters: "Mount Vernon combines a preserved Northeast Texas Main Street district with unusually varied small museums, nature tourism and close lake access, giving Franklin County a strong all-season discovery node.",
      assessment: { recommendedVisit: "One full day; one or two nights for lake recreation and multiple museums.", physicalEffort: "Low to moderate", weatherExposure: "Mixed indoor/outdoor", planningLevel: "Low", familyFit: "Very strong because downtown museums, trails and lake recreation can be mixed according to age and weather.", firstTimeValue: "High for Northeast Texas road trips and especially useful for travelers who want history plus lake country." },
      itineraries: [{ label: "Half day", duration: "4-5 hours", steps: ["Walk the courthouse and Plaza District", "Visit the Old Fire Station or depot museum", "Add a short nature-trail stop"] }, { label: "Full day", duration: "8-10 hours", steps: ["Begin downtown", "Tour one or two museums", "Break for lunch", "Use the afternoon at a nature preserve or Lake Cypress Springs"] }, { label: "Weekend", duration: "1-2 nights", steps: ["Give downtown and museums one full block", "Reserve a separate block for lake or nature recreation", "Continue through the Piney Woods region"] }],
      sources: [{ label: "City of Mount Vernon Tourism", url: "https://www.cityofmountvernontexas.com/page/tourism", scope: "Official tourism positioning, Main Street, museums, nature and Lake Cypress Springs" }, { label: "Franklin County Chamber — Things to Do", url: "https://www.franklincountytx.com/things-to-do", scope: "Current downtown, museum, nature and recreation attractions" }]
    }, featured: true
  }
];