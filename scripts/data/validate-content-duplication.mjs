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

const files = await routeFiles(routesDir);
const canonicalOwners = new Map();
for (const file of files) {
  const source = await readFile(file, 'utf8');
  const name = relative(root, file).replace(/\\/g, '/');
  for (const match of source.matchAll(/canonicalPath\s*:\s*["'`]([^"'`$]+)["'`]/g)) {
    const canonical = match[1];
    const owners = canonicalOwners.get(canonical) ?? [];
    owners.push(name);
    canonicalOwners.set(canonical, owners);
  }
}

for (const [canonical, owners] of canonicalOwners) {
  const unique = [...new Set(owners)];
  if (unique.length > 1) errors.push(`Duplicate static canonical ${canonical}: ${unique.join(', ')}`);
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

console.log(`Broken-content and duplication validation passed across ${files.length} route files and ${canonicalOwners.size} static canonical declarations.`);
