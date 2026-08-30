export type LocalHomeAffordabilityProfile = {
  slug: string;
  path: string;
  name: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  housingContext: string;
  planningPoints: readonly string[];
  propertyTaxHref: string;
  propertyTaxLabel: string;
  relocationHref: string;
  relocationLabel: string;
  faqs: readonly { question: string; answer: string }[];
};

function profile(input: {
  slug: string;
  name: string;
  context: string;
  propertyTaxHref: string;
  propertyTaxLabel: string;
  relocationHref: string;
  relocationLabel: string;
  planningPoints: readonly string[];
}): LocalHomeAffordabilityProfile {
  const { slug, name, context, propertyTaxHref, propertyTaxLabel, relocationHref, relocationLabel, planningPoints } = input;
  const path = `/texas-home-affordability-calculator/${slug}`;
  return {
    slug,
    path,
    name,
    eyebrow: `${name} home affordability`,
    title: `${name} home affordability calculator`,
    seoTitle: `${name} Home Affordability Calculator | Texas Defined`,
    description: `Estimate a possible ${name} home-price range using household income, monthly debt, down payment, interest rate, and your own local tax and insurance assumptions.`,
    intro: `Use this ${name} calculator to pressure-test a home-price range before you shop. It keeps income, monthly debt, down payment, financing and recurring ownership costs visible instead of treating purchase price as the only affordability question.`,
    housingContext: context,
    planningPoints,
    propertyTaxHref,
    propertyTaxLabel,
    relocationHref,
    relocationLabel,
    faqs: [
      {
        question: `Is this ${name} affordability calculator a mortgage approval?`,
        answer: 'No. It is an early planning tool. A lender will use verified income, debts, credit, loan-program rules, reserves and property-specific underwriting before making a credit decision.',
      },
      {
        question: `What local costs should I verify for a ${name} home?`,
        answer: 'Verify the parcel-specific property-tax jurisdictions, homeowners insurance, HOA charges when applicable, utilities, maintenance and any other recurring cost tied to the exact property.',
      },
      {
        question: 'Why should I run more than one scenario?',
        answer: 'Changing the home price, down payment, interest rate or recurring ownership costs can materially change both the monthly payment and the cash left after closing. Comparing several scenarios makes the tradeoffs easier to see.',
      },
    ],
  };
}

export const LOCAL_HOME_AFFORDABILITY_PROFILES: readonly LocalHomeAffordabilityProfile[] = [
  profile({
    slug: 'houston',
    name: 'Houston',
    context: 'Houston-area affordability is highly address-specific because property-tax jurisdictions, insurance exposure, utility arrangements, commuting patterns and HOA or special-district costs can change across the metro. Replace the calculator defaults with the numbers for the exact property you are considering.',
    propertyTaxHref: '/property-tax-calculator/houston',
    propertyTaxLabel: 'Houston property-tax calculator',
    relocationHref: '/article/moving-to-houston-address-checklist',
    relocationLabel: 'Houston address-level relocation guide',
    planningPoints: [
      'Verify the parcel county, school district, municipality and special districts before estimating property taxes.',
      'Get a property-specific homeowners insurance quote rather than assuming a metro-wide premium.',
      'Budget for the repeated commute, utilities and HOA or neighborhood costs that come with the exact address.',
    ],
  }),
  profile({
    slug: 'austin',
    name: 'Austin',
    context: 'Austin-area buyers often compare addresses across Travis, Williamson and Hays counties. City limits, school districts, utility territories and special districts can differ by parcel, so local ownership costs should be verified before treating a home-price estimate as affordable.',
    propertyTaxHref: '/property-tax-calculator/austin',
    propertyTaxLabel: 'Austin property-tax calculator',
    relocationHref: '/article/moving-to-austin-guide',
    relocationLabel: 'Moving to Austin guide',
    planningPoints: [
      'Identify the parcel county and taxing units before estimating monthly property taxes.',
      'Use the exact property insurance quote and HOA amount when comparing neighborhoods.',
      'Compare the housing payment with the commute and utility pattern attached to the address, not just the asking price.',
    ],
  }),
  profile({
    slug: 'dallas',
    name: 'Dallas',
    context: 'Dallas affordability should be tested at the address level because school, city and special-district boundaries can change the recurring cost of ownership. Use the county calculator as a starting point, then verify the taxing units and other property-specific costs before relying on the result.',
    propertyTaxHref: '/property-tax-calculator/dallas-county',
    propertyTaxLabel: 'Dallas County property-tax calculator',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
    planningPoints: [
      'Confirm whether the property is in Dallas County and use the parcel record to identify every taxing unit.',
      'Add insurance, HOA and maintenance assumptions based on the actual property rather than a city average.',
      'Pressure-test the monthly payment against the commute and transportation pattern you would use most often.',
    ],
  }),
  profile({
    slug: 'fort-worth',
    name: 'Fort Worth',
    context: 'Fort Worth-area ownership costs depend on the parcel, not the metro label. County, school, municipal and special-district taxes can vary, while insurance, HOA costs and commute choices add another layer to the monthly budget.',
    propertyTaxHref: '/property-tax-calculator/tarrant-county',
    propertyTaxLabel: 'Tarrant County property-tax calculator',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
    planningPoints: [
      'Start with the parcel county and school district, then verify every local taxing unit.',
      'Replace the calculator insurance assumption with a quote for the exact home and coverage level.',
      'Compare housing cost with repeated transportation, utility and HOA expenses before setting a target price.',
    ],
  }),
  profile({
    slug: 'san-antonio',
    name: 'San Antonio',
    context: 'San Antonio-area affordability can change with school, municipal, utility and special-district boundaries. A useful estimate combines the home-price scenario with parcel-specific property taxes, insurance and the other recurring costs attached to the exact address.',
    propertyTaxHref: '/property-tax-calculator/bexar-county',
    propertyTaxLabel: 'Bexar County property-tax calculator',
    relocationHref: '/article/moving-to-san-antonio-guide',
    relocationLabel: 'Moving to San Antonio guide',
    planningPoints: [
      'Verify the parcel taxing units instead of applying one San Antonio-wide property-tax assumption.',
      'Include the insurance, HOA and utility costs tied to the address you are comparing.',
      'Run a lower-price scenario to see how much monthly and upfront cushion you keep after closing.',
    ],
  }),
  profile({
    slug: 'frisco',
    name: 'Frisco',
    context: 'Frisco spans Collin and Denton counties, and school-district boundaries can differ by address. That makes parcel-level tax selection especially important when turning a target purchase price into a realistic monthly ownership budget.',
    propertyTaxHref: '/property-tax-calculator/frisco',
    propertyTaxLabel: 'Frisco property-tax calculator',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
    planningPoints: [
      'Confirm whether the parcel is in Collin or Denton County before estimating property taxes.',
      'Verify the school district and any other taxing units shown on the appraisal or tax record.',
      'Include HOA, insurance, utilities and the repeated commute in the same affordability decision.',
    ],
  }),
  profile({
    slug: 'el-paso',
    name: 'El Paso',
    context: 'El Paso affordability still needs a property-specific view. Property taxes, insurance, utilities, maintenance and transportation costs all belong in the same monthly budget, even when the purchase price itself appears manageable.',
    propertyTaxHref: '/property-tax-calculator/el-paso-county',
    propertyTaxLabel: 'El Paso County property-tax calculator',
    relocationHref: '/article/moving-to-el-paso-guide',
    relocationLabel: 'Moving to El Paso guide',
    planningPoints: [
      'Use the parcel record to verify the county, school, city and other taxing units that apply.',
      'Replace generic insurance and utility assumptions with property-specific estimates when possible.',
      'Leave room for maintenance, moving costs and cash reserves instead of using the calculator result as a maximum target.',
    ],
  }),
] as const;

export const LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG = new Map(
  LOCAL_HOME_AFFORDABILITY_PROFILES.map((item) => [item.slug, item]),
);
