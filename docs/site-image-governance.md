# TexasDefined site image governance

## Production rule

Every public, indexable TexasDefined directory/detail page whose template expects a hero image must have a compliant hero before it is considered production-ready.

Covered surfaces include events, sports venues, destinations, RV parks, attractions, wedding venues, golf courses, food trucks, and comparable place/profile detail pages. Intentionally text-only utility pages are outside this requirement unless their template defines a hero.

A page is not image-compliant when its hero is missing, blank, broken, a generic placeholder, a fallback SVG, a procedural placeholder graphic, unrelated to the subject, or missing the source/rights information required by that image registry.

## Required acquisition order

1. **Exact-subject reusable real image.** Prefer Wikimedia Commons, government/open-media libraries, appropriately licensed Flickr media, owner-provided media with permission, or another source with explicit commercial reuse rights.
2. **Approved exact-subject internal media.** Reuse an existing TexasDefined asset only when it actually depicts the same subject and its provenance is already governed.
3. **Photorealistic AI fallback.** When a reasonable reusable-image search produces no compliant result, generate a photorealistic editorial image specific to the place/event and attach it as the hero.

A missing image is not an acceptable final fallback. A procedural gradient, generic stock substitute, generic regional AI scene, or decorative SVG does not satisfy this rule.

## AI fallback requirements

AI fallback must be photorealistic, relevant to the named subject and known setting, and suitable for editorial hero use. It must be grounded in verified visual facts about the named place/event as reasonably available from official or otherwise reliable sources. It must avoid fake documentary claims about an exact camera view, fabricated logos or sponsor marks, copyrighted poster/key art, embedded text, watermarks, and recognizable private individuals.

A generic or merely regional representative AI image is remediation-only. It may remain temporarily on a fail-closed page while a compliant hero is being sourced, but it does not satisfy final image readiness and must not make the page indexable or sitemap-eligible.

AI-generated media must be identified in the relevant registry as TexasDefined generated media (or the equivalent governed source type) and must carry an attribution/rights note identifying the generation system and editorial-use status.

## Prohibited sources

Do not treat public visibility as reuse permission. Do not ingest images from Google Images, Yelp, Tripadvisor, Facebook, Instagram, news/media pages, or commercial stock libraries unless the specific asset has explicit rights that permit TexasDefined's commercial use.

## Fail-closed publishing rule

Covered pages without a compliant hero must fail closed:

- they may remain reachable while remediation is in progress;
- they must emit `noindex, follow, max-image-preview:large` (or a stricter noindex directive);
- they must not be emitted in an indexable sitemap until image compliance is restored;
- internal audits/CI must report the missing or noncompliant hero as an actionable failure.

Once a compliant hero is attached and the relevant image validator passes, normal indexability and sitemap eligibility may resume.

## Automation rule

Image-reconciliation automation must search reusable sources first. If no compliant result is found, it must use the configured photorealistic image-generation service with subject-specific, verified grounding. If neither path succeeds, the job must leave the page unresolved and fail/report it; automation must never manufacture a procedural placeholder or generic representative scene and count that as final success.

## Duplicate-image rule

Do not reuse one hero across unrelated subjects merely to satisfy coverage. Deliberate reuse is allowed only when the image truthfully represents every page using it and the reuse is documented by the governing registry.
