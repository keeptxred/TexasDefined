import { LOCAL_HOME_AFFORDABILITY_PROFILES, type LocalHomeAffordabilityProfile } from './local-home-affordability';

export type LocalHomeownershipCostProfile = LocalHomeAffordabilityProfile & {
  ownershipPath: string;
  ownershipTitle: string;
  ownershipSeoTitle: string;
  ownershipDescription: string;
  ownershipIntro: string;
  ownershipFaqs: readonly { question: string; answer: string }[];
};

function toHomeownershipProfile(profile: LocalHomeAffordabilityProfile): LocalHomeownershipCostProfile {
  const ownershipPath = `/texas-homeownership-cost-calculator/${profile.slug}`;
  return {
    ...profile,
    ownershipPath,
    ownershipTitle: `${profile.name} homeownership cost calculator`,
    ownershipSeoTitle: `${profile.name} Homeownership Cost Calculator | Texas Defined`,
    ownershipDescription: `Estimate the monthly and annual cost of owning a home in ${profile.name} using mortgage, parcel-specific property taxes, insurance, utilities, maintenance, HOA or district costs and other recurring expenses.`,
    ownershipIntro: `A useful ${profile.name} ownership budget goes beyond principal and interest. Use this page to combine the mortgage with property taxes, insurance, utilities, maintenance, HOA or district charges and other recurring costs, then replace the starting assumptions with numbers for the exact property.`,
    ownershipFaqs: [
      {
        question: `What should I include in a ${profile.name} homeownership budget?`,
        answer: 'Include the mortgage payment, parcel-specific property taxes, homeowners insurance, utilities, maintenance, HOA or neighborhood charges when applicable, and any other recurring cost tied to the property.',
      },
      {
        question: `Does this calculator use one ${profile.name} property-tax rate?`,
        answer: 'No. The calculator can load finalized local taxing-unit rates, but the parcel county, school district, municipality, special districts, taxable value and exemptions still need to match the actual property.',
      },
      {
        question: 'Why should I compare the annual total as well as the monthly total?',
        answer: 'Annualizing the recurring cost makes it easier to see how taxes, insurance, utilities, maintenance and neighborhood charges add up beyond the mortgage payment and to compare multiple properties on the same basis.',
      },
    ],
  };
}

export const LOCAL_HOMEOWNERSHIP_COST_PROFILES: readonly LocalHomeownershipCostProfile[] =
  LOCAL_HOME_AFFORDABILITY_PROFILES.map(toHomeownershipProfile);

export const LOCAL_HOMEOWNERSHIP_COST_PROFILE_BY_SLUG = new Map(
  LOCAL_HOMEOWNERSHIP_COST_PROFILES.map((profile) => [profile.slug, profile]),
);
