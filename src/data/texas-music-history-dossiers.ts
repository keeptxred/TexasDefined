/**
 * Research findings checked against linked primary, archival and scholarly
 * sources on 2026-11-13. The "reading" fields are Texas Defined's own
 * interpretations, not quotations or claims of firsthand archival access.
 * Each source must actually substantiate its adjacent factual "record".
 */
export type MusicResearchFinding = {
  heading: string;
  record: string;
  reading: string;
  source: string;
  href: string;
};
export type MusicResearchDossier = {
  heading: string;
  introduction: string;
  findings: readonly MusicResearchFinding[];
  caution: string;
};
export const musicResearchDossiers: Record<string, MusicResearchDossier> = {
  "broken-spoke-austin-history": {
    heading: "The Broken Spoke: a building, a floor, and two different dates",
    introduction: "The state marker, city preservation recommendation and retrospective club histories answer different questions. Reading them together shows why preserving a dance hall means more than recalling the musicians who played there.",
    findings: [
      {
        heading: "A former lumberyard on a once-rural road",
        record: "Texas Historical Commission marker 23384 places James White's 1964 business at 3201 South Lamar, at a former lumberyard outside Austin's then city limits. It describes jukebox dancing and live weekend bands before White enlarged the room with a stage and dedicated dance hall.",
        reading: "The Spoke was not designed as an already-famous country attraction. The addition of a purpose-built dance space shows the audience helped determine the building's use; the room's history is also a history of South Austin's expanding geography.",
        source: "Texas Historical Commission, Broken Spoke marker 23384",
        href: "https://atlas.thc.texas.gov/Details?atlasnumber=5000023384&fn=print"
      },
      {
        heading: "A marker's year is not its dedication day",
        record: "The state marker is recorded under 2021; the Governor's Office dates its public dedication to April 2023. These dates describe separate stages in the recognition process.",
        reading: "A venue timeline should not flatten award, marker manufacture and public ceremony into a single event. This distinction matters when readers encounter apparently inconsistent dates on plaques and news stories.",
        source: "Governor's Office, April 13, 2023 dedication record",
        href: "https://gov.texas.gov/news/post/first-lady-abbott-dedicates-broken-spoke-texas-historical-marker-in-austin"
      },
      {
        heading: "Recognition is different from a local zoning decision",
        record: "In May 2023, Austin's Music Commission recommended historic zoning for the Broken Spoke. A recommendation is evidence of the preservation argument, not evidence that every subsequent zoning action was adopted.",
        reading: "Separating state recognition from the city's separate land-use process prevents a common error: describing a preservation proposal as an accomplished legal protection. The structure's continued use is the cultural fact; legal status requires its own record check.",
        source: "City of Austin Music Commission, Recommendation 20230501-6",
        href: "https://services.austintexas.gov/edims/document.cfm?id=408615"
      },
      {
        heading: "Country history heard from the dance floor",
        record: "The marker names touring figures including Bob Wills, Ernest Tubb, Tex Ritter and Kitty Wells alongside White's bookings of Austin-area bands.",
        reading: "That list spans national touring stars and local working musicians. The room's long-term contribution is the recurring meeting between the two on a public dance floor, not the claim that any one performer or country subgenre began there.",
        source: "Texas Historical Commission, marker text",
        href: "https://atlas.thc.texas.gov/Details?atlasnumber=5000023384&fn=print"
      }
    ],
    caution: "The state marker and the Handbook of Texas frame the original restaurant and dance floor slightly differently. Both agree on the 1964 establishment and later expansion; neither should be treated as a floor-plan record."
  },
  "continental-club-austin-history": {
    heading: "The Continental Club's opening year is disputed",
    introduction: "The club's own account says 1955; independent published histories say 1957. The responsible approach is to show the disagreement rather than silently choose the date repeated most often.",
    findings: [
      {
        heading: "1955 according to the club; 1957 according to the Handbook",
        record: "The Continental Club's current official history states that it opened in 1955. Christy Lynn Hodson's Handbook of Texas entry identifies a 1957 opening at 1315 South Congress under Morin Scott. Austin's adopted Greater South River City neighborhood plan independently prints 1957.",
        reading: "Until an original license, advertisement or property record establishes which event each year denotes, the exact opening year should be marked disputed. 'Operating since the 1950s' is safer than presenting 1955 or 1957 as settled.",
        source: "Handbook of Texas, Continental Club; compare venue history",
        href: "https://www.tshaonline.org/handbook/entries/continental-club"
      },
      {
        heading: "One room has served very different publics",
        record: "The Handbook identifies Morin Scott's supper-club period, 1960s burlesque, Martin Schuler's neighborhood tavern, late-1970s rock bookings and 1980s connections to Liberty Lunch.",
        reading: "The defining continuity is the location, not an uninterrupted roots-music program. Treating the club as perpetually rockabilly erases the changes in ownership, clientele and the South Congress economy that made later reinvention possible.",
        source: "Handbook of Texas, researched institutional history",
        href: "https://www.tshaonline.org/handbook/entries/continental-club"
      },
      {
        heading: "The 1987 renovation recovered four wall paintings",
        record: "In 1987 Steve Wertheimer leased the venue and restored four original European street-scene murals associated with its supper-club era. The Handbook documents this specific restoration, not just a general cosmetic facelift.",
        reading: "The murals connect today's music room to its restaurant-and-dance origins. They are physical evidence of layered use, while the musical program around them changed dramatically.",
        source: "Handbook of Texas, Wertheimer restoration",
        href: "https://www.tshaonline.org/handbook/entries/continental-club"
      },
      {
        heading: "A Houston branch demonstrates institutional reach",
        record: "The Handbook records the Continental Club's Houston sister location opening on Main Street in July 2000, with regional musicians playing both clubs.",
        reading: "The Austin story extends beyond one building when musicians and bookings are shared between cities. That circuit is distinct from, and should not be confused with, the South Congress building's age.",
        source: "Handbook of Texas, sister-club section",
        href: "https://www.tshaonline.org/handbook/entries/continental-club"
      }
    ],
    caution: "The 1955/1957 discrepancy remains unresolved without contemporaneous records. Neither date is silently presented as definitive, and the city plan's 1957 wording may trace back to the same historical sources as the Handbook."
  },
  "antones-austin-history": {
    heading: "What survived when Antone's changed buildings",
    introduction: "Antone's history tests a simple question: can a music venue be historically continuous when its address is not? Its founding bookings, repeated moves and blues relationships suggest the lasting unit is an institution rather than a facade.",
    findings: [
      {
        heading: "The opening bill stated a musical mission",
        record: "Clifford Antone opened the Sixth Street club on July 15, 1975, with Clifton Chenier and His Red-Hot Louisiana Band. Sunnyland Slim and Big Walter Horton were among the other early performers.",
        reading: "Booking a zydeco musician first made Antone's a Gulf Coast crossroads from opening night. Describing it only as an Austin guitar-blues room hides that broader Louisiana–Texas touring exchange.",
        source: "Handbook of Texas, Antone's",
        href: "https://www.tshaonline.org/handbook/entries/antones"
      },
      {
        heading: "The club's history is a sequence of addresses",
        record: "The Handbook traces moves to Anderson Lane around 1980, Guadalupe Street in 1981, West Fifth Street in 1997 and East Riverside in 2013. The current East Fifth Street era began later.",
        reading: "The surviving brand does not make each historic photograph a view of today's entrance. Chronologies and image captions must identify which room and era they document.",
        source: "Handbook of Texas, successive sites",
        href: "https://www.tshaonline.org/handbook/entries/antones"
      },
      {
        heading: "Black blues masters met younger Austin listeners",
        record: "The Handbook's Clifford Antone biography explains his motive to book blues, R&B, gospel and zydeco performers for an Austin audience that had limited access to those touring acts.",
        reading: "The club was both a commercial stage and a conduit between generations. Its contribution should be credited to the older, often Black and Louisiana-based musicians as well as to the promoter and later local guitarists.",
        source: "Handbook of Texas, Clifford Jamal Antone",
        href: "https://www.tshaonline.org/handbook/entries/antone-clifford-jamal"
      },
      {
        heading: "Downtown return is not a return to the original building",
        record: "The club's official history records its December 31, 2015 reopening at the present East Fifth Street site, after multiple relocations.",
        reading: "The city's phrase 'historic club' describes a continuing organization and repertoire; it must not be read to imply unbroken occupancy of its original Sixth Street storefront.",
        source: "Antone's official historical chronology",
        href: "https://antonesnightclub.com/history/"
      }
    ],
    caution: "Historical photographs of the Lavaca location must be labeled as former premises, not current visitor directions. Present programming should be checked through the club rather than inferred from earlier eras."
  },
  "billy-bobs-texas-history": {
    heading: "The Stockyards building changed uses before and after 1981",
    introduction: "Billy Bob's is simultaneously a music club and an example of industrial reuse. Its financial break in 1988 is essential to telling that story accurately.",
    findings: [
      {
        heading: "A 1910 livestock building carried multiple economies",
        record: "The venue's official history dates the original open-air cattle barn to 1910 and its 1936 enclosure to a Texas Centennial project. The Handbook adds Globe Aircraft manufacturing during World War II; a department-store period preceded conversion to a nightclub.",
        reading: "The stockyard setting is not an invented Western facade. The building's changes show a livestock district adapting to aviation, shopping and finally cultural tourism.",
        source: "Handbook of Texas, Billy Bob's Texas",
        href: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas"
      },
      {
        heading: "A national country moment met a 100,000-square-foot room",
        record: "Billy Bob's opened April 1, 1981, in a 100,000-square-foot venue with capacity for roughly 6,000 people, as the Urban Cowboy-era boom reshaped popular country music.",
        reading: "That scale distinguishes it from intimate dance halls. A destination entertainment operation could book nationally recognizable acts while embedding music in bull-riding, food and Fort Worth Stockyards tourism.",
        source: "Handbook of Texas, opening and country boom",
        href: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas"
      },
      {
        heading: "1988 interrupts any claim of uninterrupted operation",
        record: "The Handbook documents bankruptcy and a January 8, 1988 closing. Holt Hickman, Steve Murrin and Donald K. Jury reopened the club on November 28, 1988.",
        reading: "The gap belongs prominently in the chronology. It illustrates that the venue's success was tied to the Stockyards' wider commercial recovery, not automatic permanence.",
        source: "Handbook of Texas, closure and reopening",
        href: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas"
      },
      {
        heading: "Live recordings created a second kind of legacy",
        record: "Billy Bob's and Smith Music Group launched the Live at Billy Bob's series in 1998 after earlier live recordings by individual artists.",
        reading: "The recordings turned performances into objects that could circulate after concerts ended. A venue that once mainly brought crowds into the Stockyards also sent Fort Worth performances to listeners elsewhere.",
        source: "Handbook of Texas, Live at Billy Bob's",
        href: "https://www.tshaonline.org/handbook/entries/billy-bobs-texas"
      }
    ],
    caution: "The advertised 'world's largest' description is the venue's marketing label, not a globally audited record. Capacity, amenities and bull-riding schedules should be confirmed when planning a visit."
  },
  "texas-music-cities": {
    heading: "A comparison based on what each city's institutions did",
    introduction: "Rather than ranking genres or claiming a single birthplace, these records compare four ways music escaped its neighborhood: broadcasting, record companies, neighborhood dance and independently circulated tapes.",
    findings: [
      {
        heading: "Austin broadcast performances beyond the room",
        record: "Austin City Limits taped Willie Nelson's pilot on October 17, 1974 and PBS broadcast it during a pledge campaign in March 1975.",
        reading: "That is distribution through television: an Austin stage reached viewers who had never visited Austin. It is a different mechanism from booking a bigger concert hall.",
        source: "Austin City Limits, production history",
        href: "https://acltv.com/history-of-acl/"
      },
      {
        heading: "Houston made national music through a local business chain",
        record: "Don Robey founded Peacock Records in Houston in 1949 and took control of Duke Records in 1953; operations involved rehearsal/demo spaces, recording studios and distribution.",
        reading: "Houston's significance was not simply where performers lived. The label infrastructure helped artists move from neighborhood performance to nationally marketed records.",
        source: "Handbook of Texas, Duke-Peacock Records",
        href: "https://www.tshaonline.org/handbook/entries/duke-peacock-records"
      },
      {
        heading: "San Antonio's night spots made genre boundaries porous",
        record: "The West Side Sound entry traces mixed Chicano, African American and Anglo ensembles playing East and West Side venues in the late 1950s, with both local Harlem-label singles and later national hits.",
        reading: "This was musical exchange among people sharing venues and working bands, not a single top-down studio invention. It also did not erase the separate history of Texas-Mexican conjunto.",
        source: "Handbook of Texas, West Side Sound",
        href: "https://www.tshaonline.org/handbook/entries/west-side-sound"
      },
      {
        heading: "Corpus Christi's businesses connected a regional circuit",
        record: "Johnny Herrera's House of Music opened in 1961; Freddie Records and Hacienda Records developed label and studio capacity in the Coastal Bend.",
        reading: "The infrastructure made South Texas songs reproducible and findable. That differs from the original social circulation of music in dance halls and from the worldwide distribution created by a major-label contract.",
        source: "Handbook of Texas, Texas recording industry",
        href: "https://www.tshaonline.org/handbook/entries/recording-industry"
      }
    ],
    caution: "The comparison is illustrative, not comprehensive. Dallas–Fort Worth's Deep Ellum and modern-jazz stories and Lubbock's radio-to-Clovis recording pathway are covered in the linked city guides; a city may have all of these kinds of infrastructure."
  },
  "austin-music-history": {
    heading: "Austin's claim to music history rests on three different networks",
    introduction: "The national TV image of Austin cannot explain the whole scene. A public-broadcast station, a neighborhood honky-tonk and a blues promoter each worked with different audiences and musical traditions.",
    findings: [
      {
        heading: "A television pilot had a test and a transmission",
        record: "Austin City Limits recorded Willie Nelson on October 17, 1974. The pilot aired in March 1975 and led to a regular PBS series; the show's own history identifies Bill Arhos, Paul Bosner and Bruce Scafe as central organizers.",
        reading: "Recording date, transmission date and regular-series launch should not be merged. The people behind public television turned a local performance scene into a recurring national medium.",
        source: "Austin City Limits, official production history",
        href: "https://acltv.com/history-of-acl/"
      },
      {
        heading: "A dance hall had its own older audience",
        record: "The Texas Historical Commission dates the Broken Spoke's opening to 1964 and describes live country bands, jukebox dancing and the later enlargement of the dance floor.",
        reading: "The Spoke predates the city's most famous television platform. The Austin sound did not begin with the camera; dancers, bands and owners were already maintaining a live economy before national recognition.",
        source: "Texas Historical Commission, Broken Spoke marker",
        href: "https://atlas.thc.texas.gov/Details?atlasnumber=5000023384&fn=print"
      },
      {
        heading: "Antone's gave blues its own institutional base",
        record: "Clifford Antone opened his blues-focused club in 1975 with a first bill led by Clifton Chenier, followed by established blues musicians such as Sunnyland Slim and Big Walter Horton.",
        reading: "It would be misleading to portray Austin's blues identity as merely a branch of its country and outlaw story. Antone's built relationships with an older Gulf Coast and Black blues tradition that had its own touring history.",
        source: "Handbook of Texas, Antone's",
        href: "https://www.tshaonline.org/handbook/entries/antones"
      },
      {
        heading: "The city had several overlapping public audiences",
        record: "The Handbook's account of Austin City Limits locates the show within the progressive-country mixture of country, rock and folk that expanded in the 1970s.",
        reading: "National fame rewarded an already mixed scene. Austin's distinctive contribution is not ownership of any one genre, but the coexistence of dance-floor country, blues institutions and a public media platform.",
        source: "Handbook of Texas, Austin City Limits",
        href: "https://www.tshaonline.org/handbook/entries/austin-city-limits"
      }
    ],
    caution: "A broadcast record documents what television showed, not a complete census of the city's musicians. Black, Mexican American and local working-band histories should not disappear beneath the Willie Nelson story."
  },
  "houston-music-history": {
    heading: "From 2809 Erastus to the home-made grey tape",
    introduction: "Two eras of Houston music demonstrate how artists could build distribution without relocating to a coastal record-industry capital: Don Robey's postwar labels and DJ Screw's much later mixtape network.",
    findings: [
      {
        heading: "A label office was not the same as a finished-record studio",
        record: "After buying Duke Records in 1953, Don Robey moved his business to 2809 Erastus Street, the former Bronze Peacock. The on-site facility was primarily for rehearsals and demos; the Handbook identifies ACA and Gold Star among the studios used for finished recordings and mastering.",
        reading: "Houston's recording economy occupied several addresses and specialist businesses. Treating every Duke-Peacock release as recorded at the Bronze Peacock would erase the distributed production chain.",
        source: "Handbook of Texas, Duke-Peacock Records",
        href: "https://www.tshaonline.org/handbook/entries/duke-peacock-records"
      },
      {
        heading: "A university finding aid preserves Screw's working method",
        record: "University of Houston Special Collections describes DJ Screw using two copies of a record, turntable pitch controls, a crossfader and a four-track machine to build the slowed, repeated sound. Its collection is catalogued as 2010-023.",
        reading: "The distinctiveness is technical as well as geographic: chopping and slowing were made through a repeatable process involving specific consumer and studio equipment, not an abstract label applied to any slow rap.",
        source: "University of Houston Libraries, DJ Screw Collection finding aid",
        href: "https://findingaids.lib.uh.edu/repositories/2/resources/14"
      },
      {
        heading: "Cassette sales became an independent local channel",
        record: "The same archival finding aid says Screw sold his tapes from home, made personalized tapes for listeners and artists, and opened Screwed Up Records and Tapes in 1998.",
        reading: "The shop and the made-to-order tape challenge a neat major-label history. Houston rap moved through relationships, local retail and repeated listening before much of the outside industry recognized its reach.",
        source: "University of Houston Libraries, DJ Screw Collection",
        href: "https://findingaids.lib.uh.edu/repositories/2/resources/14"
      },
      {
        heading: "The surviving archive is not a free media library",
        record: "University of Houston lists four linear feet of Screw-related materials, including sound recordings, business material and equipment; some are restricted, and physical ownership does not transfer copyright.",
        reading: "Readers can check the archive's catalogue, but a history website cannot treat the recordings or photographs as automatically reusable. The provenance is valuable without republishing protected recordings.",
        source: "University of Houston, collection conditions of access and use",
        href: "https://findingaids.lib.uh.edu/repositories/2/resources/14"
      }
    ],
    caution: "The archival collection documents DJ Screw's methods; it does not by itself verify every later claim about who invented or adopted the style first. Album or recording rights require separate permission."
  },
  "san-antonio-music-history": {
    heading: "The West Side Sound was not confined to the West Side",
    introduction: "The genre name can obscure where the bands worked. Institutional music history identifies East Side clubs, cross-community working bands and specific records that distinguish this sound from the older conjunto tradition.",
    findings: [
      {
        heading: "A name that hides half the map",
        record: "The Handbook places the West Side Sound's origins in cantinas, house parties and venues on both San Antonio's east and west sides in the late 1950s.",
        reading: "The neighborhood label should not be used to erase the East Side's Black performers, clubs and touring connections. It names a musical identity rather than an exact geographic boundary.",
        source: "Handbook of Texas, West Side Sound",
        href: "https://www.tshaonline.org/handbook/entries/west-side-sound"
      },
      {
        heading: "Eastwood Country Club connected local and touring acts",
        record: "The Handbook says Doug Sahm, Spot Barnett and Rocky Morales filled in with the Eastwood Country Club house band and accompanied touring performers. Barnett's 20th Century Orchestra also worked at Club Ebony.",
        reading: "A club's house band was an informal music school and employment network. The collaboration of musicians from different communities can be documented through their work, without overstating how completely social barriers disappeared.",
        source: "Handbook of Texas, East Side house bands",
        href: "https://www.tshaonline.org/handbook/entries/west-side-sound"
      },
      {
        heading: "Two recorded hits reached beyond local clubs",
        record: "The Handbook names Sunny and the Sunliners' 1963 version of 'Talk to Me' and the Sir Douglas Quintet's 1965 'She's About a Mover' as moments of national exposure.",
        reading: "These examples offer concrete tests of the genre's reach instead of a vague statement that San Antonio became influential. Neither recording makes the West Side Sound identical to conjunto.",
        source: "Handbook of Texas, national recordings and dates",
        href: "https://www.tshaonline.org/handbook/entries/west-side-sound"
      },
      {
        heading: "Conjunto and West Side Sound meet without merging",
        record: "The Handbook traces West Side Sound's initial core to piano-triplet R&B and rock, with later dialogue with country and conjunto; Texas-Mexican conjunto has a separate accordion-and-bajo-sexto history.",
        reading: "A page that treats these traditions as interchangeable loses their different instrumental lineages. San Antonio matters precisely because musicians could borrow across established musical practices.",
        source: "Handbook of Texas, Texas-Mexican conjunto",
        href: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto"
      }
    ],
    caution: "The history describes cross-community collaboration in a segregated society. It should not romanticize the period as one of universal musical or social equality."
  },
  "corpus-christi-music-history": {
    heading: "The Coastal Bend music trade existed before Selena's fame",
    introduction: "The strongest Corpus Christi story is a sequence of businesses and working circuits: songwriting, retail, independent recording capacity and live performance, followed by national visibility.",
    findings: [
      {
        heading: "Johnny Herrera moved from records to retail",
        record: "The Handbook says Herrera started Gaviota Records in 1951 and opened the House of Music in Corpus Christi in 1961, at South Port and Buford. The shop became a meeting place for established artists and emerging musicians including Freddy Martinez and Abraham Quintanilla.",
        reading: "A record shop connected music makers and buyers before internet discovery existed. Herrera's history is also a reminder that the city's recorded-music infrastructure predates Selena's career by decades.",
        source: "Handbook of Texas, Johnny Herrera",
        href: "https://www.tshaonline.org/handbook/entries/herrera-juan-william-johnny"
      },
      {
        heading: "Two local labels did different recording work",
        record: "Freddie Martínez created Freddie Records to issue his own work and later recorded other regional musicians. The Handbook identifies Hacienda Records as builder of a 24-track studio in South Texas in the late 1970s.",
        reading: "Independent labels and expensive studio capacity are distinct kinds of investment. Together they helped working bands produce recordings within reach of the Corpus Christi–Rio Grande Valley circuit.",
        source: "Handbook of Texas, Recording Industry",
        href: "https://www.tshaonline.org/handbook/entries/recording-industry"
      },
      {
        heading: "The family band's touring years preceded major-label success",
        record: "The Handbook dates the Quintanilla family's move to Corpus Christi to 1982 and Selena's EMI Latin agreement to 1989. Her band performed in rural dance halls and urban nightclubs during the intervening years.",
        reading: "The seven-year span explains why 'discovered in Corpus Christi' is too small a story. Live audiences, independent labels and regional touring created the skills and fan base that major-label distribution later amplified.",
        source: "Handbook of Texas, Selena Quintanilla Perez",
        href: "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena"
      },
      {
        heading: "Commemoration and music-making are separate stories",
        record: "The Handbook documents Corpus Christi's Selena memorial in 1997 and the family museum opening in 1998, after the artist's 1995 death.",
        reading: "Memorial sites explain the city's present-day relationship to Selena, while the earlier business and band history explains what Corpus Christi contributed to the music industry in her lifetime.",
        source: "Handbook of Texas, Selena memorial and museum",
        href: "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena"
      }
    ],
    caution: "A musical birthplace is not the same as a recording location, a family home or a present-day museum. The Selena Museum's visitor details change; historical sources alone cannot verify opening hours."
  },
  "lubbock-music-history": {
    heading: "Lubbock radio, a failed Nashville deal and a Clovis studio",
    introduction: "Buddy Holly's breakthrough becomes more revealing when the unsuccessful records are included. The sequence was local broadcasting, a Nashville recording attempt and independent production across the New Mexico line.",
    findings: [
      {
        heading: "KDAV offered an audience before a national label",
        record: "The Handbook and Lubbock's musical heritage accounts document Buddy Holly's early performances with Bob Montgomery on local radio station KDAV, before a nationally successful single existed.",
        reading: "The station provided a regular public test for a young band. That work is a different historical contribution from the later Clovis studio sessions that produced national recordings.",
        source: "Handbook of Texas, Buddy Holly",
        href: "https://www.tshaonline.org/handbook/entries/holley-charles-hardin-buddy-holly"
      },
      {
        heading: "The 1956 Decca period was not the 1957 Crickets hit",
        record: "After a 1956 Decca contract and unsuccessful Nashville recordings, Holly returned to Texas. The Handbook places the recording partnership with Norman Petty's Clovis, New Mexico studio in February 1957 and the Crickets' first Brunswick hit release in May.",
        reading: "There were different versions and stages of 'That'll Be the Day.' A timeline that jumps straight from a 1956 contract to a 1957 hit makes label, studio and recording history look simpler than it was.",
        source: "Handbook of Texas, The Crickets",
        href: "https://www.tshaonline.org/handbook/entries/crickets"
      },
      {
        heading: "West Texas crossed a state line to make a national record",
        record: "The Texas Historical Commission's Buddy Holly marker dates the Clovis recording of the breakthrough version of 'That'll Be the Day' to February 25, 1957 and notes that the group toured nationally and in England.",
        reading: "The recording site is in New Mexico, while the artists and rehearsal culture were rooted in West Texas. Lubbock's influence cannot be understood by insisting that every important event took place inside the city.",
        source: "Texas Historical Commission, Buddy Holly marker",
        href: "https://atlas.thc.texas.gov/Details?atlasnumber=5507018312&fn=print"
      },
      {
        heading: "The Crickets were a working band, not a solo pseudonym",
        record: "The Handbook identifies fellow musicians Jerry Allison, Joe B. Mauldin and Niki Sullivan in the Crickets' 1957 line-up, while also describing earlier collaborators.",
        reading: "A biography focused only on Holly misses the collaborative writing, rhythm and band identity that shaped early rock-and-roll's sound and its later influence.",
        source: "Handbook of Texas, The Crickets",
        href: "https://www.tshaonline.org/handbook/entries/crickets"
      }
    ],
    caution: "Source accounts differ about early recording-session personnel. Date the recording, name the credited band, and avoid treating every rehearsal participant as a member of one fixed line-up."
  }
};
