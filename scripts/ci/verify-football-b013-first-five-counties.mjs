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
 assert.ok(dossier.includes('\\`'+slug+'\\`'),slug+' missing source ledger');
}
console.log('PASS: Batch013 first-five explicit school-to-county and reciprocal county-to-school structural source contract (not Chrome certification)');
