import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const collectionLink = { href: "/texas-explained", label: "Texas Explained", description: "Connect this reservoir with the larger water, landscape and settlement systems that shape Texas." };
const reservoirsLink = { href: "/article/texas-lakes-reservoirs-explained", label: "Why Texas built so many reservoirs", description: "Return to the statewide guide to storage, flood control, water supply and recreation." };
const basinsLink = { href: "/article/texas-river-basins-guide", label: "Texas river basins explained", description: "Put the reservoir inside the watershed that fills it and the downstream river system it affects." };
const riversLink = { href: "/article/texas-rivers-explained", label: "The rivers that built Texas", description: "Compare the river system underneath this reservoir with the state's other major waterways." };

export const lakeBuchananWaterSystemArticle: Article = {
  id: "evergreen-lake-buchanan-water-system-guide", brandId: "texasdefined", slug: "lake-buchanan-water-system-guide",
  title: "Lake Buchanan Explained: The Upper Anchor of the Highland Lakes",
  dek: "Lake Buchanan is more than a Hill Country lake. Built on the Colorado River and operated with downstream reservoirs as a system, it helps explain how Central Texas stores water, manages floods and produces hydropower.",
  category: "lakes-rivers",
  hero: { src: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/img/buchanan.jpg", alt: "Aerial view of Lake Buchanan and Buchanan Dam on the Colorado River", width: 1200, height: 800, credit: "Texas Water Development Board reservoir record" },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Lake Buchanan", "Highland Lakes", "Colorado River", "LCRA", "Texas reservoirs", "Texas water"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/",
  internalLinks: [reservoirsLink, basinsLink, riversLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/buchanan/", label: "TWDB Lake Buchanan record", description: "Official reservoir history, ownership, storage, dam and drainage-area information." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Lake Buchanan sits high in the chain of reservoirs Texans know as the Highland Lakes. On a recreation map it looks like one large Hill Country lake. On a water-system map, it is a major storage reservoir on the Colorado River whose releases and storage interact with lakes farther downstream."),
    h("Why Buchanan exists"),
    p("TWDB says Lake Buchanan and Buchanan Dam are owned and operated by the Lower Colorado River Authority together with downstream lakes as a system. Their purposes include flood control, water supply, hydropower generation and recreation. That combination is the central idea behind many Texas reservoirs: one dam is expected to do several jobs at once."),
    h("The reservoir helped create the LCRA era"),
    p("The dam's history is closely tied to the creation of the Lower Colorado River Authority. Construction began under a private utility project in 1931, stalled after the company failed, and later resumed under the new public authority. LCRA reconstruction began in 1935, deliberate impoundment began in 1937 and the dam was completed in 1938."),
    p("That history matters because Lake Buchanan was not simply a local lake-development project. It became part of a public river-management system designed to store and sell water, generate electricity and reduce flood damage along the lower Colorado."),
    h("Why upstream storage matters downstream"),
    p("A large upstream reservoir changes what can happen farther down the river. Water stored at Buchanan can be managed in coordination with other reservoirs rather than arriving downstream only according to the timing of storms. TWDB describes Lake Travis runoff as partly regulated by Lake Buchanan and other upstream reservoirs, which makes the connection between the lakes explicit."),
    h("Storage is not the same thing as a fixed amount of water"),
    p("TWDB's reservoir record reports a surveyed conservation storage capacity and also notes that Buchanan is operated at seasonal normal-pool levels. The larger lesson is that reservoir capacity is an engineered volume, while the water actually present changes with inflow, releases, evaporation and operations."),
    h("What Lake Buchanan teaches about the Highland Lakes"),
    list(
      "The Highland Lakes are a connected Colorado River system, not a set of unrelated lakes.",
      "A reservoir can combine water supply, flood management, hydropower and recreation.",
      "Upstream storage affects the timing and management of water downstream.",
      "Public river authorities became central to the way Texas manages major reservoir systems.",
      "A lake's recreational identity can hide a much larger infrastructure role."
    ),
    h("The best way to read Buchanan"),
    p("Think of Lake Buchanan as an upper storage node in the lower Colorado system. Its beaches, coves and Hill Country setting are real, but so are the less-visible links to downstream reservoirs, municipal supply, flood operations and power generation. That systems view is what turns a lake on the map into an explanation of Central Texas water."),
  ],
};

export const lakeTravisWaterSystemArticle: Article = {
  id: "evergreen-lake-travis-water-system-guide", brandId: "texasdefined", slug: "lake-travis-water-system-guide",
  title: "Lake Travis Explained: Austin's Flood-Control and Water-Storage Reservoir",
  dek: "Lake Travis sits just upstream from Austin, but its role reaches far beyond recreation. Mansfield Dam stores Colorado River water, provides flood-control space and operates as part of a larger chain of LCRA reservoirs.",
  category: "lakes-rivers",
  hero: { src: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/img/travis.jpg", alt: "Aerial view of Lake Travis and Mansfield Dam northwest of Austin", width: 1200, height: 800, credit: "Texas Water Development Board reservoir record" },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Lake Travis", "Mansfield Dam", "Highland Lakes", "Colorado River", "Austin water", "LCRA"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/index.asp",
  internalLinks: [reservoirsLink, basinsLink, riversLink, collectionLink,
    { href: "/article/texas-colorado-river-guide", label: "The Texas Colorado River explained", description: "Follow the river that connects Lake Travis with its upstream tributaries and downstream route to the Gulf." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/travis/index.asp", label: "TWDB Lake Travis record", description: "Official reservoir record for Mansfield Dam, storage, ownership, drainage area and operating purposes." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Lake Travis is one of the most visible pieces of Central Texas water infrastructure because Austin has grown around it. Homes, marinas and recreation dominate the public image, but Mansfield Dam was built to manage a much larger Colorado River problem: how to store water, reduce flood risk and make river flows more useful across time."),
    h("A reservoir designed for both storage and floods"),
    p("TWDB says Lake Travis and Mansfield Dam are owned and operated by the Lower Colorado River Authority for flood control, water supply, electric-power generation and recreation. Those purposes require different kinds of space and operating decisions, which is why the reservoir has both conservation-storage and flood-storage concepts."),
    h("The dam changed from Marshall Ford to Mansfield"),
    p("Construction began in 1937 at a Colorado River crossing known as Marshall Ford. The project was expanded, deliberate impoundment began in 1940 and the dam was later renamed for U.S. Rep. J.J. Mansfield. TWDB records the present structure as a combination of concrete, earth and rockfill construction."),
    h("Lake Travis does not operate alone"),
    p("TWDB notes that runoff reaching Lake Travis is partly regulated by Lake Buchanan and other reservoirs upstream. That is one of the most important facts about the Highland Lakes: the amount and timing of water at Travis reflect both watershed conditions and decisions made elsewhere in the connected reservoir chain."),
    h("Why the lake can rise and fall so dramatically"),
    p("A reservoir is not maintained simply for a constant shoreline. Lake Travis stores conservation water and also provides flood-storage capacity above that level. In a variable Texas climate, inflow can swing widely between drought and major storms, while releases and evaporation continue to change storage."),
    p("That variability is not evidence that the lake has stopped functioning. It is part of what a multipurpose reservoir is built to handle: different hydrologic conditions while preserving room for supply and flood-management objectives."),
    h("What Lake Travis teaches about Austin's water map"),
    list(
      "The lake is part of the Colorado River, not a separate water body disconnected from upstream events.",
      "Flood-control space and water-supply storage can coexist in the same reservoir.",
      "Lake Buchanan and other upstream reservoirs influence inflow timing at Travis.",
      "Shoreline conditions can vary because reservoir operation follows water conditions rather than a fixed recreational level.",
      "Austin's growth sits beside infrastructure created decades before today's metropolitan scale."
    ),
    h("A lake best understood as infrastructure"),
    p("Lake Travis can be a recreation destination and a critical water-management structure at the same time. Reading it as infrastructure explains why Mansfield Dam, upstream reservoirs, flood space and conservation storage matter more than any single snapshot of the shoreline."),
  ],
};

export const lakeWhitneyWaterSystemArticle: Article = {
  id: "evergreen-lake-whitney-water-system-guide", brandId: "texasdefined", slug: "lake-whitney-water-system-guide",
  title: "Lake Whitney Explained: A Brazos River Reservoir Built for Multiple Jobs",
  dek: "Lake Whitney was designed as a multipurpose federal project on the Brazos. Flood control, municipal supply, irrigation, hydropower and recreation all share one reservoir, making it a classic example of Texas' engineered river system.",
  category: "lakes-rivers",
  hero: { src: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/img/whitney.jpg", alt: "Aerial view of Lake Whitney on the Brazos River", width: 1200, height: 800, credit: "Texas Water Development Board reservoir record" },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Lake Whitney", "Brazos River", "Whitney Dam", "Texas reservoirs", "USACE", "Texas water"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/index.asp",
  internalLinks: [reservoirsLink, basinsLink, riversLink, collectionLink,
    { href: "/article/texas-brazos-river-guide", label: "The Brazos River explained", description: "See how Lake Whitney fits into the larger river basin from West Texas tributaries to the Gulf." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/whitney/index.asp", label: "TWDB Lake Whitney record", description: "Official reservoir history, USACE operation, storage, dam and drainage-area record." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Lake Whitney is a useful antidote to the idea that a Texas reservoir exists for one purpose. Built on the main stem of the Brazos River, Whitney was designed as a federal multipurpose project. Flood control, water supply, irrigation, recreation and power production all belong to the same dam-and-reservoir story."),
    h("Why the federal government built Whitney"),
    p("TWDB traces the project to federal flood-control authorization before World War II. Funding was interrupted during the war, construction began in 1947 and the reservoir began deliberate impoundment in 1951. The U.S. Army Corps of Engineers operates the project."),
    h("One reservoir, several operating purposes"),
    p("Flood control requires capacity to capture large inflows. Municipal supply and irrigation depend on stored conservation water. Hydropower depends on controlled releases through the project. Recreation uses the same water surface and shoreline. Those uses can reinforce one another, but they can also create different expectations about how a reservoir should behave."),
    h("Whitney belongs to the Brazos system"),
    p("The dam sits directly on the Brazos rather than on a small tributary. TWDB records a drainage area above the dam of more than twenty-seven thousand square miles, with a substantial portion considered noncontributing. That drainage context helps explain why a reservoir's watershed is often far larger than the counties touching its shoreline."),
    h("Conservation pool and flood pool are different ideas"),
    p("TWDB distinguishes the conservation pool from the higher flood-control pool. That distinction is basic reservoir literacy: the normal stored-water zone and the temporary flood-storage zone are not the same operational space."),
    p("When reservoir levels move, the meaning depends on which operating zone the water occupies, recent inflows and release decisions. A single percentage-full number can be useful, but it does not tell the whole operating story."),
    h("What Lake Whitney teaches"),
    list(
      "Federal flood-control projects often serve water-supply and recreation roles too.",
      "A reservoir on a main-stem river receives water from a watershed far beyond its immediate shoreline.",
      "Conservation storage and flood storage are separate operating concepts.",
      "Power production, irrigation, municipal supply and recreation can all share one project.",
      "Reservoir behavior makes more sense when you start with purpose rather than shoreline appearance."
    ),
    h("A classic multipurpose Texas reservoir"),
    p("Whitney is not unusual because it has many uses; it is useful because those uses are unusually easy to see in one place. The lake shows how Texas turned a major river into managed storage without erasing the river beneath it."),
  ],
};

export const possumKingdomWaterSystemArticle: Article = {
  id: "evergreen-possum-kingdom-water-system-guide", brandId: "texasdefined", slug: "possum-kingdom-water-system-guide",
  title: "Possum Kingdom Lake Explained: An Early Brazos River Multipurpose Reservoir",
  dek: "Possum Kingdom Lake pairs a dramatic North Texas landscape with serious water infrastructure. Morris Sheppard Dam supports municipal and industrial supply, irrigation, flood control, recreation and power generation on the Brazos River.",
  category: "lakes-rivers",
  hero: { src: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/img/possum_kingdom.jpg", alt: "Possum Kingdom Lake and its Brazos River shoreline near Morris Sheppard Dam", width: 1200, height: 800, credit: "Texas Water Development Board reservoir record" },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Possum Kingdom Lake", "Brazos River", "Morris Sheppard Dam", "Brazos River Authority", "Texas reservoirs", "Texas water"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/index.asp",
  internalLinks: [reservoirsLink, basinsLink, riversLink, collectionLink,
    { href: "/article/texas-brazos-river-guide", label: "The Brazos River explained", description: "Place Possum Kingdom inside the larger Brazos watershed and reservoir network." },
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/possum_kingdom/index.asp", label: "TWDB Possum Kingdom Lake record", description: "Official record for Morris Sheppard Dam, ownership, uses, storage and reservoir survey information." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Possum Kingdom is famous for steep shoreline scenery and Hells Gate, but Morris Sheppard Dam makes the lake an important chapter in the history of Brazos River management. It was built before many of the large postwar reservoirs Texans now take for granted."),
    h("A reservoir with an unusually broad job list"),
    p("TWDB says the Brazos River Authority owns and operates Possum Kingdom Lake and Morris Sheppard Dam for municipal, industrial and mining water supply, irrigation, flood control, recreation and power generation. Few descriptions make the multipurpose nature of a Texas reservoir clearer."),
    h("Built at the beginning of the modern reservoir era"),
    p("The project was authorized in the 1930s, construction began in 1938 and the dam was completed in 1941. Deliberate impoundment and power generation followed immediately. That places Possum Kingdom near the front edge of the era when river authorities and large dams began reshaping Texas surface-water management."),
    h("The lake's storage has changed over time"),
    p("TWDB reports that the reservoir's surveyed storage capacity is lower than its earlier listed capacity. Sediment accumulation is one reason reservoir surveys matter: a reservoir is a physical basin that can change over decades, so historical design numbers are not necessarily the same as modern measured storage."),
    h("A huge upstream watershed feeds the dam"),
    p("The dam controls a drainage area measured in tens of thousands of square miles, although TWDB identifies a large portion as noncontributing. That is another reminder that a reservoir's true geography is its watershed, not the outline of the lake."),
    h("Why power generation belongs in the story"),
    p("Hydropower was part of the project from the beginning. The dam therefore did more than hold water behind a new shoreline; it converted controlled river releases into electricity while supporting other water uses."),
    h("What Possum Kingdom teaches"),
    list(
      "Texas river authorities were building multipurpose reservoirs before the postwar boom in federal lake construction.",
      "A single reservoir can support municipal, industrial, irrigation, flood-control, recreation and power needs.",
      "Modern volumetric surveys matter because reservoir storage can change over time.",
      "The watershed feeding a lake can be vastly larger than the recreation area people see.",
      "The scenic identity of a reservoir and its infrastructure identity can coexist."
    ),
    h("The lake behind the landmark"),
    p("Possum Kingdom makes an excellent Texas Explained profile because the scenery is memorable enough to obscure the engineering. Once the dam, river authority, watershed and changing storage are added back into the picture, the lake becomes a lesson in how early modern Texas learned to manage the Brazos."),
  ],
};

export const toledoBendWaterSystemArticle: Article = {
  id: "evergreen-toledo-bend-water-system-guide", brandId: "texasdefined", slug: "toledo-bend-water-system-guide",
  title: "Toledo Bend Explained: Texas' Largest Reservoir and a Two-State Water Project",
  dek: "Toledo Bend stretches along the Sabine River on the Texas-Louisiana line. Its huge surface area, shared ownership and combined water-and-power role make it unlike any reservoir operated wholly inside Texas.",
  category: "lakes-rivers",
  hero: { src: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/img/toledo_bend.jpg", alt: "Aerial view of Toledo Bend Reservoir and spillway on the Sabine River", width: 1200, height: 800, credit: "Texas Water Development Board reservoir record" },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Toledo Bend Reservoir", "Sabine River", "Texas Louisiana", "Texas reservoirs", "hydropower", "Texas water"], featured: false,
  sourceName: "Texas Water Development Board", sourceUrl: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/index.asp",
  internalLinks: [reservoirsLink, basinsLink, riversLink, collectionLink,
    { href: "https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/toledo_bend/index.asp", label: "TWDB Toledo Bend Reservoir record", description: "Official record for ownership, construction, uses, shared storage and Sabine River setting." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Toledo Bend is difficult to understand as a normal Texas lake because it is not a Texas-only project. The Sabine River forms part of the boundary with Louisiana, and the reservoir is owned through the river authorities of both states. Water, electricity and shoreline all cross the state line."),
    h("The largest reservoir in Texas by surface area"),
    p("TWDB identifies Toledo Bend as the largest reservoir in Texas and describes a conservation surface area of more than 181,000 acres. Scale is one reason the reservoir feels different from most Texas lakes: it stretches for well over one hundred river miles along the Sabine system."),
    h("A two-state project without federal construction funding"),
    p("Construction began in 1964, impoundment began in 1966 and the dam was completed in 1969. TWDB notes that Texas and Louisiana shared the project cost without federal government assistance. The reservoir remains jointly owned through the Sabine River authorities of the two states."),
    h("Water and electricity are both shared"),
    p("The project conserves water for municipal, industrial, agricultural and recreational purposes and includes hydroelectric generation. TWDB notes that Texas and Louisiana share both water and electricity. That shared-benefit structure makes Toledo Bend a useful example of interstate resource infrastructure."),
    h("The Sabine is the system underneath the lake"),
    p("The reservoir is formed by damming the Sabine River, so its enormous lake surface is still part of a river basin. Inflow, storage and releases belong to the same watershed that continues downstream toward the Gulf."),
    h("Why size comparisons need context"),
    p("Reservoirs can be ranked by surface area, conservation storage or total storage, and those rankings do not always produce the same order. TWDB calls Toledo Bend the largest reservoir in Texas and also notes its standing by total storage. The lesson is to ask which measurement a 'largest lake' claim is using."),
    h("What Toledo Bend teaches"),
    list(
      "A reservoir can be shared infrastructure between two states rather than owned by one Texas authority.",
      "Surface-area rankings and storage-capacity rankings measure different things.",
      "Water supply, agriculture, industry, recreation and hydropower can all share one reservoir.",
      "Interstate river boundaries create governance questions that do not exist on wholly internal basins.",
      "Even an enormous lake remains part of a flowing river system."
    ),
    h("Texas water at interstate scale"),
    p("Toledo Bend expands the Texas water map beyond the state line. It shows that a reservoir can be a landscape, a power project, a water-supply asset and a two-state agreement at the same time. That makes it one of the clearest examples of how infrastructure can turn a river boundary into a shared resource."),
  ],
};

export const texasExplainedReservoirProfileArticles: Article[] = [
  lakeBuchananWaterSystemArticle,
  lakeTravisWaterSystemArticle,
  lakeWhitneyWaterSystemArticle,
  possumKingdomWaterSystemArticle,
  toledoBendWaterSystemArticle,
];