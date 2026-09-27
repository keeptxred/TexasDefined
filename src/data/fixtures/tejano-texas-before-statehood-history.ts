import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const image = (src: string, alt: string, width: number, height: number, credit: string, caption: string): ArticleBlock => ({
  type: "image",
  image: { src, alt, width, height, credit },
  caption,
});

export const tejanoTexasBeforeStatehoodHistoryArticle: Article = {
  id: "evergreen-tejano-texas-before-statehood-history",
  brandId: "texasdefined",
  slug: "tejano-texas-before-statehood-history",
  title: "Tejano Texas Before Statehood: Béxar, Mexican Texas, Revolution and Republic",
  dek: "Tejano history did not begin at the Alamo. Follow Spanish-era Béxar, ranching and trade, Mexican federalism, colonization, the Texas Revolution, Republic politics and the fight to preserve citizenship before statehood.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/John_Antonio_Navarro_House%2C_San_Antonio%2C_Texas.jpg?width=1600",
    alt: "Historic American Buildings Survey photograph of the José Antonio Navarro house complex in San Antonio",
    width: 1024,
    height: 682,
    credit: "Jack Boucher / Historic American Buildings Survey, National Park Service · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-09-26",
  updatedAt: "2026-09-26",
  readingMinutes: 18,
  tags: [
    "Tejano history",
    "Spanish Texas",
    "Mexican Texas",
    "San Antonio de Bexar",
    "Coahuila y Tejas",
    "Jose Antonio Navarro",
    "Juan Seguin",
    "Jose Francisco Ruiz",
    "Texas Revolution",
    "Republic of Texas",
    "Texas statehood",
  ],
  featured: true,
  sourceName: "Handbook of Texas — Tejano Politics",
  sourceUrl: "https://www.tshaonline.org/handbook/entries/tejano-politics",
  internalLinks: [
    { href: "/article/texas-before-united-states-how-texas-began", label: "Texas before the United States", description: "Place Tejano Texas inside the full chronology from Indigenous homelands through Spanish, Mexican, Republic and statehood eras." },
    { href: "/article/indigenous-texas-history-native-nations", label: "Indigenous Texas history", description: "Start with the Native homelands and political worlds that predated and continued through Spanish and Mexican Texas." },
    { href: "/destination/casa-navarro", label: "Casa Navarro State Historic Site", description: "Visit José Antonio Navarro's San Antonio home and the surviving Laredito landscape tied to Tejano political and domestic life." },
    { href: "/article/juan-seguin-tejano-texas-revolution", label: "Juan Seguín and the Tejano Revolution story", description: "Follow Seguín from Béxar civic office and the Revolution through Republic politics, San Antonio leadership and exile." },
    { href: "/article/mexican-texas-military-history", label: "Military in Mexican Texas", description: "Add the presidios, militias, Anahuac conflicts and federalist crisis that formed the military side of 1821–1835 Texas." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution historic sites", description: "Follow the 1835–1836 sequence while keeping Tejano participants and divided local loyalties visible." },
    { href: "/article/republic-of-texas-government-trail", label: "Republic of Texas government trail", description: "See the institutions in which Navarro, Ruiz, Seguín and other Tejanos tried to retain political representation after independence." },
    { href: "/destination/san-antonio-missions-national-historical-park", label: "San Antonio Missions", description: "Move backward into the mission, Indigenous and colonial landscape from which Béxar grew." },
    { href: "/destination/presidio-la-bahia", label: "Presidio La Bahía", description: "Connect Goliad's Spanish and Mexican history to Tejano communities and the Revolution." },
    { href: "/destination/spanish-governors-palace-san-antonio", label: "Spanish Governor's Palace", description: "Add a surviving downtown San Antonio place tied to the Spanish presidial and administrative era." },
  ],
  relatedCollections: [],
  relatedDestinations: [
    "casa-navarro",
    "spanish-governors-palace-san-antonio",
    "san-antonio-missions-national-historical-park",
    "the-alamo",
    "presidio-la-bahia",
    "san-felipe-de-austin",
  ],
  body: [
    p("Tejano history does not begin at the Alamo, and Tejanos were never a single political bloc. Long before the Texas Revolution, Spanish-speaking families in San Antonio de Béxar, La Bahía and other settlements built households, ranches, trading networks and local governments inside a borderland where Indigenous nations still controlled much of the surrounding country. Those communities survived the transition from Spain to Mexico and then faced another transformation when Anglo-American immigration rapidly changed the population and politics of Texas."),
    p("The word Tejano is useful, but it needs care. In modern English it generally means a Texan of Mexican descent. The term appeared in nineteenth-century usage, including references to Texas citizens in the 1820s and by Goliad leaders in 1833, but historians sometimes apply it retrospectively to Spanish-era residents who would have described themselves through town, family, legal status, ethnicity or imperial citizenship instead. This guide uses Tejano as a practical bridge across those changing identities without pretending the label meant exactly the same thing in 1750, 1830 and 1845."),
    p("The central point is continuity. The political entity called Texas changed sovereignty several times, but families already rooted in Béxar and other communities did not vanish whenever a flag changed. They became Spanish subjects, Mexican citizens, residents of an independent republic and, for those who remained within the new state, United States citizens while carrying local institutions, property claims, language and family networks across those transitions."),

    h("Béxar was a community before Anglo-American colonization"),
    p("San Antonio de Béxar developed from the mission, presidio and civilian settlement established in the early eighteenth century. Spanish soldiers, settlers, mission residents and Indigenous communities created a complicated society along the San Antonio River. Families lived at Béxar before the Canary Island colonists arrived in 1731, so the city's civilian history cannot be reduced to a single founding group."),
    p("The population was diverse. Spanish colonial records show people of European, Indigenous, African and mixed ancestry living within the community. Legal categories mattered under the colonial system, but everyday life also depended on marriage, kinship, military service, ranching, trade and access to land and water."),
    p("Béxar's distance from the major centers of New Spain made local government unusually important. Alcaldes, cabildos and other municipal institutions handled disputes, policing, property and community affairs. Families who learned how to work through those institutions later carried political experience into Mexican Texas."),

    h("Ranching and trade were part of Tejano Texas before the cattle-drive era"),
    p("Texas ranching did not begin with nineteenth-century cattle drives to Kansas. Under Spanish rule, livestock spread around San Antonio and La Bahía, where missions and private ranchers raised cattle, horses, sheep and goats. By the later eighteenth century private ranching families had become increasingly important to the regional economy."),
    p("Much of the vocabulary that later became ordinary Texas ranch language came through Spanish and Mexican practice: rancho, rodeo, remuda, lariat and other terms reflect a cattle culture that predated the Republic. Tejano ranchers and vaqueros helped build the skills and working systems later absorbed into a broader Texas cowboy identity."),
    p("Trade connected Béxar to New Orleans, northern Mexico and other frontier settlements. José Antonio Navarro's later career as a merchant, rancher and land investor is useful precisely because it shows Tejano life outside the battlefield. Political influence rested partly on business, family networks and local property as well as military service."),

    h("1821 changed sovereignty, not the existence of Tejano communities"),
    p("When Mexico won independence from Spain in 1821, Texas became part of the new Mexican nation. The residents of Béxar did not suddenly become newcomers to their own region. Established families moved into a new constitutional order while carrying forward town government, ranches, trade and political relationships built during Spanish rule."),
    p("The federal Constitution of 1824 joined Texas with Coahuila in the state of Coahuila y Tejas. That arrangement frustrated people who wanted stronger local representation, but it also created new political opportunities. Tejano officeholders served in municipal government, the state legislature and, in some cases, the Mexican federal congress."),
    p("Erasmo Seguín participated in the constitutional politics of the early Mexican republic. José Antonio Navarro served in the Coahuila y Tejas legislature and the federal congress. Juan Martín de Veramendi, a Béxar businessman and official, became vice governor and then governor of Coahuila y Texas. These careers matter because they show that Tejanos were participants in Mexican government, not simply people caught between Mexico and incoming Anglo settlers."),

    h("Many Tejano leaders supported immigration—without agreeing on Texas independence"),
    p("Mexican colonization policy encouraged immigration into a lightly populated northern frontier. Some influential Tejano leaders supported bringing settlers from the United States because they expected population growth, trade, defense and land development to strengthen Texas. They lobbied through local governments and provincial representatives for continued immigration even as Mexican national officials became increasingly alarmed by the scale of the influx."),
    p("That support should not be read backward as proof that Tejano leaders wanted separation from Mexico. Immigration, local autonomy, federalism and independence were different questions. A person could favor more settlers, oppose centralization and still reject a break with Mexico."),
    p("The rapid growth of Anglo-American colonies nonetheless changed the balance of power. By the mid-1830s Tejanos were becoming a small minority within the broader Texas population, especially when compared with the expanding Anglo settlements east of San Antonio. Political alliances that once looked useful could produce very different consequences once demographic control shifted."),

    h("Slavery exposed an important contradiction inside Tejano elite politics"),
    p("Mexican limits on slavery created a major conflict in Texas because many immigrants from the United States wanted enslaved labor protected for cotton agriculture. Tejano opinion was not uniform, but some elite leaders tied economic development to the plantation economy and helped seek legal accommodations that allowed slavery or slave-like labor arrangements to continue."),
    p("José Antonio Navarro himself later owned enslaved people. That fact belongs in the same history as his defense of Tejano political rights. People can be advocates for the rights of one community while participating in the oppression of another, and Tejano political history becomes less accurate if those contradictions are edited away."),
    p("The slavery question also demonstrates why a simple ethnic division—Mexican versus Anglo—cannot explain Mexican Texas. Class, property, federalism, local interests, religion and economic strategy often crossed ethnic lines, while national policy could divide people who otherwise cooperated locally."),

    h("Federalism versus centralism divided Mexican Texas"),
    p("During the early 1830s, political conflict across Mexico intensified between federalists who defended the Constitution of 1824 and centralists who wanted greater national control. Many Tejano leaders had reasons to defend federalism because local government and state institutions gave Béxar more room to manage its affairs."),
    p("Anglo colonists also used federalist language, especially during early confrontations with Mexican military authorities. That created temporary coalitions, but the participants did not necessarily share the same end goal. For many Tejanos, restoring federalism was not the same as creating an independent Anglo-dominated republic."),
    p("Even within Béxar, loyalties differed. Family connections, officeholding, military obligations and judgments about Santa Anna's government pushed residents in different directions. Some joined the rebellion, some remained neutral, some stayed loyal to Mexico, and others changed positions as the conflict escalated."),

    h("The Texas Revolution included Tejano revolutionaries—but not a unified Tejano cause"),
    p("Juan Seguín became the most famous Tejano military figure of the Revolution. Before the war he had already served as an alderman, alcalde and political official in Béxar. In 1835 he organized Tejano volunteers, served with revolutionary forces and later commanded a Tejano unit at San Jacinto."),
    p("José Antonio Navarro and José Francisco Ruiz represented the political side of the independence movement. Both were native-born residents of Béxar and signed the Texas Declaration of Independence. Lorenzo de Zavala was the third Hispanic signer, but he was Mexican-born rather than a native-born Tejano."),
    p("Those names are important, but they should not be used to imply that San Antonio's Mexican population uniformly supported the rebellion. Many Tejanos tried to avoid choosing sides, and others supported Mexico. The Revolution was a civil conflict inside a region whose residents had overlapping local, Mexican and emerging Texan identities."),

    h("Independence made Tejanos a political minority inside the Republic"),
    p("The Republic of Texas was created by a movement in which some Tejanos had played essential roles, yet independence quickly shifted political and demographic power toward Anglo Texans. Estimates from 1836 place the Tejano population in the low thousands compared with tens of thousands of Anglo-American settlers and their enslaved laborers."),
    p("Only four Tejanos from the Béxar District won election to the Republic's Congress: José Antonio Navarro, José Francisco Ruiz, Juan Seguín and Rafael de la Garza. San Antonio remained the strongest center of Tejano electoral power, where Mexican-origin voters continued to elect aldermen and other local officials during the early Republic."),
    p("The broader trend, however, was toward subordination. Language differences, racial prejudice, violence, disputed land titles and the rapid arrival of new settlers weakened the position of families who had lived in Texas before independence. Political rights written on paper did not always protect property, safety or equal treatment."),

    h("Juan Seguín's Republic career shows how quickly loyalty could be questioned"),
    p("After San Jacinto, Seguín served in the Republic Senate and advocated measures useful to Spanish-speaking constituents, including access to laws in Spanish. He also became mayor of San Antonio, demonstrating that Tejano political power had not disappeared immediately after the Revolution."),
    p("At the same time, hostility toward Mexican residents increased. Seguín found himself attacked from opposite directions: Mexican authorities viewed him as a rebel, while some Anglo Texans treated him as suspect because he was Mexican. Under mounting threats and accusations, he resigned as mayor and left for Mexico in 1842."),
    p("His trajectory is a warning against a triumphal story in which Tejano revolutionaries simply became equal citizens of the Republic they helped create. Military service and elected office did not shield them from the racial and national suspicions that followed the war."),

    h("José Antonio Navarro fought inside the political system for Tejano citizenship"),
    p("Navarro's career crossed more governments than almost any other major Texas political figure. He had served under Mexico, signed the Declaration of Independence, helped write the Republic's 1836 constitution and represented Béxar in the Texas Congress. After surviving imprisonment in Mexico following the failed Santa Fe Expedition, he returned to Texas in 1845."),
    p("That timing placed him at another constitutional turning point. Navarro was the sole Tejano delegate to the Convention of 1845, supported annexation to the United States and helped write the first state constitution. During the convention he defended the political status and voting rights of Tejanos as delegates debated who would count as citizens."),
    p("Navarro therefore represents both the possibilities and limits of Tejano elite leadership. He could move through Mexican, Republic and state institutions and argue forcefully for his community's rights, yet the community as a whole was losing political influence as Texas entered the United States."),

    h("Casa Navarro preserves more than one famous man's biography"),
    p("Casa Navarro State Historic Site in San Antonio is valuable because it preserves the physical world around Tejano politics. Navarro purchased property in the Laredito neighborhood in the 1830s, and the surviving adobe, caliche and limestone buildings connect government history to domestic life, commerce, architecture and family."),
    p("The Texas Historical Commission describes Laredito as the historically Mexican west side of San Antonio. That setting matters: the site is not simply the home of a Declaration signer. It is evidence that Tejano neighborhoods, building traditions and businesses formed a living urban landscape around the political figures who appear in state histories."),
    image(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Casa_Navarro_State_Historic_Site_in_2009.jpg?width=1200",
      "Casa Navarro State Historic Site in San Antonio, Texas",
      500,
      333,
      "Texas Historical Commission · CC BY-SA 3.0 · Wikimedia Commons",
      "Casa Navarro preserves the home and commercial complex of José Antonio Navarro inside the former Laredito neighborhood, making Tejano political history visible as a lived San Antonio landscape."
    ),

    h("Statehood did not erase the older Tejano claim to Texas"),
    p("Texas entered the United States in 1845, but Tejano history did not become a foreign prehistory once the state joined the Union. Families in San Antonio, Goliad and other communities had lived through Spanish and Mexican governments, participated in the Revolution in different ways and negotiated citizenship under the Republic before annexation."),
    p("Statehood brought new legal protections in theory and new pressures in practice. Land disputes, discrimination and declining political representation continued, while later incorporation of the Nueces Strip, Rio Grande communities and El Paso expanded who could be described as Tejano within Texas."),
    p("That is why Tejano history belongs near the beginning of a Texas chronology, not in a side box after the Revolution. It explains how local political institutions developed, how ranch culture formed, why Mexican Texas politics were contested and why the Republic inherited communities whose connection to the land was older than the government that claimed to represent them."),

    h("Where to follow Tejano Texas on the ground"),
    list(
      "Casa Navarro State Historic Site in San Antonio: José Antonio Navarro, Laredito, adobe architecture, commerce and Tejano political life.",
      "San Antonio Missions National Historical Park: Indigenous, Spanish colonial and mission communities that predate the later Tejano political era.",
      "Spanish Governor's Palace in San Antonio: presidial and administrative context for Spanish-era Béxar.",
      "The Alamo: essential Revolution history, but best understood alongside Tejano civilian and political sites rather than as the whole San Antonio story.",
      "Presidio La Bahía in Goliad: Spanish and Mexican military history tied to a community where residents identified themselves as Tejanos before independence.",
      "San Felipe de Austin State Historic Site: the Anglo-colonization headquarters that helps explain the demographic and political transformation Tejano leaders were navigating."
    ),
    p("The strongest itinerary starts in San Antonio because the city allows several centuries to be read within a compact geography. The missions and Spanish Governor's Palace establish the colonial world; Casa Navarro makes Tejano civic and domestic life tangible; the Alamo shows the military rupture; and later Republic-era interpretation can then be understood as a change imposed on an existing community rather than the birth of society from empty ground."),
    p("Read together with the Indigenous Texas and Texas-before-the-United-States cornerstone guides, Tejano history makes the central lesson harder to miss: Texas was already a populated, governed and contested place long before it became an American state."),
  ],
};
