import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-license-plates";
const description = "Texas license plate guide covering general, specialty, personalized, replacement, transferred, disabled and military plates.";

const topics = [
  ["General-issue plates", "Passenger vehicles normally receive a general-issue plate when titled and registered. Many public-facing transactions are handled by the county tax assessor-collector."],
  ["Specialty and personalized plates", "Texas offers specialty and personalized designs with differing availability, eligibility, character limits and fees. Check the current TxDMV catalog before ordering."],
  ["Replacement plates", "Lost, damaged or stolen plates can require a replacement transaction. Report stolen plates when appropriate and use the current TxDMV replacement instructions and forms."],
  ["Plate transfers", "Some plates may be transferred between vehicles owned by the same person when the registration record is updated. Confirm eligibility before completing a sale or purchase."],
  ["Disabled and military plates", "Eligibility documents and parking privileges vary. A plate design by itself does not necessarily confer accessible-parking privileges; verify the current TxDMV rules."],
] as const;

function TexasLicensePlatesPage() {
  return <main className="mx-auto max-w-4xl px-4 py-14">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas vehicle services</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Texas License Plates Guide</h1>
    <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Understand the main Texas plate categories and where to confirm current forms, fees and eligibility before visiting a county office.</p>
    <div className="mt-10 space-y-9">{topics.map(([title, body]) => <section key={title}><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{body}</p></section>)}</div>
    <div className="mt-12 flex flex-wrap gap-3"><a href="https://www.txdmv.gov/motorists/license-plates" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Official TxDMV plate information</a><a href="/find-my-dmv" className="rounded-md border px-5 py-3 text-sm font-semibold">Find the right Texas office</a><a href="/texas-vehicle-services" className="rounded-md border px-5 py-3 text-sm font-semibold">Vehicle services guide</a></div>
    <p className="mt-10 text-sm text-muted-foreground">Plate designs, fees, eligibility and processing methods can change. Confirm current requirements with TxDMV and your county tax assessor-collector.</p>
  </main>;
}

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas License Plates: Specialty, Replacement & Transfer Guide", description, type: "article" }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: "Texas License Plates Guide", mainEntityOfPage: absoluteUrl(texasDefinedBrand, canonicalPath), publisher: { "@type": "Organization", name: "Texas Defined" } })],
  }),
  component: TexasLicensePlatesPage,
});
