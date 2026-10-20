const SITE_HOSTS = new Set(['texasdefined.com', 'www.texasdefined.com', 'texasdefined-site.freddy-coppola.workers.dev', 'keeptxred.com', 'www.keeptxred.com']);
const REDIRECTS = new Set([301, 302, 303, 307, 308]);

export function createAuditWorkerFetch(outboundFetch, getAssets) {
  return async (input, init) => {
    let request = new Request(input, init);
    for (let hop = 0; hop <= 8; hop += 1) {
      const url = new URL(request.url);
      let response;
      if (SITE_HOSTS.has(url.hostname) || /(?:^|\.)texasdefined\.com$|(?:^|\.)keeptxred\.com$|(?:^|\.)workers\.dev$/.test(url.hostname)) {
        const assets = getAssets();
        if (url.hostname === 'texasdefined.com' && /^\/(?:content|images|assets)\//.test(url.pathname) && assets && ['GET', 'HEAD'].includes(request.method)) {
          response = await assets.fetch(request);
        } else {
          throw new Error(`Local audit blocked production subrequest: ${url.origin}${url.pathname}`);
        }
      } else {
        response = await outboundFetch(new Request(request, { redirect: 'manual' }));
      }
      if (!REDIRECTS.has(response.status) || request.redirect === 'manual') return response;
      if (request.redirect === 'error') throw new Error('Unexpected local audit subrequest redirect');
      const location = response.headers.get('location');
      if (!location) return response;
      if (!['GET', 'HEAD'].includes(request.method)) throw new Error('Non-read-only audit subrequest redirect refused');
      await response.body?.cancel();
      const target = new URL(location, request.url);
      const headers = new Headers(request.headers);
      if (target.origin !== url.origin) {
        headers.delete('authorization');
        headers.delete('cookie');
      }
      request = new Request(target, { method: request.method, headers, redirect: request.redirect, signal: request.signal });
    }
    throw new Error('Local audit subrequest redirect limit exceeded');
  };
}
