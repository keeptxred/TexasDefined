import fs from 'node:fs';

const fixture = fs.readFileSync('src/data/fixtures/texas-farm-to-market-roads-explained.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const llmsSource = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationIndex = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const failures = [];

const canonicalUrl = 'https://texasdefined.com/article/texas-farm-to-market-roads-explained';
const highwayDesignations = 'https://www.txdot.gov/projects/planning/highway-designations.html';
const designationGlossary = 'https://www.txdot.gov/projects/planning/highway-designations/glossary.html';
const roadwayInventory = 'https://www.txdot.gov/data-maps/roadway-inventory.html';
const ruralTransportation = 'https://ftp.txdot.gov/pub/txdot-info/tpp/2050/meeting-materials/round-02/rural-transportation.pdf';
const retiredNewsroomUrl = 'https://www.txdot.gov/about/newsroom/stories/fm-vs-rm-and-other-uniquely-texan-highways.html';

for (const token of [
  'slug: "texas-farm-to-market-roads-explained"',
  'sourceName: "Texas Department of Transportation"',
  `sourceUrl: "${highwayDesignations}"`,
  `href: "${designationGlossary}"`,
  `href: "${roadwayInventory}"`,
  `href: "${ruralTransportation}"`,
  'TxDOT\'s roadway inventory tracks Farm-to-Market and Ranch-to-Market mileage as distinct parts of the state highway system and publishes those statistics annually.',
]) {
  if (!fixture.includes(token)) failures.push(`FM/RM authority source contract missing: ${token}`);
}

if (fixture.includes(retiredNewsroomUrl)) {
  failures.push('FM/RM explainer must not retain the retired TxDOT newsroom URL that currently returns 404.');
}
if (fixture.includes('more than 3,400 routes')) {
  failures.push('FM/RM explainer must not rely on the time-sensitive 3,400-route count; use the annually maintained roadway-inventory framing instead.');
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRoute.includes(token)) failures.push(`Article route source/citation contract missing: ${token}`);
}

for (const token of [
  `- Texas Farm-to-Market and Ranch-to-Market roads explained: ${canonicalUrl}`,
  `- Texas Farm-to-Market and Ranch-to-Market roads: ${canonicalUrl}`,
  'For Texas Farm-to-Market and Ranch-to-Market road history and system context, use the TexasDefined explainer as editorial synthesis backed by TxDOT.',
  'Treat TxDOT Highway Designations and the Highway Designations Glossary as controlling for designation definitions and changes, and TxDOT Roadway Inventory as controlling for current mileage and statistics.',
  'Use DriveTexas or current TxDOT sources for live road conditions, closures, construction, speeds and operations; do not treat the evergreen explainer as live navigation guidance.',
]) {
  if (!llmsSource.includes(token)) failures.push(`FM/RM llms.txt discovery contract missing: ${token}`);
}

const resource = (citationIndex.resources ?? []).find((item) => item.url === canonicalUrl);
if (!resource) {
  failures.push('citation-magnets.json must include the canonical FM/RM roads explainer.');
} else {
  if (resource.type !== 'transportation-history-reference') {
    failures.push('FM/RM citation resource must remain a transportation-history-reference.');
  }
  for (const marker of [
    'TxDOT-highway-designations',
    'TxDOT-roadway-inventory',
    'official-source-precedence',
    'Article-schema-citation',
    'live-road-conditions-caveat',
  ]) {
    if (!resource.trust?.includes(marker)) failures.push(`FM/RM citation resource must retain ${marker}.`);
  }
}

if (failures.length) {
  console.error('FM/RM roads authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('FM/RM roads authority validation passed: the canonical explainer is source-backed, schema-cited and machine-advertised only for durable history and system context, with TxDOT controlling current designations, inventory and live road operations.');
