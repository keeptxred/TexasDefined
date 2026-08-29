export type TexasMusicTimelineEntry = {
  year: string;
  title: string;
  place: string;
  summary: string;
  href: string;
  sourceUrl: string;
  sourceLabel: string;
};

export const TEXAS_MUSIC_TIMELINE: readonly TexasMusicTimelineEntry[] = [
  {
    year: "1878",
    title: "Gruene Hall opens",
    place: "Gruene / New Braunfels",
    summary:
      "The surviving dance hall ties modern Texas live music to the nineteenth-century German-Texan community-hall tradition, when music and dancing were part of local social infrastructure.",
    href: "/gruene-hall-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/gruene-hall",
    sourceLabel: "Handbook of Texas — Gruene Hall",
  },
  {
    year: "1920s",
    title: "Texas blues reaches national records",
    place: "Dallas, East Texas and beyond",
    summary:
      "Blind Lemon Jefferson became a foundational recorded Texas blues figure as rural and urban musicians carried distinct guitar, vocal and song traditions into the commercial recording era.",
    href: "/texas-blues",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/blues",
    sourceLabel: "Handbook of Texas — Blues",
  },
  {
    year: "1930s",
    title: "Western swing becomes a Texas dance sound",
    place: "Fort Worth, Waco and Central Texas",
    summary:
      "Milton Brown, Bob Wills and other bandleaders fused country string music with jazz, blues and dance-band ideas, building a style designed as much for crowded floors as for radio.",
    href: "/texas-western-swing",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/country-music",
    sourceLabel: "Handbook of Texas — Country Music",
  },
  {
    year: "1939",
    title: "The Eldorado Ballroom opens",
    place: "Houston Third Ward",
    summary:
      "The African American-owned ballroom became one of Texas's major stages for blues, jazz and R&B and an anchor of Black cultural life across from Emancipation Park.",
    href: "/houston-music-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/eldorado-ballroom",
    sourceLabel: "Handbook of Texas — Eldorado Ballroom",
  },
  {
    year: "1945",
    title: "Victory Grill opens on Austin's East Side",
    place: "Austin",
    summary:
      "Johnny Holmes created the Victory Grill as a gathering place for returning Black servicemen; it grew into a major stop on the Chitlin' Circuit and a durable Austin blues landmark.",
    href: "/austin-music-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/victory-grill",
    sourceLabel: "Handbook of Texas — Victory Grill",
  },
  {
    year: "1950",
    title: "Bob Wills's Ranch House becomes the Longhorn Ballroom story",
    place: "Dallas",
    summary:
      "Built for Bob Wills and later renamed the Longhorn Ballroom, the Dallas room became an important country-and-western circuit venue while eventually hosting music far beyond one genre.",
    href: "/dallas-fort-worth-music-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/longhorn-ballroom",
    sourceLabel: "Handbook of Texas — Longhorn Ballroom",
  },
  {
    year: "1964",
    title: "The Broken Spoke opens on South Lamar",
    place: "Austin",
    summary:
      "The cafe grew into a dance hall where traditional country, Western swing, two-stepping and Austin's later progressive-country era could occupy the same floor.",
    href: "/broken-spoke-austin-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/broken-spoke",
    sourceLabel: "Handbook of Texas — Broken Spoke",
  },
  {
    year: "1970",
    title: "Gilley's opens in Pasadena",
    place: "Houston area",
    summary:
      "The enormous honky-tonk linked Gulf Coast working-class nightlife, live country broadcasts, mechanical-bull culture and the national Urban Cowboy phenomenon.",
    href: "/houston-music-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/gilleys",
    sourceLabel: "Handbook of Texas — Gilley's",
  },
  {
    year: "1970",
    title: "Armadillo World Headquarters opens",
    place: "Austin",
    summary:
      "The converted armory mixed rock, blues, jazz, folk and country audiences, helping turn Austin's cross-genre counterculture into the progressive-country scene associated with the city's 1970s musical identity.",
    href: "/austin-music-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/armadillo-world-headquarters",
    sourceLabel: "Handbook of Texas — Armadillo World Headquarters",
  },
  {
    year: "1975",
    title: "Antone's makes blues the mission",
    place: "Austin",
    summary:
      "Clifford Antone built a club around direct contact between touring blues masters and younger Texas musicians, creating an institution whose influence outlasted any one address.",
    href: "/antones-austin-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/antones",
    sourceLabel: "Handbook of Texas — Antone's",
  },
  {
    year: "1981",
    title: "Billy Bob's Texas opens in the Stockyards",
    place: "Fort Worth",
    summary:
      "A former livestock-building complex became a destination-scale country venue, tying live music and social dancing to the modern visitor identity of the Fort Worth Stockyards.",
    href: "/billy-bobs-texas-history",
    sourceUrl: "https://www.billybobstexas.com/about-us/history",
    sourceLabel: "Billy Bob's Texas — Official History",
  },
  {
    year: "1982",
    title: "Selena y Los Dinos make Corpus Christi their base",
    place: "Corpus Christi / Coastal Bend",
    summary:
      "After the Quintanilla family moved to Corpus Christi, Selena y Los Dinos built their career inside a South Texas Tejano ecosystem of dance halls, nightclubs, record stores, labels and studios that helped carry regional music to much larger audiences.",
    href: "/corpus-christi-music-history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/quintanilla-perez-selena-selena",
    sourceLabel: "Handbook of Texas — Selena Quintanilla Perez",
  },
  {
    year: "1980s onward",
    title: "Texas hip-hop builds regional systems",
    place: "Houston, Port Arthur and Dallas-Fort Worth",
    summary:
      "Independent labels, local tape networks, Houston's slowed-down production culture and Gulf Coast groups created durable regional infrastructure before Texas rap became a national force.",
    href: "/texas-hip-hop",
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music/category/music/category/genres-rap-and-hip-hop",
    sourceLabel: "Handbook of Texas Music — Rap and Hip-Hop",
  },
] as const;
