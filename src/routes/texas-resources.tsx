import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical starting point for moving, driving, buying and owning a home, finding Texas state agencies and navigating everyday life across the state.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-resources`;

const discoveryLinks = [
  ['Texas driver license', '/texas-drivers-license'],
  ['Texas DMV', '/texas-dmv'],
  ['Texas vehicle registration', '/texas-vehicle-registration'],
  ['Texas fishing license', '/texas-fishing-license'],
  ['Moving to Texas', '/moving-to-texas'],
  ['Money & Property', '/decide/financial-tools'],
  ['Texas septic system design & OSSF guide', '/article/texas-septic-systems-homeowner-guide'],
  ['Texas Explained', '/texas-explained'],
  ['Best places to go camping in Texas', '/best-places-to-go-camping-in-texas'],
  ['Texas vs every other state', '/texas-vs-every-state'],
  ['State Fair of Texas 2026', '/texas-state-fair'],
  ['Texas flag', '/texas-flag'],
  ['Texas Two Step', '/texas-two-step'],
] as const;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Start Here',
      description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${pageUrl}#resources` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#resources`,
      name: 'Practical Texas Defined guides',
      numberOfItems: discoveryLinks.length,
      itemListElement: discoveryLinks.map(([name, path], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@type': 'WebPage', name, url: `${siteUrl}${path}` },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Start Here', item: pageUrl },
      ],
    },
  ],
};

export const Route = createFileRoute('/texas-resources')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-resources',
      title: 'Texas Resources & State Agencies | Start Here',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-resources')],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(structuredData) }],
  }),
});
