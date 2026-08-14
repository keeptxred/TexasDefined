import { createFileRoute } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import {
  FISHING_REGULATIONS_PATH,
  FISHING_REGULATIONS_VERIFIED_AT,
  TPWD_AQUATIC_INVASIVE_RULES_URL,
  TPWD_FISHING_LICENSE_PACKAGES_URL,
  TPWD_FISHING_LICENSES_URL,
  TPWD_FISHING_METHODS_URL,
  TPWD_FISHING_REGULATIONS_URL,
  TPWD_FRESHWATER_EXCEPTIONS_URL,
  TPWD_FRESHWATER_LIMITS_URL,
} from "@/data/fishing/regulations-routing";
import { buildMeta, canonicalLink } from "@/lib/seo";

const siteUrl = `https://${texasDefinedBrand.identity.domain}`;
const description = "Use TexasDefined's fishing rules hub to verify Texas fishing licenses, current statewide limits, waterbody exceptions, legal methods and aquatic-invasive-species requirements at the official TPWD source.";

const officialChecks = [
  { title: "Fishing licenses & endorsements", text: "Confirm who needs a license, which freshwater or saltwater endorsement applies, and any current exception directly with TPWD. TexasDefined does not copy fee tables or eligibility exceptions into evergreen content.", href: TPWD_FISHING_LICENSES_URL, link: "Open TPWD license requirements" },
  { title: "License packages", text: "Use TPWD's live package page for resident, non-resident, senior, one-day and all-water package details. Prices and purchase rules can change between license years.", href: TPWD_FISHING_LICENSE_PACKAGES_URL, link: "Open TPWD fishing packages" },
  { title: "Statewide freshwater limits", text: "Check the current statewide freshwater bag and length limits before keeping fish. The official page carries the active regulatory-year dates and species limits.", href: TPWD_FRESHWATER_LIMITS_URL, link: "Open statewide freshwater limits" },
  { title: "Waterbody-specific exceptions", text: "Many Texas lakes, rivers and community waters have special harvest or gear rules. Always check the TPWD exception list for the exact water you plan to fish.", href: TPWD_FRESHWATER_EXCEPTIONS_URL, link: "Check waterbody exceptions" },
  { title: "Legal fishing methods", text: "Rules differ by device, species and water type. Verify current restrictions before using anything beyond ordinary rod-and-reel fishing.", href: TPWD_FISHING_METHODS_URL, link: "Open legal methods & restrictions" },
  { title: "Aquatic invasive species", text: "Boat draining, transport and possession rules are part of a legal fishing trip. Verify the current TPWD requirements before moving boats, bait or aquatic life between waters.", href: TPWD_AQUATIC_INVASIVE_RULES_URL, link: "Open invasive-species rules" },
] as const;

const faq = [
  { question: "Does TexasDefined replace the Texas Outdoor Annual?", answer: "No. TexasDefined explains what to verify and links to the official TPWD rules. The Outdoor Annual remains the source to use for current license requirements, harvest limits, special waterbody rules and legal methods." },
  { question: "Do all Texas lakes use the same fishing limits?", answer: "No. Statewide rules can have waterbody-specific exceptions, so anglers should check the exact lake or river in TPWD's current exception list before keeping fish." },
  { question: "Why doesn't this page list current license prices and bag limits?", answer: "Those details can change by regulatory or license year. TexasDefined keeps the evergreen planning layer stable and sends anglers to the live official source for volatile legal details." },
] as const;

export const Route = createFileRoute("/fishing/regulations")({
  head: () => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebPage", url: `${siteUrl}${FISHING_REGULATIONS_PATH}`, name: "Texas Fishing Regulations & License Guide", description, dateModified: FISHING_REGULATIONS_VERIFIED_AT },
        { "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
        { "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Front page", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Fishing", item: `${siteUrl}/fishing` },
          { "@type": "ListItem", position: 3, name: "Regulations", item: `${siteUrl}${FISHING_REGULATIONS_PATH}` },
        ] },
      ],
    };
    return { meta: buildMeta(texasDefinedBrand, { title: "Texas Fishing Regulations & Licenses — What to Verify Before You Fish", description, canonicalPath: FISHING_REGULATIONS_PATH }), links: [canonicalLink(texasDefinedBrand, FISHING_REGULATIONS_PATH)], scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }] };
  },
  component: FishingRegulationsPage,
});

function FishingRegulationsPage() {
  return <>
    <Container className="pt-8 sm:pt-10"><nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><a href="/">Front page</a> · <a href="/fishing">Fishing</a> · Regulations</nav></Container>
    <header className="mt-5 border-y border-border bg-ink text-ink-foreground"><Container className="py-14 sm:py-20"><p className="eyebrow text-ink-foreground/65">Texas Defined Fishing</p><h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.96] sm:text-7xl">Texas fishing rules without stale rule tables.</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-ink-foreground/80">Use this page as a pre-trip checklist, then verify the live legal detail at Texas Parks & Wildlife before you fish or keep a catch.</p><div className="mt-8 flex flex-wrap gap-5 text-sm"><a href={TPWD_FISHING_REGULATIONS_URL} target="_blank" rel="noopener noreferrer" className="border-b border-ink-foreground pb-1 font-semibold">Open the official TPWD Fishing Regulations →</a><a href="/fishing/plan" className="border-b border-ink-foreground/50 pb-1">Plan a fishing trip →</a></div></Container></header>

    <Container className="py-12 sm:py-16">
      <section className="grid gap-8 border-b border-border pb-12 lg:grid-cols-[15rem_1fr]" aria-labelledby="rule-policy"><div><p className="eyebrow text-primary">Editorial policy</p><h2 id="rule-policy" className="mt-2 font-display text-3xl">Legal facts stay attached to the live source.</h2></div><div className="max-w-3xl"><p className="text-base leading-8 text-muted-foreground">TexasDefined lake and species guides can explain durable fishing context, but they do not replace the current Outdoor Annual. License eligibility, fees, endorsements, bag limits, length limits, special-water rules, legal devices, emergency changes and transport requirements should be checked at TPWD before a trip.</p><p className="mt-4 text-xs leading-6 text-muted-foreground">Official-source links on this page were checked {FISHING_REGULATIONS_VERIFIED_AT}. A verification date confirms the link and source relationship; it does not freeze the rule text as of that date.</p></div></section>

      <section className="py-12" aria-labelledby="official-checks"><p className="eyebrow text-primary">Before you fish</p><h2 id="official-checks" className="mt-2 font-display text-4xl">Six official checks that matter more than a copied summary.</h2><div className="mt-7 grid gap-x-8 md:grid-cols-2">{officialChecks.map((item) => <article key={item.title} className="border-t border-border py-7"><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p><a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block border-b border-primary pb-1 text-sm font-semibold text-primary">{item.link} →</a></article>)}</div></section>

      <section className="border-y border-border py-12" aria-labelledby="lake-check"><div className="grid gap-8 lg:grid-cols-[15rem_1fr]"><div><p className="eyebrow text-primary">Lake-specific rules</p><h2 id="lake-check" className="mt-2 font-display text-3xl">The lake name matters.</h2></div><div className="max-w-3xl"><p className="text-sm leading-7 text-muted-foreground">A statewide species limit is only the starting point. TPWD maintains a separate list of freshwater waters with special harvest or gear restrictions. That is why TexasDefined lake guides direct anglers back to current official regulation sources instead of presenting an old limit as permanent.</p><div className="mt-5 flex flex-wrap gap-5 text-sm"><a href={TPWD_FRESHWATER_EXCEPTIONS_URL} target="_blank" rel="noopener noreferrer" className="border-b border-primary pb-1 font-semibold text-primary">Check special-water rules →</a><a href="/fishing/lakes" className="border-b border-primary pb-1 font-semibold text-primary">Browse complete lake guides →</a></div></div></div></section>

      <section className="py-12" aria-labelledby="faq"><p className="eyebrow text-primary">Quick answers</p><h2 id="faq" className="mt-2 font-display text-4xl">Texas fishing regulation FAQ</h2><div className="mt-7 grid gap-6 lg:grid-cols-3">{faq.map((item) => <article key={item.question} className="border-t border-border pt-5"><h3 className="font-display text-xl">{item.question}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.answer}</p></article>)}</div></section>
    </Container>
  </>;
}
