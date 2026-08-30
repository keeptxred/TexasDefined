import { createLazyFileRoute } from '@tanstack/react-router';
import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { OfficialHomeownershipCostCalculator } from '@/components/calculators/OfficialHomeownershipCostCalculator';

export const Route = createLazyFileRoute('/texas-homeownership-cost-calculator')({ component: TexasHomeownershipCostCalculatorPage });

function TexasHomeownershipCostCalculatorPage() {
  const { hub } = Route.useLoaderData();

  return (
    <CalculatorPage eyebrow="Beyond the mortgage" title="Texas homeownership cost calculator" description={hub.description}>
      <OfficialHomeownershipCostCalculator />

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-city-heading">
        <p className="eyebrow text-primary">{hub.local.eyebrow}</p>
        <h2 id="ownership-city-heading" className="mt-3 font-display text-3xl">{hub.local.title}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{hub.local.copy}</p>
        <div className="mt-6 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {hub.local.cards.map((card) => (
            <a key={card.href} href={card.href} className="group bg-background p-5">
              <strong className="font-display text-2xl group-hover:text-primary">{card.name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">Local ownership-cost calculator →</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="ownership-stack-heading">
        <p className="eyebrow text-primary">{hub.stack.eyebrow}</p>
        <h2 id="ownership-stack-heading" className="mt-3 font-display text-3xl">{hub.stack.title}</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {hub.stack.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-categories-heading">
        <p className="eyebrow text-primary">{hub.categories.eyebrow}</p>
        <h2 id="ownership-categories-heading" className="mt-3 font-display text-3xl">{hub.categories.title}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {hub.categories.cards.map((card) => (
            <div key={card.title} className="border border-border p-5">
              <strong className="font-display text-xl">{card.title}</strong>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-inspection-heading">
        <p className="eyebrow text-primary">{hub.inspection.eyebrow}</p>
        <h2 id="ownership-inspection-heading" className="mt-3 font-display text-3xl">{hub.inspection.title}</h2>
        <div className="mt-5 max-w-3xl space-y-4 text-base leading-7 text-muted-foreground">
          {hub.inspection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-compare-heading">
        <p className="eyebrow text-primary">{hub.comparison.eyebrow}</p>
        <h2 id="ownership-compare-heading" className="mt-3 font-display text-3xl">{hub.comparison.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {hub.comparison.cards.map((card) => (
            <div key={card.title} className="border border-border p-5">
              <strong className="font-display text-xl">{card.title}</strong>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-links-heading">
        <p className="eyebrow text-primary">{hub.links.eyebrow}</p>
        <h2 id="ownership-links-heading" className="mt-3 font-display text-3xl">{hub.links.title}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {hub.links.cards.map((card) => (
            <a key={card.href} href={card.href} className="border border-border p-5 hover:border-primary">
              <strong className="font-display text-xl">{card.name}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{card.copy}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="ownership-faq-heading">
        <p className="eyebrow text-primary">{hub.faq.eyebrow}</p>
        <h2 id="ownership-faq-heading" className="mt-3 font-display text-3xl">{hub.faq.title}</h2>
        <div className="mt-6 divide-y divide-border border-y border-border">
          {hub.faq.items.map((faq) => (
            <div key={faq.question} className="py-6">
              <h3 className="font-display text-2xl">{faq.question}</h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </CalculatorPage>
  );
}