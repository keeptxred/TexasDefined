import { texasDefinedBrand } from '@/brand/texasdefined';
import { LOCAL_HOMEOWNERSHIP_COST_PROFILE_BY_SLUG } from '@/data/local-homeownership-cost';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function loadLocalHomeownershipCostPageServer(slug: string) {
  const profile = LOCAL_HOMEOWNERSHIP_COST_PROFILE_BY_SLUG.get(slug);
  if (!profile) return null;

  const pageUrl = absoluteUrl(texasDefinedBrand, profile.ownershipPath);
  const siteUrl = absoluteUrl(texasDefinedBrand, '/');
  const calculatorUrl = absoluteUrl(texasDefinedBrand, '/texas-homeownership-cost-calculator');

  const head = {
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: profile.ownershipPath,
      title: profile.ownershipSeoTitle,
      description: profile.ownershipDescription,
    }),
    links: [canonicalLink(texasDefinedBrand, profile.ownershipPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#calculator`,
          name: profile.ownershipTitle,
          description: profile.ownershipDescription,
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
            { '@type': 'ListItem', position: 2, name: 'Texas homeownership cost calculator', item: calculatorUrl },
            { '@type': 'ListItem', position: 3, name: profile.name, item: pageUrl },
          ],
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: profile.ownershipFaqs.map((faq) => ({
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
