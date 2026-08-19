import type { Article, ArticleBlock } from "../types";

const stockTankHero = "https://commons.wikimedia.org/wiki/Special:Redirect/file/Earthen_livestock_water_tank_on_Walking_M_Ranch_in_Baylor_County_near_Seymour,_Texas._(24490583523).jpg?width=1600";
const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const stockTankNameDepthArticle: Article = {
  id: "migration-article-16",
  brandId: "texasdefined",
  slug: "live-2026-06-29-the-history-behind-the-texas-stock-tank-name-bxkvg7",
  title: "Why Texans Call a Pond a Stock Tank",
  dek: "Why 'stock tank' became ordinary Texas ranch language for small man-made ponds built to water livestock—and why the term now gets used far beyond cattle country.",
  category: "texas-history",
  hero: { src: stockTankHero, alt: "Earthen livestock water tank on a Texas ranch near Seymour in Baylor County", width: 1600, height: 1065 },
  authorId: "a-hollis",
  publishedAt: "2026-06-29",
  readingMinutes: 8,
  tags: ["texas language", "ranching", "stock tank", "history"],
  internalLinks: [
    { href: "/article/texas-rural-wells-water-guide", label: "Rural Texas wells and water", description: "Put stock ponds into the larger rural-water picture of wells, groundwater, drought and property due diligence." },
    { href: "/article/buying-land-in-texas-guide", label: "Buying land in Texas", description: "Check water, access, floodplain, septic, minerals, restrictions and other rural-property systems before buying acreage." },
    { href: "/article/texas-slang-explained", label: "Texas language and slang", description: "See how ranching, regional history, Spanish and everyday usage shape the words Texans keep using." },
    { href: "https://tpwd.texas.gov/landwater/land/habitats/post_oak/waterfowl/mallard_res/", label: "TPWD stock-pond habitat research", description: "Texas Parks and Wildlife describes stock ponds as small man-made water impoundments that serve livestock water and other land functions." },
    { href: "https://agrilifeextension.tamu.edu/asset-external/reducing-bacteria-with-best-management-practices-for-livestock-water-harvesting-catchment/", label: "Texas A&M AgriLife livestock water catchments", description: "AgriLife guidance on collecting and storing water for livestock, wildlife, fish, recreation and other uses." },
    { href: "https://agrilifeextension.tamu.edu/asset-external/a-pond-to-call-my-own-understanding-water-law-in-texas/", label: "AgriLife Texas pond and water-law guide", description: "Texas A&M AgriLife overview of the water-law questions landowners face when locating, designing and filling ponds." },
    { href: "https://www.nrcs.usda.gov/state-offices/texas/news/nors-cattle-co-a-legacy-of-innovation-and-collaboration-with-nrcs", label: "USDA NRCS Texas livestock-water example", description: "A current Texas NRCS example contrasting traditional pond-based livestock watering with pipelines, troughs and storage." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("In Texas, somebody can point at a small pond in a pasture and call it a stock tank without meaning a metal tank at all. The phrase comes from function: it is water for stock—livestock—and on ranches and farms that water was often stored in a small excavated or embanked pond."),
    p("Texas Parks and Wildlife uses the related term 'stock pond' for small man-made water impoundments that provide livestock water while also contributing habitat, soil conservation and flood-control benefits. That makes the Texas usage less mysterious than it sounds to a newcomer: the 'tank' is the stored water supply, even when the storage structure looks like a pond."),
    h("The name starts with livestock, not recreation"),
    p("A ranch needs dependable water where animals graze. Before pipelines, rural water systems and modern trough networks became common, a pond that captured runoff could make otherwise dry pasture usable for cattle, horses, sheep or goats. The water source was working infrastructure first; fishing, wildlife and swimming could become secondary uses later."),
    h("Why not simply call it a pond?"),
    p("Texans do call these features ponds. 'Stock pond,' 'stock tank' and simply 'tank' overlap in everyday speech. The ranch term carries information that 'pond' does not: it hints that the water body was built or maintained as part of a livestock operation rather than existing only as scenery."),
    p("There is no statewide vocabulary police. One family may say pond, another tank, and a county road name may preserve whichever term became locally normal decades ago. The point is not that every Texas pond is a stock tank; it is that livestock-water infrastructure became common enough for the functional name to enter ordinary language."),
    h("A stock tank is usually a small impoundment"),
    p("Many are created by excavating a depression, building an earthen embankment across a drainage, or shaping a catchment so rainfall and runoff collect where livestock can reach water. Site, soil, watershed, spillway and dam design matter. A pond that will reliably hold water is an engineering and land-management project, not merely a hole dug in a low spot."),
    h("Drought exposes what the old system asks of the land"),
    p("A runoff-fed pond depends on rain arriving in the right quantity and pattern. During drought, a shallow pond can shrink, warm, lose water quality or dry up entirely. USDA Natural Resources Conservation Service work with Texas cattle operations describes producers moving toward wells, pipelines, storage and troughs partly because traditional ponds do not provide an endless supply when rainfall is limited."),
    h("Livestock access can affect water quality"),
    p("When cattle enter a pond directly, hooves can disturb banks and sediment while manure and nutrients enter the water. Modern grazing systems may fence animals away from some ponds or use off-stream watering facilities supplied by a pond, well or pipeline. AgriLife materials describe permanent watering facilities and harvested-water systems as tools that can support livestock while reducing environmental impacts."),
    h("The same pond becomes wildlife habitat"),
    p("Once water is on the landscape, it serves more than cattle. TPWD research describes stock ponds as important man-made wetland habitat in parts of Texas. Birds, amphibians, insects and mammals use them, and some landowners manage ponds for fish as well as livestock. A working ranch feature can therefore become a small ecological feature too."),
    h("Fishing changes the management question"),
    p("A pond intended for fish needs enough depth, suitable water quality and a stocking and harvest plan. TPWD does not stock private ponds for landowners; private pond owners obtain fish from commercial sources and manage the water body themselves. A livestock pond can support fishing, but that use adds management goals beyond simply keeping water available for animals."),
    h("Texas water law still matters"),
    p("Building and filling a pond is not automatically free of legal questions. Texas water law distinguishes groundwater, surface water and certain runoff circumstances, and larger dams or altered waterways can raise additional regulatory issues. Texas A&M AgriLife specifically publishes guidance for landowners on the water-law questions involved in locating, designing and filling ponds. A buyer should verify the specific pond and property rather than relying on the casual label 'stock tank.'"),
    h("The term escaped the pasture"),
    p("Today 'stock tank' also describes galvanized livestock troughs repurposed as backyard soaking pools and small swimming pools. That modern use comes from a different physical object—the actual metal watering tank—but it survives for the same reason: Texans already associated 'stock tank' with ranch water."),
    h("What a buyer should ask when a listing says stock tank"),
    list(
      "Is it an excavated pond, an embankment pond or a metal livestock tank?",
      "What watershed or water source keeps it filled?",
      "Does it normally hold water through summer and drought?",
      "Is there a dam, spillway or drainage structure that needs inspection or maintenance?",
      "Do livestock have direct access, and what is the current water quality?",
      "Is it managed for fish or wildlife in addition to livestock?",
      "Are there easements, regulatory issues or water-right questions tied to the pond or drainage?"
    ),
    h("A Texas word built from a practical need"),
    p("The phrase lasted because the object lasted. Across ranch country, a small body of captured water could determine whether livestock could use a pasture at all. Texans named it for the job it did. Long after pipelines, suburban development and backyard pool trends changed the landscape, 'stock tank' still carries that ranch-water history every time somebody points at a pond and uses the old name."),
  ],
};
