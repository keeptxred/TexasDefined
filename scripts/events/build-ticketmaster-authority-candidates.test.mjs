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
      { id: 'weekday', name: 'Texas Balloon Festival - Thursday', city: 'Austin', startDate: '2026-11-05', venue: 'Park' },
      { id: 'tour', name: 'Tank and the Bangas: The Last Balloon Tour', city: 'Austin', startDate: '2026-11-08' },
      { id: 'four', name: 'Ordinary concert', city: 'Dallas', startDate: '2026-11-08' },
      { id: 'five', name: 'Cancelled County Fair', city: 'Dallas', startDate: '2026-11-08', status: 'cancelled' },
      { id: 'six', name: 'Downtown Fest', city: 'Houston', startDate: 'not-a-date' },
    ] };
    writeFileSync(join(dir, 'src/data/generated/ticketmaster-events.json'), JSON.stringify(fixture));
    const script = resolve('scripts/events/build-ticketmaster-authority-candidates.mjs');
    const result = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const output = readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8');
    const candidates = JSON.parse(output).candidates;
    assert.equal(candidates.length, 1);
    assert.deepEqual(candidates[0].ticketmasterIds, ['one', 'two', 'weekday']);
    assert.equal(candidates[0].publicationAllowed, false);
    assert.deepEqual(candidates[0].officialTicketUrls, ['https://www.ticketmaster.com/festival/event/ABC123']);
    assert.equal(candidates[0].status, 'requires-organizer-verification');
    assert.deepEqual(candidates[0].evidence, { organizerUrl: null, recurrenceVerified: false, currentScheduleVerified: false, imageRightsVerified: false });
    spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8'), output);
    writeFileSync(join(dir, 'src/data/generated/ticketmaster-events.json'), JSON.stringify({ fetchedAt: fixture.fetchedAt, events: [] }));
    const failed = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.notEqual(failed.status, 0);
    assert.equal(readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8'), output);

    const confirmedLead = JSON.parse(output);
    confirmedLead.candidates[0].evidence.organizerUrl = 'https://festival.example.org/';
    writeFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), JSON.stringify(confirmedLead));
    writeFileSync(join(dir, 'src/data/generated/ticketmaster-events.json'), JSON.stringify({
      fetchedAt: '2027-11-01T00:00:00.000Z', events: [
        { id: 'next-year', name: 'Texas Balloon Festival - Sunday', city: 'Austin', startDate: '2027-11-07', venue: 'Park' },
      ],
    }));
    const annual = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(annual.status, 0, annual.stderr);
    const secondYear = JSON.parse(readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8')).candidates;
    assert.equal(secondYear.length, 1);
    assert.deepEqual(secondYear[0].dates, ['2027-11-07']);
    assert.deepEqual(secondYear[0].pastOccurrences, ['2026-11-05', '2026-11-06', '2026-11-07']);
    assert.deepEqual(secondYear[0].seenYears, ['2026', '2027']);
    assert.equal(secondYear[0].evidence.organizerUrl, 'https://festival.example.org/');
    assert.equal(secondYear[0].evidence.recurrenceVerified, false);
    assert.equal(secondYear[0].publicationAllowed, false);
    assert.deepEqual(secondYear[0].ticketmasterIds, ['next-year']);
    writeFileSync(join(dir, 'src/data/generated/ticketmaster-events.json'), JSON.stringify({
      fetchedAt: '2027-12-01T00:00:00.000Z', events: [
        { id: 'concert', name: 'Ordinary concert', city: 'Dallas', startDate: '2027-12-03' },
      ],
    }));
    const historical = spawnSync(process.execPath, [script], { cwd: dir, encoding: 'utf8' });
    assert.equal(historical.status, 0, historical.stderr);
    const archived = JSON.parse(readFileSync(join(dir, 'ops/editorial/ticketmaster-authority-candidates.json'), 'utf8')).candidates[0];
    assert.equal(archived.status, 'historical-review-only');
    assert.deepEqual(archived.dates, []);
    assert.deepEqual(archived.ticketmasterIds, []);
    assert.deepEqual(archived.officialTicketUrls, []);
    assert.equal(archived.publicationAllowed, false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
