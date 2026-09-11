# Stay Nearby AI card fallbacks

When a curated Stay Nearby hotel does not have rights-qualified real property photography, TexasDefined may show a first-party AI-generated **area illustration** on the hotel card.

These illustrations are visual fallbacks only. They do not depict, reconstruct, or claim to represent the named hotel property. Every AI fallback card displays the visible disclosure:

> AI-generated area illustration — not the hotel property

## Precedence

1. A verified real property image from the approved Expedia Creator Toolbox workflow, paired with a verified matching property affiliate referral, takes precedence.
2. If no permitted real property image exists, the approved AI area illustration may render.
3. If neither is available, the existing text/geographic fallback remains.

The real-property image gate in `public/expedia-travel.js` remains unchanged.

## Safety and integrity

AI fallback SVGs are first-party files under `public/images/stay-nearby/ai/`. They contain no hotel names, logos, external image references, executable scripts, or `foreignObject` content. The canonical fallback records live in `public/stay-nearby-ai-fallbacks.json` and explicitly set `depictsProperty` to `false`.

`validate-expedia-affiliate.mjs` and the production Stay Nearby verifier enforce the exact disclosure, approved paths, record count, SVG safety rules, property-name separation, and real-property-image precedence.