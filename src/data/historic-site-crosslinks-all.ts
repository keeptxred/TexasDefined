import { historicSiteSeeds } from "./historic-sites";
import { historicSiteClusters } from "./historic-site-clusters";
import { unavailableDestinationSlugs } from "./destination-availability";
import type { DestinationEditorialLink } from "./destination-editorial-links";

const excluded = new Set(unavailableDestinationSlugs());
const nodes = historicSiteSeeds
  .filter((seed) => !excluded.has(seed.slug));

const supplemental = [
  { slug: "the-alamo", name: "The Alamo", county: "Bexar County", significance: "Spanish mission history, Tejano history and the 1836 siege." },
  { slug: "fort-davis-national-historic-site", name: "Fort Davis National Historic Site", county: "Jeff Davis County", significance: "The San Antonio–El Paso road, reconstructed frontier post and Black Regular Army service." },
  { slug: "palo-alto-battlefield-national-historical-park", name: "Palo Alto Battlefield National Historical Park", county: "Cameron County", significance: "The May 1846 battle and the contested Rio Grande border." },
];
type Site = {slug:string; name:string; county:string; significance:string};
const sites: Site[] = [...new Map([...nodes, ...supplemental].map((site) => [site.slug, site])).values()];

const groupIds = new Map<string, Set<string>>();
for (const cluster of historicSiteClusters) {
  for (const rawSlug of cluster.slugs) {
    const slug = rawSlug;
    if (!groupIds.has(slug)) groupIds.set(slug, new Set());
    groupIds.get(slug)!.add(cluster.id);
  }
}
function mutualContext(left: Site, right: Site): { score: number; description: string } | undefined {
  if (left.slug === right.slug) return;
  const leftIds = groupIds.get(left.slug) ?? new Set<string>();
  const rightIds = groupIds.get(right.slug) ?? new Set<string>();
  const groups = historicSiteClusters.filter((group) => leftIds.has(group.id) && rightIds.has(group.id));
  const sameCounty = Boolean(left.county && left.county === right.county);
  if (!sameCounty && groups.length === 0) return;
  const group = groups[0];
  return {
    score: (sameCounty ? 100 : 0) + groups.length * 20 + (group ? 15 : 0),
    description: sameCounty
      ? `Compare two historic places in ${left.county.replace(/ County$/, "")} County. ${right.significance}`
      : `Compare the ${group.title.toLowerCase()} story through a separate Texas historic place. ${right.significance}`,
  };
}

const related = new Map<string, DestinationEditorialLink[]>();
const pairs = sites.flatMap((left, index) => sites.slice(index + 1).flatMap((right) => {
  const comparison = mutualContext(left, right);
  return comparison ? [{ left, right, score: comparison.score }] : [];
})).sort((a,b)=>b.score-a.score || a.left.slug.localeCompare(b.left.slug) || a.right.slug.localeCompare(b.right.slug));

const degrees = new Map<string, number>();
const selectedPairs = new Set<string>();
function selectPair(pair: (typeof pairs)[number]): boolean {
  const leftCount = degrees.get(pair.left.slug) ?? 0;
  const rightCount = degrees.get(pair.right.slug) ?? 0;
  const id = `${pair.left.slug}|${pair.right.slug}`;
  if (selectedPairs.has(id) || leftCount >= 4 || rightCount >= 4) return false;
  for (const [source, target] of [[pair.left, pair.right], [pair.right, pair.left]] as [Site, Site][]) {
    const context = mutualContext(source, target);
    if (!context) continue;
    const links = related.get(source.slug) ?? [];
    links.push({
      href: `/destination/${target.slug}`,
      label: target.name,
      description: context.description,
    });
    related.set(source.slug, links);
  }
  selectedPairs.add(id);
  degrees.set(pair.left.slug, leftCount + 1);
  degrees.set(pair.right.slug, rightCount + 1);
  return true;
}

// Give every site at least two relevant reciprocal routes where possible.
// A same-county popularity cluster must not consume all four edges and strand
// less-famous rural historic properties with only one way to continue reading.
const scarceFirst = [...sites].sort((a, b) => {
  const count = (slug: string) => pairs.filter((pair) => pair.left.slug === slug || pair.right.slug === slug).length;
  return count(a.slug) - count(b.slug) || a.slug.localeCompare(b.slug);
});
for (const site of scarceFirst) {
  while ((degrees.get(site.slug) ?? 0) < 2) {
    const next = pairs.find((pair) =>
      (pair.left.slug === site.slug || pair.right.slug === site.slug) &&
      !selectedPairs.has(`${pair.left.slug}|${pair.right.slug}`) &&
      (degrees.get(pair.left.slug) ?? 0) < 4 &&
      (degrees.get(pair.right.slug) ?? 0) < 4,
    );
    if (!next || !selectPair(next)) break;
  }
}
for (const pair of pairs) selectPair(pair);

export function fullHistoricSiteCrosslinks(slug: string): DestinationEditorialLink[] {
  return related.get(slug) ?? [];
}

export function siteHasHistoricContextNeighbors(slug: string): boolean {
  return related.has(slug);
}
