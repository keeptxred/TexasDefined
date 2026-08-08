import bigBend from "@/assets/big-bend.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const hudspethCountySierraBlancaSaltFlatsArticle: Article = {
  id: "county-hudspeth-sierra-blanca-salt-flats",
  brandId: "texasdefined",
  slug: "hudspeth-county-sierra-blanca-salt-flats-texas",
  title: "Hudspeth County: Sierra Blanca, Salt Flats and the Texas Borderlands Between Two Mountain Worlds",
  dek: "From an adobe courthouse and a historic railroad junction to salt flats, desert bighorn country and Rio Grande communities, Hudspeth County is a vast piece of Far West Texas where transportation, water and the border have always shaped the map.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: bigBend,
    alt: "Mountain and Chihuahuan Desert landscape in Far West Texas",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-08",
  readingMinutes: 10,
  tags: ["Hudspeth County", "Sierra Blanca", "Fort Hancock", "Dell City", "Salt Flats", "Sierra Diablo", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/el-paso-county-pass-missions-borderlands-texas", label: "Explore neighboring El Paso County", description: "Continue west into the Franklin Mountains, Mission Trail and El Paso borderlands." },
    { href: "/article/culberson-county-van-horn-guadalupe-mountains-texas", label: "Explore neighboring Culberson County", description: "Continue east toward Van Horn, Guadalupe Peak and the Guadalupe Mountains." },
    { href: "/article/jeff-davis-county-fort-davis-mountains-texas", label: "Explore Jeff Davis County", description: "Follow the mountain story south toward Fort Davis and McDonald Observatory." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/explore", label: "Explore Texas", description: "Find parks, towns, landscapes and destinations across the state." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Hudspeth County is one of those places where a road map can hide more than it reveals. Interstate 10 crosses the southern half. Sierra Blanca sits beside the highway as the county seat. Fort Hancock and other Rio Grande communities stretch west toward El Paso, while Dell City lies far to the north near the Guadalupe Mountains. Between them are mountains, basins, ranches, irrigated fields and miles of Chihuahuan Desert."),
    p("The scale is enormous. The Census Bureau measures Hudspeth County at more than 4,570 square miles of land, yet the 2020 Census counted only 3,202 residents. That works out to well under one person per square mile. The result is a county where distance is not background scenery; it has influenced transportation, government, farming, ranching and almost every community that survived."),

    h("Sierra Blanca exists because two railroads met in the desert"),
    p("Sierra Blanca owes its origin to one of the great railroad races of the nineteenth century. The Southern Pacific was building east while the Texas and Pacific Railway pushed west. Their crews approached each other in 1881, each company hoping to control the connection."),
    p("The companies finally compromised. On December 15, 1881, a silver spike joined the lines near Sierra Blanca, and transcontinental service began the following day. The meeting created the nation's second transcontinental rail connection and gave a permanent reason for a settlement to grow beside the tracks."),
    p("That transportation story still makes Sierra Blanca a useful way to understand Hudspeth County. Long before the interstate, the county was a corridor linking El Paso, Central Texas and points farther west. Modern highways largely follow the same logic: movement across a difficult landscape concentrates life around the routes that work."),

    h("The county itself is surprisingly young"),
    p("Hudspeth County was organized in 1917 from eastern El Paso County. Lawmakers considered other names before settling on Hudspeth, honoring Claude Benton Hudspeth, an El Paso-area state senator who later served in Congress."),
    p("Sierra Blanca became the county seat. Its courthouse is especially unusual: the Handbook of Texas identifies it as the only Texas county courthouse built entirely of adobe. In a state famous for monumental stone courthouses, Hudspeth County's seat of government reflects the building traditions and materials of the desert borderlands instead."),
    p("The county's creation is another reminder of why Texas accumulated 254 counties. When travel was slow, dividing a huge territory could make local government substantially more reachable. Even today, a trip between communities in Hudspeth County can involve serious mileage."),

    h("The Salt Flats were valuable long before county lines existed"),
    p("North and east of the county, near the Guadalupe Mountains, broad salt flats preserve the floor of an ancient basin. The National Park Service explains that a shallow lake once occupied this landscape. As the climate became drier after the last ice age, the water disappeared and left mineral deposits behind."),
    p("For Indigenous peoples and later Spanish, Mexican and Mexican American communities, that salt was not a curiosity. It preserved food, seasoned meals, helped tan hides and played an important role in processing silver ore. People from the El Paso Valley made long trips to collect it."),
    p("The salt beds also became the focus of the El Paso Salt War in the 1870s, when attempts to claim what local Mexican American communities had long treated as a shared resource produced political conflict and violence. The episode belongs to the larger history of Far West Texas because it shows how a change in legal systems after the U.S.-Mexico War could collide with older ideas about communal land and resources."),

    h("Water explains the communities along the Rio Grande"),
    p("Southern Hudspeth County follows the international boundary with Chihuahua. Communities such as Fort Hancock, Acala and Esperanza grew in a landscape where the Rio Grande and irrigation made agriculture possible."),
    p("That river corridor is culturally and economically connected to a much broader borderlands region. Families, farms, livestock and trade existed across what became an international line, and the county's modern population remains strongly Hispanic and Latino. Census estimates for 2020-2024 report that roughly two-thirds of residents identify as Hispanic or Latino and that a language other than English is spoken at home by a majority of residents."),
    p("The border is therefore not simply the county's southern edge. It is one of the forces that made Hudspeth County what it is."),

    h("Dell City proves that desert agriculture can look unexpected"),
    p("Far north of Sierra Blanca, Dell City sits in an agricultural basin near the New Mexico line and the Guadalupe Mountains. Its existence can surprise travelers who assume the county is uniformly dry ranch country."),
    p("Farming expanded in parts of Hudspeth County during the twentieth century as wells and irrigation made cropland possible. The contrast is striking: irrigated fields can appear against a backdrop of pale desert, limestone ranges and enormous sky."),
    p("That agriculture has always depended on water management. In an arid county, groundwater is not an invisible convenience. It is a basic limit on what communities can grow and how much development the landscape can support."),

    h("The Sierra Diablo carries one of Texas' great wildlife comeback stories"),
    p("Along the Hudspeth-Culberson county line rises the Sierra Diablo. Texas Parks and Wildlife acquired the Sierra Diablo Wildlife Management Area in 1945 as a sanctuary for the last remaining desert bighorn sheep in Texas."),
    p("The rugged mountain habitat became a foundation for decades of bighorn restoration work. TPWD now describes the area as supporting the state's largest free-ranging population. Access is restricted in part because the habitat remains important to conservation."),
    p("The bighorn story changes the way the county's mountains look. They are not empty ridges between towns; they are habitat, research ground and part of a long attempt to restore a native animal that had nearly disappeared from Texas."),

    h("Buffalo Soldier history reaches into this county too"),
    p("Hudspeth County's military history includes one of the starkest episodes associated with the Buffalo Soldiers. In 1880, after years of conflict involving Apache groups, soldiers of the Black Tenth U.S. Cavalry were killed near what became known as Indian Hot Springs."),
    p("The event occurred during a much larger and violent struggle in which Apache people resisted military campaigns across the Trans-Pecos and northern Mexico. It is important not to flatten that history into a simple frontier adventure: the same landscape was home, refuge, military corridor and contested territory depending on who was moving through it."),
    p("That layered history connects Hudspeth County directly to neighboring Jeff Davis County, where Buffalo Soldiers also served at Fort Davis."),

    h("Sierra Blanca once had a time-zone problem worthy of Texas folklore"),
    p("One of Sierra Blanca's stranger historical quirks involved clocks. The Handbook of Texas records that after Hudspeth and El Paso counties were placed in Mountain Time, parts of local life continued operating on Central Time. At different points the courthouse, schools, railroads, post office and bars did not all agree on which clock should govern the day."),
    p("Stories from the mid-twentieth century describe residents navigating the split with a practicality that feels almost inevitable in a railroad town sitting near the edge of Texas' time-zone boundary. It is exactly the sort of local detail that never appears on a highway exit sign but makes a county memorable."),

    h("The landscape changes more than the word desert suggests"),
    p("Hudspeth County lies in the Trans-Pecos and Chihuahuan Desert, but that does not mean one flat landscape repeated for thousands of square miles. Mountains rise above basins, the Rio Grande cuts along the south, irrigated fields appear around farming communities, and isolated ranges create cooler and more sheltered habitats."),
    p("The county's elevations run from roughly 3,200 feet to about 7,500 feet. The Sierra Blanca range itself rises abruptly north of the county seat, while the Hueco, Quitman and Sierra Diablo ranges help divide the broad basins."),
    p("This is Basin and Range country: long valleys separated by isolated mountain systems. The pattern makes a drive feel deceptively simple until a ridge appears out of the desert floor and changes the entire horizon."),

    h("A few Hudspeth County facts worth remembering"),
    list(
      "Hudspeth County was organized in 1917 from eastern El Paso County.",
      "Sierra Blanca is the county seat and grew after competing railroads joined nearby in December 1881.",
      "The Sierra Blanca rail junction helped complete the nation's second transcontinental railroad connection.",
      "The Handbook of Texas identifies the Hudspeth County Courthouse as the only Texas county courthouse built entirely of adobe.",
      "The 2020 Census counted 3,202 residents across more than 4,570 square miles of land.",
      "Historic salt flats near the Guadalupe Mountains supplied Indigenous, Spanish, Mexican and Mexican American communities and later became central to the El Paso Salt War.",
      "The Sierra Diablo Wildlife Management Area was acquired in 1945 to protect Texas' remaining desert bighorn sheep and remains important to restoration work.",
      "Fort Hancock and other communities along the Rio Grande reflect the county's agricultural and borderlands history, while Dell City anchors an irrigated farming area in the north.",
      "Sierra Blanca historically juggled Mountain and Central Time conventions, creating one of Far West Texas' better pieces of local clock folklore.",
    ),

    h("Why Hudspeth County belongs in the Far West Texas story"),
    p("Hudspeth County rewards anyone willing to look beyond the interstate. Its story is about a railroad junction becoming a county seat, an adobe courthouse standing where Texas civic architecture meets borderlands tradition, salt beds revealing older patterns of trade and land use, and communities surviving because they found workable relationships with water and distance."),
    p("It also completes another piece of the county-to-county map. To the east, Culberson County carries the story toward Van Horn, the Salt Basin and Guadalupe Peak. Southeast, Jeff Davis County continues through mountain ranch country toward Fort Davis and McDonald Observatory. West lies El Paso County and the state's largest border metropolis."),
    p("Those connections are the point. Hudspeth can look empty when measured by population density, but the county sits at the intersection of railroads, highways, a river, an international border, mountain systems, migration routes and centuries of human movement. Few places make a better argument that 'empty West Texas' is usually a failure to look closely enough."),
  ],
};
