/** Client-only early bootstrap. Head must register before Vite module scripts. */
export const staleChunkRecoveryScript = String.raw`
(function () {
  // Vite emits this event for a failing lazy import, often when an older
  // browser tab requests a hashed chunk removed by a later deployment.
  var key = 'td:stale-chunk-reload-at:v1';
  var cooldownMs = 120000;
  window.addEventListener('vite:preloadError', function (event) {
    var payload = event && event.payload;
    var message = String(payload && (payload.message || payload) || '');
    if (!/Failed to fetch dynamically imported module|Importing a module script failed|Failed to load module script/i.test(message)) return;
    if (navigator.onLine === false) return;
    try {
      var previous = Number(window.sessionStorage.getItem(key) || '0');
      var now = Date.now();
      if (!Number.isFinite(previous) || (previous > 0 && now - previous < cooldownMs)) return;
      window.sessionStorage.setItem(key, String(now));
    } catch (_unavailableStorage) {
      // No storage means no reliable one-shot safeguard: never risk a reload loop.
      return;
    }
    // Prevent the stale import error only when a bounded real recovery is begun.
    event.preventDefault();
    window.location.reload();
  });
})();
`;
