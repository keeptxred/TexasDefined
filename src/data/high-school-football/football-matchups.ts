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
