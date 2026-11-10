import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const collinCountyMcKinneyPrairieGrowthArticle: Article = {
  id: "county-collin-mckinney-prairie-growth",
  brandId: "texasdefined",
  slug: "collin-county-mckinney-prairie-growth-texas",
  title: "Collin County: McKinney, Blackland Prairie and a North Texas Boom",
  dek: "Collin County grew from a scattering of prairie farms around McKinney into one of Texas's largest and fastest-growing counties, while historic town squares, creeks and Blackland Prairie landscapes still reveal the older North Texas beneath the boom.",
  category: "texas-history",
  region: "north-texas",
  hero: {
    src: "https://www.collincountytx.gov/images/default-source/default-album/buildings/chplaceholder.jpg",
    alt: "Collin County Courthouse in McKinney, Texas",
    width: 1200,
    height: 800,
    credit: "Collin County, Texas",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-16",
  updatedAt: "2026-11-09",
  readingMinutes: 12,
  tags: ["Collin County", "McKinney", "Plano", "Frisco", "Blackland Prairie", "Collin McKinney", "North Texas", "Historic Downtown McKinney", "Lavon Lake", "Texas counties"],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 Texas county references and county guides." },
    { href: "/county/dallas", label: "Explore Dallas County", description: "Continue south into the historic and urban core of the Metroplex." },
    { href: "/county/denton", label: "Explore Denton County", description: "Cross the western county line into another fast-growing North Texas county." },
    { href: "/county/grayson", label: "Explore Grayson County", description: "Head north toward Sherman, Denison and the Red River country." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how settlement and travel distance helped shape Texas county boundaries." },
  ],
  sources: [
    { label: "City of McKinney — initial DTX commercial service announcement", url: "https://www.mckinneytexas.org/m/newsflash/home/detail/6915" },
    { label: "City of McKinney — terminal progress and December routes", url: "https://www.mckinneytexas.org/m/newsflash/home/detail/7018" },
    { label: "McKinney National Airport — official news and route updates", url: "https://flydtx.com/news-and-media/" },
    { label: "Avelo Airlines — current routes and bookings", url: "https://www.aveloair.com/new-routes" },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Collin County is one of the clearest places in Texas to see how quickly a landscape can change without completely erasing what came before. Along the county's southern edge, Plano and Richardson merge into the continuous urban fabric of the Dallas-Fort Worth region. Farther north, Frisco, Allen, McKinney and Prosper have expanded across former farm and ranch land at a pace that has made the county a national shorthand for suburban growth. Yet the old courthouse square in McKinney, smaller communities such as Farmersville and Celina, creek bottoms, remnant prairie and agricultural roads still reveal an older North Texas beneath the new subdivisions and office campuses."),
    p("That contrast is the key to understanding Collin County. Its story did not begin with corporate relocations or toll roads. The county was created in 1846 from territory that had been part of Fannin County and was named for Collin McKinney, a pioneer, surveyor and statesman who helped draft and signed the Texas Declaration of Independence. What followed was nearly two centuries of settlement, farming, railroad building, small-town commerce, suburbanization and metropolitan growth layered onto the same Blackland Prairie landscape."),

    h("A county named for a founder of Texas"),
    p("Collin McKinney was already an important figure in Texas history before the county took his name. Born in 1766, he moved through several states before settling in what was then Mexican Texas. At the Convention of 1836 at Washington-on-the-Brazos, he was the oldest delegate and one of five men selected to help draft the Texas Declaration of Independence. Collin County's official history notes that the county was established in 1846 and named for him, as was the county seat that followed two years later."),
    p("The names connect local geography to the founding generation of the Republic. They also point to the importance of surveying and county government in early Texas. McKinney worked as a land surveyor, and county boundaries, roads and seats of government were practical concerns in a state where distance could make access to a courthouse difficult. The county that bears his name would eventually become one of the most densely connected parts of Texas, but it began as scattered farms on a broad prairie."),

    h("Buckner came first, but McKinney became the seat"),
    p("The first county seat was Buckner, a settlement northwest of present-day McKinney. The arrangement did not last. State law required the seat to sit close to the county's geographic center, and voters considered new locations. McKinney's official history records that heavy rains and swollen creeks complicated access to the polls for supporters of a competing site near Sloan's Grove. In 1848 the Legislature established McKinney as the county seat."),
    p("The move mattered because county seats were more than administrative addresses. Courts, land records, elections and commerce brought residents into town. Stores and homes clustered around the square, and the town became the county's civic anchor. Even after larger cities emerged elsewhere in Collin County, McKinney retained that governmental role and a historic center that gives the county a visible connection to its nineteenth-century origins."),

    h("The Blackland Prairie shaped the first economy"),
    p("Collin County lies within the Blackland Prairie, a belt of dark, fertile soils that arcs through North and Central Texas. Early settlers turned the prairie into farms producing wheat, corn and later cotton. The county's official historical account describes a population of only about 150 around the time the county was created, with family-run farms forming the core of the economy."),
    p("Agriculture changed the appearance of the prairie but remained tied to its soils and rainfall. Creeks cut through the rolling terrain, and the lack of dense forest made much of the land attractive for cultivation. Today roads, rooftops and commercial districts dominate large areas that once held fields, yet the county's topography still reflects that prairie foundation. Open land near the northern and eastern edges offers glimpses of the setting that defined Collin County for generations."),

    h("Railroads connected the farm towns"),
    p("Railroads transformed North Texas in the late nineteenth century, and Collin County's communities grew around the new connections. McKinney, Plano, Allen, Frisco, Farmersville, Wylie and other towns benefited from access to regional markets. Grain, cotton, livestock, passengers and manufactured goods could move farther and faster than wagon roads allowed."),
    p("The railroad era left a durable imprint on town form. Historic commercial blocks, depots, warehouses and street grids still help explain why certain communities became local centers. Even where tracks no longer dominate daily life, the pattern of compact downtowns surrounded by later development is visible. In McKinney, the historic square remains one of the county's most recognizable destinations and demonstrates how a nineteenth-century civic center can survive inside a twenty-first-century metropolitan county."),

    h("Historic McKinney anchors the county's older identity"),
    p("Downtown McKinney is especially useful for understanding Collin County before the suburban boom. The courthouse square is surrounded by preserved commercial buildings and streets that retain the scale of an older county-seat town. The historic courthouse itself traces its site to a nineteenth-century building dedicated in 1876 and later substantially remodeled; the old civic structure now serves a cultural role rather than functioning as the modern county courthouse."),
    p("A short distance away, the old Collin County prison adds another layer. The county identifies the 1880 Victorian Italianate structure as one of Texas's oldest nineteenth-century county jails remaining substantially in original condition. Built of locally quarried fossiliferous limestone and designed by Austin architect F. E. Ruffini, it reflects the practical institutions that accompanied county government as settlements became established communities."),

    h("Plano signaled the suburban transformation"),
    p("The second half of the twentieth century changed Collin County more dramatically than any earlier period. Plano, directly north of Dallas, became a major suburban city and employment center. Housing subdivisions spread across former agricultural land while corporate campuses, shopping centers, schools and highways followed. The county's relationship with Dallas shifted: it was no longer primarily an agricultural hinterland sending products south, but part of an integrated metropolitan economy."),
    p("Plano's rise established a pattern that later spread north. High-quality road access, large tracts of developable land, expanding school systems and proximity to major employment centers attracted residents and businesses. What looked like the northern edge of metropolitan Dallas in one decade often became the established middle of the region in the next."),

    h("Frisco, Allen and McKinney pushed the growth line north"),
    p("Allen, Frisco and McKinney became major cities as the metropolitan growth front moved northward. Each developed a distinct civic identity, but all were shaped by the same powerful forces: regional highways, employment growth, master-planned housing, schools, retail and the appeal of new construction. Frisco in particular became known for large-scale sports and entertainment development, while Allen built its own concentration of retail and residential growth."),
    p("McKinney presents the sharpest contrast between old and new. A visitor can move from a historic courthouse square to extensive modern neighborhoods and commercial corridors in minutes. The city's expansion has not erased the county-seat core, but it has changed its context completely. What was once a small town serving farmers is now the governmental center of a county with well over a million residents."),

    h("The numbers show the scale of the boom"),
    p("The U.S. Census Bureau counted 1,064,465 people in Collin County in the 2020 census, up from 782,341 in 2010. Its July 1, 2025 population estimate reached 1,297,179, an increase of 21.7 percent from the 2020 estimates base in only five years. Those numbers place the county among the largest population centers in Texas and make its growth more than a local development story."),
    p("Population growth changes almost every public system at once. Roads carry more traffic, school districts build campuses, cities extend utilities, parks and fire stations move outward, and county courts and administrative services handle more residents. The modern Collin County Courthouse and government complex in McKinney reflect that expanded scale. The county government serving today's population is operating in a fundamentally different environment from the courthouse-centered community of the nineteenth century."),

    h("A modern economy grew beside the subdivisions"),
    p("Collin County's transformation has not been residential alone. Corporate offices, technology firms, financial services, health care, higher education, professional services, construction, retail and hospitality have created a large employment base inside the county. Plano's Legacy area and other business districts helped establish the county as a place where people work as well as commute from."),
    p("The result is a more complex metropolitan pattern than the old suburb-and-core model suggests. Residents may live in McKinney, work in Plano, attend an event in Frisco and shop in Allen without leaving Collin County. The county increasingly functions as a collection of interconnected cities with their own job centers rather than as a bedroom community attached to Dallas."),

    h("McKinney National Airport adds commercial flights in November 2026"),
    p("One of the most visible changes to Collin County\u0027s transportation network is scheduled for November 11, 2026: McKinney National Airport\u0027s first commercial passenger departure. The airport has long handled general aviation; the new commercial terminal creates a new choice for people traveling to or from northern Collin County. For commercial flight searches, the McKinney airport uses the booking code DTX. Its former TKI identifier continues for general aviation operations. Travelers should confirm the airport code when comparing Dallas-area flights rather than assuming that a fare listed for DFW or DAL is departing from McKinney."),
    p("The first scheduled Avelo departure is to Southwest Florida International Airport at Fort Myers on Wednesday, November 11. Orlando and Las Vegas are scheduled to start November 12; Fort Lauderdale and Tampa follow November 19. The City of McKinney\u0027s September 24 announcement also lists Atlanta and Denver service beginning December 16 and Nashville and New Orleans starting December 17. Route announcements are not evidence that a flight has operated, and schedules, destinations, fares and frequencies can change. For a trip, use the airport\u0027s official FlyDTX site and the airline\u0027s current booking system rather than relying on launch-era route counts."),
    p("The new passenger terminal is at 1910 FM 546. City plans describe a 46,000-square-foot building opening with four passenger gates, with capacity to expand to six; they also describe onsite car rentals, ground transportation and about 980 public parking spaces. These are announced opening-period facilities, not a promise of same-day availability. DTX may shorten ground travel for some residents of McKinney, Allen, Anna, Melissa and neighboring communities, but it does not replace DFW International or Dallas Love Field for every destination or connection. Compare the entire itinerary, baggage policies, flight days, parking and ground travel. Scheduled flights are a new stage of county connectivity, following the railroads that linked prairie towns and the highways that linked expanding suburbs to Dallas."),
    h("Lavon Lake and the eastern county preserve open horizons"),
    p("Growth is most intense along the central and western corridors, but eastern Collin County offers a different perspective. Lavon Lake, created on the East Fork of the Trinity River, is a major water-supply and recreation feature. Around it, communities such as Wylie, Princeton, Farmersville and Lavon connect the metropolitan county to landscapes that remain more open and, in places, visibly agricultural."),
    p("The lake also illustrates a recurring North Texas theme: water infrastructure makes urban growth possible while creating new recreational landscapes. Reservoirs, creeks and floodplains are not empty spaces between developments; they are part of the physical system that supports the region. Parks, boat ramps and shoreline areas provide some of the county's broadest public views of sky, water and prairie."),

    h("Small towns remain part of the county story"),
    p("Celina, Prosper, Anna and Melissa have become prominent growth communities, while places such as Farmersville, Blue Ridge, Nevada and Josephine retain smaller-town patterns even as development approaches. Their futures will not necessarily mirror the older suburbs exactly. New highways, employment centers and master-planned communities are reshaping the northern and eastern county on a larger scale than earlier generations experienced."),
    p("These places matter because Collin County's identity has never belonged to one city. McKinney is the seat, Plano was an early suburban powerhouse, Frisco became a major sports and business center, and smaller communities carry their own histories. Seeing the county as a network rather than a single urban mass makes its transformation easier to understand."),

    h("Historic preservation has greater value as growth accelerates"),
    p("Fast growth can make surviving historic places more important because they provide reference points in a landscape where so much is new. Downtown McKinney, old commercial blocks, cemeteries, rural roads, farmhouses and community landmarks show how people organized life before multilane highways and large subdivisions. Preserving them does not stop growth; it gives growth a context."),
    p("The same is true of natural remnants. Blackland Prairie is one of the most altered ecosystems in Texas because its rich soils were so useful for agriculture and later development. Small preserved landscapes, creek corridors and open spaces help explain what the county looked like before urbanization and why early settlers valued the land."),

    h("How to experience Collin County as a county"),
    p("Start in downtown McKinney. Walk the historic square, look at the old courthouse and notice the compact blocks that organized county-seat life. From there, the old county prison and nearby historic neighborhoods add depth to the nineteenth-century story. Then drive south through Allen toward Plano to see how completely the county's landscape changed during the suburban era."),
    p("A second route should head west toward Frisco and then north through Prosper or Celina, where active construction makes the current growth frontier visible. For contrast, travel east toward Farmersville or Lavon Lake. The shift from dense development to water, prairie and smaller communities helps reveal the county's full geography rather than only its most famous suburban corridors."),

    h("Why Collin County matters to the Texas story"),
    p("Collin County matters because its history connects two powerful Texas narratives: settlement of the North Texas prairie and the extraordinary metropolitan expansion of the modern state. It carries the name of a signer of the Texas Declaration of Independence, grew around farms and railroad towns, and still preserves a courthouse square that belongs to that older world. At the same time, it has become home to nearly 1.3 million people and one of the state's largest concentrations of new neighborhoods, corporate offices and rapidly growing cities."),
    p("The county's defining feature may be the speed with which these eras sit beside one another. A historic street in McKinney, a former cotton town, a technology office in Plano, a stadium complex in Frisco, a new subdivision near Celina and an open view across Lavon Lake all belong to the same county. Together they show how Texas growth works: not by replacing the past in a single moment, but by layering a new landscape over older routes, institutions and communities until both are visible at once."),
  ],
};
