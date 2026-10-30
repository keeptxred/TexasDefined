# Texas Historical Commission source automation checkpoint — October 30, 2026

## Scope
Integrate THC as an official historical designation and research source for *existing* TexasDefined authority pages. This is not a page-creation license, visitor-access approval, or image-reuse grant.

## Verified / already completed
- PR [#6406](https://github.com/keeptxred/TexasDefined/pull/6406) merged (`d951528d32386a1c8bda3737e59557c09e047232`): Rosewood Elementary moved from pending to Listed October 2026; month parser fixed for markup-separated July/August headers; THC photo-rights and source-citation safeguards added.
- The existing [THC Atlas statewide monthly census](../../.github/workflows/thc-atlas-census.yml) and [THC National Register weekly source watch](../../.github/workflows/thc-landmark-watch.yml) are retained. Do not duplicate them or re-audit all existing historic pages.
- Official source: https://thc.texas.gov/preserve/designate-historic-properties/national-register-historic-places . On October 30 this lists **Evergreen Cemetery (Austin)** as submitted to NPS October 19 and **Scotus College (Hebbronville)** as submitted October 13. Both were previously marked review in the site source data.
- The official site shows **Cayo del Oso** as *Determined Eligible—Owner Objection*, despite placing it beneath the October 2026 listings heading. This is NOT a listed or visitable attraction; do not add it to the listed inventory or disclose protected archeological coordinates.

## This follow-up batch
- Correct Evergreen Cemetery and Scotus College pending stages to `submitted`, without representing either as listed.
- Compare the source's *Submitted to NPS* and *Final Draft in Progress* groups against pending registry entries in the weekly watch; fail closed and raise the existing issue on status changes or missing/ambiguous source headings.
- Run a live THC source comparison on relevant `main` pushes as well as the existing Monday schedule and manual dispatch. Automatically comment on and close the exact existing source-drift alert **only after a successful live comparison**. Failures retain/open an alert and preserve the run report.
- No image copying, automatic public-page creation, new location coordinates, or manual seasonal work.

## Acceptance / handoff
- Offline watcher and existing five authority-batch validations succeed in CI.
- PR merges normally through required checks.
- On merge, the `main` push runs the **live-source-watch** job (skipped for pull requests); examine its report artifact and closing comment on [issue #5290](https://github.com/keeptxred/TexasDefined/issues/5290). Do not assert live success before it actually runs.
- If live comparison fails, follow source drift in #5290 using the report; preserve the real THC dates and distinctions between nomination, listed, and determined-eligible-owner-objection.
- Keep monthly Atlas census separate from weekly National Register status checks.
