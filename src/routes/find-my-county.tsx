import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'Enter a Texas street address to identify its county with the U.S. Census Bureau Geocoder, then open the matching Texas Defined county guide and local resources.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/find-my-county';
const pageUrl = `${siteUrl}${canonicalPath}`;

export const Route = createFileRoute('/find-my-county')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'What County Am I In? Find My Texas County by Address',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${pageUrl}#tool`,
          name: 'Find My Texas County',
          url: pageUrl,
          description,
          applicationCategory: 'ReferenceApplication',
          operatingSystem: 'Any',
          isPartOf: { '@id': `${siteUrl}/#website` },
          provider: { '@id': `${siteUrl}/#organization` },
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#page`,
          url: pageUrl,
          name: 'What County Am I In? Find My Texas County by Address',
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          mainEntity: { '@id': `${pageUrl}#tool` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving to Texas', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Find My Texas County', item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
