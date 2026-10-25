import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(path, 'utf8');
const profile = read('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx');
const pageLoader = read('src/routes/texas-high-school-football-teams_.$slug.tsx');
const panel = read('src/components/sports/FootballGameNightGuide.tsx');
const functions = read('src/data/sports-sponsorship.functions.ts');
const sponsorServer = read('src/data/sports-sponsorship.server.ts');
const migration = read('supabase/migrations/20261017030000_extend_sports_sponsor_football_team_surfaces.sql');

test('football game-night guide is part of existing profile with notice guard', () => {
  assert.match(profile, /import \{ FootballGameNightGuide \} from/);
  assert.match(profile, /!editorial\?\.notice && \(editorial\?\.schedule/);
  assert.match(profile, /<FootballGameNightGuide/);
  assert.match(profile, /schoolWebsite=\{program\?\.schoolWebsite\}/);
});

test('governed sports placements are looked up only for valid active football profiles', () => {
  assert.match(pageLoader, /getActiveSportsSponsorPlacement/);
  assert.match(pageLoader, /if \(!profile\) throw notFound\(\)/);
  assert.match(pageLoader, /profile\.editorial\?\.notice[\s\S]*?\? null\s*:\s*await getActiveSportsSponsorPlacement/);
  assert.match(pageLoader, /surfacePath: \`\/texas-high-school-football-teams\/\$\{profile\.slug\}\`/);
  assert.match(pageLoader, /return \{ \.\.\.profile, sponsorPlacement \}/);
  assert.match(profile, /SponsoredSportsPlacement key=\{sponsorPlacement\.id\} placement=\{sponsorPlacement\}/);
  assert.match(profile, /\{sponsorPlacement \? \(/);
  assert.match(sponsorServer, /export const SPORTS_SPONSOR_OUTREACH_HOLD = true/);
});

test('mobile readers reach game-night actions and season before historical research', () => {
  const guideIndex = profile.indexOf('<FootballGameNightGuide');
  const factsIndex = profile.indexOf('aria-label={`${displayName} verified football facts`}');
  const seasonIndex = profile.indexOf('id="football-current-season"');
  const overviewIndex = profile.indexOf('Program overview');
  const milestonesIndex = profile.indexOf('The program story');
  const historyIndex = profile.indexOf('All-time UIL state-final record');
  assert.ok(guideIndex > 0 && guideIndex < factsIndex, 'game-night actions must precede the facts table');
  assert.ok(factsIndex < seasonIndex, 'facts must precede the current schedule');
  assert.ok(seasonIndex < overviewIndex && seasonIndex < milestonesIndex && seasonIndex < historyIndex,
    'the current season must be above background and history');
  assert.match(profile, /grid-cols-2 gap-x-5 border-b border-border py-3 text-sm sm:grid-cols-3 lg:grid-cols-6/);
  assert.match(profile, /hasSeasonSection=\{!!program\}/);
  assert.match(panel, /href="#football-current-season"/);
  assert.match(panel, /\{hasSeasonSection && \(/);
  assert.match(panel, /scroll-mt-36|football-current-season/);
});

test('game-night panel uses sourced schedules and cannot invent times or ticket availability', () => {
  assert.match(panel, /!game\.result/);
  assert.match(panel, /America\/Chicago/);
  assert.match(panel, /Schedule snapshot checked/);
  assert.match(panel, /confirm.*directly before you travel/i);
  assert.match(panel, /Verify schedule and results/);
  assert.doesNotMatch(panel, /Buy tickets now|Tickets available|Tickets from \$/i);
  assert.match(panel, /not official school merchandise/i);
});

test('first-party action tracking respects existing automation and shop analytics', () => {
  assert.match(panel, /trackTexasDefinedOutcome/);
  assert.match(panel, /next_step_selected/);
  assert.doesNotMatch(panel, /shop_navigation_clicked/);
  // The platform's delegated click handler already records shop_navigation_clicked.
  // The page-specific handler only records the fan's football context once.
  assert.match(read('src/platform/analytics.ts'), /shop_navigation_clicked/);
  assert.match(panel, /recordAction\(slug, 'texas-gear', '\/shop'\)/);
  assert.match(panel, /high-school-football-game-night/);
  assert.doesNotMatch(panel, /localStorage|sessionStorage|sendBeacon/);
});

test('team sponsorship paths are staged but no launch hold is bypassed', () => {
  const allowed = /^\/(?:sports-venues|sports-venue\/[a-z0-9-]+|texas-high-school-football-teams\/[a-z0-9-]+)$/;
  for (const path of [
    '/sports-venues',
    '/sports-venue/eagle-stadium-allen',
    '/texas-high-school-football-teams/southlake-carroll',
    '/texas-high-school-football-teams/aledo',
  ]) assert.equal(allowed.test(path), true, path);
  for (const path of [
    '/texas-high-school-football-teams/../../admin',
    '/texas-high-school-football-teams/',
    '/texas-high-school-football-teams/fake?redirect=x',
  ]) assert.equal(allowed.test(path), false, path);

  assert.match(functions, /texas-high-school-football-teams/);
  assert.match(migration, /texas-high-school-football-teams/);
  assert.match(migration, /DROP CONSTRAINT IF EXISTS texasdefined_sports_sponsor_placements_surface_path_check/);
  assert.match(migration, /ADD CONSTRAINT texasdefined_sports_sponsor_placements_surface_path_check/);
  assert.match(sponsorServer, /export const SPORTS_SPONSOR_OUTREACH_HOLD = true/);
  assert.match(sponsorServer, /if \(SPORTS_SPONSOR_OUTREACH_HOLD\) return null/);
});


test('football monetization is shared, disclosed, source-preserving, and payment-gated', () => {
  const panel = read('src/components/sports/FootballMonetizationSlot.tsx');
  const districtPage = read('src/routes/texas-high-school-football-districts_.$slug.lazy.tsx');
  const districtLoader = read('src/routes/texas-high-school-football-districts_.$slug.tsx');
  const sponsorForm = read('src/routes/partner-with-us.lazy.tsx');
  const partnerHead = read('src/routes/partner-with-us.tsx');
  const inquiry = read('src/data/partner-inquiry.functions.ts');
  const prices = read('src/data/football-sponsorship-packages.ts');
  const districtMigration = read('supabase/migrations/20261025184500_extend_sports_sponsor_football_district_surfaces.sql');
  assert.match(panel, /data-football-monetization="v1"/);
  assert.match(panel, /data-football-sponsor-interest/);
  assert.match(panel, /data-football-shop-cta/);
  assert.match(panel, /!hasSponsor/);
  assert.match(profile, /<FootballMonetizationSlot/);
  assert.match(districtPage, /<FootballMonetizationSlot/);
  assert.match(districtPage, /<SponsoredSportsPlacement/);
  assert.match(districtLoader, /getActiveSportsSponsorPlacement/);
  assert.match(functions, /texas-high-school-football-\(\?:teams\|districts\)/);
  assert.match(partnerHead, /texas-high-school-football-\(\?:teams\|districts\)/);
  assert.match(inquiry, /texas-high-school-football-\(\?:teams\|districts\)/);
  assert.match(prices, /footballFoundingPackages/);
  for (const amount of ['49', '99', '149']) assert.match(prices, new RegExp('monthlyPrice: ' + amount));
  assert.match(sponsorForm, /custom agreement and payment verification required/);
  assert.match(sponsorServer, /FOOTBALL_SPONSORSHIP_LAUNCH_ENABLED = true/);
  assert.match(sponsorServer, /!isFootballSponsorSurface\(String\(existing\.surface_path\)\)/);
  assert.match(sponsorServer, /agreement\?\.payment_status !== 'paid'/);
  assert.match(sponsorServer, /agreement\?\.status !== 'accepted'/);
  assert.match(districtMigration, /texas-high-school-football-districts/);
  assert.match(districtMigration, /DROP CONSTRAINT IF EXISTS texasdefined_sports_sponsor_placements_surface_path_check/);
});
