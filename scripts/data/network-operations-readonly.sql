-- TexasDefined Network sole-admin operations health snapshot (READ ONLY).
-- Query only; never schedule writes/cleanup, reveal PII or enable features.
-- Does not certify live Graph delivery, Stripe provider integration, or migration deployment.
-- This intentionally queries the actual hosted RLS policy text and migration ledger.
WITH snapshot AS (
 SELECT
 (SELECT count(*)::bigint FROM public.texasdefined_network_applications) AS application_count,
 (SELECT count(*)::bigint FROM public.texasdefined_network_business_accounts) AS owner_account_count,
 (SELECT count(*)::bigint FROM public.texasdefined_network_profile_revisions) AS revision_count,
 (SELECT count(*)::bigint FROM public.texasdefined_network_public_listings WHERE is_published=true) AS published_count,
 (SELECT count(*)::bigint FROM public.texasdefined_network_email_outbox WHERE status='pending') AS notification_pending,
 (SELECT count(*)::bigint FROM public.texasdefined_network_email_outbox
  WHERE status='sending' AND claimed_at<now()-interval '15 minutes') AS notification_uncertain_claims,
 (SELECT count(*)::bigint FROM public.texasdefined_network_email_outbox
  WHERE status='pending' AND created_at<now()-interval '24 hours') AS notification_delayed,
 (SELECT count(*)::bigint FROM public.texasdefined_network_email_outbox
  WHERE status='failed') AS notification_failed,
 (SELECT count(*)::bigint FROM public.texasdefined_network_public_listings l
  JOIN public.texasdefined_network_applications a ON a.id=l.application_id
  WHERE l.is_published=true AND a.plan='plus' AND a.paid_entitlement_active IS DISTINCT FROM true) AS paid_listing_entitlement_drift,
 (SELECT count(*)::bigint FROM storage.objects
  WHERE bucket_id LIKE 'texasdefined-network%') AS network_storage_objects,
 (SELECT count(*)::bigint FROM storage.objects
  WHERE bucket_id='texasdefined-network-featured-drafts') AS featured_draft_objects,
 (SELECT count(*)::integer FROM supabase_migrations.schema_migrations
  WHERE version IN ('20261011183108','20261011183126','20261011183129','20261011183131')) AS applied_network_security_versions,
 (SELECT coalesce(bool_or(qual LIKE '%access_enabled%' AND qual LIKE '%membership_tier%'),false)
  FROM pg_policies WHERE schemaname='public'
   AND tablename='texasdefined_network_profile_revisions'
   AND policyname='network_owner_revisions_read' AND cmd='SELECT') AS owner_revision_revocation_policy_present,
 (SELECT count(*)::integer FROM pg_trigger
  WHERE tgrelid='storage.objects'::regclass AND NOT tgisinternal
   AND tgname IN ('network_featured_usage_after_insert',
    'network_featured_usage_after_delete','network_featured_usage_prevent_move')) AS atomic_storage_trigger_count,
 (SELECT to_regclass('texasdefined_network_internal.admin_action_audit') IS NOT NULL) AS sensitive_action_audit_table_present,
 (SELECT to_regclass('texasdefined_network_internal.notification_reconciliation_audit') IS NOT NULL) AS graph_reconciliation_audit_table_present
)
SELECT * FROM snapshot;
