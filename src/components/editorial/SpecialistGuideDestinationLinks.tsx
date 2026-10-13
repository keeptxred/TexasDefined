import { Link } from "@tanstack/react-router";

import { destinationsForSpecialistGuide } from "@/data/specialist-guide-destination-links";

/** Subject-verified direct destination links, derived from the inbound map. */
export function SpecialistGuideDestinationLinks({ guideHref }: { guideHref: string }) {
  const destinations = destinationsForSpecialistGuide(guideHref);
  if (!destinations.length) return null;
  return <section className="border-b border-border py-10" aria-labelledby="specialist-guide-destination-links">
    <p className="eyebrow text-primary">Go deeper by place</p>
    <h2 id="specialist-guide-destination-links" className="mt-2 font-display text-3xl">Detailed Texas destination guides</h2>
    <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">See the park-specific visitor context and current source links before planning the activity. Current closures, access and land-manager restrictions take priority over historical descriptions.</p>
    <nav aria-label="Detailed place guides related to this activity" className="mt-6 grid gap-3 sm:grid-cols-2">
      {destinations.map((place) => <Link key={place.href} to={place.href} className="border border-border p-4">
        <strong className="block font-semibold text-primary">{place.label} →</strong>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">{place.context}</span>
      </Link>)}
    </nav>
  </section>;
}
