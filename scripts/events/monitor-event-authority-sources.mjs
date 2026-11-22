#!/usr/bin/env node
/**
 * Daily GitHub source monitor for ALL permanent TexasDefined event guides.
 * Dynamic event feeds already refresh in sync-texas-events.yml; current
 * weekend/month collections are recalculated and separately checked daily.
 *
 * No automatic date rollover, invented tickets, noindex relaxation, fake
 * sourceCheckedAt updates, or unlicensed image swaps.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  collectEventPageRefreshInventory, validateEventRefreshCoverage,
  dueForReview, refreshCadenceDays, nextSourceReviewAt,
} from './event-page-refresh-governance.mjs';

export const DEFAULT_REPORT = '.artifacts/event-authority-source-refresh.json';
// Verified first-party fallback hosts, used ONLY when the primary organizer
// URL blocks automated reads or returns a thin JS shell. This is NOT approval
// to replace dates, ticket links or editorial verification timestamps.
export const OFFICIAL_EVENT_SOURCE_FALLBACKS = Object.freeze({
  '/event/gaylord-texan-ice': ['https://tickets.gaylordtexan.com/eventperformances.asp?evt=243'],
  '/event/houston-ballet-nutcracker-market': ['https://www.reliantpark.com/event/nutcracker-market/'],
  '/event/texas-jazz-festival': ['https://www.visitcorpuschristi.com/texas-jazz-festival/'],
});
const dayMs = 86400000;
const dayNumber = date => Math.floor(Date.parse(date.slice(0, 10) + 'T00:00:00Z') / dayMs);
const asIso = date => date.toISOString().slice(0, 10);
const reviewedAgeDays = (value, asOf) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = Date.parse(value + 'T00:00:00Z');
  if (!Number.isFinite(parsed) || new Date(parsed).toISOString().slice(0, 10) !== value) return null;
  return dayNumber(asIso(asOf)) - dayNumber(value);
};

export function allEventReviewTargets(inventory, asOf = new Date()) {
  return [...inventory.permanent, ...inventory.specials]
    .map(event => {
      const editorialCadenceDays = refreshCadenceDays(event, asOf);
      const sourceAgeDays = reviewedAgeDays(event.sourceCheckedAt, asOf);
      // Overdue or invalid editorial checks cannot linger on a monthly
      // official-source observation slot. Escalate them to at least weekly
      // until a protected, evidence-backed editorial verification is merged.
      const editorialReviewOverdue = sourceAgeDays == null || sourceAgeDays < 0 ||
        sourceAgeDays > Math.max(7, editorialCadenceDays * 3);
      const cadenceDays = editorialReviewOverdue
        ? Math.min(editorialCadenceDays, 7) : editorialCadenceDays;
      return {
        ...event, cadenceDays, editorialCadenceDays, editorialReviewOverdue,
        expeditedOverdueReview: editorialReviewOverdue && cadenceDays < editorialCadenceDays,
        sourceAgeDays,
        nextSourceReviewAt: nextSourceReviewAt(event, asOf,
          editorialReviewOverdue ? 7 : null),
      };
    }).sort((a, b) => a.path.localeCompare(b.path));
}

export function selectSourceReviewTargets(inventory, asOf = new Date()) {
  return allEventReviewTargets(inventory, asOf)
    .filter(event => dueForReview(event, asOf, event.cadenceDays));
}

// Freshness debt must be computed from the ENTIRE source inventory, not only
// today's deterministic source-crawl cohort. Otherwise a day with no failures
// can prematurely close an issue while other published pages are still overdue.
export function fullEditorialFreshnessBacklog(inventory, asOf = new Date()) {
  return allEventReviewTargets(inventory, asOf)
    .filter(event => event.sourceAgeDays == null || event.sourceAgeDays < 0 ||
      event.sourceAgeDays > Math.max(7, event.editorialCadenceDays * 3))
    .map(event => ({
      path: event.path, source: event.sourceUrl,
      editorialSourceCheckedAt: event.sourceCheckedAt,
      editorialSourceAgeDays: event.sourceAgeDays,
      cadenceDays: event.cadenceDays, editorialCadenceDays: event.editorialCadenceDays,
      expeditedOverdueReview: event.expeditedOverdueReview,
      nextSourceReviewAt: event.nextSourceReviewAt,
      startDate: event.startDate,
      concerns: event.sourceAgeDays == null
        ? ['missing-or-invalid-editorial-source-check-date']
        : event.sourceAgeDays < 0
          ? ['future-editorial-source-check-date']
          : ['editorial-source-check-overdue'],
    }))
    .sort((a, b) => a.cadenceDays - b.cadenceDays ||
      (b.editorialSourceAgeDays ?? 0) - (a.editorialSourceAgeDays ?? 0) ||
      a.path.localeCompare(b.path));
}

export function evaluateSourceObservation(target, outcome, asOf = new Date()) {
  const errors = [];
  if (!outcome.ok) errors.push('organizer-source-unavailable');
  // A page GET is only a source observation. It does not confirm a new
  // occurrence, ticket availability, cancellation status or a date change.
  if (target.sourceAgeDays == null) {
    errors.push('missing-or-invalid-editorial-source-check-date');
  } else if (target.sourceAgeDays < 0) {
    errors.push('future-editorial-source-check-date');
  } else if (target.sourceAgeDays > Math.max(7, (target.editorialCadenceDays ?? target.cadenceDays) * 3)) {
    errors.push('editorial-source-check-overdue');
  }
  if (target.startDate && Number.isFinite(Date.parse(target.startDate)) &&
      target.sourceAgeDays != null && target.startDate <= asIso(asOf) &&
      (target.endDate ?? target.startDate) < asIso(asOf) &&
      target.sourceAgeDays > 45) {
    errors.push('completed-edition-awaiting-next-organizer-review');
  }
  return {
    path: target.path, kind: target.kind, source: target.sourceUrl, cadenceDays: target.cadenceDays,
    expeditedOverdueReview: Boolean(target.expeditedOverdueReview),
    nextSourceReviewAt: target.nextSourceReviewAt,
    editorialSourceCheckedAt: target.sourceCheckedAt, editorialSourceAgeDays: target.sourceAgeDays,
    fetchedAt: outcome.fetchedAt ?? null, http: outcome.status ?? null,
    sourceState: !outcome.ok ? 'unavailable' :
      outcome.fallbackUrl ? 'official-fallback-reachable-not-date-verified' : 'reachable-not-date-verified',
    fallbackSource: outcome.fallbackUrl ?? null,
    primarySourceError: outcome.primaryError ?? null,
    sourceError: outcome.error ?? null, concerns: [...new Set(errors)],
  };
}

async function boundedSourceFetch(url, fetchImpl, now, timeoutMs = 12000) {
  if (!url || !/^https:\/\//i.test(url)) return { ok: false, error: 'missing HTTPS first-party/organizer source' };
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const response = await fetchImpl(url, {
        method: 'GET', redirect: 'follow', cache: 'no-store',
        signal: AbortSignal.timeout(timeoutMs),
        headers: { 'User-Agent': 'TexasDefined-Event-Authority-SourceReview/1.0', Accept: 'text/html' },
      });
      // A page returning 200 is not sufficient to verify published dates.
      // Reject challenge and empty pages, and never accept stale redirects.
      if (response.status !== 200) {
        lastError = 'HTTP ' + response.status;
        if (![408, 429, 500, 502, 503, 504, 522, 524].includes(response.status)) break;
      } else if (response.headers.get('cf-mitigated') === 'challenge') {
        lastError = 'Challenge response';
        break;
      } else {
        const html = await response.text();
        const clean = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
          .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        if (clean.length < 100) { lastError = 'Insufficient public source text'; break; }
        return { ok: true, status: response.status, fetchedAt: now.toISOString(), attempts: attempt };
      }
    } catch (error) {
      lastError = String(error);
      if (attempt === 2) break;
    }
    if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 350));
  }
  return { ok: false, error: lastError, fetchedAt: now.toISOString() };
}


/** Preserve every overdue route/source in the actionable issue itself.
 * The editorial selector reads issues, not the separate binary run artifact.
 * Combine overlapping daily observations and full backlog records without
 * silently losing any source pair or treating reachability as fact review.
 */
export function formatEventSourceIssue(report, runUrl) {
  if (!Array.isArray(report.editorialBacklog) ||
      report.editorialBacklog.length !== report.editorialBacklogCount ||
      !Array.isArray(report.findings) || !Array.isArray(report.coverageErrors))
    throw new Error('Incomplete event source report; refuse a partial editorial queue');
  const rows = new Map();
  const add = (item, overdue) => {
    const source = item.source || 'missing';
    const key = item.path + '\t' + source;
    const row = rows.get(key) || { path: item.path, source, concerns: new Set(),
      editorialCheck: item.editorialSourceCheckedAt || 'missing', cadence: item.cadenceDays, overdue: false };
    for (const concern of item.concerns) row.concerns.add(concern);
    row.overdue ||= overdue;
    rows.set(key, row);
  };
  for (const item of report.editorialBacklog) add(item, true);
  for (const item of report.findings) add(item, false);
  const body = [
    'The GitHub event page source-monitor found official-source or editorial freshness reviews.',
    '',
    'Latest run: ' + runUrl,
    'Coverage: ' + report.coverage.permanent + ' permanent event guides, ' +
      report.coverage.collectionRoutes + ' event collection routes, ' +
      report.coverage.specialRoutes + ' separately routed holiday/event pages.',
    'Due source observations: ' + report.due + '; performed: ' + report.attempted +
      '; due-cohort concerns: ' + report.findings.length + '; **whole-inventory overdue guides: ' +
      report.editorialBacklogCount + '**; coverage errors: ' + report.coverageErrors.length + '.',
    '',
    '**Source reachability is NOT proof of confirmed dates.** Do not invent next-year dates, silently rewrite tickets, lift noindex, or update sourceCheckedAt based on a simple HTTP 200.',
    '',
    ...report.coverageErrors.map(msg => '- COVERAGE FAILURE: ' + msg),
    '**Complete combined overdue and due-source review queue (unique route/source pairs: ' + rows.size + ')**',
    ...[...rows.values()].map(row =>
      '- `' + row.path + '` — ' + [...row.concerns].join(', ') + '; source: ' + row.source +
      '; editorial check: ' + row.editorialCheck + '; review cadence: ' + row.cadence + ' day(s)'),
    '',
    'Keep this issue open until the **entire** index is editorially current and there are no unresolved due-source failures. Resolve using verified official organizer facts and protected GitHub PRs; never refresh dates based on HTTP reachability alone.',
  ].join('\n');
  // GitHub has a bounded issue body. Never truncate halfway through a source
  // or publish a partial queue as complete; the full JSON artifact is retained.
  if (Buffer.byteLength(body, 'utf8') > 60000)
    throw new Error('Complete event source issue exceeds safe GitHub body size; split queue explicitly');
  return body;
}

export async function reviewEventSources({
  root, now = new Date(), fetchImpl = fetch, outputPath = DEFAULT_REPORT,
  concurrency = 5, maxTargets = 250, timeoutMs = 12000,
} = {}) {
  const inventory = collectEventPageRefreshInventory(root);
  const coverageErrors = validateEventRefreshCoverage(inventory);
  const due = selectSourceReviewTargets(inventory, now);
  const editorialBacklog = fullEditorialFreshnessBacklog(inventory, now);
  // Every public event route receives a persistent, queryable GitHub schedule,
  // including permanent guides, stand-alone seasonal pages, collection pages
  // and special pages already governed by their own verified workflow.
  const schedule = [
    ...allEventReviewTargets(inventory, now).map(event => ({
      path: event.path, kind: event.kind, workflow: 'event-authority-source-refresh.yml',
      cadenceDays: event.cadenceDays, editorialCadenceDays: event.editorialCadenceDays,
      expeditedOverdueReview: event.expeditedOverdueReview,
      nextSourceReviewAt: event.nextSourceReviewAt,
      officialSource: event.sourceUrl, lastEditorialSourceCheck: event.sourceCheckedAt,
      annualSeasonEstimateIsNotVerifiedDate: Boolean(event.startDate &&
        (event.endDate ?? event.startDate) < asIso(now)),
    })),
    ...inventory.collections.map(event => ({
      path: event.path, kind: event.kind, workflow: event.workflow,
      cadenceDays: event.cadenceDays, nextSourceReviewAt: asIso(now),
    })),
    ...inventory.dedicated.map(event => ({
      path: event.path, kind: 'dedicated', workflow: event.workflow,
      cadenceDays: event.cadenceDays, nextSourceReviewAt: asIso(now),
    })),
  ].sort((a, b) => a.path.localeCompare(b.path));
  if (due.length > maxTargets) coverageErrors.push(
    `Due source checks exceed budget ${maxTargets}; expand the governed capacity, never silently skip pages (${due.length} due)`);
  const targets = due.length <= maxTargets ? due : [];
  const observations = Array(targets.length);
  let cursor = 0;
  const cache = new Map();
  const worker = async () => {
    while (cursor < targets.length) {
      const i = cursor++;
      const target = targets[i];
      const fetchSource = async url => {
        if (!cache.has(url)) cache.set(url, boundedSourceFetch(url, fetchImpl, now, timeoutMs));
        return cache.get(url);
      };
      const primary = await fetchSource(target.sourceUrl);
      let observed = primary;
      if (!primary.ok && OFFICIAL_EVENT_SOURCE_FALLBACKS[target.path]) {
        for (const fallbackUrl of OFFICIAL_EVENT_SOURCE_FALLBACKS[target.path]) {
          const fallback = await fetchSource(fallbackUrl);
          if (fallback.ok) {
            observed = { ...fallback, fallbackUrl, primaryError: primary.error };
            break;
          }
        }
      }
      observations[i] = evaluateSourceObservation(target, observed, now);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, targets.length) }, worker));
  const findings = observations.filter(row => row.concerns.length);
  const report = {
    version: 2, checkedAt: now.toISOString(), runId: process.env.GITHUB_RUN_ID ?? null,
    sourceCommit: process.env.GITHUB_SHA ?? null,
    policy: {
      activeOrWithin14Days: 'daily', within90Days: 'every 3 days',
      within365Days: 'weekly', completedOrDistant: 'every 30 days',
      unconfirmedAnnualSeason: 'escalate source checks at 365/90/14 days ahead without publishing projected dates',
      unannouncedSpecialPages: 'weekly',
      overdueEditorialGuides: 'expedited to at least weekly source observation until evidence-backed editorial verification',
      dynamicTicketAndTpwdEvents: 'existing daily sync-texas-events.yml',
      rollingCollections: 'existing daily verify-event-temporal-production.yml',
      horseRacing: 'existing weekly horse-racing-calendar-freshness.yml',
    },
    coverage: {
      permanent: inventory.permanent.length, collectionRoutes: inventory.collections.length,
      specialRoutes: inventory.specials.length, dedicatedRoutes: inventory.dedicated.length,
      sourceFiles: inventory.sourceFiles.length, missingSupplemental: inventory.missing.length,
      missingSources: inventory.missingSources.length, uncoveredRoutes: inventory.uncoveredRoutes,
    },
    due: due.length, attempted: observations.length, uniqueSources: cache.size,
    scheduledPages: schedule.length, schedule,
    editorialBacklogCount: editorialBacklog.length,
    editorialBacklog, coverageErrors, findings, observations,
    needsReview: coverageErrors.length > 0 || findings.length > 0 || editorialBacklog.length > 0,
    state: coverageErrors.length ? 'coverage-failed' : 'observed',
    note: 'HTTP reachability is NOT verification of dates or editorial freshness; only official evidence permits updating event pages.',
  };
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2) + '\n');
  console.log('Event authority refresh:', JSON.stringify({
    coverage: report.coverage, due: report.due, attempted: report.attempted,
    uniqueSources: report.uniqueSources, findings: findings.length,
    editorialBacklog: editorialBacklog.length,
    coverageErrors: coverageErrors.length, report: outputPath,
  }));
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, [
      '## Event authority source refresh', '',
      `- Permanent event guides: **${report.coverage.permanent}**`,
      `- Daily/rolling collections: **${report.coverage.collectionRoutes}**`,
      `- Due official-source checks: **${due.length}**; attempted **${observations.length}**`,
      `- Source concerns in due cohort: **${findings.length}**; full-inventory editorial backlog: **${editorialBacklog.length}**; coverage errors: **${coverageErrors.length}**`,
      `- Individually scheduled public event routes: **${schedule.length}**`,
      '- Unconfirmed annual-season windows affect monitoring only, never public occurrence dates.',
      '- Existing event dates and public pages were not silently altered.', '',
    ].join('\n'));
  }
  if (coverageErrors.length) throw new Error('Event route source-refresh coverage failed: ' + coverageErrors.slice(0, 8).join('; '));
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await reviewEventSources().catch(error => { console.error(error); process.exitCode = 1; });
}
