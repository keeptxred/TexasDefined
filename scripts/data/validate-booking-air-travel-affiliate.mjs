import fs from 'node:fs';

const read = (path) => fs.readFileSync(path, 'utf8');
const helper = read('src/lib/booking-affiliate.ts');
const component = read('src/components/monetization/BookingAirportTravelCard.tsx');
const entityDepth = read('src/components/content/EntityDepthSections.tsx');
const profiles = read('src/data/city-authority-profiles.ts');
const errors = [];

function requireText(source, needle, label) {
  if (!source.includes(needle)) errors.push(`${label}: missing ${needle}`);
}

for (const [needle, label] of [
  ['export const BOOKING_CJ_PUBLISHER_ID = "101876465"', 'TexasDefined CJ publisher ID'],
  ['flights: "https://www.booking.com/flights/index.html"', 'Booking.com flights destination'],
  ['airportTaxis: "https://www.booking.com/taxi/index.html"', 'Booking.com airport-taxi destination'],
  ['url.protocol !== "https:" || url.hostname !== BOOKING_ALLOWED_HOST', 'Booking.com destination host guard'],
  ['https://www.anrdoezrs.net/links/${BOOKING_CJ_PUBLISHER_ID}/type/dlg/', 'CJ deep-link base'],
]) requireText(helper, needle, label);

for (const [needle, label] of [
  ['"houston"', 'Houston gateway'],
  ['"dallas"', 'Dallas gateway'],
  ['"fort-worth"', 'Fort Worth gateway'],
  ['"austin"', 'Austin gateway'],
  ['"san-antonio"', 'San Antonio gateway'],
  ['"el-paso"', 'El Paso gateway'],
  ['"corpus-christi"', 'Corpus Christi gateway'],
  ['"lubbock"', 'Lubbock gateway'],
  ['Compare flights on Booking.com', 'Booking.com flights CTA'],
  ['Book an airport taxi on Booking.com', 'Booking.com airport-taxi CTA'],
  ['data-affiliate-partner="booking.com"', 'affiliate partner metadata'],
  ['data-affiliate-placement={placement}', 'affiliate placement metadata'],
  ['data-commercial-partner="booking.com"', 'first-party commercial partner metadata'],
  ['data-commercial-placement={placement}', 'first-party commercial placement metadata'],
  ['module: "flights"', 'flight analytics module'],
  ['module: "airport-taxi"', 'airport-taxi analytics module'],
  ['rel="sponsored nofollow noopener noreferrer"', 'affiliate relationship attributes'],
  ['Affiliate disclosure: TexasDefined may earn a commission from qualifying Booking.com flight or airport-taxi bookings', 'affiliate disclosure'],
]) requireText(component, needle, label);

for (const excluded of ['"arlington"', '"plano"']) {
  if (component.includes(excluded)) errors.push(`Booking.com air-travel gateway allowlist must not include ${excluded}.`);
}

for (const [needle, label] of [
  ['const hasAirportSystem = Boolean(cityProfile?.systems.some((system) => /\\bairports?\\b/i.test(system.title)))', 'verified airport-system gate'],
  ['const showBookingAirTravel = Boolean(cityProfile && hasAirportSystem && isBookingAirGatewayCity(entity.slug))', 'combined gateway and airport-system gate'],
  ['showBookingAirTravel ? <BookingAirportTravelCard cityName={entity.name} citySlug={entity.slug} /> : null', 'contextual city systems placement'],
]) requireText(entityDepth, needle, label);

const gatewaySlugs = ['houston', 'dallas', 'fort-worth', 'austin', 'san-antonio', 'el-paso', 'corpus-christi', 'lubbock'];
function profileBlock(slug) {
  const key = slug.includes('-') ? `'${slug}'` : slug;
  const start = profiles.indexOf(`  ${key}: {`);
  if (start < 0) return '';
  const tail = profiles.slice(start + 2);
  const next = tail.search(/\n  (?:'[a-z0-9-]+'|[a-z0-9]+): \{/);
  return next >= 0 ? profiles.slice(start, start + 2 + next) : profiles.slice(start);
}
for (const slug of gatewaySlugs) {
  const block = profileBlock(slug);
  if (!block) {
    errors.push(`Missing city authority profile for Booking.com air gateway: ${slug}.`);
    continue;
  }
  if (!/title:\s*['"]Airports?(?: & regional connections)?['"]/i.test(block)) {
    errors.push(`${slug} must retain a verified airport system before Booking.com air-travel monetization can render.`);
  }
}

if (/window\.location\s*=|window\.location\.href\s*=/.test(component)) {
  errors.push('Booking.com air-travel component must not force redirects.');
}
if (/facebook\.com|instagram\.com|twitter\.com|x\.com/i.test(component)) {
  errors.push('Booking.com air-travel website component must not contain social-network promotion targets.');
}

if (errors.length) {
  console.error('Booking.com air-travel affiliate validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('Booking.com air-travel affiliate validation passed: approved Flights and Airport Taxis destinations use the centralized TexasDefined CJ deep-link guard, render only for eight explicit gateway cities that retain verified airport-system guidance, exclude Arlington and Plano, preserve sponsored/disclosed links and first-party partner/placement telemetry, and do not force redirects.');
