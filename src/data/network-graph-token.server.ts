/**
 * App-only Microsoft Graph access-token adapter.
 * Configured only for a single, administrator-authorized Entra application;
 * no refresh-token, delegated scopes, user-password grant or tenant discovery.
 * Caller must also verify Exchange Application RBAC has mailbox-only scope
 * for admin@texasdefined.com. This code never grants RBAC itself.
 * Does not claim an outbox row, send email, or retry a provider call.
 */
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const tokenChars=/^[A-Za-z0-9._~-]+$/;

export type NetworkGraphCredentials={
 tenantId:string; clientId:string; clientSecret:string;
};
export type NetworkGraphTokenResult={
 accessToken:string; expiresIn:number;
};
export function validateNetworkGraphCredentials(raw:unknown):NetworkGraphCredentials {
 if(!raw || typeof raw!=='object' ||Array.isArray(raw))
  throw Error('Network Graph credentials unavailable');
 const obj=raw as Record<string,unknown>;
 const tenantId=obj.tenantId,clientId=obj.clientId,clientSecret=obj.clientSecret;
 if(typeof tenantId!=='string'||!uuid.test(tenantId)||
    typeof clientId!=='string'||!uuid.test(clientId)||
    typeof clientSecret!=='string'||clientSecret.length<24||
    clientSecret.length>2048 || /[\u0000-\u001f\u007f]/.test(clientSecret))
    throw Error('Network Graph credentials unavailable');
 return {tenantId,clientId,clientSecret};
}
export function networkGraphCredentialsFromEnv(env:Record<string,string|undefined>):
 NetworkGraphCredentials {
 return validateNetworkGraphCredentials({
  tenantId:env.NETWORK_GRAPH_TENANT_ID,
  clientId:env.NETWORK_GRAPH_CLIENT_ID,
  clientSecret:env.NETWORK_GRAPH_CLIENT_SECRET,
 });
}
/** Response bodies and tokens are never logged or included in provider errors. */
export async function acquireNetworkGraphAppToken(
 raw:unknown, transport:typeof fetch=fetch,
):Promise<NetworkGraphTokenResult>{
 const creds=validateNetworkGraphCredentials(raw);
 const target='https://login.microsoftonline.com/'+encodeURIComponent(creds.tenantId)+'/oauth2/v2.0/token';
 const body=new URLSearchParams({
  client_id:creds.clientId,
  client_secret:creds.clientSecret,
  scope:'https://graph.microsoft.com/.default',
  grant_type:'client_credentials',
 });
 let response:Response;
 try{
  response=await transport(target,{
   method:'POST',
   headers:{'Content-Type':'application/x-www-form-urlencoded'},
   body:body.toString(),redirect:'error',cache:'no-store',
   signal:AbortSignal.timeout(12_000),
  });
 }catch{throw Error('Network Graph token request failed');}
 if(response.status!==200)throw Error('Network Graph token request rejected');
 let parsed:unknown;
 try{parsed=await response.json();}catch{throw Error('Network Graph token response invalid');}
 if(!parsed || typeof parsed!=='object'||Array.isArray(parsed))
  throw Error('Network Graph token response invalid');
 const obj=parsed as Record<string,unknown>;
 if(obj.token_type!=='Bearer' || typeof obj.access_token!=='string' ||
    obj.access_token.length<100 ||obj.access_token.length>8192 ||
    !tokenChars.test(obj.access_token) ||
    typeof obj.expires_in!=='number' ||
    !Number.isSafeInteger(obj.expires_in) ||
    obj.expires_in<120 ||obj.expires_in>86400)
  throw Error('Network Graph token response invalid');
 return {accessToken:obj.access_token,expiresIn:obj.expires_in};
}
