import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { wildlifeManagementAreaWave1Destinations } from "@/data/wildlife-management-area-destinations-wave1";
import { wildlifeManagementAreaWave2Destinations } from "@/data/wildlife-management-area-destinations-wave2";
import { wildlifeManagementAreaWave3Destinations } from "@/data/wildlife-management-area-destinations-wave3";
import { wildlifeManagementAreaWave4Destinations } from "@/data/wildlife-management-area-destinations-wave4";
import { wildlifeManagementAreaWave5Destinations } from "@/data/wildlife-management-area-destinations-wave5";
import { wildlifeManagementAreaWave6Destinations } from "@/data/wildlife-management-area-destinations-wave6";
import { wildlifeManagementAreaWave7Destinations } from "@/data/wildlife-management-area-destinations-wave7";
import { wildlifeManagementAreaWave8Destinations } from "@/data/wildlife-management-area-destinations-wave8";
import { wildlifeManagementAreaWave9Destinations } from "@/data/wildlife-management-area-destinations-wave9";
import { wildlifeManagementAreaWave10Destinations } from "@/data/wildlife-management-area-destinations-wave10";
import type { Destination } from "@/data/types";

const PAGE_SIZE = 18;
const wildlifeManagementAreas: Destination[] = [
  ...wildlifeManagementAreaWave1Destinations,
  ...wildlifeManagementAreaWave2Destinations,
  ...wildlifeManagementAreaWave3Destinations,
  ...wildlifeManagementAreaWave4Destinations,
  ...wildlifeManagementAreaWave5Destinations,
  ...wildlifeManagementAreaWave6Destinations,
  ...wildlifeManagementAreaWave7Destinations,
  ...wildlifeManagementAreaWave8Destinations,
  ...wildlifeManagementAreaWave9Destinations,
  ...wildlifeManagementAreaWave10Destinations,
].filter((destination) => destination.id.startsWith("texas-wma-"));

const normalize = (value: string) => value.trim().toLowerCase();
const title = (value: string) => value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase());

export default function HuntingPublicLandDiscovery() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const regions = useMemo(() => [...new Set(wildlifeManagementAreas.map((destination) => destination.region))]
    .sort()
    .map((value) => ({ value, label: title(value) })), []);

  const filtered = useMemo(() => {
    const needle = normalize(query);
    return wildlifeManagementAreas
      .filter((destination) => region === "all" || destination.region === region)
      .filter((destination) => !needle || [
        destination.name,
        destination.nearestTown,
        destination.county ?? "",
        destination.summary,
        destination.entryNote,
        ...destination.highlights,
      ].join(" ").toLowerCase().includes(needle))
      .sort((left, right) => left.region.localeCompare(right.region) || left.name.localeCompare(right.name));
  }, [query, region]);

  useEffect(() => setVisibleCount(PAGE_SIZE), [query, region]);
  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(0, filtered.length - visible.length);
  const controlClass = "h-11 border-0 border-b border-border bg-transparent px-0 text-sm text-foreground outline-none transition-colors focus:border-primary";

  return (
    <section className="border-y border-border bg-surface py-14 sm:py-18" aria-labelledby="hunting-public-land-heading">
      <Container>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow text-primary">Public-land finder</p>
            <h2 id="hunting-public-land-heading" className="mt-3 font-display text-4xl leading-tight sm:text-5xl">Find a Texas Wildlife Management Area.</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">Move from statewide hunting rules to actual TPWD-managed landscapes. These place guides come from TexasDefined&apos;s checked-in WMA catalog and retain each area&apos;s current access notes, managing-agency source and destination context.</p>
          </div>
          <p className="text-sm leading-6 text-muted-foreground lg:text-right"><strong className="font-display text-3xl text-foreground">{wildlifeManagementAreas.length}</strong><br />WMA place guides in this finder</p>
        </div>

        <div className="mt-9 grid gap-x-8 gap-y-5 border-y border-border py-6 md:grid-cols-[minmax(240px,1.5fr)_1fr_auto]">
          <label className="grid gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Search<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="WMA, town, county, habitat…" className={controlClass} /></label>
          <label className="grid gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Region<select value={region} onChange={(event) => setRegion(event.target.value)} className={controlClass}><option value="all">All regions</option>{regions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
          <div className="flex items-end"><button type="button" disabled={!query && region === "all"} onClick={() => { setQuery(""); setRegion("all"); }} className="eyebrow h-11 whitespace-nowrap text-muted-foreground transition-colors enabled:hover:text-primary disabled:opacity-30">Clear</button></div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground"><p aria-live="polite">{filtered.length.toLocaleString("en-US")} {filtered.length === 1 ? "area matches" : "areas match"} these choices.</p><a href="/explore/outdoors" className="eyebrow border-b border-primary pb-1 text-primary">Browse all Texas outdoors →</a></div>

        {visible.length ? <ul className="mt-8 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{visible.map((destination) => <li key={destination.id} className="border-t border-border py-6"><p className="eyebrow text-primary">{title(destination.region)} · Near {destination.nearestTown}</p><h3 className="mt-2 font-display text-2xl leading-tight"><a href={`/destination/${destination.slug}`} className="hover:text-primary">{destination.name}</a></h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{destination.summary}</p><p className="mt-4 text-xs leading-5 text-muted-foreground"><strong className="font-semibold text-foreground">Access note:</strong> {destination.entryNote}</p><a href={`/destination/${destination.slug}`} className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open WMA guide →</a></li>)}</ul> : <div className="mt-8 border-t border-border py-10"><p className="font-display text-3xl">No WMA matches those choices.</p><p className="mt-3 text-sm text-muted-foreground">Try a broader place, county, habitat or region.</p></div>}

        {remaining > 0 ? <div className="mt-8 border-t border-border pt-7 text-center"><button type="button" onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, filtered.length))} className="eyebrow border-b border-primary pb-1 text-primary">Show {Math.min(PAGE_SIZE, remaining)} more areas →</button></div> : null}

        <div className="mt-10 grid gap-5 border-t border-border pt-7 text-sm leading-6 text-muted-foreground sm:grid-cols-2"><p><strong className="text-foreground">Permit rules vary by area.</strong> Use each destination&apos;s current TPWD source and access note, then confirm the permit, hunt-period and registration rules that apply before arrival.</p><p><strong className="text-foreground">Need the statewide permit first?</strong> <a href="/hunting/annual-public-hunting-permit" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Read the Annual Public Hunting Permit guide</a> or return to <a href="/hunting/public-hunting" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Texas public hunting</a>.</p></div>
      </Container>
    </section>
  );
}
