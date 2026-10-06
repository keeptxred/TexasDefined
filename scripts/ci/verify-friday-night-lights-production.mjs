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
const bryanFinderApiPath = '/api/high-school-football?q=Bryan&limit=25';
const katyProfilePath = '/texas-high-school-football-teams/katy';
const willsPointProfilePath = '/texas-high-school-football-teams/wills-point';
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
    'Texas Six-Man Football: Rules, Scoring &amp; How It Works',
    'The rules that make it a different game',
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
    calendarPath,
  ]) requireNeedle(body, needle, 'football scores and schedules');
  if (/\bnoindex\b/i.test(body)) throw new Error('football scores and schedules unexpectedly contains noindex');
});

await fetchVerified(calendarPath, 'football season calendar', (body) => {
  for (const needle of [
    'Texas High School Football 2026 Season Calendar',
    '2026 UIL season timeline',
    'August 3',
    'August 27',
    'November 7',
    'December 16–19',
    'https://www.uiltexas.org/football',
    scoresSchedulesPath,
    districtDirectoryPath,
  ]) requireNeedle(body, needle, 'football season calendar');
  if (/\bnoindex\b/i.test(body)) throw new Error('football season calendar unexpectedly contains noindex');
});

await fetchVerified(finderApiPath, 'football finder API', (body) => {
  const payload = JSON.parse(body);
  if (!Array.isArray(payload?.results) || payload.results.length < 1) throw new Error('finder API returned no results');
  const result = payload.results.find((candidate) => candidate?.slug === 'dallas-south-oak-cliff');
  if (!result) throw new Error('finder API did not return Dallas South Oak Cliff');
  requireExact(result.classification, '5A', 'Dallas South Oak Cliff classification');
  requireExact(result.district, '5A-2-6', 'Dallas South Oak Cliff district');
});

await fetchVerified(allTimeFinderApiPath, 'all-time football finder API', (body) => {
  const payload = JSON.parse(body);
  const result = payload?.results?.find((candidate) => candidate?.slug === 'katy');
  if (!result) throw new Error('all-time finder API did not return Katy');
  if (!Number.isFinite(result.stateChampionships) || result.stateChampionships < 1) throw new Error('Katy state title history missing from finder API');
  if (!Number.isFinite(result.stateFinalAppearances) || result.stateFinalAppearances < result.stateChampionships) throw new Error('Katy state-final history missing from finder API');
});

await fetchVerified(oneAFinderApiPath, '1A football finder API', (body) => {
  const payload = JSON.parse(body);
  const result = payload?.results?.find((candidate) => candidate?.slug === 'abbott');
  if (!result) throw new Error('1A finder API did not return Abbott');
  requireExact(result.classification, '1A', 'Abbott classification');
  requireExact(String(result.enrollment), '91', 'Abbott enrollment');
});

await fetchVerified(bryanFinderApiPath, 'Bryan football finder API', (body) => {
  const payload = JSON.parse(body);
  const result = payload?.results?.find((candidate) => candidate?.slug === 'bryan');
  if (!result) throw new Error('Bryan finder API did not return Bryan');
  requireExact(result.classification, '6A', 'Bryan classification');
  requireExact(String(result.enrollment), '2440', 'Bryan enrollment');
  requireExact(result.district, '6A-2-13', 'Bryan district');
});

await fetchVerified(katyProfilePath, 'Katy football profile', (body) => {
  for (const needle of [
    'Katy High School Football',
    'Class 6A',
    'UIL enrollment 3,401',
    '6A District 22',
    'Legacy state-title history',
    'Katy Independent School District',
    'Open Katy ISD football profile',
    katyIsdPath,
    'UIL state championships',
    'UIL state-final appearances',
    'Verify the current campus, district and UIL information',
    '/find-my-school-district',
  ]) requireNeedle(body, needle, 'Katy football profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Katy football profile unexpectedly contains noindex');
});

await fetchVerified(willsPointProfilePath, 'Wills Point football profile', (body) => {
  for (const needle of [
    'Wills Point High School Football',
    'Class 4A',
    'UIL enrollment 768',
    '4A-2 District 6',
    'Wills Point Independent School District',
    'Open Wills Point ISD football profile',
    '/texas-high-school-football-isds/wills-point-isd',
    'Van Zandt County',
    '/county/van-zandt',
    'Wills Point Tiger Stadium',
    'Verify the current campus, district and UIL information',
    '/find-my-school-district',
  ]) requireNeedle(body, needle, 'Wills Point football profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Wills Point football profile unexpectedly contains noindex');
});

await fetchVerified(abbottProfilePath, 'Abbott football profile', (body) => {
  for (const needle of [
    'Abbott High School Football',
    'Class 1A',
    'UIL enrollment 91',
    '1A-1 District 12',
    'Six-man football',
    'Abbott Independent School District',
    'Open Abbott ISD football profile',
    '/texas-high-school-football-isds/abbott-isd',
    'Hill County',
    '/county/hill',
    'Panther Stadium',
    'UIL state championships',
    'UIL state-final appearances',
    'Verify the current campus, district and UIL information',
    '/find-my-school-district',
  ]) requireNeedle(body, needle, 'Abbott football profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Abbott football profile unexpectedly contains noindex');
});

await fetchVerified(kellerProfilePath, 'Keller football profile', (body) => {
  for (const needle of [
    'Keller High School Football',
    'Class 6A',
    'UIL enrollment 3,177',
    '6A District 4',
    'Keller Independent School District',
    'Open Keller ISD football profile',
    '/texas-high-school-football-isds/keller-isd',
    'Tarrant County',
    '/county/tarrant',
    'Keller ISD Athletics Complex',
    'Verify the current campus, district and UIL information',
    '/find-my-school-district',
  ]) requireNeedle(body, needle, 'Keller football profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Keller football profile unexpectedly contains noindex');
});

await fetchVerified(friscoProfilePath, 'Frisco football profile', (body) => {
  for (const needle of [
    'Frisco High School Football',
    'Class 5A',
    'UIL enrollment 1,811',
    '5A-2 District 4',
    'Frisco Independent School District',
    'Open Frisco ISD football profile',
    '/texas-high-school-football-isds/frisco-isd',
    'Collin County',
    '/county/collin',
    'Ford Center at The Star',
    'Frisco ISD football programs use it for district games',
    'Verify the current campus, district and UIL information',
    '/find-my-school-district',
  ]) requireNeedle(body, needle, 'Frisco football profile');
  if (/\bnoindex\b/i.test(body)) throw new Error('Frisco football profile unexpectedly contains noindex');
});

for (const profile of universalProfileCases) {
  await fetchVerified(profile.path, `${profile.classification} universal football profile`, (body) => {
    for (const needle of [
      `${profile.name} High School Football`,
      `Class ${profile.classification}`,
      `UIL enrollment ${profile.enrollment}`,
      'Verify the current campus, district and UIL information',
      '/find-my-school-district',
      districtDirectoryPath,
      scoresSchedulesPath,
    ]) requireNeedle(body, needle, `${profile.classification} universal football profile`);
    if (/\bnoindex\b/i.test(body)) throw new Error(`${profile.classification} universal football profile unexpectedly contains noindex`);
  });
}

console.log('Friday Night Lights production smoke passed.');
