import { trackAffiliateClick } from '@/lib/affiliate-click';

type Offer = Readonly<{
  title: string;
  description: string;
  cta: string;
  partner: string;
  trackedUrl: string;
}>;

// Activate a product only after the retailer approves TexasDefined and the
// actual account-specific tracked destination has been verified. Ordinary
// retail product URLs and guessed publisher IDs are NOT affiliate links.
// Initial product catalog is deliberately empty until that proof exists.
export const VERIFIED_FOOTBALL_GEAR_OFFERS: readonly Offer[] = [];

const HOTEL_CJ_PUBLISHER_ID = '101876465';
const HOTELS_DESTINATION = 'https://www.hotels.com/';
// Use the same approved CJ deep-link contract as stay-affiliate-options.js.
const HOTELS_AFFILIATE_URL = `https://www.anrdoezrs.net/links/${HOTEL_CJ_PUBLISHER_ID}/type/dlg/${encodeURI(HOTELS_DESTINATION)}`;
// RVshare is an existing active CJ advertiser for TexasDefined. This uses the
// same previously verified destination and DLG builder as stay-affiliate-options.js.
const RVSHARE_DESTINATION = 'https://rvshare.com/';
const RVSHARE_AFFILIATE_URL = `https://www.anrdoezrs.net/links/${HOTEL_CJ_PUBLISHER_ID}/type/dlg/${encodeURI(RVSHARE_DESTINATION)}`;

function isVerifiedProductUrl(url: string) {
  try {
    const parsed = new URL(url);
    // Every additional network/merchant requires a reviewed allowlist change.
    return parsed.protocol === 'https:' &&
      parsed.hostname === 'www.anrdoezrs.net' &&
      parsed.pathname.startsWith(`/links/${HOTEL_CJ_PUBLISHER_ID}/type/dlg/`);
  } catch {
    return false;
  }
}

export function FootballFanOffers({ slug, hasUpcomingAwayTravel, showTravelPlanning = false }: { slug: string; hasUpcomingAwayTravel: boolean; showTravelPlanning?: boolean }) {
  const showHotels = hasUpcomingAwayTravel || showTravelPlanning;
  const gearOffers = VERIFIED_FOOTBALL_GEAR_OFFERS.filter((offer) => isVerifiedProductUrl(offer.trackedUrl));

  return (
    <section aria-label="Football fan shopping and travel" className="mt-6 border-t border-border pt-5">
      <h3 className="font-display text-2xl leading-tight">Friday-night fan essentials</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        For the stands: consider a padded bleacher seat, warm layers, rain protection and a portable charger.
        Check your game's bag, seat and food rules with the actual host venue before buying.
      </p>
      {gearOffers.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {gearOffers.map((offer) => (
            <div className="border border-border bg-background p-4" key={offer.trackedUrl}>
              <p className="font-semibold">{offer.title}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{offer.description}</p>
              <a href={offer.trackedUrl} target="_blank" rel="sponsored nofollow noopener noreferrer"
                onClick={() => trackAffiliateClick({ partner: offer.partner, label: offer.cta, placement: `football-team-${slug}`, module: 'football-fan-essentials' })}
                className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">
                {offer.cta} ↗
              </a>
            </div>
          ))}
        </div>
      )}
      {showHotels && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 bg-background p-4">
          <div className="max-w-3xl">
            <p className="font-semibold">{hasUpcomingAwayTravel ? 'An away or neutral-site game coming up?' : 'Planning a football road trip?'}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Compare lodging for an overnight trip only after confirming the game's actual venue and date.
              This is a broad hotel search, not a hotel near a verified matchup.
            </p>
          </div>
          <a href={HOTELS_AFFILIATE_URL} target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-commercial-partner="hotels.com" data-commercial-placement="football-away-travel"
            onClick={() => trackAffiliateClick({ partner: 'hotels.com', label: 'Compare hotels for football travel', placement: `football-away-travel-${slug}`, module: 'football-fan-essentials' })}
            className="inline-flex min-h-11 items-center justify-center bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Compare hotels on Hotels.com ↗
          </a>
        </div>
      )}
      {showHotels && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 bg-background p-4">
          <div className="max-w-3xl">
            <p className="font-semibold">Traveling to a football game with family or friends?</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Compare RV rentals for a road trip or overnight stay. Do not assume the school, stadium or venue allows RV parking or tailgating; confirm rules and parking separately before reserving.
            </p>
          </div>
          <a href={RVSHARE_AFFILIATE_URL} target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-commercial-partner="rvshare" data-commercial-placement="football-road-trip-rv"
            onClick={() => trackAffiliateClick({ partner: 'rvshare', label: 'Compare RV rentals for football travel', placement: `football-rv-travel-${slug}`, module: 'football-fan-essentials' })}
            className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface">
            Compare RV rentals on RVshare ↗
          </a>
        </div>
      )}
      {showHotels || gearOffers.length > 0 ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Affiliate disclosure: TexasDefined may earn a commission from qualifying purchases, hotel bookings or RV reservations, at no additional cost to you.
          TexasDefined is not affiliated with the schools and these are not official team offers.
        </p>
      ) : null}
    </section>
  );
}
