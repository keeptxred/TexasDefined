import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { getNetworkApplications, reviewNetworkApplication } from '@/data/network-review.functions';

export const Route = createLazyFileRoute('/admin/network-applications')({component: NetworkReview});

function NetworkReview(){
 const [key,setKey]=useState('');
 const [rows,setRows]=useState<Array<Record<string,any>>|null>(null);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [status,setStatus]=useState('pending_review');
 async function reload(){const r=await getNetworkApplications({data:{accessKey:key}});setRows(r.applications as Array<Record<string,any>>)}
 async function moderate(id:string,action:'approve'|'reject'|'reopen'){setBusy(true);try{await reviewNetworkApplication({data:{accessKey:key,id,action}});await reload()}catch(e){setError(e instanceof Error?e.message:'Update failed')}finally{setBusy(false)}}
 return <main><Container className="py-12"><h1 className="font-display text-4xl">Network applications</h1><p className="mt-3 text-muted-foreground">Review business listings before publication. Approval alone does not publish or bill a customer.</p>
 {!rows?<form className="mt-8 flex flex-wrap gap-3" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await reload();setError('')}catch(err){setError(err instanceof Error?err.message:'Access denied')}finally{setBusy(false)}}}><label>Admin access key <input className="ml-2 border border-border p-3" type="password" minLength={20} value={key} onChange={e=>setKey(e.target.value)} required/></label><button className="bg-primary px-5 py-3 text-primary-foreground" disabled={busy}>Unlock</button></form>:<><select className="mt-6 border border-border p-3" value={status} onChange={e=>setStatus(e.target.value)}><option value="pending_review">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="all">All</option></select><div className="mt-6 space-y-5">{rows.filter(r=>status==='all'||r.status===status).map(r=><article key={r.id} className="rounded-xl border border-border bg-background p-6"><h2 className="font-display text-2xl">{r.business_name}</h2><p>{r.category} · {r.city} · {r.plan} · {r.status}</p><p className="mt-3 whitespace-pre-wrap">{r.description}</p><p className="mt-2 text-sm">{r.contact_email} · {r.phone}</p><div className="mt-4 grid grid-cols-3 gap-3">{r.media?.map((m:{url:string|null,path:string})=>m.url?<img key={m.path} src={m.url} alt="Submitted business photo" className="aspect-square w-full object-contain"/>:null)}</div><div className="mt-5 flex gap-3"><button disabled={busy} className="bg-primary px-4 py-2 text-primary-foreground" onClick={()=>void moderate(r.id,'approve')}>Approve</button><button disabled={busy} className="border border-border px-4 py-2" onClick={()=>void moderate(r.id,'reject')}>Reject</button><button disabled={busy} className="border border-border px-4 py-2" onClick={()=>void moderate(r.id,'reopen')}>Reopen</button></div></article>)}</div></>}
 {error&&<p role="alert" className="mt-4 text-red-700">{error}</p>}
 </Container></main>
}
