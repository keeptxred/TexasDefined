const origin = String(process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const sha = process.env.GITHUB_SHA ?? 'local';
const runId = process.env.GITHUB_RUN_ID ?? Date.now().toString();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

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

function extractJsonLd(html) {
  const values = [];
  const pattern = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(pattern)) {
    const raw = decodeHtmlEntities(match[1].trim());
    if (!raw) continue;
    values.push(JSON.parse(raw));
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

async function fetchProduction(path, label) {
  let lastError = '';
  let lastStatus = 'network-error';
  let lastBody = '';

  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify-event-temporal=${encodeURIComponent(`${sha}-${runId}-${attempt}`)}`;
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-Temporal-Event-Production-Smoke/1.0' },
      });
      lastStatus = String(response.status);
      lastBody = await response.text();
      const challenged = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      if (response.ok && !challenged) return lastBody;
      lastError = challenged ? 'Cloudflare challenge' : `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 6) await sleep(8_000);
  }

  if (lastBody) console.error(`[${label}] response sample: ${lastBody.slice(0, 1000).replace(/\s+/g, ' ')}`);
  throw new Error(`${label} failed after retries — ${lastError || `HTTP ${lastStatus}`}`);
}

function parseVerifiedGuideCount(html, label, pattern = /([0-9,]+)\s+verified event guides/i) {
  const visibleText = decodeHtmlEntities(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ');
  const match = visibleText.match(pattern);
  assert(match, `${label} must visibly expose its verified event-guide count`);
  const count = Number(match[1].replace(/,/g, ''));
  assert(Number.isFinite(count), `${label} verified event-guide count must be numeric`);
  return count;
}

function verifyCollectionSchema(html, label) {
  const nodes = extractJsonLd(html).flatMap((block) => collectTypedNodes(block));
  assert(nodes.some((node) => hasType(node, 'CollectionPage')), `${label} must expose CollectionPage schema`);
  assert(nodes.some((node) => hasType(node, 'ItemList')), `${label} must expose ItemList schema`);
  assert(nodes.some((node) => hasType(node, 'BreadcrumbList')), `${label} must expose BreadcrumbList schema`);
  assert(!nodes.some((node) => hasType(node, 'Event')), `${label} must not expose individual Event schema`);
}

const collections = [
  {
    path: '/events/this-weekend',
    threshold: 4,
    label: 'Texas this weekend',
    titleNeedle: 'Things to Do in Texas This Weekend',
    planningNeedle: 'How TexasDefined chooses weekend events',
    sourcePolicyNeedle: 'Verified occurrence first, evergreen planning second',
    windowNeedle: 'Texas This Weekend ·',
    countPattern: /([0-9,]+)\s+verified guides\b/i,
  },
  { path: '/events/houston-this-weekend', threshold: 4, label: 'Houston this weekend', titleNeedle: 'Things to Do in Houston This Weekend' },
  { path: '/events/dallas-this-weekend', threshold: 4, label: 'Dallas-Fort Worth this weekend', titleNeedle: 'Things to Do in Dallas-Fort Worth This Weekend' },
  { path: '/events/austin-this-weekend', threshold: 4, label: 'Austin this weekend', titleNeedle: 'Things to Do in Austin This Weekend' },
  { path: '/events/san-antonio-this-weekend', threshold: 4, label: 'San Antonio this weekend', titleNeedle: 'Things to Do in San Antonio This Weekend' },
  { path: '/events/september-events', threshold: 6, label: 'September events', titleNeedle: 'September Events in Texas' },
  { path: '/events/october-events', threshold: 6, label: 'October events', titleNeedle: 'October Events in Texas' },
  { path: '/events/november-events', threshold: 6, label: 'November events', titleNeedle: 'November Events in Texas' },
  { path: '/events/december-events', threshold: 6, label: 'December events', titleNeedle: 'December Events in Texas' },
  { path: '/events/fall-festivals', threshold: 6, label: 'fall festivals', titleNeedle: 'Texas Fall Festivals' },
  { path: '/events/christmas-events', threshold: 4, label: 'Christmas events', titleNeedle: 'Texas Christmas' },
  { path: '/events/county-fairs', threshold: 4, label: 'county fairs', titleNeedle: 'Texas County Fairs' },
];

async function verifyDynamicCollection(collection, sitemap) {
  const html = await fetchProduction(collection.path, collection.label);
  const decoded = decodeHtmlEntities(html);
  assert(canonicalHref(html) === `${origin}${collection.path}`, `${collection.label} canonical must be ${origin}${collection.path}`);
  assert(decoded.includes(collection.titleNeedle), `${collection.label} must render its expected heading`);
  assert(decoded.includes(collection.planningNeedle ?? 'How to plan it'), `${collection.label} must render planning context`);
  assert(decoded.includes(collection.sourcePolicyNeedle ?? 'Source policy'), `${collection.label} must render source-policy context`);
  assert(decoded.includes(collection.windowNeedle ?? 'Current verified window:'), `${collection.label} must render its current rolling/seasonal window`);
  const count = parseVerifiedGuideCount(html, collection.label, collection.countPattern);
  const shouldIndex = count >= collection.threshold;
  const inSitemap = sitemap.includes(`<loc>${origin}${collection.path}</loc>`);
  assert(hasNoindex(html) === !shouldIndex, `${collection.label} robots policy must match ${count} guides and ${collection.threshold}-guide threshold`);
  assert(inSitemap === shouldIndex, `${collection.label} sitemap policy must match ${count} guides and ${collection.threshold}-guide threshold`);
  // Verify the Christmas collection is actually present in server-rendered production during the season.
  const today = new Date().toISOString().slice(0,10);
  if (collection.path === '/events/christmas-events' && today >= '2026-10-23' && today <= '2027-01-02') {
    for (const needle of ['Source-verified local traditions','Christmas lights, parades and community festivals','Official event schedule','Christmas travel sponsorships','Frisco']) {
      assert(decoded.includes(needle), 'Live Christmas event collection missing reviewed seasonal coverage: '+needle);
    }
  }
  // Production SSR must expose exactly the unexpired fall card set. This runs
  // every day under the existing GitHub schedule, independently of new deploys.
  if (collection.path === '/events/fall-festivals') {
    const texasParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const datePart = (type) => texasParts.find((part) => part.type === type)?.value || '00';
    const texasToday = `${datePart('year')}-${datePart('month')}-${datePart('day')}`;
    const cardTags = [...html.matchAll(/<li\b[^>]*\bdata-fall-end-date="[0-9]{4}-[0-9]{2}-[0-9]{2}"[^>]*>/gi)].map((match) => match[0]);
    assert(cardTags.length === count, `fall festival SSR card count ${cardTags.length} must match ${count} qualifying guides`);
    for (const tag of cardTags) {
      const end = tag.match(/data-fall-end-date="([^"]+)"/i)?.[1];
      const name = decodeHtmlEntities(tag.match(/data-fall-name="([^"]+)"/i)?.[1] || '');
      assert(end && end >= texasToday, `expired fall festival card still shown: ${name} (${end})`);
      assert(!/(christmas|holiday|hollydays|home for the holidays|polar express|santa|nutcracker|zoo lights|ice land|dickens|south pole|wild bright|thanksgiving day parade)/i.test(name), `winter or Christmas event leaked into fall collection: ${name}`);
    }
    console.log(`[fall freshness] ${cardTags.length} unexpired, seasonally relevant SSR cards as of ${texasToday}`);
  }
  if (collection.path === '/events/november-events') await verifyNovember2026EditorialRelease(html);
  verifyCollectionSchema(html, collection.label);
  console.log(`[${collection.label}] ${count} guides; ${shouldIndex ? 'indexable/in sitemap' : 'noindex/out of sitemap'} verified`);
}


function visiblePageText(html) {
  return decodeHtmlEntities(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function verifyNovember2026EditorialRelease(november) {
  // This is an exact-season guard. The permanent November URL advances to
  // November 2027 when the 2026 season ends; do not assert stale-year results.
  const texasDateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(new Date());
  const part = (type) => texasDateParts.find((entry) => entry.type === type)?.value;
  const safeToday = `${part('year')}-${part('month')}-${part('day')}`;
  if (safeToday < '2026-10-29' || safeToday > '2026-11-30') return;

  const visible = visiblePageText(november);
  assert(visible.includes('November in Texas brings Wurstfest'), 'November landing lost visitor-facing opening copy');
  assert(visible.includes('Browse November events'), 'November landing lost the filterable event directory');
  assert(!/automatically noindexes|stays indexable only|thin seasonal page/i.test(visible), 'November landing leaked technical SEO/indexing implementation language');
  for (const label of [
    'Filter November events by date',
    'Filter November events by region',
    'Filter November events by city',
    'Filter November events by category',
  ]) {
    assert(november.includes(label), `November landing lost accessible filter: ${label}`);
  }
  for (const name of [
    'ThunderCloud Subs Turkey Trot',
    'Dallas YMCA Turkey Trot',
    'Fort Worth YMCA Turkey Trot',
    'Calaveras de Azúcar Festival',
    'GM Financial Parade of Lights',
    'Texas Christkindl Market',
    'Austin Studio Tour',
  ]) {
    assert(visible.includes(name), `November landing lost organizer-confirmed event: ${name}`);
  }

  assert(visible.includes('Family activities Nov 13–15; main market Nov 18–22'), 'November A Christmas Affair split windows missing');
  assert(visible.includes('7 direct organizer listings'), 'November listing count does not include all organizer-only events');

  // Real production SSR must show one rights-reviewed photo or explicitly
  // illustrative event visual for each of the 55 November results.
  const cards = [...november.matchAll(/<li\b[^>]*\bdata-november-event-card="[^"]*"[^>]*>([\s\S]*?)<\/li>/gi)];
  const displayedCount = visible.match(/([0-9,]+) of ([0-9,]+) organizer-verified events match your filters/);
  assert(displayedCount, 'November visual acceptance requires the visible calendar results count');
  const expectedCards = Number(displayedCount[2].replace(/,/g, ''));
  assert(expectedCards >= 55, 'November event listings should retain the 55 verified opening events');
  assert(cards.length === expectedCards, 'November visual acceptance expected ' + expectedCards + ' event cards; received ' + cards.length);
  let editorialCount = 0;
  let photoCount = 0;
  for (const [index, card] of cards.entries()) {
    const visuals = [...card[1].matchAll(/\bdata-event-visual="(editorial|photograph)"/g)].map((match) => match[1]);
    assert(visuals.length === 1, 'November card ' + (index + 1) + ' needs exactly one valid visual; got ' + visuals.length);
    if (visuals[0] === 'editorial') {
      editorialCount += 1;
      assert(card[1].includes('not event photography'), 'November card ' + (index + 1) + ' illustration must disclose its nature');
    } else {
      photoCount += 1;
      assert(/<img\b[^>]*\balt="[^"]+"/i.test(card[1]), 'November card ' + (index + 1) + ' source photograph requires alt text');
    }
  }
  assert(editorialCount + photoCount === expectedCards, 'Every November listing needs a visual');
  console.log('[November imagery] ' + cards.length + '/' + expectedCards + ' visual cards: ' + photoCount + ' existing event images, ' + editorialCount + ' disclosed editorial illustrations');


  const lights = await fetchProduction('/event/johnson-city-christmas-lights-spectacular', 'Johnson City lights 2026 guide');
  const johnsonText = visiblePageText(lights);
  assert(johnsonText.includes('November 27, 2026') && johnsonText.includes('January 3, 2027'), 'Johnson City event dates reverted from organizer-confirmed season');
  assert(!/2026[–-]27\\s+2026/.test(lights), 'Johnson City SEO title repeats 2026');
  assert(lights.includes('https://lightsspectacular.com/faqs'), 'Johnson City organizer source missing');

  const south = await fetchProduction('/event/south-pole-illuminated-festival', 'South Pole lights 2026 guide');
  const southText = visiblePageText(south);
  assert(southText.includes('November 28') && southText.includes('December 28, 2026'), 'South Pole guide lost organizer season dates');
  assert(south.includes('https://www.southpoleoftexas.com/'), 'South Pole organizer source missing');
  assert(!south.includes('<strong>2026-11-27</strong>'), 'South Pole guide promotes pre-opening Ticketmaster admission');
  console.log('[November 2026 editorial] verified current organizer seasons, SEO title, new filters, and four first-party event additions');
}

async function verifyAlwaysNoindexCurrentMonth(sitemap) {
  const path = '/events/this-month';
  const html = await fetchProduction(path, 'events this month');
  assert(canonicalHref(html) === `${origin}${path}`, `events this month canonical must be ${origin}${path}`);
  assert(hasNoindex(html), 'events this month must always remain noindex');
  assert(!sitemap.includes(`<loc>${origin}${path}</loc>`), 'events this month must stay out of sitemap.xml');
  assert(decodeHtmlEntities(html).includes('Current verified window:'), 'events this month must expose its current rolling month window');
  parseVerifiedGuideCount(html, 'events this month');
  verifyCollectionSchema(html, 'events this month');
  console.log('[events this month] permanent noindex/out-of-sitemap contract verified');
}

async function main() {
  const sitemap = await fetchProduction('/sitemap.xml', 'events sitemap');
  assert(!sitemap.includes('/events/events/'), 'sitemap.xml must not contain duplicated /events/events/ routes');
  await verifyAlwaysNoindexCurrentMonth(sitemap);
  for (const collection of collections) await verifyDynamicCollection(collection, sitemap);
  console.log(`Verified ${collections.length + 1} temporal event production collections against canonical, robots, sitemap and schema contracts.`);
}

await main();
