#!/usr/bin/env node
/**
 * Bounded public HTTP checks of official EDITORIAL event purchase destinations.
 * Never follow redirects, make reservations, infer seats/price/commissions, or
 * bypass 401/403/429/CAPTCHA. This runs AFTER the managed Ticketmaster probe
 * in the SAME governed Texas Events refresh workflow and checkpoint ledger.
 */
import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const ledgerPath = 'ops/editorial/event-ticketing-verification-ledger.json';
export const EDITORIAL_PROBE_LIMIT = 25;

// Explicit public ticketing service hosts only. Organizers on bespoke domains
// keep their source-qualified links, but are not fetched by this automation.
const PROVIDERS = new Set([
  'ticketing.roninpos.app', 'ticketsignup.io', 'ticketsignup.com',
  'etix.com', 'ticketmaster.com', 'ticketweb.com', 'eventbrite.com',
  'axs.com', 'livenation.com', 'seatgeek.com', 'vividseats.com',
  'tixr.com', 'ticketspice.com', 'ticketleap.com', 'showclix.com',
  'gofan.co', 'universe.com', 'tix.com',
]);
export function approvedEditorialProbeUrl(value) {
  if (typeof value !== 'string') return null;
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:' || u.username || u.password || u.port
      || !PROVIDERS.has(u.hostname.toLowerCase().replace(/^www\./,''))) return null;
    if (!u.pathname || u.pathname === '/') return null;
    return u;
  } catch { return null; }
}

export function editorialProbeOutcome(status, location, origin) {
  if (status >= 200 && status < 300) return 'REACHABLE_NO_INVENTORY_CLAIM';
  if (status >= 300 && status < 400) {
    try {
      const next = location ? new URL(location, origin) : null;
      if (!next || !approvedEditorialProbeUrl(next.href)) return 'REDIRECT_UNVERIFIED_INCONCLUSIVE';
      // Even on an approved domain, a redirect to another showtime is not
      // evidence that the original performance is purchasable.
      // Checkout systems may key the performance, date, section, or event ID
      // in QUERY PARAMETERS, not only in pathname. Ignore fragment-only
      // changes but require the canonical destination (including search) to
      // remain the same before treating a redirect as same performance.
      const sameCheckout = next.origin === origin.origin
        && next.pathname === origin.pathname
        && next.search === origin.search;
      return sameCheckout
        ? 'REDIRECT_SAME_PATH_NO_INVENTORY_CLAIM'
        : 'REDIRECT_DIFFERENT_DESTINATION_REVIEW';
    } catch { return 'REDIRECT_UNVERIFIED_INCONCLUSIVE'; }
  }
  if (status === 404 || status === 410) return 'REVIEW_NOT_FOUND';
  if ([401,403,429].includes(status)) return 'ACCESS_RESTRICTED_INCONCLUSIVE';
  if (status >= 500) return 'PROVIDER_SERVER_ERROR_INCONCLUSIVE';
  return 'HTTP_' + status + '_INCONCLUSIVE';
}

export async function probeEditorialOfficialUrl(url, fetcher = fetch) {
  const source = approvedEditorialProbeUrl(url);
  if (!source) return { probeStatus:'UNLISTED_PROVIDER_INCONCLUSIVE', httpStatus:null };
  try {
    const options = { method:'HEAD', redirect:'manual', signal:AbortSignal.timeout(6000) };
    let response = await fetcher(source.href, options);
    if (response.status === 405) {
      response.body?.cancel?.();
      response = await fetcher(source.href, {...options,method:'GET'});
    }
    const probeStatus = editorialProbeOutcome(response.status,response.headers?.get?.('location'),source);
    response.body?.cancel?.();
    return {probeStatus,httpStatus:response.status};
  } catch(error) {
    return {probeStatus:'NETWORK_INCONCLUSIVE',httpStatus:null,reason:String(error?.name ?? 'network').slice(0,32)};
  }
}

export function texasLocalToday(now=new Date()) {
  const parts=new Intl.DateTimeFormat('en-US',{timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
  const p=(key)=>parts.find((v)=>v.type===key)?.value??'00';
  return [p('year'),p('month'),p('day')].join('-');
}

export function selectEditorialProbeBatch(entries, history, now=new Date(), limit=EDITORIAL_PROBE_LIMIT) {
  const today=texasLocalToday(now);
  const staleBefore=now.getTime()-14*86400000;
  const filtered=entries.filter((row)=>row && row.id && row.ticketUrl && row.startDate
    && (row.endDate??row.startDate)>=today
    && row.status==='scheduled'
    && !row.isAffiliate
    && !row.id.startsWith('ticketmaster:'))
    .sort((a,b)=>a.startDate.localeCompare(b.startDate)||a.id.localeCompare(b.id));
  const pending=filtered.filter((row)=>{
    const old=history['editorial:'+row.id];
    if (!old || old.officialUrl!==row.ticketUrl || old.date!==row.startDate) return true;
    const checked=Date.parse(old.checkedAt??'');
    return !Number.isFinite(checked)||checked<=staleBefore;
  });
  return {candidates:pending.slice(0,limit),eligible:filtered.length,pending:pending.length};
}

async function main() {
  const {createServer}=await import('vite');
  const server=await createServer({
    configFile:false,appType:'custom',logLevel:'error',
    resolve:{alias:{'@':path.resolve(process.cwd(),'src')}},
    server:{middlewareMode:true},
  });
  let entries;
  try {
    const records=await server.ssrLoadModule('/src/data/events/texas-event-records.server.ts');
    const calendar=await server.ssrLoadModule('/src/data/events/texas-event-calendar.server.ts');
    const provider=await server.ssrLoadModule('/src/data/events/ticket-provider.ts');
    const events=records.loadTexasEventRecordsServer();
    const card=calendar.buildTexasEventCarouselItemsServer(events);
    entries=events.map((event,i)=>{
      const cta=card[i]?.ticketCta;
      return {
        id:event.id,title:event.title,startDate:event.startDate,endDate:event.endDate,
        city:event.city,venue:event.venueName,status:event.status,
        ticketUrl:cta && !cta.isAffiliate && provider.isEventSpecificTicketDestination(cta.href)
          ? cta.href : null,
        isAffiliate:Boolean(cta?.isAffiliate),
      };
    });
  } finally { await server.close(); }

  const ledger=JSON.parse(await readFile(ledgerPath,'utf8'));
  if(!ledger?.statewide) throw new Error('Missing governed statewide ledger');
  const history=ledger.statewide.ticketLinkProbes??{};
  const checkedAt=new Date().toISOString();
  const {candidates,eligible,pending}=selectEditorialProbeBatch(entries,history,new Date(checkedAt));
  for(let index=0;index<candidates.length;index+=3) {
    await Promise.all(candidates.slice(index,index+3).map(async(row)=>{
      const probe=await probeEditorialOfficialUrl(row.ticketUrl);
      history['editorial:'+row.id]={
        status:'IN_PROGRESS',eventId:row.id,eventName:row.title,
        date:row.startDate,city:row.city,venue:row.venue,
        officialUrl:row.ticketUrl,checkedAt,...probe,
        seatInventory:'NOT_VERIFIED',purchasePrice:'NOT_VERIFIED',
        commissionEligibility:'NOT_VERIFIED',
      };
    }));
  }
  const outcomeCounts={};
  for(const row of candidates){
    const state=history['editorial:'+row.id].probeStatus;
    outcomeCounts[state]=(outcomeCounts[state]??0)+1;
  }
  ledger.statewide.ticketLinkProbes=history;
  ledger.statewide.ticketLinkProbeLatestRun={
    ...ledger.statewide.ticketLinkProbeLatestRun,
    editorialOfficial:{
      checkedAt,count:candidates.length,eligible,pending,outcomes:outcomeCounts,
      publicHttpOnly:true,inventoryVerified:false,pricesVerified:false,
      authorizationsVerified:false,
    },
  };
  ledger.updatedAt=checkedAt.slice(0,10);
  await writeFile(ledgerPath,JSON.stringify(ledger,null,2)+'\n','utf8');
  const review=candidates.filter((row)=>/REVIEW/.test(history['editorial:'+row.id].probeStatus));
  console.log('Editorial official ticket probes: '+JSON.stringify(ledger.statewide.ticketLinkProbeLatestRun.editorialOfficial)
    +'. 2xx is reachability only; not event-specific live seats or purchase success.');
  if(review.length) console.warn('::warning title=Editorial ticket destinations for review::'
    +review.map((row)=>row.id+':'+history['editorial:'+row.id].probeStatus).join(', ').slice(0,1200));
}

if(process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) await main();
