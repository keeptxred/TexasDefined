import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const wardCountyMonahansSandhillsArticle: Article = {
  id: "county-ward-monahans-sandhills",
  brandId: "texasdefined",
  slug: "ward-county-monahans-sandhills-texas",
  title: "Ward County: Monahans, Moving Sand and the Oil Roads of West Texas",
  dek: "Ward County is a place where wind-built dunes, railroad water stops, Pecos River irrigation, bomber-base history and Permian Basin oil all occupy the same compact stretch of West Texas.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: "https://tpwd.texas.gov/state-parks/monahans-sandhills/gallery/monahans_106.jpg",
    alt: "Wind-shaped dunes at Monahans Sandhills State Park in Ward County, Texas",
    width: 1200,
    height: 800,
    credit: "Texas Parks and Wildlife Department",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Ward County", "Monahans", "Monahans Sandhills State Park", "Pyote", "Barstow", "Permian Basin", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/reeves-county-pecos-balmorhea-texas", label: "Explore neighboring Reeves County", description: "Follow the Pecos River south toward Pecos, Balmorhea and San Solomon Springs." },
    { href: "/article/pecos-county-fort-stockton-comanche-springs-texas", label: "Continue into Pecos County", description: "Explore Fort Stockton, Comanche Springs and another West Texas crossroads." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Ward County can look simple from Interstate 20: a West Texas horizon, oilfield traffic, low mesquite and a city built around the road. Leave the highway for a few minutes, though, and the county becomes stranger and more layered. North of Monahans, dunes move with the wind. Along the Pecos River, old irrigation dreams once produced orchards and vineyards. At Pyote, a World War II bomber base briefly connected a tiny desert town to the global war. Under nearly all of it lies the modern Permian Basin economy."),
    p("The county covers about 836 square miles on the southwestern edge of the High Plains. It is mostly level country, but the landscape changes quickly: active sand in the north, alluvial ground near the Pecos River in the south and west, and a web of roads, rail lines, pipelines and well sites that show how transportation and energy have repeatedly reorganized life here."),

    h("The dunes are the first thing that makes Ward County different"),
    p("Monahans Sandhills State Park protects one of the most recognizable landscapes in the Permian Basin. Texas Parks and Wildlife describes 4,717 acres of dunes spread across Ward and Winkler counties, part of a much larger dune field that continues north toward New Mexico. The park opened in 1957, but the sand itself has been shaping travel and settlement for far longer."),
    p("These are not fixed desert hills. Wind moves the surface constantly, rebuilding ridges and hollows and sometimes changing the look of the ground overnight. TPWD deliberately leaves the dune area without marked hiking trails; visitors are free to walk across the sand, rent discs to slide the slopes, ride horses in a designated equestrian area or simply watch the wind redraw the landscape."),
    p("The sand also hides one of the county's most important historical facts: water can be surprisingly shallow beneath it. That made the sandhills useful to people crossing an otherwise dry region. Texas Parks and Wildlife notes that Native people used the area for thousands of years, finding game, plant foods and dependable water beneath the dunes. Apache and Comanche groups later used the sandhills as temporary camp and meeting country."),

    h("Monahans began with a well, not with oil"),
    p("The city at the center of modern Ward County began because the railroad needed water. In 1881, as the Texas and Pacific Railway pushed across West Texas, Thomas John 'Pat' Monahan located water at the western edge of the sandhills. The place became known as Monahan's Well, then developed around the railroad pump, tanks and depot."),
    p("That origin is easy to overlook because Monahans is now associated so strongly with petroleum. But the sequence matters. The railroad arrived first, and the railroad needed a dependable water stop. A ranch supply point grew around the stop, a post office followed, and by the turn of the twentieth century hotels, stores, cattle pens and other businesses served travelers and ranchers."),
    p("The story fits a pattern visible across West Texas: before oil made towns larger, water and transportation usually decided where towns could exist at all."),

    h("Ward County was organized around Barstow"),
    p("The Texas Legislature created Ward County from part of Tom Green County in 1887. The county remained politically attached to Reeves County until local population was large enough to support its own government. Ward County formally organized in 1892, and voters selected Barstow as the first county seat."),
    p("Barstow sat closer to the Pecos River and initially made sense as the political center. Irrigation projects supported farms, orchards and vineyards in the river valley, and the town became a trade point for agricultural communities that were trying to turn a dry landscape into productive farmland."),
    p("That experiment proved fragile. Flooding, salinity and drought damaged agriculture along the Pecos. The county's center of gravity slowly shifted away from the river valley, and the change became dramatic once oil transformed the northeastern part of the county."),

    h("The Hendrick oilfield changed the map"),
    p("Oil development near Monahans accelerated after the Hendrick field opened in 1926. The boom brought pipelines, loading facilities, workers and new businesses. Monahans incorporated in 1928, and the following decade made it increasingly difficult to justify keeping county government in the smaller river town of Barstow."),
    p("Oil was not the county's only mineral industry. During the 1930s, natural gas, potash, sodium sulfate, carbon black and chemical production added to a broader industrial economy. Railroad connections expanded to handle oilfield traffic, and paved highways made Monahans even more accessible."),
    p("The result was a political fight as well as an economic one. In a 1938 election, Ward County voters backed moving the county seat to Monahans by a wide margin. Litigation delayed the transition, but Monahans became the county seat in 1939. The move was more than a courthouse story; it marked the point when petroleum had decisively replaced irrigated agriculture as the county's main organizing force."),

    h("A million-barrel tank became a monument to boomtown ambition"),
    p("One of Monahans' most memorable oil-boom relics is the enormous tank built by Shell in 1928 to store surplus crude. The city's history describes a tank covering roughly eight acres with a capacity of more than one million barrels. It was filled once, leaked, and was abandoned as a practical storage solution."),
    p("Today the site is remembered through Monahans' Million Barrel Museum complex. The tank is useful as local history because it captures the scale and improvisation of early Permian Basin development: companies were producing oil faster than infrastructure and markets could comfortably absorb it, and the response was sometimes to build on a scale that seemed almost unbelievable."),

    h("Pyote became a bomber town during World War II"),
    p("West of Monahans, tiny Pyote carries a very different chapter of Ward County history. The federal government established Pyote Army Air Field in 1942 as a heavy-bomber training installation. The base expanded rapidly, bringing thousands of military personnel and civilian workers to a place that had previously been known mainly as a railroad and oilfield community."),
    p("Air crews trained there during World War II, and after the war the installation became a storage site for aircraft. The base's later history included famous planes that passed through storage before preservation elsewhere. Pyote never retained the wartime population, but the remains of the base and local museum collections keep that short, intense period visible."),
    p("The Pyote story is important because it shows how national events could temporarily overwhelm the normal scale of a West Texas town. For a few years, a remote county better known for sand and oil became part of the military infrastructure needed to train crews for a global conflict."),

    h("Barstow and Grandfalls tell the Pecos River side of the county"),
    p("The southern and western parts of Ward County belong to the Pecos River world. Barstow's early vineyards and orchards depended on irrigation, and Grandfalls developed in the same broader river corridor. These communities remind visitors that Ward County was not always an oil-first economy."),
    p("Irrigation in the Pecos Valley required constant management because desert agriculture is never just a matter of planting crops. Water quantity, salt, floods, drought and canal maintenance all mattered. When those systems failed or conditions changed, communities could lose the economic advantage that had justified their location."),
    p("The decline of early river agriculture and the rise of Monahans offer a compact lesson in West Texas settlement. A county seat, a railroad town or a farming center can look permanent until the resource supporting it changes."),

    h("Wickett, Royalty and the smaller towns complete the oilfield geography"),
    p("Ward County's smaller communities grew around different pieces of the same regional economy. Wickett became associated with oilfield and industrial activity. Royalty developed after oil discoveries near Grandfalls. Pyote combined railroad, petroleum and military history. Barstow retained the memory of the old county seat and the agricultural Pecos Valley."),
    p("Together they make Ward County more than a Monahans story. The county works as a network of service towns, historic settlements and industrial sites connected by the same long corridors that carry Interstate 20, rail freight, pipelines and energy traffic across the Permian Basin."),

    h("The modern economy still follows oil and transportation"),
    p("Oil and gas remain central to the county's economy and to Monahans' role as a regional service center. The city sits at the meeting of Interstate 20 and State Highway 18, close enough to Odessa and Midland to be part of the larger Permian Basin labor and supply network while still maintaining a distinct small-city identity."),
    p("That location means the county experiences the cycles that define energy regions: housing demand rises and falls, road traffic changes, service companies expand or contract, and public infrastructure has to respond to industries whose pace is often set by national and global commodity markets."),
    p("At the same time, tourism gives Ward County a second identity. The state park brings families, campers, photographers and travelers who may have no connection to the oilfield at all. A visitor can spend the morning sledding down dunes and the afternoon driving past pumpjacks and service yards, seeing two completely different versions of West Texas within a few miles."),

    h("The sandhills are also a living ecosystem"),
    p("It is tempting to describe the dunes as empty, but Texas Parks and Wildlife emphasizes the opposite. Plants and animals survive in and around the moving sand, and the park's visitor center interprets both natural and human history. Mesquite, grasses and other vegetation hold parts of the landscape while exposed dunes continue to move."),
    p("The park's lack of conventional trails reinforces the point. Visitors do not move through a fixed scenic corridor; they enter a landscape whose surface is actively changing. That makes Monahans Sandhills one of the most unusual state-park experiences in Texas and gives Ward County a natural landmark that is genuinely specific to the place rather than interchangeable with generic desert scenery."),

    h("A few Ward County facts worth remembering"),
    list(
      "Ward County was created in 1887 and organized in 1892, with Barstow as its first county seat.",
      "Monahans grew around a Texas and Pacific Railway water stop established in 1881 at the edge of the sandhills.",
      "The Hendrick oilfield boom beginning in 1926 accelerated Monahans' growth and helped shift the county's economic center northeast.",
      "Voters approved moving the county seat from Barstow to Monahans in 1938; the move took effect after litigation in 1939.",
      "Monahans Sandhills State Park opened in 1957 and now protects 4,717 acres across Ward and Winkler counties.",
      "Pyote Army Air Field opened in 1942 as a heavy-bomber training installation during World War II.",
      "The Pecos River corridor supported early irrigated farming around Barstow and Grandfalls before petroleum became dominant.",
      "Interstate 20 and State Highway 18 keep Monahans connected to the wider Permian Basin economy today.",
    ),

    h("Why Ward County belongs in the county series"),
    p("Ward County is useful because it compresses several major West Texas stories into a relatively small area. Indigenous travel and shallow groundwater explain the importance of the sandhills. Railroads explain Monahans' beginning. Irrigation explains Barstow's early prominence. Oil explains the county-seat shift and the modern economy. World War II explains Pyote's extraordinary boom. A state park explains why the same county is also a recreation destination."),
    p("The landscape is the thread connecting all of those stories. Water beneath sand made travel possible. River water encouraged farming. Railroad water stops created towns. Oil beneath the ground reordered the county. Wind continues to rebuild the dunes regardless of what people construct nearby."),
    p("That is what makes Ward County worth stopping for instead of simply crossing on Interstate 20. The county is not a blank space between Odessa and Pecos. It is a place where West Texas keeps showing its layers: sand, water, rail, war, oil and small towns adapting every time the ground beneath the economy changes."),
  ],
};