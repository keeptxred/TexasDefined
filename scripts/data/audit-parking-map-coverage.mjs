import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const root = process.cwd();
const majorVenueFile = path.join(root, 'src/data/knowledge-graph/major-sports-venues.ts');
const tier2VenueFile = path.join(root, 'src/data/knowledge-graph/sports-venues-tier2.ts');
const parkingMapFile = path.join(root, 'src/data/parking-maps.ts');
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
    const aliasesNode = row.elements[5];
    if (!name || !slug || !ts.isArrayLiteralExpression(aliasesNode)) return [];
    return [{ name, slug, aliases: aliasesNode.elements.map(literal).filter(Boolean) }];
  });
}

function readParkingMapSlugs() {
  const initializer = findVariableInitializer(parkingMapFile, 'venueParkingMaps');
  if (!initializer || !ts.isObjectLiteralExpression(initializer)) return new Set();
  return new Set(initializer.properties.flatMap((property) => {
    if (!ts.isPropertyAssignment(property)) return [];
    if (ts.isStringLiteral(property.name) || ts.isIdentifier(property.name)) return [property.name.text];
    return [];
  }));
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
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

const venues = [
  ...readVenueSeeds(majorVenueFile),
  ...readVenueSeeds(tier2VenueFile),
  { name: 'Reliant Stadium', slug: 'reliant-stadium', aliases: ['NRG Stadium'] },
].filter((venue, index, all) => all.findIndex((candidate) => candidate.slug === venue.slug) === index);

const parkingMapSlugs = readParkingMapSlugs();
const exactVenueIndex = new Map();
for (const venue of venues) {
  for (const label of [venue.name, ...venue.aliases]) {
    const key = normalize(label);
    if (!key) continue;
    const existing = exactVenueIndex.get(key);
    exactVenueIndex.set(key, existing && existing !== venue.slug ? null : venue.slug);
  }
}

const missingVenueMaps = venues.filter((venue) => !parkingMapSlugs.has(venue.slug));
const mappedVenueMaps = venues.filter((venue) => parkingMapSlugs.has(venue.slug));
const events = readEventVenuePairs();
const inheritedEvents = [];
const eventsMissingMappedVenueMap = [];
const eventOnlyVenues = new Map();

for (const [eventSlug, venueName] of events) {
  const venueSlug = exactVenueIndex.get(normalize(venueName));
  if (venueSlug && parkingMapSlugs.has(venueSlug)) {
    inheritedEvents.push({ eventSlug, venueName, venueSlug });
  } else if (venueSlug) {
    eventsMissingMappedVenueMap.push({ eventSlug, venueName, venueSlug });
  } else {
    const list = eventOnlyVenues.get(venueName) ?? [];
    list.push(eventSlug);
    eventOnlyVenues.set(venueName, list);
  }
}

console.log(`Canonical sports venues: ${venues.length}`);
console.log(`Venue parking maps registered: ${mappedVenueMaps.length}`);
console.log(`Canonical venue maps missing: ${missingVenueMaps.length}`);
console.log(`Major-event records discovered: ${events.size}`);
console.log(`Events inheriting a registered venue map: ${inheritedEvents.length}`);
console.log(`Events mapped to a canonical venue whose map is still missing: ${eventsMissingMappedVenueMap.length}`);
console.log(`Event-only venue names requiring their own parking-map review: ${eventOnlyVenues.size}`);

if (missingVenueMaps.length) {
  console.log('\nMissing canonical venue maps:');
  for (const venue of missingVenueMaps) console.log(`- ${venue.slug} — ${venue.name}`);
}

if (eventOnlyVenues.size) {
  console.log('\nEvent-only venues requiring review:');
  for (const [venueName, eventSlugs] of [...eventOnlyVenues.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    console.log(`- ${venueName}: ${eventSlugs.join(', ')}`);
  }
}

if (process.argv.includes('--strict') && (missingVenueMaps.length || eventsMissingMappedVenueMap.length || eventOnlyVenues.size)) {
  process.exitCode = 1;
}
