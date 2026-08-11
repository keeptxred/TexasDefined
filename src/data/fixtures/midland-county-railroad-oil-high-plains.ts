import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const midlandCountyRailroadOilHighPlainsArticle: Article = {
  id: "county-midland-railroad-oil-high-plains",
  brandId: "texasdefined",
  slug: "midland-county-railroad-oil-high-plains-texas",
  title: "Midland County: Railroad Origins, High Plains Horizons and the Permian Basin",
  dek: "Midland County grew from a railroad midpoint and ranching settlement into one of the administrative capitals of the Permian Basin, while its flat High Plains landscape still carries older stories of trails, drought, archaeology and West Texas reinvention.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/48/Courthouse%2C_Midland_County%2C_Midland%2C_TX%2C_03-09-2011_%281%29.JPG",
    alt: "Midland County Courthouse in downtown Midland, Texas",
    width: 4000,
    height: 3000,
    credit: "Georgia Guercio · CC BY-SA 3.0 · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-11",
  readingMinutes: 12,
  tags: ["Midland County", "Midland", "Permian Basin", "High Plains", "Texas and Pacific Railway", "oil", "ranching", "Bush Family Home", "Petroleum Museum", "West Texas", "Texas counties", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/county/ector", label: "Explore neighboring Ector County", description: "Continue west into Odessa, the Permian Basin, Stonehenge and the Odessa Meteor Crater." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Midland County is easy to summarize badly. From the highway it can look like a flat rectangle of West Texas organized around one fast-growing city and an enormous energy economy. But the county makes more sense when you read its landscape as a sequence of transportation systems and survival strategies: Indigenous trails across open plains, wagon routes, ranch roads, the Texas and Pacific Railway, oilfield lease roads, Interstate 20 and, finally, the dense air-and-highway network of a regional business center."),
    p("That sequence explains why Midland became what it is. The county sits on the southern edge of the High Plains, with broad horizons, shallow draws, mesquite and little permanent surface water. Its physical geography rewards mobility, wells and infrastructure. The city of Midland became the county seat because a railroad placed a station here; later it became an oil capital because it sat between producing fields and developed the offices, banks, engineering firms, hotels and transportation links needed to manage them."),
    p("The result is a county whose identity is both intensely local and unusually regional. Midland County has its own courthouse, neighborhoods, ranches and civic institutions, but much of its daily life is tied to work that reaches across the Permian Basin. Corporate decisions made in Midland may concern wells dozens or hundreds of miles away. At the same time, the county's own story begins long before petroleum."),

    h("A county on the southern edge of the High Plains"),
    p("The Texas State Historical Association places Midland County on the southern edge of the High Plains. The terrain is mostly flat, broken by draws rather than major valleys, and elevations generally sit between roughly 2,550 and 2,900 feet. There are no rivers or other permanent surface waters inside the county, a fact that has shaped settlement from ranching days through modern urban growth."),
    p("That absence of dependable surface water is one of the quiet facts behind Midland's development. Ranchers learned to depend on wells, and later generations invested heavily in distant water supplies and infrastructure. In a wetter part of Texas, a city can grow beside a river. Midland grew because people repeatedly solved the problem of not having one."),
    p("The landscape also explains the county's visual character. There are few natural barriers to the horizon. Weather is visible from far away, roads run straight for long distances, and a high-rise downtown can appear unexpectedly large against the plain. Midland's nickname, the Tall City, works partly because vertical buildings stand out so dramatically in a county where the natural landscape is horizontal."),

    h("Trails crossed the county before rails did"),
    p("Long before Midland existed, travel routes crossed this part of West Texas. The Handbook of Texas records the Great Comanche War Trail, the Chihuahua Trail and several wagon roads through or near the area. These were practical routes across a difficult region, connecting water sources, grazing areas, trading destinations and military or surveying points."),
    p("The nineteenth century brought violent disruption to the plains. Buffalo hunters reduced the great herds during the 1870s, and conflict followed as Indigenous people were forced from landscapes they had long used. By the time permanent Anglo settlement accelerated, the ecological and political order of the plains had already been dramatically changed."),
    p("This older transportation history matters because Midland's later success was also about position. The railroad did not create the concept of moving through this landscape; it industrialized and standardized it. The county's location became valuable once a reliable east-west transportation line could turn an open stretch of plains into a predictable stop."),

    h("The railroad put Midway on the map"),
    p("The Texas and Pacific Railway reached the area in 1881. A settlement developed near the tracks under the name Midway, chosen because the location was roughly halfway between Fort Worth and El Paso on the rail line. The name was later changed to Midland, but the original idea survived in both the county and city names: this was a place defined by being in the middle of a long journey."),
    p("Railroad promotion helped attract sheepmen and ranchers. Herman Garrett is identified by the Texas State Historical Association as the county's first permanent settler after bringing sheep into the region. Nelson Morris, a Chicago meatpacker, later acquired a vast acreage for a Black Angus operation and became one of the early ranchers to fence county land."),
    p("Midland County was created from Tom Green County and organized in 1885, when only a few hundred people lived in the area. Midland became the county seat. Newspapers, schools and stores followed, and by 1890 the county had twenty-nine ranches. The early economy was overwhelmingly livestock-based, with cattle and sheep far more important than crops."),

    h("Ranching came first, and farming was always a wager on water"),
    p("The early county was not naturally generous to crop agriculture. Rainfall was sparse and unreliable, and the 1890 agricultural census recorded no significant crop production. The difficulty became famous enough that the U.S. Department of Agriculture conducted a rain-making experiment in Midland County in 1891. It was an era fascinated by the possibility that technology might force the plains to behave differently."),
    p("Farming expanded anyway. Irrigation projects and changing land policies encouraged more cultivation after 1900, especially sorghum and cotton. By 1930 more than 31,000 acres in Midland County were planted in cotton. Yet ranching remained deeply embedded in the county's economy and identity, and the pressure of drought never disappeared."),
    p("Modern Midland is usually discussed in terms of petroleum, but ranching and farming explain much about the county's first half-century. They created the first permanent economic base, shaped land ownership and taught residents to think in terms of wells, weather, markets and long-distance transportation. Oil would magnify those same habits rather than replace them entirely."),

    h("Oil transformed Midland even before Midland County produced much of its own"),
    p("One of the most important details in Midland County history is that the first great oil transformation arrived from outside its boundaries. Major discoveries in Reagan County in 1923 and Ector County in 1926 changed the region. Midland's location, rail access and growing business community made it a natural place for petroleum companies to establish offices."),
    p("This created a distinctive kind of oil city. Midland was not only a boomtown sitting directly on top of one field. It became an administrative and financial center for fields spread across a huge region. Geologists, landmen, lawyers, bankers, engineers, accountants and executives could work in Midland while their companies operated across West Texas and southeastern New Mexico."),
    p("The county's own production later became significant. The Handbook of Texas records a major Midland County boom beginning in 1945, followed by success in the Midland South Pool in 1947 and another surge from 1949 through 1952. By then the city was already equipped to convert petroleum wealth into office towers, subdivisions and institutions. The skyline began to earn the Tall City name."),

    h("The Permian Basin is geology, industry and a way of organizing daily life"),
    p("The phrase Permian Basin can sound like a single oilfield, but it describes a vast geological region containing numerous formations, fields and sub-basins across West Texas and New Mexico. Midland became one of the places where that complexity is translated into business. A well may be physically far away, but its lease, financing, engineering, legal work or corporate strategy can still run through Midland."),
    p("The Permian Basin Petroleum Museum makes that relationship unusually visible. Founded in 1975 by more than 500 community leaders, the museum describes itself as the nation's largest museum dedicated to the petroleum industry and its pioneers. Its exhibits begin with the geology of the ancient Permian sea and move through drilling, technology, risk, energy use and the social world created around petroleum."),
    p("For a county guide, the museum is valuable because it connects the modern office city to deep time. The Permian story begins hundreds of millions of years before Midland, Texas existed. Fossil reefs and sedimentary environments eventually became the geological architecture on which a twentieth- and twenty-first-century economy was built."),

    h("Midland's economy became broader because oil made the city larger"),
    p("Energy remains central, but a county of Midland's size cannot function as a one-industry camp. Health care, construction, retail, education, aviation, logistics, professional services and government all became major parts of daily life as the population grew. The Census Bureau counted 169,983 Midland County residents in 2020 and estimated 187,855 residents in 2025."),
    p("That growth matters in practical ways. A larger population requires more housing, roads, schools, hospitals, water systems and public services. During energy booms, those systems can be stressed by rapid in-migration and high labor costs. During downturns, the same infrastructure must serve a population whose economic confidence can change quickly."),
    p("Midland therefore illustrates one of the central realities of West Texas energy communities: the boom-and-bust cycle is not an abstract graph. It changes traffic, rents, school enrollment, charitable giving, restaurant openings, municipal budgets and the pace of construction. The county's culture of entrepreneurship is inseparable from a long history of living with volatility."),

    h("The courthouse belongs to a city that kept rebuilding itself"),
    p("Midland's courthouse history mirrors the county's growth from ranch settlement to metropolitan center. The current county government complex sits in a downtown where civic buildings share the skyline with banks, offices and hotels created during successive waves of economic expansion. The courthouse is less ornate than many nineteenth-century Texas courthouses, but that modernity is itself appropriate to Midland's story."),
    p("The city has repeatedly remade its built environment as its role changed. A rail stop became a ranching service town; the ranching town became an oil headquarters; the oil headquarters became a regional city. Downtown Midland has experienced both ambitious building cycles and difficult periods of vacancy, followed by renewed redevelopment. Few West Texas skylines show economic cycles as clearly."),

    h("The Bush Family Home preserves a surprisingly ordinary chapter of national history"),
    p("One of Midland County's most nationally recognizable historic places is deliberately modest. The Bush Family Home State Historic Site preserves the house where George H. W. Bush, Barbara Bush and their young family lived during the early 1950s. The Texas Historical Commission has restored the home to reflect that period."),
    p("The significance is not that the house was grand. It is that a family that later occupied the White House lived here during an ordinary stage of its life, when George H. W. Bush was building a career in the West Texas oil business. The site makes Midland's postwar growth personal: newcomers came to the Permian Basin because opportunity seemed to be opening faster than institutions could keep up."),
    p("The home also complicates the idea that Midland's oil history is only industrial. The petroleum economy shaped families, neighborhoods, schools and political networks. People came to Midland for work and then built lives whose influence sometimes reached far beyond the county line."),

    h("Archaeology pushes the human story much farther back"),
    p("In 1953, archaeologists working on the Scharbauer Ranch found fossilized human remains that became popularly known as Midland Minnie. The age and exact cultural association of the remains have been debated, but the discovery placed Midland County within a much older scientific discussion about human occupation of the southern High Plains."),
    p("The site also produced fossil evidence of extinct animals, including forms of horse, antelope, peccary, wolf, mammoth and sloth. Those remains belong to a cooler, wetter environment very different from the modern county. They are a reminder that the flat landscape is not geologically or ecologically simple just because it lacks mountains or rivers."),
    p("That deep history gives Midland County a useful sense of scale. Railroad history is old by city standards. Ranching goes back farther. Indigenous use of the plains is older still. Archaeology reaches into a landscape that predates every modern county boundary."),

    h("Midland is the center, but the county extends beyond downtown"),
    p("Most Midland County residents live in or near the city of Midland, yet the county also includes rural and semi-rural landscapes that feel very different from the corporate core. Ranches, energy infrastructure, cotton fields, industrial yards and residential development share the same broad plain. The transition from city to countryside can happen quickly."),
    p("Communities and named places such as Greenwood, Germania and Spraberry connect the county to older agricultural and petroleum geographies. Greenwood in particular represents the suburban-rural edge where homes, schools, ranch acreage and oilfield activity coexist. These places matter because Midland County is not simply the city limits enlarged to a county map."),
    p("The county line with Ector County is especially porous in everyday life. Midland and Odessa retain strong separate identities, but together they form the largest urban pair in the central Permian Basin. Workers, shoppers, patients, students and businesses cross between them constantly, making the county boundary administratively important but economically permeable."),

    h("A few Midland County facts worth remembering"),
    list(
      "Midland County was created and organized in 1885 from territory previously assigned to Tom Green County.",
      "The county and its seat took their name from a railroad settlement first called Midway, reflecting its position between Fort Worth and El Paso.",
      "The county lies on the southern edge of the High Plains and has no permanent rivers or other permanent surface waters.",
      "Ranching preceded large-scale farming, while irrigation later helped cotton expand across the county in the early twentieth century.",
      "Oil discoveries in neighboring Reagan and Ector counties helped turn Midland into a corporate headquarters center before major production developed inside Midland County itself.",
      "The Permian Basin Petroleum Museum opened in 1975 and interprets both the geology and human history of the region's energy industry.",
      "The Bush Family Home State Historic Site preserves the early-1950s Midland residence of George H. W. Bush, Barbara Bush and their family.",
      "The 2020 census counted 169,983 Midland County residents, and the Census Bureau estimated 187,855 residents in 2025.",
    ),

    h("Why Midland County belongs in the county series"),
    p("Midland County is one of the clearest places in Texas to see geography converted into economic position. It began as a midpoint on a railroad, then became a midpoint of another kind: a place from which companies could coordinate activity across an enormous petroleum region. The same open landscape that once challenged settlers eventually became an advantage for railroads, roads, airports, pipelines and sprawling development."),
    p("Its story also resists the idea that oil erased everything that came before. Ranching, cotton, drought, Indigenous travel, archaeology and railroad settlement remain part of the county's identity. The petroleum era layered towers, museums, subdivisions and corporate culture onto an older High Plains landscape rather than replacing it."),
    p("That is what makes Midland County more interesting than the shorthand. It is not simply an oil county, and Midland is not simply an oil city. It is a West Texas place built around movement, water scarcity, risk and repeated reinvention—a county where a courthouse, an ancient fossil site, a railroad name, a presidential family home and a petroleum museum all make sense on the same map."),
  ],
};