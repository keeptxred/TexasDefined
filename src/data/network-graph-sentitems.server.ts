/**
 * Read-only Microsoft Graph Sent Items proof of a specific submitted notice.
 * 202 from sendMail alone is NOT proof. A distinct x- notification-id header in
 * a mailbox Sent Items message, matching subject and sole recipient, is proof
 * of mailbox submission only (not final recipient delivery). No automatic
 * retransmission occurs when the proof is not found.
 *
 * Graph app needs Exchange-mailbox-scoped Application Mail.ReadBasic alongside
 * Application Mail.Send. Never grant unscoped tenant-wide read permissions.
 */
import type {NetworkGraphClaimPlan} from './network-notification-claim-plan.server.ts';
export type NetworkSentEvidence={messageId:string;reference:string};
const base='https://graph.microsoft.com/v1.0/users/admin%40texasdefined.com';
const idPattern=/^[a-zA-Z0-9=_+\-/]{6,300}$/;
const headerName='x-texasdefined-notification-id';

export async function findNetworkGraphSentItemsEvidence(
 plan:NetworkGraphClaimPlan,
 bearerToken:string,
 transport:typeof fetch=fetch,
):Promise<NetworkSentEvidence|null>{
 if(!plan||typeof plan!=='object'||
   !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(plan.id) ||
   typeof bearerToken!=='string'||bearerToken.length<24||bearerToken.length>8192||
   /[\x00-\x20\x7f]/.test(bearerToken))
  throw Error('Network Graph Sent Items query invalid');
 const headers={Authorization:'Bearer '+bearerToken};
 const listUrl=base+'/mailFolders/sentitems/messages?'+
   new URLSearchParams({'$top':'60','$select':'id,subject,sentDateTime,toRecipients','$orderby':'sentDateTime desc'});
 let res:Response;
 try{
  res=await transport(listUrl,{method:'GET',headers,redirect:'error',
   cache:'no-store',signal:AbortSignal.timeout(12_000)});
 }catch{throw Error('Network Graph Sent Items listing unavailable');}
 if(res.status!==200)throw Error('Network Graph Sent Items listing unavailable');
 let value:unknown;
 try{value=await res.json();}catch{throw Error('Network Graph Sent Items response invalid');}
 const rows=(value as {value?:unknown})?.value;
 if(!Array.isArray(rows)||rows.length>60)throw Error('Network Graph Sent Items response invalid');
 const subject=plan.graphPayload.message.subject;
 const recipient=plan.recipient.toLowerCase();
 let candidateChecks=0;
 for(const item of rows){
  if(!item || typeof item!=='object')continue;
  const candidate=item as Record<string,any>;
  if(candidate.subject!==subject ||typeof candidate.id!=='string'||!idPattern.test(candidate.id))continue;
  const to=candidate.toRecipients;
  if(!Array.isArray(to)||to.length!==1||
     String(to[0]?.emailAddress?.address||'').toLowerCase()!==recipient)continue;
  if(++candidateChecks>8)throw Error('Network Graph Sent Items matching set unbounded');
  let proofResponse:Response;
  try{
   proofResponse=await transport(base+'/messages/'+encodeURIComponent(candidate.id)+
    '?$select=id,subject,internetMessageHeaders,toRecipients',{
      method:'GET',headers,redirect:'error',cache:'no-store',
      signal:AbortSignal.timeout(12_000),
    });
  }catch{throw Error('Network Graph Sent Items header lookup unavailable');}
  if(proofResponse.status!==200)throw Error('Network Graph Sent Items header lookup unavailable');
  let proof:Record<string,any>;
  try{proof=await proofResponse.json();}catch{throw Error('Network Graph Sent Items header response invalid');}
  const dest=proof?.toRecipients;
  if(proof?.id!==candidate.id ||proof.subject!==subject||
     !Array.isArray(dest)||dest.length!==1||
     String(dest[0]?.emailAddress?.address||'').toLowerCase()!==recipient ||
     !Array.isArray(proof.internetMessageHeaders))
   continue;
  const matches=proof.internetMessageHeaders.filter((h:unknown)=>{
   if(!h||typeof h!=='object')return false;
   const o=h as Record<string,unknown>;
   return typeof o.name==='string' &&o.name.toLowerCase()===headerName&&o.value===plan.id;
  });
  if(matches.length===1){
   return {messageId:candidate.id,
    reference:'graph-sentitems-header-match/'+plan.id+'/'+candidate.id};
  }
 }
 return null;
}
