import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "gears-beers-johnson-city",
    name: "5th Annual Gears & Beers Car and Motorcycle Show",
    city: "Johnson City",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "culture",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    dateNote: "The official 2026 show is Saturday, October 24 in downtown Johnson City. Explore Johnson City lists the public event window as 9 a.m.-3 p.m.; the organizer lists participant check-in from 7:30-9:30 a.m., judging from 10:30 a.m.-12:30 p.m., raffle announcements at 1:30 p.m. and awards from 2-2:30 p.m.",
    venue: "Downtown Johnson City / Pecan Street Brewing",
    officialUrl: "https://jctxcarshow.com/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "Gears & Beers combines Johnson City's downtown courthouse setting, local craft beer and live music with a serious regional car-and-motorcycle show. The fifth annual event specifically includes vintage, antique, classic and custom cars, trucks and motorcycles, plus six motorcycle categories tied into the local enthusiast community around the Texas Vintage Motorcycle Museum.",
    planningSections: [
      {
        title: "The public show runs 9 a.m.-3 p.m.",
        body: "Explore Johnson City publishes a 9 a.m.-3 p.m. event window for Saturday, October 24. Vehicle participants have an earlier 7:30-9:30 a.m. check-in period, followed by judging from 10:30 a.m.-12:30 p.m., raffle announcements at 1:30 p.m. and awards from 2-2:30 p.m.",
      },
      {
        title: "Participant registration is not the same as spectator admission",
        body: "The organizer currently lists vehicle pre-registration at $35 with a T-shirt and beer token, while day-of-show vehicle registration is $45 and subject to available space. The official pages reviewed do not publish a separate spectator admission price, so Texas Defined does not present the participant fees as general-admission tickets.",
      },
      {
        title: "Motorcycles are a major part of the 2026 show",
        body: "The official show site says six dedicated motorcycle categories are returning and directs motorcycle questions to Gordon Massie, owner of the Texas Vintage Motorcycle Museum in Johnson City. That makes the event a natural companion to the museum for riders and collectors.",
      },
      {
        title: "Use the same-day Jazz Fest as the evening plan",
        body: "Johnson City Jazz Fest starts at 5 p.m. in downtown Memorial Park on the same Saturday. The car and motorcycle show ends at 3 p.m., leaving a practical gap for food, the motorcycle museum or downtown browsing before the free evening concert.",
      },
      {
        title: "Plan for rain-or-shine conditions",
        body: "The organizer labels the show rain or shine and states there are no refunds for participant registration. Check the current forecast, participant rules and organizer updates close to the event.",
      },
    ],
    relatedLinks: [
      { href: "/event/johnson-city-jazz-fest", label: "Johnson City Jazz Fest", description: "Continue the same October 24 downtown day with the free evening jazz concert starting at 5 p.m." },
      { href: "/destination/texas-vintage-motorcycle-museum-johnson-city", label: "Texas Vintage Motorcycle Museum", description: "Connect the show with Johnson City's vintage motorcycle collection and local enthusiast community." },
      { href: "/destination/johnson-city", label: "Explore Johnson City", description: "Plan food, museums and downtown stops around the show." },
      { href: "/county/blanco", label: "Explore Blanco County", description: "Turn the show into a broader Hill Country weekend." },
      { href: "/events", label: "Texas events calendar", description: "Compare other current Texas automotive, music and fall events." },
    ],
    sources: [
      { label: "Gears & Beers — official 2026 show site", url: "https://jctxcarshow.com/" },
      { label: "Explore Johnson City — 5th Annual Gears & Beers", url: "https://explorejctx.com/events/5th-annual-gears-beers-car-and-motorcycle-show/" },
      { label: "Explore Johnson City — Jazz Fest", url: "https://explorejctx.com/johnson-city-jazz-fest/" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche46Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
