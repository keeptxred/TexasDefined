# Bangs Dragons — football authority Batch 005 source audit

Research checkpoint: October 10, 2026. **Status: IMPLEMENTED on unmerged Batch 005 PR; NOT merged, deployed or production VERIFIED.** Canonical route: `/texas-high-school-football-teams/bangs`.

## Individually observed gaps and corrective scope
The existing UIL-generated route supplies the official 2026–28 Class, Division, football format and district, but lacked this school's authored `program-editorial.ts` object and verified `school-identities.ts` entry at the main branch reviewed for Batch 005. A general school-name directory lookup can misjoin campus county; the branch pins `Bangs High School` to `Bangs ISD` / `Brown County` using documented primary school/TEA sources. County page references are added in both directions. The live TexasDefined route could not be independently loaded through the external web reader during this research session; no production visual audit is claimed.

## Independently documented distinguishing material
**2002 and 2003 consecutive state runner-up seasons.** Bangs reached consecutive UIL state title games: the 2002 Class 2A Division I final (33–14 loss to Corrigan-Camden) and the 2003 Class 2A Division II final (27–0 loss to Garrison). The teams were runners-up in two different divisions; neither is a state championship win.

UIL archives list the Bangs Dragons as the 2002 2A Division I state finalist and 2003 2A Division II state finalist, with different opponents and scores. The district now publishes a 2026-27 athletics schedules directory with a 2026 Dragons football PDF, rather than requiring visitors to rely on an undated third-party fixture list. Bangs High School at 305 North Third Street is separate from the district's 200 East Hall administration address.

First-party school link: https://www.bangsisd.net/. First-party schedule or team link: https://www.bangsisd.net/apps/pages/index.jsp?pREC_ID=1168280&termREC_ID=&type=d&uREC_ID=546996. Historical/governing record: https://www.uiltexas.org/football/archives/P264. UIL active-cycle roster: https://realignment.uiltexas.org/alignments/2026/2AD1FB2026.pdf. Primary-source physical campus context: 305 N 3rd St, Bangs, TX 76823. Official school/district sources are listed directly on the rendered page's editorial modules.

## Implemented in this branch
Distinct editorial overview, dated milestones and documentation, official athletics/schedule links, school-specific FAQ and unique SEO metadata. Verified mascot/identity entry and primary-source campus override avoid TEA name-only school contamination. Independently authored visual accent rather than an unlicensed school logo/photo; county outbound and inbound links included for `/county/brown`.

## Explicitly outstanding
- Protected CI, merge, deploy and real desktop/mobile browser/screenshots/canonical/JSON-LD/sitemap acceptance
- Confirm current-year ticketing, fan-entry gates, venue changes, parking and accessibility with the district before any visit
- Validate reciprocal county rendering after deployment and ensure sources remain reachable
- Authentic independent school photograph only with reuse permission and alt/attribution; no rights claimed
- If coaching is included, preserve the original school-page attribution and do not treat older staff/roster pages as proof of ongoing appointments
- Do not fabricate school championships where the official archive supports only finalist records or no title

**Important:** `IMPLEMENTED` is not `VERIFIED`; original 80 completed schools are unchanged.
