# TexasDefined — statewide Chamber media, event and source partnership program

**Sender:** admin@texasdefined.com using Microsoft 365 Outlook only. **Never use Gmail.**  
**Checkpoint:** https://github.com/keeptxred/TexasDefined/issues/7548  
**Opened:** November 22, 2026. This program has started, but does not claim 254 active relationships.

## Objectives

Improve local festivals, community celebrations, parades, holiday programming and annual traditions on TexasDefined county guides and the statewide events calendar. Build reliable announcements and media relationships with organizations serving **all 254 Texas counties**. Invite independently earned resource links to genuinely useful TexasDefined coverage; no payment, reciprocal exchange or coverage-for-link arrangement.

A county may have several city Chambers or no distinct countywide Chamber. A Chamber may cover multiple counties. Where needed, expand to official city tourism, CVBs, fair boards, organizers and regional Chambers. Never invent a source for an unserved county.

## Existing systems to extend rather than duplicate

- Editorial outreach intake and protected administration: src/data/editorial-outreach.server.ts and /admin/editorial-outreach.
- Existing protected Backlink Command Center and docs/seo/backlink-command-center.md.
- Authoritative event calendar, permanent event guides and protected refresh: src/data/events/texas-event-records.server.ts and .github/workflows/sync-texas-events.yml.
- Canonical 254-county registry: src/data/texas-places.ts.
- Newly introduced public-source discovery: ops/editorial/chamber-event-sources.json, scripts/events/audit-chamber-event-sources.mjs, and .github/workflows/audit-chamber-event-sources.yml.

## Verified outreach workflow

1. Research verified official Chambers for each county, using the TCCE and U.S. Chamber directories as starting points, followed by first-party sites. Register all counties covered by one Chamber, but do not mistake a nearby Chamber for a representative of an unrelated county.
2. Find a published email, media contact or contact form. Check the existing O365 Sent Items and protected outreach records to avoid duplicate messages. Do not guess addresses or scrape Chamber member lists.
3. From the O365 sender, introduce the existing TexasDefined events calendar and exact relevant county guide. Request opt-in to press releases, official annual-festival and holiday announcements, material date changes and corrections, and any available media kit, press photography and publication terms.
4. Optional reference invitation: if the Chamber finds a specific TexasDefined guide independently useful, it may link to it from an appropriate visitor/media resource page. No paid, traded, required or guaranteed backlink; no editorial preference in exchange.
5. Store responses, press-list acceptance, contact data, email and image rights in O365 and existing protected outreach systems. Public GitHub contains only official source names/URLs and the nonpersonal county coverage queue.
6. Offer at most one courteous unanswered follow-up after approximately ten business days. Honor declines and stop requests. Use tailored one-organization messages rather than a 254-recipient blast.
7. Request preliminary holiday calendars August–October, follow updates through December, and check recurring festivals ahead of each organizer's normal announcement cycle.

## Automated source discovery when mailings are unavailable

- Prefer explicitly published event RSS, iCalendar or public structured-data feeds and first-party public Chamber calendars, respecting robots exclusions, publisher terms, access limits, and rate limits. Never bypass authentication or robots rules.
- The new GitHub source audit fetches **at most the single registered public calendar URL** per organization in a due review cycle, identifies candidate event titles/dates/source URLs, and records missing geographic coverage. As registration expands beyond twelve sources, fetch checks are distributed over seven days; holiday-priority sources can be checked more often.
- A Chamber calendar is for **discovery**, not authoritative publication. The event organizer/venue or competent city authority must independently confirm current event dates, location, organizer, tickets, changes, cancellation status and media reuse permission.
- Do not copy event descriptions/photos, guess subsequent years, move source verification dates following a mere HTTP 200, or emit Event schema for an unverified future occurrence.
- Resolved, current events belong in the **existing** authoritative calendar and permanent event guide lifecycle, with applicable county-page and regional crosslinks. No separate thin county/event doorway pages.
- If automated access fails or is forbidden, leave it as manual research, honor access restrictions, and use email or official human-submitted media lists.

## County-level acceptance standard

Each of the 254 counties eventually needs reviewed first-party discovery sources; a clear record of whether the Chamber actually agreed to ongoing media list inclusion; current organizer-verified events; appropriate county/event/region links; holidays monitored on season; exact-date validation and annual refresh without unsupported date rollover; image permissions; factual AEO and SEO; and search-safe event structured data.

**Do not equate source-mapped with subscription confirmed, event coverage complete or an earned backlink.** County coverage progresses separately through research, outreach, source accepted, verified-event publication and link verification.

## Verified launch cohort and honest gap

- Gregg and Upshur: Gladewater Chamber of Commerce — https://gladewaterchamber.org/
- Angelina: Lufkin/Angelina County Chamber — https://www.lufkintexas.org/
- Kimble: Kimble County Chamber — https://www.kimblecountychamber.com/
- Jefferson: Greater Port Arthur Chamber — https://www.portarthurtexas.com/
- Rusk: City of Henderson Tourism — https://www.hendersontx.us/1280/Events
- Harrison: Greater Marshall Chamber — https://marshalltexas.com/
- Smith: Tyler Area Chamber — https://calendar.visittyler.com/events/calendar
- Nacogdoches: Visit Nacogdoches — https://www.visitnacogdoches.org/events
- Potter and Randall: Visit Amarillo — https://www.visitamarillo.com/events/
- Lubbock: Lubbock Chamber — https://business.lubbockchamber.com/events/calendar
- Presidio: Visit Marfa — https://visitmarfa.com/events
- Brewster: Visit Alpine — https://visitalpinetx.com/events-calendar/

**Latest staged source/contact mapping: all 254 Texas counties / 284 first-party public sources (Nov 22, 2026). Classified community-calendar records: 132 sources spanning 127 counties; 127 counties still lack a separately verified current community calendar. Other roles: 19 individual-event pages, 13 annual-event directories, 34 contact-only desks and 86 unclassified older sources. No mapped contact implies press-list acceptance, licensed images, verified future festival dates or earned backlinks.**

On November 22, 2026, **nineteen individualized O365 outreach messages** were sent to the Gladewater, Lufkin/Angelina, Kimble County, Port Arthur, Henderson tourism, Marshall, Tyler, Lubbock and Amarillo Chamber/event contacts, then Waller, Bellville, Sealy, Washington County and Bastrop Chambers, plus Visit Corpus Christi, Visit San Antonio, Visit Houston, Visit Austin and Visit Galveston public event/media teams. A separate **twentieth** O365 message invited Texas Chamber of Commerce Executives to circulate the voluntary media-list invitation to member Chambers; **no private membership export was requested**. O365 history showed previous outreach to Visit Marfa, Visit Alpine and Visit Nacogdoches, so no duplicate messages were sent to those offices. All new subscription, media rights and earned backlinks are unconfirmed until organizations respond or linking URLs are independently verified.

### Specific local event source-verification pilots

- Gladewater (Gregg/Upshur): **Christmas in Gusherville**, Chamber/downtown merchant event on November 14, 2026; 2026 coverage documented by the independent Gladewater Mirror: https://www.gladewatermirror.com/event-season-starts-saturday-with-slew-of-local-activities . Organizer must confirm any next season occurrence; do not infer the 2027 date.
- Henderson (Rusk): **Heritage Syrup Festival**, Saturday November 14, 2026. Current first-party City event announcement: https://www.hendersontx.us/14/Heritage-Syrup-Festival . Watch for verified next-season announcement and link to the Depot Museum; no 2027 date yet.
- Marshall (Harrison): **Wonderland of Lights**, the 2026 city/Chamber holiday program and related Chamber lighted parade: https://marshalltexas.com/ . Verify individual 2026 sessions and next-season dates with the actual organizers.
- Other chamber calendar discoveries in the registry are leads only until organizer fact verification; this pilot watch list is not a promise of publication.

## Source references

- https://www.texas.gov/government-information/local-government-resources
- https://business.tcce.org/active-member-directory
- https://www.uschamber.com/co/chambers/texas/
- https://developers.google.com/search/docs/essentials/spam-policies
- docs/seo/backlink-command-center.md

Keep checkpoint #7548 open until statewide source discovery is complete, current event coverage reaches county and event pages with source verification, scheduled refresh evidence exists, and the external relationship outcomes are truthfully documented. Never promise third-party links or media-kit delivery.


### 2026-11-22 second source cohort (15 verified first-party sources)

County source-mapping additions: Waller (Waller Area Chamber); Austin (Bellville Chamber and Sealy Chamber); Washington (Washington County Chamber); Bastrop (Bastrop Regional Chamber); Nueces (Visit Corpus Christi); Bexar (Visit San Antonio); Harris (Visit Houston); Travis (Visit Austin); Galveston (Visit Galveston); Dallas (Visit Dallas); Tarrant (Visit Fort Worth); Denton (Discover Denton); Brazos (Destination Bryan); and El Paso (Visit El Paso). City-specific CVB calendars are discovery leads, not statewide or complete county event attestations. Five additional city tourism sources (Dallas, Fort Worth, Denton, Bryan and El Paso) were registered as source-only, with **no** email outreach presumed; the other ten new sources were individually contacted via O365.

Running outreach campaign: 20 new confirmed O365 messages total (19 individualized local or CVB contacts plus one statewide TCCE association request), privately tracked as contacted with no subscriptions/backlinks assumed. The existing Visit Marfa, Visit Alpine and Visit Nacogdoches outreach records were not re-sent. Website consent/rights are not established by public calendar access alone.


## Second research expansion — 2026-11-22

The next source cohort adds 18 public Chamber/visitor calendars representing one additional county each: Anderson (Palestine), Aransas (Rockport-Fulton), Brazoria (Northern Brazoria), Fort Bend (Central Fort Bend), Collin (McKinney), Montgomery (Conroe/Lake Conroe), Williamson (Georgetown), Wood (Winnsboro), Hays (San Marcos), Cherokee (Rusk), Henderson (Athens), Bell (Belton), Kerr (Kerrville), Lamar (Paris), Gonzales, Burnet, Bowie (Texarkana) and Orange. Official calendar/contact URLs are stored in the public registry; do not imply these organizations subscribed, replied or linked. Source registration is research inventory only; events require independent organizer verification and image-rights checks.


## Reconciled Chamber source cohorts — 2026-11-22

After the first 47-county expansion, additional direct Chamber/CVB/city source cohorts were reconciled with other concurrently merged official-organizer research on main. The combined public registry now has 115 source entries covering 98 distinct counties, preserving official city/event-specific sources and broad Chamber calendars without overwriting same-ID entries. The remaining 156 counties are research gaps, and some registered calendars need access/robots or provenance review. Registration or a successful HTTP fetch is **not** proof that a particular organizer date is verified, a press list was subscribed to, a photo may be reused, or a backlink exists. Existing scheduled source audit maintains the authoritative gap issue (#7561); this count is a repository-source map, not a live event coverage score.

The Burleson County Chamber directly confirms the 42nd Caldwell Kolache Festival on September 11, 2027 and Caldwell Christmas on the Square for December 11, 2026. Both are maintained in their canonical permanent guide/calendar and original county links. Retain exact source URLs; do not roll over any other annual dates without a first-party organizer announcement.

## Official Chamber calendar cohort — November 22, 2026

Seventeen additional counties now have named first-party Chamber/CVB/city visitor public calendars and contact pages: Gillespie (Fredericksburg), McLennan (Waco), Taylor (Abilene), Val Verde (Del Rio), Victoria, Johnson (Cleburne), Parker (Weatherford), Midland, Rockwall, Kaufman (Terrell), Webb (Laredo), Polk (Livingston), San Patricio (Portland), Kleberg (Kingsville), Wise (Decatur), Wichita (Wichita Falls), and Hidalgo (McAllen). Some calendar operators primarily publish business events, so do not infer that their feeds constitute complete community or holiday coverage. Original organizer dates and actual usage rights still govern all event publication; public contacts are not recorded here. See #7548 for outreach status.

A further eight source-led counties are now in the roster: Hood (Granbury), Hunt (Greenville), Walker (Huntsville), Lavaca (Hallettsville), Matagorda (Bay City), Comal (New Braunfels), Grayson (Denison city/visitor events), and Guadalupe (Seguin city/visitor calendar). Municipal listings are labeled as municipal sources; do not incorrectly identify them as Chambers. Reachable listings are candidate leads; festival date acceptance remains with the actual organizer.

## Direct first-party outreach source cohort — 2026-11-22

Nineteen researched and uniquely mapped public official calendars/contact sites now cover Cass (Linden), Marion (Jefferson), Kendall (Boerne), Navarro (Corsicana), Tom Green (San Angelo), Nolan (Sweetwater), Maverick (Eagle Pass), Titus (Mount Pleasant), Ward (Monahans), McCulloch (Brady), Lampasas, Llano, Medina (Hondo), Jasper, Somervell (Glen Rose), Freestone (Fairfield), San Augustine, Milam (Rockdale) and Panola (Carthage Main Street). Municipal Main Street websites and chamber listings are distinguished in the source names. Some of the contact sources do not offer a true public festival calendar; they require separate event-owner sourcing and cannot be mischaracterized as current organizer-confirmed event schedules. See canonical daily source audit and county gaps issue for inaccessible or stale calendars; never bypass robots or infer image reuse rights.

## Rural first-party calendar expansion — November 22, 2026

Fourteen further reviewed first-party source websites cover Gray (Pampa Chamber), Hardin (Silsbee Chamber), Scurry (Snyder Chamber), DeWitt (Cuero Chamber), Runnels (Ballinger Chamber), Young (Graham Chamber), Howard (Big Spring visitor bureau), Hutchinson (Borger Chamber), Wilson (City of Floresville community events), Wilbarger (Vernon Chamber), Sutton (Sonora Chamber), Pecos (Fort Stockton Chamber), Terry (Brownfield Chamber), and Yoakum (Denver City Chamber). These include recurring Christmas and local festival lead calendars and some low-volume Chamber homepages used as research contacts rather than proof of exact event dates. This registry is a discovery map, not published event occurrence verification.

## Local tourism and municipal source desks — November 22, 2026

Additional nine first-party source records are Hamilton (official city Main Street events), Madison (Madisonville City tourism and events), Jackson (Edna-area Chamber), Liberty (active Trinity Valley/Dayton Chamber rather than the dissolved former Liberty County Chamber), Karnes (Kenedy Chamber), Frio (Pearsall Chamber), Leon (Centerville Chamber), Houston (Discover Crockett local visitor information), and Limestone (City of Mexia event/news desk). Several contacts and sparse calendars **do not** establish an upcoming annual event, and the City of Mexia source is not mislabeled a Chamber. When an official countywide Chamber has shut down, avoid resurrecting obsolete organizations. The verified source report stays separate from first-party event-occurence acceptance, photo licensing, press-list opt-in and earned backlink verification.

## Organizer and tourism sources for small counties — 2026-11-22

Added Mason County Chamber public annual visitor calendar, Dumas/Moore County Chamber calendar, Plainview/Hale County Chamber events, Seminole/Gaines Chamber events, City of Spearman/Hansford current events (avoids relying on the 1999 archival Chamber calendar), Breckenridge/Stephens Chamber contact website (low-frequency events require direct confirmation), Reeves County first-party rodeo and visitor calendar, and Rains County Fair Association as the event owner. These sparse-county sources are not proof of 2027 event dates unless the dated owner itself specifically confirms the edition. Breckenridge uses its own Texas site, not similarly named non-Texas Chambers; Rains fair is explicitly an organizer rather than falsely labeled a Chamber.

## Eight more active Texas visitor and event source organizations — 2026-11-22

Hearne/Robertson County Chamber community calendar, Refugio County Chamber community event page, Raymondville/Willacy County Chamber, official Shamrock St. Patrick's Association (Wheeler County), Starr County Fair Association, Crystal City's Spinach Festival organizer (Zavala County), Tyler County Chamber and Newton County's **official county-government Chamber contact page** are now registered. Shamrock's organizer confirms its annual event returns in 2027 but does not independently confirm exact next-edition dates; do not infer them. The Newton record is a county-confirmed Texas Chamber contact only, **not** a first-party event calendar. An unrelated Newton Chamber site in **Covington, Georgia** was found during research and deliberately excluded; likewise, old 2003 Trinity Chamber calendar and the 1999 Spearman Chamber archive are not treated as current events. Do not conflate an approved calendar research source with an authoritative event owner, media usage consent or an earned backlink.

## Eleven-county first-party Chamber and city research cohort — 2026-11-22

Ten new organization sources cover eleven additional unmapped counties: Ozona/Crockett Chamber; Dalhart Chamber spanning Dallam and Hartley; Quanah/Hardeman Chamber; Perryton/Ochiltree Chamber; Clarksville/Red River County Chamber; Alice/Jim Wells Chamber; Haskell municipal events and Chamber contact; Dimmitt/Castro Chamber; Tulia/Swisher official city Chamber reference; and Floydada/Floyd municipal contact. **Distinguish active event calendars from basic contacts**: Dimmitt Chamber, Tulia city contact and Floydada city site require event-level follow-up, not claims that current festival dates have been verified. Direct organizer and media rights checks are mandatory before publication. County gap count remains an accurate organization/source mapping only.

## Nine more first-party county and Chamber source desks — November 22, 2026

Registered Spur Chamber (Dickens County); Crosbyton Chamber and Visit Crosby County events (Crosby); Franklin County Chamber, Mount Vernon (Franklin); Goldthwaite Area Chamber (Mills); Throckmorton Chamber (Throckmorton); current City of Stamford events (Jones); current City of Munday events (Knox); Albany public festival and Fort Griffin Fandangle calendar (Shackelford); and City of Memphis Chamber contact (Hall). Excluded unrelated **Jones County Chamber (Laurel, Mississippi)**, **Knox County Chamber (not Texas)**, **Stonewall Chamber in Stonewall, Gillespie County (not Stonewall County)**, and **Mitchell County Chamber in another state**. The Memphis City source is a Chamber contact, not a proof of current festival dates. For all source leads, date acceptance and media rights remain with the actual organizer.

## Seven more rural Texas civic/event source desks — 2026-11-22

Added Zapata community event submission calendar, City of Littlefield Chamber and public city-event notices (Lamb), Friona Chamber (Parmer), Daingerfield City official Chamber contact (Morris), Live Oak County official community calendar, City of Bronte community services (Coke), and City of Crane official contact and activity notices. The City of Crane, City of Bronte, and Daingerfield Chamber contact pages are **research desks**, not authoritative dated festival listings. The **Cotulla/La Salle Brush Country Chamber closed in April 2026** and was deliberately not registered as an active entity; select a current municipal tourism office or event-producing association for La Salle instead. The county count shows source mapping only, not verified future events.

## New locally operated first-party Chambers and holiday news — November 22, 2026

Added Oldham County Chamber (Vega Route 66, annual events); Giddings Area Chamber calendar (Lee County, Christmas Market/Lee County festivals); Clarendon Chamber EDC local festival and community news (Donley); Post Chamber (Garza, local holiday events); and Fort Davis Chamber/Visitor Center (Jeff Davis County). The Giddings calendar includes specific 2027 event listings but no next-year claim is promoted without confirming the underlying organizer; Fort Davis Chamber contact is not a guarantee that every upcoming date is confirmed. The source list excludes same-name Chambers for neighboring non-Texas counties. The last 41 originally unmapped low-population counties required primary city/county/fair contacts rather than fabricated Chambers; see current registry-wide metrics above. Some newly registered local contacts still lack explicit public festival calendars.


## November 22, 2026 — source registry and deliverability reconciliation

The current 254-county public-source registry is an **editorial starting directory**, not a complete press-subscription roster. The classification audit now distinguishes 71 first-party public event calendars across 70 counties, 11 event-specific first-party pages, 4 official annual event guides, 31 contact-only desks and 153 unclassified older records. All 254 counties remain mapped to at least one official public contact/source. A Chamber business-events calendar, even when public, is not proof of a full holiday and festival calendar. Dynamic JS-driven official destination bureau calendars count as public research calendars but may still need an accessible feed/manual verification and never count as organizer-verified future event dates. Maintain these distinct totals in the automated issue and never collapse all source contacts into verified community festival calendars. Date-specific events may only enter event/county pages after first-party organizer/municipal verification and rights review; no automatic 2027 rollover.

The protected Microsoft 365 outreach CRM must remain the system of record for recipient and response data. One November 22 Midland Chamber message produced an Outlook delivery rejection (recipient server suspected spam); it has been flagged for deliverability research rather than represented as successfully delivered or re-sent. Four more public, individualized November 22 outreach messages were sent through admin@texasdefined.com to Visit Dallas, Discover Denton, Destination Bryan and the Comanche Chamber; all four were privately entered in the protected CRM. These sends **do not** establish accepted media list subscriptions, media-kit/image permissions, or earned backlinks. No Gmail was used.

Next acceptance gates: retain 254/254 public-source geography, classify and validate actual current public calendars and organizer sources, independently verify upcoming date-specific events, document county ↔ event ↔ permanent-guide crosslinks, repair robots/HTTP source failures without bypass, confirm production release, and track voluntary press-list acceptances and separately verified earned links. Keep checkpoint #7548 open for ongoing work.


## 2026-11-22 official-calendar classification follow-on (county coverage quality)

Verified individual first-party community or Chamber event listings and classified 17 previously unclassified public calendar sources. County/audience evidence is not a promise of a festival listing, and dates require organizer-level confirmation. Newly reviewed public calendar sites:

| County | Official calendar or listings | Evidence / scope |
| --- | --- | --- |
| Henderson | https://athenstxchamber.org/calendar-of-events | Chamber calendar PDF; verify individual current editions |
| Hockley | https://www.levelland.com/events/calendar | Levelland Chamber events calendar, currently sparse; separate city Main Street festivals |
| Erath | https://www.stephenvilletexas.org/events/calendar/ | Public local/Chamber entries, including seasonal community events |
| Panola | https://www.carthagetexasmainstreet.us/calendar | Carthage Main Street dated community events and November holiday activity |
| Navarro | https://www.corsicana.org/events/calendar | Corsicana/Navarro Chamber mixed business/community entries |
| Karnes | https://www.kenedychamber.org/events/ | Chamber listings with December 2026 open house and holiday tour |
| Wichita | https://www.wichitafallschamber.com/events/ | Chamber programming calendar, not comprehensive local festival coverage |
| Hutchinson | https://www.borgerchamber.com/events/ | Borger Chamber year selector/calendar; verify current entries |
| Crockett | https://business.ozona.com/events/calendar | Ozona Chamber public calendar and dated local events |
| Lampasas | https://business.lampasaschamber.org/events/calendar/ | Public mixed community/business Chamber calendar |
| Parker | https://www.weatherford-chamber.com/chamber-events.html | Chamber recurring events and Christmas on the Square listing |
| Lavaca | https://www.hallettsville.com/events-calendar | Dedicated Hallettsville Chamber/community calendar; corrected from Chamber-only listings |
| Madison | https://www.madisonvilletexas.gov/events | Official city announcements include current 2026 fall/holiday event references |
| Ellis | https://business.waxahachiechamber.com/events/calendar | Dated public mixed Chamber and holiday event listings |
| Wilson | https://www.floresvilletx.gov/calendar-events/category/community-events/ | Official municipal community-events calendar |
| Hamilton | https://www.allthingshamilton.org/events | Main Street community calendar with 2026 holiday and 2027 festival postings; verify original producers |
| Llano | https://www.llanochamber.org/-calendar | Chamber/visitor listings with 2026 dated events and ICS links |

**Classification refinement:** Eleven organizer/municipal pages were assigned `event-specific` because a parade or holiday edition alone does **not** establish comprehensive community-calendar coverage. Four first-party annual festival directories were assigned `annual-events-list` because repeating a festival name or month is not evidence of this year's exact dates. These classifications remain discovery-only, never grant photo rights or imply earned links, and must not increment county coverage in the “explicit public calendar” metric. Keep chasing organizer release calendars, actual 2026/27 annual event occurrences and source HTTP/robots remediation.


### Three independently verified tourism calendar fallbacks for previously HTTP-blocked Chamber feeds

- **McLennan County:** Destination Waco, the local tourism office, maintains an active public community/festival calendar at https://destinationwaco.org/events/ (with current entries, category filters, seasonal/holiday filters, and a submission page). Contact desk: https://destinationwaco.org/about-us/contact-us/. This complements, never replaces, the distinct Greater Waco Chamber organization, whose member-calendar fetch can fail in scheduled research.
- **Gillespie County:** Fredericksburg Convention & Visitor Bureau maintains a public festivals/events page at https://www.visitfredericksburgtx.com/events/, including major events, community events and submit-event resources. This may render date listings through JavaScript; do not treat an empty static extract as proof no event exists. Contact desk: https://www.visitfredericksburgtx.com/partners/contact/.
- **Webb County:** Visit Laredo's city convention and visitors bureau has a dated public community calendar at https://visitlaredo.com/events/ with separate annual festival and submission resources; contact via https://visitlaredo.com/cvb-staff/.

These are three **new** first-party organizations with independent calendars, not aliases for Chambers and not proof any Chamber joined the media list. Total registered first-party sources now **273 / 254 counties** (multiple organizations may serve one county). Directly reviewed classified calendars: **74 sources covering 73 counties**. The **181** other counties need direct calendar review, though many already have event-specific evidence, municipal source contacts or published event records elsewhere. Keep 2026/27 edition dates and media permission subject to organizer confirmation.

### November 22, 2026 — verified additions to the live calendar source catalog

Two organizer-dated, current-edition occurrences were added to the existing governed `src/data/events/christmas-community-2026-county-backfill.server.ts` rather than creating thin event doorway articles:

- **Hamilton County / Hamilton Christmas on the Square — A Gingerbread Christmas:** Saturday **November 28, 2026, 3–8 p.m.**, historic downtown Hamilton. Official event page: https://www.allthingshamilton.org/events/christmas-on-the-square-1 . Organizer Hamilton Chamber of Commerce; Hamilton Main Street supports the children's section. Shopping, gingerbread house contest, tree lighting and Santa photos are described as current 2026 programming, not annual guaranteed features.
- **Karnes County / Kenedy Holiday Tour of Homes (11th):** Thursday **December 17, 2026, 6–9:30 p.m.** Official Chamber source: https://www.kenedychamber.org/event/11th-annual-holiday-tour-of-homes/ . The Kenedy Chamber at 205 S 2nd St is the page's listed venue; individual private-home addresses, entry fees, tickets and routes are **unconfirmed** and must not be inferred from the Chamber venue listing.

Both records carry individual `sourceVerifiedAt: 2026-11-22`, canonical county attribution, source hyperlinks and 2026-only occurrence dates; new regression tests enforce dates, organizer domains, source safety and existing county-calendar crosslinks. No 2027 dates or image rights are presumed. Verify publication on a post-merge production deployment and confirm the county/Christmas hub links resolve, not just that the release gate passes.


### 2026-11-22 continuation — resilient municipal/tourism fallback cohort and Gray County event publication

After the initial 273-source, 73-county live-calendar cohort, add these independent source URLs (first-party public sources, **not** guaranteed current festival editions or media consents): City of Gainesville municipal community calendar https://www.gainesville.tx.us/329/Events-in-Gainesville (Cooke); Visit Granbury https://www.visitgranbury.com/events/ (Hood); Visit New Braunfels https://www.visitnbtx.com/events (Comal); Discover Bastrop https://www.discoverbastroptx.org/events/ (Bastrop). The existing Pampa Chamber community-events source is classified as a real public community calendar and pointed at https://business.pampachamber.com/events, which directly lists dated holiday entries and is a public alternative to the original HTTP-error monitoring URL.

City of Orange CVB https://orangetexas.gov/165/Events and Visit McAllen https://visitmcallen.com/events/ are **annual-events-list** sources, rather than full dated community calendars; they offer festival/holiday organizer discovery but must not inflate full live-calendar coverage. The original Chamber source records remain present; no robots disallow is bypassed.

The Pampa Chamber, acting as organizer for the downtown parade, confirms two **separate** events: **Christmas on the Bricks** Friday December 11, 2026, 5–9 p.m., 100 block North Cuyler Street (https://business.pampachamber.com/events/Details/christmas-on-the-bricks-1927768?sourceTypeId=Website) and **Cowboy Christmas Parade of Lights** Saturday December 12, 2026, 6–8 p.m., downtown Somerville/Francis/Cuyler route (https://business.pampachamber.com/events/Details/cowboy-christmas-parade-1712334?sourceTypeId=Website). Both use dated first-party sources and separate 2026 canonical county-calendar records, with no guessed ticket fees, unrelated float staging presented as spectator guidance, copied photographs or 2027 rollover. This adds Gray County to the verified Christmas event roster. Compare with any other December events; don't collapse into one fabricated multi-day festival.

Current staged registry: **279** reviewed public source/contact records across 254 Texas counties: **79** first-party public calendar records across **77** counties; **11** specific-event pages; **6** annual-festival directory sources; **31** contact-only sources; **152** older unclassified sources. **177** counties still lack an explicitly reviewed active public calendar, and that number is distinct from missing 2026 holiday events or missing opt-in media relationships. The daily source-audit must check access honestly and leave robot-blocked records for manual review.

### November 22, 2026 — eight additional primary calendars, one annual festival list

The next official-source verification cohort checked actual public event listings instead of equating a homepage or event-title with a full calendar. Eight existing first-party sources were promoted to `public-calendar` after current 2026/2027 entries were visible:

- Andrews Chamber community calendar https://business.andrewstx.com/events/calendar/ — Andrews County; includes 2026 Jamaica Family Fest and Safe Spot
- Bee County Chamber https://members.experiencebeecounty.org/events/calendar — Bee County; dated 2026 community market events
- Calhoun County/Port Lavaca public events calendar https://portlavacaevents.com/events/ — Calhoun; 2026 and 2027 entries and submit-event workflow
- Discover Lockhart https://discoverlockharttx.org/events — Caldwell; dated 2026 event feed and first-party submit-event workflow
- Brownsville Chamber https://business.brownsvillechamber.com/events/calendar — Cameron; holiday marketplace and local business calendar
- Bowie Chamber https://bowietxchamber.org/events/ — Montague; December 2026 Merry Christmas Sip & Stroll and Second Monday market listings
- Clifton Chamber https://cliftontexas.org/community-calendar/ — Bosque; active 2026 community-calendar entries and December Norwegian Country Christmas
- Columbus Chamber https://business.columbustexas.org/events/calendar — Colorado; current community and civic events

**Hemphill/Canadian:** https://www.canadiantx.com/events was categorized as `annual-events-list`, not a current full county calendar. It gives specific 2026 dates for the Canadian River Music Festival and Fall Foliage Festival but combines them with stale 2025 TBD entries and December seasonal descriptions without exact daily dates. It is useful first-party original-research evidence but must not be presented as full verified festival/calendar coverage or relied on for future dates.

The full staged registry is 279 public source records across 254 counties. Dated public calendar-source classification is now **87 records covering 84 counties**; annual festival directories 7, single-event pages 11, contact-only records 31, and unclassified records 143. **170 counties** remain without an explicitly reviewed current public community-calendar source (these are not necessarily counties without any currently indexed upcoming event). Annual brochures, library programming-only feeds and Chamber homepages are treated separately. Event dates, image rights, opted-in media lists and earned backlinks remain subject to their own evidence.


## Nov 22, 2026 — latest 91-county classified calendar and eight added date-specific holiday occurrences

The first-party registry currently has 279 records touching all 254 counties. By separately confirmed role: **94 public calendar sources in 91 counties**, **11 single-event sources**, **8 annual festival directories**, **31 contact-only desks**, and **135 unclassified older records**. **163 counties have no classified current public community calendar**, which is not the same as having no Chamber contact or no existing Christmas event page. This supersedes the earlier interim totals above, not the conservative organizer/date verification policy.

Additional live first-party public calendars individually checked for 2026 events include Brownsville Chamber https://business.brownsvillechamber.com/events/calendar (Cameron), Monahans Chamber https://www.monahans.org/events (Ward), Rockwall Chamber https://business.rockwallchamber.org/events/calendar (Rockwall), Sonora Chamber https://sonoratexas.org/events/ (Sutton), Terrell Chamber https://business.terrelltexas.com/events/calendar (Kaufman), Victoria Chamber https://business.victoriachamber.org/events (Victoria), Greenville Chamber https://business.greenvillechamber.com/events/calendar (Hunt), and Visit San Augustine https://visitsanaugustinetx.org/event/ (San Augustine). Coleman County Chamber https://www.colemancountytexas.com/events-2/ is an **annual-events-list**, as the page still labels several entries 2025; publication cannot treat them as confirmed current dates. Distinguish annual directories, town-specific archives, and Chamber member-only events from complete community festival calendars.

**New exact-2026 calendar editions beyond the two already committed through #7593:**

- **Gray/Pampa:** Christmas on the Bricks Friday Dec 11, 2026, 5–9 p.m. (Chamber official https://business.pampachamber.com/events/Details/christmas-on-the-bricks-1927768?sourceTypeId=Website) and separate Cowboy Christmas Parade of Lights Saturday Dec 12, 6–8 p.m. (https://business.pampachamber.com/events/Details/cowboy-christmas-parade-1712334?sourceTypeId=Website).
- **Erath/Stephenville:** ChristmasVille Nov 28, 2026, https://www.stephenvilletexas.org/events/details/christmasville-downtown-festivities-santa-music-lighted-parade-shopping-75928 and the separate Holly Jolly Christmas Dec 7, 2026, https://www.stephenvilletexas.org/events/details/holly-jolly-christmas-2026-77044.
- **Wichita/Wichita Falls:** City Lights Parade Dec 5, 2026, source https://wfcitylights.com/citylights-floats. Staging instructions are for participants; don't turn them into spectator hours.
- **Panola/Carthage:** Panola College Christmas in Carthage performance Dec 1, 2026, source https://www.panola.edu/about/news/2026-panola-college-host-annual-christmas-carthage-event-dec-1. Do not label this as the city parade.
- **San Augustine/San Augustine:** Christmas Market Days **Dec 4–5, 2026** https://visitsanaugustinetx.org/event/christmas-market-days-2026/; separate Main Street Christmas Parade **Dec 4 at 6 p.m.** https://visitsanaugustinetx.org/event/2026-christmas-parade/ . The public city/Chamber/Main Street joint visitor calendar https://visitsanaugustinetx.org/events/ also has the dates and confirms this organizer.

These eight distinct 2026 holiday records are appended to the established county Christmas calendar with exact county tags, first-party event URLs and source-reviewed date metadata. Their publication needs protected validation and public production recheck. Never infer next year's dates. **2027 San Augustine Heritage Days** has a separately confirmed official May 7–8 listing https://visitsanaugustinetx.org/event/2027-heritage-days/ and belongs to the general festival authority/event review queue (not 2026 Christmas); the organizer's source text has an internal weekday/date typo, so take the explicit May 7–8 range with editorial caution and verify before publishing full hourly itinerary.

On-source HTTP/robots errors remain human-review tasks. A public business-events feed does not mean all county holidays are covered. A positive sender or organizer reply does not alone grant images, opt-in, or backlinks. Outlook-only outreach remains separated from GitHub; no Gmail.


## 2026-11-22 — 111-county calendar evidence cohort and twelve new holiday editions

This batch follows the 279 registered contact/source desk and 91 classified-calendar-county release. The **latest reviewed source registry has 284 organizations/pages covering all 254 counties**, of which 116 sources are classified as current public calendars spanning **111 counties**; **143 counties** still lack an explicitly classified full current calendar. Other records: 12 source pages devoted to individual events, 9 annual festival/event directories, 32 contact-only desks and 115 older unclassified source links. These categories never imply accepted press distribution, image rights or earned Chamber backlinks.

Ten local business/Chamber full calendars newly researched across Burnet, Marion/Jefferson, Kendall/Boerne, Titus/Mount Pleasant, Somervell/Glen Rose, Young/Graham, Wilbarger/Vernon, Hale/Plainview, Gaines/Seminole and Lee/Giddings have current community events; another eight confirmed public calendars cover Polk/Livingston, Maverick/Eagle Pass, Scurry/Snyder, DeWitt/Cuero, Pecos/Fort Stockton, Jackson/Edna, Liberty/Trinity Valley and Mason. The Silsbee/Hardin static guide is an `annual-events-list` (not current complete schedule); the Willacy/Raymondville Chamber site remains `contact-only`. Across urban/rural sources, four independent current city/community calendars are maintained for Fort Bend/Sugar Land https://visitsugarlandtx.com/events/calendar, Grayson/Denison https://discoverdenison.com/events/, Bowie/Texarkana GoTXK https://gotxk.org/calendar/, and Reeves/Pecos City https://www.pecostx.gov/Calendar.aspx; explicit out-of-state Texarkana venues must be filtered out of Bowie County, Texas event attribution. The City of Alvin's 2026 Home for the Holidays page https://www.alvin.gov/m/newsflash/Home/Detail/193 is an `event-specific` source, not a full Brazoria County live calendar.

**Additional first-party verified 2026 date-specific local holiday occurrences** (beyond the eight from the prior source cohort) in the existing governed county/Christmas calendar:

- Marion: Jefferson Christmas Parade/Enchanted Forest, **Nov 28** at 6 p.m., Chamber https://www.jeffersontxchamber.org/christmas
- Lee: Giddings downtown Holiday Festival/Christmas Market, **Nov 28**, 11 a.m.–8 p.m., https://business.giddingstx.com/event-calendar/Details/downtown-giddings-holiday-festival-and-christmas-market-1905829?sourceTypeId=Website; separate Bright Lights & Christmas Delights Parade, **Nov 28** evening, https://business.giddingstx.com/event-calendar/Details/bright-lights-and-christmas-delights-1675336?sourceTypeId=Website
- Sutton: Sonora **Texas** Downtown Christmas/Lighted Parade, **Dec 2** (start time not confirmed in primary public calendar) https://sonoratexas.org/events/. Different from Sonora, California's Christmas parade; do not mix dates
- Brazoria: Alvin Home for the Holidays multi-venue city festival and light parade, **Dec 4–5**, https://www.alvin.gov/m/newsflash/Home/Detail/193. Day-by-day organizer program separates Friday's contests from Saturday's parade and park events; do not invent overnight opening hours
- Somervell: Glen Rose Hometown Christmas Parade & Market, **Nov 28**, market 3 p.m. and parade 5:30 p.m., https://business.glenrosechamber.org/calendar/Details/hometown-christmas-parade-market-2006043?sourceTypeId=Hub; **separate** Storybook Christmas Tour of Homes, **Dec 12, 6–9 p.m.**, https://business.glenrosechamber.org/calendar/Details/storybook-christmas-tour-of-homes-1922816?sourceTypeId=Website (organizer lists $35 general tickets; VIP sold out when checked, but status may change). No speculative private home locations or tickets.

None of these event dates are rolled forward automatically to 2027. Holiday pages and calendar return only source-dated occurrence windows, and attribution uses existing canonical county crosslinks. The daily source audit remains a robots/terms-respecting **research** workflow, not an unattended event publication system.

## Source classification and holiday occurrence review — November 22, 2026 (cohort N)

The staged official-source directory now has **284 registered first-party organizations/event source pages covering all 254 Texas counties**. Of those, **127** are classified public community calendars spanning **122** counties, leaving **132** without directly classified calendar evidence (not necessarily without holiday coverage). Other roles: **19 event-specific**, **12 annual-events-list**, **34 contact-only**, **92 unclassified**; no automated conversion from discovery source to a dated event is permitted.

Eleven more dated public source calendars reviewed and classified:
- Plantersville municipal community calendar (Grimes) https://cityofplantersville.net/community-calendar-events-1
- Visit Goliad (Goliad) https://www.visitgoliad.com/event-list
- Bonham Chamber (Fannin) https://bonhamchamber.com/events/
- Visit Seguin (Guadalupe) https://visitseguin.com/events/
- Hearne Chamber (Robertson) https://hearnechamber.com/community-calendar/
- Goldthwaite Chamber (Mills) https://www.goldthwaiteareachamber.com/events
- Stamford city public events (Jones) https://www.stamfordtexas.gov/events-calendar
- Denver City Chamber (Yoakum) https://denvercitychamber.com/events/
- Mount Vernon/Franklin County (Franklin) https://www.franklincountytx.com/events
- Crosby County visitor events (Crosby) https://visitcrosbycounty.com/events/
- Hereford Chamber (Deaf Smith) https://www.herefordtx.org/event-calendar.html

Seven previously unclassified source pages describe only **one particular event**, not full county schedules (Gainesville parade, Uvalde Christmas at the Crossroads, Athens Christmas, Mont Belvieu Christmas parade, Elmendorf Christmas, Eastland parade, Bowie parade). Shelby Chamber parade listing, Oldham Chamber recurring activities and Perryton annual event directory are **annual-events-list** source leads, not date-complete current calendars. Claude/Armstrong Chamber and Poteet municipal notices are **contact-only** source entries; never count them as active public holiday calendars.

Four more distinct, organizer-verified 2026 events were appended to the existing county + statewide Christmas event lifecycle:
- Goldthwaite Sip, Stroll & Shop, **December 5, 2026, 2–6 p.m.** (Mills); official organizer https://www.goldthwaiteareachamber.com/events/goldthwaite-sip-stroll-and-shop. The Chamber separately advertises a 6 p.m. parade and evening dance. Ticket price and admission rights for individual activities require direct checking.
- Hearne Annual Downtown Christmas Parade, **December 12, 2026** (Robertson); Chamber https://hearnechamber.com/community-calendar/ explicitly says **start time to be announced**. Do not invent the time.
- Plantersville Annual Christmas Parade, **December 5, 2026, 10 a.m.** (Grimes), route from Town Hall along FM 1774 to Highway 105; https://cityofplantersville.net/community-calendar-events-1. Participant 9:30 a.m. staging is not a visitor arrival requirement.
- Bonham Home for the Holidays Christmas Market, **December 5, 2026, 9 a.m.–4 p.m.** (Fannin), Stay Grounded Coffee Cafe, 604 N Center Street; https://bonhamchamber.com/event/annual-christmas-market/. Separate from December 4 parade and Hot Cocoa Hop.

These four new records have first-party organizer URLs, precise county affiliations, source-reviewed 2026 dates, conservative descriptive summaries and regression tests. They are added to the existing holiday record backfill, not standalone thin articles, and cannot be automatically rolled into the 2027 calendar without an actual official announcement. Statewide registry remains a **research system**, not a licensed photograph ingest, spam contact list or reciprocal-link exchange.

## Five directly confirmed official dated calendar feeds — November 22, 2026 (cohort O)

The source registry still has **284 public first-party organization or event desk sources across all 254 Texas counties**. It now has **132 classified live public calendars spanning 127 counties**, leaving **127 county calendar classification gaps**. The other sources are **19 event-specific**, **13 annual-events-list**, **34 contact-only**, **86 unclassified**. This count is a discovery taxonomy, not a guarantee each county has a complete holiday calendar.

The following five websites were independently re-opened and verified to expose actual current dated public event listings or publicly navigable calendars. Use them for review under publisher terms; verify every event directly against organizer dates before automatic publication:

- **Fayette / La Grange Area Chamber** — https://business.lagrangetx.org/events : dated calendar through 2027, event titles, categories and a public event-submission option.
- **Val Verde / Del Rio Chamber** — https://business.exploredelrio.com/event-calendar : public dated Chamber/community calendar (small number of future results; a Chamber member event is not proof of all Del Rio festivals). Original footer lists frontdesk@drchamber.com as its public contact.
- **Johnson / Cleburne Chamber** — https://business.cleburnechamber.com/events/calendar/ : searchable public community events, arts, festivals, and submit-event links.
- **San Patricio / Portland Chamber** — https://business.portlandtx.org/events/calendar : community dates/categories and event submission, public contact admin@portlandtx.org.
- **Kleberg / Visit Kingsville** — https://kingsvilletexas.com/events/ : official visitor bureau public calendar with future events, a public submission function and individual organizers.

The existing Odessa Chamber source at https://odessachamber.com/events/ is **annual-events-list**, because it describes annual Chamber programs without a complete dated public events list. Its separately linked GrowthZone live calendar at https://cca.odessachamber.com/EvtListingMainSearch.aspx?class=B returned HTTP 403 in public research. Do not bypass the source owner's access controls or represent a 403-blocked feed as a confirmed live community calendar. For Ector County festival research, independently identify public city/visitor bureau/organizer schedules.

No new event record is released based on a Chamber search result alone; the prior first-party verified 2026 holiday dates remain unchanged in this cohort. Recurring 2027 dates and photo use require affirmative source and rights evidence.
