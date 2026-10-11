# TexasDefined Network — advertised benefits acceptance matrix

**Status: NOT CERTIFIED — full-customer launch is blocked until every public claim is actually delivered or the sole owner approves a transparent change to that claim.**

This checklist documents the visible promises in `src/routes/network.join.lazy.tsx` and the business owner capability in `src/routes/business.dashboard.lazy.tsx` and `src/routes/network.billing.lazy.tsx`. This is a **verification ledger**, not a marketing draft or permission to charge.

| Advertised feature | Existing implementation and verification required | Acceptance |
|---|---|---|
| Basic public name, category, city, hours, phone, service area and description | Reviewed published profile loader and public directory, authenticated editor approvals; real staged Basic application→review→publication→indexing | **Staging E2E outstanding** |
| Basic searchable profile | Directory and individually slugged pages; verified SEO release gating and conditional sitemap; real staged browser, search/filter and indexing metadata | **Staging E2E outstanding** |
| Plus $19.99/month, enhanced contact/website/social/description, gallery/FAQ and offer | Existing live Stripe price and UI; owner-bound Checkout and webhook entitlement; real test checkout→portal→cancel→renew, plus reviewed rendered fields and complete profile content | **Real Stripe test-mode E2E outstanding** |
| Plus basic listing performance statistics | **No Network-specific statistics/metrics table or read-side dashboard implementation found**. Existing owner dashboard shows membership, revisions and public profile, not per-listing reporting. Production Supabase schema query on October 11, 2026 returned zero matching Network metric/stat/view/click tables. | **NOT IMPLEMENTED / blocking advertised benefit** |
| Featured expanded media and review-controlled owner revisions | Existing private Featured revision and immutable media paths, RLS quotas, audited owner provisioning. Verify staged uploader, public published media and post-review render. | **Staging E2E outstanding** |
| Featured expanded performance insights | Same missing reporting source as Plus; no verified owner-level expanded reporting. | **NOT IMPLEMENTED / blocking advertised benefit** |
| Featured sponsored placements and sponsored business stories | Offered as **optional custom negotiations**, not default active entitlement. Separate site advertising features do not automatically prove Network Featured fulfillment. Sole owner must approve commercial terms, inventory, editorial labeling, approval and placement delivery in advance of any paid offer. | **Pricing and scope NOT APPROVED** |

**Release guard:** `planBenefitsDelivered` is now an independent, required acceptance evidence category in `src/data/network-atomic-launch-readiness.server.ts`. No release flag, Stripe key or Merge Gate success can substitute for actual customer benefit delivery.

**No unsupported claims:** Do not change the listed price, silently remove promised statistics, mark an unimplemented analytics screen as functional, imply sponsored editorial coverage, enroll Featured customers or publish these proposed terms without owner approval. To close these gaps, build authentic privacy-preserving per-business aggregate performance reporting and verify it in an isolated stage, or obtain documented owner approval to revise the product promises before the single coordinated launch.

**Privacy and measurement acceptance:** Count only events that can be measured accurately. Make clear whether a metric is page views, link clicks or something else; avoid claiming unique people, verified leads, conversions or attributable bookings without a valid method. Never publicly expose unpublished businesses, other owners' data, visitor IPs or raw identifiers. Owner scope should be enforced by verified Auth and independently tested RLS/privileged server logic. Handle crawlers, duplicate reloads, data retention and empty periods honestly. Expanded Featured reporting must provide a real incremental benefit rather than relabeling the Plus report.

**Evidence for launch:** Pass representative Basic, Plus and Featured journeys, including the exact fields, images, data retention, corrections, owner access, private views and reporting; record CI artifact URLs plus staging provider proof for each. Owner explicitly approves final plan benefits and refund/retention terms before billing customers.

## Implementation added on unmerged draft PR #4660 (not yet customer acceptance)

The earlier two reporting gaps now have actual implementation source on the draft branch: Plus 30-day observed listing-view and contact-click summary; Featured 30-day daily trends, contact-action breakdown, and seven-day comparisons. A private aggregate metrics table and service-only RPCs are in `supabase/pending/20261011210000_network_profile_daily_metrics.sql`. Cloudflare applies a dedicated rate limit, and a scheduled, bounded retention job automatically removes aggregates older than 35 days, **independently of Graph email availability**. Basic listings collect only anonymous aggregate counters and do not receive paid reports.

The application route verifies signed-in owner, exact assigned business, active membership, entitlement and published status before using the private read RPC. Synthetic rollback SQL and disposable real Supabase Auth/PostgREST test workflows exercise reporting without production writes. Staged full customer/Stripe/Graph acceptance is **still outstanding**. Do not interpret implemented or locally verified as commercially delivered, and do not mark `planBenefitsDelivered` passed until real end-to-end browser/provider verification.
