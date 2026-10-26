import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-dmv")({
  component: TexasDmvPage,
});

const services = [
  { title: "Driver licenses and state IDs", detail: "New license, REAL ID, renewal, replacement, appointments, and CDL credentials are DPS services, not TxDMV transactions.", href: "/texas-drivers-license", agency: "Texas DPS" },
  { title: "Register a vehicle", detail: "Understand registration, county tax-office transactions, new residents, and vehicle documentation.", href: "/texas-vehicle-registration", agency: "TxDMV + county" },
  { title: "Renew registration", detail: "Review renewal methods, deadlines, and emissions-testing considerations before paying.", href: "/texas-vehicle-registration-renewal", agency: "TxDMV + county" },
  { title: "Vehicle fees and taxes", detail: "Review registration charges, motor vehicle sales tax, private-party taxable value, and electric-vehicle fees.", href: "/texas-vehicle-registration-fees-taxes", agency: "TxDMV + Comptroller" },
  { title: "Find a local office", detail: "Locate the appropriate county office or DPS location before making a trip.", href: "/find-my-dmv", agency: "County / DPS" },
] as const;

function TexasDmvPage() {
  return (
    <>
      <PrioritySearchPage data={Route.useLoaderData()} />
      <section aria-labelledby="dmv-task-finder" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Start with the correct agency</p>
        <h2 id="dmv-task-finder" className="mt-2 font-display text-3xl">Choose your Texas vehicle or driver service</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Texas does not have one office for every driving task. DPS issues driving credentials; TxDMV oversees titles and registration; county tax assessor-collectors handle many title and registration transactions. Choose your task below before scheduling an appointment.</p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {services.map((service) => (
            <Link key={service.href} to={service.href} className="group border border-border p-5  hover:bg-muted/30 ">
              <span className="text-xs font-semibold text-primary">{service.agency}</span>
              <h3 className="mt-2 font-display text-2xl text-foreground">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.detail}</p>
              <span className="mt-4 text-sm font-semibold text-primary">Open guide →</span>
            </Link>
          ))}
        </div>
      </section>
      <section aria-labelledby="dmv-official-sources" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <h2 id="dmv-official-sources" className="font-display text-2xl">Verify with the agency responsible</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Official rules, eligibility, fees, forms, and appointment procedures may change. Check the responsible agency before applying or paying.</p>
        <ul className="mt-4 list-disc space-y-3 pl-5">
          <li><a className="underline underline-offset-4" href="https://www.txdmv.gov/" target="_blank" rel="noopener noreferrer">Texas Department of Motor Vehicles</a> — titles, registration, license plates, dealer and motor carrier services</li>
          <li><a className="underline underline-offset-4" href="https://www.dps.texas.gov/section/driver-license" target="_blank" rel="noopener noreferrer">Texas Department of Public Safety</a> — driver licenses, IDs, CDL and appointments</li>
          <li><a className="underline underline-offset-4" href="https://comptroller.texas.gov/taxes/motor-vehicle/" target="_blank" rel="noopener noreferrer">Texas Comptroller</a> — motor vehicle sales and use tax</li>
        </ul>
      </section>
    </>
  );
}
