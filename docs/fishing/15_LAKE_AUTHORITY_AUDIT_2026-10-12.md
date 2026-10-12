# TexasDefined — 15-lake authority audit

**Reviewed:** 2026-10-12  
**Scope:** Lake Amistad, Lake O' the Pines, Whitney, Brownwood, Palestine, Ray Roberts, Lewisville, Grapevine, Joe Pool, Lavon, Arrowhead, Colorado City, Stamford, Sweetwater and Meredith.  
**Repository baseline:** `keeptxred/TexasDefined` main as of October 12, then feature branch `feature/stamford-sweetwater-lake-authority-20261012`.  
**Release status:** Branch audit and implementation; **NOT a production acceptance certificate**. This document does not claim passing browser tests or fresh photography on all 15 pages.

## Method and verification standard

1. Inspected canonical complete-lake registry, the 35-lake statewide generator (expanded to 37 on this branch), wave-2/expanded showcase data, SSR routes, nine-page layout, image library, source footer, sitemap, and automated validation/monitoring scripts.
2. Retrieved the official TPWD fishing profiles for all 15 lakes on October 12, including lake characteristics, fishery ratings, restrictions and alerts. Primary source: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/{tpwd-id}/`.
3. Checked TPWD access inventories and controlling-agency information for Stamford and Sweetwater, Texas Water Development Board reservoir histories and October 12 gauge pages, and official City of Sweetwater visitor information.
4. Inspected the Lake Whitney production HTML; several other live-site fetches were blocked/unavailable to the remote reader. Accordingly, rendered/mobile/manual accessibility/production-check claims are not made for those pages.
5. Audited *code presence* separately from *source verification*, *actual operating status*, *image provenance* and *independent editorial depth*. A working overview and eight intent sections is not alone proof of highest-in-market authority.

## Lake-by-lake findings and disposition

| Lake | Canonical slug | Core TPWD facts and fishing | Visitor/ramps/camping | Map and imagery | History and remaining authority work |
|---|---|---|---|---|---|
| Amistad | `amistad-reservoir` | Established expanded guide; TPWD confirms 64,900 acres, 217 ft depth and Texas/Mexico regulation distinction | Confirm current NPS recreation-area ramps, campground details and low-water access | Shared embedded map and actual-lake photo mapping | Improve NPS-specific planning, cross-border permits, invasive mussel notice, timeline |
| O' the Pines | `lake-o-the-pines` | TPWD profile cross-checked; special Big Cypress Bayou/Caddo live-bait transport rule flagged | Generic access inventory despite USACE/county/private facilities | Exact-site mapped image; generic map embed | Add named ramps, fees, park sites and dam/USACE history |
| Whitney | `lake-whitney` | TPWD agrees on 23,500 acres, 108 ft, 1951; live production HTML checked | Wave-2 guide; audit individual launch and camping entries against USACE/TPWD | Image provenance/credit visible in inspected live HTML | Add reservoir history and **TPWD golden-alga potential** notice in prominent planning context |
| Brownwood | `lake-brownwood` | TPWD agrees on 6,490 acres, 95 ft, 1933 | Shared generator has general access summary; state park linked | Image library maps exact lake; embedded map | Add named ramps, park accommodation details and historical reservoir context; zebra-mussel notice added |
| Palestine | `lake-palestine` | TPWD agrees on 25,560 acres, 58 ft, 1962; special rules in place | Existing record says 5 public launches but not named individually; private camping inventory not curated | Exact-lake image mapping and map embed | Add named marinas/ramps, operator links, waterfront recreation and history |
| Ray Roberts | `ray-roberts-lake` | TPWD agrees on 25,600 acres, 106 ft, 1987 | General state-park and satellite-park access, not facility-by-facility | Governed photo override and map | Split Isle du Bois/Johnson Branch/day-use access and add history; zebra-mussel notice added |
| Lewisville | `lewisville-lake` | TPWD agrees on 29,592 acres, 67 ft, 1954; special regulations | Generic USACE/municipal access and no individually curated campground | Source-mapped photo and map | Add named operators, closures, flood operations, historical context |
| Grapevine | `grapevine-lake` | TPWD agrees on 6,684 acres, 65 ft, 1952; special regulations | Generic municipal/USACE ramp summary; **TPWD reports some access areas closed** | Source-mapped photo and map | Add ramp-by-ramp closure links, history; zebra-mussel/access notice added |
| Joe Pool | `joe-pool-lake` | TPWD agrees on 6,469 acres, 75 ft, 1986; special regulations | Mentions Cedar Hill and Grand Prairie; ramps and campground need site-specific details | USACE image provenance and embed | Build state/city park comparison, recreation and dam history |
| Lavon | `lake-lavon` | TPWD agrees on 21,400 acres, 59 ft, 1953 with enlargement 1974; catfish special rule | Generic USACE access, no individually verified campground guide | Mapped lake photo and embed | Add ramp status/USACE park breakdown and 1974 enlargement history; zebra-mussel and catfish notices added |
| Arrowhead | `lake-arrowhead` | TPWD agrees on 14,969 acres, 45 ft, 1966; excellent crappie/catfish | State-park option but general access inventory | Accurate lake-photo mapping and embed | Add specifics for state-park boat access, accessible fishing, camping, and Wichita Falls water-supply history |
| Colorado City | `lake-colorado-city` | TPWD agrees on 1,618 acres, 51 ft, 1949; correctly notes poor fishery and golden-alga recovery | State park and Cooper's Cove mentioned, but no facility-by-facility verification | Photo/embedded map | Prioritize current park operations and fishing conditions rather than promotional fishing claims |
| Stamford | `lake-stamford` | **New:** TPWD 5,124 acres, 36 ft, 1953; five species ratings including excellent crappie; TWDB live gauge | **New:** named Stamford Marina and Anchor Marina, access roads, ramps, parking, park camping and low-water caveat | Map through established template; Commons June 2007 site photo provisionally mapped; **original uploader Logann1 and CC BY-SA 3.0 verified against Commons file detail; image depicts 2007 full-pool conditions, not current water** | TWDB-backed dam timeline, public water-supply purpose and source links added; operator status remains day-of-trip |
| Sweetwater | `lake-sweetwater` | **New:** TPWD 630 acres, 45 ft, 1930; four currently poor fisheries, persistent golden-alga warning; TWDB live gauge | **New:** named city ramp and park, road/fee details, municipal visitor link, campsite/golf/CCC heritage context. Directions on TPWD and city sources differ; transparently disclosed | Embedded lake map, authentic CC BY 4.0 photograph of historic park bench (NOT presented as a lake-water image) | TWDB/CCC history added; **very low water requires same-day city ramp/access confirmation** |
| Meredith | `lake-meredith` | TPWD agrees on 16,411 acres, 127 ft, 1965; walleye is preserved as defining species | NPS visitor/campground inventory is generic rather than park-unit specific | Exact NPS lake photo and map | Add NPS ramp-by-ramp, hiking and Alibates planning, history and **current fish-consumption advisory** (flag added) |

### Sources for first-pass independent comparison

- TPWD lake profiles: `amistad`, `lop`, `whitney`, `brownwood`, `palestine`, `ray_roberts`, `lewisville`, `grapevine`, `joe_pool`, `lavon`, `arrowhead`, `colorado_city`, `stamford`, `sweetwater`, `meredith` beneath `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/`.
- TPWD Stamford: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/` and `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/stamford/access.phtml`.
- TPWD Sweetwater: `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/` and `https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sweetwater/access.phtml`.
- TWDB reservoir histories: `https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/stamford/index.asp` and `https://www.twdb.texas.gov/surfacewater/rivers/reservoirs/sweetwater/index.asp`.
- Current gauge sources: `https://waterdatafortexas.org/reservoirs/individual/stamford` and `https://waterdatafortexas.org/reservoirs/individual/sweetwater`. As of Oct. 12, TWDB listed Stamford at **61.4% full** and Sweetwater at **16.4% full**; these are **audit snapshots only** and intentionally not frozen into site copy.
- Municipality: `https://www.sweetwatertx.gov/159/Visit-Sweetwater`; verified details include Lake Sweetwater park and camping, golf and visitor planning.
- Historical context: `https://www.tshaonline.org/handbook/entries/lake-stamford`; `https://www.tshaonline.org/handbook/entries/lake-sweetwater`.
- Photograph source: `https://commons.wikimedia.org/wiki/File:Lake_Sweetwater_Rec_Area_Rock_Bench.jpg` (Larry D. Moore, CC BY 4.0); Stamford Commons file `Lake Stamford June 2007.jpg` identified in Commons Lake Stamford category; individual file verified on Wikimedia Commons: uploader **Logann1**, original photograph, CC BY-SA 3.0, 2453×1839, 22 June 2007.

## Scope analysis by requested dimension

- **Fishing:** all 15 have dedicated fishery data and linked TPWD sources. TPWD ratings now clearly distinguish poor Sweetwater/Colorado City fisheries, rather than marketing them as excellent. Current regulations must always remain linked.
- **Recreation:** generalized boating and angling material exists for 13 established lakes. Owner/park-specific water-sports, walking, wildlife, accessible facilities and seasonal restrictions are not thoroughly inventoried lake by lake.
- **Camping:** existing template displays available campground details or directs readers to TPWD; that is *not* the same as independently verified campground inventory, live vacancies, rates or direct reservations. Stamford/Sweetwater new records add specific municipal camp locations.
- **Access:** 11 statewide-lake entries previously used only one generic access inventory object. Two new lakes now list actual named public access points; facility-by-facility remediations remain outstanding for the 11. Amistad and Whitney are on their own richer waves and require individual checks.
- **Maps:** the shared template has a Google Maps embed and outbound map search. It is not a custom, verified ramp-pin map or current navigation chart. Do not call it a complete bathymetric or boat-navigation map.
- **History:** most established statewide records have an impoundment year but lack sourced local timelines. Stamford/Sweetwater now have distinct TWDB-backed history in the on-page identity and footer.
- **Original imagery:** all 15 have code mappings to photo assets depicting the named lake or its authentic recreation area, with rights/credit metadata. This is licensed documentary material, **not** a claim of newly commissioned TexasDefined photography. Audit all file rights, alt text, actual-location correctness and rendered load before release. Stamford Commons file license, original uploader and dates verified; photo is explicitly a historic 2007 full-pool view.
- **Source verification:** TPWD primary facts matched for all 15 in the published lake fields. Fee, access and park operations require direct operator confirmation; water percentages are time-sensitive and should be fetched rather than frozen.
- **Visitor planning:** official ramp/check links and TWDB gauges are useful, but facility details, travel seasons, ADA access, pets, concessions, reservations, parking and bad-weather contingencies need further verification to surpass agency guides.

## Release / follow-up decisions

1. **Do not assert new pages are deployed** before merge and production probes. Inspect 200 response, SSR content, canonical tags, sitemap, eight section routes, JSON-LD, imagery, mobile interaction, accessibility, and actual gauge data for both after deploy.
2. **Photo QA:** the Stamford source image and CC BY-SA 3.0 license are verified against the [Wikimedia Commons file](https://commons.wikimedia.org/wiki/File:Lake_Stamford_June_2007.jpg), author Logann1. Confirm actual image rendering and attribution on production; preserve the 2007 date in alt text. No generic or AI image may be passed off as documentary proof of current conditions.
3. **Operator QA:** contact or independently check both city-owned ramps/park operators for latest fees/closures and current Sweetwater water access. Publish only source-dated official claims and tell visitors to reconfirm.
4. **High-priority editorial additions:** surface explicit TPWD invasive-mussel/closed-ramp/bait-rule advisories; these are now in the generated overview/boating/regulations content for affected statewide lakes. Review Whitney golden-alga and Amistad cross-border specifics separately.
5. **Next depth wave:** replace the 11 remaining generic statewide access records with named, independently verified ramp/park/campground inventories and historical primary sources. Add accurate directions/maps and original on-location imagery where rights permit.
6. **Definition of complete authority:** each lake should have verified facility inventory with direct owner links, current restrictions, correct photos/rights, source-dated history, a useful map and nearby itinerary, accessible/mobile/browser QA, and a repeatable review process. The current implementation **does not yet satisfy every item of this stricter standard across all 15**.


## October 12 county and topical cross-link extension

The following **contextual, reciprocal and non-duplicate** site links were added to the feature branch after the initial 15-lake audit:

| Source page | Lake destination | Editorial context |
|---|---|---|
| `/county/haskell` (and its county-series article) | `/fishing/lakes/lake-stamford` | Reservoir history, 1953 initial impoundment, white-crappie fishery, ramps and camping |
| `/county/nolan` (and its county-series article) | `/fishing/lakes/lake-sweetwater` | Municipal recreation area, CCC heritage, poor fishery and low-water/golden-alga warnings |
| `/county/jones` | `/fishing/lakes/lake-stamford` | Stamford city trip extension to the lake in neighboring Haskell County, not a claim the lake lies in Jones County |
| `/county/mitchell` | `/fishing/lakes/lake-sweetwater` | Nearby Nolan County recreation alternative from the Colorado City region; warns that fishing and lake levels are poor |
| `/article/texas-lakes-reservoirs-explained` | Both new lakes | Specific municipal-water-supply reservoir examples with differentiated history and caveats |
| `/explore/lakes-rivers` | Both new lakes plus their parent counties | Contextual Texas lake-discovery cards link directly to Haskell/Nolan and the fishing guides, while warning of low-water/poor-fishing limitations at Sweetwater |
| `/fishing/lakes/lake-arrowhead` | Lake Stamford | Regionally related reservoir navigation |
| `/fishing/lakes/lake-colorado-city` | Lake Sweetwater | Nearby West Texas reservoir navigation |

The existing shared statewide-lake generator already creates an outbound `/county/haskell` link from Lake Stamford and `/county/nolan` from Lake Sweetwater. The new incoming county links close these loops. The `/fishing/lakes` directory, fishing hub/search index, fishing planner and sitemap already derive entries from the completed-lake registry, so adding manually duplicated directory records would be incorrect.

**Regression protection:** `scripts/data/validate-stamford-sweetwater-crosslinks.mjs` is registered in both the canonical full suite and the predeploy validation suite. It checks exact link targets, county-article link visibility (the county UI displays the first eight), reciprocal generator logic, lake registry and lake directory/search integration, and drought/chronology guardrails. A connector-based 26-point static inspection passed before the explore-category extension; the new explore card and county destination assertions are now covered by the expanded validator; that is separate from GitHub CI and rendered production browser acceptance.

**Remaining release gate:** PR #4684 must pass required CI and merge/deploy before live county-page link verification. Recheck SSR HTML/visible nav and click targets on the four county pages plus both lake pages after deployment.
