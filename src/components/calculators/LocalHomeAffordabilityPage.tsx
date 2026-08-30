import type { ReactNode } from 'react';

import { CalculatorPage } from '@/components/calculators/CalculatorPage';
import { AffordabilityCalculator } from '@/components/calculators/TexasPlanningCalculators';
import type { LocalHomeAffordabilityProfile } from '@/data/local-home-affordability';

export type LocalHousingPlannerLink = {
  href: string;
  title: string;
  copy: string;
  action?: string;
};

type LocalHousingPlannerProps = {
  profile: LocalHomeAffordabilityProfile;
  calculator: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  breadcrumbLabel: string;
  breadcrumbHref: string;
  planningEyebrow: string;
  planningTitle: string;
  linksEyebrow: string;
  linksTitle: string;
  links: readonly LocalHousingPlannerLink[];
  faqTitle: string;
  faqs: readonly { question: string; answer: string }[];
  disclaimer: string;
  related?: {
    eyebrow: string;
    title: string;
    copy: string;
    items: readonly { path: string; name: string }[];
  };
  next?: {
    eyebrow: string;
    title: string;
    links: readonly LocalHousingPlannerLink[];
  };
};

export function LocalHousingPlannerPage(props: LocalHousingPlannerProps) {
  const { profile } = props;
  return (
    <CalculatorPage eyebrow={props.eyebrow} title={props.title} description={props.description}>
      <nav aria-label="Breadcrumb" className="mb-8 border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
        <a href="/">Front page</a><span className="mx-2">/</span><a href={props.breadcrumbHref}>{props.breadcrumbLabel}</a><span className="mx-2">/</span><span>{profile.name}</span>
      </nav>
      <div className="max-w-3xl space-y-4 text-base leading-7 text-muted-foreground"><p>{props.intro}</p><p>{profile.housingContext}</p></div>
      {props.calculator}

      <section className="mt-14 border-t border-border pt-10" aria-labelledby="local-housing-plan-heading">
        <p className="eyebrow text-primary">{props.planningEyebrow}</p>
        <h2 id="local-housing-plan-heading" className="mt-3 font-display text-3xl">{props.planningTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">{profile.planningPoints.map((point, index) => <div key={point} className="border border-border p-5"><span className="eyebrow text-primary">Check {index + 1}</span><p className="mt-3 text-sm leading-7 text-muted-foreground">{point}</p></div>)}</div>
      </section>

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-housing-links-heading">
        <p className="eyebrow text-primary">{props.linksEyebrow}</p>
        <h2 id="local-housing-links-heading" className="mt-3 font-display text-3xl">{props.linksTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{props.links.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-xl">{item.title}</strong><span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.copy}</span>{item.action ? <span className="eyebrow mt-5 inline-block text-primary">{item.action} →</span> : null}</a>)}</div>
      </section>

      {props.related?.items.length ? <section className="mt-12 border-t border-border pt-10" aria-labelledby="related-local-housing-heading"><p className="eyebrow text-primary">{props.related.eyebrow}</p><h2 id="related-local-housing-heading" className="mt-3 font-display text-3xl">{props.related.title}</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{props.related.copy}</p><div className="mt-6 flex flex-wrap gap-3">{props.related.items.map((item) => <a key={item.path} href={item.path} className="border border-border px-4 py-3 font-semibold hover:border-primary/60 hover:text-primary">{item.name} affordability calculator →</a>)}</div></section> : null}

      {props.next ? <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-housing-next-heading"><p className="eyebrow text-primary">{props.next.eyebrow}</p><h2 id="local-housing-next-heading" className="mt-3 font-display text-3xl">{props.next.title}</h2><div className="mt-6 grid gap-4 md:grid-cols-3">{props.next.links.map((item) => <a key={item.href} href={item.href} className="border border-border p-5 hover:border-primary/60"><strong className="font-display text-2xl">{item.title}</strong><span className="mt-3 block text-sm leading-6 text-muted-foreground">{item.copy}</span>{item.action ? <span className="eyebrow mt-5 inline-block text-primary">{item.action} →</span> : null}</a>)}</div></section> : null}

      <section className="mt-12 border-t border-border pt-10" aria-labelledby="local-housing-faq-heading"><p className="eyebrow text-primary">Common questions</p><h2 id="local-housing-faq-heading" className="mt-3 font-display text-3xl">{props.faqTitle}</h2><div className="mt-6 divide-y divide-border border-y border-border">{props.faqs.map((faq) => <div key={faq.question} className="py-6"><h3 className="font-display text-2xl">{faq.question}</h3><p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{faq.answer}</p></div>)}</div></section>
      <p className="mt-10 border-t border-border pt-6 text-sm leading-6 text-muted-foreground">{props.disclaimer}</p>
    </CalculatorPage>
  );
}

const nextCalculators: readonly LocalHousingPlannerLink[] = [
  { title: 'Mortgage payment', href: '/texas-mortgage-calculator', copy: 'Turn a purchase-price scenario into an estimated monthly principal, interest, tax and insurance payment.' },
  { title: 'Down payment', href: '/texas-down-payment-calculator', copy: 'Compare the cash required for the down payment with closing costs and the reserves you want to keep.' },
  { title: 'Closing costs', href: '/texas-closing-cost-calculator', copy: 'Model transaction costs separately so the home-price target does not consume cash needed to complete the purchase.' },
];

export function LocalHomeAffordabilityPage({ profile }: { profile: LocalHomeAffordabilityProfile }) {
  const ownershipPath = `/texas-homeownership-cost-calculator/${profile.slug}`;
  const links: LocalHousingPlannerLink[] = [
    { href: profile.propertyTaxHref, title: profile.propertyTaxLabel, copy: 'Build a property-tax estimate from the county, school, city and applicable special-district rates for the parcel.', action: 'Open tax calculator' },
    { href: ownershipPath, title: `${profile.name} homeownership cost calculator`, copy: 'Turn the affordability range into a fuller monthly budget with mortgage, taxes, insurance, utilities, maintenance and HOA or district costs.', action: 'Build ownership budget' },
    { href: profile.relocationHref, title: profile.relocationLabel, copy: 'Compare the local factors outside the mortgage payment: jurisdiction, schools, commute, utilities, services and other recurring costs.', action: 'Open local guide' },
  ];
  return <LocalHousingPlannerPage profile={profile} calculator={<AffordabilityCalculator />} eyebrow={profile.eyebrow} title={profile.title} description={profile.description} intro={profile.intro} breadcrumbLabel="Home affordability" breadcrumbHref="/texas-home-affordability-calculator" planningEyebrow="Make the estimate local" planningTitle={`What to verify before calling a ${profile.name} home affordable`} linksEyebrow="Use the exact address" linksTitle="Replace generic assumptions with local property costs" links={links} faqTitle={`${profile.name} home affordability FAQ`} faqs={profile.faqs} disclaimer="This is a planning calculator, not a lending decision, appraisal, tax statement or insurance quote. Verify the actual property, financing terms and recurring ownership costs before making a financial commitment." related={profile.relatedLocalCalculators?.length ? { eyebrow: 'County-to-city planning', title: 'Compare the city context inside the same regional housing decision', copy: 'County boundaries are useful for taxes and records, while city pages add another layer of local ownership and relocation context. Keep the exact parcel as the source of truth when the two overlap.', items: profile.relatedLocalCalculators } : undefined} next={{ eyebrow: 'Keep testing the budget', title: 'Run the next home-buying calculations', links: nextCalculators }} />;
}
