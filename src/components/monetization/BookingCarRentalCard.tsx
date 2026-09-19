import { trackAffiliateClick } from "@/lib/affiliate-click";

type Props = {
  className?: string;
  placement: string;
  title?: string;
};

const CJ_PUBLISHER_ID = "101876465";
const CJ_DLG_BASE = `https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/`;
const CJ_SID_PREFIX = "td-";
const BOOKING_CAR_RENTAL_DESTINATION = "https://www.booking.com/cars/country/us.html";
const BOOKING_CAR_RENTAL_LABEL = "Compare rental cars on Booking.com";

function cjSid(placement: string) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(placement)) {
    throw new Error(`Unsupported CJ placement SID: ${placement || "missing"}`);
  }
  return `${CJ_SID_PREFIX}${placement}`;
}

function bookingCarRentalAffiliateUrl(placement: string) {
  return `${CJ_DLG_BASE}sid/${encodeURIComponent(cjSid(placement))}/${encodeURI(BOOKING_CAR_RENTAL_DESTINATION)}`;
}

export function BookingCarRentalCard({ className = "", placement, title = "Need a rental car for the trip?" }: Props) {
  const affiliateUrl = bookingCarRentalAffiliateUrl(placement);
  return (
    <aside className={className} aria-label="Rental car booking option">
      <div className="border border-border bg-surface p-6 sm:p-7">
        <p className="eyebrow text-primary">Road-trip planning</p>
        <h2 className="mt-3 font-display text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Compare rental cars from major providers before you lock in the driving part of the trip. Pick-up location, dates, vehicle rules and cancellation terms are handled by Booking.com.
        </p>
        <a
          href={affiliateUrl}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          data-affiliate-partner="booking.com"
          data-affiliate-placement={placement}
          data-commercial-partner="booking.com"
          data-commercial-placement={placement}
          onClick={() => trackAffiliateClick({
            partner: "booking.com",
            label: BOOKING_CAR_RENTAL_LABEL,
            placement,
            module: "car-rental",
          })}
        >
          {BOOKING_CAR_RENTAL_LABEL} ↗
        </a>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Affiliate disclosure: TexasDefined may earn a commission from qualifying Booking.com car-rental bookings, at no additional cost to you.
        </p>
      </div>
    </aside>
  );
}

export const bookingCarRentalAffiliate = {
  publisherId: CJ_PUBLISHER_ID,
  destination: BOOKING_CAR_RENTAL_DESTINATION,
  affiliateUrlForPlacement: bookingCarRentalAffiliateUrl,
} as const;
