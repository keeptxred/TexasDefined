import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

interface MajorEventOccurrenceWindow {
  label?: string;
  startDate: string;
  endDate?: string;
}

type MultiWindowMajorEventAuthorityRecord = MajorEventAuthorityRecord & {
  occurrenceWindows?: MajorEventOccurrenceWindow[];
};

const records: MultiWindowMajorEventAuthorityRecord[] = [
  {
    slug: "austin-marathon",
    name: "Austin Marathon",
    city: "Austin",
    countySlug: "travis",
    countyName: "Travis County",
    region: "hill-country",
    category: "sport",
    startDate: "2027-02-14",
    endDate: "2027-02-14",
    venue: "Downtown Austin",
    officialUrl: "https://youraustinmarathon.com/",
    sourceCheckedAt: "2026-11-27",
    whyItMatters: "The Ascension Seton Austin Marathon, Half Marathon & 5K brings tens of thousands of runners into downtown Austin for a course that passes major city landmarks and finishes near the Texas Capitol, making race weekend a significant Travis County sports and travel event.",
    planningSections: [
      { title: "The full and half marathon waves start at 7 a.m.; the 5K starts at 9 a.m.", body: "The dated February 14, 2027 schedule begins full and half marathon waves at 7 a.m. Full-marathon runners must start in waves 1–6, through 7:20 a.m.; later waves are half-marathon only. The 5K starts at 9 a.m.; wheelchair and elite distance-race start times remain TBD. Its 2027 focus includes a 50% discount for eligible active-duty and retired U.S. military members, administered through organizer registration terms; do not promise the discount without confirming eligibility." },
      { title: "Plan downtown access before race morning", body: "The course moves through central Austin and the organizer publishes traffic, staging and start-wave guidance. Recheck the race-weekend transportation information before driving into downtown because normal Sunday access patterns do not apply." },
      { title: "Use the full weekend schedule", body: "Local packet pickup is Thursday February 11, 10 a.m.–2 p.m. (no expo). Friday pickup is 11 a.m.–6:50 p.m.; Saturday pickup is 9 a.m.–5:50 p.m. The expo closes ten minutes after pickup each day. There is no Sunday packet pickup. Course closure is scheduled for 12:30 p.m. for the half and 2:20 p.m. for the full; use the organizer’s pace requirements and traffic guidance." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-travis", label: "Explore Travis County", description: "Extend race weekend into a broader Austin and Travis County visit." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas sports and destination events." },
    ],
    sources: [
      { label: "Austin Marathon official 2027 event page", url: "https://youraustinmarathon.com/" },
      { label: "Austin Marathon official 2027 weekend schedule", url: "https://youraustinmarathon.com/schedule/" },
    ],
  },
  {
    slug: "cowtown-marathon",
    name: "The Cowtown Marathon",
    city: "Fort Worth",
    countySlug: "tarrant",
    countyName: "Tarrant County",
    region: "prairies-lakes",
    category: "sport",
    startDate: "2027-02-27",
    endDate: "2027-02-28",
    occurrenceWindows: [
      { label: "Saturday races", startDate: "2027-02-27", endDate: "2027-02-27" },
      { label: "Sunday marathon, half & ultra", startDate: "2027-02-28", endDate: "2027-02-28" },
    ],
    venue: "Will Rogers Memorial Center",
    officialUrl: "https://cowtownmarathon.org/",
    sourceCheckedAt: "2026-11-15",
    whyItMatters: "The Cowtown is a two-day Fort Worth race weekend spanning family, 5K and 10K events on Saturday and the half marathon, full marathon and ultra on Sunday, drawing runners into the Cultural District and creating a substantial Tarrant County sports weekend.",
    planningSections: [
      { title: "Saturday has shorter races; Sunday has half, full and ultra", body: "The 2027 Cowtown event page confirms February 27 for the adult 5K, kids 5K and 10K, and February 28 for the half marathon, full marathon and 31.1-mile ultra. The 49th annual event starts at Will Rogers Memorial Center. These are distinct registrations; use the organizer's race-specific start-time and packet guidance before traveling." },
      { title: "Start and finish at Will Rogers", body: "The organizer identifies Will Rogers Memorial Center on West Lancaster Avenue as the start area for the in-person races. Review the current parking, road-closure and spectator guidance before race weekend." },
      { title: "Account for expo and pickup time", body: "Registration and packet-pickup activity occurs before the races, including Friday and Saturday expo access when available. Participants should verify their distance-specific pickup requirements before arriving." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-tarrant", label: "Explore Tarrant County", description: "Connect race weekend with Fort Worth and the wider county." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas race weekends and sports events." },
    ],
    sources: [
      { label: "The Cowtown official 2027 races page", url: "https://cowtownmarathon.org/races/" },
      { label: "The Cowtown official full marathon page", url: "https://cowtownmarathon.org/races/full-marathon/" },
      { label: "The Cowtown official 10K page", url: "https://cowtownmarathon.org/races/10k/" },
    ],
  },
  {
    slug: "bmw-dallas-marathon",
    name: "BMW Dallas Marathon",
    city: "Dallas",
    countySlug: "dallas",
    countyName: "Dallas County",
    region: "prairies-lakes",
    category: "sport",
    startDate: "2026-12-11",
    endDate: "2026-12-13",
    occurrenceWindows: [
      { label: "Friday Night Lights Mile", startDate: "2026-12-11", endDate: "2026-12-11" },
      { label: "Saturday 5K & 10K", startDate: "2026-12-12", endDate: "2026-12-12" },
      { label: "Sunday marathon, half & 50K", startDate: "2026-12-13", endDate: "2026-12-13" },
    ],
    venue: "Dallas City Hall Plaza",
    officialUrl: "https://dallasmarathon.com/",
    sourceCheckedAt: "2026-11-24",
    whyItMatters: "The BMW Dallas Marathon festival now spans three distinct race dates: the Friday Night Lights Mile at Dallas City Hall Plaza, Saturday's shorter-distance races, and Sunday's marathon, half marathon and 50K. Treating it as a two-day event would hide the organizer-confirmed December 11 opening race.",
    planningSections: [
      { title: "Distinguish all three official 2026 race dates", body: "The BMW Dallas Marathon organizers confirm the Friday Night Lights Mile at 7 p.m. on December 11 at Dallas City Hall Plaza, the 5K, 5K Walk and 10K on Saturday, December 12, and the marathon, half marathon, half-marathon walk and 50K on Sunday, December 13. This guide records three separate occurrence windows, rather than implying every race operates continuously across the weekend." },
      { title: "Use the real Sunday start corrals at Dallas City Hall", body: "The organizer locates start and finish at Marilla Street and South Akard Street at City Hall Plaza. Sunday December 13 events begin in four waves: A at 8 a.m. (corral closes 7:55), B at 8:10 (closes 8), C at 8:20 (closes 8:05), and D/walkers at 8:30 (closes 8:15). Corrals open at 7 a.m.; runners may move backward to a slower corral, not forward. Saturday start times differ by race and must not be copied from Sunday." },
      { title: "Bring the organizer-issued bag and collect packets before race day", body: "The Expo is at Kay Bailey Hutchison Dallas Convention Center Hall A, 650 S. Griffin St.; packet pickup is Friday December 11 from 11 a.m.–6 p.m. and Saturday December 12 from 9 a.m.–6 p.m., with no race-day pickup. Saturday and Sunday gear check begins at 6:30 a.m. and accepts only the clear organizer-issued participant bag obtained with the race packet, not personal luggage. Runners should distinguish the Friday Night Lights Mile from Saturday or Sunday races and confirm its dedicated instructions." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build a wider Dallas trip around race weekend." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas sports weekends." },
    ],
    sources: [
      { label: "BMW Dallas Marathon official events page", url: "https://dallasmarathon.com/dallas-marathon-festival/events" },
      { label: "BMW Dallas Marathon official Weekend Series", url: "https://dallasmarathon.com/dallas-marathon-festival/events/weekend-series" },
      { label: "BMW Dallas Marathon Sunday corral, aid-station and packet details", url: "https://dallasmarathon.com/dallas-marathon-festival/participants" },
      { label: "BMW Dallas Marathon official 2026 Friday Night Lights Mile", url: "https://dallasmarathon.com/dallas-marathon-festival/events/friday-night-lights-mile" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche32Server(slug: string): MultiWindowMajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
