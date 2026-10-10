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
check('checkout disabled by default',checkout.includes('if (!stripeCheckoutEnabled())'));
check('checkout needs verified Supabase user',checkout.includes('email_confirmed_at')&&checkout.includes('auth.getUser(bearer)'));
check('checkout needs authorized, enabled owner',checkout.includes('texasdefined_network_business_accounts')&&checkout.includes('.eq("owner_user_id", verified.user.id)')&&checkout.includes('.eq("access_enabled", true)'));
check('checkout blocks preexisting subscription',checkout.includes('data.stripe_subscription_id')&&checkout.includes('data.paid_entitlement_active'));
check('checkout requires editorial approval',checkout.includes('data.status !== "approved"'));
check('authorized Plus owner can start checkout only after launch',billing.includes('checkoutAvailable=stripeCheckoutEnabled()')&&billing.includes('checkoutEligible: item.status === "approved"')&&source(root+'network.billing.lazy.tsx').includes('disabled={busy||!checkoutAvailable}'));

check('billing enforces verified sign-in',billing.includes('email_confirmed_at')&&billing.includes('auth.getUser(token)'));
check('billing list filters owner bindings',billing.includes('.in("id",ids)')&&billing.includes('.eq("access_enabled", true)'));
check('billing portal enforces owner binding',billing.includes('.eq("owner_user_id", auth.userId)')&&billing.includes('if (ownerError || !ownerBinding)'));
check('billing URL pinned to Stripe',billing.includes('destination.hostname !== "billing.stripe.com"')&&billing.includes('return_url: "https://texasdefined.com/network/billing"'));
check('webhook verifies signature',webhook.includes('verifyStripeSignature(raw,header)'));
check('webhook uses the executable-tested signature helper',!webhook.includes('async function signatureValid(')&&webhook.includes('await import("@/data/network-stripe.server")'));
check('webhook looks up current subscription',webhook.includes('api.stripe.com/v1/subscriptions/'));
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
check('republishing preserves previously approved Featured edits',review.includes(".select('slug,plan,is_published')")&&review.includes("currentListing?null:await copyMedia")&&review.includes(".eq('is_published',false).select('slug').single()")&&!review.includes(".upsert({\n  application_id:app.id,slug,plan:app.plan,profile"));
check('publication fails closed on status persistence',review.includes('if(statusError||!updatedApplication){')&&review.includes('is_published:false'));
check('intake checks full PNG signature',apps.includes('pngSignature.every'));
check('public media checks full PNG signature',review.includes('pngHeader.every'));
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
