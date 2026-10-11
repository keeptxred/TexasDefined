# Texas High School Softball — Five-Team Full-Authority Research Pilot

**Research date:** October 11, 2026  
**Status:** SOURCE RESEARCH IN PROGRESS. **No individual school pages approved or published.**  
**Season scope:** 2026–27 alignment; official 2025–26 championship reporting and historical team sheets.

The full Texas UIL softball school census is already in `src/data/softball/uil-2026-27-registry.json` (1,192 schools, 160 districts). This pilot begins collecting verifiable, school-specific facts **before creating any public page**. The machine-readable audit is [PILOT_DOSSIERS_2026-10-11.json](./PILOT_DOSSIERS_2026-10-11.json).

The complete-first-release contract requires **38 research dimensions per school** and is enforced by `scripts/softball/authority-contract.mjs` and `scripts/softball/complete-first-release-audit.mjs`. A dossier is not a published page; it must eventually cover all 38 dimensions. Pilot source entries are evidence leads and substantiated historical observations, not a shortcut through the full test.

| UIL 2026–27 school | Conf / district | Distinctive historical lead | High-priority unresolved research |
|---|---|---|---|
| Shiner | 2A / 29 | 2026 2A-DII champion; 2025 runner-up and 15 known UIL state appearances | Home field, 2027 current coaching, complete archive, licensing |
| Ganado | 2A / 29 | 2025 and 2026 consecutive 2A-DI titles, Texas Legislature 2025 tribute | Current staff, precise field/visitor conditions, pre-2025 program history |
| Katy | 6A / 22 | 2015/2019/2026 6A champion, 2026 final 7–2 over Forney | School staff name variants, definitive field, 2027 schedule and full archive |
| Pearland | 6A / 19 | 1996/2010/2023/2026 state titles, 2026 final 6–3 vs Waco Midway | Coach spelling variant, field, 2027 program, title-era team records |
| Amarillo Highland Park | 2A / 1 | Smaller-school case; district-confirmed Hornets, **not Dallas Highland Park Scots** | Current softball coach, verified stadium, official schedule and softball history |

## Source issues found at the very start (do not replicate football mistakes)

1. **A record is not final just because it is labeled “Season Record.”** Katy's 2025–26 UIL state-team submission lists 38–5; Katy ISD's **post-championship** article lists **39–5** following the victory over Forney. The dates and provenance explain the difference. Do not overwrite one without noting its cutoff.
2. **Do not assume the name in an official roster is the canonical staff spelling.** The Katy UIL state-team sheet uses Meghan Brown VanEtta; a school article says Meghan VanEtta; a school directory result lists Megan Vanetta. Verify the correct preferred spelling, identity and 2027 position before publication.
3. **Pearland coach’s given-name variant:** Pearland High's team page and UIL show **Michele Hyden**; Pearland ISD's championship announcement renders **Michelle Hyden**. Verify against staff and cite the display variant rather than presenting two separate coaches.
4. **Shiner season record-source mismatch:** UIL displays **31–7** in its 2026 tournament entry; some third-party histories show lower totals, presumably incomplete submitted game coverage. Don't merge datasets without dates and game-by-game reconciliation.
5. **Amarillo Highland Park is NOT Dallas Highland Park.** Amarillo's `hpisd.net` Hornets appear in 2026–27 2A District 1. Dallas's `hpisd.org` Scots and `scotsillustrated.com` 5A schedules are separate entities. Some search results rank Dallas first; school entity IDs and city must be checked for every source.
6. **No guessed venues or school counties.** District administration addresses are not automatic softball field addresses; some school districts span county lines. Map primary campus coordinates and independently verify the exact girls softball field, access, parking and visitor rules.
7. **Coach snapshots are season-labeled.** The 2025–26 UIL submission is reliable historical evidence but does not prove a coaching staff has been retained for the 2027 season.
8. **Never publish youth information from unofficial lists.** Where public team-roster archives exist, link to the school's or UIL's official record and write about program achievements. Do not copy player addresses, private recruitment contacts or unofficial personal data.

## Most important primary sources

- UIL specific 2026–27 softball district alignments: <https://www.uiltexas.org/softball/alignments>
- UIL 2025–26 state tournament and championship archives: <https://www.uiltexas.org/softball/archives>
- Shiner ISD original girls softball page: <https://www.shinerisd.net/athletics/softball>
- UIL Shiner 2026 state-team archive: <https://www.uiltexas.org/softball/state-team/shiner-2025-2026-softball>
- UIL Ganado 2026 state-team archive: <https://www.uiltexas.org/softball/state-team/ganado-2025-2026-softball>
- Texas House 2025 Ganado title resolution: <https://capitol.texas.gov/tlodocs/89R/billtext/html/HR01528F.htm>
- Katy ISD June 2026 full championship report: <https://www.katyisd.org/news-details/~board/news-headlines-katy-independent-school-district-100/post/softball-dynasty-katy-softball-dominates-to-net-third-state-title-in-11-years>
- Katy High School directory: <https://khs.katyisd.org/our-campus/directory?const_page=3>
- Pearland ISD June 2026 historic title recap: <https://www.pearlandisd.org/news/isd-news-details/~board/pearland-isd-news/post/pearland-oilers-capture-fourth-uil-6a-division-1-state-championship>
- Pearland official softball roster/staff page: <https://phs.pearlandisd.org/athletics-phs/womens/softball>
- Amarillo Highland Park's real ISD: <https://www.hpisd.net/>

## Work required before these become first-release authority pages

For **each school**, complete a single versioned school ID (campus+ISD), all 38 date-stamped researched topics, source-attributed original program narrative, current coach/schedule access, school-specific home field verification, historical brackets and recognitions, county/TEA verification, audience-specific visitor/eligibility content, authentic licensed image, and all required accessibility/SEO/Worker tests. Only then explicitly approve promotion into `published-team-profiles.json` and generate full pages from the approved research record.

### Release discipline

- Keep **all five** pilot pages off the sitemap until the contract passes. This is research, not a set of teaser pages.
- Use one existing optional softball route, not a separate TanStack route per school.
- Run focused `node scripts/softball/validate-pilot-research.mjs` before full CI. It is also part of `npm run softball:authority:validate`, and thereby the canonical protected merge gate.
- As entire teams become evidence-complete, release them as full authority pages in coherent source-validated batches, rather than bulk auto-generating the 1,192-school directory into thin articles.
