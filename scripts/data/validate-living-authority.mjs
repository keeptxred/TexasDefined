import fs from 'node:fs';

const failures = [];
const read = (file) => fs.readFileSync(file, 'utf8');

const paths = read('src/components/editorial/LivingAuthorityPaths.tsx');
const category = read('src/components/editorial/CategoryPage.tsx');
const directory = read('src/components/directories/TexasPlaceDirectory.tsx');
const moneyHub = read('src/routes/decide.financial-tools.tsx');
const propertyHub = read('src/routes/property.tsx');

for (const target of [
  '/browse/cities',
  '/texas-cost-of-living-calculator',
  '/texas-salary-comparison-by-city',
  '/texas-moving-cost-calculator',
  '/texas-utility-cost-calculator',
  '/property',
  '/texas-homeownership-cost-calculator',
  '/texas-home-insurance-calculator',
  '/browse/counties',
  '/moving-to-texas-checklist',
]) {
  if (!paths.includes(`to: \"${target}\"`)) failures.push(`Living authority paths must include ${target}.`);
}

if (!category.includes('LivingAuthorityPaths')) failures.push('Category pages must integrate LivingAuthorityPaths.');
if (!category.includes('<LivingAuthorityPaths currentCategory={category} />')) failures.push('LivingAuthorityPaths must receive the active category.');
if (!paths.includes('currentCategory !== \"moving-to-texas\" && currentCategory !== \"real-estate\"')) failures.push('LivingAuthorityPaths must stay limited to moving and real-estate authority surfaces.');

for (const target of ['/moving-to-texas','/property','/decide/financial-tools','/texas-utility-cost-calculator','/texas-homeownership-cost-calculator']) {
  if (!directory.includes(`to=\"${target}\"`)) failures.push(`Place directory must link to ${target}.`);
}
for (const target of ['/texas-salary-comparison-by-city','/texas-cost-of-living-calculator']) {
  if (!directory.includes(`to=\"${target}\"`)) failures.push(`City records must expose ${target}.`);
}

for (const target of ['/texas-cost-of-living-calculator','/texas-salary-comparison-by-city','/texas-moving-cost-calculator','/texas-utility-cost-calculator','/texas-home-insurance-calculator','/browse/counties','/browse/cities','/moving-to-texas']) {
  if (!moneyHub.includes(target)) failures.push(`Money & Property hub must retain ${target}.`);
}
for (const target of ['/learn/property-taxes','/decide/property-taxes','/browse/counties','/texas-homeownership-cost-calculator','/texas-home-affordability-calculator']) {
  if (!propertyHub.includes(target)) failures.push(`Property hub must retain ${target}.`);
}

if (failures.length) {
  console.error('Texas living/property authority validation failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Moving, city, county, property and household-planning authority pathways are protected.');
