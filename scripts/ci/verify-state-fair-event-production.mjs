const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const path = '/texas-state-fair';
const endDate = '2026-10-18';

function decodeHtmlEntities(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function currentTexasDateKey(date = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).formatToParts(date).map(({ type, value }) => [type, value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function extractJsonLd(html) {
  const blocks = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    const raw = decodeHtmlEntities(match[1].trim());
    if (!raw) continue;
    blocks.push(JSON.parse(raw));
  }
  return blocks;
}

function collectNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectNodes(item, out);
    return out;
  }
  if (!value || typeof value !== 'object') return out;
  if (value['@type']) out.push(value);
  for (const child of Object.values(value)) collectNodes(child, out);
  return out;
}

function hasType(node, type) {
  return Array.isArray(node?.['@type']) ? node['@type'].includes(type) : node?.['@type'] === type;
}

function canonicalHref(html) {
  for (const tag of html.match(/<link\b[^>]*>/gi) ?? []) {
    if (!/\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href) return decodeHtmlEntities(href);
  }
  return '';
}

function robotsContent(html) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    if (tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase() !== 'robots') continue;
    return decodeHtmlEntities(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '');
  }
  return '';
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const response = await fetch(`${origin}${path}?verify-state-fair-event=${Date.now()}`, {
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
    headers: { 'user-agent': 'TexasDefined-State-Fair-Event-Production-Smoke/1.0' },
  });
  assert(response.ok, `State Fair production page returned HTTP ${response.status}`);
  const html = await response.text();
  assert(canonicalHref(html) === `${origin}${path}`, `State Fair canonical must be ${origin}${path}`);
  assert(!/(?:^|[\s,])noindex(?:$|[\s,])/i.test(robotsContent(html)), 'State Fair permanent authority page must remain indexable');

  const nodes = extractJsonLd(html).flatMap((block) => collectNodes(block));
  const eventNodes = nodes.filter((node) => hasType(node, 'Event'));
  const today = currentTexasDateKey();

  if (today <= endDate) {
    const event = eventNodes.find((node) => node.name === '2026 State Fair of Texas') ?? eventNodes[0];
    assert(event, 'State Fair must expose Event JSON-LD while the confirmed 2026 occurrence is current/upcoming');
    assert(event.startDate === '2026-09-25', 'State Fair startDate must be 2026-09-25');
    assert(event.endDate === endDate, `State Fair endDate must be ${endDate}`);
    assert(event.eventStatus === 'https://schema.org/EventScheduled', 'State Fair must be EventScheduled while current/upcoming');
    assert(event.eventAttendanceMode === 'https://schema.org/OfflineEventAttendanceMode', 'State Fair must be an offline event');
    assert(event.url === `${origin}${path}`, 'State Fair Event.url must use the TexasDefined canonical leaf URL');
    assert(event.sameAs === 'https://bigtex.com/', 'State Fair Event.sameAs must retain the official site');
    assert(event.location?.['@type'] === 'Place', 'State Fair must use a Place location');
    assert(event.location?.address?.['@type'] === 'PostalAddress', 'State Fair must use PostalAddress');
    assert(event.location?.address?.streetAddress === '3809 Grand Avenue', 'State Fair street address must identify Fair Park');
    assert(event.location?.address?.postalCode === '75210', 'State Fair postal code must identify Fair Park');
    console.log('State Fair production Event JSON-LD is current, canonical and location-complete.');
    return;
  }

  assert(eventNodes.length === 0, 'Expired 2026 State Fair page must not retain stale Event JSON-LD');
  assert(nodes.some((node) => hasType(node, 'WebPage')), 'Expired State Fair page must expose WebPage schema');
  assert(nodes.some((node) => hasType(node, 'Thing') && node.name === 'State Fair of Texas'), 'Expired State Fair page must retain evergreen Thing identity');
  console.log('Expired State Fair production page correctly suppresses stale Event JSON-LD.');
}

main().catch((error) => {
  console.error(`::error title=STATE FAIR EVENT LIVE PRODUCTION failure::${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});