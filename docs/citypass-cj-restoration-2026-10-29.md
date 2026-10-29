# CityPASS CJ tracking restoration — 2026-10-29

## Confirmed source evidence

CityPASS Tourism Sales and Support supplied account-specific CJ creative link IDs by email on October 29, 2026. The publisher opened each creative's **Get Code → Click URL** screen in CJ with **TexasDefined.com / publisher 101876465** selected and confirmed all three exact links:

| Market | CJ link ID | Account-issued tracking URL | CityPASS destination displayed in CJ |
| --- | --- | --- | --- |
| Dallas | 12186930 | https://www.dpbolvw.net/click-101876465-12186930 | https://www.citypass.com/dallas |
| Houston | 17329800 | https://www.jdoqocy.com/click-101876465-17329800 | https://www.citypass.com/houston |
| San Antonio | 17329806 | https://www.dpbolvw.net/click-101876465-17329806 | https://www.citypass.com/san-antonio |

These are the exact account-generated Click URLs, **not** guessed URLs made by combining an affiliate ID with a creative ID. Different CJ network domains are normal; do not replace Houston's `jdoqocy.com` host with another network host.

## Production implementation

- `src/data/citypass.ts`: change only the three affiliate URLs and activate the existing centrally governed switch. Preserve official direct links as the conditional non-affiliate fallback.
- `src/components/monetization/CityPassCalloutContent.tsx`: no rewrite needed; the existing switch chooses tracked URL, affiliate click analytics, `rel="sponsored nofollow noopener noreferrer"`, and the truthful commission disclosure.
- `scripts/data/validate-citypass-affiliate.mjs`: require all three new CJ links, activation, no broken legacy `7eer` links, and retain destination/page coverage.
- `scripts/data/validate-experience-affiliate-analytics.mjs`: require the reactivated program and preserve conditional attribution/fallback safety. Preserve Viator separation.
- `src/routes/guides.citypass-texas.lazy.tsx`: already schedules San Antonio's announced adult $67/child $57 prices and updated maximum savings for November 2, 2026; do not prematurely switch the currently shown rates.
- Scope extends automatically to the three city guides, eligible destination profiles, and AT&T Stadium through the existing single shared CityPASS component.

## Verification and limitations

The three CJ creative/destination mappings were verified in account-generated Get Code screenshots. **The subsequent first-party 11-city production browser audit DID independently confirm all three live tracked links and their redirects at HTTP 200**, on the exact CityPASS release SHA `1f0790679d7cce257fcd35714f85fed8a8b98771`:

| Live source page | Exact outbound Click URL in rendered page | Observed final destination | Response | Observed CJ publisher attribution |
| --- | --- | --- | --- | --- |
| `/city/dallas` | `https://www.dpbolvw.net/click-101876465-12186930` | `https://www.citypass.com/dallas` | 200 | `PUB=TexasDefined`, `PID=101876465`, `cjevent` |
| `/city/houston` | `https://www.jdoqocy.com/click-101876465-17329800` | `https://www.citypass.com/houston` | 200 | `PUB=TexasDefined`, `PID=101876465`, `cjevent` |
| `/city/san-antonio` | `https://www.dpbolvw.net/click-101876465-17329806` | `https://www.citypass.com/san-antonio` | 200 | `PUB=TexasDefined`, `PID=101876465`, `cjevent` |

**Verifiable evidence:** [GitHub Actions 11-city audit run 40960365891](https://github.com/keeptxred/TexasDefined/actions/runs/40960365891), success; artifact `city-authority-a11y-and-links` (artifact ID `12936216683`), `independent-review.json`, `linkTargets`. Captured `2026-10-29T21:49:52Z` (case execution extended through approximately `21:52Z`). The audit recorded **33 rendered city/viewport cases, 0 automated axe violations, 329 inspected links and 43 unconfirmed links**; the three CityPASS redirects specifically were **confirmed** and not among the unconfirmed cases. A green audit status does not certify unrelated links or full WCAG compliance.

**Limit:** These observed `cjevent` parameters confirm CJ's click redirect tagging on the three destination pages; they do **not** prove a completed purchase, a payable commission, or appearance of click/conversion reporting in the CJ dashboard. Automated verification clicks may themselves appear in click reporting; do not interpret them as customer demand. Avoid repeated synthetic tracked-link requests. If a future real-world 404 or wrong-city redirect is confirmed, restore `CITYPASS_AFFILIATE_LINKS_ENABLED = false` while keeping the official non-affiliate fallbacks.

This change must be merged only after protected checks and a current-main concurrency review; verify the exact deployment SHA. No direct CJ account modifications or test purchases are required.
