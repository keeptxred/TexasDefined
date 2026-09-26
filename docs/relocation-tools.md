# TexasDefined relocation system

TexasDefined owns the Moving to Texas research and planning experience. The canonical hub is `/moving-to-texas`; tools and deeper research should reinforce that hub rather than create competing relocation landing pages.

## Relocation operating system

The public hub now combines:

- **Plan My Texas Move** — a browser-local household profile for origin, destination, timing, housing budget, household size, schools, vehicles, work corridor, industry and corporate-relocation context.
- **Texas Match Explorer** — transparent place filtering over the governed Texas relocation place registry. It is a research shortlist, not a subjective best-city score.
- **My Texas Move** — a browser-local shortlist, researched-address queue and notes workspace. No account or server-side storage is required for the first version.
- **Move timeline** — before-you-commit, 30–60-day, first-30-day and first-90-day research/task sequencing.
- **Persistent moving checklist** — the governed 16-task `/moving-to-texas-checklist` stores checkmarks in the same browser-local My Texas Move workspace and reports completion back on the relocation hub.
- **Corporate Relocation to Texas** — parallel employee/family and employer/HR/site-selection paths, backed by Texas Economic Development, Texas Workforce Commission and IRS source links.
- **Exact-address research** — Census geography as a starting point, followed by official source-of-record verification for school districts, utilities, property-tax responsibility, flood context and related local questions. Saved addresses can be reopened from My Texas Move through an in-page browser event and reused in the school, utilities, voter, homestead, property-tax and emergency-service finders. Finder reuse remains browser-local: users can derive local context or copy the saved address for the official source, but exact addresses must never be placed in a relocation URL or query string.
- **Relocation Data Desk** — migration, labor-market, insurance, school, tax, utility and traffic sources with source vintages kept explicit.

The separate `/moving-to-texas/tools` route remains the calculator/checklist/paperwork toolbox and links into county, DMV, school, utility, voter-registration, homestead, property-tax, emergency/community-service, ZIP and city-comparison tools.

## Information hierarchy

Use the relocation system in this order:

1. State and origin-state comparison.
2. Texas region and metro.
3. City/suburb and county.
4. Household budget, job market and commute.
5. School and family constraints when applicable.
6. Exact property/service address.
7. Official jurisdiction/service verification.
8. Arrival and first-90-day tasks.

Do not infer a school district, utility territory, appraisal district, voter jurisdiction, flood status or other address-dependent fact solely from a mailing city or ZIP code.

## Origin-state continuity

TexasDefined already owns a governed `/texas-vs/{state}` comparison system for all 49 other states. That system is the canonical origin-state layer for relocation; do not create a duplicate family of thin `/moving-from-{state}-to-texas` pages.

- Every state-comparison page includes a **Moving from [State] to Texas** bridge into My Texas Move.
- The bridge uses `originState` only as a planner-prefill parameter on the canonical `/moving-to-texas` hub. It does not create another indexable relocation URL.
- The command center recognizes only exact state names from the governed `TEXAS_VS_STATES` registry and preserves an origin the visitor already saved.
- When the planner origin exactly matches one of those states, it surfaces the matching official-source Texas-vs-state comparison instead of inventing a second comparison experience.
- State comparisons remain the place for state-level tax, housing, jobs, risk, transportation and metro context; My Texas Move carries that research into Texas city, county, budget, school and exact-address decisions.

## City-to-workspace continuity

Verified city authority pages are part of the relocation product rather than separate informational endpoints.

- Each verified city page exposes a **Relocation snapshot** with consistent handoffs to city comparison, cost of living, salary planning, school district, utility, property-tax, home-insurance and exact-address research.
- **Add [city] to My Texas Move** links to the canonical `/moving-to-texas` hub with a `saveCity` query parameter. The command center resolves that value only against the governed `RELOCATION_PLACES` registry, adds the recognized city to the browser-local shortlist and preserves an already-entered destination.
- Verified city authority entries must also exist in the relocation place registry so a city page can never advertise a broken workspace handoff.
- The city remains only a planning layer. School assignment, utility territory, appraisal/tax responsibility, flood context and other address-dependent facts still require exact-address and official-source verification.
- This continuity must not create a second relocation canonical or a thin `/moving-to-{city}` route when an existing city or metro authority page already owns the intent.

## Corporate relocation

Corporate relocation is part of the same household/location system, not a disconnected B2B content silo.

For employees and families, the workflow should connect relocation-package terms to local salary, housing, property tax, insurance, utilities, transportation, schools and exact-address research. When the user selects employee-transfer mode, the hub renders a live **corporate move brief** from the saved My Texas Move profile so destination, industry, work location, move date, household context, shortlist and researched addresses stay visible together.

For employers, HR and site-selection teams, the workflow should connect Texas labor markets, industry concentrations, commuting geography, housing, schools, infrastructure and employee transition planning. Employer mode may also store an optional employee-move headcount alongside the same destination, industry, work-location, shortlist and address-research context. Primary-source links must remain visible for business-registration, labor-market and federal tax-treatment questions.

The move brief is an organizing layer, not an eligibility, incentive or legal determination. It must route users back to Texas Industries, the Relocation Data Desk, city comparison, the governed move checklist and—when relevant—the Start a Business in Texas guide or household moving-cost tools.

Corporate relocation must also be discoverable from the Texas Industries hub, individual industry workforce pages and the Start a Business in Texas guide. Industry deep links may prefill a short industry label and employer-relocation intent, but the canonical destination remains `/moving-to-texas#corporate-relocation`.

## Guardrails

- Do not create subjective best-city rankings from editorial bands.
- Current price, insurance, tax and commute decisions must use current/address-specific inputs where available.
- Exact jurisdiction or eligibility questions must resolve through the responsible official agency.
- Exact street addresses saved from the research desk must stay in browser-local storage. Never serialize a saved address into a URL/query parameter, analytics label or server-side relocation profile.
- The address research desk may write to My Texas Move only after the visitor explicitly chooses **Save this address to My Texas Move**; a lookup by itself remains ephemeral.
- Moving-checklist completion must use stable task IDs rather than array positions. The governed checklist currently contains exactly 16 tasks; editorial reordering must not change existing IDs or silently reassign saved completion state.
- Checklist progress is browser-local and is part of the same My Texas Move record as saved places, addresses and notes.
- Keep the command center lazy-loaded from the main relocation hub so the broader route stays within the protected client bundle budget.
- Preserve the relocation source registry, production smoke tests, canonical/indexation checks and route-ownership validator.
