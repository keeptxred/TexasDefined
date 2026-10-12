# TexasDefined Business Network — Independent advertising and website-hosting products

**Owner clarification: October 12, 2026. Current architecture direction.** Supersedes the bundled “four-tier Website plan” specification dated October 11. No amounts described in prior examples are final hosting prices. **This document is a product contract, not evidence that customer enrollment, hosting or billing has been built.** PR #4660 remains a draft until the distinct products are truly implemented and tested.

## Two distinct products

**Advertising / directory placement**
- **Basic / free:** short, verified, relevant business listing. Default eligible placement.
- **Expanded listing:** longer paragraph, photo and contact details, above free results in a qualifying listing section.
- **Featured:** richer listing and link to the business's actual online home (external domain or TexasDefined hosting), above Expanded listings.
- **Priority:** highest eligible paid-placement band among businesses that genuinely serve that particular place/topic; not a promise of an absolute first position.
- All paid placement in applicable discovery modules is identifiable as **Sponsored** and kept distinct from independent editorial guidance. Organic eligibility is determined first from accurately verified service area, categories and other relevance signals; advertising may only sort the already eligible candidates. Never inject an unrelated advertiser or claim paid placement is an editorial endorsement.
- Paid advertising pricing and bundle discounts are still to be decided. Existing Plus Stripe configuration is legacy infrastructure, **not authority to create new price IDs or start a price-change checkout flow**.

**Website hosting — purchased separately**
- **Starter:** one actual addressable page, initial working capacity of five gallery images.
- **Business:** three actual addressable pages, initial working capacity of ten gallery images.
- **Premium:** five actual addressable pages, initial working capacity of fifteen gallery images.
- Every tier supports customer-managed business information, contact details, social links, descriptions/services, photos, regular updates/reports (as a section on one-page sites; optionally their own page on larger sites), responsive template design, mobile navigation, appropriate accessibility and grounded SEO.
- The same platform renders all three types, with server-verified **page and image quotas** and consistent design. No custom HTML/JS execution, third-party theme/plugin installs, open-ended bespoke design, unlimited storage, unsupported search ranking promises or TexasDefined-controlled customer inbox.
- The owner may make unlimited edits within reasonable upload limits and content policies; publish safely with verified ownership and editorial controls, rate limits, versioned draft/published history and moderation. Do not conflate unlimited edits with unlimited media files or instant unmoderated publication.
- A hosted website does **not** automatically purchase advertising, and an advertiser can link either an existing website or a hosted one without buying hosting.
- Hosting prices, any setup fee, domains, business email and combined bundle terms are **not final**.

## Site URLs and lifecycle

Business websites will live within TexasDefined. Prefer a short canonical URL like `texasdefined.com/jimmys-fishing` if verified slug reservation can prove it cannot collide with any existing or future editorial route; otherwise provide an equally stable business namespace and optional root forwarding after owner approval. Multi-page paths must be unique and canonical, e.g. `/services`, `/reports`, `/contact` beneath that business URL. Do not create pretend “pages” that are only sections on a single URL.

Each business has independent advertising status and hosting status. A hosted-page revision requires an enabled owner account, verified paid **hosting** entitlement, ownership-bound draft, tier quota enforcement, reviewed publication, file ownership/storage checks, safe content rendering, and paid subscription status. Changing or canceling an advertising subscription must not delete a separate paid website. Conversely a hosting cancellation must not silently remove the free directory listing. Only published pages go into internal links, XML sitemaps, structured data and crawlable SSR pages. Stage/preview/private drafts stay `noindex` and private.

## Engineering sequence and acceptance

1. Keep existing Network Plus/payment and RLS guards unchanged until independent replacements have been proven. Source of truth is the business identity, with distinct `advertising_plan` and `hosting_plan` entitlements and Stripe subscription IDs; never encode both in one old `plan` column or infer service from a client claim.
2. Create a **pending, nonproduction** versioned SQL migration for website accounts, pages, revisions, immutable uploads, asset ownership, account limits and RLS; demonstrate migrations with disposable replay and two real synthetic owners before any shared Supabase change.
3. Implement one rendered page template plus navigable page components and an owner editor with explicit draft/review/publish workflow; add rate-limits, image conversion/limits, unique slug reservation and report/news management.
4. Implement independent Stripe billing and webhook reconciliation per product with exactly-once events, cancellation and failure recovery, test/live price isolation and safe upgrade/downgrade quota behavior.
5. Implement context-appropriate advertising module placements that apply verified relevance **before** sponsored priority; use disclosed sponsored labels and fair within-tier rotation without claiming fixed top positions.
6. Run browser, accessibility, SEO, concurrency, tenant isolation, payment, media quota, cancellations, portability and final all-products release acceptance. The existing one-cutover acceptance contract remains in effect and must gain independent advertising/hosting end-to-end evidence.

**What is implemented in the source as of this document:** the separate products' design-contract module, per-tier page/photo draft limits, pure priority sorting helper for already eligible businesses, and a two-product join-page preview. **Not yet implemented:** hosted-site SQL schema, live render/edit routes, portal/billing for hosted sites, production-grade relevance engine, supplier integrations, independent product subscriptions. Do not describe any of these as delivered based on the preview alone.

## Commercial discipline

Track actual customer acquisition, conversion, support hours, photo/storage use and gross margin. Avoid licensing stockpiles, fixed distributor fees and unclear annual commitments before demand exists. Final numbers only after real provider fees and a justified customer value proposition.
