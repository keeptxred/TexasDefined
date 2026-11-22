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
  const districtGames = completed.filter((game) => game.district);
  const districtScore = districtGames.reduce((total, game) => {
    const match = game.result?.match(/^[WL] (\\d+)[–-](\\d+)/);
    if (!match) throw new Error('Aubrey district result lacks a numerical final: ' + game.date);
    return { scored: total.scored + Number(match[1]), conceded: total.conceded + Number(match[2]) };
  }, { scored: 0, conceded: 0 });
  const closeDistrictWins = districtGames.filter((game) => {
    const match = game.result?.match(/^W (\\d+)[–-](\\d+)/);
    return match && Number(match[1]) - Number(match[2]) <= 7;
  }).length;
  const districtSeasonComplete = districtGames.length === 7 && districtWins === 7 && districtLosses === 0;
  const titleSummary = districtSeasonComplete
    ? `Aubrey won all seven District 4-4A Division I games in 2026. Its source-reported district scoring margin was ${districtScore.scored}–${districtScore.conceded} (+${districtScore.scored - districtScore.conceded}); ${closeDistrictWins} of the seven district wins were by seven points or fewer. The district title and undefeated district record were also announced by Aubrey ISD.`
    : `Aubrey's recorded District 4 results are ${districtWins}–${districtLosses}; check each dated result before treating this as a final district standing.`;
  const updatedOverview = `Aubrey finished its 2026 season ${wins}–${losses} overall and ${districtWins}–${districtLosses} in UIL District 4. The last source-verified game was ${lastReport}.${nextReport} These are dated researched finals, not a live-score feed.`;
  const newOverview = [
    updatedOverview,
    titleSummary,
    'The Chaparrals followed their unbeaten seven-game district run with a 63–24 Class 4A Division I bi-district win against Andrews in Sweetwater on November 12. The year ended in the November 19 area round at Burkburnett, where Canyon led 36–7 at halftime before Aubrey scored 29 second-half points in a 39–36 loss. The venue for a playoff fixture is not necessarily Chaparral Stadium.',
    'Keith Ivy is the 2026 head coach. Aubrey ISD publishes campus and stadium rules, directs home-game admission to GoFan and posts team notices. Fans should check the specific host and organizer for any future event rather than applying Aubrey home-stadium rules to neutral-site postseason games.',
  ];
  const milestones = (editorial.milestones ?? []).map((milestone) => {
    if (milestone.date === '2021') return { ...milestone,
      sourceUrl: 'https://www.lonestarfootball.net/team.asp?GUID=9124826788&S=2021&T=852&action=schedule',
      sourceLabel: 'Independent 2021 Aubrey season ledger',
    };
    if (milestone.date === '2024') return { ...milestone,
      sourceUrl: 'https://www.maxpreps.com/tx/aubrey/aubrey-chaparrals/football/24-25/schedule/',
      sourceLabel: 'Archived 2024 Aubrey season schedule',
    };
    if (milestone.date === '2026') return { ...milestone,
      title: 'Unbeaten district champions',
      body: districtSeasonComplete
        ? `Aubrey went 7–0 in 4A Division I District 4 and outscored district opponents ${districtScore.scored}–${districtScore.conceded}. Springtown, Decatur and Lake Dallas each lost by seven points; the remaining four wins combined decisive scoring with the Alvarado 70–40 shootout.`
        : titleSummary,
      sourceUrl: 'https://www.maxpreps.com/tx/football/26-27/district/4a-1-region-i-district-4/?leagueid=8d9aee28-3ea5-463b-82c1-c731ae42f8ca',
      sourceLabel: '2026 District 4 4A Division I verified standings',
    };
    return milestone;
  });
  if (districtSeasonComplete) milestones.push(
    { date: 'Nov 12, 2026', title: 'Bi-district win over Andrews',
      body: 'Aubrey beat Andrews 63–24 at Sweetwater in the opening playoff round, advancing after a 7–0 district regular season. This was a neutral-site postseason game, not a home contest at Chaparral Stadium.',
      sourceUrl: 'https://www.mrt.com/sports/highschool/article/big-spring-permian-forsan-advance-uil-football-22530172.php',
      sourceLabel: 'Midland Reporter-Telegram bi-district recap',
    },
    { date: 'Nov 19, 2026', title: 'Area-round comeback against Canyon',
      body: 'Down 36–7 at halftime in Burkburnett, Aubrey scored 29 second-half points but fell 39–36. Canyon finished ahead on a 37-yard field goal; the final ended Aubrey’s 8–4 season.',
      sourceUrl: 'https://www.myplainview.com/canyon/sports/article/eagles-eliminate-aubrey-39-36-set-showdown-22543265.php',
      sourceLabel: 'Canyon News detailed November 21 game report',
    },
  );
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
    if (entry.question === 'Has Aubrey won a state football title?') {
      return { ...entry, answer: 'The archived state-title source previously linked here now redirects without its Aubrey record. This guide does not assert a title or a definitive all-time playoff total without a retrievable primary source; consult the UIL football championship archives for state-title history.' };
    }
    return entry;
  });
  if (districtSeasonComplete) faq.push(
    { question: 'Did Aubrey win District 4 in 2026?', answer: `Yes. Aubrey finished 7–0 in UIL 4A Division I District 4, scoring ${districtScore.scored} points and conceding ${districtScore.conceded} in those seven games; its district scoring margin was +${districtScore.scored - districtScore.conceded}. The record is confirmed by the 2026 district standings and Aubrey ISD's district-championship announcement.` },
    { question: 'How far did Aubrey advance in the 2026 football playoffs?', answer: 'Aubrey defeated Andrews 63–24 in the November 12 bi-district round at Sweetwater and lost 39–36 to Canyon in the November 19 area round at Burkburnett. The final overall record was 8–4.' },
    { question: 'What happened in Aubrey’s 39–36 loss to Canyon?', answer: 'Canyon led 36–7 at halftime; Aubrey scored 29 second-half points, but Canyon held on 39–36 after a 37-yard field goal. Multiple detailed reports and the MaxPreps result agree on the three-point final.' },
  );
  return {
    ...editorial,
    overview: newOverview,
    milestones,
    venue: editorial.venue ? {
      ...editorial.venue,
      sourceUrl: 'https://www.aubreyisd.net/page/contact-us',
      sourceLabel: 'Official Aubrey ISD high-school campus address',
      note: 'Chaparral Stadium is on the Aubrey High School campus at 510 Spring Hill Road. The district confirms the campus address; verify game-specific parking, gates and ticket rules directly with Aubrey ISD. The 2026 postseason games at Sweetwater and Burkburnett were neutral-site contests.',
      verifiedAt: '2026-11-22',
    } : editorial.venue,
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
