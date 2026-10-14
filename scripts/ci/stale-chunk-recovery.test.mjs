import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { staleChunkRecoveryScript } from '../../src/lib/stale-chunk-recovery.ts';

function browserHarness() {
  let ms = 300000;
  const stored = new Map();
  const listeners = [];
  const reloads = [];
  const storage = {
    getItem(key) { return stored.get(key) ?? null; },
    setItem(key, value) { stored.set(key, value); },
  };
  const navigator = { onLine: true };
  const window = {
    addEventListener(name, listener) {
      if (name === 'vite:preloadError') listeners.push(listener);
    },
    sessionStorage: storage,
    location: { reload() { reloads.push(ms); } },
  };
  vm.runInNewContext(staleChunkRecoveryScript, { window, navigator, Date: { now: () => ms } });
  assert.equal(listeners.length, 1, 'register exactly one Vite error listener');
  const fire = (message) => {
    let prevented = false;
    listeners[0]({ payload: { message }, preventDefault() { prevented = true; } });
    return prevented;
  };
  return { fire, stored, storage, navigator, reloads, advance: (delta) => { ms += delta; } };
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
