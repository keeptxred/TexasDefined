# TexasDefined Mardi Gras authority — recoverable project checkpoint

**Reconciled:** 2026-10-29 (America/Chicago)  
**Repository:** `keeptxred/TexasDefined`  
**Hub:** https://texasdefined.com/events/mardi-gras  
**Tracking:** [Image/licensing #5571](https://github.com/keeptxred/TexasDefined/issues/5571) · [Automatic propagation #6286](https://github.com/keeptxred/TexasDefined/issues/6286)

## Verified completed — do not redo

- Statewide hub and **11 distinct local guide pages** exist, including the two *separate* Beaumont organizers.
- [PR #6142](https://github.com/keeptxred/TexasDefined/pull/6142): Oak Cliff partner-confirmed **February 7, 2027, 1 p.m.**.
- [PR #6269](https://github.com/keeptxred/TexasDefined/pull/6269): Port Arthur **February 5–7, 2027**; Friday 6–11:30 p.m., Saturday noon–11:30 p.m., Sunday noon–7 p.m. These are **festival gate hours**, not parade start times.
- [PR #6282](https://github.com/keeptxred/TexasDefined/pull/6282), merge `ff9f0e20c58cce3710e9b6b28d162bd5f1ecf2a4`: two separately attributed, commercially reusable Beaumont images, the public festival's **2025** float and the charity's **2015** actual venue. [Production deployment #40880880342](https://github.com/keeptxred/TexasDefined/actions/runs/40880880342) and [cache/canonical acceptance #40882081649](https://github.com/keeptxred/TexasDefined/actions/runs/40882081649) both succeeded for that revision. Prior acceptance reported **14/14 scoped canonical checks**, not full 12-page visual QA.
- [PR #6287](https://github.com/keeptxred/TexasDefined/pull/6287), merged `a51275114a5ea4d41cd1bdab37fca97bef36f3ff`: seven-source observation ledger, 30-day run artifact, and stable watcher-infrastructure incident escalation. **This is observation only**, not the requested automatic publication path.
- Existing daily source monitor lives in `.github/workflows/sync-texas-events.yml` on **11:17 UTC** cron. Do not create another scheduler.
- At this checkpoint, **8 of 11 local guides** have compliant imagery; **3 remain unlicensed/noindex**.

## Current source and rights state (2026-10-29)

- **Orange**: city's official page still says 2027 dates are pending; February 7, 2026 is *historical*.
- **Beaumont, public Mardi Gras of Southeast Texas festival**: 2027 schedule not reliably confirmed. Never substitute the independent January 23, 2027 **Circle of Hope Pardi Gras charity**.
- **Texas City Mainland Mardi Gras**: 2027 parade not authoritatively confirmed; past 2026 program and unrelated gala dates do not qualify.
- **Bandera**: official detailed event page says **January 28–31, 2027** while the same tourism site's save-the-date says **January 28–30, 2027**. Saturday January 30 parade is confirmed; Sunday remains disputed.
- **Port Arthur**: festival gate windows confirmed; individual 2027 parade times/route, closures and ticket terms still pending.
- **Image blockers**: Port Arthur, Crystal Beach parade, Orange riverfront event. Existing requests sent October 27 local / October 28 UTC via **admin@texasdefined.com** in Microsoft Outlook. Review of available mailbox messages on October 29 found **no licensing approvals**. Previously arranged follow-up review **November 4**; check its actual schedule before sending duplicate inquiries.
- Wikimedia Commons and other archival image searches did not establish a fresh event-specific commercially licensed photograph suitable for any of these three guides. **Do not replace them with photos from other cities, hurricane damage, generic Mardi Gras, unlabeled historical material or unlicensed organizer photos.**
- Preserve each individual page's image-based `noindex` and sitemap exclusion until commercial reuse rights and truthful exact-location attribution pass current site policy.

## Patch in this PR

- Adds explicit event slug / organizer identity mapping to all seven watcher records (including null for Texas City, which lacks a local guide).
- Fails closed on unexpected official-page event identity even if date-like strings match.
- Detects newly published Orange 2027 dates even if the **old** announcement-pending banner remains on the page; opens the existing deduplicated review issue instead of silently accepting an unchanged state.
- Adds focused unit fixtures. **Does not** claim that fully automatic source-to-publication propagation is done.

## Remaining priority work (do not close the two issues yet)

1. **#6286 (highest priority):** implement normalized, timestamped, event-specific source facts, persisted last-known-good state and a *tested* conservative multi-surface candidate update that changes the authority guide, statewide hub confirmed/pending, events calendar, schema and SEO consistently. Use only existing Github Actions + protected PR/merge/release. Safe unambiguous updates should require no manual action. Conflicting dates, organizer ambiguity, cancellation uncertainty, source failures and rights disputes **fail closed with one deduplicated issue**. Avoid direct writes to main and weekly/sitewide scans. Tests must exercise confirmed-to-changed, pending-to-confirmed, outage, wrong organizer, conflicting Bandera dates, duplicate avoidance, calendar/schema parity and branch-protection behavior.
2. **#5571:** obtain **explicit permission** or independently verified accurate/rights-cleared imagery for the three event locations. Rights and visible attribution required; never auto-lift noindex without image compliance. No request follow-up before due date; Outlook only.
3. Recheck any new 2027 facts only against official organizer/city/tourism source. Never fabricate date from a historical source, gate time or unrelated charity.
4. Run targeted **12-page production acceptance** (11 event guides + `/events/mardi-gras`): HTTP/canonical, date identity, hero delivery, visible image attribution, index/sitemap, Event or CollectionPage JSON-LD, links, mobile+desktop visual overflow, and CDN freshness. Existing successful 14-page canonical spot check **does not fulfill** this requirement.
5. Verify protected CI then actual deployment of each new merge; cite run URLs and deployed SHA. Resolve #5571 and #6286 **only after** their own criteria pass. Update this checkpoint with merge SHAs, run links, image count, and external blockers.

## Recovery instructions

Start from **latest `main`**. First inspect PRs/issues for concurrent work, this checkpoint and the exact workflow/source-monitor tests. Reconcile before editing; do not recreate completed pages or invoke Cloudflare OAuth credentials in a loop. The production Worker is already connected. Use admin@texasdefined.com **in Outlook**, never Gmail, for rights inquiries. Preserve protected CI, existing image policy, bundle-size budgets and low-cost infrastructure. Keep working on independent tasks if one external rights/source dependency is blocked.
