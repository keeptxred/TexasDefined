# TexasDefined stay monetization integration

## Purpose

TexasDefined treats lodging as a trip-planning utility, not a sitewide ad layer. The system combines three related surfaces without turning travel pages into affiliate directories:

1. **Stay Nearby** supplies context-first hotel recommendations when TexasDefined has governed relevance data for the current venue, event, destination or city.
2. **Expedia stays search** is the approved broad-search fallback and remains the host for live availability/search behavior.
3. **Hotels.com / Orbitz / Travelocity / Vrbo choices** add a route-scoped traveler monetization layer inside the same Stay Nearby surface. Hotels.com remains primary for verified exact-property referrals. Orbitz is the comparison-hotel option on hotel-first event and sports-venue intent, while Travelocity is the comparison-hotel option on broader destination/leisure intent. Those broader routes can also offer Vrbo when a vacation-rental setup fits the trip. Vrbo owner referrals are separately gated to owner/real-estate context and are not inferred from ordinary travel intent.

Editorial relevance and affiliate activation remain separate. A hotel can be included because its location is useful even when TexasDefined does not yet have a verified property-specific affiliate link. In that case, the card falls back to the approved Expedia stays search instead of inventing a property deep link.

## Approved Expedia widget contract

- Program: `us-expedia`
- Line of business: `stays`
- Network: `pz`
- CAMREF: `1110lMy6E`
- PUBREF: `texasdefined-stays`
- Vendor script: `https://creator.expediagroup.com/products/widgets/assets/eg-widgets.js`

The server-rendered root shell emits deferred first-party bootstraps at `/expedia-travel.js` and `/stay-affiliate-options.js`, with the Hotels.com/Orbitz/Travelocity/Vrbo bootstrap loading after the Expedia bootstrap. The hydrated client build excludes these bootstrap references, so lodging monetization does not consume the protected React `main-*.js` budget.

The Expedia vendor script itself is never loaded during the initial page load. It is created only after a visitor activates an Expedia-search fallback or broader stay-search control.

## Hotels.com / Orbitz / Travelocity / Vrbo contract

`public/stay-affiliate-options.js` is the route-policy and presentation layer for Hotels.com, Orbitz, Travelocity and Vrbo.

Traveler links use the TexasDefined CJ publisher ID `101876465` and the CJ Deep Link Generator base. The deep-link builder fails closed: only `www.hotels.com`, `www.orbitz.com`, `www.travelocity.com` and `www.vrbo.com` destinations are accepted. Every outbound traveler affiliate link uses `rel="sponsored nofollow noopener noreferrer"` and opens only after an explicit visitor click.

Current traveler intent policy:

- **Hotel-first:** individual event and sports-venue intent.
- **Hotels + vacation rentals:** destinations, Explore travel content, city guides, county guides and the approved statewide camping, college-town, tailgating, unique-lodging, music-venue and roadside-oddity guides.
- **Owner referral:** `/real-estate` and explicitly qualifying owner/vacation-rental article metadata only. Ordinary travel pages do not inherit owner-referral eligibility.

Visible CTAs include `Find places to stay` and `Find hotels on Hotels.com`. Hotel-first event/venue pages use `Compare hotels on Orbitz`; broader destination/leisure pages use `Compare hotels on Travelocity`; and, where the route policy permits it, those broader pages can also show `Find vacation rentals on Vrbo`.

Affiliate clicks push an `affiliate_click` object into `window.dataLayer` with partner, CTA label, placement and current page path. The tracking payload does not collect visitor PII. A matching `texasdefined:affiliate-click` browser event is also dispatched for first-party observability.

## Stay Nearby architecture

`public/stay-nearby-hotels.json` is the first-party hotel relevance registry. Each active property can carry:

- a stable property ID and name
- city / visitor-area context
- optional **verified** coordinates for future geographic ranking
- provider-agnostic `bookingTargets`
- optional rights-qualified real property imagery
- one or more contextual relationships for `venue`, `event`, `destination` or `city`
- deterministic relevance rank
- user-facing geographic context
- a proximity statement only when backed by the attached source
- a short supported differentiator
- source URL and verification date

`public/stay-nearby-ai-property-images.json` is the governed fallback registry for exact-property AI raster imagery. It is separate from the relevance registry so visual provenance and image policy can be validated independently.

The Expedia bootstrap exposes:

```text
window.TexasDefinedStayNearby.select(context, limit?)
window.TexasDefinedStayNearby.mount(context, target)
window.TexasDefinedStayNearby.refresh()
```

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

## Placement policy

Lodging must be visible where a visitor is planning the trip, not buried after the useful content.

`[data-stay-nearby-slot]` is authoritative when a route provides one. Current explicit placements include:

- **sports-venue guides:** the existing venue-planning Stay Nearby slot
- **event guides:** a deterministic in-content slot placed immediately before `Plan the visit`, with a first-substantive-section fallback
- **destination guides:** an explicit slot between the quick planning answer and `What to know before you go`

When an approved travel route does not provide an explicit slot, the centralized affiliate layer promotes the generated Stay Nearby/Expedia surface ahead of a relevant planning heading such as `Where to stay`, `Stay nearby`, `Plan your visit`, `Trip planning`, `What to know before you go`, `Getting there` or `Visitor guide`. If none is available, the first substantive article heading is used. The page-end append is therefore a construction fallback, not the intended final visual position.

Curated Stay Nearby surfaces also receive a prominent `Find places to stay` control in the listing heading row. That control activates the existing stay-search experience rather than creating a duplicate lodging subsystem.

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

## Current curated venue contexts

The governed registry currently contains exactly three curated hotel choices for each of:

- `/sports-venue/amon-g-carter-stadium`
- `/sports-venue/gerald-j-ford-stadium`
- `/sports-venue/globe-life-field`
- `/sports-venue/american-airlines-center`
- `/sports-venue/texas-motor-speedway`

The ranking is explicit and source-backed. These entries do not fabricate venue coordinates or inferred walking/driving distances. Broad venue fallback remains disabled, so a venue without an explicit curated relationship does not inherit a generic city hotel list.

## Current curated destination contexts

The standard governed destination cohort contains exactly three source-backed stays for each of:

- `/destination/fredericksburg`
- `/destination/galveston-seawall`
- `/destination/texas-ranger-hall-of-fame-museum-waco`
- `/destination/johnson-city`

Johnson City's cohort intentionally spans three different trip styles: a conventional central hotel, a U.S. 290 winery resort, and a Pedernales-area glamping retreat. Each property has a verified exact-property Hotels.com destination for CJ referral generation, while the first-party destination registry keeps its Expedia booking target fail-closed until an account-generated Expedia property deeplink is separately verified.

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

Stay Nearby uses a fail-closed image hierarchy:

1. **Approved real property image.** For the current Expedia program, a real hotel photograph may render only when it was obtained through the approved Expedia Creator Toolbox workflow, is stored as a first-party TexasDefined asset, carries `rightsSource: "expedia-creator-toolbox"`, and its `bookingProvider` matches a verified property-specific affiliate target for that same hotel.
2. **Exact-property AI raster.** When an approved real property image is unavailable, TexasDefined may render a first-party AI-generated depiction of the exact listed hotel. The record must identify the exact property and street address, be grounded to a manually verified exact-property visual reference, set `depictsProperty` and `generatedFromPropertyIdentity` to `true`, use a first-party path under `/images/stay-nearby/properties/`, and use PNG, JPEG or WebP media.
3. **Text-only fallback.** If neither image source passes its gate, the card remains text-only.

SVG, SVG data URIs, generic hotel art, neighborhood-only illustrations and the retired area-illustration fallback are prohibited. AI property depictions display the disclosure:

`AI-generated depiction of this property — not an official hotel photograph.`

AI alt text must identify the image as AI-generated and must be property-specific. A rights-cleared real property image always takes precedence over an AI depiction when both are valid.

The current governed set has 15 distinct first-party exact-property AI raster assets covering the five curated venue contexts. Future properties must pass the same real-image or exact-property-AI gate rather than introducing a generic visual fallback.

## Route coverage

The centralized travel guard covers:

- `/explore` and every `/explore/*` page
- `/destination/*` guides
- `/city/*` guides when present
- `/county/*` guides
- `/sports-venue/*` individual venue guides
- `/sports-venues/*` market and sport landing pages, excluding `/sports-venues/compare` and its CSV reference route
- `/event/*` guides
- approved statewide trip-planning pages already covered by the travel guard

Curated Stay Nearby cards render only when the registry has a relevant context. Other approved travel pages retain the generic Expedia stays search plus route-appropriate Hotels.com/Orbitz/Travelocity/Vrbo traveler choices.

## Disclosure

Every rendered Expedia / Stay Nearby surface includes the Expedia disclosure:

`Affiliate disclosure: TexasDefined may earn a commission from qualifying Expedia bookings, at no additional cost to you.`

The traveler choice panel uses route-specific disclosure copy: hotel-first event/venue intent discloses Hotels.com and Orbitz, while broader destination/leisure intent discloses Hotels.com, Travelocity and Vrbo. The Vrbo owner-referral panel carries its own owner-referral disclosure.

## Performance behavior

- `/expedia-travel.js`, `/stay-affiliate-options.js`, `/stay-nearby-hotels.json`, `/stay-nearby-context-images.js` and `/stay-nearby-ai-property-images.json` are static public assets, outside the protected React main-bundle byte count.
- The hotel registry is fetched only for recognized contextual page types.
- Expedia's third-party JavaScript remains user-intent loaded.
- Property imagery is selected only after its rights/provenance gate passes; invalid or missing image records fail closed to text.
- SPA route changes remain centrally handled.

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` protects the core Expedia/Stay Nearby contract, including tracking values, user-intent loading, route guards, relevance data, property-link verification, image governance and carousel behavior.

`scripts/data/validate-stay-affiliate-options.mjs` protects the Hotels.com/Orbitz/Travelocity/Vrbo layer and executes the route-policy API in a minimal browser sandbox. It verifies:

- event and sports-venue intent remains hotel-first
- hotel-first event and sports-venue routes resolve the comparison hotel to Orbitz, while destination, city, county, Explore and governed statewide travel families resolve it to Travelocity and retain Vrbo traveler intent
- owner-referral eligibility remains separate from ordinary travel intent
- CJ deep links remain bound to publisher `101876465`
- unsupported deep-link destination hosts fail closed
- explicit event and destination Stay Nearby placement contracts
- contextual fallback promotion and the prominent `Find places to stay` CTA
- affiliate disclosure and sponsored-link attributes
- GTM/dataLayer click attribution
- post-deploy production-verification wiring

`scripts/ci/verify-stay-nearby-production.mjs` applies the live-production checks for the governed curated hotel registry and image/provenance rules.

`scripts/ci/verify-stay-affiliate-production.mjs` verifies the live Hotels.com/Orbitz/Travelocity/Vrbo and Expedia bootstraps, their ordering and tracking markers, deterministic in-content slots on representative event/venue/destination pages, and shared stay-bootstrap presence on representative city and county guides.

`.github/workflows/verify-stay-affiliate-production.yml` runs that smoke test automatically after a successful `Deploy TexasDefined production` workflow. This closes the loop from source validation to deployed behavior without requiring a manual affiliate audit after every release.
