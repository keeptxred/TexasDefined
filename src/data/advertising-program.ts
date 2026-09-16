export type AdvertiserTierId = 'local' | 'growth' | 'premier' | 'custom';
export type AdvertiserBillingCycle = 'monthly' | 'annual';

export const ADVERTISING_AGREEMENT_VERSION = '2026-09-16-v2';

export const advertiserTiers = [
  {
    id: 'local',
    name: 'Local Partner',
    monthlyPrice: 249,
    annualPrice: 2490,
    shortDescription: 'For a local or regional business seeking contextual exposure beside a highly relevant Texas guide, event or destination.',
    bestFor: 'Independent hotels, restaurants, attractions, RV parks, guides, movers and local services.',
    commitment: '3-month initial term on monthly billing; 12 months when billed annually.',
    features: [
      'One approved sponsored placement on a relevant Texas Defined surface',
      'Business name and logo in the approved placement',
      'Short sponsor description and contextual call to action',
      'One advertiser destination URL',
      'Basic campaign tracking',
      'Monthly performance summary',
      'Quarterly creative refreshes',
      'Clear Sponsored / Partner labeling',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Partner',
    monthlyPrice: 499,
    annualPrice: 4990,
    shortDescription: 'For businesses that serve a metro, region or multiple related Texas destinations.',
    bestFor: 'Hotel groups, tourism operators, moving companies, attractions, restaurant groups and regional services.',
    commitment: '3-month initial term on monthly billing; 12 months when billed annually.',
    features: [
      'Everything appropriate from Local Partner',
      'Up to three approved sponsored placements on relevant Texas Defined surfaces',
      'Up to three advertiser destination links and contextual calls to action',
      'One featured partner placement on a relevant hub or category when inventory permits',
      'Monthly reporting and campaign tracking',
      'Quarterly creative refreshes',
      'Up to one appropriate coordinated social mention per month when available and suitable',
      'Improved placement options where approved inventory permits',
    ],
  },
  {
    id: 'premier',
    name: 'Premier Partner',
    monthlyPrice: 999,
    annualPrice: 9990,
    shortDescription: 'For brands that want a broader, sustained presence across a tightly matched Texas audience.',
    bestFor: 'Statewide travel brands, larger hospitality groups, relocation brands and established Texas-serving companies.',
    commitment: '3-month initial term on monthly billing; 12 months when billed annually.',
    features: [
      'Everything appropriate from Growth Partner',
      'Up to six approved sponsored placements on relevant Texas Defined surfaces',
      'Up to two featured hub or category placements when inventory permits',
      'Up to six advertiser destination links and contextual calls to action',
      'Monthly creative refreshes',
      'Detailed monthly performance report',
      'Up to two appropriate coordinated social mentions per month',
      'Up to one clearly labeled sponsored feature per quarter when editorially appropriate',
      'Optional category or location exclusivity add-on when separately quoted and available',
      'Campaign planning assistance and priority inventory selection',
    ],
  },
  {
    id: 'custom',
    name: 'Custom / Integrated',
    monthlyPrice: null,
    annualPrice: null,
    shortDescription: 'For destination, event, relocation, RV/outdoor, sports-travel, statewide, agency, tourism and seasonal campaigns that need a tailored plan.',
    bestFor: 'Tourism organizations, chambers/CVBs, agencies, statewide brands, seasonal campaigns and businesses needing a custom footprint or exclusivity.',
    commitment: 'Defined in the approved order form or insertion order.',
    features: [
      'Custom placement mix and campaign term',
      'Destination, event-series, Moving to Texas, RV/outdoor, Big Bend/West Texas and sports-travel campaign options',
      'Statewide, agency and multi-month integrated campaign options',
      'Optional category or location exclusivity when available',
      'Custom creative, sponsored-content and reporting scope',
      'Invoice and purchase-order support for approved accounts',
      'A written order form defining price, dates and deliverables',
    ],
  },
] as const;

export const oneTimeCampaigns = [
  {
    name: 'Event Campaign',
    price: 'From $495',
    description: 'A short-duration campaign built around a festival, opening, event weekend, destination push or other time-bound Texas opportunity.',
  },
  {
    name: 'Integrated Campaign',
    price: 'From $1,500',
    description: 'A custom package combining multiple placements, sponsored content and/or social distribution around one campaign objective.',
  },
  {
    name: 'Section or Category Sponsorship',
    price: 'Custom quote',
    description: 'A larger sponsorship around an eligible Texas Defined section, seasonal collection or audience vertical when inventory and fit allow.',
  },
] as const;

export const advertisingPaymentMethods = [
  {
    name: 'Credit or debit card',
    description: 'Secure payment through Stripe-hosted checkout or the Stripe Hosted Invoice Page. Texas Defined does not store raw card details.',
  },
  {
    name: 'ACH / bank payment',
    description: 'Available through Stripe for eligible invoices and approved advertiser accounts.',
  },
  {
    name: 'Invoice',
    description: 'Stripe Invoicing is available for approved advertisers. New accounts generally prepay; approved organizations may receive Net 15 or, when required, Net 30 terms.',
  },
] as const;

export const advertiserProgramRules = [
  'New advertisers prepay unless Texas Defined approves invoice terms in writing.',
  'Monthly plans have a three-month initial commitment and then continue month-to-month unless the order form states otherwise.',
  'Annual plans are billed annually in advance and are priced at approximately ten months of the corresponding monthly rate.',
  'Advertising fees purchase the agreed placements and services, not guaranteed impressions, clicks, leads, bookings, sales, rankings or editorial coverage.',
  'Paid relationships are clearly disclosed and do not purchase favorable reviews, rankings, recommendations or factual conclusions.',
  'Creative, landing pages and claims remain subject to Texas Defined approval and applicable law.',
  'Campaigns do not begin until required payment, an approved purchase order or other written billing approval is in place.',
] as const;

export const agreementClauses = [
  {
    heading: '1. Parties and order',
    body: 'This Advertising and Sponsorship Agreement is between Texas Defined (Publisher) and the advertiser identified in the acceptance form (Advertiser). The selected tier, billing cycle, approved campaign dates, placements, pricing, and any written order form or insertion order are incorporated into this Agreement.',
  },
  {
    heading: '2. Eligibility and approval',
    body: 'All advertising is subject to Publisher review for business identity, audience fit, landing-page quality, legal and policy compliance, available inventory and reader trust. Submission or electronic signature does not require Publisher to accept an advertiser, campaign or placement. Publisher may request verification or decline an order before activation.',
  },
  {
    heading: '3. Services and placement',
    body: 'Publisher will provide the commercial placements and services included in the selected tier or written order form. Specific URLs, positions, launch dates, creative formats, availability and substitutions may be confirmed in writing. Publisher may make reasonable placement substitutions when a substantially similar placement is necessary for site operations, reader experience or inventory management.',
  },
  {
    heading: '4. Term and renewal',
    body: 'Monthly Local, Growth and Premier plans begin with a three-month initial commitment and then renew month-to-month until cancelled under this Agreement. Annual plans run for twelve months from the agreed campaign start date. Custom partnership terms are stated in the applicable order form.',
  },
  {
    heading: '5. Fees, invoices and payment',
    body: 'Fees are billed in advance unless Publisher approves different written terms. New advertisers generally prepay. Approved accounts may receive Net 15 terms and, where procurement requirements justify it, Net 30 terms. Advertiser is responsible for approved charges, applicable taxes and collection costs permitted by law. Publisher may pause or delay a campaign for overdue amounts.',
  },
  {
    heading: '6. Advertiser materials and license',
    body: 'Advertiser grants Publisher a non-exclusive, worldwide, royalty-free license during the campaign term to display, resize, format and technically adapt supplied names, trademarks, logos, images, copy, URLs and other campaign materials solely to perform the campaign. Advertiser represents that it has the rights needed to provide those materials.',
  },
  {
    heading: '7. Editorial independence and disclosure',
    body: 'Advertising does not purchase editorial coverage, favorable rankings, reviews, recommendations or factual conclusions. Publisher controls its editorial work independently. Sponsored placements and sponsored content may be labeled Sponsored, Partner, Advertisement or similar language and use sponsored or nofollow link attributes as Publisher considers appropriate.',
  },
  {
    heading: '8. Advertising claims and prohibited material',
    body: 'Advertiser is responsible for the accuracy, substantiation and legality of its claims, offers, disclosures and landing pages. Publisher may reject, remove or request changes to material that is misleading, unlawful, unsafe, infringing, discriminatory, deceptive, inconsistent with Publisher standards or materially harmful to reader trust.',
  },
  {
    heading: '9. No performance guarantee',
    body: 'Unless a signed order form expressly states a guaranteed delivery quantity, Publisher does not guarantee impressions, clicks, leads, bookings, sales, search rankings, social reach, conversion rates or other business outcomes. Reports are informational and may rely on first-party analytics, platform data and reasonable measurement methods.',
  },
  {
    heading: '10. Measurement, tracking and data',
    body: 'Campaign measurement may include aggregate impressions, clicks, referral activity and other available first-party or platform metrics. Small differences between Publisher reporting and Advertiser or third-party systems may result from attribution windows, filtering, consent, blockers or measurement methods and are not by themselves under-delivery. Publisher does not provide visitor personal information as sponsorship performance data. Each party remains responsible for its own privacy and data obligations.',
  },
  {
    heading: '11. Creative deadlines and delays',
    body: 'Advertiser will provide requested creative, destination URLs, approvals and required disclosures on time. Publisher is not responsible for lost campaign time caused by late or noncompliant Advertiser materials. The parties may agree in writing to revised dates where practical.',
  },
  {
    heading: '12. Cancellations, refunds and renewals',
    body: 'After the initial three-month monthly commitment, a monthly plan may be cancelled with 30 days written notice. Annual commitments remain due for the purchased annual term unless a signed order form provides otherwise. Custom and one-time campaign cancellation terms are governed by their order form. Amounts already earned for delivered services are non-refundable except as expressly stated in writing.',
  },
  {
    heading: '13. Publisher make-goods',
    body: 'If Publisher materially fails to deliver an agreed placement for reasons within Publisher control, Publisher may provide a reasonable make-good such as replacement placement time, an equivalent placement or a proportional credit. A make-good is the primary remedy for ordinary under-delivery unless the parties agree otherwise in writing.',
  },
  {
    heading: '14. Suspension and termination',
    body: 'Publisher may suspend or terminate a campaign for nonpayment, unlawful material, material breach, security concerns, reputational harm caused by deceptive conduct, or a material conflict with Publisher standards. Either party may terminate for a material breach that remains uncured for 10 business days after written notice when the breach is capable of cure.',
  },
  {
    heading: '15. Confidential information',
    body: 'Each party will use reasonable care to protect non-public business information received from the other party and use it only for the relationship, except for information that is public, independently developed, lawfully received from another source, or required to be disclosed by law.',
  },
  {
    heading: '16. Intellectual property',
    body: 'Except for the limited campaign license above, each party retains ownership of its pre-existing intellectual property. Publisher retains ownership of the Texas Defined site, editorial content, layouts, data, software, analytics methods and other Publisher materials.',
  },
  {
    heading: '17. Compliance',
    body: 'Each party will comply with laws applicable to its performance. Advertiser is responsible for product, service, promotion, pricing, sweepstakes, endorsement, privacy and industry-specific requirements applicable to its campaign and landing pages.',
  },
  {
    heading: '18. Indemnification',
    body: 'Advertiser will defend and indemnify Publisher and its personnel against third-party claims arising from Advertiser materials, Advertiser products or services, Advertiser claims, infringement by materials supplied by Advertiser, or Advertiser violation of law, except to the extent caused by Publisher misconduct.',
  },
  {
    heading: '19. Limitation of liability',
    body: 'To the maximum extent permitted by law, neither party is liable to the other for indirect, incidental, special, exemplary, consequential or lost-profit damages arising from this Agreement. Publisher total liability arising from a campaign will not exceed the fees actually paid to Publisher for the affected campaign during the six months preceding the event giving rise to the claim, except where law does not permit that limitation.',
  },
  {
    heading: '20. Force majeure',
    body: 'Neither party is responsible for delay or failure caused by events beyond reasonable control, including major outages, natural disasters, labor disruptions, acts of government, war, terrorism, widespread network failures or platform failures. Payment obligations for services already delivered are not excused.',
  },
  {
    heading: '21. Independent contractors',
    body: 'The parties are independent contractors. This Agreement does not create an employment, agency, franchise, fiduciary, partnership or joint-venture relationship, and neither party may bind the other except as expressly agreed in writing.',
  },
  {
    heading: '22. Assignment',
    body: 'Neither party may assign this Agreement without the other party written consent, except in connection with a merger, reorganization, sale of substantially all relevant assets or similar business succession, provided the successor assumes the obligations of this Agreement.',
  },
  {
    heading: '23. Notices',
    body: 'Operational notices may be sent to the business email addresses used for the campaign. Formal breach, cancellation or legal notices should be sent to the addresses stated in the order form or other written account records. Billing questions may be sent to admin@texasdefined.com.',
  },
  {
    heading: '24. Governing law',
    body: 'This Agreement is governed by the laws of the State of Texas, without regard to conflict-of-law rules. Venue for a dispute will lie in a court of competent jurisdiction in the Texas county of Publisher principal place of business, unless the parties agree otherwise in writing or applicable law requires another forum.',
  },
  {
    heading: '25. Entire agreement and changes',
    body: 'This Agreement, the selected tier schedule, any signed order form or insertion order, and any incorporated written campaign terms form the entire agreement concerning the campaign and replace prior discussions on that subject. A material amendment must be in writing and accepted by authorized representatives of both parties.',
  },
  {
    heading: '26. Electronic signatures',
    body: 'The parties may accept this Agreement electronically and in counterparts. A signer who types a name and affirmatively indicates an intent to sign represents that the signer is authorized to bind the identified organization. Publisher may require additional verification or a countersignature before a campaign becomes active.',
  },
] as const;

export function getAdvertiserTier(id: string | undefined) {
  return advertiserTiers.find((tier) => tier.id === id) ?? advertiserTiers[1];
}

export function advertiserPriceLabel(tier: (typeof advertiserTiers)[number], billing: AdvertiserBillingCycle) {
  const price = billing === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  if (price == null) return 'Custom quote';
  return billing === 'annual' ? `$${price.toLocaleString()}/year` : `$${price.toLocaleString()}/month`;
}

export function advertiserAgreementSnapshot(tierId: AdvertiserTierId, billing: AdvertiserBillingCycle) {
  const tier = getAdvertiserTier(tierId);
  const schedule = [
    `TEXAS DEFINED ADVERTISING AND SPONSORSHIP AGREEMENT`,
    `Agreement version: ${ADVERTISING_AGREEMENT_VERSION}`,
    `Selected package: ${tier.name}`,
    `Billing: ${billing}`,
    `Published price: ${advertiserPriceLabel(tier, billing)}`,
    `Commitment: ${tier.commitment}`,
    `Included services:`,
    ...tier.features.map((feature) => `- ${feature}`),
    '',
    ...agreementClauses.flatMap((clause) => [clause.heading, clause.body, '']),
  ];
  return schedule.join('\n');
}
