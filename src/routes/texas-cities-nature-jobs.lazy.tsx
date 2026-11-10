import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-cities-nature-jobs")({ component: Page });
const metro = [
  { city: "Austin area", formal: "Austin–Round Rock–San Marcos", wage: 35.85, jobs: "Computer and mathematical occupations: 6.5% of local employment, vs. 3.4% nationally.", parks: "McKinney Falls · Bastrop · Pedernales Falls", parkSource: "https://tpwd.texas.gov/state-parks/nearby/austin", wageSource: "https://www.bls.gov/regions/southwest/news-release/OccupationalEmploymentandWages_Austin.htm", decision: "Compare the actual work corridor against housing options. Nearby parks are not guaranteed to be near your job or home." },
  { city: "Dallas–Fort Worth area", formal: "Dallas–Fort Worth–Arlington", wage: 33.96, jobs: "Transportation and material-moving occupations: 10.5% of local employment, vs. 8.8% nationally.", parks: "Cedar Hill · Ray Roberts Lake · Lake Mineral Wells", parkSource: "https://tpwd.texas.gov/state-parks/nearby/dfw", wageSource: "https://www.bls.gov/regions/southwest/news-release/occupationalemploymentandwages_dallasfortworth.htm", decision: "Choose a job corridor first. Park locations across the DFW region can be far apart." },
  { city: "Houston area", formal: "Houston–Pasadena–The Woodlands", wage: 32.51, jobs: "Construction and extraction: 5.5% of local employment; transportation and moving: 9.5%.", parks: "Brazos Bend · Sheldon Lake · Galveston Island", parkSource: "https://tpwd.texas.gov/state-parks/nearby/houston", wageSource: "https://www.bls.gov/regions/southwest/news-release/2026/occupationalemploymentandwages_houston_20260813.htm", decision: "Decide between wetland, coast and wooded destinations. Investigate property flood risk at a real address." },
  { city: "San Antonio area", formal: "San Antonio–New Braunfels", wage: 29.39, jobs: "Office and administrative support: 12.9% of local employment, vs. 11.4% nationally.", parks: "Government Canyon · Guadalupe River · Garner", parkSource: "https://tpwd.texas.gov/state-parks/nearby/sanantonio/", wageSource: "https://www.bls.gov/regions/southwest/news-release/2026/occupationalemploymentandwages_sanantonio_20260813.htm", decision: "Hill Country access is attractive, but a regional directory is not a drive-time measure." },
] as const;
const steps = [
  ["Find a specific job first", "Use TWC regional occupation data and real openings. A metro-wide mean does not predict pay for a particular role."],
  ["Define your outdoors", "Coast, wetlands, rivers, lakes, limestone trails and prairie environments have different access and seasonal constraints."],
  ["Test two actual addresses", "Compare a likely home to a likely workplace and separately to a park you would regularly visit. The city name is not enough."],
  ["Budget for the whole household", "Compare wage offers against housing, utilities, insurance, transportation and property taxes, not rent alone."],
  ["Check the park operator", "Verify current reservations, weather, water conditions, facilities and closures before using a regional listing as a trip plan."],
] as const;
function Official({ href, children }: { href: string; children: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{children}</a>;
}
function Page() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-14 sm:py-20">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/">Home</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page">Nature and jobs</span></nav>
      <p className="eyebrow mt-9 text-primary">City decisions · Research reviewed November 10, 2026</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">Where can you work in Texas and still get outside?</h1>
      <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">A job, a neighborhood and a park have to work together in real life. Instead of an arbitrary top-ten list, here's a source-backed comparison of four large employment markets with official regional park examples. Use it to shorten your shortlist, then inspect real addresses and jobs.</p>
      <p className="mt-5 text-sm leading-7">This is not a claim that every park is close to the entire metro or that a metro's average pay is your likely salary.</p>
    </Container></section>
    <section className="border-b border-border py-12 sm:py-16"><Container>
      <h2 className="font-display text-4xl">Four metros, four different trade-offs</h2>
      <p className="mt-5 max-w-4xl text-base leading-8">Wage figures are <strong>mean hourly wages across all occupations</strong> from the Bureau of Labor Statistics' May 2025 OEWS survey, published August 13, 2026. Occupation shares show the regional employment mix. Park examples are taken from Texas Parks and Wildlife's “Parks Near” directories, not a geospatial travel-time study.</p>
      <div className="mt-9 space-y-8">
        {metro.map(entry => <article key={entry.city} className="grid gap-5 border-t border-border pt-7 lg:grid-cols-[0.36fr_0.64fr]">
          <div><h3 className="font-display text-3xl">{entry.city}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">BLS area: {entry.formal}</p><p className="mt-3 text-xl font-semibold tabular-nums"><span aria-hidden="true">$</span>{entry.wage.toFixed(2)} <span className="text-sm font-normal">mean hourly, all occupations</span></p><p className="mt-3 text-sm"><Official href={entry.wageSource}>BLS metro wage source</Official></p></div>
          <div><p className="text-sm leading-7"><strong>Employment mix:</strong> {entry.jobs}</p><p className="mt-4 text-sm leading-7"><strong>State park examples:</strong> {entry.parks}. <Official href={entry.parkSource}>Official regional park list</Official>.</p><p className="mt-4 text-sm leading-7 text-muted-foreground"><strong>Practical concern:</strong> {entry.decision}</p></div>
        </article>)}
      </div>
      <p className="mt-8 max-w-4xl text-sm leading-7"><strong>Our calculation:</strong> the all-occupation hourly mean in Austin is $6.46 above San Antonio in this survey ($35.85 vs. $29.39). That difference does not establish an affordability winner. Occupation, housing, insurance, benefits, commuting, taxes and preferred recreation can reverse a decision. We do not assign a made-up “nature score.”</p>
    </Container></section>
    <section className="border-b border-border bg-surface py-12 sm:py-16"><Container className="max-w-5xl">
      <p className="eyebrow text-primary">Build a shortlist</p><h2 className="mt-3 font-display text-4xl">How to compare life instead of a travel brochure</h2>
      <ol className="mt-7 space-y-5">{steps.map(([title, body], index) => <li key={title} className="grid gap-4 border-t border-border pt-5 sm:grid-cols-[3rem_1fr]"><span aria-hidden="true" className="font-display text-3xl text-primary">{index + 1}</span><div><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-base leading-8">{body}</p></div></li>)}</ol>
      <p className="mt-8 text-base leading-8">Use <Link to="/texas-jobs-without-four-year-degree" className="text-primary underline">Texas career pathways and wages</Link> to identify the occupation; <Link to="/texas-career-training-options" className="text-primary underline">training options</Link> if you're switching careers; the <Link to="/texas-salary-comparison-by-city" className="text-primary underline">salary comparison</Link> and <Link to="/texas-cost-of-living-calculator" className="text-primary underline">living-cost tool</Link> to evaluate a move.</p>
    </Container></section>
    <section className="border-b border-border py-12 sm:py-16"><Container className="max-w-5xl">
      <p className="eyebrow text-primary">What landscape fits you?</p><h2 className="mt-3 font-display text-4xl">Your definition of “outdoors” matters</h2>
      <div className="mt-6 space-y-5 text-base leading-8">
        <p><strong>Wetlands and the coast:</strong> Houston's official region list includes Sheldon Lake, Brazos Bend and Galveston Island. These are different environments with different conditions. Browse <Link to="/fishing/lakes" className="text-primary underline">the Texas lake guides</Link> if public water access is your priority.</p>
        <p><strong>Hill Country trails and rivers:</strong> Austin and San Antonio official lists include parks such as Pedernales Falls, Government Canyon and Guadalupe River, but getting to those locations can be a longer trip from some neighborhoods.</p>
        <p><strong>North Texas prairies and lakes:</strong> DFW offers state park destinations including Cedar Hill, Ray Roberts Lake and Lake Mineral Wells. The region is large: put the park address beside your home and office before deciding.</p>
        <p><strong>City parks are a separate question:</strong> These TPWD lists do not measure municipal trails, tree canopy, neighborhood walkability, bicycle infrastructure or private nature preserves. For additional destinations use the <Link to="/explore/state-parks" className="text-primary underline">Texas state parks hub</Link>, and verify the actual operator page.</p>
      </div>
    </Container></section>
    <section className="py-12 sm:py-16"><Container className="max-w-5xl">
      <h2 className="font-display text-3xl">Method and limits</h2>
      <p className="mt-4 text-sm leading-7">Independent comparison compiled November 10, 2026, from BLS May 2025 metro OEWS news releases and the Texas Parks and Wildlife Department regional nearby-park directories. The BLS statistical areas are broad regions, not individual cities, and the TPWD directories include destinations that may be far from the city center. We have not estimated drive times, current openings, home prices, park operating status or a composite ranking from those inputs. Next update: when the next BLS metro OEWS releases appear or TPWD changes the listings.</p>
      <p className="mt-5 text-sm leading-7">Continue to our <Link to="/moving-to-texas" className="text-primary underline">relocation research hub</Link>, <Link to="/texas-industries" className="text-primary underline">industry overview</Link> and <Link to="/compare-texas-cities" className="text-primary underline">city comparison tool</Link>.</p>
    </Container></section>
  </main>;
}
