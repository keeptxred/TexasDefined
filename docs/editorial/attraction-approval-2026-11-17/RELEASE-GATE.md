# Owner-approved attraction authority batch — release gate

Owner approved **development** of three guides on 2026-11-17. This is not approval to publish new indexable routes.

## Implemented on draft PR #7310
- `src/data/approved-attraction-authority-drafts.ts`: Athens TFFC and Lubbock NRHC destination guides with official operator citations, visitor facts and FAQs.
- `src/data/museum-expansion-statewide-wave54.ts`: expanded existing Texas Forestry Museum canonical.
- `src/data/museum-expansion-statewide-wave3.ts`: removed duplicate legacy Forestry Museum record.
- `src/data/museum-authority-heroes.ts`: preserved Commons exterior photograph with attribution, file and license URLs.
- `public/museum-verification-manifest.json`: each of the three destinations has one 30-day source verification entry.
- `scripts/data/validate-approved-attraction-drafts.mjs`: checks canonical uniqueness, imagery and source schedule.
- `.github/workflows/validate-approved-attraction-drafts.yml`: PR-triggered validation.

## Rights and quality decisions
- **TFFC:** July 2025 Larry D. Moore photograph of Lone Star cichlid at the actual facility, CC BY 4.0. File: https://commons.wikimedia.org/wiki/File:Cichlid_Texas_Freshwater_Fisheries_Center_2025.jpg ; license: https://creativecommons.org/licenses/by/4.0/ . Credit includes photographer, file URL and license URL. Verify visible rendering and that any image processing honors attribution.
- **Forestry:** November 2013 Billy Hathorn exterior photo, CC BY-SA 3.0. File: https://commons.wikimedia.org/wiki/File:Texas_Forestry_Museum,_Lufkin,_TX_IMG_8594.JPG ; license: https://creativecommons.org/licenses/by-sa/3.0/ . Verify image remains unaltered or apply ShareAlike obligations to derivatives. Verify visible credit.
- **NRHC:** **NOT CLEARED.** Do not use identifiable structure images for commercial publication without operator's written approval. Source: https://ranchingheritage.org/wp-content/uploads/2021/07/Photo-Policy-1.pdf . Contact: ranchhc@ttu.edu / (806) 742-0498. Until permission, keep photo placeholder and noindex.
- **TFFC hours:** https://tpwd.texas.gov/fishing/tffc/hours-and-fees/ is more detailed than the overview and explicitly lists seasonal schedules and closures.
- **NRHC group policy:** https://ranchingheritage.org/learn/adult-group-visits/ has an older footer with conflicting hours. Dedicated visitor page controls general public hours.

## Before owner final approval
1. GitHub Actions regression workflow and repository merge gate must pass, including TypeScript/build and existing destination indexing policy.
2. Preview each page on mobile and desktop; verify canonical, no duplicate routes, no broken image URLs, source/credit visibility, JSON-LD and accessibility.
3. Verify map coordinates and address details; reconcile the Forestry Museum ZIP discrepancy across operator pages.
4. Obtain NRHC image permission or select an original, rights-cleared, site-relevant alternative not prohibited by the operator's policy. No invented rights.
5. Confirm all three meet the internal 95+ authority rubric with recorded evidence; Google indexing cannot be guaranteed.
6. Obtain **separate owner approval** before merging/publishing new indexable pages.

No proprietary Viator descriptions or candidate-feed data are present in this repository note.
