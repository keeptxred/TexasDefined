import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  AUTOMATED_NEWS_MAX_AGE_HOURS,
  isCurrentTexasDefinedAutoNewsSource,
} from './texasdefined-queue-freshness.mjs';

const fixedNow = Date.parse('2026-10-15T17:30:00Z');

test('dated current source within 72 hours is eligible', () => {
  assert.equal(AUTOMATED_NEWS_MAX_AGE_HOURS, 72);
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-10-15T12:00:00Z', fixedNow), true);
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-10-12T17:30:00Z', fixedNow), true);
});
test('expired and undated sources stay out of auto-publication', () => {
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-10-12T17:29:59Z', fixedNow), false);
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-09-21T12:00:00Z', fixedNow), false);
  assert.equal(isCurrentTexasDefinedAutoNewsSource(null, fixedNow), false);
  assert.equal(isCurrentTexasDefinedAutoNewsSource('invalid', fixedNow), false);
});
test('clock skew does not allow far-future or malformed dates', () => {
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-10-15T18:30:00Z', fixedNow), true);
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-10-15T18:30:01Z', fixedNow), false);
  assert.equal(isCurrentTexasDefinedAutoNewsSource('2026-10-15T12:00:00Z', NaN), false);
});
test('disabled publication workflow and queue guard both remain intact', () => {
  const publisher = readFileSync('scripts/news/texasdefined-auto-publisher.mjs', 'utf8');
  const workflow = readFileSync('.github/workflows/texasdefined-auto-publication.yml', 'utf8');
  assert.match(publisher, /isCurrentTexasDefinedAutoNewsSource\(item\?\.pub_date\)/);
  assert.match(publisher, /signals\.auto_publish_eligible !== true/);
  assert.match(publisher, /TEXASDEFINED_AUTO_PUBLISH_ENABLED !== 'true'/);
  assert.doesNotMatch(workflow, /^\s*schedule:/m);
});
