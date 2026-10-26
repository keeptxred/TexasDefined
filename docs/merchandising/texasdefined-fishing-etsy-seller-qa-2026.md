# TexasDefined — six fishing shirts: Etsy seller-side QA

Verified October 24, 2026. Existing six listings **are publicly returned by the connected Etsy shopper catalog** (not merely queued by Heartland). **Do not republish, duplicate, or recreate them.** The Etsy shopper catalog confirms four product images and $28.00 selling price for each. Prices do not include shipping; observed buyer shipping is $4.95 per listing (may change with location/cart).

## Current per-listing evidence

| SKU | Existing Etsy listing ID | Existing descriptive tags | Internal Heartland tag occupying an Etsy slot | Additional desired SEO tag | Production partner shown in Etsy catalog |
| --- | --- | --- | --- | --- | --- |
| TD-FISH-01 — Texas Bass Co. | [4602532203](https://www.etsy.com/listing/4602532203/texas-bass-co-bass-fishing-t-shirt-o) | 12 | Yes — `hp-tfeD8jgLvju8SQuO` | `texas fishing` | No |
| TD-FISH-02 — Chasing Largemouth | [4602533233](https://www.etsy.com/listing/4602533233/chasing-largemouth-bass-fishing-t-shirt) | 12 | No | `fishing graphic` | No |
| TD-FISH-03 — Lake Weekend | [4602558658](https://www.etsy.com/listing/4602558658/lake-weekend-t-shirt-o-vintage-texas) | 12 | No | `boating shirt` | No |
| TD-FISH-04 — Texas Tackle Club | [4602558740](https://www.etsy.com/listing/4602558740/texas-tackle-club-t-shirt-o-vintage) | 12 | Yes — `hp-gelTpHXUVV54fGQ8` | `fishing club` | No |
| TD-FISH-05 — Sunrise Cast | [4602558790](https://www.etsy.com/listing/4602558790/sunrise-cast-fishing-t-shirt-o-texas) | 12 | Yes — `hp-HnlZfJpFlN9FXslf` | `quiet lake` | No |
| TD-FISH-06 — Texas Coastal Angler | [4602533093](https://www.etsy.com/listing/4602533093/texas-coastal-angler-redfish-t-shirt-o) | 12 | No | `saltwater angler` | No |

All six have Etsy variations, original product images and price $28.00. Each has **12 useful descriptive tags**. Items 1, 4, and 5 carry one additional internal `hp-*` tag: 13 total (Etsy's limit). Items 2, 3, and 6 have 12 total. These are Etsy facts, separate from TexasDefined's **13 descriptive site-catalog tags** and its retained internal Heartland metadata.

The Etsy shopper connector does **not** expose listing/shop-section write actions. Heartland can create/publish products, but **not** edit production partners, Etsy tags, section placement, or description after publication. Avoid publishing them again to fix these fields.

## Priority 1 — disclose the real print-on-demand production partner

Etsy requires production-partner disclosure for physical products made from the seller's original designs.

1. On **Etsy.com in a browser**, open **Shop Manager → Settings → Partners you work with**. Add the actual print/fulfillment production partner. Verify the correct Printify-connected printing provider and its location; do not invent a print-facility name or city. You may publicly describe it as an `Apparel printer`, consistent with Etsy's form.
2. In **Shop Manager → Listings**, select **these six existing listing IDs** (do not copy or create them). Choose **Editing options → Change production partners** and assign the verified partner to all six.
3. Confirm the partner is shown for each listing and the actual shipping origin matches the chosen provider.

Official instructions: https://help.etsy.com/hc/en-us/articles/360000336547-Working-with-Production-Partners-on-Etsy

## Priority 2 — disclose AI-assisted artwork accurately

All six shirt illustrations were produced with AI image generation and subsequently resized/QA'd before publishing. Etsy requires seller-prompted AI creations to disclose AI use.

Suggested disclosure to **append**, preserving each existing product description:

> Original fishing artwork created for Texas Defined with AI image-generation assistance and prepared for print. This shirt is printed to order by our disclosed production partner.

Also inspect **TD-FISH-05 Sunrise Cast** description: shopper-facing content contains a double-escaped apostrophe (`it&amp;#39;s`). Replace with `it's` in the Etsy description if it appears in the editor.

Etsy policy: https://help.etsy.com/hc/en-us/articles/360024112614-What-Can-I-Sell-on-Etsy

## Priority 3 — organize the exact existing listings

If Etsy's **Fishing Shirts** section does not exist, create it under **Shop Manager → Listings → Sections → Manage → Add section**. Then select all six existing listings → **Editing options → Change section → Fishing Shirts → Apply**.

Official instructions: https://help.etsy.com/hc/en-us/articles/360000345048-How-to-Create-and-Manage-Shop-Sections

## Priority 4 — fill the Etsy SEO tag slots without breaking Heartland sync

- TD-FISH-02: add `fishing graphic` (12 → 13).
- TD-FISH-03: add `boating shirt` (12 → 13).
- TD-FISH-06: add `saltwater angler` (12 → 13).
- TD-FISH-01, 04, 05: the thirteenth slots are already occupied by `hp-*` publisher identifiers. **Do not remove or replace those tags until confirming Heartland/Printify reconciliation no longer depends on the marker.** Desired substitutions are `texas fishing`, `fishing club`, and `quiet lake`, respectively.
- All six already have the intended 13 descriptive **TexasDefined website-catalog** tags, regardless of Etsy seller state.

Etsy limits: 13 tags per listing, 20 characters per tag. https://help.etsy.com/hc/en-us/articles/360000336307-How-to-Use-Tags-to-Get-Found-in-Search

## Verification handoff

After the seller edits, use Etsy buyer listing reads to recheck six IDs: availability, price, images, tag counts, and `has_production_partners=true`. Seller section and shipping origin still require authenticated seller-side confirmation. Do not infer partner settings from Heartland status, which continued reporting `etsy_verified=false` after actual public listings were retrieved.

**TexasDefined website launch:** All six Printify IDs active at $28 with 16 enabled variants, six records mapped to `fishing-shirts`. PR #5869 merged and the production workflow #40149818078 successfully deployed code containing merch placements. Final crawlable SSR links PR #5876 was awaiting required checks when this was written.
