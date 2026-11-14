/** Map Apple's legacy touch icon request to the site's existing real PNG. */
export function legacyAppleIconRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  if (url.pathname !== "/apple-touch-icon-precomposed.png") return null;
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }
  // Reuse the already versioned public/apple-touch-icon.png binary, not a
  // synthetic asset or a redirect to a path that has never been built.
  return new Response(null, { status: 301, headers: {
    Location: new URL("/apple-touch-icon.png", url).toString(),
    "Cache-Control": "public, max-age=86400",
    "X-Content-Type-Options": "nosniff",
  }});
}
