-- Recovered verbatim from supabase_migrations.schema_migrations on 2026-10-10.
-- Migration 20261010180743 was already applied to shared Supabase; source parity only.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('texasdefined-network-published','texasdefined-network-published',true,3000000,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=3000000,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
