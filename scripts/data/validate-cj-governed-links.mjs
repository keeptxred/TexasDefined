import fs from 'node:fs';

const catalog = fs.readFileSync('src/data/cj-governed-links.server.ts', 'utf8');
const portfolio = fs.readFileSync('docs/affiliate-portfolio-economics.md', 'utf8');
const errors = [];

const requiredRexing = [
  '15735466','17315870','17315857','17315873','17315897','17315886','17315888','17315893',
  '17315876','17315880','15764166','17315896','15078418','15218435','16951431',
];
const requiredAbracadabra = [
  '17277658','17267156','17267160','17267167','17267169','17267170','17267171','17267172',
  '17267159','17267165','17267163',
];
const permanentlyExcludedAbracadabra = ['17267207','17267208','17267212','17267213'];
const forbiddenCampaignMarkers = [
  'Black Friday', 'BFCM', 'Memorial Day', 'Labor Day', 'July 4th', 'Mother\'s Day',
  'Father\'s Day', 'Cyber Week', 'New Year Sale', 'buy 1 get 1 free', 'buy 2 get 1 free',
];

for (const id of [...requiredRexing, ...requiredAbracadabra]) {
  if (!catalog.includes(`"${id}"`)) errors.push(`Governed CJ Link ID ${id} is missing.`);
}
for (const id of permanentlyExcludedAbracadabra) {
  if (catalog.includes(`"${id}"`)) errors.push(`Excluded Abracadabra Link ID ${id} must not enter the permanent catalog.`);
}
for (const marker of forbiddenCampaignMarkers) {
  if (catalog.toLowerCase().includes(marker.toLowerCase())) errors.push(`Permanent CJ catalog contains campaign marker: ${marker}.`);
}

const governedRecordCount = (catalog.match(/governed\("(?:rexing|abracadabra-nyc)"/g) || []).length;
if (governedRecordCount !== requiredRexing.length + requiredAbracadabra.length || !catalog.includes('activation: "tracking-required"')) {
  errors.push('Every governed Rexing/Abracadabra record must fail closed through the shared tracking-required constructor until exact CJ tracking output is supplied.');
}
if (catalog.includes('email.cj.com/')) errors.push('Governed CJ catalog must never contain shopper-facing CJ email wrappers.');
if (/trackingUrl\s*:|affiliateUrl\s*:|href\s*:/.test(catalog)) {
  errors.push('Governed catalog must not invent shopper tracking URLs from merchant destinations or Link IDs.');
}
if (!portfolio.includes('Do not hand-build advertiser tracking formats from a PID/AID')) {
  errors.push('Portfolio governance must preserve the no-hand-built-tracking rule.');
}
if (!portfolio.includes('Discount School Supply | Active CJ: 4%')) {
  errors.push('Discount School Supply current 4% term is not documented.');
}
if (!portfolio.includes('RVshare | Active CJ: 4% reservation')) {
  errors.push('RVshare current 4% reservation term is not documented.');
}
if (!portfolio.includes('Motel 6 / Studio 6 | Active CJ: 3%')) {
  errors.push('Motel 6 current 3% term is not documented.');
}
if (!portfolio.includes('CityPASS | Active CJ default 6%')) {
  errors.push('CityPASS current default 6% term is not documented.');
}

if (errors.length) {
  console.error('CJ governed affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`CJ governed affiliate validation passed: ${requiredRexing.length} Rexing and ${requiredAbracadabra.length} Abracadabra records are governed, campaign/duplicate links remain excluded, and activation fails closed until exact CJ tracking output is supplied.`);
