import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

export const spanishTexasMilitaryBattleMedinaArticle: Article = {
  id: "evergreen-spanish-texas-military-battle-medina",
  brandId: "texasdefined",
  slug: "spanish-texas-military-battle-medina",
  title: "Military Texas Before the Republic: Presidios, Filibusters and the Battle of Medina",
  dek: "Long before the Alamo, Spanish soldiers, presidios, Indigenous alliances, imperial rivalry and independence movements shaped Texas. The 1813 Battle of Medina—one of the bloodiest battles fought on Texas soil—was the violent climax of that earlier military world.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Map._The_Guti%C3%A9rrez-Magee_Expedition_into_Texas,_1812-1813.png?width=1600",
    alt: "Historic map of the Gutiérrez-Magee Expedition through Spanish Texas and the 1813 campaign toward the Battle of Medina",
    width: 1600,
    height: 1080,
    credit: "Historic map published 1916 · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  readingMinutes: 17,
  tags: ["Spanish Texas", "Battle of Medina", "Gutiérrez-Magee Expedition", "presidios", "San Antonio history", "Mexican War of Independence", "Texas military history"],
  featured: true,
  sourceName: "Texas Historical Commission",
  sourceUrl: "https://thc.texas.gov/learn/military-history/military-spanish-texas",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place Spanish Texas and Medina before Mexican Texas, the Revolution and the Republic." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution road trip", description: "Continue from the independence struggles of 1812–1813 into the better-known revolution of 1835–1836." },
    { href: "/destination/presidio-la-bahia", label: "Presidio La Bahía", description: "Visit a surviving presidio landscape tied to Spanish, Mexican and revolutionary Texas." },
    { href: "/destination/san-antonio-missions-national-historical-park", label: "San Antonio Missions", description: "See the mission-presidio system that anchored Spanish settlement around San Antonio." },
    { href: "/destination/the-alamo", label: "The Alamo", description: "Connect Mission San Antonio de Valero's Spanish origins with its later revolutionary role." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["presidio-la-bahia", "san-antonio-missions-national-historical-park", "the-alamo"],
  body: [
    p("Texas military history did not begin in 1835. For more than a century before the Texas Revolution, soldiers moved through the region as part of Spain's effort to claim, defend and govern a distant northern frontier. Their work included exploration, presidio garrisons, protection of missions and settlements, diplomacy and warfare with Indigenous nations, defense against rival European powers and, eventually, suppression of revolutionary movements."),
    p("The Texas Historical Commission traces Spanish military activity in Texas from the first mapping of the coast in 1519 through the transfer of authority to independent Mexico in 1821. Seen across that span, the Alamo is not the beginning of the military story. It is one later chapter in a landscape already shaped by forts, missions, border rivalry and contested sovereignty."),

    h("Spain's first military problem was distance"),
    p("Spanish officials claimed an immense territory with very few soldiers and settlements. Expeditions could map rivers, coastlines and routes, but occupation required permanent people, supplies and defensible posts. That logistical weakness defined Spanish Texas as much as any battlefield."),
    p("The arrival of René Robert Cavelier, Sieur de La Salle, on the Texas coast in 1685 gave Spain a new reason to act. French settlement at Matagorda Bay threatened Spain's imperial claim, prompting renewed expeditions and a more sustained effort to establish missions and presidios in East Texas and later around San Antonio."),

    h("Missions and presidios were parts of one frontier system"),
    p("A presidio was not simply a fort in the modern sense. It was a garrison and administrative node intended to support missions, protect routes, deter rival powers and project Spanish authority. In practice, isolated presidios often struggled with manpower, supplies and the enormous distances between settlements."),
    p("San Antonio became especially important because its missions, civilian settlement and military presence formed a durable inland center between the Rio Grande and East Texas. Presidio San Antonio de Béxar and nearby missions helped turn the river corridor into the political and military heart of Spanish Texas."),

    h("Indigenous power limited what Spain could control"),
    p("Spanish maps colored Texas as imperial territory, but control on the ground was uneven. Apache, Comanche, Caddo and other Indigenous nations had their own political systems, alliances, trade networks and military power. Spanish officials alternated among diplomacy, trade, alliance building and punitive campaigns, with outcomes that rarely matched the simplicity of an imperial boundary line."),
    p("That distinction matters. A presidio could protect a settlement without giving Spain effective control over the plains beyond it. Military Texas was therefore a negotiated and contested frontier rather than a uniformly occupied province."),

    h("Texas also became part of the American Revolution's Gulf world"),
    p("During the American Revolution, Spanish Louisiana under Bernardo de Gálvez fought Britain along the Gulf Coast. Cattle from Spanish Texas were driven east to support Spanish forces and their wider campaign. That episode places Texas inside the international military history of the Revolution even though the battles associated with the thirteen colonies occurred far away."),
    p("It also shows why Texas military history cannot be read only from modern U.S. borders. Spanish Texas was connected south to New Spain, east to Louisiana and the Gulf, and west through northern Mexico. Military supply and policy followed those imperial networks."),

    h("After 1800, the frontier became a border with the United States"),
    p("The Louisiana Purchase placed the expanding United States directly beside Spanish territory. Uncertain boundaries, migration and private military adventurers—often called filibusters—made East Texas and the Neutral Ground increasingly unstable. Spanish commanders now had to defend not only settlements but an international border against people who sometimes hoped to detach Texas from Spain."),
    p("The Mexican War of Independence, which began in 1810, added another layer. Rebels challenged Spanish rule across New Spain, and Texas became both a frontier province and a possible base for revolution. That combination produced the Gutiérrez-Magee Expedition."),

    h("The Gutiérrez-Magee Expedition briefly overturned Spanish authority"),
    p("Bernardo Gutiérrez de Lara, a supporter of Mexican independence, joined with former U.S. Army officer Augustus Magee and volunteers from both sides of the border. Their Republican Army of the North entered Texas in 1812, captured Nacogdoches, occupied Presidio La Bahía and survived a long Spanish siege."),
    p("The expedition then moved toward San Antonio. Republican forces defeated Spanish troops at Rosillo in 1813 and entered Béxar, but internal political divisions and violence damaged the coalition. Command eventually passed to José Álvarez de Toledo as a Spanish royalist army under Joaquín de Arredondo approached from the south."),

    h("August 1813: Medina destroyed the republican army"),
    p("The resulting Battle of Medina was catastrophic for the republican force. The Texas Historical Commission describes Arredondo's victory as the bloodiest battle fought on Texas soil, with nearly 1,400 killed. The precise battlefield location remains uncertain, which is an important reminder that even major Texas military landscapes can survive more clearly in documents and memory than on a marked parcel of ground."),
    p("Medina ended the expedition as an effective military threat. The consequences continued after the firing stopped: Spanish authorities imposed harsh reprisals in and around San Antonio, and many families connected to the independence movement endured executions, imprisonment, exile or confiscation."),

    h("Medina belongs before the Alamo in the Texas independence story"),
    p("The 1813 campaign did not create an independent Texas, but it exposed many of the forces that would return: contested sovereignty, Tejano political participation, volunteers from the United States, control of San Antonio and Goliad, and the question of whether Texas would remain tied to a distant central government."),
    p("When visitors move directly from Spanish missions to the Texas Revolution, they can miss this intermediate struggle. Medina shows that independence politics in Texas did not suddenly appear in 1835. People had already fought and died over the future of the province more than two decades earlier."),

    h("How to explore this history today"),
    p("Presidio La Bahía and the San Antonio missions are the strongest surviving public landscapes for understanding the military geography of Spanish Texas. The Medina battlefield itself is more difficult: because the precise site has not been conclusively established, visitors should not treat any single roadside marker as a fully verified battlefield boundary."),
    list(
      "Begin with the Texas Historical Commission's Military in Spanish Texas overview for the statewide chronology.",
      "Use San Antonio Missions National Historical Park to understand how missions, settlement and military protection fit together.",
      "Visit Presidio La Bahía to see a surviving presidio complex with Spanish, Mexican and revolutionary layers.",
      "Treat Battle of Medina markers as commemorative orientation points, not proof of a precisely located battlefield.",
      "Continue into the Texas Revolution and Republic guides to follow how the sovereignty question changed after Mexican independence."
    ),
  ],
};