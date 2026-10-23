import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const curated=readFileSync('src/data/property/county-property-enrichment.generated.ts','utf8');
const extras=readFileSync('src/data/property/county-property-supplement.server.ts','utf8');
const loader=readFileSync('src/data/property/county-property-complete.functions.ts','utf8');
const publicRoute=readFileSync('src/routes/property-tax.county.$county.tsx','utf8');
const directory=readFileSync('src/routes/property-tax.counties.tsx','utf8');
const slugs=(value)=>[...value.matchAll(/^  '?([a-z][a-z-]*)'?: \{$/gm)].map(match=>match[1]);

test('port older verified county source facts without moving them to global client bundle',()=>{
  const curatedSlugs=slugs(curated),extraSlugs=slugs(extras);
  assert.equal(curatedSlugs.length,17,'preserve original high-traffic county snapshot');
  assert.equal(extraSlugs.length,91,'preserve every non-overlapping #5289 county');
  assert.equal(new Set([...curatedSlugs,...extraSlugs]).size,108,'no overlapping taxing-unit county contacts');
  for(const name of ['anderson','aransas','bandera','zapata'])assert.ok(extraSlugs.includes(name));
  for(const name of ['bell','bexar','harris'])assert.ok(curatedSlugs.includes(name));
  assert.match(extras,/import type \{ CountyPropertyEnrichment \}/);
  assert.match(loader,/import\('\.\/county-property-supplement\.server'\)/);
  assert.match(loader,/local\?\.appraisalDistrict/);
  assert.match(loader,/local\?\.taxOffice/);
  assert.match(loader,/local\?\.links/);
  assert.match(publicRoute,/getCompleteCountyPropertyRecords/);
  assert.match(directory,/getCompleteCountyPropertyRecords/);
  assert.doesNotMatch(curated,/anderson: \{/);
  assert.match(extras,/comptroller\.texas\.gov\/taxes\/property-tax\/county-directory\//);
});

test('retain specifically curated county property-search and payment links',()=>{
  assert.match(curated,/bell: \{[\s\S]*?propertySearchUrl: 'https:\/\/esearch\.bellcad\.org\//);
  assert.match(curated,/bell: \{[\s\S]*?paymentUrl: 'https:\/\/bellcad\.org\/pay-property-taxes\//);
  assert.match(curated,/bexar: \{[\s\S]*?name: 'Rogelio Sandoval'/);
});
