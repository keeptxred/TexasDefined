# TexasDefined.com — Phase 1 Foundation

A premium Texas lifestyle publication. Frontend-only build: no Lovable Cloud, no Supabase, no migrations, no contact with the KeepTXRed database. All data comes from typed local fixtures behind repository interfaces, so the backend can be swapped in later without touching any component.

## Design direction

Travel-magazine foundation — big photography, full-bleed hero, editorial grids — refined with magazine typography: a warm display serif for headlines, a clean humanist sans for body, generous leading and margins. Warm Texas palette (sun-bleached limestone, dusk terracotta, bluebonnet accent, deep pecan text) — no political red/white/blue, no newspaper density, no ecommerce chrome. Subtle motion only: image ken-burns on hero, fade-and-rise on scroll, restrained hover states.

All colors, gradients, shadows, and font stacks are defined as semantic tokens in `src/styles.css`; components never hardcode color utilities.

## Information architecture

```text
/                          Homepage
/explore                   Explore hub
  /explore/lakes-rivers    /explore/state-parks    /explore/road-trips
  /explore/small-towns     /explore/food-bbq       /explore/outdoors
/sports
/events
/texas-history
/moving-to-texas
/home-garden
/real-estate
/guides                    Guides & Tools hub (category grid, no calculators yet)
/shop                      Shop hub
  /shop/$collection        Collection view
/about
/article/$slug             Editorial article template
/destination/$slug         Destination template
```

Each route defines its own `head()`: unique title, description, og:title, og:description, plus og:image where a real hero exists. Home gets Organization + WebSite JSON-LD; articles get Article JSON-LD; destinations get Place. Sitemap and robots served from server routes.

## Homepage

Full-bleed hero with a featured destination, then: Featured Destinations, Explore Texas (category tiles), Weekend Getaways, Lakes, State Parks, Hidden Gems, BBQ, Wildlife, Road Trips, Seasonal Events, Featured Guides, Shop Highlights, Newsletter. Each is a reusable section component fed from a repository — sections vary in rhythm (full-bleed, asymmetric split, three-up editorial grid, horizontal scroller) so the page reads like a magazine, not a stack of identical card rows.

## Code architecture (shared-platform ready)

```text
src/
  brand/            TexasDefined identity: tokens, nav, SEO defaults, voice
  components/
    ui/             shadcn primitives
    editorial/      ArticleCard, FeatureHero, PullQuote, Byline, SectionHeader
    commerce/       ProductCard, CollectionStrip, ShopTheStory
    layout/         Header, MegaNav, Footer, Container
  domain/           pure business logic — no React, no fetching
    calculators/    typed input/output contracts only, no implementations yet
    validation/     zod schemas for every entity
    search/         query parsing + ranking, source-agnostic
    utils/          formatting, slugs, geo, dates
  data/
    types.ts        Article, Destination, Guide, Product, Collection, Event, Region
    repositories/   interfaces: ArticleRepository, DestinationRepository, ...
    fixtures/       real Texas seed records implementing those interfaces
    index.ts        single place where implementations are bound
  services/         thin adapters: maps, weather, analytics, ai — interface + no-op stub
```

Rules that make the later extraction to `texas-shared` mechanical:
- `domain/`, `data/types`, `data/repositories`, and `services/` interfaces import nothing brand-specific and nothing from `components/`.
- Components never import fixtures directly — only repositories via hooks.
- Everything brand-specific (copy, palette, nav, SEO) lives in `src/brand/`.

Swapping fixtures for Supabase later is one edit in `src/data/index.ts` plus new repository implementations.

## Theme-aware, brand-agnostic components

Every reusable component is written as if a second brand already exists. No component hardcodes TexasDefined copy, colors, fonts, nav items, logos, routes, or tone.

- **Styling** comes from semantic CSS tokens only (`bg-card`, `text-primary`, `font-display`). A brand swap is a token-value swap in one stylesheet — zero component edits. No hex values, no `text-white`/`bg-black`, no brand-named utility classes.
- **Branding** (logo, wordmark, name, tagline, social handles, default OG image) is read from a `BrandProvider` React context, never imported directly from `src/brand/texasdefined`. The provider is mounted once in `__root.tsx`; components call `useBrand()`.
- **Copy** — every label, heading, empty state, CTA, and microcopy string is either a prop or resolved from the brand context's copy map. No English literals baked into shared components.
- **Configuration** — nav structure, enabled sections, feature flags (shop on/off, events on/off), footer columns, and route maps come from a `BrandConfig` object passed through context, so KeepTXRed can enable a different set of surfaces with the same components.
- **Content shape** — components take domain types (`Article`, `Product`, `Destination`), not TexasDefined-specific shapes, and accept render-prop or slot overrides where a brand may need different chrome.

`src/brand/texasdefined.ts` is the only file that supplies concrete values; adding `keeptxred.ts` beside it is the entire brand-onboarding cost. Any component that cannot be rendered correctly with a different `BrandConfig` is treated as a bug in this phase.


## Shop foundation

Shop routes and product/collection types are built and browsable from fixtures. No cart, checkout, or payment. Editorial-to-commerce linking is built in from day one: articles carry `relatedCollections`, and a `ShopTheStory` component renders inline in article bodies.

## Guides & Tools foundation

Guide types support `kind: 'article' | 'calculator' | 'dataset' | 'checklist'` with a registry keyed by slug. Calculator entries declare their input/output contract in `domain/calculators/` and render a "coming soon" state from the registry — no calculator math is implemented.

## Quality bar

Mobile-first; responsive images with width/height and lazy loading below the fold; fonts loaded via `<link>` in the root head; semantic landmarks and a single H1 per page; visible focus states; keyboard-navigable mega-nav; alt text on every image; canonical tags.

## ARCHITECTURE.md

Documents the shared-platform plan and states explicitly: **Lovable Cloud must not be enabled — a Lovable Cloud backend is provisioned per Lovable project and cannot be shared across two separate Lovable projects.** TexasDefined and KeepTXRed will share one external Supabase project, connected only after its schema and the additive brand-separation migrations are reviewed and approved. Also records the repository boundary, the `texas-shared` extraction rules, and the brand-separation model (shared datasets, brand-scoped content, brand-scoped roles, shared media paths, brand-aware search) as design intent only.

## Content

Seed fixtures use genuine Texas subjects — Caddo Lake, Enchanted Rock, the Hill Country wine trail, Lockhart barbecue, Palo Duro Canyon, Blue Hole in Wimberley, bluebonnet season — with real, written editorial copy. No lorem ipsum, no empty stub routes; a section ships only when it has real content behind it.
