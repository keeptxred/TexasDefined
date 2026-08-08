import { Link } from '@tanstack/react-router';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export type PropertyGuideSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type PropertyGuideFaq = { question: string; answer: string };

const GUIDE_LINK_LABELS: Record<string, string> = {
  '/learn/property-taxes': 'Complete property-tax guide',
  '/decide/property-taxes': 'Property-tax estimator',
  '/learn/appraisal-districts': 'Appraisal districts',
  '/do/homestead-exemption': 'Homestead exemption',
  '/do/property-tax-protest': 'Property-tax protest',
  '/learn/agricultural-valuation': 'Agricultural valuation',
  '/learn/wildlife-management-valuation': 'Wildlife-management valuation',
  '/learn/disabled-veteran-property-tax-benefits': 'Disabled-veteran property-tax benefits',
  '/learn/over-65-property-tax-guide': 'Age-65 property-tax guide',
  '/learn/mud-taxes-explained': 'MUD taxes explained',
  '/learn/property-tax-deadlines': 'Property-tax deadlines',
  '/learn/property-tax-appeals-arbitration': 'Appeals and arbitration',
  '/learn/homebuyer-property-tax-checklist': 'Homebuyer property-tax checklist',
};

function guideLinkLabel(path: string) {
  if (GUIDE_LINK_LABELS[path]) return GUIDE_LINK_LABELS[path];
  const last = path.split('/').filter(Boolean).at(-1) ?? path;
  return last.replaceAll('-', ' ').replace(/\b\w/g, (character) => character.toUpperCase());
}

export function PropertyClusterGuidePage({ eyebrow, title, intro, sections, faqs, officialUrl, officialLabel }: { eyebrow: string; title: string; intro: string; sections: PropertyGuideSection[]; faqs: PropertyGuideFaq[]; officialUrl: string; officialLabel: string }) {
  return (
    <article>
      <section className="border-b border-border bg-surface">
        <Container className="py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-foreground">Front page</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/decide/financial-tools" className="hover:text-foreground">Money & Property</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-foreground">Property-tax guides</li>
            </ol>
          </nav>
          <div className="mt-10 border-t border-border pt-8">
            <p className="eyebrow text-primary">{eyebrow}</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] text-foreground sm:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{intro}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground"><span>Based on official Texas sources</span><span>Reviewed August 6, 2026</span></div>
          </div>
        </Container>
      </section>

      <Container className="py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <aside className="h-fit border-t-2 border-foreground pt-5 lg:sticky lg:top-28">
            <p className="eyebrow text-primary">In this guide</p>
            <nav className="mt-4 divide-y divide-border text-sm">
              {sections.map((section) => <a key={section.id} href={`#${section.id}`} className="block py-3 text-muted-foreground transition-colors hover:text-primary">{section.title}</a>)}
              <a href="#faq" className="block py-3 text-muted-foreground transition-colors hover:text-primary">Questions & answers</a>
            </nav>
          </aside>

          <div className="max-w-3xl">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className={`scroll-mt-28 ${index === 0 ? '' : 'mt-14 border-t border-border pt-10'}`}>
                <p className="eyebrow text-primary">{String(index + 1).padStart(2, '0')}</p>
                <h2 className="mt-3 font-display text-4xl leading-tight text-foreground">{section.title}</h2>
                <div className="mt-5 space-y-5 text-base leading-8 text-muted-foreground">{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                {section.bullets?.length ? <ul className="mt-6 divide-y divide-border border-y border-border text-sm leading-7 text-muted-foreground">{section.bullets.map((item) => <li key={item} className="py-3">{item.startsWith('/') ? <Link to={item} className="group flex items-center justify-between gap-4 font-semibold text-foreground transition-colors hover:text-primary"><span>{guideLinkLabel(item)}</span><span aria-hidden="true" className="text-primary">→</span></Link> : item}</li>)}</ul> : null}
              </section>
            ))}

            <section id="faq" className="mt-16 scroll-mt-28 border-t border-border pt-10">
              <p className="eyebrow text-primary">Questions & answers</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-foreground">What readers usually ask</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="cursor-pointer font-display text-xl text-foreground">{faq.question}</summary><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{faq.answer}</p></details>)}
              </div>
            </section>

            <section className="mt-14 border-t-2 border-foreground pt-6">
              <p className="eyebrow text-primary">Official Texas source</p>
              <a href={officialUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary">{officialLabel}<ExternalLink className="h-4 w-4" /></a>
            </section>

            <section className="mt-14 border-t border-border pt-8">
              <p className="eyebrow text-primary">Continue the research</p>
              <div className="mt-5 grid border-t border-border sm:grid-cols-2">
                <Link to="/learn/property-taxes" className="group border-b border-border py-5 sm:border-r sm:pr-6"><strong className="font-display text-2xl group-hover:text-primary">Complete property-tax guide</strong></Link>
                <Link to="/decide/property-taxes" className="group border-b border-border py-5 sm:pl-6"><strong className="font-display text-2xl group-hover:text-primary">Property-tax calculator</strong></Link>
                <Link to="/do/homestead-exemption" className="group border-b border-border py-5 sm:border-r sm:pr-6"><strong className="font-display text-2xl group-hover:text-primary">Homestead exemption</strong></Link>
                <Link to="/do/property-tax-protest" className="group border-b border-border py-5 sm:pl-6"><strong className="font-display text-2xl group-hover:text-primary">Property-tax protest</strong></Link>
              </div>
            </section>
          </div>
        </div>
      </Container>
    </article>
  );
}
