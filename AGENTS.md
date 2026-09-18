## Engineering definition of done

For every code, data, content-system, routing, SEO, image-governance, build, or automation change:

- Treat `npm run validate:premerge` as the canonical deterministic pre-merge contract. `npm run validate` is a compatibility alias for that exact same runner and must never become a separate validation chain.
- Run targeted checks while developing, but never treat targeted checks, typecheck, or a successful production build as sufficient proof that the task is complete.
- Before opening or updating a PR, run the canonical pre-merge validator on the feature branch.
- Reconcile the branch with the newest `main`, then run the canonical pre-merge validator again on the reconciled head before merging.
- Do not declare implementation complete while any canonical check is failing, skipped unexpectedly, or unverified.
- The canonical runner intentionally continues through independent checks after failures so one run exposes the full known deterministic failure set. Fix the complete set before rerunning.
- If a production-only verification cannot run until after deployment, state that explicitly; complete the deterministic pre-merge contract first, then verify the deployed merge SHA.
- Do not weaken, bypass, delete, raise budgets for, or convert fail-closed validation into warnings merely to make a change pass. Fix the underlying regression unless the governing requirement itself is intentionally changed and documented.
- Add future required deterministic merge checks to `scripts/ci/run-premerge-validation.mjs`, not as separate hidden commands in `.github/workflows/merge-gate.yml`, `.github/workflows/validate.yml`, or `package.json`. The workflow, package-script, and developer entry points must all remain aliases for the same source of truth.
- Auxiliary PR workflows may provide faster feature-specific feedback, but they must be path-scoped and their deterministic requirements must also exist in the canonical pre-merge contract. Do not create a second unscoped PR validation contract.
- Validators that enforce CI wiring must validate the canonical contract itself, not depend on unrelated implementation details remaining textually embedded in a workflow YAML file.

## Editorial article rule

For every new Texas Defined editorial article:

- Follow `EDITORIAL_STYLE.md`.
- Include useful internal cross-links to existing Texas Defined content before the article is considered publish-ready.
- Include at least 2 relevant internal links when suitable site destinations exist; prefer 3–5 for normal long-form evergreen articles when they add reader value.
- Link contextually to related articles and/or relevant site pages such as Explore destinations, guides, tools, calculators, city/county pages, events, Home & Garden, History, Moving Here, or other appropriate sections.
- Use descriptive anchor text and never generic text such as `click here`.
- Verify every internal route exists. Never invent or guess an internal URL.
- When a new article strengthens an existing topic cluster, consider adding reciprocal links from older related articles back to the new article.
