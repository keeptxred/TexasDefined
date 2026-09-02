import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = process.cwd();
const routesDir = join(root, 'src/routes');
const errors = [];

async function routeFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await routeFiles(full));
    else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function findMatchingBrace(source, start) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') {
      quote = char;
      continue;
    }
    if (char === '{') depth += 1;
    if (char === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function staticConstants(source) {
  const values = new Map();
  const pattern = /const\s+([A-Za-z_$][\w$]*)\s*=\s*(["'`])((?:\\.|(?!\2)[\s\S])*?)\2\s*;/g;
  for (const match of source.matchAll(pattern)) {
    if (!match[3].includes('${')) values.set(match[1], match[3].replace(/\\(["'`\\])/g, '$1'));
  }
  return values;
}

function resolveStaticExpression(expression, constants) {
  const value = expression.trim();
  const quote = value[0];
  if ((quote === '"' || quote === "'" || quote === '`') && value.endsWith(quote)) {
    const literal = value.slice(1, -1);
    return literal.includes('${') ? null : literal.replace(/\\(["'`\\])/g, '$1');
  }
  return /^[A-Za-z_$][\w$]*$/.test(value) ? (constants.get(value) ?? null) : null;
}

function buildMetaRecords(source) {
  const constants = staticConstants(source);
  const records = [];
  let cursor = 0;
  while ((cursor = source.indexOf('buildMeta(', cursor)) >= 0) {
    const objectStart = source.indexOf('{', cursor);
    if (objectStart < 0) break;
    const objectEnd = findMatchingBrace(source, objectStart);
    if (objectEnd < 0) break;
    const block = source.slice(objectStart + 1, objectEnd);
    const field = (name) => {
      const match = block.match(new RegExp(`\\b${name}\\s*:\\s*([^,\\n}]+)`));
      return match ? resolveStaticExpression(match[1], constants) : null;
    };
    records.push({ canonical: field('canonicalPath'), title: field('title'), description: field('description') });
    cursor = objectEnd + 1;
  }
  return records;
}

function normalizeMetadata(value) {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US');
}

function registerMetadata(ownerMap, value, canonical, file) {
  if (!value || !canonical) return;
  const key = normalizeMetadata(value);
  const owners = ownerMap.get(key) ?? [];
  owners.push({ value, canonical, file });
  ownerMap.set(key, owners);
}

const files = await routeFiles(routesDir);
const canonicalOwners = new Map();
const titleOwners = new Map();
const descriptionOwners = new Map();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const name = relative(root, file).replace(/\\/g, '/');
  for (const match of source.matchAll(/canonicalPath\s*:\s*["'`]([^"'`$]+)["'`]/g)) {
    const canonical = match[1];
    const owners = canonicalOwners.get(canonical) ?? [];
    owners.push(name);
    canonicalOwners.set(canonical, owners);
  }
  for (const record of buildMetaRecords(source)) {
    registerMetadata(titleOwners, record.title, record.canonical, name);
    registerMetadata(descriptionOwners, record.description, record.canonical, name);
  }
}

for (const [canonical, owners] of canonicalOwners) {
  const unique = [...new Set(owners)];
  if (unique.length > 1) errors.push(`Duplicate static canonical ${canonical}: ${unique.join(', ')}`);
}

for (const [kind, ownerMap] of [['title', titleOwners], ['description', descriptionOwners]]) {
  for (const owners of ownerMap.values()) {
    const canonicals = [...new Set(owners.map((owner) => owner.canonical))];
    if (canonicals.length <= 1) continue;
    const locations = [...new Set(owners.map((owner) => `${owner.canonical} (${owner.file})`))];
    errors.push(`Duplicate static meta ${kind} "${owners[0].value}" across canonical pages: ${locations.join(', ')}`);
  }
}

const publicRoutes = await readFile(join(root, 'src/lib/public-routes.ts'), 'utf8');
const redirectPaths = [...publicRoutes.matchAll(/\s+"(\/[^"\n]+)",/g)]
  .map((match) => match[1]);
const redirectSection = publicRoutes.split('export const REDIRECT_ONLY_PATHS = [')[1]?.split('] as const;')[0] ?? '';
const declaredRedirects = redirectPaths.filter((path) => redirectSection.includes(`"${path}"`));

for (const path of declaredRedirects) {
  const token = path.slice(1).replaceAll('/', '.');
  const candidates = files.filter((file) => relative(routesDir, file)
    .replace(/\.(tsx?|jsx?)$/, '')
    .replaceAll('[.]', '.') === token);
  if (!candidates.length) {
    errors.push(`Redirect-only path ${path} has no route file.`);
    continue;
  }
  const source = await readFile(candidates[0], 'utf8');
  if (!source.includes('redirect(')) errors.push(`${path} is declared redirect-only but does not redirect.`);
  if (!source.includes('statusCode: 301')) errors.push(`${path} must use a permanent 301 redirect.`);
  if (source.includes('canonicalPath:')) errors.push(`${path} must not publish a competing canonical.`);
}

const newsIndexSource = `${await readFile(join(root, 'src/routes/news.index.tsx'), 'utf8')}\n${await readFile(join(root, 'src/routes/news.index.lazy.tsx'), 'utf8')}`;
const newsLayoutSource = await readFile(join(root, 'src/routes/news.tsx'), 'utf8');
for (const feature of [
  'loader: async ({ context }) => context.queryClient.ensureQueryData(newsQuery)',
  'robots: hasStories ? undefined : "noindex, follow"',
  'useSuspenseQuery(newsQuery)',
]) {
  if (!newsIndexSource.includes(feature)) errors.push(`News thin-content protection missing from exact index route: ${feature}`);
}
if (newsLayoutSource.includes('canonicalPath:') || newsLayoutSource.includes('canonicalLink(')) {
  errors.push('News parent layout must not own a canonical that can duplicate routed-story canonicals.');
}

const legacyValidator = await readFile(join(root, 'scripts/data/validate-legacy-links.mjs'), 'utf8');
for (const feature of ['KeepTXRed domain', 'legacy repository']) {
  if (!legacyValidator.includes(feature)) errors.push(`Legacy-content validation missing: ${feature}`);
}

if (errors.length) {
  console.error('Broken-content and duplication validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Broken-content and duplication validation passed across ${files.length} route files, ${canonicalOwners.size} static canonical declarations, ${titleOwners.size} resolved static meta titles, and ${descriptionOwners.size} resolved static meta descriptions.`);
