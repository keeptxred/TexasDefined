import type { TexasTalentProfile } from "@/data/texas-talent";

const reviewed = "2026-08-25";

export const TEXAS_TALENT_PROFILES: readonly TexasTalentProfile[] = [
  {
    slug: "willie-nelson",
    name: "Willie Nelson",
    category: "music",
    connection: "born",
    texasConnection: "Born in Abbott and inseparable from the Austin outlaw-country story.",
    primaryPlaces: ["Abbott", "Austin", "Luck"],
    plannedCrossLinks: ["Hill County", "Austin", "Texas dance halls & honky-tonks", "Texas music history"],
    profileStatus: "researching",
    dek: "From Abbott church music and Central Texas dance halls to the rise of outlaw country in Austin, Willie Nelson's story is one of the clearest examples of Texas shaping an American artist — and the artist, in turn, reshaping the state's musical identity.",
    overview: [
      "Willie Nelson was born in Abbott, Texas, in 1933 and grew up in a small Central Texas community where church music, radio, honky-tonk country, western swing and local dance traditions all fed his ear. The Country Music Hall of Fame notes that his early Texas influences ranged from Ernest Tubb and Bob Wills to the German-American polka bands he played with as a young musician.",
      "After years of songwriting and performing in Texas and Nashville, Nelson returned to Texas and became a central figure in the 1970s Austin music scene. His independent-minded sound and image helped make outlaw country a national movement while keeping Texas places, characters and musical traditions at the center of his work."
    ],
    definingWorks: ["Crazy", "Night Life", "Red Headed Stranger", "Blue Eyes Crying in the Rain", "On the Road Again"],
    timeline: [
      { year: "1933", event: "Born in Abbott, Texas." },
      { year: "1950s", event: "Works as a musician and radio DJ while writing songs and playing Texas honky-tonks." },
      { year: "1960", event: "Moves to Nashville and establishes himself as a major songwriter." },
      { year: "1970s", event: "Returns to Texas and becomes a defining figure in Austin's progressive-country and outlaw-country scene." },
      { year: "1993", event: "Inducted into the Country Music Hall of Fame." }
    ],
    legacy: [
      "Nelson helped collapse the boundary between traditional country, western swing, pop phrasing, folk songwriting and the freer musical culture of 1970s Austin.",
      "His Texas identity is not decorative background: Abbott, Austin and the state's dance-hall tradition are recurring parts of the story of how his music developed and why it sounded different from Nashville convention."
    ],
    texasPlaces: [
      { name: "Abbott", context: "Birthplace and childhood home; the Central Texas community where family, church and local music shaped his earliest years." },
      { name: "Austin", context: "The city where Nelson's return to Texas helped catalyze the progressive-country scene that became associated with outlaw country." },
      { name: "Luck", context: "The Hill Country ranch and performance setting associated with Nelson's later Texas cultural presence." }
    ],
    sources: [
      { label: "Country Music Hall of Fame — Willie Nelson", url: "https://www.countrymusichalloffame.org/hall-of-fame/willie-nelson" },
      { label: "Texas State Library — Official Texas State Musicians", url: "https://www.tsl.texas.gov/ref/abouttx/musicians.html" }
    ],
    lastReviewedAt: reviewed,
  },
  {
    slug: "selena",
    name: "Selena",
    category: "music",
    connection: "raised",
    texasConnection: "Born in Lake Jackson, raised in Corpus Christi and central to the modern history of Tejano music.",
    primaryPlaces: ["Lake Jackson", "Corpus Christi", "Houston"],
    plannedCrossLinks: ["Brazoria County", "Nueces County", "Corpus Christi", "Houston", "Texas music history"],
    profileStatus: "researching",
    dek: "Selena's rise from a Texas family band to the defining voice of modern Tejano connected Corpus Christi dance halls, Houston rodeo crowds and bilingual pop culture in a career whose influence has only grown since 1995.",
    overview: [
      "Selena Quintanilla-Pérez was born in Lake Jackson, Texas, in 1971. Her family later moved to Corpus Christi, where Selena y Los Dinos built an audience by performing in the dance halls and nightclubs that sustained Tejano music across South Texas.",
      "By the early 1990s Selena had become the genre's most visible star, combining Tejano traditions with pop presentation and a distinctly Texas bilingual identity. Her 1994 album Amor Prohibido became a landmark, and her appearances at the Houston Livestock Show and Rodeo demonstrated how far her audience had expanded beyond the regional circuit."
    ],
    definingWorks: ["Como la Flor", "Bidi Bidi Bom Bom", "Amor Prohibido", "No Me Queda Más", "Dreaming of You"],
    timeline: [
      { year: "1971", event: "Born in Lake Jackson, Texas." },
      { year: "1982", event: "The Quintanilla family relocates to Corpus Christi as Selena y Los Dinos becomes a professional act." },
      { year: "1989", event: "Signs with EMI Latin after years on the Texas Tejano circuit." },
      { year: "1994", event: "Amor Prohibido becomes one of the defining albums of her career." },
      { year: "1995", event: "Dies in Corpus Christi; Dreaming of You is released posthumously and reaches No. 1 in the United States." }
    ],
    legacy: [
      "Selena expanded the national audience for Tejano music while presenting Mexican American Texas culture as contemporary, ambitious and mainstream rather than regional or peripheral.",
      "Corpus Christi remains the central place for understanding her story through the Selena Museum, Mirador de la Flor and the South Texas performance circuit that shaped her career."
    ],
    texasPlaces: [
      { name: "Lake Jackson", context: "Birthplace and site of Selena's earliest childhood performances with her family." },
      { name: "Corpus Christi", context: "Home base for Selena y Los Dinos, site of Selena Etc., the Selena Museum and Mirador de la Flor." },
      { name: "Houston", context: "A major performance market where her Houston Livestock Show and Rodeo appearances demonstrated her crossover reach." }
    ],
    sources: [
      { label: "Handbook of Texas — Selena", url: "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena" },
      { label: "Texas State Historical Association — Selena born in Lake Jackson", url: "https://www.tshaonline.org/texas-day-by-day/entry/894" }
    ],
    lastReviewedAt: reviewed,
  },
  {
    slug: "buddy-holly",
    name: "Buddy Holly",
    category: "music",
    connection: "born",
    texasConnection: "Born and raised in Lubbock, where West Texas helped shape one of rock and roll's foundational voices.",
    primaryPlaces: ["Lubbock", "Clovis"],
    plannedCrossLinks: ["Lubbock County", "Lubbock", "West Texas", "Texas music history"],
    profileStatus: "researching",
    dek: "Buddy Holly carried the sound of a West Texas teenager from Lubbock radio, school stages and regional recording sessions into the first generation of rock and roll — leaving an influence far larger than his brief career.",
    overview: [
      "Buddy Holly grew up in Lubbock in a musical family and developed his style inside the wide-open musical environment of West Texas. Country, rhythm and blues, gospel and the new sound of rock and roll all circulated through the region, and Holly absorbed them quickly.",
      "With the Crickets and producer Norman Petty, Holly developed a lean guitar-driven sound and wrote or co-wrote records that became rock standards. The City of Lubbock's Buddy Holly Center now preserves the world's largest collection of Holly artifacts and explicitly connects his life to the music of Lubbock and West Texas."
    ],
    definingWorks: ["That'll Be the Day", "Peggy Sue", "Everyday", "Not Fade Away", "Rave On"],
    timeline: [
      { year: "1936", event: "Born in Lubbock, Texas." },
      { year: "1955", event: "Begins recording and performing professionally after developing a following in West Texas." },
      { year: "1957", event: "That'll Be the Day becomes an international hit with the Crickets." },
      { year: "1958", event: "Moves to New York after separating professionally from producer Norman Petty and the Crickets." },
      { year: "1959", event: "Dies in an Iowa plane crash at age 22." }
    ],
    legacy: [
      "Holly helped establish the self-contained rock band model: a singer-songwriter fronting a guitar, bass and drums group that wrote and recorded much of its own material.",
      "Lubbock has made Holly's legacy part of its civic cultural identity through the Buddy Holly Center, the Buddy and Maria Elena Holly Plaza and the West Texas Walk of Fame."
    ],
    texasPlaces: [
      { name: "Lubbock", context: "Birthplace, childhood home and the city most closely associated with Holly's musical formation." },
      { name: "Buddy Holly Center", context: "City-operated museum preserving Holly artifacts while interpreting Lubbock and West Texas music history." },
      { name: "Buddy and Maria Elena Holly Plaza", context: "Public plaza beside the Buddy Holly Center containing the Buddy Holly statue and West Texas Walk of Fame." }
    ],
    sources: [
      { label: "City of Lubbock — Buddy Holly Center", url: "https://www.mylubbock.us/220/Buddy-Holly-Center" },
      { label: "City of Lubbock — Buddy Holly Gallery", url: "https://www.mylubbock.us/526/Buddy-Holly-Gallery" },
      { label: "Rock & Roll Hall of Fame — Buddy Holly archival profile", url: "https://www.rockhall.com/wp-content/uploads/2024/03/Buddy_Holly_1986.pdf" }
    ],
    lastReviewedAt: reviewed,
  },
  {
    slug: "beyonce",
    name: "Beyoncé",
    category: "music",
    connection: "born",
    texasConnection: "Born and raised in Houston, where childhood performance groups became the foundation for a global career.",
    primaryPlaces: ["Houston"],
    plannedCrossLinks: ["Harris County", "Houston", "Texas music history", "Texas culture"],
    profileStatus: "researching",
    dek: "Before the record-setting solo career, Beyoncé was a Houston child performer whose path ran through local stages, Girls Tyme and Destiny's Child — a Texas origin story she has continued to reference throughout her work.",
    overview: [
      "Beyoncé Giselle Knowles was born in Houston in 1981 and began performing as a child. The group Girls Tyme, formed around young Houston performers, eventually evolved into Destiny's Child and became one of the most successful R&B groups of its era.",
      "Her solo career began with Dangerously in Love in 2003 and expanded across R&B, pop, visual albums, film and performance. Houston has remained a recurring part of her public identity and artistic vocabulary, while later projects such as Cowboy Carter made Texas imagery and Black country-music history explicit parts of the conversation."
    ],
    definingWorks: ["Dangerously in Love", "B'Day", "Lemonade", "Renaissance", "Cowboy Carter"],
    timeline: [
      { year: "1981", event: "Born in Houston, Texas." },
      { year: "1990s", event: "Performs with Houston-based Girls Tyme, which evolves into Destiny's Child." },
      { year: "1997", event: "Destiny's Child signs with Columbia Records and begins its major-label career." },
      { year: "2003", event: "Releases debut solo album Dangerously in Love." },
      { year: "2025", event: "Cowboy Carter wins Album of the Year at the Grammys; Beyoncé reaches 35 career Grammy wins." }
    ],
    legacy: [
      "Beyoncé's career connects Houston's Black performance culture to one of the largest global pop careers of the modern era.",
      "Her continued use of Texas references makes Houston more than a birthplace entry: the city functions as an identity marker across music, performance and visual storytelling."
    ],
    texasPlaces: [
      { name: "Houston", context: "Birthplace, childhood home and the city where her earliest performance groups developed." },
      { name: "Harris County", context: "The geographic anchor for a profile that should cross-link into Texas Defined's Houston and county coverage." }
    ],
    sources: [
      { label: "Grammy — Beyoncé artist biography", url: "https://www.grammy.com/artists/beyonce-knowles/12474/" },
      { label: "Grammy — Destiny's Child debut at 25", url: "https://www.grammy.com/news/revisit-destinys-child-debut-album-25th-anniversary-beyonce-knowles-no-no-no/" },
      { label: "Grammy — Beyoncé Songbook", url: "https://www.grammy.com/news/beyonce-songbook-musical-album-music-video-guide/" }
    ],
    lastReviewedAt: reviewed,
  },
  {
    slug: "matthew-mcconaughey",
    name: "Matthew McConaughey",
    category: "film-tv",
    connection: "born",
    texasConnection: "Born in Uvalde, raised partly in Longview and educated at the University of Texas at Austin.",
    primaryPlaces: ["Uvalde", "Longview", "Austin"],
    plannedCrossLinks: ["Uvalde County", "Gregg County", "Travis County", "Austin", "Texas film"],
    profileStatus: "researching",
    dek: "Matthew McConaughey's Texas story runs from Uvalde and Longview to UT Austin, an Austin bar encounter that led to Dazed and Confused, and a later return to the university as a professor of practice.",
    overview: [
      "Matthew McConaughey was born in Uvalde, Texas, and later studied Radio-Television-Film at the University of Texas at Austin, graduating in 1993. UT's Moody College describes him as a native of Uvalde whose acting career was launched after producer Don Phillips met him in an Austin bar and cast him in Dazed and Confused.",
      "His screen career moved through romantic comedies, dramas and independent films before a run of critically acclaimed performances culminated in the Academy Award for Dallas Buyers Club. McConaughey later returned to UT Austin as a visiting instructor and became a professor of practice in the Department of Radio-Television-Film."
    ],
    definingWorks: ["Dazed and Confused", "A Time to Kill", "Mud", "Dallas Buyers Club", "True Detective"],
    timeline: [
      { year: "1969", event: "Born in Uvalde, Texas." },
      { year: "1993", event: "Graduates from UT Austin's Radio-Television-Film program and appears in Dazed and Confused." },
      { year: "1996", event: "Breaks through as a leading actor in A Time to Kill." },
      { year: "2014", event: "Wins the Academy Award and Golden Globe for Dallas Buyers Club." },
      { year: "2019", event: "Joins UT Austin's Moody College faculty as a professor of practice after several years as a visiting instructor." }
    ],
    legacy: [
      "McConaughey's public identity is unusually intertwined with Texas: his birthplace, education, breakout role, later teaching career and many film associations all reconnect to the state.",
      "His profile gives Texas Defined a natural bridge between Uvalde, Longview, Austin, UT Austin and the state's film history."
    ],
    texasPlaces: [
      { name: "Uvalde", context: "Birthplace and the beginning of McConaughey's Texas biography." },
      { name: "Longview", context: "East Texas city associated with his youth and high-school years." },
      { name: "University of Texas at Austin", context: "He earned his film degree here in 1993 and later returned as a professor of practice." },
      { name: "Austin", context: "City where the chance meeting that led to Dazed and Confused helped launch his screen career." }
    ],
    sources: [
      { label: "UT Austin Moody College — Matthew McConaughey faculty profile", url: "https://rtf.utexas.edu/faculty/matthew-mcconaughey" },
      { label: "UT Austin Moody College — Golden Boy", url: "https://moody.utexas.edu/news/golden-boy" }
    ],
    lastReviewedAt: reviewed,
  },
] as const;

export function getTexasTalentProfile(slug: string) {
  return TEXAS_TALENT_PROFILES.find((profile) => profile.slug === slug);
}
