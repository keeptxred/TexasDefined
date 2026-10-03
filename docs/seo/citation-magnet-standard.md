# Citation Magnet Page Standard — Batch 2.3

Status: **required reusable standard for promoted citation-magnet resources**

This standard applies to existing resources promoted from the Batch 2.2 scorecard. It is not permission to create competing routes.

## Required page layers

1. **Direct answer layer**
   - The first substantive section must answer the page's primary query in plain language.
   - Key facts, statuses, dates or comparisons should be visible without opening accordions or navigating elsewhere.
   - Serious reference/data pages should expose a concise statistics block near the top when the subject has stable, comparable metrics.
   - Avoid throat-clearing introductions that delay the useful answer.

2. **Structured evidence layer**
   - Prefer tables, definition lists, comparable fields, timelines, lookup results or labeled fact blocks when the subject supports them.
   - Use consistent field names across programmatic families.
   - Unknown values must be labeled as unknown/pending rather than inferred.
   - When a maintained dataset is useful outside the page, expose a downloadable CSV and/or JSON distribution generated from the same underlying rows as the visible page.

3. **Visible trust layer**
   - Every promoted citation magnet must visibly show **Sources**, **Methodology**, **Last verified**, **Editor**, **Stable URL**, and a **Recommended citation**.
   - The Sources section should prefer government, agency and other primary records under the hierarchy below.
   - Source names should link directly to the authoritative record when possible.
   - Methodology must explain what was collected, normalized, calculated or interpreted.
   - Last verified must describe the factual verification date, not merely the code deployment date.
   - The responsible editor may be the real institutional Texas Defined Editorial Desk; do not invent a human byline.
   - The recommended citation should identify Texas Defined, the maintained page title, last-verified information and the canonical production URL.
   - Where a machine-readable distribution exists, link it from the trust layer so researchers do not have to hunt for the file.

4. **Machine-readable layer**
   - Keep canonical URLs stable.
   - Emit appropriate JSON-LD (`Dataset`, `Article`, `Place`, `GovernmentOrganization`, `FAQPage`, etc.) only when the visible page supports it.
   - When available, expose `dateModified`, `isBasedOn`, `measurementTechnique`, identifiers and entity relationships.
   - Dataset distributions should use `DataDownload` metadata and should not become competing indexable HTML substitutes for the canonical reference page.

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
- direct answer is visible near the top;
- concise key statistics appear near the top when the topic supports them;
- factual claims have traceable provenance;
- structured facts are internally consistent;
- methodology distinguishes source facts from calculations/editorial interpretation;
- responsible author/editor is visible;
- last-verified date is visible;
- canonical production URL is visible;
- recommended citation is visible and copyable;
- downloadable data is exposed where the maintained dataset has reuse value;
- thin/template safeguards pass;
- internal links reinforce the entity/topic graph without forced anchors;
- indexability matches content quality.

## Reusable implementation

Use `CitationTrustPanel` for the visible trust layer instead of creating page-specific variants. Individual page families may add specialized provenance details, but the labels **Sources**, **Methodology**, **Last verified**, **Editor**, **Stable URL**, **Recommended citation**, and **Downloadable data** (when present) stay consistent across promoted resources.

`CitationTrustPanel` derives the stable production URL from the active canonical route by default, identifies the Texas Defined Editorial Desk, and generates a copyable recommended citation. Page families should pass `citationTitle`, `keyStats`, and `dataDownloads` whenever those values are more specific than the panel defaults.
