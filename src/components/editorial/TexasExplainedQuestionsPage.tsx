import { Link } from "@tanstack/react-router";

import { TEXAS_EXPLAINED_QUESTIONS } from "@/data/texas-explained-questions";

const anchorFor = (value: string) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function TexasExplainedQuestionLibrary() {
  const questions = TEXAS_EXPLAINED_QUESTIONS;
  const categories = Array.from(new Set(questions.map((item) => item.category)));

  return (
    <section id="texas-questions" className="mt-16 scroll-mt-28 border-t border-border pt-10" aria-labelledby="texas-questions-heading">
      <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div className="max-w-3xl">
          <p className="eyebrow text-primary">The everyday Texas reference desk</p>
          <h2 id="texas-questions-heading" className="mt-3 font-display text-3xl leading-tight sm:text-4xl">{questions.length} Texas questions, answered in plain English</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground">Start with the question people actually type. TexasDefined answers the short-form question here, then points to a stronger canonical guide when the subject deserves deeper treatment. Questions without a deep-dive link are still answered here instead of being turned into thin standalone pages.</p>
        </div>
        <aside className="border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">{questions.length} answers · {categories.length} topic groups</p>
          <p className="mt-2">Dedicated pages are reserved for subjects that can support useful depth, sourcing, internal links and a reason to exist beyond the short answer.</p>
        </aside>
      </header>

      <nav aria-label="Texas question categories" className="mt-8 border-y border-border py-7">
        <p className="eyebrow text-muted-foreground">Jump to a topic</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
          {categories.map((category) => (
            <a key={category} href={`#${anchorFor(category)}`} className="border-b border-transparent py-1 hover:border-primary hover:text-primary">{category}</a>
          ))}
        </div>
      </nav>

      <div className="mt-14 space-y-20">
        {categories.map((category) => {
          const categoryQuestions = questions.filter((item) => item.category === category);
          return (
            <section key={category} id={anchorFor(category)} className="scroll-mt-28" aria-labelledby={`${anchorFor(category)}-heading`}>
              <header className="grid gap-3 border-b border-border pb-5 lg:grid-cols-[18rem_1fr] lg:items-end">
                <div>
                  <p className="eyebrow text-primary">Texas Explained</p>
                  <h3 id={`${anchorFor(category)}-heading`} className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{category}</h3>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{categoryQuestions.length} common questions with direct answers and deeper TexasDefined reading where it adds value.</p>
              </header>
              <div className="grid border-t border-border md:grid-cols-2">
                {categoryQuestions.map((item, index) => (
                  <article key={item.question} className={`border-b border-border py-7 md:px-6 ${index % 2 === 1 ? "md:border-l" : ""}`}>
                    <h4 className="font-display text-2xl leading-tight">{item.question}</h4>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                    {item.href ? <Link to={item.href} className="eyebrow mt-5 inline-block border-b border-primary py-1 text-primary">{item.linkLabel ?? "Go deeper"} →</Link> : null}
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-16 max-w-3xl border-t border-border pt-8">
        <p className="eyebrow text-primary">Keep building the map</p>
        <h3 className="mt-3 font-display text-3xl leading-tight">A short answer is the floor, not the ceiling.</h3>
        <p className="mt-4 text-base leading-8 text-muted-foreground">As a subject earns deeper treatment, TexasDefined can publish a sourced evergreen guide and point this answer to the new canonical page without flooding the index with weak pages.</p>
      </div>
    </section>
  );
}
