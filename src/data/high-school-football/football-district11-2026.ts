import type { DistrictFootballGame } from './football-district-game-week';

/**
 * 2026 UIL 4A Division I Region III District 11 — source-checked Oct 29, 2026.
 * MaxPreps is UIL's partner; these are dated source snapshots, NOT certified
 * district standings and NOT a live scoreboard. Every row was compared against
 * the 2026 varsity school schedule, and opponent names use the UIL roster.
 * 15 finals + 6 unplayed fixtures = 21 unique pairings across 7 schools.
 */
export const DISTRICT_11_VERIFIED_AT = '2026-10-29';
export const DISTRICT_11_STANDINGS_URL = 'https://www.maxpreps.com/tx/football/26-27/district/4a-1-region-iii-district-11/?leagueid=e544a32d-42ab-43c2-befa-ee65e25baf62';
export const DISTRICT_11_2026_SOURCES = {
  "Bay City": "https://www.maxpreps.com/tx/bay-city/bay-city-blackcats/football/schedule/",
  "El Campo": "https://www.maxpreps.com/tx/el-campo/el-campo-ricebirds/football/schedule/",
  "Navasota": "https://www.maxpreps.com/tx/navasota/navasota-rattlers/football/schedule/",
  "Needville": "https://www.maxpreps.com/tx/needville/needville-bluejays/football/schedule/",
  "Royal": "https://www.maxpreps.com/tx/brookshire/royal-falcons/football/schedule/",
  "Sealy": "https://www.maxpreps.com/tx/sealy/sealy-tigers/football/schedule/",
  "West Columbia Columbia": "https://www.maxpreps.com/tx/west-columbia/columbia-roughnecks/football/schedule/"
} as const;

const sourceFor = (home: string) => DISTRICT_11_2026_SOURCES[home as keyof typeof DISTRICT_11_2026_SOURCES];
const reportedFinal = (date: string, away: string, home: string, awayScore: number, homeScore: number): DistrictFootballGame => ({
  date, away, home, awayScore, homeScore, kickoff: '7:00 p.m. CDT', status: 'final',
  sourceUrl: sourceFor(home), resultSourceUrl: sourceFor(home),
  sourceLabel: 'MaxPreps / UIL partner team results', verifiedAt: DISTRICT_11_VERIFIED_AT,
});
const upcoming = (date: string, away: string, home: string): DistrictFootballGame => ({
  date, away, home, kickoff: date.startsWith('2026-11') ? '7:00 p.m. CST' : '7:00 p.m. CDT', status: 'scheduled',
  sourceUrl: sourceFor(home), sourceLabel: 'MaxPreps / UIL partner published schedule',
  verifiedAt: DISTRICT_11_VERIFIED_AT,
});

export const DISTRICT_11_2026_GAMES: DistrictFootballGame[] = [
  reportedFinal('2026-09-25', "Royal", "Bay City", 7, 49),
  reportedFinal('2026-09-25', "Sealy", "Needville", 32, 14),
  reportedFinal('2026-09-25', "Navasota", "West Columbia Columbia", 46, 27),
  reportedFinal('2026-10-02', "Bay City", "Navasota", 28, 21),
  reportedFinal('2026-10-02', "West Columbia Columbia", "Sealy", 7, 35),
  reportedFinal('2026-10-02', "Needville", "El Campo", 27, 35),
  reportedFinal('2026-10-09', "Sealy", "Bay City", 7, 34),
  reportedFinal('2026-10-09', "Navasota", "Royal", 21, 13),
  reportedFinal('2026-10-09', "El Campo", "West Columbia Columbia", 41, 14),
  reportedFinal('2026-10-16', "Bay City", "El Campo", 29, 19),
  reportedFinal('2026-10-16', "Royal", "Sealy", 0, 42),
  reportedFinal('2026-10-16', "West Columbia Columbia", "Needville", 0, 56),
  reportedFinal('2026-10-23', "Needville", "Bay City", 7, 45),
  reportedFinal('2026-10-23', "Sealy", "Navasota", 48, 7),
  reportedFinal('2026-10-23', "El Campo", "Royal", 49, 14),
  upcoming('2026-10-30', "Bay City", "West Columbia Columbia"),
  upcoming('2026-10-30', "Navasota", "El Campo"),
  upcoming('2026-10-30', "Royal", "Needville"),
  upcoming('2026-11-06', "El Campo", "Sealy"),
  upcoming('2026-11-06', "Needville", "Navasota"),
  upcoming('2026-11-06', "West Columbia Columbia", "Royal"),
];

// The data is deliberately reviewed and non-live; refresh workflows must not
// convert scheduled contests to finals without source-backed confirmation.

export const DISTRICT_11_2026_EXPECTED_RECORDS = {
  "Bay City": "5-0",
  "Sealy": "4-1",
  "El Campo": "3-1",
  "Navasota": "2-2",
  "Needville": "1-3",
  "Royal": "0-4",
  "West Columbia Columbia": "0-4"
} as const;

export const DISTRICT_11_SCHEDULE_SOURCE = 'https://www.pigskinprep.com/showfreeschedules.asp?distID=305&yr=2026';

export const DISTRICT_11_PLAYOFF_SOURCE = 'https://www.uiltexas.org/football/playoff-brackets/4AD1';

