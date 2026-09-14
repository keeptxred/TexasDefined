const localHousingLocations = [
  { name: 'Houston', slug: 'houston' },
  { name: 'Austin', slug: 'austin' },
  { name: 'Dallas', slug: 'dallas' },
  { name: 'Fort Worth', slug: 'fort-worth' },
  { name: 'San Antonio', slug: 'san-antonio' },
  { name: 'Frisco', slug: 'frisco' },
  { name: 'El Paso', slug: 'el-paso' },
  { name: 'Harris County', slug: 'harris-county' },
  { name: 'Dallas County', slug: 'dallas-county' },
  { name: 'Tarrant County', slug: 'tarrant-county' },
  { name: 'Bexar County', slug: 'bexar-county' },
  { name: 'Travis County', slug: 'travis-county' },
  { name: 'Collin County', slug: 'collin-county' },
  { name: 'Denton County', slug: 'denton-county' },
  { name: 'Fort Bend County', slug: 'fort-bend-county' },
  { name: 'Montgomery County', slug: 'montgomery-county' },
  { name: 'Williamson County', slug: 'williamson-county' },
  { name: 'El Paso County', slug: 'el-paso-county' },
  { name: 'Hidalgo County', slug: 'hidalgo-county' },
] as const;

export function loadHomeownershipCostHubPageServer() {
  return {
    description: 'Combine a Texas mortgage, property taxes, homeowners insurance, maintenance, utilities, HOA or district costs and other recurring expenses into a fuller homeownership budget, with official local property-tax rate autofill.',
    local: {
      eyebrow: 'Local housing planning',
      title: 'Run the full housing budget with city- and county-specific property context',
      copy: 'The planning categories are the same statewide, but the inputs are not. These local pages connect affordability, mortgage, insurance and full ownership-cost planning to city or county property-tax tools and relocation research so assumptions can be replaced with address-level numbers.',
      cards: localHousingLocations.map(({ name, slug }) => ({
        name,
        ownershipHref: `/texas-homeownership-cost-calculator/${slug}`,
        affordabilityHref: `/texas-home-affordability-calculator/${slug}`,
        insuranceHref: `/texas-home-insurance-calculator/${slug}`,
        mortgageHref: `/texas-mortgage-calculator/${slug}`,
      })),
    },
    stack: {
      eyebrow: 'Build the whole monthly stack',
      title: 'The mortgage payment is only one part of owning the house',
      paragraphs: [
        'A household can qualify for a mortgage and still feel squeezed by the complete cost of the property. Texas property taxes, homeowners insurance, summer electricity, water, maintenance, HOA dues and special districts can move the budget materially after the keys are handed over.',
        'Use address-specific numbers when they are available. The local-rate selector removes a major manual input, but taxable values, exemptions and exact district membership still belong to the parcel.',
        'The strongest use of this calculator is comparison. Run it for every serious home using the same categories so that a lower purchase price does not hide higher taxes, insurance, utility costs or neighborhood charges.',
      ],
    },
    categories: {
      eyebrow: 'Costs buyers often miss',
      title: 'Recurring ownership expenses that deserve their own line',
      cards: [
        { title: 'Property taxes', copy: 'Use the parcel value, exemptions and exact county, city, school district and special-district membership whenever possible.' },
        { title: 'Homeowners insurance', copy: 'Roof age, storm exposure, rebuilding cost, deductibles and optional wind or flood coverage can materially change the annual premium.' },
        { title: 'Electricity and water', copy: 'Texas weather, home size, insulation, pool equipment, irrigation and local utility providers can make utilities a major ownership cost.' },
        { title: 'Maintenance reserve', copy: 'HVAC, roof, plumbing, foundation, appliances, fences, trees and exterior work should be budgeted even when nothing is broken today.' },
        { title: 'HOA, MUD and PID costs', copy: 'Neighborhood charges can appear as dues, assessments or taxes. Keep them separate so you can see which costs are contractual and which are taxing-unit charges.' },
        { title: 'Yard, pest and pool care', copy: 'Lawn service, fertilizer, pest control, tree work and pool chemicals or service can turn into predictable monthly expenses for some properties.' },
      ],
    },
    inspection: {
      eyebrow: 'Use inspection findings',
      title: 'Turn known property conditions into a realistic reserve',
      paragraphs: [
        'A generic maintenance percentage is only a placeholder. Once you have an inspection, seller disclosures and insurance information, convert known risks into actual planning amounts. An older roof, aging HVAC system, foundation movement, mature trees or pool equipment can justify a much larger reserve than a newer low-maintenance property.',
        'Separate recurring maintenance from one-time repairs. Monthly lawn service belongs in the recurring budget; replacing an HVAC system belongs in a capital reserve. Keeping those categories distinct helps prevent a seemingly affordable monthly payment from consuming cash needed for predictable repairs.',
        'If a property has deferred maintenance, test the budget both before and after the repair plan. The cheapest purchase price can become the most expensive ownership path when multiple systems need work at the same time.',
      ],
    },
    comparison: {
      eyebrow: 'Compare homes consistently',
      title: 'Use the same budget framework for every address',
      cards: [
        { title: 'Home A: lower price, higher recurring costs', copy: 'A lower purchase price may still come with higher property taxes, insurance, utility use, HOA dues or immediate maintenance. Enter those separately rather than assuming the lower price wins.' },
        { title: 'Home B: higher price, lower operating costs', copy: 'A newer or more efficient home may cost more upfront while reducing maintenance, utility or insurance assumptions. Compare the full annual ownership total, not just principal and interest.' },
      ],
    },
    links: {
      eyebrow: 'Break the total into parts',
      title: 'Verify the biggest ownership-cost assumptions separately',
      cards: [
        { name: 'Mortgage calculator', href: '/texas-mortgage-calculator', copy: 'Estimate principal, interest, property taxes and insurance together.' },
        { name: 'Property-tax estimator', href: '/texas-property-tax-estimator', copy: 'Build an exact local-rate stack from county, ISD, city and special districts.' },
        { name: 'Utility-cost calculator', href: '/texas-utility-cost-calculator', copy: 'Estimate electricity, water, gas, internet and trash at the household level.' },
        { name: 'Home-insurance calculator', href: '/texas-home-insurance-calculator', copy: 'Create a planning estimate before getting address-specific insurer quotes.' },
        { name: 'True cost of owning a Texas home', href: '/article/true-cost-of-owning-a-home-in-texas', copy: 'Use the full guide for maintenance, utilities, districts, repairs and reserve planning.' },
        { name: 'MUDs, PIDs and HOAs', href: '/article/muds-pids-hoas-special-districts-texas', copy: 'Understand neighborhood charges and districts around the home.' },
      ],
    },
    faq: {
      eyebrow: 'Common questions',
      title: 'Texas homeownership cost calculator FAQ',
      items: [
        { question: 'What costs should a Texas homeowner budget beyond the mortgage?', answer: 'A practical ownership budget can include property taxes, homeowners insurance, utilities, maintenance, HOA dues, special-district costs, pest control, lawn or pool care and a reserve for repairs in addition to principal and interest.' },
        { question: 'Can the calculator estimate local property taxes?', answer: 'Yes. Choose a county, then select the city, school district and special districts that actually serve the parcel. The calculator can convert the finalized combined rate reported to the Texas Comptroller into a monthly property-tax planning amount.' },
        { question: 'Why can two homes with the same price have very different ownership costs?', answer: 'Property-tax rates, insurance premiums, special districts, HOA dues, utility providers, home age, roof and HVAC condition, lot size and commuting needs can all differ by address even when purchase prices match.' },
        { question: 'Should utilities be included in home affordability?', answer: 'Yes for household planning, even though a lender may not treat every utility as part of the mortgage payment. Electricity, water and other services affect how comfortable the total monthly budget is after closing.' },
        { question: 'How much should I budget for maintenance?', answer: 'There is no single percentage that fits every Texas home. Age, roof, HVAC, foundation, trees, irrigation, pool equipment and deferred maintenance can all change the reserve you need. Use a planning amount, then increase it when inspections or known repairs identify larger risks.' },
      ],
    },
  } as const;
}
