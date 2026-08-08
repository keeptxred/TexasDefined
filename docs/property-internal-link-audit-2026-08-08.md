# Property internal-link audit — 2026-08-08

Scope: TexasDefined property authority cluster only.

## Entry points verified

- `/property`
- `/property-tax-guides`
- `/property-tax/counties`
- `/browse/counties`
- `/property-tax-calculators`
- `/decide/property-taxes`

## Core guide targets verified

- `/learn/property-taxes`
- `/learn/appraisal-districts`
- `/do/homestead-exemption`
- `/do/property-tax-protest`
- `/learn/property-tax-payments`
- `/learn/property-tax-deadlines`
- `/learn/property-tax-appeals-arbitration`
- `/learn/agricultural-valuation`
- `/learn/wildlife-management-valuation`
- `/learn/disabled-veteran-property-tax-benefits`
- `/learn/over-65-property-tax-guide`
- `/learn/mud-taxes-explained`
- `/learn/homebuyer-property-tax-checklist`

## Production calculator targets verified by source route and toolkit inbound link

- `/texas-homestead-savings-calculator`
- `/texas-property-tax-protest-savings-calculator`
- `/texas-property-tax-escrow-calculator`
- `/texas-over-65-property-tax-calculator`
- `/texas-disabled-veteran-property-tax-calculator`
- `/texas-agricultural-valuation-calculator`
- `/texas-property-tax-county-comparison-calculator`

## Additional property-hub calculator targets verified

- `/texas-homeownership-cost-calculator`
- `/texas-home-affordability-calculator`

## Dynamic county links

The county directory and county-template links use `/property-tax/county/$county`. County lookup is backed by the 254-record county master dataset, with invalid slugs returning not-found and non-canonical slug casing normalized to the canonical lowercase slug.

## Incoming-link / orphan review

- The property hub links to the guide library, counties, calculator toolkit and cornerstone guides.
- The guide library links to every specialized property guide.
- Shared guide navigation links back to `/property`, `/property-tax-guides`, `/property-tax/counties` and `/property-tax-calculators`.
- The calculator toolkit links to every production property-tax calculator listed above.
- County pages link back into the property hub, calculator toolkit and core guides.
- No confirmed orphan was found in the defined property cluster.

## Duplicate-link review

Repeated links in a guide are limited to distinct navigation contexts (top property navigation, sidebar tools, related guides, previous/next). These are intentional navigation repetitions rather than duplicate content targets requiring removal.

## Confirmed issue fixed during audit

The legacy quick estimator at `/decide/property-taxes` previously defaulted to a `$140,000` exemption and applied it to one combined local tax rate. That could imply the statewide school-district residence-homestead exemption applies identically to every taxing unit. The route now accepts taxable value directly and directs exemption scenarios to the production calculators.

## Generated route tree

`src/routeTree.gen.ts` is generated output and can lag source-route commits in Git. The Vite configuration is provided by `@lovable.dev/vite-tanstack-config`, which includes TanStack Start/router generation. Do not hand-edit the generated route tree; source files under `src/routes` are the maintained route definitions and generation occurs during dev/build.

## Result

- Confirmed broken internal routes found: **0**
- Confirmed property-cluster orphans found: **0**
- Accuracy-related routing/calculator issue fixed: **1**
