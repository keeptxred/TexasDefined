import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const source = read('src/data/knowledge-graph/golf-course-starter.server.ts');
const serverFunctions = read('src/data/golf-course-starter.functions.ts');
const seed = read('src/data/knowledge-graph/seed.ts');
const knowledgeGraph = read('src/data/knowledge-graph/index.ts');
const countyRoute = read('src/routes/$kind.$slug.tsx');
const countySports = read('src/components/sports/CountySportsDestinations.tsx');
const landingRoute = read('src/routes/sports-venues.$landing.tsx');
const search = read('src/data/sports-venue-search.ts');
const relationships = read('src/data/knowledge-graph/relationships.ts');

const fail = (message) => { throw new Error(`[golf-course-directory] ${message}`); };
const rawMatch = source.match(/const raw = `([\s\S]*?)`;/);
if (!rawMatch) fail('starter raw inventory is missing');
const rows = rawMatch[1].trim().split('\n').filter(Boolean);
if (rows.length !== 250) fail(`expected 250 starter rows; found ${rows.length}`);

const ordinals = new Set();
const names = new Set();
const slugs = new Set();
for (const row of rows) {
  const [ordinalText, name, city] = row.split('|');
  const ordinal = Number(ordinalText);
  if (!Number.isInteger(ordinal) || ordinal < 1 || ordinal > 250) fail(`invalid ordinal in ${row}`);
  if (ordinals.has(ordinal)) fail(`duplicate ordinal ${ordinal}`);
  ordinals.add(ordinal);
  if (!name?.trim() || !city?.trim()) fail(`invalid course row ${row}`);
  const nameCity = `${name.trim()}|${city.trim()}`.toLowerCase();
  if (names.has(nameCity)) fail(`duplicate course/city ${name} (${city})`);
  names.add(nameCity);
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (slugs.has(slug)) fail(`duplicate course slug ${slug}`);
  slugs.add(slug);
}
for (let ordinal = 1; ordinal <= 250; ordinal += 1) if (!ordinals.has(ordinal)) fail(`missing ordinal ${ordinal}`);

for (const marker of [
  "const existing = new Set(['Memorial Park Golf Course', 'Colonial Country Club']);",
  ".filter((course) => !course.existingEntity)",
  "tags: ['sports-venue', 'golf', 'golf-course', 'starter-golf-directory'",
  "href: `/sports-venue/${slug}`",
]) if (!source.includes(marker)) fail(`starter inventory contract missing: ${marker}`);

for (const marker of [
  "await import('./knowledge-graph/golf-course-starter.server')",
  'getGolfCourseStarterDirectoryData',
  'getGolfCourseStarterEntity',
  'getGolfCourseStarterEntitiesForCounty',
]) if (!serverFunctions.includes(marker)) fail(`server-only golf boundary missing: ${marker}`);

if (seed.includes('TEXAS_GOLF_COURSE_STARTER_ENTITIES') || seed.includes('golf-course-starter')) {
  fail('starter golf inventory must not be registered in the monolithic client knowledge-graph seed');
}
if (!knowledgeGraph.includes('getGolfCourseStarterEntity')) fail('individual starter course resolution is not wired through the server function');

for (const marker of [
  'getGolfCourseStarterEntitiesForCounty',
  '...starterGolfVenues',
]) if (!countyRoute.includes(marker)) fail(`county golf server overlay missing: ${marker}`);
for (const marker of [
  'Golf courses in {county.name}',
  '#golf-courses',
  'first-party address verification remains the publication gate',
  'Browse the statewide Texas golf directory',
]) if (!countySports.includes(marker)) fail(`county golf section missing: ${marker}`);

for (const marker of [
  'getGolfCourseStarterDirectoryData',
  "landing.slug === 'golf' && venue.tags?.includes('starter-golf-directory')",
  'Texas Golf Courses: 250+ Courses by County & Region',
  'starterInventoryCount',
  'Starter course pages are crawlable for site navigation but intentionally noindex',
]) if (!landingRoute.includes(marker)) fail(`statewide golf landing contract missing: ${marker}`);

for (const marker of [
  'Texas Golf Courses: 250+ Courses by County & Region',
  'Texas golf course directory',
]) if (!search.includes(marker)) fail(`search discovery contract missing: ${marker}`);
if (search.includes('golf-course-starter') || search.includes('TEXAS_GOLF_COURSE_STARTER_RECORDS') || search.includes('TEXAS_GOLF_COURSE_STARTER_ENTITIES')) {
  fail('client search must not import starter golf inventory into the monolithic main bundle');
}

for (const marker of [
  'if (!hasEntitySpecificOfficialUrl(entity)) return false;',
  "if (!['active', 'seasonal'].includes(entity.status)) return false;",
]) if (!relationships.includes(marker)) fail(`individual-page index gate weakened or missing: ${marker}`);

console.log('Golf course directory validation passed: 250 unique starter courses, server-only inventory overlay, county/statewide discovery, collection search discovery, and individual verification gate preserved.');
