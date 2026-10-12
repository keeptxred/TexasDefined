import type { Destination, VisitorFacilityFact } from "@/data/types";

function FacilityItem({ label, fact, officialUrl }: { label: string; fact?: VisitorFacilityFact; officialUrl?: string }) {
  const hasEvidence = fact?.status === "verified" && Boolean(fact.sourceUrl) && Boolean(fact.checkedAt);
  const explicitlyUnavailable = fact?.status === "not-available" && Boolean(fact.sourceUrl) && Boolean(fact.checkedAt);
  const note = hasEvidence || explicitlyUnavailable
    ? fact!.details
    : "Not independently verified for this attraction. Confirm current facilities directly with the operator before traveling.";
  const link = fact?.sourceUrl ?? officialUrl;

  return <div className="border-t border-border pt-5">
    <dt className="font-display text-2xl">{label}</dt>
    <dd className="mt-2 text-sm leading-7 text-muted-foreground">
      {note}
      {(hasEvidence || explicitlyUnavailable) && fact?.checkedAt ? <span className="mt-1 block text-xs">Source checked {fact.checkedAt}; operations can change.</span> : null}
      {link && /^https:\/\//.test(link) ? <a className="mt-2 inline-block font-semibold text-primary underline underline-offset-4" href={link} target="_blank" rel="noreferrer noopener">Check operator facility information ↗</a> : null}
    </dd>
  </div>;
}

/** One reusable checklist across every Explore destination; unknown is not "no". */
export function DestinationVisitorEssentials({ destination }: { destination: Destination }) {
  const facilities = destination.visitorFacilities;
  const officialMap = facilities?.officialMapUrl;
  return <section aria-labelledby="visitor-essentials" className="mt-10 border-t-2 border-foreground pt-7">
    <p className="eyebrow text-primary">Practical trip essentials</p>
    <h2 id="visitor-essentials" className="mt-2 font-display text-3xl">Parking, restrooms and maps</h2>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">Facility details are specific to each location. A restroom or parking symbol elsewhere in Texas does not establish what is open here. Verified notes link to the responsible operator; gaps are marked rather than guessed.</p>
    <dl className="mt-6 grid gap-6 sm:grid-cols-2">
      <FacilityItem label="Parking and vehicle access" fact={facilities?.parking} officialUrl={destination.officialUrl} />
      <FacilityItem label="Restrooms and amenities" fact={facilities?.restrooms} officialUrl={destination.officialUrl} />
    </dl>
    <div className="mt-6 border-t border-border pt-5">
      <h3 className="font-display text-2xl">Maps and getting there</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">The location map on this page helps orient your trip, but it may not show entrances, accessible paths, designated parking or restroom locations. Use the operator's facility map where one is available.</p>
      {officialMap && /^https:\/\//.test(officialMap)
        ? <a href={officialMap} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Official facility / visitor map ↗</a>
        : destination.officialUrl
          ? <a href={destination.officialUrl} target="_blank" rel="noreferrer noopener" className="mt-3 inline-block font-semibold text-primary underline underline-offset-4">Check for a facility map with the operator ↗</a>
          : <p className="mt-2 text-sm text-muted-foreground">Operator facility map not yet verified.</p>}
      {facilities?.visitorTips?.length ? <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">{facilities.visitorTips.map(tip=><li key={tip}>{tip}</li>)}</ul> : null}
    </div>
  </section>;
}
