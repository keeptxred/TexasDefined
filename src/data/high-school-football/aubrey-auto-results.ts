import snapshot from './aubrey-auto-results.snapshot.json';
import postseason from './aubrey-postseason-fixtures.snapshot.json';
import { getFootballProgramEditorial } from './program-editorial';

type Editorial = ReturnType<typeof getFootballProgramEditorial>;
type Result = {
  date: string;
  opponent: string;
  aubreyScore: number;
  opponentScore: number;
  district: boolean;
  primarySourceUrl: string;
  secondarySourceUrl: string;
  verifiedAt: string;
};

function dateLabel(date: string) {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    timeZone: 'UTC', month: 'short', day: 'numeric',
  });
}

function gameResult(score: Result) {
  if (score.aubreyScore === score.opponentScore) throw new Error('Aubrey: a tied football score cannot be published as final');
  return (score.aubreyScore > score.opponentScore ? 'W ' : 'L ')
    + score.aubreyScore + '–' + score.opponentScore;
}

/**
 * Immutable editorial program data stays as the baseline. Only match-locked,
 * corroborated final results from the separate generated snapshot may override
 * previously unscored games. No runtime source scraping, network or AI guesses.
 */
export function applyAubreyAutoResults(editorial: Editorial): Editorial {
  if (!editorial?.season || snapshot.verifiedResults.length === 0) return editorial;
  const updates = snapshot.verifiedResults as Result[];
  const byDate = new Map(updates.map((result) => [result.date, result]));
  if (byDate.size !== updates.length || snapshot.teamSlug !== 'aubrey' || snapshot.season !== '2026') {
    throw new Error('Invalid Aubrey auto-results snapshot identity');
  }
  if (postseason.season !== '2026' || postseason.teamSlug !== 'aubrey' || postseason.games.length > 6) {
    throw new Error('Invalid Aubrey verified postseason fixture registry');
  }
  const playoffGames = postseason.games.map((game) => ({
    date: game.date,
    opponent: game.opponent,
    site: 'Neutral' as const,
    district: false,
    kickoff: game.kickoff,
  }));
  const previous = [...editorial.season.games, ...playoffGames].sort((a, b) => a.date.localeCompare(b.date));
  if (new Set(previous.map((game) => game.date)).size !== previous.length) {
    throw new Error('Duplicate Aubrey fixture dates across regular and postseason snapshots');
  }
  const games = previous.map((game) => {
    const update = byDate.get(game.date);
    if (!update) return game;
    if (update.opponent !== game.opponent || update.district !== Boolean(game.district)) {
      throw new Error('Aubrey result opponent/district mismatch on ' + game.date);
    }
    const computed = gameResult(update);
    if (game.result && game.result !== computed) {
      throw new Error('Conflicting historical Aubrey final on ' + game.date);
    }
    return { ...game, result: computed };
  });
  if (updates.some((row) => !previous.some((game) => game.date === row.date))) {
    throw new Error('Aubrey result references an unlisted fixture');
  }
  const completed = games.filter((game) => game.result);
  const wins = completed.filter((game) => game.result?.startsWith('W ')).length;
  const losses = completed.filter((game) => game.result?.startsWith('L ')).length;
  const districtWins = completed.filter((game) => game.district && game.result?.startsWith('W ')).length;
  const districtLosses = completed.filter((game) => game.district && game.result?.startsWith('L ')).length;
  const latest = completed.at(-1);
  const currentResult = latest && byDate.get(latest.date);
  const endDate = latest?.date ?? '';
  const record = wins + '–' + losses + ' overall · ' + districtWins + '–' + districtLosses + ' district (through ' + dateLabel(endDate) + ')';
  const finalText = latest?.result ?? 'No verified final';
  const recordDescription = 'Aubrey Chaparrals football (2026): ' + wins + '–' + losses + ' overall, ' + districtWins + '–' + districtLosses + ' district through ' + dateLabel(endDate) + '. Latest verified final ' + finalText + ' against ' + latest?.opponent + '. View schedules, tickets and stadium rules.';
  const nextFixture = games.find((game) => !game.result);
  const lastReport = latest ? `${latest.result} versus ${latest.opponent} on ${dateLabel(latest.date)}` : 'No verified finals';
  const nextReport = nextFixture
    ? ` The next listed matchup is ${nextFixture.opponent} on ${dateLabel(nextFixture.date)}; confirm kickoff and venue with the host.`
    : '';
  const updatedOverview = `Aubrey Chaparrals are ${wins}–${losses} overall and ${districtWins}–${districtLosses} in UIL District 4 through ${dateLabel(endDate)}, including ${lastReport}.${nextReport} Results are dated, source-linked reports and not a live score feed.`;
  const existingFaq = editorial.faq ?? [];
  const regularSeason = games.filter((game) => !playoffGames.some((playoff) => playoff.date === game.date));
  const lateRegularSeason = regularSeason.slice(-3);
  const lateResults = lateRegularSeason.map((game) => `${dateLabel(game.date)}: ${game.opponent} — ${game.result ?? 'result awaiting verification'}`).join('; ');
  const faq = existingFaq.map((entry) => {
    if (/(?:2026.*record|record.*2026)/i.test(entry.question)) {
      return { ...entry, answer: "Aubrey's verified 2026 record is " + record + '. Check the dated score table and linked results for changes.' };
    }
    if (entry.question === 'What games are on Aubrey’s late-2026 regular-season schedule?') {
      return { ...entry, question: 'How did Aubrey finish its 2026 regular-season schedule?', answer: lateResults + '. See the full dated results table for the complete season and source links.' };
    }
    return entry;
  });
  return {
    ...editorial,
    overview: editorial.overview?.length ? [updatedOverview, ...editorial.overview.slice(1)] : editorial.overview,
    season: {
      ...editorial.season, games, record,
      verifiedAt: currentResult?.verifiedAt ?? editorial.season.verifiedAt,
      sourceLabel: 'MaxPreps Aubrey varsity schedule; individually verified finals are reflected in this dated editorial snapshot',
      latestResultSourceUrl: currentResult?.primarySourceUrl ?? editorial.season.latestResultSourceUrl,
    },
    seo: editorial.seo ? { ...editorial.seo, description: recordDescription } : editorial.seo,
    faq,
  };
}
