import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { corporateEventProviders } from '../../src/data/corporate-events.ts';
import { houstonBuild2Catalog, houstonInventoryAudit, houstonBuild2Evidence } from '../../src/data/group-events-houston-build2.ts';

const sql=readFileSync('scripts/data/group-events-houston-build2-seed.sql','utf8');
const experienceJSON=sql.match(/\$houston_b2\$(\[[\s\S]*?\])\$houston_b2\$/);
const tagJSON=sql.match(/\$houston_b2_tags\$(\[[\s\S]*?\])\$houston_b2_tags\$/);
assert(experienceJSON && tagJSON,'Seed must contain static reviewable source values');
const experiences=JSON.parse(experienceJSON[1]);
const tags=JSON.parse(tagJSON[1]);
assert.equal(experiences.length,13);
assert.equal(new Set(experiences.map(x=>x.slug)).size,13);
assert.equal(houstonInventoryAudit.length,90);
assert.equal(corporateEventProviders.length,159);
assert.equal(Object.keys(houstonBuild2Evidence).length,12);
assert.equal(tags.length,101);
const bySlug=new Map(experiences.map(x=>[x.slug,x]));
for(const e of houstonBuild2Catalog){
  const row=bySlug.get(e.id);
  assert(row,'DB seed omitted normalized experience '+e.id);
  assert.equal(row.legacy_provider_slug,e.provider.legacySlug);
  assert.equal(row.max_participants,e.maxParticipants);
  assert.equal(row.simultaneous_capacity,e.simultaneousCapacity);
  assert.equal(row.setting,e.setting);
  assert.equal(row.food_status,e.foodStatus);
  assert.deepEqual(row.service_cities,e.servedCities);
  assert.equal(row.source_url,e.source.officialUrl);
  const actual=tags.filter(t=>t.slug===e.id);
  for(const [category,values] of Object.entries({
    occasion:e.occasions, activity:e.activities,
    amenity:e.verifiedAmenities, setting:e.environmentTags,
  })) {
    const expected=values.map(v=>'ge_'+category+'_'+v.replaceAll('-','_')).sort();
    const observed=actual.filter(t=>t.category===category).map(t=>t.tag_key).sort();
    assert.deepEqual(observed,expected,'Seed tags disagree with verified source: '+e.id+' '+category);
  }
  assert.equal(e.participation,'independent');
  assert.equal(e.primaryMediaId,null);
}
for(const row of experiences){
  assert.equal(row.source_url.startsWith('https://'),true);
  assert(row.name.length>1);
  assert(!Object.hasOwn(row,'price_per_person_cents'));
  assert(!Object.hasOwn(row,'provider_location_id'));
  assert(!Object.hasOwn(row,'provider_entity_id'));
}
assert(sql.includes('ON CONFLICT (slug) DO NOTHING'),'Never overwrite existing published marketplace records');
assert(sql.includes('ON CONFLICT (experience_id, tag_id) DO NOTHING'),'Do not duplicate tag links');
assert(!/\b(?:DELETE|UPDATE|DROP|TRUNCATE|ALTER|GRANT|REVOKE)\b/i.test(sql.replace(/^--.*$/gm,'')),
  'Houston data seed may not modify old rows, schema or grants');
assert(!sql.includes('texasdefined_group_event_provider_locations ('),'Never fabricate provider-location ID links');
assert(!sql.includes('INSERT INTO public.texasdefined_group_event_packages'),'Unverified packages must not be published as bookable offers');
console.log('Houston Build 2 data seed PASS: 13 experiences, 101 controlled source tags, no invented prices/locations/partner status.');
