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
  "cadillac-ranch": {
    summary:
      "Amarillo's landmark roadside-art installation of ten vintage Cadillacs buried nose-first in a Panhandle field, created by Ant Farm in 1974 and transformed by decades of visitor-applied paint into an ever-changing symbol of Route 66 car culture.",
    nearestTown: "Amarillo",
    bestSeason:
      "Spring and fall for comfortable temperatures; sunrise and late afternoon give the flat Panhandle landscape its best light, while rain can turn the dirt approach muddy",
    entryNote:
      "Cadillac Ranch is free to visit and sits in an open field reached on foot from the Interstate 40 frontage road. The artwork is outdoors with no conventional visitor center, so bring water, prepare for wind or mud, and use the available trash receptacles rather than leaving paint cans or litter in the field.",
    highlights: [
      "Ten Cadillacs buried nose-first in a Panhandle field",
      "Visitor-applied spray paint that continually changes the artwork",
      "A defining roadside-art stop on the Route 66 corridor",
      "Open prairie setting west of Amarillo",
      "Easy pairing with Amarillo's Route 66 and Panhandle attractions",
    ],
    body: [
      "Cadillac Ranch is one of those Texas landmarks whose physical footprint is small but whose cultural footprint is enormous. Created in 1974 by the art group Ant Farm for Amarillo businessman Stanley Marsh 3, the installation places ten Cadillacs nose-first in the earth at a uniform angle, turning a sequence of American automobiles into a piece of land art beside the highway.",
      "The cars were chosen to trace changes in Cadillac tail fins and styling, but the installation stopped behaving like a pristine sculpture long ago. Visitors began adding graffiti, and layers of paint now change constantly. That participation is part of the experience, but it also creates a responsibility: cans, caps and other trash should leave with the visitor or go into the receptacles near the access point rather than becoming part of the field.",
      "There is no elaborate arrival sequence. Travelers pull off the Interstate 40 frontage road, park near the roadside access and walk across the open ground to the cars. That simplicity is part of the appeal, but Panhandle weather matters. Wind can be intense, summer sun is exposed and recent rain can turn the dirt path and field into sticky mud.",
      "The installation makes the most sense in the larger Route 66 story. Amarillo became a major stop on the Mother Road, and the city's surviving neon, motels, diners and Sixth Avenue historic district provide a useful counterpoint to the intentionally surreal cars west of town. The Ranch is a quick stop; the Route 66 context is what can turn it into a fuller day.",
      "Photography changes dramatically with light and weather. Sunrise and sunset stretch long shadows across the flat horizon, while storm clouds can make the bright paint look even more saturated. Because there are no timed tickets or indoor exhibits, Cadillac Ranch is also one of the easiest major attractions on this list to fit around another Panhandle destination.",
      "Palo Duro Canyon is the strongest nearby anchor for a longer trip. Spend a morning or afternoon in the canyon, then use Amarillo for Route 66, food and Cadillac Ranch. The Panhandle-Plains Historical Museum in Canyon adds the regional history that neither the roadside art nor canyon trails explain on their own.",
    ],
    officialUrl: "https://www.visitamarillo.com/listing/cadillac-ranch/625/",
    sourceCheckedAt: "2026-08-17",
    county: "Potter",
    address: "13651 I-40 Frontage Road, Amarillo, TX 79124",
    directions:
      "Cadillac Ranch is west of Amarillo on the south Interstate 40 frontage road near the Arnot Road exit. Parking is informal near the roadside entrance and the cars are reached by walking across an open field; use caution entering and leaving the frontage road.",
    accessibilityNotes:
      "The artwork is reached across an unpaved field rather than a paved museum campus, so mud, ruts and uneven ground can make access difficult for some mobility devices. There is no conventional indoor visitor facility at the installation.",
    areaGuide: {
      intro:
        "Cadillac Ranch is a short roadside stop, so the surrounding Amarillo and Canyon attractions are what make the trip substantial. Route 66 history, museums, family attractions and Palo Duro Canyon can all fit naturally around the installation.",
      nearbyAttractions: items(
        ["Amarillo Route 66 Historic District", "About 8 miles east", "Historic Sixth Avenue preserves neon, shops, restaurants and the roadside character that gives Cadillac Ranch its strongest context."],
        ["Jack Sisemore RV Museum", "Amarillo", "Vintage travel trailers and RV history offer another playful look at American road travel."],
        ["Panhandle-Plains Historical Museum", "About 25 miles south in Canyon", "The region's major history museum adds archaeology, ranching, petroleum, transportation and art."],
        ["Palo Duro Canyon State Park", "About 35 miles south-east", "Red-rock canyon scenery and trails make the strongest major-attraction pairing.", "/destination/palo-duro-canyon-state-park"]
      ),
      foodAndDrink: items(
        ["Route 66 / Sixth Avenue", "East Amarillo", "Local restaurants, bars and cafes make the historic road district the most atmospheric meal stop."],
        ["West Amarillo / I-40", "Closest broad selection", "A large concentration of casual restaurants makes this practical before or after the Ranch."],
        ["Downtown Amarillo", "About 10 miles east", "Restaurants and entertainment provide a city-center alternative to highway dining."],
        ["Canyon", "South of Amarillo", "Local cafes and restaurants work well when Cadillac Ranch is paired with Palo Duro or the Panhandle-Plains museum."]
      ),
      lodging: items(
        ["West Amarillo", "Closest", "Hotels along I-40 keep Cadillac Ranch convenient and offer easy highway access for a Panhandle road trip."],
        ["Downtown Amarillo", "About 10 miles east", "A central base is better for restaurants, events and city attractions."],
        ["Route 66 corridor", "East-central Amarillo", "Historic-road atmosphere suits travelers who want the Amarillo portion of the trip to feel less like an interstate stop."],
        ["Canyon", "About 25 miles south", "A smaller-town base works well for travelers prioritizing Palo Duro Canyon."]
      ),
      neighborhoods: items(
        ["Route 66 Historic District", "East-central Amarillo", "Historic commercial blocks and neon connect the installation to the Mother Road story."],
        ["Downtown Amarillo", "East", "Civic buildings, entertainment and restaurants provide a broader urban context."],
        ["Canyon", "South", "A university town and regional-history hub is the natural gateway to Palo Duro Canyon."],
        ["West Amarillo", "Immediate service area", "Modern hotels, restaurants and highway services surround the approach to Cadillac Ranch."]
      ),
      familyStops: items(
        ["Don Harrington Discovery Center", "Amarillo", "Hands-on science and space exhibits provide a substantial indoor family stop."],
        ["Amarillo Zoo", "North Amarillo", "A manageable zoo visit can complement a quick roadside-art stop."],
        ["Panhandle-Plains Historical Museum", "Canyon", "Large collections and varied exhibits work well for families needing a midday indoor break."],
        ["Palo Duro Canyon overlooks", "South-east", "Families can experience the canyon's scale without committing to a long exposed hike.", "/destination/palo-duro-canyon-state-park"]
      ),
      sideTrips: items(
        ["Palo Duro Canyon State Park", "About 35 miles south-east", "Build the Panhandle trip around one of Texas's largest scenic landscapes.", "/destination/palo-duro-canyon-state-park"],
        ["Caprock Canyons State Park", "About 100 miles south-east", "Bison and rugged red-rock country reward travelers continuing beyond Amarillo."],
        ["Lake Meredith National Recreation Area", "About 55 miles north-east", "Reservoir scenery and hiking add a very different Panhandle landscape."],
        ["Alibates Flint Quarries National Monument", "North-east of Amarillo", "Archaeology and Indigenous use of high-quality flint deepen the human history of the plains."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Cadillac_Ranch,_Amarillo,_TX,_US.jpg?width=1600",
      alt: "Graffiti-covered Cadillacs buried nose-first at Cadillac Ranch west of Amarillo",
      width: 1600,
      height: 1068,
      credit: "Judson McCranie · CC BY-SA 3.0 · Wikimedia Commons",
    },
  },

  "natural-bridge-caverns": {
    summary:
      "A major Hill Country cave attraction north-east of San Antonio where guided routes descend through enormous limestone rooms, stalactites, stalagmites and flowstone, with multiple cavern experiences and above-ground family attractions surrounding the natural limestone bridge that gave the site its name.",
    nearestTown: "San Antonio",
    bestSeason:
      "Year-round underground, where cavern temperatures stay comparatively stable; spring and fall are most comfortable for combining cave tours with above-ground attractions",
    entryNote:
      "Cavern tours are ticketed and scheduled, and buying ahead is recommended for the best choice of tour time. Standard tours include stairs, steep grades and damp surfaces, while specialty adventure tours have greater physical requirements. Choose a tour based on mobility, age and comfort underground before purchasing.",
    highlights: [
      "Discovery Tour through the original cavern rooms",
      "Hidden Wonders tour and large underground chambers",
      "Natural limestone bridge at the cavern entrance",
      "Stalactites, stalagmites, flowstone and active cave geology",
      "Above-ground ropes, maze and family adventure attractions",
    ],
    body: [
      "Natural Bridge Caverns turns one of Central Texas's most impressive limestone cave systems into a full-day attraction without losing sight of the geology. The natural bridge above ground gave the property its name, but the real scale becomes apparent underground, where guided routes descend into chambers shaped by water moving through limestone over immense spans of time.",
      "The Discovery Tour is the classic introduction. It travels through the first major chambers explored at the site and uses guided stops to explain stalactites, stalagmites, flowstone and other formations. The route is substantial rather than a flat museum walk: it covers steep and wet surfaces, includes stairs and descends deep enough that footwear and mobility should be considered before booking.",
      "Hidden Wonders offers a second developed-cavern experience with different rooms, lighting and a mechanical-assisted return toward the surface. Visitors who genuinely want a cave-focused day can combine tours, while families with younger children or limited time are usually better served by choosing one underground route and leaving room for the above-ground attractions.",
      "Natural Bridge Caverns also offers physically demanding adventure experiences that are very different from the developed walking tours. Those involve crawling, climbing and muddy passages and should be treated as specialty activities rather than an automatic upgrade. Reading the physical requirements before reserving is especially important for mixed-age groups.",
      "The site sits in a useful position between San Antonio and New Braunfels. Natural Bridge Wildlife Ranch is next door, making the cave-and-safari combination one of the easiest full family days in the region. The attractions are popular, however, and trying to squeeze both major cave tours plus the wildlife ranch into one day can turn a good itinerary into a rushed one.",
      "For a broader trip, the caverns can connect San Antonio's urban history with the Hill Country and Guadalupe River corridor. Spend separate days on the Alamo and River Walk, Natural Bridge, and New Braunfels/Gruene rather than repeatedly driving back and forth between timed attractions.",
    ],
    managingAuthority: "Natural Bridge Caverns",
    officialUrl: "https://naturalbridgecaverns.com/plan-your-trip/",
    sourceCheckedAt: "2026-08-17",
    reservationUrl: "https://naturalbridgecaverns.com/plan-your-trip/",
    county: "Comal",
    address: "26495 Natural Bridge Caverns Road, San Antonio, TX 78266",
    directions:
      "Natural Bridge Caverns is north-east of San Antonio near the Comal County line and west of Interstate 35. Driving is the practical way to reach the attraction; allow extra time on busy weekends and arrive before the scheduled tour so parking and check-in do not consume the entry window.",
    accessibilityNotes:
      "The standard cavern tours include stairs, slopes and damp walking surfaces, so they are not equivalent to an accessible level-floor attraction. Visitors with mobility limitations or other access needs should contact Natural Bridge Caverns before purchasing to identify the most appropriate above-ground and underground experiences.",
    areaGuide: {
      intro:
        "Natural Bridge sits between San Antonio, New Braunfels and the Hill Country, so the strongest itinerary combines one cavern experience with either the adjacent wildlife ranch or a separate river-and-historic-town day rather than returning repeatedly to central San Antonio.",
      nearbyAttractions: items(
        ["Natural Bridge Wildlife Ranch", "Next door", "A drive-through safari attraction makes the easiest same-day family pairing."],
        ["Bracken Cave Preserve area", "Nearby Hill Country", "The region is known for major bat habitat, with access limited to authorized programs and seasonal opportunities."],
        ["Gruene Historic District", "About 20 miles north-east", "Historic buildings, music and Guadalupe River culture create a strong afternoon or evening extension."],
        ["San Antonio", "About 30 miles south-west", "The Alamo and River Walk anchor a separate urban-history day.", "/destination/the-alamo"]
      ),
      foodAndDrink: items(
        ["Natural Bridge Caverns property", "On site", "Casual food is useful when the day includes multiple scheduled cave or adventure activities."],
        ["New Braunfels", "About 15–20 miles north-east", "A broad restaurant selection works well with Gruene or river activities."],
        ["Gruene", "About 20 miles north-east", "Restaurants and live-music venues turn a cave day into an easy evening outing."],
        ["North San Antonio / Stone Oak", "South-west", "Large restaurant clusters provide convenient options for travelers returning toward San Antonio."]
      ),
      lodging: items(
        ["New Braunfels", "About 15–20 miles north-east", "A practical base for combining the caverns with Gruene, Schlitterbahn and the Guadalupe or Comal rivers."],
        ["North San Antonio", "About 20–30 miles south-west", "A broad hotel selection works for travelers using the caverns as one day of a larger San Antonio trip."],
        ["Gruene", "About 20 miles north-east", "Historic inns and river-oriented lodging add more character than a highway hotel."],
        ["Hill Country rentals", "Surrounding area", "Cabins and vacation rentals can turn the attraction into part of a quieter rural weekend."]
      ),
      neighborhoods: items(
        ["New Braunfels", "North-east", "German-Texan heritage, river recreation and a historic center make the nearest substantial town a destination of its own."],
        ["Gruene", "North-east", "A compact historic district centered on music, shops and the Guadalupe River is ideal after a daytime tour."],
        ["North San Antonio", "South-west", "Modern suburban districts provide the largest service and lodging base close to the caverns."],
        ["Garden Ridge", "Nearby", "A smaller community near the attraction offers a quieter local context between I-35 and the cave property."]
      ),
      familyStops: items(
        ["Natural Bridge Wildlife Ranch", "Next door", "Free-ranging animals viewed from a vehicle create a completely different family experience after the cave."],
        ["Above-ground cavern attractions", "On site", "Maze, ropes and other activities help families balance the structured pace of a guided underground tour."],
        ["Schlitterbahn New Braunfels", "About 20 miles north-east", "A major seasonal water park can anchor a separate family day."],
        ["The DoSeum", "San Antonio", "A hands-on children's museum is a good indoor option on a longer San Antonio stay."]
      ),
      sideTrips: items(
        ["Gruene Historic District", "About 20 miles north-east", "Add music, historic buildings and the Guadalupe River to the same regional trip."],
        ["San Antonio River Walk", "About 30 miles south-west", "Use a separate day for the city's best-known pedestrian and dining district.", "/destination/san-antonio-river-walk"],
        ["San Antonio Missions National Historical Park", "South San Antonio", "The mission corridor adds a deep history layer to a Hill Country-and-caverns trip.", "/destination/san-antonio-missions-national-historical-park"],
        ["Canyon Lake", "About 25 miles north", "Reservoir recreation and Hill Country scenery provide an outdoor extension beyond the commercial attractions."]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Natural_bridge_caverns_bridge.jpg?width=1600",
      alt: "The natural limestone bridge above the entrance to Natural Bridge Caverns in Comal County",
      width: 1600,
      height: 1067,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },

  "hamilton-pool-preserve": {
    summary:
      "A protected Hill Country canyon and collapsed limestone grotto west of Austin, where Hamilton Creek drops into a jade-green pool beneath a broad rock overhang, reached by a rugged trail and managed through required reservations to protect sensitive habitat.",
    nearestTown: "Dripping Springs",
    bestSeason:
      "Spring and fall for comfortable hiking; summer reservations are popular but swimming is never guaranteed because water quality and safety conditions can change",
    entryNote:
      "Reservations are required to visit Hamilton Pool Preserve. A reservation guarantees access to the preserve, not swimming: water quality, rainfall and safety conditions determine whether swimming is allowed. The route to the pool includes rough, rocky terrain, and visitors should check the current preserve status before leaving home.",
    highlights: [
      "Collapsed limestone grotto and overhanging rock shelter",
      "Hamilton Creek waterfall and natural pool",
      "Protected Balcones Canyonlands Preserve habitat",
      "Short but rugged canyon hike",
      "Easy pairing with Reimers Ranch and Dripping Springs Hill Country stops",
    ],
    body: [
      "Hamilton Pool Preserve looks like a swimming hole in photographs, but it is first a protected natural area. The signature pool formed where erosion caused a limestone grotto to collapse, leaving a broad rock shelter and steep canyon around Hamilton Creek. Water spills over the remaining limestone lip into the pool below, creating one of the most recognizable natural scenes in Central Texas.",
      "The reservation system is essential to the experience. Hamilton Pool became so popular that unmanaged visitation damaged the surrounding habitat, and Travis County now limits access to protect the preserve. Visitors should treat the reservation as a hiking-and-sightseeing reservation rather than a guaranteed swim ticket because bacteria levels, recent rainfall and other safety conditions can close the water even when the preserve remains open.",
      "The hike is short in mileage but not a paved stroll. The route descends over rocky Hill Country terrain into the canyon, and wet surfaces can be slick. That matters for footwear, young children and anyone with mobility limitations. The dramatic overhang also has areas where rockfall risk has affected trail access, so posted closures should be taken literally rather than treated as optional detours.",
      "The preserve's conservation role extends beyond the pool. Hamilton Pool is part of the Balcones Canyonlands Preserve system, which protects habitat for endangered species and sensitive Hill Country plant communities. That broader mission explains why pets, crowd levels and access are more tightly controlled than at an ordinary county swimming area.",
      "A visit can be satisfying even when swimming is closed. The canyon, waterfall, rock shelter and vegetation remain the core natural features, and the limited reservation windows encourage visitors to slow down rather than race through. Checking the day's swimming and weather status before the drive prevents the pool from becoming the only measure of whether the trip was worthwhile.",
      "Hamilton Pool works best in a wider Dripping Springs itinerary. Milton Reimers Ranch Park is just down Hamilton Pool Road and offers extensive outdoor recreation without the same reservation model, while wineries, distilleries and small-town dining spread through the surrounding Hill Country. Austin is close enough for lodging, but staying west of the city can reduce traffic and keep the trip focused on the landscape.",
    ],
    managingAuthority: "Travis County Parks",
    officialUrl: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve",
    sourceCheckedAt: "2026-08-17",
    reservationUrl: "https://parks.traviscountytx.gov/parks/hamilton-pool-preserve",
    county: "Travis",
    address: "24300 Hamilton Pool Road, Dripping Springs, TX 78620",
    directions:
      "Hamilton Pool is west of Austin near Dripping Springs on Hamilton Pool Road. Rural roads and weekend Hill Country traffic can slow the approach, so leave enough time to reach the preserve within the reserved entry period rather than planning around an ideal map estimate.",
    accessibilityNotes:
      "The primary route descends into a rocky canyon and is not a level paved trail. Visitors with mobility limitations should review current Travis County access information before booking and consider nearby Hill Country parks with more suitable developed facilities when the terrain is not workable.",
    areaGuide: {
      intro:
        "Hamilton Pool sits in western Travis County among ranchland, preserves and Hill Country recreation. Dripping Springs is the closest town hub, while Reimers Ranch provides the most natural outdoor companion and Austin supplies the largest lodging and museum base.",
      nearbyAttractions: items(
        ["Milton Reimers Ranch Park", "A few miles west", "A large Travis County park offers hiking, climbing, river access and open-space recreation without Hamilton Pool's reservation model."],
        ["Westcave Preserve", "Nearby", "Guided conservation-focused experiences explore another dramatic Hill Country canyon system."],
        ["Dripping Springs", "About 13 miles south-east", "The town provides restaurants, shops and a practical service base for a western Travis County day."],
        ["Pedernales Falls State Park", "About 30 miles west", "Limestone river scenery and hiking make a strong larger-park extension to the trip."]
      ),
      foodAndDrink: items(
        ["Dripping Springs", "About 13 miles south-east", "Restaurants, breweries and distilleries form the largest nearby dining cluster."],
        ["Hamilton Pool Road corridor", "Nearby", "Wineries, tasting rooms and rural food stops are scattered along the route; check hours before relying on one."],
        ["Bee Cave", "About 15 miles east", "A broad suburban restaurant selection is practical for travelers returning toward Austin."],
        ["Johnson City", "About 30 miles west", "Hill Country restaurants and tasting rooms work well on a longer westbound loop."]
      ),
      lodging: items(
        ["Dripping Springs", "Closest town base", "Hotels, inns and rentals keep visitors near Hamilton Pool while avoiding central Austin traffic."],
        ["Hill Country cabins and ranch stays", "Surrounding area", "Rural lodging preserves the landscape-focused feel of the trip."],
        ["Bee Cave / Lakeway", "East", "A larger hotel inventory is convenient for travelers combining the preserve with Lake Travis."],
        ["Austin", "About 30 miles east", "The broadest lodging selection works when Hamilton Pool is one day of a larger city trip."]
      ),
      neighborhoods: items(
        ["Dripping Springs", "South-east", "A fast-growing Hill Country town serves as the local restaurant, service and events hub."],
        ["Lake Travis / Bee Cave", "East", "Reservoir-oriented communities provide lodging, dining and access to western Austin."],
        ["Johnson City", "West", "A smaller historic town makes a natural stop on a Hill Country road-trip loop."],
        ["Southwest Austin", "Farther east", "The city edge provides easy access back toward major Austin attractions without staying downtown."]
      ),
      familyStops: items(
        ["Milton Reimers Ranch Park", "Nearby", "More space and flexible access can make Reimers Ranch easier for families when Hamilton Pool's terrain or swimming status is limiting."],
        ["Dripping Springs parks", "In town", "Local parks give younger children a simple break after a structured preserve reservation."],
        ["Science Mill", "Johnson City", "Hands-on science exhibits make a strong indoor Hill Country family side trip."],
        ["Lady Bird Johnson Wildflower Center", "South Austin", "Native gardens and family-friendly trails create an accessible nature-focused extension."]
      ),
      sideTrips: items(
        ["Pedernales Falls State Park", "About 30 miles west", "Explore broad limestone river shelves and Hill Country trails on a separate half day."],
        ["Lady Bird Johnson Wildflower Center", "About 25 miles east", "Native Texas plants and designed landscapes complement Hamilton Pool's protected canyon ecology."],
        ["Johnson City", "About 30 miles west", "Historic sites, the Science Mill and Hill Country food can extend the trip toward the LBJ corridor."],
        ["Austin", "About 30 miles east", "The Capitol, museums and city attractions make a separate urban day after the Hill Country preserve.", "/destination/texas-state-capitol"]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hamilton_Pool.jpeg?width=1600",
      alt: "Hamilton Pool Preserve's limestone grotto, waterfall and turquoise-green pool",
      width: 1600,
      height: 1067,
      credit: "Trey Perry · CC BY 3.0 · Wikimedia Commons",
    },
  },

  "bullock-texas-state-history-museum": {
    summary:
      "Austin's state history museum beside the Capitol Mall, using three floors of artifacts, immersive galleries, films and changing exhibitions to connect Indigenous Texas, exploration, revolution, statehood, ranching, energy, immigration and modern life into one broad statewide narrative.",
    nearestTown: "Austin",
    bestSeason:
      "Year-round; especially useful during summer heat or wet weather, and easy to combine with the Capitol and University of Texas museums in any season",
    entryNote:
      "Museum admission covers the main galleries, while IMAX and Texas Spirit Theater films use separate tickets. Buying ahead is encouraged when a specific film or visit time matters, though onsite ticketing is also available. Allow at least two to three hours for a first gallery visit.",
    highlights: [
      "Three floors tracing major eras of Texas history",
      "La Belle shipwreck artifacts and colonial-era interpretation",
      "Texas Revolution, statehood and twentieth-century galleries",
      "IMAX and Texas Spirit Theater experiences",
      "Capitol Mall location within walking distance of the Texas State Capitol",
    ],
    body: [
      "The Bullock Texas State History Museum is most useful as a framework for the rest of TexasDefined. Its galleries move across thousands of years and a huge geography, giving visitors enough context to understand why missions, cattle trails, oil fields, ports, migration routes and political institutions developed where they did.",
      "The museum's strongest objects are tied to stories that continue elsewhere in the state. Artifacts from La Belle, the ship lost during La Salle's failed French colonial effort on the Texas coast, turn an abstract seventeenth-century episode into something physical. Later galleries move through Spanish and Mexican Texas, revolution, republic, statehood and the transformations of ranching, railroads and industry.",
      "The building is organized so visitors can follow the broad chronology but still stop deeply in subjects that matter to them. That is a better strategy than trying to read every panel. Families may spend more time with interactive and immersive areas, while history-focused adults can concentrate on artifacts, political change and the relationship between Texas and wider national events.",
      "Film experiences are separate from the standard gallery ticket and should be treated as optional additions rather than assumed parts of admission. The IMAX and Texas Spirit Theater can extend the visit well beyond a couple of hours, so checking show times before arrival helps prevent a rushed final floor or missed reservation elsewhere in Austin.",
      "Accessibility is built deeply into the museum. The Bullock documents wheelchair access throughout its galleries, complimentary wheelchairs, captioning, sensory bags, a lower-sensory Serenity Room and accessible theater seating. Visitors requesting certain accommodations are encouraged to contact the museum in advance so staff can prepare for the visit.",
      "The location makes the Bullock one of the easiest attractions in Austin to cross-link physically. The Texas State Capitol is a short walk south, the Blanton Museum sits nearby and the University of Texas campus continues north. A visitor can build an entire Texas-history day without moving the car, then use a separate day for Barton Springs, the Wildflower Center or farther-flung Hill Country destinations.",
    ],
    managingAuthority: "Texas State Preservation Board",
    officialUrl: "https://www.thestoryoftexas.com/visit/plan-your-visit",
    sourceCheckedAt: "2026-08-17",
    county: "Travis",
    address: "1800 Congress Avenue, Austin, TX 78701",
    directions:
      "The Bullock is on the Capitol Mall immediately north of the Texas State Capitol and south of the University of Texas campus. An underground museum garage provides convenient parking, while buses and the walkable Congress Avenue corridor make it possible to combine several central attractions without moving the car.",
    accessibilityNotes:
      "The galleries and theaters have accessible routes, complimentary wheelchairs are available, sensory bags and a Serenity Room support visitors with sensory needs, and captioning or listening devices are available for many media experiences. The museum accepts advance accommodation requests for additional support.",
    areaGuide: {
      intro:
        "The Bullock sits in Austin's compact Capitol–University museum corridor. The Capitol, Blanton and UT campus are walkable, while Downtown, the Red River district and central-city parks expand the day without requiring a long drive.",
      nearbyAttractions: items(
        ["Texas State Capitol", "About a 10-minute walk south", "Free Capitol tours and working legislative chambers create the most natural history-and-government pairing.", "/destination/texas-state-capitol"],
        ["Blanton Museum of Art", "Across the Capitol Mall / UT area", "A major university art museum gives the day a visual-arts component."],
        ["University of Texas campus", "Immediately north", "Campus architecture, museums and public spaces continue the walkable cultural corridor."],
        ["Texas Science & Natural History Museum", "On the UT campus", "Fossils and Texas natural history add a family-friendly science stop nearby."]
      ),
      foodAndDrink: items(
        ["The Drag / West Campus", "North-west", "Casual student-oriented restaurants and cafes are easy to reach from the museum."],
        ["Downtown and Congress Avenue", "South", "A large restaurant selection works well when the day continues toward the Capitol and city center."],
        ["Red River Cultural District", "East", "Live music, bars and casual dining make a strong evening extension."],
        ["East Austin", "Short ride east", "Restaurants and nightlife provide a more neighborhood-oriented finish to a museum day."]
      ),
      lodging: items(
        ["Capitol / Downtown", "Walkable", "The most convenient base for the Bullock, Capitol and central Austin attractions."],
        ["University of Texas area", "North", "Useful for travelers prioritizing campus museums and a quieter evening than Sixth Street."],
        ["Red River / eastern Downtown", "East", "A strong base for live music, Waterloo Park and quick museum access."],
        ["South Congress", "Across the river", "A more lifestyle-oriented base trades walking distance for restaurants, shops and Austin character."]
      ),
      neighborhoods: items(
        ["Capitol Complex", "Immediate area", "Government buildings, the Capitol Mall and museums form Austin's clearest civic district."],
        ["University of Texas / West Campus", "North", "Student life and campus museums create a second walkable district."],
        ["Downtown", "South", "Historic buildings, restaurants, entertainment and the Congress Avenue corridor extend toward Lady Bird Lake."],
        ["Red River", "East", "Music venues and nightlife provide a distinctly Austin counterpoint to daytime history."]
      ),
      familyStops: items(
        ["Texas Science & Natural History Museum", "UT campus", "Dinosaurs, fossils and natural history provide a strong child-friendly companion to the Bullock."],
        ["Waterloo Park", "About a 15-minute walk east", "Lawns, paths and play space give families outdoor downtime between museums."],
        ["Texas State Capitol", "South", "A short tour and the grounds can make government tangible for school-age visitors.", "/destination/texas-state-capitol"],
        ["Barton Springs and Zilker Park", "About 3 miles south-west", "Swimming and park space provide a completely different second half of the day."]
      ),
      sideTrips: items(
        ["Texas State Capitol", "About a 10-minute walk", "Pair statewide history with the building where current Texas government works.", "/destination/texas-state-capitol"],
        ["LBJ Presidential Library", "About 1.5 miles north-east", "Twentieth-century presidential history extends the political story beyond the state level."],
        ["Lady Bird Johnson Wildflower Center", "About 12 miles south", "Native Texas landscapes create an outdoor complement to museum history."],
        ["Hamilton Pool Preserve", "About 30 miles west", "A reservation-based Hill Country preserve gives the trip a major natural-landscape day.", "/destination/hamilton-pool-preserve"]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_state_history_museum.jpg?width=1600",
      alt: "Bullock Texas State History Museum and its large star sculpture in Austin",
      width: 1600,
      height: 1056,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
    },
  },

  "houston-zoo": {
    summary:
      "A major conservation-focused zoo in Hermann Park with modern habitat complexes, more than a century of Houston history and an unusually strong location beside the city's Museum District, making it easy to combine wildlife, science and park time without crossing the metro area.",
    nearestTown: "Houston",
    bestSeason:
      "Fall through spring for comfortable outdoor walking; summer visits are best near opening when temperatures are lower and animals may be more active",
    entryNote:
      "Non-member admission currently uses online date-and-time reservations. Special experiences and seasonal add-ons can require separate tickets. Parking around Hermann Park fills quickly, so reserve admission first and consider METRORail or an early arrival rather than assuming a nearby parking space will be available.",
    highlights: [
      "Galápagos Islands habitat and conservation interpretation",
      "African Forest and large-animal habitats",
      "Texas Wetlands and regional wildlife",
      "Family-focused exhibits and daily animal programming",
      "Hermann Park location beside HMNS and the Museum District",
    ],
    body: [
      "Houston Zoo benefits from being both a major zoological institution and part of a larger urban park. Its animal habitats are spread through Hermann Park rather than isolated in a suburban campus, so a zoo day naturally connects with gardens, lawns, the Museum District and METRORail. That setting makes it one of Houston's easiest major attractions to combine without a long drive.",
      "The newer habitat areas emphasize ecosystems and conservation rather than rows of individual enclosures. The Galápagos Islands complex is one of the clearest examples, using marine and island species to connect animal viewing with the environmental pressures facing a distinctive ecosystem. African Forest and Texas Wetlands broaden the visit across both global and regional wildlife.",
      "A full zoo visit requires more time than the compact map can suggest. Families should identify priority species and keeper programs before entering rather than zigzagging repeatedly across the grounds. Warm weather changes the calculation: early arrival improves both visitor comfort and the chance of seeing animals before midday heat slows activity.",
      "Timed admission is part of the current visitor system for non-members, so spontaneous arrival can be a bad strategy on busy days. Seasonal experiences, carousel rides or special animal programs may also be separate purchases. Confirm the day's offerings before checkout rather than assuming every promoted experience is included in general admission.",
      "The surrounding Museum District gives the zoo unusual itinerary flexibility. The Houston Museum of Natural Science sits across Hermann Park, and the Children's Museum, Museum of Fine Arts and other institutions are nearby. Trying to see the zoo and HMNS completely in one day can still be too much, but families can choose a half-day version of each without moving the car.",
      "Space Center Houston belongs in the same Houston trip but not the same neighborhood plan. NASA sits far to the south-east in Clear Lake and deserves its own timed day. Keeping Hermann Park attractions together and Space Center Houston separate is the simplest way to avoid losing vacation hours in Houston traffic.",
    ],
    managingAuthority: "Houston Zoo",
    officialUrl: "https://www.houstonzoo.org/plan-your-visit/",
    sourceCheckedAt: "2026-08-17",
    reservationUrl: "https://tickets.houstonzoo.org/",
    county: "Harris",
    address: "6200 Hermann Park Drive, Houston, TX 77030",
    directions:
      "The zoo is inside Hermann Park in Houston's Museum District. Parking is shared with a very busy park and museum area; METRORail serves the district, and arriving near opening can reduce both traffic and parking pressure.",
    accessibilityNotes:
      "The zoo operates on paved public pathways with accessibility services available through guest support, but individual animal experiences can have separate participation requirements. Visitors with specific mobility, sensory or communication needs should review the zoo's current accessibility information before reserving add-ons.",
    areaGuide: {
      intro:
        "Houston Zoo is embedded in Hermann Park, so its best nearby choices are genuinely walkable: HMNS, gardens, the Medical Center and Museum District. Keep this part of the trip geographically tight and save Downtown or Space Center Houston for separate blocks.",
      nearbyAttractions: items(
        ["Houston Museum of Natural Science", "Across Hermann Park", "Dinosaurs, gems, a planetarium and butterfly center make the strongest museum companion.", "/destination/houston-museum-of-natural-science"],
        ["Hermann Park", "Outside the zoo", "Lawns, gardens, trails and the reflection pool provide free outdoor time around a ticketed zoo visit."],
        ["Museum of Fine Arts, Houston", "About a 10–15-minute walk", "A major art museum gives adults and older children a completely different cultural stop."],
        ["Children's Museum Houston", "About a 15-minute walk", "Hands-on exhibits are particularly useful for families with younger children."]
      ),
      foodAndDrink: items(
        ["Museum District", "Immediate area", "Museum and park dining is easiest when the full day stays around Hermann Park."],
        ["Rice Village", "About 2 miles west", "A dense restaurant and shopping district provides a strong dinner option."],
        ["Montrose", "About 1–2 miles north", "Independent restaurants and cafes offer one of Houston's best nearby neighborhood food scenes."],
        ["Texas Medical Center", "Just south", "Practical casual dining is plentiful around the large medical campus."]
      ),
      lodging: items(
        ["Museum District", "Closest", "Best for visitors prioritizing the zoo, HMNS and other cultural institutions."],
        ["Texas Medical Center", "Immediately south", "A large hotel inventory and transit access make this a practical family base."],
        ["Downtown Houston", "About 4 miles north-east", "A broader hotel base works when theater, sports or central attractions are also priorities."],
        ["Montrose", "North", "Boutique lodging and neighborhood food create a more local feel close to the museums."]
      ),
      neighborhoods: items(
        ["Museum District", "Immediate area", "Houston's major cultural institutions cluster around Hermann Park."],
        ["Rice University / Rice Village", "West", "Campus architecture, restaurants and shopping extend the day beyond the park."],
        ["Montrose", "North", "Historic homes, galleries, restaurants and nightlife add neighborhood character."],
        ["Texas Medical Center", "South", "The enormous medical campus defines traffic, transit and lodging patterns around Hermann Park."]
      ),
      familyStops: items(
        ["Houston Museum of Natural Science", "Across the park", "Paleontology and hands-on science make the easiest family museum pairing.", "/destination/houston-museum-of-natural-science"],
        ["Hermann Park Railroad and playgrounds", "In Hermann Park", "Short rides and open space give children a break from long exhibit loops."],
        ["Children's Museum Houston", "Nearby", "Hands-on galleries can anchor a second family half day."],
        ["McGovern Centennial Gardens", "In Hermann Park", "Free gardens and paths provide a quiet reset between major attractions."]
      ),
      sideTrips: items(
        ["Space Center Houston", "About 25 miles south-east", "NASA's visitor center deserves a separate day because of distance and timed tram tours.", "/destination/space-center-houston"],
        ["Downtown Houston", "About 4 miles north-east", "Discovery Green, sports, theaters and restaurants create a separate city-center itinerary."],
        ["Buffalo Bayou Park", "About 3 miles north", "Trails and skyline views provide an outdoor urban-landscape contrast."],
        ["Galveston", "About 50 miles south-east", "Beaches, Moody Gardens and historic districts can extend a Houston trip to the Gulf Coast.", "/destination/moody-gardens"]
      ),
    },
    featured: true,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Houston_Zoo_Main_Entrance.jpg?width=1600",
      alt: "Main entrance to the Houston Zoo in Hermann Park",
      width: 1600,
      height: 1067,
      credit: "Rasar90 · CC BY-SA 4.0 · Wikimedia Commons",
    },
  },
};

export function applyCuratedTopAttractionsBatch4(destination: Destination): Destination {
  const override = curated[destination.slug];
  return override
    ? {
        ...destination,
        ...override,
        hero: { ...destination.hero, ...override.hero },
      }
    : destination;
}
