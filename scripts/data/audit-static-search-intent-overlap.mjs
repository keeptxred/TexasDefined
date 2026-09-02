import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const stopWords = new Set([
  'a','an','and','are','as','at','be','best','by','for','from','guide','how','in','is','it','of','on','or','the','to','texas','texasdefined','with','your',
  '2025','2026','calculator','calculators','explained','find','free','help','official','plan','planning','state','statewide','tool','tools',
]);
const registrySource = fs.readFileSync(path.join(root, 'src/lib/public-routes.ts'), 'utf8');
const indexableBlock = registrySource.match(/export const INDEXABLE_STATIC_PATHS = \[([\s\S]*?)\] as const;/)?.[1] ?? '';
const indexablePaths = new Set([...indexableBlock.matchAll(/"(\/[^"]+)"/g)].map((match) => match[1]));

if (!indexablePaths.size) {
  console.error('Static search-intent audit failed: could not parse INDEXABLE_STATIC_PATHS.');
  process.exit(1);
}

const routeFiles = walk(path.join(root, 'src/routes')).filter((file) => /\.(?:ts|tsx)$/.test(file));
const records = [];
for (const file of routeFiles) {
  const source = fs.readFileSync(file, 'utf8');
  const constants = staticStringConstants(source);
  const ownedPaths = resolveOwnedStaticPaths(source, constants);
  for (const record of buildMetaRecords(source, constants)) {
    const canonical = record.canonical ?? (ownedPaths.length === 1 ? ownedPaths[0] : null);
    if (!canonical || !indexablePaths.has(canonical)) continue;
    if (!record.title && !record.description) continue;
    records.push({
      ...record,
      canonical,
      file: path.relative(root, file).replaceAll('\\', '/'),
    });
  }
}

const byCanonical = new Map();
for (const record of records) {
  const existing = byCanonical.get(record.canonical);
  if (!existing || metadataRichness(record) > metadataRichness(existing)) byCanonical.set(record.canonical, record);
}
const pages = [...byCanonical.values()].sort((a, b) => a.canonical.localeCompare(b.canonical));
const allPaths = [...indexablePaths].filter((routePath) => routePath !== '/').sort();
const unresolved = allPaths.filter((routePath) => !byCanonical.has(routePath));
const candidates = new Map();

for (let i = 0; i < pages.length; i += 1) {
  for (let j = i + 1; j < pages.length; j += 1) {
    const a = pages[i];
    const b = pages[j];
    const title = similarity(a.title, b.title);
    const description = similarity(a.description, b.description);
    const titleCandidate = title.shared >= 3 && (title.jaccard >= 0.62 || title.containment >= 0.78);
    const descriptionCandidate = description.shared >= 6 && (description.jaccard >= 0.55 || description.containment >= 0.72);
    if (!titleCandidate && !descriptionCandidate) continue;
    registerCandidate(candidates, {
      aPath: a.canonical,
      bPath: b.canonical,
      source: 'metadata',
      title,
      description,
      pathIntent: similarity(leafIntent(a.canonical), leafIntent(b.canonical)),
      aTitle: a.title,
      bTitle: b.title,
      score: Math.max(title.jaccard, title.containment * 0.88, description.jaccard * 0.9, description.containment * 0.78),
    });
  }
}

for (let i = 0; i < allPaths.length; i += 1) {
  for (let j = i + 1; j < allPaths.length; j += 1) {
    const aPath = allPaths[i];
    const bPath = allPaths[j];
    if (isDirectParentChild(aPath, bPath)) continue;
    const pathIntent = similarity(leafIntent(aPath), leafIntent(bPath));
    const pathCandidate = pathIntent.shared >= 2 && pathIntent.containment >= 0.8 && pathIntent.jaccard >= 0.5;
    if (!pathCandidate) continue;
    registerCandidate(candidates, {
      aPath,
      bPath,
      source: byCanonical.has(aPath) && byCanonical.has(bPath) ? 'metadata+path' : 'path-fallback',
      title: similarity(byCanonical.get(aPath)?.title, byCanonical.get(bPath)?.title),
      description: similarity(byCanonical.get(aPath)?.description, byCanonical.get(bPath)?.description),
      pathIntent,
      aTitle: byCanonical.get(aPath)?.title,
      bTitle: byCanonical.get(bPath)?.title,
      score: pathIntent.jaccard * 0.82 + pathIntent.containment * 0.18,
    });
  }
}

const sortedCandidates = [...candidates.values()].sort((a, b) => b.score - a.score || a.aPath.localeCompare(b.aPath));
console.log(`Static search-intent overlap audit: ${indexablePaths.size} registered indexable static paths; ${pages.length} with statically resolved metadata; ${unresolved.length} metadata-unresolved but path-covered; ${allPaths.length}/${allPaths.length} with leaf-path intent coverage; ${sortedCandidates.length} high-overlap candidate pairs.`);

if (unresolved.length) {
  console.log('\nMetadata-unresolved paths using leaf-path fallback:');
  for (const routePath of unresolved.slice(0, 40)) console.log(`- ${routePath}`);
  if (unresolved.length > 40) console.log(`- … ${unresolved.length - 40} more`);
}

for (const candidate of sortedCandidates.slice(0, 100)) {
  console.log(`\n- ${candidate.aPath} <> ${candidate.bPath} [${candidate.source}]`);
  console.log(`  leaf path: J=${candidate.pathIntent.jaccard.toFixed(2)} C=${candidate.pathIntent.containment.toFixed(2)} shared=${candidate.pathIntent.shared}`);
  console.log(`  title: J=${candidate.title.jaccard.toFixed(2)} C=${candidate.title.containment.toFixed(2)} shared=${candidate.title.shared}`);
  console.log(`  description: J=${candidate.description.jaccard.toFixed(2)} C=${candidate.description.containment.toFixed(2)} shared=${candidate.description.shared}`);
  if (candidate.aTitle) console.log(`  A: ${candidate.aTitle}`);
  if (candidate.bTitle) console.log(`  B: ${candidate.bTitle}`);
}
if (sortedCandidates.length > 100) console.log(`\n… ${sortedCandidates.length - 100} additional candidate pairs omitted.`);

function registerCandidate(map, candidate) {
  const key = [candidate.aPath, candidate.bPath].sort().join('\u0000');
  const existing = map.get(key);
  if (!existing || candidate.score > existing.score || candidate.source === 'metadata') map.set(key, candidate);
}

function buildMetaRecords(source, constants) {
  const records = [];
  let cursor = 0;
  while ((cursor = source.indexOf('buildMeta(', cursor)) >= 0) {
    const objectStart = source.indexOf('{', cursor);
    if (objectStart < 0) break;
    const objectEnd = findMatchingBrace(source, objectStart);
    if (objectEnd < 0) break;
    const block = source.slice(objectStart + 1, objectEnd);
    records.push({
      canonical: resolveField(block, 'canonicalPath', constants),
      title: resolveField(block, 'title', constants),
      description: resolveField(block, 'description', constants),
    });
    cursor = objectEnd + 1;
  }
  return records;
}

function resolveOwnedStaticPaths(source, constants) {
  const owned = new Set();
  for (const match of source.matchAll(/create(?:Lazy)?FileRoute\(\s*(["'`])([^"'`$]+)\1\s*\)/g)) {
    if (indexablePaths.has(match[2])) owned.add(match[2]);
  }
  for (const match of source.matchAll(/create(?:Lazy)?FileRoute\(\s*([A-Za-z_$][\w$]*)\s*\)/g)) {
    const resolved = constants.get(match[1]);
    if (resolved && indexablePaths.has(resolved)) owned.add(resolved);
  }
  return [...owned];
}

function resolveField(block, name, constants) {
  const match = block.match(new RegExp(`\\b${name}\\s*:\\s*([^,\\n}]+)`));
  if (!match) return null;
  return resolveStaticExpression(match[1], constants);
}

function staticStringConstants(source) {
  const values = new Map();
  const pattern = /const\s+([A-Za-z_$][\w$]*)\s*=\s*(["'`])((?:\\.|(?!\2)[\s\S])*?)\2\s*;/g;
  for (const match of source.matchAll(pattern)) {
    if (!match[3].includes('${')) values.set(match[1], unescapeLiteral(match[3]));
  }
  return values;
}

function resolveStaticExpression(expression, constants) {
  const value = expression.trim();
  const quote = value[0];
  if ((quote === '"' || quote === "'" || quote === '`') && value.endsWith(quote)) {
    const literal = value.slice(1, -1);
    return literal.includes('${') ? null : unescapeLiteral(literal);
  }
  return /^[A-Za-z_$][\w$]*$/.test(value) ? (constants.get(value) ?? null) : null;
}

function unescapeLiteral(value) {
  return value.replace(/\\(["'`\\])/g, '$1');
}

function findMatchingBrace(source, start) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) { escaped = false; continue; }
      if (char === '\\') { escaped = true; continue; }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function tokens(value) {
  if (!value) return new Set();
  const normalized = value
    .toLocaleLowerCase('en-US')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
  return new Set(normalized);
}

function similarity(aValue, bValue) {
  const a = tokens(aValue);
  const b = tokens(bValue);
  if (!a.size || !b.size) return { jaccard: 0, containment: 0, shared: 0 };
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  const union = a.size + b.size - shared;
  return {
    jaccard: union ? shared / union : 0,
    containment: shared / Math.min(a.size, b.size),
    shared,
  };
}

function leafIntent(routePath) {
  const leaf = routePath.split('/').filter(Boolean).at(-1) ?? '';
  return leaf.replaceAll('-', ' ');
}

function isDirectParentChild(aPath, bPath) {
  return aPath.startsWith(`${bPath}/`) || bPath.startsWith(`${aPath}/`);
}

function metadataRichness(record) {
  return Number(Boolean(record.title)) + Number(Boolean(record.description));
}

function walk(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}
