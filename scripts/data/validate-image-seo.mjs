import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const errors = [];
const types = read('src/data/types.ts');
const articleCard = read('src/components/editorial/ArticleCard.tsx');
const destinationCard = read('src/components/editorial/DestinationCard.tsx');
const featureHero = read('src/components/editorial/FeatureHero.tsx');
const articleRoute = read('src/routes/article.$slug.tsx');
const destinationRouteShell = read('src/routes/destination.$slug.tsx');
const destinationPresentation = read('src/components/editorial/DestinationPageContent.tsx');
const destinationRoute = `${destinationRouteShell}\n${destinationPresentation}`;
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

if (errors.length) {
  console.error('TexasDefined image performance and accessibility validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Image SEO, responsive sizing, touch targets, focus handling, reduced motion, and hero uniqueness are protected.');
