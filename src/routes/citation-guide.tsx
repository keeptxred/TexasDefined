import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/citation-guide';
const pageUrl = absoluteUrl(texasDefinedBrand, canonicalPath);
const description = 'How to cite TexasDefined county, property-tax, data, travel and sports reference pages, Painted Churches resources and other maintained guides, including canonical URLs, source precedence, date context and machine-readable resources.';

export const Route = createFileRoute('/citation-guide')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'How to Cite TexasDefined References & Data', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'CollectionPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'How to Cite TexasDefined References & Data', description, isPartOf: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#website` }, publisher: { '@id': `${absoluteUrl(texasDefinedBrand, '/')}#organization` } },
        { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: absoluteUrl(texasDefinedBrand, '/') }, { '@type': 'ListItem', position: 2, name: 'Citation guide', item: pageUrl }] },
      ],
    })],
  }),
});
