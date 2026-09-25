# TexasDefined Worker production incident — September 2026

## What failed

The production incident contained two distinct regressions rather than one continuous root cause.

1. The first failed release after commit `88b67b0e47abff3509f56c30662194c4a16c9af1` was commit `e496b9715bf133c6adde6203e6d5f5f0a61328a0`. Its Worker could serve normal direct-Worker and custom-domain probes, but `/sitemap.xml` repeatedly exceeded the production timeout. That release synchronously called `footballIsdSitemapEntries()`, which built the live statewide football-by-ISD directory from AskTED data during a public sitemap request. The sitemap path now intentionally excludes that live statewide build.

2. A later broad HTTP 500 regression was a separate runtime-data failure: a destination-curation module referenced a bare `CHECKED` freshness sentinel that was not declared in that module. The bundle could transpile, but SSR module evaluation threw `ReferenceError: CHECKED is not defined`. The runtime-data constant validator and built-Worker SSR smoke now block that class of failure before Cloudflare deployment.

## Recovery evidence

The historical fully verified Worker used during the incident was `82ebf3b0-6d9b-4ea8-9b1d-d597191ba14a`.

Emergency restore workflow run `35601499563`, attempt 2, restored that version. The direct Worker produced one initial HTTP 500 followed by two consecutive HTTP 200 responses; the canonical domain then produced two consecutive HTTP 200 responses.

The original emergency diagnostics were written below a hidden `.artifacts` directory, while `actions/upload-artifact@v4` excluded hidden files by default. Permanent incident diagnostics use visible `artifacts/` paths and fail if an expected incident artifact is missing.

A later failed production run, `35659300523`, proves the visible diagnostics path works: it uploaded artifact `unhealthy-worker-35659300523` for Worker version `0ab3c1b4-f336-45e8-981d-bf44db874c33`. The captured homepage response was HTTP 500 with Cloudflare headers and its serialized SSR state contained `Error("CHECKED is not defined")`. The simultaneous `wrangler tail --status error` file was empty for that request, so the response body was the preserved exception evidence in this incident rather than a tail stack trace.

## Custom-domain finding

`wrangler.jsonc` enables `workers_dev` but does not define the production custom domains. Cloudflare account configuration maps both `texasdefined.com` and `www.texasdefined.com` to the `texasdefined-site` Worker; `.github/workflows/cloudflare-production-smoke.yml` verifies those mappings through the Cloudflare Workers domains API and also verifies the `www` to apex redirect.

The application server redirects `www.texasdefined.com` to `https://texasdefined.com` with HTTP 301. No separate host-specific application is expected for the apex domain.

## Permanent deployment contract

Production deployment is serialized with `cancel-in-progress: false`.

Before replacing the Worker, the workflow requires both the currently serving direct Worker and the canonical domain to stabilize at two consecutive healthy HTTP 200 responses. If either is unhealthy, incident diagnostics are captured and the deployment fails closed without modifying the Worker.

After a deploy, direct Worker health, canonical health, direct Worker discovery, base production surfaces, event structured data, local financial production, statewide financial discovery, advertiser verification, the aggregate live gate, and the guarded IndexNow step must all pass.

Only then is the active Cloudflare Worker version written to the GitHub deployment environment `texasdefined-verified-worker`. Those GitHub deployments form an immutable recovery ledger. The permanent manual restore workflow resolves the newest successful ledger record; it does not use a hard-coded Worker UUID and does not assume that whatever version happened to be live before a failure was healthy.

The client performance ceiling remains exactly **1,825,000 bytes**.
