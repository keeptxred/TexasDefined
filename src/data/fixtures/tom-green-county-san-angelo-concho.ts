import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const tomGreenCountySanAngeloConchoArticle: Article = {
  id: "county-tom-green-san-angelo-concho",
  brandId: "texasdefined",
  slug: "tom-green-county-san-angelo-concho-texas",
  title: "Tom Green County: San Angelo, the Concho and a Frontier City at the Crossroads",
  dek: "Tom Green County is where three forks of the Concho meet, Fort Concho anchored a frontier town, sheep and cattle built fortunes, and modern San Angelo became a military, education and ranching center between the Hill Country and West Texas.",
  category: "texas-history",
  region: "west-texas",
  hero: {
    src: "/images/state-parks/san-angelo-state-park.jpg",
    alt: "San Angelo State Park landscape beside O.C. Fisher Reservoir in Tom Green County, Texas",
    width: 1600,
    height: 900,
    credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-10",
  readingMinutes: 10,
  tags: ["Tom Green County", "San Angelo", "Concho River", "Fort Concho", "San Angelo State Park", "O.C. Fisher Reservoir", "Goodfellow Air Force Base", "Angelo State University", "West Texas", "Texas counties", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/destination/san-angelo-state-park", label: "Explore San Angelo State Park", description: "See the park, trails, bison, longhorns and O.C. Fisher Reservoir on San Angelo's western edge." },
    { href: "/article/randall-county-canyon-palo-duro-texas", label: "Continue north to Randall County", description: "Explore Canyon, Palo Duro and the High Plains farther north in West Texas." },
    { href: "/article/ector-county-odessa-oil-stonehenge-texas", label: "Head west to Ector County", description: "Follow West Texas toward Odessa and the Permian Basin." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Tom Green County sits in one of those parts of Texas where regional labels begin to blur. The Hill Country lies to the southeast, the Edwards Plateau rises nearby, the Permian Basin is farther west, and the plains stretch north. San Angelo grew at the meeting point, beside the forks of the Concho River, and became the kind of city that serves an enormous rural hinterland: courthouse town, military town, ranching center, college town and trading point all at once."),
    p("The county covers about 1,540 square miles in west-central Texas. The Concho system is its defining natural feature. The North, Middle and South Concho rivers drain different parts of the county and join around San Angelo before flowing east. The 2020 census counted 120,003 residents in Tom Green County, and the Census Bureau estimated 120,602 in 2025. Most live in and around San Angelo, while communities such as Grape Creek, Carlsbad, Christoval and Wall keep the county tied to farms, ranches and smaller-town West Texas."),

    h("The county began much larger than the county on today's map"),
    p("Texas created Tom Green County in 1874 and named it for Thomas Green, a soldier and political figure who had served in the Texas Revolution, the Republic of Texas Congress and later the Confederate military. The original county was immense, extending across a huge section of western Texas before later counties were carved from it. Modern Tom Green County is only a fraction of that early jurisdiction."),
    p("The county seat was first at Ben Ficklin, a settlement south of present-day San Angelo. Flooding on the South Concho River destroyed much of Ben Ficklin in 1882, and voters moved the county seat to San Angelo the following year. That decision fixed the political center beside the military post and commercial settlement that had already become the region's strongest town."),

    h("The Concho River gave the country its name and its first durable geography"),
    p("Water explains why people gathered here long before courthouses and railroads. Archaeological evidence across the region shows thousands of years of Indigenous presence. The Concho River and its tributaries offered water, game and travel routes through an otherwise dry landscape. Jumano people were among the groups associated with the river system, and Spanish travelers later followed the same waterways."),
    p("The name Concho comes from the Spanish word for shell. Freshwater mussels in the river produced iridescent pearls that drew attention from Spanish explorers and later settlers. The famous 'Concho pearls' became part of San Angelo's identity, and the shell imagery still appears in local names and civic references."),
    p("Even today the river is more than scenery. San Angelo's downtown river corridor, reservoirs and park system all reflect the same basic fact that shaped earlier settlement: dependable water determines where communities can grow in this part of Texas."),

    h("Fort Concho created the anchor for modern San Angelo"),
    p("The U.S. Army established Fort Concho in 1867 along the Concho River. Its mission was to protect frontier settlements and travelers, patrol routes across West Texas and support military operations in a region the federal government was trying to control. The post eventually included at least forty buildings spread across more than 1,600 acres, many constructed from local limestone."),
    p("Fort Concho became an important station for several frontier units. The 4th and 10th Cavalry served there, and elements of all four Black Army regiments later known as Buffalo Soldiers were stationed at the post during its active years. Commanders associated with Fort Concho included Ranald Mackenzie and Benjamin Grierson. At full strength the fort supported roughly 400 to 500 soldiers and the civilians whose work kept the post operating."),
    p("A civilian settlement grew nearby because forts create demand. Merchants, freight operators, saloons, hotels, ranchers and families clustered around the post. The town was first called Santa Angela and later San Angelo. When the Army abandoned Fort Concho in 1889, the settlement no longer depended on the fort for survival. It had become the commercial center of the Concho country."),

    h("Ranching made the county richer than its dry landscape first suggests"),
    p("Cattle were important from the beginning, but sheep and wool became equally important to the local economy. The broad grasslands, dry climate and access to regional markets made the Concho country especially suited to ranching. San Angelo developed into a major livestock, wool and mohair center, serving ranches spread across a wide radius."),
    p("That regional role explains why San Angelo has long felt larger than its county population alone would suggest. Ranchers from neighboring counties came to buy equipment, bank, sell livestock, see doctors, attend school and conduct business. Auction barns, feed stores, warehouses and financial institutions all grew from the city's function as a service center for the surrounding countryside."),
    p("Agriculture remains part of Tom Green County's identity even as the economy has diversified. Cattle, sheep, goats, cotton and other crops still connect the city to the land beyond its subdivisions. The annual rhythm of livestock shows, ranch work and agricultural education keeps the older economy visible inside a modern regional city."),

    h("Railroads turned a frontier market into a regional city"),
    p("Rail connections strengthened San Angelo's position in the late nineteenth and early twentieth centuries. Freight could move more efficiently, livestock and wool could reach distant markets, and manufactured goods could come west in greater volume. The town's commercial streets, warehouses and hotels grew around that exchange."),
    p("San Angelo's downtown still reflects the era when a regional center needed banks, theaters, stores, hotels and public buildings close together. Later highways spread commerce outward, but the city's original role remains recognizable: it is a place where a large part of west-central Texas comes to do business."),

    h("Goodfellow gave the county a second military identity"),
    p("Fort Concho's military era ended in 1889, but Tom Green County returned to a major defense role during the buildup to World War II. The federal government established what became Goodfellow Field in 1940 after San Angelo civic leaders offered land and infrastructure for a training base. The first students arrived in early 1941."),
    p("Goodfellow initially trained pilots. During World War II thousands of aviators passed through the installation. Its mission later shifted away from flying and toward intelligence, surveillance, reconnaissance and technical training. Today Goodfellow Air Force Base is home to the 17th Training Wing and trains personnel from across the Department of Defense, including intelligence professionals and military firefighters."),
    p("That continuing mission gives San Angelo a military presence very different from Fort Concho's cavalry era but rooted in the same strategic geography. The county has twice built a durable relationship with military training, first on the nineteenth-century frontier and then in the modern national-security system."),

    h("San Angelo built its own college when the state chose another city"),
    p("Education became another pillar of the county in the 1920s. San Angelo tried unsuccessfully to win the new Texas Technological College, which ultimately went to Lubbock. Rather than abandon the idea of higher education, local residents funded their own institution. San Angelo Junior College opened in 1928 with 112 students, supported by local contributions and a county tax."),
    p("The school became San Angelo College, then Angelo State College in 1965 and Angelo State University in 1969. Its growth changed the city's demographic and cultural life, adding students, faculty, athletics, research and professional education to an economy once dominated by ranching, trade and the military."),
    p("Angelo State's history is unusually local in origin. The institution exists because residents decided a West Texas regional center needed a college and were willing to finance one themselves. That civic decision still shapes Tom Green County nearly a century later."),

    h("Reservoirs changed the relationship between the county and its rivers"),
    p("Flood control and water storage reshaped the Concho system in the twentieth century. The U.S. Army Corps of Engineers completed O.C. Fisher Reservoir on the North Concho River in 1952. Twin Buttes Reservoir later added storage on the Middle and South Concho system southwest of San Angelo."),
    p("The reservoirs are practical infrastructure in a dry county, but they also changed recreation and habitat. San Angelo State Park now surrounds much of O.C. Fisher Reservoir. The 7,677-acre park opened in 1995 and offers roughly fifty miles of multiuse trails, camping, fishing and wildlife viewing."),
    p("The park is especially appropriate as a visual symbol for Tom Green County because it brings several layers of the county together in one place: the Concho watershed, open West Texas grassland, ranching heritage, reservoir engineering and public recreation. The park also maintains bison and members of the Official Texas State Longhorn Herd."),

    h("The state park contains a much older story underfoot"),
    p("San Angelo State Park's landscape reaches far deeper into time than the city beside it. A two-mile Dinosaur Trail passes fossilized trackways left by Permian-age animals that lived before the dinosaurs. The tracks are a reminder that the county's exposed rocks preserve a world hundreds of millions of years older than the frontier history most visitors associate with San Angelo."),
    p("The park also sits near the meeting point of several ecological regions. Texas Parks and Wildlife describes influences from the High Plains, Hill Country, Rolling Plains and Trans-Pecos. That overlap helps explain the variety of plants and wildlife found around the reservoir and river corridor."),

    h("Fort Concho survives because San Angelo chose to keep it"),
    p("Many frontier posts disappeared after the Army left. Fort Concho did not. The City of San Angelo owns and operates the National Historic Landmark site, where original and reconstructed buildings preserve the physical scale of the post. Barracks, officers' quarters and other limestone structures give visitors something rare in Texas: a military frontier landscape that can still be walked rather than merely imagined."),
    p("The fort's interpretation also keeps the Buffalo Soldier story central. The Black cavalry and infantry units that served in West Texas were not side notes to the frontier Army; they were a substantial part of it. Fort Concho's surviving records and buildings make Tom Green County one of the state's most important places for understanding that history."),

    h("Modern Tom Green County is a regional service center"),
    p("Today's county economy is broader than ranching and defense. Health care, education, retail, construction, government, tourism and professional services all play major roles. San Angelo serves patients, students, shoppers and businesses from counties that may be an hour or more away. That regional reach is one reason the city supports institutions and services normally associated with larger metropolitan areas."),
    p("The county's population has grown more slowly in recent years than some booming Texas metros, but it remains remarkably stable for a West Texas regional center. The Census Bureau counted 120,003 residents in 2020 and estimated 120,602 in 2025. That steadiness reflects an economy with several anchors rather than a single commodity cycle."),

    h("A few Tom Green County facts worth remembering"),
    list(
      "Tom Green County was created in 1874 and named for Thomas Green, a Texas Revolution veteran and public official.",
      "The county originally covered a much larger area of West Texas before later counties were organized from its territory.",
      "San Angelo became the county seat in 1883 after flooding devastated the earlier seat at Ben Ficklin.",
      "Fort Concho was established in 1867 and served as an important frontier post until 1889.",
      "Elements of all four Buffalo Soldier regiments served at Fort Concho during the post's active years.",
      "San Angelo Junior College opened in 1928 and evolved into Angelo State University.",
      "Goodfellow was established in 1940 and today trains military intelligence, surveillance, reconnaissance and fire-protection professionals.",
      "O.C. Fisher Reservoir was completed in 1952 for flood control on the North Concho River.",
      "San Angelo State Park opened in 1995 and protects 7,677 acres around much of the reservoir.",
      "The 2020 census counted 120,003 residents in Tom Green County; the Census Bureau estimated 120,602 in 2025.",
    ),

    h("Why Tom Green County belongs in the county series"),
    p("Tom Green County explains how a West Texas regional center is built. Water comes first: three forks of the Concho provide the geography. Then comes Fort Concho, which creates a market and settlement. Ranching, wool and livestock give the town an economy. Railroads enlarge the trade radius. A locally funded college adds education. Goodfellow restores a military mission in a new form. Reservoirs turn flood control into public landscape, and San Angelo State Park preserves both natural and cultural history on the city's edge."),
    p("The county also resists easy regional labels. It is not quite the Permian Basin, not quite the Hill Country, not quite the High Plains and not quite the Trans-Pecos. Its strength comes from sitting between them. San Angelo became the place where those landscapes and economies meet."),
    p("Follow the Concho through the county and the story becomes visible: ancient trackways, Indigenous travel routes, freshwater mussels and pearls, limestone barracks, livestock country, college lawns, military classrooms and a modern riverfront city. Tom Green County is a crossroads not because two highways happen to intersect there, but because West Texas has been converging on the Concho for centuries."),
  ],
};
