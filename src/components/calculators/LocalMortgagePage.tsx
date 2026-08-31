import { LocalHousingPlannerPage, type LocalHousingPlannerLink } from '@/components/calculators/LocalHomeAffordabilityPage';
import { OfficialMortgageCalculator } from '@/components/calculators/OfficialMortgageCalculator';
import type { LocalMortgageProfile } from '@/data/local-mortgage';

const officialResearchLinks: readonly LocalHousingPlannerLink[] = [
  {
    href: 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/',
    title: 'CFPB Loan Estimate guide',
    copy: 'Understand the lender disclosure that replaces planning assumptions with transaction-specific loan costs and terms.',
    action: 'Open CFPB guide →',
  },
  {
    href: 'https://comptroller.texas.gov/taxes/property-tax/rates/',
    title: 'Texas Comptroller property-tax rates',
    copy: 'Review the official statewide rate source used by the local tax-assist workflow before relying on a property-tax assumption.',
    action: 'Open Texas rate resources →',
  },
  {
    href: '/texas-down-payment-calculator',
    title: 'Texas down-payment calculator',
    copy: 'Compare cash needed for the down payment with closing costs and the reserves you want to keep after closing.',
    action: 'Plan upfront cash →',
  },
];

export function LocalMortgagePage({ profile }: { profile: LocalMortgageProfile }) {
  const affordabilityPath = `/texas-home-affordability-calculator/${profile.slug}`;
  const ownershipPath = `/texas-homeownership-cost-calculator/${profile.slug}`;
  const insurancePath = `/texas-home-insurance-calculator/${profile.slug}`;
  const mortgageProfile = { ...profile, planningPoints: profile.mortgagePlanningPoints };
  const links: LocalHousingPlannerLink[] = [
    {
      href: profile.propertyTaxHref,
      title: profile.propertyTaxLabel,
      copy: 'Build the property-tax input from the parcel county, school, municipality and applicable special districts instead of a local average.',
    },
    {
      href: insurancePath,
      title: `${profile.name} home-insurance calculator`,
      copy: 'Model an insurance planning range without personal information, then replace it with a property-specific quote.',
    },
    {
      href: affordabilityPath,
      title: `${profile.name} home-affordability calculator`,
      copy: 'Work backward from income, debt, down payment and recurring housing costs to pressure-test the purchase-price scenario.',
    },
    {
      href: ownershipPath,
      title: `${profile.name} homeownership cost calculator`,
      copy: 'Add utilities, maintenance, HOA or district charges and other recurring costs that are not captured by principal, interest, taxes and insurance.',
    },
  ];

  return (
    <LocalHousingPlannerPage
      profile={mortgageProfile}
      calculator={<OfficialMortgageCalculator />}
      eyebrow={`${profile.name} mortgage payment`}
      title={profile.mortgageTitle}
      description={profile.mortgageDescription}
      intro={profile.mortgageIntro}
      breadcrumbLabel="Mortgage calculator"
      breadcrumbHref="/texas-mortgage-calculator"
      planningEyebrow="Make PITI address-specific"
      planningTitle={`What to verify in a ${profile.name} mortgage-payment scenario`}
      linksEyebrow="Use the same property across every estimate"
      linksTitle="Connect mortgage, taxes, insurance and the full ownership budget"
      links={links}
      faqTitle={`${profile.name} mortgage calculator FAQ`}
      faqs={profile.mortgageFaqs}
      disclaimer="This is a planning calculator, not a lender Loan Estimate, credit decision, tax statement or insurance quote. Replace planning assumptions with the lender, appraisal, tax and insurer documents for the exact property before making a financial commitment."
      next={{
        eyebrow: 'Verify the transaction inputs',
        title: 'Replace planning assumptions with official and transaction-specific records',
        links: officialResearchLinks,
      }}
    />
  );
}
