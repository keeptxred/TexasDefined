import { LocalHousingPlannerPage, type LocalHousingPlannerLink } from '@/components/calculators/LocalHomeAffordabilityPage';
import { OfficialHomeownershipCostCalculator } from '@/components/calculators/OfficialHomeownershipCostCalculator';
import type { LocalHomeownershipCostProfile } from '@/data/local-homeownership-cost';

export function LocalHomeownershipCostPage({ profile }: { profile: LocalHomeownershipCostProfile }) {
  const affordabilityPath = `/texas-home-affordability-calculator/${profile.slug}`;
  const insurancePath = `/texas-home-insurance-calculator/${profile.slug}`;
  const mortgagePath = `/texas-mortgage-calculator/${profile.slug}`;
  const faqs = profile.ownershipFaqs.map((faq) => faq);
  const links: LocalHousingPlannerLink[] = [
    { href: profile.propertyTaxHref, title: profile.propertyTaxLabel, copy: "Build the property-tax line from the parcel's county, school, city and applicable special districts." },
    { href: mortgagePath, title: `${profile.name} mortgage payment calculator`, copy: 'Separate principal and interest from parcel-specific taxes and property-specific homeowners insurance.' },
    { href: affordabilityPath, title: `${profile.name} affordability calculator`, copy: 'Work backward from income, debt, down payment and recurring housing costs to a possible price range.' },
    { href: insurancePath, title: `${profile.name} home-insurance calculator`, copy: 'Create a private planning estimate, then replace it with property-specific insurer quotes and policy terms.' },
    { href: profile.relocationHref, title: profile.relocationLabel, copy: 'Research commute, utilities, jurisdiction, schools and other recurring costs outside the mortgage.' },
  ];

  return <LocalHousingPlannerPage profile={profile} calculator={<OfficialHomeownershipCostCalculator />} eyebrow={`${profile.name} ownership budget`} title={profile.ownershipTitle} description={profile.ownershipDescription} intro={profile.ownershipIntro} breadcrumbLabel="Homeownership costs" breadcrumbHref="/texas-homeownership-cost-calculator" planningEyebrow="Make the budget address-specific" planningTitle={`What to verify for a ${profile.name} ownership-cost comparison`} linksEyebrow="Verify the biggest assumptions" linksTitle="Connect the monthly total to local property and relocation research" links={links} faqTitle={`${profile.name} homeownership cost FAQ`} faqs={faqs} disclaimer="This is a planning calculator, not a mortgage quote, tax statement, insurance quote, appraisal or maintenance inspection. Verify the exact property, financing terms and recurring ownership costs before making a financial commitment." />;
}
