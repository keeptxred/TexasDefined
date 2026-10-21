-- Preserve two independently published Hunt CAD zero municipal levy figures.
-- The Comptroller's 2022 0.287248 record disagrees with Hunt CAD; it remains
-- untouched in the published normalized statewide table and calculators.
do $$
declare mismatch integer;
begin
  with expected(tax_year,official_id,source_status,source_total) as (
    values
      (2021,'116-111-03','not-reported',null::numeric),
      (2022,'116-111-03','reported-final',0.287248::numeric)
  )
  select count(*) into mismatch from expected e
  where not exists (
    select 1 from public.texas_property_tax_rates r
    where r.year=e.tax_year and r.type='city' and r.slug='city-of-union-valley'
      and e.official_id=any(r.official_taxing_unit_ids)
      and r.source_status=e.source_status
      and r.total_rate is not distinct from e.source_total
  );
  if mismatch<>0 then
    raise exception 'Union Valley source identity/status or previously published value has changed; do not apply local conflict automatically';
  end if;
end
$$;

insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,
   debt_service_rate,source_url,component_source_url,source_agency,verified_on,evidence_note,status)
values
  (2021,'city','city-of-union-valley','116-111-03',0.000000,null,null,
   'https://hunt-cad.org/wp-content/uploads/2022/01/2021-Tax-Rates.pdf',
   null,'Hunt County Appraisal District',date '2026-10-21',
   '2021 adopted Hunt CAD tax-rate table: CUV City of Union Valley (Quinlan ISD and Royse City ISD portions) municipal rate 0.000000. Other jurisdictions still levied property taxes.', 'verified'),
  (2022,'city','city-of-union-valley','116-111-03',0.000000,null,null,
   'https://hunt-cad.org/wp-content/uploads/2022/10/2022-Tax-Rates.pdf',
   null,'Hunt County Appraisal District',date '2026-10-21',
   '2022 Hunt CAD rate table reports CUV city municipal rate 0.000000 in both school-district portions, conflicting with the Comptroller 2022 city workbook 0.287248. Conflict is explicitly labeled, not silently resolved.', 'verified')
on conflict (tax_year,unit_type,slug) do nothing;
