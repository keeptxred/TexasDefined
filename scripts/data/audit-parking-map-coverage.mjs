import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const majorVenueFile = path.join(root, 'src/data/knowledge-graph/major-sports-venues.ts');
const tier2VenueFile = path.join(root, 'src/data/knowledge-graph/sports-venues-tier2.ts');
const dataDir = path.join(root, 'src/data');

const normalize = (value) => value
  .normalize('NFKD')
  .toLowerCase()
  .replace(/[’']/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim()
  .replace(/\s+/g, ' ');

function sourceFile(file) {
  return ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

function literal(node) {
  return ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) ? node.text : undefined;
}

function findVariableInitializer(file, variableName) {
  const source = sourceFile(file);
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === variableName) return declaration.initializer;
    }
  }
  return undefined;
}

function readVenueSeeds(file) {
  const initializer = findVariableInitializer(file, 'seeds');
  if (!initializer || !ts.isArrayLiteralExpression(initializer)) return [];
  return initializer.elements.flatMap((row) => {
    if (!ts.isArrayLiteralExpression(row) || row.elements.length < 6) return [];
    const name = literal(row.elements[0]);
    const slug = literal(row.elements[1]);
    const countySlug = literal(row.elements[2]);
    const region = literal(row.elements[3]);
    const officialUrl = literal(row.elements[4]);
    const aliasesNode = row.elements[5];
    if (!name || !slug || !countySlug || !region || !officialUrl || !ts.isArrayLiteralExpression(aliasesNode)) return [];
    return [{
      name,
      slug,
      countySlug,
      region,
      officialUrl,
      aliases: aliasesNode.elements.map(literal).filter(Boolean),
      source: path.relative(root, file),
    }];
  });
}

function duplicatesBy(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!key) continue;
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  return [...groups.entries()].filter(([, list]) => list.length > 1);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function readParkingMapRecords() {
  const records = [];
  const batchFiles = fs.readdirSync(dataDir)
    .filter((name) => /^parking-maps-batch\d+\.ts$/i.test(name))
    .sort()
    .map((name) => path.join(dataDir, name));

  for (const file of batchFiles) {
    const source = sourceFile(file);
    for (const statement of source.statements) {
      if (!ts.isVariableStatement(statement)) continue;
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !/^VENUE_PARKING_MAPS_BATCH_/i.test(declaration.name.text)) continue;
        if (!declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
        for (const property of declaration.initializer.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          const slug = ts.isStringLiteral(property.name) || ts.isIdentifier(property.name) ? property.name.text : undefined;
          if (!slug || !ts.isObjectLiteralExpression(property.initializer)) continue;
          let imageUrl;
          let venueSlug;
          let id;
          for (const field of property.initializer.properties) {
            if (!ts.isPropertyAssignment(field)) continue;
            const key = ts.isIdentifier(field.name) || ts.isStringLiteral(field.name) ? field.name.text : undefined;
            if (key === 'imageUrl') imageUrl = literal(field.initializer);
            if (key === 'venueSlug') venueSlug = literal(field.initializer);
            if (key === 'id') id = literal(field.initializer);
          }
          records.push({ slug, venueSlug, imageUrl, id, file: path.relative(root, file) });
        }
      }
    }
  }
  return records;
}

function readEventVenuePairs() {
  const pairs = new Map();
  const files = walk(dataDir).filter((file) => /major-event.*authority.*\.server\.ts$/i.test(path.basename(file)));
  for (const file of files) {
    const source = sourceFile(file);
    const visit = (node) => {
      if (ts.isObjectLiteralExpression(node)) {
        let slug;
        let venue;
        for (const property of node.properties) {
          if (!ts.isPropertyAssignment(property)) continue;
          const key = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : undefined;
          if (key === 'slug') slug = literal(property.initializer);
          if (key === 'venue') venue = literal(property.initializer);
        }
        if (slug && venue) pairs.set(slug, venue);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }
  return pairs;
}

function isAreaOrRouteVenue(name) {
  return /\bdowntown\b|\bvenues\b|\bparade routes?\b|\bmultiple\b|\bisland event areas?\b|\bfestival halls?\b/i.test(name)
    || /^(Austin|Marfa|Turkey), Texas$/i.test(name);
}

const rawVenues = [
  ...readVenueSeeds(majorVenueFile),
  ...readVenueSeeds(tier2VenueFile),
  { name: 'Reliant Stadium', slug: 'reliant-stadium', aliases: ['NRG Stadium'], source: 'audit supplemental canonical venue' },
];
const duplicateVenueSlugs = duplicatesBy(rawVenues, (venue) => venue.slug);
const conflictingDuplicateVenueSlugs = duplicateVenueSlugs.filter(([, items]) => {
  const identities = new Set(items.map((venue) => [
    normalize(venue.name),
    venue.countySlug ?? '',
    venue.region ?? '',
    venue.officialUrl ?? '',
  ].join('|')));
  return identities.size > 1;
});
const venues = rawVenues.filter((venue, index, all) => all.findIndex((candidate) => candidate.slug === venue.slug) === index);

const parkingMapRecordList = readParkingMapRecords();
const duplicateParkingMapSlugs = duplicatesBy(parkingMapRecordList, (record) => record.slug);
const duplicateParkingMapIds = duplicatesBy(parkingMapRecordList, (record) => record.id);
const parkingMapRecords = new Map(parkingMapRecordList.map((record) => [record.slug, record]));
const parkingMapSlugs = new Set(parkingMapRecords.keys());
const canonicalSlugs = new Set(venues.map((venue) => venue.slug));
const exactVenueIndex = new Map();
for (const venue of venues) {
  for (const label of [venue.name, ...venue.aliases]) {
    const key = normalize(label);
    if (!key) continue;
    const existing = exactVenueIndex.get(key);
    exactVenueIndex.set(key, existing && existing !== venue.slug ? null : venue.slug);
  }
}

const malformedRecords = parkingMapRecordList.filter((record) => record.venueSlug !== record.slug || !record.imageUrl || !record.id);
const missingAssets = parkingMapRecordList.filter((record) => {
  if (!record.imageUrl?.startsWith('/')) return true;
  return !fs.existsSync(path.join(root, 'public', record.imageUrl.slice(1)));
});
const unknownVenueMapRecords = parkingMapRecordList.filter((record) => !canonicalSlugs.has(record.slug));
const missingVenueMaps = venues.filter((venue) => !parkingMapSlugs.has(venue.slug));
const mappedVenueMaps = venues.filter((venue) => parkingMapSlugs.has(venue.slug));
const events = readEventVenuePairs();
const inheritedEvents = [];
const eventsMissingMappedVenueMap = [];
const eventOnlyVenues = new Map();

for (const [eventSlug, venueName] of events) {
  const venueSlug = exactVenueIndex.get(normalize(venueName));
  if (venueSlug && parkingMapSlugs.has(venueSlug)) inheritedEvents.push({ eventSlug, venueName, venueSlug });
  else if (venueSlug) eventsMissingMappedVenueMap.push({ eventSlug, venueName, venueSlug });
  else {
    const list = eventOnlyVenues.get(venueName) ?? [];
    list.push(eventSlug);
    eventOnlyVenues.set(venueName, list);
  }
}

const areaOrRouteEvents = [...eventOnlyVenues.entries()].filter(([name]) => isAreaOrRouteVenue(name));
const fixedEventOnlyVenues = [...eventOnlyVenues.entries()].filter(([name]) => !isAreaOrRouteVenue(name));

console.log(`Canonical sports venues: ${venues.length}`);
console.log(`Venue parking maps registered: ${mappedVenueMaps.length}`);
console.log(`Canonical venue maps missing: ${missingVenueMaps.length}`);
console.log(`Major-event records discovered: ${events.size}`);
console.log(`Events inheriting a registered venue map: ${inheritedEvents.length}`);
console.log(`Events mapped to a canonical venue whose map is still missing: ${eventsMissingMappedVenueMap.length}`);
console.log(`Event-only fixed venue names requiring parking-map review: ${fixedEventOnlyVenues.length}`);
console.log(`Event-only area/route/multi-site patterns requiring event-specific parking treatment: ${areaOrRouteEvents.length}`);
console.log(`Canonical seed slug overlaps: ${duplicateVenueSlugs.length}`);
console.log(`Conflicting canonical venue slugs: ${conflictingDuplicateVenueSlugs.length}`);
console.log(`Duplicate parking-map slugs: ${duplicateParkingMapSlugs.length}`);
console.log(`Duplicate parking-map IDs: ${duplicateParkingMapIds.length}`);
console.log(`Unknown/non-canonical venue map records: ${unknownVenueMapRecords.length}`);
console.log(`Malformed parking-map records: ${malformedRecords.length}`);
console.log(`Parking-map records with missing assets: ${missingAssets.length}`);

if (missingVenueMaps.length) {
  console.log('\nMissing canonical venue maps:');
  for (const venue of missingVenueMaps) console.log(`- ${venue.slug} — ${venue.name}`);
}
if (fixedEventOnlyVenues.length) {
  console.log('\nEvent-only fixed venues requiring review:');
  for (const [venueName, eventSlugs] of fixedEventOnlyVenues.sort(([a], [b]) => a.localeCompare(b))) console.log(`- ${venueName}: ${eventSlugs.join(', ')}`);
}
if (areaOrRouteEvents.length) {
  console.log('\nArea/route/multi-site events requiring event-specific parking treatment:');
  for (const [venueName, eventSlugs] of areaOrRouteEvents.sort(([a], [b]) => a.localeCompare(b))) console.log(`- ${venueName}: ${eventSlugs.join(', ')}`);
}

function printDuplicateGroups(label, groups) {
  if (!groups.length) return;
  console.error(`\n${label}:`);
  for (const [key, items] of groups) console.error(`- ${key}: ${items.map((item) => item.file ?? item.source ?? item.name).join(', ')}`);
}

printDuplicateGroups('Conflicting canonical venue slugs', conflictingDuplicateVenueSlugs);
printDuplicateGroups('Duplicate parking-map slugs', duplicateParkingMapSlugs);
printDuplicateGroups('Duplicate parking-map IDs', duplicateParkingMapIds);
if (unknownVenueMapRecords.length) console.error('\nUnknown/non-canonical venue map records:', unknownVenueMapRecords);
if (malformedRecords.length) console.error('\nMalformed records:', malformedRecords);
if (missingAssets.length) console.error('\nMissing parking-map assets:', missingAssets);

const registryFailures = conflictingDuplicateVenueSlugs.length
  || duplicateParkingMapSlugs.length
  || duplicateParkingMapIds.length
  || unknownVenueMapRecords.length
  || malformedRecords.length
  || missingAssets.length;
if (registryFailures) process.exitCode = 1;
if (process.argv.includes('--strict') && (missingVenueMaps.length || eventsMissingMappedVenueMap.length || eventOnlyVenues.size)) process.exitCode = 1;
