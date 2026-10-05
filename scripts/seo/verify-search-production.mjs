const ORIGIN = 'https://texasdefined.com';
const KEY = '0c2b08423ce5be707dd931f57239acf1';
const SITEMAPS = ['/sitemap.xml', '/sitemap-explore.xml', '/sitemap-texas-icons.xml'];
const USER_AGENTS = [
  'Googlebot/2.1 (+http://www.google.com/bot.html)',
  'bingbot/2.0 (+http://www.bing.com/bingbot.htm)',
  'Applebot/0.1',
  'DuckDuckBot/1.0; (+http://duckduckgo.com/duckduckbot.html)',
  'OAI-SearchBot/1.0; +https://openai.com/searchbot',
  'Mozilla/5.0 (compatible; TexasDefinedAnonymousCrawler/1.0)',
];

const challengePattern = /cf-chl|just a moment|attention required|captcha|access denied/i;
const trackingPattern = /[?&](?:utm_[^=]*|ref|fbclid|gclid|msclkid)=/i;

async function fetchResponse(url, userAgent, redirect = 'manual') {
  return fetch(url, {
    redirect,
    headers: { 'user-agent': userAgent, accept: 'text/html,application/xml,text/xml,text/css,application/javascript,image/*,*/*;q=0.5', 'cache-control': 'no-cache' },
    signal: AbortSignal.timeout(20_000),
  });
}

function decodeXml(value) {
  return value.replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&apos;', "'");
}

function assertCanonicalUrl(raw, source) {
  const url = new URL(raw);
  if (url.origin !== ORIGIN) throw new Error(`${source} contains off-origin URL ${raw}`);
  if (url.search || url.hash || trackingPattern.test(raw)) throw new Error(`${source} contains parameter/fragment URL ${raw}`);
  if (url.href !== raw) throw new Error(`${source} contains non-normalized URL ${raw}`);
}

async function loadSitemap(path) {
  const response = await fetchResponse(`${ORIGIN}${path}`, USER_AGENTS[5], 'manual');
  if (response.status !== 200) throw new Error(`${path} returned HTTP ${response.status}`);
  const xml = await response.text();
  const urls = [...xml.matchAll(/<url>[\s\S]*?<\/url>/gi)].map((match) => {
    const loc = decodeXml(match[0].match(/<loc>([^<]+)<\/loc>/i)?.[1]?.trim() ?? '');
    const lastmod = match[0].match(/<lastmod>([^<]+)<\/lastmod>/i)?.[1]?.trim() ?? null;
    assertCanonicalUrl(loc, path);
    if (lastmod && Number.isNaN(Date.parse(lastmod))) throw new Error(`${path} has invalid lastmod for ${loc}: ${lastmod}`);
    return { url: loc, lastmod };
  });
  if (!urls.length) throw new Error(`${path} contains no URL entries`);
  const duplicates = urls.map((entry) => entry.url).filter((url, index, all) => all.indexOf(url) !== index);
  if (duplicates.length) throw new Error(`${path} contains duplicate canonical URLs`);
  return urls;
}

function chooseRepresentatives(entries) {
  const urls = entries.map((entry) => entry.url);
  const families = [
    '/destination/', '/article/', '/events', '/guides', '/county/', '/fishing/',
    '/property-tax/', '/data/', '/school/', '/high-school-football/', '/explore/',
  ];
  const chosen = new Set([`${ORIGIN}/`]);
  for (const family of families) {
    const match = urls.find((url) => new URL(url).pathname.startsWith(family));
    if (match) chosen.add(match);
  }
  for (const url of urls.slice(0, 5)) chosen.add(url);
  return [...chosen].slice(0, 18);
}

async function verifyHtml(url, userAgent) {
  const response = await fetchResponse(url, userAgent, 'manual');
  if (response.status !== 200) throw new Error(`${url} returned HTTP ${response.status} to ${userAgent}`);
  const type = response.headers.get('content-type') ?? '';
  if (!type.includes('text/html')) throw new Error(`${url} returned non-HTML content to ${userAgent}: ${type}`);
  if (/noindex/i.test(response.headers.get('x-robots-tag') ?? '')) throw new Error(`${url} sends X-Robots-Tag noindex`);
  const html = await response.text();
  if (challengePattern.test(html.slice(0, 6000))) throw new Error(`${url} appears blocked/challenged for ${userAgent}`);
  if (/<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html)) throw new Error(`${url} contains meta robots noindex`);
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
  if (!canonical) throw new Error(`${url} is missing a canonical link`);
  const cleanExpected = new URL(url); cleanExpected.search = ''; cleanExpected.hash = '';
  if (new URL(canonical, ORIGIN).href !== cleanExpected.href) throw new Error(`${url} canonical mismatch: ${canonical}`);
  const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (visibleText.length < 300) throw new Error(`${url} exposes too little primary HTML content to ${userAgent}`);
  return html;
}

async function verifyAsset(html, pattern, label) {
  const raw = html.match(pattern)?.[1];
  if (!raw) return;
  const url = new URL(raw, ORIGIN);
  if (url.origin !== ORIGIN) return;
  for (const userAgent of USER_AGENTS) {
    const response = await fetchResponse(url.href, userAgent, 'follow');
    if (response.status >= 400) throw new Error(`${label} ${url.href} returned HTTP ${response.status} to ${userAgent}`);
  }
}

const robots = await fetchResponse(`${ORIGIN}/robots.txt`, USER_AGENTS[5], 'manual');
if (robots.status !== 200) throw new Error(`robots.txt returned HTTP ${robots.status}`);
const robotsText = await robots.text();
for (const token of ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'OAI-SearchBot', `Sitemap: ${ORIGIN}/sitemap.xml`]) {
  if (!robotsText.includes(token)) throw new Error(`robots.txt missing ${token}`);
}

const keyResponse = await fetchResponse(`${ORIGIN}/${KEY}.txt`, USER_AGENTS[5], 'manual');
if (keyResponse.status !== 200 || (await keyResponse.text()).trim() !== KEY) throw new Error('Public IndexNow key verification failed.');

const sitemapEntries = (await Promise.all(SITEMAPS.map(loadSitemap))).flat();
const representatives = chooseRepresentatives(sitemapEntries);

for (const userAgent of USER_AGENTS) {
  for (const url of representatives.slice(0, 4)) await verifyHtml(url, userAgent);
}
for (const url of representatives) await verifyHtml(url, USER_AGENTS[5]);
const homepageHtml = await verifyHtml(`${ORIGIN}/`, USER_AGENTS[5]);
await verifyAsset(homepageHtml, /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/i, 'CSS');
await verifyAsset(homepageHtml, /<script[^>]+src=["']([^"']+)["']/i, 'JavaScript');
await verifyAsset(homepageHtml, /<img[^>]+src=["']([^"']+)["']/i, 'Image');

console.log(`TexasDefined production search verification passed: ${sitemapEntries.length} canonical sitemap entries checked structurally; ${representatives.length} representative template URLs verified; Googlebot, Bingbot, Applebot, DuckDuckBot, OAI-SearchBot and anonymous crawler HTTP access passed; required rendering assets are reachable.`);
