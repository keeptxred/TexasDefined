import assert from 'node:assert/strict';
import fs from 'node:fs';

// Structural source contract only; NEVER a substitute for production Chrome acceptance.
const team = fs.readFileSync('src/routes/texas-high-school-football-teams_.$slug.lazy.tsx','utf8');
const county = fs.readFileSync('src/routes/$kind.$slug.lazy.tsx','utf8');
const dossier = fs.readFileSync('docs/football-authority/BATCH013-FIRST-FIVE-COUNTIES.md','utf8');
const expected = [
 ['cuero','dewitt'],['cumby','hopkins'],['cushing','nacogdoches'],
 ['cy-fair','harris'],['cypress-creek','harris'],
];
const campusSection = team.split('const researchedCampusCounty: Record<string, string> = {')[1]?.split('\n  };')[0];
assert.ok(campusSection, 'missing explicit campus-county mapping');
const reciprocalSection = county.split('const supplementalFootballCountyLinks: Record<string, Array<{ name: string; slug: string; context: string }>> = {')[1]?.split('\n};')[0];
assert.ok(reciprocalSection, 'missing reciprocal county links');
for (const [slug,countySlug] of expected) {
 const mapMatches = [...campusSection.matchAll(new RegExp("'"+slug+"'\\s*:\\s*'"+countySlug+"'",'g'))];
 assert.equal(mapMatches.length,1,slug+' missing/duplicated campus-county mapping');
 const countyRow = reciprocalSection.match(new RegExp("'"+countySlug+"'\\s*:\\s*\\[([\\s\\S]*?)\\]\\s*,"));
 assert.ok(countyRow,countySlug+' missing county section');
 assert.ok(countyRow[1].includes("slug: '"+slug+"'"),slug+' missing reciprocal county entry');
 assert.ok(dossier.includes('`'+slug+'`'),slug+' missing source ledger');
}
console.log('PASS: Batch013 first-five explicit school-to-county and reciprocal county-to-school structural source contract (not Chrome certification)');

// Fail closed if the authored SSR guides disappear or silently fall back to generic
// directory data. This is source-level evidence only, never a browser certificate.
const editorial = fs.readFileSync('src/data/high-school-football/program-editorial-b013.ts','utf8');
const loader = fs.readFileSync('src/data/high-school-football/program-editorial-b013-loader.server.ts','utf8');
const server = fs.readFileSync('src/data/high-school-football/football-program-profile.server.ts','utf8');
const research = fs.readFileSync('docs/football-authority/BATCH013-FIRST-FIVE-SOURCES.md','utf8');
assert.match(server, /import \{ loadBatch013FootballProgramEditorial \} from '\.\/program-editorial-b013-loader\.server';/);
assert.match(server, /await loadBatch013FootballProgramEditorial\(canonicalSlug\)/);
assert.match(loader, /import\('\.\/program-editorial-b013'\)/);
for (const [slug] of expected) {
  assert.ok(research.includes('\x60'+slug+'\x60'),slug+' missing first-party research dossier');
  assert.ok(loader.includes("'"+slug+"'"),slug+' not gated in SSR loader');
  assert.ok(editorial.includes('"'+slug+'": {'),slug+' missing distinct authored editorial');
  const entry = editorial.split('"'+slug+'": {')[1]?.split(/\n  "[a-z][a-z-]+": \{/)[0];
  assert.ok(entry?.includes('"sourceUrl"') && entry.includes('"verifiedAt"'),slug+' missing dated official source');
  assert.ok(entry?.includes('"milestones"') && entry.includes('"faq"'),slug+' missing original dated context or visitor FAQ');
}
console.log('PASS: Batch013 first-five SSR source dossier/loader/editorial contract (NOT production Chrome acceptance)');

// Regression guard: distinct pages must not collapse back to identical template
// overview paragraphs. This is deliberately content-sensitive, not a word count.
const parsedEditorial = JSON.parse(editorial.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/)?.[1] ?? 'null');
assert.ok(parsedEditorial, 'unable to parse Batch013 authored editorial object');
const openingParagraphs = new Set();
for (const [slug] of expected) {
  const guide = parsedEditorial[slug];
  assert.ok(guide && Array.isArray(guide.overview) && guide.overview.length >= 3, slug+' missing meaningful authored overview');
  const lead = guide.overview[0].trim().replace(/\s+/g, ' ').toLowerCase();
  assert.ok(lead.length > 90, slug+' first overview paragraph lacks school-specific substance');
  assert.ok(!openingParagraphs.has(lead), slug+' duplicates another school guide lead');
  openingParagraphs.add(lead);
}
console.log('PASS: Batch013 first-five editorial leads are distinct and substantive (source contract only)');


// Batch013 regression: all additional *authored* groups must remain connected to
// the SSR loader and retain distinct source-dated school-specific editorial.
// This is not a county-link assertion or production Chrome certification.
const laterGroups = [
  ['src/data/high-school-football/program-editorial-b013-group2.ts',
    ['cypress-falls','cypress-lakes','cypress-park','cypress-ranch','cypress-ridge'],
    'getBatch013SecondFiveEditorial'],
  ['src/data/high-school-football/program-editorial-b013-group3.ts',
    ['cypress-springs','cypress-woods','daingerfield','dalhart'],
    'getBatch013ThirdGroupEditorial'],
  ['src/data/high-school-football/program-editorial-b013-group4.ts',
    ['dallas-a','dallas-adams','dallas-adamson','dallas-carter','dallas-conrad'],
    'getBatch013DallasFiveEditorial'],
  ['src/data/high-school-football/program-editorial-b013-group5.ts',
    ['dallas-highland-park','dallas-hillcrest','dallas-jefferson'],
    'getBatch013FinalSixFirstThreeEditorial'],
  ['src/data/high-school-football/program-editorial-b013-group6.ts',
    ['dallas-gateway-charter-academy','dallas-hutchins','dallas-jesuit'],
    'getBatch013FinalThreeEditorial'],
];
const laterLeads = new Set(openingParagraphs);
const allAuthoredSlugs = new Set(expected.map(([slug]) => slug));
for (const [file, slugs, getter] of laterGroups) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/const EDITORIAL: Record<string, FootballProgramEditorial> = (\{[\s\S]*?\});/);
  assert.ok(match, file+' missing parseable editorial map');
  const guides = JSON.parse(match[1]);
  assert.equal(Object.keys(guides).length, slugs.length, file+' unexpected or missing authored school');
  assert.ok(loader.includes('./'+file.split('/').pop().replace('.ts','')), file+' not imported by SSR loader');
  assert.ok(source.includes('export function '+getter), file+' missing exported getter');
  for (const slug of slugs) {
    assert.ok(!allAuthoredSlugs.has(slug), slug+' authored in multiple Batch013 groups');
    allAuthoredSlugs.add(slug);
    const guide = guides[slug];
    assert.ok(guide && guide.slug === slug, slug+' missing canonical editorial identity');
    assert.ok(loader.includes("'"+slug+"'"), slug+' missing SSR loader gate');
    assert.ok(guide.schedule?.sourceUrl?.startsWith('https://'), slug+' missing official schedule link');
    assert.ok(guide.schedule?.verifiedAt, slug+' missing source verification date');
    assert.ok(Array.isArray(guide.overview) && guide.overview.length >= 3, slug+' missing distinct overview');
    assert.ok(Array.isArray(guide.faq) && guide.faq.length >= 2, slug+' missing visitor questions');
    const lead = guide.overview[0].trim().replace(/\s+/g,' ').toLowerCase();
    assert.ok(lead.length > 90, slug+' missing school-specific substance');
    assert.ok(!laterLeads.has(lead), slug+' duplicated another Batch013 lead');
    laterLeads.add(lead);
  }
}
console.log('PASS: Batch013 additional 20 authored SSR guides retain distinct, dated source editorial (NOT Chrome certification)');

const dallasLedger = fs.readFileSync('docs/football-authority/BATCH013-DALLAS-CAMPUS-COUNTIES.md','utf8');
const dallasCountyRow = reciprocalSection.match(/'dallas'\s*:\s*\[([\s\S]*?)\]\s*,/);
assert.ok(dallasCountyRow, 'Dallas County reciprocal section missing');
for (const slug of ['dallas-gateway-charter-academy','dallas-highland-park','dallas-hillcrest','dallas-hutchins','dallas-jefferson','dallas-jesuit']) {
  assert.equal([...campusSection.matchAll(new RegExp("'"+slug+"'\\s*:\\s*'dallas'",'g'))].length,1,slug+' missing unique Dallas campus mapping');
  assert.ok(dallasCountyRow[1].includes("slug: '"+slug+"'"),slug+' missing reciprocal Dallas County entry');
  assert.ok(dallasLedger.includes('`'+slug+'`'),slug+' missing first-party campus address evidence');
}
console.log('PASS: six first-party/NCES-sourced Dallas campus and reciprocal county links (NOT Chrome acceptance)');

assert.equal(allAuthoredSlugs.size,25,'Batch013 requires exactly 25 distinct authored school identities');

// Source-backed school-campus-to-county reciprocal link coverage, not stadium gate evidence.
const cfisdLedger = fs.readFileSync('docs/football-authority/BATCH013-CFISD-SEVEN-CAMPUS-COUNTIES.md','utf8');
const harrisCountyRow = reciprocalSection.match(/'harris'\s*:\s*\[([\s\S]*?)\]\s*,/);
assert.ok(harrisCountyRow,'Harris County reciprocal section missing');
for (const slug of ["cypress-falls","cypress-lakes","cypress-park","cypress-ranch","cypress-ridge","cypress-springs","cypress-woods"]) {
  assert.equal([...campusSection.matchAll(new RegExp("'"+slug+"'\\s*:\\s*'harris'",'g'))].length,1,slug+' missing unique Harris campus mapping');
  assert.ok(harrisCountyRow[1].includes("slug: '"+slug+"'"),slug+' missing Harris County reciprocal link');
  assert.ok(cfisdLedger.includes('`'+slug+'`'),slug+' missing official CFISD campus source ledger');
}
console.log('PASS: seven sourced CFISD school campus and reciprocal Harris County links (NOT Chrome certification)');
