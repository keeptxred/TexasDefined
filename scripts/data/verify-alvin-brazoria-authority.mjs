// Quarterly production/source consistency review for Alvin and Brazoria County.
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
for (const target of targets) {
  const url = 'https://texasdefined.com' + target.path;
  try {
    const response = await fetch(url, {
      headers: { 'user-agent': 'TexasDefined scheduled source integrity check/1.0', 'cache-control': 'no-cache' },
      signal: AbortSignal.timeout(25000),
    });
    const html = await response.text();
    const visible = normalize(html);
    check(url + ' HTTP', response.ok, 'HTTP ' + response.status);
    check(url + ' canonical', html.includes('https://texasdefined.com' + target.path) && /rel=["']canonical["']/.test(html), 'Self canonical');
    check(url + ' indexable', !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html), 'No robots noindex');
    // The PR verifies researched source content before it is published. On the
    // quarterly production run, additionally require the new bridge section.
    const requiredPhrases = process.env.GITHUB_EVENT_NAME === 'pull_request'
      ? target.phrases : [...target.phrases, 'Maury Maverick Bridge'];
    for (const phrase of requiredPhrases) check(url + ' phrase ' + phrase, visible.includes(phrase), 'Visible page data');
    for (const link of target.links) check(url + ' link ' + link, html.includes(link), 'Reciprocal editorial link');
    const compact = html.replace(/\s+/g, '');
    check(url + ' JSON-LD ' + target.schema, compact.includes(target.schema), 'Structured entity');
  } catch (error) {
    check(url + ' retrieval', false, String(error));
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
