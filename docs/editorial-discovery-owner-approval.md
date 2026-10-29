# TexasDefined — Owner Approval Protocol for Discovery-Derived Pages

Established 2026-10-29. Review desk:
https://github.com/keeptxred/TexasDefined/issues/6380

## Who verifies what

**Automation + assistant:** verify factual claims against first-party operator,
organizer or official-agency sources; source-check dates, addresses, closures,
rights-cleared imagery, season/year, route/canonical duplication and actual
booking link relationship. Correct typos and source facts without asking the
owner to do research. Viator may suggest destinations but NEVER verifies an
event date, admission, operator identity or page-quality standard.

**Owner:** approve the editorial decision to release a **new** indexable
supplier-discovered authority page. Present a batch of 3–5 complete,
independently researched proposals in ChatGPT, with the existing-page
comparison and sources. Ask for one explicit decision per item or one
clearly scoped whole-batch approval. User can approve, reject, or request edits.
DO NOT say the user has approved unless their explicit reply does so.

**System:** a new DiscoveryEntity with `discoveryOrigin:
"supplier-candidate"` stays nonindexable until (a) it contains real original
editorial content, (b) independently verified official identity and location
sources, (c) quality and image permissions have passed and (d) a dated owner
approval points to the actual owner comment in issue 6380 or an explicit owner
GitHub pull-request review. The reference alone does not prove approval:
the assistant MUST inspect the actual comment/review and log the decision.
Always use the protected PR workflow. No scheduled job can set an approval.

## The exact review packet sent to the owner (per batch)

Title: `Batch DD — 3–5 Texas attractions, proposed publication`

| Place | Proposed action | Existing canonical | Official sources | Date checked | Image rights | Viator relationship | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Real independently sourced name | Enhance / publish / reject | Current route or None | Direct organizer/venue links | Actual date | Approved / image missing | Genuine admission / related tour / none | Awaiting owner review |

For each item explain **why this is useful beyond a provider listing**:
visitor logistics, accessibility, realistic expectations, what makes it
distinctive, relevant original photography and neighboring canonical pages.

User decisions: `Approve 1 and 3, revise 2`, `Approve the entire batch`,
`Reject 2`. If the user asks to continue without mentioning approvals,
continue research and tests, but **never infer new-page publication consent**.

## Weekly, source-only discovery report

`.github/workflows/weekly-viator-attraction-discovery.yml` collects bounded
nonindexable source candidates. It keeps the raw sanitized candidate report
in the short-lived GitHub Actions artifact and posts **counts only** to the
public approval desk issue (no supplier names, IDs, reviews or descriptions).
This is a discovery notification, not an approval request. Public GitHub
issues are indexable; this constraint is essential.

GitHub Actions artifacts may be accessible to repository visitors; avoid
private supplier prose and any contact/personal data. No Viator candidate
names or details are copied into the public issue.

**Critical distinction:** Posting a weekly summary does not discharge the
assistant's obligation to deliver actual vetted owner review packets. The
assistant must actively bring a small, fully researched batch to the user
in ChatGPT and ask for approval before publishing new source-discovered
indexable authority pages.

## Existing approved pages and emergency fixes

Improvements to a previously approved guide (current official date,
incorrect hours, factual corrections, internal links, CWV/layout and schema
repairs) should continue through normal CI without repeated owner approval.
Explicit owner approval applies to **new** supplier-discovered pages and major
editorial choices, not ordinary routine maintenance.

Never hold an urgent production/SEO repair awaiting a candidate review.
Do not change existing marketplace account portals; those remain deferred.

## Required test command

`node --experimental-strip-types --test
src/data/discovery/__tests__/entity-registry.test.ts`
and `node scripts/data/validate-unified-discovery-governance.mjs`.

If approval evidence cannot be inspected, leave the candidate
`awaiting-owner-review` and out of every indexable route and sitemap.
