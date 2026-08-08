import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'The practical things worth handling before the boxes arrive, during your first weeks and after the new address starts to feel like home.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/moving-to-texas-checklist`;

const groups = [
  { title: 'Before the moving truck', items: ['Confirm your lease or closing date and keep digital copies of every signed document.', 'Compare electricity, internet, water, trash and gas service for the exact address.', 'Request insurance quotes that account for wind, flood, hail and foundation concerns where they matter.', 'Keep school, medical, employment, vehicle, pet and identity records together in one easy-to-reach folder.'] },
  { title: 'Your first two weeks', items: ['Photograph the home and complete the move-in inspection before unpacking takes over.', 'Update your address with banks, employers, insurers, subscriptions and the Postal Service.', 'Sign up for local emergency alerts and find nearby urgent care, city services and evacuation routes.', 'Confirm the correct school district, enrollment documents and transportation details.'] },
  { title: 'Cars, licenses and getting around', items: ['Check the current TxDMV requirements for registration, title, inspection and insurance.', 'Schedule any driver-license appointment you need through the Texas Department of Public Safety.', 'Save receipts and confirmation numbers for registration, title and licensing visits.', 'Update toll-road accounts and double-check every license-plate number.'] },
  { title: 'The home, taxes and paperwork', items: ['Check voter-registration eligibility and deadlines through official state sources.', 'For an owner-occupied home, review the residence homestead exemption and file when eligible.', 'Keep the deed, closing disclosure, survey, appraisal, insurance paperwork and exemption confirmation together.', 'Read the first appraisal notice and property-tax bill carefully; the previous owner’s taxable value may not carry over.'] },
] as const;

const howToSections = groups.map((group, groupIndex) => ({ '@type': 'HowToSection', position: groupIndex + 1, name: group.title, itemListElement: group.items.map((item, itemIndex) => ({ '@type': 'HowToStep', position: itemIndex + 1, name: item, text: item, url: `${pageUrl}#step-${groupIndex + 1}-${itemIndex + 1}` })) }));

export const Route = createFileRoute('/moving-to-texas-checklist')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath: '/moving-to-texas-checklist', title: 'A Smoother First Month in Texas', description }),
    links: [canonicalLink(texasDefinedBrand, '/moving-to-texas-checklist')],
    scripts: [jsonLd({ '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': `${pageUrl}#page`, url: pageUrl, name: 'A Smoother First Month in Texas', description, isPartOf: { '@id': `${siteUrl}/#website` }, mainEntity: { '@id': `${pageUrl}#howto` }, breadcrumb: { '@id': `${pageUrl}#breadcrumbs` } },
      { '@type': 'HowTo', '@id': `${pageUrl}#howto`, name: 'A moving checklist for your first month in Texas', description, step: howToSections },
      { '@type': 'BreadcrumbList', '@id': `${pageUrl}#breadcrumbs`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` }, { '@type': 'ListItem', position: 3, name: 'First Month Checklist', item: pageUrl }] },
    ] })],
  }),
  component: Page,
});

function Page() {
  return <>
    <section className="border-b border-border bg-surface">
      <Container className="py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex items-center gap-2"><li><Link to="/" className="hover:text-foreground">Front page</Link></li><li aria-hidden>·</li><li><Link to="/moving-to-texas" className="hover:text-foreground">Moving Here</Link></li><li aria-hidden>·</li><li aria-current="page" className="text-foreground">First Month Checklist</li></ol></nav>
        <p className="eyebrow mt-8 text-primary">The moving checklist</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.98] sm:text-7xl">A smoother first month in Texas</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </Container>
    </section>

    <Container className="py-14 sm:py-20">
      <article className="mx-auto max-w-4xl">
        <p className="max-w-2xl text-base leading-8 text-muted-foreground">Work through the list in order, or jump to the part that matches where you are in the move.</p>
        <div className="mt-12 border-t-2 border-foreground">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="grid gap-6 border-b border-border py-9 sm:grid-cols-[9rem_1fr]">
              <div><p className="eyebrow text-primary">Part {groupIndex + 1}</p></div>
              <div>
                <h2 className="font-display text-3xl leading-tight sm:text-4xl">{group.title}</h2>
                <ol className="mt-6 divide-y divide-border">
                  {group.items.map((item, itemIndex) => (
                    <li id={`step-${groupIndex + 1}-${itemIndex + 1}`} key={item} className="grid gap-3 py-4 sm:grid-cols-[2rem_1fr]">
                      <span aria-hidden className="font-display text-xl text-primary">{itemIndex + 1}</span>
                      <span className="text-sm leading-7 text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          ))}
        </div>
        <aside className="mt-10 border-t border-border pt-6 text-sm leading-7 text-muted-foreground"><p className="eyebrow text-primary">Before you rely on it</p><p className="mt-3">Rules and deadlines can change. Confirm vehicle, license, voting, tax, school and utility details with the responsible state or local office.</p></aside>
      </article>
    </Container>
  </>;
}
