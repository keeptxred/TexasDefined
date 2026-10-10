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
check('billing enforces verified sign-in',billing.includes('email_confirmed_at')&&billing.includes('auth.getUser(token)'));
check('billing list filters owner bindings',billing.includes('.in("id",ids)')&&billing.includes('.eq("access_enabled", true)'));
check('billing portal enforces owner binding',billing.includes('.eq("owner_user_id", auth.userId)')&&billing.includes('if (ownerError || !ownerBinding)'));
check('billing URL pinned to Stripe',billing.includes('destination.hostname !== "billing.stripe.com"')&&billing.includes('return_url: "https://texasdefined.com/network/billing"'));
check('webhook verifies signature',webhook.includes('signatureValid(raw, header, secret)'));
check('webhook looks up current subscription',webhook.includes('api.stripe.com/v1/subscriptions/'));
check('webhook never republishes paid listings automatically',webhook.includes('is_published: false')&&!webhook.includes('is_published: true'));
check('admin provisioning requires manual business evidence',review.includes('if(!ownershipVerified)')&&ownerUI.includes('I independently verified this applicant'));
check('admin provisioning verifies existing confirmed email',review.includes('auth.admin.getUserById(userId)')&&/user\\?\\.email_confirmed_at/.test(review));
check('admin provisioning forbids reassignment',review.includes('existing.owner_user_id!==userId'));
check('dashboard can create account without granting access',dashboard.includes('shouldCreateUser:true')&&dashboard.includes('account?.access_enabled'));
check('only approved application may be published',review.includes("if(app.status!=='approved')"));
check('publication fails closed on status persistence',review.includes('if(statusError){')&&review.includes('is_published:false'));
check('intake checks full PNG signature',apps.includes('pngSignature.every'));
check('public media checks full PNG signature',review.includes('pngHeader.every'));
check('directory filters published records',directory.includes('.eq("is_published", true)'));
check('profile and all entry pages remain noindex',requiredPages.every(file=>/noindex/.test(source(root+file)))&&profile.includes('noarchive'));
console.log('Network static release safeguards validated; NOT an end-to-end test or production authorization.');
