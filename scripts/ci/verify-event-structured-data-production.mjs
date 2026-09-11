const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const minimumIndexableEvergreenCollectionItems = 3;

function decodeHtmlEntities(value) {
  return value
    .replace(/&quot;/gi, '"')
    .replace(/&#34;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/gi, "'")
    .replace(/&#x2019;/gi, '’')
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

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
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

function robotsContent(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    const name = tag.match(/\bname=["']([^"']+)["']/i)?.[1]?.toLowerCase();
    if (name !== 'robots') continue;
    return decodeHtmlEntities(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '');
  }
  return '';
}

function hasNoindex(html) {
  return /(?:^|[\s,])noindex(?:$|[\s,])/i.test(robotsContent(html));
}

function hasStatewideEventsHero(html) {
  return /What[’']s happening across Texas/i.test(decodeHtmlEntities(html));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function eventNodes(html) {
  return extractJsonLd(html)
    .flatMap((block) => collectTypedNodes(block))
    .filter((node) => hasType(node, 'Event'));
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

function verifyOfferShape(offer, label, expectedFree) {
  assert(hasType(offer, 'Offer'), `${label} must be typed Offer`);
  assert(typeof offer.name === 'string' && offer.name.trim(), `${label} must include an offer name`);
  assert(offer.priceCurrency === 'USD', `${label} must use USD`);
  assert(Number.isFinite(Number(offer.price)), `${label} must include a numeric price`);
  if (expectedFree) assert(Number(offer.price) === 0, `${label} must remain a truthful free offer`);
  else assert(Number(offer.price) > 0, `${label} must remain a paid offer`);
  assert(typeof offer.url === 'string' && offer.url.startsWith('https://'), `${label} must link to an HTTPS ticket/admission source`);
}

async function verifyEventsHub() {
  const path = '/events';
  const html = await fetchProduction(path, 'events-hub');
  assert(canonicalHref(html) === `${origin}${path}`, `events hub canonical must be ${origin}${path}`);
  assert(hasStatewideEventsHero(html), 'events hub must render the statewide Events hero');

  const blocks = extractJsonLd(html);
  assert(blocks.length > 0, 'events hub must expose JSON-LD');
  const nodes = blocks.flatMap((block) => collectTypedNodes(block));
  assert(nodes.some((node) => hasType(node, 'CollectionPage')), 'events hub must expose CollectionPage schema');
  assert(nodes.some((node) => hasType(node, 'ItemList')), 'events hub must expose ItemList schema');
  assert(nodes.some((node) => hasType(node, 'BreadcrumbList')), 'events hub must expose BreadcrumbList schema');
  assert(nodes.some((node) => hasType(node, 'WebPage')), 'events hub ItemList must expose WebPage discovery items');
  assert(!nodes.some((node) => hasType(node, 'Event')), 'events hub must not expose Event occurrence schema');
  console.log('[events-hub] statewide body and collection-only structured-data scope verified');
}

async function verifyEventCollections() {
  const sitemap = await fetchProduction('/sitemap.xml', 'events-sitemap');

  const tournamentsPath = '/events/tournaments';
  const tournaments = await fetchProduction(tournamentsPath, 'events-tournaments');
  const decodedTournaments = decodeHtmlEntities(tournaments);
  assert(canonicalHref(tournaments) === `${origin}${tournamentsPath}`, `tournaments canonical must be ${origin}${tournamentsPath}`);
  assert(decodedTournaments.includes('How to plan it'), 'tournaments must render its collection planning section');
  assert(decodedTournaments.includes('Source policy'), 'tournaments must render its collection source policy');
  assert(decodedTournaments.includes('Browse category'), 'tournaments hub must render tournament category discovery');
  assert(!hasStatewideEventsHero(tournaments), 'tournaments must not render the statewide Events hero');
  assert(!hasNoindex(tournaments), 'tournaments hub must remain indexable');
  assert(sitemap.includes(`<loc>${origin}${tournamentsPath}</loc>`), 'tournaments hub must remain in sitemap.xml');
  const tournamentNodes = extractJsonLd(tournaments).flatMap((block) => collectTypedNodes(block));
  assert(tournamentNodes.some((node) => hasType(node, 'CollectionPage')), 'tournaments must expose CollectionPage schema');
  assert(tournamentNodes.some((node) => hasType(node, 'ItemList')), 'tournaments must expose ItemList schema');
  console.log('[events-tournaments] child-only body, canonical, indexing and sitemap contract verified');

  const panhandlePath = '/events/panhandle-events';
  const panhandle = await fetchProduction(panhandlePath, 'events-panhandle');
  const decodedPanhandle = decodeHtmlEntities(panhandle);
  assert(canonicalHref(panhandle) === `${origin}${panhandlePath}`, `Panhandle canonical must be ${origin}${panhandlePath}`);
  assert(decodedPanhandle.includes('How to plan it'), 'Panhandle collection must render its planning section');
  assert(decodedPanhandle.includes('Source policy'), 'Panhandle collection must render its source policy');
  assert(!hasStatewideEventsHero(panhandle), 'Panhandle collection must not render the statewide Events hero');

  const countMatch = decodedPanhandle.match(/([0-9,]+)\s+verified event guides/i);
  assert(countMatch, 'Panhandle collection must visibly expose its verified event-guide count');
  const verifiedGuideCount = Number(countMatch[1].replace(/,/g, ''));
  assert(Number.isFinite(verifiedGuideCount), 'Panhandle verified event-guide count must be numeric');
  const shouldIndex = verifiedGuideCount >= minimumIndexableEvergreenCollectionItems;
  const inSitemap = sitemap.includes(`<loc>${origin}${panhandlePath}</loc>`);
  assert(hasNoindex(panhandle) === !shouldIndex, `Panhandle robots policy must match its ${verifiedGuideCount} verified guides and ${minimumIndexableEvergreenCollectionItems}-guide threshold`);
  assert(inSitemap === shouldIndex, `Panhandle sitemap policy must match its ${verifiedGuideCount} verified guides and ${minimumIndexableEvergreenCollectionItems}-guide threshold`);
  const panhandleNodes = extractJsonLd(panhandle).flatMap((block) => collectTypedNodes(block));
  assert(panhandleNodes.some((node) => hasType(node, 'CollectionPage')), 'Panhandle collection must expose CollectionPage schema');
  assert(panhandleNodes.some((node) => hasType(node, 'ItemList')), 'Panhandle collection must expose ItemList schema');
  console.log(`[events-panhandle] child-only body, canonical and dynamic ${verifiedGuideCount}-guide indexing/sitemap contract verified`);
}

async function verifyRecurrenceDerivedLeaves() {
  const leaves = [
    {
      slug: 'luling-watermelon-thump',
      name: 'Luling Watermelon Thump',
      planningNeedle: 'Use the recurrence rule as the planning window',
    },
    {
      slug: 'national-polka-festival',
      name: 'National Polka Festival',
      planningNeedle: 'Treat Memorial Day Weekend as the stable planning window',
    },
    {
      slug: 'westfest',
      name: 'Westfest',
      planningNeedle: 'Use the Labor Day Weekend recurrence as the planning window',
    },
  ];

  for (const leaf of leaves) {
    const path = `/event/${leaf.slug}`;
    const html = await fetchProduction(path, leaf.slug);
    assert(canonicalHref(html) === `${origin}${path}`, `${leaf.name} canonical must be ${origin}${path}`);
    assert(html.includes(leaf.name), `${leaf.name} page must render the event name`);
    assert(html.includes(leaf.planningNeedle), `${leaf.name} must visibly identify its recurrence-derived date as a planning window`);
    assert(/recheck the organizer/i.test(html), `${leaf.name} must visibly tell readers to recheck the organizer for the dedicated schedule`);

    const blocks = extractJsonLd(html);
    assert(blocks.length > 0, `${leaf.name} must expose JSON-LD`);
    const nodes = blocks.flatMap((block) => collectTypedNodes(block));
    assert(nodes.some((node) => hasType(node, 'WebPage')), `${leaf.name} recurrence-derived schema must expose WebPage`);
    assert(nodes.some((node) => hasType(node, 'Thing')), `${leaf.name} recurrence-derived schema must describe the event as a Thing`);
    assert(!nodes.some((node) => hasType(node, 'Event')), `${leaf.name} recurrence-derived schema must not expose scheduled Event markup`);
    assert(!nodes.some((node) => hasType(node, 'EventScheduled')), `${leaf.name} recurrence-derived schema must not expose EventScheduled markup`);
    assert(nodes.every((node) => !Object.hasOwn(node, 'startDate') && !Object.hasOwn(node, 'endDate')), `${leaf.name} recurrence-derived JSON-LD must not publish startDate or endDate`);
    console.log(`[${leaf.slug}] recurrence-derived visible labeling and schema suppression verified`);
  }
}

async function verifyFiestaLeaf() {
  const path = '/event/fiesta-san-antonio';
  const html = await fetchProduction(path, 'fiesta-san-antonio');
  assert(canonicalHref(html) === `${origin}${path}`, `Fiesta canonical must be ${origin}${path}`);
  assert(html.includes('Fiesta San Antonio'), 'Fiesta page must render the event name');
  assert(html.includes('Organizer:'), 'Fiesta visible page must expose the verified organizer');
  assert(!html.includes('Verified admission options'), 'Fiesta visible page must not invent unreleased 2027 offers');
  assert(!html.includes('Announced performers'), 'Fiesta visible page must not leak a prior-year performer lineup');

  const events = eventNodes(html);
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
  assert(hasType(event.organizer, 'Organization'), 'Fiesta Event schema must expose the verified organizer');
  assert(event.organizer?.name === 'Fiesta San Antonio Commission', 'Fiesta organizer must match repository-reviewed evidence');
  assert(asArray(event.offers).length === 0, 'Fiesta 2027 schema must intentionally omit unreleased offers');
  assert(asArray(event.performer).length === 0, 'Fiesta 2027 schema must intentionally omit unannounced performers');
  assert(asArray(event.image).length === 0, 'Fiesta schema must not substitute generic fallback imagery');
  console.log('[fiesta-san-antonio] organizer plus future-year omission policy verified');
}

async function verifyFreeOfferLeaf() {
  const path = '/event/bandera-round-up-cattle-drive';
  const html = await fetchProduction(path, 'bandera-round-up-cattle-drive');
  assert(canonicalHref(html) === `${origin}${path}`, `Bandera Round-Up canonical must be ${origin}${path}`);
  assert(html.includes('Organizer:'), 'Bandera Round-Up visible page must expose the verified organizer');
  assert(!html.includes('Verified admission options'), 'Expired Bandera Round-Up occurrence must not keep advertising its prior occurrence admission');
  assert(!html.includes('Announced performers'), 'Expired Bandera Round-Up occurrence must not keep advertising a prior occurrence lineup');

  const blocks = extractJsonLd(html);
  assert(blocks.length > 0, 'Expired Bandera Round-Up guide must expose JSON-LD');
  const nodes = blocks.flatMap((block) => collectTypedNodes(block));
  assert(nodes.some((node) => hasType(node, 'WebPage')), 'Expired Bandera Round-Up guide must expose WebPage schema');
  assert(nodes.some((node) => hasType(node, 'Thing')), 'Expired Bandera Round-Up guide must describe the event as a Thing');
  assert(!nodes.some((node) => hasType(node, 'Event')), 'Expired Bandera Round-Up occurrence must not expose scheduled Event markup');
  assert(nodes.every((node) => !Object.hasOwn(node, 'startDate') && !Object.hasOwn(node, 'endDate')), 'Expired Bandera Round-Up JSON-LD must not publish stale occurrence dates');
  console.log('[bandera-round-up-cattle-drive] expired-occurrence evergreen schema policy verified');
}

async function verifyPaidOfferAndPerformersLeaf() {
  const path = '/event/fort-bend-county-fair-rodeo';
  const html = await fetchProduction(path, 'fort-bend-county-fair-rodeo');
  assert(canonicalHref(html) === `${origin}${path}`, `Fort Bend County Fair canonical must be ${origin}${path}`);
  assert(html.includes('Organizer:'), 'Fort Bend visible page must expose the verified organizer');
  assert(html.includes('Verified admission options'), 'Fort Bend visible page must expose verified admission');
  assert(html.includes('Announced performers'), 'Fort Bend visible page must expose announced performers');

  const event = eventNodes(html)[0];
  assert(event, 'Fort Bend County Fair leaf must expose Event schema');
  assert(hasType(event.organizer, 'Organization'), 'Fort Bend County Fair must expose its verified organizer');
  const offers = asArray(event.offers);
  assert(offers.length >= 1, 'Fort Bend County Fair must expose a verified paid Offer');
  const paidOffer = offers.find((offer) => Number(offer?.price) > 0);
  assert(paidOffer, 'Fort Bend County Fair must retain a positive-price Offer');
  verifyOfferShape(paidOffer, 'Fort Bend County Fair paid admission', false);
  const performers = asArray(event.performer);
  assert(performers.length >= 1, 'Fort Bend County Fair must expose its announced performer set');
  assert(performers.every((item) => hasType(item, 'Person') || hasType(item, 'PerformingGroup')), 'Fort Bend performers must use Person or PerformingGroup schema');
  assert(performers.every((item) => typeof item.name === 'string' && item.name.trim()), 'Fort Bend performers must have names');
  console.log('[fort-bend-county-fair-rodeo] organizer, paid Offer and performer set verified');
}

async function verifyRecurringLeaf() {
  const path = '/event/texas-renaissance-festival';
  const html = await fetchProduction(path, 'texas-renaissance-festival');
  assert(canonicalHref(html) === `${origin}${path}`, `Texas Renaissance Festival canonical must be ${origin}${path}`);
  assert(html.includes('Verified admission options'), 'Texas Renaissance Festival visible page must expose occurrence-backed admission options');

  const events = eventNodes(html);
  assert(events.length === 8, `Texas Renaissance Festival must expose 8 scheduled Event windows, found ${events.length}`);
  const windows = new Set(events.map((event) => `${event.startDate}|${event.endDate ?? ''}`));
  assert(windows.has('2026-10-10|2026-10-11'), 'Texas Renaissance Festival must retain opening weekend occurrence dates');
  assert(windows.has('2026-11-27|2026-11-29'), 'Texas Renaissance Festival must retain Thanksgiving weekend occurrence dates');
  for (const event of events) {
    assert(event.eventStatus === 'https://schema.org/EventScheduled', 'every Renaissance Festival occurrence must be scheduled');
    assert(event.eventAttendanceMode === 'https://schema.org/OfflineEventAttendanceMode', 'every Renaissance Festival occurrence must be offline');
    assert(hasType(event.location, 'Place'), 'every Renaissance Festival occurrence must include a Place location');
    assert(hasType(event.organizer, 'Organization'), 'every Renaissance Festival occurrence must inherit the verified organizer');
    const offers = asArray(event.offers);
    assert(offers.length >= 1, 'every Renaissance Festival occurrence must retain its occurrence-scoped Offer');
    assert(offers.every((offer) => offer.priceCurrency === 'USD' && typeof offer.url === 'string' && offer.url.startsWith('https://')), 'Renaissance Festival offers must remain current USD source-backed links');
  }
  console.log('[texas-renaissance-festival] recurring Event and occurrence enrichment verified');
}

try {
  await verifyEventsHub();
  await verifyEventCollections();
  await verifyRecurrenceDerivedLeaves();
  await verifyFiestaLeaf();
  await verifyFreeOfferLeaf();
  await verifyPaidOfferAndPerformersLeaf();
  await verifyRecurringLeaf();
  console.log('TexasDefined Event production verification passed, including collection SSR isolation, dynamic collection indexing/sitemap policy, recurrence-derived schema suppression, optional enrichment and intentional omissions.');
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`::error title=EVENT STRUCTURED DATA LIVE PRODUCTION failure::${message}`);
  process.exit(1);
}
