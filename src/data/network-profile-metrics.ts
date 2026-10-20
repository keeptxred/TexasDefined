/** Private-owner reports from observed aggregate events; not unique visitors,
 * leads, bookings, humans or advertising attribution. Counts are best-effort.
 * This pure transform never receives IP, email or visitor identifiers. */
export const NETWORK_METRIC_ACTIONS=['profile_view','website_click','social_click','phone_click'] as const;
export type NetworkMetricAction=typeof NETWORK_METRIC_ACTIONS[number];
export type NetworkMetricRow={observed_on:unknown;action:unknown;event_count:unknown};
const isoDay=/^\d{4}-\d{2}-\d{2}$/;
const safeCount=(v:unknown):number=>{
 const count=typeof v==='number'?v:typeof v==='string'&&/^\d+$/.test(v)?Number(v):NaN;
 if(!Number.isSafeInteger(count)||count<0||count>100000)
  throw Error('Network metrics count invalid');
 return count;
};
export function summarizeNetworkOwnerMetrics(rows:unknown,tier:'plus'|'featured',asOf:string){
 if(tier!=='plus'&&tier!=='featured'||!isoDay.test(asOf)||
    new Date(asOf+'T00:00:00.000Z').toISOString().slice(0,10)!==asOf||
    !Array.isArray(rows)||rows.length>180)
  throw Error('Network metrics response invalid');
 const end=Date.parse(asOf+'T00:00:00.000Z');
 const counts=new Map<string,number>();
 for(const row of rows){
  if(!row||typeof row!=='object'||Array.isArray(row))
   throw Error('Network metrics row invalid');
  const r=row as NetworkMetricRow;
  if(typeof r.observed_on!=='string'||!isoDay.test(r.observed_on)||
     !NETWORK_METRIC_ACTIONS.includes(r.action as NetworkMetricAction))
   throw Error('Network metrics row invalid');
  const day=Date.parse(r.observed_on+'T00:00:00.000Z');
  if(!Number.isFinite(day)||new Date(day).toISOString().slice(0,10)!==r.observed_on||
     day>end ||end-day>29*86400000)
   throw Error('Network metrics row outside authorized 30-day period');
  const key=r.observed_on+':'+r.action;
  if(counts.has(key))throw Error('Network metrics duplicate row');
  counts.set(key,safeCount(r.event_count));
 }
 const daily=Array.from({length:30},(_,i)=>{
  const day=new Date(end-(29-i)*86400000).toISOString().slice(0,10);
  const views=counts.get(day+':profile_view')||0;
  const website=counts.get(day+':website_click')||0;
  const social=counts.get(day+':social_click')||0;
  const phone=counts.get(day+':phone_click')||0;
  return {day,views,website,social,phone,actions:website+social+phone};
 });
 const sum=(selector:(r:typeof daily[number])=>number,series=daily)=>
  series.reduce((n,r)=>n+selector(r),0);
 const totals={views:sum(r=>r.views),contactActions:sum(r=>r.actions)};
 if(tier==='plus')return {period:'Last 30 UTC days',asOf,tier,...totals,
   notice:'Observed page displays and outbound/contact-link clicks, not unique people or confirmed leads.'};
 return {period:'Last 30 UTC days',asOf,tier,...totals,
  actionBreakdown:{website:sum(r=>r.website),social:sum(r=>r.social),phone:sum(r=>r.phone)},
  recentSevenDays:sum(r=>r.views,daily.slice(-7)),
  priorSevenDays:sum(r=>r.views,daily.slice(-14,-7)),
  daily,
  notice:'Observed events only; not unique people or confirmed leads. Daily values use UTC.'};
}
