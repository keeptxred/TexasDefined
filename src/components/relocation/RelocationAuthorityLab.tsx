import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import { resolveRelocationAddress, type RelocationAddressResult } from "@/data/relocation-address";
import {
  RELOCATION_METROS,
  RELOCATION_PLACES,
  RELOCATION_RESEARCH_STEPS,
  RELOCATION_SOURCES,
  RELOCATION_SOURCE_VERIFIED,
  type RelocationPlace,
} from "@/data/relocation-authority";

type Preference = "any" | string;
type Match = { place: RelocationPlace; matched: string[]; considered: number };

const regionOptions = ["North Texas", "Gulf Coast", "Central Texas", "San Antonio corridor", "West Texas", "Panhandle", "South Texas", "East Texas"] as const;

export function RelocationAuthorityLab() {
  const [region, setRegion] = useState<Preference>("any");
  const [setting, setSetting] = useState<Preference>("any");
  const [planningBand, setPlanningBand] = useState<Preference>("any");
  const [commuteStyle, setCommuteStyle] = useState<Preference>("any");
  const [climate, setClimate] = useState<Preference>("any");
  const [addressDraft, setAddressDraft] = useState("");
  const [researchAddress, setResearchAddress] = useState("");
  const [addressResult, setAddressResult] = useState<RelocationAddressResult | null>(null);
  const [addressStatus, setAddressStatus] = useState<"idle" | "loading" | "not-found" | "error">("idle");

  const matches = useMemo<Match[]>(() => {
    return RELOCATION_PLACES.map((place) => {
      const checks: Array<[Preference, string, string]> = [
        [region, place.region, "region"],
        [setting, place.setting, "setting"],
        [planningBand, place.planningBand, "housing-planning emphasis"],
        [commuteStyle, place.commuteStyle, "commute pattern"],
        [climate, place.climate, "climate"],
      ];
      const considered = checks.filter(([wanted]) => wanted !== "any").length;
      const matched = checks.filter(([wanted, actual]) => wanted !== "any" && wanted === actual).map(([, , label]) => label);
      return { place, matched, considered };
    })
      .sort((a, b) => b.matched.length - a.matched.length || a.place.name.localeCompare(b.place.name))
      .slice(0, 8);
  }, [region, setting, planningBand, commuteStyle, climate]);

  const researchSubmittedAddress = async () => {
    const address = addressDraft.trim();
    if (!address) return;
    setResearchAddress(address);
    setAddressResult(null);
    setAddressStatus("loading");
    try {
      const resolved = await resolveRelocationAddress(address);
      setAddressResult(resolved);
      setAddressStatus(resolved ? "idle" : "not-found");
    } catch {
      setAddressStatus("error");
    }
  };

  return (
    <>
      <section className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="relocation-decision-lab">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Relocation decision lab</p>
              <h2 id="relocation-decision-lab" className="mt-3 font-display text-4xl leading-tight">Where should you research first?</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Filter Texas places by the kind of move you are planning. This is an orientation tool; there is no secret “best places” score: every match shows which filters matched, and current prices still belong in the calculators and address-level research.</p>
            </div>
            <div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <Filter label="Region" value={region} onChange={setRegion} options={regionOptions.map((value) => [value, value] as const)} />
                <Filter label="Setting" value={setting} onChange={setSetting} options={[["urban", "Urban"], ["suburban", "Suburban"], ["small-city", "Smaller city"]]} />
                <Filter label="Housing emphasis" value={planningBand} onChange={setPlanningBand} options={[["value", "Stretch space"], ["balanced", "Balance"], ["location-first", "Location first"]]} />
                <Filter label="Commute pattern" value={commuteStyle} onChange={setCommuteStyle} options={[["core", "Core-oriented"], ["corridor", "Corridor"], ["regional", "Regional"]]} />
                <Filter label="Climate" value={climate} onChange={setClimate} options={[["humid", "Humid"], ["central", "Central"], ["dry", "Dry"], ["coastal", "Coastal"]]} />
              </div>

              <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-4" aria-live="polite">
                {matches.map(({ place, matched, considered }) => (
                  <article key={place.name} className="bg-background p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">{considered ? `${matched.length} of ${considered} selected filters` : place.region}</p>
                    <h3 className="mt-2 font-display text-2xl">{place.name}</h3>
                    <p className="mt-2 text-xs leading-6 text-muted-foreground">{place.metro} · {place.counties.join(" / ")} County{place.counties.length > 1 ? "ies" : ""}</p>
                    {considered > 0 && <p className="mt-3 text-sm leading-6 text-foreground/85">Matched: {matched.length ? matched.join(", ") : "none of the selected orientation filters"}.</p>}
                    <a href={place.guideHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open relocation research →</a>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">The “housing emphasis” categories are editorial planning bands, not current median-price claims. Before choosing a place, compare live listings, an address-specific tax stack, insurance quotes and your actual commute.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="metro-research-grid">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Metro research framework</p>
              <h2 id="metro-research-grid" className="mt-3 font-display text-4xl leading-tight">The same questions, city by city</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Each major-metro guide is the local layer. Pair it with counties, schools, insurance, utilities, jobs and transportation rather than comparing city reputations in isolation.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
              {RELOCATION_METROS.map((metro) => <article key={metro.id} className="bg-background p-5">
                <h3 className="font-display text-2xl">{metro.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{metro.researchNote}</p>
                <dl className="mt-4 space-y-2 text-xs leading-5">
                  <div><dt className="font-semibold text-foreground">Counties to check</dt><dd className="text-muted-foreground">{metro.counties.join(", ")}</dd></div>
                  <div><dt className="font-semibold text-foreground">Places in the research layer</dt><dd className="text-muted-foreground">{metro.places.join(", ")}</dd></div>
                  {metro.jobCountJune2026 && <div><dt className="font-semibold text-foreground">June 2026 nonfarm payrolls</dt><dd className="text-muted-foreground">{metro.jobCountJune2026.toLocaleString()} · BLS preliminary</dd></div>}
                </dl>
                <a href={metro.guideHref} className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open metro guide →</a>
              </article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-surface py-12 sm:py-16" aria-labelledby="address-research-desk">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Research this Texas address</p>
              <h2 id="address-research-desk" className="mt-3 font-display text-4xl leading-tight">Build an address-level research packet</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Census geography is a research starting point—not authority for school attendance zones, utility territories, tax liability or flood status. Verify each boundary with the official sources below.</p>
            </div>
            <div>
              <form onSubmit={(event) => { event.preventDefault(); void researchSubmittedAddress(); }} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="relocation-address" className="sr-only">Texas address</label>
                <input id="relocation-address" value={addressDraft} onChange={(event) => setAddressDraft(event.target.value)} placeholder="Street address, city, Texas ZIP" className="min-h-12 flex-1 border border-border bg-background px-4 text-sm outline-none focus:border-primary" />
                <button type="submit" disabled={addressStatus === "loading"} className="min-h-12 bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-60">{addressStatus === "loading" ? "Resolving address…" : "Build research packet"}</button>
              </form>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">The submitted address is used for the Census lookup and is not saved by this tool.</p>
              {researchAddress && <div className="mt-4 border-l-2 border-primary pl-4 text-sm leading-7" aria-live="polite">
                {addressResult ? <>
                  <p><span className="font-semibold">Matched address:</span> {addressResult.matchedAddress}</p>
                  <p><span className="font-semibold">County:</span> {addressResult.county ?? "Not returned by the geocoder"}</p>
                  <p><span className="font-semibold">Census place:</span> {addressResult.place ?? "Not returned by the geocoder"}</p>
                  <p><span className="font-semibold">Unified school district:</span> {addressResult.schoolDistrict ?? "Not returned — verify with TEA"}</p>
                  <p><span className="font-semibold">Coordinates:</span> {addressResult.latitude.toFixed(5)}, {addressResult.longitude.toFixed(5)}</p>
                </> : addressStatus === "not-found" ? <p>No Texas address match was returned for <span className="font-semibold">{researchAddress}</span>. Check the street, city and ZIP, then try again.</p> : addressStatus === "error" ? <p>The federal geocoder could not be reached. You can still use the official research links below with <span className="font-semibold">{researchAddress}</span>.</p> : <p>Resolving <span className="font-semibold">{researchAddress}</span>…</p>}
              </div>}
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
                {RELOCATION_RESEARCH_STEPS.map((step) => <article key={step.title} className="bg-background p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">{step.source}</p>
                  <h3 className="mt-2 font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.copy}</p>
                  <a href={step.href} {...(step.external ? { target: "_blank", rel: "noreferrer" } : {})} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open research source {step.external ? "↗" : "→"}</a>
                </article>)}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16" aria-labelledby="relocation-source-desk">
        <Container>
          <div className="border-b border-border pb-5">
            <p className="eyebrow text-primary">Relocation Data Desk</p>
            <h2 id="relocation-source-desk" className="mt-2 font-display text-4xl">Primary sources behind the move</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Use the latest source for the question it actually answers. Migration, insurance, school, tax, utility and traffic data come from different systems and different vintages.</p>
          </div>
          <div className="grid gap-px border-x border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(RELOCATION_SOURCES).map((source) => <article key={source.url} className="bg-background p-5">
              <h3 className="font-display text-xl">{source.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{source.purpose}</p>
              <p className="mt-3 text-xs font-semibold text-foreground">Coverage: {source.freshness}</p>
              <a href={source.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official source ↗</a>
            </article>)}
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 border-t border-border pt-6 text-sm font-semibold">
            <a href="/texas-data" className="text-primary underline underline-offset-4">Open Texas Data Desk →</a>
            <a href="/texas-cost-of-living-calculator" className="underline underline-offset-4">Compare household costs</a>
            <a href="/texas-salary-comparison-by-city" className="underline underline-offset-4">Compare salary by city</a>
            <a href="/texas-home-insurance-calculator" className="underline underline-offset-4">Estimate insurance</a>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Source registry last verified {RELOCATION_SOURCE_VERIFIED}.</p>
        </Container>
      </section>
    </>
  );
}

function Filter({ label, value, onChange, options }: { label: string; value: Preference; onChange: (value: Preference) => void; options: Array<readonly [string, string]> }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{label}
    <select value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-background px-3 text-sm normal-case tracking-normal text-foreground">
      <option value="any">Any</option>
      {options.map(([optionValue, optionLabel]) => <option key={optionValue} value={optionValue}>{optionLabel}</option>)}
    </select>
  </label>;
}
