import { useMemo, useState } from "react";
import { ExternalLink, Search } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { findTexasPlaces } from "@/data/texas-places";

export function TexasPlaceDirectory({ mode }: { mode: "counties" | "cities" }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => findTexasPlaces(query), [query]);
  const items = mode === "counties" ? results.counties : results.cities;
  const title = mode === "counties" ? "Find your Texas county" : "Find a Texas city";
  const intro =
    mode === "counties"
      ? "Start with a county name, then head straight to the official local offices and information you need."
      : "Look up a city to find stories, moving information, nearby places and useful local details.";
  const searchLabel = mode === "counties" ? "county" : "city";

  return (
    <Container className="py-16 sm:py-24">
      <p className="eyebrow text-primary">Around the state</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>

      <label className="mt-8 flex max-w-xl items-center gap-3 rounded-md border border-border px-4 py-3">
        <Search className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Find a Texas {searchLabel}</span>
        <input
          className="w-full bg-transparent outline-none"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Enter a ${searchLabel} name`}
        />
      </label>

      <p className="mt-4 text-sm text-muted-foreground">
        {query
          ? `${items.length} match${items.length === 1 ? "" : "es"}`
          : mode === "counties"
            ? "All 254 counties"
            : `${items.length} cities to explore`}
      </p>

      {items.length > 0 ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mode === "counties"
            ? results.counties.map((county) => (
                <li key={county.code} className="rounded-md border border-border p-5">
                  <p className="eyebrow text-primary">County guide</p>
                  <h2 className="mt-2 font-display text-2xl">{county.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Find county offices, appraisal information, elections and local services.
                  </p>
                  <a
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline"
                    href={county.officialDirectoryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit the official county site <ExternalLink className="h-4 w-4" />
                  </a>
                </li>
              ))
            : results.cities.map((city) => (
                <li key={city.slug} className="rounded-md border border-border p-5">
                  <p className="eyebrow text-primary">{city.region}</p>
                  <h2 className="mt-2 font-display text-2xl">{city.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {city.county} County · Stories, costs, moving information and places nearby.
                  </p>
                  <a
                    className="mt-5 inline-block text-sm font-medium underline"
                    href={`/search?q=${encodeURIComponent(city.name)}`}
                  >
                    See what we have on {city.name}
                  </a>
                </li>
              ))}
        </ul>
      ) : (
        <p className="mt-10 border-t border-border py-8 text-sm text-muted-foreground">
          We couldn't find that {searchLabel}. Check the spelling or try a nearby place.
        </p>
      )}
    </Container>
  );
}
