revoke insert, delete, truncate, references, trigger, update on table public.texasdefined_brand_locations from service_role;
grant select on table public.texasdefined_brand_locations to service_role;
grant update (latitude, longitude, updated_at) on table public.texasdefined_brand_locations to service_role;
