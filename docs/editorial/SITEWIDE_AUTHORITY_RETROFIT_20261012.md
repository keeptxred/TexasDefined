# TexasDefined — every existing page authority retrofit

**CURRENT site-wide owner policy:** [Publication and optional editorial certification](./SITEWIDE_PUBLICATION_VERIFICATION_POLICY.md) supersedes the previous **mandatory named reviewer / nine-dimension acceptance before completion** rule for ALL URL families. Keep source accuracy, media rights, legitimate editorial value and production tests; don't misread this dated retrofit backlog as a site-wide publication hold.

**Started:** October 12, 2026  
**Scope:** all existing indexable TexasDefined URLs, **not** only guides or any selected list of attractions. This is an active remediation program, **not** a certification that the pages are finished. The existing authority and Google Search Central quality standards and Supabase source monitoring remain in force, but *formal Supabase reviewer sign-off is optional*, not a release gate.

## Verified starting point

Direct Supabase inventory at the start of this change counted **4,202 existing URL records**; the changing sitemap synchronizer later enrolled **4,211** in the acceptance ledger. Counts can change when pages publish, consolidate or disappear from their sitemap. All 4,211 initial acceptance records are in **editorial_research_required**, not accepted. The source-review queue also identified more than 4,000 pages with **no page-specific external source URL registered in Supabase**. This does **not** prove that the public HTML lacks sources; both source registration and the actual contents must be examined separately.

Largest path families at inventory time:

| Path family | Inventory | Intent-appropriate acceptance |
| --- | ---: | --- |
| High school football team profiles | 1,293 | Verified campus, mascot/classification, governing body, current district versus historical records, nearby venues, locality and related-team links |
| Fishing | 489 | Current TPWD rules, species, facilities/access ownership, relevant water/closure reporting, local lake/river and county relationships |
| Destination | 446 | Operator sources, history/identity, maps/directions, access/reservations and accessibility when appropriate, nearby trips and accurate images |
| Explore | 416 | Useful geographic/subject scope, original researched depth, maps/nearby listings where helpful, internal network and original evidence |
| County | 255 | County-specific identity/history, authoritative demographic and agency sources, appropriate city, park, lake, school and service relationships |
| Texas Icons | 219 | Primary history/cultural records, the actual phenomenon described and contextual references |
| Article | 216 | Original reporting/analysis, attributable verified claims, honest update dates, supporting internal links, licensed media |
| Football district profiles | 193 | Verified current district classification from UIL/TAPPS and a clear season, member schools and campus crosslinks |

**Important**: User-facing pages must be actually improved by source-specific research; a template badge, generic FAQ, appended SEO text or a score generated from word counts is never an authority upgrade.


## Independently recovered full-production crawl: 2026-10-12

[GitHub Actions production audit #38312630488](https://github.com/keeptxred/TexasDefined/actions/runs/38312630488) actually crawled **4,122 canonical sitemap-listed live URLs** across five sitemaps, with zero sitemap fetch failures. It found **76 hard technical SEO failures**:

- **62 sitemap-listed URLs return `noindex, follow`**: 52 lake `/guides` pages and 10 lake `/reports` pages, whose current content does not satisfy the route's existing publication-readiness conditions. This is a contradiction in sitemap generation—not permission to index unverified content. The retrofit removes unconditional listing of these sections from `FISHING_SITEMAP_ENTRIES`, preserving the route's protective `noindex`. Separate official-data server loaders can now reinclude a section only if a verified guide or valid, current fishing report actually supports it. Regression `validate-fishing-sitemap-indexability.mjs` keeps that rule.
- **14 excessively long title tags** (>90 characters under the existing quality-audit standard), distributed across articles, destinations, events, heritage, fishing, food and school football. The retrofit supplies **14 subject-specific readable title rewrites** through shared `buildMeta` SEO overrides while leaving editorial titles/body untouched.
- **1,082 title-length review warnings** (longer than 70 characters), which are only editorial review suggestions rather than proof of a Google ranking defect. Google does not impose a universal title character limit; the focus remains descriptive distinct title text.

These corrections are **committed in [PR #4703](https://github.com/keeptxred/TexasDefined/pull/4703)** and are not yet certified as live until the protected merge/deployment and another actual production audit confirm the published changes. The live production finding counts above remain the honest pre-deployment baseline.

## Operating system in place

1. **Weekly full production crawl** (existing `.github/workflows/audit-whole-site-production.yml`): every canonical sitemap URL is checked for HTTP success, title/description, canonical, one H1, unexpected noindex, thin/fallback rendering and duplicate title/description. The current change adds **topic-specific evidence diagnostics** plus a complete per-URL review TSV and a persistent categorized GitHub remediation issue. These diagnostic flags are not factual findings and do not individually certify a page.
2. **Daily code/data quality watchdog** (existing `.github/workflows/site-quality-watchdog.yml`): adds regression tests for the new family-aware evidence classifier. Existing indexability, image, internal-link, freshness, content and generated-page gates remain unchanged.
3. **Supabase source-watch automation**: `td_authority_verification_registry`, `td_authority_verification_sources`, `td_authority_verification_checks`, and sitemap discovery keep monitoring enrollment; topic-specific source checks run from daily through quarterly. Source uptime is not the same as factual verification.
4. **Optional Supabase editorial certification, NOT a publishing gate**: `td_authority_page_acceptance` enrolls all URLs. Its `accepted` status and the historical `td_authority_release_readiness` view describe **named editorial acceptance only**, not live publication/technical verification; `editorial_research_required` is an optional-review queue rather than a reason to block deployment or the next batch. `td_maintenance.accept_authority_page` still requires a real reviewer and nine complete evidence areas **only if somebody voluntarily requests formal certification**. Never mass-approve or forge a person; page delivery is independently evidenced by source, CI, release, and live QA.
5. **Existing topical work remains authoritative where genuinely completed**. Reuse prior lake, river, city, museum, park, church, sport and county research and CI artifacts rather than republishing duplicate pages or reverting other PRs. Remediate only demonstrable gaps.

## Evidence required to call a page complete

- Independent, contemporary **primary research** appropriate to each changeable claim, and honest handling of disputes or unknowns
- A useful, original experience that beats comparable references at the actual reader task, including relevant FAQs, maps, comparisons, history and visitor facts **only where relevant**
- Actual content depth and source provenance—not arbitrary word counts, copied operator collections, stock passages or identical FAQ text
- Accurate and permitted image rights, useful alt text, contextual map accuracy and appropriate captions
- Real, working, **bidirectional contextual internal links** when a relationship serves readers; not gratuitous blanket cross-links
- Google Search Central people-first and technical SEO compliance: indexability/canonical, metadata, mobile/accessibility, structured data matching visible facts, image SEO, page experience, and GSC production observation
- Validated public production rendering, correct dates and no claims of real-time availability where the source can change
- Enrollment in applicable Supabase source monitoring with dated, appropriately sourced factual claims; human `last_verified_at` certification is optional unless someone truthfully performs a formal review

A source page remaining reachable is **not** a completed fact check. A sitemap being crawlable is **not** proof Google has indexed it. A passing technical CI is **not** approval to label a research page "best available."

## Execution order

Fix systemic **shared template and publishing defects** first, since one correct code change may improve hundreds of pages. In parallel prioritize rapidly changing public safety, fishing, event and government/service information, then school/district data, destinations/cities/counties, followed by longer-lived heritage and evergreen content. If a page lacks independently useful substance, keep its indexability gate honest until proper research exists—never fill it with an automatically expanded generic paragraph.

Every real content change gets claim-level source evidence, relevant cross-link review, topic-specific QA, and production verification. If the actual claims or production implementation are unsupported, correct or qualify the page; leave **optional editorial certification** open without holding a technically delivered page or batch. Do not invent another site or page to inflate coverage.

## Concrete content correction in this batch

A live Fredericksburg destination check surfaced ambiguous side-trip placement. The curated small-town source now distinguishes Fort Martin Scott at **1606 E Main Street**, Enchanted Rock **18 miles north on Ranch Road 965**, and Old Tunnel State Park south of town along **Old San Antonio Road**. It also adds THC and TPWD operator-specific context without freezing changeable hours. The source is committed; a successful protected deployment and public recheck are necessary before treating the live page as corrected.

## Primary standards

- [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical)
- [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Texas Historical Commission — Fort Martin Scott](https://thc.texas.gov/historic-sites/fort-martin-scott)
- [TPWD — Enchanted Rock directions](https://tpwd.texas.gov/state-parks/enchanted-rock/map)
- [TPWD — Old Tunnel State Park](https://tpwd.texas.gov/state-parks/old-tunnel)

## 2026-10-12 sitewide contextual link and official-source continuation

**Permanent link evidence:** PR [#4705](https://github.com/keeptxred/TexasDefined/pull/4705) extends the existing all-sitemap production crawl to compute real main-content inbound links, reciprocal on-page crosslinks, orphan-candidate pages and internal links absent from the known sitemap. It writes `texasdefined-contextual-link-graph.tsv` for **every analyzed URL**. These are evidence-led research candidates, not permission to force low-value reciprocal links. The existing production audit remains a separate strict SEO-failure gate.

**Permanent TPWD source registration:** The independently curated [54 completed-guide mappings](../fishing/TPWD_LAKE_COVERAGE_GAP_MAP_2026-10-12.json) were matched exactly to the official individual-lake TPWD URLs already recorded in TexasDefined fishing fixtures. **50 source records** were added to the shared Supabase `td_authority_verification_sources` for known canonical lake pages on 2026-10-12. All **54 mappings** are retained in the private `td_maintenance.tpwd_lake_source_manifest` and a daily protected job enrolls new records automatically once their canonical page appears in the site registry.

The following four researched guide slugs were **not present in the enrolled sitemap registry** at the time of verification: `benbrook-lake`, `lake-georgetown`, `lake-stamford`, and `lake-sweetwater`. They are **not counted as enrolled live verified guides** until a production sitemap can substantiate them. Do not fabricate a sitemap record or force `verifiedAt` to conceal that deployment/discovery gap.

**Meaning of source registration:** TPWD URL registration and automated HTTP checks validate provenance and source changes. They do **not** verify each claim on surface acres, current marina status, ramps, fishing regulations, campground operation, water levels, source-specific history, image rights or destination QA. Those individualized gaps must still be researched and attested separately before editorial acceptance.

**Permanent guard:** `scripts/data/validate-tpwd-lake-source-enrollment.mjs` compares the completed-guide coverage manifest against the official-source monitor and rejects missing entries in the daily/PR watchdog. New lake guides must include appropriate verifiable sources as part of publication, rather than relying on a single statewide link.
