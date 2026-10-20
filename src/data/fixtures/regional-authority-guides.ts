import scenicRoadHero from "@/assets/road-trip.jpg";
import germanLandscape from "@/assets/generated/hill-country-identity.jpg";
import type { Article } from "../types";
import { regionalAuthorityEnrichment } from "./regional-authority-enrichment";

/** Source-led statewide authority guides; do not confuse AVAs, cultural regions and travel regions. */
const baseRegionalAuthorityArticles: Article[] = [
  {
    "id": "evergreen-scenic-drives-in-texas",
    "brandId": "texasdefined",
    "slug": "scenic-drives-in-texas",
    "title": "Scenic Drives in Texas: Routes, Stops, Seasons and Road Conditions",
    "dek": "Choose a Texas scenic drive by landscape and road type, from the Hill Country and Piney Woods to Big Bend, Gulf Coast, Panhandle and South Texas—with realistic trip-planning advice.",
    "category": "road-trips",
    "region": "hill-country",
    "hero": {
      "src": scenicRoadHero,
      "alt": "A two-lane rural Texas road leading toward the distant horizon; representative scenic-driving image",
      "width": 1600,
      "height": 1067
    },
    "authorId": "a-marisol",
    "publishedAt": "2026-10-12",
    "readingMinutes": 14,
    "tags": [
      "scenic drives in texas",
      "texas road trips",
      "hill country scenic drive",
      "big bend scenic drive",
      "texas scenic routes"
    ],
    "sourceName": "TxDOT — 2026 Texas State Travel Guide and Official Travel Map",
    "sourceUrl": "https://www.txdot.gov/about/newsroom/stories/get-your-kicks-with-the-2026-texas-travel-guide.html",
    "internalLinks": [
      {
        "href": "/article/texas-regions-explained",
        "label": "Texas regions explained",
        "description": "How seven practical travel regions differ from administrative and ecological boundaries."
      },
      {
        "href": "/explore/road-trips",
        "label": "Browse Texas road trips",
        "description": "Use existing trip planning and destinations."
      },
      {
        "href": "/explore/region/hill-country",
        "label": "Texas Hill Country",
        "description": "Browse towns, parks, attractions and river destinations."
      },
      {
        "href": "/explore/trip-planner",
        "label": "Texas trip planner",
        "description": "Build a trip around confirmed stops and current conditions."
      },
      {
        "href": "/explore/region/big-bend",
        "label": "Big Bend Country",
        "description": "Plan desert roads with fuel and safety in mind."
      },
      {
        "href": "/explore/region/panhandle",
        "label": "Panhandle Plains",
        "description": "Canyon country, Route 66 and open prairie."
      },
      {
        "href": "/explore/region/piney-woods",
        "label": "Piney Woods",
        "description": "Explore forests and lake-country drives."
      },
      {
        "href": "/explore/region/gulf-coast",
        "label": "Gulf Coast",
        "description": "Plan barrier-island and bay shore routes."
      },
      {
        "href": "/article/texas-farm-to-market-roads-explained",
        "label": "FM roads explained",
        "description": "Understand the rural route-numbering system."
      }
    ],
    "relatedCollections": [],
    "relatedDestinations": [],
    "body": [
      {
        "type": "paragraph",
        "text": "Texas scenic driving is not one highway or one season. A memorable route usually crosses a landscape you can recognize: limestone valleys in the Hill Country, red breaks on the Caprock, pines and lakes of East Texas, Gulf marshes, or desert basins below the Chisos Mountains. This guide separates those experiences so a traveler can choose the kind of road—and the kind of day—rather than chase a generic list of pretty roads."
      },
      {
        "type": "paragraph",
        "text": "These are editorial route concepts, not live turn-by-turn navigation. Route names, surfaces, access restrictions, construction, flooding and park capacity can change. Before departure, check the current TxDOT travel map and road conditions, the land manager's access notices, and weather along the entire corridor. Do not infer that a road is suitable for a passenger car or RV because it appears on a tourist map."
      },
      {
        "type": "heading",
        "text": "Hill Country: granite country, rivers and ranch roads"
      },
      {
        "type": "paragraph",
        "text": "Use Fredericksburg, Llano, Johnson City and the Highland Lakes as flexible anchors rather than treating the whole Hill Country as a single loop. Around Llano and Enchanted Rock, granite outcrops change the view; farther east the Highland Lakes connect river valleys to dams, parks and small towns. Around Johnson City and Stonewall, U.S. 290 gives an accessible corridor with historical sites and tasting rooms. For a river-first trip, look toward Blanco, Wimberley, Kerrville or Junction, then choose a manageable stretch of road."
      },
      {
        "type": "paragraph",
        "text": "The safest route has a few deliberate stops: one public park or overlook, one town for food or fuel and an optional detour. Wildflower season is weather-dependent, and creek crossings can flood rapidly. Never drive across water over a road. Rural road shoulders may be narrow; use public turnouts rather than stopping on private ranch entrances for photographs."
      },
      {
        "type": "heading",
        "text": "Big Bend: dramatic paved roads and a crucial dirt-road distinction"
      },
      {
        "type": "paragraph",
        "text": "Big Bend National Park itself contains several paved scenic corridors. The National Park Service identifies Ross Maxwell Scenic Drive as a roughly 30-mile road toward Castolon and Santa Elena Canyon, with geology and historic ranch stops along the way. The Chisos Basin approach climbs dramatically and has vehicle-size restrictions. Check the NPS access advisory before setting out, especially when large vehicles, heat, storms or seasonal work could affect plans."
      },
      {
        "type": "paragraph",
        "text": "Do not confuse those paved drives with the park's primitive River Road. NPS says River Road requires true four-wheel drive and high clearance, and is not suitable for normal passenger cars or RVs. Desert driving also requires more water, an earlier fuel plan, offline navigation and conservative assumptions about cell coverage. In Big Bend, a sensible short scenic day is better than an overambitious circuit."
      },
      {
        "type": "heading",
        "text": "Panhandle Plains: Route 66 history and the Caprock edge"
      },
      {
        "type": "paragraph",
        "text": "Amarillo and Canyon give travelers contrasting settings close enough to pair with an overnight stay. Historic Route 66 places the regional story in old commercial streets and roadside landmarks, while Palo Duro Canyon reveals the erosional landscape beneath the High Plains surface. Use public park drives and signed overlooks rather than unsurfaced ranch tracks. Wind, lightning, high temperatures and winter weather make conditions a larger part of the itinerary than many first-time visitors expect."
      },
      {
        "type": "heading",
        "text": "Piney Woods: forest, water and historic towns"
      },
      {
        "type": "paragraph",
        "text": "East Texas offers a slower visual rhythm. Anchor a loop to Nacogdoches, Tyler, Jefferson, Palestine or another town with a substantial historic core, then pair it with a lake, state park or forest. Rather than collecting miles, look for transitions between longleaf or shortleaf pine, hardwood bottoms, farm fields and river crossings. Check state-park access rules before assuming there is shoreline access, and remember that private timberland is not automatically open to public recreation."
      },
      {
        "type": "heading",
        "text": "Gulf Coast: barrier islands, bays and working waterfronts"
      },
      {
        "type": "paragraph",
        "text": "A coastal drive can pair Rockport and Port Aransas in the Coastal Bend, Galveston and the upper coast, or South Padre Island and nearby birding areas. Each corridor is different, and some journeys involve ferries, bridges, beach access permits or long detours around bays. Coastal storms, tropical weather, high tides and roadwork can change travel plans quickly. For wildlife watching, choose established refuge trails and public pull-offs; marsh shoulders and dune systems are sensitive habitats."
      },
      {
        "type": "heading",
        "text": "South Texas and the Rio Grande: culture, wildlife and landscape"
      },
      {
        "type": "paragraph",
        "text": "South Texas is a distinct scenic experience even when a route is not mountainous. Brush country, working ranchlands, historic downtowns and the lower Rio Grande corridor reward a history-and-nature itinerary. Laredo, Roma, Rio Grande City, Mission and Brownsville occupy different parts of this borderland story. Choose a museum, historic district, birding refuge or authorized park entrance to anchor the trip; do not make informal roadside access or unmarked private roads part of the plan."
      },
      {
        "type": "heading",
        "text": "How to choose a route that works on the day"
      },
      {
        "type": "list",
        "items": [
          "Half a day: choose one corridor with one main stop and a flexible turnaround point.",
          "A full day: combine one landscape drive, one town and one park or historic site rather than crossing multiple regions.",
          "An overnight: choose a base town and reserve a daylight window for the most remote section.",
          "In summer: favor early starts, shade or coastal breezes; expect heat in exposed canyons and desert roads.",
          "For an RV: confirm every bridge, grade, length restriction, surface and campground approach with the road or park authority.",
          "After rain: check flood-prone crossings, dirt-road closures and ferry notices before leaving."
        ]
      },
      {
        "type": "paragraph",
        "text": "For source verification, use TxDOT's 2026 official travel map and road guidance, plus the National Park Service Big Bend scenic-driving pages and individual state-park notices. All mileage and access information must be treated as conditional until checked for the exact trip date. TexasDefined's region hubs and linked destination pages provide further stop selection; none is a substitute for official live road and weather alerts."
      }
    ]
  },
  {
    "id": "evergreen-texas-wine-country",
    "brandId": "texasdefined",
    "slug": "texas-wine-country",
    "title": "Texas Wine Country: Regions, Vineyards and Planning a Wine Weekend",
    "dek": "Understand Texas wine regions beyond the Fredericksburg tasting corridor, including the Hill Country and Texas High Plains, with AVA geography, vineyard sourcing and practical visitor planning.",
    "category": "guides",
    "region": "hill-country",
    "hero": {
      "src": "https://commons.wikimedia.org/wiki/Special:Redirect/file/Texas_Hills_vineyard.jpg?width=1280",
      "alt": "Vineyard rows at Texas Hills Vineyard near Johnson City, Texas",
      "width": 1280,
      "height": 960,
      "credit": "Jon Lebkowsky · Wikimedia Commons · CC BY-SA 2.0"
    },
    "authorId": "a-hollis",
    "publishedAt": "2026-10-12",
    "readingMinutes": 12,
    "tags": [
      "texas wine country",
      "texas wineries",
      "texas wine regions",
      "texas hill country wine",
      "texas high plains ava",
      "fredericksburg wineries"
    ],
    "sourceName": "U.S. Alcohol and Tobacco Tax and Trade Bureau — established American Viticultural Areas",
    "sourceUrl": "https://www.ttb.gov/regulated-commodities/beverage-alcohol/wine/established-avas",
    "internalLinks": [
      {
        "href": "/article/fredericksburg-texas-wineries-things-to-do-guide",
        "label": "Fredericksburg winery guide",
        "description": "Use the maintained Hill Country tasting-room roster."
      },
      {
        "href": "/destination/william-chris-vineyards-hye",
        "label": "William Chris Vineyards in Hye",
        "description": "One detailed, source-backed winery destination."
      },
      {
        "href": "/destination/fredericksburg",
        "label": "Fredericksburg",
        "description": "Build lodging, food, museums and walkable history around a wine weekend."
      },
      {
        "href": "/destination/johnson-city",
        "label": "Johnson City",
        "description": "Historic sites, food and a practical eastern tasting corridor."
      },
      {
        "href": "/article/texas-regions-explained",
        "label": "Texas regions explained",
        "description": "How seven practical travel regions differ from administrative and ecological boundaries."
      },
      {
        "href": "/explore/road-trips",
        "label": "Browse Texas road trips",
        "description": "Use existing trip planning and destinations."
      },
      {
        "href": "/explore/region/hill-country",
        "label": "Texas Hill Country",
        "description": "Browse towns, parks, attractions and river destinations."
      },
      {
        "href": "/explore/trip-planner",
        "label": "Texas trip planner",
        "description": "Build a trip around confirmed stops and current conditions."
      }
    ],
    "relatedCollections": [],
    "relatedDestinations": [],
    "body": [
      {
        "type": "paragraph",
        "text": "Texas Wine Country is a useful travel phrase, not one official administrative region. Fredericksburg and the U.S. 290 corridor are familiar tasting destinations, but the grape-growing story extends far beyond the Hill Country. Understanding the difference between vineyards, American Viticultural Areas, wineries and tasting rooms makes a Texas wine trip more informative—and helps travelers avoid assuming the bottle's grapes grew beside the place pouring it."
      },
      {
        "type": "heading",
        "text": "What makes a wine region official?"
      },
      {
        "type": "paragraph",
        "text": "The federal Alcohol and Tobacco Tax and Trade Bureau defines American Viticultural Areas, or AVAs, as delimited grape-growing regions with distinguishable geographic or climatic features. Texas has more than one such appellation. The TTB's current list includes the Texas Hill Country, Texas High Plains, Fredericksburg in the Texas Hill Country, Bell Mountain, Texas Davis Mountains, Escondido Valley and Texoma. These are legal appellations with defined boundaries, not interchangeable synonyms for wine-tourism districts."
      },
      {
        "type": "paragraph",
        "text": "A tasting room's location and the place its grapes were grown can differ. Some Hill Country wineries work with fruit from West Texas or the High Plains, while others grow estate grapes or blend grapes from multiple sources. When that distinction matters, check the bottle's appellation or vineyard designation and ask the producer rather than guessing from the tasting room's street address."
      },
      {
        "type": "heading",
        "text": "The Hill Country: the main visitor-facing winery corridor"
      },
      {
        "type": "paragraph",
        "text": "Fredericksburg is an efficient base for a first wine weekend because lodging, restaurants, a walkable historic district, museum attractions and winery excursions can be arranged without moving hotels. U.S. 290 between Johnson City, Hye, Stonewall and Fredericksburg carries many of the region's best-known tasting experiences. A separate trip can focus on nearby Blanco, Dripping Springs or other Hill Country communities rather than cramming every stop onto the same highway."
      },
      {
        "type": "paragraph",
        "text": "The strongest itinerary is not necessarily the one with the most tasting rooms. Make one reserved, educational tasting the centerpiece, add time to understand the vineyard or winemaking story, then leave room for a meal and an unrelated experience. The National Museum of the Pacific War, LBJ sites, Enchanted Rock, historic squares and local galleries broaden the day for visitors who do not drink."
      },
      {
        "type": "heading",
        "text": "Texas High Plains: a growing region, not just a tasting-room address"
      },
      {
        "type": "paragraph",
        "text": "The Texas High Plains AVA spans a broad part of the upland plains around the Lubbock region. Its agricultural environment and growing conditions are different from the limestone hills often shown in Texas wine advertising. That matters because grapes from the High Plains have become important to producers whose tasting rooms are elsewhere. A traveler interested in vineyard geography should compare growing-region information with the physical location of the winery rather than treating them as one thing."
      },
      {
        "type": "paragraph",
        "text": "An agricultural trip to the High Plains is different from a concentrated Fredericksburg tasting weekend: distances are long, schedules may be appointment-based and a vineyard may not operate a public tasting room. Verify visitor access with the actual business before departure. Wine origin is a fascinating reason to explore the region, but it does not entitle the public to enter working farms."
      },
      {
        "type": "heading",
        "text": "Other Texas appellations and smaller wine destinations"
      },
      {
        "type": "paragraph",
        "text": "The federally recognized Fredericksburg-in-the-Texas-Hill-Country and Bell Mountain AVAs sit within the larger Texas Hill Country appellation. Elsewhere, the Texas Davis Mountains and Escondido Valley appellations show how far the state's grape-growing geography reaches. Texoma belongs to a different North Texas setting. A statewide page should recognize those places even though it would be misleading to promise a dense tasting-room route in every appellation."
      },
      {
        "type": "heading",
        "text": "Planning your first Texas wine weekend"
      },
      {
        "type": "list",
        "items": [
          "Choose the trip goal first: tasting-room concentration, vineyard geography, food pairing, history, or a mixed-interest weekend.",
          "Use the official tasting room's current reservations, hours, age requirements and cancellation policy, not an older roundup.",
          "Keep the driver independent of alcohol consumption: designate a sober driver or arrange transportation with confirmed pickup coverage.",
          "Look at the origin and varietal information on wine labels if you care where the grapes actually grew.",
          "Book lodging near the town or area where you want to spend the evening, rather than assuming rural roads are easy after dark.",
          "If visiting with children or pets, check each winery's written access policy in advance."
        ]
      },
      {
        "type": "paragraph",
        "text": "There is no need to reduce Texas wine travel to a single ranking. The Hill Country works for clustered hospitality stops; the High Plains tells a major part of the viticultural story; other AVAs reward specialized research. Start with the TTB appellation list for verified geographic definitions, then use producer and destination sources for current tasting access. TexasDefined's detailed Fredericksburg guide and maintained individual winery pages provide the practical, place-by-place next layer."
      }
    ]
  },
  {
    "id": "evergreen-texas-german-belt",
    "brandId": "texasdefined",
    "slug": "texas-german-belt",
    "title": "Texas German Belt: Towns, Churches, History and Heritage Routes",
    "dek": "Trace German-Texan immigration from New Braunfels and Fredericksburg to Comfort, Boerne and smaller communities, with historical context, churches, food traditions and a responsible heritage-drive itinerary.",
    "category": "texas-history",
    "region": "hill-country",
    "hero": {
      "src": germanLandscape,
      "alt": "Hill Country landscape associated with the historic communities of German Texas",
      "width": 1600,
      "height": 900
    },
    "authorId": "a-marisol",
    "publishedAt": "2026-10-12",
    "readingMinutes": 13,
    "tags": [
      "texas german belt",
      "german towns in texas",
      "german texas history",
      "new braunfels",
      "fredericksburg texas german history",
      "texas heritage road trip"
    ],
    "sourceName": "Texas State Historical Association — Adelsverein",
    "sourceUrl": "https://www.tshaonline.org/handbook/entries/adelsverein",
    "internalLinks": [
      {
        "href": "/article/texas-cultural-regions-explained",
        "label": "Texas cultural regions",
        "description": "See how migrations produced overlapping regional identities."
      },
      {
        "href": "/article/texas-towns-german-czech-mexican-roots",
        "label": "Texas towns and immigration",
        "description": "Distinguish German settlement from Czech, Polish, Wendish and Tejano histories."
      },
      {
        "href": "/explore/painted-churches",
        "label": "Painted Churches of Texas",
        "description": "Explore independently documented church histories and preservation."
      },
      {
        "href": "/destination/fredericksburg",
        "label": "Fredericksburg",
        "description": "Visit the city as a living community, not a reenactment."
      },
      {
        "href": "/destination/new-braunfels",
        "label": "New Braunfels",
        "description": "Follow the town founded in the 1840s and its continuing traditions."
      },
      {
        "href": "/explore/region/hill-country",
        "label": "Hill Country regional guide",
        "description": "Plan parks, towns and river detours."
      },
      {
        "href": "/article/texas-regions-explained",
        "label": "Seven travel regions",
        "description": "Compare the heritage area with TexasDefined's broader region map."
      }
    ],
    "relatedCollections": [],
    "relatedDestinations": [],
    "body": [
      {
        "type": "paragraph",
        "text": "The 'Texas German Belt' is a useful name for an overlapping cultural landscape, not a statutory region with a single official boundary. German-speaking migration profoundly shaped communities in Central Texas and parts of the Hill Country, especially during the nineteenth century. Yet these places were already Indigenous landscapes, and Spanish, Mexican, Tejano, African American, Czech, Wendish and later migrants also shaped the region. A heritage itinerary should acknowledge those layers rather than make one ethnic tradition stand for the whole state."
      },
      {
        "type": "heading",
        "text": "Why German communities formed here"
      },
      {
        "type": "paragraph",
        "text": "Organized settlement associated with the Adelsverein, a German colonization society, helped establish New Braunfels in 1845 and Fredericksburg in 1846. According to the Texas State Historical Association, Prince Carl of Solms-Braunfels and later John O. Meusebach were important figures in this history. Their projects met logistical difficulties and unfolded amid broader struggles over land, transportation and relationships with Native peoples. The early settlements were not isolated folklore villages; they were part of a real and often difficult immigration story."
      },
      {
        "type": "paragraph",
        "text": "Ports, roads and waterways mattered. German newcomers arrived via the Texas coast and moved inland to communities with land, springs, markets and connections to other settlements. The settlement area expanded and diversified over time, so the German-Texan heritage map does not reduce neatly to a straight line between two tourism towns."
      },
      {
        "type": "heading",
        "text": "New Braunfels: a settlement story around Comal Springs"
      },
      {
        "type": "paragraph",
        "text": "New Braunfels is an essential starting point because its founding connects the Adelsverein story with the geography of Comal Springs and the Guadalupe River. Modern visitors can explore an active city with historic neighborhoods, museums, river recreation and German-influenced cultural events. The experience is more informative when paired with what preceded German settlement, especially the Indigenous and Tejano histories of the area, and with the city's later industrial and suburban growth."
      },
      {
        "type": "heading",
        "text": "Fredericksburg and the Hill Country interior"
      },
      {
        "type": "paragraph",
        "text": "Fredericksburg provides another powerful anchor through its historic streetscape, museums, churches, architectural traditions and role in nineteenth-century settlement. Its heritage is visible in buildings, place names, family traditions and food, but many businesses on today's Main Street cater to modern tourists. Separate interpretive history from themed retail: a historic church or museum and a commercial gift shop answer different questions about the region."
      },
      {
        "type": "paragraph",
        "text": "Stonewall, Mason, Castell and neighboring communities expand the story beyond the busiest corridor. Some preserve distinctive family, church and rural traditions that disappear when the trip focuses only on winery signs. Confirm that any specific historic building is open to visitors; roadside visibility is not permission to enter private land."
      },
      {
        "type": "heading",
        "text": "Comfort, Boerne and the smaller-town network"
      },
      {
        "type": "paragraph",
        "text": "Comfort and Boerne form useful stops on an extended itinerary, with historic districts and community institutions that speak to German-Texan settlement and later change. Some of the most revealing places are not marquee attractions but cemeteries, public buildings, churches and town layouts. Read local interpretive materials before arriving and follow property and cemetery rules. Old buildings may have changed owners, functions or access over time."
      },
      {
        "type": "heading",
        "text": "Not all Central European Texas is German Texas"
      },
      {
        "type": "paragraph",
        "text": "Texas has related but distinct Czech, Polish, Wendish and Alsatian communities. They should not be absorbed into a single 'German Belt' label merely because a church has European architecture or a town sells sausage. For instance, the painted churches of Central and South Central Texas represent multiple communities and religious histories; a Wendish site such as Serbin has its own settlement story. Castroville's Alsatian heritage also deserves its own terms. Precision makes the travel guide more interesting."
      },
      {
        "type": "heading",
        "text": "What to look for along a heritage drive"
      },
      {
        "type": "list",
        "items": [
          "Historic districts: trace buildings and street patterns using local preservation or National Register information.",
          "Churches and cemeteries: use public visiting rules and respect active worship and burials.",
          "Museums and archives: prioritize exhibits with provenance, migration records and historical interpretation.",
          "Food and music: compare living traditions with later tourism-era reinventions rather than claiming one unchanging style.",
          "Architecture: examine locally available stone, building techniques and evidence of later alterations.",
          "Land and Native history: place immigrant settlement within the broader story of pre-existing communities and treaties."
        ]
      },
      {
        "type": "heading",
        "text": "A practical two-part route"
      },
      {
        "type": "paragraph",
        "text": "For a first visit, pair New Braunfels with a nearby historic museum or district in one day, then devote a separate day to Fredericksburg and Stonewall. For a longer trip, build a Boerne–Comfort branch or a quieter rural-history branch around Mason. These are suggested travel clusters rather than a claim that all communities are connected by a designated scenic byway. Distances, road closures and visitor hours should be checked anew for the exact travel date."
      },
      {
        "type": "paragraph",
        "text": "The core evidence for this story comes from historical scholarship, local museums, church records and preservation agencies. Texas State Historical Association entries are a useful starting point for dates and settlement organizations; TexasDefined's region and Painted Churches pages provide linked destinations. History stays more accurate when the route explains who built a place, who was already there, whose record survives and what a traveler can actually see today."
      }
    ]
  }
];

// One canonical article per topic. The enrichment supplies claim-specific primary sources,
// media provenance and comprehensive planning detail without introducing competing URLs.
export const regionalAuthorityArticles: Article[] = baseRegionalAuthorityArticles.map((article) => {
  const depth = regionalAuthorityEnrichment[article.slug];
  if (!depth) return article;
  return {
    ...article,
    ...depth,
    region: article.slug === "texas-german-belt" ? "hill-country" : undefined,
    body: [...article.body, ...(depth.body ?? [])],
    internalLinks: [
      ...(article.internalLinks ?? []),
      ...(depth.internalLinks ?? []).filter((link) => !(article.internalLinks ?? []).some((existing) => existing.href === link.href)),
    ],
  };
});
