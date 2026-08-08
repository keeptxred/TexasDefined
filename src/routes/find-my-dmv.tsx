import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'The basic steps for registering a vehicle after a move, plus the official state and county pages you’ll need along the way.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const canonicalPath = '/find-my-dmv';
const pageUrl = `${siteUrl}${canonicalPath}`;
const steps = [
  'Arrange insurance that meets Texas requirements.',
  'Complete any inspection or emissions step that applies to your vehicle and county.',
  'Gather your title, registration, identification and proof-of-residency documents.',
  'Check your county tax office for current fees, hours and accepted payment methods.',
  'Handle your Texas driver license separately through DPS.',
] as const;
const stepNames = [
  'Arrange Texas insurance',
  'Check inspection requirements',
  'Gather your documents',
  'Confirm county-office details',
  'Plan your driver-license visit',
] as const;

export const Route = createFileRoute('/find-my-dmv')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: 'Getting Your Car Settled in Texas', description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo', '@id': `${pageUrl}#howto`, url: pageUrl,
          name: 'How to register a vehicle after moving to Texas', description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          step: steps.map((text, index) => ({
            '@type': 'HowToStep', position: index + 1, name: stepNames[index],
            text, url: `${pageUrl}#vehicle-step-${index + 1}`,
          })),
        },
        {
          '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Getting Your Car Settled', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: Page,
});

function Page() {
  return (
    <main>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/moving-to-texas">Moving Here</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Vehicle registration</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">New in town</p>
              <h1 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">Getting your car settled in Texas</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
            </div>
            <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">County tax offices generally handle vehicle registration. The Texas Department of Public Safety handles driver licenses. They are separate stops with different requirements.</p>
          </header>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">The checklist</p><h2 className="mt-2 font-display text-3xl">What to handle first</h2></div>
            <ol className="divide-y divide-border border-y border-border">
              {steps.map((step, index) => <li id={`vehicle-step-${index + 1}`} key={step} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-display text-xl">{stepNames[index]}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{step}</p></div></li>)}
            </ol>
          </section>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Official sources</p><h2 className="mt-2 font-display text-3xl">Check before you drive over</h2></div>
            <div className="grid sm:grid-cols-2">
              <a className="group border-t border-border py-5 sm:px-5" href="https://www.txdmv.gov/motorists/new-to-texas" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">Official TxDMV steps</span><span className="ml-2 text-sm">↗</span></a>
              <a className="group border-t border-border py-5 sm:px-5" href="https://www.dps.texas.gov/section/driver-license" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">Driver-license information</span><span className="ml-2 text-sm">↗</span></a>
              <Link className="group border-t border-border py-5 sm:px-5" to="/browse/counties"><span className="font-display text-xl group-hover:text-primary">Find your county office</span><span className="ml-2 text-sm">→</span></Link>
              <Link className="group border-t border-border py-5 sm:px-5" to="/moving-to-texas-checklist"><span className="font-display text-xl group-hover:text-primary">Moving checklist</span><span className="ml-2 text-sm">→</span></Link>
            </div>
          </section>

          <aside className="py-6 text-sm leading-6 text-muted-foreground">Before you go, use the official state and county pages for current office locations, fees, deadlines and document requirements.</aside>
        </article>
      </Container>
    </main>
  );
}
