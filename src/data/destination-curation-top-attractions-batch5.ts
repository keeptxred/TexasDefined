import type { Destination, DestinationAreaGuide, DestinationAreaItemList } from "./types";

type TopAttractionExpansion = {
  summary: string;
  nearestTown: string;
  hero: Destination["hero"];
  bestSeason: string;
  entryNote: string;
  highlights: string[];
  body: string[];
  officialUrl: string;
  sourceCheckedAt: string;
  areaGuide: DestinationAreaGuide;
  managingAuthority?: string;
  reservationUrl?: string;
  county?: string;
  address?: string;
  directions?: string;
  accessibilityNotes?: string;
  featured?: boolean;
};

function items(...rows: Array<[string, string, string, string?]>): DestinationAreaItemList {
  return rows.map(([name, proximity, description, href]) => ({
    name,
    proximity,
    description,
    ...(href ? { href } : {}),
  })) as DestinationAreaItemList;
}

const curated: Record<string, TopAttractionExpansion> = {
  "fredericksburg-historic-district": {
    summary:
      "Fredericksburg's National Historic District centers on a broad Hill Country Main Street lined with limestone commercial buildings, German-Texan landmarks, museums, churches and more than 80 points of historic interest that turn the town's nineteenth-century immigrant story into a walkable living district.",
    nearestTown: "Fredericksburg",
    bestSeason:
      "Fall through spring for comfortable walking; spring wildflowers and the winter holiday season add atmosphere, while summer mornings are better than exposed afternoons",
    entryNote:
      "The historic district is free to explore. Visit Fredericksburg provides free self-guided walking-tour maps at the Visitor Information Center, while individual museums and attractions have their own admission and hours. Weekends and festival dates can make Main Street parking and sidewalks much busier.",
    highlights: [
      "Historic limestone buildings along Main Street",
      "More than 80 documented points of historic interest",
      "Vereins Kirche and Marktplatz in the center of town",
      "Pioneer Museum and German-Texan settlement history",
      "National Museum of the Pacific War within the walkable downtown core",
    ],
    body: [
      "Fredericksburg's historic district is the best place to understand why the town feels different from almost anywhere else in Texas. German immigrants founded Fredericksburg in 1846, and the broad Main Street, limestone buildings, churches and civic spaces still reflect the settlement patterns and building traditions that developed as the community took root in the Hill Country.",
      "The district is large enough that a walking map is more useful than simply wandering storefront to storefront. Visit Fredericksburg identifies more than 80 points of historic interest, ranging from commercial buildings and churches to civic structures and residential architecture. Starting at the Visitor Information Center or Marktplatz gives the walk a clear orientation before the shopping district takes over the visitor's attention.",
      "Vereins Kirche at Marktplatz remains one of the town's visual anchors and connects directly to Fredericksburg's early community life. Farther west, Pioneer Museum expands the story through historic structures and artifacts associated with German-Texan settlement. Those sites help explain the architecture on Main Street rather than leaving visitors with only a decorative idea of 'German' Fredericksburg.",
      "The National Museum of the Pacific War gives downtown another layer that is not directly about nineteenth-century settlement. Fredericksburg native Chester W. Nimitz became one of the central American commanders of the Pacific War, and the museum complex has grown into a major national military-history institution. It deserves its own substantial block of time rather than being treated as a quick stop between shops.",
      "Modern Fredericksburg is also a working tourism town, so preservation and commerce sit side by side. Restaurants, tasting rooms, galleries and shops occupy many historic buildings, which keeps the district lively but can make weekend visits crowded. Early morning is the best time to notice architecture before Main Street becomes primarily a shopping corridor.",
      "The district is the natural base for a larger Gillespie County trip. Enchanted Rock adds granite-dome hiking north of town, the LBJ ranch corridor and Stonewall extend east along Highway 290, and wineries spread across the surrounding Hill Country. A strong weekend gives one day to Fredericksburg itself and another to the landscape beyond Main Street.",
    ],
    officialUrl: "https://www.visitfredericksburgtx.com/directory/national-historic-district/",
    sourceCheckedAt: "2026-08-17",
    county: "Gillespie",
    address: "100 E Main Street, Fredericksburg, TX 78624",
    directions:
      "The district centers on Main Street in downtown Fredericksburg. Free walking-tour maps are available at the Visitor Information Center at 302 E Austin Street; once parked, most core historic sites, museums, shops and restaurants can be reached on foot.",
    accessibilityNotes:
      "Downtown sidewalks and public buildings vary because the district includes historic structures from many eras. Visitors with specific mobility needs should use the Visitor Information Center for current accessible-route and attraction information before planning a long walking loop.",
    areaGuide: {
      intro:
        "Fredericksburg is compact enough that the historic district, museums, food and lodging overlap in one walkable core, while the strongest side trips spread north and east into Gillespie County's granite, ranch and wine country.",
      nearbyAttractions: items(
        ["National Museum of the Pacific War", "In the historic district", "A major museum complex centered on the Pacific theater and Fredericksburg native Admiral Chester Nimitz."],
        ["Pioneer Museum", "West Main Street", "Historic structures and collections explain German-Texan settlement and daily life."],
        ["Vereins Kirche and Marktplatz", "Central Main Street", "The civic square and reconstructed Vereins Kirche remain the district's most recognizable community landmarks."],
        ["St. Mary's Catholic Church", "West of the center", "Historic church architecture adds another important layer to Fredericksburg's immigrant and religious history."]
      ),
      foodAndDrink: items(
        ["Main Street", "In the district", "German-Texan restaurants, cafes, bakeries and tasting rooms make the historic core the easiest dining area."],
        ["East Main / Highway 290 corridor", "East of downtown", "Wineries, tasting rooms and restaurants extend the food-and-wine experience beyond the historic blocks."],
        ["West Main", "West side of downtown", "Restaurants and local businesses are mixed with historic buildings and Pioneer Museum sites."],
        ["Luckenbach area", "About 13 miles south-east", "Music, casual food and Hill Country atmosphere create a simple evening excursion."]
      ),
      lodging: items(
        ["Historic downtown", "Walkable", "Historic inns, guesthouses and small hotels put Main Street museums and restaurants within an easy walk."],
        ["East Highway 290", "East of downtown", "Lodging near wineries works well for travelers prioritizing the wine corridor."],
        ["Hill Country cabins and ranch stays", "Outside town", "Rural lodging shifts the trip toward scenery and quiet nights while keeping Fredericksburg close."],
        ["West Fredericksburg", "Near US 290/87", "A practical hotel base can be easier for travelers continuing toward Enchanted Rock or Mason."]
      ),
      neighborhoods: items(
        ["Main Street Historic District", "Immediate area", "The primary commercial and architectural corridor combines preserved buildings with active shops and restaurants."],
        ["Marktplatz civic core", "Center of downtown", "Public lawns, Vereins Kirche and surrounding blocks form the town's central gathering space."],
        ["West Main heritage area", "West", "Pioneer Museum and older residential/commercial structures deepen the settlement story."],
        ["East Main / wine-road gateway", "East", "The transition from downtown to Highway 290 leads directly toward wineries and Stonewall."]
      ),
      familyStops: items(
        ["Pioneer Museum", "West Main", "Historic buildings and household artifacts make early Fredericksburg easier for children to visualize."],
        ["Marktplatz", "Central downtown", "Open lawns and public space give families a break between museums and shops."],
        ["National Museum of the Pacific War", "Downtown", "Large exhibits and artifacts can engage older children and teens when enough time is allowed."],
        ["Enchanted Rock State Natural Area", "About 18 miles north", "A granite-dome hike and broad Hill Country views create the strongest outdoor family extension.", "/destination/enchanted-rock-state-natural-area"]
      ),
      sideTrips: items(
        ["Enchanted Rock State Natural Area", "About 18 miles north", "Climb the granite dome or use shorter trails for a landscape-focused half day.", "/destination/enchanted-rock-state-natural-area"],
        ["Lyndon B. Johnson State Park and Historic Site", "About 18 miles east", "The LBJ ranch corridor and Sauer-Beckmann living history connect Fredericksburg with twentieth-century Texas history.", "/destination/lyndon-b-johnson-state-park-and-historic-site"],
        ["Luckenbach", "About 13 miles south-east", "Music and a tiny historic settlement add an easy Hill Country evening stop."],
        ["Highway 290 wine corridor", "East toward Stonewall", "Wineries and vineyards can fill a separate adult-focused day without leaving Gillespie County."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Fredericksburg_historic_district_2008.jpg?width=1600",
      alt: "Historic limestone commercial buildings along Main Street in Fredericksburg, Texas",
      width: 1600,
      height: 894,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },

  "inner-space-cavern": {
    summary:
      "A limestone show cave beside Interstate 35 in Georgetown, where guided tours descend into decorated chambers, fossil-rich passages and active formations on routes ranging from the paved Adventure Tour to more rugged flashlight and wild-cave experiences.",
    nearestTown: "Georgetown",
    bestSeason:
      "Year-round; the cavern stays around 72°F with high humidity, making it especially useful during Central Texas summer heat or rainy weather",
    entryNote:
      "The classic Adventure Tour generally does not require a reservation for ordinary-size groups and can be purchased in advance or on arrival. Hidden Passages is first-come, first-served and the Wild Cave Tour requires reservations. Cavern routes are steep and uneven and are not wheelchair or stroller accessible.",
    highlights: [
      "Classic one-mile Adventure Tour on a paved, lighted cavern route",
      "Large decorated rooms and active limestone formations",
      "Hidden Passages flashlight tour on a more rugged route",
      "Wild Cave specialty experience for prepared visitors",
      "Geology, paleontology and discovery history interpreted by guides",
    ],
    body: [
      "Inner Space Cavern sits almost improbably beside Interstate 35 in Georgetown, but the highway is tied directly to the cave's modern story. The cavern was discovered during highway construction in the 1960s, opening a hidden limestone system beneath one of Central Texas's busiest transportation corridors and creating one of the region's most accessible cave destinations by location.",
      "The Adventure Tour is the standard first visit. Guides lead groups for roughly a mile through paved, lighted passages and some of the cavern's largest decorated rooms, explaining geology, formations and the cave's discovery. 'Paved' should not be confused with level: the route includes steep and uneven slopes, damp surfaces and sustained walking.",
      "Hidden Passages changes the experience by using a more rugged, less-developed route and flashlights. It has tighter physical requirements and a minimum child age, while the Wild Cave Tour goes further into specialty adventure territory. Mixed groups should select a tour for the least mobile or least cave-comfortable participant rather than assuming everyone should upgrade to the most strenuous option.",
      "The cave's temperature stays fairly stable, but high humidity makes it feel warmer than the thermometer alone suggests. Closed-toe shoes with good traction are the practical choice, and visitors with respiratory concerns should take the humidity seriously. Food, drinks, tripods and wheeled devices are restricted inside the cave.",
      "The above-ground gift shop, snack area, picnic area and restrooms are wheelchair accessible even though the cave route is not. That distinction is useful for families or groups with different mobility needs, but it does not create a comparable underground experience for someone who cannot manage steep cave paths.",
      "Georgetown makes Inner Space easy to expand into a full Central Texas day. The historic courthouse square, Blue Hole Park and San Gabriel River are close, while Round Rock and North Austin provide larger family and dining options. The attraction also works as the northern cave counterpart to Natural Bridge Caverns near San Antonio on a longer I-35 road trip.",
    ],
    managingAuthority: "Inner Space Cavern",
    officialUrl: "https://innerspacecavern.com/",
    sourceCheckedAt: "2026-08-17",
    county: "Williamson",
    address: "4200 S I-35 Frontage Road, Georgetown, TX 78626",
    directions:
      "Inner Space Cavern is directly beside Interstate 35 at Exit 259 in Georgetown. The highway location makes access simple from Austin or Temple, but I-35 traffic can add unpredictable travel time, so leave a buffer before any preferred tour window.",
    accessibilityNotes:
      "The cavern pathways have steep, uneven slopes and are not wheelchair or stroller accessible. The gift shop, snack bar, picnic area and restrooms are wheelchair accessible; visitors with mobility or respiratory concerns should review the cave's current FAQ before purchasing a tour.",
    areaGuide: {
      intro:
        "Inner Space sits at Georgetown's southern edge, so the historic square and San Gabriel River provide the strongest local additions, while Round Rock and North Austin expand the family, food and lodging choices along I-35.",
      nearbyAttractions: items(
        ["Georgetown Historic Square", "About 4 miles north", "The courthouse square, historic storefronts, restaurants and shops provide the city's best walking district."],
        ["Williamson Museum", "On the Georgetown Square", "Local-history exhibits add county context to a cavern visit."],
        ["Blue Hole Park", "About 4 miles north", "A scenic limestone swimming and picnic area along the San Gabriel River offers an outdoor counterpoint."],
        ["San Gabriel Park", "About 5 miles north", "Trails and riverfront green space make a flexible family stop near downtown Georgetown."]
      ),
      foodAndDrink: items(
        ["Georgetown Square", "About 4 miles north", "Restaurants, coffee and dessert shops make the historic center the strongest meal destination."],
        ["Wolf Ranch / west Georgetown", "About 5 miles north-west", "A broad suburban restaurant selection is practical for families and groups."],
        ["Round Rock", "About 8–12 miles south", "A larger dining scene works well for travelers continuing toward Austin."],
        ["North Austin", "Farther south", "Major restaurant districts provide the widest choices on a longer Austin-based trip."]
      ),
      lodging: items(
        ["Georgetown", "Closest", "Hotels near I-35 and the square keep both the cavern and historic downtown convenient."],
        ["Round Rock", "About 10 miles south", "A large hotel inventory is useful for families combining Georgetown with Austin-area attractions."],
        ["North Austin", "About 20 miles south", "The broadest lodging selection works when Inner Space is one stop in a larger city trip."],
        ["Georgetown rentals and inns", "Around downtown", "Smaller lodging can create a more local base near the square and river parks."]
      ),
      neighborhoods: items(
        ["Downtown Georgetown", "North", "The courthouse square and surrounding historic blocks form the city's walkable cultural core."],
        ["San Gabriel river corridor", "North-east", "Parks and trails show the limestone river landscape above ground."],
        ["South Georgetown", "Immediate area", "The I-35 corridor provides services and quick access around the cave."],
        ["Round Rock", "South", "A larger neighboring city adds entertainment, food and family infrastructure."]
      ),
      familyStops: items(
        ["Adventure Tour", "At Inner Space", "The standard guided route is the most broadly suitable underground option for families who can manage the slopes."],
        ["Blue Hole Park", "Georgetown", "River scenery and picnic space provide an easy outdoor break."],
        ["Play for All Abilities Park", "Round Rock", "A large inclusive playground is a strong add-on for younger children."],
        ["Kalahari / Round Rock family attractions", "South", "Large indoor entertainment options can fill a second half day when weather is poor."]
      ),
      sideTrips: items(
        ["Texas State Capitol", "About 30 miles south", "Austin's civic landmark can anchor a separate central-city day.", "/destination/texas-state-capitol"],
        ["Lady Bird Johnson Wildflower Center", "South Austin", "Native-plant gardens add an outdoor nature stop on a longer Austin trip.", "/destination/lady-bird-johnson-wildflower-center"],
        ["Natural Bridge Caverns", "About 80 miles south", "A second major show cave creates an unusual cave-focused Central Texas road trip.", "/destination/natural-bridge-caverns"],
        ["Salado", "About 20 miles north", "A historic village, creek and galleries offer a quieter northbound side trip."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Innerspace_cavern0700.jpg?width=1600",
      alt: "Illuminated limestone formations inside Inner Space Cavern in Georgetown",
      width: 1600,
      height: 1200,
      credit: "Rvassar · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },

  "natural-bridge-wildlife-ranch": {
    summary:
      "A 500-acre drive-through safari beside Natural Bridge Caverns where visitors travel in their own enclosed vehicles among more than 500 animals from dozens of species, then continue through walkable animal areas and optional guided safari experiences.",
    nearestTown: "San Antonio",
    bestSeason:
      "Fall through spring for comfortable temperatures; the ranch recommends morning arrival for animal activity and lighter crowds, especially on weekends, holidays and summer days",
    entryNote:
      "The standard safari is self-guided in your own enclosed vehicle, and visitors may repeat the drive during the same visit but cannot leave and re-enter without new admission. Convertibles and motorcycles are not allowed. Guided safari tours have limited seating and reservations are recommended.",
    highlights: [
      "Self-guided drive-through safari across 500 acres",
      "More than 500 animals representing roughly 40 species",
      "Giraffes, antelope, bison and other free-ranging hoofstock",
      "Walk-A-Bout animal areas included with admission",
      "Direct next-door pairing with Natural Bridge Caverns",
    ],
    body: [
      "Natural Bridge Wildlife Ranch gives the San Antonio–New Braunfels corridor a safari experience built around movement through large ranch pastures rather than rows of zoo exhibits. Visitors drive their own enclosed vehicles through the property while hoofstock and other animals roam around the route, creating an experience that changes with weather, feeding behavior and where the animals choose to gather.",
      "The ranch currently describes more than 500 animals from about 40 species across 500 acres. Giraffes, antelope, bison and other large animals are the visual anchors, but the value is in seeing many species in a broad landscape rather than expecting a guaranteed close-up with any specific animal on a single pass.",
      "One drive typically takes around an hour to an hour and a half, but the ranch allows visitors to repeat the route during the same visit. That makes patience useful: an animal that is distant on the first loop may be active later. The property suggests allowing much more time when the Walk-A-Bout area, meals and multiple passes are included.",
      "Vehicle rules matter because the animals can approach closely. Convertibles and motorcycles are not permitted, doors must remain properly configured and passengers cannot ride in pickup beds or with van doors open. Visitors should follow feeding and staff instructions rather than treating a free-ranging animal encounter like a petting zoo.",
      "Guided safari vehicles provide another way to see the property and add interpretation, but seating is limited and reservations are recommended. Guests with accessibility needs are asked to contact the ranch regarding available guided-tour seating; service animals can also face restrictions because their presence may disrupt wildlife.",
      "Natural Bridge Caverns sits next door, creating one of the easiest two-attraction family days in Central Texas. The better plan is usually one cavern tour plus the wildlife ranch rather than every cave option and multiple safari add-ons in a single rushed day. Gruene and New Braunfels then provide the strongest dinner, river and lodging extension.",
    ],
    managingAuthority: "Natural Bridge Wildlife Ranch",
    officialUrl: "https://www.wildliferanchtexas.com/",
    sourceCheckedAt: "2026-08-17",
    county: "Comal",
    address: "26515 Natural Bridge Caverns Road, San Antonio, TX 78266",
    directions:
      "The ranch is north-east of San Antonio and immediately adjacent to Natural Bridge Caverns. Driving is required for the standard safari, so arrive with adequate fuel and an enclosed vehicle that meets current ranch rules.",
    accessibilityNotes:
      "The self-guided safari is experienced from a visitor's own vehicle. Guided safari seating is limited, and the ranch asks guests with ADA needs to contact staff to confirm available arrangements. Service-animal access is restricted in areas where an animal could disrupt the wildlife collection.",
    areaGuide: {
      intro:
        "The ranch is part of the same Natural Bridge destination cluster as the caverns, positioned between San Antonio and New Braunfels. The strongest trip combines safari, one cave experience and a separate Gruene/New Braunfels evening or river day.",
      nearbyAttractions: items(
        ["Natural Bridge Caverns", "Next door", "Guided limestone cave tours make the most obvious same-day pairing.", "/destination/natural-bridge-caverns"],
        ["Gruene Historic District", "About 20 miles north-east", "Historic buildings, live music and Guadalupe River culture create an easy evening extension.", "/destination/gruene-historic-district"],
        ["New Braunfels", "About 15–20 miles north-east", "River recreation, German-Texan heritage and family attractions broaden the trip."],
        ["Canyon Lake", "About 25 miles north", "Reservoir scenery and Hill Country recreation provide an outdoor alternative to ticketed attractions."]
      ),
      foodAndDrink: items(
        ["Natural Bridge area", "Immediate", "On-site and nearby casual food is easiest during a full safari-and-cavern day."],
        ["New Braunfels", "North-east", "A broad restaurant scene works well before or after river and historic-town stops."],
        ["Gruene", "About 20 miles north-east", "Restaurants and live music make the historic district the strongest evening destination."],
        ["North San Antonio", "South-west", "Large restaurant clusters serve travelers returning toward the city."]
      ),
      lodging: items(
        ["New Braunfels", "About 15–20 miles north-east", "A practical base for the ranch, caverns, rivers and Gruene."],
        ["Gruene", "About 20 miles north-east", "Historic inns and river-oriented lodging add more character to a weekend."],
        ["North San Antonio", "South-west", "The widest nearby hotel inventory supports a larger San Antonio itinerary."],
        ["Hill Country rentals", "Surrounding area", "Cabins and vacation rentals create a quieter rural base between the cities."]
      ),
      neighborhoods: items(
        ["New Braunfels", "North-east", "German-Texan history and river recreation make the nearest larger town a destination in its own right."],
        ["Gruene", "North-east", "A compact historic district around Gruene Hall and the Guadalupe River is ideal for evenings."],
        ["Garden Ridge", "Nearby", "A smaller community provides local services between the attraction cluster and I-35."],
        ["North San Antonio", "South-west", "Modern suburban districts form the largest lodging and dining base close to Natural Bridge."]
      ),
      familyStops: items(
        ["Natural Bridge Caverns", "Next door", "Choose one developed cave tour to complement the drive-through safari.", "/destination/natural-bridge-caverns"],
        ["Walk-A-Bout area", "At the ranch", "Walkable animal exhibits and play-oriented spaces extend the visit beyond the vehicle."],
        ["Schlitterbahn New Braunfels", "About 20 miles north-east", "The seasonal water park can anchor a separate family day."],
        ["Landa Park", "New Braunfels", "Playgrounds, spring-fed water and green space offer a lower-key family stop."]
      ),
      sideTrips: items(
        ["Gruene Historic District", "About 20 miles north-east", "Add music, restaurants and historic architecture after the safari.", "/destination/gruene-historic-district"],
        ["San Antonio River Walk", "About 30 miles south-west", "Use a separate day for San Antonio's downtown pedestrian district.", "/destination/san-antonio-river-walk"],
        ["Canyon Lake", "About 25 miles north", "Reservoir recreation and Hill Country scenery create an outdoors-focused extension."],
        ["San Marcos", "About 30 miles north-east", "Spring-fed river recreation and a walkable downtown fit travelers continuing up I-35."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Grazing_at_the_Natural_Bridge_Wildlife_Ranch_(3893425144).jpg?width=1600",
      alt: "Grazing animals in open pasture at Natural Bridge Wildlife Ranch near San Antonio",
      width: 1600,
      height: 1200,
      credit: "jdeeringdavis · CC BY 2.0 · Wikimedia Commons",
    },
  },

  "lady-bird-johnson-wildflower-center": {
    summary:
      "The University of Texas at Austin's native-plant botanical garden in South Austin, where designed gardens, prairie restoration, an arboretum, family garden and nature trails show how Texas wildflowers and native landscapes can be beautiful, resilient and ecologically useful year-round.",
    nearestTown: "Austin",
    bestSeason:
      "Spring for wildflowers, fall for comfortable trails and native grasses, and year-round for designed native gardens; bloom timing always depends on weather rather than a fixed calendar date",
    entryNote:
      "The Wildflower Center is ticketed, and advance purchase can simplify busy seasonal visits. Special programs and evening events may use separate schedules or tickets. Check what is blooming and the current visitor calendar before making a flower-specific trip.",
    highlights: [
      "Texas native-plant gardens and ecological landscape design",
      "Seasonal wildflower displays and bluebonnet areas",
      "Texas Arboretum and walking trails",
      "Luci and Ian Family Garden",
      "Observation tower, architecture and South Austin Hill Country setting",
    ],
    body: [
      "The Lady Bird Johnson Wildflower Center is more useful than a seasonal bluebonnet stop. Founded from Lady Bird Johnson's commitment to native plants and now part of the University of Texas at Austin, the Center combines a public botanical garden with research, conservation, ecological design and education.",
      "The central gardens demonstrate how Texas native plants can function in intentional landscapes rather than only in roadside meadows. Visitors move through courtyards, theme gardens and water-conscious plantings that change across the seasons, showing flowers, grasses, shrubs and trees as parts of complete plant communities.",
      "Trails and the Texas Arboretum extend the experience beyond the central architecture. Spring can bring the most famous blooms, but fall seed heads, grasses, wildlife activity and changing foliage make the property worthwhile outside peak wildflower season. Rainfall and temperature determine bloom timing, so current conditions matter more than an old 'best week' recommendation.",
      "Families have a destination within the destination in the Luci and Ian Family Garden, where nature play and hands-on exploration shift the pace away from quiet plant labels. That makes the Center one of Austin's easier nature attractions to use with children while still offering substantial botanical content for adults.",
      "Accessibility is stronger in the developed garden areas than on every natural-surface trail. The central complex, central gardens, arboretum trail and family garden are identified as wheelchair accessible, and wheelchairs can be borrowed at admissions. Visitors planning longer trail loops should still confirm current surfaces and closures before arrival.",
      "South Austin places the Wildflower Center close to other outdoor destinations rather than the city's museum core. Zilker Park and Barton Springs lie farther north, while Hamilton Pool and Dripping Springs lead west into the Hill Country. The Texas State Capitol and Bullock Museum belong on a separate central-Austin day, making the Center a useful anchor for a nature-focused half day.",
    ],
    managingAuthority: "The University of Texas at Austin",
    officialUrl: "https://www.wildflower.org/visit",
    sourceCheckedAt: "2026-08-17",
    county: "Travis",
    address: "4801 La Crosse Avenue, Austin, TX 78739",
    directions:
      "The Wildflower Center is in South Austin near the edge of the Hill Country. Driving is the simplest option for most visitors; allow extra time during major events or spring bloom weekends, when the approach and parking demand can be heavier.",
    accessibilityNotes:
      "The central complex, central gardens, Texas Arboretum trail and Luci and Ian Family Garden are wheelchair accessible, and wheelchairs can be borrowed at no charge at the Admissions Kiosk. Natural-surface trails vary, so confirm current route conditions for a longer outing.",
    areaGuide: {
      intro:
        "The Wildflower Center sits in South Austin, closer to neighborhood parks, the Hill Country edge and Dripping Springs than to the Capitol museum corridor. Pair it with outdoor South Austin stops, then use a separate day for central-city history.",
      nearbyAttractions: items(
        ["Veloway and Circle C parkland", "Nearby", "South Austin trails and open space extend the outdoor day beyond the ticketed garden."],
        ["Barton Springs Pool and Zilker Park", "About 10 miles north", "Spring-fed swimming and Austin's major urban park create a classic nature-and-city pairing."],
        ["Hamilton Pool Preserve", "About 25 miles west", "A reservation-based limestone grotto provides a dramatic Hill Country side trip.", "/destination/hamilton-pool-preserve"],
        ["Texas State Capitol", "About 12 miles north", "The Capitol belongs on a separate central-Austin history day.", "/destination/texas-state-capitol"]
      ),
      foodAndDrink: items(
        ["South Austin / Slaughter Lane", "Nearby", "A broad mix of casual restaurants is convenient before or after the garden."],
        ["South Congress", "About 9 miles north", "Restaurants, cafes and shops provide a distinctly Austin evening district."],
        ["Dripping Springs", "About 20 miles west", "Breweries, distilleries and Hill Country dining work well with a westbound nature day."],
        ["Downtown Austin", "About 12 miles north", "The city's largest dining and nightlife selection is best treated as a separate evening destination."]
      ),
      lodging: items(
        ["South Austin", "Closest urban base", "Hotels and rentals keep the Wildflower Center, Zilker and south-side restaurants convenient."],
        ["Downtown Austin", "About 12 miles north", "The broadest hotel selection works when the Center is one stop in a larger city trip."],
        ["Dripping Springs", "West", "Hill Country inns and rentals support a nature-focused itinerary that also includes Hamilton Pool."],
        ["South Congress", "North", "Boutique lodging and walkable restaurants trade direct proximity for a stronger evening atmosphere."]
      ),
      neighborhoods: items(
        ["South Austin", "Immediate region", "Residential neighborhoods, parks and casual dining give the Center a less-touristed Austin setting."],
        ["Circle C", "Nearby", "Trails and planned green space surround the South Austin edge near the Center."],
        ["South Congress", "North", "Shops, restaurants and historic roadside character provide a lively urban contrast."],
        ["Dripping Springs", "West", "A Hill Country town is the natural gateway toward preserves, wineries and rural lodging."]
      ),
      familyStops: items(
        ["Luci and Ian Family Garden", "At the Center", "Nature play and hands-on exploration make the property substantially more engaging for children."],
        ["Austin Nature & Science Center", "Near Zilker", "Free exhibits and outdoor nature experiences work well with a Barton Springs day."],
        ["Barton Springs and Zilker Park", "North", "Swimming, playgrounds and lawns provide a high-energy complement to garden walking."],
        ["Science Mill", "Johnson City", "Hands-on science can anchor a longer family Hill Country side trip."]
      ),
      sideTrips: items(
        ["Hamilton Pool Preserve", "About 25 miles west", "A reservation-based canyon and grotto add a dramatic natural-landscape day.", "/destination/hamilton-pool-preserve"],
        ["Texas State Capitol", "Central Austin", "Pair native-landscape history with the state's civic landmark on a separate day.", "/destination/texas-state-capitol"],
        ["Bullock Texas State History Museum", "Central Austin", "A statewide history museum provides an indoor cultural counterpoint.", "/destination/bullock-texas-state-history-museum"],
        ["Dripping Springs and Hill Country", "West", "Rural roads, tasting rooms and parks extend the trip beyond Austin's city limits."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Wildflower_Center_cafe_and_tower.jpg?width=1600",
      alt: "Native gardens, cafe buildings and observation tower at the Lady Bird Johnson Wildflower Center",
      width: 1600,
      height: 1067,
      credit: "Dcrjsr · CC BY 3.0 · Wikimedia Commons",
    },
  },

  "gruene-historic-district": {
    summary:
      "A compact National Historic District on the Guadalupe River in New Braunfels where nineteenth-century German-Texan buildings now hold Gruene Hall, shops, restaurants, lodging and live music, preserving the scale of the original township while remaining an active entertainment district.",
    nearestTown: "New Braunfels",
    bestSeason:
      "Spring and fall for comfortable walking and river weather; summer is lively but crowded and hot, while evenings are attractive year-round when live music is part of the plan",
    entryNote:
      "The district itself is free to walk. Gruene's official district site lists free music daily along with ticketed shows and special events, while restaurants, river outfitters and individual attractions operate independently. Popular weekends can fill parking and restaurant capacity, so arrive early when a specific show or meal matters.",
    highlights: [
      "Gruene Hall and its long-running live-music tradition",
      "Walkable nineteenth-century commercial buildings",
      "Guadalupe River access and Hill Country river culture",
      "Locally owned shops and restaurants",
      "Easy connection to New Braunfels, Natural Bridge attractions and Canyon Lake",
    ],
    body: [
      "Gruene Historic District works because it never became a sealed-off museum village. The original community grew around German-Texan settlement, agriculture and the Guadalupe River, declined as economic patterns changed, and later found new life through preservation, music, restaurants and small businesses occupying the same historic buildings.",
      "Gruene Hall is the district's defining landmark. The simple dance hall dates to the nineteenth century and remains an active music venue rather than a preserved stage set. Free daytime or early-evening music often shares the calendar with ticketed shows, so checking the current schedule can determine whether a casual visit becomes a full concert night.",
      "The district is intentionally walkable. Shops, restaurants, historic buildings and music venues sit close enough that moving the car after arrival is usually unnecessary. That compact scale is especially valuable on busy weekends, when the main challenge becomes finding parking before the district fills rather than navigating between attractions.",
      "The Guadalupe River gives Gruene a second identity beyond music. Outfitters and river recreation tie the historic district to tubing, paddling and the broader New Braunfels summer economy. River conditions, weather and seasonal crowds change quickly, so a visitor should treat a water day and a shopping-and-music day as related but not interchangeable plans.",
      "Modern commerce is part of Gruene's preservation model. Historic buildings now hold locally owned shops, lodging and restaurants, which keeps them in active use. The result can feel polished and tourist-oriented, but the architecture, street scale and Hall remain tangible links to the original settlement rather than decorative reproductions.",
      "Gruene is also ideally placed for a larger Comal County itinerary. New Braunfels is minutes away, Natural Bridge Caverns and Wildlife Ranch sit south-west, and Canyon Lake lies north-west in the Hill Country. That allows a weekend to combine music, river recreation, caves and wildlife without returning to San Antonio after every stop.",
    ],
    officialUrl: "https://www.gruenetexas.com/",
    sourceCheckedAt: "2026-08-17",
    county: "Comal",
    address: "1601 Hunter Road, New Braunfels, TX 78130",
    directions:
      "Gruene is on the north side of New Braunfels along the Guadalupe River. The historic district is compact and best explored on foot after parking; arrive early on concert nights, summer weekends and major event dates when lots and nearby streets fill quickly.",
    accessibilityNotes:
      "The district mixes historic buildings, modern businesses and outdoor river terrain, so accessibility varies by property. Visitors who need step-free venue access or accessible concert seating should confirm directly with the specific business or Gruene Hall before arrival.",
    areaGuide: {
      intro:
        "Gruene is essentially a neighborhood destination within New Braunfels, with dining, music and lodging concentrated in a few walkable blocks. The river and central New Braunfels expand the immediate day, while Natural Bridge and Canyon Lake make the strongest side trips.",
      nearbyAttractions: items(
        ["Gruene Hall", "In the district", "The active historic dance hall is Gruene's signature music and cultural landmark."],
        ["Guadalupe River", "Beside the district", "River access, outfitters and seasonal recreation connect Gruene directly to New Braunfels' water culture."],
        ["Downtown New Braunfels", "About 3 miles south", "Historic streets, museums, restaurants and the Comal River broaden the trip beyond Gruene."],
        ["Natural Bridge Caverns", "About 20 miles south-west", "A major guided cave attraction provides the strongest half-day excursion.", "/destination/natural-bridge-caverns"]
      ),
      foodAndDrink: items(
        ["Gruene Historic District", "Walkable", "Restaurants, bars and cafes occupy historic buildings throughout the core."],
        ["Downtown New Braunfels", "About 3 miles south", "A larger local dining scene gives visitors options beyond the most crowded Gruene blocks."],
        ["New Braunfels river corridor", "Nearby", "Seasonal casual dining and river-oriented businesses are convenient during summer recreation days."],
        ["San Marcos", "About 20 miles north-east", "A college-town restaurant and nightlife scene works for travelers continuing up I-35."]
      ),
      lodging: items(
        ["Gruene Historic District", "Walkable", "Historic inns and guest lodging let visitors stay close to music and restaurants without driving afterward."],
        ["New Braunfels", "About 3 miles south", "The broadest local hotel inventory works for families and river trips."],
        ["Guadalupe River rentals", "Surrounding area", "Cabins and vacation rentals emphasize river access and group stays."],
        ["Canyon Lake", "North-west", "Lake-area lodging suits travelers extending the weekend into Hill Country recreation."]
      ),
      neighborhoods: items(
        ["Gruene", "Immediate area", "Historic commercial blocks, music venues and river access form a compact destination district."],
        ["Downtown New Braunfels", "South", "German-Texan civic history and active local businesses create a distinct second historic center."],
        ["Landa Park / Comal River", "South-west", "Spring-fed water and parkland give New Braunfels a family-oriented outdoor core."],
        ["Canyon Lake", "North-west", "Reservoir communities shift the trip from historic-town activity toward Hill Country recreation."]
      ),
      familyStops: items(
        ["Landa Park", "New Braunfels", "Playgrounds, spring-fed water, picnic areas and a miniature train make an easy family outing."],
        ["Schlitterbahn New Braunfels", "About 3 miles south", "The large seasonal water park can anchor a separate summer family day."],
        ["Natural Bridge Wildlife Ranch", "About 20 miles south-west", "A drive-through safari adds a completely different family attraction.", "/destination/natural-bridge-wildlife-ranch"],
        ["Natural Bridge Caverns", "About 20 miles south-west", "A developed cave tour pairs naturally with the wildlife ranch.", "/destination/natural-bridge-caverns"]
      ),
      sideTrips: items(
        ["Natural Bridge Caverns", "About 20 miles south-west", "Add a guided limestone cave experience to the weekend.", "/destination/natural-bridge-caverns"],
        ["Natural Bridge Wildlife Ranch", "About 20 miles south-west", "A self-drive safari makes a strong family companion to Gruene.", "/destination/natural-bridge-wildlife-ranch"],
        ["Canyon Lake", "About 20 miles north-west", "Reservoir scenery and outdoor recreation extend the trip into the Hill Country."],
        ["San Antonio", "About 35 miles south-west", "The Alamo and River Walk can anchor a separate urban-history day.", "/destination/the-alamo"]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Gruene_hall.jpg?width=1600",
      alt: "Historic Gruene Hall in the Gruene Historic District of New Braunfels",
      width: 1600,
      height: 829,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedTopAttractionsBatch5(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? {
        ...destination,
        ...override,
        hero: { ...destination.hero, ...override.hero },
      }
    : destination;
}
