export const movingDecisionTools = [
  ["Texas vs every other state", "/texas-vs-every-state", "Start with the state you are leaving, then compare the actual Texas metro, city or county you would choose."],
  ["Texas cost-of-living calculator", "/texas-cost-of-living-calculator", "Translate a move into housing, utilities, transportation and household-cost assumptions instead of relying on a statewide slogan."],
  ["Texas salary comparison by city", "/texas-salary-comparison-by-city", "Compare Texas labor markets and city-level pay before assuming a lower cost of living offsets a different salary."],
  ["Texas home affordability", "/texas-home-affordability-calculator", "Estimate what a Texas home budget looks like once income, rates, taxes and other ownership costs are included."],
] as const;

export const texasVsEveryStateFaq = [
  { q: "What should I compare before moving to Texas from another state?", a: "Compare the actual cities or counties you would live in, not just statewide averages. Housing, insurance, utilities, transportation, occupation-specific pay, total taxes, weather risks and the services your household uses can all change the result." },
  { q: "Does Texas have an individual state income tax?", a: "Texas does not impose an individual state income tax, but that does not automatically make every Texas household cheaper to operate. Property taxes, sales taxes, housing, insurance, utilities and transportation still matter." },
  { q: "Are all 49 Texas-versus-state pages the same comparison?", a: "No. The same core decision framework is used for consistency, but every state page now includes state-specific place, metro, geography and climate context so the comparison reflects the actual differences that matter for that state." },
  { q: "Where should I verify current numbers?", a: "Use current public data such as the U.S. Census Bureau, Bureau of Economic Analysis and Bureau of Labor Statistics, then use Texas Defined calculators and local city or county pages to translate statewide data into a real household decision." },
] as const;
