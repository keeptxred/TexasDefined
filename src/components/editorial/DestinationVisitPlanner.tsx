import { Link } from "@tanstack/react-router";
import { StateParkVisitorEssentials } from "./StateParkVisitorEssentials";
import { BookingCarRentalCard } from "@/components/monetization/BookingCarRentalCard";
import { DestinationAuthoritySections } from "@/components/editorial/DestinationAuthoritySections";
import { destinationEditorialLinks } from "@/data/destination-editorial-links";
import { townAuthorityContextualLinks } from "@/data/town-authority-links";
import type { Destination } from "@/data/types";

type Props = { destination: Destination };

// A reference to an airport, highway or nearby town is not a reason to
// advertise a rental car on an individual museum or local attraction.
const drivingIntentPattern = /\b(?:drive|driving|road trip|highway|scenic route|route)\b/i;

export function DestinationVisitPlanner({ destination }: Props) {
  const editorialLinks = [...new Map(
    [...destinationEditorialLinks(destination.slug), ...townAuthorityContextualLinks(destination)]
      .map((item) => [item.href, item]),
  ).values()];
  const showRentalCarOption = destination.category === "road-trips"
    && drivingIntentPattern.test([destination.summary, destination.entryNote, ...destination.highlights].join(" "));

  return (
    <>
      {/* Fort McKavett already has its single lodging slot between visit
          planning and research sources, rather than down in this planner. */}
      {destination.slug !== "fort-mckavett" && (
        <div data-stay-nearby-slot aria-label={`Places to stay near ${destination.name}`} />
      )}
      <StateParkVisitorEssentials destination={destination} />
      {showRentalCarOption ? (
        <BookingCarRentalCard
          className="my-10"
          placement="destination-visit-planner"
          title={`Planning a drive around ${destination.name}?`}
        />
      ) : null}
      {destination.slug !== "moody-gardens" ? <DestinationAuthoritySections destination={destination} /> : null}
      {editorialLinks.length > 0 ? (
        <nav aria-label={`Related editorial guides for ${destination.name}`} className="mt-10 border-t border-border pt-7">
          <p className="eyebrow text-primary">Useful nearby reading</p>
          <h2 className="mt-3 font-display text-2xl">Plan your next stop</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {editorialLinks.map((item) => (
              <Link key={item.href} to={item.href} className="group border-t border-border pt-4">
                <strong className="block font-display text-xl group-hover:text-primary">{item.label}</strong>
                <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </>
  );
}
