# Texas freshwater fish identification — TPWD 22-species cohort

Status (2026-11-25): **22 TPWD fish and all 28 standalone guides are published.** PR #7270 merged; 37/37 latest live Chrome mobile checks passed, including decoded fish imagery, no overflow, no JS errors and readable dark-hero source credits. This document records code-backed checks, not Google indexing or a human 95+ quality grade.

## User request
Take the uploaded Texas Parks and Wildlife Department *Texas Common Freshwater Fishes* foldout, retain TexasDefined's existing fishing guides, add reliable identification, similar-species comparison, typical sizes, habitat and fishing context to every one of the 22 pictured fish, and create authoritative pages for the nine missing species. Every image must be individually sourced and licensed. Keep indexable pages substantive, with real citations and no invented lake records. Complete publication and live QA.

## Implemented in branch
- New `src/data/fishing/species-identification.ts` with 22 species-specific identification, lookalike, size, Texas habitat, technique and handling/legal caveat entries, with official TPWD links.
- Nine new published fish records and matching standalone routes: bowfin, common carp, spotted gar, redear sunfish, green sunfish, warmouth, longear sunfish, redbreast sunfish and Rio Grande cichlid.
- Shared `FishIdentificationSection` integrated into all standard species guides and the special largemouth guide.
- Nine licensed, individually attributed Wikimedia Commons fish illustrations (8 U.S. Fish and Wildlife Service public domain and 1 CC0 Rio Grande cichlid); source and creator held in existing image governance.
- Reconciled source date notices and sitemap editorial modification dates, preserving the older source-record check dates where applicable.
- New `scripts/data/validate-fishing-field-identification.mjs` covers all 22 species with required ID sections, published routes, exact image mappings and official sources. Added to `fishing:validate` and predeploy/full validation suite.

## Integrity boundaries
- **No fabricated lake-to-species claims**: new species may have zero lake recommendations until source-backed associations are added.
- No use/republication of the user's photographed pamphlet art; imagery is individually licensed Commons material.
- Field sizes are descriptive, not legal limits. Link official TPWD regulations at point of decision.
- Source-review dates do not silently update old records to today's date.
- This change preserves existing canonical paths and live fishing-content workflows.

## Release / verification checkpoint (2026-11-15)
1. Completed: PR [#7266](https://github.com/keeptxred/TexasDefined/pull/7266) merged with the 22-fish field-identification feature and nine standalone guides.
2. Completed: production deploy [#43779518662](https://github.com/keeptxred/TexasDefined/actions/runs/43779518662) succeeded at main SHA `2f84d03a93c1d3d1d3438215bb3335e4997a1357`; it incorporated the fish feature from its ancestry.
3. **Not yet certified**: the [fishing URL authority acceptance run #43781160852](https://github.com/keeptxred/TexasDefined/actions/runs/43781160852) concluded success only because its species steps were skipped. Scope keyed only to the current deployment commit and missed the preceding fish feature commit.
4. Follow-up in `feat/tpwd-fish-identification-22-20261115-v2`: allow a dedicated 28-species live SSR audit on scheduled and on workflow-update push runs, rather than only on fishing-scoped production deployments. Verify canonical, indexability, image rendering/rights, TPWD sources, and every 22-fish pocket-guide page from the generated artifact.
5. After the audit, investigate any failed URLs and amend the next checkpoint accurately. Do not mark full 95+ editorial/mobile acceptance on the basis of mechanical HTML checks alone.

## Continuing authority validation and editorial revision (2026-11-15)
- [Production SSR audit #43793197197](https://github.com/keeptxred/TexasDefined/actions/runs/43793197197): **28/28 canonical species/group pages, zero critical errors, zero unexpected noindex**.
- [Real Chrome mobile audit #43805270172](https://github.com/keeptxred/TexasDefined/actions/runs/43805270172): **37/37 checks passed**, comprising all 28 guides at 390px and the nine additional fish at 320px. Fish images decoded in Chrome, no JS errors or horizontal overflow, and all 22 brochure fish had their identification sections. 18 mobile screenshots are preserved in GitHub artifact ID 14198705250.
- Manual screenshot inspection revealed **the photo attribution on the dark fish hero used near-black credit text**, although automated page structure checks passed. The follow-up changes `FishingPhoto` to support an explicit on-dark high-contrast credit treatment and adds an actual computed-color contrast assertion at 4.5:1. The contrast change must pass a new production browser run after deployment before it can be marked complete.
- Compared all 22 TPWD-linked species accounts; expanded the 13 previously published species with distinct, source-supported breeding, food-web and Texas ecology paragraphs so all 22 have original biological context. Updated the field-guide validator to prevent ecological depth from silently regressing.
- Do **not** infer a 95+ Google quality score or indexing outcome from HTML and Chrome automation. Human source verification and image reuse provenance were checked against individual TPWD and Commons pages, but ongoing source changes and Google decisions are external.

## November 25 continuation — verified mobile release and cross-links

- The post-PR-#7270 live browser check [#45644553345](https://github.com/keeptxred/TexasDefined/actions/runs/45644553345) completed **37/37 without failure** on November 25, testing all 28 guides at 390px and the nine new species at 320px. The tool checked field headings, image decoding, mobile overflow, uncaught JavaScript errors, and source-link presence. The dark-hero fish image credit measured approximately 15:1 contrast in its audited pages; artifact ID `15037367661` contains page-level results and screenshots.
- Same-day [Fishing URL authority acceptance #45644555759](https://github.com/keeptxred/TexasDefined/actions/runs/45644555759) and [13-page fishing acceptance #45644553432](https://github.com/keeptxred/TexasDefined/actions/runs/45644553432) both completed successfully. These support technical verification, not Google ranking or full editorial certification.
- PR #7270 was subsequently merged (commit `37186fbd0ef02f7a1ec0c8d978c67150e2d7dc4a`), delivering two biological and habitat paragraphs for each of the 22 species plus readable fish-art attribution.
- This November 25 improvement adds **curated, species-specific lookalike links** alongside comparison descriptions. Only existing published fish-guide paths may be linked; the CI validator rejects self-links, duplicates and unpublished routes. This cross-linking is independent of fishery-lake co-occurrence and does not invent such relationships.
- Typical-size wording is now standalone, without referring to a physical leaflet readers have not necessarily seen. The species field-guide editorial update marker advances to November 25 for these visible edits, while individual original TPWD source-check dates remain unchanged.
- Outstanding external boundaries: Google indexing, ongoing real-world angling conditions, future TPWD fact changes, image licenses at future dates and hands-on long-form factual review are not certified by the automated tests.
