import test from 'node:test';
import assert from 'node:assert/strict';
import {validateNetworkGraphCredentials,networkGraphCredentialsFromEnv,acquireNetworkGraphAppToken}
 from '../../src/data/network-graph-token.server.ts';
const id1='11111111-1111-4111-8111-111111111111',id2='22222222-2222-4222-8222-222222222222';
const credentials={tenantId:id1,clientId:id2,clientSecret:'syntheticTestOnlySecretOfAdequateLength'};
test('Graph client credentials are explicit, bounded and never inferred from customer identity',()=>{
 assert.equal(validateNetworkGraphCredentials(credentials).tenantId,id1);
 assert.deepEqual(networkGraphCredentialsFromEnv({
  NETWORK_GRAPH_TENANT_ID:id1,NETWORK_GRAPH_CLIENT_ID:id2,NETWORK_GRAPH_CLIENT_SECRET:credentials.clientSecret
 }),credentials);
 for(const changed of [{tenantId:'common'}, {tenantId:'evil.invalid'},
  {clientId:'me'},{clientSecret:''},{clientSecret:'a'.repeat(4096)},
  {clientSecret:'contains\\nnewline'.replace('\\n','\n')}, {clientSecret:null}]){
  assert.throws(()=>validateNetworkGraphCredentials({...credentials,...changed}),/unavailable/);
 }
});
test('Graph token exchange pins tenant endpoint, client-credential grant and exact default scope',async()=>{
 let count=0;
 const transport=async(url,request)=>{
  count++;
  assert.equal(url,'https://login.microsoftonline.com/'+id1+'/oauth2/v2.0/token');
  assert.equal(request.method,'POST');
  assert.equal(request.redirect,'error');
  assert.equal(request.cache,'no-store');
  assert.equal(request.headers['Content-Type'],'application/x-www-form-urlencoded');
  const data=new URLSearchParams(request.body);
  assert.equal(data.get('grant_type'),'client_credentials');
  assert.equal(data.get('client_id'),id2);
  assert.equal(data.get('scope'),'https://graph.microsoft.com/.default');
  assert.equal(data.get('client_secret'),credentials.clientSecret);
  assert.equal([...data.keys()].length,4);
  return {status:200,json:async()=>({token_type:'Bearer',access_token:'a'.repeat(250),expires_in:3600})};
 };
 const result=await acquireNetworkGraphAppToken(credentials,transport);
 assert.equal(count,1);
 assert.equal(result.expiresIn,3600);
 assert.equal(result.accessToken.length,250);
});
test('Graph token request fails closed on provider rejection, timeout and malformed token',async()=>{
 const provider=async()=>({status:401,json:async()=>({error_description:'leaked secret'})});
 await assert.rejects(acquireNetworkGraphAppToken(credentials,provider),err=>
   err.message==='Network Graph token request rejected');
 await assert.rejects(acquireNetworkGraphAppToken(credentials,async()=>{throw Error('sensitive token')}),err=>
   err.message==='Network Graph token request failed');
 for(const response of [
  {token_type:'bearer',access_token:'a'.repeat(250),expires_in:3600},
  {token_type:'Bearer',access_token:'too-short',expires_in:3600},
  {token_type:'Bearer',access_token:'a'.repeat(250),expires_in:5},
  {token_type:'Bearer',access_token:'a'.repeat(250),expires_in:'3600'},
 ]){
  await assert.rejects(acquireNetworkGraphAppToken(credentials,
   async()=>({status:200,json:async()=>response})),/response invalid/);
 }
});
