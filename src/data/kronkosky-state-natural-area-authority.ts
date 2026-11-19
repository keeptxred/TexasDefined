import type { Destination } from "./types";

/**
 * Albert & Bessie Kronkosky State Natural Area: opening visitor authority.
 * Primary-source check: November 18, 2026, following TPWD's dated opening release.
 * The old evergreen TPWD park landing-page prose still says "no opening date"
 * as of this check; the newer dated release controls the announced opening.
 * Admission and reservations are not usable before the stated opening dates.
 * Exact-site photograph: Larry D. Moore, CC BY 4.0, Wikimedia Commons
 * https://commons.wikimedia.org/wiki/File:ABK_SNA_Entrance_2026.jpg
 */
const PRESS = "https://tpwd.texas.gov/newsmedia/releases/?req=20261118a";
const PARK = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky";
const HISTORY = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/history";
const MAP = "https://tpwd.texas.gov/state-parks/albert-bessie-kronkosky/map";
const BOOKING = "https://texasstateparks.reserveamerica.com/camping/albert-and-bessie-kronkosky-abk-sna/r/campgroundDetails.do?contractCode=TX&parkId=1200051";
const CHECKED = "2026-11-18";

export function applyKronkoskyOpeningAuthority(destination: Destination): Destination {
  if (destination.slug !== "albert-bessie-kronkosky-state-natural-area") return destination;
  return {
    ...destination,
    summary: "Opening December 1, 2026 for day use and December 15 for overnight stays, this roughly 3,800-acre Hill Country preserve near Pipe Creek offers 26 miles of trails, varied camping, a nature center and rare-species habitat. Reservations begin December 1.",
    nearestTown: "Pipe Creek",
    county: "Bandera",
    coordinates: { lat: 29.74032304, lng: -98.83809256 },
    address: "7754 State Highway 46, Pipe Creek, TX 78063",
    directions: "From Boerne, take State Highway 46 west across I-10 and continue about seven miles to the state natural area entrance on the right. From Bandera, take Highway 16 south to Highway 46, then turn east; the entrance will be on the left. Use the official entrance rather than navigating to an internal trailhead or an approximate ranch centroid.",
    bestSeason: "Day use begins December 1, 2026; overnight stays begin December 15. Cooler months are a practical first choice for strenuous Hill Country trails. In summer, start early and plan for heat.",
    entryNote: "NOT YET OPEN as of November 18, 2026. TPWD announces public day use beginning December 1, camping beginning December 15 and online reservations opening December 1. Day-use entry is $6 per person aged 13 or older; children 12 and under enter free. Gates: 7 a.m.–10 p.m. daily. Reserve ahead: capacity closures are possible. Check official alerts, weather and the booking system before leaving.",
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
      "Opens for day use December 1; camping December 15, 2026",
      "26-mile network of trails with differing surfaces and difficulty",
      "Tent campsites, primitive backcountry stays and mini cabins",
      "Nature Center with tactile, braille and interpreted exhibits",
      "Golden-cheeked warbler woodland and rare Hill Country plants",
      "Reservations open December 1; day-use capacity may be reached"
    ],
    body: [
      "There is an important difference between an opening announcement and an open gate. On November 18, 2026, Texas Parks and Wildlife Department announced that Albert and Bessie Kronkosky State Natural Area would admit day visitors starting December 1, with overnight stays starting December 15. The reservation system is scheduled to begin taking both types of bookings on December 1. Until then, the property is not an ordinary public-access hiking destination. This is the opening schedule, not a claim that a campsite or day pass is available today.",
      "Plan the first visit around the kind of day you want. TPWD describes 26 miles of trails across different widths, surfaces and difficulty levels, not a uniformly easy 26-mile walk. A shorter outing can put the Nature Center and an appropriately chosen trail first; a longer visit might combine a steeper route with wildlife observation. The current public release does not identify every individual trail name, distance, grade or condition. Use the latest official map and on-site staff advice instead of relying on a made-up route difficulty rating.",
      "The address is 7754 State Highway 46, Pipe Creek, Texas 78063, west of Boerne. TPWD's headquarters coordinates are 29.74032304, -98.83809256. Use that entrance for navigation: the property is extensive, and an interior pin is not interchangeable with the public gate. Coming from Boerne, follow Highway 46 west past Interstate 10 for about seven miles. Do not make the drive before December 1 expecting an open trailhead.",
      "Admission is listed at $6 per day for each visitor aged 13 or older, while children 12 and under enter free. The announced public-use hours are 7 a.m. to 10 p.m. daily; the park's reservation listing separately gives regular office hours of about 8:30 a.m. to 4:30 p.m. These are different things. A late-day arrival should not assume the office will be staffed, and people with an overnight booking should check their exact check-in instructions.",
      "Book ahead even for a simple hike. TPWD explicitly warns that day-use capacity can fill and that reservations are strongly recommended. Both day-use and overnight booking are scheduled to go live December 1, but overnight lodging does not begin until December 15. The official booking page currently displays facilities and booking windows that do not always align with the newly announced start date; treat the press release's opening dates as controlling and confirm the actual available arrival date in the reservation system before paying.",
      "Overnight choices are deliberately different. TPWD describes mini cabins, developed sites and primitive backcountry tent camping, and the reservation catalog distinguishes cabins, primitive campsites and sites with water. Do not assume every site has electricity, a private restroom, a shower, vehicle access or an RV hookup. Select the exact site type and read its amenities. The booking system also lists group facilities separately, which is why its total number of listings should not be confused with the 31 overnight accommodations cited in TPWD's opening announcement.",
      "For primitive campers, arrival timing matters. The state's reservation listing says Red Bluff Primitive Campground visitors should arrive at least two hours before dark. It also warns that trails and Red Bluff may close because of adverse weather. The ordinary late-arrival policy allows an overnight guest arriving after office hours to go to the reserved site and check in at headquarters the next morning before 9 a.m. if unable to obtain a permit from the kiosk; verify these instructions for your specific reservation.",
      "Accessibility is a visible design priority rather than a blanket promise that all rugged terrain is accessible. TPWD says the Nature Center will offer braille, narrated audio guides, tactile elements and American Sign Language interpretations using tablets that visitors can borrow at no charge. The park is the first in the Texas State Parks system to offer an Extreme Motus all-terrain wheelchair and an adult changing table. Contact staff before traveling to confirm equipment availability, loan procedures, routes and facilities that fit the visitor's needs.",
      "The conservation story is as important as the trails. Oak and juniper woodlands support golden-cheeked warbler nesting habitat; TPWD also identifies alligator lizards, Texas spring salamanders, Boerne bean, sycamore-leaf snowbell and bigtooth maple among notable species. These are habitat and conservation facts, not a guarantee of sightings. Stay on permitted trails, give wildlife space and avoid collecting plants, rocks or artifacts.",
      "A surprising part of the landscape's value lies below the surface of the usual scenic overlook. Springs and seeps create small, sheltered microclimates within steep limestone country. TPWD's archaeological history traces human use of the Balcones Canyonlands here back roughly 11,000 years, from Late Paleoindian tools through Archaic burned-rock middens and later bow-and-arrow cultures. Those traces are protected archaeological resources, not a scavenger hunt.",
      "The ranch history is equally distinctive. Albert and Bessie Kronkosky assembled the property from 1946 onward, building on earlier family holdings. They used it for recreation and left the land to Texas to protect its natural character. TPWD took ownership in March 2011. The new public trails and visitor facilities are therefore a change in access, not the start of the land's history or its conservation purpose.",
      "For a first family outing, favor the Nature Center and a modest trail over an ambitious mileage target. For experienced walkers, make the more difficult trails a second decision after checking official route length, weather, water and whether any sections are closed. The park offers mountain biking according to TPWD, but do not assume bikes are permitted on every footpath. Swimming and unrestricted creek access are not announced features of this opening; do not plan a swim here based on the presence of springs.",
      "For a fuller Hill Country trip, Boerne is a useful town base. Guadalupe River State Park is a separate destination with its own river-access rules; Government Canyon State Natural Area offers another trail-focused outing closer to San Antonio; Hill Country State Natural Area provides a more remote outdoor comparison. Keep those admissions, travel times, campground policies and access conditions separate from Kronkosky's. This site's travel advice is independent; park rules, permits and closures come from TPWD.",
      "Acreage deserves a precise caveat: TPWD's November 18 release rounds the property to about 3,800 acres, while its older park page says 3,794 acres and some prior accounts report 3,852. Until TPWD reconciles those figures in current visitor materials, about 3,800 acres is the reliable description, not an apparently exact area claim. The opening dates, fee, trails and accessibility details here are tied to the dated agency announcement."
    ],
    accessibilityNotes: "Nature Center: braille, tactile exhibits, narrated audio and ASL-interpreted content on borrowable tablets; TPWD announces an Extreme Motus all-terrain wheelchair and an adult changing table. Request specific route and equipment details from park staff at 830-535-4896. These features do not establish accessibility of every trail or campsite.",
    visitorFacts: [
      { topic: "access", label: "Opening dates", detail: "Not open for ordinary public use before December 1, 2026. Day use begins December 1, 2026; overnight stays begin December 15, 2026.", sourceUrl: PRESS, checkedAt: CHECKED },
      { topic: "admission", label: "Day-use admission", detail: "$6 daily for ages 13 and older. Children 12 and younger enter free; camping or other facility charges are additional.", sourceUrl: PARK, checkedAt: CHECKED },
      { topic: "hours", label: "Gate and office hours", detail: "Public-use hours: 7 a.m.–10 p.m. daily from the opening date. The reservation listing reports usual office staffing of 8:30 a.m.–4:30 p.m.; staff hours may vary.", sourceUrl: BOOKING, checkedAt: CHECKED },
      { topic: "reservations", label: "When reservations open", detail: "TPWD schedules online day-use and camping reservations to begin December 1, 2026. Day capacity may fill, so reserve ahead. Booking a stay does not permit arrival before December 15.", sourceUrl: PRESS, checkedAt: CHECKED },
      { topic: "camping", label: "Stay types and weather", detail: "TPWD identifies mini cabins, developed campsites and primitive backcountry sites. Choose the exact site for hookups and access. Red Bluff and trails may close in adverse weather.", sourceUrl: BOOKING, checkedAt: CHECKED },
      { topic: "accessibility", label: "Nature Center and assisted access", detail: "Braille, tactile displays, audio and ASL tablet interpretation are planned. TPWD announces an Extreme Motus wheelchair and adult changing table; call ahead about availability and suitable paths.", sourceUrl: PRESS, checkedAt: CHECKED },
      { topic: "parking", label: "Official entrance", detail: "Navigate to the park entrance at 7754 State Highway 46, Pipe Creek, TX 78063. Ask the park which parking area and trailhead suit your visit.", sourceUrl: MAP, checkedAt: CHECKED }
    ],
    visitorFaqs: [
      { question: "When does Albert and Bessie Kronkosky State Natural Area open?", answer: "TPWD announced day use for December 1, 2026 and overnight stays for December 15, 2026. These are future opening dates as of November 18, not permission to visit early.", sourceUrl: PRESS },
      { question: "When can I reserve a day pass or campsite?", answer: "Online reservations are scheduled to open December 1, 2026 for both day visits and overnight stays. The first overnight stays begin December 15. Reserve ahead because day-use capacity may fill.", sourceUrl: PRESS },
      { question: "How much does a day visit cost?", answer: "TPWD lists $6 daily per person ages 13 and up; children 12 and under enter free. Camping, cabins and group facilities have separate charges.", sourceUrl: PARK },
      { question: "How many miles of hiking trails are there?", answer: "The November 2026 agency release lists 26 miles of trails with different surfaces, widths and difficulties. Select an actual route using current park maps and conditions; not all trails will suit every visitor.", sourceUrl: PRESS },
      { question: "Can I camp in a cabin or primitive tent site?", answer: "The planned options include mini cabins and primitive camping as well as developed sites. Compare the specific reservable site description for water, hookups, restroom distance and access; overnight stays begin December 15.", sourceUrl: BOOKING },
      { question: "Where is the park entrance?", answer: "7754 State Highway 46, Pipe Creek, Texas 78063, roughly seven miles west of Interstate 10 along Highway 46 from Boerne. Use the signed entrance and current TPWD directions.", sourceUrl: MAP },
      { question: "What are the opening hours?", answer: "TPWD announces site hours of 7 a.m. to 10 p.m., seven days a week, once public day use begins. Office staffing hours are more limited and can vary.", sourceUrl: PRESS },
      { question: "Is the nature area wheelchair accessible?", answer: "The Nature Center has planned accessible interpretive features. TPWD also announces an all-terrain wheelchair and adult changing table. That does not mean every backcountry trail is step-free; contact park staff about the exact experience.", sourceUrl: PRESS },
      { question: "Can I bring a dog or go swimming?", answer: "Do not assume the springs are a swimming area; swimming is not advertised as an opening activity. Verify the site's current pet and trail restrictions with TPWD before bringing a dog.", sourceUrl: PARK },
      { question: "Why is this land protected?", answer: "The property protects rare Hill Country plants and animals, springs and seeps, and an archaeological record stretching back about 11,000 years. Its conservation history reaches back to the Kronkosky family gift accepted by Texas in 2011.", sourceUrl: HISTORY },
      { question: "Does rain affect hiking and primitive camping?", answer: "Yes. The official reservation page warns that trails and the Red Bluff Primitive Campground may close for adverse weather. Contact the park ahead of travel and do not rely on a dry-weather itinerary after storms.", sourceUrl: BOOKING },
      { question: "Why do some sources give different acreage?", answer: "TPWD's November 18, 2026 release says about 3,800 acres, while its older park detail uses 3,794 acres; some past accounts use 3,852. We use the agency's current rounded acreage instead of pretending the sources agree.", sourceUrl: PRESS }
    ],
    authorityGuide: {
      whyItMatters: "This is a rare transition from a decades-protected private Hill Country ranch to a state-managed natural area designed for public enjoyment without erasing the reasons it was protected. Steep limestone country, spring-fed niches, sensitive species and 11,000 years of archaeology shape the experience. Its December 2026 opening offers genuinely different ways to visit, but those options require choices about trail difficulty, reservation dates and conservation rules.",
      assessment: {
        recommendedVisit: "Start with a Nature Center visit and one trail chosen for your group's abilities; plan a half day or longer rather than rushing a complete 26-mile trail system.",
        physicalEffort: "Moderate to high",
        weatherExposure: "Mostly outdoors",
        planningLevel: "High",
        familyFit: "Nature Center plus a shorter, staff-recommended route is the best first choice for children; do not mistake the entire trail network for a family stroll.",
        firstTimeValue: "New access to an unusually well-preserved ranch and its rare-species habitat; reserve the date before choosing the trail."
      },
      itineraries: [
        { label: "First visit with the family", duration: "2–3 hours, from Dec. 1", steps: [
          "Reserve a day pass after online bookings open December 1 and check same-day weather or capacity notices.",
          "Start at the Nature Center to understand the preserve's wildlife, geology and accessible interpretation.",
          "Ask staff for a trail appropriate to the group's fitness, mobility and daylight; return before heat or fatigue becomes an issue."
        ] },
        { label: "Trail-focused day", duration: "Half to full day, from Dec. 1", steps: [
          "Review the official map and current trail conditions; do not substitute the total 26-mile network for a single route.",
          "Choose a route matched to available time, grade and surface. Bring water and arrange an earlier start when temperatures rise.",
          "Leave protected plants, habitats and archaeological features undisturbed; finish at the public entrance before the gate closes."
        ] },
        { label: "Overnight in the Hill Country", duration: "One night, from Dec. 15", steps: [
          "When bookings open December 1, compare mini cabins, developed sites and primitive locations; verify each site's services.",
          "Check overnight arrival instructions. Red Bluff primitive campers should reach the area at least two hours before dark.",
          "After a night at the preserve, consider Boerne or a separate Guadalupe River State Park visit, with its own reservation and entry rules."
        ] }
      ],
      sources: [
        { label: "TPWD opening announcement, Nov. 18, 2026", url: PRESS, scope: "Opening and reservation dates, trail mileage, lodging options, fees, hours, accessible exhibits and conservation species." },
        { label: "TPWD park page and headquarters", url: PARK, scope: "Official entrance, contact number, park background, admission and conservation." },
        { label: "TPWD official visitor map", url: MAP, scope: "Verified highway address and park entrance coordinates; obtain current trail information before travel." },
        { label: "Texas State Parks reservations", url: BOOKING, scope: "Site types, overnight policies, hours, weather closures and site-by-site amenities; check calendar for actual bookability." },
        { label: "TPWD history of the natural area", url: HISTORY, scope: "Archaeology, ranching land use, the Kronkosky family and the 2011 state donation." }
      ]
    }
  };
}
