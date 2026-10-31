# TexasDefined: Googlebot crawl evidence — October 28–30, 2026

## Preservation status (2026-10-30, America/Chicago)

**Partial archive only.** This forensic branch was created to avoid changing protected `main` or triggering a production deployment. Worker request logs were enabled with head sampling rate 1 and persisted when inspected.

- `googlebot-2026-10-28.json` was written on this branch at commit `f1d14736e841da8f003c29a2146c6fdb2b776f29`. **DO NOT TREAT THIS FILE AS A COMPLETE DAY EXPORT.** It contains 63 serialized request rows, while its six 4-hour segment diagnostics report a combined 920 matches. The connector truncated its returned payload. Its logged entries remain evidence, but its completeness flag must be `false`.
- Additional Cloudflare reads were blocked by the connected tool's safety checks during the full-preservation retry. **No complete October 28, 29, or 30 log archive has been verified.**
- All times below are Central Daylight Time (UTC−05:00), unless otherwise labeled. Original request timestamps were in UTC.

## Verified Googlebot activity around the suspected event

Cloudflare Worker Observability `cloudflare-workers` dataset, Worker `texasdefined-site`; filter for user agent containing `Googlebot` AND Google network ASN **15169**; Cloudflare classified these as `Search Engine Crawler`.

October 29, 2026:
| Local time | URL path | HTTP status | Worker version |
|---|---|---|---|
| 12:01:33 | /property-tax/taxing-unit/little-elm-isd | 200 | aee56cff-5b3c-479c-9095-c0c8e2ad15e6 |
| 12:06:31 | /property-tax/taxing-unit/deport | 200 | 20f339fa-d0b9-4ead-a892-5805a2ee3255 |
| 12:17:27 | /property-tax/taxing-unit/fair-oaks-ranch | 200 | 4b185fed-9541-4869-b501-f2055cfbef11 |
| 12:18:30 | /property-tax/taxing-unit/s-e-leon-county-esd-1 | 200 | 4b185fed-9541-4869-b501-f2055cfbef11 |

For the four-hour comparison window 11 a.m.–3 p.m. local (16:00–20:00 UTC):
- October 28: 155 Googlebot/ASN15169 Worker-log events, status 200=119, 301=1, 307=17, 404=18.
- October 29: 63 Googlebot/ASN15169 Worker-log events, status 200=41, 301=2, 307=4, 404=16.
- October 30: 56 Googlebot/ASN15169 Worker-log events, status 200=24, 307=3, 404=29.

**Caution:** These are counts of matched Worker-log events, not verified unique crawls or total Google crawl statistics. A request may yield more than one recorded event, edge-cached requests may not hit the Worker, and `User-Agent` alone is spoofable. ASN15169 plus Cloudflare classification provides stronger identification.

## Missing assets witnessed by Googlebot on October 29

| Local time | Requested path (HTTP 404) | Same-site referrer |
|---|---|---|
| 12:49:46 | /assets/Container-Cz1cjZOJ.js | /property-tax/taxing-unit/ennis-isd |
| 12:49:46 | /assets/main-LkbE9wUL.js | /property-tax/taxing-unit/ennis-isd |
| 12:49:48 | /assets/property-tax.taxing-unit._unit-CGuzIffC.js | /property-tax/taxing-unit/ennis-isd |
| 1:25:44 | /assets/property-tax.taxing-unit._unit-BTzZltsP.js | /property-tax/taxing-unit/yoakum-hospital-district |
| 1:26:05 | /assets/Header-BsOq5IkK.js | /property-tax/taxing-unit/yoakum-hospital-district |
| 1:26:05 | /assets/x-B-Mn3p2l.js | /property-tax/taxing-unit/yoakum-hospital-district |
| 1:26:06 | /assets/REDACTED.js | /assets/main-C03kdA8T.js |

These 404 events were served by Worker version `913cb461-5d82-49a0-addc-d8a0c78961cf`. On October 28 there were also 404 asset responses to Googlebot, so the pattern predates noon October 29. Some path entries were already redacted by the connector.

## Deployment context

Cloudflare Worker deployments during October 29, 10 a.m.–4 p.m. Central: 26. Examples:
- 11:56:46 (UTC 16:56:46): version `aee56cff-5b3c-479c-9095-c0c8e2ad15e6`
- 12:04:24 (UTC 17:04:24): `20f339fa-d0b9-4ead-a892-5805a2ee3255`
- 12:11:11 (UTC 17:11:11): `4b185fed-9541-4869-b501-f2055cfbef11`
- 12:45:05 (UTC 17:45:05): `913cb461-5d82-49a0-addc-d8a0c78961cf`

The deployment list had 764 results in the requested date range, with 100 returned in its first page; no full historical deployment inventory has been archived here.

## Server error check

October 29 11 a.m.–3 p.m. local: 12 recorded Worker responses with status >=500, comprising Viator production probe 503s at `/api/viator/market/houston/products` and unrelated requests to `/.well-known/acme-challenge/...` with 500. No matched Googlebot request in the inspected four-hour Googlebot set had a 5xx response. These counts do not establish whole-site availability or ranking causation.

## Investigation follow-up

1. Recover any remaining historical Worker logs while retention allows. Query in <=2-hour intervals to avoid response truncation. Assert serialized row count equals each segment's reported event count. Preserve only fields needed for forensics; exclude IPs, cookies, authorization, URL query values, external referrers, and other sensitive data before publishing in this **public repository**.
2. Compare HTML asset references and deployed bundles for the affected tax-unit pages (especially Ennis ISD, Yoakum Hospital District); check historical build asset retention and cache behavior.
3. Correlate deployment version IDs with GitHub commits and identify whether older HTML or cached content referred to removed asset hashes.
4. Cross-check Google Search Console Crawl Stats (response categories, dates and examples). This log evidence cannot reveal Google ranking-decision time.
5. Do **not** infer that these missing assets caused the observed impressions/ranking decline without corroborating evidence.

Evidence source: authenticated Cloudflare API queries performed 2026-10-30/31 UTC. This document is a preservation checkpoint, **not a root-cause finding**.
