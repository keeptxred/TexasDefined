import type { ReactNode } from "react";
import type { MuseumAuthorityDossier } from "@/data/museum-authority-network";
import type { MuseumVisitorFaq } from "@/data/museum-visitor-faqs";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";

// Synchronous presentation; only the current dossier is loaded by the route.
export function MuseumDossierContent({ dossier, faqs, children }: { dossier: MuseumAuthorityDossier; faqs: readonly MuseumVisitorFaq[]; children?: ReactNode }) {
  return (
    <Section tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Texas Defined research guide"
          title={`Explore ${dossier.name} in depth`}
          description={dossier.whyVisit}
        />
        <p className="mt-4 text-sm text-muted-foreground">By <a href="/authors/a-hollis" className="underline underline-offset-4">Texas Defined Editorial Desk</a> · Research reviewed <time dateTime={dossier.reviewed}>{dossier.reviewed}</time></p>
        <div className="mt-9 grid gap-9 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl">Exhibit highlights and topics</h3>
            <div className="mt-5 grid gap-6">
              {dossier.exhibits.map((item) => <article key={item.heading} className="border-t border-border pt-5">
                <h4 className="font-display text-2xl">{item.heading}</h4>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </article>)}
            </div>
            <h3 className="mt-12 font-display text-3xl">Ways to explore the museum and its history</h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              {dossier.routes.map((route) => <article key={route.label} className="border-t border-border pt-4">
                <h4 className="font-display text-xl">{route.label}</h4>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                  {route.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </article>)}
            </div>
            <div className="mt-12" aria-labelledby={`museum-faq-${dossier.slug}`}>
              <h3 id={`museum-faq-${dossier.slug}`} className="font-display text-3xl">Frequently asked questions about {dossier.name}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">Questions drawn from museum information, visitor discussions and independent visitor research. Answers are checked against linked sources; check the museum for today's operating details.</p>
              <div className="mt-5 border-t border-border">
                {faqs.map((faq) => <details key={faq.question} className="border-b border-border py-5">
                  <summary className="cursor-pointer font-semibold leading-6 text-foreground">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                  <p className="mt-2 text-xs text-muted-foreground">Checked <time dateTime={faq.reviewed}>{faq.reviewed}</time> · <a href={faq.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Source and current details</a></p>
                </details>)}
              </div>
            </div>
            <h3 className="mt-12 font-display text-3xl">Historical and research context</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{dossier.researchValue}</p>
            {children}
          </div>
          <aside className="space-y-6">
            <div className="border-t border-foreground pt-5">
              <h3 className="font-display text-2xl">Before you go</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{dossier.visitorStrategy}</p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Accessibility</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{dossier.accessibility}</p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Families, teachers and groups</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{dossier.familiesAndGroups}</p>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Verified sources</h3>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">Editorial review: <time dateTime={dossier.reviewed}>{dossier.reviewed}</time>. For today's admission, changing exhibits, accessibility and closures, the operator is the controlling source.</p>
              <ol className="mt-4 space-y-3">
                {dossier.sources.map((source, index) => <li key={`${index}-${source.url}`} className="text-sm leading-6">
                  <a href={source.url} rel="noopener noreferrer" target="_blank" className="font-semibold text-primary underline underline-offset-4">{source.label}</a>
                  <p className="mt-1 text-xs text-muted-foreground">{source.use}</p>
                </li>)}
              </ol>
            </div>
            <div className="border-t border-border pt-5">
              <h3 className="font-display text-2xl">Use the local context</h3>
              <ul className="mt-3 space-y-3 text-sm">
                {dossier.connections.map((connection) => <li key={connection.href}>
                  <a href={connection.href} className="font-semibold text-primary underline underline-offset-4">{connection.label}</a>
                  <p className="mt-1 text-muted-foreground">{connection.reason}</p>
                </li>)}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
