import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const texasRedRiverWarGuideArticle: Article = {
  id: "evergreen-texas-red-river-war-guide",
  brandId: "texasdefined",
  slug: "texas-red-river-war-guide",
  title: "The Red River War in Texas: Adobe Walls, Palo Duro Canyon and the End of the Southern Plains Frontier",
  dek: "The 1874–1875 Red River War was the U.S. Army campaign that forced Comanche, Kiowa, Southern Cheyenne and Arapaho peoples from the Texas Panhandle onto reservations. Adobe Walls, Palo Duro Canyon, bison destruction and a five-column military campaign explain how the Southern Plains changed so quickly.",
  category: "texas-history",
  region: "panhandle-plains",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ledger-sm2.jpg?width=1600",
    alt: "Kiowa ledger drawing from 1874 possibly depicting the Battle of Buffalo Wallow during the Red River War",
    width: 780,
    height: 442,
    credit: "Kiowa ledger drawing · 1874 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-19",
  readingMinutes: 18,
  tags: [
    "Red River War",
    "Adobe Walls",
    "Palo Duro Canyon",
    "Quanah Parker",
    "Comanche history",
    "Kiowa history",
    "Southern Cheyenne history",
    "Texas Panhandle history",
    "Texas military history",
  ],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/archeological-spotlight/red-river-war-battle-sites-project",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place the Red River War between the post-Civil War frontier Army and the end of large-scale Native resistance on the Southern Plains." },
    { href: "/article/texas-frontier-forts-road-trip", label: "Texas frontier forts road trip", description: "See the Army road-and-post system that supported campaigns across western Texas." },
    { href: "/article/buffalo-soldiers-texas-frontier-guide", label: "Buffalo Soldiers in Texas", description: "Connect the campaign era with Black Regular Army service at Texas frontier posts." },
    { href: "/article/texas-cattle-ranching-history-guide", label: "Texas cattle and ranching history", description: "Continue into the ranching economy that expanded across the Panhandle immediately after Native removal and bison destruction." },
    { href: "/destination/palo-duro-canyon-state-park", label: "Palo Duro Canyon", description: "Visit the landscape of the decisive September 1874 attack and one of the most dramatic public landscapes in the Panhandle." },
    { href: "/destination/goodnight-ranch", label: "Goodnight Ranch", description: "Connect the war's aftermath with Charles Goodnight, the JA Ranch and the rapid conversion of the Panhandle into cattle country." },
    { href: "/county/randall", label: "Randall County guide", description: "Use Canyon and Palo Duro Canyon as a practical base for the southern part of the Red River War landscape." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history hub and its connected military, Indigenous and frontier guides." },
  ],
  relatedCollections: [],
  relatedDestinations: ["palo-duro-canyon-state-park", "goodnight-ranch"],
  body: [
    p("The Red River War of 1874–1875 was not one battle and it was not simply a final chapter in a generic “Indian Wars” story. It was a coordinated U.S. Army campaign, fought largely across the Texas Panhandle, to end the ability of Comanche, Kiowa, Southern Cheyenne and Arapaho bands to remain on the Southern Plains outside the reservation system. The campaign destroyed villages, food stores and horse herds while the commercial slaughter of bison was simultaneously collapsing the economic foundation of Plains life."),
    p("The war therefore changed much more than military control. It accelerated the forced removal of Native peoples from the Panhandle, opened the region to large-scale ranching and settlement, and helped transform one of North America's great Indigenous homelands into the cattle-and-railroad landscape familiar from later Texas history. Palo Duro Canyon is the best-known surviving place connected to the campaign, but its meaning is clearer when Adobe Walls, bison hunting and the wider five-column strategy are understood first."),

    h("Before 1874, the Panhandle was part of a living Southern Plains world"),
    p("Comanche power had shaped the Southern Plains for generations. Kiowa, Southern Cheyenne and Arapaho peoples also moved through and used the region, while trade networks connected Native communities with New Mexico, Mexico, Texas and other Plains societies. Horses made long-distance movement, hunting and warfare possible on a scale that defined the eighteenth- and nineteenth-century Plains."),
    p("U.S. expansion steadily narrowed that world. Roads, forts and settlements pushed west. Treaties attempted to confine Native nations to reservations in Indian Territory, while hunters and commercial traffic entered lands that Native communities still used. Promised supplies were often inadequate, and many Native people had powerful reasons to distrust federal policy and resist confinement."),
    p("At the same time, commercial hide hunters were killing Southern Plains bison in enormous numbers. Bison provided food, clothing, shelter materials, tools and trade goods. Their destruction was therefore both an ecological catastrophe and a direct assault on the ability of Plains communities to remain economically independent."),

    h("June 27, 1874: Adobe Walls becomes the spark"),
    p("In 1874 a small settlement of professional bison hunters operated near the abandoned Adobe Walls trading-post site north of the Canadian River. The Texas Historical Commission describes a group of 28 men and one woman at the post when several hundred Native warriors attacked before dawn on June 27."),
    p("Comanche leader Quanah Parker was among the prominent participants, and the Comanche medicine man and prophet Isa-tai had encouraged confidence that the hunters could be defeated. The defenders, however, possessed heavy long-range buffalo rifles and a protected position. The assault failed to overrun the post."),
    p("Adobe Walls became famous in settler memory for the defenders' marksmanship, including the later story of Billy Dixon's exceptionally long rifle shot. Its deeper significance is that the fight convinced federal officials that the conflict over the Southern Plains would not be contained by existing reservation policy. The Army prepared a much larger campaign."),

    h("The Army answered with five converging columns"),
    p("Instead of chasing mobile Native bands with one force, the Army sent multiple columns into the Panhandle from different directions. The strategy was to keep Comanche, Kiowa, Cheyenne and Arapaho groups moving, deny them rest and supplies, and make the canyons and river valleys that had long provided refuge increasingly difficult to use."),
    p("The Texas Historical Commission's archeological work has documented a chain of engagements across the region, including the Battle of Red River, Lyman's Wagon Train, Buffalo Wallow, Sweetwater Creek and Palo Duro Canyon. These were not isolated dots on a map. Together they show an Army campaign designed to compress an enormous operating space until Native communities could no longer sustain themselves away from the reservations."),
    p("Logistics mattered as much as combat. Soldiers depended on wagon trains, scouts, remounts and water. Native fighters repeatedly attacked supply routes because an Army column without food, ammunition or forage could not remain in the field. The war was therefore a struggle over mobility and resources as much as a series of firefights."),

    h("September 28: Palo Duro Canyon breaks the refuge system"),
    p("Palo Duro Canyon offered water, shelter, grass and concealment in an otherwise exposed Panhandle landscape. On September 28, 1874, Colonel Ranald S. Mackenzie and the 4th U.S. Cavalry descended into the canyon and surprised villages occupied by Comanche, Kiowa and Cheyenne families."),
    p("The people escaped the immediate attack, but the Army captured approximately 1,400 horses and destroyed lodges and winter food stores. Mackenzie kept some horses for Army use and scouts and ordered most of the rest killed. Texas Parks and Wildlife describes the loss of horses and supplies as decisive because families facing winter could no longer move, hunt and sustain themselves in the same way."),
    p("The Battle of Palo Duro Canyon is sometimes described simply as a U.S. military victory. That wording can hide what made it effective. The decisive act was the destruction of the material system that allowed Native families to remain on the Plains. The campaign targeted the ability to live independently, not only the ability of warriors to fight a set-piece battle."),

    h("The war ended as the bison economy collapsed"),
    p("Fighting and pursuit continued after Palo Duro. Through the winter of 1874–1875, bands surrendered or returned to reservations as horses, food and options disappeared. By the spring of 1875, the Army had achieved its strategic objective of ending organized Native resistance across the Texas Panhandle."),
    p("Quanah Parker and the Kwahadi Comanches were among the last major Comanche groups to come into Fort Sill in 1875. Quanah later became one of the most influential Comanche leaders of the reservation era, navigating ranching, business, federal policy and the preservation of Comanche identity in a world transformed by military defeat."),
    p("The destruction of the bison herds continued the same transformation through economic means. Commercial hunters had already reduced the animals dramatically before the campaign. Once Native military resistance ended, hide hunting, ranching, roads and eventually railroads accelerated across the region."),

    h("Within two years, cattle ranching moved into Palo Duro"),
    p("The speed of the transition is striking. Charles Goodnight drove cattle into Palo Duro Canyon in 1876, and the JA Ranch was founded the following year with John Adair. The canyon that had sheltered Native families during the Red River War became the headquarters landscape of one of the great Panhandle cattle operations."),
    p("That sequence is why the Red River War belongs beside Texas ranching history rather than in a separate military silo. Ranch expansion did not simply follow an empty frontier. It followed military removal, the destruction of bison and federal policies that transferred control of land and resources away from Native nations."),

    h("The battlefield record survived because archeology corrected the written record"),
    p("Many Red River War battle locations were quickly obscured by ranching, roads and settlement. Beginning in 1998, the Texas Historical Commission launched a major archeological project to locate and document significant battle sites, evaluate them for National Register listing and study their heritage-tourism potential."),
    p("Artifacts such as cartridge cases, bullets, military hardware and camp material allowed researchers to test nineteenth-century written accounts against physical evidence. That matters because most surviving official reports were written by U.S. Army participants. Archeology can reveal movement, firing positions and battlefield boundaries that written narratives missed or misunderstood."),

    h("How to read the Red River War landscape today"),
    p("Palo Duro Canyon State Park is the strongest public landscape for understanding the campaign. The canyon's scale, steep walls and hidden floor make the strategic value of the refuge immediately visible. Visitors should treat the park as both a natural destination and a site of Indigenous displacement rather than allowing the scenic landscape to erase the human history."),
    p("The Texas Historical Commission's Red River War Battle Sites Project and Texas History Navigator provide the better framework for the wider campaign because many battle locations are remote, lightly interpreted or not appropriate for casual visitation. Historical markers and museum collections can be more useful than attempting to reach an archeological site on private land."),
    p("Goodnight Ranch adds the crucial aftermath. Pairing Palo Duro with Goodnight turns a military story into a before-and-after landscape: first the destruction of Native independence on the Southern Plains, then the rapid rise of the cattle economy that came to define the Panhandle in popular memory."),
    list(
      "Start with the Texas Historical Commission's Red River War project for the campaign map and archeological context.",
      "Visit Palo Duro Canyon for the decisive September 1874 landscape and interpret it as both a battlefield and a Native homeland.",
      "Use museums and official historical markers for remote battle sites rather than assuming every mapped battlefield is publicly accessible.",
      "Pair the campaign with Goodnight Ranch and Panhandle ranching history to understand what changed immediately after 1875.",
      "Keep Comanche, Kiowa, Cheyenne and Arapaho perspectives visible; the campaign's military success was inseparable from forced removal and the destruction of the bison-based Plains economy."
    ),

    h("Why the Red River War is a hinge in Texas history"),
    p("The Red River War sits at the hinge between two versions of the Texas Panhandle. Before 1874, the region remained part of a Native-controlled Southern Plains world in which the U.S. Army could travel and fight but could not dictate everyday life across the landscape. After 1875, military resistance had been broken, bison were disappearing and ranchers entered on a scale that would have been impossible only a few years earlier."),
    p("That is why the campaign belongs near the center of Texas military, Native and ranching history. It explains not merely how one war ended, but how control of the Panhandle changed hands—and why the cattle empire that followed seemed to appear almost overnight."),
  ],
};
