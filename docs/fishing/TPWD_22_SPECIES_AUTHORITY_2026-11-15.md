# Texas freshwater fish identification — TPWD 22-species cohort

Status (2026-11-15): **Merged in PR #7266 (9ef38b2ab62f40158adb56a5cceffdf2f3eac5b1)**; a later main deploy of `2f84d03a93c1d3d1d3438215bb3335e4997a1357` succeeded (GitHub Actions run #43779518662). Implementation is deployed, but **dedicated 28-guide live SSR verification was skipped by the single-commit workflow scope and is not yet certified**.

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
