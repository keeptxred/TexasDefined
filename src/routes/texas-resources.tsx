import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'Find practical Texas services, state agencies, local offices, moving help, property-tax resources and everyday answers organized around what you need to do.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/texas-resources`;

const discoveryLinks = [
  ['Texas driver license and ID', '/texas-drivers-license'],
  ['Texas vehicle registration', '/texas-vehicle-registration'],
  ['Find your county by address', '/find-my-county'],
  ['Find your school district', '/find-my-school-district'],
  ['Find your DMV or county office', '/find-my-dmv'],
  ['Property taxes and homestead help', '/decide/property-taxes'],
  ['Moving to Texas', '/moving-to-texas'],
  ['Start a business in Texas', '/start-a-business-in-texas'],
  ['Texas fishing license', '/texas-fishing-license'],
  ['Texas hunting licenses and public hunting', '/hunting'],
  ['Emergency and community services', '/find-my-emergency-services'],
  ['Texas voter-registration resources', '/find-my-voter-registration'],
  ['Money and property tools', '/decide/financial-tools'],
  ['Texas state agency guides', '/agency/texas-secretary-of-state'],
] as const;

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: 'Texas Resources: State Services, Agencies & Local Help',
      description,
      isPartOf: { '@id': `${siteUrl}/#website` },
      mainEntity: { '@id': `${pageUrl}#resources` },
      breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
    },
    {
      '@type': 'ItemList',
      '@id': `${pageUrl}#resources`,
      name: 'Practical Texas services and resource guides',
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
        { '@type': 'ListItem', position: 2, name: 'Texas Resources', item: pageUrl },
      ],
    },
  ],
};

export const Route = createFileRoute('/texas-resources')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/texas-resources',
      title: 'Texas Resources: State Services, Agencies & Local Help',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/texas-resources')],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(structuredData) }],
  }),
});
