import type { Destination, VisitorFacilityFact } from "@/data/types";

type FeaturedTopic = "parking" | "restrooms" | "map";

function EvidenceDetail({
  fact,
  label,
  officialUrl,
}: {
  fact?: VisitorFacilityFact;
  label: string;
  officialUrl?: string;
}) {
  const documented = fact?.status !== "unverified" && Boolean(fact?.sourceUrl && fact.checkedAt);
  // An editorially relevant question may still have no verified answer.
  // Explain the gap *only on destinations where the editor opted into that topic*.
  const guidance = documented
    ? fact!.details
    : `${label} details have not been verified for this visit. Check the latest instructions from the managing organization.`;
  const source = documented ? fact!.sourceUrl : officialUrl;

  return <div className="border-t border-border pt-5">
    <dt className="font-display text-xl">{label}</dt>
    <dd className="mt-2 text-sm leading-7 text-muted-foreground">
      {guidance}
      {documented && fact?.checkedAt ? <span className="mt-2 block text-xs">Operator source reviewed {fact.checkedAt}.</span> : null}
      {source && /^https:\/\//i.test(source) ? <a href={source} target="_blank" rel="noreferrer noopener" className="mt-2 inline-block font-semibold text-primary underline underline-offset-4">Check current operator details ↗</a> : null}
    </dd>
  </div>;
}

/**
 * Only show visitor questions explicitly chosen for the destination.
 * A museum does not acquire a "Restrooms" heading merely because a facility
 * record exists; a remote park may need it because a visitor plans around it.
 */
export function DestinationVisitorEssentials({ destination }: { destination: Destination }) {
  const facilities = destination.visitorFacilities;
  const focus: FeaturedTopic[] = [...new Set(facilities?.editorialFocus ?? [])];
  if (!focus.length) return null;

  const map = facilities?.officialMapUrl;
  const mapValid = Boolean(map && /^https:\/\//i.test(map));
  const hasMapQuestion = focus.includes("map");
  const id = `${destination.slug}-visitor-decisions`;

  return <section aria-labelledby={id} className="mt-10 border-t-2 border-foreground pt-7">
    <p className="eyebrow text-primary">Before you visit</p>
    <h2 id={id} className="mt-2 font-display text-3xl">{facilities?.editorialHeading || "Practical details for this visit"}</h2>
    {facilities?.editorialIntro ? <p className="mt-4 text-sm leading-7 text-muted-foreground">{facilities.editorialIntro}</p> : null}
    {focus.some(topic => topic !== "map") ? <dl className="mt-5 grid gap-6 sm:grid-cols-2">
      {focus.includes("parking") ? <EvidenceDetail label="Parking and arrival" fact={facilities?.parking} officialUrl={destination.officialUrl} /> : null}
      {focus.includes("restrooms") ? <EvidenceDetail label="Restrooms and developed facilities" fact={facilities?.restrooms} officialUrl={destination.officialUrl} /> : null}
    </dl> : null}
    {hasMapQuestion ? <div className="mt-6 border-t border-border pt-5">
      <h3 className="font-display text-xl">Official visitor map</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">Use the operator's site map to distinguish entrances, trailheads and facilities from the general location map elsewhere on this page.</p>
      {mapValid ? <a href={map!} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">View the official visitor map ↗</a>
        : destination.officialUrl ? <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Check for current maps with the operator ↗</a>
          : null}
    </div> : null}
    {facilities?.visitorTips?.length ? <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{facilities.visitorTips.map(tip => <li key={tip}>{tip}</li>)}</ul> : null}
  </section>;
}
