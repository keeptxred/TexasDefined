export type AffiliateEconomicsStatus =
  | "live"
  | "live-split-test"
  | "sunset"
  | "approved-awaiting-link"
  | "approved-inactive";

export type AffiliateEconomicsRecord = {
  id: string;
  partner: string;
  payout: string;
  attribution: string;
  routingRole: string;
  status: AffiliateEconomicsStatus;
  reviewedAt: string;
  note: string;
};

export const AFFILIATE_ECONOMICS_REVIEWED_AT = "2026-09-24";

export const AFFILIATE_ECONOMICS: readonly AffiliateEconomicsRecord[] = [
  {
    id: "gearup",
    partner: "GearUP",
    payout: "70% of the first paid subscription from a new referred user",
    attribution: "Qualifying new-user payment; cookie duration not stated in the welcome notice",
    routingRole: "Gaming routing and latency guides only",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Keep narrowly matched to the two governed routing/latency guides; do not expand sitewide just because the payout is high.",
  },
  {
    id: "rexing",
    partner: "Rexing",
    payout: "15% standard CJ commission",
    attribution: "45-day referral period",
    routingRole: "Driving, road-trip and automotive content",
    status: "approved-awaiting-link",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Approved, but ordinary Rexing browsing URLs are explicitly non-tracking. Publish only after an account-generated CJ tracking link is verified.",
  },
  {
    id: "viator",
    partner: "Viator",
    payout: "8% on completed experience bookings",
    attribution: "30 days",
    routingRole: "Tours and bookable experiences",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Primary governed experience partner where verified inventory exists.",
  },
  {
    id: "booking-car",
    partner: "Booking.com car rentals",
    payout: "From 6%",
    attribution: "Per active CJ terms",
    routingRole: "Rental-car comparison",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Retain ahead of lower-paying Expedia-family car offers while current terms remain materially stronger.",
  },
  {
    id: "rvshare",
    partner: "RVshare",
    payout: "5% on completed RV stays; $7 for each new RV listed",
    attribution: "30 days",
    routingRole: "RV, camping and road-trip intent",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Restricted to high-intent RV/camping/outdoors/road-trip surfaces.",
  },
  {
    id: "hotels-com",
    partner: "Hotels.com",
    payout: "4% on qualified hotel bookings",
    attribution: "Per active CJ terms",
    routingRole: "Verified exact-property hotel referrals",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Exact-property relevance keeps these links primary even when another OTA has a higher conditional headline rate.",
  },
  {
    id: "orbitz",
    partner: "Orbitz",
    payout: "3% retail hotel / 7% merchant hotel / 2% merchant hotel with promo code",
    attribution: "Per active CJ terms",
    routingRole: "Hotel-first event and sports-venue comparison",
    status: "live-split-test",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Evaluate realized revenue by booking type instead of assuming every hotel transaction earns 7%.",
  },
  {
    id: "travelocity",
    partner: "Travelocity",
    payout: "4% lodging",
    attribution: "Per active CJ terms",
    routingRole: "Broader destination and leisure hotel comparison",
    status: "live-split-test",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Keep the clean intent split until the governed exposure threshold and downstream booking data justify rerouting.",
  },
  {
    id: "really-good-stuff",
    partner: "Really Good Stuff",
    payout: "4% default; 0% coupon-attributed term",
    attribution: "Per active CJ terms",
    routingRole: "School and classroom supplies",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Coupon copy remains blocked so ordinary qualifying purchases can stay on the paid default term.",
  },
  {
    id: "discount-school-supply",
    partner: "Discount School Supply",
    payout: "4% through October 1, 2026 10:00 PDT; then 0%",
    attribution: "Per active CJ terms",
    routingRole: "School supplies",
    status: "sunset",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Existing component automatically stops rendering this partner at the documented paid-term cutoff.",
  },
  {
    id: "vrbo",
    partner: "Vrbo",
    payout: "Up to 2% on traveler bookings",
    attribution: "Per active CJ terms",
    routingRole: "Vacation-rental intent only",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Keep when the lodging type itself is relevant; do not replace it with a hotel offer solely on percentage.",
  },
  {
    id: "expedia-creators",
    partner: "Expedia Travel Creators",
    payout: "Variable by booking site, product and market",
    attribution: "7 days",
    routingRole: "Broad stay-search fallback",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Retained as broad-search infrastructure when no verified exact-property target is available.",
  },
  {
    id: "ticketmaster",
    partner: "Ticketmaster",
    payout: "Current Impact payout rate not verified in available program materials",
    attribution: "Per active Impact terms",
    routingRole: "Event ticketing when a verified Impact-tracked event URL is present",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Ticketmaster API event URLs are not assumed to be affiliate-tracked; the event pipeline uses the verified Impact tracking wrapper before treating a ticket CTA as an affiliate referral.",
  },
  {
    id: "citypass",
    partner: "CityPASS",
    payout: "Current account rate not verified in available approval notice",
    attribution: "Per active CJ terms",
    routingRole: "Multi-attraction pass intent",
    status: "live",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Keep specialized placements; do not infer or rank an unverified commission rate.",
  },
  {
    id: "motel6",
    partner: "Motel 6 / OYO USA",
    payout: "Active CJ rate not verified in available welcome notice",
    attribution: "Not verified",
    routingRole: "Direct Motel 6 / Studio 6 property intent",
    status: "approved-inactive",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Do not route traffic until the active CJ payout and an account-generated tracking destination are verified.",
  },
  {
    id: "abracadabra-nyc",
    partner: "Abracadabra NYC",
    payout: "Active CJ rate not stated in the available welcome notice",
    attribution: "Not stated in the available welcome notice",
    routingRole: "Cosplay, convention and seasonal costume intent",
    status: "approved-awaiting-link",
    reviewedAt: AFFILIATE_ECONOMICS_REVIEWED_AT,
    note: "Approved, but use only an account-generated shopper-facing CJ tracking link before any placement is activated.",
  },
] as const;
