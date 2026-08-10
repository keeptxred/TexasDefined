import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const andrewsCountyAndrewsOilShafterLakeArticle: Article = {
  id: "county-andrews-andrews-oil-shafter-lake",
  brandId: "texasdefined",
  slug: "andrews-county-andrews-oil-shafter-lake-texas",
  title: "Andrews County: Oil, Shafter Lake and the Courthouse Town That Won",
  dek: "Andrews County is a West Texas story of county-seat rivalry, drought, oil booms and a courthouse town that grew into one of the Permian Basin's durable communities.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Andrews_County_Courthouse,_Andrews,_Texas.jpg?width=1600",
    alt: "Andrews County Courthouse in Andrews, Texas",
    width: 1600,
    height: 1067,
    credit: "Nicolas Henderson · CC BY 2.0 · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-10",
  readingMinutes: 9,
  tags: ["Andrews County", "Andrews", "Shafter Lake", "Permian Basin", "oil", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/ector-county-odessa-oil-stonehenge-texas", label: "Continue south into Ector County", description: "Explore Odessa, the Permian Basin, Stonehenge and the meteor-crater landscape." },
    { href: "/article/winkler-county-kermit-wink-oil-texas", label: "Continue west into Winkler County", description: "Explore Kermit, Wink and the Hendrick Field oil-boom story." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Andrews County sits on the high, open plains northwest of Odessa, close enough to the New Mexico line that the western horizon feels shared with another state. Today the county is unmistakably part of the Permian Basin. Oilfield roads, tank batteries, drilling traffic and service businesses shape the modern landscape. But the county's identity was decided before petroleum dominated West Texas, in a political contest between two tiny communities trying to become the county seat."),
    p("The county was created in 1876 and named for Richard Andrews, remembered as the first man killed in battle for Texas independence in 1835. For decades, population remained sparse. Ranchers, military travelers and Indigenous peoples moved through a landscape where water was scarce and settlement difficult. By the turn of the twentieth century, the county had two competing communities: Andrews and Shafter Lake."),

    h("A county-seat election became a contest over free lots"),
    p("The county's most memorable early political story came in 1910. Both Andrews and Shafter Lake wanted to become the county seat. According to Andrews County's own history, Shafter Lake tried to strengthen its position by giving lots to cowboys so they could qualify to vote there. The plan might have worked if not for one delayed traveler."),
    p("R. M. Means was headed toward Shafter Lake when his wagon broke down. When he finally arrived, the deadline for receiving a free lot had passed, and the town would not extend it. Means returned to Andrews, bought land and began giving lots to cowboys there instead. The county-seat election was held on July 16, 1910, and Andrews won. The story is part frontier politics, part real-estate promotion and entirely appropriate for a county that was still inventing its civic center."),
    p("The victory mattered. County offices, courts and public investment followed the seat. Construction on a two-story courthouse began in 1911, giving Andrews a permanent civic anchor while Shafter Lake gradually declined."),

    h("The first economy was agricultural, and the climate could be unforgiving"),
    p("Before oil, Andrews County depended heavily on ranching and farming. Early settlers raised livestock and attempted dryland agriculture on the plains. Cotton and sorghum eventually became important crops, but the environment regularly reminded residents how narrow the margin could be."),
    p("County history records that the blizzards and drought of 1917 and 1918 devastated agriculture and cut the population by more than half. The county later rebounded during the 1920s and 1930s as cotton and sorghum production improved. That agricultural recovery is easy to overlook now because the petroleum industry changed the county so dramatically, but it explains why Andrews existed as a functioning county community before the oil boom."),

    h("Oil changed the scale of Andrews County"),
    p("The first major petroleum breakthrough came in 1929, when Deep Rock Oil Company made a significant strike. The timing placed Andrews County inside the larger transformation of the Permian Basin, where discoveries during the late 1920s and following decades altered towns across West Texas."),
    p("The biggest expansion came in the 1940s and 1950s. Andrews County records the discovery of more than one hundred new oil fields during those decades. Production, drilling and the businesses that support them brought population growth, wages and public revenue on a scale the old ranch-and-farm economy could not have produced."),
    p("The effects went beyond well sites. Roads improved. Housing expanded. Schools and public facilities grew. Service companies clustered around Andrews. Like neighboring Odessa, Kermit and Monahans, the city became part of a regional petroleum economy in which workers and equipment crossed county lines constantly."),

    h("The courthouse reflects the county's changing ambitions"),
    p("Andrews County's present courthouse was built in 1938, replacing the earlier 1911 building. The timing is important: it arrived after the first oil discoveries but before the largest postwar energy boom. Renovations in 1955 and 1976 followed as the county's population and government needs changed."),
    p("The building remains one of the clearest visual symbols of the county seat. It stands in the community that won the 1910 election and then grew into the county's dominant population center. For a county story, that makes the courthouse more than an architectural backdrop. It is the physical result of the political contest that determined where local government would live."),

    h("Shafter Lake is the place that nearly won"),
    p("Shafter Lake survives in county memory because of what almost happened there. In the early twentieth century it was a genuine rival to Andrews, not merely a name on an old map. Promotional efforts tried to turn the settlement into the county center, and the community had enough momentum to contest the county-seat election seriously."),
    p("The lake itself was an important geographic feature in a dry region, though water levels and settlement patterns changed over time. Once Andrews secured the courthouse and later benefited from oil-driven growth, Shafter Lake's prospects faded. The contrast between the two communities demonstrates how a single local election could shape the long-term geography of a sparsely settled county."),

    h("Modern Andrews is a practical Permian Basin city"),
    p("Andrews today functions as the county's governmental, commercial and population center. Its streets, schools, health facilities and businesses serve residents from across a large rural area. The surrounding economy remains closely tied to petroleum, with drilling, transportation and oilfield services continuing to influence jobs and traffic."),
    p("The county has also spent decades trying to diversify. Local history points to manufacturing and waste-management industries as examples of efforts to reduce dependence on a single commodity cycle. That impulse reflects a familiar West Texas problem: oil booms can generate extraordinary prosperity, but downturns can arrive quickly."),
    p("Even with diversification, petroleum remains visible everywhere. The county sits inside one of the world's most active energy regions, and recent drilling permits continue to show Andrews County as an active part of the broader Permian Basin."),

    h("The county is defined by distance as much as industry"),
    p("Andrews County's landscape is broad and open, with long roads connecting Andrews to Odessa, Seminole, Kermit and southeastern New Mexico. The terrain does not offer the dramatic mountains of far West Texas, but it has its own scale: flat horizons, working ranches, agricultural fields, oil infrastructure and enormous skies."),
    p("That sense of distance helps explain why county government mattered so much to early residents. Before paved highways and modern vehicles, a courthouse was not simply an administrative office. It determined where residents traveled to record deeds, pay taxes, attend court and conduct public business. Winning the county seat gave Andrews an advantage that compounded over generations."),

    h("A few Andrews County facts worth remembering"),
    list(
      "Andrews County was created in 1876 and named for Richard Andrews, an early casualty of the Texas Revolution.",
      "Andrews and Shafter Lake competed for the county seat in 1910, with both communities using land giveaways to attract voters.",
      "Andrews won the county-seat election on July 16, 1910.",
      "The county's first permanent courthouse was begun in 1911; the present courthouse dates to 1938.",
      "Agriculture suffered severely during the blizzards and drought of 1917-18 before cotton and sorghum helped the county recover.",
      "A major oil strike arrived in 1929, and the county experienced much larger petroleum growth during the 1940s and 1950s.",
      "More than one hundred oil fields were discovered in Andrews County during the postwar boom decades.",
      "Andrews remains the county's dominant community and a working center of the Permian Basin economy.",
    ),

    h("Why Andrews County belongs in the county series"),
    p("Andrews County tells a distinctly Texas story about how local geography, politics and natural resources can build a place in layers. The first layer was sparse ranching and farming on a difficult high-plains landscape. The second was a county-seat election decided through a wonderfully improvised battle over free lots. The third was petroleum, which transformed the scale of the economy and turned Andrews into a durable Permian Basin town."),
    p("The county also shows why West Texas should not be treated as one interchangeable oil field. Andrews has its own origin story, its own courthouse politics and its own nearly forgotten rival at Shafter Lake. The oil boom mattered enormously, but it arrived in a county whose civic geography had already been decided."),
    p("Drive through today and the most obvious symbols are modern: pickups, service yards, tank batteries and highways aimed toward the next energy town. Look a little closer and the older county is still there in the courthouse square, the memory of Shafter Lake and the stubborn fact that one broken wagon helped determine where local government would be centered for the next century."),
  ],
};
