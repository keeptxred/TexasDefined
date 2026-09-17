-- Ground Texas Buc-ee's county identity from each stored location coordinate.
-- Source: U.S. Census Geocoder geographies/coordinates endpoint using
-- Public_AR_Current / Current_Current. Checked 2026-09-10.
--
-- This intentionally stores county identity on the verified location record so
-- Ask Texas does not infer a county from a city name. Texas cities can cross
-- county lines, so city-only inference is not authoritative for a store point.

with county_map(id, county_slug) as (
  values
    ('bucees-1', 'brazoria'),
    ('bucees-2', 'brazoria'),
    ('bucees-3', 'brazoria'),
    ('bucees-7', 'brazoria'),
    ('bucees-8', 'brazoria'),
    ('bucees-13', 'brazoria'),
    ('bucees-14', 'brazoria'),
    ('bucees-16', 'lee'),
    ('bucees-17', 'caldwell'),
    ('bucees-18', 'waller'),
    ('bucees-19', 'brazoria'),
    ('bucees-20', 'brazoria'),
    ('bucees-21', 'brazoria'),
    ('bucees-22', 'comal'),
    ('bucees-23', 'galveston'),
    ('bucees-24', 'colorado'),
    ('bucees-25', 'brazoria'),
    ('bucees-26', 'madison'),
    ('bucees-28', 'bastrop'),
    ('bucees-29', 'brazoria'),
    ('bucees-30', 'wharton'),
    ('bucees-31', 'fort-bend'),
    ('bucees-32', 'harris'),
    ('bucees-33', 'galveston'),
    ('bucees-34', 'harris'),
    ('bucees-35', 'bell'),
    ('bucees-36', 'kaufman'),
    ('bucees-37', 'denton'),
    ('bucees-38', 'hunt'),
    ('bucees-39', 'denton'),
    ('bucees-40', 'fort-bend'),
    ('bucees-44', 'collin'),
    ('bucees-48', 'ellis'),
    ('bucees-59', 'hill'),
    ('bucees-66', 'potter'),
    ('bucees-75', 'hays')
)
update public.texasdefined_brand_locations as location
set county_slug = county_map.county_slug,
    updated_at = now()
from county_map
where location.id = county_map.id
  and location.brand_slug = 'bucees'
  and location.state = 'TX';

do $$
begin
  if (
    select count(*)
    from public.texasdefined_brand_locations
    where brand_slug = 'bucees'
      and state = 'TX'
      and status = 'active'
      and public_locator_enabled = true
  ) <> 36 then
    raise exception 'Expected 36 active public Texas Buc-ee''s registry rows';
  end if;

  if exists (
    select 1
    from public.texasdefined_brand_locations
    where brand_slug = 'bucees'
      and state = 'TX'
      and status = 'active'
      and public_locator_enabled = true
      and county_slug is null
  ) then
    raise exception 'Active public Texas Buc-ee''s rows are missing Census-grounded county_slug';
  end if;
end
$$;