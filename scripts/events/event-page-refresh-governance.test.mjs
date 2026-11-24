import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  collectEventPageRefreshInventory, validateEventRefreshCoverage,
  refreshCadenceDays, dueForReview, nextSourceReviewAt, STATIC_EVENT_PAGES,
} from './event-page-refresh-governance.mjs';
import {
  evaluateSourceObservation, reviewEventSources, selectSourceReviewTargets,
  fullEditorialFreshnessBacklog, formatEventSourceIssue,
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
    'texas-state-fair.tsx', 'horse-racing.tsx', 'horse-racing_.$slug.tsx', 'corporate-events.tsx',
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
    assert.ok(i.dedicated.some(x => x.path === '/corporate-events' &&
      x.workflow === 'corporate-event-source-monitor.yml' && x.cadenceDays === 7));
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
  assert.equal(refreshCadenceDays(event('2026-07-01'), now), 7); // Prior confirmed edition, next annual source watch
  assert.equal(refreshCadenceDays({ path:'/holiday/pending', kind:'announcement-pending' }, now), 7);
  assert.equal(dueForReview(event('2026-11-08'), now), true);
  // A stable 3-day slot occurs precisely once per successive 3 days.
  const windows = Array.from({ length: 3 }, (_, i) =>
    dueForReview(event('2027-01-01'), new Date(Date.parse('2026-11-07T13:00:00Z') + i * 86400000)));
  assert.equal(windows.filter(Boolean).length, 1);
});

test('unannounced recurring seasons get earlier source checks without fabricating public dates', () => {
  const asOf = new Date('2026-11-07T13:00:00Z');
  const oldEdition = (startDate, endDate) => ({ path: '/event/repeating', startDate, endDate });
  assert.equal(refreshCadenceDays(oldEdition('2025-11-01', '2025-11-15'), asOf), 1,
    'prior-year seasonal run is in its expected annual window');
  assert.equal(refreshCadenceDays(oldEdition('2025-11-18', '2025-11-19'), asOf), 1,
    'unannounced next season is within 14 days');
  assert.equal(refreshCadenceDays(oldEdition('2025-12-01', '2025-12-03'), asOf), 3,
    'unannounced season within 90 days');
  assert.equal(refreshCadenceDays(oldEdition('2025-07-01', '2025-07-03'), asOf), 7,
    'long-range annual source check remains weekly');
  assert.equal(refreshCadenceDays(oldEdition('2026-11-03', '2026-11-04'), asOf), 7,
    'post-event correction window is preserved');
  assert.equal(refreshCadenceDays(oldEdition('2026-11-15', '2026-11-14'), asOf), 1,
    'invalid source dates need immediate review');
  assert.equal(refreshCadenceDays(oldEdition('not-a-date', 'not-a-date'), asOf), 30,
    'missing date metadata must not create synthetic occurrence dates');
  const event = oldEdition('2025-12-01', '2025-12-03');
  const next = nextSourceReviewAt(event, asOf);
  assert.ok(next >= '2026-11-07' && next <= '2026-11-09');
  assert.equal(dueForReview(event, new Date(next + 'T13:00:00Z')), true);
});

test('unverified or future editorial source-check timestamps stay in the backlog', () => {
  const f = fixture();
  try {
    const p = 'src/data/major-event-index.ts';
    const source = fs.readFileSync(path.join(f.root, p), 'utf8');
    f.put(p, source.replace('sourceCheckedAt: "2026-11-01"', 'sourceCheckedAt: "2099-12-31"'));
    const backlog = fullEditorialFreshnessBacklog(collectEventPageRefreshInventory(f.root),
      new Date('2026-11-07T13:00:00Z'));
    assert.ok(backlog.find(item => item.path === '/event/autumn-market')
      ?.concerns.includes('future-editorial-source-check-date'));
  } finally { f.dispose(); }
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
    assert.equal(result.scheduledPages, 4 + 2 + 3 + 6);
    assert.equal(result.schedule.length, result.scheduledPages);
    assert.ok(result.schedule.every(row => row.workflow && row.nextSourceReviewAt));
    assert.ok(result.schedule.some(row => row.path === '/events' && row.workflow === 'sync-texas-events.yml'));
    assert.ok(result.schedule.some(row => row.path === '/corporate-events' &&
      row.workflow === 'corporate-event-source-monitor.yml' && row.cadenceDays === 7));
    assert.ok(result.schedule.some(row => row.path === '/event/river-festival' && row.officialSource));
    assert.ok(result.schedule.some(row => row.path === '/holiday/magical-winter-lights'));
    assert.equal(result.state, 'observed');
    assert.equal(calls, result.uniqueSources);
    assert.deepEqual(result.coverageErrors, []);
    assert.equal(JSON.parse(fs.readFileSync(path.join(f.root, 'event-refresh.json'))).due, result.due);
    assert.ok(selectSourceReviewTargets(collectEventPageRefreshInventory(f.root), new Date('2026-11-07T13:00:00Z')).length > 0);
  } finally { f.dispose(); }
});


test('overdue distant event guides receive weekly source verification slots without fake date refreshes', async () => {
  const f = fixture();
  try {
    const file = 'src/data/major-event-index.ts';
    f.put(file, fs.readFileSync(path.join(f.root, file), 'utf8').replace(
      '    ];',
      `      { slug: "long-range-overdue", startDate: "2028-04-01",
        officialUrl: "https://example.org/old-event", sourceCheckedAt: "2026-01-01" },
    ];`,
    ));
    const inventory = collectEventPageRefreshInventory(f.root);
    const asOf = new Date('2026-11-07T13:00:00Z');
    const target = inventory.permanent.find(e => e.slug === 'long-range-overdue');
    assert.equal(refreshCadenceDays(target, asOf), 30, 'distant guides otherwise have monthly checks');
    const slots = Array.from({ length: 14 }, (_, i) =>
      new Date(asOf.getTime() + i * 86400000))
      .filter(day => selectSourceReviewTargets(inventory, day)
        .some(item => item.path === '/event/long-range-overdue'));
    assert.equal(slots.length, 2, 'overdue source must receive a deterministic weekly check');
    const report = await reviewEventSources({
      root: f.root, now: slots[0],
      outputPath: path.join(f.root, 'overdue-weekly.json'),
      fetchImpl: async () => new Response(
        '<html><body>' + 'Official organizer event details '.repeat(12) + '</body></html>',
        { status: 200, headers: { 'Content-Type': 'text/html' } },
      ),
    });
    const scheduled = report.schedule.find(e => e.path === '/event/long-range-overdue');
    assert.equal(scheduled.cadenceDays, 7);
    assert.equal(scheduled.editorialCadenceDays, 30);
    assert.equal(scheduled.expeditedOverdueReview, true);
    assert.equal(scheduled.nextSourceReviewAt, slots[0].toISOString().slice(0, 10));
    assert.equal(report.observations.find(e => e.path === scheduled.path)?.sourceState,
      'reachable-not-date-verified');
    assert.ok(report.editorialBacklog.some(e => e.path === scheduled.path),
      'HTTP reachability never clears overdue editorial-verification debt');
  } finally { f.dispose(); }
});


test('new 90-day review window gets an immediate verification despite hash phase changes', () => {
  // The 2026 Washington-on-the-Brazos edition is past. The next annual
  // season estimate crosses the 90-day threshold on 2026-11-30; the old
  // 7-day hash slot also falls on November 30, but the 3-day hash does not.
  // The transition itself must be due rather than silently skipping a week.
  const event = {
    path: '/event/washington-on-the-brazos-texas-independence-day',
    startDate: '2026-02-28', endDate: '2026-02-28',
  };
  const asOf = new Date('2026-11-24T13:07:00Z');
  const before = new Date('2026-11-29T13:07:00Z');
  const transition = new Date('2026-11-30T13:07:00Z');
  assert.equal(refreshCadenceDays(event, before), 7);
  assert.equal(refreshCadenceDays(event, transition), 3);
  assert.equal(dueForReview(event, transition, 3), true);
  assert.equal(nextSourceReviewAt(event, asOf, 7), '2026-11-30');
});

test('the entire real editorial backlog has a bounded seven-day GitHub source-check schedule', () => {
  const inventory = collectEventPageRefreshInventory();
  const asOf = new Date();
  const backlog = fullEditorialFreshnessBacklog(inventory, asOf);
  const slots = new Map();
  for (let i = 0; i < 7; i++) {
    const day = new Date(Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(),
      asOf.getUTCDate() + i, 13, 7));
    for (const record of selectSourceReviewTargets(inventory, day)) {
      if (!slots.has(record.path)) slots.set(record.path, day.toISOString().slice(0, 10));
    }
  }
  for (const record of backlog) {
    assert.ok(slots.has(record.path),
      'No seven-day verification slot for stale event: ' + record.path);
    assert.ok(record.nextSourceReviewAt <= slots.get(record.path),
      'Inventory next-review metadata must match the actual scheduled date: ' + record.path);
  }
  assert.deepEqual(validateEventRefreshCoverage(inventory), []);
});


test('substantive editorial source reviews remain dated and agree across guides and organizer gates', () => {
  const source = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const event = (file, slug) => {
    const body = source(file);
    const start = body.indexOf('slug: "' + slug + '"');
    assert.ok(start >= 0, 'Missing reviewed event ' + slug + ' in ' + file);
    const end = body.indexOf('\n  },', start);
    return body.slice(start, end < 0 ? undefined : end);
  };
  const assertSourceReview = (record, minimum, slug) => {
    const reviewDate = /sourceCheckedAt: "(\\d{4}-\\d{2}-\\d{2})"/.exec(record)?.[1];
    assert.ok(reviewDate && !Number.isNaN(Date.parse(reviewDate)), 'Missing valid source review date for ' + slug);
    assert.ok(reviewDate >= minimum, 'Source review must not regress below researched baseline for ' + slug);
    assert.ok(reviewDate <= new Date().toISOString().slice(0, 10), 'Source review cannot be future dated for ' + slug);
  };
  const south = event('src/data/major-event-expanded-authority-tranche47.server.ts', 'south-pole-illuminated-festival');
  assert.match(south, /startDate: "2026-11-27"/);
  assert.match(south, /endDate: "2026-12-27"/);
  assertSourceReview(south, "2026-11-24", "south-pole-illuminated-festival");
  assert.match(south, /mcallenholidayparade\.com\/tree-lighting-ceremony/);
  const sourceMonitor = source('scripts/events/check-november-event-sources.mjs');
  assert.ok(sourceMonitor.includes('November\\s+27\\s*[-–]\\s*December\\s+27'), 'November source monitor must require current dates');
  const partner = source('src/data/events/ticketmaster-events.server.ts');
  assert.doesNotMatch(partner, /event\.startDate === '2026-11-27'\) return \[\]/);
  const prairie = event('src/data/major-event-expanded-authority-tranche59.server.ts', 'grand-prairie-prairie-lights');
  assertSourceReview(prairie, "2026-11-15", "grand-prairie-prairie-lights");
  assert.match(prairie, /motorcycle preview November 20/);
  const big12 = event('src/data/major-event-expanded-authority-tranche47.server.ts', 'big-12-football-championship');
  assertSourceReview(big12, "2026-11-15", "big-12-football-championship");
  assert.match(big12, /final edition/);
  assert.match(big12, /2026\/11\/9\/2026-edward-jones-big-12-football-championship/);
  const sun = event('src/data/tournaments/verified-profiles.ts', 'the-sun-bowl');
  assert.match(sun, /name: "Old El Paso Sun Bowl"/);
  assert.match(sun, /noon Mountain Standard Time/);
  for (const [file, slug] of [
    ['src/data/tournaments/verified-profiles.ts', 'the-first-responder-bowl'],
    ['src/data/tournaments/verified-profiles.ts', 'the-armed-forces-bowl'],
    ['src/data/tournaments/verified-profiles.ts', 'the-texas-bowl'],
    ['src/data/tournaments/verified-profiles.ts', 'the-cotton-bowl-classic'],
    ['src/data/tournaments/verified-profiles-batch4.ts', 'uil-spirit-state-championships'],
    ['src/data/tournaments/verified-profiles-batch4.ts', 'uil-wrestling-state-championships'],
    ['src/data/major-event-expanded-authority-tranche36.server.ts', 'valero-alamo-bowl'],
    ['src/data/major-event-expanded-authority-tranche33.server.ts', 'spurs-austin-international-half'],
    ['src/data/major-event-expanded-authority-tranche34.server.ts', 'austin-e-prix'],
    ['src/data/major-event-expanded-authority-tranche41.server.ts', 'texas-citrus-fiesta'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'beaumont-pardi-gras'],
    ['src/data/major-event-expanded-authority-tranche15.server.ts', 'houston-auto-show'],
    ['src/data/major-event-expanded-authority-tranche15.server.ts', 'sandhills-stock-show-rodeo'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'cowboy-mardi-gras-bandera'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'crystal-beach-mardi-gras-parade'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'mardi-gras-on-the-sabine-orange'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'kemah-yachty-gras'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'mardi-gras-upriver-jefferson'],
    ['src/data/major-event-expanded-authority-tranche52.server.ts', 'mardi-gras-port-arthur'],
    ['src/data/major-event-expanded-authority-tranche25.server.ts', 'mardi-gras-galveston'],
    ['src/data/major-event-expanded-authority-tranche57.server.ts', 'main-street-bethlehem-burnet'],
  ]) assertSourceReview(event(file, slug),
    slug === 'main-street-bethlehem-burnet' ? "2026-11-24" : "2026-11-15", slug);
});


test('second organizer-review tranche preserves current 2027 dates and historical 2026 boundaries', () => {
  const source = (file) => fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const record = (file, slug) => {
    const body = source(file);
    const a = body.indexOf('slug: "' + slug + '"');
    assert.ok(a >= 0, 'Missing event record: ' + slug);
    let b = body.indexOf('\n  },', a);
    if (b < 0) b = body.length;
    return body.slice(a, b);
  };
  const cases = [
    ['src/data/major-event-expanded-authority-tranche21.server.ts', 'great-texas-balloon-race'],
    ['src/data/major-event-index.ts', 'houston-livestock-show-rodeo'],
    ['src/data/major-event-index.ts', 'main-st-fort-worth-arts-festival'],
    ['src/data/major-event-expanded-authority-tranche33.server.ts', 'atx-open'],
    ['src/data/major-event-expanded-authority-tranche32.server.ts', 'austin-marathon'],
    ['src/data/major-event-expanded-authority-tranche32.server.ts', 'cowtown-marathon'],
    ['src/data/major-event-expanded-authority-tranche35.server.ts', 'autumn-at-the-arboretum'],
    ['src/data/major-event-expanded-authority-tranche31.server.ts', 'austin-city-limits-music-festival'],
    ['src/data/major-event-expanded-authority-tranche26.server.ts', 'bayou-city-art-festival-memorial-park'],
    ['src/data/major-event-expanded-authority-tranche28.server.ts', 'austin-food-wine-festival'],
    ['src/data/major-event-expanded-authority-tranche29.server.ts', 'texas-tribune-festival'],
    ['src/data/major-event-expanded-authority-tranche34.server.ts', 'texas-motor-speedway-nascar-weekend'],
    ['src/data/major-event-expanded-authority-tranche25.server.ts', 'fredericksburg-oktoberfest'],
    ['src/data/major-event-expanded-authority-tranche25.server.ts', 'houston-art-car-parade'],
    ['src/data/major-event-expanded-authority-tranche26.server.ts', 'bob-wills-day'],
    ['src/data/major-event-expanded-authority-tranche27.server.ts', 'lone-star-cowboy-poetry-gathering-alpine'],
    ['src/data/major-event-expanded-authority-tranche27.server.ts', 'lone-star-cowboy-poetry-gathering-bastrop'],
    ['src/data/major-event-expanded-authority-tranche27.server.ts', 'red-steagall-cowboy-gathering'],
    ['src/data/major-event-expanded-authority-tranche28.server.ts', 'original-greek-festival-houston'],
    ['src/data/major-event-expanded-authority-tranche29.server.ts', 'texas-clay-festival'],
    ['src/data/major-event-expanded-authority-tranche30.server.ts', 'rodeo-austin'],
    ['src/data/major-event-expanded-authority-tranche30.server.ts', 'san-antonio-book-festival'],
    ['src/data/major-event-expanded-authority-tranche26.server.ts', 'western-heritage-classic'],
    ['src/data/major-event-expanded-authority-tranche29.server.ts', 'gruene-music-wine-festival'],
  ];
  for (const [file, slug] of cases) {
    assert.match(record(file, slug), /sourceCheckedAt: "2026-11-15"/,
      'Actual editorial source review missing from ' + slug);
  }
  const balloon = record(cases[0][0], 'great-texas-balloon-race');
  assert.match(balloon, /startDate: "2027-07-22"/);
  assert.match(balloon, /endDate: "2027-07-25"/);
  assert.doesNotMatch(balloon, /startDate: "2026-06-12"/);
  const fredericksburg = record('src/data/major-event-expanded-authority-tranche25.server.ts', 'fredericksburg-oktoberfest');
  assert.match(fredericksburg, /startDate: "2027-10-01"/);
  const greek = record('src/data/major-event-expanded-authority-tranche28.server.ts', 'original-greek-festival-houston');
  assert.match(greek, /startDate: "2027-10-07"/);
  const red = record('src/data/major-event-expanded-authority-tranche27.server.ts', 'red-steagall-cowboy-gathering');
  assert.match(red, /startDate: "2027-10-22"/);
  assert.match(red, /2027 tickets coming soon/i);
  const acl = record('src/data/major-event-expanded-authority-tranche31.server.ts', 'austin-city-limits-music-festival');
  assert.match(acl, /organizer has not announced 2027/i);
});


test('third official-source review cohort preserves dated 2027 announcements and historical-only events', () => {
  const source = (file, slug) => {
    const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
    const index = content.indexOf('slug: "' + slug + '"');
    assert.ok(index >= 0, 'Missing event: ' + slug);
    let end = content.indexOf('\n  },', index);
    if (end < 0) end = content.length;
    return content.slice(index, end);
  };
  const expected = [
    ['37', 'cottonwood-art-festival'],
    ['37', 'grapevine-main-street-fest'],
    ['37', 'plano-balloon-festival'],
    ['38', 'fort-worth-food-wine-festival'],
    ['38', 'east-texas-yamboree'],
    ['38', 'houston-cinema-arts-festival'],
    ['38', 'rio-grande-valley-livestock-show-rodeo'],
    ['39', 'comal-county-fair-rodeo'],
    ['40', 'cuero-turkeyfest'],
    ['40', 'seguin-pecan-fest'],
    ['40', 'texas-mushroom-festival'],
    ['40', 'hopkins-county-stew-contest'],
  ];
  for (const [tranche, slug] of expected) {
    const record = source('src/data/major-event-expanded-authority-tranche'
      + tranche + '.server.ts', slug);
    assert.match(record, /sourceCheckedAt: "2026-11-15"/,
      'No real editorial review for: ' + slug);
  }
  assert.match(source('src/data/major-event-expanded-authority-tranche37.server.ts',
    'cottonwood-art-festival'), /startDate: "2027-05-01"/);
  assert.match(source('src/data/major-event-expanded-authority-tranche37.server.ts',
    'plano-balloon-festival'), /startDate: "2027-09-16"/);
  assert.match(source('src/data/major-event-expanded-authority-tranche38.server.ts',
    'fort-worth-food-wine-festival'), /all guests under 21/);
  assert.match(source('src/data/major-event-expanded-authority-tranche39.server.ts',
    'comal-county-fair-rodeo'), /2027 unannounced/);
  assert.match(source('src/data/major-event-expanded-authority-tranche40.server.ts',
    'hopkins-county-stew-contest'), /chamber has not published a verified 2027/);
});


test('actionable issue includes every overdue canonical/source including those after legacy 120-row cap', () => {
  const records = Array.from({length: 166}, (_, i) => ({
    path: '/event/test-festival-' + i, source: 'https://festival-' + i + '.org/',
    concerns: ['editorial-source-check-overdue'], editorialSourceCheckedAt: '2026-09-01', cadenceDays: 7,
  }));
  const report = {coverage: {permanent: 272, collectionRoutes: 32, specialRoutes: 3},
    due: 69, attempted: 69, coverageErrors: [], editorialBacklogCount: records.length,
    editorialBacklog: records,
    findings: [{...records[0], concerns: ['organizer-source-unavailable']}],
  };
  const issue = formatEventSourceIssue(report, 'https://github.com/owner/repo/actions/runs/1');
  for (const row of records) assert.ok(issue.includes('`' + row.path + '`'), row.path);
  assert.match(issue, /unique route\/source pairs: 166/);
  assert.match(issue, /editorial-source-check-overdue, organizer-source-unavailable/);
  assert.equal(issue.split('`/event/test-festival-0`').length, 2);
  assert.throws(() => formatEventSourceIssue({...report, editorialBacklogCount: 167}, 'run'), /Incomplete/);
  assert.throws(() => formatEventSourceIssue({...report, editorialBacklogCount: 166,
    editorialBacklog: records.map(row => ({...row, source: 'https://example.org/' + 'x'.repeat(500)}))}, 'run'), /exceeds safe GitHub body size/);
});


test('pull-request source contracts do not share the pending live source review concurrency slot', () => {
  const workflow = fs.readFileSync(path.join(process.cwd(), '.github/workflows/event-authority-source-refresh.yml'), 'utf8');
  const concurrency = workflow.match(/\nconcurrency:\n([\s\S]*?)(?=\n[^\s#][^\n]*:)/)?.[1] || '';
  assert.ok(concurrency.includes("github.event_name == 'pull_request'"));
  assert.ok(concurrency.includes("format('pr-{0}', github.event.pull_request.number)"));
  assert.ok(concurrency.includes("|| 'live'"));
  assert.match(concurrency, /cancel-in-progress: false/);
});
