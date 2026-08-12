# Citation Magnet Scorecard — Batch 2.2

Status: **final scoring pass for the frozen Batch 2.1 candidate set**

This scorecard evaluates only `TD-CM-01` through `TD-CM-20` from `citation-magnet-inventory.md`. It does not add or remove candidates.

## Rubric

Each dimension is scored 1–5. Maximum score: 35.

- **U — Uniqueness / proprietary value:** 5 = materially differentiated reference utility; 1 = commodity content.
- **D — Structured data / comparison value:** 5 = strong tables, lookup, comparison or entity structure; 1 = mostly prose/navigation.
- **S — Primary-source quality:** 5 = direct authoritative provenance; 1 = weak/secondary sourcing.
- **A — Answer extractability:** 5 = concise facts/answers can be lifted safely by answer engines; 1 = answers are buried or ambiguous.
- **F — Freshness / maintainability:** 5 = clear repeatable update path; 1 = likely to stale without manual intervention.
- **I — Internal authority / relationship value:** 5 = central node in the site knowledge graph; 1 = isolated page.
- **R — Readiness against thin/template risk:** 5 = strong unique substance; 1 = high risk of thin or repetitive output.

Priority bands: **P1 = 29–35**, **P2 = 24–28**, **P3 = 19–23**, **Hold = 18 or lower**.

| ID | Resource | U | D | S | A | F | I | R | Total | Priority | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| TD-CM-01 | `/texas-data` | 4 | 4 | 4 | 4 | 4 | 5 | 4 | 29 | P1 | Promote as the statewide data authority hub |
| TD-CM-02 | `/texas-data/:datasetSlug` | 4 | 5 | 5 | 5 | 5 | 5 | 4 | 33 | P1 | Highest-priority data citation surface |
| TD-CM-03 | `/browse/counties` | 3 | 3 | 4 | 3 | 4 | 5 | 4 | 26 | P2 | Improve comparison dimensions before promotion |
| TD-CM-04 | `/browse/cities` | 3 | 2 | 3 | 3 | 3 | 4 | 3 | 21 | P3 | Keep as discovery until city data deepens |
| TD-CM-05 | `/explore/county/:county` | 4 | 4 | 4 | 4 | 3 | 5 | 2 | 26 | P2 | Promote selectively; uniqueness gate is mandatory |
| TD-CM-06 | `/property` | 3 | 3 | 4 | 4 | 4 | 5 | 4 | 27 | P2 | Strengthen as decision hub, not another article |
| TD-CM-07 | `/property-tax/counties` | 4 | 5 | 5 | 5 | 4 | 5 | 4 | 32 | P1 | Promote as statewide comparison authority |
| TD-CM-08 | `/property-tax/county/:county` | 5 | 5 | 5 | 5 | 4 | 5 | 3 | 32 | P1 | Promote route family with local uniqueness gate |
| TD-CM-09 | `/learn/property-taxes` | 3 | 3 | 5 | 5 | 4 | 5 | 4 | 29 | P1 | Canonical plain-English Texas tax explainer |
| TD-CM-10 | `/learn/appraisal-districts` | 4 | 4 | 5 | 5 | 4 | 5 | 4 | 31 | P1 | Promote as role/lookup authority page |
| TD-CM-11 | `/texas-resources` | 2 | 2 | 4 | 3 | 3 | 4 | 3 | 21 | P3 | Keep task-oriented; do not market as a primary answer surface yet |
| TD-CM-12 | `/guides` | 2 | 2 | 3 | 3 | 3 | 4 | 3 | 20 | P3 | Discovery hub only; avoid repetitive citation targeting |
| TD-CM-13 | `/find-my-dmv` | 4 | 4 | 5 | 5 | 4 | 4 | 3 | 29 | P1 | Promote after full geographic/source coverage check |
| TD-CM-14 | `/find-my-school-district` | 4 | 4 | 5 | 5 | 3 | 4 | 3 | 28 | P2 | Strong utility; freshness caveat blocks P1 |
| TD-CM-15 | `/explore/texas-state-parks-guide` | 4 | 5 | 5 | 4 | 3 | 4 | 3 | 28 | P2 | Promote after comparable-field completeness improves |
| TD-CM-16 | `/explore/texas-lakes-guide` | 4 | 5 | 4 | 4 | 3 | 4 | 3 | 27 | P2 | Strong planning surface; provenance needs tightening |
| TD-CM-17 | `/explore/texas-scenic-drives` | 4 | 4 | 4 | 4 | 3 | 4 | 3 | 26 | P2 | Promote after route/distance/season fields normalize |
| TD-CM-18 | `/explore/texas-wildflower-seasons` | 4 | 4 | 4 | 5 | 3 | 4 | 3 | 27 | P2 | Strong seasonal answer surface; freshness workflow required |
| TD-CM-19 | `/destination/:slug` | 4 | 4 | 3 | 4 | 3 | 5 | 2 | 25 | P2 | Promote only pages that pass uniqueness/template checks |
| TD-CM-20 | `/explore` | 3 | 3 | 3 | 3 | 3 | 5 | 4 | 24 | P2 | Keep as decision/discovery hub rather than citation endpoint |

## P1 implementation order

1. `TD-CM-02` dataset detail family.
2. `TD-CM-07` county property-tax comparison.
3. `TD-CM-08` county property-tax detail family.
4. `TD-CM-10` appraisal-district explainer/bridge.
5. `TD-CM-01` statewide data hub.
6. `TD-CM-09` property-tax explainer.
7. `TD-CM-13` DMV lookup.

## Guardrails carried into Batch 2.3

- P1 does not mean “publish more URLs”; it means strengthen the existing canonical resource.
- Programmatic families stay one system for prioritization.
- Any generated entity page that cannot demonstrate unique verified facts remains unpromoted/noindex as appropriate.
- A visible source/methodology/freshness treatment is required before a P1 resource is considered citation-ready.
