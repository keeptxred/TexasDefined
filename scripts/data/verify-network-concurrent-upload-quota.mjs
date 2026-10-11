/**
 * Two actual PostgreSQL connections race for the final Featured draft slot.
 * Disposable GitHub Actions postgres:16 only; no Storage HTTP or production.
 */
import {execFileSync,spawn} from 'node:child_process';

if(process.env.NETWORK_MIGRATION_REPLAY_ISOLATED!=='yes-ephemeral-local-only' ||
   !['127.0.0.1','localhost'].includes(process.env.PGHOST) ||
   process.env.PGDATABASE!=='network_replay' ||
   process.env.PGUSER!=='postgres')
 throw new Error('Refusing concurrent quota test outside disposable localhost network_replay');

const owner='44444444-4444-4444-8444-444444444444';
const app='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
const account='eeeeeeee-4444-4444-8444-eeeeeeeeeeee';
const prefix=owner+'/'+account+'/';
const psql=['-X','-q','-At','-v','ON_ERROR_STOP=1'];

function sql(text){
 return execFileSync('psql',[...psql,'-c',text],{encoding:'utf8',timeout:12000}).trim();
}
sql([
 'BEGIN;',
 "INSERT INTO auth.users(id,email,email_confirmed_at) VALUES('"+owner+"','concurrent-owner@example.invalid',now());",
 'INSERT INTO public.texasdefined_network_applications(id,plan,status,intake_complete,paid_entitlement_active,business_name,category,city,contact_email) VALUES('+
 "'"+app+"','plus','published',true,true,'Concurrent Media Fixture','Test','Katy','concurrent-owner@example.invalid');",
 'INSERT INTO public.texasdefined_network_business_accounts(id,application_id,owner_user_id,membership_tier,access_enabled) VALUES('+
 "'"+account+"','"+app+"','"+owner+"','featured',true);",
 "INSERT INTO storage.objects(bucket_id,name) SELECT 'texasdefined-network-featured-drafts','"+prefix+"'||'preexisting-'||n||'.webp' FROM generate_series(1,23) AS n;",
 'COMMIT;'
].join('\n'));
function draftCount(){
 return sql("SELECT count(*) FROM storage.objects WHERE bucket_id='texasdefined-network-featured-drafts' AND name LIKE '"+prefix+"%'");
}
if(draftCount()!=='23')throw Error('Concurrent quota setup did not create 23 drafts');

let secondSession;
function onFirstInsert(){
 if(!secondSession)secondSession=session('B',25,false);
}
function session(label,slot,hold){
 const statement=[
  'BEGIN;',
  'SET LOCAL ROLE authenticated;',
  "SELECT set_config('request.jwt.claim.sub','"+owner+"',true);",
  "INSERT INTO storage.objects(bucket_id,name) VALUES('texasdefined-network-featured-drafts','"+prefix+"race-slot-"+slot+".webp');",
  '\\echo INSERT_'+label+'_SUCCEEDED',
  ...(hold?['SELECT pg_sleep(3);']:[]),
  'COMMIT;'
 ].join('\n')+'\n';
 const child=spawn('psql',[...psql,'-f','-'],{stdio:['pipe','pipe','pipe']});
 let stdout='',stderr='',finished=false;
 const timer=setTimeout(()=>{if(!finished)child.kill('SIGKILL');},18000);
 child.stdout.on('data',chunk=>{
  stdout+=chunk.toString();
  if(label==='A'&&stdout.includes('INSERT_A_SUCCEEDED'))onFirstInsert();
 });
 child.stderr.on('data',chunk=>{stderr+=chunk.toString();});
 child.stdin.end(statement);
 return new Promise((resolve,reject)=>{
  child.on('error',reject);
  child.on('close',(code,signal)=>{
   finished=true;clearTimeout(timer);
   resolve({label,code,signal,stdout,stderr});
  });
 });
}
const a=await session('A',24,true);
if(!secondSession)throw Error('First upload never acquired final slot: '+a.stderr.slice(-500));
const b=await secondSession;
if(a.code!==0||!a.stdout.includes('INSERT_A_SUCCEEDED'))
 throw Error('First final-slot INSERT must succeed: '+JSON.stringify(a));
if(b.code===0||b.stdout.includes('INSERT_B_SUCCEEDED')||
   !/row-level security policy/i.test(b.stderr))
 throw Error('Concurrent 25th upload bypassed quota or failed for wrong reason: '+JSON.stringify(b));
if(draftCount()!=='24')throw Error('Concurrent race exceeded quota or lost accepted upload');
if(sql("SELECT count(*) FROM storage.objects WHERE name='"+prefix+"race-slot-25.webp'")!=='0')
 throw Error('Rejected concurrent upload was nevertheless stored');
console.log('REPLAY FEATURED CONCURRENT QUOTA PASS: 23 starting drafts, two actual sessions, 24th accepted, 25th denied under advisory lock, final count 24; disposable DB only');
