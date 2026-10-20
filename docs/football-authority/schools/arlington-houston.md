# Arlington Sam Houston Texans — individual football authority audit

**Profile:** https://texasdefined.com/texas-high-school-football-teams/arlington-houston  
**Research date:** 2026-10-09. **Stage:** IMPLEMENTED only on draft PR #4506; no merge, deploy or real Chrome certification.

## Actual school-specific deficiencies
This canonical slug `arlington-houston` is **Sam Houston High School in Arlington** (Texans), not a Houston city school and not the NFL Houston Texans. Generic template content risked this conflation, omitted source-verified school history, 2026 coach and rebuilding achievements.

- [Official Sam Houston High school history](https://www.aisd.net/sam-houston-high-school/about/) gives the opening year **1963**, campus **2000 Sam Houston Drive**, phone **682-867-8200**.
- [Official Sam Houston athletics staff](https://www.aisd.net/sam-houston-high-school/athletics/) identifies **Bobby Watkins** as head football coach/athletics coordinator. The staff page links to official schedules; do not substitute NFL results.
- [DCTF Arlington Sam Houston team](https://www.texasfootball.com/team/arlington-sam-houston-texans): **11 football playoff appearances, no state final/titles**, **2023 0–10**, **2024 2–8**, **2025 1–9**. Independently lists Wilemon Field with historic 8,500 seats, not verified current ADA/event policies.
- DCTF's dated 2026 results through Sept. 25 show **North Mesquite W24–21**, **Everman W29–13**, **Cleburne W62–0**, **Arlington High L15–37**, **Weatherford L10–59**, giving **3–2** for five completed games. Oct. 9 Arlington Martin not scored on that snapshot.
- Arlington High's **1951** state title is not a Sam Houston Texans title. Wilemon Field name is not proof of a school-campus spectator entrance.
- Authentic football photos, first-party ticketing/accessible arrival, team colors and actual browser production checks were not available; no unlicensed school photograph was copied.

## Specific implementation
Correct independent Arlington Sam Houston identity, school founding timeline, Bobby Watkins official coach, 2023–25 rebuilding years and 2026 winning start, date-specific matchups against district neighbors, named stadium visitor caveats, original milestone graphics, distinctive SEO and FAQs. Commit `86b24de2e4c65c8446f2368ce2257d87ef51acb5`.

Remaining: confirm campus NCES Tarrant County and relevant inbound Arlington city/county/school links, official school colors, football photo licenses, game-day gates/tickets/ADA, mobile/desktop tests, CI, protected merge, Cloudflare production and live sitemap/schema verification.

**Next assigned:** Arlington Lamar.

## Official 2026–27 Arlington ISD game-day and venue evidence — October 9, 2026
- [Arlington ISD Athletics](https://www.aisd.net/district/departments/administration/athletics) supplies school-specific 2026–27 schedule links for all six AISD high schools, states varsity football tickets use GoFan and are released at **8 a.m. Sunday before the event**, and publishes district-wide clear-bag and admission rules. This should be the primary live ticket-policy referral, with playoff exceptions.
- [Choctaw Stadium's official 2026 schedule](https://www.choctawstadium.com/event/high-school-football-20261105/) distinguishes home vs away and identifies Sam Houston as the home side at Choctaw for Aug 28 vs North Mesquite, Sep 18 vs Arlington, Oct 8 vs Martin, Oct 16 vs Lamar, Oct 30 vs Aledo; Nov 5 at Bowie. These are **scheduled fixtures**, not claims that any game has been completed or its score verified.
- No confirmation of accessible entrance, parking availability or reuse permission for game photographs is implied. Production page/mobile acceptance remains pending; no status promotion.

### Specific fixture corrections saved
The older editorial carried **Oct 9 vs Martin** and **Nov 6 at Bowie**. The first-party Choctaw event schedule instead states **Thursday Oct 8 vs Martin** and **Thursday Nov 5 vs Bowie**, with Sam Houston home versus Martin but **visiting Bowie** on November 5. Corrected canonical `program-editorial.ts` in commit `0ec848ce1e55d70510261a51b1da10bb816b3e89`; results remain unverified (schedule ≠ final score). Recheck all other AISD 2026 fixtures against Rank One before production acceptance.

### Venue listing order rechecked against primary source
The official [Choctaw 2026 schedule](https://www.choctawstadium.com/event/high-school-football-20261105/) expressly labels matchups **visiting team vs. home team**. The November 5 listing is *Sam Houston vs. Bowie*, so **Bowie is home**; earlier in this audit, Sam Houston's home designation for November 5 was incorrect. Editorial correction commit `e669e2bb9599f8d56201a535e3501ece11926608`. This correction is a scheduling fact, not a score or production certification.

## Individual production browser certification — 2026-10-10
**Production browser VERIFIED** by [Chrome run 38026402179](https://github.com/keeptxred/TexasDefined/actions/runs/38026402179) at deployed commit `4b61627a4a36cf3bff9c32e592b3f94a04805075`. [Artifact 11660256304](https://github.com/keeptxred/TexasDefined/actions/runs/38026402179/artifacts/11660256304) includes `desktop-school-arlington-houston.png` and `mobile-school-arlington-houston.png`. Each viewport returned 200 with one H1, correct canonical/SEO/schema, visible individual source and Tarrant County/Arlington reciprocal links, no recorded runtime errors, image issues or overflow. Included in 25/25 sitemap. Event-specific ADA access and image reuse permissions remain qualified and not falsely asserted.
