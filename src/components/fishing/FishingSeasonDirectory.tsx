import { Container } from "@/components/layout/Container";
import type { FishingSeasonData } from "@/data/fishing/season-data.server";
import { FISHING_SEASON_FILTERS, FISHING_SEASONS_PATH, type FishingSeasonFilter } from "@/data/fishing/season-routing";

type SeasonSearch = { season?: FishingSeasonFilter; species?: string; month?: string; region?: string };

type MonthDefinition = readonly [slug: string, label: string, season: FishingSeasonFilter];

const MONTHS: readonly MonthDefinition[] = [
  ["jan", "January", "winter"], ["feb", "February", "winter"], ["mar", "March", "spring"],
  ["apr", "April", "spring"], ["may", "May", "spring"], ["jun", "June", "summer"],
  ["jul", "July", "summer"], ["aug", "August", "summer"], ["sep", "September", "fall"],
  ["oct", "October", "fall"], ["nov", "November", "fall"], ["dec", "December", "winter"],
];

const SEASON_INTROS: Record<FishingSeasonFilter, string> = {
  spring: "Explore verified spring patterns across complete Texas lake guides, then use current reports to see what has changed recently.",
  summer: "Explore verified summer patterns across complete Texas lake guides, with current reports kept separate so seasonal guidance is not mistaken for today's conditions.",
  fall: "Explore verified fall patterns across complete Texas lake guides and compare them with fresh report context before you travel.",
  winter: "Explore verified winter patterns across complete Texas lake guides, then check fresh reports, access and current regulations before heading out.",
};

export function FishingSeasonDirectory({ data, search }: { data: FishingSeasonData; search: SeasonSearch }) {
  const selectedSpecies = data.species.find((fish) => fish.slug === search.species);
  const selectedMonth = MONTHS.find(([slug]) => slug === search.month);
  const effectiveSeason = search.season ?? selectedMonth?.[2];
  const regionOptions = [...new Set(data.entries.map((entry) => entry.lake.region))].sort();
  const selectedRegion = regionOptions.find((region) => slugify(region) === search.region);
  const hasFilters = Boolean(search.month || search.season || search.species || search.region);

  const entries = data.entries
    .filter((entry) => !selectedSpecies || entry.species.id === selectedSpecies.id)
    .filter((entry) => !effectiveSeason || matchesSeason(entry.relation.seasonalPatterns, effectiveSeason))
    .filter((entry) => !selectedRegion || entry.lake.region === selectedRegion);

  const grouped = [...new Map(entries.map((entry) => [entry.lake.id, {
    lake: entry.lake,
    href: entry.href,
    entries: entries.filter((candidate) => candidate.lake.id === entry.lake.id),
  }])).values()];

  const activeLabel = selectedMonth?.[1]
    ?? (effectiveSeason ? titleCase(effectiveSeason) : selectedSpecies?.commonName)
    ?? (selectedRegion ? displayRegion(selectedRegion) : "Texas lake");

  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Fishing seasons</nav></Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas Lake Fishing Seasons by Month</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Choose a month, season, fish or Texas region to explore source-backed freshwater lake patterns—then check fresh fishing reports for current conditions before you go.</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a href="#choose-month" className="border-b border-ink-foreground pb-1 font-semibold">Choose a month ↓</a>
          <a href="#right-now" className="border-b border-ink-foreground/50 pb-1">Fishing right now ↓</a>
          <a href="/fishing/plan" className="border-b border-ink-foreground/50 pb-1">Trip planner →</a>
          <a href="/fishing/regulations" className="border-b border-ink-foreground/50 pb-1">Regulations →</a>
        </div>
      </Container>
    </header>

    <Container className="py-12 sm:py-16">
      <section id="choose-month" aria-labelledby="choose-month-heading">
        <p className="eyebrow text-primary">Start with the calendar</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="choose-month-heading" className="font-display text-4xl">What month are you fishing?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Choose a month to jump to the matching seasonal patterns. Texas is large, so exact timing still varies by lake, weather and region.</p>
          </div>
          {hasFilters ? <a href={FISHING_SEASONS_PATH} className="border-b border-primary pb-1 text-sm font-semibold text-primary">Clear filters</a> : null}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {MONTHS.map(([slug, label, season]) => <a key={slug} href={buildHref({ month: slug, species: search.species, region: search.region })} aria-label={`${label} — ${titleCase(season)} fishing`} aria-current={search.month === slug ? "page" : undefined} className={`border px-3 py-3 text-center text-sm font-semibold ${search.month === slug ? "border-primary text-primary" : "border-border hover:border-primary/50"}`}><span className="block">{label}</span><span className="mt-1 block text-[0.66rem] font-normal uppercase tracking-wider text-muted-foreground">{titleCase(season)}</span></a>)}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="choose-season">
        <p className="eyebrow text-primary">Or browse by season</p>
        <h2 id="choose-season" className="mt-2 font-display text-3xl">Spring, Summer, Fall and Winter</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FISHING_SEASON_FILTERS.map((season) => {
            const seasonalEntries = data.entries.filter((entry) => matchesSeason(entry.relation.seasonalPatterns, season));
            const lakeCount = new Set(seasonalEntries.map((entry) => entry.lake.id)).size;
            return <a key={season} href={buildHref({ season, species: search.species, region: search.region })} className={`border p-5 ${!search.month && search.season === season ? "border-primary" : "border-border"}`}>
              <p className="eyebrow text-primary">{titleCase(season)}</p>
              <p className="mt-2 font-display text-3xl">{lakeCount} lakes</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">with documented {season} or year-round fishing patterns</p>
            </a>;
          })}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="season-at-a-glance">
        <p className="eyebrow text-primary">Season at a glance</p>
        <h2 id="season-at-a-glance" className="mt-2 font-display text-3xl">What our lake guides cover each season</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">This is coverage, not a best-fish ranking. Species appear when verified lake relationships include that season or a year-round pattern.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FISHING_SEASON_FILTERS.map((season) => {
            const seasonalEntries = data.entries.filter((entry) => matchesSeason(entry.relation.seasonalPatterns, season));
            const lakeCount = new Set(seasonalEntries.map((entry) => entry.lake.id)).size;
            const speciesCounts = [...new Map(data.species.map((fish) => [fish.id, {
              fish,
              count: seasonalEntries.filter((entry) => entry.species.id === fish.id).length,
            }])).values()].filter((row) => row.count > 0).sort((a, b) => b.count - a.count || a.fish.commonName.localeCompare(b.fish.commonName)).slice(0, 4);
            return <article key={season} className="border-t-2 border-foreground pt-5">
              <h3 className="font-display text-2xl">{titleCase(season)}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{lakeCount} lake{lakeCount === 1 ? "" : "s"} with documented {season} or year-round patterns</p>
              <ul className="mt-4 space-y-2 text-sm">{speciesCounts.map(({ fish, count }) => <li key={fish.id} className="flex items-baseline justify-between gap-3"><span>{fish.commonName}</span><span className="text-xs text-muted-foreground">{count} lake{count === 1 ? "" : "s"}</span></li>)}</ul>
            </article>;
          })}
        </div>
      </section>

      <section className="mt-12 grid gap-6 border-y border-border py-8 lg:grid-cols-2" aria-label="Fishing filters">
        <div>
          <p className="eyebrow text-muted-foreground">Choose a fish</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={buildHref({ month: search.month, season: search.month ? undefined : search.season, region: search.region })} className={chip(!search.species)}>All fish</a>
            {data.species.map((fish) => <a key={fish.id} href={buildHref({ month: search.month, season: search.month ? undefined : search.season, species: fish.slug, region: search.region })} className={chip(search.species === fish.slug)}>{fish.commonName}</a>)}
          </div>
        </div>
        <div>
          <p className="eyebrow text-muted-foreground">Choose a Texas region</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={buildHref({ month: search.month, season: search.month ? undefined : search.season, species: search.species })} className={chip(!search.region)}>All regions</a>
            {regionOptions.map((region) => <a key={region} href={buildHref({ month: search.month, season: search.month ? undefined : search.season, species: search.species, region: slugify(region) })} className={chip(search.region === slugify(region))}>{displayRegion(region)}</a>)}
          </div>
        </div>
      </section>

      <section id="right-now" className="py-12" aria-labelledby="right-now-title">
        <p className="eyebrow text-primary">Fishing in Texas right now</p>
        <h2 id="right-now-title" className="mt-2 font-display text-4xl">Current Texas fishing reports</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Only reports that are still current appear here. Older reports remain out of the “right now” section so seasonal guidance is never presented as a live bite forecast.</p>
        {data.currentReports.length ? <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{data.currentReports.map((entry) => <article key={entry.report.id} className="border-t-2 border-foreground pt-5">
          <p className="eyebrow text-primary">{entry.lake?.name ?? "Texas fishing report"}</p>
          <h3 className="mt-2 font-display text-2xl">{entry.report.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">{entry.report.summary}</p>
          <p className="mt-3 text-xs text-muted-foreground">Published {formatDate(entry.report.publishedAt)}</p>
          <a href={entry.href} className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Read current report →</a>
        </article>)}</div> : <div className="mt-7 border-l-2 border-primary pl-5"><h3 className="font-display text-2xl">No fresh fishing reports are available right now.</h3><p className="mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">Use the seasonal planning tools on this page, then confirm weather, water levels, access and regulations before travel.</p><a href="/fishing/reports" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Browse fishing reports →</a></div>}
      </section>

      <section className="border-y border-border py-10" aria-labelledby="season-results">
        {!hasFilters ? <div className="grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-start">
          <div>
            <p className="eyebrow text-primary">Choose before you browse</p>
            <h2 id="season-results" className="mt-2 max-w-3xl font-display text-4xl">Start with a month, season, fish or region.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">The full lake catalog contains {new Set(data.entries.map((entry) => entry.lake.id)).size} complete lake guides and {data.entries.length} documented lake-and-fish relationships. Rather than dumping the entire database onto this page, choose what matters to your trip and the matching lake cards will appear here.</p>
          </div>
          <div className="border-l-2 border-primary pl-5 text-sm leading-7">
            <a href="#choose-month" className="font-semibold text-primary">Choose a month ↑</a><br />
            <a href="/fishing/lakes" className="text-primary">Browse all fishing lakes →</a><br />
            <a href="/fishing/plan" className="text-primary">Use the trip planner →</a>
          </div>
        </div> : <>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="eyebrow text-primary">Plan your fishing trip</p>
              <h2 id="season-results" className="mt-2 font-display text-4xl">{activeLabel} fishing: matching Texas lakes</h2>
              <p className="mt-3 text-sm text-muted-foreground">{grouped.length} lake{grouped.length === 1 ? "" : "s"} · {entries.length} documented fish pattern{entries.length === 1 ? "" : "s"}.</p>
            </div>
            <p className="max-w-xl text-xs leading-6 text-muted-foreground">Lakes are alphabetical. Matching fish are grouped inside each lake card.</p>
          </div>

          {effectiveSeason ? <div className="mt-7 border-l-2 border-primary pl-5"><p className="eyebrow text-primary">{titleCase(effectiveSeason)} planning note</p><p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">{SEASON_INTROS[effectiveSeason]}</p></div> : null}

          <div className="mt-7 grid gap-8 lg:grid-cols-2">{grouped.map((group) => <article key={group.lake.id} className="border-t-2 border-foreground pt-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><p className="eyebrow text-primary">{displayRegion(group.lake.region)}</p><h3 className="mt-2 font-display text-3xl">{group.lake.name}</h3></div>
              <span className="border border-border px-3 py-1 text-xs text-muted-foreground">{group.entries.length} matching fish</span>
            </div>
            <div className="mt-5 divide-y divide-border">{group.entries.map((entry) => {
              const patterns = entry.relation.seasonalPatterns.filter((pattern) => !effectiveSeason || pattern.season === effectiveSeason || pattern.season === "year-round");
              const techniques = entry.techniques.filter((row) => !effectiveSeason || row.profile.seasons.includes(effectiveSeason) || row.profile.seasons.includes("year-round"));
              const yearRound = patterns.some((pattern) => pattern.season === "year-round");
              return <section key={entry.id} className="py-5 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-3"><h4 className="font-display text-2xl">{entry.species.commonName}</h4>{yearRound ? <span className="text-[0.68rem] uppercase tracking-wider text-muted-foreground">Available year-round</span> : null}</div>
                <div className="mt-3 space-y-3">{patterns.map((pattern, index) => <div key={`${pattern.season}-${index}`}><p className="text-sm leading-7"><strong>{pattern.season === "year-round" ? "Year-round context" : `${titleCase(pattern.season)} pattern`}:</strong> <span className="text-muted-foreground">{pattern.summary}</span></p>{pattern.habitats?.length ? <p className="mt-1 text-xs text-muted-foreground"><strong className="text-foreground">Where:</strong> {pattern.habitats.join(", ")}</p> : null}{pattern.depthGuidance ? <p className="mt-1 text-xs text-muted-foreground"><strong className="text-foreground">Depth:</strong> {pattern.depthGuidance}</p> : null}</div>)}</div>
                {techniques.length ? <div className="mt-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Techniques connected to this fish and lake</p><div className="mt-2 flex flex-wrap gap-2">{techniques.map((row) => <span key={row.profile.id} className="border border-border px-2.5 py-1 text-xs" title={row.profile.summary}>{row.technique?.name}</span>)}</div></div> : null}
              </section>;
            })}</div>
            <a href={group.href} className="mt-2 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open {group.lake.name} fishing guide →</a>
          </article>)}</div>

          {!grouped.length ? <div className="mt-7 border-y border-border py-12"><h3 className="font-display text-3xl">No lake guides match these filters</h3><p className="mt-3 text-sm text-muted-foreground">Try another month, season, fish or region. A missing match is not a claim that the fish cannot be caught then.</p></div> : null}
        </>}
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Before you head out</p><h2 className="mt-2 font-display text-3xl">Check current conditions before you go</h2></div>
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground">
          <p>{data.policy.conditions}</p><p>{data.policy.yearRound}</p>
          <p>Before traveling, check <a href="/fishing/reports" className="border-b border-primary text-primary">fresh fishing reports</a>, <a href="/fishing/regulations" className="border-b border-primary text-primary">current regulations</a>, weather, lake levels, access and closures.</p>
          <p className="text-xs">Last reviewed: {formatDate(data.verifiedAt)}</p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="season-faq">
        <p className="eyebrow text-primary">Quick answers</p>
        <h2 id="season-faq" className="mt-2 font-display text-4xl">Texas fishing seasons FAQ</h2>
        <div className="mt-7 grid gap-6 lg:grid-cols-2">{faq.map((item) => <article key={item.question} className="border-t border-border pt-5"><h3 className="font-display text-xl">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div>
      </section>
    </Container>
  </>;
}

const faq = [
  { question: "What should I fish for in Texas this month?", answer: "Choose the month at the top of this page. TexasDefined maps that month to the matching seasonal layer, then shows only source-backed lake-and-species relationships. Check the fresh-report section for current conditions." },
  { question: "How do I find winter fishing opportunities in Texas?", answer: "Choose Winter or December, January or February. The page will show verified winter patterns plus year-round opportunities without claiming every lake fishes the same way." },
  { question: "What does year-round mean?", answer: "It means the verified fishery opportunity is not limited to one named season. It does not mean catch rates, water conditions or access are equally good every day." },
  { question: "Where do I check what is happening right now?", answer: "Use the fresh-report section on this page or open the full fishing reports directory. Expired reports are not presented here as current conditions." },
];

function matchesSeason(patterns: Array<{ season: string }>, season: FishingSeasonFilter) { return patterns.some((pattern) => pattern.season === season || pattern.season === "year-round"); }
function titleCase(value: string) { return value.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()); }
function displayRegion(value: string) { const label = titleCase(value); return label === "Prairies Lakes" ? "Prairies & Lakes" : label; }
function slugify(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function chip(active: boolean) { return `border px-3 py-2 text-xs font-semibold ${active ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"}`; }
function buildHref(filters: { month?: string; season?: string; species?: string; region?: string }) { const params = new URLSearchParams(); if (filters.month) params.set("month", filters.month); if (filters.season) params.set("season", filters.season); if (filters.species) params.set("species", filters.species); if (filters.region) params.set("region", filters.region); const query = params.toString(); return query ? `${FISHING_SEASONS_PATH}?${query}` : FISHING_SEASONS_PATH; }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date); }
