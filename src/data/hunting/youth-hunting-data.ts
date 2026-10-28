// 2026–27 youth-only opportunities, checked against the TPWD Outdoor Annual on 2026-10-28.
// Do not roll these dates into a new license year without checking every zone and county.
export const YOUTH_HUNTING_LAST_CHECKED = "2026-10-28";
export const YOUTH_HUNTING_SEASON_YEAR = "2026–27";

export const YOUTH_HUNTING_SOURCES = {
  youthOnly: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/season-types/youth-only",
  seasonDates: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/2026-2027-hunting-season-dates",
  licenses: "https://tpwd.texas.gov/regulations/outdoor-annual/licenses/hunting-licenses-and-permits/hunting-licenses",
  education: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/hunter-education",
  public: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/",
  publicRules: "https://tpwd.texas.gov/huntwild/hunt/public/annual_public_hunting/need-to-know/",
  drawn: "https://tpwd.texas.gov/huntwild/hunt/public/public_hunt_drawing/youth.phtml",
  youthProgram: "https://tpwd.texas.gov/huntwild/hunt/youth_hunting/tx_youth_hunt_program/",
  deer: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/white-tailed-deer",
  harvest: "https://tpwd.texas.gov/regulations/outdoor-annual/hunting/general-regulations/after-killing-a-deer",
  duck: "https://tpwd.texas.gov/regulations/outdoor-annual/regs/animals/duck",
} as const;

export const YOUTH_HUNTING_SEASONS = [
  { species: "White-tailed deer", region: "North & South — early", dates: "Oct. 30–Nov. 1, 2026", detail: "Only counties with an open youth-only deer season; see county antlerless, bag, tag and method rules.", source: YOUTH_HUNTING_SOURCES.deer },
  { species: "White-tailed deer", region: "North — late", dates: "Jan. 4–17, 2027", detail: "No matching South Zone late youth-only deer season. Do not confuse with the South Zone special late general season.", source: YOUTH_HUNTING_SOURCES.deer },
  { species: "Wild turkey", region: "North — fall", dates: "Oct. 30–Nov. 1, 2026; Jan. 4–17, 2027", detail: "Rio Grande turkey; county-specific open areas and bag limits apply.", source: YOUTH_HUNTING_SOURCES.youthOnly },
  { species: "Wild turkey", region: "South — fall", dates: "Oct. 30–Nov. 1, 2026; Jan. 18–31, 2027", detail: "The January period does not apply to every South Texas county; check the county listing.", source: YOUTH_HUNTING_SOURCES.youthOnly },
  { species: "Wild turkey", region: "North — spring", dates: "Mar. 27–28; May 22–23, 2027", detail: "Youth-only spring Rio Grande turkey opportunities in qualifying counties.", source: YOUTH_HUNTING_SOURCES.youthOnly },
  { species: "Wild turkey", region: "South — spring", dates: "Mar. 13–14; May 8–9, 2027", detail: "Youth-only spring Rio Grande turkey opportunities in qualifying counties.", source: YOUTH_HUNTING_SOURCES.youthOnly },
  { species: "Duck / waterfowl", region: "High Plains Mallard Management Unit", dates: "Oct. 17–18, 2026", detail: "Youth waterfowl rules include an adult-accompaniment requirement; see TPWD.", source: YOUTH_HUNTING_SOURCES.duck },
  { species: "Duck / waterfowl", region: "South Zone", dates: "Oct. 31–Nov. 1, 2026", detail: "Check current federal, zone and property rules, HIP and duck-stamp eligibility.", source: YOUTH_HUNTING_SOURCES.duck },
  { species: "Duck / waterfowl", region: "North Zone", dates: "Nov. 7–8, 2026", detail: "Adult cannot hunt duck, merganser or coot in the youth-only opportunity except as otherwise authorized.", source: YOUTH_HUNTING_SOURCES.duck },
  { species: "Squirrel", region: "East Texas eligible counties", dates: "Sept. 25–27, 2026", detail: "Only counties with the applicable October–February squirrel season.", source: YOUTH_HUNTING_SOURCES.youthOnly },
] as const;

export const YOUTH_HUNTING_FAQ = [
  { question: "What ages qualify for a Texas youth-only hunting season?", answer: "Generally, a licensed hunter must be 16 or younger on the youth-only hunt date. A $7 youth license may remain valid after a hunter turns 17, but that does not extend youth-only season eligibility." },
  { question: "How much is the Texas youth hunting license?", answer: "For 2026–27, TPWD lists the Type 169 youth hunting license at $7 for Texas residents and nonresidents who are under 17 when purchased. Other hunt-specific fees and federal requirements may apply." },
  { question: "Does a child need hunter education in Texas?", answer: "Under age 9, the hunter must be accompanied; ages 9–16 must complete hunter education or be accompanied by a qualified person. A Texas Youth Hunting Program hunt requires completed hunter education, and public hunts have additional supervision rules." },
  { question: "Can an adult hunt with a child during youth-only season?", answer: "A supervising adult may accompany the youth, but may not take species reserved for youth during that youth-only season. Other separately open seasons may have different rules. Youth waterfowl opportunities specifically restrict adults from hunting duck, merganser or coot, except permitted falconry." },
  { question: "Is there a late youth-only deer season in South Texas?", answer: "No: TPWD lists the 2026–27 late youth-only white-tailed deer season for the North Zone, Jan. 4–17, 2027. Do not mistake the South Zone special late deer season for a youth-only season." },
  { question: "Where can a child hunt without private land?", answer: "Look into TPWD Annual Public Hunting Permit areas, youth drawn hunts, and the Texas Youth Hunting Program. Each has separate age, access, supervision, registration and fee rules. A hunting license alone does not open public land." },
  { question: "How do we apply for a mentored youth hunt?", answer: "For the Texas Youth Hunting Program, create a youth hunter account at tyhp.org, complete hunter education and purchase the required license, then review hunts and apply. Selected families complete paperwork and pay the current program fee; financial aid may be available." },
  { question: "Does every Texas county allow youth-only deer and turkey hunting?", answer: "No. County and zone rules control participation, seasons, legal take and reporting. Confirm the exact county with TPWD before traveling, even if statewide summary dates appear on this page." },
  { question: "What happens after a youth harvests a deer?", answer: "Follow the applicable physical or digital tagging process immediately, check the hunting license harvest log, any mandatory 24-hour reporting counties, chronic wasting disease testing zones, and public-property check-out rules. Do not assume the adult's license or tags cover the youth's harvest." },
] as const;
