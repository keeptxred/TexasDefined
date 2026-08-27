export type TexasMusicHistoricPlace = {
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
};

export const TEXAS_MUSIC_HISTORIC_PLACES: readonly TexasMusicHistoricPlace[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    name: "Longhorn Ballroom",
    place: "Dallas",
    era: "1950 onward",
    status: "Historic ballroom",
    summary:
      "Built as Bob Wills's Ranch House and later renamed the Longhorn Ballroom, the large Dallas room became a major country-and-western circuit stop with a history that crossed genres and generations.",
    significance:
      "The Longhorn connects Western swing directly to Dallas venue history while showing how a room can outlive its founding musical identity. Country stars, changing ownership, later Tejano programming and other scenes all accumulated in the same complex. That layered history makes it a useful counterpart to Fort Worth's dance-hall and honky-tonk tradition.",
    relatedHref: "/dallas-fort-worth-music-history",
    relatedLabel: "Dallas–Fort Worth music history",
    sourceUrl: "https://www.tshaonline.org/handbook/entries/longhorn-ballroom",
    sourceLabel: "Handbook of Texas — Longhorn Ballroom",
  },
] as const;
