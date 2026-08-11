import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const galvestonCountyIslandPortJuneteenthArticle: Article = {
  id: "county-galveston-island-port-juneteenth",
  brandId: "texasdefined",
  slug: "galveston-county-island-port-juneteenth-texas",
  title: "Galveston County: Island, Harbor, Juneteenth and the Upper Texas Coast",
  dek: "Galveston County is a coastal county of barrier-island wetlands, historic port streets, mainland industry and fast-growing communities, shaped as much by water and storms as by commerce, medicine and a freedom story that became a national holiday.",
  category: "texas-history",
  region: "gulf-coast",
  hero: {
    src: "/images/state-parks/galveston-island-state-park.jpg",
    alt: "Shoreline wetlands and inlet ponds at Galveston Island State Park in Galveston County, Texas",
    width: 1600,
    height: 1057,
    credit: "Yinan Chen · Public domain · Wikimedia Commons",
  },
  authorId: "a-hollis",
  publishedAt: "2026-08-11",
  readingMinutes: 8,
  tags: [
    "Galveston County",
    "Galveston",
    "Galveston Island",
    "Juneteenth",
    "Port of Galveston",
    "Galveston Island State Park",
    "Texas City",
    "League City",
    "UTMB",
    "Gulf Coast",
    "Texas counties",
    "Texas history",
  ],
  featured: false,
  internalLinks: [
    {
      href: "/destination/galveston-island-state-park",
      label: "Explore Galveston Island State Park",
      description: "Beach, prairie, bay wetlands, paddling trails and bird habitat on the west end of Galveston Island.",
    },
    {
      href: "/browse/counties",
      label: "Browse all 254 Texas counties",
      description: "Explore Texas one county at a time.",
    },
    {
      href: "/article/why-texas-has-254-counties",
      label: "Why Texas has 254 counties",
      description: "How distance and local government shaped the Texas county map.",
    },
    {
      href: "/explore/beaches-coast",
      label: "Explore the Texas coast",
      description: "More beaches, islands, bays and coastal places around Texas.",
    },
  ],
  relatedCollections: [],
  relatedDestinations: ["galveston-island-state-park"],
  body: [
    p("Galveston County is not one landscape. It is a barrier island facing the Gulf of Mexico, a working harbor, a chain of bayfront communities, a petrochemical and maritime corridor around Texas City, and a fast-growing mainland edge tied closely to the Houston region. The county seat of Galveston remains its historic center, but much of the county's modern population lives north of the island in places such as League City, Dickinson, Friendswood and nearby communities."),
    p("That split personality is the key to understanding the county. Salt marsh and beach sit within the same county as medical laboratories, refineries, cruise terminals and suburban neighborhoods. Water creates the county's beauty and economic opportunity, but it also shapes where people build, how they move and how seriously they think about hurricanes."),

    h("A county built around water"),
    p("Galveston Island is a young and constantly changing barrier island. Texas Parks and Wildlife describes the island as roughly 5,000 years old, formed in a coastal system where waves, tides and storms continually move sand. Galveston Island State Park protects about 2,000 acres where Gulf beach, coastal prairie, freshwater features, bay wetlands and salt-marsh habitat meet."),
    p("The state park is especially useful for seeing the county before streets, seawalls and shipping channels dominate the view. Its trails and paddling routes cross a landscape that shelters fish, shorebirds and migratory birds, while dunes and marshes show why barrier islands matter to the mainland behind them. The park occupies one of the last undeveloped stretches on Galveston Island with public access from Gulf beach through prairie to bay wetlands."),

    h("Galveston grew because the harbor connected Texas to the world"),
    p("Galveston's protected harbor and access to the Gulf made the island one of nineteenth-century Texas's most important commercial gateways. Cotton, people, mail, manufactured goods and news moved through its wharves. The Strand's surviving commercial buildings still make that history visible: the Texas Historical Commission identifies the Strand Historic District as nationally significant for commerce, transportation, government and architecture."),
    p("The modern harbor still carries that maritime identity. The Port of Galveston handles cargo and a major cruise business, and the port reports a multibillion-dollar economic impact for Galveston Harbor. Ships remain part of everyday scenery on the island, a reminder that Galveston is not only a beach destination but a working port city."),

    h("Juneteenth began here"),
    p("Galveston County holds a place in national history that reaches far beyond the coast. On June 19, 1865, Union Major General Gordon Granger issued General Orders, No. 3 in Galveston, informing Texans that enslaved people were free. The announcement came after the Civil War had ended and more than two years after the Emancipation Proclamation had taken effect in Confederate territory."),
    p("African American communities in Galveston and across Texas marked emancipation with gatherings, worship, processions and celebrations. The observance became known as Juneteenth, spread with Texans to other parts of the country, became a Texas state holiday in 1980, and eventually a federal holiday. In Galveston, the story remains tied to physical places downtown, churches, Ashton Villa and the Strand area rather than existing only as an abstract date on the calendar."),

    h("The 1900 storm changed the city's relationship with the Gulf"),
    p("On September 8, 1900, a powerful hurricane struck Galveston. The National Weather Service describes it as the deadliest weather disaster in United States history, with at least 6,000 people killed. Storm surge swept across the low island, destroying homes and reshaping the future of the city."),
    p("Galveston's response was one of the largest civic engineering efforts in Texas history. A seawall was built along the Gulf side, and large portions of the inhabited city were raised by pumping sand beneath buildings and streets. Those projects did not remove hurricane risk, but they permanently changed the city's physical form and established a coastal culture in which storm preparedness is part of ordinary life."),
    p("Hurricane Ike in 2008 reinforced that lesson for a new generation. It damaged neighborhoods, businesses and Galveston Island State Park, moved beaches and altered wetlands. The county's history is therefore not a simple story of defeating the sea; it is a continuing negotiation with a dynamic coast."),

    h("Medicine became another Galveston institution"),
    p("The University of Texas Medical Branch opened in Galveston in 1891 as the state's first medical school. What began with one principal medical-school building grew into a major academic health center, research institution and hospital system. Its original Ashbel Smith Building, known as Old Red, survived the 1900 hurricane and remains one of the most recognizable landmarks on the eastern end of the island."),
    p("UTMB gives Galveston County an economic and cultural role that is unusual for a coastal tourism center. Students, physicians, researchers and patients connect the island to communities across Texas, while medical education and biomedical research sit only blocks from historic port streets and the Gulf."),

    h("The mainland tells a different Galveston County story"),
    p("Cross the causeway and the county changes quickly. Texas City developed around deepwater industry and refining. La Marque, Dickinson, Santa Fe, Hitchcock and other communities grew with railroads, highways, agriculture, industry and suburban expansion. Farther north, League City and the county's Clear Lake edge are closely connected to the Houston metropolitan economy and NASA's Johnson Space Center area."),
    p("This mainland growth explains why Galveston County cannot be understood from the island alone. The Census Bureau counted 350,682 residents in 2020 and estimated 372,207 in 2025. Much of that growth is occurring in northern portions of the county, where new neighborhoods and commercial corridors feel more suburban-Houston than historic-island Galveston."),

    h("Industry, tourism and coastal life overlap"),
    p("Galveston County's economy is unusually mixed. Tourism supports hotels, restaurants, attractions and beach businesses. The port supports cargo, cruise activity and maritime services. Texas City anchors heavy industry and logistics. UTMB contributes health care, education and research. Construction, retail and professional services follow population growth on the mainland."),
    p("Those sectors often occupy the same horizon. From parts of the bay, visitors can see working ships, industrial infrastructure, bird habitat and recreational water at once. That juxtaposition is not a contradiction; it is the county's defining geography. Galveston Bay is simultaneously an ecosystem, transportation corridor, workplace and place of recreation."),

    h("Communities carry distinct identities"),
    p("Galveston remains the historic county seat and cultural anchor, with Victorian architecture, the Strand, seawall neighborhoods, beaches and the port. Texas City is more industrial and mainland-oriented. League City is one of the county's principal growth centers. Dickinson and La Marque sit along the Interstate 45 corridor, while Santa Fe retains a more inland, semi-rural character. Kemah turns toward Galveston Bay and Clear Lake, where boating and waterfront entertainment shape local identity."),
    p("Bolivar Peninsula, connected to Galveston Island by ferry rather than bridge, adds another coastal experience: long beaches, fishing communities, vacation homes and the exposure of a low peninsula facing both Gulf and bay. Even within one county, daily life can mean commuting on Interstate 45, boarding a ferry, working a refinery shift, walking a medical campus or watching shorebirds over a marsh."),

    h("A few Galveston County facts worth remembering"),
    list(
      "Galveston is the county seat, but much of the county's recent population growth is on the mainland and in the north.",
      "The 2020 U.S. Census counted 350,682 Galveston County residents; the Census Bureau estimated 372,207 in 2025.",
      "Galveston Island State Park protects beach, coastal prairie and bay-wetland habitat on the west end of Galveston Island.",
      "General Orders, No. 3 was issued in Galveston on June 19, 1865, the event at the center of Juneteenth's origin story.",
      "The 1900 Galveston hurricane remains the deadliest weather disaster in U.S. history.",
      "UTMB opened in Galveston in 1891 as Texas's first medical school.",
      "The Strand Historic District is nationally significant for its commercial, transportation and architectural history.",
      "The Port of Galveston remains a working cargo and cruise harbor, while Texas City anchors a major industrial corridor on the mainland.",
    ),

    h("Why Galveston County belongs in the county series"),
    p("Few Texas counties compress so many state and national stories into such a small piece of the map. Galveston County contains the birthplace of Juneteenth, the memory of the 1900 storm, one of Texas's oldest major ports, the state's first medical school, a significant industrial corridor and a barrier-island ecosystem that still changes with every season of wind and water."),
    p("Its strongest lesson is that the coast is never only scenery. The Gulf and bay determine where ships travel, where wetlands form, where storms strike, where tourists gather and where industries grow. Galveston County is best understood as a place built at the water's edge—historic and modern, vulnerable and resilient, urban and wild, all at once."),
  ],
};
