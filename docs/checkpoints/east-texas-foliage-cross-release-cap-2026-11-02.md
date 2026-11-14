# East Texas fall guide — final production release blocker: cross-release asset capacity

Checkpoint: November 2, 2026. Canonical article https://texasdefined.com/article/east-texas-fall-colors.

## Confirmed merged deliverables
- #6538 exact canonical 301 GET/HEAD (tracking, www, case, trailing slash); dedicated real Chrome post-deploy canonical verification #41490027970 passed.
- #6549 dated October Daingerfield + October Caddo Lake licensed photo evidence; no deceptive out-of-season imagery claims.
- #6551 six verified park trail summary cards, internal backlinks, correct Caddo State Park guide, map/anchor, no redundant rail.
- #6555 stale old-version JS recovery test fix merged into `main` at `f34a3a94f2e915a8f365d68491d6b43e81a7bb7c`. #6552 independently merged the MSR mobile same-document anchor test; duplicate #6553 closed.
- Authenticated owner-level Search Console URL Inspection reported canonical **Submitted and indexed**, robots allowed, successful Googlebot MOBILE fetch 2026-11-02T05:04:47Z. Tracking parameter URL was unknown to Google. Last Google crawl preceded latest edits and requires a new recrawl.

## Remaining release blocker from actual production runs
- [#41501588016](https://github.com/keeptxred/TexasDefined/actions/runs/41501588016) (Nov 2) and [#41503121919](https://github.com/keeptxred/TexasDefined/actions/runs/41503121919) (Nov 2) failed at `Verify current and previous release JS/CSS on both public origins`.
- Verifier's single fixed `combined.size > 250` guard aborted with "Cross-release asset verification cap exceeded" **before checking any assets**, despite `probe-asset-version-continuity` reporting no newly broken pages or assets and real cloud builds uploading.
- Cause: after retaining up to two source-verified old hash generations (192 assets observed), two built canary generations (~66 each) and current HTML, the total legitimate exact cohort can exceed 250.
- This PR permits a *finite* 512 unique exact-path assets **per origin**, with no sampling, no truncation, mandatory SHA integrity for previously observed files, and both direct Worker and canonical-domain requests. It rejects 513+ with explicit count and error. Unit test models 368 actual-form assets, 512 limit and 513 rejection. Do not disable old assets or treat a build as a success without downstream verification.

## Exit conditions
1. Protected required Merge Gate and auto-merge.
2. Successful production deployment run whose deployed SHA is current main descendant of both #6549/#6551 and this correction.
3. Dedicated East Texas mobile/desktop Chrome workflow passes with six licensed photographs, six internal guides, correct 301 canonical and no noindex.
4. Worker asset continuity reports full positive old+new JS/CSS responses on both public origins. If actual missing files are found, fix exact URLs and retain, don't waive checks.
5. Avoid restarting broad audits, changing football noindex protocol, Cloudflare reconnect loops, uncited live foliage meters, or masking cross-release asset 404s.

GitHub code is the checkpoint and release source of truth. No ChatGPT scheduled job added.
