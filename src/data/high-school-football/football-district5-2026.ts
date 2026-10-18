import type { DistrictFootballGame } from './football-district-game-week';

// Reviewed source snapshot, NOT a live feed. District fixtures and pre-Oct 16 finals
// come from Pigskin Prep; Oct 16 finals cross-checked with the UIL's MaxPreps partner.
// Lewisville Flower Mound, Lewisville Hebron and Lewisville Marcus use the UIL page names.
export const DISTRICT_5_SCHEDULE_URL = 'https://pigskinprep.com/showfreeschedules.asp?distID=266&yr=2026';
export const DISTRICT_5_STANDINGS_URL = 'https://www.maxpreps.com/tx/football/26-27/district/6a-region-i-district-5/?leagueid=20c93622-4d8b-48f7-8dc8-a3983405b170';
const VERIFIED_AT = '2026-10-17';

const final = (
  date: string, away: string, home: string, awayScore: number, homeScore: number,
  resultSourceUrl = DISTRICT_5_SCHEDULE_URL, sourceLabel = 'Pigskin Prep reported final',
): DistrictFootballGame => ({
  date, kickoff: '', away, home, status: 'final', awayScore, homeScore,
  sourceUrl: DISTRICT_5_SCHEDULE_URL, resultSourceUrl, sourceLabel, verifiedAt: VERIFIED_AT,
});

const scheduled = (
  date: string, away: string, home: string,
): DistrictFootballGame => ({
  date, kickoff: '7:00 p.m. CDT/CST', away, home, status: 'scheduled',
  sourceUrl: DISTRICT_5_SCHEDULE_URL,
  sourceLabel: 'Pigskin Prep 2026 district schedule',
  verifiedAt: VERIFIED_AT,
});

// Every result below is an actual 2026 6A District 5 league contest,
// not a non-district game or an assumption based on school affiliation.
export const DISTRICT_5_2026_GAMES: readonly DistrictFootballGame[] = [
  final('2026-09-24', 'Frisco Wakeland', 'Denton Guyer', 7, 35),
  final('2026-09-25', 'Denton Braswell', 'Lewisville Flower Mound', 37, 23),
  final('2026-09-25', 'Little Elm', 'Lewisville Hebron', 21, 24),
  final('2026-09-25', 'Lewisville Marcus', 'Lewisville', 7, 40),
  final('2026-10-02', 'Denton Guyer', 'Denton Braswell', 51, 7),
  final('2026-10-02', 'Lewisville Flower Mound', 'Little Elm', 14, 12),
  final('2026-10-02', 'Lewisville Hebron', 'Lewisville Marcus', 56, 28),
  final('2026-10-02', 'Lewisville', 'Frisco Wakeland', 38, 8),
  final('2026-10-09', 'Little Elm', 'Denton Braswell', 42, 48),
  final('2026-10-09', 'Lewisville Marcus', 'Lewisville Flower Mound', 0, 49),
  final('2026-10-09', 'Frisco Wakeland', 'Lewisville Hebron', 10, 38),
  final('2026-10-09', 'Denton Guyer', 'Lewisville', 7, 42),
  final('2026-10-16', 'Lewisville Hebron', 'Lewisville', 3, 37, DISTRICT_5_STANDINGS_URL, 'MaxPreps reported final'),
  final('2026-10-16', 'Denton Braswell', 'Lewisville Marcus', 38, 14, DISTRICT_5_STANDINGS_URL, 'MaxPreps reported final'),
  final('2026-10-16', 'Lewisville Flower Mound', 'Frisco Wakeland', 48, 21, DISTRICT_5_STANDINGS_URL, 'MaxPreps reported final'),
  final('2026-10-16', 'Little Elm', 'Denton Guyer', 0, 41, DISTRICT_5_STANDINGS_URL, 'MaxPreps reported final'),
  scheduled('2026-10-23', 'Frisco Wakeland', 'Denton Braswell'),
  scheduled('2026-10-23', 'Denton Guyer', 'Lewisville Hebron'),
  scheduled('2026-10-23', 'Lewisville', 'Lewisville Flower Mound'),
  scheduled('2026-10-23', 'Lewisville Marcus', 'Little Elm'),
  scheduled('2026-10-30', 'Denton Braswell', 'Lewisville'),
  scheduled('2026-10-30', 'Lewisville Flower Mound', 'Lewisville Hebron'),
  scheduled('2026-10-30', 'Lewisville Marcus', 'Denton Guyer'),
  scheduled('2026-10-30', 'Little Elm', 'Frisco Wakeland'),
  scheduled('2026-11-05', 'Lewisville Hebron', 'Denton Braswell'),
  scheduled('2026-11-05', 'Denton Guyer', 'Lewisville Flower Mound'),
  scheduled('2026-11-05', 'Frisco Wakeland', 'Lewisville Marcus'),
  scheduled('2026-11-05', 'Lewisville', 'Little Elm'),
];
