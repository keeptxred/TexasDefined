import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });
const image = (src: string, alt: string, width: number, height: number, credit: string, caption: string): ArticleBlock => ({
  type: "image",
  image: { src, alt, width, height, credit },
  caption,
});

export const spanishTexasMilitaryBattleMedinaArticle: Article = {
  id: "evergreen-spanish-texas-military-battle-medina",
  brandId: "texasdefined",
  slug: "spanish-texas-military-battle-medina",
  title: "Battle of Medina: The Bloodiest Battle Fought on Texas Soil",
  dek: "On August 18, 1813, a revolutionary army of Tejanos, Mexicans, Anglo-American volunteers and Native allies met a larger Spanish Royalist force south of San Antonio. The Battle of Medina ended in catastrophe—and helped shape Texas decades before the Alamo.",
  category: "texas-history",
  region: "south-texas",
  hero: {
    src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Map._The_Guti%C3%A9rrez-Magee_Expedition_into_Texas,_1812-1813.png?width=1600",
    alt: "Historic map showing the Gutiérrez-Magee Expedition route through Spanish Texas and the campaign that ended at the Battle of Medina",
    width: 1600,
    height: 1597,
    credit: "Historic 1916 campaign map · Public domain · Wikimedia Commons",
  },
  authorId: "a-marisol",
  publishedAt: "2026-08-20",
  updatedAt: "2026-10-02",
  readingMinutes: 18,
  tags: ["Battle of Medina", "Gutiérrez-Magee Expedition", "Spanish Texas", "Mexican War of Independence", "San Antonio history", "Tejano history", "Texas military history", "Santa Anna"],
  featured: true,
  sourceName: "Joaquín de Arredondo — Report of the Battle of Medina (1813), translated by Mattie Austin Hatcher",
  sourceUrl: "https://www.jstor.org/stable/30242929",
  internalLinks: [
    { href: "/article/texas-military-history-timeline", label: "Texas military history timeline", description: "Place Medina within the longer military history of Texas before and after 1813." },
    { href: "/article/mexican-texas-military-history", label: "Military history of Mexican Texas", description: "Continue into the period after Spanish rule ended in 1821." },
    { href: "/article/texas-revolution-historic-sites-road-trip", label: "Texas Revolution road trip", description: "Follow the later fight over Texas sovereignty into the 1835–1836 Revolution." },
    { href: "/destination/presidio-la-bahia", label: "Presidio La Bahía", description: "See the surviving presidio where the Gutiérrez-Magee Expedition endured a months-long Royalist siege." },
    { href: "/destination/san-antonio-missions-national-historical-park", label: "San Antonio Missions", description: "Explore the mission landscape around the city the Republican Army captured in 1813." },
    { href: "/destination/the-alamo", label: "The Alamo", description: "Connect the Spanish and Mexican eras of San Antonio with the better-known events of 1836." },
    { href: "/texas-history", label: "Texas History", description: "Return to the statewide history collection." },
  ],
  relatedCollections: [],
  relatedDestinations: ["presidio-la-bahia", "san-antonio-missions-national-historical-park", "the-alamo"],
  body: [
    p("The Battle of Medina was fought on August 18, 1813, roughly twenty miles south of San Antonio during the Mexican War of Independence. It was not a small frontier skirmish. About 1,400 men in the Republican Army of the North faced a Spanish Royalist army of about 1,830 commanded by Joaquín de Arredondo. The Republican force collapsed after hours of fighting, fewer than 100 men escaped, and the defeat was followed by executions and severe reprisals in San Antonio."),
    p("That makes Medina essential to understanding Texas before the Alamo. Tejanos, Mexicans, Anglo-American volunteers, Native fighters and Spanish Royalists were already fighting over sovereignty, independence and the political future of Texas more than two decades before the Texas Revolution."),

    h("Battle of Medina at a glance"),
    list(
      "Date: August 18, 1813.",
      "Location: South of San Antonio, in the sandy oak country between the Medina and Atascosa river systems; the precise battlefield boundary remains debated.",
      "Republican commander: Gen. José Álvarez de Toledo y Dubois.",
      "Royalist commander: Gen. Joaquín de Arredondo.",
      "Republican strength: about 1,400 men, including Tejanos, Mexicans, Anglo-American volunteers, Native fighters and former Royalists.",
      "Royalist strength: about 1,830 men.",
      "Result: decisive Spanish Royalist victory.",
      "Losses: historical estimates vary, but the Republican army was nearly annihilated; TSHA reports fewer than 100 escaped and 55 Royalist deaths.",
      "Why it matters: the defeat ended the Gutiérrez-Magee challenge to Spanish rule in Texas and was followed by a harsh campaign of punishment in San Antonio and beyond."
    ),

    image(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Battle_of_Medina.jpg?width=900",
      "Texas historical marker for the Battle of Medina near Leming in Atascosa County",
      293,
      481,
      "DLS Texas · CC0 public-domain dedication · Wikimedia Commons",
      "The 2005 Texas historical marker near Leming says the battle may have taken place in the general vicinity. The exact battlefield has not been conclusively fixed by archaeology."
    ),

    h("Why a war for Mexican independence reached Texas"),
    p("In 1810, the Mexican War of Independence began as insurgents challenged Spanish rule across New Spain. Texas was a remote northern province, but its position beside the United States made it unusually vulnerable to revolution, migration, private military ventures and foreign influence."),
    p("Bernardo Gutiérrez de Lara, a supporter of Mexican independence, traveled to the United States seeking help. He eventually joined forces with Augustus W. Magee, a former U.S. Army officer. Together they helped organize the Republican Army of the North, a coalition whose members did not all share the same motives but did share an immediate goal: remove Spanish authority from Texas."),
    p("The expedition crossed into Texas in 1812, captured Nacogdoches and moved southwest. It occupied Presidio La Bahía at Goliad, where Republican forces survived a long Royalist siege. Magee died during that campaign, but the expedition continued."),

    h("Rosillo changed everything"),
    p("By March 1813, the Republican Army was moving toward San Antonio. Spanish governor Manuel María de Salcedo and Nuevo León governor Simón de Herrera led a Royalist force out to stop them. On March 29, the armies met southeast of San Antonio in the Battle of Rosillo."),
    p("Rosillo was a stunning Republican victory. The Royalist army was routed, losing men, artillery, weapons and hundreds of animals. The Republicans then entered San Antonio and took control of the capital of Spanish Texas. For a moment, the rebellion appeared to have succeeded."),
    p("But the victory also exposed divisions inside the coalition. Republican leaders disagreed over government, military command and treatment of prisoners. Salcedo, Herrera and other captured Royalist officials were executed. The killings alienated some Anglo-American volunteers and deepened mistrust within the army."),

    h("The Republic of Texas of 1813 was real—but short-lived"),
    p("Gutiérrez and his allies proclaimed independence in 1813 and attempted to establish a government in Texas tied to the wider Mexican independence movement. It was not the later Republic of Texas founded in 1836, but it was nevertheless a serious effort to replace Spanish authority with a new political order."),
    p("Internal conflict weakened that government almost immediately. Command of the Republican army shifted repeatedly. By early August, José Álvarez de Toledo had displaced Gutiérrez and taken military command just as a major Spanish counteroffensive was approaching."),

    h("Arredondo marched north to retake Texas"),
    p("Joaquín de Arredondo, commandant general of the Eastern Interior Provinces, assembled a disciplined Royalist army and marched north from the Rio Grande. His force numbered roughly 1,830 men. One of the junior officers in his army was a young Antonio López de Santa Anna."),
    p("Santa Anna's presence is one of the most striking links between Medina and the later Texas Revolution. In 1813 he was a teenage Royalist officer serving under Arredondo. Twenty-three years later, as president and general of Mexico, he would return to Texas at the head of another army during the campaign that included the Alamo, Goliad and San Jacinto."),

    image(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Oleo_Antonio_Lopez_de_Santa_Anna.PNG?width=900",
      "Later nineteenth-century portrait of Antonio López de Santa Anna in military uniform",
      480,
      600,
      "Public-domain artwork · Wikimedia Commons",
      "A later portrait of Antonio López de Santa Anna. As a young Royalist officer, Santa Anna served in Arredondo's army during the 1813 campaign that ended at Medina."
    ),

    h("The Republican army marched out of San Antonio"),
    p("Toledo had about 1,400 men. The force included Anglo-American volunteers, Tejanos, Mexicans, Native fighters and former Royalist soldiers. Tejano leaders urged Toledo to meet Arredondo away from San Antonio so that the city would not become the battlefield."),
    p("On August 17, the Republican army camped south of San Antonio between the Atascosa and Medina river systems. Toledo hoped to ambush the approaching Royalists along the Laredo road. Instead, the next morning Royalist scouts found the Republican position and began drawing the army toward terrain Arredondo had prepared for defense."),

    h("August 18, 1813: the trap closed"),
    p("Royalist cavalry and scouts encouraged the Republicans to pursue. Toledo tried to control the movement, but elements of his army pushed forward across deep sand and through hot brush country. By the time they reached Arredondo's main position, many were exhausted, thirsty and disorganized."),
    p("Arredondo had chosen favorable ground and prepared defensive works. According to later historical accounts based on the campaign record, he held fire until the Republican troops had closed to short range. The battle then developed into a prolonged fight involving infantry, cavalry and artillery."),
    p("For roughly four hours, the Republican army tried to break the Royalist line. Once the Republican formation finally gave way, retreat became slaughter. Men who escaped the battlefield were pursued, captured and in many cases executed. TSHA estimates that fewer than 100 Republican soldiers escaped alive."),
    p("Royalist losses were dramatically smaller. TSHA gives Arredondo's losses as 55 men. The imbalance is one reason Medina is so often described as the bloodiest battle fought on Texas soil: the phrase refers not to an evenly matched exchange of casualties but to the near-destruction of one army."),

    h("The dead were left on the field"),
    p("The aftermath was grim even by the standards of the period. Republican dead were left on the battlefield rather than immediately buried. Historical accounts say their remains remained exposed for years. In 1822, after Mexican independence had been achieved, authorities ordered the bones gathered and buried under an oak tree on the battlefield."),
    p("That burial story also helps explain why identifying the battlefield today matters. Researchers are not looking only for the line of combat; they are also trying to understand where large numbers of men died and where their remains may have been collected or buried."),

    h("Arredondo's victory brought repression to San Antonio"),
    p("The Battle of Medina ended the Republican Army of the North as an effective military force, but the violence did not stop there. Arredondo entered San Antonio, imposed martial law and punished people suspected of supporting the rebellion."),
    p("The repression fell on families as well as soldiers. TSHA records that women—many of them widows and daughters of suspected rebels—were imprisoned in San Antonio. Other suspected supporters faced execution, imprisonment, property loss or exile. Royalist forces also pursued fugitives eastward after the battle."),
    p("This aftermath is central to the meaning of Medina. The battle was not only a military defeat; it reshaped the political and social life of Spanish Texas by crushing an independence movement and terrorizing communities associated with it."),

    h("Why the battlefield is still difficult to pinpoint"),
    p("Medina is unusual because historians know the battle was enormous, yet the precise battlefield has long been debated. Contemporary descriptions placed the fight in the sandy oak country south of San Antonio, then known as el encinal de Medina. Later researchers proposed locations in northern Atascosa County and near old Pleasanton Road."),
    p("The Texas Historical Commission's 2005 marker near Leming is deliberately cautious: it says the battle may have taken place in that general vicinity and notes that the exact site had not been determined archaeologically. A much older 1936 marker in the Losoya area states more confidently that the battle was fought there, illustrating how interpretations of the location have changed over time."),
    p("For visitors, the safest way to understand these markers is as evidence of commemoration and historical investigation—not as surveyed battlefield boundaries. The marker landscape tells the story of where Texans have remembered Medina as much as it tells us exactly where every phase of the battle occurred."),

    h("What you can visit today"),
    p("There is no preserved Battle of Medina battlefield park comparable to San Jacinto or Palo Alto. Visitors instead encounter a scattered landscape of markers, roads and surviving places connected to the campaign."),
    list(
      "Battle of Medina historical marker near Leming: the 2005 Texas Historical Commission marker stands northwest of Leming near Old Applewhite and Bruce roads and explicitly explains that the battle may have occurred in the general vicinity.",
      "Losoya-area Battle of Medina marker: a 1936 Texas Centennial marker at Martinez-Losoya Street and U.S. 281 commemorates the battle from an earlier interpretation of its location.",
      "Presidio La Bahía in Goliad: the Republican Army occupied the presidio and survived a lengthy Royalist siege before marching toward San Antonio.",
      "San Antonio Missions: Mission Espada and Mission Concepción were directly connected to the Republican advance after Rosillo and help visitors understand the physical landscape south of Spanish San Antonio.",
      "San Antonio: the city was the political prize of the 1813 campaign and the scene of harsh Royalist reprisals after Medina."
    ),

    image(
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Map._The_Guti%C3%A9rrez-Magee_Expedition_into_Texas,_1812-1813.png?width=1200",
      "Historic map of the Gutiérrez-Magee Expedition route across Spanish Texas in 1812 and 1813",
      1115,
      1113,
      "Historic 1916 campaign map · Public domain · Wikimedia Commons",
      "The expedition moved from the eastern border through Nacogdoches and La Bahía toward San Antonio before the campaign ended at Medina."
    ),

    h("Why Medina matters in the larger Texas story"),
    p("The easiest mistake is to treat Texas independence history as if it began in 1835. Medina shows that the struggle over who would govern Texas was already violent, international and politically complicated in 1813."),
    p("The Republican Army brought together people who later histories often separate into neat categories: Mexican independence supporters, Tejanos, Anglo-American adventurers, Native allies and defectors from Spanish service. Their coalition briefly defeated Spanish authority in Texas, captured San Antonio and created a revolutionary government before collapsing under military pressure and internal division."),
    p("The battle also connects the Spanish and Mexican eras of Texas. It was fought for the future of a Spanish province during the Mexican independence movement. The young Santa Anna learned military lessons in Arredondo's army. Survivors and families carried memories of the campaign into a Texas that would become part of independent Mexico only eight years later."),
    p("For that reason, Medina belongs in the same broad story as the Alamo, Goliad and San Jacinto—not because the causes were identical, but because all of them grew from recurring questions about sovereignty, political legitimacy, local power and the relationship between Texas and the governments that claimed authority over it."),

    h("Sources and further reading"),
    p("The primary source linked with this article is Joaquín de Arredondo's contemporary report of the Battle of Medina, translated by Mattie Austin Hatcher and published by the Texas State Historical Association in 1908. For modern synthesis, the Handbook of Texas entries on the Battle of Medina, the Battle of Rosillo and Spanish Texas are especially useful. The Texas Historical Commission's Historic Sites Atlas provides the official records and wording for the Leming and Losoya Battle of Medina markers."),
  ],
};