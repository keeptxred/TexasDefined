/**
 * Item-level official documentation: link each best-of recommendation back to
 * its own lake-specific agency fishery, not just one generic statewide homepage.
 *
 * SOURCE COVERAGE IS NOT FULL EDITORIAL APPROVAL. Each pick still requires
 * factual field-by-field and photography review before a public release.
 */
export interface GuidePickEvidence {
  title: string;
  officialUrl: string;
  internalHref: string;
  sourceCheckedAt: string;
  reviewingAuthority: string;
}
export const texasGuidePickEvidence: Record<number, GuidePickEvidence[]> = {
  106: [
    { title: "Lake Fork — trophy largemouth bass", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/fork/", internalHref: "/fishing/lakes/lake-fork", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Lake Texoma — striped bass and broad-water fishing", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/texoma/", internalHref: "/fishing/lakes/lake-texoma", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Sam Rayburn Reservoir — a multi-species East Texas trip", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/sam_rayburn/", internalHref: "/fishing/lakes/sam-rayburn-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Toledo Bend Reservoir — destination bass fishing", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/toledo_bend/", internalHref: "/fishing/lakes/toledo-bend-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Lake Livingston — white bass and catfish priorities", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/livingston/", internalHref: "/fishing/lakes/lake-livingston", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Canyon Lake — Hill Country striped and white bass", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/canyon/", internalHref: "/fishing/lakes/canyon-lake", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Choke Canyon Reservoir — South Texas bass and catfish", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/choke_canyon/", internalHref: "/fishing/lakes/choke-canyon-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Lake Conroe — a Houston-area multi-species option", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/conroe/", internalHref: "/fishing/lakes/lake-conroe", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Amistad Reservoir — a remote border-lake experience", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/amistad/", internalHref: "/fishing/lakes/amistad-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
    { title: "Possum Kingdom Reservoir — rocky scenery with a fishery", officialUrl: "https://tpwd.texas.gov/fishboat/fish/recreational/lakes/possum_kingdom/", internalHref: "/fishing/lakes/possum-kingdom-reservoir", sourceCheckedAt: "2026-10-12", reviewingAuthority: "Texas Parks and Wildlife Department — lake fishery and access overview" },
  ],
};
export function sourceForGuidePick(number: number, title: string): GuidePickEvidence | undefined {
  return texasGuidePickEvidence[number]?.find((row) => row.title === title);
}
export function allGuidePicksIndividuallySourced(number: number, titles: string[]): boolean {
  if (!titles.length || new Set(titles).size !== titles.length) return false;
  const sources = texasGuidePickEvidence[number] ?? [];
  return sources.length === titles.length
    && titles.every((title) => {
      const item = sourceForGuidePick(number, title);
      return Boolean(item
        && /^https:\/\/[^\s]+$/.test(item.officialUrl)
        && item.internalHref.startsWith("/fishing/lakes/")
        && /^\d{4}-\d{2}-\d{2}$/.test(item.sourceCheckedAt));
    });
}
