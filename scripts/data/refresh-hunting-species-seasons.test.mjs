import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {clean,readSection,reconcile,yearAt,seasonUrl} from './refresh-hunting-species-seasons.mjs';
const seed=JSON.parse(fs.readFileSync('src/data/hunting/species-season-calendar.json','utf8'));
const esc=s=>s.replace(/&/g,'&amp;');
function mock(year=2026){
  const delta=year-2026;
  return '<h1>'+year+' - '+(year+1)+' Hunting Season Dates</h1>'+
    seed.sections.map(sec=>'<h3>'+esc(sec.heading)+'</h3><table><thead><tr><th>Season</th><th>Zone</th><th>Dates</th></tr></thead><tbody>'+
    sec.rows.map(r=>'<tr><td>'+esc(r.season)+'</td><td>'+esc(r.zone)+'</td><td>'+esc(r.dates.replace(/\b20(?:26|27)\b/g,m=>String(Number(m)+delta)))+'</td></tr>').join('')+
    '</tbody></table>').join('');
}
test('all 17 official species groups have governed zone identities and source-derived rows',()=>{
  assert.equal(seed.sections.length,17);
  assert.equal(seed.sections.reduce((n,s)=>n+s.rows.length,0),37);
  assert.equal(readSection(mock(),'Dove').length,3);
  assert.equal(readSection(mock(),'Rabbits and Hares')[0].dates,'No closed season');
  assert.equal(reconcile(seed,mock(),'2026-10-28'),null);
});
test('changed current-year date may update only the governed snapshot',()=>{
  const newer=mock().replace('Nov. 21, 2026 - Dec. 6, 2026','Nov. 22, 2026 - Dec. 6, 2026');
  const found=reconcile(seed,newer,'2026-10-28');
  assert.equal(found.sections.find(s=>s.heading==='Mule Deer').rows[0].dates,'Nov. 22, 2026 - Dec. 6, 2026');
  assert.equal(found.seasonYear,'2026–27');
  assert.equal(found.sections.find(s=>s.heading==='Dove').rows[0].dates,seed.sections.find(s=>s.heading==='Dove').rows[0].dates);
});
test('2027–28 rollover requires September 1, current TPWD heading, intact zones',()=>{
  assert.equal(yearAt('2027-08-31'),2026);
  assert.equal(yearAt('2027-09-01'),2027);
  const next=reconcile(seed,mock(2027),'2027-09-01');
  assert.equal(next.seasonYear,'2027–28');
  assert.equal(next.source,seasonUrl(2027));
  assert.match(next.sections.find(s=>s.heading==='Squirrel').rows[0].dates,/2028/);
  assert.throws(()=>reconcile(seed,mock(2027),'2027-08-31'),/heading mismatch/);
  assert.throws(()=>reconcile(seed,mock(2029),'2029-09-01'),/Unexpected season-year rollover/);
});
test('zone, missing species, duplicate source headings and bad dates stop updates',()=>{
  assert.throws(()=>reconcile(seed,mock().replace('Panhandle/South Plains','Unapproved zone'),'2026-10-28'),/changed zone/);
  assert.throws(()=>reconcile(seed,mock().replace('<h3>Quail</h3>','<h3>Other</h3>'),'2026-10-28'),/Missing TPWD species/);
  assert.throws(()=>reconcile(seed,mock().replace('Oct. 3-18, 2026','Oct. 3-18, 2029'),'2026-10-28'),/Invalid year/);
  assert.throws(()=>readSection(mock().replace('</tbody></table>','<tr><td>General</td><td>North</td><td>Sep. 2, 2026</td></tr></tbody></table>'),'Javelina'),/Duplicate TPWD/);
});
test('source parsing decodes HTML entities without treating formatting as rules',()=>{
  assert.equal(clean('<strong>North</strong>&nbsp;&amp; South &ndash; Zone'),'North & South - Zone');
});
