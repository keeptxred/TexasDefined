# TexasDefined Women’s Softball — Authority-First Publishing Standard
**Effective:** October 11, 2026  
**Owner:** TexasDefined sole administrator  
**Scope:** individual UIL girls’ softball team profiles proposed after the 2026–27 alignment directory

**Superseding site-wide owner decision, October 20, 2026:** [Formal editor/owner sign-off is OPTIONAL across all TexasDefined pages](../editorial/SITEWIDE_PUBLICATION_VERIFICATION_POLICY.md), including softball. Publishing still requires the complete school-specific factual/source, image-rights, privacy, tests and production requirements below; an absent human approval or nine-dimension form cannot by itself block a sourced, technically passing page.

## Nonnegotiable decision

**The 1,192 UIL school/district listings do not authorize 1,192 individual pages.** They are the correct sport-specific discovery dataset, not verified rosters, team histories or permission to duplicate a page template. The searchable directory at `/sports/softball/schools` remains useful and canonical regardless of how many individual teams earn an authority profile.

Publishing fewer genuinely authoritative pages is preferable to producing 1,192 thin pages and facing AdSense quality problems, Google indexing suppression, duplicate-content penalties, or years of corrections. One comprehensive statewide directory is preferable to 1,192 lightly rewritten name-and-district stubs.

## Full authority page on its FIRST publication — owner directive, October 11, 2026

**Every school in the verified UIL softball registry is a candidate for a complete, permanent team page, just as in the high-school football network.** The existing statewide directory is the source inventory, not the final product and not a reason to omit school pages. The production rollout must pursue every independently verified program, not merely a curated sample. We publish no partial profiles in order to meet a calendar quota.

**Do all possible research *before* the first public release of each school page.** We learned from the football rebuilds and repeated follow-up enrichments: do not ship a simple name/district page and subsequently bolt on stadium, enrollment, coach, county, schedules, historical championships, school aliases, community sources, or accessibility. The first version must contain the whole researched entity graph, school-specific original editorial treatment and functional interactive sections. Reuse the football architecture's tested canonical routes, typed loaders and SEO, but never reuse football's sport-specific facts or make unsupported assumptions.

**A page can be ready without a fact that does not demonstrably exist.** Historical championship/roster records may be lost, a facility may have no named monument, and next season's official schedule may not yet have been posted. The editor must search and document sources, positively verify core current entities, accurately describe the observed source limitation in the relevant section, and avoid inventing content. A future source update is maintenance, not a reason to omit a research topic today. Do not publish a multi-section page of generic “information unavailable” placeholders.

### All-first-release research dimensions: 38 individually signed-off areas

The executable source of truth is `scripts/softball/complete-first-release-audit.mjs`. Every individual profile needs a per-topic decision, evidence IDs, an original evidence conclusion and a recent checked date. The matrix includes all of:

1. Exact school/campus identity, ISD or operator, mascot, team identity, county/city, school athletics page.
2. UIL softball-only season classification, district, region, district opponents and scheduling source. **Never import football districts or football's classification.**
3. Current coaching and historic coaching; official public roster source with minor privacy; future/active season and complete past verified scores.
4. Original program origins and pivotal moments; postseason history; properly attributed championships, records, titles, player/team/staff awards and verified notable alumni.
5. Exact home field, address and prior facilities, published game-day policies/admission and appropriate disability access information; verified source rather than guessed ADA or parking claims.
6. School enrollment (from dated school/TEA sources, not football alignment), recruiting/eligibility requirements, uniforms/brand rights, photos and licensing.
7. Local press history, independently documented rivalries, community traditions, booster/local heritage connections and truly relevant working city/county/venue links.
8. Original useful visitor/family FAQ, corrections and conflicting claims, accurate school-specific structured data and mobile/desktop/keyboard/contrast QA; compiled Worker SSR and status verification.

**Publication outcome**: any missing/unresolved topic, an unverified critical school/venue/coach/current-source fact, source conflicts, privacy/media-rights gaps or low-quality duplicate prose automatically blocks promotion. The remaining research is performed *before* the page goes live. At no stage does this authorize “unknown” to be silently populated with AI-generated guesses.

**Research evidence must be real:** automated sign-offs cannot replace opening the original documents, validating a coach's role, checking the original brackets or verifying an image license. The positive synthetic test fixture is solely a programmatic regression; never copy its made-up example data into site content.

**Release batching:** batches may contain as many teams as have individually completed this contract and passed CI and browser/production tests. The original eight-pages-per-PR cap has been removed because it is unrelated to content completeness. Keep batches small enough to diagnose failures and roll back safely, but **do not accept weaker content for a larger batch** or force unnecessary manual continuation between every individual school.

## Every individual team page must have ALL of the following before publication

| Research area | Nonnegotiable acceptance evidence |
|---|---|
| School identity | Unambiguous campus, district/ISD, official school URL, city/county, mascot/team name verified separately; collision check against same-named schools |
| Current softball classification | Exact match to **2026–27 UIL softball** conference, numbered district and region; original PDF link; distinguish 1A schools listed in the 2A softball matrix from general enrollment classification |
| History | Original, school-specific program origins, key eras and changes, dated primary/source-attributed facts; no invented first-season dates |
| Coaching | Official staff names, roles, past/current distinctions, appointment dates and staff-directory link; avoid unsupported “current” claims |
| Season record | Date-stamped schedule/results for the specified season, opponents, postseason context, source; don't promise live results |
| Player information | Official **roster access link** and eligibility context; never scrape or republish private student, birth date, address or recruiting contact information |
| Facility | Verified actual home field name, address, game-day parking/accessibility and admission; if home location uncertain, research further before shipping |
| Titles and honors | Exact level of each title (district, region, state, national), year, division, official brackets and awards; explicitly distinguish team from player/staff honors |
| District opponents | Correct schools and UIL season from original softball alignment; no football district substitutions |
| Recruiting | Accurate school enrollment, eligibility/transfer guidance, governing-body restrictions, no guaranteed scholarships or invented staff contacts |
| Community | Unique local history, traditions, alumni and community role with attributable interviews/records; never repeated filler |
| Travel/visitor links | Accurate county/city, venue and other stable relevant TexasDefined routes; no invented commute times |
| Source disclosure | 6 attributable records minimum, 3 independent hosts, UIL + another type of official primary source, 18 distinct dated source-linked claims, visible reviewed date, correction contact/method |
| Writing and distinctness | 13 individually researched topical sections (at least 65 substantive words each), 1,050+ combined topical words, distinctive opening thesis, low intra/inter-page similarity; **minimums are not a writing target or permission to pad** |
| Image | Actual team/field-specific image with local asset, named credit, meaningful alt text, original source and separate license/permission evidence; no unlicensed school logo or random generated “team photograph”; no identifiable minors through this automated pipeline |
| Page governance | Responsible editorial/publisher attribution (formal named approval optional), stable slug, correct page-specific canonical/title/description/Article+SportsTeam schema, breadcrumbs, hub/directory/local crosslinks, accessible/mobile UX and direct correct status codes |
| Staleness and conflicts | Last verified within 183 days; year-specific claims and cited sources; conflicting records resolved or held, never silently guessed |

When a school cannot meet the requirement, **keep it as a verified directory listing**, update the research backlog and do not index a separate page. "No titles found" can be useful if backed by the full official archive; "data not available" on multiple central sections is **not** a complete authority profile. User-requested completeness does not justify writing speculative facts.

## Automated fail-closed control

- `src/data/softball/published-team-profiles.json` starts with **zero** team pages. Each future profile requires deliberate insertion; a listing import cannot publish it.
- `src/data/softball/published-team-index.json` is a **slim client/sitemap allowlist** of only the approved manifest's exact `(slug, UIL school name, softball conference, district, region)` records. It must be updated in the same reviewed change as each finished manifest entry. One-way or extra listings fail CI; never place the entire article manifest into a client directory module.
- `scripts/softball/authority-contract.mjs` checks official district identity, sources, factual claims, coverage, uniqueness, rights and corrections; it **does not require separate owner/editor sign-off**.
- `scripts/softball/verify-publications.mjs` cross-checks public routes/sitemap, server-only exact approved team loader and lazy page, school-specific canonical/JSON-LD, duplicate school-season, a complete research audit for every team in each batch, and previously published pages retained. Unknown teams return 404.
- `scripts/softball/test-authority-contract.mjs` exercises a complete **synthetic test-only fixture** plus many intentionally invalid cases. That fixture must never be inserted into the public manifest.
- The two validators run in `npm run softball:authority:validate`, `npm run softball:validate`, `npm run data:validate`, and **early within the protected `scripts/ci/run-premerge-validation.mjs` required Merge Gate**.
- The existing built Cloudflare Worker SSR smoke script reads the published manifest and checks **every newly approved profile** for its school-specific heading. Never accept a 200 that actually shows the hub, a blank shell or a generic school page.
- **Tests are evidence and regression safeguards, not blanket factual or human WCAG certification. Research must be source-supported, accurately qualified and corrected when disputed; optional separate human review does not block a valid publication.**

## Release method, designed around failures already encountered

**Phase 0 — once:** This policy and fail-closed validator, negative fixture tests, SSR acceptance wiring, optional review documentation and shared complete team-page engine pass before individual team publication. No mass team route or sitemap injection.

**Phase 1 — pilot:** Independently research **3–5 diverse schools** (urban, rural, 2A including smaller listing, complex name/ISD and championship history). Complete all fields and verify them manually. Use the shared source-aware server/SSR/lazy authority component; avoid a new file route for every team. Test an actual season change, duplicate-named school and 404. No generic repetitive templates.

**Phase 2 — production proof:** After pilot PR passes, inspect each live page at 360 px, 768 px and 1440 px, keyboard/focus, contrast, source links, canonical/robots, JSON-LD, matching sitemap URL, image rights, county/internal navigation, corrected 200/404 responses, Worker SSR, Cloudflare cache and Search Console indexation. Only proceed to next batch on success.

**Phase 3 — incremental expansion:** Every new team in the batch must be individually researched, source-complete and page-contract clean **before its first publication**. Batch size is dictated by research quality, verification throughput and deployment risk, not an arbitrary page count. Continue season/source revalidation and avoid many conflicting open PRs.

### Preflight and CI failure prevention

1. **Use fresh `main` before each feature branch.** GitHub has multiple concurrent writers. Check merge base and touched paths, reconcile or rebase before opening PR. Never overwrite unrelated changes or silently delete files. Review the PR changed-file list for unwanted deletions (we previously caught football QA file removals).
2. **No handwritten TanStack route-tree edits.** Prefer extending the existing one optional softball route and using lazy loaded page bodies. If route signatures change, run the normal build to regenerate `src/routeTree.gen.ts`, commit the generated result and check no hydration errors.
3. **Preserve client bundle/CSS budgets.** Prior PRs encountered small JS overages and CSS cap failures. Measure build artifacts locally/CI **before** PR; remove eager imports and unnecessary utilities, do not increase caps automatically as a workaround.
4. **Run one canonical premerge script**, `node scripts/ci/run-premerge-validation.mjs`, which reports all failing checks. Fix the full failure set before requesting another full rerun. Run focused fast unit validators first.
5. **Understand required status on both HEAD and synthetic PR merge SHA.** A green job sometimes still produced GitHub HTTP 405 "Required status check expected" when the protected merge ref was stale. The canonical workflow publishes the `Required merge gate` status for validated refs. Do not forge passing status, bypass branch protection or repeatedly retrigger unchanged builds. Reconcile latest `main`, require fresh checks, merge only when branch protection permits.
6. **No one-time workflow accumulation.** Prior PDF, route-tree and sync workflows served as diagnostics and were removed. Keep a permanent *repeatable source-ingestion script*, but trigger it deliberately when UIL updates the original documents; validate each season before replacing records.
7. **Do not mix large unrelated work.** One issue, one feature branch, one coherent PR, no unrelated football/affiliate/Cloudflare QA changes. Verify changed filenames every time.
8. **Guard data provenance.** The UIL PDF parser was initially sensitive to numeric district-label geometry and whitespace; preserve reviewed positional parsing and normalize wrapped names. Require exact count per official edition, 160 districts and a source-linked CSV. Never declare 1,192 current rosters.
9. **On deploy**, require green Worker build, performance check, built SSR smoke, live direct Worker and canonical domain checks, safe Cloudflare deployment/rollback and successful production deployment run ID. Don't declare live on PR merge alone.
10. **Sources change:** 2026–27 alignment is versioned. Verify rosters/coaches/schedules again at least every 183 days and when season/coach/venue changes; avoid rewriting historical records with future seasons. Authoritative today cannot mean never updating rapidly changing facts.

## Permanent authoring boundaries

Do **not** manufacture names, biographies, exact records, recruiting contacts, team photos or “famous alumni” to reach word counts. Copyright, trademark, likeness and privacy clearance require real evidence. Do not imply affiliation with UIL or school teams. Do not rely exclusively on one university site or rewrite program boilerplate across schools.

**Definition of complete (for a given dated edition):** strong school-specific evidence; every applicable editorial area meaningfully covered; unknowns expressly and credibly investigated; original sources verifiable; page and image rights checked; clean performance, accessibility, structured data, SSR, sitemap, live deployment and human page review. Content must remain maintainable as sports seasons change.

## Current rollout status

- Delivered: Texas women's softball hub, PJC Lady Dragons, Texas Volts, 1,192 verified UIL 2026–27 alignment listings and CSV; **these are not 1,192 individual researched pages**.
- In progress separately: source-attributed NCAA college program directory; keep unmerged college work isolated until authority-gate contract is in `main`.
- No newly authorized individual UIL team profile has passed this authority-page publication contract yet.
- Continue scope tracked in [GitHub issue #4652](https://github.com/keeptxred/TexasDefined/issues/4652).

**Complete team-page engine documentation:** [APPROVED_TEAM_PAGE_ENGINE.md](./APPROVED_TEAM_PAGE_ENGINE.md). The complete manifest stays server-only; the 1,192-school directory and sitemap read only the tiny exact-key approved index. In addition to title-per-team built Worker SSR, the CI worker must reject an unapproved team slug with a real HTTP 404. Individual source-evidence and actual published-page technical verification remain mandatory; a separate named human editorial certification is not.
