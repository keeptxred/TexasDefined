import { readFileSync, appendFileSync } from 'node:fs';
const source = readFileSync('src/data/high-school-football/program-editorial.ts', 'utf8');
const start = source.indexOf('  "aubrey": {');
const end = source.indexOf('\n  "', start + 14);
if (start < 0 || end < 0) throw new Error('Missing Aubrey editorial entry');
const aubrey = JSON.parse('{' + source.slice(start, end).trim().replace(/,\s*$/, '') + '}').aubrey;
const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
const get = (type) => parts.find((part) => part.type === type)?.value;
const today = [get('year'), get('month'), get('day')].join('-');
const published = JSON.parse(readFileSync('src/data/high-school-football/aubrey-auto-results.snapshot.json', 'utf8'));
if (published.season !== '2026' || published.teamSlug !== 'aubrey') throw new Error('Wrong Aubrey published score snapshot');
const publishedByDate = new Map(published.verifiedResults.map((game) => [game.date, game]));
const overdue = (aubrey.season?.games ?? []).filter((game) => {
  if (game.date >= today || game.result) return false;
  const auto = publishedByDate.get(game.date);
  if (!auto) return true;
  if (auto.opponent !== game.opponent || Boolean(auto.district) !== Boolean(game.district)
    || !Number.isInteger(auto.aubreyScore) || !Number.isInteger(auto.opponentScore)
    || auto.aubreyScore === auto.opponentScore) throw new Error('Invalid approved Aubrey result for ' + game.date);
  return false;
});
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, 'needs_review=' + (overdue.length > 0) + '\n');
if (overdue.length) {
  console.log('Review required for Aubrey games past their listed dates; do not infer final scores:');
  for (const game of overdue) console.log(game.date + ' — ' + game.opponent);
  console.log('Source: ' + aubrey.season.sourceUrl);
} else console.log('No overdue unverified results for Aubrey.');
