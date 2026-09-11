#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const IMAGE_MODEL = 'gpt-image-2';
const OUTPUT_DIR = path.join(ROOT, 'public/images/stay-nearby/properties');
const MANIFEST_PATH = path.join(ROOT, 'public/stay-nearby-ai-property-images.json');
const LEGACY_MANIFEST_PATH = path.join(ROOT, 'public/stay-nearby-ai-fallbacks.json');
const LEGACY_DIR = path.join(ROOT, 'public/images/stay-nearby/ai');
const HOTEL_REGISTRY_PATH = path.join(ROOT, 'public/stay-nearby-hotels.json');
const VENUE_ROUTE_PATH = path.join(ROOT, 'src/routes/sports-venue.$slug.tsx');
const DISCLOSURE = 'AI-generated depiction of this property — not an official hotel photograph';
const BROWSER_HEADERS = Object.freeze({
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  'cache-control': 'no-cache',
});

const ADDRESS_BY_ID = Object.freeze({
  'courtyard-fort-worth-university-drive': '3150 Riverfront Drive, Fort Worth, Texas 76107',
  'hilton-garden-inn-fort-worth-medical-center': '912 Northton Street, Fort Worth, Texas 76104',
  'homewood-suites-fort-worth-medical-center': '2200 Charlie Lane, Fort Worth, Texas 76104',
  'graduate-dallas': '6101 Hillcrest Avenue, Dallas, Texas 75205',
  'the-highland-dallas': '5300 E Mockingbird Lane, Dallas, Texas 75206',
  'hotel-mockingbird-dallas': '6070 North Central Expressway, Dallas, Texas 75206',
  'live-by-loews-arlington': '1600 E Randol Mill Road, Arlington, Texas 76011',
  'loews-arlington-hotel': '888 Nolan Ryan Expressway, Arlington, Texas 76011',
  'drury-plaza-dallas-arlington': '101 West Road to Six Flags Street, Arlington, Texas 76011',
  'w-dallas': '2440 Victory Park Lane, Dallas, Texas 75219',
  'homewood-suites-dallas-downtown': '1025 Elm Street, Dallas, Texas 75202',
  'hilton-anatole': '2201 N Stemmons Fwy, Dallas, Texas 75207',
  'tru-northlake-fort-worth': '13451 Raceway Dr., Northlake, Texas 76262',
  'home2-suites-fort-worth-northlake': '13351 Raceway Drive, Northlake, Texas 76262',
  'holiday-inn-express-fort-worth-north-northlake': '13261 Raceway Drive, Northlake, Texas 76262',
});

function requireValue(name, value) {
  if (!value) throw new Error(`${name} is required.`);
}

function todayTexas() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value || '00';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

function activePilotSlugs() {
  const source = fs.readFileSync(VENUE_ROUTE_PATH, 'utf8');
  const match = source.match(/const sportsVenueGuidePilotSlugs = new Set\(\[([\s\S]*?)\]\);/);
  if (!match) throw new Error('Could not find sportsVenueGuidePilotSlugs in the sports venue route.');
  return new Set([...match[1].matchAll(/'([^']+)'/g)].map((item) => item[1]));
}

function selectProperties() {
  const registry = JSON.parse(fs.readFileSync(HOTEL_REGISTRY_PATH, 'utf8'));
  const pilots = activePilotSlugs();
  const selected = registry.properties.filter((property) =>
    property?.status === 'active'
      && (property.contexts || []).some((context) => context.kind === 'venue' && pilots.has(context.key)));
  for (const property of selected) {
    if (!ADDRESS_BY_ID[property.id]) throw new Error(`Missing exact verified address for Stay Nearby property ${property.id}.`);
  }
  return selected;
}

function officialSource(property) {
  const pilots = activePilotSlugs();
  const context = (property.contexts || []).find((item) => item.kind === 'venue' && pilots.has(item.key));
  if (!context?.source?.url) throw new Error(`${property.id} has no official context source URL.`);
  return context.source.url;
}

function parseMetaImage(html, pageUrl) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const wanted of ['og:image', 'twitter:image', 'twitter:image:src']) {
    for (const tag of tags) {
      const attrs = Object.fromEntries([...tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gi)].map((match) => [match[1].toLowerCase(), match[3]]));
      const key = (attrs.property || attrs.name || '').toLowerCase();
      if (key !== wanted || !attrs.content) continue;
      try {
        return new URL(attrs.content.replaceAll('&amp;', '&'), pageUrl).toString();
      } catch {
        // try the next candidate
      }
    }
  }
  return null;
}

function referencePageCandidates(sourceUrl) {
  const source = new URL(sourceUrl);
  const candidates = [];
  if (source.hostname.endsWith('marriott.com')) {
    const marker = source.pathname.match(/^(\/en-us\/hotels\/[^/]+-[^/]+\/)/);
    if (marker) candidates.push(new URL(`${marker[1]}photos/`, source.origin).toString());
  }
  if (source.hostname.endsWith('hilton.com')) {
    const basePath = source.pathname.replace(/\/(?:hotel-location|hotel-info|rooms|dining|events|gallery)\/?$/, '/');
    candidates.push(new URL(`${basePath.replace(/\/?$/, '/')}gallery/`, source.origin).toString());
  }
  candidates.push(source.toString());
  return [...new Set(candidates)];
}

async function fetchPageImageUrl(pageUrl) {
  const page = await fetch(pageUrl, {
    redirect: 'follow',
    headers: BROWSER_HEADERS,
    signal: AbortSignal.timeout(30_000),
  });
  if (!page.ok) throw new Error(`HTTP ${page.status}`);
  const html = await page.text();
  const imageUrl = parseMetaImage(html, page.url);
  if (!imageUrl) throw new Error('no usable social/reference image metadata');
  return imageUrl;
}

async function fetchOfficialReference(sourceUrl) {
  const failures = [];
  let imageUrl = '';
  for (const pageUrl of referencePageCandidates(sourceUrl)) {
    try {
      imageUrl = await fetchPageImageUrl(pageUrl);
      console.log(`Using official visual-reference page: ${pageUrl}`);
      break;
    } catch (error) {
      failures.push(`${pageUrl} (${error instanceof Error ? error.message : String(error)})`);
    }
  }
  if (!imageUrl) throw new Error(`Official property pages did not expose a usable reference image: ${failures.join('; ')}`);

  const image = await fetch(imageUrl, {
    redirect: 'follow',
    headers: { ...BROWSER_HEADERS, accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8', referer: sourceUrl },
    signal: AbortSignal.timeout(30_000),
  });
  if (!image.ok) throw new Error(`Official reference image returned HTTP ${image.status}: ${imageUrl}`);
  const contentType = (image.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
  if (!/^image\/(?:png|jpeg|webp)$/.test(contentType)) throw new Error(`Reference image is not PNG/JPEG/WebP (${contentType || 'unknown'}): ${imageUrl}`);
  const bytes = new Uint8Array(await image.arrayBuffer());
  if (bytes.length < 10_000 || bytes.length > 15_000_000) throw new Error(`Reference image size is outside the safe range (${bytes.length} bytes): ${imageUrl}`);
  return { bytes, contentType, imageUrl };
}

function generationPrompt(property, address, sourceUrl) {
  return [
    `Create a photorealistic exterior editorial depiction of the exact hotel property named “${property.name}” located at ${address}.`,
    'The supplied image comes from the property’s official web presence and is only a visual grounding reference. Preserve the recognizable massing, facade, roofline, window pattern, entrance placement, setbacks, landscaping, and immediate streetscape cues that identify this specific property.',
    'Do not substitute a different hotel, a generic hotel, a generic version of the brand, or a made-up building.',
    'Keep the scene physically plausible for this exact address and property. If the reference is not an exterior image, use it only for property identity and styling and remain conservative rather than inventing unusual architecture.',
    'Use natural daylight and a realistic street-level or parking-lot three-quarter exterior camera view. No dramatic fantasy lighting, illustration style, poster treatment, collage, or text overlay.',
    'Avoid readable signs, logos, license plates, or invented brand lettering; visual identity should come from the real building form and site context rather than fabricated text.',
    `Grounding source: ${sourceUrl}`,
  ].join(' ').slice(0, 5000);
}

function decodeImagePayload(payload, status, raw) {
  if (status < 200 || status >= 300) throw new Error(`OpenAI image request failed (${status}): ${payload?.error?.message || raw.slice(0, 500)}`);
  const encoded = payload?.data?.[0]?.b64_json;
  if (typeof encoded !== 'string' || !encoded) throw new Error('OpenAI image response returned no base64 image data.');
  return Uint8Array.from(Buffer.from(encoded, 'base64'));
}

async function openAiEdit(property, address, sourceUrl, reference) {
  const form = new FormData();
  form.append('model', IMAGE_MODEL);
  form.append('prompt', generationPrompt(property, address, sourceUrl));
  form.append('size', '1536x1024');
  form.append('image', new Blob([reference.bytes], { type: reference.contentType }), `reference.${reference.contentType.split('/')[1].replace('jpeg', 'jpg')}`);

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_KEY}` },
    body: form,
    signal: AbortSignal.timeout(180_000),
  });
  const raw = await response.text();
  let payload = {};
  try { payload = raw ? JSON.parse(raw) : {}; } catch { throw new Error(`OpenAI image edit returned invalid JSON (HTTP ${response.status}).`); }
  return decodeImagePayload(payload, response.status, raw);
}

function imageFormat(bytes) {
  if (bytes.length >= 8 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return { extension: 'png', contentType: 'image/png' };
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { extension: 'jpg', contentType: 'image/jpeg' };
  if (bytes.length >= 12 && Buffer.from(bytes.slice(0, 4)).toString('ascii') === 'RIFF' && Buffer.from(bytes.slice(8, 12)).toString('ascii') === 'WEBP') return { extension: 'webp', contentType: 'image/webp' };
  throw new Error('Generated image is not PNG, JPEG, or WebP.');
}

async function generatePropertyImage(property) {
  const address = ADDRESS_BY_ID[property.id];
  const sourceUrl = officialSource(property);
  const reference = await fetchOfficialReference(sourceUrl);
  const bytes = await openAiEdit(property, address, sourceUrl, reference);
  if (bytes.length < 25_000) throw new Error(`Generated image for ${property.id} is unexpectedly small (${bytes.length} bytes).`);
  const format = imageFormat(bytes);
  return { address, sourceUrl, referenceImageUrl: reference.imageUrl, bytes, format };
}

requireValue('OPENAI_API_KEY', OPENAI_KEY);
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const selected = selectProperties();
if (!selected.length) throw new Error('No active Stay Nearby properties are attached to redesigned venue guides.');

const generatedAt = todayTexas();
const items = [];
for (const property of selected) {
  console.log(`Generating exact-property image for ${property.name}...`);
  const generated = await generatePropertyImage(property);
  const filename = `${property.id}.${generated.format.extension}`;
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, generated.bytes);
  items.push({
    propertyId: property.id,
    name: property.name,
    propertyAddress: generated.address,
    url: `/images/stay-nearby/properties/${filename}`,
    kind: 'ai-property-depiction',
    alt: `AI-generated photorealistic depiction of ${property.name} at ${generated.address}`,
    label: DISCLOSURE,
    generatedAt,
    depictsProperty: true,
    generatedFromPropertyIdentity: true,
    groundingSourceUrl: generated.sourceUrl,
    referenceImageSource: 'official-property-page',
    provider: 'OpenAI',
    model: IMAGE_MODEL,
  });
  console.log(JSON.stringify({ propertyId: property.id, output: outputPath, bytes: generated.bytes.length, referenceImageUrl: generated.referenceImageUrl }));
}

const manifest = {
  version: 2,
  reviewedAt: generatedAt,
  disclosure: DISCLOSURE,
  policy: {
    exactPropertyOnly: true,
    genericHotelImagesAllowed: false,
    svgAllowed: false,
    approvedRasterFormats: ['png', 'jpg', 'webp'],
    groundingRequirement: 'official-property-page reference plus exact verified street address',
  },
  items,
};
fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
if (fs.existsSync(LEGACY_MANIFEST_PATH)) fs.rmSync(LEGACY_MANIFEST_PATH);
if (fs.existsSync(LEGACY_DIR)) fs.rmSync(LEGACY_DIR, { recursive: true, force: true });

console.log(`Generated ${items.length} exact-property Stay Nearby raster images and removed legacy SVG fallbacks.`);
