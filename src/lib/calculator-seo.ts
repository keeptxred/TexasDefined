import type { BrandConfig } from '@/brand/types';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

type CalculatorFaq = Readonly<{ question: string; answer: string }>;

type CalculatorBreadcrumbParent = Readonly<{
  name: string;
  path: string;
}>;

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
            applicationCategory: options.applicationCategory ?? 'FinanceApplication',
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
