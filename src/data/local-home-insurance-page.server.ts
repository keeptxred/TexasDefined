import { texasDefinedBrand } from '@/brand/texasdefined';
import { LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG } from '@/data/local-home-insurance';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadLocalHomeInsurancePageServer(slug: string) {
  const profile = LOCAL_HOME_INSURANCE_PROFILE_BY_SLUG.get(slug);
  if (!profile) return null;

  const pageUrl = absoluteUrl(texasDefinedBrand, profile.insurancePath);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  const calculatorUrl = absoluteUrl(texasDefinedBrand, '/texas-home-insurance-calculator');

  const head = {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: profile.insurancePath,
      title: profile.insuranceSeoTitle,
      description: profile.insuranceDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, profile.insurancePath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#calculator`,
          name: profile.insuranceTitle,
          description: profile.insuranceDescription,
          url: pageUrl,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Any',
          isPartOf: { '@id': `${siteUrl}#website` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Texas home insurance calculator', item: calculatorUrl },
            { '@type': 'ListItem', position: 3, name: profile.name, item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: profile.insuranceFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
      ],
    })],
  };

  return { profile, head };
}
