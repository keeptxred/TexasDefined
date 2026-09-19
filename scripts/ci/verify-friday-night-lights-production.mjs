const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const hubPath = '/sports/friday-night-lights';
const finderPath = '/texas-high-school-football-teams';
const classificationsPath = '/article/texas-high-school-football-classifications-1a-6a';
const playoffsPath = '/article/texas-high-school-football-playoffs-explained';
const finderApiPath = '/api/high-school-football?q=Dallas%20South%20Oak%20Cliff&limit=5';
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
  '/texas-high-school-football-teams', classificationsPath, playoffsPath,
];

await fetchVerified(hubPath, 'hub', (body) => {
  verifySeoHead(body);
  for (const needle of hubNeedles) requireNeedle(body, needle, 'hub');
  if (/\bnoindex\b/i.test(body)) throw new Error('hub unexpectedly contains noindex');
});

await fetchVerified('/sports', 'sports hub', (body) => {
  requireNeedle(body, '/sports/friday-night-lights', 'sports hub');
});

await fetchVerified(finderPath, 'football finder', (body) => {
  for (const needle of [
    'Find a Texas high school football team',
    'High school, ISD, city or county',
    'What “good football fit” should mean',
    '/find-my-school-district',
    '/article/texas-high-school-football-classifications-1a-6a',
    playoffsPath,
  ]) requireNeedle(body, needle, 'football finder');
  if (/\bnoindex\b/i.test(body)) throw new Error('football finder unexpectedly contains noindex');
});

await fetchVerified(classificationsPath, 'football classifications', (body) => {
  for (const needle of [
    'What Do 1A, 2A, 3A, 4A, 5A and 6A Mean in Texas High School Football?',
    'How Texas high school football got its structure',
    'Prairie View Interscholastic League',
    'A quick glossary',
    '/texas-high-school-football-teams',
  ]) requireNeedle(body, needle, 'football classifications');
  if (/\bnoindex\b/i.test(body)) throw new Error('football classifications unexpectedly contains noindex');
});

await fetchVerified(playoffsPath, 'football playoffs', (body) => {
  for (const needle of [
    'How Do the Texas High School Football Playoffs Work?',
    'The short version',
    'bi-district',
    'Home field, neutral sites',
    '/texas-high-school-football-teams',
    '/article/texas-high-school-football-classifications-1a-6a',
  ]) requireNeedle(body, needle, 'football playoffs');
  if (/\bnoindex\b/i.test(body)) throw new Error('football playoffs unexpectedly contains noindex');
});

await fetchVerified(finderApiPath, 'football finder API', (body) => {
  const payload = JSON.parse(body);
  if (payload?.ok !== true) throw new Error('football finder API did not return ok=true');
  if (payload?.alignmentCycle !== '2026-28') throw new Error('football finder API alignment cycle is not 2026-28');
  if (payload?.historyAvailable !== true) throw new Error('UIL recent-history layer is unavailable');
  const southOakCliff = payload?.programs?.find((program) => program.schoolName === 'Dallas South Oak Cliff');
  if (!southOakCliff) throw new Error('Dallas South Oak Cliff was not returned by exact UIL search');
  if (!southOakCliff.recentHistory) throw new Error('Dallas South Oak Cliff is missing recent UIL state-final history');
  if (southOakCliff.recentHistory.windowStartSeason !== '2018-2019' || southOakCliff.recentHistory.windowEndSeason !== '2025-2026') {
    throw new Error('recent UIL history window is incorrect');
  }
  if (southOakCliff.recentHistory.stateFinalAppearances < 3) throw new Error('recent UIL history did not recover expected state-final appearances');
  if (!southOakCliff.recentHistory.sourceUrl?.includes('uiltexas.org/football/archives')) throw new Error('recent UIL history is missing official archive provenance');
});

await fetchVerified('/sitemap.xml', 'sitemap', (body) => {
  requireNeedle(body, '<loc>https://texasdefined.com/sports/friday-night-lights</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-high-school-football-playoffs-explained</loc>', 'sitemap');
});

await fetchVerified('/robots.txt', 'robots', (body) => {
  if (/Disallow:\s*\/sports(?:\/|\s|$)/i.test(body)) throw new Error('robots.txt blocks /sports');
});

console.log('Friday Night Lights production smoke passed: hub SEO/discovery, classification/history authority, playoff authority, statewide team finder, UIL recent-finals API history, sitemap and robots are live.');
