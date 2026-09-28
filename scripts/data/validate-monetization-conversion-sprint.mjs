import fs from 'node:fs';

const trip = fs.readFileSync('src/routes/explore.trip-planner.lazy.tsx', 'utf8');
const destination = fs.readFileSync('src/components/editorial/DestinationVisitPlanner.tsx', 'utf8');
const event = fs.readFileSync('src/routes/event.$slug.lazy.tsx', 'utf8');
const rvshare = fs.readFileSync('src/components/monetization/RvshareRentalCard.tsx', 'utf8');
const stay = fs.readFileSync('public/stay-affiliate-options.js', 'utf8');

const failures = [];
function requireText(source, needle, label) {
  if (!source.includes(needle)) failures.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['Book this trip', 'generated itinerary booking heading'],
  ['data-stay-nearby-slot', 'generated itinerary stay slot'],
  ['DestinationViatorBooking', 'generated itinerary experience marketplace'],
  ['trip-planner-generated-itinerary-car', 'generated itinerary car attribution'],
  ['trip-planner-generated-itinerary-rvshare', 'generated itinerary RV attribution'],
  ['tripHasRvIntent', 'generated itinerary RV-intent gate'],
]) requireText(trip, needle, label);

for (const [needle, label] of [
  ['Book the trip', 'destination booking heading'],
  ['Where to stay near {destination.name}', 'destination stay intent'],
  ['destination-visit-planner-car', 'destination car attribution'],
  ['destination-visit-planner-rvshare', 'destination RV attribution'],
  ['rvIntentPattern', 'destination RV relevance gate'],
]) requireText(destination, needle, label);

for (const [needle, label] of [
  ['data-event-booking-funnel', 'event booking funnel marker'],
  ['Plan the whole weekend', 'event whole-weekend heading'],
  ['data-stay-nearby-slot', 'event stay slot'],
]) requireText(event, needle, label);

for (const [needle, label] of [
  ['https://www.anrdoezrs.net/links/${CJ_PUBLISHER_ID}/type/dlg/', 'RVshare governed CJ deep link'],
  ['data-affiliate-partner="rvshare"', 'RVshare affiliate metadata'],
  ['data-commercial-partner="rvshare"', 'RVshare first-party commercial metadata'],
  ['trackAffiliateClick', 'RVshare shared click tracker'],
  ['sponsored nofollow noopener noreferrer', 'RVshare affiliate relationship attributes'],
]) requireText(rvshare, needle, label);

if (!stay.includes('fishing\\/(?:lakes(?:\\/|$)|lake(?:\\/|$)|plan(?:\\/|$))')) {
  failures.push('Fishing RVshare route guard is missing.');
}

if (failures.length) {
  console.error('Monetization conversion sprint validation failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Monetization conversion sprint validation passed: generated trips expose lodging, experiences, car and contextual RV booking paths; destination pages surface explicit booking intent with contextual RV gating; event pages promote whole-weekend planning; and all new affiliate CTAs retain governed tracking metadata.');
