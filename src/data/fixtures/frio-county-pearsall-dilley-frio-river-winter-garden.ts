import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const frioCountyPearsallDilleyFrioRiverWinterGardenArticle: Article = {
  id: "county-frio-pearsall-dilley-frio-river-winter-garden",
  brandId: "texasdefined",
  slug: "frio-county-pearsall-dilley-frio-river-winter-garden-texas",
  title: "Frio County: Pearsall, Dilley, the Frio River and Winter Garden Country",
  dek: "Frio County is a South Texas crossroads shaped by the Frio River, old Spanish roads, ranching, railroad towns, Winter Garden agriculture and the I-35 corridor between San Antonio and the border.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Frio_County_Courthouse_Pearsall_Wiki_%281_of_1%29.jpg?width=1600",
    alt: "Frio County Courthouse in Pearsall, Texas",
    width: 1800,
    height: 1200,
    credit: "Renelibrary · Wikimedia Commons · CC BY-SA 4.0",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-18",
  readingMinutes: 13,
  tags: ["Frio County", "Pearsall Texas", "Dilley Texas", "Frio River", "Winter Garden", "South Texas ranching", "Interstate 35", "Texas history", "Texas counties"],
  featured: false,
  internalLinks: [
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 Texas county references and county guides." },
    { href: "/county/atascosa", label: "Explore Atascosa County", description: "Continue east toward Jourdanton, Pleasanton and the Atascosa River." },
    { href: "/county/la-salle", label: "Explore La Salle County", description: "Follow I-35 south toward Cotulla and the Nueces River." },
    { href: "/county/zavala", label: "Explore Zavala County", description: "Head west toward Crystal City and the Winter Garden." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "See how settlement, distance and courthouse access shaped the Texas county map." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Frio County lies southwest of San Antonio in the Winter Garden region, a broad South Texas landscape where ranch country, irrigated farms and brush meet the Frio River. Pearsall is the county seat and principal commercial center, Dilley anchors the south, and Interstate 35 runs through the county on the long corridor toward Laredo and Mexico."),
    p("The county's history is unusually easy to read in its transportation map. Spanish and Mexican travelers followed old roads across the river country, ranchers built cattle operations around water and grass, Frio City rose along an early road crossing, the railroad shifted power to Pearsall and Dilley, and I-35 later reinforced the same north-south trade axis."),

    h("The river gave the county its name"),
    p("Frio means cold in Spanish, and the Frio River gave its name to the county created in 1858. The river enters from the northwest and crosses the county toward the southeast, while the Leona River and San Miguel Creek drain other parts of the landscape. Frio County belongs to the wider Nueces River basin, linking its water story to South Texas communities far downstream."),
    p("Water has always determined where people could travel, ranch, farm and settle. River crossings became landmarks, wells became stopping places and irrigation later helped transform parts of the county from open range into productive cropland."),

    h("Old roads crossed the county before towns existed"),
    p("The future county lay along routes used by Spanish expeditions between northern Mexico and San Antonio. The Old Presidio Road became one of the important overland connections through the region, carrying soldiers, mail, livestock and travelers across a country where permanent settlements were sparse."),
    p("Those routes passed through lands long used by Indigenous peoples, including Coahuiltecan groups. Missionization, disease, conflict and later settlement disrupted that older world, but the geography that made the area useful to Native travelers also shaped the colonial roads that followed."),

    h("Frio County was created in 1858 but organized later"),
    p("The legislature formed Frio County from parts of Atascosa, Bexar and Uvalde counties in 1858, but the county was not formally organized until 1871. During the intervening years it remained under Bexar County jurisdiction."),
    p("When local government finally organized, the first county seat was established at Frio City near the river and the Presidio Road. The location promised access to water and irrigation, and for a short time it became a lively ranching and governmental center."),

    h("Frio City became a cowboy capital"),
    p("During the 1870s Frio City developed into an important ranching outpost. Cattlemen controlled large herds, stores and public institutions served a growing population, and the town gained a reputation as a rough-edged cowboy center of Southwest Texas."),
    p("Its success depended on roads and river access rather than rail. That became a critical weakness when the next transportation revolution arrived."),

    h("The railroad created Pearsall"),
    p("The International-Great Northern Railroad crossed Frio County in the early 1880s and bypassed Frio City. Around a stopping place known as Waggoner's Well, railroad interests platted a new town in 1882 and named it Pearsall for railroad executive Thomas W. Pearsall."),
    p("Businesses and residents quickly followed the tracks. By 1883 county voters chose Pearsall as the new seat, and much of Frio City's population moved toward the railroad. The old county seat soon declined into a ghost town, leaving one of the clearest examples in Texas of a railroad instantly rearranging political geography."),

    h("Pearsall grew into the county's commercial center"),
    p("Pearsall expanded around the depot with hotels, stores, churches, schools, newspapers, a cotton gin and a substantial mercantile district. Rail access tied local ranches and farms to San Antonio and markets farther north and south."),
    p("The city endured fires, economic cycles and changes in agriculture, but its central position kept it dominant. Today the courthouse, downtown grid and rail-and-highway corridor still reflect the logic that made Pearsall the county seat in the 1880s."),

    h("Dilley grew from another railroad stop"),
    p("Dilley developed in southern Frio County along the same railroad system. The settlement was associated with a nearby crossing of the Frio River and was known by earlier names before becoming Dilley in the late nineteenth century."),
    p("By the early twentieth century Dilley had become a shipping point for cattle, vegetables and fruit, with banks, churches, stores, hotels and a cotton gin. It remains the county's second major town and an important stop on I-35."),

    h("Ranching shaped the open country"),
    p("Cattle and sheep dominated early economic life. Large ranges took advantage of grasslands and brush country, while barbed wire and fencing gradually replaced the open-range system. Ranchers introduced improved livestock breeds and planted feed crops to support more intensive operations."),
    p("Heavy grazing also changed the vegetation. Native grass cover declined in some areas, while cactus and brush spread. Ranchers adapted with new tools and practices, including methods for burning thorns from prickly pear so cattle could use the cactus during drought."),

    h("The Winter Garden turned water into crops"),
    p("Frio County forms part of the Winter Garden, a South Texas agricultural belt known for irrigated vegetables and specialty crops. Wells, river water and later mechanized farming supported production beyond what rainfall alone could sustain."),
    p("Cotton, corn, forage, peanuts, melons, vegetables and fruit all appeared in the county's agricultural economy. By the twentieth century the county was especially known for peanuts and watermelons, while larger farms increasingly replaced smaller operations as machinery costs rose."),

    h("Honey was once a major product"),
    p("Frio County also developed a notable beekeeping industry. Native brush plants such as guajillo, whitebrush and catclaw provided nectar, while cultivated crops added more forage. In the mid-twentieth century the county ranked among Texas leaders in honey production."),
    p("That history is a reminder that the South Texas brush country is biologically productive even when it appears dry or sparse from the highway."),

    h("Roads followed the same trade logic as the railroad"),
    p("As automobiles replaced rail for many trips, paved highways strengthened Frio County's place on the San Antonio-to-border corridor. Early paved routes connected Pearsall and Dilley to larger markets, and Interstate 35 eventually became the dominant transportation spine."),
    p("Today I-35 carries freight, commuters, oilfield traffic and long-distance travelers through Moore, Pearsall and Dilley. The corridor gives Frio County an economic role far larger than its population might suggest."),

    h("Oil and gas added new cycles of growth"),
    p("Energy exploration brought another layer to the county economy. Oil booms periodically boosted Pearsall and surrounding areas, and newer drilling technologies opened additional formations across South Texas."),
    p("Energy activity brought service businesses, mineral income, trucking and infrastructure demand while coexisting with ranching and agriculture. Like many counties in the region, Frio has learned to live with boom-and-bust cycles without abandoning its older land-based economy."),

    h("Bigfoot preserves frontier folklore"),
    p("Northeastern Frio County includes the community of Bigfoot, named for Texas frontiersman William A. A. 'Bigfoot' Wallace. Wallace became one of the legendary figures of nineteenth-century Texas through his service as a ranger, soldier, scout and mail carrier."),
    p("The community and local museum tradition keep that frontier story visible, adding another historical layer beyond the better-known railroad towns of Pearsall and Dilley."),

    h("Frio Town survives as a historical memory"),
    p("Old Frio City, later called Frio Town, never recovered after Pearsall captured the railroad and county seat. Much of the original town disappeared, but the site remains important because it preserves the county's pre-railroad political geography."),
    p("Its story also illustrates a recurring Texas pattern: towns built around trails and river crossings could decline almost overnight when railroad companies chose a different route."),

    h("Pearsall remains the practical base for exploring"),
    p("Visitors can begin in Pearsall with the Frio County Courthouse and the historic downtown area, then follow local roads toward the older settlement landscape. The courthouse anchors the county's civic identity and provides the clearest public landmark for understanding Pearsall's role."),
    p("From there, a drive south on I-35 to Dilley shows the agricultural and transportation corridor, while a trip northeast toward Bigfoot adds ranching and frontier history."),

    h("The county is still mostly private land"),
    p("As in much of South Texas, most ranches, riverbanks and hunting country are privately owned. Public exploration works best through towns, museums, historical markers, courthouse grounds and state or county roads rather than by assuming access to open land."),
    p("The long road views are part of the experience: brush, fields, cattle, pump jacks, irrigation equipment and freight traffic all reveal how the modern county economy is layered across the landscape."),

    h("Frio County connects several South Texas regions"),
    p("Atascosa County lies to the east, Zavala County and the Winter Garden extend west, Medina County reaches north toward the San Antonio region, and La Salle County continues south toward Cotulla. Frio County sits in the middle of those systems rather than belonging entirely to any one of them."),
    p("That location explains its history as a corridor. Spanish roads, cattle trails, railroads and interstate traffic all used the county as a route between San Antonio, the interior borderlands and northeastern Mexico."),

    h("What defines Frio County"),
    p("Frio County is defined by movement and adaptation. The river gave it a name, roads gave Frio City a reason to exist, the railroad created Pearsall and Dilley, irrigation made the Winter Garden productive, and I-35 turned the same landscape into a modern freight corridor."),
    p("Yet the older South Texas identity remains visible in ranches, brush, cattle, courthouse towns and the memory of river crossings. Frio County rewards anyone willing to look beyond the interstate and see how each transportation era left a new layer without erasing the last one."),
  ],
};
