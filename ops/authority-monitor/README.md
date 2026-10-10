# Centralized TexasDefined authority-source monitoring

## Scope and current coverage

This is **one scheduler** for source-based editorial maintenance. It does not replace the existing daily site-quality watchdog, entity-maintenance review queue, weekly whole-site production page crawl, or the protected publication pipeline.

The initial read-only coverage reuses existing authoritative records instead of manufacturing new facts or sources:

- **MSR Houston**: existing official karting, guest-fee, event and production-copy drift watcher (one source-dated guide plus its motorsports directory).
- **Top 25 attractions**: existing 25-record freshness validator and official/supporting-source reachability probe, once a week. This is not a content-change detector.
- **Source governance**: all six existing `AUTHORITATIVE_SOURCES` official records. Both source reachability and actual recorded human-review due dates are audited.
- **Additional pages**: the optional `ops/authority-monitor/additional-sources.json` manifest, initially empty. Monitored pages are not automatically assumed accurate just because their source responds to HTTP requests.

The existing `src/platform/entity-maintenance.ts` provides a separate structured entity review priority queue. The daily `site-quality-watchdog.yml` provides structural/editorial checks. Neither is duplicated by this new workflow.

**This first deployment does not independently fact-check every one of the thousands of TexasDefined URLs.** The architecture admits additional reviewed source-to-page mappings without new cron jobs. Claim coverage only from the per-run JSON report, not the size of the site.

## Operational schedule and costs

`.github/workflows/authority-source-monitor.yml` runs every Monday and Thursday at 14:25 UTC (9:25 a.m. daylight / 8:25 a.m. standard Central). On each run it:

1. Self-tests the registry, date and batch logic, and the MSR parser without contacting outside sites.
2. Checks MSR operating sources, live canonical page and motorsports-directory representation.
3. Checks the six existing official source-governance URLs, including recorded review deadlines.
4. On Mondays, runs the existing Top-25 editorial review-date and authoritative-source health checks. A manual `workflow_dispatch` can force these checks as well.
5. Checks at most **24 additional registered source URLs** in a deterministic rotating batch (plus the six core sources and the existing specialized monitors). Requests use limited concurrency and timeouts.
6. Writes `artifacts/authority-source-health.json`, `authority-source-health.md`, and detailed runner logs as one auditable GitHub Actions artifact with 90-day retention.
7. Opens or updates **one** central GitHub editorial-review issue if source drift or overdue editorial reviews are detected; closes a recovered issue only after a passing full-coverage run.

Only this workflow has the recurring cron for the MSR and Top-25 source-health checks. Their original workflows remain available through manual dispatch and applicable code-change self-tests. The existing site-quality and production workflows are intentionally unchanged.

## Adding a monitored authority source

Add an existing, independently checked HTTPS official source to `ops/authority-monitor/additional-sources.json`:

```json
[
  {
    "id": "example-museum-visitor-info",
    "page": "/destination/example-museum",
    "url": "https://example.org/visit",
    "reviewedAt": "2026-10-10",
    "reviewEveryDays": 90
  }
]
```

The example is **illustrative only**; never publish it as real data. Record `reviewedAt` only when an editor actually confirmed the claim against the source. Do not re-date records just because the URL responds. IDs must be unique and stable, and public source URLs must use HTTPS without credentials. Each new source is selected in a bounded batch; multiple sources may support one guide, and one source may support multiple guides.

At scale, 24 additional URLs per twice-weekly run means the total extra source registry is checked in rotating cycles. For example, 240 sources require 10 scheduled batches (approximately five weeks), not continuous checks. Increase cadence or selectively prioritize sources **based on risk and page value**, not by raising the global request budget.

## Signals, false positives and editorial control

- Reachable HTTP **does not prove factual accuracy**. A source can return HTTP 200 yet change operating hours, prices, policies or closures. Source-specific assertions like the MSR watcher are required for those facts.
- HTTP 401/403/429 can mean bot restrictions; record them as **inconclusive**, not proof the operator closed or removed a page.
- HTML changes, outdated review timestamps and missing source URLs prompt human review. A watch cannot verify reopening merely because a closure banner vanishes.
- Source-monitor scripts **never publish changes, modify page text, change dates, bypass CI gates or send emails**.
- Operator pages, source ownership, tracked citations and human review records remain the basis for any factual correction.
- The centralized issue is titled `[Authority Monitoring] TexasDefined source review needed`; it links to the exact failed run and per-run evidence.
- The 90-day workflow artifacts are ephemeral execution evidence, not a substitute for updating the authoritative editorial source registry.

## Verification and rollback

- Run `node scripts/ci/watch-authority-sources.mjs --self-test` to exercise parsing and batch selection locally, without network traffic.
- Use **Actions → TexasDefined centralized authority source health → Run workflow** for the end-to-end manual audit. A green result requires a clean official-source review state; a reported overdue review is a **correct alert**, not necessarily broken code.
- Verify Monday and Thursday cron executions separately in GitHub Actions; `workflow_dispatch` does not prove GitHub scheduled delivery.
- To revert the consolidation, restore the old schedules on the MSR and Top-25 workflows and remove the centralized schedule in one protected PR. Never run both schedules simultaneously on purpose.

## Roadmap

The next expansion should ingest additional **already-governed** source-to-page mappings and eventually summarize existing entity-maintenance priorities in the report. Do not auto-enroll random sitemap URLs as if they have verified, attributable primary sources. Preserve the separation of source health, content accuracy, performance, indexability and human editorial approval.
