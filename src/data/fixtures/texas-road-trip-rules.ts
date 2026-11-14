import roadTrip from "@/assets/road-trip.jpg";
import type { Article, ArticleBlock } from "../types";

const p = (text: string): ArticleBlock => ({ type: "paragraph", text });
const h = (text: string): ArticleBlock => ({ type: "heading", text });
const list = (...items: string[]): ArticleBlock => ({ type: "list", items });

/**
 * Rescues the exact legacy GSC /article/texas-road-trip-rules URL with an
 * independently useful, source-attributed evergreen guide. Official operator
 * sources reviewed November 13, 2026; prices, closure notices, vehicle law
 * and toll-account policies must be checked against the live agency sites.
 */
export const texasRoadTripRulesArticle: Article = {
  id: "evergreen-texas-road-trip-rules",
  brandId: "texasdefined",
  slug: "texas-road-trip-rules",
  title: "Texas Road Trip Rules: What to Check Before You Drive",
  dek: "Texas road trips are shaped by more than speed limits: passing lanes, emergency vehicles, flooded low-water crossings, electronic tolls and long distances between services. Use the official state sources and a region-by-region checklist.",
  category: "road-trips",
  hero: {
    src: roadTrip,
    alt: "Two-lane Texas highway approaching a distant horizon, with wide shoulders and open land",
    width: 1600,
    height: 1067,
  },
  authorId: "a-marisol",
  publishedAt: "2026-11-13",
  updatedAt: "2026-11-13",
  readingMinutes: 15,
  tags: [
    "Texas road trip rules", "Texas highway driving", "Texas road safety",
    "Move Over or Slow Down", "TxDOT", "DriveTexas", "Texas toll tags",
    "low water crossings", "Texas travel planning", "Texas road trip checklist",
  ],
  featured: false,
  sourceName: "Texas Department of Transportation — Driving safety and laws",
  sourceUrl: "https://www.txdot.gov/safety/driving-laws/tips-highway-driving.html",
  internalLinks: [
    { href: "/explore/road-trips", label: "Choose a Texas road trip", description: "Find regional itineraries and distances before filling a driving day with stops." },
    { href: "/article/texas-farm-to-market-roads-explained", label: "Why Texas FM roads work differently", description: "Decode Farm-to-Market route numbers and rural-road expectations." },
    { href: "/article/texas-road-trip-stops-worth-the-detour", label: "Texas road-trip stops worth the detour", description: "Choose museums, nature stops and towns without relying on one ambitious drive time." },
    { href: "/explore/top-attractions/road-trips", label: "Plan road-trip attractions", description: "Pair official access rules with destination-specific visiting guidance." },
    { href: "/texas-drivers-license", label: "Texas driver's license guide", description: "Driver identification and Texas residency questions require current DPS eligibility information." },
    { href: "https://drivetexas.org/", label: "DriveTexas — live conditions and closures", description: "TxDOT's official roadway condition and travel disruption map for an actual departure." },
    { href: "https://www.txdot.gov/safety/driving-laws/tips-highway-driving.html", label: "TxDOT highway driving rules", description: "Official passing-lane, fatigue, truck-blind-spot and speed guidance." },
    { href: "https://www.txdot.gov/safety/traffic-safety-campaigns/move-over-or-slow-down.html", label: "TxDOT Move Over or Slow Down", description: "Official current vehicle categories and mandatory roadside speed or lane adjustment." },
    { href: "https://www.txdot.gov/safety/severe-weather/flash-floods.html", label: "TxDOT flash floods and low-water crossings", description: "Why to turn around, how to interpret barricades and risks from submerged pavement." },
    { href: "https://www.txdot.gov/safety/driving-laws/seat-belt-car-seat.html", label: "TxDOT seat belts and child restraints", description: "Official guidance for the driver, every passenger and age/size-appropriate restraints." },
    { href: "https://www.dps.texas.gov/news/dps-increases-patrols-statewide-enforce-seat-belt-use-prevent-distracted-driving", label: "Texas DPS on distracted driving", description: "Current official texting restriction and occupant safety reminders." },
    { href: "https://www.txdot.gov/discover/toll-roads-managed-lanes/paying-tolls/how-tags-work.html", label: "TxDOT how toll tags work", description: "Official TxTag and HCTRA account guidance; a tag is not portable among vehicles." },
    { href: "https://www.txdot.gov/discover/toll-roads-managed-lanes/txdot-toll-roads/central-us-interoperability.html", label: "Interoperable toll tags", description: "Official partner agency list and limits for out-of-state toll-road travel." },
    { href: "https://www.dps.texas.gov/section/highway-patrol/travel-tips", label: "DPS travel and traffic stop guidance", description: "Official practical steps if stopped on the road." },
  ],
  relatedCollections: [],
  relatedDestinations: [],
  body: [
    p("Texas can turn an ordinary vacation plan into a long driving day. The distance from Dallas to a Hill Country ranch road is not the same problem as a drive from Del Rio toward Big Bend, and a highway that looks open on a map can meet a flooded creek, a work-zone detour or a privately controlled entrance. Before you commit to a route, separate three questions: what state driving rules apply, what roads are actually open today, and what the destination operator will let you do when you get there."),
    p("This guide is written for people planning real drives rather than studying for a licensing exam. The law matters, but so do electronic toll accounts, wildlife after dark, fuel gaps, roadside access and the fact that an entrance labeled 'state park' on an old map may be closed or have a booking requirement. Statutes and operational rules change; the linked agency guidance is more important than an old cached travel blog when the details disagree."),
    h("Before leaving: the five checks that actually change a Texas driving plan"),
    list(
      "Open DriveTexas.org on your departure day. Check the exact counties and route segments for construction, closures, crashes, flooding or detours, then recheck when weather changes.",
      "Review the destination operator's current visitor-access page—not just a map pin. Confirm entrances, day-use limits, reservations, timed entry, vehicle restrictions and whether a park or museum is temporarily closed.",
      "Set the toll preference deliberately. If your route includes a toll road, confirm that the specific vehicle's windshield tag, registration plate and billing account are correct; plan an alternate route if you do not want tolls.",
      "Put the first fuel, water and restroom stop on your map. Long rural stretches, late-night closures and poor mobile reception are more relevant west of large cities than the straight-line mileage suggests.",
      "Check the weather along the entire corridor. A clear sky at the hotel does not rule out a storm or closed low-water crossing at the next county line."
    ),
    p("These checks take a few minutes when done before leaving. They matter more than optimistic arrival-time predictions because they distinguish a route you can safely follow from one that happens to fit on a phone screen."),
    h("Speed limits: the sign is the limit, not a promise of safe speed"),
    p("Texas Department of Transportation guidance is explicit that drivers must obey the posted speed limit and reduce speed as conditions require. Fast rural highways can still have slow farm equipment, animals, sharp curves, work zones and cross traffic. A road might legally permit a higher posted speed when dry but demand a much lower speed in rain, fog or an unexpected traffic queue."),
    p("Do not use a remembered statewide maximum speed as a substitute for roadside signs. Limits vary by roadway section. That matters when a divided highway becomes a surface street on the edge of a small town, when temporary work-zone signs appear and when a narrow scenic stretch has no passing room. In rain or fog, leave extra following distance rather than treating the number on the speed-limit sign as a target."),
    h("Keep right when the left lane is marked for passing"),
    p("TxDOT's highway-driving instructions describe signs reading 'Left Lane for Passing Only.' On a road bearing that restriction, complete a safe pass and move back to the right after clearing the vehicle. The point is not that the right lane must always be driven at one fixed speed: it is to avoid using a posted passing-only lane as a permanent cruising lane and to keep faster traffic from bunching up."),
    p("Roads with two lanes in opposite directions demand a different judgment. Do not cross into an oncoming lane around a curve, at a hillcrest or where passing is prohibited simply because a recreational vehicle is moving slowly. On an unfamiliar FM or RM road, finding a lawful, visible passing stretch may take patience. TxDOT also advises extra space around large trucks: their blind spots and stopping distance make a quick cut across the front particularly risky."),
    h("Move Over or Slow Down: the roadside rule includes more than police cars"),
    p("A stopped vehicle displaying the qualifying flashing overhead lights can trigger Texas's Move Over or Slow Down requirement. According to current TxDOT guidance, the law covers law enforcement, emergency responders, tow trucks, TxDOT vehicles, utility service trucks, municipal waste vehicles and, following the September 1, 2025 expansion, animal control and parking enforcement vehicles. A driver should move out of the lane adjacent to the stopped qualifying vehicle when the roadway permits a safe lane change."),
    p("If the lane change cannot safely be made, TxDOT says to reduce speed to 20 miles per hour below the posted limit; on a road posted at 25 mph or less, reduce speed to 5 mph. This is not a 'slow down a little' suggestion. For example, approaching a qualifying stopped crew on a 70-mph posted road without a safe lane change means reducing to 50 mph, subject to any still-lower speed necessary for actual conditions. The official law and list of covered vehicles should be checked before travel because the categories have changed."),
    p("If another driver needs to merge away from a stopped crew, do not accelerate into the gap to block them. Giving workers and stranded vehicles predictable space is the purpose of the rule. Texas DPS's 2026 enforcement releases make clear that first-offense penalties can be substantial; a traveler should not rely on older articles quoting previous fine levels."),
    h("Flooded low-water crossings are a route failure, not a challenge"),
    p("The Hill Country, Central Texas, parts of the Gulf Coast and the Trans-Pecos can experience fast flash flooding. A creek that was harmless on the way into a town can cover the only practical road out after intense upstream rain. TxDOT advises never driving through standing or moving floodwater and never driving around a barrier closing a low-water crossing. That is not only a safety decision; crossing a barricaded flooded road can carry serious legal penalties."),
    p("The problem is what drivers cannot see: washed-out pavement, a submerged bridge approach, moving debris and unexpectedly strong current. Texas has lost vehicles and lives in surprisingly shallow moving water. Do not attempt to judge safe depth from the height of an SUV or pickup. If water covers the roadway, reverse course to higher ground, follow the closure map, and delay the visit rather than improvising an unmarked shoulder or ranch road."),
    p("Do not expect a navigation app to learn about every closure at the same instant the barrier is placed. Use DriveTexas and local emergency instructions. In an active storm, there may be no good alternate crossing; the correct plan is to wait on safe, dry ground rather than drive through a closure."),
    h("Phones, navigation and everyone in the vehicle"),
    p("Texas law prohibits a driver from reading, writing or sending an electronic message on a portable wireless device while the motor vehicle is moving, subject to statutory exceptions. DPS recommends that a passenger manage navigation when possible. Set the destination before pulling onto the road and use hands-free guidance without taking your attention from the lane. School zones and younger drivers can have additional device restrictions; do not assume a statewide texting rule is the only restriction that applies."),
    p("TxDOT requires drivers and passengers to wear seat belts. Children must use suitable child safety seats or boosters under the applicable Texas requirements and manufacturer fit limits; safe restraint depends on age, height, weight and the seat's instructions, not merely a birthday. Before a long family drive, check the harness fit, seat installation and the official TxDOT child-seat guidance. Put accessible water, snacks and car-sickness supplies within reach without leaving heavy items loose in the cabin."),
    h("Tolls: one windshield sticker does not mean one account works forever"),
    p("Dallas–Fort Worth, Houston, Austin and several other metros have toll roads and managed lanes. TxDOT explains that TxTag account servicing moved to the Harris County Toll Road Authority, while an existing properly installed TxTag can still be used on supported roads with an active funded account. Customers needing a new or replacement tag are directed to an EZ TAG through HCTRA. The tag must remain on its assigned vehicle rather than being moved between windshields."),
    p("Texas has multiple issuing agencies, including HCTRA, NTTA and others, with agreements for interoperability across several states. That does not make every private express lane or foreign toll route interchangeable. Check the specific facility, the issuing agency's rules, plate information, rental-car agreement and balance. If you are driving a rental car, the rental company may have its own toll-processing charges; the road's posted toll and the rental administrator's fee are separate decisions."),
    h("Rural Texas: fuel, animals, heat and weak signal"),
    p("Outside the interstates, some stretches have few open service stations. A town on the map may have only one fuel option and its hours may not match your arrival. Treat the fuel gauge as a planning tool: leave a major town with a comfortable margin, confirm the next available stop and download offline maps. A travel app cannot help much when the phone has no coverage and a road forks between ranch gates."),
    p("Deer, livestock and other animals can enter the road, particularly around dawn, dusk and after dark. Reduce speed when sight distance is poor; do not swerve abruptly across traffic or into a ditch to avoid a small animal. Large animals require even more stopping distance. Scenic roads often lack shoulders and can have cattle guards or loose gravel near driveways. Their best photographic pullout may be a legal public area several miles away, not the travel lane."),
    p("Heat changes the consequences of a breakdown. Carry drinking water, basic first-aid supplies, a charged phone or backup power source and an actual roadside assistance plan. On long westbound routes, tell someone your intended route and expected stop rather than simply sharing a destination pin. Never rely on a locked vehicle to keep children or pets cool while you run inside."),
    h("Public roadside access is not the same as permission to enter"),
    p("A public highway can pass beside privately owned ranches, fenced river frontage and commercial attractions without making those properties public. Do not open a gate, drive onto ranch land, park across a driveway or assume a trail that appears on a map is public. At state parks, national parks, preserves and historic sites, read the actual operator's access status. Some require day-use reservations, guided tours, an entry permit or advance check-in; some former public sites remain closed."),
    p("A 'state park' name embedded in an old search result is not proof that a visitor can enter today. For example, an historic attraction's grounds may be closed while a different public access point nearby operates normally. TexasDefined keeps a visitor guide distinct from an authority's current entry notice for exactly this reason. The official operator page controls your decision at the gate."),
    h("Choose a route by driving conditions, not by a row of pins"),
    p("Consider three realistic trip patterns. A Dallas-to-Hill-Country weekend on interstate and state highways can work with a few planned stops, but a dozen scattered scenic detours will consume the daylight. A Guadalupe River or Llano County drive is sensitive to low-water crossings, parking restrictions and local weekend traffic. A Del Rio-to-Big Bend route has wide-open miles, thinner services and far fewer opportunities to correct a wrong turn than an I-35 corridor trip."),
    p("A map's estimated drive time rarely includes museum visits, meals, park entrance procedures, fuel, weather delays or the time needed to photograph an overlook from a lawful pullout. Give each main stop a realistic window and one backup. On a demanding rural leg, favor a smaller number of worthwhile stops over the urge to collect every nearby pin."),
    h("Two useful checklists: an hour before departure and after the next county"),
    list(
      "One hour before leaving: verify the road segments in DriveTexas; scan weather alerts along the route; confirm the destination's latest official access notice; verify toll account and vehicle plate; identify the next realistic fuel stop.",
      "At each long break: recheck closures and weather; inspect fuel and tires; move any loose cargo; plan the next leg around daylight and actual service hours, not the original ETA.",
      "If you encounter a flooded road: do not cross it or drive around a barricade. Turn around to safe ground, check official closure information, and tell anyone expecting you that the route changed.",
      "If stopped on the shoulder: activate hazards, move out of active traffic if safely possible, call for help and watch for passing vehicles. Follow first-responder instructions rather than standing near the traffic lane.",
      "If your itinerary includes a site that is closed or private: use the official alternative, reschedule, or skip it. A missing attraction is better than trespassing, missing a ferry, or trying a dangerous crossing."
    ),
    h("What this guide does—and does not—settle"),
    p("This is a practical overview, not a substitute for Texas statutes, a law-enforcement instruction, a traffic-control device or the latest operator notice. TxDOT and DPS are the best starting points for the traffic rules discussed here. Individual park permits, rental-car toll charges, school-zone devices, traffic incidents and weather alerts require current site-specific information. The official links above were reviewed on November 13, 2026; recheck the relevant agency before a future trip, particularly after legislative changes."),
  ],
};
