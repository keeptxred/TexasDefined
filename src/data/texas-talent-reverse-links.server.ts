import { loadTexasKnowledgeGraph } from "@/data/knowledge-graph";
import { loadTexasTalentProfilesServer } from "@/data/texas-talent.server";
import { resolveTexasTalentEntityLinksFromGraph } from "@/data/texas-talent-links.server";

export type TexasTalentReverseLinkProfile = {
  slug: string;
  name: string;
  category: string;
};

export type TexasTalentReverseLinkDestination = {
  href: string;
  label: string;
  kind: "county" | "city" | "culture" | "destination" | "article";
  profiles: readonly TexasTalentReverseLinkProfile[];
};

export type TexasTalentProfileLinkCoverage = TexasTalentReverseLinkProfile & {
  resolvedLinkCount: number;
  countyLinkCount: number;
  cityLinkCount: number;
  cultureLinkCount: number;
  otherLinkCount: number;
  countyOnly: boolean;
  hasPlaceLink: boolean;
  hasCultureLink: boolean;
};

export async function loadTexasTalentReverseLinkAuditServer() {
  const profiles = loadTexasTalentProfilesServer();
  const graph = await loadTexasKnowledgeGraph();
  const destinations = new Map<string, {
    href: string;
    label: string;
    kind: TexasTalentReverseLinkDestination["kind"];
    profiles: Map<string, TexasTalentReverseLinkProfile>;
  }>();
  const profilesWithResolvedLinks = new Set<string>();
  const profileCoverage: TexasTalentProfileLinkCoverage[] = [];

  for (const profile of profiles) {
    const links = resolveTexasTalentEntityLinksFromGraph(profile, graph);
    if (links.length > 0) profilesWithResolvedLinks.add(profile.slug);

    const countyLinkCount = links.filter((link) => link.kind === "county").length;
    const cityLinkCount = links.filter((link) => link.kind === "city").length;
    const cultureLinkCount = links.filter((link) => link.kind === "culture").length;
    const otherLinkCount = links.length - countyLinkCount - cityLinkCount - cultureLinkCount;
    profileCoverage.push({
      slug: profile.slug,
      name: profile.name,
      category: profile.category,
      resolvedLinkCount: links.length,
      countyLinkCount,
      cityLinkCount,
      cultureLinkCount,
      otherLinkCount,
      countyOnly: countyLinkCount > 0 && countyLinkCount === links.length,
      hasPlaceLink: countyLinkCount + cityLinkCount + otherLinkCount > 0,
      hasCultureLink: cultureLinkCount > 0,
    });

    for (const link of links) {
      const destination = destinations.get(link.href) ?? {
        href: link.href,
        label: link.label,
        kind: link.kind,
        profiles: new Map<string, TexasTalentReverseLinkProfile>(),
      };
      destination.profiles.set(profile.slug, {
        slug: profile.slug,
        name: profile.name,
        category: profile.category,
      });
      destinations.set(link.href, destination);
    }
  }

  const reverseLinks: TexasTalentReverseLinkDestination[] = [...destinations.values()]
    .map((destination) => ({
      href: destination.href,
      label: destination.label,
      kind: destination.kind,
      profiles: [...destination.profiles.values()].sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .sort((a, b) => b.profiles.length - a.profiles.length || a.label.localeCompare(b.label));

  profileCoverage.sort(
    (a, b) => a.resolvedLinkCount - b.resolvedLinkCount || a.name.localeCompare(b.name),
  );

  return {
    totalProfiles: profiles.length,
    profilesWithResolvedLinks: profilesWithResolvedLinks.size,
    profilesWithoutResolvedLinks: profiles.length - profilesWithResolvedLinks.size,
    profilesWithCityLinks: profileCoverage.filter((profile) => profile.cityLinkCount > 0).length,
    profilesWithCultureLinks: profileCoverage.filter((profile) => profile.cultureLinkCount > 0).length,
    profilesWithCountyOnlyLinks: profileCoverage.filter((profile) => profile.countyOnly).length,
    destinationCount: reverseLinks.length,
    countyDestinationCount: reverseLinks.filter((destination) => destination.kind === "county").length,
    cityDestinationCount: reverseLinks.filter((destination) => destination.kind === "city").length,
    cultureDestinationCount: reverseLinks.filter((destination) => destination.kind === "culture").length,
    profileCoverage,
    reverseLinks,
  };
}
