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
              <h3 className="font-display text-2xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </article>
          ))}
        </div>
        <h3 className="mt-8 font-display text-2xl">Official application and eligibility resources</h3>
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
      <section id="cdl-classes-endorsements" aria-labelledby="cdl-classes-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Commercial driving</p>
        <h2 id="cdl-classes-heading" className="mt-2 font-display text-3xl">Texas CDL classes and endorsements explained</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">CDL class depends on vehicle weight ratings and configuration, while endorsements depend on the cargo or passenger operation. A commercial learner permit, training, medical qualification, knowledge tests and skills testing may also be required.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="border border-border p-5"><h3 className="font-display text-2xl">Class A</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Generally applies to qualifying combinations with a combined rating of 26,001 pounds or more when the towed unit is rated above 10,000 pounds. Check the federal definition and any applicable exceptions.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-2xl">Class B</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Generally applies to a single vehicle rated at least 26,001 pounds, including permitted towing configurations within the Class B definition.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-2xl">Class C</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Can apply to vehicles outside Class A or B that transport a qualifying number of passengers or require hazardous-material placards.</p></article>
        </div>
        <h3 className="mt-8 font-display text-2xl">Common CDL endorsements and restrictions</h3>
        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border"><th scope="col" className="py-2">Code</th><th scope="col" className="py-2">Purpose</th></tr></thead>
            <tbody>
              <tr className="border-b border-border"><th scope="row" className="py-2">H</th><td className="py-2">Hazardous materials; separate federal security screening applies.</td></tr>
              <tr className="border-b border-border"><th scope="row" className="py-2">N</th><td className="py-2">Tank vehicles.</td></tr>
              <tr className="border-b border-border"><th scope="row" className="py-2">P</th><td className="py-2">Passenger transport.</td></tr>
              <tr className="border-b border-border"><th scope="row" className="py-2">S</th><td className="py-2">School bus; generally requires passenger qualifications as well.</td></tr>
              <tr className="border-b border-border"><th scope="row" className="py-2">T</th><td className="py-2">Double/triple trailers.</td></tr>
              <tr><th scope="row" className="py-2">X</th><td className="py-2">Combination tank and hazardous-material endorsements.</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="mt-8 font-display text-2xl">Endorsements are not the same as restrictions</h3>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">An endorsement authorizes a specialized operation, such as carrying passengers or transporting placarded hazardous materials. A restriction limits how you may operate. Depending on the skills-test vehicle and qualifications, a CDL may carry restrictions affecting manual transmissions, air brakes or certain tractor-trailer configurations. Check the codes actually printed on your Texas license before accepting a driving assignment.</p>
        <h3 className="mt-8 font-display text-2xl">Practical CDL examples</h3>
        <ul className="mt-4 max-w-3xl list-disc space-y-3 pl-5 leading-7">
          <li><strong>Tractor and heavy trailer:</strong> The combined and towed vehicle ratings commonly point to Class A; an additional endorsement may be required for certain cargo.</li>
          <li><strong>Heavy straight truck:</strong> A single qualifying heavy truck commonly points to Class B, but its towing configuration can change the analysis.</li>
          <li><strong>Smaller passenger or hazardous-materials vehicle:</strong> A vehicle below Class A/B thresholds can still require Class C when passenger-capacity or placarded-material rules apply.</li>
          <li><strong>School bus:</strong> The correct license class depends on the bus, and both passenger and school-bus qualifications may be required.</li>
        </ul>
        <h3 className="mt-8 font-display text-2xl">Before applying</h3>
        <ol className="mt-4 max-w-3xl list-disc space-y-3 pl-5 leading-7">
          <li>Determine the required CDL class and endorsements from the actual vehicle, trailer, cargo and passenger use—not just the vehicle's appearance.</li>
          <li>Review Texas DPS commercial learner permit rules and whether federal entry-level driver training (ELDT) applies to your first Class A or B license, upgrade or certain first endorsements.</li>
          <li>Check the applicable medical certification and self-certification category, plus any testing, background-check and residency requirements.</li>
          <li>Complete the applicable knowledge, training and skills requirements before operating beyond the privileges of your credential.</li>
        </ol>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">Some agricultural, emergency, military or recreational operations may qualify for exceptions. CDL requirements and medical standards are fact-specific; confirm with DPS and FMCSA before relying on an exemption.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.dps.texas.gov/section/driver-license/commercial-driver-license" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Texas DPS CDL requirements</a>
          <a href="https://www.fmcsa.dot.gov/registration/commercial-drivers-license" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">FMCSA CDL overview</a>
          <a href="https://tpr.fmcsa.dot.gov/" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Federal ELDT training registry</a>
        </div>
      </section>
    </>
  );
}
