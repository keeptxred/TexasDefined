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

forbidText(
  wave7Photos,
  '"amarillo-national-center": {',
  'Amarillo National Center must remain on the documentary-photo fallback until reusable exact media is approved',
);
requireText(
  wave7Photos,
  '"round-rock-sports-center": {',
  'Wave 7 must retain the reviewed Round Rock Sports Center documentary photo',
);
requireText(
  wave7Photos,
  '"texas-motorplex": {',
  'Wave 7 must retain the reviewed Texas Motorplex documentary photo',
);

for (const marker of [
  'const representativePhotoSlugs = [',
  "'round-rock-sports-center'",
  "'texas-motorplex'",
  "'legacy-stadium-katy'",
  "'amarillo-national-center-fallback'",
  'expectFallback: true',
  "const fallbackText = 'A verified venue photograph is not available yet.';",
  'lastBody = await response.text();',
  "headers: { 'user-agent': 'TexasDefined-CI-Production-Smoke/1.0' }",
]) requireText(productionVerifier, marker, 'live raw-HTML documentary hero and fallback production contract');
forbidText(
  productionVerifier,
  "'AI-generated representative editorial image'",
  'live raw-HTML production contract must defer AI details to the sitewide disclosure',
);

for (const marker of [
  "if (!decodedBody.includes(endpointPath) && !decodedBody.includes(`${origin}${endpointPath}`)) missing.push('same-origin governed hero endpoint');",
  "if (!decodedBody.includes('Editorial illustration by')) missing.push('editorial-illustration disclosure');",
  "if (!decodedBody.includes('for TexasDefined; not documentary photography.')) missing.push('not-documentary-photography disclosure');",
]) requireText(exhaustiveProductionVerifier, marker, 'exhaustive live hero verifier must protect governed delivery and current attribution semantics');
forbidText(
  exhaustiveProductionVerifier,
  "decodedBody.includes('AI-generated representative editorial image')",
  'exhaustive live verifier must not require the retired repetitive AI label',
);

if (failures.length) {
  console.error('Sports venue SSR hero validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Sports venue SSR hero validation passed: guide content is server-visible, hydrated approved heroes remain server-authoritative, redirect caching cannot revive stale image URLs, documentary attribution and event-image identity remain intact, and targeted production verification protects both approved-photo rendering and intentional fail-closed fallback behavior.');
