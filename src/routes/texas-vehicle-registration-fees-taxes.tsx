import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-vehicle-registration-fees-taxes';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = 'Texas vehicle registration fees, title charges, EV fees, sales and use tax, new-resident tax, gift tax and standard presumptive value explained.';

const faq = [
  {
    question: 'What is the standard Texas registration fee for a passenger vehicle?',
    answer: 'TxDMV lists a $50.75 base registration fee for cars and light trucks plus $1 for TexasSure, before local, inspection-related, processing, plate or electric-vehicle charges.',
  },
  {
    question: 'What is the Texas motor vehicle sales-tax rate?',
    answer: 'The Texas Comptroller lists a 6.25% motor vehicle sales-tax rate. Dealer trade-ins and private-party standard presumptive value rules can change the taxable amount.',
  },
  {
    question: 'What does a qualifying new Texas resident pay on a vehicle already owned?',
    answer: 'The Texas Comptroller lists a $90 new-resident tax in lieu of use tax when the statutory new-resident requirements are met and the vehicle was previously registered in the resident’s name outside Texas.',
  },
  {
    question: 'How is a private-party vehicle purchase taxed in Texas?',
    answer: 'Standard presumptive value rules generally tax a qualifying private-party purchase on the greater of the actual sales price or 80% of the vehicle’s SPV unless an allowed exception or timely certified appraisal applies.',
  },
  {
    question: 'How much is Texas motor vehicle gift tax?',
    answer: 'The Comptroller lists a $10 gift tax for qualifying transfers to eligible recipients. Transfers that do not qualify as gifts can instead be treated as taxable sales.',
  },
];

export const Route = createFileRoute('/texas-vehicle-registration-fees-taxes')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Vehicle Registration Fees, Taxes & EV Charges',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${pageUrl}#article`,
          headline: 'Texas Vehicle Registration Fees and Taxes',
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
            { '@type': 'ListItem', position: 4, name: 'Fees and taxes', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: lazyRouteComponent(
    () => import('@/components/editorial/VehicleRegistrationFeesTaxesPage'),
    'VehicleRegistrationFeesTaxesPage',
  ),
});
