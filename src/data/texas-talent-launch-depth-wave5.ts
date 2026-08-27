import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/** Launch-depth editorial upgrades only; no launch approval is granted here. */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE5: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "t-bone-walker": {
    overview: [
      "Aaron Thibeaux 'T-Bone' Walker was born in Linden in 1910 and grew up in Dallas in a musical household at a moment when the city's Black entertainment culture joined blues, vaudeville, jazz and popular song. He encountered performers connected to Deep Ellum and learned showmanship as well as instrumental technique, becoming a professional entertainer while still young. The move from northeast Texas to Dallas matters because it places Walker inside two distinct environments: a rural Texas origin and a major urban Black music center where styles and audiences mixed. His later innovations on electric guitar grew from that broad apprenticeship rather than from a single isolated blues tradition.",
      "By the 1940s Walker had developed an electric guitar language that combined blues phrasing, jazz-influenced harmony, amplified tone and dramatic stage presence. Recordings including Mean Old World, T-Bone Shuffle and Call It Stormy Monday provided a model for how a lead guitarist could shape the emotional center of a blues performance rather than simply accompany a singer. Walker's bent notes, single-line runs and chord vocabulary influenced later guitarists including B.B. King and performers who carried electric blues directly into rock and roll. His importance is therefore technical and cultural: he helped define what an electric blues guitarist could sound and look like in front of an audience.",
      "For Texas Defined, Walker is one of the clearest bridges between early Dallas Black music history and the electric styles that later transformed blues and rock. Linden supplies the Cass County birthplace; Dallas supplies the formative urban scene; and Deep Ellum provides the broader cultural setting in which young musicians encountered touring entertainers and local traditions. His national career eventually ranged far beyond Texas, but the state's role is not incidental. Walker's profile helps explain how Texas blues moved from acoustic and vaudeville contexts into amplification, sophisticated band arrangements and a guitar vocabulary that became foundational to popular music far outside the state.",
    ],
    timeline: [
      { year: "1910", event: "Born in Linden, Texas, before growing up in Dallas." },
      { year: "1920s", event: "Performs around Dallas and the Deep Ellum entertainment district while developing as a guitarist and showman." },
      { year: "1940s", event: "Establishes the amplified blues-guitar approach that becomes his defining contribution to modern blues." },
      { year: "1947", event: "Records Call It Stormy Monday, one of the most enduring standards associated with his career." },
      { year: "1987", event: "Inducted posthumously into the Rock & Roll Hall of Fame as an Early Influence." },
    ],
    legacy: [
      "Walker helped establish electric guitar as a lead voice in blues, combining amplification with phrasing, chord sophistication and physical showmanship in a way later guitarists could build upon rather than merely copy.",
      "His influence extends through blues into rock and roll because the guitar vocabulary he popularized became part of the common language inherited by B.B. King, Chuck Berry and generations of amplified players.",
      "The Linden-to-Dallas route gives that innovation a precise Texas geography. Cass County marks the origin, while Dallas and Deep Ellum explain the urban Black performance culture that shaped Walker before his influence became international.",
    ],
    texasPlaces: [
      { name: "Linden", context: "Walker's Cass County birthplace in northeast Texas, providing the first geographic anchor for a career later associated with Dallas and the modernization of electric blues." },
      { name: "Dallas", context: "The formative city where Walker grew up, performed around Black entertainment districts and absorbed the blues, jazz and vaudeville traditions that shaped his electric style." },
    ],
    lastReviewedAt: reviewed,
  },
  "jamie-foxx": {
    overview: [
      "Jamie Foxx was born Eric Bishop in Terrell in 1967 and was raised there by his maternal grandparents. Music came before national comedy or film: he played piano in church, studied music seriously and performed in school, giving the future actor a technical and performance foundation inside a small North Texas community. Terrell matters because the later versatility of Foxx's career—singing, comic timing, mimicry and dramatic performance—did not begin as separate professional lanes. They were all present in some form before he left Texas, which makes the hometown a meaningful origin rather than a decorative birthplace fact.",
      "Stand-up comedy led Foxx toward television and a breakthrough on In Living Color in the early 1990s. The Jamie Foxx Show established him as a sitcom lead, while film roles increasingly demonstrated that the comic persona did not limit his dramatic range. In 2004 he appeared in both Collateral and Ray, receiving Academy Award nominations for each and winning Best Actor for his portrayal of Ray Charles. The performance drew directly on the musical training that had been part of his life since Terrell, making the career's different disciplines converge in one of its most important roles.",
      "Foxx later continued working across film, television and popular music, including major action and dramatic roles as well as recording success. For Texas Defined, his profile offers a strong example of a small-town Texas beginning producing a genuinely multi-disciplinary entertainer. Terrell is the central place; Kaufman County provides the geographic authority layer; and church music, school performance and comedy form a coherent pathway into the later career. The page should resist treating those achievements as an awards list. Its value is to show how several kinds of performance were already being combined before the national audience knew his name. That continuity makes his Texas origin useful for understanding the career's unusual breadth rather than merely locating it.",
    ],
    timeline: [
      { year: "1967", event: "Born in Terrell, Texas, and raised there by his maternal grandparents." },
      { year: "1980s", event: "Develops as a pianist, singer and school performer in Terrell before pursuing comedy." },
      { year: "1991", event: "Joins the cast of In Living Color and gains national television exposure." },
      { year: "2004", event: "Stars in both Ray and Collateral, earning Academy Award nominations for two very different performances." },
      { year: "2005", event: "Wins the Academy Award for Best Actor for Ray." },
    ],
    legacy: [
      "Foxx is unusual among modern entertainers for reaching elite levels in comedy, dramatic acting and popular music without any one field functioning merely as a novelty side project. His range is a central part of the career rather than a marketing label.",
      "Ray demonstrated how those abilities could reinforce one another: musical knowledge, vocal interpretation and acting craft combined in a performance that became the most awarded role of his film career.",
      "Terrell gives the profile a concentrated Texas beginning. The church, school and family environment of a Kaufman County town supplied the earliest performance training for a career that later expanded across several national entertainment industries.",
    ],
    texasPlaces: [
      { name: "Terrell", context: "Foxx's birthplace, childhood home and earliest performance setting, where church piano, school activities and family life supplied a musical and theatrical foundation before national fame." },
      { name: "Kaufman County", context: "The county-level geographic anchor for Foxx's Terrell upbringing and the stable Texas Defined place connection behind future city and North Texas culture links." },
    ],
    lastReviewedAt: reviewed,
  },
  "woody-harrelson": {
    overview: [
      "Woody Harrelson was born in Midland in 1961 and spent his earliest years in Texas before his family life and education took him elsewhere. That makes his Texas connection more concise than the careers of performers who remained rooted in the state, but it is still clear and documentable: Midland is the origin point in a biography that later moved through theater, television and film. Texas Defined should preserve that scale rather than inflate it. The value of the profile is not to claim that West Texas shaped every later role, but to connect a globally familiar actor to a specific birthplace and then distinguish origin from artistic formation.",
      "Harrelson's national breakthrough came when he joined Cheers in 1985 as bartender Woody Boyd. The role established an easy comic persona and earned major television recognition, but the career that followed repeatedly moved away from the expectation that he would remain a sitcom type. Natural Born Killers pushed into violent satire, The People vs. Larry Flynt brought an Academy Award nomination, and No Country for Old Men placed him inside a stark western crime landscape. He later returned to prestige television in True Detective while continuing to alternate between comedy, franchise films and darker independent work.",
      "That flexibility is the larger reason the profile belongs in Texas Talent rather than a generic celebrity list. Harrelson used a warm television image as a starting point and then built a career around tonal unpredictability, moving between broad comedy, political drama, crime stories and ensemble work. Midland remains the precise Texas anchor, while Midland County connects the page into the site's West Texas geography. The profile can therefore demonstrate another eligibility pattern within the pillar: a birthplace connection can be valid when it is accurately described and not exaggerated into a false claim of lifelong Texas formation.",
    ],
    timeline: [
      { year: "1961", event: "Born in Midland, Texas." },
      { year: "1985", event: "Joins Cheers as Woody Boyd and becomes a nationally recognized television performer." },
      { year: "1996", event: "Stars in The People vs. Larry Flynt, earning an Academy Award nomination for Best Actor." },
      { year: "2007", event: "Appears in No Country for Old Men, part of a continuing shift between mainstream and darker dramatic work." },
      { year: "2014", event: "Stars in the first season of True Detective, reinforcing his return to major dramatic television." },
    ],
    legacy: [
      "Harrelson became one of the most flexible performers to emerge from 1980s network television, refusing to let the warmth of Woody Boyd define the emotional range or subject matter of his later work.",
      "His filmography demonstrates unusual comfort moving between satire, crime, comedy, political drama and franchise entertainment, giving directors access to both a familiar public persona and the ability to undermine it.",
      "For Texas Defined, Midland provides a deliberately limited but legitimate geographic connection. Treating that origin accurately is part of the pillar's editorial credibility: Texas Talent should explain the strength of the connection rather than force every subject into the same template.",
    ],
    texasPlaces: [
      { name: "Midland", context: "Harrelson's West Texas birthplace and earliest childhood connection, providing the precise local origin for a career whose later development took place largely outside the state." },
      { name: "Midland County", context: "The county authority behind Harrelson's birthplace and the appropriate Texas Defined geographic link for a profile whose Texas claim should remain narrowly stated and verifiable." },
    ],
    lastReviewedAt: reviewed,
  },
  "tommy-lee-jones": {
    overview: [
      "Tommy Lee Jones was born in San Saba in 1946 and spent parts of his youth in Midland and Dallas before leaving Texas for Harvard. Unlike performers whose state connection is limited to birth, Jones's public identity and later work repeatedly returned to Texas landscapes, ranch culture and western or borderland stories. San Saba supplies the Central Texas origin, while Midland and Dallas add distinct chapters in his upbringing. Those places help explain why the Texas frame remains relevant even though his formal education and early professional acting career moved elsewhere.",
      "Jones built a long screen career through film and television before becoming one of the most recognizable American actors of his generation. Lonesome Dove connected him to an epic Texas western story, JFK placed him inside a major historical drama, and The Fugitive brought the Academy Award for Best Supporting Actor. Later work in No Country for Old Men and The Three Burials of Melquiades Estrada returned him to landscapes and moral questions associated with Texas and the borderlands. As a director, Jones used Three Burials to explore place, responsibility and cross-border life in a way that made regional interest part of the filmmaking itself rather than just the setting.",
      "For Texas Defined, Jones offers one of the richest film profiles for connecting biography to the state's geography. San Saba, Midland and Dallas describe the personal route; South Texas ranching and border interests extend the connection into adulthood; and projects such as Lonesome Dove and Three Burials provide cultural links to western and border narratives. The page should avoid collapsing actor and character into one identity, but it can accurately show how Jones repeatedly chose work that made use of a Texas-inflected authority, landscape awareness and interest in the American West. That repeated return to Texas settings gives the geographic layer lasting editorial value.",
    ],
    timeline: [
      { year: "1946", event: "Born in San Saba, Texas, and later spends parts of his youth in Midland and Dallas." },
      { year: "1970", event: "Begins his professional screen career after graduating from Harvard." },
      { year: "1989", event: "Appears as Woodrow F. Call in the Texas-set miniseries Lonesome Dove." },
      { year: "1994", event: "Wins the Academy Award for Best Supporting Actor for The Fugitive." },
      { year: "2005", event: "Directs and stars in The Three Burials of Melquiades Estrada, a borderlands story closely tied to his regional interests." },
    ],
    legacy: [
      "Jones brought a distinctive combination of severity, restraint and western authority to mainstream American film, making him especially effective in roles where competence and moral ambiguity coexist rather than resolve neatly.",
      "His directing work demonstrates that the Texas and borderland connection is not only a casting association. The Three Burials of Melquiades Estrada made landscape and cross-border responsibility central subjects under his own creative control.",
      "San Saba, Midland, Dallas and South Texas give the biography unusually broad in-state geography. Those anchors let Texas Defined connect acting history with ranch culture, western narrative and border themes without reducing Jones to a single screen persona.",
    ],
    texasPlaces: [
      { name: "San Saba", context: "Jones's Central Texas birthplace and the first local anchor for a biography that later moved through Midland, Dallas and an enduring adult relationship with Texas ranch country." },
      { name: "Midland and Dallas", context: "Texas cities associated with Jones's youth, widening the profile beyond birthplace and connecting his upbringing to both West Texas and North Texas urban geography." },
      { name: "South Texas", context: "A later ranching and borderlands connection that helps explain Jones's sustained interest in western landscapes and cross-border stories as both actor and filmmaker." },
    ],
    lastReviewedAt: reviewed,
  },
  "wes-anderson": {
    overview: [
      "Wes Anderson was born in Houston in 1969 and grew up there, attending St. John's School before studying philosophy at the University of Texas at Austin. School theater, reading and early filmmaking interests gave Houston a role in his creative formation, but the decisive professional relationship began at UT when he met Owen Wilson. Their collaboration produced the short film that became Bottle Rocket, creating a direct line from a Texas university friendship into the first feature of a career that would develop one of contemporary cinema's most recognizable visual signatures.",
      "Bottle Rocket reached theaters in 1996 and introduced several traits that Anderson later refined: carefully controlled framing, melancholy comedy, elaborate production design and characters whose emotional awkwardness is treated with both irony and affection. Rushmore, filmed substantially in Houston, made the Texas connection visible on screen as well as in biography. The Royal Tenenbaums widened his audience, while later films including The Grand Budapest Hotel and The French Dispatch pushed his visual construction toward increasingly intricate fictional worlds. The films often take place far from Texas, but the collaborative and stylistic origin remains connected to Houston and Austin.",
      "For Texas Defined, Anderson's profile is valuable because it demonstrates how a regional creative origin can remain important even when the art itself is not explicitly regional. Houston supplies childhood and an early filming environment; Austin supplies UT and the Owen Wilson collaboration; and Bottle Rocket provides the bridge from student work to professional filmmaking. His career also gives the pillar a way to discuss Texas film history without limiting the category to movies about Texas. The state can matter through education, collaborators, production and the formation of a director's working method as much as through subject matter. That origin also strengthens future links between Houston film history, Austin creative institutions and Texas-made productions.",
    ],
    timeline: [
      { year: "1969", event: "Born in Houston, Texas, and grows up in the city." },
      { year: "1990s", event: "Studies at the University of Texas at Austin, meets Owen Wilson and begins the collaboration that becomes Bottle Rocket." },
      { year: "1996", event: "Releases feature-length Bottle Rocket, launching his professional directing career." },
      { year: "1998", event: "Releases Rushmore, filmed substantially in Houston and central to the development of his visual style." },
      { year: "2014", event: "The Grand Budapest Hotel becomes one of his most acclaimed and widely awarded films." },
    ],
    legacy: [
      "Anderson created one of contemporary cinema's most immediately recognizable visual languages through precise composition, production design, music, ensemble casting and a tone that balances comedy with emotional distance and melancholy.",
      "His repeated collaborations demonstrate that the style is not only decorative. Actors, writers and designers operate inside a consistent working system that began with friendships and filmmaking experiments formed during his Texas education.",
      "Houston and UT Austin make Texas central to the origin story even though later films travel through invented or international settings. That distinction lets Texas Defined connect regional creative infrastructure to global cinema without forcing the work itself into a Texas theme.",
    ],
    texasPlaces: [
      { name: "Houston", context: "Anderson's birthplace and childhood city, as well as an important early production landscape through Rushmore and the school and cultural settings that preceded his professional career." },
      { name: "University of Texas at Austin", context: "The educational setting where Anderson met Owen Wilson and developed the collaboration that led from a student short to Bottle Rocket and a professional filmmaking career." },
    ],
    lastReviewedAt: reviewed,
  },
};