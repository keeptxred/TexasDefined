import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';

// Keep the test on the real event-guide server module, rather than accepting
// a copied policy that diverges from the production ticket renderer.
const server = await createServer({
  configFile: false,
  appType: 'custom',
  logLevel: 'error',
  resolve: { alias: { '@': path.resolve(process.cwd(), 'src') } },
  server: { middlewareMode: true },
});
try {
  const { majorEventGuideTicketsAllowed, majorEventGuideOffersAllowed, majorEventOfferIsActionable, majorEventTicketTexasToday, buildMajorEventTicketingMarkupServer } =
    await server.ssrLoadModule('/src/data/major-event-page.server.ts');
  assert.equal(majorEventGuideTicketsAllowed(undefined), true, 'No officially recorded cancellation must retain safe provider fallback');
  assert.equal(majorEventGuideTicketsAllowed('scheduled'), true, 'Reviewed scheduled event remains eligible');
  for (const status of ['cancelled', 'postponed', 'rescheduled']) {
    assert.equal(majorEventGuideTicketsAllowed(status), false,
      'Authority-level lifecycle must suppress stale admission and affiliate links: ' + status);
  }
  const beforeTexasMidnight = new Date('2026-12-06T00:30:00Z');
  const afterTexasMidnight = new Date('2026-12-06T12:30:00Z');
  assert.equal(majorEventGuideOffersAllowed('scheduled', '2026-12-05', beforeTexasMidnight), true,
    'An offer ending today in Texas remains eligible until local midnight');
  assert.equal(majorEventGuideOffersAllowed('scheduled', '2026-12-05', afterTexasMidnight), false,
    'Past occurrence offers must not revive the secondary ticket panel');
  for (const status of ['cancelled', 'postponed', 'rescheduled']) {
    assert.equal(majorEventGuideOffersAllowed(status, '2027-12-05', beforeTexasMidnight), false,
      'Non-scheduled occurrence must not publish UI or structured-data admission: ' + status);
  }
  const testOffer = { name: 'Admission', url: 'https://tickets.example.org/event/123', price: 10, priceCurrency: 'USD' };
  assert.equal(majorEventOfferIsActionable(testOffer, beforeTexasMidnight), true);
  assert.equal(majorEventOfferIsActionable({ ...testOffer, availability: 'https://schema.org/SoldOut' }, beforeTexasMidnight), false);
  assert.equal(majorEventOfferIsActionable({ ...testOffer, validThrough: '2026-12-04' }, beforeTexasMidnight), false);
  assert.equal(majorEventOfferIsActionable({ ...testOffer, validThrough: '2026-12-05' }, beforeTexasMidnight), true);
  assert.equal(majorEventOfferIsActionable({ ...testOffer, validFrom: '2026-12-06' }, beforeTexasMidnight), false);
  assert.equal(majorEventOfferIsActionable({ ...testOffer, validFrom: '2026-12-06' }, afterTexasMidnight), true);
  // The guide, Discovery snapshot, and exact-session date labels must agree on
  // Texas local midnight. A 00:30 UTC Sunday is still Saturday evening here.
  assert.equal(majorEventTicketTexasToday(new Date('2026-12-06T00:30:00Z')), '2026-12-05');
  assert.equal(majorEventTicketTexasToday(new Date('2026-12-06T12:30:00Z')), '2026-12-06');
  assert.equal(majorEventTicketTexasToday(new Date('2027-07-04T02:30:00Z')), '2027-07-03');
  assert.equal(majorEventTicketTexasToday(new Date('2027-07-04T13:30:00Z')), '2027-07-04');
  assert.equal(buildMajorEventTicketingMarkupServer('this-major-event-does-not-exist', new Date('2026-12-06T00:30:00Z')), '',
    'unknown event cannot gain a ticket CTA at Texas midnight');
  assert.equal(buildMajorEventTicketingMarkupServer('this-major-event-does-not-exist'), '',
    'Unknown organizer event may not receive arbitrary tickets');
  const source = readFileSync('src/data/major-event-page.server.ts', 'utf8');
  const active = source.slice(source.indexOf('export function buildMajorEventTicketingMarkupServer(slug: string, now = new Date()) {'),
    source.indexOf('export function loadMajorEventPageServer(', source.indexOf('export function buildMajorEventTicketingMarkupServer')));
  assert.ok(active.includes('if (!majorEventGuideTicketsAllowed(lifecycle?.status)) return "";'),
    'The major-event ticket renderer must apply organizer lifecycle status BEFORE single/multi-session CTAs');
  assert.ok(active.indexOf('if (!majorEventGuideTicketsAllowed') < active.indexOf('const matches = loadTicketmasterEventsServer(undefined, now)'),
    'Never access/offer Ticketmaster sessions before official event cancellation gate');
  assert.ok(active.includes('actionable.length === 1') && active.includes('actionable.length > 1'),
    'Keep both one-show and multi-show formats protected');
  assert.ok(active.includes('record.startDate >= majorEventTicketTexasToday(now)'),
    'session filtering must use Texas local date rather than UTC midnight');
  assert.ok(active.includes('const dates = upcoming.map(({ record }) => record.startDate).sort();'),
    'comparison date links must use the future selected sessions, not expired entries');
  assert.ok(source.includes('const eligibleOfferWindows = occurrenceWindows.filter'),
    'Secondary prices must check occurrence-specific lifecycle and date windows');
  assert.ok(source.includes('occurrenceEnrichment?.offers?.filter((offer) => majorEventOfferIsActionable(offer))'),
    'JSON-LD must filter sold-out and expired sale offers');
  assert.ok(source.includes('majorEventGuideOffersAllowed(occurrenceEnrichment?.lifecycle?.status, window.endDate ?? window.startDate)'),
    'JSON-LD must not republish cancelled or expired occurrence purchase offers');
  assert.ok(active.includes('loadTicketmasterEventsServer(undefined, now)'),
    'provider refresh and guide current day must use a common clock');
} finally {
  await server.close();
}
console.log('PASS: official cancelled/postponed/rescheduled lifecycle suppresses major-guide ticket CTAs before event/Impact matching; scheduled shows retain provider fallback.');
