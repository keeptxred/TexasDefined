import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TEXAS_INDUSTRIES, TEXAS_INDUSTRIES_VERIFIED_AT } from "@/data/texas-industries";

export const Route = createLazyFileRoute("/texas-industries")({
  component: TexasIndustriesPage,
});

function TexasIndustriesPage() {
  return (
    <main>
      <section className="border-b border-border bg-muted/30 py-16 sm:py-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><span className="text-foreground">Texas Industries</span>
          </nav>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas economy · industry authority</p>
          <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">The industries that power Texas</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas has one of the world's largest subnational economies because it is not dependent on a single sector. Energy, technology, manufacturing, logistics, aerospace, healthcare, agriculture, finance, construction, professional services and tourism reinforce one another across very different regions of the state.</p>
          <div className="mt-10 grid max-w-4xl grid-cols-2 gap-px overflow-hidden border border-border bg-border sm:grid-cols-4">
            <Stat value={String(TEXAS_INDUSTRIES.length)} label="Industry guides" />
            <Stat value="254" label="Counties to connect" />
            <Stat value={String(TEXAS_INDUSTRIES.reduce((total, industry) => total + industry.hubs.length, 0))} label="Regional hubs" />
            <Stat value="1" label="Statewide hub" />
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">How to use this collection</p>
              <h2 className="mt-3 font-display text-4xl">Start statewide, then follow the work to a place</h2>
              <p className="mt-5 text-base leading-8 text-muted-foreground">Each industry guide explains the statewide system, its major clusters, the Texas regions where activity concentrates, and a small set of dated indicators from first-party or government sources. From there, use TexasDefined's city, county, moving, property and Made in Texas pages to understand the local story.</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">Source review: {TEXAS_INDUSTRIES_VERIFIED_AT}. Statistics are labeled with their period because industry rankings, employment, production and investment totals change over time.</p>
              <div className="mt-7 space-y-3 text-sm font-semibold">
                <a href="/article/texas-jobs-economy-industries" className="block text-primary">Read the Texas jobs & economy overview →</a>
                <a href="/texas-jobs-without-four-year-degree" className="block text-primary">Compare Texas non-degree careers and wages →</a>
                <a href="/texas-career-training-options" className="block text-primary">Find Texas career training options →</a>
                <a href="/texas-government-jobs" className="block text-primary">How to apply for state and local government work →</a>
                <a href="/made-in-texas" className="block text-primary">Browse Made in Texas companies →</a>
                <a href="/browse/counties" className="block text-primary">Browse all 254 counties →</a>
                <a href="/compare-texas-cities" className="block text-primary">Compare Texas cities →</a>
                <a href="/moving-to-texas?companyMove=employer#corporate-relocation" className="block text-primary">Corporate relocation & workforce planning →</a>
              </div>
            </div>
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {TEXAS_INDUSTRIES.map((industry) => (
                <a
                  key={industry.slug}
                  href={industry.href}
                  className="group bg-background p-6 transition-colors hover:bg-muted/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Texas industry</p>
                  <h2 className="mt-2 font-display text-3xl leading-tight">{industry.shortTitle}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{industry.description}</p>
                  <p className="mt-5 text-sm font-semibold text-foreground group-hover:text-primary">Explore the sector →</p>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Labor market evidence · November 10, 2026 review</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl">Is the Texas job market growing? The answer depends on what you measure.</h2>
          <p className="mt-5 max-w-4xl text-base leading-8">Texas added wage-and-salary jobs over the year through September 2026, yet the latest first-quarter business-flow report shows almost as many private-sector jobs disappeared at closing or shrinking establishments as were created at new or expanding ones. Both can be true. They count different things, in different periods, and neither tells you whether a specific employer is hiring today.</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="border border-border bg-background p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">September 2026</p>
              <p className="mt-3 font-display text-4xl tabular-nums">14,461,300</p>
              <h3 className="mt-3 font-semibold">Texas nonfarm payroll jobs</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Seasonally adjusted employment level in the Texas Workforce Commission's labor-market snapshot. It counts jobs, not unique workers or job advertisements.</p>
            </article>
            <article className="border border-border bg-background p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">September 2025 → September 2026</p>
              <p className="mt-3 font-display text-4xl tabular-nums">+154,300</p>
              <h3 className="mt-3 font-semibold">Additional payroll jobs over the year</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">TWC reports a 1.1% year-over-year increase in statewide nonfarm employment. This is a net change across the economy, not a count of openings.</p>
            </article>
            <article className="border border-border bg-background p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">December 2025 → March 2026</p>
              <p className="mt-3 font-display text-4xl tabular-nums">+1,242</p>
              <h3 className="mt-3 font-semibold">Net private-establishment job change</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">BLS Business Employment Dynamics records 654,260 gross job gains and 653,018 gross losses at private establishments during the first quarter of 2026.</p>
            </article>
          </div>
          <div className="mt-7 max-w-4xl space-y-4 text-sm leading-7">
            <p><strong>Sources:</strong> <a href="https://lmi.twc.texas.gov/explore/LMI/LMI_emp.asp" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Texas Workforce Commission labor-market statistics</a> (September 2026, seasonally adjusted); <a href="https://www.bls.gov/regions/southwest/news-release/2026/businessemploymentdynamics_texas_20261030.htm" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">U.S. Bureau of Labor Statistics, Texas Business Employment Dynamics</a> (first quarter 2026, published October 30, 2026).</p>
            <p><strong>Why the totals differ:</strong> The TWC year-over-year payroll comparison measures statewide nonfarm employment at two September endpoints. BLS Business Employment Dynamics tracks gross job creation and destruction at <em>private establishments</em> from the third month of one quarter to the next. The survey scope, time windows and measurement concepts differ; the +1,242 figure does not contradict the +154,300 figure. A gross job gain is not an available vacancy or necessarily a new worker hired.</p>
          </div>
          <div className="mt-10 max-w-5xl">
            <h3 className="font-display text-3xl">What changed by sector in the first quarter?</h3>
            <p className="mt-4 text-base leading-8 text-muted-foreground">In the BLS establishment-flow report, education and health services had the largest reported net gain among the published sectors. These are quarterly <strong>net establishment job changes</strong>, not annual forecasts, live openings or salaries.</p>
            <div className="mt-6 overflow-x-auto border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <caption className="p-4 text-left text-xs text-muted-foreground">Texas private-sector establishment job change, Q1 2026; BLS BED release October 30, 2026. Selected—not all—published industries.</caption>
                <thead className="border-b border-border bg-background">
                  <tr><th scope="col" className="p-4">Industry</th><th scope="col" className="p-4">Net change, quarter</th><th scope="col" className="p-4">What to check next</th></tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border"><th scope="row" className="p-4 font-semibold">Education and health services</th><td className="p-4 tabular-nums">+6,880 jobs</td><td className="p-4">Compare hospitals, care providers and education occupations; qualification requirements vary.</td></tr>
                  <tr className="border-b border-border"><th scope="row" className="p-4 font-semibold">Construction</th><td className="p-4 tabular-nums">+6,459 jobs</td><td className="p-4">Check the region, trade license and whether paid apprenticeship hours count.</td></tr>
                  <tr><th scope="row" className="p-4 font-semibold">Transportation and warehousing</th><td className="p-4 tabular-nums">−14,366 jobs</td><td className="p-4">A quarterly net decline does not rule out vacancies, replacement hiring or growth in a particular metro.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Our comparison links the two official statistical releases to the jobseeker decision. It does not label any of these sectors the “best industry” or equate aggregate job change with an individual candidate's prospects. To choose an occupation, check local wages, qualifications, positions and household costs using the <a href="https://lmi.twc.texas.gov/" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">TWC labor-market tools</a> and our <Link to="/texas-jobs-without-four-year-degree" className="text-primary underline underline-offset-4">Texas career-path comparison</Link>. For public employment, the <Link to="/texas-government-jobs" className="text-primary underline underline-offset-4">government application guide</Link> explains where to apply.</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Data reviewed November 10, 2026. The next TWC monthly release or a new BLS quarterly flow report may supersede these figures; check the linked original datasets for the latest publication. The original figures and period remain visible here until verified and substantively updated, rather than having the review date automatically advanced.</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-surface py-14 sm:py-20">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Connect the statewide story to local places</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl">Industry looks different across Texas</h2>
          <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            <Bridge title="Industry → county" body="Use county profiles to see how statewide sectors become local employers, land uses, ports, farms, plants, hospitals and growth corridors." href="/browse/counties" label="Browse counties" />
            <Bridge title="Industry → company" body="Use Made in Texas to distinguish actual Texas production from companies that were founded here, headquartered here or maintain major Texas operations." href="/made-in-texas" label="Open Made in Texas" />
            <Bridge title="Industry → moving decision" body="Use city comparisons, salary tools, housing costs, property taxes and school-district resources when an industry job becomes a relocation question." href="/moving-to-texas" label="Moving to Texas" />
            <Bridge title="Industry → corporate relocation" body="When a company is moving employees or choosing a Texas market, connect sector geography to labor markets, commute corridors, housing, schools and household transition planning." href="/moving-to-texas?companyMove=employer#corporate-relocation" label="Corporate relocation" />
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Method</p>
            <h2 className="mt-3 font-display text-4xl">What belongs in these industry guides?</h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">These guides are durable explainers, not investment recommendations or employer rankings. Factual claims rely on official state and federal data, agency sources and first-party institutional sources. Promotional rankings from economic-development organizations are attributed to the source rather than presented as independent conclusions.</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">The collection also separates current statistics from structural explanations. A refinery, semiconductor fab, hospital district or port can be a durable part of a regional economy even when annual output, staffing or investment figures change.</p>
          </div>
        </Container>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-background p-5"><p className="font-display text-3xl">{value}</p><p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</p></div>;
}

function Bridge({ title, body, href, label }: { title: string; body: string; href: string; label: string }) {
  return <article className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p><a href={href} className="mt-5 inline-block text-sm font-semibold text-primary">{label} →</a></article>;
}
