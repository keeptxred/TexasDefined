import { Link } from "@tanstack/react-router";
import type { Destination } from "@/data/types";
import { museumAuthorityDirectory, museumDossierFor, museumAuthorityDossiers } from "@/data/museum-authority-network";
import { Container } from "@/components/layout/Container";
import { Section, SectionHeader } from "@/components/editorial/SectionHeader";

/**
 * Museum editorial depth and two-way relationship links.
 * Museum destinations render the complete research and visit dossier.
 * Neighboring destinations render relevant museums automatically, so additions
 * are not dependent on remembering a second manual cross-link pass.
 */
export default function MuseumAuthorityNetworkSection({ destination }: { destination: Destination }) {
  const dossier = museumDossierFor(destination.slug);
  const county = (destination.county || "").replace(/\s+County$/i, "").trim().toLowerCase();
  const neighboring = museumAuthorityDirectory.filter((entry) =>
    entry.slug !== destination.slug &&
    (entry.city.toLowerCase() === destination.nearestTown.trim().toLowerCase()
      || (county.length > 0 && entry.county.toLowerCase() === county)
      || Boolean(dossier?.connections.some((link) => link.href === `/destination/${entry.slug}`)))
  ).slice(0, 5);

  // Curated geographic links come before broad topical recommendations.
  const related = dossier && neighboring.length === 0
    ? museumAuthorityDirectory.filter((entry) => entry.slug !== destination.slug
      && museumAuthorityDossiers[entry.slug]?.connections.some((link) =>
        dossier.connections.some((own) => own.href === link.href)
      )).slice(0, 3)
    : neighboring;

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
        <div className="mt-9 grid gap-9 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h3 className="font-display text-3xl">Collections and exhibits explained</h3>
            <div className="mt-5 grid gap-6">
              {dossier.exhibits.map((item) => <article key={item.heading} className="border-t border-border pt-5">
                <h4 className="font-display text-2xl">{item.heading}</h4>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
              </article>)}
            </div>
            <h3 className="mt-12 font-display text-3xl">Three ways to plan the visit</h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              {dossier.routes.map((route) => <article key={route.label} className="border-t border-border pt-4">
                <h4 className="font-display text-xl">{route.label}</h4>
                <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-6 text-muted-foreground">
                  {route.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </article>)}
            </div>
            <h3 className="mt-12 font-display text-3xl">Historical and research context</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{dossier.researchValue}</p>
          </div>
          <aside className="space-y-7">
            <div className="border-t-2 border-foreground pt-5">
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
        <SectionHeader eyebrow="Connected museum guides" title="Museums to explore nearby" description={`Museum guides relevant to ${destination.nearestTown} and its surrounding history. Tickets, hours and travel arrangements are separate at each institution.`} />
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
