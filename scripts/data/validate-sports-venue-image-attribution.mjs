import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const helper = read('src/data/sports-venue-image-attribution.ts');
const quickAnswers = read('src/components/sports/SportsVenueQuickAnswers.tsx');
const guidePage = read('src/components/sports/SportsVenueGuidePage.tsx');
const wave7 = read('src/data/sports-venue-images-additions-wave7.ts');
const failures = [];

const requireText = (source, needle, label) => {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
};
const forbidText = (source, needle, label) => {
  if (source.includes(needle)) failures.push(`${label}: forbidden ${needle}`);
};

const generatedCount = wave7.match(/sourceName: "Texas Defined generated media"/g)?.length ?? 0;
const commonsCount = wave7.match(/sourceName: "Wikimedia Commons"/g)?.length ?? 0;
if (generatedCount !== 14) failures.push(`Expected 14 generated Wave 7 venue heroes; found ${generatedCount}.`);
if (commonsCount !== 2) failures.push(`Expected 2 Wikimedia Commons Wave 7 venue heroes; found ${commonsCount}.`);

for (const marker of [
  "const GENERATED_SOURCE_NAME = 'Texas Defined generated media';",
  'export function isGeneratedSportsVenueImage',
  '/^AI-generated\\b/i.test(photo.licenseName)',
  'export function sportsVenueImageCaption',
  'AI-generated representative editorial image by ${photo.author}; not documentary photography',
  'photo by ${photo.author}, ${photo.licenseName}',
]) requireText(helper, marker, 'central venue image attribution helper');

for (const marker of [
  'isGeneratedSportsVenueImage',
  'sportsVenueImageCaption(venueName, photo)',
  'const isGeneratedHero = isGeneratedSportsVenueImage(photo);',
  'AI-generated representative editorial image by {photo.author} for TexasDefined.',
  'This is not documentary photography of the venue.',
  'Photo by <a',
  'Original source file is served unchanged',
]) requireText(quickAnswers, marker, 'quick-answer hero attribution');
forbidText(quickAnswers, 'caption: photo ? `${venueName} — photo by', 'structured image metadata must branch on generated media');

for (const marker of [
  'isGeneratedSportsVenueImage',
  'const generatedImage = isGeneratedSportsVenueImage(photo);',
  'photo && generatedImage ?',
  'AI-generated representative editorial image by {photo.author} for TexasDefined; not documentary photography.',
  'Photo: <a href={photo.sourcePage}',
]) requireText(guidePage, marker, 'shared guide source attribution');

if (failures.length) {
  console.error('Sports venue image attribution validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('PASS: sports venue imagery distinguishes generated representative media from documentary photography in visible credits and structured image captions while preserving real-photo attribution.');
