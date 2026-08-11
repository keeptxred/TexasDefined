import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });

export const galvestonCountyIslandPortJuneteenthArticle: Article = {
  id: "county-galveston-island-port-juneteenth",
  brandId: "texasdefined",
  slug: "galveston-county-island-port-juneteenth-texas",
  title: "Galveston County: Island, Harbor, Juneteenth and the Upper Texas Coast",
  dek: "Barrier-island wetlands, port streets, mainland industry and growing communities meet in a county shaped by water, storms, medicine and Juneteenth.",
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
  readingMinutes: 5,
  tags: ["Galveston County", "Galveston", "Juneteenth", "Port of Galveston", "Galveston Island State Park", "Texas City", "League City", "UTMB"],
  featured: false,
  internalLinks: [
    { href: "/destination/galveston-island-state-park", label: "Galveston Island State Park", description: "Beach, prairie and bay wetlands on Galveston Island." },
    { href: "/browse/counties", label: "Browse Texas counties", description: "Explore all 254 counties." },
    { href: "/article/why-texas-has-254-counties", label: "Why Texas has 254 counties", description: "How Texas's county map formed." },
    { href: "/explore/beaches-coast", label: "Explore the Texas coast", description: "More coastal places." },
  ],
  relatedCollections: [],
  relatedDestinations: ["galveston-island-state-park"],
  body: [
    p("Galveston County combines a Gulf barrier island and working harbor with the Texas City industrial corridor and a growing mainland tied to Houston. Galveston remains the county seat, while many residents live north of the island around League City, Dickinson, Friendswood and other communities. Salt marsh, beach, laboratories, refineries, cruise terminals and suburbs all occupy the same county, with water shaping both opportunity and hurricane risk."),

    h("A county built around water"),
    p("Galveston Island is a young, changing barrier island. Texas Parks and Wildlife describes it as roughly 5,000 years old, formed where waves, tides and storms move sand. Galveston Island State Park protects about 2,000 acres of Gulf beach, coastal prairie, freshwater features, bay wetlands and salt marsh. Its trails and paddling routes make the county's living coastal system visible beyond the developed shoreline."),

    h("The harbor connected Texas to the world"),
    p("Galveston's protected harbor made the island one of nineteenth-century Texas's major commercial gateways, moving cotton, people, mail and manufactured goods. The Strand's commercial blocks preserve that era; the Texas Historical Commission recognizes the district for national significance in commerce, transportation, government and architecture. The Port of Galveston remains a working cargo and cruise harbor, so the island is still unmistakably a port city as well as a beach destination."),

    h("Juneteenth began here"),
    p("On June 19, 1865, Union Major General Gordon Granger issued General Orders, No. 3 in Galveston, announcing that enslaved people in Texas were free. Black Texans marked emancipation with worship, gatherings and celebrations that became known as Juneteenth. The observance spread across the country, became a Texas state holiday in 1980 and later a federal holiday. In Galveston, that national story remains connected to downtown streets, churches and historic sites."),

    h("The 1900 storm reshaped the city"),
    p("On September 8, 1900, a hurricane struck Galveston and killed at least 6,000 people, making it the deadliest weather disaster in United States history. Storm surge crossed the low island and destroyed neighborhoods. Galveston responded with a Gulf seawall and by raising large portions of the city with sand pumped beneath buildings and streets. Hurricane Ike in 2008 reinforced the enduring reality of life on a hazardous, dynamic coast."),

    h("Medicine became another island institution"),
    p("The University of Texas Medical Branch opened in Galveston in 1891 as Texas's first medical school and grew into a major academic health center, research institution and hospital system. Its original Ashbel Smith Building, Old Red, survived the 1900 hurricane. UTMB links the island to patients, students, physicians and researchers across Texas and gives Galveston a role far beyond tourism."),

    h("The mainland tells another county story"),
    p("Across the causeway, Texas City developed around deepwater industry and refining. La Marque, Dickinson, Santa Fe and Hitchcock grew with railroads, highways, agriculture and industry, while League City and the Clear Lake edge became closely tied to metropolitan Houston. The Census Bureau counted 350,682 residents in 2020 and estimated 372,207 in 2025, with much recent growth on the mainland and in the north."),
    p("Galveston is the historic and cultural anchor; Texas City is industrial; League City is a major growth center; Santa Fe remains more semi-rural; Kemah turns toward boating and Clear Lake; and Bolivar Peninsula adds beaches, fishing communities and a ferry connection. Tourism, maritime activity, heavy industry, logistics, health care and suburban growth all contribute to the county economy."),

    h("Why Galveston County belongs in the county series"),
    p("Few Texas counties place so many state and national stories together: the birthplace of Juneteenth, the memory of the 1900 storm, a historic Gulf port, the state's first medical school, a major industrial corridor and a barrier-island ecosystem still reshaped by wind and water. Here the coast is never only scenery; Gulf and bay influence commerce, wildlife, storms, tourism and industry at once."),
  ],
};
