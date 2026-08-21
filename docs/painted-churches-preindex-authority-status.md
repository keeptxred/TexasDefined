# Painted Churches pre-index authority state

As of **August 21, 2026**, this branch is intentionally held in **pre-index review**.

- Verified statewide corpus: **33 churches**
- Search-engine release: **disabled**
- IndexNow: gated behind `PUBLIC_INDEXING_ENABLED=true`
- Canonical church pages: canonical profile/research/gallery resolvers; no duplicate legacy gallery path
- Visitor evidence: explicit per verified church; no generic fallback is permitted
- Map provenance: explicit per verified church; non-exact coordinates remain visibly qualified
- Object-level feature inventory: minimum two sourced church-specific objects/features required per verified church
- Source provenance: canonical source registry with normalized evidence tiers and per-church uses
- Claim-level evidence: identity, classification, chronology, designation, location, visitor, interior-feature and preservation claims expose their sources
- Preservation/fabric history: sourced disasters, coverings, rediscoveries, restoration, reconstruction, conservation, repainting and stewardship changes; missing chronologies are published as research gaps rather than treated as proof of no alteration
- Contributor graph: architecture, construction, decoration, restoration/conservation and research roles are typed separately; organizations are not emitted as people
- Original 1982 thematic study: historical 15-church research universe reconciled with the current 14-property THC MPS interface through individually listed St. Joseph's Church, Galveston
- Candidate decisions: documented separately from the verified corpus
- Inscriptions, stained glass, sacred furnishings and object features: first-class research inventories, with empty coverage treated as research backlog rather than generated filler
- Fieldwork: **not claimed** where Texas Defined has not physically visited/documented the church
- Expert/parish review: **not claimed** without a real reviewer who agrees to be identified

## Documentary launch floor

Every verified church must resolve all of the following before search publication can even be considered:

1. canonical narrative profile;
2. church-specific research dossier;
3. at least three distinct normalized sources;
4. at least two authority-grade sources independent of discovery-only material;
5. explicit visitor/access research;
6. sourced map point;
7. at least two church-specific interior object/feature records; and
8. rights-cleared current photography.

Additional authority dimensions—exact-property coordinates, archival imagery, contributor coverage, techniques, symbols, resolved integrity, preservation chronology and original Texas Defined fieldwork—remain visible in the stretch queue rather than being falsely marked complete.

## Release rule

Do **not** enable public search indexing until all of these separate controls are satisfied:

1. the church-level documentary readiness gate passes;
2. the authority work is reconciled onto current `main`;
3. CI, production build and live verification pass on the reconciled release commit;
4. the owner explicitly approves releasing Painted Churches to search; and
5. `PUBLIC_INDEXING_ENABLED=true` is deliberately enabled.

Passing a technical validator never substitutes for the owner's publication decision.

## Current Git-history blocker

The authority branch was intentionally isolated for deep pre-index work. The latest comparison performed during the August 21 audit showed it had diverged materially from current `main`. It therefore **must not be treated as release-ready** until the authority changes are reconciled onto a fresh current-main base and all release validators run there.
