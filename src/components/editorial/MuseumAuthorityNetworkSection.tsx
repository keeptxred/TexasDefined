import { Link } from "@tanstack/react-router";
import type { Destination } from "@/data/types";
import { museumAuthorityDirectory, museumDossierFor } from "@/data/museum-authority-network";
import { museumVisitorFaqFor } from "@/data/museum-visitor-faqs";
import { unavailableDestinationSlugs } from "@/data/destination-availability";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";

const currentlyClosedMuseumSlugs = new Set(unavailableDestinationSlugs());

/**
 * Museum editorial depth and two-way relationship links.
 * Museum destinations render the complete research and visit dossier.
 * Neighboring destinations render relevant museums automatically, so additions
 * are not dependent on remembering a second manual cross-link pass.
 */
export default function MuseumAuthorityNetworkSection({ destination }: { destination: Destination }) {
  const dossier = museumDossierFor(destination.slug);
  const faqs = museumVisitorFaqFor(destination.slug);
  const county = (destination.county || "").replace(/\s+County$/i, "").trim().toLowerCase();
  const neighboring = museumAuthorityDirectory.filter((entry) =>
    entry.slug !== destination.slug &&
    !currentlyClosedMuseumSlugs.has(entry.slug) &&
    (entry.city.toLowerCase() === destination.nearestTown.trim().toLowerCase()
      || (county.length > 0 && entry.county.toLowerCase() === county)
      || Boolean(dossier?.connections.some((link) => link.href === `/destination/${entry.slug}`)))
  ).slice(0, 5);

  // Peer-museum relationships are regenerated automatically from editorial topic
  // tags, with specific shared subjects weighted above generic Texas history.
  // Every new registered museum participates without per-page link maintenance.
  const themed = dossier
    ? museumAuthorityDirectory.filter((item) => item.slug !== destination.slug && !currentlyClosedMuseumSlugs.has(item.slug))
      .map((item) => ({
        item,
        score: item.topics.filter((topic) => dossier.topics.includes(topic))
          .reduce((sum, topic) => sum + (topic === "texas-history" ? 1 : 3), 0),
      }))
      .filter(({ score }) => score >= 1)
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
      .slice(0, 5)
      .map(({ item }) => item)
    : [];
  const related = [...new Map([...neighboring, ...themed].map((item) => [item.slug, item])).values()].slice(0, 5);

  // Return nothing on unrelated destination pages. No site-wide boilerplate.
  if (!dossier && !related.length) return null;

  return <>
    {dossier && <Section tone="surface">
      <Container>
        <SectionHeader
          eyebrow="Texas Defined research guide"
          title={`Explore ${dossier.name} in depth`}
          description={dossier.whyVisit}
        />
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
    </Section>}
    {related.length > 0 && <Section>
      <Container>
        <SectionHeader eyebrow="Connected museum guides" title={dossier ? "Related museums across Texas" : "Museums to explore nearby"} description={dossier ? "More researched museum guides linked by subject or region. Each museum has its own admission, hours and visitor policies." : `Museum guides relevant to ${destination.nearestTown} and its surrounding history. Tickets, hours and travel arrangements are separate at each institution.`} />
        <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => <li key={item.slug} className="border-t border-border pt-4">
            <Link to="/destination/$slug" params={{ slug: item.slug }} className="font-display text-xl underline decoration-primary/30 underline-offset-4 hover:text-primary">{item.name}</Link>
            <p className="mt-2 text-sm text-muted-foreground">{item.city} · {item.county} County</p>
          </li>)}
        </ul>
      </Container>
    </Section>}
  </>;
}
