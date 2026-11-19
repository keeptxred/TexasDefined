import type { Destination } from "./types";

/**
 * Albert & Bessie Kronkosky State Natural Area: opening visitor authority.
 * Primary-source check: November 19, 2026, following TPWD's dated opening release.
 * The old evergreen TPWD park landing-page prose still says "no opening date"
 * as of this check; the newer dated release controls the announced opening.
 * Admission and reservations are not usable before the stated opening dates.
 * Exact-site photograph: Larry D. Moore, CC BY 4.0, Wikimedia Commons
 * https://commons.wikimedia.org/wiki/File:ABK_SNA_Entrance_2026.jpg
 */
const PRESS = "https://tpwd.texas.gov/newsmedia/releases/?req=20261118a";
const PARK = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky";
const ALERT = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/park-alert";
const RANGER = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/ranger-notes";
const INTERVIEW = "https://www.tpr.org/arts-culture/2026-11-17/a-nearly-4-000-acre-park-in-the-hill-country-is-almost-ready-to-greet-visitors";
const HISTORY = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/history";
const MAP = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/map";
const BOOKING = "https://texasstateparks.reserveamerica.com/camping/albert-and-bessie-kronkosky-abk-sna/r/campgroundDetails.do?contractCode=TX&parkId=1200051";
const CHECKED = "2026-11-19";
const DAY_USE_START = Date.parse("2026-12-01T06:00:00Z");
const OVERNIGHT_START = Date.parse("2026-12-15T06:00:00Z");

export function applyKronkoskyOpeningAuthority(destination: Destination, now = Date.now()): Destination {
  if (destination.slug !== "albert-bessie-kronkosky-state-natural-area") return destination;
  // A scheduled opening is not a guarantee of an open gate; always consult the park alert.
  const beforeDayUse = now < DAY_USE_START;
  const beforeCamping = now < OVERNIGHT_START;
  const openingStatus = beforeDayUse
    ? "NOT YET OPEN: TPWD schedules day use for December 1, 2026 and overnight stays for December 15."
    : beforeCamping
      ? "DAY-USE DATE REACHED: TPWD scheduled day use from December 1. Overnight stays start December 15; confirm live access."
      : "ANNOUNCED OPENING DATES HAVE PASSED: TPWD scheduled day use from December 1 and overnight stays from December 15; check alerts for actual access.";
  const bookingTime = beforeDayUse
    ? "Reservations are scheduled to open December 1"
    : "TPWD scheduled reservations from December 1; check the live booking system";
  const entranceSummary = beforeDayUse
    ? "Kronkosky State Natural Area near Pipe Creek opens for day use December 1, 2026 and overnight stays December 15."
    : beforeCamping
      ? "TPWD's December 1 day-use opening date has arrived at Kronkosky State Natural Area; overnight stays start December 15."
      : "Kronkosky State Natural Area's announced December 1 day-use and December 15 overnight opening dates have passed.";
  return {
    ...destination,
    summary: `${entranceSummary} Explore about 3,800 acres, 26 miles of trails, camping and a nature center; check current TPWD park alerts.`,
    nearestTown: "Pipe Creek",
    county: "Bandera",
    coordinates: { lat: 29.74032304, lng: -98.83809256 },
    address: "7754 State Highway 46, Pipe Creek, TX 78063",
    directions: "From Boerne, take State Highway 46 west across I-10 and continue about seven miles to the state natural area entrance on the right. From Bandera, take Highway 16 south to Highway 46, then turn east; the entrance will be on the left. Use the official entrance rather than navigating to an internal trailhead or an approximate ranch centroid.",
    bestSeason: "Day use begins December 1, 2026; overnight stays begin December 15. Cooler months are a practical first choice for strenuous Hill Country trails. In summer, start early and plan for heat.",
    entryNote: `${openingStatus} ${bookingTime}. TPWD lists $6 for day use per person aged 13 or older; children 12 and under enter free. Announced public hours: 7 a.m.–10 p.m. daily. Check current park alerts, weather and actual reservation prices before leaving.`,
    managingAuthority: "Texas Parks and Wildlife Department",
    officialUrl: PARK,
    reservationUrl: BOOKING,
    sourceCheckedAt: CHECKED,
    updatedAt: CHECKED,
    hero: {
      src: "https://commons.wikimedia.org/wiki/Special:Redirect/file/ABK_SNA_Entrance_2026.jpg?width=1600",
      alt: "Entrance to Albert and Bessie Kronkosky State Natural Area on Highway 46 photographed in August 2026",
      width: 1600,
      height: 900,
      credit: "Larry D. Moore · CC BY 4.0 · Wikimedia Commons"
    },
    highlights: [
      beforeDayUse ? "Day use scheduled December 1; camping December 15, 2026" : beforeCamping ? "Day-use date reached; camping scheduled December 15, 2026" : "Opening dates passed; check official access and booking alerts",
      "26-mile network of trails with differing surfaces and difficulty",
      "Tent campsites, primitive backcountry stays and mini cabins",
      "Nature Center with tactile, braille and interpreted exhibits",
      "Golden-cheeked warbler woodland and rare Hill Country plants",
      "TPWD scheduled reservations from December 1; day-use capacity may fill"
    ],
    body: [
      beforeDayUse
        ? "An announced opening is not an open gate. TPWD scheduled the first public day visits for December 1, 2026, overnight stays for December 15 and online reservations from December 1. Until the first date arrives, this is not an ordinary public trailhead. Check the current park alert before traveling."
        : beforeCamping
          ? "TPWD's announced December 1, 2026 day-use date has arrived, but overnight stays are not scheduled until December 15. The opening schedule does not guarantee an available day pass or override temporary closures. Check today's park alert and live reservation calendar."
          : "TPWD's announced December 1 day-use and December 15 overnight dates have now passed. These are historical agency announcements, not a guarantee that any gate, trail or campsite is currently available. Check the live TPWD alert and reservation inventory before traveling.",
      "Plan the first visit around the kind of day you want. TPWD describes 26 miles of trails across different widths, surfaces and difficulty levels, not a uniformly easy 26-mile walk. A shorter outing can put the Nature Center and an appropriately chosen trail first; a longer visit might combine a steeper route with wildlife observation. Neither the TPWD release nor the currently accessible public map provides a verified name-and-mileage list for every trail. In a November 17 interview, the park superintendent described graded, smoother front-country paths suitable for many walkers and strollers alongside more demanding routes. Confirm a particular signed trail's name, exact length, surface, grade and condition with park staff rather than trusting a fabricated route table.",
      "The address is 7754 State Highway 46, Pipe Creek, Texas 78063, west of Boerne. TPWD's headquarters coordinates are 29.74032304, -98.83809256. Use that entrance for navigation: the property is extensive, and an interior pin is not interchangeable with the public gate. Coming from Boerne, follow Highway 46 west past Interstate 10 for about seven miles. Check the latest TPWD park alert and confirm current access before traveling, especially around opening week.",
      "Admission is listed at $6 per day for each visitor aged 13 or older, while children 12 and under enter free. The announced public-use hours are 7 a.m. to 10 p.m. daily; the park's reservation listing separately gives regular office hours of about 8:30 a.m. to 4:30 p.m. These are different things. A late-day arrival should not assume the office will be staffed, and people with an overnight booking should check their exact check-in instructions.",
      `${beforeDayUse ? "Book ahead for day use. TPWD warns that capacity can fill; bookings are scheduled from December 1, while overnight stays begin December 15. " : beforeCamping ? "Book ahead: day-use capacity can fill. Online reservations were scheduled to begin December 1, but overnight stays begin December 15. " : "Book ahead: day-use capacity may fill. TPWD scheduled booking from December 1 and overnight stays from December 15; check today's inventory. "} Some ReserveAmerica booking views show inconsistent fees and gates: TPWD's release lists $6 and 7 a.m., but one tour booking view lists $7 and 6 a.m. Verify the exact booking product, payable price and permitted entry time before checkout. The dated park alert controls the announced opening dates.`,
      "Overnight choices are deliberately different. In an on-the-record interview with the superintendent, Texas Public Radio documented four tiers: Rancher's Rest mini cabins with heat, cooling, bunk beds, refrigerator and microwave; simpler screened cabins with electricity; developed tent sites with a food box, picnic table and tent pad or platform; and hike-in primitive campsites at Red Bluff. Do not assume that all sites have electricity, restrooms, showers, car access or RV hookups. The 31 camping accommodations in TPWD's release are not interchangeable with booking-system listings that also include group facilities.",
      "For primitive campers, arrival timing matters. The superintendent described Red Bluff as approximately a four-mile hike one way from the trailhead, with pack-in, pack-out responsibilities. Carrying overnight supplies that distance is not the same as parking beside a tent pad. The booking listing tells Red Bluff visitors to arrive at least two hours before dark and warns that trail access and Red Bluff may close in adverse weather. Confirm site-specific check-in arrangements with staff if your planned arrival may be late.",
      "Accessibility is a visible design priority rather than a blanket promise that all rugged terrain is accessible. TPWD says the Nature Center will offer braille, narrated audio guides, tactile elements and American Sign Language interpretations using tablets that visitors can borrow at no charge. The park is the first in the Texas State Parks system to offer an Extreme Motus all-terrain wheelchair and an adult changing table. Contact staff before traveling to confirm equipment availability, loan procedures, routes and facilities that fit the visitor's needs.",
      "The conservation story is as important as the trails. Oak and juniper woodlands support golden-cheeked warbler nesting habitat; TPWD also identifies alligator lizards, Texas spring salamanders, Boerne bean, sycamore-leaf snowbell and bigtooth maple among notable species. These are habitat and conservation facts, not a guarantee of sightings. Stay on permitted trails, give wildlife space and avoid collecting plants, rocks or artifacts.",
      "A surprising part of the landscape's value lies below the surface of the usual scenic overlook. Springs and seeps create small, sheltered microclimates within steep limestone country. TPWD's archaeological history traces human use of the Balcones Canyonlands here back roughly 11,000 years, from Late Paleoindian tools through Archaic burned-rock middens and later bow-and-arrow cultures. Those traces are protected archaeological resources, not a scavenger hunt.",
      "The ranch history is equally distinctive. Albert and Bessie Kronkosky assembled the property from 1946 onward, building on earlier family holdings. They used it for recreation and left the land to Texas to protect its natural character. TPWD took ownership in March 2011. The new public trails and visitor facilities are therefore a change in access, not the start of the land's history or its conservation purpose.",
      "For a first family outing, favor the Nature Center and a modest trail over an ambitious mileage target. For experienced walkers, make the more difficult trails a second decision after checking official route length, weather, water and whether any sections are closed. The park offers mountain biking according to TPWD, but do not assume bikes are permitted on every footpath. Swimming and unrestricted creek access are not announced features of this opening; do not plan a swim here based on the presence of springs.",
      "For a fuller Hill Country trip, Boerne is a useful town base. Guadalupe River State Park is a separate destination with its own river-access rules; Government Canyon State Natural Area offers another trail-focused outing closer to San Antonio; Hill Country State Natural Area provides a more remote outdoor comparison. Keep those admissions, travel times, campground policies and access conditions separate from Kronkosky's. This site's travel advice is independent; park rules, permits and closures come from TPWD. The conservation-first natural area is not a developed swimming resort or a full-hookup RV campground.",
      "Acreage deserves a precise caveat: TPWD's November 18 release rounds the property to about 3,800 acres, while its older park page says 3,794 acres and some prior accounts report 3,852. Until TPWD reconciles those figures in current visitor materials, about 3,800 acres is the reliable description, not an apparently exact area claim. The opening dates, fee, trails and accessibility details here are tied to the dated agency announcement."
    ],
    accessibilityNotes: "Nature Center: braille, tactile exhibits, narrated audio and ASL-interpreted content on borrowable tablets; TPWD announces an Extreme Motus all-terrain wheelchair and an adult changing table. Request specific route and equipment details from park staff at 830-535-4896. These features do not establish accessibility of every trail or campsite.",
    visitorFacts: [
      { topic: "access", label: "Opening dates", detail: "TPWD scheduled public day use for December 1, 2026 and overnight stays from December 15, 2026. These are announced milestones, not a live gate-status guarantee; check park alerts.", sourceUrl: PRESS, checkedAt: CHECKED },
      { topic: "admission", label: "Day-use admission", detail: "$6 daily for ages 13 and older. Children 12 and younger enter free; camping or other facility charges are additional.", sourceUrl: PARK, checkedAt: CHECKED },
      { topic: "hours", label: "Gate and office hours", detail: "Public-use hours: 7 a.m.–10 p.m. daily from the opening date. The reservation listing reports usual office staffing of 8:30 a.m.–4:30 p.m.; staff hours may vary.", sourceUrl: BOOKING, checkedAt: CHECKED },
      { topic: "reservations", label: "When reservations open", detail: "TPWD scheduled both day-use and camping reservations from December 1, 2026, with overnight stays from December 15. Verify current day passes and lodging inventory before departure.", sourceUrl: PRESS, checkedAt: CHECKED },
      { topic: "camping", label: "Stay types and weather", detail: "TPWD identifies mini cabins, developed campsites and primitive backcountry sites. Choose the exact site for hookups and access. Red Bluff and trails may close in adverse weather.", sourceUrl: BOOKING, checkedAt: CHECKED },
      { topic: "accessibility", label: "Nature Center and assisted access", detail: "Braille, tactile displays, audio and ASL tablet interpretation are planned. TPWD announces an Extreme Motus wheelchair and adult changing table; call ahead about availability and suitable paths.", sourceUrl: PRESS, checkedAt: CHECKED },
      { topic: "parking", label: "Official entrance", detail: "Navigate to the park entrance at 7754 State Highway 46, Pipe Creek, TX 78063. Ask the park which parking area and trailhead suit your visit.", sourceUrl: MAP, checkedAt: CHECKED }
    ],
    visitorFaqs: [
      { question: "When does Albert and Bessie Kronkosky State Natural Area open?", answer: beforeDayUse ? "TPWD announced day use for December 1, 2026 and overnight stays for December 15. These are scheduled dates; check the park alert." : beforeCamping ? "TPWD’s December 1 day-use date has arrived; overnight stays are scheduled from December 15. Check alerts for changes." : "TPWD announced December 1 day use and December 15 overnight stays. Those dates have passed; confirm the current operational status with TPWD.", sourceUrl: PRESS },
      { question: "When can I reserve a day pass or campsite?", answer: beforeDayUse ? "Reservations are scheduled from December 1 for day use and camping. First overnight stays begin December 15; capacity may fill." : beforeCamping ? "Bookings were scheduled from December 1; overnight stays start December 15. Verify actual availability." : "Reservations were scheduled to start December 1, 2026. Check the booking system for current passes and campsite inventory.", sourceUrl: PRESS },
      { question: "How much does a day visit cost?", answer: "TPWD lists $6 daily per person ages 13 and up; children 12 and under enter free. Camping, cabins and group facilities have separate charges.", sourceUrl: PARK },
      { question: "How many miles of hiking trails are there?", answer: "TPWD lists 26 miles of trails with different surfaces and difficulties. Park staff describe smoother front-country paths and a roughly four-mile hike-in to Red Bluff. A verified individual-trail distance chart is not yet published; ask staff for a route.", sourceUrl: PRESS },
      { question: "Can I camp in a cabin or primitive tent site?", answer: "Options include Rancher’s Rest mini cabins, screened cabins, developed tent sites and Red Bluff hike-in primitive camping. Verify the exact site’s services; overnight stays were scheduled from December 15, 2026.", sourceUrl: BOOKING },
      { question: "Where is the park entrance?", answer: "7754 State Highway 46, Pipe Creek, Texas 78063, roughly seven miles west of Interstate 10 along Highway 46 from Boerne. Use the signed entrance and current TPWD directions.", sourceUrl: MAP },
      { question: "What are the opening hours?", answer: "TPWD announces site hours of 7 a.m. to 10 p.m., seven days a week, once public day use begins. Office staffing hours are more limited and can vary.", sourceUrl: PRESS },
      { question: "Is the nature area wheelchair accessible?", answer: "The Nature Center has planned accessible interpretive features. TPWD also announces an all-terrain wheelchair and adult changing table. That does not mean every backcountry trail is step-free; contact park staff about the exact experience.", sourceUrl: PRESS },
      { question: "Can I bring a dog or go swimming?", answer: "Do not assume the springs are a swimming area; swimming is not advertised as an opening activity. Verify the site's current pet and trail restrictions with TPWD before bringing a dog.", sourceUrl: PARK },
      { question: "Why is this land protected?", answer: "The property protects rare Hill Country plants and animals, springs and seeps, and an archaeological record stretching back about 11,000 years. Its conservation history reaches back to the Kronkosky family gift accepted by Texas in 2011.", sourceUrl: HISTORY },
      { question: "Does rain affect hiking and primitive camping?", answer: "Yes. The official reservation page warns that trails and the Red Bluff Primitive Campground may close for adverse weather. Contact the park ahead of travel and do not rely on a dry-weather itinerary after storms.", sourceUrl: BOOKING },
      { question: "Why do some sources give different acreage?", answer: "TPWD's November 18, 2026 release says about 3,800 acres, while its older park detail uses 3,794 acres; some past accounts use 3,852. We use the agency's current rounded acreage instead of pretending the sources agree.", sourceUrl: PRESS }
    ],
    authorityGuide: {
      whyItMatters: "This is a rare transition from a protected private Hill Country ranch to a state-managed natural area, with trails and modest camping designed around conservation. Steep limestone country, spring-fed niches, sensitive species and roughly 11,000 years of archaeology make it significant beyond a scenic hike. Plan around current alerts, terrain and the precise campsite type.",
      assessment: {
        recommendedVisit: "Start with a Nature Center visit and one trail chosen for your group's abilities; plan a half day or longer rather than rushing a complete 26-mile trail system.",
        physicalEffort: "Moderate to high",
        weatherExposure: "Mostly outdoors",
        planningLevel: "High",
        familyFit: "Nature Center plus a shorter, staff-recommended route is the best first choice for children; do not mistake the entire trail network for a family stroll.",
        firstTimeValue: "New access to an unusually well-preserved ranch and its rare-species habitat; reserve the date before choosing the trail."
      },
      itineraries: [
        { label: "First visit with the family", duration: "2–3 hours after day-use opening", steps: [
          "Check the current TPWD booking calendar, park alert and weather before leaving; an announced date does not guarantee entry.",
          "Start at the Nature Center to understand the preserve's wildlife, geology and accessible interpretation.",
          "Ask staff for a trail appropriate to the group's fitness, mobility and daylight; return before heat or fatigue becomes an issue."
        ] },
        { label: "Trail-focused day", duration: "Half to full day after day-use opening", steps: [
          "Review the official map and current trail conditions; do not substitute the total 26-mile network for a single route.",
          "Choose a route matched to available time, grade and surface. Bring water and arrange an earlier start when temperatures rise.",
          "Leave protected plants, habitats and archaeological features undisturbed; finish at the public entrance before the gate closes."
        ] },
        { label: "Overnight in the Hill Country", duration: "One night after overnight opening", steps: [
          "Compare climate-controlled Rancher’s Rest mini cabins, screened cabins, tent sites and Red Bluff’s four-mile hike-in option; check current inventory and amenities.",
          "Check arrival instructions. Red Bluff primitive campers should reach the trailhead well before dark and plan for approximately four miles carrying gear.",
          "After a night at the preserve, consider Boerne or a separate Guadalupe River State Park visit, with its own reservation and entry rules."
        ] }
      ],
      sources: [
        { label: "TPWD opening announcement, Nov. 18, 2026", url: PRESS, scope: "Opening and reservation dates, trail mileage, lodging options, fees, hours, accessible exhibits and conservation species." },
        { label: "TPWD park page and headquarters", url: PARK, scope: "Official entrance, contact number, park background, admission and conservation." },
        { label: "TPWD official visitor map", url: MAP, scope: "Verified highway address and park entrance coordinates; obtain current trail information before travel." },
        { label: "Texas State Parks reservations", url: BOOKING, scope: "Site types, overnight policies, hours, weather closures and site-by-site amenities; check calendar for actual bookability." },
        { label: "TPWD history of the natural area", url: HISTORY, scope: "Archaeology, ranching land use, the Kronkosky family and the 2011 state donation." },
        { label: "Current TPWD park alert", url: ALERT, scope: "Changes to access, opening dates and operational restrictions; check immediately before a visit." },
        { label: "TPWD ranger notes and facility photography", url: RANGER, scope: "Official facilities and park progress photographs; view at source, without reusing rights-restricted media." },
        { label: "TPR superintendent interview, Nov. 17, 2026", url: INTERVIEW, scope: "Original on-record descriptions of the four overnight choices, four-mile Red Bluff access and easier front-country trails." }
      ]
    }
  };
}
