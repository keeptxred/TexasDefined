# TexasDefined page publication contract

This contract exists to stop new cleanup debt from entering production. The merge gate remains a backstop; page builders and index-readiness functions are the first line of defense.

## Release rule

A new or materially changed public page must not become indexable until its page-family readiness function qualifies it. Failed pages remain directly reviewable where appropriate, but must stay out of indexable discovery and XML sitemaps until remediated.

## Required publication qualities

Indexable pages must have, as applicable to the page family:

- a human-readable, non-garbled title or H1;
- a useful summary/dek aligned with the page intent;
- substantive, non-duplicate body content;
- sane heading structure for long-form editorial pages;
- a valid canonical/indexability decision;
- a real hero image, descriptive alt text and declared dimensions;
- crawlable internal discovery from related TexasDefined content;
- verified internal destinations rather than invented URLs;
- source/freshness evidence where the page makes changing factual claims;
- no placeholder, generic fallback or temporary representative imagery on indexable destination pages;
- sitemap inclusion only after the family readiness gate returns true.

## Article floor

`isArticleIndexReady` is the shared article boundary. A full editorial article must satisfy metadata, title, hero, internal-discovery, editorial-structure and body-depth checks. Lazy catalog stubs may omit the body, but the final article route still applies the full gate before indexing.

## Destination floor

`auditDestination(...).readyForIndexing` is the destination boundary. A destination cannot qualify with thin/generic copy, placeholder imagery, missing official-source evidence, invalid Texas coordinates or undersized/missing hero dimensions.

## Change policy

Do not weaken these floors to make a PR pass. Fix the page/content that violates them. Existing legacy weaknesses should be remediated deliberately; new work must not add more of the same debt.
