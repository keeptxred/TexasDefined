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

The three CJ creative/destination mappings were verified in account-generated Get Code screenshots. **A successful end-to-end CJ redirect and an attributed commission are NOT yet independently verified.** A network check from the execution container could not resolve the affiliate network host, and a public web fetch was unavailable; neither result proves a broken link. Inspect CI, the exact live production `href` values, and test market-specific redirect behavior in a supported browser before claiming full live-link acceptance. If confirmed 404 or wrong-city redirects recur, restore `CITYPASS_AFFILIATE_LINKS_ENABLED = false` while keeping the official fallback URLs.

This change must be merged only after protected checks and a current-main concurrency review; verify the exact deployment SHA. No direct CJ account modifications or test purchases are required.
