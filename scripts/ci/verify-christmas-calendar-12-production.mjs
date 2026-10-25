// Production acceptance: all twelve curated shows must appear ONCE in the
// rendered /events results, not merely be present in bundled source or hub HTML.
// Run behind the existing protected production deploy, after Cloudflare upload.
// Every source event is one verified featured occurrence, not a fabricated
// continuous multi-day theatre run. No external vendor inventory is inferred.
import { readFileSync } from 'node:fs';

const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const runId = encodeURIComponent([process.env.GITHUB_SHA || 'local',process.env.GITHUB_RUN_ID || 'manual'].join('-'));
const texasDate = new Intl.DateTimeFormat('en-US', {
  timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'
}).formatToParts(new Date());
const today = ['year','month','day'].map(k => texasDate.find(x => x.type === k)?.value).join('-');
const source = readFileSync(new URL('../../src/data/events/christmas-performances-2026.server.ts',import.meta.url),'utf8');
const cases = [
  ['grinch-dallas-2026','2026-11-27','Dallas','How the Grinch Stole Christmas','Music Hall at Fair Park'],
  ['king-country-fort-worth-2026','2026-12-05','Fort Worth','Drummer Boy Christmas','Dickies Arena'],
  ['christmas-kwanzaa-dallas-2026','2026-12-11','Dallas','33rd Annual Christmas/Kwanzaa','Bruton Theatre'],
  ['christmas-story-conroe-2026','2026-12-13','Conroe','A Christmas Story','Crighton Theatre'],
  ['pentatonix-fort-worth-2026','2026-12-16','Fort Worth','Pentatonix','Dickies Arena'],
  ['jazzy-christmas-dallas-2026','2026-12-17','Dallas','A Jazzy Christmas Concert','Bruton Theatre'],
  ['very-merry-symphony-cedar-park-2026','2026-12-20','Cedar Park','A Very Merry Symphony','H-E-B Center'],
  ['celtic-christmas-mcallen-2026','2026-12-20','McAllen','A Celtic Christmas','McAllen Performing Arts Center'],
  ['grand-ol-christmas-houston-2026','2026-12-22','Houston',"Grand Ol' Christmas",'House of Blues'],
  ['grand-ol-christmas-dallas-2026','2026-12-23','Dallas',"Grand Ol' Christmas",'House of Blues'],
  ['cirque-musica-cedar-park-2026','2026-12-24','Cedar Park','Cirque Musica Holiday Wonderland','H-E-B Center'],
  ['christmas-carol-houston-2026','2026-12-27','Houston','A Christmas Carol','Alley Theatre'],
];
if (cases.length !== 12 || new Set(cases.map(x=>x[0])).size !== 12) throw new Error('Manifest must list 12 unique shows');
for (const [id,date,city] of cases) {
  const record = source.match(new RegExp('id: "'+id+'"[\\s\\S]*?(?=\\n  },|\\n];)'))?.[0];
  if (!record || !record.includes('date: "'+date+'"') || !record.includes('city: "'+city+'"')) {
    throw new Error('Verified Christmas source drift: '+id);
  }
}
if (today > '2026-12-27') {
  console.log('PASS: 12-entry manifest valid; 2026 dated live checks expired '+today);
  process.exit(0);
}
const decode = s => s.replace(/&#x([0-9a-f]+);/gi,(_,hex)=>String.fromCodePoint(parseInt(hex,16)))
  .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)))
  .replace(/&(?:amp|quot|apos|lt|gt|#39);/g, t=>({'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&#39;':"'"})[t]||t);
const textOnly = s => decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const norm = s => textOnly(s).toLowerCase().normalize('NFKD').replace(/[\u2018\u2019\u201C\u201D]/g,"'").replace(/[^a-z0-9]+/g,' ').trim();
const want = cases.filter(([,date])=>date>=today);
async function verifyOne([id,date,city,name,venue], attempt) {
  const query = new URLSearchParams({start:date,end:date,location:'city:'+city});
  query.set('christmas-calendar-qa',runId+'-'+attempt);
  const url = origin+'/events?'+query.toString();
  const response = await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(30000),cache:'no-store',
    headers:{'user-agent':'TexasDefined-Christmas-Calendar-12-QA/1.0'}});
  if (!response.ok || response.headers.get('cf-mitigated')==='challenge') throw Error(id+': HTTP '+response.status);
  const html = await response.text();
  const anchor = /<ul\b[^>]*class="[^"]*\bev-results-list\b[^"]*"[^>]*>/i.exec(html);
  if (!anchor) throw Error(id+': no server-rendered calendar results list');
  const rawList = html.slice(anchor.index+anchor[0].length).split('</ul>')[0];
  const cards = [...rawList.matchAll(/<li\b[^>]*id="calendar-event-([^"]+)"[^>]*>([\s\S]*?)<\/li>/gi)]
    .map(match=>({id:decode(match[1]),raw:match[2],body:norm(match[2])}));
  const matched = cards.filter(card => card.body.includes(norm(name)) && card.body.includes(norm(venue))
    && card.body.includes(norm(city)));
  if (matched.length!==1) {
    throw Error(id+': expected exactly one '+date+' '+city+' '+name+' card; found '+matched.length+
      ', total result cards '+cards.length+'; candidates '+cards.slice(0,6).map(x=>x.id).join(','));
  }
  const row = matched[0];
  if (!/<a\b[^>]*href="https:\/\/[^"]+"/i.test(row.raw)) {
    throw Error(id+': missing actionable HTTPS official ticket/source destination');
  }
  if (!/class="[^"]*\bev-ticket\b/.test(row.raw)) {
    throw Error(id+': missing ticket CTA wrapper (do not call this a seat guarantee)');
  }
  if (!row.raw.includes('/events/christmas-events') && !/\/event\//.test(row.raw)) {
    throw Error(id+': no holiday hub or authority guide backlink');
  }
  console.log('PASS 12-event live calendar: '+id+' '+date+' '+city+' exactly one SSR card with ticket link, HTTP '+response.status);
}
const errors=[];
for (let i=0;i<want.length;i+=3) {
  const group=want.slice(i,i+3);
  await Promise.all(group.map(async e=>{
    let error;
    for(let a=1;a<=3;a++){
      try{await verifyOne(e,a);return;}catch(err){error=err instanceof Error?err.message:String(err);}
      if(a<3) await new Promise(resolve=>setTimeout(resolve,1500));
    }
    errors.push(error);
  }));
}
if(errors.length){console.error('FAIL: '+errors.join('\n'));process.exit(1);}
console.log('PASS: '+want.length+' of 12 upcoming curated 2026 performances independently SSR-verified on canonical calendar; seat inventory NOT asserted.');
