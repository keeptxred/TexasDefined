import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildCalculatorHead } from '@/lib/calculator-seo';

export type TransactionFinancePageKind = 'cash-to-close' | 'seller-net-proceeds';

export type TransactionFinancePage = {
  kind: TransactionFinancePageKind;
  canonicalPath: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  description: string;
  explanation: { eyebrow: string; title: string; paragraphs: readonly string[] };
  workflow: { eyebrow: string; title: string; steps: readonly string[] };
  links: readonly { href: string; title: string; copy: string }[];
  sources: readonly { href: string; title: string; copy: string }[];
  faqs: readonly { question: string; answer: string }[];
  disclaimer: string;
  featureList: string[];
};

const pages: Record<TransactionFinancePageKind, TransactionFinancePage> = {
  'cash-to-close': {
    kind: 'cash-to-close',
    canonicalPath: '/texas-cash-to-close-calculator',
    eyebrow: 'Texas buyer cash planner',
    title: 'Texas cash-to-close calculator',
    seoTitle: 'Texas Cash to Close Calculator | Buyer Cash Needed',
    description: 'Estimate Texas buyer cash to close by combining the down payment, closing costs, prepaids and escrow with credits, deposits, verified assistance and a post-closing reserve.',
    explanation: {
      eyebrow: 'One number, several moving parts',
      title: 'Separate the down payment from the final cash-to-close requirement',
      paragraphs: [
        'The down payment is only one part of the buyer cash plan. Transaction charges, prepaid interest, insurance and initial escrow deposits can add to the amount due, while lender or seller credits, deposits already paid and verified assistance can reduce the amount still needed at closing.',
        'Use the calculator early with conservative assumptions, then replace percentages and estimates with the figures on the Loan Estimate, transaction documents and ultimately the Closing Disclosure. Keep a post-closing reserve separate so the purchase does not consume every available dollar.',
      ],
    },
    workflow: {
      eyebrow: 'Use the documents in order',
      title: 'Tighten the estimate as the transaction becomes real',
      steps: [
        'Start with the purchase price, planned down payment and a rough buyer closing-cost assumption.',
        'Add prepaids and initial escrow amounts, then subtract only credits, deposits and assistance that the transaction can actually apply.',
        'Replace planning inputs with lender and settlement figures before wiring or bringing funds to close, and keep a separate reserve for the first months of ownership.',
      ],
    },
    links: [
      { href: '/texas-down-payment-calculator', title: 'Down payment calculator', copy: 'Compare purchase price, down-payment percentage, closing-cost planning and reserves before you know every transaction figure.' },
      { href: '/texas-closing-cost-calculator', title: 'Closing-cost calculator', copy: 'Model buyer and seller transaction-cost percentages and negotiated credits separately.' },
      { href: '/texas-home-affordability-calculator', title: 'Home affordability calculator', copy: 'Pressure-test the resulting purchase against income, debt and recurring housing costs.' },
      { href: '/texas-homeownership-cost-calculator', title: 'Homeownership cost calculator', copy: 'Carry the plan past closing with mortgage, taxes, insurance, utilities, maintenance and HOA or district costs.' },
    ],
    sources: [
      { href: 'https://www.consumerfinance.gov/owning-a-home/', title: 'Consumer Financial Protection Bureau — Owning a Home', copy: 'Federal homebuying tools and explanations for mortgage shopping, loan documents and closing.' },
      { href: '/article/texas-closing-costs-guide', title: 'Texas closing-cost guide', copy: 'Texas Defined guide to buyer and seller closing-cost categories, cash to close, credits, prepaids and escrow.' },
    ],
    faqs: [
      { question: 'Is cash to close the same as the down payment?', answer: 'No. Cash to close can include the down payment plus closing costs, prepaids and initial escrow amounts, reduced by credits, deposits already applied and other permitted offsets.' },
      { question: 'Does earnest money reduce the amount still due at closing?', answer: 'A deposit that is credited to the buyer at closing can reduce the remaining amount due, but the contract and settlement statement determine how it is applied.' },
      { question: 'Should a cash-to-close plan include money left after closing?', answer: 'It is useful to model a separate reserve for moving, deductibles, repairs and ordinary household surprises instead of treating every available dollar as closing cash.' },
      { question: 'Which number should I trust near closing?', answer: 'Use the transaction-specific lender and settlement documents, including the final Closing Disclosure when applicable, rather than an early calculator estimate.' },
    ],
    disclaimer: 'This is a planning estimate, not a Loan Estimate, Closing Disclosure, settlement statement, lending decision or instruction for wiring funds. Confirm the exact amount and payment instructions with the responsible lender and settlement professionals.',
    featureList: ['Estimate buyer cash to close', 'Separate down payment, closing costs and prepaids', 'Account for credits, deposits and verified assistance', 'Add a post-closing cash reserve'],
  },
  'seller-net-proceeds': {
    kind: 'seller-net-proceeds',
    canonicalPath: '/texas-seller-net-proceeds-calculator',
    eyebrow: 'Texas home-sale proceeds planner',
    title: 'Texas seller net proceeds calculator',
    seoTitle: 'Texas Seller Net Proceeds Calculator | Home Sale Estimate',
    description: 'Estimate possible Texas home-sale proceeds after mortgage or lien payoff, seller transaction costs, buyer credits, repairs, concessions and other modeled deductions.',
    explanation: {
      eyebrow: 'Sale price is not take-home cash',
      title: 'Work from the contract price down to the amount that may remain',
      paragraphs: [
        'A seller does not usually keep the full contract price. Mortgage or lien payoff, transaction charges, negotiated buyer credits, repairs, concessions, taxes, prorations and other obligations can reduce the amount available after closing.',
        'Use the calculator to test a sale-price scenario and separate the loan payoff from other transaction deductions. Replace planning percentages with the payoff statement, contract and settlement figures as soon as they are available.',
      ],
    },
    workflow: {
      eyebrow: 'Build a seller proceeds file',
      title: 'Replace estimates with transaction documents before making plans for the proceeds',
      steps: [
        'Enter the expected sale price and request a current payoff amount for each debt or lien that must be satisfied at closing.',
        'Model seller transaction charges, negotiated buyer credits, repairs or concessions and any other known deductions separately.',
        'Compare the estimate with the title or settlement statement before committing the expected proceeds to another purchase or financial goal.',
      ],
    },
    links: [
      { href: '/texas-closing-cost-calculator', title: 'Texas closing-cost calculator', copy: 'Compare the buyer and seller transaction-cost side of the deal before applying the loan payoff.' },
      { href: '/texas-home-equity-calculator', title: 'Home equity calculator', copy: 'Estimate the difference between home value and debt before transaction costs enter the picture.' },
      { href: '/texas-mortgage-payoff-calculator', title: 'Mortgage payoff calculator', copy: 'Explore how extra principal can change the loan balance before a future sale.' },
      { href: '/texas-home-equity-growth-calculator', title: 'Home equity growth calculator', copy: 'Model how value and balance assumptions may change equity over time before selling.' },
    ],
    sources: [
      { href: 'https://www.consumerfinance.gov/owning-a-home/', title: 'Consumer Financial Protection Bureau — Owning a Home', copy: 'Federal mortgage and closing information useful for understanding payoff and settlement documents.' },
      { href: '/article/texas-closing-costs-guide', title: 'Texas closing-cost guide', copy: 'Planning guide to the transaction-cost categories and negotiated items that can affect sale proceeds.' },
    ],
    faqs: [
      { question: 'Is home equity the same as seller net proceeds?', answer: 'No. Equity is generally the difference between property value and debt, while net proceeds also reflect the actual sale price and transaction deductions such as closing costs, credits and other obligations.' },
      { question: 'Why should I use a mortgage payoff amount instead of the last statement balance?', answer: 'A payoff amount can include interest and other amounts needed to satisfy the loan through a specific date, so it can differ from a regular statement balance.' },
      { question: 'Do seller credits reduce net proceeds?', answer: 'A seller-paid buyer credit reduces the seller side of the transaction when it is part of the final contract and settlement figures.' },
      { question: 'Does this calculator estimate taxes or every lien?', answer: 'No. Enter known deductions as planning inputs and rely on the title, settlement and payoff documents for the actual obligations that must be paid.' },
    ],
    disclaimer: 'This is a planning estimate, not a settlement statement, payoff statement, tax calculation, title opinion or guarantee of sale proceeds. Verify all liens, prorations, transaction charges and contract obligations with the responsible professionals.',
    featureList: ['Estimate seller net proceeds', 'Separate mortgage or lien payoff', 'Model seller transaction costs and buyer credits', 'Add repairs, concessions and other deductions'],
  },
};

export function loadTransactionFinancePageServer(kind: TransactionFinancePageKind) {
  const page = pages[kind];
  return {
    ...page,
    head: buildCalculatorHead(texasDefinedBrand, {
      canonicalPath: page.canonicalPath,
      title: page.seoTitle,
      description: page.description,
      featureList: page.featureList,
      faqs: page.faqs,
    }),
  };
}
