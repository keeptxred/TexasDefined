import { createFileRoute } from "@tanstack/react-router";
import { buildSeo, SITE_URL } from "@/lib/seo";

const services = [
  ["New Texas residents", "Start with the relocation checklist, then handle vehicle registration through your county tax assessor-collector and driver-license work through DPS.", "/moving-to-texas-checklist"],
  ["Find the right office", "Use the TexasDefined office finder to distinguish driver-license offices from county vehicle-registration and title offices.", "/find-my-dmv"],
  ["Registration and titles", "Texas Department of Motor Vehicles sets statewide vehicle-registration and title requirements; county tax assessor-collector offices handle many transactions.", "https://www.txdmv.gov/motorists"],
  ["License plates", "General-issue, specialty, personalized, replacement, disabled and military plates are administered through TxDMV and county offices depending on the transaction.", "https://www.txdmv.gov/motorists/license-plates"],
  ["Inspection and emissions", "Texas requirements differ by vehicle and county. Confirm current inspection and emissions requirements before registration or renewal.", "https://www.dps.texas.gov/section/vehicle-inspection"],
  ["Driver licenses and IDs", "Driver licenses and state IDs are handled by the Texas Department of Public Safety, not TxDMV.", "https://www.dps.texas.gov/section/driver-license"],
] as const;

function TexasVehicleServicesPage() {
  return <main className="mx-auto max-w-5xl px-4 py-14">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">TexasDefined practical guides</p>
    <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Texas Vehicle Services Guide</h1>
    <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">A practical starting point for Texas vehicle registration, titles, plates, inspections, driver licenses and new-resident vehicle tasks. TexasDefined keeps the agencies separate so you can go to the right office the first time.</p>
    <div className="mt-10 grid gap-5 md:grid-cols-2">{services.map(([title, body, href]) => <a key={title} href={href} className="rounded-xl border bg-card p-6 transition hover:bg-muted/30"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{body}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open resource →</span></a>)}</div>
    <section className="mt-14 rounded-xl border bg-muted/20 p-7"><h2 className="text-2xl font-bold">Who handles what in Texas?</h2><p className="mt-3 leading-relaxed text-muted-foreground"><strong>DPS</strong> handles driver licenses and state IDs. <strong>TxDMV</strong> administers statewide motor-vehicle title and registration programs. <strong>County tax assessor-collector offices</strong> handle many local title and registration transactions. Always confirm current requirements with the responsible agency before traveling to an office.</p></section>
  </main>;
}

export const Route = createFileRoute("/texas-vehicle-services")({
  head: () => {
    const seo = buildSeo({ title: "Texas Vehicle Services: Registration, Titles, Plates & DPS", description: "Texas vehicle services guide for registration, titles, license plates, inspections, driver licenses and new-resident vehicle tasks.", path: "/texas-vehicle-services", type: "article", keywords: "Texas vehicle registration, Texas vehicle title, Texas license plates, Texas DPS, TxDMV, moving to Texas vehicle" });
    return { meta: seo.meta, links: seo.links, scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: "Texas Vehicle Services Guide", url: `${SITE_URL}/texas-vehicle-services`, isPartOf: { "@type": "WebSite", name: "TexasDefined", url: SITE_URL } }) }] };
  },
  component: TexasVehicleServicesPage,
});
