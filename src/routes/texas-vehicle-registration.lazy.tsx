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
      <section id="license-plates" className="mx-auto max-w-6xl border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <p className="eyebrow text-primary">Vehicle ownership</p>
        <h2 className="mt-2 font-display text-3xl">Texas license plates</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Texas offers general-issue, specialty, personalized, replacement, disabled and military plates. Plate availability, eligibility, character limits and fees can change, so confirm the current transaction with TxDMV before ordering or visiting a county office.</p>
        <div className="mt-5 flex flex-wrap gap-3"><a href="https://www.txdmv.gov/motorists/license-plates" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Official TxDMV plate information</a><Link to="/find-my-dmv" className="border border-border px-4 py-2 text-sm font-semibold hover:bg-muted/30">Find the right Texas office</Link></div>
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
