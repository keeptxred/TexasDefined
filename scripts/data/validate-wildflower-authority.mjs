import fs from 'node:fs';

const errors = [];
const ARTICLE_MIN_WORDS = 600;
const DEPTH_MIN_WORDS = 200;
const required = [
  'src/data/fixtures/texas-wildflower-species.ts',
  'src/data/fixtures/texas-wildflower-species-base.ts',
  'src/data/fixtures/texas-wildflower-species-depth.ts',
  'src/data/index.ts',
  'src/components/editorial/WildflowerSpeciesGrid.tsx',
  'src/components/editorial/ArticleBody.tsx',
  'src/data/texas-home-nature-public.server.ts',
];
for (const file of required) if (!fs.existsSync(file)) errors.push(`Missing wildflower authority file: ${file}`);
if (errors.length) fail();

const wrapper = fs.readFileSync(required[0], 'utf8');
const fixture = fs.readFileSync(required[1], 'utf8');
const depthFixture = fs.readFileSync(required[2], 'utf8');
const dataIndex = fs.readFileSync(required[3], 'utf8');
const grid = fs.readFileSync(required[4], 'utf8');
const articleBody = fs.readFileSync(required[5], 'utf8');
const legacy = fs.readFileSync(required[6], 'utf8');

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
const speciesSlugs = slugs.slice(1);

for (const slug of slugs) {
  if (!fixture.includes(`slug: "${slug}"`) && !fixture.includes(`slug: '${slug}'`)) errors.push(`Wildflower base fixture missing slug: ${slug}`);
  if (!dataIndex.includes(`"${slug}"`)) errors.push(`Wildflower article registry missing slug: ${slug}`);
  if (slug !== 'texas-wildflowers-guide' && !grid.includes(`slug: "${slug}"`)) errors.push(`Wildflower visual grid missing species: ${slug}`);
}
for (const slug of speciesSlugs) {
  if (!depthFixture.includes(`"${slug}"`)) errors.push(`Wildflower authority-depth fixture missing species: ${slug}`);
}

for (const feature of ['texasWildflowerArticles','texasWildflowerSpeciesArticles','Lady Bird Johnson Wildflower Center','sourceUrl: WILDFLOWER_SOURCE','internalLinks','/article/texas-wildflowers-guide']) {
  if (!fixture.includes(feature)) errors.push(`Wildflower base fixture feature missing: ${feature}`);
}
for (const feature of ['WILDFLOWER_AUTHORITY_DEPTH','baseWildflowerSpeciesArticles','Regional context and identification confidence','Sources and further reading','Lady Bird Johnson Wildflower Center Plant Database','Texas Parks & Wildlife native-plant and Wildscapes guidance']) {
  if (!wrapper.includes(feature)) errors.push(`Wildflower delivery wrapper feature missing: ${feature}`);
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

const sourceMetadataCount = (fixture.match(/sourceName: "Lady Bird Johnson Wildflower Center"/g) ?? []).length;
if (sourceMetadataCount < 2) errors.push('Wildflower hub/species generator must retain explicit Lady Bird Johnson Wildflower Center source metadata.');
if (!wrapper.includes('https://tpwd.texas.gov/huntwild/wild/wildlife_diversity/wildscapes/')) errors.push('Wildflower species pages must expose the TPWD Wildscapes secondary authority source.');

validateEffectiveArticleDepth();

if (errors.length) fail();
console.log(`Texas wildflower hub, 11 species guides, licensed imagery, two-source further-reading layer, canonical routing, search registration, and >=${ARTICLE_MIN_WORDS}-word delivered article depth are protected.`);

function validateEffectiveArticleDepth() {
  const profileStart = fixture.indexOf('export const TEXAS_WILDFLOWER_PROFILES');
  const profileEnd = fixture.indexOf('\n];', profileStart);
  const profileSection = fixture.slice(profileStart, profileEnd);
  const profilePattern = /\{\n\s+slug: "([^"]+)",([\s\S]*?)\n\s+\},/g;
  const profiles = [...profileSection.matchAll(profilePattern)];
  if (profiles.length !== 11) {
    errors.push(`Expected 11 parseable wildflower profiles for depth validation, found ${profiles.length}.`);
    return;
  }

  for (const match of profiles) {
    const slug = match[1];
    const block = match[2];
    const commonName = readStringField(block, 'commonName');
    const scientificName = readStringField(block, 'scientificName');
    const bloom = readStringField(block, 'bloom');
    const regions = readStringField(block, 'regions');
    const identify = readStringField(block, 'identify');
    const texasStory = readStringField(block, 'texasStory');
    const habitat = readStringField(block, 'habitat');
    const ecology = readStringField(block, 'ecology');
    const garden = readStringField(block, 'garden');
    const fieldNote = readStringField(block, 'fieldNote');
    const authorityDepth = readAuthorityDepth(slug);
    const depthWords = wordCount(authorityDepth);
    if (depthWords < DEPTH_MIN_WORDS) errors.push(`${slug} authority-depth section has ${depthWords} words; minimum is ${DEPTH_MIN_WORDS}.`);
    const effectiveBody = [
      texasStory,
      `Quick ID: ${commonName}`,
      `Scientific name: ${scientificName}`,
      `Typical Texas bloom window: ${bloom}`,
      `Where to look: ${regions}`,
      `Key field mark: ${identify}`,
      identify,
      'Habitat and season', habitat,
      'Why it matters in the prairie', ecology,
      'Using it in a Texas native garden', garden,
      'Field note', fieldNote,
      'Regional context and identification confidence', authorityDepth,
      'Sources and further reading',
      'Lady Bird Johnson Wildflower Center Plant Database',
      'Texas Parks & Wildlife native-plant and Wildscapes guidance',
    ].join(' ');
    const words = wordCount(effectiveBody);
    if (words < ARTICLE_MIN_WORDS) errors.push(`${slug} has ${words} effective delivered body words; minimum is ${ARTICLE_MIN_WORDS}.`);
  }

  const hubStart = fixture.indexOf('export const texasWildflowersGuideArticle');
  const hubEnd = fixture.indexOf('\nfunction makeSpeciesArticle', hubStart);
  const hubSection = fixture.slice(hubStart, hubEnd);
  const hubTexts = [...hubSection.matchAll(/text: "((?:\\.|[^"\\])*)"/g)].map((match) => decodeString(match[1]));
  const hubWords = wordCount(hubTexts.join(' '));
  if (hubWords < ARTICLE_MIN_WORDS) errors.push(`texas-wildflowers-guide has ${hubWords} effective body words; minimum is ${ARTICLE_MIN_WORDS}.`);
}

function readStringField(block, field) {
  const match = block.match(new RegExp(`${field}:\\s*"((?:\\\\.|[^"\\\\])*)"`));
  if (!match) {
    errors.push(`Unable to parse ${field} from a wildflower profile.`);
    return '';
  }
  return decodeString(match[1]);
}

function readAuthorityDepth(slug) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = '"' + escaped + '":\\s*`([\\s\\S]*?)`';
  const match = depthFixture.match(new RegExp(pattern));
  if (!match) {
    errors.push(`Unable to parse authority depth for ${slug}.`);
    return '';
  }
  return match[1];
}

function decodeString(value) {
  try { return JSON.parse(`"${value}"`); }
  catch { return value.replaceAll('\\"', '"').replaceAll('\\n', ' '); }
}

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function fail() {
  console.error('Texas wildflower authority validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
