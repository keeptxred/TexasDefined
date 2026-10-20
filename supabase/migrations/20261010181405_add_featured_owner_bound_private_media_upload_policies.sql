-- Recovered from the already-applied Supabase migration record on October 10–11, 2026.
-- Applied project migration version 20261010181405. This is source-history recovery only.
-- The filename lacks "network" but creates the Network Featured draft bucket and RLS policies.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('texasdefined-network-featured-drafts','texasdefined-network-featured-drafts',false,3000000,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=false,file_size_limit=3000000,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "Featured owners upload their own review media" on storage.objects;
create policy "Featured owners upload their own review media" on storage.objects
for insert to authenticated
with check (
 bucket_id='texasdefined-network-featured-drafts'
 and split_part(name,'/',1)=(select auth.uid())::text
 and exists(select 1 from public.texasdefined_network_business_accounts a
 where a.id::text=split_part(name,'/',2) and a.owner_user_id=(select auth.uid()) and a.access_enabled=true)
);
drop policy if exists "Featured owners read their draft media" on storage.objects;
create policy "Featured owners read their draft media" on storage.objects
for select to authenticated
using (
 bucket_id='texasdefined-network-featured-drafts'
 and split_part(name,'/',1)=(select auth.uid())::text
 and exists(select 1 from public.texasdefined_network_business_accounts a
 where a.id::text=split_part(name,'/',2) and a.owner_user_id=(select auth.uid()))
);
