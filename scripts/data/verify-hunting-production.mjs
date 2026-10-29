import fs from 'node:fs';

const speciesSeasons = JSON.parse(fs.readFileSync('src/data/hunting/species-season-calendar.json', 'utf8'));
const deerSeasons = JSON.parse(fs.readFileSync('src/data/hunting/deer-season-dates.json', 'utf8'));
const freshnessFile = fs.readFileSync('src/data/hunting/freshness.ts', 'utf8');
const reviewedLabel = /lastVerifiedLabel:\s*"([^"]+)"/.exec(freshnessFile)?.[1];
const editorialLabel = /editorialUpdatedLabel:\s*"([^"]+)"/.exec(freshnessFile)?.[1];
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
    needles: ['Texas Turkey Hunting: 2026–27 Seasons, Regulations & Where to Hunt', 'Official 2026–27 wild turkey season dates', 'Matagorda and Wharton', 'No unbearded hens', 'National Refuge Spring Turkey drawings', 'Two verified 2027 public turkey draw opportunities', 'Find walk-in turkey hunting where it is actually legal', 'Using TPWD turkey harvest numbers responsibly', 'TPWD legal-game and property finder', 'Current official sources'],
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

async function fetchDocument(pathname, cacheBust = true) {
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
      return extractVisibleText(text);
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

  console.log(`Hunting production verified: live HTML document envelopes, framework NUL delimiters confined to script serialization, exact rendered visible text for the hub and ${representativeTopics.length} representative topic pages including v2 coverage, TPWD 2026–27 freshness, and ${sitemapPaths.length} hunting sitemap URLs.`);
}

try {
  await verify();
} catch (error) {
  console.error('Hunting production verification failed.');
  console.error(error instanceof Error ? error.stack : error);
  process.exit(1);
}
