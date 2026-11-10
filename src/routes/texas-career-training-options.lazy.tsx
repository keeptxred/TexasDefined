import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-career-training-options")({ component: Page });

const routes = [
  { title: "Workforce Solutions and WIOA", cost: "May be funded for eligible participants; not universally free", who: "Workers whose employment plans justify training, subject to local board rules, eligibility and available funding.", what: "Ask your local Workforce Solutions office to assess your eligibility and training need before you commit or pay. WIOA is not a blanket tuition waiver.", url: "https://www.twc.texas.gov/sites/default/files/wf/docs/wioa-guidelines-twc.pdf", action: "Read current TWC WIOA guidance" },
  { title: "Registered apprenticeship", cost: "Often paid on the job; compare application and tool costs", who: "People ready to combine supervised paid work with instruction and an occupation-specific credential.", what: "Use the federal Apprenticeship Job Finder and confirm whether the specific position is registered, accepting applicants, and linked to the required Texas trade license.", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", action: "Search apprenticeship opportunities" },
  { title: "Community and technical colleges", cost: "Published tuition varies by residency, program, materials and aid", who: "Learners who need a recognized certificate or associate degree with a verifiable program, schedule and outcomes.", what: "Use TWC's State Training Inventory to identify programs, then call the institution for current costs, start dates, seat availability and financial aid.", url: "https://lmi.twc.texas.gov/apps/sti/", action: "Find a Texas training program" },
  { title: "Private career schools", cost: "Varies; verify refund rules and additional fees", who: "Learners considering a shorter, specialized training provider.", what: "Check the TWC licensed career-schools directory and enforcement information. Directory inclusion does not guarantee a job or the accuracy of a school's advertised outcomes.", url: "https://apps.twc.texas.gov/CSC/directory/search.do", action: "Verify the school's state record" },
] as const;

const questions = [
  ["Total price", "What is the final amount including tuition, fees, books, tools, uniforms, examinations, transportation and financing interest?"],
  ["Credential", "What exact award will I receive, who recognizes it, and does it satisfy any Texas licensing prerequisites?"],
  ["Jobs", "What share of comparable completers obtained a relevant job, in what period, and how was that independently measured?"],
  ["Time and schedule", "Can I attend around work and childcare? Does the program require unpaid placements or an extended commute?"],
  ["Financing", "Which aid is a grant, employer-paid training, loan or reimbursement? Does taking aid change other benefits?"],
  ["Transfer and exit", "Will credits transfer? What happens if the course closes or I withdraw? What portion, if any, is refundable?"],
] as const;

function External({ href, children }: { href: string; children: string }) {
  return <a className="font-semibold text-primary underline underline-offset-4" target="_blank" rel="noopener noreferrer" href={href}>{children}</a>;
}

function Page() {
  return <main>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/">Home</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page">Career training</span></nav>
        <p className="eyebrow mt-9 text-primary">Practical careers · Sources reviewed November 10, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">How to find job training in Texas without wasting money</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Some training is paid by an employer. Some may be covered by Workforce Solutions after an eligibility review. Some comes with a bill that only makes sense if the starting wage justifies it. Before you enroll, separate those routes—and ask exactly what credential you will have at the end.</p>
        <p className="mt-5 max-w-4xl text-sm leading-7">If you have not decided on an occupation, start with <Link to="/texas-jobs-without-four-year-degree" className="text-primary underline">non-degree Texas career pathways and local wage comparisons</Link>. A short course is not automatically a direct route to a licensed job.</p>
      </Container>
    </section>
    <section className="border-b border-border py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Four ways to start</p>
        <h2 className="mt-3 max-w-4xl font-display text-4xl">The real difference between free, funded, paid and low-cost</h2>
        <p className="mt-5 max-w-4xl text-base leading-8">These are <strong>routes to evaluate</strong>, not a list of confirmed open training seats or guaranteed grants. An apprenticeship position is employment; a college certificate is schooling; a WIOA-approved course is a potential funded service subject to an eligibility decision. They aren't interchangeable.</p>
        <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-2">
          {routes.map((route) => <article className="bg-background p-6 sm:p-8" key={route.title}>
            <h3 className="font-display text-3xl">{route.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-6">{route.cost}</p>
            <p className="mt-4 text-sm leading-7"><strong>Useful for:</strong> {route.who}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{route.what}</p>
            <p className="mt-5 text-sm"><External href={route.url}>{route.action}</External></p>
          </article>)}
        </div>
      </Container>
    </section>
    <section className="border-b border-border bg-surface py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">Start with an actual office</p>
        <h2 className="mt-3 font-display text-4xl">What to ask Workforce Solutions before paying a school</h2>
        <p className="mt-5 text-base leading-8">Texas Workforce Commission guidance says its local boards make eligibility and training-need decisions for Workforce Innovation and Opportunity Act (WIOA) services; those decisions belong to the workforce system, not to a website or school salesperson. Program funding and local rules can change. If you already paid for training, the agency may not cover those prior costs.</p>
        <ol className="mt-6 list-decimal space-y-4 pl-6 text-base leading-8">
          <li>Find a <External href="https://www.twc.texas.gov/jobseekers/job-search">Texas Workforce Solutions contact through TWC</External>. Explain your occupation, job history, location and training goal.</li>
          <li>Ask: “Can you assess me for WIOA adult or dislocated-worker training, and which eligible programs can my local board fund?” Do not assume you qualify based only on income or unemployment status.</li>
          <li>Request a written explanation of required assessments, the employment plan, the specific approved provider, allowable costs, and what remains your responsibility.</li>
          <li>Check whether an <External href="https://www.apprenticeship.gov/apprenticeship-job-finder">apprenticeship opening</External> could pay you while you train. Compare travel, starting wage and license requirements.</li>
          <li>Cross-check any training provider in the <External href="https://lmi.twc.texas.gov/apps/sti/">State Training Inventory</External> and with the school itself. TWC warns that this inventory is a point-in-time reference, not a guarantee that a program still runs.</li>
        </ol>
        <p className="mt-6 border-l-2 border-primary pl-5 text-sm leading-7"><strong>Important financial distinction:</strong> A program being “eligible” or a school appearing in a directory does not mean the government will pay its tuition. WIOA training services require eligibility and documented need; details are in the <External href="https://www.twc.texas.gov/sites/default/files/wf/docs/wioa-guidelines-twc.pdf">official TWC guidelines</External>.</p>
      </Container>
    </section>
    <section className="border-b border-border py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Before signing</p>
        <h2 className="mt-3 font-display text-4xl">Six questions that expose an expensive mistake</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {questions.map(([title, body], index) => <article key={title} className="border-t-2 border-primary pt-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question {index + 1}</p><h3 className="mt-2 font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7">{body}</p></article>)}
        </div>
        <p className="mt-8 max-w-4xl text-base leading-8">A practical comparison: if one school charges less tuition but requires several months without wages, a paid apprenticeship could still be a better financial fit. Conversely, a course with a recognized employer placement and strong outcomes may justify more than a cheaper course with little hands-on experience. Do the full calculation, not just the sticker price. Use the <Link to="/texas-salary-comparison-by-city" className="text-primary underline">city salary comparison</Link> when your training choice could mean relocating to a different Texas job market.</p>
      </Container>
    </section>
    <section className="border-b border-border bg-surface py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">Texas licensing changes the answer</p>
        <h2 className="mt-3 font-display text-4xl">A certificate and a trade license are not the same</h2>
        <div className="mt-5 space-y-5 text-base leading-8">
          <p>For electricians, <External href="https://www.tdlr.texas.gov/electricians/apply/individuals/apprentice-electrician.htm">TDLR's apprentice licensing page</External> says a person may apply without prior experience, but working in the trade is regulated and further licensure has separate requirements. As of the 2026 rules, an accelerated education pathway also exists for approved programs; <External href="https://www.tdlr.texas.gov/news/rulemaking/2026/07/02/commission-adopts-rules-4/">verify the actual approved pathway</External> rather than assuming any electrician course receives that credit.</p>
          <p>For plumbers, <External href="https://tsbpe.texas.gov/license-types/apprentice/">the Texas State Board of Plumbing Examiners</External> says qualifying apprentice hours do not count before a valid apprentice registration. Training ads that promise “licensed in weeks” deserve particular scrutiny: ask which precise license and level they mean.</p>
          <p>For changing careers, compare occupation requirements and realistic wages with <External href="https://lmi.twc.texas.gov/">TWC's career tools</External>, then look at hiring conditions through <External href="https://www.twc.texas.gov/jobseekers/job-search">WorkInTexas</External>. A school's projected salary is not an accepted job offer.</p>
        </div>
      </Container>
    </section>
    <section className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <h2 className="font-display text-3xl">Sources, review date and what remains uncertain</h2>
        <p className="mt-4 text-sm leading-7">Sources reviewed November 10, 2026: Texas Workforce Commission's State Training Inventory and about page, licensed career-schools directory, employment resources, August 2025 WIOA guidelines; U.S. Department of Labor's Apprenticeship Job Finder; and Texas electrical/plumbing licensing agencies. Neither the current availability of training seats nor a person's financial eligibility can be independently established from those public pages. Confirm current dates, fees and funding directly before applying.</p>
        <p className="mt-5 text-sm leading-7">For the bigger picture, read <Link to="/texas-jobs-without-four-year-degree" className="text-primary underline">Texas wages and routes into non-degree work</Link>, browse <Link to="/texas-industries" className="text-primary underline">the state's industries</Link>, and use the <Link to="/moving-to-texas" className="text-primary underline">moving-to-Texas guide</Link> if you are deciding where to train and work.</p>
      </Container>
    </section>
  </main>;
}
