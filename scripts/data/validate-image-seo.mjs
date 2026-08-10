import fs from 'node:fs';

const errors = [];
const types = fs.readFileSync('src/data/types.ts', 'utf8');
const articleCard = fs.readFileSync('src/components/editorial/ArticleCard.tsx', 'utf8');
const destinationCard = fs.readFileSync('src/components/editorial/DestinationCard.tsx', 'utf8');
const featureHero = fs.readFileSync('src/components/editorial/FeatureHero.tsx', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const destinationRoute = fs.readFileSync('src/routes/destination.$slug.tsx', 'utf8');
const duplicateGuard = fs.readFileSync('scripts/data/validate-editorial-image-duplicates.mjs', 'utf8');

for (const field of ['src: string', 'alt: string', 'width: number', 'height: number']) {
  if (!types.includes(field)) errors.push(`ImageRef must require ${field}.`);
}

for (const [name, source] of [['ArticleCard', articleCard], ['DestinationCard', destinationCard]]) {
  if (!source.includes('loading={eager ? "eager" : "lazy"}')) errors.push(`${name} must lazy-load non-priority images.`);
  if (!source.includes('fetchPriority={eager ? "high" : "auto"}')) errors.push(`${name} must raise fetch priority only for eager images.`);
  if (!source.includes('sizes=')) errors.push(`${name} must provide responsive image sizes.`);
  if (!source.includes('width=')) errors.push(`${name} must render explicit image width.`);
  if (!source.includes('height=')) errors.push(`${name} must render explicit image height.`);
  if (!source.includes('alt=')) errors.push(`${name} must render image alt text.`);
  if (!source.includes('decoding="async"')) errors.push(`${name} must use async image decoding.`);
}

for (const feature of ['loading="eager"', 'fetchPriority="high"', 'sizes="100vw"', 'sizes="(min-width: 1024px) 58vw, 100vw"', 'width={image.width}', 'height={image.height}', 'alt={image.alt}']) {
  if (!featureHero.includes(feature)) errors.push(`FeatureHero image contract missing: ${feature}`);
}

for (const [name, source] of [['Article route', articleRoute], ['Destination route', destinationRoute]]) {
  for (const feature of ['fetchPriority="high"', 'width=', 'height=', 'alt=', 'decoding="async"']) {
    if (!source.includes(feature)) errors.push(`${name} primary hero contract missing: ${feature}`);
  }
}

for (const feature of ['duplicate hero image group', 'Every editorial article must have its own hero image']) {
  if (!duplicateGuard.includes(feature)) errors.push(`Editorial image uniqueness protection missing: ${feature}`);
}

if (!articleRoute.includes('DISCOVER_MIN_IMAGE_WIDTH = 1200')) {
  errors.push('Article route must preserve the 1200px Discover image threshold.');
}
if (!articleRoute.includes('max-image-preview:large') && !fs.readFileSync('src/lib/seo.ts', 'utf8').includes('max-image-preview:large')) {
  errors.push('Indexed pages must allow large image previews.');
}

if (errors.length) {
  console.error('TexasDefined image SEO validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Image SEO validation passed: descriptive alt/dimensions, responsive sizing, loading priority, Discover eligibility, and editorial hero uniqueness are protected.');
