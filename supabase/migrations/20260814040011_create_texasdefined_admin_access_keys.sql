create table if not exists public.texasdefined_admin_access_keys (
  key_name text primary key,
  key_hash text not null check (char_length(key_hash) = 64),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  rotated_at timestamptz not null default now()
);

alter table public.texasdefined_admin_access_keys enable row level security;

revoke all on table public.texasdefined_admin_access_keys from anon, authenticated;
grant all on table public.texasdefined_admin_access_keys to service_role;

comment on table public.texasdefined_admin_access_keys is 'Server-only hashed access keys for sensitive TexasDefined operator tools. No client-readable policies.';
