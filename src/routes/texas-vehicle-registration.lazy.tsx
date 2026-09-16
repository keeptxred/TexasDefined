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
    </>
  );
}
