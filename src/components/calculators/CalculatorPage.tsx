import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { AnswerSummary } from '@/components/content/AnswerSummary';
import { Container } from '@/components/layout/Container';

export function CalculatorPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <>
      <section className="border-b border-border bg-surface">
        <Container className="py-14 sm:py-20">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
              <li aria-hidden>·</li>
              <li><Link to="/decide/financial-tools" className="hover:text-foreground">Money & Property</Link></li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-foreground">Calculator</li>
            </ol>
          </nav>
          <p className="eyebrow mt-8 text-primary">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">{title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
        </Container>
      </section>

      <AnswerSummary
        eyebrow="Quick answer"
        title={`What this ${title.toLowerCase()} does`}
        items={[
          { question: "What does this calculator estimate?", answer: description },
          { question: "Who is it for?", answer: "Texans comparing costs, planning a move, evaluating a home purchase or trying to understand a household money decision before talking with a provider or agency." },
          { question: "Is the result official?", answer: "No. Results are planning estimates based on the values you enter and should be checked against current rates, taxes, insurance, eligibility rules and property details." },
          { question: "What should I do with the result?", answer: "Use it to compare scenarios and identify the assumptions that matter most, then confirm the final numbers with the appropriate lender, insurer, tax office, provider or agency." },
        ]}
      />

      <Container className="py-12 sm:py-16">
        <article className="mx-auto max-w-5xl">
          <div className="border-t-2 border-foreground pt-8">{children}</div>
          <nav aria-label="More planning tools" className="mt-14 border-y border-border py-6">
            <p className="eyebrow text-primary">Keep planning</p>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
              <Link to="/decide/financial-tools" className="eyebrow border-b border-primary pb-1 text-primary">All calculators →</Link>
              <Link to="/moving-to-texas" className="eyebrow border-b border-primary pb-1 text-primary">Moving to Texas →</Link>
              <Link to="/browse/cities" className="eyebrow border-b border-primary pb-1 text-primary">City directory →</Link>
            </div>
          </nav>
          <p className="mt-6 max-w-3xl text-xs leading-6 text-muted-foreground">Use calculator results as planning estimates, not quotes or official determinations. Confirm rates, taxes, insurance, eligibility and property details with the appropriate provider or agency.</p>
        </article>
      </Container>
    </>
  );
}
