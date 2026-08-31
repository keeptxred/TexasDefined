import { createFileRoute } from '@tanstack/react-router';

import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/buying-a-home-in-texas';
const title = 'Buying a Home in Texas | Costs, Mortgage, Taxes & Closing';
const description = 'Plan a Texas home purchase from affordability and mortgage payments through down payment, cash to close, property taxes, insurance, inspections, closing and post-closing reserves.';
const steps = [
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
const faqs = [
  { question: 'How much cash do I need to buy a home in Texas?', answer: 'There is no universal amount. The useful cash target combines the down payment, transaction costs, prepaids and escrow deposits, moving expenses, and a post-closing reserve, then subtracts any verified credits or assistance.' },
  { question: 'What should I include in a Texas monthly home budget?', answer: 'Include principal and interest, parcel-specific property taxes, homeowners insurance, mortgage insurance when applicable, HOA or district charges, utilities, maintenance and other recurring costs tied to the property.' },
  { question: 'Is a mortgage preapproval the same as an affordability plan?', answer: 'No. Preapproval reflects lender underwriting assumptions and borrower information. A household affordability plan can be more conservative because it also accounts for reserves, lifestyle spending and property-specific costs outside the loan payment.' },
  { question: 'Where should a first-time Texas buyer check for assistance?', answer: 'Start with current official program information, including the Texas Department of Housing and Community Affairs. Eligibility, funding, approved lenders and repayment terms can change, so verify the current program before counting assistance in the purchase budget.' },
];

export const Route = createFileRoute('/buying-a-home-in-texas')({
  head: () => {
    const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
    const siteUrl = absoluteUrl(texasDefinedBrand, '/');
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'HowTo',
            '@id': `${pageUrl}#howto`,
            name: 'How to plan a Texas home purchase',
            description,
            url: pageUrl,
            isPartOf: { '@id': `${siteUrl}#website` },
            step: steps.map(([name, text], index) => ({ '@type': 'HowToStep', position: index + 1, name, text, url: `${pageUrl}#step-${index + 1}` })),
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
              { '@type': 'ListItem', position: 3, name: 'Buying a Home in Texas', item: pageUrl },
            ],
          },
        ],
      })],
    };
  },
});

export const TEXAS_HOMEBUYER_STEPS = steps;
export const TEXAS_HOMEBUYER_FAQS = faqs;
