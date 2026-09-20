import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "blanco-lavender-festival",
    name: "Blanco Lavender Festival 2027",
    city: "Blanco",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "culture",
    startDate: "2027-06-04",
    endDate: "2027-06-06",
    dateNote:
      "The Blanco Lavender Festival's current official homepage announces the 22nd annual festival for June 4-6, 2027. Detailed 2027 market, farm, music and parking schedules have not yet been published, so do not reuse 2026 operating hours as if they were confirmed for 2027.",
    venue: "Historic Old Blanco County Courthouse grounds and downtown Blanco",
    officialUrl: "https://www.blancolavenderfest.com/",
    sourceCheckedAt: "2026-09-20",
    whyItMatters:
      "The Blanco Lavender Festival is the signature annual event most closely tied to Blanco's lavender-growing identity. It combines the historic courthouse square, lavender farms, Texas-made food and drink, live music and a large artisan market into a three-day Hill Country festival that materially changes lodging demand, parking and visitor traffic in town.",
    planningSections: [
      {
        title: "Use June 4-6, 2027 as the confirmed planning window",
        body:
          "The organizer's current homepage has already announced the 22nd annual festival for June 4-6, 2027. That is the date Texas Defined uses for trip planning. Specific daily hours and programming should remain provisional until the organizer publishes the 2027 festival schedule.",
      },
      {
        title: "Expect the courthouse square to remain the festival center",
        body:
          "The festival is built around the historic Old Blanco County Courthouse grounds and downtown Blanco. The long-running format includes a Lavender Market, Texas-made food and drink, live music and access to participating lavender farms, but 2027-specific vendor and programming details should be checked again closer to June.",
      },
      {
        title: "Do not carry 2026 hours forward blindly",
        body:
          "The festival's detailed information page still displays June 5-7, 2026 market and farm hours. Those hours are useful historical context for how the festival operates, but they are not confirmation of the 2027 daily schedule. Texas Defined keeps the 2027 date current while leaving exact hours to the official organizer until updated.",
      },
      {
        title: "Parking and lodging become part of the event plan",
        body:
          "Recent festival operations have relied on remote parking, shuttles and multiple community parking areas because downtown space is limited. Visitors planning an overnight stay should book Blanco or nearby Hill Country lodging early and recheck the 2027 parking plan when it is published.",
      },
      {
        title: "Build the weekend around Blanco rather than only the market",
        body:
          "Blanco State Park, Buggy Barn Museum, Real Ale Brewing Company and the historic courthouse square give visitors enough nearby depth to turn the festival into a full Hill Country weekend instead of a single shopping stop.",
      },
    ],
    relatedLinks: [
      {
        href: "/destination/blanco",
        label: "Explore Blanco",
        description:
          "Use the town guide for the courthouse square, river, food and other stops around festival hours.",
      },
      {
        href: "/destination/buggy-barn-museum-blanco",
        label: "Buggy Barn Museum",
        description:
          "Add Blanco's large horse-drawn transportation collection and Old West studio to the festival weekend.",
      },
      {
        href: "/destination/blanco-state-park",
        label: "Blanco State Park",
        description:
          "Add river swimming, fishing, paddling and shaded picnic time close to downtown.",
      },
      {
        href: "/destination/real-ale-brewing-company-blanco",
        label: "Real Ale Brewing Company",
        description:
          "Connect the festival's Texas-made food-and-drink theme with Blanco's working brewery and distillery.",
      },
      {
        href: "/county/blanco",
        label: "Explore Blanco County",
        description:
          "Extend the weekend to Johnson City, Hye, Pedernales River stops and the U.S. 290 corridor.",
      },
      {
        href: "/events",
        label: "Texas events calendar",
        description:
          "Compare other current Texas summer festivals and Hill Country events.",
      },
    ],
    sources: [
      {
        label: "Blanco Lavender Festival — official homepage",
        url: "https://www.blancolavenderfest.com/",
      },
      {
        label: "Blanco Lavender Festival — festival information",
        url: "https://www.blancolavenderfest.com/festivalinfo",
      },
      {
        label: "Blanco Lavender Festival — music",
        url: "https://www.blancolavenderfest.com/music",
      },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche47Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
