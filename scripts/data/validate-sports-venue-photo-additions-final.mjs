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

if (failures.length) {
  console.error('Final sports venue image validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Final sports venue image validation passed: ${unique.size}/84 governed venue heroes, including 16 reviewed Wave 7 assets (2 reusable Commons photos + 14 generated venue-specific fallbacks) and ${allowedBaseShadowDuplicates.size} intentional base-first shadows. No sports venue remains on the generic image fallback.`);
