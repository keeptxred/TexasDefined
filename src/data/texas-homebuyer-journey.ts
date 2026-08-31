export const TEXAS_HOMEBUYER_PATH = '/buying-a-home-in-texas';
export const TEXAS_HOMEBUYER_TITLE = 'Buying a Home in Texas | Costs, Mortgage, Taxes & Closing';
export const TEXAS_HOMEBUYER_DESCRIPTION = 'Plan a Texas home purchase from affordability and mortgage payments through down payment, cash to close, property taxes, insurance, inspections, closing and post-closing reserves.';

export const TEXAS_HOMEBUYER_STEPS = [
  ['Set a monthly housing budget', 'Start with income, recurring debt and a housing payment that leaves room for ordinary life and emergency savings.'],
  ['Choose a cash target', 'Separate the down payment, expected closing costs, moving costs and a post-closing reserve instead of treating one down-payment percentage as the full cash requirement.'],
  ['Compare financing scenarios', 'Test purchase price, down payment, interest rate and loan term together, then replace planning assumptions with lender disclosures when available.'],
  ['Localize property taxes', 'Identify the parcel county, school district, municipality and applicable special districts rather than relying on a citywide or countywide average.'],
  ['Quote homeowners insurance', 'Use property-specific insurance quotes and investigate separate wind or flood coverage when relevant to the address.'],
  ['Research the exact address', 'Verify school boundaries, utilities, flood mapping, commuting patterns, HOA or district charges and other address-level costs before making the location decision.'],
  ['Inspect and investigate the property', 'Use appropriate inspections, seller disclosures, title work and property records to replace broad assumptions with property-specific information.'],
  ['Compare the final cash-to-close documents', 'Review the lender and closing documents against the budget, including credits, prepaids, escrow deposits and transaction charges.'],
  ['Keep a post-closing reserve', 'Do not let the closing table consume the entire household cushion for moving, deductibles, maintenance and unexpected repairs.'],
] as const;

export const TEXAS_HOMEBUYER_FAQS = [
  { question: 'How much cash do I need to buy a home in Texas?', answer: 'There is no universal amount. The useful cash target combines the down payment, transaction costs, prepaids and escrow deposits, moving expenses, and a post-closing reserve, then subtracts any verified credits or assistance.' },
  { question: 'What should I include in a Texas monthly home budget?', answer: 'Include principal and interest, parcel-specific property taxes, homeowners insurance, mortgage insurance when applicable, HOA or district charges, utilities, maintenance and other recurring costs tied to the property.' },
  { question: 'Is a mortgage preapproval the same as an affordability plan?', answer: 'No. Preapproval reflects lender underwriting assumptions and borrower information. A household affordability plan can be more conservative because it also accounts for reserves, lifestyle spending and property-specific costs outside the loan payment.' },
  { question: 'Where should a first-time Texas buyer check for assistance?', answer: 'Start with current official program information, including the Texas Department of Housing and Community Affairs. Eligibility, funding, approved lenders and repayment terms can change, so verify the current program before counting assistance in the purchase budget.' },
] as const;

export const TEXAS_HOMEBUYER_TOOLS = [
  ['Home affordability', '/texas-home-affordability-calculator', 'Test income, recurring debt, down payment, rate, taxes and insurance before choosing a target home price.'],
  ['Mortgage payment', '/texas-mortgage-calculator', 'Estimate principal, interest, official local property-tax rates and homeowners insurance in one monthly view.'],
  ['Down payment', '/texas-down-payment-calculator', 'Keep the down payment, expected closing costs and a post-closing cash reserve in one upfront plan.'],
  ['Closing costs', '/texas-closing-cost-calculator', 'Model buyer transaction costs, credits and cash needed at closing separately from purchase price.'],
  ['Down-payment assistance', '/texas-down-payment-assistance-calculator', 'Model a possible assistance amount without assuming eligibility or current funding.'],
  ['Homeownership costs', '/texas-homeownership-cost-calculator', 'Add utilities, maintenance and other recurring ownership costs beyond the mortgage payment.'],
  ['Home insurance', '/texas-home-insurance-calculator', 'Estimate a planning premium without submitting personal information, then replace it with property-specific quotes.'],
  ['Property taxes', '/property-tax-calculators', 'Use official local taxing-unit rates and verify the exact parcel instead of relying on a countywide average.'],
] as const;

export const TEXAS_HOMEBUYER_CITY_PATHS = [
  ['Houston', '/texas-home-affordability-calculator/houston'],
  ['Austin', '/texas-home-affordability-calculator/austin'],
  ['Dallas', '/texas-home-affordability-calculator/dallas'],
  ['Fort Worth', '/texas-home-affordability-calculator/fort-worth'],
  ['San Antonio', '/texas-home-affordability-calculator/san-antonio'],
  ['Frisco', '/texas-home-affordability-calculator/frisco'],
  ['El Paso', '/texas-home-affordability-calculator/el-paso'],
] as const;

export const TEXAS_HOMEBUYER_SOURCES = [
  ['Consumer Financial Protection Bureau — Owning a Home', 'https://www.consumerfinance.gov/owning-a-home/'],
  ['Consumer Financial Protection Bureau — Loan Estimate', 'https://www.consumerfinance.gov/owning-a-home/loan-estimate/'],
  ['Texas Department of Housing and Community Affairs — Homebuyer Programs', 'https://welcomehome.tdhca.texas.gov/'],
  ['Texas Comptroller — Property Tax Local Information', 'https://comptroller.texas.gov/taxes/property-tax/county-directory/'],
  ['Texas Department of Insurance — Homeowners Insurance', 'https://www.tdi.texas.gov/consumer/home-insurance.html'],
  ['HUD — Buying a Home', 'https://www.hud.gov/buying'],
] as const;
