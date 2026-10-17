# TPWD authority field research — 17 October 2026

This record distinguishes **park-specific sourced public visitor facts** from the substantially higher bar of **completed, visually and editorially verified authority pages**. It is not a claim that any park has passed every final acceptance gate.

| Park | Source-checked facts and visitor-impacting rules | TPWD primary reference | Unresolved acceptance |
| --- | --- | --- | --- |
| Atlanta | Wood/charcoal burn ban; three full-park permitted hunting closures November 30–December 4 and December 27–31, 2026, and January 15–19, 2027; Wright Patman Lake access and separate campground equipment. | https://tpwd.texas.gov/state-parks/atlanta/alert | Hero rights and display, map routing, content-level review, public-HTML render, SEO and county/affiliate acceptance |
| Bonham | 65-acre lake, 5-mph boat limit, 8.75-mile trail system, distinct Lake Loop/Bois d'Arc routes and group versus individually bookable campsites. | https://tpwd.texas.gov/state-parks/bonham | Alert details were not readable during review: do not claim an all-clear. All photo/HTML/map/SEO and business acceptance pending |
| Daingerfield | 74-acre Little Pine Lake, Rustling Leaves/Mountain View trails, CCC buildings, park-lake 5-mph boating, distinct campground types. | https://tpwd.texas.gov/state-parks/daingerfield | Alert details were not readable during review: do not claim an all-clear. Full visual and editorial acceptance pending |
| Cooper Lake | Separate Doctors Creek and South Sulphur units; **South Sulphur wood** burn ban allows charcoal and stoves, Honey Creek low-water launch closure, Lone Pine October 31 event closure, Coyote Run partial December closure and full January hunting closure. | https://tpwd.texas.gov/state-parks/cooper-lake/alert | Verify unit-level visual directions, licensing, rendered restrictions and downstream booking links |
| Lake Bob Sandlin | October 15 2026 wood **and charcoal** ban; fuel stoves permitted; separate primitive ground-fire restrictions and hike-in access. | https://tpwd.texas.gov/state-parks/lake-bob-sandlin/alert | Image, live warnings, location, booking, cross-links and editorial review |
| Lake Brownwood | Wood ban **allows charcoal**, renovation closures of cabins, group lodges, recreation hall and Lakeside Trail, and December/January full-park hunting closures. | https://tpwd.texas.gov/state-parks/lake-brownwood/alert | Verify no lodging affiliate or onsite booking CTA advertises closed cabins; visual, geography and editorial acceptance |

## How this is used

The six reviewed records are updated only in `src/data/state-park-authority.ts` (the existing provenance-backed visitor-essentials layer). `scripts/data/validate-state-park-authority.mjs` fails if any park-specific notice or the uncertainty handling disappears. The existing `StateParkVisitorEssentials` component exposes original TPWD references to visitors.

**No certification by automation:** The October 15 90-entry matrix remains the editorial acceptance ledger. Source verification, URL-200 tests, schema checks and code merging do **not** replace direct review of current hours and closures, licensed exact-place images, internal and county linking, accessible HTML, fair affiliate placement, or deployment and mobile-page rendering.

The original 90 official TPWD entries include developing sites, lodges and visitor centers; none may be counted as an ordinary independently bookable public park purely to raise an SEO total. Keep site-specific statuses and multi-unit park relationships accurate.
