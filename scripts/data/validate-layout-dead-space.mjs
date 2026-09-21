import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const failures = [];

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
    file: 'src/routes/search.lazy.tsx',
    forbidden: ['min-h-[42vh]'],
    required: ['No search results', 'Search results'],
  },
  {
    file: 'src/components/sports/SportsVenueGuidePage.tsx',
    forbidden: ['min-h-[32rem]'],
    required: ['min-h-40', 'Venue details and planning information continue below.'],
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


const fullPageLazyRoutes = [
  'src/routes/texas-toll-tags.tsx',
  'src/routes/texas-by-texas-txt.tsx',
  'src/routes/what-does-chud-mean.tsx',
  'src/routes/start-a-business-in-texas.tsx',
  'src/routes/everything-bigger-in-texas.tsx',
  'src/routes/track-texas-drivers-license.tsx',
  'src/routes/replace-texas-registration-receipt.tsx',
  'src/routes/dogs.{-$breed}.lazy.tsx',
  'src/routes/explore.top-attractions.methodology.tsx',
  'src/routes/explore.top-attractions.road-trips.tsx',
];

for (const file of fullPageLazyRoutes) {
  const source = read(file);
  if (source.includes('<Suspense fallback={null}>')) {
    failures.push(`${file} still has a silent full-page Suspense fallback.`);
  }
  if (!source.includes('role="status"')) {
    failures.push(`${file} must expose a compact visible loading status.`);
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

console.log('Sitewide dead-space safeguards passed: bounded editorial heroes, zero-margin empty stay slots, compact media fallbacks and compact visible lazy-route fallbacks are intact.');
