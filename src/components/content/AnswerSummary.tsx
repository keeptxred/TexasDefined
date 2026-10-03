import type { ReactNode } from "react";

import { Container } from "@/components/layout/Container";

export interface AnswerSummaryItem {
  question: string;
  answer: ReactNode;
}

export function AnswerSummary({
  eyebrow = "Quick answer",
  title = "What to know",
  intro,
  items,
}: {
  eyebrow?: string;
  title?: string;
  intro?: ReactNode;
  items: AnswerSummaryItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="border-y border-border bg-surface" aria-labelledby="answer-summary-heading">
      <Container className="py-10 sm:py-12">
        <p className="eyebrow text-primary">{eyebrow}</p>
        <h2 id="answer-summary-heading" className="mt-3 max-w-5xl font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        {intro && <div className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">{intro}</div>}
        <dl className="mt-8 grid gap-x-10 gap-y-7 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold leading-6 text-foreground">{item.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
