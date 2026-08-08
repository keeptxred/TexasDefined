import bigBend from "@/assets/big-bend.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const presidioCountyMarfaBorderlandsArticle: Article = {
  id: "county-presidio-marfa-borderlands",
  brandId: "texasdefined",
  slug: "presidio-county-marfa-borderlands-texas",
  title: "Presidio County: Where Marfa, the Rio Grande and the Big Bend Borderlands Meet",
  dek: "Marfa may get the headlines, but Presidio County stretches far beyond its art-world reputation — across ranch country, volcanic mountains, an ancient river corridor and one of the oldest continuously inhabited corners of the Big Bend.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: bigBend,
    alt: "Chihuahuan Desert mountains and open sky in the Big Bend region of West Texas",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-08",
  readingMinutes: 10,
  tags: ["Presidio County", "Marfa", "Presidio", "Fort Leaton", "Texas counties", "Big Bend", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/brewster-county-big-bend-texas", label: "Explore neighboring Brewster County", description: "Continue east into Alpine, Terlingua and Big Bend National Park." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/explore", label: "Explore Texas", description: "Find landscapes, historic places and destinations across the state." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Presidio County contains one of Texas' great geographic contradictions. Its county seat, Marfa, is internationally known for minimalist art, contemporary galleries and a mysterious light on the horizon. Drive south, though, and the county opens into ranches, mountains, desert and a Rio Grande settlement story that reaches back centuries before Marfa existed."),
    p("That contrast is the point. Presidio County is not simply 'the county with Marfa.' It is a borderlands county whose history has been shaped by Indigenous peoples, Spanish and Mexican settlement, trade across the Rio Grande, ranching, military posts, railroads and the enormous distances of the Chihuahuan Desert."),

    h("A county that once covered much more of West Texas"),
    p("Presidio County was created in 1850, when Texas was still organizing local government across a vast and lightly populated western frontier. Its original boundaries were much larger than today's county. Over time, new counties were carved from that territory as settlements grew and the Trans-Pecos acquired a more detailed political map."),
    p("The name comes from the Spanish word presidio, meaning a fortified military settlement. That alone hints at how much older the human geography here is than the modern county line. Long before Texas county government arrived, the Rio Grande corridor connected communities, farms, trade routes and military outposts."),

    h("Presidio begins with water"),
    p("The city of Presidio sits where the Rio Conchos flows into the Rio Grande. In an arid region, that meeting of rivers made the area unusually valuable for agriculture and settlement. Indigenous communities farmed in the river valleys long before Europeans entered the region, and Spanish expeditions later recognized the strategic importance of the same place."),
    p("The modern international boundary can make the river look like the edge of the story. Historically, it was often the center of it. Families, livestock, goods and ideas moved through a connected borderland in which communities on opposite banks depended on one another."),
    p("Presidio remains one of the clearest places in Texas to see that border history as lived geography rather than an abstract line on a map."),

    h("Fort Leaton was a trading post, not a lonely frontier fort"),
    p("Just east of Presidio stands Fort Leaton State Historic Site, an enormous adobe complex begun in the 1840s by trader Benjamin Leaton. Despite its name, Fort Leaton was primarily a private trading post and fortified residence rather than a conventional U.S. Army fort."),
    p("Its location made sense. The Chihuahua Trail connected northern Mexico with the settlements and military economy developing farther north, and the Rio Grande corridor supported a web of commerce. Traders dealt in livestock, agricultural goods and manufactured products while travelers sought supplies and protection."),
    p("Today the restored adobe compound is one of the county's most useful historical stops because its thick walls make the borderlands economy tangible. Presidio County was never isolated from Mexico; its communities developed through that relationship."),

    h("Marfa started with the railroad"),
    p("Marfa's modern story begins in the early 1880s with the railroad. The settlement developed as a water stop on the Southern Pacific line and soon became a regional shipping and service center for ranch country. Presidio County voters made Marfa the county seat in 1885."),
    p("The railroad changed the scale of life in the Trans-Pecos. Cattle, supplies, mail and passengers could move more reliably across distances that had previously demanded wagon travel. Marfa grew into the courthouse town at the center of that network."),
    p("Its 1886 Presidio County Courthouse still dominates the town center. The ornate courthouse feels almost improbable against the spare West Texas landscape, which is part of its charm: a grand statement of civic permanence built when Marfa was still a very young railroad town."),

    h("Then Marfa became an art capital nobody would have predicted"),
    p("Nearly a century after the railroad arrived, artist Donald Judd began moving to Marfa in the 1970s. He was drawn to the space, light, architecture and distance from established art centers. His projects eventually helped turn former military and industrial spaces into permanent settings for large-scale works."),
    p("The Chinati Foundation and Judd Foundation made Marfa an international destination for art and architecture. Galleries, artists, designers, filmmakers and curious travelers followed. The result is one of the strangest cultural transformations of any small Texas county seat: a ranching and railroad town that also became shorthand in the global contemporary-art world."),
    p("That reputation can obscure the town's older layers. Marfa is still a county seat serving ranch country and border communities. The art scene did not replace the West Texas town; it became another chapter laid over it."),

    h("The Marfa Lights refuse to leave the story"),
    p("Long before contemporary art made Marfa famous, stories circulated about unexplained lights visible southeast of town. Accounts describe distant points of light that appear, move, divide or disappear over the desert."),
    p("Explanations have ranged from atmospheric effects and distant vehicle headlights to more imaginative theories. The appeal survives precisely because no single explanation has ended the folklore. A roadside viewing area east of Marfa gives travelers a place to watch the horizon for themselves."),
    p("Whether a visitor sees something mysterious or simply a dark West Texas sky, the Marfa Lights have become part of Presidio County's cultural identity — a bit of folklore unusually well matched to a landscape where distances can be difficult to judge."),

    h("The landscape is doing more work than it first appears"),
    p("Presidio County lies in the Chihuahuan Desert, but 'desert' does not mean flat or monotonous. The county includes broad basins, grasslands, volcanic formations, rugged mountain country and the Rio Grande canyon corridor. Elevation and rainfall differences create surprisingly varied habitats."),
    p("Ranching has long depended on that landscape, especially in the higher grasslands around Marfa. Farther south, the terrain grows hotter and more visibly desert-like as roads descend toward Presidio and the river."),
    p("This is one reason a drive through the county feels so dramatic. Marfa and Presidio belong to the same county, yet climate, elevation, architecture and vegetation can make them feel much farther apart than the mileage suggests."),

    h("A road trip that earns the word scenic"),
    p("Texas Highway 67 connects Marfa with Presidio, dropping through mountain and desert country toward the Rio Grande. From Presidio, travelers can follow Farm to Market Road 170 east through the Big Bend Ranch State Park corridor, one of the state's most celebrated drives."),
    p("That route also provides a natural connection to neighboring Brewster County. County lines matter for government, but the Big Bend landscape ignores them. Presidio County's river settlements, ranch country and mountains are part of the same broader Trans-Pecos story that continues toward Terlingua, Alpine and Big Bend National Park."),

    h("A few Presidio County facts worth remembering"),
    list(
      "Presidio County was created in 1850 and once covered a much larger piece of the Trans-Pecos than it does today.",
      "The city of Presidio occupies an ancient settlement corridor near the confluence of the Rio Conchos and Rio Grande.",
      "Fort Leaton began in the 1840s as a fortified private trading post along an important borderlands trade route.",
      "Marfa developed as a Southern Pacific railroad stop in the 1880s and became the county seat in 1885.",
      "The landmark Presidio County Courthouse was completed in 1886.",
      "Artist Donald Judd's move to Marfa in the 1970s helped transform the small ranching town into an international contemporary-art destination.",
      "Stories of the Marfa Lights predate Marfa's modern art fame and remain one of Texas' best-known pieces of unexplained-light folklore.",
    ),

    h("Why Presidio County is worth understanding as a whole"),
    p("It is easy to visit Marfa and leave thinking you have seen Presidio County. You have not. Marfa is one remarkable expression of the county, but the fuller story runs south to the river and backward through centuries of borderlands history."),
    p("The county works best as a sequence: courthouse and railroad history in Marfa, ranch country on the highway, adobe walls at Fort Leaton, the old settlement corridor at Presidio, and the Rio Grande bending east toward some of the wildest scenery in Texas."),
    p("Taken together, those places explain why county-by-county travel is such a useful way to understand Texas. Presidio County contains an art destination famous around the world, but its deeper identity comes from the landscape and the people who have crossed, farmed, traded, ranched and built communities in it for generations."),
  ],
};
