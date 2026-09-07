import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { searchDocumentsQuery } from "@/data/queries";
import { search, type SearchHit } from "@/domain/search/engine";
import {
  SEARCH_INPUT_PLACEHOLDER,
  SEARCH_KIND_LABELS,
  SEARCH_SCOPE_DESCRIPTION,
  SPORTS_SEARCH_STARTING_POINT,
  TEXAS_EXPLAINED_SEARCH_COPY,
} from "./search";

const startingPoints = [
  { to: "/explore", label: "Explore Texas", copy: "Parks, water, road trips, small towns and places worth making the drive for." },
  { to: "/hunting", label: "Texas Hunting", copy: "Public hunting, licenses, hunter education, seasons, species and current TPWD verification." },
  { to: "/explore/painted-churches", label: "Painted Churches", copy: "Historic sanctuaries, painted interiors, church-by-church guides and the Schulenburg heritage route." },
  SPORTS_SEARCH_STARTING_POINT,
  { to: "/events", label: "Texas Events", copy: "Rodeos, festivals, fairs, live music and things happening around the state." },
  { to: "/guides", label: "The Guidebook", copy: "Travel guides and practical help for living, moving and owning a home here." },
  { to: "/decide/financial-tools", label: "Money & Property", copy: "Calculators and plain-English guides for housing costs and household decisions." },
  { to: "/browse/cities", label: "Find a City", copy: "Browse Texas cities by name, county and region." },
  { to: "/browse/counties", label: "Find Your County", copy: "Start with one of all 254 counties and continue to useful local information." },
] as const;

const recoveryLinks = [
  ["/explore", "Explore Texas"], ["/hunting", "Texas Hunting"], ["/events", "Texas Events"], ["/browse/cities", "Cities"],
  ["/browse/counties", "Counties"], ["/explore/trip-planner", "Trip Planner"], ["/texas-explained", "Texas Explained"],
] as const;

export const Route = createLazyFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const { data: documents } = useSuspenseQuery(searchDocumentsQuery());
  const query = (q ?? "").trim();
  const results: SearchHit[] = query ? search(documents, { term: query, brandId: texasDefinedBrand.identity.id }) : [];

  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <p className="eyebrow text-primary">Search the magazine</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] sm:text-7xl">Find a place, story or useful answer.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{SEARCH_SCOPE_DESCRIPTION}</p>
        <form className="mt-9 flex max-w-2xl border-b-2 border-foreground transition-colors focus-within:border-primary" onSubmit={(event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get("q"); void navigate({ search: { q: String(value ?? "") } }); }}>
          <label htmlFor="q" className="sr-only">Search Texas Defined</label>
          <input key={query} id="q" name="q" defaultValue={query} placeholder={SEARCH_INPUT_PLACEHOLDER} className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" />
          <button type="submit" className="eyebrow shrink-0 px-2 py-4 text-primary">Search →</button>
        </form>
      </Container>
    </section>

    <Container className="min-h-[42vh] py-12 sm:py-16">
      <section className="border-y border-border bg-surface px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow text-primary">Texas Defined AI</p>
        <h2 className="mt-2 font-display text-4xl sm:text-5xl">Ask Texas anything.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Powered by Texas Defined’s guides, data, places and verified sources.</p>
        <a href="/ask-texas" className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Ask Texas Defined AI →</a>
      </section>

      {!query && <section aria-labelledby="search-start-heading" className="mt-14 sm:mt-16">
        <div className="border-b border-border pb-5"><p className="eyebrow text-primary">Start here</p><h2 id="search-start-heading" className="mt-2 font-display text-3xl sm:text-4xl">A few useful ways into Texas Defined</h2></div>
        <Link to="/texas-explained" className="group mt-7 grid gap-4 border-l-2 border-primary bg-surface px-6 py-7 transition-colors hover:bg-muted/40 sm:grid-cols-[1fr_auto] sm:items-end sm:px-8">
          <div className="max-w-3xl"><p className="eyebrow text-primary">Texas Explained</p><h3 className="mt-2 font-display text-3xl leading-tight transition-colors group-hover:text-primary">Want the why behind Texas?</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{TEXAS_EXPLAINED_SEARCH_COPY}</p></div>
          <span className="eyebrow inline-block border-b border-primary pb-1 text-primary">Read all 10 guides →</span>
        </Link>
        <ul className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3">{startingPoints.map((item, index) => <li key={item.to} className={`border-b border-border py-7 sm:px-6 ${index % 3 !== 0 ? "lg:border-l" : ""}`}><Link to={item.to} className="group block h-full"><h3 className="font-display text-2xl leading-tight transition-colors group-hover:text-primary">{item.label}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.copy}</p><span className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary">Open →</span></Link></li>)}</ul>
      </section>}
      {query && results.length > 0 && <div className="mt-14 flex items-end justify-between gap-4 border-b border-border pb-4 sm:mt-16"><div><p className="eyebrow text-primary">Search results</p><h2 className="mt-2 font-display text-3xl">For “{query}”</h2></div><p className="text-sm text-muted-foreground" role="status">{results.length} result{results.length === 1 ? "" : "s"}</p></div>}
      {query && results.length === 0 && <section aria-labelledby="search-zero-heading" className="mt-14 max-w-2xl border-t border-border pt-6 sm:mt-16"><p className="eyebrow text-primary">No search results</p><h2 id="search-zero-heading" className="mt-3 font-display text-3xl">Nothing matched “{query}.”</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Try a broader term or continue through one of these discovery paths.</p><nav aria-label="Search recovery" className="mt-6 flex flex-wrap gap-x-6 gap-y-3">{recoveryLinks.map(([to, label]) => <Link key={to} to={to} className="eyebrow border-b border-primary pb-1 text-primary">{label} →</Link>)}</nav></section>}
      <ul className="mt-2 max-w-3xl divide-y divide-border">
        {results.map((result) => <li key={`${result.document.kind}-${result.document.id}`} className="py-7"><p className="eyebrow text-primary">{kindLabel(result.document.kind, result.document.id)}</p><Link to={result.document.href} className="mt-2 block font-display text-2xl leading-tight transition-colors hover:text-primary">{result.document.title}</Link><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{result.document.summary}</p></li>)}
      </ul>
    </Container>
  </>;
}

function kindLabel(kind: string, id?: string) {
  if (id?.startsWith("painted-church:") || id?.startsWith("painted-church-guide:")) return "Painted church";
  return SEARCH_KIND_LABELS[kind.toLowerCase()] ?? kind.replaceAll("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}
