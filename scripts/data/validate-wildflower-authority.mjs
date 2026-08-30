import fs from 'node:fs';

const errors = [];
const required = [
  'src/data/fixtures/texas-wildflower-species.ts',
  'src/data/index.ts',
  'src/components/editorial/WildflowerSpeciesGrid.tsx',
  'src/components/editorial/ArticleBody.tsx',
  'src/data/texas-home-nature-public.server.ts',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing wildflower authority file: ${file}`);
if (errors.length) fail();

const fixture = fs.readFileSync(required[0], 'utf8');
const dataIndex = fs.readFileSync(required[1], 'utf8');
const grid = fs.readFileSync(required[2], 'utf8');
const articleBody = fs.readFileSync(required[3], 'utf8');
const legacy = fs.readFileSync(required[4], 'utf8');

const slugs = [
  'texas-wildflowers-guide',
  'texas-bluebonnet-guide',
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

for (const slug of slugs) {
  if (!fixture.includes(`slug: "${slug}"`) && !fixture.includes(`slug: '${slug}'`)) errors.push(`Wildflower fixture missing slug: ${slug}`);
  if (!dataIndex.includes(`"${slug}"`)) errors.push(`Wildflower article registry missing slug: ${slug}`);
  if (slug !== 'texas-wildflowers-guide' && !grid.includes(`slug: "${slug}"`)) errors.push(`Wildflower visual grid missing species: ${slug}`);
}

for (const feature of ['texasWildflowerArticles','texasWildflowerSpeciesArticles','Lady Bird Johnson Wildflower Center','sourceUrl: WILDFLOWER_SOURCE','internalLinks','/article/texas-wildflowers-guide']) {
  if (!fixture.includes(feature)) errors.push(`Wildflower fixture feature missing: ${feature}`);
}
for (const feature of ['loadWildflowerTexasDefinedArticles','WILDFLOWER_ARTICLE_SLUGS','eligibleWildflowers','kind: "article"','href: `/article/${article.slug}`']) {
  if (!dataIndex.includes(feature)) errors.push(`Wildflower data integration missing: ${feature}`);
}
for (const feature of ['WildflowerSpeciesGrid','11 Texas wildflowers to know','scientific: string','{flower.scientific}','Bloom','Texas range','Open species guide']) {
  if (!grid.includes(feature)) errors.push(`Wildflower visual hub feature missing: ${feature}`);
}
for (const feature of ['showWildflowerSpeciesGrid','/article/texas-wildflowers-guide','WildflowerSpeciesGrid']) {
  if (!articleBody.includes(feature)) errors.push(`Article-body wildflower integration missing: ${feature}`);
}
if (!legacy.includes('"/texas-flowers-wildflowers-guide": "/article/texas-wildflowers-guide"')) errors.push('Legacy Texas flowers guide no longer resolves to the canonical wildflower hub.');
if (fixture.includes('id: "gateway-') || fixture.includes("id: 'gateway-")) errors.push('Wildflower authority pages must not use staged gateway IDs.');

const profileImageCount = (fixture.match(/^\s{4}image:\s/mg) ?? []).length;
if (profileImageCount !== 11) errors.push(`Expected 11 species image records, found ${profileImageCount}.`);
const licensedRemoteImageCount = (fixture.match(/commonsImage\(/g) ?? []).length - 1;
if (licensedRemoteImageCount < 10) errors.push(`Expected at least 10 explicitly licensed remote species images, found ${licensedRemoteImageCount}.`);
const gridSpeciesCount = (grid.match(/slug: "texas-[^"]+-guide"/g) ?? []).length;
if (gridSpeciesCount !== 11) errors.push(`Expected 11 visual species cards, found ${gridSpeciesCount}.`);

if (errors.length) fail();
console.log('Texas wildflower hub, 11 species guides, visual cards, canonical routing, search registration and indexable article integration are protected.');

function fail() {
  console.error('Texas wildflower authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
