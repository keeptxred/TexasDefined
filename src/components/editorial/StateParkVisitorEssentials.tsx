import { Link } from "@tanstack/react-router";
import type { Destination } from "@/data/types";
import { isTexasStateParkDestination, stateParkOfficialResources, VERIFIED_PARK_FACILITIES } from "@/data/state-park-authority";

export function StateParkVisitorEssentials({ destination }: { destination: Destination }) {
  if (!isTexasStateParkDestination(destination)) return null;
  const links = stateParkOfficialResources(destination);
  if (!links) return null;
  const verified = VERIFIED_PARK_FACILITIES[destination.slug];
  const entries = [
    { title: "Restrooms and showers", detail: verified?.restrooms, fallback: "Check the official park map and campsite descriptions for restroom type, shower availability and distance from your site." },
    { title: "Parking and entrances", detail: verified?.parking, fallback: "Check the official park map for entry stations, day-use parking, trailheads and overnight parking rules." },
    { title: "Accessible routes and facilities", detail: undefined, fallback: "Ask TPWD which restrooms, campsites, buildings and trails meet your specific accessibility needs; terrain and access can vary." },
    { title: "Camping, RV hookups and drinking water", detail: verified?.camping, fallback: "Review the current campsite types, hookups, water points, site dimensions, shower access and reservation availability." },
    { title: "Trail and visitor maps", detail: verified?.maps, fallback: "Download the park and trails maps before travel; service can be unreliable away from developed areas." },
  ];
  return <section aria-labelledby="state-park-essentials" className="mt-10 border-t border-border pt-8">
    <p className="eyebrow text-primary">Texas State Parks · practical planning</p>
    <h2 id="state-park-essentials" className="mt-3 font-display text-3xl">Bathrooms, parking, maps and facilities</h2>
    <p className="mt-4 text-sm leading-7 text-muted-foreground">Facilities and accessibility differ by campsite, park unit and season. Park-specific verified notes appear below; otherwise the detail is explicitly pending independent confirmation. Official TPWD resources remain the source of current operating conditions.</p>
    <dl className="mt-6 divide-y divide-border border-y border-border">
      {entries.map(({ title, detail, fallback }) => <div key={title} className="py-4">
        <dt className="font-semibold">{title}</dt>
        <dd className="mt-1 text-sm leading-6 text-muted-foreground">{detail ?? fallback}</dd>
        {!detail && <dd className="mt-1 text-xs text-muted-foreground">Park-specific facility verification pending</dd>}
      </div>)}
    </dl>
    {verified?.access && <p className="mt-4 text-sm leading-6">{verified.access}</p>}
    <p className="mt-5 text-sm"><Link to="/explore/$category" params={{ category: "state-parks" }} className="font-semibold text-primary underline underline-offset-4">Explore all Texas state parks</Link></p>
    <nav aria-label={`Official visitor resources for ${destination.name}`} className="mt-6 grid gap-3 sm:grid-cols-2">
      <a href={links.map} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Official park, parking and trails maps ↗</a>
      <a href={links.feesAndFacilities} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Fees, campsites and facility types ↗</a>
      <a href={links.official} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Operating alerts, access and hours ↗</a>
      <a href={links.reservations} rel="noopener noreferrer" target="_blank" className="text-sm font-semibold text-primary underline underline-offset-4">Check official park reservations ↗</a>
    </nav>
    {verified ? <p className="mt-5 text-xs text-muted-foreground">Park-specific notes checked {verified.checkedAt} against <a href={verified.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">TPWD source information</a>. Prices, closures and availability may change.</p> : <p className="mt-5 text-xs text-muted-foreground">Park-specific bathrooms, parking and accessibility details require verification; this guide does not represent unverified facilities as available.</p>}
  </section>;
}
