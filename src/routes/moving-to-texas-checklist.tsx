import { createFileRoute } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink } from '@/lib/seo';

const description = 'A practical moving-to-Texas checklist covering housing, utilities, vehicles, licensing, schools, voting, insurance, and homestead filing.';

export const Route = createFileRoute('/moving-to-texas-checklist')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { title: 'Moving to Texas Checklist', description }),
    links: [canonicalLink(texasDefinedBrand, '/moving-to-texas-checklist')],
  }),
  component: Page,
});

const groups = [
  {
    title: 'Before the move',
    items: ['Confirm the lease or closing date and keep digital copies of the signed documents.', 'Compare electricity providers, internet service, water, trash, and natural-gas setup for the exact address.', 'Request insurance quotes using the Texas address, including wind, flood, hail, and foundation considerations where relevant.', 'Collect school, medical, employment, vehicle, pet, and identity records in one accessible folder.'],
  },
  {
    title: 'First two weeks',
    items: ['Complete the move-in inspection and photograph the condition of the home.', 'Update mailing addresses with banks, employers, insurers, subscriptions, and the Postal Service.', 'Confirm emergency alerts, evacuation routes, nearby urgent care, and local city or county services.', 'Register children with the correct school district and verify transportation and enrollment requirements.'],
  },
  {
    title: 'Vehicles and identification',
    items: ['Review current Texas Department of Motor Vehicles requirements for inspection, registration, title, and proof of insurance.', 'Schedule any required driver-license appointment with the Texas Department of Public Safety.', 'Keep receipts and confirmation numbers for every registration, title, and licensing transaction.', 'Update vehicle toll accounts and verify that license-plate information is correct.'],
  },
  {
    title: 'Taxes, voting, and the home',
    items: ['Check voter-registration eligibility and deadlines using official Texas election resources.', 'For an owner-occupied home, review the residence homestead exemption and file with the county appraisal district when eligible.', 'Save the deed, closing disclosure, survey, appraisal, insurance declarations, and exemption confirmation together.', 'Review the first appraisal notice and property-tax bill carefully rather than assuming the prior owner’s taxable value will continue.'],
  },
];

function Page() {
  return <Container className="py-16 sm:py-24">
    <article className="mx-auto max-w-4xl">
      <p className="eyebrow text-primary">Moving to Texas</p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl">Moving to Texas Checklist</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>
      <div className="mt-10 space-y-6">
        {groups.map((group) => <section key={group.title} className="rounded-lg border border-border p-6">
          <h2 className="font-display text-3xl">{group.title}</h2>
          <ul className="mt-5 space-y-4">
            {group.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="mt-1 inline-block h-5 w-5 shrink-0 rounded border border-border" /><span>{item}</span></li>)}
          </ul>
        </section>)}
      </div>
      <aside className="mt-8 rounded-lg bg-muted p-5 text-sm leading-6 text-muted-foreground">
        Requirements and deadlines change. Verify vehicle, licensing, voting, tax, school, and utility steps with the responsible state or local agency before acting.
      </aside>
    </article>
  </Container>;
}
