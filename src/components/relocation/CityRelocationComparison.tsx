import { useMemo, useState } from "react";

import { Container } from "@/components/layout/Container";
import {
  RELOCATION_METROS,
  RELOCATION_PLACES,
  RELOCATION_SOURCES,
  RELOCATION_SOURCE_VERIFIED,
  type RelocationPlace,
} from "@/data/relocation-authority";

const ALL = "all";

const planningLabels: Record<RelocationPlace["planningBand"], string> = {
  value: "Value-oriented starting point",
  balanced: "Balanced starting point",
  "location-first": "Location-first starting point",
};

const settingLabels: Record<RelocationPlace["setting"], string> = {
  urban: "Urban",
  suburban: "Suburban",
  "small-city": "Small city",
};

const commuteLabels: Record<RelocationPlace["commuteStyle"], string> = {
  core: "Core-oriented",
  corridor: "Corridor-oriented",
  regional: "Regional",
};

const sourceCards = [
  RELOCATION_SOURCES.blsMetro,
  RELOCATION_SOURCES.tdiInsurance,
  RELOCATION_SOURCES.teaSchools,
  RELOCATION_SOURCES.comptrollerProperty,
  RELOCATION_SOURCES.txdotTraffic,
  RELOCATION_SOURCES.pucUtilities,
  RELOCATION_SOURCES.femaFlood,
] as const;

export function CityRelocationComparison() {
  const [region, setRegion] = useState(ALL);
  const [setting, setSetting] = useState(ALL);
  const [commute, setCommute] = useState(ALL);
  const [planningBand, setPlanningBand] = useState(ALL);

  const regions = useMemo(() => [...new Set(RELOCATION_PLACES.map((place) => place.region))].sort(), []);
  const filtered = useMemo(() => RELOCATION_PLACES.filter((place) => (
    (region === ALL || place.region === region)
    && (setting === ALL || place.setting === setting)
    && (commute === ALL || place.commuteStyle === commute)
    && (planningBand === ALL || place.planningBand === planningBand)
  )), [region, setting, commute, planningBand]);

  const reset = () => {
    setRegion(ALL);
    setSetting(ALL);
    setCommute(ALL);
    setPlanningBand(ALL);
  };

  return (
    <section className="border-y border-border bg-surface" aria-labelledby="city-relocation-comparison-heading">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
          <div>
            <p className="eyebrow text-primary">Texas cities & suburbs · relocation comparison</p>
            <h2 id="city-relocation-comparison-heading" className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
              Compare places without a hidden “best city” score
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              This research layer covers {RELOCATION_PLACES.length} Texas cities and suburbs that already connect to Texas Defined&apos;s relocation framework. Filter by geography and planning style, then verify the exact address before treating a city name as a decision.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The planning bands below are editorial orientation labels—not live home prices, affordability rankings, school ratings or investment advice. A mailing city can cross county, school, utility, tax, flood and insurance boundaries.
            </p>
            <div className="mt-6 space-y-2 text-sm font-semibold">
              <a href="/moving-to-texas#address-research-desk" className="block text-primary underline underline-offset-4">Research an exact Texas address →</a>
              <a href="/moving-to-texas/data" className="block underline underline-offset-4">Open the Relocation Data Center →</a>
              <a href="/browse/counties" className="block underline underline-offset-4">Compare Texas counties →</a>
            </div>
          </div>

          <div>
            <div className="grid gap-4 border-y border-border py-6 sm:grid-cols-2 xl:grid-cols-4" aria-label="City relocation comparison filters">
              <FilterSelect label="Region" value={region} onChange={setRegion} options={regions} />
              <FilterSelect label="Setting" value={setting} onChange={setSetting} options={["urban", "suburban", "small-city"]} labels={settingLabels} />
              <FilterSelect label="Commute pattern" value={commute} onChange={setCommute} options={["core", "corridor", "regional"]} labels={commuteLabels} />
              <FilterSelect label="Planning orientation" value={planningBand} onChange={setPlanningBand} options={["value", "balanced", "location-first"]} labels={planningLabels} />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground" role="status">
                Showing <strong className="text-foreground">{filtered.length}</strong> of {RELOCATION_PLACES.length} research places
              </p>
              <button type="button" onClick={reset} className="text-sm font-semibold text-primary underline underline-offset-4">Reset filters</button>
            </div>

            {filtered.length ? (
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((place) => {
                  const metro = RELOCATION_METROS.find((item) => item.name === place.metro);
                  const hasDedicatedGuide = place.guideHref !== "/moving-to-texas";
                  return (
                    <article key={place.name} className="bg-background p-5">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">{place.region} · {settingLabels[place.setting]}</p>
                      <h3 className="mt-2 font-display text-2xl leading-tight">{place.name}, Texas</h3>
                      <dl className="mt-4 space-y-3 text-sm leading-6">
                        <div><dt className="font-semibold text-foreground">Metro / market</dt><dd className="text-muted-foreground">{place.metro}</dd></div>
                        <div><dt className="font-semibold text-foreground">County context</dt><dd className="text-muted-foreground">{place.counties.join(", ")}</dd></div>
                        <div><dt className="font-semibold text-foreground">Planning orientation</dt><dd className="text-muted-foreground">{planningLabels[place.planningBand]}</dd></div>
                        <div><dt className="font-semibold text-foreground">Commute research</dt><dd className="text-muted-foreground">{commuteLabels[place.commuteStyle]}</dd></div>
                        {metro?.jobCountJune2026 ? <div><dt className="font-semibold text-foreground">June 2026 metro payrolls</dt><dd className="text-muted-foreground">{metro.jobCountJune2026.toLocaleString()} · BLS preliminary</dd></div> : null}
                      </dl>
                      <div className="mt-5 flex flex-col items-start gap-2 text-sm font-semibold">
                        <a href={place.guideHref} className="text-primary underline underline-offset-4">{hasDedicatedGuide ? "Open the metro relocation guide" : "Open the statewide relocation guide"} →</a>
                        <a href="/moving-to-texas#address-research-desk" className="underline underline-offset-4">Verify the address →</a>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-6 border border-border bg-background p-6">
                <h3 className="font-display text-2xl">No research places match all four filters.</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Reset one or more filters. The tool does not loosen your criteria or manufacture a ranking behind the scenes.</p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-14 border-t border-border pt-10" aria-labelledby="metro-relocation-guides-heading">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Five deep metro guides</p>
              <h3 id="metro-relocation-guides-heading" className="mt-2 font-display text-3xl leading-tight">Go deeper where the source layer is strongest</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">These metro guides connect city choice to counties, jobs, insurance, traffic, schools, utilities and address-level research.</p>
            </div>
            <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
              {RELOCATION_METROS.map((metro) => (
                <a key={metro.id} href={metro.guideHref} className="group bg-background p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">Metro relocation guide</p>
                  <h4 className="mt-2 font-display text-2xl group-hover:text-primary">{metro.name}</h4>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{metro.counties.join(", ")}</p>
                  <p className="mt-4 text-sm font-semibold text-primary underline underline-offset-4">Open guide →</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 border-t border-border pt-10" aria-labelledby="address-changes-answer-heading">
          <div className="grid gap-8 lg:grid-cols-[18rem_1fr]">
            <div>
              <p className="eyebrow text-primary">Why the exact address matters</p>
              <h3 id="address-changes-answer-heading" className="mt-2 font-display text-3xl leading-tight">The city name is only the first layer</h3>
            </div>
            <div>
              <p className="max-w-4xl text-sm leading-7 text-muted-foreground">Before signing a lease or contract, verify the school district, appraisal district and taxing units, utility territory, flood map, homeowners coverage structure and repeated commute for the exact address. Texas Defined routes these questions to the responsible public sources instead of pretending a citywide score can answer them.</p>
              <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {sourceCards.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="bg-background p-4">
                    <span className="block text-sm font-semibold text-primary underline underline-offset-4">{source.name} ↗</span>
                    <span className="mt-2 block text-xs leading-5 text-muted-foreground">{source.purpose}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <nav aria-label="Texas city comparison calculators" className="mt-12 border-y border-border py-6">
          <p className="eyebrow text-primary">Run your household numbers</p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
            <a href="/texas-cost-of-living-calculator" className="text-primary underline underline-offset-4">Cost of living →</a>
            <a href="/texas-salary-comparison-by-city" className="underline underline-offset-4">Salary by city →</a>
            <a href="/texas-homeownership-cost-calculator" className="underline underline-offset-4">Homeownership cost →</a>
            <a href="/texas-home-insurance-calculator" className="underline underline-offset-4">Home insurance →</a>
            <a href="/texas-utility-cost-calculator" className="underline underline-offset-4">Utility cost →</a>
          </div>
        </nav>

        <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Relocation source registry verified {RELOCATION_SOURCE_VERIFIED}
        </p>
      </Container>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  labels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  labels?: Record<string, string>;
}) {
  return (
    <label className="text-sm font-semibold text-foreground">
      <span className="mb-2 block text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full border border-border bg-background px-3 py-3 font-normal text-foreground">
        <option value={ALL}>All</option>
        {options.map((option) => <option key={option} value={option}>{labels?.[option] ?? option}</option>)}
      </select>
    </label>
  );
}
