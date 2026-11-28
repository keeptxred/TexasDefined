// Monthly production/source consistency review for Alvin, Brazoria County and Alvin Historical Museum.
// This is an audit, not a content publisher. Reports failures for editorial follow-up.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const targets = [
  {
    path: '/city/alvin',
    phrases: ['Alvin Morgan', 'Froberg', 'Bob Briscoe Park', 'Nolan Ryan', '1907'],
    links: ['/county/brazoria', '/destination/alvin-historical-museum'],
    schema: 'City',
  },
  {
    path: '/county/brazoria',
    phrases: ['Alvin', 'Lake Jackson', 'West Columbia', "Froberg", 'Bob Briscoe Park', 'Nolan Ryan'],
    links: ['/city/alvin', '/destination/alvin-historical-museum'],
    schema: 'AdministrativeArea',
  },
];

const checks = [];
const check = (name, passed, detail) => checks.push({ name, passed, detail });
const normalize = (text) => text.replace(/&(?:#39|apos);/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ');
const source = {
  city: await readFile('src/data/city-authority-profiles.ts', 'utf8'),
  county: await readFile('src/data/county-profile.ts', 'utf8'),
  feature: await readFile('src/data/fixtures/brazoria-county-brazos-gulf-angleton.ts', 'utf8'),
};
check('Alvin verified Census estimate', /alvin: \{\s*population2020: 27_098,\s*censusUrl: '[^']+PST045225',\s*populationEstimate: \{ value: 30_115, year: 2025, asOf: 'July 1, 2025' \}/.test(source.city), '2020 decennial count and July 2025 Census estimate');
check('Brazoria county roster source', source.county.includes("brazoria: ['Alvin', 'Angleton', 'Pearland', 'Lake Jackson', 'Freeport', 'Brazoria', 'West Columbia', 'Surfside Beach']"), 'Explicit verified communities including Alvin');
for (const term of ['Alvin Morgan', 'Froberg', 'Bob Briscoe Park', 'Nolan Ryan', 'Slover', 'Maury Maverick Bridge']) {
  check('Alvin city source: ' + term, source.city.includes(term), 'City authority profile');
  check('Brazoria editorial source: ' + term, source.feature.includes(term), 'County editorial feature');
}
const museumFiles = await Promise.all([
  readFile('src/data/museum-authority-new-destinations.ts', 'utf8'),
  readFile('src/data/museum-authority-network.ts', 'utf8'),
]);
const museumRecord = museumFiles[0].split('slug: "alvin-historical-museum"')[1]?.split('\n  },')[0] ?? '';
const museumDossier = museumFiles[1].split('"alvin-historical-museum": {')[1]?.split('\n  },')[0] ?? '';
check('Alvin museum documented seasonal admission', museumRecord.includes('2026 Summer Museum Passport') && museumRecord.includes('$5 admission') && museumDossier.includes('https://bcsummerpassport.org/sites/') && museumDossier.includes('confirm current'), 'Published 2026 admission with explicit current-price caveat');
check('Museum visitor copy', !!museumRecord && !!museumDossier && !/Explain the difference|its exhibi"|inventing a fr"/.test(museumRecord + museumDossier), 'No known truncated text or editorial instruction');
const photos = await readFile('src/components/editorial/AlvinHistoricalPhotographs.tsx', 'utf8');
for (const id of ['25635261034', '26147334682', '5822129305']) check('Alvin photograph source ' + id, photos.includes(id), 'Exact archival original');
check('Alvin photo delivery and attribution', photos.includes('/media/remote?url=') && photos.includes('DeGolyer Library') && photos.includes('No known copyright restrictions') && photos.includes('CC BY 2.0'), 'First-party broker with explicit source and rights captions');
const manifest = JSON.parse(await readFile('public/museum-verification-manifest.json', 'utf8'));
const museum = manifest.museums.find(x => x.path === '/destination/alvin-historical-museum');
check('Museum source review contract', museum?.cadenceDays <= 30 && museum?.faqCount >= 10 && museum?.sources.some(x => x.sourceUrl.includes('tour-18_emigrants')), 'Monthly source manifest and researched questions');
const localGovernment = await readFile('src/data/local-government-profile.ts', 'utf8');
const countySection = await readFile('src/components/content/CountyGuideSections.tsx', 'utf8');
check('Brazoria verified civic snapshot', source.county.includes('population2025Estimate: 419080') && source.county.includes('population2020: 372031') && localGovernment.includes('Kristin R. Bulanek') && localGovernment.includes('Marcel Pierel III'), 'Census 2020 and July 2025 facts; direct current office contacts');
check('Direct office provenance and expiry', (localGovernment.match(/directVerifiedAt: '\d{4}-\d{2}-\d{2}'/g) ?? []).length >= 2 && countySection.includes('directAppraisalCurrent') && countySection.includes('directTaxCurrent'), 'Independent source dates, not fabricated Comptroller dates');
check('Brazoria current appraisal name and direct service links', ['Brazoria Central Appraisal District','https://esearch.brazoriacad.org/','https://brazoriacad.org/property-tax-exemption-forms/','https://brazoriacad.org/how-to-efile-a-protest/','https://tax.brazoriacountytx.gov/'].every(s => countySection.includes(s)), 'Official first-party resources');
if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
  try {
    const response = await fetch('https://texasdefined.com/api/property-tax-rates?county=brazoria', { signal: AbortSignal.timeout(25000) });
    const body = await response.json();
    const summary = body?.summary;
    const groups = ['county','cities','schoolDistricts','specialDistricts'];
    const valid = response.ok && body.ready === true && Number.isInteger(summary?.year) && groups.every(group => Array.isArray(summary?.[group]) && summary[group].length > 0 && summary[group].every(record => typeof record.name === 'string' && record.name.trim() && typeof record.slug === 'string' && record.slug.trim() && !record.slug.includes(String.fromCharCode(36))));
    check('Brazoria live property-tax API', !!valid, 'HTTP ' + response.status + '; finalized year ' + (summary?.year ?? 'missing') + '; group counts ' + groups.map(group => group + '=' + (summary?.[group]?.length ?? 'missing')).join(', '));
  } catch (error) { check('Brazoria live property-tax API', false, String(error)); }
  // Direct source checks run away from visitor request paths; drift is reported, not silently restamped.
  const civicSources = [
    ['https://bcsummerpassport.org/sites/', ['Alvin Historical Museum', 'Admission: $5, 12 and under free']],
    ['https://www.alvin.gov/482/Park-Rules', ['6:30 a.m. to 10:30 p.m.', 'designated parking areas', 'No overnight parking']],
    ['https://www.alvin.gov/Facilities/Facility/Details/National-Oak-Park-8', ['118 S Magnolia', 'Parking', 'Picnic Tables', 'Playground']],
    ['https://www.alvin.gov/Facilities/Facility/Details/Historic-Depot-Centre-and-Tom-Blakeney-J-1', ['200 Depot Centre Boulevard', '1907', '281-388-4299']],
    ['https://alvinmuseum.org/', ['300 West Sealy', '2813314469', '11am3pm', 'appointment']],
    ['https://www.census.gov/quickfacts/alvincitytexas', ['30,115','27,098','July 1, 2025']],
    ['https://www.census.gov/quickfacts/brazoriacountytexas', ['419,080','372,031','July 1, 2025']],
    ['https://brazoriacad.org/contact-us/', ['849-7792','help@brazoriacad.org','500 N Chenango St','Marcel Pierel III']],
    ['https://brazoriacad.org/administration/', ['Marcel Pierel']],
    ['https://tigerweb.geo.census.gov/tigerwebmain/Files/bas26/tigerweb_bas26_county_2020_tab20_tx.html', ['48039','Brazoria County','3530984446','635433878','29.1678175','95.4346470']],
    ['https://brazoriacad.org/', ['Brazoria Central Appraisal District','January 1, 2026']],
    ['https://tax.brazoriacountytx.gov/contact-en-us', ['BULANEK','864-1320','237 E. Locust']],
    ['https://esearch.brazoriacad.org/', ['Property Search']],
    ['https://brazoriacad.org/property-tax-exemption-forms/', ['Exemption']],
    ['https://brazoriacad.org/how-to-efile-a-protest/', ['Protest']],
  ];
  // Dated independent browser review of public official pages that refused CI HTTP
  // retrieval. Never treat this as a new live check, refresh its date automatically,
  // accept missing facts from an HTTP 200, or excuse a genuinely removed page.
  const independentEvidence = [
  [
    "https://www.alvin.gov/482/Park-Rules",
    "2026-11-28T02:39:38.967Z",
    "Park Rules | Alvin, TX",
    [
      "6:30 a.m. to 10:30 p.m.",
      "designated parking areas",
      "No overnight parking"
    ]
  ],
  [
    "https://www.alvin.gov/Facilities/Facility/Details/National-Oak-Park-8",
    "2026-11-28T02:39:39.992Z",
    "Facilities • National Oak Park",
    [
      "118 S Magnolia",
      "Parking",
      "Picnic Tables",
      "Playground"
    ]
  ],
  [
    "https://www.alvin.gov/Facilities/Facility/Details/Historic-Depot-Centre-and-Tom-Blakeney-J-1",
    "2026-11-28T02:39:39.919Z",
    "Facilities • Historic Depot Centre and Tom Blakeney Jr Hike",
    [
      "200 Depot Centre Boulevard",
      "1907",
      "281-388-4299"
    ]
  ],
  [
    "https://www.census.gov/quickfacts/alvincitytexas",
    "2026-11-28T02:39:38.599Z",
    "U.S. Census Bureau QuickFacts: Alvin city, Texas",
    [
      "30,115",
      "27,098",
      "July 1, 2025"
    ]
  ],
  [
    "https://www.census.gov/quickfacts/brazoriacountytexas",
    "2026-11-28T02:39:39.070Z",
    "U.S. Census Bureau QuickFacts: Brazoria County, Texas",
    [
      "419,080",
      "372,031",
      "July 1, 2025"
    ]
  ],
  [
    "https://tax.brazoriacountytx.gov/contact-en-us",
    "2026-11-28T02:39:38.066Z",
    "Brazoria County",
    [
      "BULANEK",
      "864-1320",
      "237 E. Locust"
    ]
  ]
];
  const comparable = value => value.toLowerCase().replace(/[^a-z0-9]/g, '');
  const missingMarkers = (visible, markers) => markers.filter(marker => !comparable(visible).includes(comparable(marker)));
  const evidenceFor = (url, markers) => independentEvidence.find(([sourceUrl, checkedAt, title, observed]) => {
    const age = Date.now() - Date.parse(checkedAt);
    return sourceUrl === url && title && age >= 0 && age < 30 * 86400000 &&
      markers.every(marker => observed.some(value => comparable(value) === comparable(marker)));
  });
  // Try ordinary browser navigation when the scheduled HTTP client cannot read a
  // public source. Do not spoof authentication or bypass a login or CAPTCHA.
  let sourceBrowser;
  const readSourceInBrowser = async (url) => {
    if (!process.env.CHROME_BIN) return null;
    try {
      if (!sourceBrowser) {
        const { createRequire } = await import('node:module');
        const { chromium } = createRequire(import.meta.url)('/tmp/td-alvin-browser/node_modules/playwright-core');
        sourceBrowser = await chromium.launch({ executablePath: process.env.CHROME_BIN, headless: true });
      }
      const page = await sourceBrowser.newPage();
      try {
        const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        return { status: response?.status() ?? 0, visible: await page.locator('body').innerText({timeout: 10000}) };
      } finally { await page.close(); }
    } catch (error) { return { status: 0, visible: '', error: String(error) }; }
  };
  try {
    // Sequential browser fallback avoids concurrent launches; direct source checks
    // use the original URL and retain the direct status in the dated artifact.
    for (const [url, markers] of civicSources) {
      const name = 'Brazoria civic source ' + url;
      let directStatus = 0;
      let directError = '';
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(12000), headers: {'user-agent':'TexasDefined scheduled source integrity check/1.0'} });
        directStatus = response.status;
        if (response.ok) {
          const visible = normalize((await response.text()).replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ').replace(/<[^>]*>/g, ' '));
          const missing = missingMarkers(visible, markers);
          check(name, missing.length === 0, 'Fresh HTTP ' + response.status + (missing.length ? '; missing markers: ' + missing.join(', ') : '; all markers verified'));
          continue;
        }
      } catch (error) { directError = String(error); }
      const browser = await readSourceInBrowser(url);
      if (browser?.status >= 200 && browser.status < 300) {
        const missing = missingMarkers(browser.visible, markers);
        check(name, missing.length === 0, 'Fresh Chrome HTTP ' + browser.status + '; direct HTTP ' + directStatus + (missing.length ? '; missing markers: ' + missing.join(', ') : '; all markers verified'));
        continue;
      }
      // A previous independently successful public-source review can corroborate
      // a recent access denial, not a 404/410 or a successful response with drift.
      const blocked = [401, 403, 429].includes(directStatus) && ![404, 410].includes(browser?.status);
      const evidence = blocked ? evidenceFor(url, markers) : undefined;
      if (evidence) {
        check(name, true, 'Independent dated browser evidence (not a fresh CI retrieval): ' + evidence[1] + '; ' + evidence[2] + '; all required markers verified; direct HTTP ' + directStatus + '; Chrome HTTP ' + (browser?.status ?? 'not available') + '; recheck required within 30 days');
      } else {
        check(name, false, 'Direct HTTP ' + directStatus + '; Chrome HTTP ' + (browser?.status ?? 'not available') + '; source needs independent review; ' + directError + ' ' + (browser?.error ?? ''));
      }
    }
  } finally { if (sourceBrowser) await sourceBrowser.close(); }
  targets.push({
    path: '/destination/alvin-historical-museum',
    phrases: ['Nolan Ryan', 'Loren Mozley', 'Emigrants at Nightfall', 'Slover'],
    links: ['/city/alvin', '/county/brazoria', '/texas-icons/nolan-ryan'],
    schema: 'Museum',
  });
}
for (const target of targets) {
  const url = 'https://texasdefined.com' + target.path;
  try {
    const response = await fetch(url + '?alvin-authority=' + (process.env.GITHUB_SHA?.slice(0,12) ?? 'manual'), {
      headers: { 'user-agent': 'TexasDefined scheduled source integrity check/1.0', 'cache-control': 'no-cache' },
      signal: AbortSignal.timeout(25000),
    });
    const html = await response.text();
    const visible = normalize(html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, ' ').replace(/<[^>]*>/g, ' '));
    check(url + ' HTTP', response.ok, 'HTTP ' + response.status);
    check(url + ' canonical', [...html.matchAll(/<link\b[^>]*>/gi)].some(([tag]) => /\brel=["']canonical["']/i.test(tag) && tag.match(/\bhref=["']([^"']+)["']/i)?.[1] === url), 'Self canonical');
    check(url + ' indexable', !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html), 'No robots noindex');
    // The PR verifies researched source content before it is published. On the
    // quarterly production run, additionally require the new bridge section.
    const requiredPhrases = process.env.GITHUB_EVENT_NAME === 'pull_request'
      ? target.phrases : target.path.startsWith('/destination/') ? target.phrases : [...target.phrases, 'Maury Maverick Bridge', 'Loren Mozley'];
    for (const phrase of requiredPhrases) check(url + ' phrase ' + phrase, visible.includes(phrase), 'Visible page data');
    const anchors = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
    for (const link of target.links) check(url + ' link ' + link, anchors.includes(link) || anchors.includes('https://texasdefined.com' + link), 'Rendered reciprocal link');
    if (target.path === '/city/alvin' && process.env.GITHUB_EVENT_NAME !== 'pull_request') {
      check(url + ' current Census estimate', visible.includes('27,098') && visible.includes('30,115') && visible.includes('July 1, 2025'), 'Rendered dated estimate distinct from decennial count');
    }
    if (target.path === '/city/alvin' && process.env.GITHUB_EVENT_NAME !== 'pull_request') {
      check(url + ' municipal visitor logistics', ['118 S. Magnolia', '200 Depot Centre Boulevard', '300 W. Sealy', '6:30 a.m. to 10:30 p.m.','designated parking'].every(marker => visible.includes(marker)) && anchors.includes('https://www.alvin.gov/482/Park-Rules'), 'Park hours are not interior opening hours; municipal source link');
    }
    if (target.path === '/county/brazoria' && process.env.GITHUB_EVENT_NAME !== 'pull_request') {
      check(url + ' verified civic facts', visible.includes('372,031') && visible.includes('419,080') && visible.includes('Brazoria Central Appraisal District'), 'Current Census estimate and appraisal district name');
      check(url + ' direct office contacts', ['Marcel Pierel III','979-849-7792','Kristin R. Bulanek','979-864-1320','Official appraisal district contact details','Official tax office contact details'].every(s=>visible.includes(s)), 'Dated contact facts must actually render; expired or missing facts require editorial review');
      for (const official of ['https://esearch.brazoriacad.org/','https://brazoriacad.org/property-tax-exemption-forms/','https://brazoriacad.org/how-to-efile-a-protest/','https://tax.brazoriacountytx.gov/']) check(url + ' official service ' + official, anchors.includes(official), 'Rendered direct service link');
    }
    if (target.path === '/destination/alvin-historical-museum' && process.env.GITHUB_EVENT_NAME !== 'pull_request') check(url + ' dated admission evidence', visible.includes('2026') && visible.includes('$5') && visible.includes('12 and under') && anchors.includes('https://bcsummerpassport.org/sites/'), 'Dated sourced price, not guaranteed current tariff');
    if (target.path.startsWith('/destination/')) check(url + ' no editorial instruction', !/Explain the difference between the main historic museum/.test(visible), 'No internal editorial language');
    if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
      for (const id of ['25635261034', '26147334682', '5822129305']) check(url + ' photograph ' + id, html.includes(id), 'Visible page includes exact archival record');
      check(url + ' photograph credits', visible.includes('DeGolyer Library') && visible.includes('No known copyright restrictions'), 'Reader-visible archival attribution');
    }
    const nodes = [...html.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(m => {
      try { const value = JSON.parse(m[1]); return Array.isArray(value) ? value : value['@graph'] ?? [value]; }
      catch { return []; }
    });
    check(url + ' JSON-LD ' + target.schema, nodes.some(node => [node?.['@type']].flat().includes(target.schema)), 'Parsed structured entity (including multi-type Museum/TouristAttraction)');
  } catch (error) {
    check(url + ' retrieval', false, String(error));
  }
}
if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
  for (const [sitemap, paths] of [
    ['/sitemap.xml', ['/city/alvin', '/county/brazoria']],
    ['/sitemap-explore.xml', ['/destination/alvin-historical-museum']],
  ]) {
    try {
      const response = await fetch('https://texasdefined.com' + sitemap, { signal: AbortSignal.timeout(30000), headers: { 'cache-control': 'no-cache' } });
      const xml = await response.text();
      for (const path of paths) {
        const entries = [...xml.matchAll(/<url\b[^>]*>[\s\S]*?<\/url>/gi)].map(m => m[0]).filter(row => row.includes('<loc>https://texasdefined.com' + path + '</loc>'));
        const date = entries[0]?.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/)?.[1];
        check('Sitemap ' + path, response.ok && entries.length === 1 && !!date && date >= '2026-11-24', 'Unique canonical with actual editorial lastmod; observed ' + (date ?? 'missing'));
      }
    } catch(error) { check('Sitemap ' + sitemap, false, String(error)); }
  }
}
await mkdir('artifacts/alvin-brazoria-authority', { recursive: true });
await writeFile('artifacts/alvin-brazoria-authority/latest.json', JSON.stringify({
  checkedAt: new Date().toISOString(),
  scope: targets.map((target) => target.path),
  passed: checks.filter(c=>c.passed).length,
  failed: checks.filter(c=>!c.passed),
  checks,
}, null, 2) + '\n');
for (const result of checks) console.log((result.passed ? 'PASS' : 'FAIL') + ' ' + result.name + ': ' + result.detail);
if (checks.some((result) => !result.passed)) process.exitCode = 1;
