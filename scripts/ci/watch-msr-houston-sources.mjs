// Independent, no-paid-API drift detection for the source-dated MSR Houston guide.
// Scheduled checks flag changes for editorial review; they never auto-publish
// unverifiable venue status, dates, or prices.
import { readFile, appendFile } from 'node:fs/promises';

const SOURCES = {
  karting: 'https://msrhouston.com/karting/',
  membership: 'https://msrhouston.com/membership/',
  events: 'https://msrhouston.com/events/',
  production: 'https://texasdefined.com/sports-venue/msr-houston',
  directory: 'https://texasdefined.com/sports-venues/motorsports',
};
const ROOT = new URL('../../', import.meta.url);
const DAY_MS = 86_400_000;
const deadline = 21;

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&rsquo;|&#8217;|&#x2019;/gi, '’')
    .replace(/&lsquo;|&#8216;|&#x2018;/gi, '‘')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}
function isPaused(text) {
  return /we(?:['’]re| are)\s+temporarily\s+closed|karting\s+(?:may\s+be\s+)?paused\s+for\s+now|karting\s+is\s+temporarily\s+closed/i.test(text);
}
function publishedGuestFee(text) {
  const match = text.match(/\b(?:the\s+)?member\s+guest\s+driving\s+fee\s+is\s+now\s+\$?([\d,.]+)\s+plus\s+tax\b/i);
  return match ? Number(match[1].replace(/,/g, '')) : null;
}
function fallbackEventDates(source) {
  return [...source.matchAll(/lastDate:\s*["'](\d{4}-\d{2}-\d{2})["']/g)].map((m) => m[1]);
}
function centralDate(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date);
  const record = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return [record.year, record.month, record.day].join('-');
}
function daysUntil(date, today) {
  return Math.round((Date.parse(date + 'T12:00:00Z') - Date.parse(today + 'T12:00:00Z')) / DAY_MS);
}
function assertSelfTests() {
  const closed = visibleText('<h2>Pitting For a Tune-Up</h2><p>We&#8217;re Temporarily Closed</p>');
  const open = visibleText('<h2>We are open for karting reservations</h2>');
  const fee = visibleText('<div>The member guest driving fee is now <b>$175</b> plus tax.</div>');
  const dates = fallbackEventDates('lastDate: "2026-10-11", lastDate: "2026-11-21"');
  if (!isPaused(closed) || isPaused(open) || publishedGuestFee(fee) !== 175 ||
      daysUntil('2026-11-21', '2026-11-01') !== 20 ||
      dates.length !== 2 || centralDate(new Date('2026-10-09T18:00:00Z')) !== '2026-10-09') {
    throw new Error('MSR Houston freshness monitor self-test failed');
  }
  console.log('PASS MSR Houston source-watch self-tests');
}
async function fetchHtml(url) {
  let lastError;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20_000),
        headers: { 'user-agent': 'TexasDefined Editorial Source Integrity Watch (+https://texasdefined.com)' },
        redirect: 'follow',
      });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const html = await response.text();
      if (!html.includes('MSR') && url.includes('msrhouston.com')) throw new Error('unexpected upstream HTML');
      return html;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  throw new Error('Unable to verify ' + url + ': ' + String(lastError));
}
async function run() {
  assertSelfTests();
  if (process.argv.includes('--self-test')) return;
  const warnings = [];
  const note = (message) => { warnings.push(message); console.error('::error title=MSR Houston editorial review needed::' + message); };

  const [karting, membership, events, production, directory] = await Promise.all(
    Object.values(SOURCES).map((url) => fetchHtml(url).then(visibleText))
  );
  const guideSource = await readFile(new URL('src/components/sports/MSRHoustonAuthoritySections.tsx', ROOT), 'utf8');
  const fallback = await readFile(new URL('src/components/sports/MSRHoustonEventsFallback.tsx', ROOT), 'utf8');
  const today = centralDate();

  // A changed or absent closure notice is an editorial review trigger, NOT proof of reopening.
  if (!isPaused(karting)) note('The operator karting page no longer clearly reports the expected closure. Verify reopening manually before changing any TexasDefined copy.');
  if (!/Karting is temporarily closed/.test(production) || !/Can you actually drive at MSR Houston/.test(production)) {
    note('Live canonical MSR Houston guide is missing its operational alert or independent access guide.');
  }
  if (!/karting operation announced a temporary closure/i.test(directory)) {
    note('Motorsports landing no longer shows the MSR Houston karting-status distinction.');
  }
  if (!directory.includes('The most recently checked individual venue record in this collection was verified') ||
      directory.includes('Venue source records on this page were reviewed through')) {
    note('Motorsports directory may be serving stale collection-wide review metadata; verify canonical HTML and cache.');
  }
  const fee = publishedGuestFee(membership);
  if (fee === null || fee !== 175) note('Guest driving fee changed or could not be parsed. Current observed amount: ' + (fee ?? 'not verified') + '. Recheck guide pricing.');
  if (!guideSource.includes('$175 plus tax')) note('The guide fee claim differs from the monitored $175 published rate; editorial verification required.');

  const dates = fallbackEventDates(fallback);
  if (dates.length === 0 || !dates.every((date) => !Number.isNaN(Date.parse(date)))) {
    note('Curated MSR Houston event dates are missing or malformed.');
  } else {
    const lastDate = [...dates].sort().at(-1);
    const remaining = daysUntil(lastDate, today);
    if (remaining <= deadline) note('Last researched calendar highlight expires in ' + remaining + ' days (' + lastDate + '). Research new upcoming events before the guide becomes dated.');
  }
  if (!/CMRA Motorcycle Races/i.test(events) || !/24 Hours of LeMons/i.test(events)) {
    note('Official events archive no longer contains one or more expected named events; check the MSR Houston event registry.');
  }

  const passed = warnings.length === 0;
  const summary = [
    '## MSR Houston source freshness',
    '',
    'Checked (America/Chicago): ' + today,
    '',
    '| Check | Result |',
    '|---|---|',
    '| Official karting closure vs guide | ' + (isPaused(karting) ? 'Notice still published' : 'Review needed') + ' |',
    '| Guest driving fee | ' + (fee === null ? 'Could not verify' : '$' + fee + ' plus tax') + ' |',
    '| Curated event highlights | ' + (dates.length ? 'Last listed ' + [...dates].sort().at(-1) : 'Missing') + ' |',
    '| Official events archive | ' + (events.includes('LeMons') ? 'Retrieved' : 'Review needed') + ' |',
    '| Live guide and directory | Retrieved |',
    '',
    passed ? 'PASS: sources align with the source-dated MSR Houston guide.' : 'ATTENTION: ' + warnings.join(' / '),
    '',
    'This watch does not prove event availability or automatically change published facts.',
  ].join('\n');
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, summary + '\n');
  console.log(summary);
  if (!passed) process.exitCode = 1;
}
await run().catch((error) => { console.error('::error title=MSR Houston source watch failed::' + String(error)); process.exitCode = 1; });
