export type LocalHomeAffordabilityProfile = {
  slug: string;
  path: string;
  name: string;
  kind: 'city' | 'county';
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
  relatedLocalCalculators?: readonly { name: string; path: string }[];
  faqs: readonly { question: string; answer: string }[];
};

function profile(input: {
  slug: string;
  name: string;
  kind?: 'city' | 'county';
  context: string;
  propertyTaxHref: string;
  propertyTaxLabel: string;
  relocationHref: string;
  relocationLabel: string;
  planningPoints: readonly string[];
  relatedLocalCalculators?: readonly { name: string; path: string }[];
}): LocalHomeAffordabilityProfile {
  const {
    slug,
    name,
    kind = 'city',
    context,
    propertyTaxHref,
    propertyTaxLabel,
    relocationHref,
    relocationLabel,
    planningPoints,
    relatedLocalCalculators,
  } = input;
  const path = `/texas-home-affordability-calculator/${slug}`;
  return {
    slug,
    path,
    name,
    kind,
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
    relatedLocalCalculators,
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

function countyProfile(input: {
  slug: string;
  name: string;
  countySlug: string;
  context: string;
  relatedLocalCalculators?: readonly { name: string; path: string }[];
}): LocalHomeAffordabilityProfile {
  const { slug, name, countySlug, context, relatedLocalCalculators } = input;
  return profile({
    slug,
    name,
    kind: 'county',
    context,
    propertyTaxHref: `/property-tax-calculator/${slug}`,
    propertyTaxLabel: `${name} property-tax calculator`,
    relocationHref: `/county/${countySlug}`,
    relocationLabel: `${name} guide`,
    relatedLocalCalculators,
    planningPoints: [
      `Start with the exact ${name} parcel and verify its school district, municipality and special districts before estimating property taxes.`,
      'Replace generic insurance, HOA, utility and maintenance assumptions with property-specific numbers before setting a purchase-price target.',
      'Compare the monthly housing result with closing cash, emergency reserves, transportation and other recurring household obligations.',
    ],
  });
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
  countyProfile({
    slug: 'harris-county',
    name: 'Harris County',
    countySlug: 'harris',
    context: 'Harris County spans Houston, other incorporated cities and extensive unincorporated areas. School districts, municipal boundaries, MUDs, emergency-service districts, flood-control and other taxing units can change the monthly ownership picture by parcel, and insurance exposure should be priced for the exact property.',
    relatedLocalCalculators: [{ name: 'Houston', path: '/texas-home-affordability-calculator/houston' }],
  }),
  countyProfile({
    slug: 'dallas-county',
    name: 'Dallas County',
    countySlug: 'dallas',
    context: 'Dallas County contains Dallas, Irving, Garland and other municipalities with multiple school districts and local taxing boundaries. A county label narrows the search, but the exact parcel still controls the tax stack, insurance assumptions and repeated transportation costs that belong in an affordability decision.',
    relatedLocalCalculators: [{ name: 'Dallas', path: '/texas-home-affordability-calculator/dallas' }],
  }),
  countyProfile({
    slug: 'tarrant-county',
    name: 'Tarrant County',
    countySlug: 'tarrant',
    context: 'Tarrant County includes Fort Worth, Arlington and a large suburban network where school-district, municipal and special-district boundaries differ across nearby addresses. Buyers should model those parcel costs together with insurance, HOA and transportation rather than relying on one countywide ownership estimate.',
    relatedLocalCalculators: [{ name: 'Fort Worth', path: '/texas-home-affordability-calculator/fort-worth' }],
  }),
  countyProfile({
    slug: 'bexar-county',
    name: 'Bexar County',
    countySlug: 'bexar',
    context: 'Bexar County includes San Antonio plus incorporated and unincorporated communities served by different school, municipal and special-purpose districts. The right affordability scenario therefore starts with the parcel and then adds its actual tax, insurance, utility and neighborhood obligations.',
    relatedLocalCalculators: [{ name: 'San Antonio', path: '/texas-home-affordability-calculator/san-antonio' }],
  }),
  countyProfile({
    slug: 'travis-county',
    name: 'Travis County',
    countySlug: 'travis',
    context: 'Travis County includes Austin and surrounding communities where city limits, school districts, emergency-service districts, utility arrangements and other local boundaries can shift across addresses. Model the exact parcel before comparing the apparent affordability of neighborhoods on purchase price alone.',
    relatedLocalCalculators: [{ name: 'Austin', path: '/texas-home-affordability-calculator/austin' }],
  }),
  countyProfile({
    slug: 'collin-county',
    name: 'Collin County',
    countySlug: 'collin',
    context: 'Collin County includes fast-growing communities such as Plano, McKinney, Allen and part of Frisco. School, city, MUD and other local boundaries can change across subdivisions, so property taxes, HOA costs, insurance and commute patterns should all be verified for the specific address.',
    relatedLocalCalculators: [{ name: 'Frisco', path: '/texas-home-affordability-calculator/frisco' }],
  }),
  countyProfile({
    slug: 'denton-county',
    name: 'Denton County',
    countySlug: 'denton',
    context: 'Denton County crosses a dense North Texas patchwork of cities, school districts and special-purpose jurisdictions, including part of Frisco and other rapidly growing communities. The exact address determines which local costs belong in the monthly affordability model.',
    relatedLocalCalculators: [{ name: 'Frisco', path: '/texas-home-affordability-calculator/frisco' }],
  }),
  countyProfile({
    slug: 'fort-bend-county',
    name: 'Fort Bend County',
    countySlug: 'fort-bend',
    context: 'Fort Bend County combines incorporated communities, Houston-area addresses and extensive municipal utility district coverage. MUDs, school districts, city boundaries, insurance and commuting choices can materially change recurring ownership costs, making parcel-level verification especially important.',
    relatedLocalCalculators: [{ name: 'Houston', path: '/texas-home-affordability-calculator/houston' }],
  }),
  countyProfile({
    slug: 'montgomery-county',
    name: 'Montgomery County',
    countySlug: 'montgomery',
    context: 'Montgomery County includes incorporated communities and substantial unincorporated growth north of Houston. School, emergency-service and municipal utility districts can add different local tax obligations, while commute, insurance, utilities and HOA costs can vary sharply by development.',
    relatedLocalCalculators: [{ name: 'Houston', path: '/texas-home-affordability-calculator/houston' }],
  }),
  countyProfile({
    slug: 'williamson-county',
    name: 'Williamson County',
    countySlug: 'williamson',
    context: 'Williamson County includes rapidly growing communities north of Austin where city, school, MUD and emergency-service district boundaries can differ across nearby subdivisions. Buyers should combine the parcel tax stack with insurance, HOA, utility and transportation costs before setting a target purchase price.',
    relatedLocalCalculators: [{ name: 'Austin', path: '/texas-home-affordability-calculator/austin' }],
  }),
  countyProfile({
    slug: 'el-paso-county',
    name: 'El Paso County',
    countySlug: 'el-paso',
    context: 'El Paso County includes the City of El Paso and surrounding communities with different school, municipal and other local taxing jurisdictions. A useful affordability comparison keeps those parcel taxes alongside insurance, utilities, maintenance, transportation and the cash required at closing.',
    relatedLocalCalculators: [{ name: 'El Paso', path: '/texas-home-affordability-calculator/el-paso' }],
  }),
  countyProfile({
    slug: 'hidalgo-county',
    name: 'Hidalgo County',
    countySlug: 'hidalgo',
    context: 'Hidalgo County spans multiple Rio Grande Valley cities, school districts and special-purpose taxing units. Because those boundaries and recurring property costs vary by address, buyers should use the parcel record and property-specific insurance and household-cost estimates rather than a countywide affordability shortcut.',
  }),
] as const;

export const LOCAL_HOME_AFFORDABILITY_PROFILE_BY_SLUG = new Map(
  LOCAL_HOME_AFFORDABILITY_PROFILES.map((item) => [item.slug, item]),
);
