import { MuseumDossierContent } from "@/components/editorial/MuseumDossierContent";
import { AlvinHistoricalPhotographs } from "@/components/editorial/AlvinHistoricalPhotographs";
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
export default function MuseumAuthorityNetworkSection({ destination, includeDossier = true }: { destination: Destination; includeDossier?: boolean }) {
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
    {dossier && includeDossier && <MuseumDossierContent dossier={dossier} faqs={faqs}>{destination.slug === "alvin-historical-museum" ? <AlvinHistoricalPhotographs /> : null}</MuseumDossierContent>}
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
