import snapshot from './football-matchups.snapshot.json';

export type FootballTeam = {
  name: string;
  mascot?: string;
  slug: string;
  recordAtKickoff?: string;
};

export type FootballMatchup = {
  slug: string;
  date: string;
  kickoff: string;
  classification: string;
  division?: 1 | 2;
  district?: number;
  districtGame?: boolean;
  home: FootballTeam;
  away: FootballTeam;
  status: 'scheduled' | 'final';
  homeScore?: number;
  awayScore?: number;
  venue?: string;
  venueSourceUrl?: string;
  sourceUrl: string;
  resultSourceUrl?: string;
  sourceLabel: string;
  verifiedAt: string;
  phase: 'regular' | 'playoff';
  round?: 'bi-district' | 'area' | 'regional' | 'quarterfinal' | 'semifinal' | 'final';
};

// Treat a still-unsourced scheduled result as unconfirmed after its listed
// game date has clearly passed. Wait 48 hours from UTC start of the game day:
// this avoids incorrectly calling a Texas Friday-evening kickoff past merely
// because UTC already rolled to Saturday. Never infer completion or a final.
export function footballMatchupIsPastUnconfirmed(
  game: Pick<FootballMatchup, 'date' | 'status'>,
  nowMillis: number = Date.now(),
): boolean {
  if (game.status === 'final') return false;
  const startOfDateUtc = Date.parse(game.date + 'T00:00:00Z');
  return Number.isFinite(startOfDateUtc) &&
    nowMillis >= startOfDateUtc + 48 * 60 * 60 * 1000;
}

// This small, curated snapshot is not a live scoreboard. Never manufacture a score
// from kickoff dates or advance a winner without a verified final.
export const footballSnapshotUpdatedAt = snapshot.updatedAt;
export const footballMatchups = (snapshot.games as FootballMatchup[]).slice().sort(
  (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
);

export function getFootballMatchup(slug: string) {
  return footballMatchups.find((game) => game.slug === slug) ?? null;
}

export function footballTeamPath(team: FootballTeam) {
  return '/texas-high-school-football-teams/' + team.slug;
}

export function footballMatchupPath(game: FootballMatchup) {
  return '/texas-high-school-football-matchups/' + game.slug;
}

export function getFootballBracketGames(classification: string, division: 1 | 2) {
  return footballMatchups.filter((game) =>
    game.phase === 'playoff' && game.classification === classification && game.division === division
  ).sort((a,b) => a.date.localeCompare(b.date));
}

export const FOOTBALL_BRACKET_SOURCE = 'https://www.uiltexas.org/football/playoff-brackets';

export function officialFootballBracketUrl(classification: string, division: 1 | 2) {
  return FOOTBALL_BRACKET_SOURCE + '/' + classification + 'D' + division;
}
