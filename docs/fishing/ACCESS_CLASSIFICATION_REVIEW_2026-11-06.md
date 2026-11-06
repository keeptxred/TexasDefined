# Fishing Access — bounded source-identity review (2026-11-06)

## Scope and non-destructive baseline
- Production baseline before this PR: 377 verified access facilities serving 66 lakes, as certified in [#6642](https://github.com/keeptxred/TexasDefined/issues/6642).
- Inspected 193 curated facility rows across 16 curated TPWD lake groups and 221 source-reviewed statewide access definitions in `statewide-lake-network.ts`, selecting and cross-checking candidate type conflicts. **414 source data rows reviewed for categorical risk**; some facilities overlap, and these figures are **not** 414 unique published sites.
- Never expanded raw lake-heading candidates into published records, changed the count of facility rows, or altered existing noindex and sitemap scope. No whole-site crawl was conducted.
- All other existing curated classifications retain their previously established source review dates; checking the suspected rows does **not** certify all 377 active facilities' opening, fees or complete operator rights as of Nov 6.

## Primary evidence and precise corrections
| Source inventory | Identity correction | Why it matters |
|---|---|---|
| [TPWD Lake Travis, access2.phtml](https://tpwd.texas.gov/fishboat/fish/recreational/lakes/travis/access2.phtml) | Arkansas Bend: shore → boat ramp | Two-lane concrete boat launch, Travis County Parks, fee; coordinates/directions on TPWD |
| Same | Pace Bend/Collier Cove; Pace Bend/Tatum Cove: shore → boat ramp | Separate concrete lanes; fee entry; site-specific park access |
| Same | Bob Wentz at Windy Point: shore → boat ramp, **sailboats only** | Not an unrestricted motorboat launch |
| Same | Cypress Creek: shore → boat ramp | Two-lane concrete park launch |
| Same | Mansfield Dam Park remains boat ramp, more precise description | High/low water lane distinction, TPWD-labeled accessible courtesy dock, ramp elevation threshold |
| [TPWD Ray Hubbard](https://tpwd.texas.gov/fishboat/fish/recreational/lakes/ray_hubbard/access.phtml) | Paddle Point Park: conventional boat ramp → kayak launch | Gravel/dirt non-motorized paddling put-in at 6775 Miller Rd, Rowlett; no assumed motorboat trailer facility |
| [TPWD Bachman](https://tpwd.texas.gov/fishboat/fish/recreational/lakes/bachman/access.phtml) | Bachman Lake public bank-fishing shoreline: inferred boat ramp → explicit shore | TPWD distinguishes most bank-fishable lake shoreline from the **single separate** Shorecrest Drive ramp (two lanes, five trailer spaces) |
| [TPWD Benbrook](https://tpwd.texas.gov/fishboat/fish/recreational/lakes/benbrook/access.phtml) | Bear Creek Park: inferred shore → ramp | TPWD documents two ramps / three lanes, **campers-only**, seasonal closure, not general unrestricted launching |
| Existing source-backed statewide dossiers | Commons Ford, Selma Hughes and Fritz Hughes: explicit bank/shore access rather than text-inferred general boat ramp | Avoid presenting walk-in shoreline access as an unrestricted motorboat launch |
| [TPWD Lake Buchanan](https://tpwd.texas.gov/fishboat/fish/recreational/lakes/buchanan/access.phtml) | Colorado Bend State Park: explicit public ramp (unimproved), with **river above reservoir** context | TPWD expressly documents an unimproved boat ramp and wade/bank access; not a main-lake improved trailer ramp. |
| [TPWD Lake Palestine](https://tpwd.texas.gov/fishboat/fish/recreational/lakes/palestine/access2.phtml) | Chandler River Park retains explicit **public-ramp** classification | TPWD describes a **small-boat ramp on the upstream Neches River**, with bank fishing, not an improved main-reservoir launch. Maintain this distinction in the location description. |
| Existing source-backed statewide dossier | Spring Canyon fishing pier: park → pier | Accessibility and shore-pier intent should not enter launch filters |

The source-reviewed statewide `Paddle Point Park (paddle craft only)` definition was also typed as `kayak-launch`; the separately curated Ray Hubbard record remains canonical for that lake. **Six curated rows and nine statewide definition rows** received classification changes. The two catalog layers contain some overlapping identities; do not sum those changes as 15 distinct published URL changes.

## Directory editorial and validation policy
- Seven curated records (six Travis plus Paddle Point) now have source-site-specific descriptions and operator/launch caveats; for 193 curated records the repeated generic dynamic-status sentence was removed in favor of site detail when available, or concise TPWD-linked identification.
- Sitewide source-dossier summaries now prioritize actual source-quoted launch, operator, fee wording; changing-condition warning stays prominent once at the top of the directory.
- `access-kind.ts` uses reviewed explicit category where available and recognizes plural `ramps` in descriptions without interpreting `NO ramp`, paddling-only put-ins or piers as motorboat ramps.
- Existing fishing source inventory CI now rejects contradictory descriptions and tests named TPWD edge cases without loosening source, duplicate, indexability or sitemap protections.
- No current opening status, live ramp usability, verified ADA route, private marina public services or field visit is inferred.

## Evidence limitations and next release gates
This bounded review specifically targeted potential access classification mistakes. Unchecked current facility status, changes to local parking policies, operators and full real-time source drift remain subject to existing GitHub official-source monitoring and/or separately dated authoritative editorial review. **Source availability is not a substitute for factual certification.**

Merge only after required protected Merge Gate and source inventory checks pass. Verify the actual production deployment, independently check both the ordinary and cache-busted public URL and source-linked filters; run the scoped desktop/mobile Chrome job on this exact protected production SHA. Record merge SHA, deployment ID, live test run and artifacts on #6642 for Script 2.