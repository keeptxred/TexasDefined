// Snapshot of all applied Network-related migrations read from supabase_migrations.schema_migrations
// for shared project ftkznprjljkhymknvhye on October 10, 2026.
// Static on purpose: CI cannot use privileged production Supabase credentials.
// Add future applied migrations to the manifest and keep the checked-in history complete.
import { existsSync,readFileSync,readdirSync } from 'node:fs';
import path from 'node:path';
const folder=path.resolve('supabase/migrations');
const applied=[
  "20261010153156_create_texasdefined_network_applications_private_intake.sql",
  "20261010153310_create_texasdefined_network_private_media_bucket.sql",
  "20261010155736_add_network_featured_owner_accounts_and_review_revisions.sql",
  "20261010163334_network_submissions_private_media_bucket.sql",
  "20261010180309_create_texasdefined_network_stripe_event_idempotency_ledger.sql",
  "20261010180719_create_texasdefined_network_governed_public_listing_profiles.sql",
  "20261010180743_add_governed_network_published_media_bucket.sql",
  "20261010181405_add_featured_owner_bound_private_media_upload_policies.sql",
  "20261010183442_harden_texasdefined_network_featured_authorization.sql",
  "20261010205801_network_owner_plus_tier_guard.sql",
  "20261010211826_atomic_texasdefined_network_stripe_reconciliation.sql",
  "20261010213107_network_atomic_active_application_identity.sql",
  "20261010213304_network_database_publication_entitlement_gate.sql",
  "20261010213336_network_suspend_ineligible_published_listings.sql",
  "20261010213947_network_private_notification_outbox.sql",
  "20261010214019_network_notification_membership_transition_keys.sql",
  "20261010214534_network_atomic_owner_verification_audit.sql",
  "20261010223033_network_checkout_attempt_reservation.sql",
  "20261010223315_network_checkout_finalize_reverify_owner.sql",
  "20261010223759_network_atomic_featured_revision_review.sql",
  "20261010224104_network_featured_draft_upload_quota.sql",
  "20261010224825_network_owner_fk_indexes.sql",
  "20261010224959_network_notification_delivery_claim_ledger.sql",
  "20261010225436_network_intake_complete_after_media_upload.sql",
  "20261010230319_network_owner_delete_unreferenced_drafts.sql",
  "20261010230653_network_atomic_listing_publication.sql",
  "20261010230712_network_publication_jsonb_key_count_fix.sql",
  "20261010231214_network_atomic_unpublish_moderation.sql",
  "20261010231400_network_featured_paid_entitlement_upload_revision_guard.sql",
  "20261010231443_network_featured_revision_private_entitlement_helper.sql",
  "20261010232130_network_entitlement_helpers_private_schema.sql",
  "20261010232506_network_readonly_stale_draft_cleanup_inventory.sql",
  "20261010235427_network_readonly_orphan_published_media_inventory.sql",
  "20261011000421_network_private_notification_trigger_execute_grants.sql"
];
let errors=0;
for (const filename of applied){
 const full=path.join(folder,filename);
 if(!existsSync(full)){console.error('Missing applied Network migration: '+filename);errors++;continue;}
 const body=readFileSync(full,'utf8');
 if(body.trim().length<50){console.error('Empty or incomplete migration: '+filename);errors++;}
}
const expected=new Set(applied);
const checkedIn=readdirSync(folder).filter(f=>/^202610\d{8}_.+network.*\.sql$/i.test(f)||/^202610\d{8}_.*governed_network.*\.sql$/i.test(f));
const unexpected=checkedIn.filter(f=>!expected.has(f));
if(unexpected.length){console.error('Network migrations lack manifest entries: '+unexpected.join(', '));errors+=unexpected.length;}
if(errors){console.error('Network migration history validation failed: '+errors+' issue(s)');process.exitCode=1;}
else console.log('PASS: all '+applied.length+' applied Network migrations are source-tracked; no unexpected October 10 migrations.');
