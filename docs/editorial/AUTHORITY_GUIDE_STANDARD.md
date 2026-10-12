# TexasDefined Authority Guide Standard

**Applies to:** every page labeled a *guide* or *authority guide*, whether a region, scenic drive, park, lake, river, city, museum, cultural area, event, or visitor intent guide. A guide is **not** a lower standard of content than an authority page.

**Editorial objective:** create the most accurate, useful, comprehensive and discoverable independent resource for the reader's intent. "Best" or "#1 authority" is an editorial ambition, not a ranking promise or a self-awarded claim. It requires benchmarking against relevant alternatives and demonstrating differentiation.

## Non-negotiable release criteria

- [ ] **Search intent and distinctiveness.** Identify the precise reader questions the guide answers and compare at least three credible existing guides or primary/official resources. Record what those do well, where they fail, and which original, reader-useful material this guide contributes. Avoid duplicating an existing canonical TexasDefined page.
- [ ] **Research and accuracy.** Use authoritative primary sources wherever available (land manager, TxDOT, TPWD, NPS, TTB, local government, archive or historical organization). Individually verify disputed, niche, numerical and changeable facts, identify source dates, and avoid claiming a public facility or site is open without a recent check. A record may be incomplete rather than invented.
- [ ] **Authority-level depth, not padding.** Answer the full scope of the topic in a logically organized way: geography/definitions, what makes it important, places, comparisons and trade-offs, access, safety, seasons, accessibility, costs, timing and historical context where relevant. Word count alone never proves authority; thin overview-only guides fail regardless of whether the site's generic indexing threshold is met.
- [ ] **Planning usefulness.** Provide concrete maps, named roads or trip corridors, distinguish paved and unpaved routes, realistic route sequencing, visitor restrictions, fees/reservations, hours, parking, weather cautions, and practical itineraries where relevant. Any distance or cost displayed must be verifiable and date/scenario qualified. Don't invent travel times.
- [ ] **Originality and editorial voice.** Make nuanced recommendations with rationale, exceptions and caveats, including sections on which experience is **not** a good fit. No rankings without disclosed criteria and evidence; no templated filler, fabricated firsthand experience or invented field observations.
- [ ] **Legal and useful images.** Hero and supporting images must actually depict the subject. Audit provenance and allowed usage; include credit/license and attribution as required, substantive descriptive alt text, image dimensions, and relevant filenames. Do not mislabel representative images as documentary photos. "Found online" does not mean free to reuse.
- [ ] **Bidirectional contextual internal links.** Link the guide to its relevant place pages, counties, cities, parks, rivers, lakes, attractions, history, neighboring regions and related subject guides. Add meaningful incoming links from relevant existing pages and category/Explore hubs; verify all routes resolve to canonical, published pages. No keyword-stuffed or indiscriminate site-wide links.
- [ ] **Sources and citability.** Prominently show named author/editor, editorial review or verified date, methodology and primary references; provide stable canonical URL and useful summary facts. Link factual claims to sources with appropriate granularity, particularly for rankings or statistics.
- [ ] **SEO and AI-search quality.** Verify accurate title, meta description, H1/H2 hierarchy, unique answer layer, accessible anchors, structured data appropriate to the page, crawlability, internal discovery and sitemap registration. No deceptive markup, duplicate URLs or misleading dates.
- [ ] **Responsive and accessibility QA.** Manually inspect desktop and mobile content hierarchy, image accessibility, navigation, keyboard use, readable text and contrast. Correct regressions before publication.
- [ ] **Live-content safety and maintenance.** Label any time-sensitive information as time-sensitive. Establish source re-verification cadence appropriate to risk; monitor broken links, changed conditions, factual errors and underperforming pages. A changed date does not count as substantive review.
- [ ] **Release verification.** Unit and routing tests, CI, sitemap/internal-link tests and relevant smoke checks must pass. Complete editorial and photography rights review; do not merge incomplete guides under a "complete" label.

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

The editorial review must document (1) evidence-based comparable resources, (2) major reader tasks each covers, (3) material gaps in our guide, (4) resolved discrepancies, and (5) the guide's original differentiators. This is required before calling a new guide "authority complete." Search rankings, traffic and AI citations can subsequently be monitored as outcome metrics; no team can guarantee first position.

## Existing regional and special-interest guides

The seven Explore region URLs are canonical. The three new scenic drive, statewide wine country and German-Texan heritage guides are supplementary canonical subjects. No new guide is considered a release deliverable until all applicable release criteria above have evidence of completion. Publishing an incomplete overview as a finished guide is not an acceptable substitute. This standard is independent of passing a minimum-word-count validator or a green CI build.

## Mandatory Supabase fact-verification enrollment

Every new indexable TexasDefined guide, article, county, city, destination, lake, river, park, museum, historic church or other authority URL must enter the Supabase `td_authority_verification_registry`. Sitemap discovery runs daily, so future published URLs enroll automatically; an absent URL or missing primary sources must be treated as an operational defect.

- **1 day:** current fishing reports, events and immediately changing dates or schedules.
- **7 days:** fishing guides and lake access/regulations; current sports or other highly changeable pages.
- **30 days:** roads/scenic driving, coastal visitor access, Big Bend access, winery/venue information, state and national park visitor logistics, and business destinations.
- **90 days or less:** comparatively stable museums, cultural history, painted churches, broad region overviews, archived historical references and long-lived facts.

An individual record can be set to a stricter interval, never longer than 90 days. Data-driven services must obey their own faster refresh specifications. Check official URLs and their accessibility. HTTP 200 and unchanged hashes are *source reachability signals*, never factual verification. Flag changed/unreachable pages, retain source-check history and require source-based editorial/fact review before setting `last_verified_at`. Dated evidence, reviewer identity and discrepancy resolution must be recorded. Newly discovered pages lacking a primary-source inventory remain `awaiting_editorial_verification`.

The Supabase registry monitors all published sitemap URLs and sources registered in `td_authority_verification_sources`. The initial scheduler and HTTP probes run under `td_maintenance` through Supabase Cron. Every subsequent guide build should register official sources as part of its same release work; do not rely on a crawler to guess which external links support which claims.
