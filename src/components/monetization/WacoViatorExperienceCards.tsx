import { wacoBookableExperiencesFor } from "@/data/waco-bookable-viator-experiences";
import { trackAffiliateClick } from "@/lib/affiliate-click";
import { buildViatorAffiliateUrl } from "@/lib/viator-affiliate";

/**
 * Three specifically checked product links, not a generic destination search.
 * No stale price, live-review-count or availability claims appear on the cards.
 */
export function WacoViatorExperienceCards({
  kind,
  title,
  showDetails = true,
}: {
  kind: "ghost" | "dallas";
  title?: string;
  showDetails?: boolean;
}) {
  const experiences = wacoBookableExperiencesFor(kind);
  return (
    <section className="my-8 border-y border-border py-8" aria-label={title || "Bookable Waco tours on Viator"}>
      <p className="eyebrow text-primary">Verified Viator product pages</p>
      <h2 className="mt-2 font-display text-3xl">{title ?? (kind === "ghost" ? "Compare Waco's haunted walking experiences" : "Dallas-to-Waco Magnolia day trip")}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
        These link to specific third-party experiences, not a generic Waco attraction listing. Viator handles current dates, prices, inclusions and booking. TexasDefined is independent of the tour operators.
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {experiences.map((experience) => {
          const placement = `viator-bookable-${experience.id}`;
          const label = `Check ${experience.name} dates on Viator`;
          return (
            <article key={experience.id} className="min-w-0 border border-border bg-surface p-5 sm:p-6">
              <p className="eyebrow text-primary">
                {experience.kind === "live-ghost-walk" ? "Guide-led walk" : experience.kind === "self-guided-ghost-walk" ? "Self-guided phone tour" : "Dallas departure · Round trip"}
              </p>
              <h3 className="mt-3 font-display text-2xl leading-tight">{experience.name}</h3>
              <p className="mt-2 text-sm font-semibold">{experience.duration}</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{experience.shortDescription}</p>
              {showDetails ? (
                <div className="mt-4 space-y-3 text-sm leading-6">
                  <p><strong>Where to start:</strong> {experience.meetingNote}</p>
                  <p><strong>Before booking:</strong> {experience.criticalNote}</p>
                </div>
              ) : <p className="mt-4 text-sm leading-6 text-muted-foreground">{experience.criticalNote}</p>}
              <a href={buildViatorAffiliateUrl(experience.url, experience.campaign)}
                target="_blank" rel="sponsored nofollow noopener noreferrer"
                data-affiliate-partner="viator" data-affiliate-placement={placement}
                data-commercial-partner="viator" data-commercial-placement={placement}
                onClick={() => trackAffiliateClick({ partner: "viator", label, placement, module: "waco-bookable-experiences" })}
                className="mt-5 inline-flex items-center bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                View dates and booking details on Viator ↗
              </a>
            </article>
          );
        })}
      </div>
      <p className="mt-5 text-xs leading-6 text-muted-foreground">
        Affiliate disclosure: TexasDefined may earn a commission from qualifying Viator bookings at no additional cost to you.
        Product pages last checked October 20, 2026; availability, prices, itineraries and cancellation terms can change.
      </p>
    </section>
  );
}
