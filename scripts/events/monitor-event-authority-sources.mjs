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
  dueForReview, refreshCadenceDays,
} from './event-page-refresh-governance.mjs';

export const DEFAULT_REPORT = '.artifacts/event-authority-source-refresh.json';
const dayMs = 86400000;
const dayNumber = date => Math.floor(Date.parse(date.slice(0, 10) + 'T00:00:00Z') / dayMs);
const asIso = date => date.toISOString().slice(0, 10);

export function selectSourceReviewTargets(inventory, asOf = new Date()) {
  return [...inventory.permanent, ...inventory.specials].filter(event => dueForReview(event, asOf))
    .map(event => ({
      ...event, cadenceDays: refreshCadenceDays(event, asOf),
      sourceAgeDays: event.sourceCheckedAt && /^\d{4}-\d{2}-\d{2}$/.test(event.sourceCheckedAt)
        ? dayNumber(asIso(asOf)) - dayNumber(event.sourceCheckedAt)
        : null,
    })).sort((a, b) => a.path.localeCompare(b.path));
}

export function evaluateSourceObservation(target, outcome, asOf = new Date()) {
  const errors = [];
  if (!outcome.ok) errors.push('organizer-source-unavailable');
  // A page GET is only a source observation. It does not confirm a new
  // occurrence, ticket availability, cancellation status or a date change.
  if (target.sourceAgeDays == null) {
    if (target.kind === 'permanent') errors.push('missing-editorial-source-check-date');
  } else if (target.sourceAgeDays > Math.max(7, target.cadenceDays * 3)) {
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
    editorialSourceCheckedAt: target.sourceCheckedAt, editorialSourceAgeDays: target.sourceAgeDays,
    fetchedAt: outcome.fetchedAt ?? null, http: outcome.status ?? null, sourceState: outcome.ok ? 'reachable-not-date-verified' : 'unavailable',
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

export async function reviewEventSources({
  root, now = new Date(), fetchImpl = fetch, outputPath = DEFAULT_REPORT,
  concurrency = 5, maxTargets = 250, timeoutMs = 12000,
} = {}) {
  const inventory = collectEventPageRefreshInventory(root);
  const coverageErrors = validateEventRefreshCoverage(inventory);
  const due = selectSourceReviewTargets(inventory, now);
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
      if (!cache.has(target.sourceUrl)) {
        cache.set(target.sourceUrl, boundedSourceFetch(target.sourceUrl, fetchImpl, now, timeoutMs));
      }
      observations[i] = evaluateSourceObservation(target, await cache.get(target.sourceUrl), now);
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, targets.length) }, worker));
  const findings = observations.filter(row => row.concerns.length);
  const report = {
    version: 1, checkedAt: now.toISOString(), runId: process.env.GITHUB_RUN_ID ?? null,
    sourceCommit: process.env.GITHUB_SHA ?? null,
    policy: {
      activeOrWithin14Days: 'daily', within90Days: 'every 3 days',
      within365Days: 'weekly', completedOrDistant: 'every 30 days',
      unannouncedSpecialPages: 'weekly',
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
    coverageErrors, findings, observations,
    needsReview: coverageErrors.length > 0 || findings.length > 0,
    state: coverageErrors.length ? 'coverage-failed' : 'observed',
    note: 'HTTP reachability is NOT verification of dates or editorial freshness; only official evidence permits updating event pages.',
  };
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(report, null, 2) + '\n');
  console.log('Event authority refresh:', JSON.stringify({
    coverage: report.coverage, due: report.due, attempted: report.attempted,
    uniqueSources: report.uniqueSources, findings: findings.length,
    coverageErrors: coverageErrors.length, report: outputPath,
  }));
  if (process.env.GITHUB_STEP_SUMMARY) {
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, [
      '## Event authority source refresh', '',
      `- Permanent event guides: **${report.coverage.permanent}**`,
      `- Daily/rolling collections: **${report.coverage.collectionRoutes}**`,
      `- Due official-source checks: **${due.length}**; attempted **${observations.length}**`,
      `- Source/editorial concerns: **${findings.length}**; coverage errors: **${coverageErrors.length}**`,
      '- Existing event dates and public pages were not silently altered.', '',
    ].join('\n'));
  }
  if (coverageErrors.length) throw new Error('Event route source-refresh coverage failed: ' + coverageErrors.slice(0, 8).join('; '));
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await reviewEventSources().catch(error => { console.error(error); process.exitCode = 1; });
}
