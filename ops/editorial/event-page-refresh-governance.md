# TexasDefined — every event page on GitHub refresh governance

Status: code-managed, scheduled and source-backed. No manual seasonal audit is required to enumerate pages.

## Scope and ownership

All public event surfaces are assigned a GitHub-owned refresh/review cadence. A successful HTTP request alone is **not** a verified new event date.

| Page type | Refresh / review interval | Existing or new GitHub workflow |
| --- | --- | --- |
| Ticketmaster events, TPWD visitor activities, statewide upcoming calendar, homepage event cards | Daily, 11:17 UTC | `sync-texas-events.yml` — source sync; protected refresh PR when records change |
| Current weekend/month/season/region event collection pages, temporary indexability, expired occurrences | Daily, 11:23 UTC | `verify-event-temporal-production.yml`; runtime collection selection updates from current source-backed records |
| Permanent `/event/:slug` authority guides, including all index records and supplemental tranches | Every day for active or within 14 days; every 3 days when 15–90 days away; every 7 days when 91–365 days away; every 30 days when distant or past; 7 days for the first 30 days after completion | **`event-authority-source-refresh.yml`**, daily 13:07 UTC, deterministic per-page slots |
| Separately routed State Fair and holiday status pages | Weekly while awaiting official future announcements | New permanent guide source monitor |
| Mardi Gras public festival guides and November official organizer events | Daily before and during their edition | `sync-texas-events.yml` includes separate official-source safety monitors |
| Palestine Polar Express | Weekly in season; monthly in the offseason | `refresh-palestine-polar-express.yml` |
| Horse-racing calendars and racetrack event pages | Weekly | `horse-racing-calendar-freshness.yml` |
| Temporary Ticketmaster links / editorial purchase URLs | Daily rotating bounded partner cohorts | `sync-texas-events.yml` |
| Event schema lifecycle and source eligibility | Protected PR checks and established event CI validators | `validate-event-occurrence-lifecycle.yml`, protected Merge Gate and event quality validators |

The GitHub source monitor enumerates **all registered permanent event pages from the TypeScript files**, including new tranches, plus every event collection and explicitly routed event page. New event routes without a coverage assignment fail the gate. No static list of a handful of popular pages is treated as complete coverage.

## What a scheduled check does

1. Rebuild the full route inventory from the repository on each run.
2. Assign each permanent event to a deterministic source-check slot based on its actual confirmed dates. Completed editions stay on a 30-day next-announcement watch; old year-specific dates are not rolled forward.
3. Fetch the official organizer source for due pages with bounded requests and preserve a GitHub Actions evidence artifact with HTTP status, source URL, cadence, editorial `sourceCheckedAt` and concerns.
4. Keep one live GitHub issue for overdue or inaccessible sources. Close it when evidence recovers. Protected event refresh PRs are the only authorized publication path.
5. Leave published dates, hours, prices, tickets, photos and indexing eligibility unchanged when the official evidence does not support a safe change. Keep event pages historical/unannounced rather than publishing guessed future occurrences.

## Important distinction

The daily sync **automatically refreshes the machine-readable event catalog** when its first-party sources provide verifiable records. Permanent guide prose and dated visitor facts require official evidence; the permanent guide monitor is an **automatic review/incident-creation system**, not an AI editor that pretends an HTTP 200 is an editorial update.

A page is never marked newly verified solely because a scheduled source fetched successfully. GitHub's source-review issue is the checkpoint for needed content edits; the run artifact is the audit trail. Source errors must not disappear from reports or change indexability.

## Cost / safety

- One additional daily GitHub Actions workflow; no GPT reminders, paid crawl service or Cloudflare OAuth reconnects.
- At most 250 due page records per run, five parallel fetches, bounded timeouts; a capacity breach fails rather than silently skipping pages.
- Dynamic collection feeds and prior specialist schedules are reused, not rebuilt.
- Automated source discoveries do not grant date, ticket, image, or Google schema eligibility.
