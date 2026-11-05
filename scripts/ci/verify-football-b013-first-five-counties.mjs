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
