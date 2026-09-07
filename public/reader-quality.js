(() => {
  const SESSION_KEY = 'texasdefined:analytics-session';
  const INTERNAL_BROWSER_KEY = 'texasdefined:reader-quality-internal';
  const INGEST_PATH = '/api/reader-quality';
  const MAX_INTERACTIONS = 500;

  const storage = () => {
    try { return window.localStorage; } catch { return undefined; }
  };
  const excluded = (path = location.pathname) => {
    const host = location.hostname.toLowerCase();
    return host === 'localhost' || host === '127.0.0.1' || host === '::1' || path === '/admin' || path.startsWith('/admin/') || storage()?.getItem(INTERNAL_BROWSER_KEY) === '1';
  };
  if (excluded()) return;

  const local = storage();
  let sessionId = local?.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    local?.setItem(SESSION_KEY, sessionId);
  }

  const referrerClass = (() => {
    if (!document.referrer) return 'direct';
    try {
      const url = new URL(document.referrer);
      if (url.origin === location.origin) return 'internal';
      const host = url.hostname.toLowerCase().replace(/^www\./, '');
      if (/(^|\.)(google|bing|duckduckgo|yahoo)\./.test(host)) return 'search';
      if (/(^|\.)(chatgpt\.com|perplexity\.ai|claude\.ai|copilot\.microsoft\.com)$/.test(host)) return 'ai';
      if (/(^|\.)(facebook\.com|instagram\.com|x\.com|twitter\.com|tiktok\.com|reddit\.com)$/.test(host)) return 'social';
      return 'other';
    } catch {
      return 'unknown';
    }
  })();

  let currentPath = location.pathname + location.search;
  let visibleMs = 0;
  let visibleSince = document.visibilityState === 'visible' ? performance.now() : undefined;
  let interactionCount = 0;
  let maxScrollPercent = 0;
  let signals = {};
  let lastMilestone = '';
  let scrollFrame = 0;

  const totalVisibleMs = () => visibleMs + (visibleSince == null ? 0 : Math.max(0, performance.now() - visibleSince));
  const snapshot = () => ({
    sessionId,
    path: currentPath,
    occurredAt: new Date().toISOString(),
    visibleMs: Math.round(totalVisibleMs()),
    interactionCount,
    maxScrollPercent,
    referrerClass,
    signals: {
      ...signals,
      visible10s: totalVisibleMs() >= 10_000,
      visible30s: totalVisibleMs() >= 30_000,
      scroll50: maxScrollPercent >= 50,
      scroll90: maxScrollPercent >= 90,
    },
  });
  const send = (preferBeacon = false) => {
    if (excluded(currentPath.split('?')[0])) return;
    const body = JSON.stringify(snapshot());
    if (preferBeacon && navigator.sendBeacon) {
      const sent = navigator.sendBeacon(INGEST_PATH, new Blob([body], { type: 'application/json' }));
      if (sent) return;
    }
    void fetch(INGEST_PATH, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => undefined);
  };
  const resetForPath = (path) => {
    if (path === currentPath) return;
    currentPath = path;
    visibleMs = 0;
    visibleSince = document.visibilityState === 'visible' ? performance.now() : undefined;
    interactionCount = 0;
    maxScrollPercent = 0;
    signals = {};
    lastMilestone = '';
  };
  const afterNavigation = () => window.setTimeout(() => resetForPath(location.pathname + location.search), 75);
  const markInteraction = (kind, event) => {
    if (!event.isTrusted) return;
    interactionCount = Math.min(MAX_INTERACTIONS, interactionCount + 1);
    signals[kind] = true;
  };

  document.addEventListener('pointerdown', (event) => markInteraction('pointer', event), { passive: true });
  document.addEventListener('keydown', (event) => {
    if (!event.metaKey && !event.ctrlKey && !event.altKey) markInteraction('keyboard', event);
  });
  document.addEventListener('scroll', (event) => {
    if (!event.isTrusted || scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      const root = document.documentElement;
      const scrollable = Math.max(1, root.scrollHeight - innerHeight);
      maxScrollPercent = Math.max(maxScrollPercent, Math.max(0, Math.min(100, Math.round((scrollY / scrollable) * 100))));
    });
  }, { passive: true });
  document.addEventListener('click', (event) => {
    if (!event.isTrusted) return;
    const anchor = event.target?.closest?.('a[href]');
    if (!anchor) return;
    try {
      const destination = new URL(anchor.href, location.href);
      if (destination.origin === location.origin && destination.pathname !== location.pathname) {
        interactionCount = Math.min(MAX_INTERACTIONS, interactionCount + 1);
        signals.internalClick = true;
        send(true);
        afterNavigation();
      }
    } catch {}
  }, true);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      if (visibleSince != null) visibleMs += Math.max(0, performance.now() - visibleSince);
      visibleSince = undefined;
      if (visibleMs >= 10_000 || interactionCount > 0 || maxScrollPercent >= 50) send(true);
    } else if (visibleSince == null) {
      visibleSince = performance.now();
    }
  });
  window.addEventListener('pagehide', () => send(true));
  window.addEventListener('popstate', () => {
    send(true);
    afterNavigation();
  });
  window.setInterval(() => {
    const seconds = Math.floor(totalVisibleMs() / 1000);
    const milestone = seconds >= 120 ? '120s' : seconds >= 30 ? '30s' : seconds >= 10 ? '10s' : '';
    if (milestone && milestone !== lastMilestone) {
      lastMilestone = milestone;
      send();
    }
  }, 2_000);
})();
