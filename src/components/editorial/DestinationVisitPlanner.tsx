import { AnswerSummary } from "@/components/content/AnswerSummary";
import type { Destination } from "@/data/types";

type Props = { destination: Destination };

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
    destination.reservationUrl ? "Check reservations before making the drive." : "",
    destination.accessibilityNotes ? `Accessibility: ${destination.accessibilityNotes}` : "",
    destination.directions ? `Getting there: ${destination.directions}` : "",
  ]);

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
      </section>
    </>
  );
}
