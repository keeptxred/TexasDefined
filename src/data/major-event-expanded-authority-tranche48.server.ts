import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "blanco-lavender-festival",
    name: "22nd Annual Blanco Lavender Festival",
    city: "Blanco",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "seasonal",
    startDate: "2027-06-04",
    endDate: "2027-06-06",
    dateNote:
      "The Blanco Chamber of Commerce has published June 4-6, 2027 for the 22nd annual Blanco Lavender Festival. The detailed Festival Info page still shows 2026 market, farm, parking and shuttle operations, so those values should not be assumed for 2027 until the organizer refreshes them.",
    venue: "Old Blanco County Courthouse, Bindseil Park and Hill Country Lavender",
    officialUrl: "https://www.blancolavenderfest.com/",
    sourceCheckedAt: "2026-09-24",
    whyItMatters:
      "Blanco Lavender Festival turns the town's real lavender-growing history into a multi-site Hill Country weekend: a courthouse-square artisan market, live music in Bindseil Park, Texas-made food and drink, and a separate farm component at Hill Country Lavender. The Chamber says the festival began in 2005 after commercial lavender farming took root near Blanco in 1999, so the event connects agriculture, downtown heritage and a recurring community fundraiser rather than using lavender as a generic theme.",
    planningSections: [
      {
        title: "The 2027 dates are confirmed; the detailed hours are not yet",
        body:
          "The organizer's homepage publishes June 4-6, 2027 for the 22nd annual festival. Its detailed Festival Info page still carries the 2026 market hours, farm hours, parking prices and shuttle price. Use the 2027 dates for trip planning now, but recheck the official operating page before relying on exact daily hours, parking fees or shuttle pricing.",
      },
      {
        title: "Treat downtown and the lavender farm as two different stops",
        body:
          "The festival market is based around the Old Blanco County Courthouse and nearby Bindseil Park, while Hill Country Lavender is at 8241 FM 165 east of town. The festival has historically operated a farm shuttle, but current-year routing and pricing should control the final transportation plan.",
      },
      {
        title: "The farm is part of the festival, but bloom is weather-dependent",
        body:
          "Hill Country Lavender identifies itself as Texas' first commercial lavender farm and invites festival visitors to the property. The farm also warns that bloom timing varies with weather and that visitors should not assume the fields will be fully purple on a given weekend. Check the farm's current bloom update before making flowers the only reason for the trip.",
      },
      {
        title: "Use the square as the food, music and market anchor",
        body:
          "The latest detailed festival plan places the lavender market on the historic courthouse grounds, live music in Bindseil Park and Texas-made food, wine and local beer around the downtown festival footprint. The organizer may adjust vendors, music and operating details for 2027, so use the live schedule rather than a prior-year lineup.",
      },
      {
        title: "Build the rest of the weekend around Blanco",
        body:
          "The Old Blanco County Courthouse, Blanco State Park, Buggy Barn Museum, local distilleries and the wider Blanco County network make it practical to stay after the festival block instead of driving only for the market. Reserve lodging early once 2027 operating details and music are posted because the event concentrates demand in a small town.",
      },
    ],
    relatedLinks: [
      { href: "/destination/blanco", label: "Explore Blanco", description: "Plan the courthouse square, river, museums, food and lodging around the festival weekend." },
      { href: "/destination/old-blanco-county-courthouse", label: "Old Blanco County Courthouse", description: "Understand the historic square that anchors the festival market." },
      { href: "/destination/buggy-barn-museum-blanco", label: "Buggy Barn Museum", description: "Add Blanco's transportation and film-history museum outside peak festival hours." },
      { href: "/destination/twin-sisters-dance-hall-blanco", label: "Twin Sisters Dance Hall", description: "Check whether the historic hall has a public dance or special event near the festival weekend." },
      { href: "/county/blanco", label: "Explore Blanco County", description: "Extend the trip toward Johnson City, Hye, LBJ history and the Pedernales corridor." },
      { href: "/events/hill-country-events", label: "Hill Country events", description: "Compare other source-checked Hill Country event weekends." },
    ],
    sources: [
      { label: "Blanco Lavender Festival — official 2027 homepage", url: "https://www.blancolavenderfest.com/" },
      { label: "Blanco Lavender Festival — detailed Festival Info", url: "https://www.blancolavenderfest.com/festivalinfo" },
      { label: "Blanco Lavender Festival — Hill Country Lavender farm", url: "https://www.blancolavenderfest.com/farm" },
      { label: "Blanco Lavender Festival — history", url: "https://www.blancolavenderfest.com/history" },
      { label: "Blanco Lavender Festival — organizer and locations", url: "https://www.blancolavenderfest.com/contact" },
      { label: "Hill Country Lavender — current farm visitor information", url: "https://www.hillcountrylavender.com/location-and-contact-1" },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche48Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
