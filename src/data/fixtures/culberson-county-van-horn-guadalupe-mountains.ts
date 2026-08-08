import bigBend from "@/assets/big-bend.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const culbersonCountyVanHornGuadalupeMountainsArticle: Article = {
  id: "county-culberson-van-horn-guadalupe-mountains",
  brandId: "texasdefined",
  slug: "culberson-county-van-horn-guadalupe-mountains-texas",
  title: "Culberson County: Van Horn, Guadalupe Peak and a West Texas Landscape Built on Distance",
  dek: "From the old railroad town of Van Horn to Texas' highest point, white gypsum dunes and the Guadalupe Mountains, Culberson County turns a remote stretch of Far West Texas into a story of trails, ranches, geology and persistence.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: bigBend,
    alt: "Rugged mountain and desert landscape in Far West Texas",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-08",
  readingMinutes: 10,
  tags: ["Culberson County", "Van Horn", "Guadalupe Mountains", "Guadalupe Peak", "Salt Basin", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/article/jeff-davis-county-fort-davis-mountains-texas", label: "Explore neighboring Jeff Davis County", description: "Continue south into Fort Davis, the Davis Mountains and McDonald Observatory country." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/explore", label: "Explore Texas", description: "Find parks, towns, landscapes and destinations across the state." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain the people and places behind modern Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Culberson County is easy to underestimate from the interstate. For many travelers, it is the long western stretch of Texas where Van Horn appears as a welcome cluster of gas stations, motels and restaurants before the road opens again into desert. But the county is far more than a place to stop between larger destinations."),
    p("Its northern edge contains Guadalupe Mountains National Park and Guadalupe Peak, the highest natural point in Texas. To the west lies the broad Salt Basin, where white gypsum dunes rise from a closed desert basin. Van Horn itself grew from the railroad, while older roads through the county carried Indigenous travelers, stagecoaches, soldiers, freighters and ranchers across one of the most demanding landscapes in the state."),

    h("First, understand the scale"),
    p("Culberson County covers thousands of square miles but has very few residents. The 2020 Census counted 2,188 people, and the Census Bureau estimated 2,267 residents in 2025. Most live in and around Van Horn, the county seat and the community that functions as the county's commercial center."),
    p("That population spread changes the feel of the place. Services are concentrated, communities are small, and enormous distances separate the ranch roads, mountain ranges and desert basins. The emptiness is not a lack of story; it is one of the forces that shaped the story."),

    h("Long before highways, people followed water and passes"),
    p("The Guadalupe Mountains preserve evidence of more than 10,000 years of human activity. Indigenous peoples moved through the mountains and desert long before modern county lines existed, using springs, passes and seasonal resources to navigate a region where reliable water could determine the route."),
    p("Mescalero Apache history is especially important in the Guadalupes. The mountains offered water, shelter and strategic high ground, and later became part of the violent contest over control of travel routes as the United States expanded its military presence across the Southwest."),
    p("The county therefore sits inside a much older map than the one printed with Texas county boundaries. Its geography made certain corridors useful again and again, even as the travelers and political powers changed."),

    h("The Butterfield route crossed a hard piece of country"),
    p("In the late 1850s, the Butterfield Overland Mail carried passengers and mail between the eastern United States and California. One segment crossed what is now Culberson County, passing through the Guadalupe Mountains region on a route where water, grades and dependable stations mattered enormously."),
    p("The ruins of the Pinery Station inside Guadalupe Mountains National Park preserve one remnant of that stagecoach era. Travelers today can reach it on foot in minutes; nineteenth-century travelers encountered it as part of a multiweek continental journey."),
    p("The contrast is useful. Culberson County seems remote by modern standards, but it has long been on routes connecting distant places. Remoteness and transportation have always existed side by side here."),

    h("Van Horn began when the railroad arrived"),
    p("The town of Van Horn developed after the Texas and Pacific Railway built through the area in 1881. The railroad transformed a landscape previously known mainly through wells, military travel and ranching into a permanent shipping and service point."),
    p("The name traces back to military associations with nearby Van Horn Wells. Historical accounts distinguish between Maj. Jefferson Van Horne, associated with the wells, and Lt. James Judson Van Horn, who commanded a small garrison there shortly before the Civil War. When the railroad town appeared decades later, the Van Horn name stayed."),
    p("Rail access made the community useful to ranchers moving cattle and receiving supplies. Stores, hotels and other services followed, and Van Horn gradually became the obvious center of government when Culberson County was organized in 1911."),

    h("A courthouse made the new county official"),
    p("Culberson County was created from El Paso County and organized in 1911, with Van Horn selected as the county seat. For several years county business operated from existing commercial space while residents waited for a permanent courthouse."),
    p("The 1914 Culberson County Courthouse was built with locally quarried sandstone. Like many historic Texas courthouses, it was more than an office building: it became a public gathering place and a visible statement that a distant part of the state had its own civic center."),
    p("The county's creation also illustrates the logic behind Texas' famously dense county map. When travel was slow and roads were uncertain, having government physically closer to residents mattered far more than it does in an era of paved highways and online records."),

    h("Guadalupe Peak puts the roof of Texas here"),
    p("Northern Culberson County contains the highest natural point in Texas. Guadalupe Peak rises to 8,751 feet above sea level, standing above a landscape that is geologically tied to an ancient marine reef."),
    p("The Guadalupe Mountains are the exposed portion of the Capitan Reef, formed more than 250 million years ago along the edge of a Permian-age sea. What looks like a dry mountain range in the Chihuahuan Desert therefore began as a marine ecosystem."),
    p("That geologic reversal is one of the county's best facts: the highest point in Texas is part of an ancient reef. Hiking to the summit is strenuous, but the route gives visitors a physical sense of how abruptly the mountains rise from the surrounding desert."),

    h("The national park protects more than scenery"),
    p("Guadalupe Mountains National Park was established in 1972. The park protects mountain wilderness, desert, springs, historic ranch sites, stage-route remnants and cultural landscapes as well as the state's highest peak."),
    p("Frijole Ranch and Williams Ranch preserve pieces of the ranching and settlement history that followed earlier Indigenous use of the region. The Pinery Station ruins connect the park to the Butterfield Overland Mail. Together, those sites prevent the mountains from being interpreted as scenery without people."),
    p("The park is also one of the best places in Texas to experience elevation-driven ecological change. Desert plants dominate lower country, while cooler and wetter elevations support woodlands that can feel unexpectedly removed from the surrounding Chihuahuan Desert."),

    h("The Salt Basin looks almost impossible from the road"),
    p("West of the Guadalupe Mountains, the Salt Basin forms a broad closed depression with no outlet to the sea. Water draining into the basin evaporates, leaving minerals behind. Over long periods, wind has reworked gypsum into brilliant white dunes."),
    p("The Salt Basin Dunes in Guadalupe Mountains National Park cover roughly 2,000 acres. Some dunes rise to about 60 feet, creating a bright landscape that can look more like a Gulf Coast beach or a snowfield than West Texas desert."),
    p("The basin exists because of faulting that dropped a block of the Earth's crust while surrounding ranges rose. It is the sort of geology that becomes easier to understand when seen at full landscape scale: mountains on one side, a lowered basin on the other, and pale mineral deposits marking the place where water disappears into evaporation."),

    h("Ranching made distance into a working landscape"),
    p("Ranching became one of the county's enduring economic foundations after permanent settlement expanded in the late nineteenth century. Cattle operations used huge tracts because the dry climate required far more land per animal than wetter parts of Texas."),
    p("That land-use pattern still shapes what travelers see: fences running toward distant ridges, windmills and water infrastructure, ranch roads leaving the pavement, and very few houses across enormous views. The open country is not untouched wilderness; much of it is a working landscape."),

    h("Culberson County has also been a mining county"),
    p("The mountains and basins contain more than dramatic scenery. Culberson County has produced or explored a long list of minerals, including gypsum, sulfur, barite, talc, copper and other materials. Oil production also became part of the twentieth-century economy."),
    p("Mining never turned Van Horn into a major industrial city, but it added another layer to the county's relationship with geology. The same complicated rock history that created cliffs, basins and mountain scenery also created mineral resources people tried to extract."),

    h("Van Horn became a highway town without losing the railroad underneath"),
    p("Automobile travel changed Van Horn again during the twentieth century. Improved highways put the town on major east-west routes, and tourism grew because Van Horn offered services near Guadalupe Mountains National Park, Carlsbad Caverns, El Paso and the broader Big Bend region."),
    p("Interstate 10 eventually made Van Horn instantly recognizable to cross-country drivers. The modern traveler may encounter it through fuel prices, a motel sign or a lunch stop, but the reason a town exists there at all still reaches back to older transportation networks."),
    p("Van Horn's identity is therefore layered: well and military-road country, railroad town, county seat, ranching center and interstate stop. Each transportation era reused a place that had already proved strategically useful."),

    h("A few Culberson County facts worth remembering"),
    list(
      "Culberson County was organized in 1911, with Van Horn chosen as the county seat.",
      "The 2020 Census counted 2,188 residents; the Census Bureau's 2025 estimate was 2,267.",
      "Guadalupe Peak, at 8,751 feet, is the highest natural point in Texas.",
      "The Guadalupe Mountains are part of the ancient Capitan Reef formed along a Permian-age sea more than 250 million years ago.",
      "Guadalupe Mountains National Park was established in 1972.",
      "The Salt Basin Dunes include roughly 2,000 acres of white gypsum dunes, some rising about 60 feet.",
      "The Butterfield Overland Mail crossed the region in the nineteenth century; ruins of the Pinery Station remain inside the national park.",
      "Van Horn grew after the Texas and Pacific Railway reached the area in 1881.",
      "The 1914 Culberson County Courthouse was built with locally quarried sandstone.",
    ),

    h("Why Culberson County rewards a second look"),
    p("Culberson County is a good example of what the county-by-county project is supposed to reveal. A traveler can pass through in an hour or two and see little more than highway and desert. Look closer and the same county contains the highest point in Texas, an ancient reef, a national park, stagecoach history, railroad history, a classic courthouse town, gypsum dunes, ranching and mineral country."),
    p("It also links naturally to neighboring Jeff Davis County. Drive south and the Guadalupe landscape gives way toward the Davis Mountains, Fort Davis and McDonald Observatory. Keep going and the connected story continues through Presidio and Brewster counties into Marfa, the Rio Grande and Big Bend."),
    p("That is the larger lesson of Far West Texas: the distances separate communities, but the history does not stop at county lines. Trails became railroads, railroads were joined by highways, ranches spread across borders on maps, and mountain systems ignore political boundaries entirely."),
    p("Culberson County may be one of the least populated places many Texans ever drive through. It is also one of the clearest places to see how geology, transportation and sheer distance built the West Texas people know today."),
  ],
};
