import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { FishingPhoto } from "@/components/fishing/FishingPhoto";
import { Container } from "@/components/layout/Container";
import { getFishingLakeImage } from "@/data/fishing/image-library";
import { buildFishingLakeQuickAnswers } from "@/data/fishing/lake-directory-answers";
import lakeDirectoryAdvisories from "@/data/fishing/lake-directory-advisories.json";
import { fishingFoundationAnchor } from "@/data/fishing/slugs";
import type { FishingLake } from "@/data/fishing/types";

type Target = { name: string; quality: string; prominence: string };
type Row = { lake: FishingLake; targets: Target[] };

export function FishingLakesDirectory({ rows, latestReview }: { rows: Row[]; latestReview?: string }) {
  const quickAnswers = buildFishingLakeQuickAnswers(rows.length);
  const [searchText, setSearchText] = useState("");
  const [region, setRegion] = useState("");
  const [species, setSpecies] = useState("");
  const [access, setAccess] = useState("all");
  const [sortOrder, setSortOrder] = useState("name");
  const [selectedLakes, setSelectedLakes] = useState<string[]>([]);
  // Render one manageable cohort of illustrated cards; the complete A–Z list remains visible and crawlable.
  const [visibleCount, setVisibleCount] = useState(12);
  const regions = useMemo(() => [...new Set(rows.map(({ lake }) => lake.region))].sort(), [rows]);
  const speciesNames = useMemo(() => [...new Set(rows.flatMap(({ targets }) => targets.map(({ name }) => name)))].sort(), [rows]);
  const filteredRows = useMemo(() => rows.filter(({ lake, targets }) => {
    const needle = searchText.trim().toLowerCase();
    const matchesText = !needle || [lake.name, lake.summary, lake.region, ...lake.counties, ...lake.nearestCities, ...targets.map((item) => item.name)].some((value) => value.toLowerCase().includes(needle));
    const hasRestriction = Object.prototype.hasOwnProperty.call(lakeDirectoryAdvisories, lake.slug);
    return matchesText && (!region || lake.region === region) && (!species || targets.some((target) => target.name === species))
      && (access === "all" || (access === "exclude-restricted" && !hasRestriction) || (access === "restricted" && hasRestriction));
  }).sort((left, right) => sortOrder === "largest"
    ? (right.lake.surfaceAcres ?? -1) - (left.lake.surfaceAcres ?? -1) || left.lake.name.localeCompare(right.lake.name)
    : sortOrder === "smallest"
      ? (left.lake.surfaceAcres ?? Number.POSITIVE_INFINITY) - (right.lake.surfaceAcres ?? Number.POSITIVE_INFINITY) || left.lake.name.localeCompare(right.lake.name)
      : left.lake.name.localeCompare(right.lake.name)), [rows, searchText, region, species, access, sortOrder]);
  const visibleRows = filteredRows.slice(0, visibleCount);
  const comparisonHref = "/fishing/compare?" + selectedLakes.map((slug, index) => `lake${index + 1}=${encodeURIComponent(slug)}`).join("&");
  const toggleComparison = (slug: string) => setSelectedLakes((previous) => previous.includes(slug) ? previous.filter((item) => item !== slug) : previous.length < 3 ? [...previous, slug] : previous);
  const resetFilters = () => { setSearchText(""); setRegion(""); setSpecies(""); setAccess("all"); setSortOrder("name"); setVisibleCount(12); };
  return <>
    <Container className="py-12 sm:py-16">
      <section className="py-12" aria-labelledby="lake-directory-heading"><div className="flex flex-wrap items-end justify-between gap-5 border-b border-border pb-5"><div><p className="eyebrow text-primary">Complete lake guides</p><h2 id="lake-directory-heading" className="mt-2 font-display text-4xl">Compare Texas Fishing Lakes</h2></div>{latestReview ? <p className="text-xs leading-5 text-muted-foreground">Most recent lake-record verification: {formatDate(latestReview)}. Individual lake facts have different review dates.</p> : null}</div>
        <div className="mt-6 rounded-lg border border-border bg-muted/20 p-5" aria-label="Find and compare fishing lakes">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><h3 className="font-display text-2xl">Find a lake for your trip</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Search these completed guides, or use the <Link to="/fishing/plan" className="underline underline-offset-2">full fishing finder</Link> for broader trip planning.</p></div><button type="button" onClick={resetFilters} className="text-sm font-semibold text-primary underline underline-offset-2">Clear filters</button></div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <label className="block text-sm font-semibold">Lake, county or city<input type="search" value={searchText} onChange={(event) => setSearchText(event.target.value)} placeholder="Lake Conroe, Travis…" className="mt-2 block w-full min-w-0 rounded-md border border-border bg-background px-3 py-2.5 font-normal text-foreground" /></label>
            <label className="block text-sm font-semibold">Region<select aria-label="Region" value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 block w-full min-w-0 rounded-md border border-border bg-background px-3 py-2.5 font-normal text-foreground"><option value="">All regions</option>{regions.map((value) => <option key={value} value={value}>{titleCase(value)}</option>)}</select></label>
            <label className="block text-sm font-semibold">Target species<select aria-label="Target species" value={species} onChange={(event) => setSpecies(event.target.value)} className="mt-2 block w-full min-w-0 rounded-md border border-border bg-background px-3 py-2.5 font-normal text-foreground"><option value="">All species</option>{speciesNames.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
            <label className="block text-sm font-semibold">Documented access restrictions<select aria-label="Documented access restrictions" value={access} onChange={(event) => setAccess(event.target.value)} className="mt-2 block w-full min-w-0 rounded-md border border-border bg-background px-3 py-2.5 font-normal text-foreground"><option value="all">Show all guides</option><option value="exclude-restricted">Exclude flagged restrictions</option><option value="restricted">Show flagged restrictions only</option></select></label><label className="block text-sm font-semibold">Sort guides<select aria-label="Sort guides" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} className="mt-2 block w-full min-w-0 rounded-md border border-border bg-background px-3 py-2.5 font-normal text-foreground"><option value="name">Lake name A–Z</option><option value="largest">Largest by surface area</option><option value="smallest">Smallest by surface area</option></select></label>
          </div>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">Access is not continuously monitored for every lake. Excluding flagged restrictions does NOT mean other lakes or ramps are confirmed open. Check each managing agency before traveling.</p>
          <p role="status" aria-live="polite" className="mt-2 text-sm font-semibold">Showing {filteredRows.length} of {rows.length} lake guides</p>
          <div className="mt-4 border-t border-border pt-4"><p className="text-sm font-semibold">Compare up to three lakes</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Select lakes in the cards below to open the existing side-by-side lake comparison.</p><div className="mt-3 flex flex-wrap items-center gap-3">{selectedLakes.length > 0 ? <><a href={comparisonHref} className="inline-block rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground">Compare {selectedLakes.length} selected {selectedLakes.length === 1 ? "lake" : "lakes"} →</a><button type="button" onClick={() => setSelectedLakes([])} className="text-sm underline underline-offset-2">Clear selection</button></> : <Link to="/fishing/compare" className="text-sm font-semibold text-primary underline underline-offset-2">Open full lake comparison →</Link>}</div></div>
        </div>
        {filteredRows.length === 0 ? <div className="border-b border-border py-10"><p className="font-display text-2xl">No lakes match these filters.</p><button type="button" onClick={resetFilters} className="mt-3 text-sm font-semibold text-primary underline underline-offset-2">Show every completed lake guide</button></div> : null}
        {filteredRows.length > 0 ? <nav aria-label="All matching fishing lake guides" className="mt-6 border-y border-border py-5"><h3 className="text-sm font-semibold">Jump to a lake guide · {filteredRows.length} matching</h3><ul className="mt-3 grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-4">{filteredRows.map(({ lake }) => <li key={lake.id}><a href={fishingFoundationAnchor("lake", lake.slug)} className="text-primary underline decoration-border underline-offset-2 hover:decoration-primary">{lake.name}</a></li>)}</ul></nav> : null}
        <div className="grid gap-x-8 lg:grid-cols-2">{visibleRows.map(({ lake, targets }) => { const image = (lake.slug === "lake-bridgeport" || lake.slug === "lake-sweetwater") ? undefined : getFishingLakeImage(lake.slug); const advisory = lakeDirectoryAdvisories[lake.slug as keyof typeof lakeDirectoryAdvisories]; const displayTargets = getGroupedFisheryTargets(lake.slug, targets); return <article key={lake.id} className="border-b border-border py-8">{image ? <FishingPhoto image={image} className="mb-6" imageClassName="aspect-[16/9] w-full object-cover" /> : null}<div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{titleCase(lake.region)}</p><h3 className="mt-2 font-display text-3xl"><a href={fishingFoundationAnchor("lake", lake.slug)} className="hover:text-primary">{lake.name}</a></h3></div><p className="text-sm text-muted-foreground">{lake.surfaceAcres ? `${lake.surfaceAcres.toLocaleString("en-US")} acres` : "Size not listed"}</p></div>{advisory ? <aside className="mt-4 border-l-4 border-amber-600 bg-amber-50 p-4 text-sm leading-6 text-amber-950" aria-label={`Official access restriction for ${lake.name}`}><strong>Official access restriction — check before travel</strong><p className="mt-2">{advisory.notice}</p><p className="mt-2 text-xs">TPWD advisory reviewed {formatDate(advisory.verifiedAt)} · <a href={advisory.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">View official park alert</a>. This does not establish current same-day conditions.</p></aside> : null}<p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{lake.summary}</p><dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2"><Fact label="Counties" value={lake.counties.length ? lake.counties.join(", ") : "Not verified in directory — see lake guide"} /><Fact label="Nearby cities" value={lake.nearestCities.length ? lake.nearestCities.join(", ") : undefined} /><Fact label="Maximum depth" value={lake.maxDepthFeet ? `${lake.maxDepthFeet} ft` : undefined} /><Fact label="Primary waterway" value={lake.primaryWaterway} /></dl>{targets.length ? <div className="mt-6"><p className="eyebrow text-muted-foreground">Fishing targets (fishery profile, not current availability)</p><ul className="mt-3 flex flex-wrap gap-2">{displayTargets.slice(0, 6).map((target) => <li key={target.name} className="border border-border px-3 py-1.5 text-xs" title={target.name.includes("(TPWD combined)") ? "TPWD grades this species group together; the grade is not an independent rating for each fish." : "Source-informed fishery assessment; check the linked primary source for the scope of any agency rating."}>{target.name}{target.quality !== "unknown" ? ` · ${target.quality}` : " · documented species; no quality grade"}</li>)}</ul></div> : null}<div className="mt-6 flex flex-wrap items-center justify-between gap-4"><a href={fishingFoundationAnchor("lake", lake.slug)} className="eyebrow inline-block border-b border-primary pb-1 text-primary">Open complete lake guide →</a><label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium"><input type="checkbox" checked={selectedLakes.includes(lake.slug)} disabled={!selectedLakes.includes(lake.slug) && selectedLakes.length >= 3} onChange={() => toggleComparison(lake.slug)} className="h-4 w-4 accent-primary" />Compare this lake</label></div></article>; })}</div>
        {visibleRows.length < filteredRows.length ? <div className="mt-8 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + 12)} className="rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-muted">Show 12 more lake cards ({filteredRows.length - visibleRows.length} remaining)</button><p className="mt-2 text-xs text-muted-foreground">Every matching lake guide is accessible from the A–Z links above.</p></div> : null}
      </section>
      <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="lake-answers-heading"><div><p className="eyebrow text-primary">Quick answers</p><h2 id="lake-answers-heading" className="mt-2 font-display text-3xl">What this directory covers</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">These published guides cover different fishing destinations and conditions. The finder above helps narrow your choices; the individual guides provide the detailed sources.</p></div><div className="grid gap-x-8 md:grid-cols-2">{quickAnswers.map((item) => <article key={item.question} className="border-t border-border py-5"><h3 className="font-display text-2xl leading-tight">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>
      <section className="border-t border-border py-10" aria-labelledby="fishery-method-heading"><p className="eyebrow text-primary">Editorial method</p><h2 id="fishery-method-heading" className="mt-2 font-display text-3xl">What fishery labels mean</h2><p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">Poor, fair, good and excellent are qualitative, source-informed fishery assessments—not live catch forecasts or guaranteed independent TPWD grades for every species. TPWD sometimes grades a combined group (for example white and hybrid striped bass at Lake Somerville); we preserve that grouping. Documented fish without a supported grade appear without a score, as with Falcon alligator gar. Check each lake guide and official TPWD profile for source scope and review date. For statewide context, see <a href="https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">TPWD's public lake profiles</a>. Send errors or newer source documentation through our <Link to="/corrections-policy" className="underline underline-offset-2">corrections policy</Link>.</p></section>
      <section className="border-y border-border py-10"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">How to use it</p><h2 className="mt-2 font-display text-3xl">Check Current Lake Conditions Before You Go</h2></div><div className="max-w-4xl space-y-4 text-sm leading-7 text-muted-foreground"><p>The directory compares source-backed identity and fishery information. Individual lake guides go deeper into seasonal patterns, access, boating, camping and local planning.</p><p>Fishing reports, lake levels, ramp usability, regulations and closures can change after these records are reviewed. Use the official fisheries and managing-agency links inside each lake guide before relying on a current condition or rule.</p><p>New guides are added as the underlying fishing and access research is completed and reviewed.</p><Link to="/fishing/regulations" className="inline-block border-b border-primary pb-1 font-semibold text-primary">Use the Texas fishing regulations checklist →</Link></div></div></section>
    </Container>
  </>;
}

type FisheryGroup = { members: string[]; name: string; quality: string };
const TPWD_COMBINED_FISHERY_GROUPS: Record<string, FisheryGroup[]> = {
  "lake-somerville": [{ members: ["White bass", "Hybrid striped bass"], name: "White & hybrid striped bass (TPWD combined)", quality: "excellent" }],
  "richland-chambers-reservoir": [{ members: ["White bass", "Hybrid striped bass"], name: "White & hybrid striped bass (TPWD combined)", quality: "excellent" }],
  "cedar-creek-reservoir": [{ members: ["White bass", "Hybrid striped bass"], name: "White & hybrid striped bass (TPWD combined)", quality: "excellent" }],
  "lake-palestine": [{ members: ["White bass", "Hybrid striped bass"], name: "White & hybrid striped bass (TPWD combined)", quality: "excellent" }],
  "lake-bridgeport": [
    { members: ["White bass", "Hybrid striped bass"], name: "White & hybrid striped bass (TPWD combined)", quality: "excellent" },
    { members: ["Largemouth bass", "Smallmouth bass"], name: "Largemouth & smallmouth bass (TPWD combined)", quality: "good" },
  ],
  "lake-tawakoni": [{ members: ["Striped bass", "Hybrid striped bass"], name: "Hybrid & striped bass (TPWD combined)", quality: "excellent" }],
};

/** Display TPWD combined groups once, not as fictitious independent agency grades. */
function getGroupedFisheryTargets(slug: string, targets: Target[]): Target[] {
  const covered = new Set<string>();
  const grouped: Target[] = [];
  for (const group of TPWD_COMBINED_FISHERY_GROUPS[slug] ?? []) {
    if (!group.members.every((name) => targets.some((target) => target.name === name && target.quality === group.quality))) continue;
    group.members.forEach((member) => covered.add(member));
    grouped.push({ name: group.name, quality: group.quality, prominence: "primary" });
  }
  return [...grouped, ...targets.filter((target) => !covered.has(target.name))];
}

function Fact({ label, value }: { label: string; value?: string }) { return value ? <div><dt className="eyebrow text-muted-foreground">{label}</dt><dd className="mt-1">{value}</dd></div> : null; }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
