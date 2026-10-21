import fs from 'node:fs';
import path from 'node:path';

// Discovery candidates are NOT publishable authority pages. Official organizer
// verification, rights checks and independent editorial research are required.
const root = process.cwd();
const source = path.join(root, 'src/data/generated/ticketmaster-events.json');
const destination = path.join(root, 'ops/editorial/ticketmaster-authority-candidates.json');
const snapshot = JSON.parse(fs.readFileSync(source, 'utf8'));
const signal = /\b(festival|fair|rodeo|parade|marathon|championship|convention|expo|oktoberfest|fiesta|jubilee|powwow|gathering|balloon|comic.con|air.show|market)\b/i;
const child = /\b(add.on|parking|vip|meet.and.greet|aftershow|fest nights|session|prelims|day pass|weekend pass)\b/i;
const families = new Map();
for (const event of snapshot.events ?? []) {
  if (!signal.test(event.name) || child.test(event.name) || !event.city || !event.startDate) continue;
  const familyName = event.name.replace(/\b20\d{2}\b/g, '').replace(/\s*[-–:]\s*(day \d+|friday|saturday|sunday).*$/i, '').trim();
  const key = familyName.toLowerCase() + '|' + event.city.toLowerCase();
  const existing = families.get(key) ?? { name: familyName, city: event.city, dates: new Set(), ticketmasterIds: new Set(), venues: new Set() };
  existing.dates.add(event.startDate);
  existing.ticketmasterIds.add(event.id);
  if (event.venue) existing.venues.add(event.venue);
  families.set(key, existing);
}
const candidates = [...families.values()].map(family => ({
  name: family.name, city: family.city,
  dates: [...family.dates].sort(), venues: [...family.venues].sort(),
  ticketmasterIds: [...family.ticketmasterIds].sort(),
  status: 'requires-organizer-verification',
  publicationAllowed: false,
})).sort((a,b) => a.name.localeCompare(b.name) || a.city.localeCompare(b.city));
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify({ fetchedAt: snapshot.fetchedAt, candidates }, null, 2) + '\n');
console.log('Ticketmaster authority candidates: ' + candidates.length + ' (unverified; no auto-publication)');
