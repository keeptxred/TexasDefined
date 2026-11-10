import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-jobs-without-four-year-degree")({ component: Page });

const regionWages = [
  { region: "Houston–Pasadena–The Woodlands", construction: 27.41, maintenance: 30.38, logistics: 24.26, service: 14.70, source: "https://www.bls.gov/regions/southwest/news-release/2026/occupationalemploymentandwages_houston_20260813.htm" },
  { region: "Dallas–Fort Worth–Arlington", construction: 27.03, maintenance: 29.86, logistics: 24.17, service: 15.74, source: "https://www.bls.gov/regions/southwest/news-release/occupationalemploymentandwages_dallasfortworth.htm" },
  { region: "Austin–Round Rock–San Marcos", construction: 27.53, maintenance: 29.54, logistics: 21.90, service: 16.50, source: "https://www.bls.gov/regions/southwest/news-release/OccupationalEmploymentandWages_Austin.htm" },
  { region: "San Antonio–New Braunfels", construction: 25.94, maintenance: 28.18, logistics: 21.23, service: 15.02, source: "https://www.bls.gov/regions/southwest/news-release/2026/occupationalemploymentandwages_sanantonio_20260813.htm" },
] as const;

const routes = [
  { name: "Electrician", credential: "High school or equivalent; supervised apprenticeship and Texas licensing", detail: "Paid experience is central. Texas offers an apprentice electrician license without prior experience, but journeyman licensure requires documented supervised hours and an examination.", bls: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm", texas: "https://www.tdlr.texas.gov/electricians/apply/individuals/apprentice-electrician.htm" },
  { name: "Plumber / pipefitter", credential: "High school or equivalent; apprenticeship and trade rules", detail: "Texas plumber's apprentices must register before work hours count toward later licensing. Do not assume that informal work counts toward a credential.", bls: "https://www.bls.gov/OOH/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm", texas: "https://tsbpe.texas.gov/license-types/apprentice/" },
  { name: "HVAC technician", credential: "Commonly a nondegree postsecondary award, then substantial hands-on training", detail: "Compare a technical certificate with an employer apprenticeship; refrigerant-handling certification and state/local rules matter. A certificate does not substitute for licensure.", bls: "https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm", texas: "https://www.tdlr.texas.gov/" },
] as const;

function Money({ value }: { value: number }) { return <span className="tabular-nums">{value.toFixed(2)}</span>; }
function Source({ href, children }: { href: string; children: React.ReactNode }) {
  return <a className="font-semibold text-primary underline underline-offset-4" href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Page() {
  return <main>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/">Home</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page">Jobs without a four-year degree</span></nav>
        <p className="eyebrow mt-9 text-primary">Work &amp; living in Texas · Research updated November 10, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">A good Texas career doesn't always start with a four-year degree</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The useful question isn't whether a career is “degree-free.” It's how much supervised experience, licensing, training time and risk the work actually requires—and what employers in your part of Texas pay. Here's a way to make that comparison without confusing national occupation wages with local pay.</p>
        <p className="mt-5 text-sm leading-7">Start with the <Link to="/texas-career-training-options" className="text-primary underline">training and funding guide</Link> if paying for a credential is your biggest concern, or the <Link to="/texas-salary-comparison-by-city" className="text-primary underline">city salary comparison</Link> if you're weighing a move.</p>
      </Container>
    </section>
    <section className="border-b border-border py-12 sm:py-16">
      <Container>
        <div className="max-w-4xl">
          <p className="eyebrow text-primary">The local pay picture</p>
          <h2 className="mt-3 font-display text-4xl">What the same kind of work pays across four metros</h2>
          <p className="mt-5 text-base leading-8">The table below compares <strong>mean hourly wages for broad occupational groups</strong> in the Bureau of Labor Statistics' May 2025 survey, released in August 2026. These are not the wages of a new apprentice, a specific electrician, or a job offer. They show how labor markets differ for broad families of work, giving you a sensible starting point before checking a detailed occupation in <Source href="https://lmi.twc.texas.gov/">Texas Career Check and state wage tools</Source>.</p>
        </div>
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full min-w-[700px] border-collapse text-left text-sm">
            <caption className="px-5 py-4 text-left text-xs text-muted-foreground">Mean hourly wage in US dollars · May 2025 OEWS · source for each row linked to BLS. Occupational group averages include jobs that may require degrees.</caption>
            <thead className="border-b border-border bg-muted/30"><tr><th scope="col" className="p-4">Metro</th><th scope="col" className="p-4">Construction &amp; extraction</th><th scope="col" className="p-4">Installation &amp; repair</th><th scope="col" className="p-4">Transportation &amp; moving</th><th scope="col" className="p-4">Food service</th></tr></thead>
            <tbody>{regionWages.map((w) => <tr className="border-b border-border last:border-0" key={w.region}><th scope="row" className="p-4 font-semibold"><Source href={w.source}>{w.region}</Source></th><td className="p-4">$<Money value={w.construction}/></td><td className="p-4">$<Money value={w.maintenance}/></td><td className="p-4">$<Money value={w.logistics}/></td><td className="p-4">$<Money value={w.service}/></td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-7 max-w-4xl space-y-4 text-base leading-8">
          <p><strong>What stands out:</strong> Of these four metros, Houston's installation/maintenance/repair group averages $30.38 per hour while San Antonio's averages $28.18—an hourly difference of $2.20. In construction and extraction, Austin's $27.53 and Houston's $27.41 sit close, despite different industry mixes. Food-service group wages fall much lower in all four markets. Compare the specific occupation, required hours, benefits and housing costs before drawing conclusions.</p>
          <p><strong>What this does not tell you:</strong> A higher metro average is not proof that employers have openings for trainees. These occupational groups mix experience levels and specializations. The published estimates represent wage-and-salary employment, not self-employed earnings, net take-home pay, or the financial cost of training. For a household comparison, combine job-specific offers with the <Link to="/texas-cost-of-living-calculator" className="text-primary underline">Texas cost-of-living calculator</Link>.</p>
        </div>
      </Container>
    </section>
    <section className="border-b border-border bg-surface py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">What “no bachelor's degree” really means</p>
        <h2 className="mt-3 font-display text-4xl">Three trades, three different paths into the work</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {routes.map((job) => <article key={job.name} className="border border-border bg-background p-6">
            <h3 className="font-display text-3xl">{job.name}</h3>
            <p className="mt-4 text-sm font-semibold leading-6">{job.credential}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{job.detail}</p>
            <div className="mt-5 flex flex-col gap-2 text-sm"><Source href={job.bls}>BLS entry and training profile</Source><Source href={job.texas}>Texas licensing authority</Source></div>
          </article>)}
        </div>
        <p className="mt-6 max-w-4xl text-sm leading-7 text-muted-foreground">An occupation's BLS typical entry-level education describes the national labor market. It isn't an exemption from Texas licensing, and it isn't a promise that every local employer will hire without additional schooling. Licensing and apprentice registration should be verified on the linked agency pages at the time of application.</p>
      </Container>
    </section>
    <section className="border-b border-border py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">A real-world decision test</p><h2 className="mt-3 font-display text-4xl">A better way to choose your next job</h2>
        <ol className="mt-7 space-y-5 text-base leading-8 list-decimal pl-6">
          <li><strong>Choose the work, not the headline pay.</strong> Are you comfortable with heights, heat, physical demands, shift work, emergency calls or driving requirements? Those conditions vary by occupation.</li>
          <li><strong>Confirm the precise occupation.</strong> Use <Source href="https://lmi.twc.texas.gov/">TWC's labor-market tools</Source> for Texas wages and job projections, then verify local postings through <Source href="https://www.twc.texas.gov/jobseekers/job-search">WorkInTexas</Source>.</li>
          <li><strong>Map the licensed route.</strong> Ask when your work hours begin counting, who supervises you, which tests are required, and what happens if you change employers.</li>
          <li><strong>Price the entire training path.</strong> Compare tuition, supplies, tools, exam fees, travel, time not earning and likely starting wage—not just the advertised program price. Consult the <Link to="/texas-career-training-options" className="text-primary underline">Texas training-options guide</Link> before enrolling.</li>
          <li><strong>Test the location.</strong> A job near a distant plant or service district can change the actual weekly cost of living. Use the <Link to="/moving-to-texas" className="text-primary underline">relocation research hub</Link> and <Link to="/texas-cities-nature-jobs" className="text-primary underline">jobs-and-outdoors comparison</Link> if you're choosing a city.</li>
        </ol>
        <h2 className="mt-12 font-display text-3xl">Questions worth asking an employer</h2>
        <p className="mt-4 text-base leading-8">“Is the trainee position paid? Who signs my qualifying hours? What equipment must I buy? Who pays licensing and exam fees? What shift will I work in the first six months? What is the actual wage range for the role I would enter—not the best-paid veteran in the company?” If the answers are vague, keep looking.</p>
      </Container>
    </section>
    <section className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <h2 className="font-display text-3xl">Where this research comes from</h2>
        <p className="mt-4 text-sm leading-7">Compiled November 10, 2026 from BLS May 2025 OEWS metro releases, BLS Occupational Outlook Handbook entry requirements, and current TDLR/TSBPE agency guidance. We made the four-metro occupational-group comparison ourselves; it should not be confused with statewide job rankings, local entry wages or guaranteed demand. Wage figures need reviewing when new OEWS tables arrive. A clear correction should replace, not silently re-date, outdated figures.</p>
        <p className="mt-5 text-sm leading-7">Use the <Link to="/texas-industries" className="text-primary underline">Texas industry guides</Link> to understand where employment is concentrated and the <Link to="/texas-career-training-options" className="text-primary underline">training guide</Link> to check funded pathways. No school or recruiter has paid for placement on this page.</p>
      </Container>
    </section>
  </main>;
}
