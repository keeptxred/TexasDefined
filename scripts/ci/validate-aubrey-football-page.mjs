import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const editorial = readFileSync('src/data/high-school-football/program-editorial.ts', 'utf8');
const identities = readFileSync('src/data/high-school-football/school-identities.ts', 'utf8');
const route = readFileSync('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx', 'utf8');
const guide = readFileSync('src/components/sports/FootballGameNightGuide.tsx', 'utf8');
const start = editorial.indexOf('  "aubrey": {');
const end = editorial.indexOf('\n  "', start + 14);
assert.ok(start > -1 && end > start, 'Aubrey editorial entry must exist');
const aubrey = JSON.parse('{' + editorial.slice(start, end).trim().replace(/,\s*$/, '') + '}').aubrey;
const games = aubrey.season?.games ?? [];
assert.equal(games.length, 10, 'All 10 regular-season games must be listed');
assert.equal(new Set(games.map((game) => game.date)).size, 10, 'No duplicate game dates');
assert.deepEqual(games.map((game) => game.date), [...games.map((game) => game.date)].sort(), 'Schedule must be chronological');
assert.ok(games.filter((game) => game.result).length >= 7, 'Seven verified finals through October 16 must be preserved');
assert.equal(games.find((game) => game.date === '2026-10-09')?.result, 'W 28–21');
assert.equal(games.find((game) => game.date === '2026-10-16')?.result, 'W 66–14');
assert.equal(games.find((game) => game.date === '2026-10-16')?.opponent, 'Carrollton Ranchview');
// Later confirmed results may be added by a reviewed editorial update; do not freeze the October 16 snapshot.
assert.match(aubrey.season.record, /\d+–\d+ overall.*\d+–\d+ district/, 'Season record must remain explicit and dated');
assert.equal(aubrey.schedule.sourceUrl, aubrey.season.sourceUrl);
assert.ok(aubrey.season.latestResultSourceUrl.includes('/football/game/aubrey-vs-ranchview-irving/10-16-2026/'));
assert.ok(route.includes('Verify latest recorded final ↗'));
assert.equal(aubrey.schedule.ticketUrl, 'https://gofan.co/app/school/TX90134');
assert.equal(aubrey.venue.policyUrl, 'https://www.aubreyisd.net/page/aubrey-isd-stadium-policies');
assert.equal(aubrey.venue.address, '510 Spring Hill Road, Aubrey, TX 76227');
assert.ok(aubrey.seo.title.includes('Schedule, Scores & Tickets'));
assert.ok(identities.includes("slug: 'aubrey'") && identities.includes("mascot: 'Chaparrals'"), 'Aubrey Chaparrals identity must come from the verified identity registry');
assert.ok(!route.includes("slug === 'aubrey' ? 'Aubrey Chaparrals Football'"), 'Aubrey team nickname must not be hardcoded in the shared route');
assert.ok(!route.includes("repeating-linear-gradient(90deg"), 'Decorative yard-line overlay must not cover hero text or obstruct automated contrast inspection');
// Sitewide original school-identity policy: a Colorado game photo is not
// an Aubrey-specific image. Preserve the photo-credit/rights requirements for
// any other genuinely sourced football hero without mandating a generic one.
assert.equal(aubrey.photo, undefined, 'No unrelated Colorado representative football photo on the Aubrey school guide');
const timelineSet = route.slice(route.indexOf('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS'),route.indexOf(']);',route.indexOf('const FOOTBALL_SOURCE_GRAPHIC_SCHOOLS')));
assert.ok(timelineSet.includes("'aubrey'"), 'Aubrey must show its original 2026 source-backed results graphic instead of a generic photo');
assert.ok(route.includes('<ReportedFormIllustration'), 'Original results graphic component must remain available');
assert.ok(route.includes('editorial?.photo ? (') && route.includes('photo={editorial.photo}'), 'Every rights-governed football image renders at hero, with original fallback otherwise');
for(const token of ['function FootballSourcedPhoto(', 'src={photo.src}', 'alt={photo.alt}', '{photo.caption}', '{photo.credit}', 'href={photo.sourceUrl}', 'href={photo.licenseUrl}', '{photo.license}', "priority={slug === 'aubrey' || slug === 'katy' || slug === 'fort-davis'}"]) assert.ok(route.includes(token), 'Sourced media hero contract missing: '+token);
assert.ok(!route.includes('src="https://images.unsplash.com/photo-1508209495879'), 'Do not hardcode Aubrey image in JSX');
assert.ok(!route.includes('{editorial.photo && <figure'), 'Do not repeat governed football photo below hero');
assert.ok(route.includes('Verified 2026 scores, season results, home tickets and Chaparral Stadium information.'), 'Mobile introduction should remain concise without repeating all score cards');
assert.ok(!route.includes('Original TexasDefined football illustration'), 'Never restore the Aubrey clip-art football panel');
assert.ok(!route.includes('viewBox="0 0 180 110"'), 'Aubrey football clip-art SVG must be removed');

assert.ok(aubrey.overview.every((line) => !/Avoid inventing|Project context|behind the scenes/i.test(line)));
assert.ok(guide.includes('Official home tickets ↗') && guide.includes('Stadium entry rules ↗'));
assert.ok(route.includes('Scheduled · ' + '$' + '{game.kickoff}'));
assert.ok(!route.includes('Historical alias metadata may help resolve'));
assert.ok(!route.includes('Project context reviewed'));
const scoreOverlay = readFileSync('src/data/high-school-football/aubrey-auto-results.ts', 'utf8');
assert.ok(scoreOverlay.includes('How did Aubrey finish its 2026 regular-season schedule?'), 'Late-season FAQ must describe results, not already completed fixtures as remaining');
assert.ok(scoreOverlay.includes("game.result ?? 'result awaiting verification'"), 'Late-season FAQ must use effective scores and explicitly flag unconfirmed results');
assert.ok(scoreOverlay.includes('const lateRegularSeason = regularSeason.slice(-3);'), 'FAQ must derive the late regular-season schedule separately from postseason');
assert.ok(scoreOverlay.includes('individually verified finals are reflected in this dated editorial snapshot'), 'Effective source label must not freeze last review on Oct 16');

// Authority-level 2026 retrospective and visible AEO: derive the district math
// from authored/individually verified scores, never from marketing language.
const verified = JSON.parse(readFileSync('src/data/high-school-football/aubrey-auto-results.snapshot.json', 'utf8'));
const effective = games.map((game) => ({
  ...game,
  result: verified.verifiedResults.find((result) => result.date === game.date)?.aubreyScore !== undefined
    ? (() => { const score = verified.verifiedResults.find((result) => result.date === game.date);
      return (score.aubreyScore > score.opponentScore ? 'W ' : 'L ') + score.aubreyScore + '–' + score.opponentScore; })()
    : game.result,
}));
const districtFinals = effective.filter((game) => game.district);
assert.equal(districtFinals.length, 7, 'Aubrey full 2026 district ledger should have seven matches');
const districtTotals = districtFinals.reduce((acc, game) => {
  const match = game.result?.match(/^W (\d+)[–-](\d+)/);
  assert.ok(match, 'District title cannot be asserted without corroborated win: ' + game.date);
  const scored = Number(match[1]), conceded = Number(match[2]);
  return { scored: acc.scored + scored, conceded: acc.conceded + conceded, close: acc.close + Number(scored - conceded <= 8) };
}, { scored: 0, conceded: 0, close: 0 });
assert.deepEqual(districtTotals, { scored: 328, conceded: 132, close: 3 }, '2026 district scoring analysis must match scoreboard ledger');
assert.deepEqual(
  verified.verifiedResults.filter((result) => ['2026-11-12', '2026-11-19'].includes(result.date)).map((r) => [r.opponent, r.aubreyScore, r.opponentScore]),
  [['Andrews', 63, 24], ['Canyon', 36, 39]],
  'Aubrey postseason retrospective must match vetted final scores',
);
const authority = readFileSync('src/components/sports/AubreySeasonAuthority.tsx', 'utf8');
for (const marker of ['data-aubrey-authority="2026"', '2026-11-12', '2026-11-19', 'district.length !== 7',
  '39–36', '36–7', 'Sweetwater', 'Burkburnett', 'Canyon News', 'Aubrey ISD',
  '/texas-high-school-football-teams/andrews', '/texas-high-school-football-teams/canyon',
  'https://www.aubreyisd.net/page/aubrey-isd-stadium-policies']) {
  assert.ok(authority.includes(marker), 'Missing 2026 Aubrey authority source or editorial fact: ' + marker);
}
assert.ok(route.includes('<AubreySeasonAuthority games={editorial.season.games} />'), 'Aubrey retrospective must be server-rendered from current results');
assert.ok(route.includes('footballProgramProfilePath(game.opponent)'), 'Aubrey table opponent names should link to school profiles');
assert.ok(route.includes("slug === 'comal-canyon-lake' || slug === 'aubrey'"), 'Aubrey commercial content should not displace its team analysis');
const a = readFileSync('src/data/high-school-football/aubrey-auto-results.ts', 'utf8');
for (const marker of ['Unbeaten district champions', 'Bi-district win over Andrews', 'Area-round comeback against Canyon',
  'District 4-4A Division I', 'https://www.aubreyisd.net/o/ahs', '2026-11-22']) {
  assert.ok(a.includes(marker), 'Aubrey source overlay missing authority milestone or venue correction: ' + marker);
}
assert.ok(!a.includes("sourceUrl: 'https://www.texasfootball.com/team/aubrey-chaparrals'"), 'Do not restore redirecting Dave Campbell source');
const sitemap = readFileSync('src/data/high-school-football/football-sitemap.server.ts', 'utf8');
const lastmod = JSON.parse(readFileSync('src/data/high-school-football/football-profile-lastmod.json', 'utf8'));
assert.equal(lastmod.aubrey, '2026-11-22', 'Substantive Aubrey revision must have truthful sitemap date');
assert.ok(sitemap.includes('footballProfileLastmod['), 'Individual Aubrey lastmod override must feed actual XML sitemap');
assert.ok(!authority.includes('<img ') && !authority.includes('<Image '), 'Never add unlicensed Aubrey team photos');

console.log('Aubrey editorial, new authority retrospective, source/rights, current standings math, SEO and sitemap guards passed.');
