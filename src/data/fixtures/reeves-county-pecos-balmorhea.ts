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
    p("Reeves County is one of those West Texas places where the landscape makes the history easier to understand. Most of the county is dry, open country, but a handful of reliable water sources turned otherwise unlikely spots into settlements, farms, railroad stops and gathering places."),
    p("The county seat, Pecos, grew around transportation and agriculture near the Pecos River. Farther south, the springs at Balmorhea created a very different kind of oasis. Together, they explain why Reeves County became more than another stretch of desert between larger destinations."),

    h("The Pecos River gave the county its organizing line"),
    p("The Pecos River cuts through a landscape that otherwise demands careful attention to water. Long before modern highways and pipelines, river crossings shaped travel, ranching and settlement. The river also became central to irrigation projects that made commercial agriculture possible in parts of the county."),
    p("Pecos developed near that corridor and later benefited from the arrival of railroads. Like many West Texas towns, its location mattered because multiple systems overlapped there: water, rail, roads, ranching and later energy production."),

    h("Pecos built one of Texas' strongest rodeo identities"),
    p("Pecos is closely associated with the history of competitive rodeo in Texas. Local tradition points to an 1883 contest between cowboys as an early organized rodeo event, and the town has built much of its public identity around that legacy."),
    p("That story fits the county's ranching roots. Cattle work was not a staged attraction here before it became entertainment; it was part of the daily economy. Rodeo transformed working skills into competition, spectacle and eventually tourism."),

    h("Balmorhea exists because the desert suddenly produces water"),
    p("Southwest of Pecos, San Solomon Springs discharge clear groundwater at the foot of the Davis Mountains. The springs created a rare green zone in an otherwise arid region and supported Indigenous use, ranching, irrigation and eventually the community of Balmorhea."),
    p("Balmorhea State Park protects one of the most famous spring-fed pools in Texas. Civilian Conservation Corps workers built the pool, lodge and other park structures in the 1930s, turning the springs into a destination while preserving the basic fact that made the place possible: abundant, dependable water."),
    p("The contrast is immediate. Drive through miles of tan desert and scrub, then arrive at deep, clear spring water filled with fish and swimmers. It feels improbable until you understand the geology."),

    h("San Solomon Springs also made farming possible"),
    p("Water from the springs fed irrigation systems that supported crops and pasture near Balmorhea. In a region where rainfall alone is unreliable, groundwater changed what people could grow and where they could settle."),
    p("That dependence on water also created long-term pressure. Agricultural pumping and modern groundwater demand can affect spring flow, which means the history of Reeves County is inseparable from the continuing question of how much water the region can sustainably use."),

    h("Railroads reshaped Pecos"),
    p("The arrival of rail service in the nineteenth century tied Pecos to larger markets and accelerated the town's growth. Ranchers could move livestock more efficiently, merchants gained access to distant suppliers, and the town became a regional service point rather than an isolated settlement."),
    p("Railroads also reinforced the county's east-west transportation role, a pattern later amplified by highways and Interstate 20."),

    h("Oil and gas added a modern boom layer"),
    p("The Permian Basin energy economy transformed Reeves County again in the twenty-first century. Drilling, pipelines, service companies, truck traffic and worker housing brought rapid investment and rapid strain to towns that had long operated at a much smaller scale."),
    p("That boom did not erase the older county. Pecos still carries rodeo and railroad identity, and Balmorhea still depends on springs whose importance predates the energy industry by centuries. The result is a county where several versions of West Texas coexist at once."),

    h("A few Reeves County facts worth remembering"),
    list(
      "Pecos is the county seat and one of the principal service centers of the western Permian Basin.",
      "The Pecos River and groundwater-fed irrigation shaped settlement and farming in an otherwise arid county.",
      "Pecos promotes an 1883 cowboy contest as one of the earliest organized rodeo events in Texas.",
      "San Solomon Springs feed the famous pool at Balmorhea State Park.",
      "Civilian Conservation Corps crews developed major parts of Balmorhea State Park during the 1930s.",
      "Reeves County sits at the intersection of ranching, agriculture, transportation and the modern oil-and-gas economy.",
    ),

    h("Why Reeves County belongs in the Far West Texas story"),
    p("Reeves County is a useful reminder that desert counties are not defined only by what they lack. Here, a river and a cluster of springs created opportunities that reshaped settlement, farming, transportation and recreation."),
    p("It also connects several neighboring stories. To the west, Culberson County leads toward Van Horn and Guadalupe Mountains National Park. To the south, Jeff Davis County rises into the Davis Mountains. Eastward, the Pecos River corridor continues toward Fort Stockton and the broader Permian Basin."),
    p("Follow the water through Reeves County and the map stops looking empty. Pecos, Balmorhea, ranches, railroads and modern drilling all make more sense as different answers to the same West Texas problem: how people build lasting communities in a place where water decides almost everything."),
  ],
};
