# UIL softball authority program-by-program research ledger

**As of:** October 12, 2026  
**Scope:** Every one of the 1,192 unique 2026–27 UIL girls softball alignment listings, across five softball conferences and 160 UIL numbered districts.  
**Canonical status inventory:** [UIL_SCHOOL_PUBLICATION_STATUS_2026-10-12.json](./UIL_SCHOOL_PUBLICATION_STATUS_2026-10-12.json).  
**Executable consistency safeguard:** `node scripts/softball/verify-research-status.mjs`, imported by `test-authority-contract.mjs` and therefore the canonical protected softball validation.

## Real progress, not a mass publication claim

| Independently reconciled research/publication status | School count |
|---|---:|
| Not yet researched | 1,180 |
| Research in progress | 12 |
| Source verification blocked (separate status) | 0 |
| Research complete | 0 |
| Editorial and rendered-page QA complete | 0 |
| Approved for publication | 0 |
| Published and production verified | 0 |
| **Total distinct UIL softball alignment listings** | **1,192** |

The **twelve** in-progress school dossiers are: Shiner; Ganado; Katy; Pearland; Amarillo Highland Park; Jonesboro; Grandview; Santa Gertrudis Acad; Bullard; Liberty; Mt Belvieu Barbers Hill; Montgomery Lake Creek. Five are researched in the original pilot (`PILOT_DOSSIERS_2026-10-11.json`), the next five in [PR #4677](https://github.com/keeptxred/TexasDefined/pull/4677), and the newest two in [PR #4680](https://github.com/keeptxred/TexasDefined/pull/4680); a dossier being in an open PR is **not** a merged evidence file, publication permission, complete 38-topic audit or actual live team article.

## How to update without rebuilding existing work

The source registry is `src/data/softball/uil-2026-27-registry.json`, which establishes each school's official UIL name, current **softball-only** conference, district, region and original alignment document. Do not infer enrollment, school campus, coach or physical field from those rows; the ledger is an administration record, **not a public school page database**.

Every status row carries the exact registry school key, reference URL, current stage, source-verification status, editorial QA boolean, media-rights boolean, editorial approval boolean and actual production-verification boolean. A status may advance only with real independent documentary evidence. A newly completed individual page needs every one of the 38 research dimensions and 13 original article sections, actual school-operated facilities, permissions, correct source-linked records, protected CI plus live SSR/browser QA. The full profile belongs in `published-team-profiles.json` and its tiny companion index; this research ledger alone cannot publish a team.

Move the school to **Research complete** only after source review of all applicable dimensions. Move to **Editorial and rendered-page QA complete** only after full original page and rendered tests pass. Move to **Approved for publication** when all gating review/permissions are affirmatively documented. Move to **Published and production verified** only when the deployed canonical URL has passed real 200/404, SEO/structured data, source, image-rights, mobile/keyboard and hydration checks. Record actual PR, approved commit, deployment run and external link evidence in the school dossier before declaring it live.

If a critical record cannot be verified (e.g. current varsity field entrance, staff appointment, spectator accessibility or image license), assign **Source verification blocked** only when that is the actual state; other schools should continue progressing. Retain the school as a verified directory listing; never create a thin individual route. Do not invent a school to fill a numerical target.

When UIL publishes a new realignment, first update and validate the official alignment registry, then reconcile school identifiers and statuses **without silently deleting previously approved profiles**. This version of the ledger intentionally refuses to pass if the expected 2026–27 registry changes before a corresponding reviewed update.

Publication state must always match the separate approved manifest. The validator cross-checks all 1,192 individual exact UIL school IDs and rejects duplicates, unauthorized promotion, invalid current-conference swaps and publication claims without editor QA/media rights. Keep the [permanent issue #4652](https://github.com/keeptxred/TexasDefined/issues/4652) updated after each substantial batch and include the project's current published count.

This ledger is a precise backlog foundation for full pages, not the finished statewide authority network.
