const origin = 'https://texasdefined.com';
const host = 'texasdefined.com';
const key = '0c2b08423ce5be707dd931f57239acf1';
const keyLocation = `${origin}/${key}.txt`;
const sitemapUrls = [`${origin}/sitemap.xml`, `${origin}/sitemap-explore.xml`];

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'TexasDefinedIndexNow/1.0' },
    redirect: 'follow',
  });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

const robots = await fetchText(`${origin}/robots.txt`);
for (const required of [
  'User-agent: Bingbot',
  'Sitemap: https://texasdefined.com/sitemap.xml',
  'Sitemap: https://texasdefined.com/sitemap-explore.xml',
]) {
  if (!robots.includes(required)) throw new Error(`robots.txt missing: ${required}`);
}

const liveKey = (await fetchText(keyLocation)).trim();
if (liveKey !== key) throw new Error('Live IndexNow ownership key does not match the configured key.');

const urls = new Set();
for (const sitemapUrl of sitemapUrls) {
  const xml = await fetchText(sitemapUrl);
  if (!xml.includes('<urlset')) throw new Error(`${sitemapUrl} is not a URL sitemap.`);
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = decodeXml(match[1].trim());
    const parsed = new URL(url);
    if (parsed.protocol === 'https:' && parsed.hostname === host) urls.add(url);
  }
}

if (urls.size === 0) throw new Error('No canonical TexasDefined URLs were found in the live sitemaps.');
if (urls.size > 10_000) throw new Error(`IndexNow batch exceeds 10,000 URLs: ${urls.size}`);

const payload = {
  host,
  key,
  keyLocation,
  urlList: [...urls].sort(),
};

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

if (![200, 202].includes(response.status)) {
  const body = await response.text();
  throw new Error(`IndexNow returned HTTP ${response.status}${body ? `: ${body}` : ''}`);
}

console.log(`IndexNow accepted ${urls.size} canonical TexasDefined URLs with HTTP ${response.status}.`);
