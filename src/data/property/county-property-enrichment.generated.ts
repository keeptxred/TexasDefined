import type { CountyOfficeContact, CountyPropertyLinks } from '@/data/property/county-property-schema';

export type CountyPropertyEnrichment = {
  appraisalDistrict: Partial<CountyOfficeContact>;
  taxOffice: Partial<CountyOfficeContact>;
  links: Partial<CountyPropertyLinks>;
  sourceUpdatedAt: { appraisalDistrict: string; taxOffice: string };
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
  bell: {
    appraisalDistrict: { name: 'Billy White', websiteUrl: 'https://bellcad.org', phone: '254-939-5841', address: '411 E. Central Ave., Belton, TX 76513-3241', email: 'customerservice@bellcad.org' },
    taxOffice: { name: 'Shay Luedeke', websiteUrl: 'https://www.bellcountytx.com', phone: '254-933-5318', address: '550 E. 2nd Ave., Belton, TX 76513-3203', email: 'shay.luedeke@bellcounty.texas.gov' },
    links: { appraisalDistrictUrl: 'https://bellcad.org', taxOfficeUrl: 'https://www.bellcountytx.com', propertySearchUrl: 'https://esearch.bellcad.org/', paymentUrl: 'https://bellcad.org/pay-property-taxes/' },
    sourceUpdatedAt: { appraisalDistrict: '2026-08-21', taxOffice: '2025-03-03' },
    lastVerifiedAt: '2026-08-21',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bell.php', 'https://bellcad.org', 'https://esearch.bellcad.org/', 'https://bellcad.org/pay-property-taxes/', 'https://www.bellcountytx.com'],
  },
  bexar: {
    appraisalDistrict: { name: 'Rogelio Sandoval', websiteUrl: 'https://www.bcad.org', phone: '210-242-2432', address: '411 N. Frio St., San Antonio, TX 78207-4416', email: 'cacomms@bcad.org' },
    taxOffice: { name: 'Mr. Albert Uresti, MPA', websiteUrl: 'https://www.bexar.org/tax', phone: '210-335-2251', address: '233 N. Pecos La Trinidad, San Antonio, TX 78207-3175', email: 'taxoffice@bexar.org' },
    links: { appraisalDistrictUrl: 'https://www.bcad.org', taxOfficeUrl: 'https://www.bexar.org/tax' },
    sourceUpdatedAt: { appraisalDistrict: '2026-04-07', taxOffice: '2025-03-03' },
    lastVerifiedAt: '2026-08-21',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bexar.php', 'https://www.bcad.org', 'https://www.bexar.org/tax'],
  },
  comal: {
    appraisalDistrict: { name: 'Jeffrey Booker', websiteUrl: 'https://www.comalad.org', phone: '830-625-8597', address: '900 S. Seguin Ave., New Braunfels, TX 78130-7838', email: 'comalad@co.comal.tx.us' },
    taxOffice: { name: 'Kristen Hoyt', websiteUrl: 'https://www.co.comal.tx.us', phone: '830-221-1353', address: '205 N. Seguin Ave., New Braunfels, TX 78130-5005', email: 'cctax@co.comal.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.comalad.org', taxOfficeUrl: 'https://www.co.comal.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2025-11-24', taxOffice: '2025-03-13' },
    lastVerifiedAt: '2026-08-21',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/comal.php', 'https://www.comalad.org', 'https://www.co.comal.tx.us'],
  },
  denton: {
    appraisalDistrict: { name: 'Don Spencer', websiteUrl: 'https://www.dentoncad.com', phone: '940-349-3800', address: '3911 Morse St., Denton, TX 76208-6331', email: 'info@dentoncad.com' },
    taxOffice: { name: 'Dawn Waye', websiteUrl: 'https://www.dentoncounty.gov/778/Tax-Assessor-Collector', phone: '940-349-3500', address: '1505 E. McKinney St., Denton, TX 76209-4525', email: 'dawn.waye@dentoncounty.gov' },
    links: { appraisalDistrictUrl: 'https://www.dentoncad.com', taxOfficeUrl: 'https://www.dentoncounty.gov/778/Tax-Assessor-Collector' },
    sourceUpdatedAt: { appraisalDistrict: '2026-03-12', taxOffice: '2025-02-14' },
    lastVerifiedAt: '2026-08-21',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/denton.php', 'https://www.dentoncad.com', 'https://www.dentoncounty.gov/778/Tax-Assessor-Collector'],
  },
  travis: {
    appraisalDistrict: { name: 'Leana Mann', websiteUrl: 'https://www.traviscad.org', phone: '512-834-9317', address: '850 E. Anderson Ln., Austin, TX 78752', email: 'csinfo@tcadcentral.org' },
    taxOffice: { name: 'Celia Israel', websiteUrl: 'https://www.tax-office.traviscountytx.gov', phone: '512-854-9473', address: '2433 Ridgepoint Dr., Austin, TX 78754-5231', email: 'taxoffice@traviscountytx.gov' },
    links: { appraisalDistrictUrl: 'https://www.traviscad.org', taxOfficeUrl: 'https://www.tax-office.traviscountytx.gov' },
    sourceUpdatedAt: { appraisalDistrict: '2026-06-11', taxOffice: '2025-04-29' },
    lastVerifiedAt: '2026-08-21',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/travis.php', 'https://www.traviscad.org', 'https://www.tax-office.traviscountytx.gov'],
  },
  angelina: {
    appraisalDistrict: { name: 'Tim Chambers', websiteUrl: 'https://www.angelinacad.org', phone: '936-634-8456', address: '105 Miles Way, Ste. 300, Lufkin, TX 75901-5980', email: 'cdowns@angelinacad.org' },
    taxOffice: { name: 'Terri Collier', websiteUrl: 'https://www.angelinacounty.net', phone: '936-634-8376', address: '211 E. Shepherd Ave., Lufkin, TX 75901', email: 'taxoffice@angelinacounty.net' },
    links: { appraisalDistrictUrl: 'https://www.angelinacad.org', taxOfficeUrl: 'https://www.angelinacounty.net' },
    sourceUpdatedAt: { appraisalDistrict: '2026-05-05', taxOffice: '2025-03-03' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/angelina.php', 'https://www.angelinacad.org', 'https://www.angelinacounty.net'],
  },
  bee: {
    appraisalDistrict: { name: 'Deb Castaldo', websiteUrl: 'https://www.beecad.org', phone: '361-358-0193', address: '401 N. Washington St., Beeville, TX 78102-3911', email: 'bee@beecad.org' },
    taxOffice: { name: 'Michelle Matus', websiteUrl: 'https://www.co.bee.tx.us', phone: '361-621-1554', address: '411 E. Houston St., Beeville, TX 78102-4938', email: 'michelle.matus@beecounty.texas.gov' },
    links: { appraisalDistrictUrl: 'https://www.beecad.org', taxOfficeUrl: 'https://www.co.bee.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2026-05-05', taxOffice: '2025-03-03' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bee.php', 'https://www.beecad.org', 'https://www.co.bee.tx.us'],
  },
  collingsworth: {
    appraisalDistrict: { name: 'Brittany Jameson', websiteUrl: 'https://www.collingsworthcad.org', phone: '806-447-5172', address: '800 West Ave., Rm. 1, Wellington, TX 79095-3037', email: 'bjameson@collingsworthcad.org' },
    taxOffice: { name: 'Sharon Sherwood', websiteUrl: 'https://www.co.collingsworth.tx.us', phone: '806-447-5606', address: '800 West Ave., Box 2, Wellington, TX 79095-3037', email: 'sharon.chism@co.collingsworth.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.collingsworthcad.org', taxOfficeUrl: 'https://www.co.collingsworth.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2026-05-05', taxOffice: '2025-03-13' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/collingsworth.php', 'https://www.collingsworthcad.org', 'https://www.co.collingsworth.tx.us'],
  },
  fisher: {
    appraisalDistrict: { name: 'Gary Zeitler, Interim', websiteUrl: 'https://www.fishercad.org', phone: '325-776-2733', address: '107 E. North 1st St., Roby, TX 79543-2301', email: 'hbufkin@fishercad.org' },
    taxOffice: { name: 'Jonnye Lu Speck', websiteUrl: 'https://www.fishercounty.org', phone: '325-776-2181', address: '100 N. Concho St., Roby, TX 79543-2344', email: 'jonnye.speck@fishercounty.org' },
    links: { appraisalDistrictUrl: 'https://www.fishercad.org', taxOfficeUrl: 'https://www.fishercounty.org' },
    sourceUpdatedAt: { appraisalDistrict: '2025-04-09', taxOffice: '2025-03-25' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/fisher.php', 'https://www.fishercad.org', 'https://www.fishercounty.org'],
  },
  hays: {
    appraisalDistrict: { name: 'Laura Raven', websiteUrl: 'https://hayscad.com', phone: '512-268-2522', address: '21001 N. IH 35, Kyle, TX 78640-4795', email: 'info@hayscad.com' },
    taxOffice: { name: 'Jennifer Escobar', websiteUrl: 'https://www.hayscountytx.gov', phone: '512-393-5545', address: '712 S. Stagecoach Trail, San Marcos, TX 78666-6073', email: 'propertytax@hayscountytx.gov' },
    links: { appraisalDistrictUrl: 'https://hayscad.com', taxOfficeUrl: 'https://www.hayscountytx.gov' },
    sourceUpdatedAt: { appraisalDistrict: '2026-07-02', taxOffice: '2025-12-04' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hays.php', 'https://hayscad.com', 'https://www.hayscountytx.gov'],
  },
  hidalgo: {
    appraisalDistrict: { name: 'Rolando Garza', websiteUrl: 'https://www.hidalgoad.org', phone: '956-381-8466', address: '4405 S. Professional Dr., Edinburg, TX 78539-6556', email: 'cs@hidalgoad.org' },
    taxOffice: { name: 'Paul Villarreal Jr.', websiteUrl: 'https://www.hidalgocounty.us', phone: '956-318-2157', address: '2804 S. US Hwy. 281, Edinburg, TX 78539-6243', email: 'paul.villarreal@hidalgocountytax.org' },
    links: { appraisalDistrictUrl: 'https://www.hidalgoad.org', taxOfficeUrl: 'https://www.hidalgocounty.us' },
    sourceUpdatedAt: { appraisalDistrict: '2025-06-11', taxOffice: '2025-03-26' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hidalgo.php', 'https://www.hidalgoad.org', 'https://www.hidalgocounty.us'],
  },
  leon: {
    appraisalDistrict: { name: 'Marcus Williams', websiteUrl: 'https://www.leoncad.org', phone: '903-536-2252', address: '141 W. Saint Marys St., Centerville, TX 75833-3456', email: 'leoncentralappraisal@gmail.com' },
    taxOffice: { name: 'Victoria Willis', websiteUrl: 'https://www.co.leon.tx.us', phone: '903-536-2543', address: '155 N. Cass St., Centerville, TX 75833', email: 'victoria.willis@co.leon.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.leoncad.org', taxOfficeUrl: 'https://www.co.leon.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2025-08-13', taxOffice: '2025-04-16' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/leon.php', 'https://www.leoncad.org', 'https://www.co.leon.tx.us'],
  },
  lubbock: {
    appraisalDistrict: { name: 'Tim Radloff', websiteUrl: 'https://www.lubbockcad.org', phone: '806-762-5000', address: '2109 Avenue Q, Lubbock, TX 79411-1524', email: 'info@lubbockcad.org' },
    taxOffice: { name: 'Ronnie Keister', websiteUrl: 'https://www.lubbockcounty.gov', phone: '806-775-1344', address: '916 Main St., Suite 102, Lubbock, TX 79401-3412', email: 'taxoffice@lubbockcounty.gov' },
    links: { appraisalDistrictUrl: 'https://www.lubbockcad.org', taxOfficeUrl: 'https://www.lubbockcounty.gov' },
    sourceUpdatedAt: { appraisalDistrict: '2026-02-25', taxOffice: '2025-04-22' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/lubbock.php', 'https://www.lubbockcad.org', 'https://www.lubbockcounty.gov'],
  },
  sabine: {
    appraisalDistrict: { name: 'Tina Ford', websiteUrl: 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=SABINECAD', phone: '409-787-2777', address: '1920 Worth St., Hemphill, TX 75948-9998', email: 'sabinecad@windstream.net' },
    taxOffice: { name: 'Martha M. Stone', websiteUrl: 'https://www.co.sabine.tx.us', phone: '409-787-2257', address: '213 Market St., Hemphill, TX 75948', email: 'martha.stone@co.sabine.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=SABINECAD', taxOfficeUrl: 'https://www.co.sabine.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2026-05-06', taxOffice: '2025-02-19' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/sabine.php', 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=SABINECAD', 'https://www.co.sabine.tx.us'],
  },
  smith: {
    appraisalDistrict: { name: 'Carol McNeil', websiteUrl: 'https://www.smithcad.org', phone: '903-510-8600', address: '245 S. S.E. Loop 323, Tyler, TX 75702-6456', email: 'chiefappraiser@scad.org' },
    taxOffice: { name: 'Gary B. Barber', websiteUrl: 'https://www.smith-county.com', phone: '903-590-2920', address: '1517 W. Front St., Tyler, TX 75702-7822', email: 'taxoffice@smith-county.com' },
    links: { appraisalDistrictUrl: 'https://www.smithcad.org', taxOfficeUrl: 'https://www.smith-county.com' },
    sourceUpdatedAt: { appraisalDistrict: '2025-01-29', taxOffice: '2025-04-25' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/smith.php', 'https://www.smithcad.org', 'https://www.smith-county.com'],
  },
  terrell: {
    appraisalDistrict: { name: 'Blain Chriesman', websiteUrl: 'https://www.terrellcad.org', phone: '432-345-2251', address: '302 N. 2nd St., Sanderson, TX 79848', email: 'tcad@terrell.esc18.net' },
    taxOffice: { name: 'Thad Cleveland', websiteUrl: 'https://www.co.terrell.tx.us', phone: '432-345-2499', address: '105 E. Hackberry St., Sanderson, TX 79848', email: 'thad.cleveland@co.terrell.tx.us' },
    links: { appraisalDistrictUrl: 'https://www.terrellcad.org', taxOfficeUrl: 'https://www.co.terrell.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2025-01-30', taxOffice: '2025-04-28' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/terrell.php', 'https://www.terrellcad.org', 'https://www.co.terrell.tx.us'],
  },
  washington: {
    appraisalDistrict: { name: 'Dyann White', websiteUrl: 'https://www.washingtoncad.org', phone: '979-277-3740', address: '1301 Niebuhr St., Brenham, TX 77833-5031', email: 'wcad@brenhamk-12.net' },
    taxOffice: { name: 'Cheryl Gaskamp', websiteUrl: 'https://www.co.washington.tx.us', phone: '979-277-6200', address: '100 E. Main St., Suite 100, Brenham, TX 77833-3701', email: 'cgaskamp@washingtoncountytx.gov' },
    links: { appraisalDistrictUrl: 'https://www.washingtoncad.org', taxOfficeUrl: 'https://www.co.washington.tx.us' },
    sourceUpdatedAt: { appraisalDistrict: '2025-02-19', taxOffice: '2025-02-19' },
    lastVerifiedAt: '2026-08-16',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/washington.php', 'https://www.washingtoncad.org', 'https://www.co.washington.tx.us'],
  },
};
