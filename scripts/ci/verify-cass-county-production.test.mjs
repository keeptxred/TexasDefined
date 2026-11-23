import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertCassCountyAuthority, cassRequiredMarkers } from './verify-cass-county-production.mjs';

function fixture() {
  return '<!doctype html><html><head><link rel="canonical" href="https://texasdefined.com/county/cass"></head><body>'
    + '<h1>Cass County</h1>'
    + cassRequiredMarkers.map(marker => '<section>' + marker + '</section>').join('')
    + '</body></html>';
}
test('fully evidenced Cass visitor page passes', () => {
  assert.doesNotThrow(() => assertCassCountyAuthority(fixture(), 'https://texasdefined.com/county/cass'));
});
test('loss of a named musician, venue, county town or visitor fact is an error', () => {
  for (const marker of cassRequiredMarkers) {
    assert.throws(() => assertCassCountyAuthority(fixture().replace('<section>' + marker + '</section>', ''), '/county/cass'), /evidence missing/);
  }
});
test('source fixture never accepts a retired one-town placeholder', () => {
  assert.throws(() => assertCassCountyAuthority(fixture()
    + 'Texas Defined does not add an unsourced list of local communities.', '/county/cass'), /one-town structured place gap/);
});
test('noindex or unrelated county route cannot pass', () => {
  assert.throws(() => assertCassCountyAuthority(fixture()
    .replace('<head>', '<head><meta name="robots" content="noindex, follow">'), '/county/cass'), /incorrectly noindexed/);
  assert.throws(() => assertCassCountyAuthority(fixture()
    .replaceAll('/county/cass', '/county/bowie'), '/county/cass'), /canonical identity/);
});
