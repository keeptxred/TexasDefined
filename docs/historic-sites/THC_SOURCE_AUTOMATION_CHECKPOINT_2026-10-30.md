# Texas Historical Commission source automation — verified recovery checkpoint

**Review date:** October 30, 2026  
**Owner:** TexasDefined  
**Public route:** https://texasdefined.com/texas-historic-landmarks  
**Official register:** https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places

## Completed implementation (no rebuild needed)

1. [PR #6406](https://github.com/keeptxred/TexasDefined/pull/6406) merged as `d951528d32386a1c8bda3737e59557c09e047232`: moved Rosewood Elementary from pending to **Listed October 2026**, corrected month parsing for tagged headings, and recorded official THC photograph reuse restrictions.
2. [PR #6437](https://github.com/keeptxred/TexasDefined/pull/6437) merged as `51a79e8024f8eb0deb90daef5002b74f4140c6f7`: changed Evergreen Cemetery (Austin; NPS received October 19) and Scotus College (Hebbronville; received October 13) to **submitted**, NOT listed. Added pending-stage comparisons and live watch on relevant main pushes, with successful-run-only alert closure.
3. [PR #6444](https://github.com/keeptxred/TexasDefined/pull/6444) merged as `8ef35870c1eb1c07effdf31902a8f2608e8375e5`: hardened HTML date/entity handling and preserved source-heading diagnostics.
4. [PR #6447](https://github.com/keeptxred/TexasDefined/pull/6447) merged as `6020551e8cba2943b26ce5c9007e6498eefe4707`: fixed official July heading rendered as `L isted July 2026`. The Patricia Welder/Hampton Robinson Jr. and Cindy Walker houses remain **Listed July 2026**, not August. Added regression fixtures.
5. [Source drift issue #5290](https://github.com/keeptxred/TexasDefined/issues/5290) was **automatically closed as completed October 30, 2026 at 19:54:45 UTC** by the success-only live source-watch workflow. The previously failing report [41118074493](https://github.com/keeptxred/TexasDefined/actions/runs/41118074493) documented the exact split-word defect. The corrected live watch passed before the alert was automatically closed. No additional THC source-drift issues were open at the final check.
6. The canonical [production deployment of the split-heading fix](https://github.com/keeptxred/TexasDefined/actions/runs/41119075510) reported `texasdefined-production`, `texasdefined-cloudflare`, `texasdefined-live`, `texasdefined-runtime-smoke`, and `texasdefined-validation` **success**, as returned by GitHub's commit-status API for `6020551e8cba2943b26ce5c9007e6498eefe4707`.

## Public-page production acceptance (targeted final task)

The October 30 acceptance batch updates the page's displayed research-review date from October 12 to **October 30, 2026** and adds **10 Texas Historical Commission assertions** to the existing canonical live, cache-busted production surface validator, `scripts/ci/verify-production-surfaces.mjs`. The assertions check the public page heading, Rosewood, both July properties, July month label, both correctly pending nominees, submission-not-listed disclosure, reviewed date, and visitor-access disclaimer.

**Production acceptance: VERIFIED COMPLETE.** [PR #6456](https://github.com/keeptxred/TexasDefined/pull/6456) merged as [`39cf9824e18649fc93f8ccb17e8fc74268ea91ca`](https://github.com/keeptxred/TexasDefined/commit/39cf9824e18649fc93f8ccb17e8fc74268ea91ca). Its own canonical [production deployment run 41125879072](https://github.com/keeptxred/TexasDefined/actions/runs/41125879072) reports **`Verify base production surfaces: success`**, including the new live, cache-busted THC checks, plus **`texasdefined-live=success`** and **`texasdefined-production=success`** on that exact commit (GitHub commit-status API). Validation, build, runtime smoke, and Cloudflare deployment statuses also passed. This is post-merge, post-deployment acceptance evidence, **not** a cached search snippet or an earlier release's status.

## Existing unattended workflows retained

- [THC National Register source verification](../../.github/workflows/thc-landmark-watch.yml): **weekly Monday**, manually dispatchable, and relevant main-branch push checks; preserves JSON source comparisons, creates/comments on drift issues on failure and closes the exact alert only on a clean live comparison.
- [THC Atlas statewide census](../../.github/workflows/thc-atlas-census.yml): **monthly first-of-month** public GIS layer comparison and evidence artifacts; no automatic new site publication.
- The canonical [Deploy TexasDefined production](../../.github/workflows/deploy-production.yml) remains the **only** permitted publishing workflow. No extra Cloudflare connections or direct deploys are required.

## Ongoing guardrails

- **Never treat National Register designation as public admission**, permission to enter private properties, or authorization to reuse THC-owned photographs. Consult [image provenance](IMAGE_PROVENANCE.md) for THC Photo Request rules.
- Cayo del Oso is marked **Determined Eligible — Owner Objection**, not an ordinary listed or public-tour attraction; do not publish sensitive archaeological coordinates.
- Do not duplicate historical attraction pages or broad audits; keep automated factual refreshes and source comparison separate.
- **All originally outstanding THC remediation and public-page acceptance tasks are complete** as of the verified October 30 production run above; continue to rely on automated source drift detection for future changes. This does not waive future visitability or image-rights research.
