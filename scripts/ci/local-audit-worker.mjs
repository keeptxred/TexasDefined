// This wrapper is copied beside the built entry; it is never deployed.
// Prevent SSR's absolute self-fetches from silently escaping to the paid Worker.
import worker from './index.js';
import { createAuditWorkerFetch } from './.local-quality-worker-fetch.mjs';
const outboundFetch = globalThis.fetch.bind(globalThis);
let assets;
globalThis.fetch = createAuditWorkerFetch(outboundFetch, () => assets);
export default {
  fetch(request, env, ctx) {
    assets = env.ASSETS;
    return worker.fetch(request, env, ctx);
  },
};
