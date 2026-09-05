# TexasDefined Expedia affiliate integration

## Purpose

Expedia stays are a trip-planning monetization layer, not a sitewide ad. The search appears only where a reader has a reasonable lodging decision to make after choosing a Texas destination, event or sports venue.

## Approved Expedia widget contract

- Program: `us-expedia`
- Line of business: `stays`
- Network: `pz`
- CAMREF: `1110lMy6E`
- PUBREF: `texasdefined-stays`
- Vendor script: `https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js`

The root shell includes a tiny deferred first-party bootstrap at `/expedia-travel.js`. That bootstrap is kept outside the counted React `main-*.js` bundle, watches client-side navigation, and injects the stay-search surface only on approved travel routes.

The Expedia vendor script itself is never loaded during the initial page load. It is created only after a visitor clicks `Search Expedia stays`.

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

## Performance behavior

- The first-party bootstrap is a static public asset and is not part of the protected React main-bundle byte count.
- The bootstrap waits until page load before adding any Expedia surface, avoiding hydration changes.
- SPA route changes are handled centrally without adding Expedia imports to route templates.
- Expedia's third-party vendor JavaScript loads only after explicit visitor intent.

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` verifies the deferred first-party bootstrap reference, approved route guard, exact tracking values, click-triggered vendor script loading and disclosure. It is registered as a delegated validator in `validate-seo-ci-contract.mjs` so the normal validation gate protects the integration from silent removal.
