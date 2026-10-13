import { Link } from "@tanstack/react-router";
import { BookingCarRentalCard } from "@/components/monetization/BookingCarRentalCard";
import { DestinationAuthoritySections } from "@/components/editorial/DestinationAuthoritySections";
import { destinationEditorialLinks } from "@/data/destination-editorial-links";
import { townAuthorityContextualLinks } from "@/data/town-authority-links";
import type { Destination } from "@/data/types";

type Props = { destination: Destination };

// A highway/airport reference on an ordinary attraction does NOT imply
// that a visitor should rent a car. Limit this promotion to road-trip records
// that actually describe a driving itinerary.
const drivingIntentPattern = /\b(?:drive|driving|road trip|highway|scenic route|route)\b/i;

export function DestinationVisitPlanner({ destination }: Props) {
  const editorialLinks = [...new Map([...destinationEditorialLinks(destination.slug), ...townAuthorityContextualLinks(destination)].map((item) => [item.href, item])).values()];
  const showRentalCarOption = destination.category === "road-trips"
    && drivingIntentPattern.test([destination.summary, destination.entryNote, ...destination.highlights].join(" "));

  return (
    <>
      <div data-stay-nearby-slot aria-label={`Places to stay near ${destination.name}`} />
      {showRentalCarOption ? (
        <BookingCarRentalCard
          className="my-10"
          placement="destination-visit-planner"
          title={`Planning a drive around ${destination.name}?`}
        />
      ) : null}
      <DestinationAuthoritySections destination={destination} />
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
