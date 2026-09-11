import fs from 'node:fs';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const bootstrap = fs.readFileSync('public/expedia-travel.js', 'utf8');
const contextImages = fs.readFileSync('public/stay-nearby-context-images.js', 'utf8');
const registry = JSON.parse(fs.readFileSync('public/stay-nearby-hotels.json', 'utf8'));
const fallbackRegistry = JSON.parse(fs.readFileSync('public/stay-nearby-ai-fallbacks.json', 'utf8'));
const errors = [];
const fallbackDisclosure = 'AI-generated area illustration — not the hotel property';

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required Expedia contract text: ${needle}`);
}

requireText(root, 'if (import.meta.env.SSR)', 'SSR-only bootstrap guard');
requireText(root, '<script src="/expedia-travel.js" defer />', 'root bootstrap reference');
requireText(root, '<script src="/stay-nearby-context-images.js" defer />', 'Stay Nearby context-image bootstrap reference');

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
  ['thumb.wikimedia.org', 'Wikimedia thumbnail host'],
  ['upload.wikimedia.org', 'Wikimedia upload host'],
  ['commons.wikimedia.org/wiki/File:', 'Wikimedia source-page links'],
  ['const FALLBACK_DATA_URL = "/stay-nearby-ai-fallbacks.json"', 'AI fallback registry reference'],
  ['data-stay-ai-fallback', 'AI fallback identity marker'],
  ['ai-area-illustration', 'AI fallback kind gate'],
  [fallbackDisclosure, 'AI fallback visible disclosure'],
  ['textFallback.replaceWith(buildFallbackMedia(item))', 'AI card fallback replacement'],
  ['const propertyImage = card.querySelector(":scope > .td-stay-image")', 'real property image precedence'],
]) requireText(contextImages, needle, label);

for (const visual of requiredContextVisuals) {
  for (const [needle, label] of [
    [visual.route, `${visual.venue} route`],
    [visual.file, `${visual.venue} image file`],
    [visual.credit, `${visual.venue} photographer credit`],
    [visual.license, `${visual.venue} license label`],
    [visual.licenseUrl, `${visual.venue} license URL`],
  ]) requireText(contextImages, needle, label);
}

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

    if (contextImages.includes(property.name)) {
      errors.push(`${property.id} hotel name leaked into venue-context imagery; contextual venue photos must never be represented as hotel property photos.`);
    }

    for (const target of property.bookingTargets ?? []) {
      if (!target.provider) errors.push(`${property.id} has a booking target without a provider.`);
      if (target.affiliateUrl) {
        if (target.verified !== true) errors.push(`${property.id} has an unverified property affiliate URL.`);
        if (!/^https:\/\//.test(target.affiliateUrl)) errors.push(`${property.id} affiliate URL must use HTTPS.`);
      }
    }

    if (property.image) {
      if (property.image.rightsSource !== 'expedia-creator-toolbox') errors.push(`${property.id} image is not marked as Expedia Creator Toolbox media.`);
      if (!String(property.image.url ?? '').startsWith('/')) errors.push(`${property.id} property image must be stored as a first-party asset.`);
      const matchingTarget = (property.bookingTargets ?? []).find((target) =>
        target.provider === property.image.bookingProvider
        && target.verified === true
        && typeof target.affiliateUrl === 'string'
        && target.affiliateUrl.length > 0);
      if (!matchingTarget) errors.push(`${property.id} image cannot render without a verified matching affiliate property referral.`);
    }

    for (const context of property.contexts ?? []) {
      if (!['venue', 'event', 'destination', 'city'].includes(context.kind)) errors.push(`${property.id} has unsupported context kind ${context.kind}.`);
      if (!context.key || !Number.isFinite(context.rank)) errors.push(`${property.id} has a context without a stable key/rank.`);
      if (!context.geographicContext) errors.push(`${property.id} context ${context.key} lacks geographic context.`);
      if (!context.source?.url || !/^https:\/\//.test(context.source.url) || !context.source?.verifiedAt) {
        errors.push(`${property.id} context ${context.key} lacks source evidence and verification date.`);
      }
    }
  }

  const expectedVenueCounts = new Map([
    ['amon-g-carter-stadium', 3],
    ['gerald-j-ford-stadium', 3],
    ['globe-life-field', 3],
    ['american-airlines-center', 3],
    ['texas-motor-speedway', 3],
  ]);
  for (const [venue, expected] of expectedVenueCounts) {
    const matches = registry.properties.filter((property) =>
      (property.contexts ?? []).some((context) => context.kind === 'venue' && context.key === venue));
    if (matches.length !== expected) errors.push(`${venue} must have exactly ${expected} curated Stay Nearby choices; found ${matches.length}.`);
    const ranks = matches
      .flatMap((property) => property.contexts.filter((context) => context.kind === 'venue' && context.key === venue))
      .map((context) => context.rank)
      .sort((a, b) => a - b);
    if (ranks.join(',') !== '1,2,3') errors.push(`${venue} must have deterministic relevance ranks 1,2,3.`);
  }
}

const expectedFallbackIds = new Set([
  'courtyard-fort-worth-university-drive',
  'hilton-garden-inn-fort-worth-medical-center',
  'homewood-suites-fort-worth-medical-center',
  'graduate-dallas',
  'the-highland-dallas',
  'hotel-mockingbird-dallas',
  'live-by-loews-arlington',
  'loews-arlington-hotel',
  'drury-plaza-dallas-arlington',
]);

if (!fallbackRegistry || fallbackRegistry.version !== 1 || fallbackRegistry.disclosure !== fallbackDisclosure || !Array.isArray(fallbackRegistry.items)) {
  errors.push('Stay Nearby AI fallback registry must be version 1 with the approved disclosure and an items array.');
} else {
  if (fallbackRegistry.items.length !== expectedFallbackIds.size) errors.push(`Stay Nearby AI fallback registry must contain exactly ${expectedFallbackIds.size} pilot records.`);
  const seenFallbackIds = new Set();
  for (const item of fallbackRegistry.items) {
    if (!expectedFallbackIds.has(item.propertyId)) errors.push(`Unexpected Stay Nearby AI fallback property id: ${item.propertyId}`);
    if (seenFallbackIds.has(item.propertyId)) errors.push(`Duplicate Stay Nearby AI fallback property id: ${item.propertyId}`);
    seenFallbackIds.add(item.propertyId);

    const property = registry.properties.find((candidate) => candidate.id === item.propertyId);
    if (!property || property.name !== item.name) errors.push(`${item.propertyId} AI fallback record does not match the canonical hotel record.`);
    if (item.kind !== 'ai-area-illustration') errors.push(`${item.propertyId} AI fallback kind must be ai-area-illustration.`);
    if (item.depictsProperty !== false) errors.push(`${item.propertyId} AI fallback must explicitly declare depictsProperty=false.`);
    if (item.label !== fallbackDisclosure) errors.push(`${item.propertyId} AI fallback must use the exact visible disclosure.`);
    if (!/^\/images\/stay-nearby\/ai\/[a-z0-9-]+\.svg$/.test(item.url || '')) errors.push(`${item.propertyId} AI fallback must be a first-party SVG under /images/stay-nearby/ai/.`);
    if (!String(item.alt || '').startsWith('AI-generated illustration')) errors.push(`${item.propertyId} AI fallback alt text must identify the image as an AI-generated illustration.`);
    if (property && String(item.alt || '').toLowerCase().includes(property.name.toLowerCase())) errors.push(`${item.propertyId} AI fallback alt text must not imply the illustration depicts the named property.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(item.generatedAt || '')) errors.push(`${item.propertyId} AI fallback lacks a generation date.`);

    const assetPath = `public${item.url}`;
    if (!fs.existsSync(assetPath)) {
      errors.push(`${item.propertyId} AI fallback asset is missing: ${assetPath}`);
      continue;
    }
    const svg = fs.readFileSync(assetPath, 'utf8');
    if (!svg.trimStart().startsWith('<svg')) errors.push(`${item.propertyId} AI fallback asset is not an SVG document.`);
    if (/<script\b/i.test(svg) || /<foreignObject\b/i.test(svg) || /<image\b/i.test(svg) || /\bhref\s*=/i.test(svg)) errors.push(`${item.propertyId} AI fallback SVG contains disallowed executable or external-resource markup.`);
    if (property && svg.toLowerCase().includes(property.name.toLowerCase())) errors.push(`${item.propertyId} AI fallback SVG must not contain the hotel name.`);
    if (!svg.includes('AI-generated area illustration, not a depiction of the hotel property.')) errors.push(`${item.propertyId} AI fallback SVG lacks its non-property description.`);
  }
  for (const id of expectedFallbackIds) {
    if (!seenFallbackIds.has(id)) errors.push(`${id} is missing its required AI fallback record.`);
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

console.log('Expedia / Stay Nearby validation passed: approved tracking remains click-loaded, curated hotel selection is capped and evidence-backed, five three-card venue pilots are complete, open-license venue context remains separated from property photography, nine first-party AI area-illustration fallbacks are visibly disclosed and explicitly non-property, property deep links require explicit verification, and real property imagery remains gated to approved first-party-hosted Creator Toolbox media with a matching referral.');