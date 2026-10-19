# Full-site audit cost policy

The October 15, 2026 billing investigation found that repeated production crawls
from our own GitHub audit jobs dominated TexasDefined's Worker CPU. The internal
link, sitemap/indexability, and image audits must no longer run against the live
Worker after every deployment. This intentionally supersedes their previous
post-deployment workflow wiring requirement. All content, graph, robots,
canonical, image-size, provenance, and strict failure assertions remain required.

`audit-whole-site-production.yml` formerly scheduled the consolidated weekly crawl.
**Owner hold, October 19, 2026: no sitewide audits may run or restart.** Its cron
was removed and both the caller and reusable audit job have explicit false guards,
so neither a manual dispatch nor a workflow call can launch an audit. Future
reactivation requires the owner's explicit approval. The preserved local-runner
implementation is not an authorization to execute it. Historically these audits
used one local workerd build to run nine complete checks. The nine cover
internal links, sitemap indexability, Discover images, sports venue heroes, all
254 county pages, RV images, lake reciprocal links, whole-site page quality,
and Friday Night Lights. The six additional migrations supersede their former
per-deployment or independent scheduled production-crawl requirements. Before being disabled, the
coordinator preserved permanent authority backlog issue #4704 with the local
report and uploaded evidence. Existing backlog information remains intact. Source-only PR checks remain. Source-only pull-request validation and ordinary deploy health checks remain active;
full-site manual workflow entry points are disabled at job level.
Retained for historical reproducibility only; do not run without new authorization.
Former local command after `npm ci` and `npm run build`:

    node scripts/ci/run-local-quality-audits.mjs all

For production-equivalent Discover image coverage, run `npm run prebuild` and
`node scripts/assets/materialize-discover-overrides.mjs` before building, with
ImageMagick and librsvg installed, as the scheduled workflow does.

Reports retain production canonical URLs while requests go to loopback. Absolute
redirects back to production are also mapped locally. The temporary Worker wrapper
serves self-fetched static content from its local ASSETS binding and refuses other
production subrequests. AI/analytics bindings and deployment credentials are
removed. Each full crawler is read-only, refuses a non-loopback target, counts
every retry/redirect against a 100,000-request ceiling, and fails on exhaustion.
No request cap may silently truncate a graph or turn incomplete evidence green.

The local audits prove the checked-out source/build, not deployment or CDN health.
The canonical pre-merge validation and the existing blocking deployment health,
version, runtime and publication checks remain unchanged. Future sitewide crawls
must follow this local transport policy; full production recrawls must never be
added to deployment fan-out. External source/image validation and public Supabase
reads may still contact their own services; local execution does not imply every
third-party service is offline.
