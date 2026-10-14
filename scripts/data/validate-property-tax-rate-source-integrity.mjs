import { readFileSync } from 'node:fs';

const importerPath = 'supabase/functions/import-texas-property-tax-rates/index.ts';
const source = readFileSync(importerPath, 'utf8');

const required = [
  ['Ballinger official ID', '"200-901-02"'],
  ['Ballinger corrected rate', 'corrected:{total:0.7705,mo:0.7705,debt:0}'],
  ['Ballinger Runnels County source', 'Ballinger%20ISD%202025%20Tax%20Rate%20Adoption.pdf'],
  ['Chillicothe official ID', '"099-902-02"'],
  ['Chillicothe corrected rate', 'corrected:{total:1.0239,mo:0.6692,debt:0.3547}'],
  ['Chillicothe Hardeman CAD source', 'hardemancad.org/Forms/GetDocument'],
  ['Keller official ID', '"220-907-02"'],
  ['Keller corrected rate', 'corrected:{total:1.0852,mo:0.7552,debt:0.33}'],
  ['Keller official finance source', 'kellerisd.net/departments/finance'],
  ['raw fingerprint protection', 'sameRate(unit.total_rate,correction.raw.total)'],
  ['fail-closed unresolved conflict response', 'Refusing to replace production data while unresolved 2025 school-rate conflicts remain.'],
  ['unprocessable conflict status', 'status:422'],
];

const missing = required.filter(([, marker]) => !source.includes(marker));
if (missing.length) {
  console.error('Property-tax source integrity contract failed:');
  for (const [label, marker] of missing) console.error(`- missing ${label}: ${marker}`);
  process.exit(1);
}

const correctionIndex = source.indexOf('applyKnown2025SchoolRateCorrection(u);');
const conflictGuardIndex = source.indexOf('maintenance_operations_rate<TEA_2025_MINIMUM_MCR');
const unresolvedIndex = source.indexOf('const unresolvedSchoolConflicts=');
const deleteIndex = source.indexOf('.from("texas_property_tax_rates").delete().eq("year",year)');

if (correctionIndex < 0 || conflictGuardIndex < 0 || correctionIndex > conflictGuardIndex) {
  console.error('Known source corrections must run before the 2025 M&O floor guard.');
  process.exit(1);
}
if (unresolvedIndex < 0 || deleteIndex < 0 || unresolvedIndex > deleteIndex) {
  console.error('Unresolved 2025 school-rate conflicts must be checked before replacing production rows.');
  process.exit(1);
}

console.log('Property-tax source integrity contract passed: 3 known 2025 Comptroller school-rate errors are fingerprint-corrected and unresolved conflicts fail closed before replacement.');
