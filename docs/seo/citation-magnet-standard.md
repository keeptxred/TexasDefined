# Citation Magnet Page Standard — Batch 2.3

Status: **required reusable standard for promoted citation-magnet resources**

This standard applies to existing resources promoted from the Batch 2.2 scorecard. It is not permission to create competing routes.

## Required page layers

1. **Direct answer layer**
   - The first substantive section must answer the page's primary query in plain language.
   - Key facts, statuses, dates or comparisons should be visible without opening accordions or navigating elsewhere.
   - Put the most useful concise statistics or fact blocks near the top when the page is data-backed.
   - Avoid throat-clearing introductions that delay the useful answer.

2. **Structured evidence layer**
   - Prefer tables, definition lists, comparable fields, timelines, lookup results or labeled fact blocks when the subject supports them.
   - Use consistent field names across programmatic families.
   - Unknown values must be labeled as unknown/pending rather than inferred.

3. **Visible trust and citation layer**
   - Every promoted citation magnet must visibly show **Author/editor**, **Sources**, **Methodology**, **Last verified**, **Stable URL**, and a **Recommended citation**.
   - Use a real verified contributor when one exists; otherwise use the responsible Texas Defined institutional editorial desk. Never invent a human byline.
   - Source names should link directly to authoritative records when possible, with primary and official sources first.
   - Methodology must explain what was collected, normalized, calculated or interpreted.
   - Last verified must describe the factual verification date, not merely the code deployment date.
   - Stable URL must be the canonical TexasDefined URL without campaign parameters.
   - Recommended citation should identify the responsible author/editor, page title, TexasDefined, verification date and stable URL.
   - Data-backed pages should expose a CSV/JSON download when the underlying rows are suitable for reuse.

4. **Machine-readable layer**
   - Keep canonical URLs stable.
   - Emit appropriate JSON-LD (`Dataset`, `Article`, `Place`, `GovernmentOrganization`, `FAQPage`, etc.) only when the visible page supports it.
   - When available, expose `dateModified`, `isBasedOn`, `measurementTechnique`, identifiers and entity relationships.
   - Dataset pages with a public download should expose a `DataDownload` distribution with the canonical download URL and media type.

5. **Relationship layer**
   - Link to the canonical parent hub and the most relevant related entities/tools.
   - Programmatic pages should connect laterally only where the relationship is meaningful; avoid keyword-driven overlinking.

## Source hierarchy

Preferred order:

1. Texas or U.S. government primary source.
2. Local government / official district / agency source.
3. Primary institutional or operator source.
4. High-quality secondary source only when primary data is unavailable or interpretation is explicitly labeled.

A citation-magnet page should not present an unsourced aggregate as if it were an official statistic.

## Programmatic uniqueness gate

A generated county, city, property, destination or lookup page is citation-ready only when it contains enough entity-specific value to distinguish it from its sibling template. At least two of the following should be present where applicable:

- entity-specific verified facts;
- entity-specific authoritative links;
- entity-specific comparisons or calculated values;
- local deadlines, jurisdictions, offices or boundaries;
- entity-specific relationships to nearby places, agencies or services;
- a unique explanatory paragraph based on verified data rather than token substitution.

Pages that fail this gate should not be promoted merely because the route exists.

## Freshness classes

- **Live/operational:** verification target measured in hours or days (closures, lookup status, fast-changing official data).
- **Current-cycle:** verify on material official changes and at least monthly during an active annual/election/tax cycle.
- **Annual:** verify when the authoritative annual dataset or rules refresh.
- **Evergreen:** verify at least annually and whenever the governing rule/source changes.

The visible trust layer must use the actual verification date available for the resource.

## Answer-engine readiness checklist

A resource is citation-ready only when all are true:

- one canonical intent and one canonical URL;
- direct answer and useful statistics are visible near the top;
- visible author/editor responsibility is clear;
- factual claims have traceable provenance;
- structured facts are internally consistent;
- methodology distinguishes source facts from calculations/editorial interpretation;
- last-verified date is visible;
- stable URL and recommended citation are visible;
- reusable data is downloadable where appropriate;
- thin/template safeguards pass;
- internal links reinforce the entity/topic graph without forced anchors;
- indexability matches content quality.

## Reusable implementation

Use `CitationTrustPanel` for the visible trust/citation layer instead of creating page-specific variants. Individual page families may add specialized provenance details, but the labels **Sources**, **Methodology**, **Last verified**, **Stable URL**, **Author/editor**, and **Recommended citation** stay consistent across promoted resources.
