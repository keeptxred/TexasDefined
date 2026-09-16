import { createFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { texasDefinedBrand } from '@/brand/texasdefined';
import { buildMeta, canonicalLink, jsonLd } from '@/lib/seo';

const canonicalPath = '/texas-vehicle-registration-renewal';
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = 'Renew Texas vehicle registration online, by mail or in person. Check renewal timing, emissions rules, expired-registration limits and sticker delivery.';
const reviewedDate = 'September 14, 2026';

const faq = [
  {
    question: 'How early can I renew Texas vehicle registration?',
    answer: 'TxDMV says online renewal is available beginning 90 days before the registration expiration date.',
  },
  {
    question: 'Can I renew an expired Texas registration online?',
    answer: 'TxDMV says online renewal may remain available for up to 12 months after expiration when no citation for expired registration has been issued. The official renewal system determines eligibility.',
  },
  {
    question: 'Does Texas still require a safety inspection before registration renewal?',
    answer: 'Most non-commercial vehicles no longer need an annual safety inspection before registration. Vehicles registered in designated emissions counties still need a passing emissions inspection unless an exemption applies, and commercial-vehicle inspection rules are different.',
  },
  {
    question: 'How long can an online registration sticker take to arrive?',
    answer: 'TxDMV advises allowing approximately three weeks for processing, printing and mailing. The renewal receipt can serve as temporary proof of current registration while the sticker is in transit, subject to TxDMV guidance.',
  },
];

export const Route = createFileRoute('/texas-vehicle-registration-renewal')({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, {
      canonicalPath,
      title: 'Texas Vehicle Registration Renewal: Online & In Person',
      description,
    }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${pageUrl}#article`,
          headline: 'Texas Vehicle Registration Renewal Guide',
          description,
          url: pageUrl,
          mainEntityOfPage: pageUrl,
          dateModified: '2026-09-14',
          author: { '@type': 'Organization', name: 'TexasDefined' },
          publisher: { '@id': `${siteUrl}/#organization` },
          isPartOf: { '@id': `${siteUrl}/#website` },
        },
        {
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumbs`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Front page', item: `${siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Texas DMV', item: `${siteUrl}/texas-dmv` },
            { '@type': 'ListItem', position: 3, name: 'Vehicle registration', item: `${siteUrl}/texas-vehicle-registration` },
            { '@type': 'ListItem', position: 4, name: 'Registration renewal', item: pageUrl },
          ],
        },
      ],
    })],
  }),
  component: Page,
});

function Page() {
  return (
    <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
      <article className="mx-auto max-w-6xl">
        <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-dmv">Texas DMV</Link><span aria-hidden="true" className="mx-2">/</span>
          <Link to="/texas-vehicle-registration">Vehicle registration</Link><span aria-hidden="true" className="mx-2">/</span>
          <span aria-current="page" className="text-foreground">Renewal</span>
        </nav>

        <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div>
            <p className="eyebrow text-primary">Texas driving</p>
            <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Texas vehicle registration renewal</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
          </div>
          <div className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">
            <p className="font-semibold text-foreground">Reviewed {reviewedDate}</p>
            <p className="mt-2">Registration windows, emissions requirements and county procedures can change. The official links below are the final authority.</p>
          </div>
        </header>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Start here</p><h2 className="mt-2 font-display text-3xl">The fastest renewal path</h2></div>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>For an eligible personal vehicle, online renewal is usually the simplest option. TxDMV currently allows online renewal beginning 90 days before expiration and, when no expired-registration citation has been issued, for as long as 12 months after expiration.</p>
            <p>Before paying, confirm that the vehicle record and mailing address are correct, maintain required liability coverage, and complete emissions testing when the registration county and vehicle require it. Holds, citations, emissions failures or record problems can force a county-office transaction instead.</p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a className="rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground" href="https://txt.texas.gov/dmv/vehicle-registration-renewal" target="_blank" rel="noreferrer noopener">Renew with Texas by Texas ↗</a>
              <a className="rounded-md border border-border px-4 py-2 font-semibold text-foreground" href="https://www.txdmv.gov/motorists/register-your-vehicle" target="_blank" rel="noreferrer noopener">TxDMV renewal guidance ↗</a>
            </div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Three methods</p><h2 className="mt-2 font-display text-3xl">Online, mail or county office</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="border border-border p-5"><h3 className="font-display text-2xl">Online</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Use TxT or the TxDMV online renewal service when the record is eligible. Save the confirmation and verify the mailing address before submitting.</p></div>
            <div className="border border-border p-5"><h3 className="font-display text-2xl">By mail</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Follow the renewal notice and county instructions. Include the required renewal information, insurance and inspection documentation when applicable, and the amount shown for the transaction.</p></div>
            <div className="border border-border p-5"><h3 className="font-display text-2xl">In person</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">County tax assessor-collector offices provide registration renewals, and some counties use substations or approved subcontractors. Payment methods and local procedures vary.</p></div>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Inspection rules</p><h2 className="mt-2 font-display text-3xl">Safety inspection changed; emissions did not disappear</h2></div>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>Texas ended the annual safety-inspection requirement for most non-commercial vehicles on January 1, 2025. That does not mean every vehicle can renew without an inspection step. Non-commercial vehicles registered in designated emissions counties still need a passing emissions inspection before renewal unless an exemption applies, and commercial vehicles remain subject to separate inspection requirements.</p>
            <p>If you recently moved counties, check the current TxDMV list before renewing because the emissions rule follows the registration county. Do not rely on an older checklist or a prior county&apos;s requirements.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Expired registration</p><h2 className="mt-2 font-display text-3xl">Online eligibility is not the same as avoiding a citation</h2></div>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>TxDMV allows a limited grace period for operating a vehicle after registration expires, but an expired registration can still lead to a citation. If a citation has already been issued, the normal online renewal path may no longer be available. Follow the official renewal system and any court or county instructions tied to the citation.</p>
            <p>Renewing late does not automatically erase a prior violation. Keep the renewal receipt and any documentation required to resolve the citation separately.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Sticker delivery</p><h2 className="mt-2 font-display text-3xl">Keep the receipt while the sticker is in transit</h2></div>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>TxDMV advises allowing approximately three weeks for processing, printing and mailing after an online renewal. Its sticker-tracking guidance says the renewal receipt can be used as temporary proof of current registration while the sticker is being delivered.</p>
            <p>If the sticker does not arrive, use the official <a className="font-semibold underline decoration-primary/50 underline-offset-4" href="https://www.txdmv.gov/motorists/track" target="_blank" rel="noreferrer noopener">Where&apos;s My Sticker? tracker ↗</a> or contact the county tax office responsible for the registration.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">County offices</p><h2 className="mt-2 font-display text-3xl">When an office visit is the better route</h2></div>
          <div className="space-y-4 text-base leading-7 text-muted-foreground">
            <p>A county office is often the right next step when the online system rejects the transaction, the vehicle record needs correction, there is a hold or citation, inspection status is not matching, or the owner needs a service that is not available online.</p>
            <p><Link className="font-semibold underline decoration-primary/50 underline-offset-4" to="/find-my-dmv">Find the relevant Texas vehicle-service office</Link> before traveling, and verify hours, appointment rules and accepted payment methods directly with the county.</p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Frequently asked</p><h2 className="mt-2 font-display text-3xl">Renewal questions</h2></div>
          <div className="divide-y divide-border border-y border-border">{faq.map((item) => <details key={item.question} className="py-5"><summary className="cursor-pointer font-semibold text-foreground">{item.question}</summary><p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">{item.answer}</p></details>)}</div>
        </section>

        <section className="grid gap-8 py-10 lg:grid-cols-[15rem_1fr]">
          <div><p className="eyebrow text-primary">Official sources</p><h2 className="mt-2 font-display text-3xl">Verify before you submit</h2></div>
          <div className="space-y-3 text-sm leading-6">
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://www.txdmv.gov/motorists/register-your-vehicle" target="_blank" rel="noreferrer noopener">TxDMV: Register Your Vehicle ↗</a>
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://www.txdmv.gov/tax-assessor-collectors/county-tax-offices" target="_blank" rel="noreferrer noopener">TxDMV: County tax offices ↗</a>
            <a className="block font-semibold underline decoration-primary/50 underline-offset-4" href="https://www.txdmv.gov/motorists/track" target="_blank" rel="noreferrer noopener">TxDMV: Where&apos;s My Sticker? ↗</a>
            <p className="pt-2 text-muted-foreground">TexasDefined summarizes the process for planning. TxDMV, Texas.gov and the responsible county tax assessor-collector control the current transaction requirements.</p>
          </div>
        </section>
      </article>
    </Container>
  );
}
