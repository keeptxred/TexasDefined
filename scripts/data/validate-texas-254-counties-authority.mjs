import fs from 'node:fs';

const fixture = fs.readFileSync('src/data/fixtures/why-texas-has-254-counties.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const failures = [];

const countyHistory = 'https://www.tshaonline.org/handbook/entries/county-organization';
const constitutionArticleNine = 'https://statutes.capitol.texas.gov/Docs/CN/pdf/CN.9.pdf';
const countySeatLaw = 'https://statutes.capitol.texas.gov/Docs/LG/pdf/LG.73.pdf';
const texasLocalGovernment = 'https://www.texas.gov/local-government-resources/';
const countySeatDirectory = 'https://www.tsl.texas.gov/ref/abouttx/countyseats.html';

for (const token of [
  'slug: "why-texas-has-254-counties"',
  'sourceName: "Texas State Historical Association — County Organization"',
  `sourceUrl: "${countyHistory}"`,
  `href: "${constitutionArticleNine}"`,
  `href: "${countySeatLaw}"`,
  `href: "${texasLocalGovernment}"`,
  `href: "${countySeatDirectory}"`,
  'The Handbook of Texas traces Texas county government back to 23 Spanish-Mexican municipalities at independence in 1836; under the Republic those municipalities became counties, and by 1845 Texas had 36 regular counties.',
  'Texas has had 254 counties since the organization of Loving County in 1931, according to the Handbook of Texas.',
  'Article IX of the Texas Constitution protects a county seat located within five miles of the county\'s geographic center from removal except by a two-thirds vote',
  'The Local Government Code carries the same principle into the organization of a new county',
]) {
  if (!fixture.includes(token)) failures.push(`254 Counties source contract missing: ${token}`);
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRoute.includes(token)) failures.push(`Article route source/citation contract missing: ${token}`);
}

if (failures.length) {
  console.error('Texas 254 Counties authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas 254 Counties authority validation passed: the explainer preserves TSHA county-history provenance, official Texas county-seat law and the canonical Article citation contract.');
