import { createFileRoute } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-vehicle-registration-renewal';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = 'Renew Texas vehicle registration online, by mail or in person. Check renewal timing, emissions rules, expired-registration limits and sticker delivery.';

const faq = [
  {
    question: 'How early can I renew Texas vehicle registration?',
    answer: 'TxDMV says online renewal is available beginning 90 days before the registration expiration date.',
  },
  {
    question: 'Can I renew an expired Texas registration online?',
    answer: 'TxDMV says online renewal may remain available for up to 12 months after expiration when no citation for expired registration has been issued. The official renewal system determines eligibility.',
  },
  {
    question: 'Does Texas still require a safety inspection before registration renewal?',
    answer: 'Most non-commercial vehicles no longer need an annual safety inspection before registration. Vehicles registered in designated emissions counties still need a passing emissions inspection unless an exemption applies, and commercial-vehicle inspection rules are different.',
  },
  {
    question: 'How long can an online registration sticker take to arrive?',
    answer: 'TxDMV advises allowing approximately three weeks for processing, printing and mailing. The renewal receipt can serve as temporary proof of current registration while the sticker is in transit, subject to TxDMV guidance.',
  },
];

export const Route = createFileRoute('/texas-vehicle-registration-renewal')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Vehicle Registration Renewal: Online & In Person',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${pageUrl}#article`,
          headline: 'Texas Vehicle Registration Renewal Guide',
          description,
          url: pageUrl,
          mainEntityOfPage: pageUrl,
          dateModified: '2026-09-14',
          author: { '@type': 'Organization', name: 'TexasDefined' },
          publisher: { '@id': `${siteUrl}/#organization` },
          isPartOf: { '@id': `${siteUrl}/#website` },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Texas DMV', item: `${siteUrl}/texas-dmv` },
            { '@type': 'ListItem', position: 3, name: 'Vehicle registration', item: `${siteUrl}/texas-vehicle-registration` },
            { '@type': 'ListItem', position: 4, name: 'Registration renewal', item: pageUrl },
          ],
        },
      ],
    })],
  }),
});
