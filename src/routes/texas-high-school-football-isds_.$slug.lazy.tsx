import { createLazyFileRoute } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';

const TEA_DISTRICT_LOCATOR = 'https://tea2.tea.texas.gov/families-and-students/school-district-locator/school-district-locator';
const UIL_ELIGIBILITY = 'https://www.uiltexas.org/policy/eligibility';

export const Route = createLazyFileRoute('/texas-high-school-football-isds/$slug')({ component: Page });

function Page() {
  const district = Route.useLoaderData();

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football</a><span className="mx-2">/</span>
        <a href="/texas-high-school-football-isds">ISDs</a><span className="mx-2">/</span>
        <span aria-current="page">{district.districtName}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="eyebrow text-primary">Texas football by school district</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{district.districtName} football programs</h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">
            Current UIL football schools matched to {district.districtName} through Texas Education Agency AskTED, with classification, exact UIL enrollment and school-profile links for relocation research.
          </p>
        </div>
        <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6">
          <Fact label="Current UIL programs" value={String(district.programCount)} />
          <Fact label="Highest current class" value={district.highestClassification} />
          <Fact label="Cities represented" value={String(district.cities.length)} />
          <Fact label="Counties represented" value={String(district.countyNames.length)} />
        </dl>
      </header>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Current programs</p>
          <h2 className="mt-2 font-display text-3xl">Every matched UIL football school in {district.districtName}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Programs are ordered by UIL enrollment classification—6A first through 1A—with Division I before Division II where the classification is split. This is a size hierarchy, not a quality ranking.
          </p>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {district.programs.map((program) => <article key={program.profilePath} className="bg-background p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              {program.classification}
              {program.division ? ' · Division ' + (program.division === 1 ? 'I' : 'II') : ''}
              {' · UIL District ' + program.district}
            </p>
            <h3 className="mt-2 font-display text-2xl leading-tight">{program.officialSchoolName || program.schoolName}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{[program.city, program.countyName].filter(Boolean).join(' · ') || 'Texas'}</p>
            <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
              <div><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">UIL enrollment</dt><dd className="mt-1 font-semibold">{program.uilEnrollment ? program.uilEnrollment.toLocaleString('en-US') : 'Pending'}</dd></div>
              <div><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">Format</dt><dd className="mt-1 font-semibold">{program.footballType}</dd></div>
            </dl>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold">
              <a href={program.profilePath} className="text-primary underline underline-offset-4">Open school football profile →</a>
              {program.teaSchoolProfileUrl && <a href={program.teaSchoolProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA school profile ↗</a>}
              {program.schoolWebsite && <a href={program.schoolWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">School website ↗</a>}
            </div>
          </article>)}
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Enrollment research</p>
          <h2 className="mt-2 font-display text-3xl">Verify the district, campus and football eligibility separately</h2>
        </div>
        <div>
          <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
            Living inside {district.districtName} does not mean every address is assigned to every high school shown above. Attendance zones, transfers, capacity rules and campus boundaries can change. Verify the exact street address with the district before choosing a home around a particular school.
          </p>
          <ol className="mt-6 divide-y divide-border border-y border-border">
            <Step number="01" title="Confirm the exact address">Use the district or TEA locator to confirm the ISD and assigned high-school campus for the property—not the city name, ZIP code or real-estate listing.</Step>
            <Step number="02" title="Check current enrollment requirements">Review the district’s current new-student registration process, proof-of-residency rules, records requirements and enrollment dates.</Step>
            <Step number="03" title="Ask about transfers and boundary changes">If the preferred school is not the assigned campus, verify current transfer policy, capacity limits and any planned rezoning directly with the district.</Step>
            <Step number="04" title="Verify athletic eligibility">If football is influencing a move or transfer, ask the school administrator how UIL residence, transfer, previous-athletic-participation and athletic-purpose rules apply to the student before assuming varsity eligibility.</Step>
          </ol>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {district.enrollmentLink && <a href={district.enrollmentLink.enrollmentUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{district.enrollmentLink.sourceLabel} ↗</a>}
            {district.districtWebsite && <a href={district.districtWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">{district.districtName} website ↗</a>}
            {district.teaDistrictProfileUrl && <a href={district.teaDistrictProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA district profile ↗</a>}
            <a href={TEA_DISTRICT_LOCATOR} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA district locator ↗</a>
            <a href={UIL_ELIGIBILITY} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL eligibility standards ↗</a>
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Geographic context</p>
          <h2 className="mt-2 font-display text-3xl">Where these programs are located</h2>
        </div>
        <div>
          {district.cities.length > 0 && <p className="text-sm leading-7"><strong>Cities in matched school records:</strong> {district.cities.join(', ')}</p>}
          {district.countyNames.length > 0 && <p className="mt-3 text-sm leading-7"><strong>Counties in matched school records:</strong> {district.countyNames.join(', ')}</p>}
          <p className="mt-4 text-xs leading-6 text-muted-foreground">These place labels come from TEA school-directory records. They do not replace attendance-zone maps and should not be used to infer that every address in a city or county belongs to this ISD.</p>
        </div>
      </section>

      <section className="grid gap-8 py-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Keep researching</p><h2 className="mt-2 font-display text-3xl">Compare the district with the statewide football picture</h2></div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Related href="/find-my-school-district" title="Verify an address and school district" body="Start with the exact property address before comparing football programs." />
          <Related href="/texas-high-school-football-teams" title="Browse all 1,268 UIL programs" body="Compare schools statewide by classification, enrollment, district and sourced football history." />
          <Related href="/texas-high-school-football-districts" title="Browse UIL competition districts" body="Do not confuse the school district/ISD with the UIL football competition district." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="Understand 1A through 6A" body="See how enrollment size, divisions and biennial realignment work." />
        </div>
      </section>
    </article>
  </Container>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0 lg:last:pb-0">
    <dt className="text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</dt>
    <dd className="mt-1 font-medium">{value}</dd>
  </div>;
}

function Step({ number, title, children }: { number: string; title: string; children: string }) {
  return <li className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
    <span className="font-display text-3xl text-primary">{number}</span>
    <div><h3 className="font-display text-xl">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{children}</p></div>
  </li>;
}

function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4">
    <h3 className="font-display text-2xl hover:text-primary">{title}</h3>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
  </a>;
}
