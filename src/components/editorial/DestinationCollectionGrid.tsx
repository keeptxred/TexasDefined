import { useEffect, useMemo, useState } from "react";

import { DestinationCard } from "@/components/editorial/DestinationCard";
import type { Destination } from "@/data/types";

const PAGE_SIZE = 24;
const normalized = (value: string) => value.trim().toLowerCase();

export function DestinationCollectionGrid({ destinations, regionLabel }: { destinations: Destination[]; regionLabel: (regionId: string) => string | undefined }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [activity, setActivity] = useState("all");
  const [sort, setSort] = useState<"featured" | "name" | "town">("featured");

  const regions = useMemo(() => [...new Set(destinations.map((destination) => destination.region))].map((id) => ({ id, label: regionLabel(id) ?? id.replaceAll("-", " ") })).sort((a, b) => a.label.localeCompare(b.label)), [destinations, regionLabel]);
  const activities = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const destination of destinations) for (const highlight of destination.highlights) {
      const key = normalized(highlight);
      if (!key || key.length > 40) continue;
      const existing = counts.get(key);
      counts.set(key, { label: highlight, count: (existing?.count ?? 0) + 1 });
    }
    return [...counts.entries()].filter(([, item]) => item.count >= 2).sort((a, b) => b[1].count - a[1].count || a[1].label.localeCompare(b[1].label)).slice(0, 30).map(([key, item]) => ({ key, ...item }));
  }, [destinations]);

  const filtered = useMemo(() => {
    const needle = normalized(query);
    const next = destinations.filter((destination) => {
      if (region !== "all" && destination.region !== region) return false;
      if (activity !== "all" && !destination.highlights.some((item) => normalized(item) === activity)) return false;
      if (!needle) return true;
      return [destination.name, destination.summary, destination.nearestTown, destination.county ?? "", regionLabel(destination.region) ?? "", ...destination.highlights].join(" ").toLowerCase().includes(needle);
    });
    return [...next].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : sort === "town" ? a.nearestTown.localeCompare(b.nearestTown) || a.name.localeCompare(b.name) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
  }, [activity, destinations, query, region, regionLabel, sort]);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [query, region, activity, sort]);
  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(0, filtered.length - visible.length);
  const hasFilters = Boolean(query.trim() || region !== "all" || activity !== "all");
  const controlClass = "h-11 border-0 border-b border-border bg-transparent px-0 text-sm font-normal normal-case tracking-normal text-foreground outline-none transition-colors focus:border-primary";

  return <>
    <div className="mt-8 border-y border-border py-6">
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-2 lg:grid-cols-[minmax(240px,1.4fr)_1fr_1fr_1fr_auto]">
        <label className="grid gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Park, lake, town, activity…" className={controlClass} /></label>
        <label className="grid gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Region<select value={region} onChange={(event) => setRegion(event.target.value)} className={controlClass}><option value="all">All regions</option>{regions.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
        <label className="grid gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Activity<select value={activity} onChange={(event) => setActivity(event.target.value)} className={controlClass}><option value="all">All activities</option>{activities.map((option) => <option key={option.key} value={option.key}>{option.label} ({option.count})</option>)}</select></label>
        <label className="grid gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sort<select value={sort} onChange={(event) => setSort(event.target.value as "featured" | "name" | "town")} className={controlClass}><option value="featured">Editor’s order</option><option value="name">Name A–Z</option><option value="town">Nearest town</option></select></label>
        <div className="flex items-end"><button type="button" disabled={!hasFilters} onClick={() => { setQuery(""); setRegion("all"); setActivity("all"); }} className="eyebrow h-11 whitespace-nowrap text-muted-foreground transition-colors enabled:hover:text-primary disabled:opacity-30">Clear</button></div>
      </div>
      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">{filtered.length.toLocaleString("en-US")} {filtered.length === 1 ? "place" : "places"}{hasFilters ? " fit what you picked" : " in this guide"}</p>
    </div>

    {visible.length > 0 ? <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{visible.map((destination) => <li key={destination.id}><DestinationCard destination={destination} regionLabel={regionLabel(destination.region)} /></li>)}</ul> : <div className="mt-10 border-t border-border py-12"><p className="font-display text-3xl">Nothing quite fits those choices.</p><p className="mt-3 text-sm text-muted-foreground">Try another region, activity or a broader search.</p></div>}

    {remaining > 0 && <div className="mt-12 border-t border-border pt-7 text-center"><button type="button" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))} className="eyebrow border-b border-primary pb-1 text-primary">Show {Math.min(PAGE_SIZE, remaining).toLocaleString("en-US")} more →</button><p className="mt-3 text-xs text-muted-foreground">{visible.length.toLocaleString("en-US")} of {filtered.length.toLocaleString("en-US")} places shown</p></div>}
  </>;
}
