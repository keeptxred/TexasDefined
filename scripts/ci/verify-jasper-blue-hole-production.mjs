const ORIGIN = 'https://texasdefined.com';
const ARTICLE_PATH = '/article/blue-hole-jasper-county-east-texas';
const COUNTY_PATH = '/county/jasper';
const DESTINATION_PATH = '/destination/jasper';
const SITEMAP_PATH = '/sitemap.xml';
const ALLOWED_HOSTS = new Set(['texasdefined.com', 'www.texasdefined.com']);
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const MAX_REDIRECTS = 5;

async function fetchText(path, expectedType) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  let currentUrl = new URL(path, ORIGIN);

  try {
    for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
      const response = await fetch(currentUrl, {
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'user-agent': 'TexasDefined-Jasper-Blue-Hole-Production/1.0' },
      });

      if (REDIRECT_STATUSES.has(response.status)) {
        const location = response.headers.get('location');
        if (!location) throw new Error(`${path} returned HTTP ${response.status} without a Location header`);
        const nextUrl = new URL(location, currentUrl);
        if (nextUrl.protocol !== 'https:' || !ALLOWED_HOSTS.has(nextUrl.hostname)) {
          throw new Error(`${path} redirected outside the approved TexasDefined hosts to ${nextUrl.href}`);
        }
        currentUrl = nextUrl;
        continue;
      }

      if (response.status !== 200) throw new Error(`${path} returned HTTP ${response.status} at ${currentUrl.href}`);
      const contentType = response.headers.get('content-type') ?? '';
      if (!expectedType.test(contentType)) {
        throw new Error(`${path} returned unexpected Content-Type ${JSON.stringify(contentType)} at ${currentUrl.href}`);
      }
      return await response.text();
    }

    throw new Error(`${path} exceeded ${MAX_REDIRECTS} approved same-site redirects`);
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
