import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

function walkSourceFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walkSourceFiles(absolute));
    else if (/\.(?:tsx?|jsx?)$/.test(entry.name)) files.push(absolute);
  }
  return files;
}

const surfaceChecks = [
  {
    file: 'src/components/editorial/FeatureHero.tsx',
    forbidden: ['min-h-[76vh]'],
    required: ['minHeight: "clamp(28rem, 58vw, 36rem)"'],
  },
  {
    file: 'src/routes/article.$slug.tsx',
    forbidden: ['min-h-[52vh]', 'sm:min-h-[62vh]'],
    required: ['minHeight: "clamp(24rem, 48vw, 34rem)"'],
  },
  {
    file: 'src/routes/news.$slug.lazy.tsx',
    forbidden: ['min-h-[58vh]'],
    required: ['minHeight: "clamp(24rem, 48vw, 32rem)"'],
  },
  {
    file: 'src/routes/explore.region.$region.tsx',
    forbidden: ['min-h-[62vh]'],
    required: ['minHeight: "clamp(24rem, 48vw, 32rem)"'],
  },
  {
    file: 'src/routes/shop.$collection.tsx',
    forbidden: ['min-h-[58vh]'],
    required: ['minHeight: "clamp(24rem, 48vw, 32rem)"'],
  },
  {
    file: 'src/routes/event.$slug.lazy.tsx',
    forbidden: ['data-stay-nearby-slot class="my-10"'],
    required: ['data-stay-nearby-slot aria-label="Places to stay near this event"'],
  },
  {
    file: 'src/components/relocation/LazyRelocationUtilityPage.tsx',
    forbidden: ['fallback={<main className="min-h-screen"/>'],
    required: ['Loading relocation tools…', 'role="status"'],
  },
  {
    file: 'src/routes/dogs.{-$breed}.lazy.tsx',
    forbidden: ['fallback={null}'],
    required: ['Loading Texas Dogs Defined…', 'role="status"'],
  },
];

for (const check of surfaceChecks) {
  const source = read(check.file);
  for (const token of check.forbidden) {
    if (source.includes(token)) failures.push(`${check.file} retains dead-space pattern: ${token}`);
  }
  for (const token of check.required) {
    if (!source.includes(token)) failures.push(`${check.file} is missing compact-layout safeguard: ${token}`);
  }
}

const sourceRoot = path.join(root, 'src');
for (const absolute of walkSourceFiles(sourceRoot)) {
  const file = path.relative(root, absolute).split(path.sep).join('/');
  const source = fs.readFileSync(absolute, 'utf8');

  // Optional affiliate/planning mounts must consume no layout space until
  // client code injects substantive content. This turns the Bentsen fix into
  // a sitewide invariant instead of relying on route-by-route policing.
  const staySlotTags = source.match(/<[^>]*data-stay-nearby-slot[^>]*>/gs) ?? [];
  for (const tag of staySlotTags) {
    const isEmptyMount = /<[^>]*data-stay-nearby-slot[^>]*>\s*<\/[^>]+>$/s.test(tag);
    if (isEmptyMount && /className\s*=|\bclass\s*=|\bstyle\s*=/.test(tag)) {
      failures.push(`${file} styles an empty Stay Nearby slot; optional mounts must be zero-space until populated.`);
    }
  }

  // Never allow a Suspense fallback to manufacture a large empty viewport.
  // A compact visible loading state is preferable to blank reserved space.
  if (/fallback\s*=\s*\{?<[^>]+className=["'][^"']*min-h-(?:screen|\[[^\]]+\])[^"']*["'][^>]*\/?>(?:<\/[^>]+>)?\}?/s.test(source)) {
    failures.push(`${file} renders a large blank Suspense fallback; use a compact visible loading status.`);
  }
}

const lazyRoutes = [
  'src/routes/fishing.tsx',
  'src/routes/fishing.lakes.tsx',
  'src/routes/fishing.access.tsx',
  'src/routes/fishing.species.tsx',
  'src/routes/fishing.seasons.tsx',
  'src/routes/fishing.services.tsx',
  'src/routes/fishing.reports.$slug.tsx',
  'src/routes/shop.product.$productId.tsx',
];

for (const file of lazyRoutes) {
  const source = read(file);
  if (source.includes('fallback={<div className="min-h-[')) {
    failures.push(`${file} still renders a large blank Suspense fallback.`);
  }
  if (!source.includes('role="status"')) {
    failures.push(`${file} must expose a visible compact loading status instead of an empty placeholder.`);
  }
}

if (failures.length) {
  console.error('Sitewide dead-space validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sitewide dead-space safeguards passed: bounded editorial heroes, all empty Stay Nearby mounts are zero-space, and compact visible lazy-route fallbacks are intact.');

