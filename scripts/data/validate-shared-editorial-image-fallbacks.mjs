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
]) requireMarker('image fallback helper', marker);

for (const label of ['article cards', 'feature heroes', 'category heroes', 'destination heroes', 'event carousel']) {
  requireMarker(label, 'recoverOrHideImage');
  requireMarker(label, 'onError=');
}

for (const label of ['article cards', 'feature heroes', 'category heroes', 'destination heroes']) {
  requireMarker(label, 'Photo unavailable');
}

requireMarker('article cards', 'relative w-full overflow-hidden');
requireMarker('article cards', 'absolute inset-0 size-full object-cover');
requireMarker('destination heroes', 'CADD0_REFUGE_HERO');
requireMarker('destination heroes', '"caddo-lake-national-wildlife-refuge"');
requireMarker('destination heroes', 'destinationHero(destination)');
requireMarker('destination heroes', 'src: caddoLake');
requireMarker('event carousel', 'image.nextElementSibling');
requireMarker('event carousel', 'credit.style.display = "none"');

if (errors.length) {
  console.error('Shared editorial image fallback validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Shared editorial image fallback validation passed.');
