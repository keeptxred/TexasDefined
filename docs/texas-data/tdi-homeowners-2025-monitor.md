# Texas homeowners 2025 data: recurring TDI source monitor

**Status (October 10, 2026):** Live in shared Supabase project `ftkznprjljkhymknvhye`. The scheduled monitor is not a website publishing job and does not spend site-builder AI credits.

## Scope and provenance

The protected research page is [Texas homeowners premiums vs. coverage](https://texasdefined.com/texas-data/research/texas-homeowners-premiums-vs-coverage). The primary source is the [Texas Department of Insurance homeowners market overview](https://www.tdi.texas.gov/general/texas-homeowners-insurance-market-overview.html).

The monitor pins **2025 average annual homeowners premium = $3,489** and **2025 average coverage = $432,800**. It compares both published chart values and 2025-specific preliminary signals. A changed number is not automatically a finalized number; a removed “preliminary” label triggers **review**, not automatic publication. Preserve TDI's policy-type definition and do not confuse premiums with rates.

This monitor stores evidence in `private.tdi_homeowners_2025_checks` with a row for each source request, status, parsed values, 2025 preliminary signals, attention flag and diagnostic. No visitor-facing data or public REST permissions are needed.

## Deployed schedule (pg_cron, UTC)

- `texasdefined-tdi-homeowners-2025-fetch-weekly`: `2 12 * * 1` — source fetch Mondays 12:02 UTC
- `texasdefined-tdi-homeowners-2025-process-hourly`: `12 * * * *` — process asynchronous pg_net results hourly

The source is fetched once per week; hourly processing handles late results and timeouts. The parser supports **2026 or later years appended after 2025** to the charts and checks that “preliminary” belongs specifically to **2025**, not the newer year's chart. A separate ChatGPT scheduled condition task, **TDI 2025 Data Watch**, looks for source changes and monitoring failures. User delivery depends on the account's notification settings.

**Recovery SQL:** [tdi-homeowners-2025-monitor.sql](./tdi-homeowners-2025-monitor.sql) contains the live function definitions, private schema safeguards and two schedule definitions. This is a recovery snapshot, **not a pending production migration**. Do not blindly reapply it or use it in the website's runtime.

## Operational checks

Run these via the Supabase SQL connection for the shared project:

```sql
select id,requested_at,checked_at,http_status,average_premium_usd,
       average_coverage_usd,image_premium_preliminary,image_coverage_preliminary,
       page_2025_preliminary,outcome,attention_needed,details
from private.tdi_homeowners_2025_checks
order by id desc limit 20;

select jobid,jobname,schedule,active
from cron.job
where jobname like 'texasdefined-tdi-homeowners-2025-%'
order by jobid;

select d.start_time,d.status,d.return_message,j.jobname
from cron.job_run_details d
join cron.job j on j.jobid=d.jobid
where j.jobname like 'texasdefined-tdi-homeowners-2025-%'
order by d.start_time desc limit 20;
```

To recheck manually (do not poll aggressively), execute `select private.tdi_homeowners_2025_fetch();`. Wait for the asynchronous HTTP response to land and then execute `select private.tdi_homeowners_2025_process();`. Confirm the **newest** row is complete. A historical `fetch_error` that was followed by an HTTP 200 success does not indicate a continuing outage.

### Outcomes and remediation

| Outcome | Meaning | Action |
| --- | --- | --- |
| `still_preliminary` | Source still matches $3,489 / $432,800 and 2025-specific provisional signals | No content change |
| `changed_data` | One or both 2025 TDI values changed | Independently verify updated primary data; review the research table, calculations and CSV |
| `final_review` | A 2025-specific preliminary indicator changed/disappeared | Verify **explicit finality** against primary source or TDI documentation; do not infer it solely from a filename |
| `parse_error` | TDI page, chart description, or HTML structure changed | Inspect the new primary-source format; improve and test extraction, do not invent values |
| `fetch_error` | Source was unreachable or HTTP non-200, or pg_net response timed out | Recheck via standard fetch and investigate if consecutive failures persist |
| `pending` | Asynchronous fetch is not yet processed | Wait for the hourly processing pass |

### Source-change publication procedure

1. Confirm revised/final 2025 numbers directly from authoritative TDI material, not merely from an automated signal.
2. Compare with `src/data/research-homeowners-premiums.json` and `public/texas-data/research/texas-homeowners-premiums-vs-coverage.csv`. Investigate all historical numbers if the data vintage/definition changes.
3. Update source-verified data, derived calculations, methodology, `2025 preliminary` disclosure, “last verified” date and any necessary visual/structured-data labels together. Do not relabel a preliminary vintage as final prematurely.
4. Submit a scoped PR; pass the research validator, required CI, source calculations, mobile/desktop browser QA and CSV download test. Preserve unrelated concurrent work and normal branch protections.
5. Verify protected deployment to the canonical page, record the exact TDI evidence and acceptance in PR notes, then decide whether to retire the 2025 watch or adjust it for later vintages.

### Verification history

- October 10, 2026: verified the published TDI chart alt text contains **2025 $3,489** and **2025 $432,800**.
- First custom user-agent test returned a transient HTTP 500; removing the custom header restored official-source HTTP 200.
- Live SQL parser successfully processed the source and recorded `outcome=still_preliminary` with three correct 2025 preliminary signals.
- Forward-compatibility fix tested against an artificial 2026-appended chart and then installed in the private processing function. Re-ran against actual official TDI HTML: HTTP 200, same figures, no attention flag.
- The `private` schema and table have no `anon`/`authenticated` data access. A no-policy RLS advisory is intentional for this internal audit-only table.
