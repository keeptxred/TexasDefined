import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-27";

/**
 * Launch-depth editorial upgrades for the fourth Texas Talent cohort.
 * These strengthen biography, timeline, legacy and Texas-place context only.
 * They never grant launch approval or change rights/source readiness.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE4: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "don-henley": {
    overview: [
      "Don Henley was born in Gilmer in 1947 and raised in Linden, two East Texas communities that supplied the small-town setting for his earliest musical development. He played in school and regional groups before the national career that later defined him, learning in an environment where radio, live dances and local bands provided the most direct route into music. His Texas story is therefore strongest when it begins with working musicianship rather than celebrity: East Texas gave him the practical foundation from which he moved into a much larger industry. His later environmental work around Caddo Lake also kept the region connected to his public life long after the Eagles became an international act.",
      "After moving west, Henley became a founding member of the Eagles in 1971 and emerged as one of the group's principal singers and songwriters. Desperado, One of These Nights, Hotel California and The Long Run helped establish a polished form of country-rock in which close vocal arrangements, narrative songwriting and studio detail were central. Henley's drumming was part of the band's identity, but his writing and lead vocals became equally important to its most durable records. When the Eagles paused in the 1980s, his solo career produced another major catalog, including The Boys of Summer and The End of the Innocence, extending his reputation as a writer interested in memory, change and the costs of success.",
      "For Texas Defined, Henley is valuable because the East Texas connection did not disappear after the career moved elsewhere. His work supporting conservation around Caddo Lake tied music celebrity back to a specific landscape near the communities where he grew up. Gilmer, Linden and the Caddo Lake region allow the profile to connect biography, regional music history and preservation without pretending that the Eagles were a Texas-based band. That distinction makes the page stronger: Texas explains the origin and an enduring civic connection, while the national career explains the scale of influence. The result is a profile rooted in place rather than a generic Eagles biography with a Texas birthplace attached.",
    ],
    timeline: [
      { year: "1947", event: "Born in Gilmer, Texas, and raised in nearby Linden." },
      { year: "1960s", event: "Plays in East Texas school and regional bands before moving into the wider professional music business." },
      { year: "1971", event: "Co-founds the Eagles and begins the band career that produces several of the era's defining country-rock records." },
      { year: "1984", event: "Releases Building the Perfect Beast, including the major solo hit The Boys of Summer." },
      { year: "1998", event: "The Eagles are inducted into the Rock & Roll Hall of Fame." },
    ],
    legacy: [
      "Henley helped define the songwriting and vocal architecture of the Eagles, combining country and rock vocabulary with highly controlled studio production and narratives about ambition, disillusionment and modern American life.",
      "His solo career proved that the writing voice associated with the Eagles could survive outside the group, especially in songs that use memory and landscape to examine cultural change rather than simply repeat the band's earlier sound.",
      "East Texas gives the biography a continuing geographic center. Gilmer and Linden explain the beginning, while the Caddo Lake conservation connection demonstrates that the region remained part of Henley's public commitments long after his career became national.",
    ],
    texasPlaces: [
      { name: "Gilmer", context: "Henley's Upshur County birthplace and the first geographic anchor in an East Texas upbringing that preceded his work in regional bands and the move into national music." },
      { name: "Linden", context: "The Cass County community where Henley grew up and played music while young, making small-town East Texas an important part of his pre-Eagles formation." },
      { name: "Caddo Lake region", context: "An East Texas landscape connected to Henley's later conservation advocacy, extending his Texas story beyond childhood into long-running environmental and preservation work." },
    ],
    lastReviewedAt: reviewed,
  },
  "kelly-clarkson": {
    overview: [
      "Kelly Clarkson was born in Fort Worth in 1982 and raised in Burleson, where school choir, musical theater and community performance provided the first serious settings for her voice. North Texas matters to the story because Clarkson did not arrive on television with a long industry résumé behind her. Her early experience came from ordinary local institutions and the decision to pursue singing after high school. That makes Burleson more than a hometown label: it represents the period when the technical power and directness later associated with her performances were being developed without the machinery of a major label around her.",
      "Winning the first season of American Idol in 2002 changed the scale of Clarkson's career almost instantly, but the durability of what followed separated her from the novelty of the format. A Moment Like This introduced her nationally, while the 2004 album Breakaway moved her toward pop-rock and produced songs including Since U Been Gone and Because of You. Later releases moved among pop, rock, country and adult contemporary styles without requiring her to narrow the voice into one genre identity. Grammy recognition and a long recording career established her as a major vocalist independent of the competition that first made her famous.",
      "Clarkson later expanded into television with The Kelly Clarkson Show, adding interviewing and daily performance to a career already built around recording and touring. For Texas Defined, her profile offers a useful North Texas story about talent moving from school and community stages into mass-media exposure and then surviving the volatility of fame. Fort Worth supplies the birthplace, Burleson supplies the upbringing and early performance environment, and the broader Tarrant/Johnson County geography ties the biography into the site's place network. The Texas connection is formative rather than a claim that her entire professional career remained based in the state, and the page should preserve that distinction.",
    ],
    timeline: [
      { year: "1982", event: "Born in Fort Worth and raised in Burleson, Texas." },
      { year: "1990s", event: "Develops as a singer through school choir, musical theater and local performance in North Texas." },
      { year: "2002", event: "Wins the first season of American Idol and releases A Moment Like This." },
      { year: "2004", event: "Breakaway establishes Clarkson as a durable pop-rock artist beyond the television competition format." },
      { year: "2019", event: "Launches The Kelly Clarkson Show, expanding her career into daytime television and recurring live performance." },
    ],
    legacy: [
      "Clarkson became one of the clearest examples of a television competition winner building a lasting career on musicianship rather than remaining defined by the program that introduced her. Her vocal range and interpretive force became the durable center of that transition.",
      "Her catalog crossed pop, rock and country boundaries while keeping a recognizably direct performance style. That flexibility helped her remain relevant across changing radio formats and demonstrated that mainstream success did not require a single fixed genre identity.",
      "The North Texas beginning gives Texas Defined a grounded place story: Fort Worth marks the birth, Burleson marks the upbringing and school-performance years, and the surrounding counties connect a global pop career back to ordinary local institutions where it started.",
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Clarkson's birthplace in Tarrant County and the first North Texas anchor for a biography that soon centered on nearby Burleson and its school-performance environment." },
      { name: "Burleson", context: "Her Johnson County childhood home, where choir, school productions and community life formed the practical performance foundation that preceded American Idol and national fame." },
    ],
    lastReviewedAt: reviewed,
  },
  "kacey-musgraves": {
    overview: [
      "Kacey Musgraves was born in Golden in 1988 and grew up in East Texas, where songwriting began early and regional performance exposed her to country and western-swing traditions before a major-label career existed. She wrote songs as a child, performed locally and learned how small-town observation could become material rather than merely background. Wood County gives her profile a particularly clear Texas foundation because the later songwriting voice often depends on close attention to social expectations, private choices and the contradictions of small communities. The Texas connection is therefore both geographic and creative.",
      "Musgraves's major-label breakthrough came with Same Trailer Different Park in 2013. Merry Go 'Round and Follow Your Arrow introduced a songwriter willing to question country conventions from inside the genre, using compact language and empathy rather than treating small-town life as either simple nostalgia or easy ridicule. Pageant Material continued that perspective, while Golden Hour expanded the production toward psychedelic pop, soft rock and electronic textures. The album won the Grammy for Album of the Year in 2019, demonstrating that a career rooted in country songwriting could cross genre boundaries without abandoning the observational precision that made the early records distinctive.",
      "Later projects continued to move between country, pop and more atmospheric production, while Texas references and the memory of East Texas remained part of Musgraves's public identity. For Texas Defined, the strongest page should connect Golden and the Mineola area to the wider history of Texas songwriting and western swing without overstating a single influence. Her importance lies partly in how she carried a small-town East Texas perspective into contemporary pop while resisting the idea that regional identity requires stylistic conservatism. The result is a profile where place explains the lens of the writing even as the sound travels far beyond traditional country.",
    ],
    timeline: [
      { year: "1988", event: "Born in Golden, Texas, and raised in East Texas." },
      { year: "2000s", event: "Writes songs and performs country and western-swing material while building experience on Texas stages." },
      { year: "2013", event: "Releases Same Trailer Different Park, including Merry Go 'Round and Follow Your Arrow." },
      { year: "2018", event: "Releases Golden Hour, expanding her country songwriting into a broader pop and psychedelic production palette." },
      { year: "2019", event: "Golden Hour wins the Grammy Award for Album of the Year." },
    ],
    legacy: [
      "Musgraves widened the stylistic possibilities available to a mainstream country songwriter while retaining the concise observation and character detail associated with her East Texas beginnings. Genre expansion did not require abandoning regional perspective.",
      "Her writing made room for ambiguity inside familiar country settings, treating small-town culture as complicated rather than automatically idealized. That approach helped distinguish her voice before the production became increasingly cross-genre.",
      "Golden and Wood County make the Texas connection unusually specific. They allow Texas Defined to connect a globally recognized album career to East Texas songwriting, western-swing exposure and the social landscape that informed her early work.",
    ],
    texasPlaces: [
      { name: "Golden", context: "Musgraves's Wood County birthplace and childhood community, where early songwriting and small-town observation supplied the social landscape that later became central to her lyrical perspective." },
      { name: "Mineola area", context: "A nearby East Texas community and performance context tied to her early development, helping anchor the profile in the broader Wood County music and cultural landscape." },
    ],
    lastReviewedAt: reviewed,
  },
  "leon-bridges": {
    overview: [
      "Leon Bridges was born in Atlanta in 1989 but raised in Fort Worth, and that distinction is important to the accuracy of his Texas Talent profile. Fort Worth, not a Texas birthplace claim, is the formative connection: it is where he grew up, worked local jobs, began writing songs and performed at open mics before a recording career existed. The city's modern creative community gave Bridges the chance to develop in public at a manageable scale, and local relationships eventually connected him with musicians who helped translate his songs into recordings. His story demonstrates one of the pillar's core eligibility rules—Texas can be decisive through upbringing and artistic formation even when birth occurred elsewhere.",
      "Coming Home arrived in 2015 with a sound that immediately evoked classic gospel and soul recording, but Bridges's career did not remain a period exercise. River showed the depth of his church and soul vocabulary, while Good Thing and later work expanded into contemporary R&B, funk, pop and more spacious production. Bet Ain't Worth the Hand won a Grammy, and Gold-Diggers Sound further separated his identity from the idea that he was simply recreating an earlier era. The progression matters because it shows a Fort Worth artist using tradition as a foundation rather than a costume.",
      "Bridges has continued to identify Fort Worth as an important home and cultural anchor even as his touring and recording career became international. For Texas Defined, that makes him especially useful for connecting a historic Texas music narrative with a living contemporary scene. Fort Worth explains the upbringing, open-mic period and local collaborators; Tarrant County provides the geographic authority layer; and Texas soul offers the larger musical frame. His profile can therefore show how a modern artist emerged from local creative relationships without pretending the city alone explains every influence in his evolving sound.",
    ],
    timeline: [
      { year: "1989", event: "Born in Atlanta and raised in Fort Worth, Texas." },
      { year: "2010s", event: "Builds experience through Fort Worth open mics and local songwriting while working ordinary jobs in the city." },
      { year: "2015", event: "Releases debut album Coming Home, bringing his Fort Worth-developed soul sound to an international audience." },
      { year: "2019", event: "Wins a Grammy Award for Bet Ain't Worth the Hand." },
      { year: "2021", event: "Releases Gold-Diggers Sound, continuing the move beyond retro-soul into contemporary R&B and pop textures." },
    ],
    legacy: [
      "Bridges helped place contemporary Fort Worth on the national soul and R&B map, showing that the city's modern music identity includes more than its better-known country, western and roots traditions.",
      "His career also demonstrates how an artist can begin with a historically recognizable sound and then widen the palette without repudiating that foundation. Gospel phrasing and soul restraint remain audible even as the production moves into newer forms.",
      "The Texas connection is strongest as a story of formation and community. Fort Worth supplied childhood, open-mic stages and collaborators, giving Texas Defined a specific local pathway from working songwriter to internationally touring artist.",
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Bridges's childhood home, early performance base and continuing cultural anchor, where open mics and local musician relationships turned private songwriting into a professional recording path." },
      { name: "Tarrant County", context: "The county authority behind Bridges's Fort Worth story and a stable geographic connection for Texas Defined's broader North Texas, culture and music-history network." },
    ],
    lastReviewedAt: reviewed,
  },
  "erykah-badu": {
    overview: [
      "Erykah Badu was born Erica Wright in Dallas in 1971 and grew up inside a city with deep Black theater, jazz, soul and emerging hip-hop traditions. She performed while young and developed through Dallas arts spaces before the recording industry knew her as Erykah Badu. That local performance education matters because her mature work depends on more than a distinctive singing voice: theatrical timing, spoken phrasing, rhythmic elasticity and a strong visual identity all became parts of the same artistic language. Dallas is therefore not simply the birthplace printed in a biography. It is the cultural environment in which several disciplines were already overlapping before Baduizm made her a national figure.",
      "Released in 1997, Baduizm became one of the defining records associated with the neo-soul movement. On & On introduced her conversational phrasing and jazz-inflected timing to a wide audience, while the live version of Tyrone showed how improvisation, humor and audience interaction could become part of the recorded legacy. Mama's Gun deepened the relationship between soul, hip-hop rhythm and personal songwriting, and New Amerykah Part One later pushed toward denser, more experimental production. Across those changes, Badu resisted the expectation that an R&B artist should become more conventional as the audience grew.",
      "Dallas remained an active part of Badu's artistic identity through collaborations, performances, civic recognition and repeated references to the city. That continuity makes her one of the strongest examples of a Texas Talent subject whose hometown remains part of the creative vocabulary rather than merely the origin story. For Texas Defined, her profile can connect Dallas County with Texas R&B, hip-hop, jazz and Black arts history while emphasizing that these traditions overlap rather than exist as isolated genre silos. Badu's importance lies in both influence and place: she helped make eccentricity, improvisation and local identity central features of a major contemporary R&B career.",
    ],
    timeline: [
      { year: "1971", event: "Born in Dallas, Texas." },
      { year: "1980s–90s", event: "Develops as a performer through Dallas theater, music and local arts communities." },
      { year: "1997", event: "Releases Baduizm, a major critical and commercial breakthrough associated with neo-soul." },
      { year: "2000", event: "Releases Mama's Gun, expanding her blend of soul, jazz phrasing and hip-hop-informed rhythm." },
      { year: "2008", event: "Releases New Amerykah Part One, pushing her sound toward denser and more experimental production." },
    ],
    legacy: [
      "Badu became one of the defining artists associated with neo-soul, but her influence extends beyond that label. Her vocal phrasing, visual imagination and willingness to let jazz and hip-hop logic reshape R&B opened space for later artists to be less stylistically predictable.",
      "Her live performance identity also matters: improvisation, humor and direct audience exchange made the stage an extension of the songwriting rather than a place to reproduce studio recordings exactly.",
      "Dallas remains central to the biography and the artistic persona. That continuity gives Texas Defined a strong bridge from one artist into the city's Black theater, R&B, hip-hop and jazz history instead of treating her as a detached national celebrity.",
    ],
    texasPlaces: [
      { name: "Dallas", context: "Badu's birthplace, childhood environment and enduring creative home, where theater, Black arts, jazz, soul and hip-hop communities helped form the interdisciplinary performer she became." },
      { name: "Dallas County", context: "The county-level authority connection supporting Badu's Dallas biography and future internal links into Texas Defined's North Texas culture and music-history coverage." },
    ],
    lastReviewedAt: reviewed,
  },
};