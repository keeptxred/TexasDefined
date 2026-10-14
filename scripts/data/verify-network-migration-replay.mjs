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
if(migrations.length!==40 || new Set(migrations).size!==40 ||
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

try { console.log(execFileSync('node',['scripts/data/validate-network-pending-atomicity.mjs'],{encoding:'utf8'}).trim()); }
catch(error){ throw Error('Pending migration atomicity release gate failed: '+String(error.stderr||error)); }
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
// Re-execute four immutable original SQL source mirrors after the 40 officially
// applied versions, exercising safe re-execution and disposable idempotency.
// Do not run this replay script on shared Supabase.
const proposedRevocation='supabase/pending/20261011043000_network_owner_revision_read_revocation.sql';
if(!existsSync(proposedRevocation))throw new Error('Proposed owner revision SELECT revocation missing');
execSql(['-f',proposedRevocation],'staging-only disabled-owner revision SELECT policy hardening');
console.log('REPLAY PROPOSED OWNER REVOCATION PASS: staging-only policy applied in disposable DB; production changes are not made by isolated replay');
const pendingAudit='supabase/pending/20261011044000_network_sensitive_action_audit.sql';
if(!existsSync(pendingAudit))throw new Error('Pending private sensitive-action audit migration missing');
execSql(['-f',pendingAudit],'pending sensitive-action audit trigger migration: disposable DB only');
console.log('REPLAY PENDING AUDIT SCHEMA PASS: private immutable audit table and state-transition triggers');
const pendingRecovery='supabase/pending/20261011045000_network_notification_manual_recovery.sql';
if(!existsSync(pendingRecovery))throw new Error('Missing unapplied, manual notification recovery migration');
execSql(['-f',pendingRecovery],'pending service-only manual Graph reconciliation schema; isolated DB only');
console.log('REPLAY PENDING GRAPH RECOVERY SCHEMA PASS: no sender, no automatic retry');
const pendingPerformance='supabase/pending/20261011210000_network_profile_daily_metrics.sql';
if(!existsSync(pendingPerformance))throw Error('Missing one-cutover private listing performance migration');
execSql(['-f',pendingPerformance],'pending Network aggregate performance schema — isolated database only');
console.log('REPLAY PENDING NETWORK PERFORMANCE SQL PASS: no production data changes');
execSql(['-f','scripts/data/network-profile-metrics-fixture.sql'],'disposable read-only performance aggregate permissions and event validation');
console.log('REPLAY PRIVATE METRICS RLS/EXECUTE FIXTURE PASS');
const pendingAtomicQuota='supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql';
if(!existsSync(pendingAtomicQuota))throw new Error('Pending atomic Storage HTTP quota migration missing');
execSql(['-f',pendingAtomicQuota],'pending self-transactional atomic Storage quota counter and triggers: disposable DB only');
console.log('REPLAY PENDING ATOMIC STORAGE QUOTA SCHEMA PASS: durable per-owner counters protect real concurrent HTTP uploads');

const checks=`DO $verification$
DECLARE network_tables integer; network_buckets integer;
BEGIN
 SELECT count(*) INTO network_tables FROM pg_class c
 JOIN pg_namespace n ON n.oid=c.relnamespace
 WHERE n.nspname='public' AND c.relkind='r' AND c.relname LIKE 'texasdefined_network_%';
 IF network_tables <> 9 THEN RAISE EXCEPTION 'Expected 9 Network tables; got %',network_tables; END IF;
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
    (SELECT count(*) FROM public.texasdefined_network_checkout_acceptances)<>0 OR
    (SELECT count(*) FROM public.texasdefined_network_email_outbox)<>0 OR
    (SELECT count(*) FROM storage.objects WHERE bucket_id LIKE 'texasdefined-network-%')<>0
 THEN RAISE EXCEPTION 'Clean-room schema unexpectedly contains Network customer data'; END IF;
 RAISE NOTICE 'REPLAY VERIFIED: 40 sequential migrations; 9 RLS tables; 4 buckets; public privileged RPC denied; private helpers inaccessible anonymously; no records';
END
$verification$;`;
execSql(['-c',checks],'final schema/RLS/bucket/RPC verification');
console.log('REPLAY RESULT PASS: 40/40 applied Network migrations in isolated PostgreSQL; NOT end-to-end Supabase certification');
const auditFixture='scripts/data/network-sensitive-action-audit-fixture.sql';
if(!existsSync(auditFixture))throw new Error('Missing isolated sensitive-action audit fixture');
execSql(['-f',auditFixture],'single-administrator private audit state-transition rollback fixture');
console.log('REPLAY SENSITIVE AUDIT RESULT PASS: seven material transitions, RLS privacy and append-only grants; rolled back');
const recoveryFixture='scripts/data/network-notification-manual-recovery-fixture.sql';
if(!existsSync(recoveryFixture))throw new Error('Missing manual notification recovery rollback fixture');
execSql(['-f',recoveryFixture],'manual Graph delivery reconciliation without provider calls');
console.log('REPLAY MANUAL GRAPH RECOVERY RESULT PASS: token-bound manual reconciliation, delayed verified retry, uncertain delivery suppressed');
const atomicQuotaFixture='scripts/data/network-featured-atomic-quota-fixture.sql';
if(!existsSync(atomicQuotaFixture))throw new Error('Pending atomic Storage quota rollback fixture missing');
execSql(['-f',atomicQuotaFixture],'atomic storage usage counter, privileged bypass denial, DELETE slot recovery');
console.log('REPLAY PENDING ATOMIC STORAGE QUOTA RESULT PASS: quota at 24 and recovered deletion slot; rolled back');
const ownerIsolationFixture='scripts/data/network-migration-owner-rls-fixture.sql';
if(!existsSync(ownerIsolationFixture))throw new Error('Missing isolated two-owner RLS fixture');
execSql(['-f',ownerIsolationFixture],'two-owner RLS and Storage quota rollback fixture');
console.log('REPLAY OWNER RLS RESULT PASS: simulated cross-owner, unpaid, quota, outsider and anon isolation; transaction rolled back');
const stripeReconciliationFixture='scripts/data/network-migration-stripe-reconciliation-fixture.sql';
if(!existsSync(stripeReconciliationFixture))throw new Error('Missing isolated Stripe database lifecycle fixture');
execSql(['-f',stripeReconciliationFixture],'synthetic Stripe payment and listing lifecycle rollback fixture');
console.log('REPLAY STRIPE DB RESULT PASS: simulated duplicate, payment failure, delisting, safe recovery and explicit re-publication; transaction rolled back');
const notificationClaimFixture='scripts/data/network-notification-claim-rollback-fixture.sql';
if(!existsSync(notificationClaimFixture))throw new Error('Missing service-only notification claim rollback fixture');
execSql(['-f',notificationClaimFixture],'service-only outbox claim, token and terminal acknowledgement rollback fixture');
console.log('REPLAY OUTBOX CLAIM RESULT PASS: durable claim, wrong-token denial, final ack/failure, replay protection, exhausted-attempt denial; rolled back');
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

// Test-only SQL override is generated and executed ONLY in this disposable localhost
// database. It never replaces the 38 historical migrations or runs on hosted Supabase.
const isolatedStripeOverlay=execFileSync('node',['scripts/data/network-stripe-local-finalizer-overlay.mjs'],{encoding:'utf8'});
execSql(['-c',isolatedStripeOverlay],'LOCAL-ONLY cs_test Checkout finalizer compatibility');
const verifyIsolatedStripe=`DO $check$
DECLARE definition text;
BEGIN
 SELECT pg_get_functiondef('public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint)'::regprocedure) INTO definition;
 IF position('cs_test_' in definition)=0 OR position('cs_live_' in definition)>0
 THEN RAISE EXCEPTION 'Isolated test-mode finalizer is not constrained to cs_test IDs'; END IF;
 IF has_function_privilege('anon','public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint)','EXECUTE')
    OR has_function_privilege('authenticated','public.complete_texasdefined_network_checkout(uuid,uuid,uuid,text,text,bigint)','EXECUTE')
 THEN RAISE EXCEPTION 'Checkout finalizer leaked to unprivileged identity'; END IF;
 RAISE NOTICE 'LOCAL STRIPE TEST-MODE FINALIZER PASS: only disposable cs_test IDs permitted';
END $check$;`;
execSql(['-c',verifyIsolatedStripe],'local-only Stripe test-mode finalizer privilege and identifier verification');
const isolatedCheckoutFixture='scripts/data/network-stripe-local-checkout-fixture.sql';
if(!existsSync(isolatedCheckoutFixture))throw Error('Missing isolated test-mode Checkout rollback fixture');
execSql(['-f',isolatedCheckoutFixture],'disposable cs_test Checkout reservation/finalization owner-binding fixture');
console.log('REPLAY TEST STRIPE CHECKOUT DB PASS: isolated reserve, reject live IDs/foreign owner, complete cs_test, safe reuse; rolled back');

