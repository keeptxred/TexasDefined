import { LocalHousingPlannerPage, type LocalHousingPlannerLink } from '@/components/calculators/LocalHomeAffordabilityPage';
import { HomeInsuranceCalculator } from '@/components/calculators/TexasPlanningCalculators';
import type { LocalHomeInsuranceProfile } from '@/data/local-home-insurance';

const officialResearchLinks: readonly LocalHousingPlannerLink[] = [
  {
    href: 'https://www.tdi.texas.gov/CONSUMER/home-insurance.html',
    title: 'Texas Department of Insurance',
    copy: 'Review Texas consumer guidance on home coverage, replacement cost, shopping, rates, claims and other insurance you may need.',
    action: 'Open TDI home-insurance guidance →',
  },
  {
    href: 'https://www.helpinsure.com/residential.html',
    title: 'HelpInsure policy comparison',
    copy: 'Use the Texas Department of Insurance and Office of Public Insurance Counsel comparison service to research home policies sold in your area.',
    action: 'Compare Texas home policies →',
  },
  {
    href: '/article/texas-homeowners-insurance-guide',
    title: 'Texas homeowners insurance guide',
    copy: 'Understand coverage, replacement cost, deductibles, wind, flood and quote-comparison questions before choosing a policy.',
    action: 'Read the insurance guide →',
  },
];

export function LocalHomeInsurancePage({ profile }: { profile: LocalHomeInsuranceProfile }) {
  const affordabilityPath = `/texas-home-affordability-calculator/${profile.slug}`;
  const ownershipPath = `/texas-homeownership-cost-calculator/${profile.slug}`;
  const insuranceProfile = { ...profile, planningPoints: profile.insurancePlanningPoints };
  const links: LocalHousingPlannerLink[] = [
    {
      href: ownershipPath,
      title: `${profile.name} homeownership cost calculator`,
      copy: 'Put the insurance estimate beside mortgage, parcel-specific taxes, utilities, maintenance and HOA or district costs.',
    },
    {
      href: affordabilityPath,
      title: `${profile.name} home affordability calculator`,
      copy: 'Pressure-test the home-price range after adding property taxes, insurance and the other recurring ownership costs.',
    },
    {
      href: profile.propertyTaxHref,
      title: profile.propertyTaxLabel,
      copy: 'Keep the tax estimate parcel-specific by matching the county, school, city and applicable special districts.',
    },
    {
      href: profile.relocationHref,
      title: profile.relocationLabel,
      copy: 'Research the address-level jurisdiction, commute, utility, school and neighborhood context before buying.',
    },
  ];

  return (
    <LocalHousingPlannerPage
      profile={insuranceProfile}
      calculator={<HomeInsuranceCalculator />}
      eyebrow={`${profile.name} homeowners insurance estimator`}
      title={profile.insuranceTitle}
      description={profile.insuranceDescription}
      intro={profile.insuranceIntro}
      breadcrumbLabel="Home insurance"
      breadcrumbHref="/texas-home-insurance-calculator"
      planningEyebrow="No local-average shortcut"
      planningTitle={`Build a property-specific ${profile.name} insurance estimate`}
      linksEyebrow="Connect insurance to the full housing budget"
      linksTitle="Use the same address across taxes, affordability and ownership-cost planning"
      links={links}
      faqTitle={`${profile.name} home insurance calculator FAQ`}
      faqs={profile.insuranceFaqs}
      disclaimer="This is a no-personal-information planning calculator, not an insurance quote, policy recommendation or coverage determination. The insurer's quote, underwriting decision and policy language control. Verify the exact property, coverage limits, deductibles and separate coverages before making a financial commitment."
      next={{
        eyebrow: 'Official Texas insurance research',
        title: 'Move from a private planning estimate to policy research and real quotes',
        links: officialResearchLinks,
      }}
    />
  );
}
