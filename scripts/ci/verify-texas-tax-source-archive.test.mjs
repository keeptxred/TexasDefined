import {test} from 'node:test';
import assert from 'node:assert/strict';
import {verifyArchiveYear} from './verify-texas-tax-source-archive.mjs';

const run={tax_year:2025,source_signature:'a'.repeat(64),
  expected_count:4800,expected_raw_count:5734};
const counts={published:4800,source:5734,matchingSignature:5734,counties:254,
  byCategory:{county:254,city:1244,'school-district':1549,'special-district':2687}};
test('five official source archive invariants accept a reconciled year',()=>{
  assert.equal(verifyArchiveYear(run,counts),true);
});
test('missing source rows and provenance signature drift fail closed',()=>{
  assert.throws(()=>verifyArchiveYear(run,{...counts,source:5733}),/inconsistent normalized/);
  assert.throws(()=>verifyArchiveYear(run,{...counts,matchingSignature:5733}),/inconsistent normalized/);
  assert.throws(()=>verifyArchiveYear({...run,source_signature:'short'},counts),/invalid completed-run provenance/);
});
test('county loss, missing workbook and raw category mismatch fail closed',()=>{
  assert.throws(()=>verifyArchiveYear(run,{...counts,counties:253}),/inconsistent normalized/);
  assert.throws(()=>verifyArchiveYear(run,{...counts,byCategory:{...counts.byCategory,county:0}}),/missing source workbook category county/);
  assert.throws(()=>verifyArchiveYear(run,{...counts,byCategory:{...counts.byCategory,county:255}}),/category counts do not reconcile/);
});
