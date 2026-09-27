import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const nativeNationsTexasTodayArticle: Article = {
  id: "evergreen-native-nations-texas-today",
  brandId: "texasdefined",
  slug: "native-nations-texas-today",
  title: "Native Nations in Texas Today: Tribal Governments, Reservations and Living Communities",
  dek: "Texas has three federally recognized tribal nations located in the state, while dozens of other federally recognized tribes maintain historical and cultural connections to Texas. This guide explains who is here today, what tribal sovereignty means and where the larger Texas connection continues.",
  category: "texas-history",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Alabama_Coushatta_Tribe_-_panoramio.jpg?width=1600",
    alt: "Welcome sign at the Alabama-Coushatta Tribe of Texas reservation in Polk County",
    width: 3328,
    height: 2168,
    credit: "Lance L Lowry · CC BY 3.0 · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  updatedAt: "2026-09-26",
  readingMinutes: 13,
  tags: [
    "Native nations Texas",
    "tribes in Texas",
    "Alabama-Coushatta Tribe of Texas",
    "Kickapoo Traditional Tribe of Texas",
    "Ysleta del Sur Pueblo",
    "tribal sovereignty",
    "Texas reservations",
    "Indigenous Texas",
    "tribal governments",
  ],
  featured: true,
  sourceName: "Texas Historical Commission — Tribal Consultation Guidelines",
  sourceUrl: "https://thc.texas.gov/review/consultation-process/tribal-consultation-guidelines",
  internalLinks: [
    { href: "/article/indigenous-texas-history-native-nations", label: "Indigenous Texas history", description: "Start with the much longer history of Native homelands, political power, trade, colonization, removal and survival across the region now called Texas." },
    { href: "/article/texas-before-united-states-how-texas-began", label: "Texas before the United States", description: "Place Native nations inside the full chronology from Indigenous homelands through Spanish and Mexican Texas, the Republic and statehood." },
    { href: "/county/polk", label: "Polk County", description: "Connect Livingston, the Piney Woods and the Alabama-Coushatta reservation in East Texas." },
    { href: "/county/maverick", label: "Maverick County", description: "Explore the Eagle Pass border region where the Kickapoo Traditional Tribe of Texas has its reservation community." },
    { href: "/county/el-paso", label: "El Paso County", description: "Explore the Tigua community, Ysleta del Sur Pueblo, the mission trail and the El Paso borderlands." },
    { href: "/destination/ysleta-del-sur-pueblo-cultural-center-museum-el-paso", label: "Ysleta del Sur Pueblo Cultural Center Museum", description: "Visit a Pueblo-operated museum and cultural center that interprets Tigua history and living traditions in El Paso." },
    { href: "/destination/caddo-mounds-state-historic-site", label: "Caddo Mounds State Historic Site", description: "Connect one of Texas's foundational archaeological landscapes to the present-day Caddo Nation and the wider East Texas homeland." },
    { href: "/article/texas-borderlands-historic-sites-guide", label: "Texas borderlands historic sites", description: "Follow Indigenous, Pueblo, Spanish, Mexican and Tejano histories across the borderlands." },
  ],
  relatedCollections: [],
  relatedDestinations: [
    "ysleta-del-sur-pueblo-cultural-center-museum-el-paso",
    "caddo-mounds-state-historic-site",
    "hueco-tanks-state-park-and-historic-site",
    "mission-dolores",
    "lipantitlan",
  ],
  body: [
    p("Native nations are part of Texas's present, not only its past. Texas Historical Commission consultation guidance currently identifies 29 federally recognized tribes with known connections to Texas. Three of those federally recognized tribal nations are located in the state: the Alabama-Coushatta Tribe of Texas, the Kickapoo Traditional Tribe of Texas and Ysleta del Sur Pueblo."),
    p("That distinction matters. Saying Texas has three federally recognized tribes located within its borders is not the same as saying only three Native nations have Texas histories. Removal, migration, changing federal policy and the drawing of state and international borders separated many tribal governments from ancestral homelands and places of continuing cultural importance."),
    p("The best way to understand Native Texas today is therefore in two layers: the three sovereign tribal nations based in Texas, and the much larger group of federally recognized nations that maintain historical, cultural, archaeological or consultation interests in the state."),

    h("Quick answer: which federally recognized tribal nations are located in Texas?"),
    list(
      "Alabama-Coushatta Tribe of Texas — reservation and tribal government east of Livingston in Polk County.",
      "Kickapoo Traditional Tribe of Texas — reservation community near the Rio Grande south of Eagle Pass in Maverick County.",
      "Ysleta del Sur Pueblo — Tigua Pueblo community and tribal government in El Paso."
    ),
    p("Texas State Library guidance likewise identifies three American Indian reservations in Texas associated with those three tribal nations. Each nation has its own government, history, community institutions and relationship with the United States. They should not be treated as branches of a single statewide organization."),

    h("What tribal sovereignty means"),
    p("Federally recognized tribes are political entities, not simply cultural clubs or ethnic associations. The Bureau of Indian Affairs describes the federal relationship with recognized tribes as government-to-government and recognizes tribes as possessing inherent rights of self-government."),
    p("That does not mean tribal governments operate outside all federal law, nor does it mean every jurisdictional question is simple. Federal statutes, court decisions, treaties, tribal law and in some cases state-federal arrangements can all matter. But the basic principle is important: a federally recognized tribal nation is a government with political and legal status, not a subdivision of the State of Texas."),
    p("Tribal sovereignty also explains why official tribal websites are primary sources for current government, citizenship, cultural programs and community institutions. TexasDefined uses state and federal sources for the wider legal and historical framework, but the tribes themselves should be the first place to look for how they describe their own governments and communities."),

    h("Alabama-Coushatta Tribe of Texas"),
    p("The Alabama-Coushatta Tribe of Texas is based in the Big Thicket of Deep East Texas east of Livingston. The Tribe describes its reservation as the oldest reservation in Texas and operates a contemporary sovereign government with an elected Tribal Council, traditional chiefs and public services that include law enforcement and emergency functions."),
    p("The Alabama and Coushatta peoples were historically distinct but closely connected Muskogean-speaking communities. Their tribal history describes westward migration into what is now Texas during the late eighteenth century, long before Texas became a U.S. state."),
    p("Their Texas history crosses Spanish, Mexican, Republic and state periods. The Tribe's own history records participation in the Mexican independence struggle, relationships with Sam Houston and a long effort to maintain a permanent homeland in East Texas. In 1854, Texas granted reservation land to the Alabama people in Polk County; Coushatta families later joined them there."),
    p("Federal policy changed the Tribe's status repeatedly in the twentieth century. Congress restored the Alabama-Coushatta Tribe to federal recognition in 1987. Today the reservation is a living community and seat of tribal government, not a reconstructed historical site."),
    p("For Texas travelers, the most important rule is to distinguish public visitor offerings from the community as a whole. A reservation is a homeland and governmental jurisdiction first. Check the Tribe's own current visitor information before assuming that cultural, recreational or community spaces are open to the public."),

    h("Kickapoo Traditional Tribe of Texas"),
    p("The Kickapoo Traditional Tribe of Texas maintains its reservation community along the Rio Grande in western Maverick County, just south of Eagle Pass. The Tribe describes itself as a federally recognized tribal government and identifies its community with the Rosita Valley area on the U.S.-Mexico border."),
    p("Kickapoo history is transnational. Kickapoo ancestors originated much farther north in the Great Lakes region, and different Kickapoo communities moved through the Midwest, Plains, Texas and Mexico under pressure from settlement, warfare and federal removal policies."),
    p("That movement means the Texas Kickapoo story cannot be explained by a state boundary alone. Families and community ties have historically crossed the U.S.-Mexico border, making Maverick County part of a much larger cultural geography."),
    p("The modern Tribe operates governmental departments and institutions including a tribal court, police, legal services, enrollment and reservation services. Those are present-day governmental functions, another reminder that Native nations in Texas belong in contemporary civic geography as well as history."),
    p("Visitors should also avoid confusing the Kickapoo Traditional Tribe of Texas with Kickapoo Cavern State Park. The park's name is geographic and historical; it is not the seat of the Tribe's government. The Tribe's reservation community is near Eagle Pass, hundreds of miles away."),

    h("Ysleta del Sur Pueblo"),
    p("Ysleta del Sur Pueblo is the Tigua Pueblo community in El Paso and the only Pueblo located in Texas. The Pueblo traces the establishment of its present community to 1682, after the Pueblo Revolt and Spanish retreat from New Mexico brought Tigua people south into the El Paso del Norte region."),
    p("The Pueblo describes itself as a federally recognized sovereign nation with more than three centuries of continuous community history in the El Paso area. Farming, acequia irrigation, ceremonial life, the Ysleta Mission and later urban growth all belong to that longer history."),
    p("Ysleta del Sur's government combines elected and traditional offices. Its Tribal Council exercises governmental authority, while traditional offices including the Cacique and War Captain retain ceremonial and community roles. Tribal police, courts and administrative departments make sovereignty visible in everyday institutions."),
    p("The Pueblo's Cultural Center Museum is one of the clearest public-facing places in Texas to learn from a tribal institution directly. It distinguishes the living Pueblo from the nearby Ysleta Mission: the mission is an important historic church, while the Cultural Center is operated by the Pueblo to interpret Tigua history, art and contemporary cultural life."),
    p("Because the Pueblo remains an active community, event access and cultural protocols matter. Check current Pueblo information for dances, markets, museum hours, photography expectations and visitor access rather than relying on generic tourism listings."),

    h("Why Texas history includes many more than three tribal nations"),
    p("Texas Historical Commission consultation guidance lists 29 federally recognized tribes with known interests or connections in Texas. The list reaches far beyond the three nations physically located in the state because modern headquarters and reservation boundaries do not erase ancestral homelands, former settlements, sacred places, trails, battlefields, archaeological sites or burial locations."),
    p("The Caddo Nation, Comanche Nation, Tonkawa Tribe, Kiowa Tribe, Wichita and Affiliated Tribes, Apache nations, Cherokee Nation, Choctaw Nation and others all appear in Texas consultation work. Their current governments may be headquartered outside Texas, but that does not make their Texas histories secondary or extinct."),
    p("This wider consultation geography is especially important for preservation. A highway project, archaeological excavation, historic-site plan or development may affect cultural resources connected to a tribal nation whose present governmental headquarters are in Oklahoma, New Mexico, Louisiana or another state."),
    p("That is why a map limited to modern reservations can mislead. It shows where particular tribal governments hold reservation or trust lands today; it does not map the full extent of Native homelands or cultural connections."),

    h("Caddo, Comanche and Tonkawa connections continue beyond the state line"),
    p("The Caddo Nation is headquartered in Oklahoma today, but East Texas remains central to Caddo history. Caddo Mounds State Historic Site near Alto preserves part of an ancestral civic and ceremonial landscape, and modern interpretation increasingly works with Caddo perspectives rather than treating the site as a culture that vanished."),
    p("The Comanche Nation is also headquartered in Oklahoma. Its own history describes the expansion of Nʉmʉnʉʉ people onto the Southern Plains, including enormous areas of present-day Texas. Comanche history therefore remains essential to understanding the Texas Plains even though the modern tribal government is outside the state."),
    p("The Tonkawa Tribe of Oklahoma similarly maintains a direct Texas history. The Tribe's own account describes a homeland extending through south-central Texas and records the Tribe's forced removal from Fort Griffin in 1884 before relocation to what is now Oklahoma."),
    p("These examples show why 'tribes in Texas' can mean two different things. One question asks which federally recognized tribal governments are physically located in Texas today. A second asks which Native nations have historical and continuing connections to Texas. The answers are not the same."),

    h("Reservations are not museums"),
    p("A reservation is a homeland and jurisdiction, not an attraction category. Some tribal governments operate museums, cultural centers, public events, lodging, recreation or businesses. Other spaces are residential, governmental, ceremonial or otherwise not intended for casual tourism."),
    p("Use tribal websites for current access information. If a dance, ceremony or cultural event is public, follow posted rules about photography, recording, dress, sacred spaces and participation. Public access to one event does not imply general access to every part of a reservation or Pueblo."),
    p("The same principle applies to language. Use the name a tribal nation uses for itself when possible, and avoid collapsing distinct governments into broad labels such as 'Texas Indians.' Shared geography does not erase different languages, histories, political institutions or cultural traditions."),

    h("Where to learn from tribal institutions and Native-centered interpretation"),
    list(
      "Ysleta del Sur Pueblo Cultural Center Museum in El Paso — Pueblo-operated museum, exhibits and cultural programming.",
      "Alabama-Coushatta Tribe of Texas official website — first-person history, government information and current public visitor offerings in Polk County.",
      "Kickapoo Traditional Tribe of Texas official website — current government departments and reservation information for the Eagle Pass community.",
      "Caddo Mounds State Historic Site near Alto — state historic site where interpretation centers ancestral Caddo history and continuing cultural connections.",
      "Texas Historical Commission tribal consultation resources — statewide reference for federally recognized tribes with known Texas interests."
    ),

    h("How this page fits the TexasDefined history system"),
    p("This guide answers the present-day governance question: which tribal nations are located in Texas now, and how should readers understand sovereignty, reservations and wider tribal connections? It intentionally does not try to compress thousands of years of Native history into a current-government directory."),
    p("For the deeper chronology, continue to the Indigenous Texas history guide, which follows Native peoples and regional political worlds before European colonization and through removal and survival. Then use the Texas-before-the-United-States guide to place those histories alongside Spanish, Mexican, Republic and U.S. political change."),
    p("Keeping these layers separate makes the larger Texas story more accurate. Archaeology explains deep time. Tribal histories explain nations and communities. Government sources explain sovereignty and recognition. Historic places show where those stories remain visible. None of those layers can substitute for the others."),
  ],
};
