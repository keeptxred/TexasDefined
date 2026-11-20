/**
 * Independently verified LOCAL context, not a replacement for the Comptroller
 * import. Proposed-rate notice figures must not be treated as final levies.
 * Last editorial document review: November 20, 2026, including Wharton County's
 * five-year Tax Code 26.16 summary, adopted 2026 rates and 2023/2024 unit worksheets.
 */
export const westWhartonHospitalDistrict = {
  slug: 'west-wharton-county-hospital-district',
  officialTaxingUnitId: '241-201-11',
  lastVerified: '2026-11-20',
  currentWorkbookYear: 2025,
  priorYear: 2024,
  // Wharton County Tax Assessor-Collector's October 2026 adopted entity-rate table.
  // Independent local observation; do not inject into the 2025 Comptroller workbook.
  localAdopted2026: {
    year: 2026,
    totalRate: 0.23210,
    maintenanceOperationsRate: 0.23210,
    debtServiceRate: 0,
    // Wharton County's 2026 Tax Code 26.16 five-year summary, page 3.
    noNewRevenueRate: 0.23633,
    voterApprovalRate: 0.25913,
  },
  county2023Reconciliation: {
    year: 2023,
    countyFiveYearSummaryRate: 0.20550,
    comptrollerImportedTotalRate: 0.21897,
    county2024Worksheet2023AdoptedRate: 0.20550,
    county2023Worksheet2022AdoptedRate: 0.21897,
  },
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
    countyRateIndex: 'https://www.co.wharton.tx.us/page/wharton.tax.rate',
    county2026AdoptedTable: 'https://www.co.wharton.tx.us/upload/page/7029/docs/Tax%20Office/2026%20Tax%20Rates.pdf',
    countyFiveYearSummary: 'https://www.co.wharton.tx.us/upload/page/7029/docs/Tax%20Office/2026%205%20Year%20Summary.pdf',
    county2024UnitWorksheet: 'https://www.co.wharton.tx.us/upload/page/7029/docs/Tax%20Office/Worksheets/HospitalDist%20West%20Wharton/2024%20WWHD.pdf',
    county2023UnitWorksheet: 'https://www.co.wharton.tx.us/upload/page/7029/docs/Tax%20Office/Worksheets/HospitalDist%20West%20Wharton/2023%20WWHD.pdf',
  },
} as const;
