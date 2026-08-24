import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'The basic steps for registering a vehicle after a move, plus the official state and county pages you’ll need along the way.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/find-my-dmv';
const pageUrl = `${siteUrl}${canonicalPath}`;
export const steps = [
  'Arrange insurance that meets Texas requirements.',
  'Complete any inspection or emissions step that applies to your vehicle and county.',
  'Gather your title, registration, identification and proof-of-residency documents.',
  'Check your county tax office for current fees, hours and accepted payment methods.',
  'Handle your Texas driver license separately through DPS.',
] as const;
export const stepNames = [
  'Arrange Texas insurance',
  'Check inspection requirements',
  'Gather your documents',
  'Confirm county-office details',
  'Plan your driver-license visit',
] as const;

export const Route = createFileRoute('/find-my-dmv')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Getting Your Car Settled in Texas', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to register a vehicle after moving to Texas', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep', position: index + 1, name: stepNames[index],
            text, url: `${pageUrl}#vehicle-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Getting Your Car Settled', item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
