import type { TexasEvergreenGuide } from "@/data/texas-evergreen-guides";

export type HistoricVenueStatus = {
  label: string;
  summary: string;
};

export const TEXAS_MUSIC_HISTORIC_VENUE_STATUS: Record<string, HistoricVenueStatus> = {
  "texas-music-historic-venues": {
    label: "Historic venue collection",
    summary: "A guide to Texas music rooms that closed, were demolished, were restored, or changed uses while remaining important to the state's musical history.",
  },
  "armadillo-world-headquarters-history": {
    label: "Closed and demolished",
    summary: "The Armadillo World Headquarters closed after its final New Year's Eve show in 1980 and the former National Guard armory was later demolished.",
  },
  "gilleys-pasadena-history": {
    label: "Original complex lost",
    summary: "The original Pasadena Gilley's closed at the end of the 1980s, suffered a major fire in 1990, and its remaining structures were later demolished.",
  },
  "eldorado-ballroom-houston-history": {
    label: "Historic room restored",
    summary: "Houston's 1939 Eldorado Ballroom survived the decline of its original nightclub era and became the subject of preservation and restoration work in Third Ward.",
  },
  "longhorn-ballroom-dallas-history": {
    label: "Historic building survives",
    summary: "Dallas's Longhorn Ballroom outlived its original country-dance-hall era and remains a physical landmark whose later chapters reflect changing ownership and revival efforts.",
  },
  "victory-grill-austin-history": {
    label: "Historic building preserved",
    summary: "Austin's Victory Grill survived decline and a 1988 fire, was restored in the 1990s, and remains significant as a surviving Chitlin' Circuit landmark in East Austin.",
  },
};

export const TEXAS_MUSIC_HISTORIC_VENUE_GUIDES: Record<string, TexasEvergreenGuide> = {
  "texas-music-historic-venues": {
    slug: "texas-music-historic-venues",
    eyebrow: "Rooms remembered after the last set",
    title: "Historic & Lost Texas Music Rooms: Clubs, Ballrooms and Honky-Tonks That Changed the Sound",
    dek: "Some of the most important rooms in Texas music are gone, restored, renamed or transformed. Their histories explain how scenes formed and why buildings matter even after the original club disappears.",
    quickAnswer: "Texas music history cannot be told only through venues that still sell tickets. Austin's Armadillo World Headquarters helped fuse country, rock and counterculture before it was demolished; the original Gilley's in Pasadena turned Gulf Coast honky-tonk culture into a national image through Urban Cowboy; Houston's Eldorado Ballroom anchored Black music and community life in Third Ward; Dallas's Longhorn Ballroom connected Bob Wills-era country with later blues, rock and punk; and Austin's Victory Grill became one of Texas's defining Chitlin' Circuit rooms. These places show several kinds of survival: some buildings vanished, some were restored, and some outlived the businesses that first made them famous.",
    sections: [
      {
        heading: "Why lost rooms belong in the Texas Music canon",
        body: [
          "A music venue can disappear while its influence remains visible. Promoters create touring networks, regular audiences give musicians a place to develop, neighborhoods supply workers and listeners, and buildings shape the intimacy or scale of performance. Once a room closes, those systems are easy to flatten into a list of famous names.",
          "TexasDefined separates historic-room research from current venue listings so the story does not depend on present-day hours or ticket calendars. The question here is what the room did for Texas music and what survives of that story now."
        ],
        links: [{ href: "/texas-music-venues", label: "Landmark Texas music venues" }, { href: "/texas-music", label: "Texas Music authority hub" }]
      },
      {
        heading: "Armadillo World Headquarters: a scene built across genres",
        body: [
          "The Armadillo World Headquarters opened in Austin in 1970 inside a former National Guard armory and became a meeting place for rock, blues, country, folk and jazz audiences. The room's importance came from overlap: musicians and listeners who might have occupied separate scenes elsewhere encountered one another in the same Austin ecosystem.",
          "That cross-pollination helped define the city's progressive-country and cosmic-cowboy era. The Armadillo closed after its final New Year's Eve show in 1980 and the building was demolished, making its posters, recordings, photographs and oral histories especially important evidence."
        ],
        links: [{ href: "/armadillo-world-headquarters-history", label: "Armadillo World Headquarters history" }, { href: "/texas-country-outlaw", label: "Texas country & outlaw country" }]
      },
      {
        heading: "Gilley's: Pasadena honky-tonk culture at national scale",
        body: [
          "The original Gilley's in Pasadena grew into a vast honky-tonk, dance hall and entertainment complex associated with Mickey Gilley and Sherwood Cryer. Its mechanical bulls, dance floor and country programming made it a Gulf Coast institution before the film Urban Cowboy turned that environment into a national cultural image.",
          "The original Pasadena operation closed amid legal and business disputes near the end of the 1980s. A 1990 fire damaged the complex, and remaining structures were later demolished. Later businesses using the Gilley's name should be distinguished from the original Pasadena room."
        ],
        links: [{ href: "/gilleys-pasadena-history", label: "Original Gilley's Pasadena history" }, { href: "/texas-country-outlaw", label: "Texas country history" }]
      },
      {
        heading: "Eldorado Ballroom: Third Ward music and Black civic life",
        body: [
          "The Eldorado Ballroom opened in Houston's Third Ward in 1939 and became a major Black-owned gathering place for blues, jazz, rhythm and blues, touring performers, house bands and community events. Its history belongs to the neighborhood as much as to individual artists.",
          "Unlike rooms that disappeared completely, the Eldorado building became a preservation project. Restoration work and renewed use have kept the physical place connected to Third Ward history, even though the original nightclub era belongs to an earlier social and musical world."
        ],
        links: [{ href: "/eldorado-ballroom-houston-history", label: "Eldorado Ballroom history" }, { href: "/texas-blues", label: "Texas Blues" }, { href: "/texas-gospel-rnb-pop", label: "Texas Gospel, R&B & Pop" }]
      },
      {
        heading: "Longhorn Ballroom: from Bob Wills to punk-era collision",
        body: [
          "Dallas's Longhorn Ballroom began in 1950 as Bob Wills's Ranch House and became the Longhorn Ballroom under later operator Dewey Groom. Country and Western music formed its foundation, but the room also hosted blues, rhythm and blues, jazz and rock, making its history broader than a single genre.",
          "Its notorious 1978 Sex Pistols show is often remembered because it placed a touring punk band inside a deeply Texas dance-hall setting. The contrast captures the larger value of the room: it repeatedly connected old infrastructure with new audiences and changing musical eras."
        ],
        links: [{ href: "/longhorn-ballroom-dallas-history", label: "Longhorn Ballroom history" }, { href: "/texas-western-swing", label: "Texas Western Swing" }, { href: "/texas-rock-rockabilly", label: "Texas Rock & Rockabilly" }]
      },
      {
        heading: "Victory Grill: East Austin and the Chitlin' Circuit",
        body: [
          "Johnny Holmes opened the Victory Grill in Austin in 1945 as a gathering place for Black servicemen returning from World War II. The club became part of the Chitlin' Circuit and brought major Black performers into an East Austin business district shaped by segregation and Black entrepreneurship.",
          "The nightclub era declined as the city's social geography changed. The building nevertheless survived, including a 1988 fire, and later restoration preserved a rare physical link to the circuit that sustained Black touring music across the segregated South."
        ],
        links: [{ href: "/victory-grill-austin-history", label: "Victory Grill history" }, { href: "/texas-blues", label: "Texas Blues" }, { href: "/texas-jazz", label: "Texas Jazz" }]
      },
      {
        heading: "Lost, restored and transformed are different outcomes",
        body: [
          "Historic music rooms should not be described with one generic 'closed' label. The Armadillo's building is gone. The original Pasadena Gilley's complex disappeared after closure, fire and demolition. Eldorado and Victory Grill survive through preservation. Longhorn Ballroom survives physically but has passed through multiple operating eras.",
          "Those distinctions matter for travel and for history. A surviving building can be visited and interpreted, while a demolished venue requires maps, archives, recordings and streetscape context. TexasDefined uses the venue's documented physical status as part of the story instead of implying that every historic name represents a continuously operating business."
        ]
      }
    ],
    related: [
      { href: "/texas-music-venues", label: "Legendary Texas music venues", description: "The companion collection of landmark rooms with strong surviving venue identities." },
      { href: "/texas-music", label: "Texas Music", description: "The statewide guide to genres, musicians, scenes and places." },
      { href: "/texas-dance-halls-honky-tonks", label: "Texas dance halls & honky-tonks", description: "How social dancing and venue culture became part of everyday Texas life." }
    ]
  },
  "armadillo-world-headquarters-history": {
    slug: "armadillo-world-headquarters-history",
    eyebrow: "Austin counterculture, 1970–1980",
    title: "Armadillo World Headquarters History: The Austin Room Where Country, Rock and Counterculture Met",
    dek: "The Armadillo World Headquarters turned a former National Guard armory into one of 1970s Austin's defining music spaces before closing in 1980 and disappearing from the landscape.",
    quickAnswer: "The Armadillo World Headquarters opened in Austin in August 1970 in a converted National Guard armory. Over the next decade it hosted blues, rock, country, folk, jazz and touring performers while helping create the mixed audience that fueled Austin's progressive-country and cosmic-cowboy era. Willie Nelson's 1972 Armadillo appearance became one symbol of that crossover. The venue also supported a distinctive poster-art culture. It closed after a final New Year's Eve show on December 31, 1980, and the building was later demolished, so the Armadillo survives through archives, recordings, art and its influence on Austin's music identity rather than through the original room.",
    sections: [
      {
        heading: "A military building became a music experiment",
        body: [
          "The Armadillo occupied a former National Guard armory rather than a purpose-built nightclub. The large, unconventional room gave Austin's emerging counterculture a place where concerts, visual art, food and social life could coexist.",
          "That physical scale mattered. The venue could accommodate a larger audience than a small club while remaining far less formal than an arena, making it useful for artists and scenes that did not fit older entertainment categories."
        ]
      },
      {
        heading: "Genre boundaries became porous",
        body: [
          "The Armadillo booked blues, jazz, rock, folk and country, allowing audiences to hear styles that were often marketed separately. The resulting cross-pollination became part of Austin's identity during the 1970s.",
          "Country musicians could play to younger countercultural audiences, while rock listeners encountered Texas roots traditions in the same room. That overlap helped make progressive country and the broader outlaw-era Austin scene feel less like a single genre than a shared cultural space."
        ],
        links: [{ href: "/texas-country-outlaw", label: "Texas country & outlaw country" }, { href: "/texas-blues", label: "Texas Blues" }]
      },
      {
        heading: "Willie Nelson became a symbol of the crossover",
        body: [
          "Willie Nelson's early-1970s Armadillo performances are frequently used to explain the venue's cultural role because his music could bridge traditional Texas country, songwriters and the younger Austin audience.",
          "The deeper point is not that one concert created the movement. The Armadillo supplied a recurring environment where country musicians and listeners outside the traditional honky-tonk circuit could keep meeting, turning crossover into an ecosystem rather than a novelty."
        ]
      },
      {
        heading: "Poster art became part of the institution",
        body: [
          "The Armadillo's identity extended beyond the stage. Artists produced posters and graphics with a recognizable Austin psychedelic and underground sensibility, making visual art part of how shows circulated through the city.",
          "Because the building is gone, those posters now function as documentary evidence as well as art. They preserve lineups, dates, design culture and the self-image of a scene that understood music as part of a larger creative community."
        ]
      },
      {
        heading: "The room closed; the Austin myth survived",
        body: [
          "Rising land values and operating pressures contributed to the Armadillo's end. The venue held its final show on New Year's Eve 1980 and the structure was later demolished.",
          "That physical loss makes precision important. Visitors cannot experience the original room today, but the Armadillo's influence is visible in Austin's later live-music branding, its cross-genre booking traditions and the archival culture that continues to preserve the venue's posters, recordings and stories."
        ],
        links: [{ href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms" }, { href: "/texas-music-venues", label: "Landmark Texas music venues" }]
      }
    ],
    related: [
      { href: "/texas-country-outlaw", label: "Texas country & outlaw country", description: "Why 1970s Austin became a center for progressive country and cross-genre audiences." },
      { href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms", description: "Other Texas rooms whose influence outlived their original operating era." },
      { href: "/texas-music", label: "Texas Music", description: "The statewide music authority collection." }
    ]
  },
  "gilleys-pasadena-history": {
    slug: "gilleys-pasadena-history",
    eyebrow: "Pasadena honky-tonk culture, 1970–1990",
    title: "Gilley's Pasadena History: The Original Honky-Tonk Behind the Urban Cowboy Era",
    dek: "The original Gilley's in Pasadena turned a giant Gulf Coast honky-tonk, mechanical bulls and country music into a national image of Texas nightlife before the complex disappeared.",
    quickAnswer: "The original Gilley's operated in Pasadena from 1970 until the end of the 1980s under the partnership of country singer Mickey Gilley and businessman Sherwood Cryer. The enormous honky-tonk became known for its dance floor, country shows, mechanical bulls and rodeo atmosphere, and it reached a national audience through the syndicated Live from Gilley's radio program and the 1980 film Urban Cowboy, much of which was filmed at the club. Business and legal disputes led to closure; a major fire hit the property in 1990, and remaining structures were later demolished. Later Gilley's-branded venues should be distinguished from the original Pasadena complex.",
    sections: [
      {
        heading: "A Gulf Coast club became an entertainment complex",
        body: [
          "Gilley's developed in Pasadena, an industrial Houston-area city whose working-class population supplied the social environment for a large country dance hall. Sherwood Cryer and Mickey Gilley turned the operation into far more than a neighborhood bar.",
          "The complex combined a huge dance floor, live country music, bars, rodeo imagery and mechanical bulls. Its scale allowed a local honky-tonk culture to become a destination without losing the rough-edged participation that made dancing and spectacle central to the room."
        ]
      },
      {
        heading: "Radio carried the room beyond Pasadena",
        body: [
          "The nationally distributed Live from Gilley's radio program helped turn the club into a recognizable country-music brand. Performances recorded at the venue circulated far beyond the Houston area and reinforced the idea of Gilley's as a major stop on the country circuit.",
          "That broadcast layer matters because the club's influence was not limited to people who walked through the door. Radio converted a physical venue into a national media product before Hollywood magnified the image further."
        ]
      },
      {
        heading: "Urban Cowboy turned local nightlife into national imagery",
        body: [
          "The film Urban Cowboy used Gilley's as a central setting and transformed mechanical bulls, boots, partner dancing and the Gulf Coast honky-tonk into a national pop-culture package. The movie did not invent the room, but it changed the scale at which outsiders understood it.",
          "The resulting 'urban cowboy' boom affected fashion, country radio, nightlife and tourism. Gilley's became shorthand for a version of Texas that was industrial and metropolitan as well as Western."
        ],
        links: [{ href: "/texas-country-outlaw", label: "Texas country history" }, { href: "/texas-two-step", label: "Texas two-step guide" }]
      },
      {
        heading: "Closure ended the original Pasadena chapter",
        body: [
          "Partnership disputes and legal conflict destabilized the business during the late 1980s, and the original operation closed. A major fire damaged the site in 1990, and the remaining physical complex did not survive indefinitely.",
          "This is why later venues using the Gilley's name need careful labeling. The Texas music landmark discussed here is the original Pasadena complex associated with the 1970s and Urban Cowboy era, not every later business that inherited or licensed the brand."
        ]
      },
      {
        heading: "What remains is a cultural reference point",
        body: [
          "The original room cannot be experienced today, but its influence persists in country nightlife, mechanical-bull imagery, the Urban Cowboy legacy and Houston-area music history. Archival photographs, broadcasts and film footage preserve evidence of how the room looked and functioned.",
          "For Texas music history, Gilley's is most useful as a case study in amplification: a working-class local venue became a national symbol through radio and film, then disappeared physically while its image remained durable."
        ],
        links: [{ href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms" }]
      }
    ],
    related: [
      { href: "/texas-country-outlaw", label: "Texas country & outlaw country", description: "The broader country ecosystem surrounding Texas honky-tonks and dance halls." },
      { href: "/texas-dance-halls-honky-tonks", label: "Texas dance halls & honky-tonks", description: "How rooms, dance floors and nightlife shaped Texas social music." },
      { href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms", description: "The companion collection of vanished, revived and transformed venues." }
    ]
  },
  "eldorado-ballroom-houston-history": {
    slug: "eldorado-ballroom-houston-history",
    eyebrow: "Third Ward music history since 1939",
    title: "Eldorado Ballroom Houston History: Third Ward, Black Music and a Restored Texas Landmark",
    dek: "Houston's Eldorado Ballroom connected Black entrepreneurship, community life, jazz, blues and rhythm and blues in Third Ward before preservation gave the historic room a new chapter.",
    quickAnswer: "The Eldorado Ballroom opened in Houston's Third Ward in 1939 under Anna and Clarence Dupree. Located upstairs in the Eldorado Building near Emancipation Park, it became an important Black-owned venue for jazz, blues, rhythm and blues, touring stars, house bands, talent shows and community events during segregation. The original nightclub era declined in the later twentieth century, but the building survived. Project Row Houses acquired the property in 1999 and preservation work helped return the ballroom to public cultural use, making Eldorado different from a demolished venue: the historic room still anchors the neighborhood story.",
    sections: [
      {
        heading: "A Black-owned ballroom in a segregated city",
        body: [
          "Anna and Clarence Dupree opened the Eldorado Ballroom in 1939 in Houston's Third Ward. The second-floor room was created in a period when segregation limited where Black residents and touring musicians could gather, perform and build businesses.",
          "That context makes ownership as important as the stage. The Eldorado was part of a Black commercial and social ecosystem near Emancipation Park, giving audiences a venue controlled within the community rather than a room that merely booked Black talent."
        ]
      },
      {
        heading: "Blues, jazz and R&B shared the same infrastructure",
        body: [
          "The ballroom hosted jazz, blues, rhythm and blues and dance music, with local musicians and touring performers moving through the same room. House bands and regular programming made it more than an occasional concert hall.",
          "Houston's music history repeatedly crosses genre labels, and the Eldorado is a good example. Musicians who worked in blues, jump music, jazz and early R&B depended on overlapping audiences and venues rather than isolated genre institutions."
        ],
        links: [{ href: "/texas-blues", label: "Texas Blues" }, { href: "/texas-jazz", label: "Texas Jazz" }, { href: "/texas-gospel-rnb-pop", label: "Texas Gospel, R&B & Pop" }]
      },
      {
        heading: "The ballroom also functioned as community space",
        body: [
          "Talent contests, social events and community gatherings helped make the Eldorado a Third Ward institution beyond headline performances. The room offered a place where young performers could be seen and where residents could build social networks around music.",
          "That broader role is easy to miss when venue histories are reduced to celebrity lists. The Eldorado mattered because it was used repeatedly by a neighborhood, not only because famous people eventually passed through it."
        ]
      },
      {
        heading: "Decline did not erase the building",
        body: [
          "As entertainment patterns, neighborhoods and the music business changed, the ballroom's original era faded. Unlike venues that were demolished, however, the Eldorado building remained in Third Ward.",
          "Project Row Houses acquired the property in 1999 and preservation work helped restore the ballroom. That survival allows the building itself to remain part of Houston's public memory rather than forcing the story to rely entirely on archives and oral history."
        ]
      },
      {
        heading: "Preservation changes how the venue can be understood",
        body: [
          "A restored historic room is not the same thing as an uninterrupted nightclub business. The Eldorado's present cultural life should be understood as a preservation chapter layered onto the earlier ballroom history.",
          "Visitors should use current official or preservation sources for programming and access details. The evergreen historical value is the continuity of place: the Third Ward building still stands where Black music, enterprise and community life converged decades ago."
        ],
        links: [{ href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms" }]
      }
    ],
    related: [
      { href: "/texas-blues", label: "Texas Blues", description: "Houston's blues history and the musicians who built regional and national styles." },
      { href: "/texas-gospel-rnb-pop", label: "Texas Gospel, R&B & Pop", description: "The broader Black music traditions that overlapped Houston venues and recording institutions." },
      { href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms", description: "Other rooms whose buildings or institutions changed dramatically over time." }
    ]
  },
  "longhorn-ballroom-dallas-history": {
    slug: "longhorn-ballroom-dallas-history",
    eyebrow: "Dallas dance-hall history since 1950",
    title: "Longhorn Ballroom Dallas History: Bob Wills, Country Circuits and a Texas Room Built to Change",
    dek: "Dallas's Longhorn Ballroom began as Bob Wills's Ranch House, became a major country venue, and later hosted blues, rock and punk inside the same historic dance-hall shell.",
    quickAnswer: "The Dallas venue now known as the Longhorn Ballroom was built in 1950 for Bob Wills and initially operated as Bob Wills's Ranch House. After several management changes, Dewey Groom took over in 1958 and renamed it the Longhorn Ballroom. Country and Western music defined much of its identity, but the room also hosted blues, R&B, jazz and rock. Its January 10, 1978 Sex Pistols show became one of the building's most notorious events because punk collided with an established Texas dance-hall setting. The historic building survived later decline and ownership changes, making Longhorn a venue where multiple eras are physically layered in one place.",
    sections: [
      {
        heading: "Bob Wills was built into the room's origin",
        body: [
          "The building opened in 1950 as Bob Wills's Ranch House, tying its origin directly to one of Western swing's defining Texas figures. It was designed as a large dance and entertainment venue rather than a small neighborhood club.",
          "That beginning placed the room inside an established Texas dance tradition: music was organized around a floor, a band and an audience expected to participate rather than sit silently."
        ],
        links: [{ href: "/texas-western-swing", label: "Texas Western Swing" }]
      },
      {
        heading: "The Longhorn identity arrived under Dewey Groom",
        body: [
          "After early management changes, including a brief period associated with Jack Ruby, Dewey Groom took control in 1958 and renamed the venue the Longhorn Ballroom. Groom developed it into an important country-and-Western stop in Dallas.",
          "The room's scale supported touring acts and large crowds, helping Dallas connect national country circuits with local dance-hall culture."
        ]
      },
      {
        heading: "Country did not keep other genres out",
        body: [
          "The Longhorn's history includes blues, rhythm and blues, jazz and rock as well as country. That variety makes the room useful for understanding Dallas as a crossroads rather than a city with completely separate musical worlds.",
          "A dance hall can keep its architectural identity while its bookings change. The Longhorn repeatedly demonstrated that a building created for one musical era could absorb later sounds without becoming a different structure."
        ],
        links: [{ href: "/texas-blues", label: "Texas Blues" }, { href: "/texas-rock-rockabilly", label: "Texas Rock & Rockabilly" }]
      },
      {
        heading: "The Sex Pistols show became a collision of eras",
        body: [
          "The Sex Pistols played the Longhorn Ballroom on January 10, 1978 during their brief American tour. The event became notorious for confrontation between the band and parts of the crowd.",
          "Its historical value goes beyond punk mythology. A British punk band performing inside a Texas ballroom built for Bob Wills is an unusually vivid example of how old music infrastructure can become the stage for a radically different cultural moment."
        ]
      },
      {
        heading: "Survival created a new preservation question",
        body: [
          "The Longhorn went through later periods of decline, changing ownership and renewed interest, but the historic building survived. That distinguishes it from venues such as the Armadillo, where the original structure disappeared entirely.",
          "Current operation, access and programming can change and should be verified through present-day official sources. The stable historical fact is the survival of a Dallas ballroom that has carried multiple musical identities across more than one generation."
        ],
        links: [{ href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms" }]
      }
    ],
    related: [
      { href: "/texas-western-swing", label: "Texas Western Swing", description: "The Bob Wills tradition built into the ballroom's origin." },
      { href: "/texas-rock-rockabilly", label: "Texas Rock & Rockabilly", description: "The later rock context that shows how Texas venues crossed genre boundaries." },
      { href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms", description: "The collection of closed, revived and transformed Texas music rooms." }
    ]
  },
  "victory-grill-austin-history": {
    slug: "victory-grill-austin-history",
    eyebrow: "East Austin and the Chitlin' Circuit",
    title: "Victory Grill Austin History: Black Music, East Eleventh Street and the Chitlin' Circuit",
    dek: "Austin's Victory Grill opened in 1945 and became a defining Black music venue on the Chitlin' Circuit, preserving a rare physical link to East Austin's segregated-era entertainment district.",
    quickAnswer: "Johnny Holmes opened the Victory Grill at 1104 East Eleventh Street in Austin in 1945 as a gathering place for Black servicemen returning from World War II. The venue became an important stop on the Chitlin' Circuit and hosted major Black blues, R&B and popular performers while supporting East Austin nightlife during segregation. The nightclub era declined in the 1970s, and the building was damaged by fire in 1988, but restoration in the 1990s preserved it. Today its historical importance rests on the surviving building and its connection to Black entrepreneurship, touring networks and the musical life of East Austin.",
    sections: [
      {
        heading: "A postwar gathering place became a music institution",
        body: [
          "Johnny Holmes opened the Victory Grill in 1945 as Black servicemen returned from World War II to a still-segregated Austin. The club offered food, entertainment and social space within East Austin's Black business district.",
          "The timing matters. Black residents needed venues where they could gather safely and where Black musicians could work. The Victory Grill emerged from that social need before it became a celebrated stop on a larger touring circuit."
        ]
      },
      {
        heading: "The Chitlin' Circuit connected Austin to a national network",
        body: [
          "The Victory Grill became part of the Chitlin' Circuit, the network of venues that sustained Black performers during segregation. Artists could travel between cities knowing there were stages, promoters and audiences prepared to support them.",
          "Major names associated with the Victory Grill include performers across blues, R&B, soul and popular music, but the circuit itself is the deeper story. The venue gave touring Black musicians infrastructure in a city where mainstream entertainment spaces did not provide equal access."
        ],
        links: [{ href: "/texas-blues", label: "Texas Blues" }, { href: "/texas-gospel-rnb-pop", label: "Texas Gospel, R&B & Pop" }]
      },
      {
        heading: "East Eleventh Street was part of the stage",
        body: [
          "The Victory Grill did not operate in isolation. East Eleventh and East Twelfth streets contained Black-owned businesses, churches, clubs and social institutions shaped by Austin's segregation-era geography.",
          "Understanding the neighborhood prevents the venue from becoming a disconnected celebrity stop. Its success depended on a local community that supplied workers, customers, entrepreneurs and a cultural environment in which live music could flourish."
        ]
      },
      {
        heading: "Desegregation changed the economics of Black venues",
        body: [
          "Civil-rights gains opened previously segregated spaces to Black customers and performers, but that progress also changed the economic networks that had sustained Black-owned entertainment districts. Many Chitlin' Circuit venues declined as audiences and spending dispersed.",
          "The Victory Grill's nightclub era faded during the 1970s. That decline should not be framed as a failure of the music; it reflects a larger reorganization of urban life after legal segregation began to break down."
        ]
      },
      {
        heading: "Fire, restoration and a rare surviving building",
        body: [
          "A 1988 fire damaged the Victory Grill, but the building was later restored and reopened during the 1990s. Preservation recognition reinforced its significance as one of the surviving physical landmarks of the Chitlin' Circuit.",
          "Current event use can change, so present-day access should be checked with current operators or preservation sources. The permanent value is the building's ability to anchor a history of Black entrepreneurship and touring music in the same East Austin streets where that history occurred."
        ],
        links: [{ href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms" }]
      }
    ],
    related: [
      { href: "/texas-blues", label: "Texas Blues", description: "The blues traditions and touring systems that intersected East Austin." },
      { href: "/texas-gospel-rnb-pop", label: "Texas Gospel, R&B & Pop", description: "The broader Black music history that crossed the Chitlin' Circuit." },
      { href: "/texas-music-historic-venues", label: "Historic & lost Texas music rooms", description: "The companion collection of Texas venues changed by closure, preservation or demolition." }
    ]
  }
};

export function getTexasMusicHistoricVenueGuide(slug: string) {
  const guide = TEXAS_MUSIC_HISTORIC_VENUE_GUIDES[slug];
  if (!guide) throw new Error(`Unknown Texas Music historic venue guide: ${slug}`);
  return guide;
}
