# TexasDefined Museum Visitor-Authority Standard (permanent)

Last revised: 2026-10-12. Applies to **every new museum and every existing museum updated to authority status**, not just the ten priority destinations.

## Mission and competitive definition

Create the **most useful independent guide for a person considering, planning and understanding a visit to each museum**. Benchmark the museum's entire publicly available **visitor information**, not only its home page, and add useful independent depth that the visitor could not get as conveniently from the operator alone. Do not claim to have surpassed the museum until a documented side-by-side visitor-guide comparison has been completed.

**We are not the museum.** Do not reproduce, scrape or seek to duplicate the whole collections database, catalog every item, supplant the museum's archivists, or reproduce substantial curatorial descriptions. Link visitors/researchers directly to the museum for exhaustive collections or research requests.

## Museum-specific visitor content requirements

1. **Identity and first-hand facts.** Establish the correct institution, address, city, county, operator, official website, appropriate map and current status. Update its canonical destination rather than duplicating it.
2. **Exhibit overview, not catalog duplication.** Describe key exhibit *topics* and **up to ten noteworthy permanent or currently available exhibits** with **brief original blurbs**. Fewer when appropriate; do not manufacture ten for a one-room institution. Clearly label temporary exhibitions, dates and closures. The goal is helping readers decide what interests them, not reproducing catalog records.
3. **Family and visitor fit.** Answer whether it suits toddlers, young children, teens, adults, school groups and people with differing mobility or sensory needs *only as the actual institution warrants*. Call out potential frightening/intense themes, active learning vs quiet galleries and the time needed. If a historic building has steps, that matters more than a generic restroom badge.
4. **Concrete trip logistics.** Verify admission and discounts; reservation or timed entry; typical visit length; opening times and closures; parking, entrances and maps; wheelchair/stroller/sensory considerations; photography or pet policies where important; gift store, drinking water and dining. **Distinguish cafeteria, snack counter, café, full-service restaurant and no verified food service; never silently turn a snack bar into a restaurant.** Only mention bathrooms when location/availability is genuinely important to visiting, not as museum page filler.
5. **Museum-specific researched FAQs (required, visible on page).** Start with museum FAQ, visit/field-trip/accessibility/ticket pages. **Then independently look for common visitor questions** using appropriate visitor Q&A, genuine reviews, relevant forums, search-result related-questions or public search query data where available. Only record claims of frequency if measured; otherwise describe researched questions as visitor concerns, not statistically the most searched. Choose and prioritize the useful questions for that museum; four or more if evidence warrants, usually 6–12 for major attractions, no fixed ten-question template. Question and answer must both be museum-specific. Every answer has a link to a reliable verifying source, a question provenance link, last actually reviewed date and monthly/quarterly check schedule. **A museum FAQ is the START, never the END, of question research.** Research questions not addressed by the operator's FAQ as well.
6. **Genuine editorial value.** Original explanation of why a few selected exhibits/topics matter, distinctive insights, practical tips and appropriate visit plans. Optional deeper history only when it improves a visitor's understanding; do not make archival replication the definition of authority.
7. **Licensable exact-location visuals.** Verified rights to reuse, attribution, descriptive ALT, no mislabelled nearby places, no generic photos masquerading as this museum. Surface only media you can substantiate.
8. **Contextual two-way links.** Relevant city/county, regional Explore, related cultural/history pages, nearby attractions, appropriate family itineraries and *actually relevant* peer museums. Verify targets exist; connect older pages back to the newly improved museum guide when meaningful. Add nonintrusive affiliates only when appropriate, never invented museum relationships.
9. **Technical and live QA.** Accessible headings, readable mobile and desktop layouts, canonical metadata, appropriate Museum schema, live routing, fresh display status, safe source URLs and real image-license checks. Never guarantee rankings or assert superiority based on a template alone.

## FAQ data, sources and refresh requirements

- Museum-specific entries live in `src/data/museum-visitor-faqs.ts` and are rendered on each museum destination by `MuseumAuthorityNetworkSection`.
- Every FAQ records: `question`, `answer`, `verificationUrl` (a reliable source for the *answer*), `questionOrigin` (operator's FAQ, observed visitor Q&A or editorial visitor-intent research), `questionEvidenceUrl`, `reviewed`, and `reviewCycle`.
- Use `museum-faq` only if that *question* appears in an actual institution FAQ; `visitor-qna` only if the exact topic was observed in a genuine visitor question; `editorial-research` for questions derived from independently reviewing operator facts and visitor planning needs. Don't invent common-question frequency or mistake an old forum answer for current policy.
- **Check answers against the operator** for hours, admission, food, permits, pet rules, closures, current exhibits and accessibility policies. Visitor Q&A is valuable for discovering questions, but older individual responses are not the truth source for changing policies.
- Recheck volatile answers monthly or sooner where closure/ticket rules are changing, and more stable material quarterly. A scheduled job must record real checks and flag changes; it must not automatically bump `reviewed` with no verification.
- If a fact can't be verified, say so clearly or omit it; never invent amenities or mark assumptions as confirmed. Do not publish FAQPage structured data merely to chase rich snippets; visible helpful FAQ content is the goal.

## Repeatable implementation and acceptance

- Research official visitor resources AND independent visitor questions for the particular museum. Audit the museum's published visitor information side by side; create a visitor-focused gap list in `docs/museum-official-site-benchmarks.json`.
- Update the canonical existing destination and its dossier in `src/data/museum-authority-network.ts`. Add up to ten concise exhibit/topic blurbs and only meaningful visit routes. Add museum-specific FAQs with direct question-provenance and answer verification URLs.
- Confirm family fit, correct dining type, accessibility, ticketing, parking, map, timing, photo reuse rights and relevant reciprocal city/county/internal links. Do not mechanically display irrelevant facility notes for every museum.
- Run `node scripts/data/validate-museum-authority.mjs` as part of the canonical `node scripts/ci/run-premerge-validation.mjs`; validate build, inspect live responsive pages, and verify reciprocal links and actual source claims.
- The deterministic contract catches missing dossier/FAQ wiring, thin answers, review dates and source links. It **cannot** establish that visitors ask a question frequently or fact-check the whole web; evidence-based editorial and production QA are additional requirements.
- **No production-complete declaration** until the side-by-side visitor-guide checklist and production QA are closed. Existing museum guides not yet audited remain backlog, not certified by being grandfathered into a validator.

## Current museum-specific precautions

- Panhandle-Plains Historical Museum: building closure takes precedence over otherwise helpful admission and exhibit tips.
- George Ranch: Saturday general admission differs from booked weekday group visits; outdoor walking and tram logistics matter.
- National Museum of the Pacific War: main museum and Combat Zone have different access windows; add-on experiences and potentially intense content require clear advice.
- Perot Museum: reserve timed entry, separate special exhibitions and compare family/sensory experience.
- When dining is not independently confirmed, say **not confirmed** and give planning advice rather than asserting no food is available.

Initial ten: Bullock, Perot, Witte, Museum of the Big Bend, Panhandle-Plains Historical, George Ranch, Texas Maritime, National Museum of the Pacific War, Frontier Texas!, and Texas Energy Museum.

## Historically important museums that close

- Separate **visitor availability** from the quality and discoverability of a well-researched historical guide. A museum that has ceased operations should never appear as a currently visitable Trip Planner stop or carry stale booking instructions.
- Where independently documented historical and architectural value makes the guide useful, preserve canonical SEO metadata, factual closure status, authoritative cross-links and eligible sitemap inclusion. Do not automatically add noindex merely because the museum is no longer open to tourists; the same editorial quality gate must still pass.
- The 1940 Air Terminal Museum in Houston is a current example: the site carries closure details and research resources while the closed destination is excluded from trip-planning recommendations.
- Do not treat a preservation assessment, a public-archive record or a historic designation as evidence of reopening. Monitor operator and government announcements on the regular museum verification schedule.
