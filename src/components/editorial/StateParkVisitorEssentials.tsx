import { Link } from "@tanstack/react-router";
import type { Destination } from "@/data/types";
import { getTpwdActivitiesForDestination } from "@/data/tpwd-calendar";
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
  const parkOccurrences = getTpwdActivitiesForDestination(destination);
  const activityGroups = new Map<string, { title: string; dates: string[]; officialUrl: string }>();
  for (const event of parkOccurrences) {
    const key = event.title.toLowerCase();
    const group = activityGroups.get(key);
    if (group) group.dates.push(event.startDate);
    else activityGroups.set(key, { title: event.title, dates: [event.startDate], officialUrl: event.officialUrl });
  }
  const upcomingActivities = [...activityGroups.values()].slice(0, 4);
  const displayDay = (day: string) => new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", timeZone: "UTC",
  }).format(new Date(day + "T12:00:00Z"));
  const entries = [
    { title: destination.slug === "franklin-mountains-state-park" ? "Restrooms; no verified showers" : "Restrooms and showers", detail: verified?.restrooms },
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
      {verified.supplementalSourceUrl && <>{" "}Additional official TPWD reference:{" "}
        <a href={verified.supplementalSourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">TPWD source page</a>.
      </>}
      {verified.supportingSources?.map((source) => <span key={source.url}>{" "}Supporting source:{" "}
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{source.label}</a>.
      </span>)}
    </p>}
    <p className="mt-5 text-sm">
      <Link to="/explore/$category" params={{ category: "state-parks" }} className="font-semibold text-primary underline underline-offset-4">Explore Texas state parks</Link>
    </p>
    {upcomingActivities.length > 0 && <section aria-labelledby="tpwd-activities" className="mt-8 border-t border-border pt-6">
      <p className="eyebrow text-primary">Upcoming TPWD programs</p>
      <h3 id="tpwd-activities" className="mt-2 font-display text-2xl">Activities scheduled at this park</h3>
      <p className="mt-2 text-sm text-muted-foreground">These dates come from the Texas Parks and Wildlife calendar. Check the official listing for registration, meeting place, admission and any changes.</p>
      <a href="/events?category=tpwd#calendar" className="mt-2 inline-block text-sm font-semibold text-primary underline underline-offset-4">Browse upcoming TPWD programs statewide →</a>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {upcomingActivities.map(activity => <li key={activity.officialUrl} className="rounded-lg border border-border p-4">
          <a href={activity.officialUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">{activity.title} ↗</a>
          <p className="mt-1 text-sm text-muted-foreground">{activity.dates.slice(0, 4).map(displayDay).join(", ")}{activity.dates.length > 4 ? " and more" : ""}</p>
        </li>)}
      </ul>
    </section>}
    <nav aria-label={`Official visitor resources for ${destination.name}`} className="mt-6 grid gap-3 sm:grid-cols-2">
      <a href={links.map} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Official park, parking and trails maps ↗</a>
      <a href={links.feesAndFacilities} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Admission, day-use and facility details ↗</a>
      <a href={links.official} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Current alerts, access and park hours ↗</a>
      <a href={links.reservations} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Tickets, passes and reservations ↗</a>
      <a href="https://tpwd.texas.gov/calendar" rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Upcoming ranger programs and park activities ↗</a>
    </nav>
  </section>;
}
