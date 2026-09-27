import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const route = read('src/routes/sports-venue.$slug.tsx');
const quickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const heroEndpoint = read('src/routes/api.sports-venue-hero.ts');
const wave7Photos = read('src/data/sports-venue-images-additions-wave7.ts');
const productionVerifier = read('scripts/ci/verify-sports-venue-heroes-production.mjs');
const exhaustiveProductionVerifier = read('scripts/ci/verify-sports-venue-heroes-production-all.mjs');

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
  'const photo = getSportsVenuePhoto(slug);',
  'shared sports venue guide must retain the governed photo for attribution and event-image identity',
);
requireText(
  guideContent,
  'const renderedPhoto = photo',
  'shared sports venue guide must separate rendered hero delivery from governed photo metadata',
);
requireText(
  guideContent,
  'imageUrl: `/api/sports-venue-hero?slug=${encodeURIComponent(slug)}`',
  'hydrated sports venue hero must use the server-authoritative hero endpoint instead of a bundled image URL',
);
requireText(
  guideContent,
  'photo={renderedPhoto}',
  'shared sports venue guide must render the server-authoritative hero URL',
);
requireText(
  guideContent,
  '[photo.imageUrl, photo.sourcePage]',
  'event-image dedupe must continue comparing against the governed venue photo',
);
requireText(
  guideContent,
  'export function SportsVenueGuidePilotContent(',
  'shared sports venue guide must expose a synchronous named export for the dynamic route',
);
requireText(
  heroEndpoint,
  "'cache-control': 'no-store'",
  'server-authoritative sports venue hero redirects must not preserve stale photo locations',
);
forbidText(
  heroEndpoint,
  "'cache-control': 'public, max-age=86400, stale-while-revalidate=604800'",
  'sports venue hero endpoint must not cache redirects for a day after governed image changes',
);

for (const marker of [
  "'cy-fair-fcu-stadium': {",
  "sourcePage: 'https://commons.wikimedia.org/wiki/File:Berry_Center.jpg'",
  "licenseName: 'Public domain'",
]) requireText(wave7Photos, marker, 'Cy-Fair Wave 7 reusable hero record');
for (const forbidden of [
  'Texas Defined generated media',
  'Cloudflare Workers AI / FLUX.1 schnell',
  'AI-generated photorealistic editorial depiction of',
]) forbidText(wave7Photos, forbidden, 'Wave 7 must not retain generated venue depictions');

requireText(
  productionVerifier,
  "await import('./verify-sports-venue-heroes-production-all.mjs');",
  'targeted production verification must delegate to the dynamic exhaustive contract',
);
for (const marker of [
  'const governedSlugs = [...dynamicSlugs',
  'const missingSlugs = governedSlugs.filter',
  'Unapproved generated venue hero',
  'inspectFallback',
  'intentional fail-closed fallbacks',
]) requireText(exhaustiveProductionVerifier, marker, 'dynamic live hero verifier must protect approved-photo and fallback delivery');

if (failures.length) {
  console.error('Sports venue SSR hero validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue SSR hero validation passed: guide content is server-visible, hydrated rendered heroes remain server-authoritative, redirect caching cannot revive stale image URLs, governed attribution and event-image identity remain intact, and both targeted and exhaustive live production verification protect current generated-vs-real attribution semantics under the sitewide AI disclosure.');
