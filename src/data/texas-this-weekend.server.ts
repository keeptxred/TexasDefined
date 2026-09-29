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
    topEventNames: string[];
    metroEditionPaths: string[];
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
    title: "Best Things to Do in Texas This Weekend",
    description: "A source-verified statewide shortlist that favors recently checked events while preserving variety across cities and event types.",
    minimumItems: 1,
    limit: 8,
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
      topEventNames: top.map((event) => event.name),
      metroEditionPaths: [
        "/events/houston-this-weekend",
        "/events/dallas-this-weekend",
        "/events/austin-this-weekend",
        "/events/san-antonio-this-weekend",
      ],
    },
  };
}
