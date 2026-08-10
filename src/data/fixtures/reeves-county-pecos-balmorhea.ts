import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const reevesCountyPecosBalmorheaArticle: Article = {
  id: "county-reeves-pecos-balmorhea",
  brandId: "texasdefined",
  slug: "reeves-county-pecos-balmorhea-texas",
  title: "Reeves County: Pecos, Balmorhea and the West Texas County Built Around Water",
  dek: "Reeves County is where the Pecos River, San Solomon Springs, railroad history, ranching, rodeo tradition and the modern energy economy meet — a Far West Texas county whose story makes more sense once you follow the water.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: "/images/explore/major-springs/balmorhea-state-park.jpg",
    alt: "Spring-fed water and historic structures at Balmorhea State Park in Reeves County, Texas",
    width: 1600,
    height: 900,
    credit: "SHAWN VR · CC BY-SA 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-09",
  readingMinutes: 10,
  tags: ["Reeves County", "Pecos", "Balmorhea", "San Solomon Springs", "Pecos River", "Texas rodeo", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/culberson-county-van-horn-guadalupe-mountains-texas", label: "Explore neighboring Culberson County", description: "Continue west toward Van Horn, Guadalupe Peak and the Salt Basin." },
    { href: "/article/jeff-davis-county-fort-davis-mountains-texas", label: "Explore neighboring Jeff Davis County", description: "Follow the Davis Mountains south toward Fort Davis and McDonald Observatory country." },
    { href: "/article/texas-caverns-caves-first-timers-guide", label: "Go deeper into West Texas geology", description: "A first-timer's guide to the caves, springs and underground landscapes that shape Texas." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Reeves County looks dry enough to make water seem like a side note. It is not. Water is the organizing fact behind some of the county's oldest settlements, its farming, its most famous state park and even the route choices that helped turn Pecos into a regional crossroads."),
    p("The county stretches from the Pecos River and broad desert plains north of Pecos to the spring-fed country around Balmorhea and Toyahvale near the Davis Mountains. In between are ranches, oil and gas fields, irrigated farmland, railroad towns and highways carrying workers and travelers across the Trans-Pecos."),

    h("Start with the Pecos River"),
    p("The Pecos River forms part of the county's northeastern boundary and gave the county seat its name. Long before county government existed, the river and its tributaries helped define routes through a region where dependable water was scarce and therefore unusually valuable."),
    p("Reeves County's official history describes a landscape drained by the Pecos River, Toyah Creek and a network of draws and playas. That hydrology explains why ranching, settlement and transportation clustered where they did. In Far West Texas, a map of water is often also a map of human activity."),

    h("San Solomon Springs made a desert oasis possible"),
    p("Southwest of Pecos, San Solomon Springs rises near Balmorhea from an artesian aquifer system. Texas Parks and Wildlife says the springs currently discharge about 15 million gallons of water per day, with water temperatures generally staying between 72 and 76 degrees year-round."),
    p("Humans have depended on these springs for thousands of years. TPWD notes that hunters may have gathered in the Balmorhea area around 11,000 years ago and that Mescalero Apache used the springs before modern settlement. Mexican farmers later dug irrigation canals by hand and used spring water to grow crops for nearby communities, including Fort Davis."),
    p("That continuity matters. Balmorhea is not simply a swimming destination in an unlikely place. It is one of the clearest examples in Texas of how a single reliable spring can shape human use of an arid landscape over many centuries."),

    h("The Civilian Conservation Corps turned the springs into a state park"),
    p("The State Parks Board acquired land around San Solomon Springs in 1934. Civilian Conservation Corps Company 1856 then built Balmorhea State Park through the second half of the 1930s, creating the spring-fed pool, bathhouses, lodging and other facilities from local limestone and adobe."),
    p("The pool remains the park's signature feature. Texas Parks and Wildlife describes it as the world's largest spring-fed swimming pool, and visitors can swim or dive in clear water while fish and other aquatic life move through the same spring system."),
    p("The park also protects restored cienega wetlands. Those desert marshes support rare and endangered species and make the park a conservation site as well as a recreation site. The water that leaves the park continues into irrigation canals and toward Balmorhea Lake, tying public recreation back to the working agricultural landscape around it."),

    h("Balmorhea's name came from an irrigation company"),
    p("One of the county's best name stories is hiding in plain sight. According to Texas Parks and Wildlife, 'Balmorhea' combines the surnames of E.D. Balcom, H.R. Morrow, Joe Rhea and John Rhea, men associated with an irrigation company in the area in the early twentieth century."),
    p("That origin sounds almost too tidy for a West Texas place name, but it fits the county perfectly. Even the name of its best-known oasis points back to the business of moving and managing water."),

    h("Railroads gave Pecos and Toyah permanent weight"),
    p("The Texas and Pacific Railway reached the area in 1881, establishing section facilities at Pecos and Toyah. The railroad changed the scale of local ranching and farming by creating dependable connections to distant markets and supply networks."),
    p("Reeves County was separated from Pecos County in 1883 and formally organized in 1884, with Pecos selected as the county seat. Toyah developed as a railroad and livestock shipping point, while Pecos became the county's government and commercial center."),
    p("A second railroad connection followed along the Pecos River toward New Mexico. Together, those lines made the county part of a much larger transportation system before paved highways took over most passenger travel."),

    h("Pecos built its identity around cowboys and competition"),
    p("The Town of Pecos City promotes itself as the 'Home of the World's First Rodeo,' tracing the tradition to a July 4, 1883 competition among cowboys. Other communities have their own claims about early organized rodeo, so the safest way to understand the story is as Pecos' defining local tradition rather than a debate that needs a single winner."),
    p("What is not in doubt is how deeply rodeo culture is tied to the city. Ranching, roping and horse skills were part of the region's working economy long before they became spectator events, and Pecos turned that heritage into a civic identity that continues through modern rodeos and western celebrations."),
    p("The city's rodeo story also shows how Texas towns turn occupational skills into culture. What began as practical cattle-country knowledge became entertainment, tradition and a reason for people to identify with a place."),

    h("Pecos became a crossroads because the old routes kept getting reused"),
    p("Modern Pecos sits at the intersection of Interstate 20 and U.S. 285, giving the city an outsized service role for a relatively remote county. Trucks, oilfield traffic, tourists and regional travelers all funnel through the same general corridor that earlier wagons, cattle drives and railroads helped establish."),
    p("The Town of Pecos City notes its ties to historic cattle and wagon routes, including the Goodnight-Loving Trail and Butterfield-era travel. The details of individual routes changed over time, but the larger pattern did not: a useful crossing point near water kept attracting transportation infrastructure."),
    p("That is why Pecos can feel both isolated and busy. It is surrounded by enormous distances, yet it has spent much of its history serving people who are passing through, shipping something out or coming in to work."),

    h("Irrigation made commercial agriculture possible"),
    p("Reeves County's official history records farming around Toyah Creek and San Solomon Springs well before the twentieth century. Irrigation allowed crops to grow where rainfall alone would not support dependable agriculture."),
    p("Alfalfa, cotton and other irrigated crops became part of the county's economy, and Pecos later became nationally associated with cantaloupes. The famous fruit is more than a roadside brand: it reflects the unusual combination of heat, irrigation and soil that made commercial farming possible in an otherwise dry region."),
    p("Agriculture never erased the county's aridity. It depended on infrastructure — canals, wells, reservoirs and careful use of limited water. That dependence remains one of the county's most important long-term questions."),

    h("Oil and gas added a second modern boom cycle"),
    p("Petroleum eventually joined ranching and agriculture as a major force in Reeves County. In recent years the Permian Basin energy economy has transformed the northern and central parts of the county with drilling, pipelines, heavy trucks, worker housing and new service businesses."),
    p("The boom brings jobs and tax base, but it also intensifies old West Texas questions about roads, housing, water and public infrastructure. A county built around scarce water now has to balance agriculture, communities, springs and energy development in the same landscape."),
    p("Texas Parks and Wildlife has specifically highlighted the need to protect San Solomon Springs as oil and gas activity expanded in southern Reeves County. That tension makes the springs a useful symbol for the entire county: economic growth is important, but so is protecting the resource that made settlement possible in the first place."),

    h("Toyah and Toyahvale show how small communities can carry big pieces of the story"),
    p("Pecos dominates the county today, but Reeves County makes more sense when you also look at Toyah, Toyahvale, Balmorhea and Saragosa. These communities developed around different combinations of railroads, ranching, farming, irrigation and local institutions."),
    p("Toyah was one of the county's early railroad towns. Toyahvale grew near the spring-fed agricultural country. Balmorhea developed around irrigation and later tourism. Saragosa became one of the county's enduring farming communities."),
    p("Together they prevent the county's history from becoming a single-city story. Reeves County is a network of places shaped by different versions of the same basic challenge: how to build a durable community in a dry, distant part of Texas."),

    h("A few Reeves County facts worth remembering"),
    list(
      "Reeves County was created from Pecos County in 1883 and organized in 1884, with Pecos as the county seat.",
      "The Texas and Pacific Railway reached the area in 1881 and helped establish Pecos and Toyah as transportation points.",
      "San Solomon Springs has supported human use for thousands of years and currently flows at roughly 15 million gallons per day, according to Texas Parks and Wildlife.",
      "Balmorhea State Park was developed by the Civilian Conservation Corps during the 1930s around San Solomon Springs.",
      "The name Balmorhea combines the surnames Balcom, Morrow and Rhea.",
      "Pecos promotes itself as the Home of the World's First Rodeo, based on an 1883 cowboy competition.",
      "The Pecos River drains the county and forms part of its northeastern boundary.",
      "Modern Reeves County remains shaped by ranching, irrigated agriculture, transportation and Permian Basin energy production.",
    ),

    h("Why Reeves County belongs in the Far West Texas series"),
    p("The counties west and south of Reeves are defined by mountains, borderlands and enormous protected landscapes. Reeves County is different. Its strongest thread is the relationship between water and work: river crossings, springs, irrigation, ranching, railroads, rodeo, farming and energy."),
    p("It also connects the western counties to the Permian Basin. Drive west and Culberson County opens toward Van Horn, the Guadalupe Mountains and the Salt Basin. Drive south and the land rises toward Jeff Davis County. Drive east or north and the energy economy becomes increasingly visible."),
    p("That position makes Reeves County a transition zone, both geographically and historically. It is still unmistakably Trans-Pecos, but it also points toward the oilfield West Texas that dominates the landscape farther east."),
    p("Most of all, Reeves County is a reminder that the desert is not empty. Follow the water closely enough and a complicated Texas story appears: Indigenous use, Mexican irrigation, cattle country, railroad towns, New Deal construction, modern tourism and one of the largest energy booms in the country — all layered onto the same dry ground."),
  ],
};