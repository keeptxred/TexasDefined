import { createLazyFileRoute, Link } from '@tanstack/react-router';

import { Container } from '@/components/layout/Container';
import {
  UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE,
  uilFootballConferenceBand,
  uilFootballEnrollmentBand,
} from '@/data/high-school-football/enrollment-bands';

const UIL_ELIGIBILITY_URL = 'https://www.uiltexas.org/policy/eligibility';
const UIL_DETAILED_ELIGIBILITY_URL = 'https://www.uiltexas.org/policy/constitution/general/eligibility';
const UIL_EXACT_ENROLLMENT_URL = 'https://www.uiltexas.org/files/alignments/Alpha_26-28.pdf';

export const Route = createLazyFileRoute('/texas-high-school-football-teams/$slug')({ component: Page });

function Page() {
  const {
    displayName,
    program,
    identity,
    enrollmentLink,
    districtPeers,
    districtPath,
    venueLinks,
    privateAlignment,
    privateAdmissions,
    governingBodyHint,
    associationClassification,
    associationSourceUrl,
  } = Route.useLoaderData();
  const schoolName = program?.officialSchoolName || displayName;
  const countyPath = program?.countyName ? `/county/${countySlug(program.countyName)}` : null;
  const associationLabel = program
    ? 'UIL'
    : privateAlignment?.association ?? governingBodyHint ?? 'Association not yet verified';
  const enrollmentBand = program
    ? uilFootballEnrollmentBand(program.classification, program.division)
    : null;
  const conferenceBand = program
    ? uilFootballConferenceBand(program.classification)
    : null;

  return <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
    <article className="mx-auto max-w-6xl">
      <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <Link to="/">Front page</Link><span className="mx-2">/</span>
        <Link to="/sports">Texas Sports</Link><span className="mx-2">/</span>
        <a href="/texas-high-school-football-teams">High school football teams</a><span className="mx-2">/</span>
        <span aria-current="page">{displayName}</span>
      </nav>

      <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
        <div>
          <p className="eyebrow text-primary">Texas high school football school profile</p>
          <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{displayName}</h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
            A school-and-football research page connecting current competition placement with school and county context, enrollment steps, school identity and sourced championship history where available.
          </p>
        </div>
        <dl className="border-y border-border py-3 text-sm lg:border-y-0 lg:border-l lg:pl-6">
          <Fact label="Governing body" value={associationLabel} />
          {program && <Fact label="Current alignment" value={alignmentLabel(program)} />}
          {!program && privateAlignment && <Fact label="Current alignment" value={privateAlignmentLabel(privateAlignment)} />}
          {program && <Fact label="Football district" value={String(program.district)} />}
          {!program && privateAlignment?.districtLabel && <Fact label="Football district" value={privateAlignment.districtLabel} />}
          <Fact label="Format" value={program?.footballType || privateAlignment?.footballType} />
        </dl>
      </header>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">School snapshot</p>
          <h2 className="mt-2 font-display text-3xl">Where this program fits</h2>
        </div>
        <div>
          {program ? <>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              <Snapshot label="School" value={schoolName} />
              <Snapshot label="ISD / district" value={program.districtName || 'TEA directory match pending'} />
              <Snapshot label="Location" value={[program.city, program.countyName].filter(Boolean).join(' · ') || 'Texas'} />
              <Snapshot label="UIL classification" value={program.classification} />
              <Snapshot label="Football division" value={program.division ? `Division ${program.division === 1 ? 'I' : 'II'}` : 'Not pre-split in alignment'} />
              <Snapshot label="UIL reported enrollment" value={program.uilEnrollment ? program.uilEnrollment.toLocaleString('en-US') : 'Exact UIL enrollment pending'} />
              <Snapshot label="UIL enrollment band" value={enrollmentBand?.label || conferenceBand || 'See current UIL cutoff table'} />
              <Snapshot label="UIL district" value={String(program.district)} />
            </dl>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              TexasDefined orders the statewide directory from 6A through 1A because UIL classifications reflect enrollment size. For the 2026–28 cycle, this program’s final football classification{program.division ? ' and football division' : ''} corresponds to an enrollment band of <strong className="text-foreground">{enrollmentBand?.label || conferenceBand}</strong>{program.uilEnrollment ? <> and UIL reports an enrollment of <strong className="text-foreground">{program.uilEnrollment.toLocaleString('en-US')}</strong></> : null}. That ordering is not a claim that a larger-classification football program is better than a smaller-classification program. District assignments and enrollment cutoffs can change at realignment.
            </p>
            {program.uilSubmittedConference && program.uilSubmittedConference !== program.classification && <p className="mt-2 text-xs leading-6 text-muted-foreground">UIL’s alphabetical enrollment listing records a submitted conference of {program.uilSubmittedConference}; TexasDefined uses the final 2026–28 football alignment ({program.classification}) for competition placement.</p>}
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={UIL_EXACT_ENROLLMENT_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official UIL alphabetical enrollment listing ↗</a>
              <a href={UIL_FOOTBALL_ENROLLMENT_BANDS_SOURCE.url} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official UIL 2026–28 enrollment cutoffs ↗</a>
            </div>
            {(program.teaSchoolProfileUrl || program.teaDistrictProfileUrl || program.schoolWebsite || program.districtWebsite) && <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Official school research</p>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-muted-foreground">Use Texas Education Agency and school-system sources for the current campus profile, district context and official contact information. AskTED is the source used to match this football program to the school and district records below.</p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                {program.teaSchoolProfileUrl && <a href={program.teaSchoolProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA school profile ↗</a>}
                {program.teaDistrictProfileUrl && <a href={program.teaDistrictProfileUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">TEA district profile ↗</a>}
                {program.schoolWebsite && <a href={program.schoolWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official school website ↗</a>}
                {program.districtWebsite && <a href={program.districtWebsite} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official district website ↗</a>}
              </div>
            </div>}
          </> : privateAlignment ? <div>
            <dl className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              <Snapshot label="Association" value={privateAlignment.association} />
              <Snapshot label="Football division" value={privateAlignment.divisionLabel} />
              <Snapshot label="Football district" value={privateAlignment.districtLabel || 'No district label in source'} />
              <Snapshot label="Format" value={privateAlignment.footballType || 'Not specified by source'} />
              <Snapshot label="Season / cycle" value={privateAlignment.seasonLabel} />
              <Snapshot label="Source type" value={privateAlignment.sourceKind === 'official-association' ? 'Official association' : 'Current secondary source'} />
            </dl>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              Private-school football uses its association’s own alignment system. TAPPS divisions, SPC classes and TAIAO divisions are not equivalent to UIL 1A–6A classifications.
            </p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">Alignment checked {privateAlignment.verifiedAt}. {privateAlignment.sourceKind === 'official-association' ? 'This placement comes from the governing association.' : 'This placement is current but uses a secondary football source because the association’s embedded alignment is not directly machine-readable here.'}</p>
            <a href={privateAlignment.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{privateAlignment.sourceLabel} ↗</a>
          </div> : <>
            <div className="border-y border-border py-5">
              <p className="font-display text-2xl">{governingBodyHint ? [governingBodyHint, associationClassification].filter(Boolean).join(' ') : 'Association placement not yet verified'}</p>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                This supplied school did not resolve to the current UIL football alignment. TexasDefined does not force private or non-UIL programs into a UIL classification. Association placement is shown only when it has been separately sourced.
              </p>
              {associationSourceUrl && <a href={associationSourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Official association football source ↗</a>}
            </div>
          </>}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            {countyPath && <a href={countyPath} className="text-primary">Open {program?.countyName} guide →</a>}
            {program && <a href="/find-my-school-district" className="text-primary">Verify a school district by address →</a>}
            {program?.sourceUrl && <a href={program.sourceUrl} target="_blank" rel="noreferrer noopener" className="text-primary">Official UIL alignment ↗</a>}
          </div>
        </div>
      </section>

      {program && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Current district</p>
          <h2 className="mt-2 font-display text-3xl">{alignmentLabel(program)} · District {program.district}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">These are the other schools in the same 2026–28 UIL football district. Every opponent links to the same school-profile system.</p>
          {districtPath && <a href={districtPath} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">Open full district guide →</a>}
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {districtPeers.map((peer) => <a key={peer.profilePath} href={peer.profilePath} className="group bg-background p-5 hover:bg-surface">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">{alignmentLabel(peer)} · District {peer.district}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight group-hover:text-primary">{peer.schoolName}</h3>
            <p className="mt-2 text-xs text-muted-foreground">{peer.footballType} · Open profile →</p>
          </a>)}
        </div>
      </section>}

      {program && venueLinks.length > 0 && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Game venue</p>
          <h2 className="mt-2 font-display text-3xl">Verified football venue relationships</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Texas high schools often share district stadiums. A venue listed here is a sourced school or district football relationship, not a promise that every home game is played there. Confirm the current schedule before travel.</p>
        </div>
        <div className="space-y-5">
          {venueLinks.map((venue) => <article key={venue.venueSlug} className="border-t-2 border-foreground pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{venue.relationshipLabel}</p>
            <h3 className="mt-2 font-display text-3xl"><a href={venue.venuePath} className="hover:text-primary">{venue.venueName}</a></h3>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{venue.note}</p>
            <dl className="mt-5 grid gap-px border border-border bg-border sm:grid-cols-2">
              {venue.city && <Snapshot label="City" value={venue.city} />}
              {venue.capacity && <Snapshot label="Capacity" value={venue.capacity} />}
            </dl>
            {venue.parking && <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Parking:</strong> {venue.parking}</p>}
            {venue.arrival && <p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Arrival:</strong> {venue.arrival}</p>}
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              <a href={venue.venuePath} className="text-primary underline underline-offset-4">Open TexasDefined stadium guide →</a>
              <a href={venue.officialUrl} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">Official venue source ↗</a>
            </div>
            {venue.verifiedAt && <p className="mt-3 text-xs text-muted-foreground">Venue planning details reviewed {venue.verifiedAt}.</p>}
          </article>)}
        </div>
      </section>}

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">How to enroll</p>
          <h2 className="mt-2 font-display text-3xl">How to enroll at {schoolName}</h2>
        </div>
        <div>
          {program ? <PublicEnrollmentSteps schoolName={schoolName} districtName={program.districtName} enrollmentLink={enrollmentLink} /> : <NonUilEnrollmentSteps schoolName={schoolName} association={privateAlignment?.association ?? governingBodyHint} admissions={privateAdmissions} />}
          <div className="mt-6 border border-border p-5 text-sm leading-7 text-muted-foreground">
            <strong className="text-foreground">Football eligibility is a separate question from school admission.</strong> Being admitted, moving into a district or receiving a transfer does not by itself establish varsity eligibility. Confirm the student's facts directly with the school and the governing athletic association before relying on a move or transfer for football.
            {program && <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
              <a href={UIL_ELIGIBILITY_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL eligibility standards ↗</a>
              <a href={UIL_DETAILED_ELIGIBILITY_URL} target="_blank" rel="noreferrer noopener" className="text-primary underline underline-offset-4">UIL detailed eligibility rules ↗</a>
            </div>}
          </div>
        </div>
      </section>

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Mascot & identity</p>
          <h2 className="mt-2 font-display text-3xl">School identity</h2>
        </div>
        {identity ? <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-2">
            <Snapshot label="Mascot" value={identity.mascot} />
            <Snapshot label="School colors" value={identity.colors || 'Not yet sourced'} />
          </dl>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">Identity checked {identity.verifiedAt}. Mascot and colors are published only from a school or district source.</p>
          <a href={identity.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block text-sm font-semibold text-primary underline underline-offset-4">{identity.sourceLabel} ↗</a>
        </div> : <div className="border-y border-border py-5">
          <p className="font-display text-2xl">Mascot verification pending</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">Every UIL school profile has the same mascot field, but it stays blank until the school or district identity can be tied to a source. We do not fill school identity fields from an unsourced guess.</p>
        </div>}
      </section>

      {program?.allTimeHistory && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Program history</p>
          <h2 className="mt-2 font-display text-3xl">All-time UIL state-final record</h2>
        </div>
        <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <Snapshot label="All-time state titles" value={String(program.allTimeHistory.stateTitles)} />
            <Snapshot label="All-time state finals" value={String(program.allTimeHistory.stateFinalAppearances)} />
            <Snapshot label="UIL table through" value={String(program.allTimeHistory.publishedThroughYear)} />
          </dl>
          {program.allTimeHistory.appearanceYears && <p className="mt-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">State-final appearance years:</strong> {program.allTimeHistory.appearanceYears}</p>}
          {program.allTimeHistory.supplementedFinals.length > 0 && <p className="mt-3 text-xs leading-6 text-muted-foreground">TexasDefined supplements UIL’s published all-time table with {program.allTimeHistory.supplementedFinals.length} newer completed {program.allTimeHistory.supplementedFinals.length === 1 ? 'state final' : 'state finals'} from the official UIL state archive.</p>}
          <a href={program.allTimeHistory.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">UIL all-time appearances ↗</a>
        </div>
      </section>}

      {program?.recentHistory && <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Recent championship context</p>
          <h2 className="mt-2 font-display text-3xl">UIL state-final history</h2>
        </div>
        <div>
          <dl className="grid gap-px border border-border bg-border sm:grid-cols-3">
            <Snapshot label="Titles, 2018–19 to 2025–26" value={String(program.recentHistory.stateTitles)} />
            <Snapshot label="State finals" value={String(program.recentHistory.stateFinalAppearances)} />
            <Snapshot label="Most recent final" value={program.recentHistory.mostRecentFinalSeason || '—'} />
          </dl>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {program.recentHistory.finals.map((final) => <div key={`${final.season}-${final.conference}-${final.result}`} className="grid gap-1 py-4 text-sm sm:grid-cols-3">
              <span className="font-semibold">{final.season}</span>
              <span>{final.result}</span>
              <span className="text-muted-foreground">{final.conference} · vs. {final.opponent} · {final.score}</span>
            </div>)}
          </div>
          <a href={program.recentHistory.sourceUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">UIL state archives ↗</a>
        </div>
      </section>}

      <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Research beyond the score</p>
          <h2 className="mt-2 font-display text-3xl">What families should check next</h2>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-2">
          <ResearchCard title="Freshman, JV and varsity path" body="Look beyond the varsity record. Ask how many teams the program fields, roster sizes, how younger players develop and whether position depth creates a realistic path to playing time." />
          <ResearchCard title="Coaching continuity" body="Check the current head coach and staff, how long the core staff has been in place and whether program systems remain stable across freshman, JV and varsity." />
          <ResearchCard title="Schedule and district travel" body="The current district or association grouping tells you the competitive neighborhood. Review opponents, travel distance, rivalry games and the current schedule rather than relying on an old classification." />
          <ResearchCard title="Academics and daily fit" body="Football is one piece of a four-year school experience. Compare academics, programs, commute, campus culture and student support alongside the football program." />
          <ResearchCard title="Facilities and stadium" body="Some teams play on campus and others use shared district stadiums. Confirm practice facilities, game venue, parking and game-night logistics." />
          <ResearchCard title="Transfers and eligibility" body="Ask the school about enrollment and transfer rules, then separately verify the athletic eligibility consequences with the governing association." />
        </div>
      </section>

      <section className="py-10">
        <p className="eyebrow text-primary">Keep researching</p>
        <h2 className="mt-2 font-display text-3xl">Put {displayName} in the statewide football picture</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Related href="/texas-high-school-football-teams" title="All 1,268 UIL programs" body="Browse every current UIL football school, ordered from 6A through 1A, or search by school, ISD, city or county." />
          <Related href="/article/texas-high-school-football-classifications-1a-6a" title="How 1A through 6A work" body="Understand enrollment classifications, divisions, districts and realignment." />
          <Related href="/article/texas-high-school-football-playoffs-explained" title="How the playoffs work" body="Follow district qualification, bi-district and the state bracket." />
          {(program?.footballType === '6-Man' || privateAlignment?.footballType === '6-Man') && <Related href="/article/texas-six-man-football-rules-explained" title="Six-man football rules" body="Understand the field, first-down distance, exchange rule, scoring and mercy rule." />}
          <Related href="/sports-venues/high-school-football" title="Texas football stadiums" body="Browse venue guides and game-day planning information." />
          <Related href="/sports/friday-night-lights" title="Friday Night Lights, Defined" body="Explore the wider culture, traditions and season around Texas high school football." />
        </div>
        <p className="mt-8 max-w-4xl text-xs leading-6 text-muted-foreground">
          All current UIL football programs use the same profile system. Historical alias metadata may help resolve alternate school names behind the scenes, but it does not control whether a school receives a page, its directory position or its research priority.
        </p>
      </section>
    </article>
  </Container>;
}

function PublicEnrollmentSteps({
  schoolName,
  districtName,
  enrollmentLink,
}: {
  schoolName: string;
  districtName?: string;
  enrollmentLink?: {
    enrollmentUrl: string;
    sourceLabel: string;
    verifiedAt: string;
    schoolYear?: string;
  } | null;
}) {
  const district = districtName || 'the school district';
  const steps = [
    ['Verify the exact address', `Use an official district boundary or campus-assignment tool to confirm that the residence is served by ${schoolName}. A city name or ZIP code is not enough.`],
    ['Start district registration', `Use ${district}'s official new-student registration process. Expect proof of residence, parent or guardian identification, student identity records, immunization records and prior school records as applicable.`],
    ['Confirm the campus assignment', 'Before signing a lease or closing on a home because of a particular school, get the campus assignment confirmed by the district and ask whether boundary changes are pending.'],
    ['Ask about transfers separately', 'If the address is outside the attendance zone, review the district’s current transfer or open-enrollment policy. Approval rules, capacity limits and renewal terms can change.'],
    ['Verify athletic eligibility', 'After enrollment is settled, ask the school athletic office how UIL residency, transfer and previous-athletic-participation rules apply to this student’s specific situation.'],
  ];
  return <>
    {enrollmentLink && <div className="mb-6 border border-border p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Official district enrollment</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        TexasDefined verified this district enrollment source on {enrollmentLink.verifiedAt}{enrollmentLink.schoolYear ? ` for the ${enrollmentLink.schoolYear} school year` : ''}. Use the district page for current forms, deadlines and required documents.
      </p>
      <a href={enrollmentLink.enrollmentUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
        Start with {enrollmentLink.sourceLabel} ↗
      </a>
    </div>}
    <StepList steps={steps} />
  </>;
}

function NonUilEnrollmentSteps({
  schoolName,
  association,
  admissions,
}: {
  schoolName: string;
  association?: string;
  admissions?: {
    admissionsUrl: string;
    sourceLabel: string;
    verifiedAt: string;
    applicationCycle?: string;
  } | null;
}) {
  const steps = [
    ['Use the school’s admissions office', `Start with ${schoolName}'s official admissions process rather than a public-school attendance-zone lookup.`],
    ['Check application requirements', 'Confirm application dates, transcripts or records, recommendations, testing or interviews, grade-level availability and any tuition or financial-aid requirements.'],
    ['Ask about admission timing', 'Private-school admission can depend on available seats and deadlines, so verify the intended entry year directly with the school.'],
    ['Confirm the football program', `Verify that the school is fielding football in the intended season and confirm its current ${association ?? 'athletic association'} placement and schedule.`],
    ['Verify athletic eligibility separately', 'Admission does not automatically establish athletic eligibility. Ask the school how transfer, age, residence, prior participation and association rules apply to the student.'],
  ];
  return <>
    {admissions && <div className="mb-6 border border-border p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">Official school admissions</p>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">
        TexasDefined verified this school admissions source on {admissions.verifiedAt}{admissions.applicationCycle ? ` for the ${admissions.applicationCycle} application cycle` : ''}. Use the school page for current application dates, requirements, availability and fees.
      </p>
      <a href={admissions.admissionsUrl} target="_blank" rel="noreferrer noopener" className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
        Start with {admissions.sourceLabel} ↗
      </a>
    </div>}
    <StepList steps={steps} />
  </>;
}

function StepList({ steps }: { steps: Array<[string, string]> }) {
  return <ol className="divide-y divide-border border-y border-border">
    {steps.map(([title, body], index) => <li key={title} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]">
      <span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span>
      <div><h3 className="font-display text-xl">{title}</h3><p className="mt-1 text-sm leading-7 text-muted-foreground">{body}</p></div>
    </li>)}
  </ol>;
}

function Fact({ label, value }: { label: string; value?: string }) {
  return value ? <div className="border-b border-border py-3 last:border-b-0 lg:first:pt-0"><dt className="text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt><dd className="mt-1 font-medium">{value}</dd></div> : null;
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return <div className="bg-background p-5"><dt className="text-xs uppercase tracking-[0.1em] text-muted-foreground">{label}</dt><dd className="mt-2 font-semibold">{value}</dd></div>;
}

function ResearchCard({ title, body }: { title: string; body: string }) {
  return <article className="bg-background p-6"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></article>;
}

function Related({ href, title, body }: { href: string; title: string; body: string }) {
  return <a href={href} className="border-t-2 border-foreground pt-4"><h3 className="font-display text-2xl hover:text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p></a>;
}

function alignmentLabel(program: { classification: string; division: 1 | 2 | null }) {
  return program.division ? `${program.classification} Division ${program.division === 1 ? 'I' : 'II'}` : program.classification;
}

function privateAlignmentLabel(alignment: { association: string; divisionLabel: string; districtLabel?: string }) {
  return `${alignment.association} ${alignment.divisionLabel}${alignment.districtLabel ? ` · ${alignment.districtLabel}` : ''}`;
}

function countySlug(value: string) {
  return value
    .replace(/\s+County$/i, '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
