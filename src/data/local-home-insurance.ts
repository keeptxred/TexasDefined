import { LOCAL_HOME_AFFORDABILITY_PROFILES, type LocalHomeAffordabilityProfile } from './local-home-affordability';

export type LocalHomeInsuranceProfile = LocalHomeAffordabilityProfile & {
  insurancePath: string;
  insuranceTitle: string;
  insuranceSeoTitle: string;
  insuranceDescription: string;
  insuranceIntro: string;
  insurancePlanningPoints: readonly string[];
  insuranceFaqs: readonly { question: string; answer: string }[];
};

function toInsuranceProfile(profile: LocalHomeAffordabilityProfile): LocalHomeInsuranceProfile {
  const insurancePath = `/texas-home-insurance-calculator/${profile.slug}`;
  return {
    ...profile,
    insurancePath,
    insuranceTitle: `${profile.name} home insurance cost calculator`,
    insuranceSeoTitle: `${profile.name} Home Insurance Cost Calculator | Texas Defined`,
    insuranceDescription: `Estimate a ${profile.name} homeowners-insurance planning range from replacement cost, rate assumptions, separate wind or flood costs, and deductible credits without entering personal information.`,
    insuranceIntro: `Use this ${profile.name} page to test a homeowners-insurance budget before requesting quotes. The calculator does not assign a city or county average premium: enter your own replacement-cost and coverage assumptions, then replace the result with property-specific insurer pricing before making a decision.`,
    insurancePlanningPoints: [
      'Start with a realistic replacement-cost estimate for the structure rather than the purchase price or taxable value.',
      'Check the policy and property for separate wind, hail, flood, named-storm or other coverage and deductible terms before treating one premium as the full risk budget.',
      'Compare actual quotes on equivalent coverage limits and deductibles, and keep the insurance number connected to the exact property rather than a city or county average.',
    ],
    insuranceFaqs: [
      {
        question: `Does this ${profile.name} home-insurance calculator use an average local premium?`,
        answer: 'No. It is a scenario calculator. You enter the replacement cost, estimated rate, separate wind or flood additions, and deductible or discount credit. Actual premiums require property-specific insurer underwriting and quoting.',
      },
      {
        question: `Can I estimate ${profile.name} homeowners insurance without entering personal information?`,
        answer: 'Yes. The planning calculator does not require your name, email address, phone number or street address. A real insurance quote will require additional property and applicant information from the insurer or agent.',
      },
      {
        question: 'What should I compare when I get real insurance quotes?',
        answer: 'Compare equivalent dwelling and liability limits, covered perils, exclusions, deductibles, replacement-cost terms, separate wind or flood arrangements when applicable, and the annual premium. Policy language and the insurer quote control.',
      },
    ],
  };
}

export const LOCAL_HOME_INSURANCE_PROFILES: readonly LocalHomeInsuranceProfile[] =
  LOCAL_HOME_AFFORDABILITY_PROFILES.map(toInsuranceProfile);

export const LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG = new Map(
  LOCAL_HOME_INSURANCE_PROFILES.map((profile) => [profile.slug, profile]),
);
