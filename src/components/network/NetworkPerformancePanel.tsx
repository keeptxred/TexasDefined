import {useEffect,useState} from 'react';
import {supabase} from '@/integrations/supabase/client';

type PlusReport={tier:'plus'|'featured';period:string;asOf:string;
 views:number;contactActions:number;notice:string};
type FeaturedReport=PlusReport&{tier:'featured';
 actionBreakdown:{website:number;social:number;phone:number};
 recentSevenDays:number;priorSevenDays:number;
 daily:{day:string;views:number;actions:number}[]};
export function NetworkPerformancePanel({applicationId,userId,tier}:{
 applicationId:string;userId:string;tier:'plus'|'featured';
}){
 const [report,setReport]=useState<PlusReport|FeaturedReport|null>(null);
 const [state,setState]=useState<'loading'|'ready'|'error'>('loading');
 useEffect(()=>{
  let active=true;
  setReport(null);setState('loading');
  void (async()=>{
   const {data:{session}}=await supabase.auth.getSession();
   if(!active)return;
   if(!session||session.user.id!==userId){setState('error');return}
   const response=await fetch('/api/public/network-metrics?applicationId='+encodeURIComponent(applicationId),{
    headers:{authorization:'Bearer '+session.access_token},cache:'no-store',
   });
   if(!active)return;
   if(!response.ok){setState('error');return}
   const result=await response.json() as {ok?:boolean;report?:PlusReport|FeaturedReport};
   if(!active)return;
   if(result.ok!==true||!result.report||result.report.tier!==tier){
    setState('error');return;
   }
   setReport(result.report);setState('ready');
  })().catch(()=>{if(active)setState('error')});
  return()=>{active=false;setReport(null)};
 },[applicationId,userId,tier]);
 return <section className="mt-10 rounded-2xl border border-border bg-white p-6" aria-label="Private business listing performance">
  <h2 className="font-display text-2xl">My listing performance</h2>
  <p className="mt-2 text-sm text-muted-foreground">Private approximate statistics for your approved published listing, updated daily in UTC. No visitors are personally identified.</p>
  {state==='loading'&&<p role="status" className="mt-4">Loading reporting…</p>}
  {state==='error'&&<p role="status" className="mt-4">Your listing performance could not be verified. Sign in again or contact Texas Defined.</p>}
  {state==='ready'&&report&&<>
   <p className="mt-4 text-sm">{report.period} (through {report.asOf})</p>
   <div className="mt-4 grid grid-cols-2 gap-4">
    <div className="rounded-lg border p-4"><strong className="block text-3xl tabular-nums">{report.views.toLocaleString()}</strong><span className="text-sm">Observed profile displays</span></div>
    <div className="rounded-lg border p-4"><strong className="block text-3xl tabular-nums">{report.contactActions.toLocaleString()}</strong><span className="text-sm">Contact-link clicks</span></div>
   </div>
   {tier==='featured'&&report.tier==='featured'&&<div className="mt-8">
    <h3 className="font-display text-xl">Featured insights</h3>
    <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
     {[['Website',report.actionBreakdown.website],['Social',report.actionBreakdown.social],['Phone',report.actionBreakdown.phone]].map(([name,value])=><div key={name} className="rounded-lg border p-3"><strong className="block text-xl">{Number(value).toLocaleString()}</strong><span className="text-sm">{name} link clicks</span></div>)}
    </div>
    <p className="mt-5 text-sm">Last 7 days: <strong>{report.recentSevenDays}</strong> observed profile displays. Previous 7 days: <strong>{report.priorSevenDays}</strong>.</p>
    <h4 className="mt-5 font-semibold">Daily trend — last 14 days</h4>
    <div className="mt-3 space-y-2" role="list" aria-label="Daily observed listing traffic">
     {report.daily.slice(-14).map(day=><div key={day.day} role="listitem" className="flex items-center gap-3 text-sm">
      <span>{day.day.slice(5)}</span>
      <div className="min-w-0 flex-1 h-3 rounded-full bg-muted" aria-hidden="true"><div className="h-3 rounded-full bg-primary" style={{width:(day.views?Math.max(3,100*day.views/Math.max(1,...report.daily.map(x=>x.views))):0)+'%'}}/></div>
      <span className="text-right tabular-nums">{day.views} views</span>
     </div>)}
    </div>
   </div>}
   <p className="mt-5 text-xs text-muted-foreground">{report.notice} Duplicate visits, automated traffic and browser privacy tools can affect these counts. Zero means no events were recorded in this period.</p>
  </>}
 </section>;
}
