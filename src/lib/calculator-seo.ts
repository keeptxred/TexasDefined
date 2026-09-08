import type { BrandConfig } from '@/brand/types';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

type CalculatorFaq = Readonly<{ question: string; answer: string }>;

type CalculatorBreadcrumbParent = Readonly<{
  name: string;
  path: string;
}>;

export const homeInsuranceSeoTitle = 'Texas Homeowners Insurance Calculator | No Personal Info';
export const homeInsuranceDescription =
  'Estimate Texas homeowners insurance from replacement cost, rate assumptions, wind or flood coverage, and deductibles—without entering your name, email, phone number, or street address.';

export const homeInsuranceFaqs = [
  {
    question: 'How can I estimate homeowners insurance in Texas?',
    answer: 'Start with the estimated replacement cost of the home rather than its market value, apply a reasonable annual insurance rate, and then account separately for wind, hail, coastal, or flood coverage that may apply to the property.',
  },
  {
    question: 'Can I use this homeowners insurance calculator without personal information?',
    answer: 'Yes. This calculator is designed for planning and does not require your name, email address, phone number, or street address. The result is an estimate, not an insurance quote.',
  },
  {
    question: 'Is home insurance based on the purchase price of the house?',
    answer: 'Not necessarily. Homeowners insurance commonly focuses on the cost to repair or rebuild the insured structure, which can differ substantially from a home’s purchase price or taxable value.',
  },
  {
    question: 'Does a Texas home insurance estimate include flood insurance?',
    answer: 'Not automatically. Standard homeowners policies generally treat flood coverage separately, so the calculator lets you add a separate flood-cost assumption when it is relevant to your planning.',
  },
  {
    question: 'Why can homeowners insurance costs vary so much across Texas?',
    answer: 'Location, rebuilding cost, roof and construction characteristics, wind and hail exposure, coastal risk, claims history, deductibles, and selected coverage can all materially change the final premium.',
  },
] as const;

export const salarySeoTitle = 'Texas Paycheck Calculator | Take-Home Pay After Taxes';
export const salaryDescription =
  'Estimate Texas take-home pay after federal income tax, Social Security, Medicare, benefits, retirement contributions, and other deductions. Texas has no individual state income tax.';

export const salaryFaqs = [
  {
    question: 'Does Texas have a state income tax on wages?',
    answer: 'Texas does not impose an individual state income tax, so a Texas paycheck estimate usually focuses on federal income tax, Social Security, Medicare, benefits, retirement contributions and other payroll deductions.',
  },
  {
    question: 'How do I estimate after-tax income in Texas?',
    answer: 'Start with gross pay, subtract estimated federal income tax and payroll taxes, then include benefits, retirement contributions and any other deductions that apply to your paycheck.',
  },
  {
    question: 'Should I use salary or paycheck amount when comparing jobs?',
    answer: 'Use both. Annual salary is useful for comparing offers, but monthly and per-paycheck take-home amounts are better for budgeting. Compare benefits, retirement contributions, health-insurance deductions and any bonus or commission structure as well as base salary.',
  },
  {
    question: 'Why can my actual Texas paycheck differ from this estimate?',
    answer: 'Actual withholding depends on filing status, Form W-4 elections, pre-tax benefits, retirement contributions, bonuses, employer payroll settings and other personal tax details. This calculator is designed for scenario planning rather than payroll preparation.',
  },
  {
    question: 'Where can I verify federal withholding?',
    answer: 'Use current IRS withholding guidance or the IRS Tax Withholding Estimator, especially after a job change, marriage, major income change or another event that affects your tax situation.',
  },
] as const;

export function buildCalculatorHead(
  brand: BrandConfig,
  options: {
    canonicalPath: string;
    title: string;
    description: string;
    featureList: string[];
    faqs?: ReadonlyArray<CalculatorFaq>;
    breadcrumbParent?: CalculatorBreadcrumbParent;
    applicationCategory?: string;
  },
) {
  const siteUrl = `https://${brand.identity.domain}`;
  const pageUrl = absoluteUrl(brand, options.canonicalPath);
  const breadcrumbParent = options.breadcrumbParent ?? {
    name: 'Financial Tools',
    path: '/decide/financial-tools',
  };
  const faqEntity = options.faqs?.length
    ? {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        isPartOf: { '@id': `${pageUrl}#page` },
        mainEntity: options.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null;

  return {
    meta: buildMeta(brand, {
      canonicalPath: options.canonicalPath,
      title: options.title,
      description: options.description,
    }),
    links: [canonicalLink(brand, options.canonicalPath)],
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${pageUrl}#page`,
            url: pageUrl,
            name: options.title,
            description: options.description,
            isPartOf: { '@id': `${siteUrl}/#website` },
            mainEntity: { '@id': `${pageUrl}#application` },
            breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
          },
          {
            '@type': 'WebApplication',
            '@id': `${pageUrl}#application`,
            name: options.title,
            description: options.description,
            url: pageUrl,
            ...(options.applicationCategory
              ? { applicationCategory: options.applicationCategory }
              : { applicationCategory: 'FinanceApplication' }),
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript',
            featureList: options.featureList,
            isPartOf: { '@id': `${pageUrl}#page` },
            mainEntityOfPage: { '@id': `${pageUrl}#page` },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              {
                '@type': 'ListItem',
                position: 2,
                name: breadcrumbParent.name,
                item: absoluteUrl(brand, breadcrumbParent.path),
              },
              { '@type': 'ListItem', position: 3, name: options.title, item: pageUrl },
            ],
          },
          ...(faqEntity ? [faqEntity] : []),
        ],
      }),
    ],
  };
}
