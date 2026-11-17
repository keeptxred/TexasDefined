# TexasDefined three-destination authority review — November 17, 2026

Scope: Texas State Capitol, LBJ Presidential Library and Mission San José. Source records and operator websites were reviewed against [the historic-site standard](AUTHORITY_STANDARD.md), [the museum standard](../museum-authority-standard.md) and [Google Search Essentials](https://developers.google.com/search/docs/essentials) and [people-first guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content). These are editorial acceptance criteria, not a promise of ranking, eligibility for a rich result, or Google approval.

## One indexable canonical guide per place

| Site | Canonical destination | Common short alias |
| --- | --- | --- |
| Texas State Capitol | `/destination/texas-state-capitol` | n/a |
| LBJ Presidential Library | `/destination/lbj-presidential-library-austin` | `/destination/lbj-presidential-library` (301) |
| Mission San José | `/destination/mission-san-jose-san-antonio` | `/destination/mission-san-jose` (301) |

The short aliases are **redirects**, not additional destination records. Existing richer profiles and internal links remain intact.

## Direct operator-source comparisons and corrections

### Texas State Capitol (State Preservation Board)

- [Free tours](https://tspb.texas.gov/plan/tours/tours.html): 40-minute guided visits departing South Foyer at intervals of about 15–30 minutes; published Monday–Saturday 9 a.m.–4:15 p.m. and Sunday noon–4:15 p.m. Group reservations for more than ten, and variable access during government business. We replaced an imprecise “regular daily schedule” with actionable information and a current-confirmation caveat.
- [Accessibility](https://tspb.texas.gov/plan/access/access.html): correct **North Entrance** for accessible access; large-print and Braille materials; ASL-request lead time of one week. Clarify South Foyer as *tour assembly*, not the accessible entrance.
- [Visitor hours](https://tspb.texas.gov/plan/hours/hours.html): session and holiday access can change. Preserve the historical Capitol construction and visitor itinerary rather than adding filler.

### LBJ Presidential Library (museum and archives)

- [Official visitor policies](https://www.lbjlibrary.org/visit), [visit preparations](https://lbjlibrary.org/visit/know-before-you-go), [accessibility](https://lbjlibrary.org/visit/accessibility): 9 a.m.–5 p.m. normal operation, last admission at 4 p.m.; visitor lot 38; published fees and discount exemptions are operator-controlled and should be rechecked; no food/drink inside. The complete museum visit is **2–4 hours** versus the shorter optional highlights route. The older 90–120 minute total was inconsistent between profile, dossier and FAQ and has been reconciled.
- [Current exhibitions](https://www.lbjlibrary.org/exhibitions): *The American Experiment* advertised through **January 10, 2027**; *Austin Past & Present* and *What We Bring to the Table* through **January 3, 2027**. Those are dated temporary exhibitions, **not** timeless permanent highlights. Recheck ahead of end dates, with the existing weekly monitored official exhibition source.
- Interpret Great Society and civil-rights legislation alongside opposition and consequences of Vietnam. Distinguish public galleries from National Archives research collections rather than implying open access to every archival holding. Eight museum-specific FAQs have updated verified dates; preserve group-booking and accessibility advice.

### Mission San José (National Park Service / parish)

- [NPS Mission San José](https://www.nps.gov/saan/planyourvisit/sanjose.htm): founded February 23, 1720; large mission settlement; significant 1930s WPA reconstructions. Label surviving architectural fabric versus twentieth-century restoration instead of suggesting all visible walls are original. Interpret distinct Indigenous communities, colonial coercion and survival as well as the church artistry.
- [NPS guided programs](https://www.nps.gov/saan/planyourvisit/guided-programs.htm): free 10 and 11 a.m. ranger walks, about 45 minutes and 50 first-come places, weather permitting; the guided walk follows a paved accessible route. [Hours](https://www.nps.gov/saan/planyourvisit/hours.htm): visitor center normally 9 a.m.–5 p.m., grounds sunrise to sunset, published major holiday closures. [Accessibility](https://www.nps.gov/saan/planyourvisit/accessibility.htm) needs to be checked for individual historic interior accommodations. The church is an active place of worship, not a guaranteed ranger-tour room.
- Preserve site-specific image provenance, original mission itineraries and county/mission internal navigation, including nearby Concepción, San Juan and Espada.

## Preservation and technical gates

- The existing licensed hero images, institutional source links, visitor-planning areas, canonical destination architecture and cross-links are retained. No fabricated first-hand reporting, stock photos or invented tour prices were added.
- `scripts/data/validate-three-heritage-destination-authority.mjs` pins canonical alias mapping, official-source dates, key facts, LBJ dossier/FAQ consistency and weekly source-monitor inclusion; this contract is in the canonical premerge runner.
- The existing **Monday 13:31 UTC GitHub source-monitor workflow** now watches ten site-specific operator URLs across the three guides. HTTP changes/unavailability create a research issue; fingerprinting does **not** itself verify the factual accuracy of changes or reset human review dates. Preserve seasonal historical facts and volatile current visit rules separately.
- Production acceptance still requires passing the complete protected premerge suite, merged main, 301 confirmation for the two short aliases, 200/self-canonical checks on all three primary URLs, mobile and accessibility inspection, structured data and sitemap review, and visibility of the updated facts. **Do not mark production verified until these checks have been performed.**

## Refresh ownership

Operational-source drift: weekly GitHub monitor, with human research for any change. Museum temporary exhibitions: the weekly monitor additionally emits explicit review alerts **21 days before January 3 and January 10, 2027** while those named end dates remain published in the LBJ dossier, even when the operator HTML fingerprint does not change. Resolve alerts by verifying and correcting the cited exhibition information, never by blindly advancing a date. Stable historical interpretation and licensing: quarterly editorial review or upon documented institutional corrections. Alter `sourceCheckedAt` / `reviewed` only after direct fact verification; do not fabricate freshness.

Checkpoint: https://github.com/keeptxred/TexasDefined/issues/7313.
