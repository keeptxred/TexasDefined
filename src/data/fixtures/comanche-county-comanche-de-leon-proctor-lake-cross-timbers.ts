import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const comancheCountyComancheDeLeonProctorLakeCrossTimbersArticle: Article = {
  id: "county-comanche-comanche-de-leon-proctor-lake-cross-timbers",
  brandId: "texasdefined",
  slug: "comanche-county-comanche-de-leon-proctor-lake-cross-timbers-texas",
  title: "Comanche County: Comanche, De Leon, Proctor Lake and the Cross Timbers",
  dek: "Comanche County is a North Central Texas meeting place of Cross Timbers woods, prairie, ranching, railroad towns, peanut country and the Leon River watershed around Proctor Lake.",
  category: "texas-history",
  region: "north-central-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Comanche_county_tx_courthouse.jpg?width=1600",
    alt: "Comanche County Courthouse in Comanche, Texas",
    width: 2118,
    height: 1429,
    credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-19",
  readingMinutes: 20,
  updatedAt: "2026-11-25",
  tags: [
    "Comanche County",
    "Comanche Texas",
    "De Leon Texas",
    "Proctor Lake",
    "Leon River",
    "Cross Timbers",
    "Texas ranching",
    "Texas railroads",
    "Texas agriculture",
    "Texas counties",
    "Old Cora Courthouse",
    "Fleming Oak",
    "Comanche County Historical Museum",
    "Comanche wineries",
    "Bull Durham mural",
  ],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 Texas county references and county guides." },
    { href: "/county/erath", label: "Explore Erath County", description: "Continue east toward Stephenville, Dublin and the Cross Timbers." },
    { href: "/county/hamilton", label: "Explore Hamilton County", description: "Travel southeast toward Hamilton, Hico and the upper Leon watershed." },
    { href: "/county/mills", label: "Explore Mills County", description: "Head south toward Goldthwaite and Colorado River ranch country." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how settlement, travel distance and courthouse access shaped the Texas county map." },
    { href: "/destination/comanche", label: "Historic Comanche city guide", description: "Old Cora, Fleming Oak, Bull Durham mural, Frisco depot, wineries, walking plan and current access." },
    { href: "/destination/comanche-county-historical-museum", label: "Comanche County Historical Museum", description: "Explore the original Jack Wright Saloon mirror, Hardin exhibits, blacksmith area and visitor hours." },
    { href: "/fishing/lakes/proctor-lake", label: "Proctor Lake fishing and recreation", description: "Use current fishing, access and water-condition information for the county lake." },
  ],
  sources: [
    { label: "Comanche Nation — History and living self-identification", url: "https://www.comanchenation.com/about/page/history" },
    { label: "Texas State Historical Association — Comanche people and Comanchería", url: "https://www.tshaonline.org/handbook/entries/comanche-indians" },
    { label: "Texas State Historical Association — Comanche County", url: "https://www.tshaonline.org/handbook/entries/comanche-county" },
    { label: "National Park Service / Texas Historical Commission — Comanche Downtown Historic District", url: "https://atlas.thc.texas.gov/NR/pdfs/100009117/100009117.pdf" },
    { label: "Texas Historical Commission — 2025 State National Bank/City Hall adaptive reuse", url: "https://thc.texas.gov/sites/default/files/2025-10/THC_Quarterly_Public_Nov2025.pdf" },
    { label: "Texas Historical Commission — Old Cora Courthouse", url: "https://atlas.thc.texas.gov/Details/5093003711" },
    { label: "Texas Historical Commission — Old Cora FY2026 full roof replacement grant", url: "https://thc.texas.gov/news-releases/texas-preservation-trust-fund-benefits-historic-tavern-dance-hall-log-courthouse-more" },
    { label: "Comanche County commissioners — November 9, 2026 official renovation-status minutes", url: "https://www.comanchecountytx.gov/AgendaCenter/ViewFile/Minutes/_11092026-152" },
    { label: "Comanche County commissioners — November 23, 2026 meeting agenda", url: "https://www.comanchecountytx.gov/AgendaCenter/ViewFile/Agenda/_11232026-154" },
    { label: "Texas Historical Commission — Current courthouse restoration", url: "https://thc.texas.gov/preserve/grants-tax-credits-and-funding/courthouse-grant-program/current-courthouse-grant-projects" },
    { label: "Texas Historical Commission — Comanche Frisco Depot marker", url: "https://atlas.thc.texas.gov/Details/5000022414" },
    { label: "National Park Service — Frisco depot independently listed on National Register", url: "https://npgallery.nps.gov/AssetDetail/NRIS/100001872" },
    { label: "Preservation Texas — Frisco Depot preservation and 2012 reopening", url: "https://www.preservationtexas.org/mep/st-louis-san-francisco-railway-depot" },
    { label: "Texas A&M Forest Service — Fleming Oak", url: "https://tfsweb.tamu.edu/famous-trees-of-texas-254/" },
    { label: "Authentic Texas — Bull Durham mural discovery", url: "https://authentictexas.com/its-a-lot-of-bull/" },
    { label: "Comanche County Historical Museum — Collection", url: "https://www.comanchecountytxmuseum.com/collection" },
    { label: "Comanche County Historical Museum — Hours and background", url: "https://www.comanchecountytxmuseum.com/about-us" },
    { label: "Comanche museum — Free admission", url: "https://www.comanchecountytxmuseum.com/" },
    { label: "Comanche museum — Square walking audio tour", url: "https://www.comanchecountytxmuseum.com/about-1-1" },
    { label: "Comanche Chamber — Explore Comanche and Old Cora closure", url: "https://www.comanchechamber.org/explorecomanche" },
    { label: "Comanche Chamber — Frisco Depot", url: "https://www.comanchechamber.org/comanchefriscotraindepot" },
    { label: "Comanche Chamber — Annual events", url: "https://www.comanchechamber.org/comancheevents" },
    { label: "Texas Wine Lover — Brennan Comanche facility closure (Dec. 2025)", url: "https://txwinelover.com/news-flash/" },
    { label: "Burgher Ray — Former Brennan Vineyards facility listing", url: "https://burgherray.com/listings/brennan-vineyards/" },
    { label: "JW Hardin Wine Company — Official", url: "https://www.jwhardinwine.com/visit/" },
    { label: "JW Hardin Wine Co. — Tasting hours and fees", url: "https://www.jwhardinwine.com/contact-us/" },
    { label: "Tribe Vineyards — Tasting room opening target", url: "https://www.tribevineyards.com/" }
  ],
  relatedCollections: [],
  relatedDestinations: ["comanche", "comanche-county-historical-museum"],
  body: [
    p("Comanche County sits in a transition zone where wooded Cross Timbers country meets prairie, farms and the rolling ranch lands of North Central Texas. The city of Comanche anchors the county as its courthouse town, De Leon developed as a separate railroad and agricultural center, and Proctor Lake spreads across the Leon River system near the county's eastern side. Between them are pecan bottoms, sandy fields, limestone ridges and communities whose histories were shaped by cattle, cotton, peanuts, railroads and water."),
    p("The county was created in 1856 from parts of Coryell and Bosque counties and named for the Comanche people, whose homeland and hunting territory included this part of Texas before sustained Anglo-American settlement. Cora first served as county seat, but the more centrally located town of Comanche took that role in 1859. Those early choices still shape the modern county map: government remains centered in Comanche, while transportation and agriculture helped other communities build strong identities of their own."),

    h("Comanche Nation: the people behind the county name"),
    p("The name Comanche County commemorates a Native nation, not a vanished population. The Comanche Nation today calls itself Nʉmʉnʉʉ—The People—and describes a history across the southern plains that includes Texas. Its own published history explains the importance of horse breeding and trade; the Texas State Historical Association places the eighteenth- and nineteenth-century Comanchería across much of North, Central and West Texas. County founding narratives often describe only incoming settlers and county-seat elections. Read those accounts alongside the Nation’s own history rather than treating frontier markers or a single museum diorama as complete evidence of Indigenous life. This passage does not imply the county museum’s exhibits have been curated or endorsed by the Nation."),

    h("Cross Timbers and prairie meet here"),
    p("Comanche County covers roughly nine hundred forty square miles of rolling country. Its northern section belongs to the Western Cross Timbers, where post oak, other hardwoods, sandy soils and brush create a wooded landscape unlike the broad open prairie farther south and east. The southern portion grades toward the Grand Prairie, with darker soils and more open agricultural ground."),
    p("That ecological boundary matters because it encouraged a mixed economy. Timber, grazing, row crops, orchards and livestock could all succeed in different parts of the county. The changing soils are still visible from the road: wooded ridges and sandy fields can give way quickly to limestone country, broad pasture and cultivated acreage."),

    h("The Leon River system organizes the landscape"),
    p("North and South Leon river branches and their tributaries drain much of Comanche County toward the Brazos River basin. Indian Creek crosses the central part of the county, while the Sabana River and other streams feed the Leon system farther east. These waterways provided water, wildlife and travel corridors long before formal county government existed."),
    p("The river network also explains why Proctor Lake became one of the county's defining modern landmarks. Built on the Leon River system in the early 1960s, the reservoir added flood control, water supply and recreation to a landscape that had depended on smaller creeks, wells and stock tanks for generations."),

    h("Comanche people shaped this country before the county existed"),
    p("The county's name is not merely decorative. Comanche bands used the wider region as part of a mobile world centered on horses, bison hunting, trade and seasonal movement across the plains and Cross Timbers. The wooded belt offered game and cover while nearby grasslands supported large herds and long-distance travel."),
    p("As settlers entered the area during the 1850s, conflict intensified. Frontier households lived with real insecurity, and early communities often depended on informal defenses, local militia and nearby settlements for protection. That difficult period is part of the county's history and helps explain why settlement remained relatively sparse until after the Civil War and the end of the Texas frontier."),

    h("Cora was the first county seat"),
    p("When the Texas Legislature organized Comanche County in 1856, Cora became the first county seat. The small community used a simple log structure for county business. As settlement spread, however, residents wanted a more central courthouse location."),
    p("In 1858 John Duncan offered land on Indian Creek for a new townsite, and commissioners accepted the donation. The new community was laid out as Comanche, and in 1859 voters moved the county seat there. The original Cora courthouse survived later uses and relocations and eventually became an important physical reminder of the county's earliest government."),

    h("Comanche grew around the courthouse and trade"),
    p("The city of Comanche developed as a supply point for ranches and farms across a wide rural area. A post office followed in 1860, and the Comanche Chief newspaper began publication in the 1870s. As frontier conditions stabilized, merchants, mills, churches, schools and professional offices gathered around the courthouse square."),
    p("Rail access later strengthened the town's commercial role. By the late nineteenth century Comanche had become a regional farm market and transportation center rather than simply an administrative seat. U.S. highways 67 and 377 now continue that crossroads function, carrying travelers between the Fort Worth region, Brownwood, Stephenville and West Central Texas."),

    h("The courthouse tells a New Deal-era story"),
    p("Comanche County used several courthouses as its population and economy changed. The present building was constructed during the Works Progress Administration era, replacing an older courthouse and giving the square a distinctly twentieth-century civic landmark. Its pale stone, strong vertical windows and restrained modern detailing differ sharply from the ornate Romanesque courthouses seen in many neighboring counties."),
    p("For visitors, the courthouse square is still the best place to begin understanding Comanche. The current courthouse, the relocated early Cora building and downtown commercial blocks place frontier government, railroad-era trade and New Deal public works within a compact walkable area."),

    h("Downtown Comanche is a listed historic district"),
    p("The Comanche Downtown Historic District entered the National Register of Historic Places in July 2023 (reference 100009117). The roughly 17.22-acre designation covers the courthouse square and surrounding commercial blocks, bounded approximately by West College Avenue, North Pearl Street, Oak Avenue and the rear property line along North Mary Street. The National Park Service nomination documents 48 contributing buildings, including commercial buildings and civic facilities, and identifies a period of significance from about 1883 through 1974. The district is important because an intact townscape—not just an isolated courthouse—shows how Comanche expanded from a frontier county seat into a regional trading center."),
    p("For a first-time visitor, compare the Art Moderne courthouse with the older limestone, brick and cast-iron storefronts, former federal post office and city hall/fire station. The district designation does not certify that each building can be entered, and the separate Old Cora courthouse remains closed for renovation. Use the museum\'s Comanche Square audio walking tour and the original National Register nomination to interpret the streets without treating private businesses as public museum sites."),

    h("The vanished jail, 1891 courthouse columns and WPA fire station"),
    p("The 2023 federal historic-district nomination preserves details easily overlooked in an Old Cora-only walk. At the southwest courthouse corner, the landmark inventory describes four surviving columns from the county's 1891 courthouse, a repaired and partially reconstructed public well, and a large stone with leg irons from the original Comanche calaboose. These are relocated or fragmentary artifacts; the lost courthouse and early lockup are not preserved as functioning buildings. The same official nomination identifies the 1938 Comanche City Hall and Fire Station on Austin Street one block north, distinguished by fossil-stone veneer over its concrete and steel structure. It was one of several WPA-era civic projects alongside street paving and new gas infrastructure. Walk these public exteriors and interpretive markers where currently accessible; courthouse restoration may temporarily change pedestrian access."),

    h("A former bank and city hall tells the reuse story"),
    p("The Texas Historical Commission’s November 2025 tax-credit case study identifies an overlooked downtown building at 114 West Central Avenue: the circa-1910 State National Bank, later First State Bank, which operated there until 1968 and was subsequently reused as Comanche City Hall. Certified historic rehabilitation on June 13, 2025 adapted the former municipal and banking space for restaurant use; the preserved tin ceiling, vault and reused teller counters carry the older functions into a different experience. The property contributes to the 2023 Comanche Downtown Historic District and is distinct from the 1938 New Deal City Hall and Fire Station on Austin Street. These are two separate local-government chapters, not evidence that either interior is currently open for informal heritage tours or that a restaurant remains active without a new operator check."),

    h("De Leon developed its own agricultural identity"),
    p("De Leon lies in the northeastern part of the county and grew into a significant market town as railroads and agriculture expanded. Its location placed it close to the sandy Cross Timbers soils that proved especially useful for crops such as peanuts, melons and orchard products in addition to traditional cotton and grain."),
    p("The town has long maintained an identity separate from the county seat. Local businesses, schools, churches and agricultural traditions made De Leon a service center for northeastern Comanche County and nearby parts of Eastland and Erath counties. Its history illustrates how rail lines could create durable commercial centers even when political power remained elsewhere."),

    h("Railroads reshaped farms and towns"),
    p("Rail service reached Comanche County in the 1880s and changed the economics of both cattle and crops. Producers could ship livestock, cotton and grain to larger markets more efficiently, while imported manufactured goods became easier to obtain. Towns located on rail lines gained warehouses, gins, depots and new businesses."),
    p("The rail era also created winners and losers. Communities bypassed by tracks often lost population and trade to better-connected neighbors. That pattern is visible across Texas, and Comanche County offers a clear example because its modern town network reflects both courthouse geography and railroad geography."),

    h("Cotton was important, but diversification mattered more"),
    p("Cotton expanded rapidly after the Civil War as rail access improved and more land entered cultivation. Corn and other grains remained important, while livestock continued to use the county's grasslands and brush. Like other parts of Central Texas, however, the county eventually confronted soil exhaustion, insect pressure and volatile commodity prices."),
    p("Farmers diversified into peanuts, pecans, hay, feed grains, dairy production, beef cattle, hogs, sheep and goats. That mixed approach became one of the county's long-term strengths. Even when individual commodities rose or fell, agriculture remained woven into local land use and business life."),

    h("Peanuts became a regional signature"),
    p("Sandy soils in and around the Cross Timbers supported a strong peanut industry during the twentieth century. De Leon in particular became closely associated with peanut production and agricultural marketing. Processing, storage, equipment and farm services connected the crop to the broader local economy."),
    p("Peanut acreage has varied with markets, weather and agricultural change, but the crop remains part of the county's identity. It also demonstrates how local geology and soil can create cultural traditions: festivals, businesses and community reputations often grow from the crops a landscape is best suited to produce."),

    h("Pecans thrive along the waterways"),
    p("Pecan trees are common along creek and river bottoms, especially where deeper alluvial soils hold moisture. Native groves and improved orchards contributed another important agricultural product and gave the county a second crop strongly associated with Central Texas river country."),
    p("The trees also add visual character to the landscape. Large pecans mark older homesteads, drainageways and bottomlands, offering shade and habitat in a region where summer heat can be intense. They connect agricultural history with the natural geography of the Leon River basin."),

    h("Proctor Lake changed the eastern county"),
    p("Construction of Proctor Dam began in 1960, and the reservoir went into operation in 1963. The U.S. Army Corps of Engineers built the project for flood control and water conservation, while the Brazos River Authority uses conservation storage associated with regional water supply. The lake sits on the Leon River system near Proctor and is fed by the Leon and Sabana rivers along with several creeks."),
    p("At conservation level the reservoir covers more than four thousand acres, creating a major body of open water in a county otherwise defined by creeks, fields and ranch tanks. Boat ramps, fishing access, campgrounds and shoreline recreation made the lake one of the county's most important outdoor destinations."),

    h("Fishing and recreation give Proctor Lake a modern role"),
    p("Texas Parks and Wildlife identifies Proctor Lake as a public fishery with largemouth bass, white crappie and other species. The lake's moderate size and central location make it useful to anglers from Comanche, De Leon, Dublin and surrounding counties without the scale or resort development of some larger Texas reservoirs."),
    p("For travelers, the reservoir offers a landscape contrast to the courthouse towns. A county trip can move from Comanche's civic square to open ranch country and then to broad water within a relatively short drive. That range is one of the best ways to understand how much geographic variety fits inside Comanche County."),

    h("Ranching remains visible everywhere"),
    p("Cattle ranching predates large-scale farming in the county and remains one of its most durable economic and cultural traditions. Fences, stock ponds, barns, grazing fields and working pens shape the countryside even where row crops once dominated. Beef production fits the county's rolling terrain and mixed grass-brush landscape particularly well."),
    p("Horses, goats and other livestock add to that agricultural mix. Many properties combine grazing with hunting, wildlife management or smaller-scale farming, reflecting a modern rural economy that draws value from several uses rather than one commodity alone."),

    h("Small communities preserve different pieces of the story"),
    p("Gustine, Proctor, Sidney, Sipe Springs and other communities help reveal how settlement spread beyond Comanche and De Leon. Some developed around schools, post offices, churches or trade routes; others benefited from railroads or nearby agricultural districts. Population shifted over time, but community names remain embedded in local identity."),
    p("These smaller places are best understood as parts of a network rather than isolated dots. Farm-to-market roads, church cemeteries, old school sites and local gathering places show how residents organized daily life across a county where distances were once measured by horseback or wagon travel."),

    h("How to explore Comanche County"),
    p("Start in Comanche at the courthouse square, where the county's political and architectural history is easiest to see. From there, follow U.S. 67/377 northeast toward Proctor and the lake, stopping along the way to watch the terrain shift from town edge to farms, woodland and river country."),
    p("Continue toward De Leon for the county's strongest railroad-and-agriculture counterpoint to Comanche. A separate drive through southern and western roads reveals broader ranch country and the transition toward Brown and Mills counties. Together those routes connect civic history, agriculture, Cross Timbers ecology and the Leon River system."),

    h("Comanche County connects several neighboring regions"),
    p("Erath County to the east carries the Cross Timbers toward Stephenville and Dublin. Hamilton County to the southeast follows the Leon watershed through ranch and limestone country, while Mills County to the south transitions toward the Colorado River basin. Westward, the landscape opens toward Brown County and the broader West Central Texas region."),
    p("That position explains why Comanche County has always been a crossroads. Indigenous travel, cattle movement, frontier roads, rail lines, U.S. highways and modern farm-to-market routes all reused the same basic geography: water, ridges, passes and practical connections between larger regions."),


    h("The oldest courthouse is a surviving building, not just a marker"),
    p("The present courthouse square in Comanche preserves a remarkable connection to the county's first seat of government at Cora. A one-room, squared-log building used as the courthouse in 1856 measured approximately 12 feet 7 inches by 12 feet 10 inches. It served county government at Cora until the seat moved to Comanche in 1859. The building was then reused as a residence and moved several times before becoming the protected Old Cora landmark in Comanche. This is among the rare surviving early Texas log courthouses, not the present county government building."),
    p("Old Cora stands beside a very different courthouse: architect Wyatt Hedrick's WPA-built, native-limestone Art Moderne landmark, with Art Deco details and carved eagles above its entrances. The Texas Historical Commission lists a substantial restoration program for that courthouse, and the local Chamber currently labels Old Cora CLOSED FOR RENOVATION. Visitors can plan to study exterior architecture and markers when the grounds are accessible but must not be promised access to either building's interior. Sources: Texas Historical Commission's Old Cora marker and courthouse restoration program; Comanche Chamber visitor guide."),

    p("Preservation remains an active story rather than a completed tourist attraction: on December 1, 2025, the Texas Historical Commission named a full roof replacement at Old Cora Log Courthouse among projects selected for FY2026 Texas Preservation Trust Fund assistance. That selection does not verify that construction has finished or the interior has reopened. The official Comanche County Commissioners' Court minutes for November 9, 2026 list no new update for Old Cora renovations or the separate Comanche County Courthouse restoration; both projects retained Komatsu plans and Texas Historical Commission grants among their status items. Both remained on the posted November 23 agenda, which by itself records neither a decision nor a completion. The Chamber still marks the log courthouse closed for renovation, so check access before making a special trip."),

    h("Fleming Oak: a frontier tree saved by a resident"),
    p("Fleming Oak survives near the southwest side of the Comanche courthouse square. According to the Texas A&M Forest Service, Martin V. Fleming and his father spent their first night in the area under the oak after arriving in 1854. In 1911 Fleming protested the city's attempt to remove the tree during street paving, and he intervened again in 1919 when it was threatened. The preserved tree and its historical marker turn a general frontier story into one specific example of a community choosing to protect its landscape. A claim that the oak is more than 200 years old remains an estimate, not a documented ring count. Source: Texas A&M Forest Service, Famous Trees of Texas."),

    h("A rediscovered 1890s advertisement links downtown to the saloon era"),
    p("In 2019 Clint and Jami Tunnell removed stucco from a historic commercial building in Comanche and found a roughly 18-by-18-foot Blackwell's Genuine Bull Durham Tobacco mural. Contemporary reporting suggests it was painted around 1892–1893, when it faced an outdoor passage. The protected mural has been described as viewable through the glass storefront at 109 West Grand Street. That location, and the story of the Jack Wright Saloon previously associated with the block, are unusually tangible evidence of how town businesses were rebuilt and repeatedly adapted. Access is from permitted public space; building operation and viewing conditions can change. Source: Loretta Fulton's reporting for Authentic Texas."),

    h("The Hardin era also includes victims and vigilante violence"),
    p("John Wesley Hardin lived in Comanche County, and in 1874 he killed Brown County deputy Charles Webb in Comanche. The aftermath was not a glamorous gunfight: a mob seized and lynched Hardin's brother Joe and two other detained associates. The county's history also includes slavery and post-Reconstruction racial exclusion. The Texas State Historical Association records sixty-one enslaved people living in the county in 1860 and documents the violent expulsion of Black residents in 1886. An accurate frontier account has to include those people, coercion and violence alongside the experiences of ranchers, settlers and town merchants; outlaw folklore is not a substitute for social history. Source: Handbook of Texas, Comanche County."),
    p("The museum and historical-marker network provide different opportunities to interpret these events. The Comanche County Historical Museum displays John Wesley Hardin memorabilia, a Jack Wright Saloon diorama with the original saloon mirror, and a representation of a Comanche Indigenous family campsite. Visitors should treat a museum diorama as interpretation rather than a complete account of a living Indigenous culture. The historical record is richer when paired with independent scholarship and contemporary Comanche voices."),

    h("Comanche County Historical Museum preserves work, not just outlaws"),
    p("The Comanche County Historical Museum at 402 Moorman Road in Comanche documents at least fourteen exhibition rooms. Its blacksmith area includes a windmill head and tools associated with the work needed to keep farms and ranches running; other galleries cover military veterans, Indigenous history, children, regional artists and the communities across the county. The museum homepage confirms free general admission supported by donations, publishes Thursday-through-Saturday hours, 10 a.m.–4 p.m., and arranges group tours by appointment. Check for closures and special-event changes before travel. See the dedicated Comanche County Historical Museum destination guide for a gallery-by-gallery visit plan."),
    p("The restored Comanche-Frisco Train Depot, built in 1909 at 304 South Austin Street, is another bridge between county history and contemporary visitor life. The Texas Historical Commission marker distinguishes the Fort Worth and Rio Grande Railway arrival in 1890, Frisco ownership from 1901 and the 1909 Prairie School-style brick-and-limestone replacement depot. Passenger trains served the station until 1969; freight use continued afterward before the line was abandoned and the building rehabilitated for community use. Its broad eaves and hipped terra-cotta tile roof are surviving physical evidence of an era when rail transportation helped move county goods into regional markets. The depot has its own National Register designation (NRIS 100001872), separate from the 2023 Comanche Downtown Historic District. Preservation Texas documents the Friends of Historic Comanche's 2012 restoration reopening; its older overview disagrees with the newer THC marker on original construction and passenger-service dates, so the county chronology follows the THC marker and National Park Service register. These sites belong in the county guide because their collections and architecture explain regional agricultural markets, not only the city center."),

    h("Wineries carry the farming story into the present"),
    p("Comanche County has added locally rooted viticulture to its older cotton, livestock, peanut and pecan identity. Brennan Vineyards historically operated at 802 South Austin Street in Comanche, at the McCrary House homestead, but its owner announced closure of the COMANCHE facility effective December 30, 2025, with operations transitioning to the sister Texas Wine Collective in Fredericksburg in January 2026. The historic Comanche property is now marketed as a former winery; it should NOT be recommended as an active 2026 tasting stop. JW Hardin Wine Co. identifies a downtown tasting room at 107 West Grand Street and currently publishes $15 tastings, Wednesday–Thursday 4–8 p.m. and Friday–Saturday noon–8 p.m. Sunday is bottle service through Baby Cow Brewing rather than a standard tasting-room session. Confirm hours and rates directly before travel. Tribe Vineyards grows estate grapes but says its own tasting room is planned for 2027. A visitor can arrange a self-directed history-and-wine route through a verified open business, but there is no verified commercial guided wine tour here. Sources: December 2025 Brennan announcement as reproduced by Texas Wine Lover, the former facility's real-estate listing, JW Hardin's official visitor page and Tribe's official website."),

    h("Annual celebrations and the community visitors encounter now"),
    p("The Comanche Chamber promotes a June rodeo and parade, the long-running Comanche County Pow Wow usually held on the fourth September weekend, a deer hunters' chili supper ahead of hunting season, and an annual Comanche Christmas celebration. These events deserve countywide coverage because they connect agriculture, craft, commerce, performing arts and historic downtown life. The Chamber's calendar is the controlling source for each year's exact dates; do not roll a past edition forward as if it had already been announced. The Chamber also identifies Comanche City Park as the setting for the annual Pow Wow and separately describes its west-side trails, disc golf, playgrounds, ball fields and seasonal pool; pool dates and fee/access details need their own current confirmation."),
    p("Comanche remains a working county seat and small-business hub rather than an outdoor museum. De Leon has a separate agricultural and railroad identity; Gustine, Proctor, Sidney and Sipe Springs preserve their own local histories. Wineries, locally owned restaurants, shops, churches, schools and volunteer organizations are present-day threads in that county network. Descriptions such as 'tight-knit' and 'people still say yes ma'am and no sir' reflect personal community experience; a guide can describe the hospitality without presenting one resident's quote as a verified fact about everyone."),

    h("Self-guided Comanche Square audio walking tour"),
    p("The museum provides a QR-based Comanche Square Walking Tour with recorded interpretation, including Old Cora, Fleming Oak, local mercantile history and John Wesley Hardin. Use the operator’s live map and audio at https://www.comanchecountytxmuseum.com/about-1-1. It is a self-guided experience, not an advertised commercial guided wine or history tour, and outdoor QR-code availability should be checked on arrival."),
    h("Short answers for planning a Comanche County history trip"),
    p("Where is Old Cora Courthouse? It is on the Comanche courthouse square, though the Chamber currently marks it closed for renovation. What is Fleming Oak? A protected live oak tied to Martin Fleming's 1854 arrival and his 1911 and 1919 preservation efforts. Where is the rediscovered Bull Durham mural? At 109 West Grand Street in Comanche, reported visible through storefront glass. Where is the county museum? At 402 Moorman Road, with published Thursday–Saturday hours. Can visitors take a winery tour? JW Hardin Wine Co. lists a downtown tasting room, but a formal packaged tour is not verified. Brennan closed its Comanche facility at the end of 2025, and Tribe's vineyard tasting room is planned for 2027. Confirm hours and transport arrangements with the current operator."),

    h("What defines Comanche County"),
    p("Comanche County is defined by the meeting of landscapes and eras. The Cross Timbers still shape soils and vegetation; ranching still occupies broad stretches of land; courthouse history links Cora with modern Comanche; railroads remain visible in the identities of De Leon and other towns; and Proctor Lake added a twentieth-century water system to an older river landscape."),
    p("The county rewards a slow drive because its history is not concentrated in one attraction. It appears in courthouse stone, pecan bottoms, sandy peanut fields, old rail corridors, stock ponds, small towns and the open water of Proctor Lake. Together they explain how a North Central Texas county built a durable identity from land, water, agriculture and movement."),
  ],
};
