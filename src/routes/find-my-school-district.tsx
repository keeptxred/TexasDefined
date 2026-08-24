import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

export const description = 'A dependable way to confirm which public school district serves an address before you buy, rent or enroll.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/find-my-school-district';
const pageUrl = `${siteUrl}${canonicalPath}`;
export const steps = [
  'Start with the Texas Education Agency’s official school and district pages.',
  'Enter the exact property address in an official district or county map.',
  'Confirm the assigned campus directly with the district.',
  'Ask about planned boundary changes, transfers or new-campus assignments.',
  'Keep written confirmation when a home purchase or lease depends on the answer.',
] as const;
export const stepNames = [
  'Start with the state school pages',
  'Check the exact address',
  'Confirm the assigned campus',
  'Ask about boundary changes',
  'Keep the answer in writing',
] as const;

export const Route = createFileRoute('/find-my-school-district')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Find the District That Serves Your Address', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to verify the school district for a Texas address', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep', position: index + 1, name: stepNames[index],
            text, url: `${pageUrl}#school-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Find Your School District', item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
