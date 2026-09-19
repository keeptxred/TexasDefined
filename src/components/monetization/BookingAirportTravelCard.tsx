import { trackAffiliateClick } from "@/lib/affiliate-click";
import { bookingAffiliateDestinations, buildBookingCjDeepLink } from "@/lib/booking-affiliate";

type Props = {
  cityName: string;
  citySlug: string;
};

const BOOKING_FLIGHTS_LABEL = "Compare flights on Booking.com";
const BOOKING_AIRPORT_TAXI_LABEL = "Book an airport taxi on Booking.com";
const BOOKING_FLIGHTS_URL = buildBookingCjDeepLink(bookingAffiliateDestinations.flights);
const BOOKING_AIRPORT_TAXI_URL = buildBookingCjDeepLink(bookingAffiliateDestinations.airportTaxis);

export const BOOKING_AIR_GATEWAY_CITY_SLUGS = new Set([
  "houston",
  "dallas",
  "fort-worth",
  "austin",
  "san-antonio",
  "el-paso",
  "corpus-christi",
  "lubbock",
]);

export function isBookingAirGatewayCity(slug: string) {
  return BOOKING_AIR_GATEWAY_CITY_SLUGS.has(slug);
}

export function BookingAirportTravelCard({ cityName, citySlug }: Props) {
  if (!isBookingAirGatewayCity(citySlug)) return null;
  const placement = `city-air-travel-${citySlug}`;

  return (
    <aside className="mt-6 border border-border bg-surface p-6 sm:p-7" aria-label={`Flight and airport transfer options for ${cityName}`}>
      <p className="eyebrow text-primary">Fly & arrive</p>
      <h3 className="mt-3 font-display text-3xl">Flying to or from {cityName}?</h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        After you verify the airport and terminal with the official sources above, you can compare flight options or arrange an airport taxi through Booking.com. Fares, schedules, baggage rules, pickup availability and cancellation terms are controlled by the travel provider.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={BOOKING_FLIGHTS_URL}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex min-h-11 items-center border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          data-affiliate-partner="booking.com"
          data-affiliate-placement={placement}
          data-commercial-partner="booking.com"
          data-commercial-placement={placement}
          onClick={() => trackAffiliateClick({
            partner: "booking.com",
            label: BOOKING_FLIGHTS_LABEL,
            placement,
            module: "flights",
          })}
        >
          {BOOKING_FLIGHTS_LABEL} ↗
        </a>
        <a
          href={BOOKING_AIRPORT_TAXI_URL}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex min-h-11 items-center border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary"
          data-affiliate-partner="booking.com"
          data-affiliate-placement={placement}
          data-commercial-partner="booking.com"
          data-commercial-placement={placement}
          onClick={() => trackAffiliateClick({
            partner: "booking.com",
            label: BOOKING_AIRPORT_TAXI_LABEL,
            placement,
            module: "airport-taxi",
          })}
        >
          {BOOKING_AIRPORT_TAXI_LABEL} ↗
        </a>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission from qualifying Booking.com flight or airport-taxi bookings, at no additional cost to you.
      </p>
    </aside>
  );
}
