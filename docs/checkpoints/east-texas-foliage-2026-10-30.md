# East Texas fall colors — targeted authority checkpoint (2026-10-30)

Public page: https://texasdefined.com/article/east-texas-fall-colors
Repository: keeptxred/TexasDefined
Branch: fix/east-texas-foliage-authority-20261030

## Verified starting state
- Live page still showed a redundant "Places connected to this story" rail containing the nearby town "Uncertain" above a lone Caddo Lake card, despite an existing six-park comparison section.
- Long-form text printed raw TPWD URLs; FAQ question headings rendered at the same level as the FAQ section.
- Already shipped and preserved: six-park comparison cards, interactive OpenStreetMap route and selections, driving-direction links, seven dated and attributed gallery photos including a historically dated autumn Daingerfield hero, source/rights checks and post-deploy browser QA.
- Existing GitHub automation: `.github/workflows/verify-east-texas-foliage-browser.yml` scheduled daily October–November (cron 17 13 * 10-11 *), with deploy-triggered scoped Chrome QA; `.github/workflows/verify-seasonal-production.yml` scheduled weekly Mondays. These are **technical freshness/availability checks**, not current color observation feeds.

## Implemented on branch, subject to protected PR checks and deployment
1. `src/data/fixtures/seasonal-intent-depth-blocks.ts`: links to official TPWD park details with contextual link labels, removed the distracting "Uncertain" explanatory sentence, added source-verified 2.4-mile Rustling Leaves and 0.8-mile Mountain View trail options at Daingerfield and the Whispering Pines trail option at Tyler, retained conservative historical versus current-color distinctions.
2. `src/components/editorial/ArticleBody.tsx`: renders only the East Texas guide's explicitly authored TPWD Markdown links as accessible real anchors; nests its FAQ question headings as h3, leaving other article behavior unchanged.
3. `src/routes/article.$slug.tsx`: suppresses the redundant generic destination rail only for this page; preserves dedicated six-park cards, routes, maps and gallery. Reduces repeated planning caveats in card introduction.
4. `src/data/fixtures/seasonal-intent-articles.ts`: marks the factual October 30 edit date.
5. `scripts/data/validate-seasonal-intent-depth.mjs`: adds static regression assertions for eight linked TPWD references, trails, removed rail, FAQ structure, no fabricated live foliage reports, and preserved Chrome QA/schedule.
6. `scripts/ci/verify-east-texas-foliage-browser.mjs`: extends the existing dual-viewport Chrome acceptance with six canonical cards, no stray destination rail, six official TPWD link targets, Daingerfield trail details and FAQ h3 hierarchy; retains map, routes, gallery and image-license tests.
7. `.github/workflows/verify-east-texas-foliage-browser.yml`: adds specific content/renderer paths to deploy-triggered QA scope. PRs altering the unreleased page content **skip production-based browser assertions** to avoid testing new features against the old site; the post-deploy workflow and already-existing daily Oct-Nov schedule verify actual live content.

## Boundaries and outstanding verification
- PR [#6436](https://github.com/keeptxred/TexasDefined/pull/6436) is open with protected auto-merge enabled. At the latest inspection, required workflow runs were queued; no merged or deployed result was established. **Do not poll in a loop**; CI/auto-merge can progress independently. A subsequent continuation should check PR state once and then verify deployed origin via existing bounded QA.
- Merge, protected test results, production deployment and fresh live-page verification must be checked from GitHub and direct production; do not mark deployed based only on branch commits.
- Gallery still contains correctly labeled spring/summer and historical October images. There is no license-verified autumn photograph for every featured park in this batch. Do not invent image dates, use unlicensed TPWD photographs, or present historical pictures as current.
- This article does **not** offer a genuine live park-by-park color meter. TPWD's Fall for Parks page offers evergreen destinations, whereas its dated 2026 weekly foliage report found publicly is for **Lost Maples**, not these six East Texas parks. Do not generate a fake automated "peak now" status from seasonality models or undated media. Daily live-browser QA and weekly seasonal-route checks continue without a manual audit, but do not claim they amount to a live foliage data feed.
- If needed, add independently dated, officially published East Texas foliage observations only if an attributable, reliably maintained per-park public feed becomes available; no manual seasonal verification step.
- Avoid Cloudflare OAuth reconnects, unbounded polling, duplicate workflows or another broad audit.
