import bigBend from "@/assets/big-bend.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const elPasoCountyPassMissionsBorderlandsArticle: Article = {
  id: "county-el-paso-pass-missions-borderlands",
  brandId: "texasdefined",
  slug: "el-paso-county-missions-rio-grande-texas",
  title: "El Paso County: The Pass, the Missions and a Texas Story Written on Both Sides of the Rio Grande",
  dek: "El Paso County is where Texas narrows into a mountain pass and opens into one of the oldest, most layered borderlands in the state — home to Ysleta del Sur, historic missions, Fort Bliss, the Franklin Mountains and a city shaped as much by Mexico as by Texas.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: bigBend,
    alt: "Rugged mountain and desert landscape in Far West Texas near El Paso County",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-08",
  readingMinutes: 11,
  tags: ["El Paso County", "El Paso", "Ysleta Mission", "Ysleta del Sur Pueblo", "Franklin Mountains", "Fort Bliss", "Chamizal", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/hudspeth-county-sierra-blanca-salt-flats-texas", label: "Explore neighboring Hudspeth County", description: "Continue east through Sierra Blanca, Rio Grande farming communities and the salt-flat country." },
    { href: "/article/culberson-county-van-horn-guadalupe-mountains-texas", label: "Continue into Culberson County", description: "Follow Far West Texas toward Van Horn, Guadalupe Peak and the Salt Basin." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/explore", label: "Explore Texas", description: "Find parks, towns, landscapes and destinations across the state." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("El Paso County sits at one of the most important geographic doorways in North America. The Franklin Mountains rise through the middle of the modern metro area while the Rio Grande bends along the international boundary. For centuries, travelers moving between the deserts of northern Mexico and the interior of what is now the American Southwest funneled through this pass."),
    p("That geography is why the county's story feels older than the usual Texas timeline. Long before railroads, interstates or even the Republic of Texas, Indigenous communities lived along the river. Spanish roads and missions followed. Mexican communities grew on both sides of the river. The United States later added forts, railroads and a border line that turned one connected valley into two countries."),

    h("The name tells you what the landscape does"),
    p("El Paso means 'the pass.' The name grew from El Paso del Norte, the historic settlement on the south side of the Rio Grande that became modern Ciudad Juárez. The pass between mountain ranges made this corridor a natural route through the Chihuahuan Desert."),
    p("That detail matters because transportation is not a later chapter here. It is the organizing principle of the place. Indigenous trails, El Camino Real de Tierra Adentro, wagon roads, military routes, railroads, highways and modern international bridges all reused the same basic geographic advantage."),

    h("Ysleta del Sur gives the county one of Texas' deepest living histories"),
    p("The Pueblo Revolt of 1680 in present-day New Mexico pushed Spanish settlers and allied Pueblo peoples south toward the El Paso del Norte region. Tigua people from Isleta Pueblo established a community in what is now El Paso County, and the Ysleta Mission was founded in 1682."),
    p("The mission is more than an old building. It remains the spiritual center of Ysleta del Sur Pueblo, the only federally recognized Pueblo tribe in Texas. Native motifs inside the church sit alongside Catholic imagery, reflecting more than three centuries of cultural continuity and adaptation."),
    p("The National Park Service describes Ysleta as one of the longest continually occupied religious sites in the United States. That makes El Paso County a useful corrective to the idea that Texas history begins with Anglo settlement. Some of the state's oldest continuously rooted communities are here in the far west."),

    h("The Mission Trail is a borderlands history lesson you can drive"),
    p("Ysleta is part of a larger string of historic sites along the El Paso Mission Trail. Socorro Mission and the San Elizario presidio chapel extend the story eastward through communities shaped by Indigenous, Spanish, Mexican and later American life."),
    p("The route follows a landscape that was once organized around the Rio Grande rather than an international boundary. Floods repeatedly shifted the river channel, and political lines changed around communities that had existed long before modern borders."),
    p("That is why the Mission Trail works best as more than a sightseeing loop. The churches, plazas and adobe traditions show how cultures overlapped here rather than replacing one another in neat historical stages."),

    h("A river that moved also moved the border"),
    p("The Rio Grande has never behaved like a ruler-straight political line. Flooding and erosion repeatedly changed its channel, creating disputes over whether land that shifted from one side of the river to the other had also changed countries."),
    p("The most famous of those disputes involved the Chamizal tract between El Paso and Ciudad Juárez. The disagreement lasted roughly a century before the United States and Mexico reached a diplomatic settlement in the 1960s. Part of the river was channelized, territory was transferred, and the boundary was stabilized."),
    p("Chamizal National Memorial now preserves the story as an example of an international dispute resolved through negotiation. It is an unusually hopeful historic site: the central event is not a battle but a settlement."),

    h("Fort Bliss grew from border defense into one of the region's defining institutions"),
    p("The U.S. Army established a military presence in the El Paso area in the mid-nineteenth century as American control expanded across the Southwest. Fort Bliss moved locations several times before settling permanently northeast of the city."),
    p("Its role changed with the country around it. The post guarded travel routes, supported campaigns in the Southwest and later became deeply tied to modern artillery, air defense and missile development. Its growth also made the military one of the enduring economic and cultural forces in El Paso County."),
    p("The fort is another example of how the pass shaped institutions. A military installation here could watch a border, protect major transportation corridors and connect operations across a huge desert region."),

    h("Then the railroad turned a border settlement into a major city"),
    p("El Paso's explosive modern growth began when railroads arrived in the early 1880s. Multiple lines connected the city to California, the Gulf Coast, the Midwest and Mexico, transforming a remote border settlement into a transportation and commercial hub."),
    p("Rail access drew merchants, workers, hotels, warehouses and industry. It also strengthened the economic relationship between El Paso and Ciudad Juárez. The two cities grew as distinct municipalities in different countries, but their labor markets, families and commerce remained intertwined."),
    p("That binational reality is still one of the county's defining facts. You can understand El Paso as a Texas city, but you cannot understand it fully without understanding Juárez."),

    h("The Franklin Mountains make this one of Texas' strangest big-city landscapes"),
    p("The Franklin Mountains run directly through El Paso, splitting the urban area and rising abruptly from the desert floor. Unlike many metropolitan mountain backdrops, the range is not merely something on the horizon; it physically shapes neighborhoods, roads and the city's geography."),
    p("Franklin Mountains State Park protects a large portion of that range and gives residents unusual access to hiking, mountain biking, rock climbing and desert views without leaving the metro area."),
    p("From high points in the range, the county's central fact becomes visible at once: one urban landscape extends across an international boundary, while mountains and desert frame both sides."),

    h("Agriculture survived because the valley could be irrigated"),
    p("The lower El Paso Valley has supported farming for centuries because river water could be directed onto otherwise arid land. Indigenous farmers, Spanish missions, Mexican settlements and later commercial growers all depended on irrigation."),
    p("Modern El Paso County agriculture has included cotton, pecans, vegetables and other crops suited to irrigated desert farming. The green ribbon of the valley can feel startling beside surrounding desert and mountains."),
    p("That contrast also links El Paso County directly to neighboring Hudspeth County, where Rio Grande communities such as Fort Hancock developed through the same basic relationship between water, agriculture and border geography."),

    h("A few El Paso County facts worth remembering"),
    list(
      "The name El Paso comes from the historic 'pass' through the mountains used by travelers moving through the Chihuahuan Desert.",
      "Ysleta Mission was founded in 1682 after Tigua people and Spanish settlers moved south following the Pueblo Revolt.",
      "Ysleta del Sur Pueblo is the only federally recognized Pueblo tribe in Texas.",
      "The El Paso Mission Trail connects Ysleta, Socorro and San Elizario through one of the oldest continuously settled cultural landscapes in the state.",
      "The Chamizal dispute between the United States and Mexico grew from changes in the Rio Grande channel and was settled diplomatically in the twentieth century.",
      "Railroads arriving in the early 1880s transformed El Paso into a major transportation and commercial center.",
      "The Franklin Mountains rise through the metropolitan area and form one of Texas' most distinctive urban landscapes.",
      "Fort Bliss became one of the most important military installations in the Southwest and remains a major presence in the county.",
    ),

    h("Why El Paso County feels unlike anywhere else in Texas"),
    p("El Paso County does not fit comfortably into the usual east-to-west story of Texas settlement. Its oldest communities look south and north along the Rio Grande before they look east toward the rest of the state. Its architecture, language, food and family history are inseparable from northern Mexico and New Mexico."),
    p("That does not make the county less Texan. It makes Texas harder to reduce to a single origin story. Here, Pueblo history, Spanish missions, Mexican borderlands, U.S. military expansion, railroad capitalism, immigration and modern binational life all occupy the same landscape."),
    p("The county also gives the Far West Texas series a natural western anchor. To the east, Hudspeth County carries the Rio Grande and railroad story into Sierra Blanca and the desert basins. Beyond that, Culberson, Jeff Davis, Presidio and Brewster counties continue through mountains, ranch country and the Big Bend."),
    p("Taken together, those counties show why the western edge of Texas deserves to be understood as more than empty mileage. El Paso County is the clearest proof: the pass has been bringing people together for centuries, and the modern border city is only the latest version of that much older geography."),
  ],
};
