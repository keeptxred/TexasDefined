# Citation Magnet Batches 2.20–2.26

Status: **implemented for validation except live benchmark 2.25**

- **2.20 — AI-readable tables / JSON-LD / data exports:** adds `/citation-magnets.json`, a canonical machine-readable index of maintained TexasDefined reference resources. Existing comparison/data pages retain their visible tables and JSON-LD.
- **2.21 — Internal citation-magnet linking:** citation resources are linked from the appropriate authority hubs; the attractions comparison is linked from Explore and the city→county relationship dataset is linked from Texas Data.
- **2.22 — `llms.txt` prioritization:** adds a dedicated citation-ready resource section and the machine-readable manifest URL, with retrieval guidance to preserve source, methodology, verification and scope caveats.
- **2.23 — Sitemap/discovery verification:** the Explore sitemap explicitly includes the attractions comparison; the general sitemap remains driven by the governed static-route registry, which includes the city→county dataset.
- **2.24 — Answer/extraction contracts:** the citation-magnet validator checks direct-answer and structured-comparison tokens on key county, property, appraisal, protest, homestead, attractions and relationship resources.
- **2.25 — Live cross-engine recommendation benchmark:** intentionally runs after these discovery changes are merged/deployed so the baseline tests the completed citation architecture.
- **2.26 — Regression protection:** `validate-citation-magnets.mjs` protects the manifest, `llms.txt` coverage, visible Sources/Methodology/Last verified labels, sitemap/governance, internal discovery, extraction contracts and the decision not to promote unsupported county growth/cost rankings. It is wired into the permanent SEO CI contract.
