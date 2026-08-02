# TexasDefined — Platform Architecture

## Critical constraint

**Lovable Cloud must NOT be enabled on this project.** A Lovable Cloud backend is bound to a
single Lovable project and cannot be shared across projects. TexasDefined and KeepTXRed must
ultimately share **one external Supabase project** — the existing KeepTXRed project, which holds
production data and established integrations. No Supabase connection, migration, or schema change
is made in Phase 1.

## Phase 1 (this build)

Frontend only, backed by fixtures behind repository interfaces.

```
src/
  brand/        BrandConfig contract + TexasDefined config + React context
  data/         types, repository interfaces, query factories, fixture adapters
  domain/       search, validation, formatting, calculator contracts (brand-agnostic)
  services/     analytics, maps, weather, AI — interfaces with no-op adapters
  components/   theme-aware presentation (editorial, commerce, layout)
  routes/       TanStack Start routes with per-route SEO + structured data
```

Rules enforced by the layering:

- Components never import fixtures. They read via route loaders (`ensureQueryData`) and
  `useSuspenseQuery` over `src/data/queries.ts`.
- Swapping fixtures for Supabase is a single binding change in `src/data/index.ts`.
- Every record carries `brandId`; every query is brand-scoped through `scope`.
- Components take styling, copy, branding and configuration from tokens/props/brand context —
  never hardcoded TexasDefined strings — so KeepTXRed can reuse them unchanged.
- No duplicate implementations: anything likely shared (auth/roles, search, maps, weather,
  analytics, AI, validation, calculators) is written once behind an interface.

## Phase 2+ (after review)

1. Inspect the existing KeepTXRed schema; document required additions.
2. Draft additive, reversible migrations: `brands`, brand-scoped roles, brand-aware content
   columns, shared datasets, shared media path prefixes, brand-aware search index.
3. Test on a Supabase branch or duplicate environment. Never modify existing KeepTXRed tables,
   functions, policies, storage objects or data.
4. Connect only after migration plan and RLS policies are approved.
5. Extract `domain/`, `services/`, `data/repositories` and generic component cores into a shared
   `texas-shared` package.
