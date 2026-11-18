import assert from 'node:assert/strict';
import { test } from 'node:test';
import { publishedDestinationSlugs, relevantDestinationRows, liveRelevantDestinations } from './texasdefined-live-destination-catalog.mjs';
const xml = ['<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
'<url><loc>https://texasdefined.com/destination/dinosaur-valley-state-park</loc></url>',
'<url><loc>https://texasdefined.com/destination/ray-roberts-lake-state-park</loc></url>',
'<url><loc>https://texasdefined.com/destination/caddo-lake-state-park</loc></url>',
'<url><loc>https://texasdefined.com/destination/irrelevant-texas-beach</loc></url>',
'<url><loc>https://texasdefined.com/fishing/lakes/canyon-lake</loc></url>',
'<url><loc>https://texasdefined.com/fishing/species/rainbow-trout</loc></url>',
'<url><loc>https://texasdefined.com/fishing/lakes/unverified-reservoir</loc></url>',
'<url><loc>https://texasdefined.com/fishing/species/unverified-fish</loc></url>',
'<url><loc>https://texasdefined.com/news/a-recent-story</loc></url>',
'<url><loc>https://evil.example/destination/rogue</loc></url>',
'<url><loc>https://texasdefined.com/destination/invalid?redirect=1</loc></url>',
'<url><loc>https://texasdefined.com/destination/dinosaur-valley-state-park</loc></url>',
'<url><loc>https://texasdefined.com/state-parks</loc></url>',
'<url><loc>https://texasdefined.com/fishing/lakes</loc></url>',
'<url><loc>https://texasdefined.com/explore</loc></url></urlset>'].join('');
test('use canonical indexable routes only, never external, query or news URLs',()=>{
  assert.deepEqual(publishedDestinationSlugs(xml),['dinosaur-valley-state-park','ray-roberts-lake-state-park','caddo-lake-state-park','irrelevant-texas-beach','canyon-lake','rainbow-trout']);
  assert.throws(()=>publishedDestinationSlugs('<html>not a sitemap</html>'));
});
test('related destinations must be explicitly supported by source evidence',()=>{
  const slugs=publishedDestinationSlugs(xml);
  const source={title:'Dinosaur Valley State Park adds visitor equipment',
    description:'Ray Roberts Lake State Park will host adaptive equipment sessions.',
    extracted_body:'Caddo Lake State Park will also hold an accessibility event.'};
  const d=relevantDestinationRows(source,slugs);
  assert.deepEqual(d.map(x=>x.slug).sort(),['caddo-lake-state-park','dinosaur-valley-state-park','ray-roberts-lake-state-park']);
  assert.equal(d.some(x=>x.slug==='irrelevant-texas-beach'),false);
});
test('absent directly related destination mentions hold automatic publication', async()=>{
  const response=()=>Promise.resolve({ok:true,text:async()=>xml});
  const destinations=await liveRelevantDestinations({title:'A Texas company changes its logo'},'https://texasdefined.com',response);
  assert.deepEqual(destinations,[]);
});

test('only fully maintained sitemap-backed fishing lake/species authority pages qualify as published links',()=>{
  const slugs = publishedDestinationSlugs(xml);
  assert.ok(slugs.includes('canyon-lake'));
  assert.ok(slugs.includes('rainbow-trout'));
  assert.ok(!slugs.includes('unverified-reservoir'));
  assert.ok(!slugs.includes('unverified-fish'));
  const source = {
    title: 'Rainbow Trout Stocking Heads Back to Texas Waters Nov. 24',
    description: 'The TPWD statewide winter trout schedule covers the Guadalupe River below Canyon Lake.',
    extracted_body: 'Rainbow trout are stocked in Texas. The TPWD bulletin identifies Canyon Lake and the Guadalupe River stocking zone.',
  };
  assert.deepEqual(relevantDestinationRows(source, slugs).map(row=>row.slug).sort(), ['canyon-lake','rainbow-trout']);
});
