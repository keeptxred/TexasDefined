import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const src=(path)=>readFileSync(path,'utf8');
const terms=src('src/data/network-terms.ts');
const termsRoute=src('src/routes/network.terms.lazy.tsx');
const applyUi=src('src/routes/network.apply.lazy.tsx');
const applyApi=src('src/routes/api.public.network-application.ts');
const billingUi=src('src/routes/network.billing.lazy.tsx');
const checkoutApi=src('src/routes/api.public.network-checkout.ts');
const privacy=src('src/routes/privacy.lazy.tsx');
const brand=src('src/brand/texasdefined.ts');
const publicRoutes=src('src/lib/public-routes.ts');
const migration=src('supabase/migrations/20261012012227_require_network_customer_terms_acceptance.sql');
const immutable=src('supabase/migrations/20261012012809_make_network_terms_evidence_append_only.sql');

const VERSION='2026-10-11-v1';
const HASH='166b237dc2572da5195e1f5217ec51c8ecc83b73f68a080a16b4478e35f9a6a6';
const DISCLOSURE_HASH='d6f4996584f7ffbeb80e8ac3941ee1495b67fd15a096b86135623dd8bb3b120a';

const check=(label,value)=>{assert.ok(value,label);console.log('PASS network terms: '+label)};

const sectionMatches=[...terms.matchAll(/\["([^"]+)", "((?:[^"\\]|\\.)*)"\]/g)]
  .map(match=>[match[1],JSON.parse('"'+match[2]+'"')]);
assert.equal(sectionMatches.length,24,'Expected exactly 24 versioned Network terms sections');
const canonical=[
  'TexasDefined Business Network Membership Terms',
  'Version '+VERSION,
  'Effective October 11, 2026',
  '',
  ...sectionMatches.flatMap(([heading,body])=>[heading,body,'']),
].join('\n').trimEnd()+'\n';
check('canonical text hash matches committed acceptance fingerprint',
 createHash('sha256').update(canonical).digest('hex')===HASH
 &&terms.includes('NETWORK_TERMS_SNAPSHOT_SHA256 = "'+HASH+'"')
 &&terms.includes('NETWORK_PLUS_RECURRING_DISCLOSURE_SHA256 = "'+DISCLOSURE_HASH+'"'));

for(const phrase of [
 'TexasDefined does not fact-check customer-supplied listing content',
 'You are solely responsible for every logo, photo, image',
 'may be crawled, indexed, cached, copied, excerpted, displayed, ranked, or surfaced by Google',
 'Plus is currently offered at $19.99 per month',
 'automatically renews each month until canceled',
 'Checking an acceptance box',
]){
 check('terms contain '+phrase.slice(0,48),terms.includes(phrase));
}

check('public terms route highlights facts, media rights and third-party discovery',
 termsRoute.includes('TexasDefined does not fact-check customer-supplied listing content')
 &&termsRoute.includes('all rights, licenses, permissions, and releases')
 &&termsRoute.includes('Google, Bing, other search engines, AI/answer systems'));

for(const marker of [
 'factsAccepted','mediaAccepted','indexingAccepted','termsAccepted',
 'My facts are my responsibility.',
 'My images and media are my responsibility.',
 'I understand publication is public.',
 'NETWORK_TERMS_VERSION',
 'href="/network/terms"',
]){
 check('application UI requires '+marker,applyUi.includes(marker));
}

check('application API fails closed unless every responsibility and current terms are accepted',
 applyApi.includes('input.authorized!==true')
 &&applyApi.includes('input.factsAccepted!==true')
 &&applyApi.includes('input.mediaAccepted!==true')
 &&applyApi.includes('input.indexingAccepted!==true')
 &&applyApi.includes('input.termsAccepted!==true||input.termsVersion!==NETWORK_TERMS_VERSION'));

for(const marker of [
 'terms_version:NETWORK_TERMS_VERSION',
 'terms_snapshot_sha256:NETWORK_TERMS_SNAPSHOT_SHA256',
 'representative_authority_accepted:true',
 'facts_responsibility_accepted:true',
 'media_responsibility_accepted:true',
 'search_indexing_accepted:true',
]){
 check('application persists '+marker,applyApi.includes(marker));
}

check('Plus checkout requires both current terms and separate recurring charge authorization',
 billingUi.includes('termsAccepted[item.id]===true')
 &&billingUi.includes('recurringAccepted[item.id]===true')
 &&billingUi.includes('Recurring billing authorization:')
 &&billingUi.includes('NETWORK_PLUS_RECURRING_DISCLOSURE')
 &&billingUi.includes('Agree & start secure Plus checkout'));

check('checkout API rejects stale/missing acceptance before Stripe and records verified owner evidence',
 checkoutApi.indexOf('body.termsAccepted!==true')<checkoutApi.indexOf('createNetworkCheckoutSession')
 &&checkoutApi.includes('body.recurringBillingAccepted!==true')
 &&checkoutApi.includes('body.termsVersion!==NETWORK_TERMS_VERSION')
 &&checkoutApi.includes('.from("texasdefined_network_checkout_acceptances")')
 &&checkoutApi.includes('owner_user_id:verified.user.id')
 &&checkoutApi.includes('accepted_email:verified.user.email.trim().toLowerCase()')
 &&checkoutApi.includes('recurring_disclosure_sha256:NETWORK_PLUS_RECURRING_DISCLOSURE_SHA256')
 &&checkoutApi.includes('ignoreDuplicates:true'));

for(const marker of [
 'terms_version text',
 'terms_snapshot_sha256 text',
 'representative_authority_accepted boolean',
 'facts_responsibility_accepted boolean',
 'media_responsibility_accepted boolean',
 'search_indexing_accepted boolean',
 'CREATE TABLE IF NOT EXISTS public.texasdefined_network_checkout_acceptances',
 'terms_accepted boolean NOT NULL CHECK (terms_accepted IS TRUE)',
 'recurring_billing_accepted boolean NOT NULL CHECK (recurring_billing_accepted IS TRUE)',
 'ENABLE ROW LEVEL SECURITY',
 'FROM PUBLIC, anon, authenticated',
 'TO service_role',
]){
 check('migration enforces '+marker,migration.includes(marker));
}

check('acceptance evidence is append-only under the website service role',
 immutable.includes('GRANT SELECT, INSERT ON TABLE public.texasdefined_network_checkout_acceptances TO service_role')
 &&immutable.includes('REVOKE ALL ON TABLE public.texasdefined_network_checkout_acceptances FROM service_role')
 &&immutable.includes('CREATE TRIGGER network_application_terms_immutable')
 &&immutable.includes("RAISE EXCEPTION 'Network terms acceptance evidence is immutable'")
 &&immutable.includes('FROM PUBLIC, anon, authenticated'));

check('privacy policy discloses Network data and third-party indexing',
 privacy.includes('Business Network Applications, Listings, and Owner Accounts')
 &&privacy.includes('Search engines, AI and answer systems, social networks, archives, directories')
 &&privacy.includes('does not control third-party indexing or caching'));

check('membership terms are linked and treated as a public legal route',
 brand.includes('{ label: "Network Membership Terms", to: "/network/terms" }')
 &&publicRoutes.includes('"/network/terms"'));

const fixtures=[
 'scripts/data/verify-network-local-supabase.mjs',
 'scripts/data/network-public-rls-rollback-fixture.sql',
 'scripts/data/network-migration-owner-rls-fixture.sql',
 'scripts/data/network-stripe-local-checkout-fixture.sql',
 'scripts/data/network-featured-atomic-quota-fixture.sql',
 'scripts/data/network-sensitive-action-audit-fixture.sql',
 'scripts/data/verify-network-concurrent-upload-quota.mjs',
 'scripts/data/network-migration-stripe-reconciliation-fixture.sql',
 'scripts/data/network-migration-stripe-committed-deliveries-fixture.sql',
 'scripts/data/network-postgrest-http-rls-fixture.sql',
];
for(const fixture of fixtures){
 const body=src(fixture);
 check('synthetic application fixture carries explicit current terms: '+fixture,
   body.includes(VERSION)&&body.includes(HASH));
}

console.log('TexasDefined Network customer terms and acceptance architecture validated.');
