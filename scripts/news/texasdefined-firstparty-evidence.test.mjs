import assert from 'node:assert/strict';
import { test } from 'node:test';
import { collectFirstPartyEvidence } from './texasdefined-firstparty-evidence.mjs';

const original='https://tpwd.texas.gov/newsmedia/releases/?req=20261117a';
const schedule='https://tpwd.texas.gov/fishboat/fish/management/stocking/trout_stocking.phtml';
const license='https://tpwd.texas.gov/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages';
const base={title:'Rainbow Trout Stocking Heads Back to Texas Waters Nov. 24',
  link:original,source:'Texas Parks & Wildlife'};
const originalHtml='<html><main><h1>Rainbow Trout Stocking Heads Back to Texas Waters Nov. 24</h1>'
 + '<p>Texas Parks and Wildlife Department announced winter trout stocking across Texas.</p>'
 + '<a href="/fishboat/fish/management/stocking/trout_stocking.phtml">2026-27 Trout Stocking Schedule</a>'
 + '<a href="/regulations/outdoor-annual/licenses/fishing-licenses-stamps-tags-packages">Fishing License Requirements</a>'
 + '<a href="https://tpwd.texas.gov.evil.example/fishboat/trout">Trout Stocking Schedule</a>'
 + '<a href="https://evil.example/trout">Rainbow Trout Fishing Rules</a>'
 + '<a href="/documents/season-guide.pdf">Trout Stocking PDF</a>'
 + '</main></html>';
const officialDoc=(heading)=>'<html><main><h1>'+heading+'</h1><p>'+
  'This is an official Texas Parks and Wildlife Department guidance document. '.repeat(16)+
  '</p></main></html>';

test('fetches only bounded same-host linked original factual evidence; never upgrades source approval',async()=>{
  const fetched=[];
  const fixtures=new Map([
    [original,originalHtml],
    [schedule,officialDoc('2026-2027 Trout Stocking Schedule')],
    [license,officialDoc('Fishing License Requirements')],
  ]);
  const fetcher=async (url,request)=>{
    fetched.push(url);
    assert.equal(request.redirect,'manual');
    assert.equal(new URL(url).hostname,'tpwd.texas.gov');
    return new Response(fixtures.get(url)||'missing',{status:fixtures.has(url)?200:404,
      headers:{'Content-Type':'text/html'}});
  };
  const item={...base,viral_signals:{auto_publish_eligible:false,editorial_lane:'REVIEW'},source_count:1};
  const result=await collectFirstPartyEvidence(item,{fetcher});
  assert.equal(result.attempted,2);
  assert.equal(result.records.length,2);
  assert.deepEqual(result.records.map(x=>x.url).sort(),[schedule,license].sort());
  assert.equal(fetched.length,3); // One original + two support pages
  assert.equal(item.viral_signals.editorial_lane,'REVIEW');
  assert.equal(item.source_count,1);
  assert.ok(result.records.every(x=>x.excerpt.length<=2800 && x.excerpt.length>=400));
});

test('does not crawl a secondhand story or a forged .gov hostname',async()=>{
  let calls=0;
  const fetcher=async()=>{calls++;throw Error('no fetch permitted');};
  for(const link of ['https://news.example.com/report',
    'https://tpwd.texas.gov.evil.example/newsmedia/releases/?req=20261117a',
    'http://tpwd.texas.gov/newsmedia/releases/?req=20261117a',
    'https://tpwd.texas.gov:8080/newsmedia/releases/?req=20261117a',
  ]){
    const result=await collectFirstPartyEvidence({...base,link},{fetcher});
    assert.equal(result.attempted,0);
    assert.deepEqual(result.records,[]);
  }
  assert.equal(calls,0);
});

test('missing, blocked or oversized official pages never become quoted source evidence',async()=>{
  const noContent=await collectFirstPartyEvidence(base,{fetcher:async()=>new Response('down',{status:503,headers:{'Content-Type':'text/html'}})});
  assert.deepEqual(noContent.records,[]);
  const oversized=await collectFirstPartyEvidence(base,{fetcher:async()=>new Response(originalHtml,{headers:{'Content-Type':'text/html','Content-Length':'999999'}})});
  assert.deepEqual(oversized.records,[]);
  const redirected=await collectFirstPartyEvidence(base,{fetcher:async()=>new Response('',{status:302,headers:{Location:'https://evil.example'}})});
  assert.deepEqual(redirected.records,[]);
});

test('rejects thin or unverified downstream snippets instead of inventing the missing research',async()=>{
  const fixture=new Map([[original,originalHtml],[schedule,'<h1>Stocking Calendar</h1><p>Not enough detail.</p>'],
    [license,'<html><h1>Fishing Licenses</h1><p>Not enough detail.</p></html>']]);
  const fetcher=async(url)=>new Response(fixture.get(url)||'',{headers:{'Content-Type':'text/html'}});
  const result=await collectFirstPartyEvidence(base,{fetcher});
  assert.equal(result.attempted,2);
  assert.equal(result.records.length,0);
});

test('recovers only live, content-verified TPWD trout guidance when the original release is temporarily unavailable',async()=>{
  const richSource={...base, extracted_body:('Texas Parks and Wildlife Department rainbow trout stocking details, license limits, and seasonal schedule. ').repeat(36)};
  const visited=[];
  const fetcher=async(url,opts)=>{
    visited.push(url);
    assert.equal(opts.redirect,'manual');
    assert.equal(new URL(url).hostname,'tpwd.texas.gov');
    if(url===original) return new Response('temporarily unavailable',{status:503,headers:{'Content-Type':'text/html'}});
    return new Response(officialDoc('Published TPWD winter trout visitor regulations and fishing license information'),{status:200,headers:{'Content-Type':'text/html'}});
  };
  const result=await collectFirstPartyEvidence(richSource,{fetcher});
  assert.equal(result.attempted,3);
  assert.equal(result.records.length,3);
  assert.equal(visited.length,4); // One official release attempt and three exact agency support pages
  assert.ok(result.records.every(row=>row.url.startsWith('https://tpwd.texas.gov/') && row.excerpt.length>=400));
});

test('does not invent fallback pages for insufficient original source text or an agency impersonator',async()=>{
  const fetcher=async()=>new Response('unavailable',{status:503,headers:{'Content-Type':'text/html'}});
  const baseSource=('Texas Parks and Wildlife Department rainbow trout stocking. ').repeat(45);
  for(const item of [
    {...base,extracted_body:'thin'},
    {...base,extracted_body:baseSource,source:'Unverified Local Blog'},
    {...base,extracted_body:baseSource,link:'https://tpwd.texas.gov.evil.example/newsmedia/releases/?req=20261117a'},
    {...base,extracted_body:baseSource,title:'Unrelated Texas community notice'},
  ]){
    const result=await collectFirstPartyEvidence(item,{fetcher});
    assert.equal(result.records.length,0);
    assert.equal(result.attempted,0);
  }
});

test('retains up to 2800 characters of real publisher fact material without inventing continuation',async()=>{
  const extra='<p>'+('Texas trout fishing access, bag limits, stocking dates and licenses are explained by the state agency. ').repeat(90)+'</p>';
  const originalPage=originalHtml.replace('</main>','<a href="/fishboat/fish/management/stocking/trout_stocking.phtml">Rainbow trout stocking schedule</a></main>');
  const fetcher=async(url)=>new Response(url===original?originalPage:'<main><h1>TPWD Rainbow Trout Stocking Guidance</h1>'+extra+'</main>',{
    headers:{'Content-Type':'text/html'}
  });
  const result=await collectFirstPartyEvidence(base,{fetcher});
  assert.ok(result.records.length>=1);
  assert.equal(result.records[0].excerpt.length,2800);
  assert.ok(result.records[0].excerpt.startsWith('TPWD Rainbow Trout Stocking Guidance'));
});
