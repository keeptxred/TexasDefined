import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";

export const TEXAS_MUSIC_CITY_GUIDES: Record<string, TexasEvergreenGuide> = {
  "texas-music-cities": {
    slug: "texas-music-cities",
    eyebrow: "Five scenes, one statewide story",
    title: "Texas Music Cities: Austin, Houston, San Antonio, Lubbock and Dallas–Fort Worth",
    dek: "Texas music makes more sense when you follow the cities that gave artists places to rehearse, record, perform, broadcast and build audiences.",
    quickAnswer: "No single city explains Texas music. Austin became a meeting point for progressive country, blues and public-television performance; Houston built deep blues, gospel, R&B and hip-hop systems; San Antonio fused border, Black, Mexican American and Anglo traditions; Lubbock and the South Plains helped launch a globally influential strain of rock and roll; and Dallas–Fort Worth connected Deep Ellum blues, jazz, country, recording and later experimental music. Together these scenes show how local institutions turn individual talent into durable musical culture.",
    sections: [
      {
        heading: "Why cities matter as much as genres",
        body: [
          "Genres travel, but scenes give them infrastructure. A musician needs stages, radio, record stores, studios, churches, school bands, dance halls, promoters and other musicians. Texas cities supplied those systems in different combinations, which is why the state's musical map cannot be reduced to one genre or one capital.",
          "The most useful way to compare Texas music cities is to ask what each place made possible. Some cities excelled as recording centers, some as live-performance networks, some as borderland crossroads and some as training grounds whose musicians later changed national styles."
        ],
        links: [{ href: "/texas-music", label: "Texas Music authority hub" }, { href: "/texas-music-venues", label: "Landmark Texas music venues" }]
      },
      {
        heading: "Austin: country, blues and the live-performance machine",
        body: [
          "Austin's modern music identity grew from unusually porous audiences and venues. In the 1970s, progressive country brought traditional country into contact with folk, rock and counterculture audiences, while later blues clubs and touring circuits gave the city another nationally visible musical identity.",
          "Austin City Limits turned that local ecosystem into a national broadcast platform. The city matters not because it invented every sound associated with it, but because it repeatedly gave Texas musicians a stage where genres and audiences could overlap."
        ],
        links: [{ href: "/austin-music-history", label: "Austin music history" }, { href: "/antones-austin-history", label: "Antone's history" }]
      },
      {
        heading: "Houston: records, neighborhoods and independent systems",
        body: [
          "Houston's music history is unusually broad. Blues, gospel, R&B and jazz thrived through Black neighborhoods, clubs, labels and studios, while later hip-hop developed its own independent distribution and production systems rather than waiting for national industry approval.",
          "Duke-Peacock Records and DJ Screw belong to different eras, but both demonstrate the same larger idea: Houston repeatedly built infrastructure that could turn a local sound into something heard far beyond the city."
        ],
        links: [{ href: "/houston-music-history", label: "Houston music history" }, { href: "/texas-hip-hop", label: "Texas hip-hop" }]
      },
      {
        heading: "San Antonio: a borderland city that made hybrids normal",
        body: [
          "San Antonio sits close enough to the border and deep enough inside Texas to absorb musical traffic from several directions at once. Conjunto, Tejano, R&B, rock and country developed beside one another, and the West Side Sound made that mixture explicit.",
          "The result is a city where cultural exchange is not a footnote to the music story; it is the story. Accordion, horns, triplet piano, conjunto rhythm and rock-and-roll vocabulary could all circulate through overlapping neighborhoods and bands."
        ],
        links: [{ href: "/san-antonio-music-history", label: "San Antonio music history" }, { href: "/texas-conjunto-tejano", label: "Texas conjunto and Tejano" }]
      },
      {
        heading: "Lubbock: West Texas distance, radio and early rock and roll",
        body: [
          "The South Plains produced musicians who listened across genre boundaries and across long distances. Country radio, rhythm and blues, regional touring and nearby recording opportunities helped a young Buddy Holly and his peers develop an approach that became foundational to rock and roll.",
          "Lubbock's importance is larger than one famous biography. The Crickets, Waylon Jennings and a wider West Texas network show how a relatively isolated city could still function as an intensely connected musical laboratory."
        ],
        links: [{ href: "/lubbock-music-history", label: "Lubbock music history" }, { href: "/texas-rock-rockabilly", label: "Texas rock and rockabilly" }]
      },
      {
        heading: "Dallas–Fort Worth: Deep Ellum, jazz and a two-city network",
        body: [
          "Dallas and Fort Worth developed distinct but connected histories. Dallas's Deep Ellum became a major Black entertainment and commercial district where blues and jazz circulated, while Fort Worth schools and clubs helped produce a remarkable cluster of modern-jazz innovators.",
          "The Metroplex also supported early recording businesses, country, western swing and rockabilly. Treating Dallas and Fort Worth together does not erase their differences; it shows how a larger North Texas network moved musicians between neighborhoods, venues, studios and touring routes."
        ],
        links: [{ href: "/dallas-fort-worth-music-history", label: "Dallas–Fort Worth music history" }, { href: "/texas-jazz", label: "Texas jazz" }]
      }
    ],
    related: [
      { href: "/texas-music", label: "Texas Music", description: "Start with the statewide genre, artist and place authority hub." },
      { href: "/texas-music-venues", label: "Texas Music Venues", description: "See the rooms and stages that gave local scenes physical form." },
      { href: "/texas-history", label: "Texas History", description: "Place musical change inside the state's wider history of migration, cities and industry." }
    ]
  },
  "austin-music-history": {
    slug: "austin-music-history",
    eyebrow: "Progressive country, blues and a national stage",
    title: "Austin Music History: How Country, Blues and Live Performance Built a Texas Music Capital",
    dek: "Austin's music story is a history of collisions: traditional country and counterculture, touring blues masters and young Texas players, small clubs and national television.",
    quickAnswer: "Austin became nationally important to Texas music by making genre boundaries unusually permeable. Progressive country in the 1970s brought country musicians and counterculture audiences together; Antone's connected touring blues masters with younger Texas players; and Austin City Limits turned a local performance culture into national public television. The city's influence is best understood as a network of rooms, audiences and institutions rather than a claim that every major Texas sound began there.",
    sections: [
      { heading: "Before the brand: a city where audiences could mix", body: ["Austin's reputation grew from the interaction of musicians, university audiences, older country traditions, folk culture and a changing club economy. The important development was not one official Austin sound, but a setting where country, blues, rock, folk and conjunto could appear within the same broader live-music ecosystem.", "That flexibility made the city attractive to musicians who did not fit comfortably inside a single commercial category. It also created audiences willing to follow songwriters and bands across stylistic boundaries."], links: [{ href: "/texas-country-outlaw", label: "Texas country and outlaw country" }] },
      { heading: "Progressive country changed the city's national identity", body: ["In the 1970s, Austin became the center of what the Handbook of Texas describes as progressive country: traditional country mixed with folk, rock and the era's counterculture. Venues such as the Armadillo World Headquarters and Soap Creek Saloon let cowboys, hippies, students and touring musicians share space.", "Willie Nelson became the movement's most visible symbol, but the larger significance was institutional. Austin offered an alternative route for country musicians who wanted audiences without conforming completely to Nashville's industry expectations."], links: [{ href: "/texas-country-outlaw", label: "Deep guide to progressive and outlaw country" }] },
      { heading: "Antone's made blues part of the city's core story", body: ["Clifford Antone opened Antone's in 1975 with a mission centered on blues. The club brought veteran touring performers into sustained contact with local players and fans, helping create a bridge between older blues traditions and a younger Austin scene.", "That bridge matters to the careers of musicians such as Stevie Ray Vaughan and the Fabulous Thunderbirds, but it also matters historically because it reminds us that Austin's blues identity depended heavily on Black musical traditions developed elsewhere long before the city's modern music boom."], links: [{ href: "/antones-austin-history", label: "Antone's history" }, { href: "/texas-blues", label: "Texas blues" }] },
      { heading: "Austin City Limits turned a local scene into a broadcast institution", body: ["Austin City Limits grew from KLRN's effort to create locally produced programming with national reach. A Willie Nelson pilot led to a first season that drew heavily from Austin's progressive-country scene and challenged assumptions about what public television music programming could be.", "Over time the program broadened far beyond its original country emphasis. Its deeper importance to Austin is that it documented performance as the city wanted to be understood: musicians onstage, genre boundaries open and local culture presented directly to a national audience."], links: [{ href: "/texas-music-venues", label: "Landmark Texas music venues" }] },
      { heading: "How to place Austin in the statewide story", body: ["Austin is essential, but it should not swallow the rest of Texas music history. Blues roots run deeply through Dallas, Houston and East Texas; conjunto and Tejano center South Texas and San Antonio; Houston built enormous gospel, R&B and hip-hop systems; and West Texas helped reshape rock and roll.", "Austin's special contribution was often amplification: it created unusually visible places where traditions met, where musicians could build repeat audiences and where local performance could reach national media."], links: [{ href: "/texas-music-cities", label: "Compare Texas music cities" }] }
    ],
    related: [
      { href: "/texas-music", label: "Texas Music", description: "The statewide authority hub." },
      { href: "/texas-country-outlaw", label: "Country & Outlaw Country", description: "The history behind Austin's progressive-country era." },
      { href: "/texas-blues", label: "Texas Blues", description: "Follow Austin blues back through Dallas, Houston and East Texas." }
    ]
  },
  "houston-music-history": {
    slug: "houston-music-history",
    eyebrow: "Blues, gospel, records and chopped-and-screwed innovation",
    title: "Houston Music History: Blues, Gospel, R&B and the Rise of a Distinctive Hip-Hop City",
    dek: "Houston repeatedly built its own musical infrastructure—from Fifth Ward blues and Duke-Peacock Records to studios, gospel networks and the independent systems behind chopped-and-screwed hip-hop.",
    quickAnswer: "Houston's music history is best understood as a chain of locally built systems. Mid-century Black clubs and Duke-Peacock Records helped make the city important to blues, gospel, R&B and soul; Houston musicians also shaped jazz and electric blues; and later DJ Screw and independent rap networks created a regional hip-hop language that spread nationally. The continuity is not one sound but a recurring ability to build local audiences, businesses and distribution outside the country's biggest music-industry centers.",
    sections: [
      { heading: "Houston's size and neighborhoods created musical infrastructure", body: ["Houston's growth brought together Black Southern traditions, Gulf Coast migration, church music, blues, jazz, country, Latin music and later global pop. Neighborhoods such as the Fifth Ward became especially important because venues, businesses and musicians could reinforce one another locally.", "The city therefore produced more than performers. It produced labels, studios, clubs, radio networks and independent distribution channels—institutions that allowed music to circulate before national companies decided whether to pay attention."], links: [{ href: "/texas-music", label: "Texas Music hub" }] },
      { heading: "Duke-Peacock linked a Houston nightclub to national Black music", body: ["Don Robey founded Peacock Records in Houston in 1949 after managing guitarist Clarence 'Gatemouth' Brown. Peacock and the later Duke label became major forces in blues, rhythm and blues, gospel and soul, with the Bronze Peacock nightclub and Fifth Ward business network at the center of the story.", "The significance is both musical and industrial. Duke-Peacock demonstrated that a Houston-based, Black-owned operation could record, market and distribute music at national scale during the 1950s and 1960s."], links: [{ href: "/texas-gospel-rnb-pop", label: "Texas gospel, R&B and pop" }, { href: "/texas-blues", label: "Texas blues" }] },
      { heading: "Houston blues developed distinct voices", body: ["Lightnin' Hopkins built much of his career in Houston and became one of the most recognizable Texas blues musicians. Albert Collins later carried a sharply percussive electric-guitar sound from Houston into wider blues and rock audiences.", "Their differences matter. Houston was not a factory producing one style; it was a city where musicians could build personal approaches inside a dense ecosystem of clubs, labels and listeners."], links: [{ href: "/texas-blues", label: "Texas blues history" }] },
      { heading: "DJ Screw turned local tape culture into a new hip-hop language", body: ["By the late twentieth century Houston rap had developed its own independent economy. DJ Screw's slowed, repeated and re-sequenced mixtape style became known as chopped and screwed, with tapes moving hand to hand and through local sales networks before the sound achieved broader recognition.", "The Screwed Up Click and later North Houston networks such as Swishahouse showed how strongly local geography mattered. Houston hip-hop was not simply a Texas version of music from New York or Los Angeles; it developed distinctive pacing, slang, production and distribution habits from the city's own conditions."], links: [{ href: "/texas-hip-hop", label: "Texas hip-hop deep guide" }] },
      { heading: "Houston's lesson: infrastructure can be a musical style", body: ["Duke-Peacock and DJ Screw are separated by decades and genre, yet both stories involve Houston musicians building systems around themselves. Labels, clubs, studios, home-tape networks and local retail all helped keep creative control close to the scene.", "That recurring independence helps explain why Houston has remained influential across blues, gospel, R&B, rap and pop without ever needing one official city sound."], links: [{ href: "/texas-music-cities", label: "Compare Texas music cities" }] }
    ],
    related: [
      { href: "/texas-hip-hop", label: "Texas Hip-Hop", description: "Follow Houston's rap networks and chopped-and-screwed innovation." },
      { href: "/texas-gospel-rnb-pop", label: "Texas Gospel, R&B & Pop", description: "Trace the church, label and studio traditions behind Houston's wider influence." },
      { href: "/texas-blues", label: "Texas Blues", description: "Place Lightnin' Hopkins and Albert Collins in the statewide blues lineage." }
    ]
  },
  "san-antonio-music-history": {
    slug: "san-antonio-music-history",
    eyebrow: "Borderland exchange, conjunto and the West Side Sound",
    title: "San Antonio Music History: Conjunto, Tejano, R&B and the West Side Sound",
    dek: "San Antonio's music history grew from cultural exchange: Mexican and Mexican American traditions, Black R&B and jazz, Anglo country and rock, and generations of neighborhood musicians sharing the same city.",
    quickAnswer: "San Antonio is one of Texas's clearest examples of music created through cultural exchange. The city became central to conjunto and Tejano while also nurturing R&B, jazz, country and rock. In the late 1950s, musicians on the city's West and East sides blended horn-driven R&B and rock-and-roll with conjunto and country into the West Side Sound. San Antonio matters because musical hybridity there was not a later crossover strategy; it grew from everyday contact among communities.",
    sections: [
      { heading: "A borderland city hears music from several directions at once", body: ["San Antonio's long Mexican and Mexican American history, military population, Black communities and Anglo migration created overlapping audiences and performance traditions. Spanish-language songs, church music, dance music, country, jazz and rhythm and blues could all circulate through the same urban region.", "That setting made San Antonio less a container for separate genres than a meeting place where musicians borrowed instruments, rhythms, repertoire and performance habits from one another."], links: [{ href: "/texas-music", label: "Texas Music hub" }] },
      { heading: "Conjunto became a foundational South Texas language", body: ["Texas-Mexican conjunto developed from borderland traditions in which inexpensive accordions, polka dance forms and Mexican musical practices interacted. The pairing of accordion and bajo sexto became central to the form and deeply associated with working-class social life in South Texas.", "San Antonio became a crucial recording, performance and audience center for conjunto and later Tejano, helping music rooted in local communities reach listeners across the state and beyond."], links: [{ href: "/texas-conjunto-tejano", label: "Texas conjunto and Tejano" }] },
      { heading: "The West Side Sound made the city's cultural mixture audible", body: ["Beginning in the late 1950s, San Antonio musicians created what became known as the West Side Sound. The style drew from horn-driven rhythm and blues and rock-and-roll while incorporating conjunto, Latin influences and country.", "The bands themselves reflected the city's intercultural character. Chicano, Black and Anglo musicians worked across social boundaries, creating a local language heard in groups associated with Sunny Ozuna, Doug Sahm, Augie Meyers and many other San Antonio players."], links: [{ href: "/texas-rock-rockabilly", label: "Texas rock and rockabilly" }] },
      { heading: "Tejano made San Antonio part of a statewide modern industry", body: ["As Tejano developed into a modern commercial form, San Antonio remained a major city for artists, audiences, radio and live performance. The genre combined older conjunto foundations with broader band arrangements and contemporary popular-music production.", "San Antonio's role should be understood alongside Corpus Christi, the Rio Grande Valley and other South Texas communities. The city was a major node in a larger regional network rather than the sole birthplace of the music."], links: [{ href: "/texas-conjunto-tejano", label: "Conjunto and Tejano history" }] },
      { heading: "San Antonio shows why Texas music cannot be sorted into boxes", body: ["Country musician Doug Sahm could draw naturally from conjunto, blues, R&B and rock because those sounds were already part of the San Antonio environment. The same city that supported conjunto also produced horn bands, rock-and-roll players and soul singers.", "That fluidity is San Antonio's central lesson in the statewide story: cultural exchange is not an exception to Texas music. It is one of its oldest organizing principles."], links: [{ href: "/texas-music-cities", label: "Compare Texas music cities" }] }
    ],
    related: [
      { href: "/texas-conjunto-tejano", label: "Texas Conjunto & Tejano", description: "The deeper borderland history behind two defining South Texas traditions." },
      { href: "/texas-rock-rockabilly", label: "Texas Rock & Rockabilly", description: "Follow another part of San Antonio's cross-genre story." },
      { href: "/texas-music", label: "Texas Music", description: "Return to the statewide authority hub." }
    ]
  },
  "lubbock-music-history": {
    slug: "lubbock-music-history",
    eyebrow: "West Texas radio, guitars and early rock and roll",
    title: "Lubbock Music History: Buddy Holly, the Crickets and the West Texas Roots of Rock and Roll",
    dek: "Lubbock's distance from major music-industry centers did not isolate it. Radio, school bands, country music, rhythm and blues and a network of West Texas musicians helped produce one of rock and roll's most influential early scenes.",
    quickAnswer: "Lubbock matters to music history because Buddy Holly and the Crickets emerged from a broader West Texas environment rather than from nowhere. Holly played country-oriented radio with Bob Montgomery, absorbed rhythm and blues and rock-and-roll, worked with local musicians, and eventually recorded the tracks that made the Crickets internationally influential. Waylon Jennings and other West Texas musicians show that Lubbock was part of a regional network whose ideas traveled far beyond the South Plains.",
    sections: [
      { heading: "Distance did not mean isolation", body: ["The South Plains could feel geographically remote, but radio collapsed distance. Young Lubbock musicians heard country, rhythm and blues and new rock-and-roll records while school, church and local performance networks gave them places to practice and collaborate.", "That combination helps explain why early West Texas rock was so hybrid. Musicians did not inherit one pure local style; they assembled new sounds from what broadcast signals, touring acts and nearby communities made available."], links: [{ href: "/texas-rock-rockabilly", label: "Texas rock and rockabilly" }] },
      { heading: "Buddy Holly learned inside a local network", body: ["Buddy Holly grew up in Lubbock and played with Bob Montgomery while still young. By the early 1950s the pair appeared on local radio, where Holly's early country orientation gradually collided with the emerging language of rock and roll.", "His later fame can obscure that apprenticeship. Local collaborators, school friends, radio exposure and regional performances created the environment in which Holly could experiment before national labels and studios entered the story."], links: [{ href: "/texas-music", label: "Texas Music hub" }] },
      { heading: "The Crickets changed the model for a rock-and-roll band", body: ["The Crickets formed in Lubbock in 1957 around Holly and fellow musicians. Recordings made with producer Norman Petty in Clovis, New Mexico, just across the state line, gave the group national hits and a lasting place in rock history.", "The geography matters: West Texas musicians routinely crossed regional boundaries in search of studios, gigs and collaborators. The Lubbock story therefore extends beyond city limits into a South Plains and eastern New Mexico circuit."], links: [{ href: "/texas-rock-rockabilly", label: "Texas rock history" }] },
      { heading: "Waylon Jennings shows the scene did not end with Holly", body: ["Waylon Jennings, born in Littlefield, worked in the Lubbock radio and music world and played bass for Holly before developing his own major country career. His trajectory connects West Texas rock-and-roll history directly to later country and outlaw country.", "That overlap is another reminder that genre labels came after musicians had already shared stages, radio stations and personal networks. Lubbock's influence moved through people as much as through records."], links: [{ href: "/texas-country-outlaw", label: "Texas country and outlaw country" }] },
      { heading: "How Lubbock remembers and interprets the legacy", body: ["The city eventually developed institutions and public spaces around Buddy Holly and the broader West Texas music story, including the Buddy Holly Center and a walk of fame recognizing regional musicians.", "For TexasDefined, the important distinction is between commemoration and history. Holly is the best-known entry point, but the deeper subject is the regional system—radio, schools, collaborators, studios and touring routes—that made a globally influential musician possible."], links: [{ href: "/texas-music-cities", label: "Compare Texas music cities" }] }
    ],
    related: [
      { href: "/texas-rock-rockabilly", label: "Texas Rock & Rockabilly", description: "Place Holly inside the wider West Texas and statewide rock story." },
      { href: "/texas-country-outlaw", label: "Texas Country", description: "Follow Waylon Jennings from West Texas radio into outlaw country." },
      { href: "/texas-music", label: "Texas Music", description: "Return to the statewide authority hub." }
    ]
  },
  "dallas-fort-worth-music-history": {
    slug: "dallas-fort-worth-music-history",
    eyebrow: "Deep Ellum blues, Fort Worth jazz and North Texas recording",
    title: "Dallas–Fort Worth Music History: Deep Ellum Blues, Fort Worth Jazz and a North Texas Recording Network",
    dek: "Dallas and Fort Worth built different but connected music histories: Deep Ellum blues and jazz, early recording businesses, western swing and country, and a Fort Worth school network that produced major modern-jazz innovators.",
    quickAnswer: "Dallas–Fort Worth is not one music scene, but the two cities form a powerful North Texas network. In Dallas, Deep Ellum and Central Track became major Black entertainment districts associated with Blind Lemon Jefferson and other blues and jazz performers. Dallas also supported early independent recording studios. Fort Worth became central to western swing and produced a remarkable generation of jazz musicians around I. M. Terrell High School, including Ornette Coleman and several future collaborators. Together the cities show how neighborhood culture, schools, studios and regional touring could reinforce one another.",
    sections: [
      { heading: "Deep Ellum was a working Black commercial and music district", body: ["In the 1920s and 1930s, Deep Ellum and nearby Central Track formed one of Dallas's most important Black commercial and entertainment areas. Rail traffic, theaters, dance halls, clubs and street performance brought musicians and audiences into close contact.", "Blind Lemon Jefferson became the most famous name associated with early Dallas blues, but the scene included many performers. The district's importance lies in density: music lived beside work, transportation, nightlife and community institutions rather than inside a single dedicated venue."], links: [{ href: "/texas-blues", label: "Texas blues" }] },
      { heading: "Dallas helped turn Texas blues into recorded history", body: ["Important blues musicians recorded in Dallas during the Deep Ellum era, giving commercial form to music that had circulated in live settings. Jefferson's highly individual guitar language influenced later Texas players, including T-Bone Walker.", "As transportation and urban development changed the district, blues activity shifted geographically, but Dallas remained part of the state's recording and performance network."], links: [{ href: "/texas-blues", label: "Texas blues history" }] },
      { heading: "North Texas also built an early recording business", body: ["Dallas engineer J. E. 'Pop' Sellers began professional recording in the 1930s, and Sellers Company Recording Studios has been credited as an early independent studio in the Southwest. Country, western swing and later rockabilly musicians all used North Texas recording infrastructure.", "That business history matters because scenes require preservation and distribution as well as performance. Studios made it possible for local music to leave the room where it was played."], links: [{ href: "/texas-rock-rockabilly", label: "Texas rock and rockabilly" }, { href: "/texas-western-swing", label: "Texas western swing" }] },
      { heading: "Fort Worth produced a remarkable modern-jazz network", body: ["Fort Worth's I. M. Terrell High School became associated with an extraordinary cluster of jazz musicians. Ornette Coleman attended alongside or near figures who would become important collaborators and innovators, including Dewey Redman, Charles Moffett, Prince Lasha and John Carter.", "Coleman's later work transformed modern jazz, but the Fort Worth context matters because he did not emerge in complete isolation. School music, local bands, touring acts and a network of peers gave young musicians material to absorb and challenge."], links: [{ href: "/texas-jazz", label: "Texas jazz" }] },
      { heading: "Why Dallas and Fort Worth belong together—and apart", body: ["Dallas and Fort Worth developed different neighborhoods, institutions and musical identities. Treating them as interchangeable would flatten the history. But musicians, recordings, touring routes and audiences moved throughout North Texas, making the larger Metroplex a useful frame when the differences are kept visible.", "Dallas contributes the Deep Ellum blues and recording story; Fort Worth contributes western swing history and a uniquely important jazz lineage. Together they form one of the state's richest multi-genre regions."], links: [{ href: "/texas-music-cities", label: "Compare Texas music cities" }] }
    ],
    related: [
      { href: "/texas-blues", label: "Texas Blues", description: "Go deeper on Blind Lemon Jefferson, T-Bone Walker and the Dallas lineage." },
      { href: "/texas-jazz", label: "Texas Jazz", description: "Follow Ornette Coleman and Fort Worth's modern-jazz network." },
      { href: "/texas-western-swing", label: "Texas Western Swing", description: "Connect North Texas dance music to the larger western-swing tradition." }
    ]
  }
};

export function getTexasMusicCityGuide(slug: string): TexasEvergreenGuide {
  const guide = TEXAS_MUSIC_CITY_GUIDES[slug];
  if (!guide) throw new Error(`Unknown Texas Music city guide: ${slug}`);
  return guide;
}
