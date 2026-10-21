# TexasDefined Authority Guide Standard

**Applies to:** every page labeled a *guide* or *authority guide*, whether a region, scenic drive, park, lake, river, city, museum, cultural area, event, or visitor intent guide. A guide is **not** a lower standard of content than an authority page. **Google Search Central SEO standards also apply to every published TexasDefined page**, including articles, counties, cities, destinations, sports and fishing references, research, commercial pages, and category hubs. Requirements must suit the page's actual purpose; avoid inserting formulaic filler.

**Site-wide owner rule (October 20, 2026):** [Publication and optional editorial certification policy](./SITEWIDE_PUBLICATION_VERIFICATION_POLICY.md) governs **every** TexasDefined URL, not only football or guides. Formal named editorial/owner sign-off and nine-dimensional Supabase acceptance are optional, **not** launch, batch-completion or technical-VERIFIED gates. Do not weaken factual research, rights for actual media, relevant accessibility tests, or protected production QA.

**Editorial objective:** create the most accurate, useful, comprehensive and discoverable independent resource for the reader's intent. "Best" or "#1 authority" is an editorial ambition, not a ranking promise or a self-awarded claim. It requires benchmarking against relevant alternatives and demonstrating differentiation.

## Non-negotiable release criteria

- [ ] **Search intent and distinctiveness.** Identify the precise reader questions the guide answers and compare at least three credible existing guides or primary/official resources. Record what those do well, where they fail, and which original, reader-useful material this guide contributes. Avoid duplicating an existing canonical TexasDefined page.
- [ ] **Research and accuracy.** Use authoritative primary sources wherever available (land manager, TxDOT, TPWD, NPS, TTB, local government, archive or historical organization). Individually verify disputed, niche, numerical and changeable facts, identify source dates, and avoid claiming a public facility or site is open without a recent check. A record may be incomplete rather than invented.
- [ ] **Authority-level depth, not padding.** Answer the full scope of the topic in a logically organized way: geography/definitions, what makes it important, places, comparisons and trade-offs, access, safety, seasons, accessibility, costs, timing and historical context where relevant. Word count alone never proves authority; thin overview-only guides fail regardless of whether the site's generic indexing threshold is met.
- [ ] **Planning usefulness.** Provide concrete maps, named roads or trip corridors, distinguish paved and unpaved routes, realistic route sequencing, visitor restrictions, fees/reservations, hours, parking, weather cautions, and practical itineraries where relevant. Any distance or cost displayed must be verifiable and date/scenario qualified. Don't invent travel times.
- [ ] **Originality and editorial voice.** Make nuanced recommendations with rationale, exceptions and caveats, including sections on which experience is **not** a good fit. No rankings without disclosed criteria and evidence; no templated filler, fabricated firsthand experience or invented field observations.
- [ ] **Legal and useful images.** Hero and supporting images must actually depict the subject. Audit provenance and allowed usage; include credit/license and attribution as required, substantive descriptive alt text, image dimensions, and relevant filenames. Do not mislabel representative images as documentary photos. "Found online" does not mean free to reuse.
- [ ] **Bidirectional contextual internal links.** Link the guide to its relevant place pages, counties, cities, parks, rivers, lakes, attractions, history, neighboring regions and related subject guides. Add meaningful incoming links from relevant existing pages and category/Explore hubs; verify all routes resolve to canonical, published pages. No keyword-stuffed or indiscriminate site-wide links.
- [ ] **Sources and citability.** Prominently show responsible publisher/author, meaningful source-checked or substantive-updated dates, methodology and primary references; name an editor/reviewer only when that review actually occurred; provide stable canonical URL and useful summary facts. Link factual claims to sources with appropriate granularity, particularly for rankings or statistics.
- [ ] **SEO and AI-search quality.** Verify accurate title, meta description, H1/H2 hierarchy, unique answer layer, accessible anchors, structured data appropriate to the page, crawlability, internal discovery and sitemap registration. No deceptive markup, duplicate URLs or misleading dates.
- [ ] **Responsive and accessibility QA.** Manually inspect desktop and mobile content hierarchy, image accessibility, navigation, keyboard use, readable text and contrast. Correct regressions before publication.
- [ ] **Live-content safety and maintenance.** Label any time-sensitive information as time-sensitive. Establish source re-verification cadence appropriate to risk; monitor broken links, changed conditions, factual errors and underperforming pages. A changed date does not count as substantive review.
- [ ] **Release verification.** Unit and routing tests, CI, sitemap/internal-link tests and relevant smoke checks must pass. Complete evidenced factual/source and release checks and verify reuse rights for any media actually published; separate formal named editorial sign-off is optional and does not block delivery. Do not label an unverified fact, inaccessible feature or unlicensed image complete.

## Bidirectional linking acceptance table

For each new guide, retain a compact worksheet in the PR description or companion evidence note:

| Link class | Outbound guide links | Contextual inbound links updated | Verified |
| --- | --- | --- | --- |
| Canonical region/Explore hub | Required where relevant | Required | [ ] |
| County and community pages | Representative relevant examples | Relevant pages updated | [ ] |
| Destination/venue/attraction pages | Primary visitor planning stops | Relevant pages updated | [ ] |
| Supporting topical and historical guides | Clear topic-based next reads | Relevant pages updated | [ ] |
| Maps, itineraries and official sources | Where useful | Not applicable to external websites | [ ] |

Do not insert links merely for quotas. Note any exceptional case where no logical inbound link exists.

## Comparative acceptance

A source-based comparative benchmark should document (1) comparable resources, (2) reader tasks each covers, (3) material gaps, (4) resolved discrepancies, and (5) original differentiators. These are editorial research checks; a separate signed human review form is **not** required to ship or mark a fully tested page technically complete. Search rankings, traffic and AI citations can subsequently be monitored as outcome metrics; no team can guarantee first position.

## Existing regional and special-interest guides

The seven Explore region URLs are canonical. The three new scenic drive, statewide wine country and German-Texan heritage guides are supplementary canonical subjects. No new guide is considered a release deliverable until all applicable release criteria above have evidence of completion. Publishing an incomplete overview as a finished guide is not an acceptable substitute. This standard is independent of passing a minimum-word-count validator or a green CI build.

## Google Search Central SEO — every published page

**Two compatible objectives:** build the best independent resource for each reader's purpose, **and** make that resource straightforward for Google to discover, crawl, understand, and present. Google visibility matters; it does not replace accuracy, original value, or editorial judgment. No ranking, indexing, AI Overview inclusion, or Discover placement is guaranteed.

Reference guidance: [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [creating helpful people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [canonicalization](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), [image SEO](https://developers.google.com/search/docs/appearance/google-images), and [Google AI search features guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). Check revisions whenever Google changes those guidelines.

- [ ] **People-first search intent and competitive depth.** Answer the actual questions with original verified research, useful comparisons, clear limitations, meaningful examples and primary citations. Do not game search ranking by repeating keywords, adding artificial paragraphs, mass-producing near duplicates or meeting arbitrary word minimums.
- [ ] **Indexability and technical signals.** Publish one stable primary URL for a distinct intent; use a correct self-referencing canonical where appropriate, HTTP 200 on live pages, expected redirect codes, no accidental `noindex`, crawlable HTML, correct robots policy and an XML sitemap entry only if the URL is canonically indexable. Do not confuse inclusion in a sitemap with Google's decision to index it.
- [ ] **Titles, snippets and document structure.** Accurate unique title elements and human-readable H1s, relevant meta descriptions, descriptive H2/H3 headings, helpful concise answer text and understandable breadcrumb navigation. Titles and descriptions should be written for readers; rigid character limits and keyword repetition are not editorial goals.
- [ ] **Helpful site architecture.** Relevant internal links must use crawlable `<a href>` elements in the rendered result, describe the destination meaningfully and work in both directions when there is a real contextual relationship. Avoid dead links, orphaned guides, misleading anchor text, and sitewide cross-links inserted merely to inflate counts.
- [ ] **Truthful structured data.** Choose markup suited to page intent (for example Article/BlogPosting, BreadcrumbList, Place, Event or Dataset when applicable), ensure it matches visible information, and validate against Google Search Central's supported feature requirements. Never invent FAQ answers, star ratings, prices, events or reviews as rich-result bait. JSON-LD or any other valid markup is a clue, not a guarantee of rich results.
- [ ] **Images, video and Discover readiness.** Where appropriate provide original or properly licensed subject-accurate images, descriptive alt text, image captions and credit, responsive widths, useful filenames, Open Graph metadata, crawlable assets, and a legitimately representative large lead image. No fabricated location photography.
- [ ] **Accessibility and performance.** Mobile-friendly page hierarchy, usable touch/keyboard controls, adequate contrast and labels, correct media sizing and lazy loading, no unnecessary rendering barriers, and Core Web Vitals measured on representative real pages (LCP, INP, CLS). A green build alone does not certify field performance.
- [ ] **Trust and editorial dates.** Visible author/editor identity, source transparency and appropriate source-checked dates. Set `dateModified` only for an actual meaningful content change or legitimate review; never auto-refresh publication dates simply to imply freshness.
- [ ] **Commercial content and outbound links.** Honest separation of editorial advice from affiliate/sponsored placement; use `rel="sponsored"` for qualifying commercial links and `rel="nofollow"` or `ugc` as appropriate. Verify partners and links without allowing affiliate incentives to dictate editorial rankings.
- [ ] **Post-release Search Console QA.** Verify actual public HTML, indexability, canonical status, sitemaps, server failures, coverage trends, impressions, queries, CTR and relevant structured-data enhancement reports in Google Search Console. Distinguish Google's coverage/canonical decisions from our own intentions; address documented defects without manufacturing changes for a recrawl.
- [ ] **AI search readiness follows core SEO.** Well-structured, independently useful, source-citable text and crawlable content matter for AI-mediated discovery; Google does not require a separate invented "AI SEO" schema or keyword-stuffed answer paragraphs.

**Release rule:** Every new or substantially upgraded TexasDefined page must pass the applicable checks above **in addition to** the subject-specific authority checklist. Automated template and CI enforcement should protect stable technical criteria; factual completeness must be source-backed and the actual user experience must pass relevant automated/live checks; an additional named editorial reviewer is optional, not a release dependency. No content is called "best-in-class" merely because metadata is valid.

## Mandatory Supabase fact-verification enrollment

Every new indexable TexasDefined guide, article, county, city, destination, lake, river, park, museum, historic church or other authority URL must enter the Supabase `td_authority_verification_registry`. Sitemap discovery runs daily, so future published URLs enroll automatically; an absent URL or missing primary sources must be treated as an operational defect.

- **1 day:** current fishing reports, events and immediately changing dates or schedules.
- **7 days:** fishing guides and lake access/regulations; current sports or other highly changeable pages.
- **30 days:** roads/scenic driving, coastal visitor access, Big Bend access, winery/venue information, state and national park visitor logistics, and business destinations.
- **90 days or less:** comparatively stable museums, cultural history, painted churches, broad region overviews, archived historical references and long-lived facts.

An individual record can be set to a stricter interval, never longer than 90 days. Data-driven services must obey their own faster refresh specifications. Check official URLs and their accessibility. HTTP 200 and unchanged hashes are *source reachability signals*, never factual verification. Flag changed/unreachable pages, retain source-check history and require source-based editorial/fact review before setting `last_verified_at`. Dated source evidence and discrepancy resolution must be recorded; a reviewer identity is mandatory **only when actually submitting a voluntary named editorial certification**, never when publishing. Newly discovered pages lacking a primary-source inventory remain `awaiting_editorial_verification`.

The Supabase registry monitors all published sitemap URLs and sources registered in `td_authority_verification_sources`. The initial scheduler and HTTP probes run under `td_maintenance` through Supabase Cron. Every subsequent guide build should register official sources as part of its same release work; do not rely on a crawler to guess which external links support which claims.
