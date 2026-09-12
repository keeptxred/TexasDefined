import fs from 'node:fs';
import path from 'node:path';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const bootstrap = fs.readFileSync('public/expedia-travel.js', 'utf8');
const contextImages = fs.readFileSync('public/stay-nearby-context-images.js', 'utf8');
const venueRoute = fs.readFileSync('src/routes/sports-venue.$slug.tsx', 'utf8');
const registry = JSON.parse(fs.readFileSync('public/stay-nearby-hotels.json', 'utf8'));
const propertyImageManifestPath = 'public/stay-nearby-ai-property-images.json';
const propertyImageManifest = fs.existsSync(propertyImageManifestPath)
  ? JSON.parse(fs.readFileSync(propertyImageManifestPath, 'utf8'))
  : null;
const errors = [];
const aiDisclosure = 'AI-generated depiction of this property — not an official hotel photograph';

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required Expedia contract text: ${needle}`);
}

function forbiddenText(source, needle, label) {
  if (source.includes(needle)) errors.push(`${label} contains forbidden legacy Stay Nearby image text: ${needle}`);
}

function guidePilotSlugs() {
  const match = venueRoute.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/);
  if (!match) {
    errors.push('Could not resolve sportsVenueGuidePilotSlugs from the sports venue route.');
    return new Set();
  }
  return new Set([...match[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1]));
}

function validRealPropertyImage(property) {
  if (!property?.image) return false;
  if (property.image.rightsSource !== 'expedia-creator-toolbox') return false;
  if (!String(property.image.url ?? '').startsWith('/')) return false;
  if (/\.svg(?:$|\?)/i.test(property.image.url)) return false;
  return (property.bookingTargets ?? []).some((target) =>
    target.provider === property.image.bookingProvider
    && target.verified === true
    && typeof target.affiliateUrl === 'string'
    && target.affiliateUrl.startsWith('https://'));
}

function rasterMagicOkay(buffer) {
  if (buffer.length >= 8 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;
  return buffer.length >= 12
    && buffer.subarray(0, 4).toString('ascii') === 'RIFF'
    && buffer.subarray(8, 12).toString('ascii') === 'WEBP';
}

function walkFiles(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(full) : [full];
  });
}

requireText(root, 'if (import.meta.env.SSR)', 'SSR-only bootstrap guard');
requireText(root, '<script src="/expedia-travel.js" defer />', 'root bootstrap reference');
requireText(root, '<script src="/stay-nearby-context-images.js" defer />', 'Stay Nearby image bootstrap reference');

for (const [needle, label] of [
  ['https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js', 'widget script'],
  ['document.createElement("script")', 'deferred vendor script creation'],
  ['script.className = "eg-widgets-script"', 'Expedia widget script class'],
  ['addEventListener("click"', 'user-intent loading'],
  ['document.body.appendChild(script)', 'deferred vendor script activation'],
  ['data-widget', 'search widget'],
  ['data-program', 'US Expedia program'],
  ['us-expedia', 'US Expedia program value'],
  ['data-lobs', 'stays line of business'],
  ['data-network', 'affiliate network'],
  ['1110lMy6E', 'approved camref'],
  ['texasdefined-stays', 'approved pubref'],
  ['TRAVEL_PATH.test(window.location.pathname)', 'central travel-route guard'],
  ['sports-venues\\/(?!compare(?:\\.csv)?(?:\\/|$))', 'sports comparison exclusion'],
  ['texas-college-towns(?:\\/|$)', 'college-town trip route'],
  ['texas-tailgating-guide(?:\\/|$)', 'tailgating trip route'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings', 'affiliate disclosure'],
  ['TexasDefinedStayNearby', 'reusable Stay Nearby interface'],
  ['aria-roledescription', 'accessible carousel semantics'],
  ['ArrowLeft', 'keyboard carousel navigation'],
  ['scroll-snap-type', 'touch/mobile scroll behavior'],
  ['calc((100% - 2rem)/3)', 'three-card desktop layout'],
  ['prefers-reduced-motion', 'reduced-motion behavior'],
  ['rel = "sponsored noopener noreferrer"', 'affiliate link relationship'],
  ['property.image', 'property image rights gate'],
  ['expedia-creator-toolbox', 'approved property image source gate'],
  ['affiliateUrl', 'provider-agnostic deep-link target support'],
]) requireText(bootstrap, needle, label);

for (const family of ['explore', 'destination', 'city', 'county', 'sports-venue', 'sports-venues', 'event', 'best-places-to-go-camping-in-texas', 'texas-college-towns', 'texas-tailgating-guide']) {
  requireText(bootstrap, family, `${family} route family`);
}

const requiredContextVisuals = [
  {
    route: '/sports-venue/amon-g-carter-stadium',
    venue: 'Amon G. Carter Stadium',
    file: 'Texas_Christian_University_June_2017_85_%28Amon_G._Carter_Stadium%29.jpg',
    credit: 'Michael Barera',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  {
    route: '/sports-venue/gerald-j-ford-stadium',
    venue: 'Gerald J. Ford Stadium',
    file: 'View_of_Gerald_J_Ford_Stadium_after_renovations%2C_20224.jpg',
    credit: 'HavanaHeat',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  },
  {
    route: '/sports-venue/globe-life-field',
    venue: 'Globe Life Field',
    file: 'Globe_Life_Field_exterior_2025.jpg',
    credit: 'BullDawg2021',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  },
];

for (const [needle, label] of [
  ['data-stay-context-visual', 'context image identity marker'],
  ['Venue context —', 'venue-context disclosure'],
  ['Wikimedia Commons', 'context image source disclosure'],
  ['Displayed without editorial crop; browser scaling only.', 'no-crop disclosure'],
  ['const AI_PROPERTY_DATA_URL = "/stay-nearby-ai-property-images.json"', 'exact-property AI registry reference'],
  ['data-stay-ai-property', 'exact-property AI identity marker'],
  ['ai-property-depiction', 'exact-property AI kind gate'],
  ['generatedFromPropertyIdentity === true', 'exact-property identity gate'],
  ['item.depictsProperty === true', 'exact-property depiction gate'],
  [aiDisclosure, 'AI property disclosure'],
  ['/images/stay-nearby/properties/', 'first-party AI property asset path'],
  ['textFallback.replaceWith(buildAiPropertyMedia(item))', 'AI property card replacement'],
  ['const propertyImage = card.querySelector(":scope > .td-stay-image")', 'rights-cleared real property image precedence'],
]) requireText(contextImages, needle, label);

for (const stale of [
  'data-stay-ai-fallback',
  'stay-nearby-ai-fallbacks.json',
  'ai-area-illustration',
  'AI-generated area illustration — not the hotel property',
  '/images/stay-nearby/ai/',
]) forbiddenText(contextImages, stale, 'Stay Nearby client image bootstrap');

for (const visual of requiredContextVisuals) {
  for (const [needle, label] of [
    [visual.route, `${visual.venue} route`],
    [visual.file, `${visual.venue} image file`],
    [visual.credit, `${visual.venue} photographer credit`],
    [visual.license, `${visual.venue} license label`],
    [visual.licenseUrl, `${visual.venue} license URL`],
  ]) requireText(contextImages, needle, label);
}

if (fs.existsSync('public/stay-nearby-ai-fallbacks.json')) errors.push('Legacy Stay Nearby AI SVG fallback manifest must be removed.');
if (fs.existsSync('public/images/stay-nearby/ai')) errors.push('Legacy Stay Nearby AI SVG fallback directory must be removed.');
for (const file of walkFiles('public/images/stay-nearby')) {
  if (/\.svg$/i.test(file) && file.includes(`${path.sep}properties${path.sep}`)) errors.push(`Stay Nearby property imagery must never use SVG: ${file}`);
}

const pilots = guidePilotSlugs();
let integratedProperties = [];

if (!registry || registry.version !== 1 || !Array.isArray(registry.properties)) {
  errors.push('Stay Nearby registry must be version 1 with a properties array.');
} else {
  if (registry.policy?.maxCards !== 3) errors.push('Stay Nearby registry must cap curated carousels at three cards.');
  if (registry.policy?.displayComputedDistance !== false) errors.push('Computed distances must never be presented as verified display proximity.');

  const ids = new Set();
  for (const property of registry.properties) {
    if (!property?.id || ids.has(property.id)) errors.push(`Invalid or duplicate Stay Nearby property id: ${property?.id ?? '<missing>'}`);
    ids.add(property?.id);
    if (!property?.name || !property?.city || property.status !== 'active') errors.push(`${property?.id ?? '<missing>'} is missing active property identity fields.`);

    for (const target of property.bookingTargets ?? []) {
      if (!target.provider) errors.push(`${property.id} has a booking target without a provider.`);
      if (target.affiliateUrl) {
        if (target.verified !== true) errors.push(`${property.id} has an unverified property affiliate URL.`);
        if (!/^https:\/\//.test(target.affiliateUrl)) errors.push(`${property.id} affiliate URL must use HTTPS.`);
      }
    }

    if (property.image) {
      if (property.image.rightsSource !== 'expedia-creator-toolbox') errors.push(`${property.id} real property image is not marked as Expedia Creator Toolbox media.`);
      if (!String(property.image.url ?? '').startsWith('/')) errors.push(`${property.id} real property image must be stored as a first-party asset.`);
      if (/\.svg(?:$|\?)/i.test(property.image.url ?? '')) errors.push(`${property.id} real property image must not be SVG.`);
      if (!validRealPropertyImage(property)) errors.push(`${property.id} real property image cannot render without a verified matching affiliate property referral.`);
    }

    for (const context of property.contexts ?? []) {
      if (!['venue', 'event', 'destination', 'city'].includes(context.kind)) errors.push(`${property.id} has unsupported context kind ${context.kind}.`);
      if (!context.key || !Number.isFinite(context.rank)) errors.push(`${property.id} has a context without a stable key/rank.`);
      if (!context.geographicContext) errors.push(`${property.id} context ${context.key} lacks geographic context.`);
      if (!context.source?.url || !/^https:\/\//.test(context.source.url) || !context.source?.verifiedAt) errors.push(`${property.id} context ${context.key} lacks source evidence and verification date.`);
    }
  }

  const curatedVenueKeys = new Set(registry.properties.flatMap((property) =>
    (property.contexts ?? [])
      .filter((context) => context.kind === 'venue')
      .map((context) => context.key)));

  for (const venue of curatedVenueKeys) {
    if (!pilots.has(venue)) errors.push(`${venue} has curated Stay Nearby cards but is not a current redesigned venue guide.`);
    const matches = registry.properties.filter((property) =>
      (property.contexts ?? []).some((context) => context.kind === 'venue' && context.key === venue));
    if (matches.length !== 3) errors.push(`${venue} must have exactly 3 curated Stay Nearby choices when curated results are configured; found ${matches.length}.`);
    const ranks = matches
      .flatMap((property) => property.contexts.filter((context) => context.kind === 'venue' && context.key === venue))
      .map((context) => context.rank)
      .sort((a, b) => a - b);
    if (ranks.join(',') !== '1,2,3') errors.push(`${venue} must have deterministic Stay Nearby relevance ranks 1,2,3.`);
  }

  integratedProperties = registry.properties.filter((property) =>
    (property.contexts ?? []).some((context) => context.kind === 'venue' && pilots.has(context.key)));

}

if (!propertyImageManifest || propertyImageManifest.version !== 2 || propertyImageManifest.disclosure !== aiDisclosure || !Array.isArray(propertyImageManifest.items)) {
  errors.push('Stay Nearby exact-property AI image registry must be version 2 with the approved disclosure and an items array.');
} else {
  if (propertyImageManifest.policy?.exactPropertyOnly !== true) errors.push('Stay Nearby AI property-image policy must require exact-property generation.');
  if (propertyImageManifest.policy?.genericHotelImagesAllowed !== false) errors.push('Stay Nearby AI property-image policy must forbid generic hotel imagery.');
  if (propertyImageManifest.policy?.svgAllowed !== false) errors.push('Stay Nearby AI property-image policy must forbid SVG.');

  const byPropertyId = new Map();
  const seenUrls = new Set();
  for (const item of propertyImageManifest.items) {
    if (!item?.propertyId || byPropertyId.has(item.propertyId)) errors.push(`Invalid or duplicate AI property-image record: ${item?.propertyId ?? '<missing>'}`);
    byPropertyId.set(item.propertyId, item);
    const property = registry?.properties?.find((candidate) => candidate.id === item.propertyId);
    if (!property || property.name !== item.name) errors.push(`${item.propertyId} AI image record does not match the canonical hotel record.`);
    if (item.kind !== 'ai-property-depiction') errors.push(`${item.propertyId} AI image kind must be ai-property-depiction.`);
    if (item.depictsProperty !== true || item.generatedFromPropertyIdentity !== true) errors.push(`${item.propertyId} AI image must explicitly represent and be generated from the exact property identity.`);
    if (item.label !== aiDisclosure) errors.push(`${item.propertyId} AI image must use the exact visible disclosure.`);
    if (!String(item.propertyAddress ?? '').match(/^\d+\s+.+,\s*.+,\s*Texas\s+\d{5}$/i)) errors.push(`${item.propertyId} AI image lacks an exact Texas street address.`);
    if (property?.city && !String(item.propertyAddress ?? '').toLowerCase().includes(property.city.toLowerCase())) errors.push(`${item.propertyId} AI image address does not match the canonical property city.`);
    if (!/^\/images\/stay-nearby\/properties\/[a-z0-9-]+\.(?:png|jpe?g|webp)$/i.test(item.url || '')) errors.push(`${item.propertyId} AI image must be a first-party PNG/JPEG/WebP property asset.`);
    if (/\.svg(?:$|\?)/i.test(item.url || '')) errors.push(`${item.propertyId} AI image must never use SVG.`);
    if (seenUrls.has(item.url)) errors.push(`${item.propertyId} reuses an AI image URL already assigned to another property.`);
    seenUrls.add(item.url);
    if (!String(item.alt ?? '').startsWith(`AI-generated photorealistic depiction of ${item.name}`)) errors.push(`${item.propertyId} AI image alt text must identify the exact property and AI depiction.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.generatedAt || '')) errors.push(`${item.propertyId} AI image lacks a generation date.`);
    if (!/^https:\/\//.test(item.groundingSourceUrl || '')) errors.push(`${item.propertyId} AI image lacks an HTTPS grounding source.`);
    if (property && !(property.contexts ?? []).some((context) => context.source?.url === item.groundingSourceUrl)) errors.push(`${item.propertyId} AI image grounding source is not one of the property’s verified context sources.`);
    if (!['official-property-page', 'manually-verified-exact-property-reference'].includes(item.referenceImageSource)) errors.push(`${item.propertyId} AI image lacks an approved exact-property reference provenance.`);

    const assetPath = `public${item.url}`;
    if (!fs.existsSync(assetPath)) {
      errors.push(`${item.propertyId} AI property asset is missing: ${assetPath}`);
      continue;
    }
    const asset = fs.readFileSync(assetPath);
    if (asset.length < 25_000) errors.push(`${item.propertyId} AI property asset is unexpectedly small (${asset.length} bytes).`);
    if (!rasterMagicOkay(asset)) errors.push(`${item.propertyId} AI property asset is not a valid PNG/JPEG/WebP raster image.`);
  }

  for (const property of integratedProperties) {
    if (validRealPropertyImage(property)) continue;
    const item = byPropertyId.get(property.id);
    if (!item) errors.push(`${property.id} appears on a redesigned venue guide but has neither an approved affiliate property photo nor an exact-property AI raster image.`);
  }

  for (const item of propertyImageManifest.items) {
    if (!integratedProperties.some((property) => property.id === item.propertyId)) errors.push(`${item.propertyId} AI property image is not attached to a current redesigned venue-guide Stay Nearby card.`);
  }
}

const registryText = JSON.stringify(registry).toLowerCase();
for (const forbidden of ['nightlyprice', 'nightly_price', 'estimateddistance', 'estimated_distance']) {
  if (registryText.includes(forbidden)) errors.push(`Stay Nearby registry contains forbidden synthetic commerce field: ${forbidden}.`);
}

if (errors.length) {
  console.error('Expedia / Stay Nearby affiliate integration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Expedia / Stay Nearby validation passed: approved tracking remains click-loaded, curated hotel selection remains evidence-backed and capped at three cards, ${integratedProperties.length} configured redesigned-guide hotel cards are image-gated, rights-cleared affiliate property photos remain preferred, every remaining configured hotel card has a unique first-party photorealistic exact-property AI raster grounded to an exact address and verified property source, and generic hotel imagery and SVG fallbacks are prohibited.`);