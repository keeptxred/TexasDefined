export type TexasMusicTimelineEntry = {
  era: string;
  title: string;
  summary: string;
  places: readonly string[];
  links: readonly { href: string; label: string }[];
  sourceLabel: string;
  sourceUrl: string;
};

export const TEXAS_MUSIC_TIMELINE: readonly TexasMusicTimelineEntry[] = [
  {
    era: "Late 1800s–early 1900s",
    title: "Borderland dance traditions lay foundations for conjunto",
    summary: "In South Texas and along the Texas-Mexico border, Mexican musical traditions encountered accordions and Central European dance forms circulating through the region. Over time, accordion and bajo sexto became central to Texas-Mexican conjunto—a working-class social music that later fed Tejano.",
    places: ["San Antonio", "South Texas", "Rio Grande Valley"],
    links: [{ href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" }, { href: "/san-antonio-music-history", label: "San Antonio music history" }],
    sourceLabel: "Handbook of Texas — Texas-Mexican Conjunto",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/texas-mexican-conjunto",
  },
  {
    era: "1920s",
    title: "Commercial recording carries Texas blues beyond local streets and districts",
    summary: "Blind Lemon Jefferson became one of the first nationally successful country-blues recording artists, while Dallas's Deep Ellum and Central Track supported a dense Black entertainment economy. Recording turned regional performance traditions into records that could influence musicians far outside Texas.",
    places: ["Dallas", "Deep Ellum", "East Texas"],
    links: [{ href: "/texas-blues", label: "Texas blues" }, { href: "/dallas-fort-worth-music-history", label: "Dallas–Fort Worth music history" }],
    sourceLabel: "Handbook of Texas — Blues",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/blues",
  },
  {
    era: "1930s",
    title: "Western swing turns Texas dance music into a hybrid modern sound",
    summary: "Milton Brown, Bob Wills and their peers blended string-band country with jazz, blues, pop and dance-band instrumentation. Fort Worth and other Texas cities became crucial centers for a style built for large dance floors and radio audiences.",
    places: ["Fort Worth", "Waco", "Central Texas"],
    links: [{ href: "/texas-western-swing", label: "Texas western swing" }, { href: "/texas-dance-halls-honky-tonks", label: "Dance halls & honky-tonks" }],
    sourceLabel: "Handbook of Texas — Country Music",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/country-music",
  },
  {
    era: "1940s–1950s",
    title: "Electric blues, gospel and R&B infrastructure expands in Houston",
    summary: "Texas musicians helped electrify the blues while Houston developed clubs, studios and labels that connected blues, gospel and rhythm and blues. Don Robey's Peacock and Duke labels became nationally important Black-owned music businesses rooted in Houston's Fifth Ward ecosystem.",
    places: ["Houston", "Fifth Ward"],
    links: [{ href: "/houston-music-history", label: "Houston music history" }, { href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & pop" }, { href: "/texas-blues", label: "Texas blues" }],
    sourceLabel: "Handbook of Texas — Duke-Peacock Records",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/duke-peacock-records",
  },
  {
    era: "1950s",
    title: "West Texas musicians help define early rock and roll",
    summary: "Buddy Holly and the Crickets emerged from Lubbock's radio, school and performance networks, then recorded music that became foundational to the sound and structure of rock bands. The West Texas story also connects directly to Waylon Jennings and later country history.",
    places: ["Lubbock", "South Plains", "Clovis"],
    links: [{ href: "/lubbock-music-history", label: "Lubbock music history" }, { href: "/texas-rock-rockabilly", label: "Rock & rockabilly" }],
    sourceLabel: "Handbook of Texas — Buddy Holly",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/holley-charles-hardin-buddy-holly",
  },
  {
    era: "Late 1950s–1960s",
    title: "San Antonio's West Side Sound makes cultural exchange audible",
    summary: "San Antonio musicians mixed horn-driven R&B and rock-and-roll with conjunto, Latin and country influences. The West Side Sound reflected a city where Chicano, Black and Anglo musicians worked in overlapping scenes rather than isolated genre boxes.",
    places: ["San Antonio", "West Side", "East Side"],
    links: [{ href: "/san-antonio-music-history", label: "San Antonio music history" }, { href: "/texas-rock-rockabilly", label: "Texas rock & rockabilly" }],
    sourceLabel: "Handbook of Texas — West Side Sound",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/west-side-sound",
  },
  {
    era: "1960s",
    title: "Texas-born rock voices reach national counterculture audiences",
    summary: "Artists with Texas roots—including Janis Joplin and musicians shaped by Gulf Coast, Dallas and Austin scenes—carried regional blues, country and roots influences into the rapidly changing national rock landscape.",
    places: ["Port Arthur", "Austin", "Dallas"],
    links: [{ href: "/texas-rock-rockabilly", label: "Texas rock & rockabilly" }, { href: "/texas-blues", label: "Texas blues" }],
    sourceLabel: "Handbook of Texas Music",
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music",
  },
  {
    era: "1970s",
    title: "Austin progressive country and blues reshape the city's identity",
    summary: "Progressive country brought traditional country musicians into contact with folk, rock and counterculture audiences, while Antone's made blues central to Austin's live-music story. Austin City Limits then broadcast that performance culture nationally.",
    places: ["Austin"],
    links: [{ href: "/austin-music-history", label: "Austin music history" }, { href: "/texas-country-outlaw", label: "Country & outlaw country" }, { href: "/antones-austin-history", label: "Antone's history" }],
    sourceLabel: "Handbook of Texas — Austin City Limits",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/austin-city-limits",
  },
  {
    era: "1980s–1990s",
    title: "Tejano grows into a modern Texas popular-music industry",
    summary: "Conjunto foundations, larger band arrangements, radio and a growing regional industry helped Tejano reach much wider audiences. Selena became the era's most visible star, but her career belonged to a much larger South Texas and San Antonio musical network.",
    places: ["San Antonio", "Corpus Christi", "Rio Grande Valley"],
    links: [{ href: "/texas-conjunto-tejano", label: "Conjunto & Tejano" }, { href: "/san-antonio-music-history", label: "San Antonio music history" }],
    sourceLabel: "Handbook of Texas Music",
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music",
  },
  {
    era: "Late 1980s–1990s",
    title: "Houston and Port Arthur build a distinct Texas hip-hop language",
    summary: "The Geto Boys, UGK, DJ Screw and related networks helped establish Texas rap as more than a regional copy of coastal styles. Independent labels, neighborhood crews and tape distribution supported distinctive production, pacing and lyrical geography.",
    places: ["Houston", "Port Arthur"],
    links: [{ href: "/texas-hip-hop", label: "Texas hip-hop" }, { href: "/houston-music-history", label: "Houston music history" }],
    sourceLabel: "Handbook of Texas — Rap and Hip-Hop",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/rap-and-hip-hop",
  },
  {
    era: "1990s–2000s",
    title: "Texas gospel, R&B and pop produce new national and global stars",
    summary: "Kirk Franklin brought Fort Worth gospel into mainstream popular culture, while Houston's Destiny's Child and Beyoncé emerged from a city with a much older gospel, R&B, studio and label infrastructure. Dallas also produced influential neo-soul voices such as Erykah Badu.",
    places: ["Fort Worth", "Houston", "Dallas"],
    links: [{ href: "/texas-gospel-rnb-pop", label: "Gospel, R&B & pop" }, { href: "/houston-music-history", label: "Houston music history" }, { href: "/dallas-fort-worth-music-history", label: "Dallas–Fort Worth music history" }],
    sourceLabel: "Handbook of Texas Music",
    sourceUrl: "https://www.tshaonline.org/handbook/projects/texas-music",
  },
  {
    era: "2000s–today",
    title: "Texas music becomes a network of overlapping global scenes",
    summary: "Country, regional Mexican music, hip-hop, gospel, pop, blues, jazz and roots traditions continue to overlap across Texas. Digital distribution changed how music travels, but cities, venues, festivals, churches, studios and local audiences still give Texas music its sense of place.",
    places: ["Statewide"],
    links: [{ href: "/texas-music", label: "Texas Music authority hub" }, { href: "/texas-music-cities", label: "Texas music cities" }, { href: "/texas-music-venues", label: "Texas music venues" }],
    sourceLabel: "Center for Texas Music History",
    sourceUrl: "https://www.txst.edu/ctmh/",
  },
] as const;

export const TEXAS_MUSIC_TIMELINE_SOURCES = Array.from(
  new Map(TEXAS_MUSIC_TIMELINE.map((entry) => [entry.sourceUrl, { label: entry.sourceLabel, url: entry.sourceUrl }])).values(),
);
