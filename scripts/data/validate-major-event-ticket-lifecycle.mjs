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
  const { majorEventGuideTicketsAllowed, buildMajorEventTicketingMarkupServer } =
    await server.ssrLoadModule('/src/data/major-event-page.server.ts');
  assert.equal(majorEventGuideTicketsAllowed(undefined), true, 'No officially recorded cancellation must retain safe provider fallback');
  assert.equal(majorEventGuideTicketsAllowed('scheduled'), true, 'Reviewed scheduled event remains eligible');
  for (const status of ['cancelled', 'postponed', 'rescheduled']) {
    assert.equal(majorEventGuideTicketsAllowed(status), false,
      'Authority-level lifecycle must suppress stale admission and affiliate links: ' + status);
  }
  assert.equal(buildMajorEventTicketingMarkupServer('this-major-event-does-not-exist'), '',
    'Unknown organizer event may not receive arbitrary tickets');
  const source = readFileSync('src/data/major-event-page.server.ts', 'utf8');
  const active = source.slice(source.indexOf('export function buildMajorEventTicketingMarkupServer(slug: string) {'),
    source.indexOf('export function loadMajorEventPageServer(', source.indexOf('export function buildMajorEventTicketingMarkupServer')));
  assert.ok(active.includes('if (!majorEventGuideTicketsAllowed(lifecycle?.status)) return "";'),
    'The major-event ticket renderer must apply organizer lifecycle status BEFORE single/multi-session CTAs');
  assert.ok(active.indexOf('if (!majorEventGuideTicketsAllowed') < active.indexOf('const matches = loadTicketmasterEventsServer()'),
    'Never access/offer Ticketmaster sessions before official event cancellation gate');
  assert.ok(active.includes('actionable.length === 1') && active.includes('actionable.length > 1'),
    'Keep both one-show and multi-show formats protected');
} finally {
  await server.close();
}
console.log('PASS: official cancelled/postponed/rescheduled lifecycle suppresses major-guide ticket CTAs before event/Impact matching; scheduled shows retain provider fallback.');
