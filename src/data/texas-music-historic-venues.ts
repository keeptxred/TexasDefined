export type HistoricTexasMusicVenue = {
  slug: string;
  name: string;
  place: string;
  era: string;
  status: string;
  significance: string;
  story: readonly string[];
  related: readonly { href: string; label: string }[];
  sources: readonly { label: string; href: string }[];
};

export const HISTORIC_TEXAS_MUSIC_VENUES: readonly HistoricTexasMusicVenue[] = [
  {
    slug: "armadillo-world-headquarters",
    name: "Armadillo World Headquarters",
    place: "Austin",
    era: "1970–1980",
    status: "Closed; original building demolished",
    significance:
      "A defining Austin room where country, blues, rock, jazz, folk and the city's counterculture audience mixed into the progressive-country era.",
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
    slug: "eldorado-ballroom",
    name: "Eldorado Ballroom",
    place: "Houston Third Ward",
    era: "1939 onward",
    status: "Historic ballroom restored and operating again",
    significance:
      "One of Texas's most important Black music rooms, connecting Houston's Third Ward to jazz, blues, R&B, social-club culture and touring circuits.",
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
    slug: "gilleys-pasadena",
    name: "Gilley's",
    place: "Pasadena",
    era: "1970–1990",
    status: "Original Pasadena club closed; site no longer operates as Gilley's",
    significance:
      "The giant honky-tonk that tied Houston-area country music, mechanical-bull culture and the Urban Cowboy era to a national image of Texas nightlife.",
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
    slug: "longhorn-ballroom",
    name: "Longhorn Ballroom",
    place: "Dallas",
    era: "1950 onward",
    status: "Restored and operating again",
    significance:
      "A Dallas ballroom that moved far beyond country music, hosting Western swing, blues, R&B, soul, Tejano, rock and punk across multiple generations.",
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
  {
    slug: "victory-grill",
    name: "Victory Grill",
    place: "East Austin",
    era: "1945 onward",
    status: "Historic site preserved; use varies by event and operator",
    significance:
      "A surviving East Austin landmark of the Chitlin' Circuit and one of the city's most important links to Black blues, jazz and postwar social history.",
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
] as const;
