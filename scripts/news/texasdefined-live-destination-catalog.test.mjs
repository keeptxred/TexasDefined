import assert from 'node:assert/strict';
import { test } from 'node:test';
import { publishedDestinationSlugs, relevantDestinationRows, liveRelevantDestinations } from './texasdefined-live-destination-catalog.mjs';
const xml = ['<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
'<url><loc>https://texasdefined.com/destination/dinosaur-valley-state-park</loc></url>',
'<url><loc>https://texasdefined.com/destination/ray-roberts-lake-state-park</loc></url>',
'<url><loc>https://texasdefined.com/destination/caddo-lake-state-park</loc></url>',
'<url><loc>https://texasdefined.com/destination/irrelevant-texas-beach</loc></url>',
'<url><loc>https://texasdefined.com/news/a-recent-story</loc></url>',
'<url><loc>https://evil.example/destination/rogue</loc></url>',
'<url><loc>https://texasdefined.com/destination/invalid?redirect=1</loc></url>',
'<url><loc>https://texasdefined.com/destination/dinosaur-valley-state-park</loc></url>',
'<url><loc>https://texasdefined.com/state-parks</loc></url>',
'<url><loc>https://texasdefined.com/fishing/lakes</loc></url>',
'<url><loc>https://texasdefined.com/explore</loc></url></urlset>'].join('');
test('use canonical indexable routes only, never external, query or news URLs',()=>{
  assert.deepEqual(publishedDestinationSlugs(xml),['dinosaur-valley-state-park','ray-roberts-lake-state-park','caddo-lake-state-park','irrelevant-texas-beach']);
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
