import fs from 'node:fs';
import path from 'node:path';

/**
 * Durable contract for generated UIL football district pages.
 *
 * Deliberately do NOT add headings, button labels, descriptions, or other editorial
 * prose here. Copy and visual design are allowed to evolve without breaking CI.
 * This validator protects the page capabilities and authoritative destinations that
 * must remain present across the shared district-page template.
 */

const root = process.cwd();
const pagePath = path.join(root, 'src/routes/texas-high-school-football-districts_.$slug.lazy.tsx');
const seoPath = path.join(root, 'src/routes/texas-high-school-football-districts_.$slug.tsx');

const page = fs.readFileSync(pagePath, 'utf8');
const seo = fs.readFileSync(seoPath, 'utf8');

const pageContracts = [
  ["createLazyFileRoute('/texas-high-school-football-districts/$slug')", 'district route registration'],
  ['data-football-district-hub="v1"', 'district hub root contract'],
  ['data-football-district-section="teams"', 'teams section contract'],
  ['data-football-district-section="game-week"', 'game-week section contract'],
  ['data-football-district-section="alignment"', 'alignment context contract'],
  ['data-football-district-section="explore"', 'internal discovery contract'],
  ['data-football-district-section="official-sources"', 'official-source contract'],
  ['href={program.profilePath}', 'member team profile links'],
  ['program.uilEnrollment', 'UIL enrollment binding'],
  ['district.sourceUrl', 'official UIL alignment source binding'],
  ['district.enrollmentSourceUrl', 'official UIL enrollment source binding'],
  ['UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url', 'official UIL cutoff source binding'],
  ['https://www.uiltexas.org/maxpreps/', 'current UIL scoreboard destination'],
  ['/article/texas-high-school-football-2026-season-calendar', 'season calendar destination'],
  ['/article/texas-high-school-football-playoffs-explained', 'playoff explainer destination'],
  ['/article/texas-high-school-football-scores-schedules', 'scores and schedules guide destination'],
  ['/texas-high-school-football-teams', 'team directory destination'],
  ['/texas-high-school-football-districts', 'district directory destination'],
  ['/texas-high-school-football-championship-history', 'championship history destination'],
  ['/sports/friday-night-lights', 'Friday Night Lights authority destination'],
];

const seoContracts = [
  ["createFileRoute('/texas-high-school-football-districts/$slug')", 'district SEO route registration'],
  ['canonicalPath = loaderData.profilePath', 'canonical path derived from district data'],
  ['canonicalLink(texasDefinedBrand, canonicalPath)', 'canonical link'],
  ["'@type': 'CollectionPage'", 'CollectionPage schema'],
  ["'@type': 'ItemList'", 'member ItemList schema'],
  ["'@type': 'BreadcrumbList'", 'breadcrumb schema'],
  ['loaderData.programs.map((program, index)', 'schema generated from district members'],
  ['url: `${siteUrl}${program.profilePath}`', 'schema team profile URLs'],
];

function validate(source, contracts, label) {
  const missing = contracts.filter(([marker]) => !source.includes(marker));
  if (missing.length === 0) return [];
  return missing.map(([marker, description]) => `${label}: ${description} (${marker})`);
}

const failures = [
  ...validate(page, pageContracts, 'district page'),
  ...validate(seo, seoContracts, 'district SEO'),
];

if (failures.length > 0) {
  console.error('[football-district-contract] FAIL');
  console.error('A durable district-page capability was removed or renamed:');
  for (const failure of failures) console.error(`- ${failure}`);
  console.error('\nEditorial wording is intentionally not part of this contract.');
  process.exit(1);
}

console.log(`[football-district-contract] PASS ${pageContracts.length + seoContracts.length} durable contracts.`);
