import type { Article, ArticleBlock } from "../types";

// River recreation authority additions: editorial evidence, not a statement of current access or safe flow.
// Every access and activity statement needs a named, checkable official source.
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
import { sharedRiverPlanningLinks } from "./texas-river-shared-links";

export const riverRecreationGuideRecords = [
  {
    "slug": "texas-frio-river-guide",
    "name": "Frio River",
    "title": "Frio River, Texas: Garner, Concan, Swimming, Tubing, Camping & Fishing",
    "summary": "A river-by-river planning guide to the clear upper Frio around Leakey, Concan and Garner State Park, with legal access, water conditions, campsite choices and lower-basin context.",
    "hero": "https://upload.wikimedia.org/wikipedia/commons/7/7b/Garner_state_park.jpg",
    "heroAlt": "Frio River winding through Garner State Park as seen from Old Baldy in Uvalde County",
    "region": "Hill Country and South Texas",
    "overview": "The upper Frio is famous for cypress-lined limestone water around Leakey, Concan and Garner State Park, but the full river travels well beyond the popular swimming corridor toward the Nueces system. A day on the Frio should start with choosing a specific permitted access point, not with a generalized promise that every mile can be floated. Summer crowds, flood pulses and long dry stretches can change a trip dramatically.",
    "route": "For a first trip, choose the managed frontage inside Garner State Park and follow park directions for swimming, shore fishing, float areas and watercraft. Concan offers commercial river camps and outfitters, but each property controls its own guest access and shuttle arrangements. Upstream Leakey and the Real County canyon roads offer a quieter base; downstream ranch land is not a continuous public park. Build separate itineraries for Garner family day use, commercial Concan float trips and nature-oriented scenic drives.",
    "access": "Garner State Park is the clearest independently verifiable public access anchor. The park has designated Frio River frontage, day-use controls and overnight accommodation; verify reservations and alerts before travel. Private outfitter access is not public access simply because the water is navigable. Do not advertise unnamed bridge crossings as legal parking, launching or camping sites. Never treat an unfamiliar riverbank as publicly owned.",
    "float": "The popular upper river is suited to swimming and tubing when local conditions permit, but depth, exposed rocks, snags, crossings and flow vary by season and after storms. For an outfitter float, confirm the exact starting site, exit, route length, shuttle, estimated duration, equipment rules and current river conditions; do not apply an itinerary from one operator to the entire Frio. Thunderstorms upstream can turn a calm-looking reach hazardous even when the sky overhead is clear.",
    "fish": "Anglers can explore accessible pools, riffles and bank habitat in the upper watershed, but target species and tactics vary by reach. Garner allows fishing within state-park boundaries under its park rules, with the usual state-park license exemption; fishing from outside park boundaries normally requires an appropriate license. Check TPWD's current water-specific length and bag rules, any consumption advisories and whether the chosen access allows fishing before carrying gear down the bank.",
    "camp": "Garner State Park has campsites, cabins and screened shelters, subject to availability and site-specific rules. Around Concan there are private riverside campgrounds, RV properties and cabins; compare whether a booking includes actual river access, reserved frontage, public-road access or only a scenic view. Verify hookups, dump station, potable water, restrooms, quiet hours, pet policies, cell coverage, refund rules and river closures for the individual property. A campsite along the Frio is not automatically a legal put-in.",
    "nearby": "Garner makes a strong base for Old Baldy trails, park interpretation and the established summer dance tradition. The Leakey and Concan corridor adds canyon scenery and short local drives; Uvalde provides a larger-service option farther south. Pair a one-day river swim with an independent park trail, a small-town meal and time to check the forecast before committing to another water activity.",
    "history": "The Frio's canyon geography reflects the Edwards Plateau's limestone and spring systems; the water corridor shaped travel, settlement and later outdoor tourism. The river's appeal is inseparable from the local culture of summer camps, family trips and private river properties. Historical accounts, hydrogeology and visitor access should be researched separately rather than using nostalgic descriptions as evidence of current rights or safety.",
    "family": "Families can prioritize a staffed park entrance and a short, identifiable return path instead of committing children to an unverified long float. Bring appropriately fitted personal flotation devices, water shoes, shade, drinking water and a meeting point; there may be no lifeguards. Verify restroom availability at the chosen facility, rather than assuming there are bathrooms every few miles of river.",
    "faq": [
      [
        "Can you swim in the Frio River?",
        "Yes at designated, currently open sites such as Garner State Park when park rules and water conditions allow. Do not assume every private bank is accessible."
      ],
      [
        "Where can I camp on the Frio?",
        "Garner State Park offers official camping and other overnight options; private Concan-area campgrounds require their own booking and access checks."
      ],
      [
        "Is the Frio always deep enough to tube?",
        "No. Water levels and local obstacles change, so obtain same-day outfitter or park guidance and check gauges and weather."
      ],
      [
        "Do I need a fishing license?",
        "The state-park boundary exemption can apply inside Garner; elsewhere check current Texas licensing and any water-specific rules."
      ],
      [
        "Is every bridge a public access point?",
        "No. Legal stream access and legal roadside parking are separate questions; confirm the exact crossing and surrounding property rights."
      ]
    ],
    "extraLinks": [
      [
        "/destination/garner-state-park",
        "Garner State Park"
      ],
      [
        "/county/uvalde",
        "Uvalde County"
      ],
      [
        "/county/real",
        "Real County"
      ],
      [
        "/article/texas-nueces-river-guide",
        "Nueces basin"
      ]
    ],
    "official": [
      [
        "TPWD Garner State Park",
        "https://tpwd.texas.gov/state-parks/garner"
      ],
      [
        "TPWD Garner alerts",
        "https://tpwd.texas.gov/state-parks/garner/alert"
      ]
    ],
    "heroCredit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Garner_state_park.jpg · License: https://creativecommons.org/licenses/by/4.0/",
    "heroWidth": 1600,
    "heroHeight": 1200,
    "verifiedAccess": [
      {
        "name": "Garner State Park: Frio day-use and overnight base",
        "access": "TPWD describes approximately 2.9 miles of the Frio within Garner State Park. Enter through the official park and use designated river frontage; swimming, tubing, fishing and camping depend on current park rules and alerts. This is not an endorsement of floating the full 2.9 miles.",
        "source": "https://tpwd.texas.gov/state-parks/garner"
      }
    ]
  },
  {
    "slug": "texas-comal-river-guide",
    "name": "Comal River",
    "title": "Comal River, New Braunfels: Tubing, Parks, Access, Rules & Visitor Guide",
    "summary": "A practical New Braunfels Comal River guide distinguishing its short spring-fed municipal float corridor from the Guadalupe, with official access, local rules, conservation and nearby stays.",
    "hero": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Comal_River_in_Landa_Park.jpg",
    "heroAlt": "Comal River flowing through Landa Park in New Braunfels, Texas",
    "region": "New Braunfels, Comal County",
    "overview": "The Comal is a comparatively short spring-fed river that rises in New Braunfels and joins the Guadalupe. Its tourism identity comes from accessible city parks, a developed tubing corridor and proximity to downtown, not from an expansive wilderness river or a statewide camping corridor. A useful guide must distinguish the Comal from nearby Guadalupe sections and tell visitors exactly which city rules and access points apply to their intended float.",
    "route": "Start with New Braunfels park and river information, then decide whether the trip is a city float, a family park day or a broader Comal–Guadalupe weekend. Landa Park is a land-based orientation point for the spring system; commercial tubing trips use designated access and exit arrangements that should be confirmed with the operator. Prince Solms Park and the downstream float area are common trip-planning references, but entrance, parking and river operation rules can change. Verify them at the city source instead of assuming last year's rules apply.",
    "access": "The City of New Braunfels identifies Prince Solms Park (100 Liebscher) and designated river access parks, with paid parking and specific park hours. The city's current visitor portal publishes Comal recreation advisories and flow-based closures, so check the official live river notice rather than relying on a fixed general rule. City ordinances ban disposable containers, restrict coolers and tube sizes, and require authorized access; do not substitute Guadalupe rules for Comal rules. Operators provide specific shuttles; bringing your own tube does not automatically entitle you to a shuttle return. River parking is not a public campground, and an available waterway does not imply access through private lots.",
    "float": "The city's Comal float guidance identifies Hinman Island Park and Prince Solms Park as entry options, with a required Last Public Exit downstream; following the city route is fundamentally different from an unguided backcountry paddle. For bringing your own tube, the city states that return requires a walk rather than a provided municipal shuttle; licensed outfitters can offer separate transport. Current city rules restrict tubes over five feet, double tubes and disposable containers. The city publishes an estimated roughly 1.5–2-hour route under ordinary conditions, but that is not a guaranteed duration or a safety threshold; check actual flow, crowds, closures and exit signage.",
    "fish": "The Comal is a spring-dominated aquatic habitat where ecological protection and local recreation rules matter as much as angling opportunities. Do not promise unrestricted fishing in public parks or protected features. For fishing, consult TPWD species and regulations, identify explicitly legal locations and check whether local park or habitat rules restrict gear or bank access; anglers seeking broader river fisheries may choose verified Guadalupe reaches instead.",
    "camp": "The Comal is mainly an urban day-use and tubing destination. Do not label Landa Park or other municipal riverfront parks as overnight campgrounds without an explicit city authorization. For an overnight stay compare New Braunfels hotels, cabins or permitted commercial campgrounds, including along the nearby Guadalupe. Lodging near the Comal is not the same as a campsite on its banks; disclose which river a rental actually borders.",
    "nearby": "A useful New Braunfels itinerary combines a Comal River session with downtown heritage, Landa Park, Gruene and the nearby Guadalupe River, while preserving time for traffic, changing parking arrangements and dry clothes. A two-day itinerary can assign a separate day to Canyon Lake or a state park rather than pretending those sites lie on the same river.",
    "history": "The river is connected to the springs, German-Texan settlement in New Braunfels and the region's long use of freshwater for domestic life, industry and recreation. Spring flows also have an ecological significance not captured by float-trip advertising; emphasize habitat stewardship, invasive species prevention and local conservation notices. Historical attractions are context, not evidence of public ownership of a riverbank today.",
    "family": "For a family, choose a permitted park area with known entry, exit and bathroom locations. A commercial float with return transportation can be more predictable than parking at an unverified street access; ask outfitters about children's size restrictions and personal flotation devices. Avoid portraying fast chutes or all sections as toddler-friendly.",
    "faq": [
      [
        "Is the Comal River the same as the Guadalupe?",
        "No. The short Comal flows through New Braunfels and joins the Guadalupe downstream."
      ],
      [
        "Can you camp directly on the Comal?",
        "Do not assume municipal riverfront parks allow overnight camping; check permitted campgrounds or New Braunfels lodging instead."
      ],
      [
        "Do I need a shuttle to tube?",
        "That depends on the operator and route; confirm your put-in, take-out and return transport before entering."
      ],
      [
        "What are the Comal's special tubing rules?",
        "New Braunfels prohibits disposable drink/food containers and restricts float-tube sizes and other equipment; review its current Comal-specific rules and operator notices before every trip."
      ],
      [
        "Can you fish the Comal?",
        "Only where access and fishing are legally allowed; verify local habitat protections and current TPWD regulations."
      ]
    ],
    "extraLinks": [
      [
        "/county/comal",
        "Comal County"
      ],
      [
        "/destination/new-braunfels",
        "New Braunfels"
      ],
      [
        "/destination/gruene-historic-district",
        "Gruene Historic District"
      ],
      [
        "/article/texas-guadalupe-river-guide",
        "Guadalupe River"
      ]
    ],
    "official": [
      [
        "New Braunfels Comal River guide",
        "https://www.newbraunfels.gov/comalriver"
      ],
      [
        "New Braunfels river rules and prohibited equipment",
        "https://www.newbraunfels.gov/4212/What-Can-I-Bring"
      ],
      [
        "New Braunfels tubing routes and access",
        "https://www.newbraunfels.gov/4210/How-to-Go-Tubing"
      ]
    ],
    "heroCredit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Comal_River_in_Landa_Park.jpg · License: https://creativecommons.org/licenses/by/4.0/",
    "heroWidth": 1801,
    "heroHeight": 1201,
    "verifiedAccess": [
      {
        "name": "Hinman Island or Prince Solms to the Last Public Exit",
        "access": "City of New Braunfels describes a generally 1.5–2-hour Comal tubing corridor under normal conditions, with entry at Hinman Island or Prince Solms and mandatory exit at the Last Public Exit. Self-guided tubers walk back; commercial outfitters may offer shuttles. Seasonal wristbands and municipal equipment restrictions apply.",
        "source": "https://newbraunfels.gov/4210/How-to-Go-Tubing"
      }
    ]
  },
  {
    "slug": "texas-san-marcos-river-guide",
    "name": "San Marcos River",
    "title": "San Marcos River: Springs, River Parks, Tubing, Paddling & Wildlife",
    "summary": "A visitor guide from the protected spring-fed headwaters and urban river parks of San Marcos to the lower paddling reaches near Luling, including city rules, access, angling and camping alternatives.",
    "hero": "https://upload.wikimedia.org/wikipedia/commons/4/45/San_Marcos_River_San_Marcos_Texas_2023.jpg",
    "heroAlt": "San Marcos River at San Marcos with people enjoying the water in August 2023",
    "region": "Hays, Guadalupe and Caldwell counties",
    "overview": "The San Marcos River begins in a remarkable spring system at San Marcos, travels through busy urban parks and then becomes a less-developed river toward Martindale, Luling and its eventual meeting with the Guadalupe. Those are different experiences: a short swim, a managed float and a miles-long paddling trip should never be presented as interchangeable. The upper river contains sensitive aquatic habitat, including Texas wild-rice, so visitor planning starts with ecological rules as well as recreation.",
    "route": "In town, orient around City Park, the Lions Club tubing area and Rio Vista Park, then compare park-specific entry, parking and passes using the official San Marcos visitor and city notices. For a quieter and longer paddling choice, the TPWD Luling Zedler Mill trail runs from a state highway crossing toward Zedler Mill Park; it is a separate lower-river day trip and requires its own shuttle, gauge and access check. Do not assume the entire float from San Marcos to Luling is one maintained commercial loop.",
    "access": "San Marcos riverfront parks have individually posted hours, parking fees and rules. Visitor guidance for 2026 describes summer Rio Vista entry passes and City Park parking charges; avoid hardcoding those rates without a scheduled city-source check. On the lower river, use TPWD-mapped launches such as the Luling trail rather than informal roadside entries. Some leased fishing access sites may be closed or expired, so link to the currently maintained program listing rather than promising opening.",
    "float": "A short urban float can be attractive for visitors, but river drops and structural features require close attention to marked exits. At Rio Vista, local guidance identifies drops and an exit for people who want to avoid them. On longer reaches, wind, current and debris affect journey time. Never represent an approximate two-to-four-hour official paddling trail as a universal time for every route.",
    "fish": "Fish habitat varies between the clear upper urban reach and deeper downstream areas. TPWD notes bass and catfish opportunities on managed lower-river accesses, but legality of bank access must be independently checked for each launch. Sensitive native wildlife should not be collected or disturbed. Confirm license, water-specific restrictions and closed areas before casting, and keep fishing tackle out of protected plants.",
    "camp": "San Marcos city riverfront parks are not blanket overnight camping grounds. For an overnight trip use permitted camping properties in the wider Hays–Caldwell corridor or hotels in San Marcos and nearby towns. Ask whether a campground offers exclusive guest river access, car or RV sites, showers, and on-site put-in rights, and whether high water affects the reservation.",
    "nearby": "The Meadows Center and Spring Lake explain the spring system; downtown San Marcos adds museums, food and Texas State University context. Lower-river paddlers can pair a river morning with Luling's history and the restored Zedler Mill setting, rather than trying to complete urban swimming and a long shuttle paddle in one rushed afternoon.",
    "history": "The spring system and river have much deeper cultural and ecological history than commercial tubing. The river supported Indigenous settlement over millennia, influenced the growth of San Marcos and continues to be a focus of habitat conservation. Interpretive sources should distinguish archaeological evidence, later settlement and today's managed endangered-species recovery work.",
    "family": "Choose a shallow-entry, supervised-by-your-party site with a short return walk when bringing children or inexperienced swimmers. The city notes that no lifeguards are on duty; life jackets should be fitted appropriately. Bring reusable drink containers and closed cooler lids, protect riverbank vegetation and review park closure information before leaving a car.",
    "faq": [
      [
        "Where does the San Marcos River start?",
        "The spring system at San Marcos, associated with Spring Lake, feeds the river's headwaters."
      ],
      [
        "Can you swim or tube in San Marcos?",
        "Yes at designated open urban access sites under local rules; check Rio Vista and City Park updates."
      ],
      [
        "Does the city charge river parking or admission?",
        "Some parking and summer entry programs have applied in 2026; check the city's current information for the specific day."
      ],
      [
        "What is different about the Luling paddle?",
        "The TPWD Zedler Mill trail is a lower-river trip with its own access, distance and shuttle requirements."
      ],
      [
        "Why should visitors avoid uprooting river plants?",
        "Protected aquatic habitats include rare species such as Texas wild-rice. Stay on authorized routes and avoid damaging vegetation."
      ]
    ],
    "extraLinks": [
      [
        "/destination/san-marcos",
        "San Marcos"
      ],
      [
        "/county/hays",
        "Hays County"
      ],
      [
        "/county/caldwell",
        "Caldwell County"
      ],
      [
        "/article/texas-guadalupe-river-guide",
        "Guadalupe confluence"
      ]
    ],
    "official": [
      [
        "Visit San Marcos river guide",
        "https://www.visitsanmarcos.com/san-marcos-river/"
      ],
      [
        "San Marcos park and river rules",
        "https://www.visitsanmarcos.com/plan-your-visit/about-san-marcos/park-and-river-information/"
      ],
      [
        "TPWD Luling Zedler Mill trail",
        "https://tpwd.texas.gov/fishboat/boat/paddlingtrails/inland/luling/"
      ]
    ],
    "heroCredit": "Larry D. Moore · CC BY 4.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:San_Marcos_River_San_Marcos_Texas_2023.jpg · License: https://creativecommons.org/licenses/by/4.0/",
    "heroWidth": 3556,
    "heroHeight": 2000,
    "verifiedAccess": [
      {
        "name": "Luling Zedler Mill Paddling Trail",
        "access": "TPWD maps a 6.0-mile downstream route from the State Highway 90 River Crossing (29.6679, -97.6999) to Zedler Mill Park (29.6671, -97.6519), typically estimated 2–4 hours with normal flows. Exit before the dam beyond the mill. Arrange shuttle, inspect snags and verify current access.",
        "source": "https://tpwd.texas.gov/fishboat/boat/paddlingtrails/inland/luling/"
      }
    ]
  },
  {
    "slug": "texas-llano-river-guide",
    "name": "Llano River",
    "title": "Llano River, Texas: South Llano, Junction, Castell, Fishing, Paddling & Camping",
    "summary": "Compare the North and South Llano branches, Junction and South Llano River State Park with the main Llano near Mason, Llano and Kingsland; plan verified fishing, paddling and overnight visits.",
    "hero": "https://upload.wikimedia.org/wikipedia/commons/8/83/Llano_River_in_Junction%2C_TX_IMG_4345.JPG",
    "heroAlt": "Llano River in the riverside park at Junction, Texas",
    "region": "Kimble, Mason and Llano counties",
    "overview": "The Llano system is best understood as a set of related but distinct reaches. The South and North Llano rivers meet near Junction, the main Llano passes through Mason and Llano County, and downstream waters ultimately connect to the Highland Lakes system. A family swim at South Llano River State Park, a short paddle toward Junction and fishing near Kingsland are not one continuous trip. Access arrangements and safe water levels differ among them.",
    "route": "For a structured first visit, use South Llano River State Park near Junction. TPWD describes a designated South Llano paddling route with access at the state park, Flatrock Lane and Junction City Park; confirm which put-ins are open and note the park's specific bridge/portage warnings. For a main-stem experience, compare official TPWD leased-access listings near Castell and Kingsland; never assume every low-water crossing is a permitted parking lot or public campsite.",
    "access": "TPWD's river-fishing access directory includes maps for Llano near Junction, Castell and Kingsland, and a separate South Llano route. Use those site-specific maps, park advisories and on-the-ground signage. A paid commercial RV park that offers state-leased fishing access may have separate rules for fishing visitors and overnight guests. Avoid treating a lease as permanent or applying its terms to adjoining private properties.",
    "float": "The South Llano trail is described by TPWD as roughly six miles with several access options, but float times are estimates—not guarantees under drought, strong flow or obstruction conditions. The main Llano can have very different water depth and portage needs; verify the exact section rather than generalizing from the spring-fed South Llano. Look for low-water bridges, snags and upstream rain before launching.",
    "fish": "TPWD's South Llano material identifies Guadalupe and largemouth bass, sunfish and catfish. Fishing within state park boundaries has the usual state-park licensing exemption, but park-specific gear and protected-water rules may apply. Elsewhere check the state fishing license, species limits and local rules. Consider catch-and-release where native Guadalupe bass populations are under restoration efforts; verify site-specific programs instead of claiming all river reaches are managed identically.",
    "camp": "South Llano River State Park is the most straightforward official camping base, with reservations and park notices that should be checked for the visit date. Other campgrounds and RV options near Junction, Mason, Llano and Kingsland vary in hookups, river frontage and overnight permission. A useful comparison asks whether the site is on the South Llano, North Llano, main river or a lake; those are not interchangeable locations.",
    "nearby": "An outdoors-centered weekend can combine the state park's hiking, birding and stargazing with a short permitted paddle. Another itinerary follows small-town Llano and Mason heritage while stopping only at identified river access. Farther east, Kingsland connects to the Highland Lakes; distinguish lake recreation from free-flowing river stretches when suggesting boating or fishing.",
    "history": "Limestone country, the broader Colorado basin and the North and South Llano forks shaped early routes and settlements across the region. The river corridor also supports riparian habitat for birds and native fish. Historical accounts of crossings and older public-access descriptions require modern verification because highways, property ownership and access leases can change.",
    "family": "South Llano River State Park provides a more predictable place for first-time visitors to ask staff about river conditions, family float possibilities, camping and restrooms. Check the designated launch and take-out route, pack water and sun protection, and use life jackets. Avoid promising that shallow-looking crossings are safe for small children during release or flood conditions.",
    "faq": [
      [
        "Where do the North and South Llano meet?",
        "They meet in the Junction area; guides should distinguish the branches from the downstream main Llano."
      ],
      [
        "Can you paddle the South Llano?",
        "TPWD maps a South Llano paddling trail; verify current bridge and access notices and river levels before launching."
      ],
      [
        "Where can you camp?",
        "South Llano River State Park offers official camping; private Junction- and Llano-area accommodations have their own rules."
      ],
      [
        "Can you catch Guadalupe bass?",
        "TPWD identifies Guadalupe bass in South Llano reaches. Check current license, catch limits and conservation information."
      ],
      [
        "Is the whole Llano navigable year-round?",
        "No. Flows and obstructions vary, and a route should never be labeled reliable year-round without current local evidence."
      ]
    ],
    "extraLinks": [
      [
        "/destination/south-llano-river-state-park",
        "South Llano River State Park"
      ],
      [
        "/county/kimble",
        "Kimble County"
      ],
      [
        "/county/mason",
        "Mason County"
      ],
      [
        "/county/llano",
        "Llano County"
      ],
      [
        "/article/texas-colorado-river-guide",
        "Colorado River basin"
      ]
    ],
    "official": [
      [
        "TPWD South Llano park",
        "https://tpwd.texas.gov/state-parks/south-llano-river"
      ],
      [
        "TPWD South Llano paddling trail",
        "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      ],
      [
        "TPWD river leased access",
        "https://tpwd.texas.gov/fishboat/fish/recreational/rivers/lease_access/"
      ]
    ],
    "heroCredit": "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Llano_River_in_Junction,_TX_IMG_4345.JPG · License: https://creativecommons.org/licenses/by-sa/3.0/",
    "heroWidth": 1600,
    "heroHeight": 1200,
    "verifiedAccess": [
      {
        "name": "South Llano Paddling Trail, Junction",
        "access": "TPWD maps 6.3 miles from South Llano River State Park (30.4498, -99.8128), via Flatrock Lane Crossing (30.4789, -99.7778), to Junction City Park (30.4879, -99.7617). Typical published float estimate is 2–4 hours. TPWD warns a bridge apron has collapsed at the park entrance: obey barricades and portage around the bridge as directed.",
        "source": "https://tpwd.texas.gov/boating/paddling-trails/hill-country/south-llano/"
      }
    ]
  },
  {
    "slug": "texas-pecos-river-guide",
    "name": "Pecos River",
    "title": "Pecos River in Texas: Canyon History, Public Access, Fishing & Desert Travel",
    "summary": "An evidence-led West Texas Pecos River guide from the New Mexico line through remote desert country to the Rio Grande and Amistad, with realistic access expectations, conservation and historical places.",
    "hero": "https://upload.wikimedia.org/wikipedia/commons/3/3e/Pecos_River.jpg",
    "heroAlt": "Pecos River in the Lower Pecos canyon of Texas, photographed in 2005",
    "region": "West Texas and the Lower Pecos",
    "overview": "The Pecos is a long, often remote river whose Texas journey differs fundamentally from the Comal or Frio. It enters Texas from New Mexico, runs through arid ranching and Permian Basin country and reaches the Rio Grande at the Amistad area. River conditions, ownership, salinity, access and water management differ radically along the route. It is misleading to sell it as one continuous public tubing corridor or to use an Amistad boat ramp as proof of access to every upstream reach.",
    "route": "For most visitors, the lower Pecos landscape is better explored by a road-and-history itinerary than a spontaneous float. Use Del Rio or Comstock as a service base, then visit the publicly managed Seminole Canyon area and the Pecos High Bridge corridor from lawful viewpoints. Amistad National Recreation Area offers water recreation where current NPS rules allow, but a reservoir outing is not the same as traveling up the free-flowing Pecos canyon.",
    "access": "Treat the Pecos as a high-verification river. Remote ranch crossings are not automatically public launches, and legal access may be separated by long distances with no convenient rescue. Check NPS maps and superintendent notices for permitted access in Amistad, TPWD state-park rules for the Seminole Canyon landscape, and property rights for any upriver entry. Never suggest roadside parking at a bridge overlook without a legally designated pullout.",
    "float": "Experienced paddlers considering remote canyons need a vetted route, permission and land-status review, take-out plan, gauge and weather monitoring, communications, water supplies and emergency contingencies. For general tourists, the safe default is designated park viewpoints and official water recreation rather than an unsupported multi-day paddling itinerary. Storm runoff can be sudden; lack of cellular coverage and long gaps between exits materially increase risk.",
    "fish": "Fishing possibilities are reach-specific and heavily affected by water quality, salinity and access. The lower river meets the Amistad fishery, but fish and regulations associated with a reservoir should not be asserted for every inland reach. Check TPWD waterbody-specific rules, advisories and licensed access, and NPS rules where federal waters are involved. Do not publish an unverified species list or suggest shore access across private ranches.",
    "camp": "Use established lodging and permitted campgrounds around Del Rio, Amistad and the appropriate state parks rather than describing remote canyon land as open camping. Confirm potable water, shade, fire restrictions, road access, travel distances and seasonally available services. Overnight river expeditions require much more specific permission and safety research than a general tourist guide can provide.",
    "nearby": "The Pecos High Bridge is a powerful history stop because it shows how difficult it was to cross this canyon by rail. Seminole Canyon gives visitors professionally interpreted rock-art and landscape history; NPS Amistad resources explain the lower Pecos–Rio Grande setting. A visitor itinerary can explore all three without claiming that each site offers direct riverbank swimming.",
    "history": "Indigenous rock-art landscapes along the Lower Pecos record long human histories in the canyons. Later routes, cattle and rail connections, irrigation, water extraction and energy development shaped the river's modern condition. NPS documents the historic Pecos Viaduct and railroad engineering problem. Keep those documented stories separate from folklore and never imply that cultural sites may be entered without a permit or guided access.",
    "family": "For families, focus on visitor centers, official overlooks, interpretive programs and shaded breaks, not casual entry into isolated river water. Summer heat can be severe and services far apart; carry drinking water, confirm park hours and check road closures. Choose established campground facilities or Del Rio lodging for reliable bathrooms and supplies.",
    "faq": [
      [
        "Can you tube the Pecos like the Frio?",
        "Not as a general casual day trip. Access is remote and reach-specific, and many sections require specialized planning or permission."
      ],
      [
        "Where does the Texas Pecos end?",
        "It joins the Rio Grande in the Amistad region near the Lower Pecos canyon country."
      ],
      [
        "Can I see the famous Pecos High Bridge?",
        "The Lower Pecos bridge corridor has a major railroad history; use official lawful viewing locations and do not stop in unsafe roadway positions."
      ],
      [
        "Is Seminole Canyon a public river launch?",
        "Do not assume so. Check the state park's specific permitted activities; its cultural and hiking resources are the main visitor draws."
      ],
      [
        "Where should I stay?",
        "Del Rio and permitted Amistad or state-park lodging/campgrounds are practical bases; verify distances and amenities before travel."
      ]
    ],
    "extraLinks": [
      [
        "/destination/amistad-national-recreation-area",
        "Amistad National Recreation Area"
      ],
      [
        "/county/val-verde",
        "Val Verde County"
      ],
      [
        "/county/reeves",
        "Reeves County"
      ],
      [
        "/article/texas-rio-grande-river-guide",
        "Rio Grande"
      ]
    ],
    "official": [
      [
        "National Park Service Amistad",
        "https://www.nps.gov/amis/index.htm"
      ],
      [
        "NPS Pecos Viaduct history",
        "https://www.nps.gov/amis/learn/historyculture/viaduct.htm"
      ],
      [
        "TPWD Seminole Canyon State Park",
        "https://tpwd.texas.gov/state-parks/seminole-canyon"
      ]
    ],
    "heroCredit": "Badener / Lutz Fischer-Lamprecht · CC BY-SA 3.0 · Wikimedia Commons · https://commons.wikimedia.org/wiki/File:Pecos_River.jpg · License: https://creativecommons.org/licenses/by-sa/3.0/",
    "heroWidth": 2048,
    "heroHeight": 1536,
    "verifiedAccess": [
      {
        "name": "Lower Pecos: designated park interpretation rather than an unsupported float",
        "access": "The National Park Service documents the Pecos High Bridge/Viaduct history in the Lower Pecos–Amistad landscape, while TPWD operates Seminole Canyon State Park for regulated trail and cultural access. Neither an interpretive site nor a historic bridge establishes a legal free-flowing river launch. Contact the actual managing agency before an expedition.",
        "source": "https://www.nps.gov/amis/learn/historyculture/viaduct.htm"
      }
    ]
  }
] as const;

const toLinks = (pairs: readonly (readonly [string, string])[]): NonNullable<Article["internalLinks"]> =>
  pairs.map(([href, label]) => ({ href, label, description: href.startsWith("/") ? "Continue with locally relevant TexasDefined visitor planning and geography." : "Check the primary operator or public agency before you travel." }));

// Official references use [human-readable label, external URL], unlike extraLinks.
// Keep the conversions separate so labels can never become local /article/ routes.
const toOfficialLinks = (pairs: readonly (readonly [string, string])[]): NonNullable<Article["internalLinks"]> =>
  pairs.map(([label, href]) => ({ href, label, description: "Check the primary operator or public agency before you travel." }));

const buildBody = (river: (typeof riverRecreationGuideRecords)[number]): ArticleBlock[] => [
  h("The river at a glance"),
  p(river.overview),
  h("Choose the right stretch and build an itinerary"),
  p(river.route),
  h("Officially documented access: an example to build from"),
  ...river.verifiedAccess.flatMap((site) => [
    h(site.name),
    p(site.access + " Primary map or managing authority: " + site.source),
  ]),
  h("Where you can legally enter, park and exit"),
  p(river.access),
  h("Tubing, kayaking and paddling: what actually works"),
  p(river.float),
  h("Fishing: species, rules and responsible access"),
  p(river.fish),
  h("Camping, RV sites and overnight lodging"),
  p(river.camp),
  h("Nearby attractions and a worthwhile second day"),
  p(river.nearby),
  h("Landscape, history and why this river matters"),
  p(river.history),
  h("Planning with children, facilities and accessibility"),
  p(river.family),
  h("Trip checklist: verify these before leaving"),
  list(
    "Identify the exact legal launch, exit, parking area, restroom and emergency meeting point for the chosen reach.",
    "Check same-day USGS observations, upstream rainfall, NWS warnings and managing-agency closures; no gauge reading is by itself a guarantee of safe entry.",
    "Verify TPWD's current fishing license rules, waterbody exceptions, fish-consumption advisories and invasive-species precautions.",
    "Confirm outfitters' shuttles, life jackets, group requirements, campsite access and posted rules for the visit date.",
    "Bring drinking water, protection from sun and cold, appropriate footwear and a pack-out plan; leave riparian and aquatic habitats undisturbed."
  ),
  h("Frequently asked questions"),
  ...river.faq.flatMap(([question, answer]) => [h(question), p(answer)]),
  h("Primary sources and verification methodology"),
  p("Editorial evidence review: October 12, 2026. Geography, access and recreation descriptions were compared with the primary parks, tourism or federal references linked below and Texas Parks and Wildlife Department's statewide river guidance. Operational status, prices, river flows and seasonal closures are NOT represented as live-verified; check the managing authority and gauges for your actual travel date. Do not mistake an editorial overview for a permit, current fishing-regulation determination, legal-access opinion, or flood clearance."),
  p("Recommended citation: TexasDefined.com, \"" + river.title + "\", research review October 12, 2026. The linked source record supports each named operator, park or documented location; unknown conditions are disclosed rather than guessed.")
];

export const texasRiverRecreationGuideArticles: Article[] = riverRecreationGuideRecords.map((river) => ({
  id: "evergreen-" + river.slug,
  brandId: "texasdefined",
  slug: river.slug,
  title: river.title,
  dek: river.summary,
  category: "lakes-rivers",
  region: river.slug === "texas-pecos-river-guide" ? "big-bend" : undefined,
  hero: { src: river.hero, alt: river.heroAlt, width: river.heroWidth, height: river.heroHeight, credit: river.heroCredit },
  authorId: "a-marisol",
  publishedAt: "2026-10-12",
  updatedAt: "2026-10-12",
  readingMinutes: 11,
  tags: [river.name, river.region, "Texas rivers", "river fishing", "river camping", "river access", "river paddling"],
  featured: false,
  sourceName: river.official[0][0],
  sourceUrl: river.official[0][1],
  sources: river.official.map(([label, url]) => ({ label, url })),
  internalLinks: [...sharedRiverPlanningLinks, ...toLinks(river.extraLinks), ...toOfficialLinks(river.official)],
  body: buildBody(river),
  relatedCollections: [],
  relatedDestinations: [],
}));

export const texasRiverRecreationGuideStubs: Article[] = texasRiverRecreationGuideArticles.map(
  (article) => ({ ...article, body: [], internalLinks: [], relatedDestinations: [] })
);
