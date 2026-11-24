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
    dateNote: "The October 24, 2026 show has ended. The organizer's site marks registration sold out and closed. No confirmed 2027 date was found.",
    venue: "Downtown Johnson City / Pecan Street Brewing",
    officialUrl: "https://jctxcarshow.com/",
    sourceCheckedAt: "2026-11-24",
    whyItMatters: "Gears & Beers combines Johnson City's downtown courthouse setting, local craft beer and live music with a serious regional car-and-motorcycle show. The fifth annual event specifically includes vintage, antique, classic and custom cars, trucks and motorcycles, plus six motorcycle categories tied into the local enthusiast community around the Texas Vintage Motorcycle Museum.",
    planningSections: [
      {
        title: "2026 participant and spectator timing",
        body: "The organizer's completed 2026 schedule separated participant check-in (7:30–9:30 a.m.) from judging (10:30 a.m.–12:30 p.m.) and afternoon raffles and awards. Future schedules and public hours require a new announcement.",
      },
      {
        title: "2026 registration was closed",
        body: "The organizer lists the completed edition as sold out. Its historical $35 advance and conditional $45 day-of vehicle registration were entry fees for vehicles, not spectator admission. Do not use these fees as current ticket prices.",
      },
      {
        title: "Vehicle categories and local purpose",
        body: "The 2026 show featured six motorcycle categories and a Junkyard Dog class for drivable older vehicles. The organizer identifies Project Gratitude and the local DAR as beneficiaries or partners; check the next edition for its classes and charitable program.",
      },
      {
        title: "A downtown pairing, not a future schedule",
        body: "The free Memorial Park jazz concert was held the evening of the 2026 car show. The next dates for both events must be confirmed separately.",
      },
      {
        title: "2026 weather policy",
        body: "The completed edition was advertised as rain or shine, with no refunds for participant registrations. Future entry conditions may differ.",
      },
    ],
    relatedLinks: [
      { href: "/destination/pecan-street-brewing-johnson-city", label: "Pecan Street Brewing", description: "Use the dedicated host-venue guide for current hours, food, house-brewed beer, live music and historic-square context." },
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
