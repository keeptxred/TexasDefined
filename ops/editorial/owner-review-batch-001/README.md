# TexasDefined — Batch 001 full authority-guide drafts

**Stage:** complete editorial drafts, ready for **owner's publication review**.
**Date checked:** October 29, 2026.
**Owner's instruction:** “I like all three.” This authorizes development of all
three proposed topics, **not automatic production publication**.
**Live site status:** NO new pages, routing entries, XML sitemap changes,
schema or affiliate tickets have been deployed from this branch.

## Read the three complete original guides

| # | Attraction | County | Draft | Length | Proposed URL | Publication |
| - | - | - | - | -: | - | - |
| 1 | San Antonio Japanese Tea Garden | Bexar | [Read full draft](./san-antonio-japanese-tea-garden.md) | 1,200+ words | `/destination/san-antonio-japanese-tea-garden` | Held |
| 2 | Fort Worth Water Gardens | Tarrant | [Read full draft](./fort-worth-water-gardens.md) | 1,200+ words | `/destination/fort-worth-water-gardens` | Held |
| 3 | Houston Botanic Garden | Harris | [Read full draft](./houston-botanic-garden.md) | 1,500+ words | `/destination/houston-botanic-garden` | Held |

All three are written independently from operator, municipal, tourism and
copyright sources. They contain original practical itinerary advice, explicit
limitations, unique visitor planning details, FAQs, full image attribution
proposals and SEO metadata. No Viator descriptions, reviews or screenshots
were ingested as public guide prose.

## Duplicate and canonicals review

On fresh GitHub main 0b6c99735088e71f58eeb71bda31a0f621b6ec09
(check and refresh again before any publication):
- No exact `san-antonio-japanese-tea-garden` route slug found.
  Brackenridge/Japanese Tea Garden appears in existing San Antonio curated
  attraction references; those should link to one new permanent guide, not
  create duplicate descriptions.
- No exact `fort-worth-water-gardens` route slug found.
  Fort Worth Water Gardens already appears in Tarrant County visitor places
  and Fort Worth collections. This is **not** the same as the
  `fort-worth-botanic-garden` existing destination and must not redirect to it.
- No exact `houston-botanic-garden` destination slug found.
  Existing Houston curated entries mention the garden; it is distinct from
  `fort-worth-botanic-garden` and the existing
  `san-antonio-botanical-garden` destination.

A string search is not a full running-app canonical proof. Before final
publication confirm resolved route ownership, aliases, title uniqueness, 200
status and primary canonical against the live inventory. Maintain one indexable
route per attraction. No redirect or canonical change has been made yet.

## Proposed authority graph after release

- San Antonio guide ↔ real published San Antonio city landing,
  Brackenridge Park neighbors, Bexar County guide, relevant Explore
  attraction categories. Keep River Walk separate.
- Fort Worth guide ↔ Fort Worth city guide, Tarrant County guide,
  downtown attractions and Texas architecture topics. Keep
  Fort Worth Botanic Garden separate.
- Houston guide ↔ Houston city, Harris County guide, Houston
  garden/outdoor hubs and official confirmed seasonal-event pages.
- Later Group Events & Experiences marketplace may reference the same
  canonical locations **only if individual group/private-event suitability
  is verified**, without overriding the deferred marketplace design.

Verify every final internal URL exists before adding reciprocal links. Do
not auto-publish geographic pages or fake event entries.

## Hero image licensing decision (proposed, not installed)

| Guide | Candidate and author | License | Required before release |
| - | - | - | - |
| Japanese Tea Garden | [Jouaienttoi photograph](https://commons.wikimedia.org/wiki/File:San_Antonio_Japanese_Tea_Garden_2022.jpg) | CC BY-SA 4.0 | Alt, author/source/license credit and crop/transformation disclosure; observe share-alike |
| Fort Worth Water Gardens | [Farragutful photo](https://commons.wikimedia.org/wiki/File:Fort_Worth_Water_Gardens_01.jpg) | CC BY-SA 4.0 | Same attribution/license/share-alike; inspect responsive crop |
| Houston Botanic Garden | [WhisperToMe photo](https://commons.wikimedia.org/wiki/File:Houston_Botanic_Garden.jpg) | CC0 1.0 | Verify image matches guide hero; optional creator credit recommended |

**Do not** take operator site photos just because personal photography is
allowed. All photo links above lead to author and license declarations and
were independently checked 2026-10-29.

## Booking and seasonal events

- San Antonio Japanese Tea Garden: **free general entry**. A paid city tour
  is optional and does not equal garden admission.
- Fort Worth Water Gardens: **free public park**. Local architecture/walking
  tours are distinct from entry to the park.
- Houston Botanic Garden: **timed operator ticket/member reservation**
  for every visitor. Do not infer that a Viator tour includes admission.
- No future occurrence, holiday-event schedule, unverified current ticket
  price or false availability has been added. Source-authoritative dates and
  provider-neutral affiliate offers must be mapped individually later.

## What happens next

1. Owner reads the complete drafts and says **publish all three**,
   **publish 1 and 2, revise 3**, or requests edits; that is separate
   from approval of the initial *topic development*.
2. After a scoped explicit publication approval, verify the actual comment,
   refresh `main`, implement three destination records through the canonical
   reviewed data pipeline, and attach source/owner approval records to the
   Viator destination approval ledger where necessary.
3. Add exact county/city/Explore reciprocal links, licensed/responsive hero
   media and independent original SEO metadata. Validate structured data
   and current official operator information.
4. Run protected CI, merge, deploy via GitHub, and verify live canonical,
   page text, image, mobile, sitemap, internal links, and booking semantics.
5. Keep verified official facts on recurring source refreshes; seasonal
   schedules only enter public calendars after organizer confirmation.

**This PR intentionally contains only `ops/editorial` drafts and an
editorial review index; it cannot create an indexable page merely by merging.
It should remain open while you review the article text.**
