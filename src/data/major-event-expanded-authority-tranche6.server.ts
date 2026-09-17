import { majorEventIndexRecords } from "./major-event-index";
import type { MajorEventAuthorityRecord, MajorEventPlanningSection, MajorEventRelatedLink, MajorEventSource } from "./major-event-authority.server";

interface ExpandedDetails {
  slug: string;
  whyItMatters: string;
  planningSections: MajorEventPlanningSection[];
  relatedLinks: MajorEventRelatedLink[];
  sources: MajorEventSource[];
}

const expandedDetails: ExpandedDetails[] = [
  {
    slug: "chappell-hill-bluebonnet-festival",
    whyItMatters: "Chappell Hill's 63rd annual Official State of Texas Bluebonnet Festival gives travelers a fixed weekend anchor during an otherwise weather-driven wildflower season. The April 10-11, 2027 event fills historic downtown with live music, hundreds of juried arts-and-crafts vendors and family activities, while its Washington County setting makes it easy to pair the festival with current wildflower reports, scenic drives and historic stops instead of treating the festival itself as a guarantee of peak bloom.",
    planningSections: [
      { title: "Start with what is confirmed for 2027", body: "The Chappell Hill Historical Society has published Saturday and Sunday, April 10-11, 2027 for the 63rd annual festival. The event is centered in historic downtown Chappell Hill on Main Street and the Poplar Lot off Poplar Street. Use those organizer-published dates and locations when booking travel; older 2026 schedules and third-party listings should not override the current festival page." },
      { title: "Know what the festival actually offers", body: "The organizer describes a family-friendly festival with live music, hundreds of juried arts-and-crafts vendors and activities for the entire family. This is a downtown festival first, not a ticket to a single bluebonnet field, so plan time for the vendor areas and historic core even if flower conditions are uneven." },
      { title: "Festival dates are fixed; bluebonnet timing is not", body: "Wildflower bloom timing moves with rainfall and temperature. Washington County's tourism office maintains a Wildflower Watch and updates its Wildflower Driving Map during the season, so check current conditions close to the trip rather than assuming the festival weekend will automatically be peak bloom." },
      { title: "Use the county wildflower map before chasing roadside photos", body: "Visit Brenham's seasonal map marks reported flower locations, identifies places where walking into the flowers is permitted and flags areas where trespassing is not allowed. It also includes a countywide Bluebonnet Trail Scenic Drive. Use the live map to choose stops and respect fences, private property and roadside safety." },
      { title: "Expect a busy historic downtown", body: "The Historical Society says the festival attracts thousands of visitors. Main Street and the Poplar Lot become the event core, so normal small-town traffic and parking patterns should not be assumed. The current 2027 festival page confirms the footprint but does not yet publish every operating detail; recheck the organizer's page for final parking, access and schedule guidance before leaving home." },
      { title: "Make the history part of the visit", body: "Festival proceeds and Historical Society work help preserve Chappell Hill's historic buildings. The Society maintains the museum, Providence Baptist Church, the Rock Store and other properties around downtown, and it specifically notes that Providence Baptist Church is open on both Saturday and Sunday during the Bluebonnet Festival. That makes the weekend more than a vendor-market stop." },
      { title: "Build a Washington County weekend instead of a one-stop drive", body: "Chappell Hill sits on Highway 290 between Houston and Austin and just east of Brenham. If you have a full day or weekend, combine the festival with the county's scenic bluebonnet drive and nearby historic destinations rather than spending the entire trip in the festival footprint." },
      { title: "Treat prior-year prices and hours as context only", body: "Recent editions have published specific festival hours, parking arrangements and other visitor rules, but those details can change from year to year. Until the Historical Society posts the final 2027 operating information, do not assume a 2026 admission, parking fee, RV policy or daily schedule still applies." },
      { title: "Check one last time before you go", body: "A few days before departure, verify the Historical Society's festival page, Washington County's Wildflower Watch and the weather forecast. That final check is the best way to catch schedule updates, parking instructions, flower conditions and any weather-related changes without confusing fixed festival dates with changing spring conditions." },
    ],
    relatedLinks: [
      { href: "/article/texas-bluebonnet-road-trip", label: "Texas bluebonnet road trip", description: "Turn current bloom reports into a flexible spring drive." },
      { href: "/article/texas-bluebonnet-festivals", label: "Texas bluebonnet festivals", description: "Compare Chappell Hill with Burnet, Ennis and other spring traditions." },
      { href: "/article/bluebonnets-near-houston", label: "Bluebonnets near Houston", description: "Plan the Highway 290 and Washington County side of a Houston-area flower trip." },
      { href: "/article/is-it-illegal-to-pick-bluebonnets-in-texas", label: "Bluebonnet etiquette and picking rules", description: "Separate the statewide myth from private-property, park and roadside rules." },
      { href: "/browse/counties#county-washington", label: "Explore Washington County", description: "Add Brenham, historic towns and scenic Washington County stops." },
      { href: "/events", label: "Texas events calendar", description: "Compare other spring festivals and event weekends." },
    ],
    sources: [
      { label: "Chappell Hill Historical Society — 2027 Bluebonnet Festival", url: "https://chappellhillhistoricalsociety.com/bluebonnet-festival/" },
      { label: "Chappell Hill Historical Society — historic sites", url: "https://chappellhillhistoricalsociety.com/historical-sites/" },
      { label: "Visit Brenham — Chappell Hill", url: "https://visitbrenhamtexas.com/beyond-brenham/chappell-hill/" },
      { label: "Visit Brenham — Wildflower Driving Map", url: "https://visitbrenhamtexas.com/things/wildflower-watch/wildflower-driving-map/" },
      { label: "Visit Brenham — Wildflower Watch", url: "https://visitbrenhamtexas.com/things/wildflower-watch/" },
    ],
  },
  {
    slug: "burnet-bluebonnet-festival",
    whyItMatters: "Burnet's Bluebonnet Festival of Texas is one of the Hill Country's signature spring weekends, pairing the state-flower season with a downtown arts-and-crafts festival, music, family events and related attractions around Burnet.",
    planningSections: [
      { title: "Plan for April 9-11, 2027", body: "The festival's current official brochure tells visitors to return April 9-11, 2027. Use those published dates when booking lodging or coordinating a Hill Country wildflower trip." },
      { title: "Choose festival activities before arrival", body: "Programming spans Historic Burnet Square and other nearby venues, with arts and crafts, food, music, family activities and special events. Review the current schedule because times and ticket requirements can vary by activity." },
      { title: "Leave room for seasonal conditions", body: "Bluebonnet bloom timing changes with weather. Treat the festival dates as fixed but check current wildflower reports separately if flower viewing is a major reason for the trip." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-burnet", label: "Explore Burnet County", description: "Pair the festival with lakes and Hill Country stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other bluebonnet-season events." }],
    sources: [{ label: "Bluebonnet Festival of Texas", url: "https://bluebonnetfestival.org/" }, { label: "Official 2026 brochure with 2027 return dates", url: "https://bluebonnetfestival.org/wp-content/uploads/2026/04/2026-Bluebonnet-Brochure.pdf" }],
  },
  {
    slug: "main-st-fort-worth-arts-festival",
    whyItMatters: "MAIN ST. Fort Worth Arts Festival turns a large stretch of downtown Fort Worth into a free outdoor arts district with nationally selected artists, live entertainment, food and heavy pedestrian activity across four days.",
    planningSections: [
      { title: "Use the published 2027 operating dates", body: "The official festival site lists April 15-18, 2027, with daily public hours beginning at 10 a.m. and later closing times Thursday through Saturday than on Sunday." },
      { title: "Plan transportation around downtown streets", body: "The event occupies Main Street and multiple downtown blocks. Review current street closures, parking and transit guidance before driving into the festival core." },
      { title: "Admission is free, purchases are not", body: "General festival attendance is free according to the organizer. Art, food, beverages and other purchases are separate, so visitors can structure the day around browsing, performances or collecting." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Build a broader Fort Worth visit." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas arts festivals." }],
    sources: [{ label: "MAIN ST. Fort Worth Arts Festival", url: "https://mainstreetartsfest.org/" }, { label: "Official festival schedule and map", url: "https://mainstreetartsfest.org/schedule-map/" }],
  },
  {
    slug: "buc-days",
    whyItMatters: "Buc Days is a multi-weekend Corpus Christi festival built around Rodeo Corpus Christi, carnival attractions, parades, concerts, professional bull riding and waterfront-area activity rather than a single one-day event.",
    planningSections: [
      { title: "Anchor the trip to April 29-May 9, 2027", body: "The official Buc Days site currently publishes April 29 through May 9, 2027 for the overall festival. Individual rodeo, parade, concert and attraction schedules sit within that window." },
      { title: "Pick the event before buying travel", body: "Rodeo Corpus Christi, professional bull riding, parades, carnival attractions and other programming can occur on different dates and at different times. Check the live schedule for the specific event you want to see." },
      { title: "Review parking and venue rules", body: "The organizer publishes maps, parking guidance and venue-specific policies for the festival grounds and Hilliard Center Arena. Confirm those details before arrival, especially for ticketed arena events." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-nueces", label: "Explore Nueces County", description: "Add Corpus Christi and coastal stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other Gulf Coast events." }],
    sources: [{ label: "Buc Days official site", url: "https://bucdays.com/" }, { label: "Buc Days official schedule", url: "https://bucdays.com/schedule/" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche6Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
