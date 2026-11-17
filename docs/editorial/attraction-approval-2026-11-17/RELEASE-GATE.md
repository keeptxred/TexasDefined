# Owner-approved attraction authority batch — release gate

Owner approved **development** of three guides on 2026-11-17. This is not approval to publish new indexable routes.

## Implemented on draft PR #7310
- `src/data/approved-attraction-authority-drafts.ts`: Athens TFFC and Lubbock NRHC destination guides with official operator citations, visitor facts and FAQs.
- `src/data/museum-expansion-statewide-wave54.ts`: expanded existing Texas Forestry Museum canonical.
- `src/data/museum-expansion-statewide-wave3.ts`: removed duplicate legacy Forestry Museum record.
- `src/data/museum-authority-heroes.ts`: preserved Commons exterior photograph with attribution, file and license URLs.
- `public/museum-verification-manifest.json`: Forestry Museum retains its existing 30-day verification entry; new attraction entries are kept out to preserve exact museum dossier parity.
- `docs/editorial/attraction-approval-2026-11-17/attraction-source-verification.json`: two new guides have independent 30-day source entries.
- `.github/workflows/verify-approved-attraction-sources.yml`: monthly operator URL checks after merge (not yet active on main).
- `scripts/data/validate-approved-attraction-drafts.mjs`: checks canonical uniqueness, imagery and source schedule.
- `.github/workflows/validate-approved-attraction-drafts.yml`: PR-triggered validation.

## Rights and quality decisions
- **TFFC:** July 2025 Larry D. Moore photograph of Lone Star cichlid at the actual facility, CC BY 4.0. File: https://commons.wikimedia.org/wiki/File:Cichlid_Texas_Freshwater_Fisheries_Center_2025.jpg ; license: https://creativecommons.org/licenses/by/4.0/ . Credit includes photographer, file URL and license URL. Verify visible rendering and that any image processing honors attribution.
- **Forestry:** November 2013 Billy Hathorn exterior photo, CC BY-SA 3.0. File: https://commons.wikimedia.org/wiki/File:Texas_Forestry_Museum,_Lufkin,_TX_IMG_8594.JPG ; license: https://creativecommons.org/licenses/by-sa/3.0/ . Verify image remains unaltered or apply ShareAlike obligations to derivatives. Verify visible credit.
- **NRHC:** **NOT CLEARED.** Do not use identifiable structure images for commercial publication without operator's written approval. Source: https://ranchingheritage.org/wp-content/uploads/2021/07/Photo-Policy-1.pdf . Contact: ranchhc@ttu.edu / (806) 742-0498. A permission-request email was saved as a **Microsoft Outlook draft** on 2026-11-17 (not sent). Outlook draft message ID: `AAMkADBmMjVmYTMxLWJlMmUtNDk3OS05ZWJkLTdjMjQzNWVhNGFmNgBGAAAAAAB8jAkalpi6TYPNYwbyzFnnBwAs1ohBWTR4Ta8whUaUcCpvAAAAAAEPAAAs1ohBWTR4Ta8whUaUcCpvAAAwHPgcAAA=`. The exact-site Dogtrot House photograph (Billy Hathorn, CC BY 3.0, Wikimedia Commons) is now staged in the **unmerged draft branch** with credit and license links. The NRHC destination route is explicitly **noindex** until the operator’s separate commercial-use permission is resolved. Do not publish the image or remove the noindex hold without permission.
- **TFFC hours:** https://tpwd.texas.gov/fishing/tffc/hours-and-fees/ is more detailed than the overview and explicitly lists seasonal schedules and closures.
- **NRHC group policy:** https://ranchingheritage.org/learn/adult-group-visits/ has an older footer with conflicting hours. Dedicated visitor page controls general public hours.

## Before owner final approval
1. GitHub Actions regression workflow and repository merge gate must pass, including TypeScript/build and existing destination indexing policy.
2. Preview each page on mobile and desktop; verify canonical, no duplicate routes, no broken image URLs, source/credit visibility, JSON-LD and accessibility.
3. Verify map coordinates and address details; reconcile the Forestry Museum ZIP discrepancy across operator pages.
4. Obtain NRHC operator permission before publishing the staged Dogtrot House photo or lifting its explicit noindex hold. A photographer CC BY license does not override a separate operator policy.
5. Confirm all three meet the internal 95+ authority rubric with recorded evidence; Google indexing cannot be guaranteed.
6. Obtain **separate owner approval** before merging/publishing new indexable pages.

No proprietary Viator descriptions or candidate-feed data are present in this repository note.


## 2026-11-17 continued verification checkpoint

- Commons source pages checked directly: Lake Zebco (Larry D. Moore, CC BY 4.0; 3000×2000), Dogtrot House (Billy Hathorn, CC BY 3.0; 4320×3240). Photographer licensing is verified; NRHC's independent commercial-photography policy still requires review before public use.
- Three destination records now have actual-location photographs, official-source visitor guidance and monthly official-source verification enrollment. Forestry Museum guide includes family, accessibility and interpretive visit sequence.
- GitHub required merge gate on commit `3056ec9e636946059108be099d5996aa50396af8` failed because a route indexing guard modified a literal string expected by `validate-destination-data-integrity.mjs`; it was a source-contract regression, not a content-grade finding. Repaired by retaining the exact original indexability expression and applying NRHC's publication hold in a separate `finalIndexable` variable; updated `validate-destination-indexing-policy.mjs` accordingly in commits `b880018` and `d53c976`.
- Await current branch-head merge gate and route-level review. Do not infer a 95+ score solely from structural checks. Do not merge without final owner publication approval.

- Additional CI failure diagnosed: RV authority validator also requires the literal canonical `robots: indexable ? undefined : "noindex, follow"` contract. The route and validator were restored, and the NRHC noindex hold moved into the shared non-primary-destination gate (commits `467a6de`, `345f719`, `dc0415c`). This prevents unrelated quality guards from breaking while keeping NRHC out of indexable discovery.
- All three selected Commons source pages have been checked for existence, correct location, author and license. Forestry photo is Billy Hathorn CC BY-SA 3.0. Wikimedia pages establish photographer license only; NRHC operator policy remains separately unresolved.
