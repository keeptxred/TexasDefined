/**
 * Exhaustive source-backed GitHub refresh inventory for TexasDefined event routes.
 *
 * The daily catalog sync owns Ticketmaster/TPWD/verified upcoming sessions.
 * The daily temporal verifier owns rolling weekend, month and collection pages.
 * This inventory covers EVERY permanent /event/:slug guide in the index and
 * supplemental tranche registry, plus separately routed event/holiday guides.
 *
 * Organizer HTTP reachability is NOT evidence of new dates or an editorial
 * recheck; never update sourceCheckedAt, occurrence dates, tickets or sitemap
 * eligibility from a successful GET alone.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dataDirectory = 'src/data';
const supplementalPath = 'src/data/major-event-supplemental-registry.server.ts';

export const STATIC_EVENT_PAGES = [
  { path: '/texas-state-fair', sourceUrl: 'https://bigtex.com/', kind: 'seasonal', startDate: '2027-09-01', endDate: '2027-10-31', note: '2027 occurrence must not be claimed without official confirmation' },
  { path: '/holiday/enchant-christmas-arlington', sourceUrl: 'https://www.enchantchristmas.com/', kind: 'announcement-pending' },
  { path: '/holiday/magical-winter-lights', sourceUrl: 'https://tickets.magicalwinterlights.com/contact.aspx', kind: 'announcement-pending' },
];

export const DEDICATED_EVENT_REFRESHES = [
  { path: '/events', workflow: 'sync-texas-events.yml', cadenceDays: 1 },
  { path: '/events/air-shows', workflow: 'event-authority-source-refresh.yml', cadenceDays: 1, permanentSources: true },
  { path: '/events/mardi-gras', workflow: 'sync-texas-events.yml', cadenceDays: 1 },
  { path: '/horse-racing', workflow: 'horse-racing-calendar-freshness.yml', cadenceDays: 7 },
  { path: '/horse-racing/:slug', workflow: 'horse-racing-calendar-freshness.yml', cadenceDays: 7 },
];

const read = (root, relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const propertyName = (name) => ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : undefined;
const objectField = (object, field) => object.properties.find(prop =>
  ts.isPropertyAssignment(prop) && propertyName(prop.name) === field)?.initializer;

function extractRecords(root, relative) {
  const source = read(root, relative);
  const ast = ts.createSourceFile(relative, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const constants = new Map();
  const findConstants = node => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer &&
        (ts.isStringLiteral(node.initializer) || ts.isNoSubstitutionTemplateLiteral(node.initializer))) {
      constants.set(node.name.text, node.initializer.text);
    }
    ts.forEachChild(node, findConstants);
  };
  findConstants(ast);
  const literal = (node) => {
    if (!node) return undefined;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isIdentifier(node)) return constants.get(node.text);
    return undefined;
  };
  const records = [];
  const walk = node => {
    if (ts.isObjectLiteralExpression(node)) {
      const slug = literal(objectField(node, 'slug'));
      const url = literal(objectField(node, 'officialUrl'));
      const startDate = literal(objectField(node, 'startDate'));
      const sourceCheckedAt = literal(objectField(node, 'sourceCheckedAt'));
      if (slug && (url || startDate || sourceCheckedAt)) {
        records.push({ slug, sourceUrl: url ?? null, startDate: startDate ?? null,
          endDate: literal(objectField(node, 'endDate')) ?? null,
          sourceCheckedAt: sourceCheckedAt ?? null, file: relative });
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(ast);
  return records;
}

function collectCollectionPaths(root, relative) {
  const ast = ts.createSourceFile(relative, read(root, relative), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const paths = [];
  const walk = node => {
    if (ts.isObjectLiteralExpression(node)) {
      const val = objectField(node, 'path');
      if (val && ts.isStringLiteral(val) && val.text.startsWith('/events/')) paths.push(val.text);
    }
    ts.forEachChild(node, walk);
  };
  walk(ast);
  return [...new Set(paths)];
}

function supplementarySlugs(root) {
  const s = read(root, supplementalPath);
  const match = s.match(/supplementalMajorEventSlugs\s*=\s*\[([\s\S]*?)\]\s*as const/);
  if (!match) throw new Error('Cannot enumerate permanent event supplemental slugs');
  return [...new Set([...match[1].matchAll(/"([a-z0-9-]+)"/g)].map(x => x[1]))];
}

export function refreshCadenceDays(event, asOf = new Date()) {
  if (event.kind === 'announcement-pending') return 7;
  const utcDay = Math.floor(Date.parse(asOf.toISOString().slice(0, 10) + 'T00:00:00Z') / 86400000);
  const start = event.startDate ? Math.floor(Date.parse(event.startDate + 'T00:00:00Z') / 86400000) : NaN;
  const end = event.endDate ? Math.floor(Date.parse(event.endDate + 'T00:00:00Z') / 86400000) : start;
  if (!Number.isFinite(start)) return 30;
  if (start <= utcDay && end >= utcDay) return 1; // Event in progress
  const daysUntil = start - utcDay;
  if (daysUntil > 0 && daysUntil <= 14) return 1;
  if (daysUntil > 14 && daysUntil <= 90) return 3;
  if (daysUntil > 90 && daysUntil <= 365) return 7;
  if (end < utcDay && utcDay - end <= 30) return 7; // Post-event correction window
  return 30; // Long-range and old editions need announcement recheck, not date guesses
}

export function dueForReview(event, asOf = new Date()) {
  const cadence = refreshCadenceDays(event, asOf);
  if (cadence === 1) return true;
  const day = Math.floor(Date.parse(asOf.toISOString().slice(0, 10) + 'T00:00:00Z') / 86400000);
  let hash = 2166136261;
  for (const char of event.path) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  return day % cadence === hash % cadence;
}

export function collectEventPageRefreshInventory(root = ROOT) {
  const sources = fs.readdirSync(path.join(root, dataDirectory))
    .filter(file => file === 'major-event-index.ts' || /^major-event-expanded-authority-tranche\d+\.server\.ts$/.test(file))
    .map(file => path.join(dataDirectory, file));
  const records = new Map();
  const duplicateSlugs = new Set();
  for (const relative of sources) for (const row of extractRecords(root, relative)) {
    if (records.has(row.slug)) duplicateSlugs.add(row.slug);
    // The base client index takes precedence when duplicate supplemental
    // detail rows exist; otherwise retain the first resolved server record.
    if (!records.has(row.slug) || (relative === 'src/data/major-event-index.ts')) {
      records.set(row.slug, row);
    }
  }
  const supplemental = supplementarySlugs(root);
  const missing = supplemental.filter(slug => !records.has(slug));
  const permanent = [...records.values()].map(event => ({
    ...event, path: '/event/' + event.slug, kind: 'permanent',
  }));
  const missingSources = permanent.filter(event =>
    !event.sourceUrl || !/^https:\/\//i.test(event.sourceUrl)).map(event => event.path);
  const collectionPaths = [
    ...collectCollectionPaths(root, 'src/data/event-collections.ts'),
    ...collectCollectionPaths(root, 'src/data/event-temporal-collections.server.ts'),
  ];
  const collections = [...new Set(collectionPaths)].map(p => ({
    path: p, kind: 'collection', cadenceDays: 1, workflow: 'verify-event-temporal-production.yml',
  }));
  const specials = STATIC_EVENT_PAGES.map(event => ({ ...event, kind: event.kind, sourceCheckedAt: null }));
  const routes = fs.readdirSync(path.join(root, 'src/routes'))
    .filter(file => /^(?:events?|holiday)\.|^texas-state-fair(?:\.|$)|^horse-racing(?:_|\.)/.test(file))
    .filter(file => /\.tsx$/.test(file) && !/\.lazy\.tsx$/.test(file));
  const covered = new Set([
    'events.tsx', 'events.index.tsx', 'events.$collection.tsx',
    'events.air-shows.tsx', 'events.mardi-gras.tsx', 'event.$slug.tsx',
    'holiday.enchant-christmas-arlington.tsx', 'holiday.magical-winter-lights.tsx',
    'texas-state-fair.tsx', 'horse-racing.tsx', 'horse-racing_.$slug.tsx',
  ]);
  const uncoveredRoutes = routes.filter(file => !covered.has(file));
  return { permanent, collections, specials, dedicated: DEDICATED_EVENT_REFRESHES,
    uncoveredRoutes, missing, missingSources, duplicateSlugs: [...duplicateSlugs], sourceFiles: sources };
}

export function validateEventRefreshCoverage(inventory) {
  const errors = [];
  if (!inventory.permanent.length) errors.push('No permanent event guides found');
  if (!inventory.collections.length) errors.push('No event collection pages found');
  for (const slug of inventory.missing) errors.push('Uncovered supplemental event /event/' + slug);
  for (const route of inventory.uncoveredRoutes) errors.push('Uncovered event route src/routes/' + route);
  for (const p of inventory.missingSources) errors.push('Missing organizer HTTPS source for ' + p);
  const covered = new Set();
  for (const e of [...inventory.permanent, ...inventory.collections, ...inventory.specials, ...inventory.dedicated]) {
    if (!e.path?.startsWith('/')) errors.push('Invalid event URL path: ' + String(e.path));
    covered.add(e.path);
  }
  for (const p of ['/events', '/events/air-shows', '/events/mardi-gras', '/texas-state-fair',
    '/holiday/enchant-christmas-arlington', '/holiday/magical-winter-lights']) {
    if (!covered.has(p)) errors.push('Missing explicit event coverage: ' + p);
  }
  return errors;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const inventory = collectEventPageRefreshInventory();
  const errors = validateEventRefreshCoverage(inventory);
  const stats = { permanentGuides: inventory.permanent.length,
    collections: inventory.collections.length, staticPages: inventory.specials.length,
    dedicatedRoutes: inventory.dedicated.length, sourceFiles: inventory.sourceFiles.length,
    missingSources: inventory.missingSources.length, uncoveredRoutes: inventory.uncoveredRoutes.length,
    missingSupplemental: inventory.missing.length };
  console.log('Event page refresh coverage:', JSON.stringify(stats));
  for (const e of errors) console.error('EVENT-REFRESH-COVERAGE: ' + e);
  if (errors.length) process.exitCode = 1;
}
