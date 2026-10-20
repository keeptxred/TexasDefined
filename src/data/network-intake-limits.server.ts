/** Max total actual request bytes, including multipart boundaries and fields. */
export const NETWORK_INTAKE_MAX_BYTES=16_000_000;

/**
 * Reject streamed/multipart bodies above the hard limit before formData()
 * allocates the full request. Content-Length is only an early hint: chunked,
 * absent and dishonest lengths must obey exactly the same actual-byte cap.
 * Returns null on overflow, invalid length metadata or unreadable content.
 */
export async function readBoundedNetworkIntakeBody(request: Request): Promise<Uint8Array|null> {
 const declared=request.headers.get('content-length');
 if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>NETWORK_INTAKE_MAX_BYTES))return null;
 if(!request.body)return new Uint8Array(0);
 const reader=request.body.getReader();
 const chunks:Uint8Array[]=[];
 let total=0;
 try{
  while(true){
   const item=await reader.read();
   if(item.done)break;
   total+=item.value.byteLength;
   if(total>NETWORK_INTAKE_MAX_BYTES){await reader.cancel().catch(()=>{});return null}
   chunks.push(item.value);
  }
  const all=new Uint8Array(total);
  let offset=0;
  for(const chunk of chunks){all.set(chunk,offset);offset+=chunk.byteLength}
  return all;
 }catch{
  await reader.cancel().catch(()=>{});
  return null;
 }
}
