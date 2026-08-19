import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const smithCountyTylerRosesRailroadsPineyWoodsArticle: Article = {
  id: "county-smith-tyler-roses-railroads-piney-woods",
  brandId: "texasdefined",
  slug: "smith-county-tyler-roses-railroads-piney-woods-texas",
  title: "Smith County: Tyler, Roses, Railroads and the Piney Woods",
  dek: "Smith County is one of East Texas's most influential crossroads, centered on Tyler and shaped by forests, farms, railroads, roses, oil-era growth and a modern regional economy.",
  category: "texas-history",
  region: "east-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Smith_County%2C_TX%2C_Courthouse_IMG_0533.JPG?width=1600",
    alt: "Smith County Courthouse in Tyler, Texas",
    width: 4320,
    height: 3240,
    credit: "Billy Hathorn · Wikimedia Commons · CC BY-SA 3.0",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-19",
  readingMinutes: 15,
  tags: [
    "Smith County",
    "Tyler Texas",
    "East Texas",
    "Piney Woods",
    "Texas roses",
    "Texas railroads",
    "Tyler State Park",
    "East Texas oil",
    "Smith County history",
    "Texas counties",
  ],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 Texas county references and county guides." },
    { href: "/county/cherokee", label: "Explore Cherokee County", description: "Continue south toward Jacksonville, Rusk, Caddo Mounds and the Neches River country." },
    { href: "/county/rusk", label: "Explore Rusk County", description: "Head southeast toward Henderson and the East Texas Oil Field." },
    { href: "/county/henderson", label: "Explore Henderson County", description: "Travel west toward Athens, lake country and the transition from Piney Woods to prairie." },
    { href: "/county/wood", label: "Explore Wood County", description: "Continue north toward Mineola, Quitman and the forest-and-lake country of Northeast Texas." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how settlement, travel distance and courthouse access shaped the Texas county map." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Smith County sits near the center of East Texas, where pine and hardwood forests, rolling farmland, railroad corridors and fast-growing communities converge around Tyler. The county is close enough to Dallas-Fort Worth to feel the pull of a major metro economy, yet its landscape and cultural identity remain unmistakably East Texas. Tyler serves as the county seat and regional center, while Lindale, Whitehouse, Troup, Arp, Winona, Bullard and smaller communities give the county a wide range of local identities."),
    p("The story of Smith County is not one simple progression from farm country to suburbia. Caddo peoples lived in the wider region long before statehood. Anglo-American settlement accelerated in the 1840s. Cotton, corn and timber shaped the nineteenth century. Railroads turned Tyler into a transportation center. Fruit and nursery agriculture helped create a nationally known rose industry. The East Texas oil boom changed markets and wealth across the region, while hospitals, education, manufacturing, retail and population growth made Tyler one of the principal urban centers of the Piney Woods."),

    h("A county at the edge of several East Texas landscapes"),
    p("Smith County lies in the upper part of the East Texas timberlands, where sandy and loamy soils support pine, oak and other hardwoods. The terrain is gently rolling rather than flat, and the county is crossed by numerous creeks that ultimately drain toward the Sabine and Neches river systems. This combination of forest, pasture, farmland and water helped shape settlement and land use from the earliest recorded periods."),
    p("The county's geography also explains its modern role as a crossroads. U.S. Highway 69 runs north-south through Tyler, while Interstate 20 cuts across the northern part of the county near Lindale. Other state and U.S. highways connect Tyler with Dallas, Longview, Jacksonville, Athens and the wider East Texas region. The same central position that once favored wagon routes and railroads now supports commuting, logistics, healthcare and regional retail."),

    h("Caddo history came long before Smith County"),
    p("Before the county existed, the wider East Texas region was part of a Caddo cultural landscape defined by farming communities, trade networks and long relationships with the forests and waterways. European and American movement into the region altered those patterns over generations, particularly as disease, conflict, treaties and forced removal disrupted Indigenous communities."),
    p("Understanding that older history matters because the county's nineteenth-century settlement did not begin on an empty landscape. Roads, river crossings, hunting areas and routes between settlements existed within a region that had been occupied and managed for centuries before Texas became a state."),

    h("Smith County was created in 1846"),
    p("The first Texas Legislature created Smith County in 1846 from part of the old Nacogdoches District. The county was named for General James Smith, an early Texas settler and military figure associated with the Texas Revolution and Republic era. Commissioners selected a hilltop near the geographic center of the county for a new county seat."),
    p("That town was named Tyler in honor of President John Tyler, whose administration supported the annexation of Texas to the United States. The decision fixed the county's civic center early. Tyler has remained the county seat ever since, and the courthouse square became the organizing point for roads, commerce, law and public life."),

    h("Tyler grew around a courthouse square"),
    p("The original Tyler townsite was laid out around a central public square, a pattern found in many Texas county seats. Early courthouses were modest, but the square quickly became a gathering place for court sessions, elections, stores, churches and travelers. Streets radiated from the center into a growing community of homes, workshops and businesses."),
    p("As the county population increased, Tyler became more than an administrative center. It served farmers bringing crops to market, merchants importing manufactured goods and professionals providing legal, medical and financial services. The city's central location gave it an advantage over smaller settlements scattered across the county."),

    h("Farms and enslaved labor shaped the antebellum economy"),
    p("Most early settlers came from other southern states and built an agricultural economy centered on corn, livestock and cotton. Cotton became the principal cash crop, while corn remained essential for food and animal feed. Enslaved African Americans were a major part of the labor system before the Civil War, particularly on larger farms and plantations."),
    p("After emancipation, Black residents built independent churches, schools, businesses and communities while facing the economic and political constraints of Reconstruction and later segregation. Tenant farming and sharecropping became common across East Texas. Those systems tied many families to cotton even when prices were poor and opportunities were limited."),

    h("The Civil War disrupted trade and transformed labor"),
    p("Smith County supported the Confederacy, and local men served in military units during the Civil War. The conflict disrupted markets and transportation, while the end of slavery forced a fundamental reorganization of agriculture. Recovery after the war was slow, especially for rural families dependent on cotton."),
    p("The most important long-term change came from transportation. Better roads and, eventually, railroads connected Smith County more directly to regional and national markets. That shift reduced the isolation of rural producers and laid the groundwork for Tyler's emergence as a larger East Texas commercial center."),

    h("Railroads changed Tyler's future"),
    p("Rail service reached Smith County in the late nineteenth century and helped transform Tyler's economy. Lines connecting the city with other East Texas communities made it easier to ship cotton, timber, fruit and manufactured goods while bringing in new residents, supplies and investment."),
    p("Railroads also altered the map within the county. Communities located near depots and junctions gained stores, warehouses and population, while places bypassed by the tracks often grew more slowly. The railroad era connected Tyler more tightly to Dallas, Longview, Shreveport and Gulf Coast markets and helped establish its long-term role as a regional hub."),

    h("Fruit growing helped Smith County diversify"),
    p("By the late nineteenth and early twentieth centuries, Smith County farmers were looking for alternatives to a cotton economy vulnerable to insects, soil exhaustion and price swings. East Texas soils and climate supported peaches, berries, vegetables and nursery plants, creating new agricultural specialties."),
    p("That diversification became especially important when the boll weevil damaged cotton production across the South. Growers who shifted toward fruit, vegetables and horticulture helped change the county's agricultural identity and opened the door to the industry for which Tyler would become nationally famous."),

    h("Tyler became the Rose Capital of America"),
    p("Commercial rose growing expanded in Smith County during the early twentieth century as nurseries discovered that local soils and climate were well suited to producing rose bushes and rootstock. By the mid-twentieth century, Tyler and surrounding communities had become one of the country's most important centers for the commercial rose industry."),
    p("The city's rose identity became cultural as well as economic. The Texas Rose Festival, rose gardens and nursery businesses turned horticulture into a civic brand recognized far beyond East Texas. Even as the industry changed and production became more geographically dispersed, roses remained one of the clearest symbols associated with Tyler."),

    h("The East Texas oil boom reshaped the regional economy"),
    p("The discovery of the giant East Texas Oil Field in 1930 was centered farther east and southeast, but Smith County felt the effects almost immediately. Tyler became an important business, legal, banking, supply and residential center for the expanding petroleum economy. Money and population moved through the city even when the wells themselves were outside the county's central urban area."),
    p("Oil helped accelerate construction, retail growth and professional services during the Great Depression. It also deepened Tyler's ties to nearby Rusk, Gregg and Cherokee counties, where drilling and production were more concentrated. The result was a regional economy in which county lines mattered less than pipelines, highways, railroads and business relationships."),

    h("Tyler became a major medical center"),
    p("Over the twentieth century, Tyler developed one of the largest concentrations of healthcare services in East Texas. Hospitals, clinics, specialists and related businesses increasingly drew patients from counties across the region. That medical role gave the city an economic base that was less dependent on agriculture or energy cycles."),
    p("Today healthcare is one of the reasons Tyler functions as a regional capital for a much larger area than Smith County alone. Residents from smaller East Texas communities routinely travel to Tyler for medical care, shopping, education, government services and employment."),

    h("Education added another regional anchor"),
    p("Tyler's educational institutions also expanded its influence. Tyler Junior College, founded in the 1920s, became a major community college serving East Texas students. The University of Texas at Tyler later added a four-year and graduate-level institution to the city's educational base."),
    p("These campuses contribute jobs, cultural programs, athletics and a steady flow of students. They also help train nurses, teachers, engineers, business professionals and other workers who often remain in East Texas after graduation, reinforcing Tyler's role as a regional service center."),

    h("The county courthouse reflects a changing civic center"),
    p("Smith County has used several courthouses over its history. The courthouse standing for much of the postwar era was completed in the 1950s in downtown Tyler, replacing earlier buildings that reflected different architectural periods and civic ambitions."),
    p("The courthouse square remains important even as county government evolves. Downtown Tyler's public buildings, historic streets and nearby businesses preserve the relationship between county government and the city's original town plan. The square is a useful place to begin understanding how Tyler grew from a small 1846 county seat into a regional city."),

    h("Lindale grew along transportation corridors"),
    p("Lindale in northern Smith County developed as a railroad and agricultural community, later benefiting from its location near U.S. 69 and Interstate 20. Its position between Tyler and the Dallas-Fort Worth area has made it one of the county's fastest-changing communities."),
    p("Growth around Lindale illustrates a broader transformation in Smith County. Areas that were once rural farm and timber land increasingly support subdivisions, schools, retail centers and commuter traffic. Yet the northern county still retains a strong East Texas landscape of woods, pasture and small communities."),

    h("Whitehouse, Bullard and the southern county keep growing"),
    p("Whitehouse and Bullard have also expanded as the Tyler metropolitan area pushes outward. Both communities combine older small-town centers with newer residential development, schools and businesses tied to the larger Tyler economy."),
    p("The southern county transitions toward Cherokee County and the Neches River side of East Texas. Roads leading toward Jacksonville and Rusk pass through a landscape of rolling woods, farms, reservoirs and rapidly changing suburban edges."),

    h("Troup and Arp preserve railroad-town history"),
    p("Troup and Arp in southeastern Smith County grew from the transportation and agricultural networks that connected East Texas before highways became dominant. Their histories are tied to railroads, farming, timber and the broader movement of goods between Tyler, Henderson, Jacksonville and Longview."),
    p("These communities remain smaller than Tyler, but they help preserve the county's multi-centered history. Smith County is not simply Tyler surrounded by suburbs; it is a collection of towns and rural areas that developed around different routes, industries and local institutions."),

    h("Tyler State Park offers a public view of the Piney Woods"),
    p("North of Tyler, Tyler State Park provides one of the county's most accessible public landscapes. Developed during the New Deal era, the park surrounds a spring-fed lake and preserves a wooded environment of pine and hardwood forest, trails, campsites and historic Civilian Conservation Corps work."),
    p("The park is especially useful for visitors because so much East Texas land is privately owned. It offers a place to experience the forest, water and rolling terrain that shaped Smith County long before metropolitan growth became a dominant force."),

    h("Forestry, ranching and agriculture still matter"),
    p("Although Smith County is increasingly urban and suburban, its rural economy has not disappeared. Timber, cattle, hay, nursery crops and specialty agriculture remain part of the working landscape. Managed pine stands, pastures and farm roads are still visible only a short drive from Tyler."),
    p("This rural-urban overlap is one of the county's defining characteristics. A visitor can move from a major hospital district or shopping corridor into forest and pasture within minutes. That proximity shapes development debates, transportation planning, water use and the county's sense of place."),

    h("Modern Smith County is still growing"),
    p("Smith County's population has continued to rise as Tyler expands and communities near major highways attract new residents. The U.S. Census Bureau estimated 252,549 residents as of July 1, 2025, an increase of more than eight percent from the 2020 estimates base."),
    p("Growth brings new housing, schools, roads and businesses, but it also puts pressure on infrastructure and open land. The challenge for Smith County is similar to that facing many fast-growing Texas counties: accommodating new residents while retaining the history, landscape and community identities that made the area distinctive in the first place."),

    h("How to explore Smith County"),
    p("Start in downtown Tyler at the courthouse square and historic core, then explore the city's rose-related landmarks and older neighborhoods. From there, head north toward Tyler State Park and Lindale for a mix of Piney Woods scenery, recreation and newer growth."),
    p("A drive south toward Whitehouse and Bullard shows the expanding residential edge of the Tyler area, while routes southeast toward Troup and Arp reveal older railroad and agricultural communities. Travelers interested in regional history can continue into Cherokee County toward Jacksonville and Rusk or into Rusk County toward Henderson and the East Texas Oil Field."),

    h("Smith County is a regional crossroads"),
    p("Smith County's importance comes from the way many East Texas stories meet here. It has deep agricultural roots but is no longer primarily agricultural. It has strong railroad history, yet highways now dominate transportation. Roses remain part of Tyler's identity even as healthcare, education and services drive much of the modern economy. Forests and pastures survive beside some of the fastest-growing communities in the region."),
    p("That combination makes Smith County more than a stop between Dallas and the Piney Woods. It is one of East Texas's principal centers of population, commerce and culture, and its history shows how a courthouse town founded in 1846 grew into a regional city without completely losing the landscape and traditions around it."),
  ],
};
