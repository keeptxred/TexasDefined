# TexasDefined Museum Authority Standard (permanent)

Last revised: 2026-10-12. Applies to every NEW museum destination and any authority-grade upgrade.

## Requirements

A museum page is not a generic historic-site listing. It must answer what is preserved, why it matters, how to visit, and how the experience relates to the surrounding county, city, history and other museums.

1. **Canonical identity and provenance.** Reuse the museum's original slug and the existing destination template. Verify address, coordinates, operator, admission page, exhibits and current closure status. Never duplicate an old page to make a new authority page.
2. **Distinctive original historical and scientific research.** Explain the museum's significance with at least three substantive exhibit/collection sections; distinguish interpretation from historical fact and current exhibitions from past ones. Include evidence about underrepresented groups and contextual controversies rather than promotional boilerplate.
3. **Real visitor-planning advantage.** Include three distinct itineraries, advice on duration, parking and logistics, admissions, accessibility, family fit and organized school tours. Dates, fees, hours and temporary-exhibit offerings need first-party verification, and the operator controls today's operations.
4. **Sources and editorial transparency.** Provide at least two different first-hand/reliable URLs, identified with what each establishes. Record the date of last actual checking; never auto-bump it just to suggest freshness.
5. **Media rights.** Use exact-location, rights-cleared, attributed images only. Do not invent a museum picture, mislabel a nearby structure or silently borrow unrelated stock. Verify the image file license separately. Hold indexation when no acceptable primary image exists under current site indexing policy.
6. **Structured, discoverable, accessible.** Clear museum headings and canonical URLs, descriptive meta, Museum and TouristAttraction JSON-LD, image attribution/alt text, internal links, desktop/mobile rendering and accessible controls. Review live pages for hydration and stale content.
7. **Reciprocal link graph.** Museum guides link to local county and regional context; all matching canonical county/city pages should surface museums automatically; related destinations should recommend museums only where there is genuine geographic or thematic relevance. Add existing articles, tours, history hubs, comparable museums and school/family resources when genuinely useful. Link both ways rather than orphaning new museums.
8. **Editorial honesty.** Never guarantee a Google ranking or assert superiority over the museum's own site without evidence. Build a more useful independent guide through original research, useful planning comparisons, citations and consistent updates.

## Implementation and repeatable workflow

- Search canonical destinations, aliases, remote data and sitemap before creating a museum; update an existing page instead of duplicating.
- Research first-party collections and visitor operations, independent history, public photo licenses and museum-specific local context.
- Add the destination if genuinely missing, and always add exactly one full dossier in src/data/museum-authority-network.ts. The required MuseumAuthorityDossier properties are name, slug, city, county, reviewed, whyVisit, visitorStrategy, accessibility, familiesAndGroups, researchValue, exhibits, routes, sources, and connections.
- Render through the existing destination template and MuseumAuthorityNetworkSection. CountyCityMuseums automatically surfaces museums on matching city and county pages, while museum page modules contain inbound and outbound local and similar-site crosslinks.
- Run node scripts/data/validate-museum-authority.mjs and npx tsc --noEmit; verify general data and SEO validators, imagery, accessibility and responsive production UI before deployment.
- Check live museum pages, both directions of local cross-links, and accurate JSON-LD and noindex status after production deployment.

## CI contract

The .github/workflows/museum-authority-contract.yml workflow runs for pull requests and main branch changes. The script validates all ten current dossiers for required depth, recent checking dates, primary-source links, research content, three itineraries, contextual county links and integration into destination + county/city templates. On pull requests it scans changed source for new museum destination slugs. Newly introduced museum records WITHOUT a full dossier fail CI. Existing untouched older museum records are grandfathered to avoid breaking thousands of legacy pages; improve the legacy inventory in researched batches.

This structural gate cannot validate real-world accuracy or copyright in isolation; maintain an editorial signoff and production QA. Research compliance and actual Google authority are outcomes to measure rather than properties a template can promise.

## Known exceptions

- Panhandle-Plains Historical Museum: check the official temporary-closure updates before advertising indoor visiting.
- George Ranch Historical Park: public-admission days differ from reserved school/group dates.
- Museum exhibits, admission hours, prices and educational programs change. Never infer open-now or availability from static content.
- If an exact-location image cannot be cleared or a first-party visit source disappears, preserve the historical page but hold it out of the public index until resolved.

Priority October 2026 ten: Bullock, Perot, Witte, Museum of the Big Bend, Panhandle-Plains Historical, George Ranch, Texas Maritime, National Museum of the Pacific War, Frontier Texas!, and Texas Energy Museum.
