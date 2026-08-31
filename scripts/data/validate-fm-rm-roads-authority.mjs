import fs from 'node:fs';

const fixture = fs.readFileSync('src/data/fixtures/texas-farm-to-market-roads-explained.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const failures = [];

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

if (failures.length) {
  console.error('FM/RM roads authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('FM/RM roads authority validation passed: the explainer uses live durable TxDOT sources, annual roadway-inventory framing and the existing Article citation contract.');