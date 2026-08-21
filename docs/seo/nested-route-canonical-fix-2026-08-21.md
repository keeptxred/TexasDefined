# Nested route canonical fix — August 21, 2026

Several TexasDefined parent pages are also TanStack Router layout parents because their filenames have nested dot-prefixed child routes. A parent page that renders its own content without an Outlet can swallow the child UI, and a parent head can add a competing canonical to child URLs.

The affected authority families are Fishing, Painted Churches, Top Attractions, Sports Venues, and Texas Data. Their child routes are intended to be independent pages: the child files provide distinct content, metadata, schema, and self-canonical URLs.

Production rule:

- The parent page renders its own hub only when it is the leaf match.
- When a descendant is matched, the parent renders an Outlet so the child page can render.
- Parent SEO head output is emitted only when the parent is the leaf match, preventing a parent canonical from competing with a child canonical.
- Child pages remain eligible for sitemap inclusion when they pass their existing quality and ownership gates.
- Do not solve this class of problem by suppressing otherwise-valid child URLs from sitemaps; fix the route ownership first.
