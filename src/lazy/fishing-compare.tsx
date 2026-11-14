import { createLazyFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";
import { FISHING_LAKE_COMPARE_PATH, FISHING_TRIP_PLANNER_PATH } from "@/data/fishing/planner-routing";

export const Route = createLazyFileRoute("/fishing/compare")({
  component: FishingLakeComparePage,
});

function FishingLakeComparePage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const requested = [search.lake1, search.lake2, search.lake3].filter((value): value is string => Boolean(value));
  const selectedSlugs = requested.length ? [...new Set(requested)] : data.rows.slice(0, 3).map((row) => row.lake.slug);
  const selected = selectedSlugs.map((slug) => data.rows.find((row) => row.lake.slug === slug)).filter((row): row is (typeof data.rows)[number] => Boolean(row)).slice(0, 3);
  const defaults = selected.map((row) => row.lake.slug);
  const hasReports = selected.some((row) => row.reports.current.length > 0);
  const hasGuideBusinesses = selected.some((row) => row.guides.length > 0);
  const hasServices = selected.some((row) => row.services.length > 0);

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Compare lakes</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Compare Texas Fishing Lakes Side by Side</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Choose up to three Texas lakes. Compare source-documented fishery strengths, boat and bank access, safety notices and official lake conditions before you decide where to fish.</p><a href={FISHING_TRIP_PLANNER_PATH} className="mt-8 inline-block border-b border-ink-foreground pb-1 text-sm font-semibold">Plan your Texas fishing trip →</a></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="border-b border-border pb-10"><p className="eyebrow text-primary">Choose up to three</p><h2 className="mt-2 font-display text-4xl">Choose Lakes to Compare</h2>
        <form method="get" action={FISHING_LAKE_COMPARE_PATH} className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          {["lake1", "lake2", "lake3"].map((name, index) => <label key={name} className="text-sm"><span className="eyebrow text-muted-foreground">Lake {index + 1}</span><select name={name} defaultValue={defaults[index] ?? ""} className="mt-2 w-full min-w-0 rounded-md border border-border bg-background px-3 py-3"><option value="">None</option>{data.rows.map((row) => <option key={row.lake.id} value={row.lake.slug}>{row.lake.name}</option>)}</select></label>)}
          <button type="submit" className="rounded-md border border-primary px-5 py-3 text-sm font-semibold text-primary hover:bg-muted">Compare</button>
        </form>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">Selections change the facts shown, not their order of merit. This tool does not rank the selected lakes. Every selection resolves to the same canonical comparison page.</p>
      </section>

      {selected.length ? <>
        <section className="border-b border-border py-10" aria-labelledby="decision-heading">
          <p className="eyebrow text-primary">Start with the differences</p><h2 id="decision-heading" className="mt-2 font-display text-3xl">What matters when choosing among these lakes</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">A strong fishery grade does not mean fish are biting today. Access inventory is not a count of usable boat ramps. Compare the species, season, shore/boat options and up-to-date managing-agency conditions together.</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">{selected.map((row) => <article key={row.lake.id} className="rounded-lg border border-border p-5"><h3 className="font-display text-2xl"><a className="text-primary underline underline-offset-4" href={row.href}>{row.lake.name}</a></h3>
            <p className="mt-3 text-sm leading-7">{row.lake.summary}</p>
            <dl className="mt-4 space-y-3 text-sm"><div><dt className="font-semibold">Fishery starting point</dt><dd className="mt-1 text-muted-foreground">{row.targets.slice(0, 2).map((target) => target.species?.commonName + " (" + target.relation.quality + ")").join("; ") || "See lake guide"}</dd></div><div><dt className="font-semibold">Seasonal angle</dt><dd className="mt-1 text-muted-foreground">{seasonalNote(row.targets)}</dd></div><div><dt className="font-semibold">Documented access types</dt><dd className="mt-1 text-muted-foreground">{accessBreakdown(row.access)}. Opening status is not established.</dd></div></dl>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm"><a href={row.href} className="font-semibold text-primary underline underline-offset-2">Detailed lake guide</a>{row.comparisonAuthority.lakeSource ? <a href={row.comparisonAuthority.lakeSource} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">TPWD fishery profile</a> : null}</div>
          </article>)}</div>
        </section>

        <section className="py-10" aria-labelledby="lake-comparison-heading">
          <h2 id="lake-comparison-heading" className="font-display text-3xl">Lake Comparison</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">These are documented characteristics, not live fishing forecasts. On a narrow screen, scroll the table horizontally. Keyboard users can focus the table area and use the arrow keys.</p>
          <div role="region" aria-label="Lake comparison table" tabIndex={0} className="mt-5 max-w-full overflow-x-auto border-y border-border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <table className="w-full min-w-[760px] table-fixed border-collapse">
              <caption className="sr-only">Source-backed facts for the selected Texas fishing lakes, by lake and comparison topic</caption>
              <thead><tr><th scope="col" className="w-1/4 p-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">Topic</th>
                {selected.map((row) => <th key={row.lake.id} scope="col" className="border-l border-border p-4 text-left align-top font-normal"><p className="eyebrow text-primary">{titleCase(row.lake.region)}</p><h3 className="mt-2 font-display text-2xl"><a href={row.href}>{row.lake.name}</a></h3></th>)}
              </tr></thead>
              <tbody>
                <CompareRow label="Surface area" rows={selected.map((row) => row.lake.surfaceAcres ? row.lake.surfaceAcres.toLocaleString("en-US") + " acres" : "Not documented")} />
                <CompareRow label="Maximum depth" rows={selected.map((row) => row.lake.maxDepthFeet ? row.lake.maxDepthFeet + " ft" : "Not documented")} />
                <CompareRow label="Counties" rows={selected.map((row) => row.lake.counties.join(", ") || "Not documented")} />
                <CompareRow label="Nearby cities" rows={selected.map((row) => row.lake.nearestCities.join(", ") || "Not documented")} />
                <CompareRow label="Source-backed fishery grades" rows={selected.map((row) => <ul className="space-y-2">{row.targets.slice(0, 5).map((target) => <li key={target.relation.id}>{target.species?.commonName || "Species"} — {target.relation.quality === "unknown" ? "grade unavailable" : target.relation.quality}{target.relation.sources[0]?.url ? <> · <a href={target.relation.sources[0].url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">source</a></> : null}</li>)}</ul>)} />
                <CompareRow label="Recorded access, not open-now status" rows={selected.map((row) => accessBreakdown(row.access))} />
                <CompareRow label="Official lake level and conditions" rows={selected.map((row) => <div className="space-y-2">{row.comparisonAuthority.levelSource ? <p><a href={row.comparisonAuthority.levelSource} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Check measured lake level</a></p> : null}{row.comparisonAuthority.operatorConditionsSource ? <p><a href={row.comparisonAuthority.operatorConditionsSource} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Managing agency's ramp status</a></p> : null}<p><a href={row.comparisonAuthority.lakeSource || row.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">Official lake profile</a></p><p className="text-xs text-muted-foreground">Read measurement dates and operator alerts before travel; status is not verified live on this page.</p></div>)} />
                {hasReports ? <CompareRow label="Current fishing reports" rows={selected.map((row) => row.reports.current.length ? <a href={row.reports.current[0].href} className="text-primary underline underline-offset-2">Read the latest currently valid report</a> : "No current verified report published here")} /> : null}
                {hasGuideBusinesses ? <CompareRow label="Verified guides (local fishing businesses)" rows={selected.map((row) => count(row.guides.length))} /> : null}
                {hasServices ? <CompareRow label="Verified services (published local listings)" rows={selected.map((row) => count(row.services.length))} /> : null}
                <CompareRow label="Reviewed source dates" rows={selected.map((row) => <div className="space-y-1 text-xs leading-5"><p>Lake facts: {row.comparisonAuthority.lakeSourceReviewedAt || "date unavailable"}</p><p>Fishery relationships: {row.comparisonAuthority.fisheryReviewedAt || "date unavailable"}</p><p>Access records: {row.comparisonAuthority.accessReviewedAt || "none published"}</p><p>Additional research: {row.comparisonAuthority.advisoryReviewedAt || "none recorded"}</p></div>)} />
              </tbody>
            </table>
          </div>
          {!hasReports ? <p className="mt-4 text-sm leading-7 text-muted-foreground">No current verified fishing reports are published for this selection. This does not mean fishing is closed or unproductive. Check <a href="https://tpwd.texas.gov/fishboat/fish/recreational/fishreport.phtml" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">TPWD fishing reports</a> for any new updates; historical reports are not presented as current.</p> : null}
          {!hasGuideBusinesses && !hasServices ? <p className="mt-2 text-xs leading-6 text-muted-foreground">Unpopulated commercial directories are hidden. No published verified listing does not mean local guides or services do not exist.</p> : null}
        </section>

        <section className="border-t border-border py-10" aria-labelledby="advisories-heading"><p className="eyebrow text-primary">Check before travel</p><h2 id="advisories-heading" className="mt-2 font-display text-3xl">Regulations, hazards and launch restrictions</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">These are selected notices from prior official-source research, not a continuously monitored all-clear. Ramp access, fish-consumption advice, invasive species rules and fishing limits can change. Open the primary source the day you go.</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-3">{selected.map((row) => <article key={row.lake.id} className="border-t-2 border-primary pt-4"><h3 className="font-display text-2xl">{row.lake.name}</h3>
            {row.comparisonAuthority.advisoryReviewedAt ? <p className="mt-1 text-xs text-muted-foreground">Source research reviewed: {row.comparisonAuthority.advisoryReviewedAt}. Not live clearance.</p> : null}
            {row.comparisonAuthority.importantAdvisories.length ? <ul className="mt-4 space-y-4">{row.comparisonAuthority.importantAdvisories.map((alert, index) => <li key={alert.sourceUrl + index}><h4 className="text-sm font-semibold">{alert.label}</h4><p className="mt-1 text-sm leading-7 text-muted-foreground">{alert.text}</p><a href={alert.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs font-semibold text-primary underline underline-offset-2">Check official notice</a></li>)}</ul> : <p className="mt-4 text-sm leading-7 text-muted-foreground">No special alert is captured in this comparison's selected-notice registry. This is not confirmation that the lake has no active advisories.</p>}
            <div className="mt-4 flex flex-wrap gap-4 text-sm"><a href={row.href} className="text-primary underline underline-offset-2">Full lake regulations and access</a>{row.comparisonAuthority.operatorConditionsSource ? <a href={row.comparisonAuthority.operatorConditionsSource} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">NPS live access-status page</a> : null}</div>
          </article>)}</div>
        </section>
      </> : <p className="py-12 text-sm text-muted-foreground">Select at least one published lake to compare. Invalid or unavailable lake selections are not silently substituted.</p>}

      <section className="border-y border-border py-10"><p className="eyebrow text-primary">Comparison policy</p><h2 className="mt-2 font-display text-3xl">How to Read This Comparison</h2>
        <div className="mt-5 max-w-5xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>Fishery labels describe source-informed, historical angling opportunity, not a catch guarantee or real-time report. Some sources rate species groups together; a grouping must not be represented as an independent species rating. See linked primary sources and the lake guide for the context behind each grade.</p>
          <p>Verified access means a facility was documented in an official or otherwise independently reviewed listing; it does not certify the ramp is open, deep enough, accessible, affordable or suitable for your boat today. No local listing means unknown coverage, not absence of a service. Advisory reviews and lake-profile verification are separate; neither date is refreshed simply because a scheduled job ran.</p>
          <p>{data.policy.conditions} {data.policy.ranking} The comparison engine does not accept paid weighting. Use the <a href="/fishing/regulations" className="text-primary underline underline-offset-2">Texas fishing regulations guide</a> and <a href="https://tpwd.texas.gov/fishboat/fish/recreational/lakes/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">TPWD lake directory</a> before a trip. Send source corrections through our <a href="/corrections-policy" className="text-primary underline underline-offset-2">corrections policy</a>.</p>
        </div>
      </section>
    </Container>
  </>;
}

function CompareRow({ label, rows }: { label: string; rows: ReactNode[] }) {
  return <tr><th scope="row" className="border-t border-border p-4 text-left align-top text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}</th>{rows.map((value, index) => <td key={label + "-" + index} className="border-l border-t border-border p-4 align-top text-sm leading-6">{value}</td>)}</tr>;
}
function accessBreakdown(access: Array<{ point: { kind: string } }>) {
  if (!access.length) return "No individually verified facility listings published";
  const ramps = access.filter((entry) => entry.point.kind === "boat-ramp").length;
  const shore = access.filter((entry) => ["shore", "pier", "kayak-launch"].includes(entry.point.kind)).length;
  const marinas = access.filter((entry) => entry.point.kind === "marina").length;
  const groups = [ramps ? ramps + " listed boat " + (ramps === 1 ? "ramp" : "ramps") : "", shore ? shore + " listed shore/pier/kayak " + (shore === 1 ? "site" : "sites") : "", marinas ? marinas + " listed " + (marinas === 1 ? "marina" : "marinas") : ""].filter(Boolean);
  return groups.join("; ") || access.length + " documented access facilities (type unclassified)";
}
function seasonalNote(targets: Array<{ relation: { seasonalPatterns: Array<{ season: string; summary: string }> }; species?: { commonName: string } }>) {
  const target = targets.find((entry) => entry.relation.seasonalPatterns.length);
  if (!target) return "See the full guide for local seasonal techniques.";
  const season = target.relation.seasonalPatterns[0];
  return (target.species?.commonName || "Fish") + ": " + titleCase(season.season) + ". " + season.summary;
}
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function count(value: number) { return value ? String(value) + " published" : "No verified listing published"; }
