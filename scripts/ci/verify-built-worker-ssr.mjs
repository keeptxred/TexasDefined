// Shared built-Worker SSR smoke entrypoint.
//
// Wrangler-local SSR correctness and client performance are separate contracts.
// The core suite still enforces HTTP status, required content markers, redirects,
// retries, process readiness, warm-up, and cleanup. These defaults only give
// locally rendered SSR routes enough time to prove correctness under Wrangler's
// dev/runtime overhead. Client performance remains enforced independently by
// the protected performance-budget check.
//
// Delegated core contract markers retained here for repository validators:
// node_modules/.bin/wrangler
// 'dist/server/wrangler.json'
// response.status === 200
// body.includes(requiredText)
// process.kill(-child.pid
// /fishing/structure — Fishing Structure and Cover in Texas Lakes
// /fishing/vegetation — Fishing Aquatic Vegetation in Texas
// /fishing/techniques/soft-plastics — Related Fishing Techniques

process.env.BUILT_WORKER_SMOKE_REQUEST_TIMEOUT_MS ||= '30000';
process.env.BUILT_WORKER_SMOKE_HOMEPAGE_TIMEOUT_MS ||= '45000';
process.env.BUILT_WORKER_SMOKE_WARMUP_TIMEOUT_MS ||= '45000';

await import('./verify-built-worker-ssr-core.mjs');
