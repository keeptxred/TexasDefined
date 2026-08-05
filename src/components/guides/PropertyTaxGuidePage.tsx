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
};

export function PropertyTaxGuidePage({ eyebrow, title, intro, sections, officialUrl, officialLabel, canonicalPath, stepPrefix = 'guide-step-' }: Props) {
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

  return <Container className="py-16 sm:py-24"><article className="mx-auto max-w-4xl">
    {canonicalPath && <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground"><Link to="/">Home</Link><span aria-hidden="true"> / </span><Link to="/decide/property-taxes">Property taxes</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>}
    <p className="eyebrow text-primary">{eyebrow}</p><h1 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">{title}</h1>
    <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{linkedText(intro, 3)}</p>
    <p className="mt-4 text-sm text-muted-foreground">Reviewed August 3, 2026. Start here, then confirm the current details with the responsible office.</p>
    <div className="mt-12 space-y-12">{sections.map((section) => <section key={section.title} className="border-t border-border pt-8"><h2 className="font-display text-3xl">{section.title}</h2><div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{linkedText(paragraph)}</p>)}</div>{section.steps && <ol className="mt-6 space-y-3">{section.steps.map((step) => { stepNumber += 1; return <li id={`${stepPrefix}${stepNumber}`} key={step} className="flex gap-4 rounded-md border border-border p-4"><strong className="text-primary">{stepNumber}</strong><span>{linkedText(step, 1)}</span></li>; })}</ol>}</section>)}</div>
    <section className="mt-12 rounded-md bg-muted p-6"><h2 className="font-display text-2xl">What to do next</h2><div className="mt-4 flex flex-wrap gap-4 text-sm font-medium"><Link to="/decide/property-taxes" className="underline">Estimate your property taxes</Link><Link to="/learn/appraisal-districts" className="underline">Find your appraisal district</Link><Link to="/do/homestead-exemption" className="underline">Check the homestead exemption</Link><Link to="/do/property-tax-protest" className="underline">Prepare a protest</Link><a href={officialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline">{officialLabel}<ExternalLink className="h-4 w-4" /></a></div></section>
  </article></Container>;
}
