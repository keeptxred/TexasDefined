export const BOOKING_CJ_PUBLISHER_ID = "101876465";

const BOOKING_ALLOWED_HOST = "www.booking.com";

export const bookingAffiliateDestinations = {
  carRental: "https://www.booking.com/cars/country/us.html",
  flights: "https://www.booking.com/flights/index.html",
  airportTaxis: "https://www.booking.com/taxi/index.html",
} as const;

export function buildBookingCjDeepLink(destination: string) {
  const url = new URL(destination);
  if (url.protocol !== "https:" || url.hostname !== BOOKING_ALLOWED_HOST) {
    throw new Error(`Unsupported Booking.com affiliate destination: ${destination}`);
  }
  return `https://www.anrdoezrs.net/links/${BOOKING_CJ_PUBLISHER_ID}/type/dlg/${encodeURI(url.toString())}`;
}
