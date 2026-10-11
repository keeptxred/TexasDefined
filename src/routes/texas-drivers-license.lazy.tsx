import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-drivers-license")({
  component: TexasDriversLicensePage,
});

const steps = [
  { title: "First Texas license or state ID", text: "Confirm residency, identity, Social Security number requirements, lawful presence and any testing or education rules before booking a DPS appointment." },
  { title: "Renew or replace", text: "Check whether you qualify for online services before visiting a driver-license office. A lost card, expiration, or required in-person update may change the process." },
  { title: "REAL ID", text: "Check whether your existing card has the REAL ID star and use DPS's document checklist if an upgrade or first issuance is needed." },
  { title: "Commercial driver license (CDL)", text: "CDL classes, endorsements, commercial learner permits, medical qualifications and entry-level driver training have separate eligibility rules." },
] as const;

function TexasDriversLicensePage() {
  return (
    <>
      <PrioritySearchPage data={Route.useLoaderData()} />
      <section aria-labelledby="license-service-steps" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Texas DPS</p>
        <h2 id="license-service-steps" className="mt-2 font-display text-3xl">Choose the right driver-license process</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Driver licenses, identification cards and CDLs are issued by Texas DPS, not TxDMV. The right application depends on your credential and circumstances.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map((step) => (
            <article key={step.title} className="border border-border p-5">
              <h3 className="font-display text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </article>
          ))}
        </div>
        <h3 className="mt-9 font-display text-2xl">Official application and eligibility resources</h3>
        <ul className="mt-4 list-disc space-y-3 pl-5 leading-7">
          <li><a className="underline underline-offset-4" href="https://www.dps.texas.gov/section/driver-license" target="_blank" rel="noopener noreferrer">DPS Driver License Services</a> — start an application, review eligibility and locate official instructions</li>
          <li><a className="underline underline-offset-4" href="https://www.dps.texas.gov/section/driver-license/commercial-driver-license" target="_blank" rel="noopener noreferrer">DPS Commercial Driver License</a> — classes, endorsements, permits and medical certification</li>
          <li><a className="underline underline-offset-4" href="https://tpr.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer">FMCSA Training Provider Registry</a> — federal entry-level driver training information and providers</li>
        </ul>
        <p className="mt-6 text-sm leading-6 text-muted-foreground">Verify current fees, document rules, test requirements, and appointment availability directly with DPS. Requirements can differ for minors, new residents, first-time applicants and commercial drivers.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/texas-dmv" className="border border-border px-4 py-2 font-semibold hover:bg-muted/30">Texas DMV service finder</Link>
          <Link to="/find-my-dmv" className="border border-border px-4 py-2 font-semibold hover:bg-muted/30">Find a Texas service office</Link>
          <Link to="/moving-to-texas" className="border border-border px-4 py-2 font-semibold hover:bg-muted/30">Moving to Texas</Link>
        </div>
      </section>
    </>
  );
}
