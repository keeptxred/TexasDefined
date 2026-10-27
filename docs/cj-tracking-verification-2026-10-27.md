# One-time CJ tracking verification — 2026-10-27

The connected CJ session showed 16 active advertiser relationships. Every Get Code review used **TexasDefined.com PID 101876465**, rather than account CID 8062457. Advertiser IDs and link AIDs are distinct. Account-generated network hosts can rotate; the recorded bases below are actual Get Code outputs, not synthesized advertiser URLs.

No CJ redirect was requested, no test purchase or service request was submitted, and no commission or network-recorded click is claimed. Destinations were compared with CJ creative/Get Code data. First-party production verification inspects hrefs and static assets only.

| Active advertiser | Advertiser ID | Source use / decision |
|---|---|---|
| Abracadabra NYC | 7889430 | 11 governed dormant destination records; no live href. |
| Aiper | 6404897 | No source placement; Get Code 15736575 verified without activation. |
| Angi | 7439025 | All 26 existing service destinations matched to service-specific CJ creatives. |
| Booking.com APAC | 7854081 | Existing U.S. car-rental card; Cars creative 17289008. |
| Booking.com Australia | 7864353 | No source placement; independent Cars creative 17304773 verified without switching APAC placements. |
| CheapTickets | 4861279 | No source placement; Get Code 15735979 verified without activation. |
| CityPASS | 2805705 | Existing direct editorial fallback retained; CJ 15733674 verified; disabled Impact links remain disabled. |
| Discount School Supply | 2362700 | No source placement; Get Code 15733428 verified without substitution. |
| GearUP | 7804601 | Existing eight catalog links verified; only two existing latency guides remain monetized. |
| Hotels.com | 1702763 | Existing lodging surfaces; Evergreen 15734399. |
| Motel6 | 7624468 | Existing standard 17198227 and bounded Halloween 17371482. |
| Orbitz | 4861280 | Existing hotel-first comparison; Evergreen 15734579. |
| Rexing | 5357356 | 15 governed dormant destination records; no live href. |
| RVShare | 5126501 | Existing RV-intent and football surfaces; Evergreen 15734916. |
| Travelocity | 1549809 | Existing broader lodging comparison; deep-link creative 15230459. |
| Vrbo | 2691607 | Existing traveler 10697641 and distinct owner 10697642. |

**Blocked: Really Good Stuff (7552520).** CJ reports “Expired 1-Oct-2026” and offers a manually reviewed new application. No application or agreement was submitted. The existing school-supply content remains with an ordinary retailer link and explicit non-affiliate disclosure; expired click 17106455 is rejected by source governance. Discount School Supply was not substituted.

The adjacent JSON is the exhaustive audit inventory: 16 active relationships; captured creative/base/destination/SID evidence; all active builder entries; source references; Hotels.com destination strings; and 26 dormant Rexing/Abracadabra records. Dormant catalogs and unused advertisers were not activated.

## Rollout and verification

PR #6080 migrated Hotels.com; merge `288ca1afe49ce7561589d343a5896c751f884cd0` published via the existing deployment workflow. Its production run 40543820644 reported failed acceptance because football verifiers still required generic DLG URLs. The account rollout corrects those contracts to exact URLs, preserves relationship/disclosure/eligibility and content checks, and keeps manual browser baseline exceptions limited to the exactly known previous RVshare URL before a PR deploys.

The account rollout adds a canonical deterministic account-link test and a bounded first-party production verifier inside the existing `texasdefined-production` lock, gated by changed affiliate sources. The verifier records evidence in `.artifacts/cj-account-production.json`; no alternative publisher, purge, Cloudflare Browser Rendering, new credentials or permissions were introduced. Local Windows canonical execution is recorded separately; GitHub Linux protected validation is required before merge.
