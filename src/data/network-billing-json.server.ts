/** Tiny authenticated-billing / Checkout POST contract: never parse unbounded JSON. */
export const NETWORK_BILLING_JSON_MAX_BYTES = 4_096;
export type NetworkBillingJsonResult =
 | { ok:true; value:unknown }
 | { ok:false; status:400|413 };

/** Content-Length is advisory only. Enforce the maximum on actual stream bytes. */
export async function parseBoundedNetworkBillingJson(request:Request):Promise<NetworkBillingJsonResult> {
 const advertised=request.headers.get('content-length');
 if(advertised!==null && (!/^\d+$/.test(advertised) || Number(advertised)>NETWORK_BILLING_JSON_MAX_BYTES))
  return {ok:false,status:413};
 if(!request.body)return {ok:false,status:400};
 const reader=request.body.getReader();
 const chunks:Uint8Array[]=[];
 let bytes=0;
 try{
  while(true){
   const next=await reader.read();
   if(next.done)break;
   bytes+=next.value.byteLength;
   if(bytes>NETWORK_BILLING_JSON_MAX_BYTES){
    await reader.cancel().catch(()=>{});
    return {ok:false,status:413};
   }
   chunks.push(next.value);
  }
  const merged=new Uint8Array(bytes);
  let position=0;
  for(const chunk of chunks){merged.set(chunk,position);position+=chunk.byteLength}
  return {ok:true,value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(merged))};
 }catch{
  await reader.cancel().catch(()=>{});
  return {ok:false,status:400};
 }
}
