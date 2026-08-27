export type TexasMusicHistoricPlace = {
  slug: string;
  name: string;
  place: string;
  era: string;
  status: string;
  summary: string;
  significance: string;
  relatedHref: string;
  relatedLabel: string;
  sourceUrl: string;
  sourceLabel: string;
  story: readonly string[];
  related: readonly { href: string; label: string }[];
  sources: readonly { label: string; href: string }[];
};

export const TEXAS_MUSIC_HISTORIC_PLACES: readonly TexasMusicHistoricPlace[] = [
  {
    slug: "armadillo-world-headquarters",
    name: "Armadillo World Headquarters",
    place: "Austin",
    era: "1970–1980",
    status: "Lost venue; site commemorated",
    summary:
      "A converted National Guard armory became Austin's defining cross-genre counterculture room, bringing rock, blues, jazz, folk and country audiences into one deliberately informal space.",
    significance:
      "The Armadillo helped make progressive country possible by putting traditional country culture beside rock and blues rather than treating them as separate audiences. Its poster artists also made the venue part of Austin's visual culture. The building is gone, but the room remains essential to understanding why 1970s Austin sounded different from Nashville or other Texas cities.",
    relatedHref: "/austin-music-history",
    relatedLabel: "Austin music history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/armadillo-world-headquarters",
    sourceLabel: "Handbook of Texas — Armadillo World Headquarters",
    story: [
      "The Armadillo opened in a converted National Guard armory in 1970 and quickly became one of Austin's central live-music institutions. Its large room let local performers share bills with touring acts that smaller clubs could not accommodate, while the venue's deliberately eclectic calendar placed country, blues, rock, jazz and folk audiences in the same cultural space.",
      "Willie Nelson's 1972 appearance became emblematic of the Austin progressive-country crossover, but the room also mattered as an art institution. Its poster artists created a visual language that became part of Austin music identity. The venue closed after its final New Year's Eve show in 1980 as downtown real-estate pressure overtook the operation; a city plaque now marks the former site.",
    ],
    related: [
      { href: "/austin-music-history", label: "Austin music history" },
      { href: "/texas-country-outlaw", label: "Texas country & outlaw country" },
      { href: "/texas-rock-rockabilly", label: "Texas rock & rockabilly" },
    ],
    sources: [
      { label: "Handbook of Texas — Armadillo World Headquarters", href: "https://www.tshaonline.org/handbook/entries/armadillo-world-headquarters" },
    ],
  },
  {
    slug: "gilleys-pasadena",
    name: "Gilley's",
    place: "Pasadena",
    era: "1970–1990",
    status: "Original venue lost",
    summary:
      "The Pasadena honky-tonk became a Gulf Coast country institution whose scale, radio reach and mechanical-bull mythology eventually fed the national Urban Cowboy moment.",
    significance:
      "Gilley's connected country stardom to the industrial Houston area's working-class social life. Live broadcasts carried the club far beyond Pasadena, while the film Urban Cowboy turned the venue into shorthand for a particular late-1970s and early-1980s Texas style. The original complex is gone, so its historical importance must be separated from later businesses using the Gilley's name.",
    relatedHref: "/houston-music-history",
    relatedLabel: "Houston music history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/gilleys",
    sourceLabel: "Handbook of Texas — Gilley's",
    story: [
      "Sherwood Cryer and Mickey Gilley opened Gilley's in Pasadena in 1970, building a country nightclub around Gilley's performances and an unusually large entertainment complex. The club's scale, dance floor, rodeo features and mechanical bulls made it a destination as much as a neighborhood honky-tonk, while major country artists helped turn it into a powerful regional stage.",
      "The club's national profile exploded after Urban Cowboy used Gilley's and Houston-area honky-tonk culture as part of its setting and imagery. The original Pasadena operation closed in 1990, so the historical story must be separated from later licensed Gilley's venues elsewhere. Its legacy belongs to the Gulf Coast country scene and to the moment when a local working-class nightclub became a widely recognized symbol of Texas culture.",
    ],
    related: [
      { href: "/houston-music-history", label: "Houston music history" },
      { href: "/texas-country-outlaw", label: "Texas country & outlaw country" },
      { href: "/texas-two-step", label: "Texas two-step" },
    ],
    sources: [
      { label: "Handbook of Texas — Gilley's", href: "https://www.tshaonline.org/handbook/entries/gilleys" },
      { label: "Handbook of Texas — Mickey Gilley", href: "https://www.tshaonline.org/handbook/entries/gilley-mickey-leroy" },
      { label: "Gilley's — legacy site", href: "https://gilleys.com/" },
    ],
  },
  {
    slug: "eldorado-ballroom",
    name: "Eldorado Ballroom",
    place: "Houston Third Ward",
    era: "1939 onward",
    status: "Historic ballroom preserved and restored",
    summary:
      "Across from Emancipation Park, the African American-owned Eldorado became one of the state's most important stages for blues, jazz and R&B during segregation-era Houston.",
    significance:
      "The ballroom documents how Black-owned cultural infrastructure shaped Houston music long before the city's modern entertainment districts. Touring stars and local musicians shared a prestigious room rooted in Third Ward community life. Its preservation makes the Eldorado unusually valuable because the physical place can still carry the story that recordings alone cannot.",
    relatedHref: "/houston-music-history",
    relatedLabel: "Houston music history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/eldorado-ballroom",
    sourceLabel: "Handbook of Texas — Eldorado Ballroom",
    story: [
      "Built in 1939 for Clarence and Anna Dupree, the Eldorado occupied the second floor of a prominent Third Ward commercial building near Emancipation Park. It became an upscale social and performance space where Houston musicians such as Milton Larkin, Illinois Jacquet and Arnett Cobb developed alongside national touring acts in jazz, blues and R&B.",
      "The ballroom declined as Houston's inner-city geography and entertainment patterns changed, and it closed as a regular nightclub in the 1970s. Project Row Houses acquired the property in 1999 and led its preservation. The restored Eldorado now operates again as a cultural and event space, making it especially valuable for understanding Black Houston music history through a surviving building rather than a vanished address.",
    ],
    related: [
      { href: "/houston-music-history", label: "Houston music history" },
      { href: "/texas-blues", label: "Texas blues" },
      { href: "/texas-jazz", label: "Texas jazz" },
    ],
    sources: [
      { label: "Handbook of Texas — Eldorado Ballroom", href: "https://www.tshaonline.org/handbook/entries/eldorado-ballroom" },
      { label: "Texas Historical Commission — Eldorado Ballroom marker", href: "https://atlas.thc.texas.gov/Details?atlasnumber=5507017020&fn=print" },
      { label: "Eldorado Ballroom — official history", href: "https://www.theeldoradoballroom.com/about" },
    ],
  },
  {
    slug: "victory-grill",
    name: "Victory Grill",
    place: "Austin East Side",
    era: "1945 onward",
    status: "Historic Chitlin' Circuit landmark",
    summary:
      "Opened for Black servicemen returning from World War II, the Victory Grill became a major East Austin blues room and an important Texas stop on the Chitlin' Circuit.",
    significance:
      "Victory Grill complicates the familiar story that Austin music begins with the 1970s. Its history reaches into segregated East Austin, Black entrepreneurship and touring networks that sustained blues and R&B performers when many venues excluded them. The surviving building also links Austin's music identity to the city's racial geography and preservation history.",
    relatedHref: "/austin-music-history",
    relatedLabel: "Austin music history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/victory-grill",
    sourceLabel: "Handbook of Texas — Victory Grill",
    story: [
      "Johnny Holmes opened the Victory Grill on V-J Day in 1945 to serve Black servicemen returning from World War II in a segregated Austin. The restaurant and bar soon became a music venue, and its performance space developed into a recognized stop on the Chitlin' Circuit, the network that gave Black musicians dependable places to work across the segregated South and Midwest.",
      "The Victory hosted major blues, jazz and R&B performers while also helping local musicians build careers. Desegregation, neighborhood change and shifting music tastes weakened the old circuit, and the venue later endured closure and fire before preservation efforts restored it. Its National Register and Texas historical recognition make the building a crucial counterpoint to Austin narratives that begin only with the 1970s live-music boom.",
    ],
    related: [
      { href: "/austin-music-history", label: "Austin music history" },
      { href: "/texas-blues", label: "Texas blues" },
      { href: "/texas-jazz", label: "Texas jazz" },
    ],
    sources: [
      { label: "Handbook of Texas — Victory Grill", href: "https://www.tshaonline.org/handbook/entries/victory-grill" },
      { label: "Texas Historical Commission — Victory Grill marker", href: "https://atlas.thc.texas.gov/Details/5507015520" },
      { label: "Historic Victory Grill — official history", href: "https://atxhistoricvictorygrill.org/About.html" },
    ],
  },
  {
    slug: "longhorn-ballroom",
    name: "Longhorn Ballroom",
    place: "Dallas",
    era: "1950 onward",
    status: "Historic ballroom; restored and operating again",
    summary:
      "Built as Bob Wills's Ranch House and later renamed the Longhorn Ballroom, the large Dallas room became a major country-and-western circuit stop with a history that crossed genres and generations.",
    significance:
      "The Longhorn connects Western swing directly to Dallas venue history while showing how a room can outlive its founding musical identity. Country stars, changing ownership, later Tejano programming and other scenes all accumulated in the same complex. That layered history makes it a useful counterpart to Fort Worth's dance-hall and honky-tonk tradition.",
    relatedHref: "/dallas-fort-worth-music-history",
    relatedLabel: "Dallas–Fort Worth music history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/longhorn-ballroom",
    sourceLabel: "Handbook of Texas — Longhorn Ballroom",
    story: [
      "The ballroom was built in 1950 for Bob Wills and the Texas Playboys and originally operated as Bob Wills' Ranch House. After Dewey Groom took over and renamed it the Longhorn Ballroom, the room became a major stop on country and Western circuits while also welcoming Black artists in jazz, blues, soul and R&B.",
      "Its history kept widening rather than narrowing: later decades brought Tejano, rock and punk, including a 1978 Sex Pistols performance that became one of the venue's best-known episodes. After periods of decline and intermittent use, new ownership restored the ballroom and reopened it in 2023. That continuity makes the Longhorn a rare place where several different Dallas music histories can be read in one surviving venue.",
    ],
    related: [
      { href: "/dallas-fort-worth-music-history", label: "Dallas–Fort Worth music history" },
      { href: "/texas-western-swing", label: "Texas Western Swing" },
      { href: "/texas-rock-rockabilly", label: "Texas rock & rockabilly" },
    ],
    sources: [
      { label: "Handbook of Texas — Longhorn Ballroom", href: "https://www.tshaonline.org/handbook/entries/longhorn-ballroom" },
      { label: "Longhorn Ballroom — official history", href: "https://www.longhornballroom.com/history2" },
      { label: "Visit Dallas — Longhorn Ballroom", href: "https://www.visitdallas.com/longhorn-ballroom/" },
    ],
  },
] as const;
