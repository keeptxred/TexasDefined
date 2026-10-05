import { Link } from "@tanstack/react-router";

const metros = [
  {
    name: "Houston",
    population: "2,304,580",
    jobs: "Energy, health care, ports, aerospace, manufacturing",
    climate: "Hot, humid Gulf Coast; heavy-rain and hurricane exposure",
    mobility: "Multiple job centers; commute depends heavily on exact destination",
    bestFor: "International scale, medical careers, energy, diverse food and culture",
    watch: "Flood exposure, insurance, humidity and long cross-metro drives",
  },
  {
    name: "Dallas–Fort Worth",
    population: "Dallas 1,304,379 · Fort Worth 918,915",
    jobs: "Finance, headquarters, technology, defense, aviation, logistics",
    climate: "Hot summers; stronger winter cold, hail and severe-storm exposure",
    mobility: "Polycentric region with many independent cities and toll corridors",
    bestFor: "Corporate careers, air connectivity, suburban choice and large job market",
    watch: "Do not choose housing from a 'Dallas' label without mapping the actual office",
  },
  {
    name: "Austin",
    population: "961,855",
    jobs: "Technology, semiconductors, state government, higher education",
    climate: "Hot Central Texas; drought, flash-flood and Hill Country weather influences",
    mobility: "Growth is concentrated along a limited set of major corridors",
    bestFor: "Technology, government, live music and quick Hill Country access",
    watch: "Housing cost and peak-hour congestion can erase the benefit of a short map distance",
  },
  {
    name: "San Antonio",
    population: "1,434,625",
    jobs: "Military, health care, tourism, cybersecurity and services",
    climate: "Hot South-Central Texas; generally drier than Houston",
    mobility: "Large loop-and-spoke road network with fast-growing outer corridors",
    bestFor: "Military households, history, family life and strong Tejano culture",
    watch: "Growth corridors can change commute times and service patterns quickly",
  },
  {
    name: "El Paso",
    population: "678,815",
    jobs: "Defense, border trade, logistics, health care and government",
    climate: "Dry Chihuahuan Desert; large day-night temperature swings",
    mobility: "Linear city constrained by mountains, the border and major east-west routes",
    bestFor: "Dry climate, mountain scenery, border culture and a distinct regional identity",
    watch: "It is on Mountain Time and is geographically remote from the other major Texas metros",
  },
] as const;

const fitCards = [
  ["Energy or major medical employment", "Houston", "/article/texas-jobs-economy-industries"],
  ["Corporate HQ, finance or aviation", "Dallas–Fort Worth", "/texas-industries"],
  ["Technology and state government", "Austin", "/article/texas-jobs-economy-industries"],
  ["Military-connected household", "San Antonio", "/article/texas-jobs-economy-industries"],
  ["Dry climate and mountain landscape", "El Paso", "/browse/cities"],
  ["Smaller-city or rural lifestyle", "Start with the regional guides", "/article/texas-regions-explained"],
] as const;

const mapPoints = [
  { label: "El Paso", left: "8%", top: "58%" },
  { label: "Amarillo", left: "45%", top: "12%" },
  { label: "DFW", left: "65%", top: "35%" },
  { label: "Austin", left: "57%", top: "58%" },
  { label: "San Antonio", left: "55%", top: "72%" },
  { label: "Houston", left: "76%", top: "66%" },
  { label: "RGV", left: "62%", top: "92%" },
] as const;

export function TexasCitiesComparison() {
  return (
    <section className="mt-8 space-y-10" aria-labelledby="texas-city-comparison-heading">
      <div className="rounded-sm border border-border bg-surface p-6 sm:p-8">
        <p className="eyebrow text-primary">Start here</p>
        <h2 id="texas-city-comparison-heading" className="mt-3 font-display text-3xl sm:text-4xl">
          Texas cities compared at a glance
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
          The right Texas city depends less on a statewide ranking than on the exact job center, climate, commute pattern and household tradeoffs you are willing to accept. Population figures below are 2020 Census city counts, so they are a scale reference—not a current housing-market ranking.
        </p>
        <div className="mt-7 overflow-x-auto">
          <table className="border-collapse text-left text-sm" style={{ minWidth: "980px" }}>
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-3 font-semibold">Place</th>
                <th className="px-3 py-3 font-semibold">2020 city population</th>
                <th className="px-3 py-3 font-semibold">Major job clusters</th>
                <th className="px-3 py-3 font-semibold">Climate / hazard pattern</th>
                <th className="px-3 py-3 font-semibold">Daily-life reality</th>
              </tr>
            </thead>
            <tbody>
              {metros.map((metro) => (
                <tr key={metro.name} className="border-b border-border align-top last:border-b-0">
                  <th className="px-3 py-4 font-display text-lg text-foreground">{metro.name}</th>
                  <td className="px-3 py-4 leading-6 text-foreground/80">{metro.population}</td>
                  <td className="px-3 py-4 leading-6 text-foreground/80">{metro.jobs}</td>
                  <td className="px-3 py-4 leading-6 text-foreground/80">{metro.climate}</td>
                  <td className="px-3 py-4 leading-6 text-foreground/80">{metro.mobility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          Source for population counts: U.S. Census Bureau, 2020 Decennial Census. Climate and labor-market comparisons should be checked against current NOAA/NWS and BLS/Texas Workforce Commission data before a move.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-sm border border-border p-6 sm:p-8">
          <p className="eyebrow text-primary">Orientation map</p>
          <h2 className="mt-3 font-display text-3xl">Texas changes fast from west to east</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This schematic is not to scale. It is meant to show why “Texas weather” or “Texas lifestyle” is too broad to be useful.
          </p>
          <div className="relative mt-6 overflow-hidden rounded-sm border border-border bg-surface" style={{ aspectRatio: "4 / 3" }}>
            <div className="absolute border-2 border-border bg-background" style={{ inset: "10%", transform: "rotate(-2deg)", borderRadius: "45% 30% 38% 28% / 35% 28% 42% 40%" }} aria-hidden="true" />
            {mapPoints.map((point) => (
              <div key={point.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: point.left, top: point.top }}>
                <span className="block size-3 rounded-full border-2 border-background bg-primary shadow" />
                <span className="mt-1 block whitespace-nowrap text-xs font-semibold text-foreground">{point.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-primary">Decision guide</p>
          <h2 className="mt-3 font-display text-3xl">Best fit depends on the thing you cannot compromise on</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {metros.map((metro) => (
              <article key={metro.name} className="border-t border-border pt-4">
                <h3 className="font-display text-xl">{metro.name}</h3>
                <p className="mt-2 text-sm leading-6"><span className="font-semibold text-foreground">Best fit:</span> <span className="text-muted-foreground">{metro.bestFor}</span></p>
                <p className="mt-2 text-sm leading-6"><span className="font-semibold text-foreground">Watch:</span> <span className="text-muted-foreground">{metro.watch}</span></p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-sm border-y border-border py-8">
        <p className="eyebrow text-primary">Choose your next comparison</p>
        <h2 className="mt-3 font-display text-3xl">What matters most to your household?</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {fitCards.map(([need, answer, href]) => (
            <Link key={need} to={href} className="group border border-border p-4 transition-colors hover:border-primary">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">{need}</span>
              <span className="mt-2 block font-display text-xl group-hover:text-primary">{answer} →</span>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          <Link to="/texas-cost-of-living-calculator" className="text-primary underline decoration-primary/40 underline-offset-4">Compare cost of living →</Link>
          <Link to="/browse/cities" className="text-primary underline decoration-primary/40 underline-offset-4">Browse city guides →</Link>
          <Link to="/browse/counties" className="text-primary underline decoration-primary/40 underline-offset-4">Compare counties →</Link>
        </div>
      </div>

      <aside className="rounded-sm border border-border bg-surface p-6 text-sm leading-7 text-muted-foreground" aria-label="Official comparison sources">
        <p className="font-semibold text-foreground">Use current official data for a final move decision.</p>
        <p className="mt-2">
          Population and demographics: <a className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary" href="https://www.census.gov/quickfacts/" target="_blank" rel="noreferrer">U.S. Census Bureau QuickFacts ↗</a>. Employment: <a className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary" href="https://www.bls.gov/regions/southwest/" target="_blank" rel="noreferrer">U.S. Bureau of Labor Statistics Southwest ↗</a> and <a className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary" href="https://www.twc.texas.gov/data-reports/labor-market-information" target="_blank" rel="noreferrer">Texas Workforce Commission ↗</a>. Climate normals and hazards: <a className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary" href="https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals" target="_blank" rel="noreferrer">NOAA U.S. Climate Normals ↗</a> and <a className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:text-primary" href="https://msc.fema.gov/portal/home" target="_blank" rel="noreferrer">FEMA Flood Map Service Center ↗</a>.
        </p>
      </aside>
    </section>
  );
}
