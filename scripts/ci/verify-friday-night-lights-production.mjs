const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const hubPath = '/sports/friday-night-lights';
const finderPath = '/texas-high-school-football-teams';
const districtDirectoryPath = '/texas-high-school-football-districts';
const katyDistrictPath = '/texas-high-school-football-districts/6a-district-22';
const classificationsPath = '/article/texas-high-school-football-classifications-1a-6a';
const playoffsPath = '/article/texas-high-school-football-playoffs-explained';
const sixManPath = '/article/texas-six-man-football-rules-explained';
const finderApiPath = '/api/high-school-football?q=Dallas%20South%20Oak%20Cliff&limit=5';
const allTimeFinderApiPath = '/api/high-school-football?q=Katy&limit=50';
const oneAFinderApiPath = '/api/high-school-football?q=Abbott&limit=10';
const katyProfilePath = '/texas-high-school-football-teams/katy';
const abbottProfilePath = '/texas-high-school-football-teams/abbott';
const kellerProfilePath = '/texas-high-school-football-teams/keller';
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
  '/texas-high-school-football-teams', districtDirectoryPath, classificationsPath, playoffsPath, sixManPath,
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
    districtDirectoryPath,
    '/article/texas-high-school-football-classifications-1a-6a',
    playoffsPath,
    sixManPath,
    'Browse all 1,268 Texas high school football programs',
    'All 1,268',
    '6A → 1A · enrollment classification',
    'UIL enrollment band: 2,215 and above',
    'UIL enrollment band: 1,305–2,214',
    'Official UIL 2026–28 enrollment cutoffs',
    'UIL enrollment 3,401',
    'UIL enrollment 91',
    '/texas-high-school-football-teams/katy',
    '/texas-high-school-football-teams/abbott',
  ]) requireNeedle(body, needle, 'football finder');
  if (/\bnoindex\b/i.test(body)) throw new Error('football finder unexpectedly contains noindex');
});

await fetchVerified(districtDirectoryPath, 'football district directory', (body) => {
  for (const needle of [
    'Texas high school football districts',
    'Browse all 192 current UIL football districts',
    '6A',
    '1A Division II',
    katyDistrictPath,
    '/texas-high-school-football-teams',
  ]) requireNeedle(body, needle, 'football district directory');
  if (/\bnoindex\b/i.test(body)) throw new Error('football district directory unexpectedly contains noindex');
});

await fetchVerified(katyDistrictPath, 'Katy UIL football district', (body) => {
  for (const needle of [
    '6A District 22',
    '9 programs',
    'Katy',
    'Katy Cinco Ranch',
    'Katy Tompkins',
    '/texas-high-school-football-teams/katy',
    'Member order is alphabetical for research usability',
    'Enrollment band',
    '2,215 and above',
    'Official UIL 2026–28 enrollment cutoffs',
    'University Interscholastic League',
  ]) requireNeedle(body, needle, 'Katy UIL football district');
  if (/\bnoindex\b/i.test(body)) throw new Error('Katy UIL football district unexpectedly contains noindex');
});

await fetchVerified(classificationsPath, 'football classifications', (body) => {
  for (const needle of [
    'What Do 1A, 2A, 3A, 4A, 5A and 6A Mean in Texas High School Football?',
    'How Texas high school football got its structure',
    'Prairie View Interscholastic League',
    'A quick glossary',
    '/texas-high-school-football-teams',
    districtDirectoryPath,
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

await fetchVerified(sixManPath, 'six-man football', (body) => {
  for (const needle of [
    'Texas Six-Man Football Explained: Rules, Scoring and Why It Looks So Different',
    'The short answer',
    '15 yards',
    '45-point',
    'A field goal is worth 4 points',
    '/texas-high-school-football-teams',
    '/article/texas-high-school-football-playoffs-explained',
  ]) requireNeedle(body, needle, 'six-man football');
  if (/\bnoindex\b/i.test(body)) throw new Error('six-man football unexpectedly contains noindex');
});

await fetchVerified(finderApiPath, 'football finder API', (body) => {
  const payload = JSON.parse(body);
  if (payload?.ok !== true) throw new Error('football finder API did not return ok=true');
  if (payload?.alignmentCycle !== '2026-28') throw new Error('football finder API alignment cycle is not 2026-28');
  if (payload?.historyAvailable !== true) throw new Error('UIL recent-history layer is unavailable');
  if (payload?.allTimeHistoryAvailable !== true) throw new Error('UIL all-time-history layer is unavailable');
  const southOakCliff = payload?.programs?.find((program) => program.schoolName === 'Dallas South Oak Cliff');
  if (!southOakCliff) throw new Error('Dallas South Oak Cliff was not returned by exact UIL search');
  if (!southOakCliff.recentHistory) throw new Error('Dallas South Oak Cliff is missing recent UIL state-final history');
  if (southOakCliff.recentHistory.windowStartSeason !== '2018-2019' || southOakCliff.recentHistory.windowEndSeason !== '2025-2026') {
    throw new Error('recent UIL history window is incorrect');
  }
  if (southOakCliff.recentHistory.stateFinalAppearances < 3) throw new Error('recent UIL history did not recover expected state-final appearances');
  if (!southOakCliff.recentHistory.sourceUrl?.includes('uiltexas.org/football/archives')) throw new Error('recent UIL history is missing official archive provenance');
});

await fetchVerified(allTimeFinderApiPath, 'football all-time history API', (body) => {
  const payload = JSON.parse(body);
  if (payload?.ok !== true) throw new Error('football all-time history API did not return ok=true');
  if (payload?.allTimeHistoryAvailable !== true) throw new Error('UIL all-time-history source is unavailable');
  const katy = payload?.programs?.find((program) => program.schoolName === 'Katy');
  if (!katy) throw new Error('Katy was not returned by UIL program search');
  if (!katy.allTimeHistory) throw new Error('Katy is missing all-time UIL state-final history');
  if (katy.uilEnrollment !== 3401) throw new Error(`Katy exact UIL enrollment expected 3401; found ${katy.uilEnrollment}`);
  if (katy.allTimeHistory.stateTitles < 9) throw new Error('Katy all-time title count is below the official UIL baseline');
  if (katy.allTimeHistory.stateFinalAppearances < 15) throw new Error('Katy all-time state-final appearances are below the official UIL baseline');
  if (katy.allTimeHistory.publishedThroughYear < 2024) throw new Error('UIL all-time appearances table recency detection is unexpectedly old');
  if (!katy.allTimeHistory.sourceUrl?.includes('uiltexas.org/football/all-time-appearances')) throw new Error('Katy all-time history is missing official UIL provenance');
});

await fetchVerified(oneAFinderApiPath, '1A football profile API', (body) => {
  const payload = JSON.parse(body);
  if (payload?.ok !== true) throw new Error('Abbott football lookup did not return ok=true');
  const abbott = payload?.programs?.find((program) => program.schoolName === 'Abbott');
  if (!abbott) throw new Error('Abbott was not returned from the all-UIL lookup');
  if (abbott.profilePath !== abbottProfilePath) throw new Error('Abbott is missing its canonical all-UIL profile path');
  if (abbott.classification !== '1A') throw new Error('Abbott current UIL classification is not 1A');
  if (abbott.uilEnrollment !== 91) throw new Error(`Abbott exact UIL enrollment expected 91; found ${abbott.uilEnrollment}`);
});

await fetchVerified(katyProfilePath, 'Katy football school profile', (body) => {
  for (const needle of [
    'Katy',
    'Current district',
    katyDistrictPath,
    'Open full district guide',
    'How to enroll at',
    'UIL eligibility standards',
    'UIL reported enrollment',
    '3,401',
    'UIL enrollment band',
    '2,215 and above',
    'Official UIL alphabetical enrollment listing',
    'Official UIL 2026–28 enrollment cutoffs',
    'All current UIL football programs use the same profile system.',
    'Verified football venue relationships',
    'Legacy Stadium',
    '/sports-venue/legacy-stadium-katy',
    'serves multiple Katy ISD schools',
  ]) requireNeedle(body, needle, 'Katy football school profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Katy football school profile unexpectedly contains noindex');
});

await fetchVerified(abbottProfilePath, 'Abbott football school profile', (body) => {
  for (const needle of [
    'Abbott',
    '1A',
    'Current district',
    'How to enroll at',
    'UIL eligibility standards',
    'UIL reported enrollment',
    '91',
    'UIL enrollment band',
    '57.6–104.9',
    'Official UIL alphabetical enrollment listing',
    'Official UIL 2026–28 enrollment cutoffs',
    'All current UIL football programs use the same profile system.',
  ]) requireNeedle(body, needle, 'Abbott football school profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Abbott football school profile unexpectedly contains noindex');
});

await fetchVerified(kellerProfilePath, 'Keller football school profile', (body) => {
  for (const needle of [
    'Keller',
    '6A',
    'How to enroll at',
    'Official district enrollment',
    'Keller ISD new student enrollment',
    'https://www.kellerisd.net/students-families/enrollment/why-kisd/new-student-enrollment',
    'UIL eligibility standards',
  ]) requireNeedle(body, needle, 'Keller football school profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Keller football school profile unexpectedly contains noindex');
});

await fetchVerified('/sitemap.xml', 'sitemap', (body) => {
  requireNeedle(body, '<loc>https://texasdefined.com/sports/friday-night-lights</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-districts</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-districts/6a-district-22</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams/katy</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams/abbott</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams/keller</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-high-school-football-playoffs-explained</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-six-man-football-rules-explained</loc>', 'sitemap');
});

await fetchVerified('/robots.txt', 'robots', (body) => {
  if (/Disallow:\s*\/sports(?:\/|\s|$)/i.test(body)) throw new Error('robots.txt blocks /sports');
});

console.log('Friday Night Lights production smoke passed: all-1,268 UIL directory, exact official UIL enrollments plus 2026–28 enrollment bands, 192 canonical UIL district hubs, shared 6A and 1A school-profile system, district/enrollment/eligibility research, verified stadium relationships, history, sitemap and robots are live.');
