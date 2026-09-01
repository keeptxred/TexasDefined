const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeHtmlEntities(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function extractJsonLd(html) {
  const values = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    const raw = decodeHtmlEntities(match[1].trim());
    if (!raw) continue;
    try {
      values.push(JSON.parse(raw));
    } catch (error) {
      throw new Error(`invalid JSON-LD block: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return values;
}

function collectTypedNodes(value, out = []) {
  if (Array.isArray(value)) {
    for (const item of value) collectTypedNodes(item, out);
    return out;
  }
  if (!value || typeof value !== 'object') return out;
  if (value['@type']) out.push(value);
  for (const child of Object.values(value)) collectTypedNodes(child, out);
  return out;
}

function hasType(node, type) {
  return Array.isArray(node?.['@type']) ? node['@type'].includes(type) : node?.['@type'] === type;
}

function canonicalHref(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (!/\brel=["'][^"']*\bcanonical\b[^"']*["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href) return decodeHtmlEntities(href);
  }
  return '';
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchProduction(path, label) {
  let lastStatus = 'network-error';
  let lastBody = '';
  let lastError = '';
  let lastChallenge = false;

  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify-event-schema=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);

    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Event-Structured-Data-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastChallenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      lastBody = await response.text();
      lastError = '';

      if (!lastChallenge && response.ok) return lastBody;
      if (lastChallenge) console.log(`[${label}] Cloudflare challenge; retrying.`);
      else console.log(`[${label}] HTTP ${response.status}; retrying.`);
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      lastStatus = 'network-error';
      lastChallenge = false;
      console.log(`[${label}] request failed: ${lastError}`);
    }

    if (attempt < 8) await sleep(10_000);
  }

  const reason = lastError
    || (lastChallenge ? 'Cloudflare returned cf-mitigated: challenge' : '')
    || `HTTP ${lastStatus}`;
  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1600).replace(/\s+/g, ' ')}`);
  throw new Error(`${label} failed — ${reason}`);
}

async function verifyEventsHub() {
  const path = '/events';
  const html = await fetchProduction(path, 'events-hub');
  assert(canonicalHref(html) === `${origin}${path}`, `events hub canonical must be ${origin}${path}`);

  const blocks = extractJsonLd(html);
  assert(blocks.length > 0, 'events hub must expose JSON-LD');
  const nodes = blocks.flatMap((block) => collectTypedNodes(block));
  assert(nodes.some((node) => hasType(node, 'CollectionPage')), 'events hub must expose CollectionPage schema');
  assert(nodes.some((node) => hasType(node, 'ItemList')), 'events hub must expose ItemList schema');
  assert(nodes.some((node) => hasType(node, 'BreadcrumbList')), 'events hub must expose BreadcrumbList schema');
  assert(nodes.some((node) => hasType(node, 'WebPage')), 'events hub ItemList must expose WebPage discovery items');
  assert(!nodes.some((node) => hasType(node, 'Event')), 'events hub must not expose Event occurrence schema');
  console.log('[events-hub] structured-data scope verified');
}

async function verifyFiestaLeaf() {
  const path = '/event/fiesta-san-antonio';
  const html = await fetchProduction(path, 'fiesta-san-antonio');
  assert(canonicalHref(html) === `${origin}${path}`, `Fiesta canonical must be ${origin}${path}`);
  assert(html.includes('Fiesta San Antonio'), 'Fiesta page must render the event name');

  const nodes = extractJsonLd(html).flatMap((block) => collectTypedNodes(block));
  const events = nodes.filter((node) => hasType(node, 'Event'));
  assert(events.length >= 1, 'Fiesta leaf must expose Event schema');
  const event = events.find((node) => node.name === 'Fiesta San Antonio') ?? events[0];
  assert(event.name === 'Fiesta San Antonio', 'Fiesta Event schema must use the verified event name');
  assert(event.startDate === '2027-04-15', 'Fiesta Event schema startDate must be 2027-04-15');
  assert(event.endDate === '2027-04-25', 'Fiesta Event schema endDate must be 2027-04-25');
  assert(event.eventStatus === 'https://schema.org/EventScheduled', 'Fiesta Event schema must be scheduled');
  assert(event.eventAttendanceMode === 'https://schema.org/OfflineEventAttendanceMode', 'Fiesta Event schema must be offline');
  assert(typeof event.sameAs === 'string' && event.sameAs.startsWith('https://'), 'Fiesta Event schema must retain an official-source sameAs URL');
  assert(hasType(event.location, 'Place'), 'Fiesta Event schema must use a Place location');
  assert(event.location?.address?.addressLocality === 'San Antonio', 'Fiesta Event location must identify San Antonio');
  assert(event.location?.address?.addressRegion === 'TX', 'Fiesta Event location must identify Texas');
  assert(event.location?.address?.addressCountry === 'US', 'Fiesta Event location must identify the United States');
  console.log('[fiesta-san-antonio] Event schema verified');
}

async function verifyRecurringLeaf() {
  const path = '/event/texas-renaissance-festival';
  const html = await fetchProduction(path, 'texas-renaissance-festival');
  assert(canonicalHref(html) === `${origin}${path}`, `Texas Renaissance Festival canonical must be ${origin}${path}`);

  const nodes = extractJsonLd(html).flatMap((block) => collectTypedNodes(block));
  const events = nodes.filter((node) => hasType(node, 'Event'));
  assert(events.length === 8, `Texas Renaissance Festival must expose 8 scheduled Event windows, found ${events.length}`);
  const windows = new Set(events.map((event) => `${event.startDate}|${event.endDate ?? ''}`));
  assert(windows.has('2026-10-10|2026-10-11'), 'Texas Renaissance Festival must retain opening weekend occurrence dates');
  assert(windows.has('2026-11-27|2026-11-29'), 'Texas Renaissance Festival must retain Thanksgiving weekend occurrence dates');
  for (const event of events) {
    assert(event.eventStatus === 'https://schema.org/EventScheduled', 'every Renaissance Festival occurrence must be scheduled');
    assert(event.eventAttendanceMode === 'https://schema.org/OfflineEventAttendanceMode', 'every Renaissance Festival occurrence must be offline');
    assert(hasType(event.location, 'Place'), 'every Renaissance Festival occurrence must include a Place location');
  }
  console.log('[texas-renaissance-festival] recurring Event schema verified');
}

try {
  await verifyEventsHub();
  await verifyFiestaLeaf();
  await verifyRecurringLeaf();
  console.log('TexasDefined Event structured-data production verification passed.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error title=EVENT STRUCTURED DATA LIVE PRODUCTION failure::${message}`);
  process.exit(1);
}
