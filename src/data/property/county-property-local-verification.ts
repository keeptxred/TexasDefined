import type { CountyOfficeContact, CountyPropertyLinks } from '@/data/property/county-property-schema';

export type CountyPropertyLocalVerification = {
  appraisalDistrict: Partial<CountyOfficeContact>;
  taxOffice: Partial<CountyOfficeContact>;
  links: Partial<CountyPropertyLinks>;
  lastVerifiedAt: string;
  sourceUrls: string[];
};

/**
 * Hand-verified local property-tax records used only when the Texas Comptroller
 * county directory has a stale office "Last Updated" field but current local government sources independently confirm
 * the office and taxpayer resources.
 *
 * These records are intentionally separate from the generated Comptroller
 * snapshot so the scheduled statewide sync can never overwrite or manufacture
 * a local verification. Each entry must retain at least two distinct current
 * local government/property-tax sources and is protected by CI freshness checks.
 */
export const COUNTY_PROPERTY_LOCAL_VERIFICATION: Record<string, CountyPropertyLocalVerification> = {
  polk: {
    appraisalDistrict: {
      name: 'Chad Hill',
      websiteUrl: 'https://polkcad.org',
      phone: '936-327-2174',
      address: '114 Matthews St., Livingston, TX 77351-3425',
      email: 'support@polkcad.org',
    },
    taxOffice: {
      name: 'Tatum White',
      websiteUrl: 'https://newtools.cira.state.tx.us/page/polk.County.Assessor.Collector',
      phone: '936-327-6801',
      address: '416 N. Washington Ave., Livingston, TX 77351-2838',
      email: 'tatum.white@co.polk.tx.us',
    },
    links: {
      appraisalDistrictUrl: 'https://polkcad.org',
      taxOfficeUrl: 'https://newtools.cira.state.tx.us/page/polk.County.Assessor.Collector',
      propertySearchUrl: 'https://esearch.polkcad.org/',
      paymentUrl: 'https://polk-tax.com',
      protestUrl: 'https://polkcad.org/portal',
      exemptionUrl: 'https://polkcad.org/forms',
    },
    lastVerifiedAt: '2026-08-25',
    sourceUrls: [
      'https://comptroller.texas.gov/taxes/property-tax/county-directory/polk.php',
      'https://polkcad.org',
      'https://esearch.polkcad.org/',
      'https://newtools.cira.state.tx.us/page/polk.County.Assessor.Collector',
    ],
  },
  mason: {
    appraisalDistrict: {
      name: 'Christel B. Lively',
      websiteUrl: 'https://masoncad.org',
      phone: '325-347-5989',
      address: '110 Moody St., Mason, TX 76856',
      email: 'christel@masoncadtx.com',
    },
    taxOffice: {
      name: 'Joe Lancaster',
      websiteUrl: 'https://www.co.mason.tx.us/page/mason.County.Assessor.Collector',
      phone: '325-347-6937',
      address: '205 Westmoreland St., Mason, TX 76856',
      email: 'joe.lancaster@co.mason.tx.us',
    },
    links: {
      appraisalDistrictUrl: 'https://masoncad.org',
      taxOfficeUrl: 'https://www.co.mason.tx.us/page/mason.County.Assessor.Collector',
      propertySearchUrl: 'https://esearch.masoncad.org/',
      protestUrl: 'https://eprotest.masoncad.org/',
    },
    lastVerifiedAt: '2026-08-25',
    sourceUrls: [
      'https://comptroller.texas.gov/taxes/property-tax/county-directory/mason.php',
      'https://masoncad.org',
      'https://esearch.masoncad.org/',
      'https://www.co.mason.tx.us/page/mason.County.Assessor.Collector',
    ],
  },
  haskell: {
    appraisalDistrict: {
      name: 'Jamie Ferguson',
      websiteUrl: 'https://www.haskellcad.com',
      phone: '940-864-3805',
      address: '604 N. 1st St., Haskell, TX 79521-5616',
      email: 'jferguson@haskellcad.com',
    },
    taxOffice: {
      name: 'Connie Benton',
      websiteUrl: 'https://www.haskellcountytx.gov/page/haskell.County.Assessor.Collector',
      phone: '940-864-2181',
      address: '1 Avenue D, Room 1, Haskell, TX 79521-5917',
      email: 'haskellcountytax@wtxs.net',
    },
    links: {
      appraisalDistrictUrl: 'https://www.haskellcad.com',
      taxOfficeUrl: 'https://www.haskellcountytx.gov/page/haskell.County.Assessor.Collector',
    },
    lastVerifiedAt: '2026-08-25',
    sourceUrls: [
      'https://comptroller.texas.gov/taxes/property-tax/county-directory/haskell.php',
      'https://www.haskellcad.com',
      'https://www.haskellcountytx.gov/page/haskell.County.Assessor.Collector',
    ],
  },
};
