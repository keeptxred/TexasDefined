import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-26";

/**
 * Launch-depth editorial upgrades for the second flagship Texas Talent cohort.
 * These strengthen narrative depth only; readiness, rights and editorial launch
 * approval remain controlled by their existing independent records.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE2: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "george-strait": {
    overview: [
      "George Strait was born in Poteet in 1952 and raised in Pearsall, where South Texas ranch life formed part of the background against which he learned country music. His early biography is important because the later public image—western clothes, ranching references, rodeo stages and a restrained traditional-country sound—did not appear as a marketing invention after fame. After Army service, Strait enrolled at Southwest Texas State University in San Marcos and began performing with the Ace in the Hole Band. The group worked Texas clubs and dance halls, giving Strait years of practical experience before a major-label career began. Those rooms rewarded clear songs, strong rhythm and direct communication with audiences, all traits that remained central when his records started reaching national radio.",
      "Strait's 1981 breakthrough with Unwound arrived at a time when mainstream country music was moving in several directions, yet he built a long career by emphasizing a polished version of traditional country rather than chasing each new trend. Songs such as Amarillo by Morning, The Chair, Check Yes or No and I Cross My Heart became standards because of the combination of strong writing, understated delivery and arrangements that left room for fiddle, steel guitar and classic country phrasing. His relationship with Texas audiences remained unusually visible through major concerts, rodeo appearances and the continued association of his career with San Antonio and South Texas. That continuity helped make Strait a national star who still read clearly as a Texas country artist rather than a generic Nashville celebrity.",
      "The scale of Strait's success matters, but the more useful Texas Defined story is the path that connects place, repertoire and audience. Pearsall explains the ranch-country background; San Marcos explains the Ace in the Hole years and the transition into professional music; San Antonio represents a major performance center and a public home for his Texas audience. His career demonstrates that traditionalism can itself be innovative when an artist sustains it through decades of changing commercial fashion. Strait's profile can therefore connect South Texas ranching, dance halls, rodeo culture and the broader history of Texas country music while remaining grounded in specific places where his story developed."
    ],
    timeline: [
      { year: "1952", event: "Born in Poteet, Texas, and raised in nearby Pearsall." },
      { year: "1970s", event: "Joins the Ace in the Hole Band while attending college in San Marcos and builds a following in Texas venues." },
      { year: "1981", event: "Breaks nationally with Unwound, beginning a major-label career rooted in traditional country." },
      { year: "1992", event: "I Cross My Heart becomes one of his signature recordings during the Pure Country era." },
      { year: "2006", event: "Inducted into the Country Music Hall of Fame." }
    ],
    legacy: [
      "Strait proved that a modern country superstar could maintain a traditional musical vocabulary across decades of changing radio formats. His consistency gave fiddle, steel guitar, western imagery and classic songcraft a continuing place in mainstream country rather than treating them as nostalgic artifacts.",
      "His live career strengthened the connection between Texas country music and large civic stages, especially rodeos and major San Antonio-area events. That scale matters because it shows how traditions associated with dance halls and ranch country could expand into arenas without losing their regional identity.",
      "For Texas Defined, Strait creates a strong geographic chain from Poteet and Pearsall to San Marcos and San Antonio. Those places let the profile connect biography to ranching, education, performance culture and the long-running Texas country tradition instead of stopping at chart statistics."
    ],
    texasPlaces: [
      { name: "Poteet and Pearsall", context: "Strait's birthplace and childhood landscape in South Texas, where ranch life and regional country traditions formed the cultural setting for his early musical identity." },
      { name: "San Marcos", context: "The college city where Strait joined the Ace in the Hole Band and developed as a working performer before securing the recording contract that launched his national career." },
      { name: "San Antonio", context: "A major center of Strait's Texas audience and performance history, linking his career to rodeo culture, large live events and the broader musical life of South Texas." }
    ],
    lastReviewedAt: reviewed,
  },
  "stevie-ray-vaughan": {
    overview: [
      "Stevie Ray Vaughan was born in Dallas in 1954 and followed his older brother Jimmie into guitar playing while still young. Dallas provided the first layer of his musical education, but Austin became the city where his mature style took shape. During the 1970s, Austin's club scene allowed blues, rock, country and roots musicians to share stages and audiences in a way that encouraged hybrid approaches. Vaughan moved through that environment as a working guitarist, developing the forceful attack, wide vibrato and deep blues vocabulary that would later sound immediately recognizable on record. The city mattered because it gave him years to build a reputation before major-label attention arrived, making the national breakthrough the result of a long regional apprenticeship rather than an overnight discovery.",
      "With Double Trouble, Vaughan turned that club-developed sound into a recording career beginning with Texas Flood in 1983. Pride and Joy, Couldn't Stand the Weather, Cold Shot and later performances displayed a style rooted in Albert King, Jimi Hendrix, Lonnie Mack and Texas blues traditions while still sounding personal. Vaughan's playing helped restore blues guitar to mainstream rock attention during a period when the genre was often treated as either heritage music or a specialized taste. The records were technically impressive, but their power also came from the directness of live performance: a small-group format, prominent guitar tone and an ability to move from aggressive shuffle rhythms to slower blues without losing intensity.",
      "Vaughan died in a helicopter crash in 1990 after a concert in Wisconsin, but Austin and Dallas continued to anchor the public understanding of his life. Austin's Stevie Ray Vaughan Memorial on Lady Bird Lake makes the relationship especially visible in the city's landscape, while Dallas remains the birthplace and family starting point. For Texas Defined, his profile can connect two major Texas cities with the state's blues history and the story of Austin as a live-music incubator. Vaughan's importance is not simply that a famous guitarist came from Texas; his career demonstrates how Texas club culture and blues tradition could produce a sound that reshaped international rock guitar."
    ],
    timeline: [
      { year: "1954", event: "Born in Dallas, Texas." },
      { year: "1970s", event: "Builds his reputation through sustained work in Austin's club scene." },
      { year: "1983", event: "Texas Flood brings Stevie Ray Vaughan and Double Trouble national attention." },
      { year: "1989", event: "Releases In Step, the final studio album issued during his lifetime." },
      { year: "1990", event: "Dies in a helicopter crash after a concert in Wisconsin." }
    ],
    legacy: [
      "Vaughan helped return blues-based guitar playing to the center of mainstream rock without treating the blues as a museum style. His recordings introduced a new generation of listeners to older influences while establishing a tone, attack and rhythmic feel that became widely imitated.",
      "Austin's role in his development reinforces the city's reputation as a place where musicians could build careers through sustained live work before national recognition. His story is therefore part of the history of the clubs, audiences and cross-genre culture that made Austin music distinctive.",
      "The combination of Dallas roots and Austin maturity gives the profile unusually clear geography. Those places, plus the memorial on Lady Bird Lake, allow Texas Defined to connect biography with Texas blues, urban music history and destinations readers can still encounter."
    ],
    texasPlaces: [
      { name: "Dallas", context: "Vaughan's birthplace and earliest musical environment, where family influence and North Texas blues and rock culture formed the first stage of his development as a guitarist." },
      { name: "Austin", context: "The city whose 1970s club scene gave Vaughan the sustained live-performance environment in which he developed the sound and reputation that preceded his national breakthrough." },
      { name: "Lady Bird Lake", context: "The Austin waterfront site of the Stevie Ray Vaughan Memorial, making the city's continuing identification with his music visible in a permanent public landmark." }
    ],
    lastReviewedAt: reviewed,
  },
  "janis-joplin": {
    overview: [
      "Janis Joplin was born in Port Arthur in 1943 and grew up in a Gulf Coast refinery city whose social environment shaped both her sense of difference and her search for music outside the mainstream around her. She became fascinated by blues singers including Bessie Smith and developed an interest in folk and roots music at a time when those recordings offered an alternative emotional language to conventional pop. Port Arthur is therefore important to the story not only as a birthplace but as the setting against which Joplin's musical identity began to form. Her later move into the University of Texas at Austin orbit exposed her to folk, blues and countercultural performers and audiences, giving her an early stage on which to test the raw vocal approach that would become her signature.",
      "Joplin's national breakthrough came after she moved west and joined Big Brother and the Holding Company. The band's appearance at the Monterey Pop Festival in 1967 made her one of the defining voices of the era, and recordings such as Piece of My Heart and Ball and Chain turned emotional extremity into a central feature of rock performance. Her later solo work broadened the arrangements around that voice while keeping the blues influence unmistakable. Songs such as Cry Baby, Mercedes Benz and the posthumously released Me and Bobby McGee showed how she could move between explosive power, humor and vulnerability. Although the most famous phase of the career unfolded outside Texas, the musical interests and performance instincts that fueled it had clear roots in Port Arthur and Austin.",
      "Joplin died in Los Angeles in 1970 at age twenty-seven, but her place in Texas cultural history remains more substantial than a line on a list of famous natives. Port Arthur represents the industrial Gulf Coast environment she came from, while Austin captures an early countercultural chapter in which blues and folk influences became part of a developing performance identity. For Texas Defined, her profile can connect Gulf Coast history, Jefferson County, Austin music culture and Texas blues. It also offers a useful contrast with artists who built entire careers inside the state: Joplin's Texas story is formative rather than geographically continuous, and that distinction should be explained rather than exaggerated."
    ],
    timeline: [
      { year: "1943", event: "Born in Port Arthur, Texas." },
      { year: "1962", event: "Studies at the University of Texas and performs in Austin folk and blues settings." },
      { year: "1967", event: "Breaks through nationally at the Monterey Pop Festival with Big Brother and the Holding Company." },
      { year: "1968", event: "Cheap Thrills becomes a defining album of her career and era." },
      { year: "1970", event: "Dies in Los Angeles at age twenty-seven." }
    ],
    legacy: [
      "Joplin established emotional intensity as a defining feature of rock vocal performance. Her willingness to sound strained, vulnerable, ecstatic and imperfect influenced generations of singers who treated interpretive force as more important than polished restraint.",
      "Her career also brought blues-derived phrasing and repertoire into the center of late-1960s rock, helping connect younger audiences with traditions that preceded the counterculture. The relationship was interpretive rather than simple imitation, and it remains central to understanding her sound.",
      "Texas provides the formative geography: Port Arthur explains the Gulf Coast childhood and sense of outsider identity, while Austin explains an early performance and countercultural setting. Together they let Texas Defined frame Joplin accurately without claiming that her later national career remained Texas-based."
    ],
    texasPlaces: [
      { name: "Port Arthur", context: "Joplin's Jefferson County birthplace and childhood home, an industrial Gulf Coast setting that shaped her early identity before she found artistic community in blues, folk and counterculture." },
      { name: "Austin", context: "The city where her University of Texas years and early folk and blues performances exposed her to audiences and musicians outside the conventional culture of her hometown." }
    ],
    lastReviewedAt: reviewed,
  },
  "waylon-jennings": {
    overview: [
      "Waylon Jennings was born in Littlefield in 1937 and entered music through the practical institutions of West Texas: local radio, regional bands, dances and the close network of musicians around Lubbock. He worked as a radio announcer while still young and became connected with Buddy Holly during the first wave of West Texas rock and roll. That relationship brought Jennings into Holly's touring band and placed him near one of the region's most important musical stories before his own country career had taken shape. Littlefield and Lubbock matter because they show a musician learning the business through broadcast work and live performance, not through a formal industry pipeline. The directness and independence associated with his later outlaw image had roots in that working-musician education.",
      "Jennings spent years developing as a performer in Arizona and Nashville before becoming frustrated with the highly controlled production system surrounding mainstream country records. During the 1970s, he pushed for greater authority over song selection, musicians and studio decisions. Albums and songs including Lonesome, On'ry and Mean, Are You Sure Hank Done It This Way, Good Hearted Woman and Luckenbach, Texas helped define outlaw country not simply as a sound but as an argument over artistic control. His partnership and friendship with Willie Nelson reinforced the Texas dimension of that movement, while Jennings's deeper voice and harder rhythmic approach distinguished his records from Nelson's looser phrasing.",
      "Jennings's legacy is often summarized with the word outlaw, but Texas Defined can make that term more specific by connecting it to geography and career development. Littlefield is the birthplace, Lubbock is the radio and Buddy Holly connection, and the broader West Texas culture explains the practical independence that preceded Nashville conflict. His later career became national and was not confined to Texas, yet songs, imagery and collaborators repeatedly returned to the state. The profile therefore belongs naturally beside Texas country and rock history, showing how the same West Texas network that produced early rock figures also helped shape one of country music's most important challenges to industry convention."
    ],
    timeline: [
      { year: "1937", event: "Born in Littlefield, Texas." },
      { year: "1958", event: "Works with Buddy Holly and joins Holly's touring band during his West Texas radio years." },
      { year: "1973", event: "Lonesome, On'ry and Mean becomes a key statement of the emerging outlaw-country approach." },
      { year: "1976", event: "Wanted! The Outlaws helps bring the outlaw-country movement to a mass audience." },
      { year: "2001", event: "Inducted into the Country Music Hall of Fame." }
    ],
    legacy: [
      "Jennings made creative control part of the public identity of outlaw country. His insistence on choosing material, musicians and production approaches helped shift power toward artists and became as important to the movement's mythology as the sound of the records themselves.",
      "His West Texas beginnings also connect country history to the Buddy Holly and early rock-and-roll story. That overlap shows how radio, touring circuits and regional musicians could move between genre worlds before the music industry placed them into more rigid categories.",
      "For Texas Defined, Littlefield and Lubbock create a strong place-based foundation for a career that later expanded nationally. Those locations connect the profile to Lamb County, Lubbock County, Texas music history and the broader story of artistic independence in Texas country."
    ],
    texasPlaces: [
      { name: "Littlefield", context: "Jennings's Lamb County birthplace and early West Texas home, where regional radio and country music formed part of the environment that preceded his professional career." },
      { name: "Lubbock", context: "The key West Texas music center where Jennings worked in radio and became connected with Buddy Holly, linking his early career to the region's rock-and-roll history." }
    ],
    lastReviewedAt: reviewed,
  },
  "roy-orbison": {
    overview: [
      "Roy Orbison was born in Vernon in 1936 and grew up largely in Wink, a West Texas oil town where music became part of his identity long before the dramatic ballads that later made him internationally famous. He performed while young, formed bands and became part of the same broad regional network of school stages, radio broadcasts and dances that produced other early rock-and-roll figures from West Texas. The landscape mattered because there was no single local music industry to enter; musicians built experience by traveling, broadcasting and playing for regional audiences. Orbison's early Teen Kings period connected him to rockabilly and the first wave of rock and roll, providing a foundation that would later be transformed into a much more individual style.",
      "Orbison's mature recordings moved far beyond straightforward rockabilly. Only the Lonely, Running Scared, Crying, In Dreams and Oh, Pretty Woman used unusual song structures, dramatic dynamic shifts and a voice capable of moving from intimate vulnerability to operatic intensity. The emotional tone distinguished him from many contemporaries whose public images depended more heavily on swagger or dance energy. His career showed that early rock could accommodate melancholy, formal experimentation and a singer who did not conform to the standard frontman model. Even when the records were made outside Texas, the West Texas apprenticeship remained the beginning of the story: a young performer learning songs, band discipline and radio exposure in towns such as Wink and Odessa before the larger industry recognized what made his voice different.",
      "Orbison's Texas connection is therefore best understood as formative geography rather than a lifelong career base. Vernon marks the birthplace, Wink the childhood and teenage development, and Odessa the regional performance and broadcast market connected with his early band years. Those places allow Texas Defined to connect Orbison with West Texas oil-boom communities, regional radio and the state's early rock history without overstating later residence. His influence on pop and rock singing became international, but the first version of the artist emerged from a distinctly West Texas environment where country, rhythm and blues and early rock circulated through small towns and regional stages."
    ],
    timeline: [
      { year: "1936", event: "Born in Vernon, Texas." },
      { year: "1940s", event: "His family settles in Wink, where his formative West Texas musical years begin." },
      { year: "1950s", event: "Performs with the Teen Kings and records during the first wave of rock and roll." },
      { year: "1964", event: "Oh, Pretty Woman becomes one of Orbison's signature international hits." },
      { year: "1987", event: "Inducted into the Rock & Roll Hall of Fame." }
    ],
    legacy: [
      "Orbison expanded the emotional range of early rock and pop. His dramatic ballads, unconventional structures and extraordinary vocal control demonstrated that rock-era records could be theatrical, vulnerable and formally ambitious without losing direct popular appeal.",
      "His career also complicates the standard image of the rock frontman. Dark glasses, relative stillness onstage and a voice centered on longing rather than bravado created a model of intensity very different from the more physical performance styles of many contemporaries.",
      "For Texas Defined, his West Texas beginnings provide the geographic value. Vernon, Wink and Odessa connect an international catalog to the small-town radio, school and regional performance networks that helped produce early Texas rock and roll."
    ],
    texasPlaces: [
      { name: "Wink", context: "Orbison's principal West Texas childhood home and the community most closely associated with his formative musical years, school performances and early development as a singer and guitarist." },
      { name: "Odessa", context: "A major regional city tied to Orbison's early performance and radio environment, helping connect his teenage band years to the broader West Texas music circuit." }
    ],
    lastReviewedAt: reviewed,
  },
};
