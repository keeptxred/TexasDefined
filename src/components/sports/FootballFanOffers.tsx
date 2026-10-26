import { useEffect, useState } from 'react';
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
// September 21 standard CJ creative and October 26 Halloween promotion.
// Publisher promotional-property ID is 101876465, not CID 8062457.
const MOTEL6_STANDARD_URL = 'https://www.tqlkg.com/click-' + HOTEL_CJ_PUBLISHER_ID + '-17198227';
const MOTEL6_HALLOWEEN_URL = 'https://www.jdoqocy.com/click-' + HOTEL_CJ_PUBLISHER_ID + '-17371482';
const MOTEL6_CAMPAIGN_START = Date.parse('2026-10-26T00:00:00Z');
const MOTEL6_CAMPAIGN_END = Date.parse('2026-11-01T05:00:00Z');
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
  const [clientNow, setClientNow] = useState(0);
  useEffect(() => {
    setClientNow(Date.now());
    const remaining = MOTEL6_CAMPAIGN_END - Date.now();
    if (remaining <= 0) return;
    const timer = window.setTimeout(() => setClientNow(Date.now()), Math.min(remaining + 250, 2147483647));
    return () => window.clearTimeout(timer);
  }, []);
  // First server/client render is identical; current offer appears post-hydration.
  const motel6Halloween = clientNow >= MOTEL6_CAMPAIGN_START && clientNow < MOTEL6_CAMPAIGN_END;
  const isStateChampionshipGuide = slug === 'texas-high-school-football-playoffs-explained';
  const gearOffers = VERIFIED_FOOTBALL_GEAR_OFFERS.filter((offer) => isVerifiedProductUrl(offer.trackedUrl));

  return (
    <section aria-label="Football fan shopping and travel" className="mt-6 border-t border-border pt-5">
      <h3 className="font-display text-2xl leading-tight">{isStateChampionshipGuide ? 'Plan your Texas playoff trip' : 'Friday-night fan essentials'}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        For the stands: consider a padded bleacher seat, warm layers, rain protection and a portable charger.
        Check your game's bag, seat and food rules with the actual host venue before buying.
      </p>
      {isStateChampionshipGuide && showHotels && (
        <div className="mt-4 border-l-2 border-primary bg-surface p-4">
          <p className="font-semibold">2026 state finals: Arlington, December 16–19</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            UIL lists the state championship games at AT&amp;T Stadium in Arlington. That is the confirmed finals venue, not the location of earlier playoff rounds. Verify the date and game with UIL before booking a stay.
          </p>
          <a href="https://www.uiltexas.org/football/state" target="_blank" rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">
            Official UIL championship schedule and ticket information ↗
          </a>
        </div>
      )}
      {showHotels || gearOffers.length > 0 ? (
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Affiliate disclosure: TexasDefined may earn a commission from qualifying purchases, hotel bookings or RV reservations, at no additional cost to you.
          TexasDefined is not affiliated with the schools and these are not official team offers.
        </p>
      ) : null}
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
            <p className="font-semibold">Prefer a budget motel for the drive?</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {motel6Halloween
                ? "Motel 6's Trip and Treat campaign advertises up to 15% off nightly stays, 20% off weekly stays and 35% off monthly stays. Confirm participating locations and terms. No advertiser expiration date was supplied."
                : "Explore Motel 6 budget stays only after confirming the game location and date. Prices, property locations and availability are not guaranteed."}
            </p>
          </div>
          <a href={motel6Halloween ? MOTEL6_HALLOWEEN_URL : MOTEL6_STANDARD_URL} target="_blank" rel="sponsored nofollow noopener noreferrer"
            data-commercial-partner="motel6" data-commercial-placement="football-budget-motel"
            onClick={() => trackAffiliateClick({ partner: 'motel6', label: motel6Halloween ? 'Motel 6 Halloween offer' : 'Motel 6 budget stays', placement: `football-motel6-${slug}`, module: 'football-fan-essentials' })}
            className="inline-flex min-h-11 items-center justify-center border border-border px-4 py-3 text-sm font-semibold text-foreground hover:bg-surface">
            {motel6Halloween ? 'Check Motel 6 Halloween offers ↗' : 'Compare Motel 6 stays ↗'}
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
    </section>
  );
}
