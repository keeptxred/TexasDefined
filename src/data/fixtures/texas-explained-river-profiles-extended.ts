import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const sharedLinks = [
  { href: "/article/texas-rivers-explained", label: "Major rivers of Texas", description: "Compare this river with the major systems that cross Texas." },
  { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "See how watershed boundaries connect rivers, reservoirs, cities and the Gulf." },
  { href: "/explore/landscapes/rivers-and-river-valleys", label: "Texas rivers and river valleys", description: "Read the physical geography behind floodplains, terraces, springs, canyons and lower river valleys." },
  { href: "/explore/lakes-rivers", label: "Explore Texas lakes and rivers", description: "Find river parks, reservoirs and water destinations across Texas." },
];

const profile = (
  slug: string,
  title: string,
  dek: string,
  hero: Article["hero"],
  sourceUrl: string,
  tags: string[],
  body: ArticleBlock[],
  relatedDestinations: string[] = [],
): Article => ({
  id: `evergreen-${slug}`,
  brandId: "texasdefined",
  slug,
  title,
  dek,
  category: "lakes-rivers",
  hero,
  authorId: "a-marisol",
  publishedAt: "2026-10-05",
  updatedAt: "2026-10-05",
  readingMinutes: 9,
  tags,
  featured: false,
  sourceName: "Texas Water Development Board",
  sourceUrl,
  internalLinks: sharedLinks,
  body,
  relatedCollections: [],
  relatedDestinations,
});

export const texasPecosRiverGuideArticle = profile(
  "texas-pecos-river-guide",
  "Pecos River in Texas: Desert Basin, Canyons & Rio Grande Guide",
  "Follow the Pecos through arid West Texas to Amistad and the Rio Grande, with desert hydrology, canyon geography, salinity, reservoirs and places to see the river.",
  { src: "/images/explore/historic-sites/seminole-canyon-state-park.jpg", alt: "Canyon country near the lower Pecos River in West Texas", width: 1600, height: 1067 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  ["Pecos River", "West Texas rivers", "Lower Pecos", "Amistad", "Rio Grande basin", "Texas geography"],
  [
    p("The Pecos River is one of the defining waterways of far West Texas even though Texas Water Development Board treats it as a major tributary inside the much larger Rio Grande basin. The river begins in the mountains of northern New Mexico, enters Texas in the Permian Basin region and bends southeast across dry ranching and oil country before meeting the Rio Grande in Amistad International Reservoir. That route makes it a useful guide to the difference between a humid river system and a desert one: a very large drainage area does not guarantee abundant flow."),
    h("Why the Pecos looks like a desert river"),
    p("Low precipitation and high evaporation dominate much of the Texas reach. Tributaries are widely spaced, many side channels are intermittent, and the river moves through broad dry basins where water loss can be substantial. Irrigation, groundwater use, reservoir operations and upstream compact obligations also affect how much water reaches different reaches. The result is a river whose ecological and human importance is much larger than its everyday appearance might suggest."),
    p("The Pecos also carries a salinity story. Naturally salty geologic formations, return flows and evaporation can raise dissolved mineral concentrations, especially in lower-flow conditions. That makes water quality as important as quantity when the Pecos is discussed as a supply source or aquatic habitat."),
    h("Canyons, crossings and the lower Pecos"),
    p("Near the lower river, the landscape becomes dramatically incised. Limestone and desert canyon country around the Pecos-Rio Grande confluence gives the waterway a visual identity very different from its broad upstream valley. Historic crossings mattered because dependable routes across the Pecos were scarce, while modern highways and bridges make that geographic obstacle easier to miss."),
    p("The lower river also sits within one of Texas's richest archaeological landscapes. Seminole Canyon State Park and Historic Site protects rock shelters and Lower Pecos cultural resources near the river corridor. The park is not simply a river overlook, but it helps visitors understand why the dependable water and protected canyon environments mattered to people for thousands of years."),
    h("Where to experience the Pecos"),
    list(
      "Seminole Canyon State Park & Historic Site — Lower Pecos canyon country and deep-time human history.",
      "Amistad National Recreation Area — where the Pecos joins the Rio Grande reservoir system.",
      "Pecos and Reeves County — useful for understanding the upper Texas basin, irrigation and desert agriculture.",
      "Highway crossings in Val Verde County — broad views of the lower river and surrounding canyon landscape."
    ),
    h("What the Pecos teaches about Texas"),
    p("The Pecos shows why river geography cannot be reduced to blue lines on a map. In an arid basin, every dependable reach has outsized ecological and economic value. Salinity, drought, interstate water management and irrigation all become visible in the river's condition. Follow the Pecos south and the landscape shifts from high desert basin to deeply cut canyon country before the river disappears into the international reservoir system at Amistad."),
  ],
  ["seminole-canyon-state-park-state-historic-site", "amistad-national-recreation-area"],
);

export const texasSabineRiverGuideArticle = profile(
  "texas-sabine-river-guide",
  "Sabine River in Texas: East Texas, Toledo Bend & Gulf Guide",
  "Understand the Sabine River from wet East Texas headwaters to Toledo Bend, the Louisiana boundary and Sabine Lake, with basin geography, reservoirs and public access.",
  { src: "/images/state-parks/lake-tawakoni-state-park.jpg", alt: "Lake Tawakoni in the upper Sabine River basin of East Texas", width: 1600, height: 1100 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sabine/index.asp",
  ["Sabine River", "Toledo Bend", "East Texas rivers", "Sabine basin", "Texas Louisiana border"],
  [
    p("The Sabine River belongs to a wetter Texas. Its basin receives substantially more precipitation than western and central parts of the state, and Texas Water Development Board identifies it as one of the state's highest-yield river systems. From headwaters in Northeast Texas, the river gathers water through lake and forest country, eventually forming much of the Texas-Louisiana boundary before reaching Sabine Lake and the Gulf."),
    h("A high-flow East Texas river"),
    p("High rainfall and lower evaporation give the Sabine a different hydrologic character from rivers of the Panhandle, Trans-Pecos or South Texas. Forested tributaries, broad bottomlands and humid floodplains are common parts of the basin. The river can carry large flood volumes, but it also supports a major surface-water supply network."),
    p("The upper basin includes Lake Tawakoni and Lake Fork, while Toledo Bend Reservoir dominates the lower-middle river. Toledo Bend is one of the largest reservoirs in the United States by surface area and is jointly managed across the Texas-Louisiana boundary. Its scale makes it easy to forget that it is an impounded reach of the Sabine system rather than a natural lake."),
    h("Boundary river and Gulf connection"),
    p("Downstream from Toledo Bend, the Sabine becomes the interstate boundary for a long reach. The river continues through increasingly low coastal terrain before entering Sabine Lake, where freshwater from the Sabine and Neches systems meets tidal and estuarine water connected to the Gulf of Mexico."),
    p("That lower transition matters ecologically. River flow carries sediment, nutrients and freshwater into marshes and estuarine habitat. It also matters economically because the Sabine-Neches waterway is tied to major industrial and port infrastructure near Beaumont, Port Arthur and Orange."),
    h("Where to experience the Sabine"),
    list(
      "Lake Tawakoni State Park — an accessible upper-basin reservoir landscape.",
      "Toledo Bend Reservoir — the basin's defining managed-water landscape.",
      "Sabine National Forest — forest, tributary and reservoir scenery along Toledo Bend.",
      "Orange and Sabine Lake — best for understanding the river's lower estuary and Gulf connection."
    ),
    h("What the Sabine teaches about Texas"),
    p("The Sabine is one of the clearest reminders that East Texas belongs hydrologically to the humid South as much as to the state's western image. Forests, high rainfall, bottomlands, reservoirs and estuaries define the river. It also demonstrates how a river can serve simultaneously as an ecological corridor, a state boundary, a drinking-water source, a major recreation system and part of an industrial navigation network."),
  ],
  ["lake-tawakoni-state-park"],
);

export const texasNechesRiverGuideArticle = profile(
  "texas-neches-river-guide",
  "Neches River in Texas: Big Thicket, Angelina & Bottomlands Guide",
  "Follow the Neches through Piney Woods bottomlands, the Angelina system, Sam Rayburn and Big Thicket to Sabine Lake, with ecology, reservoirs and public access.",
  { src: "/images/state-parks/village-creek-state-park.jpg", alt: "Forested East Texas waterway in the Neches River basin", width: 1600, height: 1200 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/neches/index.asp",
  ["Neches River", "Big Thicket", "Angelina River", "East Texas rivers", "Neches basin"],
  [
    p("The Neches River is one of Texas's strongest examples of a forest river. It rises in East Texas and flows south through the Piney Woods toward Sabine Lake, gathering the Angelina River and a web of creeks and bayous along the way. Compared with the limestone channels of Central Texas, the Neches is shaped by wetter climate, lower gradients, broad bottomlands and dense riparian vegetation."),
    h("Bottomlands, sloughs and the Piney Woods"),
    p("Lower-gradient reaches allow the Neches to spread across wide floodplains during high water. Abandoned channels, wetlands, sloughs and bottomland hardwood forests occupy parts of the valley. Those features store floodwater, trap sediment and create habitat that looks more like the lower South than the rocky rivers many visitors associate with Texas."),
    p("Village Creek, one of the best-known tributary landscapes, runs through forest and sandbars before joining the Neches. Farther south, Big Thicket National Preserve protects a remarkable mosaic of riverine forest, bayous, wetlands and upland communities linked to the lower basin."),
    h("The Angelina and reservoir system"),
    p("The Angelina River is the Neches's major tributary. Sam Rayburn Reservoir on the Angelina is one of the state's largest reservoirs, while B.A. Steinhagen Lake lies farther downstream near the Neches-Angelina system. These impoundments provide water, flood-management and recreation benefits while changing natural flow timing and sediment transport."),
    p("The Neches eventually reaches the Beaumont-Port Arthur area and joins the Sabine system in Sabine Lake. By that point, a river that began among inland East Texas forests has become part of a tidal estuary and nationally important industrial waterway."),
    h("Where to experience the Neches"),
    list(
      "Village Creek State Park — paddling, sandbars and Piney Woods tributary scenery.",
      "Big Thicket National Preserve — bottomland and wetland landscapes connected to the lower Neches.",
      "Martin Dies, Jr. State Park — access to the B.A. Steinhagen reservoir landscape.",
      "Sam Rayburn Reservoir — the Angelina branch of the Neches system."
    ),
    h("What the Neches teaches about Texas"),
    p("The Neches makes river ecology visible. Forest cover, rainfall and low relief produce a corridor of bottomlands and wetlands very different from the flashier rivers of limestone country. It also shows how reservoirs on tributaries can reshape an entire basin and how inland river water ultimately becomes part of coastal estuaries, marshes and navigation systems."),
  ],
  ["village-creek-state-park", "martin-dies-jr-state-park"],
);

export const texasNuecesRiverGuideArticle = profile(
  "texas-nueces-river-guide",
  "Nueces River in Texas: Headwaters, Choke Canyon & Coastal Bend",
  "Trace the Nueces from clear Edwards Plateau headwaters through dry South Texas to Choke Canyon, Lake Corpus Christi and Nueces Bay.",
  { src: "/images/state-parks/choke-canyon-calliham-unit-state-park.jpg", alt: "Choke Canyon reservoir landscape in the Nueces River basin", width: 1600, height: 900 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/nueces/",
  ["Nueces River", "Choke Canyon", "South Texas rivers", "Nueces basin", "Coastal Bend"],
  [
    p("The Nueces River begins in some of Texas's clearest limestone country and ends in the Coastal Bend after crossing a much drier landscape. Its headwaters rise in Edwards and Real counties, where springs, limestone channels and deep pools can make the upper river look abundant. Yet Texas Water Development Board classifies the larger Nueces basin as relatively arid with a low average watershed yield."),
    h("Clear headwaters, dry basin"),
    p("That contrast is central to understanding the Nueces. In the upper basin, groundwater and limestone geology can create clear reaches and persistent pools. Downstream, higher evaporation, drought and water demand become more obvious. Flow can vary dramatically, and a beautiful upper-river swimming reach should not be mistaken for evidence that the entire basin has plentiful water."),
    p("The Frio, Sabinal, Leona and Atascosa rivers are important tributaries. Together they create a basin that connects the Edwards Plateau and Hill Country edge with ranch country, the Winter Garden region and the Coastal Bend."),
    h("Reservoirs and Corpus Christi water"),
    p("Choke Canyon Reservoir and Lake Corpus Christi are the major storage features of the basin. They help supply the Corpus Christi region while also supporting fishing, boating and wildlife habitat. Their presence turns the lower Nueces into a managed water-supply system in addition to a natural river."),
    p("Below the reservoirs, the river continues toward Nueces Bay. Freshwater inflow matters to the bay and estuary just as upstream withdrawals matter to cities and farms, making the Nueces a clear example of competing demands sharing one connected watershed."),
    h("Where to experience the Nueces"),
    list(
      "Upper Nueces near Camp Wood and Barksdale — clear limestone headwater scenery.",
      "Choke Canyon State Park — reservoir recreation and South Texas wildlife.",
      "Lake Corpus Christi State Park — lower-basin reservoir access.",
      "Nueces Bay and the Coastal Bend — where inland river water becomes estuarine water."
    ),
    h("What the Nueces teaches about Texas"),
    p("The Nueces is a lesson in hydrologic contrast. A river can begin in spring-influenced limestone country, cross a drought-prone basin, feed major reservoirs and still have important freshwater responsibilities at the coast. It also shows why groundwater, surface water and estuary health cannot be separated when planning for South Texas."),
  ],
  ["choke-canyon-calliham-unit-state-park", "lake-corpus-christi-state-park"],
);

export const texasFrioRiverGuideArticle = profile(
  "texas-frio-river-guide",
  "Frio River in Texas: Garner, Concan, Springs & Clear Water",
  "Explore the Frio River through Garner State Park and Concan, with spring-fed Hill Country geography, cypress corridors, flood risk and its place in the Nueces basin.",
  { src: "/images/state-parks/garner-state-park.jpg", alt: "The Frio River corridor at Garner State Park in Texas", width: 1600, height: 230 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/nueces/",
  ["Frio River", "Garner State Park", "Concan", "Hill Country rivers", "Nueces basin"],
  [
    p("The Frio River is one of the most recognizable recreational rivers in Texas: clear water, pale limestone gravel, towering bald cypress and steep Hill Country slopes. The name means cold in Spanish, and the river's spring influence helps explain both its reputation for cool water and its importance as a tributary of the larger Nueces system."),
    h("Why the Frio is so clear"),
    p("The upper Frio crosses limestone country where groundwater can move through fractures and karst before emerging into streams and springs. Rocky channels contribute relatively little fine sediment in normal conditions, helping produce the clarity visitors associate with the river. During floods, however, the same channel can become fast, turbid and dangerous."),
    p("The river flows south through Real and Uvalde county country, including Leakey, Concan and Garner State Park. Farther downstream it leaves the most dramatic Hill Country terrain and eventually joins the Nueces system."),
    h("Garner, Concan and public access"),
    p("Garner State Park is the best-known public access point, with river frontage, swimming, paddling and hiking above the valley. Concan is surrounded by private lodging, outfitters and access points, so visitors need to distinguish between public access and private riverfront property."),
    p("The Frio's popularity also makes water conditions important. Drought can reduce flow and separate the river into slower pools, while heavy upstream rainfall can create flash-flood conditions quickly. Trip planning should include current flow, weather and access information rather than assuming the river behaves the same every summer weekend."),
    h("Where to experience the Frio"),
    list(
      "Garner State Park — the classic public Frio experience.",
      "Concan — tubing and lodging corridor with multiple private access points.",
      "Leakey and upper Real County — headwater-valley scenery and nearby tributaries.",
      "Uvalde County downstream — where the river transitions toward drier South Texas."
    ),
    h("What the Frio teaches about Texas"),
    p("The Frio explains why some Texas rivers become cultural landmarks. Geology, groundwater, scenery and public access combine to create a recreational identity, but the river remains part of a larger basin with drought, flood and water-supply constraints. Its clear pools are not separate from those regional pressures; they are one visible expression of the same hydrologic system."),
  ],
  ["garner-state-park"],
);

export const texasSanAntonioRiverGuideArticle = profile(
  "texas-san-antonio-river-guide",
  "San Antonio River: Headwaters, River Walk, Missions & Lower Basin",
  "Follow the San Antonio River from spring-fed headwaters through downtown, the missions and rural South Texas to its confluence with the Guadalupe.",
  { src: "/images/editorial/moving/san-antonio.jpg", alt: "The San Antonio River through the River Walk in downtown San Antonio", width: 1600, height: 900 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/sanantonio/",
  ["San Antonio River", "River Walk", "San Antonio Missions", "Bexar County", "Texas rivers"],
  [
    p("The San Antonio River is famous for a few landscaped downtown miles, but the actual river system is much longer and more revealing. It begins from spring-influenced headwaters in Bexar County, passes through central San Antonio and the mission corridor, then continues southeast across agricultural and coastal-plain country before joining the Guadalupe River near Tivoli."),
    h("A spring-origin city river"),
    p("Historically, springs and shallow groundwater helped sustain the upper river and nearby settlement. The relationship between groundwater and surface flow remains important because the San Antonio basin has long relied heavily on aquifers. Pumping, recharge, conservation and springflow therefore affect more than underground storage."),
    p("Downtown, the River Walk is a heavily engineered urban reach with channels, flood-control infrastructure, pedestrian paths and commercial development. It is useful to experience, but it should not be mistaken for the entire river."),
    h("The mission reach and lower basin"),
    p("South of downtown, the river passes San Antonio Missions National Historical Park, where acequias, fields and mission communities show how water shaped colonial settlement. Farther downstream, the river becomes progressively more rural and receives tributaries including the Medina River and Cibolo Creek."),
    p("The San Antonio eventually joins the Guadalupe rather than entering the Gulf under its own name. That confluence is a useful reminder that political and cultural identity does not always match hydrologic hierarchy: one of Texas's most famous named rivers is ultimately a tributary inside a larger coastal system."),
    h("Where to experience the San Antonio River"),
    list(
      "San Antonio headwaters and Brackenridge-area reaches — upper-basin context.",
      "Downtown River Walk — engineered urban river landscape.",
      "Mission Reach — restored river corridor and World Heritage mission landscape.",
      "Goliad region — lower-basin history and a more rural river character."
    ),
    h("What the San Antonio River teaches"),
    p("Few Texas rivers show human modification more clearly. Springs, acequias, flood-control works, urban channels, ecosystem restoration and downstream agriculture all occupy the same connected river. Following it beyond downtown turns a tourist landmark into a lesson about groundwater, settlement, engineering and watershed-scale planning."),
  ],
  ["san-antonio-missions-national-historical-park"],
);

export const texasRedRiverGuideArticle = profile(
  "texas-red-river-guide",
  "Red River in Texas: Oklahoma Boundary, Plains & Lake Texoma",
  "Follow the Red River along North Texas with its sediment-rich water, prairie tributaries, Lake Texoma, interstate compact and Mississippi-system connection.",
  { src: "/images/state-parks/copper-breaks-state-park.jpg", alt: "Rolling Plains landscape in the Red River basin of North Texas", width: 1600, height: 900 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/red/index.asp",
  ["Red River Texas", "Lake Texoma", "Texas Oklahoma border", "North Texas rivers", "Red River basin"],
  [
    p("The Red River is Texas's great northern boundary river. From headwaters in the southern High Plains, the system gathers forks and tributaries across the Panhandle and Rolling Plains before forming much of the Texas-Oklahoma boundary. It then continues east beyond Texas into the larger Mississippi drainage network."),
    h("Why the river is red"),
    p("The river's name comes from the sediment and soils that can color its water during high flow. Erosion across the plains delivers fine material into tributaries such as the Pease, Wichita and Little Wichita. Naturally occurring salts and chlorides are another important feature of parts of the basin and have shaped long-running water-quality management efforts."),
    p("Unlike Texas rivers that terminate in a bay on the Gulf Coast, the Red ultimately belongs to the Mississippi system. That makes it part of a continental drainage story extending far beyond Texas."),
    h("Boundary, compact and reservoirs"),
    p("Because the basin crosses multiple states, water allocation is governed in part by the Red River Compact among Texas, Oklahoma, Arkansas and Louisiana. The interstate setting also affects boundary questions, water rights and reservoir management."),
    p("Lake Texoma, formed by Denison Dam on the Red River, is the best-known reservoir on the lower Texas boundary reach. Elsewhere, tributary reservoirs support municipal supply, flood management and recreation across North Texas and the Rolling Plains."),
    h("Where to experience the Red River system"),
    list(
      "Lake Texoma — broad reservoir scenery on the Texas-Oklahoma boundary.",
      "Copper Breaks State Park region — Rolling Plains tributary and badland context.",
      "Wichita Falls area — Wichita tributary system and North Texas water-supply context.",
      "Texarkana and Northeast Texas — downstream transition toward the humid Red River country."
    ),
    h("What the Red River teaches about Texas"),
    p("The Red River complicates the idea that Texas water simply flows south. It points east into a much larger continental system, marks a state boundary and carries a strong plains sediment signature. Its compact, chloride issues and large reservoirs also show how geology and political geography can be as important as rainfall in determining how a river is managed."),
  ],
  ["copper-breaks-state-park"],
);

export const texasCanadianRiverGuideArticle = profile(
  "texas-canadian-river-guide",
  "Canadian River in Texas: Panhandle Breaks, Lake Meredith & High Plains",
  "Trace the Canadian River across the Texas Panhandle from High Plains breaks to Lake Meredith, with drought, Ogallala context, canyon geography and interstate water management.",
  { src: "/images/explore/lakes-rivers/lake-meredith-national-recreation-area.jpg", alt: "Lake Meredith and Canadian River canyon country in the Texas Panhandle", width: 1600, height: 2979 },
  "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/canadian/index.asp",
  ["Canadian River Texas", "Lake Meredith", "Texas Panhandle", "High Plains", "Canadian River basin"],
  [
    p("The Canadian River is the northernmost major river basin in Texas and one of the best places to see the High Plains broken open by flowing water. The river rises in New Mexico, crosses the northern Panhandle and continues into Oklahoma before joining the Arkansas River system. In Texas, its basin is relatively dry, with low precipitation and high evaporation limiting average watershed yield."),
    h("A river cutting the edge of the High Plains"),
    p("The Panhandle often looks almost level from the highway, but the Canadian has carved a broad corridor of breaks, mesas and tributary valleys through that surface. The contrast between flat upland and dissected river country is one of the basin's defining landscape features."),
    p("Palo Duro and Wolf creeks are among the basin's smaller streams. Rainfall can be episodic, so flow changes sharply between dry periods and storm runoff. That variability is amplified by regional drought."),
    h("Lake Meredith and Panhandle water"),
    p("Lake Meredith was created by Sanford Dam on the Canadian River and has long played an important role in regional municipal water supply and recreation. Its changing level has also made drought and water-supply stress visible to residents of the Panhandle."),
    p("Groundwater adds another layer. The Ogallala Aquifer historically supplied much of the region's water, but long-term declines increase the importance of careful management of both groundwater and the relatively limited surface-water system. The Canadian River Compact with New Mexico and Oklahoma further shapes reservoir storage and interstate allocation."),
    h("Where to experience the Canadian"),
    list(
      "Lake Meredith National Recreation Area — the clearest public view of the river's canyon and reservoir landscape.",
      "Canadian River breaks north of Amarillo — broad views of dissected Panhandle terrain.",
      "Canadian, Texas and Hemphill County — eastern-basin ranching and river-country context.",
      "Alibates Flint Quarries area — High Plains archaeology and Canadian River landscape near Lake Meredith."
    ),
    h("What the Canadian teaches about Texas"),
    p("The Canadian River shows that the Panhandle is not simply flat grassland. Water has cut deeply into the plateau, exposing a rugged landscape hidden from many highways. It also demonstrates how drought, interstate compacts, reservoirs and groundwater decline interact in a basin where surface water is comparatively scarce."),
  ],
  ["lake-meredith-national-recreation-area"],
);

export const texasExtendedRiverProfileArticles: Article[] = [
  texasPecosRiverGuideArticle,
  texasSabineRiverGuideArticle,
  texasNechesRiverGuideArticle,
  texasNuecesRiverGuideArticle,
  texasFrioRiverGuideArticle,
  texasSanAntonioRiverGuideArticle,
  texasRedRiverGuideArticle,
  texasCanadianRiverGuideArticle,
];
