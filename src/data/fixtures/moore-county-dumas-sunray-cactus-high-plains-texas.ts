import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const mooreCountyDumasSunrayCactusHighPlainsTexasArticle: Article = {
  id: "county-moore-dumas-sunray-cactus-high-plains",
  brandId: "texasdefined",
  slug: "moore-county-dumas-sunray-cactus-high-plains-texas",
  title: "Moore County: Dumas, Sunray, Cactus and the Working High Plains",
  dek: "Moore County is a northern Panhandle county where ranching, irrigated agriculture, oil and gas, petrochemical industry and railroad-era communities share the same broad High Plains landscape.",
  category: "texas-history",
  region: "panhandle",
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/52/Moore_County%2C_TX%2C_Courthouse_IMG_0574.JPG",
    alt: "Moore County Courthouse in Dumas, Texas",
    width: 2592,
    height: 1944,
    credit: "Billy Hathorn · CC BY-SA 3.0 · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-21",
  readingMinutes: 13,
  tags: [
    "Moore County",
    "Dumas Texas",
    "Sunray Texas",
    "Cactus Texas",
    "Texas Panhandle",
    "High Plains",
    "Moore County Courthouse",
    "Texas ranching",
    "Texas oil and gas",
    "Texas counties",
  ],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 Texas county reference pages and enriched county guides." },
    { href: "/county/sherman", label: "Explore Sherman County", description: "Continue north toward Stratford and the upper Canadian River country." },
    { href: "/county/hutchinson", label: "Explore Hutchinson County", description: "Head east toward Borger, the Canadian River breaks and another major Panhandle energy center." },
    { href: "/county/potter", label: "Explore Potter County", description: "Travel south toward Amarillo and the central Panhandle." },
    { href: "/county/hartley", label: "Explore Hartley County", description: "Go west toward Channing, the XIT Ranch country and the western High Plains." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how distance, settlement and courthouse access shaped the Texas county map." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Moore County sits in the north-central Texas Panhandle, a broad High Plains county centered on Dumas and tied together by U.S. highways 87 and 287, rail lines, farm roads, pipelines and the infrastructure of a working agricultural and energy economy. The county's communities include Dumas, Sunray and Cactus, with smaller places such as Etter and Masterson helping tell a story that is much larger than any single town."),
    p("This is not a county defined by one postcard attraction. Its identity comes from the way open prairie, ranching, irrigated grain, cattle feeding, oil and gas, refining and heavy industry developed on top of one another. The result is one of the Panhandle's clearest examples of how natural resources and transportation repeatedly reshaped settlement."),

    h("High Plains geography with a Canadian River edge"),
    p("Moore County occupies roughly nine hundred square miles of the High Plains. Most of the terrain is nearly level prairie, but the southeastern part of the county begins to break toward the Canadian River drainage. Creeks including North Palo Duro, South Palo Duro, Plum, Grapevine and Big Blue cut across the plains and eventually feed the Canadian River system."),
    p("That contrast matters. Much of the county looks like classic tabletop Panhandle country, with long horizons, grain fields and cattle operations, while the southeastern edge becomes more dissected and rugged. A small portion of Lake Meredith reaches into the county's far southeastern corner, linking Moore County geographically to the larger Canadian River landscape."),

    h("The county was named for a Republic of Texas naval commander"),
    p("Moore County was created by the Texas Legislature in 1876 and named for Commodore Edwin Ward Moore, commander of the Texas Navy during the Republic of Texas era. Like many Panhandle counties created on paper during the nineteenth century, Moore County existed legally before it had enough permanent residents to organize a local government."),
    p("For years the region remained lightly settled. The open grasslands supported Native peoples long before Anglo-American ranching arrived, and the southern High Plains remained part of Comanche and Kiowa territory into the 1870s. The Red River War and the destruction of the southern bison herds accelerated the transfer of the region into ranching and settlement."),

    h("Ranching arrived before towns"),
    p("Large ranches were among the first enduring Anglo-American enterprises in Moore County. George W. Littlefield established the LIT Ranch in the late 1870s across southwestern Moore County and eastern Hartley County, while the LX and LS ranches also controlled substantial acreage in the broader region."),
    p("The ranching era established patterns that still shape the county: enormous tracts of open land, dependence on water, long-distance transportation and an economy tied to commodity markets far beyond the Panhandle. Even after farms, towns and industrial plants appeared, cattle remained central to Moore County's working identity."),

    h("Dumas began as a townsite gamble"),
    p("Dumas was platted in the early 1890s by Louis Dumas and the Moore County Townsite Company. The site was chosen before a railroad reached the area, and the town initially struggled. Grasshoppers, severe winter weather and isolation nearly reduced the settlement to a ghost town only a few years after its founding."),
    p("The town survived because a small group of residents kept serving surrounding ranches and farms. When Moore County organized in 1892, Dumas became the county seat, giving the fragile settlement a civic function that helped it endure while commercial growth remained slow."),

    h("The courthouse anchors the county seat"),
    p("The Moore County Courthouse stands on South Dumas Avenue in Dumas and remains the county's governmental center. The present courthouse reflects the period when Dumas was moving from isolated ranch-service town to a more substantial regional center during the early twentieth century."),
    p("For travelers trying to understand the county, the courthouse is a useful starting point because it connects the original townsite, the county's political history and the later growth of Dumas around highways and industry. It also provides a physical counterpoint to the industrial facilities and agricultural infrastructure that dominate much of the surrounding landscape."),

    h("Oil and natural gas transformed Moore County"),
    p("The discovery of oil and especially natural gas in the Panhandle field during the 1920s changed Moore County dramatically. Commercial production accelerated after 1927, and companies built refining and processing facilities that drew workers, capital and transportation infrastructure into an area that had previously depended heavily on ranching and dryland farming."),
    p("Petroleum development changed the scale of local life. Roads improved, industrial sites appeared, payrolls expanded and Dumas grew rapidly. Natural gas became particularly important because it could support refining, carbon black production, fertilizer manufacturing, power generation and other energy-intensive industries."),

    h("Sunray grew from the industrial boom"),
    p("Sunray developed north of Dumas around refining and petroleum operations. What began as an industrial site became a lasting community tied to the energy economy of the northern Panhandle. Its history is different from Dumas's county-seat story: Sunray exists because oil, gas, processing and rail transportation made a town economically viable."),
    p("The community remains one of Moore County's three principal population centers. Its location among industrial facilities, grain country and highways illustrates the county's unusual mixture of agriculture and heavy industry within a relatively small geographic area."),

    h("Cactus was shaped by World War II industry"),
    p("Cactus emerged during World War II after the federal government constructed a nitrogen-producing plant near Etter. The project brought workers into northern Moore County and created a new community linked to wartime industrial demand rather than to the nineteenth-century ranching frontier."),
    p("The town later became associated with meat processing and food production, reinforcing another Moore County pattern: industries that depend on the same agricultural and energy resources that surround them. Grain, cattle, natural gas, transportation and industrial labor all overlap in the county's modern economy."),

    h("Railroads finally connected the county to larger markets"),
    p("For decades Dumas residents waited for a railroad while supplies moved overland from Amarillo. The situation changed around 1930 and 1931, when new rail lines crossed the county and connected Dumas, Sunray, Etter and nearby industrial sites to regional and national markets."),
    p("The arrival of rail transportation mattered because Moore County was becoming a place of bulk commodities. Grain, cattle, petroleum products, industrial materials and manufactured goods all benefited from reliable freight service. Railroads did not create Dumas, but they helped turn a persistent county-seat settlement into a much larger economic center."),

    h("The Dust Bowl did not stop the county's growth"),
    p("Moore County endured the drought, soil erosion and dust storms of the 1930s, yet agriculture expanded during the same broad period. Wheat acreage increased substantially as mechanization made large-scale farming more practical on the relatively level High Plains."),
    p("The experience also underscored the limits of farming in a windy, semi-arid environment. Soil conservation, crop choice, residue management and careful use of grasslands became essential lessons. Those concerns remain relevant because the county's productivity still depends on balancing intensive agriculture with finite water and soil resources."),

    h("Irrigation changed what the land could produce"),
    p("Groundwater irrigation expanded after World War II and allowed Moore County farmers to grow corn, wheat, grain sorghum and other crops at a scale that rainfall alone could not reliably support. Center-pivot irrigation and deep wells transformed parts of the county into highly productive farm country."),
    p("That productivity is tied to the Ogallala Aquifer, making groundwater one of the county's most important long-term resources. Efficiency, pumping costs and declining water levels influence crop decisions, land values and the future of both farming and cattle feeding across the northern Panhandle."),

    h("Cattle feeding links grain farming to the beef economy"),
    p("Moore County's grain production supports a major livestock economy. Feedlots and cattle operations convert locally grown feed and imported grain into beef production, while packing and processing facilities add another stage of value close to the source."),
    p("This integration explains why the county can generate enormous agricultural output despite a modest population. A field of corn, a feedlot, a truck route and a processing plant may be separate businesses, but economically they form one connected system."),

    h("Dumas became the county's commercial and cultural center"),
    p("Dumas is by far the largest community in Moore County and functions as its governmental, medical, educational, retail and service hub. The city grew fastest after oil, gas and railroad development, but it continued to serve the ranching and farm economy that preceded industrialization."),
    p("The Window on the Plains Museum preserves local and regional history, while community traditions such as Dogie Days reflect the county's ranching heritage. The town's location at the junction of major north-south highways also makes Dumas a natural stopping point for travelers moving between Amarillo, Dalhart, Oklahoma and Colorado."),

    h("Energy remains visible across the landscape"),
    p("Moore County's oil and gas history is not confined to museums. Pipelines, processing facilities, industrial plants and energy-related businesses remain visible features of the modern county. The same is true of newer energy infrastructure, including wind generation in the broader Dumas area."),
    p("The visual mixture can be striking: grain elevators rise near highway interchanges, cattle operations sit beyond town limits, industrial stacks appear on the horizon and wind turbines turn above open agricultural land. It is a landscape built around production rather than tourism, but that is precisely what makes it distinctive."),

    h("How to explore Moore County"),
    p("Start in Dumas at the Moore County Courthouse and local museum resources, then drive north toward Sunray and Cactus to see how quickly the county shifts from civic center to industrial and agricultural landscape. U.S. 87 is the county's main spine, while U.S. 287 connects Dumas toward Stratford and the northern Panhandle."),
    p("Travelers interested in landscape should pay attention to the transition toward the Canadian River breaks in the southeast and to the huge scale of fields and ranches away from town. Most of this is working private land, so exploration is best done from public roads, public facilities and designated recreation areas."),

    h("Moore County is a county of layered economies"),
    p("Many Texas counties can be summarized by one dominant story. Moore County is harder to reduce. Ranching came first, farming expanded, oil and gas changed the population, railroads accelerated industrial growth, irrigation transformed agriculture, and cattle feeding and processing tied those systems together."),
    p("That layering is the county's defining characteristic. Dumas, Sunray and Cactus grew for different reasons, yet all depend on the same High Plains geography and transportation network. Moore County is therefore best understood not as a collection of isolated towns but as one interconnected production landscape at the center of the northern Texas Panhandle."),
  ],
};