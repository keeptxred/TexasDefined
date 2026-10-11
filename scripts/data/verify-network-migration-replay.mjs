/**
 * Replays exactly the tracked Network migrations against a throwaway local
 * Postgres database. NEVER accepts remote PGHOST or a production DB name.
 * Does NOT exercise Supabase Auth token issuance, Storage HTTP, Stripe, or Graph.
 */
import {readFileSync,existsSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import path from 'node:path';

const host=process.env.PGHOST;
if(process.env.NETWORK_MIGRATION_REPLAY_ISOLATED!=='yes-ephemeral-local-only' ||
   !['127.0.0.1','localhost'].includes(host) ||
   process.env.PGDATABASE!=='network_replay' ||
   process.env.PGUSER!=='postgres')
 throw new Error('Refusing migration replay outside explicit isolated local network_replay database');

const manifest=readFileSync('scripts/data/validate-network-migration-parity.mjs','utf8');
const migrations=[...manifest.matchAll(/"(202610\d{8}_[^"]+\.sql)"/g)].map(match=>match[1]);
if(migrations.length!==34 || new Set(migrations).size!==34 ||
   migrations.some((name,index)=>index>0 && name<=migrations[index-1]))
 throw new Error('Applied Network manifest count, order or uniqueness changed: stop and reconcile');
const execSql=(args,label)=>{
 try {
  const out=execFileSync('psql',['-X','-v','ON_ERROR_STOP=1','--no-psqlrc',...args],
   {encoding:'utf8',maxBuffer:4*1024*1024});
  if(out.trim())console.log(out.trim().slice(-2000));
 }catch(error){
  console.error('Clean-room replay failed at '+label);
  console.error((error?.stdout||'').toString().slice(-3000));
  console.error((error?.stderr||'').toString().slice(-3000));
  throw new Error('Migration replay failed at '+label);
 }
};

const bootstrap='scripts/data/network-migration-replay-bootstrap.sql';
if(!existsSync(bootstrap))throw new Error('Isolated Auth/Storage bootstrap is missing');
console.log('REPLAY isolated PostgreSQL Auth/Storage stub (NOT production or real Supabase)');
execSql(['-f',bootstrap],bootstrap);
for(const filename of migrations){
 const location=path.join('supabase/migrations',filename);
 if(!existsSync(location))throw new Error('Missing applied migration: '+filename);
 execSql(['-f',location],filename);
 console.log('REPLAY PASS '+filename);
}
const checks=`DO $verification$
DECLARE network_tables integer; network_buckets integer;
BEGIN
 SELECT count(*) INTO network_tables FROM pg_class c
 JOIN pg_namespace n ON n.oid=c.relnamespace
 WHERE n.nspname='public' AND c.relkind='r' AND c.relname LIKE 'texasdefined_network_%';
 IF network_tables <> 8 THEN RAISE EXCEPTION 'Expected 8 Network tables; got %',network_tables; END IF;
 IF EXISTS(
  SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid=c.relnamespace
  WHERE n.nspname='public' AND c.relkind='r' AND c.relname LIKE 'texasdefined_network_%'
    AND NOT c.relrowsecurity
 ) THEN RAISE EXCEPTION 'At least one Network table lacks RLS'; END IF;
 SELECT count(*) INTO network_buckets FROM storage.buckets
 WHERE id IN ('texasdefined-network-applications','texasdefined-network-submissions',
  'texasdefined-network-featured-drafts','texasdefined-network-published');
 IF network_buckets <> 4 THEN RAISE EXCEPTION 'Expected 4 Network Storage buckets, got %',network_buckets; END IF;
 IF EXISTS(SELECT 1 FROM storage.buckets
  WHERE id IN ('texasdefined-network-applications','texasdefined-network-submissions',
  'texasdefined-network-featured-drafts') AND public)
  OR NOT EXISTS(SELECT 1 FROM storage.buckets WHERE id='texasdefined-network-published' AND public)
 THEN RAISE EXCEPTION 'Network Storage bucket visibility is incorrect'; END IF;
 IF EXISTS(
  SELECT 1 FROM pg_proc p
  JOIN pg_namespace n ON n.oid=p.pronamespace
  WHERE n.nspname IN ('public','texasdefined_network_internal')
  AND (p.proname LIKE 'network_%' OR p.proname LIKE '%texasdefined_network%'
       OR p.proname LIKE 'provision_verified_network_owner')
  AND p.prosecdef
  AND (
    (n.nspname='public' AND (
      has_function_privilege('anon',p.oid,'EXECUTE')
      OR has_function_privilege('authenticated',p.oid,'EXECUTE')
    ))
    OR (n.nspname='texasdefined_network_internal'
      AND has_function_privilege('anon',p.oid,'EXECUTE'))
  )
 ) THEN RAISE EXCEPTION 'Public privileged RPC or private helper anonymously callable'; END IF;
 IF (SELECT count(*) FROM public.texasdefined_network_applications)<>0 OR
    (SELECT count(*) FROM public.texasdefined_network_public_listings)<>0 OR
    (SELECT count(*) FROM public.texasdefined_network_checkout_attempts)<>0 OR
    (SELECT count(*) FROM public.texasdefined_network_email_outbox)<>0 OR
    (SELECT count(*) FROM storage.objects WHERE bucket_id LIKE 'texasdefined-network-%')<>0
 THEN RAISE EXCEPTION 'Clean-room schema unexpectedly contains Network customer data'; END IF;
 RAISE NOTICE 'REPLAY VERIFIED: 34 sequential migrations; 8 RLS tables; 4 buckets; public privileged RPC denied; private helpers inaccessible anonymously; no records';
END
$verification$;`;
execSql(['-c',checks],'final schema/RLS/bucket/RPC verification');
console.log('REPLAY RESULT PASS: 34/34 migrations in isolated PostgreSQL; NOT end-to-end Supabase certification');
const ownerIsolationFixture='scripts/data/network-migration-owner-rls-fixture.sql';
if(!existsSync(ownerIsolationFixture))throw new Error('Missing isolated two-owner RLS fixture');
execSql(['-f',ownerIsolationFixture],'two-owner RLS and Storage quota rollback fixture');
console.log('REPLAY OWNER RLS RESULT PASS: simulated cross-owner, unpaid, quota, outsider and anon isolation; transaction rolled back');
const stripeReconciliationFixture='scripts/data/network-migration-stripe-reconciliation-fixture.sql';
if(!existsSync(stripeReconciliationFixture))throw new Error('Missing isolated Stripe database lifecycle fixture');
execSql(['-f',stripeReconciliationFixture],'synthetic Stripe payment and listing lifecycle rollback fixture');
console.log('REPLAY STRIPE DB RESULT PASS: simulated duplicate, payment failure, delisting, safe recovery and explicit re-publication; transaction rolled back');
// This LAST fixture deliberately commits several independent transactions;
// it is allowed ONLY after the strict ephemeral localhost guard above.
const committedStripeFixture='scripts/data/network-migration-stripe-committed-deliveries-fixture.sql';
if(!existsSync(committedStripeFixture))throw new Error('Missing isolated committed Stripe delivery fixture');
execSql(['-f',committedStripeFixture],'separately committed synthetic Stripe deliveries, idempotency and outbox audit');
console.log('REPLAY STRIPE COMMITTED RESULT PASS: activation/failure/recovery in distinct transactions, durable independent notifications, replay denial; disposable DB');
const concurrentQuota='scripts/data/verify-network-concurrent-upload-quota.mjs';
if(!existsSync(concurrentQuota))throw new Error('Missing isolated two-session Featured quota test');
execSql(['-c','SELECT 1'],'pre-concurrency local PostgreSQL health check');
try { const output=execFileSync('node',[concurrentQuota],{encoding:'utf8',timeout:30000,maxBuffer:2*1024*1024}); console.log(output.trim()); }
catch(error){console.error(String(error?.stdout||''));console.error(String(error?.stderr||''));throw Error('Featured concurrent Storage quota SQL fixture failed');}
console.log('REPLAY FEATURED CONCURRENCY RESULT PASS: two independent database sessions enforce 24-image quota');
// Two actual concurrent PostgreSQL sessions exercise the quota advisory lock.
// This commits ONLY to the same disposable localhost runner database.
const simultaneousQuota='scripts/data/verify-network-concurrent-media-quota.mjs';
if(!existsSync(simultaneousQuota))throw new Error('Missing isolated concurrent media quota fixture');
execFileSync('node',[simultaneousQuota],{stdio:'inherit',timeout:30000});
console.log('REPLAY MEDIA CONCURRENCY RESULT PASS: one winner and one RLS rejection at 24 drafts');

