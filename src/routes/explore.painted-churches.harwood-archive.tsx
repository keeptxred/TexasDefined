import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/harwood-archive";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const sourceUrl = "https://txarchives.org/utaaa/finding_aids/00136.xml";
const description = "A guide to the Buie Harwood and Anna Brightman archival material on Texas decorative painting and Painted Churches, including survey cards, slides, designation research and restoration documentation.";

const churchArchiveGroups = [
  ["St. Paul Lutheran Church", "Serbin", "8 slides"],
  ["St. Mary's Catholic Church", "High Hill", "20 slides"],
  ["Saints Cyril & Methodius Catholic Church", "Shiner", "13 slides"],
  ["St. Mary's Church of the Assumption", "Praha", "54 slides"],
  ["Church of the Guardian Angel", "Wallis", "26 slides"],
  ["Church of the Blessed Mary", "Sweet Home", "13 slides"],
  ["Ascension of Our Lord Catholic Church / St. Louis Catholic Church", "Moravia / Castroville", "17 slides"],
  ["Wesley Brethren Church", "Wesley", "30 slides"],
  ["St. Joseph's Catholic Church", "San Antonio", "8 slides"],
  ["Our Lady of Grace Church", "LaCoste", "21 slides"],
  ["St. John the Baptist Catholic Church", "Ammannsville", "26 slides"],
  ["San Fernando Cathedral", "San Antonio", "16 slides"],
  ["Sacred Heart Church", "Palestine", "17 slides"],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Buie Harwood Painted Churches Archive Guide", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({ "@context": "https://schema.org", "@type": "ArchiveComponent", "@id": `${pageUrl}#archive-guide`, name: "Buie Harwood Painted Churches archive guide", description, url: pageUrl, isBasedOn: sourceUrl, creator: { "@id": `${siteUrl}/#organization` } })],
  }),
  component: HarwoodArchivePage,
});

function HarwoodArchivePage() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Harwood archive</li></ol></nav><p className="eyebrow mt-8 text-primary">Archival research authority</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">The Buie Harwood Painted Churches research archive.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">The UT Architectural Archives finding aid documents one of the richest research collections behind the modern study of Texas decorative painting: church survey cards, designation drafts, painter research, restoration records, correspondence, photographs and more than a thousand research slides.</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Quick answer</p><h2 className="mt-3 font-display text-4xl">Why is this archive so important?</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">Harwood's research was not a later travel summary. The collection documents field investigation, church survey cards, historic-designation work, painter attribution research, stencil reproductions, restoration consulting and correspondence tied to the 2001 Austin PBS documentary. Texas Defined uses the finding aid as an archival roadmap and does not treat the presence of a church in the archive as automatic proof of formal National Register membership.</p></section><section className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2"><article className="bg-background p-7"><p className="eyebrow text-primary">Research files</p><h2 className="mt-3 font-display text-3xl">What the archive contains</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground"><li>Painted Churches survey cards and designation drafts</li><li>Research on the Donecker family and other decorative painters</li><li>Stencil reproductions from Texas decorative-painting sites</li><li>Photographs, negatives and research slides</li><li>Restoration-consulting documentation</li><li>KLRU/Austin PBS documentary correspondence and research</li></ul></article><article className="bg-background p-7"><p className="eyebrow text-primary">Scale</p><h2 className="mt-3 font-display text-3xl">More than a thousand research slides</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The finding aid describes 1,066 slides in the research-slide subseries, including large church-specific groups that can guide future item-level archival research and then-and-now comparisons.</p></article></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Church-specific slide groups</p><div className="mt-7 overflow-x-auto border-y border-border"><table className="min-w-[760px] w-full border-collapse text-left text-sm"><thead><tr className="border-b border-border bg-surface"><th className="p-4">Church</th><th className="p-4">Place</th><th className="p-4">Finding-aid extent</th></tr></thead><tbody>{churchArchiveGroups.map(([church, place, extent]) => <tr key={`${church}-${place}`} className="border-b border-border last:border-b-0"><td className="p-4 font-medium">{church}</td><td className="p-4">{place}</td><td className="p-4">{extent}</td></tr>)}</tbody></table></div></section><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Archival caution</p><h2 className="mt-3 font-display text-3xl">Archive presence is evidence of research attention—not automatic classification.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Harwood studied decorative painting more broadly than the formal Painted Churches Multiple Property Listing. Texas Defined therefore uses archive presence as a strong research lead, then verifies church identity, interior evidence, designation status and current sources independently.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><a href={sourceUrl} target="_blank" rel="noreferrer" className="border-b border-primary text-primary">Open the UT finding aid</a><Link to="/explore/painted-churches/people/$slug" params={{ slug: "buie-harwood" }} className="border-b border-primary text-primary">Buie Harwood profile</Link><Link to="/explore/painted-churches/census" className="border-b border-primary text-primary">Master church census</Link></div></section></Container></main>;
}
