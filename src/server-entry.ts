import server from "./server";

const SEO_CANONICAL_REDIRECTS: Record<string, string> = {
  "/texas-vs/california": "/article/texas-vs-california-differences",
  "/texas-vs/florida": "/article/texas-vs-florida-differences",
  "/article/live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp": "/article/texas-pitmasters-food-network-competition",
  "/news/live-2026-07-07-texas-pitmasters-to-feature-in-new-food-network-competition-series-v3wglp": "/article/texas-pitmasters-food-network-competition",
};

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    if (request.method === "GET" || request.method === "HEAD") {
      const url = new URL(request.url);
      const path = url.pathname.length > 1 ? url.pathname.replace(/\/+$/, "").toLowerCase() : url.pathname;
      const canonicalPath = SEO_CANONICAL_REDIRECTS[path];
      if (canonicalPath) {
        url.protocol = "https:";
        url.hostname = "texasdefined.com";
        url.port = "";
        url.pathname = canonicalPath;
        return Response.redirect(url.toString(), 301);
      }
    }

    return server.fetch(request, env, ctx);
  },
};
