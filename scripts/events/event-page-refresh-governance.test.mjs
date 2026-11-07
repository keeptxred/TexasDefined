import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  collectEventPageRefreshInventory, validateEventRefreshCoverage,
  refreshCadenceDays, dueForReview, STATIC_EVENT_PAGES,
} from './event-page-refresh-governance.mjs';
import {
  evaluateSourceObservation, reviewEventSources, selectSourceReviewTargets,
  fullEditorialFreshnessBacklog,
} from './monitor-event-authority-sources.mjs';

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'td-event-refresh-'));
  const put = (p, s) => {
    fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
    fs.writeFileSync(path.join(root, p), s);
  };
  put('src/data/major-event-index.ts', `
    const sourceDay = "2026-11-06" as const;
    export const majorEventIndexRecords = [
      { slug: "river-festival", startDate: "2026-11-12", endDate: "2026-11-13",
        officialUrl: "https://example.org/festival", sourceCheckedAt: sourceDay },
      { slug: "autumn-market", startDate: "2026-12-18",
        officialUrl: "https://example.org/market", sourceCheckedAt: "2026-11-01" },
    ];
  `);
  put('src/data/major-event-expanded-authority-tranche3.server.ts', `
    const records = [
      { slug: "winter-parade", startDate: "2027-02-10",
        officialUrl: "https://example.org/parade", sourceCheckedAt: "2026-10-01",
        planningSections: [{ title: "Plan", body: "Source-safe" }] },
    ];
  `);
  put('src/data/tournaments/verified-profiles.ts', `
    const checkedAt = "2026-11-06";
    export const VERIFIED_TOURNAMENT_PROFILES = [
      { slug: "golf-championship", startDate: "2027-03-05",
        officialUrl: "https://example.org/golf", sourceCheckedAt: checkedAt },
    ];
  `);
  put('src/data/major-event-supplemental-registry.server.ts',
    'export const supplementalMajorEventSlugs = ["winter-parade", "golf-championship"] as const;');
  put('src/data/event-collections.ts',
    'export const EVENT_COLLECTIONS = [{ slug:"fairs", path:"/events/fairs" }];');
  put('src/data/event-temporal-collections.server.ts',
    'const temporalCollections = [{ slug:"this-weekend", path:"/events/this-weekend" }];');
  for (const file of [
    'events.tsx', 'events.index.tsx', 'events.$collection.tsx',
    'events.air-shows.tsx', 'events.mardi-gras.tsx', 'event.$slug.tsx',
    'holiday.enchant-christmas-arlington.tsx', 'holiday.magical-winter-lights.tsx',
    'texas-state-fair.tsx', 'horse-racing.tsx', 'horse-racing_.$slug.tsx',
  ]) put('src/routes/' + file, '// route');
  return { root, put, dispose: () => fs.rmSync(root, { recursive: true, force: true }) };
}

test('covers all permanent index, supplemental, temporal and specialized route families', () => {
  const f = fixture();
  try {
    const i = collectEventPageRefreshInventory(f.root);
    assert.equal(i.permanent.length, 4);
    assert.deepEqual(i.missing, []);
    assert.deepEqual(i.missingSources, []);
    assert.equal(i.collections.length, 2);
    assert.ok(i.permanent.some(x => x.path === '/event/river-festival'));
    assert.ok(i.permanent.some(x => x.path === '/event/winter-parade'));
    assert.ok(i.permanent.some(x => x.path === '/event/golf-championship'));
    assert.deepEqual(validateEventRefreshCoverage(i), []);
    f.put('src/routes/events.unregistered.tsx', '// new undisclosed event page');
    assert.ok(validateEventRefreshCoverage(collectEventPageRefreshInventory(f.root))
      .some(x => x.includes('events.unregistered.tsx')));
  } finally { f.dispose(); }
});

test('new supplemental slugs cannot silently escape scheduled coverage', () => {
  const f = fixture();
  try {
    f.put('src/data/major-event-supplemental-registry.server.ts',
      'export const supplementalMajorEventSlugs = ["winter-parade", "missing-parade"] as const;');
    const errors = validateEventRefreshCoverage(collectEventPageRefreshInventory(f.root));
    assert.ok(errors.some(e => e.includes('missing-parade')));
  } finally { f.dispose(); }
});

test('event-sensitive cadence is daily, 3-day, weekly or monthly without guessed annual dates', () => {
  const now = new Date('2026-11-07T13:00:00Z');
  const event = startDate => ({ path: '/event/festival', startDate });
  assert.equal(refreshCadenceDays(event('2026-11-08'), now), 1);
  assert.equal(refreshCadenceDays({ ...event('2026-11-01'), endDate: '2026-11-10' }, now), 1);
  assert.equal(refreshCadenceDays(event('2027-01-01'), now), 3);
  assert.equal(refreshCadenceDays(event('2027-04-01'), now), 7);
  assert.equal(refreshCadenceDays(event('2027-12-01'), now), 30);
  assert.equal(refreshCadenceDays(event('2026-07-01'), now), 30);
  assert.equal(refreshCadenceDays({ path:'/holiday/pending', kind:'announcement-pending' }, now), 7);
  assert.equal(dueForReview(event('2026-11-08'), now), true);
  // A stable 3-day slot occurs precisely once per successive 3 days.
  const windows = Array.from({ length: 3 }, (_, i) =>
    dueForReview(event('2027-01-01'), new Date(Date.parse('2026-11-07T13:00:00Z') + i * 86400000)));
  assert.equal(windows.filter(Boolean).length, 1);
});

test('organizer HTTP 200 alone never rewrites verified dates or hides stale editor review', () => {
  const now = new Date('2026-11-07T13:00:00Z');
  const item = { path:'/event/festival', kind:'permanent', sourceUrl:'https://example.org',
    sourceCheckedAt:'2026-09-01', sourceAgeDays:67, cadenceDays:1 };
  const check = evaluateSourceObservation(item, { ok:true, status:200, fetchedAt:now.toISOString() }, now);
  assert.equal(check.sourceState, 'reachable-not-date-verified');
  assert.ok(check.concerns.includes('editorial-source-check-overdue'));
  assert.equal(check.editorialSourceCheckedAt, '2026-09-01');
  const unreachable = evaluateSourceObservation(item, { ok:false, error:'HTTP 403' }, now);
  assert.ok(unreachable.concerns.includes('organizer-source-unavailable'));
});

test('blocked organizer source can use approved official fallback without pretending dates were reverified', async () => {
  const f = fixture();
  try {
    const pathName = 'src/data/major-event-index.ts';
    const previous = fs.readFileSync(path.join(f.root, pathName), 'utf8');
    f.put(pathName, previous.replace(
      '    ];',
      `      { slug:"texas-jazz-festival", startDate:"2026-11-08",
        officialUrl:"https://texasjazz-festival.org/", sourceCheckedAt:"2026-11-05" },
    ];`,
    ));
    const calls = [];
    const result = await reviewEventSources({
      root: f.root, now: new Date('2026-11-07T13:00:00Z'), concurrency: 2,
      outputPath: path.join(f.root, 'fallback-report.json'),
      fetchImpl: async url => {
        calls.push(String(url));
        return String(url).includes('texasjazz-festival.org')
          ? new Response('blocked', { status: 403 })
          : new Response('<html><body>' + 'First-party tourism festival source. '.repeat(10) + '</body></html>', {
            status: 200, headers: { 'Content-Type': 'text/html' },
          });
      },
    });
    const event = result.observations.find(x => x.path === '/event/texas-jazz-festival');
    assert.ok(event, 'new event covered by the route inventory');
    assert.equal(event.sourceState, 'official-fallback-reachable-not-date-verified');
    assert.equal(event.source, 'https://texasjazz-festival.org/');
    assert.equal(event.fallbackSource, 'https://www.visitcorpuschristi.com/texas-jazz-festival/');
    assert.equal(event.primarySourceError, 'HTTP 403');
    assert.equal(event.editorialSourceCheckedAt, '2026-11-05');
    assert.ok(calls.some(x => x.includes('visitcorpuschristi.com')));
  } finally { f.dispose(); }
});

test('a clean rotating source cohort cannot close issues for other stale event guides', async () => {
  const f = fixture();
  try {
    const now = Array.from({ length: 7 }, (_, i) => new Date(Date.parse('2026-11-07T13:00:00Z') + i * 86400000))
      .find(date => !dueForReview({
        path: '/event/winter-parade', startDate: '2027-02-10',
      }, date) && STATIC_EVENT_PAGES.every(event => !dueForReview(event, date)));
    assert.ok(now);
    // A long-overdue guide is intentionally NOT in today's deterministic
    // source crawl; every other sample guide has recently reviewed metadata.
    const paths = [
      'src/data/major-event-index.ts',
      'src/data/major-event-expanded-authority-tranche3.server.ts',
      'src/data/tournaments/verified-profiles.ts',
    ];
    for (const file of paths) {
      let content = fs.readFileSync(path.join(f.root, file), 'utf8');
      content = content.replaceAll('2026-11-06', now.toISOString().slice(0, 10))
        .replaceAll('2026-11-01', now.toISOString().slice(0, 10))
        .replaceAll('2026-10-01', '2026-01-01');
      f.put(file, content);
    }
    const report = await reviewEventSources({
      root: f.root, now,
      outputPath: path.join(f.root, 'full-inventory.json'),
      fetchImpl: async () => new Response(
        '<html><body>' + 'Current official organizer information '.repeat(12) + '</body></html>',
        { status: 200, headers: { 'Content-Type': 'text/html' } },
      ),
    });
    assert.equal(report.findings.length, 0, 'today\'s due cohort has no concerns');
    assert.ok(report.editorialBacklogCount >= 1, 'other guides remain overdue');
    assert.ok(report.editorialBacklog.some(row => row.path === '/event/winter-parade'));
    assert.ok(report.editorialBacklog.some(row => row.path === '/holiday/magical-winter-lights'),
      'independently routed holiday guides also require recorded editorial checks');
    assert.equal(report.needsReview, true, 'the persistent GitHub issue must stay open');
    const debt = fullEditorialFreshnessBacklog(
      collectEventPageRefreshInventory(f.root), now,
    );
    assert.deepEqual(report.editorialBacklog, debt);
  } finally { f.dispose(); }
});

test('scheduled source monitor enumerates all URLs with bounded calls and writes review evidence', async () => {
  const f = fixture();
  try {
    let calls = 0;
    const result = await reviewEventSources({
      root: f.root, now: new Date('2026-11-07T13:00:00Z'), concurrency: 2,
      outputPath: path.join(f.root, 'event-refresh.json'),
      fetchImpl: async () => {
        calls++;
        return new Response('<html><body>' + 'Official current event information. '.repeat(8) + '</body></html>', {
          status: 200, headers: { 'Content-Type': 'text/html' },
        });
      },
    });
    assert.equal(result.coverage.permanent, 4);
    assert.ok(result.due >= 1);
    assert.equal(result.attempted, result.due);
    assert.equal(result.state, 'observed');
    assert.equal(calls, result.uniqueSources);
    assert.deepEqual(result.coverageErrors, []);
    assert.equal(JSON.parse(fs.readFileSync(path.join(f.root, 'event-refresh.json'))).due, result.due);
    assert.ok(selectSourceReviewTargets(collectEventPageRefreshInventory(f.root), new Date('2026-11-07T13:00:00Z')).length > 0);
  } finally { f.dispose(); }
});
