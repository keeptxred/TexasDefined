import fs from 'node:fs';

const root = fs.readFileSync('src/routes/__root.tsx', 'utf8');
const bootstrap = fs.readFileSync('public/expedia-travel.js', 'utf8');
const registry = JSON.parse(fs.readFileSync('public/stay-nearby-hotels.json', 'utf8'));
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label} is missing required Expedia contract text: ${needle}`);
}

requireText(root, 'if (import.meta.env.SSR)', 'SSR-only bootstrap guard');
requireText(root, '<script src="/expedia-travel.js" defer />', 'root bootstrap reference');

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

const registryText = JSON.stringify(registry).toLowerCase();
for (const forbidden of ['nightlyprice', 'nightly_price', 'estimateddistance', 'estimated_distance']) {
  if (registryText.includes(forbidden)) errors.push(`Stay Nearby registry contains forbidden synthetic commerce field: ${forbidden}.`);
}

if (errors.length) {
  console.error('Expedia / Stay Nearby affiliate integration validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Expedia / Stay Nearby validation passed: approved tracking remains click-loaded, curated hotel selection is capped and evidence-backed, three-card venue pilots are complete, property deep links require explicit verification, and property imagery is gated to approved first-party-hosted Creator Toolbox media with a matching referral.');
