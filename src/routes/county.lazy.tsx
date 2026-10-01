import { type FormEvent, useMemo, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_CITIES, TEXAS_COUNTIES } from "@/data/texas-places";

type CountyLookupSuccess = {
  ok: true;
  countyName: string;
  countySlug: string;
  matchedAddress: string;
  countyUrl: string;
};

type CountyLookupFailure = { ok: false; error: string };
type CountyLookupResponse = CountyLookupSuccess | CountyLookupFailure;

const guideFeatures = [
  ["County basics", "County seat, population, land area, geography and the communities connected to the county."],
  ["Places & context", "Cities, towns, landmarks and the local identity that helps explain how the county fits into Texas."],
  ["History", "County formation, settlement, economic history and the people or events that shaped the area when sourced coverage is available."],
  ["Local government", "Links and orientation for county government, records, elections and other official local resources."],
  ["Property & taxes", "Connections to appraisal-district, tax-office and property-tax guidance where those local sources have been verified."],
  ["Things to know", "Practical links to related TexasDefined guides, nearby places and useful state or federal sources."],
] as const;

export const Route = createLazyFileRoute("/county")({ component: CountyIndexPage });

function CountyIndexPage() {
  const counties = useMemo(() => [...TEXAS_COUNTIES].sort((a, b) => a.name.localeCompare(b.name)), []);
  const [countyQuery, setCountyQuery] = useState("");
  const [cityQuery, setCityQuery] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [addressResult, setAddressResult] = useState<CountyLookupSuccess | null>(null);
  const [addressError, setAddressError] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  const countyMatches = useMemo(() => {
    const query = countyQuery.trim().toLowerCase().replace(/\s+county$/, "");
    if (!query) return [];
    return counties.filter((county) => county.name.replace(/ County$/, "").toLowerCase().includes(query)).slice(0, 12);
  }, [counties, countyQuery]);

  const cityMatches = useMemo(() => {
    const query = cityQuery.trim().toLowerCase();
    if (!query) return [];
    return TEXAS_CITIES
      .filter((city) => city.name.toLowerCase().includes(query))
      .map((city) => ({
        ...city,
        countyRecord: TEXAS_COUNTIES.find((county) => county.name === `${city.county} County`),
      }))
      .filter((city) => city.countyRecord)
      .slice(0, 12);
  }, [cityQuery]);

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
      const payload = (await response.json()) as CountyLookupResponse;
      if (!response.ok || !payload.ok) {
        setAddressError(payload.ok ? "The county lookup failed." : payload.error);
        return;
      }
      setAddressResult(payload);
    } catch {
      setAddressError("The county lookup could not be completed. Try again.");
    } finally {
      setAddressLoading(false);
    }
  }

  const validZip = /^\d{5}$/.test(zip);

  return (
    <Container className="pb-20 pt-10 sm:pb-24 sm:pt-14">
      <article className="mx-auto max-w-7xl">
        <header className="grid gap-8 border-b border-border pb-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas county guides</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">A guide to every Texas county</h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground sm:text-xl">
              TexasDefined has a guide for all 254 Texas counties. Use this hub to find the right county by name, city or exact address, then open a county guide for local facts, communities, history, government resources, property information and related TexasDefined coverage.
            </p>
          </div>
          <div className="border-l border-border pl-6 text-sm leading-7 text-muted-foreground">
            <strong className="block text-foreground">Not sure which county you need?</strong>
            A mailing city or ZIP code does not always match county boundaries. Start with what you know below; use the exact-address lookup when the distinction matters.
          </div>
        </header>

        <section className="border-b border-border py-10" aria-labelledby="inside-guide-heading">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div>
              <p className="eyebrow text-primary">What is in a guide?</p>
              <h2 id="inside-guide-heading" className="mt-2 font-display text-3xl">One starting point for the whole county</h2>
            </div>
            <div>
              <p className="max-w-4xl text-base leading-8 text-muted-foreground">
                County pages are built as practical reference guides, not just name-and-number directory entries. Source depth varies by county, so TexasDefined shows verified local information when it is available and keeps official sources close to the facts they support.
              </p>
              <div className="mt-7 grid sm:grid-cols-2 xl:grid-cols-3">
                {guideFeatures.map(([title, body]) => (
                  <div key={title} className="border-t border-border py-5 sm:px-5">
                    <h3 className="font-display text-xl">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border py-10" aria-labelledby="finder-heading">
          <p className="eyebrow text-primary">County finder</p>
          <h2 id="finder-heading" className="mt-2 max-w-4xl font-display text-4xl sm:text-5xl">Find the county from what you already know</h2>
          <p className="mt-4 max-w-4xl text-base leading-7 text-muted-foreground">
            Search the full county list directly, use a city from the TexasDefined place index, start with a ZIP code, or submit a complete street address for a Census-backed county match.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <FinderCard eyebrow="By county" title="Search by county name" description="Know the county already? Search all 254 guides and jump straight to it.">
              <label htmlFor="county-search" className="sr-only">County name</label>
              <input id="county-search" value={countyQuery} onChange={(event) => setCountyQuery(event.target.value)} placeholder="Try Harris, Travis or Brewster" className="min-h-12 w-full border border-border bg-background px-4" />
              {countyQuery.trim() ? (
                <div className="mt-4 border-t border-border">
                  {countyMatches.length ? countyMatches.map((county) => (
                    <Link key={county.slug} to="/$kind/$slug" params={{ kind: "county", slug: county.slug }} className="flex items-center justify-between border-b border-border py-3 text-sm font-semibold hover:text-primary">
                      <span>{county.name}</span><span aria-hidden="true">→</span>
                    </Link>
                  )) : <p className="py-4 text-sm text-muted-foreground">No Texas county matches that name.</p>}
                </div>
              ) : null}
            </FinderCard>

            <FinderCard eyebrow="By city" title="Search counties by city" description="Search cities in our structured Texas place index to see the county connected to that city.">
              <label htmlFor="city-search" className="sr-only">Texas city</label>
              <input id="city-search" value={cityQuery} onChange={(event) => setCityQuery(event.target.value)} placeholder="Try Austin, Katy or Amarillo" className="min-h-12 w-full border border-border bg-background px-4" />
              {cityQuery.trim() ? (
                <div className="mt-4 border-t border-border">
                  {cityMatches.length ? cityMatches.map((city) => (
                    <Link key={city.slug} to="/$kind/$slug" params={{ kind: "county", slug: city.countyRecord!.slug }} className="flex items-center justify-between gap-4 border-b border-border py-3 text-sm hover:text-primary">
                      <span><strong>{city.name}</strong><span className="text-muted-foreground"> · {city.county} County</span></span><span aria-hidden="true">→</span>
                    </Link>
                  )) : <p className="py-4 text-sm leading-6 text-muted-foreground">That city is not yet in the structured city index. Use the exact-address lookup for an authoritative county match.</p>}
                </div>
              ) : null}
            </FinderCard>

            <FinderCard eyebrow="By ZIP" title="Start with a ZIP code" description="ZIP codes are useful for narrowing a location, but they are postal areas rather than county boundaries and can cross county lines.">
              <label htmlFor="zip-search" className="sr-only">ZIP code</label>
              <input id="zip-search" inputMode="numeric" maxLength={5} value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="77494" className="min-h-12 w-full border border-border bg-background px-4" />
              {zip ? <p className="mt-3 text-sm leading-6 text-muted-foreground">{validZip ? `ZIP ${zip} is ready. Use the ZIP research tool, then verify a specific property with its full address.` : "Enter all five digits."}</p> : null}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                <Link to="/texas-zip-code-explorer" className="text-primary underline underline-offset-4">Open ZIP Code Explorer →</Link>
                <a href="#address-county-lookup" className="underline underline-offset-4">Verify an exact address ↓</a>
              </div>
            </FinderCard>

            <FinderCard eyebrow="By address" title="Find a county by exact address" description="For the most precise lookup, send a complete Texas street address through the existing U.S. Census Bureau geocoder.">
              <form id="address-county-lookup" onSubmit={submitAddress}>
                <label htmlFor="county-address" className="sr-only">Texas street address</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input id="county-address" type="text" autoComplete="street-address" maxLength={100} value={address} onChange={(event) => setAddress(event.target.value)} placeholder="1100 Congress Ave, Austin, TX 78701" className="min-h-12 min-w-0 flex-1 border border-border bg-background px-4" />
                  <button type="submit" disabled={addressLoading} className="min-h-12 bg-primary px-5 font-semibold text-primary-foreground disabled:opacity-60">{addressLoading ? "Checking…" : "Find county"}</button>
                </div>
              </form>
              <div aria-live="polite" className="mt-4">
                {addressError ? <p className="border-t border-border pt-4 text-sm leading-6"><strong>County not found.</strong> {addressError}</p> : null}
                {addressResult ? (
                  <div className="border-t border-border pt-4">
                    <p className="text-xs uppercase tracking-[0.14em] text-primary">Census match</p>
                    <p className="mt-1 font-display text-2xl">{addressResult.countyName}</p>
                    <p className="mt-2 text-sm text-muted-foreground">Matched: {addressResult.matchedAddress}</p>
                    <a href={addressResult.countyUrl} className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open the county guide →</a>
                  </div>
                ) : null}
              </div>
            </FinderCard>
          </div>
        </section>

        <section className="border-b border-border py-10">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Browse</p><h2 className="mt-2 font-display text-3xl">All 254 county guides</h2></div>
            <div>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">Prefer to browse? Every Texas county is linked below in alphabetical order.</p>
              <nav aria-label="Jump to county letter" className="mt-5 flex flex-wrap gap-2">
                {groupedCounties.map(([letter]) => <a key={letter} href={`#county-${letter}`} className="inline-flex h-9 w-9 items-center justify-center border border-border text-sm font-semibold hover:border-primary hover:text-primary">{letter}</a>)}
              </nav>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            {groupedCounties.map(([letter, letterCounties]) => (
              <div key={letter} id={`county-${letter}`} className="grid gap-4 border-t border-border pt-5 lg:grid-cols-[5rem_1fr] scroll-mt-24">
                <h3 className="font-display text-4xl text-primary">{letter}</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {letterCounties.map((county) => (
                    <Link key={county.slug} to="/$kind/$slug" params={{ kind: "county", slug: county.slug }} className="group border-b border-border py-3 pr-4 text-sm font-semibold hover:text-primary">
                      {county.name}<span className="ml-2" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-10">
          <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Go deeper</p><h2 className="mt-2 font-display text-3xl">County tools and comparisons</h2></div>
            <div className="grid sm:grid-cols-2">
              <Link to="/browse/counties" className="group border-t border-border py-5 sm:px-5"><span className="font-display text-xl group-hover:text-primary">Compare Texas counties</span><p className="mt-2 text-sm leading-6 text-muted-foreground">County seat, population, land area and verified property-resource pathways.</p></Link>
              <Link to="/find-my-county" className="group border-t border-border py-5 sm:px-5"><span className="font-display text-xl group-hover:text-primary">Full address county finder</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Open the standalone Census-backed address tool and methodology.</p></Link>
              <Link to="/property-tax/counties" className="group border-t border-border py-5 sm:px-5"><span className="font-display text-xl group-hover:text-primary">County property-tax guides</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Find county-level property and tax research where local sources are verified.</p></Link>
              <Link to="/texas-data/city-county-relationships" className="group border-t border-border py-5 sm:px-5"><span className="font-display text-xl group-hover:text-primary">How cities and counties overlap</span><p className="mt-2 text-sm leading-6 text-muted-foreground">Understand why a city name, mailing address and county boundary are not always interchangeable.</p></Link>
            </div>
          </div>
        </section>
      </article>
    </Container>
  );
}

function FinderCard({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="border border-border bg-card p-5 sm:p-6">
      <p className="eyebrow text-primary">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl">{title}</h3>
      <p className="mt-2 min-h-[3rem] text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
