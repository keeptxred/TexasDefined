import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseOfficial, checkCompanion, updateStored, fetchTPWD, TpwdTransportUnavailable } from './refresh-turkey-season-calendar.mjs';

const animal = [
  'Wild Turkey 2026-2027 Seasons & Regulations',
  'Season Dates & County Regulations Upland Game Bird Endorsement Required',
  'Archery Only All counties with an open fall season Oct. 3 - Nov. 6, 2026',
  'Youth-Only',
  'North Zone Oct. 30 - Nov. 1, 2026 Jan. 4 - 17, 2027',
  'South Zone Oct. 30 - Nov. 1, 2026 Jan. 18 - 31, 2027',
  'Brooks, Kenedy, Kleberg, and Willacy Counties Oct. 30 - Nov. 1, 2026',
  'North Zone Mar. 27 - 28, 2027 May 22 - 23, 2027',
  'South Zone Mar. 13 - 14, 2027 May 8 - 9, 2027',
  'Fall Season North Zone Nov. 7, 2026 - Jan. 3, 2027',
  'South Zone Nov. 7, 2026 - Jan. 17, 2027',
  'Brooks, Kenedy, Kleberg, and Willacy Counties Nov. 7, 2026 - Feb. 28, 2027',
  'Spring Season North Zone Apr. 3 - May 16, 2027',
  'South Zone Mar. 20 - May 2, 2027',
  'One-Turkey Counties Apr. 1 - 30, 2027',
  'East Zone Apr. 22 - May 14, 2027',
  'View Wild Turkey hunting regulations for your county.',
  'Harvest of unbearded hens is prohibited',
  'Mandatory harvest reporting within 24 hours of harvest',
  'No more than one gobbler may be harvested annually per county',
  'Shotgun and lawful archery equipment are the only legal methods of take; no hunting over bait'
].join('\n');
const companion = [
  'Wild Turkey season dates',
  'Fall North Nov. 7, 2026 - Jan. 3, 2027',
  'South Nov. 7, 2026 - Jan. 17, 2027',
  'Brooks Nov. 7, 2026 - Feb. 28, 2027',
  'Archery Oct. 3, 2026 - Nov. 6, 2026',
  'Youth North Oct. 30, 2026 - Nov. 1, 2026 & Jan. 4-17, 2027',
  'South Oct. 30, 2026 - Nov. 1, 2026 & Jan. 18-31, 2027',
  'Spring North Apr. 3, 2027 - May 16, 2027',
  'South Mar. 20, 2027 - May 2, 2027',
  'One Apr. 1-30, 2027',
  'East Apr. 22, 2027 - May 14, 2027',
  'Youth North Mar. 27-28, 2027 & May 22-23, 2027',
  'South Mar. 13-14, 2027 & May 8-9, 2027',
  'Migratory Game Bird'
].join('\n');
const current = JSON.parse(fs.readFileSync('src/data/hunting/turkey-season-calendar.json','utf8'));

test('published TPWD turkey dates parse into the 13 exact named slots', () => {
  const d=parseOfficial(animal);
  assert.equal(d.seasonYear,'2026–27');
  assert.equal(Object.keys(d.byId).length,13);
  checkCompanion(companion,d);
  assert.equal(updateStored(current,d,'2026-10-28'),null);
});

test('a source-verified within-year date correction changes only the governed calendar', () => {
  const revised=animal.replace('Apr. 22 - May 14, 2027','Apr. 23 - May 14, 2027');
  const dates=companion.replace('Apr. 22, 2027 - May 14, 2027','Apr. 23, 2027 - May 14, 2027');
  const parsed=parseOfficial(revised);
  checkCompanion(dates,parsed);
  const out=updateStored(current,parsed,'2026-11-04');
  assert.ok(out);
  assert.equal(out.rows.find(x=>x.id==='spring-east').dates,'Apr. 23 – May 14, 2027');
  assert.equal(out.rows.find(x=>x.id==='fall-north').dates,current.rows.find(x=>x.id==='fall-north').dates);
  assert.equal(out.checkedAt,'2026-11-04');
});

test('conflicting TPWD source dates stop publication', () => {
  const revised=animal.replace('Apr. 22 - May 14, 2027','Apr. 23 - May 14, 2027');
  assert.throws(()=>checkCompanion(companion,parseOfficial(revised)),/disagree/);
});

test('new official season year fails closed rather than silently retaining old legal prose', () => {
  const newYear=animal.replace('Wild Turkey 2026-2027','Wild Turkey 2027-2028');
  assert.throws(()=>updateStored(current,parseOfficial(newYear),'2027-04-04'),/YEAR_ROLLOVER/);
});

test('legal restriction text cannot disappear without an editorial review',()=>{
  assert.throws(()=>parseOfficial(animal.replace('Harvest of unbearded hens is prohibited','')),/legal wording changed/);
});

test('a new or missing date cannot create a partial calendar',()=>{
  assert.throws(()=>parseOfficial(animal.replace('Mar. 20 - May 2, 2027','')),/Changed TPWD date layout/);
});

test('bounded transient TPWD network failures recover without weakening fact validation', async () => {
  let attempts = 0;
  const body = '<html>Texas Parks and Wildlife Department</html>'.repeat(100);
  const content = await fetchTPWD('https://tpwd.texas.gov/example', async () => {
    attempts++;
    if (attempts < 3) throw new TypeError('connect ECONNREFUSED');
    return { ok: true, text: async () => body };
  }, async () => {});
  assert.equal(content, body);
  assert.equal(attempts, 3);
});

test('three TPWD network failures are typed transport errors, not false regulation changes', async () => {
  let attempts = 0;
  await assert.rejects(
    fetchTPWD('https://tpwd.texas.gov/example', async () => {
      attempts++;
      throw new TypeError('connect ECONNREFUSED');
    }, async () => {}),
    TpwdTransportUnavailable,
  );
  assert.equal(attempts, 3);
});

test('an official HTTP failure is not incorrectly treated as a harmless network interruption', async () => {
  await assert.rejects(
    fetchTPWD('https://tpwd.texas.gov/example', async () => ({ ok: false, status: 403 }), async () => {}),
    error => !(error instanceof TpwdTransportUnavailable) && /TPWD HTTP 403/.test(error.message),
  );
});
