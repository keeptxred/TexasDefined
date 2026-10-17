// The weekly coordinator runs each complete contract exactly once per build.
export const LOCAL_QUALITY_AUDITS = {
  links: ['node', 'scripts/ci/audit-internal-link-graph-production.mjs'],
  sitemap: ['node', 'scripts/ci/audit-sitemap-page-indexability.mjs'],
  images: ['node', 'scripts/ci/verify-image-discover-production.mjs'],
  venues: ['node', 'scripts/ci/verify-sports-venue-heroes-production-all.mjs'],
  counties: ['bash', 'scripts/ci/audit-county-pages-local.sh'],
  rv: ['node', 'scripts/ci/verify-rv-production-images.mjs'],
  lakes: ['node', 'scripts/ci/verify-live-fishing-authority.mjs'],
  whole: ['node', 'scripts/ci/audit-production-pages.mjs'],
  football: ['node', 'scripts/ci/verify-friday-night-lights-production.mjs'],
};
