import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (file) => readFileSync(file, 'utf8');
const teamFile = read('src/data/high-school-football/program-editorial-comal-canyon-lake.ts');
const match = teamFile.match(/const CANYON_LAKE: FootballProgramEditorial = ([\s\S]*?);\s*export function getCanyonLakeFootballEditorial/);
assert.ok(match, 'Canyon Lake sourced editorial must remain a single static typed object');
const team = JSON.parse(match[1]);
const identity = read('src/data/high-school-football/school-identities.ts');
const server = read('src/data/high-school-football/football-program-profile.server.ts');
const ui = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const seo = read('src/routes/texas-high-school-football-teams_.$slug.tsx');
const watch = JSON.parse(read('docs/football-authority/official-source-watch.json'));
const productionWorkflow = read('.github/workflows/deploy-production.yml');
const refreshWorkflow = read('.github/workflows/refresh-canyon-lake-football.yml');
const refreshProgram = read('scripts/data/refresh-canyon-lake-results.mjs');
assert.ok(refreshWorkflow.includes("cron: '37 13 * * 6'"),'Every Saturday year-round scores and standings research');
assert.ok(refreshWorkflow.includes("cron: '37 13 * 8-12 2'"),'In-season Tuesday correction pass');
assert.ok(refreshWorkflow.includes('workflow_dispatch:'));
assert.ok(refreshWorkflow.includes('node scripts/data/research-canyon-lake-weekly.mjs --research'));
assert.ok(refreshWorkflow.includes('node --test scripts/data/research-canyon-lake-weekly.test.mjs'));
assert.ok(refreshWorkflow.includes("gh issue create --repo"),'Scheduled research must provide reviewable evidence');
const researchProgram = read('scripts/data/research-canyon-lake-weekly.mjs');
assert.ok(researchProgram.includes("publishingAllowedFromResearch:false"),'Research is discovery only, never unsourced score publication');
assert.ok(researchProgram.includes("districtOfficialRank:null"),'Do not imply a certified standing from one team ledger');
assert.ok(researchProgram.includes("MaxPreps District 13 standings"),'Research must link to actual district standings');
assert.ok(researchProgram.includes("NEWS_LIMIT=24"),'Keep weekly discovery bounded');
assert.ok(researchProgram.includes("RSS headline/link/date discovery"),'Do not scrape third-party full articles as sports data');
assert.ok(refreshWorkflow.includes("news") || refreshWorkflow.includes("RSS"),'Schedule must run active discovery');
const refreshFinisher = read('.github/workflows/finish-canyon-lake-football-refresh.yml');
assert.ok(refreshWorkflow.includes('Created source-only PR; protected Canyon Lake finisher will validate it.'));
assert.ok(refreshFinisher.includes('github.event.workflow_run.conclusion'));
assert.ok(refreshFinisher.includes('src/data/high-school-football/program-editorial-comal-canyon-lake.ts'));
assert.ok(refreshFinisher.includes('bash scripts/ci/dispatch-validate-branch.sh "$branch" validate.yml'));
assert.ok(refreshFinisher.includes('bash scripts/ci/dispatch-validate-branch.sh "$branch" merge-gate.yml'));
assert.ok(refreshFinisher.includes('gh pr merge "$url" --auto --squash --match-head-commit "$sha"'));
assert.ok(refreshProgram.includes('two independently hosted licensed score providers'));
assert.ok(refreshProgram.includes('Never scrape') || refreshProgram.includes('never scraped'));
assert.ok(productionWorkflow.includes('https://texasdefined.com/texas-high-school-football-teams/comal-canyon-lake'), 'Production release must purge Canyon Lake HTML so newly verified scores appear without stale CDN markup');

assert.equal(team.slug, 'comal-canyon-lake');
assert.match(team.intro, /Pleasanton|2026/);
assert.match(team.seo.title, /Canyon Lake Hawks Football/);
assert.equal(team.coach.name, 'Sam Parker');
assert.ok(team.coach.sourceUrl.startsWith('https://'));
assert.match(identity, /slug: 'comal-canyon-lake', mascot: 'Hawks',[\s\S]{0,160}colors: 'Green and Gold'/);
assert.match(identity, /colorsSourceUrl: 'https:\/\/clhs\.comalisd\.org\/apps\/pages\/alma_mater'/);

assert.ok(server.includes("import { getCanyonLakeFootballEditorial } from './program-editorial-comal-canyon-lake'"));
assert.ok(server.includes("const baseEditorial = loneStarEditorial ?? getCanyonLakeFootballEditorial(canonicalSlug) ??"), 'School overlay must take precedence over Batch011');
assert.match(ui, /'comal-canyon-lake', \/\/ Original source-attributed/);
assert.match(ui, /canyonLake=\{slug === 'comal-canyon-lake'\}/);
const originalHero = read('public/images/high-school-football/comal-canyon-lake-2026.svg');
assert.match(originalHero, /<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
assert.match(originalHero, /<title id="t">Original Hill Country football field illustration<\/title>/);
assert.ok(ui.includes('src="/images/high-school-football/comal-canyon-lake-2026.svg"'), 'Show original owned Hill Country field artwork, not an unlicensed school photo');
assert.ok(ui.includes("background: 'linear-gradient(90deg, rgba(11,31,24,.95)"), 'Dark gradient protects text legibility over the field artwork');
assert.ok(!/<image\b/i.test(originalHero), 'Original art must not hotlink unlicensed external image resources');
assert.ok(ui.includes("suppressCommercialOffers={slug === 'comal-canyon-lake'}"));
const gameNightGuide = read('src/components/sports/FootballGameNightGuide.tsx');
assert.ok(gameNightGuide.includes('!suppressCommercialOffers && <FootballFanOffers'));
assert.ok(gameNightGuide.includes("slug !== 'aubrey' && !suppressCommercialOffers"));
assert.match(ui, /id="canyon-lake-playoff-guide"/);
assert.match(ui, /\{districtPath && <Link to=\{districtPath\}/);
assert.match(ui, /slug !== 'frisco-lone-star' && slug !== 'comal-canyon-lake' && <FootballMonetizationSlot/);
assert.match(ui, /slug !== 'frisco-lone-star' && slug !== 'comal-canyon-lake' && sponsorPlacement/);
assert.match(ui, /\(slug === 'frisco-lone-star' \|\| slug === 'comal-canyon-lake'\)/);
assert.match(seo, /canonicalLink\(texasDefinedBrand, canonicalPath\)/);

const games = team.season.games;
const hasAreaFinal = Boolean(games.at(-1)?.result);
const areaFinal = games.at(-1);
assert.equal(games.length, 11, 'Ten locked finals plus one sourced area-round fixture');
const done = games.filter(g => g.result);
const wins = done.filter(g => g.result.startsWith('W '));
const losses = done.filter(g => g.result.startsWith('L '));
const districtGames = done.filter(g => g.district);
assert.equal(done.length, hasAreaFinal ? 11 : 10);
assert.equal(wins.length, 8 + (hasAreaFinal && areaFinal.result.startsWith('W ') ? 1 : 0));
assert.equal(losses.length, 2 + (hasAreaFinal && areaFinal.result.startsWith('L ') ? 1 : 0));
assert.equal(districtGames.length, 7);
assert.equal(districtGames.filter(g => g.result.startsWith('W ')).length, 6);
assert.equal(districtGames.filter(g => g.result.startsWith('L ')).length, 1);
assert.match(team.season.record, new RegExp(wins.length+'–'+losses.length+' overall · 6–1 district'));
assert.match(team.season.recordLabel, hasAreaFinal ? /through November 20, 2026/ : /through Nov\. 13/);
assert.ok(team.season.verifiedAt >= '2026-11-19');
if(hasAreaFinal){
  assert.match(team.season.sourceLabel,/two independent authorized JSON feeds/);
  assert.match(team.season.sourceLabel,/Port Lavaca Calhoun/);
  assert.match(team.intro,/independently corroborated final/);
  assert.match(team.faq[2].answer,/Both authorized result providers agreed/);
}else{
  assert.equal(team.season.verifiedAt,'2026-11-19');
  assert.match(team.season.sourceLabel,/schedule updated Nov\. 19, 2026 at 15:58 UTC/);
  assert.match(team.season.sourceLabel,/Nov\. 20 Calhoun is scheduled, not final/);
}
assert.ok(games.every((g,i) => i === 0 || g.date > games[i-1].date), 'Games must be in strict ascending date order');
assert.ok(games.every((g) => /^2026-\d\d-\d\d$/.test(g.date)));
assert.ok(done.every(g => /^(W|L) \d+–\d+$/.test(g.result)));
assert.equal(games.find(g=>g.date === '2026-11-13')?.result, 'W 49–28');
assert.deepEqual(done.slice(0, 10).map(g => [g.date, g.result]), [
  ['2026-09-04', 'L 21–35'],
  ['2026-09-11', 'W 54–18'],
  ['2026-09-24', 'L 41–56'],
  ['2026-10-02', 'W 70–35'],
  ['2026-10-09', 'W 55–7'],
  ['2026-10-15', 'W 70–6'],
  ['2026-10-23', 'W 50–32'],
  ['2026-10-30', 'W 53–50'],
  ['2026-11-06', 'W 50–40'],
  ['2026-11-13', 'W 49–28'],
], 'Every score must match the November 19 MaxPreps schedule, not just aggregate W–L totals');
const next = games.at(-1);
assert.equal(next.date, '2026-11-20');
assert.equal(next.opponent, 'Port Lavaca Calhoun');
assert.ok(!next.result || /^(W|L) \d+–\d+$/.test(next.result), 'Area-round result must remain pending or a well-formed independently confirmed final');
assert.equal(next.site, 'Neutral');
assert.match(team.venue.note, /Leopard Stadium, 805 S\. Vail St\./);
assert.equal(next.kickoff, '7:00 PM');
assert.ok(team.season.sourceUrl.startsWith('https://'));
assert.ok(team.season.latestResultSourceUrl.startsWith('https://'));
assert.ok(team.schedule.ticketUrl.startsWith('https://clhs.comalisd.org/'));
assert.equal(team.milestones.filter(m=>m.sourceUrl.startsWith('https://')).length, team.milestones.length);
assert.ok(team.overview.length >= 6 && team.faq.length >= 6, 'Substantial original school-specific reporting and useful answers');
assert.match(team.overview.join(' '), /153 Canyon Lake points and 122 allowed/);
if(!hasAreaFinal)assert.match(team.overview.join(' '), /513 points for and 307 against/);
else assert.ok(team.overview.join(' ').includes('points for and '), 'Updated current season points must be present');
assert.ok(team.overview.join(' ').includes('Jace Wheeler'), 'Individually sourced current postseason reporting');
assert.ok(team.overview.join(' ').includes('Isaac Torres'));
assert.equal(team.milestones.find(m => m.date === 'November 13, 2026')?.sourceUrl, 'https://www.maxpreps.com/news/TOkQpDr5-k2iOV6evghkzQ/football-recap-canyon-lakes-victory-on-friday-extends-winning-streak-to-seven.htm');
assert.match(team.overview.join(' '), /recap published November 19/);
assert.ok(!/MaxPreps' November 16 recap|MaxPreps' Nov\. 16 game recap|November 16, 2026 report of Nov\. 13/.test(teamFile), 'Do not revert to the erroneous recap publication date');
const scorePairs = done.map((game) => game.result.slice(2).split('–').map(Number));
assert.ok(scorePairs.every(([forPts, againstPts]) => Number.isFinite(forPts) && Number.isFinite(againstPts)), 'Valid point totals');
const actualFor = scorePairs.reduce((sum, [forPts]) => sum + forPts, 0);
const actualAgainst = scorePairs.reduce((sum, [, againstPts]) => sum + againstPts, 0);
assert.ok(team.overview.join(' ').includes(actualFor+' points for and '+actualAgainst+' against'),
  'Published cumulative scoring analysis must reconcile with every completed final');
assert.equal(actualFor,513+(hasAreaFinal?Number(next.result.slice(2).split('–')[0]):0));
assert.equal(actualAgainst,307+(hasAreaFinal?Number(next.result.slice(2).split('–')[1]):0));
const areaMilestone=team.milestones.find(m=>m.date.startsWith('November 20'));
assert.ok(areaMilestone?.sourceUrl?.startsWith('https://'));
if(!hasAreaFinal)assert.equal(areaMilestone.sourceUrl,'https://www.lgisd.net/o/lhs/article/3260936');
else assert.equal(areaMilestone.sourceUrl,team.season.latestResultSourceUrl);
assert.ok(team.venue.note.includes('805 S. Vail St.'), 'First-party host stadium address');
assert.ok(team.venue.note.includes('online-only tickets and clear bags'), 'Host-specific ticket and clear-bag policy');
assert.ok(ui.includes('href="https://www.lgisd.net/o/lhs/article/3260936"'), 'Link exact official playoff event ticket notice');
assert.ok(ui.includes("nextListedFixture.kickoff ?"), 'Show verified upcoming kickoff in the primary summary card');
assert.ok(ui.includes("eventTicketNoticeUrl={slug === 'comal-canyon-lake' && nextListedFixture?.date === '2026-11-20'"), 'Show ticket action only while the November 20 fixture is still upcoming');
assert.ok(ui.indexOf('Nov. 20 playoff host notice & ticket link') < ui.indexOf('Other Canyon Lake home-game tickets'), 'Playoff host ticket notice must appear before unrelated home tickets');
const gameGuide = read('src/components/sports/FootballGameNightGuide.tsx');
assert.ok(gameGuide.includes('Nov. 20 playoff tickets · host notice'), 'Game-night primary action must link to the host, not home game tickets');
assert.ok(gameGuide.includes('ticketUrl && !hostTicketUrl'), 'Suppress home-ticket button while the playoff host ticket link is active');
assert.ok(gameGuide.includes("schoolScheduleUrl && slug !== 'comal-canyon-lake'"), 'Avoid unverified direct Rank One redirect; send readers through school athletics');
assert.ok(ui.includes('href="https://www.lagrangeleopardsathletics.com/facilities"'), 'Link exact host stadium facilities and bag policy');
assert.ok(!/156 Canyon Lake points/.test(teamFile));
const f = watch.sources.filter(s=>s.slug === 'comal-canyon-lake');
assert.equal(f.length,1,'Exactly one Comal Canyon Lake official-source monitor, not duplicated workflows');
assert.equal(f[0].reviewAfter,'2026-11-21', 'Post-playoff review must be scheduled immediately');
console.log('PASS: Canyon Lake Hawks authority contract, records, score math, coach, colors, original graphic, SEO and source watch');
