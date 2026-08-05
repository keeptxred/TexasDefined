# TexasDefined — Platform Architecture

## Core principle

TexasDefined is an independent application. It must retain its own branding, frontend, navigation, SEO, canonical URLs, content workflows, deployment configuration, and data ownership boundaries.

No production dependency should point to another publication's domain, application, backend, media storage, search index, authentication system, or deployment environment unless a future integration is explicitly reviewed and approved.

## Current architecture

TexasDefined uses TanStack Start with route-level data loading, typed repository interfaces, brand configuration, reusable domain logic, and theme-aware presentation components.

```
src/
  brand/        TexasDefined identity, navigation, copy, features and SEO defaults
  data/         types, repository interfaces, query factories and adapters
  domain/       search, validation, formatting and calculator contracts
  services/     analytics, maps, weather and AI service interfaces
  components/   editorial, commerce and layout components
  routes/       TanStack Start routes with route-level SEO and structured data
  platform/     application infrastructure and operational services
```

## Separation rules

- TexasDefined owns its canonical domain: `https://texasdefined.com`.
- Robots, sitemaps, structured data, Open Graph metadata and social metadata must use the TexasDefined domain and identity.
- Components obtain branding, copy and configuration through the TexasDefined brand context rather than another site's configuration.
- Data access remains behind repository interfaces so backend changes do not require rewriting presentation components.
- Environment variables, media URLs, redirects, API endpoints and analytics identifiers must be TexasDefined-specific.
- Shared utilities may be extracted into neutral packages only when they contain no site-specific branding, URLs, credentials, content rules or deployment assumptions.
- Any future cross-project integration requires an explicit architecture review, documented data boundaries and reversible implementation.

## Data and backend changes

Before connecting or replacing a backend:

1. Document the proposed schema, ownership boundaries and environment variables.
2. Use additive, reversible migrations.
3. Test in a non-production environment.
4. Validate row-level security, storage policies and brand isolation.
5. Confirm that canonical URLs, sitemaps, feeds, media and metadata remain TexasDefined-specific.
6. Obtain approval before modifying production infrastructure.

## Release validation

Every production release should verify:

- the homepage and primary section routes load successfully;
- canonical URLs use `texasdefined.com`;
- `robots.txt` references the TexasDefined sitemap;
- sitemap entries contain no legacy domains;
- Open Graph, Twitter and JSON-LD metadata use TexasDefined identity and URLs;
- navigation, footer, 404 pages and redirects contain no stale external-site links;
- builds and type checks pass.
