import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROBES, assessProbe } from './probe-server-error-routes.mjs';

test('canaries remain bounded and are public HTTPS endpoints only', () => {
  assert.ok(PROBES.length >= 10 && PROBES.length <= 20);
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
