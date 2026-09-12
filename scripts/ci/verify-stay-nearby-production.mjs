const origin = process.env.STAY_NEARBY_PRODUCTION_ORIGIN || 'https://texasdefined.com';
const revision = process.env.GITHUB_SHA || 'local';
const runId = process.env.GITHUB_RUN_ID || Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const aiDisclosure = 'AI-generated depiction of this property — not an official hotel photograph';

const pilots = [
  {
    key: 'amon-g-carter-stadium',
    route: '/sports-venue/amon-g-carter-stadium',
    pageMarker: 'Amon G. Carter Stadium',
    hotels: ['Courtyard Fort Worth University Drive', 'Hilton Garden Inn Fort Worth Medical Center', 'Homewood Suites by Hilton Fort Worth Medical Center'],
  },
  {
    key: 'gerald-j-ford-stadium',
    route: '/sports-venue/gerald-j-ford-stadium',
    pageMarker: 'Gerald J. Ford Stadium',
    hotels: ['Graduate by Hilton Dallas', 'The Highland Dallas, Curio Collection by Hilton', 'Hotel Mockingbird, Dallas, a Tribute Portfolio Hotel'],
  },
  {
    key: 'globe-life-field',
    route: '/sports-venue/globe-life-field',
    pageMarker: 'Globe Life Field',
    hotels: ['Live! by Loews – Arlington, TX', 'Loews Arlington Hotel', 'Drury Plaza Hotel Dallas Arlington'],
  },
  {
    key: 'american-airlines-center',
    route: '/sports-venue/american-airlines-center',
    pageMarker: 'American Airlines Center',
    hotels: ['W Dallas', 'Homewood Suites by Hilton Dallas Downtown, TX', 'Hilton Anatole'],
  },
  {
    key: 'texas-motor-speedway',
    route: '/sports-venue/texas-motor-speedway',
    pageMarker: 'Texas Motor Speedway',
    hotels: ['Tru by Hilton Northlake Fort Worth', 'Home2 Suites by Hilton Fort Worth Northlake', 'Holiday Inn Express & Suites Fort Worth North - Northlake'],
  },
];

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function liveUrl(path, attempt) {
  const url = new URL(path, origin);
  url.searchParams.set('td_verify', `${revision}-${runId}-${attempt}`);
  return url;
}

async function fetchLive(path, kind = 'text') {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = liveUrl(path, attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000),
        headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-CI-Stay-Nearby/2.0' },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      const body = await response.text();
      if (!challenged && response.ok) {
        if (kind === 'json') {
          try { return JSON.parse(body); }
          catch (error) { lastError = new Error(`${url.pathname} returned invalid JSON: ${error instanceof Error ? error.message : String(error)}`); }
        } else return body;
      } else {
        lastError = new Error(challenged ? `${url.pathname} returned a Cloudflare challenge.` : `${url.pathname} returned HTTP ${response.status}.`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError || new Error(`${path} failed production verification.`);
}

async function fetchLiveRaster(path) {
  let lastError;
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const url = liveUrl(path, attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000),
        headers: { 'cache-control': 'no-cache', 'user-agent': 'TexasDefined-CI-Stay-Nearby/2.0', accept: 'image/png,image/jpeg,image/webp' },
      });
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (!challenged && response.ok) {
        const contentType = (response.headers.get('content-type') || '').split(';')[0].toLowerCase();
        const bytes = new Uint8Array(await response.arrayBuffer());
        return { contentType, bytes };
      }
      lastError = new Error(challenged ? `${url.pathname} returned a Cloudflare challenge.` : `${url.pathname} returned HTTP ${response.status}.`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
    }
    if (attempt < 6) await sleep(5_000);
  }
  throw lastError || new Error(`${path} failed raster production verification.`);
}

function rasterMagicOkay(bytes) {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return true;
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return true;
  return bytes.length >= 12
    && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF'
    && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP';
}

function validRealPropertyImage(property) {
  if (!property?.image || property.image.rightsSource !== 'expedia-creator-toolbox') return false;
  if (!String(property.image.url || '').startsWith('/') || /\.svg(?:$|\?)/i.test(property.image.url || '')) return false;
  return (property.bookingTargets || []).some((target) => target.provider === property.image.bookingProvider && target.verified === true && /^https:\/\//.test(target.affiliateUrl || ''));
}

const registry = await fetchLive('/stay-nearby-hotels.json', 'json');
requireCondition(registry?.version === 1, 'Stay Nearby production registry version is not 1.');
requireCondition(registry?.policy?.maxCards === 3, 'Stay Nearby production registry no longer caps cards at 3.');
requireCondition(registry?.policy?.displayComputedDistance === false, 'Stay Nearby production registry allows computed-distance display.');
requireCondition(registry?.policy?.broadVenueFallback === false, 'Stay Nearby production registry allows broad venue fallback.');
requireCondition(Array.isArray(registry?.properties), 'Stay Nearby production registry properties are missing.');

const aiRegistry = await fetchLive('/stay-nearby-ai-property-images.json', 'json');
requireCondition(aiRegistry?.version === 2, 'Stay Nearby exact-property AI production registry version is not 2.');
requireCondition(aiRegistry?.disclosure === aiDisclosure, 'Stay Nearby exact-property AI disclosure drifted.');
requireCondition(aiRegistry?.policy?.exactPropertyOnly === true, 'Production AI image policy no longer requires exact-property depictions.');
requireCondition(aiRegistry?.policy?.genericHotelImagesAllowed === false, 'Production AI image policy allows generic hotel imagery.');
requireCondition(aiRegistry?.policy?.svgAllowed === false, 'Production AI image policy allows SVG.');
requireCondition(Array.isArray(aiRegistry?.items), 'Production exact-property AI image records are missing.');
const aiById = new Map(aiRegistry.items.map((item) => [item.propertyId, item]));
const seenAiUrls = new Set();
let verifiedAiAssets = 0;

for (const pilot of pilots) {
  const entries = registry.properties
    .filter((property) => property?.status === 'active')
    .map((property) => ({ property, context: (property.contexts || []).find((context) => context?.kind === 'venue' && context?.key === pilot.key) }))
    .filter((entry) => entry.context)
    .sort((left, right) => left.context.rank - right.context.rank);

  requireCondition(entries.length === 3, `${pilot.key} production registry must expose exactly 3 curated hotels; found ${entries.length}.`);
  requireCondition(entries.map((entry) => entry.context.rank).join(',') === '1,2,3', `${pilot.key} production hotel ranks must be 1,2,3.`);
  requireCondition(entries.map((entry) => entry.property.name).join('|') === pilot.hotels.join('|'), `${pilot.key} production hotel set or order drifted.`);

  for (const { property, context } of entries) {
    requireCondition(typeof context.geographicContext === 'string' && context.geographicContext.length > 0, `${property.name} lacks geographic context.`);
    requireCondition(typeof context.proximity === 'string' && context.proximity.length > 0, `${property.name} lacks verified proximity copy.`);
    requireCondition(/^https:\/\//.test(context.source?.url || ''), `${property.name} lacks an HTTPS verification source.`);
    requireCondition(/^\d{4}-\d{2}-\d{2}$/.test(context.source?.verifiedAt || ''), `${property.name} lacks a verification date.`);

    if (validRealPropertyImage(property)) continue;

    const item = aiById.get(property.id);
    requireCondition(Boolean(item), `${property.name} has neither an approved affiliate property photo nor an exact-property AI image in production.`);
    requireCondition(item?.name === property.name, `${property.name} exact-property AI record does not match the canonical property name.`);
    requireCondition(item?.kind === 'ai-property-depiction', `${property.name} AI image kind drifted.`);
    requireCondition(item?.depictsProperty === true && item?.generatedFromPropertyIdentity === true, `${property.name} AI image is not declared as an exact-property depiction.`);
    requireCondition(item?.label === aiDisclosure, `${property.name} AI image disclosure drifted.`);
    requireCondition(/^\d+\s+.+,\s*.+,\s*Texas\s+\d{5}$/i.test(item?.propertyAddress || ''), `${property.name} AI image lacks its exact Texas street address.`);
    requireCondition(item?.groundingSourceUrl === context.source.url, `${property.name} AI image is not grounded to its verified property source.`);
    requireCondition(['official-property-page', 'manually-verified-exact-property-reference'].includes(item?.referenceImageSource), `${property.name} AI reference provenance is not approved.`);
    requireCondition(/^\/images\/stay-nearby\/properties\/[a-z0-9-]+\.(?:png|jpe?g|webp)$/i.test(item?.url || ''), `${property.name} AI image is not a first-party PNG/JPEG/WebP property asset.`);
    requireCondition(!/\.svg(?:$|\?)/i.test(item?.url || ''), `${property.name} production image regressed to SVG.`);
    requireCondition(!seenAiUrls.has(item?.url), `${property.name} reuses another hotel's AI image.`);
    seenAiUrls.add(item.url);
    requireCondition(String(item?.alt || '').startsWith(`AI-generated photorealistic depiction of ${property.name}`), `${property.name} AI alt text is not exact-property-specific.`);

    const raster = await fetchLiveRaster(item.url);
    requireCondition(['image/png', 'image/jpeg', 'image/webp'].includes(raster.contentType), `${property.name} AI asset has unsupported production content type ${raster.contentType || '<missing>'}.`);
    requireCondition(raster.bytes.length >= 25_000, `${property.name} AI asset is unexpectedly small in production (${raster.bytes.length} bytes).`);
    requireCondition(rasterMagicOkay(raster.bytes), `${property.name} AI asset is not a valid raster image in production.`);
    verifiedAiAssets += 1;
  }
}

const bootstrap = await fetchLive('/expedia-travel.js');
for (const marker of [
  'const STAY_DATA_URL = "/stay-nearby-hotels.json"', 'window.TexasDefinedStayNearby', '[data-stay-nearby-slot]',
  'flex:0 0 calc((100% - 2rem)/3)', 'flex-basis:84%', 'data-camref', '1110lMy6E', 'data-pubref', 'texasdefined-stays',
  'TexasDefined does not cache or display nightly prices.',
  'Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings',
]) requireCondition(bootstrap.includes(marker), `Live Expedia/Stay Nearby bootstrap is missing marker: ${marker}`);

const contextBootstrap = await fetchLive('/stay-nearby-context-images.js');
for (const marker of [
  'const AI_PROPERTY_DATA_URL = "/stay-nearby-ai-property-images.json"',
  'data-stay-ai-property', 'ai-property-depiction', 'generatedFromPropertyIdentity === true', 'item.depictsProperty === true',
  aiDisclosure, '/images/stay-nearby/properties/', 'textFallback.replaceWith(buildAiPropertyMedia(item))',
  'const propertyImage = card.querySelector(":scope > .td-stay-image")',
]) requireCondition(contextBootstrap.includes(marker), `Live Stay Nearby exact-property image bootstrap is missing marker: ${marker}`);
for (const stale of ['data-stay-ai-fallback', 'stay-nearby-ai-fallbacks.json', 'ai-area-illustration', 'AI-generated area illustration — not the hotel property', '/images/stay-nearby/ai/']) {
  requireCondition(!contextBootstrap.includes(stale), `Live Stay Nearby bootstrap still contains legacy generic/SVG fallback marker: ${stale}`);
}

for (const pilot of pilots) {
  const page = await fetchLive(pilot.route);
  requireCondition(page.includes(pilot.pageMarker), `${pilot.route} did not render the expected venue marker.`);
  requireCondition(page.includes('/expedia-travel.js'), `${pilot.route} is missing the deferred Expedia/Stay Nearby bootstrap reference.`);
  requireCondition(page.includes('/stay-nearby-context-images.js'), `${pilot.route} is missing the deferred exact-property image bootstrap reference.`);
  requireCondition(page.includes('Texas venue guide'), `${pilot.route} did not render the redesigned venue-guide marker.`);
  requireCondition(page.includes(`What’s happening at ${pilot.pageMarker}`), `${pilot.route} did not render the venue event integration heading.`);
  requireCondition(page.includes('View all events'), `${pilot.route} did not render the venue-scoped all-events action.`);
  requireCondition(page.includes('View Calendar'), `${pilot.route} did not render the venue-scoped calendar action.`);
  requireCondition(page.includes(`/events?venue=sports-venue%3A${pilot.key}`), `${pilot.route} did not expose its venue-prefiltered calendar deep link.`);
  requireCondition(page.includes('data-stay-nearby-slot'), `${pilot.route} did not render the Stay Nearby integration slot.`);
}

console.log(`Stay Nearby production verification passed for ${pilots.length} redesigned venue guides: curated three-card hotel sets remain source-backed, approved affiliate property photos retain precedence, ${verifiedAiAssets} exact-property photorealistic AI raster assets were verified live with property-specific address/source provenance, SVG and generic hotel fallbacks are prohibited, and the shared production bootstrap enforces the same policy.`);