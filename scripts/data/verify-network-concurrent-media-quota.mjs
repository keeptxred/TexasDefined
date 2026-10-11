/**
 * Disposable PostgreSQL-only two-session upload race at the 24-image quota.
 * NEVER connect to live Supabase: require exact local hostname/database/user
 * and explicit ephemeral opt-in shared with the migration replay.
 * Runs AFTER the 34 migrations and earlier rollback/Stripe replay fixtures.
 */
import {execFileSync,spawn} from 'node:child_process';
const allowed=process.env.NETWORK_MIGRATION_REPLAY_ISOLATED==='yes-ephemeral-local-only'
 && ['127.0.0.1','localhost'].includes(process.env.PGHOST)
 && process.env.PGUSER==='postgres'
 && process.env.PGDATABASE==='network_replay';
if(!allowed)throw Error('Refusing concurrent quota fixture outside disposable localhost network_replay');

const owner='44444444-4444-4444-8444-444444444444';
const app='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
const account='ffffffff-ffff-4fff-8fff-ffffffffffff';
const bucket='texasdefined-network-featured-drafts';
const prefix=`${owner}/${account}/`;
const exec=(sql,label)=>{
 try{return execFileSync('psql',['-X','-v','ON_ERROR_STOP=1','-At','-c',sql],{encoding:'utf8',maxBuffer:1024*1024})}
 catch(e){throw Error(label+': '+String(e.stderr||e.message).slice(-1500))}
};
exec(`
INSERT INTO auth.users(id,email,email_confirmed_at)
VALUES ('${owner}','quota-only@example.invalid',now());
INSERT INTO public.texasdefined_network_applications
(id,plan,status,intake_complete,business_name,category,city,contact_email,paid_entitlement_active)
VALUES ('${app}','plus','published',true,'Race Fixture Business','Fixture','Katy','quota-only@example.invalid',true);
INSERT INTO public.texasdefined_network_business_accounts
(id,application_id,owner_user_id,membership_tier,access_enabled)
VALUES ('${account}','${app}','${owner}','featured',true);
INSERT INTO storage.objects(bucket_id,name)
SELECT '${bucket}','${prefix}seed-'||i::text||'.webp'
FROM generate_series(1,23) i;
`,'Seed 23 disposable media rows');
const race=(which)=>new Promise((resolve,reject)=>{
 const path=`${prefix}race-${which}.webp`;
 const sql=`BEGIN;
SET LOCAL ROLE authenticated;
SELECT set_config('request.jwt.claim.sub','${owner}',true);
INSERT INTO storage.objects(bucket_id,name) VALUES ('${bucket}','${path}');
SELECT pg_sleep(0.15);
COMMIT;`;
 const child=spawn('psql',['-X','-v','ON_ERROR_STOP=1','-At','-c',sql],
   {stdio:['ignore','pipe','pipe']});
 let stdout='',stderr='';
 child.stdout.on('data',d=>stdout+=d.toString());
 child.stderr.on('data',d=>stderr+=d.toString());
 child.on('error',reject);
 child.on('close',(code,signal)=>resolve({which,code,signal,stdout,stderr}));
});
const outcomes=await Promise.all([race('one'),race('two')]);
const accepted=outcomes.filter(x=>x.code===0);
const rejected=outcomes.filter(x=>x.code!==0 && /row.level security|permission denied/i.test(x.stderr));
if(accepted.length!==1||rejected.length!==1){
 for(const x of outcomes)console.error('QUOTA RACE '+x.which+' exit='+x.code+' stderr='+x.stderr.slice(-1400));
 throw Error('Concurrent Featured quota race did not accept exactly one 24th upload');
}
const count=Number(exec(`SELECT count(*) FROM storage.objects
 WHERE bucket_id='${bucket}' AND name LIKE '${prefix}%'`,'Audit account media count').trim());
const contenders=Number(exec(`SELECT count(*) FROM storage.objects WHERE bucket_id='${bucket}'
 AND name IN ('${prefix}race-one.webp','${prefix}race-two.webp')`,'Audit concurrent winners').trim());
if(count!==24||contenders!==1)throw Error('Concurrent media count/paths violate 24-image limit: '+count+'/'+contenders);
console.log('NETWORK MEDIA RACE PASS: 23 seeded drafts, two parallel authenticated requests, exactly one inserted, second RLS-denied, total 24; disposable DB');
