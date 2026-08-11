import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

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
  readingMinutes: 6,
  tags: ["Galveston County", "Galveston", "Galveston Island", "Juneteenth", "Port of Galveston", "Galveston Island State Park", "Texas City", "League City", "UTMB", "Gulf Coast", "Texas counties", "Texas history"],
  featured: false,
  internalLinks: [
    { href: "/destination/galveston-island-state-park", label: "Explore Galveston Island State Park", description: "Beach, prairie, bay wetlands, paddling trails and bird habitat on the west end of Galveston Island." },
    { href: "/browse/counties", label: "Browse all 254 Texas counties", description: "Explore Texas one county at a time." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How distance and local government shaped the Texas county map." },
    { href: "/explore/beaches-coast", label: "Explore the Texas coast", description: "More beaches, islands, bays and coastal places around Texas." },
  ],
  relatedCollections: [],
  relatedDestinations: ["galveston-island-state-park"],
  body: [
    p("Galveston County is a barrier island facing the Gulf, a working harbor, a bayfront chain of communities, a petrochemical corridor around Texas City and a fast-growing mainland edge tied to Houston. Galveston remains the historic county seat, but much of the population now lives north of the island around League City, Dickinson, Friendswood and other mainland communities."),
    p("Salt marsh and beach share the map with medical laboratories, refineries, cruise terminals and suburbs. Water creates opportunity and beauty while also determining where people build, how ships move and how seriously residents prepare for hurricanes."),

    h("A county built around water"),
    p("Galveston Island is a young, constantly changing barrier island. Texas Parks and Wildlife describes it as roughly 5,000 years old, formed in a system where waves, tides and storms move sand. Galveston Island State Park protects about 2,000 acres where Gulf beach, coastal prairie, freshwater features, bay wetlands and salt marsh meet."),
    p("Trails and paddling routes cross habitat for fish and migratory birds, while dunes and marshes show how barrier islands shelter the mainland. The park is one of the clearest places to see Galveston County as a living coastal system rather than simply a developed shoreline."),

    h("The harbor connected Texas to the world"),
    p("Galveston's protected harbor made the island one of nineteenth-century Texas's most important commercial gateways. Cotton, people, mail and manufactured goods moved through its wharves. The Strand's surviving commercial blocks preserve that era; the Texas Historical Commission recognizes the district for national significance in commerce, transportation, government and architecture."),
    p("The harbor remains a workplace rather than a museum piece. The Port of Galveston handles cargo and a major cruise business, keeping ships and maritime services central to island life. Galveston is a beach destination, but it is still unmistakably a port city."),

    h("Juneteenth began here"),
    p("On June 19, 1865, Union Major General Gordon Granger issued General Orders, No. 3 in Galveston, announcing that enslaved people in Texas were free. The news arrived after the Civil War had ended and more than two years after the Emancipation Proclamation took effect in Confederate territory."),
    p("Black Texans marked emancipation with worship, gatherings and celebrations that became known as Juneteenth. The tradition spread across the country, became a Texas state holiday in 1980 and later a federal holiday. In Galveston, that national story remains connected to downtown streets, churches and historic sites."),

    h("The 1900 storm reshaped the city"),
    p("On September 8, 1900, a hurricane struck Galveston and killed at least 6,000 people, making it the deadliest weather disaster in United States history. Storm surge crossed the low island and destroyed neighborhoods on a scale that permanently changed the city's future."),
    p("Galveston answered with a seawall along the Gulf and the raising of large portions of the inhabited city by pumping sand beneath buildings and streets. Hurricane Ike in 2008 reinforced the same lesson: the county has never conquered the sea; it has learned to live with a dynamic and hazardous coast."),

    h("Medicine became another island institution"),
    p("The University of Texas Medical Branch opened in Galveston in 1891 as Texas's first medical school and grew into a major academic health center, research institution and hospital system. Its original Ashbel Smith Building, Old Red, survived the 1900 hurricane and remains a landmark on the island's east end."),
    p("UTMB gives the county a role unlike that of a typical resort coast. Students, physicians, researchers and patients connect Galveston to communities across Texas, with a medical campus only blocks from historic port streets and the Gulf."),

    h("The mainland tells another county story"),
    p("Across the causeway, Texas City developed around deepwater industry and refining. La Marque, Dickinson, Santa Fe and Hitchcock grew with railroads, highways, agriculture and industry, while League City and the Clear Lake edge became closely tied to metropolitan Houston. The Census Bureau counted 350,682 county residents in 2020 and estimated 372,207 in 2025, with much of the growth on the mainland and in the north."),
    p("The economy is equally mixed: tourism, port activity, maritime services, heavy industry, logistics, health care, research and suburban construction all matter. From Galveston Bay, working ships, industrial infrastructure, bird habitat and recreational water can occupy the same horizon."),
    p("Communities retain distinct identities. Galveston is the historic and cultural anchor; Texas City is industrial and mainland-oriented; League City is a major growth center; Santa Fe remains more semi-rural; Kemah turns toward boating and Clear Lake; and Bolivar Peninsula adds beaches, fishing communities and a ferry connection to the island."),

    h("Why Galveston County belongs in the county series"),
    p("Few Texas counties compress so many state and national stories into one map: the birthplace of Juneteenth, the memory of the 1900 storm, a historic Gulf port, the state's first medical school, a major industrial corridor and a barrier-island ecosystem that still changes with wind and water."),
    p("The coast here is never only scenery. Gulf and bay influence commerce, wildlife, storms, tourism and industry at once. Galveston County is a place built at the water's edge—historic and modern, vulnerable and resilient, urban and wild."),
  ],
};
