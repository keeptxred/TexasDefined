import { footballMatchups, footballMatchupPath } from './football-matchups';
import { DISTRICT_5_2026_GAMES } from './football-district5-2026';

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
  sourceUrl: KATY_2026_SCHEDULE_SOURCE, resultSourceUrl, sourceLabel, verifiedAt: '2026-10-16',
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
  scheduled('2026-10-22', '6:30 p.m. CDT', 'Katy Mayde Creek', 'Katy Morton Ranch', 'Legacy Stadium'),
  scheduled('2026-10-22', '7:00 p.m. CDT', 'Katy Jordan', 'Katy Cinco Ranch', 'Rhodes Stadium'),
  scheduled('2026-10-23', '6:30 p.m. CDT', 'Katy Tompkins', 'Katy Seven Lakes', 'Legacy Stadium'),
  scheduled('2026-10-24', '6:30 p.m. CDT', 'Katy Taylor', 'Katy Paetow', 'Legacy Stadium'),
  scheduled('2026-10-29', '7:00 p.m. CDT', 'Katy Seven Lakes', 'Katy Jordan', 'Rhodes Stadium'),
  scheduled('2026-10-29', '6:30 p.m. CDT', 'Katy Morton Ranch', 'Katy Tompkins', 'Legacy Stadium'),
  scheduled('2026-10-30', '7:00 p.m. CDT', 'Katy Paetow', 'Katy Mayde Creek', 'Rhodes Stadium'),
  scheduled('2026-10-30', '6:30 p.m. CDT', 'Katy', 'Katy Taylor', 'Legacy Stadium'),
  scheduled('2026-11-05', '7:00 p.m. CST', 'Katy Cinco Ranch', 'Katy Seven Lakes', 'Rhodes Stadium'),
  scheduled('2026-11-05', '6:30 p.m. CST', 'Katy Tompkins', 'Katy Paetow', 'Legacy Stadium'),
  scheduled('2026-11-06', '7:00 p.m. CST', 'Katy Jordan', 'Katy Morton Ranch', 'Rhodes Stadium'),
  scheduled('2026-11-06', '6:30 p.m. CST', 'Katy Mayde Creek', 'Katy', 'Legacy Stadium'),
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
  if (slug === '6a-district-22') {
    for (const game of KATY_2026_DISTRICT_GAMES) known.set(gameKey(game), game);
  }
  if (slug === '6a-district-5') {
    for (const game of DISTRICT_5_2026_GAMES) known.set(gameKey(game), game);
  }
  for (const game of footballMatchups) {
    if (game.classification !== classification || game.district !== district || game.phase !== 'regular') continue;
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
};

// Factual scores support a derived record; standings/tiebreaks/official seeds do not follow from it.
// Skip unknown teams, scheduled games and unverified scores.
export function getSourcedDistrictRecords(
  games: DistrictFootballGame[],
  schools: Array<{ schoolName: string; profilePath: string }>,
): SourcedDistrictRecord[] {
  const bySchool = new Map<string, SourcedDistrictRecord>(schools.map(({ schoolName, profilePath }) => [
    schoolName,
    { schoolName, profilePath, won: 0, lost: 0, tied: 0 },
  ]));
  for (const game of games) {
    if (game.status !== 'final' || !Number.isInteger(game.awayScore) || !Number.isInteger(game.homeScore)) continue;
    const away = bySchool.get(game.away);
    const home = bySchool.get(game.home);
    if (!away || !home || game.away === game.home) continue;
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
