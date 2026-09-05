# TexasDefined Expedia affiliate integration

## Purpose

Expedia stays are a trip-planning monetization layer, not a sitewide ad. The search appears only where a reader has a reasonable lodging decision to make after choosing a Texas destination, event or sports venue.

## Approved Expedia widget contract

- Program: `us-expedia`
- Line of business: `stays`
- Network: `pz`
- CAMREF: `1110lMy6E`
- PUBREF: `texasdefined-stays`
- Script: `https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js`

The implementation is centralized in `src/routes/__root.tsx`. A pathname guard renders the Expedia stay-search surface only on approved travel routes. Expedia's external script is not loaded during the initial page load; it is created only after a visitor clicks `Search Expedia stays`.

## Current placement

The centralized route guard covers:

- `/explore` and every `/explore/*` page.
- `/destination/*` guides.
- `/county/*` guides.
- `/sports-venue/*` guides, including golf and other event-driven sports trips.
- `/event/*` guides.

This intentionally avoids unrelated reference, government, calculator, politics and general informational pages.

## Disclosure

Every rendered Expedia surface includes: `Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.`

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` verifies the approved tracking values, click-triggered script loading, disclosure, centralized path guard and all approved route families. It is registered as a delegated validator in `validate-seo-ci-contract.mjs` so the normal validation gate protects the integration from silent removal.
