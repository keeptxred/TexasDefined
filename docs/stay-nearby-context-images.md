# Stay Nearby open-license context imagery

## Purpose

The Stay Nearby hotel carousel may use an open-license **venue-context image above the hotel cards** when no rights-qualified hotel property photography is available.

A venue-context image is not a hotel image. It must never populate a hotel's `image` field or visually imply that the pictured building is one of the recommended properties.

Hotel property photography remains governed by `docs/expedia-affiliate-integration.md`: a hotel image may render only when it comes through the approved Expedia Creator Toolbox workflow, is first-party hosted, and is paired to a verified matching property affiliate referral.

## Current pilot context images

### Amon G. Carter Stadium

- Photographer: Michael Barera
- Source: https://commons.wikimedia.org/wiki/File:Texas_Christian_University_June_2017_85_(Amon_G._Carter_Stadium).jpg
- License: CC BY-SA 4.0
- License: https://creativecommons.org/licenses/by-sa/4.0/
- Verified: 2026-09-11

### Gerald J. Ford Stadium

- Photographer: HavanaHeat
- Source: https://commons.wikimedia.org/wiki/File:View_of_Gerald_J_Ford_Stadium_after_renovations,_20224.jpg
- License: CC BY-SA 4.0
- License: https://creativecommons.org/licenses/by-sa/4.0/
- Verified: 2026-09-11

### Globe Life Field

- Photographer: BullDawg2021
- Source: https://commons.wikimedia.org/wiki/File:Globe_Life_Field_exterior_2025.jpg
- License: CC BY 4.0
- License: https://creativecommons.org/licenses/by/4.0/
- Verified: 2026-09-11

## Rendering and attribution rules

`public/stay-nearby-context-images.js` renders the image only on the exact matching pilot venue route and only after the existing curated Stay Nearby surface is present.

Every figure includes a visible `Venue context` label, photographer/source link, license link, and Wikimedia Commons identification. Images use `object-fit: contain`; TexasDefined does not editorially crop the file. Responsive browser scaling is the only presentation adjustment.

The script deliberately contains no pilot hotel names. `scripts/data/validate-expedia-affiliate.mjs` rejects a context-image implementation that includes any active Stay Nearby hotel name, which prevents venue photography from silently being repurposed as property photography.

## Property-image fallback

Until a specific hotel has a rights-qualified Expedia Creator Toolbox image plus a verified account-generated property affiliate link, its card continues to use the existing intentional geographic/text fallback. Do not weaken that gate to make the cards more visual.