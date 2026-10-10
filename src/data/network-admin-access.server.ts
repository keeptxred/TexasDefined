/** Dedicated, fail-closed administrator boundary for sensitive Network actions.
 * Never reuse the sports-partner marketing access key for billing or owner moderation.
 */
export async function assertNetworkAdminAccess(provided:string):Promise<void> {
 const expected=process.env.NETWORK_ADMIN_ACCESS_KEY;
 if(typeof expected!=='string'||expected.length<32||expected.length>200)
  throw new Error('Network administrator access has not been configured');
 if(typeof provided!=='string'||provided.length<32||provided.length>200)
  throw new Error('Network administrator authorization failed');
 const encoder=new TextEncoder();
 const digest=(value:string)=>crypto.subtle.digest('SHA-256',encoder.encode(value));
 const [expectedHash,providedHash]=await Promise.all([digest(expected),digest(provided)]);
 const a=new Uint8Array(expectedHash),b=new Uint8Array(providedHash);
 let mismatch=0;
 for(let i=0;i<a.length;i++)mismatch|=a[i]^b[i];
 if(mismatch!==0)throw new Error('Network administrator authorization failed');
}
