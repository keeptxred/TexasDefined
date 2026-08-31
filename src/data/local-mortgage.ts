import { LOCAL_HOME_AFFORDABILITY_PROFILES, type LocalHomeAffordabilityProfile } from './local-home-affordability';

export type LocalMortgageProfile = LocalHomeAffordabilityProfile & {
  mortgagePath: string;
  mortgageTitle: string;
  mortgageSeoTitle: string;
  mortgageDescription: string;
  mortgageIntro: string;
  mortgagePlanningPoints: readonly string[];
  mortgageFaqs: readonly { question: string; answer: string }[];
  defaultCountySlug: string;
};

function toMortgageProfile(profile: LocalHomeAffordabilityProfile): LocalMortgageProfile {
  const mortgagePath = `/texas-mortgage-calculator/${profile.slug}`;
  const defaultCountySlug = profile.kind === 'county' ? profile.slug.replace(/-county$/, '') : '';
  return {
    ...profile,
    mortgagePath,
    mortgageTitle: `${profile.name} mortgage payment calculator`,
    mortgageSeoTitle: `${profile.name} Mortgage Calculator | Taxes & Insurance`,
    mortgageDescription: `Estimate a ${profile.name} mortgage payment using your home price, down payment, interest-rate and term assumptions plus official local property-tax selections and property-specific homeowners insurance.`,
    mortgageIntro: `Use this ${profile.name} mortgage calculator to build a payment scenario from your own financing assumptions, then connect the estimate to the exact property's tax jurisdictions, insurance quote and recurring ownership costs. It does not publish a current mortgage rate or imply lender approval.`,
    mortgagePlanningPoints: [
      'Enter the purchase price, down payment, loan term and interest rate from the scenario or lender information you are actually evaluating.',
      'Use the parcel county and select only the school, city and special-district property-tax rates that truly apply to the address.',
      'Replace the insurance assumption with a property-specific quote and keep HOA, mortgage insurance, maintenance and other recurring costs in the broader ownership budget.',
    ],
    mortgageFaqs: [
      {
        question: `Does this ${profile.name} mortgage calculator use a current local mortgage rate?`,
        answer: 'No. Enter the interest rate and loan term you want to evaluate. Mortgage pricing depends on the borrower, loan program, market, lender and transaction, so this planning page does not publish a local approval rate or quote.',
      },
      {
        question: `How should I estimate property taxes for a ${profile.name} mortgage payment?`,
        answer: 'Use the exact parcel county and select the school district, municipality and only the special districts that serve the property. Taxable value and exemptions also need to match the property before the final estimate is reliable.',
      },
      {
        question: 'Is the estimated monthly payment the same as a lender Loan Estimate?',
        answer: 'No. A lender Loan Estimate uses transaction-specific loan terms, fees and escrow assumptions. Use this calculator for comparison planning, then replace each estimate with the lender, appraisal, taxing-unit and insurer documents for the actual property.',
      },
    ],
    defaultCountySlug,
  };
}

export const LOCAL_MORTGAGE_PROFILES: readonly LocalMortgageProfile[] =
  LOCAL_HOME_AFFORDABILITY_PROFILES.map(toMortgageProfile);

export const LOCAL_MORTGAGE_PROFILE_BY_SLUG = new Map(
  LOCAL_MORTGAGE_PROFILES.map((profile) => [profile.slug, profile]),
);
