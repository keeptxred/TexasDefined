import type { Destination } from "@/data/types";

type Props = {
  destination: Destination;
};

const activityPattern = /hiking|trail|camping|fishing|swimming|boating|paddling|kayak|canoe|bird|wildlife|cycling|climbing|horse|picnic|photograph|stargaz/i;
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
    destination.reservationUrl ? "Check reservation availability before making the drive." : "",
    destination.accessibilityNotes ? `Accessibility: ${destination.accessibilityNotes}` : "",
    destination.directions ? `Getting there: ${destination.directions}` : "",
  ]);

  if (!activities.length && !facilities.length && !otherHighlights.length && !practicalTips.length) return null;

  return (
    <section aria-labelledby="plan-your-visit" className="mt-12 border-t border-border pt-10">
      <p className="eyebrow text-primary">Before you go</p>
      <h2 id="plan-your-visit" className="mt-2 font-display text-2xl">What to know for the visit</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Here is the practical information we have gathered for this place. Conditions, closures, fees and availability can change, so check the official site before making the drive.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {activities.length > 0 && (
          <div className="border border-border p-5">
            <h3 className="font-display text-xl">Things to do</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary">
              {activities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {facilities.length > 0 && (
          <div className="border border-border p-5">
            <h3 className="font-display text-xl">What is available</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary">
              {facilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {otherHighlights.length > 0 && (
          <div className="border border-border p-5">
            <h3 className="font-display text-xl">Do not miss</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary">
              {otherHighlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
        {practicalTips.length > 0 && (
          <div className="border border-border p-5">
            <h3 className="font-display text-xl">Good to know</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm marker:text-primary">
              {practicalTips.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
