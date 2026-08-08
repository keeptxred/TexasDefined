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
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        {canonicalPath && <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><Link to="/">Front page</Link><span aria-hidden> · </span><Link to="/decide/property-taxes">Property taxes</Link><span aria-hidden> · </span><span aria-current="page" className="text-foreground">{title}</span></nav>}
        <p className="eyebrow mt-8 text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{linkedText(intro, 3)}</p>
        <p className="mt-6 border-t border-border pt-4 text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">Reviewed {reviewedAt} · Confirm current details with the responsible office</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <article className="mx-auto max-w-4xl">
        <div className="border-t-2 border-foreground">
          {sections.map((section, sectionIndex) => <section key={section.title} className="border-b border-border py-10">
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
          <p className="eyebrow text-primary">Where to go next</p>
          <div className="mt-5 grid border-t border-border sm:grid-cols-2">
            <Link to="/decide/property-taxes" className="border-b border-border py-5 sm:border-r sm:pr-6"><strong className="font-display text-2xl hover:text-primary">Estimate your property taxes</strong></Link>
            <Link to="/learn/appraisal-districts" className="border-b border-border py-5 sm:pl-6"><strong className="font-display text-2xl hover:text-primary">Find your appraisal district</strong></Link>
            <Link to="/do/homestead-exemption" className="border-b border-border py-5 sm:border-r sm:pr-6"><strong className="font-display text-2xl hover:text-primary">Homestead exemption</strong></Link>
            <Link to="/do/property-tax-protest" className="border-b border-border py-5 sm:pl-6"><strong className="font-display text-2xl hover:text-primary">Prepare a protest</strong></Link>
          </div>
          <a href={officialUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary">{officialLabel}<ExternalLink className="h-4 w-4" /></a>
        </section>
      </article>
    </Container>
  </>;
}
