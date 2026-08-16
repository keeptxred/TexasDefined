import type { CountyOfficeContact, CountyPropertyLinks } from '@/data/property/county-property-schema';

export type CountyPropertyEnrichment = {
  appraisalDistrict: Partial<CountyOfficeContact>;
  taxOffice: Partial<CountyOfficeContact>;
  links: Partial<CountyPropertyLinks>;
  lastVerifiedAt: string;
  sourceUrls: string[];
};

/**
 * Checked-in snapshot generated from the Texas Comptroller's Local Property
 * Appraisal and Tax Information directory. The sync script may replace this
 * file after re-verifying all county pages. Normal builds never depend on live
 * external requests.
 */
export const COUNTY_PROPERTY_ENRICHMENT: Record<string, CountyPropertyEnrichment> = {
  angelina: {
    appraisalDistrict: { name: 'Tim Chambers', websiteUrl: 'https://www.angelinacad.org', phone: '936-634-8456', address: '105 Miles Way, Ste. 300, Lufkin, TX 75901-5980', email: 'cdowns@angelinacad.org' },
    taxOffice: { name: 'Terri Collier', websiteUrl: 'https://www.angelinacounty.net', phone: '936-634-8376', address: '211 E. Shepherd Ave., Lufkin, TX 75901', email: 'taxoffice@angelinacounty.net' },
    links: { appraisalDistrictUrl: 'https://www.angelinacad.org', taxOfficeUrl: 'https://www.angelinacounty.net' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/angelina.php', 'https://www.angelinacad.org', 'https://www.angelinacounty.net'],
  },
  burleson: {
    appraisalDistrict: { name: 'Tonya Barnes', websiteUrl: 'https://www.burlesonappraisal.com', phone: '979-567-2318', address: '111 E. Fawn St., Caldwell, TX 77836-9998', email: 'public@burlesonappraisal.com' },
    taxOffice: { name: 'Jessica Lucero', websiteUrl: 'https://www.co.burleson.tx.us', phone: '979-567-2326', address: '100 W. Buck St., Suite 202, Caldwell, TX 77836-1762', email: 'jlucero@burlesoncounty.org' },
    links: { appraisalDistrictUrl: 'https://www.burlesonappraisal.com', taxOfficeUrl: 'https://www.co.burleson.tx.us' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/burleson.php', 'https://www.burlesonappraisal.com', 'https://www.co.burleson.tx.us'],
  },
  collingsworth: {
    appraisalDistrict: { name: 'Brittany Jameson', websiteUrl: 'https://www.collingsworthcad.org', phone: '806-447-5172', address: '800 West Ave., Rm. 1, Wellington, TX 79095-3037', email: 'bjameson@collingsworthcad.org' },
    taxOffice: { name: 'Sharon Sherwood', websiteUrl: 'https://www.co.collingsworth.tx.us', phone: '806-447-5606', address: '800 West Ave., Box 2, Wellington, TX 79095-3037', email: 'sharon.chism@co.collingsworth.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.collingsworthcad.org', taxOfficeUrl: 'https://www.co.collingsworth.tx.us' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/collingsworth.php', 'https://www.collingsworthcad.org', 'https://www.co.collingsworth.tx.us'],
  },
  cottle: {
    appraisalDistrict: { name: 'Kayla Box', websiteUrl: 'https://www.cottlecad.org', phone: '806-492-3345', address: '815 9th St., Room 104, Paducah, TX 79248-0587', email: 'kbox@cottlecad.org' },
    taxOffice: { name: 'Kayla Box', websiteUrl: 'https://www.co.cottle.tx.us', phone: '806-492-3345', address: '815 9th St., Paducah, TX 79248-0586', email: 'cottletac@co.cottle.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.cottlecad.org', taxOfficeUrl: 'https://www.co.cottle.tx.us' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/cottle.php', 'https://www.cottlecad.org', 'https://www.co.cottle.tx.us'],
  },
  fisher: {
    appraisalDistrict: { name: 'Gary Zeitler, Interim', websiteUrl: 'https://www.fishercad.org', phone: '325-776-2733', address: '107 E. North 1st St., Roby, TX 79543-2301', email: 'hbufkin@fishercad.org' },
    taxOffice: { name: 'Jonnye Lu Speck', websiteUrl: 'https://www.fishercounty.org', phone: '325-776-2181', address: '100 N. Concho St., Roby, TX 79543-2344', email: 'jonnye.speck@fishercounty.org' },
    links: { appraisalDistrictUrl: 'https://www.fishercad.org', taxOfficeUrl: 'https://www.fishercounty.org' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/fisher.php', 'https://www.fishercad.org', 'https://www.fishercounty.org'],
  },
  kendall: {
    appraisalDistrict: { name: 'Nelia Zapata', websiteUrl: 'https://www.kendallad.org', phone: '830-249-8012', address: '118 Market Ave., Boerne, TX 78006-3004', email: 'requestinfo@kendallad.org' },
    taxOffice: { name: 'James Hudson', websiteUrl: 'https://www.co.kendall.tx.us', phone: '830-249-9343', address: '201 E. San Antonio St., Suite 105, Boerne, TX 78006-2013', email: 'james.hudsontac@co.kendall.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.kendallad.org', taxOfficeUrl: 'https://www.co.kendall.tx.us' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/kendall.php', 'https://www.kendallad.org', 'https://www.co.kendall.tx.us'],
  },
  terrell: {
    appraisalDistrict: { name: 'Blain Chriesman', websiteUrl: 'https://www.terrellcad.org', phone: '432-345-2251', address: '302 N. 2nd St., Sanderson, TX 79848', email: 'tcad@terrell.esc18.net' },
    taxOffice: { name: 'Thad Cleveland', websiteUrl: 'https://www.co.terrell.tx.us', phone: '432-345-2499', address: '105 E. Hackberry St., Sanderson, TX 79848', email: 'thad.cleveland@co.terrell.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.terrellcad.org', taxOfficeUrl: 'https://www.co.terrell.tx.us' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/terrell.php', 'https://www.terrellcad.org', 'https://www.co.terrell.tx.us'],
  },
};
