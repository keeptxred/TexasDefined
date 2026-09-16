const siteUrl = 'https://texasdefined.com';

type FaqItem = {
  question: string;
  answer: string;
};

function JsonLd({ value }: { value: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value) }} />;
}

function authorityGraph(options: {
  canonicalPath: string;
  headline: string;
  description: string;
  breadcrumbName: string;
  faq: readonly FaqItem[];
}) {
  const pageUrl = `${siteUrl}${options.canonicalPath}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: options.headline,
        description: options.description,
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
        mainEntity: options.faq.map((item) => ({
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
          { '@type': 'ListItem', position: 4, name: options.breadcrumbName, item: pageUrl },
        ],
      },
    ],
  };
}

export function VehicleRegistrationRenewalSchema() {
  return <JsonLd value={authorityGraph({
    canonicalPath: '/texas-vehicle-registration-renewal',
    headline: 'Texas Vehicle Registration Renewal Guide',
    description: 'Renew Texas vehicle registration online, by mail or in person. Check renewal timing, emissions rules, expired-registration limits and sticker delivery.',
    breadcrumbName: 'Registration renewal',
    faq: [
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
    ],
  })} />;
}

export function VehicleRegistrationFeesTaxesSchema() {
  return <JsonLd value={authorityGraph({
    canonicalPath: '/texas-vehicle-registration-fees-taxes',
    headline: 'Texas Vehicle Registration Fees and Taxes',
    description: 'Texas vehicle registration fees, title charges, EV fees, sales and use tax, new-resident tax, gift tax and standard presumptive value explained.',
    breadcrumbName: 'Fees and taxes',
    faq: [
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
    ],
  })} />;
}
