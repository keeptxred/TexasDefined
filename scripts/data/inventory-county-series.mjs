import fs from 'node:fs';
import path from 'node:path';

const serverPath = path.resolve('src/data/county-series.server.ts');
const placesPath = path.resolve('src/data/texas-places.ts');
const outputPath = process.argv[2] || '/tmp/county-profiles.tsv';
const reportPath = outputPath.replace(/\.tsv$/i, '.json');
const MIN_EDITORIAL_WORDS = 700;
const MIN_PARAGRAPHS = 10;
const MIN_HEADINGS = 4;
const FORBIDDEN_COPY = [
  'will expand as additional local sources are verified',
  'This county guide is being expanded',
  'We are adding verified details before expanding this page into a full guide',
  'Story unavailable',
  'County unavailable',
];

const read = (file) => fs.readFileSync(file, 'utf8');
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function expectedCounties() {
  const source = read(placesPath);
  const match = source.match(/const COUNTY_NAMES\s*=\s*`([^`]+)`\.split\(['"]\|['"]\)/);
  if (!match) throw new Error('Could not parse canonical COUNTY_NAMES from src/data/texas-places.ts');
  const names = match[1].split('|').map((name) => name.trim()).filter(Boolean);
  if (names.length !== 254) throw new Error(`Expected 254 canonical Texas counties; found ${names.length}`);
  return names.map((name) => ({ name: `${name} County`, baseName: name, slug: slugify(name) }));
}

function activeRegistryFiles() {
  const source = read(serverPath);
  const imports = new Map();
  for (const match of source.matchAll(/import\s*\{\s*([A-Z0-9_]+)\s*\}\s*from\s*["']@\/data\/(county-series-profiles[^"']*)["']/g)) {
    imports.set(match[1], path.resolve(`src/data/${match[2]}.ts`));
  }
  const list = source.match(/const countySeriesProfiles\s*=\s*\[([\s\S]*?)\n\];/)?.[1];
  if (!list) throw new Error('Could not parse countySeriesProfiles precedence list from county-series.server.ts');
  const files = [];
  for (const match of list.matchAll(/\.\.\.([A-Z0-9_]+)/g)) {
    const file = imports.get(match[1]);
    if (!file) throw new Error(`County series registry spread has no matching import: ${match[1]}`);
    files.push({ exportName: match[1], file });
  }
  if (!files.length) throw new Error('County series server returned zero active registry files');
  return files;
}

const helperProfilePattern = /profile\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']\s*,\s*\(\)\s*=>\s*import\(\s*["']@\/data\/fixtures\/([^"']+)["']\s*\)\.then\(\(module\)\s*=>\s*module\.([A-Za-z0-9_]+)\)\s*\)/g;
const objectProfilePattern = /countySlug\s*:\s*["']([^"']+)["'][\s\S]*?articleSlug\s*:\s*["']([^"']+)["'][\s\S]*?loadArticle\s*:\s*\(\)\s*=>\s*import\(\s*["']@\/data\/fixtures\/([^"']+)["']\s*\)\s*\.then\(\s*\(module\)\s*=>\s*module\.([A-Za-z0-9_]+)\s*\)/g;

function parseRegistry(registry) {
  const source = read(registry.file);
  const found = [];
  for (const pattern of [helperProfilePattern, objectProfilePattern]) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      found.push({
        index: match.index ?? 0,
        countySlug: match[1],
        articleSlug: match[2],
        fixturePath: match[3],
        exportName: match[4],
        registry: path.relative(process.cwd(), registry.file),
      });
    }
  }
  found.sort((a, b) => a.index - b.index);
  const unique = [];
  const seen = new Set();
  for (const profile of found) {
    const key = `${profile.countySlug}\u0000${profile.articleSlug}\u0000${profile.fixturePath}\u0000${profile.exportName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(profile);
  }
  if (!unique.length) throw new Error(`Active county registry returned zero profiles: ${registry.file}`);
  return unique;
}

const readStringField = (source, field) => {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*["']([^"']+)["']`));
  return match?.[1] ?? null;
};

const readNumberField = (source, field) => {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*(\\d+(?:\\.\\d+)?)`));
  return match ? Number(match[1]) : null;
};

const readHeroSource = (source, heroBlock) => {
  const stringSrc = readStringField(heroBlock, 'src');
  if (stringSrc) return stringSrc;
  const identifierMatch = heroBlock.match(/\bsrc\s*:\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*[,\n]/);
  if (!identifierMatch) return null;
  const identifier = identifierMatch[1];
  const importPattern = new RegExp(`import\\s+${identifier}\\s+from\\s+["']([^"']+)["']`);
  return source.match(importPattern)?.[1] ?? null;
};

const resolveFixtureSource = (fixture, exportName) => {
  const directExportPattern = new RegExp(`export\\s+const\\s+${escapeRegExp(exportName)}\\b`);
  const wrapperSource = read(fixture);
  if (directExportPattern.test(wrapperSource)) return { source: wrapperSource, sourcePath: fixture };

  const reExportPattern = new RegExp(
    `export\\s*\\{[^}]*\\b${escapeRegExp(exportName)}\\b[^}]*\\}\\s*from\\s*["']([^"']+)["']`,
  );
  const reExport = wrapperSource.match(reExportPattern);
  if (!reExport) throw new Error(`Missing expected export ${exportName} in ${fixture}`);

  const relativeTarget = reExport[1];
  const targetPath = path.resolve(path.dirname(fixture), relativeTarget.endsWith('.ts') ? relativeTarget : `${relativeTarget}.ts`);
  if (!fs.existsSync(targetPath)) throw new Error(`County fixture re-export target is missing: ${fixture} -> ${targetPath}`);
  const targetSource = read(targetPath);
  if (!directExportPattern.test(targetSource)) throw new Error(`Missing expected export ${exportName} in re-export target ${targetPath}`);
  return { source: targetSource, sourcePath: targetPath };
};

function editorialMetrics(source) {
  const start = source.indexOf('body: [');
  const end = source.lastIndexOf('],');
  const body = start >= 0 && end > start ? source.slice(start, end) : '';
  const words = body.match(/[A-Za-z0-9]+(?:[’'\-][A-Za-z0-9]+)*/g) ?? [];
  const paragraphCount = (body.match(/\bp\s*\(/g) ?? []).length + (body.match(/type\s*:\s*["']paragraph["']/g) ?? []).length;
  const headingCount = (body.match(/\bh\s*\(/g) ?? []).length + (body.match(/type\s*:\s*["']heading["']/g) ?? []).length;
  return { words: words.length, paragraphCount, headingCount };
}

const counties = expectedCounties();
const countyBySlug = new Map(counties.map((county) => [county.slug, county]));
const registries = activeRegistryFiles();
const definitions = registries.flatMap(parseRegistry);
const effective = new Map();
const shadowed = [];
for (const profile of definitions) {
  if (effective.has(profile.countySlug)) shadowed.push({ ignored: profile, winner: effective.get(profile.countySlug) });
  else effective.set(profile.countySlug, profile);
}

const errors = [];
const missing = counties.filter((county) => !effective.has(county.slug));
const extra = [...effective.keys()].filter((slug) => !countyBySlug.has(slug));
if (missing.length) errors.push(`Missing canonical county editorial profiles (${missing.length}): ${missing.map((county) => county.slug).join(', ')}`);
if (extra.length) errors.push(`Unknown county editorial profiles (${extra.length}): ${extra.join(', ')}`);
if (effective.size !== 254) errors.push(`Expected 254 effective county editorial profiles; found ${effective.size}`);

const rows = [];
const articleSlugs = new Set();
for (const county of counties) {
  const profile = effective.get(county.slug);
  if (!profile) continue;
  if (articleSlugs.has(profile.articleSlug)) errors.push(`Duplicate effective legacy county article slug: ${profile.articleSlug}`);
  articleSlugs.add(profile.articleSlug);

  const fixture = path.resolve(`src/data/fixtures/${profile.fixturePath}.ts`);
  if (!fs.existsSync(fixture)) {
    errors.push(`Missing county fixture: ${fixture}`);
    continue;
  }

  let resolved;
  try {
    resolved = resolveFixtureSource(fixture, profile.exportName);
  } catch (error) {
    errors.push(error.message);
    continue;
  }
  const { source, sourcePath } = resolved;
  const id = readStringField(source, 'id');
  const slug = readStringField(source, 'slug');
  const title = readStringField(source, 'title');
  const dek = readStringField(source, 'dek');
  const readingMinutes = readNumberField(source, 'readingMinutes');
  const heroBlock = source.match(/\bhero\s*:\s*\{([\s\S]*?)\n\s*\},/)?.[1] ?? '';
  const heroSrc = readHeroSource(source, heroBlock);
  const heroAlt = readStringField(heroBlock, 'alt');
  const metrics = editorialMetrics(source);
  const sourceLabel = path.relative(process.cwd(), sourcePath);

  if (!id || !slug || !title || !dek || !heroSrc || !heroAlt) errors.push(`County profile is missing required publication metadata: ${county.slug} (${sourceLabel})`);
  if (id && !id.startsWith('county-')) errors.push(`County article id must start with county-: ${id} (${county.slug})`);
  if (slug && slug !== profile.articleSlug) errors.push(`County registry articleSlug does not match fixture: ${county.slug} (${profile.articleSlug} != ${slug})`);
  if (title && !title.toLowerCase().includes(county.baseName.toLowerCase())) errors.push(`County title does not name ${county.baseName}: ${title} (${sourceLabel})`);
  if (metrics.words < MIN_EDITORIAL_WORDS) errors.push(`Thin county editorial body: ${county.slug} has ${metrics.words} words; minimum is ${MIN_EDITORIAL_WORDS} (${sourceLabel})`);
  if (metrics.paragraphCount < MIN_PARAGRAPHS) errors.push(`Thin county editorial structure: ${county.slug} has ${metrics.paragraphCount} paragraphs; minimum is ${MIN_PARAGRAPHS} (${sourceLabel})`);
  if (metrics.headingCount < MIN_HEADINGS) errors.push(`Thin county editorial structure: ${county.slug} has ${metrics.headingCount} headings; minimum is ${MIN_HEADINGS} (${sourceLabel})`);
  if (readingMinutes != null && readingMinutes < 5) errors.push(`County editorial reading time is too short: ${county.slug} has ${readingMinutes} minutes (${sourceLabel})`);
  for (const phrase of FORBIDDEN_COPY) {
    if (source.toLowerCase().includes(phrase.toLowerCase())) errors.push(`Forbidden placeholder copy in ${county.slug}: ${phrase} (${sourceLabel})`);
  }

  rows.push({
    countySlug: county.slug,
    countyName: county.name,
    articleSlug: profile.articleSlug,
    title: title ?? profile.articleSlug,
    fixture: sourceLabel,
    registry: profile.registry,
    heroSrc,
    heroAlt,
    readingMinutes,
    ...metrics,
  });
}

rows.sort((a, b) => a.countySlug.localeCompare(b.countySlug));
fs.writeFileSync(outputPath, rows.map((row) => `${row.countySlug}\t${row.articleSlug}\t${row.title}`).join('\n') + (rows.length ? '\n' : ''));
fs.writeFileSync(reportPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  expectedCounties: counties.length,
  registryFiles: registries.map((registry) => path.relative(process.cwd(), registry.file)),
  profileDefinitions: definitions.length,
  effectiveProfiles: effective.size,
  shadowedDefinitions: shadowed.map(({ ignored, winner }) => ({ countySlug: ignored.countySlug, ignoredRegistry: ignored.registry, winnerRegistry: winner.registry })),
  minimums: { editorialWords: MIN_EDITORIAL_WORDS, paragraphs: MIN_PARAGRAPHS, headings: MIN_HEADINGS },
  errors,
  rows,
}, null, 2)}\n`);

console.log(`Canonical Texas counties: ${counties.length}`);
console.log(`Active county profile registries: ${registries.length}`);
console.log(`County profile definitions across registries: ${definitions.length}`);
console.log(`Effective county profiles after server precedence: ${effective.size}`);
console.log(`Shadowed compatibility definitions: ${shadowed.length}`);
console.log(`Audit report: ${reportPath}`);
for (const row of rows) console.log(`${row.countySlug}\t/county/${row.countySlug}\t${row.words} words\t${row.paragraphCount} paragraphs\t${row.headingCount} headings\t${row.title}`);

if (errors.length) {
  console.error(`County editorial quality audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('PASS: all 254 Texas counties have effective, substantive, non-placeholder editorial profiles with required publication metadata.');
