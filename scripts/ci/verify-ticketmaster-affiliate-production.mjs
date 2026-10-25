// Post-deploy commercial positive path: inspect a REAL fresh Ticketmaster event
// on the canonical live TexasDefined calendar and verify its exact Impact
// redirect/destination, sponsored disclosure and provider click metadata.
// This never pretends to verify Ticketmaster's restricted seat inventory.
import { readFileSync } from 'node:fs';

const origin = (process.env.PRODUCTION_ORIGIN || 'https://texasdefined.com').replace(/\/$/, '');
const snapshot = JSON.parse(readFileSync(new URL('../../src/data/generated/ticketmaster-events.json', import.meta.url), 'utf8'));
const now = new Date();
const age = now.getTime() - Date.parse(snapshot.fetchedAt);
if (!Number.isFinite(age) || age < 0 || age > 48 * 3_600_000) {
  console.log('::warning title=Ticketmaster snapshot stale::Commercial live CTA not asserted because the fail-closed 48-hour Ticketmaster catalog is expired; refresh Sync Texas Events.');
  process.exit(0);
}
const parts = new Intl.DateTimeFormat('en-US', {
  timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'
}).formatToParts(now);
const get = key => parts.find(x=>x.type===key)?.value;
const today = [get('year'),get('month'),get('day')].join('-');
const selectedCities = new Set(['Beaumont','Waco','Lubbock','McAllen','Abilene','Tyler','El Paso','Amarillo','Wichita Falls','College Station','Longview','Killeen','San Antonio']);
const seen = new Set();
const candidates = snapshot.events.filter(event => {
  if (event.startDate < today || event.status !== 'onsale' || !selectedCities.has(event.city)
      || !event.name || !event.venue || !event.affiliateUrl || !event.officialUrl) return false;
  if (/parking|vip upgrade|suite tickets|fast lane|express entry|quick pass|add-on/i.test(event.name)) return false;
  const url = new URL(event.affiliateUrl);
  if (url.protocol !== 'https:' || url.hostname !== 'ticketmaster.evyy.net'
      || !/^\/c\/7758914\/\d+\/4272\/?$/.test(url.pathname)
      || url.searchParams.get('u') !== event.officialUrl) return false;
  const key=event.city+':'+event.startDate;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
}).slice(0, 12);
if (!candidates.length) throw new Error('Fresh Ticketmaster snapshot has no eligible current Impact-linked Texas events for checkout smoke');

const decode = text => text.replace(/&amp;/gi,'&').replace(/&quot;/gi,'"').replace(/&#39;|&apos;/gi,"'");
const marker = encodeURIComponent(process.env.GITHUB_RUN_ID || 'release');
let checked=0,found=0;
const failures=[];
async function verify(event) {
  const qs=new URLSearchParams({start:event.startDate,end:event.startDate,location:'city:'+event.city,'ticketmaster-qa':marker+'-'+event.id});
  const url=origin+'/events?'+qs.toString();
  const response=await fetch(url,{redirect:'follow',cache:'no-store',signal:AbortSignal.timeout(25_000),headers:{'user-agent':'TexasDefined-Ticketmaster-Impact-Production-QA/1.0'}});
  if (!response.ok) throw new Error('Calendar HTTP '+response.status+' for '+event.id);
  const html=await response.text();
  const list = html.match(/<ul\b[^>]*class="[^"]*\bev-results-list\b[^"]*"[^>]*>([\s\S]*?)<\/ul>/i)?.[1];
  if (!list) throw new Error('Missing server-rendered calendar result list for '+event.id);
  const card=[...list.matchAll(/<li\b([^>]*?)>([\s\S]*?)<\/li>/gi)].find(m=>decode(m[1]).includes('calendar-event-ticketmaster:'+event.id));
  if (!card) return false; // A merged editorial authority card may own this event; try next.
  found++;
  const links=[...card[2].matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)];
  const candidate=links.find(a=>/Find Tickets/.test(decode(a[2].replace(/<[^>]*>/g,' '))));
  if (!candidate) throw new Error('Exact Ticketmaster card '+event.id+' lacks Find Tickets CTA');
  const attr=candidate[1];
  const href=decode(attr.match(/\bhref="([^"]+)"/i)?.[1]||'');
  const affiliate=new URL(href);
  if (affiliate.hostname!=='ticketmaster.evyy.net'
     || !/^\/c\/7758914\/\d+\/4272\/?$/.test(affiliate.pathname)
     || affiliate.searchParams.get('u')!==event.officialUrl) {
    throw new Error('Impact checkout destination mismatch for '+event.id);
  }
  if (!/\brel="[^"]*sponsored[^"]*nofollow[^"]*"/.test(attr)
      || !/data-affiliate-partner="ticketmaster"/.test(attr)
      || !/data-commercial-partner="ticketmaster"/.test(attr)
      || !card[2].includes('Affiliate link')) {
    throw new Error('Sponsored disclosure or affiliate attribution missing for '+event.id);
  }
  checked++;
  console.log('PASS Ticketmaster live affiliate checkout: '+event.id+' '+event.startDate+' '+event.city+' event-specific tracked redirect, sponsored disclosure, click attribution; HTTP 200.');
  return true;
}
for (let i=0;i<candidates.length && !checked;i+=3) {
  const chunk=candidates.slice(i,i+3);
  await Promise.all(chunk.map(async event => {try{await verify(event);}catch(e){failures.push(String(e));}}));
}
if (!checked) throw new Error('No live Ticketmaster affiliate CTA could be verified from '+candidates.length+' fresh event candidates. '+failures.slice(0,5).join('; '));
if (failures.length) throw new Error('Additional checked Ticketmaster events had mismatched checkout: '+failures.join('; '));
console.log('PASS: real Ticketmaster-to-Impact end-to-end public calendar verification; seat inventory intentionally not asserted.');
