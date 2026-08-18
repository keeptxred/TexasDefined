import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const edwardsCountyRockspringsDevilsSinkholeNuecesPlateauArticle: Article = {
  id: "county-edwards-rocksprings-devils-sinkhole-nueces-plateau",
  brandId: "texasdefined",
  slug: "edwards-county-rocksprings-devils-sinkhole-nueces-plateau-texas",
  title: "Edwards County: Rocksprings, Devil's Sinkhole and the Headwaters Country",
  dek: "Edwards County spreads across a rugged piece of the Edwards Plateau where Rocksprings, spring-fed river headwaters, sheep and goat ranches, limestone caves and Devil's Sinkhole define one of Texas's most sparsely settled landscapes.",
  category: "texas-history",
  region: "hill-country",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Edwards_county_tx_courthouse.jpg?width=1600",
    alt: "Edwards County Courthouse in Rocksprings, Texas",
    width: 1506,
    height: 1030,
    credit: "Larry D. Moore · Wikimedia Commons · CC BY 4.0",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-18",
  readingMinutes: 8,
  tags: [
    "Edwards County",
    "Rocksprings",
    "Devil's Sinkhole",
    "Edwards Plateau",
    "Nueces River",
    "wool and mohair",
    "Texas Hill Country",
    "Texas counties",
  ],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 Texas county references and county guides." },
    { href: "/county/kinney", label: "Explore Kinney County", description: "Continue south toward Brackettville, Fort Clark and Las Moras Springs." },
    { href: "/county/val-verde", label: "Explore Val Verde County", description: "Head west toward Del Rio, Amistad and the Lower Pecos canyon country." },
    { href: "/county/real", label: "Explore Real County", description: "Follow the plateau east toward Leakey, the Frio River and Hill Country canyons." },
    { href: "/county/kerr", label: "Explore Kerr County", description: "Continue east toward Kerrville and the upper Guadalupe River." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how distance, settlement and courthouse access shaped the Texas county map." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Edwards County occupies a high, rocky stretch of southwest Texas where the Hill Country gives way to the broader Edwards Plateau. Rocksprings sits near the center of a county of more than two thousand square miles, but most of the land beyond town remains ranch country. Limestone ridges, oak and juniper, dry draws, caves and clear spring-fed headwaters make the landscape feel both austere and unexpectedly alive."),
    p("Water explains much of the county's geography. The headwaters of the Nueces, West Nueces and Llano systems rise in or near Edwards County, and more than a dozen springs have historically flowed year-round. In a region where rainfall is limited and soils are thin, those springs and creeks shaped ranch locations, travel routes, wildlife habitat and settlement."),

    h("Edwards County grew from the nineteenth-century Texas frontier"),
    p("Texas created Edwards County from Bexar County in 1858, but sparse settlement delayed formal organization until 1883. The county was named for Haden Edwards, an early Anglo colonizer in East Texas. Its boundaries changed again when Real County was created from the eastern portion in 1913, leaving Edwards County with the broad plateau geography familiar today."),
    p("The region had a much older human history. Lipan Apache and other Indigenous peoples used the springs, canyons and hunting country long before permanent Anglo settlement. Spain attempted Mission San Lorenzo de la Santa Cruz in the eighteenth century, but the rugged interior resisted the dense mission-and-town settlement pattern seen farther south."),

    h("Rocksprings became the county seat because water made a town possible"),
    p("Rocksprings developed around natural springs at the junction of routes that later became U.S. 377 and State Highway 55. J. R. Sweeten selected the townsite in 1891, and voters moved the county seat there that same year. The settlement quickly gathered the essential institutions of a ranching county: courthouse, stores, hotel, blacksmith, doctors, lawyers and livestock businesses."),
    p("The courthouse remains the strongest civic landmark in town. The current limestone building dates from the late nineteenth century and survived the destructive 1927 Rocksprings tornado, one of the deadliest tornadoes in Texas history. Its rough-cut stone walls fit the county unusually well: a formal public building made from the same limestone that shapes the surrounding plateau."),

    h("The 1927 tornado left a lasting mark on Rocksprings"),
    p("On April 12, 1927, a violent tornado struck Rocksprings and devastated much of the community. Homes and businesses were destroyed, dozens of people died, and a large share of the town was injured. The disaster became a defining episode in local history because nearly every family and institution was affected."),
    p("Rebuilding reinforced Rocksprings as the county's service center. The courthouse survived, and the town gradually restored homes, businesses and public life. The event remains part of how residents understand the endurance required to maintain a small community in an exposed and sometimes severe landscape."),

    h("Sheep and Angora goats made wool and mohair part of the county's identity"),
    p("Thin rocky soils made much of Edwards County poorly suited to row-crop farming, but the open plateau was well suited to grazing. Cattle, sheep and Angora goats became the economic foundation of large ranches. Rocksprings emerged as an important center for wool and mohair, linking local ranchers to buyers and processing markets far beyond the county."),
    p("The industry shaped local culture as much as economics. Ranch work, livestock judging, shearing, fencing, predator control and water management became everyday knowledge. The Angora Goat Breeders Association Museum and local festivals preserve that heritage, while modern ranches often combine livestock with hunting leases, wildlife management and conservation income."),

    h("Devil's Sinkhole reveals the hidden limestone world beneath the plateau"),
    p("About six miles northeast of Rocksprings, Devil's Sinkhole opens as a roughly fifty-foot-wide shaft in the limestone. The cavern expands dramatically below ground and reaches about 350 feet deep. Texas Parks and Wildlife manages the surrounding land as Devil's Sinkhole State Natural Area, a National Natural Landmark accessible only through guided tours."),
    p("The cave is famous for its seasonal Mexican free-tailed bat colony. On warm evenings, as many as several million bats can emerge in a spiraling column to feed on insects. The spectacle makes the sinkhole one of the county's strongest visitor draws, but the site is protected first as a sensitive geological and biological resource rather than as a conventional walk-in park."),

    h("Caves, springs and canyons are all products of the same geology"),
    p("Edwards County sits on thick limestone formations that dissolve slowly as water moves through cracks and bedding planes. Over time that process creates caves, sinkholes, underground channels and powerful springs. The result is classic karst country: much of the county's water story happens below ground before streams appear at the surface."),
    p("That geology also makes groundwater stewardship important. Springs and river headwaters depend on recharge that can be affected by drought, pumping and land use. Ranchers, conservation groups and public agencies therefore share an interest in keeping the thin soils and recharge areas functioning across a landscape where water is valuable precisely because it is not abundant everywhere."),

    h("The Nueces headwaters connect Edwards County to South Texas"),
    p("The Nueces River begins in the limestone country of the plateau before flowing south and east toward the Coastal Bend. In Edwards County and nearby Real County, the upper river is much smaller and clearer than the broad South Texas river it becomes downstream. Spring-fed tributaries create narrow green corridors through otherwise dry ranchland."),
    p("The West Nueces follows a similarly rugged route before joining the larger watershed farther south. These headwaters support wildlife, ranching and recreation, and they tie Edwards County hydrologically to communities far beyond its borders. Decisions about groundwater and watershed health on the plateau can matter many miles downstream."),

    h("Barksdale and Carta Valley show the county beyond Rocksprings"),
    p("Rocksprings contains most county services, but smaller communities help explain the enormous rural geography. Barksdale lies in the eastern part of the county near the Nueces River corridor and marks the transition toward the river canyons of Real County. Carta Valley sits in western ranch country on the long route toward Del Rio and the borderlands."),
    p("These places are not suburban satellites of the county seat. They are service points and community anchors for ranches spread over great distances. School, church, mail, emergency response and road access take on particular importance where the next town may be many miles away."),

    h("Wildlife and hunting became a second economy on the ranch landscape"),
    p("White-tailed deer, turkey, javelina, quail and other wildlife thrive across much of the plateau. Hunting leases and wildlife management became important supplements to traditional ranch income, encouraging landowners to think about brush, water, forage and habitat as economic assets as well as ecological systems."),
    p("Devil's Sinkhole adds another layer to that conservation story. Above ground, the natural area protects typical Edwards Plateau vegetation and habitat; below ground, it shelters bats and unusual cave life. The county's caves and ranches together demonstrate that low-density land use can still require careful management if water, habitat and dark-sky conditions are to remain intact."),

    h("Rocksprings remains the practical center of an enormous county"),
    p("County government, schools, ranch supply businesses, lodging and basic services concentrate in Rocksprings because the surrounding population is so dispersed. U.S. 377 and State Highway 55 make the town a crossroads between Junction and Del Rio, Sonora and Uvalde, and the river country farther east."),
    p("The economy is broader than wool and mohair alone. Ranching, hunting, tourism, government, small businesses and energy production all contribute. Yet the visual character of Edwards County still comes from open ranchland rather than dense development, and that continuity is one of the county's greatest distinctions."),

    h("How to explore Edwards County"),
    p("Begin on the courthouse square in Rocksprings, where the limestone courthouse and compact downtown establish the county's civic story. The Devil's Sinkhole Visitor Center is also in town; access to the natural area itself is by reserved guided tour, so visitors should plan ahead rather than simply driving to the cave."),
    p("From Rocksprings, drive east toward Barksdale for a look at the Nueces headwaters country or west toward Carta Valley for the more open ranch landscape. The distances and sparse development are not empty space—they are the defining experience of Edwards County, where geography is best understood from the road between communities."),

    h("What defines Edwards County"),
    p("Edwards County is defined by limestone, water and ranching. Springs rise from a porous plateau, rivers begin in narrow canyons, and Devil's Sinkhole opens into a vast underground chamber. Above that hidden hydrology, generations of ranchers built an economy around sheep, Angora goats, cattle and wildlife."),
    p("Rocksprings gives the county a civic center, but the county's identity belongs equally to the spaces beyond town: oak-juniper hills, caves, spring-fed draws and enormous ranches. It is a Texas landscape where the most important features are often the least obvious—water moving underground, bats gathering beneath the surface and headwaters beginning as small clear streams before crossing much of the state."),
  ],
};
