## Cloudflare connection and cache operations — no reconnection prompts

- **Standing instruction:** Cloudflare is already connected for this project's existing production setup. Do not ask the user to reconnect, reinstall, or reauthorize Cloudflare merely to continue a cache, purge, Worker, or deployment task. Repeated connection prompts are explicitly prohibited.
- Cloudflare read access, cache-purge write permissions, and individual operation approvals are distinct. An authorization prompt or denied cache-purge action **does not establish that the Cloudflare connection is disconnected**; do not misdiagnose it as such.
- **Never invoke a Cloudflare connector cache purge as a routine cleanup step.** Favor the established GitHub-to-Cloudflare deployment and post-deploy checks. Where freshness matters, use targeted cache-busted reads and compare with the canonical URL; do not claim a cache was purged unless confirmed.
- Only attempt an explicit cache purge when the user specifically requests that operation and the existing connection authorizes it without a new connection or approval workflow. If it prompts for new authorization, stop that optional cache operation immediately, record "cache purge skipped: operation-level authorization needed," and continue all independent tasks. **Do not ask the user to reconnect and do not retry in a loop.**
- If a genuinely essential Cloudflare operation fails due to permissions, report the specific denied action **once**, distinguish that from connector connection health, and continue with already authorized workflows. Never claim the action succeeded if it did not.
- **Cloudflare Browser Rendering / Browser Run consent trap:** A seemingly read-only screenshot or fully-rendered HTML check via the Cloudflare connector is a `POST /accounts/{account_id}/browser-rendering/content` (or `/screenshot`, `/pdf`, `/snapshot`, `/scrape`) operation. These quick-action endpoints require **Browser Rendering - Edit**, a separate OAuth/API authorization. **Do not call them for routine production QA, page inspection, imagery, or simple public HTML retrieval.** Use the public HTTPS URL through normal web tools or the repository's existing GitHub Actions/Playwright verification instead. Do not substitute a Cloudflare browser action for ordinary web reading.
- **Avoid false reconnect diagnosis:** A ChatGPT authorization prompt after a specific POST action (Browser Rendering, cache purge, etc.) is an **operation-level scope/approval issue**, not proof of a disconnected Cloudflare connector. "Allow all actions" in ChatGPT is not a guarantee that every Cloudflare API scope was granted. Do not trigger the denied action a second time, suggest reconnecting, or spin on authorization. For a connection-health check use the existing Cloudflare identity and harmless GET requests for Worker/zone/deployment; note the exact failed endpoint and HTTP status if actually available. Never guess a token-expiry error when only one privileged action failed.
- **Production verification without interactive Cloudflare writes:** Prefer the native GitHub deploy workflow and its bounded protected live-site checks, public HTTPS reads (including cache-busted comparisons if justified), and read-only Cloudflare Worker deployment/version GETs. No manual purge or Cloudflare Browser Rendering POST is needed for normal shipping, and deployment workflow credentials are separate from the ChatGPT connector. Do not add or require new OAuth scopes, new API tokens, or user reconnection merely to inspect a page.


## Engineering definition of done

For every code, data, content-system, routing, SEO, image-governance, build, or automation change:

- Treat `node scripts/ci/run-premerge-validation.mjs` as the canonical deterministic pre-merge contract.
- Run targeted checks while developing, but never treat targeted checks, typecheck, or a successful production build as sufficient proof that the task is complete.
- Before opening or updating a PR, run the canonical pre-merge validator on the feature branch.
- Reconcile the branch with the newest `main`, then run the canonical pre-merge validator again on the reconciled head before merging.
- Do not declare implementation complete while any canonical check is failing, skipped unexpectedly, or unverified.
- The canonical runner intentionally continues through independent checks after failures so one run exposes the full known deterministic failure set. Fix the complete set before rerunning.
- If a production-only verification cannot run until after deployment, state that explicitly; complete the deterministic pre-merge contract first, then verify the deployed merge SHA.
- Do not weaken, bypass, delete, raise budgets for, or convert fail-closed validation into warnings merely to make a change pass. Fix the underlying regression unless the governing requirement itself is intentionally changed and documented.
- Add future required deterministic merge checks to `scripts/ci/run-premerge-validation.mjs`, not as separate hidden commands in `.github/workflows/merge-gate.yml`. The workflow and developer contract must remain the same source of truth.
- Auxiliary PR workflows may provide faster feature-specific feedback, but they must be path-scoped and their deterministic requirements must also exist in the canonical pre-merge contract. Do not create a second unscoped PR validation contract.
- Validators that enforce CI wiring must validate the canonical contract itself, not depend on a particular command remaining textually embedded in a workflow YAML file.

## Update verification cost policy

- The canonical pre-merge contract is required once for each candidate revision; GitHub's protected merge gate remains mandatory. Reuse valid local evidence when the source tree and base have not changed. Re-run after material changes or reconciliation.
- Do not add a second automatic post-merge run of the full contract or its watchdog. `validate.yml` remains an explicit manual entry point for automation branch prevalidation.
- Feature production/browser acceptance workflows are manual unless a documented change scope requires them. Never attach a content project's acceptance crawl to every deployment.
- Each deployment proves health, deployed Worker identity, a bounded sample of changed pages/dependencies, and relevant native feature gates. This smoke is not a full-content certification. Preserve failures for every selected check.
- Complete broad audits run weekly against the local built Worker. See docs/update-scan-policy.md and scripts/ci/update-scan-policy.json.

## Editorial article rule

For every new Texas Defined editorial article:

- Follow `EDITORIAL_STYLE.md`.
- Include useful internal cross-links to existing Texas Defined content before the article is considered publish-ready.
- Include at least 2 relevant internal links when suitable site destinations exist; prefer 3–5 for normal long-form evergreen articles when they add reader value.
- Link contextually to related articles and/or relevant site pages such as Explore destinations, guides, tools, calculators, city/county pages, events, Home & Garden, History, Moving Here, or other appropriate sections.
- Use descriptive anchor text and never generic text such as `click here`.
- Verify every internal route exists. Never invent or guess an internal URL.
- When a new article strengthens an existing topic cluster, consider adding reciprocal links from older related articles back to the new article.


## Museum authority pages — automatic requirement

When asked to create or improve a museum page, ALWAYS apply docs/museum-authority-standard.md instead of the generic historic-site template. Be the best independent visitor guide, NOT a mirror of the museum's complete collections. Update the existing canonical destination, record up to ten useful brief exhibit highlights (fewer where warranted), true kid/family fit, dining type (cafe vs cafeteria vs full restaurant vs unverified), admission, visit time, parking/map, access/sensory needs, exact-location rights-cleared photos and helpful two-way county/city and nearby-page links. Research genuine museum-specific visitor QUESTIONS via the museum's own FAQ AND independent visitor questions; then write source-verified answers and register them in src/data/museum-visitor-faqs.ts. The institution's FAQ is never sufficient as the sole research source, and question popularity must not be claimed without evidence. Each new museum needs a MuseumAuthorityDossier in src/data/museum-authority-network.ts and researched FAQ, validated through scripts/data/validate-museum-authority.mjs in the canonical premerge contract. No boilerplate FAQ, copied collection catalog, invented amenity, guessed crosslink or declaration of authority without direct visitor-guide comparison and live QA.
