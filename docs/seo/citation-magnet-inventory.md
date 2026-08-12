# Citation Magnet Inventory — Batch 2.1

Status: **frozen input set for Batch 2.2**

This inventory identifies existing TexasDefined resources that are plausible candidates for becoming high-value AI/search citation magnets. It does **not** authorize creation of new public routes. Programmatic route families are counted once as a resource system rather than treating every generated URL as a separate candidate.

## Selection rules

A candidate must already exist in the repository and should satisfy most of these conditions:

- serves a recurring research, comparison, planning, or fact-retrieval intent;
- can be maintained from authoritative sources;
- can support unique data, structured comparisons, calculations, or definitive reference material;
- can answer a question directly enough for search/answer-engine extraction;
- does not need a second competing route for the same intent;
- has a realistic path to becoming more useful than a generic article on the same topic.

Batch 2.2 must score **this exact candidate ID set** before candidates are added, removed, merged, or promoted.

## Tier A — strongest existing systems

| ID | Existing route/resource | Asset type | Topic cluster | Why it can become a citation magnet | Main upgrade gap |
|---|---|---|---|---|---|
| TD-CM-01 | `/texas-data` | Data hub | Statewide data | Natural home for sourced Texas datasets and cross-topic comparisons | Stronger dataset summaries, methodology, freshness and exportability |
| TD-CM-02 | `/texas-data/:datasetSlug` | Dataset detail family | Statewide data | Individual datasets can answer narrow factual/comparison queries directly | Consistent provenance, definitions, update dates and machine-readable tables |
| TD-CM-03 | `/browse/counties` | Directory | Counties | Statewide entry point to all 254 counties and a natural comparison surface | Add comparison dimensions beyond simple discovery/navigation |
| TD-CM-04 | `/browse/cities` | Directory | Cities | Repeatable Texas city research intent with strong entity relationships | Add useful sortable attributes and transparent data sources |
| TD-CM-05 | `/explore/county/:county` | Entity/reference family | Counties | County pages can combine verified local facts, places, agencies and nearby resources | Increase county-specific uniqueness and reduce template sameness |
| TD-CM-06 | `/property` | Authority hub | Property/homeownership | Connects Texas property research, taxes, calculators and official resources | Make the hub the definitive decision map instead of a link collection |
| TD-CM-07 | `/property-tax/counties` | Statewide comparison/directory | Property taxes | Strong statewide query intent and natural 254-county comparison surface | Add comparable county metrics, methodology and freshness signals |
| TD-CM-08 | `/property-tax/county/:county` | Programmatic reference family | Property taxes | Directly answers county-level appraisal/tax-process research questions | More locally unique facts, jurisdictions, deadlines and source-specific detail |
| TD-CM-09 | `/learn/property-taxes` | Evergreen explainer | Property taxes | Can become the canonical plain-English explanation of Texas property-tax mechanics | Add worked examples, source citations, edge cases and last-verified treatment |
| TD-CM-10 | `/learn/appraisal-districts` | Evergreen explainer/directory bridge | Property taxes | High-intent confusion point: appraisal district vs. assessor/collector vs. taxing unit | Add statewide lookup/comparison data and clearer primary-source references |

## Tier B — promising existing resources that need more differentiation

| ID | Existing route/resource | Asset type | Topic cluster | Why it can become a citation magnet | Main upgrade gap |
|---|---|---|---|---|---|
| TD-CM-11 | `/texas-resources` | Resource directory | Statewide services | Can organize verified official resources around common Texas tasks | Needs stronger task-oriented taxonomy and source verification metadata |
| TD-CM-12 | `/guides` | Editorial/reference hub | Cross-topic | Existing guide inventory can funnel authority into maintained definitive resources | Must avoid repetitive hub copy and prioritize truly useful reference guides |
| TD-CM-13 | `/find-my-dmv` | Lookup tool | Government/services | Direct utility is more citation-worthy than a generic DMV article | Improve geographic coverage, official-source traceability and answer text |
| TD-CM-14 | `/find-my-school-district` | Lookup tool | Moving/education | High-intent relocation/homebuying utility with clear answer-engine value | Verification/freshness and clear caveats for boundary changes |
| TD-CM-15 | `/explore/texas-state-parks-guide` | Comparison guide | Travel/outdoors | Can compare parks by activities, amenities, seasonality and trip fit | Needs comprehensive comparable fields and authoritative update workflow |
| TD-CM-16 | `/explore/texas-lakes-guide` | Comparison guide | Travel/outdoors | Strong planning intent and opportunity for structured statewide lake comparison | Needs consistent lake attributes, official-source provenance and decision filters |
| TD-CM-17 | `/explore/texas-scenic-drives` | Planning guide | Road trips | Route/season/distance comparison can answer concrete itinerary questions | Add structured route data, drive times, seasonality and verification |
| TD-CM-18 | `/explore/texas-wildflower-seasons` | Seasonal reference | Outdoors/travel | Recurring seasonal query with strong timing/location intent | Needs source-backed timing ranges, regions and annual freshness treatment |
| TD-CM-19 | `/destination/:slug` | Destination entity family | Travel | Destination pages can aggregate practical, sourced, entity-specific planning facts | Enforce uniqueness and prevent thin destination templates from being promoted |
| TD-CM-20 | `/explore` | Topic hub | Travel/outdoors | Can become the decision-oriented front door to Texas travel research | Needs comparison-first navigation and stronger pathways to authoritative guides |

## Supporting machine/discovery assets — not standalone citation-magnet candidates

These are important to discovery and machine understanding, but Batch 2.2 should not score them as public answer resources:

- `/llms.txt`
- `/api/knowledge-graph`
- `/api/ai/entities`
- `/sitemap.xml`
- `/sitemap-explore.xml`
- source-governance and validation scripts

## Consolidation / do-not-duplicate rules

1. Do not create a second statewide county directory while `TD-CM-03` exists.
2. Do not create a second county property-tax route family while `TD-CM-08` exists.
3. Treat all 254 county property-tax pages as one system for prioritization; local enrichment happens inside the family.
4. Treat all county entity pages as one system for prioritization; do not count generated URLs as separate citation magnets.
5. Prefer improving a current guide over publishing a new article with the same search/answer intent.
6. A thin article may link into a citation magnet, but it should not compete with the maintained reference resource for canonical intent.

## Handoff to Batch 2.2

Batch 2.2 will score `TD-CM-01` through `TD-CM-20` for:

- uniqueness / proprietary value;
- structured data or comparison value;
- primary-source quality;
- answer extractability;
- freshness/maintainability;
- internal authority and relationship value;
- current thinness/template risk.

No candidate should be promoted for implementation solely because it is Tier A or Tier B here; the quantitative/qualitative prioritization belongs to Batch 2.2.
