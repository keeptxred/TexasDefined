import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseDraw, parseSurvey, updatedFacts } from './refresh-turkey-authority-quarterly.mjs';

const stored = JSON.parse(readFileSync('src/data/hunting/turkey-quarterly-facts.json','utf8'));
const start = 'Texas Parks and Wildlife Department Texas Public Hunt System 2026 - 2027 ';
const hagermanBlock = 'Hagerman NWR Download Hagerman NWR Brochure $3.00 /adult Only non-toxic shot no larger than #4 may be used for shotguns. Hunt Dates Apr 22, 2027 – Apr 24, 2027 Bag Limit One Turkey; Gobbler Only ONLY MEANS ALLOWED All Archery Equipment Shotguns with Birdshot Baiting Not allowed Permits Available: 24 Fee per adult: $80.00';
const eastBlock = 'Lower Rio Grande Valley NWR - East Lake Download Lower Rio Grande Valley NWR - East Lake Brochure $3.00 /adult Hunt Dates Apr 02, 2027 – Apr 04, 2027 Apr 09, 2027 – Apr 11, 2027 Bag Limit One Turkey; Gobbler or Bearded Hen ONLY MEANS ALLOWED Shotguns with Birdshot Baiting Not allowed Permits Available: 8 Fee per adult: $80.00';
const cat = start + ' NATIONAL REFUGE SPRING TURKEY Application Deadline: November 01, 2026 ' + hagermanBlock + ' ' + eastBlock;
const h = start + 'HAGERMAN NWR National Refuge Spring Turkey Application Deadline: November 01, 2026 ' + hagermanBlock;
const e = start + 'EAST LAKE National Refuge Spring Turkey Application Deadline: November 01, 2026 ' + eastBlock;
const survey = 'Texas Parks and Wildlife Department Summer Turkey Survey Results Recruitment dropped again with 1.82 PPH recorded statewide this summer. However, overall wild turkey observations increased from 9.21 Wild Turkeys Per 1,000 miles in 2025 to 11.38 Wild Turkeys Per 1,000 miles in 2026. 2026 Summer Turkey Survey Results by Wildlife Region Total 2,079 1.82 3.45 0.5 1.17 Statewide Mandatory Wild Turkey Harvest Data';

test('extract official hunt fees, dates and permits from independent TPWD listings', () => {
  assert.deepEqual(parseDraw(cat,h,e,'2026–27'),stored.draw);
});
test('an individual area detail discrepancy prevents draw publication',()=>{
  assert.throws(()=>parseDraw(cat,h,e.replace('Available: 8','Available: 7'),'2026–27'), /disagree/);
});
test('legal bag or method changes cannot be auto-published',()=>{
  assert.throws(()=>parseDraw(cat.replace('Gobbler Only','Either Sex'),h,e,'2026–27'), /legal-method or bag/);
});
test('new drawn hunt season year fails closed',()=>{
  assert.throws(()=>parseDraw(cat.replace('2026 - 2027','2027 - 2028'),h,e,'2026–27'), /season rollover/);
});
test('survey figures are extracted from official table and narrative',()=>{
  assert.deepEqual(parseSurvey(survey),stored.survey);
});
test('survey narrative/table contradiction stops publication',()=>{
  assert.throws(()=>parseSurvey(survey.replace('Total 2,079 1.82','Total 2,079 2.11')), /disagree/);
});
test('only allow checked, dated, structurally intact source facts',()=>{
  const updated=updatedFacts(stored,stored.draw,{...stored.survey,poultsPerHen:1.9},'2027-01-02');
  assert.equal(updated.checkedAt,'2027-01-02');
  assert.equal(updated.survey.poultsPerHen,1.9);
  assert.equal(updated.draw,stored.draw);
  assert.throws(()=>updatedFacts(stored,stored.draw,stored.survey,'2025-01-02'),/backdate/);
  assert.throws(()=>updatedFacts({...stored,sources:{...stored.sources,category:'https://example.com'}},stored.draw,stored.survey,'2027-01-02'),/Source URLs altered/);
});
