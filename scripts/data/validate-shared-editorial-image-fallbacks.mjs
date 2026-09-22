import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

const files = new Map([
  ['image fallback helper', 'src/lib/image-fallback.ts'],
  ['article cards', 'src/components/editorial/ArticleCard.tsx'],
  ['feature heroes', 'src/components/editorial/FeatureHero.tsx'],
  ['category heroes', 'src/components/editorial/CategoryPage.tsx'],
  ['destination heroes', 'src/routes/destination.$slug.tsx'],
  ['event carousel', 'src/components/editorial/TexasEventCarousel.tsx'],
  ['article body images', 'src/components/editorial/ArticleBody.tsx'],
  ['evergreen guide hero', 'src/components/editorial/TexasEvergreenGuide.tsx'],
  ['camping discovery cards', 'src/components/camping/CampingDiscovery.tsx'],
  ['county feature image', 'src/components/content/CountyGuideSections.tsx'],
  ['sports venue photo', 'src/components/sports/SportsVenueGuidePage.tsx'],
  ['map preview', 'src/components/editorial/MapPreview.tsx'],
  ['news index images', 'src/routes/news.index.lazy.tsx'],
  ['live news hero', 'src/routes/news.$slug.lazy.tsx'],
  ['article page hero', 'src/routes/article.$slug.tsx'],
  ['homepage drive image', 'src/routes/index.lazy.tsx'],
  ['regional hero', 'src/routes/explore.region.$region.tsx'],
  ['painted church gallery', 'src/components/editorial/PaintedChurchGallery.tsx'],
  ['painted church comparison', 'src/components/editorial/PaintedChurchThenAndNow.tsx'],
]);

const source = new Map();
for (const [label, relativePath] of files) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`Missing shared image-failure surface: ${relativePath}`);
    continue;
  }
  source.set(label, fs.readFileSync(absolutePath, 'utf8'));
}

function requireMarker(label, marker) {
  const content = source.get(label) ?? '';
  if (!content.includes(marker)) errors.push(`${label} missing image-failure safeguard: ${marker}`);
}

for (const marker of [
  'recoverOrHideImage',
  'image.dataset.fallbackSrc',
  'image.style.display = "none"',
  'hideFailedImageContainer',
  'image.closest<HTMLElement>(selector)',
  'container.style.display = "none"',
]) requireMarker('image fallback helper', marker);

for (const label of ['article cards', 'feature heroes', 'category heroes', 'destination heroes', 'event carousel']) {
  requireMarker(label, 'recoverOrHideImage');
  requireMarker(label, 'onError=');
}

for (const label of ['article body images', 'evergreen guide hero', 'camping discovery cards', 'county feature image']) {
  requireMarker(label, 'hideFailedImageContainer');
  requireMarker(label, 'onError=');
}

for (const marker of [
  'failedUrl',
  'setFailedUrl',
  'failedUrl === photo.imageUrl',
  'onError={() => setFailedUrl(photo.imageUrl)}',
  'A verified venue photograph is not available yet.',
]) requireMarker('sports venue photo', marker);

for (const marker of [
  'failedImage',
  'setFailedImage',
  'const showImage = Boolean(image && failedImage !== image)',
  'onError={() => setFailedImage(image)}',
  'Find it on the map',
]) requireMarker('map preview', marker);

for (const marker of [
  'failedHero',
  'setFailedHero',
  'const heroAvailable = failedHero !== article.hero.src',
  'onError={() => setFailedHero(article.hero.src)}',
  'article.hero.credit && heroAvailable',
]) requireMarker('live news hero', marker);

for (const label of ['news index images', 'article page hero', 'homepage drive image', 'regional hero']) {
  requireMarker(label, 'recoverOrHideImage');
  requireMarker(label, 'onError=');
}
requireMarker('news index images', 'Photo unavailable');
requireMarker('homepage drive image', 'Photo unavailable');

for (const marker of [
  'hideFailedImageContainer',
  'onError=',
]) requireMarker('painted church gallery', marker);

for (const marker of [
  'failedCurrentImage',
  'setFailedCurrentImage',
  'Current photograph temporarily unavailable.',
  'onError={() => setFailedCurrentImage(currentPrimary.src)}',
]) requireMarker('painted church comparison', marker);

for (const label of ['article cards', 'feature heroes', 'category heroes', 'destination heroes']) {
  requireMarker(label, 'Photo unavailable');
}

requireMarker('article cards', 'relative w-full overflow-hidden');
requireMarker('article cards', 'absolute inset-0 size-full object-cover');
requireMarker('destination heroes', '"caddo-lake-national-wildlife-refuge"');
requireMarker('destination heroes', 'src: caddoLake');
requireMarker('event carousel', 'image.nextElementSibling');
requireMarker('event carousel', 'credit.style.display = "none"');

if (errors.length) {
  console.error('Shared editorial image fallback validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Shared editorial image fallback validation passed.');
