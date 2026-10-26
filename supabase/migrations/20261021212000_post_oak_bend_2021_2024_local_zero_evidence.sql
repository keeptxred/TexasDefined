-- Historical zero city rates supported by primary year-specific evidence.
-- Keep the Comptroller's not-reported rows and calculator inputs unchanged.
do $$
declare failed_count integer;
begin
  with expected(tax_year,unit_id) as (
    values (2021,'129-110-03'),(2024,'129-110-03-129-129')
  )
  select count(*) into failed_count from expected e
  where not exists (
    select 1 from public.texas_property_tax_rates r
    where r.year=e.tax_year and r.type='city' and r.slug='post-oak-bend'
      and e.unit_id=any(r.official_taxing_unit_ids)
      and r.total_rate is null and r.source_status='not-reported'
  );
  if failed_count>0 then
    raise exception 'Post Oak Bend official year/type/taxing-unit-ID mismatch; no local supplement published';
  end if;
end
$$;

insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,
   maintenance_operations_rate,debt_service_rate,source_url,component_source_url,
   source_agency,verified_on,evidence_note,status)
values
  (2021,'city','post-oak-bend','129-110-03',0.000000,null,null,
   'https://kaufman-cad.org/wp-content/uploads/2021/07/2021-Certified-Totals.pdf',
   null,'Kaufman County Appraisal District',date '2026-10-21',
   '2021 certified totals CPO City of Post Oak Bend, grand totals page 211/588: approximate levy $0 from assessed $81,019,286 taxable value and a 0.000000 municipal rate. Other parcel levies are separate.', 'verified'),
  (2024,'city','post-oak-bend','129-110-03-129-129',0.000000,null,null,
   'https://www.postoakbend.org/Minutes%205-14-2024.pdf',
   'https://postoakbend.org/mayor/',
   'City of Post Oak Bend',date '2026-10-21',
   'May 14, 2024 council minutes describe a property tax as a future funding method, not an existing levy. City mayor statement confirms no city property-tax levy continued through 2025.', 'verified')
on conflict (tax_year,unit_type,slug) do nothing;
