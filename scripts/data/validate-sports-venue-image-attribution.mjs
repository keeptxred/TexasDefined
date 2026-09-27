import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const helper = read('src/data/sports-venue-image-attribution.ts');
const quickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const wave7 = read('src/data/sports-venue-images-additions-wave7.ts');
const productionVerifier = read('scripts/ci/verify-sports-venue-heroes-production.mjs');
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const forbidText = (source, needle, label) => {
  if (source.includes(needle)) failures.push(`${label}: forbidden ${needle}`);
};

const generatedCount = (wave7.match(/Texas Defined generated media/g) ?? []).length;
const commonsCount = (wave7.match(/sourceName: ['"]Wikimedia Commons['"]/g) ?? []).length;
if (generatedCount !== 0) failures.push(`Wave 7 must not contain generated venue depictions; found ${generatedCount}.`);
if (commonsCount !== 3) failures.push(`Expected 3 reviewed Wikimedia Commons Wave 7 venue heroes; found ${commonsCount}.`);

for (const marker of [
  "const GENERATED_SOURCE_NAME = 'Texas Defined generated media';",
  'export function isGeneratedSportsVenueImage',
  '/^AI-generated\\b/i.test(photo.licenseName)',
  'export function sportsVenueImageCaption',
  'TexasDefined editorial illustration by ${photo.author}; not documentary photography',
  'photo by ${photo.author}, ${photo.licenseName}',
]) requireText(helper, marker, 'central venue image attribution helper');

for (const marker of [
  'isGeneratedSportsVenueImage',
  'sportsVenueImageCaption(venueName, photo)',
  'const isGeneratedHero = isGeneratedSportsVenueImage(photo);',
  'Editorial illustration by {photo.author} for TexasDefined.',
  'This is not documentary photography of the venue.',
  'Photo by <a',
  'Original source file is served unchanged',
]) requireText(quickAnswers, marker, 'quick-answer hero attribution');
forbidText(quickAnswers, 'AI-generated representative editorial image by {photo.author} for TexasDefined.', 'generated quick-answer disclosure should defer AI details to the sitewide policy');
forbidText(quickAnswers, 'caption: photo ? `${venueName} — photo by', 'structured image metadata must branch on generated media');
forbidText(quickAnswers, '>Media record</a>', 'generated quick-answer disclosure must not render a self-referential media link');

for (const marker of [
  'isGeneratedSportsVenueImage',
  'const generatedImage = isGeneratedSportsVenueImage(photo);',
  'photo && generatedImage ?',
  'Editorial illustration by {photo.author} for TexasDefined; not documentary photography.',
  'Photo: <a href={photo.sourcePage}',
]) requireText(guidePage, marker, 'shared guide source attribution');
forbidText(guidePage, 'AI-generated representative editorial image by {photo.author} for TexasDefined; not documentary photography.', 'generated guide disclosure should defer AI details to the sitewide policy');
forbidText(guidePage, '>Media record</a>', 'generated guide disclosure must not render a self-referential media link');

requireText(
  productionVerifier,
  "await import('./verify-sports-venue-heroes-production-all.mjs');",
  'live sports venue attribution verifier must use the dynamic exhaustive contract',
);

if (failures.length) {
  console.error('Sports venue image attribution validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS: sports venue imagery preserves generated-media provenance, uses concise non-documentary visible credits under the sitewide AI disclosure, keeps live verification aligned with that contract, avoids generated-media self-links, and preserves real-photo attribution.');
