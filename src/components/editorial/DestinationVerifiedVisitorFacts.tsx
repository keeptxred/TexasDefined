import type { Destination } from "@/data/types";
import { reviewDestinationVisitorFacts } from "@/data/destination-visitor-facts";

/** Only display exact, operator-sourced answers that still pass the freshness gate. */
export function DestinationVerifiedVisitorFacts({ destination }: { destination: Destination }) {
  const { visible } = reviewDestinationVisitorFacts(destination.visitorFacts);
  if (!visible.length) return null;
  return (
    <section aria-labelledby="verified-visitor-facts-title" className="mt-10 border-t border-border pt-8" data-verified-visitor-facts>
      <p className="eyebrow text-primary">Practical visitor details</p>
      <h2 id="verified-visitor-facts-title" className="mt-3 font-display text-3xl">Before you go</h2>
      <dl className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {visible.map((fact) => (
          <div key={fact.topic + ":" + fact.label} className="border-t border-border pt-4">
            <dt className="font-semibold">{fact.label}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted-foreground">{fact.detail}</dd>
            <dd className="mt-2 text-xs leading-5 text-muted-foreground">
              Checked <time dateTime={fact.checkedAt}>{fact.checkedAt}</time> ·{" "}
              <a href={fact.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">Official details ↗</a>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
