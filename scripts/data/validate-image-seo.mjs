import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const errors = [];
const types = read('src/data/types.ts');
const articleCard = read('src/components/editorial/ArticleCard.tsx');
const destinationCard = read('src/components/editorial/DestinationCard.tsx');
const featureHero = read('src/components/editorial/FeatureHero.tsx');
const articleRoute = read('src/routes/article.$slug.tsx');
const destinationRoute = read('src/routes/destination.$slug.tsx');
const duplicateGuard = read('scripts/data/validate-editorial-image-duplicates.mjs');
const header = read('src/components/layout/Header.tsx');
const rootRoute = read('src/routes/__root.tsx');
const button = read('src/components/ui/button.tsx');
const input = read('src/components/ui/input.tsx');
const select = read('src/components/ui/select.tsx');
const styles = read('src/styles.css');
const productCard = read('src/components/commerce/ProductCard.tsx');
const shopTheStory = read('src/components/commerce/ShopTheStory.tsx');
const collectionStrip = read('src/components/commerce/CollectionStrip.tsx');
const governance = read('docs/site-image-governance.md');
const imageFallback = read('src/lib/image-fallback.ts');
const imageReconciler = read('scripts/data/populate-missing-site-images.mjs');
const imageWorkflow = read('.github/workflows/populate-missing-site-images.yml');
const productionImageAudit = read('scripts/ci/verify-image-discover-production.mjs');
const productionImageWorkflow = read('.github/workflows/audit-image-discover-production.yml');
const eventImagePolicy = read('src/data/major-event-schema-enrichment.server.ts');
const eventAuthority = read('src/data/major-event-authority.ts');
const eventRoute = read('src/routes/event.$slug.tsx');
const eventImageAudit = read('scripts/data/audit-event-schema-enrichment.mjs');
const mergeGate = read('.github/workflows/merge-gate.yml');
const premergeRunner = read('scripts/ci/run-premerge-validation.mjs');
const sitemap = read('src/routes/sitemap[.]xml.ts');
const venueImageValidator = read('scripts/data/validate-sports-venue-photo-additions-final.mjs');
const techniqueImages = read('src/data/fishing/technique-images.ts');
const techniqueServer = read('src/data/fishing/technique-data.server.ts');
const fishingSitemap = read('src/data/fishing/sitemap.ts');
const techniqueImageAudit = read('scripts/data/validate-fishing-technique-image-readiness.mjs');

for (const field of ['src: string', 'alt: string', 'width: number', 'height: number']) {
  if (!types.includes(field)) errors.push(`ImageRef must require ${field}.`);
}

for (const [name, source] of [['ArticleCard', articleCard], ['DestinationCard', destinationCard]]) {
  if (!source.includes('loading={eager ? "eager" : "lazy"}')) errors.push(`${name} must lazy-load non-priority images.`);
  if (!source.includes('fetchPriority={eager ? "high" : "auto"}')) errors.push(`${name} must raise fetch priority only for eager images.`);
  for (const feature of ['sizes=', 'width=', 'height=', 'alt=', 'decoding="async"']) {
    if (!source.includes(feature)) errors.push(`${name} image contract missing: ${feature}`);
  }
}

for (const marker of [
  'if (isDestinationPhotoPlaceholder(hero.src)) return null;',
  'function hasEditorialImage',
  'data-image-frame',
  'frame.style.display = "none"',
  'hasImage ? "bg-muted" : "bg-ink"',
]) {
  if (!destinationCard.includes(marker)) errors.push(`Destination cards must omit placeholder/broken image frames cleanly: ${marker}`);
}
for (const forbidden of ['radial-gradient(circle_at_72%_24%', 'texasdefined-destination-placeholder.svg']) {
  if (destinationCard.includes(forbidden)) errors.push(`Destination cards must not present a procedural or placeholder graphic as editorial imagery: ${forbidden}`);
}

for (const marker of [
  'export function collapseFailedImageFrame',
  'closest<HTMLElement>("[data-image-frame]")',
  'if (!collapseFailedImageFrame(image)) image.style.display = "none";',
]) {
  if (!imageFallback.includes(marker)) errors.push(`Shared image failure handling must collapse opted-in blank frames: ${marker}`);
}

for (const feature of ['loading="eager"', 'fetchPriority="high"', 'sizes="100vw"', 'sizes="(min-width: 1024px) 58vw, 100vw"', 'width={image.width}', 'height={image.height}', 'alt={image.alt}']) {
  if (!featureHero.includes(feature)) errors.push(`FeatureHero image contract missing: ${feature}`);
}

for (const [name, source] of [['Article route', articleRoute], ['Destination route', destinationRoute]]) {
  for (const feature of ['fetchPriority="high"', 'width=', 'height=', 'alt=', 'decoding="async"']) {
    if (!source.includes(feature)) errors.push(`${name} primary hero contract missing: ${feature}`);
  }
}

for (const [name, source] of [['ProductCard', productCard], ['ShopTheStory', shopTheStory], ['CollectionStrip', collectionStrip], ['Header navigation imagery', header]]) {
  for (const feature of ['sizes=', 'width=', 'height=', 'alt=', 'loading="lazy"', 'decoding="async"']) {
    if (!source.includes(feature)) errors.push(`${name} responsive image contract missing: ${feature}`);
  }
}

for (const feature of ['duplicate hero image group', 'Every editorial article must have its own hero image']) {
  if (!duplicateGuard.includes(feature)) errors.push(`Editorial image uniqueness protection missing: ${feature}`);
}
if (!articleRoute.includes('DISCOVER_MIN_IMAGE_WIDTH = 1200')) errors.push('Article route must preserve the 1200px Discover image threshold.');
if (!articleRoute.includes('max-image-preview:large') && !read('src/lib/seo.ts').includes('max-image-preview:large')) errors.push('Indexed pages must allow large image previews.');

if (!header.includes('href="#main"') || !rootRoute.includes('<main id="main"')) errors.push('Global skip-to-content navigation must target the main landmark.');
if (!header.includes('min-h-11 min-w-11')) errors.push('Header icon controls must preserve 44px touch targets.');
if (!button.includes('icon: "h-11 w-11"')) errors.push('Shared icon buttons must preserve a 44px touch target.');
if (!input.includes('h-11 w-full')) errors.push('Shared text inputs must preserve a 44px control height.');
if (!select.includes('h-11 w-full')) errors.push('Shared select triggers must preserve a 44px control height.');
if (!styles.includes(':focus-visible')) errors.push('Global focus-visible styling must remain enabled.');
if (!styles.includes('@media (prefers-reduced-motion: reduce)')) errors.push('Reduced-motion support must remain enabled.');
if (!productCard.includes('min-h-11 min-w-11')) errors.push('Product save control must preserve a 44px touch target.');

for (const marker of [
  'Every public, indexable TexasDefined directory/detail page',
  'Exact-subject reusable real image',
  'Photorealistic AI fallback',
  'must emit `noindex, follow, max-image-preview:large`',
  'must not be emitted in an indexable sitemap',
  'Discover and social-preview contract',
  'Responsive-image and Core Web Vitals rule',
]) {
  if (!governance.includes(marker)) errors.push(`Site image governance documentation missing: ${marker}`);
}

for (const marker of [
  '@cf/black-forest-labs/flux-1-schnell',
  'async function generateAiJpeg',
  'source: "ai-generated"',
  'source: "free-use"',
  'unresolved; preserving placeholder and failing closed',
]) {
  if (!imageReconciler.includes(marker)) errors.push(`Missing governed image-reconciliation behavior: ${marker}`);
}
for (const forbidden of ['generatedRepresentative(', 'gradient:${h1}-${h2}', 'Generated representative image · Texas Defined']) {
  if (imageReconciler.includes(forbidden)) errors.push(`Procedural placeholder fallback must not be accepted: ${forbidden}`);
}
for (const marker of ['CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}', 'CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}']) {
  if (!imageWorkflow.includes(marker)) errors.push(`Missing image-generation workflow credential binding: ${marker}`);
}

for (const marker of [
  'const MIN_DISCOVER_WIDTH = 1200;',
  'const MIN_DISCOVER_PIXELS = 300_000;',
  'max-image-preview:large',
  "twitterCard !== 'summary_large_image'",
  'missing-og-image-alt',
  'preferred-image-looks-generic-or-placeholder',
  'preferred-image-svg',
  'preferred-image-reused-',
  '/^\\/destination\\//',
  '/^\\/county\\//',
  '/^\\/fishing(?:\\/|$)/',
  '/^\\/event\\//',
  '/^\\/sports-venue\\//',
  '/^\\/article\\//',
]) {
  if (!productionImageAudit.includes(marker)) errors.push(`Production image/Discover crawler missing: ${marker}`);
}
for (const marker of [
  'name: Image and Discover production audit',
  "IMAGE_AUDIT_STRICT: '1'",
  'node scripts/ci/verify-image-discover-production.mjs',
  'image-discover-production-report.json',
]) {
  if (!productionImageWorkflow.includes(marker)) errors.push(`Production image/Discover workflow missing: ${marker}`);
}

for (const marker of [
  'export function isCompliantMajorEventImage',
  'export function hasCompliantMajorEventImageServer',
  'approvedForCommercialUse === true',
  'typeof image.exactLocation === "boolean"',
  'image.sourceType === "ai-generated"',
  'image.aiGenerated === true',
  'image.exactLocation !== true',
  'image.sourceType === "wikimedia"',
  'image.sourceType === "flickr-cc"',
  'validHttpsUrl(image.licenseUrl)',
]) {
  if (!eventImagePolicy.includes(marker)) errors.push(`Major-event image compliance policy missing: ${marker}`);
}
for (const forbidden of [
  'if (sourceHost === "commons.wikimedia.org") return true;',
  'if (sourceHost === "texasdefined.com" && /\\bAI[- ]generated\\b/i.test(image.alt)) return true;',
]) {
  if (eventImagePolicy.includes(forbidden)) errors.push(`Major-event image compliance must not trust source host or alt text without structured provenance: ${forbidden}`);
}
if (!eventAuthority.includes('imageCompliant: hasCompliantMajorEventImageServer(data.slug)')) errors.push('Major-event authority must expose hero-image compliance.');
if (!eventRoute.includes('robots: page.imageCompliant ? undefined : "noindex, follow, max-image-preview:large"')) errors.push('Major-event route must noindex image-incomplete guides.');
for (const marker of [
  'hasCompliantMajorEventImageServer',
  '.filter((event) => hasCompliantMajorEventImageServer(event.slug))',
  'slug ? hasCompliantMajorEventImageServer(slug) : true',
]) {
  if (!sitemap.includes(marker)) errors.push(`Event sitemap must exclude image-incomplete guides: ${marker}`);
}
for (const marker of [
  'major-event-schema-enrichment-overrides.server.ts',
  'const effectiveBySlug = new Map(batchBySlug)',
  'duplicate batch enrichment slugs',
  'duplicate override enrichment slugs',
  'imageMetadataIncomplete',
  'approvedForCommercialUse:true',
  'exactLocation:true for real image',
  'provenanceCompleteImages',
  'imageRemediationPending',
  'imageCoverageComplete',
]) {
  if (!eventImageAudit.includes(marker)) errors.push(`Major-event effective image audit guard missing: ${marker}`);
}
if (!mergeGate.includes('node scripts/ci/run-premerge-validation.mjs')) errors.push('Required merge gate must invoke the canonical pre-merge validation contract.');
if (!premergeRunner.includes("'scripts/data/audit-event-schema-enrichment.mjs'")) errors.push('Canonical pre-merge contract must run the event image coverage audit.');

for (const marker of [
  'const { getSportsVenuePhoto } = await import("@/data/sports-venue-images-all");',
  '.filter((entity) => entity.kind !== "sports-venue" || Boolean(getSportsVenuePhoto(entity.slug)))',
]) {
  if (!sitemap.includes(marker)) errors.push(`Sports venue sitemap must honor the approved-photo indexability gate: ${marker}`);
}

for (const marker of [
  'Could not derive governed dynamic sports venue slugs from the route',
  'Duplicate supplemental sports venue slugs',
  'photo record targets nonexistent/unapproved venue',
  'only the owner-approved Xtreme Raceway exception is permitted',
  'Multiple venues share hero image URL',
  'Multiple venues share hero source page',
  'Remaining fallback count:',
  'Missing slugs:',
]) {
  if (!venueImageValidator.includes(marker)) errors.push(`Sports venue image coverage guard missing: ${marker}`);
}

for (const marker of [
  'DISCOVER_MIN_TECHNIQUE_IMAGE_WIDTH = 1200',
  'SOCIAL_MIN_TECHNIQUE_IMAGE_HEIGHT = 630',
  'export function isFishingTechniqueHeroReady',
  'sourceType: "wikimedia"',
  'licenseLabel:',
  'licenseUrl:',
]) {
  if (!techniqueImages.includes(marker)) errors.push(`Fishing technique image readiness contract missing: ${marker}`);
}
if (!techniqueServer.includes('robots: imageReady ? undefined : "noindex, follow, max-image-preview:large"')) errors.push('Fishing technique profiles must fail closed when page-specific hero imagery is incomplete.');
if (!techniqueServer.includes('imageReady && images?.hero')) errors.push('Fishing technique social/schema images must be emitted only for governed ready heroes.');
if (!fishingSitemap.includes('.filter((slug) => isFishingTechniqueHeroReady(slug))')) errors.push('Fishing technique sitemap must exclude image-incomplete technique profiles.');
for (const marker of [
  'Fishing technique image readiness passed:',
  'hero width ${image.width}px is below the 1200px Discover floor',
  'Wikimedia hero is missing structured license metadata',
  'Fishing technique image coverage regressed below the remediated 7/9 baseline',
]) {
  if (!techniqueImageAudit.includes(marker)) errors.push(`Fishing technique regression audit missing: ${marker}`);
}

if (errors.length) {
  console.error('TexasDefined image performance, accessibility, Discover, social-preview, and governance validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Image SEO, responsive sizing, Discover/social metadata, rights-safe fallback, fail-closed indexing, accessibility, provenance, production crawling, and hero coverage governance are protected.');
