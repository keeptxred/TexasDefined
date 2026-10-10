# Eleven-city authority: independent source checks — 2026-10-10

**Scope:** Houston, Dallas, Fort Worth, Austin, San Antonio, El Paso, Arlington, Hurst, Corpus Christi, Plano, Lubbock.  
**Status:** Partial source verification only. This document is not a declaration of full factual QA or WCAG acceptance.

## Evidence policy

Records below are comparisons to independently retrieved *official operator, agency, or Texas government* pages on October 10, 2026. PASS means only the specific stated claim was confirmed, not that all descriptions, photographs, accessibility, hours, prices, districts, tax boundaries, or links for that city passed. Recheck change-sensitive visitor information before travel. Published city-page values are from `src/data/city-authority-profiles.ts`. The prior census and transport evidence remains in `FINAL_BROWSER_AND_FACTUAL_QA_2026-10-09.md`.

## Featured destination claims

| City | Published claim / destination | Independent official evidence | Result | Scope / correction |
|---|---|---|---|---|
| Houston | Space Center Houston is a Houston-area NASA visitor destination | https://spacecenter.org/contact/ (1601 E NASA Parkway, Houston 77058) | PASS | Address and operation confirmed; full itinerary not tested |
| Houston | Houston Zoo is a family destination around Hermann Park | https://www.houstonzoo.org/plan-your-visit/ (6200 Hermann Park Drive) | PASS | Nonmembers require timed online tickets; current ticket operations should be checked before travel |
| Dallas | Sixth Floor Museum at Dealey Plaza | https://www.jfk.org/plan-your-visit/visitation-guidelines/ | PASS | Open Wed-Sun per museum; tickets timed; not a blanket seven-day opening claim |
| Fort Worth | Kimbell Art Museum in the Cultural District | https://kimbellart.org/visit | PASS | Permanent collection free; Mondays closed; special exhibitions separately ticketed |
| Fort Worth | Fort Worth Zoo operates as a family visitor attraction | https://www.fortworthzoo.org/plan-a-visit | PASS | Visitor operation confirmed; ticket rates/hours intentionally not hard-coded into city page |
| San Antonio | The Alamo historic site is an active visitor attraction | https://www.thealamo.org/visit | PASS | Free church entry requires a reservation |
| San Antonio | San Antonio River Walk is a pedestrian visitor district | https://www.thesanantonioriverwalk.com/plan-your-trip/faqs/ | PASS | Free-to-enter public walkway; paid tours/boats separate |
| El Paso | Franklin Mountains State Park has visitor access in El Paso | https://tpwd.texas.gov/state-parks/franklin-mountains | PASS | Active alerts and capacity/reservation caveats apply |
| El Paso | Ysleta del Sur Pueblo Cultural Center Museum | https://www.ysletadelsurpueblo.org/tourism-hospitality/cultural-center/museum ; https://atlas.thc.texas.gov/details/4200001263 | PASS | Tribal operator and THC confirm museum and Wed-Sun hours; verified museum address 305 Yaya Lane |
| Arlington | AT&T Stadium is a current event and touring venue | https://attstadium.com/tours/ | PASS | Individual tours/field access depend on calendar and availability |
| Corpus Christi | Texas State Aquarium is active at North Beach | https://www.texasstateaquarium.org/plan-your-visit/visitor-information/map-directions/ | PASS | 2710 N Shoreline Blvd confirmed; special hours and exhibits change |

**Important distinction:** The Alamo's *planned new Museum and Visitor Center* is scheduled for **spring 2028**, not presently open. This is distinct from the historic Alamo church, grounds, and current Ralston Family Collections Center, which are operating. Official: https://www.thealamo.org/support/alamo-visitor-center-museum . Do not conflate current and future visitor facilities.

The following featured destinations have **not** received the full independent operator-source audit in this record: Dallas World Aquarium, the State Fair of Texas, Fort Worth Stockyards, Dickies Arena, Texas State Capitol, Blanton Museum of Art, Globe Life Field, WhirlyBall Hurst, USS Lexington, Silent Wings Museum, and all remaining link-by-link food or guide recommendations. No PASS is implied for them.

## Updated transportation claims

| City | Claim | Official source | Result | Notes |
|---|---|---|---|---|
| Arlington | On-demand rides connect to CentrePort TRE, not fixed rail throughout the city | https://www.arlingtontx.gov/City-Services/Transportation-Streets-Traffic/Arlington-On-Demand | PASS | No published citywide stadium rail service may be inferred |
| Plano | DART operates on-demand GoLink and expanded service October 5, 2026 | https://prod.dart.org/about/news-and-events/newsreleases/newsrelease-detail/dart-announces-expanded-golink-service-in-plano-to-provide-riders-with-greater-access-and-connectivity | PASS | New Southwest Plano zone; older blanket bus/rail coverage statements must not imply rail to each neighborhood |
| Lubbock | Citibus redesigned portions of network effective September 28, 2026 | https://citibus.com/ | PASS | Avoid publishing pre-redesign route numbers |
| Houston | City GIS distinguishes municipal limits, ETJ, county boundaries | https://mycity2.houstontx.gov/gisweb01/rest/services/HoustonMap/Administrative_Boundary/MapServer | SOURCE CONFIRMED, GEOMETRY UNVERIFIED | GIS layer availability does not itself prove every county intersection |
| San Antonio | City GIS publishes separate city-limits and ETJ geography | https://www.sanantonio.gov/Portals/0/Files/GIS/Maps/SAETJ%20CCD%202026%2054x58.pdf | SOURCE CONFIRMED, GEOMETRY UNVERIFIED | Map is not a legal parcel-level boundary determination |

## Browser regression and known production correction

- PR #4519 fixed two obsolete `/destination/kimbell-art-museum` Fort Worth links to `/destination/kimbell-art-museum-fort-worth`.
- PR #4581 introduced automated real-Chrome verification of both city links plus destination HTTP 200. The Fort Worth Kimbell assertions passed on the subsequent 33-viewport post-deployment run, independently supported by direct live city-page navigation to the canonical destination.
- Run #38076892375 reported **imageAlternatives FAIL on all 33 city/viewport combinations** because the runner required every `img` to have a *nonempty* alt value. Explicit `alt=""` is allowed for decorative imagery under accessibility conventions. PR #4587 changes the assertion to require a present alt attribute, recording the number of intentionally empty alternatives and URLs of truly missing attributes. This narrower automated check is **not a full image-semantic or WCAG audit**.
- The post-deploy Chrome result must not be recorded as 33/33 overall passing until the corrected semantic test passes its own CI and production run.

## Acceptance still outstanding

Complete all 11 city municipal boundary overlays; audit unreviewed featured destinations, food venues, school/tax/utility claims and official link targets; inspect browser screenshots and keyboard/contrast/touch behavior across all requested viewports; retain artifacts. Do not advance the global city factual review date or mark 11/11 fully certified without that evidence.
