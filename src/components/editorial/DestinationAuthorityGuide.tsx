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

function sourceHref(index: number) {
  return `#authority-source-${index + 1}`;
}

export function DestinationAuthorityGuide({ destination }: { destination: Destination }) {
  const authority = destination.authorityGuide;
  if (!authority) return null;

  const timeline = topAttractionTimeline(destination.slug);
  const primarySource = authority.sources[0];
  const nearby = destination.areaGuide?.nearbyAttractions[0];
  const sideTrip = destination.areaGuide?.sideTrips[0];
  const questions = [
    { q: `How long should I allow for ${destination.name}?`, a: authority.assessment.recommendedVisit },
    { q: `Do I need to plan ahead?`, a: destination.entryNote },
    { q: `When is the best time to go?`, a: destination.bestSeason },
    ...(destination.accessibilityNotes ? [{ q: `What should I know about accessibility?`, a: destination.accessibilityNotes }] : []),
    ...(nearby ? [{ q: `What should I pair with ${destination.name}?`, a: `${nearby.name}${nearby.proximity ? ` (${nearby.proximity})` : ""}: ${nearby.description}` }] : []),
    ...(sideTrip ? [{ q: `What is a worthwhile side trip?`, a: `${sideTrip.name}${sideTrip.proximity ? ` (${sideTrip.proximity})` : ""}: ${sideTrip.description}` }] : []),
  ].slice(0, 6);

  return <>
    <Section tone="surface">
      <Container>
        <SectionHeader
          eyebrow="TexasDefined authority guide"
          title={`Verified planning notes for ${destination.name}`}
          description="Operational facts are tied to official sources and a recorded review date. Supporting agency, institutional, conservation, science and historic-designation sources add context where useful. TexasDefined's planning assessment is editorial judgment—not a paid rating or a claim of an unrecorded personal visit."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
          <section className="border-y border-border py-7" aria-labelledby={`${destination.slug}-verified-info`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-primary">Verified visitor information</p>
                <h2 id={`${destination.slug}-verified-info`} className="mt-2 font-display text-3xl">What we checked</h2>
              </div>
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Reviewed {checkedDate(destination.sourceCheckedAt)}</p>
            </div>
            <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
              <div className="border-t border-border py-4"><dt className="eyebrow text-muted-foreground">Recommended visit</dt><dd className="mt-2 leading-6">{authority.assessment.recommendedVisit}</dd></div>
              {destination.managingAuthority && <div className="border-t border-border py-4"><dt className="eyebrow text-muted-foreground">Managing authority</dt><dd className="mt-2 leading-6">{destination.managingAuthority}{primarySource && <sup><a href={sourceHref(0)} className="ml-1 text-primary">[1]</a></sup>}</dd></div>}
              {destination.address && <div className="border-t border-border py-4"><dt className="eyebrow text-muted-foreground">Visitor address</dt><dd className="mt-2 leading-6">{destination.address}{primarySource && <sup><a href={sourceHref(0)} className="ml-1 text-primary">[1]</a></sup>}</dd></div>}
              <div className="border-t border-border py-4"><dt className="eyebrow text-muted-foreground">Entry / reservations</dt><dd className="mt-2 leading-6">{destination.entryNote}{primarySource && <sup><a href={sourceHref(0)} className="ml-1 text-primary">[1]</a></sup>}</dd></div>
              <div className="border-t border-border py-4 sm:col-span-2"><dt className="eyebrow text-muted-foreground">Evidence layer</dt><dd className="mt-2 leading-6">{authority.sources.length} distinct authority {authority.sources.length === 1 ? "source" : "sources"} attached to this guide, including the controlling visitor source and supporting institutional context where available.</dd></div>
            </dl>
          </section>

          <section className="border-y border-border py-7" aria-labelledby={`${destination.slug}-editorial-assessment`}>
            <p className="eyebrow text-primary">Editorial assessment</p>
            <h2 id={`${destination.slug}-editorial-assessment`} className="mt-2 font-display text-3xl">How to think about the visit</h2>
            <dl className="mt-6 divide-y divide-border text-sm">
              <div className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">Physical effort</dt><dd className="text-right font-medium">{authority.assessment.physicalEffort}</dd></div>
              <div className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">Weather exposure</dt><dd className="text-right font-medium">{authority.assessment.weatherExposure}</dd></div>
              <div className="flex justify-between gap-5 py-3"><dt className="text-muted-foreground">Advance planning</dt><dd className="text-right font-medium">{authority.assessment.planningLevel}</dd></div>
              <div className="py-3"><dt className="text-muted-foreground">Family fit</dt><dd className="mt-1 leading-6">{authority.assessment.familyFit}</dd></div>
              <div className="py-3"><dt className="text-muted-foreground">First-time Texas value</dt><dd className="mt-1 leading-6">{authority.assessment.firstTimeValue}</dd></div>
            </dl>
          </section>
        </div>
      </Container>
    </Section>

    <Section>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <section aria-labelledby={`${destination.slug}-texas-significance`}>
            <p className="eyebrow text-primary">Why it matters to Texas</p>
            <h2 id={`${destination.slug}-texas-significance`} className="mt-2 font-display text-4xl">More than a photo stop</h2>
            <p className="mt-6 text-base leading-8 text-foreground/90">{authority.whyItMatters}</p>
            <div className="mt-7 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
              <strong className="text-foreground">Research & review:</strong> <Link to="/authors/$author" params={{ author: "a-hollis" }} className="border-b border-primary text-primary">Texas Defined Editorial Desk</Link>. Operational details are checked against the linked controlling source; supporting sources deepen history, science, conservation or institutional context. Editorial assessments describe trip-planning value rather than a star rating. <Link to="/explore/top-attractions/methodology" className="border-b border-primary text-primary">See the Top-25 methodology.</Link> <Link to="/citation-guide" className="border-b border-primary text-primary">Citation guidance.</Link>
            </div>
          </section>

          <section aria-labelledby={`${destination.slug}-itineraries`}>
            <p className="eyebrow text-primary">Use the time you have</p>
            <h2 id={`${destination.slug}-itineraries`} className="mt-2 font-display text-4xl">Three ways to visit</h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              {authority.itineraries.map((plan) => <article key={plan.label} className="border-t-2 border-foreground pt-5">
                <p className="eyebrow text-primary">{plan.duration}</p>
                <h3 className="mt-2 font-display text-2xl">{plan.label}</h3>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">{plan.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="font-semibold text-primary">{index + 1}</span><span>{step}</span></li>)}</ol>
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
            <h2 id={`${destination.slug}-traveler-questions`} className="mt-2 font-display text-4xl">Traveler questions, answered</h2>
            <dl className="mt-7 divide-y divide-border border-y border-border">
              {questions.map((item) => <div key={item.q} className="py-5"><dt className="font-display text-2xl">{item.q}</dt><dd className="mt-2 text-sm leading-7 text-muted-foreground">{item.a}{primarySource && item.q.includes("plan ahead") && <sup><a href={sourceHref(0)} className="ml-1 text-primary">[1]</a></sup>}</dd></div>)}
            </dl>
          </section>

          <aside>
            <section aria-labelledby={`${destination.slug}-sources`}>
              <p className="eyebrow text-primary">Sources & verification</p>
              <h2 id={`${destination.slug}-sources`} className="mt-2 font-display text-3xl">Authority sources used</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">The first source is the controlling visitor source when available. Additional sources support history, accessibility, science, conservation, designation or institutional context; they do not override current operator guidance.</p>
              <ol className="mt-6 space-y-5">
                {authority.sources.map((source, index) => <li key={source.url} id={`authority-source-${index + 1}`} className="border-t border-border pt-4 scroll-mt-28">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">[{index + 1}] {index === 0 ? "Controlling visitor source" : "Supporting authority source"}</p>
                  <a href={source.url} target="_blank" rel="noreferrer noopener" className="mt-1 block font-semibold underline decoration-primary/30 underline-offset-4 hover:text-primary">{source.label}</a>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{source.scope}</p>
                </li>)}
              </ol>
            </section>

            <section className="mt-10 border-t-2 border-foreground pt-5" aria-labelledby={`${destination.slug}-review-log`}>
              <p className="eyebrow text-primary">Review log</p>
              <h2 id={`${destination.slug}-review-log`} className="mt-2 font-display text-3xl">What was reviewed</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">{checkedDate(destination.sourceCheckedAt)}:</strong> official visitor guidance, entry/reservation notes, access and accessibility information where published, recommended visit structure, surrounding trip context and supporting institutional sources reviewed for this guide.</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">Hours, prices, weather closures, special events and capacity limits can change after review. The linked controlling visitor source governs current-day operations.</p>
            </section>
          </aside>
        </div>
      </Container>
    </Section>
  </>;
}

export default DestinationAuthorityGuide;
