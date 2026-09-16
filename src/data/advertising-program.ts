export type AdvertiserTierId = 'local' | 'growth' | 'premier' | 'custom';
export type AdvertiserBillingCycle = 'monthly' | 'annual';

export const ADVERTISING_AGREEMENT_VERSION = '2026-09-15-v1';

// Contract text intentionally stays out of the client bundle. advertiserAgreementSnapshot
// is defined in advertiser-agreement-content.server.ts and persisted when an advertiser signs.

export const advertiserTiers = [
  {
    id: 'local',
    name: 'Local Partner',
    monthlyPrice: 249,
    annualPrice: 2490,
    shortDescription: 'A professional presence beside one highly relevant Texas guide, destination or planning surface.',
    bestFor: 'Independent hotels, restaurants, attractions, RV parks, guides, movers and local services.',
    commitment: '3-month initial term on monthly billing; 12 months when billed annually.',
    features: [
      'One approved sponsored placement on a relevant Texas Defined surface',
      'One advertiser destination link',
      'Quarterly creative refreshes',
      'Monthly performance summary',
      'Clear Sponsored / Partner labeling',
      'Campaign setup and placement review',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Partner',
    monthlyPrice: 499,
    annualPrice: 4990,
    shortDescription: 'A broader regional footprint for businesses serving a metro, region or multiple related destinations.',
    bestFor: 'Hotel groups, tourism operators, moving companies, attractions, restaurant groups and regional services.',
    commitment: '3-month initial term on monthly billing; 12 months when billed annually.',
    features: [
      'Up to three approved sponsored placements on relevant Texas Defined surfaces',
      'One featured partner placement on a relevant hub when inventory permits',
      'Up to three advertiser destination links',
      'Quarterly creative refreshes',
      'Monthly performance summary',
      'One coordinated social support placement per month when suitable',
      'Campaign setup and placement review',
    ],
  },
  {
    id: 'premier',
    name: 'Premier Partner',
    monthlyPrice: 999,
    annualPrice: 9990,
    shortDescription: 'A sustained multi-placement presence for brands serving Texans across several high-intent content areas.',
    bestFor: 'Statewide travel brands, larger hospitality groups, relocation brands and established Texas-serving companies.',
    commitment: '3-month initial term on monthly billing; 12 months when billed annually.',
    features: [
      'Up to six approved sponsored placements on relevant Texas Defined surfaces',
      'Up to two featured partner placements on relevant hubs when inventory permits',
      'Up to six advertiser destination links',
      'Monthly creative refreshes',
      'Monthly performance summary',
      'Up to two coordinated social support placements per month when suitable',
      'Up to one clearly labeled sponsored feature per quarter',
      'Optional category exclusivity when separately quoted and available',
      'Priority campaign setup and placement review',
    ],
  },
  {
    id: 'custom',
    name: 'Custom Partnership',
    monthlyPrice: null,
    annualPrice: null,
    shortDescription: 'A proposal-built program for events, agencies, tourism organizations, seasonal campaigns or category sponsorships.',
    bestFor: 'Large campaigns, tourism organizations, agencies, custom seasonal programs and category sponsorships.',
    commitment: 'Defined in the signed order form or insertion order.',
    features: [
      'Custom placement mix and campaign term',
      'Custom creative and sponsored-content scope',
      'Optional category or section exclusivity when available',
      'Custom reporting cadence',
      'Invoice and purchase-order support for approved accounts',
      'Written order form defining price, dates and deliverables',
    ],
  },
] as const;

export const oneTimeCampaigns = [
  {
    name: 'Event Campaign',
    price: 'From $495',
    description: 'Short-duration promotion around a festival, opening, event weekend, destination push or other time-bound Texas opportunity.',
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

export const advertiserProgramRules = [
  'New advertisers prepay unless Texas Defined approves invoice terms in writing.',
  'Monthly plans have a three-month initial commitment and then continue month-to-month unless the order form states otherwise.',
  'Annual plans are billed annually in advance and are priced at approximately ten months of the corresponding monthly rate.',
  'Advertising fees purchase agreed placements and services, not guaranteed impressions, clicks, leads, bookings, sales or rankings.',
  'Paid relationships are clearly disclosed and do not purchase favorable reviews, rankings, recommendations or factual conclusions.',
  'Creative, landing pages and claims remain subject to Texas Defined approval and applicable law.',
] as const;

export function getAdvertiserTier(id: string | undefined) {
  return advertiserTiers.find((tier) => tier.id === id) ?? advertiserTiers[1];
}

export function advertiserPriceLabel(tier: (typeof advertiserTiers)[number], billing: AdvertiserBillingCycle) {
  const price = billing === 'annual' ? tier.annualPrice : tier.monthlyPrice;
  if (price == null) return 'Custom quote';
  return billing === 'annual' ? `$${price.toLocaleString()}/year` : `$${price.toLocaleString()}/month`;
}