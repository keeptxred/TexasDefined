/** Build 2 Houston catalog overlays the existing corporate directory.
 * These records are independent editorial listings, not commercial relationships.
 * Legacy provider slugs remain the stable join key until Explore identities are vetted.
 * null locationId means no vetted Explore location join, NOT that the venue has no address.
 */
import { corporateEventProviders } from './corporate-events.ts';
import { houstonBuild2VerifiedProviders } from './corporate-events-houston-build2';
import type { MarketplaceExperience, MarketplacePackage, OccasionKey, ActivityKey, AmenityKey, EnvironmentKey, MarketplaceSetting } from './group-event-marketplace-foundation';

export type HoustonLegacyKind = 'multi-site-operator' | 'mobile-experience' | 'venue-and-mobile' | 'activity-at-venue' | 'location-needs-identity-link';
export type HoustonInventoryReview = {
  slug: string;
  city: string;
  area: string;
  kind: HoustonLegacyKind;
  sourceUrl: string;
  lastLegacyReviewOn: string;
  requiresIndependentLocationCheck: boolean;
  newlyResearched: boolean;
};
/** Only provider identities documented by their operator as multi-site/mobile are overridden.
 * No location UUID or unverified venue address is created.
 */
const legacyKinds: Record<string, HoustonLegacyKind> = {
  'the-escape-game-houston': 'multi-site-operator',
  'escape-it-houston-group-events': 'multi-site-operator',
  'game-show-experience-houston': 'venue-and-mobile',
  'trill-on-wheels': 'mobile-experience',
  'houston-food-bank-corporate-volunteers': 'activity-at-venue',
};
const newSlugs = new Set(houstonBuild2VerifiedProviders.map(x => x.slug));
export const houstonInventoryAudit: HoustonInventoryReview[] = corporateEventProviders
  .filter(x => x.city === 'Houston' || x.metro === 'Houston')
  .map(x => ({
    slug: x.slug, city: x.city, area: x.area,
    kind: legacyKinds[x.slug] ?? 'location-needs-identity-link',
    sourceUrl: x.sourceUrl, lastLegacyReviewOn: x.verifiedOn,
    requiresIndependentLocationCheck: !newSlugs.has(x.slug),
    newlyResearched: newSlugs.has(x.slug),
  }));

type EvidenceShape = {
  venueClass: 'physical'|'watercraft'|'multi-boat-provider';
  occasion: OccasionKey[];
  activities: ActivityKey[];
  setting: MarketplaceSetting;
  environment: EnvironmentKey[];
  amenities: AmenityKey[];
  food: 'available'|'unknown';
  activityMax: number | null;
  simultaneous: number | null;
  duration: number | null;
  /** Human-readable capacity-specific detail; never parsed as an automatic booking limit. */
  capacityScope: string;
  /** Operator-supplied accessibility evidence, absent when not established. */
  accessibilityNote: string | null;
  /** Editorial pricing guidance, not a universal per-person price. */
  pricingNote: string | null;
};
/** Every public claim below is backed by the identical operator source on the
 * corresponding legacy provider. Missing fields deliberately remain unknown.
 */
export const houstonBuild2Evidence: Record<string, EvidenceShape> = {
  'cypress-event-hall-group-rentals': {
    venueClass:'physical', occasion:['corporate-events','company-parties','family-reunions','graduations','birthdays'],
    activities:[], setting:'indoor', environment:['indoor','private-room'],
    amenities:['audiovisual-equipment','catering-available','private-meeting-space'],
    food:'available', activityMax:100, simultaneous:100, duration:null,
    capacityScope:'100-person event-hall rental, not a facilitated activity or attendance guarantee.',
    accessibilityNote:null,
    pricingNote:'Operator lists a six-hour Mon–Thu rental at $1,600; weekend, holiday, extras and security are different and require a dated venue quote.',
  },
  'lindsay-lakes-cypress-events': {
    venueClass:'physical', occasion:['corporate-events','company-parties','family-reunions','private-gatherings'],
    activities:[], setting:'mixed', environment:['indoor','outdoor'],
    amenities:['catering-available','food-available'], food:'available',
    activityMax:null, simultaneous:null, duration:null,
    capacityScope:'No official guest ceiling found on corporate-events source; venue layout requires an inquiry.',
    accessibilityNote:null,
    pricingNote:'Operator advertises buffet food from $20 per person; that is NOT a total venue or corporate package price.',
  },
  'towne-lake-lakehouse-events': {
    venueClass:'physical', occasion:['corporate-events','company-parties','weddings','family-reunions'],
    activities:[], setting:'mixed', environment:['indoor','outdoor','waterfront'],
    amenities:['private-meeting-space','audiovisual-equipment'],
    food:'unknown', activityMax:200, simultaneous:200, duration:null,
    capacityScope:'200-seat ballroom/patio configuration; separate conference room seats 12.',
    accessibilityNote:null, pricingNote:null,
  },
  'escapology-cypress-group-events': {
    venueClass:'physical', occasion:['corporate-events','team-building','birthdays','company-parties'],
    activities:['escape-room'], setting:'indoor', environment:['indoor'],
    amenities:[], food:'unknown', activityMax:null, simultaneous:null, duration:60,
    capacityScope:'Private room games; aggregate multi-room capacity unconfirmed.',
    accessibilityNote:'Operator says some puzzles may need accommodations; contact the venue for accessibility requests.',
    pricingNote:null,
  },
  'escapology-sugar-land-group-events': {
    venueClass:'physical', occasion:['corporate-events','team-building','birthdays','company-parties'],
    activities:['escape-room'], setting:'indoor', environment:['indoor'],
    amenities:[], food:'unknown', activityMax:null, simultaneous:null, duration:60,
    capacityScope:'Seven private rooms; VIP format may start games together, but no total group capacity is published.',
    accessibilityNote:'Official Sugar Land FAQ advises contacting staff about color, reach and other game accommodations.',
    pricingNote:null,
  },
  'county-line-pearland-corporate-events': {
    venueClass:'physical', occasion:['corporate-events','company-parties','family-reunions','private-gatherings'],
    activities:[], setting:'indoor', environment:['indoor'],
    amenities:['catering-available','food-available'], food:'available',
    activityMax:null, simultaneous:null, duration:null,
    capacityScope:'3,200 square feet is an area, not a safely inferred guest maximum.',
    accessibilityNote:null, pricingNote:null,
  },
  'young-chefs-woodlands-group-events': {
    venueClass:'physical', occasion:['corporate-events','team-building','family-reunions','birthdays'],
    activities:['cooking-class'], setting:'indoor', environment:['indoor'],
    amenities:[], food:'unknown', activityMax:null, simultaneous:null, duration:null,
    capacityScope:'Corporate group session size not published.',
    accessibilityNote:null, pricingNote:null,
  },
  'urbanchef-houston-team-building': {
    venueClass:'physical', occasion:['corporate-events','team-building','company-parties'],
    activities:['cooking-class','team-competition'], setting:'indoor', environment:['indoor'],
    amenities:['food-available','private-meeting-space'], food:'available',
    activityMax:48, simultaneous:48, duration:null,
    capacityScope:'48 across two separate 24-participant teaching kitchens, not 48 in one kitchen.',
    accessibilityNote:null,
    pricingNote:'The operator lists a $300 deposit applied to the balance, not a published per-person corporate price.',
  },
  'norris-citycentre-houston-events': {
    venueClass:'physical', occasion:['corporate-events','company-parties','employee-appreciation'],
    activities:[], setting:'indoor', environment:['indoor','private-room'],
    amenities:['private-meeting-space'], food:'unknown',
    activityMax:null, simultaneous:null, duration:null,
    capacityScope:'Room-by-room configurations not independently confirmed for this catalog.',
    accessibilityNote:null, pricingNote:null,
  },
  'houston-party-boats-league-city': {
    venueClass:'watercraft', occasion:['corporate-events','company-parties','family-reunions','birthdays','anniversaries'],
    activities:['group-cruise'], setting:'mixed', environment:['outdoor','covered-outdoor','waterfront'],
    amenities:['outside-catering-permitted'], food:'available',
    activityMax:75, simultaneous:75, duration:null,
    capacityScope:'75 passenger Celebration vessel only; separate Houston Party Boat holds 49.',
    accessibilityNote:null, pricingNote:null,
  },
  'galveston-sea-ventures-corporate-charter': {
    venueClass:'multi-boat-provider', occasion:['corporate-events','team-building','client-entertainment','family-reunions'],
    activities:['fishing-charter','guided-tour'], setting:'outdoor', environment:['outdoor','waterfront'],
    amenities:[], food:'unknown', activityMax:6, simultaneous:6, duration:null,
    capacityScope:'Single boat holds up to six; multi-boat total requires an operator-specific plan.',
    accessibilityNote:null,
    pricingNote:'Trip fares are per-boat; do not treat boat price as a per-person corporate rate.',
  },
  'bb-sportfishing-galveston-group-charters': {
    venueClass:'multi-boat-provider', occasion:['corporate-events','client-entertainment','family-reunions'],
    activities:['fishing-charter','group-cruise'], setting:'outdoor', environment:['outdoor','waterfront'],
    amenities:[], food:'unknown', activityMax:6, simultaneous:6, duration:null,
    capacityScope:'Single private charter up to six; larger fleet configuration is not confirmed.',
    accessibilityNote:null, pricingNote:null,
  },
};
const makeSource = (url:string, date:string) => ({
  officialUrl:url, lastCheckedAt:date, lastVerifiedAt:date, status:'verified' as const,
});
export const houstonBuild2Experiences: MarketplaceExperience[] = houstonBuild2VerifiedProviders.map(provider => {
  const evidence = houstonBuild2Evidence[provider.slug];
  const source = makeSource(provider.sourceUrl,provider.verifiedOn);
  return {
    id:'houston-b2-'+provider.slug, provider:{
      entityId:null, legacySlug:provider.slug, name:provider.name, source,
    },
    locationId:null, servedCities:[provider.city], name:provider.name,
    minParticipants:null, maxParticipants:evidence.activityMax,
    simultaneousCapacity:evidence.simultaneous, rotationsConfirmed:false,
    durationMinutes:evidence.duration, setting:evidence.setting,
    groupBookingStatus:'eligible', foodStatus:evidence.food,
    occasions:evidence.occasion, activities:evidence.activities,
    verifiedAmenities:evidence.amenities, environmentTags:evidence.environment,
    participation:'independent', participationApprovedAt:null,
    participationEvidenceVerified:false, sponsorshipApprovedAt:null,
    source, primaryMediaId:null, mediaRights:'unconfirmed', published:true,
  };
});
/** The second boat has a separate identity and capacity; neither record
 * creates a reserved package or implies a simultaneous fleet booking. */
const partyBoat = houstonBuild2Experiences.find(item => item.provider.legacySlug === 'houston-party-boats-league-city')!;
export const houstonBuild2AdditionalExperiences: MarketplaceExperience[] = [{
  ...partyBoat, id:'houston-b2-houston-party-boat-49-passengers',
  name:'Houston Party Boat — private vessel', maxParticipants:49, simultaneousCapacity:49,
}];
export const houstonBuild2Catalog = [...houstonBuild2Experiences,...houstonBuild2AdditionalExperiences];
/** Quotes/rates remain unknown; a venue-wide capacity is not silently a
 * published per-person rate or available reservation.
 */
export const houstonBuild2Packages: MarketplacePackage[] = [
  ...[
    {id:'houston-b2-celebration-private-cruise',experienceId:'houston-b2-houston-party-boats-league-city',name:'Celebration private vessel',maxParticipants:75},
    {id:'houston-b2-houston-party-boat-private-cruise',experienceId:'houston-b2-houston-party-boat-49-passengers',name:'Houston Party Boat private vessel',maxParticipants:49},
  ].map(item => ({
    ...item, includedActivities:['Private group cruise'],foodAndBeverageDetails:'Confirm bringing food, drinks and service requirements with operator',
    minParticipants:null,durationMinutes:null,pricePerPersonCents:null,
    minimumSpendCents:null,validFrom:null,validUntil:null,
    source:makeSource('https://houstonpartyboats.com/','2026-10-28'),
  })),
];
