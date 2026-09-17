import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { Container } from '@/components/layout/Container';
import { description, pageTitle, stepNames, steps } from './find-my-dmv';

export const Route = createLazyFileRoute('/find-my-dmv')({
  component: Page,
});

function Page() {
  return (
    <>
      <Container className="pb-16 pt-12 sm:pb-24 sm:pt-16">
        <article className="mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="border-b border-border pb-4 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <Link to="/">Front page</Link><span aria-hidden="true" className="mx-2">/</span><Link to="/moving-to-texas">Moving Here</Link><span aria-hidden="true" className="mx-2">/</span><span aria-current="page" className="text-foreground">Find My DMV</span>
          </nav>

          <header className="grid gap-8 border-b border-border py-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <p className="eyebrow text-primary">Texas vehicle services</p>
              <h1 className="mt-3 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">{pageTitle}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
            </div>
            <p className="border-l border-border pl-6 text-sm leading-6 text-muted-foreground">Texas splits services that other states may put under one DMV. County tax offices handle most vehicle title and registration transactions, TxDMV regional centers handle selected title and registration issues, and DPS handles driver licenses and IDs.</p>
          </header>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Start here</p><h2 className="mt-2 font-display text-3xl">Which Texas office do you need?</h2></div>
            <div className="grid gap-4 md:grid-cols-3">
              <a className="border border-border p-5 transition-colors hover:border-primary" href="https://www.txdmv.gov/find-your-local-tax-office-dmv" target="_blank" rel="noreferrer noopener">
                <p className="eyebrow text-primary">Most vehicle services</p>
                <h3 className="mt-2 font-display text-2xl">County tax office</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Use your county tax assessor-collector for most vehicle registrations, renewals, title transfers, address changes and related local transactions.</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary">Find your local tax office & DMV ↗</span>
              </a>
              <a className="border border-border p-5 transition-colors hover:border-primary" href="https://www.txdmv.gov/regional-service-centers" target="_blank" rel="noreferrer noopener">
                <p className="eyebrow text-primary">Selected title issues</p>
                <h3 className="mt-2 font-display text-2xl">TxDMV regional center</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Regional service centers handle selected matters such as replacement titles, bonded-title rejection letters, title errors and title-history inquiries.</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary">Find a TxDMV regional center ↗</span>
              </a>
              <a className="border border-border p-5 transition-colors hover:border-primary" href="https://www.dps.texas.gov/apps/Rolodex/index.asp" target="_blank" rel="noreferrer noopener">
                <p className="eyebrow text-primary">Licenses and IDs</p>
                <h3 className="mt-2 font-display text-2xl">DPS driver license office</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">Driver licenses and state identification cards are handled by the Texas Department of Public Safety rather than the county vehicle-registration office.</p>
                <span className="mt-4 inline-block text-sm font-semibold text-primary">Find a driver license office ↗</span>
              </a>
            </div>
          </section>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">New to Texas</p><h2 className="mt-2 font-display text-3xl">Vehicle registration checklist</h2></div>
            <div>
              <p className="mb-5 max-w-3xl text-sm leading-6 text-muted-foreground">For non-commercial vehicles, Texas ended the statewide safety-inspection requirement in 2025, but emissions testing still applies in designated counties. Commercial-vehicle inspection rules are different. Check TxDMV for the requirement that applies to your vehicle and county before you visit an office.</p>
              <ol className="divide-y divide-border border-y border-border">
                {steps.map((step, index) => <li id={`vehicle-step-${index + 1}`} key={step} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]"><span className="font-display text-3xl text-primary">{String(index + 1).padStart(2, '0')}</span><div><h3 className="font-display text-xl">{stepNames[index]}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{step}</p></div></li>)}
              </ol>
            </div>
          </section>

          <section className="grid gap-8 border-b border-border py-10 lg:grid-cols-[15rem_1fr]">
            <div><p className="eyebrow text-primary">Official sources</p><h2 className="mt-2 font-display text-3xl">Check before you drive over</h2></div>
            <div className="grid sm:grid-cols-2">
              <a className="group border-t border-border py-5 sm:px-5" href="https://www.txdmv.gov/motorists/new-to-texas" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">Official TxDMV new-to-Texas steps</span><span className="ml-2 text-sm">↗</span></a>
              <a className="group border-t border-border py-5 sm:px-5" href="https://www.dps.texas.gov/section/driver-license" target="_blank" rel="noreferrer noopener"><span className="font-display text-xl group-hover:text-primary">Driver-license information</span><span className="ml-2 text-sm">↗</span></a>
              <Link className="group border-t border-border py-5 sm:px-5" to="/find-my-county"><span className="font-display text-xl group-hover:text-primary">Find your county by address</span><span className="ml-2 text-sm">→</span></Link>
              <Link className="group border-t border-border py-5 sm:px-5" to="/browse/counties"><span className="font-display text-xl group-hover:text-primary">Browse all Texas counties</span><span className="ml-2 text-sm">→</span></Link>
              <Link className="group border-t border-border py-5 sm:px-5" to="/texas-vehicle-registration"><span className="font-display text-xl group-hover:text-primary">Texas vehicle registration guide</span><span className="ml-2 text-sm">→</span></Link>
              <Link className="group border-t border-border py-5 sm:px-5" to="/moving-to-texas-checklist"><span className="font-display text-xl group-hover:text-primary">Moving checklist</span><span className="ml-2 text-sm">→</span></Link>
            </div>
          </section>

          <aside className="py-6 text-sm leading-6 text-muted-foreground">Office locations, appointments, fees and document requirements can change. Confirm your transaction with TxDMV, DPS and your county tax office before traveling.</aside>
        </article>
      </Container>
    </>
  );
}
