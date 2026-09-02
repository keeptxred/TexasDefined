import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Container } from "@/components/layout/Container";
import { findTexasPlaces, TEXAS_COUNTIES } from "@/data/texas-places";

export const countyAnchor = (slug: string) => `county-${slug}`;
export const cityAnchor = (slug: string) => `city-${slug}`;

const CITY_AUTHORITY_SLUGS = new Set([
  "houston",
  "dallas",
  "fort-worth",
  "austin",
  "san-antonio",
  "el-paso",
  "arlington",
  "corpus-christi",
  "plano",
  "lubbock",
]);

const countySlugForCity = (countyName: string) => {
  const county = TEXAS_COUNTIES.find((candidate) => candidate.name === `${countyName} County`);
  if (!county) throw new Error(`Texas city directory references unknown county: ${countyName}`);
  return county.slug;
};

export function TexasPlaceDirectory({ mode }: { mode: "counties" | "cities" }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => findTexasPlaces(query), [query]);
  const items = mode === "counties" ? results.counties : results.cities;
  const title = mode === "counties" ? "The Texas county directory" : "The Texas city directory";
  const intro = mode === "counties"
    ? "Find a county, then continue to verified local property-tax guides, official offices and public records."
    : "Find a Texas city by county and region, then open a verified city authority guide where available or continue to its county guide, relocation research center, salary comparisons and cost-of-living tools.";
  const searchLabel = mode === "counties" ? "county" : "city";
  const current = mode === "counties" ? "Counties" : "Cities";

  return (
    <>
      <DepartmentHero current={current} eyebrow="Around the state" title={title} description={intro} tone="surface" />

      <Container className="py-10 sm:py-12">
        <label className="flex max-w-2xl border-b-2 border-foreground transition-colors focus-within:border-primary">
          <span className="sr-only">Search for a Texas {searchLabel}</span>
          <input className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search by ${searchLabel} name`} />
          <span className="eyebrow px-2 py-4 text-primary">Search</span>
        </label>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">Directory</p><h2 className="mt-2 font-display text-3xl">{query ? `Matches for “${query}”` : mode === "counties" ? "All 254 Texas counties" : "Texas cities in the guide"}</h2></div>
          <p className="text-sm text-muted-foreground" role="status">{items.length.toLocaleString("en-US")} {items.length === 1 ? "result" : "results"}</p>
        </div>

        {items.length > 0 ? (
          <ul className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-3">
            {mode === "counties"
              ? results.counties.map((county, index) => (
                  <li id={countyAnchor(county.slug)} key={county.code} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? "lg:pl-0" : ""} ${index % 3 !== 2 ? "lg:border-r" : ""}`}>
                    <p className="eyebrow text-primary">County reference</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight">{county.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">County context and official references for {county.name}.</p>
                    <div className="mt-5 flex flex-col items-start gap-3 text-sm">
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/$kind/$slug" params={{ kind: "county", slug: county.slug }}>Open county reference →</Link>
                      <a className="inline-flex items-center gap-2 text-xs text-muted-foreground underline underline-offset-4" href={county.officialDirectoryUrl} target="_blank" rel="noreferrer noopener">Official county directory <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                    </div>
                  </li>
                ))
              : results.cities.map((city, index) => (
                  <li id={cityAnchor(city.slug)} key={city.slug} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? "lg:pl-0" : ""} ${index % 3 !== 2 ? "lg:border-r" : ""}`}>
                    <p className="eyebrow text-primary">{city.region}</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight">{city.name}, Texas</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{CITY_AUTHORITY_SLUGS.has(city.slug) ? `${city.name} has a verified TexasDefined city authority guide with official municipal sourcing plus county, regional, relocation and nearby-place context.` : `${city.name} is in ${city.county} County. City detail pages are published only after local source verification; use the county authority guide, relocation research framework and statewide planning tools in the meantime.`}</p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                      {CITY_AUTHORITY_SLUGS.has(city.slug) ? <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/$kind/$slug" params={{ kind: "city", slug: city.slug }}>Open city reference →</Link> : null}
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/moving-to-texas">Relocation research →</Link>
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/$kind/$slug" params={{ kind: "county", slug: countySlugForCity(city.county) }}>Explore {city.county} County →</Link>
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/texas-salary-comparison-by-city">Compare salary →</Link>
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/texas-cost-of-living-calculator">Compare costs →</Link>
                    </div>
                  </li>
                ))}
          </ul>
        ) : (
          <div className="border-b border-border py-12"><p className="font-display text-3xl">No {searchLabel} matched that search.</p><p className="mt-3 text-sm text-muted-foreground">Check the spelling or try a nearby place.</p></div>
        )}

        <nav aria-label={`${current} planning pathways`} className="mt-14 border-y border-border py-6">
          <p className="eyebrow text-primary">Keep planning</p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            <Link to="/moving-to-texas" className="eyebrow border-b border-primary pb-1 text-primary">Moving to Texas →</Link>
            <Link to="/texas-data" className="eyebrow border-b border-primary pb-1 text-primary">Texas Data Desk →</Link>
            <Link to="/property" className="eyebrow border-b border-primary pb-1 text-primary">Property & taxes →</Link>
            <Link to="/decide/financial-tools" className="eyebrow border-b border-primary pb-1 text-primary">Money & property tools →</Link>
            <Link to="/texas-utility-cost-calculator" className="eyebrow border-b border-primary pb-1 text-primary">Utility costs →</Link>
            <Link to="/texas-homeownership-cost-calculator" className="eyebrow border-b border-primary pb-1 text-primary">Homeownership costs →</Link>
          </div>
        </nav>
      </Container>
    </>
  );
}
