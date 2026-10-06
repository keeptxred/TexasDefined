# Texas Loops & Spurs FAQ schema patch

Run `bash scripts/apply-loops-spurs-faq-schema.sh` from the repository root.

The transformer is intentionally idempotent and anchor-guarded. It makes only two registrations in `src/routes/article.$slug.tsx`:

1. adds `texas-loops-spurs-explained` to `FAQ_ARTICLE_SLUGS`;
2. maps that slug to the existing visible heading `Frequently asked questions about Texas Loops and Spurs`.

It refuses to modify the route if the expected current anchors have changed, which avoids replacing newer concurrent route work with a stale full-file snapshot. The verifier fails unless both registrations are present.
