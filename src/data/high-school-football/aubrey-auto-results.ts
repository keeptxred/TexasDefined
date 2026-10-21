import snapshot from './aubrey-auto-results.snapshot.json';
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
  const previous = editorial.season.games;
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
  const existingFaq = editorial.faq ?? [];
  const faq = existingFaq.map((entry) => /(?:2026.*record|record.*2026)/i.test(entry.question)
    ? { ...entry, answer: "Aubrey's verified 2026 record is " + record + '. Check the dated score table and linked results for changes.' }
    : entry);
  return {
    ...editorial,
    season: {
      ...editorial.season, games, record,
      verifiedAt: currentResult?.verifiedAt ?? editorial.season.verifiedAt,
      latestResultSourceUrl: currentResult?.primarySourceUrl ?? editorial.season.latestResultSourceUrl,
    },
    seo: editorial.seo ? { ...editorial.seo, description: recordDescription } : editorial.seo,
    faq,
  };
}
