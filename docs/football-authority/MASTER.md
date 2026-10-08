# TexasDefined — High School Football Authority Project (locked)

## Mission and scope
Individually audit, research, improve and production-verify **every existing** school football team page at `/texas-high-school-football-teams/[slug]`. Not a template-only project. Use the canonical UIL 2026–28 data and separate existing featured/non-UIL pages. Do not mass-create pages, rebuild unrelated sections, or silently skip private programs. Only directly relevant inbound links on existing county/city/stadium pages are in scope.

## Research standard
Inspect the **actual individual page** and source code; identify specific defects before editing. Cite official school/athletics/ISD, UIL or applicable association, official venue, primary records and credible local archives. Independently confirm material claims as needed. Distinguish alignment cycle, season, and historical information. Research coach, history, titles, notable seasons, confirmed alumni, real rivalries, traditions, stadium location/accessibility/parking and current resources **where sourced**. Never fabricate missing facts, rivalries, coaches, photos, records, current scores, titles or source checks. No filler or mandatory minimum length. Document evidence and discrepancies per school.

## UX and visual identity
Make each profile helpful for fans, parents, students, alumni, visiting supporters and historical researchers. Reuse maintainable responsive and accessible components only as a foundation; add program-specific editorial stories, school-appropriate color accents, maps, real imagery, timeline/achievement visuals, context, and relevant links. Never imply TexasDefined is an official school site. Prominently link official sources. No fake logos or photos. Search-result images aren't automatically reusable; record license and attribution, or use original accurately labeled graphics if suitable photography is not legally available. Optimize any approved images and alt text.

## SEO and connections
Review unique title/meta/H1 and heading structure; canonical, robots, sitemap, breadcrumbs and truthful schema. Cite specific primary sources and accurate verification date, without refreshing dateModified artificially. Add contextual **outgoing and incoming** links to existing district, rival, school, stadium, city and county pages where materially relevant; avoid generic link dumping. Validate mobile, desktop, accessibility, source/URL validity and meaningful content.

## Per-school workflow
1. Inspect live route + current main + source data. 2. Write the individual deficiency audit. 3. Research and preserve URLs/fact provenance. 4. Implement meaningful school-specific copy and visual/SEO/link work. 5. Validate sources, links, images, responsiveness and tests. 6. Merge only through protected GitHub workflow. 7. Confirm deployed live page. 8. Update exact status and remaining work. **Only VERIFIED means complete**; any inapplicable acceptance criterion must be explained, not invented. Failed external tools are blockers, not successful checks.

## Batch and continuation controls
Process **one individual school at a time**, with **no more than three schools handled per execution chat** (including schools resumed from a previous batch). Finish incomplete assigned-school work before claiming new schools; the historic five-school Batch 001 stays assigned until its remaining checks are resolved, but a continuation chat may handle at most three of its schools. Before any execution, refresh `main`, read MASTER.md, REGISTRY.json and PROGRESS.md, inspect relevant PRs, and reconcile concurrent edits. Only after existing assignments are resolved may a future chat claim up to three unassigned schools. Record an individual deficiency audit and source-backed improvements for each school under `schools/[slug].md`; generic or mass template updates **never** count as completing an individual school. Save durable progress after each meaningful research, edit, merge, deployment or verification milestone, including explicit blockers, exact commit/PR references and next actions. Never use chat memory as the project ledger; avoid scope creep and end each execution at a safe committed checkpoint rather than an excessively long session. The next chat must resume from GitHub records, not repeat verified work, and never conflate IMPLEMENTED, MERGED, DEPLOYED and individually VERIFIED.

## GitHub concurrency and deployment
Before material writes/PR merges refresh `main`, preserve unrelated later changes, reject stale changes, avoid duplicate PRs, never force push or bypass required checks. Rebase/replay **only still-missing** edits if main moves. Do not claim a commit, CI pass, merge, deploy or production verification unless observed. Investigate actual CI blockers without weakening gates. Keep an honest live-validation distinction.

## Acceptance checklist (each school)
- [ ] Actual deployed page inspected and individual defects recorded
- [ ] Verified identity, school, district and association cycle
- [ ] Original program-specific football history, titles/playoffs and traditions where documented
- [ ] Coaching/roster/current season clearly sourced or deliberately unclaimed
- [ ] Verified venue and game-day guidance; current official outbound resources
- [ ] Legitimate program-specific styling and legally usable imagery or explicitly documented graphic alternatives
- [ ] Mobile, accessibility, internal inbound/outbound links and source citations
- [ ] School-specific SEO/schema/canonical/indexability and valid assets
- [ ] Relevant tests passed, protected merge succeeded, live deploy observed and actual production inspected
- [ ] All N/A / incomplete/rights/access limitations recorded accurately

## Final verification
Reconcile original vs final URL inventory; check every profile audit, substantive improvement and source/image rights, unfinished PRs, mobile/desktop variants, duplication, broken links, and ledger accuracy; report school-by-school without calling unresolved pages finished.
