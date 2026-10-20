import type { CountyOfficeContact, CountyPropertyLinks } from '@/data/property/county-property-schema';

export type CountyPropertyEnrichment = {
  appraisalDistrict: Partial<CountyOfficeContact>;
  taxOffice: Partial<CountyOfficeContact>;
  links: Partial<CountyPropertyLinks>;
  sourceUpdatedAt: { appraisalDistrict: string; taxOffice: string };
  lastVerifiedAt: string;
  sourceUrls: string[];
};

/** Generated from the Texas Comptroller county property-tax directory. */
export const COUNTY_PROPERTY_ENRICHMENT: Record<string, CountyPropertyEnrichment> = {
  anderson: {
    appraisalDistrict: {
      name: 'Quintin Baack',
      websiteUrl: 'https://www.andersoncad.net/',
      phone: '903-723-2949',
      address: '801 N. Perry St. Palestine, TX 75801-2547',
      email: 'qbaack@andersoncad.net'
    },
    taxOffice: {
      name: 'Tommy Cross',
      websiteUrl: 'https://www.andersoncountytx.gov/',
      phone: '903-723-7423',
      address: '703 N. Mallard St., Suite 104 Palestine, Texas 75801-2919',
      email: 'tgcross@co.anderson.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.andersoncad.net/',
      taxOfficeUrl: 'https://www.andersoncountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-24',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/anderson.php', 'https://www.andersoncad.net/', 'https://www.andersoncountytx.gov/']
  },
  angelina: {
    appraisalDistrict: {
      name: 'Tim Chambers',
      websiteUrl: 'https://www.angelinacad.org/',
      phone: '936-634-8456',
      address: '105 Miles Way, Ste. 300 Lufkin, TX 75901-5980',
      email: 'cdowns@angelinacad.org'
    },
    taxOffice: {
      name: 'Terri Collier',
      websiteUrl: 'https://www.angelinacounty.net/',
      phone: '936-634-8376',
      address: '211 E. Shepherd Ave. Lufkin, Texas 75901',
      email: 'taxoffice@angelinacounty.net'
    },
    links: {
      appraisalDistrictUrl: 'https://www.angelinacad.org/',
      taxOfficeUrl: 'https://www.angelinacounty.net/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/angelina.php', 'https://www.angelinacad.org/', 'https://www.angelinacounty.net/']
  },
  aransas: {
    appraisalDistrict: {
      name: 'Ray Presley',
      websiteUrl: 'https://aransascad.org/',
      phone: '361-729-9733',
      address: '11 Hwy 35 N Rockport, TX 78382-4140',
      email: 'aransascad@gmail.com'
    },
    taxOffice: {
      name: 'Anna Marshall',
      websiteUrl: 'https://www.aransascountytx.gov/main/',
      phone: '361-790-0160',
      address: '319 N. Church St. Rockport, Texas 78382-2715',
      email: 'taxac@aransascounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://aransascad.org/',
      taxOfficeUrl: 'https://www.aransascountytx.gov/main/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/aransas.php', 'https://aransascad.org/', 'https://www.aransascountytx.gov/main/']
  },
  bandera: {
    appraisalDistrict: {
      name: 'Maria Garcia',
      websiteUrl: 'https://bancad.org/',
      phone: '830-796-3039',
      address: '1206 Main St. Bandera, TX 78003-9998',
      email: 'info@bancad.org'
    },
    taxOffice: {
      name: 'Andrea Jankoski',
      websiteUrl: 'https://www.banderacounty.gov/',
      phone: '830-796-3731',
      address: '403 12th St. Bandera, Texas 78003',
      email: 'tax@banderacounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://bancad.org/',
      taxOfficeUrl: 'https://www.banderacounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bandera.php', 'https://bancad.org/', 'https://www.banderacounty.gov/']
  },
  bastrop: {
    appraisalDistrict: {
      name: 'Ms. Faun Cullens',
      websiteUrl: 'https://bastropcad.org/',
      phone: '512-303-1930',
      address: '212 Jackson St. Bastrop, TX 78602',
      email: 'publicinfo@bastropcad.org'
    },
    taxOffice: {
      name: 'Ms. Ellen Owens',
      websiteUrl: 'https://www.bastropcounty.gov/',
      phone: '512-581-7161',
      address: '211 Jackson St. Bastrop, Texas 78602',
      email: 'taxoffice@co.bastrop.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://bastropcad.org/',
      taxOfficeUrl: 'https://www.bastropcounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-24'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bastrop.php', 'https://bastropcad.org/', 'https://www.bastropcounty.gov/']
  },
  baylor: {
    appraisalDistrict: {
      name: 'Paula Kinsinger',
      websiteUrl: 'https://baylorcad.southwestdatasolutions.com/',
      phone: '940-888-5636',
      address: '211 N. Washington St. Seymour, TX 76380-2123',
      email: 'pvaden@sraccess.net'
    },
    taxOffice: {
      name: 'Jeanette Holub',
      websiteUrl: 'https://www.co.baylor.tx.us/',
      phone: '940-889-3169',
      address: '101 S. Washington St. Seymour, Texas 76380-2566',
      email: 'j.holub@co.baylor.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://baylorcad.southwestdatasolutions.com/',
      taxOfficeUrl: 'https://www.co.baylor.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-08-26',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/baylor.php', 'https://baylorcad.southwestdatasolutions.com/', 'https://www.co.baylor.tx.us/']
  },
  bexar: {
    appraisalDistrict: {
      name: 'Rogelio Sandoval',
      websiteUrl: 'https://bcad.org/',
      phone: '210-242-2432',
      address: '411 N. Frio St. San Antonio, TX 78207-4416',
      email: 'cacomms@bcad.org'
    },
    taxOffice: {
      name: 'Mr. Albert Uresti, MPA',
      websiteUrl: 'https://www.bexar.org/1515/Tax-Assessor-Collector',
      phone: '210-335-2251',
      address: '233 N. Pecos La Trinidad San Antonio, Texas 78207-3175',
      email: 'taxoffice@bexar.org'
    },
    links: {
      appraisalDistrictUrl: 'https://bcad.org/',
      taxOfficeUrl: 'https://www.bexar.org/1515/Tax-Assessor-Collector'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-20',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bexar.php', 'https://bcad.org/', 'https://www.bexar.org/1515/Tax-Assessor-Collector']
  },
  bosque: {
    appraisalDistrict: {
      name: 'Christopher Moser',
      websiteUrl: 'https://bosquecad.com/',
      phone: '254-435-2304',
      address: '9293 Hwy. 6 Meridian, TX 76665-0393',
      email: 'feedback@bosquecad.com'
    },
    taxOffice: {
      name: 'Arlene Swiney',
      websiteUrl: 'https://www.bosquecountytaxoffice.com/',
      phone: '254-435-2301',
      address: '102 W. Morgan St. Meridian, Texas 76665-2911',
      email: 'arlene_swiney@bosquecounty.us'
    },
    links: {
      appraisalDistrictUrl: 'https://bosquecad.com/',
      taxOfficeUrl: 'https://www.bosquecountytaxoffice.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/bosque.php', 'https://bosquecad.com/', 'https://www.bosquecountytaxoffice.com/']
  },
  brazoria: {
    appraisalDistrict: {
      name: 'Marcel Pierel, III',
      websiteUrl: 'https://brazoriacad.org/',
      phone: '979-849-7792',
      address: '500 N. Chenango St. Angleton, TX 77515-4650',
      email: 'help@brazoriacad.org'
    },
    taxOffice: {
      name: 'Kristin Bulanek',
      websiteUrl: 'https://www.brazoriacountytx.gov/',
      phone: '979-864-1320',
      address: '451 N. Velasco St. Angleton, Texas 77515',
      email: 'taxoffice@brazoriacountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://brazoriacad.org/',
      taxOfficeUrl: 'https://www.brazoriacountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-29',
      taxOffice: '2025-03-05'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/brazoria.php', 'https://brazoriacad.org/', 'https://www.brazoriacountytx.gov/']
  },
  brewster: {
    appraisalDistrict: {
      name: 'Bill Gonzalez, Interim',
      websiteUrl: 'https://brewstercotad.org/',
      phone: '432-837-2558',
      address: '1604 W. Hwy. 90 Alpine, TX 79830-4315',
      email: 'appraisaldistrict@brewstercotad.org'
    },
    taxOffice: {
      name: 'Sylvia Vega',
      websiteUrl: 'https://www.brewstercounty.gov/',
      phone: '432-837-2214',
      address: '107 W. Avenue E #1 Alpine, Texas 79830-4618',
      email: 'tax.assessor@co.brewster.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://brewstercotad.org/',
      taxOfficeUrl: 'https://www.brewstercounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/brewster.php', 'https://brewstercotad.org/', 'https://www.brewstercounty.gov/']
  },
  burnet: {
    appraisalDistrict: {
      name: 'Stan Hemphill',
      websiteUrl: 'https://burnet-cad.org/',
      phone: '512-756-8291',
      address: '223 S. Pierce St. Burnet, TX 78611-3112',
      email: 'info@burnetad.org'
    },
    taxOffice: {
      name: 'DeAnne Fisher',
      websiteUrl: 'https://www.burnetcountytexas.org/',
      phone: '512-756-5494',
      address: '1701 E. Polk St., Ste. 96 Burnet, Texas 78611-2757',
      email: 'bctac@burnetcountytexas.org'
    },
    links: {
      appraisalDistrictUrl: 'https://burnet-cad.org/',
      taxOfficeUrl: 'https://www.burnetcountytexas.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-06-23',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/burnet.php', 'https://burnet-cad.org/', 'https://www.burnetcountytexas.org/']
  },
  caldwell: {
    appraisalDistrict: {
      name: 'Shanna Ramzinski',
      websiteUrl: 'https://caldwellcad.org/',
      phone: '512-398-5550',
      address: '211 Bufkin Ln. Lockhart, TX 78644',
      email: 'publicinformation@caldwellcad.org'
    },
    taxOffice: {
      name: 'Debbie Sanders',
      websiteUrl: 'https://www.co.caldwell.tx.us/',
      phone: '512-398-1830',
      address: '110 S. Main St, Room 101 Lockhart, Texas 78644-2740',
      email: 'debbie.sanders@co.caldwell.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://caldwellcad.org/',
      taxOfficeUrl: 'https://www.co.caldwell.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-09-02',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/caldwell.php', 'https://caldwellcad.org/', 'https://www.co.caldwell.tx.us/']
  },
  cameron: {
    appraisalDistrict: {
      name: 'Richard Molina',
      websiteUrl: 'https://www.cameroncad.org/',
      phone: '956-399-9322',
      address: '2021 Amistad Dr. San Benito, TX 78586-2657',
      email: 'public@cameroncad.org'
    },
    taxOffice: {
      name: 'Eddie Garcia',
      websiteUrl: 'https://www.cameroncountytx.gov/',
      phone: '956-544-0800',
      address: '835 E. Levee St., 1st Floor Brownsville, Texas 78520-5101',
      email: 'tax_csr_team@co.cameron.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.cameroncad.org/',
      taxOfficeUrl: 'https://www.cameroncountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-07-14',
      taxOffice: '2025-03-03'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/cameron.php', 'https://www.cameroncad.org/', 'https://www.cameroncountytx.gov/']
  },
  camp: {
    appraisalDistrict: {
      name: 'Jan Tinsley',
      websiteUrl: 'https://campcad.org/',
      phone: '903-856-6538',
      address: '143 Quitman St. Pittsburg, TX 75686-1361',
      email: 'j.tinsley@campcad.org'
    },
    taxOffice: {
      name: 'Mary Huffman',
      websiteUrl: 'https://www.co.camp.tx.us/',
      phone: '903-856-3391',
      address: '115 Dr. M L King, Jr. Ave., Ste. B Pittsburg, Texas 75686-1399',
      email: 'missy.huffman@co.camp.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://campcad.org/',
      taxOfficeUrl: 'https://www.co.camp.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-03-05',
      taxOffice: '2025-03-05'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/camp.php', 'https://campcad.org/', 'https://www.co.camp.tx.us/']
  },
  carson: {
    appraisalDistrict: {
      name: 'Colter Asbill',
      websiteUrl: 'https://www.carsoncad.org/',
      phone: '806-537-3569',
      address: '102 Main St. Panhandle, TX 79068-9998',
      email: 'carsoncoappraisal@carsoncad.org'
    },
    taxOffice: {
      name: 'Ashley Montgomery',
      websiteUrl: 'https://www.carsoncountytax.org/',
      phone: '806-537-3412',
      address: '501 Main St. Panhandle, Texas 79068',
      email: 'taxoffice@co.carson.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.carsoncad.org/',
      taxOfficeUrl: 'https://www.carsoncountytax.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-20',
      taxOffice: '2025-02-21'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/carson.php', 'https://www.carsoncad.org/', 'https://www.carsoncountytax.org/']
  },
  cochran: {
    appraisalDistrict: {
      name: 'Greg Kelley, Interim',
      websiteUrl: 'https://cochrancad.com/',
      phone: '806-266-5584',
      address: '109 S.E. First St. Morton, TX 79346-3101',
      email: 'vgarza@cochrancad.com'
    },
    taxOffice: {
      name: 'Dixie Mendoza',
      websiteUrl: 'https://www.co.cochran.tx.us/',
      phone: '806-266-5171',
      address: '100 N. Main St., Rm. 101 Morton, Texas 79346-2517',
      email: 'cochrantax@co.cochran.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://cochrancad.com/',
      taxOfficeUrl: 'https://www.co.cochran.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-09-03',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/cochran.php', 'https://cochrancad.com/', 'https://www.co.cochran.tx.us/']
  },
  coke: {
    appraisalDistrict: {
      name: 'Dustin Vernor, Interim',
      websiteUrl: 'https://cokecad.org/',
      phone: '325-453-4528',
      address: '13 E. 7th St. Robert Lee, TX 76945',
      email: 'dustin.vernor@cokecad.org'
    },
    taxOffice: {
      name: 'Gina Williams',
      websiteUrl: 'https://www.co.coke.tx.us/',
      phone: '325-453-2614',
      address: '13 E. 7th St. Robert Lee, Texas 76945-5077',
      email: 'taxac@co.coke.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://cokecad.org/',
      taxOfficeUrl: 'https://www.co.coke.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/coke.php', 'https://cokecad.org/', 'https://www.co.coke.tx.us/']
  },
  collin: {
    appraisalDistrict: {
      name: 'Marty Wright',
      websiteUrl: 'https://collincad.org/',
      phone: '469-742-9200',
      address: '250 Eldorado Pkwy. McKinney, TX 75069-8023',
      email: 'marty.wright@cadcollin.org'
    },
    taxOffice: {
      name: 'Scott Grigg',
      websiteUrl: 'https://www.collincountytx.gov/',
      phone: '972-547-5020',
      address: '2300 Bloomdale Road McKinney, Texas 75071-8517',
      email: 'taxassessor@collincountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://collincad.org/',
      taxOfficeUrl: 'https://www.collincountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-15',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/collin.php', 'https://collincad.org/', 'https://www.collincountytx.gov/']
  },
  collingsworth: {
    appraisalDistrict: {
      name: 'Brittany Jameson',
      websiteUrl: 'https://www.collingsworthcad.org/',
      phone: '806-447-5172',
      address: '800 West Ave., Rm. 1 Wellington, TX 79095-3037',
      email: 'bjameson@collingsworthcad.org'
    },
    taxOffice: {
      name: 'Sharon Sherwood',
      websiteUrl: 'https://www.co.collingsworth.tx.us/',
      phone: '806-447-5606',
      address: '800 West Ave., Box 2 Wellington, Texas 79095-3037',
      email: 'sharon.chism@co.collingsworth.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.collingsworthcad.org/',
      taxOfficeUrl: 'https://www.co.collingsworth.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/collingsworth.php', 'https://www.collingsworthcad.org/', 'https://www.co.collingsworth.tx.us/']
  },
  comal: {
    appraisalDistrict: {
      name: 'Jeffrey Booker',
      websiteUrl: 'https://comalad.org/',
      phone: '830-625-8597',
      address: '900 S. Seguin Ave. New Braunfels, TX 78130-7838',
      email: 'comalad@co.comal.tx.us'
    },
    taxOffice: {
      name: 'Kristen Hoyt',
      websiteUrl: 'https://www.comalcounty.gov/',
      phone: '830-221-1353',
      address: '205 N. Seguin Ave. New Braunfels, Texas 78130-5005',
      email: 'cctax@co.comal.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://comalad.org/',
      taxOfficeUrl: 'https://www.comalcounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-09-25',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/comal.php', 'https://comalad.org/', 'https://www.comalcounty.gov/']
  },
  comanche: {
    appraisalDistrict: {
      name: 'Sandra Garcia',
      websiteUrl: 'https://comanchecad.org/',
      phone: '325-356-5253',
      address: '8 Huett Cir. Comanche, TX 76442-2049',
      email: 'info@comanchecad.org'
    },
    taxOffice: {
      name: 'Grace Everhart',
      websiteUrl: 'https://www.co.comanche.tx.us/',
      phone: '325-356-3101',
      address: '101 W. Central Ave., Ste. 109 Comanche, Texas 76442-3264',
      email: 'graceeverhart@co.comanche.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://comanchecad.org/',
      taxOfficeUrl: 'https://www.co.comanche.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/comanche.php', 'https://comanchecad.org/', 'https://www.co.comanche.tx.us/']
  },
  coryell: {
    appraisalDistrict: {
      name: 'Julie Zobel, Interim',
      websiteUrl: 'https://coryellcad.org/',
      phone: '254-865-6593',
      address: '705 E. Main St. Gatesville, TX 76528',
      email: 'juliez@coryellcad.org'
    },
    taxOffice: {
      name: 'Justin Carothers',
      websiteUrl: 'https://coryellcountytax.com/',
      phone: '254-248-3142',
      address: '800 E. Main St., Ste. B Gatesville, Texas 76528-1433',
      email: 'tac@coryelltax.com'
    },
    links: {
      appraisalDistrictUrl: 'https://coryellcad.org/',
      taxOfficeUrl: 'https://coryellcountytax.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-03-11',
      taxOffice: '2025-03-14'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/coryell.php', 'https://coryellcad.org/', 'https://coryellcountytax.com/']
  },
  culberson: {
    appraisalDistrict: {
      name: 'Maricel G. Gonzalez',
      websiteUrl: 'https://www.culbersoncad.org/',
      phone: '432-283-2977',
      address: '1800 W. Broadway St., Suite 318 Van Horn, TX 79855-9998',
      email: 'cgonzalez@culbersoncad.org'
    },
    taxOffice: {
      name: 'Aida Balcazar',
      websiteUrl: 'https://www.co.culberson.tx.us/',
      phone: '432-283-2130',
      address: '300 La Caverna St. Van Horn, Texas 79855',
      email: 'aida.balcazar@co.culberson.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.culbersoncad.org/',
      taxOfficeUrl: 'https://www.co.culberson.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-27',
      taxOffice: '2025-03-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/culberson.php', 'https://www.culbersoncad.org/', 'https://www.co.culberson.tx.us/']
  },
  dawson: {
    appraisalDistrict: {
      name: 'Norma J. Brock',
      websiteUrl: 'https://www.dawsoncad.org/',
      phone: '806-872-7060',
      address: '1806 Lubbock Hwy. Lamesa, TX 79331-3326',
      email: 'ca@dawsoncad.org'
    },
    taxOffice: {
      name: 'Yvonne Moreno',
      websiteUrl: 'https://www.co.dawson.tx.us/',
      phone: '806-872-7181',
      address: '502 N. 1st St. Lamesa, Texas 79331-5406',
      email: 'yvonne.moreno@co.dawson.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.dawsoncad.org/',
      taxOfficeUrl: 'https://www.co.dawson.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-04-24',
      taxOffice: '2025-03-24'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/dawson.php', 'https://www.dawsoncad.org/', 'https://www.co.dawson.tx.us/']
  },
  deaf-smith: {
    appraisalDistrict: {
      name: 'Mark Powers',
      websiteUrl: 'https://deafsmithcad.org/',
      phone: '806-364-0625',
      address: '140 E. 3rd St. Hereford, TX 79045-5597',
      email: 'mpowers@deafsmithcad.org'
    },
    taxOffice: {
      name: 'Gina Nunez',
      websiteUrl: 'https://www.co.deaf-smith.tx.us/',
      phone: '806-363-7044',
      address: '136 E. 3rd St. Hereford, Texas 79045-5514',
      email: 'taxoffice@deafsmithcounty.texas.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://deafsmithcad.org/',
      taxOfficeUrl: 'https://www.co.deaf-smith.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-24'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/deafsmith.php', 'https://deafsmithcad.org/', 'https://www.co.deaf-smith.tx.us/']
  },
  denton: {
    appraisalDistrict: {
      name: 'Don Spencer',
      websiteUrl: 'https://www.dentoncad.com/',
      phone: '940-349-3800',
      address: '3911 Morse St. Denton, TX 76208-6331',
      email: 'info@dentoncad.com'
    },
    taxOffice: {
      name: 'Dawn Waye',
      websiteUrl: 'https://www.dentoncounty.gov/778/Tax-Assessor-Collector',
      phone: '940-349-3500',
      address: '1505 E. McKinney St. Denton, Texas 76209-4525',
      email: 'dawn.waye@dentoncounty.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://www.dentoncad.com/',
      taxOfficeUrl: 'https://www.dentoncounty.gov/778/Tax-Assessor-Collector'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-09-25',
      taxOffice: '2025-02-14'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/denton.php', 'https://www.dentoncad.com/', 'https://www.dentoncounty.gov/778/Tax-Assessor-Collector']
  },
  eastland: {
    appraisalDistrict: {
      name: 'Randy Clark',
      websiteUrl: 'https://www.eastlandcad.org/',
      phone: '254-629-8597',
      address: '211 Inspiration Blvd. Eastland, TX 76448-5514',
      email: 'info@eastlandcad.org'
    },
    taxOffice: {
      name: 'Andrea May',
      websiteUrl: 'https://www.eastlandcounty.gov/',
      phone: '254-629-1564',
      address: '100 W. Main St., Ste. 101 Eastland, Texas 76448-2700',
      email: 'tax@eastlandcountytexas.com'
    },
    links: {
      appraisalDistrictUrl: 'https://www.eastlandcad.org/',
      taxOfficeUrl: 'https://www.eastlandcounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-11-24',
      taxOffice: '2025-11-24'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/eastland.php', 'https://www.eastlandcad.org/', 'https://www.eastlandcounty.gov/']
  },
  ellis: {
    appraisalDistrict: {
      name: 'Kathy Rodrigue',
      websiteUrl: 'https://www.elliscad.org/',
      phone: '972-937-3552',
      address: '400 Ferris Ave. Waxahachie, TX 75165-3302',
      email: 'ecad@elliscad.com'
    },
    taxOffice: {
      name: 'Richard Rozier',
      websiteUrl: 'https://ellistaxoffice.com/',
      phone: '972-825-5150',
      address: '302 N. Monroe St. Waxahachie, Texas 75165-3350',
      email: 'taxoffice@co.ellis.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.elliscad.org/',
      taxOfficeUrl: 'https://ellistaxoffice.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-06-11',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/ellis.php', 'https://www.elliscad.org/', 'https://ellistaxoffice.com/']
  },
  fayette: {
    appraisalDistrict: {
      name: 'Amanda Thibodeaux',
      websiteUrl: 'https://fayettecad.org/',
      phone: '979-968-8383',
      address: '111 S. Vail St. La Grange, TX 78945-2843',
      email: 'inquiries@fayettecadorg'
    },
    taxOffice: {
      name: 'Sylvia Mendoza',
      websiteUrl: 'https://www.co.fayette.tx.us/',
      phone: '979-968-3164',
      address: '143 N. Main St., Ste. B La Grange, Texas 78945-2610',
      email: 'tac@co.fayette.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://fayettecad.org/',
      taxOfficeUrl: 'https://www.co.fayette.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/fayette.php', 'https://fayettecad.org/', 'https://www.co.fayette.tx.us/']
  },
  fisher: {
    appraisalDistrict: {
      name: 'Gary Zeitler, Interim',
      websiteUrl: 'https://www.fishercad.org/',
      phone: '325-776-2733',
      address: '107 E. North 1st St. Roby, TX 79543-2301',
      email: 'hbufkin@fishercad.org'
    },
    taxOffice: {
      name: 'Jonnye Lu Speck',
      websiteUrl: 'https://www.fishercounty.org/',
      phone: '325-776-2181',
      address: '100 N. Concho St. Roby, Texas 79543-2344',
      email: 'jonnye.speck@fishercounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://www.fishercad.org/',
      taxOfficeUrl: 'https://www.fishercounty.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-04-09',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/fisher.php', 'https://www.fishercad.org/', 'https://www.fishercounty.org/']
  },
  foard: {
    appraisalDistrict: {
      name: 'Colter Asbill, Interim',
      websiteUrl: 'https://www.foardcad.org/',
      phone: '940-684-1225',
      address: '200 N. Main St. Crowell, TX 79227-9998',
      email: 'foardapp@yahoo.com'
    },
    taxOffice: {
      name: 'Perry Shaw',
      websiteUrl: 'https://www.foardcounty.texas.gov/',
      phone: '940-684-1501',
      address: '110 S. 1st. St. Crowell, Texas 79227',
      email: 'sheriff.shaw@foardcounty.texas.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://www.foardcad.org/',
      taxOfficeUrl: 'https://www.foardcounty.texas.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/foard.php', 'https://www.foardcad.org/', 'https://www.foardcounty.texas.gov/']
  },
  fort-bend: {
    appraisalDistrict: {
      name: 'Jordan Wise',
      websiteUrl: 'https://www.fbcad.org/',
      phone: '281-344-8623',
      address: '2801 B.F. Terry Blvd. Rosenberg, TX 77471-5600',
      email: 'info@fbcad.org'
    },
    taxOffice: {
      name: 'Carmen Turner',
      websiteUrl: 'https://www.fortbendcountytx.gov/',
      phone: '281-341-3710',
      address: '1317 Eugene Heimann Cir. Richmond, Texas 77469-3623',
      email: 'fbctaxinfo@fortbendcountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://www.fbcad.org/',
      taxOfficeUrl: 'https://www.fortbendcountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-09',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/fortbend.php', 'https://www.fbcad.org/', 'https://www.fortbendcountytx.gov/']
  },
  franklin: {
    appraisalDistrict: {
      name: 'Russell McCurdy',
      websiteUrl: 'https://www.franklin-cad.org/',
      phone: '903-537-2286',
      address: '310 W. Main St. Mount Vernon, TX 75457-2338',
      email: 'support@franklin-cad.org'
    },
    taxOffice: {
      name: 'Melissa McSwain Clawson',
      websiteUrl: 'https://www.co.franklin.tx.us/',
      phone: '903-537-2358',
      address: '208 State Highway 37 S. Mount Vernon, Texas 75457-3107',
      email: 'mmcswain@co.franklin.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.franklin-cad.org/',
      taxOfficeUrl: 'https://www.co.franklin.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-01-12',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/franklin.php', 'https://www.franklin-cad.org/', 'https://www.co.franklin.tx.us/']
  },
  garza: {
    appraisalDistrict: {
      name: 'Allisha Belongia',
      websiteUrl: 'https://garzacad.org/',
      phone: '806-495-3518',
      address: '124 E. Main St. Post, TX 79356-3230',
      email: 'chief@garzacad.org'
    },
    taxOffice: {
      name: 'Nancy Wallace',
      websiteUrl: 'https://www.garzacounty.gov/',
      phone: '806-495-4448',
      address: '300 W. Main St. Post, Texas 79356-3210',
      email: 'nancy.wallace@co.garza.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://garzacad.org/',
      taxOfficeUrl: 'https://www.garzacounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-27',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/garza.php', 'https://garzacad.org/', 'https://www.garzacounty.gov/']
  },
  grayson: {
    appraisalDistrict: {
      name: 'Shawn D. Coker',
      websiteUrl: 'https://graysonappraisal.org/',
      phone: '903-893-9673',
      address: '512 N. Travis St. Sherman, TX 75090',
      email: 'webmaster@graysonappraisal.org'
    },
    taxOffice: {
      name: 'Bruce Stidham',
      websiteUrl: 'https://www.co.grayson.tx.us/',
      phone: '903-892-8297',
      address: '100 W. Houston St. Sherman, Texas 75090-6019',
      email: 'stidhamb@co.grayson.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://graysonappraisal.org/',
      taxOfficeUrl: 'https://www.co.grayson.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-10-20',
      taxOffice: '2025-03-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/grayson.php', 'https://graysonappraisal.org/', 'https://www.co.grayson.tx.us/']
  },
  hardeman: {
    appraisalDistrict: {
      name: 'Richard Petree, Interim',
      websiteUrl: 'https://www.hardemancad.org/',
      phone: '940-663-2532',
      address: '403 S. Main St. Quanah, TX 79252-4017',
      email: 'hcad@qisd.net'
    },
    taxOffice: {
      name: 'Jan Evans',
      websiteUrl: 'https://www.co.hardeman.tx.us/',
      phone: '940-663-5221',
      address: '300 S. Main St. Quanah, Texas 79252-4016',
      email: 'hardemantax@co.hardeman.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.hardemancad.org/',
      taxOfficeUrl: 'https://www.co.hardeman.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hardeman.php', 'https://www.hardemancad.org/', 'https://www.co.hardeman.tx.us/']
  },
  hardin: {
    appraisalDistrict: {
      name: 'Karl Keller',
      websiteUrl: 'https://hardin-cad.org/',
      phone: '409-246-2507',
      address: '105 S. Pine St. Kountze, TX 77625-9998',
      email: 'office@hardin-cad.org'
    },
    taxOffice: {
      name: 'Steve Smith',
      websiteUrl: 'https://www.hardincountytx.gov/',
      phone: '409-246-5180',
      address: '300 W. Monroe St., Ste. B-101 Kountze, Texas 77625-5994',
      email: 'steve.smith@co.hardin.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://hardin-cad.org/',
      taxOfficeUrl: 'https://www.hardincountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-05',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hardin.php', 'https://hardin-cad.org/', 'https://www.hardincountytx.gov/']
  },
  harris: {
    appraisalDistrict: {
      name: 'Adam Bogard',
      websiteUrl: 'https://hcad.org/',
      phone: '713-957-7800',
      address: '13013 Northwest Frwy. Houston, TX 77040-6305',
      email: 'tlorecords@hcad.org'
    },
    taxOffice: {
      name: 'Annette Ramirez',
      websiteUrl: 'https://www.hctax.net/',
      phone: '713-274-8000',
      address: '1001 Preston St. Houston, Texas 77002-1816',
      email: 'tax.office@hctx.net'
    },
    links: {
      appraisalDistrictUrl: 'https://hcad.org/',
      taxOfficeUrl: 'https://www.hctax.net/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-09-25',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/harris.php', 'https://hcad.org/', 'https://www.hctax.net/']
  },
  hays: {
    appraisalDistrict: {
      name: 'Laura Raven',
      websiteUrl: 'https://hayscad.com/',
      phone: '512-268-2522',
      address: '21001 N. IH 35 Kyle, TX 78640-4795',
      email: 'info@hayscad.com'
    },
    taxOffice: {
      name: 'Jennifer Escobar',
      websiteUrl: 'https://www.hayscountytx.gov/',
      phone: '512-393-5545',
      address: '712 S. Stagecoach Trail San Marcos, Texas 78666-6073',
      email: 'propertytax@hayscountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://hayscad.com/',
      taxOfficeUrl: 'https://www.hayscountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-02',
      taxOffice: '2025-12-04'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hays.php', 'https://hayscad.com/', 'https://www.hayscountytx.gov/']
  },
  henderson: {
    appraisalDistrict: {
      name: 'Bill Jackson',
      websiteUrl: 'https://henderson-cad.org/',
      phone: '903-675-9296',
      address: '1751 Enterprise St. Athens, TX 75751-8827',
      email: 'hendersoncad@hcadtx.org'
    },
    taxOffice: {
      name: 'Peggy Goodall',
      websiteUrl: 'https://www.henderson-county.com/',
      phone: '903-675-6134',
      address: '125 N. Prairieville St., Suite 103 Athens, Texas 75751-2070',
      email: 'pgoodall@henderson-county.com'
    },
    links: {
      appraisalDistrictUrl: 'https://henderson-cad.org/',
      taxOfficeUrl: 'https://www.henderson-county.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-27',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/henderson.php', 'https://henderson-cad.org/', 'https://www.henderson-county.com/']
  },
  hidalgo: {
    appraisalDistrict: {
      name: 'Rolando Garza',
      websiteUrl: 'https://www.hidalgoad.org/',
      phone: '956-381-8466',
      address: '4405 S. Professional Dr. Edinburg, TX 78539-6556',
      email: 'cs@hidalgoad.org'
    },
    taxOffice: {
      name: 'Paul Villarreal Jr.',
      websiteUrl: 'https://www.hidalgocounty.us/',
      phone: '956-318-2157',
      address: '2804 S. US Hwy. 281 Edinburg, Texas 78539-6243',
      email: 'paul.villarreal@hidalgocountytax.org'
    },
    links: {
      appraisalDistrictUrl: 'https://www.hidalgoad.org/',
      taxOfficeUrl: 'https://www.hidalgocounty.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-06-11',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hidalgo.php', 'https://www.hidalgoad.org/', 'https://www.hidalgocounty.us/']
  },
  hill: {
    appraisalDistrict: {
      name: 'Mike McKibben',
      websiteUrl: 'https://hillcad.org/',
      phone: '254-582-2508',
      address: '1407 Abbott Ave. Hillsboro, TX 76645-2872',
      email: 'hcad@hillcad.org'
    },
    taxOffice: {
      name: 'Krystal Hightower',
      websiteUrl: 'https://www.hilltax.org/',
      phone: '254-582-4000',
      address: '126 S. Covington St. Hillsboro, Texas 76645',
      email: 'khightower@co.hill.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://hillcad.org/',
      taxOfficeUrl: 'https://www.hilltax.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-03-04',
      taxOffice: '2026-07-09'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hill.php', 'https://hillcad.org/', 'https://www.hilltax.org/']
  },
  hood: {
    appraisalDistrict: {
      name: 'Jeff Law',
      websiteUrl: 'https://hoodcad.net/',
      phone: '817-573-2471',
      address: '1902 W. Pearl St. Granbury, TX 76048-1873',
      email: 'hoodapp@hoodcad.net'
    },
    taxOffice: {
      name: 'Andrea Ferguson',
      websiteUrl: 'https://www.hoodcounty.texas.gov/',
      phone: '817-579-3295',
      address: '1410 W. Pearl St. Granbury, Texas 76048-1826',
      email: 'aferguson@hoodcounty.texas.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://hoodcad.net/',
      taxOfficeUrl: 'https://www.hoodcounty.texas.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-09-18',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hood.php', 'https://hoodcad.net/', 'https://www.hoodcounty.texas.gov/']
  },
  hutchinson: {
    appraisalDistrict: {
      name: 'John Gillman',
      websiteUrl: 'https://www.hutchinsoncad.org/',
      phone: '806-274-2294',
      address: '920 Illinois Ave. Borger, TX 79007-6112',
      email: 'hcad@hutchinsoncad.com'
    },
    taxOffice: {
      name: 'Carrie Kimmell',
      websiteUrl: 'https://www.co.hutchinson.tx.us/',
      phone: '806-878-4005',
      address: '515 S. Main St., Ste. 201 Stinnett, Texas 79083',
      email: 'ckimmell@hutchinsoncnty.com'
    },
    links: {
      appraisalDistrictUrl: 'https://www.hutchinsoncad.org/',
      taxOfficeUrl: 'https://www.co.hutchinson.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-14',
      taxOffice: '2025-02-14'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/hutchinson.php', 'https://www.hutchinsoncad.org/', 'https://www.co.hutchinson.tx.us/']
  },
  jack: {
    appraisalDistrict: {
      name: 'Nichole Rose',
      websiteUrl: 'https://www.jackcad.org/',
      phone: '940-567-6301',
      address: '210 N. Church St. Jacksboro, TX 76458-1805',
      email: 'jackcad119@jackcad.org'
    },
    taxOffice: {
      name: 'Trasi Ogle',
      websiteUrl: 'https://www.jackcounty.org/',
      phone: '940-567-2352',
      address: '100 N. Main St., Suite 209 Jacksboro, Texas 76458-1746',
      email: 'tac@jackcounty.texas.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://www.jackcad.org/',
      taxOfficeUrl: 'https://www.jackcounty.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-04',
      taxOffice: '2025-03-26'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/jack.php', 'https://www.jackcad.org/', 'https://www.jackcounty.org/']
  },
  jim-hogg: {
    appraisalDistrict: {
      name: 'Celina Sauceda',
      websiteUrl: 'https://jimhogg-cad.org/',
      phone: '361-527-4033',
      address: '515 W. Viggie St. Hebbronville, TX 78361-3062',
      email: 'csauceda@jimhogg-cad.org'
    },
    taxOffice: {
      name: 'Norma Liza S. Hinojosa',
      websiteUrl: 'https://www.jimhoggcountytax.org/',
      phone: '361-527-3237',
      address: '205 E. Tilley St. Hebbronville, Texas 78361-3523',
      email: 'norma.l.hinojosa@co.jim-hogg.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://jimhogg-cad.org/',
      taxOfficeUrl: 'https://www.jimhoggcountytax.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-24',
      taxOffice: '2025-04-15'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/jimhogg.php', 'https://jimhogg-cad.org/', 'https://www.jimhoggcountytax.org/']
  },
  johnson: {
    appraisalDistrict: {
      name: 'Mitch Fast',
      websiteUrl: 'https://johnsoncad.com/',
      phone: '817-648-3000',
      address: '109 N. Main St. Cleburne, TX 76033-4941',
      email: 'customerservice@johnsoncad.net'
    },
    taxOffice: {
      name: 'Scott Porter',
      websiteUrl: 'https://www.johnsoncountytaxoffice.org/',
      phone: '817-558-0122',
      address: '2 N. Mill St. Cleburne, Texas 76033',
      email: 'propertytax@johnsoncountytx.org'
    },
    links: {
      appraisalDistrictUrl: 'https://johnsoncad.com/',
      taxOfficeUrl: 'https://www.johnsoncountytaxoffice.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-10-06',
      taxOffice: '2025-04-15'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/johnson.php', 'https://johnsoncad.com/', 'https://www.johnsoncountytaxoffice.org/']
  },
  kaufman: {
    appraisalDistrict: {
      name: 'Sarah Curtis',
      websiteUrl: 'https://kaufman-cad.org/',
      phone: '972-932-6081',
      address: '3950 S. Houston St. Kaufman, TX 75142-3718',
      email: 'kcad@kaufman-cad.org'
    },
    taxOffice: {
      name: 'Teressa Floyd',
      websiteUrl: 'https://www.kaufmancounty.net/247/Tax-Assessor',
      phone: '469-376-4596',
      address: '100 N. Washington St. Kaufman, Texas 75142-2051',
      email: 'teressa.floyd@kaufmancounty.net'
    },
    links: {
      appraisalDistrictUrl: 'https://kaufman-cad.org/',
      taxOfficeUrl: 'https://www.kaufmancounty.net/247/Tax-Assessor'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-06',
      taxOffice: '2025-04-15'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/kaufman.php', 'https://kaufman-cad.org/', 'https://www.kaufmancounty.net/247/Tax-Assessor']
  },
  kimble: {
    appraisalDistrict: {
      name: 'Kenda McPherson',
      websiteUrl: 'https://kimblecad.org/',
      phone: '325-446-3717',
      address: '509 College St. Junction, TX 76849',
      email: 'kcad@kimblecad.org'
    },
    taxOffice: {
      name: 'Matthew Suttle',
      websiteUrl: 'https://www.co.kimble.tx.us/',
      phone: '325-446-3717',
      address: '509 College St. Junction, Texas 76849',
      email: 'matt.suttle@co.kimble.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://kimblecad.org/',
      taxOfficeUrl: 'https://www.co.kimble.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-27',
      taxOffice: '2025-04-15'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/kimble.php', 'https://kimblecad.org/', 'https://www.co.kimble.tx.us/']
  },
  kleberg: {
    appraisalDistrict: {
      name: 'Marlene Perez',
      websiteUrl: 'https://kleberg-cad.org/',
      phone: '361-595-5775',
      address: '502 E. Kleberg St. Kingsville, TX 78363-9998',
      email: 'marlenep0623@sbcglobal.net'
    },
    taxOffice: {
      name: 'Maria Valadez',
      websiteUrl: 'https://www.co.kleberg.tx.us/',
      phone: '361-595-8542',
      address: '700 E. Kleberg Ave. Kingsville, Texas 78363-4652',
      email: 'vvaladez@co.kleberg.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://kleberg-cad.org/',
      taxOfficeUrl: 'https://www.co.kleberg.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-02-02',
      taxOffice: '2025-04-15'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/kleberg.php', 'https://kleberg-cad.org/', 'https://www.co.kleberg.tx.us/']
  },
  lamb: {
    appraisalDistrict: {
      name: 'Lesa Kloiber',
      websiteUrl: 'https://lambcad.org/',
      phone: '806-385-6474',
      address: '1500 E. Delano Ave. Littlefield, TX 79339-4207',
      email: 'lambcad@lambcad.org'
    },
    taxOffice: {
      name: 'Tammy Kirkland',
      websiteUrl: 'https://www.co.lamb.tx.us/',
      phone: '806-485-0062',
      address: '100 6th Drive, Room 105, Courthouse Littlefield, Texas 79339-3366',
      email: 'tjkirkland@co.lamb.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://lambcad.org/',
      taxOfficeUrl: 'https://www.co.lamb.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-27',
      taxOffice: '2025-04-22'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/lamb.php', 'https://lambcad.org/', 'https://www.co.lamb.tx.us/']
  },
  lampasas: {
    appraisalDistrict: {
      name: 'Juan Saucedo',
      websiteUrl: 'https://lampasascad.com/',
      phone: '512-556-8058',
      address: '109 E. 5th St. Lampasas, TX 76550-3276',
      email: 'info@lampasascad.com'
    },
    taxOffice: {
      name: 'Betty Salinas',
      websiteUrl: 'https://www.co.lampasas.tx.us/',
      phone: '512-556-8271',
      address: '409 S. Pecan St., Ste. 101 Lampasas, Texas 76550-2946',
      email: 'bsalinas@co.lampasas.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://lampasascad.com/',
      taxOfficeUrl: 'https://www.co.lampasas.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-28',
      taxOffice: '2025-04-16'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/lampasas.php', 'https://lampasascad.com/', 'https://www.co.lampasas.tx.us/']
  },
  leon: {
    appraisalDistrict: {
      name: 'Marcus Williams',
      websiteUrl: 'https://www.leoncad.org/',
      phone: '903-536-2252',
      address: '141 W. Saint Marys St. Centerville, TX 75833-3456',
      email: 'leoncentralappraisal@gmail.com'
    },
    taxOffice: {
      name: 'Victoria Willis',
      websiteUrl: 'https://www.co.leon.tx.us/',
      phone: '903-536-2543',
      address: '155 N. Cass St. Centerville, Texas 75833',
      email: 'victoria.willis@co.leon.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.leoncad.org/',
      taxOfficeUrl: 'https://www.co.leon.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-08-13',
      taxOffice: '2025-04-16'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/leon.php', 'https://www.leoncad.org/', 'https://www.co.leon.tx.us/']
  },
  liberty: {
    appraisalDistrict: {
      name: 'Lana McCarty',
      websiteUrl: 'https://libertycad.com/',
      phone: '936-336-5722',
      address: '2030 Sam Houston Liberty, TX 77575-4818',
      email: 'lramirez@libertycad.com'
    },
    taxOffice: {
      name: 'Richard L. Brown',
      websiteUrl: 'https://www.co.liberty.tx.us/',
      phone: '936-336-4633',
      address: '3210 Hwy. 90 Liberty, Texas 77575',
      email: 'richard.brown@co.liberty.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://libertycad.com/',
      taxOfficeUrl: 'https://www.co.liberty.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-07-14',
      taxOffice: '2025-05-17'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/liberty.php', 'https://libertycad.com/', 'https://www.co.liberty.tx.us/']
  },
  loving: {
    appraisalDistrict: {
      name: 'Alicia McGehee',
      websiteUrl: 'https://www.lovingcad.org/',
      phone: '432-377-2201',
      address: '114 W. Collins Ave. Mentone, TX 79754',
      email: 'cadclerk@co.loving.tx.us'
    },
    taxOffice: {
      name: 'David Landersman',
      websiteUrl: 'https://www.co.loving.tx.us/',
      phone: '432-309-9292',
      address: '114 W. Collins Ave. Mentone, Texas 79754',
      email: 'david.landersman@co.loving.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.lovingcad.org/',
      taxOfficeUrl: 'https://www.co.loving.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-06',
      taxOffice: '2025-04-17'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/loving.php', 'https://www.lovingcad.org/', 'https://www.co.loving.tx.us/']
  },
  lynn: {
    appraisalDistrict: {
      name: 'Jason Cross',
      websiteUrl: 'https://www.lynncad.org/Home/UserLockedOut',
      phone: '806-561-5477',
      address: '1615 Main St. Tahoka, TX 79373-9998',
      email: 'info@lynncad.org'
    },
    taxOffice: {
      name: 'Kathy Grant',
      websiteUrl: 'https://www.co.lynn.tx.us/',
      phone: '806-561-4112',
      address: '1521 Avenue J Tahoka, Texas 79373',
      email: 'lynncotac@co.lynn.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.lynncad.org/Home/UserLockedOut',
      taxOfficeUrl: 'https://www.co.lynn.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-08-13',
      taxOffice: '2025-04-17'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/lynn.php', 'https://www.lynncad.org/Home/UserLockedOut', 'https://www.co.lynn.tx.us/']
  },
  matagorda: {
    appraisalDistrict: {
      name: 'Katharine McGee',
      websiteUrl: 'https://matagorda-cad.org/',
      phone: '979-244-2031',
      address: '2225 Avenue G Bay City, TX 77414-5018',
      email: 'mcad@matagorda-cad.org'
    },
    taxOffice: {
      name: 'Becky Cook',
      websiteUrl: 'https://www.matagordatx.gov/',
      phone: '979-789-5100',
      address: '1801 7th St. Bay City, Texas 77414-5091',
      email: 'bcook@co.matagorda.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://matagorda-cad.org/',
      taxOfficeUrl: 'https://www.matagordatx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-09-18',
      taxOffice: '2025-02-18'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/matagorda.php', 'https://matagorda-cad.org/', 'https://www.matagordatx.gov/']
  },
  mcculloch: {
    appraisalDistrict: {
      name: 'Zane Brandenberger',
      websiteUrl: 'https://www.mccullochcad.org/',
      phone: '325-597-1627',
      address: '306 W. Lockhart St. Brady, TX 76825-4113',
      email: 'info@mccullochcad.org'
    },
    taxOffice: {
      name: 'Silvia Campos',
      websiteUrl: 'https://www.co.mcculloch.tx.us/',
      phone: '325-597-7607',
      address: '302 W. Commerce St. Brady, Texas 76825-4402',
      email: 'scampos@co.mcculloch.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.mccullochcad.org/',
      taxOfficeUrl: 'https://www.co.mcculloch.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-28',
      taxOffice: '2025-04-22'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/mcculloch.php', 'https://www.mccullochcad.org/', 'https://www.co.mcculloch.tx.us/']
  },
  mcmullen: {
    appraisalDistrict: {
      name: 'Blaine Patterson',
      websiteUrl: 'https://mcmullencad.org/',
      phone: '361-274-3638',
      address: '207 Ash St. Tilden, TX 78072-9998',
      email: 'blaine.patterson@mcmullencounty.org'
    },
    taxOffice: {
      name: 'Bessilia Guerrero',
      websiteUrl: 'https://mcmullencounty.org/county-tax-assessorcollector/',
      phone: '361-274-3314',
      address: '501 River St. Tilden, Texas 78072',
      email: 'bessie.guerrero@mcmullencounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://mcmullencad.org/',
      taxOfficeUrl: 'https://mcmullencounty.org/county-tax-assessorcollector/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-18',
      taxOffice: '2025-02-21'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/mcmullen.php', 'https://mcmullencad.org/', 'https://mcmullencounty.org/county-tax-assessorcollector/']
  },
  midland: {
    appraisalDistrict: {
      name: 'Michelle Berdeaux',
      websiteUrl: 'https://midcad.org/',
      phone: '432-699-4991',
      address: '4631 Andrews Hwy. Midland, TX 79703-4608',
      email: 'mcadhelp@midcad.org'
    },
    taxOffice: {
      name: 'Mary Helen Bowers',
      websiteUrl: 'https://www.co.midland.tx.us/',
      phone: '432-688-4810',
      address: '2110 N. A St. Midland, Texas 79705-7608',
      email: 'tax101@co.midland.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://midcad.org/',
      taxOfficeUrl: 'https://www.co.midland.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-28',
      taxOffice: '2025-08-13'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/midland.php', 'https://midcad.org/', 'https://www.co.midland.tx.us/']
  },
  milam: {
    appraisalDistrict: {
      name: 'Ryan Nichols',
      websiteUrl: 'https://www.milamad.org/',
      phone: '254-697-6638',
      address: '120 N. Houston Ave. Cameron, TX 76520-3321',
      email: 'rnichols@milamad.org'
    },
    taxOffice: {
      name: 'Melissa Fritz',
      websiteUrl: 'https://www.milamcounty.net/',
      phone: '254-697-7017',
      address: '806 N. Crockett Ave., Ste. J Cameron, Texas 76520-2553',
      email: 'mfritz@milamcounty.net'
    },
    links: {
      appraisalDistrictUrl: 'https://www.milamad.org/',
      taxOfficeUrl: 'https://www.milamcounty.net/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-06-30',
      taxOffice: '2025-04-17'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/milam.php', 'https://www.milamad.org/', 'https://www.milamcounty.net/']
  },
  mills: {
    appraisalDistrict: {
      name: 'Lori Fetterman, Interim',
      websiteUrl: 'https://millscad.org/',
      phone: '325-648-2253',
      address: '901 W. 6th St. Goldthwaite, TX 76844-9998',
      email: 'info@millscad.org'
    },
    taxOffice: {
      name: 'Lori King',
      websiteUrl: 'https://www.millscountytx.gov/',
      phone: '325-648-3879',
      address: '1011 4th St., 3rd Floor Goldthwaite, Texas 76844',
      email: 'Lking@co.mills.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://millscad.org/',
      taxOfficeUrl: 'https://www.millscountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-06',
      taxOffice: '2025-02-18'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/mills.php', 'https://millscad.org/', 'https://www.millscountytx.gov/']
  },
  mitchell: {
    appraisalDistrict: {
      name: 'Lizz Shankles',
      websiteUrl: 'https://mitchellcad.southwestdatasolutions.com/',
      phone: '325-728-5028',
      address: '2112 Hickory St. Colorado City, TX 79512-3448',
      email: 'mitchellcad1@outlook.com'
    },
    taxOffice: {
      name: 'Teresa Hughes',
      websiteUrl: 'https://www.co.mitchell.tx.us/',
      phone: '325-728-2606',
      address: '438 E. 2nd St. Colorado City, Texas 79512-6435',
      email: 'thughes@co.mitchell.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://mitchellcad.southwestdatasolutions.com/',
      taxOfficeUrl: 'https://www.co.mitchell.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-10-06',
      taxOffice: '2025-04-17'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/mitchell.php', 'https://mitchellcad.southwestdatasolutions.com/', 'https://www.co.mitchell.tx.us/']
  },
  montgomery: {
    appraisalDistrict: {
      name: 'Sherry Hunter',
      websiteUrl: 'https://www.mcad-tx.org/',
      phone: '936-756-3354',
      address: '109 Gladstell St. Conroe, TX 77301-4236',
      email: 'inquiries@mcad-tx.org'
    },
    taxOffice: {
      name: 'Tammy McRae',
      websiteUrl: 'https://www.mctotx.org/',
      phone: '936-539-7897',
      address: '400 N. San Jacinto St. Conroe, Texas 77301-2823',
      email: 'tax@mctx.org'
    },
    links: {
      appraisalDistrictUrl: 'https://www.mcad-tx.org/',
      taxOfficeUrl: 'https://www.mctotx.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-15',
      taxOffice: '2025-04-22'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/montgomery.php', 'https://www.mcad-tx.org/', 'https://www.mctotx.org/']
  },
  moore: {
    appraisalDistrict: {
      name: 'Janie Starkey',
      websiteUrl: 'https://moorecad.org/',
      phone: '806-935-4193',
      address: '419 Success Blvd. Dumas, TX 79029',
      email: 'janie@mcountycad.com'
    },
    taxOffice: {
      name: 'Chris Rivera',
      websiteUrl: 'https://www.co.moore.tx.us/',
      phone: '806-935-2175',
      address: '500 S. Dumas Ave. Dumas, Texas 79029-4323',
      email: 'crivera@moore-tx.com'
    },
    links: {
      appraisalDistrictUrl: 'https://moorecad.org/',
      taxOfficeUrl: 'https://www.co.moore.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-03-30',
      taxOffice: '2025-04-22'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/moore.php', 'https://moorecad.org/', 'https://www.co.moore.tx.us/']
  },
  navarro: {
    appraisalDistrict: {
      name: 'Bud Black',
      websiteUrl: 'https://www.navarrocad.com/',
      phone: '903-872-6161',
      address: '1250 N. 45th St. Corsicana, TX 75110-3172',
      email: 'general.info@navarrocad.com'
    },
    taxOffice: {
      name: 'Mike Dowd',
      websiteUrl: 'https://www.co.navarro.tx.us/',
      phone: '903-654-3080',
      address: '601 N. 13th St., Ste. 2 Corsicana, Texas 75110',
      email: 'mdowd@navarrocounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://www.navarrocad.com/',
      taxOfficeUrl: 'https://www.co.navarro.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-03-04',
      taxOffice: '2025-05-02'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/navarro.php', 'https://www.navarrocad.com/', 'https://www.co.navarro.tx.us/']
  },
  newton: {
    appraisalDistrict: {
      name: 'Christina Kelley',
      websiteUrl: 'https://newtoncad.org/',
      phone: '409-379-3710',
      address: '109 Court St. Newton, TX 75966-3202',
      email: 'ckelley@co.newton.tx.us'
    },
    taxOffice: {
      name: 'Tracy M Noble',
      websiteUrl: 'https://www.co.newton.tx.us/',
      phone: '409-379-4241',
      address: '113 E. Court St. Newton, Texas 75966-3202',
      email: 'tracy.noble@co.newton.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://newtoncad.org/',
      taxOfficeUrl: 'https://www.co.newton.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-09',
      taxOffice: '2026-07-09'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/newton.php', 'https://newtoncad.org/', 'https://www.co.newton.tx.us/']
  },
  nolan: {
    appraisalDistrict: {
      name: 'Paula Kisinger',
      websiteUrl: 'https://www.nolan-cad.org/',
      phone: '325-235-8421',
      address: '208 Elm St. Sweetwater, TX 79556-4524',
      email: 'nolancad@gmail.com'
    },
    taxOffice: {
      name: 'Adriana Archuleta',
      websiteUrl: 'https://www.co.nolan.tx.us/',
      phone: '325-235-3271',
      address: '100 E. 3rd St., Suite 100 Sweetwater, Texas 79556-4546',
      email: 'a.archuleta@co.nolan.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.nolan-cad.org/',
      taxOfficeUrl: 'https://www.co.nolan.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-06-23',
      taxOffice: '2025-04-24'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/nolan.php', 'https://www.nolan-cad.org/', 'https://www.co.nolan.tx.us/']
  },
  nueces: {
    appraisalDistrict: {
      name: 'Debra D. Morin',
      websiteUrl: 'https://nuecescad.net/',
      phone: '361-881-9978',
      address: '201 N. Chaparral St. Corpus Christi, TX 78401-2503',
      email: 'info@nuecescad.net'
    },
    taxOffice: {
      name: 'Kevin Kieschnick',
      websiteUrl: 'https://www.nuecesco.com/',
      phone: '361-888-0307',
      address: '901 Leopard St., Room 301 Corpus Christi, Texas 78401-3602',
      email: 'nueces.tax@nuecesco.com'
    },
    links: {
      appraisalDistrictUrl: 'https://nuecescad.net/',
      taxOfficeUrl: 'https://www.nuecesco.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-04-24',
      taxOffice: '2025-02-18'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/nueces.php', 'https://nuecescad.net/', 'https://www.nuecesco.com/']
  },
  ochiltree: {
    appraisalDistrict: {
      name: 'Julia Mendez',
      websiteUrl: 'https://www.ochiltreecad.org/',
      phone: '806-435-9623',
      address: '825 S. Main St., Ste. 100 Perryton, TX 79070-3556',
      email: 'ocadappr@ochiltreead.org'
    },
    taxOffice: {
      name: 'Angel Hernandez',
      websiteUrl: 'https://www.co.ochiltree.tx.us/',
      phone: '806-435-8025',
      address: '511 S. Main St. Perryton, Texas 79070-3100',
      email: 'ahernandez@ochiltree.net'
    },
    links: {
      appraisalDistrictUrl: 'https://www.ochiltreecad.org/',
      taxOfficeUrl: 'https://www.co.ochiltree.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-18',
      taxOffice: '2025-02-18'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/ochiltree.php', 'https://www.ochiltreecad.org/', 'https://www.co.ochiltree.tx.us/']
  },
  oldham: {
    appraisalDistrict: {
      name: 'Leann Voyles',
      websiteUrl: 'https://oldhamcad.org/',
      phone: '806-267-2442',
      address: '909 Vega Blvd. Vega, TX 79092',
      email: 'oldhamcad@xit.net'
    },
    taxOffice: {
      name: 'Adriana Cano',
      websiteUrl: 'https://www.co.oldham.tx.us/',
      phone: '806-639-2109',
      address: '105 S. Main St. Vega, Texas 79092',
      email: 'adriana.cano@oldham-county.org'
    },
    links: {
      appraisalDistrictUrl: 'https://oldhamcad.org/',
      taxOfficeUrl: 'https://www.co.oldham.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-19',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/oldham.php', 'https://oldhamcad.org/', 'https://www.co.oldham.tx.us/']
  },
  panola: {
    appraisalDistrict: {
      name: 'Michael Douglas McPhail',
      websiteUrl: 'https://www.panolacad.org/',
      phone: '903-693-2891',
      address: '1736 Ball Park Dr. Carthage, TX 75633-3368',
      email: 'dmcphail@panolacad.org'
    },
    taxOffice: {
      name: 'Holly Gibbs',
      websiteUrl: 'https://www.co.panola.tx.us/',
      phone: '903-693-0340',
      address: '110 S. Sycamore St., Room 211 Carthage, Texas 75633-2527',
      email: 'holly.gibbs@co.panola.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.panolacad.org/',
      taxOfficeUrl: 'https://www.co.panola.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-06',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/panola.php', 'https://www.panolacad.org/', 'https://www.co.panola.tx.us/']
  },
  parker: {
    appraisalDistrict: {
      name: 'Troy Hanson',
      websiteUrl: 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=PARKERCAD&time=202610082306037',
      phone: '817-596-0077',
      address: '1108 Santa Fe Dr. Weatherford, TX 76086-5818',
      email: 'parkercad@parkercad.org'
    },
    taxOffice: {
      name: 'Jenny Gentry',
      websiteUrl: 'https://www.parkercountytx.gov/',
      phone: '817-598-6139',
      address: '1112 Santa Fe Dr. Weatherford, Texas 76086-5818',
      email: 'jenny.gentry@parkercountytx.com'
    },
    links: {
      appraisalDistrictUrl: 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=PARKERCAD&time=202610082306037',
      taxOfficeUrl: 'https://www.parkercountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-29',
      taxOffice: '2025-04-24'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/parker.php', 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=PARKERCAD&time=202610082306037', 'https://www.parkercountytx.gov/']
  },
  polk: {
    appraisalDistrict: {
      name: 'Chad Hill',
      websiteUrl: 'https://polkcad.org/',
      phone: '936-327-2174',
      address: '114 Matthews St. Livingston, TX 77351-3425',
      email: 'support@polkcad.org'
    },
    taxOffice: {
      name: 'Tatum White',
      websiteUrl: 'https://polk-tax.com/',
      phone: '936-327-6801',
      address: '416 N. Washington Ave. Livingston, Texas 77351-2838',
      email: 'tatum.white@co.polk.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://polkcad.org/',
      taxOfficeUrl: 'https://polk-tax.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-02-17',
      taxOffice: '2026-09-18'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/polk.php', 'https://polkcad.org/', 'https://polk-tax.com/']
  },
  potter: {
    appraisalDistrict: {
      name: 'Jeff Dagley',
      websiteUrl: 'https://www.prad.org/',
      phone: '806-358-1601',
      address: '5701 Hollywood Rd. Amarillo, TX 79118',
      email: 'info@prad.org'
    },
    taxOffice: {
      name: 'Thomas Warren',
      websiteUrl: 'https://www.co.potter.tx.us/',
      phone: '806-342-2600',
      address: '900 S. Polk St., Suite 106 Amarillo, Texas 79101-3402',
      email: 'pcto@co.potter.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.prad.org/',
      taxOfficeUrl: 'https://www.co.potter.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-19',
      taxOffice: '2025-02-21'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/potter.php', 'https://www.prad.org/', 'https://www.co.potter.tx.us/']
  },
  rains: {
    appraisalDistrict: {
      name: 'Sherri McCall',
      websiteUrl: 'https://rainscad.org/',
      phone: '903-473-2391',
      address: '145 Doris Briggs Pkwy. Emory, TX 75440-3013',
      email: 'rcadmail@rainscad.org'
    },
    taxOffice: {
      name: 'Sheila Floyd',
      websiteUrl: 'https://www.co.rains.tx.us/',
      phone: '903-473-5018',
      address: '167 E. Quitman St., Ste. 103 Emory, Texas 75440-2630',
      email: 'sheila.floyd@co.rains.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://rainscad.org/',
      taxOfficeUrl: 'https://www.co.rains.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-06',
      taxOffice: '2025-05-02'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/rains.php', 'https://rainscad.org/', 'https://www.co.rains.tx.us/']
  },
  real: {
    appraisalDistrict: {
      name: 'Lori Fetterman, Interim',
      websiteUrl: 'https://realcad.org/',
      phone: '830-232-6248',
      address: '763 S US Hwy 83 Leakey, TX 78873',
      email: 'info@realcad.org'
    },
    taxOffice: {
      name: 'Terrie Pendley',
      websiteUrl: 'https://www.co.real.tx.us/',
      phone: '830-232-6210',
      address: '474 R.R. 337 W. Leakey, Texas 78873',
      email: 'rctac@co.real.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://realcad.org/',
      taxOfficeUrl: 'https://www.co.real.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-08-13',
      taxOffice: '2025-04-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/real.php', 'https://realcad.org/', 'https://www.co.real.tx.us/']
  },
  reeves: {
    appraisalDistrict: {
      name: 'Clayton Snyder',
      websiteUrl: 'https://www.reeves-cad.org/',
      phone: '432-445-5122',
      address: '403 S. Cypress St. Pecos, TX 79772-4047',
      email: 'info@Reeves-CAD.org'
    },
    taxOffice: {
      name: 'Sandra Soto',
      websiteUrl: 'https://www.reevescounty.org/',
      phone: '432-287-0223',
      address: '424 S. Cypress St. Pecos, Texas 79772-4050',
      email: 'tax@reevescounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://www.reeves-cad.org/',
      taxOfficeUrl: 'https://www.reevescounty.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-07',
      taxOffice: '2026-05-07'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/reeves.php', 'https://www.reeves-cad.org/', 'https://www.reevescounty.org/']
  },
  robertson: {
    appraisalDistrict: {
      name: 'Lesley Sootoo',
      websiteUrl: 'https://robertsoncad.com/',
      phone: '979-828-5800',
      address: '108 Morgan St. Franklin, TX 77856-4364',
      email: 'rcad@robertsoncad.com'
    },
    taxOffice: {
      name: 'Michael Brewer',
      websiteUrl: 'https://www.co.robertson.tx.us/',
      phone: '979-828-3337',
      address: '315 N. Center St. Franklin, Texas 77856',
      email: 'michael.brewer@co.robertson.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://robertsoncad.com/',
      taxOfficeUrl: 'https://www.co.robertson.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-29',
      taxOffice: '2025-04-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/robertson.php', 'https://robertsoncad.com/', 'https://www.co.robertson.tx.us/']
  },
  rockwall: {
    appraisalDistrict: {
      name: 'Kevin Passons',
      websiteUrl: 'https://www.rockwallcad.com/',
      phone: '972-771-2034',
      address: '841 Justin Rd. Rockwall, TX 75087-4842',
      email: 'info@rockwallcad.com'
    },
    taxOffice: {
      name: 'Kim Sweet',
      websiteUrl: 'https://www.rockwallcountytexas.com/',
      phone: '972-204-6130',
      address: '101 E. Rusk St., Ste. 101 Rockwall, Texas 75087-3783',
      email: 'ksweetr@rockwallcountytexas.com'
    },
    links: {
      appraisalDistrictUrl: 'https://www.rockwallcad.com/',
      taxOfficeUrl: 'https://www.rockwallcountytexas.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-06-11',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/rockwall.php', 'https://www.rockwallcad.com/', 'https://www.rockwallcountytexas.com/']
  },
  rusk: {
    appraisalDistrict: {
      name: 'Weldon Cook',
      websiteUrl: 'https://www.ruskcad.org/',
      phone: '903-657-3578',
      address: '107 N. Van Buren St. Henderson, TX 75652-3113',
      email: 'wcook@ruskcad.org'
    },
    taxOffice: {
      name: 'Nesha Partin',
      websiteUrl: 'https://www.ruskcountytx.gov/',
      phone: '903-657-0315',
      address: '202 N. Main St. Henderson, Texas 75652-3140',
      email: 'npartin@ruskcountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://www.ruskcad.org/',
      taxOfficeUrl: 'https://www.ruskcountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-05-02',
      taxOffice: '2025-05-02'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/rusk.php', 'https://www.ruskcad.org/', 'https://www.ruskcountytx.gov/']
  },
  sabine: {
    appraisalDistrict: {
      name: 'Tina Ford',
      websiteUrl: 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=SABINECAD',
      phone: '409-787-2777',
      address: '1920 Worth St. Hemphill, TX 75948-9998',
      email: 'sabinecad@windstream.net'
    },
    taxOffice: {
      name: 'Martha M. Stone',
      websiteUrl: 'https://www.co.sabine.tx.us/',
      phone: '409-787-2257',
      address: '213 Market St. Hemphill, Texas 75948',
      email: 'martha.stone@co.sabine.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=SABINECAD',
      taxOfficeUrl: 'https://www.co.sabine.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-05-06',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/sabine.php', 'https://www.southwestdatasolution.com/webindex.aspx?dbkey=SABINECAD', 'https://www.co.sabine.tx.us/']
  },
  san-augustine: {
    appraisalDistrict: {
      name: 'Evelyn Watts',
      websiteUrl: 'https://www.sanaugustinecad.org/',
      phone: '936-275-3496',
      address: '122 N. Harrison St. San Augustine, TX 75972-1906',
      email: 'sanaugcad@sbcglobal.net'
    },
    taxOffice: {
      name: 'Regina Barthol',
      websiteUrl: 'https://www.co.san-augustine.tx.us/',
      phone: '936-275-2300',
      address: '100 W. Columbia St., Room 102 San Augustine, Texas 75972-1904',
      email: 'regina.barthol@co.san-augustine.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.sanaugustinecad.org/',
      taxOfficeUrl: 'https://www.co.san-augustine.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-03-04',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/sanaugustine.php', 'https://www.sanaugustinecad.org/', 'https://www.co.san-augustine.tx.us/']
  },
  san-patricio: {
    appraisalDistrict: {
      name: 'Jordan Light',
      websiteUrl: 'https://sanpatcad.org/',
      phone: '361-364-5402',
      address: '1301 E. Sinton St. Suite B Sinton, TX 78387-2653',
      email: 'jmlight@sanpatcad.org'
    },
    taxOffice: {
      name: 'Marcela Thormaehlen',
      websiteUrl: 'https://www.sanpatriciocountytx.gov/',
      phone: '361-364-9373',
      address: '1301 E. Sinton St., Ste. C Sinton, Texas 78387',
      email: 'mthormaehlen@sanpatriciocountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://sanpatcad.org/',
      taxOfficeUrl: 'https://www.sanpatriciocountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-06-11',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/sanpatricio.php', 'https://sanpatcad.org/', 'https://www.sanpatriciocountytx.gov/']
  },
  schleicher: {
    appraisalDistrict: {
      name: 'Anna Buitron',
      websiteUrl: 'https://www.schleichercad.org/',
      phone: '325-853-2617',
      address: '1 W. Warner Ave. Eldorado, TX 76936-9998',
      email: 'schcad@schleichercad.org'
    },
    taxOffice: {
      name: 'Vanessa Covarrubiaz',
      websiteUrl: 'https://www.schleichercounty.gov/',
      phone: '325-853-3066',
      address: '2 S. Divide St. Eldorado, Texas 76936',
      email: 'v.covarrubiaz@co.schleicher.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.schleichercad.org/',
      taxOfficeUrl: 'https://www.schleichercounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-29',
      taxOffice: '2025-04-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/schleicher.php', 'https://www.schleichercad.org/', 'https://www.schleichercounty.gov/']
  },
  shackelford: {
    appraisalDistrict: {
      name: 'Richard Petree, Interim',
      websiteUrl: 'https://shackelfordcad.com/',
      phone: '325-762-2207',
      address: '132 Hill St. Albany, TX 76430',
      email: 'chief@shackelfordcad.com'
    },
    taxOffice: {
      name: 'Edward Miller',
      websiteUrl: 'https://www.shackelfordcounty.org/',
      phone: '325-762-9420',
      address: '225 S. Main St. Albany, Texas 76430',
      email: 'belinda.perez@shackelfordcounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://shackelfordcad.com/',
      taxOfficeUrl: 'https://www.shackelfordcounty.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-29',
      taxOffice: '2025-05-02'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/shackelford.php', 'https://shackelfordcad.com/', 'https://www.shackelfordcounty.org/']
  },
  smith: {
    appraisalDistrict: {
      name: 'Carol McNeil',
      websiteUrl: 'https://www.smithcad.org/',
      phone: '903-510-8600',
      address: '245 S. S.E. Loop 323 Tyler, TX 75702-6456',
      email: 'chiefappraiser@scad.org'
    },
    taxOffice: {
      name: 'Gary B. Barber',
      websiteUrl: 'https://www.smith-county.com/',
      phone: '903-590-2920',
      address: '1517 W. Front St. Tyler, Texas 75702-7822',
      email: 'taxoffice@smith-county.com'
    },
    links: {
      appraisalDistrictUrl: 'https://www.smithcad.org/',
      taxOfficeUrl: 'https://www.smith-county.com/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-29',
      taxOffice: '2025-04-25'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/smith.php', 'https://www.smithcad.org/', 'https://www.smith-county.com/']
  },
  stephens: {
    appraisalDistrict: {
      name: 'William Thompson',
      websiteUrl: 'https://stephenscad.com/',
      phone: '254-559-8233',
      address: '201 S. Rose Ave. Breckenridge, TX 76424-4449',
      email: 'taxpayerconnection@stephenscad.com'
    },
    taxOffice: {
      name: 'Crystal Shook',
      websiteUrl: 'https://www.co.stephens.tx.us/',
      phone: '254-559-2732',
      address: '200 W. Walker St. Breckenridge, Texas 76424-3539',
      email: 'c.shook@stephenscountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://stephenscad.com/',
      taxOfficeUrl: 'https://www.co.stephens.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-19',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/stephens.php', 'https://stephenscad.com/', 'https://www.co.stephens.tx.us/']
  },
  stonewall: {
    appraisalDistrict: {
      name: 'Debra Smith',
      websiteUrl: 'https://www.stonewallcad.org/',
      phone: '940-989-3363',
      address: '510 S. Washington St. Aspermont, TX 79502-9998',
      email: 'stonewallcad@valornet.com'
    },
    taxOffice: {
      name: 'Lacy English',
      websiteUrl: 'https://www.stonewallcounty.org/',
      phone: '940-989-2633',
      address: '128 Town Square Ln. Aspermont, Texas 79502',
      email: 'tax@stonewallcountytx.org'
    },
    links: {
      appraisalDistrictUrl: 'https://www.stonewallcad.org/',
      taxOfficeUrl: 'https://www.stonewallcounty.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-19',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/stonewall.php', 'https://www.stonewallcad.org/', 'https://www.stonewallcounty.org/']
  },
  sutton: {
    appraisalDistrict: {
      name: 'Mary Bustamante',
      websiteUrl: 'https://suttoncad.com/',
      phone: '325-387-2809',
      address: '300 E. Oak St., Ste. 2 Sonora, TX 76950-2671',
      email: 'mgbustamante4@aol.com'
    },
    taxOffice: {
      name: 'Kathy Marshall',
      websiteUrl: 'https://www.co.sutton.tx.us/',
      phone: '325-387-2342',
      address: '300 E. Oak St., Ste. 1 Sonora, Texas 76950-2671',
      email: 'sutton.tac@verizon.net'
    },
    links: {
      appraisalDistrictUrl: 'https://suttoncad.com/',
      taxOfficeUrl: 'https://www.co.sutton.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-10-02',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/sutton.php', 'https://suttoncad.com/', 'https://www.co.sutton.tx.us/']
  },
  tarrant: {
    appraisalDistrict: {
      name: 'Joe Don Bobbitt',
      websiteUrl: 'https://www.tad.org/',
      phone: '817-284-0024',
      address: '2500 Handley-Ederville Rd. Fort Worth, TX 76118-6909',
      email: 'chiefappraiser@tad.org'
    },
    taxOffice: {
      name: 'Rick D. Barnes',
      websiteUrl: 'https://www.tarrantcounty.com/en/tax.html',
      phone: '817-884-1100',
      address: '100 E. Weatherford St. #105 Fort Worth, Texas 76196-0206',
      email: 'taxoffice@tarrantcountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://www.tad.org/',
      taxOfficeUrl: 'https://www.tarrantcounty.com/en/tax.html'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-21',
      taxOffice: '2025-02-21'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/tarrant.php', 'https://www.tad.org/', 'https://www.tarrantcounty.com/en/tax.html']
  },
  taylor: {
    appraisalDistrict: {
      name: 'Gary Earnest',
      websiteUrl: 'https://taylor-cad.org/',
      phone: '325-676-9381',
      address: '1534 S. Treadaway Abilene, TX 79602-4927',
      email: 'earnest@cadtx.org'
    },
    taxOffice: {
      name: 'Kay Middleton',
      websiteUrl: 'https://www.taylorcounty.texas.gov/',
      phone: '325-674-1224',
      address: '400 Oak St., Ste. 105 Abilene, Texas 79602-1520',
      email: 'kay.middleton@taylorcountytexas.org'
    },
    links: {
      appraisalDistrictUrl: 'https://taylor-cad.org/',
      taxOfficeUrl: 'https://www.taylorcounty.texas.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-21',
      taxOffice: '2025-05-02'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/taylor.php', 'https://taylor-cad.org/', 'https://www.taylorcounty.texas.gov/']
  },
  terrell: {
    appraisalDistrict: {
      name: 'Blain Chriesman',
      websiteUrl: 'https://terrellcad.org/',
      phone: '432-345-2251',
      address: '302 N. 2nd St. Sanderson, TX 79848',
      email: 'tcad@terrell.esc18.net'
    },
    taxOffice: {
      name: 'Thad Cleveland',
      websiteUrl: 'https://www.co.terrell.tx.us/',
      phone: '432-345-2499',
      address: '105 E. Hackberry St. Sanderson, Texas 79848',
      email: 'thad.cleveland@co.terrell.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://terrellcad.org/',
      taxOfficeUrl: 'https://www.co.terrell.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-30',
      taxOffice: '2025-04-28'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/terrell.php', 'https://terrellcad.org/', 'https://www.co.terrell.tx.us/']
  },
  throckmorton: {
    appraisalDistrict: {
      name: 'Dede Smith',
      websiteUrl: 'https://www.throckmortoncad.org/',
      phone: '940-213-1114',
      address: '144 N. Minter Ave. Throckmorton, TX 76483-5344',
      email: 'dsmith@throckmortoncad.com'
    },
    taxOffice: {
      name: 'Glen Whitfield',
      websiteUrl: 'https://www.throckmortoncounty.org/',
      phone: '940-849-8855',
      address: '105 N. Minter Ave. Throckmorton, Texas 76483',
      email: 'Website:'
    },
    links: {
      appraisalDistrictUrl: 'https://www.throckmortoncad.org/',
      taxOfficeUrl: 'https://www.throckmortoncounty.org/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-24',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/throckmorton.php', 'https://www.throckmortoncad.org/', 'https://www.throckmortoncounty.org/']
  },
  travis: {
    appraisalDistrict: {
      name: 'Leana Mann',
      websiteUrl: 'https://traviscad.org/',
      phone: '512-834-9317',
      address: '850 E. Anderson Ln. Austin, TX 78752',
      email: 'csinfo@tcadcentral.org'
    },
    taxOffice: {
      name: 'Celia Israel',
      websiteUrl: 'https://tax-office.traviscountytx.gov/',
      phone: '512-854-9473',
      address: '2433 Ridgepoint Dr. Austin, Texas 78754-5231',
      email: 'taxoffice@traviscountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://traviscad.org/',
      taxOfficeUrl: 'https://tax-office.traviscountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-19',
      taxOffice: '2025-04-29'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/travis.php', 'https://traviscad.org/', 'https://tax-office.traviscountytx.gov/']
  },
  tyler: {
    appraisalDistrict: {
      name: 'Leighann Jones',
      websiteUrl: 'https://tylercad.net/',
      phone: '409-283-3736',
      address: '806 W. Bluff St. Woodville, TX 75979-4732',
      email: 'info@tylercad.net'
    },
    taxOffice: {
      name: 'Melissa Carson',
      websiteUrl: 'https://www.co.tyler.tx.us/',
      phone: '409-283-2734',
      address: '1001 W. Bluff St. Woodville, Texas 75979-4735',
      email: 'mcarson.tax@co.tyler.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://tylercad.net/',
      taxOfficeUrl: 'https://www.co.tyler.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-08-19',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/tyler.php', 'https://tylercad.net/', 'https://www.co.tyler.tx.us/']
  },
  uvalde: {
    appraisalDistrict: {
      name: 'Roberto Valdez',
      websiteUrl: 'https://uvaldecad.org/',
      phone: '830-278-1106',
      address: '209 N. High St. Uvalde, TX 78801-5207',
      email: 'melissapulido@uvaldecad.org'
    },
    taxOffice: {
      name: 'Rita Verstuyft',
      websiteUrl: 'https://www.uvaldecounty.gov/',
      phone: '830-278-3225',
      address: '100 N. Getty St., Suite 8 Uvalde, Texas 78801-5239',
      email: 'rita.verstuyft@uvaldecounty.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://uvaldecad.org/',
      taxOfficeUrl: 'https://www.uvaldecounty.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-30',
      taxOffice: '2025-04-29'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/uvalde.php', 'https://uvaldecad.org/', 'https://www.uvaldecounty.gov/']
  },
  victoria: {
    appraisalDistrict: {
      name: 'Keri Wickliffe',
      websiteUrl: 'https://victoriacad.org/',
      phone: '361-576-3621',
      address: '2805 N. Navarro St., Ste. 300 Victoria, TX 77901-3947',
      email: 'openrecords@victoriacad.org'
    },
    taxOffice: {
      name: 'Ashley Hernandez',
      websiteUrl: 'https://www.victoriacountytx.gov/',
      phone: '361-576-3671',
      address: '205 N. Bridge St., Suite 101 Victoria, Texas 77901-6576',
      email: 'victoriacountytax@vctx.org'
    },
    links: {
      appraisalDistrictUrl: 'https://victoriacad.org/',
      taxOfficeUrl: 'https://www.victoriacountytx.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-03',
      taxOffice: '2025-05-02'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/victoria.php', 'https://victoriacad.org/', 'https://www.victoriacountytx.gov/']
  },
  waller: {
    appraisalDistrict: {
      name: 'Becky Gurrola',
      websiteUrl: 'https://waller-cad.org/',
      phone: '979-921-0060',
      address: '900 13th St. Hempstead, TX 77445-5155',
      email: 'beckyg@waller-cad.org'
    },
    taxOffice: {
      name: 'Carolyn Miedke',
      websiteUrl: 'https://www.co.waller.tx.us/',
      phone: '979-826-7620',
      address: '730 9th St. Hempstead, Texas 77445-4534',
      email: 'taxoffice@wallercounty.us'
    },
    links: {
      appraisalDistrictUrl: 'https://waller-cad.org/',
      taxOfficeUrl: 'https://www.co.waller.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-06-23',
      taxOffice: '2025-04-29'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/waller.php', 'https://waller-cad.org/', 'https://www.co.waller.tx.us/']
  },
  washington: {
    appraisalDistrict: {
      name: 'Dyann White',
      websiteUrl: 'https://washingtoncad.org/',
      phone: '979-277-3740',
      address: '1301 Niebuhr St. Brenham, TX 77833-5031',
      email: 'wcad@brenhamk-12.net'
    },
    taxOffice: {
      name: 'Cheryl Gaskamp',
      websiteUrl: 'https://www.co.washington.tx.us/',
      phone: '979-277-6200',
      address: '100 E. Main St., Suite 100 Brenham, Texas 77833-3701',
      email: 'cgaskamp@washingtoncountytx.gov'
    },
    links: {
      appraisalDistrictUrl: 'https://washingtoncad.org/',
      taxOfficeUrl: 'https://www.co.washington.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-02-19',
      taxOffice: '2025-02-19'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/washington.php', 'https://washingtoncad.org/', 'https://www.co.washington.tx.us/']
  },
  wheeler: {
    appraisalDistrict: {
      name: 'Kimberly Morgan',
      websiteUrl: 'https://www.wheelercad.org/',
      phone: '806-826-5900',
      address: '402 S. Main St. Wheeler, TX 79096-9998',
      email: 'admin@wheelercad.org'
    },
    taxOffice: {
      name: 'Cindy Brown',
      websiteUrl: 'https://www.wheelercounty.texas.gov/',
      phone: '806-826-3131',
      address: '401 Main St. Wheeler, Texas 79096',
      email: 'cindy.brown@co.wheeler.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.wheelercad.org/',
      taxOfficeUrl: 'https://www.wheelercounty.texas.gov/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-04-24',
      taxOffice: '2025-04-29'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/wheeler.php', 'https://www.wheelercad.org/', 'https://www.wheelercounty.texas.gov/']
  },
  wilbarger: {
    appraisalDistrict: {
      name: 'Sandy Burkett',
      websiteUrl: 'https://www.wilbargerappraisal.org/',
      phone: '940-553-1857',
      address: '1800 Cumberland St. Vernon, TX 76384-5448',
      email: 'sburkett@wilbargerappraisal.org'
    },
    taxOffice: {
      name: 'Tissha Taylor',
      websiteUrl: 'https://www.co.wilbarger.tx.us/',
      phone: '940-552-9341',
      address: '1700 Wilbarger St., Room 17 Vernon, Texas 76384-4748',
      email: 'ttaylor@co.wilbarger.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://www.wilbargerappraisal.org/',
      taxOfficeUrl: 'https://www.co.wilbarger.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2024-10-16',
      taxOffice: '2024-10-16'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/wilbarger.php', 'https://www.wilbargerappraisal.org/', 'https://www.co.wilbarger.tx.us/']
  },
  wise: {
    appraisalDistrict: {
      name: 'Deidra Deaton',
      websiteUrl: 'https://wise-cad.com/',
      phone: '940-627-3081',
      address: '400 E. Business 380 Decatur, TX 76234-3165',
      email: 'Info@wisecad.net'
    },
    taxOffice: {
      name: 'Monte S. Shaw',
      websiteUrl: 'https://www.co.wise.tx.us/',
      phone: '940-627-3523',
      address: '404 W. Walnut St. Decatur, Texas 76234-1372',
      email: 'monte.shaw@co.wise.tx.us'
    },
    links: {
      appraisalDistrictUrl: 'https://wise-cad.com/',
      taxOfficeUrl: 'https://www.co.wise.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-07-21',
      taxOffice: '2025-02-21'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/wise.php', 'https://wise-cad.com/', 'https://www.co.wise.tx.us/']
  },
  young: {
    appraisalDistrict: {
      name: 'Jesse Blackmon',
      websiteUrl: 'https://youngcad.org/',
      phone: '940-549-2392',
      address: '505 5th St. Graham, TX 76450-2506',
      email: 'youngcad@youngcad.org'
    },
    taxOffice: {
      name: 'Christina Centers',
      websiteUrl: 'https://www.co.young.tx.us/',
      phone: '940-549-1393',
      address: '417 2nd St., Ste. 113 Graham, Texas 76450-3005',
      email: 'c.centers@youngcounty.org'
    },
    links: {
      appraisalDistrictUrl: 'https://youngcad.org/',
      taxOfficeUrl: 'https://www.co.young.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2025-01-30',
      taxOffice: '2025-04-29'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/young.php', 'https://youngcad.org/', 'https://www.co.young.tx.us/']
  },
  zapata: {
    appraisalDistrict: {
      name: 'Roberto Montes, Jr.',
      websiteUrl: 'https://zapatacad.com/',
      phone: '956-765-9988',
      address: '200 E. 7th Ave., Ste. 240 Zapata, TX 78076-9998',
      email: 'rmontes@zapatacountytx.org'
    },
    taxOffice: {
      name: 'Delia Mendoza',
      websiteUrl: 'https://www.co.zapata.tx.us/',
      phone: '956-765-9971',
      address: '200 E. 7th St., Ste. 226 Zapata, Texas 78076-2959',
      email: 'deliam@zapatacountytx.org'
    },
    links: {
      appraisalDistrictUrl: 'https://zapatacad.com/',
      taxOfficeUrl: 'https://www.co.zapata.tx.us/'
    },
    sourceUpdatedAt: {
      appraisalDistrict: '2026-01-16',
      taxOffice: '2025-04-29'
    },
    lastVerifiedAt: '2026-10-09',
    sourceUrls: ['https://comptroller.texas.gov/taxes/property-tax/county-directory/zapata.php', 'https://zapatacad.com/', 'https://www.co.zapata.tx.us/']
  },
};
