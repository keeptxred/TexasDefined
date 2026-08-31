import { LOCAL_HOME_AFFORDABILITY_PROFILES, type LocalHomeAffordabilityProfile } from './local-home-affordability';

export type LocalMortgageProfile = LocalHomeAffordabilityProfile & {
  mortgagePath: string;
  mortgageTitle: string;
  mortgageSeoTitle: string;
  mortgageDescription: string;
  mortgageIntro: string;
  mortgagePlanningPoints: readonly string[];
  mortgageFaqs: readonly { question: string; answer: string }[];
};

function toMortgageProfile(profile: LocalHomeAffordabilityProfile): LocalMortgageProfile {
  const mortgagePath = `/texas-mortgage-calculator/${profile.slug}`;
  return {
    ...profile,
    mortgagePath,
    mortgageTitle: `${profile.name} mortgage payment calculator`,
    mortgageSeoTitle: `${profile.name} Mortgage Calculator | Taxes & Insurance`,
    mortgageDescription: `Estimate a ${profile.name} mortgage payment with principal, interest, official local property-tax rates and your homeowners-insurance assumption in one monthly housing-cost view.`,
    mortgageIntro: `Use this ${profile.name} mortgage calculator to build an address-level payment scenario instead of relying on a purchase-price-only estimate. Enter the loan assumptions, then match the property-tax rate to the parcel's actual taxing units and replace the insurance estimate with a property-specific quote as the home search becomes concrete.`,
    mortgagePlanningPoints: [
      'Use the parcel county, school district, municipality and applicable special districts when loading the property-tax rate; a city or county name alone is not the full tax stack.',
      'Replace the homeowners-insurance assumption with a quote for the exact property and comparable coverage before treating the payment as decision-ready.',
      'Keep HOA dues, mortgage insurance, utilities, maintenance and other recurring address-level costs beside the lender payment even when they are not part of principal and interest.',
    ],
    mortgageFaqs: [
      {
        question: `Does this ${profile.name} mortgage calculator use a city or county average tax rate?`,
        answer: 'No. The mortgage calculator can load finalized Texas Comptroller taxing-unit rates after you choose the county, school district, municipality and only the special districts that actually serve the parcel.',
      },
      {
        question: `Does the ${profile.name} payment include homeowners insurance?`,
        answer: 'Yes, as a user-entered annual insurance assumption. Replace that planning number with a property-specific insurer quote before relying on the monthly total.',
      },
      {
        question: 'Is this the same as a lender Loan Estimate?',
        answer: 'No. It is a planning calculator. The lender Loan Estimate and later transaction documents control financing charges, while appraisal, tax and insurer records control property-specific tax and insurance inputs.',
      },
    ],
  };
}

export const LOCAL_MORTGAGE_PROFILES: readonly LocalMortgageProfile[] =
  LOCAL_HOME_AFFORDABILITY_PROFILES.map(toMortgageProfile);

export const LOCAL_MORTGAGE_PROFILE_BY_SLUG = new Map(
  LOCAL_MORTGAGE_PROFILES.map((profile) => [profile.slug, profile]),
);
