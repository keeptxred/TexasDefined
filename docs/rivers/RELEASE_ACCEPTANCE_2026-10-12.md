# Texas river authority release acceptance — 12 October 2026

**Branch:** `feature/ten-river-authority-20261012`  
**Pull request:** https://github.com/keeptxred/TexasDefined/pull/4691  
**Status:** Implemented on PR branch; **not merged or independently certified on production**.

## Canonical page coverage

| River | Route | Work |
| --- | --- | --- |
| Guadalupe | `/article/texas-guadalupe-river-guide` | Existing basin article enhanced |
| Frio | `/article/texas-frio-river-guide` | New article |
| Comal | `/article/texas-comal-river-guide` | New article |
| San Marcos | `/article/texas-san-marcos-river-guide` | New article |
| Llano | `/article/texas-llano-river-guide` | New article |
| Colorado (Texas) | `/article/texas-colorado-river-guide` | Existing basin article enhanced |
| Brazos | `/article/texas-brazos-river-guide` | Existing basin article enhanced |
| Neches | `/article/texas-neches-river-guide` | Existing basin article enhanced |
| Sabine | `/article/texas-sabine-river-guide` | Existing basin article enhanced |
| Pecos | `/article/texas-pecos-river-guide` | New article |

## Completed source changes

- Canonical ten-river source of truth registers each watershed, relevant counties and specific existing related destinations.
- Every river gets unique authored fishing, public access, paddling, swimming, camping, trip planning, history and caution sections, using TPWD/TWDB/USGS/NWS plus operator sources.
- Specific official named access starting points are included with explicit warnings about leased or changing availability; no invented real-time operating status.
- Legacy five river bodies and canonical URLs are retained. Other TWDB basin guides remain distinct pages, not overwritten.
- New evergreen pages and future registry additions are automatically registered and integrated into the statewide rivers hub.
- Reciprocal links from county pages, destination pages, fishing-lake routes, fishing hub and camping hub, plus guide-to-guide/county/destination links. Geography does not imply the right to access a private riverbank.
- Established image assets were confirmed present in GitHub. Regional/illustrative images are explicitly identified, with pending exact-river image provenance.
- Permanent QA: `npm run river-authority:validate`, `.github/workflows/river-authority-contract.yml` and `docs/rivers/AUTHORITY_STANDARD.md`.

## Technical checks and evidence

- First river contract run `38299254836`: original river source validator **passed**; whole-repo `npx tsc --noEmit` **failed** with 909 TypeScript errors across multiple unrelated modules and routes. This is not certified as a clean global baseline.
- Focused river contract run `38300117095`: **successful** on commit `0850c2afb0988de2131d3d695ae54a0b34e1ffe3`.
- All ten registration records were parsed and examined; eight unique image paths were confirmed to exist in the repository.
- The latest branch may contain subsequent refinements not included in the cited completed workflow run. Recheck GitHub Actions against the latest commit before changing PR state.
- No claim of successful complete sitewide TypeScript checking, production browser QA, third-party indexed results or verified search rankings is made.

## Remaining release gates (unverified, not silently accepted)

1. Run focused CI and route/link/image checks on final branch HEAD; investigate new errors in changed files instead of accepting false positive baseline failures.
2. Render all ten routes in preview and check desktop/mobile, keyboard navigation, source links, metadata, canonicals, image behavior and structured data. Confirm no missing evergreen slug registration.
3. Verify site-specific fishing species/regulations and the existence/status of named access points against current official sources for each river (including seasonal leases and Pecos NPS ramp status).
4. Replace regional illustration/adjacent-watershed images with licensed, accurately sourced imagery of the *named* river where available. Log photographer/license/depicted reach before describing any image as original.
5. Build and quality-check verified access/ramp GIS coordinates, campsite/facility inventories and realistic locally sourced itineraries; avoid introducing guesses to meet volume targets.
6. Validate sitewide content differentiation, link completeness and discoverability (including related state park, lake, county and fishing pages).
7. Merge/deploy only after independent CI, editorial review and production smoke tests. Being more useful than an official river-authority website is an editorial aspiration, not a claim established merely by code or word count.

See `docs/rivers/AUTHORITY_STANDARD.md` for the enforceable requirements for subsequent river articles.
