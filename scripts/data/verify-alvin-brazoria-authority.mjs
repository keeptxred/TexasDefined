// Monthly production/source consistency review for Alvin, Brazoria County and Alvin Historical Museum.
// This is an audit, not a content publisher. Reports failures for editorial follow-up.
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const targets = [
  {
    path: '/city/alvin',
    phrases: ['Alvin Morgan', 'Froberg', 'Bob Briscoe Park', 'Nolan Ryan', '1907'],
    links: ['/county/brazoria', '/destination/alvin-historical-museum'],
    schema: '"@type":"City"',
  },
  {
    path: '/county/brazoria',
    phrases: ['Alvin', 'Lake Jackson', 'West Columbia', "Froberg", 'Bob Briscoe Park', 'Nolan Ryan'],
    links: ['/city/alvin', '/destination/alvin-historical-museum'],
    schema: '"@type":"AdministrativeArea"',
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
check('Museum visitor copy', !!museumRecord && !!museumDossier && !/Explain the difference|its exhibi"|inventing a fr"/.test(museumRecord + museumDossier), 'No known truncated text or editorial instruction');
const photos = await readFile('src/components/editorial/AlvinHistoricalPhotographs.tsx', 'utf8');
for (const id of ['25635261034', '26147334682', '5822129305']) check('Alvin photograph source ' + id, photos.includes(id), 'Exact archival original');
check('Alvin photo delivery and attribution', photos.includes('/media/remote?url=') && photos.includes('DeGolyer Library') && photos.includes('No known copyright restrictions') && photos.includes('CC BY 2.0'), 'First-party broker with explicit source and rights captions');
const manifest = JSON.parse(await readFile('public/museum-verification-manifest.json', 'utf8'));
const museum = manifest.museums.find(x => x.path === '/destination/alvin-historical-museum');
check('Museum source review contract', museum?.cadenceDays <= 30 && museum?.faqCount >= 10 && museum?.sources.some(x => x.sourceUrl.includes('tour-18_emigrants')), 'Monthly source manifest and researched questions');
if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
  targets.push({
    path: '/destination/alvin-historical-museum',
    phrases: ['Nolan Ryan', 'Loren Mozley', 'Emigrants at Nightfall', 'Slover'],
    links: ['/city/alvin', '/county/brazoria', '/texas-icons/nolan-ryan'],
    schema: '"@type":"Museum"',
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
    for (const link of target.links) check(url + ' link ' + link, html.includes(link), 'Reciprocal editorial link');
    if (target.path.startsWith('/destination/')) check(url + ' no editorial instruction', !/Explain the difference between the main historic museum/.test(visible), 'No internal editorial language');
    if (process.env.GITHUB_EVENT_NAME !== 'pull_request') {
      for (const id of ['25635261034', '26147334682', '5822129305']) check(url + ' photograph ' + id, html.includes(id), 'Visible page includes exact archival record');
      check(url + ' photograph credits', visible.includes('DeGolyer Library') && visible.includes('No known copyright restrictions'), 'Reader-visible archival attribution');
    }
    const compact = html.replace(/\s+/g, '');
    check(url + ' JSON-LD ' + target.schema, compact.includes(target.schema), 'Structured entity');
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
