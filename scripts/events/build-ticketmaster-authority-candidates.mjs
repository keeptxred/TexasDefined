import fs from 'node:fs';
import path from 'node:path';

// Discovery candidates are NOT publishable authority pages. Official organizer
// verification, rights checks and independent editorial research are required.
const root = process.cwd();
const source = path.join(root, 'src/data/generated/ticketmaster-events.json');
const destination = path.join(root, 'ops/editorial/ticketmaster-authority-candidates.json');
const snapshot = JSON.parse(fs.readFileSync(source, 'utf8'));
const signal = /\b(festival|fest|fair|rodeo|parade|marathon|championship|convention|expo|oktoberfest|fiesta|jubilee|powwow|gathering|balloon (?:glow|rally)|comic.con|air.show|market)\b/i;
const child = /\b(add.on|parking|vip|meet.and.greet|aftershow|fest nights|session|prelims|day pass|weekend pass)\b/i;
if (!snapshot || typeof snapshot.fetchedAt !== 'string' || !Number.isFinite(Date.parse(snapshot.fetchedAt)) || !Array.isArray(snapshot.events) || snapshot.events.length === 0) {
  throw new Error('Ticketmaster authority queue requires a valid complete event snapshot');
}
const families = new Map();
for (const event of snapshot.events ?? []) {
  if (!event || typeof event.name !== 'string' || !signal.test(event.name) || child.test(event.name) || !event.city || !/^\d{4}-\d{2}-\d{2}$/.test(event.startDate ?? '')) continue;
  if (['cancelled', 'postponed', 'rescheduled'].includes(event.status)) continue;
  const familyName = event.name.replace(/\b20\d{2}\b/g, '').replace(/\s*[-–:]\s*(day \d+|monday|tuesday|wednesday|thursday|friday|saturday|sunday).*$/i, '').trim();
  const key = familyName.toLowerCase() + '|' + event.city.toLowerCase();
  const existing = families.get(key) ?? { name: familyName, city: event.city, dates: new Set(), ticketmasterIds: new Set(), venues: new Set(), officialTicketUrls: new Set() };
  existing.dates.add(event.startDate);
  existing.ticketmasterIds.add(event.id);
  if (typeof event.officialUrl === 'string' && /^https:\/\/([a-z0-9-]+\.)?ticketmaster\.com\//i.test(event.officialUrl)) existing.officialTicketUrls.add(event.officialUrl);
  if (event.venue) existing.venues.add(event.venue);
  families.set(key, existing);
}
// Preserve prior research leads and historical occurrences across rolling 90-day
// Ticketmaster windows. Past dates and links MUST NOT be advertised as current.
const normalizeFamily = (name) => name
  .replace(/\b20\d{2}\b/g, '')
  .replace(/\s*[-–:]\s*(day \d+|monday|tuesday|wednesday|thursday|friday|saturday|sunday).*$/i, '')
  .trim().toLowerCase();
const familyKey = (name, city) => normalizeFamily(name) + '|' + city.trim().toLowerCase();
const priorCatalog = fs.existsSync(destination)
  ? JSON.parse(fs.readFileSync(destination, 'utf8'))
  : { fetchedAt: snapshot.fetchedAt, candidates: [] };
if (!Array.isArray(priorCatalog.candidates)) throw new Error('Prior authority research queue is malformed; refusing to overwrite it');
const priorByFamily = new Map();
for (const previous of priorCatalog.candidates) {
  if (!previous || typeof previous.name !== 'string' || typeof previous.city !== 'string' || !signal.test(previous.name) || child.test(previous.name)) continue;
  const key = familyKey(previous.name, previous.city);
  const previousSaved = priorByFamily.get(key);
  if (!previousSaved || (previous.lastSeenAt ?? priorCatalog.fetchedAt ?? '') > (previousSaved.lastSeenAt ?? '')) priorByFamily.set(key, previous);
}
const normalizeDates = (dates) => [...new Set((Array.isArray(dates) ? dates : []).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)))].sort();
const sourceLead = (previous) => {
  const url = previous?.evidence?.organizerUrl;
  if (typeof url !== 'string') return null;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password && !parsed.port
      && !/(^|\.)ticketmaster\.com$/.test(parsed.hostname.toLowerCase()) ? url : null;
  } catch { return null; }
};
const evidence = (previous) => ({
  organizerUrl: sourceLead(previous),
  recurrenceVerified: false,
  currentScheduleVerified: false,
  imageRightsVerified: false,
});
const candidates = [...families.values()].map(family => {
  const previous = priorByFamily.get(familyKey(family.name, family.city));
  const dates = [...family.dates].sort();
  const oldDates = normalizeDates([...(previous?.pastOccurrences ?? []), ...(previous?.dates ?? [])]);
  const pastOccurrences = oldDates.filter(date => date < dates[0]).slice(-24);
  const seenYears = [...new Set([...pastOccurrences, ...dates].map(date => date.slice(0,4)))].sort();
  return {
    name: family.name, city: family.city, dates,
    venues: [...family.venues].sort(),
    ticketmasterIds: [...family.ticketmasterIds].sort(),
    officialTicketUrls: [...family.officialTicketUrls].sort(),
    firstSeenAt: previous?.firstSeenAt ?? priorCatalog.fetchedAt ?? snapshot.fetchedAt,
    lastSeenAt: snapshot.fetchedAt, pastOccurrences, seenYears,
    status: 'requires-organizer-verification',
    evidence: evidence(previous),
    publicationAllowed: false,
  };
});
const activeKeys = new Set(candidates.map(candidate => familyKey(candidate.name, candidate.city)));
const cutoff = Date.parse(snapshot.fetchedAt) - 540 * 86400000;
for (const previous of priorByFamily.values()) {
  const key = familyKey(previous.name, previous.city);
  const lastSeenAt = previous.lastSeenAt ?? priorCatalog.fetchedAt;
  if (activeKeys.has(key) || !lastSeenAt || !Number.isFinite(Date.parse(lastSeenAt)) || Date.parse(lastSeenAt) < cutoff) continue;
  const pastOccurrences = normalizeDates([...(previous.pastOccurrences ?? []), ...(previous.dates ?? [])]).slice(-24);
  candidates.push({
    name: normalizeFamily(previous.name) === previous.name.toLowerCase() ? previous.name : previous.name.replace(/\s*[-–:]\s*(day \d+|monday|tuesday|wednesday|thursday|friday|saturday|sunday).*$/i, '').trim(),
    city: previous.city, dates: [], venues: Array.isArray(previous.venues) ? previous.venues : [],
    ticketmasterIds: [], officialTicketUrls: [],
    firstSeenAt: previous.firstSeenAt ?? priorCatalog.fetchedAt,
    lastSeenAt, pastOccurrences,
    seenYears: [...new Set(pastOccurrences.map(date => date.slice(0,4)))].sort(),
    status: 'historical-review-only', evidence: evidence(previous), publicationAllowed: false,
  });
}
candidates.sort((a,b) => a.name.localeCompare(b.name) || a.city.localeCompare(b.city));
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify({ fetchedAt: snapshot.fetchedAt, candidates }, null, 2) + '\n');
console.log('Ticketmaster authority candidates: ' + candidates.length + ' (unverified; no auto-publication)');
