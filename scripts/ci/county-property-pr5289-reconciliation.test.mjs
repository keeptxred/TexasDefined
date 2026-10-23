import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

// The old automated PR #5289 contained verified directory facts omitted
// from the smaller current snapshot. Port only the non-overlapping counties;
// keep hand-curated high-traffic county contact and payment links authoritative.
const text=readFileSync('src/data/property/county-property-enrichment.generated.ts','utf8');
const slugs=[...text.matchAll(/^  ([a-z][a-z-]*): \{$/gm)].map(match=>match[1]);

test('county property-tax directory port includes unique facts without duplicate counties',()=>{
  assert.equal(slugs.length,new Set(slugs).size);
  assert.ok(slugs.length>=108,'must preserve 17 curated counties plus 91 source-backed additions');
  for(const slug of ['bell','bexar','harris','anderson','aransas','bandera','zapata']) {
    assert.ok(slugs.includes(slug),slug+' county contact missing');
  }
  assert.match(text,/lastVerifiedAt:/);
  assert.match(text,/sourceUrls:/);
  assert.match(text,/comptroller\.texas\.gov\/taxes\/property-tax\/county-directory\//);
});

test('specifically curated high-traffic source and parcel search links survive the older PR',()=>{
  assert.match(text,/bell: \{[\s\S]*?propertySearchUrl: 'https:\/\/esearch\.bellcad\.org\//);
  assert.match(text,/bell: \{[\s\S]*?paymentUrl: 'https:\/\/bellcad\.org\/pay-property-taxes\//);
  assert.match(text,/bexar: \{[\s\S]*?name: 'Rogelio Sandoval'/);
  assert.match(text,/anderson: \{[\s\S]*?sourceUrls: \['https:\/\/comptroller\.texas\.gov\/taxes\/property-tax\/county-directory\/anderson\.php'/);
});
