import { Container } from "@/components/layout/Container";
import type { FishingHabitatGuide } from "@/data/fishing/habitat-guides";

export function FishingHabitatGuidePage({ guide }: { guide: FishingHabitatGuide }) {
  return <>
    <Container className="pt-8 sm:pt-10">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a> · <a href="/fishing">Fishing</a> · {guide.title}
      </nav>
    </Container>

    <header className="mt-5 border-y border-border bg-ink text-ink-foreground">
      <Container className="py-14 sm:py-20">
        <p className="eyebrow text-ink-foreground/65">{guide.eyebrow}</p>
        <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">{guide.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">{guide.lede}</p>
        <div className="mt-8 flex flex-wrap gap-5 text-sm">
          <a href="#quick-answer" className="border-b border-ink-foreground pb-1 font-semibold">Quick answer ↓</a>
          <a href="#how-to-read-it" className="border-b border-ink-foreground/50 pb-1">How to read it ↓</a>
          <a href="#technique-decisions" className="border-b border-ink-foreground/50 pb-1">Technique decisions ↓</a>
          <a href="#sources" className="border-b border-ink-foreground/50 pb-1">Sources ↓</a>
        </div>
      </Container>
    </header>

    <Container className="py-12 sm:py-16">
      <section id="quick-answer" className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]">
        <div><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-2 font-display text-3xl">What This Means on the Water</h2></div>
        <p className="max-w-4xl text-base leading-8 text-foreground/90">{guide.quickAnswer}</p>
      </section>

      <section id="how-to-read-it" className="py-12" aria-labelledby="habitat-reading-heading">
        <p className="eyebrow text-primary">Read the habitat</p>
        <h2 id="habitat-reading-heading" className="mt-3 font-display text-4xl sm:text-5xl">Turn Lake Features Into Fishing Targets</h2>
        <div className="mt-8 grid gap-x-10 lg:grid-cols-2">
          {guide.sections.map((section) => <article key={section.title} className="border-t border-border py-7">
            <h3 className="font-display text-2xl">{section.title}</h3>
            <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            {section.bullets?.length ? <ul className="mt-5 space-y-3">
              {section.bullets.map((item) => <li key={item} className="border-l-2 border-primary pl-4 text-sm leading-7">{item}</li>)}
            </ul> : null}
          </article>)}
        </div>
      </section>

      <section id="technique-decisions" className="border-y border-border py-12" aria-labelledby="technique-decisions-heading">
        <p className="eyebrow text-primary">Match location to presentation</p>
        <h2 id="technique-decisions-heading" className="mt-3 font-display text-4xl sm:text-5xl">What to Fish Once You Find It</h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[50rem] border-collapse text-left text-sm">
            <thead><tr className="border-b border-border"><th className="py-3 pr-6 font-semibold">Situation</th><th className="py-3 pr-6 font-semibold">What to read</th><th className="py-3 font-semibold">Technique</th></tr></thead>
            <tbody>{guide.decisions.map((row) => <tr key={row.situation} className="border-b border-border/70">
              <td className="py-4 pr-6 text-foreground">{row.situation}</td>
              <td className="py-4 pr-6 text-muted-foreground">{row.read}</td>
              <td className="py-4"><a href={row.href} className="border-b border-primary font-semibold text-primary">{row.technique} →</a></td>
            </tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="py-12" aria-labelledby="related-habitat">
        <p className="eyebrow text-primary">Keep exploring</p>
        <h2 id="related-habitat" className="mt-3 font-display text-4xl">Related Fishing Guides</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-3">
          {guide.related.map((item) => <article key={item.href} className="border-t border-border pt-5">
            <h3 className="font-display text-2xl"><a href={item.href} className="hover:text-primary">{item.label}</a></h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            <a href={item.href} className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open guide →</a>
          </article>)}
        </div>
      </section>

      <section id="questions" className="border-y border-border py-12" aria-labelledby="habitat-faq">
        <p className="eyebrow text-primary">Practical questions</p>
        <h2 id="habitat-faq" className="mt-3 font-display text-4xl">Questions, Answered</h2>
        <div className="mt-7 divide-y divide-border">
          {guide.faq.map((item) => <article key={item.question} className="py-6">
            <h3 className="font-display text-2xl">{item.question}</h3>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">{item.answer}</p>
          </article>)}
        </div>
      </section>

      <section id="sources" className="py-12" aria-labelledby="habitat-sources">
        <p className="eyebrow text-primary">Official sources</p>
        <h2 id="habitat-sources" className="mt-3 font-display text-4xl">Source Trail</h2>
        <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guide.sources.map((source) => <article key={source.url} className="border-t border-border pt-5">
            <h3 className="font-display text-xl">{source.name}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{source.note}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">Open official source ↗</a>
          </article>)}
        </div>
      </section>
    </Container>
  </>;
}
