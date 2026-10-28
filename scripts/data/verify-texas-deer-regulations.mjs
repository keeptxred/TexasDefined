import fs from 'node:fs';

const sourcePath = 'src/data/hunting/authority-deer.ts';
const pageUrl = 'https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer';
const source = fs.readFileSync(sourcePath, 'utf8');

// Local contract is always checked, including on PRs without external networking.
for (const marker of [
  'reviewedOn: "2026-10-28"',
  'October 3–November 6, 2026',
  'January 3, 2027',
  'January 17, 2027',
  'within 24 hours',
  'within 48 hours',
  'Texas Hunt & Fish',
  'TPWD regional study: rut in white-tailed deer',
  pageUrl,
]) {
  if (!source.includes(marker)) throw new Error('Texas deer authority missing checked editorial fact/source: ' + marker);
}

if (process.argv.includes('--offline')) {
  console.log('Deer authority source/season editorial contract passed (offline; no live TPWD check).');
  process.exit(0);
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:nbsp|#160);/gi, ' ')
    .replace(/&(?:ndash|mdash|minus|#8211|#8212);/gi, '-')
    .replace(/[–—−]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

const response = await fetch(pageUrl, {
  headers: { 'user-agent': 'TexasDefined-deer-regulation-review/1.0 (editorial monitoring)' },
  signal: AbortSignal.timeout(25_000),
});
if (!response.ok) throw new Error('TPWD deer page fetch failed: HTTP ' + response.status + '. Verify availability manually.');
const body = visibleText(await response.text());
if (body.length < 1500) throw new Error('TPWD deer page returned too little content for trustworthy checks.');

const expected = [
  '2026-2027',
  'Archery Only',
  'Oct. 3',
  'Nov. 6, 2026',
  'Nov. 7, 2026',
  'Jan. 3, 2027',
  'Jan. 17, 2027',
  'Jan. 18',
  'Jan. 31, 2027',
  'Statewide Bag Limits',
  'Mandatory Harvest Reporting',
  'Special Antler Restrictions',
  'Chronic Wasting Disease',
];
const missing = expected.filter((snippet) => !body.includes(snippet));
if (missing.length) {
  throw new Error('TPWD deer regulations need an editor review; expected official facts/headings missing or changed: ' + missing.join(', '));
}
console.log('TPWD deer spot-check passed: 2026–27 season calendar and core regulation sections remain present. This does NOT attest that every county rule or prose change is unchanged; do not automatically update lastVerified.');
