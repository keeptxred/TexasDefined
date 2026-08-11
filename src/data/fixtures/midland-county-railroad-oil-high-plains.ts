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
  readingMinutes: 9,
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
    p("Midland County is easy to reduce to oil, but its landscape tells a longer story. Indigenous trails, wagon roads, ranch tracks, the Texas and Pacific Railway, lease roads and Interstate 20 all cross the same broad West Texas plain. Midland became the county seat because the railroad placed a station here, then grew into an energy capital because companies needed a well-connected place to manage fields spread across the Permian Basin."),
    p("The county sits on the southern edge of the High Plains, a mostly level country of shallow draws, mesquite and scarce permanent surface water. That geography shaped ranching, farming, urban growth and the constant need to secure dependable water. It also gives Midland its visual character: long horizons make the downtown towers look unusually vertical, helping explain the city's Tall City nickname."),

    h("Trails crossed the plains before rails did"),
    p("The Handbook of Texas records the Great Comanche War Trail, the Chihuahua Trail and wagon routes through or near the area. These paths connected water, grazing country, trade and military destinations long before a county boundary existed. By the late nineteenth century, buffalo hunting and forced Indigenous removal had dramatically altered the older life of the plains."),
    p("The railroad industrialized that older geography of movement. The Texas and Pacific reached the area in 1881, and a settlement grew beside the tracks under the name Midway because it lay roughly halfway between Fort Worth and El Paso. The name changed to Midland, but the original idea survived: location was the community's first economic advantage."),

    h("Ranching built the first permanent economy"),
    p("Railroad promotion attracted sheepmen and cattle ranchers. The Texas State Historical Association identifies Herman Garrett as the first permanent settler after he brought sheep into the region. Chicago meatpacker Nelson Morris later assembled a large Black Angus operation and became an early rancher to fence county land."),
    p("Midland County was created from Tom Green County and organized in 1885, with Midland as the county seat. Ranching dominated the early economy. Farming expanded after 1900 through irrigation and changing land use, especially sorghum and cotton, but rainfall remained unreliable. The difficulty was famous enough that the U.S. Department of Agriculture conducted a rain-making experiment here in 1891."),
    p("Those first decades established habits that would remain important in the petroleum era: dependence on wells, sensitivity to weather and commodity prices, large landholdings and long-distance transportation. Oil magnified those patterns rather than creating them from nothing."),

    h("Oil made Midland a headquarters city"),
    p("Midland's first great petroleum transformation came from discoveries outside the county. Major strikes in Reagan County in 1923 and Ector County in 1926 changed the region, and Midland's rail access and business community made it a natural base for petroleum companies. Geologists, landmen, engineers, bankers, lawyers and executives could work in Midland while their companies operated across West Texas and southeastern New Mexico."),
    p("Midland County later developed major production of its own. The Handbook of Texas records a county oil boom beginning in 1945, success in the Midland South Pool in 1947 and another surge from 1949 through 1952. By then the city already had the institutions to turn petroleum wealth into offices, neighborhoods and a skyline."),
    p("That distinction still matters. Midland is not simply a city sitting over one oilfield. It is an administrative center for a vast geological region. Decisions made in a downtown office can concern leases, wells and pipelines many counties away, which is why the local economy has always been unusually regional in reach."),

    h("The Petroleum Museum connects business to deep time"),
    p("The Permian Basin Petroleum Museum makes the county's defining industry easier to understand. Founded in 1975 by more than 500 community leaders, it interprets the geology of the ancient Permian sea alongside drilling technology, risk, energy production and the people who built the regional industry."),
    p("The museum is a useful reminder that the Permian Basin is a geological structure before it is an economic label. Sediments and reefs formed hundreds of millions of years before Midland existed; modern companies built an enormous energy system around that buried geology."),

    h("Growth turned an oil center into a regional city"),
    p("Energy remains central, but modern Midland County also depends on health care, construction, education, aviation, logistics, retail, government and professional services. The Census Bureau counted 169,983 residents in 2020 and estimated 187,855 residents in 2025. Rapid growth puts pressure on housing, roads, schools, hospitals and water systems, especially during drilling booms."),
    p("The boom-and-bust cycle therefore shows up in ordinary life, not just oil prices. It changes traffic, rents, school enrollment, construction and public budgets. Midland's entrepreneurial culture grew alongside a practical familiarity with economic volatility."),

    h("The Bush Family Home makes the boom personal"),
    p("The Bush Family Home State Historic Site preserves the modest house where George H. W. Bush, Barbara Bush and their young family lived in the early 1950s while he built a career in the West Texas oil business. The Texas Historical Commission restored the home to that period."),
    p("Its significance is precisely that it is ordinary. Families arrived in Midland because the postwar Permian Basin promised opportunity, then built neighborhoods and civic lives around the industry. One such family later reached the White House, giving a residential street in Midland an unexpected place in national history."),

    h("Archaeology reaches far beyond the railroad era"),
    p("In 1953, archaeologists working on the Scharbauer Ranch found fossilized human remains popularly known as Midland Minnie. Their age and cultural association have been debated, but the discovery placed Midland County within a much older scientific discussion about human occupation of the southern High Plains."),
    p("The site also yielded fossils of extinct animals, evidence of an environment unlike today's dry plains. That deep record gives the county useful perspective: railroad history is old by city standards, ranching is older, Indigenous use of the plains older still, and archaeology reaches far beyond every modern boundary."),

    h("Midland is the center, but the county is larger than the city"),
    p("Most residents live in or near Midland, yet rural and semi-rural parts of the county still mix ranches, cotton, energy infrastructure, industrial yards and residential growth. Greenwood is one of the clearest examples of that suburban-rural edge, where schools, homes, acreage and oilfield activity coexist."),
    p("The Ector County line is especially porous. Midland and Odessa maintain separate identities, but together they function as the largest urban pair in the central Permian Basin. Workers, patients, students, shoppers and businesses cross between them constantly, making the county boundary important for government but less decisive for the regional economy."),

    h("A few Midland County facts worth remembering"),
    list(
      "Midland County was created and organized in 1885 from territory previously assigned to Tom Green County.",
      "Midland grew from a railroad settlement first called Midway for its position between Fort Worth and El Paso.",
      "The county lies on the southern edge of the High Plains and lacks permanent rivers or other permanent surface waters.",
      "Ranching preceded large-scale farming; irrigation later helped cotton expand in the early twentieth century.",
      "Oil discoveries in neighboring counties helped make Midland a corporate headquarters center before major local production developed.",
      "The Permian Basin Petroleum Museum opened in 1975 and interprets the region's geology and energy history.",
      "The Bush Family Home preserves the early-1950s Midland residence of George H. W. Bush and Barbara Bush.",
      "The 2020 census counted 169,983 Midland County residents; the Census Bureau estimated 187,855 in 2025.",
    ),

    h("Why Midland County belongs in the county series"),
    p("Midland County shows how geography can become economic position. A railroad midpoint evolved into a place from which companies coordinate work across an enormous petroleum region. The same open landscape that challenged early settlers later accommodated railroads, highways, airports, pipelines and rapid urban expansion."),
    p("Oil never erased what came before. Ranching, cotton, drought, Indigenous travel, archaeology and railroad settlement remain part of the county's identity. Midland County is best understood as a place built around movement, water scarcity, risk and repeated reinvention—a courthouse county, a ranch county and an energy capital on the same High Plains map."),
  ],
};