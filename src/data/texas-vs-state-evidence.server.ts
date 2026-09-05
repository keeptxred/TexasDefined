import type { TexasVsStateEvidence } from "./texas-vs-states-index";

const VERIFIED_AT = "2026-09-05";
const MAX_EVIDENCE_AGE_DAYS = 120;

const TEXAS_COMMON_SOURCES = [
  {
    label: "Texas state income-tax context",
    organization: "Texas Comptroller of Public Accounts",
    url: "https://comptroller.texas.gov/economy/fiscal-notes/industry/2025/small-biz-info/",
    checkedAt: VERIFIED_AT,
  },
  {
    label: "Texas housing benchmark",
    organization: "U.S. Census Bureau QuickFacts",
    url: "https://www.census.gov/quickfacts/fact/table/TX/HSG495224",
    checkedAt: VERIFIED_AT,
  },
  {
    label: "Texas multimodal and interstate context",
    organization: "Texas Department of Transportation",
    url: "https://www.txdot.gov/projects/planning/utp/multimodal-programs.html",
    checkedAt: VERIFIED_AT,
  },
] as const;

const EVIDENCE_BY_STATE: Record<string, TexasVsStateEvidence> = {
  Tennessee: {
    taxLens: "Texas and Tennessee are unusually close on earned-income taxation. Texas does not levy a state personal income tax, while the Tennessee Department of Revenue says Tennessee has no state income tax on earned income and therefore no wage-withholding requirement; Tennessee's former Hall tax on interest and dividends was fully repealed beginning January 1, 2021. That makes property taxes, sales taxes, insurance and local costs more important than a simple income-tax comparison.",
    housingLens: "The Census Bureau's 2020-2024 QuickFacts estimates put Tennessee's median owner-occupied home value at $286,700, median gross rent at $1,189 and owner-occupancy rate at 66.9%. Texas was $283,800, $1,403 and 62.6%, respectively. Those statewide figures suggest similar median owner values but materially lower median rent in Tennessee; Nashville, Memphis, Knoxville and individual Texas metros can differ sharply from their state averages.",
    jobsLens: "Tennessee's Department of Labor and Workforce Development reported a seasonally adjusted unemployment rate of 3.4% for July 2026, its lowest in two years. Employers had added 21,300 nonfarm jobs over the prior year, led by health care and social assistance, administrative/support/waste services and durable-goods manufacturing. A move decision should still compare the same occupation and metro in Tennessee with the actual Texas labor market under consideration.",
    transportationLens: "Tennessee's transportation system is compact relative to Texas but still statewide: TDOT reports 1,201 interstate miles, 14,463 state-maintained highway miles, 28 transit systems serving all 95 counties, 70 general-aviation airports and six commercial airports. Texas has more than 3,400 centerline miles of interstate alone. For Nashville, Memphis or Knoxville versus Dallas-Fort Worth, Houston, Austin or San Antonio, the practical difference is often trip length, airport access and whether daily life requires crossing a much larger metro or region.",
    hazardLens: "Tennessee Emergency Management identifies flood, severe weather, tornadoes, earthquakes, wildfire and extreme temperatures among the state's prime hazards. Texas has its own location-specific insurance exposures; the Texas Department of Insurance warns that many Gulf Coast home policies do not include wind and hail and that most home policies do not cover flood damage. Compare actual homeowners, wind/hail and flood quotes for the two addresses instead of assuming one state's insurance cost from a statewide average.",
    faq: [
      {
        q: "Does moving from Tennessee to Texas eliminate state income tax?",
        a: "Not on earned individual income: Tennessee already has no state income tax on earned income, and its former Hall tax was repealed beginning in 2021. Texas also has no state personal income tax, so the household comparison should shift to property taxes, sales taxes, insurance, housing and local costs.",
      },
      {
        q: "Are Tennessee homes cheaper than Texas homes?",
        a: "The Census Bureau's 2020-2024 statewide medians are close for owner-occupied home value: $286,700 in Tennessee and $283,800 in Texas. Median gross rent was lower in Tennessee at $1,189 versus $1,403 in Texas, but metro and neighborhood comparisons matter more than the statewide median.",
      },
      {
        q: "What Tennessee-to-Texas job markets should I compare?",
        a: "Start with the same occupation in the actual metros you would choose. Tennessee reported 3.4% unemployment in July 2026, while its recent job gains were led by health care/social assistance and several service and manufacturing categories. Compare wages, openings and commute patterns in Nashville, Memphis or Knoxville against the relevant Texas metro.",
      },
    ],
    sources: [
      ...TEXAS_COMMON_SOURCES,
      {
        label: "Tennessee earned-income tax withholding",
        organization: "Tennessee Department of Revenue",
        url: "https://revenue.support.tn.gov/hc/en-us/articles/360057595051-GEN-34-Income-Tax-Withholding",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Tennessee housing benchmark",
        organization: "U.S. Census Bureau QuickFacts",
        url: "https://www.census.gov/quickfacts/fact/table/TN/HSG495223",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Tennessee July 2026 employment",
        organization: "Tennessee Department of Labor and Workforce Development",
        url: "https://www.tn.gov/workforce/general-resources/news/2026/8/20/tennessee-unemployment-rate-falls-to-two-year-low-of-3-4.html",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Tennessee transportation system overview",
        organization: "Tennessee Department of Transportation",
        url: "https://www.tn.gov/tdot/about/transportation-system-overview.html",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Tennessee hazard profile",
        organization: "Tennessee Emergency Management Agency",
        url: "https://www.tn.gov/tema/prepare/tennessee-threats.html",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Texas hurricane-season insurance guidance",
        organization: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/news/2026/tdi05282026.html",
        checkedAt: VERIFIED_AT,
      },
    ],
    lastVerifiedAt: VERIFIED_AT,
  },
  Georgia: {
    taxLens: "The 2026 income-tax difference is concrete: the Georgia Department of Revenue says Georgia's individual income tax is a flat 4.99%, while Texas has no state personal income tax. That can matter for wage earners, but it is not a complete tax-burden answer. Compare property taxes, sales taxes, insurance, housing and any local taxes at the actual Georgia and Texas addresses before treating the income-tax difference as household savings.",
    housingLens: "Census 2020-2024 QuickFacts estimates put Georgia's median owner-occupied home value at $303,300, median gross rent at $1,393 and owner-occupancy at 65.7%. Texas was $283,800, $1,403 and 62.6%. At the statewide level Georgia's median owner value was higher while median rent was nearly the same, but Atlanta and its suburbs should be compared with a specific Texas metro rather than with the Texas statewide median.",
    jobsLens: "Georgia's Department of Labor reported a 3.3% unemployment rate in July 2026 and record highs for both the labor force, 5,480,790, and employment, 5,301,774. Those statewide records are useful context, not a substitute for occupation-level pay and openings. An Atlanta-to-Texas decision should compare the same role across Dallas-Fort Worth, Houston, Austin, San Antonio or whichever Texas market is actually under consideration.",
    transportationLens: "Georgia's transportation advantage is unusually freight-oriented. GDOT describes a 4,365-mile highway freight network connected to the Port of Savannah, the Port of Brunswick, rail, inland ports and major air-cargo facilities. Texas operates at a much larger geographic scale and has more than 3,400 interstate centerline miles. For households, the useful comparison is not network size but commute length, airport access, toll exposure and how often work or family trips cross a large metro.",
    hazardLens: "Georgia Emergency Management says tropical cyclones and coastal flooding, winter storms and river flooding recur in the state, with coastal counties exposed to hurricane storm surge and inland areas exposed to flooding, damaging winds and tornadoes. Texas has different location-specific wind, hail and flood coverage issues, especially along the Gulf Coast. Homebuyers should price insurance and deductibles for the exact Georgia and Texas properties and check flood and wind coverage separately.",
    faq: [
      {
        q: "How different are Texas and Georgia state income taxes in 2026?",
        a: "Georgia's Department of Revenue lists a flat 4.99% individual income-tax rate for 2026. Texas has no state personal income tax. The difference is meaningful for many wage earners, but total household cost still depends on property taxes, sales taxes, insurance, housing and local costs.",
      },
      {
        q: "Is housing cheaper in Texas than Georgia?",
        a: "The Census Bureau's 2020-2024 statewide median owner-occupied home value was $303,300 in Georgia and $283,800 in Texas. Median gross rent was much closer: $1,393 in Georgia and $1,403 in Texas. Atlanta-versus-Texas-metro comparisons can look very different from these statewide medians.",
      },
      {
        q: "How should I compare Atlanta with a Texas metro for work?",
        a: "Use occupation-specific wages and openings, then add commute and housing. Georgia reported 3.3% unemployment and record labor-force and employment levels in July 2026. Compare that current Atlanta-area opportunity set with Dallas-Fort Worth, Houston, Austin or San Antonio for the same role rather than relying on a statewide ranking.",
      },
    ],
    sources: [
      ...TEXAS_COMMON_SOURCES,
      {
        label: "Georgia 2026 individual income-tax rate",
        organization: "Georgia Department of Revenue",
        url: "https://dor.georgia.gov/taxes/important-tax-updates",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Georgia housing benchmark",
        organization: "U.S. Census Bureau QuickFacts",
        url: "https://www.census.gov/quickfacts/fact/table/GA/POP815223",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Georgia July 2026 employment",
        organization: "Georgia Department of Labor",
        url: "https://dol.georgia.gov/press-releases/2026-08-20/georgia-sets-new-records-labor-force-and-employment-july",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Georgia multimodal freight network",
        organization: "Georgia Department of Transportation",
        url: "https://www.dot.ga.gov/GDOT/pages/freight.aspx",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Georgia hazard profile",
        organization: "Georgia Emergency Management and Homeland Security Agency",
        url: "https://gema.georgia.gov/hazards",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Texas hurricane-season insurance guidance",
        organization: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/news/2026/tdi05282026.html",
        checkedAt: VERIFIED_AT,
      },
    ],
    lastVerifiedAt: VERIFIED_AT,
  },
  "North Carolina": {
    taxLens: "North Carolina and Texas have a clear 2026 income-tax difference. The North Carolina Department of Revenue lists a 3.99% individual income-tax rate for taxable years after 2025, while Texas has no state personal income tax. The correct household comparison still adds property taxes, sales taxes, insurance and housing because the income-tax rate by itself does not determine which location costs less.",
    housingLens: "Census 2020-2024 QuickFacts estimates put North Carolina's median owner-occupied home value at $288,900, median gross rent at $1,228 and owner-occupancy at 66.6%. Texas was $283,800, $1,403 and 62.6%. Statewide owner values were close, while North Carolina's median rent was lower; Charlotte, the Triangle, the Triad and coastal communities can diverge substantially from those state medians.",
    jobsLens: "North Carolina Commerce reported a seasonally adjusted unemployment rate of 3.6% in July 2026, with 5,051,914 people employed and total nonfarm employment of 5,112,000. Professional and business services and construction added jobs over the month while several other sectors declined. Compare the same occupation in Charlotte or the Triangle with the Texas metro you would actually choose rather than assuming the statewide rate describes every local market.",
    transportationLens: "NCDOT describes an extensive statewide highway system and its current 2025-2026 transportation map includes detailed insets for 25 major cities and regions, including Charlotte, Raleigh, the Triangle, the Triad and Wilmington. Texas covers far more distance and has more than 3,400 centerline miles of interstate. The practical relocation test is commute time, airport access, tolls and how often you need to cross the metro or state for work and family.",
    hazardLens: "North Carolina's coastal evacuation system identifies communities most vulnerable to hurricanes, tropical storms, storm surge and flooding, and North Carolina Emergency Management continues to emphasize flood insurance because standard policies may not fully cover flood damage. Texas has its own Gulf Coast wind/hail and flood coverage gaps. Compare the exact flood zone, wind coverage, deductibles and premiums for each prospective property before treating either state's statewide housing number as the real cost.",
    faq: [
      {
        q: "What is North Carolina's individual income-tax rate compared with Texas in 2026?",
        a: "North Carolina's Department of Revenue lists a 3.99% individual income-tax rate for taxable years after 2025. Texas has no state personal income tax. Property taxes, sales taxes, insurance and housing can still outweigh part of that difference for a particular household.",
      },
      {
        q: "Is North Carolina housing cheaper than Texas?",
        a: "The Census Bureau's 2020-2024 statewide median owner-occupied home values were close: $288,900 in North Carolina and $283,800 in Texas. North Carolina's median gross rent was lower at $1,228 versus $1,403 in Texas. Local comparisons such as Charlotte or Raleigh versus a specific Texas metro are more useful than the statewide averages alone.",
      },
      {
        q: "What North Carolina weather and insurance risks should I compare with Texas?",
        a: "North Carolina coastal areas face hurricane, storm-surge and flood exposure, while Texas Gulf Coast properties can require separate attention to wind/hail and flood coverage. For both states, check the exact property's flood zone, exclusions, deductibles and current insurance quotes before buying.",
      },
    ],
    sources: [
      ...TEXAS_COMMON_SOURCES,
      {
        label: "North Carolina individual income-tax rate",
        organization: "North Carolina Department of Revenue",
        url: "https://www.ncdor.gov/taxes-forms/individual-income-tax/tax-rate-schedules",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "North Carolina housing benchmark",
        organization: "U.S. Census Bureau QuickFacts",
        url: "https://www.census.gov/quickfacts/fact/table/NC/INC110223",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "North Carolina July 2026 employment",
        organization: "North Carolina Department of Commerce",
        url: "https://www.commerce.nc.gov/news/press-releases/2026/08/21/north-carolinas-july-employment-figures-released",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "North Carolina statewide transportation map",
        organization: "North Carolina Department of Transportation",
        url: "https://www.ncdot.gov/travel-maps/maps/Pages/state-transportation-map.aspx",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "North Carolina coastal evacuation and flood risk",
        organization: "North Carolina Department of Public Safety",
        url: "https://www.ncdps.gov/our-organization/emergency-management/emergency-preparedness/know-your-zone/frequently-asked-questions-about-know-your-zone",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "North Carolina September 2026 flood-insurance preparedness guidance",
        organization: "North Carolina Department of Public Safety",
        url: "https://www.ncdps.gov/news/press-releases/2026/09/04/september-national-preparedness-month-north-carolina",
        checkedAt: VERIFIED_AT,
      },
      {
        label: "Texas hurricane-season insurance guidance",
        organization: "Texas Department of Insurance",
        url: "https://www.tdi.texas.gov/news/2026/tdi05282026.html",
        checkedAt: VERIFIED_AT,
      },
    ],
    lastVerifiedAt: VERIFIED_AT,
  },
};

export function getTexasVsStateEvidence(name: string) {
  return EVIDENCE_BY_STATE[name] ?? null;
}

export function isTexasVsStateEvidenceQualified(name: string, now = new Date()) {
  const evidence = getTexasVsStateEvidence(name);
  if (!evidence) return false;

  const requiredLenses = [
    evidence.taxLens,
    evidence.housingLens,
    evidence.jobsLens,
    evidence.transportationLens,
    evidence.hazardLens,
  ];
  if (requiredLenses.some((value) => value.trim().length < 180)) return false;
  if (evidence.faq.length < 3 || evidence.faq.some((item) => item.q.length < 20 || item.a.length < 100)) return false;
  if (evidence.sources.length < 8) return false;

  const sourceHosts = new Set(
    evidence.sources.map((source) => new URL(source.url).hostname.replace(/^www\./, "")),
  );
  if (sourceHosts.size < 6) return false;
  if (evidence.sources.some((source) => source.checkedAt !== evidence.lastVerifiedAt)) return false;

  const verified = new Date(`${evidence.lastVerifiedAt}T00:00:00Z`).getTime();
  const ageDays = (now.getTime() - verified) / 86_400_000;
  return ageDays >= 0 && ageDays <= MAX_EVIDENCE_AGE_DAYS;
}

export const TEXAS_VS_EVIDENCE_QUALIFIED_STATES = Object.keys(EVIDENCE_BY_STATE).filter((name) =>
  isTexasVsStateEvidenceQualified(name),
);
