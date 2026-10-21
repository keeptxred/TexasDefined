import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

test('authority discovery groups sessions and never approves publication', () => {
  const dir = mkdtempSync(join(tmpdir(), 'td-event-candidates-'));
  try {
    mkdirSync(join(dir, 'src/data/generated'), { recursive: true });
    const fixture = { fetchedAt: '2026-10-21T00:00:00.000Z', events: [
      { id: 'one', name: 'Texas Balloon Festival - Friday', city: 'Austin', startDate: '2026-11-06', venue: 'Park', officialUrl: 'https://www.ticketmaster.com/festival/event/ABC123' },
      { id: 'two', name: 'Texas Balloon Festival - Saturday', city: 'Austin', startDate: '2026-11-07', venue: 'Park' },
      { id: 'three', name: 'Texas Balloon Festival VIP add-on', city: 'Austin', startDate: '2026-11-07' },
      { id: 'four', name: 'Ordinary concert', city: 'Dallas', startDate: '2026-11-08' },
    ] };
    writeFileSync(join(dir, 'src/data/generated/ticketmaster-events.json'), JSON.stringify(fixture));
    const script = resolve('scripts/events/build-ticketmaster-authority-candidates.mjs');
    const result = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const output = readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8');
    const candidates = JSON.parse(output).candidates;
    assert.equal(candidates.length, 1);
    assert.deepEqual(candidates[0].ticketmasterIds, ['one', 'two']);
    assert.equal(candidates[0].publicationAllowed, false);
    assert.deepEqual(candidates[0].officialTicketUrls, ['https://www.ticketmaster.com/festival/event/ABC123']);
    assert.equal(candidates[0].status, 'requires-organizer-verification');
    spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8'), output);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
