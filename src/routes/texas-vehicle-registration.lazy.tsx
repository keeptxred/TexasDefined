import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { PrioritySearchPage } from "@/components/editorial/PrioritySearchPage";

export const Route = createLazyFileRoute("/texas-vehicle-registration")({
  component: TexasVehicleRegistrationPage,
});

function TexasVehicleRegistrationPage() {
  return (
    <>
      <PrioritySearchPage data={Route.useLoaderData()} />
      <section className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Go deeper</p>
        <h2 className="mt-2 font-display text-3xl">Registration renewal, fees and taxes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link to="/texas-vehicle-registration-renewal" className="border border-border p-5 hover:bg-muted/30">
            <span className="font-display text-2xl text-foreground">Renew Texas registration</span>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">Online, mail and county-office methods, renewal windows, emissions rules, expired registration and sticker delivery.</span>
          </Link>
          <Link to="/texas-vehicle-registration-fees-taxes" className="border border-border p-5 hover:bg-muted/30">
            <span className="font-display text-2xl text-foreground">Registration fees and vehicle taxes</span>
            <span className="mt-2 block text-sm leading-6 text-muted-foreground">State and county charges, sales and use tax, SPV, new-resident tax, gift tax and electric-vehicle fees.</span>
          </Link>
        </div>
      </section>
      <section id="vehicle-sale-checklists" aria-labelledby="sale-checklists-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Private-party transactions</p>
        <h2 id="sale-checklists-heading" className="mt-2 font-display text-3xl">Buying or selling a used vehicle in Texas</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">A signed bill of sale alone is not a substitute for a properly assigned vehicle title. Before exchanging payment, verify the VIN on the vehicle against the title, confirm the seller's ownership and any lien release, and check whether the vehicle has a branded or rebuilt title.</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="border border-border p-5">
            <h3 className="font-display text-xl">Buyer checklist</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              <li>Compare the VIN on the title, vehicle and supporting paperwork; ask about liens and title brands.</li>
              <li>Confirm the title assignment is complete and obtain any required lien release and odometer disclosure.</li>
              <li>Prepare the Application for Texas Title and/or Registration (Form 130-U), proof of insurance and required identification.</li>
              <li>Check applicable motor vehicle tax and standard presumptive value rules; submit the title application through the appropriate county office promptly.</li>
            </ol>
          </div>
          <div className="border border-border p-5">
            <h3 className="font-display text-xl">Seller checklist</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
              <li>Resolve outstanding liens and correctly assign the original title to the buyer.</li>
              <li>Retain a record of the buyer, transaction date, VIN and signed paperwork.</li>
              <li>Submit a vehicle transfer notification to TxDMV to help document the change of possession.</li>
              <li>Review TxDMV guidance on whether to remove plates and registration stickers and how toll accounts should be updated.</li>
            </ol>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-muted-foreground">Gift, inheritance, dealer, out-of-state and bonded-title transactions follow different rules. Confirm deadlines, tax amounts and required documents with TxDMV and your county tax assessor-collector before filing.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Official TxDMV buying and selling instructions</a>
          <a href="https://comptroller.texas.gov/taxes/motor-vehicle/" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Texas motor vehicle taxes</a>
          <Link to="/texas-vehicle-registration-fees-taxes" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">TexasDefined fees and taxes guide</Link>
        </div>
      </section>
      <section id="ownership-fraud-prevention" aria-labelledby="ownership-fraud-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Protect your transaction</p>
        <h2 id="ownership-fraud-heading" className="mt-2 font-display text-3xl">Avoid common Texas used-car title problems</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <article className="border border-border p-5"><h3 className="font-display text-xl">Title does not match the seller</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare the seller's identification and title ownership information. Be cautious when someone is selling a vehicle titled to an unrelated person or asks you to leave buyer information blank. Resolve ownership questions before paying.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-xl">Outstanding loan or lien</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A lienholder may have a legal interest in the vehicle. Confirm how the lien will be satisfied and what release documentation the county office requires; do not assume the seller's statement alone clears the lien.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-xl">VIN or odometer discrepancy</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Compare the VIN in multiple places and investigate inconsistencies in the title, vehicle history and odometer disclosure. Stop the transaction when the identity of the vehicle cannot be established.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-xl">Salvage or rebuilt history</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A branded title can affect registration, insurance, value and resale. Ask for the title and supporting records, and confirm applicable TxDMV requirements before completing a purchase.</p></article>
        </div>
        <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">For a private sale, consider completing paperwork together at the county tax assessor-collector office when feasible. The county can explain submission requirements but cannot guarantee the vehicle's condition or the seller's honesty.</p>
        <div className="mt-5 flex flex-wrap gap-3"><a href="https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">TxDMV buyer and seller resources</a><Link to="/texas-vehicle-registration-fees-taxes" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Texas title fees and taxes</Link></div>
      </section>
      <section id="license-plates" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Vehicle ownership</p>
        <h2 className="mt-2 font-display text-3xl">Texas license plates</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Texas offers general-issue, specialty, personalized, replacement, disabled and military plates. Plate availability, eligibility, character limits and fees can change, so confirm the current transaction with TxDMV before ordering or visiting a county office.</p>
        <div className="mt-5 flex flex-wrap gap-3"><a href="https://www.txdmv.gov/motorists/license-plates" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Official TxDMV plate information</a><Link to="/find-my-dmv" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Find the right Texas office</Link></div>
      </section>
      <section id="duplicate-titles" aria-labelledby="duplicate-title-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Lost, damaged or incorrect title</p>
        <h2 id="duplicate-title-heading" className="mt-2 font-display text-3xl">Replace a lost Texas vehicle title</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">If your Texas certificate of title is lost, stolen, destroyed or damaged, request a certified copy through TxDMV rather than attempting to transfer ownership without the title. A certified copy is different from a new title application or a bonded-title procedure.</p>
        <ol className="mt-5 max-w-3xl list-decimal space-y-3 pl-5 leading-7">
          <li>Confirm that the vehicle has a Texas title and identify the recorded owner or lienholder.</li>
          <li>Use the current TxDMV Application for a Certified Copy of Title (Form VTR-34), following the agency's identity, signature and lienholder instructions.</li>
          <li>Check the accepted submission methods and current fee before mailing documents or visiting a TxDMV regional service center.</li>
          <li>If the title information itself is wrong, ask TxDMV about a corrected title; if ownership cannot be established, review bonded-title eligibility rather than using a duplicate-title request.</li>
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle/get-a-copy-of-your-title" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">TxDMV certified title copy instructions</a>
          <a href="https://www.txdmv.gov/" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">TxDMV forms and regional services</a>
        </div>
      </section>
      <section id="disabled-parking" aria-labelledby="disabled-parking-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Accessible parking</p>
        <h2 id="disabled-parking-heading" className="mt-2 font-display text-3xl">Texas disabled parking placards and plates</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Texas issues qualifying disabled parking placards and license plates through the TxDMV system and county tax assessor-collector offices. The Application for Persons with Disabilities Parking Placard and/or License Plate (Form VTR-214) explains medical certification and applicant requirements. Eligibility, expiration and renewal rules depend on the credential and circumstances.</p>
        <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5 leading-7">
          <li>Read the current VTR-214 eligibility criteria and identify whether a placard, plate or both are appropriate.</li>
          <li>Arrange any required certification by an authorized medical professional using the current form and submission rules.</li>
          <li>Submit the completed application to the appropriate county tax office and verify current fees, expiration and renewal procedures.</li>
          <li>Review Texas rules governing who may use the placard or plate and when accessible parking privileges apply.</li>
        </ol>
        <a href="https://www.txdmv.gov/motorists/disabled-parking-placards-plates" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Official TxDMV disabled parking information</a>
      </section>
      <section id="texas-vehicle-inspections" aria-labelledby="vehicle-inspections-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Registration requirements</p>
        <h2 id="vehicle-inspections-heading" className="mt-2 font-display text-3xl">Texas safety inspections and emissions tests</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Beginning January 1, 2025, Texas eliminated the routine annual safety inspection requirement for most noncommercial vehicles. That change did not eliminate emissions testing for eligible vehicles in participating counties or the separate safety inspection requirements for certain commercial vehicles.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="border border-border p-5"><h3 className="font-display text-xl">Most noncommercial vehicles</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">A routine annual safety inspection is generally no longer needed for registration, but applicable inspection-replacement fees and emissions rules may still affect the transaction. Check the current county and vehicle requirements.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-xl">Emissions and commercial vehicles</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Emissions testing remains relevant in designated counties for qualifying vehicles; requirements can vary by model year, fuel type and county. Certain commercial vehicles continue to require safety inspections.</p></article>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Do not assume the rules are identical across Texas counties or vehicle classes. Confirm the latest participating counties and exemptions before renewal.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.dps.texas.gov/section/vehicle-inspection" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">DPS vehicle inspection program</a>
          <a href="https://www.txdmv.gov/motorists/register-your-vehicle" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">TxDMV registration requirements</a>
          <Link to="/texas-vehicle-registration-renewal" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Renewal instructions</Link>
        </div>
      </section>
      <section id="texas-auto-insurance" aria-labelledby="auto-insurance-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Financial responsibility</p>
        <h2 id="auto-insurance-heading" className="mt-2 font-display text-3xl">Texas auto liability insurance and proof of coverage</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Texas drivers generally must demonstrate financial responsibility. Most satisfy this requirement with auto liability insurance. The commonly described minimum liability limits are 30/60/25: $30,000 bodily injury coverage per injured person, $60,000 bodily injury coverage per accident, and $25,000 property damage coverage per accident. These limits do not guarantee that every crash loss will be covered.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <article className="border border-border p-5"><h3 className="font-display text-xl">What liability coverage does</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Liability insurance generally pays covered injuries and property damage you cause to others, up to the policy limits. It does not automatically pay to repair your own vehicle.</p></article>
          <article className="border border-border p-5"><h3 className="font-display text-xl">Proof and alternatives</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Keep valid proof of financial responsibility available when required. Texas law also provides certain non-insurance methods of establishing financial responsibility, subject to statutory conditions; they are not interchangeable with an ordinary insurance card.</p></article>
        </div>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">A lender or leasing company may require additional coverages. Compare coverage limits and exclusions against your risk; the legal minimum may be insufficient after a serious crash.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href="https://www.tdi.texas.gov/pubs/consumer/cb020.html" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Texas Department of Insurance auto insurance guide</a>
          <a href="https://statutes.capitol.texas.gov/Docs/TN/htm/TN.601.htm" target="_blank" rel="noopener noreferrer" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Texas Transportation Code Chapter 601</a>
          <Link to="/texas-dmv" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Texas DMV service finder</Link>
        </div>
      </section>
      <section id="personalized-plates" aria-labelledby="personalized-plates-heading" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">License plate options</p>
        <h2 id="personalized-plates-heading" className="mt-2 font-display text-3xl">Personalized and specialty Texas license plates</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">Texas offers standard-issue, specialty and personalized plate options. Not every design permits the same character combinations or eligibility, and certain plates require proof of military service, disability status or other qualifications.</p>
        <ol className="mt-5 max-w-3xl list-decimal space-y-2 pl-5 leading-7">
          <li>Choose between a general-issue replacement, specialty design or personalized configuration.</li>
          <li>Review the design's current eligibility, personalization rules, availability and price on the official TxDMV plate pages or its authorized plate provider.</li>
          <li>Confirm whether your request is a new registration, replacement, transfer or renewal; each may require different paperwork.</li>
          <li>Check the ordering and pickup instructions before submitting payment, particularly if your vehicle has an existing registration or lien.</li>
        </ol>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Plate availability and fees change. An available combination at the start of an order is not a guarantee of approval.</p>
        <a href="https://www.txdmv.gov/motorists/license-plates" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Official TxDMV license plates and ordering information</a>
      </section>
      <section id="title-transfer" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Buying or selling</p>
        <h2 className="mt-2 font-display text-3xl">Texas vehicle title transfers</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Buying, selling, gifting or inheriting a vehicle can require different title documents and tax treatment. Confirm the legal owner, VIN, lien status and required signatures before the transaction, then use the current TxDMV instructions and the appropriate county tax assessor-collector office.</p>
        <div className="mt-5 flex flex-wrap gap-3"><a href="https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Official TxDMV buying and selling guide</a><Link to="/find-my-dmv" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Find a county office</Link></div>
      </section>
    </>
  );
}
