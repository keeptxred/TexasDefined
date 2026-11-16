# Texas freshwater fish identification — TPWD 22-species cohort

Status: **Implementation in review, not yet deployed**. Date: 2026-11-15.

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

## Release checkpoint
1. Open PR from branch `feat/tpwd-freshwater-22-species-identification-20261115` to `main`.
2. Examine PR CI/typecheck/build failures; fix and rerun by new commit.
3. Merge after all required checks pass and monitor the main-triggered `deploy-production.yml`.
4. Live-verify all 22 URLs, indexability, correct fish images, source links, sitemap dates, and no Cloudflare errors. If blocked, append exact error and state to this checkpoint before interrupting.
