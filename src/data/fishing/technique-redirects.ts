import { fishingTechniqueCanonicalPath } from "./technique-routing";

export const DUPLICATED_FISHING_TECHNIQUE_PREFIX = "/fishing/fishing/techniques/";

export function getFishingTechniquePathNormalizationRedirect(pathname: string, searchStr = "") {
  const normalizedPathname = pathname.replace(/\/+$/, "");
  if (!normalizedPathname.startsWith(DUPLICATED_FISHING_TECHNIQUE_PREFIX)) return null;

  const slug = normalizedPathname.slice(DUPLICATED_FISHING_TECHNIQUE_PREFIX.length);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;

  return {
    href: `${fishingTechniqueCanonicalPath(slug)}${searchStr || ""}`,
    replace: true,
    statusCode: 301 as const,
  };
}
