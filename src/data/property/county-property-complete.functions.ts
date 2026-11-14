import { createServerFn } from '@tanstack/react-start';
import type { CountyPropertyRecord } from './county-property-schema';

// The large official county directory is intentionally *server only*.
// Loading it into the shared knowledge-graph module adds tens of kilobytes
// to every visitor's initial client bundle. County tax pages and directory
// receive the complete verified source record through this server function.
// Unverified rows remain noindex under the existing county schema.
const loadCatalog = createServerFn({ method:'GET' }).handler(async (): Promise<CountyPropertyRecord[]> => {
  const [{COUNTY_PROPERTY_RECORDS}, {COUNTY_PROPERTY_SUPPLEMENT},
    {COUNTY_PROPERTY_LOCAL_VERIFICATION}] = await Promise.all([
      import('./county-property-data'),
      import('./county-property-supplement.server'),
      import('./county-property-local-verification'),
    ]);
  return COUNTY_PROPERTY_RECORDS.map((county) => {
    const extra = COUNTY_PROPERTY_SUPPLEMENT[county.slug];
    if (!extra) return county;
    // County-specific hand verification always wins over the older 2026-10-19
    // automated directory snapshot, consistent with the shared catalog.
    const local = COUNTY_PROPERTY_LOCAL_VERIFICATION[county.slug];
    return {
      ...county,
      appraisalDistrict:{...county.appraisalDistrict,...extra.appraisalDistrict,...(local?.appraisalDistrict??{})},
      taxOffice:{...county.taxOffice,...extra.taxOffice,...(local?.taxOffice??{})},
      links:{...county.links,...extra.links,...(local?.links??{})},
      sourceUpdatedAt:extra.sourceUpdatedAt,
      lastVerifiedAt:local?.lastVerifiedAt ?? extra.lastVerifiedAt ?? county.lastVerifiedAt,
      sourceUrls:[...new Set([...county.sourceUrls,...extra.sourceUrls,...(local?.sourceUrls??[])])],
    };
  });
});

export function getCompleteCountyPropertyRecords() {return loadCatalog();}
