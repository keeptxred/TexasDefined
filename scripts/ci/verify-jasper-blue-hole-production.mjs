const ORIGIN = 'https://texasdefined.com';
const ARTICLE_PATH = '/article/blue-hole-jasper-county-east-texas';
const COUNTY_PATH = '/county/jasper';
const DESTINATION_PATH = '/destination/jasper';
const SITEMAP_PATH = '/sitemap.xml';

async function fetchText(path, expectedType) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const response = await fetch(`${ORIGIN}${path}`, {
      redirect: 'error',
      signal: controller.signal,
      headers: { 'user-agent': 'TexasDefined-Jasper-Blue-Hole-Production/1.0' },
    });
    if (response.status !== 200) throw new Error(`${path} returned HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') ?? '';
    if (!expectedType.test(contentType)) {
      throw new Error(`${path} returned unexpected Content-Type ${JSON.stringify(contentType)}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function requireText(body, needle, label) {
  if (!body.includes(needle)) throw new Error(`${label} missing ${JSON.stringify(needle)}`);
}

const article = await fetchText(ARTICLE_PATH, /text\/html/i);
requireText(article, 'The Blue Hole in East Texas', 'Blue Hole article');
requireText(article, ARTICLE_PATH, 'Blue Hole article canonical/discovery surface');

const county = await fetchText(COUNTY_PATH, /text\/html/i);
requireText(county, ARTICLE_PATH, 'Jasper County page');

const destination = await fetchText(DESTINATION_PATH, /text\/html/i);
requireText(destination, ARTICLE_PATH, 'Jasper destination page');

const sitemap = await fetchText(SITEMAP_PATH, /application\/(?:xml|[a-z0-9.+-]+\+xml)|text\/xml/i);
requireText(sitemap, `<loc>${ORIGIN}${ARTICLE_PATH}</loc>`, 'Primary sitemap');

console.log('Jasper Blue Hole production verification passed: article, county link, destination link and sitemap entry are live.');
