import "../network.css";
import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { getNetworkApplications, reviewNetworkApplication, getNetworkRevisionQueue, reviewFeaturedRevision, publishNetworkListing, unpublishReviewedNetworkListing, provisionNetworkOwner, previewNetworkDraftCleanup, previewNetworkPublishedMediaCleanup, getNetworkNotificationRecovery, reconcileNetworkNotification } from '@/data/network-review.functions';

export const Route = createLazyFileRoute('/admin/network-applications')({component: NetworkReview});

function NetworkReview(){
 const [key,setKey]=useState('');
 const [rows,setRows]=useState<Array<Record<string,any>>|null>(null);
 const [revisions,setRevisions]=useState<Array<Record<string,any>>>([]);
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 const [status,setStatus]=useState('pending_review');
 const [ownerUserIds,setOwnerUserIds]=useState<Record<string,string>>({});
 const [ownershipProof,setOwnershipProof]=useState<Record<string,boolean>>({});
 const [verificationMethods,setVerificationMethods]=useState<Record<string,'official_domain'|'registry_documents'|'verified_public_phone'|'in_person'|'other_documented'>>({});
 const [verificationEvidence,setVerificationEvidence]=useState<Record<string,string>>({});
 const [reviewerLabels,setReviewerLabels]=useState<Record<string,string>>({});
 const [recoveryRows,setRecoveryRows]=useState<Array<{id:string;eventType:string;recipientMasked:string;status:string;attempts:number;claimedAt:string|null;errorCode:string|null}>|null>(null);
 const [recoveryResolution,setRecoveryResolution]=useState<Record<string,'sent_verified'|'not_delivered_retry'|'failed_verified'|'suppress_uncertain'>>({});
 const [recoveryEvidence,setRecoveryEvidence]=useState<Record<string,string>>({});
 const [recoveryProviderId,setRecoveryProviderId]=useState<Record<string,string>>({});
 const [recoveryReviewer,setRecoveryReviewer]=useState<Record<string,string>>({});
 const [recoveryConfirmNoDelivery,setRecoveryConfirmNoDelivery]=useState<Record<string,boolean>>({});
 const [orphanDrafts,setOrphanDrafts]=useState<Array<{path:string;uploaded_at:string}>|null>(null);
 const [orphanPublishedMedia,setOrphanPublishedMedia]=useState<Array<{path:string;uploaded_at:string}>|null>(null);
 async function bindOwner(id:string) {
  setBusy(true);setError('');
  try {
   const uid=(ownerUserIds[id]||'').trim();
   const result=await provisionNetworkOwner({data:{accessKey:key,applicationId:id,userId:uid,ownershipVerified:true,
     verificationMethod:verificationMethods[id]||'other_documented',
     evidenceReference:verificationEvidence[id]||'',reviewerLabel:reviewerLabels[id]||''}});
   setError('Verified owner access enabled for application '+id+' (account '+result.id+').');
   await reload();
  } catch(e) {setError(e instanceof Error?e.message:'Owner provisioning failed')}
  finally {setBusy(false)}
 }
 async function loadRecovery(){
  setBusy(true);setError('');
  try{setRecoveryRows(await getNetworkNotificationRecovery({data:{accessKey:key}}))}
  catch(e){setError(e instanceof Error?e.message:'Notification recovery unavailable')}
  finally{setBusy(false)}
 }
 async function resolveNotice(id:string){
  setBusy(true);setError('');
  try{
   const resolution=recoveryResolution[id]||'suppress_uncertain';
   const result=await reconcileNetworkNotification({data:{
    accessKey:key,id,resolution,
    evidenceReference:recoveryEvidence[id]||'',
    reviewerLabel:recoveryReviewer[id]||'',
    verifiedProviderId:resolution==='sent_verified'?recoveryProviderId[id]||null:null,
    confirmedNoDelivery:resolution==='not_delivered_retry'&&!!recoveryConfirmNoDelivery[id],
   }});
   setError('Audited notification recovery accepted: '+result.id+' ('+result.resolution+').');
   setRecoveryRows(await getNetworkNotificationRecovery({data:{accessKey:key}}));
  }catch(e){setError(e instanceof Error?e.message:'Notification recovery was not accepted')}
  finally{setBusy(false)}
 }
 async function previewOrphans(){
  setBusy(true);setError('');
  try{setOrphanDrafts(await previewNetworkDraftCleanup({data:{accessKey:key}}))}
  catch(e){setError(e instanceof Error?e.message:'Draft inventory unavailable')}
  finally{setBusy(false)}
 }
 async function previewPublishedCopies(){
  setBusy(true);setError('');
  try{setOrphanPublishedMedia(await previewNetworkPublishedMediaCleanup({data:{accessKey:key}}))}
  catch(e){setError(e instanceof Error?e.message:'Published-media inventory unavailable')}
  finally{setBusy(false)}
 }
 async function reload(){const r=await getNetworkApplications({data:{accessKey:key}});setRows(r.applications as Array<Record<string,any>>);const changes=await getNetworkRevisionQueue({data:{accessKey:key}});setRevisions(changes as Array<Record<string,any>>)}
 async function moderate(id:string,action:'approve'|'reject'|'reopen'){setBusy(true);try{await reviewNetworkApplication({data:{accessKey:key,id,action}});await reload()}catch(e){setError(e instanceof Error?e.message:'Update failed')}finally{setBusy(false)}}
 async function publish(id:string){setBusy(true);setError('');try{const result=await publishNetworkListing({data:{accessKey:key,id}});await reload();setError('Published: '+result.url)}catch(e){setError(e instanceof Error?e.message:'Publication failed')}finally{setBusy(false)}}
 async function unpublish(id:string){setBusy(true);setError('');try{await unpublishReviewedNetworkListing({data:{accessKey:key,id}});await reload()}catch(e){setError(e instanceof Error?e.message:'Unpublish failed')}finally{setBusy(false)}}
 async function moderateRevision(id:string,decision:'approve'|'reject'){setBusy(true);try{await reviewFeaturedRevision({data:{accessKey:key,id,decision}});await reload()}catch(e){setError(e instanceof Error?e.message:'Revision review failed')}finally{setBusy(false)}}
 return <div><Container className="py-12"><h1 className="font-display text-4xl">Network applications</h1><p className="mt-3 text-muted-foreground">Review business listings before publication. Approval alone does not publish or bill a customer.</p>
 {!rows?<form className="mt-8 flex flex-wrap gap-3" onSubmit={async e=>{e.preventDefault();setBusy(true);try{await reload();setError('')}catch(err){setError(err instanceof Error?err.message:'Access denied')}finally{setBusy(false)}}}><label>Dedicated Network admin key <input className="ml-2 border border-border p-3" type="password" minLength={32} value={key} onChange={e=>setKey(e.target.value)} required/></label><button className="bg-primary px-5 py-3 text-primary-foreground" disabled={busy}>Unlock</button></form>:<><select className="mt-6 border border-border p-3" value={status} onChange={e=>setStatus(e.target.value)}><option value="pending_review">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option><option value="all">All</option></select>
 <section className="mt-6 rounded-xl border border-border p-4" aria-label="Private Network notification recovery">
  <div className="flex flex-wrap items-center gap-3"><h2 className="font-display text-xl">Unconfirmed email delivery</h2>
    <button type="button" disabled={busy} onClick={()=>void loadRecovery()} className="rounded-lg border border-primary px-4 py-2 text-primary disabled:opacity-40">Inspect notification holds</button></div>
  <p className="mt-2 text-sm text-muted-foreground">Administrator-only review. Graph acceptance alone is not proof of a sent message. Do not retry unless the provider independently confirms non-delivery. Evidence and each decision are recorded in an audit table.</p>
  {recoveryRows!==null&&<div className="mt-4 space-y-5">
    {recoveryRows.length===0?<p role="status" className="text-sm">No uncertain, suppressed, or failed email notices.</p>:recoveryRows.map(row=><article key={row.id} className="rounded-lg border border-border p-4">
      <p className="text-sm"><strong>{row.eventType}</strong> · {row.recipientMasked} · {row.status} · attempts {row.attempts}</p>
      <p className="mt-1 break-all text-xs text-muted-foreground">Outbox ID {row.id}{row.errorCode?' · '+row.errorCode:''}</p>
      {['sending','suppressed'].includes(row.status)&&<div className="mt-3 grid gap-3">
        <label className="text-sm">Provider reconciliation outcome
          <select className="mt-1 block w-full rounded border border-border p-2" value={recoveryResolution[row.id]||'suppress_uncertain'} onChange={e=>setRecoveryResolution(p=>({...p,[row.id]:e.target.value as 'sent_verified'|'not_delivered_retry'|'failed_verified'|'suppress_uncertain'}))}>
            <option value="suppress_uncertain">Keep suppressed—delivery uncertain</option>
            <option value="sent_verified">Sent Items—exact header verified</option>
            <option value="failed_verified">Provider failure independently confirmed</option>
            <option value="not_delivered_retry">Confirmed not delivered—authorize one retry</option>
          </select></label>
        <label className="text-sm">Evidence reference (20–500 characters)
          <textarea className="mt-1 block w-full rounded border border-border p-2" rows={2} maxLength={500} value={recoveryEvidence[row.id]||''} onChange={e=>setRecoveryEvidence(p=>({...p,[row.id]:e.target.value}))}/></label>
        {(recoveryResolution[row.id]==='sent_verified')&&<label className="text-sm">Exact Graph Sent Items message ID
          <input className="mt-1 block w-full rounded border border-border p-2" value={recoveryProviderId[row.id]||''} onChange={e=>{
            const messageId=e.target.value;
            setRecoveryProviderId(p=>({...p,[row.id]:messageId}));
            setRecoveryEvidence(p=>({...p,[row.id]:'graph-sentitems-header-match/'+row.id+'/'+messageId}));
          }}/>
          <span className="mt-1 block text-xs text-muted-foreground">Requires independently matching message header, recipient and subject in the admin mailbox.</span></label>}
        <label className="text-sm">Reviewer / initials
          <input className="mt-1 block w-full rounded border border-border p-2" maxLength={100} value={recoveryReviewer[row.id]||''} onChange={e=>setRecoveryReviewer(p=>({...p,[row.id]:e.target.value}))}/></label>
        {recoveryResolution[row.id]==='not_delivered_retry'&&<label className="flex gap-2 text-sm">
          <input type="checkbox" checked={!!recoveryConfirmNoDelivery[row.id]} onChange={e=>setRecoveryConfirmNoDelivery(p=>({...p,[row.id]:e.target.checked}))}/>
          I independently confirmed this notice was not accepted or delivered, and explicitly authorize its next attempt.</label>}
        <button type="button" disabled={busy||(recoveryEvidence[row.id]||'').trim().length<20||(recoveryReviewer[row.id]||'').trim().length<3||
          (recoveryResolution[row.id]==='sent_verified'&&!(recoveryProviderId[row.id]||''))||
          (recoveryResolution[row.id]==='not_delivered_retry'&&!recoveryConfirmNoDelivery[row.id])}
          onClick={()=>void resolveNotice(row.id)} className="rounded-lg border border-amber-700 px-4 py-2 text-amber-800 disabled:opacity-40">Record audited resolution</button>
      </div>}
      {row.status==='failed'&&<p className="mt-2 text-xs text-muted-foreground">Final failure: inspect provider logs; this page will not blindly resend it.</p>}
    </article>)}
  </div>}
 </section>
 <section className="mt-6 rounded-xl border border-border p-4" aria-label="Private draft-media retention preview">
  <button type="button" disabled={busy} onClick={()=>void previewOrphans()} className="rounded-lg border border-primary px-4 py-2 text-primary disabled:opacity-40">Preview 45-day unused draft candidates</button>
  <p className="mt-2 text-xs text-muted-foreground">Read-only inventory. This screen never deletes files. Referenced and recent drafts are excluded.</p>
  {orphanDrafts!==null&&<div className="mt-4 text-sm" role="status">
   <strong>{orphanDrafts.length} possible unused drafts</strong>
   {orphanDrafts.length>0&&<ul className="mt-3 list-disc space-y-2 pl-5">
    {orphanDrafts.map(row=><li key={row.path}><code className="break-all">{row.path}</code><span className="ml-2 text-muted-foreground">Uploaded {row.uploaded_at}</span></li>)}
   </ul>}
  </div>}
 </section>
 <section className="mt-6 rounded-xl border border-border p-4" aria-label="Published media orphan inventory">
  <button type="button" disabled={busy} onClick={()=>void previewPublishedCopies()} className="rounded-lg border border-primary px-4 py-2 text-primary disabled:opacity-40">Preview 45-day unused published-image copies</button>
  <p className="mt-2 text-xs text-muted-foreground">Read-only candidate list. This never deletes media. Images referenced by published OR unpublished listings and revision records are excluded.</p>
  {orphanPublishedMedia!==null&&<div className="mt-4 text-sm" role="status">
   <strong>{orphanPublishedMedia.length} possible unused published-media copies</strong>
   {orphanPublishedMedia.length>0&&<ul className="mt-3 list-disc space-y-2 pl-5">
    {orphanPublishedMedia.map(row=><li key={row.path}><code className="break-all">{row.path}</code><span className="ml-2 text-muted-foreground">Uploaded {row.uploaded_at}</span></li>)}
   </ul>}
  </div>}
 </section>
 <div className="mt-6 space-y-5">{rows.filter(r=>status==='all'||r.status===status).map(r=><article key={r.id} className="rounded-xl border border-border bg-background p-6"><h2 className="font-display text-2xl">{r.business_name}</h2><p>{r.category} · {r.city} · {r.plan} · {r.status}</p><p className="mt-3 whitespace-pre-wrap">{r.description}</p><p className="mt-2 text-sm">{r.contact_email} · {r.phone}</p><div className="mt-4 grid grid-cols-3 gap-3">{r.media?.map((m:{url:string|null,path:string})=>m.url?<img key={m.path} src={m.url} alt="Submitted business photo" className="aspect-square w-full object-contain"/>:null)}</div><div className="mt-5 flex gap-3"><button disabled={busy} className="bg-primary px-4 py-2 text-primary-foreground" onClick={()=>void moderate(r.id,'approve')}>Approve</button><button disabled={busy||r.status!=='approved'||(r.plan==='plus'&&!r.paid_entitlement_active)} className="border border-primary px-4 py-2 text-primary disabled:opacity-40" onClick={()=>void publish(r.id)}>Publish approved listing</button><button disabled={busy} className="border border-border px-4 py-2" onClick={()=>void moderate(r.id,'reject')}>Reject</button><button disabled={busy} className="border border-border px-4 py-2" onClick={()=>void moderate(r.id,'reopen')}>Reopen</button>{r.status==='published' && r.listing_slug && <a className="border border-border px-4 py-2 text-primary" href={'/network/business/'+r.listing_slug} target="_blank" rel="noreferrer">View profile</a>}{r.status==='published' && <button disabled={busy} className="border border-amber-500 px-4 py-2 text-amber-800 disabled:opacity-40" onClick={()=>void unpublish(r.id)}>Unpublish</button>}</div>{r.plan==='plus'&&['approved','published'].includes(r.status)&&<div className="mt-5 rounded-lg border border-border p-4">
 <p className="font-semibold">Verified owner access (administrator only)</p>
 <p className="mt-2 text-sm">First independently verify the business ownership. The user's Supabase account must already exist and its confirmed email must exactly match this application. This does not send an email or charge a card.</p>
 <label className="mt-3 block text-sm">Verified Supabase user UUID <input className="mt-1 block w-full rounded border border-border p-2" value={ownerUserIds[r.id]||''} onChange={e=>setOwnerUserIds(prev=>({...prev,[r.id]:e.target.value}))} placeholder="00000000-0000-0000-0000-000000000000"/></label>
 <label className="mt-3 block text-sm">Independent verification method
  <select className="mt-1 block w-full rounded border border-border p-2" value={verificationMethods[r.id]||'other_documented'} onChange={e=>setVerificationMethods(prev=>({...prev,[r.id]:e.target.value as 'official_domain'|'registry_documents'|'verified_public_phone'|'in_person'|'other_documented'}))}>
   <option value="official_domain">Official business domain</option><option value="registry_documents">Official public registry evidence</option>
   <option value="verified_public_phone">Call to independently verified business number</option>
   <option value="in_person">In-person owner verification</option><option value="other_documented">Other documented independent check</option>
  </select>
 </label>
 <label className="mt-3 block text-sm">Evidence reference (public record URL or non-sensitive verification summary; no identification documents)
  <textarea className="mt-1 block w-full rounded border border-border p-2" minLength={20} maxLength={500}
    value={verificationEvidence[r.id]||''} onChange={e=>setVerificationEvidence(prev=>({...prev,[r.id]:e.target.value}))}/>
 </label>
 <label className="mt-3 block text-sm">Reviewer name or initials
  <input className="mt-1 block w-full rounded border border-border p-2" minLength={3} maxLength={100}
    value={reviewerLabels[r.id]||''} onChange={e=>setReviewerLabels(prev=>({...prev,[r.id]:e.target.value}))}/>
 </label>
 <label className="mt-3 flex items-start gap-2 text-sm"><input type="checkbox" checked={!!ownershipProof[r.id]} onChange={e=>setOwnershipProof(prev=>({...prev,[r.id]:e.target.checked}))}/>I independently verified this applicant controls the business and is authorized to manage its profile.</label>
 <button type="button" className="mt-3 border border-primary px-4 py-2 text-primary disabled:opacity-40" disabled={busy||!ownershipProof[r.id]||!/^[0-9a-f-]{36}$/i.test(ownerUserIds[r.id]||'')||(verificationEvidence[r.id]||'').trim().length<20||(reviewerLabels[r.id]||'').trim().length<3} onClick={()=>void bindOwner(r.id)}>Enable verified owner</button>
 </div>}</article>)}</div>
 <section className="mt-12 border-t border-border pt-8"><h2 className="font-display text-3xl">Featured change requests</h2><p className="mt-2 text-sm text-muted-foreground">Review proposed field edits. Approving a Featured revision applies approved changes to its published listing.</p><div className="mt-6 space-y-4">{revisions.filter(r=>r.review_status==='pending_review').map(r=><article key={r.id} className="rounded-xl border border-border p-6"><p className="text-sm text-muted-foreground">Business account {r.business_account_id}</p>{r.mediaValidationError&&<p role="alert" className="mt-2 text-sm font-semibold text-red-700">Invalid or foreign draft media references. Reject this revision; no private signed links have been generated.</p>}{Object.entries(r.proposed_profile||{}).map(([name,value])=><p key={name} className="mt-3 whitespace-pre-wrap"><strong>{name.replaceAll('_',' ')}:</strong> {String(value)}</p>)}<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{r.media?.map((m:{url:string|null,path:string})=>m.url?<img key={m.path} src={m.url} alt="Featured proposed new photo awaiting approval" className="aspect-square w-full rounded-xl object-contain"/>:null)}</div><div className="mt-5 flex gap-3"><button disabled={busy||!!r.mediaValidationError} className="bg-primary px-4 py-2 text-primary-foreground disabled:opacity-40" onClick={()=>void moderateRevision(r.id,'approve')}>Approve changes</button><button disabled={busy} className="border border-border px-4 py-2" onClick={()=>void moderateRevision(r.id,'reject')}>Reject changes</button></div></article>)}</div></section></>}
 {error&&<p role="alert" className="mt-4 text-red-700">{error}</p>}
 </Container></div>
}
