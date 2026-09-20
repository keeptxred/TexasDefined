import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "texas-wine-jam",
    name: "Texas Wine Jam 2026",
    city: "Johnson City",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "food",
    startDate: "2026-10-17",
    endDate: "2026-10-17",
    dateNote: "Texas Wine Jam is scheduled for Saturday, October 17, 2026 in Johnson City. Texas Bubbles & Brunch begins at 10:30 a.m., VIP entry begins at noon, general admission opens at 1 p.m. and the festival concludes at 6 p.m. The organizer lists Sunday, October 18 only as a severe-weather backup date.",
    venue: "Memorial Park",
    officialUrl: "https://www.txwinejam.com/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "Texas Wine Jam is a one-day Johnson City festival built around buying, tasting and learning about Texas wine, bringing producers, winemakers, live music, educational Spotlight Sessions and direct bottle sales into a walkable downtown event that also supports wine-industry education and scholarships.",
    planningSections: [
      {
        title: "Use October 17 as the confirmed 2026 festival date",
        body: "The official Texas Wine Jam site and Explore Johnson City both publish Saturday, October 17, 2026. The main festival runs from noon for VIP guests and 1 p.m. for general admission through 6 p.m.; the separate Bubbles & Brunch begins at 10:30 a.m. for ticket holders.",
      },
      {
        title: "Choose the ticket tier before building the rest of the day",
        body: "When reviewed September 19, 2026, the official ticket page listed general admission at $69, VIP at $99 and designated-driver or under-21 admission at $29. The Bubbles & Brunch add-on was listed at $49 and sold out. Prices and availability can change, so confirm the live ticket page before purchasing.",
      },
      {
        title: "This is a wine-buying event, not only a tasting",
        body: "Participating wineries sell bottles directly at the event, with complimentary bottle check and the festival's Buy Wine. Get Wine. promotion. Plan transportation and storage with purchases in mind rather than treating the afternoon like a quick tasting-room stop.",
      },
      {
        title: "Treat October 18 only as a severe-weather backup",
        body: "Texas Wine Jam is rain or shine. The organizer says the festival may move to Sunday, October 18, 2026 only if severe weather or unsafe conditions prevent the Saturday event. Do not plan on Sunday as a second scheduled festival day.",
      },
    ],
    relatedLinks: [
      {
        href: "/destination/johnson-city",
        label: "Explore Johnson City",
        description: "Build Wine Jam into a full Johnson City weekend with downtown food, museums, LBJ history and Hill Country attractions.",
      },
      {
        href: "/county/blanco",
        label: "Explore Blanco County",
        description: "Connect Johnson City with Blanco, the Pedernales corridor and the wider county wine-and-Hill-Country landscape.",
      },
      {
        href: "/destination/science-mill-johnson-city",
        label: "Visit Science Mill",
        description: "Add a substantial indoor attraction to a family or mixed-interest Wine Jam weekend.",
      },
      {
        href: "/events",
        label: "Texas events calendar",
        description: "Compare other current fall festivals and Texas event weekends.",
      },
    ],
    sources: [
      {
        label: "Texas Wine Jam — official festival site",
        url: "https://www.txwinejam.com/",
      },
      {
        label: "Texas Wine Jam — official ticket and schedule details",
        url: "https://www.txwinejam.com/jaminfo",
      },
      {
        label: "Explore Johnson City — Texas Wine Jam",
        url: "https://explorejctx.com/events/texas-wine-jam/",
      },
      {
        label: "Explore Johnson City — Wine Jam guide",
        url: "https://explorejctx.com/wine-jam/",
      },
    ],
  },
  {
    slug: "johnson-city-jazz-fest",
    name: "Johnson City Jazz Fest 2026",
    city: "Johnson City",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "music",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    dateNote: "Johnson City Jazz Fest is scheduled for Saturday, October 24, 2026 at downtown Memorial Park. The free outdoor concert begins at 5 p.m.; published sets are Adrian Ruiz Quintet at 5 p.m., Jerry Z Trio at 6:30 p.m. and Elena Diaz with Daniel Durham Quintet at 8 p.m.",
    venue: "Memorial Park",
    officialUrl: "https://explorejctx.com/johnson-city-jazz-fest/",
    sourceCheckedAt: "2026-09-19",
    whyItMatters: "Johnson City Jazz Fest turns downtown Memorial Park into a free fall evening of Texas jazz, giving visitors a low-cost live-music anchor that pairs naturally with Johnson City's restaurants, tasting rooms, museums, historic sites and overnight Hill Country stays.",
    planningSections: [
      {
        title: "Use October 24 as the confirmed 2026 date",
        body: "Explore Johnson City publishes Saturday, October 24, 2026 for the current Jazz Fest, with the outdoor concert beginning at 5 p.m. in downtown Memorial Park.",
      },
      {
        title: "Admission is free",
        body: "The current Johnson City visitor page explicitly lists free admission. That makes the event easy to combine with a daytime attraction, dinner and a Johnson City overnight without building the trip around a separate concert-ticket purchase.",
      },
      {
        title: "Build the evening around the published set times",
        body: "The current lineup lists Adrian Ruiz Quintet at 5 p.m., Jerry Z Trio at 6:30 p.m. and Elena Diaz with Daniel Durham Quintet at 8 p.m. Arrive before the first set if you want a relaxed park setup rather than trying to enter during a performance changeover.",
      },
      {
        title: "Make the concert the evening anchor, not the whole trip",
        body: "Johnson City's museums, LBJ sites, wildlife attractions, food and tasting rooms give visitors enough daytime depth to make Jazz Fest part of a full weekend. Staying in town also avoids a late drive after the final set.",
      },
    ],
    relatedLinks: [
      {
        href: "/destination/johnson-city",
        label: "Explore Johnson City",
        description: "Plan museums, food, LBJ history and Hill Country attractions around the evening concert.",
      },
      {
        href: "/county/blanco",
        label: "Explore Blanco County",
        description: "Extend the music weekend into Blanco County's small towns, rivers and Hill Country drives.",
      },
      {
        href: "/event/texas-wine-jam",
        label: "Compare Texas Wine Jam",
        description: "See Johnson City's other major October signature event one week earlier.",
      },
      {
        href: "/events",
        label: "Texas events calendar",
        description: "Compare other live-music and fall events around the state.",
      },
    ],
    sources: [
      {
        label: "Explore Johnson City — Johnson City Jazz Fest",
        url: "https://explorejctx.com/johnson-city-jazz-fest/",
      },
      {
        label: "Explore Johnson City — signature events",
        url: "https://explorejctx.com/",
      },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche45Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
