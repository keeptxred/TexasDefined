import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const bexarCountySanAntonioMissionsRiverArticle: Article = {
  id: "county-bexar-san-antonio-missions-river",
  brandId: "texasdefined",
  slug: "bexar-county-san-antonio-missions-river-texas",
  title: "Bexar County: San Antonio, the Missions and a River-Shaped Texas Crossroads",
  dek: "The San Antonio River, Spanish missions, military institutions, old farming communities and fast-growing suburbs make Bexar County one of the clearest places to read the long arc of Texas history in a living modern landscape.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "/images/explore/historic-sites/san-antonio-missions-national-historical-park.jpg",
    alt: "Spanish colonial mission architecture at San Antonio Missions National Historical Park in Bexar County, Texas",
    width: 1600,
    height: 1099,
    credit: "U.S. Department of the Interior · CC BY-SA 2.0 · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-11",
  readingMinutes: 10,
  tags: [
    "Bexar County",
    "San Antonio",
    "San Antonio Missions",
    "San Antonio River",
    "The Alamo",
    "Joint Base San Antonio",
    "South Texas",
    "Spanish Texas",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/destination/san-antonio-missions-national-historical-park",
      label: "San Antonio Missions National Historical Park",
      description: "Explore Mission Concepción, San José, San Juan and Espada along the San Antonio River.",
    },
    {
      href: "/destination/the-alamo",
      label: "The Alamo",
      description: "Visit Mission Valero and the best-known surviving landmark of the Texas Revolution.",
    },
    {
      href: "/destination/san-antonio-river-walk",
      label: "San Antonio River Walk",
      description: "Follow the urban river corridor through downtown San Antonio and beyond.",
    },
    {
      href: "/browse/counties",
      label: "Browse Texas counties",
      description: "Explore all 254 county references and guides.",
    },
    {
      href: "/article/why-texas-has-254-counties",
      label: "Why Texas has 254 counties",
      description: "How settlement, distance and government shaped the Texas county map.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: [
    "san-antonio-missions-national-historical-park",
    "the-alamo",
    "san-antonio-river-walk",
  ],
  body: [
    p("Bexar County is often introduced through San Antonio, but the county makes more sense when the city is treated as the center of a much larger landscape rather than the whole story. The San Antonio River and its springs shaped Indigenous life long before Europeans arrived. Spanish missions, a presidio and a civilian settlement then turned the river corridor into one of the most important colonial centers in Texas. Military posts, railroads, ranches, farms, highways and suburban growth layered themselves onto that older geography. Today the county stretches from dense urban neighborhoods to limestone-edged northern hills and flatter agricultural country to the south and east. Its identity is not one era or one landmark; it is the accumulation of several Texas histories that remain visible at the same time."),

    h("The river came before the city"),
    p("The basic geography of Bexar County begins with water. The San Antonio River rises from springs in the north-central part of the county and flows south through the modern city before continuing toward the Gulf Coast. Indigenous peoples knew this waterway long before Spanish settlement; the National Park Service notes the name Yanaguana in connection with Indigenous traditions of the river. Springs, creeks and river-bottom habitats offered water, plants, game and travel corridors in a region where dependable water could determine where people lived and moved."),
    p("That same water system explains why Spanish settlement concentrated here. The river could support people, livestock and irrigated agriculture, while its position between northern New Spain and East Texas made the area useful as a frontier outpost. Even modern Bexar County still follows that environmental logic. Parks, neighborhoods, roads, flood-control projects and development patterns repeatedly meet the same river valleys and drainage systems that shaped earlier settlement."),

    h("Mission communities transformed the San Antonio River corridor"),
    p("Beginning in 1718, Spanish officials and Franciscan missionaries established a chain of mission communities along the San Antonio River. Mission Valero, later known as the Alamo, began the sequence. Mission San José followed in 1720, while Mission Concepción, Mission San Juan and Mission Espada were relocated to the San Antonio area in 1731. These were not simply churches placed on an empty frontier. They were colonial communities that combined religious conversion, farming, ranching, workshops, defense and political expansion."),
    p("The people who entered the missions included Indigenous families from many distinct South Texas groups that Spanish records often placed under the broad label Coahuiltecan. National Park Service interpretation emphasizes that the missions brought profound disruption as well as cultural exchange. Indigenous residents supplied most of the mission population and much of the labor, while Spanish institutions pushed new religion, language, farming methods and settlement patterns. Descendant communities remain connected to these places, and the mission churches continue to function as active parishes. That continuity is why the missions are more than preserved architecture: they are still part of living Bexar County communities."),

    h("Acequias turned water into an agricultural system"),
    p("One of the most revealing features of mission-era Bexar County is easy to overlook because it lies low in the landscape. The missions depended on acequias, irrigation ditches that diverted river water into fields. Gravity carried water through channels engineered to serve cropland, workshops and communities. The National Park Service describes surviving acequias as part of an agricultural system that allowed crops such as corn, beans, squash and peppers to grow in the South Texas climate."),
    p("The acequias are important because they connect architecture to ecology. The missions could not have functioned as self-supporting communities without controlling water. Remnants and working portions of that system still help explain why the mission chain follows the river so closely. They also make Bexar County's colonial story physical: the same waterway that drew settlement still runs beside fields, neighborhoods, parks and restored river habitat today."),

    h("San Fernando created a civilian center beside the missions"),
    p("The Spanish colonial settlement was never only a mission network. In 1731 Canary Island settlers established the villa of San Fernando de Béxar near the presidio and missions, creating a formal civilian government. The Bexar County government traces the county's name through San Antonio de Béxar and the earlier Presidio San Antonio de Béjar. Over time the spelling became Bexar, while the local pronunciation evolved into the familiar 'Bear.'"),
    p("That civilian settlement helped give San Antonio a role different from many frontier posts. It became an administrative, commercial and cultural center as well as a military and religious one. Streets, plazas and property patterns grew around Spanish institutions, then adapted through Mexican rule, the Republic of Texas and statehood. Modern downtown San Antonio still occupies that inherited civic landscape, even though later construction has transformed nearly every block around it."),

    h("The Alamo is only one chapter in the county's revolutionary landscape"),
    p("Mission Valero became the Alamo and, through the 1836 battle, the most internationally recognized historic site in Bexar County. Its importance is real, but treating the county only through the Alamo compresses a much longer story into thirteen days. San Antonio de Béxar had already been a Spanish and Mexican political center for generations. Tejano families, soldiers, merchants, Indigenous residents and newcomers all shaped the community before the Texas Revolution began."),
    p("The revolution also changed Bexar County's political geography. When the Republic of Texas created Bexar County in December 1836, the county was enormous, reaching far beyond the boundaries familiar today. Bexar County's own historical account notes that 128 later counties were eventually carved from territory associated with the original county. The modern county is therefore a remnant of an earlier administrative map that treated San Antonio as the governing center for much of western Texas."),

    h("The missions became a World Heritage landscape"),
    p("In 2015 UNESCO inscribed the San Antonio Missions as a World Heritage Site. The designation includes five mission complexes and associated cultural landscape features. Four missions—Concepción, San José, San Juan and Espada—form San Antonio Missions National Historical Park, while Mission Valero is the Alamo. UNESCO emphasizes the missions as evidence of interaction between Spanish and Indigenous cultures, visible not only in churches but also in residences, agricultural lands, ranching, workshops and water-distribution systems."),
    p("For Bexar County, the World Heritage designation matters because it recognizes a landscape rather than a single monument. The mission corridor stretches south from downtown along the river. Walking, driving or cycling between the sites reveals neighborhoods, parish life, river restoration and old agricultural ground between the stone compounds. The distance between missions helps restore the scale of the original system in a way that a single-site visit cannot."),

    h("The military became one of Bexar County's defining institutions"),
    p("San Antonio's military role did not end with the Spanish presidio. The United States Army established a presence in the city in the nineteenth century, and Fort Sam Houston grew into one of the country's important military installations. In the twentieth century aviation and training expanded the military geography across Bexar County. Lackland developed from the World War II-era San Antonio Aviation Cadet Center, while Randolph Field became a major flying-training base. Camp Bullis occupied a large tract of rugged land in northwestern Bexar County for military training."),
    p("Those installations now operate within Joint Base San Antonio, which combines Fort Sam Houston, Lackland and Randolph with additional operating locations. The military presence is visible far beyond base gates. It shapes employment, medical institutions, contracting, transportation, neighborhoods and the steady movement of service members and families into and out of the county. In a place often marketed for tourism and heritage, defense remains one of the most consequential parts of the local economy and culture."),

    h("Growth pushed Bexar County far beyond the old city"),
    p("San Antonio remains the county seat and dominant city, but contemporary Bexar County includes a ring of independent municipalities and suburban communities that complicate any simple city-versus-country picture. Alamo Heights, Terrell Hills, Olmos Park, Balcones Heights, Leon Valley, Castle Hills, Converse, Kirby, Live Oak, Universal City and other municipalities each developed their own civic identities within the larger metropolitan fabric. Unincorporated areas continue beyond them, particularly toward the county edges."),
    p("Northern Bexar County reaches into limestone Hill Country terrain, where development climbs ridges and follows creek valleys. To the south, the land opens toward the South Texas plains and the mission corridor. Eastern Bexar County contains long-established communities intertwined with military and industrial growth, while western areas have absorbed some of the region's fastest suburban expansion. The result is a county where an eighteenth-century mission acequia and a new master-planned subdivision can belong to the same local geography."),

    h("Transportation repeatedly remade the county"),
    p("Bexar County's position as a crossroads long predates the interstate highway system. Indigenous travel routes, Spanish roads and the Camino Real connected San Antonio to Mexico, East Texas and other frontier settlements. Nineteenth-century wagon and stage routes reinforced the city's regional role. Railroads then tied San Antonio more closely to national markets, supporting livestock, freight, military logistics and urban growth."),
    p("Modern highways expanded that pattern on a metropolitan scale. Interstate 10, Interstate 35, Interstate 37, Loop 410 and Loop 1604 organize much of today's development, with commercial corridors and subdivisions spreading outward from interchanges. These roads made distant parts of the county easier to reach, but they also created a geography of long commutes, frontage-road commerce and rapid land conversion. To understand modern Bexar County, it helps to see highways as another layer on a much older transportation landscape."),

    h("The economy is broader than tourism"),
    p("Visitors naturally associate Bexar County with the Alamo, River Walk, conventions, restaurants and major attractions, and hospitality remains highly visible. But the county's economy is much broader. Federal and military employment, health care, bioscience, higher education, finance, logistics, construction, manufacturing, retail and professional services all operate at metropolitan scale. Census business data show a large and diverse employer base, while Joint Base San Antonio anchors a defense network that reaches into medicine, cybersecurity, aviation and contracting."),
    p("This diversity helps explain why Bexar County can feel like several economies sharing one map. Downtown and the river corridor depend heavily on visitors and institutions. Military districts support specialized services and housing markets. Medical and university centers create their own employment clusters. Industrial and logistics facilities follow highway and rail corridors. New residential development then pushes demand for schools, roads, utilities, retail and public services farther toward the county edges."),

    h("Food and culture carry older mixtures forward"),
    p("Bexar County's cultural identity grew from centuries of contact among Indigenous, Spanish, Mexican, Tejano, German, Anglo, Black and other communities. That history is visible in language, architecture, religious traditions, music and food. San Antonio's culinary reputation is not just a collection of famous dishes; it reflects borderlands exchange, migration and neighborhood continuity. Markets, bakeries, barbecue restaurants, taquerias and family kitchens preserve overlapping traditions rather than a single definition of South Texas food."),
    p("The same is true of festivals and public spaces. Historic plazas, mission parishes, neighborhood celebrations, rodeo traditions, military ceremonies and major civic events all belong to the county's public culture. Bexar County's strongest identity comes from accumulation: communities keep adding new traditions without entirely losing the old ones."),

    h("The San Antonio River is now both infrastructure and public landscape"),
    p("For generations the river was altered to control flooding and serve a growing city. Downtown engineering projects created the best-known River Walk, while later work extended public access and ecological restoration southward through the Mission Reach. That southern river corridor reconnects the missions with water, trails, native vegetation and restored habitat. The river is therefore doing several jobs at once: drainage system, habitat, historical spine, recreation corridor and tourism asset."),
    p("That complexity makes the river the best organizing idea for understanding Bexar County. Follow it north to the springs and older neighborhoods, through downtown civic space, then south toward the missions and agricultural landscape. The county changes character repeatedly, but the waterway keeps the pieces connected."),

    h("How to read Bexar County today"),
    p("A useful way to experience Bexar County is to resist treating San Antonio's headline attractions as isolated stops. Begin with the mission chain and the river because they explain why settlement concentrated here. Place the Alamo back into the longer history of Mission Valero and San Antonio de Béxar. Look north toward Fort Sam Houston and the military institutions that reshaped the county after annexation and statehood. Then drive beyond the central city into the northern hills, eastern military communities and fast-growing western and southern edges."),
    p("Seen this way, Bexar County becomes a compressed history of Texas itself. Indigenous homelands, Spanish colonial ambitions, Mexican and Tejano civic life, revolution, military expansion, railroads, highways, tourism and metropolitan growth all occupy the same county. The surviving missions make that long timeline unusually tangible, but the story is still unfolding in suburban streets, restored riverbanks, active military bases and communities that continue to redefine what San Antonio and Bexar County mean."),
  ],
};
