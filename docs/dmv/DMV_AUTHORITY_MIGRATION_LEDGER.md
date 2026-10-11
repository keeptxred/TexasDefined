# Texas DMV and Driver Services — Authority Migration Ledger

Started: 2026-10-11
Source: keeptxred/texas-heartland-hub, historical branch agent/dmv-task-1
Destination: keeptxred/TexasDefined
Owner: TexasDefined (KeepTXRed retains legacy 301 redirects)

## Non-negotiable publication gates
- Preserve existing TexasDefined URLs and architecture; do not copy old TSX routes from the other application.
- Research each topic using TxDMV, DPS, Texas Comptroller, TDI, FMCSA, and Texas statutes as applicable.
- Distinguish verified facts from changing prices, forms, dates, exemptions, and county procedures.
- A page must solve a distinct visitor task with step-by-step instructions, eligibility, exceptions, examples, official sources, FAQ where useful, editorial verification date, and appropriate cross-links.
- Validate route availability, metadata, schema, mobile/accessibility, build, internal links, sitemap, and live deployment before marking complete.
- Prefer expanding existing pages when a standalone page would be redundant. Do not claim to outrank an official source without evidence.

## Existing destination coverage confirmed from GitHub
- /texas-dmv — priority-search hub (currently short overview).
- /texas-drivers-license — priority-search driver licensing overview.
- /texas-vehicle-registration — overview with plates and title-transfer sections.
- /texas-vehicle-registration-renewal — linked existing guide.
- /texas-vehicle-registration-fees-taxes — linked existing guide.
- /find-my-dmv — office finder.
These are not yet certified as equivalent to all historical KeepTXRed guides.

## Migration queue (NOT YET CERTIFIED)
1. CDL classes, endorsements, CLP/ELDT, medical certification and exemptions.
2. Duplicate, corrected, bonded, salvage, and rebuilt titles.
3. Buying, selling, and private-party sales; title, taxes, VIN, liens and seller notification.
4. Personalized, specialty, disabled, veteran plates and temporary permits.
5. Disabled parking placards: VTR-214, eligibility, renewal, replacement, ISA.
6. Liability insurance and proof of financial responsibility; minimums and alternatives.
7. Post-2025 safety inspection and emissions requirements, including Bexar County transition.
8. Registration, renewal, fees, tax and new-resident requirements.
9. DPS ID, REAL ID, renewal, replacement, appointments and document checklist.
10. Audit every old KeepTXRed 301 redirect for closest equivalent TexasDefined destination.
11. Check route cross-links, SEO, schema, source freshness, build, browser QA, and production.
12. Document final disposition and archive obsolete branch only after acceptance.

## Progress
- [x] Verified current KeepTXRed main routes redirect toward TexasDefined.
- [x] Located TexasDefined's existing DMV, driver-license, registration and fees routes.
- [x] Created migration branch and ledger.
- [ ] Independently research and implement all content gaps.
- [ ] Complete technical, factual, and production acceptance.

Avoid creating parallel, duplicate site sections or copying historical content without independent fact-checking.

## Implementation checkpoint — 2026-10-11

The following changes are committed to draft PR #4624, **not yet accepted or deployed**:
- /texas-dmv: task-first navigation and official agency references; route FAQ and metadata additions.
- /texas-drivers-license: DPS credential decision guide, REAL ID, CDL and ELDT source links.
- /texas-vehicle-registration: buyer/seller checklists; duplicate title; disabled parking; inspection; liability insurance and financial responsibility; personalized plates.

**Important distinction:** a topical section is not proof that the original historical guide has been fully migrated or that TexasDefined is the leading source. All sections still need a primary-source line-by-line factual audit, substantive depth assessment, internal link and schema review, build validation, and rendered browser verification. Do not mark the migration queue complete based only on sections being present.

### Priority remaining work
1. Fetch the historical KeepTXRed route contents at their original commit SHAs and make a source-to-destination coverage matrix. Preserve useful facts only after verification.
2. Research CDL class/endorsement requirements, medical certification, CLP and ELDT in depth, including applicable exceptions; decide whether a standalone authority route is warranted.
3. Check current TxDMV/TDI/DPS sources for accuracy, especially title forms and submissions, placard certification, inspection county transitions and proof-of-financial-responsibility alternatives.
4. Identify thin sections requiring dedicated pages, practical examples, county-level variations and citations.
5. Check all legacy KeepTXRed redirect destinations and correct broad or misleading matches.
6. Run build, SEO, accessibility, link and production regression checks. Obtain passing CI before merge.

### Quality caveat
No live external primary-source retrieval or test run has been completed in this checkpoint. Treat factual statements and outgoing source URLs as awaiting verification.

## Historical source recovery and branch drift — 2026-10-11
- Successfully retrieved the historical KeepTXRed `src/routes/dmv.cdl-classes.tsx` at commit `a8a2a24bc9435b670ef82f8c68df5264b52791a2`; historical content is recoverable by commit ref despite the retired branch.
- The old CDL class article has deeper vehicle examples, restriction discussion and FAQ than the current destination section. **Not yet fully migrated**; retain this gap for fact-checked expansion.
- Compared migration branch to current main: **10 commits ahead and 3 behind**, with five changed files. Refresh against latest main before merging and resolve any conflicts without overwriting unrelated changes.
- Do not equate committed section coverage with completed historical migration or independent authority certification.
