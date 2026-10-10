-- Applied to project ftkznprjljkhymknvhye as Supabase migration 20261010183442.
-- Browser callers may read only their own account, and submit immutable Featured revisions.
revoke all privileges on table public.texasdefined_network_business_accounts from authenticated;
grant select on table public.texasdefined_network_business_accounts to authenticated;
revoke all privileges on table public.texasdefined_network_profile_revisions from authenticated;
grant select, insert on table public.texasdefined_network_profile_revisions to authenticated;

drop policy if exists network_owner_revisions_submit on public.texasdefined_network_profile_revisions;
create policy network_owner_revisions_submit
on public.texasdefined_network_profile_revisions for insert to authenticated
with check (
  submitted_by = (select auth.uid()) and review_status = 'pending_review'
  and reviewed_at is null and reviewer_notes is null
  and jsonb_typeof(proposed_profile) = 'object'
  and (select count(*) from jsonb_object_keys(proposed_profile)) between 1 and 14
  and exists (
    select 1 from public.texasdefined_network_business_accounts b
    where b.id = business_account_id and b.owner_user_id = (select auth.uid())
      and b.access_enabled = true and b.membership_tier = 'featured'
  )
);

drop policy if exists "Featured owners upload their own review media" on storage.objects;
create policy "Featured owners upload their own review media"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'texasdefined-network-featured-drafts'
  and split_part(name, '/', 1) = (select auth.uid())::text
  and exists (
    select 1 from public.texasdefined_network_business_accounts b
    where b.id::text = split_part(storage.objects.name, '/', 2)
      and b.owner_user_id = (select auth.uid())
      and b.access_enabled = true and b.membership_tier = 'featured'
  )
);
