import { Link } from "@tanstack/react-router";

import { DepartmentHero } from "@/components/editorial/DepartmentHero";
import { Container } from "@/components/layout/Container";
import { TEXAS_EXPLAINED_QUESTIONS } from "@/data/texas-explained-questions";

const anchorFor = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function TexasExplainedQuestionsPage() {
  const questions = TEXAS_EXPLAINED_QUESTIONS;
  const categories = Array.from(new Set(questions.map((item) => item.category)));

  return <>
    <DepartmentHero
      current="Texas Questions"
      eyebrow="Texas Explained"
      title={`${questions.length} Texas questions, answered in plain English`}
      description="Direct answers to common questions about Texas roads, government, property, schools, culture, sports, geography and everyday life—with deeper guides when a topic needs more context."
    />
    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-y border-border py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">Find the exact question</p>
          <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">A reference library for the questions Texans and newcomers actually ask.</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">Browse by topic, scan the questions people actually ask, and follow a deep-dive link when you want the full history, geography or practical context behind an answer.</p>
        </div>
        <aside className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">{questions.length} answers · {categories.length} topic groups</p>
          <p className="mt-2">Prefer the curated overview instead of the full reference library?</p>
          <Link to="/texas-explained" className="mt-4 inline-block border-b border-primary pb-1 font-semibold text-primary">Start with Texas Explained →</Link>
        </aside>
      </section>

      <nav aria-label="Texas question categories" className="mt-8 border-y border-border py-7">
        <p className="eyebrow text-muted-foreground">Jump to a topic</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {categories.map((category) => (
            <a key={category} href={`#${anchorFor(category)}`} className="border-b border-transparent py-1 hover:border-primary hover:text-primary">{category}</a>
          ))}
        </div>
      </nav>

      <div className="mt-14 space-y-16">
        {categories.map((category) => {
          const categoryQuestions = questions.filter((item) => item.category === category);
          return (
            <section key={category} id={anchorFor(category)} className="scroll-mt-28" aria-labelledby={`${anchorFor(category)}-heading`}>
              <header className="grid gap-3 border-b border-border pb-5 lg:grid-cols-[18rem_1fr] lg:items-end">
                <div>
                  <p className="eyebrow text-primary">Texas Questions</p>
                  <h2 id={`${anchorFor(category)}-heading`} className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{category}</h2>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{categoryQuestions.length} common questions with direct answers and deeper reading where it adds useful context.</p>
              </header>
              <div className="grid border-t border-border md:grid-cols-2">
                {categoryQuestions.map((item, index) => (
                  <article key={item.question} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? "md:border-l" : ""}`}>
                    <h3 className="font-display text-2xl leading-tight">{item.question}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                    {item.href ? <Link to={item.href} className="eyebrow mt-5 inline-block border-b border-primary py-1 text-primary">{item.linkLabel ?? "Go deeper"} →</Link> : null}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <footer className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
        <Link to="/texas-explained" className="group border border-border p-6 transition-colors hover:border-primary"><p className="eyebrow text-primary">Curated overview</p><p className="mt-2 font-display text-2xl group-hover:text-primary">Texas Explained →</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Start with the 10 flagship guides that connect Texas landscapes, infrastructure, homes, wildlife and regional identity.</p></Link>
        <Link to="/texas-resources" className="group border border-border p-6 transition-colors hover:border-primary"><p className="eyebrow text-primary">Practical next step</p><p className="mt-2 font-display text-2xl group-hover:text-primary">Texas Resources →</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Find official agencies, records, lookup tools and practical guides for getting things done in Texas.</p></Link>
      </footer>
    </Container>
  </>;
}
