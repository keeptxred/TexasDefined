#!/usr/bin/env node
/** Bounded official TPWD verification beyond statewide season summary.
 * Reads specific known official county pages + CWD/tagging guidance; it does not
 * scrape 254 counties, guess boundaries or republish unverified local laws.
 */
import assert from 'node:assert/strict';
import data from '../../src/data/hunting/deer-season-dates.json' with { type: 'json' };

const base = 'https://tpwd.texas.gov/regulations/outdoor-annual';
const sources = [
  { id: 'tarrant', url: base + '/regs/counties/tarrant/', terms: ['Tarrant', 'White-tailed Deer', 'Bag Limit', 'Antler Restrictions'], year: true },
  { id: 'real', url: base + '/regs/counties/real/', terms: ['Real', 'White-tailed Deer', 'Bag Limit'], year: true },
  { id: 'lasalle', url: base + '/regs/counties/lasalle/', terms: ['La Salle', 'White-tailed Deer', 'Bag Limit'], year: true },
  { id: 'cwd', url: base + '/hunting/cwd/', terms: ['Chronic Wasting Disease', 'CWD'], year: false },
  { id: 'tagging', url: base + '/licenses/tagging-instructions/tagging-deer', terms: ['Tagging Deer', 'hunting license'], year: false },
  { id: 'after-harvest', url: base + '/hunting/general-regulations/after-killing-a-deer/', terms: ['After Harvesting', 'CWD'], year: false },
];
function visible(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ')
    .replace(/<!--[\s\S]*?-->/g,' ').replace(/<[^>]*>/g,' ')
    .replace(/&(?:nbsp|#160);/gi,' ').replace(/&amp;/gi,'&')
    .replace(/\s+/g,' ').trim();
}
function verifySource(source, text) {
  const s = text.toLowerCase();
  for (const t of source.terms) {
    if (!s.includes(t.toLowerCase())) throw new Error('TPWD '+source.id+' missing: '+t);
  }
  if (source.year && !text.includes(String(data.startYear)) &&
      !text.includes(String(data.startYear+1))) {
    throw new Error('TPWD county '+source.id+' has no current season year');
  }
  if (text.length < 200) throw new Error('TPWD '+source.id+' legal resource unexpectedly short');
}
if (process.argv.includes('--self-test')) {
  assert.equal(sources.length,6);
  assert.ok(sources.every(x=>new URL(x.url).hostname==='tpwd.texas.gov'));
  assert.ok(sources.filter(x=>x.year).length===3);
  const fixture='Regulations '+data.startYear+' '+sources[0].terms.join(' ')+' '.repeat(230);
  verifySource(sources[0],fixture);
  assert.throws(()=>verifySource(sources[0],fixture.replace('Antler Restrictions','incorrect title')));
  assert.throws(()=>verifySource(sources[0],fixture.replace(String(data.startYear),'1998')));
  console.log('TPWD six-source county/CWD/tagging integrity contract passed.');
  process.exit(0);
}
async function fetchSource(source) {
  const delays=[0,4000,9000];
  let last;
  for(let i=0;i<delays.length;i++){
    if(delays[i])await new Promise(resolve=>setTimeout(resolve,delays[i]));
    try{
      const response=await fetch(source.url,{headers:{accept:'text/html','user-agent':'TexasDefined-deer-related-rules-verification/1.0'},signal:AbortSignal.timeout(25000)});
      if(!response.ok)throw new Error(source.id+' HTTP '+response.status);
      if(new URL(response.url).hostname!=='tpwd.texas.gov')throw new Error(source.id+' redirected off official TPWD domain');
      verifySource(source,visible(await response.text()));
      return;
    }catch(error){last=error;if(i<delays.length-1)console.warn(source.id+' attempt '+(i+1)+' failed: '+String(error).slice(0,170));}
  }
  throw last;
}
for(const source of sources){
  await fetchSource(source);
  console.log('TPWD related rule verified: '+source.id);
}
console.log('TPWD six official deer county/CWD/tagging sources are live and identify current rule categories.');
