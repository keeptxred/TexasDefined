import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const base = read('src/data/sports-venue-images.ts');
const additions = read('src/data/sports-venue-images-additions.ts');
const combined = read('src/data/sports-venue-images-all.ts');
const guideContent = read('src/components/sports/SportsVenueGuidePilotContent.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const dynamicRoute = read('src/routes/sports-venue.$slug.tsx');
const galaxyRoute = read('src/routes/sports-venue.jones-att-stadium.tsx');

const failures = [];
const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const recordSlugs = (source) => [...source.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
const baseSlugs = recordSlugs(base);
const additionSlugs = recordSlugs(additions);

if (baseSlugs.length < 25) failures.push(`Expected at least the 25 protected current-main photo records present when this work began; found ${baseSlugs.length}.`);
if (additionSlugs.length !== 34) failures.push(`Expected 34 rights-verified supplemental photo records; found ${additionSlugs.length}.`);
if (new Set(additionSlugs).size !== additionSlugs.length) failures.push('Photo additions contain duplicate slugs within the supplemental registry.');

for (const slug of additionSlugs) {
  const start = additions.indexOf(`  '${slug}': {`);
  const next = additions.indexOf("\n  '", start + 1);
  const block = additions.slice(start, next === -1 ? additions.indexOf('\n};', start) : next);
  for (const marker of [
    `slug: '${slug}'`,
    'alt:',
    "imageUrl: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/",
    "sourcePage: 'https://commons.wikimedia.org/wiki/File:",
    "sourceName: 'Wikimedia Commons'",
    'author:',
    'licenseName:',
    'licenseUrl:',
    'width:',
    'height:',
  ]) requireText(block, marker, `photo addition ${slug}`);

  const licenseUrl = block.match(/licenseUrl: '([^']+)'/)?.[1] ?? '';
  if (!licenseUrl.startsWith('https://creativecommons.org/')
      && licenseUrl !== 'https://commons.wikimedia.org/wiki/Commons:Public_domain') {
    failures.push(`photo addition ${slug}: unsupported license URL ${licenseUrl || '(missing)'}`);
  }
  if (!/licenseName: '(?:CC|Public domain)/.test(block)) failures.push(`photo addition ${slug}: license name is not explicitly reusable.`);
  if (/author: '\s*'/.test(block)) failures.push(`photo addition ${slug}: author must not be empty.`);
  const dimensions = [...block.matchAll(/(?:width|height): (\d+)/g)].map((match) => Number(match[1]));
  if (dimensions.length !== 2 || dimensions.some((value) => value < 480)) failures.push(`photo addition ${slug}: dimensions are missing or too small for a venue hero.`);

  const coveredByDynamic = dynamicRoute.includes(`'${slug}'`);
  const coveredByGalaxy = slug === 'jones-att-stadium' && galaxyRoute.includes("createFileRoute('/sports-venue/jones-att-stadium')");
  if (!coveredByDynamic && !coveredByGalaxy) failures.push(`photo addition ${slug}: no governed sports venue route uses this slug.`);
}

for (const forbidden of ['gettyimages', 'tripadvisor', 'yelp', 'facebook.com', 'images.unsplash.com', 'googleusercontent']) {
  if (additions.toLowerCase().includes(forbidden)) failures.push(`Photo additions contain disallowed source ${forbidden}.`);
}
if (additions.includes('http://')) failures.push('Photo additions must use HTTPS only.');

for (const marker of [
  "import { getSportsVenuePhotoAddition } from './sports-venue-images-additions';",
  "import { getSportsVenuePhoto as getSportsVenuePhotoBase } from './sports-venue-images';",
  'getSportsVenuePhotoBase(slug) ?? getSportsVenuePhotoAddition(slug)',
]) requireText(combined, marker, 'combined photo registry');

requireText(guideContent, 'getSportsVenuePhoto } from "@/data/sports-venue-images-all"', 'shared venue guide photo lookup');
requireText(guideContent, 'const photo = getSportsVenuePhoto(slug);', 'shared venue guide photo lookup');
requireText(guidePage, 'A verified venue photograph is not available yet.', 'fail-closed photo fallback');
requireText(guidePage, 'image: photo?.imageUrl', 'structured venue image metadata');
requireText(guidePage, 'src={photo.imageUrl}', 'shared venue hero rendering');

const uniqueLicensedSlugs = new Set([...baseSlugs, ...additionSlugs]);
const overlap = additionSlugs.filter((slug) => baseSlugs.includes(slug));
const totalLicensed = uniqueLicensedSlugs.size;
const totalSeeded = 84;
const remainingFallback = totalSeeded - totalLicensed;
if (totalLicensed < 59) failures.push(`Expected at least 59 unique licensed venue photos after this batch; found ${totalLicensed}.`);
if (totalLicensed > totalSeeded) failures.push(`Licensed photo union exceeds the ${totalSeeded}-venue seeded inventory.`);

if (failures.length) {
  console.error('Sports venue photo addition validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Sports venue photo additions validated: ${baseSlugs.length} base records + ${additionSlugs.length} supplemental records (${overlap.length} safely shadowed by base-first precedence) = ${totalLicensed}/${totalSeeded} unique licensed venue heroes; ${remainingFallback} venues remain on the intentional fail-closed fallback.`);
