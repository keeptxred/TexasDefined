import { createFileRoute, Link } from "@tanstack/react-router";

import { texasDefinedBrand } from "@/brand/texasdefined";
import { Container } from "@/components/layout/Container";
import { paintedChurchCoreInterviewQuestions, paintedChurchFieldworkReleaseRules, paintedChurchFieldworkSections } from "@/data/painted-church-fieldwork-protocol";
import { absoluteUrl, buildMeta, canonicalLink, jsonLd } from "@/lib/seo";

const canonicalPath = "/explore/painted-churches/fieldwork-protocol";
const description = "Texas Defined's original-fieldwork protocol for documenting Texas Painted Churches: photography, inscriptions, stained glass, furnishings, preservation, access, oral history, consent and provenance.";

export const Route = createFileRoute(canonicalPath)({
  head: () => {
    const url = absoluteUrl(texasDefinedBrand, canonicalPath);
    return {
      meta: buildMeta(texasDefinedBrand, { canonicalPath, title: "Texas Painted Churches Fieldwork Protocol", description, modifiedTime: "2026-08-20T18:00:00-05:00" }),
      links: [canonicalLink(texasDefinedBrand, canonicalPath)],
      scripts: [jsonLd({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${url}#protocol`,
        name: "Texas Painted Churches fieldwork protocol",
        description,
        url,
        step: paintedChurchFieldworkSections.map((section, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: section.title,
          text: `${section.purpose} ${section.required.join(" ")}`,
        })),
      })],
    };
  },
  component: FieldworkProtocol,
});

function FieldworkProtocol() {
  return <main>
    <section className="border-b border-border bg-surface"><Container className="py-16 sm:py-24">
      <nav aria-label="Breadcrumb" className="text-[0.72rem] uppercase tracking-[0.14em] text-muted-foreground"><ol className="flex flex-wrap gap-2"><li><Link to="/">Front page</Link></li><li aria-hidden>·</li><li><Link to="/explore/painted-churches">Painted Churches</Link></li><li aria-hidden>·</li><li aria-current="page">Fieldwork protocol</li></ol></nav>
      <p className="eyebrow mt-8 text-primary">Original research standard</p>
      <h1 className="mt-4 max-w-5xl font-display text-5xl leading-[0.98] sm:text-7xl">How Texas Defined will document a Painted Church in the field.</h1>
      <p className="mt-6 max-w-5xl text-lg leading-8 text-muted-foreground">Web research can establish history, sources and candidates. It cannot substitute for original observation. This protocol defines the photographic, object-level, visitor-access, preservation and oral-history evidence required when Texas Defined begins church-by-church fieldwork.</p>
    </Container></section>
    <Container className="py-14 sm:py-18">
      <section className="border-t-2 border-foreground pt-8"><p className="eyebrow text-primary">Core rule</p><h2 className="mt-3 font-display text-4xl">Observe first. Attribute only when evidence supports it.</h2><p className="mt-5 max-w-4xl text-base leading-8 text-foreground/90">A photograph can prove that an object was visible on a particular date. It does not, by itself, prove who made it, when it was made, whether it is original, or what a symbol meant to the people who installed it. Field observation and documentary attribution remain separate evidence layers.</p></section>

      <div className="mt-14 space-y-12">{paintedChurchFieldworkSections.map((section, index) => <section key={section.id} className="border-t border-border pt-7"><p className="eyebrow text-primary">Step {String(index + 1).padStart(2, "0")}</p><h2 className="mt-2 font-display text-3xl">{section.title}</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-muted-foreground">{section.purpose}</p><div className="mt-6 grid gap-8 lg:grid-cols-2"><div><h3 className="font-display text-2xl">Required record</h3><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{section.required.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h3 className="font-display text-2xl">Useful expansion</h3><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{section.optional.map((item) => <li key={item}>{item}</li>)}</ul></div></div></section>)}</div>

      <section className="mt-14 border-t border-border pt-8"><p className="eyebrow text-primary">Interview framework</p><h2 className="mt-3 font-display text-4xl">Questions designed to surface evidence, not just anecdotes.</h2><ol className="mt-7 space-y-4 text-base leading-8 text-muted-foreground">{paintedChurchCoreInterviewQuestions.map((question, index) => <li key={question} className="border-t border-border pt-4"><span className="eyebrow mr-3 text-primary">{String(index + 1).padStart(2, "0")}</span>{question}</li>)}</ol></section>

      <section className="mt-14 border-l-2 border-primary bg-surface p-6 sm:p-8"><p className="eyebrow text-primary">Consent and preservation rules</p><h2 className="mt-3 font-display text-3xl">Access does not equal permission to publish everything.</h2><ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{paintedChurchFieldworkReleaseRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></section>

      <section className="mt-14 border-y border-border py-9"><p className="eyebrow text-primary">Related authority controls</p><div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-sm"><Link to="/explore/painted-churches/preindex-readiness" className="border-b border-primary text-primary">Pre-index readiness</Link><Link to="/explore/painted-churches/methodology" className="border-b border-primary text-primary">Research methodology</Link><Link to="/explore/painted-churches/features" className="border-b border-primary text-primary">Object-level feature inventory</Link><Link to="/explore/painted-churches/sources" className="border-b border-primary text-primary">Source provenance registry</Link></div></section>
    </Container>
  </main>;
}
