-- Four additional primary-source 2024 municipal supplements.
-- These are display-only; do not replace Comptroller records or calculator inputs.
-- Fail closed unless the 2024 source row has the expected official identity
-- and the Comptroller itself lists the rate as not reported.
do $$
declare
  missing_units integer;
begin
  with candidate(slug, official_id) as (
    values
      ('city-of-little-river-academy','014-113-03-014-014'),
      ('cooper','060-101-03-060-060'),
      ('miami','197-101-03-197-197'),
      ('stafford','079-105-03-079-079')
  )
  select count(*) into missing_units from candidate c
  where not exists (
    select 1 from public.texas_property_tax_rates r
    where r.year=2024 and r.type='city' and r.slug=c.slug
      and c.official_id=any(r.official_taxing_unit_ids)
      and r.source_status='not-reported' and r.total_rate is null
  );
  if missing_units<>0 then
    raise exception 'Cannot verify % local tax rows against 2024 Comptroller identity and status',missing_units;
  end if;
end
$$;

insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,
   maintenance_operations_rate,debt_service_rate,source_url,component_source_url,
   source_agency,verified_on,evidence_note,status)
values
  (2024,'city','city-of-little-river-academy','014-113-03-014-014',
   0.410001,0.410001,0.000000,
   'https://bellcad.org/wp-content/uploads/2024/11/2024_TAX_RATE_CHART-TLR.pdf',
   'https://bellcad.org/wp-content/uploads/2024/11/2024_TAX_RATE_CHART-TLR.pdf',
   'Bell County Appraisal District',date '2026-10-21',
   '2024 adopted tax-rate chart, jurisdiction TLR; $0.410001 M&O + $0.000000 I&S per $100.', 'verified'),
  (2024,'city','cooper','060-101-03-060-060',
   0.649272,0.627046,0.022226,
   'https://delta-cad.org/wp-content/uploads/2025/12/2024-Tax-Rates.pdf',
   'https://delta-cad.org/wp-content/uploads/2025/12/2024-Tax-Rates.pdf',
   'Delta County Appraisal District',date '2026-10-21',
   '2024 adopted taxing-entity list for Cooper City, M&O 0.627046 and I&S 0.022226.', 'verified'),
  (2024,'city','miami','197-101-03-197-197',
   0.870299,null,null,
   'https://www.co.roberts.tx.us/upload/page/9355/5%20year%20tax%20summary%202020-2024.pdf',
   null,'Roberts County Tax Assessor-Collector',date '2026-10-21',
   '2020–2024 official Truth in Taxation summary, City of Miami 2024 adopted total 0.870299; component split unverified.', 'verified'),
  (2024,'city','stafford','079-105-03-079-079',
   0.000000,null,null,
   'https://staffordtx.gov/479/Tax-Structure',
   null,'City of Stafford',date '2026-10-21',
   'City abolished municipal property tax in 1995 and states no current tax; its official 2024 city goals reaffirm zero property tax. Other jurisdictions still levy tax.', 'verified')
on conflict (tax_year,unit_type,slug) do nothing;
