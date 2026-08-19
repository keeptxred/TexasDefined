import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/media";
const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const pageUrl = `${siteUrl}${canonicalPath}`;
const description = "A source-verified multimedia and oral-history research library for the Texas Painted Churches, centered on Austin PBS, archival interview documentation and church-specific research resources.";

const resources = [
  {
    title: "The Painted Churches of Texas: Echoes of the Homeland",
    type: "Full documentary",
    url: "https://www.pbs.org/video/the-painted-churches-of-texas-echoes-of-the-homeland-qbdwp9/",
    note: "PBS currently streams the 56-minute Austin PBS documentary. It combines church imagery with immigrant history, descendants, historians and archival source material.",
  },
  {
    title: "Austin PBS documentary project page",
    type: "Production and research context",
    url: "https://austinpbs.org/paintedchurches/documentary",
    note: "Explains the documentary's research approach, including letters, diaries, settler photographs, descendants and historians, and identifies director Tom Spencer and executive producer Fr. Alan Oakes.",
  },
  {
    title: "On the Road with Father Alan / filming updates",
    type: "Interview and fieldwork record",
    url: "https://austinpbs.org/paintedchurches/filmupdates",
    note: "Documents filming and interviews with researcher Buie Harwood, High Hill parishioner Addie Winkler, Czech reader Marie Klekar, Moravia parishioners and choir participants, plus church-specific research discoveries.",
  },
  {
    title: "Austin PBS Painted Churches project",
    type: "Church, history, symbols and technique archive",
    url: "https://austinpbs.org/paintedchurches/",
    note: "The project site connects the documentary to church profiles, decorative-painting explanations, symbolism and immigrant-history material.",
  },
  {
    title: "Buie Harwood and Anna Brightman collection",
    type: "Archival documentary-research record",
    url: "https://txarchives.org/utaaa/finding_aids/00136.xml",
    note: "The UT Architectural Archives finding aid includes correspondence with KLRU/Austin PBS for the documentary as well as research notes, photos, slides, church survey cards and historic-designation materials.",
  },
] as const;

const documentedVoices = [
  ["Buie Harwood", "decorative-painting researcher interviewed during documentary production"],
  ["Addie Winkler", "lifelong High Hill parishioner interviewed about childhood churchgoing"],
  ["Marie Klekar", "filmed at Ammannsville reading from a Czech Bible"],
  ["Thadious Polasek", "interviewed during Moravia filming"],
  ["Moravia choir and parish participants", "filmed performing old Czech hymns and supporting church documentation"],
] as const;

export const Route = createFileRoute(canonicalPath)({
  head: () => ({
    meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Documentary & Oral-History Library", description }),
    links: [canonicalLink(texasDefinedBrand, canonicalPath)],
    scripts: [jsonLd({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "CollectionPage", "@id": `${pageUrl}#page`, url: pageUrl, name: "Texas Painted Churches multimedia research library", description, mainEntity: { "@id": `${pageUrl}#resources` } },
        { "@type": "ItemList", "@id": `${pageUrl}#resources`, numberOfItems: resources.length, itemListElement: resources.map((resource, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "CreativeWork", name: resource.title, url: resource.url, description: resource.note } })) },
      ],
    })],
  }),
  component: MediaLibrary,
});

function MediaLibrary() {
  return <main><section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Media library</li></ol></nav><p className="eyebrow mt-8 text-primary">Multimedia & oral-history research</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">Watch the documentary. Follow the voices behind it.</h1><p className="mt-6 max-w-4xl text-lg leading-8 text-muted-foreground">Texas Defined does not copy documentary transcripts or manufacture interviews. This library points readers to the legitimate Austin PBS/PBS program, its production records and archival documentation of the people whose memories and research shaped the modern Painted Churches story.</p></Container></section><Container className="py-14 sm:py-18"><section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Verified media resources</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{resources.map((resource) => <article key={resource.url} className="bg-background p-7"><p className="eyebrow text-primary">{resource.type}</p><h2 className="mt-3 font-display text-3xl"><a href={resource.url} target="_blank" rel="noreferrer" className="hover:text-primary">{resource.title}</a></h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{resource.note}</p></article>)}</div></section><section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Documented voices</p><h2 className="mt-3 font-display text-4xl">People recorded during the documentary project</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">Austin PBS production updates identify these participants. Texas Defined records the existence and role of those interviews without inventing quotations or claiming rights to footage or testimony.</p><div className="mt-7 grid gap-px border border-border bg-border md:grid-cols-2">{documentedVoices.map(([name, role]) => <article key={name} className="bg-background p-6"><h3 className="font-display text-2xl">{name}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{role}</p></article>)}</div></section><section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Research rule</p><h2 className="mt-3 font-display text-3xl">Link to the voice. Do not appropriate it.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">External documentary footage, interviews, archival photographs and transcripts remain controlled by their respective rights holders. Texas Defined uses them as cited research resources and only republishes media when reuse rights are independently established.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link to="/explore/painted-churches/harwood-archive" className="border-b border-primary text-primary">Harwood archive guide</Link><Link to="/explore/painted-churches/people/$slug" params={{ slug: "buie-harwood" }} className="border-b border-primary text-primary">Buie Harwood profile</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Editorial methodology</Link></div></section></Container></main>;
}
