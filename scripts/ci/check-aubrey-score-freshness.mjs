import { readFileSync, appendFileSync } from 'node:fs';
const source = readFileSync('src/data/high-school-football/program-editorial.ts', 'utf8');
const start = source.indexOf('  "aubrey": {');
const end = source.indexOf('\n  "', start + 14);
if (start < 0 || end < 0) throw new Error('Missing Aubrey editorial entry');
const aubrey = JSON.parse('{' + source.slice(start, end).trim().replace(/,\s*$/, '') + '}').aubrey;
const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
const get = (type) => parts.find((part) => part.type === type)?.value;
const today = [get('year'), get('month'), get('day')].join('-');
const overdue = (aubrey.season?.games ?? []).filter((game) => game.date < today && !game.result);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, 'needs_review=' + (overdue.length > 0) + '\n');
if (overdue.length) {
  console.log('Review required for Aubrey games past their listed dates; do not infer final scores:');
  for (const game of overdue) console.log(game.date + ' — ' + game.opponent);
  console.log('Source: ' + aubrey.season.sourceUrl);
} else console.log('No overdue unverified results for Aubrey.');
