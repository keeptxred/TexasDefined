import type { TexasTalentProfile } from "@/data/texas-talent";

type TexasTalentDepthOverride = Partial<TexasTalentProfile>;

const reviewed = "2026-08-26";

/**
 * Launch-depth editorial upgrades for a third Texas Talent cohort centered on
 * jazz, songwriting, blues and Houston rock history. Editorial launch approval
 * remains independent from this narrative-depth layer.
 */
export const TEXAS_TALENT_LAUNCH_DEPTH_WAVE3: Readonly<Record<string, TexasTalentDepthOverride>> = {
  "ornette-coleman": {
    overview: [
      "Ornette Coleman was born in Fort Worth in 1930 and learned music inside a city with a deep Black performance tradition. He began on saxophone while young and absorbed gospel, rhythm and blues, dance-band music and jazz before leaving Texas as a professional musician. The Fort Worth setting matters because Coleman's later reputation for radical innovation can make him seem detached from regional tradition, when in fact his musical language grew from close contact with working bands and vernacular styles. The National Endowment for the Arts describes his early development through Fort Worth performance and rhythm-and-blues work, grounding an artist eventually associated with the avant-garde in the practical musical culture of North Texas. That foundation helps explain the combination of blues feeling, melodic directness and structural freedom that remained audible even in his most unconventional recordings.",
      "After leaving Texas, Coleman developed an approach that challenged standard assumptions about harmony, ensemble roles and improvisation. The Shape of Jazz to Come, released in 1959, became a landmark because it presented compositions and improvisations that could move without the conventional chordal framework listeners expected from modern jazz. Change of the Century and the large-ensemble Free Jazz pushed the argument further, while later projects continued to test how melody and collective improvisation could organize music. The controversy around his work was itself historically important: musicians and critics had to decide whether freedom from familiar harmonic structures represented disorder or a new kind of coherence. Coleman kept returning to blues-derived phrasing and memorable melodic shapes, making his music more connected to his Texas beginnings than the label free jazz sometimes suggests.",
      "Coleman's influence eventually extended far beyond a single jazz movement. His ideas affected improvisers, composers, rock musicians and experimental artists, and the 2007 Pulitzer Prize for Sound Grammar confirmed the continuing significance of a career that had once been treated as deliberately disruptive. For Texas Defined, Fort Worth provides the essential place-based frame. The city is not simply where Coleman happened to be born; it was the environment in which he learned saxophone, worked with local musicians and absorbed the Black musical traditions that preceded his later innovations. A strong profile can therefore connect Tarrant County, Fort Worth music history, Texas jazz and the broader story of how regional traditions can produce artists whose ideas ultimately transform international music."
    ],
    timeline: [
      { year: "1930", event: "Born in Fort Worth, Texas." },
      { year: "1940s", event: "Begins playing saxophone and performing in Fort Worth-area bands and rhythm-and-blues settings." },
      { year: "1959", event: "Releases The Shape of Jazz to Come, a defining statement of his new improvisational approach." },
      { year: "1960", event: "Records Free Jazz, extending his ideas about collective improvisation and ensemble freedom." },
      { year: "2007", event: "Wins the Pulitzer Prize for Music for Sound Grammar." }
    ],
    legacy: [
      "Coleman permanently expanded the vocabulary of jazz improvisation by showing that melody, interaction and momentum could organize music without depending on conventional chord progressions. The debate his work provoked became part of the history of modern jazz itself.",
      "His innovations did not erase his Texas musical education. Blues phrasing, gospel intensity and the experience of working rhythm-and-blues bands remained part of the sound, demonstrating how experimental art can grow from regional and vernacular traditions rather than rejecting them.",
      "For Texas Defined, Fort Worth gives that innovation a specific geographic origin. Coleman's profile strengthens Texas jazz coverage while also showing that North Texas music history includes figures whose influence reached well beyond country, blues and popular music."
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Coleman's birthplace and formative musical city, where Black church music, rhythm and blues, jazz and working-band experience shaped the foundation of his later improvisational language." },
      { name: "Tarrant County", context: "The county-level geographic anchor for Coleman's Fort Worth story, allowing his profile to connect safely into Texas Defined's broader North Texas place and cultural coverage." }
    ],
    lastReviewedAt: reviewed,
  },
  "townes-van-zandt": {
    overview: [
      "Townes Van Zandt was born in Fort Worth in 1944 and became one of the central figures in the tradition of the Texas singer-songwriter. His childhood included moves beyond the state, but Texas repeatedly became the setting in which his adult musical identity took shape. Houston was particularly important during the 1960s, when folk clubs gave emerging writers a place to test songs in front of attentive audiences and to encounter performers who treated songwriting as a craft rather than simply a route to commercial recording. Van Zandt's spare guitar playing, dry humor and fascination with difficult emotional subjects developed within that environment. Fort Worth supplies the origin, while Houston explains much of the apprenticeship that turned an itinerant young musician into a writer other musicians would later treat as a standard of seriousness.",
      "Van Zandt began recording in the late 1960s, and albums such as For the Sake of the Song and The Late Great Townes Van Zandt established the body of work for which he became known. Pancho and Lefty, If I Needed You, To Live Is to Fly, Waiting Around to Die and Tecumseh Valley are built from concise language, memorable melodic lines and characters who often live with loss, distance or self-destruction. His own records rarely produced the kind of mainstream sales associated with major country stars, but the songs traveled through other performers. Willie Nelson and Merle Haggard's recording of Pancho and Lefty became a major country hit, while Emmylou Harris and many later singers helped carry Van Zandt's writing into audiences larger than the ones reached by his original albums.",
      "That gap between limited commercial stardom and enormous writer-to-writer influence is the key to Van Zandt's Texas Talent story. He became part of the mythology of Texas songwriting because the songs appeared to value craft, observation and emotional truth over career polish. Houston and Austin both became important nodes in the singer-songwriter network around his work, while Fort Worth remained the birthplace anchoring the biography in North Texas. For Texas Defined, the profile can connect Tarrant County, Harris County, Travis County and Texas music history while explaining why influence cannot always be measured by chart position. Van Zandt's legacy lives in the repertoire: songs written from a Texas-rooted artistic tradition that other major performers continue to interpret."
    ],
    timeline: [
      { year: "1944", event: "Born in Fort Worth, Texas." },
      { year: "1960s", event: "Develops as a songwriter and performer in Houston's folk-club scene." },
      { year: "1968", event: "Releases his debut album, For the Sake of the Song." },
      { year: "1972", event: "Releases The Late Great Townes Van Zandt, including Pancho and Lefty and If I Needed You." },
      { year: "1997", event: "Dies at age fifty-two, leaving a catalog that continues to circulate through other performers." }
    ],
    legacy: [
      "Van Zandt became a benchmark for narrative songwriting even without the commercial profile of many artists who recorded his work. The continuing life of his songs in other singers' repertoires demonstrates how influence can move through craft rather than celebrity.",
      "His writing helped define a Texas singer-songwriter ideal built around close observation, economy of language and emotional risk. That tradition influenced country, folk and Americana artists who saw the songwriter as an authorial figure rather than merely a supplier of radio material.",
      "Fort Worth, Houston and Austin give the profile a strong Texas geography. Together they connect birthplace, apprenticeship and community, allowing Texas Defined to place Van Zandt inside a real network of cities and music scenes instead of presenting him as a rootless cult figure."
    ],
    texasPlaces: [
      { name: "Fort Worth", context: "Van Zandt's birthplace and North Texas family anchor, giving the story a geographic beginning before his later years in Houston clubs and the wider Texas songwriter circuit." },
      { name: "Houston", context: "The city's 1960s folk-club environment was a key songwriting apprenticeship, giving Van Zandt stages, peers and audiences while he developed the spare style associated with his mature work." },
      { name: "Austin", context: "A major later audience and community within the Texas singer-songwriter world, connecting Van Zandt's catalog to the broader Central Texas music culture that championed independent writers." }
    ],
    lastReviewedAt: reviewed,
  },
  "lightnin-hopkins": {
    overview: [
      "Sam 'Lightnin’' Hopkins was born in Centerville, Texas, in 1912 and grew up in East Texas, where blues was part of a living regional culture rather than a genre preserved on records. His early musical education included contact with older Texas blues traditions and the itinerant performers who carried songs between towns, work camps and social gatherings. That background gave Hopkins a style built around flexible rhythm, conversational singing and guitar responses that could stretch or compress a song according to the moment. Centerville and Leon County provide the rural beginning, but Houston became the city most closely associated with his mature career. The move from East Texas into Houston reflects a larger pattern in Texas music history, as rural blues practices adapted to urban neighborhoods, clubs, recording sessions and new audiences.",
      "Hopkins began recording in the 1940s and became extraordinarily prolific, building a catalog that could sound intimate even when issued through commercial labels. His performances often blurred the line between prepared song and spontaneous commentary: verses could change, topical details could enter the lyric, and guitar phrases answered the voice as if the instrument were another speaker. That flexibility made him a particularly direct representative of Texas country blues even after amplification and urban performance became part of the setting. Houston provided the sustained base from which he recorded and performed, while later folk and blues revival audiences brought him to festivals, colleges and international stages. The wider recognition did not require him to transform into a polished revival act; the appeal rested on the individual timing and storytelling that had always defined his music.",
      "Hopkins died in Houston in 1982 after a career that linked prewar Texas blues traditions with postwar recording and the later blues revival. His importance to Texas Defined lies in that continuity. Centerville explains the East Texas roots, Houston explains the urban career, and the music itself connects rural song tradition to one of the state's largest cities. A profile built around those places can strengthen Texas blues coverage while showing how migration within the state changed the context of the music without erasing its regional character. Hopkins is not simply a famous bluesman who lived in Houston; he is one of the clearest examples of Texas blues adapting across decades while retaining a distinctive sense of voice, timing and place."
    ],
    timeline: [
      { year: "1912", event: "Born in Centerville, Texas, in Leon County." },
      { year: "1940s", event: "Settles into Houston's blues environment and begins the recording career that brings his music to a wider audience." },
      { year: "1946", event: "Makes early commercial recordings during the postwar rise of his Houston-based career." },
      { year: "1960s", event: "Reaches new folk and blues-revival audiences through festivals, colleges and touring." },
      { year: "1982", event: "Dies in Houston after decades as one of the city's defining blues musicians." }
    ],
    legacy: [
      "Hopkins preserved the improvisational character of Texas country blues inside a long commercial recording career. His songs often feel conversational because rhythm, lyric and guitar accompaniment respond to the moment instead of following a rigid arrangement.",
      "His move from East Texas to Houston also embodies a major cultural transition: rural blues practices entering an urban setting while retaining recognizable regional qualities. That makes his career useful for understanding both Texas migration and the development of Houston music.",
      "Centerville and Houston give Texas Defined two strong geographic anchors for the profile. The connection allows readers to move from Leon County roots into Harris County's urban music history and then outward to the broader Texas blues authority cluster."
    ],
    texasPlaces: [
      { name: "Centerville", context: "Hopkins's Leon County birthplace and early East Texas setting, where rural blues traditions and traveling musicians formed the musical world that preceded his Houston recording career." },
      { name: "Houston", context: "The city that became Hopkins's principal home and professional base, turning an East Texas blues foundation into one of the most prolific and recognizable urban blues careers in the state." }
    ],
    lastReviewedAt: reviewed,
  },
  "lead-belly": {
    overview: [
      "Huddie Ledbetter, known as Lead Belly, was born in Louisiana in 1888, so his inclusion in Texas Talent depends on a documented cultural and biographical connection rather than a claim that he was Texas-born. He spent formative years around the Texas-Louisiana borderlands and became entangled with the Texas criminal-justice system, including a long prison term that placed part of his adult biography inside the state. Those years are difficult material and should not be romanticized, but they are part of the historical record surrounding an artist whose repertoire later became foundational to American folk music. The Texas connection also reaches into the shared musical culture of northeast Texas and northwest Louisiana, where work songs, blues, dance music, ballads and popular songs circulated across state lines rather than respecting modern genre categories.",
      "Lead Belly's extraordinary repertoire became better documented after folklorists John and Alan Lomax recorded him in the 1930s. He could accompany himself on twelve-string guitar and move across blues, children's songs, work songs, spirituals, dance tunes and narrative ballads. Songs associated with him—including Goodnight, Irene, Midnight Special, Cotton Fields, Bourgeois Blues and Rock Island Line—later entered folk, rock and popular repertoires through other performers. Smithsonian Folkways preserves the breadth of that career and helps explain why Lead Belly cannot be reduced to a single genre label. His importance comes partly from memory: he carried a large body of vernacular material into recorded form, while his own forceful singing and guitar style made those songs inseparable from a distinctive performer.",
      "For Texas Defined, Lead Belly requires careful framing because the state connection is substantial but not exclusive. Bowie and Harrison counties provide geographic anchors for the northeast Texas world associated with parts of his life, while the borderlands context prevents the profile from imposing an artificial state boundary on a regional musical culture. The page should also distinguish documentation from legend, especially around prison-era stories that accumulated in popular retellings. Done correctly, the profile strengthens Texas blues and folk history while demonstrating the pillar's eligibility rule in practice: a person does not have to be born in Texas, but the Texas connection must be meaningful, sourced and explicitly explained rather than implied by branding."
    ],
    timeline: [
      { year: "1888", event: "Born Huddie Ledbetter in Louisiana, near the cultural borderlands that also shaped his later Texas years." },
      { year: "1918", event: "Begins a Texas prison term that becomes a significant, difficult chapter in his adult biography." },
      { year: "1925", event: "Leaves Texas custody and continues a life that moves through the broader Texas-Louisiana region." },
      { year: "1930s", event: "Recordings made with folklorists help document his unusually broad repertoire and bring it to new audiences." },
      { year: "1949", event: "Dies after a career whose songs continue to circulate widely through folk, blues and popular music." }
    ],
    legacy: [
      "Lead Belly became one of the most important recorded carriers of American vernacular song. His repertoire crossed boundaries between blues, folk, work song, spiritual, dance music and children's material, showing how porous those categories were in lived musical culture.",
      "Later artists repeatedly reinterpreted songs associated with him, making his influence visible in folk revival, rock and popular music. That afterlife means his significance rests both in his own performances and in the repertoire he helped preserve and circulate.",
      "For Texas Defined, the value of the profile is also methodological. His Texas connection must be explained through borderlands geography and documented life history rather than birthright, making him a useful example of how the Talent pillar can handle complex regional identities responsibly."
    ],
    texasPlaces: [
      { name: "Bowie County", context: "A northeast Texas anchor for the borderlands world connected to Lead Belly's biography, linking the profile to a region where Texas and Louisiana musical traditions overlapped extensively." },
      { name: "Harrison County", context: "Another East Texas geographic anchor for the wider cultural landscape surrounding Lead Belly's Texas years, providing a route into regional blues, folk and African American history." }
    ],
    lastReviewedAt: reviewed,
  },
  "billy-gibbons": {
    overview: [
      "Billy Gibbons was born in Houston in 1949 and developed as a guitarist in a city whose blues history provided an unusually deep local reference point. Before ZZ Top existed, Gibbons led the Moving Sidewalks, a psychedelic rock band that placed him inside Houston's late-1960s club and concert culture. That early phase matters because his later style did not emerge only from classic blues imitation. It combined blues vocabulary with the amplified experimentation and heavier guitar sounds circulating through rock at the end of the decade. Houston supplied both sides of that equation: a major Black blues tradition and a young rock scene looking for new ways to use volume, effects and stage presentation. Gibbons's Texas identity therefore belongs to the sound as much as to the beard, clothes and visual mythology that became famous later.",
      "ZZ Top formed in 1969 and eventually united Gibbons with Dusty Hill and Frank Beard in one of rock's most durable three-piece lineups. Early records drew heavily on blues, boogie and Texas imagery, while songs such as La Grange gave the band an immediately recognizable combination of riff, groove and regional character. The band's 1980s success expanded that formula rather than simply abandoning it. Eliminator used synthesizers, sequenced rhythms, music video and streamlined production around Gibbons's guitar sound, producing hits such as Gimme All Your Lovin', Sharp Dressed Man and Legs. The transition is important because it shows a Texas blues-rock band adapting to a new technological and visual era without losing the core identity that audiences recognized.",
      "The Rock & Roll Hall of Fame inducted ZZ Top in 2004, confirming the national significance of a career that remained publicly tied to Texas throughout its different phases. For Texas Defined, Gibbons offers a strong Houston profile because the city explains the musical roots, the first band and the cultural environment behind ZZ Top's sound. Harris County provides a safe geographic anchor, while Texas blues and rock pages can explain the traditions the band transformed. His story also demonstrates how Texas imagery can become globally recognizable without functioning as mere costume: the strongest case rests on the music itself, where blues-based guitar, boogie rhythm and Houston origins remained present even when the production became thoroughly modern."
    ],
    timeline: [
      { year: "1949", event: "Born in Houston, Texas." },
      { year: "1960s", event: "Leads the Moving Sidewalks during Houston's psychedelic-rock period." },
      { year: "1969", event: "Forms ZZ Top, beginning the trio's long Texas blues-rock career." },
      { year: "1983", event: "Eliminator expands ZZ Top's audience through a synthesis of guitar-driven blues rock, electronic production and music video." },
      { year: "2004", event: "ZZ Top is inducted into the Rock & Roll Hall of Fame." }
    ],
    legacy: [
      "Gibbons helped turn Texas blues vocabulary into a durable rock-guitar language built around economy, tone and groove. His most recognizable riffs demonstrate how a small number of notes can carry as much identity as technical complexity.",
      "ZZ Top's 1980s reinvention also showed unusual adaptability. The group integrated electronic rhythm and video-era presentation without making the underlying blues-rock identity unrecognizable, allowing a Texas-rooted band to reach an entirely new mass audience.",
      "Houston gives the profile its strongest geographic logic. Gibbons's birthplace, the Moving Sidewalks and the city's blues tradition connect his career to Harris County and to Texas Defined's growing music authority cluster rather than relying only on ZZ Top's statewide imagery."
    ],
    texasPlaces: [
      { name: "Houston", context: "Gibbons's birthplace and formative music city, where the local blues tradition and late-1960s rock scene shaped the guitar vocabulary he carried from the Moving Sidewalks into ZZ Top." },
      { name: "Harris County", context: "The stable county-level anchor for the Houston story, connecting Gibbons's profile to Texas Defined's place network while topical links carry readers into Texas blues and rock history." }
    ],
    lastReviewedAt: reviewed,
  },
};
