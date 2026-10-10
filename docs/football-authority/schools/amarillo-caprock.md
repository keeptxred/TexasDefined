# Amarillo Caprock Longhorns — individual school audit (Batch 003)

**Reviewed:** 2026-10-09  
**Page:** https://texasdefined.com/texas-high-school-football-teams/amarillo-caprock  
**Status:** IMPLEMENTED on a work branch only — not merged, deployed or VERIFIED.

## Specific source/page audit

- The existing program editorial registry had **no Caprock-specific editorial entry**; the route relies on shared UIL, athletics and school-finder data. Amarillo High's separate Sandies entry is not interchangeable with Caprock.
- Generic historical treatment missed independently reported **2018 8–4** and **2024/2025 3–7** seasons, eight playoffs with **zero football title-game appearances** and documented district-level football culture.
- A careless Amarillo ISD history summary could falsely assign Caprock's many **girls wrestling championships** to football. Official district records separate those sports.
- The football page lacked an individually sourced 2026 coaching attribution and dated wins/losses; its current season is in progress as of October 9.
- School campus (3001 E 34th Ave) is not necessarily the correct stadium gate; AISD specifically publishes Dick Bivins ticket prices and clear bag restrictions.
- Official source photographs do not imply republication rights; no unauthorized photo added. Original sourced milestone visualization is the fallback, not an invented football photo.
- Actual production fetch from the research web client was inaccessible, so this is a **repository/source-specific audit**, not a successful live visual, accessibility or Chrome certification.

## Evidence trail and reconciliation

- [Amarillo ISD Caprock official campus](https://www.amaisd.org/chs): official contact/address; Rowdy Freeman listed as **athletic director** (not explicitly football head coach).
- [MaxPreps Caprock history](https://www.maxpreps.com/tx/amarillo/caprock-longhorns/football/history/): lists Rowdy Freeman as 2026 football head coach; corroborate any later change using district directory.
- [Amarillo ISD Athletics](https://www.amaisd.org/133763_3): official football schedule links, Dick Bivins stadium clear-bag policy, HomeTown ticketing and **2026** presale $8 adult/$3 student and gate $10 at Dick Bivins. Per-game schedule and venue still must be checked.
- [Dave Campbell's Caprock program record](https://www.texasfootball.com/team/amarillo-caprock-longhorns): eight playoffs, zero football state titles or finals; 2018 8–4, 2024 and 2025 3–7; Dick Bivins listed as stadium (15,000 capacity is third-party, not an independently verified current ADA/gate specification).
- [Official Amarillo ISD state-title listing](https://www.amaisd.org/athletics): Caprock championships are in girls wrestling, **not football**.
- [UIL 2026–28 Class 5A Division I alignment](https://realignment.uiltexas.org/alignments/2026/5AD1FB2026.pdf): District 2, not a historical classification.
- [MaxPreps 2026 scores and fixtures](https://www.maxpreps.com/tx/amarillo/caprock-longhorns/football/schedule/): published 1–4 through October 2 and October 9 versus Frenship upcoming on the posted schedule. Scores are **dated snapshot**, not live feed.

## Implemented — protected workflow still pending

Distinct Caprock introduction, independently dated football history and eight-playoff context, coach provenance caveat, five individually sourced season moments, 2026 score snapshot, 2026–28 alignment, verified official school contact, stadium/clear-bag/ticket guide and source-grounded FAQs. Custom metadata and restrained original graphic milestones, without copying school logos or photos.

**Code commit:** `b58919a789fdbff4d7ca266cc601acc42c40563e` in `src/data/high-school-football/program-editorial.ts`.

## Explicit outstanding acceptance

1. Validate exact school mascot and official colors directly with Amarillo ISD; editorial maroon accent is **not** asserted as official verified branding.
2. Check Potter County campus identity from NCES and add real contextual inbound county/city link only after verification.
3. Verify team-specific official ticket URL and any accessible entrance/parking details rather than guessing.
4. Obtain rights-cleared authentic school imagery, if available; otherwise preserve original source-labeled cards.
5. Run football validators/typecheck, protected PR checks, safe merge and production deployment.
6. Independently inspect live page at mobile and desktop for title/H1/canonical/JSON-LD, links, contrast, runtime errors, image rights and responsive layout.
7. Only then advance `IMPLEMENTED → MERGED → DEPLOYED → VERIFIED`. A commit is not production acceptance.

**Next school:** Amarillo Highland Park, while Caprock merge/acceptance remains open.
