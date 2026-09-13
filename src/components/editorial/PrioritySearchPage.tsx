import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";

export type PrioritySearchLink = { label: string; href: string; external?: boolean };
export type PrioritySearchSection = { heading: string; paragraphs: string[]; links?: PrioritySearchLink[] };
export type PrioritySearchFaq = { question: string; answer: string };
export type PrioritySearchPageData = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  quickAnswer?: string;
  sections: PrioritySearchSection[];
  related: PrioritySearchLink[];
  faq?: PrioritySearchFaq[];
};

function ResourceLink({ link }: { link: PrioritySearchLink }) {
  if (link.external) return <a href={link.href} target="_blank" rel="noreferrer" className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{link.label} ↗</a>;
  return <Link to={link.href} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">{link.label}</Link>;
}

export function PrioritySearchPage({ data }: { data: PrioritySearchPageData }) {
  const officialSources = [...new Map(
    data.sections
      .flatMap((section) => section.links ?? [])
      .filter((link) => link.external)
      .map((link) => [link.href, link] as const),
  ).values()];

  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20"><Container><p className="eyebrow text-primary">{data.eyebrow}</p><h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">{data.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{data.intro}</p><p className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">Last verified {data.updated}</p></Container></section>
    <section className="border-b border-border py-5"><Container><div className="max-w-4xl text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Independent guide:</strong> TexasDefined is an independent publication, not a Texas government agency. We explain the process and link to the responsible official source for applications, payments, current rules and final eligibility decisions.</div></Container></section>
    {data.quickAnswer ? <section className="border-b border-border py-8"><Container><div className="max-w-4xl border-l-2 border-primary pl-5"><p className="eyebrow text-primary">Quick answer</p><p className="mt-3 text-lg leading-8">{data.quickAnswer}</p></div></Container></section> : null}
    <section className="py-12 md:py-16"><Container><div className="max-w-4xl divide-y divide-border">{data.sections.map((section, index) => <section key={section.heading} className="py-8 first:pt-0"><p className="eyebrow text-muted-foreground">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl md:text-4xl">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>)}{section.links?.length ? <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{section.links.map((link) => <ResourceLink key={`${link.href}-${link.label}`} link={link} />)}</div> : null}</section>)}</div></Container></section>
    {data.faq?.length ? <section className="border-t border-border bg-surface py-12" aria-labelledby="priority-faq-heading"><Container><div className="max-w-4xl"><p className="eyebrow text-primary">Quick answers</p><h2 id="priority-faq-heading" className="mt-2 font-display text-3xl md:text-4xl">Frequently asked questions</h2><div className="mt-6 divide-y divide-border border-y border-border">{data.faq.map((item) => <details key={item.question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-xl marker:hidden">{item.question}<span className="float-right text-primary group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{item.answer}</p></details>)}</div></div></Container></section> : null}
    {officialSources.length ? <section className="border-t border-border py-10"><Container><div className="grid max-w-4xl gap-6 lg:grid-cols-[14rem_1fr]"><div><p className="eyebrow text-primary">Verify with the source</p><h2 className="mt-2 font-display text-3xl">Official links used in this guide</h2></div><div><p className="text-sm leading-7 text-muted-foreground">Current fees, eligibility, deadlines, appointments, rules and transactions should be confirmed with the responsible government source. TexasDefined does not accept applications, collect government fees or make eligibility decisions.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm">{officialSources.map((link) => <ResourceLink key={`source-${link.href}`} link={link} />)}</div></div></div></Container></section> : null}
    <section className="border-t border-border bg-muted/30 py-10"><Container><h2 className="font-display text-3xl">Related Texas guides</h2><div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm">{data.related.map((link) => <ResourceLink key={`${link.href}-${link.label}`} link={link} />)}</div></Container></section>
  </main>;
}
