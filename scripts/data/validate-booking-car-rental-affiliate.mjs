import fs from 'node:fs';

const component = fs.readFileSync('src/components/monetization/BookingCarRentalCard.tsx', 'utf8');
const tracker = fs.readFileSync('src/lib/affiliate-click.ts', 'utf8');
const destinationPlanner = fs.readFileSync('src/components/editorial/DestinationVisitPlanner.tsx', 'utf8');
const roadTrips = fs.readFileSync('src/components/explore/TopAttractionRoadTripsContent.tsx', 'utf8');
const route66Hub = fs.readFileSync('src/components/explore/TexasRoute66Hub.tsx', 'utf8');
const route66Page = fs.readFileSync('src/components/explore/TexasRoute66Page.tsx', 'utf8');
const paintedChurchesPlanner = fs.readFileSync('src/routes/explore.painted-churches-plan.tsx', 'utf8');
const tripPlanner = fs.readFileSync('src/routes/explore.trip-planner.lazy.tsx', 'utf8');
const categoryHub = fs.readFileSync('src/routes/explore.$category.lazy.tsx', 'utf8');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['const CJ_PUBLISHER_ID = "101876465"', 'TexasDefined CJ publisher ID'],
  ['https://www.booking.com/cars/country/us.html', 'Booking.com U.S. car-rental destination'],
  ['https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/', 'CJ deep-link base'],
  ['const CJ_SID_PREFIX = "td-"', 'TexasDefined CJ SID prefix'],
  ['function cjSid(placement: string)', 'privacy-safe Booking placement SID builder'],
  ['if (!/^[a-z0-9][a-z0-9-]*$/.test(placement))', 'static CJ SID character gate'],
  ['function bookingCarRentalAffiliateUrl(placement: string)', 'placement-aware Booking CJ URL builder'],
  ['CJ_DLG_BASE}sid/${encodeURIComponent(cjSid(placement))}', 'CJ network placement attribution'],
  ['const affiliateUrl = bookingCarRentalAffiliateUrl(placement)', 'runtime placement-to-SID binding'],
  ['href={affiliateUrl}', 'placement-aware Booking affiliate href'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Compare rental cars on Booking.com', 'Booking.com car-rental CTA'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Booking.com car-rental bookings', 'affiliate disclosure'],
  ['import { trackAffiliateClick } from "@/lib/affiliate-click"', 'shared affiliate tracker import'],
  ['partner: "booking.com"', 'Booking.com analytics partner'],
  ['label: BOOKING_CAR_RENTAL_LABEL', 'Booking.com analytics label'],
  ['module: "car-rental"', 'Booking.com analytics module'],
  ['data-commercial-partner="booking.com"', 'first-party commercial partner metadata'],
  ['data-commercial-placement={placement}', 'first-party commercial placement attribution'],
]) requireText(component, needle, label);

for (const [needle, label] of [
  ['event: "affiliate_click"', 'shared affiliate click event'],
  ['affiliate_partner: partner', 'shared affiliate partner field'],
  ['affiliate_placement: placement', 'shared affiliate placement field'],
  ['texasdefined:affiliate-click', 'first-party affiliate browser event'],
]) requireText(tracker, needle, label);

if (component.includes('type AffiliateAnalyticsWindow') || component.includes('trackBookingCarRentalClick')) {
  errors.push('Booking.com rental-car card must reuse the shared affiliate click tracker instead of duplicating client analytics code.');
}

if (/session|randomUUID|Date\.now|location\.pathname/.test(component.match(/function cjSid[\s\S]*?\n}/)?.[0] || '')) {
  errors.push('Booking.com CJ SID builder must remain static-placement-only and must not include session, time or page-path identifiers.');
}

for (const [needle, label] of [
  ['drivingIntentPattern', 'driving-intent gate'],
  ['showRentalCarOption', 'destination rental-car eligibility'],
  ['placement="destination-visit-planner"', 'destination placement attribution'],
]) requireText(destinationPlanner, needle, label);

if (/drivingIntentPattern\s*=.*parking/.test(destinationPlanner)) {
  errors.push('Destination rental-car eligibility must not treat parking alone as rental-car intent.');
}

for (const [needle, label] of [
  ['BookingCarRentalCard', 'road-trip affiliate card'],
  ['placement="top-attraction-road-trips"', 'road-trip placement attribution'],
]) requireText(roadTrips, needle, label);

for (const [needle, label] of [
  ['BookingCarRentalCard', 'Route 66 hub affiliate card'],
  ['placement="route-66-hub"', 'Route 66 hub placement attribution'],
]) requireText(route66Hub, needle, label);

for (const [needle, label] of [
  ['BookingCarRentalCard', 'Route 66 stop affiliate card'],
  ['placement="route-66-stop"', 'Route 66 stop placement attribution'],
]) requireText(route66Page, needle, label);

for (const [needle, label] of [
  ['BookingCarRentalCard', 'Painted Churches affiliate card'],
  ['placement="painted-churches-planner"', 'Painted Churches placement attribution'],
]) requireText(paintedChurchesPlanner, needle, label);

for (const [needle, label] of [
  ['BookingCarRentalCard', 'Trip Planner affiliate card'],
  ['const hasGeneratedDrivingRoute = Boolean(trip?.days.some((day) => day.stops.length))', 'Trip Planner generated-route gate'],
  ['hasGeneratedDrivingRoute && <BookingCarRentalCard', 'Trip Planner post-generation placement gate'],
  ['placement="trip-planner-generated-itinerary"', 'Trip Planner placement attribution'],
  ['title="Need a rental car for this Texas itinerary?"', 'Trip Planner contextual rental-car title'],
]) requireText(tripPlanner, needle, label);

for (const [needle, label] of [
  ['const showRoadTripRentalCar = match.slug === "road-trips"', 'road-trip category-only gate'],
  ['showRoadTripRentalCar ? <Container', 'road-trip category conditional placement'],
  ['<BookingCarRentalCard placement="road-trips-category"', 'road-trip category affiliate card'],
  ['title="Need a rental car for your Texas road trip?"', 'road-trip category contextual title'],
]) requireText(categoryHub, needle, label);

if (/showRoadTripRentalCar\s*=.*(?:state-parks|lakes-rivers|small-towns|historic-sites)/.test(categoryHub)) {
  errors.push('Generic category rental-car placement must remain limited to the explicit road-trips authority surface.');
}

if (/window\.location\s*=|window\.location\.href\s*=/.test(component)) {
  errors.push('Booking.com affiliate component must not force redirects.');
}

if (/facebook\.com|instagram\.com|twitter\.com|x\.com/i.test(component)) {
  errors.push('Booking.com website affiliate component must not contain social-network promotion targets.');
}

if (errors.length) {
  console.error('Booking.com car-rental affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Booking.com car-rental affiliate validation passed: TexasDefined uses the approved CJ publisher, current Booking.com U.S. rental-car destination, shared first-party affiliate click telemetry, explicit sponsored links, disclosure, high-intent destination gating, dedicated road-trip placements including the canonical road-trips authority hub, and a generated-route-only Trip Planner placement without forced redirects or duplicate analytics code.');
