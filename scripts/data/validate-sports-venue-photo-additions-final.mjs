import fs from 'node:fs';
import path from 'node:path';

const read = (filePath) => fs.readFileSync(filePath, 'utf8');
const base = read('src/data/sports-venue-images.ts');
const wave1 = read('src/data/sports-venue-images-additions.ts');
const wave2 = read('src/data/sports-venue-images-additions-wave2.ts');
const wave3 = read('src/data/sports-venue-images-additions-wave3.ts');
const wave4 = read('src/data/sports-venue-images-additions-wave4.ts');
const wave5 = read('src/data/sports-venue-images-additions-wave5.ts');
const wave6 = read('src/data/sports-venue-images-additions-wave6.ts');
const wave7 = read('src/data/sports-venue-images-additions-wave7.ts');
const combined = read('src/data/sports-venue-images-all.ts');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');

const failures = [];
const recordSlugs = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{/gm)].map((match) => match[1]);
const recordEntries = (source) => [...source.matchAll(/^  ["']([^"']+)["']: \{\n([\s\S]*?)^  \},$/gm)].map((match) => {
  const body = match[2];
  const stringField = (name) => body.match(new RegExp(`\\b${name}:\\s*(["'])(.*?)\\1`))?.[2] ?? '';
  const numberField = (name) => Number(body.match(new RegExp(`\\b${name}:\\s*(\\d+)`))?.[1] ?? 0);
  return {
    slug: match[1],
    alt: stringField('alt'),
    imageUrl: stringField('imageUrl'),
    sourcePage: stringField('sourcePage'),
    sourceName: stringField('sourceName'),
    author: stringField('author'),
    licenseName: stringField('licenseName'),
    licenseUrl: stringField('licenseUrl'),
    width: numberField('width'),
    height: numberField('height'),
  };
});
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const validateSingleWave = (source, expectedSlug, label) => {
  const slugs = recordSlugs(source);
  if (slugs.length !== 1 || slugs[0] !== expectedSlug) failures.push(`${label}: expected only ${expectedSlug}; found ${slugs.join(', ')}.`);
  for (const marker of [
    `slug: '${expectedSlug}'`,
    'alt:',
    "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/",
    "sourcePage: 'https://commons.wikimedia.org/wiki/File:",
    "sourceName: 'Wikimedia Commons'",
    'author:', 'licenseName:', 'licenseUrl:', 'width:', 'height:',
  ]) requireText(source, marker, label);
  const licenseUrl = source.match(/licenseUrl: '([^']+)'/)?.[1] ?? '';
  if (!licenseUrl.startsWith('https://creativecommons.org/')
      && licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
    failures.push(`${label}: unsupported license URL ${licenseUrl || '(missing)'}.`);
  }
  if (!/licenseName: '(?:CC|Public domain)/.test(source)) failures.push(`${label}: license name is not explicitly reusable.`);
  if (/author: '\s*'/.test(source)) failures.push(`${label}: author must not be empty.`);
  const dimensions = [...source.matchAll(/(?:width|height): (\d+)/g)].map((match) => Number(match[1]));
  if (dimensions.length !== 2 || dimensions.some((value) => value < 480)) failures.push(`${label}: dimensions are missing or too small.`);
  if (!dynamicRoute.includes(`'${expectedSlug}'`)) failures.push(`${label}: no governed dynamic venue route found.`);
};

validateSingleWave(wave3, 'ufcu-stadium', 'wave 3 UFCU Stadium photo');
validateSingleWave(wave4, 'round-rock-multipurpose-complex', 'wave 4 Round Rock Multipurpose Complex photo');
validateSingleWave(wave5, 'msr-houston', 'wave 5 MSR Houston photo');
validateSingleWave(wave6, 'baylor-ballpark', 'wave 6 Baylor Ballpark photo');
for (const marker of [
  "author: 'Michael Barera'",
  "licenseName: 'CC BY-SA 4.0'",
  "licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'",
  'width: 6000',
  'height: 4000',
  "sourcePage: 'https://commons.wikimedia.org/wiki/File:Baylor_University_June_2016_47_(Baylor_Ballpark).jpg'",
]) requireText(wave6, marker, 'wave 6 Baylor Ballpark verified rights metadata');

for (const source of [wave3, wave4, wave5, wave6, wave7]) {
  for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com', 'googleusercontent']) {
    if (source.toLowerCase().includes(forbidden)) failures.push(`Final venue image additions contain disallowed source ${forbidden}.`);
  }
  if (source.includes('http://')) failures.push('Final venue image additions must use HTTPS only.');
}

const wave7Slugs = recordSlugs(wave7);
if (wave7Slugs.length !== 16) failures.push(`Wave 7 must contain 16 reviewed venue heroes; found ${wave7Slugs.length}.`);

const wave7LocalImageMatches = [...wave7.matchAll(/imageUrl: "(\/images\/sports-venues\/[^"\n]+\.jpg)"/g)];
if (wave7LocalImageMatches.length !== 16) failures.push(`Wave 7 must map all 16 venues to local JPEG assets; found ${wave7LocalImageMatches.length}.`);
for (const [, imageUrl] of wave7LocalImageMatches) {
  const assetPath = path.join('public', imageUrl.replace(/^\//, ''));
  if (!fs.existsSync(assetPath)) {
    failures.push(`Wave 7 asset is missing: ${assetPath}.`);
    continue;
  }
  const size = fs.statSync(assetPath).size;
  if (size < 10_000) failures.push(`Wave 7 asset is suspiciously small (${size} bytes): ${assetPath}.`);
}

const wave7CommonsCount = wave7.match(/sourceName: "Wikimedia Commons"/g)?.length ?? 0;
const wave7GeneratedCount = wave7.match(/sourceName: "Texas Defined generated media"/g)?.length ?? 0;
if (wave7CommonsCount !== 2) failures.push(`Wave 7 must retain exactly 2 reviewed Wikimedia Commons venue photos; found ${wave7CommonsCount}.`);
if (wave7GeneratedCount !== 14) failures.push(`Wave 7 must retain exactly 14 generated venue-specific fallbacks; found ${wave7GeneratedCount}.`);
for (const slug of wave7Slugs) {
  if (!dynamicRoute.includes(`'${slug}'`)) failures.push(`Wave 7 venue has no governed dynamic route: ${slug}.`);
}
for (const marker of [
  'AI-generated photorealistic editorial depiction of',
  'author: "Cloudflare Workers AI / FLUX.1 schnell"',
  'licenseName: "AI-generated image supplied for TexasDefined use"',
  'sourcePage: "https://commons.wikimedia.org/wiki/File:Round_Rock_Sports_Center,_Texas_(47603155501).jpg"',
  'licenseName: "CC BY 2.0"',
  'sourcePage: "https://commons.wikimedia.org/wiki/File:Ennis_September_2017_30_(Texas_Motorplex).jpg"',
  'licenseName: "CC BY-SA 4.0"',
]) requireText(wave7, marker, 'wave 7 reviewed image provenance');

for (const marker of [
  "import { getSportsVenuePhotoAdditionWave3 } from './sports-venue-images-additions-wave3';",
  "import { getSportsVenuePhotoAdditionWave4 } from './sports-venue-images-additions-wave4';",
  "import { getSportsVenuePhotoAdditionWave5 } from './sports-venue-images-additions-wave5';",
  "import { getSportsVenuePhotoAdditionWave6 } from './sports-venue-images-additions-wave6';",
  "import { getSportsVenuePhotoAdditionWave7 } from './sports-venue-images-additions-wave7';",
  'getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug) ?? getSportsVenuePhotoAdditionWave2(slug) ?? getSportsVenuePhotoAdditionWave3(slug) ?? getSportsVenuePhotoAdditionWave4(slug) ?? getSportsVenuePhotoAdditionWave5(slug) ?? getSportsVenuePhotoAdditionWave6(slug) ?? getSportsVenuePhotoAdditionWave7(slug)',
]) requireText(combined, marker, 'combined final venue image registry');

const sources = [base, wave1, wave2, wave3, wave4, wave5, wave6, wave7];
const allSlugs = sources.flatMap(recordSlugs);
const unique = new Set(allSlugs);
const allowedBaseShadowDuplicates = new Set([
  'reliant-stadium',
  'kyle-field',
  'tdecu-stadium',
  'q2-stadium',
  'rice-stadium',
]);
const counts = new Map();
for (const slug of allSlugs) counts.set(slug, (counts.get(slug) ?? 0) + 1);
const duplicateSlugs = [...counts.entries()].filter(([, count]) => count > 1).map(([slug]) => slug);
const unexpectedDuplicates = duplicateSlugs.filter((slug) => !allowedBaseShadowDuplicates.has(slug));
const missingExpectedShadows = [...allowedBaseShadowDuplicates].filter((slug) => counts.get(slug) !== 2);
if (unexpectedDuplicates.length) failures.push(`Venue image registries contain unexpected duplicate slugs: ${unexpectedDuplicates.join(', ')}.`);
if (missingExpectedShadows.length) failures.push(`Expected base-first shadow duplicates changed: ${missingExpectedShadows.join(', ')}.`);
if (duplicateSlugs.length !== allowedBaseShadowDuplicates.size) failures.push(`Expected exactly ${allowedBaseShadowDuplicates.size} safe base-first shadow duplicates; found ${duplicateSlugs.length}.`);
if (unique.size !== 84) failures.push(`Expected governed hero coverage for all 84 seeded sports venues after wave 7; found ${unique.size}.`);

const effective = new Map();
for (const source of sources) {
  for (const entry of recordEntries(source)) {
    if (!effective.has(entry.slug)) effective.set(entry.slug, entry);
  }
}
if (effective.size !== 84) failures.push(`Expected 84 effective base-first venue image records; found ${effective.size}.`);

const approvedGeneratedFallbackSlugs = new Set([
  'amarillo-national-center',
  'colonial-country-club',
  'cy-fair-fcu-stadium',
  'expo-center-taylor-county',
  'hodgetown',
  'houston-motorsports-park',
  'waco-surf',
]);
const effectiveGeneratedFallbackSlugs = [...effective.values()]
  .filter((entry) => entry.sourceName === 'Texas Defined generated media')
  .map((entry) => entry.slug)
  .sort();
const unexpectedGeneratedFallbackSlugs = effectiveGeneratedFallbackSlugs
  .filter((slug) => !approvedGeneratedFallbackSlugs.has(slug));
if (unexpectedGeneratedFallbackSlugs.length) {
  failures.push(`Effective sports venue heroes added unapproved Texas Defined generated-media fallbacks: ${unexpectedGeneratedFallbackSlugs.join(', ')}.`);
}
if (effectiveGeneratedFallbackSlugs.length > approvedGeneratedFallbackSlugs.size) {
  failures.push(`Effective Texas Defined generated-media fallback count grew from the approved ceiling of ${approvedGeneratedFallbackSlugs.size} to ${effectiveGeneratedFallbackSlugs.length}.`);
}

const placeholderMarkers = ['placeholder', 'data:image/svg+xml', 'texasdefined-destination-placeholder', 'texasdefined-placeholder'];
const disallowedSourceMarkers = ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com', 'googleusercontent'];
const exactLegacyDimensionExceptions = new Map([
  ['xtreme-raceway-park', { width: 600, height: 400 }],
]);
for (const [slug, entry] of effective) {
  if (!entry.alt.trim()) failures.push(`Effective venue hero is missing alt text: ${slug}.`);
  if (!entry.imageUrl) failures.push(`Effective venue hero is missing imageUrl: ${slug}.`);
  const normalizedUrl = entry.imageUrl.toLowerCase();
  if (placeholderMarkers.some((marker) => normalizedUrl.includes(marker))) {
    failures.push(`Effective venue hero still points to a placeholder: ${slug} -> ${entry.imageUrl}.`);
  }
  if (entry.imageUrl.startsWith('/')) {
    const assetPath = path.join('public', entry.imageUrl.replace(/^\//, ''));
    if (!fs.existsSync(assetPath)) {
      failures.push(`Effective venue hero local asset is missing: ${slug} -> ${assetPath}.`);
    } else if (fs.statSync(assetPath).size < 10_000) {
      failures.push(`Effective venue hero local asset is suspiciously small: ${slug} -> ${assetPath}.`);
    }
  } else if (!entry.imageUrl.startsWith('https://')) {
    failures.push(`Effective venue hero image URL must be HTTPS or a local asset: ${slug} -> ${entry.imageUrl || '(missing)'}.`);
  }

  if (!entry.sourcePage.startsWith('https://')) failures.push(`Effective venue hero sourcePage must use HTTPS: ${slug} -> ${entry.sourcePage || '(missing)'}.`);
  if (!entry.sourceName.trim()) failures.push(`Effective venue hero is missing sourceName: ${slug}.`);
  if (!entry.author.trim()) failures.push(`Effective venue hero is missing author: ${slug}.`);
  if (!entry.licenseName.trim()) failures.push(`Effective venue hero is missing licenseName: ${slug}.`);
  if (!entry.licenseUrl.startsWith('https://')) failures.push(`Effective venue hero licenseUrl must use HTTPS: ${slug} -> ${entry.licenseUrl || '(missing)'}.`);

  if (entry.width < 480 || entry.height < 480) {
    const exception = exactLegacyDimensionExceptions.get(slug);
    if (!exception || entry.width !== exception.width || entry.height !== exception.height) {
      failures.push(`Effective venue hero dimensions are missing or too small: ${slug} -> ${entry.width}x${entry.height}.`);
    }
  }

  const provenance = `${entry.imageUrl} ${entry.sourcePage}`.toLowerCase();
  for (const forbidden of disallowedSourceMarkers) {
    if (provenance.includes(forbidden)) failures.push(`Effective venue hero uses disallowed source ${forbidden}: ${slug}.`);
  }

  const generated = entry.sourceName === 'Texas Defined generated media' || /^AI-generated\b/i.test(entry.licenseName);
  if (generated) {
    if (!entry.author.toLowerCase().includes('ai')) failures.push(`Generated venue hero author must identify AI generation: ${slug}.`);
    if (!/^AI-generated\b/i.test(entry.licenseName)) failures.push(`Generated venue hero licenseName must disclose AI generation: ${slug}.`);
    if (!entry.imageUrl.startsWith('/images/sports-venues/')) failures.push(`Generated venue hero must resolve to a governed local venue asset: ${slug} -> ${entry.imageUrl}.`);
    if (entry.sourceName === 'Texas Defined generated media' && !entry.alt.includes('AI-generated')) {
      failures.push(`Texas Defined generated venue hero alt text must disclose AI generation: ${slug}.`);
    }
  }

  if (entry.sourceName === 'Wikimedia Commons') {
    if (!entry.sourcePage.startsWith('https://commons.wikimedia.org/wiki/File:')) failures.push(`Wikimedia venue hero must link to its Commons file page: ${slug} -> ${entry.sourcePage}.`);
    if (!/^(CC|Public domain)/.test(entry.licenseName)) failures.push(`Wikimedia venue hero must carry an explicitly reusable license: ${slug} -> ${entry.licenseName}.`);
    if (!entry.licenseUrl.startsWith('https://creativecommons.org/')
        && entry.licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
      failures.push(`Wikimedia venue hero has unsupported license URL: ${slug} -> ${entry.licenseUrl}.`);
    }
  }
}

const repeatedValues = (field) => {
  const grouped = new Map();
  for (const [slug, entry] of effective) {
    const value = entry[field];
    if (!value) continue;
    const slugs = grouped.get(value) ?? [];
    slugs.push(slug);
    grouped.set(value, slugs);
  }
  return [...grouped.entries()].filter(([, slugs]) => slugs.length > 1);
};
for (const [imageUrl, slugs] of repeatedValues('imageUrl')) {
  failures.push(`Multiple sports venues resolve to the same hero image URL (${slugs.join(', ')}): ${imageUrl}.`);
}
for (const [sourcePage, slugs] of repeatedValues('sourcePage')) {
  failures.push(`Multiple sports venues resolve to the same hero source page (${slugs.join(', ')}): ${sourcePage}.`);
}

if (failures.length) {
  console.error('Final sports venue image validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Final sports venue image validation passed: ${unique.size}/84 governed venue heroes, 84/84 effective non-placeholder heroes, complete alt/provenance/license metadata, minimum 480px dimensions except the exact approved 600x400 Xtreme legacy asset, no cross-venue hero/source reuse, ${effectiveGeneratedFallbackSlugs.length} effective Texas Defined generated-media fallbacks (${effectiveGeneratedFallbackSlugs.join(', ') || 'none'}) within the approved seven-venue ceiling, and ${allowedBaseShadowDuplicates.size} intentional base-first shadows.`);
