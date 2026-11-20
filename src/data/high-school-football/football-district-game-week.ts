import { footballMatchups, footballMatchupPath } from './football-matchups';
import { DISTRICT_5_2026_GAMES } from './football-district5-2026';
import { DISTRICT_11_2026_GAMES } from './football-district11-2026';
import { DISTRICT_21_2026_GAMES } from './football-district21-2026';

export type DistrictFootballGame = {
  date: string;
  kickoff: string;
  away: string;
  home: string;
  venue?: string;
  status: 'scheduled' | 'final';
  awayScore?: number;
  homeScore?: number;
  sourceUrl: string;
  resultSourceUrl?: string;
  sourceLabel: string;
  verifiedAt: string;
  matchupPath?: string;
};

// The published Katy ISD varsity schedule is a dated document, not a live feed.
// A score is added ONLY with a separate, attributable final-score source.
export const KATY_2026_SCHEDULE_SOURCE = 'https://www.pigskinprep.com/archive/Schedulespdf/Katy%20Jordan.pdf';
const TNG_2026_RESULTS = 'https://www.texastng.com/districts/d22-6a';
const CHRONICLE_OCT_15 = 'https://www.houstonchronicle.com/sports/high-school/football/article/texas-high-school-football-scores-thursday-22479594.php';
const SEVEN_LAKES_OCT_15 = 'https://www.sevenlakesabc.com/sport/football/boys';

const scheduled = (date: string, kickoff: string, away: string, home: string, venue: string): DistrictFootballGame => ({
  date, kickoff, away, home, venue, status: 'scheduled',
  sourceUrl: KATY_2026_SCHEDULE_SOURCE, sourceLabel: '2026 Katy ISD varsity schedule (March 27 publication)',
  verifiedAt: '2026-10-16',
});

const final = (
  date: string, away: string, home: string, awayScore: number, homeScore: number,
  resultSourceUrl: string, sourceLabel: string,
): DistrictFootballGame => ({
  date, kickoff: '', away, home, status: 'final', awayScore, homeScore,
  sourceUrl: KATY_2026_SCHEDULE_SOURCE, resultSourceUrl, sourceLabel, verifiedAt: date >= '2026-10-22' ? '2026-11-20' : '2026-10-16',
});

// School names match the UIL district's display names; no records or rankings are inferred.
const KATY_2026_DISTRICT_GAMES: DistrictFootballGame[] = [
  final('2026-09-10', 'Katy', 'Katy Tompkins', 45, 21, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-10', 'Katy Taylor', 'Katy Mayde Creek', 35, 13, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-11', 'Katy Paetow', 'Katy Jordan', 7, 34, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-11', 'Katy Morton Ranch', 'Katy Cinco Ranch', 7, 49, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-17', 'Katy Seven Lakes', 'Katy Morton Ranch', 28, 43, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-18', 'Katy Jordan', 'Katy', 10, 56, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-18', 'Katy Tompkins', 'Katy Taylor', 29, 12, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-19', 'Katy Cinco Ranch', 'Katy Paetow', 28, 20, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-24', 'Katy Taylor', 'Katy Jordan', 6, 45, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-24', 'Katy Mayde Creek', 'Katy Tompkins', 20, 44, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-25', 'Katy', 'Katy Cinco Ranch', 30, 3, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-09-25', 'Katy Paetow', 'Katy Seven Lakes', 41, 10, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-01', 'Katy Morton Ranch', 'Katy Paetow', 16, 28, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-01', 'Katy Cinco Ranch', 'Katy Taylor', 13, 36, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-02', 'Katy Jordan', 'Katy Mayde Creek', 44, 8, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-02', 'Katy Seven Lakes', 'Katy', 0, 55, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-08', 'Katy', 'Katy Morton Ranch', 69, 6, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-09', 'Katy Mayde Creek', 'Katy Cinco Ranch', 34, 41, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-09', 'Katy Taylor', 'Katy Seven Lakes', 31, 17, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-10', 'Katy Tompkins', 'Katy Jordan', 52, 28, TNG_2026_RESULTS, 'Texas TNG reported final'),
  final('2026-10-15', 'Katy Paetow', 'Katy', 14, 56, CHRONICLE_OCT_15, 'Houston Chronicle reported final'),
  final('2026-10-15', 'Katy Seven Lakes', 'Katy Mayde Creek', 16, 25, SEVEN_LAKES_OCT_15, 'Seven Lakes athletics reported final'),
  final('2026-10-16', 'Katy Cinco Ranch', 'Katy Tompkins', 12, 49, 'https://www.maxpreps.com/news/uUt6e3uFg0yiXrZZdl2uXA/football-recap-tompkins-piles-up-the-points-against-cinco-ranch--how-to-watch.htm', 'MaxPreps reported final'),
  final('2026-10-16', 'Katy Morton Ranch', 'Katy Taylor', 19, 38, 'https://www.maxpreps.com/news/2azgVLQFJEO03tR8v8LZeg/football-recap-katy-taylor-beats-morton-ranch-for-their-third-straight-win--how-to-watch.htm', 'MaxPreps reported final'),
  final('2026-10-22', 'Katy Mayde Creek', 'Katy Morton Ranch', 40, 26, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F22%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-22', 'Katy Jordan', 'Katy Cinco Ranch', 28, 21, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F22%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-23', 'Katy Tompkins', 'Katy Seven Lakes', 56, 7, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F23%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-24', 'Katy Taylor', 'Katy Paetow', 29, 43, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F24%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-29', 'Katy Seven Lakes', 'Katy Jordan', 14, 76, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F29%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-29', 'Katy Morton Ranch', 'Katy Tompkins', 14, 45, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F29%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-30', 'Katy Paetow', 'Katy Mayde Creek', 34, 27, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F30%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-10-30', 'Katy', 'Katy Taylor', 66, 0, 'https://www.maxpreps.com/tx/football/scores/?date=10%2F30%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-11-05', 'Katy Cinco Ranch', 'Katy Seven Lakes', 62, 17, 'https://www.maxpreps.com/tx/football/scores/?date=11%2F05%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-11-05', 'Katy Tompkins', 'Katy Paetow', 35, 21, 'https://www.maxpreps.com/tx/football/scores/?date=11%2F05%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-11-06', 'Katy Jordan', 'Katy Morton Ranch', 37, 14, 'https://www.maxpreps.com/tx/football/scores/?date=11%2F06%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
  final('2026-11-06', 'Katy Mayde Creek', 'Katy', 14, 56, 'https://www.maxpreps.com/tx/football/scores/?date=11%2F06%2F2026', 'UIL partner MaxPreps date scoreboard; independent regional score confirmation'),
];

const gameKey = (game: Pick<DistrictFootballGame, 'date' | 'away' | 'home'>) =>
  [game.date, ...[game.away.toLowerCase(), game.home.toLowerCase()].sort()].join('|');

/**
 * Enrich any UIL district using the existing reviewed-matchup snapshot.
 * The Katy pilot also has a sourced schedule. If an authorized feed supplies
 * a more recently verified final, it replaces the scheduled Katy entry.
 */
export function getDistrictFootballGames(slug: string, classification: string, district: number): DistrictFootballGame[] {
  const known = new Map<string, DistrictFootballGame>();
  // In 1A–5A the same district number exists in both divisions; a missing or
  // mismatched division from an optional provider feed must not mix rivals.
  const division = slug.includes('-division-ii-') ? 2 : slug.includes('-division-i-') ? 1 : null;
  if (slug === '6a-district-22') {
    for (const game of KATY_2026_DISTRICT_GAMES) known.set(gameKey(game), game);
  }
  if (slug === '4a-division-i-district-11') {
    for (const game of DISTRICT_11_2026_GAMES) known.set(gameKey(game), game);
  }
  if (slug === '6a-district-5') {
    for (const game of DISTRICT_5_2026_GAMES) known.set(gameKey(game), game);
  }
  if (slug === '6a-district-21') {
    for (const game of DISTRICT_21_2026_GAMES) known.set(gameKey(game), game);
  }
  for (const game of footballMatchups) {
    if (game.classification !== classification || game.district !== district || game.phase !== 'regular' || game.districtGame !== true) continue;
    if (division !== null && game.division !== division) continue;
    const converted: DistrictFootballGame = {
      date: game.date, kickoff: game.kickoff,
      away: game.away.name, home: game.home.name, venue: game.venue,
      status: game.status, awayScore: game.awayScore, homeScore: game.homeScore,
      sourceUrl: game.sourceUrl, resultSourceUrl: game.resultSourceUrl,
      sourceLabel: game.sourceLabel, verifiedAt: game.verifiedAt,
      matchupPath: footballMatchupPath(game),
    };
    const key = gameKey(converted);
    const previous = known.get(key);
    if (!previous || (converted.status === 'final' && previous.status !== 'final')
      || (converted.status === previous.status && converted.verifiedAt >= previous.verifiedAt)) {
      known.set(key, converted);
    }
  }
  return [...known.values()].sort((a, b) => a.date.localeCompare(b.date) || a.away.localeCompare(b.away));
}

export type SourcedDistrictRecord = {
  schoolName: string;
  profilePath: string;
  won: number;
  lost: number;
  tied: number;
  pointsFor: number;
  pointsAgainst: number;
};

// Factual scores support a derived record; standings/tiebreaks/official seeds do not follow from it.
// Skip unknown teams, scheduled games and unverified scores.
export function getSourcedDistrictRecords(
  games: DistrictFootballGame[],
  schools: Array<{ schoolName: string; profilePath: string }>,
): SourcedDistrictRecord[] {
  const bySchool = new Map<string, SourcedDistrictRecord>(schools.map(({ schoolName, profilePath }) => [
    schoolName,
    { schoolName, profilePath, won: 0, lost: 0, tied: 0, pointsFor: 0, pointsAgainst: 0 },
  ]));
  for (const game of games) {
    if (game.status !== 'final' || !Number.isInteger(game.awayScore) || !Number.isInteger(game.homeScore)) continue;
    const away = bySchool.get(game.away);
    const home = bySchool.get(game.home);
    if (!away || !home || game.away === game.home) continue;
    away.pointsFor += game.awayScore!;
    away.pointsAgainst += game.homeScore!;
    home.pointsFor += game.homeScore!;
    home.pointsAgainst += game.awayScore!;
    if (game.awayScore! > game.homeScore!) {
      away.won += 1;
      home.lost += 1;
    } else if (game.homeScore! > game.awayScore!) {
      home.won += 1;
      away.lost += 1;
    } else {
      away.tied += 1;
      home.tied += 1;
    }
  }
  return [...bySchool.values()];
}

export type SourcedTeamDistrictRecord = SourcedDistrictRecord & {
  played: number;
  districtFinalsInSnapshot: number;
  lastReportedFinal: string;
};

/**
 * Team-level view of the same source-derived district record used by district hubs.
 * Returns null until at least one verified district final involving the school is
 * present. This is deliberately not a standings rank, seed or tiebreak result.
 */
export function getSourcedDistrictRecordForTeam(
  games: DistrictFootballGame[],
  schools: Array<{ schoolName: string; profilePath: string }>,
  schoolName: string,
): SourcedTeamDistrictRecord | null {
  const knownSchools = new Set(schools.map((school) => school.schoolName));
  if (!knownSchools.has(schoolName)) return null;

  const validFinals = games.filter((game) =>
    game.status === 'final'
    && Number.isInteger(game.awayScore)
    && Number.isInteger(game.homeScore)
    && knownSchools.has(game.away)
    && knownSchools.has(game.home)
    && game.away !== game.home
  );
  const teamFinals = validFinals.filter((game) => game.away === schoolName || game.home === schoolName);
  if (!teamFinals.length) return null;

  const record = getSourcedDistrictRecords(games, schools).find((row) => row.schoolName === schoolName);
  if (!record) return null;

  return {
    ...record,
    played: record.won + record.lost + record.tied,
    districtFinalsInSnapshot: validFinals.length,
    lastReportedFinal: teamFinals.map((game) => game.date).sort().at(-1) ?? '',
  };
}

