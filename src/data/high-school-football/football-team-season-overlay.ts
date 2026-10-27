import type { FootballMatchup } from './football-matchups';
import type { FootballProgramEditorial } from './program-editorial';

type Editorial = FootballProgramEditorial | null;
type Season = NonNullable<FootballProgramEditorial['season']>;
type SeasonGame = Season['games'][number];

function matchupResult(teamSlug: string, game: FootballMatchup) {
  if (game.status !== 'final' || !Number.isInteger(game.homeScore) || !Number.isInteger(game.awayScore)) return undefined;
  const isHome = game.home.slug === teamSlug;
  const forScore = isHome ? game.homeScore! : game.awayScore!;
  const againstScore = isHome ? game.awayScore! : game.homeScore!;
  return (forScore > againstScore ? 'W ' : forScore < againstScore ? 'L ' : 'T ') + forScore + '–' + againstScore;
}

function snapshotRow(teamSlug: string, game: FootballMatchup): SeasonGame {
  const isHome = game.home.slug === teamSlug;
  const opponent = isHome ? game.away : game.home;
  const result = matchupResult(teamSlug, game);
  return {
    date: game.date,
    opponent: opponent.name,
    site: isHome ? 'Home' : 'Away',
    kickoff: game.kickoff,
    matchupPath: '/texas-high-school-football-matchups/' + game.slug,
    ...(result ? { result } : {}),
  };
}

function recordFromListedFinals(games: SeasonGame[]) {
  const completed = games.filter((game) => /^[WLT] /.test(game.result ?? ''));
  const wins = completed.filter((game) => game.result?.startsWith('W ')).length;
  const losses = completed.filter((game) => game.result?.startsWith('L ')).length;
  const ties = completed.filter((game) => game.result?.startsWith('T ')).length;
  const districtGames = completed.filter((game) => game.district);
  const districtWins = districtGames.filter((game) => game.result?.startsWith('W ')).length;
  const districtLosses = districtGames.filter((game) => game.result?.startsWith('L ')).length;
  return { completed, wins, losses, ties, districtWins, districtLosses };
}

function latestByVerification(games: FootballMatchup[]) {
  return games.reduce((latest, game) =>
    game.verifiedAt > latest.verifiedAt ? game : latest
  );
}

export function applyFootballMatchupSnapshot(
  editorial: Editorial,
  teamSlug: string,
  matchups: readonly FootballMatchup[],
): Editorial {
  const relevant = matchups
    .filter((game) => game.home.slug === teamSlug || game.away.slug === teamSlug)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug));

  if (!relevant.length) return editorial;

  const latest = latestByVerification(relevant);
  const finals = relevant.filter((game) =>
    game.status === 'final' && Number.isInteger(game.homeScore) && Number.isInteger(game.awayScore)
  );
  const latestFinal = finals.length ? latestByVerification(finals) : null;

  if (!editorial?.season) {
    const games = relevant.map((game) => snapshotRow(teamSlug, game));
    const record = recordFromListedFinals(games);
    const recordText = record.completed.length
      ? `${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''} across ${record.completed.length} verified snapshot final${record.completed.length === 1 ? '' : 's'}`
      : 'No verified final in the current matchup snapshot';

    return {
      ...(editorial ?? { slug: teamSlug, overview: [], faq: [] }),
      season: {
        record: recordText,
        recordLabel: 'Verified snapshot record',
        verifiedAt: latest.verifiedAt,
        sourceUrl: latestFinal?.resultSourceUrl ?? latest.sourceUrl,
        sourceLabel: latestFinal?.sourceLabel ?? latest.sourceLabel,
        ...(latestFinal?.resultSourceUrl ? { latestResultSourceUrl: latestFinal.resultSourceUrl } : {}),
        games,
      },
    };
  }

  const snapshotByDate = new Map(relevant.map((game) => [game.date, game]));
  let recordChanged = false;
  let anyChanged = false;
  const existingDates = new Set(editorial.season.games.map((game) => game.date));

  const games = editorial.season.games.map((game) => {
    const match = snapshotByDate.get(game.date);
    if (!match) return game;

    const row = snapshotRow(teamSlug, match);
    if (game.result && row.result && game.result !== row.result) {
      // Preserve the authored final when sources disagree. A focused validator
      // should surface the conflict for editorial reconciliation rather than
      // silently rewriting a published score at request time.
      return game;
    }

    const next = {
      ...game,
      ...(game.kickoff ? {} : { kickoff: row.kickoff }),
      ...(game.matchupPath ? {} : { matchupPath: row.matchupPath }),
      ...(!game.result && row.result ? { result: row.result } : {}),
    };
    if (next.result !== game.result) recordChanged = true;
    if (next.kickoff !== game.kickoff || next.matchupPath !== game.matchupPath || next.result !== game.result) anyChanged = true;
    return next;
  });

  for (const match of relevant) {
    if (existingDates.has(match.date)) continue;
    const row = snapshotRow(teamSlug, match);
    games.push(row);
    anyChanged = true;
    if (row.result) recordChanged = true;
  }

  if (!anyChanged) return editorial;
  games.sort((a, b) => a.date.localeCompare(b.date) || a.opponent.localeCompare(b.opponent));

  const record = recordFromListedFinals(games);
  const recordText = recordChanged
    ? `${record.wins}–${record.losses}${record.ties ? `–${record.ties}` : ''} overall / ${record.districtWins}–${record.districtLosses} district (from listed finals)`
    : editorial.season.record;

  return {
    ...editorial,
    season: {
      ...editorial.season,
      games,
      record: recordText,
      ...(recordChanged ? { recordLabel: 'Record from listed finals' } : {}),
      verifiedAt: latest.verifiedAt > editorial.season.verifiedAt ? latest.verifiedAt : editorial.season.verifiedAt,
      ...(recordChanged && latestFinal?.resultSourceUrl ? { latestResultSourceUrl: latestFinal.resultSourceUrl } : {}),
    },
  };
}
