import type { MajorEventAuthorityRecord } from "./major-event-authority.server";

const records: MajorEventAuthorityRecord[] = [
  {
    slug: "real-ale-oktoberfest",
    name: "Real Ale Oktoberfest 2026",
    city: "Blanco",
    countySlug: "blanco",
    countyName: "Blanco County",
    region: "hill-country",
    category: "food",
    startDate: "2026-09-26",
    endDate: "2026-09-26",
    dateNote: "Real Ale Brewing Company's official 2026 Oktoberfest runs Saturday, September 26 from noon to 6 p.m. at the brewery in Blanco. General admission is free and no ticket is required.",
    venue: "Real Ale Brewing Company",
    officialUrl: "https://realalebrewing.com/oktoberfest/",
    sourceCheckedAt: "2026-09-20",
    whyItMatters: "Real Ale Oktoberfest turns Blanco's working brewery into a one-day Hill Country German-style beer celebration with a Bavarian-style Oktoberfest lager, a special cask-conditioned pour, Czech Melody Masters, stein hoisting, Hammerschlagen, German-inspired food and a dog costume contest. Because admission is free and the brewery is an actual Made-in-Texas production site, the event connects seasonal festival intent directly to TexasDefined's Blanco and Real Ale authority pages.",
    planningSections: [
      {
        title: "Admission is free; steins and competition entry are optional purchases",
        body: "Real Ale explicitly says no general-admission ticket is required. The current advance options are a $25 commemorative 1-liter stein with one fill or $35 for the stein, fill and Stein Hoist competition entry. Those prices are optional merchandise/competition purchases, not event-admission prices.",
      },
      {
        title: "The event runs noon to 6 p.m. on Saturday, September 26",
        body: "The official event page publishes a six-hour festival window at the Blanco brewery. Arriving earlier in the afternoon gives more flexibility for food, games and the beer garden before the later crowd and music blocks.",
      },
      {
        title: "Czech Melody Masters are making their final Real Ale Oktoberfest appearance",
        body: "The brewery currently bills the 2026 performance as the Czech Melody Masters' final Real Ale Oktoberfest. The music is part of the free event rather than a separately ticketed concert.",
      },
      {
        title: "The beer program includes a traditional Oktoberfest lager and a cask-conditioned pour",
        body: "Real Ale says its Bavarian-style Oktoberfest lager is brewed with German malt, hops and yeast using traditional methods. The event also advertises a special cask-conditioned Oktoberfest pour available during the celebration.",
      },
      {
        title: "Plan transportation before drinking",
        body: "The brewery says free onsite parking is available but notes that Blanco has no public transit or ride-share service. Carpooling, a designated driver or local lodging is the practical plan for groups that intend to drink.",
      },
      {
        title: "Bring chairs or blankets; dogs are welcome under current rules",
        body: "The official FAQ allows chairs, blankets and picnic items, plus pop-up tents in the field but not the Beer Garden. Leashed, well-behaved dogs are welcome. Snacks and nonalcoholic drinks may be brought in, but outside alcohol is prohibited.",
      },
    ],
    relatedLinks: [
      {
        href: "/destination/real-ale-brewing-company-blanco",
        label: "Visit Real Ale Brewing Company",
        description: "Use the brewery guide for current taproom hours, tours, beer garden, Real Spirits and year-round visitor planning.",
      },
      {
        href: "/destination/blanco",
        label: "Explore Blanco",
        description: "Build Oktoberfest into a town day with the courthouse square, Blanco River and Blanco State Park.",
      },
      {
        href: "/county/blanco",
        label: "Explore Blanco County",
        description: "Connect the event with Johnson City, Hye, Garrison Brothers and the wider Hill Country county guide.",
      },
      {
        href: "/destination/garrison-brothers-distillery-hye",
        label: "Add Garrison Brothers in Hye",
        description: "Extend the weekend with Blanco County's bourbon-focused Made-in-Texas production destination.",
      },
      {
        href: "/events",
        label: "Texas events calendar",
        description: "Compare other current Texas Oktoberfest, beer and fall events.",
      },
    ],
    sources: [
      {
        label: "Real Ale Brewing — Oktoberfest 2026",
        url: "https://realalebrewing.com/oktoberfest/",
      },
      {
        label: "Real Ale Brewing — official Oktoberfest event listing",
        url: "https://realalebrewing.com/event/save-the-date-oktoberfest-music-food-games-fun/",
      },
      {
        label: "Real Ale Brewing — events calendar",
        url: "https://realalebrewing.com/events/list/?shortcode=4203d5e0&tribe-bar-date=2026-09-19",
      },
    ],
  },
];

const bySlug = new Map(records.map((event) => [event.slug, event]));

export function getExpandedMajorEventAuthorityTranche47Server(slug: string): MajorEventAuthorityRecord | null {
  return bySlug.get(slug) ?? null;
}
