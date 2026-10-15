import { Link } from "@tanstack/react-router";
import { stateParkVisitDecisions } from "@/data/state-park-visit-decisions";
import type { Destination } from "@/data/types";
import { isTexasStateParkDestination, stateParkOfficialResources, VERIFIED_PARK_FACILITIES } from "@/data/state-park-authority";

/**
 * Show only independently checked park-specific claims. Never fill five slots with
 * the same "verification pending" boilerplate or imply an unconfirmed amenity exists.
 */
export function StateParkVisitorEssentials({ destination }: { destination: Destination }) {
  if (!isTexasStateParkDestination(destination)) return null;
  const links = stateParkOfficialResources(destination);
  if (!links) return null;
  const verified = VERIFIED_PARK_FACILITIES[destination.slug];
  const choices = stateParkVisitDecisions(destination);
  const entries = [
    { title: "Restrooms and showers", detail: verified?.restrooms },
    { title: "Parking, entrance and access", detail: verified?.parking },
    { title: "Camping, RV hookups and drinking water", detail: verified?.camping },
    { title: "Trails, parking and visitor maps", detail: verified?.maps },
    { title: "Access restrictions and current visitor rules", detail: verified?.access },
  ].filter((entry): entry is { title: string; detail: string } => Boolean(entry.detail));

  return <section aria-labelledby="state-park-essentials" className="mt-10 border-t border-border pt-8">
    <p className="eyebrow text-primary">Texas State Parks · trip planning</p>
    <h2 id="state-park-essentials" className="mt-3 font-display text-3xl">Park entrances, facilities and visitor maps</h2>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">
      Amenities can differ by park unit, campsite and season. The details below are park-specific where checked against TPWD. For changing hours, reservations, trail conditions and facility availability, use the park's official visitor resources.
    </p>
    {entries.length ? <dl className="mt-6 divide-y divide-border border-y border-border">
      {entries.map(({ title, detail }) => <div key={title} className="py-4">
        <dt className="font-semibold">{title}</dt>
        <dd className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</dd>
      </div>)}
    </dl> : <p className="mt-5 text-sm leading-7 text-muted-foreground">
      For this park, the official map and campsite inventory below provide current facilities, entrances and parking details. We do not infer restrooms, hookups, drinking water or accessibility from a statewide template.
    </p>}
    {destination.accessibilityNotes && <p className="mt-5 text-sm leading-7">
      <span className="font-semibold">Accessibility:</span> {destination.accessibilityNotes}
    </p>}
    {verified && <p className="mt-4 text-xs text-muted-foreground">
      Park-specific visitor facts checked {verified.checkedAt} against{" "}
      <a href={verified.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">the TPWD source</a>.
      {verified.facilitySourceUrl && <>{" "}Additional campsite or day-use details:{" "}
        <a href={verified.facilitySourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">official TPWD facilities record</a>.
      </>}
      {verified.supplementalSourceUrl && <>{" "}Additional trailhead evidence:{" "}
        <a href={verified.supplementalSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">dated TPWD announcement</a>.
      </>}
    </p>}
    {choices.length > 0 && <section aria-labelledby="state-park-visit-choices" className="mt-9 border-t border-border pt-7">
      <h3 id="state-park-visit-choices" className="font-display text-2xl">Choose the right way to visit</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">These options use the park's actual units, campsites and access restrictions. Choose a plan before booking; current conditions and reservations still come from TPWD.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {choices.map((choice) => <article key={choice.title} className="rounded-lg border border-border p-5">
          <h4 className="font-semibold">{choice.title}</h4>
          <p className="mt-1 text-xs font-medium text-primary">{choice.suitedTo}</p>
          <p className="mt-3 text-sm leading-6">{choice.plan}</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground"><span className="font-semibold">Check before going:</span> {choice.watch}</p>
        </article>)}
      </div>
    </section>}
    <p className="mt-5 text-sm">
      <Link to="/explore/$category" params={{ category: "state-parks" }} className="font-semibold text-primary underline underline-offset-4">Explore Texas state parks</Link>
    </p>
    <nav aria-label={`Official visitor resources for ${destination.name}`} className="mt-6 grid gap-3 sm:grid-cols-2">
      <a href={links.map} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Official park, parking and trails maps ↗</a>
      <a href={links.feesAndFacilities} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Admission, day-use and facility details ↗</a>
      <a href={links.official} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Current alerts, access and park hours ↗</a>
      <a href={links.reservations} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Tickets, passes and reservations ↗</a>
    </nav>
  </section>;
}
