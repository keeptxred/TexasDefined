import { Container } from "@/components/layout/Container";
import { buildCjAccountClick } from "@/lib/cj-account-links";
import { buildHotelsComEvergreenClick, hotelsComPageSid } from "@/lib/cj-hotels-evergreen";
import { trackAffiliateClick } from "@/lib/affiliate-click";

const pathname = "/hunting";
const hotel = buildHotelsComEvergreenClick("https://www.hotels.com/", hotelsComPageSid(pathname));
const rv = buildCjAccountClick("rvshare", pathname, "https://rvshare.com/");

/** Only existing CJ Get Code-approved general travel inventory. Never imply
 * a hotel, campsite or RV reservation grants hunting permission. */
export function HuntingTripStayOptions() {
  return (
    <section aria-labelledby="hunting-travel-options" className="border-t border-border bg-surface py-10 md:py-12">
      <Container>
        <div className="max-w-5xl">
          <p className="eyebrow text-primary">Optional trip planning</p>
          <h2 id="hunting-travel-options" className="mt-3 font-display text-3xl">Stay near a confirmed hunt</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
            Once TPWD and the landowner or program confirm your hunt and access dates, compare a hotel or an RV rental for the surrounding area. Lodging and RV rental reservations do not include land access, hunting permits, park reservations or approval to camp on the hunting unit.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={hotel} target="_blank" rel="sponsored nofollow noopener noreferrer" data-commercial-partner="hotels.com" data-commercial-placement="hunting-hub-trip" onClick={() => trackAffiliateClick({ partner: "hotels.com", label: "Compare hotels for a confirmed Texas hunt", placement: "hunting-hub-trip", module: "hunting-authority" })} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-muted">Compare hotels on Hotels.com ↗</a>
            <a href={rv} target="_blank" rel="sponsored nofollow noopener noreferrer" data-commercial-partner="rvshare" data-commercial-placement="hunting-hub-trip" onClick={() => trackAffiliateClick({ partner: "rvshare", label: "Compare RV rentals for a confirmed Texas hunt", placement: "hunting-hub-trip", module: "hunting-authority" })} className="inline-flex min-h-11 items-center justify-center border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-muted">Compare RV rentals on RVshare ↗</a>
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground"><strong>Affiliate disclosure:</strong> TexasDefined may earn a commission on qualifying bookings or RV reservations at no additional cost to you. Offers are optional and have no connection to TPWD permits or hunting access.</p>
        </div>
      </Container>
    </section>
  );
}
