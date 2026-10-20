-- Recovered verbatim from supabase_migrations.schema_migrations on 2026-10-10.
-- Migration 20261010163334 was already applied to shared Supabase; source parity only.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('texasdefined-network-submissions','texasdefined-network-submissions',false,3000000,ARRAY['image/jpeg','image/png','image/webp']) on conflict (id) do nothing;
