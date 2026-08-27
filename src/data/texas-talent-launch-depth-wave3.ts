import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/**
 * Launch-depth editorial upgrades for the third Texas Talent cohort.
 * These records deepen biography, timeline, legacy and Texas-place context.
 * They never change source/image/link readiness and never grant launch approval.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE3: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "ornette-coleman": {
    overview: [
      "Ornette Coleman was born in Fort Worth in 1930 and learned music in a city with a deep Black performance tradition spanning church music, blues, rhythm and blues, dance bands and jazz. He began on alto saxophone and worked local jobs while still young, absorbing the practical language of bands that had to hold a room rather than satisfy a classroom theory exercise. Fort Worth matters to Coleman's story because the freedom associated with his later music did not arise from an absence of tradition. It grew from close contact with blues melody, gospel feeling and the working-band discipline of North Texas. Those foundations remained audible even after his ideas became controversial in more formal jazz circles.",
      "After leaving Texas, Coleman spent difficult years developing an approach that challenged conventional expectations about harmony, intonation and ensemble roles. By the late 1950s, recordings including Something Else!!!! and Tomorrow Is the Question prepared the way for The Shape of Jazz to Come, whose 1959 release announced a mature musical language built around collective improvisation and melodic freedom. Change of the Century and the large-group album Free Jazz pushed the argument further. Listeners who heard only disruption missed how often Coleman's phrases retained the cries, bends and direct emotional logic of blues music. His bands treated composition as a framework for conversation rather than a fixed sequence of chords, a change that altered the possibilities available to later jazz musicians.",
      "Coleman's influence eventually extended far beyond the initial free-jazz controversy. He developed the idea he called harmolodics, worked with electric instrumentation, composed for larger ensembles and continued performing into the twenty-first century. In 2007, Sound Grammar received the Pulitzer Prize for Music, a striking institutional recognition for an artist whose work had once been dismissed as undisciplined. Texas Defined can make that arc more useful by returning to Fort Worth: the city supplies the musical soil beneath an international career. Coleman's profile therefore links North Texas Black music history, jazz innovation and the broader story of artists who used regional traditions as a foundation for radical new forms rather than as limits on experimentation."
    ],
    definingWorks: ["The Shape of Jazz to Come", "Change of the Century", "Free Jazz", "Dancing in Your Head", "Sound Grammar"],
    timeline: [
      { year: "1930", event: "Born in Fort Worth, where church, blues, rhythm-and-blues and jazz traditions shaped his first musical education." },
      { year: "1940s", event: "Begins performing on saxophone in Fort Worth-area bands and develops the working-musician foundation beneath his later experimentation." },
      { year: "1959", event: "Releases The Shape of Jazz to Come, establishing the mature improvisational approach that makes him a central figure in modern jazz." },
      { year: "1960", event: "Records Free Jazz, extending his ideas about collective improvisation and helping give a name to a major experimental movement." },
      { year: "2007", event: "Wins the Pulitzer Prize for Music for Sound Grammar, bringing major institutional recognition to a lifetime of musical innovation." }
    ],
    legacy: [
      "Coleman permanently widened the vocabulary of jazz improvisation. His music showed that ensemble coherence did not have to depend on predetermined chord progressions and that melody, listening and interaction could organize a performance in different ways.",
      "The emotional directness of his playing also kept avant-garde jazz connected to blues and Black vernacular traditions. That relationship matters because it challenges the idea that experimental music must become detached from the communities and sounds that formed the artist.",
      "For Texas Defined, Fort Worth is more than a birthplace tag. It provides the cultural foundation for a career that later transformed international jazz, giving the profile a strong connection to North Texas music history and the state's broader tradition of creative independence."
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Coleman's birthplace and formative musical environment, where Black church music, blues, rhythm-and-blues bands and jazz gave him the practical vocabulary he later transformed." },
      { name: "I.M. Terrell High School", context: "The historic Fort Worth school associated with Coleman's early education and a wider North Texas tradition of Black musical training and performance." }
    ],
    lastReviewedAt: reviewed,
  },
  "townes-van-zandt": {
    overview: [
      "Townes Van Zandt was born in Fort Worth in 1944 into a Texas family whose moves exposed him to several parts of the state and the wider South. By the 1960s, Houston became especially important because its folk clubs offered a working environment for writers who valued songs as stories rather than as vehicles for polished showmanship. Van Zandt performed in rooms where audiences listened closely to lyrics, and that setting suited a writer drawn to spare language, hard travel, damaged characters and landscapes that could feel beautiful and unforgiving at the same time. His Texas identity was therefore not built from slogans; it emerged through the places, speech rhythms and emotional restraint that entered the songs.",
      "His early albums, beginning with For the Sake of the Song, established a catalog that often received more admiration from other musicians than commercial attention. Pancho and Lefty, If I Needed You, To Live Is to Fly, Waiting Around to Die and Tecumseh Valley became standards because they made complicated lives feel inevitable in a few verses. Van Zandt resisted the conventional machinery of country stardom and spent much of his career playing small rooms, traveling and writing. That instability contributed to the mythology around him, but the durable achievement is the craft: compressed narratives, memorable melodic shapes and a willingness to leave moral judgments unresolved. Willie Nelson, Merle Haggard, Emmylou Harris and many later writers carried his songs to audiences far larger than those reached by his own records.",
      "Van Zandt died in 1997, but his influence became increasingly central to the idea of the Texas singer-songwriter as a distinct tradition. Fort Worth gives the profile an origin, Houston explains the club apprenticeship, and Austin represents the larger Texas songwriting community that embraced his work and preserved his reputation. Texas Defined can use those places to distinguish influence from celebrity. Van Zandt was not simply a famous person from Texas; he became a standard against which other writers measured economy, narrative honesty and emotional precision. His story strengthens links among Texas folk music, country songwriting, Houston's club history and Austin's long-running role as a home for writers whose careers do not fit neatly inside commercial categories."
    ],
    definingWorks: ["Pancho and Lefty", "If I Needed You", "To Live Is to Fly", "Waiting Around to Die", "Tecumseh Valley"],
    timeline: [
      { year: "1944", event: "Born in Fort Worth, beginning a Texas story that later moved through Houston clubs and the state's singer-songwriter community." },
      { year: "1960s", event: "Develops as a working songwriter in Houston folk clubs, refining the spare narrative style that becomes his signature." },
      { year: "1968", event: "Releases For the Sake of the Song, the first album in a catalog that steadily gains influence among other writers." },
      { year: "1983", event: "Willie Nelson and Merle Haggard take Pancho and Lefty to a much larger country audience, demonstrating the reach of Van Zandt's writing." },
      { year: "1997", event: "Dies at age fifty-two, leaving a catalog that continues to shape Texas, country and Americana songwriting." }
    ],
    legacy: [
      "Van Zandt helped define the modern Texas songwriter as an artist whose authority comes from craft rather than chart position. His best songs compress entire lives into a few verses without explaining away their contradictions.",
      "His influence traveled through other performers, making the catalog larger than the commercial profile of its author. That pattern became a model for later Americana and independent-country writers who valued durable songs over conventional celebrity.",
      "Fort Worth, Houston and Austin give Texas Defined a clear geographic structure for the story. Together they connect birthplace, apprenticeship and cultural afterlife while linking the profile to the state's folk, country and singer-songwriter traditions."
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Van Zandt's birthplace and North Texas origin, providing the first geographic anchor for a career later associated with several Texas songwriting communities." },
      { name: "Houston", context: "The folk-club environment where Van Zandt developed as a working songwriter and learned to hold attentive audiences with spare, narrative songs." },
      { name: "Austin", context: "A major later audience and cultural home within the Texas singer-songwriter network that preserved, performed and extended Van Zandt's influence." }
    ],
    lastReviewedAt: reviewed,
  },
  "lightnin-hopkins": {
    overview: [
      "Sam Lightnin' Hopkins was born in Centerville in 1912 and grew up in East Central Texas, where blues was part of a living regional culture rather than a record-store category. As a young musician he absorbed the sound of Texas country blues and encountered older performers whose approaches emphasized flexible rhythm, conversational singing and guitar accompaniment closely tied to the voice. Hopkins eventually made Houston his principal base. That move was decisive: the city gave him access to audiences, record makers and a large Black community while allowing him to retain the loose, personal style developed outside formal band arrangements. His music often sounded as though a story were being invented in the moment because, in important ways, it was.",
      "Hopkins began recording in the 1940s and built an enormous catalog around original songs, topical observations and reworked blues forms. Katie Mae Blues helped establish his recording career, and later performances demonstrated an unusual ability to turn everyday incidents into music without losing rhythmic authority. His guitar could supply bass motion, chords, fills and percussion-like accents while the vocal line moved independently above it. During the folk and blues revivals of the late 1950s and 1960s, new audiences encountered Hopkins as both a contemporary performer and a carrier of an older Texas blues language. Unlike artists whose work was rediscovered only after retirement, he continued creating, touring and adapting to the rooms in front of him.",
      "Houston is essential to understanding Hopkins because he made a major national legacy while remaining strongly identified with one Texas city. Centerville supplies the rural origin and early musical environment; Houston explains the decades of performance, recording and neighborhood life that turned him into a defining urban Texas blues figure. His career bridges categories often treated separately: rural country blues, city nightlife, commercial recording and folk-revival concert culture. Texas Defined can use that continuity to connect Leon County, Houston, Texas blues and Black music history. Hopkins's importance lies not only in influence on later guitarists but in the way his recordings preserve the immediacy of a musician able to make local life, personal memory and improvisation feel like the same thing."
    ],
    definingWorks: ["Katie Mae Blues", "Mojo Hand", "Short Haired Woman", "Baby Please Don't Go", "Bring Me My Shotgun"],
    timeline: [
      { year: "1912", event: "Born in Centerville, Texas, into the regional musical environment that supplied the roots of his country-blues style." },
      { year: "1940s", event: "Settles into Houston's music scene and begins the recording career that makes the city his long-term professional base." },
      { year: "1946", event: "Records early sides including Katie Mae Blues, helping establish the intimate voice-and-guitar sound associated with his career." },
      { year: "1960s", event: "Reaches new folk and blues audiences while continuing to perform as a contemporary artist rather than merely a rediscovered historical figure." },
      { year: "1982", event: "Dies in Houston after a prolific career that made him one of the most recorded and recognizable Texas blues musicians." }
    ],
    legacy: [
      "Hopkins made improvisation feel conversational. His songs could respond to current events, people in the room or personal memory while remaining anchored by a guitar style capable of carrying rhythm, harmony and commentary at once.",
      "His long Houston career connected rural Texas blues to urban Black cultural life. That continuity makes him especially valuable for understanding how traditions changed after musicians moved to growing cities without losing their regional identity.",
      "For Texas Defined, Centerville and Houston create a strong place-based arc from Leon County roots to a major metropolitan music scene. The profile naturally supports Texas blues, Houston history and broader Black music authority."
    ],
    texasPlaces: [
      { name: "Centerville", context: "Hopkins's Leon County birthplace and the rural Texas environment in which he first encountered the blues traditions that shaped his voice-and-guitar approach." },
      { name: "Houston", context: "His principal adult home and professional base, where decades of performances and recordings made Hopkins inseparable from the city's Black music history." }
    ],
    lastReviewedAt: reviewed,
  },
  "t-bone-walker": {
    overview: [
      "Aaron T-Bone Walker was born in Linden in 1910 and grew up largely in Dallas, where the music of Deep Ellum and the wider North Texas circuit exposed him to blues performers, street musicians, vaudeville and early jazz. As a young player he encountered the world around Blind Lemon Jefferson and learned that a successful performer needed more than instrumental skill: timing, stage presence and the ability to communicate with a noisy audience all mattered. Dallas supplied that practical education. Walker later became famous for playing electric guitar with a sophistication that changed blues and, eventually, rock music, but the innovations were built on a deep familiarity with Texas blues traditions rather than a rejection of them.",
      "Walker began recording before the electric guitar became a standard lead instrument in blues bands. By the 1940s his amplified single-note lines, chord voicings and polished stagecraft offered a new model for how a guitarist could stand in front of an ensemble. Call It Stormy Monday became his signature composition, but the broader achievement was a vocabulary: bent notes, sustained phrases, jazz-influenced harmony and an electric tone that could carry the melodic drama of a singer. Later guitarists from B.B. King to generations of blues-rock players drew from that approach. Walker also performed with physical flair, sometimes playing behind his head or while moving dramatically across the stage, helping establish the electric guitarist as a visual center of performance.",
      "The Texas story is unusually clear. Linden provides the East Texas birthplace, while Dallas and Deep Ellum explain the formative environment where blues, commerce and nightlife mixed. Walker's later career traveled widely, especially through West Coast recording scenes, yet the musical language he electrified had been learned in Texas. Texas Defined can use his profile to connect Cass County, Dallas County, Deep Ellum, Texas blues and the roots of rock guitar. That connection is stronger than a simple claim that an influential musician happened to be born in the state: Walker represents a direct line from regional Texas blues culture to the sound and stage language of modern electric guitar."
    ],
    definingWorks: ["Call It Stormy Monday", "T-Bone Shuffle", "Mean Old World", "West Side Baby", "Cold Cold Feeling"],
    timeline: [
      { year: "1910", event: "Born in Linden, Texas, before growing up in the Dallas musical environment that becomes central to his development." },
      { year: "1920s", event: "Works around Dallas and Deep Ellum, absorbing blues performance traditions and the stagecraft of the region's working musicians." },
      { year: "1940s", event: "Establishes a mature amplified-guitar style that places the electric guitar at the melodic center of modern urban blues." },
      { year: "1947", event: "Records Call It Stormy Monday, the song most closely associated with his writing and a lasting blues standard." },
      { year: "1987", event: "Is inducted posthumously into the Rock and Roll Hall of Fame, reflecting his foundational influence on electric blues and rock guitar." }
    ],
    legacy: [
      "Walker helped define the electric guitar as a lead voice. His phrasing, tone and harmonic sophistication became a foundation for postwar blues guitar and, through later players, an essential part of rock music's instrumental language.",
      "His showmanship mattered alongside the notes. Walker demonstrated that an electric guitarist could be both musician and visual focal point, creating a performance model adopted by blues and rock players for decades afterward.",
      "Linden and Dallas give the profile a powerful Texas geography. They connect East Texas origins and Deep Ellum apprenticeship to the international history of electric guitar, strengthening Texas Defined's blues and music-authority network."
    ],
    texasPlaces: [
      { name: "Linden", context: "Walker's Cass County birthplace and East Texas origin, providing the first geographic anchor for a career that later transformed amplified blues guitar." },
      { name: "Dallas", context: "The city where Walker grew up around working musicians and developed his craft in the broader North Texas blues, jazz and entertainment scene." },
      { name: "Deep Ellum", context: "Dallas's historic entertainment district represents the dense musical environment in which Walker encountered blues performance, nightlife and the professional culture of working musicians." }
    ],
    lastReviewedAt: reviewed,
  },
  "billy-gibbons": {
    overview: [
      "Billy Gibbons was born in Houston in 1949 and came of age in a city where Gulf Coast blues, rhythm and blues, psychedelic rock and touring music all overlapped. Before ZZ Top, Gibbons led the Moving Sidewalks, a Houston psychedelic band that opened for major acts and gave him experience with amplified guitar at a moment when rock tones were becoming heavier and more experimental. That early chapter matters because ZZ Top's later sound did not begin as a simple revival of old blues. Gibbons learned to combine Texas blues vocabulary with contemporary amplification, concise songwriting and a strong sense of visual identity. Houston supplied both the musical roots and the willingness to mix them with whatever new technology was available.",
      "ZZ Top formed in 1969 and, with Dusty Hill and Frank Beard, developed one of rock's most durable trio formats. Early records such as Tres Hombres brought blues-based boogie to a national audience, while songs including La Grange turned Texas rhythm and guitar tone into radio staples. In the 1980s, Eliminator radically expanded the band's reach by combining Gibbons's guitar with synthesizers, programmed textures and memorable music videos. The shift could have erased the group's regional identity; instead, beards, hot rods, western imagery and Gibbons's compact guitar riffs made the technological update feel like another version of the same Texas sensibility. The band became both musically recognizable and visually unmistakable.",
      "Gibbons's importance rests in continuity across changing eras. His playing is rooted in blues phrasing but famous for economy: carefully shaped tones, rhythmic space and riffs that can define a song before the vocal begins. Houston remains the essential geographic anchor because it connects the Moving Sidewalks, ZZ Top's formation and the Gulf Coast musical culture behind the guitar style. Texas Defined can use the profile to link Harris County, Houston, Texas blues and Texas rock while also showing how a regional identity can survive major changes in production and media. Gibbons did not preserve Texas blues by freezing it; he helped keep it commercially visible by translating its attitude into successive generations of rock sound."
    ],
    definingWorks: ["La Grange", "Tush", "Cheap Sunglasses", "Gimme All Your Lovin'", "Sharp Dressed Man"],
    timeline: [
      { year: "1949", event: "Born in Houston, where Gulf Coast blues and the city's expanding rock scene form the background to his early musical development." },
      { year: "1960s", event: "Leads the Moving Sidewalks in Houston, gaining psychedelic-rock and touring experience before the formation of ZZ Top." },
      { year: "1969", event: "Forms ZZ Top, beginning the trio whose blues-rooted sound becomes one of the longest-running identities in American rock." },
      { year: "1973", event: "ZZ Top releases Tres Hombres, including La Grange, and breaks through to a much larger national audience." },
      { year: "2004", event: "ZZ Top is inducted into the Rock and Roll Hall of Fame, recognizing decades of blues-based rock innovation and influence." }
    ],
    legacy: [
      "Gibbons translated Texas blues guitar into several eras of rock without losing the regional character of his playing. His economy, tone and riff construction influenced players who valued groove and sound as much as technical display.",
      "ZZ Top also demonstrated unusual adaptability. The band moved from blues-boogie clubs to arena rock and MTV-era production while retaining a coherent identity, proving that traditional roots and technological experimentation were not mutually exclusive.",
      "Houston gives Texas Defined a durable geographic center for the story. The city connects Gibbons's psychedelic beginnings, ZZ Top's formation and the Gulf Coast blues traditions that remained audible underneath the band's changing production styles."
    ],
    texasPlaces: [
      { name: "Houston", context: "Gibbons's birthplace, early performance market and the city where the Moving Sidewalks and then ZZ Top established the foundation of his professional career." },
      { name: "Harris County", context: "The county surrounding Gibbons's Houston origin provides a broader geographic anchor for the Gulf Coast blues and rock culture central to his musical identity." }
    ],
    lastReviewedAt: reviewed,
  },
  "jamie-foxx": {
    overview: [
      "Jamie Foxx was born Eric Bishop in Terrell in 1967 and was raised there by his maternal grandparents. Music came before national celebrity: he learned piano, played in church and developed the combination of musical fluency and performance confidence that later allowed him to move between comedy, acting and recording without treating any one field as a novelty. Terrell is important because the career can look, from a distance, like a sequence of unrelated breakthroughs. In fact, the small-city upbringing, church music and school performance experience supplied a common base. Foxx's ability to imitate voices, improvise and respond quickly to an audience eventually led him toward stand-up comedy and then television.",
      "His national breakthrough came on In Living Color in the early 1990s, followed by The Jamie Foxx Show, which gave him a platform to combine comic timing with music. Film roles gradually became more ambitious. In 2004 he appeared in both Collateral and Ray, earning Academy Award nominations for two very different performances. His portrayal of Ray Charles won Best Actor and demonstrated how the musical training behind the comedy career could become a dramatic asset rather than a separate résumé line. Foxx continued moving among genres, from the historical revenge drama Django Unchained to action films, vocal performances and recording projects that reached the pop and R&B charts.",
      "Foxx's Texas connection is concentrated but meaningful. Terrell is not a decorative hometown reference; it is the place where family, church, music and early public performance intersected before the entertainment industry entered the story. Kaufman County gives the profile a geographic connection to the broader North Texas region, while Terrell itself allows Texas Defined to show how national talent can emerge from communities outside the state's largest metros. Foxx's legacy is unusual because success in one medium did not replace the others. He became an Academy Award-winning actor while remaining recognizably a comedian and musician, making the profile a useful bridge among Texas performance, film, television and music history."
    ],
    definingWorks: ["In Living Color", "The Jamie Foxx Show", "Ray", "Collateral", "Django Unchained"],
    timeline: [
      { year: "1967", event: "Born in Terrell, Texas, where church music, piano study and school performance provide the foundation for his later multi-medium career." },
      { year: "1991", event: "Joins In Living Color, gaining a national audience through sketch comedy and character work." },
      { year: "1996", event: "The Jamie Foxx Show premieres, giving Foxx a starring television vehicle that also makes use of his musical ability." },
      { year: "2004", event: "Stars in both Ray and Collateral, earning major awards attention for two sharply different dramatic performances." },
      { year: "2005", event: "Wins the Academy Award for Best Actor for Ray, confirming a dramatic career that had grown well beyond his comedy breakthrough." }
    ],
    legacy: [
      "Foxx became one of the rare modern entertainers to achieve sustained, top-level success in stand-up and sketch comedy, scripted television, dramatic film and popular music. The range is more significant because each field uses different performance disciplines.",
      "His portrayal of Ray Charles showed how musical knowledge can deepen dramatic acting. Rather than imitating the surface of a musician, Foxx drew on years of piano and performance experience that began long before Hollywood.",
      "Terrell gives Texas Defined a strong local origin for an unusually broad career. The profile can connect Kaufman County and North Texas community history with national film, television, comedy and music without pretending the later career remained geographically centered in Texas."
    ],
    texasPlaces: [
      { name: "Terrell", context: "Foxx's birthplace and childhood home, where family life, church piano, school activities and early performance experience created the foundation for his later career." },
      { name: "Kaufman County", context: "The North Texas county containing Terrell provides the wider geographic setting for Foxx's upbringing before comedy and entertainment work took him to national stages." }
    ],
    lastReviewedAt: reviewed,
  },
  "woody-harrelson": {
    overview: [
      "Woody Harrelson was born in Midland in 1961 and spent his earliest childhood in Texas before his family later moved away from the state. That makes his Texas connection narrower than the lifelong relationships of some profiles in this pillar, and the page should say so clearly. Midland remains a legitimate origin point, but it is the beginning of the story rather than the setting of his professional development. After college and theater work, Harrelson reached a national audience as Woody Boyd on Cheers. The character's warmth and apparent simplicity established a comic identity strong enough that it could easily have limited the rest of his career.",
      "Instead, Harrelson repeatedly chose work that complicated that television persona. Natural Born Killers used his likability in a deliberately unsettling way, while The People vs. Larry Flynt brought an Academy Award nomination and established his credibility in dramatic lead roles. Later performances in No Country for Old Men, True Detective and Three Billboards Outside Ebbing, Missouri showed a performer comfortable with western settings, crime stories, moral ambiguity and dark comedy. That range became the defining feature of the career: Harrelson could return to broad comedy without making serious roles feel like temporary departures, and he could play threatening or damaged characters without losing the ease that first made him popular on television.",
      "For Texas Defined, Harrelson is a useful test of the pillar's eligibility rules. Being born in Texas is enough to establish a factual connection, but the profile should not manufacture a deeper Texas upbringing than the evidence supports. Midland and Midland County therefore function as concise origin anchors, while the body of the page focuses on why the work matters. This distinction strengthens the entire pillar by showing readers that Texas Talent is not claiming ownership over every stage of a person's life. Harrelson's page belongs because a major American actor began in West Texas; its credibility depends on being equally clear that his formative education and professional career developed elsewhere."
    ],
    definingWorks: ["Cheers", "Natural Born Killers", "The People vs. Larry Flynt", "No Country for Old Men", "True Detective"],
    timeline: [
      { year: "1961", event: "Born in Midland, establishing the West Texas origin that forms the factual Texas connection for his profile." },
      { year: "1985", event: "Joins Cheers as Woody Boyd and quickly becomes one of network television's most recognizable young comic performers." },
      { year: "1994", event: "Stars in Natural Born Killers, sharply disrupting the genial television persona associated with his early fame." },
      { year: "1996", event: "Leads The People vs. Larry Flynt and receives an Academy Award nomination for Best Actor." },
      { year: "2014", event: "Co-stars in the first season of True Detective, adding another major dramatic role to an already wide-ranging career." }
    ],
    legacy: [
      "Harrelson's strongest achievement is range without loss of identity. He moved from an enormously popular sitcom role into difficult independent films, studio comedies and prestige drama while remaining recognizable as the same performer.",
      "His career also demonstrates how comic timing can support rather than obstruct serious acting. Directors repeatedly used his ease, humor and unpredictability to make darker characters more complicated and less conventional.",
      "The Texas value is deliberately modest and precise: Midland is the birthplace, not an invented lifelong cultural claim. Keeping that distinction visible helps Texas Defined maintain a credible eligibility standard across the larger Talent collection."
    ],
    texasPlaces: [
      { name: "Midland", context: "Harrelson's birthplace and earliest childhood setting in West Texas, providing a factual origin point without overstating the geography of his later upbringing or career." },
      { name: "Midland County", context: "The county surrounding his birthplace gives the profile a clear regional anchor within West Texas while preserving the limited scope of Harrelson's Texas connection." }
    ],
    lastReviewedAt: reviewed,
  },
  "tommy-lee-jones": {
    overview: [
      "Tommy Lee Jones was born in San Saba in 1946 and spent parts of his youth in several Texas communities, including Midland and Dallas, before leaving the state for Harvard. That movement across Texas helps explain why his public identity has remained associated with more than one region: Central Texas, oil-country West Texas, large-city Dallas and later ranching interests all belong to the background. Jones began working professionally after college and gradually built a screen persona defined by economy. He rarely needed long speeches to communicate authority, irritation or moral judgment, and filmmakers learned to use that restraint in westerns, crime stories and contemporary dramas.",
      "His career spans television, major studio films and directing. The Texas-set miniseries Lonesome Dove connected him with one of the state's most important modern western stories, while JFK and The Fugitive brought major critical and commercial attention. Jones won the Academy Award for Best Supporting Actor for The Fugitive, turning a relentless lawman into the role most widely associated with him. Later projects such as No Country for Old Men and The Three Burials of Melquiades Estrada returned to landscapes and moral questions closely connected with Texas and the borderlands. Three Burials is especially important because Jones directed and starred in the film, making his interest in the region part of his work as a filmmaker rather than only as a performer.",
      "Jones's Texas connection is therefore both biographical and artistic. San Saba is the birthplace, Midland and Dallas belong to the youth story, and South Texas ranch and border interests became visible in later life and filmmaking. Texas Defined can use those places to connect an acting profile with ranch culture, western literature, border narratives and the visual landscapes of Texas cinema. His legacy is not that he always plays the same Texan character. It is that a distinctly controlled performance style proved useful across genres, while some of his most personal work returned to the state and region that formed the earliest part of his identity."
    ],
    definingWorks: ["Lonesome Dove", "JFK", "The Fugitive", "No Country for Old Men", "The Three Burials of Melquiades Estrada"],
    timeline: [
      { year: "1946", event: "Born in San Saba, Texas, before spending parts of his youth in other Texas communities including Midland and Dallas." },
      { year: "1970", event: "Begins a professional screen career after graduating from Harvard, starting decades of work across film, television and theater." },
      { year: "1989", event: "Appears in Lonesome Dove, linking his screen career to one of the most influential modern Texas western stories." },
      { year: "1994", event: "Wins the Academy Award for Best Supporting Actor for The Fugitive after turning U.S. Marshal Samuel Gerard into a defining role." },
      { year: "2005", event: "Directs and stars in The Three Burials of Melquiades Estrada, bringing his interest in Texas borderlands directly into his filmmaking." }
    ],
    legacy: [
      "Jones made restraint a powerful screen instrument. His clipped delivery and physical stillness gave authority figures and western characters a weight that could carry scenes without theatrical excess.",
      "As a director and actor, he repeatedly returned to stories about land, borders, law and personal obligation. Those subjects made his Texas connection artistically relevant rather than merely biographical.",
      "San Saba, Midland, Dallas and South Texas allow Texas Defined to build one of the pillar's richest place networks, connecting performance with ranch culture, western storytelling and borderlands cinema."
    ],
    texasPlaces: [
      { name: "San Saba", context: "Jones's Central Texas birthplace and the clearest starting point for a life whose public identity remained strongly associated with Texas and the American West." },
      { name: "Midland", context: "One of the Texas communities connected with Jones's youth, adding a West Texas layer to the geography behind his later western screen persona." },
      { name: "Dallas", context: "A major Texas city associated with Jones's upbringing and education before he left the state for Harvard and a professional acting career." },
      { name: "South Texas", context: "The ranching and borderlands region that became important in Jones's later life and in personally significant filmmaking such as Three Burials." }
    ],
    lastReviewedAt: reviewed,
  },
  "wes-anderson": {
    overview: [
      "Wes Anderson was born in Houston in 1969 and grew up there, attending St. John's School before studying at the University of Texas at Austin. Houston is more than a birth record in his biography because school theater, childhood creative projects and the city's visual environments belong to his earliest experiments with storytelling. At UT Austin, Anderson met Owen Wilson, beginning the collaboration that produced the Bottle Rocket short and then the 1996 feature. That pathway—Houston childhood to Austin collaboration—gives Texas a clear role in the origin of a filmmaking career later associated with highly controlled imaginary worlds and international locations.",
      "Bottle Rocket introduced several traits that would become recognizable in Anderson's work: carefully organized frames, melancholy characters, precise comic timing and an affection for people whose elaborate plans exceed their competence. Rushmore, filmed substantially in Houston, deepened the style while returning Anderson to familiar Texas settings. The Royal Tenenbaums expanded the scale of his ensemble storytelling, and later films including The Grand Budapest Hotel pushed production design, miniatures, color and camera movement into an increasingly formal visual language. The consistency can make the films look effortless, but their identity depends on an enormous amount of collaboration in design, music, performance and editing.",
      "Anderson's Texas connection is strongest at the beginning of the career, and the profile should preserve that chronology. Houston represents childhood and early imagination; St. John's connects directly to Rushmore's school-world inspiration and production history; Austin represents UT, Owen Wilson and the Bottle Rocket partnership. Later work was made around the world, so Texas Defined does not need to force a Texas reading onto every film. The more compelling story is that one of contemporary cinema's most distinctive visual styles began through friendships and projects formed in Texas. That makes Anderson valuable to a future Texas film cluster while also connecting Houston and Austin as two different kinds of creative incubator."
    ],
    definingWorks: ["Bottle Rocket", "Rushmore", "The Royal Tenenbaums", "Fantastic Mr. Fox", "The Grand Budapest Hotel"],
    timeline: [
      { year: "1969", event: "Born in Houston, where school, family and early creative experiments form the first part of his filmmaking story." },
      { year: "1990s", event: "Meets Owen Wilson while studying at the University of Texas at Austin and begins developing the project that becomes Bottle Rocket." },
      { year: "1996", event: "Releases the feature version of Bottle Rocket, establishing the collaborative and visual approach that develops across later films." },
      { year: "1998", event: "Releases Rushmore, filmed substantially in Houston and drawing directly on the kind of private-school environment Anderson knew growing up." },
      { year: "2014", event: "Releases The Grand Budapest Hotel, one of the most acclaimed and visually elaborate expressions of his mature filmmaking style." }
    ],
    legacy: [
      "Anderson created one of contemporary cinema's most recognizable visual grammars. Symmetry, controlled camera movement, detailed production design and dry performance rhythms became tools other filmmakers and advertisers frequently imitate.",
      "His work also demonstrates the durability of long creative partnerships. Writers, actors, designers and musicians recur across films, giving the body of work continuity even as settings and genres change.",
      "Houston and Austin supply a precise Texas origin story: childhood and Rushmore in Houston, then UT Austin and Bottle Rocket collaboration. Those anchors let Texas Defined connect the profile to real creative places without pretending later international productions are Texas stories."
    ],
    texasPlaces: [
      { name: "Houston", context: "Anderson's birthplace and childhood home, as well as the Texas city whose schools and locations fed directly into his early creative life and Rushmore." },
      { name: "St. John's School", context: "The Houston school Anderson attended and a meaningful reference point for the private-school world later explored and filmed in Rushmore." },
      { name: "University of Texas at Austin", context: "The university where Anderson met Owen Wilson and formed the creative partnership that developed Bottle Rocket into his first feature film." }
    ],
    lastReviewedAt: reviewed,
  },
  "robert-rodriguez": {
    overview: [
      "Robert Rodriguez was born in San Antonio in 1968 and developed his filmmaking ambitions in Texas before the industry regarded him as a professional director. He studied at the University of Texas at Austin and made short films while learning how to stretch limited resources through planning, editing and technical improvisation. That do-it-yourself discipline culminated in El Mariachi, a Spanish-language action film produced for an extraordinarily small budget and sold after attracting attention on the festival circuit. The story became famous because of the low cost, but the more important lesson was Rodriguez's belief that a filmmaker could retain control by understanding every stage of production rather than waiting for a large institution to provide permission.",
      "After El Mariachi, Rodriguez expanded the same approach across studio-backed projects including Desperado, From Dusk Till Dawn, Spy Kids and Sin City. He frequently worked as writer, director, editor, camera operator, composer or visual-effects participant, collapsing roles that larger productions often divide among separate departments. The Spy Kids films demonstrated that his system could support family entertainment as effectively as violent genre work. Sin City, meanwhile, used extensive digital production to translate a graphic visual style to the screen. Across those shifts, Austin became more than a residence. Rodriguez developed production infrastructure there, including Troublemaker Studios, making Central Texas part of the practical economics of his filmmaking.",
      "That studio commitment gives Rodriguez one of the strongest place relationships in the Texas Talent film cohort. San Antonio is the birthplace and early creative environment; UT Austin represents training and the transition into professional work; Austin and Troublemaker Studios represent a long-term production base. Texas Defined can connect the profile not only to biography but to the history of Texas film infrastructure and creative industries. Rodriguez's legacy is therefore twofold: he inspired independent filmmakers by showing what small budgets and technical fluency could accomplish, and he demonstrated that a nationally significant genre-film operation could be built in Texas rather than automatically relocating every stage of production to Los Angeles."
    ],
    definingWorks: ["El Mariachi", "Desperado", "From Dusk Till Dawn", "Spy Kids", "Sin City"],
    timeline: [
      { year: "1968", event: "Born in San Antonio, where his Texas upbringing and early experimentation form the beginning of his filmmaking story." },
      { year: "1992", event: "El Mariachi breaks through on the festival circuit, turning an ultra-low-budget Texas-trained filmmaker into an international independent-film story." },
      { year: "1995", event: "Releases Desperado, expanding the El Mariachi world with studio resources while retaining the kinetic style of his independent breakthrough." },
      { year: "2001", event: "Releases Spy Kids, beginning a successful family-film franchise and demonstrating the range of his Austin-centered production system." },
      { year: "2005", event: "Releases Sin City, using extensive digital techniques to create one of the most visually distinctive projects of his career." }
    ],
    legacy: [
      "Rodriguez became a lasting symbol of practical independent filmmaking. His early career encouraged creators to treat limitations as design problems and to learn production skills rather than assume professional work required a conventional studio pathway.",
      "His multi-role production method anticipated a more technologically flexible era in which directors could control editing, digital effects and other processes with smaller teams and increasingly accessible tools.",
      "Most importantly for Texas Defined, he built significant production infrastructure in Austin. That choice turns his profile into part of the economic and cultural history of Texas filmmaking, not merely the biography of a director who happened to be born in San Antonio."
    ],
    texasPlaces: [
      { name: "San Antonio", context: "Rodriguez's birthplace and early creative environment, establishing the South Texas origin for a filmmaking career later centered on independent production and genre experimentation." },
      { name: "University of Texas at Austin", context: "The university where Rodriguez developed filmmaking skills and projects before El Mariachi transformed him from a Texas student filmmaker into a professional director." },
      { name: "Austin", context: "Rodriguez's long-term production center and the city where he built infrastructure that helped make Central Texas a practical base for nationally distributed films." },
      { name: "Troublemaker Studios", context: "The Austin production facility associated with Rodriguez's effort to keep writing, shooting, editing and effects work under greater creative control in Texas." }
    ],
    lastReviewedAt: reviewed,
  },
};
