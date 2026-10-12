import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const source=(file)=>readFileSync(file,'utf8');
const check=(name,ok)=>{
 assert.ok(ok,'Network release guard failed: '+name);
 console.log('PASS network guard: '+name);
};
const root='src/routes/';
const checkout=source(root+'api.public.network-checkout.ts');
const billing=source(root+'api.public.network-billing.ts');
const webhook=source(root+'api.public.network-stripe-webhook.ts');
const review=source('src/data/network-review.server.ts');
const apps=source(root+'api.public.network-application.ts');
const ownerUI=source(root+'admin.network-applications.lazy.tsx');
const dashboard=source(root+'business.dashboard.lazy.tsx');
const directory=source(root+'network.directory.tsx');
const profile=source(root+'network.business.$slug.tsx');
const requiredPages=[
 'network.join.tsx','network.apply.tsx','network.directory.tsx',
 'network.billing.tsx','network.business.$slug.tsx','business.dashboard.tsx',
 'admin.network-applications.tsx'
];
check('all eight unpublished Network routes are explicitly classified non-indexable',
 (()=>{const policy=source('src/lib/public-routes.ts');
 const segment=policy.split('export const NON_INDEXABLE_PUBLIC_PATHS = [')[1]?.split('] as const;')[0]||'';
 return ["/business/dashboard","/network/apply","/network/billing","/network/checkout-return","/network/directory","/network/example/basic","/network/example/plus","/network/join"].every(path=>segment.includes('"'+path+'"'));
 })());
check('pending Storage counter locks/backfills/triggers in a self-contained transaction supported by Supabase CLI',
 source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('BEGIN;')
 && source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('COMMIT;')
 && source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('LOCK TABLE storage.objects IN SHARE ROW EXCLUSIVE MODE;')
 && source('scripts/data/verify-network-migration-replay.mjs').includes("execSql(['-f',pendingAtomicQuota]")
 && !source('scripts/data/verify-network-migration-replay.mjs').includes("execSql(['--single-transaction','-f',pendingAtomicQuota]"));
check('pending atomic storage counter accepts canonical UUIDs and rejects malformed account segments',
 source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes("v_account!~'^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'")
 && source('scripts/data/network-featured-atomic-quota-fixture.sql').includes('Malformed account UUID segment bypassed atomic path guard')
 && source('.github/workflows/network-local-auth-storage.yml').includes('Disposable local Supabase startup failed'));
check('Checkout and billing reject unbounded JSON before parsing',
 checkout.includes('parseBoundedNetworkBillingJson(request)')
 && billing.includes('parseBoundedNetworkBillingJson(request)')
 && !checkout.includes('await request.json()') && !billing.includes('await request.json()')
 && source('src/data/network-billing-json.server.ts').includes('NETWORK_BILLING_JSON_MAX_BYTES = 4_096')
 && source('src/data/network-billing-json.server.ts').includes('bytes>NETWORK_BILLING_JSON_MAX_BYTES')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-billing-json.test.mjs'));
check('checkout disabled by default',checkout.includes('if (!stripeCheckoutEnabled())'));
check('Graph claim preflight remains no-send, fails closed and never auto-acknowledges uncertain delivery',
 source('src/data/network-notification-claim-plan.server.ts').includes('mayMarkDelivered:false')
 && source('src/data/network-notification-claim-plan.server.ts').includes('mayRetryAutomatically:false')
 && source('src/data/network-notification-claim-plan.server.ts').includes('createNetworkGraphMailDraft(')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-notification-claim-plan.test.mjs'));
check('Graph worker remains gated off, bounded, and never acknowledges or retries a claim automatically',
 source('src/data/network-notification-dispatch-worker.server.ts').includes('NETWORK_GRAPH_WORKER_MAX_BATCH = 5')
 && source('src/data/network-notification-dispatch-worker.server.ts').includes('!Boolean(NETWORK_GRAPH_DISPATCH_ENABLED)')
 && source('src/data/network-notification-dispatch-worker.server.ts').includes('!Boolean(NETWORK_EMAIL_DELIVERY_ENABLED)')
 && source('src/data/network-notification-dispatch-worker.server.ts').includes('mayRetryAutomatically: false')
 && source('src/data/network-notification-dispatch-worker.server.ts').includes('mayMarkDelivered: false')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-notification-dispatch-worker.test.mjs'));

check('Graph HTTP transport cannot send while Network email is disabled, pins mailbox and avoids SQL delivery claims',
 source('src/data/network-notification-graph-transport.server.ts').includes('NETWORK_GRAPH_DELIVERY')===false
 && source('src/data/network-notification-graph-transport.server.ts').includes('!Boolean(NETWORK_GRAPH_DISPATCH_ENABLED)')
 && source('src/data/network-notification-graph-transport.server.ts').includes('!Boolean(NETWORK_EMAIL_DELIVERY_ENABLED)')
 && source('src/data/network-notification-graph-transport.server.ts').includes('users/admin%40texasdefined.com/sendMail')
 && source('src/data/network-notification-graph-transport.server.ts').includes("redirect:'error'")
 && source('src/data/network-notification-graph-transport.server.ts').includes('AbortSignal.timeout(12_000)')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-notification-graph-transport.test.mjs'));

check('hosted staging read-only acceptance is explicit, synthetic and physically isolated from shared production',
 source('scripts/data/network-hosted-stage-readonly.mjs').includes("NETWORK_HOSTED_STAGE_READONLY_APPROVED")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("forbiddenRef='ftkznprjljkhymknvhye'")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("NETWORK_STAGE_PROJECT_REF")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("method='GET'")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("requestStage(fetcher,config,user.token")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("cross-owner private Storage read not denied")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("runNetworkHostedRevokedOwnerReadOnly")
 && source('scripts/data/network-hosted-stage-readonly.mjs').includes("disabled owner can still read private revisions")
 && source('scripts/ci/run-premerge-validation.mjs').includes("network-hosted-stage-readonly.test.mjs"));
check('Network health diagnostic remains read-only and detects the critical security state',
 source('scripts/data/network-operations-readonly.sql').includes('owner_revision_revocation_policy_present')
 && source('scripts/data/network-operations-readonly.sql').includes('paid_listing_entitlement_drift')
 && source('scripts/data/network-operations-readonly.sql').includes('notification_uncertain_claims')
 && source('scripts/data/network-operations-readonly.sql').includes('applied_network_security_versions')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-operations-readonly.test.mjs'));

check('non-live Stripe is isolated and rejects production Supabase, host and price reuse',
 source('src/data/network-stripe-mode.server.ts').includes("database.includes('ftkznprjljkhymknvhye')")
 && source('src/data/network-stripe-mode.server.ts').includes("NETWORK_ISOLATED_STAGING")
 && source('src/data/network-stripe-mode.server.ts').includes("NETWORK_STRIPE_TEST_MODE_ENABLED")
 && checkout.includes('networkStripeHostAllowed(request)')
 && billing.includes('networkStripeHostAllowed(request)')
 && webhook.includes('networkStripeHostAllowed(request)')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-stripe-isolated-mode.test.mjs'));

check('Checkout uses the same exact normalized confirmed-email comparison as owner provisioning',
 checkout.includes('matchingNetworkOwnerEmail(verified.user.email,body.email)')
 && checkout.includes('matchingNetworkOwnerEmail(data.contact_email,verified.user.email)')
 && !checkout.includes('data.contact_email.toLowerCase()')
 && !checkout.includes('.ilike(')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-owner-email.test.mjs'));
check('checkout needs verified Supabase user',checkout.includes('email_confirmed_at')&&checkout.includes('auth.getUser(bearer)'));
check('checkout needs authorized, enabled owner',checkout.includes('texasdefined_network_business_accounts')&&checkout.includes('.eq("owner_user_id", verified.user.id)')&&checkout.includes('.eq("access_enabled", true)'));
check('checkout blocks preexisting subscription',checkout.includes('data.stripe_subscription_id')&&checkout.includes('data.paid_entitlement_active'));
check('checkout requires editorial approval',checkout.includes('data.status !== "approved"'));
check('billing client invalidates stale responses on account changes and clears private memberships before fetching',
 source(root+'network.billing.lazy.tsx').includes('const refreshSequence = useRef(0)')
 && source(root+'network.billing.lazy.tsx').includes('requestSequence !== refreshSequence.current')
 && source(root+'network.billing.lazy.tsx').includes('refreshSequence.current++;')
 && source(root+'network.billing.lazy.tsx').includes('setSignedIn(false); setMemberships([]); setCheckoutAvailable(false)')
 && source('scripts/data/network-owner-email.test.mjs').includes('billing Auth transitions synchronously clear prior owner'));
check('suspended owners and closed portals retain an explicit sole-admin Office 365 billing/cancellation support path',
 source(root+'network.billing.lazy.tsx').includes('mailto:admin@texasdefined.com?subject=TexasDefined%20Network%20subscription%20support')
 && source(root+'network.billing.lazy.tsx').includes('This support option remains available even when the owner portal or checkout is closed')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-owner-email.test.mjs'));
check('authorized Plus owner can start checkout only after launch and explicit terms/recurring consent',billing.includes('checkoutAvailable=stripeCheckoutEnabled()')&&billing.includes('checkoutEligible: item.status === "approved"')&&source(root+'network.billing.lazy.tsx').includes('disabled={busy||!checkoutAvailable||termsAccepted[item.id]!==true||recurringAccepted[item.id]!==true}')&&checkout.includes('body.termsAccepted!==true||body.recurringBillingAccepted!==true||body.termsVersion!==NETWORK_TERMS_VERSION'));

check('billing enforces verified sign-in',billing.includes('email_confirmed_at')&&billing.includes('auth.getUser(token)'));
check('billing list filters owner bindings',billing.includes('.in("id",ids)')&&billing.includes('.eq("access_enabled", true)'));
check('billing portal enforces owner binding',billing.includes('.eq("owner_user_id", auth.userId)')&&billing.includes('if (ownerError || !ownerBinding)'));
check('billing and checkout anonymous/invalid denials precede stage host 503, with no privileged actions before host denial',
 (()=>{const get=billing.split('GET: async ({ request }) => {')[1]?.split('POST: async ({ request }) => {')[0]||'';
 const post=billing.split('POST: async ({ request }) => {')[1]||'';
 const checkoutAuth='if (!bearer) return reply({ error: "Sign in with your confirmed application email before checkout." }, 401)';
 return get.indexOf('if (!auth) return respond({ error: "Sign in to manage your subscription." }, 401)')>=0
  && get.indexOf('if(!networkStripeHostAllowed(request))')>get.indexOf('if (!auth) return')
  && get.indexOf('.from("texasdefined_network_business_accounts")')>get.indexOf('if(!networkStripeHostAllowed(request))')
  && post.indexOf('if (!auth) {')>=0
  && post.indexOf('if(!networkStripeHostAllowed(request))')>post.indexOf('if (!auth) {')
  && post.indexOf('.from("texasdefined_network_applications")')>post.indexOf('if(!networkStripeHostAllowed(request))')
  && checkout.indexOf(checkoutAuth)>=0
  && checkout.indexOf('if(!networkStripeHostAllowed(request))')>checkout.indexOf(checkoutAuth)
  && checkout.indexOf('if(!networkStripeHostAllowed(request))')>checkout.indexOf('parseBoundedNetworkBillingJson(request)')
  && checkout.indexOf('supabaseAdmin.auth.getUser(bearer)')>checkout.indexOf('if(!networkStripeHostAllowed(request))');
 })());

check('billing GET and portal use the same exact case-insensitive confirmed-email policy as owner provisioning',
 billing.includes('matchingNetworkOwnerEmail(item.contact_email,auth.email)')
 && billing.includes('matchingNetworkOwnerEmail(data.contact_email,auth.email)')
 && !billing.includes('.eq("contact_email", auth.email)')
 && !billing.includes('.ilike(')
 && source('src/data/network-owner-email.ts').includes("applicationContact.trim().toLowerCase()===verifiedEmail.trim().toLowerCase()")
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-owner-email.test.mjs'));

check('billing response bound to exact customer, mode and return origin with bounded transport',
 billing.includes('isExpectedNetworkBillingPortalSession(result,data.stripe_customer_id,runtime)')
 && billing.includes('signal: AbortSignal.timeout(12_000)')
 && billing.includes('return_url: runtime.siteOrigin+"/network/billing"')
 && source('src/data/network-stripe.server.ts').includes("session.customer===expectedCustomer")
 && source('src/data/network-stripe.server.ts').includes("session.livemode===runtime.livemode")
 && source('src/data/network-stripe.server.ts').includes("destination.hostname==='billing.stripe.com'")
 && source('src/data/network-stripe.server.ts').includes("destination.username===''")
 && source('src/data/network-stripe.server.ts').includes("destination.hash===''")
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-stripe-portal-binding.test.mjs'));
check('Stripe Checkout upstream POST is bounded and preserves stable reservation idempotency',
 source('src/data/network-stripe.server.ts').includes('signal:AbortSignal.timeout(12_000)')
 && source('src/data/network-stripe.server.ts').includes("'Idempotency-Key':'network-plus-'")
 && source('src/data/network-stripe.server.ts').includes("stripeRequest('/checkout/sessions'"));
check('webhook verifies signature',webhook.includes('verifyStripeSignature(raw,header)'));
check('webhook uses the executable-tested signature helper',!webhook.includes('async function signatureValid(')&&webhook.includes('await import("@/data/network-stripe.server")'));
check('webhook looks up current subscription with bounded and fail-closed Stripe transport',
 webhook.includes('readNetworkCurrentStripeSubscription(subscriptionId)')
 && source('src/data/network-stripe.server.ts').includes("stripeBase+'/subscriptions/'")
 && source('src/data/network-stripe.server.ts').includes('AbortSignal.timeout(12_000)')
 && webhook.includes('Subscription verification unavailable')
 && webhook.includes('catch {'));
check('webhook never republishes paid listings automatically',webhook.includes('apply_texasdefined_network_stripe_event')&&!webhook.includes('.update({ is_published: true'));
check('webhook validates subscription and customer bindings',webhook.includes('p_customer_id:subscription.customer')&&webhook.includes('outcome==="mismatch"'));
check('webhook suspends unpaid listing before entitlement writes',webhook.includes('p_paid_active:active')&&webhook.includes('supabaseAdmin.rpc('));
check('admin provisioning requires manual business evidence',review.includes('if(!ownershipVerified)')&&ownerUI.includes('I independently verified this applicant'));
check('admin provisioning verifies existing confirmed email',review.includes('auth.admin.getUserById(userId)')&&review.includes('user?.email_confirmed_at'));
check('admin provisioning forbids reassignment',source('supabase/migrations/20261010214534_network_atomic_owner_verification_audit.sql').includes('v_existing.owner_user_id<>p_user_id'));
check('Plus owner provisioning never grants Featured rights',source('supabase/migrations/20261010214534_network_atomic_owner_verification_audit.sql').includes("VALUES(p_application_id,p_user_id,'plus',true)") && review.includes("supabaseAdmin.rpc('provision_verified_network_owner'"));
check('Plus dashboard never displays Featured revision controls',dashboard.includes("account.membership_tier==='plus'") && dashboard.includes('View membership billing'));
check('tier constraint migration denies implicit Featured default',source('supabase/migrations/20261010205801_network_owner_plus_tier_guard.sql').includes("SET DEFAULT 'plus'"));
check('dashboard can create account without granting access',dashboard.includes('shouldCreateUser:true')&&dashboard.includes('account?.access_enabled'));
check('only approved application may be published',review.includes("if(app.status!=='approved')"));
check('republishing preserves previously approved Featured edits',review.includes(".select('slug,plan,is_published')")&&review.includes("currentListing?null:await copyMedia")&&review.includes("finalize_texasdefined_network_publication")&&source('supabase/migrations/20261010230653_network_atomic_listing_publication.sql').includes("v_status:='republished'"));
check('publication fails closed on status persistence',review.includes("finalize_texasdefined_network_publication")&&source('supabase/migrations/20261010230653_network_atomic_listing_publication.sql').includes("SET status='published'")&&source('supabase/migrations/20261010230653_network_atomic_listing_publication.sql').includes("FOR UPDATE"));
check('intake limits ACTUAL streamed bytes before multipart or JSON materialization',
 apps.includes('readBoundedNetworkIntakeBody(request)')
 && apps.indexOf('readBoundedNetworkIntakeBody(request)') < apps.indexOf('new Response(boundedBody')
 && !apps.includes('await request.formData()') && !apps.includes('await request.text()')
 && source('src/data/network-intake-limits.server.ts').includes('NETWORK_INTAKE_MAX_BYTES=16_000_000')
 && source('src/data/network-intake-limits.server.ts').includes('total>NETWORK_INTAKE_MAX_BYTES')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-intake-limits.test.mjs'));
check('atomic Storage quota enforces 24 even for concurrent real API HTTP requests and service-role bypass',
 source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('ON CONFLICT(business_account_id) DO UPDATE')
 && source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('WHERE usage.object_count<24')
 && source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('network_featured_usage_after_insert AFTER INSERT ON storage.objects')
 && source('scripts/data/network-featured-atomic-quota-fixture.sql').includes('ON CONFLICT(bucket_id,name) DO NOTHING')
 && source('scripts/data/network-featured-atomic-quota-fixture.sql').includes('ON CONFLICT(bucket_id,name) DO UPDATE SET name=EXCLUDED.name')
 && source('scripts/data/network-featured-atomic-quota-fixture.sql').includes('Quota counter diverged after duplicate insert/upsert')
 && source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('AFTER DELETE ON storage.objects')
 && source('supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql').includes('BEFORE UPDATE OF name,bucket_id')
 && source('scripts/data/verify-network-migration-replay.mjs').includes("pendingAtomicQuota='supabase/pending/20261011046000_network_featured_storage_atomic_counter.sql'")
 && source('scripts/data/verify-network-migration-replay.mjs').includes("atomicQuotaFixture='scripts/data/network-featured-atomic-quota-fixture.sql'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Atomic counter must match 24 real stored objects')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Atomic usage was not decremented after actual Storage DELETE')
 && source('scripts/data/prepare-network-local-supabase.mjs').includes("'20261011046000_network_featured_storage_atomic_counter.sql'")
 && source('.github/workflows/network-migration-cleanroom.yml').includes('20261011046000_network_featured_storage_atomic_counter.sql')
 && !source('scripts/data/validate-network-migration-parity.mjs').includes('"20261011046000_network_featured_storage_atomic_counter.sql"'));
check('Featured 24-file quota is raced across two actual PostgreSQL sessions',
 source('scripts/data/verify-network-migration-replay.mjs').includes("concurrentQuota='scripts/data/verify-network-concurrent-upload-quota.mjs'")
 && source('scripts/data/verify-network-concurrent-upload-quota.mjs').includes("secondSession=session('B',25,false)")
 && source('scripts/data/verify-network-concurrent-upload-quota.mjs').includes("SELECT pg_sleep(3);")
 && source('scripts/data/verify-network-concurrent-upload-quota.mjs').includes("draftCount()!=='24'")
 && source('scripts/data/verify-network-concurrent-upload-quota.mjs').includes('NETWORK_MIGRATION_REPLAY_ISOLATED')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('verify-network-concurrent-upload-quota.mjs'));
check('isolated replay exercises service-only notification claim and token-gated delivery transitions',
 source('scripts/data/verify-network-migration-replay.mjs').includes("notificationClaimFixture='scripts/data/network-notification-claim-rollback-fixture.sql'")
 && source('scripts/data/network-notification-claim-rollback-fixture.sql').includes('Wrong token accepted')
 && source('scripts/data/network-notification-claim-rollback-fixture.sql').includes('Exhausted retry unexpectedly reclaimed')
 && source('scripts/data/network-notification-claim-rollback-fixture.sql').includes('ROLLBACK;')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('network-notification-claim-rollback-fixture.sql'));
check('separate committed Stripe delivery fixture verifies durable outbox dedupe and replay isolation',
 source('scripts/data/verify-network-migration-replay.mjs').includes("committedStripeFixture='scripts/data/network-migration-stripe-committed-deliveries-fixture.sql'")
 && source('scripts/data/network-migration-stripe-committed-deliveries-fixture.sql').includes('evt_separate_activation_001')
 && source('scripts/data/network-migration-stripe-committed-deliveries-fixture.sql').includes('evt_separate_failure_002')
 && source('scripts/data/network-migration-stripe-committed-deliveries-fixture.sql').includes('evt_separate_recovery_003')
 && source('scripts/data/network-migration-stripe-committed-deliveries-fixture.sql').includes('count(DISTINCT split_part(event_key')
 && source('scripts/data/network-migration-stripe-committed-deliveries-fixture.sql').includes("active_count<>2 OR inactive_count<>1 OR tx_keys<>3")
 && source('.github/workflows/network-migration-cleanroom.yml').includes('network-migration-stripe-committed-deliveries-fixture.sql'));
check('Stripe entitlement and publication reconciliation uses isolated rollback fixtures',
 source('scripts/data/verify-network-migration-replay.mjs').includes("stripeReconciliationFixture='scripts/data/network-migration-stripe-reconciliation-fixture.sql'")
 && source('scripts/data/network-migration-stripe-reconciliation-fixture.sql').includes('evt_activation_001')
 && source('scripts/data/network-migration-stripe-reconciliation-fixture.sql').includes('evt_failure_004')
 && source('scripts/data/network-migration-stripe-reconciliation-fixture.sql').includes('evt_recovery_005')
 && source('scripts/data/network-migration-stripe-reconciliation-fixture.sql').includes("'already_processed'")
 && source('scripts/data/network-migration-stripe-reconciliation-fixture.sql').includes("'republished'")
 && source('scripts/data/network-migration-stripe-reconciliation-fixture.sql').includes('ROLLBACK;')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('network-migration-stripe-reconciliation-fixture.sql'));
// All unlaunched Network routes must be excluded from the indexable static
// registry AND carry their own explicit robots noindex metadata. Newer main
// intentionally removed these private routes from INDEXABLE_STATIC_PATHS:
 // treating that safer change as a failure would be an obsolete assertion.
const indexableRegistry=source('src/lib/public-routes.ts').split('export const INDEXABLE_STATIC_PATHS = [')[1]?.split('] as const;')[0]||'';
const gatedNetworkRoutes=[
 ['/network/billing','src/routes/network.billing.tsx'],
 ['/network/checkout-return','src/routes/network.checkout-return.tsx'],
 ['/business/dashboard','src/routes/business.dashboard.tsx'],
 ['/network/directory','src/routes/network.directory.tsx'],
 ['/network/join','src/routes/network.join.tsx'],
 ['/network/apply','src/routes/network.apply.tsx'],
 ['/network/example/basic','src/routes/network.example.basic.tsx'],
 ['/network/example/plus','src/routes/network.example.plus.tsx'],
];
check('all eight gated Network routes are nonindexable and explicitly noindex at their route heads',
 indexableRegistry.length>10 && gatedNetworkRoutes.every(([path,file])=>{
  const head=source(file);
  return !indexableRegistry.includes('"'+path+'"')
   && /name\s*:\s*['"]robots['"]/.test(head)
   && /noindex/.test(head);
 })
 && source('src/routeTree.gen.ts').includes('NetworkBillingRouteImport')
 && source('src/routeTree.gen.ts').includes('BusinessDashboardRouteImport'));
check('proposed disabled-owner private revision READ policy is tested safely without live migration',
 source('scripts/data/verify-network-migration-replay.mjs').includes("proposedRevocation='supabase/pending/20261011043000_network_owner_revision_read_revocation.sql'")
 && source('supabase/pending/20261011043000_network_owner_revision_read_revocation.sql').includes('b.access_enabled=true')
 && !source('scripts/data/validate-network-migration-parity.mjs').includes('"20261011043000_network_owner_revision_read_revocation.sql"')
 && source('scripts/data/network-migration-owner-rls-fixture.sql').includes('Disabled owner can still read private revisions or draft media')
 && source('scripts/data/network-migration-owner-rls-fixture.sql').includes('Authenticated role without JWT subject')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('supabase/pending/20261011043000_network_owner_revision_read_revocation.sql'));
check('pending private sensitive-action audit is source tracked, service-only, and exercised in rollback fixture',
 source('scripts/data/verify-network-migration-replay.mjs').includes("pendingAudit='supabase/pending/20261011044000_network_sensitive_action_audit.sql'")
 && source('scripts/data/verify-network-migration-replay.mjs').includes("auditFixture='scripts/data/network-sensitive-action-audit-fixture.sql'")
 && source('supabase/pending/20261011044000_network_sensitive_action_audit.sql').includes('REVOKE ALL ON texasdefined_network_internal.admin_action_audit')
 && source('scripts/data/network-sensitive-action-audit-fixture.sql').includes('seven material audit transitions')
 && source('scripts/data/network-sensitive-action-audit-fixture.sql').includes('ROLLBACK;')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('supabase/pending/20261011044000_network_sensitive_action_audit.sql')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('scripts/data/network-sensitive-action-audit-fixture.sql'));
check('manual notification provider-reconciliation is private, audited and never automatically resends uncertain delivery',
 source('scripts/data/verify-network-migration-replay.mjs').includes("pendingRecovery='supabase/pending/20261011045000_network_notification_manual_recovery.sql'")
 && source('scripts/data/verify-network-migration-replay.mjs').includes("recoveryFixture='scripts/data/network-notification-manual-recovery-fixture.sql'")
 && source('supabase/pending/20261011045000_network_notification_manual_recovery.sql').includes('REVOKE ALL ON FUNCTION public.reconcile_texasdefined_network_notification')
 && source('supabase/pending/20261011045000_network_notification_manual_recovery.sql').includes("ELSE 'suppressed' END")
 && source('scripts/data/network-notification-manual-recovery-fixture.sql').includes('Ambiguous delivery was automatically retried')
 && source('scripts/data/network-notification-manual-recovery-fixture.sql').includes('Definitive provider failure not persisted')
 && source('scripts/data/network-notification-manual-recovery-fixture.sql').includes('Late provider evidence could not resolve held delivery')
 && source('supabase/pending/20261011045000_network_notification_manual_recovery.sql').includes("status IN ('sending','suppressed')")
 && source('scripts/data/network-notification-manual-recovery-fixture.sql').includes('Notification retry budget exhausted')
 && source('scripts/data/network-notification-manual-recovery-fixture.sql').includes('ROLLBACK;')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('supabase/pending/20261011045000_network_notification_manual_recovery.sql')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('scripts/data/network-notification-manual-recovery-fixture.sql'));
check('real GoTrue Auth and Storage HTTP integration is confined to fresh, unlinked local Supabase CLI test stack',
 source('.github/workflows/network-local-auth-storage.yml').includes('supabase/setup-cli@v1')
 && source('.github/workflows/network-local-auth-storage.yml').includes("version: '2.120.0'")
 && source('.github/workflows/network-local-auth-storage.yml').includes('NETWORK_SUPABASE_REAL_E2E: yes-local-disposable-only')
 && source('.github/workflows/network-local-auth-storage.yml').includes('supabase init')
 && source('.github/workflows/network-local-auth-storage.yml').includes('supabase stop')
 && source('.github/workflows/network-local-auth-storage.yml').includes("'src/routes/business.dashboard*'")
 && source('.github/workflows/network-local-auth-storage.yml').includes("'src/routes/api.public.network*'")
 && source('.github/workflows/network-local-auth-storage.yml').includes("'src/data/network-*'")
 && source('.github/workflows/network-local-auth-storage.yml').includes("'scripts/data/network-*'")
 && !source('.github/workflows/network-local-auth-storage.yml').includes('supabase link')
 && source('scripts/data/prepare-network-local-supabase.mjs').includes("applied.length!==40")
 && source('scripts/data/prepare-network-local-supabase.mjs').includes("config.includes('ftkznprjljkhymknvhye')")
 && source('scripts/data/verify-network-local-supabase.mjs').includes("process.env.API_URL!==ORIGIN")
 && source('scripts/data/verify-network-local-supabase.mjs').includes('NETWORK REAL STORAGE CONCURRENT QUOTA PASS')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('NETWORK REAL STORAGE CLEANUP PASS')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Concurrent Storage requests overshot or blocked quota')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('A private image referenced by a review was deleted')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Recovered quota slot did not restore exactly 24 drafts')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Real local password sign-in')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('NETWORK REAL LOCAL PASSWORDLESS PASS')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('NETWORK REAL LOCAL OWNER PROVISIONING PASS')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('NETWORK REAL LOCAL INTAKE CRASH/RETRY PASS')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Failed media finalization generated a receipt')
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Retry created a duplicate application receipt')
 && source('scripts/data/verify-network-local-supabase.mjs').includes("'/rest/v1/rpc/finalize_texasdefined_network_intake'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes("'/rest/v1/rpc/provision_verified_network_owner'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes('Confirmed wrong-email owner provisioning')
 && source('scripts/data/verify-network-local-supabase.mjs').includes("provisioning_action='reenabled'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes('NETWORK REAL LOCAL SIGNED MEDIA PASS')
 && source('scripts/data/verify-network-local-supabase.mjs').includes("'/auth/v1/admin/generate_link'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes("'Magic Link token replay'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes("'Expired private signed URL'")
 && source('scripts/data/verify-network-local-supabase.mjs').includes("'Rejected upsert modified previously stored bytes'"));
check('actual local HTTP PostgREST JWT boundary is independently tested without live customers',
 source('.github/workflows/network-migration-cleanroom.yml').includes('postgrest/postgrest:v14.14')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('verify-network-postgrest-http-rls.mjs')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes("process.env.PGDATABASE!=='network_replay'")
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('Expired JWT accepted')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('Forged JWT accepted')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('disabled owner private revisions revoked')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('disabled owner draft media revoked')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('cross-owner HTTP revision INSERT')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('HTTP draft metadata 25th quota')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('disabled owner HTTP private revision INSERT')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('NETWORK POSTGREST SERVICE RPC PASS')
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes("'service_role'")
 && source('scripts/data/verify-network-postgrest-http-rls.mjs').includes('Duplicate service recovery was accepted')
 && source('scripts/data/network-postgrest-http-rls-fixture.sql').includes('request.jwt.claims'));
check('isolated replay executes two-owner and private media RLS fixture with full rollback',
 source('scripts/data/verify-network-migration-replay.mjs').includes("ownerIsolationFixture='scripts/data/network-migration-owner-rls-fixture.sql'")
 && source('scripts/data/network-migration-owner-rls-fixture.sql').includes('SET LOCAL ROLE authenticated;')
 && source('scripts/data/network-migration-owner-rls-fixture.sql').includes('SET LOCAL ROLE anon;')
 && source('scripts/data/network-migration-owner-rls-fixture.sql').includes('FOR slot IN 1..24 LOOP')
 && source('scripts/data/network-migration-owner-rls-fixture.sql').includes('ROLLBACK;')
 && source('.github/workflows/network-migration-cleanroom.yml').includes('network-migration-owner-rls-fixture.sql'));
check('intake checks full PNG signature',apps.includes('pngSignature.every'));
check('public media checks full PNG signature',review.includes('pngHeader.every'));
check('approved Network public media is immutable and retry-safe',
 review.split('writeImmutableNetworkPublishedImage(').length===3
 && !review.includes('upsert:true')
 && source('src/data/network-published-media.server.ts').includes('upsert:false')
 && source('src/data/network-published-media.server.ts').includes("crypto.subtle.digest('SHA-256'")
 && source('src/data/network-published-media.server.ts').includes("return 'verified-existing'")
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-published-media.test.mjs'));
check('directory filters published records',directory.includes('.eq("is_published", true)'));
check('profile and all entry pages remain noindex',requiredPages.every(file=>/noindex/.test(source(root+file)))&&profile.includes('noarchive'));
console.log('Network static release safeguards validated; NOT an end-to-end test or production authorization.');

check('atomic Stripe reconciliation is only after signature validation',webhook.indexOf('verifyStripeSignature(raw,header)') < webhook.indexOf('apply_texasdefined_network_stripe_event'));

const featureStyles=source('src/network.css');
const featureStyleUsers=[
 'network.join.lazy.tsx','network.apply.lazy.tsx','network.directory.lazy.tsx',
 'network.billing.lazy.tsx','network.business.$slug.lazy.tsx',
 'network.checkout-return.lazy.tsx','network.example.basic.lazy.tsx',
 'network.example.plus.lazy.tsx','business.dashboard.lazy.tsx','admin.network-applications.lazy.tsx',
];
check('feature CSS is attached to every lazy Network page',
 featureStyleUsers.every(file=>source(root+file).includes('import "../network.css";'))
 &&featureStyles.includes('source(none)')&&source('src/styles.css').includes('@source not "./routes/network.*.lazy.tsx"'));

check('concurrent active application duplicates use a database index and return 409',apps.includes('error?.code==="23505"')&&source('supabase/migrations/20261010213107_network_atomic_active_application_identity.sql').includes('CREATE UNIQUE INDEX'));

const publishDbSource=source('supabase/migrations/20261010213304_network_database_publication_entitlement_gate.sql');
const suspendDbSource=source('supabase/migrations/20261010213336_network_suspend_ineligible_published_listings.sql');
check('database refuses publication without separate approval and paid entitlement',publishDbSource.includes("a.status IN ('approved','published')")&&publishDbSource.includes('a.paid_entitlement_active = true')&&publishDbSource.includes('FOR SHARE'));
check('database hides listings on rejected status or Plus entitlement downgrade',suspendDbSource.includes("NEW.plan = 'plus'")&&suspendDbSource.includes('SET is_published=false'));

const mailTemplates=source('src/data/network-notification-templates.server.ts');
const outboxMigration=source('supabase/migrations/20261010213947_network_private_notification_outbox.sql');
check('Network email remains disabled without approved Microsoft 365 sender',
 mailTemplates.includes('NETWORK_EMAIL_DELIVERY_ENABLED = false')
 &&mailTemplates.includes("NETWORK_NOTIFICATION_SENDER = 'admin@texasdefined.com'"));
check('Network email outbox remains service-only and idempotent',
 outboxMigration.includes('ENABLE ROW LEVEL SECURITY')
 &&outboxMigration.includes('ON CONFLICT (event_key) DO NOTHING')
 &&outboxMigration.includes('FROM PUBLIC,anon,authenticated'));

check('owner access requires audit-backed atomic provisioning',review.includes("supabaseAdmin.rpc('provision_verified_network_owner'")&&source('supabase/migrations/20261010214534_network_atomic_owner_verification_audit.sql').includes('FOR UPDATE')&&ownerUI.includes('Evidence reference'));

check('Stripe checkout must claim and commit one durable reservation',checkout.includes('reserve_texasdefined_network_checkout')&&checkout.includes('complete_texasdefined_network_checkout')&&checkout.includes('session.expiresAt'));
check('Checkout session requires exact configured Stripe mode, open subscription, application, billing account and customer binding',
 source('src/data/network-stripe.server.ts').includes("result.object!=='checkout.session'")
 && source('src/data/network-stripe.server.ts').includes('result.livemode!==runtime.livemode')
 && source('src/data/network-stripe.server.ts').includes("result.mode!=='subscription'")
 && source('src/data/network-stripe.server.ts').includes("result.status!=='open'")
 && source('src/data/network-stripe.server.ts').includes('result.client_reference_id!==applicationId')
 && source('src/data/network-stripe.server.ts').includes('result.metadata?.application_id!==applicationId')
 && source('src/data/network-stripe.server.ts').includes('result.metadata?.billing_account_id!==billingAccountId')
 && source('src/data/network-stripe.server.ts').includes('result.customer!==stripeCustomerId')
 && source('scripts/data/network-stripe-security.test.mjs').includes('foreign billing account metadata')
 && source('scripts/data/network-stripe-security.test.mjs').includes('different Stripe customer'));

check('Checkout redirect requires exact Stripe hostname',source('src/data/network-stripe.server.ts').includes("target.hostname==='checkout.stripe.com'"));

check('Stripe verified subscription cannot contain unrelated paid line items',webhook.includes('isExpectedNetworkPlusSubscription(subscription)')&&source('src/data/network-stripe.server.ts').includes('items.length===1'));
check('Stripe Plus price changes de-entitle only the exact existing customer/subscription, never bind a new subscription',
 webhook.includes('isNetworkSubscriptionIdentity(subscription)')
 && webhook.includes('isBoundNetworkSubscriptionPriceMismatch(subscription,bound)')
 && webhook.includes('const active=correctPlusPrice && subscription.status==="active"')
 && source('src/data/network-stripe.server.ts').includes('existing.stripe_subscription_id===subscription.id')
 && source('src/data/network-stripe.server.ts').includes('existing.stripe_customer_id===subscription.customer')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-stripe-entitlement-boundary.test.mjs'));
check('Stripe portal uses validated server-only live or isolated test credentials',
 billing.includes('const runtime=getNetworkStripeRuntime()')
 && billing.includes('const key=runtime.secret;')
 && source('src/data/network-stripe-mode.server.ts').includes("secret.startsWith('sk_live_')"));

check('Featured approval and review ledger mutate within one DB transaction',
 review.includes("supabaseAdmin.rpc('finalize_texasdefined_featured_revision'")
 && !review.includes(".update({review_status:decision==='approve'?'approved':'rejected'"));

check('Feature draft uploads capped per account on server and in owner UI',
 source('supabase/migrations/20261010224104_network_featured_draft_upload_quota.sql').includes('v_count<24')
 && source('supabase/migrations/20261010224104_network_featured_draft_upload_quota.sql').includes('pg_advisory_xact_lock')
 && source(root+'business.dashboard.lazy.tsx').includes('priorMedia.length+selected.length>24'));

check('public network intake and uploads are disabled until launch approval',
 apps.includes("process.env.NETWORK_INTAKE_ENABLED!=='true'")
 && source(root+'network.apply.tsx').includes('NETWORK_INTAKE_ENABLED')
 && source(root+'network.apply.lazy.tsx').includes('disabled={!applicationsOpen'));
check('Network publication and Featured approval fail closed before launch',
 review.includes("process.env.NETWORK_PUBLICATION_ENABLED!=='true'")
 && review.includes("decision==='approve'&&process.env.NETWORK_PUBLICATION_ENABLED"));

check('Network admin moderation uses its own guarded secret, not sports marketing access',
 review.includes("import { assertNetworkAdminAccess }")
 && !review.includes('assertSportsPartnerAccess')
 && source('src/data/network-admin-access.server.ts').includes('NETWORK_ADMIN_ACCESS_KEY')
 && source('src/data/network-admin-access.server.ts').includes('expected.length<32'));

check('owner login links are disabled without explicit portal launch',
 source(root+'business.dashboard.tsx').includes('NETWORK_OWNER_PORTAL_ENABLED')
 && source(root+'network.billing.tsx').includes('NETWORK_OWNER_PORTAL_ENABLED')
 && source(root+'business.dashboard.lazy.tsx').includes('disabled={!ownerPortalOpen||busy}')
 && source(root+'network.billing.lazy.tsx').includes('disabled={!ownerPortalOpen||busy}'));

check('intake is reviewable only after media and receipt transaction',
 apps.includes('finalize_texasdefined_network_intake')
 && review.includes(".eq('intake_complete',true)")
 && review.includes('!current.intake_complete')
 && source('supabase/migrations/20261010225436_network_intake_complete_after_media_upload.sql').includes('NEW.intake_complete AND NOT OLD.intake_complete')
 && source('supabase/migrations/20261010225436_network_intake_complete_after_media_upload.sql').includes('network_review_requires_completed_intake'));

check('owner dashboard never accepts HTTP 200 empty-delete as proof of draft cleanup or retains prior account private state',
 source('src/routes/business.dashboard.lazy.tsx').includes('wereNetworkUnsubmittedDraftsDeleted(uploadedPaths,remainingMedia)')
 && source('src/routes/business.dashboard.lazy.tsx').includes('setAccount(null);setPublished(null);setRevisions([])')
 && source('src/routes/business.dashboard.lazy.tsx').includes('setDraft({});setNewLogo(null);setNewGallery([])')
 && source('src/routes/business.dashboard.lazy.tsx').includes('let authStateEventReceived=false')
 && source('src/routes/business.dashboard.lazy.tsx').includes("setEmail('');setMessage('')")
 && source('src/routes/business.dashboard.lazy.tsx').includes("eq('access_enabled',true)")
 && source('scripts/data/network-owner-draft-cleanup.test.mjs').includes('HTTP 200 no-op DELETE')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-owner-draft-cleanup.test.mjs'));
check('service-role signed revision preview never accepts arbitrary foreign or unbounded owner JSON paths',
 source('src/data/network-review.server.ts').includes('validatedNetworkRevisionMediaPaths(revision.proposed_profile,revision.submitted_by,revision.business_account_id)')
 && source('src/data/network-review.server.ts').includes('mediaValidationError:paths===null')
 && source('src/data/network-review.server.ts').includes('validatedNetworkRevisionMediaPaths(proposed,account.owner_user_id,account.id)')
 && source('src/routes/admin.network-applications.lazy.tsx').includes('disabled={busy||!!r.mediaValidationError}')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-revision-media.test.mjs')
 && source('scripts/data/network-revision-media.test.mjs').includes('cross-owner and cross-account paths cannot be signed'));
check('Featured partial-upload cleanup only targets unreferenced owner media',source('src/routes/business.dashboard.lazy.tsx').includes('const uploadedPaths:string[]=[]')&&source('src/routes/business.dashboard.lazy.tsx').includes('cleanUnsubmitted()')&&source('supabase/migrations/20261010230319_network_owner_delete_unreferenced_drafts.sql').includes('NOT EXISTS'));

check('atomic published listing finalizer requires completed approval and paid Plus entitlement',source('supabase/migrations/20261010230653_network_atomic_listing_publication.sql').includes("a.intake_complete IS NOT TRUE")&&source('supabase/migrations/20261010230653_network_atomic_listing_publication.sql').includes("a.paid_entitlement_active IS NOT TRUE")&&source('supabase/migrations/20261010230712_network_publication_jsonb_key_count_fix.sql').includes('jsonb_object_keys(p_profile)'));

check('editorial rejection and unpublish are DB-atomic even while launch is gated',review.includes("supabaseAdmin.rpc('suspend_texasdefined_network_listing'")&&source('supabase/migrations/20261010231214_network_atomic_unpublish_moderation.sql').includes('FOR UPDATE')&&source('supabase/migrations/20261010231214_network_atomic_unpublish_moderation.sql').includes('SET is_published=false')&&source('supabase/migrations/20261010231214_network_atomic_unpublish_moderation.sql').includes('SET status=p_to_status'));

check('Featured upload and revision submission require a paid published Plus listing',source('supabase/migrations/20261010231400_network_featured_paid_entitlement_upload_revision_guard.sql').includes("a.paid_entitlement_active=true")&&source('supabase/migrations/20261010231443_network_featured_revision_private_entitlement_helper.sql').includes('network_can_submit_featured_revision(business_account_id,submitted_by)')&&source('src/routes/business.dashboard.lazy.tsx').includes('Featured edits are paused'));

check('local Network browser QA never deploys or enables billing',source('.github/workflows/network-preview-browser.yml').includes('verify-network-preview-browser.mjs')&&!source('.github/workflows/network-preview-browser.yml').includes('wrangler deploy')&&source('scripts/ci/verify-network-preview-browser.mjs').includes('tdRootHydrated'));

check('Featured paid entitlement security-definer helpers are off the exposed public API',source('supabase/migrations/20261010232130_network_entitlement_helpers_private_schema.sql').includes('CREATE SCHEMA IF NOT EXISTS texasdefined_network_internal')&&source('supabase/migrations/20261010232130_network_entitlement_helpers_private_schema.sql').includes('DROP FUNCTION IF EXISTS public.network_can_submit_featured_revision')&&source('supabase/migrations/20261010232130_network_entitlement_helpers_private_schema.sql').includes('texasdefined_network_internal.network_featured_upload_under_quota'));

const networkLazyComponents=["network.join.lazy.tsx","network.apply.lazy.tsx","network.example.basic.lazy.tsx","network.example.plus.lazy.tsx","network.directory.lazy.tsx","network.billing.lazy.tsx","network.checkout-return.lazy.tsx","business.dashboard.lazy.tsx","admin.network-applications.lazy.tsx","network.business.$slug.lazy.tsx"];
check('Network pages reuse the sole root main landmark',source(root+'__root.tsx').includes('<main id="main"')&&networkLazyComponents.every(file=>!source(root+file).includes('<main')));
check('Network directory and profiles are hidden without explicit public visibility launch',source(root+'network.directory.tsx').includes('NETWORK_DIRECTORY_ENABLED')&&source(root+'network.business.$slug.tsx').includes('NETWORK_DIRECTORY_ENABLED'));

check('orphan media inventory is 45-day read-only and admin-authenticated',source('supabase/migrations/20261010232506_network_readonly_stale_draft_cleanup_inventory.sql').includes('p_min_age_days<30')&&source('supabase/migrations/20261010232506_network_readonly_stale_draft_cleanup_inventory.sql').includes('NOT EXISTS')&&source('src/data/network-review.server.ts').includes("p_min_age_days:45,p_limit:100")&&source('src/routes/admin.network-applications.lazy.tsx').includes('Read-only inventory. This screen never deletes files'));

check('application intake compensating deletes verify every private object and never erase unverified or completed applications',
 source('src/routes/api.public.network-application.ts').includes('networkIntakeCleanupObjectPaths(applicationId,existingMedia)')
 && source('src/routes/api.public.network-application.ts').includes('networkIntakeCleanupFolderIsEmpty(remainingMedia)')
 && source('src/routes/api.public.network-application.ts').includes('current?.intake_complete===true')
 && source('src/routes/api.public.network-application.ts').includes('.delete({count:"exact"}).eq("id",applicationId).eq("intake_complete",false)')
 && source('scripts/data/network-intake-cleanup.test.mjs').includes('a missing or unknown read-after-delete inventory')
 && source('scripts/ci/run-premerge-validation.mjs').includes('network-intake-cleanup.test.mjs'));
check('Network webhook caps untrusted body before HMAC or Stripe network calls',
 webhook.includes('readNetworkWebhookPayload(request)')
 && source('src/data/network-stripe.server.ts').includes('NETWORK_WEBHOOK_MAX_BYTES=1_048_576')
 && webhook.indexOf('readNetworkWebhookPayload(request)') < webhook.indexOf('verifyStripeSignature(raw,header)'));
check('Webhook requires mode-bound Stripe credentials and a staging-host check',
 webhook.includes('networkStripeHostAllowed(request)')
 && webhook.includes('runtime.livemode!==expectedMode')
 && webhook.includes('networkStripeWebhookSecret()'));

check('Published media inventory is read-only, least-privilege and keeps unpublished references',
 source('supabase/migrations/20261010235427_network_readonly_orphan_published_media_inventory.sql').includes("texasdefined-network-published")
 && source('supabase/migrations/20261010235427_network_readonly_orphan_published_media_inventory.sql').includes('NOT EXISTS')
 && source('supabase/migrations/20261010235427_network_readonly_orphan_published_media_inventory.sql').includes('TO service_role')
 && source('src/data/network-review.server.ts').includes('previewNetworkOrphanPublishedMedia')
 && source('src/routes/admin.network-applications.lazy.tsx').includes('This never deletes media'));

check('notification trigger functions are not exposed as browser-callable SECURITY DEFINER RPCs',
 source('supabase/migrations/20261011000421_network_private_notification_trigger_execute_grants.sql').includes('FROM PUBLIC,anon,authenticated')
 && source('supabase/migrations/20261011000421_network_private_notification_trigger_execute_grants.sql').includes('network_application_email_events')
 && source('supabase/migrations/20261011000421_network_private_notification_trigger_execute_grants.sql').includes('network_owner_email_events')
 && source('supabase/migrations/20261011000421_network_private_notification_trigger_execute_grants.sql').includes('network_revision_email_events'));
