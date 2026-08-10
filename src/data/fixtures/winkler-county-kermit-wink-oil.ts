import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const winklerCountyKermitWinkOilArticle: Article = {
  id: "county-winkler-kermit-wink-oil",
  brandId: "texasdefined",
  slug: "winkler-county-kermit-wink-oil-texas",
  title: "Winkler County: Kermit, Wink and the Oil Boom at the New Mexico Line",
  dek: "Winkler County is where shifting sand, a once-dismissed oil field, a courthouse built for a boom and Roy Orbison's teenage years all meet on the western edge of the Permian Basin.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/County_courthouse_for_Winkler_County,_near_the_New_Mexico_line_in_far-west_Texas_LCCN2014630676.jpg?width=1600",
    alt: "Winkler County Courthouse in Kermit, Texas, photographed in 2014",
    width: 1600,
    height: 1068,
    credit: "Carol M. Highsmith · Library of Congress · Public domain · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-10",
  readingMinutes: 9,
  tags: ["Winkler County", "Kermit", "Wink", "Hendrick Field", "Roy Orbison", "Permian Basin", "Sand Hills", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/ward-county-monahans-sandhills-texas", label: "Explore neighboring Ward County", description: "Follow the sandhills south toward Monahans and the oil roads of Ward County." },
    { href: "/article/reeves-county-pecos-balmorhea-texas", label: "Continue west through Reeves County", description: "Explore Pecos, Balmorhea and the springs-and-railroad story farther south." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Winkler County sits against the New Mexico line in a part of West Texas where distance can make the map look empty. It is not. Kermit is a county seat built around ranching, highways and oilfield service. Wink is a smaller town whose name became attached to one of rock and roll's most distinctive voices. North and east of the towns, sandhills interrupt the flat country. Beneath the same ground, petroleum discoveries turned a sparsely settled county into part of the modern Permian Basin."),
    p("The U.S. Census Bureau counts about 841 square miles of land in Winkler County. The 2020 census recorded 7,791 residents, most of them concentrated in Kermit and Wink. The county borders New Mexico as well as Loving, Ward, Ector and Andrews counties, putting it at a crossroads between the Texas oil patch and southeastern New Mexico's energy corridor."),

    h("The county existed on paper long before it functioned as a county"),
    p("Texas created Winkler County on February 26, 1887, from territory that had once belonged to the enormous Tom Green County. The name honors Clinton McKamy Winkler, a Texas lawyer, legislator, judge and Confederate officer. But creating a county on a map did not mean there were enough people to organize a government."),
    p("Winkler County remained thinly populated ranch country for decades. A post office opened near the future Kermit area in 1908, and promoters attempted to create a town called Duval in 1910. The Texas Historical Commission records that the Duval promotion offered free lots, a picnic and a cowboy tournament to attract settlers. The settlement never became the county center its backers imagined."),
    p("On April 5, 1910, Winkler County finally organized, and Kermit became the county seat. The name came from Kermit Roosevelt, son of President Theodore Roosevelt, who had visited a local ranch. That curious presidential connection gave the county seat one of the more memorable names on the Texas map."),

    h("Before oil, water and sand shaped travel"),
    p("The sandhills that cross Winkler County are part of a much larger belt extending through several Texas counties and into New Mexico. A Texas Historical Commission marker describes a strip roughly 100 miles long, with dunes in places more than 70 feet high. The surface looks dry, but historically shallow water beneath parts of the sand supported vegetation and made the area useful to people crossing the plains."),
    p("Willow Springs, southeast of Kermit, was one such water source. Historical records note its use by Comanche people and later travelers moving west during the nineteenth century. Blue Mountain, actually the southern escarpment of the Llano Estacado rather than a conventional isolated mountain, rises to about 3,400 feet and served as a lookout and landmark."),
    p("Those places matter because they show the county before the pumpjacks. The earliest geography of Winkler County was organized around water, shelter and routes through difficult sand. Petroleum would later impose an entirely different network of roads, leases, tanks and service towns on the same landscape."),

    h("A 1926 well ended the idea that this was a wildcatters' graveyard"),
    p("The decisive change came near Wink on September 3, 1926. The Texas Historical Commission identifies the discovery well in the Hendrick Field as the first of 612 wells in a roughly 10,000-acre oil pool. The area had been dismissed by some drillers as a 'wildcatters' graveyard,' but Roy A. Westbrook and associates leased land on the T. G. Hendrick ranch and kept drilling."),
    p("Around midnight, the well came in dramatically, blasting oil and rock from the hole. It was eventually completed at 3,049 feet and produced about 235,000 barrels before being plugged in 1939. Just as important, information gathered from the field helped drillers understand the oil-bearing El Capitan reef limestone that became significant elsewhere in the Permian Basin."),
    p("The discovery changed the scale of everything. Workers arrived. Roads and camps expanded. Businesses followed. Land that had been sold cheaply or promoted unsuccessfully only years earlier suddenly carried mineral value. Wink became an oil-boom town, and Kermit grew as the governmental and commercial center."),

    h("The courthouse is a physical record of the boom"),
    p("Kermit's present Winkler County Courthouse was built in 1929-30 because the original 1910 building was no longer adequate after oil transformed the county. Architect David Castle designed the four-story Classical Revival and Beaux-Arts building with tall columns, formal entrances and a scale that would have seemed extravagant in the pre-oil county."),
    p("The building is now a Recorded Texas Historic Landmark. Its timing explains why it is such a useful county symbol: the courthouse was not simply a civic replacement. It was built at the precise moment when mineral wealth and population growth forced Winkler County to imagine a larger future."),
    p("That is also why the courthouse makes an unusually honest portrait of the county. It is architecture produced directly by the first oil boom, standing in the city that became the permanent administrative center while smaller settlements rose, declined or changed purpose around it."),

    h("Kermit became the service center"),
    p("Kermit incorporated in 1938 and developed into a practical oilfield city: courthouse, schools, stores, equipment yards, churches and neighborhoods surrounded by highways leading toward Odessa, Andrews, Jal and the New Mexico state line. The city's role has always been less about monumental tourism than about keeping a working region connected."),
    p("State Highway 302 runs east-west through the county, while State Highway 18 ties Kermit south toward Monahans and north toward the state line. Those routes connect local residents to the wider Permian Basin and help explain why transportation and warehousing remain important parts of the county economy alongside extraction and oilfield services."),
    p("The modern numbers still show that relationship. Census Bureau data lists a 2020 population of 7,791 and a 2025 estimate of 7,540. Like many energy counties, Winkler can gain and lose residents as drilling cycles, employment and housing demand change."),

    h("Wink is where oil history and music history overlap"),
    p("Wink grew out of the same petroleum boom, but its cultural claim reaches far beyond the oilfield. Roy Orbison was born in Vernon in 1936, and his family settled in Wink by 1946. He attended school there and formed his first band as a teenager, initially known as the Wink Westerners and later the Teen Kings."),
    p("The Texas Historical Commission's Roy Orbison marker in Wink traces the path from those high-school performances to the recording of 'Ooby Dooby,' a song that led to a Sun Records contract in 1956. Orbison eventually became internationally known for a voice and songwriting style that sounded unlike almost anyone else in early rock and roll."),
    p("Wink preserves that connection through local displays and the Roy Orbison Museum. The story gives Winkler County a cultural identity that does not come from petroleum. A tiny West Texas oil town became part of the origin story of a musician whose work traveled around the world."),

    h("Pioneer Park gathers pieces of the old county in one place"),
    p("Kermit's Pioneer Park preserves several useful fragments of Winkler County's early history. Kermit's oldest surviving home was built by the county clerk in 1910, the same year the county organized. Nearby, a historic wooden cable-tool drilling rig recalls an earlier generation of oilfield technology."),
    p("The rig itself worked in neighboring Loving County before being moved to Kermit as a historical exhibit. That detail fits the way the Permian Basin actually works: county lines matter politically, but the oil economy crosses them constantly. Crews, equipment, pipelines, roads and companies operate across a regional field rather than inside neat courthouse boundaries."),

    h("The New Mexico line is part of the county's identity"),
    p("North of Kermit, the county reaches the New Mexico border. A historical marker near the line points toward the corner created by the Compromise of 1850, when Texas relinquished claims to a vast area that became part of New Mexico and other western territories. The modern boundary may look like an ordinary straight line on a highway map, but it reflects one of the major political settlements that fixed Texas in its present shape."),
    p("Today the border is less a barrier than an economic seam. The same Permian Basin geology continues west into New Mexico. Kermit and nearby communities therefore sit inside a two-state energy region where workers and equipment routinely move across the line."),

    h("A few Winkler County facts worth remembering"),
    list(
      "Winkler County was created in 1887 and formally organized on April 5, 1910.",
      "Kermit became the county seat in 1910 and was named for Kermit Roosevelt, son of President Theodore Roosevelt.",
      "The Hendrick Field discovery well came in near Wink on September 3, 1926 and opened a major oil boom.",
      "The present Winkler County Courthouse was built in 1929-30 after oil-driven growth made the original courthouse inadequate.",
      "Blue Mountain is the county's highest point at about 3,400 feet and forms part of the Llano Estacado escarpment.",
      "The regional sandhills extend through Winkler County and across several counties into New Mexico.",
      "Roy Orbison's family settled in Wink in 1946, and he formed his first band there while still in school.",
      "The 2020 census counted 7,791 residents in Winkler County across about 841 square miles of land.",
    ),

    h("Why Winkler County belongs in the county series"),
    p("Winkler County explains the Permian Basin in miniature. Before petroleum, people navigated sand, springs and ranch country. Then one successful well in 1926 overturned assumptions about the land and triggered a building boom strong enough to replace the county courthouse only a few years later. Kermit became a durable service center, while Wink kept the memory of both the first major field and a teenage musician who would become famous far beyond Texas."),
    p("It also demonstrates why West Texas counties should not be treated as interchangeable oil territory. Winkler has a specific landscape, its own early settlement failures, a courthouse born from one particular boom, the Hendrick discovery well, Blue Mountain, a cross-border identity and a music story that belongs specifically to Wink."),
    p("Drive through quickly and the county can look like highways, tank batteries and open sky. Stop long enough to read the landscape and the story gets sharper: difficult sand, scarce water, speculative towns, a midnight oil strike, civic confidence in stone and columns, and a small-town stage where Roy Orbison first learned what his voice could do."),
  ],
};