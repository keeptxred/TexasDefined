import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { PROPERTY_TAX_HUB_FAQS, PropertyTaxHubPage } from '@/components/guides/PropertyTaxHubPage';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/property-tax-guides';
const title = 'Texas Property Tax Guide 2026: Exemptions, Protests & Rates';
const description = 'Texas property tax guide for 2026: understand appraisals, homestead exemptions, protests, local rates, MUDs, bills, deadlines, county offices and official-rate calculators.';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const siteUrl = absoluteUrl(texasDefinedBrand, '/');

export const Route = createFileRoute('/property-tax-guides')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title, description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#page`,
          url: pageUrl,
          name: title,
          description,
          dateModified: '2026-10-01',
          isPartOf: { '@id': `${siteUrl}#website` },
          publisher: { '@id': `${siteUrl}#organization` },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: PROPERTY_TAX_HUB_FAQS.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
            { '@type': 'ListItem', position: 2, name: 'Property', item: absoluteUrl(texasDefinedBrand, '/property') },
            { '@type': 'ListItem', position: 3, name: 'Texas Property Tax Guide', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: PropertyTaxHubPage,
});
