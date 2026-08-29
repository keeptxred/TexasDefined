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
      { title: "Separate fair days from rodeo nights", body: "The fair runs September 10-19, while the official 2026 PRCA Pro Rodeo is scheduled September 15-19 at 7:30 p.m. Choose the date around the program you want to see." },
      { title: "Know what the rodeo ticket covers", body: "The Expo Center states that a rodeo ticket also serves as grounds admission for that day, so check the current ticket page before buying duplicate admission." },
      { title: "Plan for a large fairground footprint", body: "Allow enough time for livestock exhibits, carnival areas and other fair programming before a nighttime rodeo performance rather than arriving at arena start time." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-taylor", label: "Explore Taylor County", description: "Build more of an Abilene-area trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas fairs and rodeos." }],
    sources: [{ label: "Expo Center of Taylor County fair schedule", url: "https://www.taylorcountyexpocenter.com/location/all-facilities" }, { label: "West Texas Fair & Rodeo PRCA schedule", url: "https://www.taylorcountyexpocenter.com/events/wtfr/prca-rodeo" }],
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
      { title: "Choose competition nights or the full run", body: "Competitive performances are scheduled Thursday through Saturday, with the awards program on Sunday. Use the official lineup to decide whether a single night or multi-night pass fits your trip." },
      { title: "Arrive early in downtown Marshall", body: "The organizer notes limited parking around the square and no dedicated venue lot, so arrive earlier than the 6 p.m. doors and plan to walk from downtown parking." },
      { title: "Include the September 30 welcome event if useful", body: "The official schedule includes a parade of international flags and a free outdoor concert the evening before the ticketed competition begins." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-harrison", label: "Explore Harrison County", description: "Add more East Texas stops around Marshall." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas music festivals." }],
    sources: [{ label: "Texas Sounds official 2026 schedule", url: "https://www.texassounds.org/schedule/" }, { label: "Texas Sounds official venue guide", url: "https://www.texassounds.org/venue/" }],
  },
  {
    slug: "terlingua-international-chili-championship",
    whyItMatters: "The CASI Terlingua International Chili Championship combines competitive chili, live entertainment and a remote Big Bend setting, so travel logistics matter much more than they do for a city festival.",
    planningSections: [
      { title: "Treat Terlingua logistics as part of the event", body: "Rancho CASI de los Chisos is outside a major metro area. Decide on lodging or camping, fuel and supplies before making the drive into the Big Bend region." },
      { title: "Use the full event window", body: "CASI lists November 3-7, 2026 for the championship gathering, with the championship itself tied to the first Saturday of November. Review the master schedule for the days you plan to attend." },
      { title: "Confirm camping and entry rules", body: "The event has its own ticketing, vendor and campground guidance. Check the current organizer information rather than relying on general Terlingua travel advice." },
    ],
    relatedLinks: [{ href: "/browse/counties#county-brewster", label: "Explore Brewster County", description: "Plan the wider Big Bend trip." }, { href: "/events", label: "Texas events calendar", description: "Compare other Texas food events." }],
    sources: [{ label: "CASI Terlingua International Chili Championship official page", url: "https://www.casichili.net/ticc-home-page.html" }, { label: "CASI organization and championship background", url: "https://www.casichili.net/about-casi.html" }],
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
