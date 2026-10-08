import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_COUNTIES } from "@/data/texas-places";

type CountyLink = { name: string; slug: string; url: string };
type PlaceLookupSuccess = {
  ok: true;
  queryType: "city" | "zip";
  query: string;
  counties: CountyLink[];
  source: string;
  note: string;
};
type LookupFailure = { ok: false; error: string };
type AddressLookupSuccess = {
  ok: true;
  countyName: string;
  matchedAddress: string;
  countyUrl: string;
};
type AddressLookupResponse = AddressLookupSuccess | LookupFailure;
type PlaceLookupResponse = PlaceLookupSuccess | LookupFailure;

const guideFeatures = [
  ["County basics", "County seat, population, land area, geography and communities connected to the county."],
  ["Places & context", "Cities, towns, landmarks and the local identity that helps explain how the county fits into Texas."],
  ["History", "County formation, settlement, economic history and locally important people or events where sourced coverage is available."],
  ["Local government", "Orientation and links for county government, records, elections and other official local resources."],
  ["Property & taxes", "Connections to appraisal-district, tax-office and property-tax guidance where local sources have been verified."],
  ["Related guides", "Useful TexasDefined coverage for nearby places, practical tools and official state or federal sources."],
] as const;

export const Route = createLazyFileRoute("/county")({ component: CountyIndexPage });

async function lookupPlace(type: "city" | "zip", value: string): Promise<PlaceLookupSuccess> {
  const response = await fetch("/api/find-my-county", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(type === "city" ? { city: value } : { zip: value }),
  });
  const payload = (await response.json()) as PlaceLookupResponse;
  if (!response.ok || !payload.ok) {
    throw new Error(payload.ok ? "The county lookup could not be completed." : payload.error);
  }
  return payload;
}

function CountyIndexPage() {
  const counties = useMemo(() => [...TEXAS_COUNTIES].sort((a, b) => a.name.localeCompare(b.name)), []);
  const [countyQuery, setCountyQuery] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [cityResult, setCityResult] = useState<PlaceLookupSuccess | null>(null);
  const [zipResult, setZipResult] = useState<PlaceLookupSuccess | null>(null);
  const [cityError, setCityError] = useState("");
  const [zipError, setZipError] = useState("");
  const [cityLoading, setCityLoading] = useState(false);
  const [zipLoading, setZipLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [addressResult, setAddressResult] = useState<AddressLookupSuccess | null>(null);
  const [addressError, setAddressError] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  const countyMatches = useMemo(() => {
    const query = countyQuery.trim().toLowerCase().replace(/\s+county$/, "");
    if (!query) return [];
    return counties.filter((county) => county.name.replace(/ County$/, "").toLowerCase().includes(query)).slice(0, 12);
  }, [counties, countyQuery]);

  const groupedCounties = useMemo(() => {
    const groups = new Map<string, typeof counties>();
    for (const county of counties) {
      const letter = county.name[0];
      const group = groups.get(letter) ?? [];
      group.push(county);
      groups.set(letter, group);
    }
    return [...groups.entries()];
  }, [counties]);

  async function submitPlace(event: FormEvent<HTMLFormElement>, type: "city" | "zip") {
    event.preventDefault();
    const value = type === "city" ? city.trim() : zip.trim();
    const setLoading = type === "city" ? setCityLoading : setZipLoading;
    const setError = type === "city" ? setCityError : setZipError;
    const setResult = type === "city" ? setCityResult : setZipResult;
    if (!value || (type === "zip" && !/^\d{5}$/.test(value))) {
      setResult(null);
      setError(type === "city" ? "Enter a Texas city name." : "Enter a 5-digit ZIP code.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      setResult(await lookupPlace(type, value));
    } catch (error) {
      setError(error instanceof Error ? error.message : "The county lookup could not be completed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submitAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = address.trim();
    if (!value) {
      setAddressResult(null);
      setAddressError("Enter a complete Texas street address.");
      return;
    }
    setAddressLoading(true);
    setAddressError("");
    setAddressResult(null);
    try {
      const response = await fetch("/api/find-my-county", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ address: value }),
      });
      const payload = (await response.json()) as AddressLookupResponse;
      if (!response.ok || !payload.ok) {
        setAddressError(payload.ok ? "The county lookup failed." : payload.error);
        return;
      }
      setAddressResult(payload);
    } catch {
      setAddressError("The Census address lookup could not be completed. Try again.");
    } finally {
      setAddressLoading(false);
    }
  }

  return (
    <Container width="wide" className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-[86rem]">
        <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-primary">Explore Texas · 254 county guides</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-6xl xl:text-7xl">Discover all 254 Texas counties</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">From the Panhandle to the Gulf Coast, find your county and discover its communities, history, places to visit, local government, and useful property resources.</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#finder-heading" className="inline-flex min-h-12 items-center justify-center bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors">Find your county <span className="ml-2" aria-hidden="true">→</span></a>
              <a href="#county-directory" className="inline-flex min-h-12 items-center justify-center border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary">Browse counties A–Z <span className="ml-2" aria-hidden="true">↓</span></a>
            </div>
          </div>
          <figure className="overflow-hidden border border-border bg-card p-3 sm:p-5">
            <img src="/images/texas-county-map-red.svg" alt="Map of Texas showing the boundaries of all 254 counties in varying shades of red" width={1000} height={780} loading="eager" decoding="async" className="mx-auto block h-auto w-full max-w-xl" />
            <figcaption className="mx-auto max-w-xl px-2 pb-2 text-center text-xs leading-5 text-muted-foreground">All 254 Texas counties · Red shades are illustrative, not political or demographic data.</figcaption>
          </figure>
        </header>
        <aside className="border-b border-border py-5 text-sm leading-7 text-muted-foreground" aria-label="How county boundaries work">
          <strong className="mr-2 text-foreground">Not sure which county you need?</strong>
          City limits and ZIP areas can cross county lines. Search by county name, city or ZIP code below; for an exact property, use the complete street address finder.
        </aside>

        <section className="border-b border-border py-10" aria-labelledby="finder-heading">
          <p className="eyebrow text-primary">County finder</p>
          <h2 id="finder-heading" className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">Find the county from what you already know</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">Search all 254 county guides by name, check which counties a Texas city or ZIP area crosses, or use a complete street address to identify the county for a specific property.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FinderCard eyebrow="By county" title="Search by county name" description="Know the county already? Search all 254 guides and jump straight to it.">
              <label htmlFor="county-search" className="sr-only">County name</label><input id="county-search" value={countyQuery} onChange={(event) => setCountyQuery(event.target.value)} placeholder="Try Harris, Travis or Brewster" className="min-h-12 w-full border border-border bg-background px-4" />
              {countyQuery.trim() ? <div className="mt-4 border-t border-border">{countyMatches.length ? countyMatches.map((county) => <Link key={county.slug} to="/$kind/$slug" params={{ kind: "county", slug: county.slug }} className="flex min-h-12 items-center justify-between border-b border-border py-3 text-sm font-semibold hover:text-primary"><span>{county.name}</span><span aria-hidden="true">→</span></Link>) : <p className="py-4 text-sm text-muted-foreground">No Texas county matches that name.</p>}</div> : null}
            </FinderCard>
            <FinderCard eyebrow="By city" title="Search counties by city" description="Enter a Texas city or Census-designated place. A city can return more than one county when its boundary crosses county lines.">
              <form onSubmit={(event) => submitPlace(event, "city")}><label htmlFor="city-search" className="sr-only">Texas city</label><div className="flex flex-col gap-3 sm:flex-row"><input id="city-search" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Try Austin, Katy or Amarillo" className="min-h-12 min-w-0 flex-1 border border-border bg-background px-4" /><button type="submit" disabled={cityLoading} className="min-h-12 bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{cityLoading ? "Checking…" : "Find"}</button></div></form><LookupResult result={cityResult} error={cityError} />
            </FinderCard>
            <FinderCard eyebrow="By ZIP" title="Search counties by ZIP code" description="Enter a 5-digit ZIP. Census ZIP areas can overlap more than one county, so the finder returns every intersecting county guide.">
              <form onSubmit={(event) => submitPlace(event, "zip")}><label htmlFor="zip-search" className="sr-only">ZIP code</label><div className="flex flex-col gap-3 sm:flex-row"><input id="zip-search" inputMode="numeric" maxLength={5} value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="77494" className="min-h-12 min-w-0 flex-1 border border-border bg-background px-4" /><button type="submit" disabled={zipLoading} className="min-h-12 bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{zipLoading ? "Checking…" : "Find"}</button></div></form><LookupResult result={zipResult} error={zipError} />
            </FinderCard>
            <FinderCard eyebrow="By address" title="Find a county by exact address" description="For a specific property, use a complete Texas street address with the U.S. Census Bureau geocoder.">
              <form id="address-county-lookup" onSubmit={submitAddress}><label htmlFor="county-address" className="sr-only">Texas street address</label><div className="flex flex-col gap-3 sm:flex-row"><input id="county-address" type="text" autoComplete="street-address" maxLength={100} value={address} onChange={(event) => setAddress(event.target.value)} placeholder="1100 Congress Ave, Austin, TX 78701" className="min-h-12 min-w-0 flex-1 border border-border bg-background px-4" /><button type="submit" disabled={addressLoading} className="min-h-12 bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{addressLoading ? "Checking…" : "Find county"}</button></div></form>
              <div aria-live="polite" className="mt-4">{addressError ? <p className="border-t border-border pt-4 text-sm leading-6"><strong>County not found.</strong> {addressError}</p> : null}{addressResult ? <div className="border-t border-border pt-4"><p className="text-xs uppercase tracking-[0.14em] text-primary">Address match</p><p className="mt-1 font-display text-2xl">{addressResult.countyName}</p><p className="mt-2 text-sm text-muted-foreground">Matched: {addressResult.matchedAddress}</p><a href={addressResult.countyUrl} className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline underline-offset-4">Open the county guide →</a></div> : null}</div>
            </FinderCard>
          </div>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="inside-guide-heading">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">What is in a guide?</p><h2 id="inside-guide-heading" className="mt-2 font-display text-3xl">One starting point for the whole county</h2></div>
            <div><p className="max-w-4xl text-base leading-8 text-muted-foreground">County pages are practical reference guides, not just directory entries. Source depth varies by county, so TexasDefined shows verified local information when available and keeps official sources close to the facts they support.</p><div className="mt-7 grid sm:grid-cols-2 xl:grid-cols-3">{guideFeatures.map(([title, body]) => <div key={title} className="border-t border-border py-5 sm:px-5"><h3 className="font-display text-xl">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></div>)}</div></div>
          </div>
        </section>

        <section id="county-directory" className="scroll-mt-24 border-b border-border py-10">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Browse</p><h2 className="mt-2 font-display text-3xl">All 254 Texas county guides</h2></div><div><p className="max-w-3xl text-sm leading-7 text-muted-foreground">Prefer to browse? Every Texas county is linked below in alphabetical order.</p><nav aria-label="Jump to county letter" className="mt-5 flex flex-wrap gap-2">{groupedCounties.map(([letter]) => <a key={letter} href={`#county-${letter}`} className="inline-flex h-11 w-11 items-center justify-center border border-border text-sm font-semibold hover:border-primary hover:text-primary">{letter}</a>)}</nav></div></div>
          <div className="mt-8 space-y-8">{groupedCounties.map(([letter, letterCounties]) => <div key={letter} id={`county-${letter}`} className="grid scroll-mt-24 gap-4 border-t border-border pt-5 lg:grid-cols-[5rem_1fr]"><h3 className="font-display text-4xl text-primary">{letter}</h3><div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">{letterCounties.map((county) => <Link key={county.slug} to="/$kind/$slug" params={{ kind: "county", slug: county.slug }} className="group flex min-h-12 items-center border-b border-border py-3 pr-4 text-sm font-semibold hover:text-primary">{county.name}<span className="ml-2" aria-hidden="true">→</span></Link>)}</div></div>)}</div>
        </section>

        <section className="py-10"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Go deeper</p><h2 className="mt-2 font-display text-3xl">County tools and comparisons</h2></div><div className="grid sm:grid-cols-2"><ResourceLink to="/browse/counties" title="Compare Texas counties" body="County seat, population, land area and verified property-resource pathways." /><ResourceLink to="/find-my-county" title="Full address county finder" body="Open the standalone Census-backed address tool and methodology." /><ResourceLink to="/property-tax/counties" title="County property-tax guides" body="Find county-level property and tax research where local sources are verified." /><ResourceLink to="/texas-data/city-county-relationships" title="How cities and counties overlap" body="Understand why city limits, mailing addresses, ZIP areas and county boundaries are not interchangeable." /></div></div></section>
      </article>
    </Container>
  );
}

function FinderCard({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <section className="border border-border bg-card p-5 sm:p-6"><p className="eyebrow text-primary">{eyebrow}</p><h3 className="mt-2 font-display text-2xl">{title}</h3><p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">{description}</p><div className="mt-5">{children}</div></section>;
}

function LookupResult({ result, error }: { result: PlaceLookupSuccess | null; error: string }) {
  return <div aria-live="polite" className="mt-4">{error ? <p className="border-t border-border pt-4 text-sm leading-6"><strong>County not found.</strong> {error}</p> : null}{result ? <div className="border-t border-border pt-4"><p className="text-xs uppercase tracking-[0.14em] text-primary">Boundary match</p><div className="mt-2 space-y-2">{result.counties.map((county) => <a key={county.slug} href={county.url} className="flex min-h-11 items-center justify-between border-b border-border py-2 text-sm font-semibold hover:text-primary"><span>{county.name}</span><span aria-hidden="true">→</span></a>)}</div><p className="mt-3 text-xs leading-5 text-muted-foreground">{result.note}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Source: {result.source}</p></div> : null}</div>;
}

function ResourceLink({ to, title, body }: { to: string; title: string; body: string }) {
  return <Link to={to} className="group border-t border-border py-5 sm:px-5"><span className="font-display text-xl group-hover:text-primary">{title}</span><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></Link>;
}
