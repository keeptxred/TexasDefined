# Abilene High Eagles — individual research and source audit (Batch 002, 2026-10-09)

**URL:** https://texasdefined.com/texas-high-school-football-teams/abilene  
**School:** Abilene High School, Abilene ISD, Taylor County, campus 2800 North 6th Street  
**Stage:** IMPLEMENTED ON ACTIVE BRANCH; NOT YET MERGED, DEPLOYED OR PRODUCTION VERIFIED.

## Independent actual-page/source audit
- The school had existing basic identity (`Eagles`) but no `abilene` story in `program-editorial.ts`. Generic UIL templates could show all-time title counts but did not explain the specific **1923/1928/1931** crowns, Chuck Moser's 49-game streak, 1957 tie-break, or Steve Warren's unbeaten 2009 championship.
- Black/gold school colors missing from existing verified identity record; no school-specific history graphics or source-verified coaching, district 2026 ticket restrictions or game-day advice.
- Abilene High must not be confused with Abilene **Cooper** or Abilene **Wylie** (different schools and different title totals) or with Abilene High School in Kansas; the canonical profile is Abilene High **Eagles**.
- Missing explicit campus Taylor County inbound/outbound football links; optional TEA program join could drop county.
- Actual live route could not be independently inspected with the available research browser; source code audit and live primary-source research are not production rendering passes.

## Independent research with provenance
- [UIL all-time appearances](https://www.uiltexas.org/football/all-time-appearances): **7 Abilene titles and 9 championship appearances** (1922 runner-up, 1923 champion, 1927 runner-up, 1928 champion, 1931 champion, 1954–56 champions, 2009 champion).
- [UIL historical football champions](https://www.uiltexas.org/historical-archives/athletics/archives/football/champions.html): 1923 Waco 3–0; 1928 Port Arthur 38–0; 1931 Beaumont 13–0; 1954 Houston S. F. Austin 14–7; 1955 Tyler 33–13; 1956 Corpus Christi Ray 14–0. Do not confuse a state-final appearance with a win.
- [UIL centennial football teams](https://www.uiltexas.org/100/football-teams): **1928** coach Dewey Mayhew, 12–0–1; **2009** Steve Warren, **15–0**, Katy **28–17**, contributions Drew Carroll, Herschel Sims, championship MVP Ronnell Sims. [UIL 2009 final](https://www.uiltexas.org/football/archives/P192) independently confirms opponent and score.
- [TSHA Handbook of Texas Abilene High Eagles](https://www.tshaonline.org/handbook/entries/abilene-high-eagles-19541957): Coach Chuck Moser's **49 consecutive wins** 1954–57, three state titles, special train of ~700 fans to 1954 Odessa game, nickname *Warbirds*, football history museum, and the 1957 **20–20 tie** with Highland Park that ended via historical penetration tiebreak; historical accounts are not claims of 2026 museum opening hours.
- [Official 2026 Abilene High staff](https://www.abileneisd.org/o/ahs/staff?page_no=3): **Michael Fullen** head coach/athletic coordinator (sports outlets use Mike Fullen), distinct from 1950s Moser and 2009 Warren.
- [Official Abilene ISD 2026 football ticket and safety notice](https://www.abileneisd.org/article/2937209), posted May 28: Shotwell Stadium and Shotwell Annex, **clear bags required**, HomeTown Ticketing. **$35 season ticket sales expired August 6, 2026**, so do not advertise as currently on sale. District athletic office 325-677-1444 ext. 3013 for current rules, parking, accessible entrances and ticket pricing; campus mailing address is NOT Shotwell Stadium gate.
- [NCES current Abilene High campus](https://nces.ed.gov/ccd/schoolsearch/school_detail.asp?ID=480744000010): Abilene ISD, **Taylor County**, 2800 North 6th, phone 325-677-1731; NCES 2024–25 attendance isn't 2026 UIL enrollment. School's black/gold colors documented in its district-published **2021–22 campus guide** [rehosted copy](https://www.readkong.com/page/campus-guide-2021-2022-home-of-the-eagles-2800-n-6th-1464265); modern official [school home](https://www.abileneisd.org/o/ahs) authenticates Eagles identity.
- [UIL 2026–28 football alignment](https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf): Abilene in Class 5A Division I District 2, separate from 2009 5A Division II. Do not infer current results.
- [UIL 2009 Abilene team log](https://www.uiltexas.org/100/football-teams): 2009 meeting with citywide Abilene Cooper; TSHA recounts how creation of Cooper near the close of the 1950s changed city's single-team identity. Abilene Cooper and Abilene Wylie are separately indexed profiles.
- No reliable independent sources supporting a fabricated 2026 home-game entrance, 2026 roster or a fixed stadium ADA configuration. Need official event links if available.

## School-specific improvements committed
- Unique original Abilene High narrative across seven historical/visitor dimensions, 6 sourced primary/history milestone graphics, original black/gold color treatment, sourced FAQ about seven titles, 49-game streak, coach, 2009 Katy final, ticketing and Cooper comparison.
- Enriches **existing** Eagles school identity instead of duplicating record. SEO title and description specific to real school, SportsTeam/H1 inherits accurate Eagles identity.
- Separate historical Chuck Moser/Steve Warren from current Michael Fullen; distinguish 1957 tie-break, campus from football stadium, expired ticket prices and UIL 2026–28 classification.
- Reciprocal Abilene High ↔ Taylor County links in existing rendering flow based on exact NCES county. Licensed actual team photography unavailable; original data-based milestone graphics substitute without mislabeling generated/fake stadium imagery.

**Commits:** editorial `c528644693c8384ff2021c7938505f7b4fdb6efe`, enriched identity `f4aec46c027eb539d38b793eac78e8b2afae3c64`, county outbound `32925f6cc5043671e8d9c20ddd62656291adbbc4`, county inbound `4123cc8e69109bf8c54c5f73fa9d435b0ae1e3bb`.

## Unfinished acceptance (explicit)
- Merge Gate and required build/validator checks, branch replay onto latest main safely, protected merge and Cloudflare release evidence.
- Full-size desktop/mobile Chrome verification of Abilene High + Taylor County reciprocal links, H1/title/schema/canonical, relevant sources, 2009 exact score, no hydration errors, no horizontal overflow or broken assets.
- Legitimately licensed documentary school/stadium photograph if found later; existing history graphics cannot impersonate a real photo.
- Current 2026 single-game ticket prices, parking and accessibility entrances unverified, deliberately not invented.
- **Do not mark VERIFIED before individually passed actual production acceptance.** Next assigned school is Abilene Cooper, while Abernathy and Abilene must be reconciled through deployed acceptance.
