import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/**
 * Launch-depth editorial upgrades for the third Texas Talent cohort.
 * These strengthen narrative depth only; readiness, rights, internal-link
 * certification and editorial launch approval remain independently governed.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE3: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "ornette-coleman": {
    overview: [
      "Ornette Coleman was born in Fort Worth in 1930 and learned saxophone in a city with a deep Black musical life shaped by church music, blues, rhythm and blues, dance bands and jazz. That environment matters because Coleman's later innovations did not emerge from an abstract rejection of tradition. He first learned how melodies worked in working bands and how musicians responded to dancers, congregations and club audiences. As a teenager he played locally and absorbed the sound of Texas blues and Southwestern rhythm-and-blues circuits before leaving home to work professionally. Fort Worth gave him both a practical musical education and a strong melodic instinct that remained recognizable even after his music began challenging conventional ideas about harmony and ensemble structure.",
      "During the 1950s Coleman developed an approach that treated melody and collective improvisation as more important than staying inside familiar chord progressions. The Shape of Jazz to Come, released in 1959, made that approach impossible for the broader jazz world to ignore. Albums including Change of the Century and Free Jazz pushed further, encouraging musicians to listen and react in real time rather than treating a fixed harmonic sequence as the only organizing principle. The controversy surrounding those records sometimes obscured how lyrical Coleman's playing could be. His alto saxophone lines often retained the direct, vocal quality of blues even when the structures underneath them were radically new.",
      "Coleman's later work continued expanding the same questions through electric groups, composition and what he called harmolodics. In 2007, Sound Grammar received the Pulitzer Prize for Music, confirming the scale of an influence that had once been dismissed as disruptive. For Texas Defined, the most useful story begins in Fort Worth: a Texas musician learned inside the city's Black musical traditions, carried that language into the international avant-garde and changed what later improvisers believed a jazz ensemble could do. His profile therefore links Fort Worth cultural history, Texas jazz, Black music history and a wider story about how regional traditions can produce innovations that transform an entire art form."
    ],
    timeline: [
      { year: "1930", event: "Born in Fort Worth, Texas." },
      { year: "1940s", event: "Begins playing saxophone in Fort Worth and works in local and regional bands." },
      { year: "1959", event: "Releases The Shape of Jazz to Come, bringing his new approach to improvisation broad attention." },
      { year: "1960", event: "Records Free Jazz, a landmark large-ensemble experiment that becomes closely associated with the emerging free-jazz movement." },
      { year: "2007", event: "Wins the Pulitzer Prize for Music for Sound Grammar." }
    ],
    legacy: [
      "Coleman permanently expanded the vocabulary of jazz improvisation by showing that musicians could organize a performance around melody, interaction and shared intuition without relying on the same harmonic rules that governed most modern jazz. The result influenced generations of players well beyond the specific label of free jazz.",
      "His Fort Worth beginnings are essential to understanding that innovation. Gospel feeling, rhythm-and-blues directness and Texas blues phrasing remained audible beneath music that critics often described as radical, connecting the avant-garde to regional traditions rather than separating it from them.",
      "For Texas Defined, Coleman is a powerful example of Texas talent whose local foundation produced global consequences. Fort Worth provides the geographic anchor, while Texas jazz and Black music history provide the cultural context needed to explain why his work mattered."
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Coleman's birthplace and formative musical environment, where church music, blues, rhythm and blues, jazz and working-band experience shaped the melodic instincts he later carried into avant-garde jazz." },
      { name: "Tarrant County", context: "The county-level geographic anchor for Coleman's Fort Worth story, connecting his biography to the broader cultural history of North Texas and its Black musical communities." }
    ],
    lastReviewedAt: reviewed,
  },
  "townes-van-zandt": {
    overview: [
      "Townes Van Zandt was born in Fort Worth in 1944 and spent parts of his youth across Texas and the South before finding a serious musical apprenticeship in Houston. By the 1960s, Houston's folk clubs offered a setting where songwriters could test original material in rooms that valued words, character and emotional precision. Van Zandt absorbed blues, folk and country influences there while developing the spare writing style that became his signature. The Texas connection is important because his later reputation as a wandering troubadour can make the career seem geographically rootless. In reality, Fort Worth supplied the origin and Houston supplied one of the most important early professional environments in which his identity as a songwriter took form.",
      "His recordings rarely produced the kind of mainstream commercial success associated with many Texas country stars, but the songs traveled far beyond their original releases. Pancho and Lefty, If I Needed You, To Live Is to Fly, Waiting Around to Die and Tecumseh Valley became touchstones because they combined compressed storytelling with images that felt both specific and mythic. Other performers helped carry that work into wider audiences, including Willie Nelson, Merle Haggard and Emmylou Harris. That pattern made Van Zandt's career unusually influential: writers and musicians treated the songs themselves as a standard even when his own records remained outside the center of country radio.",
      "Austin later became another major audience and cultural home within the Texas singer-songwriter world, linking Van Zandt to the network of clubs, writers and listeners that helped define the state's progressive-country and roots traditions. His life also included addiction, instability and long periods on the road, but those struggles should not replace the craft story. For Texas Defined, Van Zandt belongs in the pillar because Texas shaped both the apprenticeship and the community that preserved his songs. Fort Worth, Houston and Austin create a geographic route through a career whose influence now reaches folk, Americana and country writers around the world."
    ],
    timeline: [
      { year: "1944", event: "Born in Fort Worth, Texas." },
      { year: "1960s", event: "Develops as a songwriter and performer in Houston folk clubs." },
      { year: "1968", event: "Releases his debut album, For the Sake of the Song." },
      { year: "1972", event: "Releases The Late Great Townes Van Zandt, including Pancho and Lefty and If I Needed You." },
      { year: "1997", event: "Dies in Smyrna, Tennessee, leaving a catalog that continues to shape Texas and American songwriting." }
    ],
    legacy: [
      "Van Zandt became a songwriter's songwriter: an artist whose influence is measured less by chart positions than by the number of serious writers who studied, performed and passed along his songs. His concise narratives helped establish a high literary standard inside Texas country and folk traditions.",
      "Houston's folk-club culture was a crucial part of that development, while Austin became an important later community for audiences and fellow musicians. Those cities show how Texas songwriting grew through networks of small rooms and peer communities rather than through one centralized industry.",
      "For Texas Defined, his profile connects Fort Worth origins, Houston apprenticeship and Austin's singer-songwriter culture. That geography makes it possible to explain both the craft and the Texas ecosystem that allowed his songs to endure long after the circumstances of their original recordings."
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Van Zandt's birthplace and North Texas origin, providing the first geographic anchor for a life that later became associated with constant travel and the mythology of the wandering songwriter." },
      { name: "Houston", context: "The folk-club environment where Van Zandt developed as a serious songwriter, performed original material and absorbed the blues and folk traditions that informed his mature writing." },
      { name: "Austin", context: "A major later audience and cultural home within the Texas singer-songwriter community, linking his catalog to the city's progressive-country, folk and roots traditions." }
    ],
    lastReviewedAt: reviewed,
  },
  "lightnin-hopkins": {
    overview: [
      "Sam 'Lightnin'' Hopkins was born in Centerville, Texas, in 1912 and grew up in East Texas at a time when blues circulated through family gatherings, street performance, dances and informal community networks. His early musical world included the influence of older Texas bluesmen and a style of guitar playing built around strong rhythm, conversational phrasing and the ability to shape a song around the moment. Hopkins eventually made Houston his principal base, and that move gave his career a second essential Texas location. In Houston he became a neighborhood musician as well as a recording artist, performing in settings where the line between everyday life and the blues could be unusually direct.",
      "Hopkins began recording in the 1940s and built an enormous catalog over the following decades. His records often sound deceptively simple because the guitar, voice and story seem to move as one unit, but the flexibility of his timing and improvisation made the style difficult to imitate. Songs could respond to relationships, money, weather, travel or events in the world around him, preserving the older blues role of the singer as both entertainer and commentator. During the folk and blues revival, new audiences encountered Hopkins through albums, festivals and touring, allowing a musician deeply identified with Houston and East Texas to become one of the most widely recognized country-blues artists in the world.",
      "The Texas Defined value of Hopkins's story is especially strong because the geography remains legible. Centerville represents the rural East Texas beginnings; Houston represents the urban community where his mature sound and public identity developed. His career connects older acoustic blues traditions with the growth of a modern Texas city, showing that blues history did not simply move from rural places to somewhere outside the state. Hopkins carried it into Houston neighborhoods and recording sessions while preserving a performance style that remained highly personal. That makes him a central bridge between Texas place history, Black cultural history and the broader evolution of American blues."
    ],
    timeline: [
      { year: "1912", event: "Born in Centerville, Texas." },
      { year: "1930s", event: "Settles into Houston's musical life after formative years in East Texas." },
      { year: "1946", event: "Begins the recording career that will produce one of the largest catalogs in Texas blues." },
      { year: "1960s", event: "Reaches new national and international audiences through the folk and blues revival, festivals and touring." },
      { year: "1982", event: "Dies in Houston after decades as one of the city's defining blues musicians." }
    ],
    legacy: [
      "Hopkins preserved the improvisational core of country blues while adapting it to recording studios, urban audiences and the folk-revival circuit. His timing, guitar patterns and conversational lyrics made each performance feel immediate even when the underlying musical language came from much older traditions.",
      "Houston is inseparable from that legacy. Hopkins became part of the city's cultural identity rather than merely a touring artist who happened to live there, giving Texas blues history a durable urban anchor alongside its rural East Texas roots.",
      "For Texas Defined, the Centerville-to-Houston arc connects Leon County, Harris County, Texas blues and Black music history. It gives readers a geographic explanation for how one of the state's most influential blues voices developed and why his work still sounds distinctly tied to place."
    ],
    texasPlaces: [
      { name: "Centerville", context: "Hopkins's Leon County birthplace and formative East Texas setting, where rural blues traditions and community performance shaped the musical language he carried into his professional career." },
      { name: "Houston", context: "Hopkins's principal adult home and performance base, where he became a defining neighborhood musician, prolific recording artist and enduring figure in the city's Black cultural history." }
    ],
    lastReviewedAt: reviewed,
  },
  "lead-belly": {
    overview: [
      "Huddie Ledbetter, known around the world as Lead Belly, was born in Louisiana in 1888 but spent formative years in the Texas-Louisiana borderlands and developed major parts of his musical life inside Texas. His family moved into northeast Texas while he was young, and the region exposed him to work songs, dance music, spirituals, blues and the mixed repertoire expected of a musician who needed to entertain different audiences. Texas therefore belongs in his profile through upbringing and career formation rather than birthplace. That distinction matters for Texas Defined: Lead Belly should not be mislabeled as Texas-born, but the state's border communities, performance circuits and later prison history are central to understanding how his enormous repertoire developed.",
      "As a young musician, Ledbetter performed across the region and spent time in Dallas, where his association with Blind Lemon Jefferson connected him to one of the most important strands of early Texas blues. His life also included violence and incarceration, including imprisonment in Texas. Those episodes became part of the public mythology around him, but the musical story is larger. Lead Belly mastered twelve-string guitar and carried a repertoire that included blues, ballads, children's songs, work songs and topical material. When folklorists John and Alan Lomax recorded him in the 1930s, they encountered not a performer limited to one genre but a living archive of songs that crossed racial, regional and commercial categories.",
      "Lead Belly's later career brought that repertoire to national audiences, and songs associated with him entered folk, rock and popular music through generations of later performers. For Texas Defined, his profile is valuable because it connects northeast Texas to a much larger American music story without overstating the state's claim. Bowie and Harrison county geography, the Dallas blues connection and the Texas prison chapter all help explain the environments through which he moved. His life also demonstrates how borderland culture resists neat state and genre boundaries: a Louisiana-born musician could be deeply shaped by Texas and in turn influence musical traditions far beyond either state."
    ],
    timeline: [
      { year: "1888", event: "Born in Louisiana before spending formative childhood years in the Texas-Louisiana borderlands." },
      { year: "1910s", event: "Performs in Texas and develops a broad repertoire, including a Dallas period associated with Blind Lemon Jefferson." },
      { year: "1918", event: "Is imprisoned in Texas, beginning one of the incarceration chapters later associated with his public biography." },
      { year: "1930s", event: "Is recorded extensively by John and Alan Lomax, bringing his large traditional repertoire to wider documentary attention." },
      { year: "1949", event: "Dies in New York after helping transmit southern folk and blues repertoire to national audiences." }
    ],
    legacy: [
      "Lead Belly became one of the most important transmitters of American folk repertoire in the twentieth century. His recordings preserved songs across blues, ballad, work-song, spiritual and children's traditions, and later musicians repeatedly reinterpreted material associated with him.",
      "His Texas story is strongest when told precisely. Northeast Texas upbringing, Dallas musical connections and incarceration in the state shaped important parts of his life, even though he was born across the Louisiana line. That borderland framing is more accurate and more interesting than treating state identity as a simple birthplace label.",
      "For Texas Defined, the profile connects Bowie County, Harrison County, early Texas blues and the larger history of vernacular music collection. It also provides a useful model for the pillar's eligibility rule: meaningful Texas formation can matter as much as being born inside the state."
    ],
    texasPlaces: [
      { name: "Northeast Texas", context: "The borderland region where Ledbetter spent formative years and absorbed the mixed musical repertoire of Black communities moving between Texas and Louisiana cultural worlds." },
      { name: "Dallas", context: "An important early performance environment associated with Lead Belly's time around Blind Lemon Jefferson, connecting his developing musicianship to the history of Texas blues." },
      { name: "Harrison County", context: "Part of the northeast Texas geography preserved in the readiness record, anchoring the profile to the communities and legal history that formed part of Ledbetter's Texas experience." }
    ],
    lastReviewedAt: reviewed,
  },
  "billy-gibbons": {
    overview: [
      "Billy Gibbons was born in Houston in 1949 and came of age in a city where blues, rhythm and blues, psychedelic rock and Gulf Coast radio all overlapped. Before ZZ Top existed, Gibbons led the Moving Sidewalks, a Houston psychedelic band that opened for major touring acts and gave him experience at the intersection of local club culture and the late-1960s rock explosion. That background matters because the later ZZ Top sound is sometimes reduced to guitars, beards and hot-rod imagery. Gibbons's musical vocabulary was broader from the beginning, combining blues phrasing learned from earlier Black musicians with fuzz, amplified rock tone and the theatrical instincts of psychedelic performance.",
      "ZZ Top formed in 1969 and built its reputation through relentless touring and a sound that made Texas identity part of the music rather than simply part of the marketing. Tres Hombres in 1973 brought a wider breakthrough, with La Grange turning a blues-based boogie into one of the band's defining recordings. Over the next decade, Gibbons refined a guitar style built around economical riffs, unusual tone and rhythmic precision. Eliminator in 1983 then placed that sound inside synthesizers, drum programming and a highly visual MTV-era presentation. The shift could have erased the band's regional identity, but instead it made the combination of Texas blues, technology, cars and humor recognizable around the world.",
      "Gibbons's importance to Texas Defined lies in that continuity. Houston is the birthplace, early band laboratory and cultural anchor; Texas blues provides the older vocabulary; ZZ Top demonstrates how those influences could be modernized repeatedly without becoming anonymous rock. The band's 2004 induction into the Rock & Roll Hall of Fame confirmed a career that had already crossed generations of audiences. Gibbons therefore offers more than a celebrity profile: his story connects Houston's music history, Texas blues, psychedelic rock, arena rock and the visual mythology of cars, guitars and roadside Texas that became part of the band's international identity."
    ],
    timeline: [
      { year: "1949", event: "Born in Houston, Texas." },
      { year: "1960s", event: "Leads Houston psychedelic-rock band the Moving Sidewalks before forming ZZ Top." },
      { year: "1969", event: "Forms ZZ Top, beginning the trio's long fusion of Texas blues, boogie and rock." },
      { year: "1973", event: "ZZ Top releases Tres Hombres, including La Grange, and reaches a much wider audience." },
      { year: "1983", event: "Eliminator combines Gibbons's blues-based guitar language with synthesizers and MTV-era visual storytelling." },
      { year: "2004", event: "ZZ Top is inducted into the Rock & Roll Hall of Fame." }
    ],
    legacy: [
      "Gibbons created one of rock's most recognizable guitar languages by emphasizing groove, tone and economy rather than treating virtuosity as speed alone. His riffs helped make Texas blues vocabulary central to decades of mainstream rock without sounding like historical reenactment.",
      "ZZ Top also became a durable form of Texas visual culture. Cars, roadside imagery, humor, western references and the band's instantly recognizable appearance turned regional symbols into an international identity while the music continued evolving with new production technology.",
      "For Texas Defined, Houston provides the geographic foundation and Texas blues provides the cultural lineage. Gibbons connects a modern global rock career directly back to the city's club scene, Gulf Coast musical mixture and the older guitar traditions that made the sound possible."
    ],
    texasPlaces: [
      { name: "Houston", context: "Gibbons's birthplace and early musical laboratory, where the Moving Sidewalks and the city's mixture of blues, rhythm and blues and psychedelic rock helped shape his approach before ZZ Top." },
      { name: "Harris County", context: "The county authority anchor for Gibbons's Houston story, connecting the profile to the wider Gulf Coast cultural setting from which his Texas blues and rock identity developed." }
    ],
    lastReviewedAt: reviewed,
  },
};
