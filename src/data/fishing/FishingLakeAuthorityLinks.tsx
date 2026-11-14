import { LAKE_VISITOR_DESTINATIONS } from "./destination-lake-crosslinks";
import { isCompleteFishingLakeSlug, isCompleteFishingSpeciesSlug } from "./slugs";

type LakeLink = { href: string; label: string };
type FishLink = { id: string; name: string };

const sectionLabels: Record<string, string> = {
  fish: "Fish species and habitat",
  access: "Verified ramps and access",
  boating: "Water conditions and navigation",
  regulations: "Fishing regulations",
  camping: "Camping and overnight stays",
  nearby: "Parks and attractions",
};
const sectionPairs: Record<string, string[]> = {
  fish: ["regulations", "access", "boating"],
  access: ["boating", "camping", "regulations"],
  boating: ["access", "regulations", "fish"],
  regulations: ["fish", "access", "boating"],
  camping: ["access", "nearby", "regulations"],
  nearby: ["camping", "access", "fish"],
};

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function uniqueLinks(rows: LakeLink[], limit: number): LakeLink[] {
  return [...new Map(rows.filter((row) => row.href.startsWith("/") && row.label.trim())
    .map((row) => [row.href, row])).values()].slice(0, limit);
}

/**
 * HTML-anchor authority graph for every lake section.
 * Other pages already have reverse links via county-/city-lake generated
 * registries, the fishing hub, destination-lake guides and species profiles.
 * A link is surfaced only if its target belongs to a published canonical
 * registry or a maintained editorial destination crosslink.
 */
export function FishingLakeAuthorityLinks({
  slug, name, section, counties, cities, fish, relatedLakes,
}: {
  slug: string;
  name: string;
  section?: string;
  counties: string[];
  cities: string[];
  fish: FishLink[];
  relatedLakes: LakeLink[];
}) {
  const base = `/fishing/lakes/${slug}`;
  const nextSections = sectionPairs[section ?? ""] ?? ["fish", "access", "regulations", "camping", "nearby"];
  const guideLinks = uniqueLinks([
    { href: base, label: `${name} fishing guide` },
    ...nextSections.map((key) => ({ href: `${base}/${key}`, label: sectionLabels[key] })),
    { href: "/fishing/lakes", label: "All Texas fishing lakes" },
    { href: "/fishing/compare", label: "Compare lake conditions and targets" },
    { href: "/fishing/regulations", label: "Texas freshwater fishing rules" },
  ].filter((row) => row.href !== (section ? `${base}/${section}` : base)), 8);
  const speciesLinks = uniqueLinks(fish.filter((row) => isCompleteFishingSpeciesSlug(row.id))
    .map((row) => ({ href: `/fishing/species/${row.id}`, label: row.name })), 6);
  const placeLinks = uniqueLinks([
    ...counties.map((county) => ({ href: `/county/${slugify(county)}`, label: `${county} County guide` })),
    ...(LAKE_VISITOR_DESTINATIONS[slug] ?? []).map((park) => ({ href: `/destination/${park.slug}`, label: park.label })),
  ], 9);
  const lakeLinks = uniqueLinks(relatedLakes.filter((link) => {
    const matched = link.href.match(/^\/fishing\/lakes\/([a-z0-9-]+)$/);
    return matched && matched[1] !== slug && isCompleteFishingLakeSlug(matched[1]);
  }), 6);
  return (
    <nav aria-label={`${name} related authority guides`} className="mt-14 border-t border-border pt-8">
      <p className="eyebrow text-primary">Keep researching {name}</p>
      <h2 className="mt-2 font-display text-2xl sm:text-3xl">Connected Texas fishing and travel guides</h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-muted-foreground">
        Follow the next useful guide for this same reservoir, compare officially documented fish species, or explore the counties and park destinations associated with this lake. Links describe distinct pages, not a claim about today's fishing or travel conditions.
      </p>
      <div className="mt-7 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <div><h3 className="font-semibold">Plan this lake</h3>
          <ul className="mt-3 space-y-2">{guideLinks.map((row) => <li key={row.href}><a href={row.href} className="text-sm leading-6 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{row.label}</a></li>)}</ul>
        </div>
        {speciesLinks.length > 0 && <div><h3 className="font-semibold">Fish species</h3>
          <ul className="mt-3 space-y-2">{speciesLinks.map((row) => <li key={row.href}><a href={row.href} className="text-sm leading-6 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{row.label} in Texas</a></li>)}</ul>
        </div>}
        {placeLinks.length > 0 && <div><h3 className="font-semibold">Regional authority guides</h3>
          <ul className="mt-3 space-y-2">{placeLinks.map((row) => <li key={row.href}><a href={row.href} className="text-sm leading-6 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{row.label}</a></li>)}</ul>
        </div>}
        {lakeLinks.length > 0 && <div><h3 className="font-semibold">Other researched lakes</h3>
          <ul className="mt-3 space-y-2">{lakeLinks.map((row) => <li key={row.href}><a href={row.href} className="text-sm leading-6 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">{row.label}</a></li>)}</ul>
        </div>}
      </div>
      {cities.length > 0 && <p className="mt-6 text-xs leading-6 text-muted-foreground">Nearby communities in the sourced lake profile: {cities.join(", ")}. Use official access sources to confirm directions and drive times.</p>}
    </nav>
  );
}
