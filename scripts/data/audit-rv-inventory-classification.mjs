import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const seedFiles = [
  ['hill-country', 'src/data/rv-parks/hill-country.ts'],
  ['gulf-coast', 'src/data/rv-parks/gulf-coast.ts'],
  ['piney-woods-east-texas', 'src/data/rv-parks/piney-woods-east-texas.ts'],
  ['panhandle-north-texas', 'src/data/rv-parks/panhandle-north-texas.ts'],
  ['big-bend-west-texas', 'src/data/rv-parks/big-bend-west-texas.ts'],
];

const registry = read('src/data/rv-parks/registry.server.ts');
const images = read('src/data/rv-parks/images.server.ts');

function decodeQuoted(value) {
  return JSON.parse(`"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`);
}

function parseSeeds(groupId, source) {
  const records = [];
  const row = /\[\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*,\s*"((?:\\.|[^"\\])*)"\s*,\s*"([a-z0-9][a-z0-9-]*)"(?:\s*,\s*"([a-z0-9-]+)")?\s*\]/g;
  for (const match of source.matchAll(row)) {
    records.push({
      groupId,
      name: decodeQuoted(match[1]),
      town: decodeQuoted(match[2]),
      county: decodeQuoted(match[3]),
      slug: match[4],
      regionOverride: match[5] ?? null,
    });
  }
  return records;
}

function constantNumber(source, name) {
  const match = source.match(new RegExp(`export const ${name} = (\\d+);`));
  return match ? Number(match[1]) : null;
}

function objectLiteralBody(source, constantName) {
  const marker = source.indexOf(`const ${constantName}`);
  if (marker < 0) return '';
  const equals = source.indexOf('=', marker);
  const start = source.indexOf('{', equals);
  if (equals < 0 || start < 0) return '';

  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start + 1, index);
    }
  }
  return '';
}

function keyedBlocks(objectBody) {
  const blocks = new Map();
  const keyPattern = /^\s*["']([a-z0-9][a-z0-9-]*)["']\s*:\s*\{/gm;
  for (const match of objectBody.matchAll(keyPattern)) {
    const key = match[1];
    const openingBrace = match.index + match[0].lastIndexOf('{');
    let depth = 0;
    let quote = null;
    let escaped = false;
    for (let index = openingBrace; index < objectBody.length; index += 1) {
      const char = objectBody[index];
      if (quote) {
        if (escaped) escaped = false;
        else if (char === '\\') escaped = true;
        else if (char === quote) quote = null;
        continue;
      }
      if (char === '"' || char === "'" || char === '`') {
        quote = char;
        continue;
      }
      if (char === '{' || char === '[') depth += 1;
      if (char === '}' || char === ']') {
        depth -= 1;
        if (depth === 0) {
          blocks.set(key, objectBody.slice(openingBrace, index + 1));
          break;
        }
      }
    }
  }
  return blocks;
}

function normalizeIdentity(value) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function hasAll(block, markers) {
  return Boolean(block) && markers.every((marker) => block.includes(marker));
}

function sourceComplete(block) {
  if (!hasAll(block, ['officialUrl:', 'sourceCheckedAt:', 'address:', 'managingAuthority:', 'coordinates:'])) return false;
  const coordinates = block.match(/coordinates:\s*\{\s*lat:\s*(-?\d+(?:\.\d+)?),\s*lng:\s*(-?\d+(?:\.\d+)?)/);
  if (!coordinates) return false;
  const lat = Number(coordinates[1]);
  const lng = Number(coordinates[2]);
  return Number.isFinite(lat) && Number.isFinite(lng) && lat !== 0 && lng !== 0;
}

function contentComplete(block) {
  if (!hasAll(block, ['summary:', 'bestSeason:', 'entryNote:', 'highlights:', 'body:'])) return false;
  const body = block.match(/body:\s*\[([\s\S]*?)\]\s*,?\s*}/)?.[1] ?? '';
  const paragraphs = [...body.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((match) => match[1]);
  return paragraphs.length >= 3;
}

function imageComplete(block) {
  return hasAll(block, [
    'src:',
    'sourceUrl:',
    'alt:',
    'width:',
    'height:',
    'creator:',
    'license:',
    'licenseUrl:',
    'verifiedAt',
    'actualLocation: true',
    'subjectScope:',
  ]);
}

function priorityFor(record, sourceBlock, imageBlock) {
  const publicName = /\b(state park|state natural area|national park|national recreation area|national forest|county park|municipal park|city park|army corps|coe campground)\b/i.test(record.name);
  const hasSource = Boolean(sourceBlock);
  const hasImage = Boolean(imageBlock);
  if (publicName && hasImage) return 'WAVE 1';
  if (publicName || (hasSource && hasImage)) return 'WAVE 2';
  if (hasSource || hasImage) return 'WAVE 3';
  return 'BACKLOG';
}

const seeds = seedFiles.flatMap(([groupId, file]) => parseSeeds(groupId, read(file)));
const sourceBlocks = keyedBlocks(objectLiteralBody(registry, 'SOURCE_OVERRIDES'));
const contentBlocks = keyedBlocks(objectLiteralBody(registry, 'CONTENT_OVERRIDES'));
const imageBlocks = keyedBlocks(objectLiteralBody(images, 'RV_PARK_LICENSED_IMAGES'));

const expectedSeedCount = constantNumber(registry, 'RV_PARK_SEED_COUNT');
const identityOwners = new Map();
const slugOwners = new Map();
for (const record of seeds) {
  const identity = [record.name, record.town, record.county].map(normalizeIdentity).join('|');
  identityOwners.set(identity, [...(identityOwners.get(identity) ?? []), record.slug]);
  slugOwners.set(record.slug, (slugOwners.get(record.slug) ?? 0) + 1);
}

const classifications = seeds.map((record) => {
  const sourceBlock = sourceBlocks.get(record.slug) ?? '';
  const contentBlock = contentBlocks.get(record.slug) ?? '';
  const imageBlock = imageBlocks.get(record.slug) ?? '';
  const identity = [record.name, record.town, record.county].map(normalizeIdentity).join('|');
  const duplicateIdentity = (identityOwners.get(identity)?.length ?? 0) > 1 || (slugOwners.get(record.slug) ?? 0) > 1;
  const sourceReady = sourceComplete(sourceBlock);
  const contentReady = contentComplete(contentBlock);
  const imageReady = imageComplete(imageBlock);

  let disposition;
  let robots;
  const blockers = [];
  if (duplicateIdentity) {
    disposition = 'REMOVE / CONSOLIDATE';
    robots = 'NOINDEX';
    blockers.push('duplicate exact seed identity or slug');
  } else if (sourceReady && contentReady && imageReady) {
    disposition = 'KEEP';
    robots = 'QUALITY GATE';
  } else {
    disposition = 'IMPROVE';
    robots = 'NOINDEX';
    if (!sourceReady) blockers.push('authoritative source/address/coordinates incomplete');
    if (!contentReady) blockers.push('unique RV planning copy incomplete');
    if (!imageReady) blockers.push('rights-cleared exact-location image incomplete');
  }

  return {
    slug: record.slug,
    name: record.name,
    town: record.town,
    county: record.county,
    groupId: record.groupId,
    disposition,
    robots,
    priority: disposition === 'KEEP' ? 'PUBLISHED' : priorityFor(record, sourceBlock, imageBlock),
    sourceReady,
    contentReady,
    imageReady,
    blockers,
  };
});

const summary = classifications.reduce((acc, record) => {
  const key = `${record.disposition}${record.robots === 'NOINDEX' && record.disposition === 'IMPROVE' ? ' + NOINDEX' : ''}`;
  acc[key] = (acc[key] ?? 0) + 1;
  return acc;
}, {});

const keep = classifications.filter((record) => record.disposition === 'KEEP');
const improve = classifications.filter((record) => record.disposition === 'IMPROVE');
const remove = classifications.filter((record) => record.disposition === 'REMOVE / CONSOLIDATE');
const missingSeedSlugs = [...sourceBlocks.keys(), ...contentBlocks.keys(), ...imageBlocks.keys()].filter((slug, index, all) => all.indexOf(slug) === index && !slugOwners.has(slug));

console.log(JSON.stringify({
  seedCount: seeds.length,
  expectedSeedCount,
  summary,
  sourceOverrideCount: sourceBlocks.size,
  contentOverrideCount: contentBlocks.size,
  licensedImageCount: imageBlocks.size,
  missingSeedSlugs,
}, null, 2));

if (!process.argv.includes('--summary')) {
  console.log('\nslug\tdisposition\trobots\tpriority\tcounty\tname\tblockers');
  for (const record of classifications) {
    console.log([
      record.slug,
      record.disposition,
      record.robots,
      record.priority,
      record.county,
      record.name,
      record.blockers.join('; '),
    ].join('\t'));
  }
}

const failures = [];
if (expectedSeedCount === null) failures.push('RV_PARK_SEED_COUNT constant is missing.');
else if (seeds.length !== expectedSeedCount) failures.push(`Parsed ${seeds.length} RV seeds but RV_PARK_SEED_COUNT is ${expectedSeedCount}.`);
if (missingSeedSlugs.length) failures.push(`Curation/image records reference missing seed slugs: ${missingSeedSlugs.join(', ')}`);
if (!keep.length) failures.push('No RV records satisfy the source-level KEEP contract.');
if (keep.some((record) => record.robots === 'NOINDEX')) failures.push('A KEEP record was incorrectly classified NOINDEX.');
if (improve.some((record) => record.robots !== 'NOINDEX')) failures.push('Every thin-but-valid IMPROVE record must remain NOINDEX until independently ready.');
if (remove.some((record) => record.robots !== 'NOINDEX')) failures.push('REMOVE / CONSOLIDATE candidates must remain NOINDEX.');

if (failures.length) {
  console.error('\nRV inventory classification audit failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`\nRV inventory classification passed: ${classifications.length} records classified; ${keep.length} KEEP candidates remain subject to the existing destination quality audit, ${improve.length} are IMPROVE + NOINDEX until ready, and ${remove.length} exact-identity duplicates are REMOVE / CONSOLIDATE candidates. Priority waves use only defensible repository signals (public-land naming, authoritative-source work already present, and rights-cleared exact-location imagery); no demand, amenity, price or distance claims are inferred.`);
