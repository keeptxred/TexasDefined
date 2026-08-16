import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const collectionLink = { href: "/texas-explained", label: "Texas Explained", description: "Connect this river with the larger systems, landscapes and settlement patterns that shape Texas." };
const riversLink = { href: "/article/texas-rivers-explained", label: "The rivers that built Texas", description: "Return to the statewide guide and compare the major river systems side by side." };
const basinsLink = { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "See why watershed boundaries matter more than county lines when following water across the state." };
const aquifersLink = { href: "/article/texas-aquifers-springs-explained", label: "Texas aquifers and springs", description: "Add the groundwater systems that feed, sustain or interact with many Texas rivers." };
const reservoirsLink = { href: "/article/texas-lakes-reservoirs-explained", label: "Why Texas built so many reservoirs", description: "Understand the dams and stored-water systems layered onto Texas rivers." };

export const texasBrazosRiverGuideArticle: Article = {
  id: "evergreen-texas-brazos-river-guide", brandId: "texasdefined", slug: "texas-brazos-river-guide",
  title: "The Brazos River Explained: The Texas Basin With the Biggest Flow",
  dek: "The Brazos crosses an enormous slice of Texas from the Rolling Plains to the Gulf. Its tributaries, reservoirs and changing water demands help explain farming, cities, floodplains and the state's surface-water map.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/lake-somerville-birch-creek-unit.jpg", alt: "Open water and wooded shoreline in the Brazos River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Brazos River", "Brazos River basin", "Texas rivers", "Texas water", "Texas geography", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp",
  internalLinks: [riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/brazos/index.asp", label: "TWDB Brazos River Basin", description: "Official Texas Water Development Board basin overview, tributaries, reservoirs and water-supply context." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("The Brazos is one of the rivers that makes Texas look simple on a map and complicated on the ground. It begins where the Salt Fork and Double Mountain Fork meet in Stonewall County, then runs across a huge cross-section of the state before reaching the Gulf of Mexico. Along the way, the basin ties together dry western headwaters, farm country, fast-growing cities, major reservoirs and broad lower-river floodplains."),
    h("Why the Brazos is such a big Texas river"),
    p("The Texas Water Development Board identifies the Brazos as the second-largest river basin by area within Texas. The river itself is the state's third longest, and TWDB lists it as having the largest average annual flow volume of any Texas river. Those facts matter because length, drainage area and flow are three different ways to describe a river—and the Brazos is unusually important by all three."),
    p("The basin is not just the main stem. It includes the Salt, Double Mountain and Clear forks, along with the Little, Leon, Navasota, Paluxy, Nolan, Lampasas and other rivers and creeks. Rain falling far from the Brazos itself can still become Brazos water if it falls inside that watershed."),
    h("The upper basin and the groundwater connection"),
    p("TWDB highlights a major pressure in the upper basin: increasing demand for surface water as groundwater supplies decline, particularly where the Ogallala Aquifer historically supplied much of the water. That is an important reminder that surface water and groundwater planning are not separate stories. When one source becomes less dependable, pressure can shift to another."),
    h("Reservoirs turned the Brazos into a managed water system"),
    p("The Brazos basin contains a long list of reservoirs, including Possum Kingdom Lake, Lake Whitney, Lake Waco, Lake Granbury, Lake Somerville and many others. They do not make the river artificial, but they do change how water is stored, released and used. Flood control, municipal supply, recreation and downstream needs all become part of the basin's modern operating system."),
    p("That is why the Brazos is best understood as more than a scenic river corridor. The river connects infrastructure and communities across hundreds of miles. A reservoir in one part of the basin, a groundwater decline in another and urban demand somewhere downstream can all belong to the same statewide water story."),
    h("What changes as the river crosses Texas"),
    list(
      "The western and upper basin is generally drier and more water-constrained than the lower basin.",
      "Tributaries expand the drainage network long before water reaches the lower Brazos.",
      "Reservoirs store water and alter the timing of downstream flows.",
      "Agriculture, towns and metropolitan growth create different kinds of demand in different reaches.",
      "The lower river eventually carries the basin's water toward the Gulf of Mexico."
    ),
    h("Why the Brazos matters beyond the riverbank"),
    p("The Brazos helps explain why Texas water policy follows basins rather than political boundaries. It also shows why a river's identity is not one landscape. The same basin can include High Plains water concerns, Central Texas reservoirs and humid lower-river country."),
    p("If you want to understand Texas as a connected physical system, the Brazos is one of the best examples. It takes water from a vast interior watershed and gathers tributaries, reservoirs, cities and farms into one route to the Gulf. The river is not just a line across Texas; it is an organizing system beneath a large part of the state."),
  ],
};

export const texasColoradoRiverGuideArticle: Article = {
  id: "evergreen-texas-colorado-river-guide", brandId: "texasdefined", slug: "texas-colorado-river-guide",
  title: "The Colorado River Explained: The Texas River That Runs Through Austin",
  dek: "Texas' Colorado River begins far west of Austin and runs entirely within the state to Matagorda Bay. Its long, relatively dry basin and chain of reservoirs show why river length and water yield are not the same thing.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/pedernales-falls-state-park.jpg", alt: "Limestone river channel and flowing water in the Colorado River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Colorado River Texas", "Colorado River basin", "Highland Lakes", "Texas rivers", "Austin water", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/",
  internalLinks: [riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/colorado/", label: "TWDB Colorado River Basin", description: "Official basin overview with river path, tributaries, reservoirs and water-planning context." },
  ], relatedCollections: [], relatedDestinations: ["pedernales-falls-state-park"],
  body: [
    p("Texas has its own Colorado River, separate from the Colorado River that carved the Grand Canyon. The Texas Colorado rises in West Texas, runs through the center of the state and eventually reaches Matagorda Bay and the Gulf. It is one of the clearest examples of how a river can be extremely long without producing an equally large volume of water."),
    h("A long river across a relatively dry basin"),
    p("TWDB describes the Colorado Basin as the third largest river basin by area within Texas. The Colorado is the second-longest river in the state, yet only sixth in average annual flow volume. A large portion of its watershed lies in relatively arid parts of Texas, so the basin produces less runoff per unit of land than wetter river systems farther east."),
    p("That contrast is useful: a river's length does not tell you how much water it carries. Rainfall, evaporation, soils, vegetation, geology and the timing of storms all help determine how much water a basin actually yields."),
    h("The tributaries explain the Hill Country connection"),
    p("The Colorado's tributary network includes the Concho, Llano, Pedernales and San Saba rivers as well as Pecan Bayou and many creeks. Those tributaries connect landscapes that can feel unrelated when you drive across them. The Pedernales and Llano are associated with the Hill Country; the main Colorado reaches Austin and then continues toward the Coastal Plain."),
    h("The reservoir chain is part of the river's modern identity"),
    p("TWDB lists Lake Buchanan, Inks Lake, Lake LBJ, Lake Marble Falls, Lake Travis, Lake Austin and Lady Bird Lake among the reservoirs in the Colorado basin, along with many others farther upstream and downstream. Around Central Texas, that sequence makes it easy to forget that these named lakes are pieces of a river system."),
    p("Reservoirs store water, support recreation and help manage supply, but they also mean the Colorado is heavily managed. TWDB identifies balancing human water demands and environmental needs as an important issue in the basin."),
    h("Why Austin looks like a river-and-reservoir city"),
    p("In Austin, the Colorado is visible as a broad urban water corridor, but the water arriving there is the product of an enormous upstream basin. The lakes above the city are not isolated attractions; they are connected storage on the same river. Downstream, the Colorado continues through a very different landscape before reaching Matagorda Bay."),
    h("What this river teaches about Texas water"),
    list(
      "Long rivers can have relatively modest average flow when much of the watershed is dry.",
      "Tributaries connect West Texas, the Hill Country, Austin and the Coastal Plain inside one basin.",
      "Named lakes can be sequential reservoirs on a single river system.",
      "Urban water, recreation and environmental flows all depend on the same connected watershed.",
      "The basin changes character dramatically from its western headwaters to the Gulf Coast."
    ),
    h("The Colorado is a map of Central Texas water"),
    p("Following the Texas Colorado from west to east explains a surprising amount about the state. The river links dry interior country to spring-fed tributaries, a reservoir chain, one of Texas' largest cities and finally a coastal bay. It is a river where geography and infrastructure are almost impossible to separate—and that is exactly why it belongs at the center of any explanation of Texas water."),
  ],
};

export const texasGuadalupeRiverGuideArticle: Article = {
  id: "evergreen-texas-guadalupe-river-guide", brandId: "texasdefined", slug: "texas-guadalupe-river-guide",
  title: "The Guadalupe River Explained: Springs, Canyon Lake and a Hill Country River",
  dek: "The Guadalupe begins in the Hill Country, receives important spring-fed tributaries and flows toward San Antonio Bay. Its basin makes the groundwater-surface-water connection unusually easy to see.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/guadalupe-river-state-park.jpg", alt: "Clear Guadalupe River flowing beneath mature cypress trees", width: 1600, height: 1115 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Guadalupe River", "Guadalupe River basin", "Canyon Lake", "Texas Hill Country", "Texas springs", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp",
  internalLinks: [riversLink, basinsLink, aquifersLink, reservoirsLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/guadalupe/index.asp", label: "TWDB Guadalupe River Basin", description: "Official basin overview describing the river, tributaries, reservoirs and groundwater-surface-water issue." },
    { href: "https://tpwd.texas.gov/state-parks/guadalupe-river", label: "Guadalupe River State Park", description: "Official TPWD visitor information for public river access, recreation and current park conditions." },
  ], relatedCollections: [], relatedDestinations: ["guadalupe-river-state-park"],
  body: [
    p("The Guadalupe is the river many Texans picture when they think about the Hill Country: clear water, limestone, cypress roots and recreation. But the basin is more complicated than a float trip. It connects spring-fed streams, aquifers, Canyon Lake, fast-growing communities and a river that ultimately leaves the hills and flows toward San Antonio Bay."),
    h("Where the Guadalupe begins and where it goes"),
    p("TWDB traces the Guadalupe from the confluence of its North and South forks in Kerr County to San Antonio Bay. The basin is entirely within Texas. Important streams inside it include the Blanco, Comal and San Marcos rivers as well as Sandies and Coleto creeks."),
    p("That list matters because some of the best-known spring systems in Central Texas feed rivers inside the same basin. The Guadalupe is therefore a good place to see how groundwater can become surface water and how aquifer conditions can show up in river flow."),
    h("Groundwater and river flow are connected here"),
    p("TWDB identifies overpumping of underlying aquifers as a major concern in the Guadalupe basin. Cities and irrigators have historically relied on groundwater, and because groundwater and surface water interact, heavy pumping can reduce base flows in the Guadalupe and tributaries."),
    p("Base flow is the portion of streamflow sustained between rain events, often by groundwater discharge. In a spring-influenced river system, that connection helps explain why river conditions cannot be understood from rainfall alone."),
    h("Canyon Lake changed the river's modern water system"),
    p("Canyon Lake sits on the Guadalupe northwest of New Braunfels. TWDB identifies the project as a U.S. Army Corps of Engineers reservoir used for flood control, hydropower, water supply and recreation. Downstream communities experience a river whose flow reflects both natural watershed conditions and managed reservoir releases."),
    h("The river changes as it leaves the Hill Country"),
    p("Upstream, limestone terrain and clear water dominate the popular image of the Guadalupe. Farther downstream, the river moves into lower, warmer country and becomes part of a larger coastal drainage system. The recreational Hill Country river and the lower-basin water-supply river are the same connected system."),
    h("Why public access matters"),
    p("TPWD notes that Texas rivers provide recreation to millions of people and maintains paddling trails and leased-access programs in multiple basins. Guadalupe River State Park adds a major public access point with river frontage for swimming, paddling, fishing and other uses. Access is not the same everywhere along a Texas river, so public parks and designated access sites matter."),
    h("What the Guadalupe teaches"),
    list(
      "A river can be strongly influenced by groundwater as well as direct runoff.",
      "Spring-fed tributaries make aquifer conditions visible at the surface.",
      "A major reservoir can reshape flood control, water supply and downstream flow management.",
      "The familiar Hill Country reach is only one part of a basin that continues toward the coast.",
      "Recreation, municipal supply and ecosystem needs all depend on the same connected water system."
    ),
    h("A small basin with an outsized Texas identity"),
    p("The Guadalupe basin is much smaller than the Brazos, Colorado or Rio Grande basins, but it concentrates many of the water questions Texans care about: springs, aquifer pumping, reservoirs, public river access, flood risk and rapid growth. That makes it one of the most useful rivers for understanding how Texas water works at human scale."),
  ],
};

export const texasTrinityRiverGuideArticle: Article = {
  id: "evergreen-texas-trinity-river-guide", brandId: "texasdefined", slug: "texas-trinity-river-guide",
  title: "The Trinity River Explained: The River System Behind Dallas-Fort Worth",
  dek: "The Trinity River basin is entirely inside Texas and sits beneath much of Dallas-Fort Worth's water story. Its forks, reservoirs and downstream exports connect a major metro area with the Gulf Coast.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/ray-roberts-lake-isle-du-bois-unit.jpg", alt: "Reservoir shoreline and open water in the upper Trinity River basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Trinity River", "Trinity River basin", "Dallas Fort Worth water", "Texas rivers", "Texas reservoirs", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp",
  internalLinks: [riversLink, basinsLink, reservoirsLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/trinity/index.asp", label: "TWDB Trinity River Basin", description: "Official basin overview covering the forks, reservoirs, metropolitan demand and downstream water exports." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("For millions of North Texans, the Trinity River is easy to overlook because the basin is more visible as lakes, creeks, levees and urban greenways than as one dramatic river canyon. Hydrologically, though, the Trinity is one of the most important river systems in the state."),
    h("The largest basin entirely inside Texas"),
    p("TWDB describes the Trinity Basin as the largest river basin whose watershed area lies entirely within Texas. The main river forms near Dallas where the Elm and West forks come together, then flows southeast toward Trinity Bay and the Gulf of Mexico."),
    p("The basin also includes the Clear, East, Elm and West forks plus Cedar, Chambers and Richland creeks. In a heavily urbanized region, those tributaries and forks are part of the same watershed even when they look like separate local waterways."),
    h("Dallas-Fort Worth sits in the upper basin"),
    p("TWDB specifically identifies the Dallas-Fort Worth metropolitan area as a major upper-basin demand center. That makes the Trinity a useful example of an urban river system where water supply cannot be understood by looking at the river channel alone. Reservoirs distributed around North Texas are a central part of how the region stores and manages water."),
    h("A network of reservoirs supports the metro area"),
    p("TWDB lists reservoirs such as Lewisville Lake, Grapevine Lake, Ray Roberts Lake, Lake Bridgeport, Eagle Mountain Lake, Lake Worth, Cedar Creek Reservoir, Richland-Chambers Reservoir and Lake Livingston within the basin. Different reservoirs serve different combinations of supply, flood-control and recreational purposes, but together they show how engineered storage became inseparable from the natural watershed."),
    h("The basin connects DFW to Houston-area demand"),
    p("The Trinity is not only a North Texas water story. TWDB notes that water from the lower basin is exported to the Houston area. Increasing demand in both metropolitan regions makes balancing human needs and environmental requirements an important basin issue."),
    p("That connection is easy to miss on a road map. Dallas-Fort Worth and Houston feel like separate urban systems, but statewide water infrastructure can link their needs through the same river basin."),
    h("Why the river can feel less obvious than the basin"),
    p("In many places, people interact with the Trinity system through reservoirs, tributaries, parks or flood-control corridors rather than the main stem. That does not make the river less important. It means the functional watershed is broader than the landscape most residents see day to day."),
    h("What the Trinity teaches"),
    list(
      "A major river basin can be heavily urban even when the river itself is not the region's dominant visual landmark.",
      "Forks and tributaries make local creeks part of a much larger watershed.",
      "Reservoir networks are fundamental to metropolitan water supply.",
      "Water can be moved between demand centers, so a basin can serve people far from the main river.",
      "Rapid growth makes water-supply planning and environmental-flow questions increasingly connected."
    ),
    h("The hidden water map under North Texas"),
    p("The Trinity explains why North Texas water is a regional system rather than a city-by-city system. Lakes that look independent on a recreation map, creeks that feel local and the river corridor through Dallas all belong to one basin that continues to the Gulf. Understanding that network makes the water infrastructure of Dallas-Fort Worth far easier to read."),
  ],
};

export const texasRioGrandeGuideArticle: Article = {
  id: "evergreen-texas-rio-grande-river-guide", brandId: "texasdefined", slug: "texas-rio-grande-river-guide",
  title: "The Rio Grande Explained: Texas' International River and Largest Basin",
  dek: "The Rio Grande crosses states, deserts and an international boundary before reaching the Gulf. In Texas, its enormous basin, low watershed yield and compact-and-treaty rules make it a river unlike any other in the state.",
  category: "lakes-rivers",
  hero: { src: "/images/explore/lakes-rivers/amistad-national-recreation-area.jpg", alt: "Blue reservoir water and arid canyon landscape in the Rio Grande basin", width: 1600, height: 1067 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 10,
  tags: ["Rio Grande", "Rio Grande basin", "Texas Mexico border", "Amistad Reservoir", "Texas water", "TWDB"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/",
  internalLinks: [riversLink, basinsLink, reservoirsLink, aquifersLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/river_basins/riogrande/", label: "TWDB Rio Grande River Basin", description: "Official Texas basin overview covering geography, tributaries, reservoirs and interstate/international allocation." },
  ], relatedCollections: [], relatedDestinations: ["amistad-national-recreation-area"],
  body: [
    p("The Rio Grande is both a river and a boundary, which makes it fundamentally different from the other major rivers Texas manages entirely within the state. Its water begins far upstream, crosses multiple jurisdictions and eventually forms the international boundary between Texas and Mexico from El Paso to the Gulf of Mexico."),
    h("The largest basin footprint in Texas"),
    p("TWDB identifies the Rio Grande Basin as covering the largest area in Texas of any major river basin. The full river begins in Colorado, flows through New Mexico and later receives the Rio Conchos from Mexico before continuing along the Texas-Mexico border."),
    p("Within the Texas portion of the basin, important tributaries include the Pecos and Devils rivers, along with Alamito, Mud and Pinto creeks and the Arroyo Colorado. Those tributaries connect mountain, desert, spring-fed and agricultural landscapes to the same international river system."),
    h("A huge basin can still have a low water yield"),
    p("The basin's scale can be misleading. TWDB describes its average annual watershed yield as extremely low because so much of the watershed lies in arid or semiarid climate. Like the Texas Colorado, the Rio Grande shows why drainage area and reliable water supply are not the same thing."),
    h("Water allocation crosses state and national borders"),
    p("TWDB notes that surface water in the basin is governed by multiple agreements, including the Pecos River Compact, the Rio Grande Compact, the 1906 Convention and the 1944 water treaty between the United States and Mexico. That means the Texas portion of the river cannot be managed as though all of the water originates or is allocated inside Texas."),
    p("For readers used to county, city or even state water systems, this is the key difference: upstream decisions, interstate obligations and international agreements are built into the basin's operating reality."),
    h("Major reservoirs store water in a dry landscape"),
    p("TWDB lists Amistad International Reservoir and Falcon International Reservoir among the major reservoirs of the basin, along with Red Bluff and others. Large reservoirs are especially important in a system where runoff is limited and water must be stored across highly variable conditions."),
    h("The river is not one landscape"),
    p("Near El Paso, the river belongs to a desert border landscape. Farther downstream it passes through the Big Bend region, receives tributaries such as the Pecos and Devils, and eventually reaches irrigated lower-valley country before the Gulf. Treating the Rio Grande as a single visual type hides how much Texas geography it connects."),
    h("What the Rio Grande teaches"),
    list(
      "The largest watershed area does not guarantee a high average water yield.",
      "Texas can depend on river water whose headwaters and governing agreements lie outside the state.",
      "International and interstate allocation are part of the river's basic water-management structure.",
      "Reservoir storage is crucial in an arid and highly variable basin.",
      "One river can connect desert, canyon, agricultural and coastal landscapes over an enormous distance."
    ),
    h("A river that makes Texas part of a larger water system"),
    p("Most Texas river guides can begin and end with the state map. The Rio Grande cannot. To understand it, you have to look upstream into Colorado and New Mexico, across the border into Mexico and downstream toward the Gulf. That larger frame is exactly what makes the Rio Grande so important to understanding Texas: it is a reminder that water ignores the political boundaries people draw around it."),
  ],
};

export const texasExplainedRiverProfileArticles: Article[] = [
  texasBrazosRiverGuideArticle,
  texasColoradoRiverGuideArticle,
  texasGuadalupeRiverGuideArticle,
  texasTrinityRiverGuideArticle,
  texasRioGrandeGuideArticle,
];