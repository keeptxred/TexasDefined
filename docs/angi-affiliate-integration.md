# TexasDefined Angi affiliate integration

Reviewed 2026-10-01 from the active CJ advertiser terms and current Angi link catalog supplied from the TexasDefined publisher account.

## Purpose

Angi is a contextual home-services monetization partner for TexasDefined. It should appear only when a page has clear home-service intent and TexasDefined can send the reader to the matching Angi service-request category.

The conversion action is an **Angi.com Service Request**: a customer submits a service request for a home-service job. The active CJ terms supplied to TexasDefined show a 1-day referral period, unlimited occurrences, standard locking after the 10th of the month, and a 25% commission rate. The 25% rate must not be described to readers as 25% of the contractor's project price; the supplied terms do not establish that interpretation.

## Placement rule

`public/angi-home-services.js` uses the page H1, meta description, and pathname to select a single service category. It does not scan the full article body for incidental mentions. This keeps placements aligned with the page's primary intent and reduces irrelevant affiliate modules.

Eligible route families are intentionally limited to editorial and guide surfaces with potential homeowner intent:

- `/article/*`
- `/guides/*`
- `/texas-living/*`
- `/moving-to-texas/*`
- `/real-estate/*`
- `/home-garden/*`
- `/property-tax-guides/*`

A page gets no Angi module when no governed service pattern matches.

## Tracking and disclosure

Every Angi CTA must:

- use the exact CJ/Angi tracked service-request URL supplied by the approved publisher account;
- use `rel="sponsored nofollow noopener noreferrer"`;
- expose `data-affiliate-partner="angi"` and matching first-party commercial attribution fields;
- emit the shared `affiliate_click` event with module `home-services`;
- disclose that TexasDefined may earn a commission from a qualifying service request at no additional cost to the reader;
- state that TexasDefined does not select, employ, or endorse individual service providers.

## Program restrictions

The active Angi terms supplied on 2026-10-01 require these controls:

- No sub-affiliates.
- No coupons or promotional codes.
- Negative matching is required for protected search terms.
- Protected SEM terms include Angi, Handy, Angie's List, HomeAdvisor, CraftJack, Angi Ads, Angi Leads, Angi Pro, and Angi Services.
- Search-marketing publishers must follow the Angi Special Terms and Conditions, including Exhibit A.

TexasDefined must not launch paid-search campaigns involving Angi until the current Special Terms and Exhibit A have been reviewed for the proposed campaign. The onsite contextual module is an editorial affiliate placement, not a paid-search campaign.

## Governed service links

The current module includes exact service-request destinations supplied through CJ for high-intent categories including roofing, HVAC, heating, plumbing, moving, foundations, remodeling, windows, fences, swimming pools, landscaping, concrete, flooring, painting, pest control, electrical work, handyman services, water treatment, siding, decks, doors, cleaning, land surveying, paving, pressure washing, and custom home builders.

Do not replace those tracked URLs with ordinary Angi homepage/category URLs. If Angi or CJ changes the publisher links, update the governed module from the new account-supplied link catalog and rerun validation before deployment.

## Production safeguards

`scripts/ci/verify-angi-production.mjs` verifies the deployed integration after a successful `Deploy TexasDefined production` workflow. The dedicated `.github/workflows/verify-angi-production.yml` post-deploy check fetches a representative home-services article plus the two deployed client assets and fails if the production bootstrap or governed affiliate markers are missing.

The production check protects these contracts:

- the representative page still loads the shared client affiliate bootstrap;
- `/angi-home-services.js` is not emitted directly from the SSR root shell;
- the deployed shared loader still creates and appends the Angi client script;
- the deployed Angi module still contains the approved CJ AID/network attribution and representative governed service-request categories;
- sponsored/nofollow attribution, first-party commercial metadata, disclosure language and the provider disclaimer remain present;
- Cloudflare challenge responses and non-2xx asset responses fail closed rather than producing a false green check.

`scripts/data/validate-angi-affiliate.mjs` also governs the production verifier and workflow wiring before merge. The Angi validation workflow syntax-checks the production verifier along with the two browser modules.

## Optimization rule

Measure Angi like the rest of the TexasDefined affiliate portfolio: contextual impressions and clicks first, then CJ service-request conversions, reversals, and realized commission. Do not expand Angi into unrelated Texas lifestyle pages merely because the headline commission rate is high.
