import type { ReactNode } from 'react';

import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import type { TransactionFinancePage } from '@/data/transaction-finance-pages.server';

export function TransactionFinanceAuthorityPage({ page, calculator }: { page: TransactionFinancePage; calculator: ReactNode }) {
  return (
    <CalculatorPage eyebrow={page.eyebrow} title={page.title} description={page.description}>
      {calculator}

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="transaction-explanation-heading">
        <p className="eyebrow text-primary">{page.explanation.eyebrow}</p>
        <h2 id="transaction-explanation-heading" className="mt-3 font-display text-3xl">{page.explanation.title}</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">{page.explanation.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="transaction-workflow-heading">
        <p className="eyebrow text-primary">{page.workflow.eyebrow}</p>
        <h2 id="transaction-workflow-heading" className="mt-3 font-display text-3xl">{page.workflow.title}</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">{page.workflow.steps.map((step, index) => <li key={step} className="border border-border p-5"><span className="eyebrow text-primary">Step {index + 1}</span><p className="mt-3 text-sm leading-7 text-muted-foreground">{step}</p></li>)}</ol>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="transaction-links-heading">
        <p className="eyebrow text-primary">Related calculations</p>
        <h2 id="transaction-links-heading" className="mt-3 font-display text-3xl">Put this number into the rest of the transaction</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{page.links.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.copy}</span></a>)}</div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="transaction-sources-heading">
        <p className="eyebrow text-primary">Documents and guidance</p>
        <h2 id="transaction-sources-heading" className="mt-3 font-display text-3xl">Replace planning inputs with transaction-specific figures</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{page.sources.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.copy}</span></a>)}</div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="transaction-faq-heading">
        <p className="eyebrow text-primary">Common questions</p>
        <h2 id="transaction-faq-heading" className="mt-3 font-display text-3xl">{page.title} FAQ</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">{page.faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div>
      </section>

      <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">{page.disclaimer}</p>
    </CalculatorPage>
  );
}
