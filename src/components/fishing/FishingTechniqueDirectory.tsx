import { Container } from "@/components/layout/Container";
import type { FishingTechniqueDirectoryData } from "@/data/fishing/technique-data.server";
import { FISHING_TECHNIQUES_DIRECTORY_PATH } from "@/data/fishing/technique-routing";
import { fishingTechniqueFaq } from "@/data/fishing/technique-faq";
import { fishingTechniqueDecisionGuide } from "@/data/fishing/technique-decision-guide";

type TechniqueSearch = { category?: string; species?: string; season?: string };

export function FishingTechniqueDirectory({ data, search }: { data: FishingTechniqueDirectoryData; search: TechniqueSearch }) {
  const selectedSpecies = data.species.find((fish) => fish.slug === search.species);
  const entries = data.entries
    .filter((entry) => !search.category || entry.technique.category === search.category)
    .filter((entry) => !selectedSpecies || entry.species.some((fish) => fish.id === selectedSpecies.id))
    .filter((entry) => !search.season || entry.seasons.some((season) => season === search.season || (season === "year-round" && search.season !== "year-round")));

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Fishing techniques</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas Fishing Techniques</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Browse practical fishing techniques, then see the Texas lakes, target species and seasons connected to each method.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href="/fishing/seasons" className="border-b border-ink-foreground pb-1 font-semibold">Fishing seasons →</a><a href="/fishing/plan" className="border-b border-ink-foreground/50 pb-1">Trip planner →</a><a href="/fishing/reports" className="border-b border-ink-foreground/50 pb-1">Fresh reports →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-6 border-y border-border py-8 lg:grid-cols-[15rem_1fr]" aria-labelledby="technique-policy"><div><p className="eyebrow text-primary">Choose a method</p><h2 id="technique-policy" className="mt-2 font-display text-3xl">Match the Method to the Water</h2></div><div className="grid gap-4 text-sm leading-7 text-muted-foreground md:grid-cols-3"><p>{data.policy.sourcing}</p><p>{data.policy.conditions}</p><p>{data.policy.commerce}</p></div></section>

      <section className="border-b border-border py-12" aria-labelledby="method-comparison">
        <p className="eyebrow text-primary">Start with the conditions</p>
        <h2 id="method-comparison" className="mt-2 max-w-3xl font-display text-4xl sm:text-5xl">Which Fishing Method Fits Your Water?</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Look at depth, cover and the fish you can locate before choosing a lure. These are starting points, not a report of what is biting today. The lake-specific links below show the documented applications.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {fishingTechniqueDecisionGuide.map((choice) => <article key={choice.slug} className="flex flex-col border border-border p-5">
            <h3 className="font-display text-2xl"><a className="hover:text-primary" href={`${FISHING_TECHNIQUES_DIRECTORY_PATH}/${choice.slug}`}>{choice.method}</a></h3>
            <p className="mt-3 text-sm leading-6"><strong>Choose it when:</strong> {choice.bestWhen}.</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground"><strong>Depth and cover:</strong> {choice.depthAndCover}.</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground"><strong>Typical target:</strong> {choice.target}.</p>
            <p className="mt-3 text-sm leading-6"><strong>First move:</strong> {choice.tryFirst}.</p>
            <p className="mt-2 text-sm leading-6"><strong>Switch if:</strong> {choice.switchWhen}.</p>
            <a href={`${FISHING_TECHNIQUES_DIRECTORY_PATH}/${choice.slug}`} className="mt-auto inline-block self-start border-b border-primary pt-5 pb-1 text-sm font-semibold text-primary">See the full guide →</a>
          </article>)}
        </div>
      </section>

      <form method="get" action={FISHING_TECHNIQUES_DIRECTORY_PATH} className="grid gap-5 border-b border-border py-8 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end" aria-label="Fishing technique filters">
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Category</span><select name="category" defaultValue={search.category ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">All categories</option>{data.categories.map((category) => <option key={category} value={category}>{titleCase(category)}</option>)}</select></label>
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Species</span><select name="species" defaultValue={search.species ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any verified species</option>{data.species.map((fish) => <option key={fish.id} value={fish.slug}>{fish.commonName}</option>)}</select></label>
        <label className="text-sm"><span className="eyebrow text-muted-foreground">Season</span><select name="season" defaultValue={search.season ?? ""} className="mt-2 w-full border border-border bg-background px-3 py-3"><option value="">Any verified season</option>{["spring", "summer", "fall", "winter", "year-round"].map((season) => <option key={season} value={season}>{titleCase(season)}</option>)}</select></label>
        <button type="submit" className="border border-primary px-5 py-3 text-sm font-semibold text-primary">Update</button>
      </form>

      <section className="py-10" aria-labelledby="technique-results"><div className="flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-primary">Browse techniques</p><h2 id="technique-results" className="mt-2 font-display text-4xl">{entries.length} Fishing Technique{entries.length === 1 ? "" : "s"}</h2></div><p className="max-w-xl text-xs leading-6 text-muted-foreground">The filters reflect documented lake records, not today's fishing. Year-round means a narrower season was not recorded. Methods are alphabetical; paid placement does not influence the order.</p></div>
        <div className="mt-7 grid gap-x-8 lg:grid-cols-2">{entries.map((entry) => <article key={entry.technique.id} className="border-t border-border py-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="eyebrow text-primary">{titleCase(entry.technique.category)}</p><h3 className="mt-2 font-display text-3xl"><a href={entry.canonicalPath} className="hover:text-primary">{entry.technique.name}</a></h3></div><span className="border border-border px-3 py-1.5 text-xs">{entry.lakeCount} lake{entry.lakeCount === 1 ? "" : "s"}</span></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{entry.technique.summary}</p><div className="mt-5 grid gap-4 sm:grid-cols-2"><div><p className="eyebrow text-muted-foreground">Target species</p><p className="mt-2 text-sm">{entry.species.map((fish) => fish.commonName).join(", ")}</p></div><div><p className="eyebrow text-muted-foreground">Documented seasons</p><p className="mt-2 text-sm">{entry.seasons.filter((season) => season !== "year-round").map(titleCase).join(", ") || "No specific season recorded"}{entry.seasons.includes("year-round") ? " · Year-round applicability" : ""}</p></div></div><a href={entry.canonicalPath} className="mt-6 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open technique guide →</a></article>)}</div>
        {!entries.length ? <div className="border-y border-border py-12"><h3 className="font-display text-3xl">No Fishing Techniques Match These Filters</h3><p className="mt-3 text-sm text-muted-foreground">That reflects the current complete-guide catalog, not a claim that another method cannot work.</p></div> : null}
      </section>

      <section className="grid gap-8 border-y border-border py-10 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Trip planning</p><h2 className="mt-2 font-display text-3xl">Check Conditions Before You Go</h2></div><div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground"><p>Use the technique pages to understand verified lake applications, then check <a href="/fishing/reports" className="border-b border-primary text-primary">fresh fishing reports</a>, <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>, weather, lake levels, access and closures before travel.</p><p className="text-xs">Lake-technique source relationships last reviewed {data.verifiedAt}. A current report may differ.</p></div></section>

      <section className="py-12" aria-labelledby="technique-faq"><p className="eyebrow text-primary">Quick answers</p><h2 id="technique-faq" className="mt-2 font-display text-4xl">Texas Fishing Techniques FAQ</h2><div className="mt-7 grid gap-6 lg:grid-cols-3">{fishingTechniqueFaq.map((item) => <article key={item.question} className="border-t border-border pt-5"><h3 className="font-display text-xl">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>
    </Container>
  </>;
}

function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
