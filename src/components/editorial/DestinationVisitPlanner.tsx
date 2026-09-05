import { Link } from "@tanstack/react-router";
import { AnswerSummary } from "@/components/content/AnswerSummary";
import { destinationEditorialLinks } from "@/data/destination-editorial-links";
import type { Destination } from "@/data/types";

type Props = { destination: Destination };

const activityPattern = /hiking|trail|camping|fishing|hunting|hunt|swimming|boating|paddling|kayak|canoe|bird|wildlife|cycling|climbing|horse|picnic|photograph|stargaz/i;
const facilityPattern = /restroom|visitor center|playground|parking|campground|campsite|shower|electric|water|accessible|accessibility|boat ramp|dock|store|rental/i;

function unique(values: string[]) {
  return values.filter((value, index, all) => Boolean(value) && all.indexOf(value) === index);
}

export function DestinationVisitPlanner({ destination }: Props) {
  const activities = unique(destination.highlights.filter((item) => activityPattern.test(item)));
  const facilities = unique(destination.highlights.filter((item) => facilityPattern.test(item) && !activities.includes(item)));
  const otherHighlights = unique(destination.highlights.filter((item) => !activities.includes(item) && !facilities.includes(item)));
  const practicalTips = unique([
    destination.bestSeason ? `Best time to go: ${destination.bestSeason}.` : "",
    destination.entryNote,
    destination.reservationUrl ? "Check reservations before making the drive." : "",
    destination.accessibilityNotes ? `Accessibility: ${destination.accessibilityNotes}` : "",
    destination.directions ? `Getting there: ${destination.directions}` : "",
  ]);
  const editorialLinks = destinationEditorialLinks(destination.slug);
  const isWildlifeManagementArea = destination.id.startsWith("texas-wma-");

  if (!activities.length && !facilities.length && !otherHighlights.length && !practicalTips.length) return null;

  const groups = [
    { title: "Things to do", items: activities },
    { title: "What you’ll find", items: facilities },
    { title: "Don’t miss", items: otherHighlights },
    { title: "Good to know", items: practicalTips },
  ].filter((group) => group.items.length > 0);

  return (
    <>
      <AnswerSummary
        eyebrow="Quick answer"
        title={`Planning a visit to ${destination.name}`}
        items={[
          { question: `What is ${destination.name}?`, answer: destination.summary },
          { question: "When is the best time to go?", answer: destination.bestSeason || "Seasonal conditions vary; check the official source before planning the trip." },
          { question: "What should I know before arriving?", answer: destination.entryNote || "Check current access, fees, hours and reservation requirements before making the drive." },
          { question: "Where is it?", answer: `${destination.nearestTown ? `Near ${destination.nearestTown}, Texas` : "In Texas"}${destination.county ? `, in ${destination.county} County` : ""}.` },
        ]}
      />
      <section aria-labelledby="plan-your-visit" className="border-t border-border pt-8">
        <p className="eyebrow text-primary">Field notes</p>
        <h2 id="plan-your-visit" className="mt-3 font-display text-3xl">What to know before you go</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">Conditions, closures, fees and availability can change. Use these notes to plan, then confirm the latest details with the official site before making the drive.</p>
        <div className="mt-8 grid border-y border-border sm:grid-cols-2">
          {groups.map((group, index) => (
            <div key={group.title} className={`py-6 ${index % 2 === 0 ? "sm:border-r sm:pr-8" : "sm:pl-8"} ${index < groups.length - 2 ? "border-b border-border" : ""}`}>
              <h3 className="font-display text-2xl">{group.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                {group.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden className="text-primary">—</span><span>{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        {isWildlifeManagementArea ? <nav aria-label={`Hunting guidance for ${destination.name}`} className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-primary">Hunting & public access</p>
          <h3 className="mt-2 font-display text-2xl">Check the statewide rules before entering a WMA.</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">Wildlife Management Areas are working public-land systems with area-specific permits, hunt periods, closures and registration rules. Use this place guide for local context, then verify the statewide hunting path that applies to your trip.</p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3"><Link to="/hunting/public-hunting" className="eyebrow border-b border-primary pb-1 text-primary">Texas public hunting →</Link><Link to="/hunting/annual-public-hunting-permit" className="eyebrow border-b border-primary pb-1 text-primary">Annual Public Hunting Permit →</Link><Link to="/hunting/drawn-hunts" className="eyebrow border-b border-primary pb-1 text-primary">Texas drawn hunts →</Link></div>
        </nav> : null}
        {editorialLinks.length > 0 && <nav aria-label={`Editorial guides for ${destination.name}`} className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-primary">Go deeper</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {editorialLinks.map((item) => <Link key={item.href} to={item.href} className="group border-t border-border pt-4">
              <strong className="block font-display text-xl group-hover:text-primary">{item.label}</strong>
              <span className="mt-2 block text-sm leading-6 text-muted-foreground">{item.description}</span>
            </Link>)}
          </div>
        </nav>}
        <nav aria-label={`Continue planning from ${destination.name}`} className="mt-8 border-t border-border pt-6">
          <p className="eyebrow text-primary">Keep exploring</p>
          <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3">
            <Link to="/explore/$category" params={{ category: destination.category }} className="eyebrow border-b border-primary pb-1 text-primary">More {destination.category.replace(/-/g, " ")} →</Link>
            <a href={`/explore/trip-planner?destination=${encodeURIComponent(destination.slug)}`} className="eyebrow border-b border-primary pb-1 text-primary">Build a trip from here →</a>
            <Link to="/explore" className="eyebrow border-b border-primary pb-1 text-primary">Explore Texas guide →</Link>
            <Link to="/browse/cities" className="eyebrow border-b border-primary pb-1 text-primary">Texas city directory →</Link>
          </div>
        </nav>
      </section>
    </>
  );
}