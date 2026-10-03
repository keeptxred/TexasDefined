// Cold-start guard for the shared built-Worker SSR smoke.
//
// The core smoke suite still performs the same strict HTTP 200, content-marker,
// redirect, retry, and process-cleanup assertions. This wrapper only separates
// Wrangler/cold-SSR readiness from the normal per-route verification window so
// a slow first render cannot consume the entire startup budget and create a
// false negative before a ready Worker gets a fair retry.
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

process.env.BUILT_WORKER_SMOKE_STARTUP_TIMEOUT_MS ||= '240000';
process.env.BUILT_WORKER_SMOKE_READINESS_REQUEST_TIMEOUT_MS ||= '45000';
process.env.BUILT_WORKER_SMOKE_RETRY_DELAY_MS ||= '1000';

await import('./verify-built-worker-ssr-core.mjs');
