import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Container } from "@/components/layout/Container";

const groups = [
  {
    title: "Driver and vehicle services",
    description: "DPS handles driver licenses and IDs; TxDMV and county tax offices handle vehicle titles and registration.",
    links: [
      ["Texas driver license", "/texas-drivers-license"],
      ["Track a driver license or ID", "/track-texas-drivers-license"],
      ["Texas by Texas (TxT)", "/texas-by-texas-txt"],
      ["Texas DMV guide", "/texas-dmv"],
      ["Vehicle registration", "/texas-vehicle-registration"],
      ["Replace a registration receipt", "/replace-texas-registration-receipt"],
      ["Find a DMV or county office", "/find-my-dmv"],
      ["Texas toll tags", "/texas-toll-tags"],
    ],
  },
  {
    title: "Records and documents",
    description: "Start with the state custodian when records are statewide, then use county authority for locally maintained records.",
    links: [
      ["Get a Texas birth certificate", "/texas-birth-certificate"],
      ["Browse county authority pages", "/browse/counties"],
      ["Texas Secretary of State", "/agency/texas-secretary-of-state"],
      ["Texas resources", "/texas-resources"],
    ],
  },
  {
    title: "Property and home",
    description: "Texas property taxes, permits and records are often local. Use the statewide guide to identify the right county, city, appraisal district or tax office.",
    links: [
      ["Look up property taxes and appraisals", "/texas-property-tax-lookup"],
      ["File a homestead exemption", "/do/homestead-exemption"],
      ["Protest a property appraisal", "/do/property-tax-protest"],
      ["How appraisal districts work", "/learn/appraisal-districts"],
      ["Property-tax calculators", "/property-tax-calculators"],
      ["Get a Texas septic permit", "/texas-septic-permit"],
      ["Check Texas flood maps and risk", "/texas-flood-information"],
      ["Browse Texas counties", "/browse/counties"],
    ],
  },
  {
    title: "Business and licenses",
    description: "Formation, tax registration and occupational permissions are different steps. Use the responsible state agency for each transaction.",
    links: [
      ["Start a business in Texas", "/start-a-business-in-texas"],
      ["Get a Texas sales tax permit", "/texas-sales-tax-permit"],
      ["Texas sales tax explained", "/texas-sales-tax-explained"],
      ["Texas Comptroller", "/agency/texas-comptroller"],
      ["Texas hunting license", "/texas-hunting-license"],
      ["Texas fishing license", "/texas-fishing-license"],
      ["Texas Parks and Wildlife", "/agency/texas-parks-wildlife"],
    ],
  },
] as const;

export const Route = createLazyFileRoute("/texas-services")({ component: Page });

function Page() {
  return <main>
    <section className="border-b border-border bg-muted/30 py-14 md:py-20">
      <Container>
        <p className="eyebrow text-primary">Texas everyday services</p>
        <h1 className="mt-3 max-w-5xl font-display text-5xl leading-none md:text-7xl">How do I do this in Texas?</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">Plain-English guides for common Texas government and public-service tasks, with the responsible agency, what you need, current official links, local-office routing and verification dates.</p>
        <div className="mt-6 max-w-3xl border-l-2 border-primary pl-5 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">Independent publication:</strong> TexasDefined is not a Texas government agency and does not accept government applications or fees. Use the official links in each guide to complete a transaction.</div>
        <p className="mt-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">Last verified September 1, 2026</p>
      </Container>
    </section>
    <Container className="py-12 md:py-16">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link to="/" className="hover:text-foreground">Home</Link><span className="mx-2">/</span><Link to="/texas-resources" className="hover:text-foreground">Texas Resources</Link><span className="mx-2">/</span><span className="text-foreground">Texas Services</span></nav>
      <div className="divide-y divide-border border-y border-border">
        {groups.map((group, index) => <section key={group.title} className="grid gap-8 py-10 lg:grid-cols-[18rem_1fr]">
          <div><p className="eyebrow text-primary">Section {String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl">{group.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p></div>
          <div className="grid sm:grid-cols-2">{group.links.map(([label, to]) => <Link key={to} to={to} className="group border-t border-border py-4 sm:px-5"><span className="font-display text-xl group-hover:text-primary">{label}</span><span className="ml-2 text-sm text-muted-foreground">→</span></Link>)}</div>
        </section>)}
      </div>
      <section className="mt-10 border-t border-border pt-8"><h2 className="font-display text-3xl">Local Texas processes</h2><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">County and city procedures can differ for deeds, permits, appraisal records, tax collection and other local services. TexasDefined connects statewide explanations to county and city authority pages instead of publishing hundreds of thin, repetitive copies.</p><div className="mt-5 flex gap-6 text-sm"><Link to="/browse/counties" className="font-semibold text-primary underline underline-offset-4">Browse counties</Link><Link to="/browse/cities" className="font-semibold text-primary underline underline-offset-4">Browse cities</Link><Link to="/moving-to-texas" className="font-semibold text-primary underline underline-offset-4">Moving to Texas</Link></div></section>
    </Container>
  </main>;
}
