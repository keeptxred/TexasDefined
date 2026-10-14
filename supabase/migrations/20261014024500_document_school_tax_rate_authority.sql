comment on table public.texas_property_tax_rates is
  'Texas local taxing-unit rates reconciled from official statewide sources. County, city and special-district records use Texas Comptroller annual rate-and-levy workbooks. School-district M&O and I&S rates use Texas Education Agency school-finance authority data when supported, while Comptroller records provide taxing-unit IDs, county mappings, levies and an independent cross-check.';

comment on column public.texas_property_tax_rates.source_url is
  'Canonical rate-source URL for the stored record. School-district rows point to the TEA authority workbook when TEA reconciliation succeeds; other taxing-unit rows point to the Comptroller workbook.';

comment on column public.texas_property_tax_rates.source_status is
  'Source-verification state. reported-final school rows have passed TEA authority reconciliation; cross-source-conflict indicates the rate must not be treated as final.';
