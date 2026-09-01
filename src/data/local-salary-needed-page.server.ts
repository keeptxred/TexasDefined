import { texasDefinedBrand } from '@/brand/texasdefined';
import { LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG } from '@/data/local-salary-needed';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadLocalSalaryNeededPageServer(slug: string) {
  const profile = LOCAL_SALARY_NEEDED_PROFILE_BY_SLUG.get(slug);
  if (!profile) return null;

  const pageUrl = absoluteUrl(texasDefinedBrand, profile.salaryPath);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  const comparisonUrl = absoluteUrl(texasDefinedBrand, '/texas-salary-comparison-by-city');
  const faqs = [
    { question: `Does ${profile.name} have one salary everyone needs to live there?`, answer: 'No. Housing, household size, transportation, insurance, debt, savings goals and payroll deductions differ too much for one responsible citywide salary requirement. This planner uses your own budget and assumptions.' },
    { question: `What should I verify before using a ${profile.name} salary target?`, answer: 'Replace estimates with the actual housing scenario, property-tax jurisdictions if buying, insurance quotes, utilities, commute costs, childcare or school costs, debt payments and benefit deductions that apply to your household.' },
    { question: 'Is this a tax-return or payroll estimate?', answer: 'No. It is a reverse household-budget planning estimate. Federal income tax, Social Security and Medicare treatment, benefits, filing status, credits, self-employment and other circumstances can materially change actual take-home pay.' },
  ];

  return {
    profile,
    faqs,
    head: {
      meta: buildMeta(texasDefinedBrand, { canonicalPath: profile.salaryPath, title: profile.salarySeoTitle, description: profile.salaryDescription }),
      links: [canonicalLink(texasDefinedBrand, profile.salaryPath)],
      scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
        { '@type': 'WebApplication', '@id': `${pageUrl}#calculator`, name: profile.salaryTitle, description: profile.salaryDescription, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', isPartOf: { '@id': `${siteUrl}#website` } },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Texas salary comparison by city', item: comparisonUrl },
          { '@type': 'ListItem', position: 3, name: profile.name, item: pageUrl },
        ] },
        { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ] })],
    },
  };
}