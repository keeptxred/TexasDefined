import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/sports-venue.$slug.tsx');
const quickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const wave7Photos = read('src/data/sports-venue-images-additions-wave7.ts');
const productionVerifier = read('scripts/ci/verify-sports-venue-heroes-production.mjs');

const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const forbidText = (source, needle, label) => {
  if (source.includes(needle)) failures.push(`${label}: forbidden ${needle}`);
};

requireText(
  route,
  "import { SportsVenueGuidePilotContent } from '@/components/sports/SportsVenueGuidePilotContent';",
  'sports venue route must synchronously import SEO-critical guide content',
);
forbidText(
  route,
  "const SportsVenueGuidePilotContent = lazy(",
  'sports venue guide must not be hidden behind a lazy SSR boundary',
);
forbidText(
  route,
  '<Suspense fallback={null}>\n      <SportsVenueGuidePilotContent',
  'sports venue guide must not render a null SSR fallback',
);
requireText(
  route,
  'return <SportsVenueGuidePilotContent',
  'sports venue guide must render directly in the initial response',
);

requireText(
  quickAnswers,
  "import { getSportsVenuePhoto } from '@/data/sports-venue-images-all';",
  'legacy sports venue hero metadata must use the aggregate photo registry',
);
forbidText(
  quickAnswers,
  "from '@/data/sports-venue-images';",
  'legacy sports venue hero metadata must not use the base-only photo registry',
);
requireText(
  guideContent,
  "import { getSportsVenuePhoto } from \"@/data/sports-venue-images-all\";",
  'shared sports venue guide must use the aggregate photo registry',
);
requireText(
  guideContent,
  'export function SportsVenueGuidePilotContent(',
  'shared sports venue guide must expose a synchronous named export for the dynamic route',
);

for (const marker of [
  '"amarillo-national-center": {',
  'AI-generated photorealistic editorial depiction of Amarillo National Center in Amarillo, Texas',
]) requireText(wave7Photos, marker, 'Amarillo Wave 7 governed hero record');

for (const marker of [
  "['amarillo-national-center', 'AI-generated photorealistic editorial depiction of Amarillo National Center in Amarillo, Texas']",
  'const wave7RealPhotoAttribution = {',
  "'round-rock-sports-center': ['Wikimedia Commons', 'Tony Webster', 'CC BY 2.0']",
  "'texas-motorplex': ['Wikimedia Commons', 'Michael Barera', 'CC BY-SA 4.0']",
  "'AI-generated representative editorial image'",
  "'not documentary photography'",
  '...attributionMarkers',
  'lastBody = await response.text();',
  "headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' }",
]) requireText(productionVerifier, marker, 'live raw-HTML hero and attribution production contract');

if (failures.length) {
  console.error('Sports venue SSR hero validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue SSR hero validation passed: guide content is server-visible, runtime hero metadata uses the aggregate photo registry, and live production verification protects generated-vs-real attribution semantics.');
