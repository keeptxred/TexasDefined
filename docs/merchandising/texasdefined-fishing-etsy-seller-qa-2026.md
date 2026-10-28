# TexasDefined — six fishing shirts: Etsy acceptance and remaining seller actions

Last audited: **October 27, 2026** using the connected Etsy buyer catalog, Printify/Heartland's real shop, and TexasDefined's existing product IDs. **Edit these listings; never create duplicates.**

## Verified complete: 13 descriptive tags on every existing listing

| Shirt | Etsy listing | Printify product ID | Live descriptive tags | Internal publisher tag |
|---|---|---|---|---|
| Texas Bass Co. | [4602532203](https://www.etsy.com/listing/4602532203/) | `6add2977878131e6ba0c3b39` | 13/13 | None |
| Chasing Largemouth | [4602533233](https://www.etsy.com/listing/4602533233/) | `6add29fdafea5e4b0809386a` | 13/13 | None |
| Lake Weekend | [4602558658](https://www.etsy.com/listing/4602558658/) | `6add29cfafea5e4b0809383b` | 13/13 | None |
| Texas Tackle Club | [4602558740](https://www.etsy.com/listing/4602558740/) | `6add29d86437b9edf205a8bb` | 13/13 | None |
| Sunrise Cast | [4602558790](https://www.etsy.com/listing/4602558790/) | `6add29de2f0d45364d02c4a6` | 13/13 | None |
| Texas Coastal Angler | [4602533093](https://www.etsy.com/listing/4602533093/) | `6add29e5c8a72b0cae01896a` | 13/13 | None |

These listings have been publicly returned by Etsy at $28.00 each and **13 useful SEO tags** each. Tag-only repair was deployed through existing Heartland Publisher in [KTR PR #2966](https://github.com/keeptxred/texas-heartland-hub/pull/2966); permanent 13-tag validation was deployed in [KTR PR #2968](https://github.com/keeptxred/texas-heartland-hub/pull/2968). Do **not** repeat tag repair, regenerate shirts, or use new publication jobs.

## Outstanding 1 — production partner association, all six

As of Oct 27, Etsy returns `has_production_partners=false` for each listing. This is an actual seller compliance issue; a descriptive sentence **does not substitute** for Etsy's partner metadata.

**Printify's documented integration behavior:** If the Etsy shop already has a partner named `Printify`, Printify can automatically associate it on new product publication; otherwise the seller must create the production partner in Etsy Shop Manager and associate the *existing* listings. Printify cannot create the Etsy partner on behalf of a merchant. [Printify guidance](https://help.printify.com/hc/en-us/articles/4578896595345-What-should-I-know-about-Etsy-s-Creative-Standards-policy).

**Exact one-time seller actions on Etsy.com (desktop browser or Work connected browser):**

1. Sign in at [Etsy Shop Manager](https://www.etsy.com/your/shops/me/dashboard) and open **Settings → Partners you work with**. Add the genuine provider using Printify's published setup instructions: partner name **Printify**, location **Wilmington, DE, USA**, select the appropriate truthful role/disclosures. Do not invent the actual print-facility location if different.
2. Open **Listings**, select only the **six original IDs** in the table above; use **Editing options → Change production partners**. Assign the existing/saved Printify partner to all six, then save/publish changes.
3. Confirm each public listing now has `has_production_partners=true`. Verify actual shipping origin matches provider fulfillment information.

Official [Etsy production-partner instructions](https://help.etsy.com/hc/en-us/articles/360000336547-Working-with-Production-Partners-on-Etsy).

## Outstanding 2 — AI-created original artwork disclosure in descriptions

All six artwork illustrations used AI image-generation assistance. Etsy requires the listing description to disclose AI creation. As audited Oct 27, **none of the six live Etsy descriptions mentions AI**; the Sunrise Cast description also reads `it&amp;#39;s` (double-escaped apostrophe). [Etsy Creativity Standards](https://www.etsy.com/legal/creativity).

An in-place **description-only** Printify-to-Etsy repair is being implemented as [KTR PR #3161](https://github.com/keeptxred/texas-heartland-hub/pull/3161). Verify its production deploy and all six *live Etsy descriptions* after the six original Heartland `check_publication` jobs run before changing this section to complete. Required disclosure text:

> Artwork disclosure: Original fishing illustration developed for Texas Defined with AI image-generation assistance and prepared for garment printing. This shirt is printed to order by an independent production partner.

Never claim the production partner is assigned in Etsy merely because this paragraph appears.

## Outstanding 3 — Fishing Shirts shop section

Etsy buyer listing data does not expose a reliable shop-section assignment; `shop_section_verified=false` for all six. On Etsy.com **Shop Manager → Listings → Sections**, create **Fishing Shirts** if absent. Then select the six existing listings and assign the section via bulk editing. Verify the section on the real seller account; do not infer it from TexasDefined.com collections.

## Acceptance rules for new shirts

- **13 distinct, relevant, descriptive Etsy SEO tags** (no `hp-*` marker in the final live listing) before claiming publication complete.
- The actual Etsy `production_partner_ids` must be populated, matching real print/fulfillment arrangements, and shipping origins accurate.
- Clear seller-prompted AI disclosure in the live description wherever AI image generation is used.
- Every size selector shows apparel sizes largest to smallest, with colors alphabetized inside each size.
- Approved original irregular-contour artwork, real finished-product mockups, accurate garment details and active shipping profile.
- Verify the live Etsy listing and TexasDefined.com product pages. If an integration exposes only buyer/read operations, report seller-account changes as outstanding rather than inventing write success.
