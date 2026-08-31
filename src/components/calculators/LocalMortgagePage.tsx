import { LocalHousingPlannerPage, type LocalHousingPlannerLink } from '@/components/calculators/LocalHomeAffordabilityPage';
import { OfficialMortgageCalculator } from '@/components/calculators/OfficialMortgageCalculator';
import type { LocalMortgageProfile } from '@/data/local-mortgage';

const officialResearchLinks: readonly LocalHousingPlannerLink[] = [
  {
    href: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
    title: 'CFPB Loan Estimate guide',
    copy: 'Use the federal consumer guide to understand the lender document that replaces planning assumptions with transaction-specific loan costs.',
    action: 'Open CFPB Loan Estimate guidance →',
  },
  {
    href: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    title: 'Texas Comptroller property-tax rates',
    copy: 'Verify adopted Texas local taxing-unit rates and keep the parcel jurisdictions separate from the mortgage financing assumptions.',
    action: 'Open official Texas tax-rate data →',
  },
  {
    href: '/texas-closing-cost-calculator',
    title: 'Texas closing cost calculator',
    copy: 'Keep transaction cash separate from the monthly mortgage payment so the purchase-price scenario does not consume money needed to close.',
    action: 'Estimate closing costs →',
  },
];

export function LocalMortgagePage({ profile }: { profile: LocalMortgageProfile }) {
  const affordabilityPath = `/texas-home-affordability-calculator/${profile.slug}`;
  const ownershipPath = `/texas-homeownership-cost-calculator/${profile.slug}`;
  const insurancePath = `/texas-home-insurance-calculator/${profile.slug}`;
  const mortgageProfile = { ...profile, planningPoints: profile.mortgagePlanningPoints };
  const links: LocalHousingPlannerLink[] = [
    { href: profile.propertyTaxHref, title: profile.propertyTaxLabel, copy: 'Build the property-tax line from the parcel county, school district, municipality and only the special districts that actually apply.' },
    { href: insurancePath, title: `${profile.name} home-insurance calculator`, copy: 'Replace the annual insurance assumption with a property-specific quote and equivalent coverage terms.' },
    { href: ownershipPath, title: `${profile.name} homeownership cost calculator`, copy: 'Put the mortgage payment beside utilities, maintenance, HOA or district charges and other recurring ownership costs.' },
    { href: affordabilityPath, title: `${profile.name} home affordability calculator`, copy: 'Pressure-test the same property against household income, debt, down payment and recurring housing costs.' },
  ];

  return <LocalHousingPlannerPage
    profile={mortgageProfile}
    calculator={<OfficialMortgageCalculator defaultCountySlug={profile.defaultCountySlug} />}
    eyebrow={`${profile.name} mortgage payment planner`}
    title={profile.mortgageTitle}
    description={profile.mortgageDescription}
    intro={profile.mortgageIntro}
    breadcrumbLabel="Mortgage calculator"
    breadcrumbHref="/texas-mortgage-calculator"
    planningEyebrow="Make the payment property-specific"
    planningTitle={`Build a realistic ${profile.name} mortgage payment scenario`}
    linksEyebrow="Verify the payment stack"
    linksTitle="Use the same property across taxes, insurance, affordability and ownership costs"
    links={links}
    faqTitle={`${profile.name} mortgage calculator FAQ`}
    faqs={profile.mortgageFaqs}
    disclaimer="This is a planning calculator, not a mortgage quote, preapproval, Loan Estimate, tax statement or insurance quote. Verify the lender terms, exact parcel, taxing units, insurance and other recurring costs before making a financial commitment."
    related={profile.relatedLocalCalculators?.length ? { eyebrow: 'County-to-city planning', title: 'Compare the city context inside the same regional housing decision', copy: 'County boundaries help define property-tax and record systems while city pages add another local planning layer. The exact parcel and lender documents remain the source of truth.', items: profile.relatedLocalCalculators.map((item) => ({ name: item.name, path: item.path.replace('/texas-home-affordability-calculator/', '/texas-mortgage-calculator/'), label: `${item.name} mortgage payment calculator →` })) } : undefined}
    next={{ eyebrow: 'Replace estimates with official documents', title: 'Move from a planning payment to transaction-specific numbers', links: officialResearchLinks }}
  />;
}
