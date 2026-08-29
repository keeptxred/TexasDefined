import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/**
 * Launch-depth upgrades for the next Texas Talent cohort plus timeline repairs
 * for wave 2. These edits affect editorial depth only. They do not grant
 * launch-ready status, change image rights, or expose any public route.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE3: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "george-strait": {
    timeline: [
      { year: "1952", event: "Born in Poteet, Texas, and raised in nearby Pearsall." },
      { year: "1970s", event: "After Army service, attends Southwest Texas State University in San Marcos and joins the Ace in the Hole Band." },
      { year: "1981", event: "Breaks nationally with Unwound and begins a long major-label career built around traditional country." },
      { year: "1992", event: "Stars in Pure Country, further linking his public image with Texas country and western culture." },
      { year: "2006", event: "Inducted into the Country Music Hall of Fame." },
    ],
    lastReviewedAt: reviewed,
  },
  "stevie-ray-vaughan": {
    timeline: [
      { year: "1954", event: "Born in Dallas, Texas." },
      { year: "1970s", event: "Builds his reputation in Austin clubs while developing the guitar style later associated with Double Trouble." },
      { year: "1982", event: "Performs at the Montreux Jazz Festival, helping draw international industry attention." },
      { year: "1983", event: "Texas Flood brings Stevie Ray Vaughan and Double Trouble national attention." },
      { year: "1990", event: "Dies in a helicopter crash after a concert in Wisconsin." },
    ],
    lastReviewedAt: reviewed,
  },
  "janis-joplin": {
    timeline: [
      { year: "1943", event: "Born in Port Arthur, Texas." },
      { year: "1962", event: "Studies at the University of Texas and performs in Austin folk and blues settings." },
      { year: "1966", event: "Joins Big Brother and the Holding Company in San Francisco." },
      { year: "1967", event: "Breakthrough performance at the Monterey Pop Festival brings national attention." },
      { year: "1970", event: "Dies in Los Angeles at age twenty-seven; Pearl is released posthumously the following year." },
    ],
    lastReviewedAt: reviewed,
  },
  "waylon-jennings": {
    timeline: [
      { year: "1937", event: "Born in Littlefield, Texas." },
      { year: "1950s", event: "Works in West Texas radio and develops as a regional performer around Littlefield and Lubbock." },
      { year: "1958", event: "Works with Buddy Holly and joins Holly's touring band." },
      { year: "1970s", event: "Becomes a central outlaw-country figure while pushing for greater artistic control over his recordings." },
      { year: "2001", event: "Inducted into the Country Music Hall of Fame." },
    ],
    lastReviewedAt: reviewed,
  },
  "roy-orbison": {
    timeline: [
      { year: "1936", event: "Born in Vernon, Texas." },
      { year: "1940s", event: "His family settles in Wink, where he spends much of his West Texas childhood." },
      { year: "1950s", event: "Performs with the Teen Kings and participates in the first regional wave of rock and roll." },
      { year: "1964", event: "Oh, Pretty Woman becomes one of his defining international hits." },
      { year: "1987", event: "Inducted into the Rock & Roll Hall of Fame." },
    ],
    lastReviewedAt: reviewed,
  },
  "ornette-coleman": {
    overview: [
      "Ornette Coleman was born in Fort Worth in 1930 and learned saxophone in a city with a deep Black musical life. Church music, rhythm and blues, dance bands and jazz all circulated through the same wider environment, giving a young player multiple musical languages before he left Texas. Coleman began performing while still young and worked in regional rhythm-and-blues settings, experiences that taught him how melody and collective improvisation could function outside the formal expectations he would later challenge. Fort Worth matters because the radicalism of his mature work did not begin from isolation. It grew from a practical Texas education in bands, blues feeling, church sound and the discipline of playing for audiences.",
      "By the late 1950s Coleman had developed an approach that unsettled conventional jazz assumptions about chord progressions, ensemble roles and the hierarchy between composition and improvisation. The Shape of Jazz to Come announced that language with unusual clarity, followed by Change of the Century and the large-ensemble experiment Free Jazz. His playing could sound stark or playful, but the central idea was consistent: improvisers should be able to follow melodic logic and one another without being trapped by a fixed harmonic grid. The resulting debates were intense because Coleman was not merely introducing a new saxophone style. He was asking musicians and listeners to reconsider what held a jazz performance together.",
      "Coleman's later work expanded through different ensembles, electric textures and his own idea of harmolodics, while recognition eventually caught up with the scale of his influence. The National Endowment for the Arts named him a Jazz Master, and Sound Grammar received the Pulitzer Prize for Music in 2007. For Texas Defined, his profile should keep the Fort Worth origin visible without pretending his whole career remained local. The value of the Texas connection is formative: the city's Black music traditions gave Coleman an early working vocabulary that he later transformed into one of modern jazz's most consequential ideas. His story also broadens Texas Talent beyond popular stardom by showing Texas as a source of avant-garde innovation.",
    ],
    timeline: [
      { year: "1930", event: "Born in Fort Worth, Texas." },
      { year: "1940s", event: "Begins playing saxophone and performing in local and regional bands." },
      { year: "1959", event: "Releases The Shape of Jazz to Come, a landmark in modern jazz." },
      { year: "1960", event: "Releases Free Jazz, extending his challenge to conventional ensemble and harmonic structures." },
      { year: "2007", event: "Wins the Pulitzer Prize for Music for Sound Grammar." },
    ],
    legacy: [
      "Coleman permanently expanded the vocabulary of jazz improvisation by demonstrating that melodic interaction and ensemble listening could organize a performance without conventional chord changes controlling every moment. The freedom he pursued became foundational to later avant-garde and free-jazz musicians.",
      "His influence reaches beyond a single genre label because his ideas changed how musicians thought about composition, spontaneity and group hierarchy. Even artists who did not adopt his methods had to respond to the possibilities his recordings placed into the conversation.",
      "Fort Worth gives that innovation a specific Texas beginning. Coleman's early exposure to church, rhythm and blues, blues feeling and working bands makes his profile an important bridge between North Texas Black music history and one of the most experimental developments in twentieth-century American music.",
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Coleman's birthplace and formative musical environment, where church, rhythm-and-blues, blues and jazz traditions supplied the working vocabulary from which his later innovations grew." },
      { name: "Tarrant County", context: "The North Texas geographic anchor for Coleman's early life and a practical connection into Texas Defined's broader place and Black-music history coverage." },
    ],
    lastReviewedAt: reviewed,
  },
  "townes-van-zandt": {
    overview: [
      "Townes Van Zandt was born in Fort Worth in 1944 and spent parts of his youth in Texas and elsewhere before emerging in the 1960s as a songwriter on the Houston folk circuit. Houston's clubs gave him an environment where songs could succeed through language, melody and intimacy rather than spectacle. That apprenticeship helped shape the spare approach that became his signature: short lines, carefully chosen images and characters who often seem to be moving through loneliness, distance or uncertain luck. His Texas connection is therefore more than birthplace. Fort Worth marks the beginning, while Houston represents the working scene in which the songwriter became recognizable.",
      "Van Zandt released For the Sake of the Song in 1968 and followed it with a body of work that never made him a conventional commercial star but steadily built his reputation among other musicians. Pancho and Lefty, If I Needed You, To Live Is to Fly, Waiting Around to Die and Tecumseh Valley became standards because singers could inhabit them without exhausting their ambiguity. Willie Nelson and Merle Haggard took Pancho and Lefty to a much larger audience, while Emmylou Harris and many others recorded his songs. That pattern became central to Van Zandt's legacy: the songwriter's influence traveled farther than his own chart history.",
      "Austin later became another important audience and cultural home within the Texas singer-songwriter community, placing Van Zandt inside the network that also connected folk, country and the emerging progressive-country scene. His life was difficult and his career uneven, but reducing the profile to romanticized struggle would miss the craft that made the songs last. For Texas Defined, the strongest approach is geographic and musical: Fort Worth as origin, Houston as apprenticeship, Austin as a later cultural center, and Texas songwriting as the tradition linking those places. Van Zandt matters because he helped establish the Texas songwriter as a distinct artistic figure whose authority comes from the song itself rather than from commercial polish.",
    ],
    timeline: [
      { year: "1944", event: "Born in Fort Worth, Texas." },
      { year: "1960s", event: "Develops as a songwriter and performer in Houston folk clubs." },
      { year: "1968", event: "Releases debut album For the Sake of the Song." },
      { year: "1983", event: "Willie Nelson and Merle Haggard take Pancho and Lefty to No. 1 on the country chart." },
      { year: "1997", event: "Dies in Smyrna, Tennessee, leaving a catalog that continues to circulate through other performers." },
    ],
    legacy: [
      "Van Zandt became a benchmark for Texas songwriting because his reputation rested on durable composition rather than sustained chart success. Other writers treated his songs as examples of how narrative economy, melody and ambiguity could carry emotional weight without ornament.",
      "The number of important artists who recorded his work demonstrates how influence can move through interpretation. Pancho and Lefty and If I Needed You became part of the broader country and folk repertoire, separating the reach of the songs from the scale of his own commercial career.",
      "Fort Worth, Houston and Austin give his profile a strong Texas route. Those places connect birthplace, apprenticeship and later community, allowing Texas Defined to place him inside a real singer-songwriter geography rather than presenting him as a free-floating legend.",
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Van Zandt's birthplace and North Texas origin, providing the first geographic anchor for a career that later became identified with the wider Texas songwriter tradition." },
      { name: "Houston", context: "The folk-club environment where Van Zandt developed his early repertoire, stagecraft and reputation as a serious songwriter during the 1960s." },
      { name: "Austin", context: "A major later audience and cultural home within the Texas singer-songwriter community, connecting Van Zandt to the state's progressive country and folk networks." },
    ],
    lastReviewedAt: reviewed,
  },
  "lightnin-hopkins": {
    overview: [
      "Sam 'Lightnin' Hopkins was born near Centerville in 1912 and grew up in an East Texas musical world shaped by church, work songs, dances and country blues. He encountered older blues musicians while young and developed a style in which guitar accompaniment and storytelling were tightly joined. Rather than treating the instrument as a separate solo voice, Hopkins used rhythm, bass movement, sharp fills and spoken-sounding phrases to answer his own singing. The result could feel casual even when it was highly controlled. Centerville and Leon County matter because they place that sound inside the rural Texas traditions Hopkins carried with him when he later became associated with Houston.",
      "After settling in Houston, Hopkins became one of the city's most prolific recording artists. Songs such as Katie Mae, Short Haired Woman, Mojo Hand and Lightnin's Boogie captured a performer who could turn ordinary events, jokes, danger, relationships or immediate circumstances into blues verses. His records preserved the flexibility of country blues even as the setting became urban and postwar. Hopkins's timing often ignored the square expectations of a band arrangement because he could stretch a phrase or change direction according to the story, a quality that made his solo performances especially distinctive. Houston was not merely where he lived; it became the city most closely identified with the mature career.",
      "The folk and blues revivals of the 1960s brought Hopkins to new audiences without requiring him to reinvent himself as a historical reenactor. He remained a working musician whose repertory connected older Texas blues practice with contemporary city life. He died in Houston in 1982, leaving a vast recorded catalog and a model of improvisational storytelling that influenced blues, folk and rock musicians. For Texas Defined, Hopkins creates a clear east-to-city route: Centerville explains the rural roots, Houston explains the recording career, and Texas blues supplies the larger tradition connecting them. His profile also gives Houston's cultural history a figure whose importance grew from neighborhood-level musical practice rather than from a national industry arriving first.",
    ],
    timeline: [
      { year: "1912", event: "Born near Centerville, Texas." },
      { year: "1920s", event: "Develops as a young musician in East Texas while absorbing country-blues traditions." },
      { year: "1940s", event: "Settles in Houston and begins the recording career that will define his public reputation." },
      { year: "1960s", event: "Reaches new folk and blues audiences while continuing to perform his highly personal Texas blues style." },
      { year: "1982", event: "Dies in Houston after a career that produced an exceptionally large recorded blues catalog." },
    ],
    legacy: [
      "Hopkins preserved the spontaneity of country blues while proving that the form could speak directly to postwar urban life. His songs sound immediate because stories, guitar rhythm and improvised phrasing operate as one flexible performance language.",
      "His enormous recording output documented everyday Black Texas experience with unusual range, moving from humor and complaint to danger, love and observation without separating those subjects into different artistic categories.",
      "The Centerville-to-Houston geography makes Hopkins central to Texas Defined's blues network. His biography connects rural East Texas traditions with Houston's Black cultural history and shows how a regional style could remain locally recognizable while reaching international listeners.",
    ],
    texasPlaces: [
      { name: "Centerville", context: "Hopkins's Leon County birthplace and formative East Texas setting, where country-blues traditions, church music and local performance shaped the musical language he carried into adulthood." },
      { name: "Houston", context: "Hopkins's longtime home, recording center and principal career city, where his improvisational country-blues approach became part of the sound of postwar Black Houston." },
    ],
    lastReviewedAt: reviewed,
  },
  "lead-belly": {
    overview: [
      "Huddie Ledbetter, known as Lead Belly, was born in Louisiana in 1888 and raised partly in the Texas-Louisiana borderlands, where farm work, churches, dances and traveling musicians exposed him to a broad repertory rather than a single genre. He learned guitar and accordion and performed across northeast Texas and Louisiana while absorbing work songs, spirituals, dance pieces, ballads and blues. That breadth later became one of the most important features of his recorded legacy. Texas Defined should therefore frame his connection carefully: he was not Texas-born, but the borderland years were formative enough that northeast Texas belongs in the story of how his repertory and instrumental identity developed.",
      "Lead Belly's life also included incarceration, including years in Texas, before folklorists John and Alan Lomax documented him in the 1930s. The recordings that followed introduced a much wider audience to songs such as Goodnight, Irene, Midnight Special, Cotton Fields and Rock Island Line. He performed material from Black southern traditions as well as popular and topical songs, refusing the clean genre divisions that later music marketing often imposed. His twelve-string guitar became central to his public image, but the larger achievement was repertorial: he carried a huge body of material across oral tradition, personal adaptation and commercial recording.",
      "After his death in 1949, Lead Belly's songs became building blocks for the urban folk revival and later rock musicians, often through cover versions by artists who encountered his repertory secondhand. That afterlife made him a bridge between southern Black folk traditions and new audiences far removed from the Texas-Louisiana border. For Texas Defined, his profile can connect Bowie and Harrison counties with East Texas folk history while also teaching an important editorial distinction: a Texas Talent subject can belong because Texas was formative, not because every major chapter occurred here. The value of the page is to explain that connection precisely rather than convert a borderlands biography into a false birthplace claim.",
    ],
    timeline: [
      { year: "1888", event: "Born in Louisiana and raised partly in the Texas-Louisiana border region." },
      { year: "1900s", event: "Performs across East Texas and Louisiana while developing a wide repertory on guitar and accordion." },
      { year: "1918", event: "Begins a period of incarceration in Texas, one of several prison chapters later associated with his biography." },
      { year: "1930s", event: "Is extensively documented and recorded by folklorists before building a wider performing and recording career." },
      { year: "1988", event: "Inducted posthumously into the Rock & Roll Hall of Fame as an Early Influence." },
    ],
    legacy: [
      "Lead Belly became a crucial bridge between southern Black folk traditions and the twentieth-century urban folk revival. His repertory carried work songs, ballads, blues, spirituals and dance material into recording culture without flattening them into a single category.",
      "The enormous afterlife of songs associated with him demonstrates how influence can move through reinterpretation. Folk, pop and rock performers repeatedly returned to material he recorded, helping songs rooted in regional and oral traditions circulate internationally.",
      "His Texas connection is strongest when described as borderlands formation rather than birthplace. Northeast Texas and the state's prison history belong to the biography, giving Texas Defined a way to connect music history with place while keeping the Louisiana origin explicit.",
    ],
    texasPlaces: [
      { name: "Northeast Texas", context: "A formative borderlands region where Ledbetter learned, performed and absorbed a broad repertory of work songs, spirituals, dance music and blues alongside Louisiana traditions." },
      { name: "Harrison County", context: "Part of the East Texas corridor associated with Lead Belly's early life and musical development, linking the profile to a specific county authority rather than a vague regional label." },
    ],
    lastReviewedAt: reviewed,
  },
  "billy-gibbons": {
    overview: [
      "Billy Gibbons was born in Houston in 1949 and came of age while the city was absorbing blues, rhythm and blues, garage rock and psychedelic music. His early band the Moving Sidewalks reflected the psychedelic side of that moment, giving Gibbons experience in a scene that was locally rooted but connected to the wider rock culture of the late 1960s. By 1969 he had formed ZZ Top with Dusty Hill and Frank Beard. Houston matters to the story because the band's later Texas identity did not appear after national success; it grew from a city where blues tradition and modern amplified rock already overlapped.",
      "ZZ Top's 1970s recordings distilled that mixture into a direct, riff-centered style. La Grange, Tush and Cheap Sunglasses drew on blues structures and boogie while presenting them with dry humor and a distinctly regional attitude. In the 1980s the band embraced synthesizers, tightly engineered production and music video without discarding Gibbons's guitar vocabulary. Gimme All Your Lovin' and Sharp Dressed Man became global hits, and the long beards, cars and visual jokes turned ZZ Top into one of rock's most recognizable images. The shift worked because the underlying identity remained coherent even as the production changed dramatically.",
      "Gibbons's importance to Texas Defined is strongest when the spectacle is connected back to musical place. Houston's blues and rock history explains the raw material; ZZ Top's formation explains the band chemistry; and the later visual persona shows how a regional identity could be exaggerated into international iconography without losing its musical foundation. The Rock & Roll Hall of Fame inducted ZZ Top in 2004, recognizing a career that had already stretched across multiple eras of rock production. Gibbons's profile therefore belongs not only to celebrity culture but to the history of Houston as a music city and to the broader story of Texas blues becoming modern rock.",
    ],
    timeline: [
      { year: "1949", event: "Born in Houston, Texas." },
      { year: "1960s", event: "Develops as a guitarist in Houston and performs with the psychedelic-rock band the Moving Sidewalks." },
      { year: "1969", event: "Forms ZZ Top in Houston with Dusty Hill and Frank Beard." },
      { year: "1983", event: "Eliminator turns ZZ Top into an MTV-era international phenomenon while retaining Gibbons's blues-based guitar identity." },
      { year: "2004", event: "ZZ Top is inducted into the Rock & Roll Hall of Fame." },
    ],
    legacy: [
      "Gibbons helped make a specifically Texas strain of blues-rock internationally recognizable by combining Houston blues vocabulary with heavy guitar tone, concise riffs and a sense of humor that never treated regional identity as solemn heritage.",
      "ZZ Top's ability to modernize its production without abandoning its underlying musical character made the band unusually durable. The transition from 1970s boogie to 1980s electronic production expanded the audience while keeping Gibbons's guitar sound central.",
      "Houston gives the profile its essential Texas anchor. The city's blues and rock scenes explain the musical foundation beneath the beards, cars and visual mythology, allowing Texas Defined to connect one of rock's most famous images to a real local history.",
    ],
    texasPlaces: [
      { name: "Houston", context: "Gibbons's birthplace, early band scene and the city where ZZ Top formed, connecting his guitar style to Houston's overlapping blues, rhythm-and-blues and rock traditions." },
      { name: "Harris County", context: "The county-level geographic anchor for Gibbons's Houston story and a stable Texas Defined connection for future city, blues and rock-history cross-linking." },
    ],
    lastReviewedAt: reviewed,
  },
};