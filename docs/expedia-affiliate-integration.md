# TexasDefined Expedia affiliate integration

## Purpose

Expedia stays are a trip-planning monetization layer, not a sitewide ad. The widget appears on Explore and other surfaces where a reader has a reasonable lodging decision to make after choosing a Texas destination, event or sports venue.

## Approved Expedia widget contract

- Program: `us-expedia`
- Line of business: `stays`
- Network: `pz`
- CAMREF: `1110lMy6E`
- PUBREF: `texasdefined-stays`
- Script: `https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js`

The shared component lives in `src/components/affiliate/ExpediaStaySearch.tsx`, which centralizes the approved tracking values and widget markup. Expedia's external script is not loaded during the initial page load; it is created only after a visitor chooses to search Expedia stays.

## Current placement

The Expedia stay search is integrated into:

- `/explore` as a statewide stay-planning handoff.
- Every `/explore/$category` page through the shared category template.
- `/destination/$slug` guides through the existing destination booking layer.
- `/county/$slug` guides through the county destinations layer.
- `/sports-venue/$slug` guides, including golf and other event-driven sports trips.
- `/event/$slug` major-event guides.

This placement intentionally avoids unrelated reference, government, calculator, politics and general informational pages outside the Explore travel system.

## Disclosure

Every widget placement uses the shared disclosure: `Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.`

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` verifies the approved tracking values, click-triggered script loading, disclosure and required travel-intent placements. It is registered as a delegated validator in `validate-seo-ci-contract.mjs`, so the normal SEO validation gate protects the integration from being silently removed.
