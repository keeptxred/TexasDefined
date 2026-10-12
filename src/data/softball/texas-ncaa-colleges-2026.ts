/** Research-only draft — NOT APPROVED FOR PUBLICATION.
 * Current 2026–27 United Athletic Conference names updated from school-owned July 2026 announcements; other rows require individual contemporary verification before release.
 * A source page for one season does not automatically verify a 2027 coaching staff, new-season affiliation, or program sponsorship.
 * A source-attributed *curated* sample, not a complete census of NCAA Texas softball.
 * DII Lone Star and DIII ASC memberships are from 2026 conference standings.
 * 2026 school team URLs and the 2026 Southland standings support DI rows.
 */
export type CollegeSoftballProgram = {
  id: string; name: string; city: string; division: 'I'|'II'|'III'; teamUrl: string;
  conference: string; sourceUrl: string;
};
export const COLLEGE_SOFTBALL_REVIEWED_DATE = '2026-10-12';
export const COLLEGE_SOFTBALL_SOURCE_YEAR = '2026';
export const TEXAS_COLLEGE_SOFTBALL_PROGRAMS: readonly CollegeSoftballProgram[] = [
  { id: "texas", name: "Texas Longhorns", city: "Austin", division: "I", teamUrl: "https://texaslonghorns.com/sports/softball", conference: "Southeastern Conference", sourceUrl: "https://texaslonghorns.com/sports/softball" },
  { id: "texas-am", name: "Texas A&M Aggies", city: "College Station", division: "I", teamUrl: "https://12thman.com/sports/softball", conference: "Southeastern Conference", sourceUrl: "https://12thman.com/sports/softball" },
  { id: "texas-tech", name: "Texas Tech Red Raiders", city: "Lubbock", division: "I", teamUrl: "https://texastech.com/sports/softball", conference: "Big 12 Conference", sourceUrl: "https://texastech.com/sports/softball" },
  { id: "baylor", name: "Baylor Bears", city: "Waco", division: "I", teamUrl: "https://baylorbears.com/sports/softball", conference: "Big 12 Conference", sourceUrl: "https://baylorbears.com/sports/softball" },
  { id: "houston", name: "Houston Cougars", city: "Houston", division: "I", teamUrl: "https://uhcougars.com/sports/softball", conference: "Big 12 Conference", sourceUrl: "https://uhcougars.com/sports/softball" },
  { id: "texas-state", name: "Texas State Bobcats", city: "San Marcos", division: "I", teamUrl: "https://txst.com/sports/softball", conference: "Sun Belt Conference", sourceUrl: "https://txst.com/sports/softball" },
  { id: "north-texas", name: "North Texas Mean Green", city: "Denton", division: "I", teamUrl: "https://meangreensports.com/sports/softball", conference: "American Conference", sourceUrl: "https://meangreensports.com/sports/softball" },
  { id: "utsa", name: "UTSA Roadrunners", city: "San Antonio", division: "I", teamUrl: "https://goutsa.com/sports/softball", conference: "American Conference", sourceUrl: "https://goutsa.com/sports/softball" },
  { id: "sam-houston", name: "Sam Houston Bearkats", city: "Huntsville", division: "I", teamUrl: "https://gobearkats.com/sports/softball", conference: "Conference USA", sourceUrl: "https://gobearkats.com/sports/softball" },
  { id: "ut-arlington", name: "UT Arlington Mavericks", city: "Arlington", division: "I", teamUrl: "https://utamavs.com/sports/softball", conference: "United Athletic Conference", sourceUrl: "https://utamavs.com/news/2025/6/26/general-ut-arlington-will-be-the-flagship-of-newly-created-united-athletic-conference.aspx" },
  { id: "stephen-f-austin", name: "Stephen F. Austin Ladyjacks", city: "Nacogdoches", division: "I", teamUrl: "https://sfajacks.com/sports/softball", conference: "Southland Conference", sourceUrl: "https://www.southland.org/standings.aspx?path=softball" },
  { id: "tarleton", name: "Tarleton State Texans", city: "Stephenville", division: "I", teamUrl: "https://tarletonsports.com/sports/softball", conference: "United Athletic Conference", sourceUrl: "https://tarletonsports.com/news/2026/7/1/general-tarleton-state-officially-begins-full-time-united-athletic-conference-membership.aspx" },
  { id: "lamar", name: "Lamar Cardinals", city: "Beaumont", division: "I", teamUrl: "https://lamarcardinals.com/sports/softball", conference: "Southland Conference", sourceUrl: "https://www.southland.org/standings.aspx?path=softball" },
  { id: "am-corpus-christi", name: "Texas A&M–Corpus Christi Islanders", city: "Corpus Christi", division: "I", teamUrl: "https://goislanders.com/sports/softball", conference: "Southland Conference", sourceUrl: "https://www.southland.org/standings.aspx?path=softball" },
  { id: "texas-southern", name: "Texas Southern Tigers", city: "Houston", division: "I", teamUrl: "https://tsusports.com/sports/softball", conference: "Southwestern Athletic Conference", sourceUrl: "https://tsusports.com/sports/softball" },
  { id: "prairie-view", name: "Prairie View A&M Panthers", city: "Prairie View", division: "I", teamUrl: "https://pvpanthers.com/sports/softball", conference: "Southwestern Athletic Conference", sourceUrl: "https://pvpanthers.com/sports/softball" },
  { id: "uiw", name: "Incarnate Word Cardinals", city: "San Antonio", division: "I", teamUrl: "https://uiwcardinals.com/sports/softball", conference: "Southland Conference", sourceUrl: "https://www.southland.org/standings.aspx?path=softball" },
  { id: "hcu", name: "Houston Christian Huskies", city: "Houston", division: "I", teamUrl: "https://hcuhuskies.com/sports/softball", conference: "Southland Conference", sourceUrl: "https://www.southland.org/standings.aspx?path=softball" },
  { id: "east-texas-am", name: "East Texas A&M Lions", city: "Commerce", division: "I", teamUrl: "https://lionathletics.com/sports/softball", conference: "Southland Conference", sourceUrl: "https://www.southland.org/standings.aspx?path=softball" },
  { id: "abilene-christian", name: "Abilene Christian Wildcats", city: "Abilene", division: "I", teamUrl: "https://acusports.com/sports/softball", conference: "United Athletic Conference", sourceUrl: "https://acusports.com/news/2026/7/1/baseball-acu-welcomes-new-members-in-officially-rebranded-uac" },
  { id: "utep", name: "UTEP Miners", city: "El Paso", division: "I", teamUrl: "https://utepminers.com/sports/softball", conference: "Mountain West Conference", sourceUrl: "https://utepminers.com/sports/softball/schedule/2026" },
  { id: "west-texas-am", name: "West Texas A&M Lady Buffs", city: "Canyon", division: "II", teamUrl: "https://gobuffsgo.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "ut-tyler", name: "UT Tyler Patriots", city: "Tyler", division: "II", teamUrl: "https://uttylerpatriots.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "angelo-state", name: "Angelo State Rambelles", city: "San Angelo", division: "II", teamUrl: "https://angelosports.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "am-kingsville", name: "Texas A&M–Kingsville Javelinas", city: "Kingsville", division: "II", teamUrl: "https://javelinaathletics.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "lubbock-christian", name: "Lubbock Christian Lady Chaps", city: "Lubbock", division: "II", teamUrl: "https://lcuchaps.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "st-marys", name: "St. Mary's Rattlers", city: "San Antonio", division: "II", teamUrl: "https://rattlerathletics.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "texas-womans", name: "Texas Woman's Pioneers", city: "Denton", division: "II", teamUrl: "https://twuathletics.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "ut-dallas", name: "UT Dallas Comets", city: "Richardson", division: "II", teamUrl: "https://utdcomets.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "st-edwards", name: "St. Edward's Hilltoppers", city: "Austin", division: "II", teamUrl: "https://gohilltoppers.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "ut-permian-basin", name: "UT Permian Basin Falcons", city: "Odessa", division: "II", teamUrl: "https://utpbfalcons.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "am-international", name: "Texas A&M International Dustdevils", city: "Laredo", division: "II", teamUrl: "https://godustdevils.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "midwestern-state", name: "Midwestern State Mustangs", city: "Wichita Falls", division: "II", teamUrl: "https://msumustangs.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "sul-ross", name: "Sul Ross State Lobos", city: "Alpine", division: "II", teamUrl: "https://srlobos.com/sports/softball", conference: "Lone Star Conference", sourceUrl: "https://lonestarconference.org/standings.aspx?path=softball" },
  { id: "east-texas-baptist", name: "East Texas Baptist Tigers", city: "Marshall", division: "III", teamUrl: "https://goetbutigers.com/sports/softball", conference: "American Southwest Conference", sourceUrl: "https://ascsports.org/standings.aspx?path=softball" },
  { id: "hardin-simmons", name: "Hardin–Simmons Cowgirls", city: "Abilene", division: "III", teamUrl: "https://hsuathletics.com/sports/softball", conference: "American Southwest Conference", sourceUrl: "https://ascsports.org/standings.aspx?path=softball" },
  { id: "mary-hardin-baylor", name: "Mary Hardin–Baylor Cru", city: "Belton", division: "III", teamUrl: "https://cruathletics.com/sports/softball", conference: "American Southwest Conference", sourceUrl: "https://ascsports.org/standings.aspx?path=softball" },
  { id: "howard-payne", name: "Howard Payne Yellow Jackets", city: "Brownwood", division: "III", teamUrl: "https://hpusports.com/sports/softball", conference: "American Southwest Conference", sourceUrl: "https://ascsports.org/standings.aspx?path=softball" },
] as const;
