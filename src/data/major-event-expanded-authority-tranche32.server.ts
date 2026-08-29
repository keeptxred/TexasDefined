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
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Ascension Seton Austin Marathon, Half Marathon & 5K brings tens of thousands of runners into downtown Austin for a course that passes major city landmarks and finishes near the Texas Capitol, making race weekend a significant Travis County sports and travel event.",
    planningSections: [
      { title: "Anchor the trip on Sunday, February 14", body: "The organizer publishes the 2027 marathon, half marathon and 5K for Sunday, February 14, with the main marathon and half-marathon waves beginning at 7 a.m. The Friday and Saturday programming is packet pickup and race-weekend preparation rather than additional race days." },
      { title: "Plan downtown access before race morning", body: "The course moves through central Austin and the organizer publishes traffic, staging and start-wave guidance. Recheck the race-weekend transportation information before driving into downtown because normal Sunday access patterns do not apply." },
      { title: "Use the full weekend schedule", body: "Packet pickup is scheduled Friday and Saturday, with a Friday shakeout run and the races on Sunday. Runners should build travel around the official pickup window instead of arriving on race morning without materials." },
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
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "The Cowtown is a two-day Fort Worth race weekend spanning family, 5K and 10K events on Saturday and the half marathon, full marathon and ultra on Sunday, drawing runners into the Cultural District and creating a substantial Tarrant County sports weekend.",
    planningSections: [
      { title: "Choose the correct race day", body: "The organizer places the 10K, adult 5K and Kids 5K on Saturday, February 27, while the half marathon, full marathon and ultra run Sunday, February 28. Texas Defined keeps those as separate occurrence windows rather than presenting the weekend as continuous racing." },
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
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    occurrenceWindows: [
      { label: "Saturday 5K & 10K", startDate: "2026-12-12", endDate: "2026-12-12" },
      { label: "Sunday marathon, half & 50K", startDate: "2026-12-13", endDate: "2026-12-13" },
    ],
    venue: "Dallas City Hall Plaza",
    officialUrl: "https://dallasmarathon.com/",
    sourceCheckedAt: "2026-08-29",
    whyItMatters: "BMW Dallas Marathon weekend combines Saturday shorter-distance races with Sunday's marathon, half marathon and 50K through central Dallas, bringing a major field of runners and spectators into downtown for one of North Texas' signature road-racing weekends.",
    planningSections: [
      { title: "Treat Saturday and Sunday as separate race windows", body: "The organizer schedules the 5K, 5K Walk and 10K on Saturday, December 12, and the marathon, half marathon, half-marathon walk and 50K on Sunday, December 13. The guide and structured data therefore describe two real race days instead of one continuous event window." },
      { title: "Use Dallas City Hall Plaza as the race anchor", body: "The organizer says BMW Dallas Marathon events begin and end in downtown Dallas at Dallas City Hall Plaza. Plan parking, transit and spectator movement around the race-weekend road environment rather than normal downtown access." },
      { title: "Pick up materials before race day", body: "Official participant guidance lists packet pickup at the Kay Bailey Hutchison Convention Center on Friday and Saturday and says there is no race-day pickup. Build that requirement into arrival timing." },
    ],
    relatedLinks: [
      { href: "/browse/counties#county-dallas", label: "Explore Dallas County", description: "Build a wider Dallas trip around race weekend." },
      { href: "/events", label: "Texas events calendar", description: "Compare other major Texas sports weekends." },
    ],
    sources: [
      { label: "BMW Dallas Marathon official events page", url: "https://dallasmarathon.com/dallas-marathon-festival/events" },
      { label: "BMW Dallas Marathon official Weekend Series", url: "https://dallasmarathon.com/dallas-marathon-festival/events/weekend-series" },
      { label: "BMW Dallas Marathon official race-weekend information", url: "https://dallasmarathon.com/dallas-marathon-festival/participants" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche32Server(slug: string): MultiWindowMajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
