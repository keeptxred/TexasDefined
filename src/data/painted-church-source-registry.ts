import { paintedChurchBibliography } from "./painted-church-bibliography";
import { canonicalPaintedChurchFeaturesBySlug } from "./painted-church-feature-index";
import { paintedChurchMapPointBySlug } from "./painted-church-map-points";
import { canonicalPaintedChurchProfileBySlug } from "./painted-church-profile-index";
import { paintedChurchRegisterRecordBySlug } from "./painted-church-register-evidence";
import { canonicalPaintedChurchResearchBySlug } from "./painted-church-research-index";
import { paintedChurchVisitorStatusBySlug } from "./painted-church-visitor-status";
import { expandedPaintedChurches } from "./painted-churches-expanded";

export type PaintedChurchSourceTier = "primary-official" | "archive-register" | "scholarly-public-history" | "current-organization" | "secondary-discovery";

export type PaintedChurchSourceRecord = {
  id: string;
  url: string;
  label: string;
  tier: PaintedChurchSourceTier;
  uses: string[];
  churchSlugs: string[];
  globalReference: boolean;
};

const slugify = (value: string) => value
  .toLowerCase()
  .replace(/^https?:\/\//, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .slice(0, 90);

function inferTier(url: string, hint?: string): PaintedChurchSourceTier {
  const value = `${url} ${hint ?? ""}`.toLowerCase();
  if (value.includes("npgallery.nps.gov") || value.includes("atlas.thc.texas.gov") || value.includes("texashistory.unt.edu") || value.includes("loc.gov") || value.includes("txarchives.org")) return "archive-register";
  if (value.includes("tshaonline.org") || value.includes("sah-archipedia.org") || value.includes("austinpbs.org") || value.includes("tamucc.edu") || value.includes("edu/")) return "scholarly-public-history";
  if (value.includes("parish") || value.includes("church") || value.includes("diocese") || value.includes("archgh.org") || value.includes("galvestonhistory.org") || value.includes("pcusa.org") || value.includes("umc.org") || value.includes("stsophiagoc.org")) return "current-organization";
  if (value.includes("gov") || value.includes("nps.gov")) return "primary-official";
  return "secondary-discovery";
}

const sourceMap = new Map<string, PaintedChurchSourceRecord>();

function addSource({ url, label, use, churchSlug, globalReference = false, tier }: { url?: string; label: string; use: string; churchSlug?: string; globalReference?: boolean; tier?: PaintedChurchSourceTier }) {
  if (!url) return;
  const existing = sourceMap.get(url);
  if (existing) {
    if (!existing.uses.includes(use)) existing.uses.push(use);
    if (churchSlug && !existing.churchSlugs.includes(churchSlug)) existing.churchSlugs.push(churchSlug);
    existing.globalReference ||= globalReference;
    return;
  }
  sourceMap.set(url, {
    id: `source-${slugify(url)}`,
    url,
    label,
    tier: tier ?? inferTier(url, label),
    uses: [use],
    churchSlugs: churchSlug ? [churchSlug] : [],
    globalReference,
  });
}

for (const church of expandedPaintedChurches) {
  addSource({ url: church.sourceUrl, label: `${church.shortName} — controlling church/property source`, use: "property identity, history or inclusion evidence", churchSlug: church.slug });
  addSource({ url: church.secondarySourceUrl, label: `${church.shortName} — supporting source`, use: "supporting history, designation or visitor evidence", churchSlug: church.slug });

  const profile = canonicalPaintedChurchProfileBySlug(church.slug);
  for (const source of profile?.sources ?? []) addSource({ url: source.url, label: source.label, use: "canonical narrative profile", churchSlug: church.slug });

  const research = canonicalPaintedChurchResearchBySlug(church.slug);
  for (const source of research?.sources ?? []) addSource({ url: source.url, label: source.label, use: source.use, churchSlug: church.slug, tier: source.tier === "official" ? "primary-official" : source.tier === "historic-register" ? "archive-register" : source.tier === "scholarly" || source.tier === "public-media" ? "scholarly-public-history" : undefined });

  for (const feature of canonicalPaintedChurchFeaturesBySlug(church.slug)) addSource({ url: feature.sourceUrl, label: feature.sourceLabel, use: feature.sourceDetail ?? `object-level evidence for ${feature.name}`, churchSlug: church.slug });

  const visitor = paintedChurchVisitorStatusBySlug.get(church.slug);
  if (visitor) addSource({ url: visitor.controllingSourceUrl, label: visitor.controllingSourceLabel, use: `current visitor/access evidence checked ${visitor.checkedAt}`, churchSlug: church.slug, tier: visitor.evidenceScope === "historic-property-record-only" ? "archive-register" : "current-organization" });

  const map = paintedChurchMapPointBySlug.get(church.slug);
  if (map) addSource({ url: map.sourceUrl, label: map.sourceLabel, use: `coordinate provenance (${map.precision})`, churchSlug: church.slug });

  const register = paintedChurchRegisterRecordBySlug(church.slug);
  if (register) {
    addSource({ url: register.npsUrl, label: `${register.title} — National Park Service`, use: "National Register designation metadata", churchSlug: church.slug, tier: "archive-register" });
    addSource({ url: register.thcUrl, label: `${register.title} — Texas Historical Commission`, use: "state historic-register metadata", churchSlug: church.slug, tier: "archive-register" });
  }
}

for (const item of paintedChurchBibliography) addSource({ url: item.url, label: item.title, use: item.use, globalReference: true, tier: item.type === "primary-register" || item.type === "archive" ? "archive-register" : item.type === "official-history" ? "current-organization" : item.type === "book" || item.type === "article" || item.type === "documentary" ? "scholarly-public-history" : undefined });

export const paintedChurchSourceRegistry = [...sourceMap.values()].sort((a, b) => a.label.localeCompare(b.label));
export const paintedChurchSourceRegistryById = new Map(paintedChurchSourceRegistry.map((source) => [source.id, source]));

export function paintedChurchSourcesForChurch(slug: string) {
  return paintedChurchSourceRegistry.filter((source) => source.churchSlugs.includes(slug));
}
