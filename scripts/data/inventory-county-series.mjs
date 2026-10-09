import fs from 'node:fs';
import path from 'node:path';

const outputPath = process.argv[2] || '/tmp/county-profiles.tsv';
const reportPath = outputPath.replace(/\.tsv$/i, '.json');
const MIN_WORDS = 700;
const MIN_PARAGRAPHS = 10;
const MIN_HEADINGS = 4;
const AUTHORITY_MIN_WORDS = 1200;
const AUTHORITY_MIN_PARAGRAPHS = 16;
const AUTHORITY_MIN_HEADINGS = 7;
const AUTHORITY_MIN_RESEARCH_SOURCES = 5;
const AUTHORITY_MIN_PRIMARY_SOURCES = 2;
const AUTHORITY_MIN_DISTINCT_SOURCE_HOSTS = 3;
const snapshot = fs.readFileSync('src/data/property/county-property-enrichment.generated.ts', 'utf8');
const localOfficeVerification = fs.readFileSync('src/data/property/county-property-local-verification.ts', 'utf8');
const knownSnapshotCounties = new Set([...snapshot.matchAll(/^  ([a-z][a-z-]+): \{/gm)].map((match) => match[1]));
const locallyCheckedCounties = new Set([...localOfficeVerification.matchAll(/^  ([a-z][a-z-]+): \{/gm)].map((match) => match[1]));

const FORBIDDEN = [
  'will expand as additional local sources are verified',
  'This county guide is being expanded',
  'We are adding verified details before expanding this page into a full guide',
  'Story unavailable',
  'County unavailable',
];
const read = (file) => fs.readFileSync(file, 'utf8');
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function counties() {
  const source = read('src/data/texas-places.ts');
  const match = source.match(/const COUNTY_NAMES\s*=\s*`([^`]+)`\.split\(['"]\|['"]\)/);
  if (!match) throw new Error('Could not parse canonical COUNTY_NAMES');
  const rows = match[1].split('|').map((baseName) => ({ baseName, name: `${baseName} County`, slug: slugify(baseName) }));
  if (rows.length !== 254) throw new Error(`Expected 254 canonical Texas counties; found ${rows.length}`);
  return rows;
}

function activeRegistries() {
  const source = read('src/data/county-series.server.ts');
  const imports = new Map();
  for (const match of source.matchAll(/import\s*\{\s*([A-Z0-9_]+)\s*\}\s*from\s*["']@\/data\/(county-series-profiles[^"']*)["']/g)) {
    imports.set(match[1], `src/data/${match[2]}.ts`);
  }
  const block = source.match(/const countySeriesProfiles\s*=\s*\[([\s\S]*?)\n\];/)?.[1];
  if (!block) throw new Error('Could not parse countySeriesProfiles precedence list');
  const rows = [...block.matchAll(/\.\.\.([A-Z0-9_]+)/g)].map((match) => ({ symbol: match[1], file: imports.get(match[1]) }));
  for (const row of rows) if (!row.file) throw new Error(`No registry import found for ${row.symbol}`);
  if (!rows.length) throw new Error('No active county profile registries found');
  return rows;
}

const callback = String.raw`\(\s*[A-Za-z_$][A-Za-z0-9_$]*\s*\)\s*=>\s*[A-Za-z_$][A-Za-z0-9_$]*\.`;
const helperPattern = new RegExp(String.raw`profile\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']\s*,\s*\(\)\s*=>\s*import\(\s*["']@\/data\/fixtures\/([^"']+)["']\s*\)\s*\.then\(\s*${callback}([A-Za-z0-9_]+)\s*\)\s*\)`, 'g');
const objectPattern = new RegExp(String.raw`countySlug\s*:\s*["']([^"']+)["'][\s\S]*?articleSlug\s*:\s*["']([^"']+)["'][\s\S]*?loadArticle\s*:\s*\(\)\s*=>\s*import\(\s*["']@\/data\/fixtures\/([^"']+)["']\s*\)\s*\.then\(\s*${callback}([A-Za-z0-9_]+)\s*\)`, 'g');

function parseRegistry(registry) {
  const source = read(registry.file);
  const found = [];
  for (const pattern of [helperPattern, objectPattern]) {
    pattern.lastIndex = 0;
    for (const match of source.matchAll(pattern)) {
      found.push({
        at: match.index ?? 0,
        countySlug: match[1], articleSlug: match[2], fixturePath: match[3], exportName: match[4],
        registry: registry.file,
      });
    }
  }
  found.sort((a, b) => a.at - b.at);
  const unique = [];
  const seen = new Set();
  for (const row of found) {
    const key = [row.countySlug, row.articleSlug, row.fixturePath, row.exportName].join('\u0000');
    if (!seen.has(key)) { seen.add(key); unique.push(row); }
  }
  if (!unique.length) throw new Error(`Active county registry returned zero profiles: ${registry.file}`);
  return unique;
}

function stringField(source, field) {
  return source.match(new RegExp(`\\b${field}\\s*:\\s*["']([^"']+)["']`))?.[1] ?? null;
}
function numberField(source, field) {
  const match = source.match(new RegExp(`\\b${field}\\s*:\\s*(\\d+(?:\\.\\d+)?)`));
  return match ? Number(match[1]) : null;
}

function matchingBlock(source, field, openChar, closeChar) {
  const marker = source.match(new RegExp(`\\b${field}\\s*:\\s*\\${openChar}`));
  if (!marker || marker.index == null) return '';
  const openIndex = source.indexOf(openChar, marker.index);
  let depth = 0;
  let quote = '';
  let escaped = false;
  for (let index = openIndex; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === quote) quote = '';
      continue;
    }
    if (character === '"' || character === "'" || character === '`') {
      quote = character;
      continue;
    }
    if (character === openChar) depth += 1;
    if (character === closeChar) {
      depth -= 1;
      if (depth === 0) return source.slice(openIndex + 1, index);
    }
  }
  return '';
}

function heroSource(source, heroBlock) {
  const direct = stringField(heroBlock, 'src');
  if (direct) return direct;
  const identifier = heroBlock.match(/\bsrc\s*:\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*[,\n]/)?.[1];
  if (!identifier) return null;
  return source.match(new RegExp(`import\\s+${identifier}\\s+from\\s+["']([^"']+)["']`))?.[1] ?? null;
}

function resolveRelativeTypeScriptPath(fromFile, importPath) {
  return path.resolve(path.dirname(fromFile), importPath.endsWith('.ts') ? importPath : `${importPath}.ts`);
}

function resolveFixture(fixture, exportName, visited = new Set()) {
  const key = `${fixture}:${exportName}`;
  if (visited.has(key)) throw new Error(`Circular county fixture resolution: ${key}`);
  visited.add(key);

  const direct = new RegExp(`export\\s+const\\s+${escapeRegExp(exportName)}\\b`);
  const wrapper = read(fixture);
  if (direct.test(wrapper)) {
    const spreadIdentifier = wrapper.match(new RegExp(`export\\s+const\\s+${escapeRegExp(exportName)}[\\s\\S]*?=\\s*\\{\\s*\\.\\.\\.([A-Za-z_$][A-Za-z0-9_$]*)`))?.[1];
    if (spreadIdentifier) {
      const namedAliasPattern = new RegExp(`import\\s*\\{\\s*([A-Za-z_$][A-Za-z0-9_$]*)\\s+as\\s+${escapeRegExp(spreadIdentifier)}\\s*\\}\\s*from\\s*["']([^"']+)["']`);
      const namedDirectPattern = new RegExp(`import\\s*\\{[^}]*\\b(${escapeRegExp(spreadIdentifier)})\\b[^}]*\\}\\s*from\\s*["']([^"']+)["']`);
      const defaultPattern = new RegExp(`import\\s+${escapeRegExp(spreadIdentifier)}\\s+from\\s*["']([^"']+)["']`);
      const namedAlias = wrapper.match(namedAliasPattern);
      const namedDirect = wrapper.match(namedDirectPattern);
      const defaultImport = wrapper.match(defaultPattern);
      if (namedAlias || namedDirect || defaultImport) {
        const importedExport = namedAlias?.[1] ?? namedDirect?.[1] ?? 'default';
        const importPath = namedAlias?.[2] ?? namedDirect?.[2] ?? defaultImport?.[1];
        const target = resolveRelativeTypeScriptPath(fixture, importPath);
        if (!fs.existsSync(target)) throw new Error(`County wrapper base fixture is missing: ${fixture} -> ${target}`);
        const base = importedExport === 'default'
          ? { source: read(target), sourcePath: target }
          : resolveFixture(target, importedExport, visited);
        return { source: `${base.source}\n${wrapper}`, sourcePath: `${base.sourcePath} + ${fixture}` };
      }
    }
    return { source: wrapper, sourcePath: fixture };
  }

  const reExport = wrapper.match(new RegExp(`export\\s*\\{[^}]*\\b${escapeRegExp(exportName)}\\b[^}]*\\}\\s*from\\s*["']([^"']+)["']`));
  if (!reExport) throw new Error(`Missing expected export ${exportName} in ${fixture}`);
  const target = resolveRelativeTypeScriptPath(fixture, reExport[1]);
  if (!fs.existsSync(target)) throw new Error(`County fixture re-export target is missing: ${fixture} -> ${target}`);
  return resolveFixture(target, exportName, visited);
}

function metrics(source) {
  const body = matchingBlock(source, 'body', '[', ']');
  return {
    words: (body.match(/[A-Za-z0-9]+(?:[’'\-][A-Za-z0-9]+)*/g) ?? []).length,
    paragraphs: (body.match(/\bp\s*\(/g) ?? []).length + (body.match(/type\s*:\s*["']paragraph["']/g) ?? []).length,
    headings: (body.match(/\bh\s*\(/g) ?? []).length + (body.match(/type\s*:\s*["']heading["']/g) ?? []).length,
  };
}


function authorityEvidence(source, county, body) {
  const sourcesBlock = matchingBlock(source, 'sources', '[', ']');
  const researchSources = [...sourcesBlock.matchAll(/\burl\s*:\s*["'](https?:\/\/[^"']+)["']/g)]
    .map((match) => match[1]);
  const uniqueSources = [...new Set(researchSources)];
  const hosts = [...new Set(uniqueSources.map((url) => {
    try { return new URL(url).hostname.toLowerCase().replace(/^www\./, ''); }
    catch { return ''; }
  }).filter(Boolean))];
  const primarySources = uniqueSources.filter((url) => {
    const host = new URL(url).hostname.toLowerCase();
    return host.endsWith('.gov') || host.endsWith('.tx.us') || host.endsWith('texas.gov')
      || host.endsWith('.edu') || host === 'tshaonline.org'
      || host === 'www.tshaonline.org' || host.endsWith('.county.org')
      || host.endsWith('tsl.texas.gov');
  });
  const countySpecificSources = uniqueSources.filter((url) => {
    let decoded;
    try { decoded = decodeURIComponent(url).toLowerCase(); }
    catch { decoded = url.toLowerCase(); }
    return decoded.includes(county.slug) || decoded.includes(county.baseName.toLowerCase());
  });
  const countyInternalLinks = [...new Set([...source.matchAll(/\bhref\s*:\s*["'](\/county\/[^"']+)["']/g)]
    .map((match) => match[1]))].filter((href) => href !== `/county/${county.slug}`);
  const checkedInLocalContacts = knownSnapshotCounties.has(county.slug) || locallyCheckedCounties.has(county.slug);
  const gaps = [];
  if (body.words < AUTHORITY_MIN_WORDS) gaps.push('expand-original-county-research');
  if (body.paragraphs < AUTHORITY_MIN_PARAGRAPHS || body.headings < AUTHORITY_MIN_HEADINGS) gaps.push('improve-county-specific-structure');
  if (uniqueSources.length < AUTHORITY_MIN_RESEARCH_SOURCES) gaps.push('publish-five-specific-research-sources');
  if (primarySources.length < AUTHORITY_MIN_PRIMARY_SOURCES) gaps.push('add-independent-primary-sources');
  if (hosts.length < AUTHORITY_MIN_DISTINCT_SOURCE_HOSTS) gaps.push('diversify-research-publishers');
  if (countySpecificSources.length < 2) gaps.push('link-county-specific-not-just-statewide-references');
  if (countyInternalLinks.length < 2) gaps.push('connect-relevant-neighboring-county-guides');
  if (!checkedInLocalContacts) gaps.push('verify-and-snapshot-local-office-contacts');
  // This is a source/readiness signal, not a claim that external links work or
  // an editorial certification. Every county still needs human source review.
  return {
    researchSources: uniqueSources,
    researchSourceCount: uniqueSources.length,
    primarySourceCount: primarySources.length,
    countySpecificSourceCount: countySpecificSources.length,
    distinctSourceHosts: hosts.length,
    countyInternalLinkCount: countyInternalLinks.length,
    checkedInLocalContacts,
    locallyCheckedContacts: locallyCheckedCounties.has(county.slug),
    missing: gaps,
    status: gaps.length ? 'research-required' : 'candidate-for-independent-editorial-review',
  };
}

const canonical = counties();
const canonicalBySlug = new Map(canonical.map((county) => [county.slug, county]));
const registries = activeRegistries();
const definitions = registries.flatMap(parseRegistry);
const effective = new Map();
const shadowed = [];
for (const row of definitions) {
  if (effective.has(row.countySlug)) shadowed.push({ ignored: row, winner: effective.get(row.countySlug) });
  else effective.set(row.countySlug, row);
}

const errors = [];
const missing = canonical.filter((county) => !effective.has(county.slug));
const extra = [...effective.keys()].filter((slug) => !canonicalBySlug.has(slug));
if (missing.length) errors.push(`Missing canonical county profiles (${missing.length}): ${missing.map((county) => county.slug).join(', ')}`);
if (extra.length) errors.push(`Unknown county profiles (${extra.length}): ${extra.join(', ')}`);
if (effective.size !== 254) errors.push(`Expected 254 effective county profiles; found ${effective.size}`);

const rows = [];
const articleSlugs = new Set();
for (const county of canonical) {
  const profile = effective.get(county.slug);
  if (!profile) continue;
  if (articleSlugs.has(profile.articleSlug)) errors.push(`Duplicate effective legacy article slug: ${profile.articleSlug}`);
  articleSlugs.add(profile.articleSlug);
  const fixture = `src/data/fixtures/${profile.fixturePath}.ts`;
  if (!fs.existsSync(fixture)) { errors.push(`Missing county fixture: ${fixture}`); continue; }
  let resolved;
  try { resolved = resolveFixture(fixture, profile.exportName); }
  catch (error) { errors.push(error.message); continue; }
  const { source, sourcePath } = resolved;
  const id = stringField(source, 'id');
  const slug = stringField(source, 'slug');
  const title = stringField(source, 'title');
  const dek = stringField(source, 'dek');
  const readingMinutes = numberField(source, 'readingMinutes');
  const heroBlock = matchingBlock(source, 'hero', '{', '}');
  const src = heroSource(source, heroBlock);
  const alt = stringField(heroBlock, 'alt');
  const body = metrics(source);

  if (!id || !slug || !title || !dek || !src || !alt) errors.push(`Missing publication metadata: ${county.slug} (${sourcePath})`);
  if (id && !id.startsWith('county-')) errors.push(`County article id must start with county-: ${county.slug}`);
  if (slug && slug !== profile.articleSlug) errors.push(`Registry/fixture slug mismatch: ${county.slug} (${profile.articleSlug} != ${slug})`);
  if (title && !title.toLowerCase().includes(county.baseName.toLowerCase())) errors.push(`County title does not name ${county.baseName}: ${title}`);
  if (body.words < MIN_WORDS) errors.push(`Thin county body: ${county.slug} has ${body.words} words; minimum ${MIN_WORDS}`);
  if (body.paragraphs < MIN_PARAGRAPHS) errors.push(`Thin county structure: ${county.slug} has ${body.paragraphs} paragraphs; minimum ${MIN_PARAGRAPHS}`);
  if (body.headings < MIN_HEADINGS) errors.push(`Thin county structure: ${county.slug} has ${body.headings} headings; minimum ${MIN_HEADINGS}`);
  if (readingMinutes != null && readingMinutes < 5) errors.push(`County reading time too short: ${county.slug} has ${readingMinutes} minutes`);
  for (const phrase of FORBIDDEN) if (source.toLowerCase().includes(phrase.toLowerCase())) errors.push(`Forbidden placeholder in ${county.slug}: ${phrase}`);
  const authority = authorityEvidence(source, county, body);
  rows.push({ countySlug: county.slug, countyName: county.name, articleSlug: profile.articleSlug, title: title ?? profile.articleSlug, fixture: sourcePath, registry: profile.registry, readingMinutes, heroSrc: src, heroAlt: alt, ...body, authority });
}

rows.sort((a, b) => a.countySlug.localeCompare(b.countySlug));
fs.writeFileSync(outputPath, rows.map((row) => `${row.countySlug}\t${row.articleSlug}\t${row.title}`).join('\n') + (rows.length ? '\n' : ''));
const authorityBacklogPath = outputPath.replace(/\.tsv$/i, '-authority-backlog.tsv');
const prioritized = [...rows].sort((a, b) => b.authority.missing.length - a.authority.missing.length
  || a.authority.researchSourceCount - b.authority.researchSourceCount
  || a.countySlug.localeCompare(b.countySlug));
fs.writeFileSync(authorityBacklogPath,
  ['county_slug', 'status', 'research_sources', 'primary_sources', 'county_specific_sources', 'distinct_hosts', 'office_contact_snapshot', 'words', 'research_gaps'].join('\t') + '\n'
  + prioritized.map((row) => [row.countySlug, row.authority.status,
    row.authority.researchSourceCount, row.authority.primarySourceCount,
    row.authority.countySpecificSourceCount, row.authority.distinctSourceHosts,
    row.authority.checkedInLocalContacts ? 'yes' : 'needs-verification',
    row.words, row.authority.missing.join(';')].join('\t')).join('\n') + '\n');
const researchRequired = rows.filter((row) => row.authority.status === 'research-required').length;
const noPublishedResearchSources = rows.filter((row) => row.authority.researchSourceCount === 0).length;
const localOfficeSnapshotMissing = rows.filter((row) => !row.authority.checkedInLocalContacts).length;
fs.writeFileSync(reportPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), canonicalCounties: canonical.length, registries: registries.map((r) => r.file), definitions: definitions.length, effectiveProfiles: effective.size, shadowed: shadowed.length, minimums: { words: MIN_WORDS, paragraphs: MIN_PARAGRAPHS, headings: MIN_HEADINGS },
  authorityAudit: { authorityCandidatesForEditorialReview: rows.length - researchRequired, researchRequired,
    noPublishedResearchSources, localOfficeSnapshotMissing, readinessIsNotCertification: true,
    criteria: { words: AUTHORITY_MIN_WORDS, paragraphs: AUTHORITY_MIN_PARAGRAPHS,
      headings: AUTHORITY_MIN_HEADINGS, sources: AUTHORITY_MIN_RESEARCH_SOURCES,
      primarySources: AUTHORITY_MIN_PRIMARY_SOURCES, distinctHosts: AUTHORITY_MIN_DISTINCT_SOURCE_HOSTS } },
  errors, rows }, null, 2)}\n`);
console.log(`Canonical Texas counties: ${canonical.length}`);
console.log(`Active county registries: ${registries.length}`);
console.log(`Profile definitions: ${definitions.length}`);
console.log(`Effective county profiles: ${effective.size}`);
console.log(`Shadowed compatibility definitions: ${shadowed.length}`);
for (const row of rows) console.log(`${row.countySlug}\t/county/${row.countySlug}\t${row.words} words\t${row.paragraphs} paragraphs\t${row.headings} headings\t${row.title}`);
if (errors.length) {
  console.error(`County editorial quality audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log('PASS: all 254 Texas counties have effective, substantive, non-placeholder editorial profiles with required publication metadata.');
console.log(`AUTHORITY REVIEW (not certification): ${researchRequired}/254 still require researched changes, ${noPublishedResearchSources} have no explicit research sources, and ${localOfficeSnapshotMissing} lack checked-in local office evidence. Independent source/date verification remains required even for candidates.`);
console.log(`County research-priority report: ${authorityBacklogPath}`);
