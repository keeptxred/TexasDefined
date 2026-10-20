// Deterministic, bounded acceptance test for the published District 21 football
// hub and all eight UIL school profiles. This checks live SSR, not source text.
// Run after a SUCCESSFUL TexasDefined production deployment, never on cancelled
// workflow_run events or before a Worker asset manifest has settled.
const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const year = '2026';
const districtPath = '/texas-high-school-football-districts/6a-district-21';
const teams = [
  { slug: 'fort-bend-austin', name: 'Fort Bend Austin' },
  { slug: 'fort-bend-bush', name: 'Fort Bend Bush' },
  { slug: 'fort-bend-clements', name: 'Fort Bend Clements' },
  { slug: 'fort-bend-elkins', name: 'Fort Bend Elkins' },
  { slug: 'fort-bend-hightower', name: 'Fort Bend Hightower' },
  { slug: 'fort-bend-ridge-point', name: 'Fort Bend Ridge Point' },
  { slug: 'fort-bend-travis', name: 'Fort Bend Travis' },
  { slug: 'houston-strake-jesuit', name: 'Houston Strake Jesuit' },
];

if (!origin.startsWith('https://')) throw new Error('Production origin must be HTTPS.');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function requireContent(html, needle, label) {
  if (!html.includes(needle)) throw new Error(label + ': missing published HTML: ' + needle);
}

function requireCanonical(html, pathname) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const canonical = tags.filter((tag) => /\brel=["']canonical["']/.test(tag));
  if (canonical.length !== 1 || !canonical[0].includes('href="' + origin + pathname + '"')) {
    throw new Error(pathname + ': missing unique self-referencing canonical');
  }
}

async function verifyPage(pathname, label, check) {
  let lastError = 'no response';
  // Bounded edge-warming retries. Never assume a 200 is proof of a new build.
  for (let attempt = 1; attempt <= 3; attempt++) {
    const url = new URL(pathname, origin);
    url.searchParams.set('district21_check', String(process.env.GITHUB_SHA || year) + '-' + attempt);
    try {
      const response = await fetch(url, {
        redirect: 'follow',
        cache: 'no-store',
        headers: {
          accept: 'text/html',
          'cache-control': 'no-cache, no-store',
          'user-agent': 'TexasDefined-District21-LiveAcceptance/1.0',
        },
        signal: AbortSignal.timeout(12000),
      });
      const html = await response.text();
      const mitigation = response.headers.get('cf-mitigated');
      if (response.status !== 200 || mitigation === 'challenge') {
        lastError = 'HTTP ' + response.status + (mitigation ? ' CF challenge' : '');
      } else {
        try {
          requireCanonical(html, pathname);
          if (/\bnoindex\b/i.test(html)) throw new Error('unexpected noindex');
          check(html);
          console.log('PASS ' + label + ' (' + response.status + ', ' + html.length + ' bytes)');
          return;
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
        }
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }
    if (attempt < 3) await sleep(1500);
  }
  throw new Error(label + ': live production failed acceptance: ' + lastError);
}

const failures = [];
async function checkSafely(path, label, verify) {
  try {
    await verifyPage(path, label, verify);
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }
}

await checkSafely(districtPath, 'District 21 hub', (html) => {
  for (const needle of [
    'district-21-standings', 'district-21-results',
    'District 21 standings snapshot', 'Fort Bend Ridge Point',
    'Houston Strake Jesuit',
  ]) {
    requireContent(html, needle, 'District 21 hub');
  }
  for (const team of teams) requireContent(html, '/texas-high-school-football-teams/' + team.slug, 'District 21 member links');
});

for (const team of teams) {
  const path = '/texas-high-school-football-teams/' + team.slug;
  await checkSafely(path, team.name, (html) => {
    for (const needle of [
      'data-football-d21-team-section="' + team.slug + '"',
      'district scores and remaining games',
      '/texas-high-school-football-districts/6a-district-21#district-21-results',
      'district-21-standings', 'Published games accounted for',
      'Source verification:', 'Result not verified',
    ]) requireContent(html, needle, team.name);
  });
}

if (failures.length) {
  for (const failure of failures) console.error('FAIL ' + failure);
  throw new Error('District 21 live acceptance failed ' + failures.length + '/9 page(s)');
}
console.log('District 21 production acceptance passed: 1 district hub and all 8 team scorecards.');
