#!/usr/bin/env node
/**
 * Durable editorial-fact contract for the Angelina National Forest and
 * Stephen F. Austin Experimental Forest authority pages.
 *
 * Reconciles conflicting federal sources without silently treating a
 * 2024-expired forest order or an older acreage figure as current.
 * This static release check complements (never replaces) live-source probes.
 */
import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';

const file = readFileSync(
  new URL('../../src/data/nacogdoches-san-augustine-forest-destinations.ts', import.meta.url),
  'utf8',
);
const id = slug => '"id": "nac-san-forest-20261012-' + slug + '"';
function section(slug, nextSlug) {
  const first = file.indexOf(id(slug));
  const last = file.indexOf(id(nextSlug), first);
  assert(first !== -1 && last > first, 'Expected destination section: ' + slug);
  return file.slice(first, last);
}
const angelina = section('angelina-national-forest', 'stephen-f-austin-experimental-forest');
const sfa = section('stephen-f-austin-experimental-forest', 'aldridge-sawmill-ruins');

function has(source, fragment, label) {
  assert(source.includes(fragment), 'Missing factual/editorial guard: ' + label);
}
function lacks(source, fragment, label) {
  assert(!source.includes(fragment), 'Deprecated content reintroduced: ' + label);
}

// March 2025 Forest Service Fingertip Facts acreage, with an explicit
// contrasting federal Recreation.gov campground listing (NOT silently chosen).
has(angelina, '153,334-acre federal Piney Woods forest', 'new dated acreage in synopsis');
has(angelina, '153,334 acres in four counties', 'acreage in summary highlights');
has(angelina, 'Angelina (58,684), Jasper (21,023), San Augustine (64,389) and Nacogdoches (9,238)', 'county acreage breakdown');
has(angelina, '153,179', 'disclosed conflicting federal acreage');
has(angelina, 'National%20Forests%20and%20Grasslands%20Fingertip%20Facts_03262025_0.pdf', '2025 dated USDA primary factsheet');
has(angelina, 'https://www.recreation.gov/camping/campgrounds/10158892', 'federal Recreation.gov conflicting figure citation');
has(angelina, 'https://www.fs.usda.gov/r08/texas', 'current official Forest Service Texas homepage');
has(angelina, 'https://www.recreation.gov/camping/campgrounds/233239', 'Boykin Springs road access source');
has(angelina, 'the federally published Recreation.gov coordinates', 'mapping-point accuracy caution');
has(angelina, 'Forest Road 313', 'signed forest entrance route');
lacks(angelina, 'field_rec_forest_target_id=All&page=549', 'non-specific deep-paginated visitor FAQ citation');

// Trail map vs USDA description must remain explicit; do not invent a
// resolution of the conflicting federal navigation figures.
has(sfa, '0.8-mile Jack Creek', '0.8-mile paved Jack Creek description');
has(sfa, 'Management Loop', 'distinct natural-surface Management Loop');
has(sfa, '1.5 miles', 'detailed map distance');
has(sfa, '2.0 miles', 'conflicting description');
has(sfa, 'srs-SFAEF_Trails.pdf', 'official detailed USDA trail map');
has(sfa, 'December 31, 2024', 'expired Forest Orders caution');
has(sfa, 'https://www.fs.usda.gov/r08/texas/alerts', 'current federal closure-order page');
lacks(sfa, 'https://www.fs.usda.gov/r08/texas/about-area/closure-orders', '404 closure URL');
lacks(sfa, 'allow more for the industrial ruins hike', 'unrelated industrial ruins in SFA trail visit');
has(sfa, 'srs-sfaef-bridge.jpg', 'authentic original-location USDA photo');
has(sfa, '"width": 800', 'preserved honest native image width');

for (const migration of [
  '20261014023500_sfa_forest_current_alerts_source.sql',
  '20261014023800_angelina_forest_2025_factsheet_sources.sql',
]) {
  const sql = readFileSync(
    new URL('../../supabase/migrations/' + migration, import.meta.url), 'utf8',
  );
  has(sql, 'ON CONFLICT', 'idempotent source-check enrollment in ' + migration);
  has(sql, 'td_authority_verification_sources', 'source registry enrollment in ' + migration);
}
console.log(JSON.stringify({
  status: 'PASS',
  checks: ['Angelina current area and conflicting source', 'SFA trail conflict and expired orders', 'verified 800px original USDA photo', 'idempotent scheduled source enrollment'],
}));
