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

**Source-mapped: 63 / 254 counties (62 reviewed public Chamber, tourism and regional source organizations). Remaining: 191 counties requiring source research as of November 22, 2026.**

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


## Third research expansion — 2026-11-22

Additional source-led county coverage includes Andrews, Bandera, Bee, Blanco, Brown, Burleson, Calhoun, Caldwell, Cameron, Camp, Callahan, Baylor, Montague (the city of Bowie, **not** Bowie County), Briscoe, Hemphill and Atascosa. References are to first-party Chambers or official city/county visitor sources; some provide detailed calendars while others are research contacts or incomplete event indexes. Verify a current organizer and specific event date before publishing any page/structured-data update. No mailing-list subscriptions or backlinks are inferred from these sources.
