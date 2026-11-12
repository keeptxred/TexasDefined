#!/usr/bin/env node
/** Assemble an exact 254-county source snapshot and compare prior successful run.
 * Never publish any county legal claims; official TPWD pages remain canonical.
 */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import data from '../../src/data/hunting/deer-season-dates.json' with { type: 'json' };

const folder = 'artifacts/deer-county-monitor';
const previousPath = process.env.DEER_COUNTY_PREVIOUS || '';
const files = Array.from({ length: 7 }, (_, i) => path.join(folder, 'shard-' + i + '.json'));
const entries = [];
let failures = [];
for (let i=0; i<files.length; i++) {
  if (!fs.existsSync(files[i])) {
    failures.push({ shard: i, error: 'Missing shard artifact' });
    continue;
  }
  const item = JSON.parse(fs.readFileSync(files[i], 'utf8'));
  if (item.shard !== i || item.seasonYear !== data.seasonYear) {
    failures.push({ shard:i, error:'Shard identity or season-year mismatch' });
  }
  entries.push(...item.checked);
  failures.push(...item.failures);
}
const unique = new Set(entries.map(x => x.slug));
if (entries.length !== 254 || unique.size !== 254) {
  failures.push({ error:'Not exactly 254 unique county source records',
    entries:entries.length,unique:unique.size });
}
const unsafe = entries.filter(x => x.seasonYear !== data.seasonYear ||
  !x.url.startsWith('https://tpwd.texas.gov/regulations/outdoor-annual/regs/counties/') ||
  !/^[a-z0-9]+$/.test(x.slug) ||
  (x.hasDeerSection && !/^[a-f0-9]{64}$/.test(x.deerRulesDigest || '')));
if (unsafe.length) failures.push({ error:'Invalid official-source record',count:unsafe.length });
entries.sort((a,b)=>a.county.localeCompare(b.county));
let previous = null;
if (previousPath && fs.existsSync(previousPath)) {
  const candidate = JSON.parse(fs.readFileSync(previousPath,'utf8'));
  if (candidate.seasonYear === data.seasonYear && candidate.entries?.length === 254) previous=candidate;
}
const prior = new Map((previous?.entries || []).map(x=>[x.slug,x]));
const changed = previous ? entries.filter(x => {
  const last=prior.get(x.slug);
  return !last || last.deerRulesDigest !== x.deerRulesDigest ||
    last.hasDeerSection !== x.hasDeerSection;
}).map(x=>({county:x.county,url:x.url,
  oldDigest:prior.get(x.slug)?.deerRulesDigest||null,newDigest:x.deerRulesDigest})) : [];
if (entries.length === 254 && entries.filter(x=>x.hasDeerSection).length < 240) {
  failures.push({error:'TPWD deer section extraction covered fewer than 240 of 254 counties; do not certify misleading completeness'});
}
const snapshot={seasonYear:data.seasonYear,checkedAt:new Date().toISOString(),
  count:entries.length,withDeer:entries.filter(x=>x.hasDeerSection).length,
  entries};
const summary={seasonYear:data.seasonYear,expected:254,checked:entries.length,
  failures,changedCount:changed.length,changed,firstSnapshot:!previous};
fs.mkdirSync(folder,{recursive:true});
fs.writeFileSync(path.join(folder,'county-snapshot.json'),JSON.stringify(snapshot,null,2)+'\n');
fs.writeFileSync(path.join(folder,'summary.json'),JSON.stringify(summary,null,2)+'\n');
console.log(JSON.stringify({expected:254,checked:entries.length,
  verifiedDeerSections:snapshot.withDeer,failures:failures.length,
  changedCount:changed.length,firstSnapshot:!previous}));
if (process.argv.includes('--self-test')) {
  assert.equal(files.length,7);
  console.log('Deer county snapshot aggregation contract validated.');
} else if (failures.length) process.exitCode=1;
