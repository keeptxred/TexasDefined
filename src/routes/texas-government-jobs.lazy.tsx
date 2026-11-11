import type { ReactNode } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

export const Route = createLazyFileRoute("/texas-government-jobs")({ component: Page });

function Official({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{children}</a>;
}

const channels = [
  {
    channel: "Texas state agencies",
    where: "WorkInTexas and the agency's own career instructions; some use CAPPS",
    best: "Public administration, public health, licensing, highway work, inspectors, analysts, technical and support roles",
    key: "State application required for each posting. A modernized WorkInTexas flow does not cancel agency-specific questions or documents.",
    url: "https://www.twc.texas.gov/jobseekers/job-search",
    link: "TWC official state-job directions",
  },
  {
    channel: "Texas cities and other local governments",
    where: "Each city's or county's official HR site; the Texas Municipal League career center is a discovery aid",
    best: "Public works, parks, utilities, administration, planning, emergency dispatch and municipal services",
    key: "Municipal and county governments are not one statewide hiring system. Confirm the actual employer and submit through its stated channel.",
    url: "https://www.tml.org/9/City-Careers",
    link: "Texas Municipal League city careers",
  },
  {
    channel: "Federal jobs located in Texas",
    where: "USAJOBS, followed by the hiring agency's instructions when directed",
    best: "Federal agencies with Texas workplaces and positions open under your eligible hiring path",
    key: "Federal hiring eligibility, required documents, occupational grades and the federal application process differ from the State of Texas.",
    url: "https://www.usajobs.gov/",
    link: "Official USAJOBS portal",
  },
] as const;

const exampleAgencies = [
  { agency: "Texas Department of Insurance", channel: "CAPPS or WorkInTexas", detail: "The agency says WorkInTexas applicants should still sign in to its CAPPS agency career site to complete employment questions and review the submission. Incomplete month-and-year work history, duties, certifications or answers may lead to rejection.", url: "https://www.tdi.texas.gov/jobs/" },
  { agency: "Texas Water Development Board", channel: "CAPPS-centered application", detail: "Its agency guidance routes jobseekers to CAPPS, including creating a profile, while also allowing a WorkInTexas application for listed positions. Applicants with foreign degrees are directed to provide a credential evaluation.", url: "https://www.twdb.texas.gov/jobs/" },
  { agency: "Office of the Texas Governor", channel: "WorkInTexas", detail: "Its agency posting guidance directs applicants to send a distinct State of Texas application and résumé for each qualifying posting via WorkInTexas, and to look up the agency's job number.", url: "https://gov.texas.gov/employment" },
  { agency: "Texas Legislative Council", channel: "Separate agency application", detail: "This legislative employer states that its own employment application and requested documents may be submitted under its published instructions. It is a useful reminder not to impose one state's agency workflow on every public employer.", url: "https://tlc.texas.gov/employment" },
] as const;

const actions = [
  ["Identify which government employs the position", "For a state agency, start with TWC and the agency page. For a city, follow its HR portal. For federal work, use USAJOBS. Do not assume all public jobs use WorkInTexas."],
  ["Open the full requisition on the official employer site", "Record the posting number, actual job title, city or duty station, eligibility, status, closing date, pay range, required forms and how to apply."],
  ["Match your experience to the minimum qualifications", "Separate required conditions from preferred qualifications. List directly relevant employment dates and responsibilities rather than a vague summary of experience."],
  ["Finish the application rather than just uploading a résumé", "The state modernized WorkInTexas's initial submission in March 2026, but TWC still says state agencies require a State of Texas application for each opening, and agency-specific CAPPS questions may remain mandatory."],
  ["Check completion in the correct system", "Review the submitted state application, any required agency questionnaire, attachments, acknowledgement and status. An account created on one site is not evidence of a completed application on another."],
  ["Recheck before the closing date", "Open/hold statuses can change. An 'until filled' posting can close early. Keep the original job ID and any submission receipt in your personal records."],
] as const;

const salary = [
  { label: "Schedule A", definition: "Administrative support, maintenance, technical, paraprofessional and service job classes", advice: "A pathway worth checking when you don't hold a bachelor's degree; the actual posting still determines eligibility." },
  { label: "Schedule B", definition: "Mainly professional and managerial job classes", advice: "The classification describes job responsibilities and a compensation band, not a blanket degree rule." },
  { label: "Schedule C", definition: "Commissioned law-enforcement roles at designated state agencies", advice: "These are specialized positions; confirm licensing, commissioning and agency standards." },
] as const;

const mistakes = [
  { title: "Assuming a résumé alone completes the process", reason: "The March 2026 simplification reduced form friction. It did not make agency-required application details optional.", fix: "Open the agency's own 'How to apply' instructions and the submitted application details." },
  { title: "Reading a pay schedule as an offer", reason: "The State Auditor's ranges describe classification limits. Actual posted hiring ranges can be narrower, and monthly and annual figures are not interchangeable.", fix: "Use the specific posting, stated pay period and location as the hiring evidence." },
  { title: "Confusing a listing with an active opening", reason: "An agency listing may say 'Open', 'On Hold' or 'Veteran Hold'; a page last crawled weeks ago does not establish today's status.", fix: "Use the agency status and application deadline at the moment you apply." },
  { title: "Assuming government benefits are identical", reason: "State, municipal, university and federal benefits use different systems. ERS' state group insurance rules do not apply automatically to every government worker.", fix: "Verify the exact employer, appointment type, eligible hours, waiting period and dependent premiums." },
] as const;

function Page() {
  return <main>
    <section className="border-b border-border bg-surface">
      <Container className="py-14 sm:py-20">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground"><Link to="/">Home</Link><span className="mx-2">/</span><Link to="/moving-to-texas">Moving to Texas</Link><span className="mx-2">/</span><span aria-current="page">Government jobs</span></nav>
        <p className="eyebrow mt-9 text-primary">Texas careers · Sources reviewed November 10, 2026</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-tight sm:text-6xl">Applying for a Texas government job? Start with the right employer.</h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">A job at a Texas state agency, a city utility and a federal office can all be called “government jobs,” but they don't use the same applications, benefits or pay structures. This guide walks through those differences, explains the state's newer WorkInTexas application and shows what to verify before you hit Submit.</p>
        <p className="mt-5 max-w-4xl text-sm leading-7">We don't scrape a daily job feed or claim a position is still open. Our links lead to the employers and public agencies that actually control hiring. For other occupations, see <Link to="/texas-jobs-without-four-year-degree" className="text-primary underline">Texas work without a four-year degree</Link> and <Link to="/texas-career-training-options" className="text-primary underline">training and funding paths</Link>.</p>
      </Container>
    </section>

    <section className="border-b border-border py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Where to search</p>
        <h2 className="mt-3 font-display text-4xl">One phrase, three hiring systems</h2>
        <p className="mt-5 max-w-4xl text-base leading-8">The first decision is not which job board looks easiest. It's which government entity would appear on your paycheck. That determines the application, benefits and personnel rules. State universities and public school districts also have their own employment arrangements; follow those institutions' published HR instructions rather than assuming a state agency portal applies.</p>
        <div className="mt-8 overflow-x-auto border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="p-4 text-left text-sm text-muted-foreground">Official starting points, not a real-time inventory of open positions. Confirm each individual employer's current instructions.</caption>
            <thead className="border-b border-border bg-surface"><tr><th scope="col" className="p-4">Employer</th><th scope="col" className="p-4">Search / apply</th><th scope="col" className="p-4">Typical fields of work</th></tr></thead>
            <tbody>{channels.map(c=><tr key={c.channel} className="border-b border-border last:border-0"><th scope="row" className="p-4 font-semibold">{c.channel}<p className="mt-3 text-xs font-normal"><Official href={c.url}>{c.link}</Official></p></th><td className="p-4"><p>{c.where}</p><p className="mt-3 text-muted-foreground">{c.key}</p></td><td className="p-4">{c.best}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="mt-6 max-w-4xl text-base leading-8"><strong>Our practical distinction:</strong> a broad job search can help you discover a role, but only the hiring employer's instructions tell you where a complete application must be submitted. For example, the <Official href="https://www.tml.org/9/City-Careers">Texas Municipal League</Official> provides municipal job discovery; <Official href="https://www.usajobs.gov/">USAJOBS</Official> applies to federal positions, not state jobs.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-surface py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">Updated state process</p>
        <h2 className="mt-3 font-display text-4xl">What changed with WorkInTexas in 2026?</h2>
        <p className="mt-5 text-base leading-8">On March 10, 2026, the state announced a streamlined application for state employment through WorkInTexas: applicants can upload a résumé and answer a short questionnaire as part of the new submission process. The point is less repetition—not automatic acceptance, an offer of work or a waiver of what the employer asks for. <Official href="https://gov.texas.gov/news/post/governor-abbott-twc-launch-streamlined-state-of-texas-application">Read the state's announcement</Official>.</p>
        <p className="mt-5 text-base leading-8">The <Official href="https://www.twc.texas.gov/jobseekers/job-search">Texas Workforce Commission's current job-search guidance</Official> still says a State of Texas Application for Employment must be submitted for each state-agency job and that a résumé does not replace an application. This distinction is why an applicant should finish and review the state application, not treat the initial résumé upload as the final requirement for every agency.</p>
        <h3 className="mt-9 font-display text-3xl">Why an agency can still ask for more information</h3>
        <p className="mt-4 text-base leading-8">The State of Texas has no single universal post-upload experience. The Texas Department of Insurance explicitly tells WorkInTexas applicants to sign in to CAPPS as well to complete its employment questions. The Texas Water Development Board uses CAPPS for its job process, while the Governor's Office points directly to WorkInTexas. Follow the agency instructions for the actual requisition, even when a central portal makes the application look complete.</p>
        <div className="mt-7 space-y-5">{exampleAgencies.map(a=><article key={a.agency} className="border-t border-border pt-5"><h4 className="font-display text-2xl">{a.agency}</h4><p className="mt-2 text-sm font-semibold">{a.channel}</p><p className="mt-3 text-base leading-8">{a.detail} <Official href={a.url}>Verify the agency's instructions.</Official></p></article>)}</div>
      </Container>
    </section>

    <section className="border-b border-border py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">Application checklist</p>
        <h2 className="mt-3 font-display text-4xl">Six steps before you submit</h2>
        <ol className="mt-7 space-y-5">{actions.map(([title,detail],i)=><li key={title} className="border-t border-border pt-5"><h3 className="font-display text-2xl">{i+1}. {title}</h3><p className="mt-3 text-base leading-8">{detail}</p></li>)}</ol>
        <p className="mt-8 text-base leading-8">An agency may request transcripts, licensing records, a writing sample, a typing test or other proof. The <Official href="https://www.sos.texas.gov/about/jobs/index.shtml">Texas Secretary of State's application instructions</Official> are a concrete example: they describe clerical testing and writing samples for certain positions. Don't send more personal information than the employer requests, and avoid submitting credentials through an unrelated intermediary.</p>
      </Container>
    </section>

    <section className="border-b border-border bg-surface py-12 sm:py-16">
      <Container>
        <p className="eyebrow text-primary">Pay and qualifications</p>
        <h2 className="mt-3 font-display text-4xl">How to read Texas state salary groups</h2>
        <p className="mt-5 max-w-4xl text-base leading-8">The <Official href="https://hr.sao.texas.gov/CompensationSystem/SalarySchedules">Texas State Auditor's Office</Official> publishes the current 2026–2027 state classification salary schedules. The three schedules define pay bands for classified state positions; they are not a promise of salary for every applicant or a substitute for the actual employer posting.</p>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">{salary.map(s=><article key={s.label} className="border-t border-border pt-5"><h3 className="font-display text-3xl">{s.label}</h3><p className="mt-3 text-sm leading-7 font-semibold">{s.definition}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{s.advice}</p></article>)}</div>
        <h3 className="mt-10 font-display text-3xl">A realistic reading example</h3>
        <p className="mt-4 max-w-4xl text-base leading-8">Suppose a state posting names a classification, a salary group and a <strong>monthly</strong> hiring range. The published schedule tells you the statutory pay band for that class; the job posting tells you what that employer is advertising. To compare it with an annual salary, multiply the monthly figure by 12, before taxes and deductions. Then check hours, work site, overtime eligibility, retirement contributions, insurance premiums and commute cost. You should <strong>not</strong> assume that the schedule maximum is the amount a new employee will earn.</p>
        <p className="mt-5 max-w-4xl text-base leading-8">No bachelor's degree? Don't rule out state service from a job-category label alone. Schedule A includes administrative and technical work, but <strong>the specific requisition</strong> determines minimum education, substitution rules, experience, licenses and whether equivalent experience counts. The <Official href="https://hr.sao.texas.gov/CompensationSystem/">State Auditor's classification explanation</Official> is for comparing job series, not deciding eligibility. Use our <Link to="/texas-jobs-without-four-year-degree" className="text-primary underline">Texas career comparison</Link> for non-degree entry paths.</p>
        <p className="mt-5 max-w-4xl text-base leading-8">For a potential move, compare your actual hiring range with the <Link to="/texas-salary-comparison-by-city" className="text-primary underline">Texas city salary comparison</Link> and <Link to="/texas-cost-of-living-calculator" className="text-primary underline">household cost-of-living tool</Link>, rather than concluding that a higher nominal state salary means more purchasing power.</p>
      </Container>
    </section>

    <section className="border-b border-border py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">Total compensation</p>
        <h2 className="mt-3 font-display text-4xl">Benefits matter, but first confirm who's eligible</h2>
        <p className="mt-5 text-base leading-8">For eligible state-agency employees, the <Official href="https://www.ers.texas.gov/Active-Employees/Health-Benefits">Employees Retirement System of Texas</Official> says the state currently pays the full monthly health-plan premium for eligible full-time employees and half the premium for their eligible dependents. Eligible part-time employees receive a lower state contribution. This is not a statement that every municipal, university, contracted, temporary or federal role receives those benefits.</p>
        <p className="mt-5 text-base leading-8">ERS' <Official href="https://ers.texas.gov/new-employee">new-employee guidance</Official> explains that many new workers have a health coverage waiting period, normally tied to the first day of the month after the 60th day of employment for eligible full-time hires; optional-benefit and dependent-enrollment deadlines can be earlier. Ask HR for the plan year and your exact hire-date timetable before comparing job offers. Eligibility and contribution rates are subject to change with state funding.</p>
        <p className="mt-5 text-base leading-8">Before accepting, compare the actual job's pension or retirement participation, your payroll contributions, leave policies, insurance deductions, hours and working conditions. Local government pension programs and federal retirement are different systems. ERS' <Official href="https://ers.texas.gov/new-employee/insurance-eligibility">Group Benefits Program eligibility guidance</Official> explains exceptions for some higher education systems.</p>
        <h3 className="mt-9 font-display text-3xl">What about military employment preference?</h3>
        <p className="mt-4 text-base leading-8">Qualifying applicants may have military employment preferences under Texas law. The <Official href="https://www.tdi.texas.gov/jobs/apply.html">Texas Department of Insurance's official instructions</Official> discuss the preference, required documentation and agency process. A preference does not erase the advertised minimum qualifications or guarantee an interview or offer in every circumstance; check the posting and agency HR instructions for your eligibility. Federal jobs on USAJOBS use separate federal eligibility and preference rules.</p>
      </Container>
    </section>

    <section className="border-b border-border py-12 sm:py-16">
      <Container className="max-w-5xl">
        <p className="eyebrow text-primary">Four common mistakes</p><h2 className="mt-3 font-display text-4xl">Don't lose an opportunity over a process misunderstanding</h2>
        <div className="mt-8 space-y-5">{mistakes.map(m=><article key={m.title} className="border-t border-border pt-5"><h3 className="font-display text-2xl">{m.title}</h3><p className="mt-3 text-base leading-8">{m.reason}</p><p className="mt-3 text-sm leading-7 text-muted-foreground"><strong>Better step:</strong> {m.fix}</p></article>)}</div>
      </Container>
    </section>

    <section className="py-12 sm:py-16">
      <Container className="max-w-5xl">
        <h2 className="font-display text-3xl">Sources, methodology and limits</h2>
        <p className="mt-4 text-sm leading-7">Last editorial source review: November 10, 2026. Primary sources: Texas Workforce Commission state employment directions; the March 10, 2026 statewide application announcement; agency-specific career and application instructions from TDI, TWDB, the Governor's Office, Secretary of State and Legislative Council; the State Auditor's FY2026–2027 job classification and salary schedules; Employees Retirement System health and new-hire guidance; Texas Municipal League's city careers portal; and USAJOBS. Links throughout lead to the originating organizations.</p>
        <p className="mt-4 text-sm leading-7">This guide is an independent explanation and comparison of application systems. It is not affiliated with or endorsed by an agency and does not collect job applications. We have not checked current vacancies at every agency, counted open jobs, estimated your likelihood of hiring, or represented the salary schedule as a live offer. Application rules, benefit rates, vacancy status and agency websites can change; verify each vacancy with the employer before applying.</p>
        <p className="mt-5 text-sm leading-7">Further research: <Link to="/texas-industries" className="text-primary underline">the Texas industries directory</Link>, <Link to="/texas-career-training-options" className="text-primary underline">career training routes</Link>, <Link to="/texas-cities-nature-jobs" className="text-primary underline">jobs and outdoor access by metro</Link>, and the <Link to="/moving-to-texas" className="text-primary underline">moving to Texas hub</Link>.</p>
      </Container>
    </section>
  </main>;
}
