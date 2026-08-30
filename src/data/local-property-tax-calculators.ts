export type LocalPropertyTaxCounty = {
  name: string;
  slug: string;
};

export type LocalPropertyTaxSource = {
  name: string;
  url: string;
};

export type LocalPropertyTaxProfile = {
  slug: string;
  path: string;
  name: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  defaultCountySlug: string;
  counties: LocalPropertyTaxCounty[];
  jurisdictionNote: string;
  planningPoints: readonly string[];
  guideHref: string;
  guideLabel: string;
  sources: readonly LocalPropertyTaxSource[];
  faqs: readonly { question: string; answer: string }[];
};

const comptrollerSource: LocalPropertyTaxSource = {
  name: 'Texas Comptroller — Local Property Appraisal and Tax Information',
  url: 'https://comptroller.texas.gov/taxes/property-tax/county-directory/',
};

function countyProfile(input: {
  slug: string;
  path: string;
  name: string;
  countySlug: string;
  context: string;
}): LocalPropertyTaxProfile {
  const { slug, path, name, countySlug, context } = input;
  return {
    slug,
    path,
    name,
    eyebrow: `${name} property taxes`,
    title: `${name} property tax calculator`,
    seoTitle: `${name} Property Tax Calculator | Official Local Rates`,
    description: `Estimate ${name} property taxes using finalized county, city, school-district and selected special-district rates reported to the Texas Comptroller.`,
    intro: `${context} The county rate is only one part of a Texas property-tax bill, so this calculator keeps the parcel's school, municipal and special-district taxing units separate.`,
    defaultCountySlug: countySlug,
    counties: [{ name, slug: countySlug }],
    jurisdictionNote: `Two properties in ${name} can have different combined rates because school-district, municipal and special-district boundaries can differ by parcel.`,
    planningPoints: [
      `Keep ${name} selected and choose the school district that serves the parcel.`,
      'Select a municipality only when the property is actually inside that taxing jurisdiction.',
      'Add MUD, ESD, community-college and other special districts only when appraisal or tax records confirm parcel membership.',
    ],
    guideHref: `/county/${countySlug}`,
    guideLabel: `${name} guide`,
    sources: [comptrollerSource],
    faqs: [
      { question: `Is the ${name} tax rate my total property tax rate?`, answer: `No. The ${name} rate is one component. School, city and special-district rates may also apply to the parcel.` },
      { question: `Can two ${name} homes have different tax rates?`, answer: 'Yes. Their school, municipal and special-district memberships can differ even when both properties are in the same county.' },
      { question: 'Where should I verify the final taxing units?', answer: 'Use the parcel appraisal and tax records and the responsible local taxing offices before relying on an estimate.' },
    ],
  };
}

export const LOCAL_PROPERTY_TAX_PROFILES: readonly LocalPropertyTaxProfile[] = [
  {
    slug: 'houston',
    path: '/property-tax-calculator/houston',
    name: 'Houston',
    eyebrow: 'Houston property taxes',
    title: 'Houston property tax calculator',
    seoTitle: 'Houston Property Tax Calculator | Official Local Rates',
    description: 'Estimate Houston property taxes by selecting the county, school district, City of Houston rate when applicable, and only the special districts that serve the property.',
    intro: 'A Houston mailing address is not enough to determine a tax bill. Start with the parcel county, then match the school district, municipality and special districts that actually serve the property.',
    defaultCountySlug: '',
    counties: [
      { name: 'Harris County', slug: 'harris' },
      { name: 'Fort Bend County', slug: 'fort-bend' },
      { name: 'Montgomery County', slug: 'montgomery' },
    ],
    jurisdictionNote: 'Houston-area addresses can involve different appraisal districts, school districts, municipalities and special districts. Do not use a metro-wide average as a parcel tax rate.',
    planningPoints: [
      'Confirm the appraisal-district county for the exact parcel before choosing rates.',
      'Choose the school district and City of Houston only when those taxing units actually serve the parcel.',
      'Add MUD, ESD, flood-control, community-college and other special districts only when the property belongs to them.',
    ],
    guideHref: '/article/moving-to-houston-address-checklist',
    guideLabel: 'Houston address-level relocation guide',
    sources: [
      comptrollerSource,
      { name: 'City of Houston — Administrative Boundary Map Service', url: 'https://mycity2.houstontx.gov/pubgis02/rest/services/HoustonMap/Administrative_Boundary/MapServer' },
    ],
    faqs: [
      { question: 'Is there one Houston property tax rate?', answer: 'No. The combined rate depends on the county, school district, municipality and any special districts serving the parcel.' },
      { question: 'Does a Houston mailing address prove the property is inside Houston city limits?', answer: 'No. Verify the parcel jurisdiction before adding a city rate. Mailing-city names and taxing boundaries are not interchangeable.' },
      { question: 'Can I use the calculator for a home outside Harris County?', answer: 'Yes. Choose the county that contains the parcel, then select the taxing units reported for that county.' },
    ],
  },
  {
    slug: 'austin',
    path: '/property-tax-calculator/austin',
    name: 'Austin',
    eyebrow: 'Austin property taxes',
    title: 'Austin property tax calculator',
    seoTitle: 'Austin Property Tax Calculator | Official Local Rates',
    description: 'Estimate Austin property taxes with the parcel county, school district, City of Austin rate when applicable, and the special districts that actually serve the address.',
    intro: 'Austin city limits extend across Travis, Williamson and Hays counties. The useful estimate is therefore an address-level taxing-unit stack, not a single Austin-wide percentage.',
    defaultCountySlug: '',
    counties: [
      { name: 'Travis County', slug: 'travis' },
      { name: 'Williamson County', slug: 'williamson' },
      { name: 'Hays County', slug: 'hays' },
    ],
    jurisdictionNote: 'County, school-district, city and special-district boundaries can change the total even when two properties share an Austin mailing address.',
    planningPoints: [
      'Identify whether the parcel is in Travis, Williamson or Hays County.',
      'Select the school district and municipal rate that actually apply to the address.',
      'Check for MUD, ESD, community-college and other special-district taxes before relying on the total.',
    ],
    guideHref: '/article/moving-to-austin-guide',
    guideLabel: 'Moving to Austin guide',
    sources: [
      comptrollerSource,
      { name: 'City of Austin — jurisdictional matters', url: 'https://www.austintexas.gov/planning/annexation' },
    ],
    faqs: [
      { question: 'Is there one Austin property tax rate?', answer: 'No. The total depends on the exact county, school district, city jurisdiction and special districts serving the parcel.' },
      { question: 'Why does the calculator ask for a county first?', answer: 'Austin spans multiple counties, and the county selection determines which local taxing units can plausibly apply.' },
      { question: 'Should I add every special district shown for the county?', answer: 'No. Add only districts that actually include the parcel, as shown by appraisal and tax records.' },
    ],
  },
  {
    slug: 'frisco',
    path: '/property-tax-calculator/frisco',
    name: 'Frisco',
    eyebrow: 'Frisco property taxes',
    title: 'Frisco property tax calculator',
    seoTitle: 'Frisco Property Tax Calculator | Collin & Denton Rates',
    description: 'Estimate Frisco property taxes for Collin or Denton County using the county, City of Frisco, school-district and other taxing-unit rates that serve the property.',
    intro: 'Frisco spans Collin and Denton counties, and the school district can vary by address. Start with the parcel county and then build the actual local taxing-unit stack.',
    defaultCountySlug: '',
    counties: [
      { name: 'Collin County', slug: 'collin' },
      { name: 'Denton County', slug: 'denton' },
    ],
    jurisdictionNote: 'The City of Frisco publishes separate Collin- and Denton-county tax context and notes that multiple school districts have territory within the city. Parcel verification still controls.',
    planningPoints: [
      'Choose Collin or Denton County based on the parcel, not the mailing address alone.',
      'Select the school district serving the property; Frisco addresses are not limited to one ISD.',
      'Add only the county, city and other districts that appear on the property tax record.',
    ],
    guideHref: '/article/moving-to-dallas-fort-worth-guide',
    guideLabel: 'Dallas–Fort Worth relocation guide',
    sources: [
      comptrollerSource,
      { name: 'City of Frisco — Property Tax Rate', url: 'https://www.friscotexas.gov/153/Property-Tax-Rate' },
    ],
    faqs: [
      { question: 'Is Frisco entirely in Collin County?', answer: 'No. Frisco includes property in both Collin and Denton counties.' },
      { question: 'Does every Frisco home use Frisco ISD?', answer: 'No. The city identifies multiple school districts with territory in Frisco, so verify the parcel school district before calculating.' },
      { question: 'Can the city tax rate alone estimate my bill?', answer: 'No. A property-tax bill can include county, city, school and other district taxes.' },
    ],
  },
  {
    slug: 'harris-county',
    path: '/property-tax-calculator/harris-county',
    name: 'Harris County',
    eyebrow: 'Harris County property taxes',
    title: 'Harris County property tax calculator',
    seoTitle: 'Harris County Property Tax Calculator | Official Local Rates',
    description: 'Estimate Harris County property taxes with finalized county, city, school-district and selected special-district rates reported to the Texas Comptroller.',
    intro: 'Harris County contains many municipalities, school districts and special districts. The county rate is only one part of the bill, so the calculator keeps the parcel taxing units separate.',
    defaultCountySlug: 'harris',
    counties: [{ name: 'Harris County', slug: 'harris' }],
    jurisdictionNote: 'Two Harris County properties can have different total rates because city, school-district, MUD, ESD, flood-control, community-college and other district boundaries differ.',
    planningPoints: [
      'Keep Harris County selected and choose the school district that serves the parcel.',
      'Choose a municipality only if the parcel is actually inside that taxing jurisdiction.',
      'Use the appraisal or tax record to identify every special district before adding it.',
    ],
    guideHref: '/county/harris',
    guideLabel: 'Harris County guide',
    sources: [comptrollerSource],
    faqs: [
      { question: 'Is the Harris County tax rate my total property tax rate?', answer: 'No. The county is one taxing unit. School, city and special-district rates may also apply.' },
      { question: 'Can two Harris County homes have different tax rates?', answer: 'Yes. Their school, municipal and special-district memberships can differ.' },
      { question: 'Where should I verify the final taxing units?', answer: 'Use the parcel appraisal and tax records and the responsible local offices before relying on an estimate.' },
    ],
  },
  {
    slug: 'collin-county',
    path: '/property-tax-calculator/collin-county',
    name: 'Collin County',
    eyebrow: 'Collin County property taxes',
    title: 'Collin County property tax calculator',
    seoTitle: 'Collin County Property Tax Calculator | Official Local Rates',
    description: 'Estimate Collin County property taxes using finalized county, city, school-district and selected special-district rates reported to the Texas Comptroller.',
    intro: 'Collin County includes fast-growing cities and multiple school and special-district boundaries. The calculator starts with the county and then builds the local taxing units for the exact property.',
    defaultCountySlug: 'collin',
    counties: [{ name: 'Collin County', slug: 'collin' }],
    jurisdictionNote: 'A Collin County address in Frisco, Plano, McKinney, Allen or another community can have a different school, municipal and special-district stack from another parcel nearby.',
    planningPoints: [
      'Keep Collin County selected and choose the parcel school district.',
      'Select the municipality that actually taxes the property, if any.',
      'Add special districts only when the appraisal or tax record confirms membership.',
    ],
    guideHref: '/county/collin',
    guideLabel: 'Collin County guide',
    sources: [comptrollerSource],
    faqs: [
      { question: 'Is there one Collin County property tax rate?', answer: 'No. The county rate is only one component of the combined local tax rate.' },
      { question: 'Why can neighboring Collin County homes have different bills?', answer: 'School, city and special-district boundaries can differ by parcel, in addition to differences in taxable value and exemptions.' },
      { question: 'Does the calculator replace the county tax statement?', answer: 'No. It is a planning estimate built from official rate data; the actual appraisal and tax records control.' },
    ],
  },
  countyProfile({
    slug: 'dallas-county',
    path: '/property-tax-calculator/dallas-county',
    name: 'Dallas County',
    countySlug: 'dallas',
    context: 'Dallas County includes Dallas, Irving, Garland and portions of other North Texas communities, with multiple school districts and municipal boundaries.',
  }),
  countyProfile({
    slug: 'tarrant-county',
    path: '/property-tax-calculator/tarrant-county',
    name: 'Tarrant County',
    countySlug: 'tarrant',
    context: 'Tarrant County includes Fort Worth, Arlington and numerous suburban jurisdictions, so nearby parcels can carry different city, school and special-district combinations.',
  }),
  countyProfile({
    slug: 'bexar-county',
    path: '/property-tax-calculator/bexar-county',
    name: 'Bexar County',
    countySlug: 'bexar',
    context: 'Bexar County includes San Antonio plus incorporated and unincorporated communities with multiple school, municipal and special-district taxing boundaries.',
  }),
  countyProfile({
    slug: 'travis-county',
    path: '/property-tax-calculator/travis-county',
    name: 'Travis County',
    countySlug: 'travis',
    context: 'Travis County includes Austin and surrounding communities where school districts, municipalities, emergency-service districts and other taxing units vary by address.',
  }),
  countyProfile({
    slug: 'denton-county',
    path: '/property-tax-calculator/denton-county',
    name: 'Denton County',
    countySlug: 'denton',
    context: 'Denton County crosses a dense North Texas patchwork of cities and school districts, including portions of fast-growing communities near the Dallas–Fort Worth core.',
  }),
  countyProfile({
    slug: 'fort-bend-county',
    path: '/property-tax-calculator/fort-bend-county',
    name: 'Fort Bend County',
    countySlug: 'fort-bend',
    context: 'Fort Bend County includes a mix of cities, school districts and municipal utility districts across the Houston region, making special-district verification especially important.',
  }),
  countyProfile({
    slug: 'montgomery-county',
    path: '/property-tax-calculator/montgomery-county',
    name: 'Montgomery County',
    countySlug: 'montgomery',
    context: 'Montgomery County includes incorporated communities and extensive unincorporated development where school, emergency-service and municipal utility districts can materially change the taxing-unit stack.',
  }),
  countyProfile({
    slug: 'williamson-county',
    path: '/property-tax-calculator/williamson-county',
    name: 'Williamson County',
    countySlug: 'williamson',
    context: 'Williamson County includes rapidly growing communities north of Austin, with city, school, MUD and emergency-service district boundaries that can differ across nearby subdivisions.',
  }),
  countyProfile({
    slug: 'el-paso-county',
    path: '/property-tax-calculator/el-paso-county',
    name: 'El Paso County',
    countySlug: 'el-paso',
    context: 'El Paso County includes the City of El Paso and surrounding communities with different municipal, school and other local taxing jurisdictions.',
  }),
  countyProfile({
    slug: 'hidalgo-county',
    path: '/property-tax-calculator/hidalgo-county',
    name: 'Hidalgo County',
    countySlug: 'hidalgo',
    context: 'Hidalgo County spans multiple Rio Grande Valley cities, school districts and special-purpose taxing units, so the exact parcel determines the useful combined-rate scenario.',
  }),
] as const;

export const LOCAL_PROPERTY_TAX_PROFILE_BY_SLUG = new Map(
  LOCAL_PROPERTY_TAX_PROFILES.map((profile) => [profile.slug, profile]),
);
