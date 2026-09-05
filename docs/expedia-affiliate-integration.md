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

The server-rendered root shell emits a tiny deferred first-party bootstrap at `/expedia-travel.js`. The client build excludes that bootstrap reference, so it does not consume the protected React `main-*.js` budget. The bootstrap watches client-side navigation and injects the stay-search surface only on approved travel routes.

The Expedia vendor script itself is never loaded during the initial page load. It is created only after a visitor clicks `Search Expedia stays`.

## Current placement

The centralized route guard covers:

- `/explore` and every `/explore/*` page.
- `/destination/*` guides.
- `/county/*` guides.
- `/sports-venue/*` individual venue guides, including golf and other event-driven sports trips.
- `/sports-venues/*` market and sport landing pages used to plan sports-travel weekends.
- `/event/*` guides.
- `/best-places-to-go-camping-in-texas`, the standalone statewide camping authority page where overnight trip planning is intrinsic to the reader intent.

This intentionally avoids unrelated reference, government, calculator, politics and general informational pages.

## Disclosure

Every rendered Expedia surface includes: `Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.`

## Performance behavior

- The first-party bootstrap is a static public asset and is not part of the protected React main-bundle byte count.
- The root shell emits the bootstrap only during SSR; the hydrated client bundle follows the original no-Expedia shell path.
- The bootstrap waits until page load before adding any Expedia surface, avoiding hydration changes.
- SPA route changes are handled centrally without adding Expedia imports to route templates.
- Expedia's third-party vendor JavaScript loads only after explicit visitor intent.

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` verifies the SSR-only first-party bootstrap reference, approved route guard, exact tracking values, click-triggered vendor script loading and disclosure. It is registered as a delegated validator in `validate-seo-ci-contract.mjs` so the normal validation gate protects the integration from silent removal.
