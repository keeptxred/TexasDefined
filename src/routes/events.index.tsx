import { createFileRoute } from "@tanstack/react-router";

export const EVENTS_ROUTE_SEO = {
  title: "Texas Events",
  description: "Rodeos, wildflower weekends, barbecue throwdowns, dance halls and county fairs — a curated calendar of what’s worth showing up for across Texas.",
  canonicalPath: "/events",
} as const;

function cleanSearchValue(value: unknown, maxLength = 120) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
function cleanDate(value: unknown) {
  const candidate = cleanSearchValue(value, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(candidate) ? candidate : "";
}

type EventRouteSearch = Partial<{
  featured: string;
  location: string;
  start: string;
  end: string;
  category: string;
  venue: string;
}>;

type NormalizedEventSearch = Required<EventRouteSearch>;

export const validateEventSearch = (search: Record<string, unknown>): EventRouteSearch => {
  const cleaned = {
    featured: cleanSearchValue(search.featured, 80),
    location: cleanSearchValue(search.location),
    start: cleanDate(search.start),
    end: cleanDate(search.end),
    category: cleanSearchValue(search.category, 32),
    venue: cleanSearchValue(search.venue),
  };
  return Object.fromEntries(Object.entries(cleaned).filter(([, value]) => Boolean(value))) as EventRouteSearch;
};

export function normalizeEventSearch(search: EventRouteSearch): NormalizedEventSearch {
  return {
    featured: search.featured ?? "",
    location: search.location ?? "",
    start: search.start ?? "",
    end: search.end ?? "",
    category: search.category ?? "",
    venue: search.venue ?? "",
  };
}

function hasEventSearch(search: NormalizedEventSearch) {
  return Object.values(search).some(Boolean);
}

export const Route = createFileRoute("/events/")({
  validateSearch: validateEventSearch,
  loaderDeps: ({ search }) => {
    const normalizedSearch = normalizeEventSearch(search);
    return { search: normalizedSearch, filtered: hasEventSearch(normalizedSearch) };
  },
  loader: async ({ context, deps }) => {
    const [{ eventsQuery, regionsQuery }, { getEventsPageHead }] = await Promise.all([
      import("@/data/queries"),
      import("@/data/major-event-directory"),
    ]);
    const [events, regions, landingDirectory] = await Promise.all([
      context.queryClient.ensureQueryData(eventsQuery({})),
      context.queryClient.ensureQueryData(regionsQuery()),
      import("@/data/major-event-calendar").then(({ getMajorEventLandingDirectory }) =>
        getMajorEventLandingDirectory({ data: deps.search }),
      ),
    ]);
    const serverPresentation = await getEventsPageHead({
      data: {
        events: events.slice(0, 50),
        regions: regions.map(({ id, name }) => ({ id, name })),
        filtered: deps.filtered,
      },
    });
    return { events, regions, ...serverPresentation, ...landingDirectory };
  },
  head: ({ loaderData }) => loaderData?.head ?? {},
});
