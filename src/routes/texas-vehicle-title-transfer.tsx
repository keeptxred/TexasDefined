import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/texas-vehicle-title-transfer";
const description = "Texas vehicle title transfer guide for buying, selling, gifting and inheriting vehicles, with TxDMV and county-office resources.";

function Page() {
  return <main className="mx-auto max-w-4xl px-4 py-14"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Texas vehicle services</p><h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Texas Vehicle Title Transfer Guide</h1><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Buying, selling, gifting or inheriting a vehicle can require different title documents and tax treatment. TxDMV provides statewide instructions while county tax assessor-collector offices process many title transactions.</p><div className="mt-10 space-y-9"><section><h2 className="text-2xl font-bold">Before the transaction</h2><p className="mt-3 leading-relaxed text-muted-foreground">Confirm the legal owner, VIN, lien status and required signatures before money or possession changes hands. Use current TxDMV forms for the specific transaction.</p></section><section><h2 className="text-2xl font-bold">After a private sale</h2><p className="mt-3 leading-relaxed text-muted-foreground">Buyer and seller responsibilities are different. Sellers should follow current TxDMV transfer-notification guidance, while buyers should complete title and registration steps through the appropriate county office.</p></section><section><h2 className="text-2xl font-bold">Special situations</h2><p className="mt-3 leading-relaxed text-muted-foreground">Gifts, inherited vehicles, bonded titles, out-of-state titles and lien releases have additional rules. Verify the current transaction-specific instructions before filing.</p></section></div><div className="mt-12 flex flex-wrap gap-3"><a href="https://www.txdmv.gov/motorists/buying-or-selling-a-vehicle" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Official TxDMV buying & selling guide</a><a href="/find-my-dmv" className="rounded-md border px-5 py-3 text-sm font-semibold">Find a county office</a><a href="/texas-vehicle-services" className="rounded-md border px-5 py-3 text-sm font-semibold">Vehicle services</a></div></main>;
}

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Vehicle Title Transfer Guide", description, type: "article" }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: "Texas Vehicle Title Transfer Guide", mainEntityOfPage: absoluteUrl(texasDefinedBrand, canonicalPath), publisher: { "@type": "Organization", name: "Texas Defined" } })],
  }),
  component: Page,
});
