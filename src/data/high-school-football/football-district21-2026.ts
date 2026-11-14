import type { DistrictFootballGame } from './football-district-game-week';

// Editorial snapshot verified October 19, 2026. These are reported results,
// NOT a live feed, an official UIL tie-break table, or a prediction.
export const DISTRICT_21_SCHEDULE_URL = 'https://www.pigskinprep.com/showfreeschedules.asp?distID=282&yr=2026';
export const DISTRICT_21_STANDINGS_URL = 'https://www.maxpreps.com/tx/football/26-27/district/6a-region-iii-district-21/?leagueid=3daf50ec-b7b2-4bd1-a010-7588e5cc9310';
export const DISTRICT_21_FBISD_CALENDAR_URL = 'https://thebend.fortbendisd.gov/athletics-home/schedules';
export const DISTRICT_21_STRAKE_SCHEDULE_URL = 'https://www.strakejesuit.org/team-detail?Team=247354&fromId=238083';
export const DISTRICT_21_VERIFIED_AT = '2026-10-19';
export const DISTRICT_21_STANDINGS_AS_OF = '2026-10-14';

// Overall 2026 W-L is a MaxPreps published snapshot, not calculated from the
// following district-only games. Never show it without the snapshot date.
export const DISTRICT_21_OVERALL_OCT14: Readonly<Record<string, string>> = {
  'Fort Bend Austin': '1–6',
  'Fort Bend Bush': '1–6',
  'Fort Bend Clements': '3–4',
  'Fort Bend Elkins': '2–5',
  'Fort Bend Hightower': '5–2',
  'Fort Bend Ridge Point': '7–0',
  'Fort Bend Travis': '6–1',
  'Houston Strake Jesuit': '2–5',
};

const final = (date: string, away: string, home: string, awayScore: number, homeScore: number, resultSourceUrl = DISTRICT_21_SCHEDULE_URL): DistrictFootballGame => ({
  date, kickoff: '', away, home, status: 'final', awayScore, homeScore,
  sourceUrl: DISTRICT_21_SCHEDULE_URL, resultSourceUrl,
  sourceLabel: resultSourceUrl === DISTRICT_21_STRAKE_SCHEDULE_URL ? 'Strake Jesuit varsity reported final' : 'Pigskin Prep 2026 reported final',
  verifiedAt: DISTRICT_21_VERIFIED_AT,
});

const scheduled = (date: string, away: string, home: string, venue?: string, official = false): DistrictFootballGame => ({
  date, kickoff: '7:00 p.m. ' + (date < '2026-11-01' ? 'CDT' : 'CST'),
  away, home, ...(venue ? { venue } : {}), status: 'scheduled',
  sourceUrl: official ? (home === 'Houston Strake Jesuit' ? DISTRICT_21_STRAKE_SCHEDULE_URL : DISTRICT_21_FBISD_CALENDAR_URL) : DISTRICT_21_SCHEDULE_URL,
  sourceLabel: official ? 'Official 2026 host athletics calendar' : 'Pigskin Prep 2026 varsity schedule',
  verifiedAt: DISTRICT_21_VERIFIED_AT,
});

// Only 2026 District 21 league games. Opponents follow UIL member names and
// the dated 2026 Pigskin Prep district ledger, checked against the MaxPreps
// standings and official Fort Bend / Strake calendars where available.
// The teams had open dates October 15–17; no fictitious Week 8 scores.
// No scores are inferred from the fact that a scheduled kickoff has passed.
export const DISTRICT_21_2026_GAMES: readonly DistrictFootballGame[] = [
  final('2026-09-17', 'Fort Bend Hightower', 'Fort Bend Elkins', 40, 0),
  final('2026-09-17', 'Houston Strake Jesuit', 'Fort Bend Ridge Point', 6, 38, DISTRICT_21_STRAKE_SCHEDULE_URL),
  final('2026-09-18', 'Fort Bend Austin', 'Fort Bend Bush', 27, 34),
  final('2026-09-19', 'Fort Bend Clements', 'Fort Bend Travis', 34, 66),
  final('2026-09-25', 'Fort Bend Bush', 'Fort Bend Elkins', 6, 24),
  final('2026-09-25', 'Fort Bend Ridge Point', 'Fort Bend Clements', 40, 3),
  final('2026-09-25', 'Fort Bend Hightower', 'Houston Strake Jesuit', 40, 28, DISTRICT_21_STRAKE_SCHEDULE_URL),
  final('2026-09-26', 'Fort Bend Travis', 'Fort Bend Austin', 12, 7),
  final('2026-10-01', 'Fort Bend Hightower', 'Fort Bend Bush', 41, 6),
  final('2026-10-02', 'Fort Bend Austin', 'Fort Bend Ridge Point', 6, 41),
  final('2026-10-02', 'Fort Bend Elkins', 'Fort Bend Travis', 16, 17),
  final('2026-10-02', 'Fort Bend Clements', 'Houston Strake Jesuit', 14, 45, DISTRICT_21_STRAKE_SCHEDULE_URL),
  final('2026-10-08', 'Houston Strake Jesuit', 'Fort Bend Austin', 27, 7, DISTRICT_21_STRAKE_SCHEDULE_URL),
  final('2026-10-09', 'Fort Bend Travis', 'Fort Bend Bush', 35, 14),
  final('2026-10-09', 'Fort Bend Clements', 'Fort Bend Hightower', 3, 42),
  final('2026-10-10', 'Fort Bend Ridge Point', 'Fort Bend Elkins', 61, 7),
  scheduled('2026-10-22', 'Fort Bend Hightower', 'Fort Bend Travis', 'Mercer Stadium', true),
  scheduled('2026-10-23', 'Fort Bend Austin', 'Fort Bend Clements', 'Mercer Stadium', true),
  scheduled('2026-10-23', 'Fort Bend Bush', 'Fort Bend Ridge Point', 'Hall Stadium', true),
  scheduled('2026-10-23', 'Fort Bend Elkins', 'Houston Strake Jesuit', 'Clay Stadium', true),
  scheduled('2026-10-29', 'Fort Bend Clements', 'Fort Bend Elkins', 'Hall Stadium', true),
  scheduled('2026-10-29', 'Houston Strake Jesuit', 'Fort Bend Bush', 'Mercer Stadium', true),
  scheduled('2026-10-30', 'Fort Bend Ridge Point', 'Fort Bend Travis', 'Mercer Stadium', true),
  scheduled('2026-10-30', 'Fort Bend Austin', 'Fort Bend Hightower', 'Hall Stadium', true),
  scheduled('2026-11-05', 'Fort Bend Elkins', 'Fort Bend Austin'),
  scheduled('2026-11-06', 'Fort Bend Hightower', 'Fort Bend Ridge Point'),
  scheduled('2026-11-06', 'Fort Bend Travis', 'Houston Strake Jesuit', 'Clay Stadium', true),
  scheduled('2026-11-06', 'Fort Bend Bush', 'Fort Bend Clements'),
];
