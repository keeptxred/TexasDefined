-- 2025 primary-source rates absent from the Comptroller normalized data.
-- Public-facing history supplements only; calculator records remain unmodified.
do $$
declare mismatch_count integer;
begin
  with targets(slug,unit_type,official_id) as (
    values
      ('van-horn','city','055-101-03-055-055'),
      ('culberson-county','county','055-000-00-055-055'),
      ('post-oak-bend','city','129-110-03-129-129')
  )
  select count(*) into mismatch_count from targets t where not exists (
    select 1 from public.texas_property_tax_rates r
    where r.year=2025 and r.type=t.unit_type and r.slug=t.slug
      and t.official_id=any(r.official_taxing_unit_ids)
      and r.source_status='not-reported' and r.total_rate is null
  );
  if mismatch_count>0 then
    raise exception '2025 local supplement identity mismatch (% units); no data seeded',mismatch_count;
  end if;
end
$$;

insert into public.texas_tax_local_verified_rates
  (tax_year,unit_type,slug,official_unit_id,total_rate,maintenance_operations_rate,
   debt_service_rate,source_url,component_source_url,source_agency,verified_on,evidence_note,status)
values
  (2025,'city','van-horn','055-101-03-055-055',
   0.4921230,null,null,
   'https://culbersoncad.org/Forms/GetDocument?fileName=1777645674_Countywide+Tax+Rate+History.pdf&subPath=Data+Records',
   null,'Culberson County Appraisal District',date '2026-10-21',
   'Culberson CAD countywide 2021–2025 adopted rate history; Town of Van Horn 2025 = 0.4921230 per $100, component split not established.', 'verified'),
  (2025,'county','culberson-county','055-000-00-055-055',
   0.1330247,null,null,
   'https://culbersoncad.org/Forms/GetDocument?fileName=1777645674_Countywide+Tax+Rate+History.pdf&subPath=Data+Records',
   null,'Culberson County Appraisal District',date '2026-10-21',
   'Culberson CAD 2025 rate history: County general rate = 0.1330247; separate F&M rate = 0.0198770. Do not treat County rate as combined parcel levy.', 'verified'),
  (2025,'city','post-oak-bend','129-110-03-129-129',
   0.000000,null,null,
   'https://postoakbend.org/mayor/',
   null,'City of Post Oak Bend',date '2026-10-21',
   'Mayor serving from June 2025 confirms the city does not levy property tax and funds services from sales tax; zero city levy is not a zero total parcel bill.', 'verified')
on conflict (tax_year,unit_type,slug) do nothing;
