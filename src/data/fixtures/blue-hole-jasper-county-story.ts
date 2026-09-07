import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const blueHoleJasperCountyStoryArticle: Article = {
  id: "evergreen-blue-hole-jasper-county-story",
  brandId: "texasdefined",
  slug: "blue-hole-jasper-county-east-texas",
  title: "The Blue Hole in East Texas: Jasper County's Brilliant Quarry Lake",
  dek: "Deep in the Piney Woods, an old sandstone quarry filled with spring-fed water and became one of East Texas's strangest blue-green landmarks. Its railroad history, geology and legends are remarkable—but the Blue Hole is private property, not a public swimming destination.",
  category: "lakes-rivers",
  region: "piney-woods",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Boykin_Creek%2C_Angelina_National_Forest%2C_Angelina_County%2C_Texas%2C_USA_%28November_2020%29.jpg?width=1600",
    alt: "Boykin Creek in Angelina National Forest, part of the Piney Woods landscape near the historic Blue Hole area",
    width: 1600,
    height: 867,
    credit: "William L. Farr · CC BY-SA 4.0 · Wikimedia Commons · regional context image",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-07",
  readingMinutes: 10,
  tags: [
    "Blue Hole Jasper County",
    "East Texas Blue Hole",
    "Jasper County",
    "Angelina National Forest",
    "Piney Woods",
    "Texas quarry lakes",
    "East Texas history",
    "Texas hidden places",
  ],
  featured: false,
  sourceName: "The History Center — In Forest Land: Special Places in the East Texas Pineywoods",
  sourceUrl: "https://www.thehistorycenteronline.com/exhibits/in-forest-land-special-places-in-the-east-texas-pineywoods",
  internalLinks: [
    {
      href: "/county/jasper",
      label: "Jasper County guide",
      description: "Explore the county around Jasper, Kirbyville, Sam Rayburn country and the Deep East Texas forest landscape.",
    },
    {
      href: "/article/jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas",
      label: "The Jasper County story",
      description: "Read the longer county history connecting forests, lumber towns, rivers and Sam Rayburn country.",
    },
    {
      href: "/fishing/lakes/sam-rayburn-reservoir",
      label: "Sam Rayburn Reservoir fishing guide",
      description: "For public water recreation in this part of East Texas, use TexasDefined's complete Sam Rayburn guide.",
    },
    {
      href: "/destination/martin-dies-jr-state-park",
      label: "Martin Dies Jr. State Park",
      description: "A public East Texas alternative for paddling, camping and forest-and-water scenery near Jasper.",
    },
    {
      href: "/destination/blue-hole-wimberley",
      label: "Blue Hole Regional Park in Wimberley",
      description: "Texas has another famous Blue Hole in Wimberley; that Hill Country swimming area is a different place with managed seasonal access.",
    },
    {
      href: "/explore/lakes-rivers",
      label: "Texas lakes, rivers and swimming water",
      description: "Browse public and visitable water destinations around the state.",
    },
    {
      href: "https://www.thehistorycenteronline.com/exhibits/in-forest-land-special-places-in-the-east-texas-pineywoods",
      label: "The History Center: Blue Hole and the East Texas Pineywoods",
      description: "Primary local-history source for the quarry, railroad, geology, swimming-hole era and lost-train legend.",
    },
    {
      href: "https://www.tshaonline.org/handbook/entries/aldridge-tx-jasper-county",
      label: "Handbook of Texas: Aldridge, Jasper County",
      description: "Texas State Historical Association background on the nearby mill community, railroad and Blue Hole recreation history.",
    },
    {
      href: "https://www.fs.usda.gov/r08/texas/recreation/angelina-national-forest",
      label: "Angelina National Forest",
      description: "Official U.S. Forest Service information for public recreation in the surrounding national forest.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: ["martin-dies-jr-state-park", "blue-hole-wimberley"],
  body: [
    p("There is a patch of water in the East Texas Piney Woods that looks almost misplaced. Against pale quarry walls and dark pine forest, the water can take on an intense blue-green color more often associated with a spring basin or a photograph from somewhere far outside Texas. Locals have called it the Blue Hole for generations."),
    p("This is not the better-known Blue Hole in Wimberley. Jasper County's Blue Hole sits in a very different landscape, tied to sandstone quarrying, a short-lived railroad network, the lumber economy and the history of the Angelina National Forest. It is also not a public swimming hole today. The site is on private property, and that access fact matters as much as the unusual color."),

    h("The most important thing to know: the Blue Hole is private property"),
    p("The History Center in Diboll identifies the Blue Hole as a private inholding within the Angelina National Forest in upper northwestern Jasper County. That means the surrounding map can look like public national-forest land while the Blue Hole itself is privately owned. National-forest boundaries do not create a right to enter a private inholding."),
    p("Do not treat old newspaper directions, social-media posts, map pins or decades-old swimming stories as permission to visit. TexasDefined does not publish turn-by-turn directions to the site because doing so could encourage trespassing. Anyone interested in the surrounding Piney Woods has extensive legal public recreation nearby through the Angelina National Forest, Sam Rayburn Reservoir and Martin Dies Jr. State Park."),
    list(
      "Blue Hole itself: private property; do not enter without explicit current permission from the owner.",
      "Angelina National Forest: public federal land surrounds parts of the broader area, but public land does not include every inholding.",
      "Sam Rayburn Reservoir: major public recreation and fishing water nearby with established access points.",
      "Martin Dies Jr. State Park: a public state-park option near Jasper for paddling, camping, trails and East Texas water scenery."
    ),

    h("It began as a sandstone quarry, not a lake"),
    p("The Blue Hole's story starts with rock. According to The History Center, the quarry opened in 1893 to produce sandstone for an extension of the federal jetties at Sabine Pass on the Gulf Coast. The place was known as Kyle's Quarry, after William Wesley Kyle of Beaumont."),
    p("Moving heavy stone out of a remote forest required more than wagons. A standard-gauge railroad was built from Rockland to the quarry in 1895–1896, connecting quarry operations on both sides of the Neches River with mainline rail service. The line went through several names and owners, including the Rock Quarries Tram Road, the Rockland, Jasper & Northeastern Railway and, after John Henry Kirby acquired it in 1906, the Burr's Ferry, Browndel & Chester Railway."),
    p("That transportation history connects the Blue Hole to a much larger East Texas story. Timber, stone, railroads and river crossings created communities and industrial sites that could thrive for a few years and then nearly disappear when the resource, market or rail connection changed."),

    h("How a quarry became the Blue Hole"),
    p("The quarry flooded during the 1920s and became the body of water remembered today. Local accounts describe clear spring water filling the excavated rock pit. It is reasonable to call it an accidental lake in the everyday sense—the quarry was dug for stone, not built as a recreational reservoir—but the historical record is more specific than the viral shorthand that workers simply 'hit an underground spring' on one dramatic day."),
    p("What can be said confidently is that industrial excavation created the basin, water filled it, and the abandoned quarry became something entirely different from its original purpose. By later decades it had become a local swimming place famous enough to draw newspaper attention well beyond Jasper County."),

    h("Why does the water look so blue?"),
    p("The Blue Hole's color is one of the reasons the place became legendary. The History Center points back to geologist Edwin T. Dumble's 1918 description of Kyle's Quarry. Dumble identified the deposit as quartzitic sandstone associated with the Corrigan, or Catahoula, formation and described hard rock made mainly of quartz and chert, along with whitish and greenish clays."),
    p("The History Center notes that the coloring of those clays and rocks is believed to contribute to the Blue Hole's distinctive blue-green appearance. Water color is rarely the result of one simple ingredient: depth, suspended material, the color and reflectivity of the quarry walls, sunlight and the way water absorbs and scatters wavelengths can all affect what the eye sees. The local geology gives the Blue Hole an unusually striking palette."),
    p("That explanation is more grounded than claims that the color proves the water has special healing properties or some mysterious chemical composition. The site's visual character is remarkable enough without turning geology into folklore."),

    h("A swimming hole that became an East Texas legend"),
    p("For part of the twentieth century the Blue Hole was not merely a geological curiosity. It was a swimming spot. Dallas Morning News columnist Frank X. Tolbert wrote about it repeatedly from the late 1950s into the early 1970s and helped spread its reputation outside the Piney Woods."),
    p("The popularity came with a cost. The History Center's account of Tolbert's later visits describes growing traffic and litter, including discarded cans and bottles. That history feels surprisingly modern: a beautiful place becomes famous, more people arrive, and the qualities that made it appealing become harder to protect."),
    p("Today the ownership boundary resolves that tension in a very direct way. The Blue Hole is not an open-access attraction. Its history can be appreciated without treating the property as a destination that the public is entitled to enter."),

    h("What about the locomotive supposedly sitting at the bottom?"),
    p("No East Texas mystery seems complete without a lost-train story. One long-running Blue Hole legend claimed that a locomotive, and sometimes additional rail cars, disappeared into the deep quarry water."),
    p("The historical evidence is much less dramatic. The History Center recounts Tolbert's report that the Blue Hole was drained around 1960 during engineering work associated with the Lake Sam Rayburn project. No locomotive appeared. Tolbert wrote that earlier divers had also challenged the story. The quarry later refilled, and the absence of a train did little to kill the legend."),
    p("The myth probably survived because it fits the landscape so well: an abandoned railroad, deep dark water, industrial ruins and a forest that reclaimed much of the surrounding human activity. It is exactly the kind of setting in which a good story can outlive the evidence against it."),

    h("The Blue Hole belongs to a bigger lost-industrial landscape"),
    p("The quarry makes more sense when viewed with nearby Aldridge, old rail grades, river pilings and other remnants of the timber-and-rail era. Aldridge was once a mill community on the Neches River in northern Jasper County. Fires, timber depletion and changing transportation eventually erased most of the town's economic reason to exist."),
    p("The forest then did what East Texas forests do: it grew back around foundations, rail corridors and industrial sites. What looks remote and natural today can contain the footprint of a surprisingly busy earlier landscape. The Blue Hole is a particularly vivid example because the industrial scar itself filled with water and became the feature people remember."),

    h("Can you visit the area without trespassing?"),
    p("Yes. The answer is to visit the public Piney Woods rather than trying to reach the private quarry. Angelina National Forest includes legal recreation areas, trails, forest roads and access to Sam Rayburn Reservoir. Nearby public destinations can give you the same broader landscape—pine forest, dark creeks, reservoir coves and East Texas history—without crossing a private boundary."),
    p("Boykin Springs Recreation Area and other Forest Service sites are part of the broader national-forest story associated with this part of East Texas. Sam Rayburn offers established boat ramps and fishing access. Martin Dies Jr. State Park, farther south near Jasper, combines water, forest and paddling in a clearly managed public setting."),
    p("Before any national-forest outing, check the U.S. Forest Service for current closures, fire restrictions, road conditions and recreation-area status. Public land can still have temporary restrictions, and map apps are not a substitute for official access information."),

    h("Not every 'hidden gem' needs to become a destination"),
    p("The Blue Hole is a useful reminder that a place can matter even when the public cannot freely enter it. Its value is historical, geological and cultural: a nineteenth-century quarry became a spring-fed lake, a small railroad connected it to Gulf Coast construction, swimmers turned it into a regional landmark, and legends accumulated in the dark water."),
    p("The responsible way to tell that story is not to publish a secret route. It is to explain why the place exists, why the water looks different, how it fits the Piney Woods and where travelers can experience the surrounding landscape legally. In that sense, the Blue Hole may be more interesting as an East Texas story than as another pin on a travel map."),

    h("Blue Hole, Jasper County: quick facts"),
    list(
      "What it is: a former sandstone quarry that later filled with water.",
      "Where: upper northwestern Jasper County, within a private inholding surrounded by the broader Angelina National Forest landscape.",
      "Quarry opened: 1893, to supply sandstone for work at the Sabine Pass jetties.",
      "Rail connection: a standard-gauge line from Rockland reached the quarry in the 1890s and later became part of the Burr's Ferry, Browndel & Chester Railway story.",
      "Lake formation: the abandoned quarry flooded during the 1920s and became a locally famous swimming hole.",
      "Why blue-green: local quartzitic sandstone, quartz, chert and colored clays are believed to help create the distinctive appearance.",
      "Lost train legend: memorable, but historical accounts say draining and diving did not reveal a locomotive.",
      "Access today: private property. Do not trespass; use public national-forest and nearby lake or state-park access instead."
    ),
  ],
};
