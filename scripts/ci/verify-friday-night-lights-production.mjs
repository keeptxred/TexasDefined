const origin = process.env.PRODUCTION_ORIGIN ?? 'https://texasdefined.com';
const hubPath = '/sports/friday-night-lights';
const finderPath = '/texas-high-school-football-teams';
const districtDirectoryPath = '/texas-high-school-football-districts';
const isdDirectoryPath = '/texas-high-school-football-isds';
const katyIsdPath = '/texas-high-school-football-isds/katy-isd';
const championshipHistoryPath = '/texas-high-school-football-championship-history';
const katyDistrictPath = '/texas-high-school-football-districts/6a-district-22';
const classificationsPath = '/article/texas-high-school-football-classifications-1a-6a';
const playoffsPath = '/article/texas-high-school-football-playoffs-explained';
const sixManPath = '/article/texas-six-man-football-rules-explained';
const scoresSchedulesPath = '/article/texas-high-school-football-scores-schedules';
const calendarPath = '/article/texas-high-school-football-2026-season-calendar';
const finderApiPath = '/api/high-school-football?q=Dallas%20South%20Oak%20Cliff&limit=5';
const allTimeFinderApiPath = '/api/high-school-football?q=Katy&limit=50';
const oneAFinderApiPath = '/api/high-school-football?q=Abbott&limit=10';
const katyProfilePath = '/texas-high-school-football-teams/katy';
const abbottProfilePath = '/texas-high-school-football-teams/abbott';
const kellerProfilePath = '/texas-high-school-football-teams/keller';
const friscoProfilePath = '/texas-high-school-football-teams/frisco';
const universalProfileCases = [
  { name: 'Lubbock Cooper', classification: '5A', enrollment: '1,663', path: '/texas-high-school-football-teams/lubbock-cooper' },
  { name: 'Huffman Hargrave', classification: '4A', enrollment: '1,168', path: '/texas-high-school-football-teams/huffman-hargrave' },
  { name: 'Franklin', classification: '3A', enrollment: '435', path: '/texas-high-school-football-teams/franklin' },
  { name: 'Panhandle', classification: '2A', enrollment: '176.5', path: '/texas-high-school-football-teams/panhandle' },
  { name: 'Abbott', classification: '1A', enrollment: '91', path: '/texas-high-school-football-teams/abbott' },
];
const expectedTitle = 'Texas High School Football: Friday Night Lights, Traditions & Game-Day Guide';
const expectedDescription = 'Understand Texas high school football through Friday-night traditions, six-man and 11-man culture, stadiums, homecoming mums, playoffs, school communities and practical game-day planning.';
const expectedCanonical = `${origin}${hubPath}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function normalizeHydrationMarkup(value) {
  return value.replace(/<!--[\s\S]*?-->/g, '');
}

function requireNeedle(body, needle, label) {
  const hydrated = normalizeHydrationMarkup(body);
  const decoded = decodeHtml(hydrated);
  if (!body.includes(needle) && !hydrated.includes(needle) && !decoded.includes(decodeHtml(needle))) {
    throw new Error(`${label} missing expected content: ${needle}`);
  }
}

function requireOrderedNeedles(body, needles, label) {
  const comparable = decodeHtml(normalizeHydrationMarkup(body));
  let previousIndex = -1;
  for (const needle of needles) {
    const decodedNeedle = decodeHtml(needle);
    const index = comparable.indexOf(decodedNeedle);
    if (index < 0) throw new Error(`${label} missing ordered content: ${needle}`);
    if (index <= previousIndex) throw new Error(`${label} order regression around: ${needle}`);
    previousIndex = index;
  }
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
  '/texas-high-school-football-teams', districtDirectoryPath, championshipHistoryPath, classificationsPath, playoffsPath, sixManPath, scoresSchedulesPath, calendarPath,
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
    isdDirectoryPath,
    districtDirectoryPath,
    championshipHistoryPath,
    '/article/texas-high-school-football-classifications-1a-6a',
    playoffsPath,
    sixManPath,
    scoresSchedulesPath,
    calendarPath,
    'Browse all 1,268 Texas high school football programs',
    'All 1,268',
    '6A · 249',
    '5A · 246',
    '4A · 205',
    '3A · 204',
    '2A · 205',
    '1A · 159',
    '6A → 1A · enrollment classification',
    'UIL enrollment band: 2,215 and above',
    'UIL enrollment band: 1,305–2,214',
    'Official UIL 2026–28 enrollment cutoffs',
    'UIL enrollment 3,401',
    'UIL enrollment 91',
    '/texas-high-school-football-teams/katy',
    '/texas-high-school-football-teams/abbott',
  ]) requireNeedle(body, needle, 'football finder');
  requireOrderedNeedles(body, [
    '6A football programs',
    '5A football programs',
    '4A football programs',
    '3A football programs',
    '2A football programs',
    '1A football programs',
  ], 'football finder UIL classification hierarchy');
  if (/\bnoindex\b/i.test(body)) throw new Error('football finder unexpectedly contains noindex');
});

await fetchVerified(isdDirectoryPath, 'football ISD directory', (body) => {
  for (const needle of [
    'Texas high school football by ISD',
    'Browse district football options',
    'matched UIL programs',
    'The ISD list itself is alphabetical',
    '/find-my-school-district',
    '/texas-high-school-football-teams',
  ]) requireNeedle(body, needle, 'football ISD directory');
  if (/\bnoindex\b/i.test(body)) throw new Error('football ISD directory unexpectedly contains noindex');
});

await fetchVerified(katyIsdPath, 'Katy ISD football profile', (body) => {
  for (const needle of [
    'Katy ISD football programs',
    'Every matched UIL football school in Katy ISD',
    'UIL enrollment',
    '/texas-high-school-football-teams/katy',
    'Verify the district, campus and football eligibility separately',
    'UIL eligibility standards',
    '/find-my-school-district',
    '/texas-high-school-football-districts',
  ]) requireNeedle(body, needle, 'Katy ISD football profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Katy ISD football profile unexpectedly contains noindex');
});

await fetchVerified(championshipHistoryPath, 'football championship history', (body) => {
  for (const needle of [
    'Texas high school football state championship history',
    'History, not a power ranking',
    'Current programs with the most UIL state titles',
    'Every matched program with a UIL state-final appearance',
    'UIL history is the controlling record',
    '/texas-high-school-football-teams',
    '/texas-high-school-football-districts',
    'https://www.uiltexas.org/football/all-time-appearances',
    'https://www.uiltexas.org/football/archives',
  ]) requireNeedle(body, needle, 'football championship history');
  if (/\bnoindex\b/i.test(body)) throw new Error('football championship history unexpectedly contains noindex');
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
    'Reported enrollment range',
    '2,844–3,719',
    'UIL reported enrollment:',
    '3,401',
    '3,669',
    '3,186.5',
    'Enrollment figures are the UIL 2026–28 realignment snapshot used for classification.',
    'Open UIL enrollment listing',
    'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf',
    'Official UIL 2026–28 enrollment cutoffs',
    'University Interscholastic League',
    scoresSchedulesPath,
    'Follow scores & weekly schedules',
    'https://www.uiltexas.org/maxpreps/',
    'UIL Texas Scoreboard gateway',
    'not currently an official district-standings table',
    calendarPath,
    '2026 UIL season calendar',
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
    scoresSchedulesPath,
    calendarPath,
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

await fetchVerified(scoresSchedulesPath, 'football scores and schedules', (body) => {
  for (const needle of [
    'Texas High School Football Scores &amp; Schedules: How to Follow the 2026 Season',
    'UIL Texas Scoreboard',
    'scores and weekly schedules',
    'standings and stat leaderboards are planned additions',
    'do not confuse incomplete live submissions with an official standings table',
    'December 16–19',
    'https://www.uiltexas.org/athletics/uil-maxpreps',
    '/texas-high-school-football-teams',
    districtDirectoryPath,
    playoffsPath,
    calendarPath,
  ]) requireNeedle(body, needle, 'football scores and schedules');
  if (/\bnoindex\b/i.test(body)) throw new Error('football scores and schedules unexpectedly contains noindex');
});

await fetchVerified(calendarPath, '2026 football season calendar', (body) => {
  for (const needle of [
    'Texas High School Football 2026 Calendar: Every UIL Week, Playoff Round &amp; State Final',
    'Week One',
    'August 27, 28 and 29',
    'Week Eleven',
    'November 5, 6 and 7',
    'November 7 is the UIL district-certification deadline',
    'November 12, 13 and 14',
    'November 26, 27 and 28',
    'December 16 through Saturday, December 19',
    'AT&amp;T Stadium',
    '1A Division II at 11:00 a.m.',
    '6A Division I at 7:00 p.m.',
    'https://www.uiltexas.org/football',
    'https://www.uiltexas.org/football/state',
    scoresSchedulesPath,
    playoffsPath,
    finderPath,
    districtDirectoryPath,
  ]) requireNeedle(body, needle, '2026 football season calendar');
  if (/\bnoindex\b/i.test(body)) throw new Error('2026 football season calendar unexpectedly contains noindex');
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
    scoresSchedulesPath,
    'Current scores & schedules',
    'UIL Texas Scoreboard gateway',
    'not an official district-standings table',
    calendarPath,
    '2026 UIL season calendar',
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
    'Venue verification pending',
    'Every UIL school profile has the same game-venue field.',
    'Official district enrollment',
    'UIL eligibility standards',
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

await fetchVerified(friscoProfilePath, 'Frisco football school profile', (body) => {
  for (const needle of [
    'Frisco',
    'Verified football venue relationships',
    'Ford Center at The Star',
    '/sports-venue/ford-center-at-the-star',
    'Frisco ISD football programs use it for district games',
    'Official venue source',
  ]) requireNeedle(body, needle, 'Frisco football school profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Frisco football school profile unexpectedly contains noindex');
});

for (const profile of universalProfileCases) {
  await fetchVerified(profile.path, `${profile.classification} universal football profile ${profile.name}`, (body) => {
    for (const needle of [
      profile.name,
      profile.classification,
      'Current district',
      'How to enroll at',
      'UIL eligibility standards',
      'UIL reported enrollment',
      profile.enrollment,
      'All current UIL football programs use the same profile system.',
      '/texas-high-school-football-teams',
    ]) requireNeedle(body, needle, `${profile.classification} universal football profile ${profile.name}`);
    if (/\bnoindex\b/i.test(body)) throw new Error(`${profile.name} universal football profile unexpectedly contains noindex`);
  });
}

await fetchVerified('/sitemap.xml', 'sitemap', (body) => {
  requireNeedle(body, '<loc>https://texasdefined.com/sports/friday-night-lights</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-isds</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-districts</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-championship-history</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-districts/6a-district-22</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams/katy</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams/abbott</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/texas-high-school-football-teams/keller</loc>', 'sitemap');
  for (const profile of universalProfileCases) {
    requireNeedle(body, `<loc>https://texasdefined.com${profile.path}</loc>`, 'sitemap universal football profile');
  }
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-high-school-football-playoffs-explained</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-six-man-football-rules-explained</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-high-school-football-scores-schedules</loc>', 'sitemap');
  requireNeedle(body, '<loc>https://texasdefined.com/article/texas-high-school-football-2026-season-calendar</loc>', 'sitemap');
});

await fetchVerified('/robots.txt', 'robots', (body) => {
  if (/Disallow:\s*\/sports(?:\/|\s|$)/i.test(body)) throw new Error('robots.txt blocks /sports');
});

console.log('Friday Night Lights production smoke passed: all-1,268 UIL directory, exact official UIL enrollments plus 2026–28 enrollment bands, 192 canonical UIL district hubs, statewide championship-history hub, shared 6A and 1A school-profile system, district/enrollment/eligibility research, verified stadium relationships, current-season scores/schedules guidance, the 2026 UIL season calendar, sitemap and robots are live.');
