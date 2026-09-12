# TexasDefined Expedia + Stay Nearby affiliate integration

## Purpose

Expedia stays are a trip-planning monetization layer, not a sitewide ad. `Stay Nearby` is the context-first layer above that search experience: it can surface a small set of genuinely useful hotel choices for a venue, event, destination or city without turning the page into an affiliate directory.

The system deliberately separates **editorial relevance** from **affiliate activation**. A hotel can be included because its location is useful even when TexasDefined does not yet have a verified property-specific affiliate link. In that case, the card falls back to the approved Expedia stays search instead of inventing a deep link.

## Approved Expedia widget contract

- Program: `us-expedia`
- Line of business: `stays`
- Network: `pz`
- CAMREF: `1110lMy6E`
- PUBREF: `texasdefined-stays`
- Vendor script: `https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js`

The server-rendered root shell emits a tiny deferred first-party bootstrap at `/expedia-travel.js`. The hydrated client build excludes that bootstrap reference, so the Stay Nearby logic does not consume the protected React `main-*.js` budget.

The Expedia vendor script itself is never loaded during the initial page load. It is created only after a visitor clicks a hotel-card search fallback or the broader `Search all nearby stays` control.

## Stay Nearby architecture

`public/stay-nearby-hotels.json` is the first-party hotel relevance registry. Each active property can carry:

- a stable property ID and name
- city / visitor-area context
- optional **verified** coordinates for future geographic ranking
- provider-agnostic `bookingTargets`
- optional rights-qualified property imagery
- one or more contextual relationships for `venue`, `event`, `destination` or `city`
- deterministic relevance rank
- user-facing geographic context
- a proximity statement only when backed by the attached source
- a short supported differentiator
- source URL and verification date

The bootstrap exposes:

```text
window.TexasDefinedStayNearby.select(context, limit?)
window.TexasDefinedStayNearby.mount(context, target)
window.TexasDefinedStayNearby.refresh()
```

A redesign branch can provide `[data-stay-nearby-slot]` and let the bootstrap mount into that location. Without a slot, the current integration appends the surface to `#main`, preserving the existing centralized behavior.

Supported context shape:

```text
{
  kind: "venue" | "event" | "destination" | "city",
  key: "<stable-slug>",
  city?: "<verified city>",
  neighborhood?: "<verified neighborhood-key>",
  coordinates?: {
    latitude: number,
    longitude: number,
    verified: true
  },
  allowBroadFallback?: boolean
}
```

Venue and event contexts do **not** fall back to generic city-wide hotel lists by default. Explicit curated relationships win. City contexts may use neighborhood/city fallback, and coordinate ranking is available only when both sides are marked verified. Computed geographic distance is a ranking signal only; it is never converted into a displayed walking/driving distance.

## Carousel behavior

The curated surface uses native horizontal scrolling with scroll snap:

- three visible cards on desktop
- a partial-next-card cue on mobile
- touch/swipe through native overflow scrolling
- previous/next controls
- keyboard Arrow Left / Arrow Right plus Home / End
- focus-visible treatment and reduced-motion handling
- no autoplay

The card remains intentionally spare: hotel name, useful geographic context, sourced proximity where available, one supported differentiator, and either a verified property affiliate CTA or the Expedia-search fallback. TexasDefined does not cache or display nightly pricing.

## Initial venue pilots

The first registry version contains exactly three curated choices for each of:

- `/sports-venue/amon-g-carter-stadium`
- `/sports-venue/gerald-j-ford-stadium`
- `/sports-venue/globe-life-field`

The ranking is explicit and source-backed. These pilot entries intentionally do not contain fabricated venue coordinates or inferred walking/driving distances.

## Property affiliate deep links

Expedia's Creator tools support links to individual property pages, but tracked links are account-generated. Do not infer or hand-build an affiliate URL format.

A property-specific CTA may render only when its `bookingTargets[]` entry has:

```text
provider: "<provider>"
affiliateUrl: "https://..."
verified: true
```

Until a verified account-generated property link is placed in the registry, the card CTA opens the already-approved Expedia search widget. This keeps monetization functional without pretending a generic or untracked URL is a property affiliate deep link.

## Property imagery

Do not scrape or hotlink Google Images, hotel sites, Expedia pages, Tripadvisor, Booking.com, social media or other third-party pages.

For the current Expedia program, property imagery may be used only under the provider's property-referral terms. The integration therefore requires all of the following before a property image can render:

1. the asset was obtained through the approved Expedia Creator Toolbox workflow
2. the image is stored as a first-party TexasDefined asset rather than a remote scrape/hotlink
3. registry metadata marks `rightsSource: "expedia-creator-toolbox"`
4. `bookingProvider` matches a verified property-specific affiliate target for that hotel

If any requirement is missing, the carousel renders an intentional text-based geographic fallback panel. The initial nine pilot cards use that fallback because no account-generated property links or approved downloaded property images are currently stored in the repository.

## Current placement

The centralized route guard covers:

- `/explore` and every `/explore/*` page
- `/destination/*` guides
- `/city/*` guides when present
- `/county/*` guides
- `/sports-venue/*` individual venue guides
- `/sports-venues/*` market and sport landing pages, excluding `/sports-venues/compare` and its CSV reference route
- `/event/*` guides
- approved statewide trip-planning pages already covered by the travel guard

Curated Stay Nearby cards render only when the registry has an explicit relevant context. All other approved travel pages retain the generic Expedia stays search.

## Disclosure

Every rendered Expedia / Stay Nearby surface includes:

`Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.`

## Performance behavior

- `/expedia-travel.js` and `/stay-nearby-hotels.json` are static public assets, outside the protected React main-bundle byte count.
- The hotel registry is fetched only for recognized contextual page types.
- Expedia's third-party JavaScript remains user-intent loaded.
- No hotel image is fetched when the rights gate fails because the fallback contains no image URL.
- SPA route changes remain centrally handled.

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` protects:

- SSR-only first-party bootstrap loading
- exact approved Expedia widget tracking values
- click-triggered third-party loading
- required disclosure
- route and comparison-page guards
- the reusable Stay Nearby interface
- three-card desktop carousel behavior and keyboard/touch accessibility hooks
- three deterministic pilot choices per requested venue
- source evidence for every contextual hotel relationship
- no unverified property affiliate URLs
- no remote/uncleared property images
- no synthetic nightly-price or estimated-distance fields

The validator remains delegated through `validate-seo-ci-contract.mjs`, so normal repository validation exercises the integration.
