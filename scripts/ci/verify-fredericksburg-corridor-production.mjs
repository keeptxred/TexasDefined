import { appendFileSync } from 'node:fs';

const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const sha = process.env.GITHUB_SHA ?? 'local';
const run = process.env.GITHUB_RUN_ID ?? 'local';
const article = '/article/fredericksburg-johnson-city-historic-road-trip';
const canonical = '/destination/lyndon-b-johnson-state-park-historic-site';
const aliases = [
  '/destination/lyndon-b-johnson-state-park-and-historic-site',
  '/destination/lyndon-b-johnson-state-park-state-historic-site',
  '/historic-site/lyndon-b-johnson-state-park-state-historic-site',
];
const itineraryLinks = [
  '/destination/fredericksburg',
  '/destination/fredericksburg-historic-district',
  '/destination/national-museum-pacific-war',
  '/destination/fort-martin-scott',
  '/destination/fredericksburg-art-guild',
  '/destination/stonewall',
  canonical,
  '/destination/lyndon-b-johnson-national-historical-park',
  '/destination/hye',
  '/destination/luckenbach',
  '/destination/johnson-city',
  '/destination/lbj-boyhood-home-johnson-city',
  '/destination/science-mill-johnson-city',
  '/article/fredericksburg-history-weekend-guide',
  '/county/gillespie',
  '/county/blanco',
];

// Exact, documented photo-source links are part of the seven-page editorial trust contract.
// This is intentionally separate from the more general 16-destination backlink network.
const photoRightsLinks = {
  [article]: [
    'https://commons.wikimedia.org/wiki/File:Lyndon_B._Johnson_Ranch_October_2020_28_(Texas_White_House).jpg',
    'https://creativecommons.org/licenses/by-sa/4.0/',
  ],
  '/destination/fredericksburg-art-guild': [
    'https://commons.wikimedia.org/wiki/File:Fredericksburg_July_2017_5_(Marktplatz).jpg',
    'https://creativecommons.org/licenses/by-sa/4.0/',
  ],
  '/destination/luckenbach': [
    'https://commons.wikimedia.org/wiki/File:Luckenbach_Dance_Hall_(48523152961).jpg',
    'https://creativecommons.org/licenses/by/2.0/',
  ],
  '/destination/stonewall': [
    'https://commons.wikimedia.org/wiki/File:Texas_longhorn.jpg',
    'https://creativecommons.org/licenses/by/4.0/',
  ],
  '/destination/fort-martin-scott': [
    'https://commons.wikimedia.org/wiki/File:Fort_martin_scott_2008.jpg',
    'https://creativecommons.org/licenses/by/4.0/',
  ],
  [canonical]: [
    'https://commons.wikimedia.org/wiki/File:Texas_longhorn.jpg',
    'https://creativecommons.org/licenses/by/4.0/',
  ],
  '/destination/lyndon-b-johnson-national-historical-park': [
    'https://commons.wikimedia.org/wiki/File:Views_at_Lyndon_B._Johnson_National_Historical_Park,_Texas_(5a734466-55b3-4ceb-a58d-c90a5d01536c).jpg',
    'https://www.nps.gov/lyjo/learn/photosmultimedia/index.htm',
  ],
};

function checkVisiblePhotoRights(path, body) {
  const links = photoRightsLinks[path];
  if (!links) return;
  for (const href of links) {
    assert(body.includes(`href="${href}"`), 'Missing exact visible photo source/license link for ' + path + ': ' + href);
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const header = { 'cache-control': 'no-cache, no-store', pragma: 'no-cache', 'user-agent': 'TexasDefined-CI-Fredericksburg-Corridor/1.0' };

async function responseFor(path, manual = false) {
  const url = new URL(path, origin);
  url.searchParams.set('corridor_verify', `${sha}-${run}`);
  const response = await fetch(url, {
    redirect: manual ? 'manual' : 'follow',
    headers: header,
    cache: 'no-store',
    signal: AbortSignal.timeout(30_000),
  });
  if (response.headers.get('cf-mitigated') === 'challenge') throw new Error(path + ' encountered a Cloudflare challenge');
  return response;
}

function assert(condition, label) {
  if (!condition) throw new Error(label);
}

async function verify() {
  const page = await responseFor(canonical);
  const html = await page.text();
  assert(page.status === 200, 'Canonical LBJ State Park must return HTTP 200 (got ' + page.status + ')');
  assert(html.includes(`<link rel="canonical" href="${origin}${canonical}"`), 'LBJ State Park must have its exact self-canonical URL');
  const head = html.slice(0, html.indexOf('</head>') + 7 || 18000);
  const robots = head.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  const googlebot = head.match(/<meta name="googlebot" content="([^"]+)"/)?.[1] ?? '';
  assert(robots.startsWith('index, follow') && !googlebot.includes('noindex'), 'LBJ State Park must be indexable for robots and Googlebot');
  assert(html.includes('Sauer-Beckmann') && html.includes('/article/fredericksburg-johnson-city-historic-road-trip'), 'Canonical page must contain living-history guidance and reciprocal itinerary link');
  // The head also contains ItemList schema for *related* destinations; some legitimately
  // use generic image placeholders. Validate the canonical page's primary image itself,
  // not arbitrary images appearing anywhere in its related-place structured data.
  const expectedHero = new URL('/images/explore/historic-sites/lyndon-b-johnson-state-park-historic-site.jpg', origin).toString();
  const ogHero = head.match(/<meta property="og:image" content="([^"]+)"\s*\/>/)?.[1] ?? '';
  assert(ogHero === expectedHero, 'Canonical primary og:image must use the exact credited LBJ State Park photograph; got ' + ogHero);
  assert(head.includes('<link rel="preload" as="image" href="/images/explore/historic-sites/lyndon-b-johnson-state-park-historic-site.jpg"'), 'Canonical document must preload its exact LBJ State Park photograph');
  assert(!ogHero.includes('texasdefined-destination-placeholder.svg'), 'Canonical primary photograph must not be a placeholder');

  for (const path of aliases) {
    const response = await responseFor(path, true);
    const location = response.headers.get('location') ?? '';
    assert(response.status === 301, path + ' expected live HTTP 301; got ' + response.status);
    assert(new URL(location, origin).pathname === canonical, path + ' has wrong redirect destination: ' + location);
    console.log('[corridor] live HTTP 301 ' + path + ' -> ' + canonical);
  }

  const articleResponse = await responseFor(article);
  const articleHtml = await articleResponse.text();
  assert(articleResponse.status === 200, 'Published itinerary must return HTTP 200');
  assert(articleHtml.includes('Fredericksburg to Johnson City: The Complete Historic Hill Country Road Trip'), 'Published itinerary must include its researched title');
  checkVisiblePhotoRights(article, articleHtml);
  const missing = itineraryLinks.filter((path) => !articleHtml.includes(`href="${path}"`));
  assert(missing.length === 0, 'Published itinerary missing link anchors: ' + missing.join(', '));

  for (const path of itineraryLinks) {
    const response = await responseFor(path);
    assert(response.status === 200, 'Corridor link ' + path + ' returned ' + response.status);
    const body = await response.text();
    const routeHead = body.slice(0, body.indexOf('</head>') + 7);
    assert(routeHead.includes(`<link rel="canonical" href="${origin}${path}"`), 'Missing exact live self-canonical for corridor target ' + path);
    assert(routeHead.includes('<meta name="robots" content="index, follow'), 'Unexpected noindex on published corridor target ' + path);
    assert(body.includes(`href="${article}"`), 'Missing live reciprocal itinerary anchor on ' + path);
    checkVisiblePhotoRights(path, body);
  }

  const sitemap = await responseFor('/sitemap-explore.xml');
  const xml = await sitemap.text();
  assert(sitemap.status === 200 && xml.includes('<urlset'), 'Explore sitemap must be live XML');
  assert(xml.includes(`<loc>${origin}${canonical}</loc>`), 'Indexable canonical LBJ State Park is absent from live Explore sitemap');
  assert(aliases.every((path) => !xml.includes(`<loc>${origin}${path}</loc>`)), 'A retired State Park alias leaked into Explore sitemap');

  console.log('[corridor] Live SEO, 3 HTTP 301 redirects, 16 outbound + reciprocal anchors, 7 photo source/rights pairs, and sitemap acceptance passed.');
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, '| ✅ pass | Fredericksburg corridor | canonical indexable + 3 live HTTP 301 + 16 bidirectional links + sitemap |\n');
  }
}

let lastError;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    await verify();
    lastError = null;
    break;
  } catch (error) {
    lastError = error;
    console.error('[corridor] live verification attempt ' + attempt + ' failed: ' + (error?.message ?? error));
    if (attempt < 3) await sleep(4_000);
  }
}
if (lastError) {
  console.error('::error title=Fredericksburg corridor production verification::' + lastError.message);
  process.exitCode = 1;
}
