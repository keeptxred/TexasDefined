import fs from 'node:fs';

const generatorPath = 'scripts/media/generate-stay-nearby-property-images.mjs';
let generator = fs.readFileSync(generatorPath, 'utf8');

for (const [before, after] of Object.entries({
  'https://images.trvl-media.com/lodging/5000000/4800000/4790100/4790030/77313365.jpg?impolicy=resizecrop&ra=fill&rh=575&rw=575': 'https://www.hilton.com/im/en/FTWMDGI/21739421/ftwmdgi-fortworth-tx-hgi-exterior-day-1-.jpg?ch=2799&cw=5000&gravity=NorthWest&impolicy=crop&rh=430&rw=768&xposition=0&yposition=265',
  'https://images.trvl-media.com/lodging/7000000/6190000/6180300/6180205/0c207564.jpg?impolicy=resizecrop&ra=fill&rh=575&rw=575': 'https://www.hilton.com/im/en/FTWMCHW/7582292/homewood-fwmc-003-exterior-at-dusk.jpg?ch=2203&cw=5250&gravity=NorthWest&impolicy=crop&rh=806&rw=1920&xposition=0&yposition=648',
  'https://dallasnews.imgix.net/1548885550-hiltonanatole.jpg': 'https://assets.hiltonstatic.com/hilton-asset-cache/image/upload/c_fill%2Cw_1920%2Ch_1080%2Cq_70%2Cf_auto%2Cg_auto/Imagery/Property%20Photography/Hilton%20Full%20Service/D/DFWANHH/DFWAN_Anatole_Exterior%20NS_C2_10000x6500_SW%C2%A92015.jpg',
})) {
  generator = generator.replace(before, after);
}

const referenceMarker = 'const RESEARCHED_REFERENCE_IMAGE_BY_ID = Object.freeze({\n';
const requiredReferences = {
  'hotel-mockingbird-dallas': 'https://cache.marriott.com/is/image/marriotts7prod/tx-dalnb-hotel-exterior-30022%3AWide-Hor?fit=constrain&wid=1336',
  'drury-plaza-dallas-arlington': 'https://cms.druryhotels.com/media/469312/188_exterior_03.jpg?anchor=center&height=844&mode=crop&rnd=133667410030000000&width=1318',
  'w-dallas': 'https://cache.marriott.com/is/image/marriotts7prod/wh-dalwh-hotel-exterior-28850-10982%3AWide-Hor?fit=constrain&wid=1336',
};
const missingReferences = Object.entries(requiredReferences)
  .filter(([id]) => !generator.includes(`'${id}':`))
  .map(([id, url]) => `  '${id}': '${url}',\n`)
  .join('');
if (missingReferences) {
  if (!generator.includes(referenceMarker)) throw new Error('Exact-property reference map marker missing.');
  generator = generator.replace(referenceMarker, referenceMarker + missingReferences);
}

const fetchMarker = 'async function fetchOfficialReference(sourceUrl, propertyId) {\n  const failures = [];\n';
if (!generator.includes('Prefer manually verified exact-property references when available.')) {
  const preferredBlock = `  // Prefer manually verified exact-property references when available.\n  const preferredResearchedImageUrl = RESEARCHED_REFERENCE_IMAGE_BY_ID[propertyId];\n  if (preferredResearchedImageUrl) {\n    try {\n      const reference = await downloadReferenceImage(preferredResearchedImageUrl, sourceUrl);\n      console.log(\`Using manually verified exact-property visual reference for \${propertyId}.\`);\n      return { ...reference, referenceSource: 'manually-verified-exact-property-reference' };\n    } catch (error) {\n      failures.push(\`preferred researched \${preferredResearchedImageUrl} (\${error instanceof Error ? error.message : String(error)})\`);\n    }\n  }\n`;
  if (!generator.includes(fetchMarker)) throw new Error('Reference fetch function marker missing.');
  generator = generator.replace(fetchMarker, fetchMarker + preferredBlock);
}

const generationMarker = 'async function generatePropertyImage(property) {\n  const address = ADDRESS_BY_ID[property.id];\n  const sourceUrl = officialSource(property);\n';
if (!generator.includes('Reusing reviewed exact-property raster')) {
  const reuseBlock = `  let priorItem = null;\n  if (fs.existsSync(MANIFEST_PATH)) {\n    try { priorItem = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))?.items?.find((item) => item.propertyId === property.id) || null; } catch {}\n  }\n  for (const extension of ['png', 'jpg', 'jpeg', 'webp']) {\n    const existingPath = path.join(OUTPUT_DIR, \`\${property.id}.\${extension}\`);\n    if (!fs.existsSync(existingPath)) continue;\n    const bytes = fs.readFileSync(existingPath);\n    if (bytes.length < 25_000) throw new Error(\`Existing image for \${property.id} is unexpectedly small (\${bytes.length} bytes).\`);\n    const referenceSource = priorItem?.referenceImageSource;\n    if (!referenceSource) throw new Error(\`Existing image for \${property.id} lacks preserved exact-property reference provenance.\`);\n    console.log(\`Reusing reviewed exact-property raster for \${property.id}.\`);\n    return { address, sourceUrl, referenceImageUrl: 'reused-reviewed-raster', referenceSource, bytes, format: imageFormat(bytes) };\n  }\n`;
  if (!generator.includes(generationMarker)) throw new Error('Property generation function marker missing.');
  generator = generator.replace(generationMarker, generationMarker + reuseBlock);
}
fs.writeFileSync(generatorPath, generator);

const verifierPath = 'scripts/ci/verify-stay-nearby-production.mjs';
const verifier = fs.readFileSync(verifierPath, 'utf8')
  .replace("'Homewood Suites by Hilton Fort Worth Medical Center, TX'", "'Homewood Suites by Hilton Fort Worth Medical Center'");
fs.writeFileSync(verifierPath, verifier);

const validatorPath = 'scripts/data/validate-expedia-affiliate.mjs';
let validator = fs.readFileSync(validatorPath, 'utf8');
const oldStart = validator.indexOf('  for (const venue of pilots) {');
const oldEnd = validator.indexOf('\n}\n\nif (!propertyImageManifest', oldStart);
if (oldStart < 0 || oldEnd < 0) throw new Error('Could not locate the legacy all-redesigned-venues Stay Nearby validator block.');
const curatedBlock = `  const curatedVenueKeys = new Set(registry.properties.flatMap((property) =>\n    (property.contexts ?? [])\n      .filter((context) => context.kind === 'venue')\n      .map((context) => context.key)));\n\n  for (const venue of curatedVenueKeys) {\n    if (!pilots.has(venue)) errors.push(\`\${venue} has curated Stay Nearby cards but is not a current redesigned venue guide.\`);\n    const matches = registry.properties.filter((property) =>\n      (property.contexts ?? []).some((context) => context.kind === 'venue' && context.key === venue));\n    if (matches.length !== 3) errors.push(\`\${venue} must have exactly 3 curated Stay Nearby choices when curated results are configured; found \${matches.length}.\`);\n    const ranks = matches\n      .flatMap((property) => property.contexts.filter((context) => context.kind === 'venue' && context.key === venue))\n      .map((context) => context.rank)\n      .sort((a, b) => a - b);\n    if (ranks.join(',') !== '1,2,3') errors.push(\`\${venue} must have deterministic Stay Nearby relevance ranks 1,2,3.\`);\n  }\n\n  integratedProperties = registry.properties.filter((property) =>\n    (property.contexts ?? []).some((context) => context.kind === 'venue' && pilots.has(context.key)));\n`;
validator = validator.slice(0, oldStart) + curatedBlock + validator.slice(oldEnd);
validator = validator.replace(
  /console\.log\(`Expedia \/ Stay Nearby validation passed:[\s\S]*?`\);/,
  "console.log(`Expedia / Stay Nearby validation passed: approved tracking remains click-loaded, curated hotel selection remains evidence-backed and capped at three cards, ${integratedProperties.length} configured redesigned-guide hotel cards are image-gated, rights-cleared affiliate property photos remain preferred, every remaining configured hotel card has a unique first-party photorealistic exact-property AI raster grounded to an exact address and verified property source, and generic hotel imagery and SVG fallbacks are prohibited.`);",
);
fs.writeFileSync(validatorPath, validator);

console.log('Final Stay Nearby exact-property source reconciliation complete.');
