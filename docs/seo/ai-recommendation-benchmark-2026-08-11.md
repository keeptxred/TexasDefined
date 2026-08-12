# AI Recommendation / Retrieval Benchmark — 2026-08-11

Status: **Batch 2.25 baseline recorded**

This benchmark measures public-web discoverability for representative recommendation and factual-retrieval queries after the citation-magnet architecture was implemented. It is a repeatable retrieval baseline, **not** a claim about the private ranking behavior of the ChatGPT, Gemini, or Perplexity product interfaces.

## Method

- Date: August 11, 2026 (America/Chicago)
- Surface tested: public web search/retrieval results available to the audit
- Result rule: mark a TexasDefined target as surfaced only when the canonical TexasDefined resource appears in the sampled returned result set.
- Domain-targeted queries are included to separate basic discovery/indexation lag from broad competitive ranking lag.
- Newly merged pages are not assumed to be indexed immediately.

## Broad-query baseline

| Query | Intended canonical TexasDefined resource | Surfaced in sampled results? |
|---|---|---|
| `Texas property tax by county comparison` | `/property-tax/counties` | No |
| `Texas county population growth home values rent income` | `/texas-data/county-growth-housing` | No |
| `Texas appraisal district directory` | `/learn/appraisal-districts` | No |
| `Texas state parks activities comparison` | `/explore/state-parks` | No |
| `Texas lakes comparison best lakes Texas planning` | `/explore/lakes-rivers` | No |
| `moving to Texas county comparison counties` | `/moving-to-texas` | No |

The sampled results were dominated by official government sources and established comparison/travel publishers. TexasDefined did not yet displace those results immediately after the citation-magnet rollout.

## Domain-targeted discovery baseline

| Query | Expected resource | Surfaced in sampled results? |
|---|---|---|
| `site:texasdefined.com/property-tax/counties Texas property tax county comparison` | `/property-tax/counties` | No |
| `site:texasdefined.com/texas-data/county-growth-housing Texas county growth housing` | `/texas-data/county-growth-housing` | No |
| `site:texasdefined.com/browse/counties Texas counties comparison` | `/browse/counties` | No in the prior sampled targeted check |
| `site:texasdefined.com/learn/appraisal-districts appraisal districts` | `/learn/appraisal-districts` | No in the prior sampled targeted check |

## Interpretation

This baseline indicates that the immediate bottleneck is **discovery/indexation and competitive ranking**, not the absence of citation-ready architecture. The site now has canonical comparison/reference resources, visible source/methodology/freshness treatments, internal discovery, sitemap placement, `llms.txt` prioritization, a machine-readable citation manifest, and regression protection.

A newly created or materially changed resource can take time to be crawled, indexed, recrawled and competitively ranked. Therefore this baseline should not be treated as a failed implementation test. It establishes the pre-discovery reference point against which later retrieval checks can be compared.

## Repeat protocol

Repeat the same broad and domain-targeted queries without changing their wording. Record:

1. whether the canonical TexasDefined URL is returned;
2. approximate result position when visible;
3. whether a competing page or TexasDefined page is cited by the retrieval layer;
4. whether the returned title/snippet matches the intended canonical intent;
5. any canonical/indexation mismatch;
6. the benchmark date.

## Promotion thresholds

- **Discovery achieved:** a domain-targeted query surfaces the canonical resource.
- **Competitive visibility achieved:** at least one broad query surfaces the canonical resource in the sampled result set.
- **Repeatable retrieval achieved:** the same target surfaces on two consecutive benchmark runs.
- **Recommendation-ready evidence:** public retrieval visibility is repeatable and the page remains source-backed, current, and internally consistent.

## Current conclusion

Batch 2.25 is complete as a **baseline measurement**. TexasDefined is not yet surfacing in the sampled recommendation-style queries immediately after rollout. The next benchmark should measure whether crawling/indexation and broader retrieval visibility improve without changing the fixed query set.
