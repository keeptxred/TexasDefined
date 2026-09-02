export type LocalCostOfLivingProfile = {
  slug: string;
  path: string;
  name: string;
  seoTitle: string;
  title: string;
  description: string;
  intro: string;
  localContext: string;
  planningPoints: readonly string[];
  propertyTaxHref: string;
  propertyTaxLabel: string;
  affordabilityHref: string;
  affordabilityLabel: string;
  homeownershipHref: string;
  insuranceHref: string;
  mortgageHref: string;
  relocationHref: string;
  relocationLabel: string;
  faqs: readonly { question: string; answer: string }[];
};

function profile(input: {
  slug: string;
  name: string;
  localContext: string;
  planningPoints: readonly string[];
  propertyTaxHref: string;
  propertyTaxLabel: string;
  affordabilityHref: string;
  homeownershipHref: string;
  insuranceHref: string;
  mortgageHref: string;
  relocationHref: string;
  relocationLabel: string;
}): LocalCostOfLivingProfile {
  const path = `/texas-cost-of-living-calculator/${input.slug}`;
  return {
    ...input,
    path,
    title: `${input.name} cost of living calculator`,
    seoTitle: `${input.name} Cost of Living Calculator | Texas Defined`,
    description: `Compare a current household budget with a possible ${input.name} budget using your own housing, transportation, utilities, insurance, food and recurring-cost assumptions instead of a citywide average.`,
    intro: `Use this ${input.name} cost-of-living planner to compare the household you have now with the household you are considering after a move. Enter the monthly costs that actually apply to you rather than relying on a single city index.`,
    affordabilityLabel: `${input.name} home affordability calculator`,
    faqs: [
      {
        question: `Does this ${input.name} calculator use a citywide cost-of-living average?`,
        answer: 'No. It is an adjustable household-budget comparison. Enter the housing, transportation, utilities, insurance, food and other recurring costs that fit the addresses and lifestyle you are actually comparing.',
      },
      {
        question: `What should I verify before moving to ${input.name}?`,
        answer: 'Verify the actual housing payment or rent, property-tax jurisdictions if buying, insurance quotes, utility setup, commute, parking or tolls, childcare or school costs, and recurring neighborhood or HOA charges tied to the location.',
      },
      {
        question: 'How should I compare a new salary with the new budget?',
        answer: 'Compare monthly take-home pay after taxes and deductions with the target household budget. A higher gross salary does not automatically create more spendable income if housing, transportation or other recurring costs rise after the move.',
      },
    ],
  };
}

export const LOCAL_COST_OF_LIVING_PROFILES: readonly LocalCostOfLivingProfile[] = [
  profile({
    slug: 'houston',
    name: 'Houston',
    localContext: 'Houston-area household costs can change materially by address because the metro crosses multiple counties, municipalities, school districts, utility arrangements and special districts. Flood exposure, insurance, toll-road use and commute distance can also change the recurring budget even when two homes share a Houston mailing address.',
    planningPoints: [
      'For buyers, identify the exact parcel taxing units and get property-specific homeowners and flood-insurance quotes where relevant.',
      'Compare commute distance, toll roads, parking and vehicle needs together with the housing cost rather than treating transportation as fixed.',
      'Verify electricity, water, gas, trash and internet arrangements for the exact address or lease before finalizing the monthly budget.',
    ],
    propertyTaxHref: '/property-tax-calculator/houston',
    propertyTaxLabel: 'Houston property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/houston',
    homeownershipHref: '/texas-homeownership-cost-calculator/houston',
    insuranceHref: '/texas-home-insurance-calculator/houston',
    mortgageHref: '/texas-mortgage-calculator/houston',
    relocationHref: '/article/moving-to-houston-address-checklist',
    relocationLabel: 'Houston address-level relocation guide',
  }),
  profile({
    slug: 'austin',
    name: 'Austin',
    localContext: 'Austin-area moves often compare addresses across Travis, Williamson and Hays counties. Housing, school-district boundaries, utility territories, property taxes and commute patterns can vary across the metro, so a household budget should be rebuilt around the actual neighborhood instead of a single Austin index.',
    planningPoints: [
      'If buying, verify the parcel county, school district, municipality and any special districts before estimating taxes.',
      'Compare the commute, parking and toll pattern attached to each neighborhood with the housing savings or premium.',
      'Use the actual utility provider, insurance quote and HOA or recurring neighborhood charges for the address you are considering.',
    ],
    propertyTaxHref: '/property-tax-calculator/austin',
    propertyTaxLabel: 'Austin property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/austin',
    homeownershipHref: '/texas-homeownership-cost-calculator/austin',
    insuranceHref: '/texas-home-insurance-calculator/austin',
    mortgageHref: '/texas-mortgage-calculator/austin',
    relocationHref: '/article/moving-to-austin-guide',
    relocationLabel: 'Moving to Austin guide',
  }),
  profile({
    slug: 'dallas',
    name: 'Dallas',
    localContext: 'Dallas household costs need an address-level view inside a much larger DFW market. City and school boundaries, county, toll-road access, commute distance, property taxes, insurance and utilities can differ across nearby neighborhoods and suburbs, so the city name alone does not define the monthly budget.',
    planningPoints: [
      'For a purchase, start with the parcel record and identify the county, school, city and other taxing units that actually apply.',
      'Model tolls, parking, vehicle miles and commute time alongside housing rather than assuming transportation stays unchanged.',
      'Use the actual insurance, utility and HOA or neighborhood charges for the property or lease being compared.',
    ],
    propertyTaxHref: '/property-tax-calculator/dallas-county',
    propertyTaxLabel: 'Dallas County property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/dallas',
    homeownershipHref: '/texas-homeownership-cost-calculator/dallas',
    insuranceHref: '/texas-home-insurance-calculator/dallas',
    mortgageHref: '/texas-mortgage-calculator/dallas',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
  }),
  profile({
    slug: 'fort-worth',
    name: 'Fort Worth',
    localContext: 'Fort Worth-area budgets can shift across Tarrant County and the surrounding DFW network as property-tax jurisdictions, commute patterns, utilities, insurance and HOA costs change by address. Compare the exact housing and transportation scenario instead of applying one metro-wide cost percentage.',
    planningPoints: [
      'Verify parcel taxing units and recurring ownership charges before comparing a Fort Worth purchase with another DFW address.',
      'Include commute distance, tolls, parking and vehicle use in the same scenario as rent or mortgage costs.',
      'Replace broad utility and insurance assumptions with quotes or provider information for the exact address.',
    ],
    propertyTaxHref: '/property-tax-calculator/tarrant-county',
    propertyTaxLabel: 'Tarrant County property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/fort-worth',
    homeownershipHref: '/texas-homeownership-cost-calculator/fort-worth',
    insuranceHref: '/texas-home-insurance-calculator/fort-worth',
    mortgageHref: '/texas-mortgage-calculator/fort-worth',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
  }),
  profile({
    slug: 'arlington',
    name: 'Arlington',
    localContext: 'Arlington sits between Dallas and Fort Worth inside Tarrant County, so a useful household budget should combine the exact housing choice with parcel-specific taxing units, insurance, utilities and the repeated DFW transportation pattern. Entertainment-district traffic, toll-road choices and commute direction can make two otherwise similar addresses produce different monthly costs.',
    planningPoints: [
      'For a purchase, verify the Tarrant County parcel, school district, City of Arlington status and every other taxing unit that applies to the address.',
      'Model the actual commute, tolls, parking and vehicle use for the work and activity corridors you expect to use most often.',
      'Use address-specific insurance, utility and HOA or neighborhood charges instead of treating Arlington as one uniform cost market.',
    ],
    propertyTaxHref: '/property-tax-calculator/tarrant-county',
    propertyTaxLabel: 'Tarrant County property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/arlington',
    homeownershipHref: '/texas-homeownership-cost-calculator/arlington',
    insuranceHref: '/texas-home-insurance-calculator/arlington',
    mortgageHref: '/texas-mortgage-calculator/arlington',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
  }),
  profile({
    slug: 'san-antonio',
    name: 'San Antonio',
    localContext: 'San Antonio-area household costs depend on the exact housing choice and local jurisdiction. School, municipal, utility and special-district boundaries can affect buyers, while commute, insurance, utilities, HOA charges and recurring services can make nearby neighborhoods produce different monthly budgets.',
    planningPoints: [
      'For buyers, verify the exact Bexar County parcel taxing units rather than using one San Antonio tax assumption.',
      'Compare commute, fuel, parking and household vehicle needs together with the housing cost.',
      'Use address-specific insurance, utilities and HOA or neighborhood fees when the move becomes concrete.',
    ],
    propertyTaxHref: '/property-tax-calculator/bexar-county',
    propertyTaxLabel: 'Bexar County property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/san-antonio',
    homeownershipHref: '/texas-homeownership-cost-calculator/san-antonio',
    insuranceHref: '/texas-home-insurance-calculator/san-antonio',
    mortgageHref: '/texas-mortgage-calculator/san-antonio',
    relocationHref: '/article/moving-to-san-antonio-guide',
    relocationLabel: 'Moving to San Antonio guide',
  }),
  profile({
    slug: 'frisco',
    name: 'Frisco',
    localContext: 'Frisco spans Collin and Denton counties, and nearby addresses can fall into different school and taxing jurisdictions. A useful cost comparison should therefore combine the exact housing scenario with parcel taxes, insurance, HOA or neighborhood charges, utilities and the repeated DFW commute.',
    planningPoints: [
      'Confirm whether the address is in Collin or Denton County and identify the school district and other taxing units if buying.',
      'Include toll-road use, commute distance and vehicle costs when comparing Frisco with other North Texas communities.',
      'Use the actual HOA, insurance and utility obligations for the neighborhood rather than a citywide estimate.',
    ],
    propertyTaxHref: '/property-tax-calculator/frisco',
    propertyTaxLabel: 'Frisco property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/frisco',
    homeownershipHref: '/texas-homeownership-cost-calculator/frisco',
    insuranceHref: '/texas-home-insurance-calculator/frisco',
    mortgageHref: '/texas-mortgage-calculator/frisco',
    relocationHref: '/article/moving-to-dallas-fort-worth-guide',
    relocationLabel: 'Dallas–Fort Worth relocation guide',
  }),
  profile({
    slug: 'el-paso',
    name: 'El Paso',
    localContext: 'El Paso cost planning still works best from the household outward. Housing, property taxes for buyers, insurance, utilities, commute distance, vehicle use and recurring services should be entered from the actual address and lifestyle you are considering rather than inferred from one citywide score.',
    planningPoints: [
      'Use the exact lease or ownership scenario and verify parcel taxing units when buying.',
      'Build transportation from your expected commute, vehicle use, fuel and parking rather than a generic city allowance.',
      'Replace utility and insurance assumptions with local provider information and property-specific quotes as the move narrows.',
    ],
    propertyTaxHref: '/property-tax-calculator/el-paso-county',
    propertyTaxLabel: 'El Paso County property-tax calculator',
    affordabilityHref: '/texas-home-affordability-calculator/el-paso',
    homeownershipHref: '/texas-homeownership-cost-calculator/el-paso',
    insuranceHref: '/texas-home-insurance-calculator/el-paso',
    mortgageHref: '/texas-mortgage-calculator/el-paso',
    relocationHref: '/article/moving-to-el-paso-guide',
    relocationLabel: 'Moving to El Paso guide',
  }),
];

export const LOCAL_COST_OF_LIVING_PROFILE_BY_SLUG = new Map(LOCAL_COST_OF_LIVING_PROFILES.map((item) => [item.slug, item] as const));