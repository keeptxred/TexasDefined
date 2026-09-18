import { Link } from "@tanstack/react-router";
import { BookingCarRentalCard } from "@/components/monetization/BookingCarRentalCard";
import { destinationEditorialLinks } from "@/data/destination-editorial-links";
import type { Destination } from "@/data/types";

type Props = { destination: Destination };

const activityPattern = /hiking|trail|camping|fishing|swimming|boating|paddling|kayak|canoe|bird|wildlife|cycling|climbing|horse|picnic|photograph|stargaz/i;
const facilityPattern = /restroom|visitor center|playground|parking|campground|campsite|shower|electric|water|accessible|accessibility|boat ramp|dock|store|rental/i;
const drivingIntentPattern = /\b(?:drive|driving|car|road trip|highway|airport|remote|vehicle)\b/i;

function unique(values: string[]) {
  return values.filter((value, index, all) => Boolean(value) && all.indexOf(value) === index);
}

export function DestinationVisitPlanner({ destination }: Props) {
  const activities = unique(destination.highlights.filter((item) => activityPattern.test(item)));
  const facilities = unique(destination.highlights.filter((item) => facilityPattern.test(item) && !activities.includes(item)));
  const otherHighlights = unique(destination.highlights.filter((item) => !activities.includes(item) && !facilities.includes(item)));
  const editorialLinks = destinationEditorialLinks(destination.slug);
  const drivingIntentText = [
    destination.summary,
    destination.entryNote,
    destination.directions,
    destination.nearestTown,
    ...destination.highlights,
  ].filter(Boolean).join(" ");
  const showRentalCarOption = drivingIntentPattern.test(drivingIntentText);

  const groups = [
    { title: "Things to do", items: activities },
    { title: "What you’ll find", items: facilities },
    { title: "Don’t miss", items: otherHighlights },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <div
        data-stay-nearby-slot
        className="my-10"
        aria-label={`Places to stay near ${destination.name}`}
      />
      {showRentalCarOption ? (
        <BookingCarRentalCard
          className="my-10"
          placement="destination-visit-planner"
          title={`Need a rental car for ${destination.name}?`}
        />
      ) : null}
      {(groups.length > 0 || editorialLinks.length > 0) && <section aria-labelledby="things-to-do-there" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">While you’re there</p>
        <h2 id="things-to-do-there" className="mt-3 font-display text-3xl">Things to do and see</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Use these highlights to decide how to spend your time after the basic trip details are settled.</p>
        {groups.length > 0 && <div className="mt-8 grid border-y border-border sm:grid-cols-2">
          {groups.map((group, index) => (
            <div key={group.title} className={`py-6 ${index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"} ${index < groups.length - 2 ? "border-b border-border" : ""}`}>
              <h3 className="font-display text-2xl">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {group.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden className="text-primary">—</span><span>{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>}
        {editorialLinks.length > 0 && <nav aria-label={`Editorial guides for ${destination.name}`} className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-primary">Go deeper</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {editorialLinks.map((item) => <Link key={item.href} to={item.href} className="group border-t border-border pt-4">
              <strong className="block font-display text-xl group-hover:text-primary">{item.label}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
            </Link>)}
          </div>
        </nav>}
      </section>
    </>
  );
}
