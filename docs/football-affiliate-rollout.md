# Football fan affiliate rollout — October 17, 2026

## Live-capable vs pending inventory

- **Approved route**: Existing Hotels.com CJ affiliate account and verified `www.anrdoezrs.net/links/101876465/type/dlg/` redirect pattern, reused only when hotel/travel intent is plausible. Team pages offer a broad stay search only when a dated, sourced schedule has an unfinished future away/neutral game. The statewide Friday Night Lights hub and five football explainers show a generic optional road-trip planning link without fabricating event locations or availability.
- **Additional ready CJ partner**: RVshare, already accepted in the TexasDefined CJ publisher account, with a 4% reservation rate shown in the account-terms snapshot; reuse the existing `https://rvshare.com/` allowlisted deep-link mechanism from `public/stay-affiliate-options.js`. Its football travel CTA is limited to the same hotel/travel-intent context and explicitly does **not** promise stadium parking or tailgating. Do not count a click as a confirmed booking or commission.
- **Not yet approved**: Stadium seats, cushions, insulated blankets, approved-size clear stadium bags, portable chargers and rain layers. Their catalog is deliberately empty in `src/components/sports/FootballFanOffers.tsx`. Merchandising copy is not an affiliate link.
- **Existing first-party shop**: `/shop` remains available but must not imply school-affiliated or licensed merchandise.
- **School/team branded shirts**: separate school licensing/vendor workflow; never reuse school seals, team marks, or mascots without permission.

## CJ advertisers that actually sell football-stand gear

TexasDefined already holds a **CJ publisher account**. Do not direct the owner to Walmart, Impact, Amazon or another network as the first move.

- **DICK'S Sporting Goods — CJ advertiser 7345657:** https://public.cj.com/signup/publisher?advertiserId=7345657 . Official CJ application lists sporting goods, apparel and accessories, a 3-day cookie, and a product feed. This is the best broad inventory fit for bleacher seats, clear bags, warm layers, chargers and ponchos. **Application required; TexasDefined acceptance is not yet evidenced.** Verify category commission terms in the publisher account.
- **Coleman — CJ advertiser 5975700:** https://public.cj.com/signup/publisher?advertiserId=5975700 . Official CJ listing gives 3%–5% and a 30-day referral period. Coleman itself publishes https://www.coleman.com/sideline-sports.html naming a **Coleman Stadium Seat** for bleachers. This is a genuinely relevant first individual product. **Application required; TexasDefined acceptance is not yet evidenced.**
- **Rexing — already active CJ advertiser 5357356:** published account terms say 15% qualifying purchases and a 45-day referral period; it sells vehicle trip-preparation products. The existing governed catalog contains CJ link IDs for a jump starter and an inflator, but **not the actual tracked Get Link output**. Keep product CTAs off until verified links are obtained. Do not use ordinary merchant URLs or fabricate tracking IDs.

Once DICK'S or Coleman approves TexasDefined, obtain the exact CJ Get Link URL for each *specific product*, validate current availability and terms, and activate the governed catalog. Neither CJ advertiser listing is proof of approval or a live tracked offer.

## Recommended enrollment path

1. Apply for the website-oriented **Walmart Affiliate Program** at https://affiliates.walmart.com/ (official terms: https://affiliates.walmart.com/terms). Walmart says enrollment is free and uses Impact. Approval is **not** established by merely creating an Impact account; June 2026 operating terms say Walmart may decline applicants and sites should not use Walmart affiliate links before approval.
2. Alternative: https://www.scheels.com/affiliate-program (approval required). Its affiliate program can cover sports/outdoors, but verify eligible categories and program economics with the account before selecting products.
3. Use `https://texasdefined.com` as the publisher site and the Texas football guides as concrete content examples. Provide the site owner with the application to accept terms and connect the publisher account. Do not submit inaccurate tax, identity or payment details.
4. Once approved, obtain account-generated **tracked** URLs for five in-stock products (seat cushion; clear bag where stadium rules allow; fleece/blanket; rain poncho; power bank). Verify each redirect, product identity, commission-eligible category and geographic availability. Only then extend the vetted host/network allowlist and add offer records. Retailer-owned product photos require documented usage rights; generic unlicensed images or text-only cards are safer.
5. Keep affiliate disclosure before or alongside retail CTAs, add `rel="sponsored nofollow noopener noreferrer"`, open only on explicit user click, and record `affiliate_click` with partner, page and placement. Do not fabricate sale prices, discounts, merchant status, team licensing or available inventory.

## Coverage and acceptance checks

- Team profile: `FootballGameNightGuide` contains `FootballFanOffers`; only an unfinished future away/neutral game triggers a hotel offer, based on Texas-local date after hydration.
- Broad football guides: hub and the five reviewed football explainers offer optional travel planning; nothing claims a verified venue, specific next game, bookable admission or hotel.
- Quality: `node --test scripts/data/validate-football-fan-affiliate.test.mjs scripts/data/validate-football-game-night.test.mjs`; canonical `node scripts/ci/run-premerge-validation.mjs`; protected PR checks.
- Production: inspect desktop and mobile; confirm module presence, CTA disclosure, nonaffiliate merchandise status, sponsored rel, account-specific redirect, analytics event and absence of hydration/React errors. Do not generate synthetic human conversions, transact, or poll.
- Metric: compare clean qualified football-page views, CTA exposures, human affiliate outbound clicks, network-confirmed attributed purchases/bookings and **realized commissions** separately. GSC organic clicks are not affiliate sales.

## Governance

The current PR is a *pre-production change*, not proof of a successful deploy. Do not change the CSS or main JS performance ceilings to merge. Follow all protected checks; do not switch on direct sports sponsor placements (separate outreach hold) or allow paid purchases.
