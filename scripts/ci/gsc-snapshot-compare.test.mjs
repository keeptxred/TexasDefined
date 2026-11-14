import assert from 'node:assert/strict';
import test from 'node:test';
import { parseGscPageCsv, compareGscPageWindows } from './gsc-snapshot-compare.mjs';

test('dated 28-day and quoted 7-day headers both parse', () => {
  const full = parseGscPageCsv('url,clicks,impressions,ctr,average_position\nhttps://texasdefined.com/article/test,3,100,0.03,9\n');
  const recent = parseGscPageCsv('key,clicks,impressions,ctr,average_position\n"https://texasdefined.com/article/test",2,40,0.05,6\n');
  assert.equal(full.size, 1);
  assert.equal(recent.size, 1);
  const combined = compareGscPageWindows(full.values().next().value, recent.values().next().value);
  assert.equal(combined.previous21.impressions, 60);
  assert.equal(combined.previous21.clicks, 1);
  assert.equal(combined.previous21.averagePosition, 11);
  assert.ok(combined.ctrDelta > 0);
  assert.equal(combined.positionDelta, -5);
});

test('rejects wrong domain, duplicate pages, missing columns and impossible windows', () => {
  assert.throws(() => parseGscPageCsv('page,c,i,c,p\n'), /header/);
  assert.throws(() => parseGscPageCsv('url,clicks,impressions,ctr,average_position\nhttps://evil.example/x,0,1,0,5\n'), /Invalid/);
  assert.throws(() => parseGscPageCsv('key,clicks,impressions,ctr,average_position\n"https://texasdefined.com/a",0,1,0,5\n"https://texasdefined.com/a",0,1,0,5\n'), /duplicate/);
  assert.throws(() => compareGscPageWindows({clicks:2,impressions:10,ctr:0.2,averagePosition:7},{clicks:3,impressions:11,ctr:3/11,averagePosition:6}),/exceed/);
});

test('small samples and entirely recent pages have no invented previous averages', () => {
  const total = {clicks:0,impressions:7,ctr:0,averagePosition:9};
  assert.deepEqual(compareGscPageWindows(total,total).previous21,null);
  assert.equal(compareGscPageWindows(total,null),null);
});
