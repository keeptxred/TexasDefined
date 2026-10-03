# Inside TexasDefined visual standard

**Newsletter:** Inside TexasDefined  
**Tagline:** Defining everything that is Texas.

The newsletter should feel like a compact Texas magazine, not a text digest with occasional decoration. Every issue should open with one strong documentary or editorial visual and keep a deliberate visual rhythm through the first four story slots.

## Issue anatomy

1. **Hero story** — one large 16:9 image directly under the issue introduction.
2. **Feature stories 2–4** — each should carry a strong photo, original map, chart, data graphic or historic image.
3. **More from TexasDefined** — later stories become lighter text-first reads so the email does not become excessively long or heavy.
4. At least one of the first four visual slots should be an **original TexasDefined map, chart or data graphic** whenever the issue includes a suitable data/reference story.

The composer does not hard-fail a draft that is short on images. It returns and stores visual-coverage warnings so an editor can fix the issue before sending.

## Image sizes

| Slot | Ratio | Recommended | Minimum | Target file size |
| --- | --- | ---: | ---: | ---: |
| Hero | 16:9 | 1600×900 | 1200×675 | ≤ 500 KB |
| Feature photo | 3:2 | 1200×800 | 900×600 | ≤ 350 KB |
| Map/chart/data graphic | 4:3 | 1200×900 | 1000×750 | ≤ 400 KB |

Pixel dimensions matter; DPI metadata does not matter for email.

Use JPEG for photography and PNG for maps/charts when labels need crisp edges. Do not use SVG directly in marketing email because support varies across email clients. Original TexasDefined SVG graphics should be exported to PNG for newsletter use.

## Visual source priority

Use the first available source in this order:

1. Authentic TexasDefined photography or a cleared image already used on the site.
2. An original TexasDefined map, chart, diagram or data graphic.
3. Official press/media photography with clear editorial-use rights.
4. Public-domain or appropriately licensed archival photography with attribution retained.
5. A carefully selected documentary image from a source whose reuse terms are understood.

AI-generated decorative imagery is not the default newsletter solution. Do not use synthetic imagery to represent a real place, historic photograph, current event or factual condition in a way that could be mistaken for documentary evidence.

## Cropping and composition

- Keep the main subject away from the outer 10% of the frame so mobile crops remain usable.
- Prefer horizontal compositions.
- Do not bake headlines, logos or long paragraphs into photos.
- Map labels, chart axes, legends and short graphic annotations are acceptable.
- Avoid collages unless the editorial point requires direct comparison.
- Do not stretch a vertical image into a horizontal slot; choose or create a better asset.

## Accessibility and credit

Every newsletter image should have descriptive `imageAlt` text. Alt text should explain what is visible, not repeat the headline.

Use `imageCredit` when a source or photographer must be named. Credits appear directly below the image. Original TexasDefined maps, charts and graphics can use `imageKind` so the email visibly identifies them as TexasDefined work.

Supported `imageKind` values:

- `photo`
- `map`
- `chart`
- `graphic`
- `historic`

## Curated automatic image fill

The newsletter composer fills missing images only where TexasDefined has a stable public image URL and the reuse/credit information is already documented. Explicit story images always win; automatic fill only runs when `imageUrl` is absent.

Initial covered sections:

- Lakes & Rivers
- State Parks
- Best Camping in Texas
- National Parks
- Major Springs
- Road Trips
- Outdoors
- Texas History

These eight fallbacks use permanent `/images/...` paths and carry their photographer or agency credit into the rendered email. Small Towns, Sports and Moving to Texas still require an explicit editor-selected image until a stable, licensed fallback is curated for those broad sections. Synthetic or unverified assets are not used merely to increase the image count.

This library is intentionally conservative. It is better to leave a visual warning than silently attach a generic, misleading or weakly sourced image.

## Next visual priorities

As new assets are produced, prioritize these authority areas because they are both newsletter-friendly and useful on the site itself:

1. Painted Churches — statewide location map plus church-specific photography.
2. Texas rivers — statewide river-system map plus river-specific landscape photography.
3. State parks — park photography plus statewide park map.
4. Texas lakes and fishing — reservoir photography, species graphics and statewide lake maps.
5. Historic sites — authentic site photography plus statewide location map.
6. High-school football — district/alignment graphics plus venue photography.
7. Texas Data — charts and maps from original TexasDefined calculations.
8. Wildlife — authentic species photography plus broad-range graphics where supported by authoritative data.
9. Small towns — courthouse squares, streetscapes and landmark photography.
10. Events — current event photography supplied by organizers or official media galleries when rights permit.

The reusable maps/graphics work should be exported in newsletter-safe PNG sizes as it becomes available. A followed backlink is never a condition of reuse for TexasDefined original editorial graphics; visible TexasDefined.com credit is sufficient where the published graphic says so.

## Editorial guardrails

- Never attach a visually attractive but unrelated image merely to satisfy the image count.
- Do not imply a photo depicts a specific place if it does not.
- Do not remove required photographer, archive or agency credit.
- Do not reuse third-party images merely because they appear on another website.
- Prefer one strong image over several weak ones.
- Keep the first four story slots visually strong; later quick reads may be text-only.
