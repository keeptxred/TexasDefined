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
};
