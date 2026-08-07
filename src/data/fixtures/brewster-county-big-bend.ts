import bigBend from "@/assets/big-bend.jpg";

import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const brewsterCountyBigBendArticle: Article = {
  id: "county-brewster-big-bend",
  brandId: "texasdefined",
  slug: "brewster-county-big-bend-texas",
  title: "Brewster County: The Texas County Bigger Than Some States",
  dek: "From Alpine's courthouse square to Terlingua and the Chisos Mountains, Brewster County packs desert geology, border history, ranching, mining and one of America's great national parks into the largest county in Texas.",
  category: "texas-history",
  region: "big-bend",
  hero: {
    src: bigBend,
    alt: "The Chisos Mountains rising over the Chihuahuan Desert in Brewster County, Texas",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-07",
  readingMinutes: 11,
  tags: ["Brewster County", "Big Bend", "Alpine", "Terlingua", "Texas counties", "West Texas", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "The history behind the most county-heavy map in America." },
    { href: "/explore", label: "Explore Texas", description: "Find parks, towns, landscapes and destinations across the state." },
    { href: "/texas-history", label: "More Texas history", description: "Stories that explain how Texas became the place it is today." },
  ],
  relatedCollections: [],
  relatedDestinations: ["big-bend"],
  body: [
    p("Brewster County makes ordinary Texas scale feel small. It covers more than 6,100 square miles of land, making it the largest county in Texas by area. Yet fewer than 10,000 people live there. The result is a place where the landscape—not the skyline—sets the terms."),
    p("This is the county of Alpine, Marathon, Terlingua and a huge share of Big Bend National Park. It is Chihuahuan Desert and mountain country, cut by arroyos and volcanic rock, with the Rio Grande tracing the international boundary along the south. The distances are real, the night sky is enormous, and the history is far more layered than the popular image of an empty desert suggests."),

    h("First, understand the size"),
    p("The U.S. Census Bureau measures Brewster County at 6,183.8 square miles of land. That is larger than Connecticut and Rhode Island combined. The 2020 Census counted 9,546 residents, and the Census Bureau's July 2025 estimate was 9,458."),
    p("Those two numbers explain a great deal about life here. Brewster is not merely rural; it is spacious on a scale that changes how people think about errands, emergency services, school trips and a casual drive to the next town. A map can make Alpine, Marathon, Terlingua and the national park look like neighboring stops. On the ground, they are separated by serious West Texas miles."),

    h("Alpine is the county's front porch"),
    p("Alpine is the county seat and its main civic and commercial center. The town took shape with the arrival of the Southern Pacific Railroad in 1882, becoming a transportation and supply point for ranchers and mining operations across the Trans-Pecos."),
    p("The railroad town grew into something unusual for such a remote part of Texas: a courthouse town, university town and tourism base all at once. Sul Ross State University added an educational anchor, while generations of travelers learned to use Alpine as a jumping-off point for Big Bend country."),
    p("In 2026, the Alpine Downtown Historic District was listed in the National Register of Historic Places. The district covers roughly 40 blocks and includes the Brewster County Courthouse and Jail, the Holland Hotel, Hotel Ritchey and buildings made with the pink and red volcanic stone quarried in the Davis Mountains region."),

    h("The courthouse tells the county's origin story"),
    p("Brewster County was created in 1887 from Presidio County territory. Alpine—then transitioning from the name Murpheyville—became the county seat, and the courthouse and jail built that year became physical statements that the new county had arrived."),
    p("The county grew again in 1897 when the short-lived Buchel and Foley counties were abolished and their territory was attached to Brewster. That change helped produce the giant outline Texans recognize today."),
    p("The courthouse remains one of the most useful places to understand Brewster County. In a landscape famous for wilderness, the old county complex is a reminder that the region's history is also about the practical work of building towns, keeping records and creating local government across enormous distances."),

    h("Big Bend is not empty country"),
    p("Calling the Big Bend 'empty' erases much of its story. Archaeological evidence in what is now Big Bend National Park records human presence stretching back thousands of years. Native peoples lived in and traveled through this landscape long before modern borders or county lines existed."),
    p("The region's history is inseparable from Mexico. Mexican and Mexican American families lived, farmed and ranched in the Big Bend before large-scale Anglo-American settlement. Vaquero traditions shaped cattle culture on both sides of the Rio Grande, and communities along the river maintained family and commercial connections that did not fit neatly into a modern border narrative."),
    p("Later came ranches, mines, wax camps, military posts and small agricultural settlements. The ruins scattered through the national park are not props in a wilderness scene; they are traces of communities that tried to make a living in a demanding landscape."),

    h("Terlingua grew from quicksilver"),
    p("Terlingua is now associated with desert tourism, porch conversations, chili and an eccentric off-grid spirit. Its earlier boom came from cinnabar, the ore used to produce mercury—historically called quicksilver."),
    p("Mining drew workers and families into a remote district where an industrial community developed in the desert. When the mining economy faded, much of the settlement did too. The surviving ruins helped create the 'ghost town' identity that later attracted travelers, artists and new residents."),
    p("Modern Terlingua is therefore several places layered together: mining district, borderland community, ghost town, tourism hub and living desert settlement."),

    h("Then Texas gave Big Bend to the nation"),
    p("The movement to preserve the Big Bend accelerated in the 1930s. Texas established a state park precursor, and Congress authorized a national park in 1935. Texas later transferred the assembled land to the federal government, and Big Bend National Park was formally established on June 12, 1944."),
    p("The park now protects more than 800,000 acres. Elevations rise from below 1,800 feet near the Rio Grande to nearly 8,000 feet in the Chisos Mountains, creating dramatic ecological changes within the same park."),
    p("Big Bend's preservation also changed Brewster County's future. Mining and ranching never vanished from the broader regional story, but tourism, conservation, science and outdoor recreation became defining parts of the county's identity and economy."),

    h("A county built out of geology"),
    p("Brewster County is a particularly good place to see that Texas is geologically complicated. Mountain building, volcanic activity, erosion and ancient seas all left evidence here. Big Bend National Park alone has drawn geologists for more than a century because so many chapters of Earth history are exposed in one landscape."),
    p("The Chisos Mountains are the visual centerpiece, but the county also contains desert basins, badlands, canyons, limestone, volcanic formations and the river corridor. The scenery changes quickly enough that a drive can feel like crossing several different versions of West Texas."),

    h("The Rio Grande is both boundary and connector"),
    p("On a political map, the Rio Grande marks the international boundary. In local history, it has also connected communities. Families, trade, ranching and agriculture developed on both sides of the river long before today's border infrastructure."),
    p("That dual identity—border and connection—is essential to understanding Brewster County. Mexican influence is not an imported accent on the region's culture. It is foundational to its settlement, ranching traditions, foodways and history."),

    h("A few Brewster County facts worth keeping"),
    list(
      "Brewster is Texas' largest county by land area, at more than 6,100 square miles.",
      "Alpine became the county seat when Brewster County was organized in 1887.",
      "The county reached its modern size after Buchel and Foley counties were abolished in 1897.",
      "Big Bend National Park was established in 1944 after Texas transferred land for the new national park.",
      "The Chisos Mountains rise to nearly 8,000 feet, while the Rio Grande corridor lies below 1,800 feet in places.",
      "Alpine's historic downtown grew from an 1882 railroad settlement into the civic center of the largest county in Texas.",
      "Terlingua's famous ghost-town landscape grew around a once-important mercury-mining district.",
    ),

    h("What makes Brewster County feel different"),
    p("Plenty of Texas counties have ranches. Plenty have historic courthouses. A few have national parks. Brewster's distinction is the way all of those things coexist at extreme scale."),
    p("You can drink coffee in a university town, pass an 1887 courthouse, drive through open ranch country, stand among mining ruins, climb into a mountain basin and end the day beside an international river—all without leaving one county."),
    p("That is why Brewster County is a fitting place to begin exploring Texas county by county. It demonstrates the central problem with treating Texas as one thing. Inside a single county are Indigenous history, Mexican borderlands, cattle culture, railroad development, mining, conservation, science, tourism, college-town life and some of the wildest public land in the state."),
    p("Brewster County is enormous, but its real appeal is not simply that it occupies the most space on the Texas county map. It is how much Texas history and landscape that space manages to hold."),
  ],
};
