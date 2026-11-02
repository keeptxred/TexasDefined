# Narrow MSR mobile anchor acceptance correction — Nov 2, 2026

## Root evidence
Production deployment [#41497545976](https://github.com/keeptxred/TexasDefined/actions/runs/41497545976) **failed after successfully deploying its Worker** because the MSR Houston mobile Chrome acceptance `page.waitForURL` timed out waiting for `load` following a same-document `#msr-logistics` anchor click. Desktop passed. URL content, licensed imagery, hotel links, venue phone, canonical and park freshness checks passed.

The test's intent is to observe the target URL hash, but Playwright's `waitForURL` default waits for full load, which is not a safe requirement for a hash-only navigation on mobile. This is a test timeout, not proof the page anchor is broken.

## Scoped correction
Switch only the wait to `page.waitForFunction` inspecting `window.location.pathname` and `window.location.hash` with a bounded 20-second timeout. Retain the click, post-settle hash assertion, destination existence, mobile and desktop screenshots, image licensing, overflow, table keyboard accessibility, hotels, and all other security/SEO checks. Does not add `continue-on-error`, skip the test, increase site JS bundle or touch unrelated routes.

## Release gate
Protected merge gate then fresh successful descendant production deploy and existing browser proof. This change unblocks the fall foliage visual/source PRs [#6549](https://github.com/keeptxred/TexasDefined/pull/6549) and [#6551](https://github.com/keeptxred/TexasDefined/pull/6551) while preserving genuine visitor regression detection. Neither photo nor navigation PR can be called production certified on the failed #41497545976 alone.
