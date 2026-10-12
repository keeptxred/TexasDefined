/**
 * Individually cross-checked practical facts from official agency pages.
 *
 * Each fact has a controlling source and the day the specific claim was reviewed.
 * This registry is NOT blanket certification of any entire guide or of same-day
 * access, site hours, fees, conditions or safety. Do not update checkedAt in a
 * bulk "refresh" without reading the source and confirming the stated value.
 */
export type GuideVerifiedFact = {
  label: string;
  value: string;
  sourceUrl: string;
  checkedAt: string;
  context?: string;
};
const CHECKED_AT = "2026-10-12";
export const verifiedGuideFactSets: Record<string, GuideVerifiedFact[]> = {
  "texas-paddling-guide": [
    {
      label: "Texas certified paddling trails",
      value: "100 trails listed by TPWD after the July 23, 2026 Palacios launch",
      sourceUrl: "https://tpwd.texas.gov/boating/paddling-trails/",
      checkedAt: CHECKED_AT,
      context: "Program count—not a guarantee that all launch sites are currently open.",
    },
    {
      label: "Lady Bird Lake designated trail network",
      value: "About 11 miles total; separate Tom Miller Dam, Barton Springs and Festival Beach loops",
      sourceUrl: "https://tpwd.texas.gov/boating/paddling-trails/hill-country/lady-bird-lake/",
      checkedAt: CHECKED_AT,
      context: "Wind, water levels and the launch point change individual trip duration.",
    },
    {
      label: "Buffalo Bayou Paddling Trail",
      value: "Approximately 26 miles from Highway 6 toward Allen's Landing; TPWD advises paddling segments rather than the full trail in one day",
      sourceUrl: "https://tpwd.texas.gov/boating/paddling-trails/gulf-coast/buffalo-bayou/",
      checkedAt: CHECKED_AT,
      context: "Water quality and flow are variable; check runoff and current operator advisories.",
    },
  ],
  "texas-stargazing-guide": [
    {
      label: "International Dark Sky Parks in Texas state parks",
      value: "Five: Big Bend Ranch, Caprock Canyons, Copper Breaks, Enchanted Rock and South Llano River",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks",
      checkedAt: CHECKED_AT,
      context: "Dark Sky designation does not establish that a given park is open after hours.",
    },
    {
      label: "International Dark Sky Sanctuary",
      value: "Devils River State Natural Area is listed separately from the five Dark Sky Parks",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks",
      checkedAt: CHECKED_AT,
      context: "A sanctuary designation is not interchangeable with the Dark Sky Park designation.",
    },
    {
      label: "Darkness reference",
      value: "TPWD lists Big Bend Ranch State Park in Bortle Class 1",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/stargazing-in-state-parks",
      checkedAt: CHECKED_AT,
      context: "Moon, clouds, smoke and illumination change the sky visible to a visitor.",
    },
  ],
  "texas-ohv-guide": [
    {
      label: "Texas OHV program effective date",
      value: "January 1, 2006, following the 2005 legislative session",
      sourceUrl: "https://tpwd.texas.gov/state-parks/texas-off-highway-program",
      checkedAt: CHECKED_AT,
    },
    {
      label: "Applicable OHV decal rule",
      value: "TPWD states a decal is required at covered legal OHV venues on Texas public lands or sites receiving OHV program grants",
      sourceUrl: "https://tpwd.texas.gov/state-parks/texas-off-highway-program",
      checkedAt: CHECKED_AT,
      context: "A decal does not authorize riding where a land manager prohibits it.",
    },
    {
      label: "Legal riding area directory",
      value: "TPWD's Ride Texas directory is the agency's starting point for eligible venues",
      sourceUrl: "https://tpwd.texas.gov/state-parks/texas-off-highway-program",
      checkedAt: CHECKED_AT,
      context: "Check each venue's allowed vehicle classes, closures and operator rules before travel.",
    },
  ],
  "texas-horseback-riding-guide": [
    {
      label: "Equestrian health documentation",
      value: "TPWD requires proof of a negative Coggins test for each horse brought to a Texas state park or natural area",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian",
      checkedAt: CHECKED_AT,
      context: "Bring the required documentation and check park-specific entry rules.",
    },
    {
      label: "Galveston Island beach riding",
      value: "State-park beach horse riding is listed only for November through February",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian",
      checkedAt: CHECKED_AT,
      context: "Confirm closure notices, the designated equestrian parking area, and seasonal park instructions before visiting.",
    },
    {
      label: "Big Bend Ranch equestrian access",
      value: "TPWD describes about 238 miles of multiuse trails and requires a backcountry use permit for day or overnight equestrian use",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/equestrian",
      checkedAt: CHECKED_AT,
      context: "The desert setting requires planning for water, weed-free feed, trailer access and horse fitness.",
    },
  ],
  "texas-mountain-biking-guide": [
    {
      label: "Texas state-park e-bike rule",
      value: "TPWD lists electric bikes as permitted on public roadways, not on state park trails",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks",
      checkedAt: CHECKED_AT,
      context: "Check current park regulations and route classifications before taking any e-bike onto a trail.",
    },
    {
      label: "Biking at Wildlife Management Areas",
      value: "TPWD says a Limited Public Use Permit is needed to enter many WMAs that offer bicycling",
      sourceUrl: "https://tpwd.texas.gov/state-parks/parks/things-to-do/biking-in-state-parks",
      checkedAt: CHECKED_AT,
      context: "The availability of biking and permits depends on the specific WMA.",
    },
    {
      label: "Franklin Mountains park trail network",
      value: "TPWD reports over 100 miles of trails at Franklin Mountains State Park",
      sourceUrl: "https://tpwd.texas.gov/state-parks/franklin-mountains/plan-your-visit",
      checkedAt: CHECKED_AT,
      context: "This is the park-wide trail network, NOT a verified claim that every mile permits mountain bikes.",
    },
  ],
  "texas-rock-climbing-bouldering-guide": [
    {
      label: "Lake Mineral Wells bouldering rules",
      value: "TPWD prohibits bouldering, free climbing and soloing at the Penitentiary Hollow climbing area",
      sourceUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing",
      checkedAt: CHECKED_AT,
      context: "Climbing there also requires headquarters registration and a liability release on each visit.",
    },
    {
      label: "Mineral Wells climbing closure conditions",
      value: "The climbing area closes at sundown and under wet conditions",
      sourceUrl: "https://tpwd.texas.gov/state-parks/lake-mineral-wells/rock-climbing",
      checkedAt: CHECKED_AT,
      context: "Call park headquarters about conditions before traveling.",
    },
    {
      label: "Enchanted Rock climbing protection",
      value: "TPWD forbids pitons, using trees for anchoring/rappelling, and rock or bolt alteration without explicit approval",
      sourceUrl: "https://tpwd.texas.gov/state-parks/enchanted-rock/more-info/rock-climb",
      checkedAt: CHECKED_AT,
      context: "Check the park's current climbing-management plan and route-specific descent guidance.",
    },
  ],
};
