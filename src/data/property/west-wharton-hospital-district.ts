/**
 * Independently verified LOCAL context, not a replacement for the Comptroller
 * import. Proposed-rate notice figures must not be treated as final levies.
 * Last editorial document review: November 18, 2026.
 */
export const westWhartonHospitalDistrict = {
  slug: 'west-wharton-county-hospital-district',
  officialTaxingUnitId: '241-201-11',
  lastVerified: '2026-11-18',
  currentWorkbookYear: 2025,
  priorYear: 2024,
  adoptedRate2025: 0.23210, // Independently corroborated by the published statewide final rate.
  priorRate2024: 0.21710,
  noNewRevenueProposed2025: 0.21512,
  voterApprovalProposed2025: 0.23328,
  homestead: {
    priorTaxableValue: 205703,
    proposedTaxableValue: 213936,
    priorTax: 446.58,
    proposedTax: 496.55,
  },
  noticeLevy: { prior: 6940914, proposed: 8153326 },
  statewideLevy: { prior: 6798734, current: 8182353 },
  sources: {
    districtHome: 'https://www.wwchd.org/',
    districtAbout: 'https://wwchd.org/About',
    districtTaxes: 'https://www.wwchd.org/Taxes',
    districtNotice: 'https://assets.nicepagecdn.com/fefd6ff9/6557221/files/WestWhartonhospitaldistrictpublicnotice9.09.25.pdf',
    districtNotices: 'https://wwchd.org/Notices',
    comptrollerRates: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    comptrollerCounty: 'https://comptroller.texas.gov/taxes/property-tax/county-directory/wharton.php',
    taxTransparency: 'https://wharton.countytaxrates.com/tax',
    appraisal: 'https://www.whartoncad.net/',
    countyTaxOffice: 'https://www.co.wharton.tx.us/page/wharton.county.assessor.collector',
    countyEstimator: 'https://www.whartoncountytaxoffice.com/TaxEstimator',
  },
} as const;
