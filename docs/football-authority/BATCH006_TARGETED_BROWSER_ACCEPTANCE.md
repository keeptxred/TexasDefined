# Targeted Batch 006 browser QA

The 25 assigned school routes are checked at CSS widths 1366, 390 and 320. The verifier tests source identity, hydrated page SEO, canonical, FAQ/structured data, current sourced record, rendered schedule, image delivery/alt text and overflow. Each county receives one reciprocal-link check. Reports/screenshots are uploaded as GitHub Actions artifacts.

This job runs only on direct changes to its two harness files or manual workflow dispatch. No production-deploy subscription, sitewide scan, scheduled polling, subscriptions, Cloudflare Worker CPU job or automatic Supabase acceptance is added. It checks **whatever revision is live at the time**. A PR head SHA is not the Cloudflare deployment SHA. A passing browser report does not certify photo licensing, factual editorial review, accessibility by people, first-party coaching/stadium evidence or the nine-dimensional Supabase acceptance procedure.
