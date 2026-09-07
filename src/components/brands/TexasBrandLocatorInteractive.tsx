import { type FormEvent, useState } from "react";

import {
  findTexasBrandLocations,
  type TexasBrandLocatorBrand,
  type TexasBrandLocatorLocation,
  type TexasBrandLocatorResponse,
} from "@/data/texas-brand-locator";

type BrandChoice = TexasBrandLocatorBrand | "both";

const BRAND_LABELS: Record<BrandChoice, string> = {
  both: "H-E-B + Buc-ee's",
  heb: "H-E-B",
  bucees: "Buc-ee's",
};

export default function TexasBrandLocatorInteractive() {
  const [brand, setBrand] = useState<BrandChoice>("both");
  const [status, setStatus] = useState<"idle" | "searching" | "done" | "error">("idle");
  const [response, setResponse] = useState<TexasBrandLocatorResponse | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const address = String(form.get("address") ?? "").trim();
    setStatus("searching");
    setResponse(null);
    try {
      const result = await findTexasBrandLocations({
        address,
        brands: brand === "both" ? ["heb", "bucees"] : [brand],
      });
      setResponse(result);
      setStatus("done");
    } catch (error) {
      console.error("Texas brand locator search failed", error);
      setStatus("error");
    }
  }

  const hebResults = response?.results.filter((result) => result.brand === "heb") ?? [];
  const buceesResults = response?.results.filter((result) => result.brand === "bucees") ?? [];

  return (
    <section aria-labelledby="texas-brand-locator-heading" className="mb-12 border-y border-border bg-muted/20 py-8 sm:px-8">
      <div className="px-6 sm:px-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Texas brand locator</p>
        <h2 id="texas-brand-locator-heading" className="mt-2 font-display text-4xl">Find your H-E-B or Buc-ee's</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Enter a Texas street address and choose what you want to find. TexasDefined uses the U.S. Census geocoder for the search location, H-E-B's live store locator for H-E-B results, and an editorially verified snapshot of Buc-ee's official Texas location list for Buc-ee's results.
        </p>

        <form onSubmit={submit} className="mt-6 grid gap-4 lg:grid-cols-[220px_1fr_auto] lg:items-end">
          <label className="grid gap-2 text-sm font-semibold" htmlFor="texas-brand-choice">
            Find
            <select
              id="texas-brand-choice"
              value={brand}
              onChange={(event) => setBrand(event.target.value as BrandChoice)}
              className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground"
            >
              {Object.entries(BRAND_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-semibold" htmlFor="texas-brand-address">
            Texas street address
            <input
              id="texas-brand-address"
              name="address"
              type="text"
              required
              minLength={8}
              maxLength={240}
              autoComplete="street-address"
              placeholder="Example: 123 Main St, Katy, TX 77494"
              className="min-h-11 border border-border bg-background px-3 py-2 font-normal text-foreground"
            />
          </label>
          <button
            type="submit"
            disabled={status === "searching"}
            className="min-h-11 border border-primary bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {status === "searching" ? "Finding locations…" : "Find nearby locations"}
          </button>
        </form>

        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Your address is used to perform this search and is not stored or displayed publicly. Distances are approximate; use the official brand link or directions link before traveling.
        </p>

        {status === "error" && (
          <div className="mt-6 border-l-2 border-destructive pl-4" role="alert">
            <p className="text-sm font-semibold">The locator could not complete this search.</p>
            <p className="mt-1 text-sm text-muted-foreground">Try again, or use the official H-E-B and Buc-ee's location links in the Texas brand guides below.</p>
          </div>
        )}

        {response && (
          <div className="mt-8" aria-live="polite">
            {response.matchedAddress && (
              <p className="mb-5 text-sm text-muted-foreground">Searching from <span className="font-semibold text-foreground">{response.matchedAddress}</span></p>
            )}

            {response.notices.length > 0 && (
              <div className="mb-6 space-y-2 border-y border-border py-4 text-sm leading-6 text-muted-foreground">
                {response.notices.map((notice) => <p key={notice}>{notice}</p>)}
              </div>
            )}

            {hebResults.length > 0 && <ResultGroup heading="Nearest H-E-B locations" results={hebResults} />}
            {buceesResults.length > 0 && <ResultGroup heading="Nearest Buc-ee's locations" results={buceesResults} />}

            {response.fallbackLinks.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                {response.fallbackLinks.map((link) => (
                  <a key={link.brand} href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                    {link.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ResultGroup({ heading, results }: { heading: string; results: TexasBrandLocatorLocation[] }) {
  return (
    <section className="mt-8 first:mt-0">
      <h3 className="font-display text-3xl">{heading}</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {results.map((location) => (
          <article key={location.id} className="border border-border bg-background p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{location.brandLabel}</p>
                <h4 className="mt-1 font-display text-2xl leading-tight">{location.name}</h4>
              </div>
              {typeof location.distanceMiles === "number" && (
                <span className="text-sm font-semibold tabular-nums">{location.distanceMiles.toFixed(1)} mi</span>
              )}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{location.address}</p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              <a href={location.directionsUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">Directions →</a>
              <a href={location.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">Verify with {location.brandLabel} →</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
