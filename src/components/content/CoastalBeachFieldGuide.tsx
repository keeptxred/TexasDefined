import { coastalPlaces, COASTAL_ZONE_LABELS, type CoastalAccess, type CoastalPlaceKind } from "@/data/coastal-places";
import { COASTAL_BEACH_EDITORIAL } from "@/data/coastal-beach-editorial";
import { COASTAL_BEACH_EDITORIAL_EXTRA } from "@/data/coastal-beach-editorial-extra";
import { COASTAL_BEACH_EDITORIAL_SOUTH } from "@/data/coastal-beach-editorial-south";
import { COASTAL_BEACH_EDITORIAL_NEW } from "@/data/coastal-beach-editorial-new";

const canonicalCoastSlugs: Record<string, string> = {
"galveston-island-state-park":"galveston-island-state-park-coast",
"goose-island-state-park":"goose-island-state-park-coast",
};

const VISIT_STYLES: Record<CoastalPlaceKind, string> = {
"gulf-beach":"This is an open-Gulf shoreline, not a protected lake or bay beach. Wave height, longshore currents, wind, tides, rip currents and any posted surf warnings matter to swimming plans.",
"bay-beach":"This is a bay-side waterfront rather than a Gulf-facing surf beach. Calmer-looking water is not evidence of safe swimming: check the signed swimming area, boat traffic, bottom conditions and any local water-quality notices.",
"coastal-park":"This is a managed park with its own rules, possible admission or parking arrangements, and specified public-use areas. The park designation alone does not mean all shorelines within it are safe or open for swimming.",
"barrier-island":"This shoreline is part of a barrier-island system, where boat access, habitat protection, wind and weather can be more important than typical beachfront amenities. Do not presume unrestricted visitor access.",
"national-seashore":"National seashore conditions and rules vary by beach segment. The National Park Service advises visitors to check current conditions, tide and driving risks; not all areas are supervised or easy to reach.",
"shoreline":"This is a mapped shore or habitat area, not a promise of a maintained swimming beach. Verify whether swimming, shore entry or public visitation is allowed at your particular access point.",
"beach-access":"This entry identifies a specific coastal access area, not a separate named beach or a guarantee of parking or swimming permission. Follow signs at the actual access point.",
};

const ACCESS_NOTES: Record<CoastalAccess, string> = {
"public-free":"The listed approach is categorized as public access without a general admission fee. Free shoreline entry does not rule out restrictions on parking, vehicles, camping or other activities.",
"public-managed":"Public access is subject to posted local management rules. Check current vehicle stickers, beach access signage and seasonal closures with the operator.",
"public-fee":"The managing park or facility may charge entry, parking or day-use fees. Verify current prices and reservations directly; old fee tables can be misleading.",
"public-conditional":"Access is conditional; road, weather, operational, launch or protective closures can change without much notice. Check same-day status before setting out.",
"boat-only":"The shoreline cannot be reached by ordinary public road. Arrange lawful boat access, check landing permissions and weather, and carry adequate supplies for the return trip.",
"limited-public-shore":"Only the legally accessible shoreline may be public; do not assume nearby upland parcels, dunes or facilities are open to visitors.",
"private-check-status":"This is not established as an unrestricted public facility. Contact the operator, verify legally permitted access, and avoid treating private property as a public beach.",
};

const officialPlanning = [
  { title:"Texas GLO coast and public access", url:"https://www.glo.texas.gov/coastal/planning-your-visit", description:"Statewide coastal access policy, dune protection and local plan context" },
  { title:"Texas Beach Watch water quality", url:"https://www.texasbeachwatch.com/", description:"Check recent monitoring results, locations and advisories where sampling is available" },
  { title:"National Weather Service rip-current safety", url:"https://www.weather.gov/safety/rip-current-hazards", description:"Learn the warning signs and understand the latest surf-risk guidance" },
];

export default function CoastalBeachFieldGuide({ destinationSlug }: { destinationSlug: string }) {
  const rawSlug = canonicalCoastSlugs[destinationSlug] ?? destinationSlug;
  const place = coastalPlaces.find((item) => item.slug === rawSlug);
  if (!place) return null;
  const editorial = COASTAL_BEACH_EDITORIAL[rawSlug] ?? COASTAL_BEACH_EDITORIAL_EXTRA[rawSlug] ?? COASTAL_BEACH_EDITORIAL_SOUTH[rawSlug] ?? COASTAL_BEACH_EDITORIAL_NEW[rawSlug];
  const neighbors = coastalPlaces
    .filter((item) => item.slug !== place.slug && item.zone === place.zone)
    .slice(0, 4);
  return <section className="mt-12 border-t border-border pt-8" aria-labelledby="coastal-field-guide">
    <p className="eyebrow text-primary">Location-specific coastal research</p>
    <h2 id="coastal-field-guide" className="mt-3 font-display text-3xl">Access, swimming and local rules at {place.name}</h2>
    <p className="mt-4 text-base leading-8 text-foreground/90">{place.summary}</p>
    {editorial && <section aria-labelledby="coastal-beach-local-research" className="mt-8 border-y border-border py-7">
      <p className="eyebrow text-primary">Official operator details · researched October 17, 2026</p>
      <h3 id="coastal-beach-local-research" className="mt-3 font-display text-2xl">{editorial.headline}</h3>
      <div className="mt-5 grid gap-6 md:grid-cols-2">
        <div><h4 className="font-semibold">Finding the right entrance and facilities</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{editorial.arrival}</p></div>
        <div><h4 className="font-semibold">Parking, permits and beach rules</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{editorial.rules}</p></div>
      </div>
      <div className="mt-5"><h4 className="font-semibold">Is this the right beach for your trip?</h4><p className="mt-2 text-sm leading-7 text-muted-foreground">{editorial.visitorDecision}</p></div>
      <div className="mt-5 flex flex-wrap gap-5 text-sm font-semibold">
        <a href={editorial.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Official beach operator →</a>
        <a href={editorial.extraUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Additional official visitor policy →</a>
      </div>
    </section>}
    <dl className="mt-7 grid gap-x-8 gap-y-4 md:grid-cols-2">
      <div className="border-t border-border pt-4">
        <dt className="font-semibold">What kind of beach is this?</dt>
        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{VISIT_STYLES[place.kind]}</dd>
      </div>
      <div className="border-t border-border pt-4">
        <dt className="font-semibold">Who can get in, and what might it cost?</dt>
        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{ACCESS_NOTES[place.access]}</dd>
      </div>
      <div className="border-t border-border pt-4">
        <dt className="font-semibold">Important local planning detail</dt>
        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{place.planningNote}</dd>
      </div>
      <div className="border-t border-border pt-4">
        <dt className="font-semibold">Location and managing source</dt>
        <dd className="mt-2 text-sm leading-7 text-muted-foreground">{place.nearestTown}, {place.counties.join(" /")} County · {COASTAL_ZONE_LABELS[place.zone]}. Source: {place.sourceLabel}; last research date {place.sourceCheckedAt}. Coordinates elsewhere on this guide identify a representative arrival area, not precise shoreline boundaries.</dd>
      </div>
    </dl>
    {place.correction && <div className="mt-6 border-l-2 border-primary pl-5"><h3 className="font-semibold">Naming or access clarification</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{place.correction}</p></div>}
    <div className="mt-9 border-t border-border pt-6">
      <h3 className="font-display text-2xl">Confirm before you go</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">This is research-backed visitor information, not a live access, parking, beach flag or bacteria status. A destination being listed does not establish that swimming is permitted or safe today. Check the relevant managing source and local signs, especially after storms, flooding or beach work.</p>
      <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{place.sourceLabel} — source for this location →</a>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {officialPlanning.map((item) => <li key={item.url} className="border-t border-border pt-3">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline decoration-primary/40 underline-offset-4 hover:text-primary">{item.title} →</a>
          <p className="mt-2 text-xs leading-6 text-muted-foreground">{item.description}</p>
        </li>)}
      </ul>
    </div>
    <div className="mt-9 border-t border-border pt-6">
      <h3 className="font-display text-2xl">Plan this part of the Texas coast</h3>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
        {place.countySlugs.map((slug, index) => <a key={slug} href={`/county/${slug}`} className="underline decoration-primary/40 underline-offset-4 hover:text-primary">{place.counties[index] ?? slug} County guide →</a>)}
        <a href="/explore/beaches-coast" className="underline decoration-primary/40 underline-offset-4 hover:text-primary">Full Texas Coast directory →</a>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {neighbors.map((other) => <li key={other.slug}><a href={`/destination/${canonicalCoastSlugs[other.slug] ?? (other.slug ==="galveston-island-state-park-coast" ?"galveston-island-state-park" : other.slug ==="goose-island-state-park-coast" ?"goose-island-state-park" : other.slug)}`} className="text-sm font-semibold underline decoration-border underline-offset-4 hover:text-primary">{other.name}</a><span className="ml-2 text-xs text-muted-foreground">{other.nearestTown}</span></li>)}
      </ul>
    </div>
  </section>;
}
