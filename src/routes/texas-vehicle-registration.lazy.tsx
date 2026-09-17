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
