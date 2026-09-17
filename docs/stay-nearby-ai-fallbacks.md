# Stay Nearby hotel image fallback policy

Stay Nearby hotel cards use a fail-closed image hierarchy. TexasDefined never uses a generic hotel illustration or SVG placeholder as a hotel-card fallback.

## Image precedence

1. A verified real property image from an approved affiliate/partner workflow may render when the image has explicit usage rights, is stored as a first-party asset, and is paired with a verified matching property referral.
2. If no approved real property image exists, TexasDefined may render a first-party **photorealistic AI depiction of the exact listed property**. The depiction must be grounded to the verified property identity, exact street address, and a manually verified exact-property visual reference.
3. If neither image source passes its gate, the card remains text-only. The system must not substitute a generic building, neighborhood illustration, vector placeholder, or unverified third-party hotel image.

The real-property image gate in `public/expedia-travel.js` retains precedence over AI imagery.

## AI property-image requirements

Approved AI property imagery is registered in `public/stay-nearby-ai-property-images.json` and stored under `public/images/stay-nearby/properties/`.

Every AI property image must:

- use PNG, JPEG, or WebP raster media;
- never use SVG or an SVG data URI;
- be unique to one canonical hotel record;
- identify the exact property and exact Texas street address in its provenance record;
- be grounded to an approved exact-property source;
- set `depictsProperty` and `generatedFromPropertyIdentity` to `true`;
- use property-specific alt text; and
- display the disclosure **“AI-generated depiction of this property — not an official hotel photograph.”**

Generic hotel artwork and the retired area-illustration system are prohibited. The old `public/stay-nearby-ai-fallbacks.json` manifest and `public/images/stay-nearby/ai/` SVG directory must not exist.

## Regression protection

`scripts/data/validate-expedia-affiliate.mjs` enforces the repository contract. It rejects legacy fallback paths and markers, SVG property imagery, unapproved formats, duplicate image URLs, missing exact-property provenance, invalid raster bytes, and configured redesigned-guide hotel cards that lack either an approved real property photo or an exact-property AI raster.

`scripts/ci/verify-stay-nearby-production.mjs` enforces the same policy against production. It verifies the curated three-card hotel sets, fetches the live raster assets, validates their MIME types and file signatures, checks exact-property provenance, and rejects legacy generic/SVG fallback markers in the shared production bootstrap.

The production verifier currently covers the curated Stay Nearby integrations for Amon G. Carter Stadium, Gerald J. Ford Stadium, Globe Life Field, American Airlines Center, and Texas Motor Speedway. Any newly curated redesigned venue guide must be added to the governed hotel registry and production verification rather than relying on an ungated visual fallback.
