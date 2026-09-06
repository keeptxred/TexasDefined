import { WildflowerSpeciesGrid } from "@/components/editorial/WildflowerSpeciesGrid";
import {
  RELOCATION_METROS,
  RELOCATION_SOURCES,
  RELOCATION_SOURCE_VERIFIED,
} from "@/data/relocation-authority";
import {
  TDI_HOMEOWNERS_MARKET,
  TDI_INSURANCE_VERIFIED,
  countyWindLabel,
  countyWindNote,
} from "@/data/relocation-insurance";

const WILDFLOWER_GUIDE_PATH = "/article/texas-wildflowers-guide";

const DATA_DESK_LINKS = [
  {
    href: "/moving-to-texas/data",
    label: "Texas Relocation Data Center",
    note: "The relocation-specific catalog for migration, jobs, insurance, traffic, source vintages and methodology.",
  },
  {
    href: "/texas-data/texas-population-and-migration-2025",
    label: "Current Texas population and migration snapshot",
    note: "Current Census Vintage 2025 statewide population estimate and components of change.",
  },
  {
    href: "/texas-data/texas-population-and-migration-2024",
    label: "Revised Texas 2024 population history",
    note: "The 2023–2024 period restated on the same Vintage 2025 series for consistent historical comparison.",
  },
  {
    href: "/texas-data/where-new-texans-came-from-2024",
    label: "Where new Texans came from",
    note: "ACS state-to-state migration flows, with margins-of-error context.",
  },
  {
    href: "/texas-data/texas-homeowners-premium-history",
    label: "Homeowners insurance premium history",
    note: "Texas Department of Insurance market history and statewide context.",
  },
  {
    href: "/texas-data/texas-metro-payrolls-june-2026",
    label: "Texas metro employment",
    note: "BLS metropolitan nonfarm payroll employment for June 2026; next monthly release is scheduled September 2, 2026.",
  },
  {
    href: "/texas-data/texas-traffic-monitoring-coverage",
    label: "Texas traffic monitoring coverage",
    note: "TxDOT traffic-count and monitoring-system coverage for route research.",
  },
] as const;

const CALCULATOR_LINKS = [
  ["/texas-cost-of-living-calculator", "Compare household costs"],
  ["/texas-salary-comparison-by-city", "Compare salary by city"],
  ["/texas-home-insurance-calculator", "Estimate home insurance"],
  ["/texas-homeownership-cost-calculator", "Model full homeownership cost"],
] as const;

const RESEARCH_SOURCES = [
  RELOCATION_SOURCES.censusPopulation,
  RELOCATION_SOURCES.censusCountyMigration,
  RELOCATION_SOURCES.blsMetro,
  RELOCATION_SOURCES.tdiInsurance,
  RELOCATION_SOURCES.txdotTraffic,
  RELOCATION_SOURCES.teaSchools,
  RELOCATION_SOURCES.comptrollerProperty,
] as const;

export function MetroRelocationAuthority({ articlePath }: { articlePath: string }) {
  if (articlePath === WILDFLOWER_GUIDE_PATH) return <WildflowerSpeciesGrid />;

  const metro = RELOCATION_METROS.find((metro) => metro.guideHref === articlePath);
  if (!metro) return null;

  return (
    <aside className="my-14 border-y border-border bg-surface px-5 py-8 sm:px-7 sm:py-10" aria-labelledby="metro-relocation-authority">
      <p className="eyebrow text-primary">Relocation Data Desk · {metro.name}</p>
      <h2 id="metro-relocation-authority" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
        Put this metro guide against the underlying data
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {metro.researchNote} Jobs, migration, insurance and traffic come from different datasets and vintages, so Texas Defined does not collapse them into a composite “best city” score.
      </p>

      <div className="mt-7 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
        <section className="bg-background p-5" aria-label={`${metro.name} geography to verify`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">Geography first</p>
          <h3 className="mt-2 font-display text-2xl">Counties and places to compare</h3>
          <dl className="mt-4 space-y-3 text-sm leading-6">
            <div>
              <dt className="font-semibold text-foreground">Counties</dt>
              <dd className="text-muted-foreground">{metro.counties.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Places in this research layer</dt>
              <dd className="text-muted-foreground">{metro.places.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">BLS labor market</dt>
              <dd className="text-muted-foreground">{metro.jobMarket}</dd>
            </div>
            {metro.jobCountJune2026 ? (
              <div>
                <dt className="font-semibold text-foreground">June 2026 nonfarm payrolls</dt>
                <dd className="text-muted-foreground">{metro.jobCountJune2026.toLocaleString()} · BLS preliminary</dd>
              </div>
            ) : null}
          </dl>
          <a href="/moving-to-texas#address-research-desk" className="mt-5 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            Research an exact Texas address →
          </a>
        </section>

        <section className="bg-background p-5" aria-label={`${metro.name} relocation calculators`}>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">Run your numbers</p>
          <h3 className="mt-2 font-display text-2xl">Use your household, not a generic ranking</h3>
          <ul className="mt-4 divide-y divide-border">
            {CALCULATOR_LINKS.map(([href, label]) => (
              <li key={href} className="py-3 first:pt-0 last:pb-0">
                <a href={href} className="text-sm font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary">
                  {label} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-7 border-t border-border pt-6" aria-labelledby="metro-insurance-research">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-primary">TDI county insurance research · 2025 preliminary</p>
        <h3 id="metro-insurance-research" className="mt-2 font-display text-2xl">Compare the counties, then quote the address</h3>
        <p className="mt-3 max-w-4xl text-sm leading-6 text-muted-foreground">
          TDI publishes average annual homeowners premiums for every Texas county from 2019 through preliminary 2025 data. The 2025 statewide average was ${TDI_HOMEOWNERS_MARKET.statewideAverageAnnualPremium.toLocaleString()}, but a statewide average is not a quote and should not be substituted for the county map or address-specific coverage.
        </p>
        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Texas active policies</dt><dd className="mt-1 font-display text-2xl">{TDI_HOMEOWNERS_MARKET.activeHomeownersPolicies.toLocaleString()}</dd></div>
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">2025 paid losses</dt><dd className="mt-1 font-display text-2xl">${(TDI_HOMEOWNERS_MARKET.statewidePaidLosses / 1_000_000_000).toFixed(2)}B</dd></div>
          <div className="border-t border-border pt-3"><dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Wind + hail share since 2019</dt><dd className="mt-1 font-display text-2xl">{Math.round(TDI_HOMEOWNERS_MARKET.windHailShareSince2019 * 100)}% avg.</dd></div>
        </dl>
        <div className="mt-5 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {metro.counties.map((county) => (
            <article key={county} className="bg-background p-4">
              <p className="font-display text-xl">{county} County</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary">{countyWindLabel(county)}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{countyWindNote(county)}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold">
          <a href={TDI_HOMEOWNERS_MARKET.sourceUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Open TDI county premium map ↗</a>
          <a href={TDI_HOMEOWNERS_MARKET.lossesSourceUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Open county paid-loss tool ↗</a>
          <a href={TDI_HOMEOWNERS_MARKET.lossesCsvUrl} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">Download TDI 2025 county-loss CSV ↗</a>
          <a href="/texas-home-insurance-calculator" className="underline underline-offset-4">Run planning calculator →</a>
        </div>
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          {TDI_HOMEOWNERS_MARKET.lossCoverage} County losses describe paid claims, not expected future premiums or the risk at a specific property. Verified {TDI_INSURANCE_VERIFIED}.
        </p>
      </section>

      <section className="mt-7" aria-labelledby="metro-relocation-datasets">
        <h3 id="metro-relocation-datasets" className="font-display text-2xl">Data to open beside this guide</h3>
        <div className="mt-4 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {DATA_DESK_LINKS.map((item) => (
            <a key={item.href} href={item.href} className="group bg-background p-4">
              <span className="block text-sm font-semibold text-foreground group-hover:text-primary">{item.label} →</span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.note}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-7 border-t border-border pt-6" aria-labelledby="metro-relocation-sources">
        <h3 id="metro-relocation-sources" className="font-display text-2xl">Primary-source verification</h3>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          These sources answer different questions and update on different schedules. Verify the exact address, boundary, quote and route before making a move.
        </p>
        <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {RESEARCH_SOURCES.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-primary underline underline-offset-4">
                {source.name} ↗
              </a>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{source.freshness}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Relocation source registry verified {RELOCATION_SOURCE_VERIFIED}
        </p>
      </section>
    </aside>
  );
}
