import fs from 'node:fs';

const component = fs.readFileSync('src/components/monetization/BookingCarRentalCard.tsx', 'utf8');
const destinationPlanner = fs.readFileSync('src/components/editorial/DestinationVisitPlanner.tsx', 'utf8');
const roadTrips = fs.readFileSync('src/components/explore/TopAttractionRoadTripsContent.tsx', 'utf8');
const route66Hub = fs.readFileSync('src/components/explore/TexasRoute66Hub.tsx', 'utf8');
const route66Page = fs.readFileSync('src/components/explore/TexasRoute66Page.tsx', 'utf8');
const paintedChurchesPlanner = fs.readFileSync('src/routes/explore.painted-churches-plan.tsx', 'utf8');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['const CJ_PUBLISHER_ID = "101876465"', 'TexasDefined CJ publisher ID'],
  ['https://www.booking.com/cars/country/us.html', 'Booking.com U.S. car-rental destination'],
  ['https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/', 'CJ deep-link base'],
  ['sponsored nofollow noopener noreferrer', 'affiliate relationship attributes'],
  ['Compare rental cars on Booking.com', 'Booking.com car-rental CTA'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Booking.com car-rental bookings', 'affiliate disclosure'],
  ['event: "affiliate_click"', 'affiliate click event'],
  ['affiliate_partner: "booking.com"', 'Booking.com analytics partner'],
  ['data-commercial-partner="booking.com"', 'first-party commercial partner metadata'],
  ['data-commercial-placement={placement}', 'first-party commercial placement metadata'],
  ['texasdefined:affiliate-click', 'first-party affiliate browser event'],
]) requireText(component, needle, label);

for (const [needle, label] of [
  ['drivingIntentPattern', 'driving-intent gate'],
  ['showRentalCarOption', 'destination rental-car eligibility'],
  ['placement="destination-visit-planner"', 'destination placement attribution'],
]) requireText(destinationPlanner, needle, label);

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

console.log('Booking.com car-rental affiliate validation passed: TexasDefined uses the approved CJ publisher, a current Booking.com U.S. rental-car destination, explicit sponsored links, first-party click attribution, disclosure, destination driving-intent gating, and dedicated placements on Top Attractions road trips, Route 66 hub/stop guides, and the Painted Churches driving planner without forced redirects.');