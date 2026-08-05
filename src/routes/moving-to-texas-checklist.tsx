import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'The practical things worth handling before the boxes arrive, during your first weeks and after the new address starts to feel like home.';

export const Route = createFileRoute('/moving-to-texas-checklist')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath: '/moving-to-texas-checklist',
      title: 'Moving to Texas Checklist',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, '/moving-to-texas-checklist')],
  }),
  component: Page,
});

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
];

function Page() {
  return (
    <Container className="py-16 sm:py-24">
      <article className="mx-auto max-w-4xl">
        <p className="eyebrow text-primary">Moving Here</p>
        <h1 className="mt-3 font-display text-4xl sm:text-6xl">A smoother first month in Texas</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
        <div className="mt-10 space-y-6">
          {groups.map((group) => (
            <section key={group.title} className="rounded-lg border border-border p-6">
              <h2 className="font-display text-3xl">{group.title}</h2>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 inline-block h-5 w-5 shrink-0 rounded border border-border" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <aside className="mt-8 rounded-lg bg-muted p-5 text-sm leading-6 text-muted-foreground">Rules and deadlines can change. Check the responsible state or local office before acting on vehicle, license, voting, tax, school or utility requirements.</aside>
      </article>
    </Container>
  );
}
