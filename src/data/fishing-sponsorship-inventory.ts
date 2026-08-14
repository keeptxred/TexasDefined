import type { FishingSponsorInventoryItem } from '@/data/fishing-sponsorship.types';

/** Internal launch rate card. Prices are planning defaults, not public promises. */
export const FISHING_SPONSOR_INVENTORY: FishingSponsorInventoryItem[] = [
  { kind: 'featured-guide', label: 'Featured guide', description: 'Clearly sponsored guide visibility without changing verified-directory order.', standardMonthlyCents: 9900, introMonthlyCents: 5900, maxConcurrent: 3, exclusive: false },
  { kind: 'lake-guide', label: 'Lake guide placement', description: 'Sponsored guide presence on one complete lake guide.', standardMonthlyCents: 12900, introMonthlyCents: 7900, maxConcurrent: 3, exclusive: false },
  { kind: 'regional-guide', label: 'Regional guide placement', description: 'Sponsored guide presence across one Texas fishing region.', standardMonthlyCents: 14900, introMonthlyCents: 9900, maxConcurrent: 3, exclusive: false },
  { kind: 'species-guide', label: 'Species guide placement', description: 'Sponsored guide presence on one fish-species guide.', standardMonthlyCents: 9900, introMonthlyCents: 5900, maxConcurrent: 3, exclusive: false },
  { kind: 'lake-sponsor', label: 'Lake sponsor', description: 'Exclusive lake-level sponsorship inventory; editorial lake facts and rankings remain independent.', standardMonthlyCents: 24900, introMonthlyCents: 14900, maxConcurrent: 1, exclusive: true },
  { kind: 'featured-marina', label: 'Featured marina', description: 'Clearly labeled marina promotion on relevant fishing surfaces.', standardMonthlyCents: 7900, introMonthlyCents: 4900, maxConcurrent: 3, exclusive: false },
  { kind: 'featured-tackle-shop', label: 'Featured tackle shop', description: 'Clearly labeled tackle-shop promotion on relevant fishing surfaces.', standardMonthlyCents: 7900, introMonthlyCents: 4900, maxConcurrent: 3, exclusive: false },
  { kind: 'featured-lodging', label: 'Featured lodging', description: 'Clearly labeled lodging promotion near relevant fishing destinations.', standardMonthlyCents: 7900, introMonthlyCents: 4900, maxConcurrent: 3, exclusive: false },
  { kind: 'featured-campground', label: 'Featured campground', description: 'Clearly labeled campground promotion near relevant fishing destinations.', standardMonthlyCents: 7900, introMonthlyCents: 4900, maxConcurrent: 3, exclusive: false },
  { kind: 'featured-restaurant', label: 'Featured restaurant', description: 'Clearly labeled restaurant promotion near relevant fishing destinations.', standardMonthlyCents: 7900, introMonthlyCents: 4900, maxConcurrent: 3, exclusive: false },
  { kind: 'regional-advertiser', label: 'Regional advertiser', description: 'Regional fishing sponsorship inventory with no influence over editorial recommendations.', standardMonthlyCents: 19900, introMonthlyCents: 12900, maxConcurrent: 3, exclusive: false },
  { kind: 'statewide-advertiser', label: 'Statewide advertiser', description: 'Statewide fishing sponsorship inventory with no influence over planner or lake ordering.', standardMonthlyCents: 34900, introMonthlyCents: 19900, maxConcurrent: 3, exclusive: false },
];

export const FISHING_SPONSOR_INTRO_TERM_DAYS = 90;
