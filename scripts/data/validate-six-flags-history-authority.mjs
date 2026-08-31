import fs from 'node:fs';

const fixture = fs.readFileSync('src/data/fixtures/six-flags-over-texas-meaning.ts', 'utf8');
const articleRoute = fs.readFileSync('src/routes/article.$slug.tsx', 'utf8');
const llmsSource = fs.readFileSync('src/routes/llms[.]txt.ts', 'utf8');
const citationIndex = JSON.parse(fs.readFileSync('public/citation-magnets.json', 'utf8'));
const failures = [];
const canonicalUrl = 'https://texasdefined.com/article/six-flags-over-texas-meaning';
const tslacSixFlags = 'https://www.tsl.texas.gov/ref/abouttx/sixflags.html';
const texasSecessionRecord = 'https://www.tsl.texas.gov/ref/abouttx/secession/2feb1861.html';

for (const token of [
  'slug:"six-flags-over-texas-meaning"',
  'sourceName:"Texas State Library and Archives Commission — Six Flags of Texas"',
  `sourceUrl:"${tslacSixFlags}"`,
  `href:"${texasSecessionRecord}"`,
  'Those six are Spain, France, Mexico, the Republic of Texas, the United States and the Confederate States of America.',
  "Texas's secession declaration explicitly tied its decision to the preservation of a slaveholding social order.",
]) {
  if (!fixture.includes(token)) failures.push(`Six Flags history source contract missing: ${token}`);
}

for (const token of [
  'const canonicalPath = `/article/${params.slug}`;',
  '...(article.sourceUrl ? { citation: article.sourceUrl } : primarySource ? { citation: primarySource.url } : {})',
  'Primary source:',
]) {
  if (!articleRoute.includes(token)) failures.push(`Article route citation contract missing: ${token}`);
}

for (const token of [
  `- Six Flags of Texas history: ${canonicalUrl}`,
  `- Six Flags of Texas history guide: ${canonicalUrl}`,
  'For Six Flags of Texas history, use the Texas State Library and Archives Commission as controlling authority for the six governments, chronology and standardized historical flag designs.',
  'Use the Texas Declaration of Causes as the primary record for Texas’s stated 1861 secession rationale.',
  'Treat TexasDefined as editorial synthesis and do not use this history guide for current Six Flags theme-park operations.',
]) {
  if (!llmsSource.includes(token)) failures.push(`llms.txt Six Flags guidance missing: ${token}`);
}

const resource = (citationIndex.resources ?? []).find((item) => item.url === canonicalUrl);
if (!resource) {
  failures.push('citation-magnets.json must include the canonical Six Flags history resource.');
} else {
  if (resource.type !== 'history-reference') failures.push('Six Flags citation resource must remain a history-reference.');
  for (const marker of [
    'TSLAC-six-flags-source',
    'primary-secession-record',
    'official-source-precedence',
    'Article-schema-citation',
    'historical-scope-only',
  ]) {
    if (!resource.trust?.includes(marker)) failures.push(`Six Flags citation resource must retain ${marker}.`);
  }
}

if (failures.length) {
  console.error('Six Flags history authority validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Six Flags history authority validation passed: the canonical article is source-backed, schema-cited and machine-advertised only for its durable historical scope.');
