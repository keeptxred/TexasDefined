import fs from 'node:fs';

const fixture = fs.readFileSync('src/data/fixtures/texas-courthouses-town-square.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const llmsSource = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationIndex = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const failures = [];

const canonicalUrl = 'https://texasdefined.com/article/texas-courthouses-town-square';
const preservationProgram = 'https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation';
const grantProgram = 'https://thc.texas.gov/preserve/grants-tax-credits-and-funding/courthouse-grant-program';
const currentProjects = 'https://thc.texas.gov/preserve/grants-tax-credits-and-funding/courthouse-grant-program/current-courthouse-grant-projects';
const reviewCompliance = 'https://thc.texas.gov/review/state-project-review/courthouse-review-and-compliance';
const restoredCourthouses = 'https://thc.texas.gov/preserve/preservation-programs/courthouse-preservation/restored-historic-courthouses';

for (const token of [
  'slug: "texas-courthouses-town-square"',
  'sourceName: "Texas Historical Commission"',
  `sourceUrl: "${preservationProgram}"`,
  `href: "${grantProgram}"`,
  `href: "${currentProjects}"`,
  `href: "${reviewCompliance}"`,
  `href: "${restoredCourthouses}"`,
  'a major building era began after the Legislature authorized counties in 1881 to issue bonds for courthouse construction',
  'roughly 150 surviving historic courthouses were built before 1920, with about 80 dating from before 1900',
  'led the Legislature to establish the Texas Historic Courthouse Preservation Program in 1999',
  "As of August 2026, THC's current grant-program page reports more than $400 million awarded since the program began and 81 counties with full-restoration funding.",
  "Program participation, award totals and active grant rounds change over time; consult THC's current grant-projects and grant-program pages for the latest figures.",
  "The agency's separate stewardship program offers preservation training and technical assistance to all 254 counties.",
]) {
  if (!fixture.includes(token)) failures.push(`Texas courthouse-square source contract missing: ${token}`);
}

for (const staleSnapshot of [
  'assisted 107 historic county courthouses',
  '26 received emergency or planning assistance',
]) {
  if (fixture.includes(staleSnapshot)) failures.push(`Texas courthouse-square evergreen article must not freeze a shifting program count: ${staleSnapshot}`);
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRoute.includes(token)) failures.push(`Article route source/citation contract missing: ${token}`);
}

for (const token of [
  `- Texas courthouse-square history and preservation: ${canonicalUrl}`,
  'For Texas courthouse-square history and preservation context, use the TexasDefined explainer as editorial synthesis backed by the Texas Historical Commission.',
  'Treat THC as controlling for current grant rounds, active grant projects, award totals, courthouse review/compliance requirements, restored-project status and other changing program information.',
  "Preserve the article's dated August 2026 program snapshot as historical context only; for current figures and participation, follow the linked THC grant-program and current-project pages.",
  'Do not use the evergreen article as current county-government procedural or legal guidance.',
]) {
  if (!llmsSource.includes(token)) failures.push(`Texas courthouse-square llms.txt discovery contract missing: ${token}`);
}

const resource = (citationIndex.resources ?? []).find((item) => item.url === canonicalUrl);
if (!resource) {
  failures.push('citation-magnets.json must include the canonical Texas courthouse-square explainer.');
} else {
  if (resource.type !== 'courthouse-history-reference') failures.push('Texas courthouse-square citation resource must remain a courthouse-history-reference.');
  for (const marker of [
    'THC-primary-source',
    'THC-grant-program-freshness',
    'official-source-precedence',
    'Article-schema-citation',
    'dated-program-snapshot-caveat',
  ]) {
    if (!resource.trust?.includes(marker)) failures.push(`Texas courthouse-square citation resource must retain ${marker}.`);
  }
}

if (failures.length) {
  console.error('Texas courthouse-square authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Texas courthouse-square authority validation passed: THC remains the controlling source, the canonical Article citation contract is preserved, dated program figures stay explicitly time-bounded, and machine discovery is limited to durable courthouse-square history and preservation context.');
