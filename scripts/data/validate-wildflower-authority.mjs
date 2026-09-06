import fs from 'node:fs';

const errors = [];
const read = (path) => fs.readFileSync(path, 'utf8');
const required = [
  'src/components/editorial/ArticleBody.tsx',
  'src/components/editorial/WildflowerSpeciesGrid.tsx',
  'src/components/editorial/ArticleAuthorityEnhancement.tsx',
  'src/data/fixtures/lazy-evergreen.ts',
  'src/data/fixtures/lazy-seasonal-authority.ts',
  'src/data/fixtures/lazy-newest-evergreen.ts',
  'src/data/fixtures/repositories.ts',
  'src/data/fixtures/texas-wildflower-species-stubs.ts',
  'src/data/fixtures/texas-wildflower-species.ts',
  'src/data/fixtures/texas-wildflowers-guide.ts',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing wildflower authority file: ${file}`);
if (errors.length) fail();

const articleBody = read(required[0]);
const grid = read(required[1]);
const authorityEnhancement = read(required[2]);
const lazyEvergreen = read(required[3]);
const lazySeasonal = read(required[4]);
const lazyNewest = read(required[5]);
const repositories = read(required[6]);
const stubs = read(required[7]);
const articles = read(required[8]);
const hub = read(required[9]);
const speciesSlugs = [
  'texas-indian-paintbrush-guide',
  'texas-indian-blanket-guide',
  'texas-winecup-guide',
  'texas-prairie-verbena-guide',
  'texas-horsemint-guide',
  'texas-mexican-hat-guide',
  'texas-black-eyed-susan-guide',
  'texas-purple-coneflower-guide',
  'texas-goldenrod-guide',
  'texas-maximilian-sunflower-guide',
];

for (const slug of speciesSlugs) {
  if (!stubs.includes(`"${slug}"`)) errors.push(`Wildflower stub missing: ${slug}`);
  if (!articles.includes(`slug: "${slug}"`)) errors.push(`Full wildflower guide missing: ${slug}`);
  if (!grid.includes(`slug: "${slug}"`)) errors.push(`Wildflower visual card missing: ${slug}`);
}
if (!grid.includes('slug: "texas-bluebonnets-complete-guide"')) errors.push('Visual field guide must reuse the existing bluebonnet authority page.');
if (stubs.includes('texas-bluebonnet-guide') || articles.includes('texas-bluebonnet-guide')) errors.push('Do not create a competing bluebonnet authority slug.');

for (const symbol of ['ArticleAuthorityEnhancement', '/article/texas-wildflowers-guide', 'showArticleAuthority']) if (!articleBody.includes(symbol)) errors.push(`ArticleBody authority integration missing: ${symbol}`);
if (articleBody.includes('WildflowerSpeciesGrid')) errors.push('Wildflower grid must not introduce a second lazy import in the global ArticleBody module.');
for (const symbol of ['MetroRelocationAuthority', 'WildflowerSpeciesGrid', '/article/texas-wildflowers-guide']) if (!authorityEnhancement.includes(symbol)) errors.push(`Shared lazy authority wrapper missing: ${symbol}`);
if (lazyEvergreen.includes('texasWildflowerSpeciesStubs') || lazyEvergreen.includes('texas-wildflower-species')) errors.push('Wildflower species inventory must not enter the eager lazy-evergreen client graph.');
for (const symbol of ['texasWildflowerSpeciesStubs', '...texasWildflowerSpeciesStubs', 'await import("./texas-wildflower-species")', 'texasWildflowerSpeciesArticles.find']) if (!lazySeasonal.includes(symbol)) errors.push(`Lazy wildflower authority boundary missing: ${symbol}`);
if (!lazyNewest.includes('from "./lazy-seasonal-authority"')) errors.push('Wildflower authority must remain behind the lazy-newest-evergreen boundary.');
if (!repositories.includes('import("./lazy-newest-evergreen")')) errors.push('Repository inventory must dynamically import lazy-newest-evergreen.');
for (const symbol of ['11 Texas wildflowers to know', 'scientific', 'Bloom', 'Texas range', 'Open species guide', 'editorialImageSrc']) if (!grid.includes(symbol)) errors.push(`Wildflower visual field guide missing: ${symbol}`);
for (const symbol of ['Lady Bird Johnson Wildflower Center', 'SOURCE_URL', 'internalLinks', '/article/texas-wildflowers-guide', 'Echinacea purpurea', 'Solidago spp.']) if (!articles.includes(symbol)) errors.push(`Wildflower guide content safeguard missing: ${symbol}`);
if (!hub.includes('slug: "texas-wildflowers-guide"')) errors.push('Canonical Texas wildflower hub is missing.');

const gridCardCount = (grid.match(/slug: "texas-[^"]+"/g) ?? []).length;
if (gridCardCount !== 11) errors.push(`Expected 11 visual species cards, found ${gridCardCount}.`);
const stubCount = (stubs.match(/stub\("texas-[^"]+"/g) ?? []).length;
if (stubCount !== 10) errors.push(`Expected 10 new lazy species stubs, found ${stubCount}.`);
const articleCount = (articles.match(/^\s{4}slug: "texas-[^"]+"/gm) ?? []).length;
if (articleCount !== 10) errors.push(`Expected 10 new full species guides, found ${articleCount}.`);
const remoteImageCount = (grid.match(/commons\.wikimedia\.org\/wiki\/Special:Redirect\/file\//g) ?? []).length;
if (remoteImageCount !== 11) errors.push(`Expected 11 species-specific Wikimedia images, found ${remoteImageCount}.`);

if (errors.length) fail();
console.log('Texas wildflower visual hub, existing bluebonnet authority reuse, 10 lazy species guides, species images and crawlable article integration are protected behind existing dynamic article/newest-evergreen boundaries.');

function fail() {
  console.error('Texas wildflower authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
