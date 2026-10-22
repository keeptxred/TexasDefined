-- Source-qualified historical zero municipal levy for Poetry, not a statewide override.
-- Kaufman CAD 2023 certified totals, Town of Poetry (TP), published July 27 2023,
-- page 102 of 133: tax rate 0.000000 and approximate total levy $0.00.
do $$
begin
  if not exists (
    select 1 from public.texas_property_tax_rates
    where year=2023 and type='city' and slug='poetry'
      and '129-112-03'=any(official_taxing_unit_ids)
      and source_status='not-reported' and total_rate is null
  ) then
    raise exception 'Poetry 2023 normalized Comptroller identity or status changed; do not silently seed this evidence';
  end if;
end
$$;

insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,
   debt_service_rate,source_url,component_source_url,source_agency,
   verified_on,evidence_note,status)
values
  (2023,'city','poetry','129-112-03',0.000000,null,null,
   'https://kaufman-cad.org/wp-content/uploads/2023/07/2023-Certified-Totals-Partial-Exemption-List.pdf',
   null,'Kaufman County Appraisal District',date '2026-10-22',
   'Kaufman CAD 2023 certified totals page 102 of 133 (TP Town of Poetry): 378 accounts, taxable value $43,459,008, tax rate 0.000000 per $100 and approximate municipal levy $0.00. This is city tax only; other taxing units may levy taxes. The 2023 Comptroller record remains not-reported.',
   'verified')
on conflict (tax_year,unit_type,slug) do nothing;
