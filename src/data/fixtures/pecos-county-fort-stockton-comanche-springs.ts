import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const pecosCountyFortStocktonComancheSpringsArticle: Article = {
  id: "county-pecos-fort-stockton-comanche-springs",
  brandId: "texasdefined",
  slug: "pecos-county-fort-stockton-comanche-springs-texas",
  title: "Pecos County: Fort Stockton, Comanche Springs and a West Texas County Built at the Crossroads",
  dek: "Pecos County is where desert springs, military roads, ranching, irrigation and oil-field booms converged around Fort Stockton — a place whose history makes more sense when you follow the routes that crossed it.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Guardhouse_Fort_Stockon_Texas_2023.jpg",
    alt: "Historic guardhouse at Fort Stockton in Pecos County, Texas",
    width: 3556,
    height: 2000,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Pecos County", "Fort Stockton", "Comanche Springs", "Fort Stockton history", "West Texas", "Trans-Pecos", "Texas counties", "Texas history", "ranching", "oil and gas"],
  featured: false,
  internalLinks: [
    { href: "/article/reeves-county-pecos-balmorhea-texas", label: "Explore neighboring Reeves County", description: "Follow the Pecos River north toward Pecos, Balmorhea and San Solomon Springs." },
    { href: "/article/brewster-county-big-bend-texas", label: "Explore Brewster County", description: "Continue south toward Alpine, Marathon and Big Bend country." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/texas-regions-explained", label: "Understand the Texas regions", description: "See how the Trans-Pecos fits into the larger Texas map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Pecos County is the kind of place that can look empty from the highway until you understand what people were looking for when they crossed it. They were looking for water, a safe road, a place to rest livestock, a military post, a market, a railroad connection or, later, an oil lease. Fort Stockton grew where several of those needs met."),
    p("The county covers a broad piece of the Trans-Pecos, stretching across dry plains, mesas, draws and ranch country north of the Big Bend. Its history is not centered on one resource alone. The more useful theme is movement: Indigenous trails, military roads, mail routes, cattle traffic, irrigation canals, highways and petroleum infrastructure all reused the same strategic geography in different eras."),

    h("Comanche Springs explains why Fort Stockton is where it is"),
    p("Long before Fort Stockton became a county seat, Comanche Springs made the site valuable. The springs emerged from limestone along what became the southeastern side of town and once produced enough water to support travelers, wildlife, livestock and later irrigation agriculture. In an arid region, dependable water was not scenery. It was infrastructure."),
    p("The springs sat near major travel corridors. Nineteenth-century accounts placed them on routes used by Comanche travelers, wagon trains, the San Antonio-El Paso road system and mail traffic. That made the site both useful and vulnerable, which is why the United States Army established a post there in 1859."),
    p("The same logic appears elsewhere in West Texas: routes bend toward water, and towns often grow where a reliable water source intersects with transportation. Fort Stockton is one of the clearest examples because the spring, the fort and the town all developed within the same compact landscape."),

    h("The army post turned a watering place into a regional anchor"),
    p("Fort Stockton was established in 1859 to protect mail service, travelers and freight moving through the region. The post was named for Lt. Edward Dorsey Stockton, an Army officer who had died in San Antonio two years earlier. The Civil War interrupted the post's first phase, but federal troops returned after the war and rebuilt it on a larger scale."),
    p("For nearly two decades after Reconstruction, the fort supported a local economy of laborers, freighters, farmers, ranchers and merchants. Military posts in remote Texas did more than house soldiers. They created steady demand for hay, meat, freight, repairs and supplies, giving surrounding settlements a reason to exist even when the civilian population was small."),
    p("The fort was abandoned in 1886, but by then the town beside it had enough economic weight to survive. Historic structures from the post remain part of Fort Stockton's identity today, making the military era visible rather than abstract."),

    h("The first town name did not last"),
    p("Peter Gallagher purchased land near the fort and Comanche Springs in 1868 and laid out a townsite called Saint Gall. The name never became as durable as the military name beside it. When Pecos County was organized in 1875, Saint Gall became the county seat; in 1881 the community officially took the name Fort Stockton."),
    p("That change captures something practical about frontier town-building. A recognizable fort name carried more geographic meaning than a newer promotional town name. Travelers, merchants and ranchers already knew the post, so the town increasingly adopted the identity that the wider region already used."),

    h("Pecos County began larger than the county on today's map"),
    p("The Texas Legislature created Pecos County in 1871, and the county was formally organized in 1875. Like many large West Texas counties, its original boundaries changed as population increased and new counties were carved from the enormous early jurisdictions."),
    p("Parts of early Pecos County later became Reeves and Terrell counties, and additional land was incorporated into Val Verde County. The shrinking map did not make the remaining county small. Pecos County still spans a vast landscape, which helps explain why local government, transportation and service centers have always had to operate across long distances."),

    h("Irrigation made farming possible where rainfall could not"),
    p("The springs and nearby waterways encouraged some of the region's earliest modern irrigation efforts. By the 1870s settlers were diverting water to cropland near Fort Stockton, and agriculture expanded as canals and water-control systems improved."),
    p("Irrigation did not turn Pecos County into a humid farming district. It created productive pockets inside a dry landscape. That distinction matters because agriculture here has always depended on access to groundwater, springs or managed surface water rather than dependable rainfall."),
    p("The history of Comanche Springs is also a warning about that dependence. Heavy groundwater pumping after World War II reduced the spring flow dramatically, and the springs stopped flowing continuously by the early 1960s. The disappearance of the historic flow changed both the local landscape and the ecological system that had depended on it."),

    h("Ranching became the durable economy after the fort years"),
    p("When the military post closed and major rail lines bypassed Fort Stockton, the town lost an important source of trade. Ranching gave it another foundation. Large cattle and sheep operations spread across Pecos County because the land was better suited to extensive grazing than to dense settlement."),
    p("By the late nineteenth and early twentieth centuries, ranching shaped land ownership, labor patterns and the scale of local businesses. It also reinforced Fort Stockton's role as a supply center: remote ranches needed groceries, equipment, banking, freight services and county government even when their nearest neighbor might be miles away."),
    p("That ranching geography is still visible. Fences, windmills, stock tanks and long ranch roads remain part of the county's working landscape even where oil-field traffic now dominates the highway."),

    h("Oil changed the scale of the county's economy"),
    p("Petroleum transformed Pecos County in the twentieth century. The opening of the Yates field in the 1920s helped trigger a regional boom, and Fort Stockton developed into a service center for oil, natural gas and related industries."),
    p("Energy development introduced a familiar West Texas cycle: rapid investment, housing pressure, truck traffic and high wages during booms, followed by slowdowns when commodity prices or drilling activity fell. That boom-and-bust pattern became as important to the modern county as ranching had been to the earlier one."),
    p("Oil and gas did not erase the older economy. They layered a new network of leases, roads, pipelines and service yards across ranch country. Pecos County today is easier to understand when those systems are viewed together rather than as separate eras."),

    h("Fort Stockton became a highway crossroads after the railroad passed it by"),
    p("The town's first transportation importance came from trails, military roads and stage routes. Later, railroads did not give Fort Stockton the dominant position that boosters once hoped for. Highways eventually restored the town's role as a crossroads."),
    p("Interstate 10 and U.S. highways now connect Fort Stockton to El Paso, San Antonio, the Permian Basin and Big Bend destinations. Travelers use the city for fuel, food and lodging for much the same reason earlier wagon traffic stopped nearby: it is a practical service point between long stretches of open country."),
    p("That continuity is one of the best ways to read Fort Stockton. The technology changed from horses to stages to trucks, but the basic geographic job stayed remarkably similar."),

    h("Comanche Springs is still the county's most revealing landmark"),
    p("The historic springs no longer flow the way nineteenth-century travelers described them, but the site remains central to Fort Stockton's story. A county swimming pool and park occupy the area around the old spring complex, preserving the memory of the water source even though groundwater use changed its hydrology."),
    p("The loss of dependable spring flow is not only a historical footnote. It links Pecos County's past to a modern West Texas question: how should communities balance municipal demand, agriculture, industry and ecological resources when they all depend on limited groundwater?"),
    p("That question also connects Pecos County directly to neighboring Reeves County, where San Solomon Springs and Balmorhea continue to make groundwater visible above the desert floor. Taken together, the two counties tell complementary stories about what happens when West Texas settlement depends on aquifers."),

    h("A few Pecos County facts worth remembering"),
    list(
      "Pecos County was created by the Texas Legislature in 1871 and formally organized in 1875.",
      "Fort Stockton grew around Comanche Springs and a U.S. Army post established in 1859.",
      "The settlement was first called Saint Gall before officially becoming Fort Stockton in 1881.",
      "Comanche Springs supplied travelers, the military post and irrigation agriculture before heavy groundwater pumping sharply reduced its flow.",
      "The military post closed in 1886, after which ranching became an especially important economic base.",
      "The regional oil boom that followed development of the Yates field in the 1920s reshaped Fort Stockton and Pecos County.",
      "Modern Fort Stockton sits on Interstate 10 and continues to function as a major service stop between long distances of West Texas.",
      "Pecos County's history is a layered story of water, transportation, ranching and energy rather than a single-industry story."
    ),

    h("Why Pecos County belongs next in the county series"),
    p("Reeves County to the north shows how springs, irrigation and the Pecos River shaped settlement around Pecos and Balmorhea. Pecos County continues that same water story but adds a military frontier, a county seat built around road traffic and a stronger connection to the twentieth-century oil economy."),
    p("To the south and southwest, the landscape opens toward Brewster and Terrell counties, where distances grow larger and the Big Bend begins to dominate the map. To the north and east, energy development becomes more visible. Pecos County sits between those worlds, which is why Fort Stockton has remained useful to travelers even when the reason for travel changes."),
    p("The county's defining image may be the old fort guardhouse, but the more important clue is the spring nearby. Water attracted routes. Routes attracted the fort. The fort attracted a town. Ranching kept the town alive after the soldiers left, and petroleum gave the county another economic life. In Pecos County, the layers of West Texas history are unusually easy to see because they were built almost on top of one another."),
  ],
};
