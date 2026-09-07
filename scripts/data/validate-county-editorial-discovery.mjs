import fs from 'node:fs';

const failures = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const requireAll = (label, text, needles) => {
  for (const needle of needles) if (!text.includes(needle)) failures.push(`${label}: missing ${needle}`);
};

const countyGuide = read('src/components/content/CountyGuideSections.tsx');
const destinationLinks = read('src/data/destination-editorial-links.ts');
const supplementalRegistration = read('src/data/fixtures/supplemental-editorial-registration.ts');

requireAll('canonical county editorial discovery', countyGuide, [
  "articleInternalLinks[countySeriesArticle.slug]",
  'countySeriesArticle.internalLinks ?? []',
  'mergeEditorialLinks(',
  'countyEditorialLinks.map',
  'Keep exploring {entity.name}',
  'More Texas Defined guides related to ${entity.name}',
]);

requireAll('Jasper destination Blue Hole discovery', destinationLinks, [
  '"jasper": [',
  'href: "/article/blue-hole-jasper-county-east-texas"',
  'Read the history of Jasper County\'s Blue Hole',
]);

requireAll('Jasper county reciprocal Blue Hole registration', supplementalRegistration, [
  'import { blueHoleJasperCountyStoryArticle }',
  'href: `/article/${blueHoleJasperCountyStoryArticle.slug}`',
  '"jasper-county-jasper-kirbyville-sam-rayburn-piney-woods-texas"',
  'articleInternalLinks[slug] = existing.some((link) => link.href === blueHoleLink.href)',
  ': [...existing, blueHoleLink]',
]);

if (failures.length) {
  console.error('County editorial discovery validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('County editorial discovery validator passed: canonical county guides surface curated article links and Jasper retains reciprocal Blue Hole discovery from both county and destination surfaces.');
