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
    slug: "west-texas-fair-rodeo",
    whyItMatters: "The West Texas Fair & Rodeo is a ten-day Abilene fairground event with livestock, carnival and entertainment programming, with the PRCA rodeo concentrated in the second half of the run.",
    planningSections: [
      { title: "The 2027 fair dates are published; 2027 rodeo sessions are not yet confirmed", body: "The Expo Center of Taylor County now lists the West Texas Fair & Rodeo for September 9–18, 2027. Its PRCA rodeo details page still advertises September 15–19, 2026 at 7:30 p.m., an already completed season. That earlier rodeo timetable is not a verified 2027 performance calendar. Recheck the specific rodeo night and time with the organizer before planning an arena visit, even though the broader fair window is confirmed." },
      { title: "Know what the rodeo ticket covers", body: "The Expo Center states that a rodeo ticket also serves as grounds admission for that day, so check the current ticket page before buying duplicate admission." },
      { title: "Plan for a large fairground footprint", body: "Allow enough time for livestock exhibits, carnival areas and other fair programming before a nighttime rodeo performance rather than arriving at arena start time." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-taylor", label: "Explore Taylor County", description: "Build more of an Abilene-area trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas fairs and rodeos." }],
    sources: [{ label: "Expo Center of Taylor County confirmed September 9–18, 2027 fair dates", url: "https://www.taylorcountyexpocenter.com/location/all-facilities" }, { label: "PRCA rodeo page (2026 historical only; not 2027 schedule)", url: "https://www.taylorcountyexpocenter.com/events/wtfr/prca-rodeo" }],
  },
  {
    slug: "denton-blues-festival",
    whyItMatters: "The Denton Blues Festival compresses its 2026 program into one free day in Quakertown Park, making it an easy North Texas music anchor without a multi-day ticket commitment.",
    planningSections: [
      { title: "Plan for the full one-day format", body: "The 2026 festival runs from 10 a.m. to 10:30 p.m. on September 19, so decide whether to settle in for a long day or target the acts you most want to hear." },
      { title: "Bring what a park festival requires", body: "The organizer encourages visitors to bring lawn chairs. Review current event guidance before packing so you know what is permitted in Quakertown Park." },
      { title: "Use downtown Denton around the festival", body: "The park is close to central Denton, making dining and other downtown stops practical before or after the music." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-denton", label: "Explore Denton County", description: "Plan more North Texas stops." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas music events." }],
    sources: [{ label: "Denton Blues Festival official site", url: "https://www.dentonbluesfest.com/" }, { label: "Official 2026 headliner announcement and festival hours", url: "https://www.dentonbluesfest.com/news-updates/mathias-lattin-headliner" }],
  },
  {
    slug: "texas-sounds-country-music-awards",
    whyItMatters: "Texas Sounds brings international country performers to a small historic theater in Marshall, creating a distinctive East Texas music weekend built around three competition nights and a Sunday awards program.",
    planningSections: [
      { title: "Use the confirmed 2027 festival window, not archived 2026 performance hours", body: "The Texas Sounds organizer now advertises September 29–October 3, 2027 in Marshall. Its main site also has an older body headed October 1–4, 2026, and the schedule page still describes 2026 competition and awards dates. That archived day-by-day breakdown is not evidence for the 2027 program. Confirm your exact selected 2027 performance and actual admission details through the organizer rather than copying prior-year doors, awards or ticket hours." },
      { title: "Arrive early in downtown Marshall", body: "The organizer notes limited parking around the square and no dedicated venue lot, so arrive earlier than the 6 p.m. doors and plan to walk from downtown parking." },
      { title: "Confirm the actual 2027 welcome events separately", body: "The organizer now identifies September 29, 2027 as its international country-music awards day and offers multiple-night ticket categories, but the existing schedule page retains a September 30, 2026 international flag parade and street concert. Do not treat the 2026 parade or an old ticket product as a confirmed free 2027 gathering. Arrange Marshall lodging around confirmed performances, not a carried-forward program." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harrison", label: "Explore Harrison County", description: "Add more East Texas stops around Marshall." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas music festivals." }],
    sources: [{ label: "Texas Sounds official 2027 festival dates and ticket categories (old 2026 copy remains on page)", url: "https://www.texassounds.org/" },
      { label: "Texas Sounds detailed schedule (contains archived 2026 event descriptions)", url: "https://www.texassounds.org/schedule/" }, { label: "Texas Sounds official venue guide", url: "https://www.texassounds.org/venue/" }],
  },
  {
    slug: "terlingua-international-chili-championship",
    whyItMatters: "The CASI Terlingua International Chili Championship combines competitive chili, live entertainment and a remote Big Bend setting, so travel logistics matter much more than they do for a city festival.",
    planningSections: [
      { title: "Treat Terlingua logistics as part of the event", body: "Rancho CASI de los Chisos is outside a major metro area. Decide on lodging or camping, fuel and supplies before making the drive into the Big Bend region." },
      { title: "60th 2027 TICC finale Saturday November 6", body: "CASI's 2026 winners announcement expressly announces the next 60th championship gathering for November 2–6, 2027. Elsewhere on the same page it refers to a November 1 start, while the current event homepage still describes the 59th 2026 event and 2026 entertainment. The CASI competition rules fix its chili championship on the first Saturday in November, which falls November 6, 2027. Confirm whether November 1 is an organizer setup day before planning early public admission." },
      { title: "Confirm camping and entry rules", body: "The event has its own ticketing, vendor and campground guidance. Check the current organizer information rather than relying on general Terlingua travel advice." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-brewster", label: "Explore Brewster County", description: "Plan the wider Big Bend trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas food events." }],
    sources: [{ label: "CASI Terlingua International Chili Championship official page", url: "https://www.casichili.net/ticc-home-page.html" }, { label: "CASI 2026 winners with 60th 2027 announcement and conflicting setup date", url: "https://www.casichili.net/2026-ticc-winners.html" },
      { label: "CASI championship rules and Saturday cookoff", url: "https://www.casichili.net/uploads/3/7/7/2/37727781/rules_2025-2027-2.pdf" }],
  },
  {
    slug: "austin-celtic-festival",
    whyItMatters: "Austin Celtic Festival combines music, dance, workshops, history demonstrations and Highland Games at Pioneer Farms, making it more than a concert and better suited to a planned daytime visit.",
    planningSections: [
      { title: "Choose Saturday or Sunday by hours", body: "The organizer lists noon to 7 p.m. Saturday and noon to 6 p.m. Sunday for November 7-8, 2026. Match the day to the performances and activities you want to see." },
      { title: "Buy admission before arrival", body: "The official ticket page says there are no ticket sales at the gate, so purchase online before traveling to Pioneer Farms." },
      { title: "Review the Pioneer Farms rules", body: "The festival FAQ includes current guidance on pets and other visitor questions. Read it before packing for the outdoor venue." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Build more Austin-area stops around the festival." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas cultural events." }],
    sources: [{ label: "Austin Celtic Festival official site", url: "https://www.austincelticfestival.com/" }, { label: "Austin Celtic Festival official tickets", url: "https://www.austincelticfestival.com/tickets" }, { label: "Austin Celtic Festival visitor FAQ", url: "https://www.austincelticfestival.com/faqs" }],
  },
];

const detailBySlug = new Map(expandedDetails.map((detail) => [detail.slug, detail]));
const indexBySlug = new Map(majorEventIndexRecords.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche4Server(slug: string): MajorEventAuthorityRecord | null {
  const event = indexBySlug.get(slug);
  const detail = detailBySlug.get(slug);
  if (!event || !detail) return null;
  const { slug: _slug, ...authorityDetail } = detail;
  return { ...event, ...authorityDetail };
}
