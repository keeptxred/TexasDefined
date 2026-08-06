import { Link } from '@tanstack/react-router';
import { ArrowRight, ExternalLink, ShieldCheck } from 'lucide-react';

export type PropertyGuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PropertyGuideFaq = { question: string; answer: string };

export function PropertyClusterGuidePage({
  eyebrow,
  title,
  intro,
  sections,
  faqs,
  officialUrl,
  officialLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PropertyGuideSection[];
  faqs: PropertyGuideFaq[];
  officialUrl: string;
  officialLabel: string;
}) {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="rounded-sm border border-border bg-card p-6 sm:p-10">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl tracking-tight text-foreground sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{intro}</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Based on official Texas sources</span>
          <span>Last reviewed: August 6, 2026</span>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="h-fit rounded-sm border border-border bg-card p-5 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-foreground">On this page</p>
          <nav className="mt-3 space-y-2 text-sm">
            {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block text-muted-foreground hover:text-foreground">{section.title}</a>)}
            <a href="#faq" className="block text-muted-foreground hover:text-foreground">Frequently asked questions</a>
          </nav>
        </aside>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-display text-3xl tracking-tight text-foreground">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-muted-foreground">
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.bullets?.length ? <ul className="mt-5 list-disc space-y-2 pl-6 text-muted-foreground">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
            </section>
          ))}

          <section id="faq" className="scroll-mt-24">
            <h2 className="font-display text-3xl tracking-tight text-foreground">Frequently asked questions</h2>
            <div className="mt-5 divide-y divide-border rounded-sm border border-border bg-card">
              {faqs.map((faq) => <details key={faq.question} className="group p-5"><summary className="cursor-pointer font-medium text-foreground">{faq.question}</summary><p className="mt-3 leading-7 text-muted-foreground">{faq.answer}</p></details>)}
            </div>
          </section>

          <section className="rounded-sm border border-border bg-card p-6">
            <h2 className="font-display text-2xl text-foreground">Official Texas resource</h2>
            <a href={officialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">{officialLabel}<ExternalLink className="h-4 w-4" /></a>
          </section>

          <section>
            <h2 className="font-display text-2xl text-foreground">Continue through the property-tax cluster</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link to="/learn/property-taxes" className="rounded-sm border border-border p-4 text-sm font-medium hover:bg-accent">Complete property-tax guide <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              <Link to="/decide/property-taxes" className="rounded-sm border border-border p-4 text-sm font-medium hover:bg-accent">Property-tax calculator <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              <Link to="/do/homestead-exemption" className="rounded-sm border border-border p-4 text-sm font-medium hover:bg-accent">Homestead exemption <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
              <Link to="/do/property-tax-protest" className="rounded-sm border border-border p-4 text-sm font-medium hover:bg-accent">Property-tax protest <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
