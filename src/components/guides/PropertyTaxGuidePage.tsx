import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { TEXAS_ENTITY_REGISTRY } from '@/data/texas-entity-registry';
import { resolveInternalEntityLinks } from '@/platform/internal-linking';
import { INTERNAL_LINK_POLICIES, policyForSurface } from '@/platform/internal-link-policies';
import type { ReactNode } from 'react';

type Section = { title: string; paragraphs: string[]; steps?: string[] };
type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
  officialUrl: string;
  officialLabel: string;
  canonicalPath?: string;
  stepPrefix?: string;
  reviewedAt?: string;
};

const CORE_GUIDES = [
  { to: '/learn/property-taxes', label: 'Property taxes' },
  { to: '/learn/appraisal-districts', label: 'Appraisal districts' },
  { to: '/do/homestead-exemption', label: 'Homestead exemption' },
  { to: '/do/property-tax-protest', label: 'Property-tax protest' },
] as const;

function PropertySectionNavigation() {
  return (
    <nav aria-label="Property section" className="border-b border-border bg-background">
      <Container className="flex gap-1 overflow-x-auto py-2 text-sm">
        <Link to="/property" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary" activeProps={{ className: 'bg-surface text-primary' }}>Property home</Link>
        <Link to="/property-tax-guides" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary" activeProps={{ className: 'bg-surface text-primary' }}>Guides</Link>
        <Link to="/property-tax/counties" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary" activeProps={{ className: 'bg-surface text-primary' }}>Counties</Link>
        <Link to="/property-tax-calculators" className="whitespace-nowrap rounded-sm px-3 py-2 font-semibold text-muted-foreground hover:bg-surface hover:text-primary" activeProps={{ className: 'bg-surface text-primary' }}>Calculators</Link>
      </Container>
    </nav>
  );
}

function PreviousNext({ canonicalPath }: { canonicalPath?: string }) {
  if (!canonicalPath) return null;
  const currentIndex = CORE_GUIDES.findIndex((guide) => guide.to === canonicalPath);
  if (currentIndex < 0) return null;
  const previous = CORE_GUIDES[currentIndex - 1];
  const next = CORE_GUIDES[currentIndex + 1];
  return (
    <nav aria-label="Previous and next property guides" className="mt-10 grid gap-4 sm:grid-cols-2">
      <div>{previous ? <Link to={previous.to} className="block rounded-md border border-border p-5 hover:border-primary/50"><span className="eyebrow text-muted-foreground">Previous guide</span><strong className="mt-2 block font-display text-xl hover:text-primary">← {previous.label}</strong></Link> : null}</div>
      <div>{next ? <Link to={next.to} className="block rounded-md border border-border p-5 sm:text-right hover:border-primary/50"><span className="eyebrow text-muted-foreground">Next guide</span><strong className="mt-2 block font-display text-xl hover:text-primary">{next.label} →</strong></Link> : null}</div>
    </nav>
  );
}

export function PropertyTaxGuidePage({ eyebrow, title, intro, sections, officialUrl, officialLabel, canonicalPath, stepPrefix = 'guide-step-', reviewedAt = 'August 3, 2026' }: Props) {
  const surfacePolicy = INTERNAL_LINK_POLICIES['property-tax-guide'];
  const linkedEntityIds: string[] = [];
  let remainingLinks = surfacePolicy.pageBudget;
  let stepNumber = 0;

  const linkedText = (text: string, requestedLimit = surfacePolicy.blockBudget): ReactNode[] => {
    if (remainingLinks <= 0) return [text];
    const result = resolveInternalEntityLinks(text, TEXAS_ENTITY_REGISTRY, {
      ...policyForSurface('property-tax-guide'),
      maxLinks: Math.min(requestedLimit, surfacePolicy.blockBudget, remainingLinks),
      linkedEntityIds,
      existingHrefs: [officialUrl],
    });
    linkedEntityIds.push(...result.matches.map((match) => match.entity.id));
    remainingLinks -= result.matches.length;
    if (!result.matches.length) return [text];
    const output: ReactNode[] = [];
    let cursor = 0;
    result.matches.forEach((match, index) => {
      if (match.start > cursor) output.push(text.slice(cursor, match.start));
      output.push(<a key={`${match.entity.id}-${index}`} href={match.href} data-entity-id={match.entity.id} data-entity-kind={match.entity.kind} data-link-score={match.score} data-link-reasons={match.reasons.join(',')} className="underline decoration-primary/40 underline-offset-2 hover:text-primary">{text.slice(match.start, match.end)}</a>);
      cursor = match.end;
    });
    if (cursor < text.length) output.push(text.slice(cursor));
    return output;
  };

  return <>
    <PropertySectionNavigation />
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        {canonicalPath && <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden> · </span><Link to="/property">Property</Link><span aria-hidden> · </span><span aria-current="page" className="text-foreground">{title}</span></nav>}
        <p className="eyebrow mt-8 text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{linkedText(intro, 3)}</p>
        <p className="mt-6 border-t border-border pt-4 text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">Reviewed {reviewedAt} · Confirm current details with the responsible office</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <aside className="h-fit border-t-2 border-foreground pt-5 lg:sticky lg:top-28">
          <p className="eyebrow text-primary">In this guide</p>
          <nav className="mt-4 divide-y divide-border text-sm">
            {sections.map((section, index) => <a key={section.title} href={`#property-section-${index + 1}`} className="block py-3 text-muted-foreground transition-colors hover:text-primary">{section.title}</a>)}
          </nav>
          <div className="mt-7 border-t border-border pt-5">
            <p className="eyebrow text-muted-foreground">Property tools</p>
            <nav className="mt-3 grid gap-2 text-sm">
              <Link to="/decide/property-taxes" className="text-muted-foreground hover:text-primary">Tax estimator</Link>
              <Link to="/property-tax-calculators" className="text-muted-foreground hover:text-primary">Calculator toolkit</Link>
              <Link to="/property-tax/counties" className="text-muted-foreground hover:text-primary">County guides</Link>
            </nav>
          </div>
        </aside>

        <article className="max-w-4xl">
          <div className="border-t-2 border-foreground">
            {sections.map((section, sectionIndex) => <section id={`property-section-${sectionIndex + 1}`} key={section.title} className="scroll-mt-28 border-b border-border py-10">
              <div className="grid gap-5 sm:grid-cols-[4rem_1fr]">
                <p className="eyebrow text-primary">{String(sectionIndex + 1).padStart(2, '0')}</p>
                <div>
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">{section.title}</h2>
                  <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{linkedText(paragraph)}</p>)}</div>
                  {section.steps && <ol className="mt-7 divide-y divide-border border-y border-border">{section.steps.map((step) => { stepNumber += 1; return <li id={`${stepPrefix}${stepNumber}`} key={step} className="grid gap-3 py-4 sm:grid-cols-[2.5rem_1fr]"><strong className="font-display text-xl text-primary">{stepNumber}</strong><span className="text-sm leading-7 text-foreground/90">{linkedText(step, 1)}</span></li>; })}</ol>}
                </div>
              </div>
            </section>)}
          </div>

          <section className="mt-12 border-t-2 border-foreground pt-7">
            <p className="eyebrow text-primary">Related property guides</p>
            <div className="mt-5 grid border-t border-border sm:grid-cols-2">
              <Link to="/decide/property-taxes" className="border-b border-border py-5 sm:border-r sm:pr-6"><strong className="font-display text-2xl hover:text-primary">Estimate your property taxes</strong></Link>
              <Link to="/learn/appraisal-districts" className="border-b border-border py-5 sm:pl-6"><strong className="font-display text-2xl hover:text-primary">Find your appraisal district</strong></Link>
              <Link to="/do/homestead-exemption" className="border-b border-border py-5 sm:border-r sm:pr-6"><strong className="font-display text-2xl hover:text-primary">Homestead exemption</strong></Link>
              <Link to="/do/property-tax-protest" className="border-b border-border py-5 sm:pl-6"><strong className="font-display text-2xl hover:text-primary">Prepare a protest</strong></Link>
            </div>
            <a href={officialUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary">{officialLabel}<ExternalLink className="h-4 w-4" /></a>
          </section>

          <PreviousNext canonicalPath={canonicalPath} />
        </article>
      </div>
    </Container>
  </>;
}
