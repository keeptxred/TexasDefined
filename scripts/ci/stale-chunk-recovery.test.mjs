import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { staleChunkRecoveryScript } from '../../src/lib/stale-chunk-recovery.ts';

function browserHarness() {
  let ms = 300000;
  const stored = new Map();
  const listeners = [];
  const resourceListeners = [];
  const reloads = [];
  const storage = {
    getItem(key) { return stored.get(key) ?? null; },
    setItem(key, value) { stored.set(key, value); },
  };
  const navigator = { onLine: true };
  const window = {
    addEventListener(name, listener, capture) {
      if (name === 'vite:preloadError') listeners.push(listener);
      if (name === 'error' && capture === true) resourceListeners.push(listener);
    },
    sessionStorage: storage,
    location: { href: 'https://texasdefined.com/property-tax/taxing-unit/ennis-isd',
      origin: 'https://texasdefined.com', reload() { reloads.push(ms); } },
  };
  vm.runInNewContext(staleChunkRecoveryScript, { window, navigator, URL, Date: { now: () => ms } });
  assert.equal(listeners.length, 1, 'register exactly one Vite error listener');
  assert.equal(resourceListeners.length, 1, 'register exactly one capturing script-resource error listener');
  const fire = (message) => {
    let prevented = false;
    listeners[0]({ payload: { message }, preventDefault() { prevented = true; } });
    return prevented;
  };
  const fireAsset = (src, tagName = 'SCRIPT') => resourceListeners[0]({ target: { src, tagName } });
  return { fire, fireAsset, stored, storage, navigator, reloads, advance: (delta) => { ms += delta; } };
}

test('a stale dynamic import triggers one real reload and preserves the throttle', () => {
  const h = browserHarness();
  assert.equal(h.fire('Failed to fetch dynamically imported module: https://texasdefined.com/assets/old-chunk.js'), true);
  assert.equal(h.reloads.length, 1);
  assert.equal(h.fire('Failed to fetch dynamically imported module: https://texasdefined.com/assets/old-chunk.js'), false);
  assert.equal(h.reloads.length, 1, 'no second reload in the same window');
  h.advance(120001);
  assert.equal(h.fire('Importing a module script failed'), true, 'recoverable again after cooldown');
  assert.equal(h.reloads.length, 2);
});

test('unrelated errors and offline failures remain visible, never auto-reload', () => {
  const h = browserHarness();
  assert.equal(h.fire('API returned 500'), false);
  h.navigator.onLine = false;
  assert.equal(h.fire('Failed to load module script'), false);
  assert.equal(h.reloads.length, 0);
});

test('inaccessible session storage leaves the import failure visible, not looping', () => {
  const h = browserHarness();
  h.storage.getItem = () => { throw new Error('storage blocked'); };
  assert.equal(h.fire('Failed to fetch dynamically imported module'), false);
  assert.equal(h.reloads.length, 0);
});

test('recovery is in SSR head before hydration and enforced by canonical merge validation', () => {
  const root = readFileSync('src/routes/__root.tsx','utf8');
  const gate = readFileSync('scripts/ci/run-premerge-validation.mjs','utf8');
  const script = 'dangerouslySetInnerHTML={{ __html: staleChunkRecoveryScript }}';
  assert.ok(root.includes('import { staleChunkRecoveryScript } from "@/lib/stale-chunk-recovery";'));
  assert.ok(root.includes(script));
  assert.ok(root.indexOf(script) < root.indexOf('<HeadContent />'), 'listener must be installed before generated scripts');
  assert.ok(gate.includes("['--experimental-strip-types', '--test', 'scripts/ci/stale-chunk-recovery.test.mjs']"));
});

test('production Chrome gate detects version skew and never silently accepts a stale chunk reload', () => {
  const qa = readFileSync('scripts/ci/verify-football-batch-005-production.mjs','utf8');
  const timeoutLine = qa.match(/^const transientDocumentNavigation=(\/.+\/);$/m);
  assert.ok(timeoutLine, 'school navigation recovery regex must exist');
  const timeoutPattern = vm.runInNewContext(timeoutLine[1]);
  assert.equal(timeoutPattern.test('page.goto: Timeout 60000ms exceeded.\\nCall log:'), true, 'actual Playwright timeout must match');
  assert.equal(timeoutPattern.test('page.goto: net::ERR_CONNECTION_RESET'), true, 'recoverable network disconnect must match');
  assert.equal(timeoutPattern.test('page.goto: HTTP 404'), false, 'an HTTP error is not retryable');
  const assetLine = qa.match(/u\.pathname\.startsWith\('\/assets\/'\) && (\/.+\/).test\(u\.pathname\)/);
  assert.ok(assetLine, 'chunk network diagnostics must match actual .js assets');
  const assetPattern = vm.runInNewContext(assetLine[1]);
  assert.equal(assetPattern.test('/assets/_kind._slug.lazy-CuN7ppXi.js'), true);
  assert.equal(assetPattern.test('/article/something'), false);
  assert.ok(qa.includes("check(workerVersions.size===1"), 'mixed Workers must be a hard acceptance failure');
  assert.ok(qa.includes("check(false,view+': lazy-module recovery was needed during production acceptance'"), 'a self-healed lazy chunk must not silently certify the deployment');
  assert.ok(qa.includes("report.assetTransportIssues=report.checks.flatMap"), 'record chunk HTTP/transport evidence');
});

test('failed initial same-origin hashed <script> reloads once, shared with Vite preloads', () => {
  const h = browserHarness();
  h.fireAsset('https://texasdefined.com/assets/main-BbzNQxMh.js');
  assert.equal(h.reloads.length, 1, 'a 404 on the initial HTML module script must trigger recovery');
  assert.equal(h.fire('Failed to fetch dynamically imported module'), false);
  assert.equal(h.reloads.length, 1, 'resource failure and Vite failure share the same throttle');
  h.advance(120001);
  h.fireAsset('https://texasdefined.com/assets/property-tax.taxing-unit._unit-BdLFe-27.js');
  assert.equal(h.reloads.length, 2, 'one new attempt allowed after cooldown');
});

test('never reload for external, non-JS, non-script, offline or invalid resource errors', () => {
  const h = browserHarness();
  h.fireAsset('https://www.googletagmanager.com/gtm.js');
  h.fireAsset('https://evil.invalid/assets/main-A.js');
  h.fireAsset('https://texasdefined.com/assets/main-B.css');
  h.fireAsset('https://texasdefined.com/public/main-A.js');
  h.fireAsset('https://texasdefined.com/assets/main-A.js', 'LINK');
  h.fireAsset('%not-a-url');
  assert.equal(h.reloads.length, 0);
  h.navigator.onLine = false;
  h.fireAsset('https://texasdefined.com/assets/main-A.js');
  assert.equal(h.reloads.length, 0);
});

test('storage denied and module reload throttled after failed initial script', () => {
  const h = browserHarness();
  h.storage.setItem = () => { throw new Error('blocked session storage'); };
  h.fireAsset('https://texasdefined.com/assets/Container-D5VE1rr_.js');
  assert.equal(h.reloads.length, 0);
  assert.equal(h.fire('Failed to fetch dynamically imported module'), false);
});
