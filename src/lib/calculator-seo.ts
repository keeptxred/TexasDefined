import type { BrandConfig } from '@/brand/types';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export function buildCalculatorHead(
  brand: BrandConfig,
  options: {
    canonicalPath: string;
    title: string;
    description: string;
    featureList: string[];
  },
) {
  const siteUrl = `https://${brand.identity.domain}`;
  const pageUrl = absoluteUrl(brand, options.canonicalPath);

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
            '@type': 'WebApplication',
            '@id': `${pageUrl}#application`,
            name: options.title,
            description: options.description,
            url: pageUrl,
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript',
            featureList: options.featureList,
            isPartOf: { '@id': `${siteUrl}/#website` },
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'Financial Tools', item: `${siteUrl}/decide/financial-tools` },
              { '@type': 'ListItem', position: 3, name: options.title, item: pageUrl },
            ],
          },
        ],
      }),
    ],
  };
}
