create table if not exists public.texasdefined_brand_locations (
  id text primary key,
  brand_slug text not null check (brand_slug in ('heb','bucees')),
  brand_label text not null,
  banner text,
  location_number text,
  name text not null,
  street text not null,
  city text not null,
  county_slug text,
  state text not null default 'TX' check (state = 'TX'),
  postal_code text not null,
  latitude double precision,
  longitude double precision,
  official_url text,
  source_url text not null,
  source_checked_at date not null,
  status text not null default 'active' check (status in ('active','planned','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.texasdefined_brand_locations enable row level security;
revoke all on table public.texasdefined_brand_locations from anon, authenticated;
grant select on table public.texasdefined_brand_locations to service_role;

create index if not exists texasdefined_brand_locations_brand_status_idx
  on public.texasdefined_brand_locations (brand_slug, status);
create index if not exists texasdefined_brand_locations_city_idx
  on public.texasdefined_brand_locations (city);
create index if not exists texasdefined_brand_locations_county_idx
  on public.texasdefined_brand_locations (county_slug)
  where county_slug is not null;

insert into public.texasdefined_brand_locations
  (id, brand_slug, brand_label, banner, location_number, name, street, city, state, postal_code, source_url, source_checked_at, status)
values
  ('bucees-14','bucees','Buc-ee''s','Buc-ee''s','14','Buc-ee''s #14 — Alvin','780 Hwy-35 N Byp','Alvin','TX','77511','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-66','bucees','Buc-ee''s','Buc-ee''s','66','Buc-ee''s #66 — Amarillo','9900 East Interstate 40','Amarillo','TX','79118','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-13','bucees','Buc-ee''s','Buc-ee''s','13','Buc-ee''s #13 — Angleton','2299 E Mulberry St','Angleton','TX','77515','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-21','bucees','Buc-ee''s','Buc-ee''s','21','Buc-ee''s #21 — Angleton','931 Loop 274','Angleton','TX','77515','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-25','bucees','Buc-ee''s','Buc-ee''s','25','Buc-ee''s #25 — Angleton','2304 W Mulberry St','Angleton','TX','77515','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-28','bucees','Buc-ee''s','Buc-ee''s','28','Buc-ee''s #28 — Bastrop','1700 Highway 71 East','Bastrop','TX','78602','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-34','bucees','Buc-ee''s','Buc-ee''s','34','Buc-ee''s #34 — Baytown','4080 East Freeway','Baytown','TX','77521','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-3','bucees','Buc-ee''s','Buc-ee''s','3','Buc-ee''s #3 — Brazoria','801 N Brooks','Brazoria','TX','77422','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-32','bucees','Buc-ee''s','Buc-ee''s','32','Buc-ee''s #32 — Cypress','27106 US-290','Cypress','TX','77433','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-39','bucees','Buc-ee''s','Buc-ee''s','39','Buc-ee''s #39 — Denton','2800 S Interstate 35 E','Denton','TX','76210','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-24','bucees','Buc-ee''s','Buc-ee''s','24','Buc-ee''s #24 — Eagle Lake','505 E Main St','Eagle Lake','TX','77434','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-48','bucees','Buc-ee''s','Buc-ee''s','48','Buc-ee''s #48 — Ennis','1402 South IH-45','Ennis','TX','75119','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-37','bucees','Buc-ee''s','Buc-ee''s','37','Buc-ee''s #37 — Fort Worth','15901 N Freeway','Fort Worth','TX','76177','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-7','bucees','Buc-ee''s','Buc-ee''s','7','Buc-ee''s #7 — Freeport','4231 E. Hwy 332','Freeport','TX','77541','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-8','bucees','Buc-ee''s','Buc-ee''s','8','Buc-ee''s #8 — Freeport','1002 N Brazosport Blvd.','Freeport','TX','77541','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-16','bucees','Buc-ee''s','Buc-ee''s','16','Buc-ee''s #16 — Giddings','2375 E Austin St','Giddings','TX','78942','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-59','bucees','Buc-ee''s','Buc-ee''s','59','Buc-ee''s #59 — Hillsboro','165 State Highway 77','Hillsboro','TX','76645','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-40','bucees','Buc-ee''s','Buc-ee''s','40','Buc-ee''s #40 — Katy','27700 Katy Fwy','Katy','TX','77494','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-1','bucees','Buc-ee''s','Buc-ee''s','1','Buc-ee''s #1 — Lake Jackson','899 Oyster Creek Drive','Lake Jackson','TX','77566','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-2','bucees','Buc-ee''s','Buc-ee''s','2','Buc-ee''s #2 — Lake Jackson','101 N Hwy 2004','Lake Jackson','TX','77566','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-29','bucees','Buc-ee''s','Buc-ee''s','29','Buc-ee''s #29 — Lake Jackson','598 Hwy 332','Lake Jackson','TX','77566','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-23','bucees','Buc-ee''s','Buc-ee''s','23','Buc-ee''s #23 — League City','1702 League City Pkwy','League City','TX','77573','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-17','bucees','Buc-ee''s','Buc-ee''s','17','Buc-ee''s #17 — Luling','10070 West IH 10','Luling','TX','78648','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-26','bucees','Buc-ee''s','Buc-ee''s','26','Buc-ee''s #26 — Madisonville','205 IH-45 South','Madisonville','TX','77864','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-44','bucees','Buc-ee''s','Buc-ee''s','44','Buc-ee''s #44 — Melissa','1550 Central Texas Expressway','Melissa','TX','75454','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-22','bucees','Buc-ee''s','Buc-ee''s','22','Buc-ee''s #22 — New Braunfels','2760 IH 35 North','New Braunfels','TX','78130','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-19','bucees','Buc-ee''s','Buc-ee''s','19','Buc-ee''s #19 — Pearland','2541 S Main St','Pearland','TX','77584','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-20','bucees','Buc-ee''s','Buc-ee''s','20','Buc-ee''s #20 — Pearland','11151 Shadow Creek Pky','Pearland','TX','77584','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-31','bucees','Buc-ee''s','Buc-ee''s','31','Buc-ee''s #31 — Richmond','1243 Crabb River Rd','Richmond','TX','77469','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-38','bucees','Buc-ee''s','Buc-ee''s','38','Buc-ee''s #38 — Royse City','5005 E Interstate 30','Royse City','TX','75189','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-75','bucees','Buc-ee''s','Buc-ee''s','75','Buc-ee''s #75 — San Marcos','3245 N IH 35','San Marcos','TX','78666','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-35','bucees','Buc-ee''s','Buc-ee''s','35','Buc-ee''s #35 — Temple','4155 N General Bruce Dr.','Temple','TX','76501','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-36','bucees','Buc-ee''s','Buc-ee''s','36','Buc-ee''s #36 — Terrell','506 W. IH 20','Terrell','TX','75160','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-33','bucees','Buc-ee''s','Buc-ee''s','33','Buc-ee''s #33 — Texas City','6201 Gulf Fwy (IH 45)','Texas City','TX','77591','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-18','bucees','Buc-ee''s','Buc-ee''s','18','Buc-ee''s #18 — Waller','40900 US Hwy 290 Bypass','Waller','TX','77484','https://buc-ees.com/locations/','2026-09-06','active'),
  ('bucees-30','bucees','Buc-ee''s','Buc-ee''s','30','Buc-ee''s #30 — Wharton','10484 US 59 Road','Wharton','TX','77488','https://buc-ees.com/locations/','2026-09-06','active');
