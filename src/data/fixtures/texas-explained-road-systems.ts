import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

const collectionLink = { href: "/texas-explained", label: "Texas Explained", description: "Connect this route system with the larger transportation, settlement and landscape patterns that shape Texas." };
const fmLink = { href: "/article/texas-farm-to-market-roads-explained", label: "Farm-to-Market roads explained", description: "Start with the rural-road system that made FM and RM shields part of the Texas landscape." };
const designationsLink = { href: "/article/texas-highway-designations-explained", label: "Texas highway designations explained", description: "Decode the larger TxDOT alphabet of SH, FM, RM, Loop, Spur, PR, RE and business routes." };
const settlementLink = { href: "/article/texas-settlement-patterns-explained", label: "Texas settlement patterns explained", description: "See how transportation networks changed which towns grew and where development moved." };

export const texasRanchToMarketRoadsArticle: Article = {
  id: "evergreen-texas-ranch-to-market-roads-explained", brandId: "texasdefined", slug: "texas-ranch-to-market-roads-explained",
  title: "Ranch-to-Market Roads Explained: Why Texas Has RM Highways",
  dek: "Ranch-to-Market roads look like close cousins of FM roads, but RM is its own Texas highway designation. Here is what TxDOT actually says the label means, how it differs from Ranch Road 1, and why the distinction is less tidy than the name suggests.",
  category: "road-trips", hero: { src: "/images/editorial/texas-rm-roads.svg", alt: "Illustrated two-lane Texas ranch road with an RM highway shield", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Ranch to Market roads", "RM roads", "Texas highways", "TxDOT", "rural Texas", "Ranch Road 1"], featured: false,
  sourceName: "Texas Department of Transportation", sourceUrl: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  internalLinks: [fmLink, designationsLink, settlementLink, collectionLink,
    { href: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html", label: "TxDOT highway-designations glossary", description: "Official definitions for RM, FM, Ranch Road, spurs and other Texas highway systems." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Ranch-to-Market roads are one of the pieces of Texas highway language that sound self-explanatory until you look closely. An RM shield does not mean the road is privately owned, limited to ranch traffic or maintained by a county. It is a state-highway-system designation approved through the Texas transportation process."),
    h("What TxDOT means by RM"),
    p("TxDOT defines a Ranch-to-Market Road as a roadway generally in a rural area that has been designated by the Texas Transportation Commission. That definition is deliberately broad. The designation tells you which highway system the road belongs to; it does not guarantee what land uses, traffic or scenery you will find along it today."),
    h("RM and FM are siblings, not opposites"),
    p("Farm-to-Market and Ranch-to-Market roads belong to the same larger rural-road tradition. Both were built into the state system to improve connections between rural areas and markets, towns and larger highways. Modern growth has pushed many FM and RM corridors into suburbs and cities even though their original designation remains."),
    p("TxDOT defines both FM and RM roads as designated roadways generally associated with rural areas, but the glossary does not establish a simple farm-versus-ranch land-use test for choosing between them. The labels are highway-system designations created through commission action, not a current zoning description of the countryside."),
    h("Ranch Road 1 is something different"),
    p("Texas also has a Ranch Road designation abbreviated RR, but TxDOT's glossary says there is only one: Ranch Road 1. It is considered part of the Farm-to-Market Road system. That makes RR 1 a special historical exception, not another statewide network parallel to RM roads."),
    h("RM spurs exist too"),
    p("A Ranch-to-Market Road Spur begins on an RM route and usually ends without connecting to another on-system road. That is the same basic relationship an FM spur has to an FM road. The spur designation describes how a short branch fits into the state system, not whether it is paved, scenic or heavily traveled."),
    h("Why the designation can outlive the landscape"),
    p("A road designated decades ago can now run past subdivisions, schools, shopping centers or industrial sites. TxDOT does not automatically rename an RM road just because the surrounding land becomes urban. That is why a black-and-white RM shield can appear in a place that no longer feels remotely like ranch country."),
    h("What an RM shield actually tells you"),
    list(
      "The road is part of the Texas state highway system rather than merely a county road.",
      "The Texas Transportation Commission designated it as Ranch-to-Market.",
      "Its original context was generally rural, but present-day land use may be urban or suburban.",
      "RM is different from RR, which is essentially the one-off Ranch Road 1 designation.",
      "A route number is a transportation-system identity, not a promise about scenery or traffic."
    ),
    h("A small label with a large Texas history"),
    p("RM roads make the most sense when viewed as part of the same statewide project that produced the famous FM network. Together they show how Texas turned rural access into a formal state transportation system—and how highway designations can persist long after the countryside around them changes."),
  ],
};

export const texasLoopsSpursArticle: Article = {
  id: "evergreen-texas-loops-spurs-explained", brandId: "texasdefined", slug: "texas-loops-spurs-explained",
  title: "Texas Loops and Spurs Explained: The Roads Around and Off the Main Highway",
  dek: "A Loop is usually built to route traffic around something; a Spur usually branches away and ends. Texas uses both designations across urban interchanges, bypasses and short state-system connectors, but their names do not always describe the road shape people expect.",
  category: "road-trips", hero: { src: "/images/editorial/texas-loops-spurs.svg", alt: "Illustrated Texas interchange with Loop and Spur route shields", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Texas loops", "Texas spurs", "state highway loop", "state highway spur", "TxDOT", "Texas highways"], featured: false,
  sourceName: "Texas Department of Transportation", sourceUrl: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  internalLinks: [designationsLink, settlementLink, collectionLink,
    { href: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html", label: "TxDOT highway-designations glossary", description: "Official definitions for State Highway Loops, State Highway Spurs and related route systems." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Texas highway maps are full of routes labeled Loop and Spur, but the words are administrative designations rather than perfect geometric descriptions. A Loop may not form a complete circle, and a Spur may be much more important than the word sounds."),
    h("What a State Highway Loop is"),
    p("TxDOT defines a State Highway Loop as a roadway usually created as a bypass and designated by the Texas Transportation Commission. The key word is usually. Many loops developed to move through traffic around a town or central area, but decades of growth can turn yesterday's bypass into today's major urban corridor."),
    h("Why a loop does not have to be circular"),
    p("In everyday speech, a loop sounds like a road that returns to its starting point. In highway administration, the designation can describe a bypassing route that reconnects with a larger system without forming a neat circle. The route's legal history matters more than its shape on a modern map."),
    h("What a State Highway Spur is"),
    p("TxDOT defines a State Highway Spur as a roadway that usually begins on a state highway and ends on an off-system roadway. In practical terms, a spur is commonly a short branch that extends state-system access toward a destination, community or connection that does not continue as another state highway."),
    h("Other highway systems have spurs too"),
    p("Texas uses spur concepts beyond the State Highway system. FM and RM roads can have spurs, and federal highway systems can use spur designations as well. That is why the shield and route class matter: 'Spur' alone does not tell you which highway family the road belongs to."),
    h("Loops often become urban main roads"),
    p("A bypass built outside a town can attract development because it offers access and traffic. Over time, commercial strips, subdivisions and new intersections can surround it. The designation remains a record of the route's place in the highway system even when the road no longer feels like an edge-of-town bypass."),
    h("Spurs preserve short state connections"),
    p("A short connector may be too important to disappear from the state system but too limited to function as a through highway. The Spur category gives TxDOT a way to keep that branch formally designated and maintained without pretending it is a longer corridor."),
    h("How to read Loop and Spur on a Texas map"),
    list(
      "Treat Loop as a highway-system designation, not proof of a circular road.",
      "Expect many Loops to have originated as bypasses.",
      "Treat Spur as a branch connection that often terminates away from another state-system road.",
      "Check the shield or route class because several highway systems can use spur designations.",
      "Remember that urban growth can make an old bypass or connector look very different from its original purpose."
    ),
    h("The designation records what the road was built to do"),
    p("Loops and Spurs are useful because they reveal the architecture of the highway network. Through routes carry the long corridor; loops redirect or bypass; spurs extend outward to a destination or local connection. Texas growth can blur those roles on the ground, but the designations preserve the logic underneath the map."),
  ],
};

export const texasBusinessRoutesArticle: Article = {
  id: "evergreen-texas-business-routes-explained", brandId: "texasdefined", slug: "texas-business-routes-explained",
  title: "Texas Business Routes Explained: Why the Old Highway Still Runs Through Town",
  dek: "When a through highway bypasses a town, the older route may remain on the state system as a business route. Texas has business versions of Interstate, U.S., State and Farm-to-Market highways, each connecting local streets back to the main route.",
  category: "road-trips", hero: { src: "/images/editorial/texas-business-routes.svg", alt: "Illustrated Texas main street with a green business-route highway shield", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Texas business routes", "business loop", "business highway", "Texas main street", "TxDOT", "highway bypass"], featured: false,
  sourceName: "Texas Department of Transportation", sourceUrl: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  internalLinks: [designationsLink, settlementLink, { href: "/article/texas-main-street-downtowns-guide", label: "Texas Main Streets explained", description: "Connect business-route corridors with the older commercial centers they often continue to serve." }, collectionLink,
    { href: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html", label: "TxDOT highway-designations glossary", description: "Official definitions for Business Interstate, U.S., State and Farm-to-Market routes." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("A business route is one of the clearest places where transportation history remains visible in a Texas town. The fast through highway may now bypass downtown, but an older alignment can survive as a signed state route that still carries drivers past local businesses, civic buildings and older neighborhoods."),
    h("What makes a route a business route"),
    p("TxDOT defines business routes by their relationship to a parent through highway. Business Interstate, Business U.S., Business State Highway and Business Farm-to-Market routes are roadways that begin and end on the corresponding through route and are designated through the Texas transportation process."),
    h("Why bypasses create business routes"),
    p("When a new highway alignment moves through traffic around a town, the old path does not necessarily stop mattering. It may still be the direct route to downtown, local commerce or established neighborhoods. Keeping it as a business route preserves its connection to the parent highway while distinguishing it from the faster through alignment."),
    h("Business does not mean privately operated"),
    p("The word business describes the route's local-service role, not its ownership. A business route is still a public roadway. In Texas it can remain part of the state highway system even when it functions like a city main street for much of its length."),
    h("Texas has several business-route families"),
    p("The abbreviations vary with the parent system. TxDOT's glossary lists Business Interstate, Business U.S., Business State Highway and Business Farm-to-Market routes. The common idea is the same: the business road leaves the through route, serves the local corridor and reconnects to the through route."),
    h("Why the old highway often becomes Main Street"),
    p("Before a bypass, the main highway may have been the town's busiest commercial corridor. Motels, gas stations, diners and stores clustered along it because travelers passed their doors. After traffic shifts outward, the business route can become a record of the earlier highway economy."),
    h("A business route can still be busy"),
    p("Bypass does not mean abandonment. Population growth can keep or restore heavy traffic on an older route, especially when it serves schools, hospitals, retail districts or dense neighborhoods. The designation explains network role, not traffic volume."),
    h("What the shield tells you"),
    list(
      "There is a corresponding through highway that carries the main route designation.",
      "The business route is intended to serve the local corridor rather than simply duplicate the through path.",
      "The road normally reconnects with its parent route.",
      "Its alignment may preserve the highway path that served the town before a bypass or relocation.",
      "Business routes can reveal where highway-oriented commerce used to concentrate."
    ),
    h("The highway history still running through town"),
    p("Business routes are useful Texas geography because they show where the transportation network moved. The bypass marks a newer era of through travel; the business route often preserves the older relationship between highway traffic and downtown commerce. Read together, the two routes tell the growth story of the town."),
  ],
};

export const texasParkRecreationalRoadsArticle: Article = {
  id: "evergreen-texas-park-recreational-roads-explained", brandId: "texasdefined", slug: "texas-park-recreational-roads-explained",
  title: "Texas Park Roads and Recreational Roads Explained",
  dek: "PR and RE shields belong to two of the smallest, most destination-specific systems on the Texas highway map. Park Roads lead to recognized parks, while Recreational Roads connect recognized recreation areas to the state system.",
  category: "road-trips", hero: { src: "/images/editorial/texas-park-recreational-roads.svg", alt: "Illustrated Texas park road entering a wooded recreational area with PR and RE shields", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Texas Park Roads", "Recreational Roads", "PR roads", "RE roads", "Texas state parks", "TxDOT"], featured: false,
  sourceName: "Texas Department of Transportation", sourceUrl: "https://www.txdot.gov/projects/planning/highway-designations/glossary.html",
  internalLinks: [designationsLink, collectionLink,
    { href: "/explore/state-parks", label: "Explore Texas state parks", description: "Turn the route-system explanation into places reached by the state's park-road network." },
    { href: "https://www.txdot.gov/projects/planning/highway-designations.html", label: "TxDOT highway designations", description: "Official explanation of Park Road status and how Texas highway designations are approved." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Not every black-and-white Texas route shield belongs to a long-distance highway. Park Roads and Recreational Roads are small systems built around access to particular kinds of destinations. Their value is not corridor length; it is the formal state connection they provide to parks and recreation areas."),
    h("What a Park Road is"),
    p("TxDOT defines a Park Road as a roadway to a recognized state or national park that has been designated by the Texas Transportation Commission. That means a PR shield outside a park is part of the state highway system, just like better-known SH, FM or RM routes."),
    h("Inside a state park, the rule changes"),
    p("TxDOT's highway-designations page makes an important distinction: roads within Texas state parks are maintained by TxDOT by law and usually do not need individual Park Road designations. The signed PR system is therefore most useful for understanding designated approaches and connections, not every paved road inside a park boundary."),
    h("What a Recreational Road is"),
    p("A Recreational Road, abbreviated RE, is a roadway to a recognized recreational area designated by the Texas Transportation Commission. The category gives Texas another way to place a destination-oriented access road on the state system even when the destination is not a state or national park."),
    h("Recreational Road Spurs exist too"),
    p("TxDOT also recognizes Recreational Road Spurs. The glossary describes them as roads that usually begin on an on-system roadway and end on an off-system roadway. Like other spurs, they formalize a short branch connection rather than a long through corridor."),
    h("Why these systems matter on a travel map"),
    p("PR and RE routes often point toward the transition from ordinary transportation to a destination landscape. They can connect a larger highway to a park entrance, lake, historic recreation area or other public-use destination. The route number is therefore a clue about why the state keeps that connection in its system."),
    h("Designation and maintenance are different questions"),
    p("The Park Road example shows why highway language can be confusing. A road can be maintained by TxDOT without carrying a designated PR number, while another road outside the park can be both TxDOT-maintained and formally designated. Maintenance responsibility and highway-system designation overlap, but they are not identical concepts."),
    h("How to read PR and RE shields"),
    list(
      "PR means a designated Park Road serving a recognized state or national park.",
      "Roads inside a Texas state park may be maintained by TxDOT without a PR designation.",
      "RE identifies a designated road serving a recognized recreational area.",
      "RP identifies a Recreational Road Spur.",
      "These are destination-access systems, not miniature versions of Interstate or U.S. highways."
    ),
    h("Small highway systems with a clear purpose"),
    p("Park and Recreational Roads show how detailed the Texas highway system really is. TxDOT does not use one generic label for every state-maintained road. It preserves separate systems for roads whose main job is connecting Texans with parks and recreation—making the shield itself a clue to the destination ahead."),
  ],
};

export const texasHistoricMemorialRoutesArticle: Article = {
  id: "evergreen-texas-historic-memorial-highways-explained", brandId: "texasdefined", slug: "texas-historic-memorial-highways-explained",
  title: "Historic Routes vs. Memorial Highways: What a Texas Road Name Really Means",
  dek: "A highway can carry a memorial name or historic-route sign without changing its official route designation. TxDOT records those names separately, while the numbered highway system remains the legal transportation designation.",
  category: "road-trips", hero: { src: "/images/editorial/texas-historic-memorial-routes.svg", alt: "Illustrated Texas highway with a brown historic-route sign and memorial-highway plaque", width: 1600, height: 900 },
  authorId: "a-marisol", publishedAt: "2026-08-16", readingMinutes: 9,
  tags: ["Texas historic routes", "memorial highways", "Texas highway names", "TxDOT", "Texas Historical Commission", "Old San Antonio Road"], featured: false,
  sourceName: "Texas Department of Transportation", sourceUrl: "https://www.txdot.gov/projects/planning/highway-designations.html",
  internalLinks: [designationsLink, settlementLink, collectionLink,
    { href: "https://www.txdot.gov/manuals/trf/smk/guide_signs/historic_routes-cegjebjf.html", label: "TxDOT historic-route signing rules", description: "Official rules for historic-route eligibility, records, agreements and brown historic-route signs." },
    { href: "https://www.txdot.gov/projects/planning/highway-designations.html", label: "TxDOT highway designations", description: "Official explanation of memorial names and the limited number of named highway designations." },
  ], relatedCollections: [], relatedDestinations: [],
  body: [
    p("Texas highways often carry more than one identity at the same time. A driver may see a familiar route number, a memorial name honoring a person or group, and a brown historic-route sign on the same corridor. Those labels do not all mean the same thing in state transportation law."),
    h("The route number is still the highway designation"),
    p("TxDOT says proposed additions, changes and deletions to the State Highway System are approved through the Texas Transportation Commission. The numbered system—Interstate, U.S., State Highway, FM, RM and other classes—is the transportation designation that defines the road's place in the network."),
    h("Memorial highways are names, not replacement route numbers"),
    p("TxDOT explains that memorial highways are named through the state legislature or by a local government working with the appropriate TxDOT district for signing. TxDOT records those memorial names but does not treat most of them as new highway designations."),
    h("Texas has only a couple of named designations"),
    p("TxDOT specifically notes that Old San Antonio Road, abbreviated OSR, and NASA Road 1 are the only designated highways with names. Other memorial or honorary names sit on top of the underlying numbered route rather than replacing it."),
    h("Historic routes use a separate preservation process"),
    p("TxDOT's sign manual says historical route signs are installed on highways confirmed eligible by the Texas Historical Commission. State law and administrative rules create a process in which historic significance is recognized without changing the ordinary highway number."),
    h("Why historic-route signs are brown"),
    p("The TxDOT manual specifies reflective historic-route signs with a brown background, white border and white lettering. They are mounted separately from ordinary traffic-control signs. That visual separation reinforces the distinction between heritage interpretation and the highway's operational route identity."),
    h("Historic signs cannot simply be placed anywhere"),
    p("TxDOT districts and counties follow agreements and sign-location rules. The manual says historic-route signs are not installed on access-controlled facilities, although they may be placed on frontage roads. The program is therefore a regulated heritage-signing system, not an informal local naming exercise."),
    h("Why one road can have several names"),
    p("A corridor may carry a route number for navigation, a memorial designation for commemoration and a historical-route identity for interpretation. Mapping apps and local speech may emphasize one name while TxDOT signs emphasize another. None of that necessarily means the highway itself has been redesignated."),
    h("How to decode the names"),
    list(
      "Start with the numbered route shield to identify the transportation system.",
      "Treat most memorial-highway names as honorary overlays on that numbered route.",
      "Treat brown historic-route signs as heritage interpretation authorized through a separate process.",
      "Remember that OSR and NASA Road 1 are unusual because TxDOT recognizes them as named highway designations.",
      "Do not assume a local or memorial name changes who maintains the road or what route number it carries."
    ),
    h("A road can carry transportation and memory at once"),
    p("Texas highway names make more sense once the layers are separated. The route number tells you how the road fits into the transportation network. Memorial names tell you whom a community or legislature chose to honor. Historic-route signs tell you that the corridor has recognized heritage significance. One pavement surface can legitimately carry all three stories."),
  ],
};

export const texasExplainedRoadSystemArticles: Article[] = [
  texasRanchToMarketRoadsArticle,
  texasLoopsSpursArticle,
  texasBusinessRoutesArticle,
  texasParkRecreationalRoadsArticle,
  texasHistoricMemorialRoutesArticle,
];
