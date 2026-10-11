# TexasDefined Women’s Softball — Authority-First Publishing Standard
**Effective:** October 11, 2026  
**Owner:** TexasDefined sole administrator  
**Scope:** individual UIL girls’ softball team profiles proposed after the 2026–27 alignment directory

## Nonnegotiable decision

**The 1,192 UIL school/district listings do not authorize 1,192 individual pages.** They are the correct sport-specific discovery dataset, not verified rosters, team histories or permission to duplicate a page template. The searchable directory at `/sports/softball/schools` remains useful and canonical regardless of how many individual teams earn an authority profile.

Publishing fewer genuinely authoritative pages is preferable to producing 1,192 thin pages and facing AdSense quality problems, Google indexing suppression, duplicate-content penalties, or years of corrections. One comprehensive statewide directory is preferable to 1,192 lightly rewritten name-and-district stubs.

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
| Page governance | Explicit editor and owner approval, stable slug, correct page-specific canonical/title/description/Article+SportsTeam schema, breadcrumbs, hub/directory/local crosslinks, accessible/mobile UX and direct correct status codes |
| Staleness and conflicts | Last verified within 183 days; year-specific claims and cited sources; conflicting records resolved or held, never silently guessed |

When a school cannot meet the requirement, **keep it as a verified directory listing**, update the research backlog and do not index a separate page. "No titles found" can be useful if backed by the full official archive; "data not available" on multiple central sections is **not** a complete authority profile. User-requested completeness does not justify writing speculative facts.

## Automated fail-closed control

- `src/data/softball/published-team-profiles.json` starts with **zero** team pages. Each future profile requires deliberate insertion; a listing import cannot publish it.
- `scripts/softball/authority-contract.mjs` checks official district identity, sources, factual claims, coverage, uniqueness, rights, corrections and editorial sign-off.
- `scripts/softball/verify-publications.mjs` cross-checks public routes/sitemap, specific slug metadata, duplicate school-season, maximum **8 new pages per PR**, and previously published pages retained. Unknown teams return 404.
- `scripts/softball/test-authority-contract.mjs` exercises a complete **synthetic test-only fixture** plus many intentionally invalid cases. That fixture must never be inserted into the public manifest.
- The two validators run in `npm run softball:authority:validate`, `npm run softball:validate`, `npm run data:validate`, and **early within the protected `scripts/ci/run-premerge-validation.mjs` required Merge Gate**.
- The existing built Cloudflare Worker SSR smoke script reads the published manifest and checks **every newly approved profile** for its school-specific heading. Never accept a 200 that actually shows the hub, a blank shell or a generic school page.
- **Tests are evidence and regression safeguards, not substitutes for a human reviewing every claim, rendered page and source URL.**

## Release method, designed around failures already encountered

**Phase 0 — once:** This policy and fail-closed validator, negative fixture tests, SSR acceptance wiring, and owner review standard pass before individual team template development. No mass team route or sitemap injection.

**Phase 1 — pilot:** Independently research **3–5 diverse schools** (urban, rural, 2A including smaller listing, complex name/ISD and championship history). Complete all fields and verify them manually. Build one reusable source-aware lazy component; avoid a new file route for every team. Test an actual season change, duplicate-named school and 404. No generic repetitive templates.

**Phase 2 — production proof:** After pilot PR passes, inspect each live page at 360 px, 768 px and 1440 px, keyboard/focus, contrast, source links, canonical/robots, JSON-LD, matching sitemap URL, image rights, county/internal navigation, corrected 200/404 responses, Worker SSR, Cloudflare cache and Search Console indexation. Only proceed to next batch on success.

**Phase 3 — incremental expansion:** At most **8 new genuinely researched team pages per PR**, with every page contract-clean. Continue season/source revalidation and avoid a high total of simultaneously open PRs. Increase rate **only after measurable evidence** of CI stability and editorial capacity, not a fixed quota.

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
