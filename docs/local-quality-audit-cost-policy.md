# Full-site audit cost policy

The October 15, 2026 billing investigation found that repeated production crawls
from our own GitHub audit jobs dominated TexasDefined's Worker CPU. The internal
link, sitemap/indexability, and image audits must no longer run against the live
Worker after every deployment. This intentionally supersedes their previous
post-deployment workflow wiring requirement. All content, graph, robots,
canonical, image-size, provenance, and strict failure assertions remain required.

`audit-whole-site-production.yml` is the single weekly coordinator. It calls
`audit-site-quality-local.yml` to build the site once and run all nine complete
audits against a local workerd process on the GitHub runner. The nine cover
internal links, sitemap indexability, Discover images, sports venue heroes, all
254 county pages, RV images, lake reciprocal links, whole-site page quality,
and Friday Night Lights. The six additional migrations supersede their former
per-deployment or independent scheduled production-crawl requirements. The
coordinator preserves the permanent authority backlog issue #4704 using the local
report and uploads evidence even when an audit fails. Source-only PR checks remain. The former
workflow names remain manual entry points for a single complete local audit.
Run locally after `npm ci` and `npm run build` with:

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
