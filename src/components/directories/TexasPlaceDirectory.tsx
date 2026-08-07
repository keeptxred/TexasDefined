import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { findTexasPlaces } from "@/data/texas-places";

export const countyAnchor = (slug: string) => `county-${slug}`;
export const cityAnchor = (slug: string) => `city-${slug}`;

export function TexasPlaceDirectory({ mode }: { mode: "counties" | "cities" }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => findTexasPlaces(query), [query]);
  const items = mode === "counties" ? results.counties : results.cities;
  const title = mode === "counties" ? "The Texas county directory" : "The Texas city directory";
  const intro = mode === "counties"
    ? "Find a county, then continue to local property-tax guides, official offices and public records."
    : "Find a city, then continue to local stories, moving guidance and nearby places worth knowing.";
  const searchLabel = mode === "counties" ? "county" : "city";

  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow text-primary">Around the state</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{intro}</p>
          <label className="mt-9 flex max-w-2xl border-b-2 border-foreground">
            <span className="sr-only">Search for a Texas {searchLabel}</span>
            <input className="w-full bg-transparent px-0 py-4 text-base outline-none placeholder:text-muted-foreground/70" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search by ${searchLabel} name`} />
            <span className="eyebrow px-2 py-4 text-primary">Search</span>
          </label>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
          <div><p className="eyebrow text-primary">Directory</p><h2 className="mt-2 font-display text-3xl">{query ? `Matches for “${query}”` : mode === "counties" ? "All 254 Texas counties" : "Texas cities in the guide"}</h2></div>
          <p className="text-sm text-muted-foreground" role="status">{items.length.toLocaleString("en-US")} {items.length === 1 ? "result" : "results"}</p>
        </div>

        {items.length > 0 ? (
          <ul className="grid border-b border-border sm:grid-cols-2 lg:grid-cols-3">
            {mode === "counties"
              ? results.counties.map((county, index) => (
                  <li id={countyAnchor(county.slug)} key={county.code} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? "lg:pl-0" : ""} ${index % 3 !== 2 ? "lg:border-r" : ""}`}>
                    <p className="eyebrow text-primary">County guide</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight">{county.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">Property taxes, appraisal records, exemptions, protests, local offices and payment research for {county.name}.</p>
                    <div className="mt-5 flex flex-col items-start gap-3 text-sm">
                      <Link className="eyebrow border-b border-primary pb-1 text-primary" to="/property-tax/county/$county" params={{ county: county.slug }}>Open county guide →</Link>
                      <a className="inline-flex items-center gap-2 text-xs text-muted-foreground underline underline-offset-4" href={county.officialDirectoryUrl} target="_blank" rel="noreferrer noopener">Official county directory <ExternalLink className="h-3.5 w-3.5" aria-hidden /></a>
                    </div>
                  </li>
                ))
              : results.cities.map((city, index) => (
                  <li id={cityAnchor(city.slug)} key={city.slug} className={`border-b border-border py-7 sm:px-6 ${index % 3 === 0 ? "lg:pl-0" : ""} ${index % 3 !== 2 ? "lg:border-r" : ""}`}>
                    <p className="eyebrow text-primary">{city.region}</p>
                    <h3 className="mt-3 font-display text-3xl leading-tight">{city.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{city.county} County · Local stories, living costs, moving guidance and places worth knowing.</p>
                    <Link className="eyebrow mt-5 inline-block border-b border-primary pb-1 text-primary" to="/search" search={{ q: city.name }}>Explore {city.name} →</Link>
                  </li>
                ))}
          </ul>
        ) : (
          <div className="border-b border-border py-12"><p className="font-display text-3xl">No {searchLabel} matched that search.</p><p className="mt-3 text-sm text-muted-foreground">Check the spelling or try a nearby place.</p></div>
        )}
      </Container>
    </>
  );
}
