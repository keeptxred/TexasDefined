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

## Complete historical source inventory — 2026-10-11

Recovered all **11 of 11** historical route files at KeepTXRed commit `a8a2a24bc9435b670ef82f8c68df5264b52791a2`. Recovery does **not** establish that old facts are current.

| Historical source route | Historical coverage | TexasDefined target | Gap |
| --- | --- | --- | --- |
| dmv.cdl-classes | weight ratings, class comparison, commercial/noncommercial distinctions, restrictions, FAQs | /texas-drivers-license#cdl-classes-endorsements | Missing noncommercial comparison, examples, FAQs |
| dmv.cdl-endorsements | H/N/P/S/T/X, restrictions, endorsement planning, FAQs | /texas-drivers-license#cdl-classes-endorsements | Missing restrictions and detailed application scenarios |
| vehicles.duplicate-titles | VTR-34, lienholders, mail/in-person, waiting period, rejections, FAQs | /texas-vehicle-registration#duplicate-titles | Missing rejection troubleshooting and specific current procedures |
| vehicles.buying-a-car | dealer/private distinction, red flags, title timing, FAQs | /texas-vehicle-registration#vehicle-sale-checklists | Missing dealer-specific process and fraud scenarios |
| vehicles.selling-a-car | transfer notification, plates, toll tags, recordkeeping, FAQs | /texas-vehicle-registration#vehicle-sale-checklists | Missing deeper seller protection and transaction examples |
| vehicles.private-party-sales | county-office meetup, tax/SPV, transit permit, fraud | /texas-vehicle-registration#vehicle-sale-checklists | Missing permit, tax examples and safer transaction details |
| vehicles.personalized-plates | plate approval, ordering, renewal, transfer, FAQs | /texas-vehicle-registration#personalized-plates | Missing rejection examples and renewal/transfer specifics |
| vehicles.auto-insurance-requirements | liability, optional coverage, proof, lenders, FAQs | /texas-vehicle-registration#texas-auto-insurance | Missing optional coverages and insurance shopping detail |
| vehicles.inspections | 2025 reform, equipment, emissions, commercial failures, FAQs | /texas-vehicle-registration#texas-vehicle-inspections | Missing detailed exemptions, equipment and failure guidance |
| vehicles.financial-responsibility | evidence, SR-22, noninsurance alternatives, lapses, FAQs | /texas-vehicle-registration#texas-auto-insurance | Missing SR-22 and legal alternatives in depth |
| vehicles.disabled-parking | placards, medical eligibility, renewal, veterans, misuse, FAQs | /texas-vehicle-registration#disabled-parking | Missing credential comparisons, renewal and misuse specifics |

**Disposition:** all 11 source files recovered; none of the 11 are yet fully certified as migrated. Target anchors represent initial coverage, not standalone authority parity. Expand high-intent topics where user tasks warrant dedicated pages, and verify against current primary sources before adding exact procedural details.

## CI triage — October 12, 2026

Inspected GitHub Actions **Merge Gate** run `38114873584` for commit `dc13722d763bbf0c8d4271f8bd7606448e275a72`. The canonical pre-merge validation failed at `npm run performance:validate`: main client bundle `1,829,520` bytes versus budget `1,829,000` bytes (**520 bytes over**). The same commit's `Site quality watchdog` and `Audit indexable static orphan links` workflows concluded success. A prior run on commit `4a41eb5769277cc3402726804da2f0883185e95d` was cancelled and does not establish a passing gate. This is a real **merge blocker**. Do not raise the performance budget merely to force a pass. Investigate shared eager imports / chunk boundaries, apply a measured size reduction, and rerun the full canonical gate on the eventual merge head.

Compared `src/routes/texas-dmv.tsx` with current `main`: the original already had three FAQ entries and the same `buildPrioritySearchHead` call signature; the migration modified and expanded them. The helper supports `data.faq` and emits FAQPage schema, so the route is not obviously broken by an unsupported SEO helper parameter. The FAQ entries must nevertheless remain consistent with visible on-page content.

**Release state: BLOCKED — performance gate failed; branch drift and editorial/browser acceptance remain.**

## October 15, 2026 — current-main reconciliation gate

Fresh GitHub comparison: migration branch **15 ahead / 476 behind main**. The branch is stale enough that direct merge is unsafe without a rebase or new branch from current main.

Current-main route comparison:
- `texas-dmv.lazy.tsx`: main 322 bytes, migration 4,207 bytes.
- `texas-drivers-license.lazy.tsx`: main 356 bytes, migration 10,458 bytes.
- `texas-vehicle-registration.lazy.tsx`: main 3,637 bytes, migration 20,771 bytes. Main retains `license-plates` and `title-transfer` anchors; migration adds other sections.
- `texas-dmv.tsx`: main 1,614 bytes, migration 2,070 bytes; existing FAQ metadata and helper pattern remain on main.

At branch commit `587f457716dbeee85ca4e0f065c76f82602d9512`, GitHub Actions **Merge Gate failed**, while site quality watchdog and orphan-link audit passed. No release approval.

**Required next implementation:** create a fresh branch from current main; port changes as small isolated patches rather than replacing route files; preserve current route behavior; fix the measured client-bundle budget regression; rerun canonical validation; perform current official-source review and visible content/schema parity; only then mark PR #4624 superseded and consider merging the replacement. Do not merge the stale PR.
