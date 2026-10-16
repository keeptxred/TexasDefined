# Casino getaways: lodging revenue and traffic scorecard

Started: 2026-10-15 (America/Chicago). Scope: `/explore/casinos` and the nine child guides.

## Active conversion path

- Reuse the site's existing Expedia search surface and the five-provider CJ Stay Nearby bootstrap. Do not create a new affiliate network, customer account, server API, or client bundle.
- Use **exact-property Hotels.com CJ deep links** only for listings confirmed to represent the named property: Kickapoo Lucky Eagle (Eagle Pass), Golden Nugget and L'Auberge (Lake Charles, Louisiana), and Choctaw Resort (Durant, Oklahoma). These are hotel bookings, **not** casino-gambling or sportsbook referrals.
- For Livingston, Leggett, Ischoopa and El Paso, allow the existing broad hotel search without inventing an on-site hotel or rates. Do not offer stays for the planned Naskila resort or Texas legal explainer.
- Sitewide Stay Nearby scripts already emit non-PII `affiliate_click` dataLayer events (partner, placement and page path). First-party analytics emits `partner_referral_shown` and `partner_referral_clicked` for visible clicked elements carrying `data-commercial-partner`, `data-commercial-placement` and associated `path`. Tracked placements begin `casino-stay-`; the exact-property link builder uses the existing CJ publisher account and allowlisted domains.
- The affiliate programs, cancellation terms and actual bookings are controlled by the merchant. A click is **not** a completed stay or commission. Reconcile completed/approved bookings and reversal/commission data from the CJ account before claiming revenue.

## Traffic baseline (GA4)

The connected GA4 property named **TexasDefined**, in the America/Chicago timezone, was queried on 2026-10-15 for landing pages containing `/explore/casinos` over October 14–15. It returned **zero rows** for sessions/users/conversions/revenue. Treat this as a zero-observed baseline for a newly launched page cluster, **not** proof of zero impressions or an indexing defect.

The separately connected HYPD Search Console list-sites result returned zero accessible GSC properties at that time. Therefore **Google search impressions, search positions and query counts are not yet available through that connection**. Never infer them from GA4 traffic. Connect the existing TexasDefined GSC domain property to HYPD before making organic ranking or indexing claims.

## Existing private analytics dashboard

The protected `/admin/partner-referrals` dashboard now includes a **Casino getaway hotel funnel** section computed from the same 60-day private referral aggregate query. It shows 30-day on-site referral clicks, CTA impressions, Expedia search activations, guide-by-guide performance, and only the exact-property Hotels.com offer placements. Blank states explicitly distinguish no referral events from no visitor traffic. It does not claim commissions or bookings and does not add new collector traffic or Cloudflare usage.

## Review queries (read-only; do not schedule a crawl)

1. **GA4 traffic:** Select page paths that start with `/explore/casinos`. Report sessions, engaged sessions, organic-search sessions, views and engaged-user rate over the last 7 and 28 *complete* days (exclude today's partial data).
2. **GSC discovery after connection:** Filter `page contains /explore/casinos`; review impressions, clicks, CTR, average position and query variants (e.g., `casinos in texas`, `casinos near houston`, `casinos near dallas`) over the last 28 days. Compare the preceding equal-length window once sufficient history exists.
3. **First-party travel referral funnel:** Aggregate `partner_referral_shown` and `partner_referral_clicked` where path starts `/explore/casinos`, by provider and placement. Count clicks and shown events with the same clean bot-filtered window; do not compare mixed windows or use raw browser automation exposures.
4. **Advertiser reconciliation:** In the existing CJ/Expedia reports, record referred orders, completed stays, canceled stays, locked commissions and paid commissions. Match publisher/partner and sub-campaign identifiers only if present in their actual reports; do not invent attribution joins.
5. **Decision rule:** Keep the first four exact-property options until they have meaningful exposure and downstream conversion samples. Existing travel routing governance uses at least 100 clean CTA impressions per partner before changing comparison partner. Never inflate provider payout or declare the new category profitable from referral clicks alone.

## Cost guardrails

No new paid browser rendering, scheduled Cloudflare Worker analytics jobs, GA4 query loops, automatically repeated full-site crawl or extra sitewide deployment gate is required. Use the repository's existing deployment change-plan and the first-party outcome aggregate already collected for travel CTAs.


## October 16 data-quality correction

The affiliate aggregates historically used a partner-only Analytics Engine sampling index and SUM(_sample_interval) while grouping reports by page. Cloudflare sampling weights can misstate the number of visits to a rare page when an index spans many pages. On October 6, Texas Motorplex showed 234 weighted hotel impressions on a GA4 day with one view; on October 8, MSR Houston showed 788 weighted impressions on a GA4 day with one view. These are **not validated customer exposures**. Attribution sources and GA4 coverage can also differ, so these two metrics are not interchangeable.

The first-party collector now groups only commercial impression/click indexes by sanitized page-path hash, and the browser suppresses repeat exposures caused by replacing an equivalent CTA element. This is a quality correction within the existing collection flow, not a new paid audit. Raw historical data remains. Use **2026-10-17 UTC or later** for comparative booking-link CTR and Orbitz/Travelocity routing decisions, after the deployed patch; still require the standing 100-clean-impression-per-provider minimum and actual advertiser conversion evidence.
