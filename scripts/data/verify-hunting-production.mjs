import assert from 'node:assert/strict';
import fs from 'node:fs';

const speciesSeasons = JSON.parse(fs.readFileSync('src/data/hunting/species-season-calendar.json', 'utf8'));
const deerSeasons = JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json', 'utf8'));
const quarterlyCheckedAt = JSON.parse(fs.readFileSync('src/data/hunting/turkey-quarterly-facts.json', 'utf8')).checkedAt;
const freshnessFile = fs.readFileSync('src/data/hunting/freshness.ts', 'utf8');
const reviewedLabel = /lastVerifiedLabel:\s*"([^"]+)"/.exec(freshnessFile)?.[1];
const editorialLabel = /editorialUpdatedLabel:\s*"([^"]+)"/.exec(freshnessFile)?.[1];
const deerEditorialReviewed = /reviewedOn:\s*"([^"]+)"/.exec(fs.readFileSync('src/data/hunting/authority-deer.ts', 'utf8'))?.[1];
if (!/^20\d\d-\d\d-\d\d$/.test(deerEditorialReviewed ?? '')) throw new Error('Missing trustworthy deer editorial modified date');
const deerEditorialDateLabel = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' })
  .format(new Date(deerEditorialReviewed + 'T12:00:00Z'));
if (!reviewedLabel || !editorialLabel) throw new Error('Hunting production smoke lacks dated official and editorial markers');
function deerDate(id, edge) {
  const row = deerSeasons.rows.find((item) => item.id === id);
  if (!row || !row[edge]) throw new Error('Missing verified deer season date: ' + id + '.' + edge);
  const date = new Date(row[edge] + 'T12:00:00Z');
  return new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' })
    .format(date).replace(/^(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec) /, '$1. ');
}

const origin = (process.env.TEXASDEFINED_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const userAgent = 'TexasDefined-Hunting-Production-Smoke/3.1';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const cacheBypass = process.env.GITHUB_SHA || Date.now().toString(36);

const representativeTopics = [
  {
    path: '/hunting/public-hunting',
    needles: ['Where Can You Hunt on Public Land in Texas?', 'TPWD season source', 'Texas Parks and Wildlife', 'Current official sources'],
  },
  {
    path: '/hunting/texas-hunting-license',
    needles: ['Texas Hunting License Guide', 'TPWD season source', 'Texas Parks and Wildlife', 'Current official sources'],
  },
  {
    path: '/hunting/texas-deer-hunting',
    needles: ['Texas White-Tailed Deer Hunting Guide', 'Texas white-tailed deer hunting dates', deerDate('generalNorth', 'start'), deerDate('generalSouth', 'end'), 'Chronic wasting disease: testing and carcass movement', 'TPWD season source', 'Texas Parks and Wildlife', 'Current official sources'],
  },
  {
    path: '/hunting/turkey-hunting',
    needles: ['Texas Turkey Hunting: 2026–27 Seasons, Regulations & Where to Hunt', 'Official 2026–27 wild turkey season dates', 'Matagorda and Wharton', 'No unbearded hens', 'National Refuge Spring Turkey drawings', 'Two verified 2027 public turkey draw opportunities', 'Find walk-in turkey hunting where it is actually legal', 'Using TPWD turkey harvest numbers responsibly', 'TPWD legal-game and property finder', 'TPWD draw and survey data machine-checked ' + quarterlyCheckedAt, 'Machine-checked ' + quarterlyCheckedAt, 'Current official sources'],
  },
  {
    path: '/hunting/youth-hunting',
    needles: ['Texas Youth Hunting Guide:', 'Season calendar', 'Youth hunting FAQs', 'Official regulations and updates'],
  },
  {
    path: '/hunting/mule-deer',
    needles: ['Texas Mule Deer Hunting Guide', 'TPWD ' + speciesSeasons.seasonYear + ' season dates', 'Panhandle', 'Trans-Pecos', 'View the official TPWD source calendar'],
  },
  {
    path: '/hunting/squirrel-hunting',
    needles: ['Texas Squirrel Hunting Guide', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/migratory-game-birds',
    needles: ['Texas Migratory Game Bird Hunting Guide', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/alligator-hunting',
    needles: ['Texas Alligator Hunting Guide', 'private property', 'TPWD season source', 'Current official sources'],
  },
  {
    path: '/hunting/trapping-furbearers',
    needles: ['Texas Trapping & Fur-Bearer Guide', 'commercial harvest for sale', 'TPWD season source', 'Current official sources'],
  },
];

const sitemapPaths = [
  '/hunting',
  ...representativeTopics.map(({ path }) => path),
  '/hunting/rabbit-hare-hunting',
  '/hunting/pheasant-hunting',
  '/hunting/chachalaca-hunting',
  '/hunting/pronghorn-hunting',
  '/hunting/goose-hunting',
  '/hunting/teal-hunting',
  '/hunting/sandhill-crane-hunting',
  '/hunting/other-migratory-game-birds',
];

function assertNulsOnlyInsideScripts(text, pathname) {
  let index = text.indexOf('\0');
  let count = 0;
  while (index !== -1) {
    count += 1;
    const scriptStart = text.lastIndexOf('<script', index);
    const scriptEndBefore = text.lastIndexOf('</script>', index);
    const scriptEndAfter = text.indexOf('</script>', index);
    if (scriptStart === -1 || scriptStart < scriptEndBefore || scriptEndAfter === -1) {
      throw new Error(`${pathname} contains a NUL byte outside a script block at decoded offset ${index}`);
    }
    index = text.indexOf('\0', index + 1);
  }
  return count;
}

function decodeHtmlEntities(text) {
  return text.replace(/&(#(?:x[0-9a-f]+|\d+)|amp|lt|gt|quot|apos);/gi, (match, entity) => {
    const normalized = entity.toLowerCase();
    if (normalized === 'amp') return '&';
    if (normalized === 'lt') return '<';
    if (normalized === 'gt') return '>';
    if (normalized === 'quot') return '"';
    if (normalized === 'apos') return "'";
    const codePoint = normalized.startsWith('#x')
      ? Number.parseInt(normalized.slice(2), 16)
      : Number.parseInt(normalized.slice(1), 10);
    if (!Number.isFinite(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return match;
    try {
      return String.fromCodePoint(codePoint);
    } catch {
      return match;
    }
  });
}

function extractVisibleText(html) {
  const withoutNonVisibleContent = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ');
  return decodeHtmlEntities(withoutNonVisibleContent).replace(/\s+/g, ' ').trim();
}

// React's complete descriptive alt text continues after "buck". Match the
// entire image tag and a prefix-safe ALT ATTRIBUTE, not a falsely closed string.
function findDeerHeroImageTag(html) {
  return [...html.matchAll(/<img\b[^>]*>/gi)]
    .map((match) => match[0])
    .find((tag) => /\balt="Close view of a white-tailed buck[^"]*"/i.test(tag)) ?? null;
}

if (process.argv.includes('--self-test')) {
  const fullAlt = '<img src="/white-tail.jpg" width="1000" alt="Close view of a white-tailed buck standing in tall grass" loading="eager" fetchpriority="high">';
  const reordered = '<IMG loading="eager" ALT="Close view of a white-tailed buck standing in tall grass" fetchPriority="high" src="/white-tail.jpg">';
  assert.equal(findDeerHeroImageTag(fullAlt), fullAlt);
  assert.equal(findDeerHeroImageTag(reordered), reordered);
  assert.equal(findDeerHeroImageTag('<img alt="White-tail in grass" loading="lazy">'), null);
  assert.equal(findDeerHeroImageTag('<script>alt="Close view of a white-tailed buck"</script>'), null);
  console.log('Deer full descriptive ALT image extraction contract passed offline.');
  process.exit(0);
}

async function fetchDocument(pathname, cacheBust = true, rawHtml = false) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const url = pathname.endsWith('.xml') || !cacheBust ? origin + pathname : origin + pathname + '?hunting-smoke=' + encodeURIComponent(cacheBypass);
      const response = await fetch(url, {
        headers: {
          'user-agent': userAgent,
          accept: pathname.endsWith('.xml') ? 'application/xml,text/xml;q=0.9,*/*;q=0.8' : 'text/html,*/*;q=0.8',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error(`${pathname} returned ${response.status}`);

      const contentType = response.headers.get('content-type') ?? '';
      const text = await response.text();

      if (pathname.endsWith('.xml')) {
        if (!contentType.toLowerCase().includes('xml')) throw new Error(`${pathname} returned unexpected content type ${contentType || '(missing)'}`);
        if (!text.includes('<?xml') && !text.includes('<urlset')) throw new Error(`${pathname} did not decode as XML`);
        return text;
      }

      if (!contentType.toLowerCase().includes('text/html')) throw new Error(`${pathname} returned unexpected content type ${contentType || '(missing)'}`);
      if (!text.trimStart().startsWith('<!DOCTYPE html>')) throw new Error(`${pathname} did not decode as an HTML document`);

      const nulCount = assertNulsOnlyInsideScripts(text, pathname);
      if (nulCount) console.log(`${pathname}: accepted ${nulCount} framework serialization NUL delimiter(s), all confined to script blocks.`);
      return rawHtml ? text : extractVisibleText(text);
    } catch (error) {
      lastError = error;
      if (attempt < 2) await sleep(1_500);
    }
  }
  throw lastError instanceof Error ? lastError : new Error(`Failed to fetch ${pathname}`);
}

function visibleExcerpt(body) {
  const hints = ['TPWD', 'Texas Parks', 'Quick answer', 'Public-land discovery', 'Verify with TPWD', 'Current official'];
  const found = hints.map((hint) => body.indexOf(hint)).filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, found - 220);
  const end = Math.min(body.length, found + 1400);
  return body.slice(start, end);
}

function requireText(body, needle, label) {
  if (!body.includes(needle)) {
    throw new Error(`${label} missing expected rendered text: ${needle}\nVisible excerpt: ${visibleExcerpt(body)}`);
  }
}

async function verify() {
  const [hub, sitemap, ...topicBodies] = await Promise.all([
    fetchDocument('/hunting'),
    fetchDocument('/sitemap.xml'),
    ...representativeTopics.map(({ path }) => fetchDocument(path)),
  ]);

  requireText(hub, 'Hunting Texas: licenses, public land, species and season planning', 'Hunting hub');
  requireText(hub, 'Texas Parks and Wildlife', 'Hunting hub');
  requireText(hub, 'TPWD 2026–27', 'Hunting hub');
  requireText(hub, 'not the legal authority', 'Hunting hub');
  requireText(hub, 'More Texas game & small-game coverage', 'Hunting v2 hub');
  requireText(hub, 'Migratory game bird depth', 'Hunting v2 hub');
  requireText(hub, 'Fur-bearing animals & trapping', 'Hunting v2 hub');
  requireText(hub, 'Texas Squirrel Hunting Guide', 'Hunting v2 hub');
  requireText(hub, 'Texas Trapping & Fur-Bearer Guide', 'Hunting v2 hub');
  requireText(hub, 'Four decisions before choosing a hunting spot', 'Hunting hub');
  requireText(hub, 'TPWD hunting area finder', 'Hunting hub');
  requireText(hub, '2026–27 regulation changes', 'Hunting hub');
  requireText(hub, 'Source review ' + reviewedLabel, 'Hunting hub');
  requireText(hub, 'Editorial hub updated ' + editorialLabel, 'Hunting hub');
  requireText(hub, 'Texas hunting season planner', 'Hunting hub');
  requireText(hub, 'Species or game category', 'Hunting hub');
  requireText(hub, 'White-tailed deer', 'Hunting hub');

  representativeTopics.forEach((topic, index) => {
    const visibleText = topicBodies[index];
    for (const needle of topic.needles) requireText(visibleText, needle, topic.path);
  });

  // A successful query-string response alone can hide an older cached visitor page.
  // Re-check only the exact canonical turkey URL to keep the release probe bounded.
  const turkeyVisitorText = await fetchDocument('/hunting/turkey-hunting', false);
  const turkeyContract = representativeTopics.find((topic) => topic.path === '/hunting/turkey-hunting');
  for (const marker of turkeyContract.needles) requireText(turkeyVisitorText, marker, 'Canonical turkey visitor page');

  for (const path of sitemapPaths) requireText(sitemap, `${origin}${path}`, 'Production sitemap');

  // This URL is updated on a separate editorial clock from the TPWD data snapshot.
  // Assert the single exact live sitemap entry rather than mere URL presence.
  const deerEntry = '<url><loc>https://texasdefined.com/hunting/texas-deer-hunting</loc><lastmod>' + deerEditorialReviewed + '</lastmod></url>';
  const deerLocation = '<loc>https://texasdefined.com/hunting/texas-deer-hunting</loc>';
  if (sitemap.split(deerLocation).length !== 2) throw new Error('Deer sitemap canonical must appear exactly once');
  requireText(sitemap, deerEntry, 'Exact deer editorial sitemap lastmod');

  // Require both the cache-bypassed Worker and the exact visitor URL. Cloudflare
  // HTML cache can otherwise hide a stale canonical page behind a fresh query.
  const deerHtml = await fetchDocument('/hunting/texas-deer-hunting', true, true);
  const hero = findDeerHeroImageTag(deerHtml);
  if (!hero) throw new Error('Source-attributed deer hero is missing from server-rendered HTML');
  requireText(hero.toLowerCase(), 'loading="eager"', 'Deer LCP image priority');
  requireText(hero.toLowerCase(), 'fetchpriority="high"', 'Deer LCP image high priority');
  if (/loading="lazy"/i.test(hero)) throw new Error('Near-top deer photo cannot be lazy-loaded');
  // The editorial date is independently governed. Worked 2026–27 county cases
  // deliberately disappear at the next calendar rollover until re-researched.
  const requiredDeerMarkers = [
    'Guide reviewed ' + deerEditorialDateLabel,
    ...(deerSeasons.startYear === 2026 ? [
      'Same November weekend, three different county rulebooks',
      'Grayson County', 'Washington County', 'Gillespie County',
      'Read the claim-by-claim source record', 'within 48 hours',
    ] : []),
  ];
  for (const marker of requiredDeerMarkers) {
    requireText(extractVisibleText(deerHtml), marker, 'Revised deer authority source comparison');
  }
  const canonicalDeerHtml = await fetchDocument('/hunting/texas-deer-hunting', false, true);
  for (const marker of requiredDeerMarkers) {
    requireText(extractVisibleText(canonicalDeerHtml), marker, 'Exact canonical deer visitor page');
  }
  if (deerSeasons.startYear === 2026) {
  // Verify the reader-facing claim ledger points to original TPWD witnesses,
  // not merely that the three county names appear in generic page text.
  // Check both the uncached Worker view and the exact canonical visitor URL.
  for (const [county, url] of [
    ['Grayson', 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/grayson'],
    ['Washington', 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/washington'],
    ['Gillespie', 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/gillespie'],
  ]) {
    for (const [label, document] of [['cache-bypassed', deerHtml], ['canonical', canonicalDeerHtml]]) {
      requireText(document, 'href="' + url + '"', label + ' TPWD ' + county + ' source link');
    }
  }
  for (const [label, document] of [['cache-bypassed', deerHtml], ['canonical', canonicalDeerHtml]]) {
    requireText(document, 'id="deer-source-record"', label + ' visible claim-level source ledger');
    requireText(document, 'href="#deer-source-record"', label + ' claim-level source navigation');
    requireText(document, 'href="https://tpwd.texas.gov/regulations/outdoor-annual/hunting/cwd"', label + ' official CWD source');
  }

  }

  const canonicalHero = findDeerHeroImageTag(canonicalDeerHtml);
  if (!canonicalHero || /loading="lazy"/i.test(canonicalHero) ||
    !/loading="eager"/i.test(canonicalHero) || !/fetchpriority="high"/i.test(canonicalHero)) {
    throw new Error('Exact canonical deer visitor hero lacks eager/high-priority LCP treatment');
  }


  console.log(`Hunting production verified: live HTML document envelopes, framework NUL delimiters confined to script serialization, exact rendered visible text for the hub and ${representativeTopics.length} representative topic pages including v2 coverage, TPWD 2026–27 freshness, and ${sitemapPaths.length} hunting sitemap URLs.`);
}

try {
  await verify();
} catch (error) {
  console.error('Hunting production verification failed.');
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
}
