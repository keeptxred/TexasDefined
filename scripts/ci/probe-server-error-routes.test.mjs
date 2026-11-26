import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROBES, assessProbe, GSC_5XX_PATHS, sameRequestedView } from './probe-server-error-routes.mjs';

test('canaries remain bounded and are public HTTPS endpoints only', () => {
  assert.ok(PROBES.length >= 10 && PROBES.length <= 25);
  for (const probe of PROBES) {
    const url = new URL(probe.url);
    assert.equal(url.protocol, 'https:');
    assert.ok(['texasdefined.com', 'keeptxred.com', 'texasdefined-site.freddy-coppola.workers.dev'].includes(url.hostname));
  }
});
test('actual 500, missing HTML and absent images fail closed', () => {
  assert.equal(assessProbe({ kind: 'html' }, 500, 'text/html', Buffer.from('<html></html>')), 'HTTP 500');
  assert.match(assessProbe({ kind: 'html' }, 200, 'text/html', Buffer.from('not a document')), /missing HTML/);
  assert.match(assessProbe({ kind: 'webp' }, 200, 'text/html', Buffer.from('<html>404</html>')), /image\/webp/);
  assert.equal(assessProbe({ kind: 'html' }, 200, 'text/html', Buffer.from('<!doctype html><html lang="en">')), null);
});
test('WebP is checked as actual bytes, not HTTP status alone', () => {
  const bytes = Buffer.alloc(12); bytes.write('RIFF', 0); bytes.write('WEBP', 8);
  assert.equal(assessProbe({kind:'webp'}, 200, 'image/webp', bytes), null);
  assert.match(assessProbe({kind:'webp'}, 200, 'image/webp', Buffer.from('fake')), /signature/);
});

test('three governed image regressions are checked on both canonical and direct Worker origins', () => {
  const slugs = ['collin-county', 'freeman-coliseum', 'dubina-saints-cyril-methodius'];
  for (const slug of slugs) {
    const imageProbes = PROBES.filter(p => p.kind === 'webp' && p.url.endsWith('/images/discover/' + slug + '.webp'));
    assert.deepEqual(new Set(imageProbes.map(p => new URL(p.url).hostname)), new Set([
      'texasdefined.com', 'texasdefined-site.freddy-coppola.workers.dev',
    ]));
  }
});

test('all seven exact owner GSC server-error examples are preserved as functional HTML probes', () => {
  const expected = [
  "/events?venue=sports-venue%3Adickies-arena&start=2026-11-04&end=2026-11-04",
  "/events?venue=sports-venue%3Amemorial-park-golf-course",
  "/events?venue=sports-venue%3Acircuit-of-the-americas&start=2026-10-12&end=2026-10-12",
  "/search?q=best%20lighthouses%20in%20texas",
  "/texas-high-school-football-isds/tahoka-isd",
  "/property-tax/taxing-unit/edna",
  "/property-tax/taxing-unit/jackson-county-esd-1"
];
  assert.deepEqual(GSC_5XX_PATHS, expected);
  assert.deepEqual(PROBES.filter(p => p.exactView).map(p => p.url), expected.map(p => 'https://texasdefined.com' + p));
});
test('query normalization is allowed but dropping filters or redirecting to a generic hub fails', () => {
  const origin = 'https://texasdefined.com';
  assert.equal(sameRequestedView(origin + GSC_5XX_PATHS[0], origin + '/events?end=2026-11-04&start=2026-11-04&venue=sports-venue:dickies-arena'), true);
  assert.equal(sameRequestedView(origin + GSC_5XX_PATHS[3], origin + '/search?q=best+lighthouses+in+texas'), true);
  assert.equal(sameRequestedView(origin + GSC_5XX_PATHS[0], origin + '/events'), false);
  assert.equal(sameRequestedView(origin + GSC_5XX_PATHS[4], origin + '/texas-high-school-football-isds'), false);
});
