import { loadMajorEventGuideDirectoryServer } from "./major-event-directory.server";
import { resolveTemporalEventCollectionServer, type TemporalEventDirectoryItem } from "./event-temporal-collections.server";

export interface TexasThisWeekendSection {
  id: string;
  title: string;
  description: string;
  href?: string;
  items: TemporalEventDirectoryItem[];
}

export interface TexasThisWeekendDigest {
  canonicalPath: "/events/this-weekend";
  title: string;
  dateContext: string;
  generatedAt: string;
  sections: TexasThisWeekendSection[];
  reusable: {
    headline: string;
    emailSubject: string;
    socialSummary: string;
    topEventNames: string[];
    topEventLinks: Array<{ name: string; href: string; city: string }>;
    metroEditionPaths: string[];
    regionalEditionPaths: string[];
    interestSectionIds: string[];
  };
}

type SectionDefinition = Omit<TexasThisWeekendSection, "items"> & {
  minimumItems: number;
  limit: number;
  matches: (event: TemporalEventDirectoryItem) => boolean;
};

const metroCounties = {
  houston: new Set(["Harris County", "Fort Bend County", "Montgomery County", "Brazoria County"]),
  dfw: new Set(["Dallas County", "Tarrant County", "Collin County", "Denton County", "Ellis County", "Rockwall County"]),
  austin: new Set(["Travis County", "Williamson County", "Hays County", "Bastrop County"]),
  sanAntonio: new Set(["Bexar County", "Comal County", "Guadalupe County", "Kendall County"]),
};

const majorMetroCounties = new Set([
  ...metroCounties.houston,
  ...metroCounties.dfw,
  ...metroCounties.austin,
  ...metroCounties.sanAntonio,
]);

// The broader site taxonomy uses a large Gulf Coast/Coastal Plains region. For a
// consumer-facing weekend edition, keep the "Gulf Coast" label to counties that
// readers reasonably understand as coastal or coastal-metro destinations.
const gulfCoastWeekendCounties = new Set([
  "Harris County",
  "Fort Bend County",
  "Brazoria County",
  "Galveston County",
  "Chambers County",
  "Jefferson County",
  "Orange County",
  "Matagorda County",
  "Calhoun County",
  "Victoria County",
  "Refugio County",
  "Aransas County",
  "San Patricio County",
  "Nueces County",
  "Kleberg County",
  "Kenedy County",
  "Willacy County",
  "Cameron County",
]);

const familySignal = /\b(family|families|kids|children|child|junior|youth)\b/i;
const freeSignal = /\bfree\b/i;

function outdoorSignal(event: TemporalEventDirectoryItem) {
  return event.category === "sport"
    || event.category === "rodeo"
    || /\b(run|race|marathon|half marathon|5k|10k|trail|cycling|bike|rodeo)\b/i.test(event.name);
}

function verificationScore(event: TemporalEventDirectoryItem) {
  const checked = Date.parse(event.sourceCheckedAt ?? "");
  return Number.isFinite(checked) ? checked : 0;
}

function pickDistinct(items: TemporalEventDirectoryItem[], matches: SectionDefinition["matches"], limit: number) {
  const ranked = items
    .filter(matches)
    .sort((left, right) => verificationScore(right) - verificationScore(left)
      || left.startDate.localeCompare(right.startDate)
      || left.name.localeCompare(right.name));

  const selected: TemporalEventDirectoryItem[] = [];
  const cities = new Set<string>();
  const categories = new Set<string>();

  for (const event of ranked) {
    if (selected.length >= limit) break;
    if (cities.has(event.city) && categories.has(event.category)) continue;
    selected.push(event);
    cities.add(event.city);
    categories.add(event.category);
  }
  for (const event of ranked) {
    if (selected.length >= limit) break;
    if (!selected.some((item) => item.slug === event.slug)) selected.push(event);
  }
  return selected;
}

const sections: SectionDefinition[] = [
  {
    id: "best",
    title: "Top 5 Things to Do in Texas This Weekend",
    description: "Five source-verified picks chosen for freshness, geographic variety and a useful mix of Texas experiences.",
    minimumItems: 1,
    limit: 5,
    matches: () => true,
  },
  {
    id: "houston",
    title: "Houston This Weekend",
    description: "Current events across Harris, Fort Bend, Montgomery and Brazoria counties.",
    href: "/events/houston-this-weekend",
    minimumItems: 2,
    limit: 4,
    matches: (event) => metroCounties.houston.has(event.countyName ?? ""),
  },
  {
    id: "dfw",
    title: "Dallas-Fort Worth This Weekend",
    description: "Current events across the core DFW counties, with the actual host city preserved on every guide.",
    href: "/events/dallas-this-weekend",
    minimumItems: 2,
    limit: 4,
    matches: (event) => metroCounties.dfw.has(event.countyName ?? ""),
  },
  {
    id: "austin",
    title: "Austin This Weekend",
    description: "Current events across Travis, Williamson, Hays and Bastrop counties.",
    href: "/events/austin-this-weekend",
    minimumItems: 2,
    limit: 4,
    matches: (event) => metroCounties.austin.has(event.countyName ?? ""),
  },
  {
    id: "san-antonio",
    title: "San Antonio This Weekend",
    description: "Current events across Bexar, Comal, Guadalupe and Kendall counties.",
    href: "/events/san-antonio-this-weekend",
    minimumItems: 2,
    limit: 4,
    matches: (event) => metroCounties.sanAntonio.has(event.countyName ?? ""),
  },
  {
    id: "festivals",
    title: "Texas Festivals This Weekend",
    description: "Festival, fair, fiesta, Oktoberfest and major community-celebration guides that overlap the current weekend.",
    href: "/events/fall-festivals",
    minimumItems: 2,
    limit: 6,
    matches: (event) => /festival|fair|fiesta|oktoberfest|celebration|roundup/i.test(event.name),
  },
  {
    id: "gulf-coast",
    title: "Gulf Coast This Weekend",
    description: "Source-verified events in coastal and coastal-metro counties from Greater Houston through the Coastal Bend and Lower Coast.",
    href: "/events/gulf-coast-events",
    minimumItems: 2,
    limit: 5,
    matches: (event) => gulfCoastWeekendCounties.has(event.countyName ?? ""),
  },
  {
    id: "hill-country",
    title: "Hill Country This Weekend",
    description: "Current Hill Country event guides from the Austin-San Antonio corridor through Fredericksburg, Kerrville and nearby towns.",
    href: "/events/hill-country-events",
    minimumItems: 2,
    limit: 5,
    matches: (event) => event.region === "hill-country",
  },
  {
    id: "east-texas",
    title: "East Texas This Weekend",
    description: "Current Piney Woods and East Texas events that overlap the Friday-through-Sunday window.",
    href: "/events/piney-woods-events",
    minimumItems: 2,
    limit: 5,
    matches: (event) => event.region === "piney-woods",
  },
  {
    id: "west-texas",
    title: "West Texas This Weekend",
    description: "Current Big Bend, Far West and Panhandle event guides, shown only when enough verified events qualify.",
    href: "/events/big-bend-events",
    minimumItems: 2,
    limit: 5,
    matches: (event) => event.region === "big-bend" || event.region === "panhandle",
  },
  {
    id: "family",
    title: "Family Events This Weekend",
    description: "Events whose verified names explicitly signal family, kids, children, junior or youth programming.",
    minimumItems: 2,
    limit: 5,
    matches: (event) => familySignal.test(event.name),
  },
  {
    id: "outdoors",
    title: "Outdoor Events This Weekend",
    description: "Races, runs, cycling, rodeos and other clearly outdoor-oriented event guides in the current weekend window.",
    minimumItems: 2,
    limit: 5,
    matches: outdoorSignal,
  },
  {
    id: "free",
    title: "Free Events This Weekend",
    description: "Only events whose verified event name explicitly identifies them as free; Texas Defined does not infer free admission from missing ticket data.",
    minimumItems: 2,
    limit: 5,
    matches: (event) => freeSignal.test(event.name),
  },
  {
    id: "worth-the-drive",
    title: "Worth the Drive",
    description: "Strong source-verified weekend events outside the four largest metro county clusters, diversified across places and event types.",
    minimumItems: 3,
    limit: 6,
    matches: (event) => !majorMetroCounties.has(event.countyName ?? ""),
  },
];

export function loadTexasThisWeekendDigestServer(now = new Date()): TexasThisWeekendDigest | null {
  const collection = resolveTemporalEventCollectionServer("this-weekend", loadMajorEventGuideDirectoryServer(), now);
  if (!collection) return null;

  const resolvedSections = sections.flatMap((section) => {
    const items = pickDistinct(collection.items, section.matches, section.limit);
    if (items.length < section.minimumItems) return [];
    const { matches: _matches, minimumItems: _minimumItems, limit: _limit, ...rest } = section;
    return [{ ...rest, items }];
  });

  const top = resolvedSections.find((section) => section.id === "best")?.items ?? [];
  return {
    canonicalPath: "/events/this-weekend",
    title: collection.title,
    dateContext: collection.dateContext,
    generatedAt: now.toISOString(),
    sections: resolvedSections,
    reusable: {
      headline: `Texas This Weekend: ${collection.dateContext}`,
      emailSubject: `Texas This Weekend · ${collection.dateContext}`,
      socialSummary: top.length
        ? `Texas This Weekend: ${top.slice(0, 4).map((event) => event.name).join(" · ")}`
        : `Texas This Weekend · ${collection.dateContext}`,
      topEventNames: top.map((event) => event.name),
      topEventLinks: top.map((event) => ({ name: event.name, href: event.href, city: event.city })),
      metroEditionPaths: [
        "/events/houston-this-weekend",
        "/events/dallas-this-weekend",
        "/events/austin-this-weekend",
        "/events/san-antonio-this-weekend",
      ],
      regionalEditionPaths: [
        "/events/gulf-coast-events",
        "/events/hill-country-events",
        "/events/piney-woods-events",
        "/events/big-bend-events",
        "/events/panhandle-events",
      ],
      interestSectionIds: resolvedSections
        .filter((section) => ["festivals", "family", "outdoors", "free", "worth-the-drive"].includes(section.id))
        .map((section) => section.id),
    },
  };
}
