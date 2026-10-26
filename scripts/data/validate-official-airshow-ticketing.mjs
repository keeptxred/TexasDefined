import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({
  configFile: false, appType: 'custom', logLevel: 'error',
  server: { middlewareMode: true },
});
try {
  const { buildOfficialAirshowTicketMarkupServer } = await server.ssrLoadModule('/src/data/major-event-page.server.ts');
  const before = new Date('2026-10-26T15:00:00Z');
  const bluebonnet = buildOfficialAirshowTicketMarkupServer('bluebonnet-airshow', before);
  assert.ok(bluebonnet.includes('https://www.ticketsignup.io/TicketEvent/BluebonnetAirshow'),
    'Bluebonnet 2027 must point to organizer-linked exact March 20, 2027 TicketSignup event');
  assert.ok(bluebonnet.includes('Check official air-show ticket options'));
  assert.ok(bluebonnet.includes('TexasDefined does not hold seats'), 'never claim real-time inventory');
  assert.ok(bluebonnet.includes('noopener noreferrer'));
  assert.ok(!bluebonnet.includes('rel="sponsored'), 'official organizer event checkout is not an affiliate');
  assert.ok(!bluebonnet.includes('href="https://www.bluebonnetairshow.com/"'),
    'a general organizer homepage must not be styled as direct ticket checkout');
  const after = buildOfficialAirshowTicketMarkupServer('bluebonnet-airshow', new Date('2027-03-22T15:00:00Z'));
  assert.equal(after, '', 'expired show must not promote old official ticket checkout');
  const oldAirshow = buildOfficialAirshowTicketMarkupServer('amigo-airsho', before);
  assert.equal(oldAirshow, '', 'past Oct 24–25 Amigo Airsho admission must not remain actionable');
  assert.equal(buildOfficialAirshowTicketMarkupServer('imaginary-show', before), '');
} finally { await server.close(); }
console.log('PASS: exact Bluebonnet 2027 official ticket identity and Texas-local expiration; no inventory, price or commission claims.');
