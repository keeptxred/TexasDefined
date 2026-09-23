import { Link } from "@tanstack/react-router";

import { topAttractionTimeline } from "@/data/destination-timelines-top-attractions";
import type { Destination } from "@/data/types";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";

function checkedDate(value?: string) {
  if (!value) return "Not yet recorded";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function DestinationAuthorityGuide({ destination }: { destination: Destination }) {
  const authority = destination.authorityGuide;
  if (!authority) return null;

  const timeline = topAttractionTimeline(destination.slug);
  const nearby = destination.areaGuide?.nearbyAttractions[0];
  const sideTrip = destination.areaGuide?.sideTrips[0];
  const questions = [
    { q: `How long should I allow for ${destination.name}?`, a: authority.assessment.recommendedVisit },
    ...(destination.accessibilityNotes ? [{ q: `What should I know about accessibility?`, a: destination.accessibilityNotes }] : []),
    ...(nearby ? [{ q: `What should I pair with ${destination.name}?`, a: `${nearby.name}${nearby.proximity ? ` (${nearby.proximity})` : ""}: ${nearby.description}` }] : []),
    ...(sideTrip ? [{ q: `What is a worthwhile side trip?`, a: `${sideTrip.name}${sideTrip.proximity ? ` (${sideTrip.proximity})` : ""}: ${sideTrip.description}` }] : []),
  ].slice(0, 6);

  return <>
    <Section tone="surface">
      <Container>
        <section className="max-w-4xl border-y border-border py-7" aria-labelledby={`${destination.slug}-editorial-assessment`}>
          <p className="eyebrow text-primary">On the ground</p>
          <h2 id={`${destination.slug}-editorial-assessment`} className="mt-2 font-display text-3xl">What the day is like</h2>
          <dl className="mt-6 divide-y divide-border text-sm">
            <div className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">Walking & exertion</dt><dd className="text-right font-medium">{authority.assessment.physicalEffort}</dd></div>
            <div className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">Time outdoors</dt><dd className="text-right font-medium">{authority.assessment.weatherExposure}</dd></div>
            <div className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">Plan ahead</dt><dd className="text-right font-medium">{authority.assessment.planningLevel}</dd></div>
            <div className="py-3"><dt className="text-muted-foreground">Families</dt><dd className="mt-1 leading-6">{authority.assessment.familyFit}</dd></div>
            <div className="py-3"><dt className="text-muted-foreground">Good for first-time visitors</dt><dd className="mt-1 leading-6">{authority.assessment.firstTimeValue}</dd></div>
          </dl>
        </section>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <section aria-labelledby={`${destination.slug}-texas-significance`}>
            <p className="eyebrow text-primary">Texas context</p>
            <h2 id={`${destination.slug}-texas-significance`} className="mt-2 font-display text-4xl">Why {destination.name} matters</h2>
            <p className="mt-6 text-base leading-8 text-foreground/90">{authority.whyItMatters}</p>
            <div className="mt-7 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">How we check this guide:</strong> <Link to="/authors/$author" params={{ author: "a-hollis" }} className="border-b border-primary text-primary">Texas Defined Editorial Desk</Link> checks current visitor details against the official source and uses public or institutional references for history, science, conservation and context. These notes help with trip planning; they are not a star rating or a claim of a personal visit. <Link to="/explore/top-attractions/methodology" className="border-b border-primary text-primary">See how the Top 25 is selected.</Link> <Link to="/citation-guide" className="border-b border-primary text-primary">How we cite sources.</Link>
            </div>
          </section>

          <section aria-labelledby={`${destination.slug}-itineraries`}>
            <p className="eyebrow text-primary">Use the time you have</p>
            <h2 id={`${destination.slug}-itineraries`} className="mt-2 font-display text-4xl">Three ways to visit</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {authority.itineraries.map((plan) => <article key={plan.label} className="border-t-2 border-foreground pt-5">
                <p className="eyebrow text-primary">{plan.duration}</p>
                <h3 className="mt-2 font-display text-2xl">{plan.label}</h3>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">{plan.steps.map((step) => <li key={step}>{step}</li>)}</ol>
              </article>)}
            </div>
          </section>
        </div>
      </Container>
    </Section>

    {timeline.length > 0 && <Section tone="surface">
      <Container>
        <SectionHeader eyebrow="Key dates" title={`${destination.name} in context`} description="A short chronology of dates that materially shaped this place. Each entry links to the source used for the date and historical context." />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {timeline.map((event) => <li key={`${event.date}-${event.title}`} className="border-t-2 border-foreground pt-5">
            <p className="eyebrow text-primary">{event.date}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight">{event.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{event.description}</p>
            <a href={event.sourceUrl} target="_blank" rel="noreferrer noopener" className="eyebrow mt-4 inline-block border-b border-primary pb-1 text-primary">Source: {event.sourceLabel}</a>
          </li>)}
        </ol>
      </Container>
    </Section>}

    <Section tone={timeline.length > 0 ? undefined : "surface"}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <section aria-labelledby={`${destination.slug}-traveler-questions`}>
            <p className="eyebrow text-primary">Before you go</p>
            <h2 id={`${destination.slug}-traveler-questions`} className="mt-2 font-display text-4xl">Common visitor questions</h2>
            <dl className="mt-7 divide-y divide-border border-y border-border">
              {questions.map((item) => <div key={item.q} className="py-5"><dt className="font-display text-2xl">{item.q}</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">{item.a}</dd></div>)}
            </dl>
          </section>

          <aside>
            <section aria-labelledby={`${destination.slug}-sources`}>
              <p className="eyebrow text-primary">Where we checked</p>
              <h2 id={`${destination.slug}-sources`} className="mt-2 font-display text-3xl">Where we checked the details</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">The official visitor source comes first when available. Other public or institutional sources add history, accessibility, science, conservation or other useful context. For current hours, prices and visitor rules, use the official source.</p>
              <ol className="mt-6 space-y-5">
                {authority.sources.map((source, index) => <li key={source.url} id={`authority-source-${index + 1}`} className="border-t border-border pt-4 scroll-mt-28">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">[{index + 1}] {index === 0 ? "Official visitor source" : "Additional source"}</p>
                  <a href={source.url} target="_blank" rel="noreferrer noopener" className="mt-1 block font-semibold underline decoration-primary/30 underline-offset-4 hover:text-primary">{source.label}</a>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{source.scope}</p>
                </li>)}
              </ol>
            </section>

            <section className="mt-10 border-t-2 border-foreground pt-5" aria-labelledby={`${destination.slug}-review-log`}>
              <p className="eyebrow text-primary">Last checked</p>
              <h2 id={`${destination.slug}-review-log`} className="mt-2 font-display text-3xl">What we checked</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">{checkedDate(destination.sourceCheckedAt)}:</strong> We checked official visitor guidance, ticket and reservation notes, access and accessibility information where published, suggested visit length, nearby trip context and supporting public or institutional sources.</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">Hours, prices, weather closures, special events and capacity limits can change. For day-of-trip details, use the official visitor source above.</p>
            </section>
          </aside>
        </div>
      </Container>
    </Section>
  </>;
}

export default DestinationAuthorityGuide;
