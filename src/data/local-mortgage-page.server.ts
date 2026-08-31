import { texasDefinedBrand } from '@/brand/texasdefined';
import { LOCAL_MORTGAGE_PROFILE_BY_SLUG } from '@/data/local-mortgage';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadLocalMortgagePageServer(slug: string) {
  const profile = LOCAL_MORTGAGE_PROFILE_BY_SLUG.get(slug);
  if (!profile) return null;

  const pageUrl = absoluteUrl(texasDefinedBrand, profile.mortgagePath);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  const calculatorUrl = absoluteUrl(texasDefinedBrand, '/texas-mortgage-calculator');

  const head = {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: profile.mortgagePath,
      title: profile.mortgageSeoTitle,
      description: profile.mortgageDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, profile.mortgagePath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebApplication', '@id': `${pageUrl}#calculator`, name: profile.mortgageTitle, description: profile.mortgageDescription, url: pageUrl, applicationCategory: 'FinanceApplication', operatingSystem: 'Any', isPartOf: { '@id': `${siteUrl}#website` } },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Texas mortgage calculator', item: calculatorUrl },
          { '@type': 'ListItem', position: 3, name: profile.name, item: pageUrl },
        ] },
        { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: profile.mortgageFaqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) },
      ],
    })],
  };

  return { profile, head };
}
