export type AdvertisingTierId = 'local' | 'growth' | 'premier';
export type AdvertisingBillingCadence = 'monthly' | 'annual';

export type AdvertisingTier = {
  id: AdvertisingTierId;
  name: string;
  tagline: string;
  bestFor: string;
  monthlyCents: number;
  annualCents: number;
  placements: string;
  destinationLinks: string;
  featuredHub: string;
  creativeRefresh: string;
  reporting: string;
  sponsoredFeature: string;
  socialSupport: string;
  bullets: string[];
};

export const ADVERTISING_TIERS: AdvertisingTier[] = [
  {
    id: 'local',
    name: 'Local Partner',
    tagline: 'A focused presence beside one highly relevant Texas resource.',
    bestFor: 'Independent hotels, restaurants, attractions, outfitters, local services and destination businesses serving one market or visitor intent.',
    monthlyCents: 24_900,
    annualCents: 249_000,
    placements: '1 approved sponsored placement',
    destinationLinks: '1 approved destination URL',
    featuredHub: '—',
    creativeRefresh: 'Quarterly',
    reporting: 'Monthly summary',
    sponsoredFeature: '—',
    socialSupport: '—',
    bullets: [
      'One clearly labeled sponsored placement on a mutually approved relevant page, guide or hub',
      'One approved destination URL with sponsored-link treatment',
      'Quarterly creative refresh',
      'Monthly placement performance summary',
      'Campaign setup, disclosure and placement review included',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Partner',
    tagline: 'Broader reach across a city, region or closely related Texas topic.',
    bestFor: 'Hotel groups, attractions, tourism operators, home and moving services, regional brands and businesses serving several related reader journeys.',
    monthlyCents: 49_900,
    annualCents: 499_000,
    placements: 'Up to 3 approved sponsored placements',
    destinationLinks: 'Up to 3 approved destination URLs',
    featuredHub: '1 featured partner unit',
    creativeRefresh: 'Quarterly',
    reporting: 'Monthly summary',
    sponsoredFeature: '—',
    socialSupport: 'Up to 1 sponsored social post / month',
    bullets: [
      'Up to three clearly labeled sponsored placements across mutually approved relevant surfaces',
      'One featured partner unit on an approved hub or directory surface',
      'Up to three approved destination URLs with sponsored-link treatment',
      'Quarterly creative refresh',
      'Monthly placement performance summary',
      'Up to one clearly disclosed sponsored social amplification post per month when campaign fit and platform eligibility allow',
    ],
  },
  {
    id: 'premier',
    name: 'Premier Partner',
    tagline: 'An integrated sponsorship for statewide or multi-market campaigns.',
    bestFor: 'Statewide brands, tourism organizations, larger hospitality groups, travel services and advertisers that need multiple coordinated placements.',
    monthlyCents: 99_900,
    annualCents: 999_000,
    placements: 'Up to 6 approved sponsored placements',
    destinationLinks: 'Up to 6 approved destination URLs',
    featuredHub: 'Up to 2 featured partner units',
    creativeRefresh: 'Monthly',
    reporting: 'Monthly summary',
    sponsoredFeature: 'Up to 1 / quarter',
    socialSupport: 'Up to 2 sponsored social posts / month',
    bullets: [
      'Up to six clearly labeled sponsored placements across mutually approved relevant surfaces',
      'Up to two featured partner units on approved hub or directory surfaces',
      'Up to six approved destination URLs with sponsored-link treatment',
      'Monthly creative refresh',
      'Monthly placement performance summary',
      'Up to one clearly labeled sponsored feature per calendar quarter, subject to production scheduling and approval',
      'Up to two clearly disclosed sponsored social amplification posts per month when campaign fit and platform eligibility allow',
      'Optional category exclusivity can be quoted separately when inventory permits',
    ],
  },
];

export const ADVERTISING_TIER_BY_ID = Object.fromEntries(
  ADVERTISING_TIERS.map((tier) => [tier.id, tier]),
) as Record<AdvertisingTierId, AdvertisingTier>;

export const ADVERTISING_COMPARISON_ROWS = [
  ['Sponsored placements', '1', 'Up to 3', 'Up to 6'],
  ['Featured partner hub unit', '—', '1', 'Up to 2'],
  ['Approved destination URLs', '1', 'Up to 3', 'Up to 6'],
  ['Creative refresh', 'Quarterly', 'Quarterly', 'Monthly'],
  ['Performance summary', 'Monthly', 'Monthly', 'Monthly'],
  ['Sponsored feature', '—', '—', 'Up to 1 / quarter'],
  ['Sponsored social support', '—', 'Up to 1 / month', 'Up to 2 / month'],
  ['Category exclusivity', '—', 'Quoted add-on', 'Quoted add-on'],
] as const;

export const ONE_TIME_ADVERTISING_OPTIONS = [
  {
    name: 'Event Campaign',
    price: 'From $495',
    detail: 'A short-duration campaign around a festival, opening, seasonal event, destination, sports weekend or other time-bound Texas travel moment.',
  },
  {
    name: 'Integrated Campaign',
    price: 'From $1,500',
    detail: 'A custom mix of sponsored placements, a sponsored feature, social amplification or multiple related surfaces for a defined campaign window.',
  },
  {
    name: 'Section or Category Sponsorship',
    price: 'Custom quote',
    detail: 'A larger sponsorship tied to an approved topic area such as travel, outdoor recreation, relocation, home, events or another relevant TexasDefined section.',
  },
] as const;

export const ADVERTISING_PAYMENT_METHODS = [
  {
    name: 'Card payment',
    detail: 'Secure customer-entered payment through Stripe-hosted checkout or a Stripe-hosted invoice page. TexasDefined does not store raw card data.',
  },
  {
    name: 'ACH / bank payment',
    detail: 'Available through supported Stripe invoice payment methods for eligible U.S. business customers and approved campaigns.',
  },
  {
    name: 'Invoice',
    detail: 'Stripe-hosted invoices are available for approved advertisers. New advertisers are prepaid by default; approved business accounts may receive Net 15 or, selectively, Net 30 terms.',
  },
] as const;

export const ADVERTISING_BILLING_POLICY = {
  monthly: 'Monthly plans require an initial three-month commitment, are billed in advance, and continue month-to-month after the initial term unless either party gives the notice required by the agreement.',
  annual: 'Annual plans cover twelve months and are prepaid at the published annual rate, which is priced at approximately two months less than twelve monthly payments.',
  invoice: 'One-time campaigns and approved business accounts may be invoiced. Campaign delivery does not begin until required prepayment, an approved purchase order, or approved credit terms are in place.',
  noGuarantee: 'TexasDefined sells agreed placements and services, not guaranteed impressions, clicks, leads, bookings, sales, rankings or editorial outcomes.',
} as const;

export function advertisingPrice(tier: AdvertisingTier, cadence: AdvertisingBillingCadence) {
  return cadence === 'annual' ? tier.annualCents : tier.monthlyCents;
}

export function formatAdvertisingPrice(cents: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents / 100);
}
