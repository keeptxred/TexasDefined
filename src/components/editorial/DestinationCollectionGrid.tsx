import { useEffect, useMemo, useState } from "react";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import type { Destination } from "@/data/types";

const PAGE_SIZE = 24;

function normalized(value: string) {
  return value.trim().toLowerCase();
}

export function DestinationCollectionGrid({
  destinations,
  regionLabel,
}: {
  destinations: Destination[];
  regionLabel: (regionId: string) => string | undefined;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [activity, setActivity] = useState("all");
  const [sort, setSort] = useState<"featured" | "name" | "town">("featured");

  const regions = useMemo(
    () =>
      [...new Set(destinations.map((destination) => destination.region))]
        .map((id) => ({ id, label: regionLabel(id) ?? id.replaceAll("-", " ") }))
        .sort((left, right) => left.label.localeCompare(right.label)),
    [destinations, regionLabel],
  );

  const activities = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const destination of destinations) {
      for (const highlight of destination.highlights) {
        const key = normalized(highlight);
        if (!key || key.length > 40) continue;
        const existing = counts.get(key);
        counts.set(key, { label: highlight, count: (existing?.count ?? 0) + 1 });
      }
    }
    return [...counts.entries()]
      .filter(([, item]) => item.count >= 2)
      .sort((left, right) => right[1].count - left[1].count || left[1].label.localeCompare(right[1].label))
      .slice(0, 30)
      .map(([key, item]) => ({ key, ...item }));
  }, [destinations]);

  const filtered = useMemo(() => {
    const needle = normalized(query);
    const next = destinations.filter((destination) => {
      if (region !== "all" && destination.region !== region) return false;
      if (activity !== "all" && !destination.highlights.some((item) => normalized(item) === activity)) return false;
      if (!needle) return true;
      const haystack = [
        destination.name,
        destination.summary,
        destination.nearestTown,
        destination.county ?? "",
        regionLabel(destination.region) ?? "",
        ...destination.highlights,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });

    return [...next].sort((left, right) => {
      if (sort === "name") return left.name.localeCompare(right.name);
      if (sort === "town") return left.nearestTown.localeCompare(right.nearestTown) || left.name.localeCompare(right.name);
      return Number(Boolean(right.featured)) - Number(Boolean(left.featured)) || left.name.localeCompare(right.name);
    });
  }, [activity, destinations, query, region, regionLabel, sort]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, region, activity, sort]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(0, filtered.length - visible.length);
  const hasFilters = Boolean(query.trim() || region !== "all" || activity !== "all");

  return (
    <>
      <div className="mt-8 border-y border-border py-5">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(260px,1.5fr)_1fr_1fr_1fr_auto]">
          <label className="grid gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Search
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Park, lake, town, activity…"
              className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors focus:border-primary"
            />
          </label>

          <label className="grid gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Region
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
            >
              <option value="all">All regions</option>
              {regions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Activity
            <select
              value={activity}
              onChange={(event) => setActivity(event.target.value)}
              className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
            >
              <option value="all">All activities</option>
              {activities.map((option) => (
                <option key={option.key} value={option.key}>{option.label} ({option.count})</option>
              ))}
            </select>
          </label>

          <label className="grid gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as "featured" | "name" | "town")}
              className="h-11 border border-border bg-background px-3 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary"
            >
              <option value="featured">Recommended</option>
              <option value="name">Name A–Z</option>
              <option value="town">Nearest town</option>
            </select>
          </label>

          <div className="flex items-end">
            <button
              type="button"
              disabled={!hasFilters}
              onClick={() => {
                setQuery("");
                setRegion("all");
                setActivity("all");
              }}
              className="h-11 whitespace-nowrap border border-border px-4 text-sm transition-colors enabled:hover:border-primary enabled:hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear filters
            </button>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {filtered.length.toLocaleString("en-US")} {filtered.length === 1 ? "place" : "places"}
          {hasFilters ? ` matching your filters` : " to explore"}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <li key={destination.id}>
              <DestinationCard
                destination={destination}
                regionLabel={regionLabel(destination.region)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 border border-border bg-background px-6 py-12 text-center">
          <p className="font-display text-2xl">No places match those filters.</p>
          <p className="mt-2 text-sm text-muted-foreground">Try another region, activity, or a broader search.</p>
        </div>
      )}

      {remaining > 0 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))}
            className="border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Keep exploring — {remaining.toLocaleString("en-US")} more
          </button>
          <p className="mt-3 text-xs text-muted-foreground">
            {visible.length.toLocaleString("en-US")} of {filtered.length.toLocaleString("en-US")} places shown · {remaining.toLocaleString("en-US")} remaining
          </p>
        </div>
      )}
    </>
  );
}
