import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const description = 'The practical things worth handling before the boxes arrive, during your first weeks and after the new address starts to feel like home.';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}/moving-to-texas-checklist`;

const groups = [
  {
    title: 'Before the moving truck',
    items: ['Confirm your lease or closing date and keep digital copies of every signed document.', 'Compare electricity, internet, water, trash and gas service for the exact address.', 'Request insurance quotes that account for wind, flood, hail and foundation concerns where they matter.', 'Keep school, medical, employment, vehicle, pet and identity records together in one easy-to-reach folder.'],
  },
  {
    title: 'Your first two weeks',
    items: ['Photograph the home and complete the move-in inspection before unpacking takes over.', 'Update your address with banks, employers, insurers, subscriptions and the Postal Service.', 'Sign up for local emergency alerts and find nearby urgent care, city services and evacuation routes.', 'Confirm the correct school district, enrollment documents and transportation details.'],
  },
  {
    title: 'Cars, licenses and getting around',
    items: ['Check the current TxDMV requirements for registration, title, inspection and insurance.', 'Schedule any driver-license appointment you need through the Texas Department of Public Safety.', 'Save receipts and confirmation numbers for registration, title and licensing visits.', 'Update toll-road accounts and double-check every license-plate number.'],
  },
  {
    title: 'The home, taxes and paperwork',
    items: ['Check voter-registration eligibility and deadlines through official state sources.', 'For an owner-occupied home, review the residence homestead exemption and file when eligible.', 'Keep the deed, closing disclosure, survey, appraisal, insurance paperwork and exemption confirmation together.', 'Read the first appraisal notice and property-tax bill carefully; the previous owner’s taxable value may not carry over.'],
  },
] as const;

const howToSections = groups.map((group, groupIndex) => ({
  '@type': 'HowToSection',
  position: groupIndex + 1,
  name: group.title,
  itemListElement: group.items.map((item, itemIndex) => ({
    '@type': 'HowToStep',
    position: itemIndex + 1,
    name: item,
    text: item,
    url: `${pageUrl}#step-${groupIndex + 1}-${itemIndex + 1}`,
  })),
}));

export const Route = createFileRoute('/moving-to-texas-checklist')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/moving-to-texas-checklist',
      title: 'A Smoother First Month in Texas',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/moving-to-texas-checklist')],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#page`,
          url: pageUrl,
          name: 'A Smoother First Month in Texas',
          description,
          isPartOf: { '@id': `${siteUrl}/#website` },
          mainEntity: { '@id': `${pageUrl}#howto` },
          breadcrumb: { '@id': `${pageUrl}#breadcrumbs` },
        },
        {
          '@type': 'HowTo',
          '@id': `${pageUrl}#howto`,
          name: 'A moving checklist for your first month in Texas',
          description,
          step: howToSections,
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Moving Here', item: `${siteUrl}/moving-to-texas` },
            { '@type': 'ListItem', position: 3, name: 'Moving Checklist', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-4xl">
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
          <ol className="flex items-center gap-2">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/moving-to-texas" className="hover:text-foreground">Moving Here</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">Moving Checklist</li>
          </ol>
        </nav>
        <p className="eyebrow mt-8 text-primary">Moving Here</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">A smoother first month in Texas</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
          Work through it in order or jump to the part that matches where you are in the move.
        </p>
        <div className="mt-10 space-y-6">
          {groups.map((group, groupIndex) => (
            <section key={group.title} className="rounded-lg border border-border p-6">
              <p className="eyebrow text-primary">Step {groupIndex + 1}</p>
              <h2 className="mt-2 font-display text-3xl">{group.title}</h2>
              <ul className="mt-5 space-y-4">
                {group.items.map((item, itemIndex) => (
                  <li id={`step-${groupIndex + 1}-${itemIndex + 1}`} key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 inline-block h-5 w-5 shrink-0 rounded border border-border" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="mt-8 rounded-lg bg-muted p-5 text-sm leading-6 text-muted-foreground">
          One last check: rules and deadlines can change. Confirm vehicle, license, voting, tax, school and utility details with the responsible state or local office.
        </aside>
      </article>
    </Container>
  );
}
