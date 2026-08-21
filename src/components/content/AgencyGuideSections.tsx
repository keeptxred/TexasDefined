import type { TexasEntityRecord } from '@/data/knowledge-graph/types';
import { agencyGuideFor } from '@/data/agency-guide-content';

export function AgencyGuideSections({ entity }: { entity: TexasEntityRecord }) {
  if (entity.kind !== 'agency') return null;
  const guide = agencyGuideFor(entity.slug);
  if (!guide) return null;

  return <>
    <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Agency overview</p>
        <h2 className="mt-2 font-display text-4xl">What {entity.name} does</h2>
      </div>
      <div className="max-w-3xl space-y-5 text-base leading-8 text-muted-foreground">
        <p>{guide.summary}</p>
        <p>{guide.distinction}</p>
      </div>
    </section>

    <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Core responsibilities</p>
          <h2 className="mt-2 font-display text-4xl">What the agency handles</h2>
        </div>
        <div className="grid gap-x-8 md:grid-cols-2">
          {guide.responsibilities.map((item) => <div key={item.title} className="border-t border-border py-6">
            <h3 className="font-display text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="grid gap-8 border-b border-border py-12 lg:grid-cols-2">
      <div>
        <p className="eyebrow text-primary">Common tasks</p>
        <h2 className="mt-2 font-display text-4xl">Why Texans use this agency</h2>
        <ul className="mt-6 space-y-3 text-sm leading-7 text-muted-foreground">
          {guide.commonReasons.map((item) => <li key={item} className="border-t border-border pt-3">{item}</li>)}
        </ul>
      </div>
      <div>
        <p className="eyebrow text-primary">Before you start</p>
        <h2 className="mt-2 font-display text-4xl">Save a wasted trip or filing</h2>
        <ol className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
          {guide.beforeYouStart.map((item, index) => <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-t border-border pt-3"><span className="font-display text-xl text-primary">{index + 1}</span><span>{item}</span></li>)}
        </ol>
      </div>
    </section>

    <section className="border-b border-border py-12">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <div>
          <p className="eyebrow text-primary">Texas Defined</p>
          <h2 className="mt-2 font-display text-4xl">Related guides and tools</h2>
        </div>
        <div className="grid sm:grid-cols-2">
          {guide.internalLinks.map((link, index) => <a key={link.href} href={link.href} className={`group border-b border-border py-6 sm:px-5 ${index % 2 ? 'sm:border-l' : ''}`}>
            <strong className="block font-display text-2xl leading-tight group-hover:text-primary">{link.label}</strong>
            <span className="mt-3 block text-sm leading-6 text-muted-foreground">{link.description}</span>
            <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-primary">Open guide →</span>
          </a>)}
        </div>
      </div>
    </section>

    <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[14rem_1fr]">
      <div>
        <p className="eyebrow text-primary">Source check</p>
        <h2 className="mt-2 font-display text-3xl">Use the official site for the transaction</h2>
      </div>
      <div className="max-w-3xl">
        <p className="text-sm leading-7 text-muted-foreground">{guide.verificationNote}</p>
        {entity.officialUrl ? <a href={entity.officialUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block text-sm font-semibold underline decoration-primary/50 underline-offset-4 hover:text-primary">Open the official {entity.name} website ↗</a> : null}
      </div>
    </section>
  </>;
}
