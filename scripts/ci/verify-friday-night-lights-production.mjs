const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const hubPath = '/sports/friday-night-lights';
const expectedTitle = 'Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide';
const expectedDescription = 'Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning.';
const expectedCanonical = `${origin}${hubPath}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireNeedle(body, needle, label) {
  if (!body.includes(needle)) throw new Error(`${label} missing expected content: ${needle}`);
}

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&');
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    attributes[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function requireExact(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label} mismatch: expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)}`);
}

function verifySeoHead(html) {
  const titleMatch = html.match(/<title(?:\s[^>]*)?>([\s\S]*?)<\/title>/i);
  if (!titleMatch) throw new Error('hub is missing an SSR <title> element');
  requireExact(decodeHtml(titleMatch[1]).trim(), expectedTitle, 'hub title');

  const descriptionTag = (html.match(/<meta\b[^>]*>/gi) ?? [])
    .map((tag) => parseAttributes(tag))
    .find((attributes) => attributes.name?.toLowerCase() === 'description');
  if (!descriptionTag) throw new Error('hub is missing an SSR meta description');
  requireExact(descriptionTag.content ?? '', expectedDescription, 'hub meta description');

  const canonicalTag = (html.match(/<link\b[^>]*>/gi) ?? [])
    .map((tag) => parseAttributes(tag))
    .find((attributes) => attributes.rel?.toLowerCase().split(/\s+/).includes('canonical'));
  if (!canonicalTag) throw new Error('hub is missing an SSR canonical link');
  requireExact(canonicalTag.href ?? '', expectedCanonical, 'hub canonical');
}

async function fetchVerified(path, label, verify) {
  let last = { status: 'network-error', challenge: false, error: '' };
  for (let attempt = 1; attempt <= 12; attempt += 1) {
    const separator = path.includes('?') ? '&' : '?';
    const url = `${origin}${path}${separator}verify=fnl-${Date.now()}-${attempt}`;
    console.log(`[${label}] attempt ${attempt}: ${url}`);
    try {
      const response = await fetch(url, {
        redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(30_000),
        headers: { 'user-agent': 'TexasDefined-FNL-Production-Smoke/1.0' },
      });
      const body = await response.text();
      const challenge = response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge';
      last = { status: String(response.status), challenge, error: '' };

      if (response.ok && !challenge) {
        try {
          verify(body);
          return;
        } catch (error) {
          last.error = error instanceof Error ? error.message : String(error);
          console.log(`[${label}] production content not ready: ${last.error}`);
        }
      }
    } catch (error) {
      last = {
        status: 'network-error',
        challenge: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }

    if (attempt < 12) await sleep(5_000);
  }
  throw new Error(`${label} did not satisfy the production contract: status=${last.status} challenge=${last.challenge} error=${last.error}`);
}

const hubNeedles = [
  'Friday Night Lights, Defined', 'CollectionPage', 'ItemList', 'BreadcrumbList',
  '/article/texas-high-school-football-newcomers', '/article/texas-high-school-football-friday-night-lights',
  '/texas-homecoming-mums', '/sports-venues/high-school-football', '/find-my-school-district', '/texas-tailgating-guide',
];

await fetchVerified(hubPath, 'hub', (body) => {
  verifySeoHead(body);
  for (const needle of hubNeedles) requireNeedle(body, needle, 'hub');
  if (/\bnoindex\b/i.test(body)) throw new Error('hub unexpectedly contains noindex');
});

await fetchVerified('/sports', 'sports hub', (body) => {
  requireNeedle(body, '/sports/friday-night-lights', 'sports hub');
});

await fetchVerified('/sitemap.xml', 'sitemap', (body) => {
  requireNeedle(body, '<loc>https://texasdefined.com/sports/friday-night-lights</loc>', 'sitemap');
});

await fetchVerified('/robots.txt', 'robots', (body) => {
  if (/Disallow:\s*\/sports(?:\/|\s|$)/i.test(body)) throw new Error('robots.txt blocks /sports');
});

console.log('Friday Night Lights production smoke passed: SSR title, description and canonical plus hub content, schema, discovery links, sitemap and robots are live.');
