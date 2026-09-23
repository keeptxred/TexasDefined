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
  ['news index cards', 'src/routes/news.index.lazy.tsx'],
  ['live news hero', 'src/routes/news.$slug.lazy.tsx'],
  ['article hero', 'src/routes/article.$slug.tsx'],
  ['homepage destination feature', 'src/routes/index.lazy.tsx'],
  ['regional guide hero', 'src/routes/explore.region.$region.tsx'],
  ['product cards', 'src/components/commerce/ProductCard.tsx'],
  ['collection cards', 'src/components/commerce/CollectionStrip.tsx'],
  ['shop the story', 'src/components/commerce/ShopTheStory.tsx'],
  ['product detail', 'src/components/commerce/ProductDetailPage.tsx'],
  ['painted church gallery', 'src/components/editorial/PaintedChurchGallery.tsx'],
  ['painted church then and now', 'src/components/editorial/PaintedChurchThenAndNow.tsx'],
  ['parking map panel', 'src/components/parking/ParkingMapPanel.tsx'],
  ['sports quick-answer hero', 'src/components/sports/SportsVenueQuickAnswers.tsx'],
  ['camping guide imagery', 'src/routes/best-places-to-go-camping-in-texas.lazy.tsx'],
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
  'Venue details and planning information continue below.',
]) requireMarker('sports venue photo', marker);
if ((source.get('sports venue photo') ?? '').includes('min-h-[32rem]')) {
  errors.push('sports venue photo fallback must not reserve a 32rem blank block when imagery is unavailable.');
}
requireMarker('sports venue photo', 'px-8 py-12');

for (const marker of [
  'failedImage',
  'setFailedImage',
  'const showImage = Boolean(image && failedImage !== image)',
  'onError={() => setFailedImage(image)}',
  'Find it on the map',
]) requireMarker('map preview', marker);

for (const label of ['news index cards', 'article hero', 'homepage destination feature', 'regional guide hero', 'product cards', 'collection cards', 'shop the story']) {
  requireMarker(label, 'onError=');
}

for (const label of ['news index cards', 'article hero', 'homepage destination feature', 'regional guide hero', 'product cards', 'collection cards', 'shop the story']) {
  requireMarker(label, 'recoverOrHideImage');
}

for (const marker of [
  'failedHero',
  'setFailedHero',
  'failedHero === article.hero.src',
  'failedHero !== article.hero.src',
]) requireMarker('live news hero', marker);

for (const marker of [
  'failedImage',
  'setFailedImage',
  'const showImage = failedImage !== image',
  'Product image unavailable.',
]) requireMarker('product detail', marker);

for (const label of ['news index cards', 'homepage destination feature']) {
  requireMarker(label, 'Photo unavailable');
}

for (const label of ['product cards', 'shop the story']) {
  requireMarker(label, 'Product image unavailable');
}

requireMarker('collection cards', 'Collection image unavailable');

for (const marker of [
  'hideFailedImageContainer',
  'onError=',
]) requireMarker('painted church gallery', marker);

for (const marker of [
  'failedCurrentImage',
  'setFailedCurrentImage',
  'currentImageAvailable',
  'Current photograph unavailable',
]) requireMarker('painted church then and now', marker);

for (const marker of [
  'failedImage',
  'setFailedImage',
  'imageAvailable',
  'Parking map image unavailable',
  'official parking sources',
]) requireMarker('parking map panel', marker);

for (const marker of [
  'failedHero',
  'setFailedHero',
  'heroSrc && failedHero !== heroSrc',
  'onError={() => setFailedHero(heroSrc)}',
]) requireMarker('sports quick-answer hero', marker);

for (const marker of [
  'failedImages',
  'markImageFailed',
  'failedImages.has(hero.src)',
  'markImageFailed(item.image.src)',
  'item.image.src === caddoLake',
  'Photo unavailable.',
]) requireMarker('camping guide imagery', marker);

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
